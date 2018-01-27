<!-- 银行账户信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="bankaccountRef"
                        tplId="bankaccountTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="bankaccountData"
                        :tplResetFun="bankaccountResetFun"
                        :tplMethods="bankaccountTplMethods"
                        @form-confirm-click="bankaccountFormConfirm"
                        @form-cancel-click="bankaccountFormCancel"
                        @edit-table-click="bankaccountEditTableRow"
                        @delete-table-click="bankaccountDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 银行账户信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="bankaccountDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bankaccountDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="bankaccountDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  props: ["pk_customer","invisible"],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};

    let validatecustomer = function(rule, value, callback) {
      
      //银行账户唯一校验
      if (rule.field === "account_no") {
        if (value === "") {
          callback(new Error("银行账户不能为空"));
        }else {
          let datam = {
            account_no: value,
            pk_customer:oThis.pk_customer
          };
          oThis
            .$http({
              url: ylsBusi + "cust/BankAccount/checkOnlyOne",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(datam))
            })
            .then(res => {
              if (res.data.success === true) {
                callback();
              } else {
                callback(new Error("客户银行卡号重复"));
              }
            })
            .catch(() => {
              callback(new Error("后台服务有误，请联系管理员！"));
            });
        }
      }
    };
    return {
      bankaccountDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 银行账户信息新增
      bankaccountIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            let uitemplateComp = oThis.$refs.bankaccountRef.comp;
            let table = uitemplateComp.$refs["bankaccount_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      funnode:"BT003",	
      nexuskey: "bank_busi_apply",
      bankaccountData: {
        rules: {
          account_no: [{validator: validatecustomer, trigger: "blur" }],
          is_withhold:[
           { required: true, message: "是否银行代扣不能为空", trigger: "blur" }
          ]
        }
      },
      bankaccountResetFun: function($node) {
        if(oThis.invisible) {
          return;
        }
        
        let $table = this.getNodeById($node, "cncsdcy7yfp");
        // $table.attr(":show-header", "false");
        let operateArr = [
          {
            title: "编辑",

            icon: "edit"
          },
          {
            title: "删除",

            icon: "delete"
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      bankaccountTplMethods: {
        // form的保存操作
      }
    };
  },
  //获取数据数据初始化操作
  created() {},
    //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.requestbankaccount();
    }
  },
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
    
    /**
       *   初始响应方法
       **/
    request() {
        if (this.pk_customer != "") {
          this.requestbankaccount();
      }
    },
    //请求银行账户信息
    requestbankaccount() {
      let url;
      url = ylsBusi + "cust/BankAccount/page";
      let data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            custCondList:[{key:"pk_customer",oper:"=",value:this.pk_customer}]
          }
        }
      };
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs["bankaccountRef"].setData(
            "BankAccount_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "银行信息获取失败",
            type: "error"
          });
        });
    },
    //银行账户情况保存
    bankaccountFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.bankaccountRef.comp.BankAccount;
      console.log(this.pk_customer);
      data.pk_customer = this.pk_customer;
      //保存校验
      this.$refs.bankaccountRef.comp.$refs[
        "BankAccount_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: ylsBusi + "cust/BankAccount/updateORinsert",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.bankaccountRef.getData(
                  "BankAccount_t"
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                
                if (this.rmoveindex !== "") {
                  linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(this.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                this.$refs.bankaccountRef.setData(
                  "BankAccount_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["bankaccountRef"].comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    },
    // 银行账户信息form的取消操作
    bankaccountFormCancel: function(type) {
      if (type === "form") {
        this.$refs["bankaccountRef"].comp.formShow = false;
      } else {
        this.$refs["bankaccountRef"].getTableComp().closeExpandRow();
        let OtherContactTable = this.$refs.bankaccountRef.getData('BankAccount_t');
        OtherContactTable[this.baseEditIndex] = this.baseData;
        this.$refs.bankaccountRef.setData('BankAccount_t', OtherContactTable);
      }
    },
    //银行账户编辑
    bankaccountEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      this.$refs.bankaccountRef.getTableComp().expandRow(scope.row);
      this.$refs.bankaccountRef.comp.formShow = false;
      this.$refs.bankaccountRef.setData('BankAccount',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //银行账户信息删除提示
    bankaccountDeleteTableRow: function(scope) {
      this.bankaccountDelVisible = true;
      this.delId = scope.row.pk_cust_bankaccount;
    },
    //银行账户信息删除
    bankaccountDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/BankAccount/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.requestbankaccount();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      this.bankaccountDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

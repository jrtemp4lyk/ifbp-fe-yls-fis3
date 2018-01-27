<!-- 欠税记录来源信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="TaxesOwedRef"
                        tplId="TaxesOwedTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="TaxesOwedData"
                        :tplResetFun="TaxesOwedResetFun"
                        :tplMethods="TaxesOwedTplMethods"
                        @form-confirm-click="TaxesOwedFormConfirm"
                        @form-cancel-click="TaxesOwedFormCancel"
                        @edit-table-click="TaxesOwedEditTableRow"
                        @delete-table-click="TaxesOwedDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 欠税记录来源信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="TaxesOwedDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="TaxesOwedDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="TaxesOwedDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js';
export default {
  props: ["pk_customer"],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      funnode:"BT003",
      nexuskey:"TaxesOwed",
      TaxesOwedDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 欠税记录来源信息新增
      TaxesOwedIcons: [
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
            let uitemplateComp = oThis.$refs.TaxesOwedRef.comp;
            let table = uitemplateComp.$refs["TaxesOwed_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      TaxesOwedPk: "6e334f71-37f5-47c4-981f-e4689bdd80a0", //custaxes
      TaxesOwedData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      TaxesOwedResetFun: function($node) {
        let $table =  $node.find('el-table');
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
      TaxesOwedTplMethods: {
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
      this.requestTaxesOwed();
    }
  },
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
   //通过cookie获取当前登录用户的ID
    getCookie(cName) {
        let cStart;
        let cEnd;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
    }, 
    
    /**
       *   初始响应方法
       **/
    request() {
        if (this.pk_customer != "") {
          this.requestTaxesOwed();
      }
    },
    //请求欠税记录来源信息
    requestTaxesOwed() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
       
      url = ylsBusi + "cust/TaxesOwed/page";
      let data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            pk_customer: this.pk_customer,
            message_owner: ownerId
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
          this.$refs["TaxesOwedRef"].setData(
            "TaxesOwed_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "欠税信息获取失败",
            type: "error"
          });
        });
    },
    //欠税记录来源情况保存
    TaxesOwedFormConfirm: function() {
     
      //获取当前数据
      let data = this.$refs.TaxesOwedRef.comp.TaxesOwed;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.TaxesOwedRef.comp.$refs[
        "TaxesOwed_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/TaxesOwed/updateORinsert",
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
                let linarraydata = this.$refs.TaxesOwedRef.getData(
                  "TaxesOwed_t"
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
                this.$refs.TaxesOwedRef.setData(
                  "TaxesOwed_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["TaxesOwedRef"].comp.formShow = false;
                //this.requestTaxesOwed();
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
    // 欠税记录来源信息form的取消操作
    TaxesOwedFormCancel: function(type) {
      
      this.$refs.TaxesOwedRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.TaxesOwedRef.formShow = false;
        } else {
          
          this.$refs.TaxesOwedRef.getTableComp().closeExpandRow();
          let TaxesOwedTable = this.$refs.TaxesOwedRef.getData('TaxesOwed_t');
          TaxesOwedTable[this.baseEditIndex] = this.baseData;
          this.$refs.TaxesOwedRef.setData('TaxesOwed_t', TaxesOwedTable);
        }
    },
    //欠税记录来源编辑
    TaxesOwedEditTableRow: function(scope) {
      //记录位置
       
      this.rmoveindex = scope.$index;
      
    
      
      
      this.$refs.TaxesOwedRef.getTableComp().expandRow(scope.row);
      this.$refs.TaxesOwedRef.comp.formShow = false;
      this.$refs.TaxesOwedRef.setData('TaxesOwed',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

    },
    //欠税记录来源信息删除提示
    TaxesOwedDeleteTableRow: function(scope) {
      this.TaxesOwedDelVisible = true;
      this.delId = scope.row.pk_cust_taxes_owed;
    },
    //欠税记录来源信息删除
    TaxesOwedDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/TaxesOwed/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          ;
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.requestTaxesOwed();
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
      this.TaxesOwedDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

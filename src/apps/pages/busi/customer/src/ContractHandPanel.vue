<!-- 在手合同信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="ContractHandRef"
                        tplId="ContractHandTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="ContractHandData"
                        :tplResetFun="ContractHandResetFun"
                        :tplMethods="ContractHandTplMethods"
                        :methods="t_Methods"
                        
                        @form-cancel-click="ContractHandFormCancel"
                        @search-table-click="ContractHandEditTableRow"
                       
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 在手合同信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="ContractHandDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ContractHandDelVisible = false, this.delId=''">取 消</el-button>
        
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
      nexuskey:"ContractHand_UI",
      ContractHandDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 在手合同信息新增
      ContractHandIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "不可操作！",
                  type: "error"
                });
                return;
            }
            // let uitemplateComp = oThis.$refs.ContractHandRef.comp;
            // let table = uitemplateComp.$refs["ContractHand_t_ref"];
            // table.closeExpandRow();
            // uitemplateComp.bankaccount = {};
            // uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      ContractHandPk: "4ff44758-7b27-416f-8b80-ba1206bfa74d", //custaxes
      ContractHandData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      ContractHandResetFun: function($node) {
        let $table =  $node.find('el-table');

      //客户选择联动
        var $refNode1 = this.getNodeById($node, 'gn03ic7ywx5');  
        
          

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        }
        
        // $table.attr(":show-header", "false");
        let operateArr = [
          {
            title: "查看",

            icon: "search"
          }
        
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);

        $table.append(operateHtml);

        

        return $node[0].outerHTML;
      },
      t_Methods: {
        handleRefChange1: function(type, data) {
           
          if(type === 'change') {
            
            this.$refs['ContractHand_ref'].model.customer_code=data.value[0].code;
          }
        }
      },
      ContractHandTplMethods: {
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
      this.requestContractHand();
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
          this.requestContractHand();
      }
    },
    //请求在手合同信息
    requestContractHand() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/ContractHand/page";
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
          this.$refs["ContractHandRef"].setData(
            "ContractHand_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "合同历史信息获取失败",
            type: "error"
          });
        });
    },
    //在手合同情况保存
    ContractHandFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.ContractHandRef.comp.ContractHand;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
       
      //保存校验
      this.$refs.ContractHandRef.comp.$refs[
        "ContractHand_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/ContractHand/updateORinsert",
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
                let linarraydata = this.$refs.ContractHandRef.getData(
                  "ContractHand_t"
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
                this.$refs.ContractHandRef.setData(
                  "ContractHand_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["ContractHandRef"].comp.formShow = false;
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
    // 在手合同信息form的取消操作
    ContractHandFormCancel: function(type) {
      if (type === "form") {
        this.$refs["ContractHandRef"].comp.formShow = false;
      } else {
        this.$refs["ContractHandRef"].getTableComp().closeExpandRow();
        let ContractHandTable = this.$refs.ContractHandRef.getData('ContractHand_t');
        ContractHandTable[this.baseEditIndex] = this.baseData;//获取点击修改前的值
        this.$refs.ContractHandRef.setData('ContractHand_t', ContractHandTable);
      }
    },
    //在手合同编辑
    ContractHandEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      // let row = scope.row;
      // this.$refs["ContractHandRef"].getTableComp().expandRow(row);
      // this.$refs["ContractHandRef"].formShow = false;
      // //ContractHandRef为表单数据对象参数
      // this.$refs["ContractHandRef"].setData("ContractHand", row);
      this.$refs.ContractHandRef.getTableComp().expandRow(scope.row);
      this.$refs.ContractHandRef.comp.formShow = false;
      this.$refs.ContractHandRef.setData('ContractHand',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //在手合同信息删除提示
    ContractHandDeleteTableRow: function(scope) {
      this.ContractHandDelVisible = true;
      this.delId = scope.row.pk_cust_contract_hand;
    },
    //在手合同信息删除
    ContractHandDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/ContractHand/deleteById",
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
            this.requestContractHand();
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
      this.ContractHandDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

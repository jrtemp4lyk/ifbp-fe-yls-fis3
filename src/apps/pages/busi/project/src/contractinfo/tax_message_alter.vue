<template>
<!-- 增值税基本信息变更  -->
<div>
    <ifbp-template ref="taxMessageAlterRef"
                tplId="taxMessageAlter"
                :funnode="funnode"
                :nexuskey="nexusKey"
                :tplData="taxMessageAlterData"
                :tplResetFun="taxMessageAlterResetFun"
                :methods = "taxMethods"
                @form-confirm-click="taxMessageAlterFormConfirm"
                @form-cancel-click="taxMessageAlterFormCancel"
                show-type="table-form"
                form-show="false"
                @edit-table-click="taxMessageAlterEdit"
                @delete-table-click="taxMessageAlterDelete"
                >
     </ifbp-template>

    <!-- 删除提示框-->
    <el-dialog
        title="提示"
        v-model="taxMessageAlterDelVisible"
        :modal="true"
        size="tiny">
        <span>确认删除该条记录？删除后无法恢复。</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="taxMessageAlterDelVisible = false, this.delId=''">取消</el-button>
            <el-button type="primary" @click="taxMessageAlterDelClick">确定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  //应用vue传过来接收参数
 
  props: ["source_bill", "type"],
  data() {
      var oThis = this;
      return {
          scrollDom: document.getElementsByClassName("view")[0],
          taxMessageAlterDelVisible: false,
          removeIndex: "",
          delId: "",
          funnode: "BT009",
          nexusKey: "tax_message_alter",
          taxMessageAlterData: {
              rules: {}
          },
          taxMessageAlterResetFun: function($node) {
              //客户参照
                var $customerRef = this.getNodeById($node,'mupcixhoywi');
                if($customerRef){
                    $customerRef.attr("v-on:trigger", "customerRefChange"); 
                };
              //银行参照
                var $bankRef = this.getNodeById($node,'akv70w5yzy');
                if($bankRef){
                    $bankRef.attr("v-on:trigger", "bankaccountRefChange"); 
                };
                //联系人参照
                var $linkmanRef = this.getNodeById($node,'vo3x043tfq');
                if($linkmanRef){
                    $linkmanRef.attr("v-on:trigger", "linkmanRefChange"); 
                };

              var $table = $node.find("el-table");
              var operateArr = [
                  {
                      title: "编辑",
                      icon: "edit"
                  },
                  {
                      title: "删除",
                      icon: "delete"
                  }
              ];
              var operateHtml = this.getTableOperateHtml(operateArr);
              $table.append(operateHtml);
              return $node[0].outerHTML;
          },
             taxMethods :{
                //客户参照带出相关信息
                 customerRefChange: function(type, data) {
                     
                    oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.tax_no=data.value[0].taxpayer_number; //纳税人识别号
                    oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.company_phone=data.value[0].phone;//公司电话
  
                },
                //银行账户带出相关信息
                bankaccountRefChange: function(type,data){
                    
                    oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.bank_account=data.value[0].refcode;//银行账户
                    oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.deposit_bank=data.value[0].bank_no;//开户银行
                },
                //联系人信息带出
                linkmanRefChange : function(type,data){
                    
                    oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.linkman_phone=data.value[0].mobile;//联系人电话
                },
            },
         
          };
    },
 

  //监听引用传参后实时变动
  computed: {
      currentsource_bill() {
          return this.source_bill;
      }
  },

  //监听参数变动后方法
  watch: {
      source_bill(val) {
          this.requestTaxMessageAlter();
      }
  },

  //获取数据初始化操作
  created () {},

  //页面操作
  mounted() {
      this.request();
  },

  methods: {
      request() {
          if (this.source_bill != "") {
              this.requestTaxMessageAlter();
          }
      },

      //请求增值税基本信息变更表格数据
      requestTaxMessageAlter() {
          
          var url = ylsBusi + "contr/taxMessageAlter/page";
          var data = {
              "orderList": [
                  {
                      "direction": "desc",
                      "property": "ts"
                  }
              ],
              pageNum: 0,
              pageSize: 0,
              searchParams: {
                  searchMap: {
                      source_bill: this.source_bill
                  }
              }
          };
          this.$http({
              url: url,
              headers: {"Content-Type": "application/json"},
              method: "post",
              data: data,
              dataType: "json"
          }).then(res => {
              
              this.taxMessageAlterData = res.data.data.content;
              this.$refs["taxMessageAlterRef"].setData(
                  "taxMessageAlter_t",
                  JSON.parse(JSON.stringify(this.taxMessageAlterData))
              );
          }).catch(() => {
              this.$message({
                  message: "信息获取失败",
                  type: "error"
              });
          });
      },

      //增值税基本信息变更取消按钮
      taxMessageAlterFormCancel: function(type) {
          this.removeIndex = "";
          //关闭表单或者下拉显示行
          if (type === "form") {
              this.$refs["taxMessageAlterRef"].comp.formShow = false;
          } else {
              this.$refs["taxMessageAlterRef"].getTableComp().closeExpandRow();
              var taxDatas = this.$refs.taxMessageAlterRef.getData("taxMessageAlter_t");
              taxDatas[this.taxEditBakIndex] = this.taxEditBakData;
              this.$refs.taxMessageAlterRef.setData("taxMessageAlter_t",taxDatas);
          }
      },

      //增值税基本信息变更保存
      taxMessageAlterFormConfirm: function() {
          //获取当前数据
          let url = "";
          var data = this.$refs.taxMessageAlterRef.comp.taxMessageAlter;
          data.source_bill = this.source_bill;
          if (data.pk_taxmessage_alter) {
              url = ylsBusi + 'contr/taxMessageAlter/update';
          } else {
              url = ylsBusi + 'contr/taxMessageAlter/create';
          }
          this.$http({
              url: url,
              headers: {"Content-Type": "application/json"},
              method: "post",
              data: JSON.parse(JSON.stringify(data))
          }).then(res => {
              
              if (res.data.success === true) {
                  this.$message({
                      message: "保存成功！",
                      type: "success"
                  });
                  this.requestTaxMessageAlter();
                  this.$refs["taxMessageAlterRef"].comp.formShow = false;
              } else {
                  
                  this.$message({
                      message: res.data.error.errorMessage,
                      type: "error"
                  });
              }
          }).catch((e) => {
              console.log(e);
              this.$message({
                  message: "更新失败",
                  type: "error"
              });
          });
      },

      //增值税基本信息变更行编辑
      taxMessageAlterEdit: function(scope) {
          //记录删除位置
          this.removeIndex = scope.$index;

          //行下展开表单页面
          var row = scope.row;
          this.$refs.taxMessageAlterRef.getTableComp().expandRow(row);
          this.$refs.taxMessageAlterRef.formShow = false;

          //taxMessageAlter为表单数据对象参数
          this.$refs.taxMessageAlterRef.setData("taxMessageAlter", row);
          this.taxEditBakData = JSON.parse(JSON.stringify(scope.row));
          this.taxEditBakIndex = scope.$index;
      },

      //增值税基本信息变更行删除提示
      taxMessageAlterDelete: function (scope) {
          this.taxMessageAlterDelVisible = true;
          this.delId = scope.row.pk_taxmessage_alter;
      },

      //增值税基本信息变更行删除方法
      taxMessageAlterDelClick() {
          this.$http({
              url: ylsBusi + "/contr/taxMessageAlter/deleteById",
              headers: {"Content-Type": "application/json"},
              method: "post",
              dataType: "json",
              data: this.delId
          }).then(res => {
              if (res.data.success === true) {
                  this.$message({
                      message: "删除成功",
                      type: "success"
                  });
                  this.requestTaxMessageAlter();
              } else {
                  this.$message({
                      message: res.data.error.errorMessage,
                      type: "error"
                  });
              }
          }).catch(e => {
              this.$message({
                  message: "信息删除失败！",
                  type: "error"
              });
          });
          this.taxMessageAlterDelVisible = false;
          this.delId = "";
      }
  }
};
</script>
<<style>

</style>



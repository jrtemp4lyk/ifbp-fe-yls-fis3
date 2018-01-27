<template>

    <div class="detail-main-container clearfix">
        <!-- 放款申请单列表信息 temp start-->
        <ifbp-panel id="FinLoanContInfoPanel" title="放款申请单列表" :icons="FinLoanContInfoPlusIcons">
          <ifbp-template ref="FinLoanContInfoRef"
                        tplId="FinLoanContInfoTemplate"
                        :tplData="FinLoanContInfoData"
                        :tplResetFun="FinLoanContInfoResetFun"
                        funnode="BT012"
                        nexuskey ="loancontinfo"
                        @form-cancel-click="FinLoanContInfoCancel"
                        @form-confirm-click="FinLoanContInfoFormConfirm"
                        @edit-table-click="FinLoanContInfoEditClick"
                        show-type="table-form" 
                        >
          </ifbp-template>
        </ifbp-panel>
      <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除该数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteloan">确 定</el-button>
        </span>
       </el-dialog>
    </div>
    
</template>
<script>
import { pagination, ylsBusi } from "../../../../../common/js/publicData.js";
export default {
  props: ["sourcebill"],
  data() {
    var oThis = this;
    return {
      delDialogVisible: false,
      //固定写法
      scrollDom: "ifbpScrollDom",
      //放款主键
      pk_fin_loan_apply: this.sourcebill,
      pk_loan_cont_info:'',
      tplData: {},
      // 放款申请单列表信息 FinLoanContInfoRef start
      FinLoanContInfoData: {},
      FinLoanContInfoResetFun: function($node) {
        var $table = $node.find("el-table");
        $table.attr(":show-header", "true");
        var operateArr = [
          {
            title: "编辑",
            icon: "edit"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      //放款申请单列表信息添加
      FinLoanContInfoPlusIcons: [
        {
          icon: "plus",
          click: function() {
            oThis.open();
          }
        },
        {
          icon: "delete",
          click: function() {
            oThis.FinLoanContInfoDeleteClick();
          }
        }
      ]
    };
  },
  methods: {
    Refresh() {
      this.$emit("dialogreturn");
    },
    open() {
      this.$emit("openreturn");
    },
    opendecuted() {
      this.$emit("opendecutedreturn",this.pk_loan_cont_info);
    },
    // 放款申请单列表信息 FinLoanContInfoRef 事件处理 start
    FinLoanContInfoFormConfirm() {
      if (this.sourcebill != null) {
        var data = this.$refs.FinLoanContInfoRef.comp.LoanContInfo_f;
        data.pk_fin_loan_apply = this.sourcebill;
        let url = "";
        if (this.sourcebill) {
          url = ylsBusi + "fin/loancontinfo/update";
        } else {
          url = ylsBusi + "fin/loancontinfo/create";
        }
        this.$http({
          url: url,
          method: "post",
          data: data
        })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.$refs.FinLoanContInfoRef.comp.formShow = false;
              this.Refresh();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(e => {
            this.$message({
              message: "放款申请单列表信息保存失败！",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "请先保存放款信息。",
          type: "error"
        });
      }
    },
    // 放款申请单列表信息 FinLoanContInfoRef 事件处理 end
    // 放款申请单列表信息删除
    //删除操作
    FinLoanContInfoDeleteClick() {
      this.delDialogVisible = true;
    },
    FinLoanContInfoCancel() {
      this.$refs.FinLoanContInfoRef.getTableComp().closeExpandRow();
      this.$refs.FinLoanContInfoRef.comp.formShow = false;
      this.$refs.FinLoanContInfoRef.getTableComp().closeExpandRow();
      let loanPlanTable = this.$refs.FinLoanContInfoRef.getData("LoanContInfo_t");
      loanPlanTable[this.baseEditIndex] = this.baseData;
      this.$refs.FinLoanContInfoRef.setData("LoanContInfo_t", loanPlanTable);
    },
    FinLoanContInfoEditClick(scope) {
      this.$refs.FinLoanContInfoRef.getTableComp().expandRow(scope.row);
      this.$refs.FinLoanContInfoRef.comp.formShow = false;
      this.$refs.FinLoanContInfoRef.setData("LoanContInfo_f", scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //加载投放信息
    loadFinLoanContInfo(pk_fin_loan_apply) {
      this.$http({
        url: ylsBusi + "fin/loancontinfo/getByFinApplyId",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: pk_fin_loan_apply
      })
        .then(res => {
          var originalValue = res.data.data;
          this.$refs["FinLoanContInfoRef"].setData(
            "LoanContInfo_t",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "放款申请单列表信息获取失败",
            type: "error"
          });
        });
    },
    deleteloan() {
      let tableSelections = this.$refs.FinLoanContInfoRef
        .getTableComp()
        .getSelection();
      let ids = [];
      let pk = this.sourcebill;
      if (tableSelections && tableSelections.length > 0) {
        tableSelections.forEach((item, index) => {
          ids[index] = item.pk_loan_cont_info;
        });

        var data = {
          strArray: ids,
          pk: pk
        };
        this.$http({
          url: ylsBusi + "fin/loanapply/deleteLoanApplyInfo",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: data
        })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "初始化成功",
                type: "success"
              });
              this.delDialogVisible=false;
              this.Refresh();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(e => {
            this.$message({
              message: "发送失败！",
              type: "error"
            });
          });
      }
      this.$message({
        message: "请选择要删除的数据",
        type: "success"
      });
    }
  }
};
</script>
<style>
.detail-button-header {
  height: 56px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
}
</style>

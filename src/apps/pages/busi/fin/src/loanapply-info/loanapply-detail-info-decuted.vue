<template>
    <div class="detail-main-container clearfix">
        <ifbp-panel id="findeductedPanel" title="内扣" :icons="findeductedPlusIcons">
          <ifbp-template ref="findeductedRef"
                        tplId="findeductedTemplate"
                        funnode="BT012"
                        nexuskey ="deducted"
                        :tplData="findeductedData"
                        :tplResetFun="findeductedResetFun"
                        @form-confirm-click="findeductedFormConfirm"
                        @form-cancel-click="findeductedFormCancel"
                        @delete-table-click="findeductedDeleteClick"
                        @edit-table-click="findeductedEditClick"
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
            <el-button type="primary" @click="deletefindeductedClick">确 定</el-button>
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
      dialogTableVisible: false,
      delDialogVisible: false,
      //投放计划主键
      pk_loan_cont_info: this.sourcebill,
      tplData: {},

      // 内扣信息 findeductedRef start
      findeductedData: {},
      findeductedResetFun: function($node) {
        var $table = $node.find("el-table");
        $table.attr(":show-header", "true");
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
      //内扣信息添加
      findeductedPlusIcons: [
        {
          icon: "plus",
          click: function() {
            // 关闭table中的编辑区
            oThis.$refs.findeductedRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.findeductedRef.resetFormData();
            // 显示新增区域
            oThis.$refs.findeductedRef.comp.formShow = true;
          }
        },
        {
          icon: "share",
          click: function() {
            oThis.addloan();
          }
        },
        {
          icon: "delete",
          click: function() {
            oThis.deleteloan();
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
    // 内扣信息 findeductedRef 事件处理 start
    findeductedFormConfirm() {
      if (this.pk_loan_cont_info != null) {
        var data = this.$refs.findeductedRef.comp.Deducted_f;
        data.pk_loan_cont_info = this.pk_loan_cont_info;
        var jsonData = JSON.parse(JSON.stringify(data));
        let url = "";
        if (data.pk_fin_deducted) {
          url = ylsBusi + "fin/deducted/update";
        } else {
          url = ylsBusi + "fin/deducted/create";
        }
        this.$http({
          url: url,
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.$refs.findeductedRef.comp.formShow = false;
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
              message: "内扣信息保存失败！",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "请先保存投放计划信息。",
          type: "error"
        });
      }
    },
    findeductedFormCancel() {
      this.$refs.findeductedRef.getTableComp().closeExpandRow();
      this.$refs.findeductedRef.comp.formShow = false;
      this.$refs.findeductedRef.getTableComp().closeExpandRow();
      let loanPlanTable = this.$refs.findeductedRef.getData("Deducted_t");
      loanPlanTable[this.baseEditIndex] = this.baseData;
      this.$refs.findeductedRef.setData("Deducted_t", loanPlanTable);
    },
    findeductedEditClick(scope) {
      this.$refs.findeductedRef.getTableComp().expandRow(scope.row);
      this.$refs.findeductedRef.comp.formShow = false;
      this.$refs.findeductedRef.setData("Deducted_f", scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    // 内扣信息 findeductedRef 事件处理 end
    // 内扣信息删除
    //删除操作
    findeductedDeleteClick(scope) {
      this.pk_fin_deducted = scope.row.pk_fin_deducted;
      this.delDialogVisible = true;
    },
    //删除确定
    deletefindeductedClick() {
      this.$http({
        url: ylsBusi + "fin/deducted/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.pk_fin_deducted
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.delDialogVisible = false;
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
            message: "信息删除失败！",
            type: "error"
          });
        });
    },
    //加载内扣
    loadfindeducted(pk_loan_cont_info) {
      this.$http({
        url: ylsBusi + "fin/deducted/getByFinLoanId",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: pk_loan_cont_info
      })
        .then(res => {
          var originalValue = res.data.data;
          this.$refs["findeductedRef"].setData(
            "Deducted_t",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "内扣信息获取失败",
            type: "error"
          });
        });
    },
    addloan() {
      this.open();
    },
    deleteloan() {
      let tableSelections = this.$refs.findeductedRef
        .getTableComp()
        .getSelection();
      let ids = [];
      let pk = this.pk_loan_cont_info;
      if (tableSelections && tableSelections.length > 0) {
        tableSelections.forEach((item, index) => {
          ids[index] = item.pk_fin_deducted;
        });
        var data = {
          strArray: ids,
          pk: pk
        };
        this.$http({
          url: ylsBusi + "fin/deducted/deleteDeducted",
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
      } else {
        this.$message({
          message: "请选择要删除的条目！",
          type: "error"
        });
      }
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

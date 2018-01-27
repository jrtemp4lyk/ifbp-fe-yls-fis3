<template>
<!--付款条件变更管理模块-->
<div>
     <ifbp-template ref="payConditionRef"
                    tplId="payConditionTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :tplData="paytplData"
                    show-type="table-form"
                    :tplResetFun="payResetFun"
                    @search-table-click="paySearchRow"
                    @edit-table-click="payEditRow"
                    @delete-table-click="payDeleteRow"
                    @form-confirm-click="payFormConfirm"
                    @form-cancel-click="payFormCancel">
     </ifbp-template>

    <!-- 业务付款条件删除提示框 -->
    <el-dialog
      title="提示"
      v-model="payDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="payDelVisible = false , this.delId=''">取 消</el-button>
        <el-button @click="payFormDelete" type="primary" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { ylsBusi } from "../../../../../../common/js/publicData.js";

export default {
  props: ["source_bill"],
  data() {
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      funnode: "BT022",
      nexusKey: "payconditionModify",
      payDelVisible: false,
      delId: null,
      delIndex: null,
      paytplData: {},
      payResetFun: function($node) {
        let $table = $node.find("el-table");
        let operateArr = [
          {
            icon: "search",
            title: "查看"
          },
          {
            icon: "edit",
            title: "编辑"
          },
          {
            icon: "delete",
            title: "删除"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
  },

  computed: {
    cur_source_bill() {
      return this.source_bill;
    }
  },
  watch: {
    source_bill(val) {
      this.payForQuery();
    }
  },
  created() {
    this.payForQuery();
  },
  methods: {

    //查询
    payForQuery() {
      if (this.cur_source_bill) {
        let url = ylsBusi + "contr/modify/paymentCondition/page";
        let dataParams = {
          orderList: [
            {
              direction: "desc",
              property: "ts"
            }
          ],
          searchParams: {
            searchMap: {
              custCondList: [
                { key: "source_bill", oper: "=", value: this.cur_source_bill }
              ]
            }
          }
        };
        this.$http
          .post(url, dataParams, {headers: { "Content-Type": "application/json"}})
          .then(res => {
            let originalValue = res.data.data.content;
            this.$refs.payConditionRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
          });
      }
    },

    //查看
    paySearchRow: function(scope) {
      this.$refs.payConditionRef.getTableComp().expandRow(scope.row);
      this.$refs.payConditionRef.comp.formShow = false;
      this.$refs.payConditionRef.editable = false;
      this.$refs.payConditionRef.setFormData(scope.row);
    },

    //编辑
    payEditRow: function(scope) {
      //备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

      this.$refs.payConditionRef.getTableComp().expandRow(scope.row);
      this.$refs.payConditionRef.comp.formShow = false;
      this.$refs.payConditionRef.editable = true;
      this.$refs.payConditionRef.setFormData(scope.row);
    },

    //编辑/保存-取消
    payFormCancel: function(type) {
      if (type === "form") {
        this.$refs.payConditionRef.comp.formShow = false;
      } else {
        this.$refs.payConditionRef.getTableComp().closeExpandRow();
        //回复为取消前的数据
        this.paytplData.payconditionModifyTable[this.baseEditIndex] = this.baseData;
        // this.$refs.payConditionRef.setFormData(payTableData);
      }
    },

    //编辑-保存
    payFormConfirm: function(type) {
      let data = this.$refs.payConditionRef.comp.payconditionModifyForm;
      //保存
      if (type === "form") {
        data.source_bill = this.cur_source_bill;
        let url = ylsBusi + "contr/modify/paymentCondition/create";
        this.$http
          .post(url, data, { headers: {"Content-Type": "application/json" }})
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.paytplData.payconditionModifyTable.unshift(res.data.data);
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
        this.$refs.payConditionRef.comp.formShow = false;
      } else {
        //更新
        let url = ylsBusi + "contr/modify/paymentCondition/update";
        this.$http
          .post(url, data, { headers: { "Content-Type": "application/json" } })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "更新成功！",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
        this.$refs.payConditionRef.getTableComp().closeExpandRow();
      }
    },

    //删除-弹框提醒
    payDeleteRow: function(scope) {
      this.payDelVisible = true;
      this.delId = scope.row.pk_prj_payment_condition;
      this.delIndex = scope.$index;
    },

    //删除-确定
    payFormDelete() {
      let url = ylsBusi + "contr/modify/paymentCondition/deleteById";
      this.$http
        .post(url, this.delId, {headers: { "Content-Type": "application/json"}})
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.paytplData.payconditionModifyTable.splice(this.delIndex, 1);
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        });
      this.payDelVisible = false;
      this.delId = null;
    }
  }
};
</script>
<style>

</style>

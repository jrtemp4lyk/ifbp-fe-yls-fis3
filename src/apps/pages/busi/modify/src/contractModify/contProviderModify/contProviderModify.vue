<template>
<!--供应商管理模块-->
<div>
          <ifbp-template ref="contProviderRef"
                        tplId="contProviderTemplate"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="provtplData"
                        show-type="table-form"
                        :tplResetFun="provResetFun"
                        @search-table-click="provSearchRow"
                        @edit-table-click="provEditRow"
                        @delete-table-click="provDeleteRow"
                        @form-confirm-click="provFormConfirm"
                        @form-cancel-click="proFormCancel">
          </ifbp-template>

    <!-- 供应商 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="provDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="provDelVisible = false , this.delId=''">取 消</el-button>
        <el-button @click="provFormDelete" type="primary" >确 定</el-button>
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
      nexusKey: "contProviderModify",
      provDelVisible: false,
      delId: null,
      delIndex: null,
      provtplData: {},
      //渲染表格
      provResetFun: function($node) {
        let $table = $node.find("el-table");
        var operateArr = [
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
      this.provForQuery();
    }
  },
  mounted() {
    this.provForQuery();
  },
  methods: {

    //查询
    provForQuery() {
      if (this.cur_source_bill) {
        let url = ylsBusi + "contr/modify/contProvider/page";
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
            this.$refs.contProviderRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
          });
      }
    },

    //查看
    provSearchRow: function(scope) {
      this.$refs.contProviderRef.getTableComp().expandRow(scope.row);
      this.$refs.contProviderRef.comp.formShow = false;
      this.$refs.contProviderRef.editable = false;
      this.$refs.contProviderRef.setFormData(scope.row);
    },

    //编辑
    provEditRow: function(scope) {
      //备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

      this.$refs.contProviderRef.getTableComp().expandRow(scope.row);
      this.$refs.contProviderRef.comp.formShow = false;
      this.$refs.contProviderRef.editable = true;
      this.$refs.contProviderRef.setFormData(scope.row);
    },

    //编辑/保存-取消
    proFormCancel: function(type) {
      if (type === "form") {
        this.$refs.contProviderRef.comp.formShow = false;
      } else {
        this.$refs.contProviderRef.getTableComp().closeExpandRow();
        //回复为取消前的数据
        this.provtplData.contProviderModifyTable[this.baseEditIndex] = this.baseData;
        // this.$refs.contProviderRef.setFormData(provTableData);
      }
    },

    //编辑-保存
    provFormConfirm: function(type) {
      let data = this.$refs.contProviderRef.comp.contProviderModifyForm;
      if (type === "form") {
        data.source_bill = this.cur_source_bill;
        let url = ylsBusi + "contr/modify/contProvider/create";
        this.$http
          .post(url, data, { headers: { "Content-Type": "application/json" } })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.provtplData.contProviderModifyTable.unshift(res.data.data);
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
        this.$refs.contProviderRef.comp.formShow = false;
      } else {
        //更新
        let url = ylsBusi + "contr/modify/contProvider/update";
        this.$http
          .post(url, data, { headers: {"Content-Type": "application/json"}})
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
        this.$refs.contProviderRef.getTableComp().closeExpandRow();
      }
    },

    //删除提醒
    provDeleteRow: function(scope) {
      this.provDelVisible = true;
      this.delId = scope.row.pk_prj_provider;
      this.delIndex = scope.$index;
    },

    //删除
    provFormDelete() {
      let url = ylsBusi + "contr/modify/contProvider/deleteById";
      this.$http
        .post(url, this.delId, {headers: { "Content-Type": "application/json"}})
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.provtplData.contProviderModifyTable.splice(this.delIndex, 1);
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        });
      this.provDelVisible = false;
      this.delId = null;
    }
  }
};
</script>
<style>

</style>

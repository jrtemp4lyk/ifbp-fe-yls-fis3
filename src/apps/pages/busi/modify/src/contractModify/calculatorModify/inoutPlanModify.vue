<template>
<!--收支计划信息变更管理模块-->


<div>
      
     <ifbp-template ref="inoutPlanRef"
                    tplId="inoutPlanTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :tplData="inoutPlantplData"
                    :tplResetFun="inoutPlanResetFun"
                    show-type="table-form"
                    @edit-table-click="inoutPlanEditRow"
                    @delete-table-click="inoutPlanDeleteRow"
                    @search-table-click="inoutPlanSearchRow"
                    @form-confirm-click="inoutPlanFormConfirm"
                    @form-cancel-click="inoutPlanFormCancel">
     </ifbp-template>

    <!-- 收支计划删除提示框 -->
    <el-dialog
      title="提示"
      v-model="inoutPlanDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="inoutPlanDelVisible = false , this.delId=''">取 消</el-button>
        <el-button @click="inoutPlanFormDelete" type="primary" >确 定</el-button>
      </span>
    </el-dialog>

    <!--分页组件-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
    </el-pagination>

  </div>
</template>
<script>
import {pagination, ylsBusi } from "../../../../../../common/js/publicData.js";
export default {
  mixins: [pagination('inoutPlanForSearch')],
  props: ["pk_quote_calculator"],
  data() {
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      funnode: "BT022",
      nexusKey: "inoutPlanModify",
      inoutPlanDelVisible: false,
      delId: null,
      delIndex: null,
      inoutPlantplData: {},

      //渲染表格
      inoutPlanResetFun: function($node) {
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
    cur_pk_quote_calculator() {
      return this.pk_quote_calculator;
    }
  },
  watch: {
    pk_quote_calculator(val) {
      this.inoutPlanForSearch();
    }
  },
  //页面操作
  mounted() {
    this.inoutPlanForSearch();
  },
  methods: {
    //查询
    inoutPlanForSearch() {
      if (this.cur_pk_quote_calculator) {
        let url = ylsBusi + "contr/modify/inoutPlan/page";
        let dataParams = {
          orderList: [
            {
              direction: "asc",
              property: "plan_date"
            }
          ],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: {
              custCondList: [
                { key: "pk_quote_calculator", oper: "=", value: this.pk_quote_calculator }
              ]
            }
          }
        };
        this.$http
          .post(url, dataParams, {headers: { "Content-Type": "application/json" }})
          .then(res => {
            let originalValue = res.data.data.content;
            this.$refs.inoutPlanRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
            this.totalElements = res.data.data.totalElements;
          });
      }else{
        this.$refs.inoutPlanRef.setTableData(null);
        this.totalElements = 0;
      }
    },
    //查看
    inoutPlanSearchRow: function(scope) {
      this.$refs.inoutPlanRef.getTableComp().expandRow(scope.row);
      this.$refs.inoutPlanRef.comp.formShow = false;
      this.$refs.inoutPlanRef.editable = false;
      this.$refs.inoutPlanRef.setFormData(scope.row);
    },

    //编辑
    inoutPlanEditRow: function(scope) {
      //备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

      this.$refs.inoutPlanRef.getTableComp().expandRow(scope.row);
      this.$refs.inoutPlanRef.comp.formShow = false;
      this.$refs.inoutPlanRef.editable = true;
      this.$refs.inoutPlanRef.setFormData(scope.row);
    },

    //编辑-取消
    inoutPlanFormCancel: function(type) {
      if (type === "form") {
        this.$refs.inoutPlanRef.comp.formShow = false;
      } else {
        this.$refs.inoutPlanRef.getTableComp().closeExpandRow();
        //回复为取消前的数据
        this.inoutPlantplData.inoutPlanModifyTable[this.baseEditIndex] = this.baseData;
        // this.$refs.inoutPlanRef.setFormData(payTableData);
      }
    },

    //保存
    inoutPlanFormConfirm: function(type) {
      let data = this.$refs.inoutPlanRef.comp.inoutPlanModifyForm;
      if (type === "form") {
        data.pk_quote_calculator = this.cur_pk_quote_calculator;
        let url = ylsBusi + "contr/modify/inoutPlan/create";
        this.$http
          .post(url, data, { headers: { "Content-Type": "application/json" } })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.paytplData.contProviderModifyTable.unshift(res.data.data);
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
        this.$refs.inoutPlanRef.comp.formShow = false;
      } else {
        //更新
        let url = ylsBusi + "contr/modify/inoutPlan/update";
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
        this.$refs.inoutPlanRef.getTableComp().closeExpandRow();
      }
    },

    //删除提醒
    inoutPlanDeleteRow: function(scope) {
      this.inoutPlanDelVisible = true;
      this.delId = scope.row.pk_quote_inout_plan;
      this.delIndex = scope.$index;
    },

    //删除
    inoutPlanFormDelete() {
      let url = ylsBusi + "contr/modify/inoutPlan/deleteById";
      this.$http
        .post(url, this.delId, {
          headers: { "Content-Type": "application/json" }
        })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.inoutPlantplData.inoutPlanModifyTable.splice(this.delIndex, 1);
            this.totalElements--;
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        });
      this.inoutPlanDelVisible = false;
      this.delId = null;
    }
  }
};
</script>
<style>

</style>

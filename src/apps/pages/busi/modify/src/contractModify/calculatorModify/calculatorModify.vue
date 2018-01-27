<template>
<!--报价信息变更管理模块-->
 <div>
     <ifbp-template ref="calculatorRef"
                    tplId="calculatorTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :tplData="caltplData"
                    show-type="table-form"
                    :tplResetFun="calRestFun"
                    @edit-table-click="calEditRow"
                    @search-table-click="calSearchRow"
                    @form-confirm-click="calFormConfirm"
                    @form-cancel-click="calForCancel">
    </ifbp-template>
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
      nexusKey: "calculatorModify",
      calculators: [],
      caltplData: {},
      //渲染表格
      calRestFun: function($node) {
        let $table = $node.find("el-table");
        var operateArr = [
          {
            icon: "search",
            title: "查看"
          },
          {
            icon: "edit",
            title: "编辑"
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
      this.calForQuery();
    },
    calculators(val){
      this.$emit("onChangeInoutPlan", val);
    }
  },
  //页面操作
  mounted() {
    this.calForQuery();
  },
  methods: {

    //查询
    calForQuery() {
      if (this.cur_source_bill) {
        let url = ylsBusi + "contr/modify/quoteCalculator/page";
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
            if (originalValue.length) {
              originalValue.forEach((item, index) => {
                let name = index == 0 ? "基础报价" : "起租报价"+index;
                let obj = { text: name, value: item.pk_quote_calculator };
                this.calculators.push(obj);
              });
            }
            this.$refs.calculatorRef.setTableData(
              JSON.parse(JSON.stringify(originalValue))
            );
          });
      }
    },
    //查看
    calSearchRow: function(scope) {
      this.$refs.calculatorRef.getTableComp().expandRow(scope.row);
      this.$refs.calculatorRef.comp.formShow = false;
      this.$refs.calculatorRef.editable = false;
      this.$refs.calculatorRef.setFormData(scope.row);
    },
    //编辑
    calEditRow: function(scope) {
      //备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

      this.$refs.calculatorRef.getTableComp().expandRow(scope.row);
      this.$refs.calculatorRef.comp.formShow = false;
      this.$refs.calculatorRef.editable = true;
      this.$refs.calculatorRef.setFormData(scope.row);
    },

    //编辑/保存-取消
    calForCancel: function(type) {
      if (type === "form") {
        this.$refs.calculatorRef.comp.formShow = false;
      } else {
        this.$refs.calculatorRef.getTableComp().closeExpandRow();
        //回复为取消前的数据
        this.caltplData.calculatorModifyTable[this.baseEditIndex] = this.baseData;
      }
    },

    //保存
    calFormConfirm: function(type) {
      let data = this.$refs.calculatorRef.comp.calculatorModifyForm;
      if (type === "form") {
        data.source_bill = this.cur_source_bill;
        let url = ylsBusi + "contr/modify/quoteCalculator/create";
        this.$http
          .post(url, data, { headers: { "Content-Type": "application/json" } })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "保存成功！",
                type: "success"
              });
              this.paytplData.calculatorModifyTable.unshift(res.data.data);
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
        this.$refs.calculatorRef.comp.formShow = false;
      } else {
        //更新
        let url = ylsBusi + "contr/modify/quoteCalculator/save";
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
        this.$refs.calculatorRef.getTableComp().closeExpandRow();
      }
    },
    //报价发生变动
    calculatorChange: function(val) {
      this.$emit("onChangeInoutPlan", val);
    },
  }
};
</script>
<style>

</style>

<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">起租</h2>
    </div>
    
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button type="primary" v-if="editable" class="button-no-radius" @click="clickSave">保存</el-button>
          <el-button type="default" v-if="editable" class="button-no-radius" @click="clickCancel">取消</el-button> 
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 起租主模板 temp start-->
        <ifbp-panel id="basePanel" title="起租" :icons="baseIcons" >
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    funnode="BT015"
                    nexuskey ="rentInfo"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
        </ifbp-panel>
        <!-- 报价主模板 temp start-->
        <ifbp-panel id="quoteCalculator" title="报价"  >
          <ifbp-template ref="quoteCalculatorRef"
                    tplId="quoteCalculator"
                    funnode="BT015"
                    nexuskey ="finCalculator"
                    show-type="form"
                    :tplData="quoteCalculatorDate"
                    :editable="editable">
          </ifbp-template>
        </ifbp-panel>
        <!-- 收支计划 temp start-->
        <ifbp-panel id="fininoutplanPanel" title="收支计划" :icons="fininoutplanPlusIcons">
          <ifbp-template ref="fininoutplanRef"
                        tplId="fininoutplanTemplate"
                        funnode="BT015"
                        nexuskey ="finInOutPlan"
                        :tplData="fininoutplanData"
                        :tplResetFun="fininoutplanResetFun"
                        @form-confirm-click="fininoutplanFormConfirm"
                        @form-cancel-click="fininoutplanFormCancel"
                        @delete-table-click="fininoutplanDeleteClick"
                        @edit-table-click="fininoutplanEditDeleteClick"
                        show-type="table-form" 
                        >
          </ifbp-template>
        </ifbp-panel>
        <!-- 收支计划 temp end-->
        <!--删除确认Dialog-->
      

      </ifbp-panel-group>
      <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除该数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deletefininoutplanClick">确 定</el-button>
        </span>
       </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var oThis = this;
    return {
      delDialogVisible: false,
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //起租主键
      pk_fin_rent_info: "",
      pk_quote_calculator: "",
      // 起租主模板 baseTemplateRef start
      tplData: {},
      editable: false,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
      ],
      // 起租主模板 baseTemplateRef end

      // 报价模板 baseTemplateRef start
      quoteCalculatorDate: {},
      // 报价模板 baseTemplateRef end

      // 收支计划 fininoutplanRef start
      fininoutplanData: {},
      fininoutplanResetFun: function($node) {
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
      //收支计划添加
      fininoutplanPlusIcons: [
        {
          icon: "plus",
          click: function() {
            
            var uitemplateComp = oThis.$refs.fininoutplanRef.comp;
            var table = uitemplateComp.$refs["QuoteInoutPlan_t"];
            table.closeExpandRow();
            uitemplateComp.finrentinfo = {};
            uitemplateComp.formShow = true;
          }
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //返回按钮
    goBack() {
      window.history.back(-1);
    },
    // 起租主模板 baseTemplateRef 事件处理 start
    clickCancel() {
      this.editable = false;
    },
    clickSave() {
      var RentInfo = this.$refs.baseTemplateRef.comp.RentInfo_f;
      var Quote = this.$refs.quoteCalculatorRef.comp.QuoteCalculator_f;
      var data = {
        rentInfoEntity: RentInfo,
        quoteCalculatorEntity: Quote
      };
      var jsonData = JSON.parse(JSON.stringify(data));
      
      this.$http({
        url: "/yls-busi-web/fin/rentinfo/saveMain",
        // headers: {'Content-Type': 'application/json'},
        method: "post",
        data: jsonData
      })
        .then(res => {
          
          this.editable = false;
          var originalValue = res.data.data.rentInfoEntity;
          var quoteValue = res.data.data.quoteCalculatorEntity;
          this.pk_fin_rent_info = res.data.data.rentInfoEntity.pk_fin_rent_info;
          this.$refs["baseTemplateRef"].setData(
            "RentInfo_f",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.$refs["quoteCalculatorRef"].setData(
            "QuoteCalculator_f",
            JSON.parse(JSON.stringify(quoteValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "起租保存失败！",
            type: "error"
          });
        });
    },
    // 起租主模板 baseTemplateRef 事件处理 end

    // 收支计划 fininoutplanRef 事件处理 start
    fininoutplanFormConfirm() {
      if (this.pk_fin_rent_info != null) {
        var data = this.$refs.fininoutplanRef.comp.Fininoutplan;
        //TODO UI模板待完善
        data.pk_fin_rent_info = this.pk_fin_rent_info;
        var jsonData = JSON.parse(JSON.stringify(data));
        this.$http({
          url: "/yls-busi-web/fin/fininoutplan/create",
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
              this.$refs.fininoutplanRef.comp.formShow = false;
              this.loadfininoutplan(data.pk_quote_calculator);
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(e => {
            this.$message({
              message: "收支计划保存失败！",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "请先保存起租信息。",
          type: "error"
        });
      }
    },
    fininoutplanFormCancel() {
      this.$refs.fininoutplanRef.comp.formShow = false;
    },
    fininoutplanEditDeleteClick() {
      this.$refs.fininoutplanRef.comp.formShow = true;
    },

    // 收支计划 fininoutplanRef 事件处理 end
    // 收支计划删除
    //删除操作
    fininoutplanDeleteClick(scope) {
      this.pk_quote_loan_plan = scope.row.pk_quote_loan_plan;
      this.delDialogVisible = true;
    },
    //删除确定
    deletefininoutplanClick() {
      this.$http({
        url: "/yls-busi-web/quote/inoutPlan/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.pk_quote_loan_plan
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.delDialogVisible = false;
            this.loadfininoutplan(this.pk_fin_rent_info);
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

    //加载数据方法
    loadData() {
      this.pk_fin_rent_info = this.$root.$router.currentRoute.params.id;
      //router name
      //this.$root.$router.currentRoute.name;
      //详情页面
      if (this.pk_fin_rent_info && this.pk_fin_rent_info != "") {
        //加载起租信息
        this.loadfinrentinfo(this.pk_fin_rent_info);
      } else {
        this.editable = true;
      }
    },
    //加载起租信息
    loadfinrentinfo(pk_fin_rent_info) {
      this.$http({
        url: "/yls-busi-web/fin/rentinfo/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: pk_fin_rent_info
      })
        .then(res => {
          var originalValue = res.data.data;
          this.pk_quote_calculator = res.data.data.pk_quote_calculator;
          this.loadcalculatorinfo(this.pk_quote_calculator);
          this.loadfininoutplan(this.pk_quote_calculator);
          this.$refs["baseTemplateRef"].setData(
            "RentInfo_f",
            JSON.parse(JSON.stringify(originalValue))
          );
          
        })
        .catch(e => {
          this.$message({
            message: "起租详情获取失败",
            type: "error"
          });
        });
    },
    //加载报价信息
    loadcalculatorinfo(pk_quote_calculator) {
      this.$http({
        url: "/yls-busi-web/quote/calc/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: this.pk_quote_calculator
      })
        .then(res => {
          
          var originalValue = res.data.data;
          this.$refs["quoteCalculatorRef"].setData(
            "QuoteCalculator_f",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "报价获取失败",
            type: "error"
          });
        });
    },
    //加载收支计划
    loadfininoutplan(pk_quote_calculator) {
      this.$http({
        url: "/yls-busi-web/quote/inoutPlan/getByCalcId",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: this.pk_quote_calculator
      })
        .then(res => {
          
          var originalValue = res.data.data;
          this.$refs["fininoutplanRef"].setData(
            "QuoteInoutPlan_t",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "收支计划获取失败",
            type: "error"
          });
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

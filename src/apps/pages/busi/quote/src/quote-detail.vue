<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">报价测算</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack" >返回</el-button>
          <el-button class="fr" type="primary" @click="onCalc" style="margin-right:10px" v-show="true">测算</el-button>
        </div>
        <!-- 报价主模板 temp start-->
        <ifbp-panel id="basePanel" title="报价信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :methods="formReSetMethods"
                    :tpl-reset-fun="formResetFun"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 报价主模板 temp end-->

        <!-- 投放计划 temp start-->
          <ifbp-panel id="loanPlanPanel" title="投放计划" :icons="loanPlanPlusIcons">
          <ifbp-template ref="loanPlanRef"
                        tplId="linkmanTemplate"
                        :funnode="loanPlan_funnode"
                        :nexuskey="loanPlan_nexusKey"
                        :tplData="loanPlanData"
                        :tplResetFun="loanPlanResetFun"
                        @form-confirm-click="loanPlanFormConfirm"
                        @form-cancel-click="loanPlanFormCancel"
                        @edit-table-click="loanPlanEditTableRow"
                        @delete-table-click="loanPlanDeleteTableRow"
                        show-type="table-form"
                        >
          </ifbp-template>
        </ifbp-panel>
        <!-- 投放计划 temp end-->

        <!-- 规则设置 temp start-->
        <ifbp-panel id="loanRulePanel" title="投放规则" :icons="loanRulePlusIcons">
          <ifbp-template ref="loanRuleRef"
                        tplId="loanRuleTemplate"
                        :funnode="loanRule_funnode"
                        :nexuskey="loanRule_nexusKey"
                        :tplData="loanRuleData"
                        :tplResetFun="loanRuleResetFun"
                        @form-confirm-click="loanRuleFormConfirm"
                        @form-cancel-click="loanRuleFormCancel"
                        @edit-table-click="loanRuleEditTableRow"
                        @delete-table-click="loanRuleDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
        </ifbp-panel>
        <!-- 规则设置 temp end-->

        <!-- 租金计划表 temp start-->
        <ifbp-panel id="inoutPlanPanel" title="租金计划表">
          <ifbp-template ref="inoutPlanRef"
                        tplId="inoutPlanTemplate"
                        :funnode="inoutPlan_funnode"
                        :nexuskey="inoutPlan_nexusKey"
                        :tplData="inoutPlanData"
                        show-type="table"
                       >
          </ifbp-template>
        </ifbp-panel>
        <!-- 租金计划表 temp end-->
      </ifbp-panel-group>
    </div>

    <!--删除确认Dialog-->
      <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除该数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
        </span>
       </el-dialog>

  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js'
export default {
  data() {
    let oThis = this;
    return {
      //固定写法
      scrollDom: document.getElementsByClassName('view')[0],
      //报价主键
      pk_calc:'',
      //删除对话框是否展示
      delDialogVisible:false,
      //删除标识，区分子表
      delType:'',
      //删除实体主键
      delId:'',
      // 报价主模板 baseTemplateRef start
      // pk_temp:'a57c6167-ee45-434a-bff1-ed127f18f5d3',
      funnode:"BT007",
      nexusKey:"CALC001",
      tplData:{},
      //是否编辑态
      editable:false,
      baseIcons: [
        {
          icon: 'edit',
          click: function() {
            oThis.editable = !oThis.editable;
            //备份数据，取消时使用
            oThis.data = JSON.parse(JSON.stringify(oThis.$refs.baseTemplateRef.getData('QuoteCalculator')));
          },
        }
      ],
      //控件绑定事件
      formResetFun($node){
        //投放金额
        let $loan_plan_cash = $node.find("el-number[v-model='QuoteCalculator.loan_plan_cash']");
        if($loan_plan_cash.length) {
          // 添加绑定事件, 首付款绑定downPaymentChange
          $loan_plan_cash.attr("v-on:change", "loanPlanCashChange");
        }

         //首付款
        let $down_payment = $node.find("el-number[v-model='QuoteCalculator.down_payment']");
        if($down_payment.length) {
          // 添加绑定事件, 首付款绑定downPaymentChange
          $down_payment.attr("v-on:change", "downPaymentChange");
        }

        //首付款比例
        let $down_payment_ratio = $node.find("el-percent[v-model='QuoteCalculator.down_payment_ratio']");
        if($down_payment_ratio.length) {
          $down_payment_ratio.attr("v-on:change", "downPaymentRatioChange");
        }

        //保证金
        let $deposit_cash = $node.find("el-number[v-model='QuoteCalculator.deposit_cash']");
        if($deposit_cash.length) {
          $deposit_cash.attr("v-on:change", "depositCashChange");
        }
        //保证金比例
        let $deposit_ratio = $node.find("el-percent[v-model='QuoteCalculator.deposit_ratio']");
        if($deposit_ratio.length) {
          $deposit_ratio.attr("v-on:change", "depositRatioChange");
        }

        //手续费
        let $srvfee_cash_in = $node.find("el-number[v-model='QuoteCalculator.srvfee_cash_in']");
        if($srvfee_cash_in.length) {
          $srvfee_cash_in.attr("v-on:change", "srvfeeCashInChange");
        }
        //手续费比例
        let $srvfee_ratio_in = $node.find("el-percent[v-model='QuoteCalculator.srvfee_ratio_in']");
        if($srvfee_ratio_in.length) {
          $srvfee_ratio_in.attr("v-on:change", "srvfeeRatioInChange");
        }
      },
      //控件绑定事件实现
      formReSetMethods:{

        //投放金额
        loanPlanCashChange(data){
          if( data && data !== ''){
            let down_payment = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment;
            let down_payment_ratio = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment_ratio;
            if(down_payment && down_payment!==''){
              //计算首付款比例
              down_payment_ratio = down_payment/data;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment_ratio = down_payment_ratio;
            }else if(down_payment_ratio && down_payment_ratio!==''){
              //计算首付款
              down_payment = down_payment_ratio*data;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment = down_payment;
            }

            //保证金
            let deposit_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash;
            let deposit_ratio = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_ratio;
            if(deposit_cash && deposit_cash!==''){
                deposit_ratio = deposit_cash/data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_ratio = deposit_ratio;
            }else if(deposit_ratio && deposit_ratio!==''){
                deposit_cash = deposit_ratio*data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash = deposit_cash;
            }

            //手续费
            let srvfee_cash_in = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_cash_in;
            let srvfee_ratio_in = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_ratio_in;
            if(srvfee_cash_in && srvfee_cash_in!==''){
                srvfee_ratio_in = srvfee_cash_in/data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_ratio_in = srvfee_ratio_in;
            }else if(srvfee_ratio_in && srvfee_ratio_in!==''){
                srvfee_cash_in = srvfee_ratio_in*data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash = srvfee_cash_in;
            }
          }
        },
        //首付款失去焦点
        downPaymentChange(data){
          if( data && data !== ''){
            let loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
            let down_payment_ratio = data/loan_plan_cash;
            oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment_ratio = down_payment_ratio;
          }
        },
        //首付款比例失去焦点
        downPaymentRatioChange(data){
          if( data && data !== ''){
            let loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
            let down_payment = loan_plan_cash*data;
            oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment = down_payment;
          }
        },
        //保证金金额
        depositCashChange(data){
          if( data && data !== ''){
            let loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
            let deposit_ratio = data/loan_plan_cash;
            oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_ratio = deposit_ratio;
          }
        },
         //保证金比例
        depositRatioChange(data){
          if( data && data !== ''){
            let loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
            let deposit_cash = data*loan_plan_cash;
            oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash = deposit_cash;
          }
        },
        //服务费
        srvfeeCashInChange(data){
          if( data && data !== ''){
            let loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
            let srvfee_ratio_in = data/loan_plan_cash;
            oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_ratio_in = srvfee_ratio_in;
          }
        },
        //服务费比例
        srvfeeRatioInChange(data){
          if( data && data !== ''){
            let loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
            let srvfee_cash_in = data*loan_plan_cash;
            oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_cash_in = srvfee_cash_in;
          }
        }
      },
      // 报价主模板 baseTemplateRef end

      // 投放计划 loanPlanRef start
      // loanPlan_pk_temp:'cece85f5-6732-4c39-ba6a-0d4810ca03f8',
      loanPlan_funnode:"BT007",
      loanPlan_nexusKey:"CALC002",
      loanPlanData:{},
      loanPlanResetFun($node) {
        let $table = $node.find("el-table");
        $table.attr(':show-header','true');
        let operateArr = [
          {
            title: '编辑',
            icon: 'edit',
          },
          {
            title: '删除',
            icon: 'delete',
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      //投放计划添加
      loanPlanPlusIcons: [
        {
          icon: 'plus',
          click () {
             // 关闭table中的编辑区
            oThis.$refs.loanPlanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.loanPlanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.loanPlanRef.formShow = true;
          },
        }
      ],
      // 投放计划 loanPlanRef end

      // 规则设置 loanRuleRef start
      // loanRule_pk_temp:'c286e256-19e3-4bdf-83d2-7d0a4111f346',
      loanRule_funnode:"BT007",
      loanRule_nexusKey:"CALC003",
      loanRuleData:{},
      loanRuleResetFun($node) {
        let $table = $node.find("el-table");
        $table.attr(':show-header','true');
        let operateArr = [
          {
            title: '编辑',
            icon: 'edit',
          },
          {
            title: '删除',
            icon: 'delete',
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
       //投放规则添加
      loanRulePlusIcons: [
        {
          icon: 'plus',
          click() {
            // 关闭table中的编辑区
            oThis.$refs.loanRuleRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.loanRuleRef.resetFormData();
            // 显示新增区域
            oThis.$refs.loanRuleRef.formShow = true;
          }
        }
      ],
      // 规则设置 loanRuleRef end

      // 租金计划表 inoutPlanRef start
      // inoutPlan_pk_temp:"ba531d61-3088-4abb-8531-ae6b165a3031",
      inoutPlan_funnode:"BT007",
      inoutPlan_nexusKey:"CALC004",
      inoutPlanData:{}
      // 租金计划表 inoutPlanRef end
    };
  },
  created() {
    this.loadData();
  },
  methods: {
     //返回按钮
      goBack(){
        window.history.back(-1);
      },
      //测算
      onCalc(){
        this.$http({
          url: ylsBusi+'quote/calc/calculateById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.pk_calc,
        }).then(res => {
          debugger;
          //加载租金计划表
          this.loadInoutPlan(this.pk_calc);
        }).catch(e => {
          this.$message({
            message: '报价测算失败！',
            type: 'error',
          });
        });
      },
      // 报价主模板 baseTemplateRef 事件处理 start
      clickCancel(){
        this.editable = false;
        //恢复修改前值
        // this.$refs.baseTemplateRef.setData('QuoteCalculator',this.data);
        this.$refs["baseTemplateRef"].setData('QuoteCalculator',this.data);
      },
      clickSave(){
        let data = this.$refs.baseTemplateRef.comp.QuoteCalculator;
        this.$http({
            url: ylsBusi+'quote/calc/save',
            // headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data,
        }).then(res => {
            this.pk_calc = res.data.data.pk_quote_calculator;
            location.hash = '/quote/detail/' + this.pk_calc;
            this.editable = false;
            let originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              'QuoteCalculator',
              originalValue
            );
          //加载投放信息
          this.loadLoanPlan(this.pk_calc);
          //加载规则信息
          this.loadPlanRule(this.pk_calc);
        }).catch(e => {
          this.$message({
            message: '报价保存失败！',
            type: 'error',
          });
        });
      },
      // 报价主模板 baseTemplateRef 事件处理 end

      // 投放计划 loanPlanRef 事件处理 start
      loanPlanFormConfirm(){
        if( this.pk_calc  && this.pk_calc !== ''){
          let data = this.$refs.loanPlanRef.comp.QuoteLoanPlan;
          let jsonData = JSON.parse(JSON.stringify(data));
          jsonData.pk_quote_calculator = this.pk_calc;
          this.$http({
            url: ylsBusi+'quote/loanPlan/save',
            // headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:jsonData
          }).then(res => {
            if (res.data.success === true) {
                  this.$message({
                    message: '保存成功！',
                    type: 'success',
                  });
                  this.$refs.loanPlanRef.comp.formShow = false;
                  this.loadLoanPlan(this.pk_calc);
                } else {
                  this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error',
                  });
                }
          }).catch(e => {
            this.$message({
              message: '投放计划保存失败！',
              type: 'error',
            });
          });
        }else{
          this.$message({
                  message: '请先保存报价信息!',
                  type: 'error'
                });
        }
      },
      loanPlanFormCancel(type){
        this.$refs.loanPlanRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.loanPlanRef.formShow = false;
        } else {
          this.$refs.loanPlanRef.getTableComp().closeExpandRow();
          let loanPlanTable = this.$refs.loanPlanRef.getData('QuoteLoanPlan_t');
          loanPlanTable[this.baseEditIndex] = this.baseData;
          this.$refs.loanPlanRef.setData('QuoteLoanPlan_t', loanPlanTable);
        }
      },
      loanPlanEditTableRow(scope){
       this.$refs.loanPlanRef.getTableComp().expandRow(scope.row);
       this.$refs.loanPlanRef.comp.formShow = false;
       this.$refs.loanPlanRef.setData('QuoteLoanPlan',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

      },
      loanPlanDeleteTableRow(scope){
        this.delType = 'loanPlan';
        this.delDialogVisible = true;
        this.delId = scope.row.pk_quote_loan_plan;
      },
      // 投放计划 loanPlanRef 事件处理 end

      // 规则设置 loanRuleRef 事件处理 start
      loanRuleFormConfirm(){
        if( this.pk_calc && this.pk_calc !== ''){
          let data = this.$refs.loanRuleRef.comp.QuoteRule;
          let jsonData = JSON.parse(JSON.stringify(data));
          jsonData.pk_quote_calculator = this.pk_calc;
          this.$http({
            url:ylsBusi +'quote/rule/save',
            method: 'post',
            data:jsonData
          }).then(res => {
            if (res.data.success === true) {
                  this.$message({
                    message: '保存成功！',
                    type: 'success'
                  });
                  this.$refs.loanRuleRef.comp.formShow = false;
                  this.loadPlanRule(this.pk_calc);
                } else {
                  this.$message({
                    message: res.data.error.errorMessage,
                    type: "error"
                  });
                }
          }).catch(e => {
            this.$message({
              message: '投放规则保存失败！',
              type: 'error',
            });
          });

        }else{
          this.$message({
                  message: '请先保存报价信息!',
                  type: 'error',
                });
        }
      },
      loanRuleFormCancel(type){
        this.$refs.loanRuleRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.loanRuleRef.formShow = false;
        } else {
          this.$refs.loanRuleRef.getTableComp().closeExpandRow();
          let loanRuleTable = this.$refs.loanRuleRef.getData('QuoteRule_t');
          loanRuleTable[this.baseEditIndex] = this.baseData;
          this.$refs.loanRuleRef.setData('QuoteRule_t', loanRuleTable);
        }
      },
      loanRuleEditTableRow(scope){
        this.$refs.loanRuleRef.getTableComp().expandRow(scope.row);
        this.$refs.loanRuleRef.comp.formShow = false;
        this.$refs.loanRuleRef.setData('QuoteRule',scope.row);

        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      loanRuleDeleteTableRow(scope){
        this.delType = 'loanRule';
        this.delDialogVisible = true;
        this.delId = scope.row.pk_quote_rule;
      },
      // 规则设置 loanRuleRef 事件处理 end

      //加载数据方法
      loadData(){
        this.pk_calc = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if(this.pk_calc && this.pk_calc !== ''){
          //加载报价信息
          this.loadQuoteCalc(this.pk_calc);
          //加载投放信息
          this.loadLoanPlan(this.pk_calc);
          // //加载规则信息
          this.loadPlanRule(this.pk_calc);
          //加载租金计划表
          this.loadInoutPlan(this.pk_calc);
        }else{
          this.editable = true;
        }
      },
      //加载报价信息
      loadQuoteCalc(pk_calc){
        this.$http({
            url: ylsBusi+'quote/calc/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:pk_calc
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'QuoteCalculator',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '报价详情获取失败',
            type: 'error',
          });
        });
      },
      //加载投放信息
      loadLoanPlan(pk_calc){
        this.$http({
            url: ylsBusi+'quote/loanPlan/getByCalcId ',
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:pk_calc
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['loanPlanRef'].setData(
              'QuoteLoanPlan_t',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message:' 投放计划获取失败',
            type: 'error',
          });
        });
      },
      //加载规则信息
      loadPlanRule(pk_calc){
        this.$http({
            url: ylsBusi+'quote/rule/getByCalcId' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:pk_calc
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['loanRuleRef'].setData(
              'QuoteRule_t',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '投放规则获取失败',
            type: 'error',
          });
        });
      },
      //加载租金计划表
      loadInoutPlan(pk_calc){
        this.$http({
            url: ylsBusi+'quote/inoutPlan/getByCalcId ',
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:pk_calc
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['inoutPlanRef'].setData(
              'QuoteInoutPlan_t',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '租金计划表获取失败',
            type: 'error',
          });
        });
      },

      //删除确定按钮
    deleteConfirmClick() {
      let requestUrl = '';
      if(this.delType === 'loanRule'){
        requestUrl = ylsBusi+'quote/rule/deleteById';
      }else if(this.delType === 'loanPlan'){
        requestUrl = ylsBusi+'quote/loanPlan/deleteById';
      }
      if(requestUrl !== ''){
        this.$http({
          url: requestUrl,
          headers: { 'Content-Type': 'application/json' },
          method:'post',
          dataType: 'json',
          data: this.delId
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.delDialogVisible = false;
            //刷新列表
            if(this.delType === 'loanRule'){
              this.loadPlanRule(this.pk_calc);
            }else if(this.delType === 'loanPlan'){
              this.loadLoanPlan(this.pk_calc);
            }
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error',
            });
          }
        }).catch((e) => {
          this.$message({
            message: '删除失败',
            type: 'error',
          });
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

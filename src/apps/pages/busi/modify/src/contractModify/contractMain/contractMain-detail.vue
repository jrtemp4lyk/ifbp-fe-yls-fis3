<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">新增合同</h2>
    </div>
    
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 合同主模板 temp start-->
        <ifbp-panel id="basePanel" title="合同" :icons="baseIcons" >
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey" 
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
             
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!--报价信息变更-->

        
        <ifbp-panel id="calculatorRef" title="报价信息"   v-if="ifCalculator">
          <calculatorRef
            ref="calculatorRef"
            @onChangeInoutPlan="changeInoutPlan"
            :source_bill="pk_contract">
          </calculatorRef>
          <el-tabs id="busi-main" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.text" v-for="(item, index)  in calculators" :key="index"  :name="index">
           </el-tab-pane>
          </el-tabs>
           <inoutPlanRef 
                ref="inoutPlanRef" 
                :pk_quote_calculator="pk_quote_calculator">
           </inoutPlanRef>
        </ifbp-panel>
        <!--承租人信息-->
         <ifbp-panel id="bothlesseeRef" title="承租人信息" :icons="bothlesseeIcons" v-if="ifBothlessee">
          <bothlesseeRef
            ref="bothlesseeRef"
            :source_bill="pk_contract">
          </bothlesseeRef>
        </ifbp-panel>
        <!--担保信息模块界面-->
        <ifbp-panel id="pledgePanel" title="担保信息" :icons="pledgeIcons" v-if="ifCustpledge">
          <el-radio-group v-model="pledgeType" style="width:265px;margin:0 auto 20px;display:block">
            <el-radio-button label="type0">保证担保</el-radio-button>
            <el-radio-button label="type1">抵押担保</el-radio-button>
            <el-radio-button label="type2">质押担保</el-radio-button>
          </el-radio-group>
          <el-tabs v-model="pledgeType" class="pledge_header">
          <el-tab-pane  name="type0">
              <custpledgeRef
              ref="custpledgeRef"
              :source_bill="pk_contract"
              @closeAddForm="closeAddFormEev"
              >
              </custpledgeRef>
          </el-tab-pane>
          <el-tab-pane  name="type1">
               <mortgageRef
              ref="mortgageRef"
              :source_bill="pk_contract"
              @closeAddForm="closeAddFormEev"
              >
            </mortgageRef>
          </el-tab-pane>
          <el-tab-pane name="type2">
            <pledgeRef
              ref="pledgeRef"
              :source_bill="pk_contract"
               @closeAddForm="closeAddFormEev"
              >
            </pledgeRef>
          </el-tab-pane>
        </el-tabs>
        </ifbp-panel>
        <!--租赁物信息-->
         <ifbp-panel id="busirenttingRef" title="租赁物" :icons="rentTingIcons" v-if="ifRentthing">
          <busirenttingRef
            ref="busirenttingRef"
            :source_bill="pk_contract">
          </busirenttingRef>
        </ifbp-panel>
        <!--供应商信息-->
         <ifbp-panel id="contProviderRef" title="供应商信息" :icons="contProviderIcons" v-if="ifContProvider">
          <contProviderRef
            ref="contProviderRef"
            :source_bill="pk_contract">
          </contProviderRef>
         </ifbp-panel>
        <!--付款条件-->
         <ifbp-panel id="payConditionRef" title="付款条件信息" :icons="payConditionIcons" v-if="ifPayCondition">
          <payConditionRef
            ref="payConditionRef"
            :source_bill="pk_contract">
          </payConditionRef>
        </ifbp-panel>
        <!--逾期利率信息-->
         <ifbp-panel id="penaltyRuleDeRef" title="逾期利率信息" :icons="penaltyRuleDeIcons" v-if="ifPenaltyRuleDe">
          <penaltyRuleDeRef
            ref="penaltyRuleDeRef"
            :source_bill="pk_contract">
          </penaltyRuleDeRef>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../../common/js/publicData.js';
import custpledgeRef from '../insuranceModify/custpledge-modify-info.vue';
import mortgageRef from '../insuranceModify/mortgage-modify-info.vue';
import pledgeRef from '../insuranceModify/pledge-modify-info.vue';
import busirenttingRef from '../rentthingModify/rentthing-modify.vue';
import contProviderRef from "../contProviderModify/contProviderModify.vue";
import payConditionRef from "../payConditionModify/payConditionModify.vue";
import bothlesseeRef from '../bothLesseeModify/bothLesseeModify.vue';
import penaltyRuleDeRef from '../pentaltyruledeModify/pentaltyruledeModify.vue';
import calculatorRef from '../calculatorModify/calculatorModify.vue';
import inoutPlanRef from '../calculatorModify/inoutPlanModify.vue';

export default {
  components: { 
    'custpledgeRef':custpledgeRef,
    'mortgageRef':mortgageRef,
    'pledgeRef':pledgeRef,
    'busirenttingRef':busirenttingRef,
    'bothlesseeRef':bothlesseeRef,
    'penaltyRuleDeRef':penaltyRuleDeRef,
    'contProviderRef':contProviderRef,
    'payConditionRef':payConditionRef,
    'calculatorRef':calculatorRef,
    'inoutPlanRef':inoutPlanRef
  },
  data() {
    var oThis = this;
    return {
      activeName:"one",
      calculators:[],
      delDialogVisible:false,
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //合同主键
      pk_contract:"",
      pk_quote_calculator:"",
      changetypestring:"",
      pledgeType:'type0',
      //模版主键
      funnode:"BT022",
      ifCalculator:false,
      ifCustpledge:false, 
      ifRentthing:false,
      ifContProvider:false,
      ifPayCondition: false,
      ifBothlessee:false,
      ifPenaltyRuleDe:false,
      nexusKey:"contractModify",
      tplData:{},
      editable:false,
      //担保参数
      guarantee:"guarantee1",
      radioShow:true,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
      ],
      //报价信息变更图标
      calculatorIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                message: "请先保存基本信息！",
                type: "error"
              });
              return;
            }
            oThis.$refs.calculatorRef.$refs.calculatorRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.calculatorRef.$refs.calculatorRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.calculatorRef.$refs.calculatorRef.comp.formShow = true;
          }
        }
      ],
      //收支计划信息变更图标
      inoutPlanIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                message: "请先保存基本信息！",
                type: "error"
              });
              return;
            }
            oThis.$refs.inoutPLanRef.$refs.inoutPLanRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.inoutPLanRef.$refs.inoutPLanRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.inoutPLanRef.$refs.inoutPLanRef.comp.formShow = true;
          }
        }
      ],
      //担保信息
      pledgeIcons: [
        {
          icon: 'plus',
          click() {
            if(oThis.pk_contract===''){
              oThis.$message({
                  message: '请先保存基本信息',
                  type: 'error'
                });
                return;
            }
            //显示担保添加
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.resetFormData();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.comp.formShow = true;
            //显示抵押添加
            oThis.$refs.mortgageRef.$refs.mortgageRef.getTableComp().closeExpandRow();
            oThis.$refs.mortgageRef.$refs.mortgageRef.resetFormData();
            oThis.$refs.mortgageRef.$refs.mortgageRef.comp.formShow = true;
            //显示质押添加
            oThis.$refs.pledgeRef.$refs.pledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.pledgeRef.$refs.pledgeRef.resetFormData();
            oThis.$refs.pledgeRef.$refs.pledgeRef.comp.formShow = true;
          }
        }
      ],
      // 放款申请主模板 baseTemplateRef end
       //租赁物图标
      rentTingIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_contract===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.formShow = true;
          }
        }
      ],
      //供应商标签
      contProviderIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.formShow = true;
            // 点击新增时页面允许编辑
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.editable = true;
          }
        }
      ],
      //承租方信息
      bothlesseeIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_contract===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.formShow = true;
          }
        }
      ],
      //逾期利率信息
      penaltyRuleDeIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_contract===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.formShow = true;
          }
        }
      ],
      //付款条件图标
      payConditionIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.formShow = true;
            // 点击新增时页面允许编辑
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.editable = true;
          }
        }
      ]

    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleClick(val){
      let calArray = this.$refs.calculatorRef.caltplData.calculatorModifyTable;
      let pk_calculator = calArray[val.$data.index].pk_quote_calculator;
      if(this.pk_quote_calculator === pk_calculator){
        this.pk_quote_calculator = "";
      }else{
        this.pk_quote_calculator = pk_calculator;
      }
    },
    //担保信息 关闭添加页签
    closeAddFormEev(){
       this.$refs.mortgageRef.closeAddForm();
       this.$refs.pledgeRef.closeAddForm();
       this.$refs.custpledgeRef.closeAddForm();
   },
    //担保信息
    radioShowCase(val){
     this.radioShow=val;
    },
     //返回按钮
      goBack(){
        window.history.back(-1);
      },
      // 合同主模板 baseTemplateRef 事件处理 start
      clickCancel(){
        this.editable = false;
      },
      clickSave(){
        var data = this.$refs.baseTemplateRef.comp.contract;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url;
        if(this.pk_contract){
          url = ylsBusi+'contr/modify/contractinfo/update';
        } else {
          url = ylsBusi+'contr/modify/contractinfo/create';
          jsonData['change_type'] = this.changetypestring;
        }
        this.$http({
            url: url,
            method: "post",
            data:jsonData
        }).then(res => {
            this.editable = false;
            var originalValue = res.data.data;
            this.pk_contract=res.data.data.pk_contract;
            this.$refs["baseTemplateRef"].setData(
              "contract",
              JSON.parse(JSON.stringify(originalValue))
            ); 
            this.pk_contract=originalValue.pk_contract;
        }).catch(e => {
          this.$message({
            message: "合同保存失败！",
            type: "error"
          });
        });
      },
      // 合同主模板 baseTemplateRef 事件处理 end
      typetype (valType){
          if(valType.indexOf("custPledge")>= 0){
             this.ifCustpledge = true;
          } 
          if (valType.indexOf("rentThing")>= 0) {
             this.ifRentthing = true;
          }
          if(valType.indexOf("pro") >= 0) {
           this.ifContProvider = true;
          }
          if(valType.indexOf("payCond") >= 0) {
           this.ifPayCondition = true;
          }
          if(valType.indexOf("lessee")>= 0){
             this.ifBothlessee = true;
          }
          if(valType.indexOf("penaltyRule")>= 0){
             this.ifPenaltyRuleDe = true;
          }
          if(valType.indexOf("cal")>= 0){
            this.ifCalculator = true;
          }
  },
    
      //加载数据方法
      loadData(){
        let flag = this.$root.$router.currentRoute.params.flag;
        this.changetypestring = this.$root.$router.currentRoute.params.changetype;
        this.typetype (this.changetypestring);
        if (flag==="edit") {
            let pk_con = this.$root.$router.currentRoute.params.editId;
    
            if(pk_con==undefined)
               pk_con="";
    
            if(pk_con && pk_con != ""){
              //加载合同信息
              this.loadcontractinfo(pk_con);
              this.editable = true;
            }
        } else {
          this.pk_contract = this.$root.$router.currentRoute.params.id;
          if(this.pk_contract==undefined)
            this.pk_contract="";
          //router name
          //this.$root.$router.currentRoute.name;
          //详情页面
          if(this.pk_contract && this.pk_contract != ""){
            //加载合同信息
            this.loadcontractinfo(this.pk_contract);
          }else{
            this.oldid = this.$root.$router.currentRoute.params.oldid;
            var mes = [this.changetypestring,this.oldid]
            this.loadcontractCopyInfo(mes);
          }
        }

      },

      //加载合同信息
      loadcontractCopyInfo(mess){ 
        this.$http({
            url: "/yls-busi-web/contr/modify/contractinfo/copyById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            dataType:"json",
            data:mess,
        }).then(res => { 
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              "contract",
              JSON.parse(JSON.stringify(originalValue))
            );
            this.pk_contract = originalValue.pk_contract;
        }).catch(e => {
          console.log(e);
          this.$message({
            message: "合同详情获取失败",
            type: "error"
          });
        });
      },

      //加载合同信息
      loadcontractinfo(pk_contract){
        this.$http({
            url: "/yls-busi-web/contr/modify/contractinfo/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data: pk_contract
        }).then(res => { 
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              "contract",
              JSON.parse(JSON.stringify(originalValue))
            ); 
        }).catch(e => {
          console.log(e);
          this.$message({
            message: "合同详情获取失败",
            type: "error"
          });
        });
      },
      changeInoutPlan (val){
        this.calculators = val;
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
  .pledge_header .el-tabs__header{
    display: none;
  }
</style>

<template>
  <div class="main-panel">
    <!--节点title-->
     <div class="operator-container">
        <div class="fl">
          <h3 class="name">放款进展表 > 发起申请</h3>
        </div>
        <div class="fr">
          <el-button type="default" class="button-no-radius" @click="goBack"> 回 退 </el-button>
          <el-button type="primary" class="button-no-radius" @click="clickSave"> 提 交</el-button>
        </div>
      </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="206"> 
        <ifbp-panel id='applyInfo' title='业务申请基本信息' :icons='applyIcons'>
          <applyRef
            ref='applyRef'
            :pk_application='pk_application'>
          </applyRef>
        </ifbp-panel>
        <ifbp-panel id="custInfo" title="客户信息" :icons="custIcons">
                <CustCorpRef
                  ref="CustCorpRef"
                  :pk_customer="pk_customer">
                </CustCorpRef>
        </ifbp-panel>
        <!--银行模块界面-->
        <ifbp-panel id="bankaccount" title="银行账户信息" :icons="bankaccountIcons">
          <bankaccountRef
            ref="bankaccountRef"
            :pk_customer="pk_customer">
          </bankaccountRef>
        </ifbp-panel> 
        <!--联系人模块界面-->
        <ifbp-panel id="linkmanPanel" title="联系人信息" :icons="linkmanIcons">
          <custlinkmanRef
            ref="custlinkmanRef"
            :pk_customer="pk_customer">
          </custlinkmanRef>
        </ifbp-panel> 
        <!-- <ifbp-panel id="termsTrade" title="成交条件" :icons="ShareholderIcons">
          <termsTrade
            ref="termsTrade"
            :pk_customer="pkCustVal">
          </termsTrade>
        </ifbp-panel> -->
        <ifbp-panel id="busirenttingRef" title="租赁物" :icons="rentTingIcons">
          <busirenttingRef
            ref="busirenttingRef"
            :pk_prjId="pk_application"
            :type="'apply'">
          </busirenttingRef>
        </ifbp-panel>
       <!--担保信息模块界面-->
        <ifbp-panel id="pledgePanel" title="担保信息" :icons="pledgeIcons">
          <el-radio-group v-model="pledgeType" style="width:265px;margin:0 auto 20px;display:block">
            <el-radio-button label="type0">保证担保</el-radio-button>
            <el-radio-button label="type1">抵押担保</el-radio-button>
            <el-radio-button label="type2">质押担保</el-radio-button>
          </el-radio-group>
          <el-tabs v-model="pledgeType" class="pledge_header">
          <el-tab-pane  name="type0">
              <custpledgeRef
              ref="custpledgeRef"
              :source_bill="pk_application"
              @closeAddForm="closeAddFormEev"
              >
              </custpledgeRef>
          </el-tab-pane>
          <el-tab-pane  name="type1">
               <mortgageRef
              ref="mortgageRef"
              :source_bill="pk_application"
              @closeAddForm="closeAddFormEev"
              >
            </mortgageRef>
          </el-tab-pane>
          <el-tab-pane name="type2">
            <pledgeRef
              ref="pledgeRef"
              :source_bill="pk_application"
               @closeAddForm="closeAddFormEev"
              >
            </pledgeRef>
          </el-tab-pane>
        </el-tabs>
        </ifbp-panel>
        <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>
          <insuranceRef
            ref='insuranceRef'
            :source_bill='pk_application'
            :type="'apply'">
          </insuranceRef>
        </ifbp-panel>
        <ifbp-panel id="busirelevantPartyRef" title="合同相关方" :icons="relevantPartyIcons">
          <busirelevantPartyRef
            ref="busirelevantPartyRef"
            :pk_prjId="pk_application"
            :type="'apply'">
          </busirelevantPartyRef>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';

import applyRef from './busi_application.vue';
import CustCorpRef from './busi_person.vue';
import busirenttingRef from './busi_rentting.vue';
import custpledgeRef from '../custpledge/custpledge-info.vue';
import mortgageRef from '../custpledge/mortgage-info.vue';
import pledgeRef from '../custpledge/pledge-info.vue';
import insuranceRef from './busi_insure.vue';
import busirelevantPartyRef from './busi-relevantParty.vue';
import custlinkmanRef from './busi_corp_linkman.vue';
import bankaccountRef from './busi-bank-account.vue';
export default {
 components: {
    'applyRef': applyRef,
    'CustCorpRef':CustCorpRef,
    'bankaccountRef':bankaccountRef,
    'custlinkmanRef':custlinkmanRef,
    'busirenttingRef':busirenttingRef,
    'custpledgeRef':custpledgeRef,
    'mortgageRef':mortgageRef,
    'pledgeRef':pledgeRef,
    'insuranceRef': insuranceRef,
    'busirelevantPartyRef':busirelevantPartyRef,
  },
  props:['pkCustomer','pkApplication'],
  data() {
    var oThis = this;
    return {
       //页面标题
      title: "",
      scrollDom: document.getElementsByClassName("view")[0],
      pk_customer: this.pkCustomer,
      pk_application: this.pkApplication,
      pledgeType:'type0',
      applyIcons: [
        {
          icon: 'edit',
          click: function() {
            if (oThis.$refs.applyRef.applyEditable === false) {
              oThis.$refs.applyRef.applyEditable = true;
            } else {
              oThis.$refs.applyRef.applyCancel();
            }
          } 
        }
      ],
      custIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.$refs.CustCorpRef.CustEdit=!oThis.$refs.CustCorpRef.CustEdit;
          }
        }
      ],
      // 银行
      bankaccountIcons:[
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.resetFormData();
            // 显示新增区域
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.comp.formShow = true;
          }
        }
      ],
      //联系人
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            var uitemplateComp = oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs["OtherContact_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.setData("OtherContact", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["OtherContact_ref"].resetFields();
          }
        }
      ],
      // 租赁物
      rentTingIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_prjId===""){
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
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp.formShow = true;
          }
        }
      ],
      // 合同相关方
      relevantPartyIcons:[
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_prjId===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.formShow = true;
          }
        }
      ],
   //担保信息
      pledgeIcons: [
        {
          icon: 'plus',
          click() {
            if(oThis.pk_customer===''){
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
      // 保险
      insuranceIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_prjId===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            
            oThis.$refs.insuranceRef.$refs.insuranceRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.insuranceRef.$refs.insuranceRef.resetFormData();
            // 显示新增区域
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
          }
        }
      ]
    };
  },
  mounted() {
    this.request();
  },
  methods: {

    // 信息初始化
    request() {
      //请求客户基本信息详情
      var method=this.$root.$router.currentRoute.path;
      console.log(this.pk_customer);
      if(method!="/Agent/detail-add"){
         
        if(this.pk_customer !=""){
           this.requestCustBaseInfo();
        }
      }
    },
    closeAddFormEev(){
       this.$refs.mortgageRef.closeAddForm();
       this.$refs.pledgeRef.closeAddForm();
       this.$refs.custpledgeRef.closeAddForm();
   },
    //回退到客户基本信息页面
    goBack(){
        this.$emit('change-person-card', 'toapplycustomerlist');
    },
      //提交到已申请
    clickSave(){
      
            var pk_application = this.pkApplication;
            var url = ylsBusi+'prj/apply/updateapply';
            var data = {
                "pk_application": pk_application
             };
            this.$http({
              url: url,
              headers: {'Content-Type': 'application/json'},
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(res => {
            if (res.data.success === true) {
              
                this.$message({
                message: "操作成功！",
                type: "success",
                });
                this.$emit('change-person-card', 'toapplied');
                this.inoutTypeFormEdit = false;
            } else {
                this.$message({
                message: res.data.message,
                type: "error"
                });
            }
            }).catch(() => {
                this.$message({
                    message: "操作失败",
                    type: "error"
                });
            });
    },
    // 请求客户基本信息详情
    requestCustBaseInfo() {
      // 
    },
  }
};
</script>
<style>
.operator-container {
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
  .pledge_header .el-tabs__header{
    display: none;
  }
</style>

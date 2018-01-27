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
    <!-- <div class="title-container">
      <h2 class="name">业务申请</h2>
    </div> -->
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="205"> 
        <ifbp-panel id="custInfo" title="客户信息">
                <CustCorpRef
                  ref="CustCorpRef"
                  :pk_customer="pk_customer" >
                </CustCorpRef>
        </ifbp-panel>
        <!--银行模块界面-->
        <ifbp-panel id="bankaccount" title="银行账户信息">
          <bankaccountRef
            ref="bankaccountRef"
            :invisible='true'
            :pk_customer="pk_customer">
          </bankaccountRef>
        </ifbp-panel> 
        <!--联系人模块界面-->
        <ifbp-panel id="linkmanPanel" title="联系人信息">
          <custlinkmanRef
            ref="custlinkmanRef"
            :invisible='true'
            :pk_customer="pk_customer">
          </custlinkmanRef>
        </ifbp-panel> 
        <!--股东信息模块界面-->
        <ifbp-panel id="ShareholderPanel" title="股东信息">
          <ShareholderRef
            ref="ShareholderRef"
            :invisible='true'
            :pk_customer="pk_customer">
          </ShareholderRef>
        </ifbp-panel>
        <!--租赁物信息模块界面-->
        <ifbp-panel id="busirenttingRef" title="租赁物">
          <busirenttingRef
            ref="busirenttingRef"
            :invisible='true'
            :pk_prjId="pk_application"
            :type="'apply'">
          </busirenttingRef>
        </ifbp-panel>
         <!--担保信息模块界面-->
        <ifbp-panel id="pledgePanel" title="担保信息">
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
              :invisible='true'
              @closeAddForm="closeAddFormEev"
              >
              </custpledgeRef>
          </el-tab-pane>
          <el-tab-pane  name="type1">
               <mortgageRef
              ref="mortgageRef"
              :source_bill="pk_application"
              :invisible='true'
              @closeAddForm="closeAddFormEev"
              >
            </mortgageRef>
          </el-tab-pane>
          <el-tab-pane name="type2">
            <pledgeRef
              ref="pledgeRef"
              :source_bill="pk_application"
              :invisible='true'
               @closeAddForm="closeAddFormEev"
              >
            </pledgeRef>
          </el-tab-pane>
        </el-tabs>
        </ifbp-panel>
        <!--保险信息模块界面-->
        <ifbp-panel id='insuranceRef' title='保险信息'>
          <insuranceRef
            ref='insuranceRef'
            :source_bill='pk_application'
            :invisible='true'
            :type="'apply'">
          </insuranceRef>
        </ifbp-panel>
         <!--合同相关方信息模块界面-->
        <ifbp-panel id="busirelevantPartyRef" title="合同相关方">
          <busirelevantPartyRef
            ref="busirelevantPartyRef"
            :pk_prjId="pk_application"
            :invisible='true'
            :type="'apply'">
          </busirelevantPartyRef>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>


import CustCorpRef from './busi_corp.vue';
import custlinkmanRef from './busi_corp_linkman.vue';
import ShareholderRef from './busi_corp_Share.vue';
import busirenttingRef from './busi_rentting.vue';
import custpledgeRef from '../custpledge/custpledge-info.vue';
import mortgageRef from '../custpledge/mortgage-info.vue';
import pledgeRef from '../custpledge/pledge-info.vue';
import insuranceRef from './busi_insure.vue';
import busirelevantPartyRef from './busi-relevantParty.vue';
import bankaccountRef from './busi-bank-account.vue';
export default {
 components: {
    'CustCorpRef':CustCorpRef,
    'custlinkmanRef':custlinkmanRef,
    'ShareholderRef':ShareholderRef,
    'busirenttingRef':busirenttingRef,
    'custpledgeRef':custpledgeRef,
    'mortgageRef':mortgageRef,
    'pledgeRef':pledgeRef,
    'insuranceRef': insuranceRef,
    'busirelevantPartyRef':busirelevantPartyRef,
    'bankaccountRef':bankaccountRef,
  },
  props:['pkCustomer','pkApplication','customerVal'],
  data() {
    var oThis = this;
    return {
      //页面标题
      title: "",
      scrollDom: document.getElementsByClassName("view")[0],
      pk_customer: this.pkCustomer,
      pk_application:this.pkApplication,
      pledgeType:'type0',
    }
  },
  mounted() {
    this.request();
  },
  methods: {

    // 信息初始化
    request() {
      //请求客户基本信息详情
      var method=this.$root.$router.currentRoute.path;
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
    goBack(){
        this.$emit('change-corp-card', 'toapplycustomerlist');
    },
    //提交到已申请
    clickSave(){
      
            var pk_application = this.pkApplication;
            var url = '/yls-busi-web/prj/apply/updateapply';
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
                this.$emit('change-corp-card', 'toapplied');
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

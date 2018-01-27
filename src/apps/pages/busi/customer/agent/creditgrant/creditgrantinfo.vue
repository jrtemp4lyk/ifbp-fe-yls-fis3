<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="creditgrant-container">
      <span>
         <h2 class="name">{{ title }}</h2>
      </span>
      <span class="fr">
        <el-button type="primary" class="button-no-radius" @click="goback">回退</el-button>
        <el-button type="primary" class="button-no-radius" @click="creditApply">申请授信</el-button>
      </span>
    </div>
    <!-- 主体区域(详情页结构) -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="206"> 
        <!--代理商基本信息模块界面-->
        <ifbp-panel id="basePanel" title="代理商信息" :icons='agentIcons'>
          <agentbaseinfo
              ref='agentbaseTemplateRef'
              :pkCustomerVal='pkCustomerVal'
              :credit_grant='creditgrant'
              :editable='agentEdit'
              @change-agent-base='changeagentbase'>
          </agentbaseinfo>
        </ifbp-panel>
        <!--联系人模块界面-->
         <ifbp-panel id="linkmanPanel"  title="联系人信息" :icons='linkmanIcons'>
          <custlinkmanRef
            ref="custlinkmanRef"
            :pk_customer="pk_customer">
          </custlinkmanRef>
        </ifbp-panel> 
        <!--股东信息模块界面-->
        <ifbp-panel id="ShareholderPanel" title="股东信息" :icons="ShareholderIcons">
          <ShareholderRef
            ref="ShareholderRef"
            :pk_customer="pk_customer">
          </ShareholderRef>
        </ifbp-panel>
        <!--财务报表模块界面-->
        <ifbp-panel id="none"  title="财务报表信息" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel>
        <!--合作协议-->
        <ifbp-panel id="operationTableRef"  title="合作协议" :icons="OperationIcons">
          <operationinfo
            ref="operationTable"
            :pk_customer="pk_customer">
          </operationinfo>
        </ifbp-panel>
        <!-- 尽职调查 -->
        <ifbp-panel id="none"  title="尽职调查" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel>
        <!--资料上传模块界面-->
        <ifbp-panel id="none"    title="资料上传" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel>
        
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
// import {ylsBusi} from '../../../../../common/js/publicData.js';
//引入代理商相关列表
import agentbaseinfo from './agentbaseinfo.vue';
import custlinkmanRef from './linkmanpanel.vue';
import Shareholderpanel from './Shareholderpanel.vue';
import operationinfo from './operation_info.vue';

export default {
  components: {
     'agentbaseinfo':agentbaseinfo,
     'custlinkmanRef':custlinkmanRef,
     'ShareholderRef':Shareholderpanel,
     'operationinfo':operationinfo
  },
  props:['pkCustomerVal','creditgrant'],
  data() {
    let oThis = this;     
    return {
      //显示的标题
      title: '',
      scrollDom: "ifbpScrollDom",
      pk_customer: '',
      credit_grant:'',
      customer_Edit:'',
      linkmanDelVisible: false,
      custbankDelVisible: false,
      ShareholderDelVisible: false,
      rmoveindex: "",
      delId: "",
      custVisible :false,
      none: [],
      //联系人
      agentIcons: [
        {
          icon: "plus",
          click: function() {
            debugger
            // 重置新增数据
            if(oThis.pk_customer =="" || oThis.pk_customer ==undefined){
               oThis.$refs.agentbaseTemplateRef.$refs.agentbaseTemplateRef.resetFormData();
            }
            else if(oThis.pk_customer){
              oThis.$message({
                  message: "发起申请时不可添加代理商",
                });
              return;
            }
            debugger;
            // 显示新增区域
            oThis.$refs.agentbaseTemplateRef.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
            oThis.$refs.agentbaseTemplateRef.$refs.agentbaseTemplateRef.comp.formShow = true;
            oThis.agentEdit = !oThis.agentEdit;
          }
        }
      ],
      //代理商基本信息修改
      //级联参照
      corpResetFun: function($node) {
        var $refNode1 = this.getNodeById($node, 'w85l2pcqcf');  //开户行省
         var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
          var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
          

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        }
        if($refNode2.length) {
          $refNode2.attr("v-on:trigger", "handleRefChange2"); 
        }
        if($refNode3.length) {
          $refNode3.attr("v-on:trigger", "handleRefChange3"); 
        }
    
      },
      t_Methods: {
        handleRefChange1: function(type, data) {
          if(type === 'change') {
            var innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.h_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange2: function(type, data) {
          if(type === 'change') {
            var innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.m_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange3: function(type, data) {
          if(type === 'change') {
            var innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.s_ref.changeQueryParams(innerCode);
          }
        }
      },
     
      agentPk: "72f361bd-34e3-42ec-8933-d4fce9b0cd29",
      agentEdit: false,
      //联系人修改
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
              });
                return;
            } 
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
          }
        }
      ],
      // 股东信息新增
      ShareholderIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                });
                return;
            }
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }
      ],
      // 合作协议
      OperationIcons:[
         {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
                oThis.$message({
                  message: "请先保存基本信息",
                });
                return;
            }else if(oThis.pk_customer){
              var requestPromise = oThis.$refs.operationTable.isExisted();
              requestPromise.then(retVal => {
                debugger;
                  if(retVal == 1){
                      return;
                  }
                  else if(retVal == -1){
                      oThis.$refs.operationTable.$refs.operationTable.getTableComp().closeExpandRow();
                      // 重置新增数据
                      oThis.$refs.operationTable.$refs.operationTable.resetFormData();
                      // 显示新增区域
                      oThis.$refs.operationTable.$refs.operationTable.comp.formShow = true;
                  }
              })
               
            }
            
          }
        }
      ]

    };
  },
  //获取数据数据初始化操作
  created() {
    this.loadTitleData();
    debugger;
    this.pk_customer = this.pkCustomerVal;
  },
  //页面操作
  mounted() {

  },
  methods: {
    creditApply(){

    },
    //点击返回出发 
    goback(){
      this.$emit('change-credit-edit','tocreditgrantapply');
    },
    //  加载标题
    loadTitleData(){
        if(this.pkCustomer){
            this.title = '代理商授信信息表 > 发起申请';
        }else{
            this.title = '代理商授信信息表 > 添加';
        }
    },  
     // 代理商pk改变时触发
    changeagentbase(val){
       if(val){
          this.pk_customer = val;
       }
    },
   
  }
};
</script>
<style>
.creditgrant-container {
  overflow: hidden;
  height: 56px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
}
.creditgrant-container .fr {
    position: absolute;
    top: 25px;
    left: 1151px;
}

.creditgrant-container .name {
    font-family: "microsoft yahei";
    text-shadow: none;
    font-size: 20px;
}
</style>

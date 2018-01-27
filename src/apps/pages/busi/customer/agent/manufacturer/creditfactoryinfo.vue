<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">厂商管理</h2>
    </div>

    <div class="creditgrant-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="goback">回退</el-button>
      </div>
    </div>
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <!--企业客户基本信息模块界面-->
        <ifbp-panel id="custInfo" title="基本信息" :icons="custIcons">
                <CustCorpRef
                  ref="CustCorpRef"
                  :pk_customer="pk_customer" >
                </CustCorpRef>
        </ifbp-panel>
        <!--联系人模块界面-->
         <ifbp-panel id="linkmanPanel"  title="联系人信息" :icons="linkmanIcons">
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
        <!-- <ifbp-panel id="none"    title="财务报表信息" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel> -->
        <!--合作协议-->
        <ifbp-panel id="operationTableRef"    title="合作协议" >
          <operationinfo
            ref="operationTable"
            :pk_customer="pk_customer">
          </operationinfo>
        </ifbp-panel>
        <!-- 尽职调查 -->
        <!-- <ifbp-panel id="none"  title="尽职调查" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel> -->
        <!--资料上传模块界面-->
        <!-- <ifbp-panel id="none"    title="资料上传" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel> -->
        
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';

import CustCorpRef from './vendorInformation.vue';
//引入联系人和股东信息面板
import custlinkmanRef from './vendorlinkman.vue';
import Shareholderpanel from './vendorShare.vue';
import operationinfo from './operation_info.vue';

export default {
  components: {
    'CustCorpRef':CustCorpRef,
     'custlinkmanRef':custlinkmanRef,
     'ShareholderRef':Shareholderpanel,
     'operationinfo':operationinfo
  },
  props:['pkCustomer','creditgrant'],
  data() {
    let oThis = this;
    return {
      scrollDom: "ifbpScrollDom",
      linkmanDelVisible: false,
      custbankDelVisible: false,
      ShareholderDelVisible: false,
      custVisible :false,
      pk_customer: this.pkCustomer,
      custIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.$refs.CustCorpRef.CustEdit=!oThis.$refs.CustCorpRef.CustEdit;
          }
        }
      ],


      //联系人修改
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            oThis.pk_customer=oThis.$refs.CustCorpRef.pk_customer;
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
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
            oThis.pk_customer=oThis.$refs.CustCorpRef.pk_customer;
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
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
      // 新增
      // OperationIcons:[
      //    {
      //     icon: "plus",
      //     click: function() {
      //       if(oThis.pk_customer===""){
      //         oThis.$message({
      //             message: "请先保存基本信息",
      //             type: "error"
      //           });
      //           return;
      //       }
      //       oThis.$refs.operationTable.$refs.operationTable.getTableComp().closeExpandRow();
      //       // 重置新增数据
      //       oThis.$refs.operationTable.$refs.operationTable.resetFormData();
      //       // 显示新增区域
      //       oThis.$refs.operationTable.$refs.operationTable.comp.formShow = true;
      //     }
      //   }
      // ]

    };
  },
  //页面操作
  mounted() {
    this.request();
  },
  methods: {
   // 信息初始化
    request() {
      //请求客户基本信息详情
      var method=this.$root.$router.currentRoute.path;
    },
   goback(){
     this.$emit('change-credit-edit','tocreditgrantapply');
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
</style>

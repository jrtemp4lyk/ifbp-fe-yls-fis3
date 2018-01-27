<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">企业客户管理</h2>
    </div>
    <!-- 主体区域(详情页结构) -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <!--企业客户基本信息模块界面-->
        <ifbp-panel id="basePanel" title="企业客户基本信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="custfunnode"
                    :nexuskey="custnexuskey"
                    show-type="form"
                    :tplData="customerData"
                    :editable="customerEdit">
          </ifbp-template>
            <ifbp-template ref="baseTemplateRef1"
                    tplId="baseTemplate1"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    show-type="form"
                    :tplResetFun="corpResetFun"
                    :methods="t_Methods"
                  
                    :editable="customerEdit">
           </ifbp-template>
          <div class="form-button-div" v-if="customerEdit">
            <el-button type="default" class="button-no-radius" @click="customerCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="customerConfirm">保存</el-button>
          </div>
        </ifbp-panel>
        <!--联系人模块界面-->
         <ifbp-panel id="linkmanPanel"    title="联系人信息" :icons="linkmanIcons">
          <custlinkmanRef
            ref="custlinkmanRef"
            :pk_customer="pk_customer">
          </custlinkmanRef>
        </ifbp-panel> 
        <!--股东信息模块界面-->
        <ifbp-panel id="ShareholderPanel"    title="股东信息" :icons="ShareholderIcons">
          <ShareholderRef
            ref="ShareholderRef"
            :pk_customer="pk_customer">
          </ShareholderRef>
        </ifbp-panel>
        
       
        
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js';
//引入联系人和股东信息面板
import custlinkmanRef from './linkmanpanel.vue';
import ShareholderRef from './Shareholderpanel.vue';

export default {
  components: {
    'custlinkmanRef': custlinkmanRef,
    'ShareholderRef': ShareholderRef,
    


  },
  data() {

    let oThis = this;
    let validator = function(rule, value, callback) {};
    //校验
    let validatecustomer = function(rule, value, callback) {
      
      //证件号码唯一校验
      if (rule.field === "identity_no") {
        if (value === "") {
          callback(new Error("证件号不能为空"));
        } else {
          let datam = {
            identity_no: value,
            pk_customer:oThis.pk_customer
          };
          oThis
            .$http({
              url: ylsBusi + "cust/customer/checkOnlyOne",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(datam))
            })
            .then(res => {
              
              if (res.data.success === true) {
                callback();
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })
            .catch(() => {
              callback(new Error("后台服务有误，请联系管理员！"));
            });
        }
      }
      //企业客户名称
      if(rule.field==="customer_name"){
        if (value === '') {
          callback(new Error('企业客户名称不能为空'));
        } else {
          callback();
        }
      }
    };
    return {
      funnode:"BT003",
      nexuskey:"customer_corp_ui",
      custfunnode:"BT003",
      custnexuskey:"customer_detial_ui",
      scrollDom: "ifbpScrollDom",
      pk_customer: "",
      linkmanDelVisible: false,
      custbankDelVisible: false,
      ShareholderDelVisible: false,
      rmoveindex: "",
      delId: "",
      //企业客户基本信息修改
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
        
        //地区级联参照
        let $refNode4 = this.getNodeById($node, 'ofj3u2jhzb9');  
         let $refNode5 = this.getNodeById($node, 'rwakr8o78c');

         if($refNode4.length) {
          $refNode4.attr("v-on:trigger", "handleRefChange4"); 
        }
        if($refNode5.length) {
          $refNode5.attr("v-on:trigger", "handleRefChange5"); 
        }
        
      },
      t_Methods: {
        handleRefChange1: function(type, data) {
           
          if(type === 'change') {
            let refParams={'key':data.value[0].innercode};
            oThis.$refs.baseTemplateRef1.setData('h_param', refParams);
          }
        },
        handleRefChange2: function(type, data) {
           
          if(type === 'change') {
            let refParams={'key':data.value[0].innercode};
            oThis.$refs.baseTemplateRef1.setData('m_param', refParams);
          }
        },
        handleRefChange3: function(type, data) {
           
          if(type === 'change') {
            let refParams={'key':data.value[0].innercode};
            oThis.$refs.baseTemplateRef1.setData('s_param', refParams);
          }
        },
        handleRefChange4: function(type, data) {
          
          if(type === 'change') {
            
            let refParams={'key':data.value[0].innercode};
            oThis.$refs.baseTemplateRef1.setData('city_param', refParams);
          }
        },
        handleRefChange5: function(type, data) {
          
          if(type === 'change') {
            
            let refParams={'key':data.value[0].innercode};
            oThis.$refs.baseTemplateRef1.setData('county_param', refParams);
          }
        }
      },
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.customerEdit = !oThis.customerEdit;
          }
        }
      ],
      customerPk: "54fc5e2c-414d-49e5-9a44-1bf2bbe002e1",
      customerData: {
        customer: {},
        rules: {
          customer_name: [{validator: validatecustomer, trigger: "blur" }
          ],
          identity_no: [{ validator: validatecustomer, trigger: "blur" }],
          cusotmer_class: [
            // { required: true, message: "企业客户基本分类不能为空", trigger: "blur" }
          ]
        }
      },
      customerEdit: false,
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
      ]




    };
  },
  //获取数据数据初始化操作
  created() {},
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
    
    /**
       *   初始响应方法
       **/
    request() {
      this.pk_customer = this.$root.$router.currentRoute.params.id;
      //请求企业客户基本信息详情
      if(this.pk_customer===undefined){
        this.pk_customer="";
        this.customerEdit=true;
        return;
      }
       
      let method = this.$root.$router.currentRoute.name;
       
      if (method === "Manufacturer-update") {
        if (this.pk_customer != "") {
          this.requestCustBaseInfo();
         
        }
      }
    },
    //请求企业客户基本信息详情
    requestCustBaseInfo() {
       
      this.$http({
        url: ylsBusi + "cust/customer/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: this.pk_customer
      })
        .then(res => {
          let originalValue = res.data.data;
          this.$refs.baseTemplateRef.setData(
            "customer",
            JSON.parse(JSON.stringify(originalValue))
          );
           
          this.$refs.baseTemplateRef1.setData(
            "CustCorp",
            JSON.parse(JSON.stringify(originalValue.cust_corp_list[0]))
          );
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "企业客户基本信息详情获取失败",
            type: "error"
          });
        });
    },

    customerCancel() {
      this.customerEdit = false;
      // 重置value
    },
    //企业客户基本信息保存
    customerConfirm() {
      let data = this.$refs.baseTemplateRef.comp.customer;
      let data1 = this.$refs.baseTemplateRef1.comp.CustCorp;
       
      let a=[data1];
      data.cust_corp_list=a;
      console.log(data);
      let baseUrl = ylsBusi;
       
      //表单formRef  表格tableRef
      this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/customer/updateORinsert",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
               
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                 
                this.originalValue = res.data.data;
                console.log(this.$refs.baseTemplateRef);
                this.$refs.baseTemplateRef.setData(
                  "customer",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                
                this.pk_customer=this.originalValue.pk_cust_customer;
                this.customerEdit = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>
<style>

</style>

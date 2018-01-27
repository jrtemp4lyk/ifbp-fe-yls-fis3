<template>
<div>
          <ifbp-template ref="CustBasicRef"
                          tplId="CustBasic"
                          :funnode="funnode"
                          :nexuskey="CustBasicnexuskey"
                          show-type="form"
                          :tplData="CustBasicData"
                          :editable="CustEdit">
          </ifbp-template>
          <ifbp-template ref="CustRef"
                          tplId="CustBusi"
                          :funnode="funnode"
                          :nexuskey="CustPknexuskey"
                          show-type="form"
                          :tplData="CustData"
                          :tplResetFun="cropResetFun"
                          :methods="t_Methods"
                          :editable="CustEdit">
          </ifbp-template>
          <div class="form-button-div" v-if="CustEdit">
            <el-button type="default" class="button-no-radius" @click="CustCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="CustConfirm">保存</el-button>
          </div>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["pk_customer"],
  data() {
    let oThis = this;
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      CustEdit: false,
      
      funnode:"BT003",
      CustBasicnexuskey:"cust_basic_busi_apply",
      CustBasicData:{
        custBasic_busi: {}
      },
      CustPknexuskey:"corp_busi_apply",
      CustData: {},
      cropResetFun: function($node) {
        //地区级联参照
        let $refNode1 = this.getNodeById($node, 'axik3iubxq');  
        let $refNode2 = this.getNodeById($node, 'wxatv844dr');

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "ccrsRefChang"); 
        }
        if($refNode2.length) {
          $refNode2.attr("v-on:trigger", "handleRefChange2"); 
        }
      },
      t_Methods: {
        ccrsRefChang: function(type, data) {
          if(type === 'change') {
            let refParams={'refcode':data.value[0].innercode};
            oThis.$refs.CustRef.setData('citySel',refParams);
          }
        },
        handleRefChange2:function(type, data){
          if(type === 'change') {
            let refParams={'refcode':data.value[0].innercode};
            oThis.$refs.CustRef.setData('districtSel',refParams);
          }
        }
      },
      CustCancel() {
        oThis.CustEdit = false;
        // 重置value
      },

      //客户基本信息保存
    CustConfirm() {
          let data = oThis.$refs.CustBasicRef.comp.customer;
          let data1 = oThis.$refs.CustRef.comp.CustCorp;
          let a=[data1];
          data.cust_corp_list=a;
          //表单formRef  表格tableRef
          oThis.$refs.CustBasicRef.comp.$refs["formRef"].validate(valid => {
            if (valid) {
              oThis.$http({
                url: ylsBusi + "cust/customer/create",
                headers: { "Content-Type": "application/json" },
                method: "post",
                data: JSON.parse(JSON.stringify(data))
              })
                .then(res => {
                  if (res.data.success === true) {
                    oThis.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    oThis.originalValue = res.data.data;
                    console.log(oThis.$refs.CustBasicRef);
                    oThis.$refs.CustBasicRef.setData(
                      "customer",
                      JSON.parse(JSON.stringify(oThis.originalValue))
                    );
                    oThis.pk_customer=oThis.originalValue.pk_cust_customer;
                    oThis.CustEdit = false;
                  } else {
                    oThis.$message({
                      message: "res.data.error.errorMessage",
                      type: "error"
                    });
                  }
                })
                .catch(() => {
                  oThis.$message({
                    message: "更新失败",
                    type: "error"
                  });
                });
            }
          });
        }
    };
    
  },
  //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
  },
  //获取数据数据初始化操作
  created() {},
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.requestCustCorp();
    }
  },
  //页面操作
  mounted() {
    this.request();
  },
  methods: {
    /**
       *   初始响应方法
       **/
    request() {
      if (this.pk_customer != "") {
        this.requestCustCorp();
      }
    },
    //请求客户联系人
    requestCustCorp() {
      this.$http({
       url: ylsBusi+"cust/customer/getById" ,
         headers: {'Content-Type': 'application/json'},  
         method: "post",
         data:this.pk_customer
      }).then(res => {
            console.log(this.pk_customer);
            let originalValue = res.data.data;
            console.log(originalValue);
            this.$refs.CustBasicRef.setData(
              "customer",
              JSON.parse(JSON.stringify(originalValue))
            );
            this.$refs.CustRef.setData(
              "CustCorp",
              JSON.parse(JSON.stringify(originalValue.cust_corp_list[0]))
            );
        
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
    },
  }
};
</script>
<style>

</style>

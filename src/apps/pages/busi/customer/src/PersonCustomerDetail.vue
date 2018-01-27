<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">自然人客户管理</h2>
    </div>
    <!-- 主体区域(详情页结构) -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <!--自然人客户基本信息模块界面-->
        <ifbp-panel id="basePanel" title="自然人客户基本信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="custfunnode"
                    :nexuskey="custnexuskey"
                    show-type="form"
                    :methods="cust_Methods"
                    @after-create="setRefParam"
                    :tplData="customerDetail"
                    :tplResetFun="custResetFun"
                    :editable="customerEdit">
          </ifbp-template>
            <ifbp-template ref="baseTemplateRef1"
                    tplId="baseTemplate1"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    show-type="form"
                    :methods="t_Methods"
                    :tplResetFun="personResetFun"
                    :tplData="customerDataDetail"
                    :editable="customerEdit">
           </ifbp-template>
          <div class="form-button-div" v-if="customerEdit">
            <el-button type="default" class="button-no-radius" @click="customerCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="customerConfirm">保存</el-button>
          </div>
        </ifbp-panel>
        <!--联系人模块界面-->
         <ifbp-panel id="linkmanPanel"  :show-body="false"  title="联系人信息" :icons="linkmanIcons">
          <custlinkmanRef
            ref="custlinkmanRef"
            :pk_customer="pk_customer"
            type="person">
          </custlinkmanRef>
        </ifbp-panel> 
        
     
        
        <!--自然人客户资产信息模块-->
        <ifbp-panel id="AssetPanel"  v-if="isshow" :show-body="false"  title="自然人客户资产信息" :icons="AssetIcons">
          <AssetRef
            ref="AssetRef"
            :pk_customer="pk_customer">
          </AssetRef>
        </ifbp-panel>-->
        <!--银行账户信息模块-->
        <ifbp-panel id="BankAccountPanel"  :show-body="false"   title="银行账户信息" :icons="BankAccountIcons">
          <BankAccountRef
            ref="BankAccountRef"
            :pk_customer="pk_customer">
          </BankAccountRef>
        </ifbp-panel>
         <!--外部评级信息模块-->
         <ifbp-panel id="ExternalRatingPanel"  v-if="isshow" :show-body="false"  title="外部评级信息" :icons="ExternalRatingIcons">
          <ExternalRatingRef
            ref="ExternalRatingRef"
            :pk_customer="pk_customer">
          </ExternalRatingRef>
        </ifbp-panel> -->
        
       
      </ifbp-panel-group>
    </div>
    <el-dialog
      title="提示"
      v-model="reloadVisible"
      :modal="true"
      size="tiny">
      <span>该信息已存在，是否调用？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reloadVisible = false, custPk=''">取 消</el-button>
        <el-button type="primary" @click="reloadPersonClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      v-model="hasCustClsVisible"
      :modal="true"
      size="tiny">
      <span>请先维护客户分类！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reloadVisible=false,hasCustClsVisible = false, pk_customer=''">取 消</el-button>
        <el-button type="primary" @click="hasCustClsVisible=false,pk_customer='',reloadVisible=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js';
//引入信息面板
import custlinkmanRef from './linkmanpanel.vue';
import ShareholderRef from './Shareholderpanel.vue';
import ContractHandRef from './ContractHandPanel.vue';
import CustUpDownRef from './CustUpDownPanel.vue';
import AssetRef from './AssetPanel.vue';
import BankAccountRef from './BankAccountPanel.vue';
import QualificationCertRef from './QualificationCertPanel.vue';
import EquityInvestRef from './EquityInvestPanel.vue';
import ExternalRatingRef from './ExternalRatingPanel.vue';
import CommRecordRef from './CommRecordPanel.vue';
import RelatedCompanyRef from './RelatedCompanyPanel.vue';
import MemberRef from './MemberPanel.vue';
import LitigationSituationRef from './LitigationSituationPanel.vue';
import TaxesOwedRef from './TaxesOwedPanel.vue';
export default {
  components: {
    'custlinkmanRef': custlinkmanRef,
    'ShareholderRef': ShareholderRef,
    'ContractHandRef': ContractHandRef,
    'CustUpDownRef': CustUpDownRef,
    'AssetRef': AssetRef,
    'BankAccountRef': BankAccountRef,
    'QualificationCertRef': QualificationCertRef,
    'EquityInvestRef': EquityInvestRef,
    'ExternalRatingRef': ExternalRatingRef,
    'CommRecordRef': CommRecordRef,
    'RelatedCompanyRef': RelatedCompanyRef,
    'MemberRef': MemberRef,
    'LitigationSituationRef': LitigationSituationRef,
    'TaxesOwedRef': TaxesOwedRef


  },
  data() {

    let oThis = this;
    let validator = function(rule, value, callback) {};
    //校验


    let validatecustomerDetail = function(rule, value, callback) {
       
      //证件号码唯一校验
  
      if(rule.field === "identity_card_numb"){
         debugger; 
        if(value === ''){
          callback(new Error('不能为空'));
        }else if(oThis.$root.$router.currentRoute.name!=='PersonCustomerDetial' && oThis.pk_customer===''){
          if(oThis.$refs.baseTemplateRef1.comp.$refs["CustPersonRef"].model.identity_card_numb!==''){
            oThis.validateInput(value);
            debugger;
            if(oThis.isIdCanUse){
              callback(new Error('该证件号已经存在，请重新输入'));
            }else{
              callback();
            }
              
          } 
        }else{
          callback();
        } 
      }

    
    }
    return {
      hasCustClsVisible:false,
      custPk:'',
      isIdCanUse:false,
      isshow:true,
      reloadVisible: false,
      custfunnode:"BT003",
      custnexuskey:"customer_detial_ui",
      funnode:"BT003",
      nexuskey:"customer_person_ui",
      scrollDom: "ifbpScrollDom",
      pk_customer: "",
      linkmanDelVisible: false,
      custbankDelVisible: false,
      ShareholderDelVisible: false,
      rmoveindex: "",
      delId: "",
      //自然人客户基本信息修改
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            if(!oThis.customerEdit){
              oThis.customerEdit=true;
              let copyperson=oThis.$refs.baseTemplateRef1.comp.CustPerson;
              oThis.copyForPerson=JSON.parse(JSON.stringify(copyperson));
              let copycust=oThis.$refs.baseTemplateRef.comp.customer;
              oThis.copyForCust=JSON.parse(JSON.stringify(copycust));

            }else{
              oThis.customerCancel();

            }
          }
        }
      ],
 
      customerDetail: {
          customer: {},
         
        },
 

      customerDataDetail: {
        customer: {},
        rules: {
          identity_card_numb: [{ validator: validatecustomerDetail, trigger: "blur" }],
          
        }
      },
      customerEdit: false,
      custResetFun:function($node) {
        let $refNode = $node.find("el-select[v-model='customer.customer_style']"); 
        $refNode.parent().css("display",'none');

        //获取客户分类节点
        let $refCustCls= $node.find("el-ref[v-model='customer.cusotmer_class']");
        debugger;
        if(this.$root.$router.currentRoute.params.cust_type!==undefined && this.$root.$router.currentRoute.params.cust_type==='Lessee'){
          $refCustCls.attr("disabled",false);
          let refParams={'cust_type':'Lessee'};
          oThis.$refs.baseTemplateRef.setData("cust_cls", refParams);
          $refCustCls.attr("v-on:trigger", "setCustCls"); 
          

        }


      },
      personResetFun: function($node) {
        //单位所属行业分类级联参照
        let $refNode1 = this.getNodeById($node, 'gw1uxdkl5d');  

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        }
        
 
        //地区级联参照
        let $refNode2 = this.getNodeById($node, 'drut16v1bgf');  
        let $refNode3 = this.getNodeById($node, 'qgipxenj48');

        if($refNode2.length) {
          $refNode2.attr("v-on:trigger", "handleRefChange2"); 
        }
        if($refNode3.length) {
          $refNode3.attr("v-on:trigger", "handleRefChange3"); 
        }

        //客户行业分类级联参照
        let $refNode4 = this.getNodeById($node, 'dp0mur4m8je');  
        let $refNode5 = this.getNodeById($node, 'l1amy3rlzxp');
        let $refNode6 = this.getNodeById($node, 'bnqeyxqi98h');  
        
        if($refNode4.length) {
          $refNode4.attr("v-on:trigger", "handleRefChange4"); 
        }
        if($refNode5.length) {
          $refNode5.attr("v-on:trigger", "handleRefChange5"); 
        }
        if($refNode6.length) {
          $refNode6.attr("v-on:trigger", "handleRefChange6"); 
        }
       


      },
      cust_Methods:{
        setCustCls: function(type, data){
          oThis.pk_temp=oThis.$refs['baseTemplateRef'].comp.customer.cusotmer_class;
          if(oThis.pk_temp==='yls_dev100000000ffn'){
            oThis.cust_type='Lessee';

          }else if(oThis.pk_temp==='yls_dev100000000ffr'){
            oThis.cust_type='Guarantee';

          }else if(oThis.pk_temp==='yls_dev100000000ffo'){
            oThis.cust_type='FinancingUnit';

          }else if(oThis.pk_temp==='yls_dev100000000ffp'){
            oThis.cust_type='Agency';

          }else if(oThis.pk_temp==='yls_dev100000000ffq'){
            oThis.cust_type='RelatedParty';

          }else if(oThis.pk_temp==='yls_dev100000000ffs'){
            oThis.cust_type='Supplier';

          }else if(oThis.pk_temp==='yls_dev100000000ffu'){
            oThis.cust_type='GroupCust';

          }else if(oThis.pk_temp==='yls_dev100000000ffw'){
            oThis.cust_type='RentalUnit';

          }
        }

      },
      t_Methods: {
        handleRefChange1: function(type, data) {
           
          if(type === 'change') {
             
            let innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.belong_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange2: function(type, data) {
           
          if(type === 'change') {
             
            let innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.city_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange3: function(type, data) {
           
          if(type === 'change') {
             
            let innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.town_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange4: function(type, data) {
           
          if(type === 'change') {
             
            let innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.cust_h_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange5: function(type, data) {
           
          if(type === 'change') {
             
            let innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.cust_m_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange6: function(type, data) {
           
          if(type === 'change') {
             
            let innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.cust_s_ref.changeQueryParams(innerCode);
          }
        }
      },
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
      ],
      ContractHandIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "不可操作！",
                  type: "error"
                });
                return;
            }
            // oThis.$refs.ContractHandRef.$refs.ContractHandRef.getTableComp().closeExpandRow();
            // // 重置新增数据
            // oThis.$refs.ContractHandRef.$refs.ContractHandRef.resetFormData();
            // // 显示新增区域
            // oThis.$refs.ContractHandRef.$refs.ContractHandRef.comp.formShow = true;
          }
        }
      ],
      CustUpDownIcons: [
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
            oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.resetFormData();
            // 显示新增区域
            oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.comp.formShow = true;
          }
        }
      ],
      AssetIcons: [
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
            oThis.$refs.AssetRef.$refs.AssetRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.AssetRef.$refs.AssetRef.resetFormData();
            // 显示新增区域
            oThis.$refs.AssetRef.$refs.AssetRef.comp.formShow = true;
          }
        }
      ],
      BankAccountIcons: [
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
            oThis.$refs.BankAccountRef.$refs.BankAccountRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.BankAccountRef.$refs.BankAccountRef.resetFormData();
            // 显示新增区域
            oThis.$refs.BankAccountRef.$refs.BankAccountRef.comp.formShow = true;
          }
        }
      ],
      QualificationCertIcons: [
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
            oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.resetFormData();
            // 显示新增区域
            oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.comp.formShow = true;
          }
        }
      ],
      EquityInvestIcons: [
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
            oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.resetFormData();
            // 显示新增区域
            oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.comp.formShow = true;
          }
        }
      ],
      ExternalRatingIcons: [
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
            oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.comp.formShow = true;
          }
        }
      ],
      CommRecordIcons: [
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
            oThis.$refs.CommRecordRef.$refs.CommRecordRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.CommRecordRef.$refs.CommRecordRef.resetFormData();
            // 显示新增区域
            oThis.$refs.CommRecordRef.$refs.CommRecordRef.comp.formShow = true;
          }
        }
      ],
      RelatedCompanyIcons: [
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
           
          
             oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.resetFormData();
            // 显示新增区域
            oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.comp.formShow = true;
          }
        }
      ],
      MemberIcons: [
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
           
          
             oThis.$refs.MemberRef.$refs.MemberRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.MemberRef.$refs.MemberRef.resetFormData();
            // 显示新增区域
            oThis.$refs.MemberRef.$refs.MemberRef.comp.formShow = true;
          }
        }
      ],
      LitigationSituationIcons: [
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
           
          
             oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.resetFormData();
            // 显示新增区域
            oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.comp.formShow = true;
          }
        }
      ],
      TaxesOwedIcons: [
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
           
          
            oThis.$refs.TaxesOwedRef.$refs.TaxesOwedRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.TaxesOwedRef.$refs.TaxesOwedRef.resetFormData();
            // 显示新增区域
            oThis.$refs.TaxesOwedRef.$refs.TaxesOwedRef.comp.formShow = true;
          }
        }
      ]





    };
  },
  //获取数据数据初始化操作
  created() {
   this.cust_type=this.$root.$router.currentRoute.params.cust_type;
     
  
    if(this.cust_type==='Lessee'){   //承租人
      this.pk_temp = 'yls_dev100000000ffn'
    }
    if(this.cust_type==='Guarantee'){   //担保人
      this.pk_temp = 'yls_dev100000000ffr'
    }
    if(this.cust_type==='FinancingUnit'){  //融资单位
      this.pk_temp = 'yls_dev100000000ffo'
    }
    if(this.cust_type==='Agency'){   //中介机构
      this.pk_temp = 'yls_dev100000000ffp'
    }
    if(this.cust_type==='RelatedParty'){   //客户关联方
      this.pk_temp = 'yls_dev100000000ffq'
    }
    if(this.cust_type==='Supplier'){   //供应商
      this.pk_temp = 'yls_dev100000000ffs'
    }
    if(this.cust_type==='GroupCust'){   //集团客户
      this.pk_temp = 'yls_dev100000000ffu'
    }
    if(this.cust_type==='RentalUnit'){   //出租单位
      this.pk_temp = 'yls_dev100000000ffw'
    }
  },
  //页面操作
  mounted() {
    
    
    this.request();
  },
  methods: {
      validateInput(identity_no){
       
        let data={'identity_no':identity_no};
        this.$http({
          url: ylsBusi + "cust/customer/validateInput",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: identity_no
        })
          .then(res => {
            debugger;
            if(res.data.data!==null){
              debugger;
              if(res.data.data.customer_type==='PERSON'){
                this.custPk=res.data.data.pk_cust_customer;
                this.reloadVisible=true;
                this.isIdCanUse=true;
              }else{
                 this.isIdCanUse=false;
              }
            }else{
              debugger;
               this.isIdCanUse=false;
            }

          })
          .catch(e => {
            console.error(e);
            
          });
    },
    setRefParam(){
      //设置客户类型默认值
      this.$refs.baseTemplateRef.comp.$refs["formRef"].model.customer_type='PERSON';
     
     
    },
    reloadPersonClick(){
     if( this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class==='' ||  this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class===undefined ){
        this.hasCustClsVisible=true;
      }else{
        //this.cust_type=this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class
        this.reloadPersonDetail();

      }
      

    },
    //信息存在，载入已有信息界面
    reloadPersonDetail(){
      

      let urlInfo = this.custPk + this.cust_type;
      location.hash = "/cust/Personcustomer/detail/" + urlInfo;
      window.location.reload();

    },


    
    /**
       *   初始响应方法
       **/
    request() {
      
      let urlParam = this.$root.$router.currentRoute.params.id;
      //请求企业客户基本信息详情
      if(urlParam===undefined){
        this.pk_customer="";
        this.customerEdit=true;
        return;
      }
      
      if (urlParam.length == 19) {
        this.pk_customer = urlParam;
      } else {
        this.pk_customer = urlParam.substring(0, 19);
        this.cust_type = urlParam.substring(19);
      }

      let method = this.$root.$router.currentRoute.name;

      // 查看和修改情况
      if (method === "PersonCustomerDetial") {
        if (this.pk_customer != "") {
          this.requestCustBaseInfo();
        }
      }
    },
    //请求自然人客户基本信息详情
    requestCustBaseInfo() {
     
      this.$http({
        url: ylsBusi + "cust/customer/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: this.pk_customer
      })
        .then(res => {
         
          let originalValue = res.data.data;
          let c_class = originalValue.cusotmer_class;
          if (this.cust_type !== undefined) {
              let c_class_pk = '';
              if(this.cust_type==='Lessee'){   //承租人
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffn'] = {
                  "code": "1",
                  "name": "承租客户",
                  "id": "yls_dev100000000ffn"
                }
                c_class_pk = 'yls_dev100000000ffn'
              }
              if(this.cust_type==='Guarantee'){   //担保人
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffr'] = {
                  "code": "5",
                  "name": "担保客户",
                  "id": "yls_dev100000000ffr"
                }
                c_class_pk = 'yls_dev100000000ffr'
              }


              if(this.cust_type==='FinancingUnit'){   //融资单位
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffo'] = {
                  "code": "2",
                  "name": "融资单位",
                  "id": "yls_dev100000000ffo"
                }
                c_class_pk = 'yls_dev100000000ffo'
              }
              if(this.cust_type==='Agency'){   //中介机构
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffp'] = {
                  "code": "3",
                  "name": "中介机构",
                  "id": "yls_dev100000000ffp"
                }
                c_class_pk = 'yls_dev100000000ffp'
              }if(this.cust_type==='RelatedParty'){   //客户关联方
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffq'] = {
                  "code": "4",
                  "name": "客户关联方",
                  "id": "yls_dev100000000ffq"
                }
                c_class_pk = 'yls_dev100000000ffq'
              }if(this.cust_type==='Supplier'){   //供应商
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffs'] = {
                  "code": "6",
                  "name": "供应商",
                  "id": "yls_dev100000000ffs"
                }
                c_class_pk = 'yls_dev100000000ffs'
              }
              if(this.cust_type==='GroupCust'){   //集团客户
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffu'] = {
                  "code": "6",
                  "name": "集团客户",
                  "id": "yls_dev100000000ffu"
                }
                c_class_pk = 'yls_dev100000000ffu'
              }
              if(this.cust_type==='RentalUnit'){   //出租单位
                originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffw'] = {
                  "code": "10",
                  "name": "出租单位",
                  "id": "yls_dev100000000ffw"
                }
                c_class_pk = 'yls_dev100000000ffw'
            }
            debugger;
            if (!(c_class.indexOf(c_class_pk) > 0)) {
              c_class += ',' + c_class_pk;
              originalValue.cusotmer_class = c_class;
              // this.$set(formData, "cusotmer_class", c_class);
              debugger;
              // this.$refs.baseTemplateRef.getFormData().cusotmer_class = c_class;
            }
          }
          this.$refs.baseTemplateRef.setData(
            "customer",
            JSON.parse(JSON.stringify(originalValue))
          );
          
          this.$refs.baseTemplateRef1.setData(
            "CustPerson",
            JSON.parse(JSON.stringify(originalValue.cust_persion_list[0]))
          );
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "自然人客户基本信息详情获取失败",
            type: "error"
          });
        });
    },

    customerCancel() {
      this.customerEdit = false;

      this.$refs.baseTemplateRef.setData('customer', this.copyForCust);
      this.$refs.baseTemplateRef1.setData('CustPerson', this.copyForPerson);
      // 重置value
    },
    //自然人客户基本信息保存
    customerConfirm() {
      let data = this.$refs.baseTemplateRef.comp.customer;
      if(this.pk_customer===''){
        data.cusotmer_class= this.pk_temp;
        data.customer_type = 'PERSON';

      }
      
      let data1 = this.$refs.baseTemplateRef1.comp.CustPerson;
       debugger;
      let a=[data1];
      data.cust_persion_list=a;
      console.log(data);
      
       
      //表单formRef  表格tableRef
      this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(valid => {
        if (valid) {
           this.$refs.baseTemplateRef1.comp.$refs["CustPersonRef"].validate(valid => {
             if (valid) {
               this.$http({
                  url: ylsBusi + "cust/customer/updateORinsert",
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

             }});
          
        }
      });
    }
  }
};
</script>
<style>

</style>

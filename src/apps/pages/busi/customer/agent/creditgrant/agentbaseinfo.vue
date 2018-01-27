<template>
<div>
      <!--代理商基本信息模块界面-->
          <ifbp-template ref="agentbaseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="agentbasefunnode"
                    :nexuskey="agentbasenexuskey"
                    @form-confirm-click="agentbaseFormConfirm"
                    @form-cancel-click="agentbaseFormCancel"
                    show-type="table-form"
                    :methods="formReSetMethods"
                    :tplResetFun="templateTableFormResetFun"
                    :tplData="customerData"
                    :editable="agentEdit"                  
                    @delete-table-click="tableDeleteClickRow"
                    @search-table-click="updateagentbaseDataRow">
          </ifbp-template>
          <el-dialog
            title="提示"
            v-model="custVisible"
            :modal="true"
            size="tiny">
            <span>确认删除该条记录 ？删除后无法恢复</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="custVisible = false, this.delId=''">取 消</el-button>
              <el-button type="primary" @click="tableDeleteClick">确 定</el-button>
            </span>
          </el-dialog>

           <el-dialog
            title="提示"
            v-model="isGetEntity"
            :modal="true"
            size="tiny">
            <span>输入客户已经存在，请确认是否带出并自动填入</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="isGetEntity = false, this.delId=''">不 带</el-button>
              <el-button type="primary" @click="fillInDate">带 出</el-button>
            </span>
          </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  props:['pkCustomerVal','credit_grant','editable'],
  data() {

    let oThis = this;
    let validator = function(rule, value, callback) {};
    //校验
    let validatecustomer = function(rule, value, callback) {
      debugger;
      //证件号码唯一校验
      if (rule.field === "1111") {
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
      //代理商名称
      if(rule.field==="cust_name"){
        if (value === '') {
          callback(new Error('代理商名称不能为空'));
        } else {
          oThis.agentByCustName(value);
          callback();
        }
      }else if(rule.field ==='org_codecertificate'){

      }
    };
    return {
      //显示的标题
      title: '',
      agentbasefunnode:'BT004',
      agentbasenexuskey:'agentbaseinfo',
      scrollDom: "ifbpScrollDom",
      pk_customer: '',
      rmoveindex: "",
      delId: "",
      custVisible :false,
      isGetEntity:false,
      fillData:'',
      //操作按钮
      templateTableFormResetFun:function($node){
          //获取table,此id为ui模板上面的表格Id
          let $table = this.getNodeById($node, "jkcwc96ndh8");
          //定义操作
          let operateArr = [
              {
                  title:"查看",
                  icon:"search"
              },
              {
                  title:"删除",
                  icon:"delete"
              }
          ];
          //获取操作按钮html片段
          let operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          
          // 判断是否有所属厂商
          let $CustCorp_have_belongto = $node.find("el-select[v-model='CustCorp.have_belongto']");
          if($CustCorp_have_belongto.length){
             $CustCorp_have_belongto.attr("v-on:change","havebelongtoFun");
          }
          // 所属厂商及所属事业部绑定属性
          let $manufacturer = $node.find("el-ref[field='manufacturer'], el-select[v-model='CustCorp.hava_busi_division']");
          $manufacturer.attr('v-bind:disabled', 'belongToIsDisabled');

          // 判断是否有三证或者一证  
          let $CustCorp_three_certifcates = $node.find("el-select[v-model='CustCorp.three_certifcates']");
          if($CustCorp_three_certifcates.length){
               $CustCorp_three_certifcates.attr("v-on:change","threeCertifcatesFun");
          }
          debugger;
          // 三证属性绑定
          let $threeCertifcates = $node.find("el-input[v-model='CustCorp.org_codecertificate'], el-input[v-model='CustCorp.license_no'],el-input[v-model='CustCorp.tax_registercode']");
          $threeCertifcates.attr('v-bind:disabled', 'threeCertifcates');
          // 一证属性绑定
          let $oneCertifcates = $node.find("el-input[v-model='CustCorp.society_credit']");
          $oneCertifcates.attr('v-bind:disabled','oneCertifcates');

          return $node[0].outerHTML;
      },
      //代理商基本信息修改
      //级联参照
      // corpResetFun: function($node) {
      //   var $refNode1 = this.getNodeById($node, 'w85l2pcqcf');  //开户行省
      //    var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
      //     var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
          

      //   if($refNode1.length) {
      //     $refNode1.attr("v-on:trigger", "handleRefChange1"); 
      //   }
      //   if($refNode2.length) {
      //     $refNode2.attr("v-on:trigger", "handleRefChange2"); 
      //   }
      //   if($refNode3.length) {
      //     $refNode3.attr("v-on:trigger", "handleRefChange3"); 
      //   }
        
      // },
      formReSetMethods:{
          // 三证或一证
          threeCertifcatesFun(data){
             if(data && data !==''){
               debugger;
               if(data == 'Y'){
                  this.threeCertifcates = false;
                  this.oneCertifcates = true;
               }
               else if(data == 'N'){
                  this.oneCertifcates = false;
                  this.threeCertifcates = true;
               }else{
                  this.oneCertifcates = true;
                  this.threeCertifcates = true;
               }
             }
          },
          // 是否有厂商
          havebelongtoFun(data){
              if(data && data !==''){
                 if(data=="YES"){
                    this.belongToIsDisabled = false;
                 }else{
                    this.belongToIsDisabled = true;
                 }
              }
              
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
     
      customerData: {
        customer: {},
        belongToIsDisabled: true,//所属厂商的disabled熟悉设置
        threeCertifcates:true,//判断是否有三证
        oneCertifcates:true,//判断是一证
        rules: {
          cust_name: [{validator: validatecustomer, trigger: "blur" }], //代理商名称校验
          org_codecertificate: [{ validator: validatecustomer, trigger: "blur" }],
          cusotmer_class: []
        }
      },
    };
  },
   //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    },
    
  },
   //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.request();
    },
    editable(val) {
      this.agentEdit = val;
    }
  },
  //获取数据数据初始化操作
  created() {
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
      this.pk_customer =  this.pkCustomerVal;
      //请求企业客户基本信息详情
      if(this.pk_customer===undefined || this.pk_customer===''){
        this.pk_customer='';
        this.agentEdit=true;
        // this.agentRequest();
        debugger
        this.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
        this.$refs.agentbaseTemplateRef.formShow = true;
        return;
      }
      if (this.credit_grant == "creditgrant") {
        if (this.pk_customer != "") {
          // this.requestCustBaseInfo();
          this.agentEdit=false;
          this.requestByPk();        
        }
      }
    },
     //后台请求
    agentRequest() {
      let url;
      let baseUrl =  ylsBusi;
      url = baseUrl + 'cust/corp/pageAgent';
      let data = {
          "orderList": [
              {
                  "direction": "desc",
                  "property": "ts"
              }
          ],
          "pageNum": 0,
          "pageSize": 200,
          "searchParams": {
          "searchMap": {
            "creator":"102440",
            }
          }
      };
      this.$http({
          url: url,
          headers: {'Content-Type': 'application/json'},
          method: "post",
          data: data,
          dataType: "json"
      }).then(res => {
          //UI模板表格名称
          let originalValue = res.data.data.content;
          this.$refs['agentbaseTemplateRef'].setData(
              "CustCorp_t",
              JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          this.size = res.data.data.size; // 每页的条数
          }).catch((e) => {
              this.$message({
                  message: "信息获取失败",
                  type: "error"
              });
          });
      },
    // 客户回写
    agentByCustName(name){
         debugger;
         let nameVal = name;
          this.$http({
                    url: ylsBusi+'cust/corp/getEntityByCustName',
                    headers: {'Content-Type': 'application/json'},
                    method: 'post',
                    data:nameVal,
                    dataType: 'json'
                }).then(res => {
                  let originalValue = res.data.data;
                  if(res.data.success == true && originalValue !=null){
                    this.isGetEntity = true;
                    this.fillData = originalValue;//给回写的数据赋值
                  } 
                  this.agentEdit = true;
                }).catch((e) => {
                    console.log(e);
                    this.$message({
                        message: '信息获取失败',
                        type: 'error',
                    });
                });        
    },
    // 带出后填入数据
    fillInDate(){
        let originalValue = this.fillData;
        this.$refs.agentbaseTemplateRef.setData(
            'CustCorp',
            JSON.parse(JSON.stringify(originalValue))
        );
        let pk_customer = originalValue.pk_customer;
        this.$emit('change-agent-base',pk_customer);
        this.isGetEntity = false;
    },
    
    // 通过pk获取对象
    requestByPk(){
      let url;
      let baseUrl =  ylsBusi;
      url = baseUrl + "cust/corp/getByPkCustomer";
      let data = this.pk_customer;
      this.$http({
          url: url,
          headers: {'Content-Type': 'application/json'},
          method: "post",
          data: data,
          dataType: "json"
      }).then(res=>{
          let originalValue = res.data.data;
          this.$refs.agentbaseTemplateRef.setData(
            "CustCorp_t",
            JSON.parse(JSON.stringify([originalValue]))
          );
           this.$refs.agentbaseTemplateRef.comp.formShow = false;
      }).catch((e)=>{
          this.$message({
            message: "代理商基本信息详情获取失败",
            type: "error"
          });
      })
      
    }, 
    
    // 弹出删除提示框
    tableDeleteClickRow: function(scope) {
        this.delId = scope.row.pk_cust_corp;
        // this.agentRequest();
        this.custVisible = true;
    },
    
    //确认后调用删除
    tableDeleteClick:function(scope){
          debugger;
          // let delId = scope.row.pk_cust_customer;
          this.$http({
              url:  ylsBusi+"cust/corp/deleteCustcpAndCust",
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              dataType: "json",
              data: this.delId
              }).then(res => {
              if (res.data.success === true) {
                  this.$message({
                  message: "删除成功",
                  type: "success"
                  });     
                  this.custVisible = false;    
              } else {
                debugger;
                  this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                  });
              }
              this.agentRequest();
              }).catch((e) => {
                debugger;
                  this.$message({
                      message: "信息删除失败！",
                      type: "error"
                  });
              });
              
    },
     //代理商form取消按钮
    agentbaseFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs.agentbaseTemplateRef.comp.formShow = false;
      } else {
        this.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
      }
    },
    //代理商主表保存
    agentbaseFormConfirm: function() {
      debugger;
      //获取当前数据
      let data = this.$refs.agentbaseTemplateRef.comp.customer;
      let data1 = this.$refs.agentbaseTemplateRef.comp.CustCorp;
      let jsonCustomer = JSON.parse(JSON.stringify(data));
      //设置为企业客户
      jsonCustomer.customer_type = 'CORP';
      //客户设置为代理商
      jsonCustomer.cusotmer_class = 'yls_dev100000000ffv';
      let jsonCustCorpObj = JSON.parse(JSON.stringify(data1));
      jsonCustCorpObj.cust_type = 'CORP';
      jsonCustomer.customer_name = jsonCustCorpObj.cust_name;
      // let a=[data1];
      let a=[jsonCustCorpObj];
      data = jsonCustomer;
      data.cust_corp_list=a;
      console.log(data);
       let baseUrl = ylsBusi;
      //保存校验
      debugger;
      this.$refs.agentbaseTemplateRef.comp.$refs[
        "CustCorp-form"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/customer/orgAnddept",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.originalValue = res.data.data;
                this.pk_customer=this.originalValue.pk_cust_customer;
                this.$emit('change-agent-base',this.pk_customer);
                this.agentEdit = false;
                this.agentRequest();
                debugger;
                this.$parent.$parent.$parent.$refs.operationTable.pk_customer =  this.pk_customer;
                this.$parent.$parent.$parent.$refs.operationTable.reqOptByPkCustomer();
                //隐藏详情列表
                this.$refs.agentbaseTemplateRef.comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch((e) => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    },

    // customerCancel() {
    //   this.agentEdit = false;
    //   // 重置value
    // },
    //代理商编辑
    updateagentbaseDataRow: function(scope) {
      //记录删除位置
      debugger;
      this.rmoveindex = scope.$index;
      this.$refs.agentbaseTemplateRef.getTableComp().expandRow(scope.row);
      this.$refs.agentbaseTemplateRef.comp.formShow = false;
      this.$refs.agentbaseTemplateRef.setData('CustCorp',scope.row);
      this.agentEdit = true;
      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    }
    
  }
};
</script>>
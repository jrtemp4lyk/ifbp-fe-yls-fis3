<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">项目信息设置</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
       
         <ifbp-panel id="basePanel" title="项目授信信息" v-if="isSublease" :icons="creditIcons">
          <ifbp-template ref="creditTemplateRef"
                    tplId="creditTemplate"
                    funnode="BT008"
                    nexuskey="project_credit"
                    show-type="form"
                    :tplData="creditData"
                    :editable="creditEdit">
          </ifbp-template>      
          <div class="form-button-div" v-if="creditEdit">
            <el-button type="default" class="button-no-radius" @click="creditCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="creditConfirm">保存</el-button>
          </div>
        </ifbp-panel>
       
        <ifbp-panel id="basePanel" title="项目信息" :icons="baseIcons"  v-else>
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    show-type="form"
                    :tplData="projectData"
                    :editable="projectEdit">
          </ifbp-template>
          
          <div class="form-button-div" v-if="projectEdit">
            <el-button type="default" class="button-no-radius" @click="projectCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="projectConfirm">保存</el-button>
          </div>
        </ifbp-panel>


         <!--承租人信息-->
         <ifbp-panel id="bothlesseeRef" title="承租人信息" :icons="bothlesseeIcons">
          <bothlesseeRef
            ref="bothlesseeRef"
            :source_bill="pk_project"
            :is_lessee_type="is_lessee_type"
            :type="'prj'">
          </bothlesseeRef>
        </ifbp-panel>
         <!--出租人信息-->
         <ifbp-panel id="OrginfoRef" title="出租人信息" :icons="OrginfoIcons">
          <OrginfoRef
            ref="OrginfoRef"
            :source_bill="pk_project"
            :type="'prj'">
          </OrginfoRef>
        </ifbp-panel>
         <!--供应商信息-->
         <ifbp-panel id="contProviderRef"   v-if = "ifShow" title="供应商信息" :icons="contProviderIcons">
          <contProviderRef
            ref="contProviderRef"
            :source_bill="pk_project"
            :type="'prj'">
          </contProviderRef>
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
              :source_bill="pk_project"
              @closeAddForm="closeAddFormEev"
              >
              </custpledgeRef>
          </el-tab-pane>
          <el-tab-pane  name="type1">
               <mortgageRef
              ref="mortgageRef"
              :source_bill="pk_project"
              @closeAddForm="closeAddFormEev"
              >
            </mortgageRef>
          </el-tab-pane>
          <el-tab-pane name="type2">
            <pledgeRef
              ref="pledgeRef"
              :source_bill="pk_project"
               @closeAddForm="closeAddFormEev"
              >
            </pledgeRef>
          </el-tab-pane>
        </el-tabs>
        </ifbp-panel>
         <!--租赁物信息-->
         <ifbp-panel id="busirenttingRef" title="租赁物" :icons="rentTingIcons">
          <busirenttingRef
            ref="busirenttingRef"
            :pk_prjId="pk_project"
            :type="'prj'"
            :Leasehold="Leasehold">
          </busirenttingRef>
        </ifbp-panel>
        <!--保险信息-->
         <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>
          <insuranceRef
            ref='insuranceRef'
            :source_bill='pk_project'
            :type="'prj'">
          </insuranceRef>
        </ifbp-panel>
        <!--合同相关方信息-->
        <ifbp-panel id="busirelevantPartyRef" title="合同相关方" :icons="relevantPartyIcons">
          <busirelevantPartyRef
            ref="busirelevantPartyRef"
            :pk_prjId="pk_project"
            :type="'prj'">
          </busirelevantPartyRef>
        </ifbp-panel>
        <!--来源信息-->
        <ifbp-panel id="ContSourceRef" title="来源信息" :icons="contSourceIcons">
          <ContSourceRef
            ref="ContSourceRef"
            :pk_prjId="pk_project"
            :type="'prj'">
          </ContSourceRef>
        </ifbp-panel>
           <!--付款条件-->
        <ifbp-panel id="payConditionRef" title="付款条件" :icons="payConditionIcons">
          <payConditionRef
            ref="payConditionRef"
            :pk_prjId="pk_project"
            :type="'prj'">
          </payConditionRef>
        </ifbp-panel>
        <!--起租条件-->
        <ifbp-panel id="rentConditionRef" title="起租条件" :icons="rentConditionIcons" >
          <ifbp-template ref="RentConditionRef"
                        tplId="rentConditionId"
                        funnode="BT015"
                        nexuskey="rent_condition"
                        :tplData="rentConditionData"
                        :tplResetFun="rentConditionFun"
                        @delete-table-click="rentDeleteTableRow"
                        show-type="table-form"
                        >
          </ifbp-template>
        </ifbp-panel>
         <!--逾期利率信息-->
         <ifbp-panel id="penaltyRuleDeRef" title="逾期利率信息" :icons="penaltyRuleDeIcons">
          <penaltyRuleDeRef
            ref="penaltyRuleDeRef"
            :pk_prjId="pk_project"
            :type="'prj'">
          </penaltyRuleDeRef>
        </ifbp-panel>
         <!--收付各方-->
        <ifbp-panel id="projectAccountRef" title="收付各方" :icons="projectAccountIcons">
          <projectAccountRef
            ref="projectAccountRef"
            :pk_prjId="pk_project"
            :type="'prj'">
        </projectAccountRef>
        </ifbp-panel>

         <!--开票方案-->
        <ifbp-panel id="taxMessageAlterRef" title="开票方案" :icons="taxMessageAlterIcons">
          <taxMessageAlterRef
            ref="taxMessageAlterRef"
            :source_bill="pk_project"
            :type="'prj'">
          </taxMessageAlterRef>
        </ifbp-panel>

         <!-- 风险及控制措施汇总-->
         <ifbp-panel id="RiskControlRef" title="风险控制措施" :icons="RiskIcons">
          <RiskControlRef
            ref="RiskControlRef"
            :source_bill="pk_project"
            :type="'prj'">
          </RiskControlRef>
        </ifbp-panel>

          <!-- 项目总结-->
         <ifbp-panel id="ProjectSummarizeRef" title="项目总结" :icons="SummarizeIcons">
          <ProjectSummarizeRef
            ref="ProjectSummarizeRef"
            :source_bill="pk_project"
            :type="'prj'">
          </ProjectSummarizeRef>
        </ifbp-panel>


      </ifbp-panel-group>
    </div>

         <!--删除确认Dialog-->
      <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确定删除此条租条件？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
        </span>
       </el-dialog>
       <!--起租条件-->
        <el-dialog  title="起租条件"   v-model="selDialogVisible"
         @update:visible="val => selDialogVisible = val" :modal="true"  size="large">
           <impRentConditionRef ref="impRentConditionRef"
                                :conditions="rentConditionList"
                                :reload="selDialogVisible"
                               ></impRentConditionRef>
        <span slot="footer" class="dialog-footer">
            <el-button @click="selDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="selConfirmClick">确 定</el-button>
        </span>
       </el-dialog>


 
  </div>
</template>
<script>
import busirenttingRef from './../buni/busi_rentting.vue';
import bothlesseeRef from './projectBothLesseePanel.vue';
import OrginfoRef from './projectOrginfoPanel.vue';
import insuranceRef from './../buni/busi_insure.vue';
import busirelevantPartyRef from './../buni/busi-relevantParty.vue';
import contProviderRef from './ProviderPanel.vue';
import custpledgeRef from '../custpledge/custpledge-info.vue';
import mortgageRef from '../custpledge/mortgage-info.vue';
import pledgeRef from '../custpledge/pledge-info.vue';
import ContSourceRef from './ContSource.vue';
import payConditionRef from './../paycondition/paycondition.vue';
import rentConditionRef from './../rentcondition/rentcondition.vue';
import penaltyRuleDeRef from './../pentaltyrulede/pentaltyrulede.vue';
import projectAccountRef from './../projectinfo/project-account.vue';
import taxMessageAlterRef from '../contractinfo/tax_message_alter.vue';
//引入起租条件 模板
import impRentConditionRef from './rentConditionVM/rent-condition-select.vue';
import RiskControlRef from '../projectAnalysis/riskAndControl.vue';
import ProjectSummarizeRef from '../projectAnalysis/projectSummarize.vue';

export default {
   components: {
    'busirenttingRef':busirenttingRef,
    'OrginfoRef':OrginfoRef,
    'insuranceRef': insuranceRef,
    'busirelevantPartyRef':busirelevantPartyRef,
    'bothlesseeRef':bothlesseeRef,
    'custpledgeRef':custpledgeRef,
    'mortgageRef':mortgageRef,
    'pledgeRef':pledgeRef,
    'contProviderRef':contProviderRef,
    'ContSourceRef': ContSourceRef,
    'payConditionRef' : payConditionRef,
    'rentConditionRef' : rentConditionRef,
    'penaltyRuleDeRef':penaltyRuleDeRef,
    'projectAccountRef':projectAccountRef,
    'taxMessageAlterRef':taxMessageAlterRef,
    'impRentConditionRef': impRentConditionRef,
    'RiskControlRef' : RiskControlRef,
    'ProjectSummarizeRef' : ProjectSummarizeRef
  },
  data() {
      let oThis = this;
    let validator = function(rule, value, callback) {};
    //校验
    let validatePrj = function(rule, value, callback) {
      debugger;
      if (rule.field === 'is_insure') {
        if (value === 'N') {
          oThis.$message({
            message: '是否投保选择否，不能保存！',
            type: 'error'
          });
          callback(new Error(' '));
        } else {
          callback();
        }
      }
    };  
    return {
      Leasehold:'',
      scrollDom: document.getElementsByClassName("view")[0],
      pk_project: '',
      pledgeType:'type0',
      pk_customer:'',
      //是否有共同承租人
      is_lessee_type:'',
      beanMap:{pk_customer:{}},
      rentConditionList:[],
      delDialogVisible: false,
      //租赁方式   租赁方式为直租显示; 其他时该部分不存在
      lease_type : '',
      selDialogVisible: false,
      ifShow: false,

      isSublease:true, //是否转租赁
      rentConditionData:{
        rules:{
          
        }
      },
      
      delId: '',

      rentConditionFun($node){
           var $table = $node.find("el-table");
            $table.attr(':show-header','true');
            var operateArr = [      
              {
                title: "删除",
                icon: "delete"
              },
            ];
            var operateHtml = this.getTableOperateHtml(operateArr);
            $table.append(operateHtml);
            return $node[0].outerHTML;
      },
      //项目编辑
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.projectEdit = !oThis.projectEdit;
          }
        }
      ],

        creditIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.creditEdit = !oThis.creditEdit;
          }
        }
      ],

      funnode: "BT008",
      nexusKey: "projectinfoUI",
      projectData: {
        project: {},
        rules: {
          is_insure: [{ validator: validatePrj, trigger: "blur" }],
          pk_customer: [{required:true, message: "承租人不能为空", trigger: "blur" }
          ]
        }
      },
      creditData :{

      },
      projectEdit: false,
      creditEdit:false,
      //租赁物图标
      rentTingIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_project===""){
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

            // var uitemplateComp = oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp;
            // var table = uitemplateComp.$refs["proRentThing_t_ref"];
            // table.closeExpandRow();
            // uitemplateComp.formShow = true;
            // //初始化值
            // oThis.$refs.busirenttingRef.$refs.busirenttingRef.setData("proRentThing", {
            //   // mobile:'13'
            // });
            // oThis.rmoveindex = "";
            // uitemplateComp.$refs["proRentThing_ref"].resetFields();
          }
        }
      ],
        //承租人标签
      bothlesseeIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
             oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.resetFormData();
            if(oThis.beanMap.pk_customer_ref||oThis.beanMap.pk_customer_ref!==undefined){
              oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.setData("projectBothLessee", {
                pk_customer:oThis.pk_customer,
                beanMap:oThis.beanMap,
                customer_code:oThis.beanMap.pk_customer_ref[oThis.pk_customer].refcode,
                legal_person_name:oThis.beanMap.pk_customer_ref[oThis.pk_customer].legal_person_name,
                fax:oThis.beanMap.pk_customer_ref[oThis.pk_customer].fax,
                email:oThis.beanMap.pk_customer_ref[oThis.pk_customer].email,
                realworkmail:oThis.beanMap.pk_customer_ref[oThis.pk_customer].realworkmail,
                realworkplace:oThis.beanMap.pk_customer_ref[oThis.pk_customer].realworkplace,
                client_rating:'',
                pk_account_lessee:'',
                account_bank_l:'',
                bank_no_l:'',
                bank_code_l:'',
                pk_account:'',
                account_bank:'',
                bank_no:'',
                bank_code:'',
                lessee_type:'MAIN',
              });
            }
            // 显示新增区域
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.formShow = true;
            oThis.$nextTick(() => {
            if(oThis.pk_customer!==null)  {
              // oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.$refs.pk_account_lessee_ref.changeQueryParams({"pk_customer":oThis.pk_customer});
              oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.setData('pk_account_lessee_ref',{"pk_customer":oThis.pk_customer});
             }
            });
          }
        }
      ],
       //出租人标签
      OrginfoIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.formShow = true;

          }
        }
      ],
       //供应商标签
      contProviderIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_project === "") {
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
          }
        }
      ],
     //担保信息
      pledgeIcons: [
        {
          icon: 'plus',
          click() {
            if(oThis.pk_project ===''){
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
      insuranceIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_project===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
          }
        }
      ],
      //相关方图标
      relevantPartyIcons:[
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_project===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.formShow = true;
          }
        }
      ],
            //来源信息图标
      contSourceIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }

            oThis.$refs.ContSourceRef.$refs.ContSourceRef.comp.getTableComp().closeExpandRow();
            
            //重置新增数据
            oThis.$refs.ContSourceRef.$refs.ContSourceRef.comp.resetFormData();

            //显示新增区域
            oThis.$refs.ContSourceRef.$refs.ContSourceRef.comp.formShow = true;
          }
        }
      ],

      //付款条件图标
      payConditionIcons:[
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_project===""){
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

          }
        }
      ],

       //起租条件图标
      rentConditionIcons:[
        {
          title:"新增",
          icon: "plus",
          click: function() {
           oThis.selDialogVisible = true;
          //  oThis.impRentConditionRef.refreshPage();
           }
        },
      ],

      //逾期利率信息
       penaltyRuleDeIcons:[
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_project===""){
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
      
      //收付各方信息
       projectAccountIcons:[
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_project===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.formShow = true;

          }
        }
      ],

      //开票方案
      taxMessageAlterIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_project === "") {
              oThis.$message({
                messsage: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.getTableComp().closeExpandRow();

            //重置新增数据
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.resetFormData();

            //显示新增区域
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.formShow = true;
          }
        }
      ],

        //风险及控制措施标签
      RiskIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.RiskControlRef.$refs.RiskControlRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.RiskControlRef.$refs.RiskControlRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.RiskControlRef.$refs.RiskControlRef.comp.formShow = true;

          }  
        }
      ],

      
        //项目总结标签
      SummarizeIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.ProjectSummarizeRef.$refs.ProjectSummarizeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ProjectSummarizeRef.$refs.ProjectSummarizeRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.ProjectSummarizeRef.$refs.ProjectSummarizeRef.comp.formShow = true;

          }  
        }
      ],



    };
  },
  created() {
    this.request();
  },
  methods: {

    isSubleaseFun(lt) {
    
      if(lt=='SUBLEASE'){
        this.isSublease =true;
      }
      return this.isSublease;
    },
    /**
       *   单个地点详情
       **/
    request() {
      this.pk_project = this.$root.$router.currentRoute.params.id;
      debugger;
      this.lease_type = this.$root.$router.currentRoute.params.lease;
      this.result = this.isSubleaseFun(this.lease_type);
      //请求基本信息详情
      if(this.pk_project===undefined){
        this.pk_project="";
        this.projectEdit=true;
        return;
      }
     if(this.pk_project){
        this.requestprjBaseInfo();
        //请求起租条件
        this.loadRentCondition();
      }
    },

    isShowOrNot(){
        debugger;
      if(this.lease_type == 'LEASEDIRECT'){
         this.ifShow  = true;
      }
    },
     closeAddFormEev(){ //关闭担保添加表单事件
       this.$refs.mortgageRef.closeAddForm();
       this.$refs.pledgeRef.closeAddForm();
       this.$refs.custpledgeRef.closeAddForm();
   },
     //回退到客户基本信息页面
    goBack(){
        this.$emit('change-corp-card', 'toapplycustomerlist');
    },
    //请求客户基本信息详情
    requestprjBaseInfo() {
      debugger;
      this.$http({
         url: "/yls-busi-web/prj/getbyid" ,
         headers: {'Content-Type': 'application/json'},  
         method: "post",
         data:this.pk_project
      })
        .then(res => {
          debugger;
          if (res.data.success === true) {
            var originalValue = res.data.data;
            if(this.result){
              debugger;
                 this.$refs.creditTemplateRef.setData("projectCredit",JSON.parse(JSON.stringify(originalValue)));
            }else{
                 this.$refs.baseTemplateRef.setData("project",JSON.parse(JSON.stringify(originalValue)));
            }
           
            // this.lease_type = originalValue.lease_type;
            // this.isShowOrNot();
            // //初始化承租人信息
            // this.pk_customer=originalValue.pk_customer;
            // //初始化是否有共同承租人
            // this.is_lessee_type=originalValue.if_co_lessee;
            // this.beanMap.pk_customer_ref=originalValue.beanMap.pk_customer_ref;
            // this.Leasehold=res.data.data.lease_type;
          } else {
            this.pk_project='';
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
    },
    projectCancel() {
      this.projectEdit = false;
      // 重置value
    },
    creditCancel() {
      this.creditEdit = false;
      // 重置value
    },

    // 整理date格式
    formatDate(time) {
      var date = new Date(time);
      return date.getFullYear() + '-' + ((date.getMonth()) >= 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())) + ' ' + (date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds()));
    },
     // 整理date格式yyyy-mm-dd
    formatDateyyyymmdd(time) {
      var date = new Date(time);
      return date.getFullYear() + '-' + ((date.getMonth()) >= 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate()));
    },
    projectConfirm() {
      debugger;
      var url;
      var data = this.$refs.baseTemplateRef.comp.project;
      if(data.plan_release_date&&data.plan_release_date!==undefined){
        data.plan_release_date=this.formatDateyyyymmdd(data.plan_release_date);
      }
      var baseUrl = '/yls-busi-web/';
      if(this.pk_project){
         url = baseUrl+'prj/update';
      }else{
        url = baseUrl+'prj/create';
      }
      this.$refs.baseTemplateRef.comp.$refs["project-form"].validate(valid => {
        if (valid) {
          this.$http({
            url: url,
            headers: {'Content-Type': 'application/json'},
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
                this.Leasehold=res.data.data.lease_type;
                console.log(this.$refs.baseTemplateRef);
                this.$refs.baseTemplateRef.setData(
                  "project",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                //初始化承租人信息
                this.pk_customer=this.originalValue.pk_customer;
                //初始化是否有共同承租人
                this.is_lessee_type=this.originalValue.if_co_lessee;
                this.pk_project=this.originalValue.pk_project;
                this.projectEdit = false;
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
    },

    creditConfirm() {
      debugger;
      var url;
      var data = this.$refs.creditTemplateRef.comp.projectCredit;
      if(data.plan_release_date&&data.plan_release_date!==undefined){
        data.plan_release_date=this.formatDateyyyymmdd(data.plan_release_date);
      }
      var baseUrl = '/yls-busi-web/';
      if(this.pk_project){
         url = baseUrl+'prj/update';
      }else{
        url = baseUrl+'prj/create';
      }
      debugger;
      this.$refs.creditTemplateRef.comp.$refs["projectCredit_ref"].validate(valid => {
        if (valid) {
          debugger;
          this.$http({
            url: url,
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: JSON.parse(JSON.stringify(data))  
          })
            .then(res => {
              debugger;
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.originalValue = res.data.data;
                this.Leasehold=res.data.data.lease_type;
                console.log(this.$refs.baseTemplateRef);
                this.$refs.baseTemplateRef.setData(
                  "project",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                //初始化承租人信息
                this.pk_customer=this.originalValue.pk_customer;
                //初始化是否有共同承租人
                this.is_lessee_type=this.originalValue.if_co_lessee;
                this.pk_project=this.originalValue.pk_project;
                this.projectEdit = false;
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
    },

    selConfirmClick(){
          debugger;
            var tableSelections = this.$refs.impRentConditionRef.$refs.rentDialogRef.getTableComp().getSelection();
            if (tableSelections && tableSelections.length > 0) {
              debugger;
              var pks = [];
                tableSelections.forEach((item,index) => {
                     pks[index]=item.pk_prj_rent_condition;
                });
               var data ={
                   strArray:pks,
                   pk:this.pk_project
                }
                this.$http({
                    url: "/yls-busi-web/contr/rentCondition/addRentConditions",
                    headers: { 'Content-Type': 'application/json' },
                    method: "post",
                    dataType: "json",
                    data: data
                }).then(res => {
                  
                if (res.data.success === true) {
                  var originalValue = res.data.data;
                    this.$refs["RentConditionRef"].setData("RentCondition_t",
                     JSON.parse(JSON.stringify(originalValue))
                    );
                    debugger;
                   this.loadRentCondition();
                   this.selDialogVisible=false;
                   this.$message({
                        message: "设置起租条件成功",
                        type: "success"
                  });
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error"
                    });
                }
                }).catch((e) => {
                    this.$message({
                    message: "信息提交失败！",
                    type: "error"
                });
                });
            }else{
                this.$message({
                    message: "请选择起租条件！",
                    type: "error"
                });
            }

      },

       //加载起租信息
      loadRentCondition(){
        var data  ={
            pageNum: 0,
            pageSize: 0,
            searchParams: {
              searchMap: {
                  custCondList : [
              {
              'key': 'source_bill',
              'oper': '=',
              'value': this.pk_project
             },
            ]
              }
          }
        };

        this.$http({
            url: "/yls-busi-web/contr/rentCondition/page" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:data
        }).then(res => {
          
            var originalValue = res.data.data.content;
            var jsonObj = JSON.parse(JSON.stringify(originalValue));
            this.$refs["RentConditionRef"].setData("RentCondition_t",
              jsonObj
            );
            debugger;
            if(jsonObj){
              debugger;
              for(var i=0;i<jsonObj.length;i++){
                 this.rentConditionList[i]=jsonObj[i].pk_parent_rent;
              }
            }
           
        }).catch(e => {
          this.$message({
            message: "起租条件失败",
            type: "error"
          });
        });
      },

      rentDeleteTableRow(scope){
        this.delDialogVisible = true;
        this.delId = scope.row.pk_prj_rent_condition;
      },

       //起租条件确认删除
      deleteConfirmClick(){
      debugger;
      this.delDialogVisible=false;
      var baseUrl = '/yls-busi-web/';
      var url = baseUrl+'contr/rentCondition/deleteById';

      this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.request();
            this.loadRentCondition();
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
  }
};
</script>
<style>
  .pledge_header .el-tabs__header{
    display: none;
  }
</style>

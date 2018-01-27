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
        <!--承租人信息-->
         <ifbp-panel id="bothlesseeRef" title="承租人信息" :icons="bothlesseeIcons">
          <bothlesseeRef
            ref="bothlesseeRef"
            :source_bill="pk_contract"
            :is_lessee_type="is_lessee_type"
            :type="'prj'">
          </bothlesseeRef>
        </ifbp-panel>
         <!--出租人信息-->
         <ifbp-panel id="OrginfoRef" title="出租人信息" :icons="OrginfoIcons">
          <OrginfoRef
            ref="OrginfoRef"
            :source_bill="pk_contract"
            :type="'prj'">
          </OrginfoRef>
        </ifbp-panel>
         <!--供应商信息-->
         <ifbp-panel id="contProviderRef" title="供应商信息" :icons="contProviderIcons">
          <contProviderRef
            ref="contProviderRef"
            :source_bill="pk_contract"
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
         <ifbp-panel id="busirenttingRef" title="租赁物" :icons="rentTingIcons">
          <busirenttingRef
            ref="busirenttingRef"
            :pk_prjId="pk_contract"
            :type="'prj'">
          </busirenttingRef>
        </ifbp-panel>
        <!--保险信息-->
         <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>
          <insuranceRef
            ref='insuranceRef'
            :source_bill='pk_contract'
            :type="'prj'">
          </insuranceRef>
        </ifbp-panel>
        <!--合同相关方信息-->
        <ifbp-panel id="busirelevantPartyRef" title="合同相关方" :icons="relevantPartyIcons">
          <busirelevantPartyRef
            ref="busirelevantPartyRef"
            :pk_prjId="pk_contract"
            :type="'prj'">
          </busirelevantPartyRef>
        </ifbp-panel>
         <!--付款条件-->
        <ifbp-panel id="payConditionRef" title="付款条件" :icons="payConditionIcons">
          <payConditionRef
            ref="payConditionRef"
            :pk_prjId="pk_contract"
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
            :pk_prjId="pk_contract"
            :type="'prj'">
          </penaltyRuleDeRef>
        </ifbp-panel>
         <!--收付各方-->
        <ifbp-panel id="projectAccountRef" title="收付各方" :icons="projectAccountIcons">
          <projectAccountRef
            ref="projectAccountRef"
            :pk_prjId="pk_contract"
            :type="'prj'">
        </projectAccountRef>
        </ifbp-panel>
        <!--增值税基本信息变更-->
        <ifbp-panel id="taxMessageAlterRef" title="增值税基本信息变更" :icons="taxMessageAlterIcons">
          <taxMessageAlterRef
            ref="taxMessageAlterRef"
            :pk_prjId="pk_contract"
            :type="'prj'">
          </taxMessageAlterRef>
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
import {ylsBusi} from '../../../../../common/js/publicData.js';
import busirenttingRef from './../buni/busi_rentting.vue';
import bothlesseeRef from '../projectinfo/projectBothLesseePanel.vue';
import OrginfoRef from '../projectinfo/projectOrginfoPanel.vue';
import insuranceRef from './../buni/busi_insure.vue';
import busirelevantPartyRef from './../buni/busi-relevantParty.vue';
import contProviderRef from '../projectinfo/ProviderPanel.vue';
import custpledgeRef from '../custpledge/custpledge-info.vue';
import mortgageRef from '../custpledge/mortgage-info.vue';
import pledgeRef from '../custpledge/pledge-info.vue';
import payConditionRef from '../paycondition/paycondition.vue';
import rentConditionRef from '../rentcondition/rentcondition.vue';
import penaltyRuleDeRef from '../pentaltyrulede/pentaltyrulede.vue';
import projectAccountRef from '../projectinfo/project-account.vue';
import taxMessageAlterRef from './tax_message_alter.vue';
//引入起租条件 模板
import impRentConditionRef from '../projectinfo/rentConditionVM/rent-condition-select.vue';

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
    'payConditionRef' : payConditionRef,
    'rentConditionRef' : rentConditionRef,
    'penaltyRuleDeRef':penaltyRuleDeRef,
    'projectAccountRef':projectAccountRef,
    'taxMessageAlterRef':taxMessageAlterRef,
    'impRentConditionRef': impRentConditionRef
  },
  data() {
    var oThis = this;
    return {
      delDialogVisible:false,
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //合同主键
      pk_contract:"",
      //是否有共同承租人
      is_lessee_type:'',
      pledgeType:'type0',
      // 放款申请主模板 baseTemplateRef start
      funnode: "BT009",
      nexusKey: "contract",
      tplData:{},
      editable:false,
      //担保参数
      guarantee:"guarantee1",
      //存放目前已经选择的起租条件的主键
      rentConditionList:[],
      
      delDialogVisible: false,

      selDialogVisible: false,

      rentConditionData :{},

      radioShow:true,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
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
        //承租人标签
      bothlesseeIcons: [
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
             oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.formShow = true;
          }
        }
      ],
       //承租人标签
      OrginfoIcons: [
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
      insuranceIcons: [
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
            if(oThis.pk_contract===""){
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
       //付款条件图标
      payConditionIcons:[
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
           }
        },
      ],

      //逾期利率信息
       penaltyRuleDeIcons:[
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
      
      //收付各方信息
       projectAccountIcons:[
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
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.formShow = true;

          }
        }
      ],

      //增值税基本信息变更
      taxMessageAlterIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                messsage: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.getTableComp().closeExpandRow();

            //重置新增数据
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.resetFormData();

            //显示新增区域
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.formShow = true;
          }
        }
      ],

    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //担保信息 关闭添加页签
    closeAddFormEev(){
       this.$refs.mortgageRef.closeAddForm();
       this.$refs.pledgeRef.closeAddForm();
       this.$refs.custpledgeRef.closeAddForm();
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
        if(this.pk_project){
           url = ylsBusi+'contr/contractinfo/update';
        }else{
           url = ylsBusi+'contr/contractinfo/create';
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

    
      //加载数据方法
      loadData(){
        this.pk_contract = this.$root.$router.currentRoute.params.id;
        if(this.pk_contract==undefined)
          this.pk_contract="";
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if(this.pk_contract && this.pk_contract != ""){
          //加载合同信息
          this.loadcontractinfo(this.pk_contract);
           //请求起租条件
          this.loadRentCondition();
        }else{
          this.editable = true;
        }
      },
      //加载合同信息
      loadcontractinfo(pk_contract){
        this.$http({
            url: "/yls-busi-web/contr/contractinfo/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:this.pk_contract
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
      
      //弹出界面选择确认
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
                   pk:this.pk_contract
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
        debugger;
        var data  ={
            pageNum: 0,
            pageSize: 0,
            searchParams: {
              searchMap: {
                  custCondList : [
              {
              'key': 'source_bill',
              'oper': '=',
              'value': this.pk_contract
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
          debugger;
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

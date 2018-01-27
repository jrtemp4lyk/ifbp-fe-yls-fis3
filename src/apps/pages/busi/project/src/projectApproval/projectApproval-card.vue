<template>
  <div class='main-panel'>
    <!--节点title-->
    <div class='title-container'>
      <h2 class='name'>立项申请维护</h2>
    </div>
    <!-- 主体区域(详情页结构) -->
    <div class='detail-main-container clearfix'>
      <ifbp-panel-group :navbar='true' :base-scroll-top='50' :scroll-dom='scrollDom' :base-nav-bar-top='125'>
        <!--立项信息-->
        <ifbp-panel id='basePanel' title = '立项信息' :icons='baseIcons'>
          <ifbp-template ref='baseTemplateRef'
                    tplId='baseTemplate'
                    :funnode='funnode'
                    :nexuskey='nexuskey'
                    show-type='form'
                    :tplData='tplData'
                    :editable='baseEdit'>
          </ifbp-template>
          <div class='form-button-div' v-if='baseEdit'>
            <el-button type='default' class='button-no-radius' @click='baseCancel'>取消</el-button>
            <el-button type='primary' class='button-no-radius' @click='baseConfirm'>保存</el-button>
          </div>
        </ifbp-panel>
        <!--承租人基本信息-->
        <ifbp-panel id='lesseePanel' title = '承租人基本信息' :icons='lesseeIcons'>
          <ifbp-template ref='lesseeTemplateRef'
                    tplId='lesseeTemplate'
                    :funnode='lesseeFunnode'
                    :nexuskey='lesseeNexuskey'
                    show-type='form'
                    :tplData='lesseeTplData'
                    :editable='lesseeEdit'>
          </ifbp-template>
          <div class='form-button-div' v-if='lesseeEdit'>
            <el-button type='default' class='button-no-radius' @click='lesseeCancel'>取消</el-button>
            <el-button type='primary' class='button-no-radius' @click='lesseeConfirm'>保存</el-button>
          </div>
        </ifbp-panel>
        <!--供应商信息-->
        <ifbp-panel id='contProviderRef' title='供应商信息' :icons='contProviderIcons' v-if='providerVisible'>
          <contProviderRef
            ref='contProviderRef'
            :source_bill='pk_prj_approval'
            :type="'prjApproval'">
          </contProviderRef>
        </ifbp-panel>
        <!--租赁物信息-->
        <ifbp-panel id='busirenttingRef' title='租赁物情况' :icons='rentTingIcons'>
          <busirenttingRef
            ref='busirenttingRef'
            :pk_prjId='pk_prj_approval'
            :Leasehold='lease_type'
            :type="'prjApproval'">
          </busirenttingRef>
        </ifbp-panel>
        <!--保险信息-->
        <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>
          <insuranceRef
            ref='insuranceRef'
            :source_bill='pk_prj_approval'
            :type="'prjApproval'">
          </insuranceRef>
        </ifbp-panel>
        <!--特殊事项-->
        <ifbp-panel id='matterPanel' title = '特殊事项' :icons='matterIcons'>
          <ifbp-template ref='matterTemplateRef'
                    tplId='matterTemplate'
                    :funnode='matterFunnode'
                    :nexuskey='matterNexuskey'
                    show-type='form'
                    :tplData='matterTplData'
                    :editable='matterEdit'>
          </ifbp-template>
          <div class='form-button-div' v-if='matterEdit'>
            <el-button type='default' class='button-no-radius' @click='matterCancel'>取消</el-button>
            <el-button type='primary' class='button-no-radius' @click='matterConfirm'>保存</el-button>
          </div>
        </ifbp-panel>
        <!--项目推进计划-->
        <ifbp-panel id='prjPromotPlanRef' title='项目推进计划' :icons='prjPromotPlanIcons'>
          <prjPromotPlanRef
            ref='prjPromotPlanRef'
            :source_bill='pk_prj_approval'
          >
          </prjPromotPlanRef>
        </ifbp-panel>
        <!--项目分析-->
        <ifbp-panel id='analysisPanel' title = '项目分析' :icons='analysisIcons'>
          <ifbp-template ref='analysisTemplateRef'
                    tplId='analysisTemplate'
                    :funnode='analysisFunnode'
                    :nexuskey='analysisNexuskey'
                    show-type='form'
                    :tplData='analysisTplData'
                    :editable='analysisEdit'>
          </ifbp-template>
          <div class='form-button-div' v-if='analysisEdit'>
            <el-button type='default' class='button-no-radius' @click='analysisCancel'>取消</el-button>
            <el-button type='primary' class='button-no-radius' @click='analysisConfirm'>保存</el-button>
          </div>
        </ifbp-panel>
        <!--项目操作流程-->
        <ifbp-panel id='processPanel' title = '项目操作流程'>
          <ifbp-template ref='processTemplateRef'
                    tplId='processTemplate'
                    :funnode='processFunnode'
                    :nexuskey='processNexuskey'
                    show-type='form'>
          </ifbp-template>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';
import contProviderRef from '../projectinfo/ProviderPanel.vue';
import insuranceRef from './../buni/busi_insure.vue';
import busirenttingRef from './../buni/busi_rentting.vue';
import prjPromotPlanRef from './prjPromotPlan.vue';
export default {
  components: {
    'contProviderRef':contProviderRef,
    'insuranceRef': insuranceRef,
    'busirenttingRef':busirenttingRef,
    'prjPromotPlanRef':prjPromotPlanRef
  },
  data() {
    let oThis = this;
    return {
      scrollDom: 'ifbpScrollDom',
      pk_prj_approval:'',
      providerVisible:false,
      lease_type:'',

      //立项信息 start
      funnode:'BT008',
      nexuskey:'',
      baseIcons: [
        {
          icon: 'edit',
          click: function() {
            oThis.baseEdit = !oThis.baseEdit;
          }
        }
      ],
      tplData: {},
      baseEdit: false,
      // resetFun: function($node) {
        // //获取客户名称
        // var $refNode1 = this.getNodeById($node, '7i5uecnmegk');
        // if($refNode1.length) {
        //   $refNode1.attr('v-on:trigger', 'handleRefChange1'); 
        // }

        // //获取出租方账户
        // var $refNode2 = this.getNodeById($node, 'aljyrih6b4o');
        // if($refNode2.length) {
        //   $refNode2.attr('v-on:trigger', 'handleRefChange2'); 
        // }  
      // },
      // t_Methods: {
        /*给客户编号、控股股东、成立时间、注册资本、法人代表、
          客户性质、是否存在关联方交易、主营业务赋值，给出租方账户传参*/
        // handleRefChange1: function(type, data) {
        //   debugger;
        //   if(type === 'change') {
        //     this.$refs['projectApproval_form'].model.customer_code = data.value[0].refcode;
        //     this.$refs['projectApproval_form'].model.controlling_shareholder = data.value[0].controlshareholder;
        //     this.$refs['projectApproval_form'].model.establish_date = data.value[0].establish_date;
        //     this.$refs['projectApproval_form'].model.capital = data.value[0].capital;
        //     this.$refs['projectApproval_form'].model.legal_person = data.value[0].legal_person_name;
        //     this.$refs['projectApproval_form'].model.customer_property = data.value[0].customer_property;
        //     this.$refs['projectApproval_form'].model.link_trade = data.value[0].link_trade;
        //     this.$refs['projectApproval_form'].model.primary_business = data.value[0].primary_business;
            
        //     let refParams={'key':data.value[0].id};
        //     oThis.$refs.baseTemplateRef.setData('lessor_account_param', refParams);
        //   }
        // },
        // //给出租方账号、开户行赋值
        // handleRefChange2: function(type, data) {
        //   debugger;
        //   if(type === 'change') {
        //     this.$refs['projectApproval_form'].model.lessor_account_num = data.value[0].refcode;
        //     this.$refs['projectApproval_form'].model.deposit_bank = data.value[0].bank_no;
        //   }
        // }
      // },
      //立项信息 end

      //承租人基本信息 start
      lesseeFunnode:'BT003',
      lesseeNexuskey:'',
      lesseeIcons: [
        {
          icon: 'edit',
          click: function() {
            let pk_customer = oThis.$refs.baseTemplateRef.comp.projectApproval.pk_customer;
            if(pk_customer === '' || pk_customer === null) {
              oThis.$message({
                message: '该立项信息没有设置承租人信息，不允许编辑！',
                type: 'error'
              });
              return;
            }
            oThis.lesseeEdit = !oThis.lesseeEdit;
          }
        }
      ],
      lesseeTplData: {},
      lesseeEdit: false,
      formDataObj: '',
      //承租人基本信息 end

      //供应商标签
      contProviderIcons: [
        {
          icon: 'plus',
          click: function() {
            if (oThis.pk_prj_approval === '') {
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
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
      //保险信息标签
      insuranceIcons: [
        {
          icon: 'plus',
          click: function() {
            if(oThis.pk_prj_approval===''){
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
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

      //租赁物标签
      rentTingIcons: [
        {
          icon: 'plus',
          click: function() {
            if(oThis.pk_prj_approval===''){
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
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

      //特殊事项 start
      matterFunnode:'BT008',
      matterNexuskey:'specialMatter_prjApproval',
      matterIcons: [
        {
          icon: 'edit',
          click: function() {
            if(this.pk_prj_approval === '' || this.pk_prj_approval === null) {
              return;
            }
            oThis.matterEdit = !oThis.matterEdit;
          }
        }
      ],
      matterTplData: {},
      matterEdit: false,
      //特殊事项 end

      //项目推进计划标签
      prjPromotPlanIcons: [
        {
          icon: 'plus',
          click: function() {
            if(oThis.pk_prj_approval===''){
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
              });
              return;
            }
            oThis.$refs.prjPromotPlanRef.$refs.prjPromotPlanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.prjPromotPlanRef.$refs.prjPromotPlanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.prjPromotPlanRef.$refs.prjPromotPlanRef.comp.formShow = true;
          }
        }
      ],

      //项目分析 start
      analysisFunnode:'BT008',
      analysisNexuskey:'prjAnalysis-prjApproval',
      analysisIcons: [
        {
          icon: 'edit',
          click: function() {
            if(this.pk_prj_approval === '' || this.pk_prj_approval === null) {
              return;
            }
            oThis.analysisEdit = !oThis.analysisEdit;
          }
        }
      ],
      analysisTplData: {},
      analysisEdit: false,
      //项目分析 end

      //项目操作流程 start
      processFunnode:'BT008',
      processNexuskey:'prj_process_procedure',
      //项目操作流程 end

    };
  },
  //获取数据数据初始化操作
  created() {
    this.pk_prj_approval = this.$root.$router.currentRoute.params.id;
  },
  //页面操作
  mounted() {
    this.request();
  },
  methods: {
    request() {
      //请求基本信息详情
      if(this.pk_prj_approval===undefined){
        this.pk_prj_approval='';
        this.baseEdit=true;
        return;
      }
      this.$http({
        url: ylsBusi + 'prj/approval/getById',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: this.pk_prj_approval
      }).then(res => {
        let originalValue = res.data.data;
        this.lease_type = originalValue.lease_type;
        this.providerVisible = originalValue.lease_type === 'LEASEDIRECT'? true:false;
        this.nexuskey = originalValue.lease_type === 'SUBLEASE'? 'prjApprovalDetail_person':'prjApprovalDetail_corp';
        this.$refs.baseTemplateRef.setData(
          'projectApproval',
          JSON.parse(JSON.stringify(originalValue))
        );
        this.$refs.processTemplateRef.setData(
          'projectApproval',
          JSON.parse(JSON.stringify(originalValue))
        );

        //根据返回结果中的客户主键，获取承租人基本信息
        if(originalValue.pk_customer != null && originalValue.pk_customer != '') {
          let url;
          if(originalValue.customer_type == 'CORP') {
            this.lesseeNexuskey = 'prjApproval_lessee_corp';
            url = ylsBusi + 'cust/corp/getByPkCustomer';
            this.formDataObj = 'CustCorp';
          }
          else {
            this.lesseeNexuskey = 'prjApproval_lessee_person';
            url = ylsBusi + 'cust/CustPerson/getByPkCustomer';
            this.formDataObj = 'CustPerson';
          }
          this.$http({
            url: url,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: originalValue.pk_customer
          }).then(res => {
            this.$refs.lesseeTemplateRef.setData(
              this.formDataObj,
              JSON.parse(JSON.stringify(res.data.data))
            );
          }).catch(e => {
            this.$message({
              message: '承租人基本信息获取失败',
              type: 'error'
            });
          });
        }
        //end

      }).catch(e => {
        this.$message({
          message: '详情获取失败',
          type: 'error'
        });
      });

      //请求特殊事项
      if(this.pk_prj_approval) {
        this.$http({
          url: ylsBusi + 'prj/specialMatter/getByPkPrjApproval',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_prj_approval
        }).then(res => {
          let originalValue = res.data.data;
          this.$refs.matterTemplateRef.setData(
            'SpecialMatterEntity',
            JSON.parse(JSON.stringify(originalValue))
          );
        }).catch(e => {
          this.$message({
            message: '特殊事项获取失败',
            type: 'error'
          });
        });
      }

      //请求项目分析
      if(this.pk_prj_approval) {
        this.$http({
          url: ylsBusi + 'prj/analysis/getByPkPrjApproval',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_prj_approval
        }).then(res => {
          let originalValue = res.data.data;
          this.$refs.analysisTemplateRef.setData(
            'PrjAnalysis',
            JSON.parse(JSON.stringify(originalValue))
          );
        }).catch(e => {
          this.$message({
            message: '项目分析获取失败',
            type: 'error'
          });
        });
      }
    },

    //立项信息 start
    baseCancel() {
      this.baseEdit = false;
    },
    //基本信息保存
    baseConfirm() {
      let data = this.$refs.baseTemplateRef.comp.projectApproval;
      //表单formRef  表格tableRef
      this.$refs.baseTemplateRef.validate(valid => {
        if (valid) {
          this.$http({
            url: ylsBusi + 'prj/approval/updateOrCreate',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          }).then(res => {
            if (res.data.success === true) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              let originalValue = res.data.data;
              this.$refs.baseTemplateRef.setData(
                'projectApproval',
                JSON.parse(JSON.stringify(originalValue))
              ); 
              this.baseEdit = false;
              this.pk_prj_approval = originalValue.pk_prj_approval;
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '更新失败',
              type: 'error'
            });
          });
        }
      });
    },
    //立项信息 end

    //承租人基本信息 start
    lesseeCancel() {
      this.lesseeEdit = false;
    },
    //基本信息保存
    lesseeConfirm() {
      let tmp = this.formDataObj;
      let data = this.$refs.lesseeTemplateRef.comp.tmp;

      //表单formRef  表格tableRef
      this.$refs.lesseeTemplateRef.validate(valid => {
        if (valid) {
          let url;
          if(tmp === 'CustCorp') {
            url = ylsBusi + 'cust/corp/update';
          }
          else {
            url = ylsBusi + 'cust/CustPerson/update';
          }
          this.$http({
            url: url,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          }).then(res => {
            if (res.data.success === true) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              let originalValue = res.data.data;
              this.$refs.lesseeTemplateRef.setData(
                this.formDataObj,
                JSON.parse(JSON.stringify(originalValue))
              );
              this.lesseeEdit = false;
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '更新失败',
              type: 'error'
            });
          });
        }
      });
    },
    //承租人基本信息 end

    //特殊事项 start
    matterCancel() {
      this.matterEdit = false;
    },
    //基本信息保存
    matterConfirm() {
      let data = this.$refs.matterTemplateRef.comp.SpecialMatterEntity;
      data.pk_prj_approval = this.pk_prj_approval;

      //表单formRef  表格tableRef
      this.$refs.matterTemplateRef.validate(valid => {
        if (valid) {
          this.$http({
            url: ylsBusi + 'prj/specialMatter/updateOrCreate',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          }).then(res => {
            if (res.data.success === true) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              let originalValue = res.data.data;
              this.$refs.matterTemplateRef.setData(
                'SpecialMatterEntity',
                JSON.parse(JSON.stringify(originalValue))
              );
              this.matterEdit = false;
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '更新失败',
              type: 'error'
            });
          });
        }
      });
    },
    //特殊事项 end

    //项目分析 start
    analysisCancel() {
      this.analysisEdit = false;
    },
    //基本信息保存
    analysisConfirm() {
      let data = this.$refs.analysisTemplateRef.comp.PrjAnalysis;
      data.pk_prj_approval = this.pk_prj_approval;

      //表单formRef  表格tableRef
      this.$refs.analysisTemplateRef.validate(valid => {
        if (valid) {
          this.$http({
            url: ylsBusi + 'prj/analysis/updateOrCreate',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          }).then(res => {
            if (res.data.success === true) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
              let originalValue = res.data.data;
              this.$refs.analysisTemplateRef.setData(
                'PrjAnalysis',
                JSON.parse(JSON.stringify(originalValue))
              );
              this.analysisEdit = false;
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '更新失败',
              type: 'error'
            });
          });
        }
      });
    }
    //项目分析 end

  }
};
</script>
<style>

</style>

<template>
    <div class="main-panel">
        <div class="title-container">
            <h2 class="name">授信审批详情页</h2>
        </div>
        <div class="detail-main-container clearfix">
            <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125" >
                <div class="detail-button-header">
                    <el-button class="fr" type="primary" @click="creditApprovalCancel" >返回</el-button>
                    <el-button class="fr" type="primary" @click="creditApprovalConfirm" style="margin-right:10px">保存</el-button>
                </div>
                <!-- 项目授信信息-->
                <ifbp-panel id="basePanel" title="项目授信信息" :icons="projectCreditPlusIcons">
                    <ifbp-template ref="projectCreditRef"
                                tplId="projectCredit"
                                :funnode="projectCreditFunnode"
                                :nexuskey="projectCreditNexusKey"
                                :tplData="projectCreditData"
                                show-type="form"
                                :tplResetFun="projectCreditResetFun"
                                :methods="ref_methods"
                                :editable="projectCreditEditable">
                    </ifbp-template>
                    <div class="form-button-div" v-if="projectCreditEditable">
                        <el-button type="default" class="button-no-radius" @click="pojectCreditClickCancel">取消</el-button>
                        <el-button type="primary" class="button-no-radius" @click="pojectCreditClickSave">保存</el-button>
                    </div>
                </ifbp-panel>
                <!-- 承租人资信评价 -->
                <ifbp-panel id="basePanel" title="承租人资信评价">
                    <lesseeCreditEvaluationRef ref="lesseeCreditEvaluationRef"
                                :pk_project_credit="pk_project_credit">
                    </lesseeCreditEvaluationRef>
                </ifbp-panel>
            </ifbp-panel-group>
        </div>
    </div>
</template>
<script>
import { ylsBusi } from '../../../../../common/js/publicData.js';
import lesseeCreditEvaluationRef from './lessee_credit_evaluation.vue';
export default {
    components: {
        'lesseeCreditEvaluationRef': lesseeCreditEvaluationRef,
    },
    data() {
        let oThis = this;
        return {
            scrollDom: document.getElementsByClassName('view')[0],
            projectCreditFunnode: 'BT008',
            projectCreditNexusKey: 'project_credit',
            projectCreditEditable: false,
            pk_project_credit: '',
            projectCreditData: {
                rules: {}
            },
            projectCreditPlusIcons: [
                {
                    icon: 'edit',
                    click: function() {
                        oThis.projectCreditEditable = !oThis.projectCreditEditable;
                        //备份，取消时还原
                        oThis.projectCreditCacheData = JSON.parse(JSON.stringify(oThis.$refs.projectCreditRef.getData('projectCredit')));
                    }
                }
            ],
            projectCreditResetFun($node) {
                //银行账户参照
                let lessorAccount = this.getNodeById($node, 'jsx36embp3o');
                if (lessorAccount.length) {
                    lessorAccount.attr('v-on:trigger', 'lessorAccountRefChange');
                }

                //租赁方式下拉框
                let leasingMethod = this.getNodeById($node, '9hqou4du7zg');
                if (leasingMethod.length) {
                    leasingMethod.attr('v-on:change', 'leasingMethodValChange');
                }
                
            },
            ref_methods: {
                //银行账户参照
                lessorAccountRefChange: function(type, data) {
                    if (type === 'change') {
                        let lessorAccount = data.value[0];
                        let projectCredit = this.$refs.projectCredit_ref.model;
                        projectCredit.lessor_account_number = lessorAccount.refcode;
                        projectCredit.lessor_bank = lessorAccount.bank_no;
                        oThis.$refs.projectCreditRef.setData('projectCredit', projectCredit)
                        
                    }
                },
                leasingMethodValChange: function(type, data) {
                    if (type === 'SUBLEASE') {
                        let bLOptions = this.$refs.business_line_ref.options;
                        for (let i in bLOptions) {
                            //业务条线下拉框-当租赁方式为转租赁时，只能选择转租赁业务条线
                            if (bLOptions[i].value == 'RENTING_CAR' || bLOptions[i].value == 'RENTING_MEDICAL' || bLOptions[i].value == 'RENTING_OTHER') {
                                bLOptions[i].disabled = false;
                            } else {
                                bLOptions[i].disabled = true;
                            }
                        }
                    } else {
                        let bLOptions = this.$refs.business_line_ref.options;
                        for (let i in bLOptions) {
                            bLOptions[i].disabled = false;
                        }
                    }
                },

                

            }

        }
    },

    created() {
        this.loadData();
    },

    methods: {

        loadData() {
            this.pk_project_credit = this.$root.$router.currentRoute.params.id;
            if (this.pk_project_credit) {

                //加载项目授信信息
                this.loadProjectCreditData(this.pk_project_credit)
            } else {
                this.pk_project_credit = '';
                this.projectCreditEditable = true;
            }
        },
        loadProjectCreditData(pk_project_credit) {
            this.$http({
                url: ylsBusi + 'projectCredit/getById',
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                data: pk_project_credit
            }).then(res => {
                let result = res.data.data;
                this.$refs.projectCreditRef.setData('projectCredit', result)
            })


        },
        creditApprovalCancel() {
            window.history.back(-1);
        },
        creditApprovalConfirm() {

        },
        pojectCreditClickCancel: function(type) {
            this.projectCreditEditable = false;
            //还原表单数据
            this.$refs.projectCreditRef.setData('projectCredit', this.projectCreditCacheData);
        },
        pojectCreditClickSave() {
            this.$refs.projectCreditRef.comp.$refs['projectCredit_ref'].validate(valid => {
                if (valid) {
                    var data = this.$refs.projectCreditRef.comp.projectCredit;
                    var url;
                    if (this.pk_project_credit) {
                        url = ylsBusi + 'projectCredit/update';
                    } else {
                        url = ylsBusi + 'projectCredit/createProjectCredit';
                    }
                    this.$http({
                        url: url,
                        headers: {'Content-type': 'application/json'},
                        method: 'post',
                        data: data
                    }).then(res => {
                        if (res.data.success === true) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            let result = res.data.data;
                            this.$refs.projectCreditRef.setData('projectCredit', result);
                            this.pk_project_credit = result.pk_project_credit;
                            this.projectCreditEditable = false;
                        } else {
                            this.$message({
                                message: res.data.error.errorMessage,
                                type: 'error'
                            })
                        }
                    }).catch(() => {
                        this.$message({
                            message: '保存或更新失败',
                            type: 'error'
                        })
                    })
                }
            })
        }
        
    }
}
</script>
<style>
.detail-button-header {
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
</style>


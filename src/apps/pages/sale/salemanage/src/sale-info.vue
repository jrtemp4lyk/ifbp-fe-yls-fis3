<template>
    <div class="main-panel">
        <div class="title-container">
            <h2 class="name">营销管理详情页</h2>
        </div>
        <div class="detail-main-container clearfix">
            <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125" >
                <!-- 营销信息-->
                <ifbp-panel id="basePanel" title="营销信息" :icons="saleInfoIcons">
                    <ifbp-template ref="saleInfoRef"
                                tplId="saleInfo"
                                :funnode="saleInfoFunnode"
                                :nexuskey="saleInfoNexusKey"
                                :tplData="saleInfoData"
                                show-type="form"
                                :editable="saleInfoEdit"
                                :tplResetFun="saleInfoResetFun"
                                :methods="ref_Methods"
                                @after-create="queryRefData">
                    </ifbp-template>
                    <div class="form-button-div" v-if="saleInfoEdit">
                        <el-button type="default" class="button-no-radius" @click="saleInfoCancel">取消</el-button>
                        <el-button type="primary" class="button-no-radius" @click="saleInfoConfirm">保存</el-button>
                    </div>
                </ifbp-panel>
                <!-- 项目操作方案 -->
                <ifbp-panel id="basePanel" title="项目操作方案" :icons="projectOperationPlanIcons">
                    <projectOperationPlanRef ref="projectOperationPlanRef"
                                :pk_sale_info="pk_sale_info">
                    </projectOperationPlanRef>
                </ifbp-panel>
                <!-- 工作日志-->
                <ifbp-panel id="basePanel" title="工作日志" :icons="workLogIcons">
                    <workLogRef ref="workLogRef"
                                :pk_sale_info="pk_sale_info"
                                @workLogSizeListener="updateVisitTimes">
                    </workLogRef>
                </ifbp-panel>
            </ifbp-panel-group>
        </div>
    </div>
</template>

<script>
import workLogRef from './work_log.vue';
import projectOperationPlanRef from './project_operation_plan.vue';

export default {
    components: {
        'workLogRef': workLogRef,
        'projectOperationPlanRef': projectOperationPlanRef,
    },
    data() {
        var oThis = this;

        //校验
        let validateCreateCode = function(rule, value, callback) {
            if (rule.field === 'credit_code' && oThis.customerCreditCode != value) {
                let data={'society_credit': value};
                oThis.$http({
                    url: '/yls-busi-web/cust/customer/validateInputSociety',
                    headers: { 'Content-Type': 'application/json' },
                    method: 'post',
                    data: data
                }).then(res => {
                    if(res.data.data){
                        callback(new Error('社会统一信用码已存在'));
                    } else{
                        callback();
                    }
                }).catch(e => {
                    console.error(e);
                });
            } else {
                callback();
            }
        }

        return {
            scrollDom: document.getElementsByClassName('view')[0],
            saleInfoFunnode: 'YLSBT003',
            saleInfoNexusKey: 'sale-manage',
            pk_sale_info: '',
            saleInfoCacheData: '',
            nationalEconomyClassificationRefCache: [],
            districtRefCache: [],
            customerCreditCode: '',
            saleInfoData: {
                b_param:{},
                m_param:{},
                s_param:{},
                p_param:{},
                c_param:{},
                d_param:{},
                rules: {
                    credit_code: [{validator: validateCreateCode, trigger: 'blur'}],
                }
            },
            saleInfoEdit: false,
            saleInfoResetFun($node) {
                //客户参照
                let customerNode = this.getNodeById($node, '1un1k87kbw5');
                if (customerNode.length) {
                    customerNode.attr('v-on:trigger', 'customerRefChange');
                }

                //行业分类参照
                let industryNode = this.getNodeById($node, 'h6iudcgmaqi');
                let industryBNode = this.getNodeById($node, 'hkppgmenust');
                let industryMNode = this.getNodeById($node, 'sshgu35ctbe');
                if (industryNode.length) {
                    industryNode.attr('v-on:trigger', 'industryRefChange');
                }
                if (industryBNode.length) {
                    industryBNode.attr('v-on:trigger', 'industryBRefChange');
                }
                if (industryMNode.length) {
                    industryMNode.attr('v-on:trigger', 'industryMRefChange');
                }

                //地区参照
                let countryNode = this.getNodeById($node, 'dbqroyz7x6');
                let provinceNode = this.getNodeById($node, 'gj8qu7gi8ao');
                let cityNode = this.getNodeById($node, 'tuynwyr1byg');
                if (countryNode.length) {
                    countryNode.attr('v-on:trigger', 'countryRefChange');
                }
                if (provinceNode.length) {
                    provinceNode.attr('v-on:trigger', 'provinceRefChange');
                }
                if (cityNode.length) {
                    cityNode.attr('v-on:trigger', 'cityRefChange');
                }

                //营销状态
                let saleStatusNode = this.getNodeById($node, '7ltabgy7c8r');
                if (saleStatusNode.length) {
                    saleStatusNode.attr('v-on:visible-change', 'saleStatusBoxShow');
                }
            },
            ref_Methods: {
                //客户参照
                customerRefChange: function(type, data) {
                    if (type === 'change') {
                        let customer = data.value[0];
                        let saleInfo = this.$refs.saleInfo_ref.model;
                        saleInfo.cust_code = customer.customer_code;
                        saleInfo.credit_code = customer.society_credit;
                        saleInfo.establish_date = customer.establish_date;
                        saleInfo.capital = customer.capital;
                        saleInfo.control_shareholder = customer.controlshareholder;
                        saleInfo.pk_legal_representative = customer.pk_legal_person;
                        saleInfo.related_trade_project = customer.link_trade;
                        saleInfo.business_address = customer.busi_addr;
                        oThis.customerCreditCode = customer.society_credit;
                        
                        //国民经济参照赋值
                        let necrcArr = oThis.nationalEconomyClassificationRefCache;
                        saleInfo.industry = customer.industry;
                        for (let i in necrcArr) {
                            if (necrcArr[i].id == customer.industry) {
                                saleInfo.beanMap.industry_ref = {};
                                saleInfo.beanMap.industry_ref[customer.industry] = necrcArr[i];
                                break;
                            }
                        }
                        saleInfo.industry_b = customer.industry1;
                        for (let i in necrcArr) {
                            if (necrcArr[i].id == customer.industry1) {
                                saleInfo.beanMap.industry_b_ref = {};
                                saleInfo.beanMap.industry_b_ref[customer.industry1] = necrcArr[i];
                                break;
                            }
                        }
                        saleInfo.industry_m = customer.industry2;
                        for (let i in necrcArr) {
                            if (necrcArr[i].id == customer.industry2) {
                                saleInfo.beanMap.industry_m_ref = {};
                                saleInfo.beanMap.industry_m_ref[customer.industry2] = necrcArr[i];
                                break;
                            }
                        }
                        saleInfo.industry_s = customer.industry3;
                        for (let i in necrcArr) {
                            if (necrcArr[i].id == customer.industry3) {
                                saleInfo.beanMap.industry_s_ref = {};
                                saleInfo.beanMap.industry_s_ref[customer.industry3] = necrcArr[i];
                                break;
                            }
                        }

                        //地区参照
                        let distriArr = oThis.districtRefCache;
                        saleInfo.country = customer.reg_country;
                        for (let i in distriArr) {
                            if (distriArr[i].id == customer.reg_country) {
                                saleInfo.beanMap.country_ref = {};
                                saleInfo.beanMap.country_ref[customer.reg_country] = distriArr[i];
                                break;
                            }
                        }

                        saleInfo.province = customer.reg_province;
                        for (let i in distriArr) {
                            if (distriArr[i].id == customer.reg_province) {
                                saleInfo.beanMap.province_ref = {};
                                saleInfo.beanMap.province_ref[customer.reg_province] = distriArr[i];
                                break;
                            }
                        }

                        saleInfo.city = customer.reg_city;
                        for (let i in distriArr) {
                            if (distriArr[i].id == customer.reg_city) {
                                saleInfo.beanMap.city_ref = {};
                                saleInfo.beanMap.city_ref[customer.reg_city] = distriArr[i];
                                break;
                            }
                        }

                        saleInfo.district = customer.reg_district;
                        for (let i in distriArr) {
                            if (distriArr[i].id == customer.reg_district) {
                                saleInfo.beanMap.district_ref = {};
                                saleInfo.beanMap.district_ref[customer.reg_district] = distriArr[i];
                                break;
                            }
                        }
                        debugger
                        oThis.$refs.saleInfoRef.setData('SaleInfo', saleInfo)

                    }
                },
                //行业分类参照
                industryRefChange: function(type, data) {
                    if(type === 'change') {
                        let refParam = {'key': data.value[0].innercode};
                        oThis.$refs.saleInfoRef.setData('b_param', refParam);
                    }
                },
                industryBRefChange: function(type, data) {
                    if (type === 'change') {
                        let refParam = {'key': data.value[0].innercode};
                        oThis.$refs.saleInfoRef.setData('m_param', refParam);
                    }
                },
                industryMRefChange: function(type, data) {
                    if (type === 'change') {
                        let refParam = {'key': data.value[0].innercode};
                        oThis.$refs.saleInfoRef.setData('s_param', refParam);
                    }
                },

                //地区参照
                countryRefChange: function(type, data) {
                    if (type === 'change') {
                        let refParam = {'key': data.value[0].innercode};
                        oThis.$refs.saleInfoRef.setData('p_param', refParam);
                    }
                },
                provinceRefChange: function(type, data) {
                    if (type === 'change') {
                        let refParam = {'key': data.value[0].innercode};
                        oThis.$refs.saleInfoRef.setData('c_param', refParam);
                    }
                },
                cityRefChange: function(type, data) {
                    if (type === 'change') {
                        let refParam = {'key': data.value[0].innercode};
                        oThis.$refs.saleInfoRef.setData('d_param', refParam);
                    }
                },

                //营销状态下拉框
                saleStatusBoxShow: function(type) {
                    if (type) {
                        let ssOptions = this.$refs.sale_status_ref.options;
                        for (let i in ssOptions) {
                            if (ssOptions[i].value == 'PROJECT_APPROVAL' || ssOptions[i].value == 'SIGNING_COMPLETED') {
                                ssOptions[i].disabled = true;
                            } else {
                                ssOptions[i].disabled = false;
                            }
                        }
                    }
                }
            },
            saleInfoIcons: [
                {
                    icon: 'edit',
                    click: function() {
                        oThis.saleInfoEdit = !oThis.saleInfoEdit;
                        //备份，取消时还原
                        oThis.saleInfoCacheData = JSON.parse(JSON.stringify(oThis.$refs.saleInfoRef.getData('SaleInfo')));
                    }
                }
            ],
            projectOperationPlanIcons: [
                {
                    icon: 'edit',
                    click: function() {
                        if (oThis.pk_sale_info === '') {
                            oThis.$message({
                                message: '请先保存营销信息',
                                type: 'error'
                            });
                            return;
                        }

                        // 重置新增数据
                        oThis.$refs.projectOperationPlanRef.projectOperationPlanEdit = true;

                        //备份，取消时还原
                        oThis.saleInfoCacheData = JSON.parse(JSON.stringify(oThis.$refs.saleInfoRef.getData('SaleInfo')));
                    }
                }
            ],
            workLogIcons: [
                {
                    icon: 'plus',
                    click: function() {
                        if (oThis.pk_sale_info === '') {
                            oThis.$message({
                                message: '请先保存营销信息',
                                type: 'error'
                            });
                            return;
                        }
                        oThis.$refs.workLogRef.$refs.workLogRef.getTableComp().closeExpandRow();
                        // 重置新增数据
                        oThis.$refs.workLogRef.$refs.workLogRef.resetFormData();
                        // 显示新增区域
                        oThis.$refs.workLogRef.$refs.workLogRef.comp.formShow = true;
                    }
                }
            ],
      };
  },

  //获取数据初始化操作
  created () {
      this.request();
  },

  methods: {
      request() {
          this.pk_sale_info = this.$root.$router.currentRoute.params.id;
          if (!this.pk_sale_info) {
              this.pk_sale_info = '';
              this.saleInfoEdit = true;
              return;
          };
          if (this.pk_sale_info) {
              this.requestSaleInfo();
          };
      },

      requestSaleInfo() {
          this.$http({
          url: '/yls-sale-web/sale/saleInfo/getById' ,
          headers: {'Content-Type': 'application/json'},  
          method: "post",
          data: this.pk_sale_info
          }).then(res => {
              if (res.data.success === true) {
                  var saleInfoData = res.data.data;
                  this.customerCreditCode = saleInfoData.credit_code;
                  this.$refs.saleInfoRef.setData('SaleInfo', saleInfoData)
              } else {
                  this.$message({
                      message: res.data.error.errorMessage,
                      type: 'error'
                  })
              }
          }).catch(e => {
              this.$message({
                  message: '营销信息获取失败',
                  type: 'error'
              })
          });
      },

      saleInfoConfirm(type) {
          this.$refs.saleInfoRef.comp.$refs["saleInfo_ref"].validate(valid => {
              if (valid) {
                  var data = this.$refs.saleInfoRef.comp.SaleInfo;
                  var url;
                  if (this.pk_sale_info) {
                      url = '/yls-sale-web/sale/saleInfo/updateSaleInfo';
                  } else {
                      url = '/yls-sale-web/sale/saleInfo/createSaleInfo';
                  }
                  this.$http({
                    url: url,
                    headers: {'Content-type': 'application/json'},
                    method: 'post',
                    data: JSON.parse(JSON.stringify(data))
                  }).then(res => {
                    if (res.data.success === true) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                        this.originalValue = res.data.data;
                        this.$refs.saleInfoRef.setData('saleInfo_ref', this.originalValue);
                        this.pk_sale_info = this.originalValue.pk_sale_info;
                        this.saleInfoEdit = false;
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
          }, type);
      },
      
      saleInfoCancel() {
          this.saleInfoEdit = false;

          //还原表单数据
          this.$refs.saleInfoRef.setData('SaleInfo', this.saleInfoCacheData);
      },

      updateVisitTimes(size) {
          let saleInfo = this.$refs.saleInfoRef.comp.$refs.saleInfo_ref.model;
          saleInfo.visit_times = size;
          this.$refs.saleInfoRef.setData('SaleInfo', saleInfo)

          //更新营销信息中拜访次数
          this.$http({
              url: '/yls-sale-web/sale/saleInfo/update',
              headers: {'Content-type': 'application/json'},
              method: 'post',
              data: JSON.parse(JSON.stringify(saleInfo))
          }).then(res => {
              console.log('更新成功，拜访次数为：' + res.data.data.visit_times)
          }).catch(() => {
              this.$message({
                  message: '更新拜访次数失败',
                  type: 'error'
              });
          });
          
      },

      //缓存参照数据
      queryRefData() {

          //国明经济行业分类参照
          var paramObj = {};
          paramObj.transmitParam = {};

          this.$http({
              url: '/yls-base-web/defDocRef/nationalEconomyClassification/filterRefJSON',
              headers: {'Content-type': 'application/json'},
              method: 'post',
              data: {'transmitParam':'{}'}
          }).then(res => {
              for (var i in res.data) {
                  this.nationalEconomyClassificationRefCache[i] = res.data[i];
              }
          }).catch(() => {
              console.log('国明经济行业分类参照 获取失败');
          });

          //地区参照
          this.$http({
              url: '/yls-base-web/defDocRef/district/filterRefJSON',
              headers: {'Content-type': 'application/json'},
              method: 'post',
              data: {'transmitParam':'{}'}
          }).then(res => {
              this.districtRefCache = res.data;
          }).catch(() => {
              console.log('地区参照 获取失败');
          });
      }
      
  }
};
</script>
<<style>

</style>



 
 define('yls^sale/salemanage/src/project_operation_plan.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
      //应用vue传过来接收参数
      props: ["pk_sale_info"],
      data: function data() {
          var oThis = this;
          return {
              scrollDom: document.getElementsByClassName("view")[0],
              delId: "",
              projectOperationPlanFunnode: "YLSBT003",
              projectOperationPlanNexusKey: "project_operation_plan",
              projectOperationPlanEdit: false,
              projectOperationPlanCacheData: '',
              projectOperationPlanData: {
                  rules: {}
              }
          };
      },
  
  
      //页面操作
      mounted: function mounted() {
          this.request();
      },
  
  
      methods: {
          request: function request() {
              if (this.pk_sale_info) {
                  this.requestProjectOperationPlan();
              }
          },
  
  
          //请求项目操作方案数据
          requestProjectOperationPlan: function requestProjectOperationPlan() {
              var _this = this;
  
              var url = _publicData.ylsSale + "sale/projectOperationPlan/getByParentId";
              this.$http({
                  url: url,
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: this.pk_sale_info,
                  dataType: "json"
              }).then(function (res) {
                  _this.$refs.projectOperationPlanRef.setData("ProjectOperationPlan", res.data.data);
                  //列表数据缓存
                  _this.projectOperationPlanCacheData = JSON.parse(JSON.stringify(_this.$refs.projectOperationPlanRef.getData('ProjectOperationPlan')));
              })["catch"](function () {
                  _this.$message({
                      message: "项目操作方案信息获取失败",
                      type: "error"
                  });
              });
          },
  
  
          //取消按钮
          projectOperationPlanFormCancel: function projectOperationPlanFormCancel(type) {
              this.projectOperationPlanEdit = false;
              //还原数据
              this.$refs.projectOperationPlanRef.setData('ProjectOperationPlan', this.projectOperationPlanCacheData);
          },
  
          //保存
          projectOperationPlanFormConfirm: function projectOperationPlanFormConfirm() {
              var _this2 = this;
  
              //获取当前数据
              var url = "";
              var data = this.$refs.projectOperationPlanRef.comp.ProjectOperationPlan;
              data.pk_sale_info = this.pk_sale_info;
              if (data.pk_prj_operation_plan) {
                  url = _publicData.ylsSale + '/sale/projectOperationPlan/update';
              } else {
                  url = _publicData.ylsSale + '/sale/projectOperationPlan/create';
              }
              this.$http({
                  url: url,
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: JSON.parse(JSON.stringify(data))
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this2.$message({
                          message: "保存成功！",
                          type: "success"
                      });
                      _this2.projectOperationPlanEdit = false;
                      _this2.$refs.projectOperationPlanRef.setData("ProjectOperationPlan", res.data.data);
                      //列表数据缓存
                      _this2.projectOperationPlanCacheData = JSON.parse(JSON.stringify(_this2.$refs.projectOperationPlanRef.getData('ProjectOperationPlan')));
                  } else {
                      _this2.$message({
                          message: res.data.error.errorMessage,
                          type: "error"
                      });
                  }
              })["catch"](function () {
                  _this2.$message({
                      message: "更新失败",
                      type: "error"
                  });
              });
          }
      }
  }; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!-- 工作日志 -->\r\n<div>\r\n    <ifbp-template ref=\"projectOperationPlanRef\"\r\n                tplId=\"projectOperationPlan\"\r\n                :funnode=\"projectOperationPlanFunnode\"\r\n                :nexuskey=\"projectOperationPlanNexusKey\"\r\n                :tplData=\"projectOperationPlanData\"\r\n                @form-confirm-click=\"projectOperationPlanFormConfirm\"\r\n                @form-cancel-click=\"projectOperationPlanFormCancel\"\r\n                show-type=\"form\"\r\n                :editable=\"projectOperationPlanEdit\">\r\n    </ifbp-template>\r\n    <div class=\"form-button-div\" v-if=\"projectOperationPlanEdit\">\r\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"projectOperationPlanFormCancel\">取消</el-button>\r\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"projectOperationPlanFormConfirm\">保存</el-button>\r\n    </div>\r\n</div>\r\n"
  

});
 
 define('yls^sale/salemanage/src/sale-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _work_log = require('yls^sale/salemanage/src/work_log.vue');
  
  var _work_log2 = _interopRequireDefault(_work_log);
  
  var _project_operation_plan = require('yls^sale/salemanage/src/project_operation_plan.vue');
  
  var _project_operation_plan2 = _interopRequireDefault(_project_operation_plan);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  exports["default"] = {
      components: {
          'workLogRef': _work_log2["default"],
          'projectOperationPlanRef': _project_operation_plan2["default"]
      },
      data: function data() {
          var oThis = this;
  
          //校验
          var validateCreateCode = function validateCreateCode(rule, value, callback) {
              if (rule.field === 'credit_code' && oThis.customerCreditCode != value) {
                  var data = { 'society_credit': value };
                  oThis.$http({
                      url: '/yls-busi-web/cust/customer/validateInputSociety',
                      headers: { 'Content-Type': 'application/json' },
                      method: 'post',
                      data: data
                  }).then(function (res) {
                      if (res.data.data) {
                          callback(new Error('社会统一信用码已存在'));
                      } else {
                          callback();
                      }
                  })["catch"](function (e) {
                      console.error(e);
                  });
              } else {
                  callback();
              }
          };
  
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
                  b_param: {},
                  m_param: {},
                  s_param: {},
                  p_param: {},
                  c_param: {},
                  d_param: {},
                  rules: {
                      credit_code: [{ validator: validateCreateCode, trigger: 'blur' }]
                  }
              },
              saleInfoEdit: false,
              saleInfoResetFun: function saleInfoResetFun($node) {
                  //客户参照
                  var customerNode = this.getNodeById($node, '1un1k87kbw5');
                  if (customerNode.length) {
                      customerNode.attr('v-on:trigger', 'customerRefChange');
                  }
  
                  //行业分类参照
                  var industryNode = this.getNodeById($node, 'h6iudcgmaqi');
                  var industryBNode = this.getNodeById($node, 'hkppgmenust');
                  var industryMNode = this.getNodeById($node, 'sshgu35ctbe');
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
                  var countryNode = this.getNodeById($node, 'dbqroyz7x6');
                  var provinceNode = this.getNodeById($node, 'gj8qu7gi8ao');
                  var cityNode = this.getNodeById($node, 'tuynwyr1byg');
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
                  var saleStatusNode = this.getNodeById($node, '7ltabgy7c8r');
                  if (saleStatusNode.length) {
                      saleStatusNode.attr('v-on:visible-change', 'saleStatusBoxShow');
                  }
              },
  
              ref_Methods: {
                  //客户参照
                  customerRefChange: function customerRefChange(type, data) {
                      if (type === 'change') {
                          var customer = data.value[0];
                          var saleInfo = this.$refs.saleInfo_ref.model;
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
                          var necrcArr = oThis.nationalEconomyClassificationRefCache;
                          saleInfo.industry = customer.industry;
                          for (var i in necrcArr) {
                              if (necrcArr[i].id == customer.industry) {
                                  saleInfo.beanMap.industry_ref = {};
                                  saleInfo.beanMap.industry_ref[customer.industry] = necrcArr[i];
                                  break;
                              }
                          }
                          saleInfo.industry_b = customer.industry1;
                          for (var _i in necrcArr) {
                              if (necrcArr[_i].id == customer.industry1) {
                                  saleInfo.beanMap.industry_b_ref = {};
                                  saleInfo.beanMap.industry_b_ref[customer.industry1] = necrcArr[_i];
                                  break;
                              }
                          }
                          saleInfo.industry_m = customer.industry2;
                          for (var _i2 in necrcArr) {
                              if (necrcArr[_i2].id == customer.industry2) {
                                  saleInfo.beanMap.industry_m_ref = {};
                                  saleInfo.beanMap.industry_m_ref[customer.industry2] = necrcArr[_i2];
                                  break;
                              }
                          }
                          saleInfo.industry_s = customer.industry3;
                          for (var _i3 in necrcArr) {
                              if (necrcArr[_i3].id == customer.industry3) {
                                  saleInfo.beanMap.industry_s_ref = {};
                                  saleInfo.beanMap.industry_s_ref[customer.industry3] = necrcArr[_i3];
                                  break;
                              }
                          }
  
                          //地区参照
                          var distriArr = oThis.districtRefCache;
                          saleInfo.country = customer.reg_country;
                          for (var _i4 in distriArr) {
                              if (distriArr[_i4].id == customer.reg_country) {
                                  saleInfo.beanMap.country_ref = {};
                                  saleInfo.beanMap.country_ref[customer.reg_country] = distriArr[_i4];
                                  break;
                              }
                          }
  
                          saleInfo.province = customer.reg_province;
                          for (var _i5 in distriArr) {
                              if (distriArr[_i5].id == customer.reg_province) {
                                  saleInfo.beanMap.province_ref = {};
                                  saleInfo.beanMap.province_ref[customer.reg_province] = distriArr[_i5];
                                  break;
                              }
                          }
  
                          saleInfo.city = customer.reg_city;
                          for (var _i6 in distriArr) {
                              if (distriArr[_i6].id == customer.reg_city) {
                                  saleInfo.beanMap.city_ref = {};
                                  saleInfo.beanMap.city_ref[customer.reg_city] = distriArr[_i6];
                                  break;
                              }
                          }
  
                          saleInfo.district = customer.reg_district;
                          for (var _i7 in distriArr) {
                              if (distriArr[_i7].id == customer.reg_district) {
                                  saleInfo.beanMap.district_ref = {};
                                  saleInfo.beanMap.district_ref[customer.reg_district] = distriArr[_i7];
                                  break;
                              }
                          }
                          debugger;
                          oThis.$refs.saleInfoRef.setData('SaleInfo', saleInfo);
                      }
                  },
                  //行业分类参照
                  industryRefChange: function industryRefChange(type, data) {
                      if (type === 'change') {
                          var refParam = { 'key': data.value[0].innercode };
                          oThis.$refs.saleInfoRef.setData('b_param', refParam);
                      }
                  },
                  industryBRefChange: function industryBRefChange(type, data) {
                      if (type === 'change') {
                          var refParam = { 'key': data.value[0].innercode };
                          oThis.$refs.saleInfoRef.setData('m_param', refParam);
                      }
                  },
                  industryMRefChange: function industryMRefChange(type, data) {
                      if (type === 'change') {
                          var refParam = { 'key': data.value[0].innercode };
                          oThis.$refs.saleInfoRef.setData('s_param', refParam);
                      }
                  },
  
                  //地区参照
                  countryRefChange: function countryRefChange(type, data) {
                      if (type === 'change') {
                          var refParam = { 'key': data.value[0].innercode };
                          oThis.$refs.saleInfoRef.setData('p_param', refParam);
                      }
                  },
                  provinceRefChange: function provinceRefChange(type, data) {
                      if (type === 'change') {
                          var refParam = { 'key': data.value[0].innercode };
                          oThis.$refs.saleInfoRef.setData('c_param', refParam);
                      }
                  },
                  cityRefChange: function cityRefChange(type, data) {
                      if (type === 'change') {
                          var refParam = { 'key': data.value[0].innercode };
                          oThis.$refs.saleInfoRef.setData('d_param', refParam);
                      }
                  },
  
                  //营销状态下拉框
                  saleStatusBoxShow: function saleStatusBoxShow(type) {
                      if (type) {
                          var ssOptions = this.$refs.sale_status_ref.options;
                          for (var i in ssOptions) {
                              if (ssOptions[i].value == 'PROJECT_APPROVAL' || ssOptions[i].value == 'SIGNING_COMPLETED') {
                                  ssOptions[i].disabled = true;
                              } else {
                                  ssOptions[i].disabled = false;
                              }
                          }
                      }
                  }
              },
              saleInfoIcons: [{
                  icon: 'edit',
                  click: function click() {
                      oThis.saleInfoEdit = !oThis.saleInfoEdit;
                      //备份，取消时还原
                      oThis.saleInfoCacheData = JSON.parse(JSON.stringify(oThis.$refs.saleInfoRef.getData('SaleInfo')));
                  }
              }],
              projectOperationPlanIcons: [{
                  icon: 'edit',
                  click: function click() {
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
              }],
              workLogIcons: [{
                  icon: 'plus',
                  click: function click() {
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
              }]
          };
      },
  
  
      //获取数据初始化操作
      created: function created() {
          this.request();
      },
  
  
      methods: {
          request: function request() {
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
          requestSaleInfo: function requestSaleInfo() {
              var _this = this;
  
              this.$http({
                  url: '/yls-sale-web/sale/saleInfo/getById',
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: this.pk_sale_info
              }).then(function (res) {
                  if (res.data.success === true) {
                      var saleInfoData = res.data.data;
                      _this.customerCreditCode = saleInfoData.credit_code;
                      _this.$refs.saleInfoRef.setData('SaleInfo', saleInfoData);
                  } else {
                      _this.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this.$message({
                      message: '营销信息获取失败',
                      type: 'error'
                  });
              });
          },
          saleInfoConfirm: function saleInfoConfirm(type) {
              var _this2 = this;
  
              this.$refs.saleInfoRef.comp.$refs["saleInfo_ref"].validate(function (valid) {
                  if (valid) {
                      var data = _this2.$refs.saleInfoRef.comp.SaleInfo;
                      var url;
                      if (_this2.pk_sale_info) {
                          url = '/yls-sale-web/sale/saleInfo/updateSaleInfo';
                      } else {
                          url = '/yls-sale-web/sale/saleInfo/createSaleInfo';
                      }
                      _this2.$http({
                          url: url,
                          headers: { 'Content-type': 'application/json' },
                          method: 'post',
                          data: JSON.parse(JSON.stringify(data))
                      }).then(function (res) {
                          if (res.data.success === true) {
                              _this2.$message({
                                  message: '保存成功',
                                  type: 'success'
                              });
                              _this2.originalValue = res.data.data;
                              _this2.$refs.saleInfoRef.setData('saleInfo_ref', _this2.originalValue);
                              _this2.pk_sale_info = _this2.originalValue.pk_sale_info;
                              _this2.saleInfoEdit = false;
                          } else {
                              _this2.$message({
                                  message: res.data.error.errorMessage,
                                  type: 'error'
                              });
                          }
                      })["catch"](function () {
                          _this2.$message({
                              message: '更新失败',
                              type: 'error'
                          });
                      });
                  }
              }, type);
          },
          saleInfoCancel: function saleInfoCancel() {
              this.saleInfoEdit = false;
  
              //还原表单数据
              this.$refs.saleInfoRef.setData('SaleInfo', this.saleInfoCacheData);
          },
          updateVisitTimes: function updateVisitTimes(size) {
              var _this3 = this;
  
              var saleInfo = this.$refs.saleInfoRef.comp.$refs.saleInfo_ref.model;
              saleInfo.visit_times = size;
              this.$refs.saleInfoRef.setData('SaleInfo', saleInfo);
  
              //更新营销信息中拜访次数
              this.$http({
                  url: '/yls-sale-web/sale/saleInfo/update',
                  headers: { 'Content-type': 'application/json' },
                  method: 'post',
                  data: JSON.parse(JSON.stringify(saleInfo))
              }).then(function (res) {
                  console.log('更新成功，拜访次数为：' + res.data.data.visit_times);
              })["catch"](function () {
                  _this3.$message({
                      message: '更新拜访次数失败',
                      type: 'error'
                  });
              });
          },
  
  
          //缓存参照数据
          queryRefData: function queryRefData() {
              var _this4 = this;
  
              //国明经济行业分类参照
              var paramObj = {};
              paramObj.transmitParam = {};
  
              this.$http({
                  url: '/yls-base-web/defDocRef/nationalEconomyClassification/filterRefJSON',
                  headers: { 'Content-type': 'application/json' },
                  method: 'post',
                  data: { 'transmitParam': '{}' }
              }).then(function (res) {
                  for (var i in res.data) {
                      _this4.nationalEconomyClassificationRefCache[i] = res.data[i];
                  }
              })["catch"](function () {
                  console.log('国明经济行业分类参照 获取失败');
              });
  
              //地区参照
              this.$http({
                  url: '/yls-base-web/defDocRef/district/filterRefJSON',
                  headers: { 'Content-type': 'application/json' },
                  method: 'post',
                  data: { 'transmitParam': '{}' }
              }).then(function (res) {
                  _this4.districtRefCache = res.data;
              })["catch"](function () {
                  console.log('地区参照 获取失败');
              });
          }
      }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n    <div class=\"title-container\">\n        <h2 class=\"name\">营销管理详情页</h2>\n    </div>\n    <div class=\"detail-main-container clearfix\">\n        <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\" >\n            <!-- 营销信息-->\n            <ifbp-panel id=\"basePanel\" title=\"营销信息\" :icons=\"saleInfoIcons\">\n                <ifbp-template ref=\"saleInfoRef\"\n                            tplId=\"saleInfo\"\n                            :funnode=\"saleInfoFunnode\"\n                            :nexuskey=\"saleInfoNexusKey\"\n                            :tplData=\"saleInfoData\"\n                            show-type=\"form\"\n                            :editable=\"saleInfoEdit\"\n                            :tplResetFun=\"saleInfoResetFun\"\n                            :methods=\"ref_Methods\"\n                            @after-create=\"queryRefData\">\n                </ifbp-template>\n                <div class=\"form-button-div\" v-if=\"saleInfoEdit\">\n                    <el-button type=\"default\" class=\"button-no-radius\" @click=\"saleInfoCancel\">取消</el-button>\n                    <el-button type=\"primary\" class=\"button-no-radius\" @click=\"saleInfoConfirm\">保存</el-button>\n                </div>\n            </ifbp-panel>\n            <!-- 项目操作方案 -->\n            <ifbp-panel id=\"basePanel\" title=\"项目操作方案\" :icons=\"projectOperationPlanIcons\">\n                <projectOperationPlanRef ref=\"projectOperationPlanRef\"\n                            :pk_sale_info=\"pk_sale_info\">\n                </projectOperationPlanRef>\n            </ifbp-panel>\n            <!-- 工作日志-->\n            <ifbp-panel id=\"basePanel\" title=\"工作日志\" :icons=\"workLogIcons\">\n                <workLogRef ref=\"workLogRef\"\n                            :pk_sale_info=\"pk_sale_info\"\n                            @workLogSizeListener=\"updateVisitTimes\">\n                </workLogRef>\n            </ifbp-panel>\n        </ifbp-panel-group>\n    </div>\n</div>\n"
  

});
 
 define('yls^sale/salemanage/src/sale-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
      mounted: function mounted() {
          this.request();
      },
      data: function data() {
          return {
              isHide: true,
              custNameRefCode: 'prj_customer_ref',
              custNameRefField: 'pk_customer',
              custNameRefTemplate: {},
              custName: '',
              controlShareholder: '',
              saleStatus: '',
              sale_status_option: [{
                  label: '潜在营销机会',
                  value: 'POTENTIAL'
              }, {
                  label: '意向待评估',
                  value: 'INTENTION'
              }, {
                  label: '方案洽谈中',
                  value: 'NEGOTIATING'
              }, {
                  label: '暂缓',
                  value: 'SUSPENDED'
              }, {
                  label: '立项审批',
                  value: 'PROJECT_APPROVAL'
              }, {
                  label: '签约完成',
                  value: 'SIGNING_COMPLETED'
              }],
  
              saleListFunnode: 'YLSBT003',
              saleListNexuskey: 'sale-manage',
  
              saleListData: {},
  
              delDialogVisible: false,
              delId: '',
  
              saleListResetFun: function saleListResetFun($node) {
                  var $table = $node.find('el-table');
                  var operateArr = [{
                      icon: 'edit',
                      title: '编辑'
                  }, {
                      icon: 'delete',
                      title: '删除'
  
                  }];
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
  
  
      methods: {
          request: function request() {
              var _this = this;
  
              var url = _publicData.ylsSale + 'sale/saleInfo/page';
              var data = {
                  'orderList': [{
                      'direction': 'desc',
                      'property': 'ts'
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  'searchParams': {
                      'searchMap': {
                          'pk_customer': this.custName,
                          'control_shareholder': this.controlShareholder,
                          'sale_status': this.saleStatus
  
                      }
                  }
              };
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  _this.$refs.saleListRef.setData('SaleInfo_t', res.data.data.content);
                  _this.totalElements = res.data.data.totalElements;
              })["catch"](function () {
                  _this.$message({
                      message: '信息获取失败',
                      type: 'error'
                  });
              });
          },
          addSaleInfo: function addSaleInfo() {
              location.hash = '/sale/saleInfo/add';
          },
          advancedSearch: function advancedSearch() {
              this.request();
          },
          rowEditClick: function rowEditClick(scope) {
              location.hash = '/sale/saleInfo/detail/' + scope.row.pk_sale_info;
          },
          rowDeleteClick: function rowDeleteClick(scope) {
              this.delId = scope.row.pk_sale_info;
              this.delDialogVisible = true;
          },
          deleteConfirmClick: function deleteConfirmClick() {
              var _this2 = this;
  
              this.$http({
                  url: _publicData.ylsSale + 'sale/saleInfo/deleteById',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this2.$message({
                          message: '删除成功',
                          type: 'success'
                      });
                      _this2.delDialogVisible = false;
                      _this2.request(_this2.currentPage - 1, _this2.size);
                  } else {
                      _this2.$message({
                          message: res.data.msg,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this2.$message({
                      message: '信息删除失败！',
                      type: 'error'
                  });
              });
          },
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
          custNameRefTrigger: function custNameRefTrigger(type, data) {
              if (type === 'change') {
                  this.custName = data.value[0].id;
              }
          },
          custNameRefReset: function custNameRefReset() {
              this.custName = '';
          }
      }
  }; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n    <div class=\"title-header\">\n        <h2 class=\"name\">营销管理列表页</h2>\n    </div>\n\n    <div class=\"operator-container\">\n        <div class=\"fl\">\n            <el-button type=\"primary\" class=\"legacy\" @click=\"addSaleInfo\">新增</el-button>\n        </div>\n        <div class=\"fr\">\n            <el-button type=\"text\" @click=\"showSearch\">\n                高级搜索\n                <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n                <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n            </el-button>\n        </div>\n    </div>\n\n    <div id=\"advanced-search\" :class=\"{hide: isHide}\">\n        <el-row>\n            <el-col :span=\"2\"><span class=\"search-label\"> 客户名称:</span></el-col>\n             <el-col :span=\"3\">\n                 <el-ref\n                    :ref-code=\"custNameRefCode\"\n                    :field=\"custNameRefField\"\n                    :template-value=\"custNameRefTemplate\"\n                    @trigger=\"custNameRefTrigger\"\n                    @reset=\"custNameRefReset\">\n                </el-ref>\n             </el-col>\n            <el-col :span=\"2\"><span class=\"search-label\"> 控股股东:</span></el-col>\n            <el-col :span=\"3\">\n                <el-input type=\"text\" v-model=\"controlShareholder\" placeholder=\"请输入控股股东\"></el-input>\n            </el-col>\n            <el-col :span=\"2\"><span class=\"search-label\"> 营销状态:</span></el-col>\n            <el-col :span=\"4\">\n                <el-select id=\"s-state\" v-model=\"saleStatus\">\n                    <el-option\n                        v-for=\"(item,index) in sale_status_option\"\n                        :label=\"item.label\"\n                        :value=\"item.value\"\n                        :key=\"index\">\n                    </el-option>\n                </el-select>\n            </el-col>\n            <div class=\"fr\">\n            <el-button @click=\"advancedSearch\">搜索</el-button>\n            </div>\n        </el-row>\n    </div>\n\n    <div class=\"list-main-container clearfix\">\n        <ifbp-template ref=\"saleListRef\"\n            tplId=\"saleList\"\n            :funnode=\"saleListFunnode\"\n            :nexuskey=\"saleListNexuskey\"\n            :tplData=\"saleListData\"\n            show-type=\"table\"\n            :tplResetFun=\"saleListResetFun\"\n            @edit-table-click=\"rowEditClick\"\n            @delete-table-click=\"rowDeleteClick\">\n        </ifbp-template>\n\n        <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n            :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n        </el-pagination>\n\n        <el-dialog title=\"提示\"\n            v-model=\"delDialogVisible\"\n            @update:visible=\"val => delDialogVisible = val\"\n            :modal=\"true\"\n            size=\"tiny\">\n            <span>确认删除该数据？删除后无法恢复。</span>\n            <span slot=\"footer\" class=\"dialog-footer\">\n                <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n                <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n            </span>\n        </el-dialog>\n    </div>\n</div>\n"
  

});
 
 define('yls^sale/salemanage/src/work_log.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
      //应用vue传过来接收参数
  
      props: ["pk_sale_info"],
      data: function data() {
          var oThis = this;
          return {
              scrollDom: document.getElementsByClassName("view")[0],
              workLogDelVisible: false,
              delId: "",
              workLogFunnode: "YLSBT003",
              workLogNexusKey: "sale_work_log",
              workLogData: {
                  rules: {}
              },
              workLogListSize: '',
              workLogCacheData: '',
              workLogResetFun: function workLogResetFun($node) {
                  var $table = $node.find("el-table");
                  var operateArr = [{
                      title: "编辑",
                      icon: "edit"
                  }, {
                      title: "删除",
                      icon: "delete"
                  }];
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
  
  
      //获取数据初始化操作
      created: function created() {},
  
  
      //页面操作
      mounted: function mounted() {
          this.request();
      },
  
  
      watch: {
          workLogListSize: function workLogListSize(val) {
              this.$emit('workLogSizeListener', val);
          }
      },
  
      methods: {
          request: function request() {
              if (this.pk_sale_info) {
                  this.requestWorkLog();
              }
          },
  
  
          //请求工作日志表格数据
          requestWorkLog: function requestWorkLog() {
              var _this = this;
  
              var url = _publicData.ylsSale + "/sale/workLog/page";
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  pageNum: 0,
                  pageSize: 0,
                  searchParams: {
                      searchMap: {
                          'pk_sale_info': this.pk_sale_info
                      }
                  }
              };
              this.$http({
                  url: url,
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  _this.workLogData = res.data.data.content;
                  _this.workLogListSize = res.data.data.totalElements;
                  _this.$refs["workLogRef"].setData("WorkLog_t", JSON.parse(JSON.stringify(_this.workLogData)));
  
                  //列表数据缓存
                  _this.workLogCacheData = JSON.parse(JSON.stringify(_this.$refs.workLogRef.getData('WorkLog_t')));
              })["catch"](function () {
                  _this.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
  
  
          //工作日志取消按钮
          workLogFormCancel: function workLogFormCancel(type) {
              //关闭表单或者下拉显示行
              if (type === "form") {
                  this.$refs["workLogRef"].comp.formShow = false;
              } else {
                  this.$refs["workLogRef"].getTableComp().closeExpandRow();
              }
  
              //还原数据
              this.$refs.workLogRef.setData('WorkLog_t', this.workLogCacheData);
          },
  
          //工作日志保存
          workLogFormConfirm: function workLogFormConfirm() {
              var _this2 = this;
  
              //获取当前数据
              var url = "";
              var data = this.$refs.workLogRef.comp.WorkLog;
              data.pk_sale_info = this.pk_sale_info;
              if (data.pk_work_log) {
                  url = _publicData.ylsSale + '/sale/workLog/update';
              } else {
                  url = _publicData.ylsSale + '/sale/workLog/create';
              }
              this.$http({
                  url: url,
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: JSON.parse(JSON.stringify(data))
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this2.$message({
                          message: "保存成功！",
                          type: "success"
                      });
                      _this2.requestWorkLog();
                      _this2.$refs["workLogRef"].comp.formShow = false;
                  } else {
                      _this2.$message({
                          message: res.data.error.errorMessage,
                          type: "error"
                      });
                  }
              })["catch"](function () {
                  _this2.$message({
                      message: "更新失败",
                      type: "error"
                  });
              });
          },
  
          //工作日志行编辑
          workLogEdit: function workLogEdit(scope) {
              //行下展开表单页面
              var row = scope.row;
              this.$refs.workLogRef.getTableComp().expandRow(row);
              this.$refs.workLogRef.formShow = false;
  
              //workLog为表单数据对象参数
              this.$refs.workLogRef.setData("WorkLog", row);
  
              //备份，点击取消时还原
              this.workLogCacheData = JSON.parse(JSON.stringify(this.$refs.workLogRef.getData('WorkLog_t')));
          },
  
          //工作日志行删除提示
          workLogDelete: function workLogDelete(scope) {
              this.workLogDelVisible = true;
              this.delId = scope.row.pk_work_log;
          },
  
          //工作日志行删除方法
          workLogDelClick: function workLogDelClick() {
              var _this3 = this;
  
              this.$http({
                  url: _publicData.ylsSale + "/sale/workLog/deleteById",
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  dataType: "json",
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this3.$message({
                          message: "删除成功",
                          type: "success"
                      });
                      _this3.requestWorkLog();
                  } else {
                      _this3.$message({
                          message: res.data.error.errorMessage,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this3.$message({
                      message: "信息删除失败！",
                      type: "error"
                  });
              });
              this.workLogDelVisible = false;
              this.delId = "";
          }
      }
  }; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!-- 工作日志 -->\r\n<div>\r\n    <ifbp-template ref=\"workLogRef\"\r\n                tplId=\"workLog\"\r\n                :funnode=\"workLogFunnode\"\r\n                :nexuskey=\"workLogNexusKey\"\r\n                :tplData=\"workLogData\"\r\n                :tplResetFun=\"workLogResetFun\"\r\n                @form-confirm-click=\"workLogFormConfirm\"\r\n                @form-cancel-click=\"workLogFormCancel\"\r\n                show-type=\"table-form\"\r\n                @edit-table-click=\"workLogEdit\"\r\n                @delete-table-click=\"workLogDelete\"\r\n                >\r\n     </ifbp-template>\r\n\r\n    <!-- 删除提示框-->\r\n    <el-dialog\r\n        title=\"提示\"\r\n        v-model=\"workLogDelVisible\"\r\n        :modal=\"true\"\r\n        size=\"tiny\">\r\n        <span>确认删除该条记录？删除后无法恢复。</span>\r\n        <span slot=\"footer\" class=\"dialog-footer\">\r\n            <el-button @click=\"workLogDelVisible = false, this.delId=''\">取消</el-button>\r\n            <el-button type=\"primary\" @click=\"workLogDelClick\">确定</el-button>\r\n        </span>\r\n    </el-dialog>\r\n</div>\r\n"
  

});

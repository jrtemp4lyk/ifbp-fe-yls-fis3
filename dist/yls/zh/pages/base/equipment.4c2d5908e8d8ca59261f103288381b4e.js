 
 define('yls^base/equipment/src/brand-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      var validateBrand = function validateBrand(rule, value, callback) {
        debugger;
        // 编码非空校验
        if (rule.field == 'brand_code') {
          if (value === '') {
            callback(new Error('编码不能为空! '));
          } else {
            var datam = {
              code: value
            };
            if (oThis.pk_brand != '') {
              datam.pk = oThis.pk_brand;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'brand/isUnique',
              hearders: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(datam))
            }).then(function (res) {
              if (res.data.success === true) {
                if (res.data.data === true) {
                  callback();
                } else {
                  callback(new Error('编码已存在! '));
                }
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })["catch"](function () {
              callback(new Error('后台服务有误，请联系管理员！'));
            });
          }
        }
        // 名称非空校验
        if (rule.field == 'brand_name') {
          if (value === '') {
            callback(new Error('名称不能为空! '));
          } else {
            var _datam = {
              name: value
            };
            if (oThis.pk_brand != '') {
              _datam.pk = oThis.pk_brand;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'brand/isUnique',
              hearders: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(_datam))
            }).then(function (res) {
              if (res.data.success === true) {
                if (res.data.data === true) {
                  callback();
                } else {
                  callback(new Error('名称已存在! '));
                }
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })["catch"](function () {
              callback(new Error('后台服务有误，请联系管理员！'));
            });
          }
        }
      };
      return {
        // 固定写法
        scrollDom: document.getElementsByClassName('view')[0],
        // 厂牌主键
        pk_brand: '',
        // 页面标题
        title: '',
        // 报价主模板 baseTemplateRef start
        funNode: 'BT011',
        nexusKey: 'Equip_Brand',
        tplData: {
          rules: {
            brand_code: [{ validator: validateBrand, trigger: 'blur' }],
            brand_name: [{ validator: validateBrand, trigger: 'blur' }]
          }
        },
        editable: true
        // 报价主模板 baseTemplateRef end
      };
    },
  
    props: ['brandMsg'],
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        // window.history.back(-1);
        this.$emit('change-brand-detail', 'swithToTable');
      },
  
      // 厂牌主模板 baseTemplateRef 事件处理 start
      clickSave: function clickSave() {
        var _this = this;
  
        debugger;
        var data = this.$refs.baseTemplateRef.comp.Brand;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = void 0;
        this.$refs.baseTemplateRef.validate(function (valid) {
          if (valid) {
            if (_this.brandMsg == 'add') {
              url = _publicData.ylsBase + 'brand/create';
            } else {
              url = _publicData.ylsBase + 'brand/update';
            }
            _this.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: jsonData
            }).then(function (res) {
              if (res.data.success === true) {
                _this.$message({
                  message: '操作成功!',
                  type: 'success'
                });
                // this.editable = false;
                // let originalValue = res.data.data;
                // this.$refs['baseTemplateRef'].setData(
                // 'Brand',
                // JSON.parse(JSON.stringify(originalValue))
                // );
                _this.$emit('change-brand-detail', 'swithToTable');
              } else {
                _this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function (e) {
              _this.$message({
                message: '厂牌保存失败！',
                type: 'error'
              });
            });
          } else {
            _this.$message('校验未通过! ');
          }
        });
      },
  
      // 厂牌主模板 baseTemplateRef 事件处理 end
  
      // 加载数据方法
      loadData: function loadData() {
        // 判断brandMsg
        if (this.brandMsg == 'add') {
          this.title = '厂牌列表 > 厂牌新增';
        } else {
          this.title = '厂牌列表 > 厂牌变更';
          this.pk_brand = this.brandMsg;
        }
        debugger;
        // 详情页面
        if (this.pk_brand && this.pk_brand != '') {
          // 加载厂牌信息
          this.loadBrandDetail(this.pk_brand);
        } else {
          this.editable = true;
        }
      },
  
      // 加载厂牌信息
      loadBrandDetail: function loadBrandDetail(pk_brand) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'brand/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_brand
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this2.$refs['baseTemplateRef'].setData('Brand', JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: '厂牌详情获取失败',
            type: 'error'
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!-- 主体区域 -->\n  <div class='detail-main-container clearfix'>\n    <div class='operator-container'>\n      <div class='fl'>\n        <h3 class='name'>{{ title }}</h3>\n      </div>\n      <div class='fr'>\n        <el-button type='default' class='button-no-radius' @click='goBack'> 取 消 </el-button>\n        <el-button type='primary' class='button-no-radius' @click='clickSave'> 保 存 </el-button>\n      </div>\n    </div>\n    <!-- 厂牌主模板 temp start-->\n    <ifbp-template ref='baseTemplateRef'\n                  tplId='baseTemplate'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  show-type='form'\n                  :tplData='tplData'\n                  :editable='editable'>\n    </ifbp-template>\n    <!-- 厂牌主模板 temp end-->\n  </div>\n</div>\n"
  

});
 
 define('yls^base/equipment/src/brand-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)()], // 分页方法引入
      data: function data() {
          return {
              //模版主键
              funNode: 'BT011',
              nexusKey: 'Equip_Brand',
              brandListData: {},
              // 高级搜索
              // 搜索模板
              searchTemplate: {},
              // 条件列表
              conditionList: [],
              // 是否显示已选中标签
              showSelectedTags: true,
              // 当前打开的高级条件编号
              currentConditionCode: '',
              // 当前打开的高级条件内容
              currentCondition: null,
              //高级查询是否展示
              isHide: true,
              //快捷查询输入值
              search_input: '',
              //删除对话框
              delDialogVisible: false,
              //待删除数据id
              delId: '',
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      icon: 'search',
                      title: '查看'
                  }, {
                      title: '删除',
                      icon: 'delete'
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.request();
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          // 添加按钮
          addBrandInfo: function addBrandInfo() {
              // location.hash = '/quote/add';
  
              this.$emit('change-brand-list', 'add');
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message('搜索：' + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              this.$emit('change-brand-list', scope.row.pk_brand);
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_brand;
              this.delDialogVisible = true;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.$http({
                  url: _publicData.ylsBase + 'brand/deleteById',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this.$message({
                          message: '删除成功',
                          type: 'success'
                      });
                      _this.delDialogVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this.$message({
                      message: '信息删除失败！',
                      type: 'error'
                  });
              });
          },
  
          //后台请求
          request: function request() {
              var _this2 = this;
  
              var data = {
                  'orderList': [{
                      'direction': 'desc',
                      'property': 'ts'
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  'searchParams': {
                      'searchMap': {}
                  }
              };
              this.$http({
                  url: _publicData.ylsBase + 'brand/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  //brandList_table UI模板表格名称
                  if (res.data.success === true) {
                      var originalValue = res.data.data.content;
                      _this2.$refs['brandList-table'].setData('Brand_t', JSON.parse(JSON.stringify(originalValue)));
                      _this2.totalElements = res.data.data.totalElements; // 总条数
                  } else {
                      _this2.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this2.$message({
                      message: '信息获取失败',
                      type: 'error'
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--按钮区域-->\n  <div class='operator-container'>\n    <div class='fl'>\n      <h3 class='name'>厂牌列表</h3>\n      <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button>-->\n    </div>\n    <div class='fr'>\n      <el-input placeholder='测算编码/名称' v-model='search_input' icon='search'  @keyup.enter.native='searchInputEnterClick' :on-icon-click='searchInputEnterClick'></el-input>\n      <el-button type='text' @click='showSearch'>\n        高级  \n        <i class='el-icon-arrow-down' v-if='this.isHide'></i>\n        <i class='el-icon-arrow-up' v-if='!this.isHide'></i>\n      </el-button>\n      <el-button type='primary' class='button-no-radius' @click='addBrandInfo'> 新 增</el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class='advanced-search-panel' :class='{hide: isHide}'>\n  \n  </div>\n\n  <!-- 报价列表 -->\n <div id='brandList' class='list-main-container clearfix'>\n    <!--模板组件-->\n   <ifbp-template ref='brandList-table'\n                  tplId='brandList-template'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  :tplData='brandListData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page='currentPage'\n      :page-sizes='pageSizes'\n      :page-size='pageSize'\n      layout='total, sizes, prev, pager, next, jumper'\n      :total='totalElements'\n      @size-change='handleSizeChange'\n      @current-change='handleCurrentChange'\n      >\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n          <el-button @click='delDialogVisible = false'>取 消</el-button>\n          <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^base/equipment/src/equipMain.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _modelList = require('yls^base/equipment/src/model-list.vue');
  
  var _modelList2 = _interopRequireDefault(_modelList);
  
  var _modelDetail = require('yls^base/equipment/src/model-detail.vue');
  
  var _modelDetail2 = _interopRequireDefault(_modelDetail);
  
  var _seriesList = require('yls^base/equipment/src/series-list.vue');
  
  var _seriesList2 = _interopRequireDefault(_seriesList);
  
  var _seriesDetail = require('yls^base/equipment/src/series-detail.vue');
  
  var _seriesDetail2 = _interopRequireDefault(_seriesDetail);
  
  var _brandList = require('yls^base/equipment/src/brand-list.vue');
  
  var _brandList2 = _interopRequireDefault(_brandList);
  
  var _brandDetail = require('yls^base/equipment/src/brand-detail.vue');
  
  var _brandDetail2 = _interopRequireDefault(_brandDetail);
  
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
  
  exports["default"] = {
    components: {
      modelList: _modelList2["default"],
      modelDetail: _modelDetail2["default"],
      seriesList: _seriesList2["default"],
      seriesDetail: _seriesDetail2["default"],
      brandList: _brandList2["default"],
      brandDetail: _brandDetail2["default"]
    },
    data: function data() {
      return {
        activeName: 'first',
        modelType: true,
        modelMsg: '',
        seriesType: true,
        seriesMsg: '',
        brandType: true,
        brandMsg: ''
      };
    },
  
    methods: {
      handleClick: function handleClick(tab, event) {
        // 选中页面时刷新页面数据
        if (tab.$options.propsData.name == 'first') {
          this.$refs.tab1.request(this.$refs.tab1.currentPage - 1, this.$refs.tab1.size);
        } else if (tab.$options.propsData.name == 'second') {
          this.$refs.tab2.request(this.$refs.tab2.currentPage - 1, this.$refs.tab2.size);
        } else {
          this.$refs.tab3.request(this.$refs.tab3.currentPage - 1, this.$refs.tab3.size);
        }
      },
      changeModelList: function changeModelList(val) {
        if (val) {
          this.modelMsg = val;
          this.modelType = false;
        }
      },
      changeModelDetail: function changeModelDetail(val) {
        if (val) {
          this.modelType = true;
        }
      },
      changeSeriesList: function changeSeriesList(val) {
        if (val) {
          this.seriesMsg = val;
          this.seriesType = false;
        }
      },
      changeSeriesDetail: function changeSeriesDetail(val) {
        if (val) {
          this.seriesType = true;
        }
      },
      changeBrandList: function changeBrandList(val) {
        if (val) {
          this.brandMsg = val;
          this.brandType = false;
        }
      },
      changeBrandDetail: function changeBrandDetail(val) {
        if (val) {
          this.brandType = true;
        }
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<el-tabs id='equip-main' v-model='activeName' @tab-click='handleClick'>\n  <el-tab-pane label=' 型 号 ' name='first'>\n    <modelList ref='tab1' v-if='modelType' @change-model-list='changeModelList'></modelList>\n    <modelDetail v-if='!modelType' :model-msg='modelMsg' @change-model-detail='changeModelDetail'></modelDetail>\n  </el-tab-pane>\n\n  <el-tab-pane label=' 系 列 ' name='second'>\n    <seriesList ref='tab2' v-if='seriesType' @change-series-list='changeSeriesList'></seriesList>\n    <seriesDetail v-if='!seriesType' :series-msg='seriesMsg' @change-series-detail='changeSeriesDetail'></seriesDetail>\n  </el-tab-pane>\n\n  <el-tab-pane label=' 厂 牌 ' name='third'>\n    <brandList ref='tab3' v-if='brandType' @change-brand-list='changeBrandList'></brandList>\n    <brandDetail v-if='!brandType' :brand-msg='brandMsg' @change-brand-detail='changeBrandDetail'></brandDetail>\n  </el-tab-pane>\n</el-tabs>  \n"
  

});
 
 define('yls^base/equipment/src/model-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      var validateModel = function validateModel(rule, value, callback) {
        if (rule.field = 'model_name') {
          if (value == '') {
            callback(new Error('名称不能为空! '));
          } else {
            var fkBrand = oThis.$refs.baseTemplateRef.comp.$refs['model_form'].model.fk_brand;
            var fkSeries = oThis.$refs.baseTemplateRef.comp.$refs['model_form'].model.fk_series;
            var datam = {
              fkBrand: fkBrand,
              fkSeries: fkSeries,
              name: value
            };
            if (oThis.pk_model != '') {
              datam.pk = oThis.pk_model;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'model/isUnique',
              hearders: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(datam))
            }).then(function (res) {
              if (res.data.success === true) {
                if (res.data.data === true) {
                  callback();
                } else {
                  callback(new Error('型号已存在! '));
                }
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })["catch"](function () {
              callback(new Error('后台服务有误，请联系管理员！'));
            });
          }
        }
      };
      return {
        // 固定写法
        scrollDom: document.getElementsByClassName('view')[0],
        // 型号主键
        pk_model: '',
        // 页面标题
        title: '',
        // 型号主模板 baseTemplateRef start
        funNode: 'BT011',
        nexusKey: 'Equip_Model',
        tplData: {
          rules: { model_name: [{ validator: validateModel, trigger: 'blur' }] }
        },
        editable: true,
        tplResetFun: function tplResetFun($node) {
          //厂牌参照
          var $refNode = this.getNodeById($node, 'tsech3wodyb');
          if ($refNode.length) {
            $refNode.attr("v-on:trigger", "handleRefChange");
          }
        },
        t_Methods: {
          handleRefChange: function handleRefChange(type, data) {
            if (type === 'change') {
              var refParams = { 'key': data.value[0].id };
              oThis.$refs.baseTemplateRef.setData('series_param', refParams);
            }
          }
          // 型号主模板 baseTemplateRef end
        } };
    },
  
    props: ['modelMsg'],
    created: function created() {
      this.loadData();
    },
  
    methods: {
      // 返回按钮
      goBack: function goBack() {
        // window.history.back(-1);
        this.$emit('change-model-detail', 'swithToTable');
      },
  
      // 型号主模板 baseTemplateRef 事件处理 start
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.Model;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = void 0;
        this.$refs.baseTemplateRef.validate(function (valid) {
          if (valid) {
            if (_this.modelMsg == 'add') {
              url = _publicData.ylsBase + 'model/create';
            } else {
              url = _publicData.ylsBase + 'model/update';
            }
            _this.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: jsonData
            }).then(function (res) {
              if (res.data.success === true) {
                _this.$message({
                  message: '操作成功!',
                  type: 'success'
                });
                // this.editable = false;
                // let originalValue = res.data.data;
                // this.$refs['baseTemplateRef'].setData(
                // 'Model',
                // JSON.parse(JSON.stringify(originalValue))
                // );
                _this.$emit('change-model-detail', 'swithToTable');
              } else {
                _this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function (e) {
              _this.$message({
                message: '型号保存失败！',
                type: 'error'
              });
            });
          } else {
            _this.$message('校验未通过! ');
          }
        });
      },
  
      // 型号主模板 baseTemplateRef 事件处理 end
  
      // 加载数据方法
      loadData: function loadData() {
        // 判断modelMsg
        if (this.modelMsg == 'add') {
          this.title = '型号列表 > 型号新增';
        } else {
          this.title = '型号列表 > 型号变更';
          this.pk_model = this.modelMsg;
        }
        // 详情页面
        if (this.pk_model && this.pk_model != '') {
          // 加载型号信息
          this.loadModelDetail(this.pk_model);
        } else {
          this.editable = true;
        }
      },
  
      // 加载型号信息
      loadModelDetail: function loadModelDetail(pk_model) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'model/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_model
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this2.$refs['baseTemplateRef'].setData('Model', JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: '报价详情获取失败',
            type: 'error'
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!-- 主体区域 -->\n  <div class='detail-main-container clearfix'>\n    <div class='operator-container'>\n      <div class='fl'>\n        <h3 class='name'>{{ title }}</h3>\n      </div>\n      <div class='fr'>\n        <el-button type='default' class='button-no-radius' @click='goBack'> 取 消 </el-button>\n        <el-button type='primary' class='button-no-radius' @click='clickSave'> 保 存 </el-button>\n      </div>\n    </div>\n    <!-- 型号主模板 temp start -->\n    <ifbp-template ref='baseTemplateRef'\n                  tplId='baseTemplate'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  show-type='form'\n                  :tplResetFun='tplResetFun'\n                  :methods='t_Methods'\n                  :tplData='tplData'\n                  :editable='editable'>\n    </ifbp-template>\n    <!-- 型号主模板 temp end -->\n  </div>\n</div>\n"
  

});
 
 define('yls^base/equipment/src/model-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)()], // 分页方法引入
      data: function data() {
          return {
              //模版主键
              funNode: 'BT011',
              nexusKey: 'Equip_Model',
              searchTemplateCode: 'YLSCXMB_BASE_EQUIP',
              searchParameters: '',
              modelListData: {},
              //删除对话框
              delDialogVisible: false,
              //待删除数据id
              delId: '',
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      icon: 'search',
                      title: '查看'
                  }, {
                      title: '删除',
                      icon: 'delete'
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.request();
      },
  
      methods: {
          // 添加按钮
          handleSearch: function handleSearch(searchTemplate) {
              this.searchParameters = JSON.stringify(searchTemplate);
              this.request();
          },
          addModelInfo: function addModelInfo() {
              // location.hash = '/quote/add';
  
              this.$emit('change-model-list', 'add');
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              this.$emit('change-model-list', scope.row.pk_model);
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_model;
              this.delDialogVisible = true;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.$http({
                  url: _publicData.ylsBase + 'model/deleteById',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this.$message({
                          message: '删除成功',
                          type: 'success'
                      });
                      _this.delDialogVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this.$message({
                      message: '信息删除失败！',
                      type: 'error'
                  });
              });
          },
  
          //后台请求
          request: function request() {
              var _this2 = this;
  
              var data = {
                  'orderList': [{
                      'direction': 'desc',
                      'property': 'ts'
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  'searchParams': {
                      'searchMap': {
                          'qtAggVO': this.searchParameters
                      }
                  }
              };
              this.$http({
                  url: _publicData.ylsBase + 'model/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  if (res.data.success === true) {
                      var originalValue = res.data.data.content;
                      _this2.$refs['modelList-table'].setData('Model_t', JSON.parse(JSON.stringify(originalValue)));
                      _this2.totalElements = res.data.data.totalElements; // 总条数
                  } else {
                      _this2.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this2.$message({
                      message: '信息获取失败',
                      type: 'error'
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!-- 按钮区域 -->\n  <div class='operator-container'>\n    <div class='fl'>\n      <h3 class='name'>型号列表</h3>\n      <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button>-->\n    </div>\n    <div class='fr'>\n      <el-button type='primary' class='button-no-radius' @click='addModelInfo'> 新 增 </el-button>\n    </div>\n    <ifbp-search class='fr' :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    \n  </div>\n\n  <!-- 型号列表 -->\n <div id='modelList' class='list-main-container clearfix'>\n    <!--模板组件-->\n   <ifbp-template ref='modelList-table'\n                  tplId='modelList-template'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  :tplData='modelListData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page='currentPage'\n      :page-sizes='pageSizes'\n      :page-size='pageSize'\n      layout='total, sizes, prev, pager, next, jumper'\n      :total='totalElements'\n      @size-change='handleSizeChange'\n      @current-change='handleCurrentChange'\n      >\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n          <el-button @click='delDialogVisible = false'>取 消</el-button>\n          <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^base/equipment/src/series-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      var validateSeries = function validateSeries(rule, value, callback) {
        if (rule.field == 'series_name') {
          if (value === '') {
            callback(new Error('名称不能为空! '));
          } else {
            var fk = oThis.$refs.baseTemplateRef.comp.$refs['series_form'].model.fk_brand;
            var datam = {
              fk: fk,
              name: value
            };
            if (oThis.pk_series != '') {
              datam.pk = oThis.pk_series;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'series/isUnique',
              hearders: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(datam))
            }).then(function (res) {
              if (res.data.success === true) {
                if (res.data.data === true) {
                  callback();
                } else {
                  callback(new Error('系列已存在! '));
                }
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })["catch"](function () {
              callback(new Error('后台服务有误，请联系管理员！'));
            });
          }
        }
      };
      return {
        // 固定写法
        scrollDom: document.getElementsByClassName('view')[0],
        // 系列主键
        pk_series: '',
        // 页面标题
        title: '',
        // 系列主模板 baseTemplateRef start
        funNode: 'BT011',
        nexusKey: 'Equip_Series',
        tplData: {
          rules: { series_name: [{ validator: validateSeries, trigger: 'blur' }] }
        },
        editable: true
        // 系列主模板 baseTemplateRef end
      };
    },
  
    props: ['seriesMsg'],
    created: function created() {
      this.loadData();
    },
  
    methods: {
      // 返回按钮
      goBack: function goBack() {
        // window.history.back(-1);
        this.$emit('change-series-detail', 'swithToTable');
      },
  
      // 系列主模板 baseTemplateRef 事件处理 start
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.Series;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = void 0;
        this.$refs.baseTemplateRef.validate(function (valid) {
          if (valid) {
            if (_this.seriesMsg == 'add') {
              url = _publicData.ylsBase + 'series/create';
            } else {
              url = _publicData.ylsBase + 'series/update';
            }
            _this.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: jsonData
            }).then(function (res) {
              if (res.data.success === true) {
                _this.$message({
                  message: '操作成功!',
                  type: 'success'
                });
                // this.editable = false;
                // let originalValue = res.data.data;
                // this.$refs['baseTemplateRef'].setData(
                // 'Series',
                // JSON.parse(JSON.stringify(originalValue))
                // );
                _this.$emit('change-series-detail', 'swithToTable');
              } else {
                _this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function (e) {
              _this.$message({
                message: '系列保存失败！',
                type: 'error'
              });
            });
          } else {
            _this.$message('校验未通过! ');
          }
        });
      },
  
      // 系列主模板 baseTemplateRef 事件处理 end
  
      // 加载数据方法
      loadData: function loadData() {
        // 判断seriesMsg
        if (this.seriesMsg == 'add') {
          this.title = '系列列表 > 系列新增';
        } else {
          this.title = '系列列表 > 系列变更';
          this.pk_series = this.seriesMsg;
        }
        // 详情页面
        if (this.pk_series && this.pk_series != '') {
          // 加载系列信息
          this.loadSeriesDetail(this.pk_series);
        } else {
          this.editable = true;
        }
      },
  
      // 加载系列信息
      loadSeriesDetail: function loadSeriesDetail(pk_series) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'series/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_series
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this2.$refs['baseTemplateRef'].setData('Series', JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: '详情获取失败',
            type: 'error'
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!-- 主体区域 -->\n  <div class='detail-main-container clearfix'>\n    <div class='operator-container'>\n      <div class='fl'>\n        <h3 class='name'>{{ title }}</h3>\n      </div>\n      <div class='fr'>\n        <el-button type='default' class='button-no-radius' @click='goBack'> 取 消 </el-button>\n        <el-button type='primary' class='button-no-radius' @click='clickSave'> 保 存 </el-button>\n      </div>\n    </div>\n    <!-- 系列主模板 temp start -->\n    <ifbp-template ref='baseTemplateRef'\n                  tplId='baseTemplate'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  show-type='form'\n                  :tplData='tplData'\n                  :editable='editable'>\n    </ifbp-template>\n    <!-- 系列主模板 temp end -->\n  </div>\n</div>\n"
  

});
 
 define('yls^base/equipment/src/series-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)()], // 分页方法引入
      data: function data() {
          return {
              // 模版主键
              funNode: 'BT011',
              nexusKey: 'Equip_Series',
              seriesListData: {},
              // 高级搜索
              // 搜索模板
              searchTemplate: {},
              // 条件列表
              conditionList: [],
              // 是否显示已选中标签
              showSelectedTags: true,
              // 当前打开的高级条件编号
              currentConditionCode: '',
              // 当前打开的高级条件内容
              currentCondition: null,
              // 高级查询是否展示
              isHide: true,
              // 快捷查询输入值
              search_input: '',
              // 删除对话框
              delDialogVisible: false,
              // 待删除数据id
              delId: '',
              // showDeleteButton: true,
              // 操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  // 获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  // 定义操作
                  var operateArr = [{
                      icon: 'search',
                      title: '查看'
                  }, {
                      title: '删除',
                      icon: 'delete'
                  }];
                  // 获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.request();
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          // 添加按钮
          addSeriesInfo: function addSeriesInfo() {
              // location.hash = '/quote/add';
  
              this.$emit('change-series-list', 'add');
          },
  
          // 快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message('搜索：' + this.search_input);
          },
  
          // 查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              this.$emit('change-series-list', scope.row.pk_series);
          },
  
          // 删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_series;
              this.delDialogVisible = true;
          },
  
          // 删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.$http({
                  url: _publicData.ylsBase + 'series/deleteById',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this.$message({
                          message: '删除成功',
                          type: 'success'
                      });
                      _this.delDialogVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this.$message({
                      message: '信息删除失败！',
                      type: 'error'
                  });
              });
          },
  
          // 后台请求
          request: function request(n, s) {
              var _this2 = this;
  
              var data = {
                  'orderList': [{
                      'direction': 'desc',
                      'property': 'ts'
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  'searchParams': {
                      'searchMap': {}
                  }
              };
              this.$http({
                  url: _publicData.ylsBase + 'series/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  if (res.data.success === true) {
                      // seriesList_table UI模板表格名称
                      var originalValue = res.data.data.content;
                      _this2.$refs['seriesList-table'].setData('Series_t', JSON.parse(JSON.stringify(originalValue)));
                      _this2.totalElements = res.data.data.totalElements; // 总条数
                  } else {
                      _this2.$message({
                          message: res.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              })["catch"](function (e) {
                  _this2.$message({
                      message: '信息获取失败',
                      type: 'error'
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!-- 按钮区域 -->\n  <div class='operator-container'>\n    <div class='fl'>\n      <h3 class='name'>系列列表</h3>\n      <!-- <el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button> -->\n    </div>\n    <div class='fr'>\n      <el-input placeholder='测算编码/名称' v-model='search_input' icon='search'  @keyup.enter.native='searchInputEnterClick' :on-icon-click='searchInputEnterClick'></el-input>\n      <el-button type='text' @click='showSearch'>\n        高级  \n        <i class='el-icon-arrow-down' v-if='this.isHide'></i>\n        <i class='el-icon-arrow-up' v-if='!this.isHide'></i>\n      </el-button>\n      \n      <el-button type='primary' class='button-no-radius' @click='addSeriesInfo'> 新 增</el-button>\n    </div>\n  </div>\n\n  <!-- 高级搜索区域 -->\n  <div class='advanced-search-panel' :class='{hide: isHide}'>\n  \n  </div>\n\n  <!-- 报价列表 -->\n <div id='seriesList' class='list-main-container clearfix'>\n    <!-- 模板组件 -->\n   <ifbp-template ref='seriesList-table'\n                  tplId='seriesList-template'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  :tplData='seriesListData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!-- 分页组件 -->\n    <el-pagination\n      :current-page='currentPage'\n      :page-sizes='pageSizes'\n      :page-size='pageSize'\n      layout='total, sizes, prev, pager, next, jumper'\n      :total='totalElements'\n      @size-change='handleSizeChange'\n      @current-change='handleCurrentChange'\n      >\n    </el-pagination>\n\n    <!-- 删除确认Dialog -->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n          <el-button @click='delDialogVisible = false'>取 消</el-button>\n          <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});

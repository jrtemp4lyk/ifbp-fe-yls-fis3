 
 define('yls^base/inoutType/src/inoutTypeInfo/inoutType-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      var validateInoutType = function validateInoutType(rule, value, callback) {
        debugger;
        // 编码非空校验
        if (rule.field == 'inout_code') {
          if (value === '') {
            callback(new Error('编码不能为空! '));
          } else {
            var datam = {
              code: value
            };
            if (oThis.pk_inoutType != '') {
              datam.pk = oThis.pk_inoutType;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'inoutType/isUnique',
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
              callback(new Error("后台服务有误，请联系管理员！"));
            });
          }
        }
        // 名称非空校验
        if (rule.field == 'inout_name') {
          if (value === '') {
            callback(new Error('名称不能为空! '));
          } else {
            var _datam = {
              name: value
            };
            if (oThis.pk_inoutType != '') {
              _datam.pk = oThis.pk_inoutType;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'inoutType/isUnique',
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
              callback(new Error("后台服务有误，请联系管理员！"));
            });
          }
        }
      };
      return {
        scrollDom: document.getElementsByClassName('view')[0],
        pk_inoutType: '',
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            if (oThis.inoutTypeFormEdit === false) {
              oThis.inoutTypeFormEdit = true;
              // 备份数据
              var copyData = oThis.$refs.inoutTypeForm.comp.InoutType;
              oThis.copyForData = JSON.parse(JSON.stringify(copyData));
            } else {
              oThis.inoutTypeCancel();
            }
          }
        }],
        funNode: 'BT002',
        nexusKey: 'Inout_type',
        inoutTypeFormEdit: false,
        inoutTypeFormData: {
          rules: {
            inout_code: [{ validator: validateInoutType, trigger: 'blur' }],
            inout_name: [{ validator: validateInoutType, trigger: 'blur' }]
          }
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
  
    methods: {
      request: function request() {
        // debugger;
        this.pk_inoutType = this.$root.$router.currentRoute.params.id;
        // 如果是编辑请求, 则请求客户基本信息详情
        if (this.pk_inoutType && this.pk_inoutType != '') {
          this.requestInoutTypeInfo();
        } else {
          this.inoutTypeFormEdit = true;
        }
      },
      requestInoutTypeInfo: function requestInoutTypeInfo() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBase + 'inoutType/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_inoutType,
          dataType: 'json'
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this.$refs.inoutTypeForm.setData('InoutType', JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this.$message({
            message: '基本信息详情获取失败',
            type: 'error'
          });
        });
      },
      inoutTypeCancel: function inoutTypeCancel() {
        this.inoutTypeFormEdit = false;
        this.$refs.inoutTypeForm.setData('InoutType', this.copyForData);
      },
      inoutTypeConfirm: function inoutTypeConfirm() {
        var _this2 = this;
  
        debugger;
        var url = void 0;
        var baseUrl = _publicData.ylsBase + 'inoutType/';
        var data = this.$refs.inoutTypeForm.comp.InoutType;
        this.$refs.inoutTypeForm.validate(function (valid) {
          if (valid) {
            if (_this2.pk_inoutType) {
              url = baseUrl + 'update';
            } else {
              url = baseUrl + 'create';
            }
            _this2.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                debugger;
                _this2.originalValue = res.data.data;
                _this2.$refs.inoutTypeForm.setData('InoutType', JSON.parse(JSON.stringify(_this2.originalValue)));
                _this2.inoutTypeFormEdit = false;
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
          } else {
            _this2.$message('校验未通过! ');
          }
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <!-- 节点title -->\n  <div class='title-container'>\n    <h2 class='name'>收支信息设置</h2>\n  </div>\n\n  <!-- 主体区域 -->\n  <div class='detail-main-container clearfix'>\n    <ifbp-panel-group :navbar='true' :base-scroll-top='50' :scroll-dom='scrollDom' :base-nav-bar-top='125'>\n      <ifbp-panel id='basePanel' title='基本信息' :icons='baseIcons'>\n        <ifbp-template ref='inoutTypeForm'\n                      tpl-id='inoutTypeForm-id'\n                      :funnode='funNode'\n                      :nexuskey='nexusKey'\n                      :tpl-data='inoutTypeFormData'\n                      show-type='form'\n                      :editable='inoutTypeFormEdit'>\n        </ifbp-template>\n        <div class='form-button-div' v-if='inoutTypeFormEdit'>\n          <el-button type='default' class='button-no-radius' @click='inoutTypeCancel'>取消</el-button>\n          <el-button type='primary' class='button-no-radius' @click='inoutTypeConfirm'>保存</el-button>\n        </div>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^base/inoutType/src/inoutTypeInfo/inoutType-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    mounted: function mounted() {
      this.request();
    },
    data: function data() {
      return {
        funNode: 'BT002',
        nexusKey: 'Inout_type',
        inoutTypeTableData: {},
        searchTemplateCode: 'YLSCXMB_BASE_INOUTTYPE',
        searchParameters: '',
        delDialogVisible: false,
        inoutTypeTableResetFun: function inoutTypeTableResetFun($node) {
          var $table = $node.find('el-table');
          var operateArr = [{
            title: '查看',
            icon: 'search'
          }, {
            title: '删除',
            icon: 'delete'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
  
    methods: {
      handleSearch: function handleSearch(searchTemplate) {
        this.searchParameters = JSON.stringify(searchTemplate);
        this.request();
      },
  
      // table行的编辑操作
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = '/inoutType/detail/' + scope.row.pk_inout_type;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_inout_type;
      },
      addInoutTypeInfo: function addInoutTypeInfo() {
        location.hash = '/inoutType/add';
      },
      request: function request() {
        var _this = this;
  
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
          url: _publicData.ylsBase + 'inoutType/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          if (res.data.success === true) {
            _this.originalValue = res.data.data.content;
            _this.$refs['inoutType-table'].setData('InoutType_t', _this.originalValue);
            _this.totalElements = res.data.data.totalElements; // 总条数
          } else {
            _this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this2 = this;
  
        var delId = this.delId;
        this.$http({
          url: _publicData.ylsBase + 'inoutType/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: '删除成功',
              type: 'success'
            });
            _this2.delDialogVisible = false;
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: 'Network Error',
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <div class='title-container'>\n    <h2 class='name'>收支-全局</h2>\n  </div>\n\n  <div class='operator-container'>\n    <div class='fl'>\n      <el-button type='primary' class='button-no-radius' @click='addInoutTypeInfo'>新增</el-button>\n    </div>\n    <ifbp-search class='fr' :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n  </div>\n\n\n  <div class='list-main-container clearfix'>\n    <ifbp-template ref='inoutType-table'\n                  tpl-id='inoutType-table-id'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  :tpl-data='inoutTypeTableData'\n                  show-type='table'\n                  :tpl-reset-fun='inoutTypeTableResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick'>\n    </ifbp-template>\n\n    <el-pagination\n      @size-change='handleSizeChange'\n      @current-change='handleCurrentChange'\n      :current-page='currentPage'\n      :page-sizes='pageSizes'\n      :page-size='pageSize'\n      layout='total, sizes, prev, pager, next, jumper'\n      :total='totalElements'>\n    </el-pagination>\n\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？删除后无法恢复。</span>\n      <span slot='footer' class='dialog-footer'>\n        <el-button @click='delDialogVisible = false'>取 消</el-button>\n        <el-button type='primary' @click='deleteClick'>确 定</el-button>\n      </span>\n    </el-dialog>\n    \n  </div>\n</div>\n"
  

});

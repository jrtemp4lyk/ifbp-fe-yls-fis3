 
 define('yls^busi/iface/src/config/iface-config.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        valuemapListData: {},
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
        searchTemplateParam: {},
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'edit', title: "编辑" }, { icon: 'delete', title: '删除' }, { icon: 'more', title: '查看日志' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.valuemapForm.setData('InterfaceConfig', {});
        this.$refs.valuemapForm.formShow = true;
        this.$refs.valuemapForm.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.valuemapForm.validate(function (valid) {
          if (valid) {
            if (type === 'form' || type === 'table-form') {
              var formData = _this.$refs.valuemapForm.getData('InterfaceConfig');
              var url = _publicData.ylsBusi + 'iface/serviceconfig/create';
              if (type === 'table-form') {
                url = _publicData.ylsBusi + 'iface/serviceconfig/update';
              }
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  _this.$message({
                    message: '恭喜你，添加成功！',
                    type: 'success'
                  });
                  _this.templateTableFormCancel('form');
                  _this.request();
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.valuemapForm.formShow = false;
        } else {
          this.$refs.valuemapForm.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 编辑按钮
      tableFormEditClick: function tableFormEditClick(scope) {
        var row = scope.row;
        this.$refs.valuemapForm.getTableComp().expandRow(row);
        this.formEditable = true;
        this.$refs.valuemapForm.formShow = false;
        this.$refs.valuemapForm.setData('InterfaceConfig', row);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/serviceconfig/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "删除成功",
              type: "success"
            });
            _this2.delDialogVisible = false;
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      },
  
      // 查看日志
      logView: function logView(scope, rowIndex) {
        var configID = scope.row.pk_iface_name;
        this.$root.$router.push({ path: '/iface/servicelog/' + configID });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/serviceconfig/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.valuemapForm.setData('InterfaceConfig_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      接口服务配置\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"addInfo\" class=\"button-no-radius\" type=\"primary\">\n        新增\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 投放申请列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <!--模板组件-->\n    <ifbp-template :tpl-data=\"valuemapListData\" :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @edit-table-click=\"tableFormEditClick\" \n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      @more-table-click=\"logView\"\n      funnode=\"YLSBT004\" nexuskey=\"ylsifaceserviceconfig\" \n      ref=\"valuemapForm\" show-type=\"table-form\" \n      tplid=\"valuemap-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项映射配置？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/config/iface-service-log.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        curServiceConfig: {},
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_SERVICELOG",
        searchTemplateParam: {},
        formEditable: false,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: ""
      };
    },
    mounted: function mounted() {
      this.requestConfigEntity();
    },
  
    methods: {
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.valuemapForm.setData('InterfaceConfig', {});
        this.$refs.valuemapForm.formShow = true;
        this.$refs.valuemapForm.getTableComp().closeExpandRow();
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/serviceconfig/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.delDialogVisible = false;
            _this.request();
          } else {
            _this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      },
  
      // 查询接口实体
      requestConfigEntity: function requestConfigEntity() {
        var _this2 = this;
  
        var url = _publicData.ylsBusi + "iface/serviceconfig/getById";
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.$root.$router.currentRoute.params.configid,
          dataType: "json"
        }).then(function (res) {
          console.log(JSON.stringify(res));
          var originalValue = res.data.data;
          _this2.$refs.serviceconfigForm.setData('InterfaceConfig', originalValue);
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: "获取接口信息",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/servicelog/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.servicelog.setData('IfaceCallLog_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      接口服务日志\n    </h2>\n  </div>\n  <!-- 接口配置卡片 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n      </div>\n      <ifbp-panel id=\"basePanel\" title=\"接口信息\" :icons=\"baseIcons\">\n        <!--接口配置信息表单-->\n        <ifbp-template :editable=\"formEditable\"\n          funnode=\"YLSBT004\" nexuskey=\"ylsifaceserviceconfig\" \n          ref=\"serviceconfigForm\" show-type=\"form\" \n          tplid=\"service-config-template\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"basePanel\" title=\"接口日志信息\" :icons=\"baseIcons\">\n        <!--按钮区域-->\n        <div class=\"operator-container\">\n          <div class=\"fl\">\n            <el-button @click=\"addInfo\" class=\"button-no-radius\" type=\"primary\">\n              批量删除\n            </el-button>\n          </div>\n          <div class=\"fr\">\n            <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n          </div>\n        </div>\n        <!--模板组件-->\n        <ifbp-template\n          funnode=\"YLSBT005\" nexuskey=\"ylsserivcelog\" \n          ref=\"servicelog\" show-type=\"table\" tplid=\"service-log-template\">\n        </ifbp-template>\n        <div class=\"form-button-div\">\n          <!--分页组件-->\n          <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n                    :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n          </el-pagination>\n        </div>\n      </ifbp-panel>\n    </ifbp-panel-group>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项映射配置？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/dataval/iface-valuemap-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        valuemapListData: {},
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_VALUEMAP",
        searchTemplateParam: {},
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateHtml = this.getBaseTableOperateHtml();
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 添加按钮
      addValueMapInfo: function addValueMapInfo() {
        // 新增清空表单数据
        this.$refs.valuemapForm.setData('IfaceValueMap', {});
        this.$refs.valuemapForm.formShow = true;
        this.$refs.valuemapForm.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.valuemapForm.validate(function (valid) {
          if (valid) {
            if (type === 'form' || type === 'table-form') {
              var formData = _this.$refs.valuemapForm.getData('IfaceValueMap');
              var url = _publicData.ylsBusi + 'iface/valuemap/create';
              if (type === 'table-form') {
                url = _publicData.ylsBusi + 'iface/valuemap/update';
              }
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  _this.$message({
                    message: '恭喜你，添加成功！',
                    type: 'success'
                  });
                  _this.templateTableFormCancel('form');
                  _this.request();
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.valuemapForm.formShow = false;
        } else {
          this.$refs.valuemapForm.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 编辑按钮
      tableFormEditClick: function tableFormEditClick(scope) {
        var row = scope.row;
        this.$refs.valuemapForm.getTableComp().expandRow(row);
        this.formEditable = true;
        this.$refs.valuemapForm.formShow = false;
        this.$refs.valuemapForm.setData('IfaceValueMap', row);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_iface_value_map;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/valuemap/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "删除成功",
              type: "success"
            });
            _this2.delDialogVisible = false;
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/valuemap/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.valuemapForm.setData('IfaceValueMap_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      接口数据值映射\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"addValueMapInfo\" class=\"button-no-radius\" type=\"primary\">\n        新增\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 投放申请列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <!--模板组件-->\n    <ifbp-template :tpl-data=\"valuemapListData\" :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @edit-table-click=\"tableFormEditClick\" \n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      funnode=\"YLSBT001\" nexuskey=\"ifacevaluemap\" \n      ref=\"valuemapForm\" show-type=\"table-form\" \n      tplid=\"valuemap-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项映射配置？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-accasstype.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        editingIndex: null,
        deletingIndex: null,
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
        searchTemplateParam: {},
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'edit', title: "编辑" }, { icon: 'delete', title: '删除' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.accasstypeForm.setData('IfaceAccAssType', {});
        this.$refs.accasstypeForm.formShow = true;
        this.$refs.accasstypeForm.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.accasstypeForm.validate(function (valid) {
          if (valid) {
            if (type === 'form' || type === 'table-form') {
              var formData = _this.$refs.accasstypeForm.getData('IfaceAccAssType');
              var url = _publicData.ylsBusi + 'iface/accasstype/create';
              if (type === 'table-form') {
                url = _publicData.ylsBusi + 'iface/accasstype/update';
              }
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  if (type === 'table-form') {
                    _this.$message({
                      message: '修改预生成凭证辅助核算类型成功！',
                      type: 'success'
                    });
                    debugger;
                    var typeList = _this.$refs.accasstypeForm.getData('IfaceAccAssType_t');
                    _this.$set(typeList, _this.editingIndex, res.data.data);
                  } else {
                    _this.$message({
                      message: '添加预生成凭证辅助核算类型成功！',
                      type: 'success'
                    });
                    var typeList = _this.$refs.accasstypeForm.getData('IfaceAccAssType_t');
                    typeList.unshift(res.data.data);
                  }
                  _this.templateTableFormCancel(type);
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.accasstypeForm.formShow = false;
        } else {
          this.$refs.accasstypeForm.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 编辑按钮
      tableFormEditClick: function tableFormEditClick(scope) {
        this.editingIndex = scope.$index;
        var asstypeTempData = JSON.parse(JSON.stringify(scope.row)); //对象拷贝
        this.$refs.accasstypeForm.getTableComp().expandRow(scope.row);
        this.formEditable = true;
        this.$refs.accasstypeForm.formShow = false;
        this.$refs.accasstypeForm.setData('IfaceAccAssType', asstypeTempData);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.deletingIndex = scope.$index;
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/accasstype/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.delDialogVisible = false;
            _this2.$message({
              message: "预生成凭证辅助核算类型删除成功",
              type: "success"
            });
            var typeList = _this2.$refs.accasstypeForm.getData('IfaceAccAssType_t');
            typeList.splice(_this2.deletingIndex, 1);
            _this2.totalElements--;
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "发生异常,预生成凭证辅助核算类型删除失败!",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/accasstype/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.accasstypeForm.setData('IfaceAccAssType_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      预生成凭证辅助核算类别配置\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"addInfo\" class=\"button-no-radius\" type=\"primary\">\n        新增\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 预生成凭证辅助核类型别列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <!--模板组件-->\n    <ifbp-template :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @edit-table-click=\"tableFormEditClick\" \n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      funnode=\"YLSBT006\" nexuskey=\"ylsifaceasstype\" \n      ref=\"accasstypeForm\" show-type=\"table-form\" \n      tplid=\"accasstype-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项预生成凭证辅助核算类别？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-accname.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        editingIndex: null,
        deletingIndex: null,
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
        searchTemplateParam: {},
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'edit', title: "编辑" }, { icon: 'delete', title: '删除' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.accnameForm.setData('IfaceAccountName', {});
        this.$refs.accnameForm.formShow = true;
        this.$refs.accnameForm.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.accnameForm.validate(function (valid) {
          if (valid) {
            if (type === 'form' || type === 'table-form') {
              var formData = _this.$refs.accnameForm.getData('IfaceAccountName');
              var url = _publicData.ylsBusi + 'iface/accname/create';
              if (type === 'table-form') {
                url = _publicData.ylsBusi + 'iface/accname/update';
              }
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  if (type === 'table-form') {
                    _this.$message({
                      message: '修改预生成凭证科目信息成功！',
                      type: 'success'
                    });
                    debugger;
                    var typeList = _this.$refs.accnameForm.getData('IfaceAccountName_t');
                    _this.$set(typeList, _this.editingIndex, res.data.data);
                  } else {
                    _this.$message({
                      message: '添加预生成凭证科目信息成功！',
                      type: 'success'
                    });
                    var typeList = _this.$refs.accnameForm.getData('IfaceAccountName_t');
                    typeList.unshift(res.data.data);
                  }
                  _this.templateTableFormCancel(type);
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.accnameForm.formShow = false;
        } else {
          this.$refs.accnameForm.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 编辑按钮
      tableFormEditClick: function tableFormEditClick(scope) {
        this.editingIndex = scope.$index;
        var asstypeTempData = JSON.parse(JSON.stringify(scope.row)); //对象拷贝
        this.$refs.accnameForm.getTableComp().expandRow(scope.row);
        this.formEditable = true;
        this.$refs.accnameForm.formShow = false;
        this.$refs.accnameForm.setData('IfaceAccountName', asstypeTempData);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.deletingIndex = scope.$index;
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/accname/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.delDialogVisible = false;
            _this2.$message({
              message: "预生成凭证科目信息删除成功",
              type: "success"
            });
            var typeList = _this2.$refs.accnameForm.getData('IfaceAccountName_t');
            typeList.splice(_this2.deletingIndex, 1);
            _this2.totalElements--;
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "发生异常,预生成凭证科目信息删除失败!",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/accname/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.accnameForm.setData('IfaceAccountName_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      预生成凭证科目信息\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"addInfo\" class=\"button-no-radius\" type=\"primary\">\n        新增\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 预生成凭证科目信息列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <!--模板组件-->\n    <ifbp-template :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @edit-table-click=\"tableFormEditClick\" \n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      funnode=\"YLSBT008\" nexuskey=\"ylsifaceaccname\" \n      ref=\"accnameForm\" show-type=\"table-form\" \n      tplid=\"accname-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项预生成凭证科目信息？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-assdoc.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        editingIndex: null,
        deletingIndex: null,
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
        searchTemplateParam: {},
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'edit', title: "编辑" }, { icon: 'delete', title: '删除' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.assdocForm.setData('IfaceAssDoc', {});
        this.$refs.assdocForm.formShow = true;
        this.$refs.assdocForm.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.assdocForm.validate(function (valid) {
          if (valid) {
            if (type === 'form' || type === 'table-form') {
              var formData = _this.$refs.assdocForm.getData('IfaceAssDoc');
              var url = _publicData.ylsBusi + 'iface/assdoc/create';
              if (type === 'table-form') {
                url = _publicData.ylsBusi + 'iface/assdoc/update';
              }
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  if (type === 'table-form') {
                    _this.$message({
                      message: '修改预生成凭证辅助核算档案成功！',
                      type: 'success'
                    });
                    debugger;
                    var typeList = _this.$refs.assdocForm.getData('IfaceAssDoc_t');
                    _this.$set(typeList, _this.editingIndex, res.data.data);
                  } else {
                    _this.$message({
                      message: '添加预生成凭证辅助核算档案成功！',
                      type: 'success'
                    });
                    var typeList = _this.$refs.assdocForm.getData('IfaceAssDoc_t');
                    typeList.unshift(res.data.data);
                  }
                  _this.templateTableFormCancel(type);
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.assdocForm.formShow = false;
        } else {
          this.$refs.assdocForm.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 编辑按钮
      tableFormEditClick: function tableFormEditClick(scope) {
        this.editingIndex = scope.$index;
        var asstypeTempData = JSON.parse(JSON.stringify(scope.row)); //对象拷贝
        this.$refs.assdocForm.getTableComp().expandRow(scope.row);
        this.formEditable = true;
        this.$refs.assdocForm.formShow = false;
        this.$refs.assdocForm.setData('IfaceAssDoc', asstypeTempData);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.deletingIndex = scope.$index;
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/assdoc/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.delDialogVisible = false;
            _this2.$message({
              message: "预生成凭证辅助核算档案删除成功",
              type: "success"
            });
            var typeList = _this2.$refs.assdocForm.getData('IfaceAssDoc_t');
            typeList.splice(_this2.deletingIndex, 1);
            _this2.totalElements--;
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "发生异常,预生成凭证辅助核算档案删除失败!",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/assdoc/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.assdocForm.setData('IfaceAssDoc_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      预生成凭证辅助核算档案\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"addInfo\" class=\"button-no-radius\" type=\"primary\">\n        新增\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 预生成凭证辅助核档案列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <!--模板组件-->\n    <ifbp-template :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @edit-table-click=\"tableFormEditClick\" \n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      funnode=\"YLSBT007\" nexuskey=\"ylsifaceassdoc\" \n      ref=\"assdocForm\" show-type=\"table-form\" \n      tplid=\"assdoc-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项预生成凭证辅助核算档案？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-prevouchercard.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        curServiceConfig: {},
        formEditable: false,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: ""
      };
    },
    mounted: function mounted() {
      this.requestVoucherEntity();
    },
  
    methods: {
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.valuemapForm.setData('InterfaceConfig', {});
        this.$refs.valuemapForm.formShow = true;
        this.$refs.valuemapForm.getTableComp().closeExpandRow();
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/serviceconfig/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this.$message({
              message: "删除成功",
              type: "success"
            });
            _this.delDialogVisible = false;
            _this.request();
          } else {
            _this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      },
  
      // 查询凭证主表实体
      requestVoucherEntity: function requestVoucherEntity() {
        var _this2 = this;
  
        var url = _publicData.ylsBusi + "iface/serviceconfig/getById";
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.$root.$router.currentRoute.params.configid,
          dataType: "json"
        }).then(function (res) {
          console.log(JSON.stringify(res));
          var originalValue = res.data.data;
          _this2.$refs.serviceconfigForm.setData('InterfaceConfig', originalValue);
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: "获取接口信息",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/servicelog/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.servicelog.setData('IfaceCallLog_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      凭证明细\n    </h2>\n  </div>\n  <!-- 凭证卡片 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n      </div>\n      <ifbp-panel id=\"basePanel\" title=\"凭证信息\" :icons=\"baseIcons\">\n        <!--接口凭证主表表单-->\n        <ifbp-template :editable=\"formEditable\"\n          funnode=\"YLSBT010\" nexuskey=\"ylsifaceprevoucher\" \n          ref=\"prevoucherForm\" show-type=\"form\" \n          tplid=\"prevoucher-template\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"basePanel\" title=\"分录信息\" :icons=\"baseIcons\">\n        <!--凭证分录-->\n        <ifbp-template\n          funnode=\"YLSBT010\" nexuskey=\"ylsprevoucherdetail\" \n          ref=\"prevoucherdetailForm\" show-type=\"table\" tplid=\"prevoucherdetail-template\">\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该凭证分录？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-prevoucherdrools-dataitem.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    data: function data() {
      return {
        editingIndex: null,
        deletingIndex: null,
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'edit', title: "编辑" }, { icon: 'delete', title: '删除' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
    props: {
      droolsid: null
    },
    methods: {
      // 添加按钮
      addInfo: function addInfo() {
        // 新增清空表单数据
        this.$refs.droolsDataitemForm.setData('IfacePreVoucherDataItem', { pk_iface_prevuh_drools: this.droolsid });
        this.$refs.droolsDataitemForm.formShow = true;
        this.$refs.droolsDataitemForm.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.droolsDataitemForm.validate(function (valid) {
          if (valid) {
            if (type === 'form' || type === 'table-form') {
              var formData = _this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem');
              var url = _publicData.ylsBusi + 'iface/prevoucherdataitem/create';
              if (type === 'table-form') {
                url = _publicData.ylsBusi + 'iface/prevoucherdataitem/update';
              }
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  if (type === 'table-form') {
                    _this.$message({
                      message: '修改预生成凭证规则数据项成功！',
                      type: 'success'
                    });
                    var typeList = _this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem_t');
                    _this.$set(typeList, _this.editingIndex, res.data.data);
                  } else {
                    _this.$message({
                      message: '添加预生成凭证规则数据项成功！',
                      type: 'success'
                    });
                    var typeList = _this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem_t');
                    typeList.push(res.data.data);
                  }
                  _this.templateTableFormCancel(type);
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function (e) {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.droolsDataitemForm.formShow = false;
        } else {
          this.$refs.droolsDataitemForm.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 编辑按钮
      tableFormEditClick: function tableFormEditClick(scope) {
        this.editingIndex = scope.$index;
        var asstypeTempData = JSON.parse(JSON.stringify(scope.row)); //对象拷贝
        this.$refs.droolsDataitemForm.getTableComp().expandRow(scope.row);
        this.formEditable = true;
        this.$refs.droolsDataitemForm.formShow = false;
        this.$refs.droolsDataitemForm.setData('IfacePreVoucherDataItem', asstypeTempData);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.deletingIndex = scope.$index;
        this.delId = scope.row.pk_iface_prevuh_dataitem;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/prevoucherdataitem/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.delDialogVisible = false;
            _this2.$message({
              message: "预生成凭证规则数据项删除成功",
              type: "success"
            });
            var typeList = _this2.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem_t');
            typeList.splice(_this2.deletingIndex, 1);
            _this2.totalElements--;
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "发生异常,预生成凭证规则数据项删除失败!",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/prevoucherdataitem/listAllOfDrools";
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.droolsid,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs.droolsDataitemForm.setData('IfacePreVoucherDataItem_t', originalValue);
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"dataitem-panel\">\n  <div class=\"dataitem-tablepanel\" id=\"dataitemList\">\n    <div class=\"operator-container\">\n      <div class=\"fl\">\n        <el-button @click=\"addInfo\" class=\"button-no-radius\" type=\"primary\">\n          新增规则数据项\n        </el-button>\n      </div>\n    </div>\n    <!--规则数据项列表-->\n    <ifbp-template :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @edit-table-click=\"tableFormEditClick\" \n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      funnode=\"YLSBT009\" nexuskey=\"ylsprecouvherdataitem\" \n      ref=\"droolsDataitemForm\" show-type=\"table-form\" \n      tplid=\"droolsDataitem-template\">\n    </ifbp-template>\n  </div>\n  <!--删除确认Dialog-->\n  <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n    <span>\n      确认删除该项预生成凭证规则数据项？删除后无法恢复。\n    </span>\n    <span class=\"dialog-footer\" slot=\"footer\">\n      <el-button @click=\"delDialogVisible = false\">\n        取 消\n      </el-button>\n      <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n        确 定\n      </el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-prevoucherdrools-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _ifacePrevoucherdroolsDataitem = require('yls^busi/iface/src/fin/iface-prevoucherdrools-dataitem.vue');
  
  var _ifacePrevoucherdroolsDataitem2 = _interopRequireDefault(_ifacePrevoucherdroolsDataitem);
  
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
  //
  //
  //
  //
  //
  //
  //
  //
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
    data: function data() {
      var oThis = this;
      return {
        activeName: 'droolstab',
        droolsid: null,
        curDroolsEntity: {},
        formEditable: false,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editDroolsInfo();
          }
        }]
      };
    },
  
    components: {
      'iface-prevoucherdrools-dataitem': _ifacePrevoucherdroolsDataitem2["default"] //局部注册
    },
    mounted: function mounted() {
      this.requestVoucherEntity();
    },
  
    methods: {
      tabClick: function tabClick(tab, event) {
        if ('dataitemtab' === tab.name) {
          this.$refs.droolsdataitemref.request();
        }
      },
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 修改Drools
      editDroolsInfo: function editDroolsInfo() {
        this.formEditable = true;
      },
  
      // 取消编辑
      droolsCancel: function droolsCancel() {
        this.formEditable = false;
      },
  
      // 保存SQL
      saveMybatisSQL: function saveMybatisSQL() {
        var _this = this;
  
        this.$refs.sqlform.validate(function (valid) {
          if (valid) {
            var url = _publicData.ylsBusi + 'iface/prevoucherdrools/updateMybatisSql';
            _this.$http({
              url: url,
              method: 'POST',
              data: _this.curDroolsEntity,
              dataType: 'json'
            }).then(function (res) {
              if (res.data.success) {
                _this.$message({
                  message: '修改预生成凭证规则取数SQL成功！',
                  type: 'success'
                });
              } else {
                _this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this.$message({
                message: '修改修改预生成凭证规则取数SQL接口调用失败！',
                type: 'error'
              });
            });
          }
        });
      },
  
      // 保存修改
      droolsSave: function droolsSave() {
        var _this2 = this;
  
        this.$refs.prevoucherdroolsForm.validate(function (valid) {
          if (valid) {
            var formData = _this2.$refs.prevoucherdroolsForm.getData('IfacePrevoucherDrools');
            var url = _publicData.ylsBusi + 'iface/prevoucherdrools/update';
            _this2.$http({
              url: url,
              method: 'POST',
              data: formData,
              dataType: 'json'
            }).then(function (res) {
              if (res.data.success) {
                _this2.$message({
                  message: '修改预生成凭证生成规则成功！',
                  type: 'success'
                });
                _this2.droolsCancel();
              } else {
                _this2.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this2.$message({
                message: '修改预生成凭证生成规则接口调用失败！',
                type: 'error'
              });
            });
          }
        });
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_iface_name;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/prevoucherdrools/deleteById",
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
            _this3.delDialogVisible = false;
            _this3.request();
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      },
  
      // 查询凭证主表实体
      requestVoucherEntity: function requestVoucherEntity() {
        var _this4 = this;
  
        this.droolsid = this.$root.$router.currentRoute.params.droolsid;
        var url = _publicData.ylsBusi + "iface/prevoucherdrools/getById";
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.droolsid,
          dataType: "json"
        }).then(function (res) {
          console.log(JSON.stringify(res));
          _this4.curDroolsEntity = res.data.data;
          _this4.$refs.prevoucherdroolsForm.setData('IfacePrevoucherDrools', _this4.curDroolsEntity);
        })["catch"](function (e) {
          console.log(e);
          _this4.$message({
            message: "获取接口信息",
            type: "error"
          });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      预生成凭证规则明细\n    </h2>\n  </div>\n  <!-- 凭证卡片 -->\n  <div class=\"detail-main-container clearfix\">\n    <div class=\"detail-button-header\">\n      <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n    <el-tabs v-model=\"activeName\" type=\"card\" class=\"detail-tab\" @tab-click=\"tabClick\">\n      <el-tab-pane name=\"droolstab\" label=\"预生成凭证规则\">\n        <ifbp-panel id=\"basePanel\" title=\"预生成凭证规则基本信息\" :icons=\"baseIcons\">\n          <!--接口凭证主表表单-->\n          <ifbp-template :editable=\"formEditable\" :tpl-data=\"curDroolsEntity\"\n            funnode=\"YLSBT009\" nexuskey=\"ylsifacevoucherdrools\" \n            ref=\"prevoucherdroolsForm\" show-type=\"form\" \n            tplid=\"prevoucherdrools-template\">\n          </ifbp-template>\n          <div class=\"form-button-div\" v-show=\"formEditable\">\n            <el-button type=\"default\" class=\"button-no-radius\" @click=\"droolsCancel\">取消</el-button>\n            <el-button type=\"primary\" class=\"button-no-radius\" @click=\"droolsSave\">保存</el-button>\n          </div>\n        </ifbp-panel>\n      </el-tab-pane>\n      <el-tab-pane name=\"dataitemtab\" label=\"预生成凭证数据项\">\n        <div class=\"droolsdataitem-formpanel\">\n          <el-form ref=\"sqlform\" :model=\"curDroolsEntity\" label-width=\"80px\">\n            <el-form-item label=\"取数SQL\">\n              <el-input type=\"textarea\" :rows=\"4\" v-model=\"curDroolsEntity.mybatis_sql\"></el-input>\n            </el-form-item>\n            <el-form-item size=\"large\">\n              <el-button type=\"primary\" @click=\"saveMybatisSQL\">保存SQL</el-button>\n            </el-form-item>\n          </el-form>\n        </div>\n        <!--单据数据项-->\n        <iface-prevoucherdrools-dataitem :droolsid=\"droolsid\" ref=\"droolsdataitemref\"></iface-prevoucherdrools-dataitem>\n      </el-tab-pane>\n    </el-tabs>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该凭证分录？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-prevoucherdrools.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        deletingIndex: null,
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
        searchTemplateParam: {},
        formEditable: true,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'more', title: "凭证明细" }, { icon: 'delete', title: '删除' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 新增预生成凭证规则
      addDrools: function addDrools() {
        // 新增清空表单数据
        this.$refs.prevoucherdroolsList.setData('IfacePrevoucherDrools', {});
        this.$refs.prevoucherdroolsList.formShow = true;
        this.$refs.prevoucherdroolsList.getTableComp().closeExpandRow();
      },
  
      //表单保存
      templateTableFormConfirm: function templateTableFormConfirm(type) {
        var _this = this;
  
        this.$refs.prevoucherdroolsList.validate(function (valid) {
          if (valid) {
            if (type === 'form') {
              var formData = _this.$refs.prevoucherdroolsList.getData('IfacePrevoucherDrools');
              var url = _publicData.ylsBusi + 'iface/prevoucherdrools/create';
              _this.$http({
                url: url,
                method: 'POST',
                data: formData,
                dataType: 'json'
              }).then(function (res) {
                if (res.data.success) {
                  _this.$message({
                    message: '添加预生成凭证生成规则成功！',
                    type: 'success'
                  });
                  var droolsList = _this.$refs.prevoucherdroolsList.getData('IfacePrevoucherDrools_t');
                  droolsList.unshift(res.data.data);
                  _this.templateTableFormCancel(type);
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '接口调用失败！',
                  type: 'error'
                });
              });
            }
          }
        }, type);
      },
  
      // 表单取消
      templateTableFormCancel: function templateTableFormCancel(type) {
        if (type === 'form') {
          this.$refs.prevoucherdroolsList.formShow = false;
        } else {
          this.$refs.prevoucherdroolsList.getTableComp().closeExpandRow();
        }
      },
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 预生成凭证规则明细
      tableFormMoreClick: function tableFormMoreClick(scope) {
        var droolsid = scope.row.pk_iface_prevoucher_drools;
        this.$root.$router.push({ path: '/iface/prevoucherdroolsdetail/' + droolsid });
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.deletingIndex = scope.$index;
        this.delId = scope.row.pk_iface_prevoucher;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/prevoucherdrools/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.delDialogVisible = false;
            _this2.$message({
              message: "预生成凭证生成规则删除成功",
              type: "success"
            });
            var typeList = _this2.$refs.prevoucherList.getData('IfacePrevoucherDrools_t');
            typeList.splice(_this2.deletingIndex, 1);
            _this2.totalElements--;
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "发生异常,预生成凭证生成规则删除失败!",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "iface/prevoucherdrools/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this3.$refs.prevoucherdroolsList.setData('IfacePrevoucherDrools_t', originalValue);
          _this3.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      预生成凭证规则列表\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"addDrools\" class=\"button-no-radius\" type=\"primary\">\n        新增规则\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 预生成凭证规则列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <ifbp-template :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @more-table-click=\"tableFormMoreClick\"\n      @form-confirm-click=\"templateTableFormConfirm\"\n      @form-cancel-click=\"templateTableFormCancel\"\n      funnode=\"YLSBT009\" nexuskey=\"ylsifacevoucherdrools\" \n      ref=\"prevoucherdroolsList\" show-type=\"table-form\" \n      tplid=\"prevoucherdrools-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项预生成凭证规则？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/fin/iface-prevoucherlist.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页
    data: function data() {
      return {
        deletingIndex: null,
        // 查询模板编码
        searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
        searchTemplateParam: {},
        formEditable: false,
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //获取操作按钮html片段
          var operateArr = [{ icon: 'more', title: "凭证明细" }, { icon: 'delete', title: '删除' }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 导入凭证
      importVoucher: function importVoucher() {},
  
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
  
      // 凭证明细
      tableFormMoreClick: function tableFormMoreClick(scope) {
        var voucherid = scope.row.pk_iface_prevoucher;
        this.$root.$router.push({ path: '/iface/servicelog/' + voucherid });
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.deletingIndex = scope.$index;
        this.delId = scope.row.pk_iface_prevoucher;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/iface/prevoucher/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this.delDialogVisible = false;
            _this.$message({
              message: "预生成凭证删除成功",
              type: "success"
            });
            var typeList = _this.$refs.prevoucherList.getData('IfaceAccountName_t');
            typeList.splice(_this.deletingIndex, 1);
            _this.totalElements--;
          } else {
            _this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this.$message({
            message: "发生异常,预生成凭证删除失败!",
            type: "error"
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this2 = this;
  
        var url = _publicData.ylsBusi + "iface/prevoucher/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this2.$refs.prevoucherList.setData('IfaceAccountName_t', originalValue);
          _this2.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: "信息获取失败",
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">\n      预生成凭证列表\n    </h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button @click=\"importVoucher\" class=\"button-no-radius\" type=\"primary\">\n        导入凭证\n      </el-button>\n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n  <!-- 预生成凭证列表 -->\n  <div class=\"list-main-container\" id=\"quoteList\">\n    <!--模板组件-->\n    <ifbp-template :editable=\"formEditable\" \n      :tplResetFun=\"templateTableFormResetFun\"\n      @delete-table-click=\"tableDeleteClick\" \n      @more-table-click=\"tableFormMoreClick\"\n      funnode=\"YLSBT010\" nexuskey=\"ylsifaceprevoucher\" \n      ref=\"prevoucherList\" show-type=\"table\" \n      tplid=\"prevoucher-template\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"提示\" v-model=\"delDialogVisible\">\n      <span>\n        确认删除该项预生成凭证？删除后无法恢复。\n      </span>\n      <span class=\"dialog-footer\" slot=\"footer\">\n        <el-button @click=\"delDialogVisible = false\">\n          取 消\n        </el-button>\n        <el-button @click=\"deleteConfirmClick\" type=\"primary\">\n          确 定\n        </el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/iface/src/wechat/wechat-user.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('refreshPage')],
      mounted: function mounted() {
          this.refreshPage();
      },
      data: function data() {
          return {
              userListEditable: true,
              userListData: {},
              delUserDlgVisible: false,
              delUserId: null,
              editingIndex: null,
              deletingIndex: null,
              resetUserList: function resetUserList($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  //获取操作按钮html片段
                  var operateHtml = this.getBaseTableOperateHtml();
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
  
      methods: {
          refreshPage: function refreshPage() {
              var _this = this;
  
              this.$http.post(_publicData.ylsBusi + 'iface/wechat/users/page', {
                  pageNum: this.currentPage - 1,
                  pageSize: this.pageSize
              }).then(function (resp) {
                  if (resp.data.success) {
                      _this.$refs.wechatUserList.setData('WechatUserEntity_t', resp.data.data.content);
                      _this.totalElements = resp.data.data.totalElements;
                  }
              });
          },
          addUser: function addUser() {
              this.$refs.wechatUserList.resetFormData();
              this.$refs.wechatUserList.getTableComp().closeExpandRow();
              this.$refs.wechatUserList.formShow = true;
          },
          delUser: function delUser(scope) {
              this.deletingIndex = scope.$index;
              this.delUserId = scope.row.pk_wechat_user;
              this.delUserDlgVisible = true;
          },
          deleteConfirmClick: function deleteConfirmClick() {
              var _this2 = this;
  
              this.delUserDlgVisible = false;
              this.$http.post(_publicData.ylsBusi + 'iface/wechat/users/deleteById', this.delUserId, { headers: { 'Content-Type': 'text/plain' } }).then(function (resp) {
                  if (resp.data.success) {
                      _this2.userListData['WechatUserEntity_t'].splice(_this2.deletingIndex, 1);
                      _this2.totalElements--;
                  } else {
                      _this2.$message({
                          message: resp.data.error.errorMessage,
                          type: 'error'
                      });
                  }
              });
          },
          editUser: function editUser(scope) {
              this.editingIndex = scope.$index;
              this.$refs.wechatUserList.getTableComp().expandRow(scope.row);
              this.formEditable = true;
              this.$refs.wechatUserList.comp.formShow = false;
              this.$refs.wechatUserList.setData('WechatUserEntity', JSON.parse(JSON.stringify(scope.row)));
          },
          confirm: function confirm(type) {
              var _this3 = this;
  
              if (type === 'form') {
                  //新增
                  var newUser = this.$refs.wechatUserList.getData('WechatUserEntity');
                  this.$http.post(_publicData.ylsBusi + 'iface/wechat/users/create', newUser).then(function (resp) {
                      if (resp.data.success) {
                          _this3.$refs.wechatUserList.getData('WechatUserEntity_t').push(resp.data.data);
                          _this3.totalElements++;
                      } else {
                          _this3.$message({
                              message: resp.data.error.errorMessage,
                              type: 'error'
                          });
                      }
                  });
                  this.$refs.wechatUserList.comp.formShow = false;
              } else {
                  //修改
                  var user = this.$refs.wechatUserList.getData('WechatUserEntity');
                  this.$http.post(_publicData.ylsBusi + 'iface/wechat/users/update', user).then(function (resp) {
                      if (resp.data.success) {
                          var userList = _this3.$refs.wechatUserList.getData('WechatUserEntity_t');
                          _this3.$set(userList, _this3.editingIndex, resp.data.data);
                      } else {
                          _this3.$message({
                              message: resp.data.error.errorMessage,
                              type: 'error'
                          });
                      }
                  });
                  this.$refs.wechatUserList.getTableComp().closeExpandRow();
              }
          },
          cancel: function cancel(type) {
              if (type === 'form') {
                  this.$refs.wechatUserList.formShow = false;
              } else {
                  this.$refs.wechatUserList.getTableComp().closeExpandRow();
              }
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n    <!--按钮区域-->\n    <div class=\"operator-container\">\n        <el-button @click=\"addUser\" class=\"button-no-radius\" type=\"primary\">新增</el-button>\n    </div>\n    <!-- 列表区域 -->\n    <div class=\"list-main-container\">\n        <!-- 微信用户列表 -->\n        <ifbp-template :tpl-data=\"userListData\" :editable=\"userListEditable\" :tplResetFun=\"resetUserList\" @delete-table-click=\"delUser\"\n            @edit-table-click=\"editUser\" @form-confirm-click=\"confirm\" @form-cancel-click=\"cancel\" funnode=\"YLSBT002\" nexuskey=\"YLS-IFACE-WECHAT-USER\"\n            ref=\"wechatUserList\" show-type=\"table-form\">\n        </ifbp-template>\n        <!--分页组件-->\n        <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n            :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n        </el-pagination>\n    </div>\n    <!--删除确认Dialog-->\n    <el-dialog :modal=\"true\" size=\"tiny\" title=\"删除确认\" v-model=\"delUserDlgVisible\">\n        <span>\n            确认删除该微信用户？删除后无法恢复。\n        </span>\n        <span class=\"dialog-footer\" slot=\"footer\">\n            <el-button @click=\"delUserDlgVisible = false\">取 消</el-button>\n            <el-button @click=\"deleteConfirmClick\" type=\"primary\">确 定</el-button>\n        </span>\n    </el-dialog>\n</div>\n"
  

});

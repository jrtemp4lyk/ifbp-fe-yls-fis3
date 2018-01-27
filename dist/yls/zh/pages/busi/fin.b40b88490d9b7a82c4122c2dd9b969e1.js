 
 define('yls^busi/fin/src/bankflow/bankflow-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        delDialogVisible: false,
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //主键
        pk_bank_flow: "",
  
        // 银行到账主模板 baseTemplateRef start
        funnode: "BT017",
        nexusKey: "bankflow",
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 银行到账主模板 baseTemplateRef end
  
      };
    },
  
  
    attmData: {},
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.BankFlow_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = '';
        if (data.pk_bank_flow) {
          url = '/yls-busi-web/fin/bankflow/update';
        } else {
          url = '/yls-busi-web/fin/bankflow/create';
        }
        this.$http({
          url: url,
          method: "post",
          data: jsonData
        }).then(function (res) {
          _this.editable = false;
          var originalValue = res.data.data;
          _this.pk_bank_flow = res.data.data.pk_bank_flow;
          _this.$refs["baseTemplateRef"].setData("BankFlow_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_bank_flow = this.$root.$router.currentRoute.params.id;
        //详情页面
        if (this.pk_bank_flow && this.pk_bank_flow != "") {
          //加载银行到账信息
          this.loadfinbankflow(this.pk_bank_flow);
        } else {
          this.editable = true;
        }
      },
  
      //加载银行到账信息
      loadfinbankflow: function loadfinbankflow(pk_bank_flow) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/bankflow/getById",
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_bank_flow
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs['baseTemplateRef'].setData('BankFlow_f', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: '银行到账详情获取失败',
            type: 'error'
          });
        });
      },
      attmFormConfirm: function attmFormConfirm() {
        var _this3 = this;
  
        if (this.pk_bank_flow != null) {
          var data = this.$refs.BankFlow_f_ref.comp.BankFlow_f;
          data.pk_bank_flow = this.pk_bank_flow;
          var jsonData = JSON.parse(JSON.stringify(data));
          this.$http({
            url: "/yls-busi-web/fin/bankflow/create",
            method: "post",
            data: jsonData
          }).then(function (res) {
            if (res.data.success === true) {
              _this3.$message({
                message: "保存成功！",
                type: "success"
              });
              _this3.$refs.BankFlow_f_ref.comp.formShow = false;
              _this3.loadAttm(_this3.pk_bank_flow);
            } else {
              _this3.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this3.$message({
              message: "保存失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "",
            type: "error"
          });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">银行到账</h2>\n  </div>\n  \n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"false\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 银行对账单主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"银行到账\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  show-type=\"form\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 银行对账单主模板 temp end-->\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/bankflow/bankflow-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')], //分页方法引入
      data: function data() {
          return {
              funnode: "BT017",
              nexusKey: "bankflow",
              funnodeclass: "BT017",
              nexusKeyclass: "bankFlowClass",
  
              bankflowListData: {},
              bankflowClassifyListData: {
                  BankFlow_f: {
                      pk_dept_doc: ''
                  }
              },
              totalElements: '',
              // 高级搜索
              // 搜索模板
              searchTemplate: {},
              form: {
                  choice: ''
              },
              // 条件列表
              conditionList: [],
              // 是否显示已选中标签
              showSelectedTags: true,
              // 批量分类Dialog
              classifyDialogVisible: false,
              // 批量删除Dialog
              batchDelDialogVisible: false,
              // 当前打开的高级条件编号
              currentConditionCode: '',
              // 当前打开的高级条件内容
              currentCondition: null,
              //高级查询是否展示
              isHide: true,
              //快捷查询输入值
              search_input: "",
              //删除对话框
              delDialogVisible: false,
              //待删除数据id
              delId: "",
              showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  //定义操作
                  var operateArr = [{
                      icon: 'edit',
                      title: "编辑"
                  }, {
                      icon: 'search',
                      title: "查看"
                  }, {
                      title: "删除",
                      icon: "delete"
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.request(this.currentPage - 1, this.size);
      },
  
      methods: {
          // 添加按钮
          addInfo: function addInfo() {
              location.hash = "/bankflow/add";
          },
  
          // 批量复核
          batchCheck: function batchCheck() {
              var _this = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              //var checkIds = [];
              //if (tableSelections && tableSelections.length > 0) {
              //    tableSelections.forEach((item,index) => {
              //    checkIds[index]=item;
              //    });
              //}
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/batchCheck',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: tableSelections
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this.$message({
                          message: '复核成功',
                          type: 'success'
                      });
                      _this.request(_this.currentPage - 1, _this.size);
                  } else {
                      _this.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this.$message({
                      message: '复核失败！',
                      type: 'error'
                  });
              });
          },
  
          // 取消复核
          cancelCheck: function cancelCheck() {
              var _this2 = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/cancelCheck',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: tableSelections
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this2.$message({
                          message: '复核已取消',
                          type: 'success'
                      });
                      _this2.request(_this2.currentPage - 1, _this2.size);
                  } else {
                      _this2.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this2.$message({
                      message: '取消失败！',
                      type: 'error'
                  });
              });
          },
  
          // 批量分类
          batchClassify: function batchClassify() {
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  this.classifyDialogVisible = true;
              } else {
                  this.$message({
                      message: "至少选择一条进行分类！",
                      type: "error"
                  });
              }
          },
  
          // 批量分类确定
          batchClassifyConfirm: function batchClassifyConfirm() {
              var _this3 = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              var value = this.$refs.bankFlowClassifyRef.comp.BankFlow_f.pk_dept_doc;
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_bank_flow;
                  });
              }
              var oData = {
                  strArray: selIds,
                  pk: value
              };
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/batchClassify',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this3.$message({
                          message: '分类完成！',
                          type: 'success'
                      });
                      _this3.classifyDialogVisible = false;
                      _this3.request(_this3.currentPage - 1, _this3.size);
                  } else {
                      _this3.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this3.$message({
                      message: '分类失败！',
                      type: 'error'
                  });
              });
          },
  
          // 取消分类
          cancelClassify: function cancelClassify() {
              var _this4 = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              var data = {
                  strArray: tableSelections
              };
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/cancelClassify',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: tableSelections
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this4.$message({
                          message: '取消分类完成！',
                          type: 'success'
                      });
                      _this4.request(_this4.currentPage - 1, _this4.size);
                  } else {
                      _this4.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this4.$message({
                      message: '取消分类失败！',
                      type: 'error'
                  });
              });
          },
  
          // 导入
          imports: function imports() {
              location.hash = "/bankflow/add";
          },
  
          // 批量删除
          batchDelete: function batchDelete() {
              this.batchDelDialogVisible = true;
          },
  
          // 批量删除确定
          batchDeleteConfirm: function batchDeleteConfirm() {
              var _this5 = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_bank_flow;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/batchDelete',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this5.$message({
                          message: '删除成功！',
                          type: 'success'
                      });
                      _this5.batchDelDialogVisible = false;
                      _this5.request(_this5.currentPage - 1, _this5.size);
                  } else {
                      _this5.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this5.$message({
                      message: '删除失败！',
                      type: 'error'
                  });
              });
          },
  
          // 提交
          batchSubmit: function batchSubmit() {
              var _this6 = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/batchSubmit',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: tableSelections
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this6.$message({
                          message: '已提交！',
                          type: 'success'
                      });
                      _this6.delDialogVisible = false;
                      _this6.request(_this6.currentPage - 1, _this6.size);
                  } else {
                      _this6.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this6.$message({
                      message: '提交失败！',
                      type: 'error'
                  });
              });
          },
  
          // 取消提交
          cancelSubmit: function cancelSubmit() {
              var _this7 = this;
  
              var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_bank_flow;
                  });
              }
              var data = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/cancelSubmit',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: data
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this7.$message({
                          message: '已取消！',
                          type: 'success'
                      });
                      _this7.delDialogVisible = false;
                      _this7.request(_this7.currentPage - 1, _this7.size);
                  } else {
                      _this7.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this7.$message({
                      message: '取消失败！',
                      type: 'error'
                  });
              });
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/bankflow/detail/" + scope.row.pk_bank_flow;
          },
  
          //编辑按钮
          tableEditClick: function tableEditClick(scope) {
              location.hash = "/bankflow/detail/" + scope.row.pk_bank_flow;
          },
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_bank_flow;
              this.delDialogVisible = true;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this8 = this;
  
              this.$http({
                  url: '/yls-busi-web/fin/bankflow/deleteById',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this8.$message({
                          message: '删除成功',
                          type: 'success'
                      });
                      _this8.delDialogVisible = false;
                      _this8.request(_this8.currentPage - 1, _this8.size);
                  } else {
                      _this8.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this8.$message({
                      message: '信息删除失败！',
                      type: 'error'
                  });
              });
          },
  
          //后台请求
          request: function request(n, s) {
              var _this9 = this;
  
              var url;
              var baseUrl = "/yls-busi-web";
              url = baseUrl + '/fin/bankflow/page';
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  "pageNum": n,
                  "pageSize": s,
                  "searchParams": {
                      "searchMap": {}
                  }
              };
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this9.$refs["bankflow_table"].setData("BankFlow_f_t", JSON.parse(JSON.stringify(originalValue)));
                  _this9.totalElements = res.data.data.totalElements; // 总条数
                  console.log(res.data.data.size);
                  _this9.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  console.log(e);
                  _this9.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
  
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          /**
           * 高级搜索
          */
          // 设置选中
          selectConditionOption: function selectConditionOption(optionList, option, ctrltype) {
              var optionSelected = false;
              var options = optionList.options;
              if (option && option.selected) {
                  optionSelected = true;
              }
              if (ctrltype === 'DateComponent') {
                  if (!optionList.def_min_value && !optionList.def_max_value && !option) {
                      return;
                  }
                  if (optionList.def_min_value) {
                      optionList.def_min_value = this.formatDate(optionList.def_min_value);
                  }
                  if (optionList.def_max_value) {
                      optionList.def_max_value = this.formatDate(optionList.def_max_value);
                  }
              }
              for (var i = 0; i < options.length; i++) {
                  options[i].selected = false;
              }
              if (option) {
                  option.selected = !optionSelected;
                  optionList.def_min_value = null;
                  optionList.def_max_value = null;
                  this.setCurrentCondition();
              }
          },
  
          // 已选中日期格式整理
          formatSelectedDate: function formatSelectedDate(startDay, endDay) {
              var dateString = '';
              if (startDay && endDay) {
                  dateString = startDay + ' 至 ' + endDay;
              } else if (startDay) {
                  dateString = startDay + '之后';
              } else {
                  dateString = endDay + '之前';
              }
              return dateString;
          },
  
          // 整理date格式
          formatDate: function formatDate(time) {
              var date = new Date(time);
              return date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + ' ' + (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
          },
  
  
          // 取消选中
          cancelConditionSelection: function cancelConditionSelection(optionList) {
              var options = optionList.options;
              for (var i = 0; i < options.length; i++) {
                  options[i].selected = false;
              }
              optionList.def_min_value = null;
              optionList.def_max_value = null;
              this.setCurrentCondition();
          },
  
  
          // 设置当前选中的高级条件
          setCurrentCondition: function setCurrentCondition(condition) {
              if (!condition || this.currentConditionCode === condition.fieldcode) {
                  this.currentConditionCode = '';
                  this.currentCondition = null;
              } else {
                  this.currentConditionCode = condition.fieldcode;
                  this.currentCondition = condition;
              }
          },
          search: function search() {
              this.request();
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">银行到账</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n   \n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInfo\">新增</el-button> \n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"batchCheck\">批量复核</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"cancelCheck\">取消复核</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"batchClassify\">批量分类</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"cancelClassify\">取消分类</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"imports\">导入</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"batchDelete\">删除</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"batchSubmit\">提交</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"cancelSubmit\">取消提交</el-button>\n    \n    <div class=\"fr\">\n      <el-input placeholder=\"请选择交易日期\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n\n  <!-- 搜索参数 -->\n \n\n  <!-- 当前选中的条件选项 -->\n  \n</div>\n\n <!-- 银行到账列表 -->\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"bankflow_table\"\n                  tplId=\"bankflow-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"bankflowListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\"\n                  @edit-table-click=\"tableEditClick\" >\n    </ifbp-template>\n\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n    <!--批量删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"batchDelDialogVisible\"\n      @update:visible=\"val => batchDelDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除所选数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"batchDelDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"batchDeleteConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n      <!--批量分类Dialog-->        \n      <el-dialog title=\"请选择分类\" :visible.sync=\"classifyDialogVisible\" \n      @update:visible=\"val => classifyDialogVisible = val\" >\n      <ifbp-template ref=\"bankFlowClassifyRef\"\n                  tplId=\"bank_flow_class_id\"\n                  :funnode=\"funnodeclass\"\n                  :nexuskey=\"nexusKeyclass\"\n                  :tplData=\"bankflowClassifyListData\"\n                  show-type=\"form\"\n                  editable=\"true\"\n                   >\n      </ifbp-template>\n      <div slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"classifyDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"batchClassifyConfirm\">确 定</el-button>\n      </div>\n      </el-dialog>\n\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/bill-info/acceptbill_detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        //弹出窗口信息start
        //当前页
        loancurrentPage: 1,
        //每页显示个数选择器的选项设置
        loanpageSizes: window.pubPageSizes,
        //每页显示条目个数
        loansize: window.pubSize,
        //总条目数
        loantotalSize: 0,
        disabled: false,
        dialogTableVisible: false,
        //数据信息
        finpayinouttData: {},
        //弹出窗口end
        delDialogVisible: false,
        isShow: false,
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //签发汇票主键
        pk_accept_bill: "",
  
        // 签发汇票主模板 baseTemplateRef start
        tplData: {},
        InOutPlanData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }],
        // 签发汇票主模板 baseTemplateRef end
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          debugger;
          var $refNode = this.getNodeById($node, 'mrety870uin'); //获取汇票状态id
          if (oThis.pk_accept_bill !== undefined) {
            $refNode.attr("v-show:isShow", 'true'); //汇票状态显示
            if (oThis.eid == "2") {
              var $refNode1 = $node.find("el-money[v-model='AcceptBill.sign_money']"); //获取出票金额id
              $refNode1.attr("v-bind:disabled", 'editable'); //出票金额只读
              var $refNode2 = $node.find("el-money[v-model='AcceptBill.money']"); //获取贴现息id
              $refNode2.attr("v-bind:disabled", 'editable'); //贴现息只读
              var $refNode3 = $node.find("el-money[v-model='AcceptBill.infact_money']"); //获取实际回笼金额id
              $refNode3.attr("v-bind:disabled", 'editable'); //实际回笼金额只读
            }
          } else {
            $refNode.attr("v-show:isShow", 'false'); //汇票状态隐藏
          }
        },
        InOutPlanResetFun: function InOutPlanResetFun($node) {
          var $table = this.getNodeById($node, 'y8asz7au8a');
          // $table.attr(':show-header','true');
          var operateArr = [{
            title: '查看详情',
            icon: 'search'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.eid = this.$root.$router.currentRoute.params.eid;
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 前发汇票主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        debugger;
        var data1 = this.$refs.baseTemplateRef.comp.AcceptBill;
        var url = "";
        if (data1.pk_accept_bill) {
          url = _publicData.ylsBusi + "fin/acceptBill/update";
        } else {
          url = _publicData.ylsBusi + "fin/acceptBill/create";
        }
        this.$http({
          url: url,
          method: "post",
          data: data1
        }).then(function (res) {
          location.hash = '/acceptbill/list';
          _this.editable = false;
          var originalValue = res.data.data;
          _this.$refs["baseTemplateRef"].setData('AcceptBill_t', originalValue);
          _this.$message({
            message: '保存成功',
            type: 'success'
          });
        })["catch"](function (e) {
          _this.$message({
            message: '保存失败',
            type: 'error'
          });
        });
      },
  
      // 签发汇票主模板 baseTemplateRef 事件处理 end
  
      InOutPlanSearchTable: function InOutPlanSearchTable(scope) {
        this.$refs.InOutPlanRef.getTableComp().expandRow(scope.row);
        this.$refs.InOutPlanRef.comp.formShow = false;
        this.$refs.InOutPlanRef.setData('QuoteInoutPlan', scope.row);
  
        // // 备份数据
        // this.baseData = JSON.parse(JSON.stringify(scope.row));
        // this.baseEditIndex = scope.$index;
      },
  
  
      //加载信息
      loadData: function loadData() {
        if (!this.pk_accept_bill) {
          this.pk_accept_bill = this.$root.$router.currentRoute.params.id;
        }
        //详情页面
        if (this.pk_accept_bill) {
          //加载投放计划信息
          this.loadDemoInfo(this.pk_accept_bill);
          this.loadChildDemoInfo(this.pk_accept_bill);
        } else {
          this.editable = true;
        }
      },
  
      //加载信息
      loadDemoInfo: function loadDemoInfo(pk_accept_bill) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'fin/acceptBill/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_accept_bill
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs['baseTemplateRef'].setData('AcceptBill', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: '详情获取失败',
            type: 'error'
          });
        });
      },
  
      //加载信息
      loadChildDemoInfo: function loadChildDemoInfo(pk_accept_bill) {
        var _this3 = this;
  
        this.pk_bill = this.pk_accept_bill;
        this.$http({
          url: _publicData.ylsBusi + 'fin/signBill/getInOut',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_bill
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs['InOutPlanRef'].setData('QuoteInoutPlan_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this3.$message({
            message: '获取详情失败',
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n  <div class=\"main-panel\">\n    <!--节点title-->\n    <div class=\"title-container\">\n      <h2 class=\"name\">汇票详情</h2>\n    </div>\n    <!-- 主体区域 -->\n    <div class=\"detail-main-container clearfix\">\n      <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n        <div class=\"detail-button-header\">\n          <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n      </div>\n        <!-- 收付汇票主模板 temp start-->\n        <ifbp-panel id=\"basePanel\" title=\"收付汇票\" :icons=\"baseIcons\" >\n          <ifbp-template ref=\"baseTemplateRef\"\n                    tplId=\"baseTemplate\"\n                    funnode=\"BZ023\"\n                    nexuskey =\"AcceptBillDetail\"\n                    show-type=\"form\"\n                    :tplData=\"tplData\"\n                    :editable=\"editable\"\n\t\t    :methods=\"t_Methods\"\n                    :tplResetFun=\"templateTableFormResetFun\">\n          </ifbp-template>\n          <div class=\"form-button-div\" v-if=\"editable\">\n            <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n            <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n          </div>\n        </ifbp-panel>\n\n          <!-- 收支计划 temp start-->\n          <ifbp-panel id=\"InOutPlanPanel\" title=\"收支计划\">\n          <ifbp-template ref=\"InOutPlanRef\"\n                        tplId=\"InOutTemplate\"\n                        funnode=\"BZ023\"\n                        nexuskey=\"InOutPlanDetail\"\n                        show-type=\"table-form\"\n                        :tplData=\"InOutPlanData\"\n                        :tplResetFun=\"InOutPlanResetFun\"\n                        @search-table-click=\"InOutPlanSearchTable\"\n                        >\n          </ifbp-template>\n        </ifbp-panel>\n        <!-- 投放计划 temp end-->\n      </ifbp-panel-group>\n    </div>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/bill-info/acceptbill_list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pubPageMethods)()], //分页方法引入
    data: function data() {
      var oThis = this;
      return {
        funnode: "BZ023",
        nexusKey: "AcceptBill",
        //当前页
        currentPage: 1,
        //每页显示个数选择器的选项设置
        pageSizes: _publicData.pubPageSizes,
        //每页显示条目个数
        size: (0, _publicData.pubSizes)(),
        //总条目数
        totalSize: 0,
        AcceptBillListData: {},
        addDialogListData: {},
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: "",
        //删除对话框
        delDialogVisible: false,
        //核销确认弹出框
        verificationDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = this.getNodeById($node, '62nl30r5c6mhjbnamugf09hpvi');
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "变更"
          }, {
            title: '删除',
            icon: 'delete'
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        //操作按钮
        addDialogResetFun: function addDialogResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("62nl30r5c6mhjbnamugf09hpvi");
          //定义操作
          var operateArr = [];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.request(this.currentPage - 1, this.size);
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/acceptbill/detail/" + scope.row.pk_accept_bill + "/" + "1";
      },
  
      //变更按钮
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/acceptbill/detail/" + scope.row.pk_accept_bill + "/" + "2";
      },
  
      // 手工录入添加按钮
      addAcceptBillInfo: function addAcceptBillInfo() {
        location.hash = '/acceptbill/add';
      },
  
      //excel导入添加按钮
      addInfoByExcel: function addInfoByExcel() {
        alert("待开发");
      },
  
      //核销操作
      executeVerification: function executeVerification() {
        var _this = this;
  
        var tableSelections = this.$refs.acceptBill_table.getTableComp().getSelection();
        var ids = [];
        var flag = true;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            if (item.bill_status == 2) {
              _this.$message({
                message: "已核销汇票不允许再次核销",
                type: "error"
              });
              flag = false;
            }
            _this.selects[index] = item.pk_accept_bill;
          });
          if (flag) {
            this.verificationDialogVisible = true;
          }
        } else {
          this.$message({
            message: "至少选择一张汇票",
            type: "error"
          });
        }
      },
  
      //核销确认
      verificationConfirmClick: function verificationConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'fin/acceptBill/updateBillStatus',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.selects
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "核销成功",
              type: "success"
            });
            _this2.verificationDialogVisible = false;
            _this2.request(_this2.currentPage - 1, _this2.size);
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "核销失败",
            type: "error"
          });
        });
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.pk_accept_bill = scope.row.pk_accept_bill;
      },
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'fin/acceptBill/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.pk_accept_bill
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功",
              type: "success"
            });
            _this3.delDialogVisible = false;
            _this3.request(_this3.currentPage - 1, _this3.size);
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: "删除失败",
            type: "error"
          });
        });
      },
  
      //每页显示条数改变
      handleSizeChange: function handleSizeChange(sizeVal) {
        this.size = window.pageSize = sizeVal;
        var maxPage = Math.ceil(this.totalSize / sizeVal);
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
  
      //当前页发生改变
      handleCurrentChange: function handleCurrentChange(currVal) {
        this.currentPage = currVal;
        this.request(this.currentPage - 1, this.size);
      },
  
      //后台请求
      request: function request(n, s) {
        var _this4 = this;
  
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": n,
          "pageSize": s,
          "searchParams": {
            "searchMap": {
              "p_id": this.id
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'fin/acceptBill/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          //QuoteCalculator_table UI模板表格名称
          var originalValue = res.data.data.content;
          _this4.$refs['acceptBill_table'].setData('AcceptBill_t', originalValue);
          _this4.totalSize = res.data.data.totalElements; // 总条数
          _this4.size = res.data.data.size; // 每页的条数
        })["catch"](function (e) {
          _this4.$message({
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
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">收付汇票</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div>\n    <div class='fl'>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addAcceptBillInfo\">录入</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInfoByExcel\">excel导入</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"executeVerification\">核销</el-button>\n    </div>\n  </div>\n  <div class=\"fr\">\n    <el-input placeholder=\"请输入搜索关键字\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n    <el-button type=\"text\" @click=\"showSearch\">\n      高级\n      <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n      <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n    </el-button>\n  </div>\n</div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 汇票收付列表 -->\n <div id=\"signBillList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"acceptBill_table\"\n                  tplId=\"acceptBill-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"AcceptBillListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalSize\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n\n    <!--核销确认Dialog-->  \n    <el-dialog title=\"提示\" v-model=\"verificationDialogVisible\" @update:visible=\"val => verificationDialogVisible = val\" :modal=\"true\" size=\"tiny\">\n      <span>确认核销票据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"verificationDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"verificationConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n    \n    <!-- 删除确认Dialog -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/bill-info/signbill_detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        //弹出窗口信息start
        //当前页
        loancurrentPage: 1,
        //每页显示个数选择器的选项设置
        loanpageSizes: window.pubPageSizes,
        //每页显示条目个数
        loansize: window.pubSize,
        //总条目数
        loantotalSize: 0,
        disabled: false,
        dialogTableVisible: false,
        //数据信息
        finpayinouttData: {},
        //弹出窗口end
        delDialogVisible: false,
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //签发汇票主键
        pk_sign_bill: "",
        eid: "",
        // 签发汇票主模板 baseTemplateRef start
        tplData: {
          editable: false
        },
        InOutPlanData: {},
        //
        t_Methods: {},
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          var $refNode = this.getNodeById($node, 'zfvdmg14dq'); //获取汇票状态id
          if (oThis.pk_sign_bill !== undefined) {
            $refNode.attr("v-show:isShow", 'true'); //汇票状态显示
            if (oThis.eid == "2") {
              var $refNode1 = $node.find("el-money[v-model='SignBill.sign_money']"); //获取出票金额id
              $refNode1.attr("v-bind:disabled", 'editable'); //出票金额只读
              var $refNode2 = $node.find("el-money[v-model='SignBill.poundage']"); //获取手续费金额id
              $refNode2.attr("v-bind:disabled", 'editable'); //手续费金额只读
              var $refNode3 = $node.find("el-money[v-model='SignBill.guarantee_money']"); //获取保证金金额id
              $refNode3.attr("v-bind:disabled", 'editable'); //保证金金额只读
            }
          } else {
            $refNode.attr("v-show:isShow", 'false'); //汇票状态隐藏
          }
        },
  
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }],
        // 签发汇票主模板 baseTemplateRef end
  
        InOutPlanResetFun: function InOutPlanResetFun($node) {
          var $table = this.getNodeById($node, 'y8asz7au8a');
          // $table.attr(':show-header','true');
          var operateArr = [{
            title: '查看详情',
            icon: 'search'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.eid = this.$root.$router.currentRoute.params.eid;
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 签发汇票主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data1 = this.$refs.baseTemplateRef.comp.SignBill;
        var url = "";
        if (data1.pk_sign_bill) {
          url = _publicData.ylsBusi + "fin/signBill/update";
        } else {
          url = _publicData.ylsBusi + "fin/signBill/create";
        }
        this.$http({
          url: url,
          method: "post",
          data: data1
        }).then(function (res) {
          location.hash = '/signbill/list';
          _this.editable = false;
          var originalValue = res.data.data;
          _this.$refs["baseTemplateRef"].setData('SignBill_t', originalValue);
          _this.$message({
            message: '保存成功',
            type: 'success'
          });
        })["catch"](function (e) {
          _this.$message({
            message: '保存失败',
            type: 'error'
          });
        });
      },
  
      // 签发汇票主模板 baseTemplateRef 事件处理 end
  
      InOutPlanSearchTable: function InOutPlanSearchTable(scope) {
        this.$refs.InOutPlanRef.getTableComp().expandRow(scope.row);
        this.$refs.InOutPlanRef.comp.formShow = false;
        this.$refs.InOutPlanRef.setData('QuoteInoutPlan', scope.row);
  
        // // 备份数据
        // this.baseData = JSON.parse(JSON.stringify(scope.row));
        // this.baseEditIndex = scope.$index;
      },
  
  
      //加载信息
      loadData: function loadData() {
        if (!this.pk_sign_bill) {
          this.pk_sign_bill = this.$root.$router.currentRoute.params.id;
        }
        //详情页面
        if (this.pk_sign_bill) {
          //加载投放计划信息
          this.loadDemoInfo(this.pk_sign_bill);
          this.loadChildDemoInfo(this.pk_sign_bill);
        } else {
          this.editable = true;
        }
      },
  
      //加载信息
      loadDemoInfo: function loadDemoInfo(pk_sign_bill) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'fin/signBill/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_sign_bill
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs['baseTemplateRef'].setData('SignBill', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: '详情获取失败',
            type: 'error'
          });
        });
      },
  
  
      //加载信息
      loadChildDemoInfo: function loadChildDemoInfo(pk_sign_bill) {
        var _this3 = this;
  
        this.pk_bill = this.pk_sign_bill;
        this.$http({
          url: _publicData.ylsBusi + 'fin/signBill/getInOut',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_bill
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs['InOutPlanRef'].setData('QuoteInoutPlan_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this3.$message({
            message: '获取详情失败',
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">汇票详情</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 签发汇票主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"签发汇票\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BZ023\"\n                  nexuskey =\"SignBillDetail\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\"\n                  :methods=\"t_Methods\"\n                  :tplResetFun=\"templateTableFormResetFun\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n\n       <!-- 收支计划 temp start-->\n        <ifbp-panel id=\"InOutPlanPanel\" title=\"收支计划\">\n        <ifbp-template ref=\"InOutPlanRef\"\n                      tplId=\"InOutTemplate\"\n                      funnode=\"BZ023\"\n                      nexuskey=\"InOutPlanDetail\"\n                      show-type=\"table-form\"\n                      :tplData=\"InOutPlanData\"\n                      :tplResetFun=\"InOutPlanResetFun\"\n                      @search-table-click=\"InOutPlanSearchTable\"\n                      >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 投放计划 temp end-->\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/bill-info/signbill_list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pubPageMethods)()], //分页方法引入
    data: function data() {
      return {
        //签发汇票模板
        funnode: "BZ023",
        nexusKey: "SignBill",
        //收支计划模板
        funnodedialog: "BZ023",
        nexuskeydialog: "QuoteCalculator",
        //当前页
        currentPage: 1,
        //每页显示个数选择器的选项设置
        pageSizes: _publicData.pubPageSizes,
        //每页显示条目个数
        size: (0, _publicData.pubSizes)(),
        //总条目数
        totalSize: 0,
        SignBillListData: {},
        InOutDialogListData: {},
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: "",
        //新增按钮是否动态
        createType: false,
        //删除对话框
        delDialogVisible: false,
        //收支计划弹出框
        handInOutDialogVisible: false,
        //核销确认弹出框
        verificationDialogVisible: false,
        //待删除数据id
        delId: "",
        tableSelections: "",
        selects: [],
        //showDeleteButton: true,
        //签发汇票操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = this.getNodeById($node, 'qz4clr679u');
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "变更"
          }, {
            title: '删除',
            icon: 'delete'
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        //收支计划操作按钮
        addDialogResetFun: function addDialogResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = this.getNodeById($node, '7g1u2z54tiu');
          //定义操作
          var operateArr = [];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.request(this.currentPage - 1, this.size);
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/signbill/detail/" + scope.row.pk_sign_bill + "/" + "1";
      },
  
      // 手动录入添加按钮
      addSignBillInfo: function addSignBillInfo() {
        location.hash = '/signbill/add';
      },
  
      //excel导入添加按钮
      addInfoByExcel: function addInfoByExcel() {
        alert("待开发");
      },
  
      //关联计划
      linkPlan: function linkPlan() {
        var tableSelections = this.$refs.signBill_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
          this.addInoutPlanInfo(this.currentPage - 1, this.pageSize);
        } else {
          this.$message({
            message: "至少选择一条收支计划",
            type: "error"
          });
        }
      },
  
      //关联收支计划操作
      linkInOutPlan: function linkInOutPlan() {
        this.handInOutDialogVisible = true;
      },
  
      //核销操作
      executeVerification: function executeVerification() {
        var _this = this;
  
        var tableSelections = this.$refs.signBill_table.getTableComp().getSelection();
        var ids = [];
        var flag = true;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            if (item.bill_status == 2) {
              _this.$message({
                message: "已核销汇票不允许再次核销",
                type: "error"
              });
              flag = false;
            }
            _this.selects[index] = item.pk_sign_bill;
          });
          if (flag) {
            this.verificationDialogVisible = true;
          }
        } else {
          this.$message({
            message: "至少选择一张汇票",
            type: "error"
          });
        }
      },
  
      //核销确认
      verificationConfirmClick: function verificationConfirmClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'fin/signBill/updateBillStatus',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.selects
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "核销成功",
              type: "success"
            });
            _this2.verificationDialogVisible = false;
            _this2.request(_this2.currentPage - 1, _this2.size);
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "核销失败",
            type: "error"
          });
        });
      },
  
      //变更按钮
      tableExchangeClick: function tableExchangeClick(scope) {
        location.hash = "/signbill/detail/" + scope.row.pk_sign_bill + "/" + "2";
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.pk_sign_bill = scope.row.pk_sign_bill;
      },
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'fin/signBill/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.pk_sign_bill
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功",
              type: "success"
            });
            _this3.delDialogVisible = false;
            _this3.request(_this3.currentPage - 1, _this3.size);
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: "删除失败",
            type: "error"
          });
        });
      },
  
      //每页显示条数改变
      handleSizeChange: function handleSizeChange(sizeVal) {
        this.size = window.pageSize = sizeVal;
        var maxPage = Math.ceil(this.totalSize / sizeVal);
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
  
      //当前页发生改变
      handleCurrentChange: function handleCurrentChange(currVal) {
        this.currentPage = currVal;
        this.request(this.currentPage - 1, this.size);
      },
  
      //后台请求
      request: function request(n, s) {
        var _this4 = this;
  
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": n,
          "pageSize": s,
          "searchParams": {
            "searchMap": {
              "p_id": this.id
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'fin/signBill/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          //QuoteCalculator_table UI模板表格名称
          var originalValue = res.data.data.content;
          _this4.$refs['signBill_table'].setData('SignBill_t', originalValue);
          _this4.totalSize = res.data.data.totalElements; // 总条数
          _this4.size = res.data.data.size; // 每页的条数
        })["catch"](function (e) {
          console.log(e);
          _this4.$message({
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">签发汇票</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class='fl'>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addSignBillInfo\">录入</el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInfoByExcel\">excel导入</el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"linkInOutPlan\">关联付款计划</el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"executeVerification\">核销</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请输入搜索关键字\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 汇票签发列表 -->\n <div id=\"signBillList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"signBill_table\"\n                  tplId=\"signBill-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"SignBillListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @edit-table-click=\"tableExchangeClick\"\n                  @delete-table-click=\"tableDeleteClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalSize\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n    \n    <!--删除确认Dialog-->  \n    <el-dialog title=\"提示\" v-model=\"delDialogVisible\" @update:visible=\"val => delDialogVisible = val\" :modal=\"true\" size=\"tiny\">\n      <span>确认删除数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n     <!--核销确认Dialog-->  \n    <el-dialog title=\"提示\" v-model=\"verificationDialogVisible\" @update:visible=\"val => verificationDialogVisible = val\" :modal=\"true\" size=\"tiny\">\n      <span>确认核销票据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"verificationDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"verificationConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n      <!--收支计划Dialog-->  \n    <el-dialog title=\"收支计划\" v-model=\"handInOutDialogVisible\"\n    @update:visible=\"val => handInOutDialogVisible = val\" :modal=\"true\" size=\"large\">\n    <ifbp-template ref=\"InOutDialog\"\n            tplId=\"InOutDialogid\"\n            :funnode=\"funnodedialog\"\n            :nexuskey=\"nexuskeydialog\"\n            :tplData=\"InOutDialogListData\"\n            :tplResetFun=\"InOutDialogResetFun\"\n            show-type=\"table\" >\n    </ifbp-template>\n    <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"handInOutDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"handInOutDialogConfirm\">确 定</el-button>\n    </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/gatheraudit/gatheraudit-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        delDialogVisible: false,
        funnode: "BT019",
        nexusKey: "gatherAuditMain",
        nexusKeysub: "gatherAuditSub",
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //主键
        pk_gather_account: "",
  
        // 主模板 baseTemplateRef start
        tplData: {
          GatherAccount_f: {}
        },
        //是否编辑态
        editable: false,
        editablesub: false,
        // 主模板 baseTemplateRef end
  
        // 核销明细信息 gatherAuditSubRef start
        gatherAuditSubData: {
          GatherAuditPlan_t: []
        },
        gatherAuditSubResetFun: function gatherAuditSubResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(":show-header", "true");
          //定义操作
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
        },
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.GatherAccount_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = "";
        if (data.pk_gather_account) {
          url = "/yls-busi-web/fin/gatheraccount/update";
        } else {
          url = "/yls-busi-web/fin/gatheraccount/create";
        }
        this.$http({
          url: url,
          method: "post",
          data: jsonData
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.pk_gather_account = res.data.data.pk_gather_account;
          _this.$refs["baseTemplateRef"].setData("GatherAccount_f", JSON.parse(JSON.stringify(originalValue)));
          _this.loadData();
          _this.editable = false;
        })["catch"](function (e) {
          _this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
  
      // 主模板 baseTemplateRef 事件处理 end
  
      // 核销明细信息 gatherAuditSubRef 事件处理 start
      gatherAuditSubFormCancel: function gatherAuditSubFormCancel(tpe) {
        this.$refs.gatherAuditSubRef.getTableComp().closeExpandRow();
        this.$refs.gatherAuditSubRef.comp.formShow = false;
        this.$refs.gatherAuditSubRef.getTableComp().closeExpandRow();
        var gatherAuditSub = this.$refs.gatherAuditSubRef.getData("GatherAuditPlan_t");
        gatherAuditSub[this.baseEditIndex] = this.baseData;
        this.$refs.gatherAuditSubRef.setData("GatherAuditPlan_t", gatherAuditSub);
      },
  
      // 核销明细信息 gatherAuditSubRef 事件处理 end
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_gather_account = this.$root.$router.currentRoute.params.id;
        //详情页面
        if (this.pk_gather_account && this.pk_gather_account != "") {
          //加载到账单信息
          this.loadGatherAuditMain(this.pk_gather_account);
          this.loadGatherAuditSub(this.pk_gather_account);
        } else {
          this.editable = true;
        }
      },
  
      //加载核销主表信息
      loadGatherAuditMain: function loadGatherAuditMain(pk_gather_account) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/gatheraccount/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_gather_account
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("GatherAccount_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "收款信息获取失败",
            type: "error"
          });
        });
      },
  
      //加载核销明细信息
      loadGatherAuditSub: function loadGatherAuditSub(pk_gather_account) {
        var _this3 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/gatheraccount/getSubsById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_gather_account
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs["gatherAuditSubRef"].setData("GatherAuditPlan_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this3.$message({
            message: "核销明细信息获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">收款核销</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"false\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"收款核销\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 核销明细信息 temp start-->\n      <ifbp-panel id=\"gatherAuditSubPanel\" title=\"核销明细\" :icons=\"subBaseIcons\" >\n        <ifbp-template ref=\"gatherAuditSubRef\"\n                      tplId=\"gatherAuditSubTemplate\"\n                      :tplData=\"gatherAuditSubData\"\n                      :tplResetFun=\"gatherAuditSubResetFun\"\n                      :funnode=\"funnode\"\n                      :nexuskey =\"nexusKeysub\"\n                      :editable=\"editablesub\"\n                      show-type=\"table-form\" \n                      >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 核销明细信息 temp end-->\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/gatheraudit/gatheraudit-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')], //分页方法引入
      data: function data() {
          return {
              funnode: "BT019",
              nexusKey: "gatherAuditMain",
              funnodedialog: "BT019",
              nexuskeydialog: "addDialog",
  
              gatherAuditListData: {},
              addDialogListData: {},
              totalElements: '',
              // 高级搜索
              // 搜索模板
              searchTemplate: {},
              // 条件列表
              conditionList: [],
              // 是否显示已选中标签
              showSelectedTags: true,
              // 当前打开的高级条件编号
              currentConditionCode: "",
              // 当前打开的高级条件内容
              currentCondition: null,
              //高级查询是否展示
              isHide: true,
              //快捷查询输入值
              search_input: "",
              //删除对话框
              delDialogVisible: false,
              // 自动核销Dialog
              autoAddDialogVisible: false,
              // 手工核销Dialog
              handAddDialogVisible: false,
              // 暂挂账Dialog
              batchSignDialogVisible: false,
              // 取消暂挂账Dialog
              cancelSignDialogVisible: false,
              // 待区域确认Dialog
              regionConfirmDialogVisible: false,
              // 取消核销Dialog
              cancelCheckDialogVisible: false,
              // 提交Dialog
              submitDialogVisible: false,
              // 审核Dialog
              checkDialogVisible: false,
              //待删除数据id
              delId: "",
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  //定义操作
                  var operateArr = [{
                      icon: "search",
                      title: "查看"
                  }, {
                      title: '编辑',
                      icon: 'edit'
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              },
              //操作按钮
              addDialogResetFun: function addDialogResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  //定义操作
                  var operateArr = [];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.request(this.currentPage - 1, this.size);
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/gatheraudit/detail/" + scope.row.pk_gather_account;
          },
  
          //编辑按钮
          tableEditClick: function tableEditClick(scope) {
              location.hash = "/gatheraudit/detail/" + scope.row.pk_gather_account;
          },
          // 自动核销
          autoAdd: function autoAdd() {
              this.autoAddDialogVisible = true;
          },
  
          //自动核销确定
          autoAddConfirm: function autoAddConfirm() {
              var _this = this;
  
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/autoAdd',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json'
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this.$message({
                          message: '自动核销完毕！',
                          type: 'success'
                      });
                      _this.autoAddDialogVisible = false;
                      _this.request(_this.currentPage - 1, _this.size);
                  } else {
                      _this.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this.$message({
                      message: '自动核销失败！',
                      type: 'error'
                  });
              });
          },
  
          // 手工核销
          handAdd: function handAdd() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  this.addInoutPlanInfo(this.currentPage - 1, this.pageSize);
              } else {
                  this.$message({
                      message: "至少选择一条进行核销！",
                      type: "error"
                  });
              }
          },
  
          //点击手工核销按钮查看收支计划
          addInoutPlanInfo: function addInoutPlanInfo(n, s) {
              var _this2 = this;
  
              this.handAddDialogVisible = true;
              var url;
              var baseUrl = "/yls-busi-web";
              url = baseUrl + "/quote/inoutPlan/page";
              var data = {
                  orderList: [{
                      direction: "desc",
                      property: "ts"
                  }],
                  pageNum: n,
                  pageSize: s,
                  searchParams: {
                      searchMap: {}
                  }
              };
              this.$http({
                  url: url,
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs["addDialogRef"].setData("QuoteInoutPlan_t", JSON.parse(JSON.stringify(originalValue)));
              })["catch"](function (e) {
                  console.log(e);
                  _this2.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
  
          // 手工核销确定
          handAddDialogConfirm: function handAddDialogConfirm() {
              var _this3 = this;
  
              debugger;
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var subSelections = this.$refs.addDialogRef.getTableComp().getSelection();
              var selIds = [];
              var subIds = [];
              if (subSelections && subSelections.length > 0) {
                  subSelections.forEach(function (item, index) {
                      subIds[index] = item.pk_quote_inout_plan;
                  });
                  if (tableSelections && tableSelections.length > 0) {
                      tableSelections.forEach(function (item, index) {
                          selIds[index] = item.pk_gather_account;
                      });
                  }
                  var oData = {
                      strArray: selIds,
                      strArray2: subIds
                  };
                  this.$http({
                      url: '/yls-busi-web/fin/gatheraccount/handAdd',
                      headers: { 'Content-Type': 'application/json' },
                      method: 'post',
                      dataType: 'json',
                      data: oData
                  }).then(function (res) {
                      if (res.data.success === true) {
                          _this3.$message({
                              message: '核销完成！',
                              type: 'success'
                          });
                          _this3.handAddDialogVisible = false;
                          _this3.request(_this3.currentPage - 1, _this3.size);
                      } else {
                          _this3.$message({
                              message: res.data.msg,
                              type: "error"
                          });
                      }
                  })["catch"](function (e) {
                      _this3.$message({
                          message: '核销失败！',
                          type: 'error'
                      });
                  });
              } else {
                  this.$message({
                      message: "未关联收支计划！",
                      type: "error"
                  });
              }
          },
  
          // 暂挂账
          sign: function sign() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  this.batchSignDialogVisible = true;
              } else {
                  this.$message({
                      message: "至少选择一条进行暂挂账处理！",
                      type: "error"
                  });
              }
          },
  
          // 暂挂账确定
          batchSignConfirm: function batchSignConfirm() {
              var _this4 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/sign',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this4.$message({
                          message: '挂账完成！',
                          type: 'success'
                      });
                      _this4.batchSignDialogVisible = false;
                      _this4.request(_this4.currentPage - 1, _this4.size);
                  } else {
                      _this4.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this4.$message({
                      message: '挂账失败！',
                      type: 'error'
                  });
              });
          },
  
          // 待区域确认
          regionConfirm: function regionConfirm() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  this.regionConfirmDialogVisible = true;
              } else {
                  this.$message({
                      message: "请选择确认信息！",
                      type: "error"
                  });
              }
          },
  
          // 待区域确认
          regionConfirmBtn: function regionConfirmBtn() {
              var _this5 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/regionConfirm',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this5.$message({
                          message: '已确认！',
                          type: 'success'
                      });
                      _this5.regionConfirmDialogVisible = false;
                      _this5.request(_this5.currentPage - 1, _this5.size);
                  } else {
                      _this5.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this5.$message({
                      message: '确认失败！',
                      type: 'error'
                  });
              });
          },
  
          // 取消暂挂账
          cancelSign: function cancelSign() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  this.cancelSignDialogVisible = true;
              } else {
                  this.$message({
                      message: "至少选择一条取消！",
                      type: "error"
                  });
              }
          },
  
          // 取消暂挂账确定
          cancelSignConfirm: function cancelSignConfirm() {
              var _this6 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/cancelSign',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this6.$message({
                          message: '已取消挂账！',
                          type: 'success'
                      });
                      _this6.cancelSignDialogVisible = false;
                      _this6.request(_this6.currentPage - 1, _this6.size);
                  } else {
                      _this6.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this6.$message({
                      message: '取消挂账失败！',
                      type: 'error'
                  });
              });
          },
  
          // 取消关联
          cancelAdd: function cancelAdd() {
              this.cancelCheck();
          },
  
          // 取消核销
          cancelCheck: function cancelCheck() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  this.cancelCheckDialogVisible = true;
              } else {
                  this.$message({
                      message: "至少选择一条取消！",
                      type: "error"
                  });
              }
          },
  
          // 取消核销确定
          cancelCheckConfirm: function cancelCheckConfirm() {
              var _this7 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/cancelCheck',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this7.$message({
                          message: '已取消！',
                          type: 'success'
                      });
                      _this7.cancelCheckDialogVisible = false;
                      _this7.request(_this7.currentPage - 1, _this7.size);
                  } else {
                      _this7.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this7.$message({
                      message: '取消核销失败！',
                      type: 'error'
                  });
              });
          },
  
          // 提交
          submit: function submit() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length === 1) {
                  this.submitDialogVisible = true;
              } else {
                  this.$message({
                      message: "请选择一条数据！",
                      type: "error"
                  });
              }
          },
  
          // 提交确定
          submitConfirm: function submitConfirm() {
              var _this8 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/submit',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this8.$message({
                          message: '已提交！',
                          type: 'success'
                      });
                      _this8.submitDialogVisible = false;
                      _this8.request(_this8.currentPage - 1, _this8.size);
                  } else {
                      _this8.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this8.$message({
                      message: '提交失败！',
                      type: 'error'
                  });
              });
          },
  
          // 审核
          check: function check() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length === 1) {
                  this.checkDialogVisible = true;
              } else {
                  this.$message({
                      message: "请选择一条数据！",
                      type: "error"
                  });
              }
          },
  
          // 审核确定
          checkConfirm: function checkConfirm() {
              var _this9 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/check',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this9.$message({
                          message: '审核通过！',
                          type: 'success'
                      });
                      _this9.checkDialogVisible = false;
                      _this9.request(_this9.currentPage - 1, _this9.size);
                  } else {
                      _this9.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this9.$message({
                      message: '审核失败！',
                      type: 'error'
                  });
              });
          },
  
          // 联查凭证
          checkVouch: function checkVouch() {
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              if (tableSelections && tableSelections.length === 1) {
                  this.checkVouchConfirm();
              } else {
                  this.$message({
                      message: "请选择一条数据！",
                      type: "error"
                  });
              }
          },
  
          // 联查凭证确定
          checkVouchConfirm: function checkVouchConfirm() {
              var _this10 = this;
  
              var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
              var selIds = [];
              if (tableSelections && tableSelections.length > 0) {
                  tableSelections.forEach(function (item, index) {
                      selIds[index] = item.pk_gather_account;
                  });
              }
              var oData = {
                  strArray: selIds
              };
              this.$http({
                  url: '/yls-busi-web/fin/gatheraccount/checkVouch',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  dataType: 'json',
                  data: oData
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this10.request(_this10.currentPage - 1, _this10.size);
                  } else {
                      _this10.$message({
                          message: res.data.msg,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  _this10.$message({
                      message: '暂无凭证！',
                      type: 'error'
                  });
              });
          },
  
          //每页显示条数改变
          handleSizeChange: function handleSizeChange(sizeVal) {
              this.size = window.pageSize = sizeVal;
              var maxPage = Math.ceil(this.totalSize / sizeVal);
              if (maxPage >= this.currentPage) {
                  this.request(this.currentPage - 1, this.size);
              }
          },
  
          //当前页发生改变
          handleCurrentChange: function handleCurrentChange(currVal) {
              this.currentPage = currVal;
              this.request(this.currentPage - 1, this.size);
          },
  
          //后台请求
          request: function request(n, s) {
              var _this11 = this;
  
              var url;
              var baseUrl = "/yls-busi-web";
              url = baseUrl + "/fin/gatheraccount/page";
              var data = {
                  orderList: [{
                      direction: "desc",
                      property: "ts"
                  }],
                  pageNum: n,
                  pageSize: s,
                  searchParams: {
                      searchMap: {}
                  }
              };
              this.$http({
                  url: url,
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  // UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this11.$refs["gatherAudit_table"].setData("GatherAccount_t", JSON.parse(JSON.stringify(originalValue)));
                  _this11.totalElements = res.data.data.totalElements; // 总条数
                  console.log(res.data.data.size);
                  _this11.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  console.log(e);
                  _this11.$message({
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">收款核销</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"autoAdd\">自动核销</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"handAdd\">手工核销</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"cancelAdd\">取消关联</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"cancelCheck\">取消核销</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"sign\">暂挂账</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"cancelSign\">取消暂挂账</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"regionConfirm\">待区域确认</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"submit\">提交</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"check\">复核</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"checkVouch\">联查凭证</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"xxxx\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 收款核销列表 -->\n <div id=\"gatherAuditList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"gatherAudit_table\"\n                  tplId=\"gatherAudit-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"gatherAuditListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @edit-table-click=\"tableEditClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <!--自动核销Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"autoAddDialogVisible\"\n      @update:visible=\"val => autoAddDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>是否确定自动核销？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"autoAddDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"autoAddConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n    <!--手工核销Dialog-->  \n    <el-dialog title=\"手工核销\" v-model=\"handAddDialogVisible\"\n    @update:visible=\"val => handAddDialogVisible = val\" :modal=\"true\" size=\"large\">\n    <ifbp-template ref=\"addDialogRef\"\n            tplId=\"addDialogid\"\n            :funnode=\"funnodedialog\"\n            :nexuskey=\"nexuskeydialog\"\n            :tplData=\"addDialogListData\"\n            :tplResetFun=\"addDialogResetFun\"\n            show-type=\"table\" >\n    </ifbp-template>\n    <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"handAddDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"handAddDialogConfirm\">确 定</el-button>\n    </span>\n    </el-dialog>\n    \n    <!--暂挂账确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"batchSignDialogVisible\"\n      @update:visible=\"val => batchSignDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认挂账所选数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"batchSignDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"batchSignConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n    \n    <!--取消暂挂账确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"cancelSignDialogVisible\"\n      @update:visible=\"val => cancelSignDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认取消暂挂账？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"cancelSignDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"cancelSignConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n    \n    <!--待区域确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"regionConfirmDialogVisible\"\n      @update:visible=\"val => regionConfirmDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认该笔收款？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"regionConfirmDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"regionConfirmBtn\">确 定</el-button>\n      </span>\n     </el-dialog>\n    \n    <!--取消核销确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"cancelCheckDialogVisible\"\n      @update:visible=\"val => cancelCheckDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认取消所选数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"cancelCheckDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"cancelCheckConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n    \n    <!--审核确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"checkDialogVisible\"\n      @update:visible=\"val => checkDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认审核该条数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"checkDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"checkConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n    \n    <!--提交确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"submitDialogVisible\"\n      @update:visible=\"val => submitDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认提交该条数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"submitDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"submitConfirm\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-detail-info-decuted-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        //数据信息
        dialogrefData: {},
        search_input: ''
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/quote/inoutPlan/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("payinoutfrom_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      },
      search: function search() {},
      close: function close() {
        this.$emit("dialogreturn", this.change);
      },
      addMain: function addMain() {
        var _this2 = this;
  
        var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
        var ids = [];
        var pk = this.sourcebill;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_quote_inout_plan;
          });
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/deducted/addDeducted",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "添加成功",
                type: "success"
              });
              _this2.change = true;
              _this2.close();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "添加失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要增加的数据",
            type: "error"
          });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"111合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <!-- <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n      </div>  -->\n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT013\"\n                  nexuskey =\"payinoutfrom\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\">\n      </ifbp-template>\n      <div class=\"fr\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <div >\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n      </div>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-detail-info-decuted.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    data: function data() {
      var oThis = this;
      return {
        dialogTableVisible: false,
        delDialogVisible: false,
        //投放计划主键
        pk_loan_cont_info: this.sourcebill,
        tplData: {},
  
        // 内扣信息 findeductedRef start
        findeductedData: {},
        findeductedResetFun: function findeductedResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(":show-header", "true");
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
        },
        //内扣信息添加
        findeductedPlusIcons: [{
          icon: "plus",
          click: function click() {
            // 关闭table中的编辑区
            oThis.$refs.findeductedRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.findeductedRef.resetFormData();
            // 显示新增区域
            oThis.$refs.findeductedRef.comp.formShow = true;
          }
        }, {
          icon: "share",
          click: function click() {
            oThis.addloan();
          }
        }, {
          icon: "delete",
          click: function click() {
            oThis.deleteloan();
          }
        }]
      };
    },
  
    methods: {
      Refresh: function Refresh() {
        this.$emit("dialogreturn");
      },
      open: function open() {
        this.$emit("openreturn");
      },
  
      // 内扣信息 findeductedRef 事件处理 start
      findeductedFormConfirm: function findeductedFormConfirm() {
        var _this = this;
  
        if (this.pk_loan_cont_info != null) {
          var data = this.$refs.findeductedRef.comp.Deducted_f;
          data.pk_loan_cont_info = this.pk_loan_cont_info;
          var jsonData = JSON.parse(JSON.stringify(data));
          var url = "";
          if (data.pk_fin_deducted) {
            url = _publicData.ylsBusi + "fin/deducted/update";
          } else {
            url = _publicData.ylsBusi + "fin/deducted/create";
          }
          this.$http({
            url: url,
            // headers: {'Content-Type': 'application/json'},
            method: "post",
            data: jsonData
          }).then(function (res) {
            if (res.data.success === true) {
              _this.$message({
                message: "保存成功！",
                type: "success"
              });
              _this.$refs.findeductedRef.comp.formShow = false;
              _this.Refresh();
            } else {
              _this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this.$message({
              message: "内扣信息保存失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请先保存投放计划信息。",
            type: "error"
          });
        }
      },
      findeductedFormCancel: function findeductedFormCancel() {
        this.$refs.findeductedRef.getTableComp().closeExpandRow();
        this.$refs.findeductedRef.comp.formShow = false;
        this.$refs.findeductedRef.getTableComp().closeExpandRow();
        var loanPlanTable = this.$refs.findeductedRef.getData("Deducted_t");
        loanPlanTable[this.baseEditIndex] = this.baseData;
        this.$refs.findeductedRef.setData("Deducted_t", loanPlanTable);
      },
      findeductedEditClick: function findeductedEditClick(scope) {
        this.$refs.findeductedRef.getTableComp().expandRow(scope.row);
        this.$refs.findeductedRef.comp.formShow = false;
        this.$refs.findeductedRef.setData("Deducted_f", scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      // 内扣信息 findeductedRef 事件处理 end
      // 内扣信息删除
      //删除操作
      findeductedDeleteClick: function findeductedDeleteClick(scope) {
        this.pk_fin_deducted = scope.row.pk_fin_deducted;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deletefindeductedClick: function deletefindeductedClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/deducted/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.pk_fin_deducted
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "删除成功",
              type: "success"
            });
            _this2.delDialogVisible = false;
            _this2.Refresh();
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
  
      //加载内扣
      loadfindeducted: function loadfindeducted(pk_loan_cont_info) {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/deducted/getByFinLoanId",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_loan_cont_info
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs["findeductedRef"].setData("Deducted_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this3.$message({
            message: "内扣信息获取失败",
            type: "error"
          });
        });
      },
      addloan: function addloan() {
        this.open();
      },
      deleteloan: function deleteloan() {
        var _this4 = this;
  
        var tableSelections = this.$refs.findeductedRef.getTableComp().getSelection();
        var ids = [];
        var pk = this.pk_loan_cont_info;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_fin_deducted;
          });
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/deducted/deleteDeducted",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this4.$message({
                message: "初始化成功",
                type: "success"
              });
              _this4.Refresh();
            } else {
              _this4.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this4.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要删除的条目！",
            type: "error"
          });
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
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"detail-main-container clearfix\">\n    <ifbp-panel id=\"findeductedPanel\" title=\"内扣\" :icons=\"findeductedPlusIcons\">\n      <ifbp-template ref=\"findeductedRef\"\n                    tplId=\"findeductedTemplate\"\n                    funnode=\"BT012\"\n                    nexuskey =\"deducted\"\n                    :tplData=\"findeductedData\"\n                    :tplResetFun=\"findeductedResetFun\"\n                    @form-confirm-click=\"findeductedFormConfirm\"\n                    @form-cancel-click=\"findeductedFormCancel\"\n                    @delete-table-click=\"findeductedDeleteClick\"\n                    @edit-table-click=\"findeductedEditClick\"\n                    show-type=\"table-form\" \n                    >\n      </ifbp-template>\n    </ifbp-panel>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deletefindeductedClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-detail-info.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _loanapplyDetailInfoDecutedDlog = require("yls^busi/fin/src/loanapply-info/loanapply-detail-info-decuted-dlog.vue");
  
  var _loanapplyDetailInfoDecutedDlog2 = _interopRequireDefault(_loanapplyDetailInfoDecutedDlog);
  
  var _loanapplyDetailInfoDecuted = require("yls^busi/fin/src/loanapply-info/loanapply-detail-info-decuted.vue");
  
  var _loanapplyDetailInfoDecuted2 = _interopRequireDefault(_loanapplyDetailInfoDecuted);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    props: ["sourcebill"],
    components: {
      decutedDlogRef: _loanapplyDetailInfoDecutedDlog2["default"],
      decutedref: _loanapplyDetailInfoDecuted2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        // decutedref:decutedref,
        dialogTableVisible: false,
        delDialogVisible: false,
        //投放计划主键
        pk_loan_cont_info: "",
  
        // 投放计划申请主模板 baseTemplateRef start
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 投放计划申请主模板 baseTemplateRef end
      };
    },
    mounted: function mounted() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        this.$emit("decutedclose");
      },
      decutedDlogRefreturn: function decutedDlogRefreturn() {
        this.dialogTableVisible = false;
        this.loadData();
      },
      decutedopen: function decutedopen() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
  
      // 投放计划主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.LoanContInfo_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = "";
        if (data.pk_loan_cont_info) {
          url = _publicData.ylsBusi + "fin/loancontinfo/update";
        } else {
          url = _publicData.ylsBusi + "fin/loancontinfo/create";
        }
        this.$http({
          url: url,
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.pk_loan_cont_info = res.data.data.pk_loan_cont_info;
          _this.$refs["baseTemplateRef"].setData("LoanContInfo_f", JSON.parse(JSON.stringify(originalValue)));
          _this.loadData();
          _this.editable = false;
        })["catch"](function (e) {
          _this.$message({
            message: "投放计划保存失败！",
            type: "error"
          });
        });
      },
  
      // 投放计划主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData: function loadData() {
        this.pk_loan_cont_info = this.sourcebill;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_loan_cont_info) {
          //加载投放计划信息
          this.loadfinloancontinfo(this.pk_loan_cont_info);
        } else {
          this.editable = true;
        }
      },
  
      //加载投放计划信息
      loadfinloancontinfo: function loadfinloancontinfo(pk_loan_cont_info) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_loan_cont_info
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("LoanContInfo_f", JSON.parse(JSON.stringify(originalValue)));
          _this2.$refs.decutedref.loadfindeducted(pk_loan_cont_info);
        })["catch"](function (e) {
          _this2.$message({
            message: "投放计划详情获取失败",
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
  __vue__options__.template = "\n<!-- 主体区域 -->\n<div >\n    <!-- 投放计划主模板 temp start-->\n    <ifbp-panel id=\"basePanel\" title=\"投放计划\" :icons=\"baseIcons\" >\n      <ifbp-template ref=\"baseTemplateRef\"\n                tplId=\"baseTemplate\"\n                funnode=\"BT012\"\n                nexuskey =\"loancontinfo\"\n                show-type=\"form\"\n                :tplData=\"tplData\"\n                :editable=\"editable\">\n      </ifbp-template>\n      <div class=\"form-button-div\" v-if=\"editable\">\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n      </div>\n    </ifbp-panel>\n    <!-- 内扣信息 temp start-->\n    <decutedref\n        ref=\"decutedref\"\n        @openreturn=\"decutedopen\"\n        @dialogreturn=\"decutedDlogRefreturn\"\n        :sourcebill=\"pk_loan_cont_info\">\n    </decutedref>\n   <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n    <decutedDlogRef\n        ref=\"decutedDlogRef\"\n        @dialogreturn=\"decutedDlogRefreturn\"\n        :sourcebill=\"pk_loan_cont_info\">\n    </decutedDlogRef>\n   </el-dialog>\n   <div class=\"detail-button-header\">\n      <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n  </div>\n</div>\n\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-detail-inout-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        search_input: "",
        //数据信息
        dialogrefData: {}
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loancontinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("LoanContInfo_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      },
      search: function search() {},
      close: function close() {
        this.$emit("dialogreturn", this.change);
      },
      addMain: function addMain() {
        var _this2 = this;
  
        var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
        var ids = [];
        var pk = this.sourcebill;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_loan_cont_info;
          });
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/loanapply/addLoanApplyInfo",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "添加成功",
                type: "success"
              });
              _this2.change = true;
              _this2.close();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "添加失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要增加的数据",
            type: "error"
          });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"111合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <!-- <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> -->\n      </div> \n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loancontinfo\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\" >\n      </ifbp-template>\n      <div class=\"fr\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <div >\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n      </div>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-detail-inout.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    data: function data() {
      var oThis = this;
      return {
        delDialogVisible: false,
        //固定写法
        scrollDom: "ifbpScrollDom",
        //放款主键
        pk_fin_loan_apply: this.sourcebill,
        pk_loan_cont_info: '',
        tplData: {},
        // 放款申请单列表信息 FinLoanContInfoRef start
        FinLoanContInfoData: {},
        FinLoanContInfoResetFun: function FinLoanContInfoResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(":show-header", "true");
          var operateArr = [{
            title: "编辑",
            icon: "edit"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        //放款申请单列表信息添加
        FinLoanContInfoPlusIcons: [{
          icon: "plus",
          click: function click() {
            oThis.open();
          }
        }, {
          icon: "delete",
          click: function click() {
            oThis.FinLoanContInfoDeleteClick();
          }
        }]
      };
    },
  
    methods: {
      Refresh: function Refresh() {
        this.$emit("dialogreturn");
      },
      open: function open() {
        this.$emit("openreturn");
      },
      opendecuted: function opendecuted() {
        this.$emit("opendecutedreturn", this.pk_loan_cont_info);
      },
  
      // 放款申请单列表信息 FinLoanContInfoRef 事件处理 start
      FinLoanContInfoFormConfirm: function FinLoanContInfoFormConfirm() {
        var _this = this;
  
        if (this.pk_fin_loan_apply != null) {
          var data = this.$refs.FinLoanContInfoRef.comp.LoanContInfo_f;
          data.pk_fin_loan_apply = this.pk_fin_loan_apply;
          var jsonData = JSON.parse(JSON.stringify(data));
          var url = "";
          if (data.pk_fin_deducted) {
            url = _publicData.ylsBusi + "fin/loancontinfo/update";
          } else {
            url = _publicData.ylsBusi + "fin/loancontinfo/create";
          }
          this.$http({
            url: url,
            method: "post",
            data: jsonData
          }).then(function (res) {
            if (res.data.success === true) {
              _this.$message({
                message: "保存成功！",
                type: "success"
              });
              _this.$refs.FinLoanContInfoRef.comp.formShow = false;
              _this.Refresh();
            } else {
              _this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this.$message({
              message: "放款申请单列表信息保存失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请先保存放款信息。",
            type: "error"
          });
        }
      },
      FinLoanContInfoEditClick: function FinLoanContInfoEditClick(scope) {
        this.pk_loan_cont_info = scope.row.pk_loan_cont_info;
        this.opendecuted();
      },
  
      // 放款申请单列表信息 FinLoanContInfoRef 事件处理 end
      // 放款申请单列表信息删除
      //删除操作
      FinLoanContInfoDeleteClick: function FinLoanContInfoDeleteClick() {
        this.delDialogVisible = true;
      },
  
      //加载投放信息
      loadFinLoanContInfo: function loadFinLoanContInfo(pk_fin_loan_apply) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/getByFinApplyId",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_fin_loan_apply
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["FinLoanContInfoRef"].setData("LoanContInfo_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "放款申请单列表信息获取失败",
            type: "error"
          });
        });
      },
      deleteloan: function deleteloan() {
        var _this3 = this;
  
        var tableSelections = this.$refs.FinLoanContInfoRef.getTableComp().getSelection();
        var ids = [];
        var pk = this.sourcebill;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_loan_cont_info;
          });
  
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/loanapply/deleteLoanApplyInfo",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this3.$message({
                message: "初始化成功",
                type: "success"
              });
              _this3.delDialogVisible = false;
              _this3.Refresh();
            } else {
              _this3.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this3.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        }
        this.$message({
          message: "请选择要删除的数据",
          type: "success"
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"detail-main-container clearfix\">\n    <!-- 放款申请单列表信息 temp start-->\n    <ifbp-panel id=\"FinLoanContInfoPanel\" title=\"放款申请单列表\" :icons=\"FinLoanContInfoPlusIcons\">\n      <ifbp-template ref=\"FinLoanContInfoRef\"\n                    tplId=\"FinLoanContInfoTemplate\"\n                    :tplData=\"FinLoanContInfoData\"\n                    :tplResetFun=\"FinLoanContInfoResetFun\"\n                    funnode=\"BT012\"\n                    nexuskey =\"loancontinfo\"\n                    @form-confirm-click=\"FinLoanContInfoFormConfirm\"\n                    @edit-table-click=\"FinLoanContInfoEditClick\"\n                    show-type=\"table\" \n                    >\n      </ifbp-template>\n    </ifbp-panel>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteloan\">确 定</el-button>\n    </span>\n   </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _loanapplyDetailInoutDlog = require("yls^busi/fin/src/loanapply-info/loanapply-detail-inout-dlog.vue");
  
  var _loanapplyDetailInoutDlog2 = _interopRequireDefault(_loanapplyDetailInoutDlog);
  
  var _loanapplyDetailInout = require("yls^busi/fin/src/loanapply-info/loanapply-detail-inout.vue");
  
  var _loanapplyDetailInout2 = _interopRequireDefault(_loanapplyDetailInout);
  
  var _loanapplyDetailInfo = require("yls^busi/fin/src/loanapply-info/loanapply-detail-info.vue");
  
  var _loanapplyDetailInfo2 = _interopRequireDefault(_loanapplyDetailInfo);
  
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
  
  exports["default"] = {
    components: {
      loanlistdlogdef: _loanapplyDetailInoutDlog2["default"],
      loanlistdef: _loanapplyDetailInout2["default"],
      deductedlistdlogdef: _loanapplyDetailInfo2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        dialogVisible: false,
        delDialogVisible: false,
        dialogTableVisible: false,
        //放款主键
        pk_fin_loan_apply: "",
        pk_loan_cont_info: "",
        // 放款申请主模板 baseTemplateRef start
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 放款申请主模板 baseTemplateRef end
      };
    },
    mounted: function mounted() {
      this.loadData();
    },
  
    methods: {
      loanlistdlogdefreturn: function loanlistdlogdefreturn() {
        this.dialogTableVisible = false;
        this.loadData();
      },
      conginfodopen: function conginfodopen() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
      decutedopen: function decutedopen(pk_loan_cont_info) {
        this.pk_loan_cont_info = pk_loan_cont_info;
        this.dialogVisible = true;
      },
      decutedclose: function decutedclose() {
        this.dialogVisible = false;
        this.loadData();
      },
  
      //返回按钮
      goBack: function goBack() {
        location.hash = "/loancontinfo/loanmain/" + 'second';
      },
  
      // 放款主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.LoanApply_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = "";
        if (data.pk_fin_loan_apply) {
          url = _publicData.ylsBusi + "fin/loanapply/update";
        } else {
          url = _publicData.ylsBusi + "fin/loanapply/create";
        }
        this.$http({
          url: url,
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        }).then(function (res) {
          _this.editable = false;
          var originalValue = res.data.data;
          _this.pk_fin_loan_apply = res.data.data.pk_fin_loan_apply;
          _this.$refs["baseTemplateRef"].setData("LoanApply_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "放款保存失败！",
            type: "error"
          });
        });
      },
  
      // 放款主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData: function loadData() {
        this.pk_fin_loan_apply = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_fin_loan_apply && this.pk_fin_loan_apply != "") {
          //加载放款信息
          this.loadfinloanapply(this.pk_fin_loan_apply);
        } else {
          this.editable = true;
        }
      },
  
      //加载放款信息
      loadfinloanapply: function loadfinloanapply(pk_fin_loan_apply) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loanapply/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_fin_loan_apply
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("LoanApply_f", JSON.parse(JSON.stringify(originalValue)));
          _this2.$refs.loanlistdef.loadFinLoanContInfo(pk_fin_loan_apply);
        })["catch"](function (e) {
          _this2.$message({
            message: "放款详情获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">放款申请单</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 放款主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"投放申请\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loanapply\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 放款申请单列表信息 temp start-->\n      <loanlistdef\n          ref=\"loanlistdef\"\n          @openreturn=\"conginfodopen\"\n          @opendecutedreturn=\"decutedopen\"\n          @dialogreturn=\"loanlistdlogdefreturn\"\n          :sourcebill=\"pk_fin_loan_apply\">\n      </loanlistdef>\n      <!-- 放款申请单列表信息 temp end-->\n    <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n      <loanlistdlogdef\n          ref=\"loanlistdlogdef\"\n          @dialogreturn=\"loanlistdlogdefreturn\"\n          :sourcebill=\"pk_fin_loan_apply\">\n      </loanlistdlogdef>\n     </el-dialog>\n     <el-dialog title=\"内扣信息添加\"  v-model=\"dialogVisible\" size=\"large\" >\n      <deductedlistdlogdef\n          ref=\"deductedlistdlogdef\"\n          @decutedclose=\"decutedclose\"\n          :sourcebill=\"this.pk_loan_cont_info\">\n      </deductedlistdlogdef>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loanapply-info/loanapply-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      return {
        finloanapplyListData: {},
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: "",
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            title: "删除",
            icon: "delete"
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      // // 添加按钮
      // addInterrateInfo() {
      //   location.hash = "/loanapply/add";
      // },
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/loanapply/detail/" + scope.row.pk_fin_loan_apply;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_fin_loan_apply;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loanapply/deleteById",
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
            _this.refreshPage();
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
  
      //发送投放计划
      sendloanapply: function sendloanapply() {
        var _this2 = this;
  
        var tableSelections = this.$refs.loanapply_table.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_fin_loan_apply;
          });
          this.$http({
            url: _publicData.ylsBusi + "fin/loanapply/sendLoanApply",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "发送成功",
                type: "success"
              });
              _this2.refreshPage();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择数据",
            type: "success"
          });
        }
      },
      refreshPage: function refreshPage() {
        var _this3 = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loanapply/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        }).then(function (resp) {
          if (resp.data.success) {
            _this3.$refs.loanapply_table.setData("LoanApply_t", resp.data.data.content);
            _this3.totalElements = resp.data.data.totalElements;
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">放款申请单</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <!-- <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button> -->\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"sendloanapply\">发送</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 投放申请列表 -->\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"loanapply_table\"\n                  tplId=\"finloanapply-template\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loanapply\"\n                  :tplData=\"finloanapplyListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loancont-info/loancontinfo-detail-decuted-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _methods; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        //数据信息
        dialogrefData: {},
        search_input: ''
      };
    },
  
    methods: (_methods = {
      search: function search() {},
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/quote/inoutPlan/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("payinoutfrom_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      }
    }, _methods["search"] = function search() {}, _methods.close = function close() {
      this.$emit("dialogreturn", this.change);
    }, _methods.addMain = function addMain() {
      var _this2 = this;
  
      var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
      var ids = [];
      var pk = this.sourcebill;
      if (tableSelections && tableSelections.length > 0) {
        tableSelections.forEach(function (item, index) {
          ids[index] = item.pk_quote_inout_plan;
        });
        var data = {
          strArray: ids,
          pk: pk
        };
        this.$http({
          url: _publicData.ylsBusi + "fin/deducted/addDeducted",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: data
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "添加成功",
              type: "success"
            });
            _this2.change = true;
            _this2.close();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "添加失败！",
            type: "error"
          });
        });
      } else {
        this.$message({
          message: "请选择要增加的数据",
          type: "error"
        });
      }
    }, _methods)
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"111合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <!-- <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n      </div>  -->\n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT013\"\n                  nexuskey =\"payinoutfrom\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\" >\n      </ifbp-template>\n      <div class=\"fr\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <div >\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n      </div>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/loancont-info/loancontinfo-detail-decuted.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    data: function data() {
      var oThis = this;
      return {
        dialogTableVisible: false,
        delDialogVisible: false,
        //固定写法
        scrollDom: "ifbpScrollDom",
        //投放计划主键
        pk_loan_cont_info: this.sourcebill,
        tplData: {},
  
        // 内扣信息 findeductedRef start
        findeductedData: {},
        findeductedResetFun: function findeductedResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(":show-header", "true");
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
        },
        //内扣信息添加
        findeductedPlusIcons: [{
          //   icon: "plus",
          //   click: function() {
          //     // 关闭table中的编辑区
          //     oThis.$refs.findeductedRef.getTableComp().closeExpandRow();
          //     // 重置新增数据
          //     oThis.$refs.findeductedRef.resetFormData();
          //     // 显示新增区域
          //     oThis.$refs.findeductedRef.comp.formShow = true;
          //   }
          // },
          // {
          icon: "share",
          click: function click() {
            oThis.addloan();
          }
        }, {
          icon: "delete",
          click: function click() {
            oThis.deleteloan();
          }
        }]
      };
    },
  
    methods: {
      Refresh: function Refresh() {
        this.$emit("dialogreturn");
      },
      open: function open() {
        this.$emit("openreturn");
      },
  
      // 内扣信息 findeductedRef 事件处理 start
      findeductedFormConfirm: function findeductedFormConfirm() {
        var _this = this;
  
        if (this.sourcebill != null) {
          var data = this.$refs.findeductedRef.comp.Deducted_f;
          data.pk_loan_cont_info = this.sourcebill;
          var url = "";
          if (data.pk_fin_deducted) {
            url = _publicData.ylsBusi + "fin/deducted/update";
          } else {
            url = _publicData.ylsBusi + "fin/deducted/create";
          }
          this.$http({
            url: url,
            // headers: {'Content-Type': 'application/json'},
            method: "post",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this.$message({
                message: "保存成功！",
                type: "success"
              });
              _this.$refs.findeductedRef.comp.formShow = false;
              _this.Refresh();
            } else {
              _this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this.$message({
              message: "内扣信息保存失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请先保存投放计划信息。",
            type: "error"
          });
        }
      },
      findeductedFormCancel: function findeductedFormCancel() {
        this.$refs.findeductedRef.getTableComp().closeExpandRow();
        this.$refs.findeductedRef.comp.formShow = false;
        this.$refs.findeductedRef.getTableComp().closeExpandRow();
        var loanPlanTable = this.$refs.findeductedRef.getData("Deducted_t");
        loanPlanTable[this.baseEditIndex] = this.baseData;
        this.$refs.findeductedRef.setData("Deducted_t", loanPlanTable);
      },
      findeductedEditClick: function findeductedEditClick(scope) {
        this.$refs.findeductedRef.getTableComp().expandRow(scope.row);
        this.$refs.findeductedRef.comp.formShow = false;
        this.$refs.findeductedRef.setData("Deducted_f", scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      // 内扣信息 findeductedRef 事件处理 end
      // 内扣信息删除
      //删除操作
      findeductedDeleteClick: function findeductedDeleteClick(scope) {
        this.pk_fin_deducted = scope.row.pk_fin_deducted;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deletefindeductedClick: function deletefindeductedClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/deducted/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.pk_fin_deducted
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "删除成功",
              type: "success"
            });
            _this2.delDialogVisible = false;
            _this2.Refresh();
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
  
      //加载内扣
      loadfindeducted: function loadfindeducted(pk_loan_cont_info) {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/deducted/getByFinLoanId",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_loan_cont_info
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs["findeductedRef"].setData("Deducted_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this3.$message({
            message: "内扣信息获取失败",
            type: "error"
          });
        });
      },
      addloan: function addloan() {
        this.open();
      },
      deleteloan: function deleteloan() {
        var _this4 = this;
  
        var tableSelections = this.$refs.findeductedRef.getTableComp().getSelection();
        var ids = [];
        var pk = this.pk_loan_cont_info;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_fin_deducted;
          });
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/deducted/deleteDeducted",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this4.$message({
                message: "初始化成功",
                type: "success"
              });
              _this4.Refresh();
            } else {
              _this4.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this4.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要删除的条目！",
            type: "error"
          });
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
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<!-- 主体区域 -->\n<div class=\"detail-main-container clearfix\">\n    <ifbp-panel id=\"findeductedPanel\" title=\"内扣\" :icons=\"findeductedPlusIcons\">\n      <ifbp-template ref=\"findeductedRef\"\n                    tplId=\"findeductedTemplate\"\n                    funnode=\"BT012\"\n                    nexuskey =\"deducted\"\n                    :tplData=\"findeductedData\"\n                    :tplResetFun=\"findeductedResetFun\"\n                    @form-confirm-click=\"findeductedFormConfirm\"\n                    @form-cancel-click=\"findeductedFormCancel\"\n                    @delete-table-click=\"findeductedDeleteClick\"\n                    @edit-table-click=\"findeductedEditClick\"\n                    show-type=\"table-form\" \n                    >\n      </ifbp-template>\n    </ifbp-panel>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deletefindeductedClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loancont-info/loancontinfo-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _loancontinfoDetailDecutedDlog = require("yls^busi/fin/src/loancont-info/loancontinfo-detail-decuted-dlog.vue");
  
  var _loancontinfoDetailDecutedDlog2 = _interopRequireDefault(_loancontinfoDetailDecutedDlog);
  
  var _loancontinfoDetailDecuted = require("yls^busi/fin/src/loancont-info/loancontinfo-detail-decuted.vue");
  
  var _loancontinfoDetailDecuted2 = _interopRequireDefault(_loancontinfoDetailDecuted);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      decutedDlogRef: _loancontinfoDetailDecutedDlog2["default"],
      decutedref: _loancontinfoDetailDecuted2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        // decutedref:decutedref,
        dialogTableVisible: false,
        delDialogVisible: false,
        //投放计划主键
        pk_loan_cont_info: "",
  
        // 投放计划申请主模板 baseTemplateRef start
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 投放计划申请主模板 baseTemplateRef end
      };
    },
    mounted: function mounted() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        location.hash = "/loancontinfo/loanmain/" + 'first';
      },
      decutedDlogRefreturn: function decutedDlogRefreturn() {
        this.dialogTableVisible = false;
        this.loadData();
      },
      decutedopen: function decutedopen() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
  
      // 投放计划主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.LoanContInfo_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = "";
        if (data.pk_loan_cont_info) {
          url = _publicData.ylsBusi + "fin/loancontinfo/update";
        } else {
          url = _publicData.ylsBusi + "fin/loancontinfo/create";
        }
        this.$http({
          url: url,
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.pk_loan_cont_info = res.data.data.pk_loan_cont_info;
          _this.$refs["baseTemplateRef"].setData("LoanContInfo_f", JSON.parse(JSON.stringify(originalValue)));
          _this.loadData();
          _this.editable = false;
        })["catch"](function (e) {
          _this.$message({
            message: "投放计划保存失败！",
            type: "error"
          });
        });
      },
  
      // 投放计划主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData: function loadData() {
        if (!this.pk_loan_cont_info) {
          this.pk_loan_cont_info = this.$root.$router.currentRoute.params.id;
        }
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_loan_cont_info) {
          //加载投放计划信息
          this.loadfinloancontinfo(this.pk_loan_cont_info);
          this.$refs.decutedref.loadfindeducted(this.pk_loan_cont_info);
        } else {
          this.editable = true;
        }
      },
  
      //加载投放计划信息
      loadfinloancontinfo: function loadfinloancontinfo(pk_loan_cont_info) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_loan_cont_info
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("LoanContInfo_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "投放计划详情获取失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">放款申请列表界面</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 投放计划主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"投放计划\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loancontinfo\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 内扣信息 temp start-->\n      <decutedref\n          ref=\"decutedref\"\n          @openreturn=\"decutedopen\"\n          @dialogreturn=\"decutedDlogRefreturn\"\n          :sourcebill=\"pk_loan_cont_info\">\n      </decutedref>\n     <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n      <decutedDlogRef\n          ref=\"decutedDlogRef\"\n          @dialogreturn=\"decutedDlogRefreturn\"\n          :sourcebill=\"pk_loan_cont_info\">\n      </decutedDlogRef>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loancont-info/loancontinfo-list-inout-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        //数据信息
        dialogrefData: {},
        search_input: ""
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loancontinfo/getpageInoutPlan", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("RefPayApplyInout_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      },
      search: function search() {},
      close: function close() {
        this.$emit("dialogreturn", this.change);
      },
      addMain: function addMain() {
        var _this2 = this;
  
        var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_quote_inout_plan;
          });
          this.$http({
            url: _publicData.ylsBusi + "fin/loancontinfo/addInoutPlan",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "添加成功",
                type: "success"
              });
              _this2.change = true;
              _this2.close();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "添加失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要增加的数据",
            type: "error"
          });
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
  //
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <!-- <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> -->\n      </div> \n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT012\"\n                  nexuskey =\"payapplyinout\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\">\n      </ifbp-template>\n      <div  class=\"detail-button-header\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/loancont-info/loancontinfo-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _loancontinfoListInoutDlog = require("yls^busi/fin/src/loancont-info/loancontinfo-list-inout-dlog.vue");
  
  var _loancontinfoListInoutDlog2 = _interopRequireDefault(_loancontinfoListInoutDlog);
  
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
  //
  //
  //
  //
  //
  //
  //
  
  exports["default"] = {
    components: {
      dialogRef: _loancontinfoListInoutDlog2["default"]
    },
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var _ref;
  
      return _ref = {
        // searchTemplateCode: "",
        searchTemplateParam: {},
        pk_loan_cont_info: "",
        dialogTableVisible: false,
        delDialogVisible: false,
        //模版主键
        loancontinfoListData: {},
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: ""
      }, _ref["delDialogVisible"] = false, _ref.delId = "", _ref.selectionRows = [], _ref.templateTableFormResetFun = function templateTableFormResetFun($node) {
        //获取table,此id为ui模板上面的表格Id
        var $table = $node.find("el-table");
        //定义操作
        var operateArr = [{
          icon: "search",
          title: "查看"
        }, {
          title: "删除",
          icon: "delete"
        }];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }, _ref;
    },
  
    methods: {
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.refreshPage();
      },
      dialogRefreturn: function dialogRefreturn() {
        this.dialogTableVisible = false;
        this.refreshPage();
      },
      addloan: function addloan() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
      selectionChange: function selectionChange(selection) {
        console.log(selection);
        this.selectionRows = selection;
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      // // 添加按钮
      // addInterrateInfo() {
      //   location.hash = "/loancontinfo/add";
      // },
      // 添加按钮
      addInfo: function addInfo() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/loancontinfo/detail/" + scope.row.pk_loan_cont_info;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_loan_cont_info;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/deleteById",
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
            _this.refreshPage();
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
  
      //发送投放计划
      sendloancont: function sendloancont() {
        var _this2 = this;
  
        var tableSelections = this.$refs.loancontinfo_table.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_loan_cont_info;
          });
        }
        if (this.selectionRows) {
          this.$http({
            url: _publicData.ylsBusi + "fin/loancontinfo/sendLoanContInfo",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "发送成功",
                type: "success"
              });
              _this2.delDialogVisible = false;
              _this2.refreshPage();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        } else {}
      },
      refreshPage: function refreshPage() {
        var _this3 = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loancontinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        }).then(function (resp) {
          if (resp.data.success) {
            _this3.$refs.loancontinfo_table.setData("LoanContInfo_t", resp.data.data.content);
            _this3.totalElements = resp.data.data.totalElements;
          }
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">放款申请列表</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addloan\">新增</el-button>\n      <!-- <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button> -->\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"sendloancont\">发送</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <!-- <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n       <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> \n  </div> -->\n  <!-- 投放申请列表 -->\n <div id=\"finloancontinfoList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"loancontinfo_table\"\n                  tplId=\"loancontinfo-template\"\n                  :tplData=\"loancontinfoListData\"\n                  show-type=\"table\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loancontinfo\"\n                  @selection-change=\"selectionChange\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n     <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n        <dialogRef\n          ref=\"dialogRef\"\n          @dialogreturn=\"dialogRefreturn\"\n          :sourcebill=\"pk_loan_cont_info\">\n        </dialogRef>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/loancont-info/loanmain.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _loancontinfoList = require("yls^busi/fin/src/loancont-info/loancontinfo-list.vue");
  
  var _loancontinfoList2 = _interopRequireDefault(_loancontinfoList);
  
  var _loanapplyList = require("yls^busi/fin/src/loanapply-info/loanapply-list.vue");
  
  var _loanapplyList2 = _interopRequireDefault(_loanapplyList);
  
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
  
  exports["default"] = {
    components: {
      finloancontinfo: _loancontinfoList2["default"],
      finloanapply: _loanapplyList2["default"]
    },
    data: function data() {
      return {
        activeName: "first"
      };
    },
    created: function created() {
      this.change();
    },
  
    methods: {
      change: function change() {
        if (this.$root.$router.currentRoute.params.id) {
          if (this.$root.$router.currentRoute.params.id == "second") {
            this.activeName = "second";
          }
        } else {
          this.activeName = "first";
        }
      },
      handleClick: function handleClick(tab, event) {
        if (tab.$options.propsData.name == "second") {
          this.$refs.finloanapply.refreshPage();
          this.$refs.finloancontinfo.refreshPage();
        }
        if (tab.$options.propsData.name == "first") {
          this.$refs.finloanapply.refreshPage();
          this.$refs.finloancontinfo.refreshPage();
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
  __vue__options__.template = "\n<el-tabs id=\"busi-main\" v-model=\"activeName\" @tab-click=\"handleClick\">\n  <el-tab-pane label=\"放款申请-列表\" name=\"first\">\n      <finloancontinfo ref=\"finloanapply\"></finloancontinfo>\n  </el-tab-pane>\n  <el-tab-pane label=\"放款申请单\" name=\"second\">\n      <finloanapply  ref=\"finloancontinfo\"></finloanapply>\n  </el-tab-pane>\n</el-tabs>\n\n"
  

});
 
 define('yls^busi/fin/src/payment-apply/paymain.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _loancontinfoList = require("./loancontinfo-list.vue");
  
  var _loancontinfoList2 = _interopRequireDefault(_loancontinfoList);
  
  var _loanapplyList = require("yls^busi/fin/src/loanapply-info/loanapply-list.vue");
  
  var _loanapplyList2 = _interopRequireDefault(_loanapplyList);
  
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
  
  exports["default"] = {
    components: {
      finloancontinfo: _loancontinfoList2["default"],
      finloanapply: _loanapplyList2["default"]
    },
    data: function data() {
      return {
        activeName: "first",
        custType: true
      };
    },
  
    methods: {
      handleClick: function handleClick(tab, event) {
        console.log(tab, event);
        if (tab.$options.propsData.name == "second") {
          this.$refs.finloanapply.request(this.$refs.finloanapply.currentPage - 1, this.$refs.finloanapply.size);
          this.$refs.finloancontinfo.request(this.$refs.finloancontinfo.currentPage - 1, this.$refs.finloancontinfo.size);
        }
        if (tab.$options.propsData.name == "first") {
          this.$refs.finloanapply.request(this.$refs.finloanapply.currentPage - 1, this.$refs.finloanapply.size);
          this.$refs.finloancontinfo.request(this.$refs.finloancontinfo.currentPage - 1, this.$refs.finloancontinfo.size);
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
  __vue__options__.template = "\n<el-tabs id=\"busi-main\" v-model=\"activeName\" @tab-click=\"handleClick\">\n  <el-tab-pane label=\"放款申请-列表\" name=\"first\">\n      <finloancontinfo ref=\"finloanapply\"></finloancontinfo>\n  </el-tab-pane>\n  <el-tab-pane label=\"放款申请单\" name=\"second\">\n      <finloanapply  ref=\"finloancontinfo\"></finloanapply>\n  </el-tab-pane>\n</el-tabs>\n\n"
  

});
 
 define('yls^busi/fin/src/payment-apply/paymentapply-detail-inout-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        search_input: "",
        //数据信息
        dialogrefData: {}
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loancontinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("LoanContInfo_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      },
      search: function search() {},
      close: function close() {
        this.$emit("dialogreturn", this.change);
      },
      addMain: function addMain() {
        var _this2 = this;
  
        var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
        var ids = [];
        var pk = this.sourcebill;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_loan_cont_info;
          });
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/loanapply/addLoanApplyInfo",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "添加成功",
                type: "success"
              });
              _this2.change = true;
              _this2.close();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "添加失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要增加的数据",
            type: "error"
          });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <!-- <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> -->\n      </div> \n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loancontinfo\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\" >\n      </ifbp-template>\n      <div class=\"fr\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <div >\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n      </div>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/payment-apply/paymentapply-detail-inout.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    data: function data() {
      var oThis = this;
      return {
        delDialogVisible: false,
        //固定写法
        scrollDom: "ifbpScrollDom",
        //放款主键
        pk_fin_loan_apply: this.sourcebill,
        pk_loan_cont_info: '',
        tplData: {},
        // 放款申请单列表信息 FinLoanContInfoRef start
        FinLoanContInfoData: {},
        FinLoanContInfoResetFun: function FinLoanContInfoResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(":show-header", "true");
          var operateArr = [{
            title: "编辑",
            icon: "edit"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        //放款申请单列表信息添加
        FinLoanContInfoPlusIcons: [{
          icon: "plus",
          click: function click() {
            oThis.open();
          }
        }, {
          icon: "delete",
          click: function click() {
            oThis.FinLoanContInfoDeleteClick();
          }
        }]
      };
    },
  
    methods: {
      Refresh: function Refresh() {
        this.$emit("dialogreturn");
      },
      open: function open() {
        this.$emit("openreturn");
      },
      opendecuted: function opendecuted() {
        this.$emit("opendecutedreturn", this.pk_loan_cont_info);
      },
  
      // 放款申请单列表信息 FinLoanContInfoRef 事件处理 start
      FinLoanContInfoFormConfirm: function FinLoanContInfoFormConfirm() {
        var _this = this;
  
        if (this.sourcebill != null) {
          var data = this.$refs.FinLoanContInfoRef.comp.LoanContInfo_f;
          data.pk_fin_loan_apply = this.sourcebill;
          var url = "";
          if (this.sourcebill) {
            url = _publicData.ylsBusi + "fin/loancontinfo/update";
          } else {
            url = _publicData.ylsBusi + "fin/loancontinfo/create";
          }
          this.$http({
            url: url,
            method: "post",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this.$message({
                message: "保存成功！",
                type: "success"
              });
              _this.$refs.FinLoanContInfoRef.comp.formShow = false;
              _this.Refresh();
            } else {
              _this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this.$message({
              message: "放款申请单列表信息保存失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请先保存放款信息。",
            type: "error"
          });
        }
      },
  
      // 放款申请单列表信息 FinLoanContInfoRef 事件处理 end
      // 放款申请单列表信息删除
      //删除操作
      FinLoanContInfoDeleteClick: function FinLoanContInfoDeleteClick() {
        this.delDialogVisible = true;
      },
      FinLoanContInfoCancel: function FinLoanContInfoCancel() {
        this.$refs.FinLoanContInfoRef.getTableComp().closeExpandRow();
        this.$refs.FinLoanContInfoRef.comp.formShow = false;
        this.$refs.FinLoanContInfoRef.getTableComp().closeExpandRow();
        var loanPlanTable = this.$refs.FinLoanContInfoRef.getData("LoanContInfo_t");
        loanPlanTable[this.baseEditIndex] = this.baseData;
        this.$refs.FinLoanContInfoRef.setData("LoanContInfo_t", loanPlanTable);
      },
      FinLoanContInfoEditClick: function FinLoanContInfoEditClick(scope) {
        this.$refs.FinLoanContInfoRef.getTableComp().expandRow(scope.row);
        this.$refs.FinLoanContInfoRef.comp.formShow = false;
        this.$refs.FinLoanContInfoRef.setData("LoanContInfo_f", scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      //加载投放信息
      loadFinLoanContInfo: function loadFinLoanContInfo(pk_fin_loan_apply) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/getByFinApplyId",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_fin_loan_apply
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["FinLoanContInfoRef"].setData("LoanContInfo_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "放款申请单列表信息获取失败",
            type: "error"
          });
        });
      },
      deleteloan: function deleteloan() {
        var _this3 = this;
  
        var tableSelections = this.$refs.FinLoanContInfoRef.getTableComp().getSelection();
        var ids = [];
        var pk = this.sourcebill;
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_loan_cont_info;
          });
  
          var data = {
            strArray: ids,
            pk: pk
          };
          this.$http({
            url: _publicData.ylsBusi + "fin/loanapply/deleteLoanApplyInfo",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
            if (res.data.success === true) {
              _this3.$message({
                message: "初始化成功",
                type: "success"
              });
              _this3.delDialogVisible = false;
              _this3.Refresh();
            } else {
              _this3.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this3.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        }
        this.$message({
          message: "请选择要删除的数据",
          type: "success"
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n\n<div class=\"detail-main-container clearfix\">\n    <!-- 放款申请单列表信息 temp start-->\n    <ifbp-panel id=\"FinLoanContInfoPanel\" title=\"放款申请单列表\" :icons=\"FinLoanContInfoPlusIcons\">\n      <ifbp-template ref=\"FinLoanContInfoRef\"\n                    tplId=\"FinLoanContInfoTemplate\"\n                    :tplData=\"FinLoanContInfoData\"\n                    :tplResetFun=\"FinLoanContInfoResetFun\"\n                    funnode=\"BT012\"\n                    nexuskey =\"loancontinfo\"\n                    @form-cancel-click=\"FinLoanContInfoCancel\"\n                    @form-confirm-click=\"FinLoanContInfoFormConfirm\"\n                    @edit-table-click=\"FinLoanContInfoEditClick\"\n                    show-type=\"table-form\" \n                    >\n      </ifbp-template>\n    </ifbp-panel>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteloan\">确 定</el-button>\n    </span>\n   </el-dialog>\n</div>\n\n"
  

});
 
 define('yls^busi/fin/src/payment-apply/paymentapply-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _paymentapplyDetailInoutDlog = require("yls^busi/fin/src/payment-apply/paymentapply-detail-inout-dlog.vue");
  
  var _paymentapplyDetailInoutDlog2 = _interopRequireDefault(_paymentapplyDetailInoutDlog);
  
  var _paymentapplyDetailInout = require("yls^busi/fin/src/payment-apply/paymentapply-detail-inout.vue");
  
  var _paymentapplyDetailInout2 = _interopRequireDefault(_paymentapplyDetailInout);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      loanlistdlogdef: _paymentapplyDetailInoutDlog2["default"],
      loanlistdef: _paymentapplyDetailInout2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        dialogVisible: false,
        dialogTableVisible: false,
        //放款主键
        pk_fin_loan_apply: "",
        pk_loan_cont_info: "",
        // 放款申请主模板 baseTemplateRef start
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 放款申请主模板 baseTemplateRef end
      };
    },
    mounted: function mounted() {
      this.loadData();
    },
  
    methods: {
      loanlistdlogdefreturn: function loanlistdlogdefreturn() {
        this.dialogTableVisible = false;
        this.loadData();
      },
      conginfodopen: function conginfodopen() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
      decutedopen: function decutedopen(pk_loan_cont_info) {
        this.pk_loan_cont_info = pk_loan_cont_info;
        this.dialogVisible = true;
      },
      decutedclose: function decutedclose() {
        this.dialogVisible = false;
        this.loadData();
      },
  
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 放款主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.LoanApply_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = "";
        if (data.pk_fin_loan_apply) {
          url = _publicData.ylsBusi + "fin/loanapply/update";
        } else {
          url = _publicData.ylsBusi + "fin/loanapply/create";
        }
        this.$http({
          url: url,
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        }).then(function (res) {
          _this.editable = false;
          var originalValue = res.data.data;
          _this.pk_fin_loan_apply = res.data.data.pk_fin_loan_apply;
          _this.$refs["baseTemplateRef"].setData("LoanApply_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "放款保存失败！",
            type: "error"
          });
        });
      },
  
      // 放款主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData: function loadData() {
        this.pk_fin_loan_apply = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_fin_loan_apply && this.pk_fin_loan_apply != "") {
          //加载放款信息
          this.loadfinloanapply(this.pk_fin_loan_apply);
        } else {
          this.editable = true;
        }
      },
  
      //加载放款信息
      loadfinloanapply: function loadfinloanapply(pk_fin_loan_apply) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loanapply/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_fin_loan_apply
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("LoanApply_f", JSON.parse(JSON.stringify(originalValue)));
          _this2.$refs.loanlistdef.loadFinLoanContInfo(pk_fin_loan_apply);
        })["catch"](function (e) {
          _this2.$message({
            message: "放款详情获取失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款/退款申请单</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 放款主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"投放申请\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loanapply\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 放款申请单列表信息 temp start-->\n      <loanlistdef\n          ref=\"loanlistdef\"\n          @openreturn=\"conginfodopen\"\n          @opendecutedreturn=\"decutedopen\"\n          @dialogreturn=\"loanlistdlogdefreturn\"\n          :sourcebill=\"pk_fin_loan_apply\">\n      </loanlistdef>\n      <!-- 放款申请单列表信息 temp end-->\n    <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n      <loanlistdlogdef\n          ref=\"loanlistdlogdef\"\n          @dialogreturn=\"loanlistdlogdefreturn\"\n          :sourcebill=\"pk_fin_loan_apply\">\n      </loanlistdlogdef>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-apply/paymentapply-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      return {
        finloanapplyListData: {},
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: "",
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            title: "删除",
            icon: "delete"
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      // // 添加按钮
      // addInterrateInfo() {
      //   location.hash = "/loanapply/add";
      // },
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/paymentapply/detail/" + scope.row.pk_fin_loan_apply;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_fin_loan_apply;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loanapply/deleteById",
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
            _this.refreshPage();
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
  
      //发送投放计划
      sendloanapply: function sendloanapply() {
        var _this2 = this;
  
        var tableSelections = this.$refs.loanapply_table.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_fin_loan_apply;
          });
          this.$http({
            url: _publicData.ylsBusi + "fin/loanapply/sendLoanApply",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "发送成功",
                type: "success"
              });
              _this2.refreshPage();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择数据",
            type: "success"
          });
        }
      },
      refreshPage: function refreshPage() {
        var _this3 = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loanapply/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        }).then(function (resp) {
          if (resp.data.success) {
            _this3.$refs.loanapply_table.setData("LoanApply_t", resp.data.data.content);
            _this3.totalElements = resp.data.data.totalElements;
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款/退款申请单</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <!-- <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button> -->\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"sendloanapply\">发送</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 投放申请列表 -->\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"loanapply_table\"\n                  tplId=\"finloanapply-template\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loanapply\"\n                  :tplData=\"finloanapplyListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-execute/payment-execute-card.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _paymentPlanChildList = require('yls^busi/fin/src/payment-plan/payment-plan-child-list.vue');
  
  var _paymentPlanChildList2 = _interopRequireDefault(_paymentPlanChildList);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      'impPaymentPlanChildRef': _paymentPlanChildList2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        //主键
        pk_payment_execute: "",
        paymentPlanChildRef: _paymentPlanChildList2["default"],
        //主模板 baseTemplateRef start
        tplData: {},
        delId: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 报价主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.PaymentExecute;
        var jsonData = JSON.parse(JSON.stringify(data));
        this.$http({
          url: '/yls-busi-web/fin/execute/save',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: jsonData
        }).then(function (res) {
  
          _this.editable = false;
          var originalValue = res.data.data;
          _this.$refs["baseTemplateRef"].setData("PaymentExecute", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.editable = true;
          _this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
  
      // 报价主模板 baseTemplateRef 事件处理 end
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_payment_execute = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_payment_execute && this.pk_payment_execute != "") {
          //加载信息
          this.loadPayment(this.pk_payment_execute);
          //加载付款安排
          this.paymentPlanChildRef.methods.refreshPage();
        } else {
          this.editable = true;
        }
      },
  
      //加载付款执行信息
      loadPayment: function loadPayment(pk_payment_execute) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/execute/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_payment_execute
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("PaymentExecute", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "详情获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款执行</h2>\n  </div>\n  \n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"付款执行信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT014\"\n                  nexuskey=\"payment-execute\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 主模板 temp end-->\n\n      <!-- 付款安排主模板 temp start-->\n      <impPaymentPlanChildRef :pk_payment_execute=\"pk_payment_execute\" ref=\"impPaymentPlanChildRef\"></impPaymentPlanChildRef>\n      <!-- 付款安排主模板 temp end-->\n  </div>\n</div>\n\n\n\n"
  

});
 
 define('yls^busi/fin/src/payment-execute/payment-execute-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('refreshPage')],
      data: function data() {
          return {
              executeListDate: {},
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
              search_input: "",
              //删除对话框
              delDialogVisible: false,
              //待删除数据id
              delId: "",
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  //定义操作
                  var operateArr = [{
                      icon: 'search',
                      title: "查看"
                  }, {
                      title: "删除",
                      icon: "delete"
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.refreshPage();
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          // 添加按钮
          addInterrateInfo: function addInterrateInfo() {
              location.hash = "/payment-execute/add";
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/payment-execute/card/" + scope.row.pk_payment_execute;
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_payment_execute;
              this.delDialogVisible = true;
          },
          handleSelectionChange: function handleSelectionChange(selection) {
              this.$message('选中条数为:' + selection.length);
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.$http({
                  url: "/yls-busi-web/fin/execute/deleteById",
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  dataType: "json",
                  data: this.delId
              }).then(function (res) {
                  if (res.data.success === true) {
                      _this.$message({
                          message: "删除成功",
                          type: "success"
                      });
                      _this.refreshPage();
                      _this.delDialogVisible = false;
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
  
          //删除确定
          pushPlan2Rent: function pushPlan2Rent() {
              var _this2 = this;
  
              var tableSelections = this.$refs.execustListRef.getTableComp().getSelection();
  
              if (tableSelections && tableSelections.length > 0) {
                  var pks = [];
                  tableSelections.forEach(function (item, index) {
                      pks[index] = item.pk_payment_execute;
                  });
                  this.$http({
                      url: "/yls-busi-web/fin/execute/pushPlan2Rent",
                      headers: { 'Content-Type': 'application/json' },
                      method: "post",
                      dataType: "json",
                      data: pks
                  }).then(function (res) {
                      if (res.data.success === true) {
                          _this2.$message({
                              message: "操作成功",
                              type: "success"
                          });
                          _this2.refreshPage();
                      } else {
                          _this2.$message({
                              message: res.data.error.errorMessage,
                              type: "error"
                          });
                      }
                  })["catch"](function (e) {
                      _this2.$message({
                          message: "信息处理失败！",
                          type: "error"
                      });
                  });
              } else {
                  this.$message({
                      message: "请选择需要处理的数据!!",
                      type: "error"
                  });
              }
          },
          refreshPage: function refreshPage() {
              var _this3 = this;
  
              this.$http.post(_publicData.ylsBusi + '/fin/execute/page', {
                  pageNum: this.currentPage - 1,
                  pageSize: this.pageSize
              }).then(function (resp) {
  
                  if (resp.data.success) {
                      _this3.$refs.execustListRef.setData('PaymentExecute_t', resp.data.data.content);
                      _this3.totalElements = resp.data.data.totalElements;
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款执行</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"pushPlan2Rent\">推送起租</el-button>\n   </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"付款编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n\n  <!-- 列表 -->\n <div id=\"executeList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"execustListRef\"\n                  tplId=\"executeList-template\"\n                  funnode=\"BT014\"\n                  nexuskey=\"payment-execute\"\n                  :tplData=\"executeListDate\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-execute/payment-execute-main.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _paymentPlanList = require('yls^busi/fin/src/payment-plan/payment-plan-list.vue');
  
  var _paymentPlanList2 = _interopRequireDefault(_paymentPlanList);
  
  var _paymentExecuteList = require('yls^busi/fin/src/payment-execute/payment-execute-list.vue');
  
  var _paymentExecuteList2 = _interopRequireDefault(_paymentExecuteList);
  
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
  
  //引入付款安排
  exports["default"] = {
    components: {
      'paymentPlanRef': _paymentPlanList2["default"],
      'paymentExecuteRef': _paymentExecuteList2["default"]
    },
    data: function data() {
      return {
        activeName: 'plan'
      };
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<el-tabs v-model=\"activeName\" type=\"border-card\" >\n  <el-tab-pane label=\"付款安排\" name=\"plan\">\n        <paymentPlanRef ref=\"paymentPlanRef\"></paymentPlanRef>\n  </el-tab-pane>\n  <el-tab-pane label=\"付款处理\" name=\"execute\">\n        <paymentExecuteRef ref=\"paymentExecuteRef\"></paymentExecuteRef>\n  </el-tab-pane>\n</el-tabs>\n"
  

});
 
 define('yls^busi/fin/src/payment-inout/loanmain.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _loancontinfoList = require("./loancontinfo-list.vue");
  
  var _loancontinfoList2 = _interopRequireDefault(_loancontinfoList);
  
  var _loanapplyList = require("yls^busi/fin/src/loanapply-info/loanapply-list.vue");
  
  var _loanapplyList2 = _interopRequireDefault(_loanapplyList);
  
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
  
  exports["default"] = {
    components: {
      finloancontinfo: _loancontinfoList2["default"],
      finloanapply: _loanapplyList2["default"]
    },
    data: function data() {
      return {
        activeName: "first"
      };
    },
    created: function created() {
      this.change();
    },
  
    methods: {
      change: function change() {
        if (this.$root.$router.currentRoute.params.id) {
          if (this.$root.$router.currentRoute.params.id == "second") {
            this.activeName = "second";
          }
        } else {
          this.activeName = "first";
        }
      },
      handleClick: function handleClick(tab, event) {
        if (tab.$options.propsData.name == "second") {
          this.$refs.finloanapply.refreshPage();
          this.$refs.finloancontinfo.refreshPage();
        }
        if (tab.$options.propsData.name == "first") {
          this.$refs.finloanapply.refreshPage();
          this.$refs.finloancontinfo.refreshPage();
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
  __vue__options__.template = "\n<el-tabs id=\"busi-main\" v-model=\"activeName\" @tab-click=\"handleClick\">\n  <el-tab-pane label=\"放款申请-列表\" name=\"first\">\n      <finloancontinfo ref=\"finloanapply\"></finloancontinfo>\n  </el-tab-pane>\n  <el-tab-pane label=\"放款申请单\" name=\"second\">\n      <finloanapply  ref=\"finloancontinfo\"></finloanapply>\n  </el-tab-pane>\n</el-tabs>\n\n"
  

});
 
 define('yls^busi/fin/src/payment-inout/paymentinout-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        //投放计划主键
        pk_loan_cont_info: "",
  
        // 投放计划申请主模板 baseTemplateRef start
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 投放计划申请主模板 baseTemplateRef end
      };
    },
    mounted: function mounted() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 投放计划主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.LoanContInfo_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url = "";
        if (data.pk_loan_cont_info) {
          url = _publicData.ylsBusi + "fin/loancontinfo/update";
        } else {
          url = _publicData.ylsBusi + "fin/loancontinfo/create";
        }
        this.$http({
          url: url,
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.pk_loan_cont_info = res.data.data.pk_loan_cont_info;
          _this.$refs["baseTemplateRef"].setData("LoanContInfo_f", JSON.parse(JSON.stringify(originalValue)));
          _this.loadData();
          _this.editable = false;
        })["catch"](function (e) {
          _this.$message({
            message: "投放计划保存失败！",
            type: "error"
          });
        });
      },
  
      // 投放计划主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData: function loadData() {
        if (!this.pk_loan_cont_info) {
          this.pk_loan_cont_info = this.$root.$router.currentRoute.params.id;
        }
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_loan_cont_info) {
          //加载投放计划信息
          this.loadfinloancontinfo(this.pk_loan_cont_info);
        } else {
          this.editable = true;
        }
      },
  
      //加载投放计划信息
      loadfinloancontinfo: function loadfinloancontinfo(pk_loan_cont_info) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_loan_cont_info
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("LoanContInfo_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "投放计划详情获取失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款/退款申请列表</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 投放计划主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"投放计划\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loancontinfo\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-inout/paymentinout-list-inout-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        //数据信息
        dialogrefData: {},
        search_input: ""
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loancontinfo/getpageInoutPlan", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("RefPayApplyInout_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      },
      search: function search() {},
      close: function close() {
        this.$emit("dialogreturn", this.change);
      },
      addMain: function addMain() {
        var _this2 = this;
  
        var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_quote_inout_plan;
          });
          this.$http({
            url: _publicData.ylsBusi + "fin/loancontinfo/addInoutPlan",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "添加成功",
                type: "success"
              });
              _this2.change = true;
              _this2.close();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "添加失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要增加的数据",
            type: "error"
          });
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
  //
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <!-- <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> -->\n      </div> \n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT012\"\n                  nexuskey =\"payapplyinout\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\">\n      </ifbp-template>\n      <div  class=\"detail-button-header\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/payment-inout/paymentinout-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _paymentinoutListInoutDlog = require("yls^busi/fin/src/payment-inout/paymentinout-list-inout-dlog.vue");
  
  var _paymentinoutListInoutDlog2 = _interopRequireDefault(_paymentinoutListInoutDlog);
  
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
  //
  //
  //
  //
  //
  //
  //
  
  exports["default"] = {
    components: {
      dialogRef: _paymentinoutListInoutDlog2["default"]
    },
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var _ref;
  
      return _ref = {
        // searchTemplateCode: "",
        searchTemplateParam: {},
        pk_loan_cont_info: "",
        dialogTableVisible: false,
        delDialogVisible: false,
        //模版主键
        loancontinfoListData: {},
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: ""
      }, _ref["delDialogVisible"] = false, _ref.delId = "", _ref.selectionRows = [], _ref.templateTableFormResetFun = function templateTableFormResetFun($node) {
        //获取table,此id为ui模板上面的表格Id
        var $table = $node.find("el-table");
        //定义操作
        var operateArr = [{
          icon: "search",
          title: "查看"
        }, {
          title: "删除",
          icon: "delete"
        }];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }, _ref;
    },
  
    methods: {
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.refreshPage();
      },
      dialogRefreturn: function dialogRefreturn() {
        this.dialogTableVisible = false;
        this.refreshPage();
      },
      addloan: function addloan() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
      selectionChange: function selectionChange(selection) {
        console.log(selection);
        this.selectionRows = selection;
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      // // 添加按钮
      // addInterrateInfo() {
      //   location.hash = "/loancontinfo/add";
      // },
      // 添加按钮
      addInfo: function addInfo() {
        this.dialogTableVisible = !this.dialogTableVisible;
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/paymentinout/detail/" + scope.row.pk_loan_cont_info;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_loan_cont_info;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "fin/loancontinfo/deleteById",
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
            _this.refreshPage();
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
  
      //发送投放计划
      sendloancont: function sendloancont() {
        var _this2 = this;
  
        var tableSelections = this.$refs.loancontinfo_table.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_loan_cont_info;
          });
        }
        if (this.selectionRows) {
          this.$http({
            url: _publicData.ylsBusi + "fin/loancontinfo/sendLoanContInfo",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "发送成功",
                type: "success"
              });
              _this2.delDialogVisible = false;
              _this2.refreshPage();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "发送失败！",
              type: "error"
            });
          });
        } else {}
      },
      refreshPage: function refreshPage() {
        var _this3 = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/loancontinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        }).then(function (resp) {
          if (resp.data.success) {
            _this3.$refs.loancontinfo_table.setData("LoanContInfo_t", resp.data.data.content);
            _this3.totalElements = resp.data.data.totalElements;
          }
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款/退款申请列表</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addloan\">新增</el-button>\n      <!-- <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button> -->\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"sendloancont\">发送</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <!-- <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n       <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> \n  </div> -->\n  <!-- 投放申请列表 -->\n <div id=\"finloancontinfoList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"loancontinfo_table\"\n                  tplId=\"loancontinfo-template\"\n                  :tplData=\"loancontinfoListData\"\n                  show-type=\"table\"\n                  funnode=\"BT012\"\n                  nexuskey =\"loancontinfo\"\n                  @selection-change=\"selectionChange\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n     <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n        <dialogRef\n          ref=\"dialogRef\"\n          @dialogreturn=\"dialogRefreturn\"\n          :sourcebill=\"pk_loan_cont_info\">\n        </dialogRef>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-plan/payment-plan-card.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //报价主键
        pk_payment_plan: "",
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 报价主模板 baseTemplateRef end
      };
    },
  
  
    attmData: {},
  
    attmResetFun: function attmResetFun($node) {
      var $table = $node.find("el-table");
      $table.attr(':show-header', 'false');
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
    },
    mounted: function mounted() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 报价主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.PaymentPlan;
        var jsonData = JSON.parse(JSON.stringify(data));
        var urlSave;
        if (this.pk_payment_plan) {
          urlSave = '/yls-busi-web/fin/plan/update';
        } else {
          urlSave = '/yls-busi-web/fin/plan/create';
        }
        this.$http({
          url: urlSave,
          // headers: {'Content-Type': 'application/json'},  
          method: "post",
          data: jsonData
        }).then(function (res) {
          _this.editable = false;
          var originalValue = res.data.data;
          _this.$refs["baseTemplateRef"].setData("PaymentPlan", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
  
      // 报价主模板 baseTemplateRef 事件处理 end
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_payment_plan = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_payment_plan && this.pk_payment_plan != "") {
          //加载报价信息
          this.loadPayment(this.pk_payment_plan);
        } else {
          this.editable = true;
        }
      },
  
      //加载报价信息
      loadPayment: function loadPayment(pk_payment_plan) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/plan/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_payment_plan
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("PaymentPlan", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "详情获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款安排</h2>\n  </div>\n  \n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"付款安排信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT014\"\n                  nexuskey=\"payment-plan\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 主模板 temp end-->\n\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-plan/payment-plan-child-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _paymentPlanDialog = require('yls^busi/fin/src/payment-plan/payment-plan-dialog.vue');
  
  var _paymentPlanDialog2 = _interopRequireDefault(_paymentPlanDialog);
  
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
  
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('refreshPage')],
      props: ["pk_payment_execute"],
      components: {
          'paymentPlanDialogRef': _paymentPlanDialog2["default"]
      },
      data: function data() {
          var oThis = this;
          return {
              delDialogVisible: false,
              selDialogVisible: false,
              pageSize: 10,
              cancelPlanDialogVisible: false,
              planDialogRef: _paymentPlanDialog2["default"],
              planListData: {
                  handleSelectable: function handleSelectable(row, index) {
                      if (row.pk_payment_execute == null) {
                          return true;
                      }
                  }
              },
              planPlusIcons: [{
                  title: "新增",
                  icon: "plus",
                  click: function click() {
                      oThis.selDialogVisible = true;
                  }
              }, {
                  title: "取消关联",
                  icon: "minus",
                  click: function click() {
                      var tableSelections = oThis.$refs.paymentPlanRef.getTableComp().getSelection();
                      if (tableSelections && tableSelections.length > 0) {
                          oThis.cancelPlanDialogVisible = true;
                      } else {
                          oThis.$message({
                              message: "请选择需要需取消的付款安排！",
                              type: "error"
                          });
                      }
                  }
              }],
              paymentPlanData: {},
              playDialogListData: {},
              planResetFun: function planResetFun($node) {
                  var $table = $node.find("el-table");
                  $table.attr(':show-header', 'true');
                  var operateArr = [{
                      title: "编辑",
                      icon: "edit"
                  }, {
                      title: "取消安排",
                      icon: "delete"
                  }];
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              },
              planDialogResetFun: function planDialogResetFun($node) {
                  var $table = $node.find("el-table");
                  $table.attr(':show-header', 'true');
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.refreshPage();
      },
  
      methods: {
          handleSelectionChange: function handleSelectionChange(selection) {
              this.$message('选中条数为:' + selection.length);
          },
          refreshPage: function refreshPage() {
              var _this = this;
  
              if (this.pk_payment_execute != null) {
                  this.$http.post(_publicData.ylsBusi + '/fin/plan/getByIds', {
                      pk: this.pk_payment_execute,
                      pageParam: {
                          pageNum: this.currentPage - 1,
                          pageSize: this.pageSize
                      }
                  }).then(function (resp) {
                      if (resp.data.success) {
                          _this.$refs.paymentPlanRef.setData('PaymentPlan_t', resp.data.data.content);
                          _this.totalElements = resp.data.data.totalElements;
                      }
                  });
              }
          },
          selConfirmClick: function selConfirmClick() {
              var _this2 = this;
  
              var tableSelections = this.$refs.paymentPlanDialogRef.$refs.planDialogRef.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  var pks = [];
                  tableSelections.forEach(function (item, index) {
                      pks[index] = item.pk_payment_plan;
                  });
  
                  var data = {
                      strArray: pks,
                      executeEntity: this.$parent.$refs.baseTemplateRef.comp.PaymentExecute
                  };
  
                  var vm = this;
                  this.$http({
                      url: "/yls-busi-web/fin/execute/relationPlan",
                      headers: { 'Content-Type': 'application/json' },
                      method: "post",
                      dataType: "json",
                      data: data
                  }).then(function (res) {
  
                      if (res.data.success === true) {
  
                          if (_this2.pk_payment_execute == null) {
                              _this2.pk_payment_execute = res.data.data.pk_payment_execute;
                          }
                          _this2.$parent.$refs["baseTemplateRef"].setData("PaymentExecute", JSON.parse(JSON.stringify(res.data.data)));
                          vm.refreshPage();
                          _this2.selDialogVisible = false;
                          _this2.$message({
                              message: "关联成功",
                              type: "success"
                          });
                      } else {
                          _this2.$message({
                              message: res.data.msg,
                              type: "error"
                          });
                      }
                  })["catch"](function (e) {
                      _this2.$message({
                          message: "信息提交失败！",
                          type: "error"
                      });
                  });
              } else {
                  this.$message({
                      message: "请选择付款安排！",
                      type: "error"
                  });
              }
          },
  
          //取消关联计划
          cancelPlan: function cancelPlan() {
              var _this3 = this;
  
              var tableSelections = this.$refs.paymentPlanRef.getTableComp().getSelection();
              if (tableSelections && tableSelections.length > 0) {
                  var pks = [];
                  tableSelections.forEach(function (item, index) {
                      pks[index] = item.pk_payment_plan;
                  });
                  var data = {
                      strArray: pks,
                      executeEntity: this.$parent.$refs.baseTemplateRef.comp.PaymentExecute
                  };
                  var vm = this;
                  this.$http({
                      url: "/yls-busi-web/fin/execute/cancelPlan",
                      headers: { 'Content-Type': 'application/json' },
                      method: "post",
                      dataType: "json",
                      data: data
                  }).then(function (res) {
                      if (res.data.success === true) {
                          _this3.$parent.loadPayment(_this3.pk_payment_execute);
                          vm.refreshPage();
                          _this3.cancelPlanDialogVisible = false;
                          _this3.$message({
                              message: "取消成功",
                              type: "success"
                          });
                      } else {
                          _this3.$message({
                              message: res.data.msg,
                              type: "error"
                          });
                      }
                  })["catch"](function (e) {
                      _this3.$message({
                          message: "信息提交失败！",
                          type: "error"
                      });
                  });
              } else {
                  this.$message({
                      message: "请选择取消的付款安排！",
                      type: "error"
                  });
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
  __vue__options__.template = "\n<div id=\"executeList\" class=\"list-main-container clearfix\">\n   <!-- 列表 -->\n  <ifbp-panel id=\"id_payment_plan\" title=\"付款安排\" :icons=\"planPlusIcons\">\n     <!--模板组件-->\n       <ifbp-template ref=\"paymentPlanRef\"\n                       tplId=\"paymentPlanId\"\n                       funnode=\"BT014\"\n                       nexuskey=\"payment-execute-plan\"\n                       :tplData=\"paymentPlanData\"\n                       :tplResetFun=\"planResetFun\"\n                       show-type=\"table-form\"\n                       >\n       </ifbp-template>\n     <!--分页组件-->\n       <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n           :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n       </el-pagination>\n   </ifbp-panel>\n\n       <!--安排选择-->\n       <el-dialog  title=\"付款安排\"   v-model=\"selDialogVisible\"\n        @update:visible=\"val => selDialogVisible = val\" :modal=\"true\"  size=\"large\">\n          <paymentPlanDialogRef ref=\"paymentPlanDialogRef\"  v-if=\"selDialogVisible\"></paymentPlanDialogRef>\n       <span slot=\"footer\" class=\"dialog-footer\">\n           <el-button @click=\"selDialogVisible = false\">取 消</el-button>\n           <el-button type=\"primary\" @click=\"selConfirmClick\">确 定</el-button>\n       </span>\n      </el-dialog>\n\n      \n       <!--取消付款安排Dialog-->\n       <el-dialog\n       title=\"提示\"\n       v-model=\"cancelPlanDialogVisible\"\n       @update:visible=\"val => cancelPlanDialogVisible = val\"\n       :modal=\"true\"\n       size=\"tiny\">\n       <span>确定取消安排计划？</span>\n       <span slot=\"footer\" class=\"dialog-footer\">\n           <el-button @click=\"cancelPlanDialogVisible = false\">取 消</el-button>\n           <el-button type=\"primary\" @click=\"cancelPlan\">确 定</el-button>\n       </span>\n      </el-dialog>\n</div>\n   \n"
  

});
 
 define('yls^busi/fin/src/payment-plan/payment-plan-dialog.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('refreshPage')],
      oThis: undefined,
      data: function data() {
          return {
              playDialogListData: [],
              pageSize: 10,
              mounted: function mounted() {
                  this.refreshPage();
              },
              planDialogResetFun: function planDialogResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  //获取操作按钮html片段
                  var operateHtml = this.getBaseTableOperateHtml();
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      created: function created() {
          this.refreshPage();
      },
  
      methods: {
          refreshPage: function refreshPage() {
              var _this = this;
  
              this.$http.post(_publicData.ylsBusi + 'fin/plan/pageUnCheck', {
                  pageNum: this.currentPage - 1,
                  pageSize: this.pageSize
              }).then(function (resp) {
                  if (resp.data.success) {
                      _this.$refs.planDialogRef.setData('PaymentPlan_t', resp.data.data.content);
                      _this.totalElements = resp.data.data.totalElements;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<!-- 列表区域 -->\n<div class=\"list-main-container\">\n    <ifbp-template ref=\"planDialogRef\"\n                tplId=\"planDialogId\"\n                funnode=\"BT013\"\n                nexuskey=\"payment-apply-select\"\n                :tplData=\"playDialogListData\"\n                :tplResetFun=\"planDialogResetFun\"\n                show-type=\"table\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/payment-plan/payment-plan-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('refreshPage')],
      data: function data() {
          return {
              planListData: {
                  handleSelectable: function handleSelectable(row, index) {
                      if (row.pk_payment_execute == null) {
                          return true;
                      }
                  }
              },
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
              search_input: "",
              //删除对话框
              delDialogVisible: false,
              //待删除数据id
              delId: "",
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find("el-table");
                  $table.find("el-table-column[type='selection']").attr("v-bind:selectable", "handleSelectable");
                  //定义操作
                  var operateArr = [{
                      icon: 'search',
                      title: "查看"
                  }, {
                      title: "删除",
                      icon: "delete"
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      mounted: function mounted() {
          this.refreshPage();
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          // 添加按钮
          addInterrateInfo: function addInterrateInfo() {
              location.hash = "/payment-plan/add";
          },
  
          //提交
          submitClick: function submitClick() {
              var _this = this;
  
              var tableSelections = this.$refs.planListTableRef.getTableComp().getSelection();
  
              if (tableSelections && tableSelections.length > 0) {
                  var pks = [];
                  tableSelections.forEach(function (item, index) {
                      pks[index] = item.pk_payment_plan;
                  });
                  this.$http({
                      url: "/yls-busi-web/fin/execute/pushExecute",
                      headers: { 'Content-Type': 'application/json' },
                      method: "post",
                      dataType: "json",
                      data: pks
                  }).then(function (res) {
                      if (res.data.success === true) {
                          _this.$message({
                              message: "提交成功",
                              type: "success"
                          });
                          _this.refreshPage();
                      } else {
                          _this.$message({
                              message: res.data.msg,
                              type: "error"
                          });
                      }
                  })["catch"](function (e) {
                      _this.$message({
                          message: "信息提交失败！",
                          type: "error"
                      });
                  });
              } else {
                  this.$message({
                      message: "请选择付款安排！",
                      type: "error"
                  });
              }
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/payment-plan/card/" + scope.row.pk_payment_plan;
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_payment_plan;
              this.delDialogVisible = true;
          },
          handleSelectionChange: function handleSelectionChange(selection) {
              this.$message('选中条数为:' + selection.length);
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this2 = this;
  
              this.$http({
                  url: "/yls-busi-web/fin/plan/deleteById",
                  headers: { 'Content-Type': 'application/json' },
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
                      _this2.refreshPage();
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
          refreshPage: function refreshPage() {
              var _this3 = this;
  
              this.$http.post(_publicData.ylsBusi + '/fin/plan/page', {
                  pageNum: this.currentPage - 1,
                  pageSize: this.pageSize
              }).then(function (resp) {
  
                  if (resp.data.success) {
                      _this3.$refs.planListTableRef.setData('PaymentPlan_t', resp.data.data.content);
                      _this3.totalElements = resp.data.data.totalElements;
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n\n\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">付款安排</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"submitClick\">合并付款</el-button>\n      <!--\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"submitClick\">单一付款</el-button>\n      -->\n      \n   </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"付款编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n\n  <!-- 列表 -->\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"planListTableRef\"\n                  tplId=\"quoteList-template\"\n                  funnode=\"BT014\"\n                  nexuskey=\"payment-plan\"\n                  :tplData=\"planListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/rent-info/rentinfo-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        delDialogVisible: false,
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //起租主键
        pk_fin_rent_info: "",
        pk_quote_calculator: "",
        // 起租主模板 baseTemplateRef start
        tplData: {},
        editable: false,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }],
        // 起租主模板 baseTemplateRef end
  
        // 报价模板 baseTemplateRef start
        quoteCalculatorDate: {},
        // 报价模板 baseTemplateRef end
  
        // 收支计划 fininoutplanRef start
        fininoutplanData: {},
        fininoutplanResetFun: function fininoutplanResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(":show-header", "true");
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
        },
        //收支计划添加
        fininoutplanPlusIcons: [{
          icon: "plus",
          click: function click() {
  
            var uitemplateComp = oThis.$refs.fininoutplanRef.comp;
            var table = uitemplateComp.$refs["QuoteInoutPlan_t"];
            table.closeExpandRow();
            uitemplateComp.finrentinfo = {};
            uitemplateComp.formShow = true;
          }
        }]
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 起租主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var RentInfo = this.$refs.baseTemplateRef.comp.RentInfo_f;
        var Quote = this.$refs.quoteCalculatorRef.comp.QuoteCalculator_f;
        var data = {
          rentInfoEntity: RentInfo,
          quoteCalculatorEntity: Quote
        };
        var jsonData = JSON.parse(JSON.stringify(data));
  
        this.$http({
          url: "/yls-busi-web/fin/rentinfo/saveMain",
          // headers: {'Content-Type': 'application/json'},
          method: "post",
          data: jsonData
        }).then(function (res) {
  
          _this.editable = false;
          var originalValue = res.data.data.rentInfoEntity;
          var quoteValue = res.data.data.quoteCalculatorEntity;
          _this.pk_fin_rent_info = res.data.data.rentInfoEntity.pk_fin_rent_info;
          _this.$refs["baseTemplateRef"].setData("RentInfo_f", JSON.parse(JSON.stringify(originalValue)));
          _this.$refs["quoteCalculatorRef"].setData("QuoteCalculator_f", JSON.parse(JSON.stringify(quoteValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "起租保存失败！",
            type: "error"
          });
        });
      },
  
      // 起租主模板 baseTemplateRef 事件处理 end
  
      // 收支计划 fininoutplanRef 事件处理 start
      fininoutplanFormConfirm: function fininoutplanFormConfirm() {
        var _this2 = this;
  
        if (this.pk_fin_rent_info != null) {
          var data = this.$refs.fininoutplanRef.comp.Fininoutplan;
          //TODO UI模板待完善
          data.pk_fin_rent_info = this.pk_fin_rent_info;
          var jsonData = JSON.parse(JSON.stringify(data));
          this.$http({
            url: "/yls-busi-web/fin/fininoutplan/create",
            // headers: {'Content-Type': 'application/json'},
            method: "post",
            data: jsonData
          }).then(function (res) {
  
            if (res.data.success === true) {
              _this2.$message({
                message: "保存成功！",
                type: "success"
              });
              _this2.$refs.fininoutplanRef.comp.formShow = false;
              _this2.loadfininoutplan(data.pk_quote_calculator);
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "收支计划保存失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请先保存起租信息。",
            type: "error"
          });
        }
      },
      fininoutplanFormCancel: function fininoutplanFormCancel() {
        this.$refs.fininoutplanRef.comp.formShow = false;
      },
      fininoutplanEditDeleteClick: function fininoutplanEditDeleteClick() {
        this.$refs.fininoutplanRef.comp.formShow = true;
      },
  
  
      // 收支计划 fininoutplanRef 事件处理 end
      // 收支计划删除
      //删除操作
      fininoutplanDeleteClick: function fininoutplanDeleteClick(scope) {
        this.pk_quote_loan_plan = scope.row.pk_quote_loan_plan;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deletefininoutplanClick: function deletefininoutplanClick() {
        var _this3 = this;
  
        this.$http({
          url: "/yls-busi-web/quote/inoutPlan/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.pk_quote_loan_plan
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功",
              type: "success"
            });
            _this3.delDialogVisible = false;
            _this3.loadfininoutplan(_this3.pk_fin_rent_info);
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
  
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_fin_rent_info = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_fin_rent_info && this.pk_fin_rent_info != "") {
          //加载起租信息
          this.loadfinrentinfo(this.pk_fin_rent_info);
        } else {
          this.editable = true;
        }
      },
  
      //加载起租信息
      loadfinrentinfo: function loadfinrentinfo(pk_fin_rent_info) {
        var _this4 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/rentinfo/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: pk_fin_rent_info
        }).then(function (res) {
          var originalValue = res.data.data;
          _this4.pk_quote_calculator = res.data.data.pk_quote_calculator;
          _this4.loadcalculatorinfo(_this4.pk_quote_calculator);
          _this4.loadfininoutplan(_this4.pk_quote_calculator);
          _this4.$refs["baseTemplateRef"].setData("RentInfo_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this4.$message({
            message: "起租详情获取失败",
            type: "error"
          });
        });
      },
  
      //加载报价信息
      loadcalculatorinfo: function loadcalculatorinfo(pk_quote_calculator) {
        var _this5 = this;
  
        this.$http({
          url: "/yls-busi-web/quote/calc/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_quote_calculator
        }).then(function (res) {
  
          var originalValue = res.data.data;
          _this5.$refs["quoteCalculatorRef"].setData("QuoteCalculator_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this5.$message({
            message: "报价获取失败",
            type: "error"
          });
        });
      },
  
      //加载收支计划
      loadfininoutplan: function loadfininoutplan(pk_quote_calculator) {
        var _this6 = this;
  
        this.$http({
          url: "/yls-busi-web/quote/inoutPlan/getByCalcId",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_quote_calculator
        }).then(function (res) {
  
          var originalValue = res.data.data;
          _this6.$refs["fininoutplanRef"].setData("QuoteInoutPlan_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this6.$message({
            message: "收支计划获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">起租</h2>\n  </div>\n  \n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button type=\"primary\" v-if=\"editable\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        <el-button type=\"default\" v-if=\"editable\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button> \n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 起租主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"起租\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  funnode=\"BT015\"\n                  nexuskey =\"rentInfo\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 报价主模板 temp start-->\n      <ifbp-panel id=\"quoteCalculator\" title=\"报价\"  >\n        <ifbp-template ref=\"quoteCalculatorRef\"\n                  tplId=\"quoteCalculator\"\n                  funnode=\"BT015\"\n                  nexuskey =\"finCalculator\"\n                  show-type=\"form\"\n                  :tplData=\"quoteCalculatorDate\"\n                  :editable=\"editable\">\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 收支计划 temp start-->\n      <ifbp-panel id=\"fininoutplanPanel\" title=\"收支计划\" :icons=\"fininoutplanPlusIcons\">\n        <ifbp-template ref=\"fininoutplanRef\"\n                      tplId=\"fininoutplanTemplate\"\n                      funnode=\"BT015\"\n                      nexuskey =\"finInOutPlan\"\n                      :tplData=\"fininoutplanData\"\n                      :tplResetFun=\"fininoutplanResetFun\"\n                      @form-confirm-click=\"fininoutplanFormConfirm\"\n                      @form-cancel-click=\"fininoutplanFormCancel\"\n                      @delete-table-click=\"fininoutplanDeleteClick\"\n                      @edit-table-click=\"fininoutplanEditDeleteClick\"\n                      show-type=\"table-form\" \n                      >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 收支计划 temp end-->\n      <!--删除确认Dialog-->\n    \n\n    </ifbp-panel-group>\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deletefininoutplanClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/rent-info/rentinfo-list-payplan-dlog.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["sourcebill"],
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      var oThis = this;
      var change = false;
      return {
        //高级查询是否展示
        isHide: true,
        search_input: "",
        //数据信息
        dialogrefData: {}
      };
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      refreshPage: function refreshPage() {
        var _this = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/plan/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        }).then(function (resp) {
          if (resp.data.success) {
            _this.$refs.dialogref.setData("PaymentPlan_t", resp.data.data.content);
            _this.totalElements = resp.data.data.totalElements;
          }
        });
      },
      search: function search() {},
      close: function close() {
        this.$emit("dialogreturn");
      },
      addMain: function addMain() {
        var _this2 = this;
  
        var tableSelections = this.$refs.dialogref.getTableComp().getSelection();
        var ids = [];
        if (tableSelections && tableSelections.length > 0) {
          tableSelections.forEach(function (item, index) {
            ids[index] = item.pk_payment_plan;
          });
          this.$http({
            url: _publicData.ylsBusi + "fin/rentinfo/initMain",
            headers: { "Content-Type": "application/json" },
            method: "post",
            dataType: "json",
            data: ids
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "添加成功",
                type: "success"
              });
              _this2.close();
            } else {
              _this2.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: "添加失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择要增加的数据",
            type: "error"
          });
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
  //
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n      <div class=\"operator-container\">\n          <div class=\"fr\">\n              <el-input placeholder=\"同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"search\" :on-icon-click=\"search\"></el-input>\n              <el-button type=\"text\" @click=\"showSearch\">\n              高级\n              <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n              <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n              </el-button>\n          </div>\n      </div>\n      <!--高级搜索区域-->\n      <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n        <!-- <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search> -->\n      </div> \n      <ifbp-template ref=\"dialogref\"\n                  tplId=\"dialogref-template\"\n                  funnode=\"BT015\"\n                  nexuskey =\"finPaymentPlan\"\n                  :tplData=\"dialogrefData\"\n                  show-type=\"table\">\n      </ifbp-template>\n      <div  class=\"detail-button-header\">\n          <el-button class=\"button-no-radius\" type=\"primary\" @click=\"addMain\">确 定</el-button>\n          <el-button class=\"button-no-radius\" type=\"default\" @click=\"close\">取 消</el-button>\n      </div>\n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n  </div>\n"
  

});
 
 define('yls^busi/fin/src/rent-info/rentinfo-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var _rentinfoListPayplanDlog = require("yls^busi/fin/src/rent-info/rentinfo-list-payplan-dlog.vue");
  
  var _rentinfoListPayplanDlog2 = _interopRequireDefault(_rentinfoListPayplanDlog);
  
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
  //
  //
  //
  //
  //
  
  exports["default"] = {
    components: {
      dialogRef: _rentinfoListPayplanDlog2["default"]
    },
    mixins: [(0, _publicData.pagination)("refreshPage")],
    mounted: function mounted() {
      this.refreshPage();
    },
    data: function data() {
      return {
        //主表信息
        finrentinfoListData: {},
        dialogTableVisible: false,
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        isHideplan: true,
        //快捷查询输入值
  
        search_input: "",
        search_plan: "",
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            title: "删除",
            icon: "delete"
          }];
  
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.request(this.currentPage - 1, this.size);
    },
  
  
    methods: {
      dialogRefreturn: function dialogRefreturn() {
        this.dialogTableVisible = false;
        this.refreshPage();
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      showSearchplan: function showSearchplan() {
        this.isHideplan = !this.isHideplan;
      },
      initPayment: function initPayment() {
        this.addInterrateInfo(this.paymentcurrentPage - 1, this.paymentsize);
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/rentinfo/detail/" + scope.row.pk_fin_rent_info;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_fin_rent_info;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: "/yls-busi-web/fin/rentinfo/deleteById",
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
            _this.request(_this.currentPage - 1, _this.size);
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
      refreshPage: function refreshPage() {
        var _this2 = this;
  
        this.$http.post(_publicData.ylsBusi + "/fin/rentinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        }).then(function (resp) {
          if (resp.data.success) {
            _this2.$refs.rentinfo_table.setData("RentInfo_t", resp.data.data.content);
            _this2.totalElements = resp.data.data.totalElements;
          }
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">起租</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"initPayment\">新增</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n\n  <!-- 投放申请列表 -->\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"rentinfo_table\"\n                  tplId=\"finrentinfo-template\"\n                  funnode=\"BT015\"\n                  nexuskey =\"rentInfo\"\n                  :tplData=\"finrentinfoListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n     <el-dialog title=\"新增子表\"  v-model=\"dialogTableVisible\" size=\"large\" >\n        <dialogRef\n          ref=\"dialogRef\"\n          @dialogreturn=\"dialogRefreturn\">\n        </dialogRef>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/rxt-bankflow/rxtbankflow-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        delDialogVisible: false,
        funnode: "BT021",
        nexusKey: "accountRecord",
        nexusKey2: "debitRecord",
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //主键
        pk_bank_flow: "",
  
        // 主模板 baseTemplateRef start
        tplData: {
          BankFlow_rxt_f: {}
        },
        //是否编辑态
        editable: false,
        editable2: false,
        // 主模板 baseTemplateRef end
  
        // 融信通扣款记录信息 DebitRecordRef start
        DebitRecordData: {
          GatherAudit_f_t: []
        },
        DebitRecordResetFun: function DebitRecordResetFun($node) {
          var $table = $node.find("el-table");
          $table.attr(':show-header', 'true');
          //定义操作
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
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
  
      // 主模板 baseTemplateRef 事件处理 end
  
      // 融信通扣款记录信息 DebitRecordRef 事件处理 start
      DebitRecordFormCancel: function DebitRecordFormCancel(tpe) {
        this.$refs.DebitRecordRef.getTableComp().closeExpandRow();
        this.$refs.DebitRecordRef.comp.formShow = false;
        this.$refs.DebitRecordRef.getTableComp().closeExpandRow();
        var debitRecord = this.$refs.DebitRecordRef.getData('DebitRecord_f_t');
        debitRecord[this.baseEditIndex] = this.baseData;
        this.$refs.DebitRecordRef.setData('DebitRecord_f_t', debitRecord);
      },
      DebitRecordEditDeleteClick: function DebitRecordEditDeleteClick(scope) {
        location.hash = "/rxtdebitrecord/detail/" + scope.row.pk_bank_flow;
      },
  
      // 融信通扣款记录信息 DebitRecordRef 事件处理 end
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_bank_flow = this.$root.$router.currentRoute.params.id;
        //详情页面
        if (this.pk_bank_flow && this.pk_bank_flow != "") {
          //加载到账单信息
          this.loadDebitRecord(this.pk_bank_flow);
          this.loadAccountRecord(this.pk_bank_flow);
        } else {
          this.editable = true;
        }
      },
  
      //加载融信通扣款记录信息
      loadAccountRecord: function loadAccountRecord(pk_bank_flow) {
        var _this = this;
  
        this.$http({
          url: "/yls-busi-web/fin/bankflow/getSubsById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_bank_flow
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.$refs["DebitRecordRef"].setData("DebitRecord_f_t", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "扣款记录详情获取失败",
            type: "error"
          });
        });
      },
  
      //加载银行到账单信息
      loadDebitRecord: function loadDebitRecord(pk_bank_flow) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/fin/bankflow/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_bank_flow
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("BankFlow_rxt_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this2.$message({
            message: "银行到账单信息获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">融信通对账单</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"融信通到账记录\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 融信通扣款记录信息 temp start-->\n      <ifbp-panel id=\"DebitRecordPanel\" title=\"融信通扣款记录\">\n        <ifbp-template ref=\"DebitRecordRef\"\n                      tplId=\"DebitRecordTemplate\"\n                      :tplData=\"DebitRecordData\"\n                      :tplResetFun=\"DebitRecordResetFun\"\n                      :funnode=\"funnode\"\n                      :nexuskey =\"nexusKey2\"\n                      :editable=\"editable2\"\n                      show-type=\"table-form\" \n                      >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 融信通扣款记录信息 temp end-->\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/rxt-bankflow/rxtbankflow-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页方法引入
    data: function data() {
      return {
        funnode: "BT021",
        nexusKey: "accountRecord",
  
        finrxtbankflowListData: {},
        totalElements: '',
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: "",
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.request(this.currentPage - 1, this.size);
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/rxtbankflow/detail/" + scope.row.pk_bank_flow;
      },
  
      // 导入按钮
      importExcel: function importExcel() {
        location.hash = "/rxtbankflow/detail";
      },
  
      //每页显示条数改变
      handleSizeChange: function handleSizeChange(sizeVal) {
        this.size = window.pageSize = sizeVal;
        var maxPage = Math.ceil(this.totalSize / sizeVal);
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
  
      //当前页发生改变
      handleCurrentChange: function handleCurrentChange(currVal) {
        this.currentPage = currVal;
        this.request(this.currentPage - 1, this.size);
      },
  
      //后台请求
      request: function request(n, s) {
        var _this = this;
  
        var url;
        var baseUrl = "/yls-busi-web";
        url = baseUrl + "/fin/bankflow/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: n,
          pageSize: s,
          searchParams: {
            searchMap: {}
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          // UI模板表格名称
          var originalValue = res.data.data.content;
          _this.$refs["rxtbankflow_table"].setData("BankFlow_rxt_t", JSON.parse(JSON.stringify(originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          console.log(res.data.data.size);
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function (e) {
          console.log(e);
          _this.$message({
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">融信通对账单</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"importExcel\">导入</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"xxxx\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 融信通到账记录列表 -->\n <div id=\"accountRecordList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"rxtbankflow_table\"\n                  tplId=\"finrxtbankflow-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"finrxtbankflowListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/rxt-debitrecord/rxtdebitrecord-detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        delDialogVisible: false,
        funnode: "BT021",
        nexusKey: "debitRecord",
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //主键
        pk_debit_record: "",
  
        // 主模板 baseTemplateRef start
        tplData: {
          DebitRecord_f: {}
        },
        //是否编辑态
        editable: false
        // 主模板 baseTemplateRef end      
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
  
      // 主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData: function loadData() {
        this.pk_debit_record = this.$root.$router.currentRoute.params.id;
        //详情页面
        if (this.pk_debit_record && this.pk_debit_record != "") {
          //加载扣款记录信息
          this.loadDeductRecord(this.pk_debit_record);
        } else {
          this.editable = true;
        }
      },
  
      //加载融信通扣款记录信息
      loadDeductRecord: function loadDeductRecord(pk_debit_record) {
        var _this = this;
  
        this.$http({
          url: "/yls-busi-web/fin/debitrecord/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_debit_record
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.$refs["baseTemplateRef"].setData("DebitRecord_f", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this.$message({
            message: "扣款记录详情获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">融信通扣款记录</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"false\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"融信通扣款记录\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n        </div>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/fin/src/rxt-debitrecord/rxtdebitrecord-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页方法引入
    data: function data() {
      return {
        funnode: "BT021",
        nexusKey: "debitRecord",
  
        debitrecordListData: {},
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: "",
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: "",
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      this.request(this.currentPage - 1, this.size);
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/rxtdebitrecord/detail/" + scope.row.pk_debit_record;
      },
  
      // 导入按钮
      importExcel: function importExcel() {
        location.hash = "/rxtdebitrecord/detail";
      },
  
      //每页显示条数改变
      handleSizeChange: function handleSizeChange(sizeVal) {
        this.size = window.pageSize = sizeVal;
        var maxPage = Math.ceil(this.totalSize / sizeVal);
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
  
      //当前页发生改变
      handleCurrentChange: function handleCurrentChange(currVal) {
        this.currentPage = currVal;
        this.request(this.currentPage - 1, this.size);
      },
  
      //后台请求
      request: function request(n, s) {
        var _this = this;
  
        var url;
        var baseUrl = "/yls-busi-web";
        url = baseUrl + "/fin/debitrecord/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: n,
          pageSize: s,
          searchParams: {
            searchMap: {}
          }
        };
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          // UI模板表格名称
          var originalValue = res.data.data.content;
          _this.$refs["rxtdebitrecord_table"].setData("DebitRecord_t", JSON.parse(JSON.stringify(originalValue)));
          _this.totalSize = res.data.data.totalElements; // 总条数
          console.log(res.data.data.size);
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function (e) {
          console.log(e);
          _this.$message({
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">融信通扣款记录</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"importExcel\">导入</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"xxxx\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n  <!-- 融信通到账记录列表 -->\n <div id=\"accountRecordList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"rxtdebitrecord_table\"\n                  tplId=\"finrxtdebitrecord-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey =\"nexusKey\"\n                  :tplData=\"debitrecordListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n  </div>\n</div>\n"
  

});

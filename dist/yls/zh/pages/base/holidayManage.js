 
 define('yls^base/holidayManage/src/holidayManage-card.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      var oThis = this;
      var validateCategory = function validateCategory(rule, value, callback) {
        // 编码非空校验
        if (rule.field == 'code') {
          if (value === '') {
            callback(new Error('编码不能为空! '));
          } else {
            var datam = {
              code: value
            };
            if (oThis.pk_holiday_category != '') {
              datam.pk = oThis.pk_holiday_category;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'holidayCategory/isUnique',
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
        if (rule.field == 'name') {
          if (value === '') {
            callback(new Error('名称不能为空! '));
          } else {
            var _datam = {
              name: value
            };
            if (oThis.pk_holiday_category != '') {
              _datam.pk = oThis.pk_holiday_category;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'holidayCategory/isUnique',
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
      var validateItem = function validateItem(rule, value, callback) {
        // 编码非空校验
        if (rule.field == 'code') {
          if (value === '') {
            callback(new Error('编码不能为空! '));
          } else {
            var datam = {
              fk: oThis.pk_holiday_category,
              code: value
            };
            if (oThis.pk_holiday_item != '') {
              datam.pk = oThis.pk_holiday_item;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'holidayItem/isUnique',
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
        if (rule.field == 'name') {
          if (value === '') {
            callback(new Error('名称不能为空! '));
          } else {
            var _datam2 = {
              fk: oThis.pk_holiday_category,
              name: value
            };
            if (oThis.pk_holiday_item != '') {
              _datam2.pk = oThis.pk_holiday_item;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'holidayItem/isUnique',
              hearders: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(_datam2))
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
        //固定写法
        scrollDom: document.getElementsByClassName('view')[0],
  
        // 假日类别主模板 baseTemplateRef start
        categoryNode: 'BT018',
        categoryKey: 'HOLIDAY-CATEGORY',
        holidayCategoryData: {
          rules: {
            code: [{ validator: validateCategory, trigger: 'blur' }],
            name: [{ validator: validateCategory, trigger: 'blur' }]
          }
        },
        holidayCategoryEdit: false,
        pk_holiday_category: '',
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            if (oThis.holidayCategoryEdit === false) {
              oThis.holidayCategoryEdit = true;
              // 备份数据
              var copyData = oThis.$refs.baseTemplateRef.comp.HolidayCategoryEntity;
              oThis.copyForData = JSON.parse(JSON.stringify(copyData));
            } else {
              oThis.holidayCategoryClickCancel();
            }
          }
        }],
        // 假日类别主模板 baseTemplateRef end
  
        // 详情 detailRef start
        //模版主键
        itemNode: 'BT018',
        itemKey: 'HOLIDAY-ITEM',
        detailTableData: {
          rules: {
            code: [{ validator: validateItem, trigger: 'blur' }],
            name: [{ validator: validateItem, trigger: 'blur' }]
          }
        },
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        pk_holiday_item: '',
        itemDelId: '',
        //详情
        detailIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_holiday_category != null && oThis.pk_holiday_category != '') {
              oThis.$refs.detailTable.getTableComp().closeExpandRow();
              // 重置新增数据
              oThis.$refs.detailTable.resetFormData();
              // 显示新增区域
              oThis.$refs.detailTable.comp.formShow = true;
              oThis.pk_holiday_item = "";
            } else {
              oThis.$message({
                message: '请先保存主表信息!',
                type: 'error'
              });
            }
          }
        }],
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find('el-table');
          //定义操作
          var operateArr = [{
            icon: 'edit',
            title: '编辑'
          }, {
            title: '删除',
            icon: 'delete'
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
        // 利率详情 detailRef end
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        location.hash = '/holidayManage/list';
      },
  
  
      // 假日类别模板 baseTemplateRef 事件处理 start
      holidayCategoryClickCancel: function holidayCategoryClickCancel() {
        this.holidayCategoryEdit = false;
        this.$refs.baseTemplateRef.setData('HolidayCategoryEntity', this.copyForData);
      },
      holidayCategorySaveConfirm: function holidayCategorySaveConfirm() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.HolidayCategoryEntity;
        this.$refs.baseTemplateRef.validate(function (valid) {
          if (valid) {
            _this.$http({
              url: _publicData.ylsBase + 'holidayCategory/save',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this.pk_holiday_category = res.data.data.pk_holiday_category;
                location.hash = '/holidayManage/detail/' + _this.pk_holiday_category;
                _this.holidayCategoryEdit = false;
                var originalValue = res.data.data;
                _this.$refs['baseTemplateRef'].setData('HolidayCategoryEntity', originalValue);
              } else {
                _this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this.$message({
                message: '保存失败',
                type: 'error'
              });
            });
          } else {
            _this.$message('校验未通过! ');
          }
        });
      },
  
      //加载假日类别信息
      loadHolidayCategoryInfo: function loadHolidayCategoryInfo() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'holidayCategory/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_holiday_category
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this2.$refs['baseTemplateRef'].setData('HolidayCategoryEntity', JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this2.$message({
            message: '利率信息获取失败',
            type: 'error'
          });
        });
      },
  
      // 假日类别主模板 baseTemplateRef 事件处理 end
  
      // 详情 detailRef 事件处理 start
      //删除操作
      detailDeleteTableRow: function detailDeleteTableRow(scope) {
        this.delDialogVisible = true;
        this.itemDelId = scope.row.pk_holiday_item;
      },
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'holidayItem/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.itemDelId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.delDialogVisible = false;
            _this3.request();
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: '信息删除失败！',
            type: 'error'
          });
        });
      },
  
      //后台请求
      request: function request() {
        var _this4 = this;
  
        var data = {
          'orderList': [{
            'direction': 'desc',
            'property': 'ts'
          }],
          'pageNum': this.currentPage - 1,
          'pageSize': this.pageSize,
          'searchParams': {
            'searchMap': {
              'custCondList': [{
                'key': 'fk_category',
                'oper': '=',
                'value': this.pk_holiday_category
              }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBase + 'holidayItem/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          if (res.data.success === true) {
            //HolidayItemEntity_t UI模板表格名称
            var originalValue = res.data.data.content;
            _this4.$refs['detailTable'].setData('HolidayItemEntity_t', JSON.parse(JSON.stringify(originalValue)));
            _this4.totalElements = res.data.data.totalElements; // 总条数
          } else {
            _this4.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this4.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //详情信息添加确认
      detailFormConfirm: function detailFormConfirm(type) {
        var _this5 = this;
  
        var data = this.$refs.detailTable.comp.HolidayItemEntity;
        data.fk_category = this.pk_holiday_category;
        if (this.pk_holiday_category != null) {
          this.$refs.detailTable.validate(function (valid) {
            if (valid) {
              _this5.$http({
                url: _publicData.ylsBase + 'holidayItem/save',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                data: JSON.parse(JSON.stringify(data))
              }).then(function (res) {
                if (res.data.success === true) {
                  _this5.$message({
                    message: '保存成功',
                    type: 'success'
                  });
                  //this.holidayCategoryEdit = false;
                  _this5.$refs.detailTable.comp.formShow = false;
                  _this5.request();
                } else {
                  _this5.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this5.$message({
                  message: '更新失败',
                  type: 'error'
                });
              });
            } else {
              _this5.$message('校验未通过! ');
            }
          }, type);
        } else {
          this.$message({
            message: '请先保存主表信息',
            type: 'error'
          });
        }
      },
      detailFormCancel: function detailFormCancel(type) {
        this.$refs.detailTable.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.detailTable.comp.formShow = false;
        } else {
          this.$refs.detailTable.getTableComp().closeExpandRow();
          var itemTable = this.$refs.detailTable.getData('HolidayItemEntity_t');
          itemTable[this.baseEditIndex] = this.baseData;
          this.$refs.detailTable.setData('HolidayItemEntity_t', itemTable);
        }
      },
      detailEditTableRow: function detailEditTableRow(scope) {
        this.pk_holiday_item = scope.row.pk_holiday_item;
        this.$refs.detailTable.getTableComp().expandRow(scope.row);
        this.$refs.detailTable.comp.formShow = false;
        this.$refs.detailTable.setData('HolidayItemEntity', scope.row);
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      // 利率详情 detailRef 事件处理 end
  
      //加载数据
      loadData: function loadData() {
        this.pk_holiday_category = this.$root.$router.currentRoute.params.id;
        if (this.pk_holiday_category && this.pk_holiday_category != '') {
          //加载假日类别信息
          this.loadHolidayCategoryInfo();
          //加载详情列表
          this.request();
        } else {
          this.holidayCategoryEdit = true;
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--节点title-->\n  <div class='title-container'>\n    <h2 class='name'>节假日管理</h2>\n  </div>\n\n  <!-- 主体区域 -->\n  <div class='detail-main-container clearfix'>\n    <ifbp-panel-group :navbar='true' :base-scroll-top='50' :scroll-dom='scrollDom' :base-nav-bar-top='125'>\n      <div class='detail-button-header'>\n        <el-button class='fr' type='primary' @click='goBack'>返回</el-button>\n      </div>\n      <!-- 假日类别主模板 temp start-->\n      <ifbp-panel id='basePanel' title='假日类别信息' :icons='baseIcons'>\n        <ifbp-template ref='baseTemplateRef'\n                  tplId='baseTemplate'\n                  :funnode='categoryNode'\n                  :nexuskey='categoryKey'\n                  show-type='form'\n                  :tplData='holidayCategoryData'\n                  :editable='holidayCategoryEdit'>\n        </ifbp-template>\n        <div class='form-button-div' v-if='holidayCategoryEdit'>\n          <el-button type='default' class='button-no-radius' @click='holidayCategoryClickCancel'>取消</el-button>\n          <el-button type='primary' class='button-no-radius' @click='holidayCategorySaveConfirm'>保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 假日类别主模板 temp end-->\n\n\n      <!-- 详情列表 temp start-->\n      <ifbp-panel id='detailList' title='详情' :icons='detailIcons'>\n        <ifbp-template ref='detailTable'\n                      tplId='detailTable-template'\n                      :funnode='itemNode'\n                      :nexuskey='itemKey'\n                      :tplData='detailTableData'\n                      :tplResetFun='templateTableFormResetFun'\n                      \n                      @form-confirm-click='detailFormConfirm'\n                      @form-cancel-click='detailFormCancel'\n                      @edit-table-click='detailEditTableRow'\n                      @delete-table-click='detailDeleteTableRow'\n                      show-type='table-form'\n                      >\n        </ifbp-template>\n        <!--分页组件-->\n        <el-pagination\n          :current-page='currentPage'\n          :page-sizes='pageSizes'\n          :page-size='pageSize'\n          layout='total, sizes, prev, pager, next, jumper'\n          :total='totalElements'\n          @size-change='handleSizeChange'\n          @current-change='handleCurrentChange'\n          >\n        </el-pagination>\n      </ifbp-panel>\n      <!-- 详情列表 temp end-->\n    </ifbp-panel-group>\n  </div>\n\n  <!--删除确认Dialog-->\n  <el-dialog\n    title='提示'\n    v-model='delDialogVisible'\n    @update:visible='val => delDialogVisible = val'\n    :modal='true'\n    size='tiny'>\n    <span>确认删除该数据？</span>\n    <span slot='footer' class='dialog-footer'>\n      <el-button @click='delDialogVisible = false'>取 消</el-button>\n      <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n    </span>\n  </el-dialog>\n\n</div>\n"
  

});
 
 define('yls^base/holidayManage/src/holidayManage-table.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      return {
        //模版主键
        funNode: 'BT018',
        nexusKey: 'HOLIDAY-CATEGORY',
        searchTemplateCode: 'YLSCXMB_BASE_HOLIDAYCATEGORY',
        holidayCategoryTableData: {},
        searchParameters: '',
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
      handleSearch: function handleSearch(searchTemplate) {
        this.searchParameters = JSON.stringify(searchTemplate);
        this.request();
      },
  
      // 添加按钮
      addHolidayCategoryInfo: function addHolidayCategoryInfo() {
        location.hash = '/holidayManage/add';
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = '/holidayManage/detail/' + scope.row.pk_holiday_category;
      },
  
      //选择条数改变
      handleSelectionChange: function handleSelectionChange(selection) {
        this.$message('选中条数为:' + selection.length);
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_holiday_category;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBase + 'holidayCategory/deleteById',
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
          url: _publicData.ylsBase + 'holidayCategory/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          if (res.data.success === true) {
            //HolidayCategoryEntity_t UI模板表格名称
            var originalValue = res.data.data.content;
            _this2.$refs['holidayCategory-table'].setData('HolidayCategoryEntity_t', JSON.parse(JSON.stringify(originalValue)));
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--节点title-->\n  <div class='title-container'>\n    <h2 class='name'>节假日管理</h2>\n  </div>\n  <!--按钮区域-->\n  <div class='operator-container'>\n    <div class='fl'>\n      <el-button type='primary' class='button-no-radius' @click='addHolidayCategoryInfo'>新增</el-button>\n      <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button-->\n    </div>\n    <ifbp-search class='fr' :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n  </div>\n\n  <!-- 假日类别列表 -->\n  <div id='holidayCategoryList' class='list-main-container clearfix'>\n    <!--模板组件-->\n    <ifbp-template ref='holidayCategory-table'\n                  tplId='holidayCategory-table-template'\n                  :funnode='funNode'\n                  :nexuskey='nexusKey'\n                  :tplData='holidayCategoryTableData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @selection-change='handleSelectionChange'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page='currentPage'\n      :page-sizes='pageSizes'\n      :page-size='pageSize'\n      layout='total, sizes, prev, pager, next, jumper'\n      :total='totalElements'\n      @size-change='handleSizeChange'\n      @current-change='handleCurrentChange'\n      >\n    </el-pagination>\n  \n    <!--删除确认Dialog-->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n        <el-button @click='delDialogVisible = false'>取 消</el-button>\n        <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});

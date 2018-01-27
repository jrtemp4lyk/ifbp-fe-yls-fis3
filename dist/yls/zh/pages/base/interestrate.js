 
 define('yls^base/interestrate/src/interestRate-card.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('loadDetail')], //分页方法引入
    data: function data() {
      var oThis = this;
      return {
        //固定写法
        scrollDom: document.getElementsByClassName('view')[0],
  
        // 利率主模板 baseTemplateRef start
        funnode: 'BT010',
        nexuskey: 'INTEREST-RATE',
        interestRateData: {
          rules: {}
        },
        mainMethod: {
          selectionChange: function selectionChange(val) {
            debugger;
            if (oThis.copyForRate !== undefined) {
              if (val === oThis.copyForRate.interrate_type) {
                oThis.selectedValue = val;
                // 更新子表的档次枚举项
                oThis.refreshSelections();
                oThis.$refs.detailTable.setTableData(oThis.copyForItem);
                oThis.ifDeleteItems = false;
              } else {
                oThis.$confirm('修改利率种类将在保存时清空子表, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(function () {
                  oThis.selectedValue = val;
                  // 更新子表的档次枚举项
                  oThis.refreshSelections();
                  // 清空子表
                  oThis.$refs.detailTable.setTableData();
                  oThis.ifDeleteItems = true;
                })["catch"](function () {
                  oThis.$refs.baseTemplateRef.getFormData().interrate_type = oThis.copyForRate.interrate_type;
                });
              }
            } else {
              oThis.selectedValue = val;
              // 更新子表的档次枚举项
              oThis.refreshSelections();
            }
          }
        },
        totalSelections: '',
        selectedValue: '',
        ifDeleteItems: false,
        interestRateEdit: false,
        pk_interest_rate: '',
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            if (oThis.interestRateEdit === false) {
              oThis.interestRateEdit = true;
              // 备份数据
              var copyRate = oThis.$refs.baseTemplateRef.getFormData();
              oThis.copyForRate = JSON.parse(JSON.stringify(copyRate));
            } else {
              oThis.interestRateClickCancel();
            }
          }
        }],
        resetFunction: function resetFunction($node) {
          var $select = $node.find('el-select');
          $select.attr('v-on:change', 'selectionChange');
        },
        // 利率主模板 baseTemplateRef end
  
        // 利率详情 detailRef start
        //模版主键
        detailFunnode: 'BT010',
        detailNexuskey: 'INTEREST-RATE-ITEM',
        detailTableData: {
          rules: {}
        },
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        pk_interest_rate_item: '',
        //利率详情
        detailIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_interest_rate == null) {
              oThis.$message({
                message: '请先保存利率信息',
                type: 'error'
              });
              return;
            }
            if (oThis.interestRateEdit === true) {
              oThis.$message({
                message: '利率信息尚处于编辑状态, 不可新增详情',
                type: 'error'
              });
              return;
            }
  
            // 关闭table中的编辑区
            oThis.$refs.detailTable.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.detailTable.resetFormData();
            // 显示新增区域
            oThis.$refs.detailTable.comp.formShow = true;
          }
        }],
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find('el-table');
          $table.attr(':show-header', 'true');
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
        location.hash = '/interestRate';
      },
  
      // 获得子表档次的所有枚举项
      getTotalSelections: function getTotalSelections() {
        this.totalSelections = [].concat(this.$refs.detailTable.getData('interrate_classvar'));
        debugger;
      },
  
      // 更新子表档次枚举项
      refreshSelections: function refreshSelections() {
        debugger;
        var levelSelectionList = new Array();
        if (this.selectedValue === 'SHIBOR') {
          levelSelectionList.push(this.totalSelections[0]);
          levelSelectionList.push(this.totalSelections[1]);
          levelSelectionList.push(this.totalSelections[2]);
          levelSelectionList.push(this.totalSelections[3]);
          levelSelectionList.push(this.totalSelections[5]);
          levelSelectionList.push(this.totalSelections[8]);
          levelSelectionList.push(this.totalSelections[11]);
          levelSelectionList.push(this.totalSelections[14]);
        } else if (this.selectedValue === 'LIBOR') {
          for (var i = 0; i < 15; i++) {
            levelSelectionList.push(this.totalSelections[i]);
          }
        } else if (this.selectedValue === 'PBCDR') {
          for (var _i = 15; _i < 22; _i++) {
            levelSelectionList.push(this.totalSelections[_i]);
          }
        } else if (this.selectedValue === 'PBCCR') {
          for (var _i2 = 22; _i2 < 27; _i2++) {
            levelSelectionList.push(this.totalSelections[_i2]);
          }
        }
        console.log('lyktest');
        console.log(levelSelectionList);
        this.$refs.detailTable.setData('interrate_classvar', levelSelectionList);
      },
  
      // 利率主模板 baseTemplateRef 事件处理 start
      interestRateClickCancel: function interestRateClickCancel() {
        this.interestRateEdit = false;
        this.$refs.baseTemplateRef.setFormData(this.copyForRate);
        this.$refs.detailTable.setTableData(this.copyForItem);
      },
      interestRateSaveConfirm: function interestRateSaveConfirm() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.getFormData();
        this.$http({
          url: _publicData.ylsBase + 'interestRate/updateOrCreate',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
            _this.$message({
              message: '更新主表成功',
              type: 'success'
            });
            var originalValue = res.data.data;
            _this.pk_interest_rate = originalValue.pk_interest_rate;
            location.hash = '/interestRate/detail/' + _this.pk_interest_rate;
            _this.interestRateEdit = false;
            _this.$refs['baseTemplateRef'].setFormData(JSON.parse(JSON.stringify(originalValue)));
            // 判断是否清空子表
            debugger;
            if (_this.ifDeleteItems === true) {
              _this.$http({
                url: _publicData.ylsBase + 'interestRateItem/deleteBatch',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                data: _this.copyForItem
              }).then(function (res) {
                if (res.data.success === true) {
                  _this.$message({
                    message: '清空子表成功',
                    type: 'success'
                  });
                  _this.loadDetail();
                } else {
                  _this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
                }
              })["catch"](function () {
                _this.$message({
                  message: '清空失败',
                  type: 'error'
                });
              });
            } else {
              _this.loadDetail();
            }
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
      },
  
      //加载利率信息
      loadInterestRateInfo: function loadInterestRateInfo() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'interestRate/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_interest_rate
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this2.$refs['baseTemplateRef'].setFormData(JSON.parse(JSON.stringify(originalValue)));
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
  
      // 利率主模板 baseTemplateRef 事件处理 end
  
      // 利率详情 detailRef 事件处理 start
      //删除操作
      detailDeleteTableRow: function detailDeleteTableRow(scope) {
        this.delDialogVisible = true;
        this.pk_interest_rate_item = scope.row.pk_interest_rate_item;
      },
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'interestRateItem/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.pk_interest_rate_item
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.delDialogVisible = false;
            _this3.loadDetail();
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
      loadDetail: function loadDetail() {
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
              custCondList: [{ 'key': 'fk_interest_rate',
                'oper': '=',
                'value': this.pk_interest_rate
              }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBase + 'interestRateItem/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          if (res.data.success === true) {
            //InterestRateItemEntity_t UI模板表格名称
            var originalValue = res.data.data.content;
            _this4.$refs['detailTable'].setTableData(JSON.parse(JSON.stringify(originalValue)));
            _this4.totalElements = res.data.data.totalElements; // 总条数
            // 备份数据
            var copyItem = _this4.$refs.detailTable.getTableData();
            _this4.copyForItem = JSON.parse(JSON.stringify(copyItem));
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
  
      //利率详情信息添加确认
      detailFormConfirm: function detailFormConfirm() {
        var _this5 = this;
  
        if (this.pk_interest_rate != null) {
          var data = this.$refs.detailTable.getFormData();
          data.fk_interest_rate = this.pk_interest_rate;
          this.$http({
            url: _publicData.ylsBase + 'interestRateItem/updateOrCreate',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          }).then(function (res) {
            if (res.data.success === true) {
              _this5.$message({
                message: '保存成功',
                type: 'success'
              });
              _this5.$refs.detailTable.comp.formShow = false;
              _this5.loadDetail();
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
        }
      },
      detailFormCancel: function detailFormCancel(type) {
        if (type === 'form') {
          this.$refs['detailTable'].comp.formShow = false;
        } else {
          this.$refs['detailTable'].getTableComp().closeExpandRow();
          var tmpTable = this.$refs.detailTable.getTableData();
          tmpTable[this.baseEditIndex] = this.baseData;
          this.$refs.detailTable.setTableData(tmpTable);
        }
      },
      detailEditTableRow: function detailEditTableRow(scope) {
        this.$refs.detailTable.getTableComp().expandRow(scope.row);
        this.$refs.detailTable.comp.formShow = false;
        this.$refs.detailTable.setFormData(scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      // 利率详情 detailRef 事件处理 end
  
      //加载数据
      loadData: function loadData() {
        this.pk_interest_rate = this.$root.$router.currentRoute.params.id;
        if (this.pk_interest_rate && this.pk_interest_rate != '') {
          //加载利率信息
          this.loadInterestRateInfo();
          //加载利率详情列表
          this.loadDetail();
        } else {
          this.interestRateEdit = true;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">利率</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\">\n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n      </div>\n      <!-- 利率主模板 temp start-->\n      <ifbp-panel id='basePanel' title='利率信息' :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  show-type=\"form\"\n                  \n                  :tplResetFun='resetFunction'\n                  :methods='mainMethod'\n                  :tplData=\"interestRateData\"\n                  :editable=\"interestRateEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"interestRateEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"interestRateClickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"interestRateSaveConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 利率主模板 temp end-->\n\n\n      <!-- 利率详情列表 temp start-->\n      <ifbp-panel id='detailList' title='利率详情' :icons=\"detailIcons\">\n        <ifbp-template ref=\"detailTable\"\n                      tplId=\"detailTable-template\"\n                      :funnode=\"detailFunnode\"\n                      :nexuskey=\"detailNexuskey\"\n                      :tplData=\"detailTableData\"\n                      :tplResetFun=\"templateTableFormResetFun\"\n                      @after-create=\"getTotalSelections\"\n                      @form-confirm-click=\"detailFormConfirm\"\n                      @form-cancel-click=\"detailFormCancel\"\n                      @edit-table-click=\"detailEditTableRow\"\n                      @delete-table-click=\"detailDeleteTableRow\"\n                      show-type=\"table-form\"\n                      >\n        </ifbp-template>\n        <!--分页组件-->\n        <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n        </el-pagination>\n      </ifbp-panel>\n      <!-- 利率详情列表 temp end-->\n    </ifbp-panel-group>\n  </div>\n\n  <!--删除确认Dialog-->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n\n</div>\n"
  

});
 
 define('yls^base/interestrate/src/interestRate-table.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      return {
        //模版主键
        funnode: 'BT010',
        nexuskey: 'INTEREST-RATE',
        interestRateTableData: {},
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
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
      addInterestRateInfo: function addInterestRateInfo() {
        location.hash = '/interestRate/add';
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = '/interestRate/detail/' + scope.row.pk_interest_rate;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_interest_rate;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: '/yls-base-web/interestRate/deleteById',
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
          url: '/yls-base-web/interestRate/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          if (res.data.success === true) {
            //InterestRateEntity_t UI模板表格名称
            var originalValue = res.data.data.content;
            _this2.$refs['InterestRate-table'].setTableData(JSON.parse(JSON.stringify(originalValue)));
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">利率</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterestRateInfo\">新增</el-button>\n      <!--<el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button-->\n    </div>\n    <!-- <div class=\"fr\">\n    </div> -->\n  </div>\n\n  <!-- 利率列表 -->\n  <div id=\"interestRateList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n    <ifbp-template ref=\"InterestRate-table\"\n                  tplId=\"interestRate-table-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData='interestRateTableData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n  \n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});

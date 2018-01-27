 
 define('yls^base/exchangeRate/src/curr-info-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('loadCurrRate')], //分页方法引入
    data: function data() {
      var oThis = this;
      return {
        //固定写法
        scrollDom: document.getElementsByClassName('view')[0],
        //币种转换主键
        pk_currInfo: '',
        //删除对话框是否展示
        delDialogVisible: false,
        //删除标识，区分子表
        delType: '',
        //删除实体主键
        delId: '',
        // 币种转换主模板 baseTemplateRef start
        infoFunNode: 'BT001',
        infoNexusKey: 'Curr_Info',
        tplData: {},
        //是否编辑态
        editable: false,
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            if (oThis.editable === false) {
              oThis.editable = true;
              // 备份数据
              var copyData = oThis.$refs.baseTemplateRef.comp.CurrInfo;
              oThis.copyForData = JSON.parse(JSON.stringify(copyData));
            } else {
              oThis.clickCancel();
            }
          }
        }],
        // 币种转换主模板 baseTemplateRef end
  
        // 汇率 currRateRef start
        rateFunNode: 'BT001',
        rateNexusKey: 'Curr_Rate',
        currRateData: {},
        currRateResetFun: function currRateResetFun($node) {
          var $table = $node.find('el-table');
          $table.attr(':show-header', 'true');
          var operateArr = [{
            title: '编辑',
            icon: 'edit'
          }, {
            title: '删除',
            icon: 'delete'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
  
        //汇率添加
        currRatePlusIcons: [{
          icon: 'plus',
          click: function click() {
            // 关闭table中的编辑区
            if (oThis.pk_currInfo != null && oThis.pk_currInfo != '') {
              oThis.$refs.currRateRef.getTableComp().closeExpandRow();
              // 重置新增数据
              oThis.$refs.currRateRef.resetFormData();
              // 显示新增区域
              oThis.$refs.currRateRef.comp.formShow = true;
            } else {
              oThis.$message({
                message: '请先保存主表信息!',
                type: 'error'
              });
            }
          }
        }]
        // 汇率 currRateRef end
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //返回按钮
      goBack: function goBack() {
        location.hash = '/currInfo/list';
      },
  
      // 币种转换主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
        this.$refs.baseTemplateRef.setData('CurrInfo', this.copyForData);
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.CurrInfo;
        this.$http({
          url: _publicData.ylsBase + 'currInfo/save',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data
        }).then(function (res) {
          if (res.data.success === true) {
            _this.pk_currInfo = res.data.data.pk_curr_info;
            location.hash = '/currInfo/detail/' + _this.pk_currInfo;
            _this.editable = false;
            var originalValue = res.data.data;
            _this.$refs["baseTemplateRef"].setData('CurrInfo', originalValue);
            //加载租金计划表
            _this.loadCurrRate();
          } else {
            _this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this.$message({
            message: '主表保存失败！',
            type: 'error'
          });
        });
      },
  
      // 币种转换主模板 baseTemplateRef 事件处理 end
  
      // 汇率 currRateRef 事件处理 start
      currRateFormConfirm: function currRateFormConfirm() {
        var _this2 = this;
  
        if (this.pk_currInfo != null && this.pk_currInfo != '') {
          var data = this.$refs.currRateRef.comp.CurrRate;
          var jsonData = JSON.parse(JSON.stringify(data));
          jsonData.fk_currinfo = this.pk_currInfo;
          this.$http({
            url: _publicData.ylsBase + 'currRate/save',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: jsonData
          }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: '保存成功！',
                type: 'success'
              });
              _this2.$refs.currRateRef.comp.formShow = false;
              _this2.loadCurrRate();
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          })["catch"](function (e) {
            _this2.$message({
              message: '汇率保存失败！',
              type: 'error'
            });
          });
        } else {
          this.$message({
            message: '请先保存主表信息!',
            type: 'error'
          });
        }
      },
      currRateFormCancel: function currRateFormCancel(type) {
        this.$refs.currRateRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.currRateRef.comp.formShow = false;
        } else {
          this.$refs.currRateRef.getTableComp().closeExpandRow();
          var currRateTable = this.$refs.currRateRef.getData('CurrRate_t');
          currRateTable[this.baseEditIndex] = this.baseData;
          this.$refs.currRateRef.setData('CurrRate_t', currRateTable);
        }
      },
      currRateEditTableRow: function currRateEditTableRow(scope) {
        this.$refs.currRateRef.getTableComp().expandRow(scope.row);
        this.$refs.currRateRef.comp.formShow = false;
        this.$refs.currRateRef.setData('CurrRate', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      currRateDeleteTableRow: function currRateDeleteTableRow(scope) {
        this.delType = 'currRate';
        this.delDialogVisible = true;
        this.delId = scope.row.pk_curr_rate;
      },
  
      // 汇率 currRateRef 事件处理 end
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_currInfo = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_currInfo && this.pk_currInfo != '') {
          //加载币种转换信息
          this.loadCurrInfo(this.pk_currInfo);
          //加载投放信息
          this.loadCurrRate();
        } else {
          this.editable = true;
        }
      },
  
      //加载币种转换信息
      loadCurrInfo: function loadCurrInfo(pk_currInfo) {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBase + 'currInfo/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_currInfo
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            _this3.$refs['baseTemplateRef'].setData('CurrInfo', JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: '币种转换详情获取失败',
            type: 'error'
          });
        });
      },
  
      //加载投放信息
      loadCurrRate: function loadCurrRate() {
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
              custCondList: [{
                'key': 'fk_currinfo',
                'oper': '=',
                'value': this.pk_currInfo
              }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBase + 'currRate/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data.content;
            _this4.$refs['currRateRef'].setData('CurrRate_t', JSON.parse(JSON.stringify(originalValue)));
            _this4.totalElements = res.data.data.totalElements;
          } else {
            _this4.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this4.$message({
            message: ' 汇率获取失败',
            type: 'error'
          });
        });
      },
  
  
      //删除确定按钮
      deleteConfirmClick: function deleteConfirmClick() {
        var _this5 = this;
  
        var requestUrl = '';
        if (this.delType == 'currRate') {
          requestUrl = _publicData.ylsBase + 'currRate/deleteById';
        }
        if (requestUrl != '') {
          this.$http({
            url: requestUrl,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: this.delId
          }).then(function (res) {
            if (res.data.success === true) {
              _this5.$message({
                message: '删除成功',
                type: 'success'
              });
              _this5.delDialogVisible = false;
              //刷新列表
              if (_this5.delType == 'currRate') {
                _this5.loadCurrRate();
              }
            } else {
              _this5.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          })["catch"](function (e) {
            _this5.$message({
              message: '删除失败',
              type: 'error'
            });
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">币种转换信息</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\" >返回</el-button>\n      </div>\n      <!-- 币种转换主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"币种转换信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"infoFunNode\"\n                  :nexuskey=\"infoNexusKey\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 币种转换主模板 temp end-->\n\n      <!-- 汇率 temp start-->\n      <ifbp-panel id=\"currRatePanel\" title=\"汇率\" :icons=\"currRatePlusIcons\" v-show=\"true\">\n        <ifbp-template ref=\"currRateRef\"\n                      tplId=\"currRateTemplate\"\n                      :funnode=\"rateFunNode\"\n                      :nexuskey=\"rateNexusKey\"\n                      :tplData=\"currRateData\"\n                      :tplResetFun=\"currRateResetFun\"\n                      @form-confirm-click=\"currRateFormConfirm\"\n                      @form-cancel-click=\"currRateFormCancel\"\n                      @edit-table-click=\"currRateEditTableRow\"\n                      @delete-table-click=\"currRateDeleteTableRow\"\n                      show-type=\"table-form\"\n                      >\n        </ifbp-template>\n        <!--分页组件-->\n        <el-pagination\n          :current-page='currentPage'\n          :page-sizes='pageSizes'\n          :page-size='pageSize'\n          layout='total, sizes, prev, pager, next, jumper'\n          :total='totalElements'\n          @size-change='handleSizeChange'\n          @current-change='handleCurrentChange'\n          >\n        </el-pagination>\n      </ifbp-panel>\n      <!-- 汇率 temp end-->\n    </ifbp-panel-group>\n  </div>\n\n  <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n</div>\n"
  

});
 
 define('yls^base/exchangeRate/src/curr-info-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)()], //分页方法引入
      data: function data() {
          return {
              //模版主键
              funNode: "BT001",
              nexusKey: "Curr_Info",
              currInfoListData: {},
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
          addCurrInfo: function addCurrInfo() {
              location.hash = '/currInfo/add';
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message('搜索：' + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = '/currInfo/detail/' + scope.row.pk_curr_info;
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_curr_info;
              this.delDialogVisible = true;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.$http({
                  url: _publicData.ylsBase + 'currInfo/deleteById',
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
                  url: _publicData.ylsBase + 'currInfo/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  if (res.data.success === true) {
                      //QuoteCalculator_table UI模板表格名称
                      var originalValue = res.data.data.content;
                      _this2.$refs['currInfoList-table'].setData('CurrInfo_t', originalValue);
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
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--节点title-->\n  <div class='title-container'>\n    <h2 class='name'>币种转换信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class='operator-container'>\n    <div class='fl'>\n      <el-button type='primary' class='button-no-radius' @click='addCurrInfo'>新增</el-button>\n      <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button>-->\n    </div>\n    <div class='fr'>\n      <el-input placeholder='测算编码/名称' v-model='search_input' icon='search'  @keyup.enter.native='searchInputEnterClick' :on-icon-click='searchInputEnterClick'></el-input>\n      <el-button type='text' @click='showSearch'>\n        高级\n        <i class='el-icon-arrow-down' v-if='this.isHide'></i>\n        <i class='el-icon-arrow-up' v-if='!this.isHide'></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class='advanced-search-panel' :class='{hide: isHide}'>\n  \n  </div>\n\n  <!-- 报价列表 -->\n <div id='currInfoList' class='list-main-container clearfix'>\n    <!--模板组件-->\n   <ifbp-template ref='currInfoList-table'\n                  tplId='currInfoList-template'\n                  :funnode=\"funNode\"\n                  :nexuskey=\"nexusKey\"\n                  :tplData='currInfoListData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page='currentPage'\n      :page-sizes='pageSizes'\n      :page-size='pageSize'\n      layout='total, sizes, prev, pager, next, jumper'\n      :total='totalElements'\n      @size-change='handleSizeChange'\n      @current-change='handleCurrentChange'\n      >\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n          <el-button @click='delDialogVisible = false'>取 消</el-button>\n          <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});

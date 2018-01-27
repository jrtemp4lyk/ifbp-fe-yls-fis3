 
 define('yls^base/penaltyRuleDe/src/penaltyRuleDe.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
    mixins: [(0, _publicData.pubPageMethods)()], //分页方法引入
    data: function data() {
      var oThis = this;
      return {
  
        //模版主键
        funnode: 'BT009',
        nexuskey: 'penalty_rule',
        //当前页
        currentPage: 1,
        //每页显示个数选择器的选项设置
        pageSizes: _publicData.pubPageSizes,
        //每页显示条目个数
        size: (0, _publicData.pubSizes)(),
        //总条目数
        totalSize: 0,
        penaltyRuleDeTableData: {},
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
        pk_prj_rule: '',
        //showDeleteButton: true,
        baseData: '',
        baseEditIndex: '',
        icons: [{
          icon: "plus",
          click: function click() {
            // 关闭table中的编辑区
            oThis.$refs.penaltyRuleDeRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.penaltyRuleDeRef.resetFormData();
            // 显示新增区域
            oThis.$refs.penaltyRuleDeRef.comp.formShow = true;
          }
        }],
        // 方法
        tMethods: {
          isActiveClick: function isActiveClick(val, scope) {
            var data = scope.row;
            this.confirmClick(data);
            debugger;
            var penaltyRuleDe = oThis.$refs.penaltyRuleDeRef.getTableData();
            for (var i = 0; i < penaltyRuleDe.length; i++) {
              var obj = penaltyRuleDe[i];
              if (scope.$index != i && obj.is_active == "0") {
                obj.is_active = "1";
              }
            }
          },
          confirmClick: function confirmClick(data) {
            var _this = this;
  
            this.$http({
              url: _publicData.ylsBusi + "contr/penaltyRuleDe/updateStatus",
              headers: { 'Content-type': 'application/json' },
              method: 'post',
              dataType: 'json',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this.$message({
                  message: '更新状态成功',
                  type: 'success'
                });
                _this.delDialogVisible = false;
                _this.request(_this.currentPage - 1, _this.size);
              } else {
                _this.$message({
                  message: '更新状态失败',
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this.$message({
                message: 'Network Error',
                type: 'error'
              });
            });
          }
        },
        //操作按钮
        penaltyRuleDeTableResetFun: function penaltyRuleDeTableResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find('el-table'); //this.getNodeById($node, "w53nyhnbbdc");
          $table.attr(':show-header', 'true');
          var operateArr = [{
            title: '编辑',
            icon: 'edit'
          }, {
            title: '删除',
            icon: 'delete'
          }];
  
          //获取操作按钮html片段
          var isActiveHtml = '<el-table-column label="是否启用"   width="100" ><template scope="scope">' + '<el-tooltip :content="PenaltyRuleDe_t[scope.$index].is_active == 1 ? \'\u70B9\u51FB\u542F\u7528\' : \'\u70B9\u51FB\u7981\u7528\'" placement="top">' + '<el-switch v-model="PenaltyRuleDe_t[scope.$index].is_active"  on-color="#13ce66"  off-color="#ff4949" on-value="0" off-value="1"' + '@change="function(val){isActiveClick(val, scope);}">' + '</el-switch>' + '</el-tooltip></template></el-table-column>';
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(isActiveHtml);
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
        this.$message('搜索：' + this.search_input);
      },
  
      //查看按钮
      tableEditClick: function tableEditClick(scope) {
        this.$refs.penaltyRuleDeRef.getTableComp().expandRow(scope.row);
        this.$refs.penaltyRuleDeRef.comp.formShow = false;
        this.$refs.penaltyRuleDeRef.setData('PenaltyRuleDe', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.pk_prj_rule = scope.row.pk_prj_rule;
        this.delDialogVisible = true;
      },
  
  
      //更新是否启用状态
  
      //删除确定
      deleteClick: function deleteClick() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "contr/penaltyRuleDe/deleteById",
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.pk_prj_rule
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
              message: '删除失败',
              type: 'error'
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: 'Network Error',
            type: 'error'
          });
        });
      },
  
      //保存确定
      penaltyRuleDeConfirm: function penaltyRuleDeConfirm() {
        var _this3 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.penaltyRuleDeRef.comp.PenaltyRuleDe;
        data.source_bill = this.pk_prjId;
        //是否系统设置此节点新增数据
        data.is_base = "0";
        data.is_active = "1"; //新增的时候不启用
        if (data.pk_prj_rule) {
          url = _publicData.ylsBusi + 'contr/penaltyRuleDe/update';
        } else {
          url = _publicData.ylsBusi + 'contr/penaltyRuleDe/create';
        }
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '保存成功',
              type: 'success'
            });
            _this3.$refs['penaltyRuleDeRef'].comp.formShow = false;
            _this3.request(_this3.currentPage - 1, _this3.size);
          } else {
            _this3.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        })["catch"](function () {
          _this3.$message({
            message: '更新失败',
            type: 'error'
          });
        });
      },
      //保存取消
      penaltyRuleDeCancel: function penaltyRuleDeCancel(type) {
        if (type === 'form') {
          this.$refs['penaltyRuleDeRef'].comp.formShow = false;
        } else {
          this.$refs['penaltyRuleDeRef'].getTableComp().closeExpandRow();
          var penaltyRuleDeTable = this.$refs.penaltyRuleDeRef.getData('penaltyRuleDe_t');
          penaltyRuleDeTable[this.baseEditIndex] = this.baseData;
          this.$refs.penaltyRuleDeRef.setData('penaltyRuleDe_t', penaltyRuleDeTable);
        }
      },
      request: function request(n, s) {
        var _this4 = this;
  
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: n,
          pageSize: s,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'is_base',
                'oper': '=',
                'value': '0'
              }]
            }
          }
        };
        var url;
        url = _publicData.ylsBusi + "contr/penaltyRuleDe/page";
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          //PenaltyRuleDe_t UI模板表格名称
          var originalValue = res.data.data.content;
  
          _this4.$refs['penaltyRuleDeRef'].setData('PenaltyRuleDe_t', JSON.parse(JSON.stringify(originalValue)));
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
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fr\">\n      <el-input placeholder=\"编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  </div>\n\n  <!-- 逾期利率列表 -->\n  <ifbp-panel id=\"penaltyRuleDeList\" title=\"逾期利率\" :icons=\"icons\">\n    <!--模板组件-->\n    <ifbp-template ref=\"penaltyRuleDeRef\"\n                  tpl-id=\"penaltyRuleDe-table-id\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tpl-data=\"penaltyRuleDeTableData\"\n                  :tpl-reset-fun=\"penaltyRuleDeTableResetFun\"\n                  :methods=\"tMethods\"\n                  @form-confirm-click=\"penaltyRuleDeConfirm\"\n                  @form-cancel-click=\"penaltyRuleDeCancel\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\"\n                  show-type=\"table-form\">\n    </ifbp-template>\n\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalSize\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n    \n  \n\n  </ifbp-panel>\n</div>\n"
  

});

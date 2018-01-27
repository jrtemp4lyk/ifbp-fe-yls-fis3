 
 define('yls^base/currType/src/currType.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      var oThis = this;
      var validateCurrType = function validateCurrType(rule, value, callback) {
        if (rule.field == 'code') {
          if (value == '') {
            callback(new Error('编码不能为空! '));
          } else {
            var datam = {
              code: value
            };
            if (oThis.pk_currType != '') {
              datam.pk = oThis.pk_currType;
            }
            oThis.$http({
              url: _publicData.ylsBase + 'bdcurr/isUnique',
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
      };
      return {
        //模版主键
        funnode: 'solution',
        nexuskey: 'CURRTYPE',
        delId: '',
        pk_currType: '',
        delDialogVisible: false,
        currTypeTableData: {
          rules: {
            code: [{ validator: validateCurrType, trigger: 'blur' }]
          }
        },
        baseEditIndex: '',
        icons: [{
          icon: 'plus',
          click: function click() {
            oThis.pk_currType = '';
            // 关闭table中的编辑区
            oThis.$refs.currTypeRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.currTypeRef.resetFormData();
            // 显示新增区域
            oThis.$refs.currTypeRef.comp.formShow = true;
            console.log(oThis.pk_currType);
          }
        }],
        //操作按钮
        currTypeTableResetFun: function currTypeTableResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find('el-table');
          $table.attr(':show-header', 'true');
          var operateArr = [{
            title: '编辑',
            icon: 'edit'
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
      //查看按钮
      tableEditClick: function tableEditClick(scope) {
        this.pk_currType = scope.row.id;
        this.$refs.currTypeRef.getTableComp().expandRow(scope.row);
        this.$refs.currTypeRef.comp.formShow = false;
        this.$refs.currTypeRef.setData('currtype', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.id;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteClick: function deleteClick() {
        var _this = this;
  
        this.$http({
          url: '/yls-base-web/bdcurr/deleteById',
          headers: { 'Content-type': 'application/json' },
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
        })["catch"](function () {
          _this.$message({
            message: 'Network Error',
            type: 'error'
          });
        });
      },
  
      //保存确定
      currTypeConfirm: function currTypeConfirm(type) {
        var _this2 = this;
  
        var data = this.$refs.currTypeRef.comp.currtype;
        this.$refs.currTypeRef.validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: '/yls-base-web/bdcurr/updateOrCreate',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success == true) {
                _this2.$message({
                  message: '保存成功',
                  type: 'success'
                });
                _this2.$refs['currTypeRef'].comp.formShow = false;
                _this2.request();
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
        }, type);
      },
      //保存取消
      currTypeCancel: function currTypeCancel(type) {
        debugger;
        this.$refs.currTypeRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.currTypeRef.comp.formShow = false;
        } else {
          this.$refs.currTypeRef.getTableComp().closeExpandRow();
          var currTypeTable = this.$refs.currTypeRef.getData('currtype_t');
          currTypeTable[this.baseEditIndex] = this.baseData;
          this.$refs.currTypeRef.setData('currtype_t', currTypeTable);
        }
      },
      request: function request() {
        var _this3 = this;
  
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
          url: '/yls-base-web/bdcurr/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          //currtype_t UI模板表格名称
          if (res.data.success === true) {
            var originalValue = res.data.data.content;
            _this3.$refs['currTypeRef'].setData('currtype_t', JSON.parse(JSON.stringify(originalValue)));
            _this3.totalElements = res.data.data.totalElements; // 总条数
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this3.$message({
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--按钮区域-->\n  <!-- <div class='operator-container'>\n  </div> -->\n  <!-- 币种列表 -->\n  <ifbp-panel id='currTypeList' title='币种档案' :icons='icons'>\n    <!--模板组件-->\n    <ifbp-template ref='currTypeRef'\n                  tpl-id='currType-table-id'\n                  :funnode='funnode'\n                  :nexuskey='nexuskey'\n                  :tpl-data='currTypeTableData'\n                  :tpl-reset-fun='currTypeTableResetFun'\n\n                  @form-confirm-click='currTypeConfirm'\n                  @form-cancel-click='currTypeCancel'\n                  @edit-table-click='tableEditClick'\n                  @delete-table-click='tableDeleteClick'\n                  show-type='table-form'>\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='currentPage' :page-sizes='pageSizes'\n      :page-size='pageSize' layout='total, sizes, prev, pager, next, jumper' :total='totalElements'>\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n        <el-button @click='delDialogVisible = false'>取 消</el-button>\n        <el-button type='primary' @click='deleteClick'>确 定</el-button>\n      </span>\n    </el-dialog>\n    \n  </ifbp-panel>\n</div>\n"
  

});

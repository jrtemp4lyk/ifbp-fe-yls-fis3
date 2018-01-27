 
 define('yls^busi/project/src/application/apply-submitted.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')], //分页方法引入
    data: function data() {
      return {
        funnode: "BT008",
        nexuskey: "application",
        appliedTableData: {},
        showDeleteButton: false,
  
        delDialogVisible: false,
        appliedTableResetFun: function appliedTableResetFun($node) {
          var $table = $node.find('el-table');
          var operateArr = [{
            title: "编辑",
            icon: "search"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
  
    methods: {
      // table行的编辑操作
      tableEditClick: function tableEditClick(scope) {
        // location.hash = "/inoutType/detail/" + scope.row.pk_inout_type;
        var pk_application = scope.row.pk_application;
        var pk_customer = scope.row.pk_customer;
        var customer_type = scope.row.customer_type;
        this.$emit('chang-apply-submitted', ['toapplycustomerlist', pk_customer, pk_application, customer_type]);
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_inout_type;
      },
      applyFor: function applyFor() {
        // location.hash = "/inoutType/add";
      },
  
  
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
  
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      request: function request() {
        var _this = this;
  
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
  
          "pageNum": this.currentPage - 1,
          "pageSize": this.pageSize,
          "searchParams": {
            "searchMap": {
              custCondList: [{ key: "issubmit", oper: "=", value: "1" }]
            }
          }
        };
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/apply/page',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs["application-table"].setData("application_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.pageSize = res.data.data.pageSize; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this2 = this;
  
        var delId = this.delId;
        this.$http({
          url: _publicData.ylsBusi + 'inoutType/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: '删除成功',
              type: "success"
            });
            _this2.delDialogVisible = false;
            _this2.request(_this2.currentPage - 1, _this2.size);
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: "Network Error",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!-- 组件 -->\n  <div class=\"list-main-container clearfix\">\n    <ifbp-template ref=\"application-table\"\n                  tpl-id=\"applied-id\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tpl-data=\"appliedTableData\"\n                  show-type=\"table\"\n                  :tpl-reset-fun=\"appliedTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\">\n    </ifbp-template>\n\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n    \n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/application/apply-submitting.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      return {
        funnode: "BT008",
        nexuskey: "application",
        applingTableData: {},
        showDeleteButton: false,
  
        delDialogVisible: false,
        applingTableResetFun: function applingTableResetFun($node) {
          var $table = $node.find('el-table');
          var operateArr = [{
            title: '编辑',
            icon: 'edit'
          }, {
            title: '删除',
            icon: 'delete'
          }, {
            title: '提交',
            icon: 'pt-shangchuan'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
  
    methods: {
      // table行的编辑操作
      tableEditClick: function tableEditClick(scope) {
        var pk_application = scope.row.pk_application;
        var pk_customer = scope.row.pk_customer;
        var customer_type = scope.row.customer_type;
        this.$emit('chang-apply-submitting', ['toapplycustomerlist', pk_customer, pk_application, customer_type]);
      },
  
      //提交
      tableSubmitClick: function tableSubmitClick(scope) {
        this.submitappling(scope);
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_application;
      },
      submitApplication: function submitApplication() {
        var _this = this;
  
        // location.hash = "/inoutType/add";
        var url = _publicData.ylsBusi + 'prj/apply/createapply';
        var data = {
          'issubmit': '0',
          'pk_customer': pk_customer
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
            _this.$message({
              message: '操作成功！',
              type: "success"
            });
            _this.inoutTypeFormEdit = false;
          } else {
            _this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this.$message({
            message: "操作失败",
            type: "error"
          });
        });
      },
  
  
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
  
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      request: function request() {
        var _this2 = this;
  
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": this.currentPage - 1,
          "pageSize": this.pageSize,
          "searchParams": {
            "searchMap": {
              custCondList: [{ key: "issubmit", oper: "=", value: "0" }]
            }
          }
        };
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/apply/page',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          _this2.originalValue = res.data.data.content;
          _this2.$refs["application-table"].setData("application_t", JSON.parse(JSON.stringify(_this2.originalValue)));
          _this2.totalElements = res.data.data.totalElements; // 总条数
          _this2.pageSize = res.data.data.pageSize; // 每页的条数
        })["catch"](function () {
          _this2.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        var delId = this.delId;
        this.$http({
          url: _publicData.ylsBusi + 'apply/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: delId
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
        })["catch"](function () {
          _this3.$message({
            message: "Network Error",
            type: "error"
          });
        });
      },
  
  
      //提交待申请
      submitappling: function submitappling(scope) {
        var _this4 = this;
  
        var pk_application = scope.row.pk_application;
        var url = _publicData.ylsBusi + 'prj/apply/updateapply';
        var data = {
          "pk_application": pk_application
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
            _this4.$message({
              message: "操作成功！",
              type: "success"
            });
            _this4.$emit('chang-apply-submitting', ['flushapplysubmitting', '', '', '']);
            _this4.inoutTypeFormEdit = false;
          } else {
            _this4.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this4.$message({
            message: "操作失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <div class=\"list-main-container clearfix\">\n    <ifbp-template ref=\"application-table\"\n                  tpl-id=\"appling-table-id\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tpl-data=\"applingTableData\"\n                  show-type=\"table\"\n                  :tpl-reset-fun=\"applingTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\"\n                  @pt-shangchuan-table-click=\"tableSubmitClick\">\n    </ifbp-template>\n\n     <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n    \n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi-bank-account.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer", "invisible"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
  
      var validatecustomer = function validatecustomer(rule, value, callback) {
  
        //银行账户唯一校验
        if (rule.field === "account_no") {
          if (value === "") {
            callback(new Error("银行账户不能为空"));
          } else {
            var datam = {
              account_no: value,
              pk_customer: oThis.pk_customer
            };
            oThis.$http({
              url: _publicData.ylsBusi + "cust/BankAccount/checkOnlyOne",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(datam))
            }).then(function (res) {
              if (res.data.success === true) {
                callback();
              } else {
                callback(new Error("客户银行卡号重复"));
              }
            })["catch"](function () {
              callback(new Error("后台服务有误，请联系管理员！"));
            });
          }
        }
      };
      return {
        bankaccountDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 银行账户信息新增
        bankaccountIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.bankaccountRef.comp;
            var table = uitemplateComp.$refs["bankaccount_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        funnode: "BT003",
        nexuskey: "bank_busi_apply",
        bankaccountData: {
          rules: {
            account_no: [{ validator: validatecustomer, trigger: "blur" }],
            is_withhold: [{ required: true, message: "是否银行代扣不能为空", trigger: "blur" }]
          }
        },
        bankaccountResetFun: function bankaccountResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          var $table = this.getNodeById($node, "cncsdcy7yfp");
          // $table.attr(":show-header", "false");
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
        bankaccountTplMethods: {
          // form的保存操作
        }
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {},
  
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.requestbankaccount();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestbankaccount();
        }
      },
  
      //请求银行账户信息
      requestbankaccount: function requestbankaccount() {
        var _this = this;
  
        var url = void 0;
        url = _publicData.ylsBusi + "cust/BankAccount/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{ key: "pk_customer", oper: "=", value: this.pk_customer }]
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
          _this.originalValue = res.data.data.content;
          _this.$refs["bankaccountRef"].setData("BankAccount_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "银行信息获取失败",
            type: "error"
          });
        });
      },
  
      //银行账户情况保存
      bankaccountFormConfirm: function bankaccountFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.bankaccountRef.comp.BankAccount;
        console.log(this.pk_customer);
        data.pk_customer = this.pk_customer;
        //保存校验
        this.$refs.bankaccountRef.comp.$refs["BankAccount_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: _publicData.ylsBusi + "cust/BankAccount/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.bankaccountRef.getData("BankAccount_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this2.$refs.bankaccountRef.setData("BankAccount_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["bankaccountRef"].comp.formShow = false;
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
        });
      },
      // 银行账户信息form的取消操作
      bankaccountFormCancel: function bankaccountFormCancel(type) {
        if (type === "form") {
          this.$refs["bankaccountRef"].comp.formShow = false;
        } else {
          this.$refs["bankaccountRef"].getTableComp().closeExpandRow();
          var OtherContactTable = this.$refs.bankaccountRef.getData('BankAccount_t');
          OtherContactTable[this.baseEditIndex] = this.baseData;
          this.$refs.bankaccountRef.setData('BankAccount_t', OtherContactTable);
        }
      },
      //银行账户编辑
      bankaccountEditTableRow: function bankaccountEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        this.$refs.bankaccountRef.getTableComp().expandRow(scope.row);
        this.$refs.bankaccountRef.comp.formShow = false;
        this.$refs.bankaccountRef.setData('BankAccount', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //银行账户信息删除提示
      bankaccountDeleteTableRow: function bankaccountDeleteTableRow(scope) {
        this.bankaccountDelVisible = true;
        this.delId = scope.row.pk_cust_bankaccount;
      },
      //银行账户信息删除
      bankaccountDeleteClick: function bankaccountDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/BankAccount/deleteById",
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
            _this3.requestbankaccount();
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
        this.bankaccountDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"bankaccountRef\"\n                      tplId=\"bankaccountTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"bankaccountData\"\n                      :tplResetFun=\"bankaccountResetFun\"\n                      :tplMethods=\"bankaccountTplMethods\"\n                      @form-confirm-click=\"bankaccountFormConfirm\"\n                      @form-cancel-click=\"bankaccountFormCancel\"\n                      @edit-table-click=\"bankaccountEditTableRow\"\n                      @delete-table-click=\"bankaccountDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 银行账户信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"bankaccountDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"bankaccountDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"bankaccountDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi-relevantParty.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type", "invisible"],
    data: function data() {
      var oThis = this;
      //校验 合同相关方
      var validateItem = function validateItem(rule, value, callback) {
        //相关方类型 非空校验
        var formObj = oThis.$refs.busirelevantPartyRef.getFormData();
        if (formObj.pk_relevant_party === null) {
  
          if (rule.field == 'linkman_name') {
            if (value === '') {
              callback(new Error('联系人不能为空! '));
            } else {
  
              oThis.$http({
                url: _publicData.ylsBusi + 'prj/relevantParty/selectByConditions',
                hearders: { 'Content-Type': 'application/json' },
                method: 'post',
                data: JSON.parse(JSON.stringify(formObj))
              }).then(function (res) {
                if (res.data.success === true) {
                  if (res.data.data === true) {
                    callback();
                  } else {
  
                    oThis.$message({
                      message: "已存在此条信息记录",
                      type: "error"
                    });
                  }
                } else {
                  callback(new Error(res.data.error.errorMessage));
                }
              })["catch"](function () {
                callback(new Error("后台服务有误，请联系管理员！"));
              });
            }
          }
        } else {
  
          callback();
        }
      };
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        relevantPartyDelVisible: false,
        rmoveindex: "",
        delId: "",
        back_object: "",
        //合同相关方
        relevantPartyIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.busirelevantPartyRef.comp;
            var table = uitemplateComp.$refs["ApplyRelevantParty_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.busirelevantPartyRef.setData("ApplyRelevantParty", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["ApplyRelevantParty_ref"].resetFields();
          }
        }],
        funnode: "BT008",
        nexuskey: oThis.type === "prj" ? "relevantParty_busi_apply" : "relevantParty_busi_apply",
        busirelevantPartyData: {
          rules: {
            linkman_name: [{ validator: validateItem, trigger: 'blur' }]
          },
          linkmanSel: {},
          nameSel: {}
        },
        //渲染表格
        relevantPartyResetFun: function relevantPartyResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          var $refType = $node.find("el-select[v-model='ApplyRelevantParty.rp_type']"); //相关方类型
  
  
          if ($refType.length) {
            $refType.attr("v-on:change", "typeRefChange");
          }
          var $refNode = $node.find("el-ref[v-model='ApplyRelevantParty.rp_name']"); //相关方名称
  
          if ($refNode.length) {
            debugger;
            $refNode.attr("v-on:trigger", "handleRefChange");
          }
  
          var $refLinkman = $node.find("el-ref[v-model='ApplyRelevantParty.linkman_name']"); //相关方联系人
  
  
          if ($refLinkman.length) {
            $refLinkman.attr("v-on:trigger", "linkmanRefChange");
          }
  
          // var $table = this.getNodeById($node, "ekpkytxzio9");
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
        },
        t_Methods: {
          typeRefChange: function typeRefChange(type, data) {
  
            var cusotmer_class = '';
            if (type === 'Lessee') {
              cusotmer_class = 'yls_dev100000000ffn';
            } else if (type === 'Guarantee') {
              cusotmer_class = 'yls_dev100000000ffr';
            } else if (type === 'Manufacturer') {
              cusotmer_class = 'yls_dev100000000fft';
            } else if (type === 'Agent') {
              cusotmer_class = 'yls_dev100000000ffv';
            }
            // var param = {"cusotmer_class":cusotmer_class};
            // oThis.$refs.busirelevantPartyRef.setData('nameSel',param);
            // oThis.$nextTick(() => {
  
            oThis.$refs.busirelevantPartyRef.setData('nameSel', { "cusotmer_class": cusotmer_class });
            // });
          },
          handleRefChange: function handleRefChange(type, data) {
            if (type === 'change') {
              var param = { 'pk_customer': data.value[0].id };
              oThis.$refs.busirelevantPartyRef.setData('linkmanSel', param);
            }
          },
          linkmanRefChange: function linkmanRefChange(type, data) {
            //参照变化处理函数 依据参照给 电话地址赋值
            if (type === 'change') {
              this.$refs['ApplyRelevantParty_ref'].model.linkman_phone = data.value[0].mobile;
              this.$refs['ApplyRelevantParty_ref'].model.linkman_add = data.value[0].office_addr_details;
            }
          }
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestPrjrelevantParty();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_prjId != "") {
          this.requestPrjrelevantParty();
        }
      },
  
      //请求业务合同相关方
      requestPrjrelevantParty: function requestPrjrelevantParty() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "prj/relevantParty/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "source_bill"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_prjId
              }]
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
          console.log();
          _this.originalValue = res.data.data.content;
          console.log(_this.originalValue);
          _this.$refs["busirelevantPartyRef"].setData("ApplyRelevantParty_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "相关方信息获取失败",
            type: "error"
          });
        });
      },
  
      //合同相关方取消按钮
      relevantPartyFormCancel: function relevantPartyFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["busirelevantPartyRef"].comp.formShow = false;
        } else {
          this.$refs["busirelevantPartyRef"].getTableComp().closeExpandRow();
          var releBakData = this.$refs.busirelevantPartyRef.getData("ApplyRelevantParty_t");
          releBakData[this.releEditBakIndex] = this.back_object;
          this.$refs.busirelevantPartyRef.setData("ApplyRelevantParty_t", releBakData);
        }
      },
      //合同相关方主表保存
      relevantPartyFormConfirm: function relevantPartyFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.busirelevantPartyRef.comp.ApplyRelevantParty;
        data.source_bill = this.pk_prjId;
  
        if (data.pk_relevant_party) {
          url = _publicData.ylsBusi + 'prj/relevantParty/update';
        } else {
          url = _publicData.ylsBusi + 'prj/relevantParty/create';
        }
        //保存校验
        this.$refs.busirelevantPartyRef.comp.$refs["ApplyRelevantParty_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.busirelevantPartyRef.getData("ApplyRelevantParty_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                _this2.$refs.busirelevantPartyRef.setData("ApplyRelevantParty_t", JSON.parse(JSON.stringify(linarraydata)));
                _this2.$refs["busirelevantPartyRef"].comp.formShow = false;
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
        });
      },
      //合同相关方行编辑
      relevantPartyFormedit: function relevantPartyFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["busirelevantPartyRef"].getTableComp().expandRow(row);
        this.$refs["busirelevantPartyRef"].comp.formShow = false;
        //ApplyRelevantParty为表单数据对象参数
        this.$refs["busirelevantPartyRef"].setData("ApplyRelevantParty", row);
        this.back_object = JSON.parse(JSON.stringify(row));
        this.releEditBakIndex = scope.$index;
      },
      // 合同相关方删除提示
      relevantPartyFormdelete: function relevantPartyFormdelete(scope) {
        this.relevantPartyDelVisible = true;
        this.delId = scope.row.pk_relevant_party;
      },
      // 合同相关方删除方法
      relevantPartyDeleteClick: function relevantPartyDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "prj/relevantParty/deleteById",
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
            _this3.requestPrjrelevantParty();
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
        this.relevantPartyDelVisible = false;
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
  __vue__options__.template = "\r\n<!--合同相关方信息管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"busirelevantPartyRef\"\r\n                        tplId=\"busirelevantParty\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexuskey\"\r\n                        :tplData=\"busirelevantPartyData\"\r\n                        :tplResetFun=\"relevantPartyResetFun\"\r\n                        @form-confirm-click=\"relevantPartyFormConfirm\"\r\n                        @form-cancel-click=\"relevantPartyFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        :methods=\"t_Methods\"\r\n                        @edit-table-click=\"relevantPartyFormedit\"\r\n                        @delete-table-click=\"relevantPartyFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务合同相关方 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"relevantPartyDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"relevantPartyDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"relevantPartyDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/buni/busi_application.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['pk_application'],
    data: function data() {
      var oThis = this;
      return {
        // 固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        // 表单是否可编辑
        applyEditable: false,
        // 模板元素start
        applyFunnode: 'BT008',
        applyNexuskey: 'application',
        applyData: {
          rules: {}
          // 模板元素end
        } };
    },
    mounted: function mounted() {
      if (this.pk_customer !== '' && this.pk_application !== '') {
        this.loadData();
      } else {
        this.$message({
          message: '客户主键与业务申请逐渐传递为空' });
      }
    },
  
    methods: {
      // 加载初始数据
      loadData: function loadData() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/apply/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_application
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(originalValue);
            _this.$refs.applyRef.setFormData(originalValue);
  
            // 备份数据
            _this.copyForData = JSON.parse(JSON.stringify(originalValue));
          } else {
            _this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          console.log(e);
          _this.$message({
            message: '业务申请基本信息获取失败',
            type: 'error'
          });
        });
      },
      applyCancel: function applyCancel() {
        this.applyEditable = false;
        debugger;
        // 加载备份的数据
        this.$refs.applyRef.setFormData(JSON.parse(JSON.stringify(this.copyForData)));
      },
      applyConfirm: function applyConfirm() {
        var _this2 = this;
  
        var datam = this.$refs.applyRef.getFormData();
        this.$http({
          url: _publicData.ylsBusi + 'prj/apply/update',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: datam
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: '业务申请更新成功',
              type: 'success'
            });
            var originalValue = res.data.data;
            _this2.$refs.applyRef.setFormData(originalValue);
            _this2.applyEditable = false;
            // 备份数据
            _this2.copyForData = JSON.parse(JSON.stringify(originalValue));
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: '业务申请更新失败',
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div>\n  <ifbp-template ref=\"applyRef\"\n                tplId=\"applyId\"\n                :funnode=\"applyFunnode\"\n                :nexuskey=\"applyNexuskey\"\n                show-type=\"form\"\n                :tplData=\"applyData\"\n                :editable=\"applyEditable\">\n  </ifbp-template>\n  <div class=\"form-button-div\" v-if=\"applyEditable\">\n    <el-button type=\"default\" class=\"button-no-radius\" @click=\"applyCancel\">取消</el-button>\n    <el-button type=\"primary\" class=\"button-no-radius\" @click=\"applyConfirm\">保存</el-button>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi_corp.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        CustEdit: false,
  
        funnode: "BT003",
        CustBasicnexuskey: "cust_basic_busi_apply",
        CustBasicData: {
          custBasic_busi: {}
        },
        CustPknexuskey: "corp_busi_apply",
        CustData: {},
        cropResetFun: function cropResetFun($node) {
          //地区级联参照
          var $refNode1 = this.getNodeById($node, 'axik3iubxq');
          var $refNode2 = this.getNodeById($node, 'wxatv844dr');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "ccrsRefChang");
          }
          if ($refNode2.length) {
            $refNode2.attr("v-on:trigger", "handleRefChange2");
          }
        },
        t_Methods: {
          ccrsRefChang: function ccrsRefChang(type, data) {
            if (type === 'change') {
              var refParams = { 'refcode': data.value[0].innercode };
              oThis.$refs.CustRef.setData('citySel', refParams);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
            if (type === 'change') {
              var refParams = { 'refcode': data.value[0].innercode };
              oThis.$refs.CustRef.setData('districtSel', refParams);
            }
          }
        },
        CustCancel: function CustCancel() {
          oThis.CustEdit = false;
          // 重置value
        },
  
  
        //客户基本信息保存
        CustConfirm: function CustConfirm() {
          var data = oThis.$refs.CustBasicRef.comp.customer;
          var data1 = oThis.$refs.CustRef.comp.CustCorp;
          var a = [data1];
          data.cust_corp_list = a;
          //表单formRef  表格tableRef
          oThis.$refs.CustBasicRef.comp.$refs["formRef"].validate(function (valid) {
            if (valid) {
              oThis.$http({
                url: _publicData.ylsBusi + "cust/customer/create",
                headers: { "Content-Type": "application/json" },
                method: "post",
                data: JSON.parse(JSON.stringify(data))
              }).then(function (res) {
                if (res.data.success === true) {
                  oThis.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  oThis.originalValue = res.data.data;
                  console.log(oThis.$refs.CustBasicRef);
                  oThis.$refs.CustBasicRef.setData("customer", JSON.parse(JSON.stringify(oThis.originalValue)));
                  oThis.pk_customer = oThis.originalValue.pk_cust_customer;
                  oThis.CustEdit = false;
                } else {
                  oThis.$message({
                    message: "res.data.error.errorMessage",
                    type: "error"
                  });
                }
              })["catch"](function () {
                oThis.$message({
                  message: "更新失败",
                  type: "error"
                });
              });
            }
          });
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.requestCustCorp();
      }
    },
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestCustCorp();
        }
      },
  
      //请求客户联系人
      requestCustCorp: function requestCustCorp() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          console.log(_this.pk_customer);
          var originalValue = res.data.data;
          console.log(originalValue);
          _this.$refs.CustBasicRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
          _this.$refs.CustRef.setData("CustCorp", JSON.parse(JSON.stringify(originalValue.cust_corp_list[0])));
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "客户基本信息详情获取失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<div>\r\n          <ifbp-template ref=\"CustBasicRef\"\r\n                          tplId=\"CustBasic\"\r\n                          :funnode=\"funnode\"\r\n                          :nexuskey=\"CustBasicnexuskey\"\r\n                          show-type=\"form\"\r\n                          :tplData=\"CustBasicData\"\r\n                          :editable=\"CustEdit\">\r\n          </ifbp-template>\r\n          <ifbp-template ref=\"CustRef\"\r\n                          tplId=\"CustBusi\"\r\n                          :funnode=\"funnode\"\r\n                          :nexuskey=\"CustPknexuskey\"\r\n                          show-type=\"form\"\r\n                          :tplData=\"CustData\"\r\n                          :tplResetFun=\"cropResetFun\"\r\n                          :methods=\"t_Methods\"\r\n                          :editable=\"CustEdit\">\r\n          </ifbp-template>\r\n          <div class=\"form-button-div\" v-if=\"CustEdit\">\r\n            <el-button type=\"default\" class=\"button-no-radius\" @click=\"CustCancel\">取消</el-button>\r\n            <el-button type=\"primary\" class=\"button-no-radius\" @click=\"CustConfirm\">保存</el-button>\r\n          </div>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/buni/busi_corp_Share.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer", "invisible"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        back_object: "",
        // 股东信息新增
        ShareholderIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.ShareholderRef.comp;
            var table = uitemplateComp.$refs["Shareholder_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        funnode: "BT003",
        nexuskey: "corp_shareholder_busi_apply",
        ShareholderData: {
          rules: {}
        },
        ShareholderResetFun: function ShareholderResetFun($node) {
          if (oThis.invisible) {
            return;
          }
          var $refname = this.getNodeById($node, 'huepldc1v46'); //股东名称
          if ($refname.length) {
            $refname.attr("v-on:change", "nameRefChange");
          }
  
          var $table = this.getNodeById($node, "wc3ufqnfqkl");
          // $table.attr(":show-header", "false");
          var operateArr = [{
            title: "编辑",
  
            icon: "edit"
          }, {
            title: "删除",
  
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
  
          $table.append(operateHtml);
  
          var $pkCountry = this.getNodeById($node, "u5itmgcx7c");
          var $pkTaxes = this.getNodeById($node, "1idpzwci9up");
          $pkCountry.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_country_ref?" + 'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' + "</div></template>");
  
          $pkTaxes.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_taxes_ref?" + 'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' + "</div></template>");
  
          return $node[0].outerHTML;
        },
        t_Methods: {
          nameRefChange: function nameRefChange(type, data) {
            //参照变化处理函数 依据参照赋值
            if (type === 'change') {
              this.$refs['Shareholder_ref'].model.share_type = data.value[0].customer_type;
              this.$refs['Shareholder_ref'].model.identity_type = data.value[0].identity_type;
              this.$refs['Shareholder_ref'].model.identity_num = data.value[0].identity_no;
            }
          }
        },
        ShareholderTplMethods: {
          // form的保存操作
        }
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {},
  
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.requestShareholder();
      }
    },
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestShareholder();
        }
      },
  
      //请求股东信息
      requestShareholder: function requestShareholder() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "cust/shareholder/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{ key: "pk_customer", oper: "=", value: this.pk_customer }]
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
          _this.originalValue = res.data.data.content;
          _this.$refs["ShareholderRef"].setData("Shareholder_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //股东情况保存
      ShareholderFormConfirm: function ShareholderFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.ShareholderRef.comp.Shareholder;
        data.pk_customer = this.pk_customer;
        //保存校验
        this.$refs.ShareholderRef.comp.$refs["Shareholder_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: _publicData.ylsBusi + "cust/shareholder/create",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.ShareholderRef.getData("Shareholder_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this2.$refs.ShareholderRef.setData("Shareholder_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["ShareholderRef"].comp.formShow = false;
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
        });
      },
      // 股东信息form的取消操作
      ShareholderFormCancel: function ShareholderFormCancel(type) {
        if (type === "form") {
          this.$refs["ShareholderRef"].comp.formShow = false;
        } else {
          this.$refs["ShareholderRef"].getTableComp().closeExpandRow();
        }
        var linarraydata = this.$refs.ShareholderRef.getData("Shareholder_t");
        linarraydata.splice(this.rmoveindex, 1, this.back_object);
        this.$refs.ShareholderRef.setData("Shareholder_t", JSON.parse(JSON.stringify(linarraydata)));
      },
      //股东编辑
      ShareholderEditTableRow: function ShareholderEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["ShareholderRef"].getTableComp().expandRow(row);
        this.$refs["ShareholderRef"].formShow = false;
        //ShareholderRef为表单数据对象参数
        this.$refs["ShareholderRef"].setData("Shareholder", row);
        this.back_object = row;
      },
      //股东信息删除提示
      ShareholderDeleteTableRow: function ShareholderDeleteTableRow(scope) {
        this.ShareholderDelVisible = true;
        this.delId = scope.row.pk_cust_shareholder;
      },
      //股东信息删除
      ShareholderDeleteClick: function ShareholderDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/shareholder/deleteById",
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
            _this3.requestShareholder();
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
        this.ShareholderDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"ShareholderRef\"\n                      tplId=\"ShareholderTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"ShareholderData\"\n                      :tplResetFun=\"ShareholderResetFun\"\n                      :tplMethods=\"ShareholderTplMethods\"\n                      @form-confirm-click=\"ShareholderFormConfirm\"\n                      @form-cancel-click=\"ShareholderFormCancel\"\n                      @edit-table-click=\"ShareholderEditTableRow\"\n                      @delete-table-click=\"ShareholderDeleteTableRow\"\n                      show-type=\"table-form\"\n                      :methods=\"t_Methods\"\n                     >\n        </ifbp-template>\n  <!-- 股东信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"ShareholderDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"ShareholderDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"ShareholderDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi_corp_apply.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _busi_application = require('yls^busi/project/src/buni/busi_application.vue');
  
  var _busi_application2 = _interopRequireDefault(_busi_application);
  
  var _busi_corp = require('yls^busi/project/src/buni/busi_corp.vue');
  
  var _busi_corp2 = _interopRequireDefault(_busi_corp);
  
  var _busi_corp_linkman = require('yls^busi/project/src/buni/busi_corp_linkman.vue');
  
  var _busi_corp_linkman2 = _interopRequireDefault(_busi_corp_linkman);
  
  var _busi_corp_Share = require('yls^busi/project/src/buni/busi_corp_Share.vue');
  
  var _busi_corp_Share2 = _interopRequireDefault(_busi_corp_Share);
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _custpledgeInfo = require('yls^busi/project/src/custpledge/custpledge-info.vue');
  
  var _custpledgeInfo2 = _interopRequireDefault(_custpledgeInfo);
  
  var _mortgageInfo = require('yls^busi/project/src/custpledge/mortgage-info.vue');
  
  var _mortgageInfo2 = _interopRequireDefault(_mortgageInfo);
  
  var _pledgeInfo = require('yls^busi/project/src/custpledge/pledge-info.vue');
  
  var _pledgeInfo2 = _interopRequireDefault(_pledgeInfo);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busiRelevantParty = require('yls^busi/project/src/buni/busi-relevantParty.vue');
  
  var _busiRelevantParty2 = _interopRequireDefault(_busiRelevantParty);
  
  var _busiBankAccount = require('yls^busi/project/src/buni/busi-bank-account.vue');
  
  var _busiBankAccount2 = _interopRequireDefault(_busiBankAccount);
  
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
      'applyRef': _busi_application2["default"],
      'CustCorpRef': _busi_corp2["default"],
      'custlinkmanRef': _busi_corp_linkman2["default"],
      'ShareholderRef': _busi_corp_Share2["default"],
      'busirenttingRef': _busi_rentting2["default"],
      'custpledgeRef': _custpledgeInfo2["default"],
      'mortgageRef': _mortgageInfo2["default"],
      'pledgeRef': _pledgeInfo2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirelevantPartyRef': _busiRelevantParty2["default"],
      'bankaccountRef': _busiBankAccount2["default"]
    },
    props: ['pkCustomer', 'pkApplication', 'customerVal'],
    data: function data() {
      var oThis = this;
      return {
        //页面标题
        title: "",
        scrollDom: document.getElementsByClassName("view")[0],
        pk_customer: this.pkCustomer,
        pk_application: this.pkApplication,
        pledgeType: 'type0',
        applyIcons: [{
          icon: 'edit',
          click: function click() {
            if (oThis.$refs.applyRef.applyEditable === false) {
              oThis.$refs.applyRef.applyEditable = true;
            } else {
              oThis.$refs.applyRef.applyCancel();
            }
          }
        }],
        custIcons: [{
          icon: "edit",
          click: function click() {
            oThis.$refs.CustCorpRef.CustEdit = !oThis.$refs.CustCorpRef.CustEdit;
          }
        }],
        // 银行
        bankaccountIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.resetFormData();
            // 显示新增区域
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.comp.formShow = true;
          }
        }],
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs["OtherContact_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.setData("OtherContact", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["OtherContact_ref"].resetFields();
          }
        }],
        // 股东信息新增
        ShareholderIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp;
            var table = uitemplateComp.$refs["Shareholder_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.setData("Shareholder", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["Shareholder_ref"].resetFields();
          }
        }],
        // 租赁物
        rentTingIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp.formShow = true;
          }
        }],
        // 合同相关方
        relevantPartyIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.formShow = true;
          }
        }],
        //担保信息
        pledgeIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_customer === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            //显示担保添加
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.resetFormData();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.comp.formShow = true;
            //显示抵押添加
            oThis.$refs.mortgageRef.$refs.mortgageRef.getTableComp().closeExpandRow();
            oThis.$refs.mortgageRef.$refs.mortgageRef.resetFormData();
            oThis.$refs.mortgageRef.$refs.mortgageRef.comp.formShow = true;
            //显示质押添加
            oThis.$refs.pledgeRef.$refs.pledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.pledgeRef.$refs.pledgeRef.resetFormData();
            oThis.$refs.pledgeRef.$refs.pledgeRef.comp.formShow = true;
          }
        }],
        // 保险
        insuranceIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.insuranceRef.$refs.insuranceRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.insuranceRef.$refs.insuranceRef.resetFormData();
            // 显示新增区域
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
          }
        }]
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
  
      // 信息初始化
      request: function request() {
        //请求客户基本信息详情
        var method = this.$root.$router.currentRoute.path;
        if (method != "/Agent/detail-add") {
  
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
      closeAddFormEev: function closeAddFormEev() {
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
      goBack: function goBack() {
        this.$emit('change-corp-card', 'toapplycustomerlist');
      },
  
      //提交到已申请
      clickSave: function clickSave() {
        var _this = this;
  
        var pk_application = this.pkApplication;
        var url = _publicData.ylsBusi + 'prj/apply/updateapply';
        var data = {
          "pk_application": pk_application
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
  
            _this.$message({
              message: "操作成功！",
              type: "success"
            });
            _this.$emit('change-corp-card', 'toapplied');
            _this.inoutTypeFormEdit = false;
          } else {
            _this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this.$message({
            message: "操作失败",
            type: "error"
          });
        });
      },
  
      // 请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        // 
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n   <div class=\"operator-container\">\n      <div class=\"fl\">\n        <h3 class=\"name\">放款进展表 > 发起申请</h3>\n      </div>\n      <div class=\"fr\">\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"goBack\"> 回 退 </el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\"> 提 交</el-button>\n      </div>\n    </div>\n  <!-- <div class=\"title-container\">\n    <h2 class=\"name\">业务申请</h2>\n  </div> -->\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"205\"> \n      <ifbp-panel id='applyInfo' title='业务申请基本信息' :icons='applyIcons'>\n        <applyRef\n          ref='applyRef'\n          :pk_application='pk_application'>\n        </applyRef>\n      </ifbp-panel>\n      <ifbp-panel id=\"custInfo\" title=\"客户信息\" :icons=\"custIcons\">\n              <CustCorpRef\n                ref=\"CustCorpRef\"\n                :pk_customer=\"pk_customer\">\n              </CustCorpRef>\n      </ifbp-panel>\n      <!--银行模块界面-->\n      <ifbp-panel id=\"bankaccount\" title=\"银行账户信息\" :icons=\"bankaccountIcons\">\n        <bankaccountRef\n          ref=\"bankaccountRef\"\n          :pk_customer=\"pk_customer\">\n        </bankaccountRef>\n      </ifbp-panel> \n      <!--联系人模块界面-->\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\" title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      <!--租赁物信息模块界面-->\n      <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\" :icons=\"rentTingIcons\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :pk_prjId=\"pk_application\"\n          :type=\"'apply'\">\n        </busirenttingRef>\n      </ifbp-panel>\n       <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\" :icons=\"pledgeIcons\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_application\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_application\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_application\"\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n      <!--保险信息模块界面-->\n      <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_application'\n          :type=\"'apply'\">\n        </insuranceRef>\n      </ifbp-panel>\n       <!--合同相关方信息模块界面-->\n      <ifbp-panel id=\"busirelevantPartyRef\" title=\"合同相关方\" :icons=\"relevantPartyIcons\">\n        <busirelevantPartyRef\n          ref=\"busirelevantPartyRef\"\n          :pk_prjId=\"pk_application\"\n          :type=\"'apply'\">\n        </busirelevantPartyRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi_corp_apply_clickDisabled.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _busi_corp = require('yls^busi/project/src/buni/busi_corp.vue');
  
  var _busi_corp2 = _interopRequireDefault(_busi_corp);
  
  var _busi_corp_linkman = require('yls^busi/project/src/buni/busi_corp_linkman.vue');
  
  var _busi_corp_linkman2 = _interopRequireDefault(_busi_corp_linkman);
  
  var _busi_corp_Share = require('yls^busi/project/src/buni/busi_corp_Share.vue');
  
  var _busi_corp_Share2 = _interopRequireDefault(_busi_corp_Share);
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _custpledgeInfo = require('yls^busi/project/src/custpledge/custpledge-info.vue');
  
  var _custpledgeInfo2 = _interopRequireDefault(_custpledgeInfo);
  
  var _mortgageInfo = require('yls^busi/project/src/custpledge/mortgage-info.vue');
  
  var _mortgageInfo2 = _interopRequireDefault(_mortgageInfo);
  
  var _pledgeInfo = require('yls^busi/project/src/custpledge/pledge-info.vue');
  
  var _pledgeInfo2 = _interopRequireDefault(_pledgeInfo);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busiRelevantParty = require('yls^busi/project/src/buni/busi-relevantParty.vue');
  
  var _busiRelevantParty2 = _interopRequireDefault(_busiRelevantParty);
  
  var _busiBankAccount = require('yls^busi/project/src/buni/busi-bank-account.vue');
  
  var _busiBankAccount2 = _interopRequireDefault(_busiBankAccount);
  
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
      'CustCorpRef': _busi_corp2["default"],
      'custlinkmanRef': _busi_corp_linkman2["default"],
      'ShareholderRef': _busi_corp_Share2["default"],
      'busirenttingRef': _busi_rentting2["default"],
      'custpledgeRef': _custpledgeInfo2["default"],
      'mortgageRef': _mortgageInfo2["default"],
      'pledgeRef': _pledgeInfo2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirelevantPartyRef': _busiRelevantParty2["default"],
      'bankaccountRef': _busiBankAccount2["default"]
    },
    props: ['pkCustomer', 'pkApplication', 'customerVal'],
    data: function data() {
      var oThis = this;
      return {
        //页面标题
        title: "",
        scrollDom: document.getElementsByClassName("view")[0],
        pk_customer: this.pkCustomer,
        pk_application: this.pkApplication,
        pledgeType: 'type0'
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
  
      // 信息初始化
      request: function request() {
        //请求客户基本信息详情
        var method = this.$root.$router.currentRoute.path;
        if (method != "/Agent/detail-add") {
  
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
      closeAddFormEev: function closeAddFormEev() {
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
      goBack: function goBack() {
        this.$emit('change-corp-card', 'toapplycustomerlist');
      },
  
      //提交到已申请
      clickSave: function clickSave() {
        var _this = this;
  
        var pk_application = this.pkApplication;
        var url = '/yls-busi-web/prj/apply/updateapply';
        var data = {
          "pk_application": pk_application
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
  
            _this.$message({
              message: "操作成功！",
              type: "success"
            });
            _this.$emit('change-corp-card', 'toapplied');
            _this.inoutTypeFormEdit = false;
          } else {
            _this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this.$message({
            message: "操作失败",
            type: "error"
          });
        });
      },
  
      // 请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        // 
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n   <div class=\"operator-container\">\n      <div class=\"fl\">\n        <h3 class=\"name\">放款进展表 > 发起申请</h3>\n      </div>\n      <div class=\"fr\">\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"goBack\"> 回 退 </el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\"> 提 交</el-button>\n      </div>\n    </div>\n  <!-- <div class=\"title-container\">\n    <h2 class=\"name\">业务申请</h2>\n  </div> -->\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"205\"> \n      <ifbp-panel id=\"custInfo\" title=\"客户信息\">\n              <CustCorpRef\n                ref=\"CustCorpRef\"\n                :pk_customer=\"pk_customer\" >\n              </CustCorpRef>\n      </ifbp-panel>\n      <!--银行模块界面-->\n      <ifbp-panel id=\"bankaccount\" title=\"银行账户信息\">\n        <bankaccountRef\n          ref=\"bankaccountRef\"\n          :invisible='true'\n          :pk_customer=\"pk_customer\">\n        </bankaccountRef>\n      </ifbp-panel> \n      <!--联系人模块界面-->\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :invisible='true'\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\" title=\"股东信息\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :invisible='true'\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      <!--租赁物信息模块界面-->\n      <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :invisible='true'\n          :pk_prjId=\"pk_application\"\n          :type=\"'apply'\">\n        </busirenttingRef>\n      </ifbp-panel>\n       <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_application\"\n            :invisible='true'\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_application\"\n            :invisible='true'\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_application\"\n            :invisible='true'\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n      <!--保险信息模块界面-->\n      <ifbp-panel id='insuranceRef' title='保险信息'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_application'\n          :invisible='true'\n          :type=\"'apply'\">\n        </insuranceRef>\n      </ifbp-panel>\n       <!--合同相关方信息模块界面-->\n      <ifbp-panel id=\"busirelevantPartyRef\" title=\"合同相关方\">\n        <busirelevantPartyRef\n          ref=\"busirelevantPartyRef\"\n          :pk_prjId=\"pk_application\"\n          :invisible='true'\n          :type=\"'apply'\">\n        </busirelevantPartyRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi_corp_linkman.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_customer", "invisible"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {
        //证件号码唯一校验
        if (rule.field === "identity_no") {
          if (value === "") {
            callback(new Error("证件号不能为空"));
          } else {
            var datam = {
              identity_no: value,
              pk_customer: oThis.pk_customer
            };
            oThis.$http({
              url: _publicData.ylsBusi + "cust/customer/checkOnlyOne",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(datam))
            }).then(function (res) {
              if (res.data.success === true) {
                callback();
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
        scrollDom: document.getElementsByClassName("view")[0],
        linkmanDelVisible: false,
        rmoveindex: "",
        delId: "",
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs["OtherContact_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.custlinkmanRef.setData("OtherContact", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["OtherContact_ref"].resetFields();
          }
        }],
        funnode: "BT003",
        nexuskey: "linkman_busi_apply",
        custlinkmanData: {
          rules: {
            customer_name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        //渲染表格
        linkmanResetFun: function linkmanResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          var $table = this.getNodeById($node, "8xacfbstef6");
          //  $table.attr(':show-header','false');
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.requestCustlinkman();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestCustlinkman();
        }
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "cust/otherContact/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{ key: "pk_customer", oper: "=", value: this.pk_customer }]
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
          _this.originalValue = res.data.data.content;
          _this.$refs["custlinkmanRef"].setData("OtherContact_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //联系人取消按钮
      linkmanFormCancel: function linkmanFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["custlinkmanRef"].comp.formShow = false;
        } else {
          this.$refs["custlinkmanRef"].getTableComp().closeExpandRow();
  
          var OtherContactTable = this.$refs.custlinkmanRef.getData('OtherContact_t');
          OtherContactTable[this.baseEditIndex] = this.baseData;
          this.$refs.custlinkmanRef.setData('OtherContact_t', OtherContactTable);
        }
      },
      //联系人主表保存
      linkmanFormConfirm: function linkmanFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.custlinkmanRef.comp.OtherContact;
        data.pk_customer = this.pk_customer;
        //保存校验
        this.$refs.custlinkmanRef.comp.$refs["OtherContact_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: _publicData.ylsBusi + "cust/otherContact/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.custlinkmanRef.getData("OtherContact_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this2.$refs.custlinkmanRef.setData("OtherContact_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["custlinkmanRef"].comp.formShow = false;
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
        });
      },
      //联系人行编辑
      linkmanFormedit: function linkmanFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["custlinkmanRef"].getTableComp().expandRow(row);
        this.$refs["custlinkmanRef"].formShow = false;
        //OtherContact为表单数据对象参数
        this.$refs["custlinkmanRef"].setData("OtherContact", row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //联系人删除提示
      linkmanFormdelete: function linkmanFormdelete(scope) {
        this.linkmanDelVisible = true;
        this.delId = scope.row.pk_cust_other_contact;
      },
      //联系人删除方法
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/otherContact/deleteById",
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
            //this.delDialogVisible = false;
            _this3.requestCustlinkman();
            // this.request(this.currentPage - 1, this.size);
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
        this.linkmanDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--联系人信息管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"custlinkmanRef\"\r\n                        tplId=\"linkmanTemplate\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexuskey\"\r\n                        :tplData=\"custlinkmanData\"\r\n                        :tplResetFun=\"linkmanResetFun\"\r\n                        @form-confirm-click=\"linkmanFormConfirm\"\r\n                        @form-cancel-click=\"linkmanFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"linkmanFormedit\"\r\n                        @delete-table-click=\"linkmanFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 客户联系人 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"linkmanDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"linkmanDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/buni/busi_insure.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ['source_bill', 'type', 'invisible'],
    data: function data() {
      var oThis = this;
      //校验
      var validateInsurance = function validateInsurance(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName('view')[0],
        insuranceDelVisible: false,
        rmoveindex: '',
        delId: '',
        back_object: '',
        //保险
        insuranceIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.source_bill === '') {
              oThis.$message({
                message: '未获取到项目',
                type: 'error'
              });
              return;
            }
            var uitemplateComp = oThis.$refs.insuranceRef.comp;
            var table = uitemplateComp.$refs['projectInsure-table'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.insuranceRef.setData('ProjectInsure', {
              // mobile:'13'
            });
            oThis.rmoveindex = '';
            uitemplateComp.$refs['projectInsure-form'].resetFields();
          }
        }],
        funnode: 'BT008',
        nexuskey: oThis.type === 'prj' ? 'ProjectInsureUI' : oThis.type === 'prjApproval' ? 'PrjApprovalInsureUI' : 'insurance_apply',
        insuranceData: {
          // rules: {
          //   thing_name: [
          //     { required: true, message: '请输入保险名称', trigger: 'blur' }
          //   ]
          // }
        },
        //渲染表格
        insuranceResetFun: function insuranceResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          var id_co = '';
          if (oThis.type === 'prj') id_co = 'hw9gl1c375v';else if (oThis.type === 'contr') id_co = '';else if (oThis.type === 'prjApproval') id_co = 'e0zihi349o';else id_co = "k9goab2oawo";
          var $table = this.getNodeById($node, id_co);
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
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentSource_bill: function currentSource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestInsurance();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != '' && this.source_bill != undefined) {
          this.requestInsurance();
        }
      },
  
      //请求业务保险
      requestInsurance: function requestInsurance() {
        var _this = this;
  
        var data = {
          'orderList': [{
            'direction': 'desc',
            'property': 'ts'
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{ key: 'source_bill', oper: '=', value: this.source_bill }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/ins/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this.$refs['insuranceRef'].setData('ProjectInsure_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //保险取消按钮
      insuranceFormCancel: function insuranceFormCancel(type) {
        this.rmoveindex = '';
        //关闭表单或者是下拉显示行
        if (type === 'form') {
          this.$refs['insuranceRef'].comp.formShow = false;
        } else {
          this.$refs['insuranceRef'].getTableComp().closeExpandRow();
          var OtherContactTable = this.$refs.insuranceRef.getData('ProjectInsure_t');
          OtherContactTable[this.baseEditIndex] = this.baseData;
          this.$refs.insuranceRef.setData('ProjectInsure_t', OtherContactTable);
        }
      },
      //保险主表保存
      insuranceFormConfirm: function insuranceFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = '';
        var data = this.$refs.insuranceRef.comp.ProjectInsure;
        data.source_bill = this.source_bill;
        if (data.pk_prj_insure) {
          url = _publicData.ylsBusi + 'prj/ins/update';
        } else {
          url = _publicData.ylsBusi + 'prj/ins/create';
        }
        //保存校验
        this.$refs.insuranceRef.comp.$refs['projectInsure-form'].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                _this2.requestInsurance();
                _this2.$refs['insuranceRef'].comp.formShow = false;
              } else {
                _this2.$message({
                  message: res.data.message,
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
        });
      },
      //保险行编辑
      insuranceFormedit: function insuranceFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['insuranceRef'].getTableComp().expandRow(row);
        this.$refs['insuranceRef'].comp.formShow = false;
        //ProjectInsure为表单数据对象参数
        this.$refs['insuranceRef'].setData('ProjectInsure', row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      // 保险删除提示
      insuranceFormdelete: function insuranceFormdelete(scope) {
        this.insuranceDelVisible = true;
        this.delId = scope.row.pk_prj_insure;
      },
      // 保险删除方法
      insuranceDeleteClick: function insuranceDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/ins/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestInsurance();
          } else {
            _this3.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: '信息删除失败！',
            type: 'error'
          });
        });
        this.insuranceDelVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\r\n<!--保险信息管理模块-->\r\n  <div>\r\n    <ifbp-template ref='insuranceRef'\r\n                  tplId='insuranceId'\r\n                  :funnode=\"funnode\"\r\n                  :nexuskey=\"nexuskey\"\r\n                  :tplData='insuranceData'\r\n                  :tplResetFun='insuranceResetFun'\r\n                  @form-confirm-click='insuranceFormConfirm'\r\n                  @form-cancel-click='insuranceFormCancel'\r\n                  show-type='table-form'\r\n                  @edit-table-click='insuranceFormedit'\r\n                  @delete-table-click='insuranceFormdelete'\r\n                  >\r\n    </ifbp-template>\r\n\r\n    <!-- 业务保险 删除提示框 -->\r\n    <el-dialog\r\n      title='提示'\r\n      v-model='insuranceDelVisible'\r\n      :modal='true'\r\n      size='tiny'>\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot='footer' class='dialog-footer'>\r\n        <el-button @click=\"insuranceDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type='primary' @click='insuranceDeleteClick'>确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/buni/busi_person.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        CustEdit: false,
  
        funnode: "BT003",
        CustBasicnexuskey: "cust_basic_busi_apply",
        CustBasicData: {
          custBasic_busi: {}
        },
        CustPknexuskey: "natural_busi_apply",
        CustData: {},
  
        CustCancel: function CustCancel() {
          oThis.CustEdit = false;
          // 重置value
        },
  
  
        //客户基本信息保存
        CustConfirm: function CustConfirm() {
          var data = oThis.$refs.CustBasicRef.comp.customer;
          var data1 = oThis.$refs.CustRef.comp.CustCorp;
          var a = [data1];
          data.cust_corp_list = a;
          //表单formRef  表格tableRef
          oThis.$refs.CustBasicRef.comp.$refs["formRef"].validate(function (valid) {
            if (valid) {
              oThis.$http({
                url: _publicData.ylsBusi + "cust/customer/create",
                headers: { "Content-Type": "application/json" },
                method: "post",
                data: JSON.parse(JSON.stringify(data))
              }).then(function (res) {
                if (res.data.success === true) {
                  oThis.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  oThis.originalValue = res.data.data;
                  oThis.$refs.CustBasicRef.setData("customer", JSON.parse(JSON.stringify(oThis.originalValue)));
                  oThis.pk_customer = oThis.originalValue.pk_person_customer;
                  oThis.CustEdit = false;
                } else {
                  oThis.$message({
                    message: "res.data.error.errorMessage",
                    type: "error"
                  });
                }
              })["catch"](function () {
                oThis.$message({
                  message: "更新失败",
                  type: "error"
                });
              });
            }
          });
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.requestCustCorp();
      }
    },
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestCustCorp();
        }
      },
  
      //请求客户联系人
      requestCustCorp: function requestCustCorp() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          var originalValue = res.data.data;
          console.log(originalValue);
          _this.$refs.CustBasicRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
          _this.$refs.CustRef.setData("CustPerson", JSON.parse(JSON.stringify(originalValue.cust_persion_list[0])));
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "客户基本信息详情获取失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<div>\r\n          <ifbp-template ref=\"CustBasicRef\"\r\n                          tplId=\"CustBasic\"\r\n                          :funnode=\"funnode\"\r\n                          :nexuskey=\"CustBasicnexuskey\"\r\n                          show-type=\"form\"\r\n                          :tplData=\"CustBasicData\"\r\n                          :editable=\"CustEdit\">\r\n          </ifbp-template>\r\n          <ifbp-template ref=\"CustRef\"\r\n                          tplId=\"CustBusi\"\r\n                          :funnode=\"funnode\"\r\n                          :nexuskey=\"CustPknexuskey\"\r\n                          show-type=\"form\"\r\n                          :tplData=\"CustData\"\r\n                          :editable=\"CustEdit\">\r\n          </ifbp-template>\r\n          <div class=\"form-button-div\" v-if=\"CustEdit\">\r\n            <el-button type=\"default\" class=\"button-no-radius\" @click=\"CustCancel\">取消</el-button>\r\n            <el-button type=\"primary\" class=\"button-no-radius\" @click=\"CustConfirm\">保存</el-button>\r\n          </div>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/buni/busi_person_apply.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _busi_application = require('yls^busi/project/src/buni/busi_application.vue');
  
  var _busi_application2 = _interopRequireDefault(_busi_application);
  
  var _busi_person = require('yls^busi/project/src/buni/busi_person.vue');
  
  var _busi_person2 = _interopRequireDefault(_busi_person);
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _custpledgeInfo = require('yls^busi/project/src/custpledge/custpledge-info.vue');
  
  var _custpledgeInfo2 = _interopRequireDefault(_custpledgeInfo);
  
  var _mortgageInfo = require('yls^busi/project/src/custpledge/mortgage-info.vue');
  
  var _mortgageInfo2 = _interopRequireDefault(_mortgageInfo);
  
  var _pledgeInfo = require('yls^busi/project/src/custpledge/pledge-info.vue');
  
  var _pledgeInfo2 = _interopRequireDefault(_pledgeInfo);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busiRelevantParty = require('yls^busi/project/src/buni/busi-relevantParty.vue');
  
  var _busiRelevantParty2 = _interopRequireDefault(_busiRelevantParty);
  
  var _busi_corp_linkman = require('yls^busi/project/src/buni/busi_corp_linkman.vue');
  
  var _busi_corp_linkman2 = _interopRequireDefault(_busi_corp_linkman);
  
  var _busiBankAccount = require('yls^busi/project/src/buni/busi-bank-account.vue');
  
  var _busiBankAccount2 = _interopRequireDefault(_busiBankAccount);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      'applyRef': _busi_application2["default"],
      'CustCorpRef': _busi_person2["default"],
      'bankaccountRef': _busiBankAccount2["default"],
      'custlinkmanRef': _busi_corp_linkman2["default"],
      'busirenttingRef': _busi_rentting2["default"],
      'custpledgeRef': _custpledgeInfo2["default"],
      'mortgageRef': _mortgageInfo2["default"],
      'pledgeRef': _pledgeInfo2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirelevantPartyRef': _busiRelevantParty2["default"]
    },
    props: ['pkCustomer', 'pkApplication'],
    data: function data() {
      var oThis = this;
      return {
        //页面标题
        title: "",
        scrollDom: document.getElementsByClassName("view")[0],
        pk_customer: this.pkCustomer,
        pk_application: this.pkApplication,
        pledgeType: 'type0',
        applyIcons: [{
          icon: 'edit',
          click: function click() {
            if (oThis.$refs.applyRef.applyEditable === false) {
              oThis.$refs.applyRef.applyEditable = true;
            } else {
              oThis.$refs.applyRef.applyCancel();
            }
          }
        }],
        custIcons: [{
          icon: "edit",
          click: function click() {
            oThis.$refs.CustCorpRef.CustEdit = !oThis.$refs.CustCorpRef.CustEdit;
          }
        }],
        // 银行
        bankaccountIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.resetFormData();
            // 显示新增区域
            oThis.$refs.bankaccountRef.$refs.bankaccountRef.comp.formShow = true;
          }
        }],
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs["OtherContact_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.setData("OtherContact", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["OtherContact_ref"].resetFields();
          }
        }],
        // 租赁物
        rentTingIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp.formShow = true;
          }
        }],
        // 合同相关方
        relevantPartyIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.formShow = true;
          }
        }],
        //担保信息
        pledgeIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_customer === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            //显示担保添加
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.resetFormData();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.comp.formShow = true;
            //显示抵押添加
            oThis.$refs.mortgageRef.$refs.mortgageRef.getTableComp().closeExpandRow();
            oThis.$refs.mortgageRef.$refs.mortgageRef.resetFormData();
            oThis.$refs.mortgageRef.$refs.mortgageRef.comp.formShow = true;
            //显示质押添加
            oThis.$refs.pledgeRef.$refs.pledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.pledgeRef.$refs.pledgeRef.resetFormData();
            oThis.$refs.pledgeRef.$refs.pledgeRef.comp.formShow = true;
          }
        }],
        // 保险
        insuranceIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.insuranceRef.$refs.insuranceRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.insuranceRef.$refs.insuranceRef.resetFormData();
            // 显示新增区域
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
          }
        }]
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
  
      // 信息初始化
      request: function request() {
        //请求客户基本信息详情
        var method = this.$root.$router.currentRoute.path;
        console.log(this.pk_customer);
        if (method != "/Agent/detail-add") {
  
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
      closeAddFormEev: function closeAddFormEev() {
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
  
      //回退到客户基本信息页面
      goBack: function goBack() {
        this.$emit('change-person-card', 'toapplycustomerlist');
      },
  
      //提交到已申请
      clickSave: function clickSave() {
        var _this = this;
  
        var pk_application = this.pkApplication;
        var url = _publicData.ylsBusi + 'prj/apply/updateapply';
        var data = {
          "pk_application": pk_application
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
  
            _this.$message({
              message: "操作成功！",
              type: "success"
            });
            _this.$emit('change-person-card', 'toapplied');
            _this.inoutTypeFormEdit = false;
          } else {
            _this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this.$message({
            message: "操作失败",
            type: "error"
          });
        });
      },
  
      // 请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        // 
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n   <div class=\"operator-container\">\n      <div class=\"fl\">\n        <h3 class=\"name\">放款进展表 > 发起申请</h3>\n      </div>\n      <div class=\"fr\">\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"goBack\"> 回 退 </el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\"> 提 交</el-button>\n      </div>\n    </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"206\"> \n      <ifbp-panel id='applyInfo' title='业务申请基本信息' :icons='applyIcons'>\n        <applyRef\n          ref='applyRef'\n          :pk_application='pk_application'>\n        </applyRef>\n      </ifbp-panel>\n      <ifbp-panel id=\"custInfo\" title=\"客户信息\" :icons=\"custIcons\">\n              <CustCorpRef\n                ref=\"CustCorpRef\"\n                :pk_customer=\"pk_customer\">\n              </CustCorpRef>\n      </ifbp-panel>\n      <!--银行模块界面-->\n      <ifbp-panel id=\"bankaccount\" title=\"银行账户信息\" :icons=\"bankaccountIcons\">\n        <bankaccountRef\n          ref=\"bankaccountRef\"\n          :pk_customer=\"pk_customer\">\n        </bankaccountRef>\n      </ifbp-panel> \n      <!--联系人模块界面-->\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!-- <ifbp-panel id=\"termsTrade\" title=\"成交条件\" :icons=\"ShareholderIcons\">\n        <termsTrade\n          ref=\"termsTrade\"\n          :pk_customer=\"pkCustVal\">\n        </termsTrade>\n      </ifbp-panel> -->\n      <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\" :icons=\"rentTingIcons\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :pk_prjId=\"pk_application\"\n          :type=\"'apply'\">\n        </busirenttingRef>\n      </ifbp-panel>\n     <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\" :icons=\"pledgeIcons\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_application\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_application\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_application\"\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n      <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_application'\n          :type=\"'apply'\">\n        </insuranceRef>\n      </ifbp-panel>\n      <ifbp-panel id=\"busirelevantPartyRef\" title=\"合同相关方\" :icons=\"relevantPartyIcons\">\n        <busirelevantPartyRef\n          ref=\"busirelevantPartyRef\"\n          :pk_prjId=\"pk_application\"\n          :type=\"'apply'\">\n        </busirelevantPartyRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi_person_apply_clickDisabled.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _busi_person = require('yls^busi/project/src/buni/busi_person.vue');
  
  var _busi_person2 = _interopRequireDefault(_busi_person);
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _custpledgeInfo = require('yls^busi/project/src/custpledge/custpledge-info.vue');
  
  var _custpledgeInfo2 = _interopRequireDefault(_custpledgeInfo);
  
  var _mortgageInfo = require('yls^busi/project/src/custpledge/mortgage-info.vue');
  
  var _mortgageInfo2 = _interopRequireDefault(_mortgageInfo);
  
  var _pledgeInfo = require('yls^busi/project/src/custpledge/pledge-info.vue');
  
  var _pledgeInfo2 = _interopRequireDefault(_pledgeInfo);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busiRelevantParty = require('yls^busi/project/src/buni/busi-relevantParty.vue');
  
  var _busiRelevantParty2 = _interopRequireDefault(_busiRelevantParty);
  
  var _busi_corp_linkman = require('yls^busi/project/src/buni/busi_corp_linkman.vue');
  
  var _busi_corp_linkman2 = _interopRequireDefault(_busi_corp_linkman);
  
  var _busiBankAccount = require('yls^busi/project/src/buni/busi-bank-account.vue');
  
  var _busiBankAccount2 = _interopRequireDefault(_busiBankAccount);
  
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
      'CustCorpRef': _busi_person2["default"],
      'bankaccountRef': _busiBankAccount2["default"],
      'custlinkmanRef': _busi_corp_linkman2["default"],
      'busirenttingRef': _busi_rentting2["default"],
      'custpledgeRef': _custpledgeInfo2["default"],
      'mortgageRef': _mortgageInfo2["default"],
      'pledgeRef': _pledgeInfo2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirelevantPartyRef': _busiRelevantParty2["default"]
    },
    props: ['pkCustomer', 'pkApplication'],
    data: function data() {
      var oThis = this;
      return {
        //页面标题
        title: "",
        scrollDom: document.getElementsByClassName("view")[0],
        pk_customer: this.pkCustomer,
        pk_application: this.pkApplication,
        pledgeType: 'type0'
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
  
      // 信息初始化
      request: function request() {
        //请求客户基本信息详情
        var method = this.$root.$router.currentRoute.path;
        console.log(this.pk_customer);
        if (method != "/Agent/detail-add") {
  
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
      closeAddFormEev: function closeAddFormEev() {
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
  
      //回退到客户基本信息页面
      goBack: function goBack() {
        this.$emit('change-person-card', 'toapplycustomerlist');
      },
  
      //提交到已申请
      clickSave: function clickSave() {
        var _this = this;
  
        var pk_application = this.pkApplication;
        var url = _publicData.ylsBusi + 'prj/apply/updateapply';
        var data = {
          "pk_application": pk_application
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
  
            _this.$message({
              message: "操作成功！",
              type: "success"
            });
            _this.$emit('change-person-card', 'toapplied');
            _this.inoutTypeFormEdit = false;
          } else {
            _this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this.$message({
            message: "操作失败",
            type: "error"
          });
        });
      },
  
      // 请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        // 
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n   <div class=\"operator-container\">\n      <div class=\"fl\">\n        <h3 class=\"name\">放款进展表 > 发起申请</h3>\n      </div>\n      <div class=\"fr\">\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"goBack\"> 回 退 </el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\"> 提 交</el-button>\n      </div>\n    </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"206\"> \n      <ifbp-panel id=\"custInfo\" title=\"客户信息\">\n              <CustCorpRef\n                ref=\"CustCorpRef\"\n                :pk_customer=\"pk_customer\" >\n              </CustCorpRef>\n      </ifbp-panel>\n      <!--银行模块界面-->\n      <ifbp-panel id=\"bankaccount\" title=\"银行账户信息\">\n        <bankaccountRef\n          ref=\"bankaccountRef\"\n          :invisible='true'\n          :pk_customer=\"pk_customer\">\n        </bankaccountRef>\n      </ifbp-panel> \n      <!--联系人模块界面-->\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :invisible='true'\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!-- <ifbp-panel id=\"termsTrade\" title=\"成交条件\">\n        <termsTrade\n          ref=\"termsTrade\"\n          :pk_customer=\"pkCustVal\">\n        </termsTrade>\n      </ifbp-panel> -->\n      <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :pk_prjId=\"pk_application\"\n          :invisible='true'\n          :type=\"'apply'\">\n        </busirenttingRef>\n      </ifbp-panel>\n     <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_application\"\n            :invisible='true'\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_application\"\n            :invisible='true'\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_application\"\n            :invisible='true'\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n      <ifbp-panel id='insuranceRef' title='保险信息'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_application'\n          :invisible='true'\n          :type=\"'apply'\">\n        </insuranceRef>\n      </ifbp-panel>\n      <ifbp-panel id=\"busirelevantPartyRef\" title=\"合同相关方\">\n        <busirelevantPartyRef\n          ref=\"busirelevantPartyRef\"\n          :pk_prjId=\"pk_application\"\n          :invisible='true'\n          :type=\"'apply'\">\n        </busirelevantPartyRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/buni/busi_rentting.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type", "invisible", "Leasehold"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        Leasehold: '',
  
        scrollDom: document.getElementsByClassName('view')[0],
        renttingDelVisible: false,
        rmoveindex: '',
        delId: '',
        //租赁物
        renttingIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_prjId === '') {
              oThis.$message({
                message: '未获取到项目',
                type: 'error'
              });
              return;
            }
            var uitemplateComp = oThis.$refs.busirenttingRef.comp;
            var table = uitemplateComp.$refs['proRentThing_t_ref'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.busirenttingRef.setData('proRentThing', {
              // mobile:'13'
            });
            oThis.rmoveindex = '';
            uitemplateComp.$refs['proRentThing_ref'].resetFields();
          }
        }],
        funnode: 'BT008',
        //type=prj 然后372a2fcb-1db3-4ca1-98a1-c235e40329e7 否者a7715073-8a24-420a-86de-9110786e8e4b
        nexuskey: oThis.type === 'prj' ? 'rentthingprjUI' : oThis.type === 'prjApproval' ? 'rentThing-prjApproval' : 'rentthing_busi_apply',
  
        busirenttingData: {
          IsShowCust: '',
          rules: {
            thing_name: [{ required: true, message: '请输入租赁物名称', trigger: 'blur' }]
          }
        },
        //渲染表格
        renttingResetFun: function renttingResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          //获取供应商的节点
          var $cust = $node.find("el-ref[v-model='proRentThing.pk_consumer']");
          //如果主表选择直租，该组件可见，否则不可见
          debugger;
  
          //$cust.parent().css("v-bind:display",'IsShowCust');
          // $cust.parent().attr("v-bind:style='{display:IsShowCust}'")
          $cust.parent().attr("v-bind:style", "{display:IsShowCust}");
  
          //绑定事件
          //数量
          var $thing_number = $node.find("el-number[v-model='proRentThing.thing_number']");
          if ($thing_number.length) {
            // 添加绑定事件, 数量绑定thing_numberChange
            $thing_number.attr("v-on:change", "thing_numberChange");
          };
          //设备单价
          var $unit_cost = $node.find("el-money[v-model='proRentThing.unit_cost']");
          if ($unit_cost.length) {
            // 添加绑定事件, 设备单价绑定unit_costChange
            $unit_cost.attr("v-on:change", "unit_costChange");
          };
  
          // let $table = this.getNodeById($node, id_co);
          var $table = $node.find('el-table');
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
        changeMethods: {
          thing_numberChange: function thing_numberChange(data) {
            if (data && data !== '') {
              if (oThis.$refs.busirenttingRef.comp.proRentThing.unit_cost !== '') {
                var unit_cost = oThis.$refs.busirenttingRef.comp.proRentThing.unit_cost;
                var thing_number = data;
                oThis.$refs.busirenttingRef.comp.proRentThing.total_cost = thing_number * unit_cost;
              }
            }
          },
          unit_costChange: function unit_costChange(data) {
            if (data && data !== '') {
              if (oThis.$refs.busirenttingRef.comp.proRentThing.thing_number !== '') {
                var unit_cost = data;
                var thing_number = oThis.$refs.busirenttingRef.comp.proRentThing.thing_number;
                oThis.$refs.busirenttingRef.comp.proRentThing.total_cost = thing_number * unit_cost;
              }
            }
          }
  
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      },
      currentLeasehold: function currentLeasehold() {
        return this.Leasehold;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestPrjrentting();
      },
      Leasehold: function Leasehold(val) {
  
        if (this.Leasehold === 'LEASEDIRECT') {
  
          this.$refs["busirenttingRef"].setData("IsShowCust", 'inline-block');
        } else {
          debugger;
          this.$refs["busirenttingRef"].setData("IsShowCust", 'none');
        }
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_prjId != '' && this.pk_prjId != undefined) {
          this.requestPrjrentting();
        }
      },
  
      //请求业务租赁物
      requestPrjrentting: function requestPrjrentting() {
        var _this = this;
  
        var data = {
          'orderList': [{
            'direction': 'desc',
            'property': 'ts'
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{ key: 'source_bill', oper: '=', value: this.pk_prjId }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/rentth/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this.$refs['busirenttingRef'].setData('proRentThing_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //租赁物取消按钮
      renttingFormCancel: function renttingFormCancel(type) {
        this.rmoveindex = '';
        //关闭表单或者是下拉显示行
        if (type === 'form') {
          this.$refs['busirenttingRef'].comp.formShow = false;
        } else {
          this.$refs['busirenttingRef'].getTableComp().closeExpandRow();
  
          var OtherContactTable = this.$refs.busirenttingRef.getData('proRentThing_t');
          OtherContactTable[this.baseEditIndex] = this.baseData;
          this.$refs.busirenttingRef.setData('proRentThing_t', OtherContactTable);
        }
      },
      //租赁物主表保存
      renttingFormConfirm: function renttingFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = '';
        var data = this.$refs.busirenttingRef.comp.proRentThing;
        data.source_bill = this.pk_prjId;
        if (data.pk_prj_rent_thing) {
          url = _publicData.ylsBusi + 'prj/rentth/update';
        } else {
          url = _publicData.ylsBusi + 'prj/rentth/create';
        }
        //保存校验
        this.$refs.busirenttingRef.comp.$refs['proRentThing_ref'].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                // this.requestPrjrentting();
                var originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.busirenttingRef.getData('proRentThing_t');
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== '') {
                  linarraydata.splice(_this2.rmoveindex, 1, originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(originalValue);
                }
                _this2.$refs.busirenttingRef.setData('proRentThing_t', JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs['busirenttingRef'].comp.formShow = false;
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
        });
      },
      //租赁物行编辑
      renttingFormedit: function renttingFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['busirenttingRef'].getTableComp().expandRow(row);
        this.$refs['busirenttingRef'].comp.formShow = false;
        //proRentThing为表单数据对象参数
        this.$refs['busirenttingRef'].setData('proRentThing', row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      // 租赁物删除提示
      renttingFormdelete: function renttingFormdelete(scope) {
        this.renttingDelVisible = true;
        this.delId = scope.row.pk_prj_rent_thing;
      },
      // 租赁物删除方法
      renttingDeleteClick: function renttingDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/rentth/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestPrjrentting();
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
        this.renttingDelVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\r\n<!--租赁物信息管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"busirenttingRef\"\r\n                        tplId=\"busirentting\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexuskey\"\r\n                        :tplData=\"busirenttingData\"\r\n                        :tplResetFun=\"renttingResetFun\"\r\n                        :methods=\"changeMethods\"\r\n                        @form-confirm-click=\"renttingFormConfirm\"\r\n                        @form-cancel-click=\"renttingFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"renttingFormedit\"\r\n                        @delete-table-click=\"renttingFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务租赁物 删除提示框 -->\r\n    <el-dialog\r\n      title='提示'\r\n      v-model='renttingDelVisible'\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"renttingDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"renttingDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/busiapply/busiapplymain.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _applySubmitted = require('yls^busi/project/src/application/apply-submitted.vue');
  
  var _applySubmitted2 = _interopRequireDefault(_applySubmitted);
  
  var _applySubmitting = require('yls^busi/project/src/application/apply-submitting.vue');
  
  var _applySubmitting2 = _interopRequireDefault(_applySubmitting);
  
  var _applyCustomerlist = require('yls^busi/project/src/customer/apply-customerlist.vue');
  
  var _applyCustomerlist2 = _interopRequireDefault(_applyCustomerlist);
  
  var _busi_corp_apply = require('yls^busi/project/src/buni/busi_corp_apply.vue');
  
  var _busi_corp_apply2 = _interopRequireDefault(_busi_corp_apply);
  
  var _busi_person_apply = require('yls^busi/project/src/buni/busi_person_apply.vue');
  
  var _busi_person_apply2 = _interopRequireDefault(_busi_person_apply);
  
  var _busi_corp_apply_clickDisabled = require('yls^busi/project/src/buni/busi_corp_apply_clickDisabled.vue');
  
  var _busi_corp_apply_clickDisabled2 = _interopRequireDefault(_busi_corp_apply_clickDisabled);
  
  var _busi_person_apply_clickDisabled = require('yls^busi/project/src/buni/busi_person_apply_clickDisabled.vue');
  
  var _busi_person_apply_clickDisabled2 = _interopRequireDefault(_busi_person_apply_clickDisabled);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      applysubmitted: _applySubmitted2["default"],
      applysubmitting: _applySubmitting2["default"],
      applycustomer: _applyCustomerlist2["default"],
      corpapply: _busi_corp_apply2["default"],
      personapply: _busi_person_apply2["default"],
      corpapplyClickDisabled: _busi_corp_apply_clickDisabled2["default"],
      personapplyClickDisabled: _busi_person_apply_clickDisabled2["default"]
    },
    data: function data() {
      return {
        activeName: 'first',
        custType: true,
        corpapplyType: false,
        clickDisabled: false,
        pkCustomer: '',
        pkApplication: ''
      };
    },
  
    methods: {
      handleClick: function handleClick(tab, event) {
        console.log(tab, event);
        if (tab.$options.propsData.name == "first") {
          this.$refs.applysubmitted.request(this.$refs.applysubmitted.currentPage - 1, this.$refs.applysubmitted.size);
        } else if (tab.$options.propsData.name == "second") {
          this.$refs.applysubmitting.request(this.$refs.applysubmitting.currentPage - 1, this.$refs.applysubmitting.size);
        }
      },
      changeapplysubmit: function changeapplysubmit(val) {
        if ('flushapplysubmitting' == val[0]) {
          this.$refs.applysubmitting.request(this.$refs.applysubmitting.currentPage - 1, this.$refs.applysubmitting.size);
        } else if ('toapplycustomerlist' == val[0]) {
          if ('CORP' == val[3]) {
            this.corpapplyType = true;
            this.custType = false;
            this.clickDisabled = false;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
            this.activeName = 'third';
          } else if ('person' == val[3].toLocaleLowerCase()) {
            this.corpapplyType = false;
            this.custType = false;
            this.clickDisabled = false;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
            this.activeName = 'third';
          }
        }
      },
      changecustlist: function changecustlist(val) {
        if (val) {
          if ('CORP' == val[0]) {
            this.corpapplyType = true;
            this.custType = false;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
          } else if ('person' == val[0].toLocaleLowerCase()) {
            this.corpapplyType = false;
            this.custType = false;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
          }
        }
      },
      changecust: function changecust(val) {
        if ("toapplycustomerlist" == val) {
          this.custType = true;
          this.corpapplyType = false;
        } else if ('toapplied' == val) {
          this.activeName = 'first';
          this.$refs.applysubmitted.request(this.$refs.applysubmitted.currentPage - 1, this.$refs.applysubmitted.size);
          this.custType = true;
          this.corpapplyType = false;
        }
      },
      changeperson: function changeperson(val) {
        if ('toapplycustomerlist' == val) {
          this.custType = true;
          this.corpapplyType = false;
        } else if ('toapplied' == val) {
          this.activeName = 'first';
          this.$refs.applysubmitted.request(this.$refs.applysubmitted.currentPage - 1, this.$refs.applysubmitted.size);
          this.custType = true;
          this.corpapplyType = false;
        }
      },
      changeapplysubmitted: function changeapplysubmitted(val) {
        if ('toapplycustomerlist' == val[0]) {
          if ('CORP' == val[3]) {
            this.corpapplyType = true;
            this.custType = false;
            this.clickDisabled = true;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
            this.activeName = 'third';
          } else if ('person' == val[3].toLocaleLowerCase()) {
            this.corpapplyType = false;
            this.custType = false;
            this.clickDisabled = true;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
            this.activeName = 'third';
          }
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<el-tabs id=\"busi-main\" v-model=\"activeName\" @tab-click=\"handleClick\">\n  <el-tab-pane label=\"已提交申请\" name=\"first\">\n      <applysubmitted ref=\"applysubmitted\" @chang-apply-submitted=\"changeapplysubmitted\"></applysubmitted>\n  </el-tab-pane>\n  <el-tab-pane label=\"待提交申请\" name=\"second\">\n      <applysubmitting  ref=\"applysubmitting\" @chang-apply-submitting=\"changeapplysubmit\"></applysubmitting>\n  </el-tab-pane>\n  <el-tab-pane label=\"基于客户\" name=\"third\">\n      <applycustomer v-if=\"custType\" @change-cust-list=\"changecustlist\"></applycustomer>\n      <div v-else-if=\"clickDisabled\">\n        <corpapplyClickDisabled v-if=\"corpapplyType\" :pkCustomer=\"pkCustomer\" :pkApplication=\"pkApplication\" @change-corp-card=\"changecust\">\n        </corpapplyClickDisabled>\n        <personapplyClickDisabled v-else :pkCustomer=\"pkCustomer\" :pkApplication=\"pkApplication\" @change-person-card=\"changeperson\">\n        </personapplyClickDisabled>\n      </div>\n      <div v-else>\n        <corpapply v-if=\"corpapplyType\" :pkCustomer=\"pkCustomer\" :pkApplication=\"pkApplication\" @change-corp-card=\"changecust\">\n        </corpapply>\n        <personapply v-else :pkCustomer=\"pkCustomer\" :pkApplication=\"pkApplication\" @change-person-card=\"changeperson\">\n        </personapply>\n      </div>\n  </el-tab-pane>\n  <!-- <el-tab-pane label=\"基于CRM\" name=\"fourth\">基于CRM</el-tab-pane> -->\n</el-tabs>\n\n"
  

});
 
 define('yls^busi/project/src/contractinfo/contractinfo-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _projectBothLesseePanel = require('yls^busi/project/src/projectinfo/projectBothLesseePanel.vue');
  
  var _projectBothLesseePanel2 = _interopRequireDefault(_projectBothLesseePanel);
  
  var _projectOrginfoPanel = require('yls^busi/project/src/projectinfo/projectOrginfoPanel.vue');
  
  var _projectOrginfoPanel2 = _interopRequireDefault(_projectOrginfoPanel);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busiRelevantParty = require('yls^busi/project/src/buni/busi-relevantParty.vue');
  
  var _busiRelevantParty2 = _interopRequireDefault(_busiRelevantParty);
  
  var _ProviderPanel = require('yls^busi/project/src/projectinfo/ProviderPanel.vue');
  
  var _ProviderPanel2 = _interopRequireDefault(_ProviderPanel);
  
  var _custpledgeInfo = require('yls^busi/project/src/custpledge/custpledge-info.vue');
  
  var _custpledgeInfo2 = _interopRequireDefault(_custpledgeInfo);
  
  var _mortgageInfo = require('yls^busi/project/src/custpledge/mortgage-info.vue');
  
  var _mortgageInfo2 = _interopRequireDefault(_mortgageInfo);
  
  var _pledgeInfo = require('yls^busi/project/src/custpledge/pledge-info.vue');
  
  var _pledgeInfo2 = _interopRequireDefault(_pledgeInfo);
  
  var _paycondition = require('yls^busi/project/src/paycondition/paycondition.vue');
  
  var _paycondition2 = _interopRequireDefault(_paycondition);
  
  var _rentcondition = require('yls^busi/project/src/rentcondition/rentcondition.vue');
  
  var _rentcondition2 = _interopRequireDefault(_rentcondition);
  
  var _pentaltyrulede = require('yls^busi/project/src/pentaltyrulede/pentaltyrulede.vue');
  
  var _pentaltyrulede2 = _interopRequireDefault(_pentaltyrulede);
  
  var _projectAccount = require('yls^busi/project/src/projectinfo/project-account.vue');
  
  var _projectAccount2 = _interopRequireDefault(_projectAccount);
  
  var _tax_message_alter = require('yls^busi/project/src/contractinfo/tax_message_alter.vue');
  
  var _tax_message_alter2 = _interopRequireDefault(_tax_message_alter);
  
  var _rentConditionSelect = require('yls^busi/project/src/projectinfo/rentConditionVM/rent-condition-select.vue');
  
  var _rentConditionSelect2 = _interopRequireDefault(_rentConditionSelect);
  
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
      'busirenttingRef': _busi_rentting2["default"],
      'OrginfoRef': _projectOrginfoPanel2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirelevantPartyRef': _busiRelevantParty2["default"],
      'bothlesseeRef': _projectBothLesseePanel2["default"],
      'custpledgeRef': _custpledgeInfo2["default"],
      'mortgageRef': _mortgageInfo2["default"],
      'pledgeRef': _pledgeInfo2["default"],
      'contProviderRef': _ProviderPanel2["default"],
      'payConditionRef': _paycondition2["default"],
      'rentConditionRef': _rentcondition2["default"],
      'penaltyRuleDeRef': _pentaltyrulede2["default"],
      'projectAccountRef': _projectAccount2["default"],
      'taxMessageAlterRef': _tax_message_alter2["default"],
      'impRentConditionRef': _rentConditionSelect2["default"]
    },
    data: function data() {
      var _ref;
  
      var oThis = this;
      return _ref = {
        delDialogVisible: false,
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //合同主键
        pk_contract: "",
        //是否有共同承租人
        is_lessee_type: '',
        pledgeType: 'type0',
        // 放款申请主模板 baseTemplateRef start
        funnode: "BT009",
        nexusKey: "contract",
        tplData: {},
        editable: false,
        //担保参数
        guarantee: "guarantee1",
        //存放目前已经选择的起租条件的主键
        rentConditionList: []
  
      }, _ref['delDialogVisible'] = false, _ref.selDialogVisible = false, _ref.rentConditionData = {}, _ref.radioShow = true, _ref.baseIcons = [{
        icon: "edit",
        click: function click() {
          oThis.editable = !oThis.editable;
        }
      }], _ref.rentTingIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.busirenttingRef.$refs.busirenttingRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.busirenttingRef.$refs.busirenttingRef.resetFormData();
          // 显示新增区域
          oThis.$refs.busirenttingRef.$refs.busirenttingRef.formShow = true;
        }
      }], _ref.bothlesseeIcons = [{
        icon: "plus",
        click: function click() {
  
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.formShow = true;
        }
      }], _ref.OrginfoIcons = [{
        icon: "plus",
        click: function click() {
  
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.formShow = true;
        }
      }], _ref.contProviderIcons = [{
        icon: "plus",
        click: function click() {
  
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.contProviderRef.$refs.contProviderRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.contProviderRef.$refs.contProviderRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.contProviderRef.$refs.contProviderRef.comp.formShow = true;
        }
      }], _ref.pledgeIcons = [{
        icon: 'plus',
        click: function click() {
          if (oThis.pk_contract === '') {
            oThis.$message({
              message: '请先保存基本信息',
              type: 'error'
            });
            return;
          }
          //显示担保添加
          oThis.$refs.custpledgeRef.$refs.custpledgeRef.getTableComp().closeExpandRow();
          oThis.$refs.custpledgeRef.$refs.custpledgeRef.resetFormData();
          oThis.$refs.custpledgeRef.$refs.custpledgeRef.comp.formShow = true;
          //显示抵押添加
          oThis.$refs.mortgageRef.$refs.mortgageRef.getTableComp().closeExpandRow();
          oThis.$refs.mortgageRef.$refs.mortgageRef.resetFormData();
          oThis.$refs.mortgageRef.$refs.mortgageRef.comp.formShow = true;
          //显示质押添加
          oThis.$refs.pledgeRef.$refs.pledgeRef.getTableComp().closeExpandRow();
          oThis.$refs.pledgeRef.$refs.pledgeRef.resetFormData();
          oThis.$refs.pledgeRef.$refs.pledgeRef.comp.formShow = true;
        }
      }], _ref.insuranceIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.insuranceRef.$refs.insuranceRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.insuranceRef.$refs.insuranceRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
        }
      }], _ref.relevantPartyIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.formShow = true;
        }
      }], _ref.payConditionIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.payConditionRef.$refs.payConditionRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.payConditionRef.$refs.payConditionRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.payConditionRef.$refs.payConditionRef.comp.formShow = true;
        }
      }], _ref.rentConditionIcons = [{
        title: "新增",
        icon: "plus",
        click: function click() {
          oThis.selDialogVisible = true;
        }
      }], _ref.penaltyRuleDeIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.formShow = true;
        }
      }], _ref.projectAccountIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.resetFormData();
          // 显示新增区域
          oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.formShow = true;
        }
      }], _ref.taxMessageAlterIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_contract === "") {
            oThis.$message({
              messsage: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.getTableComp().closeExpandRow();
  
          //重置新增数据
          oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.resetFormData();
  
          //显示新增区域
          oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.formShow = true;
        }
      }], _ref;
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      //担保信息 关闭添加页签
      closeAddFormEev: function closeAddFormEev() {
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
  
      //返回按钮
      goBack: function goBack() {
        window.history.back(-1);
      },
  
      // 合同主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
      },
      clickSave: function clickSave() {
        var _this = this;
  
        var data = this.$refs.baseTemplateRef.comp.contract;
        var jsonData = JSON.parse(JSON.stringify(data));
        var url;
        if (this.pk_project) {
          url = _publicData.ylsBusi + 'contr/contractinfo/update';
        } else {
          url = _publicData.ylsBusi + 'contr/contractinfo/create';
        }
        this.$http({
          url: url,
          method: "post",
          data: jsonData
        }).then(function (res) {
          _this.editable = false;
          var originalValue = res.data.data;
          _this.pk_contract = res.data.data.pk_contract;
          _this.$refs["baseTemplateRef"].setData("contract", JSON.parse(JSON.stringify(originalValue)));
          _this.pk_contract = originalValue.pk_contract;
        })["catch"](function (e) {
          _this.$message({
            message: "合同保存失败！",
            type: "error"
          });
        });
      },
  
      // 合同主模板 baseTemplateRef 事件处理 end
  
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_contract = this.$root.$router.currentRoute.params.id;
        if (this.pk_contract == undefined) this.pk_contract = "";
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_contract && this.pk_contract != "") {
          //加载合同信息
          this.loadcontractinfo(this.pk_contract);
          //请求起租条件
          this.loadRentCondition();
        } else {
          this.editable = true;
        }
      },
  
      //加载合同信息
      loadcontractinfo: function loadcontractinfo(pk_contract) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/contr/contractinfo/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_contract
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("contract", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: "合同详情获取失败",
            type: "error"
          });
        });
      },
  
  
      //弹出界面选择确认
      selConfirmClick: function selConfirmClick() {
        var _this3 = this;
  
        debugger;
        var tableSelections = this.$refs.impRentConditionRef.$refs.rentDialogRef.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
          debugger;
          var pks = [];
          tableSelections.forEach(function (item, index) {
            pks[index] = item.pk_prj_rent_condition;
          });
          var data = {
            strArray: pks,
            pk: this.pk_contract
          };
          this.$http({
            url: "/yls-busi-web/contr/rentCondition/addRentConditions",
            headers: { 'Content-Type': 'application/json' },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
  
            if (res.data.success === true) {
              var originalValue = res.data.data;
              _this3.$refs["RentConditionRef"].setData("RentCondition_t", JSON.parse(JSON.stringify(originalValue)));
              debugger;
              _this3.loadRentCondition();
              _this3.selDialogVisible = false;
              _this3.$message({
                message: "设置起租条件成功",
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
            message: "请选择起租条件！",
            type: "error"
          });
        }
      },
  
  
      //加载起租信息
      loadRentCondition: function loadRentCondition() {
        var _this4 = this;
  
        debugger;
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_contract
              }]
            }
          }
        };
  
        this.$http({
          url: "/yls-busi-web/contr/rentCondition/page",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data
        }).then(function (res) {
          debugger;
          var originalValue = res.data.data.content;
          var jsonObj = JSON.parse(JSON.stringify(originalValue));
          _this4.$refs["RentConditionRef"].setData("RentCondition_t", jsonObj);
          debugger;
          if (jsonObj) {
            debugger;
            for (var i = 0; i < jsonObj.length; i++) {
              _this4.rentConditionList[i] = jsonObj[i].pk_parent_rent;
            }
          }
        })["catch"](function (e) {
          _this4.$message({
            message: "起租条件失败",
            type: "error"
          });
        });
      },
      rentDeleteTableRow: function rentDeleteTableRow(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_prj_rent_condition;
      },
  
  
      //起租条件确认删除
      deleteConfirmClick: function deleteConfirmClick() {
        var _this5 = this;
  
        debugger;
        this.delDialogVisible = false;
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'contr/rentCondition/deleteById';
  
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this5.$message({
              message: "删除成功",
              type: "success"
            });
            _this5.request();
            _this5.loadRentCondition();
          } else {
            _this5.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this5.$message({
            message: "Network error",
            type: "error"
          });
        });
      }
    }
  };
  //引入起租条件 模板
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">新增合同</h2>\n  </div>\n  \n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 合同主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"合同\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--承租人信息-->\n       <ifbp-panel id=\"bothlesseeRef\" title=\"承租人信息\" :icons=\"bothlesseeIcons\">\n        <bothlesseeRef\n          ref=\"bothlesseeRef\"\n          :source_bill=\"pk_contract\"\n          :is_lessee_type=\"is_lessee_type\"\n          :type=\"'prj'\">\n        </bothlesseeRef>\n      </ifbp-panel>\n       <!--出租人信息-->\n       <ifbp-panel id=\"OrginfoRef\" title=\"出租人信息\" :icons=\"OrginfoIcons\">\n        <OrginfoRef\n          ref=\"OrginfoRef\"\n          :source_bill=\"pk_contract\"\n          :type=\"'prj'\">\n        </OrginfoRef>\n      </ifbp-panel>\n       <!--供应商信息-->\n       <ifbp-panel id=\"contProviderRef\" title=\"供应商信息\" :icons=\"contProviderIcons\">\n        <contProviderRef\n          ref=\"contProviderRef\"\n          :source_bill=\"pk_contract\"\n          :type=\"'prj'\">\n        </contProviderRef>\n      </ifbp-panel>\n       <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\" :icons=\"pledgeIcons\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_contract\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_contract\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_contract\"\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n       <!--租赁物信息-->\n       <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\" :icons=\"rentTingIcons\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :pk_prjId=\"pk_contract\"\n          :type=\"'prj'\">\n        </busirenttingRef>\n      </ifbp-panel>\n      <!--保险信息-->\n       <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_contract'\n          :type=\"'prj'\">\n        </insuranceRef>\n      </ifbp-panel>\n      <!--合同相关方信息-->\n      <ifbp-panel id=\"busirelevantPartyRef\" title=\"合同相关方\" :icons=\"relevantPartyIcons\">\n        <busirelevantPartyRef\n          ref=\"busirelevantPartyRef\"\n          :pk_prjId=\"pk_contract\"\n          :type=\"'prj'\">\n        </busirelevantPartyRef>\n      </ifbp-panel>\n       <!--付款条件-->\n      <ifbp-panel id=\"payConditionRef\" title=\"付款条件\" :icons=\"payConditionIcons\">\n        <payConditionRef\n          ref=\"payConditionRef\"\n          :pk_prjId=\"pk_contract\"\n          :type=\"'prj'\">\n        </payConditionRef>\n      </ifbp-panel>\n      <!--起租条件-->\n       <ifbp-panel id=\"rentConditionRef\" title=\"起租条件\" :icons=\"rentConditionIcons\" >\n        <ifbp-template ref=\"RentConditionRef\"\n                      tplId=\"rentConditionId\"\n                      funnode=\"BT015\"\n                      nexuskey=\"rent_condition\"\n                      :tplData=\"rentConditionData\"\n                      :tplResetFun=\"rentConditionFun\"\n                      @delete-table-click=\"rentDeleteTableRow\"\n                      show-type=\"table-form\"\n                      >\n        </ifbp-template>\n      </ifbp-panel>\n       <!--逾期利率信息-->\n       <ifbp-panel id=\"penaltyRuleDeRef\" title=\"逾期利率信息\" :icons=\"penaltyRuleDeIcons\">\n        <penaltyRuleDeRef\n          ref=\"penaltyRuleDeRef\"\n          :pk_prjId=\"pk_contract\"\n          :type=\"'prj'\">\n        </penaltyRuleDeRef>\n      </ifbp-panel>\n       <!--收付各方-->\n      <ifbp-panel id=\"projectAccountRef\" title=\"收付各方\" :icons=\"projectAccountIcons\">\n        <projectAccountRef\n          ref=\"projectAccountRef\"\n          :pk_prjId=\"pk_contract\"\n          :type=\"'prj'\">\n      </projectAccountRef>\n      </ifbp-panel>\n      <!--增值税基本信息变更-->\n      <ifbp-panel id=\"taxMessageAlterRef\" title=\"增值税基本信息变更\" :icons=\"taxMessageAlterIcons\">\n        <taxMessageAlterRef\n          ref=\"taxMessageAlterRef\"\n          :pk_prjId=\"pk_contract\"\n          :type=\"'prj'\">\n        </taxMessageAlterRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n\n      <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确定删除此条租条件？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n     <!--起租条件-->\n      <el-dialog  title=\"起租条件\"   v-model=\"selDialogVisible\"\n       @update:visible=\"val => selDialogVisible = val\" :modal=\"true\"  size=\"large\">\n         <impRentConditionRef ref=\"impRentConditionRef\"\n                              :conditions=\"rentConditionList\"\n                              :reload=\"selDialogVisible\"\n                              ></impRentConditionRef>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"selDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"selConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n</div>\n"
  

});
 
 define('yls^busi/project/src/contractinfo/contractinfo-list.vue', function(require, exports, module) {

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
  
  
  exports["default"] = {
      data: function data() {
          return {
              //模版主键
              funnode: "BT009",
              nexusKey: "contract",
              //当前页
              currentPage: 1,
              //每页显示个数选择器的选项设置
              pageSizes: window.pubPageSizes,
              //每页显示条目个数
              size: window.pubSize,
              //总条目数
              totalSize: 0,
              contractnfoListData: {},
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
                  var $table = this.getNodeById($node, "qi6snhn95f");
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
          this.request(this.currentPage - 1, this.size);
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          // 添加按钮
          addInterrateInfo: function addInterrateInfo() {
              location.hash = "/contractinfo/add";
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/contractinfo/detail/" + scope.row.pk_contract;
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
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_contract;
              this.delDialogVisible = true;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.delDialogVisible = false;
              this.$http({
                  url: "/yls-busi-web/contr/contractinfo/deleteById",
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
  
          //后台请求
          request: function request(n, s) {
              var _this2 = this;
  
              debugger;
              var url;
              var baseUrl = "/yls-busi-web";
              url = baseUrl + '/contr/contractinfo/page';
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
                  //QuoteCalculator_table UI模板表格名称
                  debugger;
                  var originalValue = res.data.data.content;
                  _this2.$refs["contractinfo_table"].setData("contract_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalSize = res.data.data.totalElements; // 总条数
                  console.log(res.data.data.size);
                  _this2.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  console.log(e);
                  debugger;
                  _this2.$message({
                      message: "信息获取失败",
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">合同</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"合同编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n\n  <!-- 合同列表 -->\n  <div id=\"contractList\" class=\"list-main-container clearfix\">\n    <!--模板组件:pkTemp=\"pk_temp\"-->\n   <ifbp-template ref=\"contractinfo_table\"\n                  tplId=\"contractinfo-template\"\n                   :funnode=\"funnode\"\n                   :nexuskey=\"nexusKey\"\n                  :tplData=\"contractnfoListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalSize\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/contractinfo/tax_message_alter.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
      //应用vue传过来接收参数
  
      props: ["source_bill", "type"],
      data: function data() {
          var oThis = this;
          return {
              scrollDom: document.getElementsByClassName("view")[0],
              taxMessageAlterDelVisible: false,
              removeIndex: "",
              delId: "",
              funnode: "BT009",
              nexusKey: "tax_message_alter",
              taxMessageAlterData: {
                  rules: {}
              },
              taxMessageAlterResetFun: function taxMessageAlterResetFun($node) {
                  //客户参照
                  var $customerRef = this.getNodeById($node, 'mupcixhoywi');
                  if ($customerRef) {
                      $customerRef.attr("v-on:trigger", "customerRefChange");
                  };
                  //银行参照
                  var $bankRef = this.getNodeById($node, 'akv70w5yzy');
                  if ($bankRef) {
                      $bankRef.attr("v-on:trigger", "bankaccountRefChange");
                  };
                  //联系人参照
                  var $linkmanRef = this.getNodeById($node, 'vo3x043tfq');
                  if ($linkmanRef) {
                      $linkmanRef.attr("v-on:trigger", "linkmanRefChange");
                  };
  
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
              },
              taxMethods: {
                  //客户参照带出相关信息
                  customerRefChange: function customerRefChange(type, data) {
  
                      oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.tax_no = data.value[0].taxpayer_number; //纳税人识别号
                      oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.company_phone = data.value[0].phone; //公司电话
                  },
                  //银行账户带出相关信息
                  bankaccountRefChange: function bankaccountRefChange(type, data) {
  
                      oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.bank_account = data.value[0].refcode; //银行账户
                      oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.deposit_bank = data.value[0].bank_no; //开户银行
                  },
                  //联系人信息带出
                  linkmanRefChange: function linkmanRefChange(type, data) {
  
                      oThis.$refs.taxMessageAlterRef.comp.taxMessageAlter.linkman_phone = data.value[0].mobile; //联系人电话
                  }
              }
  
          };
      },
  
  
      //监听引用传参后实时变动
      computed: {
          currentsource_bill: function currentsource_bill() {
              return this.source_bill;
          }
      },
  
      //监听参数变动后方法
      watch: {
          source_bill: function source_bill(val) {
              this.requestTaxMessageAlter();
          }
      },
  
      //获取数据初始化操作
      created: function created() {},
  
  
      //页面操作
      mounted: function mounted() {
          this.request();
      },
  
  
      methods: {
          request: function request() {
              if (this.source_bill != "") {
                  this.requestTaxMessageAlter();
              }
          },
  
  
          //请求增值税基本信息变更表格数据
          requestTaxMessageAlter: function requestTaxMessageAlter() {
              var _this = this;
  
              var url = _publicData.ylsBusi + "contr/taxMessageAlter/page";
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  pageNum: 0,
                  pageSize: 0,
                  searchParams: {
                      searchMap: {
                          source_bill: this.source_bill
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
  
                  _this.taxMessageAlterData = res.data.data.content;
                  _this.$refs["taxMessageAlterRef"].setData("taxMessageAlter_t", JSON.parse(JSON.stringify(_this.taxMessageAlterData)));
              })["catch"](function () {
                  _this.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
  
  
          //增值税基本信息变更取消按钮
          taxMessageAlterFormCancel: function taxMessageAlterFormCancel(type) {
              this.removeIndex = "";
              //关闭表单或者下拉显示行
              if (type === "form") {
                  this.$refs["taxMessageAlterRef"].comp.formShow = false;
              } else {
                  this.$refs["taxMessageAlterRef"].getTableComp().closeExpandRow();
                  var taxDatas = this.$refs.taxMessageAlterRef.getData("taxMessageAlter_t");
                  taxDatas[this.taxEditBakIndex] = this.taxEditBakData;
                  this.$refs.taxMessageAlterRef.setData("taxMessageAlter_t", taxDatas);
              }
          },
  
          //增值税基本信息变更保存
          taxMessageAlterFormConfirm: function taxMessageAlterFormConfirm() {
              var _this2 = this;
  
              //获取当前数据
              var url = "";
              var data = this.$refs.taxMessageAlterRef.comp.taxMessageAlter;
              data.source_bill = this.source_bill;
              if (data.pk_taxmessage_alter) {
                  url = _publicData.ylsBusi + 'contr/taxMessageAlter/update';
              } else {
                  url = _publicData.ylsBusi + 'contr/taxMessageAlter/create';
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
                      _this2.requestTaxMessageAlter();
                      _this2.$refs["taxMessageAlterRef"].comp.formShow = false;
                  } else {
  
                      _this2.$message({
                          message: res.data.error.errorMessage,
                          type: "error"
                      });
                  }
              })["catch"](function (e) {
                  console.log(e);
                  _this2.$message({
                      message: "更新失败",
                      type: "error"
                  });
              });
          },
  
          //增值税基本信息变更行编辑
          taxMessageAlterEdit: function taxMessageAlterEdit(scope) {
              //记录删除位置
              this.removeIndex = scope.$index;
  
              //行下展开表单页面
              var row = scope.row;
              this.$refs.taxMessageAlterRef.getTableComp().expandRow(row);
              this.$refs.taxMessageAlterRef.formShow = false;
  
              //taxMessageAlter为表单数据对象参数
              this.$refs.taxMessageAlterRef.setData("taxMessageAlter", row);
              this.taxEditBakData = JSON.parse(JSON.stringify(scope.row));
              this.taxEditBakIndex = scope.$index;
          },
  
          //增值税基本信息变更行删除提示
          taxMessageAlterDelete: function taxMessageAlterDelete(scope) {
              this.taxMessageAlterDelVisible = true;
              this.delId = scope.row.pk_taxmessage_alter;
          },
  
          //增值税基本信息变更行删除方法
          taxMessageAlterDelClick: function taxMessageAlterDelClick() {
              var _this3 = this;
  
              this.$http({
                  url: _publicData.ylsBusi + "/contr/taxMessageAlter/deleteById",
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
                      _this3.requestTaxMessageAlter();
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
              this.taxMessageAlterDelVisible = false;
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
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!-- 增值税基本信息变更  -->\r\n<div>\r\n    <ifbp-template ref=\"taxMessageAlterRef\"\r\n                tplId=\"taxMessageAlter\"\r\n                :funnode=\"funnode\"\r\n                :nexuskey=\"nexusKey\"\r\n                :tplData=\"taxMessageAlterData\"\r\n                :tplResetFun=\"taxMessageAlterResetFun\"\r\n                :methods = \"taxMethods\"\r\n                @form-confirm-click=\"taxMessageAlterFormConfirm\"\r\n                @form-cancel-click=\"taxMessageAlterFormCancel\"\r\n                show-type=\"table-form\"\r\n                form-show=\"false\"\r\n                @edit-table-click=\"taxMessageAlterEdit\"\r\n                @delete-table-click=\"taxMessageAlterDelete\"\r\n                >\r\n     </ifbp-template>\r\n\r\n    <!-- 删除提示框-->\r\n    <el-dialog\r\n        title=\"提示\"\r\n        v-model=\"taxMessageAlterDelVisible\"\r\n        :modal=\"true\"\r\n        size=\"tiny\">\r\n        <span>确认删除该条记录？删除后无法恢复。</span>\r\n        <span slot=\"footer\" class=\"dialog-footer\">\r\n            <el-button @click=\"taxMessageAlterDelVisible = false, this.delId=''\">取消</el-button>\r\n            <el-button type=\"primary\" @click=\"taxMessageAlterDelClick\">确定</el-button>\r\n        </span>\r\n    </el-dialog>\r\n</div>\r\n"
  

});
 
 define('yls^busi/project/src/creditManagement/credit_management_detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _lessee_credit_evaluation = require('yls^busi/project/src/creditManagement/lessee_credit_evaluation.vue');
  
  var _lessee_credit_evaluation2 = _interopRequireDefault(_lessee_credit_evaluation);
  
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
  
  exports["default"] = {
      components: {
          'lesseeCreditEvaluationRef': _lessee_credit_evaluation2["default"]
      },
      data: function data() {
          var oThis = this;
          return {
              scrollDom: document.getElementsByClassName('view')[0],
              projectCreditFunnode: 'BT008',
              projectCreditNexusKey: 'project_credit',
              projectCreditEditable: false,
              pk_project_credit: '',
              projectCreditData: {
                  rules: {}
              },
              projectCreditPlusIcons: [{
                  icon: 'edit',
                  click: function click() {
                      oThis.projectCreditEditable = !oThis.projectCreditEditable;
                      //备份，取消时还原
                      oThis.projectCreditCacheData = JSON.parse(JSON.stringify(oThis.$refs.projectCreditRef.getData('projectCredit')));
                  }
              }],
              projectCreditResetFun: function projectCreditResetFun($node) {
                  //银行账户参照
                  var lessorAccount = this.getNodeById($node, 'jsx36embp3o');
                  if (lessorAccount.length) {
                      lessorAccount.attr('v-on:trigger', 'lessorAccountRefChange');
                  }
  
                  //租赁方式下拉框
                  var leasingMethod = this.getNodeById($node, '9hqou4du7zg');
                  if (leasingMethod.length) {
                      leasingMethod.attr('v-on:change', 'leasingMethodValChange');
                  }
              },
  
              ref_methods: {
                  //银行账户参照
                  lessorAccountRefChange: function lessorAccountRefChange(type, data) {
                      if (type === 'change') {
                          var lessorAccount = data.value[0];
                          var projectCredit = this.$refs.projectCredit_ref.model;
                          projectCredit.lessor_account_number = lessorAccount.refcode;
                          projectCredit.lessor_bank = lessorAccount.bank_no;
                          oThis.$refs.projectCreditRef.setData('projectCredit', projectCredit);
                      }
                  },
                  leasingMethodValChange: function leasingMethodValChange(type, data) {
                      if (type === 'SUBLEASE') {
                          var bLOptions = this.$refs.business_line_ref.options;
                          for (var i in bLOptions) {
                              //业务条线下拉框-当租赁方式为转租赁时，只能选择转租赁业务条线
                              if (bLOptions[i].value == 'RENTING_CAR' || bLOptions[i].value == 'RENTING_MEDICAL' || bLOptions[i].value == 'RENTING_OTHER') {
                                  bLOptions[i].disabled = false;
                              } else {
                                  bLOptions[i].disabled = true;
                              }
                          }
                      } else {
                          var _bLOptions = this.$refs.business_line_ref.options;
                          for (var _i in _bLOptions) {
                              _bLOptions[_i].disabled = false;
                          }
                      }
                  }
  
              }
  
          };
      },
      created: function created() {
          this.loadData();
      },
  
  
      methods: {
          loadData: function loadData() {
              this.pk_project_credit = this.$root.$router.currentRoute.params.id;
              if (this.pk_project_credit) {
  
                  //加载项目授信信息
                  this.loadProjectCreditData(this.pk_project_credit);
              } else {
                  this.pk_project_credit = '';
                  this.projectCreditEditable = true;
              }
          },
          loadProjectCreditData: function loadProjectCreditData(pk_project_credit) {
              var _this = this;
  
              this.$http({
                  url: _publicData.ylsBusi + 'projectCredit/getById',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: pk_project_credit
              }).then(function (res) {
                  var result = res.data.data;
                  _this.$refs.projectCreditRef.setData('projectCredit', result);
              });
          },
          creditApprovalCancel: function creditApprovalCancel() {
              window.history.back(-1);
          },
          creditApprovalConfirm: function creditApprovalConfirm() {},
  
          pojectCreditClickCancel: function pojectCreditClickCancel(type) {
              this.projectCreditEditable = false;
              //还原表单数据
              this.$refs.projectCreditRef.setData('projectCredit', this.projectCreditCacheData);
          },
          pojectCreditClickSave: function pojectCreditClickSave() {
              var _this2 = this;
  
              this.$refs.projectCreditRef.comp.$refs['projectCredit_ref'].validate(function (valid) {
                  if (valid) {
                      var data = _this2.$refs.projectCreditRef.comp.projectCredit;
                      var url;
                      if (_this2.pk_project_credit) {
                          url = _publicData.ylsBusi + 'projectCredit/update';
                      } else {
                          url = _publicData.ylsBusi + 'projectCredit/createProjectCredit';
                      }
                      _this2.$http({
                          url: url,
                          headers: { 'Content-type': 'application/json' },
                          method: 'post',
                          data: data
                      }).then(function (res) {
                          if (res.data.success === true) {
                              _this2.$message({
                                  message: '保存成功',
                                  type: 'success'
                              });
                              var result = res.data.data;
                              _this2.$refs.projectCreditRef.setData('projectCredit', result);
                              _this2.pk_project_credit = result.pk_project_credit;
                              _this2.projectCreditEditable = false;
                          } else {
                              _this2.$message({
                                  message: res.data.error.errorMessage,
                                  type: 'error'
                              });
                          }
                      })["catch"](function () {
                          _this2.$message({
                              message: '保存或更新失败',
                              type: 'error'
                          });
                      });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n    <div class=\"title-container\">\n        <h2 class=\"name\">授信审批详情页</h2>\n    </div>\n    <div class=\"detail-main-container clearfix\">\n        <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\" >\n            <div class=\"detail-button-header\">\n                <el-button class=\"fr\" type=\"primary\" @click=\"creditApprovalCancel\" >返回</el-button>\n                <el-button class=\"fr\" type=\"primary\" @click=\"creditApprovalConfirm\" style=\"margin-right:10px\">保存</el-button>\n            </div>\n            <!-- 项目授信信息-->\n            <ifbp-panel id=\"basePanel\" title=\"项目授信信息\" :icons=\"projectCreditPlusIcons\">\n                <ifbp-template ref=\"projectCreditRef\"\n                            tplId=\"projectCredit\"\n                            :funnode=\"projectCreditFunnode\"\n                            :nexuskey=\"projectCreditNexusKey\"\n                            :tplData=\"projectCreditData\"\n                            show-type=\"form\"\n                            :tplResetFun=\"projectCreditResetFun\"\n                            :methods=\"ref_methods\"\n                            :editable=\"projectCreditEditable\">\n                </ifbp-template>\n                <div class=\"form-button-div\" v-if=\"projectCreditEditable\">\n                    <el-button type=\"default\" class=\"button-no-radius\" @click=\"pojectCreditClickCancel\">取消</el-button>\n                    <el-button type=\"primary\" class=\"button-no-radius\" @click=\"pojectCreditClickSave\">保存</el-button>\n                </div>\n            </ifbp-panel>\n            <!-- 承租人资信评价 -->\n            <ifbp-panel id=\"basePanel\" title=\"承租人资信评价\">\n                <lesseeCreditEvaluationRef ref=\"lesseeCreditEvaluationRef\"\n                            :pk_project_credit=\"pk_project_credit\">\n                </lesseeCreditEvaluationRef>\n            </ifbp-panel>\n        </ifbp-panel-group>\n    </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/creditManagement/credit_management_list.vue', function(require, exports, module) {

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
              creditManagementListFunnode: 'BT008',
              creditManagementListNexuskey: 'credit_management_list',
              creditManagementListData: {},
              delDialogVisible: false,
              delId: '',
  
              creditManagementListResetFun: function creditManagementListResetFun($node) {
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
  
              var url = _publicData.ylsBusi + 'creditManagement/getCreditManagementList';
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
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  _this.$refs.creditManagementListRef.setData('CreditManagement_t', res.data.data.content);
                  _this.totalElements = res.data.data.totalElements;
              })["catch"](function () {
                  _this.$message({
                      message: '信息获取失败',
                      type: 'error'
                  });
              });
          },
          addcreditManagementInfo: function addcreditManagementInfo() {
              location.hash = '/creditManagement/detail/add';
          },
          rowEditClick: function rowEditClick(scope) {
              location.hash = '/creditManagement/detail/' + scope.row.pk_project_credit;
          },
          rowDeleteClick: function rowDeleteClick(scope) {
              this.delId = scope.row.pk_project_credit;
              this.delDialogVisible = true;
          },
          deleteConfirmClick: function deleteConfirmClick() {
              var _this2 = this;
  
              this.$http({
                  url: _publicData.ylsBusi + 'creditManagement/deleteCreditManagement',
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n    <div class=\"title-header\">\n        <h2 class=\"name\">授信管理列表页</h2>\n    </div>\n\n    <div class=\"operator-container\">\n        <div class=\"fl\">\n            <el-button type=\"primary\" class=\"legacy\" @click=\"addcreditManagementInfo\">新增</el-button>\n        </div>\n    </div>\n\n    <div class=\"list-main-container clearfix\">\n        <ifbp-template ref=\"creditManagementListRef\"\n            tplId=\"creditManagementList\"\n            :funnode=\"creditManagementListFunnode\"\n            :nexuskey=\"creditManagementListNexuskey\"\n            :tplData=\"creditManagementListData\"\n            show-type=\"table\"\n            :tplResetFun=\"creditManagementListResetFun\"\n            @edit-table-click=\"rowEditClick\"\n            @delete-table-click=\"rowDeleteClick\">\n        </ifbp-template>\n\n        <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n            :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n        </el-pagination>\n\n        <el-dialog title=\"提示\"\n            v-model=\"delDialogVisible\"\n            @update:visible=\"val => delDialogVisible = val\"\n            :modal=\"true\"\n            size=\"tiny\">\n            <span>确认删除该数据？删除后无法恢复。</span>\n            <span slot=\"footer\" class=\"dialog-footer\">\n                <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n                <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n            </span>\n        </el-dialog>\n    </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/creditManagement/lessee_credit_evaluation.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ["pk_project_credit"],
    data: function data() {
      var oThis = this;
      return {
        Funnode: 'BT008',
        NexusKey: 'lessee_credit_evaluation',
        enterStatus: true,
        evaluationMethod: '附件上传',
        fileList: [],
        lesseeCreditEvaluationData: {
          rules: {}
        }
  
      };
    },
    mounted: function mounted() {},
  
  
    methods: {
      enterCancl: function enterCancl() {},
      enterSave: function enterSave() {},
      annexCancl: function annexCancl() {},
      annexUpload: function annexUpload() {
        var fileList = this.fileList;
        this.$refs.upload.submit();
        debugger;
      },
      switchEnterStatus: function switchEnterStatus() {
        this.enterStatus = !this.enterStatus;
        if (this.enterStatus) {
          this.evaluationMethod = '附件上传';
        } else {
          this.evaluationMethod = '手工录入';
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div>\n  <div class=\"eval-title\">您也可以<a @click=\"switchEnterStatus\" v-text=\"evaluationMethod\"></a>承租人资信评价</div>\n  <div v-show=\"enterStatus\">\n    <ifbp-template ref=\"lesseeCreditEvaluationRef\"\n                tplId=\"lesseeCreditEvaluation\"\n                :funnode=\"Funnode\"\n                :nexuskey=\"NexusKey\"\n                :tplData=\"lesseeCreditEvaluationData\"\n                @form-confirm-click=\"Confirm\"\n                @form-cancel-click=\"Cancel\"\n                show-type=\"form\"\n                >\n    </ifbp-template>\n    <div class=\"form-button-div\">\n        <el-button type=\"default\" class=\"button-no-radius\" @click=\"enterCancl\">取消</el-button>\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"enterSave\">保存</el-button>\n    </div>\n  </div>\n  <div v-show=\"!enterStatus\">\n    <el-upload\n      class=\"upload-demo\"\n      drag\n      action=\"\"\n      multiple\n      auto-upload=\"false\"\n      show-file-list=\"true\"\n      :file-list=\"fileList\">\n      <i class=\"el-icon-upload\"></i>\n      <div class=\"el-upload__text\">将文件拖到此处，或<em>点击上传</em></div>\n      <div class=\"el-upload__tip\" slot=\"tip\">文件大小不超过10M</div>\n    </el-upload>\n    <div class=\"form-button-div\">\n        <el-button type=\"primary\" class=\"button-no-radius\" @click=\"annexUpload\">上传</el-button>\n    </div>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/customer/apply-customerlist.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)()], //分页方法引入  
      data: function data() {
          return {
              //多选按钮选择
              // checkList:[],
              //模版主键
              funnode: "BT008",
              nexuskey: "custmor-apply",
              // 当前点击的行
              currentRow: null,
              customerListData: {},
              // 高级搜索
              searchTemplateCode: 'YLSCXMB_BUSI_APPLY',
              searchParameters: '{}',
              //快捷查询输入值
              title: '',
              customertype: '',
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = this.getNodeById($node, "efrb43qabsh");
                  //定义操作
                  var operateArr = [{
                      title: "发起申请",
                      icon: "pt-shenpi"
                  }];
                  //获取操作按钮html片段
                  var operateHtml = this.getTableOperateHtml(operateArr);
                  $table.append(operateHtml);
                  return $node[0].outerHTML;
              }
          };
      },
      mounted: function mounted() {
          this.request();
          this.loadData();
      },
  
      methods: {
          handleSearch: function handleSearch(searchTemplate) {
              this.searchParameters = JSON.stringify(searchTemplate);
              this.request();
          },
  
          // 添加按钮
          addCustomerInfo: function addCustomerInfo() {
              location.hash = "/cust/customer/add/";
          },
  
          // 加载数据方法
          loadData: function loadData() {
              // 判断brandMsg
              if (this.brandMsg == 'add') {
                  this.title = "基于客户放款进展表";
              } else {
                  this.title = "基于客户放款进展表";
                  this.pk_brand = this.brandMsg;
              }
          },
  
          //编辑按钮
          tableApplyClick: function tableApplyClick(scope) {
              var _this = this;
  
              var pk_customer = scope.row.pk_cust_customer;
              var customer_type = scope.row.customer_type;
              if ("CORP" == customer_type) {
                  //企业
                  var promise = this.applyConfirm(pk_customer, customer_type);
                  promise.then(function (res) {
                      var pk_application = res.data.data.pk_application;
                      _this.$emit('change-cust-list', ["CORP", pk_customer, pk_application]);
                  });
              } else if ("person" == customer_type || "PERSON" == customer_type) {
                  //自然人
                  var promise = this.applyConfirm(pk_customer, customer_type);
                  promise.then(function (res) {
                      var pk_application = res.data.data.pk_application;
                      _this.$emit('change-cust-list', ["person", pk_customer, pk_application]);
                  });
              } else {
                  this.$message({
                      message: "操作失败！",
                      type: "error"
                  });
              }
          },
          //选择条数改变
          handleSelectionChange: function handleSelectionChange(selection) {
              this.$message("选中条数为:" + selection.length);
              // var $table = this.$refs["customerapply-table"] && this.$refs["customerapply-table"].comp 
              //             ? this.$refs["customerapply-table"].comp.$refs['customerapply-table']
              //             : null;
              // if($table && this.currentRow) {
              //     this.currentRow = null;
              //     $table.clearSelection();
              //     debugger;
              //     $table.setCurrentRow(this.currentRow);
              // }
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
                          'custCondList': [{ key: "cusotmer_class", oper: " LIKE ", value: "%yls_dev100000000ffn%" }],
                          'qtAggVO': this.searchParameters
                      }
                  }
              };
              debugger;
              this.$http({
                  url: _publicData.ylsBusi + 'prj/apply/pagecust',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  var originalValue = res.data.data.content;
                  _this2.$refs['customerapply-table'].setData('customer_t', JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
                  _this2.pageSize = res.data.data.pageSize; // 每页的条数
              })["catch"](function (e) {
                  _this2.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
  
  
          /**
           * 提交到申请表变为待申请 
          */
          applyConfirm: function applyConfirm(pk_customer, customer_type) {
              var _this3 = this;
  
              var url = '/yls-busi-web/prj/apply/createapply';
              var data = {
                  'issubmit': '0',
                  'pk_customer': pk_customer,
                  'customer_type': customer_type
              };
  
              var promise = new Promise(function (resolve, reject) {
                  _this3.$http({
                      url: url,
                      headers: { 'Content-Type': 'application/json' },
                      method: "post",
                      data: JSON.parse(JSON.stringify(data))
                  }).then(function (res) {
                      if (res.data.success === true) {
                          resolve(res);
                          _this3.$message({
                              message: "操作成功！",
                              type: "success"
                          });
                          _this3.inoutTypeFormEdit = false;
                      } else {
                          reject({});
                          _this3.$message({
                              message: res.data.message,
                              type: "error"
                          });
                      }
                  })["catch"](function (e) {
                      console.log(e);
                      reject({});
                      _this3.$message({
                          message: "操作失败",
                          type: "error"
                      });
                  });
              });
              return promise;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <!-- <div class=\"title-container\">\n    <h2 class=\"name\">客户信息</h2>\n  </div> -->\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <ifbp-search class='fr' :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n  </div>\n  \n  <!-- 客户列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!-- <div id='checkshow'>\n      <el-checkbox-group v-model=\"checkList\" @change=\"changeCkeckList\">\n      <el-checkbox label='只看自然人'></el-checkbox>\n      <el-checkbox label='只看企业'></el-checkbox>\n      </el-checkbox-group>\n   </div> -->\n    <!--模板组件-->\n   <ifbp-template ref=\"customerapply-table\"\n                  tplId=\"customerList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @pt-shenpi-table-click=\"tableApplyClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/custpledge/custpledge-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['pk_customer', 'source_bill', 'invisible'],
    data: function data() {
      var oThis = this;
      return {
        custpledgeDelVisible: false,
        rmoveindex: '',
        delId: '',
        aaa: '',
        bbb: '',
        funnode: 'BT008',
        nexusKey: 'custpledge',
        custpledgeData: {
          rules: {
            identity_no: [{ required: true, message: '证件号码不能为空!', trigger: 'blur' }],
            identity_type: [{ required: true, message: '证件类型不能为空!', trigger: 'change' }]
          },
          testOptionsVar: []
        },
        t_Methods: {
          querySearchAsync: function querySearchAsync(queryStr, callback) {
            if (queryStr != oThis.aaa && oThis.aaa != '') {
              this.$refs['CustPledge-form'].model.phone = '';
              oThis.aaa = '';
            }
            oThis.arr = [//及时查询处理的下拉arr
            { "value": "北京", "address": "11111" }, { "value": "北京月饼", "address": "22222" }, { "value": "麻辣烫", "address": "广州" }, { "value": "炸鸡", "address": "上海市" }];
            callback(oThis.arr);
          },
          handleSelect: function handleSelect(item) {
            oThis.aaa = item.value;
            this.$refs['CustPledge-form'].model.phone = item.address;
          }
        },
        //重写dom
        custpledgeResetFun: function custpledgeResetFun($node) {
          if (oThis.invisible) {
            return;
          }
          var $refNode = this.getNodeById($node, 'd6ivnfpjhb'); //获取担保人
          var $refNodeParent = $refNode.parent();
          $refNode.remove();
          $refNodeParent.append('<el-autocomplete v-model="CustPledge.pk_customer" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>');
          var $table = $node.find("el-table");
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
  
        custpledgeTplMethods: {
          // form的保存操作
        }
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      //请求方法
      request: function request() {
        if (this.source_bill != '') {
          this.requestCustpledge();
        }
      },
      closeAddForm: function closeAddForm() {
        this.$refs['custpledgeRef'].comp.formShow = false; //关闭添加表单事件
      },
  
      //请求保证担保信息
      requestCustpledge: function requestCustpledge() {
        var _this = this;
  
        var data = {
          pageNum: 0,
          pageSize: 10,
          searchParams: {
            searchMap: {
              custCondList: [{ key: "source_bill", oper: "=", value: this.source_bill }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/pledge/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['custpledgeRef'].setData('CustPledge_t', JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //保证担保情况保存
      custpledgeFormConfirm: function custpledgeFormConfirm(type) {
        var _this2 = this;
  
        this.$refs.custpledgeRef.validate(function (valid) {
          if (valid) {
            //获取当前数据
            var url = void 0;
            var data = _this2.$refs.custpledgeRef.comp.CustPledge;
            if (data.pk_prj_cust_pledge) {
              url = _publicData.ylsBusi + 'prj/pledge/update';
            } else {
              url = _publicData.ylsBusi + 'prj/pledge/create';
            }
            data.source_bill = _this2.source_bill;
            _this2.$http({
              url: url, //添加接口或修改接口
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                _this2.originalValue = res.data.data;
                console.log(res.data.data);
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.custpledgeRef.getData('CustPledge_t');
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (_this2.rmoveindex !== '') {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                //给对象赋值
                _this2.$refs.custpledgeRef.setData('CustPledge_t', JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs['custpledgeRef'].comp.formShow = false;
                _this2.$emit("closeAddForm"); //触发父组件事件 让父组件关闭其他子组件添加表单
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
            _this2.$message('校验未通过');
          }
        }, type);
      },
  
      // 保证担保信息form的取消操作
      custpledgeFormCancel: function custpledgeFormCancel(type) {
        if (type === 'form') {
          this.$refs['custpledgeRef'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['custpledgeRef'].getTableComp().closeExpandRow();
          //填充备份值
          var CustplTable = this.$refs['custpledgeRef'].getData('CustPledge_t');
          CustplTable[this.baseEditIndex] = this.baseData;
          this.$refs['custpledgeRef'].setData('CustPledge_t', CustplTable);
        }
      },
  
      //担保编辑
      custpledgeEditTableRow: function custpledgeEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['custpledgeRef'].getTableComp().expandRow(row);
        this.$refs['custpledgeRef'].comp.formShow = false;
        //custpledgeRef为表单数据对象参数
        this.$refs['custpledgeRef'].setData('CustPledge', row);
        this.aaa = this.$refs['custpledgeRef'].getFormData().pk_customer;
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      //担保信息删除提示
      custpledgeDeleteTableRow: function custpledgeDeleteTableRow(scope) {
        this.custpledgeDelVisible = true;
        this.delId = scope.row.pk_prj_cust_pledge;
      },
  
      //担保信息删除
      custpledgeDeleteClick: function custpledgeDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/pledge/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestCustpledge();
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
        this.custpledgeDelVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"custpledgeRef\"\n                      tplId=\"custpledgeTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexusKey\"\n                      :tplData=\"custpledgeData\"\n                      :tplResetFun=\"custpledgeResetFun\"\n                      :tplMethods=\"custpledgeTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"custpledgeFormConfirm\"\n                      @form-cancel-click=\"custpledgeFormCancel\"\n                      @edit-table-click=\"custpledgeEditTableRow\"\n                      @delete-table-click=\"custpledgeDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 担保信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custpledgeDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custpledgeDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custpledgeDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/custpledge/mortgage-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['pk_customer', 'source_bill', 'invisible'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        mortgageDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT008',
        nexusKey: 'mortgage_busi_apply',
        mortgageData: {},
        mortgageResetFun: function mortgageResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          var $table = $node.find("el-table");
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
        mortgageTplMethods: {
          // form的保存操作
        }
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      //请求方法
      request: function request() {
        if (this.source_bill != '') {
          this.requestMortgage();
        }
      },
      closeAddForm: function closeAddForm() {
        this.$refs['mortgageRef'].comp.formShow = false;
      },
  
      //请求抵押担保信息
      requestMortgage: function requestMortgage() {
        var _this = this;
  
        var data = {
          pageNum: 0,
          pageSize: 10,
          searchParams: {
            searchMap: {
              custCondList: [{ key: 'source_bill', oper: '=', value: this.source_bill }, { key: 'guarantee_type', oper: '=', value: 'COLLATERAL' }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/mp/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['mortgageRef'].setData('Mortgage_t', JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //抵押担保情况保存
      mortgageFormConfirm: function mortgageFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = void 0;
        var data = this.$refs.mortgageRef.comp.Mortgage;
        if (data.pk_mortgage_pledge) {
          url = _publicData.ylsBusi + 'prj/mp/update';
        } else {
          url = _publicData.ylsBusi + 'prj/mp/create';
        }
        data.source_bill = this.source_bill;
        data.guarantee_type = 'COLLATERAL'; //添加抵押担保区分字段（抵押质押在一个表）
        this.$http({
          url: url, //添加接口或修改接口
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: '保存成功！',
              type: 'success'
            });
            _this2.originalValue = res.data.data;
            //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
            var linarraydata = _this2.$refs.mortgageRef.getData('Mortgage_t');
            /**@augments 移除位置 
             * @augments 移除个数
             * @augments 用新的对象替换（不传值则删除）
             */
  
            if (_this2.rmoveindex !== '') {
              linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
            } else {
              //加入数组开始
              linarraydata.unshift(_this2.originalValue);
            }
            //加入数组结尾
            // linarraydata.push(this.originalValue);
            //给对象赋值
            _this2.$refs.mortgageRef.setData('Mortgage_t', JSON.parse(JSON.stringify(linarraydata)));
            //隐藏详情列表
            _this2.$refs['mortgageRef'].comp.formShow = false;
            _this2.$emit("closeAddForm");
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
      },
  
      // 抵押担保信息form的取消操作
      mortgageFormCancel: function mortgageFormCancel(type) {
        if (type === 'form') {
          this.$refs['mortgageRef'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['mortgageRef'].getTableComp().closeExpandRow();
        }
      },
      //抵押担保编辑
      mortgageEditTableRow: function mortgageEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['mortgageRef'].getTableComp().expandRow(row);
        this.$refs['mortgageRef'].formShow = false;
        //mortgageRef为表单数据对象参数
        this.$refs['mortgageRef'].setData('Mortgage', row);
      },
      //抵押担保信息删除提示
      mortgageDeleteTableRow: function mortgageDeleteTableRow(scope) {
        this.mortgageDelVisible = true;
        this.delId = scope.row.pk_mortgage_pledge;
      },
      //抵押担保信息删除
      mortgageDeleteClick: function mortgageDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/mp/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestMortgage();
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
        this.mortgageDelVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"mortgageRef\"\n                      tplId=\"mortgageTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexusKey\"\n                      :tplData=\"mortgageData\"\n                      :tplResetFun=\"mortgageResetFun\"\n                      :tplMethods=\"mortgageTplMethods\"\n                      @form-confirm-click=\"mortgageFormConfirm\"\n                      @form-cancel-click=\"mortgageFormCancel\"\n                      @edit-table-click=\"mortgageEditTableRow\"\n                      @delete-table-click=\"mortgageDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 抵押担保信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"mortgageDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"mortgageDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"mortgageDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/custpledge/pledge-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['pk_customer', 'source_bill', 'invisible'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        pledgeDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT008',
        nexusKey: 'pledge_busi_apply',
        pledgeData: {},
        pledgeResetFun: function pledgeResetFun($node) {
          if (oThis.invisible) {
            return;
          }
  
          var $table = $node.find("el-table");
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
        pledgeTplMethods: {
          // form的保存操作
        }
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      //请求方法
      request: function request() {
        if (this.source_bill != '') {
          this.requestPledge();
        }
      },
      closeAddForm: function closeAddForm() {
        this.$refs['pledgeRef'].comp.formShow = false;
      },
  
      //请求质押担保信息
      requestPledge: function requestPledge() {
        var _this = this;
  
        var data = {
          pageNum: 0,
          pageSize: 10,
          searchParams: {
            searchMap: {
              //source_bill: this.source_bill,
              // guarantee_type:'PRENDA',
              custCondList: [{ key: 'source_bill', oper: '=', value: this.source_bill }, { key: 'guarantee_type', oper: '=', value: 'PRENDA' }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/mp/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['pledgeRef'].setData('Pledge_t', JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //质押担保情况保存
      pledgeFormConfirm: function pledgeFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = void 0;
        var data = this.$refs.pledgeRef.comp.Pledge;
        if (data.pk_mortgage_pledge) {
          url = _publicData.ylsBusi + 'prj/mp/update';
        } else {
          url = _publicData.ylsBusi + 'prj/mp/create';
        }
        data.source_bill = this.source_bill;
        data.guarantee_type = 'PRENDA';
        this.$http({
          url: url, //添加接口或修改接口
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
  
            _this2.$message({
              message: '保存成功！',
              type: 'success'
            });
            _this2.originalValue = res.data.data;
            //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
            var linarraydata = _this2.$refs.pledgeRef.getData('Pledge_t');
            /**@augments 移除位置 
             * @augments 移除个数
             * @augments 用新的对象替换（不传值则删除）
             */
  
            if (_this2.rmoveindex !== '') {
              linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
            } else {
              //加入数组开始
              linarraydata.unshift(_this2.originalValue);
            }
            //加入数组结尾
            // linarraydata.push(this.originalValue);
            //给对象赋值
            _this2.$refs.pledgeRef.setData('Pledge_t', JSON.parse(JSON.stringify(linarraydata)));
            //隐藏详情列表
            _this2.$refs['pledgeRef'].comp.formShow = false;
            _this2.$emit("closeAddForm");
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
      },
  
      // 质押担保信息form的取消操作
      pledgeFormCancel: function pledgeFormCancel(type) {
        if (type === 'form') {
          this.$refs['pledgeRef'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['pledgeRef'].getTableComp().closeExpandRow();
        }
      },
      //质押担保编辑
      pledgeEditTableRow: function pledgeEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['pledgeRef'].getTableComp().expandRow(row);
        this.$refs['pledgeRef'].formShow = false;
        //pledgeRef为表单数据对象参数
        this.$refs['pledgeRef'].setData('Pledge', row);
      },
      //质押担保信息删除提示
      pledgeDeleteTableRow: function pledgeDeleteTableRow(scope) {
        this.pledgeDelVisible = true;
        this.delId = scope.row.pk_mortgage_pledge;
      },
      //质押担保信息删除
      pledgeDeleteClick: function pledgeDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/mp/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestPledge();
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
        this.pledgeDelVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"pledgeRef\"\n                      tplId=\"pledgeTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexusKey\"\n                      :tplData=\"pledgeData\"\n                      :tplResetFun=\"pledgeResetFun\"\n                      :tplMethods=\"pledgeTplMethods\"\n                      @form-confirm-click=\"pledgeFormConfirm\"\n                      @form-cancel-click=\"pledgeFormCancel\"\n                      @edit-table-click=\"pledgeEditTableRow\"\n                      @delete-table-click=\"pledgeDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 质押担保信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"pledgeDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"pledgeDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"pledgeDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/insuranceinfo/insurance-detail.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../detail-mock.js";
  // import ElTemplate from "../../../template.vue";
  // import ifbpPanelGroup from "../../../ifbp-panel-group.vue";
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate,
    //   "ifbp-panel-group": ifbpPanelGroup
    // },
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        pk_insurance: '',
        linkmanDelVisible: false,
        custbankDelVisible: false,
        custCountryTaxesDelVisible: false,
  
        //customer
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.insuranceEdit = !oThis.insuranceEdit;
          }
        }],
        insurancePk: "c3baaa5d-eb66-4e15-97a5-8d4bbd9ae766",
        insuranceData: {
          customer: {},
          rules: {
            name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
            pk_custclass: [{ required: true, message: "客户基本分类不能为空", trigger: "blur" }]
          }
        },
        insuranceEdit: false,
  
        // bank
        bankIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custbankRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custbankPk: "000111100000001Z8DZS",
        custbankData: {
          params: {
            pk_banktype: ""
          },
          rules: {
            accnum: [{ required: true, message: "账号不能为空", trigger: "blur" }],
            accname: [{ required: true, message: "户名不能为空", trigger: "blur" }],
            pk_bankdoc: [{ required: true, message: "开户银行不能为空", trigger: "blur" }],
            pk_banktype: [{ required: true, message: "银行类型不能为空", trigger: "blur" }],
            accountproperty: [{ required: true, message: "账户性质不能为空", trigger: "blur" }]
          }
        },
        custbankTplMethods: {
          // form的保存操作
          custbankFormConfirm: function custbankFormConfirm() {
            var _this = this;
  
            this.$refs['bankaccount_form'].validate(function (valid) {
              if (valid) {
                var data = _this.bankaccount;
              }
              console.log(data);
            });
          },
          // form的取消操作
          custbankFormCancel: function custbankFormCancel() {
            this.$refs['bankaccount_table'].closeExpandRow();
            this.formShow = false;
          },
          custbankEditTableRow: function custbankEditTableRow(scope) {
            var row = scope.row;
            this.$refs['bankaccount_table'].expandRow(row);
            this.bankaccount = row;
            this.formShow = false;
          },
          custbankDeleteTableRow: function custbankDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pageComp.custbankDel = scope.row;
            //            this.pk_custbank = scope.row.pk_custbank;
          },
          enableTableRow: function enableTableRow(scope) {
            alert("enable");
            console.log("enable", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pk_custbank = scope.row.pk_custbank;
          }
        },
        custbankResetFun: function custbankResetFun($node) {
          var $table = this.getNodeBy_Id($node, "b327bj95th6");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custbankEditTableRow",
            icon: "edit"
          }, {
            title: "启用",
            click: "enableTableRow",
            icon: "pt-tuichu"
          }, {
            title: "删除",
            click: "custbankDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $accnum = this.getNodeBy_Id($node, "krvqs7xlxfs"); //账号 
          var $accname = this.getNodeBy_Id($node, "83oyd6v35wm"); //户名
          var $pkBankdoc = this.getNodeBy_Id($node, "r69m5jd8zul"); //开户银行
          var $pkBanktype = this.getNodeBy_Id($node, "bo4dg59b0v"); //银行类别
          var $contactpsn = this.getNodeBy_Id($node, "vpthxzig1da"); //联系人
          var $tel = this.getNodeBy_Id($node, "k3bvpmgm9m"); //联系电话
  
          $accnum.html('<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>');
          $accname.html('<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>');
          $pkBankdoc.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." + 'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>');
          $pkBanktype.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." + 'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>');
  
          $contactpsn.html('<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>');
          $tel.html('<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>');
          return $node[0].outerHTML;
        },
  
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs['linkman_table'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }],
        custlinkmanPk: "34cc4979-181e-44dc-9cd7-79ab1b51738d", //linkman
        custlinkmanData: {
          rules: {
            name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = this.getNodeBy_Id($node, "zxhlnr94qvd");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custlinkmanEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custlinkmanDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $sex = this.getNodeBy_Id($node, "ir66pzdxiic"); //性别
          var $isdefault = this.getNodeBy_Id($node, "h81qk6u00p5"); //是否默认
          $sex.html('<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>');
          $isdefault.html('<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>');
          return $node[0].outerHTML;
        },
        custlinkmanTplMethods: {
          // form的保存操作
          linkmanFormConfirm: function linkmanFormConfirm() {
            var _this2 = this;
  
            this.$refs['linkman_form'].validate(function (valid) {
              if (valid) {
                var data = _this2.linkman;
              }
              console.log(data);
            });
          },
          // form的取消操作
          linkmanFormCancel: function linkmanFormCancel() {
            this.$refs['linkman_table'].closeExpandRow();
            this.formShow = false;
          },
          // table行的编辑操作
          custlinkmanEditTableRow: function custlinkmanEditTableRow(scope) {
            var row = scope.row;
            this.$refs['linkman_table'].expandRow(row);
            this.linkman = row;
            this.formShow = false;
          },
          // table行的删除操作
          custlinkmanDeleteTableRow: function custlinkmanDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.linkmanDel = scope.row;
            this.pageComp.linkmanDelVisible = true;
            this.pageComp.pk_linkman = scope.row.pk_linkman;
          }
        },
  
        // 税类信息
        countryTaxesIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custCountryTaxesPk: "7a7287cf-0833-4009-8cc5-c18cf0e2c4ce", //custaxes
        custCountryTaxesData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        custCountryTaxesResetFun: function custCountryTaxesResetFun($node) {
          var $table = this.getNodeBy_Id($node, "xnl0066wpf9");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custCountryTaxesEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custCountryTaxesDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
  
          $table.append(operateHtml);
  
          var $pkCountry = this.getNodeBy_Id($node, "u5itmgcx7c");
          var $pkTaxes = this.getNodeBy_Id($node, "1idpzwci9up");
          $pkCountry.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_country_ref?" + 'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' + "</div></template>");
  
          $pkTaxes.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_taxes_ref?" + 'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' + "</div></template>");
  
          return $node[0].outerHTML;
        },
        custCountryTaxesTplMethods: {
          // form的保存操作
          custCountryFormConfirm: function custCountryFormConfirm() {
            var data = this.custaxes;
            console.log(data);
          },
          // form的取消操作
          custCountryFormCancel: function custCountryFormCancel() {
            this.$refs['custaxes_table'].closeExpandRow();
            this.formShow = false;
          },
          custCountryTaxesEditTableRow: function custCountryTaxesEditTableRow(scope) {
            var row = scope.row;
            this.$refs['custaxes_table'].expandRow(row);
            this.custaxes = row;
            this.formShow = false;
          },
          custCountryTaxesDeleteTableRow: function custCountryTaxesDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custCountryTaxesDelVisible = true;
            this.pageComp.custtaxtypesDel = scope.row;
          }
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   单个地点详情
         **/
      request: function request() {
        this.pk_insurance = this.$root.$router.currentRoute.params.id;
        //请求客户基本信息详情
        if (this.pk_insurance) {
          debugger;
          this.requestCustBaseInfo();
        }
        //        //客户银行账户列表
        this.requestCustBank();
        //        客户联系人联系人列表
        this.requestCustlinkman();
        //客户税务类别列表
        this.requestCustCountryTaxes();
      },
  
      //请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this3 = this;
  
        this.$http({
          url: "/yls-busi-web/ins/getbyid",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_insurance
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(_this3.$refs.baseTemplateRef);
            _this3.$refs.baseTemplateRef.setData("ProjectInsure", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this3.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户银行账户
      requestCustBank: function requestCustBank() {
        var _this4 = this;
  
        this.$http({
          url: "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var custbankOriginal = res.data.data;
            _this4.$refs.custbankRef.setData("bankaccount", JSON.parse(JSON.stringify(custbankOriginal)));
            _this4.$nextTick(function () {
              _this4.$refs.custbankRef.setData("tableShow", false);
            });
          } else {
            _this4.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this4.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this5 = this;
  
        this.$http({
          url: "/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            console.log(_this5.$refs.custlinkmanRef);
            //             this.custlinkmanData = {
            //               linkman_t :  JSON.parse(JSON.stringify(this.originalValue))
            //             };
            _this5.$refs.custlinkmanRef.setData("linkman_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this5.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this5.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户国家税类
      requestCustCountryTaxes: function requestCustCountryTaxes() {
        var _this6 = this;
  
        this.$http({
          url: "/uapbd/custcountrytaxes/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            //            this.custCountryTaxesData = {
            //              custaxes_t :  JSON.parse(JSON.stringify(this.originalValue))
            //            };
            _this6.$refs.custCountryTaxesRef.setData("custaxes_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this6.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this6.$message({
            message: "客户国家税类信息获取失败",
            type: "error"
          });
        });
      },
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this7 = this;
  
        var delData = {};
        delData.linkman = this.linkmanDel;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custlinkman/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this7.$message({
              message: res.data.msg,
              type: "success"
            });
            _this7.linkmanDelVisible = false;
            _this7.requestCustlinkman();
          } else {
            _this7.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this7.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custbankDeleteClick: function custbankDeleteClick() {
        var _this8 = this;
  
        var delData = this.custbankDel;
        var ts = this.$refs.baseTemplateRef.comp.customer.ts;
        delData.ts = ts;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custbank/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this8.$message({
              message: res.data.msg,
              type: "success"
            });
            _this8.custbankDelVisible = false;
            _this8.requestCustBank();
          } else {
            _this8.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this8.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custCountryTaxesDeleteClick: function custCountryTaxesDeleteClick() {
        var _this9 = this;
  
        this.custtaxtypesDel.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custcountrytaxes/delete",
          method: "post",
          data: this.custtaxtypesDel
        }).then(function (res) {
          if (res.data.status === true) {
            _this9.$message({
              message: res.data.msg,
              type: "success"
            });
            _this9.custCountryTaxesDelVisible = false;
            _this9.requestCustCountryTaxes();
          } else {
            _this9.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this9.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.insuranceEdit = false;
        // 重置value
      },
      customerConfirm: function customerConfirm() {
        var _this10 = this;
  
        var url;
        var data = this.$refs.baseTemplateRef.comp.ProjectInsure;
        var baseUrl = '/yls-busi-web/';
        if (this.pk_insurance) {
          url = baseUrl + 'ins/update';
        } else {
          url = baseUrl + 'ins/create';
        }
        this.$refs.baseTemplateRef.comp.$refs["projectInsure-form"].validate(function (valid) {
          if (valid) {
            _this10.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.status === true) {
                _this10.$message({
                  message: res.data.msg,
                  type: "success"
                });
                _this10.originalValue = res.data.data;
                console.log(_this10.$refs.baseTemplateRef);
                _this10.$refs.baseTemplateRef.setData("ProjectInsure", JSON.parse(JSON.stringify(_this10.originalValue)));
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                _this10.insuranceEdit = false;
              } else {
                _this10.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this10.$message({
                message: "地点更新失败",
                type: "error"
              });
            });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">保险信息设置</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <ifbp-panel id=\"basePanel\" title=\"基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"insurancePk\"\n                  show-type=\"form\"\n                  :tplData=\"insuranceData\"\n                  :editable=\"insuranceEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"insuranceEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <ifbp-panel id=\"bankPanel\" title=\"银行账户信息\" :icons=\"bankIcons\">\n        <ifbp-template ref=\"custbankRef\"\n                      tplId=\"bankTemplate\"\n                      :pkTemp=\"custbankPk\"\n                      :tplData=\"custbankData\"\n                      :tplResetFun=\"custbankResetFun\"\n                      :tplMethods=\"custbankTplMethods\"\n                      form-confirm-fun=\"custbankFormConfirm\"\n                      form-cancel-fun=\"custbankFormCancel\"\n                      show-type=\"table-form\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <ifbp-template ref=\"custlinkmanRef\"\n                      tplId=\"linkmanTemplate\"\n                      :pkTemp=\"custlinkmanPk\"\n                      :tplData=\"custlinkmanData\"\n                      :tplResetFun=\"linkmanResetFun\"\n                      :tplMethods=\"custlinkmanTplMethods\"\n                      form-confirm-fun=\"linkmanFormConfirm\"\n                      form-cancel-fun=\"linkmanFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"countryTaxesPanel\" title=\"税类信息\" :icons=\"countryTaxesIcons\">\n        <ifbp-template ref=\"custCountryTaxesRef\"\n                      tplId=\"countryTaxesTemplate\"\n                      :pkTemp=\"custCountryTaxesPk\"\n                      :tplData=\"custCountryTaxesData\"\n                      :tplResetFun=\"custCountryTaxesResetFun\"\n                      :tplMethods=\"custCountryTaxesTplMethods\"\n                      form-confirm-fun=\"custCountryFormConfirm\"\n                      form-cancel-fun=\"custCountryFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custbankDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custbankDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custbankDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"linkmanDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"linkmanDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n\n  <!-- 客户国家税类 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custCountryTaxesDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custCountryTaxesDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custCountryTaxesDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/insuranceinfo/insurance-info.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../info-mock.js";
  // // import ElTemplate from "../../../template.vue";
  // import testSearchTemplate from './testSearchTemplate.json';
  
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate
    // },
    data: function data() {
      var oThis = this;
      return {
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
        insurancePk: "c3baaa5d-eb66-4e15-97a5-8d4bbd9ae766",
        showDeleteButton: false,
        search_input: "",
        isHide: true,
        totalElements: 0,
        currentPage: 1,
        size: 10,
        delDialogVisible: false,
        multiDelDialogVisible: false,
  
        insuranceTableData: {},
        projectTableMethods: {},
        insuranceTableResetFun: function insuranceTableResetFun($node) {
          debugger;
          var $table = this.getNodeById($node, "9pays5f5vod");
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
  
        // 待删除 begin
        code: "",
        name: "",
        ts: "",
        mobile: "",
        enablestate: "",
        search_options: [{
          label: "全部",
          value: ""
        }, {
          label: "未启用",
          value: 1
        }, {
          label: "已启用",
          value: 2
        }, {
          label: "已停用",
          value: 3
        }]
        // 待删除 end
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
    methods: {
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/insurance/detail/" + scope.row.pk_prj_insure;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        debugger;
        this.delDialogVisible = true;
        this.delId = scope.row.pk_prj_insure;
      },
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      searchInputEnterClick: function searchInputEnterClick() {
        alert(this.search_input);
      },
      request: function request(n, s) {
        var _this = this;
  
        var url;
        // var search =
        //   "&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
        // if (n === undefined) {
        //   url = "/uapbd/custbaseinfo/pageList?pn=1&ps=10&sortColumn=" + search;
        // } else {
        //   url = "/uapbd/custbaseinfo/pageList?pn=" + n + "&ps=" + s + search;
        // }
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'ins/pagelist';
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "pk_prj_insure"
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
          _this.originalValue = res.data.data.content;
          _this.$refs["template-table"].setData("ProjectInsure_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      handleSizeChange: function handleSizeChange(val) {
        this.size = val;
        var maxPage = parseInt(this.totalElements / val) + 1;
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentPage = val;
        this.request(this.currentPage - 1, this.size);
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
        this.searchTemplate = testSearchTemplate;
        this.conditionList = testSearchTemplate.conditionList;
      },
  
      // 设置选中
      selectConditionOption: function selectConditionOption(optionList, option, ctrltype) {
        // console.log(arguments);
        var optionSelected = false;
        var options = optionList.options;
        if (option && option.selected) {
          optionSelected = true;
        }
        if (ctrltype === 'DateComponent') {
          if (!optionList.def_min_value && !optionList.def_max_value && !option) {
            // 修复 el-date-picker 置空时引起的bug
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
        // 改到 el-date-picker@change 时修改
        // if (startDay) {
        //   startDay = this.formatDate(startDay);
        // }
        // if (endDay) {
        //   endDay = this.formatDate(endDay);
        // }
        if (startDay && endDay) {
          dateString = startDay + ' 至 ' + endDay;
        } else if (startDay) {
          dateString = startDay + '之后';
        } else {
          dateString = endDay + '之前';
        }
        return dateString;
      },
  
  
      // 已选中数值格式整理
      formatSelectedNumber: function formatSelectedNumber(min, max) {
        if (min && max) {
          return min + '-' + max + '万元';
        } else if (min) {
          return min + '万元及以上';
        } else {
          return '低于' + max + '万元';
        }
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
      },
  
      // 跳转到添加地点页面
      updataInsuranceInfo: function updataInsuranceInfo() {
        location.hash = "/insurance/add";
      },
      multiDeleteDialgShow: function multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
  
  
      /**
         *  启用状态修改
         *
         * */
      stateTableRow: function stateTableRow(row) {
        var _this2 = this;
  
        // 操作列增加启用按钮
        this.$http({
          url: "/uapbd/addressdoc/enable/" + row.pk_customer,
          method: "post"
        }).then(function (res) {
          if (res.data.status === true) {
            _this2.$message({
              message: res.data.msg,
              type: "success"
            });
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        debugger;
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'ins/deletebyid';
        var delId = this.delId;
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: delId
        }).then(function (res) {
          if (res.data.status === true) {
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
        })["catch"](function () {
          _this3.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      multiDeleteClick: function multiDeleteClick() {
        var tableSelections = this.$refs["template-table"].comp.$refs["customer_table"].getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_customer;
            delIds.push(id);
          }
        }
        console.log("multi" + delIds);
        return;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">保险-全局</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"updataInsuranceInfo\">新增</el-button>\n      <el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请选择编码/客户\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- <el-row type=\"flex\" justify=\"end\">\n    <el-col :span=\"2\">\n      <el-button @click=\"search\">搜索</el-button>\n    </el-col>\n  </el-row> -->\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag v-if=\"condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\"\n      >\n        {{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n\n  <!-- 搜索参数 -->\n  <template>\n\n    <!-- 前三条平铺条件 -->\n    <el-row\n      :gutter=\"10\"\n      v-for=\"(condition, index) in conditionList\"\n      :key=\"condition.fieldcode\"\n      v-if=\"index < 3\">\n      <!-- 条件名 -->\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">{{condition.fieldname}}:</span>\n      </el-col>\n      <!-- 条件选项 -->\n      <el-col class=\"condition-options\" :span=\"22\" :sm=\"21\" :xs=\"21\">\n\n        <!-- 通用选项 -->\n        <template v-if=\"condition.optionList.options.length\">\n          <span\n            v-for=\"option in condition.optionList.options\"\n            :key=\"option.value\"\n            class=\"condition-option\"\n            :class=\"{selected: option.selected}\"\n            @click=\"selectConditionOption(condition.optionList, option, condition.ctrltype)\"\n          >{{option.name}}</span>\n        </template>\n\n        <!-- 数值字段 -->\n        <template v-if=\"condition.ctrltype === 'NumberComponent'\">\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_min_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最小值\">\n            </el-input>\n          </div>\n            -\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最大值\">\n            </el-input>\n          </div>\n        </template>\n\n        <!-- 日期字段 -->\n        <template v-else-if=\"condition.ctrltype === 'DateComponent'\">\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_min_value\"\n              format=\"yyyy-MM-dd HH:mm:ss\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n            -\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n        </template>\n      </el-col>\n    </el-row>\n\n    <!-- 高级条件 -->\n    <el-row :gutter=\"10\">\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">高级:</span>\n      </el-col>\n      <!-- 条件名 -->\n      <el-col class=\"advanced-conditions\" :span=\"18\" :sm=\"13\" :xs=\"13\">\n        <span v-for=\"(condition, index) in conditionList\"\n          v-if=\"index >= 3\"\n          class=\"advanced-condition\"\n          :class=\"{current: currentConditionCode === condition.fieldcode}\"\n          :key=\"condition.fieldcode\"\n          @click=\"setCurrentCondition(condition)\">\n          {{condition.fieldname}}\n          <i class=\"el-icon-arrow-up\" v-if=\"currentConditionCode === condition.fieldcode\"></i>\n          <i class=\"el-icon-arrow-down\" v-else></i>\n        </span>\n      </el-col>\n\n      <!-- 按钮 -->\n      <el-col class=\"advanced-search-btns\" :span=\"4\" :sm=\"8\" :xs=\"8\">\n        <el-button type=\"primary\" class=\"button-no-radius\">搜索</el-button>\n        <el-button class=\"button-no-radius\">清空</el-button>\n      </el-col>\n    </el-row>\n  </template>\n\n  <!-- 当前选中的条件选项 -->\n  <div class=\"current-condition-options\" v-if=\"currentCondition\">\n\n    <!-- 通用选项 -->\n    <template v-if=\"currentCondition.optionList.options.length\">\n      <span\n        v-for=\"option in currentCondition.optionList.options\"\n        :key=\"option.value\"\n        class=\"condition-option\"\n        :class=\"{selected: option.selected}\"\n        @click=\"selectConditionOption(currentCondition.optionList, option, currentCondition.ctrltype)\"\n      >{{option.name}}</span>\n    </template>\n\n    <!-- 数值字段 -->\n    <template v-if=\"currentCondition.ctrltype === 'NumberComponent'\">\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_min_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最小值\">\n        </el-input>\n      </div>\n        -\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最大值\">\n        </el-input>\n      </div>\n    </template>\n\n    <!-- 日期字段 -->\n    <template v-else-if=\"currentCondition.ctrltype === 'DateComponent'\">\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_min_value\"\n          format=\"yyyy-MM-dd HH:mm:ss\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n        -\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n    </template>\n  </div>\n</div>\n\n  <!-- 主体区域 -->\n  <div class=\"list-main-container clearfix\">\n    <!--新模板组件:tplCode=\"tplCode\"-->\n    <ifbp-template ref=\"template-table\"\n                  tplId=\"insurance-table-template\"\n                  :pkTemp=\"insurancePk\"\n                  :tplData=\"insuranceTableData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"insuranceTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      :current-page=\"currentPage\"\n      :page-sizes=\"[10, 20, 30, 40]\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalElements\">\n    </el-pagination>\n  </div>\n  \n  <!--删除确认Dialog-->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"multiDelDialogVisible\"\n    @update:visible=\"val => multiDelDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除所选数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"multiDelDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"multiDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!--数据加载过程中页面最上端显示的层-->\n  <!-- <div id=\"cover\" ref=\"cover\">\n    <div class=\"el-loading-spinner\">\n      <svg viewBox=\"25 25 50 50\" class=\"circular\">\n        <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" class=\"path\"></circle>\n      </svg>\n    </div>\n  </div> -->\n</div>\n"
  

});
 
 define('yls^busi/project/src/linkman/linkman-detail.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../detail-mock.js";
  // import ElTemplate from "../../../template.vue";
  // import ifbpPanelGroup from "../../../ifbp-panel-group.vue";
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate,
    //   "ifbp-panel-group": ifbpPanelGroup
    // },
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        pk_customer: '',
        linkmanDelVisible: false,
        custbankDelVisible: false,
        custCountryTaxesDelVisible: false,
  
        //customer
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.linkmanEdit = !oThis.linkmanEdit;
          }
        }],
        linkmanPk: "ae2a3637-ec64-4cb6-baf1-3fc6e3aa4691",
        linkmanData: {
          customer: {},
          rules: {
            name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
            pk_custclass: [{ required: true, message: "客户基本分类不能为空", trigger: "blur" }]
          }
        },
        linkmanEdit: false,
  
        // bank
        bankIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custbankRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custbankPk: "000111100000001Z8DZS",
        custbankData: {
          params: {
            pk_banktype: ""
          },
          rules: {
            accnum: [{ required: true, message: "账号不能为空", trigger: "blur" }],
            accname: [{ required: true, message: "户名不能为空", trigger: "blur" }],
            pk_bankdoc: [{ required: true, message: "开户银行不能为空", trigger: "blur" }],
            pk_banktype: [{ required: true, message: "银行类型不能为空", trigger: "blur" }],
            accountproperty: [{ required: true, message: "账户性质不能为空", trigger: "blur" }]
          }
        },
        custbankTplMethods: {
          // form的保存操作
          custbankFormConfirm: function custbankFormConfirm() {
            var _this = this;
  
            this.$refs['bankaccount_form'].validate(function (valid) {
              if (valid) {
                var data = _this.bankaccount;
              }
              console.log(data);
            });
          },
          // form的取消操作
          custbankFormCancel: function custbankFormCancel() {
            this.$refs['bankaccount_table'].closeExpandRow();
            this.formShow = false;
          },
          custbankEditTableRow: function custbankEditTableRow(scope) {
            var row = scope.row;
            this.$refs['bankaccount_table'].expandRow(row);
            this.bankaccount = row;
            this.formShow = false;
          },
          custbankDeleteTableRow: function custbankDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pageComp.custbankDel = scope.row;
            //            this.pk_custbank = scope.row.pk_custbank;
          },
          enableTableRow: function enableTableRow(scope) {
            alert("enable");
            console.log("enable", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pk_custbank = scope.row.pk_custbank;
          }
        },
        custbankResetFun: function custbankResetFun($node) {
          var $table = this.getNodeById($node, "n0yjb6dogz");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custbankEditTableRow",
            icon: "edit"
          }, {
            title: "启用",
            click: "enableTableRow",
            icon: "pt-tuichu"
          }, {
            title: "删除",
            click: "custbankDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $accnum = this.getNodeBy_Id($node, "krvqs7xlxfs"); //账号 
          var $accname = this.getNodeBy_Id($node, "83oyd6v35wm"); //户名
          var $pkBankdoc = this.getNodeBy_Id($node, "r69m5jd8zul"); //开户银行
          var $pkBanktype = this.getNodeBy_Id($node, "bo4dg59b0v"); //银行类别
          var $contactpsn = this.getNodeBy_Id($node, "vpthxzig1da"); //联系人
          var $tel = this.getNodeBy_Id($node, "k3bvpmgm9m"); //联系电话
  
          $accnum.html('<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>');
          $accname.html('<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>');
          $pkBankdoc.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." + 'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>');
          $pkBanktype.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." + 'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>');
  
          $contactpsn.html('<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>');
          $tel.html('<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>');
          return $node[0].outerHTML;
        },
  
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs['linkman_table'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }],
        custlinkmanPk: "34cc4979-181e-44dc-9cd7-79ab1b51738d", //linkman
        custlinkmanData: {
          rules: {
            name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = this.getNodeBy_Id($node, "zxhlnr94qvd");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custlinkmanEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custlinkmanDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $sex = this.getNodeBy_Id($node, "ir66pzdxiic"); //性别
          var $isdefault = this.getNodeBy_Id($node, "h81qk6u00p5"); //是否默认
          $sex.html('<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>');
          $isdefault.html('<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>');
          return $node[0].outerHTML;
        },
        custlinkmanTplMethods: {
          // form的保存操作
          linkmanFormConfirm: function linkmanFormConfirm() {
            var _this2 = this;
  
            this.$refs['linkman_form'].validate(function (valid) {
              if (valid) {
                var data = _this2.linkman;
              }
              console.log(data);
            });
          },
          // form的取消操作
          linkmanFormCancel: function linkmanFormCancel() {
            this.$refs['linkman_table'].closeExpandRow();
            this.formShow = false;
          },
          // table行的编辑操作
          custlinkmanEditTableRow: function custlinkmanEditTableRow(scope) {
            var row = scope.row;
            this.$refs['linkman_table'].expandRow(row);
            this.linkman = row;
            this.formShow = false;
          },
          // table行的删除操作
          custlinkmanDeleteTableRow: function custlinkmanDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.linkmanDel = scope.row;
            this.pageComp.linkmanDelVisible = true;
            this.pageComp.pk_linkman = scope.row.pk_linkman;
          }
        },
  
        // 税类信息
        countryTaxesIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custCountryTaxesPk: "7a7287cf-0833-4009-8cc5-c18cf0e2c4ce", //custaxes
        custCountryTaxesData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        custCountryTaxesResetFun: function custCountryTaxesResetFun($node) {
          var $table = this.getNodeBy_Id($node, "xnl0066wpf9");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custCountryTaxesEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custCountryTaxesDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
  
          $table.append(operateHtml);
  
          var $pkCountry = this.getNodeBy_Id($node, "u5itmgcx7c");
          var $pkTaxes = this.getNodeBy_Id($node, "1idpzwci9up");
          $pkCountry.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_country_ref?" + 'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' + "</div></template>");
  
          $pkTaxes.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_taxes_ref?" + 'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' + "</div></template>");
  
          return $node[0].outerHTML;
        },
        custCountryTaxesTplMethods: {
          // form的保存操作
          custCountryFormConfirm: function custCountryFormConfirm() {
            var data = this.custaxes;
            console.log(data);
          },
          // form的取消操作
          custCountryFormCancel: function custCountryFormCancel() {
            this.$refs['custaxes_table'].closeExpandRow();
            this.formShow = false;
          },
          custCountryTaxesEditTableRow: function custCountryTaxesEditTableRow(scope) {
            var row = scope.row;
            this.$refs['custaxes_table'].expandRow(row);
            this.custaxes = row;
            this.formShow = false;
          },
          custCountryTaxesDeleteTableRow: function custCountryTaxesDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custCountryTaxesDelVisible = true;
            this.pageComp.custtaxtypesDel = scope.row;
          }
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   单个地点详情
         **/
      request: function request() {
        this.pk_linkman = this.$root.$router.currentRoute.params.id;
        //请求客户基本信息详情
        if (this.pk_linkman) {
          debugger;
          this.requestCustBaseInfo();
        }
        //        //客户银行账户列表
        this.requestCustBank();
        //        客户联系人联系人列表
        this.requestCustlinkman();
        //客户税务类别列表
        this.requestCustCountryTaxes();
      },
  
      //请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this3 = this;
  
        debugger;
        this.$http({
          url: "/yls-busi-web/lml/getbyid",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_linkman
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(_this3.$refs.baseTemplateRef);
            _this3.$refs.baseTemplateRef.setData("linkmanLeader", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this3.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户银行账户
      requestCustBank: function requestCustBank() {
        var _this4 = this;
  
        this.$http({
          url: "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var custbankOriginal = res.data.data;
            _this4.$refs.custbankRef.setData("bankaccount", JSON.parse(JSON.stringify(custbankOriginal)));
            _this4.$nextTick(function () {
              _this4.$refs.custbankRef.setData("tableShow", false);
            });
          } else {
            _this4.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this4.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this5 = this;
  
        this.$http({
          url: "/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            console.log(_this5.$refs.custlinkmanRef);
            //             this.custlinkmanData = {
            //               linkman_t :  JSON.parse(JSON.stringify(this.originalValue))
            //             };
            _this5.$refs.custlinkmanRef.setData("linkman_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this5.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this5.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户国家税类
      requestCustCountryTaxes: function requestCustCountryTaxes() {
        var _this6 = this;
  
        this.$http({
          url: "/uapbd/custcountrytaxes/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            //            this.custCountryTaxesData = {
            //              custaxes_t :  JSON.parse(JSON.stringify(this.originalValue))
            //            };
            _this6.$refs.custCountryTaxesRef.setData("custaxes_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this6.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this6.$message({
            message: "客户国家税类信息获取失败",
            type: "error"
          });
        });
      },
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this7 = this;
  
        var delData = {};
        delData.linkman = this.linkmanDel;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custlinkman/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this7.$message({
              message: res.data.msg,
              type: "success"
            });
            _this7.linkmanDelVisible = false;
            _this7.requestCustlinkman();
          } else {
            _this7.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this7.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custbankDeleteClick: function custbankDeleteClick() {
        var _this8 = this;
  
        var delData = this.custbankDel;
        var ts = this.$refs.baseTemplateRef.comp.customer.ts;
        delData.ts = ts;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custbank/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this8.$message({
              message: res.data.msg,
              type: "success"
            });
            _this8.custbankDelVisible = false;
            _this8.requestCustBank();
          } else {
            _this8.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this8.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custCountryTaxesDeleteClick: function custCountryTaxesDeleteClick() {
        var _this9 = this;
  
        this.custtaxtypesDel.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custcountrytaxes/delete",
          method: "post",
          data: this.custtaxtypesDel
        }).then(function (res) {
          if (res.data.status === true) {
            _this9.$message({
              message: res.data.msg,
              type: "success"
            });
            _this9.custCountryTaxesDelVisible = false;
            _this9.requestCustCountryTaxes();
          } else {
            _this9.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this9.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.linkmanEdit = false;
        // 重置value
      },
      customerConfirm: function customerConfirm() {
        var _this10 = this;
  
        debugger;
        var url;
        var data = this.$refs.baseTemplateRef.comp.linkmanLeader;
        console.log(data);
        var baseUrl = '/yls-busi-web/';
        if (this.pk_linkman) {
          url = baseUrl + 'lml/update';
        } else {
          url = baseUrl + 'lml/create';
        }
        debugger;
        this.$refs.baseTemplateRef.comp.$refs["linkman-form"].validate(function (valid) {
          if (valid) {
            _this10.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.status === true) {
                _this10.$message({
                  message: res.data.msg,
                  type: "success"
                });
                _this10.originalValue = res.data.data;
                console.log(_this10.$refs.baseTemplateRef);
                _this10.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this10.originalValue)));
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                _this10.linkmanEdit = false;
              } else {
                _this10.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this10.$message({
                message: "地点更新失败",
                type: "error"
              });
            });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">联系人信息设置</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <ifbp-panel id=\"basePanel\" title=\"基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"linkmanPk\"\n                  show-type=\"form\"\n                  :tplData=\"linkmanData\"\n                  :editable=\"linkmanEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"linkmanEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <ifbp-panel id=\"bankPanel\" title=\"银行账户信息\" :icons=\"bankIcons\">\n        <ifbp-template ref=\"custbankRef\"\n                      tplId=\"bankTemplate\"\n                      :pkTemp=\"custbankPk\"\n                      :tplData=\"custbankData\"\n                      :tplResetFun=\"custbankResetFun\"\n                      :tplMethods=\"custbankTplMethods\"\n                      form-confirm-fun=\"custbankFormConfirm\"\n                      form-cancel-fun=\"custbankFormCancel\"\n                      show-type=\"table-form\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <ifbp-template ref=\"custlinkmanRef\"\n                      tplId=\"linkmanTemplate\"\n                      :pkTemp=\"custlinkmanPk\"\n                      :tplData=\"custlinkmanData\"\n                      :tplResetFun=\"linkmanResetFun\"\n                      :tplMethods=\"custlinkmanTplMethods\"\n                      form-confirm-fun=\"linkmanFormConfirm\"\n                      form-cancel-fun=\"linkmanFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"countryTaxesPanel\" title=\"税类信息\" :icons=\"countryTaxesIcons\">\n        <ifbp-template ref=\"custCountryTaxesRef\"\n                      tplId=\"countryTaxesTemplate\"\n                      :pkTemp=\"custCountryTaxesPk\"\n                      :tplData=\"custCountryTaxesData\"\n                      :tplResetFun=\"custCountryTaxesResetFun\"\n                      :tplMethods=\"custCountryTaxesTplMethods\"\n                      form-confirm-fun=\"custCountryFormConfirm\"\n                      form-cancel-fun=\"custCountryFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custbankDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custbankDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custbankDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"linkmanDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"linkmanDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n\n  <!-- 客户国家税类 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custCountryTaxesDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custCountryTaxesDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custCountryTaxesDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/linkman/linkman-info.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../info-mock.js";
  // // import ElTemplate from "../../../template.vue";
  // import testSearchTemplate from './testSearchTemplate.json';
  
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate
    // },
    data: function data() {
      var oThis = this;
      return {
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
        linkmanPk: "ae2a3637-ec64-4cb6-baf1-3fc6e3aa4691",
        showDeleteButton: false,
        search_input: "",
        isHide: true,
        totalElements: 0,
        currentPage: 1,
        size: 10,
        delDialogVisible: false,
        multiDelDialogVisible: false,
  
        linkmanTableData: {},
        projectTableMethods: {},
        linkmanTableResetFun: function linkmanTableResetFun($node) {
          debugger;
          var $table = this.getNodeById($node, "qhmu5neiknf");
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
  
        // 待删除 begin
        code: "",
        name: "",
        ts: "",
        mobile: "",
        enablestate: "",
        search_options: [{
          label: "全部",
          value: ""
        }, {
          label: "未启用",
          value: 1
        }, {
          label: "已启用",
          value: 2
        }, {
          label: "已停用",
          value: 3
        }]
        // 待删除 end
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
    methods: {
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/linkman/detail/" + scope.row.pk_prj_linkman_leader;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        debugger;
        this.delDialogVisible = true;
        this.delId = scope.row.pk_prj_linkman_leader;
      },
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      searchInputEnterClick: function searchInputEnterClick() {
        alert(this.search_input);
      },
      request: function request(n, s) {
        var _this = this;
  
        var url;
        // var search =
        //   "&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
        // if (n === undefined) {
        //   url = "/uapbd/custbaseinfo/pageList?pn=1&ps=10&sortColumn=" + search;
        // } else {
        //   url = "/uapbd/custbaseinfo/pageList?pn=" + n + "&ps=" + s + search;
        // }
        debugger;
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'lml/pagelist';
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "pk_prj_linkman_leader"
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
          _this.originalValue = res.data.data.content;
          _this.$refs["template-table"].setData("linkmanLeader_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      handleSizeChange: function handleSizeChange(val) {
        this.size = val;
        var maxPage = parseInt(this.totalElements / val) + 1;
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentPage = val;
        this.request(this.currentPage - 1, this.size);
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
        this.searchTemplate = testSearchTemplate;
        this.conditionList = testSearchTemplate.conditionList;
      },
  
      // 设置选中
      selectConditionOption: function selectConditionOption(optionList, option, ctrltype) {
        // console.log(arguments);
        var optionSelected = false;
        var options = optionList.options;
        if (option && option.selected) {
          optionSelected = true;
        }
        if (ctrltype === 'DateComponent') {
          if (!optionList.def_min_value && !optionList.def_max_value && !option) {
            // 修复 el-date-picker 置空时引起的bug
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
        // 改到 el-date-picker@change 时修改
        // if (startDay) {
        //   startDay = this.formatDate(startDay);
        // }
        // if (endDay) {
        //   endDay = this.formatDate(endDay);
        // }
        if (startDay && endDay) {
          dateString = startDay + ' 至 ' + endDay;
        } else if (startDay) {
          dateString = startDay + '之后';
        } else {
          dateString = endDay + '之前';
        }
        return dateString;
      },
  
  
      // 已选中数值格式整理
      formatSelectedNumber: function formatSelectedNumber(min, max) {
        if (min && max) {
          return min + '-' + max + '万元';
        } else if (min) {
          return min + '万元及以上';
        } else {
          return '低于' + max + '万元';
        }
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
      },
  
      // 跳转到添加地点页面
      updatalinkmanInfo: function updatalinkmanInfo() {
        location.hash = "/linkman/add";
      },
      multiDeleteDialgShow: function multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
  
  
      /**
         *  启用状态修改
         *
         * */
      stateTableRow: function stateTableRow(row) {
        var _this2 = this;
  
        // 操作列增加启用按钮
        this.$http({
          url: "/uapbd/addressdoc/enable/" + row.pk_customer,
          method: "post"
        }).then(function (res) {
          if (res.data.status === true) {
            _this2.$message({
              message: res.data.msg,
              type: "success"
            });
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'lml/deletebyid';
        var delId = this.delId; //this.$refs["template-table"].comp.delId;
        console.log("delete" + delId);
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: delId
        }).then(function (res) {
          if (res.data.status === true) {
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
        })["catch"](function () {
          _this3.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      multiDeleteClick: function multiDeleteClick() {
        var tableSelections = this.$refs["template-table"].comp.$refs["customer_table"].getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_customer;
            delIds.push(id);
          }
        }
        console.log("multi" + delIds);
        return;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">联系人-全局</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"updatalinkmanInfo\">新增</el-button>\n      <el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请选择编码/客户\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- <el-row type=\"flex\" justify=\"end\">\n    <el-col :span=\"2\">\n      <el-button @click=\"search\">搜索</el-button>\n    </el-col>\n  </el-row> -->\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag v-if=\"condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\"\n      >\n        {{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n\n  <!-- 搜索参数 -->\n  <template>\n\n    <!-- 前三条平铺条件 -->\n    <el-row\n      :gutter=\"10\"\n      v-for=\"(condition, index) in conditionList\"\n      :key=\"condition.fieldcode\"\n      v-if=\"index < 3\">\n      <!-- 条件名 -->\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">{{condition.fieldname}}:</span>\n      </el-col>\n      <!-- 条件选项 -->\n      <el-col class=\"condition-options\" :span=\"22\" :sm=\"21\" :xs=\"21\">\n\n        <!-- 通用选项 -->\n        <template v-if=\"condition.optionList.options.length\">\n          <span\n            v-for=\"option in condition.optionList.options\"\n            :key=\"option.value\"\n            class=\"condition-option\"\n            :class=\"{selected: option.selected}\"\n            @click=\"selectConditionOption(condition.optionList, option, condition.ctrltype)\"\n          >{{option.name}}</span>\n        </template>\n\n        <!-- 数值字段 -->\n        <template v-if=\"condition.ctrltype === 'NumberComponent'\">\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_min_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最小值\">\n            </el-input>\n          </div>\n            -\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最大值\">\n            </el-input>\n          </div>\n        </template>\n\n        <!-- 日期字段 -->\n        <template v-else-if=\"condition.ctrltype === 'DateComponent'\">\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_min_value\"\n              format=\"yyyy-MM-dd HH:mm:ss\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n            -\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n        </template>\n      </el-col>\n    </el-row>\n\n    <!-- 高级条件 -->\n    <el-row :gutter=\"10\">\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">高级:</span>\n      </el-col>\n      <!-- 条件名 -->\n      <el-col class=\"advanced-conditions\" :span=\"18\" :sm=\"13\" :xs=\"13\">\n        <span v-for=\"(condition, index) in conditionList\"\n          v-if=\"index >= 3\"\n          class=\"advanced-condition\"\n          :class=\"{current: currentConditionCode === condition.fieldcode}\"\n          :key=\"condition.fieldcode\"\n          @click=\"setCurrentCondition(condition)\">\n          {{condition.fieldname}}\n          <i class=\"el-icon-arrow-up\" v-if=\"currentConditionCode === condition.fieldcode\"></i>\n          <i class=\"el-icon-arrow-down\" v-else></i>\n        </span>\n      </el-col>\n\n      <!-- 按钮 -->\n      <el-col class=\"advanced-search-btns\" :span=\"4\" :sm=\"8\" :xs=\"8\">\n        <el-button type=\"primary\" class=\"button-no-radius\">搜索</el-button>\n        <el-button class=\"button-no-radius\">清空</el-button>\n      </el-col>\n    </el-row>\n  </template>\n\n  <!-- 当前选中的条件选项 -->\n  <div class=\"current-condition-options\" v-if=\"currentCondition\">\n\n    <!-- 通用选项 -->\n    <template v-if=\"currentCondition.optionList.options.length\">\n      <span\n        v-for=\"option in currentCondition.optionList.options\"\n        :key=\"option.value\"\n        class=\"condition-option\"\n        :class=\"{selected: option.selected}\"\n        @click=\"selectConditionOption(currentCondition.optionList, option, currentCondition.ctrltype)\"\n      >{{option.name}}</span>\n    </template>\n\n    <!-- 数值字段 -->\n    <template v-if=\"currentCondition.ctrltype === 'NumberComponent'\">\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_min_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最小值\">\n        </el-input>\n      </div>\n        -\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最大值\">\n        </el-input>\n      </div>\n    </template>\n\n    <!-- 日期字段 -->\n    <template v-else-if=\"currentCondition.ctrltype === 'DateComponent'\">\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_min_value\"\n          format=\"yyyy-MM-dd HH:mm:ss\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n        -\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n    </template>\n  </div>\n</div>\n\n  <!-- 主体区域 -->\n  <div class=\"list-main-container clearfix\">\n    <!--新模板组件:tplCode=\"tplCode\"-->\n    <ifbp-template ref=\"template-table\"\n                  tplId=\"linkman-table-template\"\n                  :pkTemp=\"linkmanPk\"\n                  :tplData=\"linkmanTableData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"linkmanTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      :current-page=\"currentPage\"\n      :page-sizes=\"[10, 20, 30, 40]\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalElements\">\n    </el-pagination>\n  </div>\n  \n  <!--删除确认Dialog-->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"multiDelDialogVisible\"\n    @update:visible=\"val => multiDelDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除所选数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"multiDelDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"multiDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!--数据加载过程中页面最上端显示的层-->\n  <!-- <div id=\"cover\" ref=\"cover\">\n    <div class=\"el-loading-spinner\">\n      <svg viewBox=\"25 25 50 50\" class=\"circular\">\n        <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" class=\"path\"></circle>\n      </svg>\n    </div>\n  </div> -->\n</div>\n"
  

});
 
 define('yls^busi/project/src/paycondition/paycondition.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        payConditionDelVisible: false,
        rmoveindex: "",
        delId: "",
  
        funnode: "BT013",
  
        nexusKey: "payment_condition",
  
        //付款条件
        payConditionIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.payConditionRef.comp;
            var table = uitemplateComp.$refs["PaymentCondition_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.payConditionRef.setData("PaymentCondition", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["PaymentCondition_ref"].resetFields();
          }
        }],
  
        payConditionData: {
          rules: {}
        },
        //渲染表格
        payConditionResetFun: function payConditionResetFun($node) {
  
          var $table = this.getNodeById($node, "ur3fbhql8ec");
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestPayCondition();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_prjId != "") {
          this.requestPayCondition();
        }
      },
  
      //请求业务付款条件
      requestPayCondition: function requestPayCondition() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "contr/payCondition/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "source_bill"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_prjId
              }]
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
  
          console.log();
          _this.originalValue = res.data.data.content;
          console.log(_this.originalValue);
          _this.$refs["payConditionRef"].setData("PaymentCondition_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //付款条件取消按钮
      payConditionFormCancel: function payConditionFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["payConditionRef"].comp.formShow = false;
        } else {
          this.$refs["payConditionRef"].getTableComp().closeExpandRow();
          var payBakData = this.$refs.payConditionRef.getData("PaymentCondition_t");
          payBakData[this.payEditBakIndex] = this.payEditBakData;
          this.$refs.payConditionRef.setData("PaymentCondition_t", payBakData);
        }
      },
      //付款条件主表保存
      payConditionFormConfirm: function payConditionFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.payConditionRef.comp.PaymentCondition;
        data.source_bill = this.pk_prjId;
        if (data.pk_prj_payment_condition) {
          url = _publicData.ylsBusi + 'contr/payCondition/update';
        } else {
          url = _publicData.ylsBusi + 'contr/payCondition/create';
        }
        //保存校验
        this.$refs.payConditionRef.comp.$refs["PaymentCondition_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.payConditionRef.getData("PaymentCondition_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                _this2.$refs.payConditionRef.setData("proRentThing_t", JSON.parse(JSON.stringify(linarraydata)));
                _this2.$refs["payConditionRef"].comp.formShow = false;
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
        });
      },
      //付款条件行编辑
      payConditionFormedit: function payConditionFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["payConditionRef"].getTableComp().expandRow(row);
        this.$refs["payConditionRef"].formShow = false;
        //PaymentCondition为表单数据对象参数
        this.$refs["payConditionRef"].setData("PaymentCondition", row);
        this.payEditBakData = JSON.parse(JSON.stringify(scope.row));
        this.payEditBakIndex = scope.$index;
      },
      // 付款条件删除提示
      payConditionFormdelete: function payConditionFormdelete(scope) {
        this.payConditionDelVisible = true;
        this.delId = scope.row.pk_prj_payment_condition;
      },
      // 付款条件删除方法
      payConditionDeleteClick: function payConditionDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "contr/payCondition/deleteById",
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
            _this3.requestPayCondition();
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
        this.payConditionDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--付款条件管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"payConditionRef\"\r\n                        tplId=\"payCondition-template\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"payConditionData\"\r\n                        :tplResetFun=\"payConditionResetFun\"\r\n                        @form-confirm-click=\"payConditionFormConfirm\"\r\n                        @form-cancel-click=\"payConditionFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"payConditionFormedit\"\r\n                        @delete-table-click=\"payConditionFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务付款条件 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"payConditionDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"payConditionDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"payConditionDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/pentaltyrulede/pentaltyrulede.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        penaltyRuleDeDelVisible: false,
        rmoveindex: "",
        delId: "",
  
        funnode: "BT009",
  
        nexusKey: "penalty_rule",
  
        //逾期利率
        penaltyRuleDeIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.penaltyRuleDeRef.comp;
            var table = uitemplateComp.$refs["PenaltyRuleDe_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.penaltyRuleDeRef.setData("PenaltyRuleDe", {});
            oThis.rmoveindex = "";
            uitemplateComp.$refs["PenaltyRuleDe_ref"].resetFields();
          }
        }],
  
        penaltyRuleDeData: {
          rules: {}
        },
        //渲染表格
        penaltyRuleDeResetFun: function penaltyRuleDeResetFun($node) {
  
          var $table = this.getNodeById($node, "whw2hugq91");
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestPayCondition();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_prjId != "") {
          this.requestPayCondition();
        }
      },
  
      //请求业务逾期利率
      requestPayCondition: function requestPayCondition() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "contr/penaltyRuleDe/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "source_bill"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_prjId
              }, {
                'key': 'is_base',
                'oper': '=',
                'value': '1'
              }]
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
  
          console.log();
          _this.originalValue = res.data.data.content;
          console.log(_this.originalValue);
          _this.$refs["penaltyRuleDeRef"].setData("PenaltyRuleDe_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //逾期利率取消按钮
      penaltyRuleDeFormCancel: function penaltyRuleDeFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["penaltyRuleDeRef"].comp.formShow = false;
        } else {
          this.$refs["penaltyRuleDeRef"].getTableComp().closeExpandRow();
          var penaltyDatas = this.$refs.penaltyRuleDeRef.getData("PenaltyRuleDe_t");
          penaltyDatas[this.penaltyEditBakIndex] = this.penaltyEditBakData;
          this.$refs.penaltyRuleDeRef.setData("PenaltyRuleDe_t", penaltyDatas);
        }
      },
      //逾期利率主表保存
      penaltyRuleDeFormConfirm: function penaltyRuleDeFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.penaltyRuleDeRef.comp.PenaltyRuleDe;
        data.source_bill = this.pk_prjId;
        data.is_base = '1';
        if (data.pk_prj_rule) {
          url = _publicData.ylsBusi + 'contr/penaltyRuleDe/update';
        } else {
          url = _publicData.ylsBusi + 'contr/penaltyRuleDe/create';
        }
        //保存校验
        this.$refs.penaltyRuleDeRef.comp.$refs["PenaltyRuleDe_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.penaltyRuleDeRef.getData("PenaltyRuleDe_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                _this2.$refs.penaltyRuleDeRef.setData("proRentThing_t", JSON.parse(JSON.stringify(linarraydata)));
                _this2.$refs["penaltyRuleDeRef"].comp.formShow = false;
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
        });
      },
      //逾期利率行编辑
      penaltyRuleDeFormedit: function penaltyRuleDeFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["penaltyRuleDeRef"].getTableComp().expandRow(row);
        this.$refs["penaltyRuleDeRef"].formShow = false;
        //PenaltyRuleDe为表单数据对象参数
        this.$refs["penaltyRuleDeRef"].setData("PenaltyRuleDe", row);
        this.penaltyEditBakData = JSON.parse(JSON.stringify(row));
        this.penaltyEditBakIndex = scope.$index;
      },
      // 逾期利率删除提示
      penaltyRuleDeFormdelete: function penaltyRuleDeFormdelete(scope) {
  
        this.penaltyRuleDeDelVisible = true;
        this.delId = scope.row.pk_prj_rule;
      },
      // 逾期利率删除方法
      penaltyRuleDeDeleteClick: function penaltyRuleDeDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "contr/penaltyRuleDe/deleteById",
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
            _this3.requestPayCondition();
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
        this.penaltyRuleDeDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--逾期利率管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"penaltyRuleDeRef\"\r\n                        tplId=\"penaltyRuleDe-template\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"penaltyRuleDeData\"\r\n                        :tplResetFun=\"penaltyRuleDeResetFun\"\r\n                        @form-confirm-click=\"penaltyRuleDeFormConfirm\"\r\n                        @form-cancel-click=\"penaltyRuleDeFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"penaltyRuleDeFormedit\"\r\n                        @delete-table-click=\"penaltyRuleDeFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务逾期利率 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"penaltyRuleDeDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"penaltyRuleDeDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"penaltyRuleDeDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectAnalysis/projectSummarize.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        SummarizeDelVisible: false,
        rmoveindex: "",
        delId: "",
        //项目总结 标签
        SummarizeIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.ProjectSummarizeRef.comp;
            var table = uitemplateComp.$refs["ProjectSummarize_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.ProjectSummarizeRef.setData("projectSummarize", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["ProjectSummarize_t_ref"].resetFields();
          }
        }],
  
        funnode: oThis.type === "prj" ? "BT008" : "BT008",
        nexusKey: oThis.type === "prj" ? "prj_summarize" : "prj_summarize",
        SummarizeControlData: {},
        //渲染表格
        SummarizeResetFun: function SummarizeResetFun($node) {
          var $refNode = this.getNodeById($node, '5r6hp3gwgju');
          // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
          // var $refNode = $node.find("el-ref");
          if ($refNode.length) {
            // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
            $refNode.attr("v-on:trigger", "customerRefChange");
          };
          //项目承租信息表格id：owwkujphew
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
        },
        bothlesseeMethods: {
          customerRefChange: function customerRefChange(type, data) {}
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestPrjSummarize();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != "") {
          this.requestPrjSummarize();
        }
      },
  
      //请求业务出租方
      requestPrjSummarize: function requestPrjSummarize() {
        var _this = this;
  
        var url;
        if (this.source_bill == "") {
          return;
        }
        url = _publicData.ylsBusi + "prj/summarize/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }]
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
  
          _this.originalValue = res.data.data.content;
  
          _this.$refs["ProjectSummarizeRef"].setData("ProjectSummarize_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //项目总结 取消按钮
      SummarizeFormCancel: function SummarizeFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["ProjectSummarizeRef"].comp.formShow = false;
        } else {
          this.$refs["ProjectSummarizeRef"].getTableComp().closeExpandRow();
  
          var riskBakData = this.$refs.ProjectSummarizeRef.getData("ProjectSummarize_t");
          riskBakData[this.riskEditIndex] = this.riskEditBakData;
          this.$refs.ProjectSummarizeRef.setData("ProjectSummarize_t", riskBakData);
        }
      },
      //项目总结 主表保存
      SummarizeFormConfirm: function SummarizeFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        debugger;
        var data = this.$refs.ProjectSummarizeRef.comp.ProjectSummarize;
        data.source_bill = this.source_bill;
  
        if (data.pk_prj_summarize) {
          url = _publicData.ylsBusi + 'prj/summarize/update';
        } else {
          url = _publicData.ylsBusi + 'prj/summarize/create';
        }
        //保存校验
        this.$refs.ProjectSummarizeRef.comp.$refs["ProjectSummarize_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.requestPrjSummarize();
                _this2.$refs["ProjectSummarizeRef"].comp.formShow = false;
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
        });
      },
      //项目总结 行编辑
      SummarizeFormedit: function SummarizeFormedit(scope) {
        debugger;
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["ProjectSummarizeRef"].getTableComp().expandRow(row);
        this.$refs["ProjectSummarizeRef"].formShow = false;
        this.$refs['ProjectSummarizeRef'].setData('ProjectSummarize', row);
        //编辑前备份
        this.riskEditBakData = JSON.parse(JSON.stringify(scope.row));
        this.riskEditIndex = scope.$index;
      },
      // 风险及控制措施汇总删除提示
      SummarizeFormdelete: function SummarizeFormdelete(scope) {
        this.SummarizeDelVisible = true;
        this.delId = scope.row.pk_prj_summarize;
      },
      // 风险及控制措施汇总删除方法
      SummarizeDeleteClick: function SummarizeDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "prj/summarize/deleteById",
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
            _this3.requestPrjSummarize();
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
        this.SummarizeDelVisible = false;
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
  __vue__options__.template = "\r\n<!--项目总结-->\r\n<div>\r\n          <ifbp-template ref=\"ProjectSummarizeRef\"\r\n                        tplId=\"ProjectSummarize\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"SummarizeControlData\"\r\n                        :tpl-reset-fun=\"SummarizeResetFun\"\r\n                        :methods=\"bothlesseeMethods\"\r\n                        @form-confirm-click=\"SummarizeFormConfirm\"\r\n                        @form-cancel-click=\"SummarizeFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"SummarizeFormedit\"\r\n                        @delete-table-click=\"SummarizeFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 项目总结 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"SummarizeDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"SummarizeDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"SummarizeDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectAnalysis/riskAndControl.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        RiskDelVisible: false,
        rmoveindex: "",
        delId: "",
        //出租人标签
        RiskIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.RiskControlRef.comp;
            var table = uitemplateComp.$refs["RiskControl_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.RiskControlRef.setData("projectRisk", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["RiskControl_t_ref"].resetFields();
          }
        }],
  
        funnode: oThis.type === "prj" ? "BT008" : "BT008",
        nexusKey: oThis.type === "prj" ? "prj_risk_control" : "prj_risk_control",
        RiskControlData: {},
        //渲染表格
        RiskResetFun: function RiskResetFun($node) {
          var $refNode = this.getNodeById($node, '5r6hp3gwgju');
          // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
          // var $refNode = $node.find("el-ref");
          if ($refNode.length) {
            // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
            $refNode.attr("v-on:trigger", "customerRefChange");
          };
          //项目承租信息表格id：owwkujphew
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
        },
        bothlesseeMethods: {
          customerRefChange: function customerRefChange(type, data) {}
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestPrjRisk();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != "") {
          this.requestPrjRisk();
        }
      },
  
      //请求业务出租方
      requestPrjRisk: function requestPrjRisk() {
        var _this = this;
  
        var url;
        if (this.source_bill == "") {
          return;
        }
        url = _publicData.ylsBusi + "prj/riskControl/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }]
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
  
          _this.originalValue = res.data.data.content;
  
          _this.$refs["RiskControlRef"].setData("RiskControl_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //风险及控制措施汇总取消按钮
      RiskFormCancel: function RiskFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["RiskControlRef"].comp.formShow = false;
        } else {
          this.$refs["RiskControlRef"].getTableComp().closeExpandRow();
  
          var riskBakData = this.$refs.RiskControlRef.getData("RiskControl_t");
          riskBakData[this.riskEditIndex] = this.riskEditBakData;
          this.$refs.RiskControlRef.setData("RiskControl_t", riskBakData);
        }
      },
      //风险及控制措施汇总主表保存
      RiskFormConfirm: function RiskFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        debugger;
        var data = this.$refs.RiskControlRef.comp.RiskControl;
        data.source_bill = this.source_bill;
  
        if (data.pk_risk_control) {
          url = _publicData.ylsBusi + 'prj/riskControl/update';
        } else {
          url = _publicData.ylsBusi + 'prj/riskControl/create';
        }
        //保存校验
        this.$refs.RiskControlRef.comp.$refs["RiskControl_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.requestPrjRisk();
                _this2.$refs["RiskControlRef"].comp.formShow = false;
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
        });
      },
      //风险及控制措施汇总行编辑
      RiskFormedit: function RiskFormedit(scope) {
        debugger;
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["RiskControlRef"].getTableComp().expandRow(row);
        this.$refs["RiskControlRef"].formShow = false;
        this.$refs['RiskControlRef'].setData('RiskControl', row);
        //编辑前备份
        this.riskEditBakData = JSON.parse(JSON.stringify(scope.row));
        this.riskEditIndex = scope.$index;
      },
      // 风险及控制措施汇总删除提示
      RiskFormdelete: function RiskFormdelete(scope) {
        this.RiskDelVisible = true;
        this.delId = scope.row.pk_risk_control;
      },
      // 风险及控制措施汇总删除方法
      RiskDeleteClick: function RiskDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "prj/riskControl/deleteById",
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
            _this3.requestPrjRisk();
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
        this.RiskDelVisible = false;
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
  __vue__options__.template = "\r\n<!--风险及控制措施汇总-->\r\n<div>\r\n          <ifbp-template ref=\"RiskControlRef\"\r\n                        tplId=\"RiskControl\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"RiskControlData\"\r\n                        :tpl-reset-fun=\"RiskResetFun\"\r\n                        :methods=\"bothlesseeMethods\"\r\n                        @form-confirm-click=\"RiskFormConfirm\"\r\n                        @form-cancel-click=\"RiskFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"RiskFormedit\"\r\n                        @delete-table-click=\"RiskFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 风险 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"RiskDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"RiskDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"RiskDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectApproval/prjPromotPlan.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill"],
    data: function data() {
      var oThis = this;
      //校验
  
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        delVisible: false,
        rmoveindex: '',
        delId: '',
        //标签
        icons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.source_bill === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            var uitemplateComp = oThis.$refs.baseRef.comp;
            var table = uitemplateComp.$refs['PrjPromotPlan_t_ref'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.baseRef.setData('PrjPromotPlan', {
              // mobile:'13'
            });
            oThis.rmoveindex = '';
            uitemplateComp.$refs['PrjPromotPlan_ref'].resetFields();
          }
        }],
        funnode: 'BT008',
        nexusKey: 'prjPromotPlan_prjApproval',
        tplData: {},
        editIndex: '',
        editBakData: {},
        //渲染表格
        resetFun: function resetFun($node) {
          var $table = this.getNodeById($node, 'bz9hbv2702j');
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
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestPrjPromotPlan();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != '' && this.source_bill != undefined) {
          this.requestPrjPromotPlan();
        }
      },
  
      //请求项目推进计划
      requestPrjPromotPlan: function requestPrjPromotPlan() {
        var _this = this;
  
        var data = {
          'orderList': [{
            'direction': 'desc',
            'property': 'ts'
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/promotPlan/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this.$refs['baseRef'].setData('PrjPromotPlan_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //取消按钮
      formCancel: function formCancel(type) {
        this.rmoveindex = '';
        //关闭表单或者是下拉显示行
        if (type === 'form') {
          this.$refs['baseRef'].comp.formShow = false;
        } else {
          this.$refs['baseRef'].getTableComp().closeExpandRow();
          var bakData = this.$refs.baseRef.getData("PrjPromotPlan_t");
          bakData[this.editIndex] = this.editBakData;
          this.$refs.baseRef.setData("PrjPromotPlan_t", bakData);
        }
      },
      //项目推进计划主表保存
      formConfirm: function formConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.baseRef.comp.PrjPromotPlan;
        data.source_bill = this.source_bill;
        if (data.pk_prj_promot_plan) {
          url = _publicData.ylsBusi + 'prj/promotPlan/update';
        } else {
          url = _publicData.ylsBusi + 'prj/promotPlan/create';
        }
        //保存校验
        this.$refs.baseRef.comp.$refs['PrjPromotPlan_ref'].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                _this2.requestPrjPromotPlan();
                _this2.$refs['baseRef'].comp.formShow = false;
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
        });
      },
      //项目推进计划 行编辑
      formEdit: function formEdit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['baseRef'].getTableComp().expandRow(row);
        this.$refs['baseRef'].formShow = false;
        this.$refs['baseRef'].setData('PrjPromotPlan', row);
        this.editBakData = JSON.parse(JSON.stringify(scope.row));
        this.editIndex = scope.$index;
      },
      //删除提示
      formDelete: function formDelete(scope) {
        this.delVisible = true;
        this.delId = scope.row.pk_prj_promot_plan;
      },
      // 删除方法
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/promotPlan/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestPrjPromotPlan();
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
        this.delVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\n<!--项目推进计划模块-->\n<div>\n  <ifbp-template\n    ref=\"baseRef\"\n    tplId=\"tplId\"\n    :funnode=\"funnode\"\n    :nexuskey=\"nexusKey\"\n    :tplData=\"tplData\"\n    :tplResetFun=\"resetFun\"\n    @form-confirm-click=\"formConfirm\"\n    @form-cancel-click=\"formCancel\"\n    show-type=\"table-form\"\n    @edit-table-click=\"formEdit\"\n    @delete-table-click=\"formDelete\">\n  </ifbp-template>\n\n  <!-- 项目推进计划 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delVisible = false , this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectApproval/projectApproval-card.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _ProviderPanel = require('yls^busi/project/src/projectinfo/ProviderPanel.vue');
  
  var _ProviderPanel2 = _interopRequireDefault(_ProviderPanel);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _prjPromotPlan = require('yls^busi/project/src/projectApproval/prjPromotPlan.vue');
  
  var _prjPromotPlan2 = _interopRequireDefault(_prjPromotPlan);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      'contProviderRef': _ProviderPanel2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirenttingRef': _busi_rentting2["default"],
      'prjPromotPlanRef': _prjPromotPlan2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        scrollDom: 'ifbpScrollDom',
        pk_prj_approval: '',
        providerVisible: false,
        lease_type: '',
  
        //立项信息 start
        funnode: 'BT008',
        nexuskey: '',
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            oThis.baseEdit = !oThis.baseEdit;
          }
        }],
        tplData: {},
        baseEdit: false,
        // resetFun: function($node) {
        // //获取客户名称
        // var $refNode1 = this.getNodeById($node, '7i5uecnmegk');
        // if($refNode1.length) {
        //   $refNode1.attr('v-on:trigger', 'handleRefChange1'); 
        // }
  
        // //获取出租方账户
        // var $refNode2 = this.getNodeById($node, 'aljyrih6b4o');
        // if($refNode2.length) {
        //   $refNode2.attr('v-on:trigger', 'handleRefChange2'); 
        // }  
        // },
        // t_Methods: {
        /*给客户编号、控股股东、成立时间、注册资本、法人代表、
          客户性质、是否存在关联方交易、主营业务赋值，给出租方账户传参*/
        // handleRefChange1: function(type, data) {
        //   debugger;
        //   if(type === 'change') {
        //     this.$refs['projectApproval_form'].model.customer_code = data.value[0].refcode;
        //     this.$refs['projectApproval_form'].model.controlling_shareholder = data.value[0].controlshareholder;
        //     this.$refs['projectApproval_form'].model.establish_date = data.value[0].establish_date;
        //     this.$refs['projectApproval_form'].model.capital = data.value[0].capital;
        //     this.$refs['projectApproval_form'].model.legal_person = data.value[0].legal_person_name;
        //     this.$refs['projectApproval_form'].model.customer_property = data.value[0].customer_property;
        //     this.$refs['projectApproval_form'].model.link_trade = data.value[0].link_trade;
        //     this.$refs['projectApproval_form'].model.primary_business = data.value[0].primary_business;
  
        //     let refParams={'key':data.value[0].id};
        //     oThis.$refs.baseTemplateRef.setData('lessor_account_param', refParams);
        //   }
        // },
        // //给出租方账号、开户行赋值
        // handleRefChange2: function(type, data) {
        //   debugger;
        //   if(type === 'change') {
        //     this.$refs['projectApproval_form'].model.lessor_account_num = data.value[0].refcode;
        //     this.$refs['projectApproval_form'].model.deposit_bank = data.value[0].bank_no;
        //   }
        // }
        // },
        //立项信息 end
  
        //承租人基本信息 start
        lesseeFunnode: 'BT003',
        lesseeNexuskey: '',
        lesseeIcons: [{
          icon: 'edit',
          click: function click() {
            var pk_customer = oThis.$refs.baseTemplateRef.comp.projectApproval.pk_customer;
            if (pk_customer === '' || pk_customer === null) {
              oThis.$message({
                message: '该立项信息没有设置承租人信息，不允许编辑！',
                type: 'error'
              });
              return;
            }
            oThis.lesseeEdit = !oThis.lesseeEdit;
          }
        }],
        lesseeTplData: {},
        lesseeEdit: false,
        formDataObj: '',
        //承租人基本信息 end
  
        //供应商标签
        contProviderIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_prj_approval === '') {
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
              });
              return;
            }
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.formShow = true;
          }
        }],
        //保险信息标签
        insuranceIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_prj_approval === '') {
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
              });
              return;
            }
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
          }
        }],
  
        //租赁物标签
        rentTingIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_prj_approval === '') {
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
              });
              return;
            }
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp.formShow = true;
          }
        }],
  
        //特殊事项 start
        matterFunnode: 'BT008',
        matterNexuskey: 'specialMatter_prjApproval',
        matterIcons: [{
          icon: 'edit',
          click: function click() {
            if (this.pk_prj_approval === '' || this.pk_prj_approval === null) {
              return;
            }
            oThis.matterEdit = !oThis.matterEdit;
          }
        }],
        matterTplData: {},
        matterEdit: false,
        //特殊事项 end
  
        //项目推进计划标签
        prjPromotPlanIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_prj_approval === '') {
              oThis.$message({
                message: '请先保存立项信息',
                type: 'error'
              });
              return;
            }
            oThis.$refs.prjPromotPlanRef.$refs.prjPromotPlanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.prjPromotPlanRef.$refs.prjPromotPlanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.prjPromotPlanRef.$refs.prjPromotPlanRef.comp.formShow = true;
          }
        }],
  
        //项目分析 start
        analysisFunnode: 'BT008',
        analysisNexuskey: 'prjAnalysis-prjApproval',
        analysisIcons: [{
          icon: 'edit',
          click: function click() {
            if (this.pk_prj_approval === '' || this.pk_prj_approval === null) {
              return;
            }
            oThis.analysisEdit = !oThis.analysisEdit;
          }
        }],
        analysisTplData: {},
        analysisEdit: false,
        //项目分析 end
  
        //项目操作流程 start
        processFunnode: 'BT008',
        processNexuskey: 'prj_process_procedure'
        //项目操作流程 end
  
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {
      this.pk_prj_approval = this.$root.$router.currentRoute.params.id;
    },
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      request: function request() {
        var _this = this;
  
        //请求基本信息详情
        if (this.pk_prj_approval === undefined) {
          this.pk_prj_approval = '';
          this.baseEdit = true;
          return;
        }
        this.$http({
          url: _publicData.ylsBusi + 'prj/approval/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_prj_approval
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.lease_type = originalValue.lease_type;
          _this.providerVisible = originalValue.lease_type === 'LEASEDIRECT' ? true : false;
          _this.nexuskey = originalValue.lease_type === 'SUBLEASE' ? 'prjApprovalDetail_person' : 'prjApprovalDetail_corp';
          _this.$refs.baseTemplateRef.setData('projectApproval', JSON.parse(JSON.stringify(originalValue)));
          _this.$refs.processTemplateRef.setData('projectApproval', JSON.parse(JSON.stringify(originalValue)));
  
          //根据返回结果中的客户主键，获取承租人基本信息
          if (originalValue.pk_customer != null && originalValue.pk_customer != '') {
            var url = void 0;
            if (originalValue.customer_type == 'CORP') {
              _this.lesseeNexuskey = 'prjApproval_lessee_corp';
              url = _publicData.ylsBusi + 'cust/corp/getByPkCustomer';
              _this.formDataObj = 'CustCorp';
            } else {
              _this.lesseeNexuskey = 'prjApproval_lessee_person';
              url = _publicData.ylsBusi + 'cust/CustPerson/getByPkCustomer';
              _this.formDataObj = 'CustPerson';
            }
            _this.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: originalValue.pk_customer
            }).then(function (res) {
              _this.$refs.lesseeTemplateRef.setData(_this.formDataObj, JSON.parse(JSON.stringify(res.data.data)));
            })["catch"](function (e) {
              _this.$message({
                message: '承租人基本信息获取失败',
                type: 'error'
              });
            });
          }
          //end
        })["catch"](function (e) {
          _this.$message({
            message: '详情获取失败',
            type: 'error'
          });
        });
  
        //请求特殊事项
        if (this.pk_prj_approval) {
          this.$http({
            url: _publicData.ylsBusi + 'prj/specialMatter/getByPkPrjApproval',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: this.pk_prj_approval
          }).then(function (res) {
            var originalValue = res.data.data;
            _this.$refs.matterTemplateRef.setData('SpecialMatterEntity', JSON.parse(JSON.stringify(originalValue)));
          })["catch"](function (e) {
            _this.$message({
              message: '特殊事项获取失败',
              type: 'error'
            });
          });
        }
  
        //请求项目分析
        if (this.pk_prj_approval) {
          this.$http({
            url: _publicData.ylsBusi + 'prj/analysis/getByPkPrjApproval',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: this.pk_prj_approval
          }).then(function (res) {
            var originalValue = res.data.data;
            _this.$refs.analysisTemplateRef.setData('PrjAnalysis', JSON.parse(JSON.stringify(originalValue)));
          })["catch"](function (e) {
            _this.$message({
              message: '项目分析获取失败',
              type: 'error'
            });
          });
        }
      },
  
  
      //立项信息 start
      baseCancel: function baseCancel() {
        this.baseEdit = false;
      },
  
      //基本信息保存
      baseConfirm: function baseConfirm() {
        var _this2 = this;
  
        var data = this.$refs.baseTemplateRef.comp.projectApproval;
        //表单formRef  表格tableRef
        this.$refs.baseTemplateRef.validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: _publicData.ylsBusi + 'prj/approval/updateOrCreate',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '保存成功',
                  type: 'success'
                });
                var originalValue = res.data.data;
                _this2.$refs.baseTemplateRef.setData('projectApproval', JSON.parse(JSON.stringify(originalValue)));
                _this2.baseEdit = false;
                _this2.pk_prj_approval = originalValue.pk_prj_approval;
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
        });
      },
  
      //立项信息 end
  
      //承租人基本信息 start
      lesseeCancel: function lesseeCancel() {
        this.lesseeEdit = false;
      },
  
      //基本信息保存
      lesseeConfirm: function lesseeConfirm() {
        var _this3 = this;
  
        var tmp = this.formDataObj;
        var data = this.$refs.lesseeTemplateRef.comp.tmp;
  
        //表单formRef  表格tableRef
        this.$refs.lesseeTemplateRef.validate(function (valid) {
          if (valid) {
            var url = void 0;
            if (tmp === 'CustCorp') {
              url = _publicData.ylsBusi + 'cust/corp/update';
            } else {
              url = _publicData.ylsBusi + 'cust/CustPerson/update';
            }
            _this3.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this3.$message({
                  message: '保存成功',
                  type: 'success'
                });
                var originalValue = res.data.data;
                _this3.$refs.lesseeTemplateRef.setData(_this3.formDataObj, JSON.parse(JSON.stringify(originalValue)));
                _this3.lesseeEdit = false;
              } else {
                _this3.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this3.$message({
                message: '更新失败',
                type: 'error'
              });
            });
          }
        });
      },
  
      //承租人基本信息 end
  
      //特殊事项 start
      matterCancel: function matterCancel() {
        this.matterEdit = false;
      },
  
      //基本信息保存
      matterConfirm: function matterConfirm() {
        var _this4 = this;
  
        var data = this.$refs.matterTemplateRef.comp.SpecialMatterEntity;
        data.pk_prj_approval = this.pk_prj_approval;
  
        //表单formRef  表格tableRef
        this.$refs.matterTemplateRef.validate(function (valid) {
          if (valid) {
            _this4.$http({
              url: _publicData.ylsBusi + 'prj/specialMatter/updateOrCreate',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this4.$message({
                  message: '保存成功',
                  type: 'success'
                });
                var originalValue = res.data.data;
                _this4.$refs.matterTemplateRef.setData('SpecialMatterEntity', JSON.parse(JSON.stringify(originalValue)));
                _this4.matterEdit = false;
              } else {
                _this4.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this4.$message({
                message: '更新失败',
                type: 'error'
              });
            });
          }
        });
      },
  
      //特殊事项 end
  
      //项目分析 start
      analysisCancel: function analysisCancel() {
        this.analysisEdit = false;
      },
  
      //基本信息保存
      analysisConfirm: function analysisConfirm() {
        var _this5 = this;
  
        var data = this.$refs.analysisTemplateRef.comp.PrjAnalysis;
        data.pk_prj_approval = this.pk_prj_approval;
  
        //表单formRef  表格tableRef
        this.$refs.analysisTemplateRef.validate(function (valid) {
          if (valid) {
            _this5.$http({
              url: _publicData.ylsBusi + 'prj/analysis/updateOrCreate',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this5.$message({
                  message: '保存成功',
                  type: 'success'
                });
                var originalValue = res.data.data;
                _this5.$refs.analysisTemplateRef.setData('PrjAnalysis', JSON.parse(JSON.stringify(originalValue)));
                _this5.analysisEdit = false;
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
        });
      }
      //项目分析 end
  
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--节点title-->\n  <div class='title-container'>\n    <h2 class='name'>立项申请维护</h2>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class='detail-main-container clearfix'>\n    <ifbp-panel-group :navbar='true' :base-scroll-top='50' :scroll-dom='scrollDom' :base-nav-bar-top='125'>\n      <!--立项信息-->\n      <ifbp-panel id='basePanel' title = '立项信息' :icons='baseIcons'>\n        <ifbp-template ref='baseTemplateRef'\n                  tplId='baseTemplate'\n                  :funnode='funnode'\n                  :nexuskey='nexuskey'\n                  show-type='form'\n                  :tplData='tplData'\n                  :editable='baseEdit'>\n        </ifbp-template>\n        <div class='form-button-div' v-if='baseEdit'>\n          <el-button type='default' class='button-no-radius' @click='baseCancel'>取消</el-button>\n          <el-button type='primary' class='button-no-radius' @click='baseConfirm'>保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--承租人基本信息-->\n      <ifbp-panel id='lesseePanel' title = '承租人基本信息' :icons='lesseeIcons'>\n        <ifbp-template ref='lesseeTemplateRef'\n                  tplId='lesseeTemplate'\n                  :funnode='lesseeFunnode'\n                  :nexuskey='lesseeNexuskey'\n                  show-type='form'\n                  :tplData='lesseeTplData'\n                  :editable='lesseeEdit'>\n        </ifbp-template>\n        <div class='form-button-div' v-if='lesseeEdit'>\n          <el-button type='default' class='button-no-radius' @click='lesseeCancel'>取消</el-button>\n          <el-button type='primary' class='button-no-radius' @click='lesseeConfirm'>保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--供应商信息-->\n      <ifbp-panel id='contProviderRef' title='供应商信息' :icons='contProviderIcons' v-if='providerVisible'>\n        <contProviderRef\n          ref='contProviderRef'\n          :source_bill='pk_prj_approval'\n          :type=\"'prjApproval'\">\n        </contProviderRef>\n      </ifbp-panel>\n      <!--租赁物信息-->\n      <ifbp-panel id='busirenttingRef' title='租赁物情况' :icons='rentTingIcons'>\n        <busirenttingRef\n          ref='busirenttingRef'\n          :pk_prjId='pk_prj_approval'\n          :Leasehold='lease_type'\n          :type=\"'prjApproval'\">\n        </busirenttingRef>\n      </ifbp-panel>\n      <!--保险信息-->\n      <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_prj_approval'\n          :type=\"'prjApproval'\">\n        </insuranceRef>\n      </ifbp-panel>\n      <!--特殊事项-->\n      <ifbp-panel id='matterPanel' title = '特殊事项' :icons='matterIcons'>\n        <ifbp-template ref='matterTemplateRef'\n                  tplId='matterTemplate'\n                  :funnode='matterFunnode'\n                  :nexuskey='matterNexuskey'\n                  show-type='form'\n                  :tplData='matterTplData'\n                  :editable='matterEdit'>\n        </ifbp-template>\n        <div class='form-button-div' v-if='matterEdit'>\n          <el-button type='default' class='button-no-radius' @click='matterCancel'>取消</el-button>\n          <el-button type='primary' class='button-no-radius' @click='matterConfirm'>保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--项目推进计划-->\n      <ifbp-panel id='prjPromotPlanRef' title='项目推进计划' :icons='prjPromotPlanIcons'>\n        <prjPromotPlanRef\n          ref='prjPromotPlanRef'\n          :source_bill='pk_prj_approval'\n        >\n        </prjPromotPlanRef>\n      </ifbp-panel>\n      <!--项目分析-->\n      <ifbp-panel id='analysisPanel' title = '项目分析' :icons='analysisIcons'>\n        <ifbp-template ref='analysisTemplateRef'\n                  tplId='analysisTemplate'\n                  :funnode='analysisFunnode'\n                  :nexuskey='analysisNexuskey'\n                  show-type='form'\n                  :tplData='analysisTplData'\n                  :editable='analysisEdit'>\n        </ifbp-template>\n        <div class='form-button-div' v-if='analysisEdit'>\n          <el-button type='default' class='button-no-radius' @click='analysisCancel'>取消</el-button>\n          <el-button type='primary' class='button-no-radius' @click='analysisConfirm'>保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--项目操作流程-->\n      <ifbp-panel id='processPanel' title = '项目操作流程'>\n        <ifbp-template ref='processTemplateRef'\n                  tplId='processTemplate'\n                  :funnode='processFunnode'\n                  :nexuskey='processNexuskey'\n                  show-type='form'>\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectApproval/projectApproval-table.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      return {
        //模版主键
        funnode: 'BT008',
        nexuskey: 'prjApproval',
        tableData: {},
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: '',
        // 查询模板编码
        searchTemplateCode: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        sp: '{}',
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          var $table = $node.find('el-table');
          //定义操作
          var operateArr = [{
            icon: 'search',
            title: '查看'
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
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        if (searchTemplate !== '') {
          this.sp = JSON.stringify(searchTemplate);
        }
        this.request();
      },
  
      // 添加按钮
      addInfo: function addInfo() {
        location.hash = '/projectApproval/add';
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = '/projectApproval/detail/' + scope.row.pk_prj_approval;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_prj_approval;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: '/yls-busi-web/prj/approval/deleteById',
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
              'qtAggVO': this.sp
            }
          }
        };
        this.$http({
          url: '/yls-busi-web/prj/approval/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this2.$refs['prjApproval-table'].setData('projectApproval_t', JSON.parse(JSON.stringify(originalValue)));
          _this2.totalElements = res.data.data.totalElements; // 总条数
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class='main-panel'>\n  <!--节点title-->\n  <div class='title-container'>\n    <h2 class='name'>立项申请</h2>\n  </div>\n  <!--按钮区域-->\n  <div class='operator-container'>\n    <div class='fl'>\n      <el-button type='primary' class='button-no-radius' @click='addInfo'>新增</el-button>\n      <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button-->\n    </div>\n    <!-- <div class='fr'>\n      <ifbp-search :template-code='searchTemplateCode' @search='handleSearch'></ifbp-search>\n    </div> -->\n  </div>\n\n  <!-- 利率列表 -->\n  <div id='list' class='list-main-container clearfix'>\n    <!--模板组件-->\n    <ifbp-template ref='prjApproval-table'\n                  tplId='prjApproval-table-template'\n                  :funnode='funnode'\n                  :nexuskey='nexuskey'\n                  :tplData='tableData'\n                  show-type='table'\n                  :tplResetFun='templateTableFormResetFun'\n                  @search-table-click='tableSearchClick'\n                  @delete-table-click='tableDeleteClick' >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='currentPage' :page-sizes='pageSizes'\n      :page-size='pageSize' layout='total, sizes, prev, pager, next, jumper' :total='totalElements'>\n    </el-pagination>\n  \n    <!--删除确认Dialog-->\n    <el-dialog\n      title='提示'\n      v-model='delDialogVisible'\n      @update:visible='val => delDialogVisible = val'\n      :modal='true'\n      size='tiny'>\n      <span>确认删除该数据？</span>\n      <span slot='footer' class='dialog-footer'>\n        <el-button @click='delDialogVisible = false'>取 消</el-button>\n        <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>\n      </span>\n    </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectapplyinfo/project-detail.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../detail-mock.js";
  // import ElTemplate from "../../../template.vue";
  // import ifbpPanelGroup from "../../../ifbp-panel-group.vue";
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate,
    //   "ifbp-panel-group": ifbpPanelGroup
    // },
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        pk_project: '',
        linkmanDelVisible: false,
        custbankDelVisible: false,
        custCountryTaxesDelVisible: false,
  
        //customer
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.projectEdit = !oThis.projectEdit;
          }
        }],
        projectPk: "2c604f78-c8ae-4939-b036-5551ab5d6dd1",
        projectData: {
          customer: {},
          rules: {
            name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
            pk_custclass: [{ required: true, message: "客户基本分类不能为空", trigger: "blur" }]
          }
        },
        projectEdit: false,
  
        // bank
        bankIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custbankRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custbankPk: "000111100000001Z8DZS",
        custbankData: {
          params: {
            pk_banktype: ""
          },
          rules: {
            accnum: [{ required: true, message: "账号不能为空", trigger: "blur" }],
            accname: [{ required: true, message: "户名不能为空", trigger: "blur" }],
            pk_bankdoc: [{ required: true, message: "开户银行不能为空", trigger: "blur" }],
            pk_banktype: [{ required: true, message: "银行类型不能为空", trigger: "blur" }],
            accountproperty: [{ required: true, message: "账户性质不能为空", trigger: "blur" }]
          }
        },
        custbankTplMethods: {
          // form的保存操作
          custbankFormConfirm: function custbankFormConfirm() {
            var _this = this;
  
            this.$refs['bankaccount_form'].validate(function (valid) {
              if (valid) {
                var data = _this.bankaccount;
              }
              console.log(data);
            });
          },
          // form的取消操作
          custbankFormCancel: function custbankFormCancel() {
            this.$refs['bankaccount_table'].closeExpandRow();
            this.formShow = false;
          },
          custbankEditTableRow: function custbankEditTableRow(scope) {
            var row = scope.row;
            this.$refs['bankaccount_table'].expandRow(row);
            this.bankaccount = row;
            this.formShow = false;
          },
          custbankDeleteTableRow: function custbankDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pageComp.custbankDel = scope.row;
            //            this.pk_custbank = scope.row.pk_custbank;
          },
          enableTableRow: function enableTableRow(scope) {
            alert("enable");
            console.log("enable", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pk_custbank = scope.row.pk_custbank;
          }
        },
        custbankResetFun: function custbankResetFun($node) {
          var $table = this.getNodeById($node, "no5ii9v42op");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custbankEditTableRow",
            icon: "edit"
          }, {
            title: "启用",
            click: "enableTableRow",
            icon: "pt-tuichu"
          }, {
            title: "删除",
            click: "custbankDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $accnum = this.getNodeBy_Id($node, "krvqs7xlxfs"); //账号 
          var $accname = this.getNodeBy_Id($node, "83oyd6v35wm"); //户名
          var $pkBankdoc = this.getNodeBy_Id($node, "r69m5jd8zul"); //开户银行
          var $pkBanktype = this.getNodeBy_Id($node, "bo4dg59b0v"); //银行类别
          var $contactpsn = this.getNodeBy_Id($node, "vpthxzig1da"); //联系人
          var $tel = this.getNodeBy_Id($node, "k3bvpmgm9m"); //联系电话
  
          $accnum.html('<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>');
          $accname.html('<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>');
          $pkBankdoc.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." + 'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>');
          $pkBanktype.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." + 'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>');
  
          $contactpsn.html('<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>');
          $tel.html('<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>');
          return $node[0].outerHTML;
        },
  
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs['linkman_table'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }],
        custlinkmanPk: "34cc4979-181e-44dc-9cd7-79ab1b51738d", //linkman
        custlinkmanData: {
          rules: {
            name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = this.getNodeBy_Id($node, "zxhlnr94qvd");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custlinkmanEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custlinkmanDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $sex = this.getNodeBy_Id($node, "ir66pzdxiic"); //性别
          var $isdefault = this.getNodeBy_Id($node, "h81qk6u00p5"); //是否默认
          $sex.html('<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>');
          $isdefault.html('<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>');
          return $node[0].outerHTML;
        },
        custlinkmanTplMethods: {
          // form的保存操作
          linkmanFormConfirm: function linkmanFormConfirm() {
            var _this2 = this;
  
            this.$refs['linkman_form'].validate(function (valid) {
              if (valid) {
                var data = _this2.linkman;
              }
              console.log(data);
            });
          },
          // form的取消操作
          linkmanFormCancel: function linkmanFormCancel() {
            this.$refs['linkman_table'].closeExpandRow();
            this.formShow = false;
          },
          // table行的编辑操作
          custlinkmanEditTableRow: function custlinkmanEditTableRow(scope) {
            var row = scope.row;
            this.$refs['linkman_table'].expandRow(row);
            this.linkman = row;
            this.formShow = false;
          },
          // table行的删除操作
          custlinkmanDeleteTableRow: function custlinkmanDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.linkmanDel = scope.row;
            this.pageComp.linkmanDelVisible = true;
            this.pageComp.pk_linkman = scope.row.pk_linkman;
          }
        },
  
        // 税类信息
        countryTaxesIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custCountryTaxesPk: "7a7287cf-0833-4009-8cc5-c18cf0e2c4ce", //custaxes
        custCountryTaxesData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        custCountryTaxesResetFun: function custCountryTaxesResetFun($node) {
          var $table = this.getNodeBy_Id($node, "xnl0066wpf9");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custCountryTaxesEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custCountryTaxesDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
  
          $table.append(operateHtml);
  
          var $pkCountry = this.getNodeBy_Id($node, "u5itmgcx7c");
          var $pkTaxes = this.getNodeBy_Id($node, "1idpzwci9up");
          $pkCountry.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_country_ref?" + 'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' + "</div></template>");
  
          $pkTaxes.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_taxes_ref?" + 'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' + "</div></template>");
  
          return $node[0].outerHTML;
        },
        custCountryTaxesTplMethods: {
          // form的保存操作
          custCountryFormConfirm: function custCountryFormConfirm() {
            var data = this.custaxes;
            console.log(data);
          },
          // form的取消操作
          custCountryFormCancel: function custCountryFormCancel() {
            this.$refs['custaxes_table'].closeExpandRow();
            this.formShow = false;
          },
          custCountryTaxesEditTableRow: function custCountryTaxesEditTableRow(scope) {
            var row = scope.row;
            this.$refs['custaxes_table'].expandRow(row);
            this.custaxes = row;
            this.formShow = false;
          },
          custCountryTaxesDeleteTableRow: function custCountryTaxesDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custCountryTaxesDelVisible = true;
            this.pageComp.custtaxtypesDel = scope.row;
          }
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   单个地点详情
         **/
      request: function request() {
        this.pk_project = this.$root.$router.currentRoute.params.id;
        //请求客户基本信息详情
        if (this.pk_project) {
          debugger;
          this.requestCustBaseInfo();
        }
        //        //客户银行账户列表
        this.requestCustBank();
        //        客户联系人联系人列表
        this.requestCustlinkman();
        //客户税务类别列表
        this.requestCustCountryTaxes();
      },
  
      //请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this3 = this;
  
        debugger;
        this.$http({
          url: "/yls-busi-web/prj/getbyid",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_project
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(_this3.$refs.baseTemplateRef);
            _this3.$refs.baseTemplateRef.setData("project", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this3.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户银行账户
      requestCustBank: function requestCustBank() {
        var _this4 = this;
  
        this.$http({
          url: "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var custbankOriginal = res.data.data;
            _this4.$refs.custbankRef.setData("bankaccount", JSON.parse(JSON.stringify(custbankOriginal)));
            _this4.$nextTick(function () {
              _this4.$refs.custbankRef.setData("tableShow", false);
            });
          } else {
            _this4.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this4.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this5 = this;
  
        this.$http({
          url: "/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            console.log(_this5.$refs.custlinkmanRef);
            //             this.custlinkmanData = {
            //               linkman_t :  JSON.parse(JSON.stringify(this.originalValue))
            //             };
            _this5.$refs.custlinkmanRef.setData("linkman_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this5.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this5.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户国家税类
      requestCustCountryTaxes: function requestCustCountryTaxes() {
        var _this6 = this;
  
        this.$http({
          url: "/uapbd/custcountrytaxes/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            //            this.custCountryTaxesData = {
            //              custaxes_t :  JSON.parse(JSON.stringify(this.originalValue))
            //            };
            _this6.$refs.custCountryTaxesRef.setData("custaxes_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this6.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this6.$message({
            message: "客户国家税类信息获取失败",
            type: "error"
          });
        });
      },
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this7 = this;
  
        var delData = {};
        delData.linkman = this.linkmanDel;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custlinkman/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this7.$message({
              message: res.data.msg,
              type: "success"
            });
            _this7.linkmanDelVisible = false;
            _this7.requestCustlinkman();
          } else {
            _this7.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this7.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custbankDeleteClick: function custbankDeleteClick() {
        var _this8 = this;
  
        var delData = this.custbankDel;
        var ts = this.$refs.baseTemplateRef.comp.customer.ts;
        delData.ts = ts;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custbank/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this8.$message({
              message: res.data.msg,
              type: "success"
            });
            _this8.custbankDelVisible = false;
            _this8.requestCustBank();
          } else {
            _this8.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this8.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custCountryTaxesDeleteClick: function custCountryTaxesDeleteClick() {
        var _this9 = this;
  
        this.custtaxtypesDel.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custcountrytaxes/delete",
          method: "post",
          data: this.custtaxtypesDel
        }).then(function (res) {
          if (res.data.status === true) {
            _this9.$message({
              message: res.data.msg,
              type: "success"
            });
            _this9.custCountryTaxesDelVisible = false;
            _this9.requestCustCountryTaxes();
          } else {
            _this9.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this9.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.projectEdit = false;
        // 重置value
      },
      customerConfirm: function customerConfirm() {
        var _this10 = this;
  
        var url;
        var data = this.$refs.baseTemplateRef.comp.project;
        var baseUrl = '/yls-busi-web/';
        if (this.pk_project) {
          url = baseUrl + 'prj/update';
        } else {
          url = baseUrl + 'prj/create';
        }
        this.$refs.baseTemplateRef.comp.$refs["project-form"].validate(function (valid) {
          if (valid) {
            _this10.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.status === true) {
                _this10.$message({
                  message: res.data.msg,
                  type: "success"
                });
                _this10.originalValue = res.data.data;
                console.log(_this10.$refs.baseTemplateRef);
                _this10.$refs.baseTemplateRef.setData("project", JSON.parse(JSON.stringify(_this10.originalValue)));
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                _this10.projectEdit = false;
              } else {
                _this10.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this10.$message({
                message: "地点更新失败",
                type: "error"
              });
            });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">项目信息设置</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <ifbp-panel id=\"basePanel\" title=\"基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"projectPk\"\n                  show-type=\"form\"\n                  :tplData=\"projectData\"\n                  :editable=\"projectEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"projectEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <ifbp-panel id=\"bankPanel\" title=\"银行账户信息\" :icons=\"bankIcons\">\n        <ifbp-template ref=\"custbankRef\"\n                      tplId=\"bankTemplate\"\n                      :pkTemp=\"custbankPk\"\n                      :tplData=\"custbankData\"\n                      :tplResetFun=\"custbankResetFun\"\n                      :tplMethods=\"custbankTplMethods\"\n                      form-confirm-fun=\"custbankFormConfirm\"\n                      form-cancel-fun=\"custbankFormCancel\"\n                      show-type=\"table-form\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <ifbp-template ref=\"custlinkmanRef\"\n                      tplId=\"linkmanTemplate\"\n                      :pkTemp=\"custlinkmanPk\"\n                      :tplData=\"custlinkmanData\"\n                      :tplResetFun=\"linkmanResetFun\"\n                      :tplMethods=\"custlinkmanTplMethods\"\n                      form-confirm-fun=\"linkmanFormConfirm\"\n                      form-cancel-fun=\"linkmanFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"countryTaxesPanel\" title=\"税类信息\" :icons=\"countryTaxesIcons\">\n        <ifbp-template ref=\"custCountryTaxesRef\"\n                      tplId=\"countryTaxesTemplate\"\n                      :pkTemp=\"custCountryTaxesPk\"\n                      :tplData=\"custCountryTaxesData\"\n                      :tplResetFun=\"custCountryTaxesResetFun\"\n                      :tplMethods=\"custCountryTaxesTplMethods\"\n                      form-confirm-fun=\"custCountryFormConfirm\"\n                      form-cancel-fun=\"custCountryFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custbankDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custbankDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custbankDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"linkmanDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"linkmanDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n\n  <!-- 客户国家税类 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custCountryTaxesDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custCountryTaxesDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custCountryTaxesDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectapplyinfo/project-info.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../info-mock.js";
  // // import ElTemplate from "../../../template.vue";
  // import testSearchTemplate from './testSearchTemplate.json';
  
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate
    // },
    data: function data() {
      var oThis = this;
      return {
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
        projectPk: "2c604f78-c8ae-4939-b036-5551ab5d6dd1",
        showDeleteButton: false,
        search_input: "",
        isHide: true,
        totalElements: 0,
        currentPage: 1,
        size: 10,
        delDialogVisible: false,
        multiDelDialogVisible: false,
  
        projectTableData: {},
        projectTableMethods: {},
        projectTableResetFun: function projectTableResetFun($node) {
          var $table = this.getNodeById($node, "xs02hwzrbjl");
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
  
        // 待删除 begin
        code: "",
        name: "",
        ts: "",
        mobile: "",
        enablestate: "",
        search_options: [{
          label: "全部",
          value: ""
        }, {
          label: "未启用",
          value: 1
        }, {
          label: "已启用",
          value: 2
        }, {
          label: "已停用",
          value: 3
        }]
        // 待删除 end
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
    methods: {
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/projectbase/detail/" + scope.row.pk_project;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        debugger;
        this.delDialogVisible = true;
        this.delId = scope.row.pk_project;
      },
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      searchInputEnterClick: function searchInputEnterClick() {
        alert(this.search_input);
      },
      request: function request(n, s) {
        var _this = this;
  
        var url;
        // var search =
        //   "&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
        // if (n === undefined) {
        //   url = "/uapbd/custbaseinfo/pageList?pn=1&ps=10&sortColumn=" + search;
        // } else {
        //   url = "/uapbd/custbaseinfo/pageList?pn=" + n + "&ps=" + s + search;
        // }
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'prj/pagelist';
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "pk_project"
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
          _this.originalValue = res.data.data.content;
          _this.$refs["template-table"].setData("project_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      handleSizeChange: function handleSizeChange(val) {
        this.size = val;
        var maxPage = parseInt(this.totalElements / val) + 1;
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentPage = val;
        this.request(this.currentPage - 1, this.size);
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
        this.searchTemplate = testSearchTemplate;
        this.conditionList = testSearchTemplate.conditionList;
      },
  
      // 设置选中
      selectConditionOption: function selectConditionOption(optionList, option, ctrltype) {
        // console.log(arguments);
        var optionSelected = false;
        var options = optionList.options;
        if (option && option.selected) {
          optionSelected = true;
        }
        if (ctrltype === 'DateComponent') {
          if (!optionList.def_min_value && !optionList.def_max_value && !option) {
            // 修复 el-date-picker 置空时引起的bug
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
        // 改到 el-date-picker@change 时修改
        // if (startDay) {
        //   startDay = this.formatDate(startDay);
        // }
        // if (endDay) {
        //   endDay = this.formatDate(endDay);
        // }
        if (startDay && endDay) {
          dateString = startDay + ' 至 ' + endDay;
        } else if (startDay) {
          dateString = startDay + '之后';
        } else {
          dateString = endDay + '之前';
        }
        return dateString;
      },
  
  
      // 已选中数值格式整理
      formatSelectedNumber: function formatSelectedNumber(min, max) {
        if (min && max) {
          return min + '-' + max + '万元';
        } else if (min) {
          return min + '万元及以上';
        } else {
          return '低于' + max + '万元';
        }
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
      },
  
      // 跳转到添加地点页面
      updataProjectInfo: function updataProjectInfo() {
        location.hash = "/projectbase/add";
      },
      multiDeleteDialgShow: function multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
  
  
      /**
         *  启用状态修改
         *
         * */
      stateTableRow: function stateTableRow(row) {
        var _this2 = this;
  
        // 操作列增加启用按钮
        this.$http({
          url: "/uapbd/addressdoc/enable/" + row.pk_customer,
          method: "post"
        }).then(function (res) {
          if (res.data.status === true) {
            _this2.$message({
              message: res.data.msg,
              type: "success"
            });
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        debugger;
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'prj/deletebyid';
        var delId = this.delId; //this.$refs["template-table"].comp.delId;
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: delId
        }).then(function (res) {
          if (res.data.status === true) {
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
        })["catch"](function () {
          _this3.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      multiDeleteClick: function multiDeleteClick() {
        var tableSelections = this.$refs["template-table"].comp.$refs["customer_table"].getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_customer;
            delIds.push(id);
          }
        }
        console.log("multi" + delIds);
        return;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">项目-全局</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"updataProjectInfo\">新增</el-button>\n      <el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请选择编码/客户\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- <el-row type=\"flex\" justify=\"end\">\n    <el-col :span=\"2\">\n      <el-button @click=\"search\">搜索</el-button>\n    </el-col>\n  </el-row> -->\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag v-if=\"condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\"\n      >\n        {{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n\n  <!-- 搜索参数 -->\n  <template>\n\n    <!-- 前三条平铺条件 -->\n    <el-row\n      :gutter=\"10\"\n      v-for=\"(condition, index) in conditionList\"\n      :key=\"condition.fieldcode\"\n      v-if=\"index < 3\">\n      <!-- 条件名 -->\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">{{condition.fieldname}}:</span>\n      </el-col>\n      <!-- 条件选项 -->\n      <el-col class=\"condition-options\" :span=\"22\" :sm=\"21\" :xs=\"21\">\n\n        <!-- 通用选项 -->\n        <template v-if=\"condition.optionList.options.length\">\n          <span\n            v-for=\"option in condition.optionList.options\"\n            :key=\"option.value\"\n            class=\"condition-option\"\n            :class=\"{selected: option.selected}\"\n            @click=\"selectConditionOption(condition.optionList, option, condition.ctrltype)\"\n          >{{option.name}}</span>\n        </template>\n\n        <!-- 数值字段 -->\n        <template v-if=\"condition.ctrltype === 'NumberComponent'\">\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_min_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最小值\">\n            </el-input>\n          </div>\n            -\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最大值\">\n            </el-input>\n          </div>\n        </template>\n\n        <!-- 日期字段 -->\n        <template v-else-if=\"condition.ctrltype === 'DateComponent'\">\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_min_value\"\n              format=\"yyyy-MM-dd HH:mm:ss\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n            -\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n        </template>\n      </el-col>\n    </el-row>\n\n    <!-- 高级条件 -->\n    <el-row :gutter=\"10\">\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">高级:</span>\n      </el-col>\n      <!-- 条件名 -->\n      <el-col class=\"advanced-conditions\" :span=\"18\" :sm=\"13\" :xs=\"13\">\n        <span v-for=\"(condition, index) in conditionList\"\n          v-if=\"index >= 3\"\n          class=\"advanced-condition\"\n          :class=\"{current: currentConditionCode === condition.fieldcode}\"\n          :key=\"condition.fieldcode\"\n          @click=\"setCurrentCondition(condition)\">\n          {{condition.fieldname}}\n          <i class=\"el-icon-arrow-up\" v-if=\"currentConditionCode === condition.fieldcode\"></i>\n          <i class=\"el-icon-arrow-down\" v-else></i>\n        </span>\n      </el-col>\n\n      <!-- 按钮 -->\n      <el-col class=\"advanced-search-btns\" :span=\"4\" :sm=\"8\" :xs=\"8\">\n        <el-button type=\"primary\" class=\"button-no-radius\">搜索</el-button>\n        <el-button class=\"button-no-radius\">清空</el-button>\n      </el-col>\n    </el-row>\n  </template>\n\n  <!-- 当前选中的条件选项 -->\n  <div class=\"current-condition-options\" v-if=\"currentCondition\">\n\n    <!-- 通用选项 -->\n    <template v-if=\"currentCondition.optionList.options.length\">\n      <span\n        v-for=\"option in currentCondition.optionList.options\"\n        :key=\"option.value\"\n        class=\"condition-option\"\n        :class=\"{selected: option.selected}\"\n        @click=\"selectConditionOption(currentCondition.optionList, option, currentCondition.ctrltype)\"\n      >{{option.name}}</span>\n    </template>\n\n    <!-- 数值字段 -->\n    <template v-if=\"currentCondition.ctrltype === 'NumberComponent'\">\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_min_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最小值\">\n        </el-input>\n      </div>\n        -\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最大值\">\n        </el-input>\n      </div>\n    </template>\n\n    <!-- 日期字段 -->\n    <template v-else-if=\"currentCondition.ctrltype === 'DateComponent'\">\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_min_value\"\n          format=\"yyyy-MM-dd HH:mm:ss\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n        -\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n    </template>\n  </div>\n</div>\n\n  <!-- 主体区域 -->\n  <div class=\"list-main-container clearfix\">\n    <!--新模板组件:tplCode=\"tplCode\"-->\n    <ifbp-template ref=\"template-table\"\n                  tplId=\"project-table-template\"\n                  :pkTemp=\"projectPk\"\n                  :tplData=\"projectTableData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"projectTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      :current-page=\"currentPage\"\n      :page-sizes=\"[10, 20, 30, 40]\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalElements\">\n    </el-pagination>\n  </div>\n  \n  <!--删除确认Dialog-->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"multiDelDialogVisible\"\n    @update:visible=\"val => multiDelDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除所选数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"multiDelDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"multiDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!--数据加载过程中页面最上端显示的层-->\n  <!-- <div id=\"cover\" ref=\"cover\">\n    <div class=\"el-loading-spinner\">\n      <svg viewBox=\"25 25 50 50\" class=\"circular\">\n        <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" class=\"path\"></circle>\n      </svg>\n    </div>\n  </div> -->\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectinfo/ContSource.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type"],
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        ContSourceDelVisible: false,
        rmoveindex: "",
        delId: "",
        funnode: "BT008",
        nexusKey: "prj_cont_source",
        ContSourceData: {
          rules: {},
          midAccountParams: {}
        },
        ContSourceResetFun: function ContSourceResetFun($node) {
  
          var $refResourceCustomer = this.getNodeById($node, 'puvynqv5aps'); //客户名称
  
          if ($refResourceCustomer.length) {
            $refResourceCustomer.attr("v-on:trigger", "handleRefChange");
          }
  
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
        },
  
        t_Methods: {
  
          handleRefChange: function handleRefChange(type, data) {
            if (type === 'change') {
              var param = { 'pk_customer': data.value[0].id };
              oThis.$refs.ContSourceRef.setData('midAccountParams', param);
            }
          }
  
        }
  
      };
    },
  
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      }
    },
  
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestPrjContSource();
      }
    },
  
    //获取数据初始化操作
    created: function created() {},
  
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
  
    methods: {
      request: function request() {
        if (this.pk_prjId != "") {
          this.requestPrjContSource();
        }
      },
  
  
      //请求合同来源信息表格数据
      requestPrjContSource: function requestPrjContSource() {
        var _this = this;
  
        var url = _publicData.ylsBusi + "prj/contSource/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
  
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_prjId
              }]
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
          _this.ContSourceData = res.data.data.content;
          _this.$refs["ContSourceRef"].setData("ContSource_t", JSON.parse(JSON.stringify(_this.ContSourceData)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
  
      //合同来源信息取消按钮
      ContSourceFormCancel: function ContSourceFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["ContSourceRef"].comp.formShow = false;
        } else {
          this.$refs["ContSourceRef"].getTableComp().closeExpandRow();
          var sourceData = this.$refs.ContSourceRef.getData("ContSource_t");
          sourceData[this.resourceEditIndex] = this.resourceEditBakData;
          this.$refs.ContSourceRef.setData("ContSource_t", sourceData);
        }
      },
  
      //合同来源信息保存
      ContSourceFormConfirm: function ContSourceFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.ContSourceRef.comp.ContSource;
  
        data.source_bill = this.pk_prjId;
        if (data.pk_prj_source) {
          url = _publicData.ylsBusi + '/prj/contSource/update';
        } else {
          url = _publicData.ylsBusi + '/prj/contSource/create';
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
            _this2.requestPrjContSource();
            _this2.$refs["ContSourceRef"].comp.formShow = false;
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
  
      //合同来源信息行编辑
      ContSourceFormedit: function ContSourceFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs.ContSourceRef.getTableComp().expandRow(row);
        this.$refs.ContSourceRef.formShow = false;
        //ContSource为表单数据对象参数
        this.$refs.ContSourceRef.setData("ContSource", row);
        this.resourceEditBakData = JSON.parse(JSON.stringify(scope.row));
        this.resourceEditIndex = scope.$index;
      },
  
      // 合同来源信息行删除提示
      ContSourceFormdelete: function ContSourceFormdelete(scope) {
        this.ContSourceDelVisible = true;
        this.delId = scope.row.pk_prj_source;
      },
  
      //合同来源信息行删除方法
      ContSourceDeleteClick: function ContSourceDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/prj/contSource/deleteById",
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
            _this3.requestPrjContSource();
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
        this.ContSourceDelVisible = false;
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
  __vue__options__.template = "\r\n<!--项目来源管理模块-->\r\n<div>\r\n    <ifbp-template ref=\"ContSourceRef\"\r\n                  tplId=\"ContSource\"\r\n                  :funnode=\"funnode\"\r\n                  :nexuskey=\"nexusKey\"\r\n                  :tplData=\"ContSourceData\"\r\n                  :tplResetFun=\"ContSourceResetFun\"\r\n                  @form-confirm-click=\"ContSourceFormConfirm\"\r\n                  @form-cancel-click=\"ContSourceFormCancel\"\r\n                  show-type=\"table-form\"\r\n                  :methods=\"t_Methods\"\r\n                  @edit-table-click=\"ContSourceFormedit\"\r\n                  @delete-table-click=\"ContSourceFormdelete\"\r\n                  >\r\n    </ifbp-template>\r\n\r\n    <!-- 项目来源 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"ContSourceDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"ContSourceDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"ContSourceDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectinfo/ProviderPanel.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ['source_bill', 'type'],
    data: function data() {
      var oThis = this;
      //校验
  
      return {
        scrollDom: document.getElementsByClassName('view')[0],
        contProviderDelVisible: false,
        rmoveindex: '',
        delId: '',
        //供应商标签
        contProviderIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.source_bill === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            var uitemplateComp = oThis.$refs.contProviderRef.comp;
            var table = uitemplateComp.$refs['contProvider_t_ref'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.contProviderRef.setData('contProvider', {
              // mobile:'13'
            });
            oThis.rmoveindex = '';
            uitemplateComp.$refs['contProvider_ref'].resetFields();
          }
        }],
        //type=prj 然后项目ui_id:8e13c344-fe4b-4e0c-a171-8e18395ee236 否者a7715073-8a24-420a-86de-9110786e8e4b
        funnode: oThis.type === 'prj' ? 'BT008' : 'BT008',
        nexusKey: oThis.type === 'prj' ? 'prjProviderUI' : oThis.type === 'prjApproval' ? 'prjApproval_provider' : 'prjProviderUI',
        contProviderData: {
          linkManParams: {},
          providerParams: {},
          rentParams: { 'pk_customer': 'yls_dev100000001pqc' //出租人  （一般写成固定 pk）
          } },
        //渲染表格
        contProviderResetFun: function contProviderResetFun($node) {
          //获取需要过滤的控件(type === prj)
          // let $salesCustomer = this.getNodeById($node, '5zouflppncd');  //卖方客户主键
          // if($salesCustomer.length) {
          //   $salesCustomer.attr('v-on:trigger', 'saleRefChange'); 
          // }
  
          // let $pkLinkMan = this.getNodeById($node, '6bt70kv30vb');  //承租人主键
          // if($pkLinkMan.length) {
          //   $pkLinkMan.attr('v-on:trigger', 'linkManRefChange'); 
          // }
          //end
  
          var $pkProvider = this.getNodeById($node, 'ibgjz2m7kkd'); //供应商外键
          if ($pkProvider.length) {
            $pkProvider.attr('v-on:trigger', 'pkProviderRefChange');
          }
  
          //项目承租信息表格id：owwkujphew
          var id_co = '';
          if (oThis.type === 'prj') id_co = 'i71amo6wy18';else if (oThis.type === 'contr') id_co = '';else if (oThis.type === 'prjApproval') id_co = 'npnshehd4lh';
          var $table = this.getNodeById($node, id_co);
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
  
        t_Methods: {
          // saleRefChange: function(type, data) {
          //   if(type === 'change') {
          //     let param = {'pk_customer':data.value[0].id};
          //     oThis.$refs.contProviderRef.setData('providerParams',param);
          //   }
          // },
          // linkManRefChange: function(type,data){
          //   if(type === 'change') {
          //     let param = {'pk_customer':data.value[0].id};
          //     oThis.$refs.contProviderRef.setData('linkManParams',param);
          //   }
          // },
          pkProviderRefChange: function pkProviderRefChange(type, data) {
            if (type === 'change') {
              debugger;
              oThis.$refs.contProviderRef.comp.contProvider.provider_code = data.value[0].refcode; //供应商编码
              oThis.$refs.contProviderRef.comp.contProvider.identity_num = data.value[0].identity_num; //证件号码
              oThis.$refs.contProviderRef.comp.contProvider.capital = data.value[0].capital; //注册资本
              oThis.$refs.contProviderRef.comp.contProvider.capital_paidin = data.value[0].capital_paidin; //实收资本
              oThis.$refs.contProviderRef.comp.contProvider.pk_legal_person = data.value[0].pk_legal_person; //法定代表人
              oThis.$refs.contProviderRef.comp.contProvider.establish_date = data.value[0].establish_date; //成立时间
              oThis.$refs.contProviderRef.comp.contProvider.comm_addr = data.value[0].comm_addr; //通讯地址
              oThis.$refs.contProviderRef.comp.contProvider.comm_mail = data.value[0].comm_mail; //通讯邮编
              // this.$refs['contProvider_ref'].model.customer_code = data.value[0].refcode;
              // this.$refs['contProvider_ref'].model.society_credit = data.value[0].society_credit;
              // this.$refs['contProvider_ref'].model.capital = data.value[0].capital;
              // this.$refs['contProvider_ref'].model.capital_paidin = data.value[0].capital_paidin;
              // this.$refs['contProvider_ref'].model.legal_person_name = data.value[0].legal_person_name;
              // this.$refs['contProvider_ref'].model.establish_date = data.value[0].establish_date;
              // this.$refs['contProvider_ref'].model.comm_addr = data.value[0].comm_addr;
              // this.$refs['contProvider_ref'].model.comm_mail = data.value[0].comm_mail;
            }
          }
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestPrjcontProvider();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != '' && this.source_bill != undefined) {
          this.requestPrjcontProvider();
        }
      },
  
      //请求业务供应商
      requestPrjcontProvider: function requestPrjcontProvider() {
        var _this = this;
  
        var data = {
          'orderList': [{
            'direction': 'desc',
            'property': 'ts'
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'prj/provider/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          var originalValue = res.data.data.content;
          _this.$refs['contProviderRef'].setData('contProvider_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //供应商取消按钮
      contProviderFormCancel: function contProviderFormCancel(type) {
        this.rmoveindex = '';
        //关闭表单或者是下拉显示行
        if (type === 'form') {
          this.$refs['contProviderRef'].comp.formShow = false;
        } else {
          this.$refs['contProviderRef'].getTableComp().closeExpandRow();
          var providerBakData = this.$refs.contProviderRef.getData('contProvider_t');
          providerBakData[this.providerEditIndex] = this.providerEditBakData;
          this.$refs.contProviderRef.setData('contProvider_t', providerBakData);
        }
      },
      //供应商主表保存
      contProviderFormConfirm: function contProviderFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = '';
        var data = this.$refs.contProviderRef.comp.contProvider;
        data.source_bill = this.source_bill;
        if (data.pk_prj_provider) {
          url = _publicData.ylsBusi + 'prj/provider/update';
        } else {
          url = _publicData.ylsBusi + 'prj/provider/create';
        }
        //保存校验
        this.$refs.contProviderRef.comp.$refs['contProvider_ref'].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                _this2.requestPrjcontProvider();
                _this2.$refs['contProviderRef'].comp.formShow = false;
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
  
            //回写到单位客户表里去
            var writeback = {};
            writeback.pk_customer = _this2.$refs.contProviderRef.comp.contProvider.pk_provider_name; //客户外键
            writeback.customer_code = _this2.$refs.contProviderRef.comp.contProvider.provider_code; //编码
            writeback.society_credit = _this2.$refs.contProviderRef.comp.contProvider.identity_num; //证件号码
            writeback.capital = _this2.$refs.contProviderRef.comp.contProvider.capital; //注册资本
            writeback.capital_paidin = _this2.$refs.contProviderRef.comp.contProvider.capital_paidin; //实收资本
            writeback.pk_legal_person = _this2.$refs.contProviderRef.comp.contProvider.pk_legal_person; //法定代表人
            writeback.establish_date = _this2.$refs.contProviderRef.comp.contProvider.establish_date; //成立时间
            writeback.comm_addr = _this2.$refs.contProviderRef.comp.contProvider.comm_addr; //通讯地址
            writeback.comm_mail = _this2.$refs.contProviderRef.comp.contProvider.comm_mail; //通讯邮编
  
            _this2.$http({
              url: _publicData.ylsBusi + 'cust/corp/updateOptionalByPkCustomer',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: JSON.parse(JSON.stringify(writeback))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: '回写成功！',
                  type: 'success'
                });
              } else {
                _this2.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })["catch"](function () {
              _this2.$message({
                message: '回写失败',
                type: 'error'
              });
            });
          }
        });
      },
      //供应商行编辑
      contProviderFormedit: function contProviderFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['contProviderRef'].getTableComp().expandRow(row);
        this.$refs['contProviderRef'].formShow = false;
        //contProvider为表单数据对象参数
        this.$refs['contProviderRef'].setData('contProvider', row);
        this.providerEditBakData = JSON.parse(JSON.stringify(scope.row));
        this.providerEditIndex = scope.$index;
      },
      // 供应商删除提示
      contProviderFormdelete: function contProviderFormdelete(scope) {
        this.contProviderDelVisible = true;
        this.delId = scope.row.pk_prj_provider;
      },
      // 供应商删除方法
      contProviderDeleteClick: function contProviderDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'prj/provider/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestPrjcontProvider();
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
        this.contProviderDelVisible = false;
        this.delId = '';
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
  __vue__options__.template = "\n<!--供应商管理模块-->\n<div>\n  <ifbp-template ref='contProviderRef'\n    tplId='contProvider'\n    :funnode='funnode'\n    :nexuskey='nexusKey'\n    :tplData='contProviderData'\n    :tplResetFun='contProviderResetFun'\n    @form-confirm-click='contProviderFormConfirm'\n    @form-cancel-click='contProviderFormCancel'\n    show-type='table-form'\n    :methods='t_Methods'\n    @edit-table-click='contProviderFormedit'\n    @delete-table-click='contProviderFormdelete'\n  >\n  </ifbp-template>\n\n  <!-- 供应商 删除提示框 -->\n  <el-dialog\n    title='提示'\n    v-model='contProviderDelVisible'\n    :modal='true'\n    size='tiny'>\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot='footer' class='dialog-footer'>\n      <el-button @click=\"contProviderDelVisible = false , this.delId=''\">取 消</el-button>\n      <el-button type='primary' @click='contProviderDeleteClick'>确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectinfo/project-account.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        projectAccountDelVisible: false,
        rmoveindex: "",
        delId: "",
  
        funnode: "BT008",
  
        nexusKey: "prj_account",
  
        //收付各方条件
        projectAccountIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.projectAccountRef.comp;
            var table = uitemplateComp.$refs["ProjectAccount_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.projectAccountRef.setData("ProjectAccount", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["ProjectAccount_ref"].resetFields();
          }
        }],
  
        projectAccountData: {
          rules: {}
        },
        //渲染表格
        projectAccountResetFun: function projectAccountResetFun($node) {
  
          var $table = this.getNodeById($node, "hp7r5u13d3welfj6rs4cayvi");
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestProjectAccount();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_prjId != "") {
          this.requestProjectAccount();
        }
      },
  
      //请求业务收付各方条件
      requestProjectAccount: function requestProjectAccount() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "contr/projectAccount/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "source_bill"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_prjId
              }]
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
  
          console.log();
          _this.originalValue = res.data.data.content;
          console.log(_this.originalValue);
          _this.$refs["projectAccountRef"].setData("ProjectAccount_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //收付各方条件取消按钮
      projectAccountFormCancel: function projectAccountFormCancel(type) {
        debugger;
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["projectAccountRef"].comp.formShow = false;
        } else {
          this.$refs["projectAccountRef"].getTableComp().closeExpandRow();
          var accountDatas = this.$refs.projectAccountRef.getData("ProjectAccount_t");
          accountDatas[this.accountEditBakIndex] = this.accountEditBakData;
          this.$refs.projectAccountRef.setData("ProjectAccount_t", accountDatas);
        }
      },
      //收付各方条件主表保存
      projectAccountFormConfirm: function projectAccountFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.projectAccountRef.comp.ProjectAccount;
        data.source_bill = this.pk_prjId;
        if (data.pk_prj_account) {
          url = _publicData.ylsBusi + 'contr/projectAccount/update';
        } else {
          url = _publicData.ylsBusi + 'contr/projectAccount/create';
        }
        //保存校验
        this.$refs.projectAccountRef.comp.$refs["ProjectAccount_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.projectAccountRef.getData("ProjectAccount_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                _this2.$refs.projectAccountRef.setData("proRentThing_t", JSON.parse(JSON.stringify(linarraydata)));
                _this2.$refs["projectAccountRef"].comp.formShow = false;
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
        });
      },
      //收付各方条件行编辑
      projectAccountFormedit: function projectAccountFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["projectAccountRef"].getTableComp().expandRow(row);
        this.$refs["projectAccountRef"].comp.formShow = false;
        //ProjectAccount为表单数据对象参数
        this.$refs["projectAccountRef"].setData("ProjectAccount", row);
        this.accountEditBakData = JSON.parse(JSON.stringify(row));
        this.accountEditBakIndex = scope.$index;
      },
      // 收付各方条件删除提示
      projectAccountFormdelete: function projectAccountFormdelete(scope) {
        this.projectAccountDelVisible = true;
        this.delId = scope.row.pk_prj_account;
      },
      // 收付各方条件删除方法
      projectAccountDeleteClick: function projectAccountDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "contr/projectAccount/deleteById",
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
            _this3.requestProjectAccount();
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
        this.projectAccountDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--收付各方条件管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"projectAccountRef\"\r\n                        tplId=\"projectAccount-template\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"projectAccountData\"\r\n                        :tplResetFun=\"projectAccountResetFun\"\r\n                        @form-confirm-click=\"projectAccountFormConfirm\"\r\n                        @form-cancel-click=\"projectAccountFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"projectAccountFormedit\"\r\n                        @delete-table-click=\"projectAccountFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务收付各方条件 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"projectAccountDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"projectAccountDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"projectAccountDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectinfo/project-info-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _busi_rentting = require('yls^busi/project/src/buni/busi_rentting.vue');
  
  var _busi_rentting2 = _interopRequireDefault(_busi_rentting);
  
  var _projectBothLesseePanel = require('yls^busi/project/src/projectinfo/projectBothLesseePanel.vue');
  
  var _projectBothLesseePanel2 = _interopRequireDefault(_projectBothLesseePanel);
  
  var _projectOrginfoPanel = require('yls^busi/project/src/projectinfo/projectOrginfoPanel.vue');
  
  var _projectOrginfoPanel2 = _interopRequireDefault(_projectOrginfoPanel);
  
  var _busi_insure = require('yls^busi/project/src/buni/busi_insure.vue');
  
  var _busi_insure2 = _interopRequireDefault(_busi_insure);
  
  var _busiRelevantParty = require('yls^busi/project/src/buni/busi-relevantParty.vue');
  
  var _busiRelevantParty2 = _interopRequireDefault(_busiRelevantParty);
  
  var _ProviderPanel = require('yls^busi/project/src/projectinfo/ProviderPanel.vue');
  
  var _ProviderPanel2 = _interopRequireDefault(_ProviderPanel);
  
  var _custpledgeInfo = require('yls^busi/project/src/custpledge/custpledge-info.vue');
  
  var _custpledgeInfo2 = _interopRequireDefault(_custpledgeInfo);
  
  var _mortgageInfo = require('yls^busi/project/src/custpledge/mortgage-info.vue');
  
  var _mortgageInfo2 = _interopRequireDefault(_mortgageInfo);
  
  var _pledgeInfo = require('yls^busi/project/src/custpledge/pledge-info.vue');
  
  var _pledgeInfo2 = _interopRequireDefault(_pledgeInfo);
  
  var _ContSource = require('yls^busi/project/src/projectinfo/ContSource.vue');
  
  var _ContSource2 = _interopRequireDefault(_ContSource);
  
  var _paycondition = require('yls^busi/project/src/paycondition/paycondition.vue');
  
  var _paycondition2 = _interopRequireDefault(_paycondition);
  
  var _rentcondition = require('yls^busi/project/src/rentcondition/rentcondition.vue');
  
  var _rentcondition2 = _interopRequireDefault(_rentcondition);
  
  var _pentaltyrulede = require('yls^busi/project/src/pentaltyrulede/pentaltyrulede.vue');
  
  var _pentaltyrulede2 = _interopRequireDefault(_pentaltyrulede);
  
  var _projectAccount = require('yls^busi/project/src/projectinfo/project-account.vue');
  
  var _projectAccount2 = _interopRequireDefault(_projectAccount);
  
  var _tax_message_alter = require('yls^busi/project/src/contractinfo/tax_message_alter.vue');
  
  var _tax_message_alter2 = _interopRequireDefault(_tax_message_alter);
  
  var _rentConditionSelect = require('yls^busi/project/src/projectinfo/rentConditionVM/rent-condition-select.vue');
  
  var _rentConditionSelect2 = _interopRequireDefault(_rentConditionSelect);
  
  var _riskAndControl = require('yls^busi/project/src/projectAnalysis/riskAndControl.vue');
  
  var _riskAndControl2 = _interopRequireDefault(_riskAndControl);
  
  var _projectSummarize = require('yls^busi/project/src/projectAnalysis/projectSummarize.vue');
  
  var _projectSummarize2 = _interopRequireDefault(_projectSummarize);
  
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
      'busirenttingRef': _busi_rentting2["default"],
      'OrginfoRef': _projectOrginfoPanel2["default"],
      'insuranceRef': _busi_insure2["default"],
      'busirelevantPartyRef': _busiRelevantParty2["default"],
      'bothlesseeRef': _projectBothLesseePanel2["default"],
      'custpledgeRef': _custpledgeInfo2["default"],
      'mortgageRef': _mortgageInfo2["default"],
      'pledgeRef': _pledgeInfo2["default"],
      'contProviderRef': _ProviderPanel2["default"],
      'ContSourceRef': _ContSource2["default"],
      'payConditionRef': _paycondition2["default"],
      'rentConditionRef': _rentcondition2["default"],
      'penaltyRuleDeRef': _pentaltyrulede2["default"],
      'projectAccountRef': _projectAccount2["default"],
      'taxMessageAlterRef': _tax_message_alter2["default"],
      'impRentConditionRef': _rentConditionSelect2["default"],
      'RiskControlRef': _riskAndControl2["default"],
      'ProjectSummarizeRef': _projectSummarize2["default"]
    },
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      //校验
      var validatePrj = function validatePrj(rule, value, callback) {
        debugger;
        if (rule.field === 'is_insure') {
          if (value === 'N') {
            oThis.$message({
              message: '是否投保选择否，不能保存！',
              type: 'error'
            });
            callback(new Error(' '));
          } else {
            callback();
          }
        }
      };
      return {
        Leasehold: '',
        scrollDom: document.getElementsByClassName("view")[0],
        pk_project: '',
        pledgeType: 'type0',
        pk_customer: '',
        //是否有共同承租人
        is_lessee_type: '',
        beanMap: { pk_customer: {} },
        rentConditionList: [],
        delDialogVisible: false,
        //租赁方式   租赁方式为直租显示; 其他时该部分不存在
        lease_type: '',
        selDialogVisible: false,
        ifShow: false,
  
        isSublease: true, //是否转租赁
        rentConditionData: {
          rules: {}
        },
  
        delId: '',
  
        rentConditionFun: function rentConditionFun($node) {
          var $table = $node.find("el-table");
          $table.attr(':show-header', 'true');
          var operateArr = [{
            title: "删除",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
  
        //项目编辑
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.projectEdit = !oThis.projectEdit;
          }
        }],
  
        creditIcons: [{
          icon: "edit",
          click: function click() {
            oThis.creditEdit = !oThis.creditEdit;
          }
        }],
  
        funnode: "BT008",
        nexusKey: "projectinfoUI",
        projectData: {
          project: {},
          rules: {
            is_insure: [{ validator: validatePrj, trigger: "blur" }],
            pk_customer: [{ required: true, message: "承租人不能为空", trigger: "blur" }]
          }
        },
        creditData: {},
        projectEdit: false,
        creditEdit: false,
        //租赁物图标
        rentTingIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp.formShow = true;
  
            // var uitemplateComp = oThis.$refs.busirenttingRef.$refs.busirenttingRef.comp;
            // var table = uitemplateComp.$refs["proRentThing_t_ref"];
            // table.closeExpandRow();
            // uitemplateComp.formShow = true;
            // //初始化值
            // oThis.$refs.busirenttingRef.$refs.busirenttingRef.setData("proRentThing", {
            //   // mobile:'13'
            // });
            // oThis.rmoveindex = "";
            // uitemplateComp.$refs["proRentThing_ref"].resetFields();
          }
        }],
        //承租人标签
        bothlesseeIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.resetFormData();
            if (oThis.beanMap.pk_customer_ref || oThis.beanMap.pk_customer_ref !== undefined) {
              oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.setData("projectBothLessee", {
                pk_customer: oThis.pk_customer,
                beanMap: oThis.beanMap,
                customer_code: oThis.beanMap.pk_customer_ref[oThis.pk_customer].refcode,
                legal_person_name: oThis.beanMap.pk_customer_ref[oThis.pk_customer].legal_person_name,
                fax: oThis.beanMap.pk_customer_ref[oThis.pk_customer].fax,
                email: oThis.beanMap.pk_customer_ref[oThis.pk_customer].email,
                realworkmail: oThis.beanMap.pk_customer_ref[oThis.pk_customer].realworkmail,
                realworkplace: oThis.beanMap.pk_customer_ref[oThis.pk_customer].realworkplace,
                client_rating: '',
                pk_account_lessee: '',
                account_bank_l: '',
                bank_no_l: '',
                bank_code_l: '',
                pk_account: '',
                account_bank: '',
                bank_no: '',
                bank_code: '',
                lessee_type: 'MAIN'
              });
            }
            // 显示新增区域
            oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.formShow = true;
            oThis.$nextTick(function () {
              if (oThis.pk_customer !== null) {
                // oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.comp.$refs.pk_account_lessee_ref.changeQueryParams({"pk_customer":oThis.pk_customer});
                oThis.$refs.bothlesseeRef.$refs.bothlesseeRef.setData('pk_account_lessee_ref', { "pk_customer": oThis.pk_customer });
              }
            });
          }
        }],
        //出租人标签
        OrginfoIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.OrginfoRef.$refs.OrginfoRef.comp.formShow = true;
          }
        }],
        //供应商标签
        contProviderIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.formShow = true;
          }
        }],
        //担保信息
        pledgeIcons: [{
          icon: 'plus',
          click: function click() {
            if (oThis.pk_project === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            //显示担保添加
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.resetFormData();
            oThis.$refs.custpledgeRef.$refs.custpledgeRef.comp.formShow = true;
            //显示抵押添加
            oThis.$refs.mortgageRef.$refs.mortgageRef.getTableComp().closeExpandRow();
            oThis.$refs.mortgageRef.$refs.mortgageRef.resetFormData();
            oThis.$refs.mortgageRef.$refs.mortgageRef.comp.formShow = true;
            //显示质押添加
            oThis.$refs.pledgeRef.$refs.pledgeRef.getTableComp().closeExpandRow();
            oThis.$refs.pledgeRef.$refs.pledgeRef.resetFormData();
            oThis.$refs.pledgeRef.$refs.pledgeRef.comp.formShow = true;
          }
        }],
        insuranceIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.insuranceRef.$refs.insuranceRef.comp.formShow = true;
          }
        }],
        //相关方图标
        relevantPartyIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.busirelevantPartyRef.$refs.busirelevantPartyRef.comp.formShow = true;
          }
        }],
        //来源信息图标
        contSourceIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.ContSourceRef.$refs.ContSourceRef.comp.getTableComp().closeExpandRow();
  
            //重置新增数据
            oThis.$refs.ContSourceRef.$refs.ContSourceRef.comp.resetFormData();
  
            //显示新增区域
            oThis.$refs.ContSourceRef.$refs.ContSourceRef.comp.formShow = true;
          }
        }],
  
        //付款条件图标
        payConditionIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.formShow = true;
          }
        }],
  
        //起租条件图标
        rentConditionIcons: [{
          title: "新增",
          icon: "plus",
          click: function click() {
            oThis.selDialogVisible = true;
            //  oThis.impRentConditionRef.refreshPage();
          }
        }],
  
        //逾期利率信息
        penaltyRuleDeIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.penaltyRuleDeRef.$refs.penaltyRuleDeRef.comp.formShow = true;
          }
        }],
  
        //收付各方信息
        projectAccountIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.projectAccountRef.$refs.projectAccountRef.comp.formShow = true;
          }
        }],
  
        //开票方案
        taxMessageAlterIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_project === "") {
              oThis.$message({
                messsage: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.getTableComp().closeExpandRow();
  
            //重置新增数据
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.resetFormData();
  
            //显示新增区域
            oThis.$refs.taxMessageAlterRef.$refs.taxMessageAlterRef.comp.formShow = true;
          }
        }],
  
        //风险及控制措施标签
        RiskIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.RiskControlRef.$refs.RiskControlRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.RiskControlRef.$refs.RiskControlRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.RiskControlRef.$refs.RiskControlRef.comp.formShow = true;
          }
        }],
  
        //项目总结标签
        SummarizeIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_project === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            debugger;
            oThis.$refs.ProjectSummarizeRef.$refs.ProjectSummarizeRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ProjectSummarizeRef.$refs.ProjectSummarizeRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.ProjectSummarizeRef.$refs.ProjectSummarizeRef.comp.formShow = true;
          }
        }]
  
      };
    },
    created: function created() {
      this.request();
    },
  
    methods: {
      isSubleaseFun: function isSubleaseFun(lt) {
  
        if (lt == 'SUBLEASE') {
          this.isSublease = true;
        }
        return this.isSublease;
      },
  
      /**
         *   单个地点详情
         **/
      request: function request() {
        this.pk_project = this.$root.$router.currentRoute.params.id;
        debugger;
        this.lease_type = this.$root.$router.currentRoute.params.lease;
        this.result = this.isSubleaseFun(this.lease_type);
        //请求基本信息详情
        if (this.pk_project === undefined) {
          this.pk_project = "";
          this.projectEdit = true;
          return;
        }
        if (this.pk_project) {
          this.requestprjBaseInfo();
          //请求起租条件
          this.loadRentCondition();
        }
      },
      isShowOrNot: function isShowOrNot() {
        debugger;
        if (this.lease_type == 'LEASEDIRECT') {
          this.ifShow = true;
        }
      },
      closeAddFormEev: function closeAddFormEev() {
        //关闭担保添加表单事件
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
  
      //回退到客户基本信息页面
      goBack: function goBack() {
        this.$emit('change-corp-card', 'toapplycustomerlist');
      },
  
      //请求客户基本信息详情
      requestprjBaseInfo: function requestprjBaseInfo() {
        var _this = this;
  
        debugger;
        this.$http({
          url: "/yls-busi-web/prj/getbyid",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_project
        }).then(function (res) {
          debugger;
          if (res.data.success === true) {
            var originalValue = res.data.data;
            if (_this.result) {
              debugger;
              _this.$refs.creditTemplateRef.setData("projectCredit", JSON.parse(JSON.stringify(originalValue)));
            } else {
              _this.$refs.baseTemplateRef.setData("project", JSON.parse(JSON.stringify(originalValue)));
            }
  
            // this.lease_type = originalValue.lease_type;
            // this.isShowOrNot();
            // //初始化承租人信息
            // this.pk_customer=originalValue.pk_customer;
            // //初始化是否有共同承租人
            // this.is_lessee_type=originalValue.if_co_lessee;
            // this.beanMap.pk_customer_ref=originalValue.beanMap.pk_customer_ref;
            // this.Leasehold=res.data.data.lease_type;
          } else {
            _this.pk_project = '';
            _this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
      projectCancel: function projectCancel() {
        this.projectEdit = false;
        // 重置value
      },
      creditCancel: function creditCancel() {
        this.creditEdit = false;
        // 重置value
      },
  
  
      // 整理date格式
      formatDate: function formatDate(time) {
        var date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) + ' ' + (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
      },
  
      // 整理date格式yyyy-mm-dd
      formatDateyyyymmdd: function formatDateyyyymmdd(time) {
        var date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() >= 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : '0' + date.getDate());
      },
      projectConfirm: function projectConfirm() {
        var _this2 = this;
  
        debugger;
        var url;
        var data = this.$refs.baseTemplateRef.comp.project;
        if (data.plan_release_date && data.plan_release_date !== undefined) {
          data.plan_release_date = this.formatDateyyyymmdd(data.plan_release_date);
        }
        var baseUrl = '/yls-busi-web/';
        if (this.pk_project) {
          url = baseUrl + 'prj/update';
        } else {
          url = baseUrl + 'prj/create';
        }
        this.$refs.baseTemplateRef.comp.$refs["project-form"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功",
                  type: "success"
                });
                _this2.originalValue = res.data.data;
                _this2.Leasehold = res.data.data.lease_type;
                console.log(_this2.$refs.baseTemplateRef);
                _this2.$refs.baseTemplateRef.setData("project", JSON.parse(JSON.stringify(_this2.originalValue)));
                //初始化承租人信息
                _this2.pk_customer = _this2.originalValue.pk_customer;
                //初始化是否有共同承租人
                _this2.is_lessee_type = _this2.originalValue.if_co_lessee;
                _this2.pk_project = _this2.originalValue.pk_project;
                _this2.projectEdit = false;
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
        });
      },
      creditConfirm: function creditConfirm() {
        var _this3 = this;
  
        debugger;
        var url;
        var data = this.$refs.creditTemplateRef.comp.projectCredit;
        if (data.plan_release_date && data.plan_release_date !== undefined) {
          data.plan_release_date = this.formatDateyyyymmdd(data.plan_release_date);
        }
        var baseUrl = '/yls-busi-web/';
        if (this.pk_project) {
          url = baseUrl + 'prj/update';
        } else {
          url = baseUrl + 'prj/create';
        }
        debugger;
        this.$refs.creditTemplateRef.comp.$refs["projectCredit_ref"].validate(function (valid) {
          if (valid) {
            debugger;
            _this3.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              debugger;
              if (res.data.success === true) {
                _this3.$message({
                  message: "保存成功",
                  type: "success"
                });
                _this3.originalValue = res.data.data;
                _this3.Leasehold = res.data.data.lease_type;
                console.log(_this3.$refs.baseTemplateRef);
                _this3.$refs.baseTemplateRef.setData("project", JSON.parse(JSON.stringify(_this3.originalValue)));
                //初始化承租人信息
                _this3.pk_customer = _this3.originalValue.pk_customer;
                //初始化是否有共同承租人
                _this3.is_lessee_type = _this3.originalValue.if_co_lessee;
                _this3.pk_project = _this3.originalValue.pk_project;
                _this3.projectEdit = false;
              } else {
                _this3.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this3.$message({
                message: "更新失败",
                type: "error"
              });
            });
          }
        });
      },
      selConfirmClick: function selConfirmClick() {
        var _this4 = this;
  
        debugger;
        var tableSelections = this.$refs.impRentConditionRef.$refs.rentDialogRef.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
          debugger;
          var pks = [];
          tableSelections.forEach(function (item, index) {
            pks[index] = item.pk_prj_rent_condition;
          });
          var data = {
            strArray: pks,
            pk: this.pk_project
          };
          this.$http({
            url: "/yls-busi-web/contr/rentCondition/addRentConditions",
            headers: { 'Content-Type': 'application/json' },
            method: "post",
            dataType: "json",
            data: data
          }).then(function (res) {
  
            if (res.data.success === true) {
              var originalValue = res.data.data;
              _this4.$refs["RentConditionRef"].setData("RentCondition_t", JSON.parse(JSON.stringify(originalValue)));
              debugger;
              _this4.loadRentCondition();
              _this4.selDialogVisible = false;
              _this4.$message({
                message: "设置起租条件成功",
                type: "success"
              });
            } else {
              _this4.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this4.$message({
              message: "信息提交失败！",
              type: "error"
            });
          });
        } else {
          this.$message({
            message: "请选择起租条件！",
            type: "error"
          });
        }
      },
  
  
      //加载起租信息
      loadRentCondition: function loadRentCondition() {
        var _this5 = this;
  
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.pk_project
              }]
            }
          }
        };
  
        this.$http({
          url: "/yls-busi-web/contr/rentCondition/page",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data
        }).then(function (res) {
  
          var originalValue = res.data.data.content;
          var jsonObj = JSON.parse(JSON.stringify(originalValue));
          _this5.$refs["RentConditionRef"].setData("RentCondition_t", jsonObj);
          debugger;
          if (jsonObj) {
            debugger;
            for (var i = 0; i < jsonObj.length; i++) {
              _this5.rentConditionList[i] = jsonObj[i].pk_parent_rent;
            }
          }
        })["catch"](function (e) {
          _this5.$message({
            message: "起租条件失败",
            type: "error"
          });
        });
      },
      rentDeleteTableRow: function rentDeleteTableRow(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_prj_rent_condition;
      },
  
  
      //起租条件确认删除
      deleteConfirmClick: function deleteConfirmClick() {
        var _this6 = this;
  
        debugger;
        this.delDialogVisible = false;
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'contr/rentCondition/deleteById';
  
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this6.$message({
              message: "删除成功",
              type: "success"
            });
            _this6.request();
            _this6.loadRentCondition();
          } else {
            _this6.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this6.$message({
            message: "Network error",
            type: "error"
          });
        });
      }
    }
  };
  //引入起租条件 模板
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">项目信息设置</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n     \n       <ifbp-panel id=\"basePanel\" title=\"项目授信信息\" v-if=\"isSublease\" :icons=\"creditIcons\">\n        <ifbp-template ref=\"creditTemplateRef\"\n                  tplId=\"creditTemplate\"\n                  funnode=\"BT008\"\n                  nexuskey=\"project_credit\"\n                  show-type=\"form\"\n                  :tplData=\"creditData\"\n                  :editable=\"creditEdit\">\n        </ifbp-template>      \n        <div class=\"form-button-div\" v-if=\"creditEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"creditCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"creditConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n     \n      <ifbp-panel id=\"basePanel\" title=\"项目信息\" :icons=\"baseIcons\"  v-else>\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  show-type=\"form\"\n                  :tplData=\"projectData\"\n                  :editable=\"projectEdit\">\n        </ifbp-template>\n        \n        <div class=\"form-button-div\" v-if=\"projectEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"projectCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"projectConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n\n\n       <!--承租人信息-->\n       <ifbp-panel id=\"bothlesseeRef\" title=\"承租人信息\" :icons=\"bothlesseeIcons\">\n        <bothlesseeRef\n          ref=\"bothlesseeRef\"\n          :source_bill=\"pk_project\"\n          :is_lessee_type=\"is_lessee_type\"\n          :type=\"'prj'\">\n        </bothlesseeRef>\n      </ifbp-panel>\n       <!--出租人信息-->\n       <ifbp-panel id=\"OrginfoRef\" title=\"出租人信息\" :icons=\"OrginfoIcons\">\n        <OrginfoRef\n          ref=\"OrginfoRef\"\n          :source_bill=\"pk_project\"\n          :type=\"'prj'\">\n        </OrginfoRef>\n      </ifbp-panel>\n       <!--供应商信息-->\n       <ifbp-panel id=\"contProviderRef\"   v-if = \"ifShow\" title=\"供应商信息\" :icons=\"contProviderIcons\">\n        <contProviderRef\n          ref=\"contProviderRef\"\n          :source_bill=\"pk_project\"\n          :type=\"'prj'\">\n        </contProviderRef>\n      </ifbp-panel>\n     <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\" :icons=\"pledgeIcons\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_project\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_project\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_project\"\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n       <!--租赁物信息-->\n       <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\" :icons=\"rentTingIcons\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :pk_prjId=\"pk_project\"\n          :type=\"'prj'\"\n          :Leasehold=\"Leasehold\">\n        </busirenttingRef>\n      </ifbp-panel>\n      <!--保险信息-->\n       <ifbp-panel id='insuranceRef' title='保险信息' :icons='insuranceIcons'>\n        <insuranceRef\n          ref='insuranceRef'\n          :source_bill='pk_project'\n          :type=\"'prj'\">\n        </insuranceRef>\n      </ifbp-panel>\n      <!--合同相关方信息-->\n      <ifbp-panel id=\"busirelevantPartyRef\" title=\"合同相关方\" :icons=\"relevantPartyIcons\">\n        <busirelevantPartyRef\n          ref=\"busirelevantPartyRef\"\n          :pk_prjId=\"pk_project\"\n          :type=\"'prj'\">\n        </busirelevantPartyRef>\n      </ifbp-panel>\n      <!--来源信息-->\n      <ifbp-panel id=\"ContSourceRef\" title=\"来源信息\" :icons=\"contSourceIcons\">\n        <ContSourceRef\n          ref=\"ContSourceRef\"\n          :pk_prjId=\"pk_project\"\n          :type=\"'prj'\">\n        </ContSourceRef>\n      </ifbp-panel>\n         <!--付款条件-->\n      <ifbp-panel id=\"payConditionRef\" title=\"付款条件\" :icons=\"payConditionIcons\">\n        <payConditionRef\n          ref=\"payConditionRef\"\n          :pk_prjId=\"pk_project\"\n          :type=\"'prj'\">\n        </payConditionRef>\n      </ifbp-panel>\n      <!--起租条件-->\n      <ifbp-panel id=\"rentConditionRef\" title=\"起租条件\" :icons=\"rentConditionIcons\" >\n        <ifbp-template ref=\"RentConditionRef\"\n                      tplId=\"rentConditionId\"\n                      funnode=\"BT015\"\n                      nexuskey=\"rent_condition\"\n                      :tplData=\"rentConditionData\"\n                      :tplResetFun=\"rentConditionFun\"\n                      @delete-table-click=\"rentDeleteTableRow\"\n                      show-type=\"table-form\"\n                      >\n        </ifbp-template>\n      </ifbp-panel>\n       <!--逾期利率信息-->\n       <ifbp-panel id=\"penaltyRuleDeRef\" title=\"逾期利率信息\" :icons=\"penaltyRuleDeIcons\">\n        <penaltyRuleDeRef\n          ref=\"penaltyRuleDeRef\"\n          :pk_prjId=\"pk_project\"\n          :type=\"'prj'\">\n        </penaltyRuleDeRef>\n      </ifbp-panel>\n       <!--收付各方-->\n      <ifbp-panel id=\"projectAccountRef\" title=\"收付各方\" :icons=\"projectAccountIcons\">\n        <projectAccountRef\n          ref=\"projectAccountRef\"\n          :pk_prjId=\"pk_project\"\n          :type=\"'prj'\">\n      </projectAccountRef>\n      </ifbp-panel>\n\n       <!--开票方案-->\n      <ifbp-panel id=\"taxMessageAlterRef\" title=\"开票方案\" :icons=\"taxMessageAlterIcons\">\n        <taxMessageAlterRef\n          ref=\"taxMessageAlterRef\"\n          :source_bill=\"pk_project\"\n          :type=\"'prj'\">\n        </taxMessageAlterRef>\n      </ifbp-panel>\n\n       <!-- 风险及控制措施汇总-->\n       <ifbp-panel id=\"RiskControlRef\" title=\"风险控制措施\" :icons=\"RiskIcons\">\n        <RiskControlRef\n          ref=\"RiskControlRef\"\n          :source_bill=\"pk_project\"\n          :type=\"'prj'\">\n        </RiskControlRef>\n      </ifbp-panel>\n\n        <!-- 项目总结-->\n       <ifbp-panel id=\"ProjectSummarizeRef\" title=\"项目总结\" :icons=\"SummarizeIcons\">\n        <ProjectSummarizeRef\n          ref=\"ProjectSummarizeRef\"\n          :source_bill=\"pk_project\"\n          :type=\"'prj'\">\n        </ProjectSummarizeRef>\n      </ifbp-panel>\n\n\n    </ifbp-panel-group>\n  </div>\n\n       <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确定删除此条租条件？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n     <!--起租条件-->\n      <el-dialog  title=\"起租条件\"   v-model=\"selDialogVisible\"\n       @update:visible=\"val => selDialogVisible = val\" :modal=\"true\"  size=\"large\">\n         <impRentConditionRef ref=\"impRentConditionRef\"\n                              :conditions=\"rentConditionList\"\n                              :reload=\"selDialogVisible\"\n                             ></impRentConditionRef>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"selDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"selConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n\n\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectinfo/project-info-list.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
        funnode: "BT008",
        nexusKey: "projectinfoUI",
        showDeleteButton: false,
        search_input: "",
        isHide: true,
        totalElements: 0,
        currentPage: 1,
        size: 10,
        delDialogVisible: false,
        multiDelDialogVisible: false,
  
        projectTableData: {},
        projectTableMethods: {},
        projectTableResetFun: function projectTableResetFun($node) {
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
        },
  
        // 待删除 begin
        code: "",
        name: "",
        ts: "",
        mobile: "",
        enablestate: "",
        search_options: [{
          label: "全部",
          value: ""
        }, {
          label: "未启用",
          value: 1
        }, {
          label: "已启用",
          value: 2
        }, {
          label: "已停用",
          value: 3
        }]
        // 待删除 end
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
    methods: {
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/prj/projectinfo/detial/" + scope.row.pk_project + "/" + scope.row.lease_type;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_project;
      },
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      searchInputEnterClick: function searchInputEnterClick() {
        alert(this.search_input);
      },
      request: function request(n, s) {
        var _this = this;
  
        var url;
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'prj/pagelist';
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "pk_project"
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
          debugger;
          _this.originalValue = res.data.data.content;
          _this.$refs["template-table"].setData("project_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      handleSizeChange: function handleSizeChange(val) {
        this.size = val;
        var maxPage = parseInt(this.totalElements / val) + 1;
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentPage = val;
        this.request(this.currentPage - 1, this.size);
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
        this.searchTemplate = testSearchTemplate;
        this.conditionList = testSearchTemplate.conditionList;
      },
  
      // 设置选中
      selectConditionOption: function selectConditionOption(optionList, option, ctrltype) {
        // console.log(arguments);
        var optionSelected = false;
        var options = optionList.options;
        if (option && option.selected) {
          optionSelected = true;
        }
        if (ctrltype === 'DateComponent') {
          if (!optionList.def_min_value && !optionList.def_max_value && !option) {
            // 修复 el-date-picker 置空时引起的bug
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
        // 改到 el-date-picker@change 时修改
        // if (startDay) {
        //   startDay = this.formatDate(startDay);
        // }
        // if (endDay) {
        //   endDay = this.formatDate(endDay);
        // }
        if (startDay && endDay) {
          dateString = startDay + ' 至 ' + endDay;
        } else if (startDay) {
          dateString = startDay + '之后';
        } else {
          dateString = endDay + '之前';
        }
        return dateString;
      },
  
  
      // 已选中数值格式整理
      formatSelectedNumber: function formatSelectedNumber(min, max) {
        if (min && max) {
          return min + '-' + max + '万元';
        } else if (min) {
          return min + '万元及以上';
        } else {
          return '低于' + max + '万元';
        }
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
      },
  
      // 跳转到添加地点页面
      updataProjectInfo: function updataProjectInfo() {
        location.hash = "/prj/projectinfo/add";
      },
      multiDeleteDialgShow: function multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
  
  
      /**
         *  启用状态修改
         *
         * */
      stateTableRow: function stateTableRow(row) {
        var _this2 = this;
  
        // 操作列增加启用按钮
        this.$http({
          url: "/uapbd/addressdoc/enable/" + row.pk_customer,
          method: "post"
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: res.data.message,
              type: "success"
            });
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        debugger;
        this.delDialogVisible = false;
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'prj/deletebyid';
        var delId = this.delId; //this.$refs["template-table"].comp.delId;
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功",
              type: "success"
            });
            _this3.request();
          } else {
            _this3.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })["catch"](function () {
          _this3.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      multiDeleteClick: function multiDeleteClick() {
        var tableSelections = this.$refs["template-table"].comp.$refs["customer_table"].getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_customer;
            delIds.push(id);
          }
        }
        console.log("multi" + delIds);
        return;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">项目管理</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"updataProjectInfo\">新增</el-button>\n      <el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请选择编码/客户\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- <el-row type=\"flex\" justify=\"end\">\n    <el-col :span=\"2\">\n      <el-button @click=\"search\">搜索</el-button>\n    </el-col>\n  </el-row> -->\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag v-if=\"condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\"\n      >\n        {{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n\n  <!-- 搜索参数 -->\n  <template>\n\n    <!-- 前三条平铺条件 -->\n    <el-row\n      :gutter=\"10\"\n      v-for=\"(condition, index) in conditionList\"\n      :key=\"condition.fieldcode\"\n      v-if=\"index < 3\">\n      <!-- 条件名 -->\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">{{condition.fieldname}}:</span>\n      </el-col>\n      <!-- 条件选项 -->\n      <el-col class=\"condition-options\" :span=\"22\" :sm=\"21\" :xs=\"21\">\n\n        <!-- 通用选项 -->\n        <template v-if=\"condition.optionList.options.length\">\n          <span\n            v-for=\"option in condition.optionList.options\"\n            :key=\"option.value\"\n            class=\"condition-option\"\n            :class=\"{selected: option.selected}\"\n            @click=\"selectConditionOption(condition.optionList, option, condition.ctrltype)\"\n          >{{option.name}}</span>\n        </template>\n\n        <!-- 数值字段 -->\n        <template v-if=\"condition.ctrltype === 'NumberComponent'\">\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_min_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最小值\">\n            </el-input>\n          </div>\n            -\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最大值\">\n            </el-input>\n          </div>\n        </template>\n\n        <!-- 日期字段 -->\n        <template v-else-if=\"condition.ctrltype === 'DateComponent'\">\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_min_value\"\n              format=\"yyyy-MM-dd HH:mm:ss\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n            -\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n        </template>\n      </el-col>\n    </el-row>\n\n    <!-- 高级条件 -->\n    <el-row :gutter=\"10\">\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">高级:</span>\n      </el-col>\n      <!-- 条件名 -->\n      <el-col class=\"advanced-conditions\" :span=\"18\" :sm=\"13\" :xs=\"13\">\n        <span v-for=\"(condition, index) in conditionList\"\n          v-if=\"index >= 3\"\n          class=\"advanced-condition\"\n          :class=\"{current: currentConditionCode === condition.fieldcode}\"\n          :key=\"condition.fieldcode\"\n          @click=\"setCurrentCondition(condition)\">\n          {{condition.fieldname}}\n          <i class=\"el-icon-arrow-up\" v-if=\"currentConditionCode === condition.fieldcode\"></i>\n          <i class=\"el-icon-arrow-down\" v-else></i>\n        </span>\n      </el-col>\n\n      <!-- 按钮 -->\n      <el-col class=\"advanced-search-btns\" :span=\"4\" :sm=\"8\" :xs=\"8\">\n        <el-button type=\"primary\" class=\"button-no-radius\">搜索</el-button>\n        <el-button class=\"button-no-radius\">清空</el-button>\n      </el-col>\n    </el-row>\n  </template>\n\n  <!-- 当前选中的条件选项 -->\n  <div class=\"current-condition-options\" v-if=\"currentCondition\">\n\n    <!-- 通用选项 -->\n    <template v-if=\"currentCondition.optionList.options.length\">\n      <span\n        v-for=\"option in currentCondition.optionList.options\"\n        :key=\"option.value\"\n        class=\"condition-option\"\n        :class=\"{selected: option.selected}\"\n        @click=\"selectConditionOption(currentCondition.optionList, option, currentCondition.ctrltype)\"\n      >{{option.name}}</span>\n    </template>\n\n    <!-- 数值字段 -->\n    <template v-if=\"currentCondition.ctrltype === 'NumberComponent'\">\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_min_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最小值\">\n        </el-input>\n      </div>\n        -\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最大值\">\n        </el-input>\n      </div>\n    </template>\n\n    <!-- 日期字段 -->\n    <template v-else-if=\"currentCondition.ctrltype === 'DateComponent'\">\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_min_value\"\n          format=\"yyyy-MM-dd HH:mm:ss\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n        -\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n    </template>\n  </div>\n</div>\n\n  <!-- 主体区域 -->\n  <div class=\"list-main-container clearfix\">\n    <!--新模板组件:tplCode=\"tplCode\"-->\n    <ifbp-template ref=\"template-table\"\n                  tplId=\"project-table-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  :tplData=\"projectTableData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"projectTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      :current-page=\"currentPage\"\n      :page-sizes=\"[10, 20, 30, 40]\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalElements\">\n    </el-pagination>\n  </div>\n  \n  <!--删除确认Dialog-->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"multiDelDialogVisible\"\n    @update:visible=\"val => multiDelDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除所选数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"multiDelDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"multiDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/projectinfo/projectBothLesseePanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数 source_bill 主表主键； type 节点类型
    props: ["source_bill", "type", "is_lessee_type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      var validate = function validate() {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        bothlesseeDelVisible: false,
        rmoveindex: "",
        delId: "",
        //承租人标签
        bothlesseeIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.bothlesseeRef.comp;
            var table = uitemplateComp.$refs["projectBothLessee_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.bothlesseeRef.setData("projectBothLessee", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["projectBothLessee_ref"].resetFields();
          }
        }],
        //type=prj 然后项目ui_id:9d4022c1-438e-4bc8-8a10-9b9776cab14c 否者a7715073-8a24-420a-86de-9110786e8e4b
        funnode: oThis.type === "prj" ? "BT008" : "BT008",
        nexusKey: oThis.type === "prj" ? "projectBothLesseeUI" : "projectBothLesseeUI",
        bothlesseeData: {
          pk_account_lessee_ref: {}
        },
        //渲染表格
        bothlesseeResetFun: function bothlesseeResetFun($node) {
          //  var $refNode = $node.find("el-ref[_id='wdipll8xpjj']");
          var $refNode = this.getNodeById($node, 'wdipll8xpjj');
          var $refNodebankno_l = this.getNodeById($node, 'n00x90su5os');
          var $refNodebankno = this.getNodeById($node, '4ytx4t2pjmq');
          // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
          // var $refNode = $node.find("el-ref");
          if ($refNode.length) {
            // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
            $refNode.attr("v-on:trigger", "customerRefChange");
          };
          if ($refNodebankno_l.length) {
            // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
            $refNodebankno_l.attr("v-on:trigger", "banknoRefChange_l");
          };
          if ($refNodebankno.length) {
            // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
            $refNodebankno.attr("v-on:trigger", "banknoRefChange");
          };
          //项目承租信息表格id：owwkujphew
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
        },
        bothlesseeMethods: {
          customerRefChange: function customerRefChange(type, data) {
            // 拿到当前参照的数据，然后再操作其他字段
            console.log("触发参照改变:", type, data);
            /*
             * 这里的this指向 ifbp-element组件实例，
             * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
             * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
            */
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.customer_code = data.value[0].refcode;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.legal_person_name = data.value[0].legal_person_name;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.fax = data.value[0].fax;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.email = data.value[0].email;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.realworkmail = data.value[0].realworkmail;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.realworkplace = data.value[0].realworkplace;
            if (type === 'change') {
              debugger;
              oThis.$refs.bothlesseeRef.setData('pk_account_lessee_ref', { "pk_customer": data.value[0].id });
            }
          },
          banknoRefChange_l: function banknoRefChange_l(type, data) {
            // 拿到当前参照的数据，然后再操作其他字段
            console.log("触发参照改变:", type, data);
            debugger;
            /*
             * 这里的this指向 ifbp-element组件实例，
             * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
             * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
            */
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.account_bank_l = data.value[0].refcode;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_no_l = data.value[0].bank_no;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_code_l = data.value[0].bank_code;
          },
          banknoRefChange: function banknoRefChange(type, data) {
            // 拿到当前参照的数据，然后再操作其他字段
            console.log("触发参照改变:", type, data);
            /*
             * 这里的this指向 ifbp-element组件实例，
             * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
             * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
            */
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.account_bank = data.value[0].refcode;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_no = data.value[0].bank_no;
            oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_code = data.value[0].bank_code;
          }
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestPrjbothlessee();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != "") {
          this.requestPrjbothlessee();
        }
      },
  
      //请求业务承租方
      requestPrjbothlessee: function requestPrjbothlessee() {
        var _this = this;
  
        var url;
        if (this.source_bill == "") {
          return;
        }
        url = _publicData.ylsBusi + "prj/lessee/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }]
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
          console.log();
          _this.originalValue = res.data.data.content;
          console.log(_this.originalValue);
          // for(var item=0;item<this.originalValue.length;item++){
          //   this.originalValu[item].customer_code=this.originalValu[item].beanMap[this.originalValu[item].pk_customer].code;
          // }
          _this.$refs["bothlesseeRef"].setData("projectBothLessee_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //承租方取消按钮
      bothlesseeFormCancel: function bothlesseeFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs.bothlesseeRef.comp.formShow = false;
        } else {
          this.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
          var bothBakData = this.$refs.bothlesseeRef.getData("projectBothLessee_t");
          bothBakData[this.bothEditIndex] = this.bothEditBakData;
          this.$refs.bothlesseeRef.setData("projectBothLessee_t", bothBakData);
        }
      },
      //承租方主表保存
      bothlesseeFormConfirm: function bothlesseeFormConfirm(type) {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.bothlesseeRef.comp.projectBothLessee;
        //校验主表是否有共同承租人
        if (this.is_lessee_type === 'N' && data.lessee_type === 'BOTH') {
          this.$message({
            message: '是否有共同承租人为否，不允许添加共同承租人！',
            type: "error"
          });
          return;
        }
        data.source_bill = this.source_bill;
        delete data.customer_code;
        delete data.fax;
        delete data.email;
        delete data.legal_person_name;
        delete data.bank_no;
        delete data.account_bank;
        delete data.bank_code;
        delete data.bank_no_l;
        delete data.account_bank_l;
        delete data.bank_code_l;
        delete data.realworkmail;
        delete data.realworkplace;
        if (data.pk_prj_both_lessee) {
          url = _publicData.ylsBusi + 'prj/lessee/update';
        } else {
          var linarraydata = this.$refs.bothlesseeRef.getData("projectBothLessee_t");
          debugger;
          for (var i = 0; i < linarraydata.length; i++) {
            if (data.lessee_type === 'MAIN' && linarraydata[i].lessee_type === 'MAIN') {
              this.$message({
                message: '已存在主承租人，不允许重复添加！',
                type: "error"
              });
              return;
            }
          }
          url = _publicData.ylsBusi + 'prj/lessee/create';
        }
        //保存校验
        this.$refs.bothlesseeRef.validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.requestPrjbothlessee();
                _this2.$refs["bothlesseeRef"].comp.formShow = false;
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
        }, type);
      },
      //承租方行编辑
      bothlesseeFormedit: function bothlesseeFormedit(scope) {
        var _this3 = this;
  
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs.bothlesseeRef.getTableComp().expandRow(row);
        this.$refs.bothlesseeRef.comp.formShow = false;
        this.bothEditBakData = JSON.parse(JSON.stringify(scope.row));
        this.bothEditIndex = scope.$index;
        //projectBothLessee为表单数据对象参数
        this.$refs.bothlesseeRef.setData("projectBothLessee", row);
        debugger;
        if (row.beanMap.pk_customer_ref !== null && row.beanMap.pk_customer_ref !== undefined) {
          this.$refs.bothlesseeRef.comp.projectBothLessee.customer_code = row.beanMap.pk_customer_ref[row.pk_customer].code;
          this.$refs.bothlesseeRef.comp.projectBothLessee.legal_person_name = row.beanMap.pk_customer_ref[row.pk_customer].legal_person_name;
          this.$refs.bothlesseeRef.comp.projectBothLessee.fax = row.beanMap.pk_customer_ref[row.pk_customer].fax;
          this.$refs.bothlesseeRef.comp.projectBothLessee.email = row.beanMap.pk_customer_ref[row.pk_customer].email;
          this.$refs.bothlesseeRef.comp.projectBothLessee.realworkmail = row.beanMap.pk_customer_ref[row.pk_customer].realworkmail;
          this.$refs.bothlesseeRef.comp.projectBothLessee.realworkplace = row.beanMap.pk_customer_ref[row.pk_customer].realworkplace;
        }
        if (row.beanMap.pk_account_lessee_ref !== null && row.beanMap.pk_account_lessee_ref !== undefined) {
          this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank_l = row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].code;
          this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no_l = row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_no;
          this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code_l = row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_code;
        }
        if (row.beanMap.pk_account_ref !== null && row.beanMap.pk_account_ref !== undefined && row.pk_account) {
          this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank = row.beanMap.pk_account_ref[row.pk_account].code;
          this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no = row.beanMap.pk_account_ref[row.pk_account].bank_no;
          this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code = row.beanMap.pk_account_ref[row.pk_account].bank_code;
        }
        this.$nextTick(function () {
          if (row.pk_customer !== null) {
            _this3.$refs.bothlesseeRef.setData('pk_account_lessee_ref', { "pk_customer": row.pk_customer });;
          }
        });
      },
      // 承租方删除提示
      bothlesseeFormdelete: function bothlesseeFormdelete(scope) {
        this.bothlesseeDelVisible = true;
        this.delId = scope.row.pk_prj_both_lessee;
      },
      // 承租方删除方法
      bothlesseeDeleteClick: function bothlesseeDeleteClick() {
        var _this4 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/prj/lessee/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this4.$message({
              message: "删除成功",
              type: "success"
            });
            _this4.requestPrjbothlessee();
          } else {
            _this4.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this4.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
        this.bothlesseeDelVisible = false;
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
  __vue__options__.template = "\r\n<!--承租人管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"bothlesseeRef\"\r\n                        tplId=\"bothlessee\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"bothlesseeData\"\r\n                        :tplResetFun=\"bothlesseeResetFun\"\r\n                        :methods=\"bothlesseeMethods\"\r\n                        @form-confirm-click=\"bothlesseeFormConfirm\"\r\n                        @form-cancel-click=\"bothlesseeFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"bothlesseeFormedit\"\r\n                        @delete-table-click=\"bothlesseeFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 承租人 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"bothlesseeDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"bothlesseeDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"bothlesseeDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectinfo/projectOrginfoPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        OrginfoDelVisible: false,
        rmoveindex: "",
        delId: "",
        //出租人标签
        OrginfoIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.OrginfoRef.comp;
            var table = uitemplateComp.$refs["projectOrginfo_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.OrginfoRef.setData("projectOrginfo", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["projectOrginfo_ref"].resetFields();
          }
        }],
        //type=prj 然后项目ui_id:8e13c344-fe4b-4e0c-a171-8e18395ee236 否者a7715073-8a24-420a-86de-9110786e8e4b
        funnode: oThis.type === "prj" ? "BT008" : "BT008",
        nexusKey: oThis.type === "prj" ? "projectOrginfoUI" : "projectOrginfoUI",
        OrginfoData: {},
        //渲染表格
        OrginfoResetFun: function OrginfoResetFun($node) {
          var $refNode = this.getNodeById($node, 'zi1iz33e0z');
          // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
          // var $refNode = $node.find("el-ref");
          if ($refNode.length) {
            // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
            $refNode.attr("v-on:trigger", "customerRefChange");
          };
          //项目承租信息表格id：owwkujphew
          var $table = $node.find("el-table");
          var operateArr = [{
            title: "编辑",
  
            icon: "edit"
          }, {
            title: "删除",
  
            icon: "delete"
          }];
  
          var operateHtml = this.getTableOperateHtml(operateArr);
          // var $customercode = this.getNodeById($node, "irwohmupzb"); //出租人编码
          // var $legalpersonname = this.getNodeById($node, "zmimbwbx3qn"); //法人代表
          // var $taxpayernumber = this.getNodeById($node, "349ebc0s246"); //纳税人识别号
  
          //  $customercode.html(
          //    '<template scope="scope"><div>{{scope.row.beanMap?' +
          //     "(scope.row.beanMap.pk_customer_ref ? scope.row.beanMap." +
          //     'pk_customer_ref[scope.row.pk_customer].code : "") : ""}}</div></template>'
          // );
  
          // $legalpersonname.html(
          //    '<template scope="scope"><div>{{scope.row.beanMap?' +
          //     "(scope.row.beanMap.pk_customer_ref ? scope.row.beanMap." +
          //     'pk_customer_ref[scope.row.pk_customer].legal_person_name : "") : ""}}</div></template>'
          // );
  
          //  $taxpayernumber.html(
          //    '<template scope="scope"><div>{{scope.row.beanMap?' +
          //     "(scope.row.beanMap.pk_customer_ref ? scope.row.beanMap." +
          //     'pk_customer_ref[scope.row.pk_customer].taxpayer_number : "") : ""}}</div></template>'
          // );
  
          $table.append(operateHtml);
          return $node[0].outerHTML;
        },
        bothlesseeMethods: {
          customerRefChange: function customerRefChange(type, data) {
            debugger;
            oThis.$refs.OrginfoRef.comp.projectOrginfo.identity_num = data.value[0].identity_num; //证件号码
            oThis.$refs.OrginfoRef.comp.projectOrginfo.pk_legal_person = data.value[0].pk_legal_person; //法定代表人
            oThis.$refs.OrginfoRef.comp.projectOrginfo.pk_linkman = data.value[0].pk_linkman; //联系人
            oThis.$refs.OrginfoRef.comp.projectOrginfo.linkman_phone = data.value[0].linkman_phone; //联系人电话
          }
        }
      };
    },
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
        this.requestPrjOrginfo();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.source_bill != "") {
          this.requestPrjOrginfo();
        }
      },
  
      //请求业务出租方
      requestPrjOrginfo: function requestPrjOrginfo() {
        var _this = this;
  
        var url;
        if (this.source_bill == "") {
          return;
        }
        url = _publicData.ylsBusi + "prj/orginfo/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }]
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
  
          _this.originalValue = res.data.data.content;
  
          _this.$refs["OrginfoRef"].setData("projectOrginfo_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //出租方取消按钮
      OrginfoFormCancel: function OrginfoFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["OrginfoRef"].comp.formShow = false;
        } else {
          this.$refs["OrginfoRef"].getTableComp().closeExpandRow();
        }
      },
      //出租方主表保存
      OrginfoFormConfirm: function OrginfoFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.OrginfoRef.comp.projectOrginfo;
        data.source_bill = this.source_bill;
        delete data.legal_person_name;
        delete data.customer_code;
        delete data.taxpayer_number;
        delete data.realworkplace;
        delete data.realworkmail;
  
        if (data.pk_prj_orginfo) {
          url = _publicData.ylsBusi + '/prj/orginfo/update';
        } else {
          url = _publicData.ylsBusi + '/prj/orginfo/create';
        }
        //保存校验
        this.$refs.OrginfoRef.comp.$refs["projectOrginfo_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.requestPrjOrginfo();
                _this2.$refs["OrginfoRef"].comp.formShow = false;
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
        });
      },
      //出租方行编辑
      OrginfoFormedit: function OrginfoFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["OrginfoRef"].getTableComp().expandRow(row);
        this.$refs["OrginfoRef"].formShow = false;
        //projectOrginfo为表单数据对象参数
        this.$refs["OrginfoRef"].setData("projectOrginfo", row);
        this.$refs.OrginfoRef.comp.projectOrginfo.customer_code = row.beanMap.pk_customer_ref[row.pk_customer].code;
        this.$refs.OrginfoRef.comp.projectOrginfo.legal_person_name = row.beanMap.pk_customer_ref[row.pk_customer].legal_person_name;
        this.$refs.OrginfoRef.comp.projectOrginfo.taxpayer_number = row.beanMap.pk_customer_ref[row.pk_customer].taxpayer_number;
  
        this.$refs.OrginfoRef.comp.projectOrginfo.realworkplace = row.beanMap.pk_customer_ref[row.pk_customer].realworkplace; //实际告知地址
        this.$refs.OrginfoRef.comp.projectOrginfo.realworkmail = row.beanMap.pk_customer_ref[row.pk_customer].realworkmail; //实际告知邮编
      },
      // 出租方删除提示
      OrginfoFormdelete: function OrginfoFormdelete(scope) {
        this.OrginfoDelVisible = true;
        this.delId = scope.row.pk_prj_orginfo;
      },
      // 出租方删除方法
      OrginfoDeleteClick: function OrginfoDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/prj/orginfo/deleteById",
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
            _this3.requestPrjOrginfo();
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
        this.OrginfoDelVisible = false;
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
  __vue__options__.template = "\r\n<!--出租人管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"OrginfoRef\"\r\n                        tplId=\"Orginfo\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"OrginfoData\"\r\n                        :tplResetFun=\"OrginfoResetFun\"\r\n                        :methods=\"bothlesseeMethods\"\r\n                        @form-confirm-click=\"OrginfoFormConfirm\"\r\n                        @form-cancel-click=\"OrginfoFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"OrginfoFormedit\"\r\n                        @delete-table-click=\"OrginfoFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 出租人 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"OrginfoDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"OrginfoDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"OrginfoDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/projectinfo/rentConditionVM/rent-condition-select.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('refreshPage')],
      props: ["conditions", "reload"],
      data: function data() {
          return {
              rentDialogListData: [],
              mounted: function mounted() {
                  this.refreshPage();
              }
          };
      },
      created: function created() {
          this.refreshPage();
      },
  
      watch: {
          reload: function reload(val) {
  
              if (val === true) {
                  this.refreshPage();
              }
          }
      },
      methods: {
          refreshPage: function refreshPage() {
              var _this = this;
  
              this.$http.post(_publicData.ylsBusi + 'contr/rentCondition/page', {
                  pageNum: this.currentPage - 1,
                  pageSize: this.pageSize,
                  searchParams: {
                      searchMap: {
                          custCondList: [{
                              'key': 'source_bill',
                              'oper': '=',
                              'value': ""
                          }]
                      }
                  }
              }).then(function (resp) {
  
                  if (resp.data.success) {
  
                      var content = resp.data.data.content;
                      var conditions = _this.conditions;
                      var lastContent = content.filter(function (item) {
                          if (conditions) {
                              debugger;
                              if ($.inArray(item.pk_prj_rent_condition, conditions) == -1) {
                                  return item;
                              };
                          }
                      });
  
                      _this.$refs.rentDialogRef.setData('RentCondition_t', lastContent);
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<!-- 列表区域 -->\n<div class=\"list-main-container\">\n    <ifbp-template ref=\"rentDialogRef\"\n                tplId=\"rentDialogId\"\n                funnode=\"BT015\"\n                nexuskey=\"rent_condition\"\n                :tplData=\"rentDialogListData\"\n                show-type=\"table\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n</div>\n"
  

});
 
 define('yls^busi/project/src/rentcondition/rentcondition.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_prjId", "type"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        rentConditionDelVisible: false,
        rmoveindex: "",
        delId: "",
  
        funnode: "BT015",
  
        nexusKey: "rent_condition",
  
        //起租条件
        rentConditionIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.rentConditionRef.comp;
            var table = uitemplateComp.$refs["RentCondition_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.rentConditionRef.setData("RentCondition", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["RentCondition_ref"].resetFields();
          }
        }],
  
        rentConditionData: {
          rules: {}
        },
        //渲染表格
        rentConditionResetFun: function rentConditionResetFun($node) {
  
          var $table = this.getNodeById($node, "37701xar6kjshlfnq8bgc4bo6r");
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_prjId: function currentpk_prjId() {
        return this.pk_prjId;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_prjId: function pk_prjId(val) {
        this.requestRentCondition();
      }
    },
    //获取数据数据初始化操作
    created: function created() {},
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_prjId != "") {
          this.requestRentCondition();
        }
      },
  
      //请求业务起租条件
      requestRentCondition: function requestRentCondition() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "contr/rentCondition/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "source_bill"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              // 'source_bill': this.pk_prjId
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
  
          console.log();
          _this.originalValue = res.data.data.content;
          console.log(_this.originalValue);
          _this.$refs["rentConditionRef"].setData("RentCondition_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //起租条件取消按钮
      rentConditionFormCancel: function rentConditionFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["rentConditionRef"].comp.formShow = false;
        } else {
          this.$refs["rentConditionRef"].getTableComp().closeExpandRow();
        }
      },
      //起租条件主表保存
      rentConditionFormConfirm: function rentConditionFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.rentConditionRef.comp.RentCondition;
        data.source_bill = this.pk_prjId;
        if (data.pk_prj_rent_condition) {
          url = _publicData.ylsBusi + 'contr/rentCondition/update';
        } else {
          url = _publicData.ylsBusi + 'contr/rentCondition/create';
        }
        //保存校验
        this.$refs.rentConditionRef.comp.$refs["RentCondition_ref"].validate(function (valid) {
          if (valid) {
  
            _this2.$http({
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
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.rentConditionRef.getData("RentCondition_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this2.rmoveindex !== "") {
                  linarraydata.splice(_this2.rmoveindex, 1, _this2.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this2.originalValue);
                }
                _this2.$refs.rentConditionRef.setData("proRentThing_t", JSON.parse(JSON.stringify(linarraydata)));
                _this2.$refs["rentConditionRef"].comp.formShow = false;
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
        });
      },
      //起租条件行编辑
      rentConditionFormedit: function rentConditionFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["rentConditionRef"].getTableComp().expandRow(row);
        this.$refs["rentConditionRef"].comp.formShow = false;
        //RentCondition为表单数据对象参数
        this.$refs["rentConditionRef"].setData("RentCondition", row);
      },
      // 起租条件删除提示
      rentConditionFormdelete: function rentConditionFormdelete(scope) {
        this.rentConditionDelVisible = true;
        this.delId = scope.row.pk_prj_rent_condition;
      },
      // 起租条件删除方法
      rentConditionDeleteClick: function rentConditionDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "contr/rentCondition/deleteById",
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
            _this3.requestRentCondition();
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
        this.rentConditionDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--起租条件管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"rentConditionRef\"\r\n                        tplId=\"rentCondition-template\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"rentConditionData\"\r\n                        :tplResetFun=\"rentConditionResetFun\"\r\n                        @form-confirm-click=\"rentConditionFormConfirm\"\r\n                        @form-cancel-click=\"rentConditionFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"rentConditionFormedit\"\r\n                        @delete-table-click=\"rentConditionFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务起租条件 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"rentConditionDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"rentConditionDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"rentConditionDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/project/src/rentthinginfo/rentthing-detail.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../detail-mock.js";
  // import ElTemplate from "../../../template.vue";
  // import ifbpPanelGroup from "../../../ifbp-panel-group.vue";
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate,
    //   "ifbp-panel-group": ifbpPanelGroup
    // },
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        pk_rentthing: '',
        linkmanDelVisible: false,
        custbankDelVisible: false,
        custCountryTaxesDelVisible: false,
  
        //customer
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.rentthingEdit = !oThis.rentthingEdit;
          }
        }],
        rentthingPk: "3e85f71a-cadd-444f-b46f-68af244c3a91",
        rentthingData: {
          customer: {},
          rules: {
            name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
            pk_custclass: [{ required: true, message: "客户基本分类不能为空", trigger: "blur" }]
          }
        },
        rentthingEdit: false,
  
        // bank
        bankIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custbankRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custbankPk: "000111100000001Z8DZS",
        custbankData: {
          params: {
            pk_banktype: ""
          },
          rules: {
            accnum: [{ required: true, message: "账号不能为空", trigger: "blur" }],
            accname: [{ required: true, message: "户名不能为空", trigger: "blur" }],
            pk_bankdoc: [{ required: true, message: "开户银行不能为空", trigger: "blur" }],
            pk_banktype: [{ required: true, message: "银行类型不能为空", trigger: "blur" }],
            accountproperty: [{ required: true, message: "账户性质不能为空", trigger: "blur" }]
          }
        },
        custbankTplMethods: {
          // form的保存操作
          custbankFormConfirm: function custbankFormConfirm() {
            var _this = this;
  
            this.$refs['bankaccount_form'].validate(function (valid) {
              if (valid) {
                var data = _this.bankaccount;
              }
              console.log(data);
            });
          },
          // form的取消操作
          custbankFormCancel: function custbankFormCancel() {
            this.$refs['bankaccount_table'].closeExpandRow();
            this.formShow = false;
          },
          custbankEditTableRow: function custbankEditTableRow(scope) {
            var row = scope.row;
            this.$refs['bankaccount_table'].expandRow(row);
            this.bankaccount = row;
            this.formShow = false;
          },
          custbankDeleteTableRow: function custbankDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pageComp.custbankDel = scope.row;
            //            this.pk_custbank = scope.row.pk_custbank;
          },
          enableTableRow: function enableTableRow(scope) {
            alert("enable");
            console.log("enable", scope.row);
            this.pageComp.custbankDelVisible = true;
            this.pk_custbank = scope.row.pk_custbank;
          }
        },
        custbankResetFun: function custbankResetFun($node) {
          var $table = this.getNodeById($node, "pi3dwf6tsbp");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custbankEditTableRow",
            icon: "edit"
          }, {
            title: "启用",
            click: "enableTableRow",
            icon: "pt-tuichu"
          }, {
            title: "删除",
            click: "custbankDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $accnum = this.getNodeBy_Id($node, "krvqs7xlxfs"); //账号 
          var $accname = this.getNodeBy_Id($node, "83oyd6v35wm"); //户名
          var $pkBankdoc = this.getNodeBy_Id($node, "r69m5jd8zul"); //开户银行
          var $pkBanktype = this.getNodeBy_Id($node, "bo4dg59b0v"); //银行类别
          var $contactpsn = this.getNodeBy_Id($node, "vpthxzig1da"); //联系人
          var $tel = this.getNodeBy_Id($node, "k3bvpmgm9m"); //联系电话
  
          $accnum.html('<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>');
          $accname.html('<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>');
          $pkBankdoc.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." + 'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>');
          $pkBanktype.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." + 'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>');
  
          $contactpsn.html('<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>');
          $tel.html('<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>');
          return $node[0].outerHTML;
        },
  
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs['linkman_table'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }],
        custlinkmanPk: "34cc4979-181e-44dc-9cd7-79ab1b51738d", //linkman
        custlinkmanData: {
          rules: {
            name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = this.getNodeBy_Id($node, "zxhlnr94qvd");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custlinkmanEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custlinkmanDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $sex = this.getNodeBy_Id($node, "ir66pzdxiic"); //性别
          var $isdefault = this.getNodeBy_Id($node, "h81qk6u00p5"); //是否默认
          $sex.html('<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>');
          $isdefault.html('<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>');
          return $node[0].outerHTML;
        },
        custlinkmanTplMethods: {
          // form的保存操作
          linkmanFormConfirm: function linkmanFormConfirm() {
            var _this2 = this;
  
            this.$refs['linkman_form'].validate(function (valid) {
              if (valid) {
                var data = _this2.linkman;
              }
              console.log(data);
            });
          },
          // form的取消操作
          linkmanFormCancel: function linkmanFormCancel() {
            this.$refs['linkman_table'].closeExpandRow();
            this.formShow = false;
          },
          // table行的编辑操作
          custlinkmanEditTableRow: function custlinkmanEditTableRow(scope) {
            var row = scope.row;
            this.$refs['linkman_table'].expandRow(row);
            this.linkman = row;
            this.formShow = false;
          },
          // table行的删除操作
          custlinkmanDeleteTableRow: function custlinkmanDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.linkmanDel = scope.row;
            this.pageComp.linkmanDelVisible = true;
            this.pageComp.pk_linkman = scope.row.pk_linkman;
          }
        },
  
        // 税类信息
        countryTaxesIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custCountryTaxesPk: "7a7287cf-0833-4009-8cc5-c18cf0e2c4ce", //custaxes
        custCountryTaxesData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        custCountryTaxesResetFun: function custCountryTaxesResetFun($node) {
          var $table = this.getNodeBy_Id($node, "xnl0066wpf9");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
            click: "custCountryTaxesEditTableRow",
            icon: "edit"
          }, {
            title: "删除",
            click: "custCountryTaxesDeleteTableRow",
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
  
          $table.append(operateHtml);
  
          var $pkCountry = this.getNodeBy_Id($node, "u5itmgcx7c");
          var $pkTaxes = this.getNodeBy_Id($node, "1idpzwci9up");
          $pkCountry.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_country_ref?" + 'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' + "</div></template>");
  
          $pkTaxes.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_taxes_ref?" + 'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' + "</div></template>");
  
          return $node[0].outerHTML;
        },
        custCountryTaxesTplMethods: {
          // form的保存操作
          custCountryFormConfirm: function custCountryFormConfirm() {
            var data = this.custaxes;
            console.log(data);
          },
          // form的取消操作
          custCountryFormCancel: function custCountryFormCancel() {
            this.$refs['custaxes_table'].closeExpandRow();
            this.formShow = false;
          },
          custCountryTaxesEditTableRow: function custCountryTaxesEditTableRow(scope) {
            var row = scope.row;
            this.$refs['custaxes_table'].expandRow(row);
            this.custaxes = row;
            this.formShow = false;
          },
          custCountryTaxesDeleteTableRow: function custCountryTaxesDeleteTableRow(scope) {
            console.log("delete", scope.row);
            this.pageComp.custCountryTaxesDelVisible = true;
            this.pageComp.custtaxtypesDel = scope.row;
          }
        }
      };
    },
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      /**
         *   单个地点详情
         **/
      request: function request() {
        this.pk_rentthing = this.$root.$router.currentRoute.params.id;
        //请求客户基本信息详情
        if (this.pk_rentthing) {
          this.requestCustBaseInfo();
        }
        //        //客户银行账户列表
        this.requestCustBank();
        //        客户联系人联系人列表
        this.requestCustlinkman();
        //客户税务类别列表
        this.requestCustCountryTaxes();
      },
  
      //请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this3 = this;
  
        debugger;
        this.$http({
          url: "/yls-busi-web/rentth/getbyid",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_rentthing
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(_this3.$refs.baseTemplateRef);
            _this3.$refs.baseTemplateRef.setData("projectRentThing", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this3.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this3.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户银行账户
      requestCustBank: function requestCustBank() {
        var _this4 = this;
  
        this.$http({
          url: "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var custbankOriginal = res.data.data;
            _this4.$refs.custbankRef.setData("bankaccount", JSON.parse(JSON.stringify(custbankOriginal)));
            _this4.$nextTick(function () {
              _this4.$refs.custbankRef.setData("tableShow", false);
            });
          } else {
            _this4.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this4.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this5 = this;
  
        this.$http({
          url: "/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            console.log(_this5.$refs.custlinkmanRef);
            //             this.custlinkmanData = {
            //               linkman_t :  JSON.parse(JSON.stringify(this.originalValue))
            //             };
            _this5.$refs.custlinkmanRef.setData("linkman_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this5.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this5.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户国家税类
      requestCustCountryTaxes: function requestCustCountryTaxes() {
        var _this6 = this;
  
        this.$http({
          url: "/uapbd/custcountrytaxes/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            //            this.custCountryTaxesData = {
            //              custaxes_t :  JSON.parse(JSON.stringify(this.originalValue))
            //            };
            _this6.$refs.custCountryTaxesRef.setData("custaxes_t", JSON.parse(JSON.stringify(originalValue)));
          } else {
            _this6.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this6.$message({
            message: "客户国家税类信息获取失败",
            type: "error"
          });
        });
      },
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this7 = this;
  
        var delData = {};
        delData.linkman = this.linkmanDel;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custlinkman/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this7.$message({
              message: res.data.msg,
              type: "success"
            });
            _this7.linkmanDelVisible = false;
            _this7.requestCustlinkman();
          } else {
            _this7.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this7.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custbankDeleteClick: function custbankDeleteClick() {
        var _this8 = this;
  
        var delData = this.custbankDel;
        var ts = this.$refs.baseTemplateRef.comp.customer.ts;
        delData.ts = ts;
        delData.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custbank/delete",
          method: "post",
          data: delData
        }).then(function (res) {
          if (res.data.status === true) {
            _this8.$message({
              message: res.data.msg,
              type: "success"
            });
            _this8.custbankDelVisible = false;
            _this8.requestCustBank();
          } else {
            _this8.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this8.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      custCountryTaxesDeleteClick: function custCountryTaxesDeleteClick() {
        var _this9 = this;
  
        this.custtaxtypesDel.pk_customer = this.pk_customer;
        this.$http({
          url: "/uapbd/custcountrytaxes/delete",
          method: "post",
          data: this.custtaxtypesDel
        }).then(function (res) {
          if (res.data.status === true) {
            _this9.$message({
              message: res.data.msg,
              type: "success"
            });
            _this9.custCountryTaxesDelVisible = false;
            _this9.requestCustCountryTaxes();
          } else {
            _this9.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this9.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.rentthingEdit = false;
        // 重置value
      },
      customerConfirm: function customerConfirm() {
        var _this10 = this;
  
        debugger;
        var url;
        var data = this.$refs.baseTemplateRef.comp.projectRentThing;
        var baseUrl = '/yls-busi-web/';
        if (this.pk_rentthing) {
          url = baseUrl + 'rentth/update';
        } else {
          url = baseUrl + 'rentth/create';
        }
        this.$refs.baseTemplateRef.comp.$refs["proRentThing-form"].validate(function (valid) {
          if (valid) {
            _this10.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.status === true) {
                _this10.$message({
                  message: res.data.msg,
                  type: "success"
                });
                _this10.originalValue = res.data.data;
                console.log(_this10.$refs.baseTemplateRef);
                _this10.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this10.originalValue)));
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                _this10.rentthingEdit = false;
              } else {
                _this10.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this10.$message({
                message: "地点更新失败",
                type: "error"
              });
            });
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">租赁物信息设置</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <ifbp-panel id=\"basePanel\" title=\"基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"rentthingPk\"\n                  show-type=\"form\"\n                  :tplData=\"rentthingData\"\n                  :editable=\"rentthingEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"rentthingEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <ifbp-panel id=\"bankPanel\" title=\"银行账户信息\" :icons=\"bankIcons\">\n        <ifbp-template ref=\"custbankRef\"\n                      tplId=\"bankTemplate\"\n                      :pkTemp=\"custbankPk\"\n                      :tplData=\"custbankData\"\n                      :tplResetFun=\"custbankResetFun\"\n                      :tplMethods=\"custbankTplMethods\"\n                      form-confirm-fun=\"custbankFormConfirm\"\n                      form-cancel-fun=\"custbankFormCancel\"\n                      show-type=\"table-form\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <ifbp-template ref=\"custlinkmanRef\"\n                      tplId=\"linkmanTemplate\"\n                      :pkTemp=\"custlinkmanPk\"\n                      :tplData=\"custlinkmanData\"\n                      :tplResetFun=\"linkmanResetFun\"\n                      :tplMethods=\"custlinkmanTplMethods\"\n                      form-confirm-fun=\"linkmanFormConfirm\"\n                      form-cancel-fun=\"linkmanFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n      <ifbp-panel id=\"countryTaxesPanel\" title=\"税类信息\" :icons=\"countryTaxesIcons\">\n        <ifbp-template ref=\"custCountryTaxesRef\"\n                      tplId=\"countryTaxesTemplate\"\n                      :pkTemp=\"custCountryTaxesPk\"\n                      :tplData=\"custCountryTaxesData\"\n                      :tplResetFun=\"custCountryTaxesResetFun\"\n                      :tplMethods=\"custCountryTaxesTplMethods\"\n                      form-confirm-fun=\"custCountryFormConfirm\"\n                      form-cancel-fun=\"custCountryFormCancel\"\n                      show-type=\"table-form\"\n                      :page-comp=\"this\">\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custbankDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custbankDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custbankDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"linkmanDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"linkmanDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n\n  <!-- 客户国家税类 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custCountryTaxesDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custCountryTaxesDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custCountryTaxesDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/project/src/rentthinginfo/rentthing-info.vue', function(require, exports, module) {

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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  // import test from "../info-mock.js";
  // // import ElTemplate from "../../../template.vue";
  // import testSearchTemplate from './testSearchTemplate.json';
  
  exports["default"] = {
    // components: {
    //   "ifbp-template": ElTemplate
    // },
    data: function data() {
      var oThis = this;
      return {
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
        rentthingPk: "3e85f71a-cadd-444f-b46f-68af244c3a91",
        showDeleteButton: false,
        search_input: "",
        isHide: true,
        totalElements: 0,
        currentPage: 1,
        size: 10,
        delDialogVisible: false,
        multiDelDialogVisible: false,
  
        rentthingTableData: {},
        projectTableMethods: {},
        rentthingTableResetFun: function rentthingTableResetFun($node) {
          var $table = this.getNodeById($node, "8qce4ym4sig");
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
  
        // 待删除 begin
        code: "",
        name: "",
        ts: "",
        mobile: "",
        enablestate: "",
        search_options: [{
          label: "全部",
          value: ""
        }, {
          label: "未启用",
          value: 1
        }, {
          label: "已启用",
          value: 2
        }, {
          label: "已停用",
          value: 3
        }]
        // 待删除 end
      };
    },
    created: function created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
  
    methods: {
      handleSelectionChange: function handleSelectionChange(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/rentthing/detail/" + scope.row.pk_prj_rent_thing;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_prj_rent_thing;
      },
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      searchInputEnterClick: function searchInputEnterClick() {
        alert(this.search_input);
      },
      request: function request(n, s) {
        var _this = this;
  
        var url;
        // var search =
        //   "&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
        // if (n === undefined) {
        //   url = "/uapbd/custbaseinfo/pageList?pn=1&ps=10&sortColumn=" + search;
        // } else {
        //   url = "/uapbd/custbaseinfo/pageList?pn=" + n + "&ps=" + s + search;
        // }
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'rentth/pagelist';
        debugger;
        console.log(url);
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "pk_prj_rent_thing"
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
          debugger;
          _this.originalValue = res.data.data.content;
          console.log(originalValue);
          _this.$refs["template-table"].setData("projectRentThing_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      handleSizeChange: function handleSizeChange(val) {
        this.size = val;
        var maxPage = parseInt(this.totalElements / val) + 1;
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
      handleCurrentChange: function handleCurrentChange(val) {
        this.currentPage = val;
        this.request(this.currentPage - 1, this.size);
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
        this.searchTemplate = testSearchTemplate;
        this.conditionList = testSearchTemplate.conditionList;
      },
  
      // 设置选中
      selectConditionOption: function selectConditionOption(optionList, option, ctrltype) {
        // console.log(arguments);
        var optionSelected = false;
        var options = optionList.options;
        if (option && option.selected) {
          optionSelected = true;
        }
        if (ctrltype === 'DateComponent') {
          if (!optionList.def_min_value && !optionList.def_max_value && !option) {
            // 修复 el-date-picker 置空时引起的bug
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
        // 改到 el-date-picker@change 时修改
        // if (startDay) {
        //   startDay = this.formatDate(startDay);
        // }
        // if (endDay) {
        //   endDay = this.formatDate(endDay);
        // }
        if (startDay && endDay) {
          dateString = startDay + ' 至 ' + endDay;
        } else if (startDay) {
          dateString = startDay + '之后';
        } else {
          dateString = endDay + '之前';
        }
        return dateString;
      },
  
  
      // 已选中数值格式整理
      formatSelectedNumber: function formatSelectedNumber(min, max) {
        if (min && max) {
          return min + '-' + max + '万元';
        } else if (min) {
          return min + '万元及以上';
        } else {
          return '低于' + max + '万元';
        }
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
      },
  
      // 跳转到添加地点页面
      updataRentthingInfo: function updataRentthingInfo() {
        location.hash = "/rentthing/add";
      },
      multiDeleteDialgShow: function multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
  
  
      /**
         *  启用状态修改
         *
         * */
      stateTableRow: function stateTableRow(row) {
        var _this2 = this;
  
        // 操作列增加启用按钮
        this.$http({
          url: "/uapbd/addressdoc/enable/" + row.pk_customer,
          method: "post"
        }).then(function (res) {
          if (res.data.status === true) {
            _this2.$message({
              message: res.data.msg,
              type: "success"
            });
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      deleteClick: function deleteClick() {
        var _this3 = this;
  
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + 'rentth/deletebyid';
        var delId = this.delId;
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: delId
        }).then(function (res) {
          if (res.data.status === true) {
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
        })["catch"](function () {
          _this3.$message({
            message: "Network error",
            type: "error"
          });
        });
      },
      multiDeleteClick: function multiDeleteClick() {
        var tableSelections = this.$refs["template-table"].comp.$refs["customer_table"].getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_customer;
            delIds.push(id);
          }
        }
        console.log("multi" + delIds);
        return;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">租赁物-全局</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"updataRentthingInfo\">新增</el-button>\n      <el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请选择编码/客户\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- <el-row type=\"flex\" justify=\"end\">\n    <el-col :span=\"2\">\n      <el-button @click=\"search\">搜索</el-button>\n    </el-col>\n  </el-row> -->\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag v-if=\"condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\"\n      >\n        {{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n\n  <!-- 搜索参数 -->\n  <template>\n\n    <!-- 前三条平铺条件 -->\n    <el-row\n      :gutter=\"10\"\n      v-for=\"(condition, index) in conditionList\"\n      :key=\"condition.fieldcode\"\n      v-if=\"index < 3\">\n      <!-- 条件名 -->\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">{{condition.fieldname}}:</span>\n      </el-col>\n      <!-- 条件选项 -->\n      <el-col class=\"condition-options\" :span=\"22\" :sm=\"21\" :xs=\"21\">\n\n        <!-- 通用选项 -->\n        <template v-if=\"condition.optionList.options.length\">\n          <span\n            v-for=\"option in condition.optionList.options\"\n            :key=\"option.value\"\n            class=\"condition-option\"\n            :class=\"{selected: option.selected}\"\n            @click=\"selectConditionOption(condition.optionList, option, condition.ctrltype)\"\n          >{{option.name}}</span>\n        </template>\n\n        <!-- 数值字段 -->\n        <template v-if=\"condition.ctrltype === 'NumberComponent'\">\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_min_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最小值\">\n            </el-input>\n          </div>\n            -\n          <div class=\"option-num-container\">\n            <el-input\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null, condition.ctrltype)\"\n              size=\"small\"\n              placeholder=\"最大值\">\n            </el-input>\n          </div>\n        </template>\n\n        <!-- 日期字段 -->\n        <template v-else-if=\"condition.ctrltype === 'DateComponent'\">\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_min_value\"\n              format=\"yyyy-MM-dd HH:mm:ss\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n            -\n          <div class=\"option-date-container\">\n            <el-date-picker\n              v-model=\"condition.optionList.def_max_value\"\n              @change=\"selectConditionOption(condition.optionList, null,'DateComponent')\"\n              type=\"datetime\"\n              size=\"small\"\n              placeholder=\"选择日期时间\">\n            </el-date-picker>\n          </div>\n        </template>\n      </el-col>\n    </el-row>\n\n    <!-- 高级条件 -->\n    <el-row :gutter=\"10\">\n      <el-col :span=\"2\" :sm=\"3\" :xs=\"3\">\n        <span class=\"search-label\">高级:</span>\n      </el-col>\n      <!-- 条件名 -->\n      <el-col class=\"advanced-conditions\" :span=\"18\" :sm=\"13\" :xs=\"13\">\n        <span v-for=\"(condition, index) in conditionList\"\n          v-if=\"index >= 3\"\n          class=\"advanced-condition\"\n          :class=\"{current: currentConditionCode === condition.fieldcode}\"\n          :key=\"condition.fieldcode\"\n          @click=\"setCurrentCondition(condition)\">\n          {{condition.fieldname}}\n          <i class=\"el-icon-arrow-up\" v-if=\"currentConditionCode === condition.fieldcode\"></i>\n          <i class=\"el-icon-arrow-down\" v-else></i>\n        </span>\n      </el-col>\n\n      <!-- 按钮 -->\n      <el-col class=\"advanced-search-btns\" :span=\"4\" :sm=\"8\" :xs=\"8\">\n        <el-button type=\"primary\" class=\"button-no-radius\">搜索</el-button>\n        <el-button class=\"button-no-radius\">清空</el-button>\n      </el-col>\n    </el-row>\n  </template>\n\n  <!-- 当前选中的条件选项 -->\n  <div class=\"current-condition-options\" v-if=\"currentCondition\">\n\n    <!-- 通用选项 -->\n    <template v-if=\"currentCondition.optionList.options.length\">\n      <span\n        v-for=\"option in currentCondition.optionList.options\"\n        :key=\"option.value\"\n        class=\"condition-option\"\n        :class=\"{selected: option.selected}\"\n        @click=\"selectConditionOption(currentCondition.optionList, option, currentCondition.ctrltype)\"\n      >{{option.name}}</span>\n    </template>\n\n    <!-- 数值字段 -->\n    <template v-if=\"currentCondition.ctrltype === 'NumberComponent'\">\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_min_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最小值\">\n        </el-input>\n      </div>\n        -\n      <div class=\"option-num-container\">\n        <el-input\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)\"\n          size=\"small\"\n          placeholder=\"最大值\">\n        </el-input>\n      </div>\n    </template>\n\n    <!-- 日期字段 -->\n    <template v-else-if=\"currentCondition.ctrltype === 'DateComponent'\">\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_min_value\"\n          format=\"yyyy-MM-dd HH:mm:ss\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n        -\n      <div class=\"option-date-container\">\n        <el-date-picker\n          v-model=\"currentCondition.optionList.def_max_value\"\n          @change=\"selectConditionOption(currentCondition.optionList, null,'DateComponent')\"\n          type=\"datetime\"\n          size=\"small\"\n          placeholder=\"选择日期时间\">\n        </el-date-picker>\n      </div>\n    </template>\n  </div>\n</div>\n\n  <!-- 主体区域 -->\n  <div class=\"list-main-container clearfix\">\n    <!--新模板组件:tplCode=\"tplCode\"-->\n    <ifbp-template ref=\"template-table\"\n                  tplId=\"rentthing-table-template\"\n                  :pkTemp=\"rentthingPk\"\n                  :tplData=\"rentthingTableData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"rentthingTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      :current-page=\"currentPage\"\n      :page-sizes=\"[10, 20, 30, 40]\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalElements\">\n    </el-pagination>\n  </div>\n  \n  <!--删除确认Dialog-->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"delDialogVisible\"\n    @update:visible=\"val => delDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"multiDelDialogVisible\"\n    @update:visible=\"val => multiDelDialogVisible = val\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除所选数据？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"multiDelDialogVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"multiDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!--数据加载过程中页面最上端显示的层-->\n  <!-- <div id=\"cover\" ref=\"cover\">\n    <div class=\"el-loading-spinner\">\n      <svg viewBox=\"25 25 50 50\" class=\"circular\">\n        <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" class=\"path\"></circle>\n      </svg>\n    </div>\n  </div> -->\n</div>\n"
  

});

 
 define('yls^busi/customer/agent/agentmanage/agent-manage.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _linkmanpanel = require('yls^busi/customer/agent/creditgrant/linkmanpanel.vue');
  
  var _linkmanpanel2 = _interopRequireDefault(_linkmanpanel);
  
  var _Shareholderpanel = require('yls^busi/customer/agent/creditgrant/Shareholderpanel.vue');
  
  var _Shareholderpanel2 = _interopRequireDefault(_Shareholderpanel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  //引入联系人和股东信息面板
  exports["default"] = {
    components: {
      'custlinkmanRef': _linkmanpanel2["default"],
      'ShareholderRef': _Shareholderpanel2["default"]
    },
    data: function data() {
  
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
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
        //企业客户名称
        if (rule.field === "customer_name") {
          if (value === '') {
            callback(new Error('企业客户名称不能为空'));
          } else {
            callback();
          }
        }
      };
      return {
        scrollDom: "ifbpScrollDom",
        pk_customer: "",
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        custVisible: false,
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = this.getNodeById($node, "jkcwc96ndh8");
          //定义操作
          var operateArr = [{
            title: "查看",
            icon: "search"
          }, {
            title: "删除",
            icon: "delete"
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
        },
  
        //企业客户基本信息修改
        //级联参照
        corpResetFun: function corpResetFun($node) {
          var $refNode1 = this.getNodeById($node, 'w85l2pcqcf'); //开户行省
          var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
          var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
          if ($refNode2.length) {
            $refNode2.attr("v-on:trigger", "handleRefChange2");
          }
          if ($refNode3.length) {
            $refNode3.attr("v-on:trigger", "handleRefChange3");
          }
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
            debugger;
            if (type === 'change') {
              debugger;
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.h_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
            debugger;
            if (type === 'change') {
              debugger;
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.m_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange3: function handleRefChange3(type, data) {
            debugger;
            if (type === 'change') {
              debugger;
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.s_ref.changeQueryParams(innerCode);
            }
          }
        },
        //基本信息
        agentIcons: [{
          icon: "plus",
          click: function click() {
            // if (oThis.pk_customer === "") {
            //   oThis.$message({
            //     message: "请先保存基本信息",
            //     type: "error"
            //   });
            //   return;
            // }
            // debugger;
            // let uitemplateComp = oThis.$refs.agentbaseTemplateRef.comp;
            // let table = uitemplateComp.$refs["CustCorp-form"];
            // table.closeExpandRow();
            // uitemplateComp.formShow = true;
            // //初始化值
            // oThis.$refs.agentbaseTemplateRef.setData("CustCorp", {
            //   // mobile:'13'
            // });
            // oThis.rmoveindex = "";
            // uitemplateComp.$refs["CustCorp-form"].resetFields();
            // 关闭table中的编辑区
            oThis.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
            // 重置新增数据
            debugger;
            if (oThis.pk_customer == "" || oThis.pk_customer == undefined) {
              oThis.$refs.agentbaseTemplateRef.resetFormData();
              // 显示新增区域
              oThis.$refs.agentbaseTemplateRef.comp.formShow = true;
            }
            oThis.customerEdit = !oThis.customerEdit;
          }
        }],
        //点击编辑
        baseIcons: [{
          icon: "edit",
          click: function click() {
            debugger;
            oThis.customerEdit = !oThis.customerEdit;
          }
        }],
        agentPk: "72f361bd-34e3-42ec-8933-d4fce9b0cd29",
        customerData: {
          customer: {},
          rules: {
            customer_name: [{ validator: validatecustomer, trigger: "blur" }],
            identity_no: [{ validator: validatecustomer, trigger: "blur" }],
            cusotmer_class: [
              // { required: true, message: "企业客户基本分类不能为空", trigger: "blur" }
            ]
          }
        },
        customerEdit: false,
        //联系人修改
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            debugger;
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
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
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }]
  
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {
      // debugger;
      //  this.id = this.$root.$router.currentRoute.params.id;
      //     // 如果是编辑请求, 则请求基本信息详情
      //     if (this.id) {
      //      this.request(this.currentPage - 1, this.size);
      //     }
      // this.request();
    },
  
    //页面操作
    mounted: function mounted() {
      this.agentrequest();
    },
  
    methods: {
      // afterCreate() {
      //   this.$nextTick(() => {
      //     var oThis = this;
      //     debugger;
  
      //     oThis.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
      //     // 重置新增数据
      //     if(oThis.pk_customer =="" || oThis.pk_customer ==undefined){
      //         oThis.$refs.agentbaseTemplateRef.resetFormData();
      //         oThis.customerEdit = false; 
      //     } else {
      //       oThis.customerEdit = true;          
      //     }
      //     // 显示新增区域
      //     oThis.$refs.agentbaseTemplateRef.comp.formShow = true;
      //   });
      // },
  
      /**
         *   初始响应方法
         **/
      agentrequest: function agentrequest() {
        this.pk_customer = this.$root.$router.currentRoute.params.id;
        //请求企业客户基本信息详情
        if (this.pk_customer === undefined) {
          this.pk_customer = "";
          this.customerEdit = true;
          this.request();
          return;
        }
        var method = this.$root.$router.currentRoute.name;
        if (method === "AgentManagedetail") {
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
  
      //后台请求
      request: function request() {
        var _this = this;
  
        debugger;
        var url = void 0;
        var baseUrl = _publicData.ylsBusi;
        url = baseUrl + 'cust/corp/page';
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": 0,
          "pageSize": 20,
          "searchParams": {
            "searchMap": {
              "creator": "102440"
            }
          }
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          //customer_table UI模板表格名称
          var originalValue = res.data.data.content;
          _this.$refs['agentbaseTemplateRef'].setData("CustCorp_t", JSON.parse(JSON.stringify(originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function (e) {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      tableDeleteClickRow: function tableDeleteClickRow(scope) {
        this.custVisible = true;
        this.delId = scope.row.pk_cust_corp;
      },
  
      //确认后调用删除
      tableDeleteClick: function tableDeleteClick(scope) {
        var _this2 = this;
  
        // let delId = scope.row.pk_cust_customer;
        debugger;
        this.$http({
          url: _publicData.ylsBusi + "cust/corp/deleteCustcpAndCust",
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
            _this2.custVisible = false;
            _this2.request();
          } else {
            _this2.$message({
              message: res.data.message,
              type: "error"
            });
            _this2.request();
          }
        })["catch"](function (e) {
          _this2.$message({
            message: "信息删除失败！",
            type: "error"
          });
          _this2.request();
        });
      },
      //代理商form取消按钮
      agentbaseFormCancel: function agentbaseFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs.agentbaseTemplateRef.comp.formShow = false;
        } else {
          this.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
        }
      },
      //代理商主表保存
      agentbaseFormConfirm: function agentbaseFormConfirm() {
        var _this3 = this;
  
        debugger;
        //获取当前数据
        var data = this.$refs.agentbaseTemplateRef.comp.customer;
        var data1 = this.$refs.agentbaseTemplateRef.comp.CustCorp;
        var jsonCustomer = JSON.parse(JSON.stringify(data));
        //设置为企业客户
        jsonCustomer.customer_type = 'CORP';
        //客户设置为代理商
        jsonCustomer.cusotmer_class = 'yls_dev100000000ffv';
        var jsonCustCorpObj = JSON.parse(JSON.stringify(data1));
        jsonCustCorpObj.cust_type = 'CORP';
        jsonCustomer.customer_name = jsonCustCorpObj.cust_name;
        // let a=[data1];
        var a = [jsonCustCorpObj];
        data = jsonCustomer;
        data.cust_corp_list = a;
        console.log(data);
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.agentbaseTemplateRef.comp.$refs["CustCorp-form"].validate(function (valid) {
          if (valid) {
            _this3.$http({
              url: baseUrl + "cust/customer/CustCorpInsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this3.$message({
                  message: "保存成功！",
                  type: "success"
                });
                debugger;
                _this3.originalValue = res.data.data;
                _this3.pk_customer = _this3.originalValue.pk_cust_customer;
                _this3.customerEdit = false;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                // let linarraydata = this.$refs.agentbaseTemplateRef.getData(
                //   "CustCorp_t"
                // );
                debugger;
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                // if (this.rmoveindex !== "") {
                //   linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                // } else {
                //   //加入数组开始
                //   linarraydata.unshift(this.originalValue);
                // }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                // this.$refs.agentbaseTemplateRef.setData(
                //   "CustCorp_t",
                //   JSON.parse(JSON.stringify(linarraydata))
                // );
                _this3.request();
                //隐藏详情列表
                _this3.$refs.agentbaseTemplateRef.comp.formShow = false;
                // this.rmoveindex = "";
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
  
      //请求企业客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this4 = this;
  
        debugger;
        this.$http({
          url: _publicData.ylsBusi + "cust/corp/getByPkCustomer",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          debugger;
          var originalValue = res.data.data;
          // this.$refs.baseTemplateRef.setData(
          //   "customer",
          //   JSON.parse(JSON.stringify(originalValue))
          // );
          _this4.$refs.agentbaseTemplateRef.setData("CustCorp", JSON.parse(JSON.stringify(originalValue)));
          _this4.request();
          _this4.$refs.agentbaseTemplateRef.comp.formShow = true;
        })["catch"](function (e) {
          console.error(e);
          _this4.$message({
            message: "代理商基本信息详情获取失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.customerEdit = false;
        // 重置value
      },
  
      //股东编辑
      updateagentbaseDataRow: function updateagentbaseDataRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        this.$refs.agentbaseTemplateRef.getTableComp().expandRow(scope.row);
        this.$refs.agentbaseTemplateRef.comp.formShow = false;
        this.$refs.agentbaseTemplateRef.setData('CustCorp', scope.row);
        this.customerEdit = true;
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">代理商管理</h2>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <!--企业客户基本信息模块界面-->\n      <ifbp-panel id=\"basePanel\" title=\"代理商信息\" :icons=\"agentIcons\">\n        <ifbp-template ref=\"agentbaseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"agentPk\"\n                  @form-confirm-click=\"agentbaseFormConfirm\"\n                  @form-cancel-click=\"agentbaseFormCancel\"\n                  show-type=\"table-form\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  :tplData=\"customerData\"\n                  :editable=\"customerEdit\"                  \n                  @delete-table-click=\"tableDeleteClickRow\"\n                  @search-table-click=\"updateagentbaseDataRow\"\n                  :pk_customer=\"pk_customer\">\n        </ifbp-template>\n        <el-dialog\n          title=\"提示\"\n          v-model=\"custVisible\"\n          :modal=\"true\"\n          size=\"tiny\">\n          <span>确认删除该条记录 ？删除后无法恢复。</span>\n          <span slot=\"footer\" class=\"dialog-footer\">\n            <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n            <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n          </span>\n        </el-dialog>\n       \n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"  title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\" title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      <!--财务报表模块界面-->\n      <ifbp-panel id=\"none\"    title=\"财务报表信息\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      <!-- 尽职调查 -->\n      <ifbp-panel id=\"none\"  title=\"尽职调查\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      <!--资料上传模块界面-->\n      <ifbp-panel id=\"none\"    title=\"资料上传\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      \n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/agentmanage/agentmanageinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)()], //分页方法引入
    data: function data() {
      return {
        //代理商信息资料表
        agentinfoPk: '9416d0f3-3d5b-4d9b-b8fa-5c1b002602b4',
        agentinfoData: {},
        showDeleteButton: false,
        delDialogVisible: false,
        agentinfoResetFun: function agentinfoResetFun($node) {
          var $table = this.getNodeById($node, 't7fci5oq9j');
          var operateArr = [{
            title: '编辑',
            icon: 'edit'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      var requestDefer = this.request();
      this.initPromise(requestDefer);
    },
  
  
    methods: {
      // 查询
      handleSearch: function handleSearch(searchTemplate) {
        this.sp = JSON.stringify(searchTemplate);
        this.request();
      },
  
      // table行的编辑操作
      tableEditClick: function tableEditClick(scope) {
        var pk_customer = scope.row.pk_cust_customer;
        location.hash = "/agentmanage/detail-edit/" + scope.row.pk_cust_customer;
        //  this.$emit('chang-apply-submitting', ['toapplycustomerlist',pk_customer,pk_application,customer_type]);
      },
      toagentbaseaddFun: function toagentbaseaddFun() {
        location.hash = "/agentmanageadd";
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
  
        debugger;
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": this.currentPage - 1,
          "pageSize": this.pageSize,
          "searchParams": {
            "searchMap": {
              'custCondList': [{ 'key': 'cusotmer_class',
                'oper': '=',
                'value': 'yls_dev100000000ffv'
              }],
              'qtAggVO': this.sp
            }
          }
        };
        var baseUrl = _publicData.ylsBusi;
        debugger;
        this.$http({
          url: baseUrl + 'cust/customer/page',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          debugger;
          _this.originalValue = res.data.data.content;
          _this.$refs.customertable.setData("customer_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function () {
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <div class=\"title-container\">\n    <h2 class=\"name\">代理商管理</h2>\n  </div>\n  <div class=\"operator-container\">\n    <div class=\"operator-title\">代理商信息资料表</div>\n    <div class=\"fr\">\n      <el-button class=\"button-no-radius\" @click=\"toagentbaseaddFun\">添加</el-button>\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n    \n  </div>\n\n  <div class=\"list-main-container clearfix\">\n    <ifbp-template ref=\"customertable\"\n                  tpl-id=\"agent-customer-table-id\"\n                  :pk-temp=\"agentinfoPk\"\n                  :tpl-data=\"agentinfoData\"\n                  show-type=\"table\"\n                  :tpl-reset-fun=\"agentinfoResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\">\n    </ifbp-template>\n\n     <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n\n    <!-- <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n      </span>\n    </el-dialog> -->\n    \n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/creditgrant/Shareholderpanel.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        shareholderfunnode: 'BT004',
        shareholdernexuskey: 'agent-shareholder',
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 股东信息新增
        ShareholderIcons: [{
          icon: "plus",
          click: function click() {
            // if(oThis.pk_customer===""){
            //   oThis.$message({
            //       message: "请先保存基本信息",
            //       type: "error"
            //     });
            //     return;
            // }
            var uitemplateComp = oThis.$refs.ShareholderRef.comp;
            var table = uitemplateComp.$refs["Shareholder_table"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        ShareholderData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        ShareholderResetFun: function ShareholderResetFun($node) {
          var $table = this.getNodeById($node, "266ene4nt9n");
  
          //股东参照联动
          var $refNode1 = this.getNodeById($node, 'linx947hht9');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
          // $table.attr(":show-header", "false");
          var operateArr = [{
            title: "编辑",
  
            icon: "edit"
          }, {
            title: "删除",
  
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
            if (type === 'change') {
  
              this.$refs['Shareholder-form'].model.share_type = data.value[0].customer_type;
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.request();
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
        debugger;
        if (this.pk_customer != "") {
          debugger;
          this.reqShhderByPkCustomer();
        } else {
          // this.requestShareholder();
          return;
        }
      },
  
      //请求股东信息
      requestShareholder: function requestShareholder() {
        var _this = this;
  
        var url = void 0;
        url = _publicData.ylsBusi + "cust/shareholder/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              'pk_customer': this.pk_customer
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
        })["catch"](function (e) {
          _this.$message({
            message: "股东信息获取失败",
            type: "error"
          });
        });
      },
  
      //通过pk_customer获得实体并注入到表格
      reqShhderByPkCustomer: function reqShhderByPkCustomer() {
        var _this2 = this;
  
        debugger;
        this.$http({
          url: window.ctxs.cust + 'cust/shareholder/getListbycolumn',
          headers: { "Content-Type": "application/json" },
          method: 'post',
          data: this.pk_customer
        }).then(function (res) {
          debugger;
          var originalValue = res.data.data;
          _this2.$refs.ShareholderRef.setData("Shareholder_t", JSON.parse(JSON.stringify(originalValue)));
          _this2.$refs["ShareholderRef"].comp.formShow = false;
        })["catch"](function (e) {
          console.error(e);
          _this2.$message({
            message: "股东信息详情获取失败",
            type: "error"
          });
        });
      },
  
      //股东情况保存
      ShareholderFormConfirm: function ShareholderFormConfirm() {
        var _this3 = this;
  
        //获取当前数据
        var data = this.$refs.ShareholderRef.comp.Shareholder;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.ShareholderRef.comp.$refs["Shareholder-form"].validate(function (valid) {
          if (valid) {
            _this3.$http({
              url: baseUrl + "cust/shareholder/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              debugger;
              if (res.data.success === true) {
                _this3.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this3.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this3.$refs.ShareholderRef.getData("Shareholder_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this3.rmoveindex !== "") {
                  linarraydata.splice(_this3.rmoveindex, 1, _this3.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this3.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this3.$refs.ShareholderRef.setData("Shareholder_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this3.$refs.ShareholderRef.comp.formShow = false;
              } else {
                _this3.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })["catch"](function (e) {
              debugger;
              _this3.$message({
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
      },
      //股东编辑
      ShareholderEditTableRow: function ShareholderEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["ShareholderRef"].getTableComp().expandRow(row);
        // this.$refs["ShareholderRef"].formShow = false;
        // //ShareholderRef为表单数据对象参数
        // this.$refs["ShareholderRef"].setData("Shareholder", row);
  
        this.$refs.ShareholderRef.getTableComp().expandRow(scope.row);
        this.$refs.ShareholderRef.comp.formShow = false;
        this.$refs.ShareholderRef.setData('Shareholder', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //股东信息删除提示
      ShareholderDeleteTableRow: function ShareholderDeleteTableRow(scope) {
        this.ShareholderDelVisible = true;
        this.delId = scope.row.pk_cust_shareholder;
      },
      //股东信息删除
      ShareholderDeleteClick: function ShareholderDeleteClick() {
        var _this4 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/shareholder/deleteById",
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
          } else {
            _this4.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
          _this4.reqShhderByPkCustomer();
        })["catch"](function (e) {
          _this4.$message({
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"ShareholderRef\"\n                      tplId=\"ShareholderTemplate\"\n                      :funnode=\"shareholderfunnode\"\n                      :nexuskey=\"shareholdernexuskey\"\n                      :tplData=\"ShareholderData\"\n                      :tplResetFun=\"ShareholderResetFun\"\n                      :tplMethods=\"ShareholderTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"ShareholderFormConfirm\"\n                      @form-cancel-click=\"ShareholderFormCancel\"\n                      @edit-table-click=\"ShareholderEditTableRow\"\n                      @delete-table-click=\"ShareholderDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 股东信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"ShareholderDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"ShareholderDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"ShareholderDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/creditgrant/agentbaseinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['pkCustomerVal', 'credit_grant', 'editable'],
    data: function data() {
  
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {
        debugger;
        //证件号码唯一校验
        if (rule.field === "1111") {
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
        //代理商名称
        if (rule.field === "cust_name") {
          if (value === '') {
            callback(new Error('代理商名称不能为空'));
          } else {
            oThis.agentByCustName(value);
            callback();
          }
        } else if (rule.field === 'org_codecertificate') {}
      };
      return {
        //显示的标题
        title: '',
        agentbasefunnode: 'BT004',
        agentbasenexuskey: 'agentbaseinfo',
        scrollDom: "ifbpScrollDom",
        pk_customer: '',
        rmoveindex: "",
        delId: "",
        custVisible: false,
        isGetEntity: false,
        fillData: '',
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = this.getNodeById($node, "jkcwc96ndh8");
          //定义操作
          var operateArr = [{
            title: "查看",
            icon: "search"
          }, {
            title: "删除",
            icon: "delete"
          }];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
  
          // 判断是否有所属厂商
          var $CustCorp_have_belongto = $node.find("el-select[v-model='CustCorp.have_belongto']");
          if ($CustCorp_have_belongto.length) {
            $CustCorp_have_belongto.attr("v-on:change", "havebelongtoFun");
          }
          // 所属厂商及所属事业部绑定属性
          var $manufacturer = $node.find("el-ref[field='manufacturer'], el-select[v-model='CustCorp.hava_busi_division']");
          $manufacturer.attr('v-bind:disabled', 'belongToIsDisabled');
  
          // 判断是否有三证或者一证  
          var $CustCorp_three_certifcates = $node.find("el-select[v-model='CustCorp.three_certifcates']");
          if ($CustCorp_three_certifcates.length) {
            $CustCorp_three_certifcates.attr("v-on:change", "threeCertifcatesFun");
          }
          debugger;
          // 三证属性绑定
          var $threeCertifcates = $node.find("el-input[v-model='CustCorp.org_codecertificate'], el-input[v-model='CustCorp.license_no'],el-input[v-model='CustCorp.tax_registercode']");
          $threeCertifcates.attr('v-bind:disabled', 'threeCertifcates');
          // 一证属性绑定
          var $oneCertifcates = $node.find("el-input[v-model='CustCorp.society_credit']");
          $oneCertifcates.attr('v-bind:disabled', 'oneCertifcates');
  
          return $node[0].outerHTML;
        },
        //代理商基本信息修改
        //级联参照
        // corpResetFun: function($node) {
        //   var $refNode1 = this.getNodeById($node, 'w85l2pcqcf');  //开户行省
        //    var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
        //     var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
  
  
        //   if($refNode1.length) {
        //     $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        //   }
        //   if($refNode2.length) {
        //     $refNode2.attr("v-on:trigger", "handleRefChange2"); 
        //   }
        //   if($refNode3.length) {
        //     $refNode3.attr("v-on:trigger", "handleRefChange3"); 
        //   }
  
        // },
        formReSetMethods: {
          // 三证或一证
          threeCertifcatesFun: function threeCertifcatesFun(data) {
            if (data && data !== '') {
              debugger;
              if (data == 'Y') {
                this.threeCertifcates = false;
                this.oneCertifcates = true;
              } else if (data == 'N') {
                this.oneCertifcates = false;
                this.threeCertifcates = true;
              } else {
                this.oneCertifcates = true;
                this.threeCertifcates = true;
              }
            }
          },
  
          // 是否有厂商
          havebelongtoFun: function havebelongtoFun(data) {
            if (data && data !== '') {
              if (data == "YES") {
                this.belongToIsDisabled = false;
              } else {
                this.belongToIsDisabled = true;
              }
            }
          }
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
            if (type === 'change') {
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.h_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
            if (type === 'change') {
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.m_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange3: function handleRefChange3(type, data) {
            if (type === 'change') {
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.s_ref.changeQueryParams(innerCode);
            }
          }
        },
  
        customerData: {
          customer: {},
          belongToIsDisabled: true, //所属厂商的disabled熟悉设置
          threeCertifcates: true, //判断是否有三证
          oneCertifcates: true, //判断是一证
          rules: {
            cust_name: [{ validator: validatecustomer, trigger: "blur" }], //代理商名称校验
            org_codecertificate: [{ validator: validatecustomer, trigger: "blur" }],
            cusotmer_class: []
          }
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
        this.request();
      },
      editable: function editable(val) {
        this.agentEdit = val;
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
        this.pk_customer = this.pkCustomerVal;
        //请求企业客户基本信息详情
        if (this.pk_customer === undefined || this.pk_customer === '') {
          this.pk_customer = '';
          this.agentEdit = true;
          // this.agentRequest();
          debugger;
          this.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
          this.$refs.agentbaseTemplateRef.formShow = true;
          return;
        }
        if (this.credit_grant == "creditgrant") {
          if (this.pk_customer != "") {
            // this.requestCustBaseInfo();
            this.agentEdit = false;
            this.requestByPk();
          }
        }
      },
  
      //后台请求
      agentRequest: function agentRequest() {
        var _this = this;
  
        var url = void 0;
        var baseUrl = _publicData.ylsBusi;
        url = baseUrl + 'cust/corp/pageAgent';
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": 0,
          "pageSize": 200,
          "searchParams": {
            "searchMap": {
              "creator": "102440"
            }
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
          _this.$refs['agentbaseTemplateRef'].setData("CustCorp_t", JSON.parse(JSON.stringify(originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          _this.size = res.data.data.size; // 每页的条数
        })["catch"](function (e) {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      // 客户回写
      agentByCustName: function agentByCustName(name) {
        var _this2 = this;
  
        debugger;
        var nameVal = name;
        this.$http({
          url: _publicData.ylsBusi + 'cust/corp/getEntityByCustName',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: nameVal,
          dataType: 'json'
        }).then(function (res) {
          var originalValue = res.data.data;
          if (res.data.success == true && originalValue != null) {
            _this2.isGetEntity = true;
            _this2.fillData = originalValue; //给回写的数据赋值
          }
          _this2.agentEdit = true;
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      // 带出后填入数据
      fillInDate: function fillInDate() {
        var originalValue = this.fillData;
        this.$refs.agentbaseTemplateRef.setData('CustCorp', JSON.parse(JSON.stringify(originalValue)));
        var pk_customer = originalValue.pk_customer;
        this.$emit('change-agent-base', pk_customer);
        this.isGetEntity = false;
      },
  
  
      // 通过pk获取对象
      requestByPk: function requestByPk() {
        var _this3 = this;
  
        var url = void 0;
        var baseUrl = _publicData.ylsBusi;
        url = baseUrl + "cust/corp/getByPkCustomer";
        var data = this.pk_customer;
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs.agentbaseTemplateRef.setData("CustCorp_t", JSON.parse(JSON.stringify([originalValue])));
          _this3.$refs.agentbaseTemplateRef.comp.formShow = false;
        })["catch"](function (e) {
          _this3.$message({
            message: "代理商基本信息详情获取失败",
            type: "error"
          });
        });
      },
  
  
      // 弹出删除提示框
      tableDeleteClickRow: function tableDeleteClickRow(scope) {
        this.delId = scope.row.pk_cust_corp;
        // this.agentRequest();
        this.custVisible = true;
      },
  
      //确认后调用删除
      tableDeleteClick: function tableDeleteClick(scope) {
        var _this4 = this;
  
        debugger;
        // let delId = scope.row.pk_cust_customer;
        this.$http({
          url: _publicData.ylsBusi + "cust/corp/deleteCustcpAndCust",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          if (res.data.success === true) {
            _this4.$message({
              message: "删除成功",
              type: "success"
            });
            _this4.custVisible = false;
          } else {
            debugger;
            _this4.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
          _this4.agentRequest();
        })["catch"](function (e) {
          debugger;
          _this4.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      },
      //代理商form取消按钮
      agentbaseFormCancel: function agentbaseFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs.agentbaseTemplateRef.comp.formShow = false;
        } else {
          this.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
        }
      },
      //代理商主表保存
      agentbaseFormConfirm: function agentbaseFormConfirm() {
        var _this5 = this;
  
        debugger;
        //获取当前数据
        var data = this.$refs.agentbaseTemplateRef.comp.customer;
        var data1 = this.$refs.agentbaseTemplateRef.comp.CustCorp;
        var jsonCustomer = JSON.parse(JSON.stringify(data));
        //设置为企业客户
        jsonCustomer.customer_type = 'CORP';
        //客户设置为代理商
        jsonCustomer.cusotmer_class = 'yls_dev100000000ffv';
        var jsonCustCorpObj = JSON.parse(JSON.stringify(data1));
        jsonCustCorpObj.cust_type = 'CORP';
        jsonCustomer.customer_name = jsonCustCorpObj.cust_name;
        // let a=[data1];
        var a = [jsonCustCorpObj];
        data = jsonCustomer;
        data.cust_corp_list = a;
        console.log(data);
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        debugger;
        this.$refs.agentbaseTemplateRef.comp.$refs["CustCorp-form"].validate(function (valid) {
          if (valid) {
            _this5.$http({
              url: baseUrl + "cust/customer/orgAnddept",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
  
                _this5.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this5.originalValue = res.data.data;
                _this5.pk_customer = _this5.originalValue.pk_cust_customer;
                _this5.$emit('change-agent-base', _this5.pk_customer);
                _this5.agentEdit = false;
                _this5.agentRequest();
                debugger;
                _this5.$parent.$parent.$parent.$refs.operationTable.pk_customer = _this5.pk_customer;
                _this5.$parent.$parent.$parent.$refs.operationTable.reqOptByPkCustomer();
                //隐藏详情列表
                _this5.$refs.agentbaseTemplateRef.comp.formShow = false;
              } else {
                _this5.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })["catch"](function (e) {
              _this5.$message({
                message: "更新失败",
                type: "error"
              });
            });
          }
        });
      },
  
      // customerCancel() {
      //   this.agentEdit = false;
      //   // 重置value
      // },
      //代理商编辑
      updateagentbaseDataRow: function updateagentbaseDataRow(scope) {
        //记录删除位置
        debugger;
        this.rmoveindex = scope.$index;
        this.$refs.agentbaseTemplateRef.getTableComp().expandRow(scope.row);
        this.$refs.agentbaseTemplateRef.comp.formShow = false;
        this.$refs.agentbaseTemplateRef.setData('CustCorp', scope.row);
        this.agentEdit = true;
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
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
  __vue__options__.template = "\n<div>\n      <!--代理商基本信息模块界面-->\n          <ifbp-template ref=\"agentbaseTemplateRef\"\n                    tplId=\"baseTemplate\"\n                    :funnode=\"agentbasefunnode\"\n                    :nexuskey=\"agentbasenexuskey\"\n                    @form-confirm-click=\"agentbaseFormConfirm\"\n                    @form-cancel-click=\"agentbaseFormCancel\"\n                    show-type=\"table-form\"\n                    :methods=\"formReSetMethods\"\n                    :tplResetFun=\"templateTableFormResetFun\"\n                    :tplData=\"customerData\"\n                    :editable=\"agentEdit\"                  \n                    @delete-table-click=\"tableDeleteClickRow\"\n                    @search-table-click=\"updateagentbaseDataRow\">\n          </ifbp-template>\n          <el-dialog\n            title=\"提示\"\n            v-model=\"custVisible\"\n            :modal=\"true\"\n            size=\"tiny\">\n            <span>确认删除该条记录 ？删除后无法恢复</span>\n            <span slot=\"footer\" class=\"dialog-footer\">\n              <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n              <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n            </span>\n          </el-dialog>\n\n           <el-dialog\n            title=\"提示\"\n            v-model=\"isGetEntity\"\n            :modal=\"true\"\n            size=\"tiny\">\n            <span>输入客户已经存在，请确认是否带出并自动填入</span>\n            <span slot=\"footer\" class=\"dialog-footer\">\n              <el-button @click=\"isGetEntity = false, this.delId=''\">不 带</el-button>\n              <el-button type=\"primary\" @click=\"fillInDate\">带 出</el-button>\n            </span>\n          </el-dialog>\n  </div>\n"
  

});
 
 define('yls^busi/customer/agent/creditgrant/creditgrantapply.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      data: function data() {
          return {
              //模版主键
              // pk_temp:'54bf78a0-6e0a-44d2-aeb8-f0c23c1c2a06',
              creditApplyfunnode: 'BT004',
              creditApplynexuskey: 'CreditApply',
              mixins: [(0, _publicData.pagination)()], //分页方法引入
              creditapplyListData: {},
              delDialogVisible: false,
              agentnameval: '',
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = this.getNodeById($node, 'sgoj12dnalh');
                  //定义操作
                  var operateArr = [
                  // {
                  //     icon:'pt-bianji',
                  //     title:"查看",
                  // },
                  {
                      icon: 'upload2',
                      title: '发起申请'
                  }, {
                      icon: 'delete',
                      title: '删除'
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
          addagentinfo: function addagentinfo() {
              this.$emit('change-credit-grant', ['tocreditgrantadd', '']);
          },
          tableApplyClick: function tableApplyClick(scope) {
              var agentname = scope.row.agent_name;
              this.$emit("change-credit-grant", ['tocreditgrantinfo', agentname]);
          },
          handleSizeChange: function handleSizeChange(sizeVal) {
              this.size = window.pageSize = sizeVal;
              var maxPage = Math.ceil(this.totalSize / sizeVal);
              if (maxPage >= this.currentPage) {
                  this.request(this.currentPage - 1, this.size);
              }
          },
          handleCurrentChange: function handleCurrentChange(currVal) {
              this.currentPage = currVal;
              this.request(this.currentPage - 1, this.size);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = '/agentbaseadd/' + scope.row.agent_name;
          },
  
          // 申请授信按钮
          creditApply: function creditApply() {
              location.hash = '/operation/add';
          },
  
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              debugger;
              this.delDialogVisible = true;
              this.pk_operation_protocol = scope.row.pk_operation_protocol;
              this.agentnameval = scope.row.agent_name;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              debugger;
              var agentPk = this.agentnameval;
              this.$http({
                  url: _publicData.ylsBusi + 'cust/operation/delsubAndchid',
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  dataType: "json",
                  data: agentPk
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
                      message: "删除失败",
                      type: "error"
                  });
              });
          },
          request: function request(n, s) {
              var _$http,
                  _this2 = this;
  
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  "pageNum": this.currentPage - 1,
                  "pageSize": this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'customer_class',
                              'oper': '=',
                              'value': 'yls_dev100000000ffv'
                          }],
                          'qtAggVO': this.sp
                      }
                  }
              };
              this.$http((_$http = {
                  url: _publicData.ylsBusi + 'cust/operation/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data }, _$http['data'] = data, _$http.dataType = 'json', _$http)).then(function (res) {
                  //QuoteCalculator_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs['creditapplyList-table'].setData('OperationProtocol_t', originalValue);
                  _this2.totalSize = res.data.data.totalElements; // 总条数
                  _this2.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  console.log(e);
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">代理商授信信息表</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"creditapply-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addagentinfo\">新增</el-button>\n      <!-- <el-button type=\"primary\" class=\"button-no-radius\" @click=\"creditApply\">申请授信</el-button> -->\n    </div>\n\n    <div class=\"fr\">\n      <el-input placeholder=\"输入代理商名称即可搜索\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!-- 报价列表 -->\n <div id=\"creditapplyList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"creditapplyList-table\"\n                  tplId=\"creditapplyList-template\"\n                  :funnode=\"creditApplyfunnode\"\n                  :nexuskey=\"creditApplynexuskey\"\n                  :tplData=\"creditapplyListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @upload2-table-click=\"tableApplyClick\"\n                  @delete-table-click=\"tableDeleteClick\">\n    </ifbp-template>\n    <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n\n    <!-- 删除确认Dialog -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/creditgrant/creditgrantinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _agentbaseinfo = require('yls^busi/customer/agent/creditgrant/agentbaseinfo.vue');
  
  var _agentbaseinfo2 = _interopRequireDefault(_agentbaseinfo);
  
  var _linkmanpanel = require('yls^busi/customer/agent/creditgrant/linkmanpanel.vue');
  
  var _linkmanpanel2 = _interopRequireDefault(_linkmanpanel);
  
  var _Shareholderpanel = require('yls^busi/customer/agent/creditgrant/Shareholderpanel.vue');
  
  var _Shareholderpanel2 = _interopRequireDefault(_Shareholderpanel);
  
  var _operation_info = require('yls^busi/customer/agent/creditgrant/operation_info.vue');
  
  var _operation_info2 = _interopRequireDefault(_operation_info);
  
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
  
  // import {ylsBusi} from '../../../../../common/js/publicData.js';
  //引入代理商相关列表
  exports["default"] = {
    components: {
      'agentbaseinfo': _agentbaseinfo2["default"],
      'custlinkmanRef': _linkmanpanel2["default"],
      'ShareholderRef': _Shareholderpanel2["default"],
      'operationinfo': _operation_info2["default"]
    },
    props: ['pkCustomerVal', 'creditgrant'],
    data: function data() {
      var oThis = this;
      return {
        //显示的标题
        title: '',
        scrollDom: "ifbpScrollDom",
        pk_customer: '',
        credit_grant: '',
        customer_Edit: '',
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        custVisible: false,
        none: [],
        //联系人
        agentIcons: [{
          icon: "plus",
          click: function click() {
            debugger;
            // 重置新增数据
            if (oThis.pk_customer == "" || oThis.pk_customer == undefined) {
              oThis.$refs.agentbaseTemplateRef.$refs.agentbaseTemplateRef.resetFormData();
            } else if (oThis.pk_customer) {
              oThis.$message({
                message: "发起申请时不可添加代理商"
              });
              return;
            }
            debugger;
            // 显示新增区域
            oThis.$refs.agentbaseTemplateRef.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
            oThis.$refs.agentbaseTemplateRef.$refs.agentbaseTemplateRef.comp.formShow = true;
            oThis.agentEdit = !oThis.agentEdit;
          }
        }],
        //代理商基本信息修改
        //级联参照
        corpResetFun: function corpResetFun($node) {
          var $refNode1 = this.getNodeById($node, 'w85l2pcqcf'); //开户行省
          var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
          var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
          if ($refNode2.length) {
            $refNode2.attr("v-on:trigger", "handleRefChange2");
          }
          if ($refNode3.length) {
            $refNode3.attr("v-on:trigger", "handleRefChange3");
          }
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
            if (type === 'change') {
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.h_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
            if (type === 'change') {
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.m_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange3: function handleRefChange3(type, data) {
            if (type === 'change') {
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.s_ref.changeQueryParams(innerCode);
            }
          }
        },
  
        agentPk: "72f361bd-34e3-42ec-8933-d4fce9b0cd29",
        agentEdit: false,
        //联系人修改
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息"
              });
              return;
            }
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
          }
        }],
        // 股东信息新增
        ShareholderIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息"
              });
              return;
            }
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }],
        // 合作协议
        OperationIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息"
              });
              return;
            } else if (oThis.pk_customer) {
              var requestPromise = oThis.$refs.operationTable.isExisted();
              requestPromise.then(function (retVal) {
                debugger;
                if (retVal == 1) {
                  return;
                } else if (retVal == -1) {
                  oThis.$refs.operationTable.$refs.operationTable.getTableComp().closeExpandRow();
                  // 重置新增数据
                  oThis.$refs.operationTable.$refs.operationTable.resetFormData();
                  // 显示新增区域
                  oThis.$refs.operationTable.$refs.operationTable.comp.formShow = true;
                }
              });
            }
          }
        }]
  
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {
      this.loadTitleData();
      debugger;
      this.pk_customer = this.pkCustomerVal;
    },
  
    //页面操作
    mounted: function mounted() {},
  
    methods: {
      creditApply: function creditApply() {},
  
      //点击返回出发 
      goback: function goback() {
        this.$emit('change-credit-edit', 'tocreditgrantapply');
      },
  
      //  加载标题
      loadTitleData: function loadTitleData() {
        if (this.pkCustomer) {
          this.title = '代理商授信信息表 > 发起申请';
        } else {
          this.title = '代理商授信信息表 > 添加';
        }
      },
  
      // 代理商pk改变时触发
      changeagentbase: function changeagentbase(val) {
        if (val) {
          this.pk_customer = val;
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"creditgrant-container\">\n    <span>\n       <h2 class=\"name\">{{ title }}</h2>\n    </span>\n    <span class=\"fr\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"goback\">回退</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"creditApply\">申请授信</el-button>\n    </span>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"206\"> \n      <!--代理商基本信息模块界面-->\n      <ifbp-panel id=\"basePanel\" title=\"代理商信息\" :icons='agentIcons'>\n        <agentbaseinfo\n            ref='agentbaseTemplateRef'\n            :pkCustomerVal='pkCustomerVal'\n            :credit_grant='creditgrant'\n            :editable='agentEdit'\n            @change-agent-base='changeagentbase'>\n        </agentbaseinfo>\n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"  title=\"联系人信息\" :icons='linkmanIcons'>\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\" title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      <!--财务报表模块界面-->\n      <ifbp-panel id=\"none\"  title=\"财务报表信息\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      <!--合作协议-->\n      <ifbp-panel id=\"operationTableRef\"  title=\"合作协议\" :icons=\"OperationIcons\">\n        <operationinfo\n          ref=\"operationTable\"\n          :pk_customer=\"pk_customer\">\n        </operationinfo>\n      </ifbp-panel>\n      <!-- 尽职调查 -->\n      <ifbp-panel id=\"none\"  title=\"尽职调查\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      <!--资料上传模块界面-->\n      <ifbp-panel id=\"none\"    title=\"资料上传\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      \n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/creditgrant/linkmanpanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_customer"],
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
              url: window.ctxs.cust + "cust/customer/checkOnlyOne",
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
        linkmanfunnode: 'BT004',
        linkmannexuskey: 'agent-linkman',
        linkmanDelVisible: false,
        rmoveindex: "",
        delId: "",
        custlinkmanData: {
          // rules: {
          //   customer_name: [
          //     { required: true, message: "请输入联系人名称", trigger: "blur" }
          //   ]
          // }
        },
        //渲染表格
        linkmanResetFun: function linkmanResetFun($node) {
          var $refNode = this.getNodeById($node, 'ow80d1amej'); //开户行省
  
          if ($refNode.length) {
            $refNode.attr("v-on:trigger", "handleRefChange");
          }
  
          var $table = this.getNodeById($node, "z629xchuu6r");
          //  $table.attr(':show-header','false');
          var operateArr = [{
            title: "编辑",
  
            icon: "edit"
          }, {
            title: "删除",
  
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
        },
        t_Methods: {
          handleRefChange: function handleRefChange(type, data) {
            if (type === 'change') {
  
              var param = { 'key': data.value[0].innercode };
              oThis.$refs.custlinkmanRef.setData('cityParams', param);
            }
          }
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
        // this.requestCustlinkman();
        // this.requestLinkManByPkCustomer();
        this.request();
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
        debugger;
        if (this.pk_customer != "") {
          this.requestLinkManByPkCustomer();
        } else {
          // this.requestCustlinkman();
          return;
        }
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this = this;
  
        var url = void 0;
        url = window.ctxs.cust + "cust/otherContact/page";
        var data = {
          pageNum: 0,
          pageSize: 100,
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
          _this.originalValue = res.data.data.content;
          _this.$refs["custlinkmanRef"].setData("OtherContact_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
  
      //请求联系人基本信息详情
      requestLinkManByPkCustomer: function requestLinkManByPkCustomer() {
        var _this2 = this;
  
        debugger;
        this.$http({
          url: window.ctxs.cust + 'cust/otherContact/getListbycolumn',
          headers: { "Content-Type": "application/json" },
          method: 'post',
          data: this.pk_customer
        }).then(function (res) {
          debugger;
          var originalValue = res.data.data;
          _this2.$refs.custlinkmanRef.setData("OtherContact_t", JSON.parse(JSON.stringify(originalValue)));
          _this2.$refs["custlinkmanRef"].comp.formShow = false;
          debugger;
        })["catch"](function (e) {
          debugger;
          console.error(e);
          _this2.$message({
            message: "联系人信息详情获取失败",
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
        }
      },
      //联系人主表保存
      linkmanFormConfirm: function linkmanFormConfirm() {
        var _this3 = this;
  
        debugger;
        //获取当前数据
        var data = this.$refs.custlinkmanRef.comp.OtherContact;
        data.pk_customer = this.pk_customer;
        var baseUrl = window.ctxs.cust;
        //保存校验
        this.$refs.custlinkmanRef.comp.$refs["OtherContact-from"].validate(function (valid) {
          if (valid) {
            _this3.$http({
              url: baseUrl + "cust/otherContact/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this3.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this3.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this3.$refs.custlinkmanRef.getData("OtherContact_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (_this3.rmoveindex !== "") {
                  linarraydata.splice(_this3.rmoveindex, 1, _this3.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this3.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this3.$refs.custlinkmanRef.setData("OtherContact_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this3.$refs["custlinkmanRef"].comp.formShow = false;
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
      //联系人行编辑
      linkmanFormedit: function linkmanFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //新增的界面方式进行修改
        // let uitemplateComp = this.$refs.custlinkmanRef.comp;
        // let table = uitemplateComp.$refs["OtherContact_t_ref"];
        // table.closeExpandRow();
        // uitemplateComp.linkman = {};
        // uitemplateComp.formShow = true;
        // this.$refs.custlinkmanRef.comp.OtherContact = scope.row;
  
        //行下展开表单界面
        var row = scope.row;
        this.$refs["custlinkmanRef"].getTableComp().expandRow(row);
        this.$refs["custlinkmanRef"].formShow = false;
        //OtherContact为表单数据对象参数
        this.$refs["custlinkmanRef"].setData("OtherContact", row);
      },
      //联系人删除提示
      linkmanFormdelete: function linkmanFormdelete(scope) {
        this.linkmanDelVisible = true;
        this.delId = scope.row.pk_cust_other_contact;
      },
      //联系人删除方法
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this4 = this;
  
        this.$http({
          url: window.ctxs.cust + "cust/otherContact/deleteById",
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
            //this.delDialogVisible = false;
            _this4.requestLinkManByPkCustomer();
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
  __vue__options__.template = "\n<!--联系人信息管理模块-->\n<div>\n       <ifbp-template ref=\"custlinkmanRef\"\n                        tplId=\"linkmanTemplate\"\n                        :funnode=\"linkmanfunnode\"\n                        :nexuskey=\"linkmannexuskey\"\n                        :tplData=\"custlinkmanData\"\n                        :tplResetFun=\"linkmanResetFun\"\n                        @form-confirm-click=\"linkmanFormConfirm\"\n                        @form-cancel-click=\"linkmanFormCancel\"\n                        show-type=\"table-form\"\n                        @edit-table-click=\"linkmanFormedit\"\n                        @delete-table-click=\"linkmanFormdelete\"\n                        :methods=\"t_Methods\">\n          </ifbp-template>\n\n    <!-- 代理商联系人 删除提示框 -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"linkmanDelVisible\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该条记录？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"linkmanDelVisible = false , this.delId=''\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n  </div>\n"
  

});
 
 define('yls^busi/customer/agent/creditgrant/operation_info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ['pk_customer'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        operationDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT004',
        nexusKey: 'OperationProtocol',
        operationData: {},
        t_Methods: {},
        operationResetFun: function operationResetFun($node) {
          if (oThis.invisible) {
            return;
          }
          var $refNode = this.getNodeById($node, '1nnheivkgfc'); //获取客户参照
          if (oThis.pid !== undefined) {
            $refNode.attr("v-bind:disabled", 'true'); //客户参照只读
          } else {
            $refNode.attr("v-bind:disabled", 'false'); //客户参照可编辑
          }
          var $table = $node.find("el-table");
          var operateArr = [{
            title: '编辑',
  
            icon: 'edit'
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
        },
  
        operationTplMethods: {
          // form的保存操作
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
        this.request();
      }
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
        debugger;
        if (this.pk_customer != '') {
          this.reqOptByPkCustomer();
        } else {
          //  this.requestOperation();
          return;
        }
      },
      closeAddForm: function closeAddForm() {
        this.$refs['operationTable'].comp.formShow = false; //关闭添加表单事件
      },
  
      //请求合作协议信息
      requestOperation: function requestOperation() {
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
              'custCondList': [{ 'key': 'customer_class',
                'oper': '=',
                'value': 'yls_dev100000000ffv'
              }],
              'qtAggVO': this.sp
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['operationTable'].setData('OperationProtocol_t', JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '合作协议信息获取失败',
            type: 'error'
          });
        });
      },
  
      //根具pk_customer获取合作协议
      reqOptByPkCustomer: function reqOptByPkCustomer() {
        var _this2 = this;
  
        debugger;
        var pk = this.pk_customer;
        this.$http({
          url: window.ctxs.cust + 'cust/operation/getbycolumn',
          headers: { "Content-Type": "application/json" },
          method: 'post',
          data: pk
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs.operationTable.setData("OperationProtocol_t", JSON.parse(JSON.stringify([originalValue])));
          _this2.$refs["operationTable"].comp.formShow = false;
          debugger;
        })["catch"](function (e) {
          debugger;
          console.error(e);
          _this2.$message({
            message: "合作协议信息获取失败",
            type: "error"
          });
        });
      },
  
      //合作协议保存
      operationFormConfirm: function operationFormConfirm() {
        var _this3 = this;
  
        //获取当前数据
        debugger;
        var url = void 0;
        var data = this.$refs.operationTable.comp.OperationProtocol;
        data.agent_name = this.pk_customer;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/UpdateOrCreate',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          debugger;
          _this3.editable = false;
          if (res.data.success === true) {
            _this3.$message({
              message: '保存成功',
              type: 'success'
            });
            var originalValue = res.data.data;
            //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
            debugger;
            var linarraydata = _this3.$refs.operationTable.getData("OperationProtocol_t");
            /**@augments 移除位置 
             * @augments 移除个数
             * @augments 用新的对象替换（不传值则删除）
             */
            if (_this3.rmoveindex !== "") {
              linarraydata.splice(_this3.rmoveindex, 1, _this3.originalValue);
            } else {
              //加入数组开始
              linarraydata.unshift(_this3.originalValue);
            }
            //给对象赋值
            _this3.$refs.operationTable.setData("OperationProtocol_t", JSON.parse(JSON.stringify(linarraydata)));
            // this.requestOperation();
            //隐藏详情列表
            _this3.$refs['operationTable'].comp.formShow = false;
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: '保存失败',
            type: 'error'
          });
        });
      },
  
      // 合作协议form的取消操作
      operationFormCancel: function operationFormCancel(type) {
        if (type === 'form') {
          this.$refs['operationTable'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['operationTable'].getTableComp().closeExpandRow();
        }
      },
  
      //合作协议编辑
      operationEditTableRow: function operationEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['operationTable'].getTableComp().expandRow(row);
        this.$refs['operationTable'].formShow = false;
        //operationTable为表单数据对象参数
        this.$refs['operationTable'].setData('OperationProtocol', row);
      },
  
      //合作协议删除提示
      operationDeleteTableRow: function operationDeleteTableRow(scope) {
        this.operationDelVisible = true;
        // this.pk_operation_protocol = scope.row.pk_operation_protocol;
        this.delId = scope.row.pk_operation_protocol;
      },
  
      //合作协议删除
      operationDeleteClick: function operationDeleteClick() {
        var _this4 = this;
  
        debugger;
        var id = this.delId;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          debugger;
          if (res.data.success === true) {
            _this4.$message({
              message: '删除成功',
              type: 'success'
            });
          } else {
            debugger;
            _this4.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          debugger;
          _this4.$message({
            message: '信息删除失败',
            type: 'error'
          });
        });
        this.operationDelVisible = false;
        this.delId = '';
      },
  
      // 判断是否已经有了合作协议
      isExisted: function isExisted() {
        var _this5 = this;
  
        var promise = new Promise(function (resolve, reject) {
          debugger;
          var val = _this5.pk_customer;
          _this5.$http({
            url: window.ctxs.cust + 'cust/operation/isExistedByPk',
            headers: { "Content-Type": "application/json" },
            method: 'post',
            data: val
          }).then(function (res) {
            debugger;
            var retVal = res.data.data;
            if (retVal == 1) {
              _this5.$message({
                message: "代理商对应的协议已经存在，不可再添加"
              });
            }
            resolve(retVal);
          })["catch"](function (e) {
            debugger;
            reject();
            console.error(e);
            _this5.$message({
              message: "合作协议信息获取失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"operationTable\"\n                      tplId=\"operationTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexusKey\"\n                      :tplData=\"operationData\"\n                      :tplResetFun=\"operationResetFun\"\n                      :tplMethods=\"operationTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"operationFormConfirm\"\n                      @form-cancel-click=\"operationFormCancel\"\n                      @edit-table-click=\"operationEditTableRow\"\n                      @delete-table-click=\"operationDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 合作协议信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"operationDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"operationDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"operationDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/main/creditgrantmain.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _creditgrantapply = require('yls^busi/customer/agent/creditgrant/creditgrantapply.vue');
  
  var _creditgrantapply2 = _interopRequireDefault(_creditgrantapply);
  
  var _creditgrantinfo = require('yls^busi/customer/agent/creditgrant/creditgrantinfo.vue');
  
  var _creditgrantinfo2 = _interopRequireDefault(_creditgrantinfo);
  
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
  
  exports["default"] = {
    components: {
      'creditgrant': _creditgrantapply2["default"],
      'creditgrantedit': _creditgrantinfo2["default"]
    },
    data: function data() {
      return {
        activeName: 'first',
        istrue: true,
        pkCustomerVal: '',
        creditgrant: ''
      };
    },
  
    methods: {
      handleClick: function handleClick(tab, event) {
        console.log(tab, event);
      },
      changecreditgrant: function changecreditgrant(val) {
        if ('tocreditgrantadd' == val[0]) {
          this.istrue = false;
        } else if ('tocreditgrantinfo' == val[0]) {
          this.istrue = false;
          this.pkCustomerVal = val[1];
          this.creditgrant = 'creditgrant';
        }
      },
      changecreditedit: function changecreditedit(val) {
        if (val) {
          this.pkCustomerVal = '';
          this.istrue = true;
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
  __vue__options__.template = "\n<el-tabs id=\"busi-agent-apply\" v-model=\"activeName\" @tab-click=\"handleClick\">\n  <el-tab-pane label=\"代理商授信申请\" name=\"first\">\n      <creditgrant v-if=\"istrue\" @change-credit-grant='changecreditgrant'></creditgrant>\n       <creditgrantedit v-else :pkCustomerVal='pkCustomerVal' :creditgrant='creditgrant' @change-credit-edit='changecreditedit'>\n       </creditgrantedit>\n  </el-tab-pane>\n   <el-tab-pane label=\"已授信代理商\" name=\"second\">\n     已授信代理商\n  </el-tab-pane>\n</el-tabs>\n\n"
  

});
 
 define('yls^busi/customer/agent/main/creditmanufacturer.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _creditfactoryapply = require('yls^busi/customer/agent/manufacturer/creditfactoryapply.vue');
  
  var _creditfactoryapply2 = _interopRequireDefault(_creditfactoryapply);
  
  var _creditfactoryinfo = require('yls^busi/customer/agent/manufacturer/creditfactoryinfo.vue');
  
  var _creditfactoryinfo2 = _interopRequireDefault(_creditfactoryinfo);
  
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
  
  exports["default"] = {
    components: {
      'creditfactoryapply': _creditfactoryapply2["default"],
      'creditfactoryinfo': _creditfactoryinfo2["default"]
    },
    data: function data() {
      return {
        activeName: 'first',
        istrue: true,
        pkCustomer: '',
        creditgrant: ''
      };
    },
  
    methods: {
      handleClick: function handleClick(tab, event) {
        console.log(tab, event);
      },
      changecreditgrant: function changecreditgrant(val) {
        if ('tocreditgrantadd' == val[0]) {
          this.istrue = false;
        } else if ('tocreditgrantinfo' == val[0]) {
          this.istrue = false;
          this.pkCustomer = val[1];
          this.creditgrant = 'creditgrant';
        }
      },
      changecreditedit: function changecreditedit(val) {
        if (val) {
          this.pkCustomer = '';
          this.istrue = true;
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
  __vue__options__.template = "\n<el-tabs id=\"busi-agent-apply\" v-model=\"activeName\" @tab-click=\"handleClick\">\n  <el-tab-pane label=\"厂商授信申请\" name=\"first\">\n      <creditfactoryapply v-if=\"istrue\" @change-credit-grant='changecreditgrant'>\n      </creditfactoryapply>\n       <creditfactoryinfo v-else :pkCustomer='pkCustomer' :creditgrant='creditgrant' @change-credit-edit='changecreditedit'>\n       </creditfactoryinfo>\n  </el-tab-pane>\n  <el-tab-pane label=\"已授信厂商\" name=\"second\">\n  </el-tab-pane>\n  <el-tab-pane label=\"分配授信\" name=\"third\">\n  </el-tab-pane>\n</el-tabs>\n\n"
  

});
 
 define('yls^busi/customer/agent/manufacturer/creditfactoryapply.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')], //分页方法引入
      data: function data() {
          return {
              funnode: "BT005",
              nexuskey: "manufacturer_credit",
              OperationProtocolData: {},
              delDialogVisible: false,
              agentnameval: '',
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = this.getNodeById($node, '45jcdetxcwg');
                  //定义操作
                  var operateArr = [{
                      icon: 'edit',
                      title: "修改"
                  }, {
                      icon: 'upload2',
                      title: '发起申请'
                  }, {
                      icon: 'delete',
                      title: '删除'
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
          addagentinfo: function addagentinfo() {
              this.$emit('change-credit-grant', ['tocreditgrantadd', '']);
          },
          tableUpdClick: function tableUpdClick(scope) {
              var agentname = scope.row.agent_name;
              var pk_operation_protocol = scope.row.pk_operation_protocol;
              this.$emit("change-credit-grant", ['tocreditgrantinfo', agentname, pk_operation_protocol]);
          },
          tableApplyClick: function tableApplyClick(scope) {
              var agentname = scope.row.agent_name;
              this.$emit("change-credit-grant", ['tocreditgrantinfo', agentname]);
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delDialogVisible = true;
              this.pk_operation_protocol = scope.row.pk_operation_protocol;
              this.agentnameval = scope.row.agent_name;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              var agentPk = this.agentnameval;
              this.$http({
                  url: _publicData.ylsBusi + 'cust/operation/delsubAndchid',
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  dataType: "json",
                  data: agentPk
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
                      message: "删除失败",
                      type: "error"
                  });
              });
          },
          request: function request() {
              var _$http,
                  _this2 = this;
  
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  "pageNum": this.currentPage - 1,
                  "pageSize": this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ key: "customer_class", oper: "=", value: "yls_dev100000000fft" }]
                      }
                  }
              };
              this.$http((_$http = {
                  url: _publicData.ylsBusi + 'cust/operation/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data }, _$http['data'] = data, _$http.dataType = 'json', _$http)).then(function (res) {
                  //QuoteCalculator_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  debugger;
                  _this2.$refs['OperationProtocol'].setData('OperationProtocol_t', originalValue);
                  _this2.totalElements = res.data.data.totalElements; // 总条数
                  _this2.pageSize = res.data.data.pageSize; // 每页的条数
              })["catch"](function (e) {
                  console.log(e);
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">厂商授信信息表</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"creditapply-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addagentinfo\">新增</el-button>\n      <!-- <el-button type=\"primary\" class=\"button-no-radius\" @click=\"creditApply\">申请授信</el-button> -->\n    </div>\n\n    <div class=\"fr\">\n      <el-input placeholder=\"输入厂商名称即可搜索\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n <div id=\"OperationProtocol\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"OperationProtocol\"\n                  tplId=\"OperationProtocol-template\"\n                  :tplData=\"OperationProtocolData\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @edit-table-click=\"tableUpdClick\"\n                  @upload2-table-click=\"tableApplyClick\"\n                  @delete-table-click=\"tableDeleteClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n\n    <!-- 删除确认Dialog -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/manufacturer/creditfactoryinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _vendorInformation = require('yls^busi/customer/agent/manufacturer/vendorInformation.vue');
  
  var _vendorInformation2 = _interopRequireDefault(_vendorInformation);
  
  var _vendorlinkman = require('yls^busi/customer/agent/manufacturer/vendorlinkman.vue');
  
  var _vendorlinkman2 = _interopRequireDefault(_vendorlinkman);
  
  var _vendorShare = require('yls^busi/customer/agent/manufacturer/vendorShare.vue');
  
  var _vendorShare2 = _interopRequireDefault(_vendorShare);
  
  var _operation_info = require('yls^busi/customer/agent/manufacturer/operation_info.vue');
  
  var _operation_info2 = _interopRequireDefault(_operation_info);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      'CustCorpRef': _vendorInformation2["default"],
      'custlinkmanRef': _vendorlinkman2["default"],
      'ShareholderRef': _vendorShare2["default"],
      'operationinfo': _operation_info2["default"]
    },
    props: ['pkCustomer', 'creditgrant'],
    data: function data() {
      var oThis = this;
      return {
        scrollDom: "ifbpScrollDom",
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        custVisible: false,
        pk_customer: this.pkCustomer,
        custIcons: [{
          icon: "edit",
          click: function click() {
            oThis.$refs.CustCorpRef.CustEdit = !oThis.$refs.CustCorpRef.CustEdit;
          }
        }],
  
        //联系人修改
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            oThis.pk_customer = oThis.$refs.CustCorpRef.pk_customer;
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
          }
        }],
        // 股东信息新增
        ShareholderIcons: [{
          icon: "plus",
          click: function click() {
            oThis.pk_customer = oThis.$refs.CustCorpRef.pk_customer;
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }]
        // 新增
        // OperationIcons:[
        //    {
        //     icon: "plus",
        //     click: function() {
        //       if(oThis.pk_customer===""){
        //         oThis.$message({
        //             message: "请先保存基本信息",
        //             type: "error"
        //           });
        //           return;
        //       }
        //       oThis.$refs.operationTable.$refs.operationTable.getTableComp().closeExpandRow();
        //       // 重置新增数据
        //       oThis.$refs.operationTable.$refs.operationTable.resetFormData();
        //       // 显示新增区域
        //       oThis.$refs.operationTable.$refs.operationTable.comp.formShow = true;
        //     }
        //   }
        // ]
  
      };
    },
  
    //页面操作
    mounted: function mounted() {
      this.request();
    },
  
    methods: {
      // 信息初始化
      request: function request() {
        //请求客户基本信息详情
        var method = this.$root.$router.currentRoute.path;
      },
      goback: function goback() {
        this.$emit('change-credit-edit', 'tocreditgrantapply');
      }
    }
  };
  //引入联系人和股东信息面板
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">厂商管理</h2>\n  </div>\n\n  <div class=\"creditgrant-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"goback\">回退</el-button>\n    </div>\n  </div>\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <!--企业客户基本信息模块界面-->\n      <ifbp-panel id=\"custInfo\" title=\"基本信息\" :icons=\"custIcons\">\n              <CustCorpRef\n                ref=\"CustCorpRef\"\n                :pk_customer=\"pk_customer\" >\n              </CustCorpRef>\n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"  title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\" title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      <!--财务报表模块界面-->\n      <!-- <ifbp-panel id=\"none\"    title=\"财务报表信息\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel> -->\n      <!--合作协议-->\n      <ifbp-panel id=\"operationTableRef\"    title=\"合作协议\" >\n        <operationinfo\n          ref=\"operationTable\"\n          :pk_customer=\"pk_customer\">\n        </operationinfo>\n      </ifbp-panel>\n      <!-- 尽职调查 -->\n      <!-- <ifbp-panel id=\"none\"  title=\"尽职调查\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel> -->\n      <!--资料上传模块界面-->\n      <!-- <ifbp-panel id=\"none\"    title=\"资料上传\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel> -->\n      \n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/manufacturer/operation_info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ['pk_customer'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        operationDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT005',
        nexusKey: 'cooperation_agreement',
        operationData: {},
        t_Methods: {},
        operationResetFun: function operationResetFun($node) {
          if (oThis.invisible) {
            return;
          }
          var $refNode = this.getNodeById($node, '1nnheivkgfc'); //获取客户参照
          if (oThis.pid !== undefined) {
            $refNode.attr("v-bind:disabled", 'true'); //客户参照只读
          } else {
            $refNode.attr("v-bind:disabled", 'false'); //客户参照可编辑
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
  
        operationTplMethods: {
          // form的保存操作
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
        this.request();
      }
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
        if (this.pk_customer != '' && this.pk_customer != undefined) {
          this.requestOperation();
        }
      },
      closeAddForm: function closeAddForm() {
        this.$refs['operationTable'].comp.formShow = false; //关闭添加表单事件
      },
  
      //请求合作协议信息
      requestOperation: function requestOperation() {
        var _this = this;
  
        var data = {
          pageNum: 0,
          pageSize: 10,
          searchParams: {
            searchMap: {
              custCondList: [{ key: "agent_name", oper: "=", value: this.pk_customer }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['operationTable'].setData('OperationProtocol_t', JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //合作协议保存
      operationFormConfirm: function operationFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = void 0;
        var data = this.$refs.operationTable.comp.OperationProtocol;
        data.agent_name = this.pk_customer;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/UpdateOrCreate',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          // location.hash = '/operation/list';
          _this2.editable = false;
  
          // this.$refs["operationTable"].setData(
          //   'OperationProtocol_t',
          //   originalValue
          // );
          if (res.data.success === true) {
            _this2.$message({
              message: '保存成功',
              type: 'success'
            });
            // let originalValue = res.data.data;
            //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
            // let linarraydata = this.$refs.operationTable.getData(
            //   "OperationProtocol_t"
            // );
            /**@augments 移除位置 
             * @augments 移除个数
             * @augments 用新的对象替换（不传值则删除）
             */
            // if (this.rmoveindex !== "") {
            //   linarraydata.splice(this.rmoveindex, 1, this.originalValue);
            // } else {
            //加入数组开始
            //   linarraydata.unshift(this.originalValue);
            // } 
  
            //给对象赋值
            // this.$refs.operationTable.setData(
            //   "OperationProtocol_t",
            //   JSON.parse(JSON.stringify(linarraydata))
            // );
            _this2.requestOperation();
            //隐藏详情列表
            _this2.$refs['operationTable'].comp.formShow = false;
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function () {
          _this2.$message({
            message: '保存失败',
            type: 'error'
          });
        });
      },
  
      // 合作协议form的取消操作
      operationFormCancel: function operationFormCancel(type) {
        if (type === 'form') {
          this.$refs['operationTable'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['operationTable'].getTableComp().closeExpandRow();
        }
      },
  
      //合作协议编辑
      operationEditTableRow: function operationEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['operationTable'].getTableComp().expandRow(row);
        this.$refs['operationTable'].formShow = false;
        //operationTable为表单数据对象参数
        this.$refs['operationTable'].setData('OperationProtocol', row);
      },
  
      //合作协议删除提示
      operationDeleteTableRow: function operationDeleteTableRow(scope) {
        this.operationDelVisible = true;
        this.pk_operation_protocol = scope.row.pk_operation_protocol;
      },
  
      //合作协议删除
      operationDeleteClick: function operationDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
        }).then(function (res) {
          debugger;
          if (res.data.success === true) {
            _this3.$message({
              message: '删除成功',
              type: 'success'
            });
            _this3.requestOperation();
          } else {
            debugger;
            _this3.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          debugger;
          _this3.$message({
            message: '信息删除失败',
            type: 'error'
          });
        });
        this.operationDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"operationTable\"\n                      tplId=\"operationTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexusKey\"\n                      :tplData=\"operationData\"\n                      :tplResetFun=\"operationResetFun\"\n                      :tplMethods=\"operationTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"operationFormConfirm\"\n                      @form-cancel-click=\"operationFormCancel\"\n                      @edit-table-click=\"operationEditTableRow\"\n                      @delete-table-click=\"operationDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 合作协议信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"operationDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"operationDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"operationDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/agent/manufacturer/vendorInformation.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      return {
        scrollDom: "ifbpScrollDom",
        CustEdit: true,
  
        funnode: "BT005",
        CustBasicnexuskey: "manufacturer_basic",
        CustBasicData: {
          custBasic_busi: {}
        },
        CustPknexuskey: "manufacturer_information",
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
  
  
        //厂商基本信息保存
        CustConfirm: function CustConfirm() {
          var data = oThis.$refs.CustBasicRef.comp.customer;
          var data1 = oThis.$refs.CustRef.comp.CustCorp;
          var a = [data1];
          data.cust_corp_list = a;
          data.customer_type = 'CORP';
          data.cusotmer_class = "yls_dev100000000fft";
          console.log(data);
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
  
      //请求客户
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
 
 define('yls^busi/customer/agent/manufacturer/vendorShare.vue', function(require, exports, module) {

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
            $refname.attr("v-on:trigger", "nameRefChange");
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
            debugger;
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
  
          var OtherContactTable = this.$refs["ShareholderRef"].getData('Shareholder_t');
          OtherContactTable[this.baseEditIndex] = this.baseData;
          this.$refs["ShareholderRef"].setData('Shareholder_t', OtherContactTable);
        }
      },
      //股东编辑
      ShareholderEditTableRow: function ShareholderEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["ShareholderRef"].getTableComp().expandRow(row);
        this.$refs["ShareholderRef"].comp.formShow = false;
        //ShareholderRef为表单数据对象参数
        this.$refs["ShareholderRef"].setData("Shareholder", row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
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
 
 define('yls^busi/customer/agent/manufacturer/vendorlinkman.vue', function(require, exports, module) {

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
        debugger;
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
        this.$refs["custlinkmanRef"].comp.formShow = false;
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
 
 define('yls^busi/customer/src/Agent-InfoDetail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _linkmanpanel = require('yls^busi/customer/src/linkmanpanel.vue');
  
  var _linkmanpanel2 = _interopRequireDefault(_linkmanpanel);
  
  var _Shareholderpanel = require('yls^busi/customer/src/Shareholderpanel.vue');
  
  var _Shareholderpanel2 = _interopRequireDefault(_Shareholderpanel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  //引入联系人和股东信息面板
  exports["default"] = {
    components: {
      'custlinkmanRef': _linkmanpanel2["default"],
      'ShareholderRef': _Shareholderpanel2["default"]
  
    },
    data: function data() {
  
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
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
        //企业客户名称
        if (rule.field === "customer_name") {
          if (value === '') {
            callback(new Error('企业客户名称不能为空'));
          } else {
            callback();
          }
        }
      };
      return {
        funnode: "BT003",
        nexuskey: "customer_corp_ui",
        custfunnode: "BT003",
        custnexuskey: "customer_detial_ui",
        scrollDom: "ifbpScrollDom",
        pk_customer: "",
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        //企业客户基本信息修改
        corpResetFun: function corpResetFun($node) {
          var $refNode1 = this.getNodeById($node, 'w85l2pcqcf');
          var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
          var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
  
          var $refNode4 = this.getNodeById($node, 'ofj3u2jhzb9');
          var $refNode5 = this.getNodeById($node, 'rwakr8o78c');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
          if ($refNode2.length) {
            $refNode2.attr("v-on:trigger", "handleRefChange2");
          }
          if ($refNode3.length) {
            $refNode3.attr("v-on:trigger", "handleRefChange3");
          }
          if ($refNode4.length) {
            $refNode4.attr("v-on:trigger", "handleRefChange4");
          }
          if ($refNode5.length) {
            $refNode5.attr("v-on:trigger", "handleRefChange5");
          }
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
            debugger;
            if (type === 'change') {
              debugger;
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('h_param', refParams);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
            debugger;
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('m_param', refParams);
            }
          },
          handleRefChange3: function handleRefChange3(type, data) {
            debugger;
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('s_param', refParams);
            }
          },
          handleRefChange4: function handleRefChange4(type, data) {
            debugger;
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('city_param', refParams);
            }
          },
          handleRefChange5: function handleRefChange5(type, data) {
            debugger;
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('county_param', refParams);
            }
          }
        },
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.customerEdit = !oThis.customerEdit;
          }
        }],
        customerPk: "54fc5e2c-414d-49e5-9a44-1bf2bbe002e1",
        customerData: {
          customer: {},
          rules: {
            customer_name: [{ validator: validatecustomer, trigger: "blur" }],
            identity_no: [{ validator: validatecustomer, trigger: "blur" }],
            cusotmer_class: [
              // { required: true, message: "企业客户基本分类不能为空", trigger: "blur" }
            ]
          }
        },
        customerEdit: false,
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
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
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
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }]
  
      };
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
        this.pk_customer = this.$root.$router.currentRoute.params.id;
        //请求企业客户基本信息详情
        if (this.pk_customer === undefined) {
          this.pk_customer = "";
          this.customerEdit = true;
          return;
        }
        debugger;
        var method = this.$root.$router.currentRoute.name;
        debugger;
        if (method === "Agent-update") {
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
  
      //请求企业客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this = this;
  
        debugger;
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
          debugger;
          _this.$refs.baseTemplateRef1.setData("CustCorp", JSON.parse(JSON.stringify(originalValue.cust_corp_list[0])));
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "企业客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.customerEdit = false;
        // 重置value
      },
  
      //企业客户基本信息保存
      customerConfirm: function customerConfirm() {
        var _this2 = this;
  
        var data = this.$refs.baseTemplateRef.comp.customer;
        var data1 = this.$refs.baseTemplateRef1.comp.CustCorp;
        debugger;
        var a = [data1];
        data.cust_corp_list = a;
        console.log(data);
        var baseUrl = _publicData.ylsBusi;
        debugger;
        //表单formRef  表格tableRef
        this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/customer/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              debugger;
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功",
                  type: "success"
                });
                debugger;
                _this2.originalValue = res.data.data;
                console.log(_this2.$refs.baseTemplateRef);
                _this2.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this2.originalValue)));
  
                _this2.pk_customer = _this2.originalValue.pk_cust_customer;
                _this2.customerEdit = false;
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">企业客户管理</h2>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <!--企业客户基本信息模块界面-->\n      <ifbp-panel id=\"basePanel\" title=\"企业客户基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"custfunnode\"\n                  :nexuskey=\"custnexuskey\"\n                  show-type=\"form\"\n                  :tplData=\"customerData\"\n                  :editable=\"customerEdit\">\n        </ifbp-template>\n          <ifbp-template ref=\"baseTemplateRef1\"\n                  tplId=\"baseTemplate1\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  show-type=\"form\"\n                  :tplResetFun=\"corpResetFun\"\n                  :methods=\"t_Methods\"\n                \n                  :editable=\"customerEdit\">\n         </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"customerEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"    title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\"    title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      <!--财务报表模块界面-->\n      <ifbp-panel id=\"none\"    title=\"财务报表信息\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      <!--资料上传模块界面-->\n      <ifbp-panel id=\"none\"    title=\"资料上传\" :icons=\"none\">\n        <none\n          ref=\"none\"\n          :pk_customer=\"pk_customer\">\n        </none>\n      </ifbp-panel>\n      \n     \n      \n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Agent-baseinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
      data: function data() {
          var oThis = this;
          return {
              createType: false,
              custVisible: false,
              //模版主键
              funnode: "BT003",
              nexuskey: "Agent_list",
              // 查询模板编码
              searchTemplateCode: 'YLSCXMB_BUSICUST_AGENTINFO',
              sp: '{}',
              customerListData: {},
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "search"
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
          this.request();
      },
  
      methods: {
  
          // 添加按钮
          addAgent: function addAgent() {
              location.hash = "/cust/Corpcustomer/add/" + "Agent";
          },
  
          // 查询
          handleSearch: function handleSearch(searchTemplate) {
              if (searchTemplate !== '') {
                  this.sp = JSON.stringify(searchTemplate);
              }
              this.request();
          },
  
  
          //编辑按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;
          },
          tableDeleteClickRow: function tableDeleteClickRow(scope) {
  
              this.custVisible = true;
              this.delId = scope.row.pk_cust_customer;
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              var _this = this;
  
              // let delId = scope.row.pk_cust_customer;
              this.$http({
                  url: _publicData.ylsBusi + "cust/customer/deleteById",
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
                      _this.custVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.message,
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
          request: function request() {
              var _this2 = this;
  
              var url = void 0;
              var baseUrl = _publicData.ylsBusi;
              url = baseUrl + 'cust/customer/page';
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'cusotmer_class',
                              'oper': ' LIKE ',
                              'value': '%yls_dev100000000ffv%'
                          }],
                          'qtAggVO': this.sp
                      }
                  }
              };
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //customer_table UI模板表格名称
  
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
              })["catch"](function (e) {
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">代理商信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addAgent\">新增</el-button>          \n    </div>\n    <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n  <!-- 代理商列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                \n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  \n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClickRow\" >\n    </ifbp-template>\n    <el-dialog\n    title=\"提示\"\n    v-model=\"custVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n    </span>\n   </el-dialog>\n    <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/AssetPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "Asset",
        AssetDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 客户资产信息新增
        AssetIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.AssetRef.comp;
            var table = uitemplateComp.$refs["Asset_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
  
        AssetData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        AssetResetFun: function AssetResetFun($node) {
          var $table = $node.find('el-table');
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
        AssetTplMethods: {
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
        this.requestAsset();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestAsset();
        }
      },
  
      //请求客户资产信息
      requestAsset: function requestAsset() {
        var _this = this;
  
        var ownerId = this.getCookie("_A_P_id");
  
        var url = void 0;
        url = _publicData.ylsBusi + "cust/Asset/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
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
          _this.$refs["AssetRef"].setData("Asset_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "资产信息获取失败",
            type: "error"
          });
        });
      },
  
      //客户资产情况保存
      AssetFormConfirm: function AssetFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.AssetRef.comp.Asset;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.AssetRef.comp.$refs["Asset_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/Asset/updateORinsert",
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
                var linarraydata = _this2.$refs.AssetRef.getData("Asset_t");
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
                _this2.$refs.AssetRef.setData("Asset_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["AssetRef"].comp.formShow = false;
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
      // 客户资产信息form的取消操作
      AssetFormCancel: function AssetFormCancel(type) {
        if (type === "form") {
          this.$refs["AssetRef"].comp.formShow = false;
        } else {
          this.$refs["AssetRef"].getTableComp().closeExpandRow();
          var AssetTable = this.$refs.AssetRef.getData('Asset_t');
          AssetTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.AssetRef.setData('Asset_t', AssetTable);
        }
      },
      //客户资产编辑
      AssetEditTableRow: function AssetEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
  
        this.$refs.AssetRef.getTableComp().expandRow(scope.row);
        this.$refs.AssetRef.comp.formShow = false;
        this.$refs.AssetRef.setData('Asset', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //客户资产信息删除提示
      AssetDeleteTableRow: function AssetDeleteTableRow(scope) {
        this.AssetDelVisible = true;
        this.delId = scope.row.pk_cust_asset;
      },
      //客户资产信息删除
      AssetDeleteClick: function AssetDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/Asset/deleteById",
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
            _this3.requestAsset();
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
        this.AssetDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"AssetRef\"\n                      tplId=\"AssetTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"AssetData\"\n                      :tplResetFun=\"AssetResetFun\"\n                      :tplMethods=\"AssetTplMethods\"\n                      @form-confirm-click=\"AssetFormConfirm\"\n                      @form-cancel-click=\"AssetFormCancel\"\n                      @edit-table-click=\"AssetEditTableRow\"\n                      @delete-table-click=\"AssetDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 客户资产信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"AssetDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"AssetDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"AssetDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/BankAccountPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "BankAccount",
        BankAccountDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 股东信息新增
        BankAccountIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.BankAccountRef.comp;
            var table = uitemplateComp.$refs["BankAccount_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        //BankAccountPk: "d1927a89-a8c4-42e7-bd26-484d6199fff2", //custaxes
        BankAccountData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          },
          cityParams: {}
        },
        BankAccountResetFun: function BankAccountResetFun($node) {
          var $refNode = this.getNodeById($node, '71k7srbgz9n'); //开户行省
  
          if ($refNode.length) {
            $refNode.attr("v-on:trigger", "handleRefChange");
          }
  
          var $table = $node.find('el-table');
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
        t_Methods: {
          handleRefChange: function handleRefChange(type, data) {
            if (type === 'change') {
  
              var param = { 'key': data.value[0].innercode };
              oThis.$refs.BankAccountRef.setData('cityParams', param);
            }
          }
        },
  
        BankAccountTplMethods: {
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
        this.requestBankAccount();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestBankAccount();
        }
      },
  
      //请求股东信息
      requestBankAccount: function requestBankAccount() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/BankAccount/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
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
          _this.$refs["BankAccountRef"].setData("BankAccount_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "银行账户信息获取失败",
            type: "error"
          });
        });
      },
  
      //股东情况保存
      BankAccountFormConfirm: function BankAccountFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.BankAccountRef.comp.BankAccount;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.BankAccountRef.comp.$refs["BankAccount_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/BankAccount/updateORinsert",
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
                var linarraydata = _this2.$refs.BankAccountRef.getData("BankAccount_t");
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
                _this2.$refs.BankAccountRef.setData("BankAccount_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["BankAccountRef"].comp.formShow = false;
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
      BankAccountFormCancel: function BankAccountFormCancel(type) {
        if (type === "form") {
          this.$refs["BankAccountRef"].comp.formShow = false;
        } else {
          this.$refs["BankAccountRef"].getTableComp().closeExpandRow();
          var BankAccountTable = this.$refs.BankAccountRef.getData('BankAccount_t');
          BankAccountTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.BankAccountRef.setData('BankAccount_t', BankAccountTable);
        }
      },
      //股东编辑
      BankAccountEditTableRow: function BankAccountEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["BankAccountRef"].getTableComp().expandRow(row);
        // this.$refs["BankAccountRef"].formShow = false;
        // //BankAccountRef为表单数据对象参数
        // this.$refs["BankAccountRef"].setData("BankAccount", row);
        this.$refs.BankAccountRef.getTableComp().expandRow(scope.row);
        this.$refs.BankAccountRef.comp.formShow = false;
        this.$refs.BankAccountRef.setData('BankAccount', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //股东信息删除提示
      BankAccountDeleteTableRow: function BankAccountDeleteTableRow(scope) {
        this.BankAccountDelVisible = true;
        this.delId = scope.row.pk_cust_bankaccount;
      },
      //股东信息删除
      BankAccountDeleteClick: function BankAccountDeleteClick() {
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
            _this3.requestBankAccount();
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
        this.BankAccountDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"BankAccountRef\"\n                      tplId=\"BankAccountTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"BankAccountData\"\n                      :tplResetFun=\"BankAccountResetFun\"\n                      :tplMethods=\"BankAccountTplMethods\"\n                      @form-confirm-click=\"BankAccountFormConfirm\"\n                      @form-cancel-click=\"BankAccountFormCancel\"\n                      @edit-table-click=\"BankAccountEditTableRow\"\n                      @delete-table-click=\"BankAccountDeleteTableRow\"\n                      :methods=\"t_Methods\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 股东信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"BankAccountDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"BankAccountDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"BankAccountDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/CommRecordPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "CommRecord",
        CommRecordDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 沟通记录信息新增
        CommRecordIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.CommRecordRef.comp;
            var table = uitemplateComp.$refs["CommRecord_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        //CommRecordPk: "2ae822e7-5b83-4414-986d-3d56f667d02b", //custaxes
        CommRecordData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        CommRecordResetFun: function CommRecordResetFun($node) {
          var $table = $node.find('el-table');
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
        CommRecordTplMethods: {
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
        this.requestCommRecord();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestCommRecord();
        }
      },
  
      //请求沟通记录信息
      requestCommRecord: function requestCommRecord() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/CommRecord/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer,
              message_owner: ownerId
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
          _this.$refs["CommRecordRef"].setData("CommRecord_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "沟通记录信息获取失败",
            type: "error"
          });
        });
      },
  
      //沟通记录情况保存
      CommRecordFormConfirm: function CommRecordFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.CommRecordRef.comp.CommRecord;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.CommRecordRef.comp.$refs["CommRecord_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/CommRecord/updateORinsert",
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
                var linarraydata = _this2.$refs.CommRecordRef.getData("CommRecord_t");
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
                _this2.$refs.CommRecordRef.setData("CommRecord_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["CommRecordRef"].comp.formShow = false;
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
      // 沟通记录信息form的取消操作
      CommRecordFormCancel: function CommRecordFormCancel(type) {
        if (type === "form") {
          this.$refs["CommRecordRef"].comp.formShow = false;
        } else {
          this.$refs["CommRecordRef"].getTableComp().closeExpandRow();
          var CommRecordTable = this.$refs.CommRecordRef.getData('CommRecord_t');
          CommRecordTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.CommRecordRef.setData('CommRecord_t', CommRecordTable);
        }
      },
      //沟通记录编辑
      CommRecordEditTableRow: function CommRecordEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["CommRecordRef"].getTableComp().expandRow(row);
        // this.$refs["CommRecordRef"].formShow = false;
        // //CommRecordRef为表单数据对象参数
        // this.$refs["CommRecordRef"].setData("CommRecord", row);
        this.$refs.CommRecordRef.getTableComp().expandRow(scope.row);
        this.$refs.CommRecordRef.comp.formShow = false;
        this.$refs.CommRecordRef.setData('CommRecord', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //沟通记录信息删除提示
      CommRecordDeleteTableRow: function CommRecordDeleteTableRow(scope) {
        this.CommRecordDelVisible = true;
  
        this.delId = scope.row.pk_cust_comm_record;
      },
      //沟通记录信息删除
      CommRecordDeleteClick: function CommRecordDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/CommRecord/deleteById",
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
            _this3.requestCommRecord();
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
        this.CommRecordDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"CommRecordRef\"\n                      tplId=\"CommRecordTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"CommRecordData\"\n                      :tplResetFun=\"CommRecordResetFun\"\n                      :tplMethods=\"CommRecordTplMethods\"\n                      @form-confirm-click=\"CommRecordFormConfirm\"\n                      @form-cancel-click=\"CommRecordFormCancel\"\n                      @edit-table-click=\"CommRecordEditTableRow\"\n                      @delete-table-click=\"CommRecordDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 沟通记录信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"CommRecordDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"CommRecordDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"CommRecordDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/ContractHandPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "ContractHand_UI",
        ContractHandDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 在手合同信息新增
        ContractHandIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "不可操作！",
                type: "error"
              });
              return;
            }
            // let uitemplateComp = oThis.$refs.ContractHandRef.comp;
            // let table = uitemplateComp.$refs["ContractHand_t_ref"];
            // table.closeExpandRow();
            // uitemplateComp.bankaccount = {};
            // uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        ContractHandPk: "4ff44758-7b27-416f-8b80-ba1206bfa74d", //custaxes
        ContractHandData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        ContractHandResetFun: function ContractHandResetFun($node) {
          var $table = $node.find('el-table');
  
          //客户选择联动
          var $refNode1 = this.getNodeById($node, 'gn03ic7ywx5');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
  
          // $table.attr(":show-header", "false");
          var operateArr = [{
            title: "查看",
  
            icon: "search"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
  
          $table.append(operateHtml);
  
          return $node[0].outerHTML;
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
  
            if (type === 'change') {
  
              this.$refs['ContractHand_ref'].model.customer_code = data.value[0].code;
            }
          }
        },
        ContractHandTplMethods: {
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
        this.requestContractHand();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestContractHand();
        }
      },
  
      //请求在手合同信息
      requestContractHand: function requestContractHand() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/ContractHand/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer,
              message_owner: ownerId
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
          _this.$refs["ContractHandRef"].setData("ContractHand_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "合同历史信息获取失败",
            type: "error"
          });
        });
      },
  
      //在手合同情况保存
      ContractHandFormConfirm: function ContractHandFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.ContractHandRef.comp.ContractHand;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
  
        //保存校验
        this.$refs.ContractHandRef.comp.$refs["ContractHand_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/ContractHand/updateORinsert",
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
                var linarraydata = _this2.$refs.ContractHandRef.getData("ContractHand_t");
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
                _this2.$refs.ContractHandRef.setData("ContractHand_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["ContractHandRef"].comp.formShow = false;
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
      // 在手合同信息form的取消操作
      ContractHandFormCancel: function ContractHandFormCancel(type) {
        if (type === "form") {
          this.$refs["ContractHandRef"].comp.formShow = false;
        } else {
          this.$refs["ContractHandRef"].getTableComp().closeExpandRow();
          var ContractHandTable = this.$refs.ContractHandRef.getData('ContractHand_t');
          ContractHandTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.ContractHandRef.setData('ContractHand_t', ContractHandTable);
        }
      },
      //在手合同编辑
      ContractHandEditTableRow: function ContractHandEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["ContractHandRef"].getTableComp().expandRow(row);
        // this.$refs["ContractHandRef"].formShow = false;
        // //ContractHandRef为表单数据对象参数
        // this.$refs["ContractHandRef"].setData("ContractHand", row);
        this.$refs.ContractHandRef.getTableComp().expandRow(scope.row);
        this.$refs.ContractHandRef.comp.formShow = false;
        this.$refs.ContractHandRef.setData('ContractHand', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //在手合同信息删除提示
      ContractHandDeleteTableRow: function ContractHandDeleteTableRow(scope) {
        this.ContractHandDelVisible = true;
        this.delId = scope.row.pk_cust_contract_hand;
      },
      //在手合同信息删除
      ContractHandDeleteClick: function ContractHandDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/ContractHand/deleteById",
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
            _this3.requestContractHand();
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
        this.ContractHandDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"ContractHandRef\"\n                      tplId=\"ContractHandTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"ContractHandData\"\n                      :tplResetFun=\"ContractHandResetFun\"\n                      :tplMethods=\"ContractHandTplMethods\"\n                      :methods=\"t_Methods\"\n                      \n                      @form-cancel-click=\"ContractHandFormCancel\"\n                      @search-table-click=\"ContractHandEditTableRow\"\n                     \n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 在手合同信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"ContractHandDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"ContractHandDelVisible = false, this.delId=''\">取 消</el-button>\n      \n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/CorpCustomerDetial.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _linkmanpanel = require('yls^busi/customer/src/linkmanpanel.vue');
  
  var _linkmanpanel2 = _interopRequireDefault(_linkmanpanel);
  
  var _Shareholderpanel = require('yls^busi/customer/src/Shareholderpanel.vue');
  
  var _Shareholderpanel2 = _interopRequireDefault(_Shareholderpanel);
  
  var _ContractHandPanel = require('yls^busi/customer/src/ContractHandPanel.vue');
  
  var _ContractHandPanel2 = _interopRequireDefault(_ContractHandPanel);
  
  var _CustUpDownPanel = require('yls^busi/customer/src/CustUpDownPanel.vue');
  
  var _CustUpDownPanel2 = _interopRequireDefault(_CustUpDownPanel);
  
  var _AssetPanel = require('yls^busi/customer/src/AssetPanel.vue');
  
  var _AssetPanel2 = _interopRequireDefault(_AssetPanel);
  
  var _BankAccountPanel = require('yls^busi/customer/src/BankAccountPanel.vue');
  
  var _BankAccountPanel2 = _interopRequireDefault(_BankAccountPanel);
  
  var _QualificationCertPanel = require('yls^busi/customer/src/QualificationCertPanel.vue');
  
  var _QualificationCertPanel2 = _interopRequireDefault(_QualificationCertPanel);
  
  var _EquityInvestPanel = require('yls^busi/customer/src/EquityInvestPanel.vue');
  
  var _EquityInvestPanel2 = _interopRequireDefault(_EquityInvestPanel);
  
  var _ExternalRatingPanel = require('yls^busi/customer/src/ExternalRatingPanel.vue');
  
  var _ExternalRatingPanel2 = _interopRequireDefault(_ExternalRatingPanel);
  
  var _CommRecordPanel = require('yls^busi/customer/src/CommRecordPanel.vue');
  
  var _CommRecordPanel2 = _interopRequireDefault(_CommRecordPanel);
  
  var _RelatedCompanyPanel = require('yls^busi/customer/src/RelatedCompanyPanel.vue');
  
  var _RelatedCompanyPanel2 = _interopRequireDefault(_RelatedCompanyPanel);
  
  var _MemberPanel = require('yls^busi/customer/src/MemberPanel.vue');
  
  var _MemberPanel2 = _interopRequireDefault(_MemberPanel);
  
  var _LitigationSituationPanel = require('yls^busi/customer/src/LitigationSituationPanel.vue');
  
  var _LitigationSituationPanel2 = _interopRequireDefault(_LitigationSituationPanel);
  
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
  
  exports["default"] = {
    components: {
      'custlinkmanRef': _linkmanpanel2["default"],
      'ShareholderRef': _Shareholderpanel2["default"],
      'ContractHandRef': _ContractHandPanel2["default"],
      'CustUpDownRef': _CustUpDownPanel2["default"],
      'AssetRef': _AssetPanel2["default"],
      'BankAccountRef': _BankAccountPanel2["default"],
      'QualificationCertRef': _QualificationCertPanel2["default"],
      'EquityInvestRef': _EquityInvestPanel2["default"],
      'ExternalRatingRef': _ExternalRatingPanel2["default"],
      'CommRecordRef': _CommRecordPanel2["default"],
      'RelatedCompanyRef': _RelatedCompanyPanel2["default"],
      'MemberRef': _MemberPanel2["default"],
      'LitigationSituationRef': _LitigationSituationPanel2["default"]
  
    },
    data: function data() {
      var _customerDetailData, _ref;
  
      var oThis = this;
  
      var validator = function validator(rule, value, callback) {};
  
      //校验
  
      var validatecustomerDetail = function validatecustomerDetail(rule, value, callback) {
  
        //统一社会信用代码
        if (rule.field === "society_credit") {
          debugger;
          if (value === '') {
            callback(new Error('统一社会信用代码不能为空'));
          } else if (oThis.$root.$router.currentRoute.name !== 'CorpCustomerDetial' && oThis.pk_customer === '') {
            if (oThis.$refs.baseTemplateRef1.comp.$refs["CustCorpRef"].model.society_credit !== '') {
              oThis.validateInput(value);
              if (oThis.isIdCanUse) {
                callback(new Error('该证件号已经存在，请重新输入'));
              } else {
                callback();
              }
            }
          } else {
            callback();
          }
        }
      };
      return _ref = {
        copyForCorp: '',
        copyForCust: '',
        custPk: '',
  
        cust_type: '',
        custData: '',
        isIdCanUse: false,
        isshow: true
      }, _ref['cust_type'] = '', _ref.reloadVisible = false, _ref.hasCustClsVisible = false, _ref.custfunnode = "BT003", _ref.custnexuskey = "customer_detial_ui", _ref.funnode = "BT003", _ref.nexuskey = "customer_corp_ui", _ref.scrollDom = "ifbpScrollDom", _ref.pk_customer = "", _ref.linkmanDelVisible = false, _ref.custbankDelVisible = false, _ref.ShareholderDelVisible = false, _ref.rmoveindex = "", _ref.delId = "", _ref.customerResetFun = function customerResetFun($node) {
        debugger;
        //获取客户分类节点
        var $refCustCls = $node.find("el-ref[v-model='customer.cusotmer_class']");
        if (this.$root.$router.currentRoute.params.cust_type !== undefined && this.$root.$router.currentRoute.params.cust_type === 'Lessee') {
          $refCustCls.attr("disabled", false);
          var refParams = { 'cust_type': 'Lessee' };
          oThis.$refs.baseTemplateRef.setData('cust_cls', refParams);
          $refCustCls.attr("v-on:trigger", "setCustCls");
        }
      }, _ref.corpResetFun = function corpResetFun($node) {
        //行业分类级联参照
        var $refNode1 = this.getNodeById($node, 'w85l2pcqcf');
        var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
        var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
        if ($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1");
        }
        if ($refNode2.length) {
          $refNode2.attr("v-on:trigger", "handleRefChange2");
        }
        if ($refNode3.length) {
          $refNode3.attr("v-on:trigger", "handleRefChange3");
        }
  
        //地区级联参照
        var $refNode4 = this.getNodeById($node, 'ofj3u2jhzb9');
        var $refNode5 = this.getNodeById($node, 'rwakr8o78c');
  
        if ($refNode4.length) {
          $refNode4.attr("v-on:trigger", "handleRefChange4");
        }
        if ($refNode5.length) {
          $refNode5.attr("v-on:trigger", "handleRefChange5");
        }
      }, _ref.cust_Methods = {
        setCustCls: function setCustCls(type, data) {
  
          debugger;
          oThis.pk_temp = oThis.$refs['baseTemplateRef'].comp.customer.cusotmer_class;
          if (oThis.pk_temp === 'yls_dev100000000ffn') {
            oThis.cust_type = 'Lessee';
          } else if (oThis.pk_temp === 'yls_dev100000000ffr') {
            oThis.cust_type = 'Guarantee';
          } else if (oThis.pk_temp === 'yls_dev100000000ffo') {
            oThis.cust_type = 'FinancingUnit';
          } else if (oThis.pk_temp === 'yls_dev100000000ffp') {
            oThis.cust_type = 'Agency';
          } else if (oThis.pk_temp === 'yls_dev100000000ffq') {
            oThis.cust_type = 'RelatedParty';
          } else if (oThis.pk_temp === 'yls_dev100000000ffs') {
            oThis.cust_type = 'Supplier';
          } else if (oThis.pk_temp === 'yls_dev100000000ffu') {
            oThis.cust_type = 'GroupCust';
          } else if (oThis.pk_temp === 'yls_dev100000000ffw') {
            oThis.cust_type = 'RentalUnit';
          }
        }
  
      }, _ref.t_Methods = {
  
        handleRefChange1: function handleRefChange1(type, data) {
  
          if (type === 'change') {
  
            var refParams = { 'key': data.value[0].innercode };
            oThis.$refs.baseTemplateRef1.setData('h_param', refParams);
          }
        },
        handleRefChange2: function handleRefChange2(type, data) {
  
          if (type === 'change') {
  
            var refParams = { 'key': data.value[0].innercode };
            oThis.$refs.baseTemplateRef1.setData('m_param', refParams);
          }
        },
        handleRefChange3: function handleRefChange3(type, data) {
  
          if (type === 'change') {
  
            var refParams = { 'key': data.value[0].innercode };
            oThis.$refs.baseTemplateRef1.setData('s_param', refParams);
          }
        },
        handleRefChange4: function handleRefChange4(type, data) {
  
          if (type === 'change') {
  
            var refParams = { 'key': data.value[0].innercode };
            oThis.$refs.baseTemplateRef1.setData('city_param', refParams);
          }
        },
        handleRefChange5: function handleRefChange5(type, data) {
  
          if (type === 'change') {
  
            var refParams = { 'key': data.value[0].innercode };
            oThis.$refs.baseTemplateRef1.setData('county_param', refParams);
          }
        }
      }, _ref.baseIcons = [{
        icon: "edit",
        click: function click() {
          if (!oThis.customerEdit) {
            oThis.customerEdit = true;
            var copycorp = oThis.$refs.baseTemplateRef1.comp.CustCorp;
            oThis.copyForCorp = JSON.parse(JSON.stringify(copycorp));
            var copycust = oThis.$refs.baseTemplateRef.comp.customer;
            oThis.copyForCust = JSON.parse(JSON.stringify(copycust));
          } else {
            oThis.customerCancel();
          }
        }
      }], _ref.customerBaseData = {}, _ref.customerDetailData = (_customerDetailData = {
        customer: {},
        city_param: {},
        county_param: {},
        h_param: {},
        m_param: {},
        s_param: {}
      }, _customerDetailData['city_param'] = {}, _customerDetailData['county_param'] = {}, _customerDetailData.rules = {
        society_credit: [{ validator: validatecustomerDetail, trigger: "blur" }]
      }, _customerDetailData), _ref.customerEdit = false, _ref.linkmanIcons = [{
        icon: "plus",
        click: function click() {
  
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
          // 显示新增区域
          oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
        }
      }], _ref.ShareholderIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
          // 显示新增区域
          oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
        }
      }], _ref.ContractHandIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          // oThis.$refs.ContractHandRef.$refs.ContractHandRef.getTableComp().closeExpandRow();
          // // 重置新增数据
          // oThis.$refs.ContractHandRef.$refs.ContractHandRef.resetFormData();
          // // 显示新增区域
          // oThis.$refs.ContractHandRef.$refs.ContractHandRef.comp.formShow = true;
        }
      }], _ref.CustUpDownIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.resetFormData();
          // 显示新增区域
          oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.comp.formShow = true;
        }
      }], _ref.AssetIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.AssetRef.$refs.AssetRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.AssetRef.$refs.AssetRef.resetFormData();
          // 显示新增区域
          oThis.$refs.AssetRef.$refs.AssetRef.comp.formShow = true;
        }
      }], _ref.BankAccountIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.BankAccountRef.$refs.BankAccountRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.BankAccountRef.$refs.BankAccountRef.resetFormData();
          // 显示新增区域
          oThis.$refs.BankAccountRef.$refs.BankAccountRef.comp.formShow = true;
        }
      }], _ref.QualificationCertIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.resetFormData();
          // 显示新增区域
          oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.comp.formShow = true;
        }
      }], _ref.EquityInvestIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.resetFormData();
          // 显示新增区域
          oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.comp.formShow = true;
        }
      }], _ref.ExternalRatingIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.resetFormData();
          // 显示新增区域
          oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.comp.formShow = true;
        }
      }], _ref.CommRecordIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
          oThis.$refs.CommRecordRef.$refs.CommRecordRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.CommRecordRef.$refs.CommRecordRef.resetFormData();
          // 显示新增区域
          oThis.$refs.CommRecordRef.$refs.CommRecordRef.comp.formShow = true;
        }
      }], _ref.RelatedCompanyIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
  
          oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.resetFormData();
          // 显示新增区域
          oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.comp.formShow = true;
        }
      }], _ref.MemberIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
  
          oThis.$refs.MemberRef.$refs.MemberRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.MemberRef.$refs.MemberRef.resetFormData();
          // 显示新增区域
          oThis.$refs.MemberRef.$refs.MemberRef.comp.formShow = true;
        }
      }], _ref.LitigationSituationIcons = [{
        icon: "plus",
        click: function click() {
          if (oThis.pk_customer === "") {
            oThis.$message({
              message: "请先保存基本信息",
              type: "error"
            });
            return;
          }
  
          oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.getTableComp().closeExpandRow();
          // 重置新增数据
          oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.resetFormData();
          // 显示新增区域
          oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.comp.formShow = true;
        }
      }], _ref;
    },
  
    //获取数据数据初始化操作
    created: function created() {
      this.cust_type = this.$root.$router.currentRoute.params.cust_type;
  
      if (this.cust_type === 'Others_cust') {
        this.isshow = false;
      }
  
      if (this.cust_type === 'Manufacturer') {
        //厂商
        this.pk_temp = 'yls_dev100000000fft';
      }
      if (this.cust_type === 'Agent') {
        //代理商
        this.pk_temp = 'yls_dev100000000ffv';
      }
      if (this.cust_type === 'Lessee') {
        //承租人
        this.pk_temp = 'yls_dev100000000ffn';
      }
      if (this.cust_type === 'Guarantee') {
        //担保人
        this.pk_temp = 'yls_dev100000000ffr';
      }
      if (this.cust_type === 'FinancingUnit') {
        //融资单位
        this.pk_temp = 'yls_dev100000000ffo';
      }
      if (this.cust_type === 'Agency') {
        //中介机构
        this.pk_temp = 'yls_dev100000000ffp';
      }
      if (this.cust_type === 'RelatedParty') {
        //客户关联方
        this.pk_temp = 'yls_dev100000000ffq';
      }
      if (this.cust_type === 'Supplier') {
        //供应商
        this.pk_temp = 'yls_dev100000000ffs';
      }
      if (this.cust_type === 'GroupCust') {
        //集团客户
        this.pk_temp = 'yls_dev100000000ffu';
      }
      if (this.cust_type === 'RentalUnit') {
        //出租单位
        this.pk_temp = 'yls_dev100000000ffw';
      }
    },
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      reloadCorpClick: function reloadCorpClick() {
        debugger;
        if (this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class === '' || this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class === undefined) {
          this.hasCustClsVisible = true;
        } else {
          //this.cust_type=this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class
          this.reloadCorpDetail();
        }
      },
      reloadCorpDetail: function reloadCorpDetail() {
        var urlInfo = this.custPk + this.cust_type;
        location.hash = "/cust/Corpcustomer/detail/" + urlInfo;
        window.location.reload();
      },
      validateInput: function validateInput(identity_no) {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/validateInput",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: identity_no
        }).then(function (res) {
          if (res.data.data !== null) {
            if (res.data.data.customer_type === 'CORP') {
              _this.isIdCanUse = true;
              _this.custPk = res.data.data.pk_cust_customer;
              _this.reloadVisible = true;
            } else {
              _this.isIdCanUse = false;
            }
          } else {
            _this.isIdCanUse = false;
          }
        })["catch"](function (e) {
          console.error(e);
        });
      },
      setRefParam: function setRefParam() {
        //设置客户类型默认值
        this.$refs.baseTemplateRef.comp.$refs["formRef"].model.customer_type = 'CORP';
  
        if (this.pk_temp !== undefined && (this.cust_type === 'Agent' || this.cust_type === 'Manufacturer')) {
          this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class = this.pk_temp;
        }
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        // debugger;
        var urlParam = this.$root.$router.currentRoute.params.id;
        //请求企业客户基本信息详情
        if (urlParam === undefined) {
          this.pk_customer = "";
          this.customerEdit = true;
          return;
        }
  
        if (urlParam.length == 19) {
          this.pk_customer = urlParam;
        } else {
          this.pk_customer = urlParam.substring(0, 19);
          this.cust_type = urlParam.substring(19);
        }
        debugger;
  
        var method = this.$root.$router.currentRoute.name;
  
        // 查看和修改情况
        if (method === "CorpCustomerDetial") {
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
  
      //请求企业客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
  
          var originalValue = res.data.data;
          debugger;
  
          // let formData = this.$refs.baseTemplateRef.getFormData();
          var c_class = originalValue.cusotmer_class;
          if (_this2.cust_type !== undefined) {
            var c_class_pk = '';
  
            if (_this2.cust_type === 'Manufacturer') {
              //厂商
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000fft'] = {
                "code": "7",
                "name": "生产厂商",
                "id": "yls_dev100000000fft"
              };
              c_class_pk = 'yls_dev100000000fft';
            }
            if (_this2.cust_type === 'Agent') {
              //代理商
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffv'] = {
                "code": "9",
                "name": "销售代理",
                "id": "yls_dev100000000ffv"
              };
              c_class_pk = 'yls_dev100000000ffv';
            }
            if (_this2.cust_type === 'Lessee') {
              //承租人
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffn'] = {
                "code": "1",
                "name": "承租客户",
                "id": "yls_dev100000000ffn"
              };
              c_class_pk = 'yls_dev100000000ffn';
            }
            if (_this2.cust_type === 'Guarantee') {
              //担保人
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffr'] = {
                "code": "5",
                "name": "担保客户",
                "id": "yls_dev100000000ffr"
              };
              c_class_pk = 'yls_dev100000000ffr';
            }
  
            if (_this2.cust_type === 'FinancingUnit') {
              //融资单位
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffo'] = {
                "code": "2",
                "name": "融资单位",
                "id": "yls_dev100000000ffo"
              };
              c_class_pk = 'yls_dev100000000ffo';
            }
            if (_this2.cust_type === 'Agency') {
              //中介机构
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffp'] = {
                "code": "3",
                "name": "中介机构",
                "id": "yls_dev100000000ffp"
              };
              c_class_pk = 'yls_dev100000000ffp';
            }if (_this2.cust_type === 'RelatedParty') {
              //客户关联方
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffq'] = {
                "code": "4",
                "name": "客户关联方",
                "id": "yls_dev100000000ffq"
              };
              c_class_pk = 'yls_dev100000000ffq';
            }if (_this2.cust_type === 'Supplier') {
              //供应商
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffs'] = {
                "code": "6",
                "name": "供应商",
                "id": "yls_dev100000000ffs"
              };
              c_class_pk = 'yls_dev100000000ffs';
            }
            if (_this2.cust_type === 'GroupCust') {
              //集团客户
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffu'] = {
                "code": "6",
                "name": "集团客户",
                "id": "yls_dev100000000ffu"
              };
              c_class_pk = 'yls_dev100000000ffu';
            }
            if (_this2.cust_type === 'RentalUnit') {
              //出租单位
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffw'] = {
                "code": "10",
                "name": "出租单位",
                "id": "yls_dev100000000ffw"
              };
              c_class_pk = 'yls_dev100000000ffw';
            }
            debugger;
            if (!(c_class.indexOf(c_class_pk) > 0)) {
              c_class += ',' + c_class_pk;
              originalValue.cusotmer_class = c_class;
              // this.$set(formData, "cusotmer_class", c_class);
              debugger;
              // this.$refs.baseTemplateRef.getFormData().cusotmer_class = c_class;
            }
          }
          _this2.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
          _this2.$refs.baseTemplateRef1.setData("CustCorp", JSON.parse(JSON.stringify(originalValue.cust_corp_list[0])));
        })["catch"](function (e) {
          // console.error(e);
          _this2.$message({
            message: "企业客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.customerEdit = false;
  
        this.$refs.baseTemplateRef.setData('customer', this.copyForCust);
        this.$refs.baseTemplateRef1.setData('CustCorp', this.copyForCorp);
        debugger;
        // 重置value
      },
  
      //企业客户基本信息保存
      customerConfirm: function customerConfirm() {
        var _this3 = this;
  
        var data = this.$refs.baseTemplateRef.comp.customer;
  
        if (this.pk_customer === '') {
          data.cusotmer_class = this.pk_temp;
          data.customer_type = 'CORP';
        }
  
        var data1 = this.$refs.baseTemplateRef1.comp.CustCorp;
        var a = [data1];
        data.cust_corp_list = a;
        data = JSON.parse(JSON.stringify(data));
  
        console.log(data);
        var baseUrl = _publicData.ylsBusi;
        debugger;
  
        //表单formRef  表格tableRef
        this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(function (valid) {
          if (valid) {
            _this3.$refs.baseTemplateRef1.comp.$refs["CustCorpRef"].validate(function (valid) {
              if (valid) {
                _this3.$http({
                  url: baseUrl + "cust/customer/updateORinsert",
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: data
                }).then(function (res) {
                  if (res.data.success === true) {
                    _this3.$message({
                      message: "保存成功",
                      type: "success"
                    });
  
                    _this3.originalValue = res.data.data;
                    console.log(_this3.$refs.baseTemplateRef);
                    _this3.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this3.originalValue)));
  
                    _this3.pk_customer = _this3.originalValue.pk_cust_customer;
                    _this3.customerEdit = false;
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
          }
        });
      }
    }
  };
  //引入联系人和股东信息面板
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">企业客户管理</h2>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <!--企业客户基本信息模块界面-->\n      <ifbp-panel id=\"basePanel\" title=\"企业客户基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"custfunnode\"\n                  :nexuskey=\"custnexuskey\"\n                  :tplResetFun=\"customerResetFun\"\n                  :tpl-data='customerBaseData'\n                  :methods=\"cust_Methods\"\n                  show-type=\"form\"\n                  @after-create=\"setRefParam\"\n                  :editable=\"customerEdit\">\n        </ifbp-template>\n        \n          <ifbp-template ref=\"baseTemplateRef1\"\n                  tplId=\"baseTemplate1\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  show-type=\"form\"\n                  :tplResetFun=\"corpResetFun\"\n                  :methods=\"t_Methods\"\n                  :tplData=\"customerDetailData\"\n                  :editable=\"customerEdit\">\n         </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"customerEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"   :show-body=\"false\"  title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          \n          :pk_customer=\"pk_customer\"\n          type=\"corp\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\"  :show-body=\"false\"  title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n   \n      <!--企业客户资产信息模块-->\n      <ifbp-panel id=\"AssetPanel\"   v-if=\"isshow\"  :show-body=\"false\"  title=\"企业客户资产信息\" :icons=\"AssetIcons\">\n        <AssetRef\n          ref=\"AssetRef\"\n          :pk_customer=\"pk_customer\">\n        </AssetRef>\n      </ifbp-panel>\n      <!--银行账户信息模块-->\n      <ifbp-panel id=\"BankAccountPanel\"  v-if=\"isshow\" :show-body=\"false\"  title=\"银行账户信息\" :icons=\"BankAccountIcons\">\n        <BankAccountRef\n          ref=\"BankAccountRef\"\n          :pk_customer=\"pk_customer\">\n        </BankAccountRef>\n      </ifbp-panel>\n        <!--资质认证信息模块-->\n      <ifbp-panel id=\"QualificationCertPanel\"  v-if=\"isshow\"  :show-body=\"false\" title=\"资质认证信息\" :icons=\"QualificationCertIcons\">\n        <QualificationCertRef\n          ref=\"QualificationCertRef\"\n          :pk_customer=\"pk_customer\">\n        </QualificationCertRef>\n      </ifbp-panel>\n    \n       <!--外部评级信息模块-->\n      <ifbp-panel id=\"ExternalRatingPanel\"  v-if=\"isshow\" :show-body=\"false\"  title=\"外部评级信息\" :icons=\"ExternalRatingIcons\">\n        <ExternalRatingRef\n          ref=\"ExternalRatingRef\"\n          :pk_customer=\"pk_customer\">\n        </ExternalRatingRef>\n      </ifbp-panel>\n    \n       <!--高管信息模块-->\n      <ifbp-panel  id=\"MemberPanel\"   v-if=\"isshow\" :show-body=\"false\" title=\"高管信息\" :icons=\"MemberIcons\">\n        <MemberRef\n          ref=\"MemberRef\"\n          :pk_customer=\"pk_customer\">\n        </MemberRef>\n      </ifbp-panel>\n      <!--涉诉信息模块-->\n      <ifbp-panel  id=\"LitigationSituationPanel\"  v-if=\"isshow\" :show-body=\"false\"  title=\"涉诉信息\" :icons=\"LitigationSituationIcons\">\n        <LitigationSituationRef\n          ref=\"LitigationSituationRef\"\n          :pk_customer=\"pk_customer\">\n        </LitigationSituationRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"reloadVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>该信息已存在，是否调用？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"reloadVisible = false, pk_customer=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"reloadCorpClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"hasCustClsVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>请先维护客户分类！</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"reloadVisible=false,hasCustClsVisible = false, pk_customer=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"hasCustClsVisible=false,pk_customer='',reloadVisible=false\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/CustUpDownPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        CustUpDownDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 上下游客户信息新增
        CustUpDownIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.CustUpDownRef.comp;
            var table = uitemplateComp.$refs["CustUpDown_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        CustUpDownPk: "b3d4602b-1b66-45c9-bd97-8d2e8ebf5e5d", //custaxes
        CustUpDownData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        CustUpDownResetFun: function CustUpDownResetFun($node) {
          var $table = this.getNodeById($node, "ziehg8lr0t");
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
        CustUpDownTplMethods: {
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
        this.requestCustUpDown();
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
          this.requestCustUpDown();
        }
      },
  
      //请求上下游客户信息
      requestCustUpDown: function requestCustUpDown() {
        var _this = this;
  
        var url = void 0;
        url = _publicData.ylsBusi + "cust/CustUpDown/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer
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
          _this.$refs["CustUpDownRef"].setData("CustUpDown_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "上下游客户信息获取失败",
            type: "error"
          });
        });
      },
  
      //上下游客户情况保存
      CustUpDownFormConfirm: function CustUpDownFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.CustUpDownRef.comp.CustUpDown;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.CustUpDownRef.comp.$refs["CustUpDown_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/CustUpDown/updateORinsert",
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
                var linarraydata = _this2.$refs.CustUpDownRef.getData("CustUpDown_t");
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
                _this2.$refs.CustUpDownRef.setData("CustUpDown_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["CustUpDownRef"].comp.formShow = false;
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
      // 上下游客户信息form的取消操作
      CustUpDownFormCancel: function CustUpDownFormCancel(type) {
        if (type === "form") {
          this.$refs["CustUpDownRef"].comp.formShow = false;
        } else {
          this.$refs["CustUpDownRef"].getTableComp().closeExpandRow();
          var CustUpDownTable = this.$refs.CustUpDownRef.getData('CustUpDown_t');
          CustUpDownTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.CustUpDownRef.setData('CustUpDown_t', CustUpDownTable);
        }
      },
      //上下游客户编辑
      CustUpDownEditTableRow: function CustUpDownEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["CustUpDownRef"].getTableComp().expandRow(row);
        // this.$refs["CustUpDownRef"].formShow = false;
        // //CustUpDownRef为表单数据对象参数
        // this.$refs["CustUpDownRef"].setData("CustUpDown", row);
        this.$refs.CustUpDownRef.getTableComp().expandRow(scope.row);
        this.$refs.CustUpDownRef.comp.formShow = false;
        this.$refs.CustUpDownRef.setData('CustUpDown', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //上下游客户信息删除提示
      CustUpDownDeleteTableRow: function CustUpDownDeleteTableRow(scope) {
        this.CustUpDownDelVisible = true;
        this.delId = scope.row.pk_cust_updown;
      },
      //上下游客户信息删除
      CustUpDownDeleteClick: function CustUpDownDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/CustUpDown/deleteById",
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
            _this3.requestCustUpDown();
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
        this.CustUpDownDelVisible = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"CustUpDownRef\"\n                      tplId=\"CustUpDownTemplate\"\n                      :pkTemp=\"CustUpDownPk\"\n                      :tplData=\"CustUpDownData\"\n                      :tplResetFun=\"CustUpDownResetFun\"\n                      :tplMethods=\"CustUpDownTplMethods\"\n                      @form-confirm-click=\"CustUpDownFormConfirm\"\n                      @form-cancel-click=\"CustUpDownFormCancel\"\n                      @edit-table-click=\"CustUpDownEditTableRow\"\n                      @delete-table-click=\"CustUpDownDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 上下游客户信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"CustUpDownDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"CustUpDownDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"CustUpDownDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Customer-InfoDetail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function (_data) {
      function data() {
        return _data.apply(this, arguments);
      }
  
      data.toString = function () {
        return _data.toString();
      };
  
      return data;
    }(function () {
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
            oThis.customerEdit = !oThis.customerEdit;
          }
        }],
        customerPk: "e121f450-50c2-46ba-8b04-1c95a04da420",
        customerData: {
          customer: {},
          rules: {
            name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
            pk_custclass: [{ required: true, message: "客户基本分类不能为空", trigger: "blur" }]
          }
        },
        customerEdit: false,
  
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
        custbankPk: "",
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
                var _data2 = _this.bankaccount;
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
          var $table = this.getNodeById($node, "b327bj95th6");
          $table.attr(':show-header', 'false');
          var operateArr = [{
            title: "编辑",
  
            icon: "edit"
          }, {
            title: "启用",
  
            icon: "pt-tuichu"
          }, {
            title: "删除",
  
            icon: "delete"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $accnum = this.getNodeById($node, "krvqs7xlxfs"); //账号 
          var $accname = this.getNodeById($node, "83oyd6v35wm"); //户名
          var $pkBankdoc = this.getNodeById($node, "r69m5jd8zul"); //开户银行
          var $pkBanktype = this.getNodeById($node, "bo4dg59b0v"); //银行类别
          var $contactpsn = this.getNodeById($node, "0mhkj42m1w5"); //联系人
          var $tel = this.getNodeById($node, "k3bvpmgm9m"); //联系电话
  
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
            var table = uitemplateComp.$refs['OtherContact_t_ref'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }],
        custlinkmanPk: "946c2308-f17d-4d80-bc5b-3f3f406df306", //linkman
        custlinkmanData: {
          rules: {
            name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        linkmanResetFun: function linkmanResetFun($node) {
  
          var $table = this.getNodeById($node, "bimh5ti3qnq");
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
  
          // let $sex = this.getNodeById($node, "ir66pzdxiic"); //性别
          // let $isdefault = this.getNodeById($node, "h81qk6u00p5"); //是否默认
          // $sex.html(
          //   '<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>'
          // );
          // $isdefault.html(
          //   '<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>'
          // );
          return $node[0].outerHTML;
        },
        custlinkmanTplMethods: {
          // form的保存操作
  
          // form的取消操作
  
        },
  
        // 税类信息
        countryTaxesIcons: [{
          icon: "plus",
          click: function click() {
            var uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            var table = uitemplateComp.$refs['Shareholder_t_ref'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }],
        custCountryTaxesPk: "4206377c-53b0-497d-a5b6-c6f98fa6631d", //custaxes
        custCountryTaxesData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        custCountryTaxesResetFun: function custCountryTaxesResetFun($node) {
          var $table = this.getNodeById($node, "uob2e9t4f2");
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
  
          var $pkCountry = this.getNodeById($node, "u5itmgcx7c");
          var $pkTaxes = this.getNodeById($node, "1idpzwci9up");
          $pkCountry.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_country_ref?" + 'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' + "</div></template>");
  
          $pkTaxes.html('<template scope="scope"><div>{{scope.row.beanMap?' + "(scope.row.beanMap.pk_taxes_ref?" + 'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' + "</div></template>");
  
          return $node[0].outerHTML;
        },
        custCountryTaxesTplMethods: {
          // form的保存操作
  
        }
      };
    }),
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      linkmanFormConfirm: function linkmanFormConfirm() {
        var _this2 = this;
  
        var data = this.$refs.custlinkmanRef.comp.OtherContact;
        data.pk_customer = this.pk_customer;
        //data.append("', 'pk_customer': 'OID10000000f04h'");
  
        var baseUrl = '/yls-busi-web/';
        var jsonStr = JSON.stringify(data);
  
        this.$refs.custlinkmanRef.comp.$refs["OtherContact_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + 'cust/otherContact/updateORinsert',
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this2.$message({
                  message: res.data.msg,
                  type: "success"
                });
                _this2.originalValue = res.data.data;
                console.log(_this2.$refs.custlinkmanRef);
                _this2.$refs.custlinkmanRef.setData("OtherContact", JSON.parse(JSON.stringify(_this2.originalValue)));
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                _this2.customerEdit = false;
              } else {
                _this2.$message({
                  message: res.data.msg,
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
      custCountryFormConfirm: function custCountryFormConfirm() {
        var data = this.custaxes;
        console.log(data);
      },
      // form的取消操作
      custCountryFormCancel: function custCountryFormCancel(type) {
        if (type === 'form') {
          this.$refs['custCountryTaxesRef'].comp.formShow = false;
        } else {
          this.$refs['custCountryTaxesRef'].getTableComp().closeExpandRow();
        }
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
      },
  
      linkmanFormCancel: function linkmanFormCancel(type) {
        if (type === 'form') {
          this.$refs['custlinkmanRef'].comp.formShow = false;
        } else {
          this.$refs['custlinkmanRef'].getTableComp().closeExpandRow();
        }
      },
      // table行的编辑操作
      custlinkmanEditTableRow: function custlinkmanEditTableRow(scope) {
  
        var row = scope.row;
        this.$refs['custlinkmanRef'].expandRow(row);
        this.linkman = row;
        this.formShow = false;
      },
      // table行的删除操作
      custlinkmanDeleteTableRow: function custlinkmanDeleteTableRow(scope) {
        console.log("delete", scope.row);
        this.pageComp.linkmanDel = scope.row;
        this.pageComp.linkmanDelVisible = true;
        this.pageComp.pk_linkman = scope.row.pk_linkman;
      },
      /**
         *   单个地点详情
         **/
      request: function request() {
        this.pk_customer = this.$root.$router.currentRoute.params.id;
        //请求客户基本信息详情
  
        var method = this.$root.$router.currentRoute.name;
        if (method != "customer_baseinfo-save") {
  
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
            this.requestCustlinkman();
            this.requestCustCountryTaxes();
          }
        }
        //        //客户银行账户列表
        // this.requestCustBank();
        //        客户联系人联系人列表
  
        //客户税务类别列表
      },
  
      //请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this3 = this;
  
        this.$http({
          url: "/yls-busi-web/cust/customer/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          var originalValue = res.data.data;
          console.log(_this3.$refs.baseTemplateRef);
          _this3.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
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
          if (res.data.success === true) {
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
  
        var url = void 0;
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'cust/otherContact/page';
        var data = {
          "pageNum": 0,
          "pageSize": 0,
          "searchParams": {
            "searchMap": {
              "pk_customer": this.pk_customer
            }
          }
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          _this5.originalValue = res.data.data.content;
          _this5.$refs["custlinkmanRef"].setData("OtherContact_t", JSON.parse(JSON.stringify(_this5.originalValue)));
          // this.totalElements = res.data.data.totalElements; // 总条数
          // this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this5.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求股东信息
      requestCustCountryTaxes: function requestCustCountryTaxes() {
        var _this6 = this;
  
        var url = void 0;
        var baseUrl = '/yls-busi-web/';
        url = baseUrl + 'cust/related_company/page';
        var data = {
          "pageNum": 0,
          "pageSize": 0,
          "searchParams": {
            "searchMap": {
              "pk_customer": this.pk_customer
            }
          }
        };
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          _this6.originalValue = res.data.data.content;
          _this6.$refs["custCountryTaxesRef"].setData("Shareholder_t", JSON.parse(JSON.stringify(_this6.originalValue)));
          // this.totalElements = res.data.data.totalElements; // 总条数
          // this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this6.$message({
            message: "信息获取失败",
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
          if (res.data.success === true) {
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
          if (res.data.success === true) {
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
          if (res.data.success === true) {
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
        this.customerEdit = false;
        // 重置value
      },
      customerConfirm: function customerConfirm() {
        var _this10 = this;
  
        var data = this.$refs.baseTemplateRef.comp.customer;
        console.log(data);
        var baseUrl = '/yls-busi-web/';
        var jsonStr = JSON.stringify(data);
  
        this.$refs.baseTemplateRef.comp.$refs["customer_ref"].validate(function (valid) {
          if (valid) {
            _this10.$http({
              url: baseUrl + 'cust/customer/updateORinsert',
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this10.$message({
                  message: res.data.msg,
                  type: "success"
                });
                _this10.originalValue = res.data.data;
                console.log(_this10.$refs.baseTemplateRef);
                _this10.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this10.originalValue)));
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                _this10.customerEdit = false;
              } else {
                _this10.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this10.$message({
                message: "更新失败",
                type: "error"
              });
            });
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">客户信息管理</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <ifbp-panel id=\"basePanel\" title=\"代理商信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"customerPk\"\n                  show-type=\"form\"\n                  :tplData=\"customerData\"\n                  :editable=\"customerEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"customerEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n     \n      <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <ifbp-template ref=\"custlinkmanRef\"\n                      tplId=\"linkmanTemplate\"\n                      :pkTemp=\"custlinkmanPk\"\n                      :tplData=\"custlinkmanData\"\n                      :tplResetFun=\"linkmanResetFun\"\n                      :tplMethods=\"custlinkmanTplMethods\"\n                      @form-confirm-click=\"linkmanFormConfirm\"\n                      @form-cancel-click=\"linkmanFormCancel\"\n                      show-type=\"table-form\"\n                    \n                      >\n        </ifbp-template>\n      \n      </ifbp-panel>\n      <ifbp-panel id=\"countryTaxesPanel\" title=\"股东信息\" :icons=\"countryTaxesIcons\">\n        <ifbp-template ref=\"custCountryTaxesRef\"\n                      tplId=\"countryTaxesTemplate\"\n                      :pkTemp=\"custCountryTaxesPk\"\n                      :tplData=\"custCountryTaxesData\"\n                      :tplResetFun=\"custCountryTaxesResetFun\"\n                      :tplMethods=\"custCountryTaxesTplMethods\"\n                      form-confirm-fun=\"custCountryFormConfirm\"\n                      @form-cancel-click=\"custCountryFormCancel\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custbankDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custbankDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custbankDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <!-- 客户联系人 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"linkmanDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"linkmanDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n\n  <!-- 客户国家税类 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"custCountryTaxesDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custCountryTaxesDelVisible = false\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"custCountryTaxesDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/CustomerAdd.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      data: function data() {
          return {
              //模版主键
              pk_temp: "a27b783d-c4d4-463e-8b10-772248af03f0",
              //当前页
              currentPage: 1,
              //每页显示个数选择器的选项设置
              pageSizes: [10, 20, 30, 40],
              //每页显示条目个数
              size: 10,
              //总条目数
              totalElements: 0,
              customerListData: {},
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
              //showDeleteButton: true,
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = this.getNodeById($node, "t3w8pjkb6md");
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "edit"
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
          addCustomerInfo: function addCustomerInfo() {
              location.hash = "/cust/customer/add/";
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //编辑按钮
          tableEditClick: function tableEditClick(scope) {
              location.hash = "/cust/customer/detail/" + scope.row.pk_customer;
          },
          //选择条数改变
          handleSelectionChange: function handleSelectionChange(selection) {
              this.$message("选中条数为:" + selection.length);
          },
          //每页显示条数改变
          handleSizeChange: function handleSizeChange(sizeVal) {
              this.size = sizeVal;
              var maxPage = Math.ceil(this.totalElements / sizeVal);
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
              var _this = this;
  
              var delId = scope.row.pk_customer;
              this.$http({
                  url: "/yls-busi-web/cust/customer/deleteById",
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  dataType: "json",
                  data: delId
              }).then(function (res) {
                  if (res.data.status === true) {
                      _this.$message({
                          message: "删除成功",
                          type: "success"
                      });
                      //this.delDialogVisible = false;
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
  
              var url = void 0;
              var baseUrl = "/yls-busi-web";
              url = baseUrl + '/cust/customer/page';
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
                  //customerCalculator_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
                  _this2.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  _this2.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
  
  
          /**
           * 高级搜索相关 start
          */
  
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
              //this.searchTemplate = testSearchTemplate;
              //this.conditionList = testSearchTemplate.conditionList;
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
          }
          /**
           * 高级搜索相关 end
          */
  
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">客户信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addCustomerInfo\">新增</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"客户编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  <!-- 已选参数展示 -->\n  <div v-if=\"showSelectedTags\" class=\"options-selected\">\n    <template v-for=\"condition in conditionList\">\n      <el-tag v-if=\"condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}\n      </el-tag>\n      <el-tag v-if=\"condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)\"\n        :key=\"condition.fieldcode\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\"\n      >\n        <!--{{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}-->\n      </el-tag>\n      <el-tag\n        v-for=\"option in condition.optionList.options\"\n        :key=\"option.value\"\n        v-if=\"option.selected\"\n        :closable=\"true\"\n        type=\"gray\"\n        @close=\"cancelConditionSelection(condition.optionList)\">\n        {{option.name}}\n      </el-tag>\n    </template>\n  </div>\n</div>\n\n  <!-- 客户列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                  :pkTemp=\"pk_temp\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  \n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalElements\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/EquityInvestPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "EquityInvest",
        EquityInvestDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 股权投资信息新增
        EquityInvestIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.EquityInvestRef.comp;
            var table = uitemplateComp.$refs["EquityInvest_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        EquityInvestPk: "06b01680-522c-4fd4-8276-cc9f3f6d681f", //custaxes
        EquityInvestData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        EquityInvestResetFun: function EquityInvestResetFun($node) {
          var $table = $node.find('el-table');
          // $table.attr(":show-header", "false");
          var $refNode1 = this.getNodeById($node, 't9t6cqb85l');
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
  
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
          handleRefChange1: function handleRefChange1(type, data) {
  
            if (type === 'change') {
  
              this.$refs['EquityInvest_ref'].model.customer_code = data.value[0].code;
            }
          }
        },
        EquityInvestTplMethods: {
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
        this.requestEquityInvest();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestEquityInvest();
        }
      },
  
      //请求股权投资信息
      requestEquityInvest: function requestEquityInvest() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/EquityInvest/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer,
              message_owner: ownerId
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
          _this.$refs["EquityInvestRef"].setData("EquityInvest_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "股权投资信息获取失败",
            type: "error"
          });
        });
      },
  
      //股权投资情况保存
      EquityInvestFormConfirm: function EquityInvestFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.EquityInvestRef.comp.EquityInvest;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.EquityInvestRef.comp.$refs["EquityInvest_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/EquityInvest/updateORinsert",
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
                var linarraydata = _this2.$refs.EquityInvestRef.getData("EquityInvest_t");
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
                _this2.$refs.EquityInvestRef.setData("EquityInvest_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["EquityInvestRef"].comp.formShow = false;
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
      // 股权投资信息form的取消操作
      EquityInvestFormCancel: function EquityInvestFormCancel(type) {
        if (type === "form") {
          this.$refs["EquityInvestRef"].comp.formShow = false;
        } else {
          this.$refs["EquityInvestRef"].getTableComp().closeExpandRow();
          var EquityInvestTable = this.$refs.EquityInvestRef.getData('EquityInvest_t');
          EquityInvestTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.EquityInvestRef.setData('EquityInvest_t', EquityInvestTable);
        }
      },
      //股权投资编辑
      EquityInvestEditTableRow: function EquityInvestEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["EquityInvestRef"].getTableComp().expandRow(row);
        // this.$refs["EquityInvestRef"].formShow = false;
        // //EquityInvestRef为表单数据对象参数
        // this.$refs["EquityInvestRef"].setData("EquityInvest", row);
        this.$refs.EquityInvestRef.getTableComp().expandRow(scope.row);
        this.$refs.EquityInvestRef.comp.formShow = false;
        this.$refs.EquityInvestRef.setData('EquityInvest', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //股权投资信息删除提示
      EquityInvestDeleteTableRow: function EquityInvestDeleteTableRow(scope) {
        this.EquityInvestDelVisible = true;
        this.delId = scope.row.pk_cust_equity_invest;
      },
      //股权投资信息删除
      EquityInvestDeleteClick: function EquityInvestDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/EquityInvest/deleteById",
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
            _this3.requestEquityInvest();
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
        this.EquityInvestDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"EquityInvestRef\"\n                      tplId=\"EquityInvestTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"EquityInvestData\"\n                      :tplResetFun=\"EquityInvestResetFun\"\n                      :tplMethods=\"EquityInvestTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"EquityInvestFormConfirm\"\n                      @form-cancel-click=\"EquityInvestFormCancel\"\n                      @edit-table-click=\"EquityInvestEditTableRow\"\n                      @delete-table-click=\"EquityInvestDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 股权投资信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"EquityInvestDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"EquityInvestDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"EquityInvestDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/ExternalRatingPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "ExternalRating",
        ExternalRatingDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 外部评级信息新增
        ExternalRatingIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.ExternalRatingRef.comp;
            var table = uitemplateComp.$refs["ExternalRating_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        ExternalRatingPk: "01b45188-5c39-4283-9a55-f7d223a95889", //custaxes
        ExternalRatingData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        ExternalRatingResetFun: function ExternalRatingResetFun($node) {
          var $table = $node.find('el-table');
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
        ExternalRatingTplMethods: {
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
        this.requestExternalRating();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestExternalRating();
        }
      },
  
      //请求外部评级信息
      requestExternalRating: function requestExternalRating() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/ExternalRating/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
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
          _this.$refs["ExternalRatingRef"].setData("ExternalRating_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "外部评级信息获取失败",
            type: "error"
          });
        });
      },
  
      //外部评级情况保存
      ExternalRatingFormConfirm: function ExternalRatingFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.ExternalRatingRef.comp.ExternalRating;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.ExternalRatingRef.comp.$refs["ExternalRating_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/ExternalRating/updateORinsert",
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
                var linarraydata = _this2.$refs.ExternalRatingRef.getData("ExternalRating_t");
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
                _this2.$refs.ExternalRatingRef.setData("ExternalRating_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["ExternalRatingRef"].comp.formShow = false;
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
      // 外部评级信息form的取消操作
      ExternalRatingFormCancel: function ExternalRatingFormCancel(type) {
        if (type === "form") {
          this.$refs["ExternalRatingRef"].comp.formShow = false;
        } else {
          this.$refs["ExternalRatingRef"].getTableComp().closeExpandRow();
          var ExternalRatingTable = this.$refs.ExternalRatingRef.getData('ExternalRating_t');
          ExternalRatingTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.ExternalRatingRef.setData('ExternalRating_t', ExternalRatingTable);
        }
      },
      //外部评级编辑
      ExternalRatingEditTableRow: function ExternalRatingEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["ExternalRatingRef"].getTableComp().expandRow(row);
        // this.$refs["ExternalRatingRef"].formShow = false;
        // //ExternalRatingRef为表单数据对象参数
        // this.$refs["ExternalRatingRef"].setData("ExternalRating", row);
        this.$refs.ExternalRatingRef.getTableComp().expandRow(scope.row);
        this.$refs.ExternalRatingRef.comp.formShow = false;
        this.$refs.ExternalRatingRef.setData('ExternalRating', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //外部评级信息删除提示
      ExternalRatingDeleteTableRow: function ExternalRatingDeleteTableRow(scope) {
        this.ExternalRatingDelVisible = true;
        this.delId = scope.row.pk_cust_external_rating;
      },
      //外部评级信息删除
      ExternalRatingDeleteClick: function ExternalRatingDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/ExternalRating/deleteById",
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
            _this3.requestExternalRating();
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
        this.ExternalRatingDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"ExternalRatingRef\"\n                      tplId=\"ExternalRatingTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"ExternalRatingData\"\n                      :tplResetFun=\"ExternalRatingResetFun\"\n                      :tplMethods=\"ExternalRatingTplMethods\"\n                      @form-confirm-click=\"ExternalRatingFormConfirm\"\n                      @form-cancel-click=\"ExternalRatingFormCancel\"\n                      @edit-table-click=\"ExternalRatingEditTableRow\"\n                      @delete-table-click=\"ExternalRatingDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 外部评级信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"ExternalRatingDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"ExternalRatingDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"ExternalRatingDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Guarantee-baseinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
      data: function data() {
          var oThis = this;
          return {
              funnode: "BT003",
              nexuskey: "Guarantee_list",
  
              createType: false,
              custVisible: false,
  
              // 查询模板编码
              searchTemplateCode: 'YLSCXMB_BUSICUST_GUARANTEE',
              sp: '{}',
              customerListData: {},
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "search"
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
          addPersonCustomerInfo: function addPersonCustomerInfo() {
              location.hash = "/cust/Personcustomer/add/" + "Guarantee";
          },
          addCorpCustomerInfo: function addCorpCustomerInfo() {
              location.hash = "/cust/Corpcustomer/add/" + "Guarantee";
          },
  
          //编辑按钮
          tableSearchClick: function tableSearchClick(scope) {
  
              if (scope.row.customer_type === 'CORP') {
                  location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;
              } else if (scope.row.customer_type === 'PERSON') {
                  location.hash = "/cust/Personcustomer/detail/" + scope.row.pk_cust_customer;
              }
          },
          tableDeleteClickRow: function tableDeleteClickRow(scope) {
  
              this.custVisible = true;
              this.delId = scope.row.pk_cust_customer;
          },
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              var _this = this;
  
              // let delId = scope.row.pk_cust_customer;
              this.$http({
                  url: _publicData.ylsBusi + "cust/customer/deleteById",
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
                      _this.custVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.message,
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
          request: function request() {
              var _this2 = this;
  
              var url = void 0;
              var baseUrl = _publicData.ylsBusi;
              url = baseUrl + 'cust/customer/page';
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'cusotmer_class',
                              'oper': ' LIKE ',
                              'value': '%yls_dev100000000ffr%'
                          }],
                          'qtAggVO': this.sp
                      }
                  }
              };
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //customer_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
              })["catch"](function (e) {
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
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">担保信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" v-show=\"!createType\" @mouseenter.native=\"createType=true\" >新增</el-button>\n      <div v-show=\"createType\" @mouseleave.self=\"createType=false\">\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addPersonCustomerInfo\">自然人担保</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\"  @click=\"addCorpCustomerInfo\">企业担保</el-button>\n      </div>\n    </div>\n    <div class=\"fr\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n  <!-- 担保人列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  \n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClickRow\" >\n    </ifbp-template>\n    <el-dialog\n    title=\"提示\"\n    v-model=\"custVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n    </span>\n   </el-dialog>\n    \n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Lessee-baseinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
  
      data: function data() {
          var oThis = this;
          return {
              title: 'solution',
              addButton: '新增',
              highsearchParam: '{}',
              funnode: "BT003",
              nexuskey: "Lessee_list",
  
              createType: false,
              custVisible: false,
  
              // 查询模板编码
              searchTemplateCode: 'YLSCXMB_BUSICUST_LISTCUSTOMER',
              customerListData: {},
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "search"
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
          this.request();
      },
  
      methods: {
  
          // 查询
          handleSearch: function handleSearch(searchTemplate) {
              if (searchTemplate !== '') {
                  this.highsearchParam = JSON.stringify(searchTemplate);
              }
  
              this.request();
          },
  
          // 添加按钮
          addPersonCustomerInfo: function addPersonCustomerInfo() {
              location.hash = "/cust/Personcustomer/add/" + "Lessee";
          },
          addCorpCustomerInfo: function addCorpCustomerInfo() {
              location.hash = "/cust/Corpcustomer/add/" + "Lessee";
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message("搜索：" + this.search_input);
          },
  
          //编辑按钮
          tableSearchClick: function tableSearchClick(scope) {
  
              if (scope.row.customer_type === 'CORP') {
                  location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;
              } else if (scope.row.customer_type === 'PERSON') {
                  location.hash = "/cust/Personcustomer/detail/" + scope.row.pk_cust_customer;
              }
          },
          tableDeleteClickRow: function tableDeleteClickRow(scope) {
  
              this.custVisible = true;
              this.delId = scope.row.pk_cust_customer;
          },
          // //当前页发生改变
          // handleCurrentChange:function(currVal){
          //     this.currentPage = currVal;
          //     this.request(this.currentPage - 1, this.size);
          // },
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              var _this = this;
  
              // let delId = scope.row.pk_cust_customer;
              this.$http({
                  url: _publicData.ylsBusi + "cust/customer/deleteById",
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
                      _this.custVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.message,
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
          request: function request() {
              var _this2 = this;
  
              debugger;
              var url = void 0;
              var baseUrl = _publicData.ylsBusi;
              url = baseUrl + 'cust/customer/page';
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  "pageNum": this.currentPage - 1,
                  "pageSize": this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'cusotmer_class',
                              'oper': 'in',
                              'value': ['yls_dev100000000ffx', 'yls_dev100000000ffn', 'yls_dev100000000ffr']
                          }],
                          'qtAggVO': this.highsearchParam
                      }
                  }
              };
  
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //customer_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
                  _this2.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  _this2.$message({
                      message: "信息获取失败",
                      type: "error"
                  });
              });
          },
          refreshPage: function refreshPage() {
              var _this3 = this;
  
              this.$http.post(_publicData.ylsBusi + 'cust/customer/page', {
                  pageNum: this.currentPage - 1,
                  pageSize: this.pageSize
              }).then(function (resp) {
                  if (resp.data.success) {
                      _this3.$refs.wechatUserList.setData('WechatUserEntity_t', resp.data.data.content);
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">{{title}}</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" v-show=\"!createType\" @mouseenter.native=\"createType=true\" >{{addButton}}</el-button>\n      <div v-show=\"createType\" @mouseleave.self=\"createType=false\">\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addPersonCustomerInfo\">自然人客户</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\"  @click=\"addCorpCustomerInfo\">企业客户</el-button>\n      </div>\n    </div>\n    <div class=\"fr\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n  <!-- 客户列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  \n                  :tplResetFun=\"templateTableFormResetFun\"\n                  \n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClickRow\" >\n    </ifbp-template>\n    <el-dialog\n    title=\"提示\"\n    v-model=\"custVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n    </span>\n   </el-dialog>\n    \n    <!--分页组件-->\n          <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n          </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/LitigationSituationPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "LitigationSituation",
        LitigationSituationDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 涉诉信息新增
        LitigationSituationIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.LitigationSituationRef.comp;
            var table = uitemplateComp.$refs["LitigationSituation_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        LitigationSituationPk: "4a422aaa-feef-4858-8769-a8f4c48db8d1", //custaxes
        LitigationSituationData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        LitigationSituationResetFun: function LitigationSituationResetFun($node) {
          var $table = $node.find('el-table');
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
        LitigationSituationTplMethods: {
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
        this.requestLitigationSituation();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestLitigationSituation();
        }
      },
  
      //请求涉诉信息
      requestLitigationSituation: function requestLitigationSituation() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/LitigationSituation/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
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
          _this.$refs["LitigationSituationRef"].setData("LitigationSituation_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "涉诉信息获取失败",
            type: "error"
          });
        });
      },
  
      //涉诉信息保存
      LitigationSituationFormConfirm: function LitigationSituationFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.LitigationSituationRef.comp.LitigationSituation;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.LitigationSituationRef.comp.$refs["LitigationSituation_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/LitigationSituation/updateORinsert",
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
                var linarraydata = _this2.$refs.LitigationSituationRef.getData("LitigationSituation_t");
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
                _this2.$refs.LitigationSituationRef.setData("LitigationSituation_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["LitigationSituationRef"].comp.formShow = false;
                //this.requestLitigationSituation();
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
      // 涉诉信息form的取消操作
      LitigationSituationFormCancel: function LitigationSituationFormCancel(type) {
  
        this.$refs.LitigationSituationRef.getTableComp().closeExpandRow();
        if (type === "form") {
          this.$refs["LitigationSituationRef"].comp.formShow = false;
        } else {
          this.$refs["LitigationSituationRef"].getTableComp().closeExpandRow();
          var LitigationSituationTable = this.$refs.LitigationSituationRef.getData('LitigationSituation_t');
          LitigationSituationTable[this.baseEditIndex] = this.baseData;
          this.$refs.LitigationSituationRef.setData('LitigationSituation_t', LitigationSituationTable);
        }
      },
      //涉诉编辑
      LitigationSituationEditTableRow: function LitigationSituationEditTableRow(scope) {
        //记录位置
        this.rmoveindex = scope.$index;
        // //行下展开表单界面
        var row = scope.row;
        // this.$refs["LitigationSituationRef"].getTableComp().expandRow(row);
        // this.$refs["LitigationSituationRef"].formShow = false;
        // //LitigationSituationRef为表单数据对象参数
        // this.$refs["LitigationSituationRef"].setData("LitigationSituation", row);
  
        this.$refs.LitigationSituationRef.getTableComp().expandRow(scope.row);
        this.$refs.LitigationSituationRef.comp.formShow = false;
        this.$refs.LitigationSituationRef.setData('LitigationSituation', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //涉诉信息删除提示
      LitigationSituationDeleteTableRow: function LitigationSituationDeleteTableRow(scope) {
        this.LitigationSituationDelVisible = true;
        this.delId = scope.row.pk_cust_litigation_situation;
      },
      //涉诉信息删除
      LitigationSituationDeleteClick: function LitigationSituationDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/LitigationSituation/deleteById",
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
            _this3.requestLitigationSituation();
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
        this.LitigationSituationDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"LitigationSituationRef\"\n                      tplId=\"LitigationSituationTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"LitigationSituationData\"\n                      :tplResetFun=\"LitigationSituationResetFun\"\n                      :tplMethods=\"LitigationSituationTplMethods\"\n                      @form-confirm-click=\"LitigationSituationFormConfirm\"\n                      @form-cancel-click=\"LitigationSituationFormCancel\"\n                      @edit-table-click=\"LitigationSituationEditTableRow\"\n                      @delete-table-click=\"LitigationSituationDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 涉诉信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"LitigationSituationDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"LitigationSituationDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"LitigationSituationDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Manufacturer-InfoDetail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _linkmanpanel = require('yls^busi/customer/src/linkmanpanel.vue');
  
  var _linkmanpanel2 = _interopRequireDefault(_linkmanpanel);
  
  var _Shareholderpanel = require('yls^busi/customer/src/Shareholderpanel.vue');
  
  var _Shareholderpanel2 = _interopRequireDefault(_Shareholderpanel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  //引入联系人和股东信息面板
  exports["default"] = {
    components: {
      'custlinkmanRef': _linkmanpanel2["default"],
      'ShareholderRef': _Shareholderpanel2["default"]
  
    },
    data: function data() {
  
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
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
        //企业客户名称
        if (rule.field === "customer_name") {
          if (value === '') {
            callback(new Error('企业客户名称不能为空'));
          } else {
            callback();
          }
        }
      };
      return {
        funnode: "BT003",
        nexuskey: "customer_corp_ui",
        custfunnode: "BT003",
        custnexuskey: "customer_detial_ui",
        scrollDom: "ifbpScrollDom",
        pk_customer: "",
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        //企业客户基本信息修改
        corpResetFun: function corpResetFun($node) {
          var $refNode1 = this.getNodeById($node, 'w85l2pcqcf'); //开户行省
          var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
          var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
          if ($refNode2.length) {
            $refNode2.attr("v-on:trigger", "handleRefChange2");
          }
          if ($refNode3.length) {
            $refNode3.attr("v-on:trigger", "handleRefChange3");
          }
  
          //地区级联参照
          var $refNode4 = this.getNodeById($node, 'ofj3u2jhzb9');
          var $refNode5 = this.getNodeById($node, 'rwakr8o78c');
  
          if ($refNode4.length) {
            $refNode4.attr("v-on:trigger", "handleRefChange4");
          }
          if ($refNode5.length) {
            $refNode5.attr("v-on:trigger", "handleRefChange5");
          }
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
  
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('h_param', refParams);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
  
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('m_param', refParams);
            }
          },
          handleRefChange3: function handleRefChange3(type, data) {
  
            if (type === 'change') {
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('s_param', refParams);
            }
          },
          handleRefChange4: function handleRefChange4(type, data) {
  
            if (type === 'change') {
  
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('city_param', refParams);
            }
          },
          handleRefChange5: function handleRefChange5(type, data) {
  
            if (type === 'change') {
  
              var refParams = { 'key': data.value[0].innercode };
              oThis.$refs.baseTemplateRef1.setData('county_param', refParams);
            }
          }
        },
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.customerEdit = !oThis.customerEdit;
          }
        }],
        customerPk: "54fc5e2c-414d-49e5-9a44-1bf2bbe002e1",
        customerData: {
          customer: {},
          rules: {
            customer_name: [{ validator: validatecustomer, trigger: "blur" }],
            identity_no: [{ validator: validatecustomer, trigger: "blur" }],
            cusotmer_class: [
              // { required: true, message: "企业客户基本分类不能为空", trigger: "blur" }
            ]
          }
        },
        customerEdit: false,
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
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
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
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }]
  
      };
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
        this.pk_customer = this.$root.$router.currentRoute.params.id;
        //请求企业客户基本信息详情
        if (this.pk_customer === undefined) {
          this.pk_customer = "";
          this.customerEdit = true;
          return;
        }
  
        var method = this.$root.$router.currentRoute.name;
  
        if (method === "Manufacturer-update") {
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
  
      //请求企业客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
  
          _this.$refs.baseTemplateRef1.setData("CustCorp", JSON.parse(JSON.stringify(originalValue.cust_corp_list[0])));
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "企业客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.customerEdit = false;
        // 重置value
      },
  
      //企业客户基本信息保存
      customerConfirm: function customerConfirm() {
        var _this2 = this;
  
        var data = this.$refs.baseTemplateRef.comp.customer;
        var data1 = this.$refs.baseTemplateRef1.comp.CustCorp;
  
        var a = [data1];
        data.cust_corp_list = a;
        console.log(data);
        var baseUrl = _publicData.ylsBusi;
  
        //表单formRef  表格tableRef
        this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/customer/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
  
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功",
                  type: "success"
                });
  
                _this2.originalValue = res.data.data;
                console.log(_this2.$refs.baseTemplateRef);
                _this2.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this2.originalValue)));
  
                _this2.pk_customer = _this2.originalValue.pk_cust_customer;
                _this2.customerEdit = false;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">企业客户管理</h2>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <!--企业客户基本信息模块界面-->\n      <ifbp-panel id=\"basePanel\" title=\"企业客户基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"custfunnode\"\n                  :nexuskey=\"custnexuskey\"\n                  show-type=\"form\"\n                  :tplData=\"customerData\"\n                  :editable=\"customerEdit\">\n        </ifbp-template>\n          <ifbp-template ref=\"baseTemplateRef1\"\n                  tplId=\"baseTemplate1\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  show-type=\"form\"\n                  :tplResetFun=\"corpResetFun\"\n                  :methods=\"t_Methods\"\n                \n                  :editable=\"customerEdit\">\n         </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"customerEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"    title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      <!--股东信息模块界面-->\n      <ifbp-panel id=\"ShareholderPanel\"    title=\"股东信息\" :icons=\"ShareholderIcons\">\n        <ShareholderRef\n          ref=\"ShareholderRef\"\n          :pk_customer=\"pk_customer\">\n        </ShareholderRef>\n      </ifbp-panel>\n      \n     \n      \n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Manufacturer-baseinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
      data: function data() {
          var oThis = this;
          return {
  
              funnode: "BT003",
              nexuskey: "Manufacturer_list",
  
              createType: false,
              custVisible: false,
              // 查询模板编码
              searchTemplateCode: 'YLSCXMB_BUSICUST_MANUFACTURER',
              sp: '{}',
              customerListData: {},
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "search"
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
          this.request();
      },
  
      methods: {
  
          // 添加按钮
          addManufacturer: function addManufacturer() {
              location.hash = "/cust/Corpcustomer/add/" + "Manufacturer";
          },
  
          // 查询
          handleSearch: function handleSearch(searchTemplate) {
              if (searchTemplate !== '') {
                  this.sp = JSON.stringify(searchTemplate);
              }
              this.request();
          },
  
  
          //编辑按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;
          },
          tableDeleteClickRow: function tableDeleteClickRow(scope) {
  
              this.custVisible = true;
              this.delId = scope.row.pk_cust_customer;
          },
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              var _this = this;
  
              // let delId = scope.row.pk_cust_customer;
              this.$http({
                  url: _publicData.ylsBusi + "cust/customer/deleteById",
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
                      _this.custVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.message,
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
          request: function request() {
              var _this2 = this;
  
              var url = void 0;
              var baseUrl = _publicData.ylsBusi;
              url = baseUrl + 'cust/customer/page';
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'cusotmer_class',
                              'oper': ' LIKE ',
                              'value': '%yls_dev100000000fft%'
                          }],
                          'qtAggVO': this.sp
                      }
                  }
              };
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //customer_table UI模板表格名称
  
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
              })["catch"](function (e) {
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">厂商信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\"  @click=\"addManufacturer\">新增</el-button>       \n    </div>\n    <div class=\"fr\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n  <!-- 厂商列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  \n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClickRow\" >\n    </ifbp-template>\n    <el-dialog\n    title=\"提示\"\n    v-model=\"custVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n    </span>\n   </el-dialog>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/MemberPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "Member",
        MemberDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 客户来源信息新增
        MemberIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.MemberRef.comp;
            var table = uitemplateComp.$refs["Member_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
  
        MemberData: {
          isEdit: false
        },
        MemberResetFun: function MemberResetFun($node) {
          var $refNode = $node.find("el-ref[v-model='Member.customer_name']");
  
          if ($refNode.length) {
            $refNode.attr("v-on:trigger", "handleRefChange");
          }
          var $refNodeIdType = $node.find("el-select[v-model='Member.identity_type']"); //获取证件类型节点
          $refNodeIdType.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
          var $refNodeIdNo = $node.find("el-input[v-model='Member.identity_card_numb']"); //获取证件号节点
          $refNodeIdNo.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
  
  
          var $table = $node.find('el-table');
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
        t_Methods: {
          handleRefChange: function handleRefChange(type, data) {
  
            if (type === 'change') {
  
              this.$refs['Member_ref'].model.pk_customer_ref = data.value[0].code;
              this.$refs['Member_ref'].model.identity_type = data.value[0].identity_type;
              this.$refs['Member_ref'].model.identity_card_numb = data.value[0].identity_no;
              oThis.$refs["MemberRef"].setData("isEdit", true);
            }
          }
        },
        MemberTplMethods: {
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
        this.requestMember();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestMember();
        }
      },
  
      //请求客户来源信息
      requestMember: function requestMember() {
        var _this = this;
  
        debugger;
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/Member/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          'pageNum': 0,
          'pageSize': 100,
          "searchParams": {
            "searchMap": {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
              }]
  
            }
          }
        };
  
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data
        }).then(function (res) {
          debugger;
          _this.originalValue = res.data.data.content;
          _this.$refs["MemberRef"].setData("Member_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "高管信息获取失败",
            type: "error"
          });
        });
      },
  
      //客户来源情况保存
      MemberFormConfirm: function MemberFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        debugger;
        var data = this.$refs.MemberRef.comp.Member;
        data.pk_customer = this.pk_customer;
  
        var baseUrl = _publicData.ylsBusi;
        //保存校验
  
        this.$refs.MemberRef.comp.$refs["Member_ref"].validate(function (valid) {
  
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/Member/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              debugger;
  
              if (res.data.success === true) {
                _this2.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this2.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this2.$refs.MemberRef.getData("Member_t");
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
                _this2.$refs.MemberRef.setData("Member_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["MemberRef"].comp.formShow = false;
                //this.requestMember();
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
      // 客户来源信息form的取消操作
      MemberFormCancel: function MemberFormCancel(type) {
        if (type === "form") {
          this.$refs["MemberRef"].comp.formShow = false;
        } else {
          this.$refs.MemberRef.getTableComp().closeExpandRow();
          var MemberTable = this.$refs.MemberRef.getData('Member_t');
          MemberTable[this.baseEditIndex] = this.baseData;
          this.$refs.MemberRef.setData('Member_t', MemberTable);
        }
      },
      //客户来源编辑
      MemberEditTableRow: function MemberEditTableRow(scope) {
        //记录位置
        this.rmoveindex = scope.$index;
        // //行下展开表单界面
        var row = scope.row;
        this.$refs.MemberRef.getTableComp().expandRow(scope.row);
        this.$refs.MemberRef.comp.formShow = false;
        this.$refs.MemberRef.setData('Member', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //客户来源信息删除提示
      MemberDeleteTableRow: function MemberDeleteTableRow(scope) {
        this.MemberDelVisible = true;
        this.delId = scope.row.pk_cust_member;
      },
      //客户来源信息删除
      MemberDeleteClick: function MemberDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/Member/deleteById",
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
            _this3.requestMember();
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
        this.MemberDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"MemberRef\"\n                      tplId=\"MemberTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"MemberData\"\n                      :tplResetFun=\"MemberResetFun\"\n                      :tplMethods=\"MemberTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"MemberFormConfirm\"\n                      @form-cancel-click=\"MemberFormCancel\"\n                      @edit-table-click=\"MemberEditTableRow\"\n                      @delete-table-click=\"MemberDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 客户来源信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"MemberDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"MemberDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"MemberDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Operation_info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['source_bill'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        operationDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT004',
        nexusKey: 'OperationProtocol',
        operationData: {},
        t_Methods: {},
        operationResetFun: function operationResetFun($node) {
          if (oThis.invisible) {
            return;
          }
          var $refNode = this.getNodeById($node, '1nnheivkgfc'); //获取客户参照
          if (oThis.pid !== undefined) {
            $refNode.attr("v-bind:disabled", 'true'); //客户参照只读
          } else {
            $refNode.attr("v-bind:disabled", 'false'); //客户参照可编辑
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
  
        operationTplMethods: {
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
          this.requestOperation();
        }
      },
      closeAddForm: function closeAddForm() {
        this.$refs['operationTable'].comp.formShow = false; //关闭添加表单事件
      },
  
      //请求保证担保信息
      requestOperation: function requestOperation() {
        var _this = this;
  
        var data = {
          pageNum: 0,
          pageSize: 10,
          searchParams: {
            searchMap: {
              source_bill: this.source_bill
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['operationTable'].setData('OperationProtocol_t', JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },
  
      //保证担保情况保存
      operationFormConfirm: function operationFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = void 0;
        var data1 = this.$refs.operationTable.comp.OperationProtocol;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/UpdateOrCreate',
          // headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data: data1
        }).then(function (res) {
          location.hash = '/operation/list';
          _this2.editable = false;
          var originalValue = res.data.data;
          _this2.$refs["operationTable"].setData('OperationProtocol_t', originalValue);
          _this2.$message({
            message: '保存成功',
            type: 'success'
          });
        })["catch"](function (e) {
          _this2.$message({
            message: '保存失败',
            type: 'error'
          });
        });
      },
  
      // 保证担保信息form的取消操作
      operationFormCancel: function operationFormCancel(type) {
        if (type === 'form') {
          this.$refs['operationTable'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['operationTable'].getTableComp().closeExpandRow();
        }
      },
  
      //担保编辑
      operationEditTableRow: function operationEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['operationTable'].getTableComp().expandRow(row);
        this.$refs['operationTable'].formShow = false;
        //operationTable为表单数据对象参数
        this.$refs['operationTable'].setData('OperationProtocol', row);
      },
  
      //担保信息删除提示
      operationDeleteTableRow: function operationDeleteTableRow(scope) {
        this.operationDelVisible = true;
        this.pk_operation_protocol = scope.row.pk_operation_protocol;
      },
  
      //担保信息删除
      operationDeleteClick: function operationDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/deleteById',
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
            _this3.requestOperation();
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: '信息删除失败',
            type: 'error'
          });
        });
        this.operationDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"operationTable\"\n                      tplId=\"operationTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexusKey\"\n                      :tplData=\"operationData\"\n                      :tplResetFun=\"operationResetFun\"\n                      :tplMethods=\"operationTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"operationFormConfirm\"\n                      @form-cancel-click=\"operationFormCancel\"\n                      @edit-table-click=\"operationEditTableRow\"\n                      @delete-table-click=\"operationDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 担保信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"operationDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"operationDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"operationDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Others_cust-baseinfo.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
      data: function data() {
          var oThis = this;
          return {
              funnode: "BT003",
              nexuskey: "others_list",
  
              createType: false,
              custVisible: false,
  
              // 查询模板编码
              searchTemplateCode: 'YLSCXMB_BUSICUST_OTHER',
              sp: '{}',
              customerListData: {},
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "search"
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
          addPersonCustomerInfo: function addPersonCustomerInfo() {
              location.hash = "/cust/Personcustomer/add/" + "Others_cust";
          },
          addCorpCustomerInfo: function addCorpCustomerInfo() {
              location.hash = "/cust/Corpcustomer/add/" + "Others_cust";
          },
  
          //编辑按钮
          tableSearchClick: function tableSearchClick(scope) {
  
              if (scope.row.customer_type === 'CORP') {
                  location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;
              } else if (scope.row.customer_type === 'PERSON') {
                  location.hash = "/cust/Personcustomer/detail/" + scope.row.pk_cust_customer;
              }
          },
          tableDeleteClickRow: function tableDeleteClickRow(scope) {
  
              this.custVisible = true;
              this.delId = scope.row.pk_cust_customer;
          },
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              var _this = this;
  
              // let delId = scope.row.pk_cust_customer;
              this.$http({
                  url: _publicData.ylsBusi + "cust/customer/deleteById",
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
                      _this.custVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.message,
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
          request: function request() {
              var _this2 = this;
  
              var url = void 0;
              var baseUrl = _publicData.ylsBusi;
              url = baseUrl + 'cust/customer/page';
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  'pageNum': this.currentPage - 1,
                  'pageSize': this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'cusotmer_class',
                              'oper': ' like ',
                              'value': '%yls_dev100000000ffx%'
                          }],
                          'qtAggVO': this.sp
                      }
                  }
              };
              this.$http({
                  url: url,
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  data: data,
                  dataType: "json"
              }).then(function (res) {
                  //customer_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
              })["catch"](function (e) {
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
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">客户信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" v-show=\"!createType\" @mouseenter.native=\"createType=true\" >新增</el-button>\n      <div v-show=\"createType\" @mouseleave.self=\"createType=false\">\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addPersonCustomerInfo\">自然人客户</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\"  @click=\"addCorpCustomerInfo\">企业客户</el-button>\n      </div>\n    </div>\n    <div class=\"fr\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n  <!-- 客户列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  \n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClickRow\" >\n    </ifbp-template>\n    <el-dialog\n    title=\"提示\"\n    v-model=\"custVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n    </span>\n   </el-dialog>\n    \n    <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/PersonCustomerDetail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _linkmanpanel = require('yls^busi/customer/src/linkmanpanel.vue');
  
  var _linkmanpanel2 = _interopRequireDefault(_linkmanpanel);
  
  var _Shareholderpanel = require('yls^busi/customer/src/Shareholderpanel.vue');
  
  var _Shareholderpanel2 = _interopRequireDefault(_Shareholderpanel);
  
  var _ContractHandPanel = require('yls^busi/customer/src/ContractHandPanel.vue');
  
  var _ContractHandPanel2 = _interopRequireDefault(_ContractHandPanel);
  
  var _CustUpDownPanel = require('yls^busi/customer/src/CustUpDownPanel.vue');
  
  var _CustUpDownPanel2 = _interopRequireDefault(_CustUpDownPanel);
  
  var _AssetPanel = require('yls^busi/customer/src/AssetPanel.vue');
  
  var _AssetPanel2 = _interopRequireDefault(_AssetPanel);
  
  var _BankAccountPanel = require('yls^busi/customer/src/BankAccountPanel.vue');
  
  var _BankAccountPanel2 = _interopRequireDefault(_BankAccountPanel);
  
  var _QualificationCertPanel = require('yls^busi/customer/src/QualificationCertPanel.vue');
  
  var _QualificationCertPanel2 = _interopRequireDefault(_QualificationCertPanel);
  
  var _EquityInvestPanel = require('yls^busi/customer/src/EquityInvestPanel.vue');
  
  var _EquityInvestPanel2 = _interopRequireDefault(_EquityInvestPanel);
  
  var _ExternalRatingPanel = require('yls^busi/customer/src/ExternalRatingPanel.vue');
  
  var _ExternalRatingPanel2 = _interopRequireDefault(_ExternalRatingPanel);
  
  var _CommRecordPanel = require('yls^busi/customer/src/CommRecordPanel.vue');
  
  var _CommRecordPanel2 = _interopRequireDefault(_CommRecordPanel);
  
  var _RelatedCompanyPanel = require('yls^busi/customer/src/RelatedCompanyPanel.vue');
  
  var _RelatedCompanyPanel2 = _interopRequireDefault(_RelatedCompanyPanel);
  
  var _MemberPanel = require('yls^busi/customer/src/MemberPanel.vue');
  
  var _MemberPanel2 = _interopRequireDefault(_MemberPanel);
  
  var _LitigationSituationPanel = require('yls^busi/customer/src/LitigationSituationPanel.vue');
  
  var _LitigationSituationPanel2 = _interopRequireDefault(_LitigationSituationPanel);
  
  var _TaxesOwedPanel = require('yls^busi/customer/src/TaxesOwedPanel.vue');
  
  var _TaxesOwedPanel2 = _interopRequireDefault(_TaxesOwedPanel);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  //引入信息面板
  exports["default"] = {
    components: {
      'custlinkmanRef': _linkmanpanel2["default"],
      'ShareholderRef': _Shareholderpanel2["default"],
      'ContractHandRef': _ContractHandPanel2["default"],
      'CustUpDownRef': _CustUpDownPanel2["default"],
      'AssetRef': _AssetPanel2["default"],
      'BankAccountRef': _BankAccountPanel2["default"],
      'QualificationCertRef': _QualificationCertPanel2["default"],
      'EquityInvestRef': _EquityInvestPanel2["default"],
      'ExternalRatingRef': _ExternalRatingPanel2["default"],
      'CommRecordRef': _CommRecordPanel2["default"],
      'RelatedCompanyRef': _RelatedCompanyPanel2["default"],
      'MemberRef': _MemberPanel2["default"],
      'LitigationSituationRef': _LitigationSituationPanel2["default"],
      'TaxesOwedRef': _TaxesOwedPanel2["default"]
  
    },
    data: function data() {
  
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      //校验
  
  
      var validatecustomerDetail = function validatecustomerDetail(rule, value, callback) {
  
        //证件号码唯一校验
  
        if (rule.field === "identity_card_numb") {
          debugger;
          if (value === '') {
            callback(new Error('不能为空'));
          } else if (oThis.$root.$router.currentRoute.name !== 'PersonCustomerDetial' && oThis.pk_customer === '') {
            if (oThis.$refs.baseTemplateRef1.comp.$refs["CustPersonRef"].model.identity_card_numb !== '') {
              oThis.validateInput(value);
              debugger;
              if (oThis.isIdCanUse) {
                callback(new Error('该证件号已经存在，请重新输入'));
              } else {
                callback();
              }
            }
          } else {
            callback();
          }
        }
      };
      return {
        hasCustClsVisible: false,
        custPk: '',
        isIdCanUse: false,
        isshow: true,
        reloadVisible: false,
        custfunnode: "BT003",
        custnexuskey: "customer_detial_ui",
        funnode: "BT003",
        nexuskey: "customer_person_ui",
        scrollDom: "ifbpScrollDom",
        pk_customer: "",
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        //自然人客户基本信息修改
        baseIcons: [{
          icon: "edit",
          click: function click() {
            if (!oThis.customerEdit) {
              oThis.customerEdit = true;
              var copyperson = oThis.$refs.baseTemplateRef1.comp.CustPerson;
              oThis.copyForPerson = JSON.parse(JSON.stringify(copyperson));
              var copycust = oThis.$refs.baseTemplateRef.comp.customer;
              oThis.copyForCust = JSON.parse(JSON.stringify(copycust));
            } else {
              oThis.customerCancel();
            }
          }
        }],
  
        customerDetail: {
          customer: {}
  
        },
  
        customerDataDetail: {
          customer: {},
          rules: {
            identity_card_numb: [{ validator: validatecustomerDetail, trigger: "blur" }]
  
          }
        },
        customerEdit: false,
        custResetFun: function custResetFun($node) {
          var $refNode = $node.find("el-select[v-model='customer.customer_style']");
          $refNode.parent().css("display", 'none');
  
          //获取客户分类节点
          var $refCustCls = $node.find("el-ref[v-model='customer.cusotmer_class']");
          debugger;
          if (this.$root.$router.currentRoute.params.cust_type !== undefined && this.$root.$router.currentRoute.params.cust_type === 'Lessee') {
            $refCustCls.attr("disabled", false);
            var refParams = { 'cust_type': 'Lessee' };
            oThis.$refs.baseTemplateRef.setData("cust_cls", refParams);
            $refCustCls.attr("v-on:trigger", "setCustCls");
          }
        },
        personResetFun: function personResetFun($node) {
          //单位所属行业分类级联参照
          var $refNode1 = this.getNodeById($node, 'gw1uxdkl5d');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
  
          //地区级联参照
          var $refNode2 = this.getNodeById($node, 'drut16v1bgf');
          var $refNode3 = this.getNodeById($node, 'qgipxenj48');
  
          if ($refNode2.length) {
            $refNode2.attr("v-on:trigger", "handleRefChange2");
          }
          if ($refNode3.length) {
            $refNode3.attr("v-on:trigger", "handleRefChange3");
          }
  
          //客户行业分类级联参照
          var $refNode4 = this.getNodeById($node, 'dp0mur4m8je');
          var $refNode5 = this.getNodeById($node, 'l1amy3rlzxp');
          var $refNode6 = this.getNodeById($node, 'bnqeyxqi98h');
  
          if ($refNode4.length) {
            $refNode4.attr("v-on:trigger", "handleRefChange4");
          }
          if ($refNode5.length) {
            $refNode5.attr("v-on:trigger", "handleRefChange5");
          }
          if ($refNode6.length) {
            $refNode6.attr("v-on:trigger", "handleRefChange6");
          }
        },
        cust_Methods: {
          setCustCls: function setCustCls(type, data) {
            oThis.pk_temp = oThis.$refs['baseTemplateRef'].comp.customer.cusotmer_class;
            if (oThis.pk_temp === 'yls_dev100000000ffn') {
              oThis.cust_type = 'Lessee';
            } else if (oThis.pk_temp === 'yls_dev100000000ffr') {
              oThis.cust_type = 'Guarantee';
            } else if (oThis.pk_temp === 'yls_dev100000000ffo') {
              oThis.cust_type = 'FinancingUnit';
            } else if (oThis.pk_temp === 'yls_dev100000000ffp') {
              oThis.cust_type = 'Agency';
            } else if (oThis.pk_temp === 'yls_dev100000000ffq') {
              oThis.cust_type = 'RelatedParty';
            } else if (oThis.pk_temp === 'yls_dev100000000ffs') {
              oThis.cust_type = 'Supplier';
            } else if (oThis.pk_temp === 'yls_dev100000000ffu') {
              oThis.cust_type = 'GroupCust';
            } else if (oThis.pk_temp === 'yls_dev100000000ffw') {
              oThis.cust_type = 'RentalUnit';
            }
          }
  
        },
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.belong_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange2: function handleRefChange2(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.city_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange3: function handleRefChange3(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.town_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange4: function handleRefChange4(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.cust_h_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange5: function handleRefChange5(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.cust_m_ref.changeQueryParams(innerCode);
            }
          },
          handleRefChange6: function handleRefChange6(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              oThis.$refs.baseTemplateRef1.comp.$refs.cust_s_ref.changeQueryParams(innerCode);
            }
          }
        },
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
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.custlinkmanRef.$refs.custlinkmanRef.comp.formShow = true;
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
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ShareholderRef.$refs.ShareholderRef.comp.formShow = true;
          }
        }],
        ContractHandIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "不可操作！",
                type: "error"
              });
              return;
            }
            // oThis.$refs.ContractHandRef.$refs.ContractHandRef.getTableComp().closeExpandRow();
            // // 重置新增数据
            // oThis.$refs.ContractHandRef.$refs.ContractHandRef.resetFormData();
            // // 显示新增区域
            // oThis.$refs.ContractHandRef.$refs.ContractHandRef.comp.formShow = true;
          }
        }],
        CustUpDownIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.resetFormData();
            // 显示新增区域
            oThis.$refs.CustUpDownRef.$refs.CustUpDownRef.comp.formShow = true;
          }
        }],
        AssetIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.AssetRef.$refs.AssetRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.AssetRef.$refs.AssetRef.resetFormData();
            // 显示新增区域
            oThis.$refs.AssetRef.$refs.AssetRef.comp.formShow = true;
          }
        }],
        BankAccountIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.BankAccountRef.$refs.BankAccountRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.BankAccountRef.$refs.BankAccountRef.resetFormData();
            // 显示新增区域
            oThis.$refs.BankAccountRef.$refs.BankAccountRef.comp.formShow = true;
          }
        }],
        QualificationCertIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.resetFormData();
            // 显示新增区域
            oThis.$refs.QualificationCertRef.$refs.QualificationCertRef.comp.formShow = true;
          }
        }],
        EquityInvestIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.resetFormData();
            // 显示新增区域
            oThis.$refs.EquityInvestRef.$refs.EquityInvestRef.comp.formShow = true;
          }
        }],
        ExternalRatingIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.resetFormData();
            // 显示新增区域
            oThis.$refs.ExternalRatingRef.$refs.ExternalRatingRef.comp.formShow = true;
          }
        }],
        CommRecordIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            oThis.$refs.CommRecordRef.$refs.CommRecordRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.CommRecordRef.$refs.CommRecordRef.resetFormData();
            // 显示新增区域
            oThis.$refs.CommRecordRef.$refs.CommRecordRef.comp.formShow = true;
          }
        }],
        RelatedCompanyIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.resetFormData();
            // 显示新增区域
            oThis.$refs.RelatedCompanyRef.$refs.RelatedCompanyRef.comp.formShow = true;
          }
        }],
        MemberIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.MemberRef.$refs.MemberRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.MemberRef.$refs.MemberRef.resetFormData();
            // 显示新增区域
            oThis.$refs.MemberRef.$refs.MemberRef.comp.formShow = true;
          }
        }],
        LitigationSituationIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.resetFormData();
            // 显示新增区域
            oThis.$refs.LitigationSituationRef.$refs.LitigationSituationRef.comp.formShow = true;
          }
        }],
        TaxesOwedIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
  
            oThis.$refs.TaxesOwedRef.$refs.TaxesOwedRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.TaxesOwedRef.$refs.TaxesOwedRef.resetFormData();
            // 显示新增区域
            oThis.$refs.TaxesOwedRef.$refs.TaxesOwedRef.comp.formShow = true;
          }
        }]
  
      };
    },
  
    //获取数据数据初始化操作
    created: function created() {
      this.cust_type = this.$root.$router.currentRoute.params.cust_type;
  
      if (this.cust_type === 'Lessee') {
        //承租人
        this.pk_temp = 'yls_dev100000000ffn';
      }
      if (this.cust_type === 'Guarantee') {
        //担保人
        this.pk_temp = 'yls_dev100000000ffr';
      }
      if (this.cust_type === 'FinancingUnit') {
        //融资单位
        this.pk_temp = 'yls_dev100000000ffo';
      }
      if (this.cust_type === 'Agency') {
        //中介机构
        this.pk_temp = 'yls_dev100000000ffp';
      }
      if (this.cust_type === 'RelatedParty') {
        //客户关联方
        this.pk_temp = 'yls_dev100000000ffq';
      }
      if (this.cust_type === 'Supplier') {
        //供应商
        this.pk_temp = 'yls_dev100000000ffs';
      }
      if (this.cust_type === 'GroupCust') {
        //集团客户
        this.pk_temp = 'yls_dev100000000ffu';
      }
      if (this.cust_type === 'RentalUnit') {
        //出租单位
        this.pk_temp = 'yls_dev100000000ffw';
      }
    },
  
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      validateInput: function validateInput(identity_no) {
        var _this = this;
  
        var data = { 'identity_no': identity_no };
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/validateInput",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: identity_no
        }).then(function (res) {
          debugger;
          if (res.data.data !== null) {
            debugger;
            if (res.data.data.customer_type === 'PERSON') {
              _this.custPk = res.data.data.pk_cust_customer;
              _this.reloadVisible = true;
              _this.isIdCanUse = true;
            } else {
              _this.isIdCanUse = false;
            }
          } else {
            debugger;
            _this.isIdCanUse = false;
          }
        })["catch"](function (e) {
          console.error(e);
        });
      },
      setRefParam: function setRefParam() {
        //设置客户类型默认值
        this.$refs.baseTemplateRef.comp.$refs["formRef"].model.customer_type = 'PERSON';
      },
      reloadPersonClick: function reloadPersonClick() {
        if (this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class === '' || this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class === undefined) {
          this.hasCustClsVisible = true;
        } else {
          //this.cust_type=this.$refs.baseTemplateRef.comp.$refs["formRef"].model.cusotmer_class
          this.reloadPersonDetail();
        }
      },
  
      //信息存在，载入已有信息界面
      reloadPersonDetail: function reloadPersonDetail() {
  
        var urlInfo = this.custPk + this.cust_type;
        location.hash = "/cust/Personcustomer/detail/" + urlInfo;
        window.location.reload();
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
  
        var urlParam = this.$root.$router.currentRoute.params.id;
        //请求企业客户基本信息详情
        if (urlParam === undefined) {
          this.pk_customer = "";
          this.customerEdit = true;
          return;
        }
  
        if (urlParam.length == 19) {
          this.pk_customer = urlParam;
        } else {
          this.pk_customer = urlParam.substring(0, 19);
          this.cust_type = urlParam.substring(19);
        }
  
        var method = this.$root.$router.currentRoute.name;
  
        // 查看和修改情况
        if (method === "PersonCustomerDetial") {
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
          }
        }
      },
  
      //请求自然人客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/customer/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
  
          var originalValue = res.data.data;
          var c_class = originalValue.cusotmer_class;
          if (_this2.cust_type !== undefined) {
            var c_class_pk = '';
            if (_this2.cust_type === 'Lessee') {
              //承租人
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffn'] = {
                "code": "1",
                "name": "承租客户",
                "id": "yls_dev100000000ffn"
              };
              c_class_pk = 'yls_dev100000000ffn';
            }
            if (_this2.cust_type === 'Guarantee') {
              //担保人
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffr'] = {
                "code": "5",
                "name": "担保客户",
                "id": "yls_dev100000000ffr"
              };
              c_class_pk = 'yls_dev100000000ffr';
            }
  
            if (_this2.cust_type === 'FinancingUnit') {
              //融资单位
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffo'] = {
                "code": "2",
                "name": "融资单位",
                "id": "yls_dev100000000ffo"
              };
              c_class_pk = 'yls_dev100000000ffo';
            }
            if (_this2.cust_type === 'Agency') {
              //中介机构
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffp'] = {
                "code": "3",
                "name": "中介机构",
                "id": "yls_dev100000000ffp"
              };
              c_class_pk = 'yls_dev100000000ffp';
            }if (_this2.cust_type === 'RelatedParty') {
              //客户关联方
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffq'] = {
                "code": "4",
                "name": "客户关联方",
                "id": "yls_dev100000000ffq"
              };
              c_class_pk = 'yls_dev100000000ffq';
            }if (_this2.cust_type === 'Supplier') {
              //供应商
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffs'] = {
                "code": "6",
                "name": "供应商",
                "id": "yls_dev100000000ffs"
              };
              c_class_pk = 'yls_dev100000000ffs';
            }
            if (_this2.cust_type === 'GroupCust') {
              //集团客户
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffu'] = {
                "code": "6",
                "name": "集团客户",
                "id": "yls_dev100000000ffu"
              };
              c_class_pk = 'yls_dev100000000ffu';
            }
            if (_this2.cust_type === 'RentalUnit') {
              //出租单位
              originalValue.beanMap.cusotmer_class_ref['yls_dev100000000ffw'] = {
                "code": "10",
                "name": "出租单位",
                "id": "yls_dev100000000ffw"
              };
              c_class_pk = 'yls_dev100000000ffw';
            }
            debugger;
            if (!(c_class.indexOf(c_class_pk) > 0)) {
              c_class += ',' + c_class_pk;
              originalValue.cusotmer_class = c_class;
              // this.$set(formData, "cusotmer_class", c_class);
              debugger;
              // this.$refs.baseTemplateRef.getFormData().cusotmer_class = c_class;
            }
          }
          _this2.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
  
          _this2.$refs.baseTemplateRef1.setData("CustPerson", JSON.parse(JSON.stringify(originalValue.cust_persion_list[0])));
        })["catch"](function (e) {
          console.error(e);
          _this2.$message({
            message: "自然人客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.customerEdit = false;
  
        this.$refs.baseTemplateRef.setData('customer', this.copyForCust);
        this.$refs.baseTemplateRef1.setData('CustPerson', this.copyForPerson);
        // 重置value
      },
  
      //自然人客户基本信息保存
      customerConfirm: function customerConfirm() {
        var _this3 = this;
  
        var data = this.$refs.baseTemplateRef.comp.customer;
        if (this.pk_customer === '') {
          data.cusotmer_class = this.pk_temp;
          data.customer_type = 'PERSON';
        }
  
        var data1 = this.$refs.baseTemplateRef1.comp.CustPerson;
        debugger;
        var a = [data1];
        data.cust_persion_list = a;
        console.log(data);
  
        //表单formRef  表格tableRef
        this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(function (valid) {
          if (valid) {
            _this3.$refs.baseTemplateRef1.comp.$refs["CustPersonRef"].validate(function (valid) {
              if (valid) {
                _this3.$http({
                  url: _publicData.ylsBusi + "cust/customer/updateORinsert",
                  headers: { "Content-Type": "application/json" },
                  method: "post",
                  data: JSON.parse(JSON.stringify(data))
                }).then(function (res) {
                  if (res.data.success === true) {
                    _this3.$message({
                      message: "保存成功",
                      type: "success"
                    });
  
                    _this3.originalValue = res.data.data;
  
                    _this3.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this3.originalValue)));
  
                    _this3.pk_customer = _this3.originalValue.pk_cust_customer;
                    _this3.customerEdit = false;
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">自然人客户管理</h2>\n  </div>\n  <!-- 主体区域(详情页结构) -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <!--自然人客户基本信息模块界面-->\n      <ifbp-panel id=\"basePanel\" title=\"自然人客户基本信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"custfunnode\"\n                  :nexuskey=\"custnexuskey\"\n                  show-type=\"form\"\n                  :methods=\"cust_Methods\"\n                  @after-create=\"setRefParam\"\n                  :tplData=\"customerDetail\"\n                  :tplResetFun=\"custResetFun\"\n                  :editable=\"customerEdit\">\n        </ifbp-template>\n          <ifbp-template ref=\"baseTemplateRef1\"\n                  tplId=\"baseTemplate1\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  show-type=\"form\"\n                  :methods=\"t_Methods\"\n                  :tplResetFun=\"personResetFun\"\n                  :tplData=\"customerDataDetail\"\n                  :editable=\"customerEdit\">\n         </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"customerEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--联系人模块界面-->\n       <ifbp-panel id=\"linkmanPanel\"  :show-body=\"false\"  title=\"联系人信息\" :icons=\"linkmanIcons\">\n        <custlinkmanRef\n          ref=\"custlinkmanRef\"\n          :pk_customer=\"pk_customer\"\n          type=\"person\">\n        </custlinkmanRef>\n      </ifbp-panel> \n      \n   \n      \n      <!--自然人客户资产信息模块-->\n      <ifbp-panel id=\"AssetPanel\"  v-if=\"isshow\" :show-body=\"false\"  title=\"自然人客户资产信息\" :icons=\"AssetIcons\">\n        <AssetRef\n          ref=\"AssetRef\"\n          :pk_customer=\"pk_customer\">\n        </AssetRef>\n      </ifbp-panel>-->\n      <!--银行账户信息模块-->\n      <ifbp-panel id=\"BankAccountPanel\"  :show-body=\"false\"   title=\"银行账户信息\" :icons=\"BankAccountIcons\">\n        <BankAccountRef\n          ref=\"BankAccountRef\"\n          :pk_customer=\"pk_customer\">\n        </BankAccountRef>\n      </ifbp-panel>\n       <!--外部评级信息模块-->\n       <ifbp-panel id=\"ExternalRatingPanel\"  v-if=\"isshow\" :show-body=\"false\"  title=\"外部评级信息\" :icons=\"ExternalRatingIcons\">\n        <ExternalRatingRef\n          ref=\"ExternalRatingRef\"\n          :pk_customer=\"pk_customer\">\n        </ExternalRatingRef>\n      </ifbp-panel> -->\n      \n     \n    </ifbp-panel-group>\n  </div>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"reloadVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>该信息已存在，是否调用？</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"reloadVisible = false, custPk=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"reloadPersonClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n  <el-dialog\n    title=\"提示\"\n    v-model=\"hasCustClsVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>请先维护客户分类！</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"reloadVisible=false,hasCustClsVisible = false, pk_customer=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"hasCustClsVisible=false,pk_customer='',reloadVisible=false\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/QualificationCertPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "QualificationCert",
        QualificationCertDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 资质认证信息新增
        QualificationCertIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.QualificationCertRef.comp;
            var table = uitemplateComp.$refs["QualificationCert_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        QualificationCertPk: "af888fa3-e3ef-4801-9b24-ffcd64950923", //custaxes
        QualificationCertData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        QualificationCertResetFun: function QualificationCertResetFun($node) {
          var $table = $node.find('el-table');
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
        QualificationCertTplMethods: {
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
        this.requestQualificationCert();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestQualificationCert();
        }
      },
  
      //请求资质认证信息
      requestQualificationCert: function requestQualificationCert() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/QualificationCert/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
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
          _this.$refs["QualificationCertRef"].setData("QualificationCert_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "资质认证信息获取失败",
            type: "error"
          });
        });
      },
  
      //资质认证情况保存
      QualificationCertFormConfirm: function QualificationCertFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.QualificationCertRef.comp.QualificationCert;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验de
  
        this.$refs.QualificationCertRef.comp.$refs["QualificationCert_t"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/QualificationCert/updateORinsert",
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
                var linarraydata = _this2.$refs.QualificationCertRef.getData("QualificationCert_t");
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
                _this2.$refs.QualificationCertRef.setData("QualificationCert_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["QualificationCertRef"].comp.formShow = false;
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
      // 资质认证信息form的取消操作
      QualificationCertFormCancel: function QualificationCertFormCancel(type) {
        if (type === "form") {
          this.$refs["QualificationCertRef"].comp.formShow = false;
        } else {
          this.$refs["QualificationCertRef"].getTableComp().closeExpandRow();
          var QualificationCertTable = this.$refs.QualificationCertRef.getData('QualificationCert_t');
          QualificationCertTable[this.baseEditIndex] = this.baseData;
          this.$refs.QualificationCertRef.setData('QualificationCert_t', QualificationCertTable);
        }
      },
      //资质认证编辑
      QualificationCertEditTableRow: function QualificationCertEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["QualificationCertRef"].getTableComp().expandRow(row);
        // this.$refs["QualificationCertRef"].formShow = false;
        // //QualificationCertRef为表单数据对象参数
        // this.$refs["QualificationCertRef"].setData("QualificationCert", row);
        this.$refs.QualificationCertRef.getTableComp().expandRow(scope.row);
        this.$refs.QualificationCertRef.comp.formShow = false;
        this.$refs.QualificationCertRef.setData('QualificationCert', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //资质认证信息删除提示
      QualificationCertDeleteTableRow: function QualificationCertDeleteTableRow(scope) {
        this.QualificationCertDelVisible = true;
        this.delId = scope.row.pk_cust_qualification_cert;
      },
      //资质认证信息删除
      QualificationCertDeleteClick: function QualificationCertDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/QualificationCert/deleteById",
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
            _this3.requestQualificationCert();
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
        this.QualificationCertDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"QualificationCertRef\"\n                      tplId=\"QualificationCertTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"QualificationCertData\"\n                      :tplResetFun=\"QualificationCertResetFun\"\n                      :tplMethods=\"QualificationCertTplMethods\"\n                      @form-confirm-click=\"QualificationCertFormConfirm\"\n                      @form-cancel-click=\"QualificationCertFormCancel\"\n                      @edit-table-click=\"QualificationCertEditTableRow\"\n                      @delete-table-click=\"QualificationCertDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 资质认证信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"QualificationCertDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"QualificationCertDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"QualificationCertDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/RelatedCompanyPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "RelatedCompany",
        RelatedCompanyDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 客户来源信息新增
        RelatedCompanyIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.RelatedCompanyRef.comp;
            var table = uitemplateComp.$refs["RelatedCompany_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        RelatedCompanyPk: "e06ff927-e356-437b-b9c8-a7974f2859b2", //custaxes
        RelatedCompanyData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        RelatedCompanyResetFun: function RelatedCompanyResetFun($node) {
          var $refNode = this.getNodeById($node, 'ork10hzfxh');
  
          if ($refNode.length) {
            $refNode.attr("v-on:trigger", "handleRefChange");
          }
  
          var $table = $node.find('el-table');
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
        t_Methods: {
          handleRefChange: function handleRefChange(type, data) {
  
            if (type === 'change') {
  
              var innerCode = data.value[0].refcode;
              this.$refs['RelatedCompany_ref'].model.intermediary_type = data.value[0].customer_type;
              this.$refs['RelatedCompany_ref'].model.intermediarycode = data.value[0].code;
            }
          }
        },
        RelatedCompanyTplMethods: {
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
        this.requestRelatedCompany();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestRelatedCompany();
        }
      },
  
      //请求客户来源信息
      requestRelatedCompany: function requestRelatedCompany() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/RelatedCompany/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer,
              message_owner: ownerId
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
          _this.$refs["RelatedCompanyRef"].setData("RelatedCompany_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "客户来源信息获取失败",
            type: "error"
          });
        });
      },
  
      //客户来源情况保存
      RelatedCompanyFormConfirm: function RelatedCompanyFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.RelatedCompanyRef.comp.RelatedCompany;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.RelatedCompanyRef.comp.$refs["RelatedCompany_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/RelatedCompany/updateORinsert",
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
                var linarraydata = _this2.$refs.RelatedCompanyRef.getData("RelatedCompany_t");
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
                _this2.$refs.RelatedCompanyRef.setData("RelatedCompany_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["RelatedCompanyRef"].comp.formShow = false;
                //this.requestRelatedCompany();
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
      // 客户来源信息form的取消操作
      RelatedCompanyFormCancel: function RelatedCompanyFormCancel(type) {
  
        //this.$refs.RelatedCompanyRef.getTableComp().closeExpandRow();
  
  
        if (type === "form") {
          this.$refs["RelatedCompanyRef"].comp.formShow = false;
        } else {
          this.$refs["RelatedCompanyRef"].getTableComp().closeExpandRow();
          var RelatedCompanyTable = this.$refs.RelatedCompanyRef.getData('RelatedCompany_t');
          RelatedCompanyTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.RelatedCompanyRef.setData('RelatedCompany_t', RelatedCompanyTable);
        }
      },
      //客户来源编辑
      RelatedCompanyEditTableRow: function RelatedCompanyEditTableRow(scope) {
        //记录位置
        this.rmoveindex = scope.$index;
        // //行下展开表单界面
        var row = scope.row;
        // this.$refs["RelatedCompanyRef"].getTableComp().expandRow(row);
        // this.$refs["RelatedCompanyRef"].formShow = false;
        // //RelatedCompanyRef为表单数据对象参数
        // this.$refs["RelatedCompanyRef"].setData("RelatedCompany", row);
  
        this.$refs.RelatedCompanyRef.getTableComp().expandRow(scope.row);
        this.$refs.RelatedCompanyRef.comp.formShow = false;
        this.$refs.RelatedCompanyRef.setData('RelatedCompany', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //客户来源信息删除提示
      RelatedCompanyDeleteTableRow: function RelatedCompanyDeleteTableRow(scope) {
        this.RelatedCompanyDelVisible = true;
        this.delId = scope.row.pk_cust_related_company;
      },
      //客户来源信息删除
      RelatedCompanyDeleteClick: function RelatedCompanyDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/RelatedCompany/deleteById",
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
            _this3.requestRelatedCompany();
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
        this.RelatedCompanyDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"RelatedCompanyRef\"\n                      tplId=\"RelatedCompanyTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"RelatedCompanyData\"\n                      :tplResetFun=\"RelatedCompanyResetFun\"\n                      :tplMethods=\"RelatedCompanyTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"RelatedCompanyFormConfirm\"\n                      @form-cancel-click=\"RelatedCompanyFormCancel\"\n                      @edit-table-click=\"RelatedCompanyEditTableRow\"\n                      @delete-table-click=\"RelatedCompanyDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 客户来源信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"RelatedCompanyDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"RelatedCompanyDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"RelatedCompanyDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/Shareholderpanel.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')],
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "Shareholder_UI",
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
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
        ShareholderPk: "4206377c-53b0-497d-a5b6-c6f98fa6631d", //custaxes
        ShareholderData: {
          isEdit: false
        },
        ShareholderResetFun: function ShareholderResetFun($node) {
          var $table = $node.find('el-table');
  
          //股东参照联动
          var $refNode1 = this.getNodeById($node, 'linx947hht9');
  
          if ($refNode1.length) {
            $refNode1.attr("v-on:trigger", "handleRefChange1");
          }
  
          var $refNodeIdType = $node.find("el-select[v-model='Shareholder.identity_type']"); //获取证件类型节点
          $refNodeIdType.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
          var $refNodeIdNo = $node.find("el-input[v-model='Shareholder.identity_num']"); //获取证件号节点
          $refNodeIdNo.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
          var $refNodeCustType = $node.find("el-select[v-model='Shareholder.share_type']"); //获取证件号节点
          $refNodeCustType.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
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
        t_Methods: {
          handleRefChange1: function handleRefChange1(type, data) {
  
            if (type === 'change') {
  
              this.$refs['Shareholder_ref'].model.share_type = data.value[0].customer_type;
              this.$refs['Shareholder_ref'].model.identity_type = data.value[0].identity_type;
              this.$refs['Shareholder_ref'].model.identity_num = data.value[0].identity_no;
              oThis.$refs["ShareholderRef"].setData("isEdit", true);
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
  
    //监听引用传参后实时变动
    computed: {
      currentpk_customer: function currentpk_customer() {
        return this.pk_customer;
      }
    },
    //监听参数变动后方法
    watch: {
      pk_customer: function pk_customer(val) {
        this.requestShareholder();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
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
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/shareholder/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          'pageNum': this.currentPage - 1,
          'pageSize': this.pageSize,
          "searchParams": {
            "searchMap": {
              'custCondList': [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
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
          _this.$refs["ShareholderRef"].setData("Shareholder_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "股东信息获取失败",
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
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.ShareholderRef.comp.$refs["Shareholder_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/shareholder/updateORinsert",
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
          var ShareholderTable = this.$refs.ShareholderRef.getData('Shareholder_t');
          ShareholderTable[this.baseEditIndex] = this.baseData;
          this.$refs.ShareholderRef.setData('Shareholder_t', ShareholderTable);
        }
      },
      //股东编辑
      ShareholderEditTableRow: function ShareholderEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        // let row = scope.row;
        // this.$refs["ShareholderRef"].getTableComp().expandRow(row);
        // this.$refs["ShareholderRef"].formShow = false;
        // //ShareholderRef为表单数据对象参数
        // this.$refs["ShareholderRef"].setData("Shareholder", row);
  
        this.$refs.ShareholderRef.getTableComp().expandRow(scope.row);
        this.$refs.ShareholderRef.comp.formShow = false;
        this.$refs.ShareholderRef.setData('Shareholder', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"ShareholderRef\"\n                      tplId=\"ShareholderTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"ShareholderData\"\n                      :tplResetFun=\"ShareholderResetFun\"\n                      :tplMethods=\"ShareholderTplMethods\"\n                      :methods=\"t_Methods\"\n                      @form-confirm-click=\"ShareholderFormConfirm\"\n                      @form-cancel-click=\"ShareholderFormCancel\"\n                      @edit-table-click=\"ShareholderEditTableRow\"\n                      @delete-table-click=\"ShareholderDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 股东信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"ShareholderDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"ShareholderDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"ShareholderDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/TaxesOwedPanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["pk_customer"],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        funnode: "BT003",
        nexuskey: "TaxesOwed",
        TaxesOwedDelVisible: false,
        rmoveindex: "",
        delId: "",
        // 欠税记录来源信息新增
        TaxesOwedIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.TaxesOwedRef.comp;
            var table = uitemplateComp.$refs["TaxesOwed_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }],
        TaxesOwedPk: "6e334f71-37f5-47c4-981f-e4689bdd80a0", //custaxes
        TaxesOwedData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        TaxesOwedResetFun: function TaxesOwedResetFun($node) {
          var $table = $node.find('el-table');
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
        TaxesOwedTplMethods: {
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
        this.requestTaxesOwed();
      }
    },
    //页面操作
    mounted: function mounted() {
  
      this.request();
    },
  
    methods: {
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        if (this.pk_customer != "") {
          this.requestTaxesOwed();
        }
      },
  
      //请求欠税记录来源信息
      requestTaxesOwed: function requestTaxesOwed() {
        var _this = this;
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
  
        url = _publicData.ylsBusi + "cust/TaxesOwed/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer,
              message_owner: ownerId
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
          _this.$refs["TaxesOwedRef"].setData("TaxesOwed_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "欠税信息获取失败",
            type: "error"
          });
        });
      },
  
      //欠税记录来源情况保存
      TaxesOwedFormConfirm: function TaxesOwedFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.TaxesOwedRef.comp.TaxesOwed;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
        this.$refs.TaxesOwedRef.comp.$refs["TaxesOwed_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/TaxesOwed/updateORinsert",
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
                var linarraydata = _this2.$refs.TaxesOwedRef.getData("TaxesOwed_t");
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
                _this2.$refs.TaxesOwedRef.setData("TaxesOwed_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this2.$refs["TaxesOwedRef"].comp.formShow = false;
                //this.requestTaxesOwed();
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
      // 欠税记录来源信息form的取消操作
      TaxesOwedFormCancel: function TaxesOwedFormCancel(type) {
  
        this.$refs.TaxesOwedRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.TaxesOwedRef.formShow = false;
        } else {
  
          this.$refs.TaxesOwedRef.getTableComp().closeExpandRow();
          var TaxesOwedTable = this.$refs.TaxesOwedRef.getData('TaxesOwed_t');
          TaxesOwedTable[this.baseEditIndex] = this.baseData;
          this.$refs.TaxesOwedRef.setData('TaxesOwed_t', TaxesOwedTable);
        }
      },
      //欠税记录来源编辑
      TaxesOwedEditTableRow: function TaxesOwedEditTableRow(scope) {
        //记录位置
  
        this.rmoveindex = scope.$index;
  
        this.$refs.TaxesOwedRef.getTableComp().expandRow(scope.row);
        this.$refs.TaxesOwedRef.comp.formShow = false;
        this.$refs.TaxesOwedRef.setData('TaxesOwed', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //欠税记录来源信息删除提示
      TaxesOwedDeleteTableRow: function TaxesOwedDeleteTableRow(scope) {
        this.TaxesOwedDelVisible = true;
        this.delId = scope.row.pk_cust_taxes_owed;
      },
      //欠税记录来源信息删除
      TaxesOwedDeleteClick: function TaxesOwedDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/TaxesOwed/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
          ;
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功",
              type: "success"
            });
            _this3.requestTaxesOwed();
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
        this.TaxesOwedDelVisible = false;
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
  __vue__options__.template = "\n<div>\n        <ifbp-template ref=\"TaxesOwedRef\"\n                      tplId=\"TaxesOwedTemplate\"\n                      :funnode=\"funnode\"\n                      :nexuskey=\"nexuskey\"\n                      :tplData=\"TaxesOwedData\"\n                      :tplResetFun=\"TaxesOwedResetFun\"\n                      :tplMethods=\"TaxesOwedTplMethods\"\n                      @form-confirm-click=\"TaxesOwedFormConfirm\"\n                      @form-cancel-click=\"TaxesOwedFormCancel\"\n                      @edit-table-click=\"TaxesOwedEditTableRow\"\n                      @delete-table-click=\"TaxesOwedDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n  <!-- 欠税记录来源信息 删除提示框 -->\n  <el-dialog\n    title=\"提示\"\n    v-model=\"TaxesOwedDelVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"TaxesOwedDelVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"TaxesOwedDeleteClick\">确 定</el-button>\n    </span>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/creditApply_list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      data: function data() {
          return {
              //模版主键
              pk_temp: '54bf78a0-6e0a-44d2-aeb8-f0c23c1c2a06',
              currentPage: 1,
              pageSize: [10, 20, 30, 40],
              size: 20,
              totalSize: 0,
              creditapplyListData: {},
              delDialogVisible: false,
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = this.getNodeById($node, 'sgoj12dnalh');
                  //定义操作
                  var operateArr = [{
                      icon: 'edit',
                      title: "查看"
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
          this.request(this.currentPage - 1, this.size);
      },
  
      methods: {
          handleSizeChange: function handleSizeChange(sizeVal) {
              this.size = window.pageSize = sizeVal;
              var maxPage = Math.ceil(this.totalSize / sizeVal);
              if (maxPage >= this.currentPage) {
                  this.request(this.currentPage - 1, this.size);
              }
          },
          handleCurrentChange: function handleCurrentChange(currVal) {
              this.currentPage = currVal;
              this.request(this.currentPage - 1, this.size);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = '/agentbaseadd/' + scope.row.agent_name;
          },
  
          // 申请授信按钮
          creditApply: function creditApply() {
              location.hash = '/operation/add';
          },
  
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delDialogVisible = true;
              this.pk_operation_protocol = scope.row.pk_operation_protocol;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              debugger;
              this.$http({
                  url: _publicData.ylsBusi + 'cust/operation/deleteById',
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  dataType: "json",
                  data: this.pk_operation_protocol
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
                      message: "删除失败",
                      type: "error"
                  });
              });
          },
          request: function request(n, s) {
              var _this2 = this;
  
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
                  url: _publicData.ylsBusi + 'cust/operation/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  //QuoteCalculator_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs['creditapplyList-table'].setData('OperationProtocol_t', originalValue);
                  _this2.totalSize = res.data.data.totalElements; // 总条数
                  _this2.size = res.data.data.size; // 每页的条数
              })["catch"](function (e) {
                  console.log(e);
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">代理商授信信息表</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"creditapply-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button>\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"creditApply\">申请授信</el-button>\n    </div>\n\n    <div class=\"fr\">\n      <el-input placeholder=\"输入代理商名称即可搜索\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!-- 报价列表 -->\n <div id=\"creditapplyList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"creditapplyList-table\"\n                  tplId=\"creditapplyList-template\"\n                  :pkTemp=\"pk_temp\"\n                  :tplData=\"creditapplyListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @edit-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalSize\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n\n    <!-- 删除确认Dialog -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/cust_report.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)("request")],
    data: function data() {
      return {
        funnode: "BT003",
        nexusKey: "cust_report",
        quoteListData: {},
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
          // let $table = this.getNodeById($node, 'mp8586otvv');
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
      this.request();
    },
  
    methods: {
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
  
      // 添加按钮
      addInterrateInfo: function addInterrateInfo() {
        location.hash = "/custReport/add";
      },
  
      //快捷搜索
      searchInputEnterClick: function searchInputEnterClick() {
        this.$message("搜索：" + this.search_input);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/custReport/detail/" + scope.row.pk_cust_report;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_cust_report;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + "cust/report/deleteById",
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
  
      //后台请求
      request: function request() {
        var _this2 = this;
  
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: {}
          }
        };
        this.$http({
          url: _publicData.ylsBusi + "/cust/report/page",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          //custReport_t UI模板表格名称
          var originalValue = res.data.data.content;
          _this2.$refs["cust-report-table"].setData("custReport_t", originalValue);
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">财报导入</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请输入。。。\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">   \n  </div>\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"cust-report-table\"\n                  tplId=\"quoteList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  :tplData=\"quoteListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/cust_report_detail.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)("loadcustreportkpi")],
    data: function data() {
      var oThis = this;
      var file = "";
      return {
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //主键
        pk_cust_report: "",
        //当前实体
        custreport: "",
        //删除对话框是否展示
        delDialogVisible: false,
        //上传路径
        action: _publicData.ylsBusi + "cust/report/financeImprot",
        uploadType: {
          custreport: ""
        },
        //删除标识，区分子表
        delType: "",
        //删除实体主键
        delId: "",
        funnode: "BT003",
        kpi_funnode: "BT003",
        nexusKey: "cust_report",
        kpi_nexusKey: "cust_kpi",
        tplData: {},
        //是否编辑态
        editable: false,
        calcBtnshow: true,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
            oThis.calcBtnshow = !oThis.calcBtnshow;
          }
        }],
        //控件绑定事件
        formResetFun: function formResetFun($node) {},
  
        //控件绑定事件实现
        formReSetMethods: {},
        kpi_formReSetMethods: {}
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
      clickCancel: function clickCancel() {
        this.editable = false;
        //恢复修改前值
        this.$refs["baseTemplateRef"].setData("custReport_t", this.data);
      },
      clickSave: function clickSave() {
        var data = this.$refs.baseTemplateRef.comp.custReport;
        this.custreport = JSON.stringify(data);
        this.uploadType.custreport = this.custreport;
        if (this.$refs.baseTemplateRef.comp.$refs["formRef"].model.report_name === "") {
          this.$message.error("请选择导入文件！");
        } else {
          this.$refs.upload.submit();
        }
        this.$refs.upload.submit();
      },
      uploaded: function uploaded(re) {
        if (re.success) {
          this.$emit("getData");
          this.$message({
            type: "success",
            message: "成功导入" + re.data.importSum + "条数据"
          });
          this.pk_cust_report = re.data.pk;
          this.loadData();
        } else {
          this.$message.error(re.error.errorMessage);
        }
      },
      filechange: function filechange(file, fileList) {
        debugger;
        var oThis = this;
        setTimeout(function () {
          var filename = file.name;
          filename = filename.substring(filename.lastIndexOf(".") + 1);
          if ("xlsx" === filename || "xls" === filename) {
            var formData = oThis.$refs.baseTemplateRef.getFormData();
            formData = JSON.parse(JSON.stringify(formData));
            formData.report_name = file.name;
            oThis.$refs["baseTemplateRef"].setData("custReport", JSON.parse(JSON.stringify(formData)));
          } else {
            oThis.$message.error("导入文件必须为Excel文件!");
          }
        });
      },
      beforeAvatarUpload: function beforeAvatarUpload(file) {
        return true;
      },
  
      //加载数据方法
      loadData: function loadData() {
        debugger;
        if (this.pk_cust_report === "" && !this.pk_cust_report) {
          this.pk_cust_report = this.$root.$router.currentRoute.params.id;
        }
        if (this.pk_cust_report !== "" && this.pk_cust_report) {
          //加载主表
          this.loadcustreport(this.pk_cust_report);
          //加载字表
          this.loadcustreportkpi(this.pk_cust_report);
          this.editable = false;
          this.calcBtnshow = true;
        } else {
          this.editable = true;
          this.calcBtnshow = false;
        }
      },
  
      //详情查询
      loadcustreport: function loadcustreport(pk_cust_report) {
        var _this = this;
  
        debugger;
        if (this.pk_cust_report !== "") {
          console.log(this.pk_cust_report !== "");
          this.$http({
            url: _publicData.ylsBusi + "cust/report/getById",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: this.pk_cust_report
          }).then(function (res) {
            debugger;
            var originalValue = res.data.data;
            _this.$refs["baseTemplateRef"].setData("custReport", JSON.parse(JSON.stringify(originalValue)));
          })["catch"](function (e) {
            _this.$message({
              message: "财报详情获取失败",
              type: "error"
            });
          });
        }
      },
  
      //字表详情
      loadcustreportkpi: function loadcustreportkpi(pk_cust_report) {
        var _this2 = this;
  
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: {
              fk_id_reportkpi: this.pk_cust_report
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + "/report/pki/page",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data
        }).then(function (res) {
          debugger;
          var kpiValue = res.data.data.content;
          _this2.$refs["custreportchild"].setData("reportKpi_t", JSON.parse(JSON.stringify(kpiValue)));
          _this2.totalElements = res.data.data.totalElements; // 总条数
        })["catch"](function (e) {
          _this2.$message({
            message: "财报详情获取失败",
            type: "error"
          });
        });
      },
  
      //删除确定按钮
      deleteConfirmClick: function deleteConfirmClick() {
        var _this3 = this;
  
        this.delId = scope.row.pk_cust_report;
        this.$http({
          url: _publicData.ylsBusi + "cust/report/deleteById",
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
            //刷新列表
            if (_this3.delType === "loanRule") {
              _this3.loadPlanRule(_this3.pk_calc);
            } else if (_this3.delType === "loanPlan") {
              _this3.loadLoanPlan(_this3.pk_calc);
            }
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this3.$message({
            message: "删除失败",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">财报信息</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\" >返回</el-button>\n      </div>\n      <!-- 财报信息主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"财报信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  :methods=\"formReSetMethods\"\n                  :tpl-reset-fun=\"formResetFun\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n          <el-upload\n                class=\"button-no-radius fr\"\n                :action=\"action\"\n                ref=\"upload\"\n                :data=\"uploadType\"\n                :auto-upload=\"false\"\n                :show-file-list=\"false\"\n                :on-success=\"uploaded\"\n                :on-change=\"filechange\"\n                :before-upload=\"beforeAvatarUpload\">\n                <el-button type=\"primary\" class=\"button-no-radius\">点击上传</el-button>\n          </el-upload>\n        </div>\n      </ifbp-panel>\n        <ifbp-panel id=\"basePanelchild\" title=\"财报信息\">\n        <ifbp-template ref=\"custreportchild\"\n                  tplId=\"pkiTemplate\"\n                  :funnode=\"kpi_funnode\"\n                  :nexuskey=\"kpi_nexusKey\"\n                  :methods=\"kpi_formReSetMethods\"\n                  show-type=\"table\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n        </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n  <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/detialcustomer_back.vue', function(require, exports, module) {

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
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
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
              url: ylsBusi + "cust/customer/checkOnlyOne",
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
        //客户名称
        if (rule.field === "customer_name") {
          if (value === '') {
            callback(new Error('客户名称不能为空'));
          } else {
            callback();
          }
        }
      };
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        pk_customer: "",
        linkmanDelVisible: false,
        custbankDelVisible: false,
        ShareholderDelVisible: false,
        rmoveindex: "",
        delId: "",
        //客户基本信息修改
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.customerEdit = !oThis.customerEdit;
          }
        }],
        customerPk: "54fc5e2c-414d-49e5-9a44-1bf2bbe002e1",
        customerData: {
          customer: {},
          rules: {
            customer_name: [{ validator: validatecustomer, trigger: "blur" }],
            identity_no: [{ validator: validatecustomer, trigger: "blur" }],
            cusotmer_class: [{ required: true, message: "客户基本分类不能为空", trigger: "blur" }]
          }
        },
        customerEdit: false,
  
        //联系人
        linkmanIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存客户基本信息",
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
        custlinkmanPk: "946c2308-f17d-4d80-bc5b-3f3f406df306", //linkman
        custlinkmanData: {
          rules: {
            customer_name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
          }
        },
        //渲染表格
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = this.getNodeById($node, "bimh5ti3qnq");
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
        },
  
        custlinkmanTplMethods: {
          // form的保存操作
          // form的取消操作
        },
  
        // 股东信息新增
        ShareholderIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存客户基本信息",
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
        ShareholderPk: "4206377c-53b0-497d-a5b6-c6f98fa6631d", //custaxes
        ShareholderData: {
          rules: {
            pk_country: [{ required: true, message: "发货国家不能为空", trigger: "blur" }],
            pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
          }
        },
        ShareholderResetFun: function ShareholderResetFun($node) {
          var $table = this.getNodeById($node, "uob2e9t4f2");
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
        ShareholderTplMethods: {
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
  
      /**
         *   初始响应方法
         **/
      request: function request() {
        this.pk_customer = this.$root.$router.currentRoute.params.id;
        //请求客户基本信息详情
        if (this.pk_customer === undefined) {
          this.pk_customer = "";
          this.customerEdit = true;
          return;
        }
        var method = this.$root.$router.currentRoute.name;
        if (method != "customer_baseinfo-save") {
          if (this.pk_customer != "") {
            this.requestCustBaseInfo();
            this.requestCustlinkman();
            this.requestShareholder();
          }
        }
      },
  
      //请求客户基本信息详情
      requestCustBaseInfo: function requestCustBaseInfo() {
        var _this = this;
  
        this.$http({
          url: ylsBusi + "cust/customer/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_customer
        }).then(function (res) {
          var originalValue = res.data.data;
          _this.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(originalValue)));
  
          _this.$refs.baseTemplateRef1.setData("CustCorp", JSON.parse(JSON.stringify(originalValue.cust_corp_list[0])));
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户银行账户
      requestCustBank: function requestCustBank() {
        var _this2 = this;
  
        this.$http({
          url: "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.success === true) {
            var custbankOriginal = res.data.data;
            _this2.$refs.custbankRef.setData("bankaccount", JSON.parse(JSON.stringify(custbankOriginal)));
            _this2.$nextTick(function () {
              _this2.$refs.custbankRef.setData("tableShow", false);
            });
          } else {
            _this2.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this2.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求客户联系人
      requestCustlinkman: function requestCustlinkman() {
        var _this3 = this;
  
        var url = void 0;
        url = ylsBusi + "cust/otherContact/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer
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
          _this3.originalValue = res.data.data.content;
          _this3.$refs["custlinkmanRef"].setData("OtherContact_t", JSON.parse(JSON.stringify(_this3.originalValue)));
        })["catch"](function () {
          _this3.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //请求股东信息
      requestShareholder: function requestShareholder() {
        var _this4 = this;
  
        var url = void 0;
        url = ylsBusi + "cust/shareholder/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              pk_customer: this.pk_customer
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
  
          _this4.originalValue = res.data.data.content;
          _this4.$refs["ShareholderRef"].setData("Shareholder_t", JSON.parse(JSON.stringify(_this4.originalValue)));
        })["catch"](function () {
          _this4.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
      customerCancel: function customerCancel() {
        this.customerEdit = false;
        // 重置value
      },
  
      //客户基本信息保存
      customerConfirm: function customerConfirm() {
        var _this5 = this;
  
        var data = this.$refs.baseTemplateRef.comp.customer;
        var data1 = this.$refs.baseTemplateRef1.comp.CustCorp;
  
        var a = [data1];
        data.cust_corp_list = a;
        console.log(data);
        var baseUrl = ylsBusi;
        //表单formRef  表格tableRef
        this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(function (valid) {
          if (valid) {
            _this5.$http({
              url: baseUrl + "cust/customer/create",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this5.$message({
                  message: "保存成功",
                  type: "success"
                });
                _this5.originalValue = res.data.data;
                console.log(_this5.$refs.baseTemplateRef);
                _this5.$refs.baseTemplateRef.setData("customer", JSON.parse(JSON.stringify(_this5.originalValue)));
  
                _this5.pk_customer = _this5.originalValue.pk_cust_customer;
                _this5.customerEdit = false;
              } else {
                _this5.$message({
                  message: "res.data.error.errorMessage",
                  type: "error"
                });
              }
            })["catch"](function () {
              _this5.$message({
                message: "更新失败",
                type: "error"
              });
            });
          }
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
        }
      },
      //联系人主表保存
      linkmanFormConfirm: function linkmanFormConfirm() {
        var _this6 = this;
  
        //获取当前数据
        var data = this.$refs.custlinkmanRef.comp.OtherContact;
        data.pk_customer = this.pk_customer;
        var baseUrl = ylsBusi;
        //保存校验
        this.$refs.custlinkmanRef.comp.$refs["OtherContact_ref"].validate(function (valid) {
          if (valid) {
            _this6.$http({
              url: baseUrl + "cust/otherContact/updateORinsert",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this6.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this6.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this6.$refs.custlinkmanRef.getData("OtherContact_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (_this6.rmoveindex !== "") {
                  linarraydata.splice(_this6.rmoveindex, 1, _this6.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this6.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this6.$refs.custlinkmanRef.setData("OtherContact_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this6.$refs["custlinkmanRef"].comp.formShow = false;
              } else {
                _this6.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this6.$message({
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
        //新增的界面方式进行修改
        // let uitemplateComp = this.$refs.custlinkmanRef.comp;
        // let table = uitemplateComp.$refs["OtherContact_t_ref"];
        // table.closeExpandRow();
        // uitemplateComp.linkman = {};
        // uitemplateComp.formShow = true;
        // this.$refs.custlinkmanRef.comp.OtherContact = scope.row;
  
        //行下展开表单界面
        var row = scope.row;
        this.$refs["custlinkmanRef"].getTableComp().expandRow(row);
        this.$refs["custlinkmanRef"].formShow = false;
        //OtherContact为表单数据对象参数
        this.$refs["custlinkmanRef"].setData("OtherContact", row);
      },
      //联系人删除提示
      linkmanFormdelete: function linkmanFormdelete(scope) {
        this.linkmanDelVisible = true;
        this.delId = scope.row.pk_cust_other_contact;
      },
      //联系人删除方法
      linkmanDeleteClick: function linkmanDeleteClick() {
        var _this7 = this;
  
        this.$http({
          url: ylsBusi + "cust/otherContact/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
  
          if (res.data.success === true) {
            _this7.$message({
              message: "删除成功",
              type: "success"
            });
            //this.delDialogVisible = false;
            _this7.requestCustlinkman();
            // this.request(this.currentPage - 1, this.size);
          } else {
            _this7.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this7.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
        this.linkmanDelVisible = false;
        this.delId = "";
      },
  
      //股东情况保存
      ShareholderFormConfirm: function ShareholderFormConfirm() {
        var _this8 = this;
  
        //获取当前数据
        var data = this.$refs.ShareholderRef.comp.Shareholder;
        data.pk_customer = this.pk_customer;
        var baseUrl = ylsBusi;
        //保存校验
        this.$refs.ShareholderRef.comp.$refs["Shareholder_ref"].validate(function (valid) {
          if (valid) {
            _this8.$http({
              url: baseUrl + "cust/shareholder/create",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this8.$message({
                  message: "保存成功！",
                  type: "success"
                });
                _this8.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                var linarraydata = _this8.$refs.ShareholderRef.getData("Shareholder_t");
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
  
                if (_this8.rmoveindex !== "") {
                  linarraydata.splice(_this8.rmoveindex, 1, _this8.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(_this8.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                _this8.$refs.ShareholderRef.setData("Shareholder_t", JSON.parse(JSON.stringify(linarraydata)));
                //隐藏详情列表
                _this8.$refs["ShareholderRef"].comp.formShow = false;
              } else {
                _this8.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this8.$message({
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
      },
      //股东信息删除提示
      ShareholderDeleteTableRow: function ShareholderDeleteTableRow(scope) {
        this.ShareholderDelVisible = true;
        this.delId = scope.row.pk_cust_shareholder;
      },
      //股东信息删除
      ShareholderDeleteClick: function ShareholderDeleteClick() {
        var _this9 = this;
  
        this.$http({
          url: ylsBusi + "cust/shareholder/deleteById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: this.delId
        }).then(function (res) {
  
          if (res.data.success === true) {
            _this9.$message({
              message: "删除成功",
              type: "success"
            });
            _this9.requestShareholder();
          } else {
            _this9.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this9.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
        this.ShareholderDelVisible = false;
        this.delId = "";
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n  <div class=\"main-panel\">\n    <!--节点title-->\n    <div class=\"title-container\">\n      <h2 class=\"name\">客户管理</h2>\n    </div>\n    <!-- 主体区域(详情页结构) -->\n    <div class=\"detail-main-container clearfix\">\n      <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n        <!--客户基本信息模块界面-->\n        <ifbp-panel id=\"basePanel\" title=\"客户基本信息\" :icons=\"baseIcons\">\n          <ifbp-template ref=\"baseTemplateRef\"\n                    tplId=\"baseTemplate\"\n                    :pkTemp=\"customerPk\"\n                    show-type=\"form\"\n                    :tplData=\"customerData\"\n                    :editable=\"customerEdit\">\n          </ifbp-template>\n            <ifbp-template ref=\"baseTemplateRef1\"\n                    tplId=\"baseTemplate1\"\n                    pkTemp='ff13095f-7842-4c1c-9e3f-71ccda9f5ce4'\n                    show-type=\"form\"\n                    :tplData=\"customerData1\"\n                    :editable=\"customerEdit\">\n           </ifbp-template>\n          <div class=\"form-button-div\" v-if=\"customerEdit\">\n            <el-button type=\"default\" class=\"button-no-radius\" @click=\"customerCancel\">取消</el-button>\n            <el-button type=\"primary\" class=\"button-no-radius\" @click=\"customerConfirm\">保存</el-button>\n          </div>\n        </ifbp-panel>\n        <!--联系人模块界面-->\n        <!--icons=\"linkmanIcons\"新增按钮定义 -->\n        <ifbp-panel id=\"linkmanPanel\" title=\"联系人信息\" :icons=\"linkmanIcons\">\n          <ifbp-template ref=\"custlinkmanRef\"\n                        tplId=\"linkmanTemplate\"\n                        :pkTemp=\"custlinkmanPk\"\n                        :tplData=\"custlinkmanData\"\n                        :tplResetFun=\"linkmanResetFun\"\n                        :tplMethods=\"custlinkmanTplMethods\"\n                        @form-confirm-click=\"linkmanFormConfirm\"\n                        @form-cancel-click=\"linkmanFormCancel\"\n                        show-type=\"table-form\"\n                        @edit-table-click=\"linkmanFormedit\"\n                        @delete-table-click=\"linkmanFormdelete\"\n                        >\n          </ifbp-template>\n        </ifbp-panel>\n        <!--股东信息界面-->\n        <ifbp-panel id=\"ShareholderPanel\" title=\"股东信息\" :icons=\"ShareholderIcons\">\n          <ifbp-template ref=\"ShareholderRef\"\n                        tplId=\"ShareholderTemplate\"\n                        :pkTemp=\"ShareholderPk\"\n                        :tplData=\"ShareholderData\"\n                        :tplResetFun=\"ShareholderResetFun\"\n                        :tplMethods=\"ShareholderTplMethods\"\n                        @form-confirm-click=\"ShareholderFormConfirm\"\n                        @form-cancel-click=\"ShareholderFormCancel\"\n                        @edit-table-click=\"ShareholderEditTableRow\"\n                        @delete-table-click=\"ShareholderDeleteTableRow\"\n                        show-type=\"table-form\"\n                       >\n          </ifbp-template>\n        </ifbp-panel>\n      </ifbp-panel-group>\n    </div>\nimport {ylsBusi} from '../../../../common/js/publicData.js';\n\n    <!-- 客户联系人 删除提示框 -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"linkmanDelVisible\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该条记录？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"linkmanDelVisible = false , this.delId=''\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n\n    <!-- 股东信息 删除提示框 -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"ShareholderDelVisible\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该条记录 ？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"ShareholderDelVisible = false, this.delId=''\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"ShareholderDeleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n  </div>\n"
  

});
 
 define('yls^busi/customer/src/linkmanpanel.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["pk_customer", "type"],
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
        $refNodeIdType: '',
        funnode: "BT003",
        nexuskey: oThis.type === "corp" ? "Contacts_UI" : "person_contact",
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
        custlinkmanPk: "946c2308-f17d-4d80-bc5b-3f3f406df306", //linkman
        custlinkmanData: {
          isEdit: false
  
        },
        //渲染表格
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = $node.find('el-table');
          var $refNodeName = $node.find("el-ref[v-model='OtherContact.customer_name']"); //获取姓名节点
          if ($refNodeName.length) {
            $refNodeName.attr("v-on:trigger", "getMessageFromName"); //根据姓名带出证件号与类型
          }
          debugger;
          var $refNodeIdType = $node.find("el-select[v-model='OtherContact.identity_type']"); //获取证件类型节点
          $refNodeIdType.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
          var $refNodeIdNo = $node.find("el-input[v-model='OtherContact.identity_card_numb']"); //获取证件号节点
          $refNodeIdNo.attr("v-bind:disabled", 'isEdit'); //选择参照变成不可编辑
  
  
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
        },
        t_Methods: {
          getMessageFromName: function getMessageFromName(type, data) {
  
            if (type === 'change') {
  
              this.$refs['OtherContact_ref'].model.identity_type = data.value[0].identity_type;
              this.$refs['OtherContact_ref'].model.identity_card_numb = data.value[0].identity_no;
              oThis.$refs["custlinkmanRef"].setData("isEdit", true);
            }
          }
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
      //通过cookie获取当前登录用户的ID
      getCookie: function getCookie(cName) {
        var cStart = void 0;
        var cEnd = void 0;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
      },
  
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
  
        var url = void 0;
        var ownerId = this.getCookie("_A_P_id");
        url = _publicData.ylsBusi + "cust/otherContact/page";
        var data = {
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              }, {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
              }]
            }
          }
        };
  
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data
  
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs["custlinkmanRef"].setData("OtherContact_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "联系人信息获取失败",
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
          this.$refs["custlinkmanRef"].getTableComp().closeExpandRow(); //关闭新增区域表单
          var OtherContactTable = this.$refs.custlinkmanRef.getData('OtherContact_t');
          OtherContactTable[this.baseEditIndex] = this.baseData; //获取点击修改前的值
          this.$refs.custlinkmanRef.setData('OtherContact_t', OtherContactTable);
        }
      },
      //联系人主表保存
      linkmanFormConfirm: function linkmanFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var data = this.$refs.custlinkmanRef.comp.OtherContact;
        data.pk_customer = this.pk_customer;
        var baseUrl = _publicData.ylsBusi;
        //保存校验
  
        this.$refs.custlinkmanRef.comp.$refs["OtherContact_ref"].validate(function (valid) {
          if (valid) {
            _this2.$http({
              url: baseUrl + "cust/otherContact/updateORinsert",
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
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--联系人信息管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"custlinkmanRef\"\r\n                        tplId=\"linkmanTemplate\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexuskey\"\r\n                        :tplData=\"custlinkmanData\"\r\n                        :tplResetFun=\"linkmanResetFun\"\r\n                        :methods=\"t_Methods\"\r\n                        @form-confirm-click=\"linkmanFormConfirm\"\r\n                        @form-cancel-click=\"linkmanFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"linkmanFormedit\"\r\n                        @delete-table-click=\"linkmanFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 客户联系人 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"linkmanDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"linkmanDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"linkmanDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/customer/src/listcustomer.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)()],
      data: function data() {
          var oThis = this;
          return {
              funnode: "BT003",
              nexuskey: "Lessee_list",
  
              createType: false,
              custVisible: false,
  
              // 查询模板编码
              searchTemplateCode: 'YLSCXMB_BUSICUST_LISTCUSTOMER',
              sp: '',
              customerListData: {},
              //操作按钮
              templateTableFormResetFun: function templateTableFormResetFun($node) {
                  //获取table,此id为ui模板上面的表格Id
                  var $table = $node.find('el-table');
                  //定义操作
                  var operateArr = [{
                      title: "查看",
                      icon: "search"
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
          this.request();
      },
  
      methods: {
  
          // 查询
          handleSearch: function handleSearch(searchTemplate) {
              this.sp = JSON.stringify(searchTemplate);
              this.request();
          },
  
          // 添加按钮
          addPersonCustomerInfo: function addPersonCustomerInfo() {
              location.hash = "/cust/Personcustomer/add/";
          },
          addCorpCustomerInfo: function addCorpCustomerInfo() {
              location.hash = "/cust/Corpcustomer/add/";
          },
  
          //编辑按钮
          tableSearchClick: function tableSearchClick(scope) {
  
              if (scope.row.customer_type === 'CORP') {
                  location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;
              } else if (scope.row.customer_type === 'PERSON') {
                  location.hash = "/cust/Personcustomer/detail/" + scope.row.pk_cust_customer;
              }
          },
          tableDeleteClickRow: function tableDeleteClickRow(scope) {
              debugger;
              this.custVisible = true;
              this.delId = scope.row.pk_cust_customer;
          },
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              var _this = this;
  
              debugger;
              // let delId = scope.row.pk_cust_customer;
              this.$http({
                  url: _publicData.ylsBusi + "cust/customer/deleteById",
                  headers: { 'Content-Type': 'application/json' },
                  method: "post",
                  dataType: "json",
                  data: this.delId
              }).then(function (res) {
                  debugger;
                  if (res.data.success === true) {
                      _this.$message({
                          message: "删除成功",
                          type: "success"
                      });
                      _this.custVisible = false;
                      _this.request();
                  } else {
                      _this.$message({
                          message: res.data.message,
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
          request: function request() {
              var _this2 = this;
  
              var url = void 0;
              var baseUrl = _publicData.ylsBusi;
              url = baseUrl + 'cust/customer/page';
              debugger;
              var data = {
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  "pageNum": this.currentPage - 1,
                  "pageSize": this.pageSize,
                  "searchParams": {
                      "searchMap": {
                          'custCondList': [{ 'key': 'cusotmer_class',
                              'oper': '=',
                              'value': 'yls_dev100000000ffn'
                          }],
                          'qtAggVO': this.sp
                      }
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
                  //customer_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs["customerList-table"].setData("customer_t", JSON.parse(JSON.stringify(originalValue)));
                  _this2.totalElements = res.data.data.totalElements; // 总条数
              })["catch"](function (e) {
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
  //
  //
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">客户信息</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" v-show=\"!createType\" @mouseenter.native=\"createType=true\" >新增</el-button>\n      <div v-show=\"createType\" @mouseleave.self=\"createType=false\">\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addPersonCustomerInfo\">自然人客户</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\"  @click=\"addCorpCustomerInfo\">企业客户</el-button>\n      </div>\n    </div>\n    <div class=\"fr\">\n        <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n  <!-- 客户列表 -->\n <div id=\"customerList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"customerList-table\"\n                  tplId=\"customerList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexuskey\"\n                  :tplData=\"customerListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  \n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClickRow\" >\n    </ifbp-template>\n    <el-dialog\n    title=\"提示\"\n    v-model=\"custVisible\"\n    :modal=\"true\"\n    size=\"tiny\">\n    <span>确认删除该条记录 ？删除后无法恢复。</span>\n    <span slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"custVisible = false, this.delId=''\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"tableDeleteClick\">确 定</el-button>\n    </span>\n   </el-dialog>\n    \n    <!--分页组件-->\n          <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n              :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n          </el-pagination>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/customer/src/operation_detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        //固定写法
        scrollDom: document.getElementsByClassName('view')[0],
        //合作协议主键
        pk_operation_protocol: '',
        //删除对话框是否展示
        delDialogVisible: false,
        //删除标识，区分子表
        delType: '',
        //删除实体主键
        delId: '',
        pid: '',
        // 主模板 baseTemplateRef start
        pk_temp: '51775896-9d65-4a80-b88f-35daf4608d09',
        tplData: {},
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          var $refNode = this.getNodeById($node, '1nnheivkgfc'); //获取客户参照
          if (oThis.pid !== undefined) {
            $refNode.attr("v-bind:disabled", 'true'); //客户参照只读
          } else {
            $refNode.attr("v-bind:disabled", 'false'); //客户参照可编辑
          }
        },
  
        //是否编辑态
        editable: false,
        calcBtnshow: true,
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }]
        // 主模板 baseTemplateRef end
      };
    },
  
    t_Methods: {
      handleRefChange: function handleRefChange(type, data) {
        //参照变化处理函数 依据参照给 证件类型  证件号码赋值
        this.$refs['OperationProtocol_ref'].model.agent_name = data.value[0].agent_name;
        //this.$refs['CustPledge-form'].model.identity_type = data.value[0].identity_type;
      }
    },
  
    created: function created() {
      this.pid = this.$root.$router.currentRoute.params.id;
      if (this.pid != '' && this.pid) {
        this.loadDemoInfo(this.pid);
      } else {
        this.calcBtnshow = false;
      }
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
  
        var data1 = this.$refs.baseTemplateRef.comp.OperationProtocol;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/UpdateOrCreate',
          // headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data: data1
        }).then(function (res) {
          location.hash = '/operation/list';
          _this.editable = false;
          var originalValue = res.data.data;
          _this.$refs["baseTemplateRef"].setData('OperationProtocol_t', originalValue);
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
  
      // 主模板 baseTemplateRef 事件处理 end
  
      //加载信息
      loadDemoInfo: function loadDemoInfo(id) {
        var _this2 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: id
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs['baseTemplateRef'].setData('OperationProtocol', JSON.parse(JSON.stringify(originalValue)));
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
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">合作协议</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\" >返回</el-button>\n        <!--<el-button class=\"fr\" type=\"primary\" @click=\"onCalc\" style=\"margin-right:10px\" v-show=\"calcBtnshow\">保存</el-button>-->\n    </div>\n      <!-- 主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"主表信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :pkTemp=\"pk_temp\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\"\n                  :methods=\"t_Methods\"\n                  :tplResetFun=\"templateTableFormResetFun\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 主模板 temp end-->\n\n    </ifbp-panel-group>\n  </div>\n\n</div>\n"
  

});
 
 define('yls^busi/customer/src/operation_list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        //模版主键
        pk_temp: '51775896-9d65-4a80-b88f-35daf4608d09',
        currentPage: 1,
        pageSize: [10, 20, 30, 40],
        size: 20,
        totalSize: 0,
        operationListData: {},
        delDialogVisible: false,
        //子表详情
        detailIcons: [{
          icon: "plus",
          click: function click() {
            debugger;
            var uitemplateComp = oThis.$refs.operationTable.comp;
            var table = uitemplateComp.$refs['OperationProtocol_t_ref'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }],
  
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = this.getNodeById($node, 'dgngfb74qds');
          //定义操作
          var operateArr = [{
            icon: 'edit',
            title: "查看"
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
      this.request(this.currentPage - 1, this.size);
    },
  
    methods: {
      handleSizeChange: function handleSizeChange(sizeVal) {
        this.size = window.pageSize = sizeVal;
        var maxPage = Math.ceil(this.totalSize / sizeVal);
        if (maxPage >= this.currentPage) {
          this.request(this.currentPage - 1, this.size);
        }
      },
      handleCurrentChange: function handleCurrentChange(currVal) {
        this.currentPage = currVal;
        this.request(this.currentPage - 1, this.size);
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        debugger;
        var uitemplateComp = this.$refs.operationTable.comp;
        var table = uitemplateComp.$refs['OperationProtocol_ref'];
        table.closeExpandRow;
        uitemplateComp.formShow = true;
        var row = scope.row;
        this.$refs.operationTable.setData("OperationProtocol", JSON.parse(JSON.stringify(row)));
      },
  
      // 添加按钮
      addInterrateInfo: function addInterrateInfo() {
        location.hash = '/operation/add';
      },
  
  
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
  
        debugger;
        var data1 = this.$refs.operationTable.comp.OperationProtocol;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/UpdateOrCreate',
          // headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data: data1
        }).then(function (res) {
          location.hash = '/operation/list';
          _this.editable = false;
          var originalValue = res.data.data;
          _this.$refs["operationTable"].setData('OperationProtocol_t', originalValue);
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
  
      // 主模板 baseTemplateRef 事件处理 end
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.pk_operation_protocol = scope.row.pk_operation_protocol;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        debugger;
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/deleteById',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: this.pk_operation_protocol
        }).then(function (res) {
          if (res.data.success === true) {
            _this2.$message({
              message: "删除成功",
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
        })["catch"](function (e) {
          _this2.$message({
            message: "删除失败",
            type: "error"
          });
        });
      },
  
  
      //加载信息
      loadDemoInfo: function loadDemoInfo(id) {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'cust/operation/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: id
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs['baseTemplateRef'].setData('OperationProtocol', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this3.$message({
            message: '详情获取失败',
            type: 'error'
          });
        });
      },
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
          url: _publicData.ylsBusi + 'cust/operation/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          //QuoteCalculator_table UI模板表格名称
          var originalValue = res.data.data.content;
          _this4.$refs['operationTable'].setData('OperationProtocol_t', originalValue);
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!-- 报价列表 -->\n <div id=\"operationList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n  <ifbp-panel id=\"basePanel\" title=\"合作协议\" :icons=\"detailIcons\">\n      <ifbp-template ref=\"operationTable\"\n                  tplId=\"operationList-template\"\n                  :pkTemp=\"pk_temp\"\n                  :tplData=\"operationListData\"\n                  show-type=\"table-form\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @edit-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n      </ifbp-template>\n      <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n      </div>\n  </ifbp-panel>\n    <!--分页组件-->\n    <el-pagination\n      :current-page=\"currentPage\"\n      :page-sizes=\"pageSizes\"\n      :page-size=\"size\"\n      layout=\"total, sizes, prev, pager, next, jumper\"\n      :total=\"totalSize\"\n      @size-change=\"handleSizeChange\"\n      @current-change=\"handleCurrentChange\"\n      >\n    </el-pagination>\n\n    <!-- 删除确认Dialog -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});

 
 define('yls^./common/components/button.vue', function(require, exports, module) {

  "use strict";
  
  module.exports = {};
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<el-button>common中的button</el-button>\n"
  

});
 
 define('yls^./common/components/customerDetailBank.vue', function(require, exports, module) {

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
  
  exports["default"] = {
    data: function data() {
      var pk_customer = this.$root.$router.currentRoute.params.id;
      return {
        // 通过传入的参数判断是新增还是修改操作
        pk_customer: pk_customer,
        // UI模板传入参数
        custBankPk: "000111100000001Z8DZS",
        custBankData: {
          params: {
            pk_banktype: ""
          },
          rules: {
            accnum: [{
              required: true,
              message: "账号不能为空",
              trigger: "blur"
            }],
            accname: [{
              required: true,
              message: "户名不能为空",
              trigger: "blur"
            }],
            pk_bankdoc: [{
              required: true,
              message: "开户银行不能为空",
              trigger: "blur"
            }],
            pk_banktype: [{
              required: true,
              message: "银行类型不能为空",
              trigger: "blur"
            }],
            accountproperty: [{
              required: true,
              message: "账户性质不能为空",
              trigger: "blur"
            }]
          }
        },
        custBankResetFun: function custBankResetFun($node) {
          var $table = this.getNodeById($node, "b327bj95th6");
          $table.attr(":show-header", "false");
          var operateArr = [{
            title: "启用",
            icon: "pt-tuichu"
          }];
          var operateHtml = this.getBaseTableOperateHtml(operateArr);
          $table.append(operateHtml);
  
          var $accnum = this.getNodeById($node, "krvqs7xlxfs"); //账号
          var $accname = this.getNodeById($node, "83oyd6v35wm"); //户名
          var $pkBankdoc = this.getNodeById($node, "r69m5jd8zul"); //开户银行
          var $pkBanktype = this.getNodeById($node, "bo4dg59b0v"); //银行类别
          var $contactpsn = this.getNodeById($node, "vpthxzig1da"); //联系人
          var $tel = this.getNodeById($node, "k3bvpmgm9m"); //联系电话
  
          $accnum.html('<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>');
          $accname.html('<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>');
          $pkBankdoc.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." + 'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>');
          $pkBanktype.html('<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' + "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." + 'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>');
  
          $contactpsn.html('<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>');
          $tel.html('<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>');
          return $node[0].outerHTML;
        },
  
        // 是否显示删除dialog
        bankDelDialogVisible: false
      };
    },
    mounted: function mounted() {
      this.requestCustBank();
    },
  
    methods: {
      // 初始化加载数据
      requestCustBank: function requestCustBank() {
        var _this = this;
  
        if (!this.pk_customer) {
          this.$nextTick(function () {
            _this.$refs.custBankRef.tableShow = false;
          });
          return;
        }
        this.$http({
          url: "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" + this.pk_customer,
          method: "get"
        }).then(function (res) {
          if (res.data.status === true) {
            _this.$nextTick(function () {
              var custbankOriginal = res.data.data;
              _this.$refs.custBankRef.setData("bankaccount_t", JSON.parse(JSON.stringify(custbankOriginal)));
              if (custbankOriginal.length < 1) {
                _this.$refs.custBankRef.tableShow = false;
              }
            });
          } else {
            _this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: "银行信息获取失败",
            type: "error"
          });
        });
      },
  
      // table行的编辑操作
      bankEditClick: function bankEditClick(scope) {
        this.$refs.custBankRef.getTableComp().expandRow(scope.row);
        this.$refs.custBankRef.formShow = false;
        this.$refs.custBankRef.setData("bankaccount", scope.row);
        // 备份数据
        this.bankBaseData = JSON.parse(JSON.stringify(scope.row));
        this.bankEditIndex = scope.$index;
      },
  
      // table行的删除操作
      bankDeleteClick: function bankDeleteClick(scope) {
        this.custbankDel = scope.row;
        this.bankDelDialogVisible = true;
      },
  
      // form的保存操作
      bankFormConfirm: function bankFormConfirm(type) {
        var _this2 = this;
  
        this.$refs.custBankRef.validate(function (valid) {
          if (valid) {
            var data = _this2.$refs.custBankRef.getData("bankaccount");
            if (type === "form") {
              _this2.$message("新增数据为:" + JSON.stringify(data));
            } else {
              _this2.$message("修改数据为:" + JSON.stringify(data));
            }
          } else {
            _this2.$message("校验未通过");
          }
        }, type);
      },
  
      // form的取消操作
      bankFormCancel: function bankFormCancel(type) {
        if (type === "form") {
          this.$refs.custBankRef.formShow = false;
        } else {
          this.$refs.custBankRef.getTableComp().closeExpandRow();
          var bankT = this.$refs.custLinkmanRef.getData("bankaccount_t");
          bankT[this.bankEditIndex] = this.bankBaseData;
          this.$refs.custLinkmanRef.setData("bankaccount_t", bankT);
        }
      },
      bankDeleteDialogClick: function bankDeleteDialogClick() {
        var custbankDel = this.custbankDel;
        console.log("delete" + JSON.stringify(custbankDel));
        this.bankDelDialogVisible = false;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div id=\"customerDetailBank\">\n  <ifbp-template ref=\"custBankRef\"\n        tpl-id=\"custBankId\"\n        :pk-temp=\"custBankPk\"\n        :tpl-data=\"custBankData\"\n        show-type=\"table-form\"\n        :tpl-reset-fun=\"custBankResetFun\"\n        @edit-table-click=\"bankEditClick\"\n        @delete-table-click=\"bankDeleteClick\"\n        @form-confirm-click=\"bankFormConfirm\"\n        @form-cancel-click=\"bankFormCancel\">\n  </ifbp-template>\n  <!--删除确认Dialog-->\n  <ifbp-del-dialog\n    v-model=\"bankDelDialogVisible\"\n    message=\"确认删除该数据？删除后无法恢复。\"\n    @click=\"bankDeleteDialogClick\"\n    >\n  </ifbp-del-dialog>\n</div>\n"
  

});
 
 define('yls^./common/components/customerDetailLinkMan.vue', function(require, exports, module) {

  'use strict';
  
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
  
  exports["default"] = {
  
    props: ['pk'],
    data: function data() {
      var pk_customer = this.$root.$router.currentRoute.params.id;
      return {
        // 通过传入的参数判断是新增还是修改操作
        pk_customer: pk_customer,
        // UI模板传入参数
        custLinkmanPk: '34cc4979-181e-44dc-9cd7-79ab1b51738d',
        custLinkmanData: {
          rules: {
            name: [{
              required: true,
              message: '请输入联系人名称',
              trigger: 'blur'
            }]
          }
        },
        linkmanResetFun: function linkmanResetFun($node) {
          var $table = this.getNodeById($node, 'zxhlnr94qvd');
          $table.attr(':show-header', 'false');
          var operateHtml = this.getBaseTableOperateHtml();
          $table.append(operateHtml);
  
          var $sex = this.getNodeById($node, 'ir66pzdxiic'); //性别
          var $isdefault = this.getNodeById($node, 'h81qk6u00p5'); //是否默认
          $sex.html('<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>');
          $isdefault.html('<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>');
          return $node[0].outerHTML;
        },
  
        // 是否显示删除dialog
        linkmanDelDialogVisible: false
      };
    },
    mounted: function mounted() {
      this.requestCustlinkman();
    },
  
    computed: {
      currentPK: function currentPK() {
        return this.pk;
      }
    },
    watch: {
      pk: function pk(val) {
        this.requestCustlinkman();
      }
    },
    methods: {
      // 初始化加载数据
      requestCustlinkman: function requestCustlinkman() {
        var _this = this;
  
        if (!this.pk) {
          this.$nextTick(function () {
            _this.$refs.custLinkmanRef.tableShow = false;
          });
          return;
        }
        this.$http({
          url: '/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=' + this.pk_customer,
          method: 'get'
        }).then(function (res) {
          if (res.data.status === true) {
            _this.$nextTick(function () {
              var originalValue = res.data.data;
              _this.$refs.custLinkmanRef.setData('linkman_t', JSON.parse(JSON.stringify(originalValue)));
              if (custbankOriginal.length < 1) {
                _this.$refs.custLinkmanRef.tableShow = false;
              }
            });
          } else {
            _this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this.$message({
            message: '联系人信息获取失败',
            type: 'error'
          });
        });
      },
  
      // table行的编辑操作
      linkmanEditClick: function linkmanEditClick(scope) {
        this.$refs.custLinkmanRef.getTableComp().expandRow(scope.row);
        this.$refs.custLinkmanRef.formShow = false;
        this.$refs.custLinkmanRef.setData('linkman', scope.row);
        // 备份数据
        this.linkmanBaseData = JSON.parse(JSON.stringify(scope.row));
        this.linkmanEditIndex = scope.$index;
      },
  
      // table行的删除操作
      linkmanDeleteClick: function linkmanDeleteClick(scope) {
        this.delId = scope.row.pk_linkman;
        this.linkmanDelDialogVisible = true;
      },
  
      // form的保存操作
      linkmanFormConfirm: function linkmanFormConfirm(type) {
        var _this2 = this;
  
        this.$refs.custLinkmanRef.validate(function (valid) {
          if (valid) {
            var data = _this2.$refs.custLinkmanRef.getData('linkman');
            if (type === 'form') {
              _this2.$message('新增数据为:' + JSON.stringify(data));
            } else {
              _this2.$message('修改数据为:' + JSON.stringify(data));
            }
          } else {
            _this2.$message('校验未通过');
          }
        }, type);
      },
  
      // form的取消操作
      linkmanFormCancel: function linkmanFormCancel(type) {
        if (type === 'form') {
          this.$refs.custLinkmanRef.formShow = false;
        } else {
          this.$refs.custLinkmanRef.getTableComp().closeExpandRow();
          var linkmanT = this.$refs.custLinkmanRef.getData('linkman_t');
          linkmanT[this.linkmanEditIndex] = this.linkmanBaseData;
          this.$refs.custLinkmanRef.setData('linkman_t', linkmanT);
        }
      },
      linkmanDeleteDialogClick: function linkmanDeleteDialogClick() {
        var delId = this.delId;
        console.log('delete' + delId);
        this.linkmanDelDialogVisible = false;
      }
    }
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div id=\"customerDetailBank\">\n  <ifbp-template ref=\"custLinkmanRef\"\n        tpl-id=\"custLinkmanId\"\n        :pk-temp=\"custLinkmanPk\"\n        :tpl-data=\"custLinkmanData\"\n        show-type=\"table-form\"\n        :tpl-reset-fun=\"linkmanResetFun\"\n        @edit-table-click=\"linkmanEditClick\"\n        @delete-table-click=\"linkmanDeleteClick\"\n        @form-confirm-click=\"linkmanFormConfirm\"\n        @form-cancel-click=\"linkmanFormCancel\">\n  </ifbp-template>\n  <!-- 删除确认Dialog -->\n  <ifbp-del-dialog\n    v-model=\"linkmanDelDialogVisible\"\n    message=\"确认删除该数据？删除后无法恢复。\"\n    @click=\"linkmanDeleteDialogClick\"\n    >\n  </ifbp-del-dialog>\n</div>\n"
  

});
 
 define('yls^./common/components/table.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _qs = require("yls^/node_modules/qs/lib/index");
  
  var _qs2 = _interopRequireDefault(_qs);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    name: "editTable",
    /*
     	@props {queryUrl} 父组件传过需要去获取表格数据的地址
     	@props {queryParams} 父组件传过需要去获取表格数据时附带的参数
     	@props {loadState} 首次加载页面时是否去动态加载表格数据
     * */
    props: {
      queryUrl: {
        type: String,
        required: true
      },
      multiple: {
        type: Boolean,
        "default": false
      },
      queryParams: {
        type: Object
      },
      loadState: {
        type: Boolean,
        "default": false
      },
      pagination: {
        type: Boolean,
        "default": true
      },
      beforeInitTable: {
        type: Function
      }
    },
    /*
     	表格组件内的数据
     	loadUrl:父组件传过需要去获取表格数据的地址
     	multipleSelection:所有选中数据的集合
     	tableData：表格数据
     	loading：初始loading状态
     	pageInfo：分页信息
     		page：当前的页码
     		rows：当前每页显示的条数
     * */
    data: function data() {
      return {
        loadUrl: this.queryUrl,
        multipleSelection: [],
        tableData: {},
        loading: false,
        pageInfo: {
          page: 1,
          rows: 10
        }
      };
    },
  
    /*
     	表格和分页是基于element-ui提供的组件进行动态地封装
     * */
    methods: {
      /*
       	对外提供的接口加载表格数据使用
       	逻辑为：
       	当前页面为第一页时，需要手动获取数据
       	当页面不为1时，只要改变页码为1自动触发handleCurrentChange函数
       * */
      loadTableData: function loadTableData() {
        if (this.pageInfo.page == 1) {
          this.getData();
        } else {
          this.pageInfo.page = 1;
        }
      },
  
      /*表格展开*/
      expand: function expand(row, expandState) {
        this.$emit("expand", row, expandState);
      },
  
      /*
       	表格内部获取数据的函数
       * */
      getData: function getData() {
        var _this = this;
  
        this.loading = true;
        var data = Object.assign({}, this.queryParams, this.pageInfo);
        axios.post(this.loadUrl, _qs2["default"].stringify(data)).then(function (response) {
          if (_this.beforeInitTable) {
            _this.beforeInitTable(response.data);
          }
          if (_this.pagination) {
            _this.tableData = response.data;
          } else {
            var data = {
              rows: []
            };
            data.rows = response.data;
            _this.tableData = data;
          }
  
          _this.loading = false;
        });
      },
  
      /*
       	改变选择的数据到当前表格组件
       	当改变选择项时触发
       	@param {val} 当前选中的列集合
       * */
      handleSelectionChange: function handleSelectionChange(val) {
        this.multipleSelection = val;
      },
  
      /*
       	动态绑定@class current-row 当该列为所有选中行的子集时，动态给该行添加class
       * */
      showcheck: function showcheck(row, index) {
        if (this.multipleSelection.indexOf(row) != -1) return "current-row";
      },
  
      /*
       	切换某行数据的选中状态
       * */
      selectRow: function selectRow(rowdata) {
        if (!this.multiple) {
          this.$refs.tableS.clearSelection();
          this.$refs.tableS.toggleRowSelection(rowdata);
        }
        var index = this.tableData.rows.indexOf(rowdata);
        this.$emit("row-click", rowdata, index);
        return false;
      },
  
      /*
       	显示某行数据详情
       * */
      showDetail: function showDetail(row) {
        this.$emit("row-dblclick", row);
      },
  
      /*
       	切换每页显示条数时，执行的回调
       	//包括重新加载数据以及赋值
       * */
      handleSizeChange: function handleSizeChange(pagesize) {
        this.pageInfo.rows = pagesize;
        this.loadTableData();
      },
  
      /*
       	切换分页码时动态调用的回调函数
       * */
      handleCurrentChange: function handleCurrentChange(page) {
        this.pageInfo.page = page;
        this.getData();
      }
    },
    /*
     	计算属性
     	totalLength：动态地根据值来改变当前表格的数据的总条数
     * */
    computed: {
      totalLength: function totalLength() {
        return this.tableData.total;
      }
    },
    /*
     	vue周期函数
     	当组件加载完成时的回调
     * */
    created: function created() {
      if (this.loadState) this.getData();
    },
    mounted: function mounted() {
      this.$emit("table-mounted");
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
  
  //用来序列化对象，提交http请求时使用
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n \t<div class=\"table-info clearfix\"  v-loading=\"loading\">\n  \t\t<el-table :data=\"tableData.rows\" ref=\"tableS\"\n  \t\t\t@selection-change=\"handleSelectionChange\" max-height=\"440\" \n  \t\t\tstripe\n  \t\t\t highlight-current-row\n  \t\t @row-dblclick=\"showDetail\" \n  \t\t\t@row-click=\"selectRow\"\n  \t\t\t@expand=\"expand\"\n  \t\t\t>\t\t\t\n\t\t\t\t<slot></slot>\n\t\t\t</el-table>\n\t\t\t<el-pagination @size-change=\"handleSizeChange\"\n\t\t\t\t @current-change=\"handleCurrentChange\" :page-sizes=\"[100,50,20,10,5]\" \n\t\t\t\t :page-size=\"pageInfo.rows\" \n\t\t\t\t layout=\"total, sizes, prev, pager, next\" :total=\"totalLength\" :current-page=\"pageInfo.page\" v-if=\"pagination\">\n\t\t\t</el-pagination>\n\t\t\t</div>\n  "
  

});
 
 define('yls^./common/components/toolBtn.vue', function(require, exports, module) {

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
  
  exports["default"] = {
  	props: ["btnUrl", "btnState"],
  	name: "toolBtn",
  	data: function data() {
  		return {
  			btnGroup: [],
  			showMore: false
  		};
  	},
  	created: function created() {
  		var _this = this;
  
  		axios.get(this.btnUrl).then(function (response) {
  			_this.btnGroup = response.data;
  		});
  	},
  
  	methods: {
  		leaveout: function leaveout(ele) {
  			if (ele.relatedTarget) this.showMore = false;
  		},
  		handleCommand: function handleCommand(command) {
  			this.$parent[command]();
  		},
  		eventBus: function eventBus(btn) {
  			this.$parent[btn.btnValue](btn.btnName);
  			this.showMore = false;
  		}
  	}
  };
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"btn-group\">\n\n\t<template v-for=\"items in btnGroup\">\n\t\t<div class=\"el-button-group\" style=\"margin-left: 10px;\" v-if=\"items.length!=1\">\n\t\t\t<template v-for=\"group in items\">\n\t\t\t\t<div class=\"el-dropdown\" v-if=\"group.children\" @mouseleave=\"leaveout($event)\">\n\t\t\t\t\t<el-button  class=\"more-button\" @click=\"showMore=!showMore\">\n\t\t\t\t\t\t更多<i class=\"iconfont\">&#xe7ce;</i>\n\t\t\t\t\t</el-button>\n\t\t\t\t\t<ul  class=\"group-more\" v-show=\"showMore\">\n\t\t\t\t\t\t<li  v-for=\"dropBtn in group.children\" @click=\"eventBus(dropBtn)\">{{dropBtn.btnName}}</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div> \n\t\t\t\t<el-button  v-else @click=\"eventBus(group)\" :disabled=\"!btnState[group.btnValue]\" :key=\"group.btnValue\">\n\t\t\t\t\t<i :class=\"group.btnIcon\"></i>\n\t\t\t\t\t<span>{{group.btnName}}</span>\n\t\t\t\t</el-button>\n\t\t\t</template>\n\n\t\t</div>\n\t\t<el-button :type=\"items[0].btnValue=='addFun'?'primary':'default'\" v-else @click=\"eventBus(items[0])\" :class=\"items[0].btnType\" :disabled=\"!btnState[items[0].btnValue]\">\n\t\t\t<i :class=\"items[0].btnIcon\"></i>\n\t\t\t<span style=\"margin-left: 4px;\">{{items[0].btnName}}</span>\n\t\t</el-button>\n\t</template>\n\t\t\n\n\n\n</div>\n\n"
  

});
 
 define('yls^/src/apps/common/js/api', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _vue = require("yls^/node_modules/vue/dist/vue.runtime.common");
  
  var _vue2 = _interopRequireDefault(_vue);
  
  var _axios = require("yls^/node_modules/axios/index");
  
  var _axios2 = _interopRequireDefault(_axios);
  
  var _qs = require("yls^/node_modules/qs/lib/index");
  
  var _qs2 = _interopRequireDefault(_qs);
  
  var _bus = require("yls^/src/apps/common/js/bus");
  
  var _bus2 = _interopRequireDefault(_bus);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var defaultConf = {
  	/*
    	数据集合
    	@param {baseUrl} 需要提交的数据的地址
    	@param {formData} 提交的数据的
    	@param {params} 提交的额外的参数
    	@param {callbackMethods} 是否执行自定义的函数(false:不执行)
    * */
  	data: function data() {
  		return {
  			baseUrl: "",
  			formData: "",
  			currentTable: {},
  			currentComponent: {},
  			params: {},
  			callbackMethods: false
  		};
  	}
  };
  var successCallback = function successCallback(config) {
  	config.$message({
  		showClose: true,
  		message: '保存成功',
  		type: 'success',
  		duration: 1000
  	});
  	config.currentComponent.$emit("hide");
  	config.currentTable.loadTableData();
  };
  var errorCallback = function errorCallback(config) {
  	config.$message({
  		showClose: true,
  		message: '保存失败',
  		type: 'error',
  		duration: 1000
  	});
  	config.currentComponent.$emit("hide");
  	config.currentTable.loadTableData();
  };
  
  var successRemoveCallback = function successRemoveCallback(config) {
  	config.$message({
  		showClose: true,
  		message: '删除成功',
  		type: 'success',
  		duration: 1000
  	});
  	config.currentComponent.$emit("hide");
  	config.currentTable.loadTableData();
  };
  var errorRemoveCallback = function errorRemoveCallback(config) {
  	config.$message({
  		showClose: true,
  		message: '删除失败',
  		type: 'error',
  		duration: 1000
  	});
  	config.currentComponent.$emit("hide");
  	config.currentTable.loadTableData();
  };
  
  /*
   * 切换页面状态
   * @param {pageState} 页面状态的集合
   * @param {state} 编辑页或者详情页(true：编辑页)
   * */
  
  var _commitDataRemove = function _commitDataRemove(config) {
  
  	//vue提供的混合对象的方法，合并配置
  	var Config = new (_vue2["default"].extend({
  		mixins: [defaultConf, config]
  	}))();
  	//合并表单以及自定义参数
  	var data = Object.assign({}, Config.params, Config.formData);
  	/*
    axios提交数据*/
  	_axios2["default"].post(Config.baseUrl, _qs2["default"].stringify(data)).then(function (response) {
  		if (response.data.success) {
  			if (Config.callbackMethods) Config.onSaveSuccess(response.data);else {
  				successRemoveCallback(Config);
  			}
  		} else {
  			if (Config.callbackMethods) Config.onSaveError(response.data);else {
  				errorRemoveCallback(Config);
  			}
  		}
  		window.bus.$emit("load-tree");
  	})["catch"](function (error) {
  		if (Config.callbackMethods) Config.onSaveError(error);else {
  			errorRemoveCallback(Config);
  		}
  		window.bus.$emit("load-tree");
  	});
  };
  /*
   	提交数据
   	@param {config} 自定义参数配置
   * */
  var _commitData = function _commitData(config) {
  	//vue提供的混合对象的方法，合并配置
  	var Config = new (_vue2["default"].extend({
  		mixins: [defaultConf, config]
  	}))();
  	//合并表单以及自定义参数
  	var data = Object.assign({}, Config.params, Config.formData);
  	/*
    axios提交数据*/
  	_axios2["default"].post(Config.baseUrl, _qs2["default"].stringify(data)).then(function (response) {
  		debugger;
  		if (response.data.success) {
  			if (Config.callbackMethods) {
  				Config.onSaveSuccess(response.data);
  			} else {
  				successCallback(Config);
  			}
  			if (Config.afterSuccessSave) Config.afterSuccessSave(response.data);
  		} else {
  			if (Config.callbackMethods) {
  				Config.onSaveError(response);
  			} else {
  				errorCallback(Config);
  			}
  			if (Config.afterErrorSave) Config.afterErrorSave(response);
  		}
  		window.bus.$emit("load-tree");
  	})["catch"](function (error) {
  		if (Config.callbackMethods) Config.onSaveError(error);else errorCallback(Config);
  		window.bus.$emit("load-tree");
  	});
  };
  
  /**
   * 设置cookie
   * cookieName 
   * cookieValue
   * expiredays 有效期（天）
   */
  
  var _setCookie = function _setCookie(cookieName, cookieValue, expiredays) {
  	var exdate = new Date();
  	exdate.setDate(exdate.getDate() + expiredays);
  	document.cookie = cookieName + "=" + escape(cookieValue) + (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
  };
  
  /**
   * 根据cookieName取值
   */
  var _getCookie = function _getCookie(cookieName) {
  	if (document.cookie.length > 0) {
  		var cookieValue = document.cookie;
  		var c_start = cookieValue.indexOf(cookieName + "=");
  		if (c_start != -1) {
  			c_start = c_start + cookieName.length + 1;
  			var c_end = document.cookie.indexOf(";", c_start);
  			if (c_end == -1) c_end = cookieValue.length;
  			console.log(cookieValue);
  			return unescape(cookieValue.substring(c_start, c_end));
  		}
  	}
  	return "";
  };
  
  var _dicData = function _dicData(config) {
  	var pubDicTypeList = "";
  	for (var i = 0; i < config.dicType.pub.length; i++) {
  		pubDicTypeList += config.dicType.pub[i] + ",";
  	}
  
  	var praDicTypeList = "";
  	for (var i = 0; i < config.dicType.pra.length; i++) {
  		praDicTypeList += config.dicType.pra[i] + ",";
  	}
  
  	var param = {
  		"pubDic": pubDicTypeList,
  		"praDic": praDicTypeList
  	};
  	_axios2["default"].post(config.dicUrl, _qs2["default"].stringify(param)).then(function (response) {
  		config.callback(response.data);
  	});
  };
  
  /*
   	对外提供的接口
   * */
  exports["default"] = {
  	saveData: function saveData(config) {
  		_commitData(config);
  	},
  	removeData: function removeData(config) {
  		_commitDataRemove(config);
  	},
  	getDicData: function getDicData(config) {
  		_dicData(config);
  	},
  	setCookie: function setCookie(cookieName, cookieValue, expiredays) {
  		_setCookie(cookieName, cookieValue, expiredays);
  	},
  	getCookie: function getCookie(cookieName) {
  		return _getCookie(cookieName);
  	},
  
  	pageState: function pageState(active) {
  		this.active = active;
  		this.activearr = [active];
  		this.goNext = function (page, btnName) {
  			this.active = page;
  			this.activearr.push(page);
  			if (btnName) _bus2["default"].bus.$emit("setPage", true, btnName);else _bus2["default"].bus.$emit("setPage", true, "详情");
  		};
  		this.goBack = function () {
  			if (this.activearr.length === 1) return;
  			this.activearr.pop();
  			_bus2["default"].bus.$emit("setPage", false);
  			this.active = this.activearr[this.activearr.length - 1];
  		};
  	}
  };

});
 
 define('yls^/src/apps/common/js/bus', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _vue = require("yls^/node_modules/vue/dist/vue.runtime.common");
  
  var _vue2 = _interopRequireDefault(_vue);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var bus = new _vue2["default"]();
  /*
   		完整菜单信息的数据中心
   		@bus vue提供的非父子组件的一种数据通信方式
   		@route 完整菜单信息
   * */
  exports["default"] = {
    bus: bus,
    menu: []
  };

});
 
 define('yls^/src/apps/common/js/publicData', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  exports.ylsSale = exports.ylsBusi = exports.ylsBase = exports.pagination = exports.pubPageMethods = exports.pubSizes = exports.pubPageSizes = undefined;
  
  var _publicDataJson = require('yls^/src/apps/common/js/publicDataJson');
  
  var _publicDataJson2 = _interopRequireDefault(_publicDataJson);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  var pageSizes = _publicDataJson2["default"].page.pageSizes;
  var pageSize = function () {
          var pubScrHeight = window.screen.height;
          var pubSize = void 0;
          var storedSize = localStorage.getItem('yls-default-page-size');
          if (storedSize != null && pageSizes.includes(Number(storedSize))) {
                  //查找到存储的页显示条数且验证该页面存在页码数组中
                  pubSize = Number(storedSize);
          } else {
                  if (pubScrHeight < 900) {
                          //通过浏览器可视高度判断页页面显示条数
                          pubSize = _publicDataJson2["default"].page.pageSet.lowSet;
                  } else if (pubScrHeight >= 900 && pubScrHeight < 1000) {
                          pubSize = _publicDataJson2["default"].page.pageSet.midSet;
                  } else {
                          pubSize = _publicDataJson2["default"].page.pageSet.highSet;
                  }
          }
          return pubSize;
  }();
  function pubPageMethods() {
          var requestName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'request';
  
          var mixin = {
                  data: function data() {
                          return {
                                  pageSize: pageSize,
                                  pageSizes: pageSizes,
                                  currentPage: 1,
                                  totalElements: 0
                          };
                  },
  
                  methods: {
                          handleSizeChange: function handleSizeChange(val) {
                                  this.pageSize = val;
                                  localStorage.setItem('yls-default-page-size', this.pageSize);
                                  this.currentPage = 1;
                                  this[requestName](this.currentPage - 1, this.pageSize);
                          },
                          handleCurrentChange: function handleCurrentChange(val) {
                                  this.currentPage = val;
                                  this[requestName](this.currentPage - 1, this.pageSize);
                          },
                          changePage: function changePage(pageIndex) {
                                  this.currentPage = pageIndex;
                                  this[requestName](this.currentPage - 1, this.pageSize);
                          }
                  }
          };
          return mixin;
  }
  function pubSizes() {
          return pageSize;
  }
  var pagination = pubPageMethods;
  var pubPageSizes = pageSizes;
  var _publicData$baseUrl = _publicDataJson2["default"].baseUrl,
      ylsBase = _publicData$baseUrl.ylsBase,
      ylsBusi = _publicData$baseUrl.ylsBusi,
      ylsSale = _publicData$baseUrl.ylsSale;
  exports.pubPageSizes = pubPageSizes;
  exports.pubSizes = pubSizes;
  exports.pubPageMethods = pubPageMethods;
  exports.pagination = pagination;
  exports.ylsBase = ylsBase;
  exports.ylsBusi = ylsBusi;
  exports.ylsSale = ylsSale;

});
 
 define('yls^/src/apps/common/js/publicDataJson', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  var publicData = {
          page: {
                  pageSizes: [10, 20, 30, 40],
                  pageSet: {
                          lowSet: 10,
                          midSet: 10,
                          highSet: 20
                  }
          },
          baseUrl: {
                  ylsBase: '/yls-base-web/',
                  ylsBusi: '/yls-busi-web/',
                  ylsSale: '/yls-sale-web/'
          }
  };
  exports["default"] = publicData;

});
 
 define('yls^/src/apps/common/js/urlRoot', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  /**
   * Created by Administrator on 2017/5/19.
   */
  
  exports["default"] = {
    /**
     * url请求统一入口
     * @param url
     * @returns {string}
     */
    urlWepper: function urlWepper(url) {
      var urlroot = '/urlWepper';
      if (url.indexOf('/') === 0) {
        urlroot += url;
      } else {
        urlroot = urlroot + '/' + url;
      }
      return urlroot;
    }
  };

});
 
 define('yls^/node_modules/axios/index', function(require, exports, module) {

  module.exports = require('yls^/node_modules/axios/lib/axios');

});
 
 define('yls^/node_modules/axios/lib/adapters/xhr', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  var settle = require('yls^/node_modules/axios/lib/core/settle');
  var buildURL = require('yls^/node_modules/axios/lib/helpers/buildURL');
  var parseHeaders = require('yls^/node_modules/axios/lib/helpers/parseHeaders');
  var isURLSameOrigin = require('yls^/node_modules/axios/lib/helpers/isURLSameOrigin');
  var createError = require('yls^/node_modules/axios/lib/core/createError');
  var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || require('yls^/node_modules/axios/lib/helpers/btoa');
  
  module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;
  
      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }
  
      var request = new XMLHttpRequest();
      var loadEvent = 'onreadystatechange';
      var xDomain = false;
  
      // For IE 8/9 CORS support
      // Only supports POST and GET calls and doesn't returns the response headers.
      // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
      if ('development' !== 'test' &&
          typeof window !== 'undefined' &&
          window.XDomainRequest && !('withCredentials' in request) &&
          !isURLSameOrigin(config.url)) {
        request = new window.XDomainRequest();
        loadEvent = 'onload';
        xDomain = true;
        request.onprogress = function handleProgress() {};
        request.ontimeout = function handleTimeout() {};
      }
  
      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }
  
      request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
  
      // Set the request timeout in MS
      request.timeout = config.timeout;
  
      // Listen for ready state
      request[loadEvent] = function handleLoad() {
        if (!request || (request.readyState !== 4 && !xDomain)) {
          return;
        }
  
        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
  
        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
          status: request.status === 1223 ? 204 : request.status,
          statusText: request.status === 1223 ? 'No Content' : request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };
  
        settle(resolve, reject, response);
  
        // Clean up request
        request = null;
      };
  
      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config));
  
        // Clean up request
        request = null;
      };
  
      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED'));
  
        // Clean up request
        request = null;
      };
  
      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        var cookies = require('yls^/node_modules/axios/lib/helpers/cookies');
  
        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
            cookies.read(config.xsrfCookieName) :
            undefined;
  
        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }
  
      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }
  
      // Add withCredentials to request if needed
      if (config.withCredentials) {
        request.withCredentials = true;
      }
  
      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }
  
      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }
  
      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }
  
      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }
  
          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }
  
      if (requestData === undefined) {
        requestData = null;
      }
  
      // Send the request
      request.send(requestData);
    });
  };
  

});
 
 define('yls^/node_modules/axios/lib/axios', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  var bind = require('yls^/node_modules/axios/lib/helpers/bind');
  var Axios = require('yls^/node_modules/axios/lib/core/Axios');
  var defaults = require('yls^/node_modules/axios/lib/defaults');
  
  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
  
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
  
    // Copy context to instance
    utils.extend(instance, context);
  
    return instance;
  }
  
  // Create the default instance to be exported
  var axios = createInstance(defaults);
  
  // Expose Axios class to allow class inheritance
  axios.Axios = Axios;
  
  // Factory for creating new instances
  axios.create = function create(instanceConfig) {
    return createInstance(utils.merge(defaults, instanceConfig));
  };
  
  // Expose Cancel & CancelToken
  axios.Cancel = require('yls^/node_modules/axios/lib/cancel/Cancel');
  axios.CancelToken = require('yls^/node_modules/axios/lib/cancel/CancelToken');
  axios.isCancel = require('yls^/node_modules/axios/lib/cancel/isCancel');
  
  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = require('yls^/node_modules/axios/lib/helpers/spread');
  
  module.exports = axios;
  
  // Allow use of default import syntax in TypeScript
  module.exports.default = axios;
  

});
 
 define('yls^/node_modules/axios/lib/cancel/Cancel', function(require, exports, module) {

  'use strict';
  
  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel(message) {
    this.message = message;
  }
  
  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };
  
  Cancel.prototype.__CANCEL__ = true;
  
  module.exports = Cancel;
  

});
 
 define('yls^/node_modules/axios/lib/cancel/CancelToken', function(require, exports, module) {

  'use strict';
  
  var Cancel = require('yls^/node_modules/axios/lib/cancel/Cancel');
  
  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }
  
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
  
    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }
  
      token.reason = new Cancel(message);
      resolvePromise(token.reason);
    });
  }
  
  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };
  
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };
  
  module.exports = CancelToken;
  

});
 
 define('yls^/node_modules/axios/lib/cancel/isCancel', function(require, exports, module) {

  'use strict';
  
  module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };
  

});
 
 define('yls^/node_modules/axios/lib/core/Axios', function(require, exports, module) {

  'use strict';
  
  var defaults = require('yls^/node_modules/axios/lib/defaults');
  var utils = require('yls^/node_modules/axios/lib/utils');
  var InterceptorManager = require('yls^/node_modules/axios/lib/core/InterceptorManager');
  var dispatchRequest = require('yls^/node_modules/axios/lib/core/dispatchRequest');
  var isAbsoluteURL = require('yls^/node_modules/axios/lib/helpers/isAbsoluteURL');
  var combineURLs = require('yls^/node_modules/axios/lib/helpers/combineURLs');
  
  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  
  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = utils.merge({
        url: arguments[0]
      }, arguments[1]);
    }
  
    config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
  
    // Support baseURL config
    if (config.baseURL && !isAbsoluteURL(config.url)) {
      config.url = combineURLs(config.baseURL, config.url);
    }
  
    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);
  
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
  
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });
  
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }
  
    return promise;
  };
  
  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url
      }));
    };
  });
  
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });
  
  module.exports = Axios;
  

});
 
 define('yls^/node_modules/axios/lib/core/InterceptorManager', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  function InterceptorManager() {
    this.handlers = [];
  }
  
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };
  
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };
  
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };
  
  module.exports = InterceptorManager;
  

});
 
 define('yls^/node_modules/axios/lib/core/createError', function(require, exports, module) {

  'use strict';
  
  var enhanceError = require('yls^/node_modules/axios/lib/core/enhanceError');
  
  /**
   * Create an Error with the specified message, config, error code, and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   @ @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  module.exports = function createError(message, config, code, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, response);
  };
  

});
 
 define('yls^/node_modules/axios/lib/core/dispatchRequest', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  var transformData = require('yls^/node_modules/axios/lib/core/transformData');
  var isCancel = require('yls^/node_modules/axios/lib/cancel/isCancel');
  var defaults = require('yls^/node_modules/axios/lib/defaults');
  
  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }
  
  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
  
    // Ensure headers exist
    config.headers = config.headers || {};
  
    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );
  
    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers || {}
    );
  
    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );
  
    var adapter = config.adapter || defaults.adapter;
  
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
  
      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );
  
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);
  
        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }
  
      return Promise.reject(reason);
    });
  };
  

});
 
 define('yls^/node_modules/axios/lib/core/enhanceError', function(require, exports, module) {

  'use strict';
  
  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   @ @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  module.exports = function enhanceError(error, config, code, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }
    error.response = response;
    return error;
  };
  

});
 
 define('yls^/node_modules/axios/lib/core/settle', function(require, exports, module) {

  'use strict';
  
  var createError = require('yls^/node_modules/axios/lib/core/createError');
  
  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    // Note: status is not exposed by XDomainRequest
    if (!response.status || !validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response
      ));
    }
  };
  

});
 
 define('yls^/node_modules/axios/lib/core/transformData', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  module.exports = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });
  
    return data;
  };
  

});
 
 define('yls^/node_modules/axios/lib/defaults', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  var normalizeHeaderName = require('yls^/node_modules/axios/lib/helpers/normalizeHeaderName');
  
  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  
  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }
  
  function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = require('yls^/node_modules/axios/lib/adapters/xhr');
    } else if ("undefined" !== 'undefined') {
      // For node use HTTP adapter
      adapter = require('yls^/node_modules/axios/lib/adapters/xhr');
    }
    return adapter;
  }
  
  var defaults = {
    adapter: getDefaultAdapter(),
  
    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Content-Type');
      if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],
  
    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }],
  
    timeout: 0,
  
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
  
    maxContentLength: -1,
  
    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };
  
  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };
  
  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });
  
  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });
  
  module.exports = defaults;
  

});
 
 define('yls^/node_modules/axios/lib/helpers/bind', function(require, exports, module) {

  'use strict';
  
  module.exports = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };
  

});
 
 define('yls^/node_modules/axios/lib/helpers/btoa', function(require, exports, module) {

  'use strict';
  
  // btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
  
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
  function E() {
    this.message = 'String contains an invalid character';
  }
  E.prototype = new Error;
  E.prototype.code = 5;
  E.prototype.name = 'InvalidCharacterError';
  
  function btoa(input) {
    var str = String(input);
    var output = '';
    for (
      // initialize result and counter
      var block, charCode, idx = 0, map = chars;
      // if the next str index does not exist:
      //   change the mapping table to "="
      //   check if d has no fractional digits
      str.charAt(idx | 0) || (map = '=', idx % 1);
      // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
      output += map.charAt(63 & block >> 8 - idx % 1 * 8)
    ) {
      charCode = str.charCodeAt(idx += 3 / 4);
      if (charCode > 0xFF) {
        throw new E();
      }
      block = block << 8 | charCode;
    }
    return output;
  }
  
  module.exports = btoa;
  

});
 
 define('yls^/node_modules/axios/lib/helpers/buildURL', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  function encode(val) {
    return encodeURIComponent(val).
      replace(/%40/gi, '@').
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }
  
  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }
  
    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];
  
      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }
  
        if (utils.isArray(val)) {
          key = key + '[]';
        }
  
        if (!utils.isArray(val)) {
          val = [val];
        }
  
        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });
  
      serializedParams = parts.join('&');
    }
  
    if (serializedParams) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
  
    return url;
  };
  

});
 
 define('yls^/node_modules/axios/lib/helpers/combineURLs', function(require, exports, module) {

  'use strict';
  
  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };
  

});
 
 define('yls^/node_modules/axios/lib/helpers/cookies', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  module.exports = (
    utils.isStandardBrowserEnv() ?
  
    // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));
  
          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }
  
          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }
  
          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }
  
          if (secure === true) {
            cookie.push('secure');
          }
  
          document.cookie = cookie.join('; ');
        },
  
        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },
  
        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :
  
    // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
  );
  

});
 
 define('yls^/node_modules/axios/lib/helpers/isAbsoluteURL', function(require, exports, module) {

  'use strict';
  
  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };
  

});
 
 define('yls^/node_modules/axios/lib/helpers/isURLSameOrigin', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  module.exports = (
    utils.isStandardBrowserEnv() ?
  
    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;
  
      /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
      function resolveURL(url) {
        var href = url;
  
        if (msie) {
          // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }
  
        urlParsingNode.setAttribute('href', href);
  
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                    urlParsingNode.pathname :
                    '/' + urlParsingNode.pathname
        };
      }
  
      originURL = resolveURL(window.location.href);
  
      /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
      };
    })() :
  
    // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
  );
  

});
 
 define('yls^/node_modules/axios/lib/helpers/normalizeHeaderName', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };
  

});
 
 define('yls^/node_modules/axios/lib/helpers/parseHeaders', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/axios/lib/utils');
  
  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
  
    if (!headers) { return parsed; }
  
    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));
  
      if (key) {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    });
  
    return parsed;
  };
  

});
 
 define('yls^/node_modules/axios/lib/helpers/spread', function(require, exports, module) {

  'use strict';
  
  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  module.exports = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };
  

});
 
 define('yls^/node_modules/axios/lib/utils', function(require, exports, module) {

  var Buffer = require("buffer").Buffer;
  Buffer.isBuffer = require("yls^/node_modules/is-buffer/index");
  'use strict';
  
  var bind = require('yls^/node_modules/axios/lib/helpers/bind');
  
  /*global toString:true*/
  
  // utils is a library of generic helper functions non-specific to axios
  
  var toString = Object.prototype.toString;
  
  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }
  
  /**
   * Determine if a value is a Node Buffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Node Buffer, otherwise false
   */
  function isBuffer(val) {
    return ((typeof Buffer !== 'undefined') && (Buffer.isBuffer) && (Buffer.isBuffer(val)));
  }
  
  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }
  
  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
  }
  
  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
  }
  
  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }
  
  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }
  
  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }
  
  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }
  
  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }
  
  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }
  
  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }
  
  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }
  
  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  
  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }
  
  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }
  
  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }
  
  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }
  
    // Force an array if not already something iterable
    if (typeof obj !== 'object' && !isArray(obj)) {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }
  
    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  
  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }
  
    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  
  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  
  module.exports = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim
  };
  

});
 
 define('yls^/node_modules/is-buffer/index', function(require, exports, module) {

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */
  
  // The _isBuffer check is for Safari 5-7 support, because it's missing
  // Object.prototype.constructor. Remove this eventually
  module.exports = function (obj) {
    return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
  }
  
  function isBuffer (obj) {
    return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  }
  
  // For Node v0.10 support. Remove this eventually.
  function isSlowBuffer (obj) {
    return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
  }
  

});
 
 define('yls^/node_modules/qs/lib/formats', function(require, exports, module) {

  'use strict';
  
  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;
  
  module.exports = {
      'default': 'RFC3986',
      formatters: {
          RFC1738: function (value) {
              return replace.call(value, percentTwenties, '+');
          },
          RFC3986: function (value) {
              return value;
          }
      },
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
  };
  

});
 
 define('yls^/node_modules/qs/lib/index', function(require, exports, module) {

  'use strict';
  
  var stringify = require('yls^/node_modules/qs/lib/stringify');
  var parse = require('yls^/node_modules/qs/lib/parse');
  var formats = require('yls^/node_modules/qs/lib/formats');
  
  module.exports = {
      formats: formats,
      parse: parse,
      stringify: stringify
  };
  

});
 
 define('yls^/node_modules/qs/lib/parse', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/qs/lib/utils');
  
  var has = Object.prototype.hasOwnProperty;
  
  var defaults = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      decoder: utils.decode,
      delimiter: '&',
      depth: 5,
      parameterLimit: 1000,
      plainObjects: false,
      strictNullHandling: false
  };
  
  var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);
  
      for (var i = 0; i < parts.length; ++i) {
          var part = parts[i];
          var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;
  
          var key, val;
          if (pos === -1) {
              key = options.decoder(part);
              val = options.strictNullHandling ? null : '';
          } else {
              key = options.decoder(part.slice(0, pos));
              val = options.decoder(part.slice(pos + 1));
          }
          if (has.call(obj, key)) {
              obj[key] = [].concat(obj[key]).concat(val);
          } else {
              obj[key] = val;
          }
      }
  
      return obj;
  };
  
  var parseObject = function parseObjectRecursive(chain, val, options) {
      if (!chain.length) {
          return val;
      }
  
      var root = chain.shift();
  
      var obj;
      if (root === '[]') {
          obj = [];
          obj = obj.concat(parseObject(chain, val, options));
      } else {
          obj = options.plainObjects ? Object.create(null) : {};
          var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (
              !isNaN(index) &&
              root !== cleanRoot &&
              String(index) === cleanRoot &&
              index >= 0 &&
              (options.parseArrays && index <= options.arrayLimit)
          ) {
              obj = [];
              obj[index] = parseObject(chain, val, options);
          } else {
              obj[cleanRoot] = parseObject(chain, val, options);
          }
      }
  
      return obj;
  };
  
  var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
      if (!givenKey) {
          return;
      }
  
      // Transform dot notation to bracket notation
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;
  
      // The regex chunks
  
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
  
      // Get the parent
  
      var segment = brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
  
      // Stash the parent if it exists
  
      var keys = [];
      if (parent) {
          // If we aren't using plain objects, optionally prefix keys
          // that would overwrite object prototype properties
          if (!options.plainObjects && has.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
  
          keys.push(parent);
      }
  
      // Loop through children appending to the array until we hit depth
  
      var i = 0;
      while ((segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
          keys.push(segment[1]);
      }
  
      // If there's a remainder, just add whatever is left
  
      if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
      }
  
      return parseObject(keys, val, options);
  };
  
  module.exports = function (str, opts) {
      var options = opts || {};
  
      if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
      }
  
      options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
      options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
      options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
      options.parseArrays = options.parseArrays !== false;
      options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
      options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
      options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
      options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
      options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
      options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
  
      if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
      }
  
      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};
  
      // Iterate over the keys and setup the new object
  
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options);
          obj = utils.merge(obj, newObj, options);
      }
  
      return utils.compact(obj);
  };
  

});
 
 define('yls^/node_modules/qs/lib/stringify', function(require, exports, module) {

  'use strict';
  
  var utils = require('yls^/node_modules/qs/lib/utils');
  var formats = require('yls^/node_modules/qs/lib/formats');
  
  var arrayPrefixGenerators = {
      brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
          return prefix + '[]';
      },
      indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
          return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
          return prefix;
      }
  };
  
  var toISO = Date.prototype.toISOString;
  
  var defaults = {
      delimiter: '&',
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
          return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
  };
  
  var stringify = function stringify( // eslint-disable-line func-name-matching
      object,
      prefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      formatter,
      encodeValuesOnly
  ) {
      var obj = object;
      if (typeof filter === 'function') {
          obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
          obj = serializeDate(obj);
      } else if (obj === null) {
          if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix) : prefix;
          }
  
          obj = '';
      }
  
      if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
          if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix);
              return [formatter(keyValue) + '=' + formatter(encoder(obj))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
      }
  
      var values = [];
  
      if (typeof obj === 'undefined') {
          return values;
      }
  
      var objKeys;
      if (Array.isArray(filter)) {
          objKeys = filter;
      } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
      }
  
      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
  
          if (skipNulls && obj[key] === null) {
              continue;
          }
  
          if (Array.isArray(obj)) {
              values = values.concat(stringify(
                  obj[key],
                  generateArrayPrefix(prefix, key),
                  generateArrayPrefix,
                  strictNullHandling,
                  skipNulls,
                  encoder,
                  filter,
                  sort,
                  allowDots,
                  serializeDate,
                  formatter,
                  encodeValuesOnly
              ));
          } else {
              values = values.concat(stringify(
                  obj[key],
                  prefix + (allowDots ? '.' + key : '[' + key + ']'),
                  generateArrayPrefix,
                  strictNullHandling,
                  skipNulls,
                  encoder,
                  filter,
                  sort,
                  allowDots,
                  serializeDate,
                  formatter,
                  encodeValuesOnly
              ));
          }
      }
  
      return values;
  };
  
  module.exports = function (object, opts) {
      var obj = object;
      var options = opts || {};
  
      if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
      }
  
      var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
      var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
      var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
      var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
      var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
      var sort = typeof options.sort === 'function' ? options.sort : null;
      var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
      var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
      var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
      if (typeof options.format === 'undefined') {
          options.format = formats.default;
      } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
          throw new TypeError('Unknown format option provided.');
      }
      var formatter = formats.formatters[options.format];
      var objKeys;
      var filter;
  
      if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
      } else if (Array.isArray(options.filter)) {
          filter = options.filter;
          objKeys = filter;
      }
  
      var keys = [];
  
      if (typeof obj !== 'object' || obj === null) {
          return '';
      }
  
      var arrayFormat;
      if (options.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = options.arrayFormat;
      } else if ('indices' in options) {
          arrayFormat = options.indices ? 'indices' : 'repeat';
      } else {
          arrayFormat = 'indices';
      }
  
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
  
      if (!objKeys) {
          objKeys = Object.keys(obj);
      }
  
      if (sort) {
          objKeys.sort(sort);
      }
  
      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
  
          if (skipNulls && obj[key] === null) {
              continue;
          }
  
          keys = keys.concat(stringify(
              obj[key],
              key,
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encode ? encoder : null,
              filter,
              sort,
              allowDots,
              serializeDate,
              formatter,
              encodeValuesOnly
          ));
      }
  
      return keys.join(delimiter);
  };
  

});
 
 define('yls^/node_modules/qs/lib/utils', function(require, exports, module) {

  'use strict';
  
  var has = Object.prototype.hasOwnProperty;
  
  var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }
  
      return array;
  }());
  
  exports.arrayToObject = function (source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
              obj[i] = source[i];
          }
      }
  
      return obj;
  };
  
  exports.merge = function (target, source, options) {
      if (!source) {
          return target;
      }
  
      if (typeof source !== 'object') {
          if (Array.isArray(target)) {
              target.push(source);
          } else if (typeof target === 'object') {
              if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                  target[source] = true;
              }
          } else {
              return [target, source];
          }
  
          return target;
      }
  
      if (typeof target !== 'object') {
          return [target].concat(source);
      }
  
      var mergeTarget = target;
      if (Array.isArray(target) && !Array.isArray(source)) {
          mergeTarget = exports.arrayToObject(target, options);
      }
  
      if (Array.isArray(target) && Array.isArray(source)) {
          source.forEach(function (item, i) {
              if (has.call(target, i)) {
                  if (target[i] && typeof target[i] === 'object') {
                      target[i] = exports.merge(target[i], item, options);
                  } else {
                      target.push(item);
                  }
              } else {
                  target[i] = item;
              }
          });
          return target;
      }
  
      return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];
  
          if (Object.prototype.hasOwnProperty.call(acc, key)) {
              acc[key] = exports.merge(acc[key], value, options);
          } else {
              acc[key] = value;
          }
          return acc;
      }, mergeTarget);
  };
  
  exports.decode = function (str) {
      try {
          return decodeURIComponent(str.replace(/\+/g, ' '));
      } catch (e) {
          return str;
      }
  };
  
  exports.encode = function (str) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
          return str;
      }
  
      var string = typeof str === 'string' ? str : String(str);
  
      var out = '';
      for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);
  
          if (
              c === 0x2D || // -
              c === 0x2E || // .
              c === 0x5F || // _
              c === 0x7E || // ~
              (c >= 0x30 && c <= 0x39) || // 0-9
              (c >= 0x41 && c <= 0x5A) || // a-z
              (c >= 0x61 && c <= 0x7A) // A-Z
          ) {
              out += string.charAt(i);
              continue;
          }
  
          if (c < 0x80) {
              out = out + hexTable[c];
              continue;
          }
  
          if (c < 0x800) {
              out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }
  
          if (c < 0xD800 || c >= 0xE000) {
              out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }
  
          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
      }
  
      return out;
  };
  
  exports.compact = function (obj, references) {
      if (typeof obj !== 'object' || obj === null) {
          return obj;
      }
  
      var refs = references || [];
      var lookup = refs.indexOf(obj);
      if (lookup !== -1) {
          return refs[lookup];
      }
  
      refs.push(obj);
  
      if (Array.isArray(obj)) {
          var compacted = [];
  
          for (var i = 0; i < obj.length; ++i) {
              if (obj[i] && typeof obj[i] === 'object') {
                  compacted.push(exports.compact(obj[i], refs));
              } else if (typeof obj[i] !== 'undefined') {
                  compacted.push(obj[i]);
              }
          }
  
          return compacted;
      }
  
      var keys = Object.keys(obj);
      keys.forEach(function (key) {
          obj[key] = exports.compact(obj[key], refs);
      });
  
      return obj;
  };
  
  exports.isRegExp = function (obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
  };
  
  exports.isBuffer = function (obj) {
      if (obj === null || typeof obj === 'undefined') {
          return false;
      }
  
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };
  

});
 
 define('yls^/node_modules/vue/dist/vue.runtime.common', function(require, exports, module) {

  var global = typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};
  /*!
   * Vue.js v2.2.6
   * (c) 2014-2017 Evan You
   * Released under the MIT License.
   */
  'use strict';
  
  /*  */
  
  /**
   * Convert a value to a string that is actually rendered.
   */
  function _toString (val) {
    return val == null
      ? ''
      : typeof val === 'object'
        ? JSON.stringify(val, null, 2)
        : String(val)
  }
  
  /**
   * Convert a input value to a number for persistence.
   * If the conversion fails, return original string.
   */
  function toNumber (val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n
  }
  
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   */
  function makeMap (
    str,
    expectsLowerCase
  ) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase
      ? function (val) { return map[val.toLowerCase()]; }
      : function (val) { return map[val]; }
  }
  
  /**
   * Check if a tag is a built-in tag.
   */
  var isBuiltInTag = makeMap('slot,component', true);
  
  /**
   * Remove an item from an array
   */
  function remove (arr, item) {
    if (arr.length) {
      var index = arr.indexOf(item);
      if (index > -1) {
        return arr.splice(index, 1)
      }
    }
  }
  
  /**
   * Check whether the object has the property.
   */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  }
  
  /**
   * Check if value is primitive
   */
  function isPrimitive (value) {
    return typeof value === 'string' || typeof value === 'number'
  }
  
  /**
   * Create a cached version of a pure function.
   */
  function cached (fn) {
    var cache = Object.create(null);
    return (function cachedFn (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str))
    })
  }
  
  /**
   * Camelize a hyphen-delimited string.
   */
  var camelizeRE = /-(\w)/g;
  var camelize = cached(function (str) {
    return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
  });
  
  /**
   * Capitalize a string.
   */
  var capitalize = cached(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  });
  
  /**
   * Hyphenate a camelCase string.
   */
  var hyphenateRE = /([^-])([A-Z])/g;
  var hyphenate = cached(function (str) {
    return str
      .replace(hyphenateRE, '$1-$2')
      .replace(hyphenateRE, '$1-$2')
      .toLowerCase()
  });
  
  /**
   * Simple bind, faster than native
   */
  function bind (fn, ctx) {
    function boundFn (a) {
      var l = arguments.length;
      return l
        ? l > 1
          ? fn.apply(ctx, arguments)
          : fn.call(ctx, a)
        : fn.call(ctx)
    }
    // record original fn length
    boundFn._length = fn.length;
    return boundFn
  }
  
  /**
   * Convert an Array-like object to a real Array.
   */
  function toArray (list, start) {
    start = start || 0;
    var i = list.length - start;
    var ret = new Array(i);
    while (i--) {
      ret[i] = list[i + start];
    }
    return ret
  }
  
  /**
   * Mix properties into target object.
   */
  function extend (to, _from) {
    for (var key in _from) {
      to[key] = _from[key];
    }
    return to
  }
  
  /**
   * Quick object check - this is primarily used to tell
   * Objects from primitive values when we know the value
   * is a JSON-compliant type.
   */
  function isObject (obj) {
    return obj !== null && typeof obj === 'object'
  }
  
  /**
   * Strict object type check. Only returns true
   * for plain JavaScript objects.
   */
  var toString = Object.prototype.toString;
  var OBJECT_STRING = '[object Object]';
  function isPlainObject (obj) {
    return toString.call(obj) === OBJECT_STRING
  }
  
  /**
   * Merge an Array of Objects into a single Object.
   */
  function toObject (arr) {
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) {
        extend(res, arr[i]);
      }
    }
    return res
  }
  
  /**
   * Perform no operation.
   */
  function noop () {}
  
  /**
   * Always return false.
   */
  var no = function () { return false; };
  
  /**
   * Return same value
   */
  var identity = function (_) { return _; };
  
  /**
   * Generate a static keys string from compiler modules.
   */
  
  
  /**
   * Check if two values are loosely equal - that is,
   * if they are plain objects, do they have the same shape?
   */
  function looseEqual (a, b) {
    var isObjectA = isObject(a);
    var isObjectB = isObject(b);
    if (isObjectA && isObjectB) {
      try {
        return JSON.stringify(a) === JSON.stringify(b)
      } catch (e) {
        // possible circular reference
        return a === b
      }
    } else if (!isObjectA && !isObjectB) {
      return String(a) === String(b)
    } else {
      return false
    }
  }
  
  function looseIndexOf (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (looseEqual(arr[i], val)) { return i }
    }
    return -1
  }
  
  /**
   * Ensure a function is called only once.
   */
  function once (fn) {
    var called = false;
    return function () {
      if (!called) {
        called = true;
        fn();
      }
    }
  }
  
  /*  */
  
  var config = {
    /**
     * Option merge strategies (used in core/util/options)
     */
    optionMergeStrategies: Object.create(null),
  
    /**
     * Whether to suppress warnings.
     */
    silent: false,
  
    /**
     * Show production mode tip message on boot?
     */
    productionTip: 'development' !== 'production',
  
    /**
     * Whether to enable devtools
     */
    devtools: 'development' !== 'production',
  
    /**
     * Whether to record perf
     */
    performance: false,
  
    /**
     * Error handler for watcher errors
     */
    errorHandler: null,
  
    /**
     * Ignore certain custom elements
     */
    ignoredElements: [],
  
    /**
     * Custom user key aliases for v-on
     */
    keyCodes: Object.create(null),
  
    /**
     * Check if a tag is reserved so that it cannot be registered as a
     * component. This is platform-dependent and may be overwritten.
     */
    isReservedTag: no,
  
    /**
     * Check if a tag is an unknown element.
     * Platform-dependent.
     */
    isUnknownElement: no,
  
    /**
     * Get the namespace of an element
     */
    getTagNamespace: noop,
  
    /**
     * Parse the real tag name for the specific platform.
     */
    parsePlatformTagName: identity,
  
    /**
     * Check if an attribute must be bound using property, e.g. value
     * Platform-dependent.
     */
    mustUseProp: no,
  
    /**
     * List of asset types that a component can own.
     */
    _assetTypes: [
      'component',
      'directive',
      'filter'
    ],
  
    /**
     * List of lifecycle hooks.
     */
    _lifecycleHooks: [
      'beforeCreate',
      'created',
      'beforeMount',
      'mounted',
      'beforeUpdate',
      'updated',
      'beforeDestroy',
      'destroyed',
      'activated',
      'deactivated'
    ],
  
    /**
     * Max circular updates allowed in a scheduler flush cycle.
     */
    _maxUpdateCount: 100
  };
  
  /*  */
  
  var emptyObject = Object.freeze({});
  
  /**
   * Check if a string starts with $ or _
   */
  function isReserved (str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F
  }
  
  /**
   * Define a property.
   */
  function def (obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
      value: val,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  }
  
  /**
   * Parse simple path.
   */
  var bailRE = /[^\w.$]/;
  function parsePath (path) {
    if (bailRE.test(path)) {
      return
    }
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
  
  /*  */
  /* globals MutationObserver */
  
  // can we use __proto__?
  var hasProto = '__proto__' in {};
  
  // Browser environment sniffing
  var inBrowser = typeof window !== 'undefined';
  var UA = inBrowser && window.navigator.userAgent.toLowerCase();
  var isIE = UA && /msie|trident/.test(UA);
  var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
  var isEdge = UA && UA.indexOf('edge/') > 0;
  var isAndroid = UA && UA.indexOf('android') > 0;
  var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
  var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
  
  // this needs to be lazy-evaled because vue may be required before
  // vue-server-renderer can set VUE_ENV
  var _isServer;
  var isServerRendering = function () {
    if (_isServer === undefined) {
      /* istanbul ignore if */
      if (!inBrowser && typeof global !== 'undefined') {
        // detect presence of vue-server-renderer and avoid
        // Webpack shimming the process
        _isServer = global['process'].env.VUE_ENV === 'server';
      } else {
        _isServer = false;
      }
    }
    return _isServer
  };
  
  // detect devtools
  var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  
  /* istanbul ignore next */
  function isNative (Ctor) {
    return /native code/.test(Ctor.toString())
  }
  
  var hasSymbol =
    typeof Symbol !== 'undefined' && isNative(Symbol) &&
    typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
  
  /**
   * Defer a task to execute it asynchronously.
   */
  var nextTick = (function () {
    var callbacks = [];
    var pending = false;
    var timerFunc;
  
    function nextTickHandler () {
      pending = false;
      var copies = callbacks.slice(0);
      callbacks.length = 0;
      for (var i = 0; i < copies.length; i++) {
        copies[i]();
      }
    }
  
    // the nextTick behavior leverages the microtask queue, which can be accessed
    // via either native Promise.then or MutationObserver.
    // MutationObserver has wider support, however it is seriously bugged in
    // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
    // completely stops working after triggering a few times... so, if native
    // Promise is available, we will use it:
    /* istanbul ignore if */
    if (typeof Promise !== 'undefined' && isNative(Promise)) {
      var p = Promise.resolve();
      var logError = function (err) { console.error(err); };
      timerFunc = function () {
        p.then(nextTickHandler).catch(logError);
        // in problematic UIWebViews, Promise.then doesn't completely break, but
        // it can get stuck in a weird state where callbacks are pushed into the
        // microtask queue but the queue isn't being flushed, until the browser
        // needs to do some other work, e.g. handle a timer. Therefore we can
        // "force" the microtask queue to be flushed by adding an empty timer.
        if (isIOS) { setTimeout(noop); }
      };
    } else if (typeof MutationObserver !== 'undefined' && (
      isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
      // use MutationObserver where native Promise is not available,
      // e.g. PhantomJS IE11, iOS7, Android 4.4
      var counter = 1;
      var observer = new MutationObserver(nextTickHandler);
      var textNode = document.createTextNode(String(counter));
      observer.observe(textNode, {
        characterData: true
      });
      timerFunc = function () {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
      };
    } else {
      // fallback to setTimeout
      /* istanbul ignore next */
      timerFunc = function () {
        setTimeout(nextTickHandler, 0);
      };
    }
  
    return function queueNextTick (cb, ctx) {
      var _resolve;
      callbacks.push(function () {
        if (cb) { cb.call(ctx); }
        if (_resolve) { _resolve(ctx); }
      });
      if (!pending) {
        pending = true;
        timerFunc();
      }
      if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
          _resolve = resolve;
        })
      }
    }
  })();
  
  var _Set;
  /* istanbul ignore if */
  if (typeof Set !== 'undefined' && isNative(Set)) {
    // use native Set when available.
    _Set = Set;
  } else {
    // a non-standard Set polyfill that only works with primitive keys.
    _Set = (function () {
      function Set () {
        this.set = Object.create(null);
      }
      Set.prototype.has = function has (key) {
        return this.set[key] === true
      };
      Set.prototype.add = function add (key) {
        this.set[key] = true;
      };
      Set.prototype.clear = function clear () {
        this.set = Object.create(null);
      };
  
      return Set;
    }());
  }
  
  var warn = noop;
  var tip = noop;
  var formatComponentName;
  
  if ('development' !== 'production') {
    var hasConsole = typeof console !== 'undefined';
    var classifyRE = /(?:^|[-_])(\w)/g;
    var classify = function (str) { return str
      .replace(classifyRE, function (c) { return c.toUpperCase(); })
      .replace(/[-_]/g, ''); };
  
    warn = function (msg, vm) {
      if (hasConsole && (!config.silent)) {
        console.error("[Vue warn]: " + msg + " " + (
          vm ? formatLocation(formatComponentName(vm)) : ''
        ));
      }
    };
  
    tip = function (msg, vm) {
      if (hasConsole && (!config.silent)) {
        console.warn("[Vue tip]: " + msg + " " + (
          vm ? formatLocation(formatComponentName(vm)) : ''
        ));
      }
    };
  
    formatComponentName = function (vm, includeFile) {
      if (vm.$root === vm) {
        return '<Root>'
      }
      var name = typeof vm === 'string'
        ? vm
        : typeof vm === 'function' && vm.options
          ? vm.options.name
          : vm._isVue
            ? vm.$options.name || vm.$options._componentTag
            : vm.name;
  
      var file = vm._isVue && vm.$options.__file;
      if (!name && file) {
        var match = file.match(/([^/\\]+)\.vue$/);
        name = match && match[1];
      }
  
      return (
        (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
        (file && includeFile !== false ? (" at " + file) : '')
      )
    };
  
    var formatLocation = function (str) {
      if (str === "<Anonymous>") {
        str += " - use the \"name\" option for better debugging messages.";
      }
      return ("\n(found in " + str + ")")
    };
  }
  
  /*  */
  
  
  var uid$1 = 0;
  
  /**
   * A dep is an observable that can have multiple
   * directives subscribing to it.
   */
  var Dep = function Dep () {
    this.id = uid$1++;
    this.subs = [];
  };
  
  Dep.prototype.addSub = function addSub (sub) {
    this.subs.push(sub);
  };
  
  Dep.prototype.removeSub = function removeSub (sub) {
    remove(this.subs, sub);
  };
  
  Dep.prototype.depend = function depend () {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  };
  
  Dep.prototype.notify = function notify () {
    // stabilize the subscriber list first
    var subs = this.subs.slice();
    for (var i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  };
  
  // the current target watcher being evaluated.
  // this is globally unique because there could be only one
  // watcher being evaluated at any time.
  Dep.target = null;
  var targetStack = [];
  
  function pushTarget (_target) {
    if (Dep.target) { targetStack.push(Dep.target); }
    Dep.target = _target;
  }
  
  function popTarget () {
    Dep.target = targetStack.pop();
  }
  
  /*
   * not type checking this file because flow doesn't play well with
   * dynamically accessing methods on Array prototype
   */
  
  var arrayProto = Array.prototype;
  var arrayMethods = Object.create(arrayProto);[
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
  ]
  .forEach(function (method) {
    // cache original method
    var original = arrayProto[method];
    def(arrayMethods, method, function mutator () {
      var arguments$1 = arguments;
  
      // avoid leaking arguments:
      // http://jsperf.com/closure-with-arguments
      var i = arguments.length;
      var args = new Array(i);
      while (i--) {
        args[i] = arguments$1[i];
      }
      var result = original.apply(this, args);
      var ob = this.__ob__;
      var inserted;
      switch (method) {
        case 'push':
          inserted = args;
          break
        case 'unshift':
          inserted = args;
          break
        case 'splice':
          inserted = args.slice(2);
          break
      }
      if (inserted) { ob.observeArray(inserted); }
      // notify change
      ob.dep.notify();
      return result
    });
  });
  
  /*  */
  
  var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
  
  /**
   * By default, when a reactive property is set, the new value is
   * also converted to become reactive. However when passing down props,
   * we don't want to force conversion because the value may be a nested value
   * under a frozen data structure. Converting it would defeat the optimization.
   */
  var observerState = {
    shouldConvert: true,
    isSettingProps: false
  };
  
  /**
   * Observer class that are attached to each observed
   * object. Once attached, the observer converts target
   * object's property keys into getter/setters that
   * collect dependencies and dispatches updates.
   */
  var Observer = function Observer (value) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      var augment = hasProto
        ? protoAugment
        : copyAugment;
      augment(value, arrayMethods, arrayKeys);
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  };
  
  /**
   * Walk through each property and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  Observer.prototype.walk = function walk (obj) {
    var keys = Object.keys(obj);
    for (var i = 0; i < keys.length; i++) {
      defineReactive$$1(obj, keys[i], obj[keys[i]]);
    }
  };
  
  /**
   * Observe a list of Array items.
   */
  Observer.prototype.observeArray = function observeArray (items) {
    for (var i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  };
  
  // helpers
  
  /**
   * Augment an target Object or Array by intercepting
   * the prototype chain using __proto__
   */
  function protoAugment (target, src) {
    /* eslint-disable no-proto */
    target.__proto__ = src;
    /* eslint-enable no-proto */
  }
  
  /**
   * Augment an target Object or Array by defining
   * hidden properties.
   */
  /* istanbul ignore next */
  function copyAugment (target, src, keys) {
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i];
      def(target, key, src[key]);
    }
  }
  
  /**
   * Attempt to create an observer instance for a value,
   * returns the new observer if successfully observed,
   * or the existing observer if the value already has one.
   */
  function observe (value, asRootData) {
    if (!isObject(value)) {
      return
    }
    var ob;
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
      ob = value.__ob__;
    } else if (
      observerState.shouldConvert &&
      !isServerRendering() &&
      (Array.isArray(value) || isPlainObject(value)) &&
      Object.isExtensible(value) &&
      !value._isVue
    ) {
      ob = new Observer(value);
    }
    if (asRootData && ob) {
      ob.vmCount++;
    }
    return ob
  }
  
  /**
   * Define a reactive property on an Object.
   */
  function defineReactive$$1 (
    obj,
    key,
    val,
    customSetter
  ) {
    var dep = new Dep();
  
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
      return
    }
  
    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
  
    var childOb = observe(val);
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter () {
        var value = getter ? getter.call(obj) : val;
        if (Dep.target) {
          dep.depend();
          if (childOb) {
            childOb.dep.depend();
          }
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
        return value
      },
      set: function reactiveSetter (newVal) {
        var value = getter ? getter.call(obj) : val;
        /* eslint-disable no-self-compare */
        if (newVal === value || (newVal !== newVal && value !== value)) {
          return
        }
        /* eslint-enable no-self-compare */
        if ('development' !== 'production' && customSetter) {
          customSetter();
        }
        if (setter) {
          setter.call(obj, newVal);
        } else {
          val = newVal;
        }
        childOb = observe(newVal);
        dep.notify();
      }
    });
  }
  
  /**
   * Set a property on an object. Adds the new property and
   * triggers change notification if the property doesn't
   * already exist.
   */
  function set (target, key, val) {
    if (Array.isArray(target) && typeof key === 'number') {
      target.length = Math.max(target.length, key);
      target.splice(key, 1, val);
      return val
    }
    if (hasOwn(target, key)) {
      target[key] = val;
      return val
    }
    var ob = (target ).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      'development' !== 'production' && warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
        'at runtime - declare it upfront in the data option.'
      );
      return val
    }
    if (!ob) {
      target[key] = val;
      return val
    }
    defineReactive$$1(ob.value, key, val);
    ob.dep.notify();
    return val
  }
  
  /**
   * Delete a property and trigger change if necessary.
   */
  function del (target, key) {
    if (Array.isArray(target) && typeof key === 'number') {
      target.splice(key, 1);
      return
    }
    var ob = (target ).__ob__;
    if (target._isVue || (ob && ob.vmCount)) {
      'development' !== 'production' && warn(
        'Avoid deleting properties on a Vue instance or its root $data ' +
        '- just set it to null.'
      );
      return
    }
    if (!hasOwn(target, key)) {
      return
    }
    delete target[key];
    if (!ob) {
      return
    }
    ob.dep.notify();
  }
  
  /**
   * Collect dependencies on array elements when the array is touched, since
   * we cannot intercept array element access like property getters.
   */
  function dependArray (value) {
    for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
      e = value[i];
      e && e.__ob__ && e.__ob__.dep.depend();
      if (Array.isArray(e)) {
        dependArray(e);
      }
    }
  }
  
  /*  */
  
  /**
   * Option overwriting strategies are functions that handle
   * how to merge a parent option value and a child option
   * value into the final value.
   */
  var strats = config.optionMergeStrategies;
  
  /**
   * Options with restrictions
   */
  if ('development' !== 'production') {
    strats.el = strats.propsData = function (parent, child, vm, key) {
      if (!vm) {
        warn(
          "option \"" + key + "\" can only be used during instance " +
          'creation with the `new` keyword.'
        );
      }
      return defaultStrat(parent, child)
    };
  }
  
  /**
   * Helper that recursively merges two data objects together.
   */
  function mergeData (to, from) {
    if (!from) { return to }
    var key, toVal, fromVal;
    var keys = Object.keys(from);
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      toVal = to[key];
      fromVal = from[key];
      if (!hasOwn(to, key)) {
        set(to, key, fromVal);
      } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
        mergeData(toVal, fromVal);
      }
    }
    return to
  }
  
  /**
   * Data
   */
  strats.data = function (
    parentVal,
    childVal,
    vm
  ) {
    if (!vm) {
      // in a Vue.extend merge, both should be functions
      if (!childVal) {
        return parentVal
      }
      if (typeof childVal !== 'function') {
        'development' !== 'production' && warn(
          'The "data" option should be a function ' +
          'that returns a per-instance value in component ' +
          'definitions.',
          vm
        );
        return parentVal
      }
      if (!parentVal) {
        return childVal
      }
      // when parentVal & childVal are both present,
      // we need to return a function that returns the
      // merged result of both functions... no need to
      // check if parentVal is a function here because
      // it has to be a function to pass previous merges.
      return function mergedDataFn () {
        return mergeData(
          childVal.call(this),
          parentVal.call(this)
        )
      }
    } else if (parentVal || childVal) {
      return function mergedInstanceDataFn () {
        // instance merge
        var instanceData = typeof childVal === 'function'
          ? childVal.call(vm)
          : childVal;
        var defaultData = typeof parentVal === 'function'
          ? parentVal.call(vm)
          : undefined;
        if (instanceData) {
          return mergeData(instanceData, defaultData)
        } else {
          return defaultData
        }
      }
    }
  };
  
  /**
   * Hooks and props are merged as arrays.
   */
  function mergeHook (
    parentVal,
    childVal
  ) {
    return childVal
      ? parentVal
        ? parentVal.concat(childVal)
        : Array.isArray(childVal)
          ? childVal
          : [childVal]
      : parentVal
  }
  
  config._lifecycleHooks.forEach(function (hook) {
    strats[hook] = mergeHook;
  });
  
  /**
   * Assets
   *
   * When a vm is present (instance creation), we need to do
   * a three-way merge between constructor options, instance
   * options and parent options.
   */
  function mergeAssets (parentVal, childVal) {
    var res = Object.create(parentVal || null);
    return childVal
      ? extend(res, childVal)
      : res
  }
  
  config._assetTypes.forEach(function (type) {
    strats[type + 's'] = mergeAssets;
  });
  
  /**
   * Watchers.
   *
   * Watchers hashes should not overwrite one
   * another, so we merge them as arrays.
   */
  strats.watch = function (parentVal, childVal) {
    /* istanbul ignore if */
    if (!childVal) { return Object.create(parentVal || null) }
    if (!parentVal) { return childVal }
    var ret = {};
    extend(ret, parentVal);
    for (var key in childVal) {
      var parent = ret[key];
      var child = childVal[key];
      if (parent && !Array.isArray(parent)) {
        parent = [parent];
      }
      ret[key] = parent
        ? parent.concat(child)
        : [child];
    }
    return ret
  };
  
  /**
   * Other object hashes.
   */
  strats.props =
  strats.methods =
  strats.computed = function (parentVal, childVal) {
    if (!childVal) { return Object.create(parentVal || null) }
    if (!parentVal) { return childVal }
    var ret = Object.create(null);
    extend(ret, parentVal);
    extend(ret, childVal);
    return ret
  };
  
  /**
   * Default strategy.
   */
  var defaultStrat = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };
  
  /**
   * Validate component names
   */
  function checkComponents (options) {
    for (var key in options.components) {
      var lower = key.toLowerCase();
      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
        warn(
          'Do not use built-in or reserved HTML elements as component ' +
          'id: ' + key
        );
      }
    }
  }
  
  /**
   * Ensure all props option syntax are normalized into the
   * Object-based format.
   */
  function normalizeProps (options) {
    var props = options.props;
    if (!props) { return }
    var res = {};
    var i, val, name;
    if (Array.isArray(props)) {
      i = props.length;
      while (i--) {
        val = props[i];
        if (typeof val === 'string') {
          name = camelize(val);
          res[name] = { type: null };
        } else if ('development' !== 'production') {
          warn('props must be strings when using array syntax.');
        }
      }
    } else if (isPlainObject(props)) {
      for (var key in props) {
        val = props[key];
        name = camelize(key);
        res[name] = isPlainObject(val)
          ? val
          : { type: val };
      }
    }
    options.props = res;
  }
  
  /**
   * Normalize raw function directives into object format.
   */
  function normalizeDirectives (options) {
    var dirs = options.directives;
    if (dirs) {
      for (var key in dirs) {
        var def = dirs[key];
        if (typeof def === 'function') {
          dirs[key] = { bind: def, update: def };
        }
      }
    }
  }
  
  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  function mergeOptions (
    parent,
    child,
    vm
  ) {
    if ('development' !== 'production') {
      checkComponents(child);
    }
    normalizeProps(child);
    normalizeDirectives(child);
    var extendsFrom = child.extends;
    if (extendsFrom) {
      parent = typeof extendsFrom === 'function'
        ? mergeOptions(parent, extendsFrom.options, vm)
        : mergeOptions(parent, extendsFrom, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        var mixin = child.mixins[i];
        if (mixin.prototype instanceof Vue$2) {
          mixin = mixin.options;
        }
        parent = mergeOptions(parent, mixin, vm);
      }
    }
    var options = {};
    var key;
    for (key in parent) {
      mergeField(key);
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key);
      }
    }
    function mergeField (key) {
      var strat = strats[key] || defaultStrat;
      options[key] = strat(parent[key], child[key], vm, key);
    }
    return options
  }
  
  /**
   * Resolve an asset.
   * This function is used because child instances need access
   * to assets defined in its ancestor chain.
   */
  function resolveAsset (
    options,
    type,
    id,
    warnMissing
  ) {
    /* istanbul ignore if */
    if (typeof id !== 'string') {
      return
    }
    var assets = options[type];
    // check local registration variations first
    if (hasOwn(assets, id)) { return assets[id] }
    var camelizedId = camelize(id);
    if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
    var PascalCaseId = capitalize(camelizedId);
    if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
    // fallback to prototype chain
    var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if ('development' !== 'production' && warnMissing && !res) {
      warn(
        'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
        options
      );
    }
    return res
  }
  
  /*  */
  
  function validateProp (
    key,
    propOptions,
    propsData,
    vm
  ) {
    var prop = propOptions[key];
    var absent = !hasOwn(propsData, key);
    var value = propsData[key];
    // handle boolean props
    if (isType(Boolean, prop.type)) {
      if (absent && !hasOwn(prop, 'default')) {
        value = false;
      } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
        value = true;
      }
    }
    // check default value
    if (value === undefined) {
      value = getPropDefaultValue(vm, prop, key);
      // since the default value is a fresh copy,
      // make sure to observe it.
      var prevShouldConvert = observerState.shouldConvert;
      observerState.shouldConvert = true;
      observe(value);
      observerState.shouldConvert = prevShouldConvert;
    }
    if ('development' !== 'production') {
      assertProp(prop, key, value, vm, absent);
    }
    return value
  }
  
  /**
   * Get the default value of a prop.
   */
  function getPropDefaultValue (vm, prop, key) {
    // no default, return undefined
    if (!hasOwn(prop, 'default')) {
      return undefined
    }
    var def = prop.default;
    // warn against non-factory defaults for Object & Array
    if ('development' !== 'production' && isObject(def)) {
      warn(
        'Invalid default value for prop "' + key + '": ' +
        'Props with type Object/Array must use a factory function ' +
        'to return the default value.',
        vm
      );
    }
    // the raw prop value was also undefined from previous render,
    // return previous default value to avoid unnecessary watcher trigger
    if (vm && vm.$options.propsData &&
      vm.$options.propsData[key] === undefined &&
      vm._props[key] !== undefined) {
      return vm._props[key]
    }
    // call factory function for non-Function types
    // a value is Function if its prototype is function even across different execution context
    return typeof def === 'function' && getType(prop.type) !== 'Function'
      ? def.call(vm)
      : def
  }
  
  /**
   * Assert whether a prop is valid.
   */
  function assertProp (
    prop,
    name,
    value,
    vm,
    absent
  ) {
    if (prop.required && absent) {
      warn(
        'Missing required prop: "' + name + '"',
        vm
      );
      return
    }
    if (value == null && !prop.required) {
      return
    }
    var type = prop.type;
    var valid = !type || type === true;
    var expectedTypes = [];
    if (type) {
      if (!Array.isArray(type)) {
        type = [type];
      }
      for (var i = 0; i < type.length && !valid; i++) {
        var assertedType = assertType(value, type[i]);
        expectedTypes.push(assertedType.expectedType || '');
        valid = assertedType.valid;
      }
    }
    if (!valid) {
      warn(
        'Invalid prop: type check failed for prop "' + name + '".' +
        ' Expected ' + expectedTypes.map(capitalize).join(', ') +
        ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
        vm
      );
      return
    }
    var validator = prop.validator;
    if (validator) {
      if (!validator(value)) {
        warn(
          'Invalid prop: custom validator check failed for prop "' + name + '".',
          vm
        );
      }
    }
  }
  
  /**
   * Assert the type of a value
   */
  function assertType (value, type) {
    var valid;
    var expectedType = getType(type);
    if (expectedType === 'String') {
      valid = typeof value === (expectedType = 'string');
    } else if (expectedType === 'Number') {
      valid = typeof value === (expectedType = 'number');
    } else if (expectedType === 'Boolean') {
      valid = typeof value === (expectedType = 'boolean');
    } else if (expectedType === 'Function') {
      valid = typeof value === (expectedType = 'function');
    } else if (expectedType === 'Object') {
      valid = isPlainObject(value);
    } else if (expectedType === 'Array') {
      valid = Array.isArray(value);
    } else {
      valid = value instanceof type;
    }
    return {
      valid: valid,
      expectedType: expectedType
    }
  }
  
  /**
   * Use function string name to check built-in types,
   * because a simple equality check will fail when running
   * across different vms / iframes.
   */
  function getType (fn) {
    var match = fn && fn.toString().match(/^\s*function (\w+)/);
    return match && match[1]
  }
  
  function isType (type, fn) {
    if (!Array.isArray(fn)) {
      return getType(fn) === getType(type)
    }
    for (var i = 0, len = fn.length; i < len; i++) {
      if (getType(fn[i]) === getType(type)) {
        return true
      }
    }
    /* istanbul ignore next */
    return false
  }
  
  function handleError (err, vm, info) {
    if (config.errorHandler) {
      config.errorHandler.call(null, err, vm, info);
    } else {
      if ('development' !== 'production') {
        warn(("Error in " + info + ":"), vm);
      }
      /* istanbul ignore else */
      if (inBrowser && typeof console !== 'undefined') {
        console.error(err);
      } else {
        throw err
      }
    }
  }
  
  /* not type checking this file because flow doesn't play well with Proxy */
  
  var initProxy;
  
  if ('development' !== 'production') {
    var allowedGlobals = makeMap(
      'Infinity,undefined,NaN,isFinite,isNaN,' +
      'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
      'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
      'require' // for Webpack/Browserify
    );
  
    var warnNonPresent = function (target, key) {
      warn(
        "Property or method \"" + key + "\" is not defined on the instance but " +
        "referenced during render. Make sure to declare reactive data " +
        "properties in the data option.",
        target
      );
    };
  
    var hasProxy =
      typeof Proxy !== 'undefined' &&
      Proxy.toString().match(/native code/);
  
    if (hasProxy) {
      var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
      config.keyCodes = new Proxy(config.keyCodes, {
        set: function set (target, key, value) {
          if (isBuiltInModifier(key)) {
            warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
            return false
          } else {
            target[key] = value;
            return true
          }
        }
      });
    }
  
    var hasHandler = {
      has: function has (target, key) {
        var has = key in target;
        var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
        if (!has && !isAllowed) {
          warnNonPresent(target, key);
        }
        return has || !isAllowed
      }
    };
  
    var getHandler = {
      get: function get (target, key) {
        if (typeof key === 'string' && !(key in target)) {
          warnNonPresent(target, key);
        }
        return target[key]
      }
    };
  
    initProxy = function initProxy (vm) {
      if (hasProxy) {
        // determine which proxy handler to use
        var options = vm.$options;
        var handlers = options.render && options.render._withStripped
          ? getHandler
          : hasHandler;
        vm._renderProxy = new Proxy(vm, handlers);
      } else {
        vm._renderProxy = vm;
      }
    };
  }
  
  var mark;
  var measure;
  
  if ('development' !== 'production') {
    var perf = inBrowser && window.performance;
    /* istanbul ignore if */
    if (
      perf &&
      perf.mark &&
      perf.measure &&
      perf.clearMarks &&
      perf.clearMeasures
    ) {
      mark = function (tag) { return perf.mark(tag); };
      measure = function (name, startTag, endTag) {
        perf.measure(name, startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
        perf.clearMeasures(name);
      };
    }
  }
  
  /*  */
  
  var VNode = function VNode (
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.functionalContext = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
  };
  
  var prototypeAccessors = { child: {} };
  
  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  prototypeAccessors.child.get = function () {
    return this.componentInstance
  };
  
  Object.defineProperties( VNode.prototype, prototypeAccessors );
  
  var createEmptyVNode = function () {
    var node = new VNode();
    node.text = '';
    node.isComment = true;
    return node
  };
  
  function createTextVNode (val) {
    return new VNode(undefined, undefined, undefined, String(val))
  }
  
  // optimized shallow clone
  // used for static nodes and slot nodes because they may be reused across
  // multiple renders, cloning them avoids errors when DOM manipulations rely
  // on their elm reference.
  function cloneVNode (vnode) {
    var cloned = new VNode(
      vnode.tag,
      vnode.data,
      vnode.children,
      vnode.text,
      vnode.elm,
      vnode.context,
      vnode.componentOptions
    );
    cloned.ns = vnode.ns;
    cloned.isStatic = vnode.isStatic;
    cloned.key = vnode.key;
    cloned.isCloned = true;
    return cloned
  }
  
  function cloneVNodes (vnodes) {
    var len = vnodes.length;
    var res = new Array(len);
    for (var i = 0; i < len; i++) {
      res[i] = cloneVNode(vnodes[i]);
    }
    return res
  }
  
  /*  */
  
  var normalizeEvent = cached(function (name) {
    var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
    name = once$$1 ? name.slice(1) : name;
    var capture = name.charAt(0) === '!';
    name = capture ? name.slice(1) : name;
    return {
      name: name,
      once: once$$1,
      capture: capture
    }
  });
  
  function createFnInvoker (fns) {
    function invoker () {
      var arguments$1 = arguments;
  
      var fns = invoker.fns;
      if (Array.isArray(fns)) {
        for (var i = 0; i < fns.length; i++) {
          fns[i].apply(null, arguments$1);
        }
      } else {
        // return handler return value for single handlers
        return fns.apply(null, arguments)
      }
    }
    invoker.fns = fns;
    return invoker
  }
  
  function updateListeners (
    on,
    oldOn,
    add,
    remove$$1,
    vm
  ) {
    var name, cur, old, event;
    for (name in on) {
      cur = on[name];
      old = oldOn[name];
      event = normalizeEvent(name);
      if (!cur) {
        'development' !== 'production' && warn(
          "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
          vm
        );
      } else if (!old) {
        if (!cur.fns) {
          cur = on[name] = createFnInvoker(cur);
        }
        add(event.name, cur, event.once, event.capture);
      } else if (cur !== old) {
        old.fns = cur;
        on[name] = old;
      }
    }
    for (name in oldOn) {
      if (!on[name]) {
        event = normalizeEvent(name);
        remove$$1(event.name, oldOn[name], event.capture);
      }
    }
  }
  
  /*  */
  
  function mergeVNodeHook (def, hookKey, hook) {
    var invoker;
    var oldHook = def[hookKey];
  
    function wrappedHook () {
      hook.apply(this, arguments);
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook);
    }
  
    if (!oldHook) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook]);
    } else {
      /* istanbul ignore if */
      if (oldHook.fns && oldHook.merged) {
        // already a merged invoker
        invoker = oldHook;
        invoker.fns.push(wrappedHook);
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook]);
      }
    }
  
    invoker.merged = true;
    def[hookKey] = invoker;
  }
  
  /*  */
  
  // The template compiler attempts to minimize the need for normalization by
  // statically analyzing the template at compile time.
  //
  // For plain HTML markup, normalization can be completely skipped because the
  // generated render function is guaranteed to return Array<VNode>. There are
  // two cases where extra normalization is needed:
  
  // 1. When the children contains components - because a functional component
  // may return an Array instead of a single root. In this case, just a simple
  // normalization is needed - if any child is an Array, we flatten the whole
  // thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
  // because functional components already normalize their own children.
  function simpleNormalizeChildren (children) {
    for (var i = 0; i < children.length; i++) {
      if (Array.isArray(children[i])) {
        return Array.prototype.concat.apply([], children)
      }
    }
    return children
  }
  
  // 2. When the children contains constructs that always generated nested Arrays,
  // e.g. <template>, <slot>, v-for, or when the children is provided by user
  // with hand-written render functions / JSX. In such cases a full normalization
  // is needed to cater to all possible types of children values.
  function normalizeChildren (children) {
    return isPrimitive(children)
      ? [createTextVNode(children)]
      : Array.isArray(children)
        ? normalizeArrayChildren(children)
        : undefined
  }
  
  function normalizeArrayChildren (children, nestedIndex) {
    var res = [];
    var i, c, last;
    for (i = 0; i < children.length; i++) {
      c = children[i];
      if (c == null || typeof c === 'boolean') { continue }
      last = res[res.length - 1];
      //  nested
      if (Array.isArray(c)) {
        res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
      } else if (isPrimitive(c)) {
        if (last && last.text) {
          last.text += String(c);
        } else if (c !== '') {
          // convert primitive to vnode
          res.push(createTextVNode(c));
        }
      } else {
        if (c.text && last && last.text) {
          res[res.length - 1] = createTextVNode(last.text + c.text);
        } else {
          // default key for nested array children (likely generated by v-for)
          if (c.tag && c.key == null && nestedIndex != null) {
            c.key = "__vlist" + nestedIndex + "_" + i + "__";
          }
          res.push(c);
        }
      }
    }
    return res
  }
  
  /*  */
  
  function getFirstComponentChild (children) {
    return children && children.filter(function (c) { return c && c.componentOptions; })[0]
  }
  
  /*  */
  
  function initEvents (vm) {
    vm._events = Object.create(null);
    vm._hasHookEvent = false;
    // init parent attached events
    var listeners = vm.$options._parentListeners;
    if (listeners) {
      updateComponentListeners(vm, listeners);
    }
  }
  
  var target;
  
  function add (event, fn, once$$1) {
    if (once$$1) {
      target.$once(event, fn);
    } else {
      target.$on(event, fn);
    }
  }
  
  function remove$1 (event, fn) {
    target.$off(event, fn);
  }
  
  function updateComponentListeners (
    vm,
    listeners,
    oldListeners
  ) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  }
  
  function eventsMixin (Vue) {
    var hookRE = /^hook:/;
    Vue.prototype.$on = function (event, fn) {
      var this$1 = this;
  
      var vm = this;
      if (Array.isArray(event)) {
        for (var i = 0, l = event.length; i < l; i++) {
          this$1.$on(event[i], fn);
        }
      } else {
        (vm._events[event] || (vm._events[event] = [])).push(fn);
        // optimize hook:event cost by using a boolean flag marked at registration
        // instead of a hash lookup
        if (hookRE.test(event)) {
          vm._hasHookEvent = true;
        }
      }
      return vm
    };
  
    Vue.prototype.$once = function (event, fn) {
      var vm = this;
      function on () {
        vm.$off(event, on);
        fn.apply(vm, arguments);
      }
      on.fn = fn;
      vm.$on(event, on);
      return vm
    };
  
    Vue.prototype.$off = function (event, fn) {
      var this$1 = this;
  
      var vm = this;
      // all
      if (!arguments.length) {
        vm._events = Object.create(null);
        return vm
      }
      // array of events
      if (Array.isArray(event)) {
        for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
          this$1.$off(event[i$1], fn);
        }
        return vm
      }
      // specific event
      var cbs = vm._events[event];
      if (!cbs) {
        return vm
      }
      if (arguments.length === 1) {
        vm._events[event] = null;
        return vm
      }
      // specific handler
      var cb;
      var i = cbs.length;
      while (i--) {
        cb = cbs[i];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i, 1);
          break
        }
      }
      return vm
    };
  
    Vue.prototype.$emit = function (event) {
      var vm = this;
      if ('development' !== 'production') {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
          tip(
            "Event \"" + lowerCaseEvent + "\" is emitted in component " +
            (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
            "Note that HTML attributes are case-insensitive and you cannot use " +
            "v-on to listen to camelCase events when using in-DOM templates. " +
            "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
          );
        }
      }
      var cbs = vm._events[event];
      if (cbs) {
        cbs = cbs.length > 1 ? toArray(cbs) : cbs;
        var args = toArray(arguments, 1);
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i].apply(vm, args);
        }
      }
      return vm
    };
  }
  
  /*  */
  
  /**
   * Runtime helper for resolving raw children VNodes into a slot object.
   */
  function resolveSlots (
    children,
    context
  ) {
    var slots = {};
    if (!children) {
      return slots
    }
    var defaultSlot = [];
    var name, child;
    for (var i = 0, l = children.length; i < l; i++) {
      child = children[i];
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if ((child.context === context || child.functionalContext === context) &&
          child.data && (name = child.data.slot)) {
        var slot = (slots[name] || (slots[name] = []));
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children);
        } else {
          slot.push(child);
        }
      } else {
        defaultSlot.push(child);
      }
    }
    // ignore whitespace
    if (!defaultSlot.every(isWhitespace)) {
      slots.default = defaultSlot;
    }
    return slots
  }
  
  function isWhitespace (node) {
    return node.isComment || node.text === ' '
  }
  
  function resolveScopedSlots (
    fns
  ) {
    var res = {};
    for (var i = 0; i < fns.length; i++) {
      res[fns[i][0]] = fns[i][1];
    }
    return res
  }
  
  /*  */
  
  var activeInstance = null;
  
  function initLifecycle (vm) {
    var options = vm.$options;
  
    // locate first non-abstract parent
    var parent = options.parent;
    if (parent && !options.abstract) {
      while (parent.$options.abstract && parent.$parent) {
        parent = parent.$parent;
      }
      parent.$children.push(vm);
    }
  
    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;
  
    vm.$children = [];
    vm.$refs = {};
  
    vm._watcher = null;
    vm._inactive = null;
    vm._directInactive = false;
    vm._isMounted = false;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
  }
  
  function lifecycleMixin (Vue) {
    Vue.prototype._update = function (vnode, hydrating) {
      var vm = this;
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate');
      }
      var prevEl = vm.$el;
      var prevVnode = vm._vnode;
      var prevActiveInstance = activeInstance;
      activeInstance = vm;
      vm._vnode = vnode;
      // Vue.prototype.__patch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // initial render
        vm.$el = vm.__patch__(
          vm.$el, vnode, hydrating, false /* removeOnly */,
          vm.$options._parentElm,
          vm.$options._refElm
        );
      } else {
        // updates
        vm.$el = vm.__patch__(prevVnode, vnode);
      }
      activeInstance = prevActiveInstance;
      // update __vue__ reference
      if (prevEl) {
        prevEl.__vue__ = null;
      }
      if (vm.$el) {
        vm.$el.__vue__ = vm;
      }
      // if parent is an HOC, update its $el as well
      if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
        vm.$parent.$el = vm.$el;
      }
      // updated hook is called by the scheduler to ensure that children are
      // updated in a parent's updated hook.
    };
  
    Vue.prototype.$forceUpdate = function () {
      var vm = this;
      if (vm._watcher) {
        vm._watcher.update();
      }
    };
  
    Vue.prototype.$destroy = function () {
      var vm = this;
      if (vm._isBeingDestroyed) {
        return
      }
      callHook(vm, 'beforeDestroy');
      vm._isBeingDestroyed = true;
      // remove self from parent
      var parent = vm.$parent;
      if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
        remove(parent.$children, vm);
      }
      // teardown watchers
      if (vm._watcher) {
        vm._watcher.teardown();
      }
      var i = vm._watchers.length;
      while (i--) {
        vm._watchers[i].teardown();
      }
      // remove reference from data ob
      // frozen object may not have observer.
      if (vm._data.__ob__) {
        vm._data.__ob__.vmCount--;
      }
      // call the last hook...
      vm._isDestroyed = true;
      // invoke destroy hooks on current rendered tree
      vm.__patch__(vm._vnode, null);
      // fire destroyed hook
      callHook(vm, 'destroyed');
      // turn off all instance listeners.
      vm.$off();
      // remove __vue__ reference
      if (vm.$el) {
        vm.$el.__vue__ = null;
      }
      // remove reference to DOM nodes (prevents leak)
      vm.$options._parentElm = vm.$options._refElm = null;
    };
  }
  
  function mountComponent (
    vm,
    el,
    hydrating
  ) {
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if ('development' !== 'production') {
        /* istanbul ignore if */
        if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
          vm.$options.el || el) {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'compiler is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
  
    var updateComponent;
    /* istanbul ignore if */
    if ('development' !== 'production' && config.performance && mark) {
      updateComponent = function () {
        var name = vm._name;
        var id = vm._uid;
        var startTag = "vue-perf-start:" + id;
        var endTag = "vue-perf-end:" + id;
  
        mark(startTag);
        var vnode = vm._render();
        mark(endTag);
        measure((name + " render"), startTag, endTag);
  
        mark(startTag);
        vm._update(vnode, hydrating);
        mark(endTag);
        measure((name + " patch"), startTag, endTag);
      };
    } else {
      updateComponent = function () {
        vm._update(vm._render(), hydrating);
      };
    }
  
    vm._watcher = new Watcher(vm, updateComponent, noop);
    hydrating = false;
  
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  }
  
  function updateChildComponent (
    vm,
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    // determine whether component has slot children
    // we need to do this before overwriting $options._renderChildren
    var hasChildren = !!(
      renderChildren ||               // has new static slots
      vm.$options._renderChildren ||  // has old static slots
      parentVnode.data.scopedSlots || // has new scoped slots
      vm.$scopedSlots !== emptyObject // has old scoped slots
    );
  
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
  
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      if ('development' !== 'production') {
        observerState.isSettingProps = true;
      }
      var props = vm._props;
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        props[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      if ('development' !== 'production') {
        observerState.isSettingProps = false;
      }
      // keep a copy of raw propsData
      vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  }
  
  function isInInactiveTree (vm) {
    while (vm && (vm = vm.$parent)) {
      if (vm._inactive) { return true }
    }
    return false
  }
  
  function activateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = false;
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive == null) {
      vm._inactive = false;
      for (var i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'activated');
    }
  }
  
  function deactivateChildComponent (vm, direct) {
    if (direct) {
      vm._directInactive = true;
      if (isInInactiveTree(vm)) {
        return
      }
    }
    if (!vm._inactive) {
      vm._inactive = true;
      for (var i = 0; i < vm.$children.length; i++) {
        deactivateChildComponent(vm.$children[i]);
      }
      callHook(vm, 'deactivated');
    }
  }
  
  function callHook (vm, hook) {
    var handlers = vm.$options[hook];
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        try {
          handlers[i].call(vm);
        } catch (e) {
          handleError(e, vm, (hook + " hook"));
        }
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
  }
  
  /*  */
  
  
  var queue = [];
  var has = {};
  var circular = {};
  var waiting = false;
  var flushing = false;
  var index = 0;
  
  /**
   * Reset the scheduler's state.
   */
  function resetSchedulerState () {
    queue.length = 0;
    has = {};
    if ('development' !== 'production') {
      circular = {};
    }
    waiting = flushing = false;
  }
  
  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue () {
    flushing = true;
    var watcher, id, vm;
  
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(function (a, b) { return a.id - b.id; });
  
    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index];
      id = watcher.id;
      has[id] = null;
      watcher.run();
      // in dev build, check and stop circular updates.
      if ('development' !== 'production' && has[id] != null) {
        circular[id] = (circular[id] || 0) + 1;
        if (circular[id] > config._maxUpdateCount) {
          warn(
            'You may have an infinite update loop ' + (
              watcher.user
                ? ("in watcher with expression \"" + (watcher.expression) + "\"")
                : "in a component render function."
            ),
            watcher.vm
          );
          break
        }
      }
    }
  
    // reset scheduler before updated hook called
    var oldQueue = queue.slice();
    resetSchedulerState();
  
    // call updated hooks
    index = oldQueue.length;
    while (index--) {
      watcher = oldQueue[index];
      vm = watcher.vm;
      if (vm._watcher === watcher && vm._isMounted) {
        callHook(vm, 'updated');
      }
    }
  
    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush');
    }
  }
  
  /**
   * Push a watcher into the watcher queue.
   * Jobs with duplicate IDs will be skipped unless it's
   * pushed when the queue is being flushed.
   */
  function queueWatcher (watcher) {
    var id = watcher.id;
    if (has[id] == null) {
      has[id] = true;
      if (!flushing) {
        queue.push(watcher);
      } else {
        // if already flushing, splice the watcher based on its id
        // if already past its id, it will be run next immediately.
        var i = queue.length - 1;
        while (i >= 0 && queue[i].id > watcher.id) {
          i--;
        }
        queue.splice(Math.max(i, index) + 1, 0, watcher);
      }
      // queue the flush
      if (!waiting) {
        waiting = true;
        nextTick(flushSchedulerQueue);
      }
    }
  }
  
  /*  */
  
  var uid$2 = 0;
  
  /**
   * A watcher parses an expression, collects dependencies,
   * and fires callback when the expression value changes.
   * This is used for both the $watch() api and directives.
   */
  var Watcher = function Watcher (
    vm,
    expOrFn,
    cb,
    options
  ) {
    this.vm = vm;
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.lazy = !!options.lazy;
      this.sync = !!options.sync;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb;
    this.id = ++uid$2; // uid for batching
    this.active = true;
    this.dirty = this.lazy; // for lazy watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new _Set();
    this.newDepIds = new _Set();
    this.expression = 'development' !== 'production'
      ? expOrFn.toString()
      : '';
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        this.getter = function () {};
        'development' !== 'production' && warn(
          "Failed watching path: \"" + expOrFn + "\" " +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        );
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get();
  };
  
  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  Watcher.prototype.get = function get () {
    pushTarget(this);
    var value;
    var vm = this.vm;
    if (this.user) {
      try {
        value = this.getter.call(vm, vm);
      } catch (e) {
        handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
      }
    } else {
      value = this.getter.call(vm, vm);
    }
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
    return value
  };
  
  /**
   * Add a dependency to this directive.
   */
  Watcher.prototype.addDep = function addDep (dep) {
    var id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  };
  
  /**
   * Clean up for dependency collection.
   */
  Watcher.prototype.cleanupDeps = function cleanupDeps () {
      var this$1 = this;
  
    var i = this.deps.length;
    while (i--) {
      var dep = this$1.deps[i];
      if (!this$1.newDepIds.has(dep.id)) {
        dep.removeSub(this$1);
      }
    }
    var tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  };
  
  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  Watcher.prototype.update = function update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  };
  
  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  Watcher.prototype.run = function run () {
    if (this.active) {
      var value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        var oldValue = this.value;
        this.value = value;
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  };
  
  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  Watcher.prototype.evaluate = function evaluate () {
    this.value = this.get();
    this.dirty = false;
  };
  
  /**
   * Depend on all deps collected by this watcher.
   */
  Watcher.prototype.depend = function depend () {
      var this$1 = this;
  
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].depend();
    }
  };
  
  /**
   * Remove self from all dependencies' subscriber list.
   */
  Watcher.prototype.teardown = function teardown () {
      var this$1 = this;
  
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      var i = this.deps.length;
      while (i--) {
        this$1.deps[i].removeSub(this$1);
      }
      this.active = false;
    }
  };
  
  /**
   * Recursively traverse an object to evoke all converted
   * getters, so that every nested property inside the object
   * is collected as a "deep" dependency.
   */
  var seenObjects = new _Set();
  function traverse (val) {
    seenObjects.clear();
    _traverse(val, seenObjects);
  }
  
  function _traverse (val, seen) {
    var i, keys;
    var isA = Array.isArray(val);
    if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
      return
    }
    if (val.__ob__) {
      var depId = val.__ob__.dep.id;
      if (seen.has(depId)) {
        return
      }
      seen.add(depId);
    }
    if (isA) {
      i = val.length;
      while (i--) { _traverse(val[i], seen); }
    } else {
      keys = Object.keys(val);
      i = keys.length;
      while (i--) { _traverse(val[keys[i]], seen); }
    }
  }
  
  /*  */
  
  var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
  };
  
  function proxy (target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter () {
      return this[sourceKey][key]
    };
    sharedPropertyDefinition.set = function proxySetter (val) {
      this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  
  function initState (vm) {
    vm._watchers = [];
    var opts = vm.$options;
    if (opts.props) { initProps(vm, opts.props); }
    if (opts.methods) { initMethods(vm, opts.methods); }
    if (opts.data) {
      initData(vm);
    } else {
      observe(vm._data = {}, true /* asRootData */);
    }
    if (opts.computed) { initComputed(vm, opts.computed); }
    if (opts.watch) { initWatch(vm, opts.watch); }
  }
  
  var isReservedProp = { key: 1, ref: 1, slot: 1 };
  
  function initProps (vm, propsOptions) {
    var propsData = vm.$options.propsData || {};
    var props = vm._props = {};
    // cache prop keys so that future props updates can iterate using Array
    // instead of dynamic object key enumeration.
    var keys = vm.$options._propKeys = [];
    var isRoot = !vm.$parent;
    // root instance props should be converted
    observerState.shouldConvert = isRoot;
    var loop = function ( key ) {
      keys.push(key);
      var value = validateProp(key, propsOptions, propsData, vm);
      /* istanbul ignore else */
      if ('development' !== 'production') {
        if (isReservedProp[key]) {
          warn(
            ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
            vm
          );
        }
        defineReactive$$1(props, key, value, function () {
          if (vm.$parent && !observerState.isSettingProps) {
            warn(
              "Avoid mutating a prop directly since the value will be " +
              "overwritten whenever the parent component re-renders. " +
              "Instead, use a data or computed property based on the prop's " +
              "value. Prop being mutated: \"" + key + "\"",
              vm
            );
          }
        });
      } else {
        defineReactive$$1(props, key, value);
      }
      // static props are already proxied on the component's prototype
      // during Vue.extend(). We only need to proxy props defined at
      // instantiation here.
      if (!(key in vm)) {
        proxy(vm, "_props", key);
      }
    };
  
    for (var key in propsOptions) loop( key );
    observerState.shouldConvert = true;
  }
  
  function initData (vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function'
      ? getData(data, vm)
      : data || {};
    if (!isPlainObject(data)) {
      data = {};
      'development' !== 'production' && warn(
        'data functions should return an object:\n' +
        'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
        vm
      );
    }
    // proxy data on instance
    var keys = Object.keys(data);
    var props = vm.$options.props;
    var i = keys.length;
    while (i--) {
      if (props && hasOwn(props, keys[i])) {
        'development' !== 'production' && warn(
          "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
          "Use prop default value instead.",
          vm
        );
      } else if (!isReserved(keys[i])) {
        proxy(vm, "_data", keys[i]);
      }
    }
    // observe data
    observe(data, true /* asRootData */);
  }
  
  function getData (data, vm) {
    try {
      return data.call(vm)
    } catch (e) {
      handleError(e, vm, "data()");
      return {}
    }
  }
  
  var computedWatcherOptions = { lazy: true };
  
  function initComputed (vm, computed) {
    var watchers = vm._computedWatchers = Object.create(null);
  
    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      if ('development' !== 'production') {
        if (getter === undefined) {
          warn(
            ("No getter function has been defined for computed property \"" + key + "\"."),
            vm
          );
          getter = noop;
        }
      }
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);
  
      // component-defined computed properties are already defined on the
      // component prototype. We only need to define computed properties defined
      // at instantiation here.
      if (!(key in vm)) {
        defineComputed(vm, key, userDef);
      }
    }
  }
  
  function defineComputed (target, key, userDef) {
    if (typeof userDef === 'function') {
      sharedPropertyDefinition.get = createComputedGetter(key);
      sharedPropertyDefinition.set = noop;
    } else {
      sharedPropertyDefinition.get = userDef.get
        ? userDef.cache !== false
          ? createComputedGetter(key)
          : userDef.get
        : noop;
      sharedPropertyDefinition.set = userDef.set
        ? userDef.set
        : noop;
    }
    Object.defineProperty(target, key, sharedPropertyDefinition);
  }
  
  function createComputedGetter (key) {
    return function computedGetter () {
      var watcher = this._computedWatchers && this._computedWatchers[key];
      if (watcher) {
        if (watcher.dirty) {
          watcher.evaluate();
        }
        if (Dep.target) {
          watcher.depend();
        }
        return watcher.value
      }
    }
  }
  
  function initMethods (vm, methods) {
    var props = vm.$options.props;
    for (var key in methods) {
      vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
      if ('development' !== 'production') {
        if (methods[key] == null) {
          warn(
            "method \"" + key + "\" has an undefined value in the component definition. " +
            "Did you reference the function correctly?",
            vm
          );
        }
        if (props && hasOwn(props, key)) {
          warn(
            ("method \"" + key + "\" has already been defined as a prop."),
            vm
          );
        }
      }
    }
  }
  
  function initWatch (vm, watch) {
    for (var key in watch) {
      var handler = watch[key];
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
  
  function createWatcher (vm, key, handler) {
    var options;
    if (isPlainObject(handler)) {
      options = handler;
      handler = handler.handler;
    }
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    vm.$watch(key, handler, options);
  }
  
  function stateMixin (Vue) {
    // flow somehow has problems with directly declared definition object
    // when using Object.defineProperty, so we have to procedurally build up
    // the object here.
    var dataDef = {};
    dataDef.get = function () { return this._data };
    var propsDef = {};
    propsDef.get = function () { return this._props };
    if ('development' !== 'production') {
      dataDef.set = function (newData) {
        warn(
          'Avoid replacing instance root $data. ' +
          'Use nested data properties instead.',
          this
        );
      };
      propsDef.set = function () {
        warn("$props is readonly.", this);
      };
    }
    Object.defineProperty(Vue.prototype, '$data', dataDef);
    Object.defineProperty(Vue.prototype, '$props', propsDef);
  
    Vue.prototype.$set = set;
    Vue.prototype.$delete = del;
  
    Vue.prototype.$watch = function (
      expOrFn,
      cb,
      options
    ) {
      var vm = this;
      options = options || {};
      options.user = true;
      var watcher = new Watcher(vm, expOrFn, cb, options);
      if (options.immediate) {
        cb.call(vm, watcher.value);
      }
      return function unwatchFn () {
        watcher.teardown();
      }
    };
  }
  
  /*  */
  
  // hooks to be invoked on component VNodes during patch
  var componentVNodeHooks = {
    init: function init (
      vnode,
      hydrating,
      parentElm,
      refElm
    ) {
      if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
        var child = vnode.componentInstance = createComponentInstanceForVnode(
          vnode,
          activeInstance,
          parentElm,
          refElm
        );
        child.$mount(hydrating ? vnode.elm : undefined, hydrating);
      } else if (vnode.data.keepAlive) {
        // kept-alive components, treat as a patch
        var mountedNode = vnode; // work around flow
        componentVNodeHooks.prepatch(mountedNode, mountedNode);
      }
    },
  
    prepatch: function prepatch (oldVnode, vnode) {
      var options = vnode.componentOptions;
      var child = vnode.componentInstance = oldVnode.componentInstance;
      updateChildComponent(
        child,
        options.propsData, // updated props
        options.listeners, // updated listeners
        vnode, // new parent vnode
        options.children // new children
      );
    },
  
    insert: function insert (vnode) {
      if (!vnode.componentInstance._isMounted) {
        vnode.componentInstance._isMounted = true;
        callHook(vnode.componentInstance, 'mounted');
      }
      if (vnode.data.keepAlive) {
        activateChildComponent(vnode.componentInstance, true /* direct */);
      }
    },
  
    destroy: function destroy (vnode) {
      if (!vnode.componentInstance._isDestroyed) {
        if (!vnode.data.keepAlive) {
          vnode.componentInstance.$destroy();
        } else {
          deactivateChildComponent(vnode.componentInstance, true /* direct */);
        }
      }
    }
  };
  
  var hooksToMerge = Object.keys(componentVNodeHooks);
  
  function createComponent (
    Ctor,
    data,
    context,
    children,
    tag
  ) {
    if (!Ctor) {
      return
    }
  
    var baseCtor = context.$options._base;
    if (isObject(Ctor)) {
      Ctor = baseCtor.extend(Ctor);
    }
  
    if (typeof Ctor !== 'function') {
      if ('development' !== 'production') {
        warn(("Invalid Component definition: " + (String(Ctor))), context);
      }
      return
    }
  
    // async component
    if (!Ctor.cid) {
      if (Ctor.resolved) {
        Ctor = Ctor.resolved;
      } else {
        Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
          // it's ok to queue this on every render because
          // $forceUpdate is buffered by the scheduler.
          context.$forceUpdate();
        });
        if (!Ctor) {
          // return nothing if this is indeed an async component
          // wait for the callback to trigger parent update.
          return
        }
      }
    }
  
    // resolve constructor options in case global mixins are applied after
    // component constructor creation
    resolveConstructorOptions(Ctor);
  
    data = data || {};
  
    // transform component v-model data into props & events
    if (data.model) {
      transformModel(Ctor.options, data);
    }
  
    // extract props
    var propsData = extractProps(data, Ctor, tag);
  
    // functional component
    if (Ctor.options.functional) {
      return createFunctionalComponent(Ctor, propsData, data, context, children)
    }
  
    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    var listeners = data.on;
    // replace with listeners with .native modifier
    data.on = data.nativeOn;
  
    if (Ctor.options.abstract) {
      // abstract components do not keep anything
      // other than props & listeners
      data = {};
    }
  
    // merge component management hooks onto the placeholder node
    mergeHooks(data);
  
    // return a placeholder vnode
    var name = Ctor.options.name || tag;
    var vnode = new VNode(
      ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
      data, undefined, undefined, undefined, context,
      { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
    );
    return vnode
  }
  
  function createFunctionalComponent (
    Ctor,
    propsData,
    data,
    context,
    children
  ) {
    var props = {};
    var propOptions = Ctor.options.props;
    if (propOptions) {
      for (var key in propOptions) {
        props[key] = validateProp(key, propOptions, propsData);
      }
    }
    // ensure the createElement function in functional components
    // gets a unique context - this is necessary for correct named slot check
    var _context = Object.create(context);
    var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
    var vnode = Ctor.options.render.call(null, h, {
      props: props,
      data: data,
      parent: context,
      children: children,
      slots: function () { return resolveSlots(children, context); }
    });
    if (vnode instanceof VNode) {
      vnode.functionalContext = context;
      if (data.slot) {
        (vnode.data || (vnode.data = {})).slot = data.slot;
      }
    }
    return vnode
  }
  
  function createComponentInstanceForVnode (
    vnode, // we know it's MountedComponentVNode but flow doesn't
    parent, // activeInstance in lifecycle state
    parentElm,
    refElm
  ) {
    var vnodeComponentOptions = vnode.componentOptions;
    var options = {
      _isComponent: true,
      parent: parent,
      propsData: vnodeComponentOptions.propsData,
      _componentTag: vnodeComponentOptions.tag,
      _parentVnode: vnode,
      _parentListeners: vnodeComponentOptions.listeners,
      _renderChildren: vnodeComponentOptions.children,
      _parentElm: parentElm || null,
      _refElm: refElm || null
    };
    // check inline-template render functions
    var inlineTemplate = vnode.data.inlineTemplate;
    if (inlineTemplate) {
      options.render = inlineTemplate.render;
      options.staticRenderFns = inlineTemplate.staticRenderFns;
    }
    return new vnodeComponentOptions.Ctor(options)
  }
  
  function resolveAsyncComponent (
    factory,
    baseCtor,
    cb
  ) {
    if (factory.requested) {
      // pool callbacks
      factory.pendingCallbacks.push(cb);
    } else {
      factory.requested = true;
      var cbs = factory.pendingCallbacks = [cb];
      var sync = true;
  
      var resolve = function (res) {
        if (isObject(res)) {
          res = baseCtor.extend(res);
        }
        // cache resolved
        factory.resolved = res;
        // invoke callbacks only if this is not a synchronous resolve
        // (async resolves are shimmed as synchronous during SSR)
        if (!sync) {
          for (var i = 0, l = cbs.length; i < l; i++) {
            cbs[i](res);
          }
        }
      };
  
      var reject = function (reason) {
        'development' !== 'production' && warn(
          "Failed to resolve async component: " + (String(factory)) +
          (reason ? ("\nReason: " + reason) : '')
        );
      };
  
      var res = factory(resolve, reject);
  
      // handle promise
      if (res && typeof res.then === 'function' && !factory.resolved) {
        res.then(resolve, reject);
      }
  
      sync = false;
      // return in case resolved synchronously
      return factory.resolved
    }
  }
  
  function extractProps (data, Ctor, tag) {
    // we are only extracting raw values here.
    // validation and default values are handled in the child
    // component itself.
    var propOptions = Ctor.options.props;
    if (!propOptions) {
      return
    }
    var res = {};
    var attrs = data.attrs;
    var props = data.props;
    var domProps = data.domProps;
    if (attrs || props || domProps) {
      for (var key in propOptions) {
        var altKey = hyphenate(key);
        if ('development' !== 'production') {
          var keyInLowerCase = key.toLowerCase();
          if (
            key !== keyInLowerCase &&
            attrs && attrs.hasOwnProperty(keyInLowerCase)
          ) {
            tip(
              "Prop \"" + keyInLowerCase + "\" is passed to component " +
              (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
              " \"" + key + "\". " +
              "Note that HTML attributes are case-insensitive and camelCased " +
              "props need to use their kebab-case equivalents when using in-DOM " +
              "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
            );
          }
        }
        checkProp(res, props, key, altKey, true) ||
        checkProp(res, attrs, key, altKey) ||
        checkProp(res, domProps, key, altKey);
      }
    }
    return res
  }
  
  function checkProp (
    res,
    hash,
    key,
    altKey,
    preserve
  ) {
    if (hash) {
      if (hasOwn(hash, key)) {
        res[key] = hash[key];
        if (!preserve) {
          delete hash[key];
        }
        return true
      } else if (hasOwn(hash, altKey)) {
        res[key] = hash[altKey];
        if (!preserve) {
          delete hash[altKey];
        }
        return true
      }
    }
    return false
  }
  
  function mergeHooks (data) {
    if (!data.hook) {
      data.hook = {};
    }
    for (var i = 0; i < hooksToMerge.length; i++) {
      var key = hooksToMerge[i];
      var fromParent = data.hook[key];
      var ours = componentVNodeHooks[key];
      data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
    }
  }
  
  function mergeHook$1 (one, two) {
    return function (a, b, c, d) {
      one(a, b, c, d);
      two(a, b, c, d);
    }
  }
  
  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel (options, data) {
    var prop = (options.model && options.model.prop) || 'value';
    var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
    var on = data.on || (data.on = {});
    if (on[event]) {
      on[event] = [data.model.callback].concat(on[event]);
    } else {
      on[event] = data.model.callback;
    }
  }
  
  /*  */
  
  var SIMPLE_NORMALIZE = 1;
  var ALWAYS_NORMALIZE = 2;
  
  // wrapper function for providing a more flexible interface
  // without getting yelled at by flow
  function createElement (
    context,
    tag,
    data,
    children,
    normalizationType,
    alwaysNormalize
  ) {
    if (Array.isArray(data) || isPrimitive(data)) {
      normalizationType = children;
      children = data;
      data = undefined;
    }
    if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
    return _createElement(context, tag, data, children, normalizationType)
  }
  
  function _createElement (
    context,
    tag,
    data,
    children,
    normalizationType
  ) {
    if (data && data.__ob__) {
      'development' !== 'production' && warn(
        "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
        'Always create fresh vnode data objects in each render!',
        context
      );
      return createEmptyVNode()
    }
    if (!tag) {
      // in case of component :is set to falsy value
      return createEmptyVNode()
    }
    // support single function children as default scoped slot
    if (Array.isArray(children) &&
        typeof children[0] === 'function') {
      data = data || {};
      data.scopedSlots = { default: children[0] };
      children.length = 0;
    }
    if (normalizationType === ALWAYS_NORMALIZE) {
      children = normalizeChildren(children);
    } else if (normalizationType === SIMPLE_NORMALIZE) {
      children = simpleNormalizeChildren(children);
    }
    var vnode, ns;
    if (typeof tag === 'string') {
      var Ctor;
      ns = config.getTagNamespace(tag);
      if (config.isReservedTag(tag)) {
        // platform built-in elements
        vnode = new VNode(
          config.parsePlatformTagName(tag), data, children,
          undefined, undefined, context
        );
      } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
        // component
        vnode = createComponent(Ctor, data, context, children, tag);
      } else {
        // unknown or unlisted namespaced elements
        // check at runtime because it may get assigned a namespace when its
        // parent normalizes children
        vnode = new VNode(
          tag, data, children,
          undefined, undefined, context
        );
      }
    } else {
      // direct component options / constructor
      vnode = createComponent(tag, data, context, children);
    }
    if (vnode) {
      if (ns) { applyNS(vnode, ns); }
      return vnode
    } else {
      return createEmptyVNode()
    }
  }
  
  function applyNS (vnode, ns) {
    vnode.ns = ns;
    if (vnode.tag === 'foreignObject') {
      // use default namespace inside foreignObject
      return
    }
    if (vnode.children) {
      for (var i = 0, l = vnode.children.length; i < l; i++) {
        var child = vnode.children[i];
        if (child.tag && !child.ns) {
          applyNS(child, ns);
        }
      }
    }
  }
  
  /*  */
  
  /**
   * Runtime helper for rendering v-for lists.
   */
  function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  }
  
  /*  */
  
  /**
   * Runtime helper for rendering <slot>
   */
  function renderSlot (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        extend(props, bindObject);
      }
      return scopedSlotFn(props) || fallback
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && 'development' !== 'production') {
        slotNodes._rendered && warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
        slotNodes._rendered = true;
      }
      return slotNodes || fallback
    }
  }
  
  /*  */
  
  /**
   * Runtime helper for resolving filters
   */
  function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  }
  
  /*  */
  
  /**
   * Runtime helper for checking keyCodes from config.
   */
  function checkKeyCodes (
    eventKeyCode,
    key,
    builtInAlias
  ) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  }
  
  /*  */
  
  /**
   * Runtime helper for merging v-bind="object" into a VNode's data.
   */
  function bindObjectProps (
    data,
    tag,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        'development' !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        var hash;
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            hash = data;
          } else {
            var type = data.attrs && data.attrs.type;
            hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
          }
          if (!(key in hash)) {
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  }
  
  /*  */
  
  /**
   * Runtime helper for rendering static trees.
   */
  function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] =
      this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, ("__static__" + index), false);
    return tree
  }
  
  /**
   * Runtime helper for v-once.
   * Effectively it means marking the node as static with a unique key.
   */
  function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  }
  
  function markStatic (
    tree,
    key,
    isOnce
  ) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }
  
  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }
  
  /*  */
  
  function initRender (vm) {
    vm.$vnode = null; // the placeholder node in parent tree
    vm._vnode = null; // the root of the child tree
    vm._staticTrees = null;
    var parentVnode = vm.$options._parentVnode;
    var renderContext = parentVnode && parentVnode.context;
    vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
    vm.$scopedSlots = emptyObject;
    // bind the createElement fn to this instance
    // so that we get proper render context inside it.
    // args order: tag, data, children, normalizationType, alwaysNormalize
    // internal version is used by render functions compiled from templates
    vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
    // normalization is always applied for the public version, used in
    // user-written render functions.
    vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
  }
  
  function renderMixin (Vue) {
    Vue.prototype.$nextTick = function (fn) {
      return nextTick(fn, this)
    };
  
    Vue.prototype._render = function () {
      var vm = this;
      var ref = vm.$options;
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      var _parentVnode = ref._parentVnode;
  
      if (vm._isMounted) {
        // clone slot nodes on re-renders
        for (var key in vm.$slots) {
          vm.$slots[key] = cloneVNodes(vm.$slots[key]);
        }
      }
  
      vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;
  
      if (staticRenderFns && !vm._staticTrees) {
        vm._staticTrees = [];
      }
      // set parent vnode. this allows render functions to have access
      // to the data on the placeholder node.
      vm.$vnode = _parentVnode;
      // render self
      var vnode;
      try {
        vnode = render.call(vm._renderProxy, vm.$createElement);
      } catch (e) {
        handleError(e, vm, "render function");
        // return error render result,
        // or previous vnode to prevent render error causing blank component
        /* istanbul ignore else */
        if ('development' !== 'production') {
          vnode = vm.$options.renderError
            ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
            : vm._vnode;
        } else {
          vnode = vm._vnode;
        }
      }
      // return empty vnode in case the render function errored out
      if (!(vnode instanceof VNode)) {
        if ('development' !== 'production' && Array.isArray(vnode)) {
          warn(
            'Multiple root nodes returned from render function. Render function ' +
            'should return a single root node.',
            vm
          );
        }
        vnode = createEmptyVNode();
      }
      // set parent
      vnode.parent = _parentVnode;
      return vnode
    };
  
    // internal render helpers.
    // these are exposed on the instance prototype to reduce generated render
    // code size.
    Vue.prototype._o = markOnce;
    Vue.prototype._n = toNumber;
    Vue.prototype._s = _toString;
    Vue.prototype._l = renderList;
    Vue.prototype._t = renderSlot;
    Vue.prototype._q = looseEqual;
    Vue.prototype._i = looseIndexOf;
    Vue.prototype._m = renderStatic;
    Vue.prototype._f = resolveFilter;
    Vue.prototype._k = checkKeyCodes;
    Vue.prototype._b = bindObjectProps;
    Vue.prototype._v = createTextVNode;
    Vue.prototype._e = createEmptyVNode;
    Vue.prototype._u = resolveScopedSlots;
  }
  
  /*  */
  
  function initProvide (vm) {
    var provide = vm.$options.provide;
    if (provide) {
      vm._provided = typeof provide === 'function'
        ? provide.call(vm)
        : provide;
    }
  }
  
  function initInjections (vm) {
    var inject = vm.$options.inject;
    if (inject) {
      // inject is :any because flow is not smart enough to figure out cached
      // isArray here
      var isArray = Array.isArray(inject);
      var keys = isArray
        ? inject
        : hasSymbol
          ? Reflect.ownKeys(inject)
          : Object.keys(inject);
  
      var loop = function ( i ) {
        var key = keys[i];
        var provideKey = isArray ? key : inject[key];
        var source = vm;
        while (source) {
          if (source._provided && provideKey in source._provided) {
            /* istanbul ignore else */
            if ('development' !== 'production') {
              defineReactive$$1(vm, key, source._provided[provideKey], function () {
                warn(
                  "Avoid mutating an injected value directly since the changes will be " +
                  "overwritten whenever the provided component re-renders. " +
                  "injection being mutated: \"" + key + "\"",
                  vm
                );
              });
            } else {
              defineReactive$$1(vm, key, source._provided[provideKey]);
            }
            break
          }
          source = source.$parent;
        }
      };
  
      for (var i = 0; i < keys.length; i++) loop( i );
    }
  }
  
  /*  */
  
  var uid = 0;
  
  function initMixin (Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      // a uid
      vm._uid = uid++;
  
      var startTag, endTag;
      /* istanbul ignore if */
      if ('development' !== 'production' && config.performance && mark) {
        startTag = "vue-perf-init:" + (vm._uid);
        endTag = "vue-perf-end:" + (vm._uid);
        mark(startTag);
      }
  
      // a flag to avoid this being observed
      vm._isVue = true;
      // merge options
      if (options && options._isComponent) {
        // optimize internal component instantiation
        // since dynamic options merging is pretty slow, and none of the
        // internal component options needs special treatment.
        initInternalComponent(vm, options);
      } else {
        vm.$options = mergeOptions(
          resolveConstructorOptions(vm.constructor),
          options || {},
          vm
        );
      }
      /* istanbul ignore else */
      if ('development' !== 'production') {
        initProxy(vm);
      } else {
        vm._renderProxy = vm;
      }
      // expose real self
      vm._self = vm;
      initLifecycle(vm);
      initEvents(vm);
      initRender(vm);
      callHook(vm, 'beforeCreate');
      initInjections(vm); // resolve injections before data/props
      initState(vm);
      initProvide(vm); // resolve provide after data/props
      callHook(vm, 'created');
  
      /* istanbul ignore if */
      if ('development' !== 'production' && config.performance && mark) {
        vm._name = formatComponentName(vm, false);
        mark(endTag);
        measure(((vm._name) + " init"), startTag, endTag);
      }
  
      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };
  }
  
  function initInternalComponent (vm, options) {
    var opts = vm.$options = Object.create(vm.constructor.options);
    // doing this because it's faster than dynamic enumeration.
    opts.parent = options.parent;
    opts.propsData = options.propsData;
    opts._parentVnode = options._parentVnode;
    opts._parentListeners = options._parentListeners;
    opts._renderChildren = options._renderChildren;
    opts._componentTag = options._componentTag;
    opts._parentElm = options._parentElm;
    opts._refElm = options._refElm;
    if (options.render) {
      opts.render = options.render;
      opts.staticRenderFns = options.staticRenderFns;
    }
  }
  
  function resolveConstructorOptions (Ctor) {
    var options = Ctor.options;
    if (Ctor.super) {
      var superOptions = resolveConstructorOptions(Ctor.super);
      var cachedSuperOptions = Ctor.superOptions;
      if (superOptions !== cachedSuperOptions) {
        // super option changed,
        // need to resolve new options.
        Ctor.superOptions = superOptions;
        // check if there are any late-modified/attached options (#4976)
        var modifiedOptions = resolveModifiedOptions(Ctor);
        // update base extend options
        if (modifiedOptions) {
          extend(Ctor.extendOptions, modifiedOptions);
        }
        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
        if (options.name) {
          options.components[options.name] = Ctor;
        }
      }
    }
    return options
  }
  
  function resolveModifiedOptions (Ctor) {
    var modified;
    var latest = Ctor.options;
    var sealed = Ctor.sealedOptions;
    for (var key in latest) {
      if (latest[key] !== sealed[key]) {
        if (!modified) { modified = {}; }
        modified[key] = dedupe(latest[key], sealed[key]);
      }
    }
    return modified
  }
  
  function dedupe (latest, sealed) {
    // compare latest and sealed to ensure lifecycle hooks won't be duplicated
    // between merges
    if (Array.isArray(latest)) {
      var res = [];
      sealed = Array.isArray(sealed) ? sealed : [sealed];
      for (var i = 0; i < latest.length; i++) {
        if (sealed.indexOf(latest[i]) < 0) {
          res.push(latest[i]);
        }
      }
      return res
    } else {
      return latest
    }
  }
  
  function Vue$2 (options) {
    if ('development' !== 'production' &&
      !(this instanceof Vue$2)) {
      warn('Vue is a constructor and should be called with the `new` keyword');
    }
    this._init(options);
  }
  
  initMixin(Vue$2);
  stateMixin(Vue$2);
  eventsMixin(Vue$2);
  lifecycleMixin(Vue$2);
  renderMixin(Vue$2);
  
  /*  */
  
  function initUse (Vue) {
    Vue.use = function (plugin) {
      /* istanbul ignore if */
      if (plugin.installed) {
        return
      }
      // additional parameters
      var args = toArray(arguments, 1);
      args.unshift(this);
      if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
      } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
      }
      plugin.installed = true;
      return this
    };
  }
  
  /*  */
  
  function initMixin$1 (Vue) {
    Vue.mixin = function (mixin) {
      this.options = mergeOptions(this.options, mixin);
    };
  }
  
  /*  */
  
  function initExtend (Vue) {
    /**
     * Each instance constructor, including Vue, has a unique
     * cid. This enables us to create wrapped "child
     * constructors" for prototypal inheritance and cache them.
     */
    Vue.cid = 0;
    var cid = 1;
  
    /**
     * Class inheritance
     */
    Vue.extend = function (extendOptions) {
      extendOptions = extendOptions || {};
      var Super = this;
      var SuperId = Super.cid;
      var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
      if (cachedCtors[SuperId]) {
        return cachedCtors[SuperId]
      }
  
      var name = extendOptions.name || Super.options.name;
      if ('development' !== 'production') {
        if (!/^[a-zA-Z][\w-]*$/.test(name)) {
          warn(
            'Invalid component name: "' + name + '". Component names ' +
            'can only contain alphanumeric characters and the hyphen, ' +
            'and must start with a letter.'
          );
        }
      }
  
      var Sub = function VueComponent (options) {
        this._init(options);
      };
      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(
        Super.options,
        extendOptions
      );
      Sub['super'] = Super;
  
      // For props and computed properties, we define the proxy getters on
      // the Vue instances at extension time, on the extended prototype. This
      // avoids Object.defineProperty calls for each instance created.
      if (Sub.options.props) {
        initProps$1(Sub);
      }
      if (Sub.options.computed) {
        initComputed$1(Sub);
      }
  
      // allow further extension/mixin/plugin usage
      Sub.extend = Super.extend;
      Sub.mixin = Super.mixin;
      Sub.use = Super.use;
  
      // create asset registers, so extended classes
      // can have their private assets too.
      config._assetTypes.forEach(function (type) {
        Sub[type] = Super[type];
      });
      // enable recursive self-lookup
      if (name) {
        Sub.options.components[name] = Sub;
      }
  
      // keep a reference to the super options at extension time.
      // later at instantiation we can check if Super's options have
      // been updated.
      Sub.superOptions = Super.options;
      Sub.extendOptions = extendOptions;
      Sub.sealedOptions = extend({}, Sub.options);
  
      // cache constructor
      cachedCtors[SuperId] = Sub;
      return Sub
    };
  }
  
  function initProps$1 (Comp) {
    var props = Comp.options.props;
    for (var key in props) {
      proxy(Comp.prototype, "_props", key);
    }
  }
  
  function initComputed$1 (Comp) {
    var computed = Comp.options.computed;
    for (var key in computed) {
      defineComputed(Comp.prototype, key, computed[key]);
    }
  }
  
  /*  */
  
  function initAssetRegisters (Vue) {
    /**
     * Create asset registration methods.
     */
    config._assetTypes.forEach(function (type) {
      Vue[type] = function (
        id,
        definition
      ) {
        if (!definition) {
          return this.options[type + 's'][id]
        } else {
          /* istanbul ignore if */
          if ('development' !== 'production') {
            if (type === 'component' && config.isReservedTag(id)) {
              warn(
                'Do not use built-in or reserved HTML elements as component ' +
                'id: ' + id
              );
            }
          }
          if (type === 'component' && isPlainObject(definition)) {
            definition.name = definition.name || id;
            definition = this.options._base.extend(definition);
          }
          if (type === 'directive' && typeof definition === 'function') {
            definition = { bind: definition, update: definition };
          }
          this.options[type + 's'][id] = definition;
          return definition
        }
      };
    });
  }
  
  /*  */
  
  var patternTypes = [String, RegExp];
  
  function getComponentName (opts) {
    return opts && (opts.Ctor.options.name || opts.tag)
  }
  
  function matches (pattern, name) {
    if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (pattern instanceof RegExp) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }
  
  function pruneCache (cache, filter) {
    for (var key in cache) {
      var cachedNode = cache[key];
      if (cachedNode) {
        var name = getComponentName(cachedNode.componentOptions);
        if (name && !filter(name)) {
          pruneCacheEntry(cachedNode);
          cache[key] = null;
        }
      }
    }
  }
  
  function pruneCacheEntry (vnode) {
    if (vnode) {
      if (!vnode.componentInstance._inactive) {
        callHook(vnode.componentInstance, 'deactivated');
      }
      vnode.componentInstance.$destroy();
    }
  }
  
  var KeepAlive = {
    name: 'keep-alive',
    abstract: true,
  
    props: {
      include: patternTypes,
      exclude: patternTypes
    },
  
    created: function created () {
      this.cache = Object.create(null);
    },
  
    destroyed: function destroyed () {
      var this$1 = this;
  
      for (var key in this$1.cache) {
        pruneCacheEntry(this$1.cache[key]);
      }
    },
  
    watch: {
      include: function include (val) {
        pruneCache(this.cache, function (name) { return matches(val, name); });
      },
      exclude: function exclude (val) {
        pruneCache(this.cache, function (name) { return !matches(val, name); });
      }
    },
  
    render: function render () {
      var vnode = getFirstComponentChild(this.$slots.default);
      var componentOptions = vnode && vnode.componentOptions;
      if (componentOptions) {
        // check pattern
        var name = getComponentName(componentOptions);
        if (name && (
          (this.include && !matches(this.include, name)) ||
          (this.exclude && matches(this.exclude, name))
        )) {
          return vnode
        }
        var key = vnode.key == null
          // same constructor may get registered as different local components
          // so cid alone is not enough (#3269)
          ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
          : vnode.key;
        if (this.cache[key]) {
          vnode.componentInstance = this.cache[key].componentInstance;
        } else {
          this.cache[key] = vnode;
        }
        vnode.data.keepAlive = true;
      }
      return vnode
    }
  };
  
  var builtInComponents = {
    KeepAlive: KeepAlive
  };
  
  /*  */
  
  function initGlobalAPI (Vue) {
    // config
    var configDef = {};
    configDef.get = function () { return config; };
    if ('development' !== 'production') {
      configDef.set = function () {
        warn(
          'Do not replace the Vue.config object, set individual fields instead.'
        );
      };
    }
    Object.defineProperty(Vue, 'config', configDef);
  
    // exposed util methods.
    // NOTE: these are not considered part of the public API - avoid relying on
    // them unless you are aware of the risk.
    Vue.util = {
      warn: warn,
      extend: extend,
      mergeOptions: mergeOptions,
      defineReactive: defineReactive$$1
    };
  
    Vue.set = set;
    Vue.delete = del;
    Vue.nextTick = nextTick;
  
    Vue.options = Object.create(null);
    config._assetTypes.forEach(function (type) {
      Vue.options[type + 's'] = Object.create(null);
    });
  
    // this is used to identify the "base" constructor to extend all plain-object
    // components with in Weex's multi-instance scenarios.
    Vue.options._base = Vue;
  
    extend(Vue.options.components, builtInComponents);
  
    initUse(Vue);
    initMixin$1(Vue);
    initExtend(Vue);
    initAssetRegisters(Vue);
  }
  
  initGlobalAPI(Vue$2);
  
  Object.defineProperty(Vue$2.prototype, '$isServer', {
    get: isServerRendering
  });
  
  Vue$2.version = '2.2.6';
  
  /*  */
  
  // attributes that should be using props for binding
  var acceptValue = makeMap('input,textarea,option,select');
  var mustUseProp = function (tag, type, attr) {
    return (
      (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
      (attr === 'selected' && tag === 'option') ||
      (attr === 'checked' && tag === 'input') ||
      (attr === 'muted' && tag === 'video')
    )
  };
  
  var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
  
  var isBooleanAttr = makeMap(
    'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
    'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
    'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
    'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
    'required,reversed,scoped,seamless,selected,sortable,translate,' +
    'truespeed,typemustmatch,visible'
  );
  
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  
  var isXlink = function (name) {
    return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
  };
  
  var getXlinkProp = function (name) {
    return isXlink(name) ? name.slice(6, name.length) : ''
  };
  
  var isFalsyAttrValue = function (val) {
    return val == null || val === false
  };
  
  /*  */
  
  function genClassForVnode (vnode) {
    var data = vnode.data;
    var parentNode = vnode;
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data) {
        data = mergeClassData(childNode.data, data);
      }
    }
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data) {
        data = mergeClassData(data, parentNode.data);
      }
    }
    return genClassFromData(data)
  }
  
  function mergeClassData (child, parent) {
    return {
      staticClass: concat(child.staticClass, parent.staticClass),
      class: child.class
        ? [child.class, parent.class]
        : parent.class
    }
  }
  
  function genClassFromData (data) {
    var dynamicClass = data.class;
    var staticClass = data.staticClass;
    if (staticClass || dynamicClass) {
      return concat(staticClass, stringifyClass(dynamicClass))
    }
    /* istanbul ignore next */
    return ''
  }
  
  function concat (a, b) {
    return a ? b ? (a + ' ' + b) : a : (b || '')
  }
  
  function stringifyClass (value) {
    var res = '';
    if (!value) {
      return res
    }
    if (typeof value === 'string') {
      return value
    }
    if (Array.isArray(value)) {
      var stringified;
      for (var i = 0, l = value.length; i < l; i++) {
        if (value[i]) {
          if ((stringified = stringifyClass(value[i]))) {
            res += stringified + ' ';
          }
        }
      }
      return res.slice(0, -1)
    }
    if (isObject(value)) {
      for (var key in value) {
        if (value[key]) { res += key + ' '; }
      }
      return res.slice(0, -1)
    }
    /* istanbul ignore next */
    return res
  }
  
  /*  */
  
  var namespaceMap = {
    svg: 'http://www.w3.org/2000/svg',
    math: 'http://www.w3.org/1998/Math/MathML'
  };
  
  var isHTMLTag = makeMap(
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template'
  );
  
  // this map is intentionally selective, only covering SVG elements that may
  // contain child elements.
  var isSVG = makeMap(
    'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
    'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
    'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
    true
  );
  
  
  
  var isReservedTag = function (tag) {
    return isHTMLTag(tag) || isSVG(tag)
  };
  
  function getTagNamespace (tag) {
    if (isSVG(tag)) {
      return 'svg'
    }
    // basic support for MathML
    // note it doesn't support other MathML elements being component roots
    if (tag === 'math') {
      return 'math'
    }
  }
  
  var unknownElementCache = Object.create(null);
  function isUnknownElement (tag) {
    /* istanbul ignore if */
    if (!inBrowser) {
      return true
    }
    if (isReservedTag(tag)) {
      return false
    }
    tag = tag.toLowerCase();
    /* istanbul ignore if */
    if (unknownElementCache[tag] != null) {
      return unknownElementCache[tag]
    }
    var el = document.createElement(tag);
    if (tag.indexOf('-') > -1) {
      // http://stackoverflow.com/a/28210364/1070244
      return (unknownElementCache[tag] = (
        el.constructor === window.HTMLUnknownElement ||
        el.constructor === window.HTMLElement
      ))
    } else {
      return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
    }
  }
  
  /*  */
  
  /**
   * Query an element selector if it's not an element already.
   */
  function query (el) {
    if (typeof el === 'string') {
      var selected = document.querySelector(el);
      if (!selected) {
        'development' !== 'production' && warn(
          'Cannot find element: ' + el
        );
        return document.createElement('div')
      }
      return selected
    } else {
      return el
    }
  }
  
  /*  */
  
  function createElement$1 (tagName, vnode) {
    var elm = document.createElement(tagName);
    if (tagName !== 'select') {
      return elm
    }
    // false or null will remove the attribute but undefined will not
    if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
      elm.setAttribute('multiple', 'multiple');
    }
    return elm
  }
  
  function createElementNS (namespace, tagName) {
    return document.createElementNS(namespaceMap[namespace], tagName)
  }
  
  function createTextNode (text) {
    return document.createTextNode(text)
  }
  
  function createComment (text) {
    return document.createComment(text)
  }
  
  function insertBefore (parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
  }
  
  function removeChild (node, child) {
    node.removeChild(child);
  }
  
  function appendChild (node, child) {
    node.appendChild(child);
  }
  
  function parentNode (node) {
    return node.parentNode
  }
  
  function nextSibling (node) {
    return node.nextSibling
  }
  
  function tagName (node) {
    return node.tagName
  }
  
  function setTextContent (node, text) {
    node.textContent = text;
  }
  
  function setAttribute (node, key, val) {
    node.setAttribute(key, val);
  }
  
  
  var nodeOps = Object.freeze({
  	createElement: createElement$1,
  	createElementNS: createElementNS,
  	createTextNode: createTextNode,
  	createComment: createComment,
  	insertBefore: insertBefore,
  	removeChild: removeChild,
  	appendChild: appendChild,
  	parentNode: parentNode,
  	nextSibling: nextSibling,
  	tagName: tagName,
  	setTextContent: setTextContent,
  	setAttribute: setAttribute
  });
  
  /*  */
  
  var ref = {
    create: function create (_, vnode) {
      registerRef(vnode);
    },
    update: function update (oldVnode, vnode) {
      if (oldVnode.data.ref !== vnode.data.ref) {
        registerRef(oldVnode, true);
        registerRef(vnode);
      }
    },
    destroy: function destroy (vnode) {
      registerRef(vnode, true);
    }
  };
  
  function registerRef (vnode, isRemoval) {
    var key = vnode.data.ref;
    if (!key) { return }
  
    var vm = vnode.context;
    var ref = vnode.componentInstance || vnode.elm;
    var refs = vm.$refs;
    if (isRemoval) {
      if (Array.isArray(refs[key])) {
        remove(refs[key], ref);
      } else if (refs[key] === ref) {
        refs[key] = undefined;
      }
    } else {
      if (vnode.data.refInFor) {
        if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
          refs[key].push(ref);
        } else {
          refs[key] = [ref];
        }
      } else {
        refs[key] = ref;
      }
    }
  }
  
  /**
   * Virtual DOM patching algorithm based on Snabbdom by
   * Simon Friis Vindum (@paldepind)
   * Licensed under the MIT License
   * https://github.com/paldepind/snabbdom/blob/master/LICENSE
   *
   * modified by Evan You (@yyx990803)
   *
  
  /*
   * Not type-checking this because this file is perf-critical and the cost
   * of making flow understand it is not worth it.
   */
  
  var emptyNode = new VNode('', {}, []);
  
  var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
  
  function isUndef (v) {
    return v === undefined || v === null
  }
  
  function isDef (v) {
    return v !== undefined && v !== null
  }
  
  function isTrue (v) {
    return v === true
  }
  
  function sameVnode (a, b) {
    return (
      a.key === b.key &&
      a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)
    )
  }
  
  // Some browsers do not support dynamically changing type for <input>
  // so they need to be treated as different nodes
  function sameInputType (a, b) {
    if (a.tag !== 'input') { return true }
    var i;
    var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
    var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
    return typeA === typeB
  }
  
  function createKeyToOldIdx (children, beginIdx, endIdx) {
    var i, key;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
      key = children[i].key;
      if (isDef(key)) { map[key] = i; }
    }
    return map
  }
  
  function createPatchFunction (backend) {
    var i, j;
    var cbs = {};
  
    var modules = backend.modules;
    var nodeOps = backend.nodeOps;
  
    for (i = 0; i < hooks.length; ++i) {
      cbs[hooks[i]] = [];
      for (j = 0; j < modules.length; ++j) {
        if (isDef(modules[j][hooks[i]])) {
          cbs[hooks[i]].push(modules[j][hooks[i]]);
        }
      }
    }
  
    function emptyNodeAt (elm) {
      return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }
  
    function createRmCb (childElm, listeners) {
      function remove$$1 () {
        if (--remove$$1.listeners === 0) {
          removeNode(childElm);
        }
      }
      remove$$1.listeners = listeners;
      return remove$$1
    }
  
    function removeNode (el) {
      var parent = nodeOps.parentNode(el);
      // element may have already been removed due to v-html / v-text
      if (isDef(parent)) {
        nodeOps.removeChild(parent, el);
      }
    }
  
    var inPre = 0;
    function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
      vnode.isRootInsert = !nested; // for transition enter check
      if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
        return
      }
  
      var data = vnode.data;
      var children = vnode.children;
      var tag = vnode.tag;
      if (isDef(tag)) {
        if ('development' !== 'production') {
          if (data && data.pre) {
            inPre++;
          }
          if (
            !inPre &&
            !vnode.ns &&
            !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
            config.isUnknownElement(tag)
          ) {
            warn(
              'Unknown custom element: <' + tag + '> - did you ' +
              'register the component correctly? For recursive components, ' +
              'make sure to provide the "name" option.',
              vnode.context
            );
          }
        }
        vnode.elm = vnode.ns
          ? nodeOps.createElementNS(vnode.ns, tag)
          : nodeOps.createElement(tag, vnode);
        setScope(vnode);
  
        /* istanbul ignore if */
        {
          createChildren(vnode, children, insertedVnodeQueue);
          if (isDef(data)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
          }
          insert(parentElm, vnode.elm, refElm);
        }
  
        if ('development' !== 'production' && data && data.pre) {
          inPre--;
        }
      } else if (isTrue(vnode.isComment)) {
        vnode.elm = nodeOps.createComment(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      } else {
        vnode.elm = nodeOps.createTextNode(vnode.text);
        insert(parentElm, vnode.elm, refElm);
      }
    }
  
    function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i = vnode.data;
      if (isDef(i)) {
        var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
        if (isDef(i = i.hook) && isDef(i = i.init)) {
          i(vnode, false /* hydrating */, parentElm, refElm);
        }
        // after calling the init hook, if the vnode is a child component
        // it should've created a child instance and mounted it. the child
        // component also has set the placeholder vnode's elm.
        // in that case we can just return the element and be done.
        if (isDef(vnode.componentInstance)) {
          initComponent(vnode, insertedVnodeQueue);
          if (isTrue(isReactivated)) {
            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
          }
          return true
        }
      }
    }
  
    function initComponent (vnode, insertedVnodeQueue) {
      if (isDef(vnode.data.pendingInsert)) {
        insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      }
      vnode.elm = vnode.componentInstance.$el;
      if (isPatchable(vnode)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
        setScope(vnode);
      } else {
        // empty component root.
        // skip all element-related modules except for ref (#3455)
        registerRef(vnode);
        // make sure to invoke the insert hook
        insertedVnodeQueue.push(vnode);
      }
    }
  
    function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
      var i;
      // hack for #4339: a reactivated component with inner transition
      // does not trigger because the inner node's created hooks are not called
      // again. It's not ideal to involve module-specific logic in here but
      // there doesn't seem to be a better way to do it.
      var innerNode = vnode;
      while (innerNode.componentInstance) {
        innerNode = innerNode.componentInstance._vnode;
        if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
          for (i = 0; i < cbs.activate.length; ++i) {
            cbs.activate[i](emptyNode, innerNode);
          }
          insertedVnodeQueue.push(innerNode);
          break
        }
      }
      // unlike a newly created component,
      // a reactivated keep-alive component doesn't insert itself
      insert(parentElm, vnode.elm, refElm);
    }
  
    function insert (parent, elm, ref) {
      if (isDef(parent)) {
        if (isDef(ref)) {
          nodeOps.insertBefore(parent, elm, ref);
        } else {
          nodeOps.appendChild(parent, elm);
        }
      }
    }
  
    function createChildren (vnode, children, insertedVnodeQueue) {
      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; ++i) {
          createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
        }
      } else if (isPrimitive(vnode.text)) {
        nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
      }
    }
  
    function isPatchable (vnode) {
      while (vnode.componentInstance) {
        vnode = vnode.componentInstance._vnode;
      }
      return isDef(vnode.tag)
    }
  
    function invokeCreateHooks (vnode, insertedVnodeQueue) {
      for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
        cbs.create[i$1](emptyNode, vnode);
      }
      i = vnode.data.hook; // Reuse variable
      if (isDef(i)) {
        if (isDef(i.create)) { i.create(emptyNode, vnode); }
        if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
      }
    }
  
    // set scope id attribute for scoped CSS.
    // this is implemented as a special case to avoid the overhead
    // of going through the normal attribute patching process.
    function setScope (vnode) {
      var i;
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
      // for slot content they should also get the scopeId from the host instance.
      if (isDef(i = activeInstance) &&
          i !== vnode.context &&
          isDef(i = i.$options._scopeId)) {
        nodeOps.setAttribute(vnode.elm, i, '');
      }
    }
  
    function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
      for (; startIdx <= endIdx; ++startIdx) {
        createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
      }
    }
  
    function invokeDestroyHook (vnode) {
      var i, j;
      var data = vnode.data;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
        for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
      }
      if (isDef(i = vnode.children)) {
        for (j = 0; j < vnode.children.length; ++j) {
          invokeDestroyHook(vnode.children[j]);
        }
      }
    }
  
    function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
      for (; startIdx <= endIdx; ++startIdx) {
        var ch = vnodes[startIdx];
        if (isDef(ch)) {
          if (isDef(ch.tag)) {
            removeAndInvokeRemoveHook(ch);
            invokeDestroyHook(ch);
          } else { // Text node
            removeNode(ch.elm);
          }
        }
      }
    }
  
    function removeAndInvokeRemoveHook (vnode, rm) {
      if (isDef(rm) || isDef(vnode.data)) {
        var listeners = cbs.remove.length + 1;
        if (isDef(rm)) {
          // we have a recursively passed down rm callback
          // increase the listeners count
          rm.listeners += listeners;
        } else {
          // directly removing
          rm = createRmCb(vnode.elm, listeners);
        }
        // recursively invoke hooks on child component root node
        if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
          removeAndInvokeRemoveHook(i, rm);
        }
        for (i = 0; i < cbs.remove.length; ++i) {
          cbs.remove[i](vnode, rm);
        }
        if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
          i(vnode, rm);
        } else {
          rm();
        }
      } else {
        removeNode(vnode.elm);
      }
    }
  
    function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
      var oldStartIdx = 0;
      var newStartIdx = 0;
      var oldEndIdx = oldCh.length - 1;
      var oldStartVnode = oldCh[0];
      var oldEndVnode = oldCh[oldEndIdx];
      var newEndIdx = newCh.length - 1;
      var newStartVnode = newCh[0];
      var newEndVnode = newCh[newEndIdx];
      var oldKeyToIdx, idxInOld, elmToMove, refElm;
  
      // removeOnly is a special flag used only by <transition-group>
      // to ensure removed elements stay in correct relative positions
      // during leaving transitions
      var canMove = !removeOnly;
  
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (isUndef(oldStartVnode)) {
          oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
        } else if (isUndef(oldEndVnode)) {
          oldEndVnode = oldCh[--oldEndIdx];
        } else if (sameVnode(oldStartVnode, newStartVnode)) {
          patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
          oldStartVnode = oldCh[++oldStartIdx];
          newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
          patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
          oldEndVnode = oldCh[--oldEndIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
          patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
          canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
          oldStartVnode = oldCh[++oldStartIdx];
          newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
          patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
          canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
          oldEndVnode = oldCh[--oldEndIdx];
          newStartVnode = newCh[++newStartIdx];
        } else {
          if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
          idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
          if (isUndef(idxInOld)) { // New element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            elmToMove = oldCh[idxInOld];
            /* istanbul ignore if */
            if ('development' !== 'production' && !elmToMove) {
              warn(
                'It seems there are duplicate keys that is causing an update error. ' +
                'Make sure each v-for item has a unique key.'
              );
            }
            if (sameVnode(elmToMove, newStartVnode)) {
              patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
              oldCh[idxInOld] = undefined;
              canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            } else {
              // same key but different element. treat as new element
              createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
              newStartVnode = newCh[++newStartIdx];
            }
          }
        }
      }
      if (oldStartIdx > oldEndIdx) {
        refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
        addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
      } else if (newStartIdx > newEndIdx) {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  
    function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
      if (oldVnode === vnode) {
        return
      }
      // reuse element for static trees.
      // note we only do this if the vnode is cloned -
      // if the new node is not cloned it means the render functions have been
      // reset by the hot-reload-api and we need to do a proper re-render.
      if (isTrue(vnode.isStatic) &&
          isTrue(oldVnode.isStatic) &&
          vnode.key === oldVnode.key &&
          (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
        vnode.elm = oldVnode.elm;
        vnode.componentInstance = oldVnode.componentInstance;
        return
      }
      var i;
      var data = vnode.data;
      if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
        i(oldVnode, vnode);
      }
      var elm = vnode.elm = oldVnode.elm;
      var oldCh = oldVnode.children;
      var ch = vnode.children;
      if (isDef(data) && isPatchable(vnode)) {
        for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
        if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
      }
      if (isUndef(vnode.text)) {
        if (isDef(oldCh) && isDef(ch)) {
          if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
        } else if (isDef(ch)) {
          if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
          addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
        } else if (isDef(oldCh)) {
          removeVnodes(elm, oldCh, 0, oldCh.length - 1);
        } else if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }
      } else if (oldVnode.text !== vnode.text) {
        nodeOps.setTextContent(elm, vnode.text);
      }
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
      }
    }
  
    function invokeInsertHook (vnode, queue, initial) {
      // delay insert hooks for component root nodes, invoke them after the
      // element is really inserted
      if (isTrue(initial) && isDef(vnode.parent)) {
        vnode.parent.data.pendingInsert = queue;
      } else {
        for (var i = 0; i < queue.length; ++i) {
          queue[i].data.hook.insert(queue[i]);
        }
      }
    }
  
    var bailed = false;
    // list of modules that can skip create hook during hydration because they
    // are already rendered on the client or has no need for initialization
    var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');
  
    // Note: this is a browser-only function so we can assume elms are DOM nodes.
    function hydrate (elm, vnode, insertedVnodeQueue) {
      if ('development' !== 'production') {
        if (!assertNodeMatch(elm, vnode)) {
          return false
        }
      }
      vnode.elm = elm;
      var tag = vnode.tag;
      var data = vnode.data;
      var children = vnode.children;
      if (isDef(data)) {
        if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
        if (isDef(i = vnode.componentInstance)) {
          // child component. it should have hydrated its own tree.
          initComponent(vnode, insertedVnodeQueue);
          return true
        }
      }
      if (isDef(tag)) {
        if (isDef(children)) {
          // empty element, allow client to pick up and populate children
          if (!elm.hasChildNodes()) {
            createChildren(vnode, children, insertedVnodeQueue);
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              if ('development' !== 'production' &&
                  typeof console !== 'undefined' &&
                  !bailed) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
        if (isDef(data)) {
          for (var key in data) {
            if (!isRenderedModule(key)) {
              invokeCreateHooks(vnode, insertedVnodeQueue);
              break
            }
          }
        }
      } else if (elm.data !== vnode.text) {
        elm.data = vnode.text;
      }
      return true
    }
  
    function assertNodeMatch (node, vnode) {
      if (isDef(vnode.tag)) {
        return (
          vnode.tag.indexOf('vue-component') === 0 ||
          vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
        )
      } else {
        return node.nodeType === (vnode.isComment ? 8 : 3)
      }
    }
  
    return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
      if (isUndef(vnode)) {
        if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
        return
      }
  
      var isInitialPatch = false;
      var insertedVnodeQueue = [];
  
      if (isUndef(oldVnode)) {
        // empty mount (likely as component), create new root element
        isInitialPatch = true;
        createElm(vnode, insertedVnodeQueue, parentElm, refElm);
      } else {
        var isRealElement = isDef(oldVnode.nodeType);
        if (!isRealElement && sameVnode(oldVnode, vnode)) {
          // patch existing root node
          patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
        } else {
          if (isRealElement) {
            // mounting to a real element
            // check if this is server-rendered content and if we can perform
            // a successful hydration.
            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
              oldVnode.removeAttribute('server-rendered');
              hydrating = true;
            }
            if (isTrue(hydrating)) {
              if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                invokeInsertHook(vnode, insertedVnodeQueue, true);
                return oldVnode
              } else if ('development' !== 'production') {
                warn(
                  'The client-side rendered virtual DOM tree is not matching ' +
                  'server-rendered content. This is likely caused by incorrect ' +
                  'HTML markup, for example nesting block-level elements inside ' +
                  '<p>, or missing <tbody>. Bailing hydration and performing ' +
                  'full client-side render.'
                );
              }
            }
            // either not server-rendered, or hydration failed.
            // create an empty node and replace it
            oldVnode = emptyNodeAt(oldVnode);
          }
          // replacing existing element
          var oldElm = oldVnode.elm;
          var parentElm$1 = nodeOps.parentNode(oldElm);
          createElm(
            vnode,
            insertedVnodeQueue,
            // extremely rare edge case: do not insert if old element is in a
            // leaving transition. Only happens when combining transition +
            // keep-alive + HOCs. (#4590)
            oldElm._leaveCb ? null : parentElm$1,
            nodeOps.nextSibling(oldElm)
          );
  
          if (isDef(vnode.parent)) {
            // component root element replaced.
            // update parent placeholder node element, recursively
            var ancestor = vnode.parent;
            while (ancestor) {
              ancestor.elm = vnode.elm;
              ancestor = ancestor.parent;
            }
            if (isPatchable(vnode)) {
              for (var i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, vnode.parent);
              }
            }
          }
  
          if (isDef(parentElm$1)) {
            removeVnodes(parentElm$1, [oldVnode], 0, 0);
          } else if (isDef(oldVnode.tag)) {
            invokeDestroyHook(oldVnode);
          }
        }
      }
  
      invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
      return vnode.elm
    }
  }
  
  /*  */
  
  var directives = {
    create: updateDirectives,
    update: updateDirectives,
    destroy: function unbindDirectives (vnode) {
      updateDirectives(vnode, emptyNode);
    }
  };
  
  function updateDirectives (oldVnode, vnode) {
    if (oldVnode.data.directives || vnode.data.directives) {
      _update(oldVnode, vnode);
    }
  }
  
  function _update (oldVnode, vnode) {
    var isCreate = oldVnode === emptyNode;
    var isDestroy = vnode === emptyNode;
    var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
    var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  
    var dirsWithInsert = [];
    var dirsWithPostpatch = [];
  
    var key, oldDir, dir;
    for (key in newDirs) {
      oldDir = oldDirs[key];
      dir = newDirs[key];
      if (!oldDir) {
        // new directive, bind
        callHook$1(dir, 'bind', vnode, oldVnode);
        if (dir.def && dir.def.inserted) {
          dirsWithInsert.push(dir);
        }
      } else {
        // existing directive, update
        dir.oldValue = oldDir.value;
        callHook$1(dir, 'update', vnode, oldVnode);
        if (dir.def && dir.def.componentUpdated) {
          dirsWithPostpatch.push(dir);
        }
      }
    }
  
    if (dirsWithInsert.length) {
      var callInsert = function () {
        for (var i = 0; i < dirsWithInsert.length; i++) {
          callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
        }
      };
      if (isCreate) {
        mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
      } else {
        callInsert();
      }
    }
  
    if (dirsWithPostpatch.length) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
        for (var i = 0; i < dirsWithPostpatch.length; i++) {
          callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
        }
      });
    }
  
    if (!isCreate) {
      for (key in oldDirs) {
        if (!newDirs[key]) {
          // no longer present, unbind
          callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
        }
      }
    }
  }
  
  var emptyModifiers = Object.create(null);
  
  function normalizeDirectives$1 (
    dirs,
    vm
  ) {
    var res = Object.create(null);
    if (!dirs) {
      return res
    }
    var i, dir;
    for (i = 0; i < dirs.length; i++) {
      dir = dirs[i];
      if (!dir.modifiers) {
        dir.modifiers = emptyModifiers;
      }
      res[getRawDirName(dir)] = dir;
      dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
    }
    return res
  }
  
  function getRawDirName (dir) {
    return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
  }
  
  function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
    var fn = dir.def && dir.def[hook];
    if (fn) {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    }
  }
  
  var baseModules = [
    ref,
    directives
  ];
  
  /*  */
  
  function updateAttrs (oldVnode, vnode) {
    if (!oldVnode.data.attrs && !vnode.data.attrs) {
      return
    }
    var key, cur, old;
    var elm = vnode.elm;
    var oldAttrs = oldVnode.data.attrs || {};
    var attrs = vnode.data.attrs || {};
    // clone observed objects, as the user probably wants to mutate it
    if (attrs.__ob__) {
      attrs = vnode.data.attrs = extend({}, attrs);
    }
  
    for (key in attrs) {
      cur = attrs[key];
      old = oldAttrs[key];
      if (old !== cur) {
        setAttr(elm, key, cur);
      }
    }
    // #4391: in IE9, setting type can reset value for input[type=radio]
    /* istanbul ignore if */
    if (isIE9 && attrs.value !== oldAttrs.value) {
      setAttr(elm, 'value', attrs.value);
    }
    for (key in oldAttrs) {
      if (attrs[key] == null) {
        if (isXlink(key)) {
          elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
        } else if (!isEnumeratedAttr(key)) {
          elm.removeAttribute(key);
        }
      }
    }
  }
  
  function setAttr (el, key, value) {
    if (isBooleanAttr(key)) {
      // set attribute for blank value
      // e.g. <option disabled>Select one</option>
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, key);
      }
    } else if (isEnumeratedAttr(key)) {
      el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
    } else if (isXlink(key)) {
      if (isFalsyAttrValue(value)) {
        el.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      if (isFalsyAttrValue(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  
  var attrs = {
    create: updateAttrs,
    update: updateAttrs
  };
  
  /*  */
  
  function updateClass (oldVnode, vnode) {
    var el = vnode.elm;
    var data = vnode.data;
    var oldData = oldVnode.data;
    if (!data.staticClass && !data.class &&
        (!oldData || (!oldData.staticClass && !oldData.class))) {
      return
    }
  
    var cls = genClassForVnode(vnode);
  
    // handle transition classes
    var transitionClass = el._transitionClasses;
    if (transitionClass) {
      cls = concat(cls, stringifyClass(transitionClass));
    }
  
    // set the class
    if (cls !== el._prevClass) {
      el.setAttribute('class', cls);
      el._prevClass = cls;
    }
  }
  
  var klass = {
    create: updateClass,
    update: updateClass
  };
  
  /*  */
  
  var validDivisionCharRE = /[\w).+\-_$\]]/;
  
  
  
  function wrapFilter (exp, filter) {
    var i = filter.indexOf('(');
    if (i < 0) {
      // _f: resolveFilter
      return ("_f(\"" + filter + "\")(" + exp + ")")
    } else {
      var name = filter.slice(0, i);
      var args = filter.slice(i + 1);
      return ("_f(\"" + name + "\")(" + exp + "," + args)
    }
  }
  
  /*  */
  
  /*  */
  
  /**
   * Cross-platform code generation for component v-model
   */
  
  
  /**
   * Cross-platform codegen helper for generating v-model value assignment code.
   */
  
  
  /**
   * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
   *
   * for loop possible cases:
   *
   * - test
   * - test[idx]
   * - test[test1[idx]]
   * - test["a"][idx]
   * - xxx.test[a[a].test1[idx]]
   * - test.xxx.a["asa"][test1[idx]]
   *
   */
  
  var str;
  var index$1;
  
  /*  */
  
  // in some cases, the event used has to be determined at runtime
  // so we used some reserved tokens during compile.
  var RANGE_TOKEN = '__r';
  var CHECKBOX_RADIO_TOKEN = '__c';
  
  /*  */
  
  // normalize v-model event tokens that can only be determined at runtime.
  // it's important to place the event as the first in the array because
  // the whole point is ensuring the v-model callback gets called before
  // user-attached handlers.
  function normalizeEvents (on) {
    var event;
    /* istanbul ignore if */
    if (on[RANGE_TOKEN]) {
      // IE input[type=range] only supports `change` event
      event = isIE ? 'change' : 'input';
      on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
      delete on[RANGE_TOKEN];
    }
    if (on[CHECKBOX_RADIO_TOKEN]) {
      // Chrome fires microtasks in between click/change, leads to #4521
      event = isChrome ? 'click' : 'change';
      on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
      delete on[CHECKBOX_RADIO_TOKEN];
    }
  }
  
  var target$1;
  
  function add$1 (
    event,
    handler,
    once,
    capture
  ) {
    if (once) {
      var oldHandler = handler;
      var _target = target$1; // save current target element in closure
      handler = function (ev) {
        var res = arguments.length === 1
          ? oldHandler(ev)
          : oldHandler.apply(null, arguments);
        if (res !== null) {
          remove$2(event, handler, capture, _target);
        }
      };
    }
    target$1.addEventListener(event, handler, capture);
  }
  
  function remove$2 (
    event,
    handler,
    capture,
    _target
  ) {
    (_target || target$1).removeEventListener(event, handler, capture);
  }
  
  function updateDOMListeners (oldVnode, vnode) {
    if (!oldVnode.data.on && !vnode.data.on) {
      return
    }
    var on = vnode.data.on || {};
    var oldOn = oldVnode.data.on || {};
    target$1 = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  }
  
  var events = {
    create: updateDOMListeners,
    update: updateDOMListeners
  };
  
  /*  */
  
  function updateDOMProps (oldVnode, vnode) {
    if (!oldVnode.data.domProps && !vnode.data.domProps) {
      return
    }
    var key, cur;
    var elm = vnode.elm;
    var oldProps = oldVnode.data.domProps || {};
    var props = vnode.data.domProps || {};
    // clone observed objects, as the user probably wants to mutate it
    if (props.__ob__) {
      props = vnode.data.domProps = extend({}, props);
    }
  
    for (key in oldProps) {
      if (props[key] == null) {
        elm[key] = '';
      }
    }
    for (key in props) {
      cur = props[key];
      // ignore children if the node has textContent or innerHTML,
      // as these will throw away existing DOM nodes and cause removal errors
      // on subsequent patches (#3360)
      if (key === 'textContent' || key === 'innerHTML') {
        if (vnode.children) { vnode.children.length = 0; }
        if (cur === oldProps[key]) { continue }
      }
  
      if (key === 'value') {
        // store value as _value as well since
        // non-string values will be stringified
        elm._value = cur;
        // avoid resetting cursor position when value is the same
        var strCur = cur == null ? '' : String(cur);
        if (shouldUpdateValue(elm, vnode, strCur)) {
          elm.value = strCur;
        }
      } else {
        elm[key] = cur;
      }
    }
  }
  
  // check platforms/web/util/attrs.js acceptValue
  
  
  function shouldUpdateValue (
    elm,
    vnode,
    checkVal
  ) {
    return (!elm.composing && (
      vnode.tag === 'option' ||
      isDirty(elm, checkVal) ||
      isInputChanged(elm, checkVal)
    ))
  }
  
  function isDirty (elm, checkVal) {
    // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
    return document.activeElement !== elm && elm.value !== checkVal
  }
  
  function isInputChanged (elm, newVal) {
    var value = elm.value;
    var modifiers = elm._vModifiers; // injected by v-model runtime
    if ((modifiers && modifiers.number) || elm.type === 'number') {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers && modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
    return value !== newVal
  }
  
  var domProps = {
    create: updateDOMProps,
    update: updateDOMProps
  };
  
  /*  */
  
  var parseStyleText = cached(function (cssText) {
    var res = {};
    var listDelimiter = /;(?![^(]*\))/g;
    var propertyDelimiter = /:(.+)/;
    cssText.split(listDelimiter).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiter);
        tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return res
  });
  
  // merge static and dynamic style data on the same vnode
  function normalizeStyleData (data) {
    var style = normalizeStyleBinding(data.style);
    // static style is pre-processed into an object during compilation
    // and is always a fresh object, so it's safe to merge into it
    return data.staticStyle
      ? extend(data.staticStyle, style)
      : style
  }
  
  // normalize possible array / string values into Object
  function normalizeStyleBinding (bindingStyle) {
    if (Array.isArray(bindingStyle)) {
      return toObject(bindingStyle)
    }
    if (typeof bindingStyle === 'string') {
      return parseStyleText(bindingStyle)
    }
    return bindingStyle
  }
  
  /**
   * parent component style should be after child's
   * so that parent component's style could override it
   */
  function getStyle (vnode, checkChild) {
    var res = {};
    var styleData;
  
    if (checkChild) {
      var childNode = vnode;
      while (childNode.componentInstance) {
        childNode = childNode.componentInstance._vnode;
        if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
          extend(res, styleData);
        }
      }
    }
  
    if ((styleData = normalizeStyleData(vnode.data))) {
      extend(res, styleData);
    }
  
    var parentNode = vnode;
    while ((parentNode = parentNode.parent)) {
      if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
        extend(res, styleData);
      }
    }
    return res
  }
  
  /*  */
  
  var cssVarRE = /^--/;
  var importantRE = /\s*!important$/;
  var setProp = function (el, name, val) {
    /* istanbul ignore if */
    if (cssVarRE.test(name)) {
      el.style.setProperty(name, val);
    } else if (importantRE.test(val)) {
      el.style.setProperty(name, val.replace(importantRE, ''), 'important');
    } else {
      el.style[normalize(name)] = val;
    }
  };
  
  var prefixes = ['Webkit', 'Moz', 'ms'];
  
  var testEl;
  var normalize = cached(function (prop) {
    testEl = testEl || document.createElement('div');
    prop = camelize(prop);
    if (prop !== 'filter' && (prop in testEl.style)) {
      return prop
    }
    var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
    for (var i = 0; i < prefixes.length; i++) {
      var prefixed = prefixes[i] + upper;
      if (prefixed in testEl.style) {
        return prefixed
      }
    }
  });
  
  function updateStyle (oldVnode, vnode) {
    var data = vnode.data;
    var oldData = oldVnode.data;
  
    if (!data.staticStyle && !data.style &&
        !oldData.staticStyle && !oldData.style) {
      return
    }
  
    var cur, name;
    var el = vnode.elm;
    var oldStaticStyle = oldVnode.data.staticStyle;
    var oldStyleBinding = oldVnode.data.style || {};
  
    // if static style exists, stylebinding already merged into it when doing normalizeStyleData
    var oldStyle = oldStaticStyle || oldStyleBinding;
  
    var style = normalizeStyleBinding(vnode.data.style) || {};
  
    vnode.data.style = style.__ob__ ? extend({}, style) : style;
  
    var newStyle = getStyle(vnode, true);
  
    for (name in oldStyle) {
      if (newStyle[name] == null) {
        setProp(el, name, '');
      }
    }
    for (name in newStyle) {
      cur = newStyle[name];
      if (cur !== oldStyle[name]) {
        // ie9 setting to null has no effect, must use empty string
        setProp(el, name, cur == null ? '' : cur);
      }
    }
  }
  
  var style = {
    create: updateStyle,
    update: updateStyle
  };
  
  /*  */
  
  /**
   * Add class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function addClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }
  
    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
      } else {
        el.classList.add(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      if (cur.indexOf(' ' + cls + ' ') < 0) {
        el.setAttribute('class', (cur + cls).trim());
      }
    }
  }
  
  /**
   * Remove class with compatibility for SVG since classList is not supported on
   * SVG elements in IE
   */
  function removeClass (el, cls) {
    /* istanbul ignore if */
    if (!cls || !(cls = cls.trim())) {
      return
    }
  
    /* istanbul ignore else */
    if (el.classList) {
      if (cls.indexOf(' ') > -1) {
        cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
      } else {
        el.classList.remove(cls);
      }
    } else {
      var cur = " " + (el.getAttribute('class') || '') + " ";
      var tar = ' ' + cls + ' ';
      while (cur.indexOf(tar) >= 0) {
        cur = cur.replace(tar, ' ');
      }
      el.setAttribute('class', cur.trim());
    }
  }
  
  /*  */
  
  function resolveTransition (def$$1) {
    if (!def$$1) {
      return
    }
    /* istanbul ignore else */
    if (typeof def$$1 === 'object') {
      var res = {};
      if (def$$1.css !== false) {
        extend(res, autoCssTransition(def$$1.name || 'v'));
      }
      extend(res, def$$1);
      return res
    } else if (typeof def$$1 === 'string') {
      return autoCssTransition(def$$1)
    }
  }
  
  var autoCssTransition = cached(function (name) {
    return {
      enterClass: (name + "-enter"),
      enterToClass: (name + "-enter-to"),
      enterActiveClass: (name + "-enter-active"),
      leaveClass: (name + "-leave"),
      leaveToClass: (name + "-leave-to"),
      leaveActiveClass: (name + "-leave-active")
    }
  });
  
  var hasTransition = inBrowser && !isIE9;
  var TRANSITION = 'transition';
  var ANIMATION = 'animation';
  
  // Transition property/event sniffing
  var transitionProp = 'transition';
  var transitionEndEvent = 'transitionend';
  var animationProp = 'animation';
  var animationEndEvent = 'animationend';
  if (hasTransition) {
    /* istanbul ignore if */
    if (window.ontransitionend === undefined &&
      window.onwebkittransitionend !== undefined) {
      transitionProp = 'WebkitTransition';
      transitionEndEvent = 'webkitTransitionEnd';
    }
    if (window.onanimationend === undefined &&
      window.onwebkitanimationend !== undefined) {
      animationProp = 'WebkitAnimation';
      animationEndEvent = 'webkitAnimationEnd';
    }
  }
  
  // binding to window is necessary to make hot reload work in IE in strict mode
  var raf = inBrowser && window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout;
  
  function nextFrame (fn) {
    raf(function () {
      raf(fn);
    });
  }
  
  function addTransitionClass (el, cls) {
    (el._transitionClasses || (el._transitionClasses = [])).push(cls);
    addClass(el, cls);
  }
  
  function removeTransitionClass (el, cls) {
    if (el._transitionClasses) {
      remove(el._transitionClasses, cls);
    }
    removeClass(el, cls);
  }
  
  function whenTransitionEnds (
    el,
    expectedType,
    cb
  ) {
    var ref = getTransitionInfo(el, expectedType);
    var type = ref.type;
    var timeout = ref.timeout;
    var propCount = ref.propCount;
    if (!type) { return cb() }
    var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
    var ended = 0;
    var end = function () {
      el.removeEventListener(event, onEnd);
      cb();
    };
    var onEnd = function (e) {
      if (e.target === el) {
        if (++ended >= propCount) {
          end();
        }
      }
    };
    setTimeout(function () {
      if (ended < propCount) {
        end();
      }
    }, timeout + 1);
    el.addEventListener(event, onEnd);
  }
  
  var transformRE = /\b(transform|all)(,|$)/;
  
  function getTransitionInfo (el, expectedType) {
    var styles = window.getComputedStyle(el);
    var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
    var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
    var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
    var animationDelays = styles[animationProp + 'Delay'].split(', ');
    var animationDurations = styles[animationProp + 'Duration'].split(', ');
    var animationTimeout = getTimeout(animationDelays, animationDurations);
  
    var type;
    var timeout = 0;
    var propCount = 0;
    /* istanbul ignore if */
    if (expectedType === TRANSITION) {
      if (transitionTimeout > 0) {
        type = TRANSITION;
        timeout = transitionTimeout;
        propCount = transitionDurations.length;
      }
    } else if (expectedType === ANIMATION) {
      if (animationTimeout > 0) {
        type = ANIMATION;
        timeout = animationTimeout;
        propCount = animationDurations.length;
      }
    } else {
      timeout = Math.max(transitionTimeout, animationTimeout);
      type = timeout > 0
        ? transitionTimeout > animationTimeout
          ? TRANSITION
          : ANIMATION
        : null;
      propCount = type
        ? type === TRANSITION
          ? transitionDurations.length
          : animationDurations.length
        : 0;
    }
    var hasTransform =
      type === TRANSITION &&
      transformRE.test(styles[transitionProp + 'Property']);
    return {
      type: type,
      timeout: timeout,
      propCount: propCount,
      hasTransform: hasTransform
    }
  }
  
  function getTimeout (delays, durations) {
    /* istanbul ignore next */
    while (delays.length < durations.length) {
      delays = delays.concat(delays);
    }
  
    return Math.max.apply(null, durations.map(function (d, i) {
      return toMs(d) + toMs(delays[i])
    }))
  }
  
  function toMs (s) {
    return Number(s.slice(0, -1)) * 1000
  }
  
  /*  */
  
  function enter (vnode, toggleDisplay) {
    var el = vnode.elm;
  
    // call leave callback now
    if (el._leaveCb) {
      el._leaveCb.cancelled = true;
      el._leaveCb();
    }
  
    var data = resolveTransition(vnode.data.transition);
    if (!data) {
      return
    }
  
    /* istanbul ignore if */
    if (el._enterCb || el.nodeType !== 1) {
      return
    }
  
    var css = data.css;
    var type = data.type;
    var enterClass = data.enterClass;
    var enterToClass = data.enterToClass;
    var enterActiveClass = data.enterActiveClass;
    var appearClass = data.appearClass;
    var appearToClass = data.appearToClass;
    var appearActiveClass = data.appearActiveClass;
    var beforeEnter = data.beforeEnter;
    var enter = data.enter;
    var afterEnter = data.afterEnter;
    var enterCancelled = data.enterCancelled;
    var beforeAppear = data.beforeAppear;
    var appear = data.appear;
    var afterAppear = data.afterAppear;
    var appearCancelled = data.appearCancelled;
    var duration = data.duration;
  
    // activeInstance will always be the <transition> component managing this
    // transition. One edge case to check is when the <transition> is placed
    // as the root node of a child component. In that case we need to check
    // <transition>'s parent for appear check.
    var context = activeInstance;
    var transitionNode = activeInstance.$vnode;
    while (transitionNode && transitionNode.parent) {
      transitionNode = transitionNode.parent;
      context = transitionNode.context;
    }
  
    var isAppear = !context._isMounted || !vnode.isRootInsert;
  
    if (isAppear && !appear && appear !== '') {
      return
    }
  
    var startClass = isAppear && appearClass
      ? appearClass
      : enterClass;
    var activeClass = isAppear && appearActiveClass
      ? appearActiveClass
      : enterActiveClass;
    var toClass = isAppear && appearToClass
      ? appearToClass
      : enterToClass;
  
    var beforeEnterHook = isAppear
      ? (beforeAppear || beforeEnter)
      : beforeEnter;
    var enterHook = isAppear
      ? (typeof appear === 'function' ? appear : enter)
      : enter;
    var afterEnterHook = isAppear
      ? (afterAppear || afterEnter)
      : afterEnter;
    var enterCancelledHook = isAppear
      ? (appearCancelled || enterCancelled)
      : enterCancelled;
  
    var explicitEnterDuration = toNumber(
      isObject(duration)
        ? duration.enter
        : duration
    );
  
    if ('development' !== 'production' && explicitEnterDuration != null) {
      checkDuration(explicitEnterDuration, 'enter', vnode);
    }
  
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(enterHook);
  
    var cb = el._enterCb = once(function () {
      if (expectsCSS) {
        removeTransitionClass(el, toClass);
        removeTransitionClass(el, activeClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, startClass);
        }
        enterCancelledHook && enterCancelledHook(el);
      } else {
        afterEnterHook && afterEnterHook(el);
      }
      el._enterCb = null;
    });
  
    if (!vnode.data.show) {
      // remove pending leave element on enter by injecting an insert hook
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
        var parent = el.parentNode;
        var pendingNode = parent && parent._pending && parent._pending[vnode.key];
        if (pendingNode &&
            pendingNode.tag === vnode.tag &&
            pendingNode.elm._leaveCb) {
          pendingNode.elm._leaveCb();
        }
        enterHook && enterHook(el, cb);
      });
    }
  
    // start enter transition
    beforeEnterHook && beforeEnterHook(el);
    if (expectsCSS) {
      addTransitionClass(el, startClass);
      addTransitionClass(el, activeClass);
      nextFrame(function () {
        addTransitionClass(el, toClass);
        removeTransitionClass(el, startClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
  
    if (vnode.data.show) {
      toggleDisplay && toggleDisplay();
      enterHook && enterHook(el, cb);
    }
  
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
  
  function leave (vnode, rm) {
    var el = vnode.elm;
  
    // call enter callback now
    if (el._enterCb) {
      el._enterCb.cancelled = true;
      el._enterCb();
    }
  
    var data = resolveTransition(vnode.data.transition);
    if (!data) {
      return rm()
    }
  
    /* istanbul ignore if */
    if (el._leaveCb || el.nodeType !== 1) {
      return
    }
  
    var css = data.css;
    var type = data.type;
    var leaveClass = data.leaveClass;
    var leaveToClass = data.leaveToClass;
    var leaveActiveClass = data.leaveActiveClass;
    var beforeLeave = data.beforeLeave;
    var leave = data.leave;
    var afterLeave = data.afterLeave;
    var leaveCancelled = data.leaveCancelled;
    var delayLeave = data.delayLeave;
    var duration = data.duration;
  
    var expectsCSS = css !== false && !isIE9;
    var userWantsControl = getHookArgumentsLength(leave);
  
    var explicitLeaveDuration = toNumber(
      isObject(duration)
        ? duration.leave
        : duration
    );
  
    if ('development' !== 'production' && explicitLeaveDuration != null) {
      checkDuration(explicitLeaveDuration, 'leave', vnode);
    }
  
    var cb = el._leaveCb = once(function () {
      if (el.parentNode && el.parentNode._pending) {
        el.parentNode._pending[vnode.key] = null;
      }
      if (expectsCSS) {
        removeTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveActiveClass);
      }
      if (cb.cancelled) {
        if (expectsCSS) {
          removeTransitionClass(el, leaveClass);
        }
        leaveCancelled && leaveCancelled(el);
      } else {
        rm();
        afterLeave && afterLeave(el);
      }
      el._leaveCb = null;
    });
  
    if (delayLeave) {
      delayLeave(performLeave);
    } else {
      performLeave();
    }
  
    function performLeave () {
      // the delayed leave may have already been cancelled
      if (cb.cancelled) {
        return
      }
      // record leaving element
      if (!vnode.data.show) {
        (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
      }
      beforeLeave && beforeLeave(el);
      if (expectsCSS) {
        addTransitionClass(el, leaveClass);
        addTransitionClass(el, leaveActiveClass);
        nextFrame(function () {
          addTransitionClass(el, leaveToClass);
          removeTransitionClass(el, leaveClass);
          if (!cb.cancelled && !userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        });
      }
      leave && leave(el, cb);
      if (!expectsCSS && !userWantsControl) {
        cb();
      }
    }
  }
  
  // only used in dev mode
  function checkDuration (val, name, vnode) {
    if (typeof val !== 'number') {
      warn(
        "<transition> explicit " + name + " duration is not a valid number - " +
        "got " + (JSON.stringify(val)) + ".",
        vnode.context
      );
    } else if (isNaN(val)) {
      warn(
        "<transition> explicit " + name + " duration is NaN - " +
        'the duration expression might be incorrect.',
        vnode.context
      );
    }
  }
  
  function isValidDuration (val) {
    return typeof val === 'number' && !isNaN(val)
  }
  
  /**
   * Normalize a transition hook's argument length. The hook may be:
   * - a merged hook (invoker) with the original in .fns
   * - a wrapped component method (check ._length)
   * - a plain function (.length)
   */
  function getHookArgumentsLength (fn) {
    if (!fn) { return false }
    var invokerFns = fn.fns;
    if (invokerFns) {
      // invoker
      return getHookArgumentsLength(
        Array.isArray(invokerFns)
          ? invokerFns[0]
          : invokerFns
      )
    } else {
      return (fn._length || fn.length) > 1
    }
  }
  
  function _enter (_, vnode) {
    if (!vnode.data.show) {
      enter(vnode);
    }
  }
  
  var transition = inBrowser ? {
    create: _enter,
    activate: _enter,
    remove: function remove$$1 (vnode, rm) {
      /* istanbul ignore else */
      if (!vnode.data.show) {
        leave(vnode, rm);
      } else {
        rm();
      }
    }
  } : {};
  
  var platformModules = [
    attrs,
    klass,
    events,
    domProps,
    style,
    transition
  ];
  
  /*  */
  
  // the directive module should be applied last, after all
  // built-in modules have been applied.
  var modules = platformModules.concat(baseModules);
  
  var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
  
  /**
   * Not type checking this file because flow doesn't like attaching
   * properties to Elements.
   */
  
  /* istanbul ignore if */
  if (isIE9) {
    // http://www.matts411.com/post/internet-explorer-9-oninput/
    document.addEventListener('selectionchange', function () {
      var el = document.activeElement;
      if (el && el.vmodel) {
        trigger(el, 'input');
      }
    });
  }
  
  var model$1 = {
    inserted: function inserted (el, binding, vnode) {
      if (vnode.tag === 'select') {
        var cb = function () {
          setSelected(el, binding, vnode.context);
        };
        cb();
        /* istanbul ignore if */
        if (isIE || isEdge) {
          setTimeout(cb, 0);
        }
      } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
        el._vModifiers = binding.modifiers;
        if (!binding.modifiers.lazy) {
          if (!isAndroid) {
            el.addEventListener('compositionstart', onCompositionStart);
            el.addEventListener('compositionend', onCompositionEnd);
          }
          /* istanbul ignore if */
          if (isIE9) {
            el.vmodel = true;
          }
        }
      }
    },
    componentUpdated: function componentUpdated (el, binding, vnode) {
      if (vnode.tag === 'select') {
        setSelected(el, binding, vnode.context);
        // in case the options rendered by v-for have changed,
        // it's possible that the value is out-of-sync with the rendered options.
        // detect such cases and filter out values that no longer has a matching
        // option in the DOM.
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  };
  
  function setSelected (el, binding, vm) {
    var value = binding.value;
    var isMultiple = el.multiple;
    if (isMultiple && !Array.isArray(value)) {
      'development' !== 'production' && warn(
        "<select multiple v-model=\"" + (binding.expression) + "\"> " +
        "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
        vm
      );
      return
    }
    var selected, option;
    for (var i = 0, l = el.options.length; i < l; i++) {
      option = el.options[i];
      if (isMultiple) {
        selected = looseIndexOf(value, getValue(option)) > -1;
        if (option.selected !== selected) {
          option.selected = selected;
        }
      } else {
        if (looseEqual(getValue(option), value)) {
          if (el.selectedIndex !== i) {
            el.selectedIndex = i;
          }
          return
        }
      }
    }
    if (!isMultiple) {
      el.selectedIndex = -1;
    }
  }
  
  function hasNoMatchingOption (value, options) {
    for (var i = 0, l = options.length; i < l; i++) {
      if (looseEqual(getValue(options[i]), value)) {
        return false
      }
    }
    return true
  }
  
  function getValue (option) {
    return '_value' in option
      ? option._value
      : option.value
  }
  
  function onCompositionStart (e) {
    e.target.composing = true;
  }
  
  function onCompositionEnd (e) {
    e.target.composing = false;
    trigger(e.target, 'input');
  }
  
  function trigger (el, type) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
  }
  
  /*  */
  
  // recursively search for possible transition defined inside the component root
  function locateNode (vnode) {
    return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
      ? locateNode(vnode.componentInstance._vnode)
      : vnode
  }
  
  var show = {
    bind: function bind (el, ref, vnode) {
      var value = ref.value;
  
      vnode = locateNode(vnode);
      var transition = vnode.data && vnode.data.transition;
      var originalDisplay = el.__vOriginalDisplay =
        el.style.display === 'none' ? '' : el.style.display;
      if (value && transition && !isIE9) {
        vnode.data.show = true;
        enter(vnode, function () {
          el.style.display = originalDisplay;
        });
      } else {
        el.style.display = value ? originalDisplay : 'none';
      }
    },
  
    update: function update (el, ref, vnode) {
      var value = ref.value;
      var oldValue = ref.oldValue;
  
      /* istanbul ignore if */
      if (value === oldValue) { return }
      vnode = locateNode(vnode);
      var transition = vnode.data && vnode.data.transition;
      if (transition && !isIE9) {
        vnode.data.show = true;
        if (value) {
          enter(vnode, function () {
            el.style.display = el.__vOriginalDisplay;
          });
        } else {
          leave(vnode, function () {
            el.style.display = 'none';
          });
        }
      } else {
        el.style.display = value ? el.__vOriginalDisplay : 'none';
      }
    },
  
    unbind: function unbind (
      el,
      binding,
      vnode,
      oldVnode,
      isDestroy
    ) {
      if (!isDestroy) {
        el.style.display = el.__vOriginalDisplay;
      }
    }
  };
  
  var platformDirectives = {
    model: model$1,
    show: show
  };
  
  /*  */
  
  // Provides transition support for a single element/component.
  // supports transition mode (out-in / in-out)
  
  var transitionProps = {
    name: String,
    appear: Boolean,
    css: Boolean,
    mode: String,
    type: String,
    enterClass: String,
    leaveClass: String,
    enterToClass: String,
    leaveToClass: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    appearClass: String,
    appearActiveClass: String,
    appearToClass: String,
    duration: [Number, String, Object]
  };
  
  // in case the child is also an abstract component, e.g. <keep-alive>
  // we want to recursively retrieve the real component to be rendered
  function getRealChild (vnode) {
    var compOptions = vnode && vnode.componentOptions;
    if (compOptions && compOptions.Ctor.options.abstract) {
      return getRealChild(getFirstComponentChild(compOptions.children))
    } else {
      return vnode
    }
  }
  
  function extractTransitionData (comp) {
    var data = {};
    var options = comp.$options;
    // props
    for (var key in options.propsData) {
      data[key] = comp[key];
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    var listeners = options._parentListeners;
    for (var key$1 in listeners) {
      data[camelize(key$1)] = listeners[key$1];
    }
    return data
  }
  
  function placeholder (h, rawChild) {
    return /\d-keep-alive$/.test(rawChild.tag)
      ? h('keep-alive')
      : null
  }
  
  function hasParentTransition (vnode) {
    while ((vnode = vnode.parent)) {
      if (vnode.data.transition) {
        return true
      }
    }
  }
  
  function isSameChild (child, oldChild) {
    return oldChild.key === child.key && oldChild.tag === child.tag
  }
  
  var Transition = {
    name: 'transition',
    props: transitionProps,
    abstract: true,
  
    render: function render (h) {
      var this$1 = this;
  
      var children = this.$slots.default;
      if (!children) {
        return
      }
  
      // filter out text nodes (possible whitespaces)
      children = children.filter(function (c) { return c.tag; });
      /* istanbul ignore if */
      if (!children.length) {
        return
      }
  
      // warn multiple elements
      if ('development' !== 'production' && children.length > 1) {
        warn(
          '<transition> can only be used on a single element. Use ' +
          '<transition-group> for lists.',
          this.$parent
        );
      }
  
      var mode = this.mode;
  
      // warn invalid mode
      if ('development' !== 'production' &&
          mode && mode !== 'in-out' && mode !== 'out-in') {
        warn(
          'invalid <transition> mode: ' + mode,
          this.$parent
        );
      }
  
      var rawChild = children[0];
  
      // if this is a component root node and the component's
      // parent container node also has transition, skip.
      if (hasParentTransition(this.$vnode)) {
        return rawChild
      }
  
      // apply transition data to child
      // use getRealChild() to ignore abstract components e.g. keep-alive
      var child = getRealChild(rawChild);
      /* istanbul ignore if */
      if (!child) {
        return rawChild
      }
  
      if (this._leaving) {
        return placeholder(h, rawChild)
      }
  
      // ensure a key that is unique to the vnode type and to this transition
      // component instance. This key will be used to remove pending leaving nodes
      // during entering.
      var id = "__transition-" + (this._uid) + "-";
      child.key = child.key == null
        ? id + child.tag
        : isPrimitive(child.key)
          ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
          : child.key;
  
      var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
      var oldRawChild = this._vnode;
      var oldChild = getRealChild(oldRawChild);
  
      // mark v-show
      // so that the transition module can hand over the control to the directive
      if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
        child.data.show = true;
      }
  
      if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
        // replace old child transition data with fresh one
        // important for dynamic transitions!
        var oldData = oldChild && (oldChild.data.transition = extend({}, data));
        // handle transition mode
        if (mode === 'out-in') {
          // return placeholder node and queue update when leave finishes
          this._leaving = true;
          mergeVNodeHook(oldData, 'afterLeave', function () {
            this$1._leaving = false;
            this$1.$forceUpdate();
          });
          return placeholder(h, rawChild)
        } else if (mode === 'in-out') {
          var delayedLeave;
          var performLeave = function () { delayedLeave(); };
          mergeVNodeHook(data, 'afterEnter', performLeave);
          mergeVNodeHook(data, 'enterCancelled', performLeave);
          mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
        }
      }
  
      return rawChild
    }
  };
  
  /*  */
  
  // Provides transition support for list items.
  // supports move transitions using the FLIP technique.
  
  // Because the vdom's children update algorithm is "unstable" - i.e.
  // it doesn't guarantee the relative positioning of removed elements,
  // we force transition-group to update its children into two passes:
  // in the first pass, we remove all nodes that need to be removed,
  // triggering their leaving transition; in the second pass, we insert/move
  // into the final desired state. This way in the second pass removed
  // nodes will remain where they should be.
  
  var props = extend({
    tag: String,
    moveClass: String
  }, transitionProps);
  
  delete props.mode;
  
  var TransitionGroup = {
    props: props,
  
    render: function render (h) {
      var tag = this.tag || this.$vnode.data.tag || 'span';
      var map = Object.create(null);
      var prevChildren = this.prevChildren = this.children;
      var rawChildren = this.$slots.default || [];
      var children = this.children = [];
      var transitionData = extractTransitionData(this);
  
      for (var i = 0; i < rawChildren.length; i++) {
        var c = rawChildren[i];
        if (c.tag) {
          if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
            children.push(c);
            map[c.key] = c
            ;(c.data || (c.data = {})).transition = transitionData;
          } else if ('development' !== 'production') {
            var opts = c.componentOptions;
            var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
            warn(("<transition-group> children must be keyed: <" + name + ">"));
          }
        }
      }
  
      if (prevChildren) {
        var kept = [];
        var removed = [];
        for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
          var c$1 = prevChildren[i$1];
          c$1.data.transition = transitionData;
          c$1.data.pos = c$1.elm.getBoundingClientRect();
          if (map[c$1.key]) {
            kept.push(c$1);
          } else {
            removed.push(c$1);
          }
        }
        this.kept = h(tag, null, kept);
        this.removed = removed;
      }
  
      return h(tag, null, children)
    },
  
    beforeUpdate: function beforeUpdate () {
      // force removing pass
      this.__patch__(
        this._vnode,
        this.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this._vnode = this.kept;
    },
  
    updated: function updated () {
      var children = this.prevChildren;
      var moveClass = this.moveClass || ((this.name || 'v') + '-move');
      if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
        return
      }
  
      // we divide the work into three loops to avoid mixing DOM reads and writes
      // in each iteration - which helps prevent layout thrashing.
      children.forEach(callPendingCbs);
      children.forEach(recordPosition);
      children.forEach(applyTranslation);
  
      // force reflow to put everything in position
      var body = document.body;
      var f = body.offsetHeight; // eslint-disable-line
  
      children.forEach(function (c) {
        if (c.data.moved) {
          var el = c.elm;
          var s = el.style;
          addTransitionClass(el, moveClass);
          s.transform = s.WebkitTransform = s.transitionDuration = '';
          el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          });
        }
      });
    },
  
    methods: {
      hasMove: function hasMove (el, moveClass) {
        /* istanbul ignore if */
        if (!hasTransition) {
          return false
        }
        if (this._hasMove != null) {
          return this._hasMove
        }
        // Detect whether an element with the move class applied has
        // CSS transitions. Since the element may be inside an entering
        // transition at this very moment, we make a clone of it and remove
        // all other transition classes applied to ensure only the move class
        // is applied.
        var clone = el.cloneNode();
        if (el._transitionClasses) {
          el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
        }
        addClass(clone, moveClass);
        clone.style.display = 'none';
        this.$el.appendChild(clone);
        var info = getTransitionInfo(clone);
        this.$el.removeChild(clone);
        return (this._hasMove = info.hasTransform)
      }
    }
  };
  
  function callPendingCbs (c) {
    /* istanbul ignore if */
    if (c.elm._moveCb) {
      c.elm._moveCb();
    }
    /* istanbul ignore if */
    if (c.elm._enterCb) {
      c.elm._enterCb();
    }
  }
  
  function recordPosition (c) {
    c.data.newPos = c.elm.getBoundingClientRect();
  }
  
  function applyTranslation (c) {
    var oldPos = c.data.pos;
    var newPos = c.data.newPos;
    var dx = oldPos.left - newPos.left;
    var dy = oldPos.top - newPos.top;
    if (dx || dy) {
      c.data.moved = true;
      var s = c.elm.style;
      s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
      s.transitionDuration = '0s';
    }
  }
  
  var platformComponents = {
    Transition: Transition,
    TransitionGroup: TransitionGroup
  };
  
  /*  */
  
  // install platform specific utils
  Vue$2.config.mustUseProp = mustUseProp;
  Vue$2.config.isReservedTag = isReservedTag;
  Vue$2.config.getTagNamespace = getTagNamespace;
  Vue$2.config.isUnknownElement = isUnknownElement;
  
  // install platform runtime directives & components
  extend(Vue$2.options.directives, platformDirectives);
  extend(Vue$2.options.components, platformComponents);
  
  // install platform patch function
  Vue$2.prototype.__patch__ = inBrowser ? patch : noop;
  
  // public mount method
  Vue$2.prototype.$mount = function (
    el,
    hydrating
  ) {
    el = el && inBrowser ? query(el) : undefined;
    return mountComponent(this, el, hydrating)
  };
  
  // devtools global hook
  /* istanbul ignore next */
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue$2);
      } else if ('development' !== 'production' && isChrome) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ('development' !== 'production' &&
        config.productionTip !== false &&
        inBrowser && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
  
  module.exports = Vue$2;
  

});

 
 define('yls^busi/modify/src/contractModify/bothLesseeModify/bothLesseeModify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
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
        funnode: "BT022",
        nexusKey: "projectBothLesseeModify",
        bothlesseeData: {},
        //渲染表格
        bothlesseeResetFun: function bothlesseeResetFun($node) {
          //合同承租信息表格
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
          },
          banknoRefChange_l: function banknoRefChange_l(type, data) {
            // 拿到当前参照的数据，然后再操作其他字段
            console.log("触发参照改变:", type, data);
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
        url = _publicData.ylsBusi + "/contr/modify/lessee/page";
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
        }
      },
      //承租方主表保存
      bothlesseeFormConfirm: function bothlesseeFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.bothlesseeRef.comp.projectBothLessee;
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
        if (data.pk_prj_both_lessee) {
          url = _publicData.ylsBusi + 'contr/modify/lessee/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/lessee/create';
        }
        //保存校验
        this.$refs.bothlesseeRef.comp.$refs["projectBothLessee_ref"].validate(function (valid) {
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
        });
      },
      //承租方行编辑
      bothlesseeFormedit: function bothlesseeFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs.bothlesseeRef.getTableComp().expandRow(row);
        this.$refs.bothlesseeRef.comp.formShow = false;
        //projectBothLessee为表单数据对象参数
        this.$refs.bothlesseeRef.setData("projectBothLessee", row);
        this.$refs.bothlesseeRef.comp.projectBothLessee.customer_code = row.beanMap.pk_customer_ref[row.pk_customer].code;
        this.$refs.bothlesseeRef.comp.projectBothLessee.legal_person_name = row.beanMap.pk_customer_ref[row.pk_customer].legal_person_name;
        this.$refs.bothlesseeRef.comp.projectBothLessee.fax = row.beanMap.pk_customer_ref[row.pk_customer].fax;
        this.$refs.bothlesseeRef.comp.projectBothLessee.email = row.beanMap.pk_customer_ref[row.pk_customer].email;
        this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank_l = row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].code;
        this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no_l = row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_no;
        this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code_l = row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_code;
        this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank = row.beanMap.pk_account_ref[row.pk_account].code;
        this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no = row.beanMap.pk_account_ref[row.pk_account].bank_no;
        this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code = row.beanMap.pk_account_ref[row.pk_account].bank_code;
      },
      // 承租方删除提示
      bothlesseeFormdelete: function bothlesseeFormdelete(scope) {
        this.bothlesseeDelVisible = true;
        this.delId = scope.row.pk_prj_both_lessee;
      },
      // 承租方删除方法
      bothlesseeDeleteClick: function bothlesseeDeleteClick() {
        var _this3 = this;
  
        this.$http({
          url: _publicData.ylsBusi + "/contr/modify/lessee/deleteById",
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
            _this3.requestPrjbothlessee();
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
 
 define('yls^busi/modify/src/contractModify/calculatorModify/calculatorModify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["source_bill"],
    data: function data() {
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        funnode: "BT022",
        nexusKey: "calculatorModify",
        calculators: [],
        caltplData: {},
        //渲染表格
        calRestFun: function calRestFun($node) {
          var $table = $node.find("el-table");
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "编辑"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
    computed: {
      cur_source_bill: function cur_source_bill() {
        return this.source_bill;
      }
    },
    watch: {
      source_bill: function source_bill(val) {
        this.calForQuery();
      },
      calculators: function calculators(val) {
        this.$emit("onChangeInoutPlan", val);
      }
    },
    //页面操作
    mounted: function mounted() {
      this.calForQuery();
    },
  
    methods: {
  
      //查询
      calForQuery: function calForQuery() {
        var _this = this;
  
        if (this.cur_source_bill) {
          var url = _publicData.ylsBusi + "contr/modify/quoteCalculator/page";
          var dataParams = {
            orderList: [{
              direction: "desc",
              property: "ts"
            }],
            searchParams: {
              searchMap: {
                custCondList: [{ key: "source_bill", oper: "=", value: this.cur_source_bill }]
              }
            }
          };
          this.$http.post(url, dataParams, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            var originalValue = res.data.data.content;
            if (originalValue.length) {
              originalValue.forEach(function (item, index) {
                var name = index == 0 ? "基础报价" : "起租报价" + index;
                var obj = { text: name, value: item.pk_quote_calculator };
                _this.calculators.push(obj);
              });
            }
            _this.$refs.calculatorRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
          });
        }
      },
  
      //查看
      calSearchRow: function calSearchRow(scope) {
        this.$refs.calculatorRef.getTableComp().expandRow(scope.row);
        this.$refs.calculatorRef.comp.formShow = false;
        this.$refs.calculatorRef.editable = false;
        this.$refs.calculatorRef.setFormData(scope.row);
      },
      //编辑
      calEditRow: function calEditRow(scope) {
        //备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
  
        this.$refs.calculatorRef.getTableComp().expandRow(scope.row);
        this.$refs.calculatorRef.comp.formShow = false;
        this.$refs.calculatorRef.editable = true;
        this.$refs.calculatorRef.setFormData(scope.row);
      },
  
      //编辑/保存-取消
      calForCancel: function calForCancel(type) {
        if (type === "form") {
          this.$refs.calculatorRef.comp.formShow = false;
        } else {
          this.$refs.calculatorRef.getTableComp().closeExpandRow();
          //回复为取消前的数据
          this.caltplData.calculatorModifyTable[this.baseEditIndex] = this.baseData;
        }
      },
  
      //保存
      calFormConfirm: function calFormConfirm(type) {
        var _this2 = this;
  
        var data = this.$refs.calculatorRef.comp.calculatorModifyForm;
        if (type === "form") {
          data.source_bill = this.cur_source_bill;
          var url = _publicData.ylsBusi + "contr/modify/quoteCalculator/create";
          this.$http.post(url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "保存成功！",
                type: "success"
              });
              _this2.paytplData.calculatorModifyTable.unshift(res.data.data);
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.calculatorRef.comp.formShow = false;
        } else {
          //更新
          var _url = _publicData.ylsBusi + "contr/modify/quoteCalculator/save";
          this.$http.post(_url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "更新成功！",
                type: "success"
              });
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.calculatorRef.getTableComp().closeExpandRow();
        }
      },
      //报价发生变动
      calculatorChange: function calculatorChange(val) {
        this.$emit("onChangeInoutPlan", val);
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
  __vue__options__.template = "\r\n<!--报价信息变更管理模块-->\r\n <div>\r\n     <ifbp-template ref=\"calculatorRef\"\r\n                    tplId=\"calculatorTemplate\"\r\n                    :funnode=\"funnode\"\r\n                    :nexuskey=\"nexusKey\"\r\n                    :tplData=\"caltplData\"\r\n                    show-type=\"table-form\"\r\n                    :tplResetFun=\"calRestFun\"\r\n                    @edit-table-click=\"calEditRow\"\r\n                    @search-table-click=\"calSearchRow\"\r\n                    @form-confirm-click=\"calFormConfirm\"\r\n                    @form-cancel-click=\"calForCancel\">\r\n    </ifbp-template>\r\n </div>\r\n"
  

});
 
 define('yls^busi/modify/src/contractModify/calculatorModify/inoutPlanModify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('inoutPlanForSearch')],
    props: ["pk_quote_calculator"],
    data: function data() {
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        funnode: "BT022",
        nexusKey: "inoutPlanModify",
        inoutPlanDelVisible: false,
        delId: null,
        delIndex: null,
        inoutPlantplData: {},
  
        //渲染表格
        inoutPlanResetFun: function inoutPlanResetFun($node) {
          var $table = $node.find("el-table");
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "编辑"
          }, {
            icon: "delete",
            title: "删除"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
    computed: {
      cur_pk_quote_calculator: function cur_pk_quote_calculator() {
        return this.pk_quote_calculator;
      }
    },
    watch: {
      pk_quote_calculator: function pk_quote_calculator(val) {
        this.inoutPlanForSearch();
      }
    },
    //页面操作
    mounted: function mounted() {
      this.inoutPlanForSearch();
    },
  
    methods: {
      //查询
      inoutPlanForSearch: function inoutPlanForSearch() {
        var _this = this;
  
        if (this.cur_pk_quote_calculator) {
          var url = _publicData.ylsBusi + "contr/modify/inoutPlan/page";
          var dataParams = {
            orderList: [{
              direction: "asc",
              property: "plan_date"
            }],
            pageNum: this.currentPage - 1,
            pageSize: this.pageSize,
            searchParams: {
              searchMap: {
                custCondList: [{ key: "pk_quote_calculator", oper: "=", value: this.pk_quote_calculator }]
              }
            }
          };
          this.$http.post(url, dataParams, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            var originalValue = res.data.data.content;
            _this.$refs.inoutPlanRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
            _this.totalElements = res.data.data.totalElements;
          });
        } else {
          this.$refs.inoutPlanRef.setTableData(null);
          this.totalElements = 0;
        }
      },
  
      //查看
      inoutPlanSearchRow: function inoutPlanSearchRow(scope) {
        this.$refs.inoutPlanRef.getTableComp().expandRow(scope.row);
        this.$refs.inoutPlanRef.comp.formShow = false;
        this.$refs.inoutPlanRef.editable = false;
        this.$refs.inoutPlanRef.setFormData(scope.row);
      },
  
      //编辑
      inoutPlanEditRow: function inoutPlanEditRow(scope) {
        //备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
  
        this.$refs.inoutPlanRef.getTableComp().expandRow(scope.row);
        this.$refs.inoutPlanRef.comp.formShow = false;
        this.$refs.inoutPlanRef.editable = true;
        this.$refs.inoutPlanRef.setFormData(scope.row);
      },
  
      //编辑-取消
      inoutPlanFormCancel: function inoutPlanFormCancel(type) {
        if (type === "form") {
          this.$refs.inoutPlanRef.comp.formShow = false;
        } else {
          this.$refs.inoutPlanRef.getTableComp().closeExpandRow();
          //回复为取消前的数据
          this.inoutPlantplData.inoutPlanModifyTable[this.baseEditIndex] = this.baseData;
          // this.$refs.inoutPlanRef.setFormData(payTableData);
        }
      },
  
      //保存
      inoutPlanFormConfirm: function inoutPlanFormConfirm(type) {
        var _this2 = this;
  
        var data = this.$refs.inoutPlanRef.comp.inoutPlanModifyForm;
        if (type === "form") {
          data.pk_quote_calculator = this.cur_pk_quote_calculator;
          var url = _publicData.ylsBusi + "contr/modify/inoutPlan/create";
          this.$http.post(url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "保存成功！",
                type: "success"
              });
              _this2.paytplData.contProviderModifyTable.unshift(res.data.data);
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.inoutPlanRef.comp.formShow = false;
        } else {
          //更新
          var _url = _publicData.ylsBusi + "contr/modify/inoutPlan/update";
          this.$http.post(_url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "更新成功！",
                type: "success"
              });
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.inoutPlanRef.getTableComp().closeExpandRow();
        }
      },
  
      //删除提醒
      inoutPlanDeleteRow: function inoutPlanDeleteRow(scope) {
        this.inoutPlanDelVisible = true;
        this.delId = scope.row.pk_quote_inout_plan;
        this.delIndex = scope.$index;
      },
  
      //删除
      inoutPlanFormDelete: function inoutPlanFormDelete() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "contr/modify/inoutPlan/deleteById";
        this.$http.post(url, this.delId, {
          headers: { "Content-Type": "application/json" }
        }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功！",
              type: "success"
            });
            _this3.inoutPlantplData.inoutPlanModifyTable.splice(_this3.delIndex, 1);
            _this3.totalElements--;
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        });
        this.inoutPlanDelVisible = false;
        this.delId = null;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\r\n<!--收支计划信息变更管理模块-->\r\n\r\n\r\n<div>\r\n      \r\n     <ifbp-template ref=\"inoutPlanRef\"\r\n                    tplId=\"inoutPlanTemplate\"\r\n                    :funnode=\"funnode\"\r\n                    :nexuskey=\"nexusKey\"\r\n                    :tplData=\"inoutPlantplData\"\r\n                    :tplResetFun=\"inoutPlanResetFun\"\r\n                    show-type=\"table-form\"\r\n                    @edit-table-click=\"inoutPlanEditRow\"\r\n                    @delete-table-click=\"inoutPlanDeleteRow\"\r\n                    @search-table-click=\"inoutPlanSearchRow\"\r\n                    @form-confirm-click=\"inoutPlanFormConfirm\"\r\n                    @form-cancel-click=\"inoutPlanFormCancel\">\r\n     </ifbp-template>\r\n\r\n    <!-- 收支计划删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"inoutPlanDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"inoutPlanDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button @click=\"inoutPlanFormDelete\" type=\"primary\" >确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n\r\n    <!--分页组件-->\r\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\r\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\r\n    </el-pagination>\r\n\r\n  </div>\r\n"
  

});
 
 define('yls^busi/modify/src/contractModify/contProviderModify/contProviderModify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["source_bill"],
    data: function data() {
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        funnode: "BT022",
        nexusKey: "contProviderModify",
        provDelVisible: false,
        delId: null,
        delIndex: null,
        provtplData: {},
        //渲染表格
        provResetFun: function provResetFun($node) {
          var $table = $node.find("el-table");
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "编辑"
          }, {
            icon: "delete",
            title: "删除"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
    computed: {
      cur_source_bill: function cur_source_bill() {
        return this.source_bill;
      }
    },
    watch: {
      source_bill: function source_bill(val) {
        this.provForQuery();
      }
    },
    mounted: function mounted() {
      this.provForQuery();
    },
  
    methods: {
  
      //查询
      provForQuery: function provForQuery() {
        var _this = this;
  
        if (this.cur_source_bill) {
          var url = _publicData.ylsBusi + "contr/modify/contProvider/page";
          var dataParams = {
            orderList: [{
              direction: "desc",
              property: "ts"
            }],
            searchParams: {
              searchMap: {
                custCondList: [{ key: "source_bill", oper: "=", value: this.cur_source_bill }]
              }
            }
          };
          this.$http.post(url, dataParams, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            var originalValue = res.data.data.content;
            _this.$refs.contProviderRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
          });
        }
      },
  
  
      //查看
      provSearchRow: function provSearchRow(scope) {
        this.$refs.contProviderRef.getTableComp().expandRow(scope.row);
        this.$refs.contProviderRef.comp.formShow = false;
        this.$refs.contProviderRef.editable = false;
        this.$refs.contProviderRef.setFormData(scope.row);
      },
  
      //编辑
      provEditRow: function provEditRow(scope) {
        //备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
  
        this.$refs.contProviderRef.getTableComp().expandRow(scope.row);
        this.$refs.contProviderRef.comp.formShow = false;
        this.$refs.contProviderRef.editable = true;
        this.$refs.contProviderRef.setFormData(scope.row);
      },
  
      //编辑/保存-取消
      proFormCancel: function proFormCancel(type) {
        if (type === "form") {
          this.$refs.contProviderRef.comp.formShow = false;
        } else {
          this.$refs.contProviderRef.getTableComp().closeExpandRow();
          //回复为取消前的数据
          this.provtplData.contProviderModifyTable[this.baseEditIndex] = this.baseData;
          // this.$refs.contProviderRef.setFormData(provTableData);
        }
      },
  
      //编辑-保存
      provFormConfirm: function provFormConfirm(type) {
        var _this2 = this;
  
        var data = this.$refs.contProviderRef.comp.contProviderModifyForm;
        if (type === "form") {
          data.source_bill = this.cur_source_bill;
          var url = _publicData.ylsBusi + "contr/modify/contProvider/create";
          this.$http.post(url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "保存成功！",
                type: "success"
              });
              _this2.provtplData.contProviderModifyTable.unshift(res.data.data);
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.contProviderRef.comp.formShow = false;
        } else {
          //更新
          var _url = _publicData.ylsBusi + "contr/modify/contProvider/update";
          this.$http.post(_url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "更新成功！",
                type: "success"
              });
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.contProviderRef.getTableComp().closeExpandRow();
        }
      },
  
      //删除提醒
      provDeleteRow: function provDeleteRow(scope) {
        this.provDelVisible = true;
        this.delId = scope.row.pk_prj_provider;
        this.delIndex = scope.$index;
      },
  
      //删除
      provFormDelete: function provFormDelete() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "contr/modify/contProvider/deleteById";
        this.$http.post(url, this.delId, { headers: { "Content-Type": "application/json" } }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功！",
              type: "success"
            });
            _this3.provtplData.contProviderModifyTable.splice(_this3.delIndex, 1);
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        });
        this.provDelVisible = false;
        this.delId = null;
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
  __vue__options__.template = "\r\n<!--供应商管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"contProviderRef\"\r\n                        tplId=\"contProviderTemplate\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"provtplData\"\r\n                        show-type=\"table-form\"\r\n                        :tplResetFun=\"provResetFun\"\r\n                        @search-table-click=\"provSearchRow\"\r\n                        @edit-table-click=\"provEditRow\"\r\n                        @delete-table-click=\"provDeleteRow\"\r\n                        @form-confirm-click=\"provFormConfirm\"\r\n                        @form-cancel-click=\"proFormCancel\">\r\n          </ifbp-template>\r\n\r\n    <!-- 供应商 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"provDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"provDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button @click=\"provFormDelete\" type=\"primary\" >确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/modify/src/contractModify/contractMain/contractMain-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  var _custpledgeModifyInfo = require('yls^busi/modify/src/contractModify/insuranceModify/custpledge-modify-info.vue');
  
  var _custpledgeModifyInfo2 = _interopRequireDefault(_custpledgeModifyInfo);
  
  var _mortgageModifyInfo = require('yls^busi/modify/src/contractModify/insuranceModify/mortgage-modify-info.vue');
  
  var _mortgageModifyInfo2 = _interopRequireDefault(_mortgageModifyInfo);
  
  var _pledgeModifyInfo = require('yls^busi/modify/src/contractModify/insuranceModify/pledge-modify-info.vue');
  
  var _pledgeModifyInfo2 = _interopRequireDefault(_pledgeModifyInfo);
  
  var _rentthingModify = require('yls^busi/modify/src/contractModify/rentthingModify/rentthing-modify.vue');
  
  var _rentthingModify2 = _interopRequireDefault(_rentthingModify);
  
  var _contProviderModify = require('yls^busi/modify/src/contractModify/contProviderModify/contProviderModify.vue');
  
  var _contProviderModify2 = _interopRequireDefault(_contProviderModify);
  
  var _payConditionModify = require('yls^busi/modify/src/contractModify/payConditionModify/payConditionModify.vue');
  
  var _payConditionModify2 = _interopRequireDefault(_payConditionModify);
  
  var _bothLesseeModify = require('yls^busi/modify/src/contractModify/bothLesseeModify/bothLesseeModify.vue');
  
  var _bothLesseeModify2 = _interopRequireDefault(_bothLesseeModify);
  
  var _pentaltyruledeModify = require('yls^busi/modify/src/contractModify/pentaltyruledeModify/pentaltyruledeModify.vue');
  
  var _pentaltyruledeModify2 = _interopRequireDefault(_pentaltyruledeModify);
  
  var _calculatorModify = require('yls^busi/modify/src/contractModify/calculatorModify/calculatorModify.vue');
  
  var _calculatorModify2 = _interopRequireDefault(_calculatorModify);
  
  var _inoutPlanModify = require('yls^busi/modify/src/contractModify/calculatorModify/inoutPlanModify.vue');
  
  var _inoutPlanModify2 = _interopRequireDefault(_inoutPlanModify);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
  
  exports["default"] = {
    components: {
      'custpledgeRef': _custpledgeModifyInfo2["default"],
      'mortgageRef': _mortgageModifyInfo2["default"],
      'pledgeRef': _pledgeModifyInfo2["default"],
      'busirenttingRef': _rentthingModify2["default"],
      'bothlesseeRef': _bothLesseeModify2["default"],
      'penaltyRuleDeRef': _pentaltyruledeModify2["default"],
      'contProviderRef': _contProviderModify2["default"],
      'payConditionRef': _payConditionModify2["default"],
      'calculatorRef': _calculatorModify2["default"],
      'inoutPlanRef': _inoutPlanModify2["default"]
    },
    data: function data() {
      var oThis = this;
      return {
        activeName: "one",
        calculators: [],
        delDialogVisible: false,
        //固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        //合同主键
        pk_contract: "",
        pk_quote_calculator: "",
        changetypestring: "",
        pledgeType: 'type0',
        //模版主键
        funnode: "BT022",
        ifCalculator: false,
        ifCustpledge: false,
        ifRentthing: false,
        ifContProvider: false,
        ifPayCondition: false,
        ifBothlessee: false,
        ifPenaltyRuleDe: false,
        nexusKey: "contractModify",
        tplData: {},
        editable: false,
        //担保参数
        guarantee: "guarantee1",
        radioShow: true,
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.editable = !oThis.editable;
          }
        }],
        //报价信息变更图标
        calculatorIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                message: "请先保存基本信息！",
                type: "error"
              });
              return;
            }
            oThis.$refs.calculatorRef.$refs.calculatorRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.calculatorRef.$refs.calculatorRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.calculatorRef.$refs.calculatorRef.comp.formShow = true;
          }
        }],
        //收支计划信息变更图标
        inoutPlanIcons: [{
          icon: "plus",
          click: function click() {
            if (oThis.pk_contract === "") {
              oThis.$message({
                message: "请先保存基本信息！",
                type: "error"
              });
              return;
            }
            oThis.$refs.inoutPLanRef.$refs.inoutPLanRef.comp.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.inoutPLanRef.$refs.inoutPLanRef.comp.resetFormData();
            // 显示新增区域
            oThis.$refs.inoutPLanRef.$refs.inoutPLanRef.comp.formShow = true;
          }
        }],
        //担保信息
        pledgeIcons: [{
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
        }],
        // 放款申请主模板 baseTemplateRef end
        //租赁物图标
        rentTingIcons: [{
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
        }],
        //供应商标签
        contProviderIcons: [{
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
            // 点击新增时页面允许编辑
            oThis.$refs.contProviderRef.$refs.contProviderRef.comp.editable = true;
          }
        }],
        //承租方信息
        bothlesseeIcons: [{
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
        }],
        //逾期利率信息
        penaltyRuleDeIcons: [{
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
        }],
        //付款条件图标
        payConditionIcons: [{
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
            // 点击新增时页面允许编辑
            oThis.$refs.payConditionRef.$refs.payConditionRef.comp.editable = true;
          }
        }]
  
      };
    },
    created: function created() {
      this.loadData();
    },
  
    methods: {
      handleClick: function handleClick(val) {
        var calArray = this.$refs.calculatorRef.caltplData.calculatorModifyTable;
        var pk_calculator = calArray[val.$data.index].pk_quote_calculator;
        if (this.pk_quote_calculator === pk_calculator) {
          this.pk_quote_calculator = "";
        } else {
          this.pk_quote_calculator = pk_calculator;
        }
      },
  
      //担保信息 关闭添加页签
      closeAddFormEev: function closeAddFormEev() {
        this.$refs.mortgageRef.closeAddForm();
        this.$refs.pledgeRef.closeAddForm();
        this.$refs.custpledgeRef.closeAddForm();
      },
  
      //担保信息
      radioShowCase: function radioShowCase(val) {
        this.radioShow = val;
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
        if (this.pk_contract) {
          url = _publicData.ylsBusi + 'contr/modify/contractinfo/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/contractinfo/create';
          jsonData['change_type'] = this.changetypestring;
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
      typetype: function typetype(valType) {
        if (valType.indexOf("custPledge") >= 0) {
          this.ifCustpledge = true;
        }
        if (valType.indexOf("rentThing") >= 0) {
          this.ifRentthing = true;
        }
        if (valType.indexOf("pro") >= 0) {
          this.ifContProvider = true;
        }
        if (valType.indexOf("payCond") >= 0) {
          this.ifPayCondition = true;
        }
        if (valType.indexOf("lessee") >= 0) {
          this.ifBothlessee = true;
        }
        if (valType.indexOf("penaltyRule") >= 0) {
          this.ifPenaltyRuleDe = true;
        }
        if (valType.indexOf("cal") >= 0) {
          this.ifCalculator = true;
        }
      },
  
  
      //加载数据方法
      loadData: function loadData() {
        var flag = this.$root.$router.currentRoute.params.flag;
        this.changetypestring = this.$root.$router.currentRoute.params.changetype;
        this.typetype(this.changetypestring);
        if (flag === "edit") {
          var pk_con = this.$root.$router.currentRoute.params.editId;
  
          if (pk_con == undefined) pk_con = "";
  
          if (pk_con && pk_con != "") {
            //加载合同信息
            this.loadcontractinfo(pk_con);
            this.editable = true;
          }
        } else {
          this.pk_contract = this.$root.$router.currentRoute.params.id;
          if (this.pk_contract == undefined) this.pk_contract = "";
          //router name
          //this.$root.$router.currentRoute.name;
          //详情页面
          if (this.pk_contract && this.pk_contract != "") {
            //加载合同信息
            this.loadcontractinfo(this.pk_contract);
          } else {
            this.oldid = this.$root.$router.currentRoute.params.oldid;
            var mes = [this.changetypestring, this.oldid];
            this.loadcontractCopyInfo(mes);
          }
        }
      },
  
  
      //加载合同信息
      loadcontractCopyInfo: function loadcontractCopyInfo(mess) {
        var _this2 = this;
  
        this.$http({
          url: "/yls-busi-web/contr/modify/contractinfo/copyById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: mess
        }).then(function (res) {
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData("contract", JSON.parse(JSON.stringify(originalValue)));
          _this2.pk_contract = originalValue.pk_contract;
        })["catch"](function (e) {
          console.log(e);
          _this2.$message({
            message: "合同详情获取失败",
            type: "error"
          });
        });
      },
  
  
      //加载合同信息
      loadcontractinfo: function loadcontractinfo(pk_contract) {
        var _this3 = this;
  
        this.$http({
          url: "/yls-busi-web/contr/modify/contractinfo/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_contract
        }).then(function (res) {
          var originalValue = res.data.data;
          _this3.$refs["baseTemplateRef"].setData("contract", JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          console.log(e);
          _this3.$message({
            message: "合同详情获取失败",
            type: "error"
          });
        });
      },
      changeInoutPlan: function changeInoutPlan(val) {
        this.calculators = val;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">新增合同</h2>\n  </div>\n  \n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返回</el-button>\n    </div>\n      <!-- 合同主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"合同\" :icons=\"baseIcons\" >\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\" \n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n           \n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!--报价信息变更-->\n\n      \n      <ifbp-panel id=\"calculatorRef\" title=\"报价信息\"   v-if=\"ifCalculator\">\n        <calculatorRef\n          ref=\"calculatorRef\"\n          @onChangeInoutPlan=\"changeInoutPlan\"\n          :source_bill=\"pk_contract\">\n        </calculatorRef>\n        <el-tabs id=\"busi-main\" v-model=\"activeName\" @tab-click=\"handleClick\">\n          <el-tab-pane :label=\"item.text\" v-for=\"(item, index)  in calculators\" :key=\"index\"  :name=\"index\">\n         </el-tab-pane>\n        </el-tabs>\n         <inoutPlanRef \n              ref=\"inoutPlanRef\" \n              :pk_quote_calculator=\"pk_quote_calculator\">\n         </inoutPlanRef>\n      </ifbp-panel>\n      <!--承租人信息-->\n       <ifbp-panel id=\"bothlesseeRef\" title=\"承租人信息\" :icons=\"bothlesseeIcons\" v-if=\"ifBothlessee\">\n        <bothlesseeRef\n          ref=\"bothlesseeRef\"\n          :source_bill=\"pk_contract\">\n        </bothlesseeRef>\n      </ifbp-panel>\n      <!--担保信息模块界面-->\n      <ifbp-panel id=\"pledgePanel\" title=\"担保信息\" :icons=\"pledgeIcons\" v-if=\"ifCustpledge\">\n        <el-radio-group v-model=\"pledgeType\" style=\"width:265px;margin:0 auto 20px;display:block\">\n          <el-radio-button label=\"type0\">保证担保</el-radio-button>\n          <el-radio-button label=\"type1\">抵押担保</el-radio-button>\n          <el-radio-button label=\"type2\">质押担保</el-radio-button>\n        </el-radio-group>\n        <el-tabs v-model=\"pledgeType\" class=\"pledge_header\">\n        <el-tab-pane  name=\"type0\">\n            <custpledgeRef\n            ref=\"custpledgeRef\"\n            :source_bill=\"pk_contract\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n            </custpledgeRef>\n        </el-tab-pane>\n        <el-tab-pane  name=\"type1\">\n             <mortgageRef\n            ref=\"mortgageRef\"\n            :source_bill=\"pk_contract\"\n            @closeAddForm=\"closeAddFormEev\"\n            >\n          </mortgageRef>\n        </el-tab-pane>\n        <el-tab-pane name=\"type2\">\n          <pledgeRef\n            ref=\"pledgeRef\"\n            :source_bill=\"pk_contract\"\n             @closeAddForm=\"closeAddFormEev\"\n            >\n          </pledgeRef>\n        </el-tab-pane>\n      </el-tabs>\n      </ifbp-panel>\n      <!--租赁物信息-->\n       <ifbp-panel id=\"busirenttingRef\" title=\"租赁物\" :icons=\"rentTingIcons\" v-if=\"ifRentthing\">\n        <busirenttingRef\n          ref=\"busirenttingRef\"\n          :source_bill=\"pk_contract\">\n        </busirenttingRef>\n      </ifbp-panel>\n      <!--供应商信息-->\n       <ifbp-panel id=\"contProviderRef\" title=\"供应商信息\" :icons=\"contProviderIcons\" v-if=\"ifContProvider\">\n        <contProviderRef\n          ref=\"contProviderRef\"\n          :source_bill=\"pk_contract\">\n        </contProviderRef>\n       </ifbp-panel>\n      <!--付款条件-->\n       <ifbp-panel id=\"payConditionRef\" title=\"付款条件信息\" :icons=\"payConditionIcons\" v-if=\"ifPayCondition\">\n        <payConditionRef\n          ref=\"payConditionRef\"\n          :source_bill=\"pk_contract\">\n        </payConditionRef>\n      </ifbp-panel>\n      <!--逾期利率信息-->\n       <ifbp-panel id=\"penaltyRuleDeRef\" title=\"逾期利率信息\" :icons=\"penaltyRuleDeIcons\" v-if=\"ifPenaltyRuleDe\">\n        <penaltyRuleDeRef\n          ref=\"penaltyRuleDeRef\"\n          :source_bill=\"pk_contract\">\n        </penaltyRuleDeRef>\n      </ifbp-panel>\n    </ifbp-panel-group>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/modify/src/contractModify/contractMain/contractMain-list.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  var typeOptions = [{ name: "合同主信息变更", id: "cont" }, { name: "租金方案变更", id: "cal" }, { name: "供应商信息变更", id: "pro" }, { name: "租赁物信息变更", id: "rentThing" }, { name: "承租方信息变更", id: "lessee" }, { name: "担保信息变更", id: "custPledge" }, { name: "付款条件变更", id: "payCond" }, { name: "罚息率变更", id: "penaltyRule" }]; //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  
  var defaultTypeOptions = ["cont"];
  var allTypeOptions = ["cont", "cal", "pro", "rentThing", "lessee", "custPledge", "payCond", "penaltyRule"];
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')],
    data: function data() {
      return {
        // 查询模板编码
        searchTemplateCode: "contractModify",
        searchTemplateParam: {},
        checkAll: true,
        temptype: "cont",
        checkedTypes: [],
        typecs: typeOptions,
        isIndeterminate: false,
        field: "pk_contract",
        //模版主键
        funnode: "BT022",
        nexusKey: "contractModify",
        contractnfoListData: {},
        refCode: "contract_ref",
        refValue: {},
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        delId: "",
        //showDeleteButton: true,
        dialogTableVisible: false,
        dialogVisibleSubmit: false,
        dialogVisibleCheck: false,
        spanText: "",
        satatus: "",
        mess: "",
        selectIndex: 0,
  
        //操作按钮
        templateTableFormResetFun: function templateTableFormResetFun($node) {
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
          //定义操作
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "修改"
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
        this.currentPage = 1; //点查询按钮当前页设为1
        this.searchTemplateParam = searchTemplate;
        this.request();
      },
      handleCheckAllChange: function handleCheckAllChange(event) {
        this.checkedTypes = event.target.checked ? allTypeOptions : defaultTypeOptions;
        this.isIndeterminate = false;
      },
      handleCheckedTypesChange: function handleCheckedTypesChange(value) {
        var checkedCount = value.length;
        this.checkAll = checkedCount === this.typecs.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.typecs.length;
      },
      add: function add() {
        this.checkedTypes = allTypeOptions;
        this.refValue = {};
        this.dialogTableVisible = true;
      },
      buttonVerification: function buttonVerification(statusTemp) {
        this.status = statusTemp;
        if (this.status == "check") {
          this.mess = "审核";
          // this.spanText = "是否确认审核！";
        } else if (this.status == "submit") {
          this.mess = "提交";
          this.spanText = "是否确认提交！";
        }
  
        var tableSelections = this.$refs["contractinfo_table"].getTableComp().getSelection();
        if (tableSelections.length === 1) {
          if (this.status == "submit") {
            this.dialogVisibleSubmit = true;
          } else {
            this.dialogVisibleCheck = true;
          }
        } else {
          this.$message({
            message: "请选择有且只有一条记录进行" + this.mess + "动作！",
            type: "error"
          });
        }
      },
      checkOrUn: function checkOrUn(statusTemp) {
        this.status = statusTemp;
        this.buttonAction();
      },
      buttonAction: function buttonAction() {
        var _this = this;
  
        this.dialogVisibleCheck = false;
        this.dialogVisibleSubmit = false;
        var tableSelections = this.$refs["contractinfo_table"].getTableComp().getSelection();
        this.selectIndex = this.$refs["contractinfo_table"].getData("contract_t").indexOf(tableSelections[0]);
  
        var jsonData = JSON.parse(JSON.stringify(tableSelections[0]));
        var url;
        if (this.status == "check") {
          url = _publicData.ylsBusi + "contr/modify/contractinfo/check";
        } else if (this.status == "submit") {
          url = _publicData.ylsBusi + "contr/modify/contractinfo/submit";
        } else if (this.status == "unCheck") {
          url = _publicData.ylsBusi + "contr/modify/contractinfo/unCheck";
        }
        this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: jsonData
        }).then(function (res) {
          _this.originalValue = res.data.data;
          var contdata = _this.$refs["contractinfo_table"].getData("contract_t");
          contdata.splice(_this.selectIndex, 1, _this.originalValue);
        })["catch"](function (e) {
          _this.$message({
            message: "合同" + _this.mess + "失败！",
            type: "error"
          });
        });
      },
  
      // 选择变更类型
      saveChangeTypeClick: function saveChangeTypeClick() {
        debugger;
        if (this.refValue.pk_contract == undefined || this.refValue.pk_contract == "") {
          this.$message({
            message: "请选择需要变更的合同",
            type: "error"
          });
          return;
        }
        this.dialogTableVisible = false;
        location.hash = "/contr/modify/contractinfo/add/" + this.checkedTypes + "/" + this.refValue.pk_contract;
      },
  
      //查看按钮
      tableSearchClick: function tableSearchClick(scope) {
        location.hash = "/contr/modify/contractinfo/detail/" + scope.row.pk_contract + "/" + scope.row.change_type;
      },
  
      //修改按钮
      tableEditClick: function tableEditClick(scope) {
        location.hash = "/contr/modify/contractinfo/edit/" + scope.row.pk_contract + "/edit/" + scope.row.change_type;
      },
  
      //删除操作
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delId = scope.row.pk_contract;
        this.delDialogVisible = true;
      },
  
      //删除确定
      deleteConfirmClick: function deleteConfirmClick() {
        var _this2 = this;
  
        this.delDialogVisible = false;
        this.$http({
          url: _publicData.ylsBusi + "contr/modify/contractinfo/deleteById",
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
  
        var url = _publicData.ylsBusi + "contr/modify/contractinfo/page";
        var data = {
          orderList: [{
            direction: "desc",
            property: "ts"
          }],
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: {
              searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
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
          //QuoteCalculator_table UI模板表格名称
          var originalValue = res.data.data.content;
          _this3.$refs["contractinfo_table"].setData("contract_t", JSON.parse(JSON.stringify(originalValue)));
          _this3.totalElements = res.data.data.totalElements;
        })["catch"](function (e) {
          _this3.$message({
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">合同变更</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"add\">新增</el-button>\n    </div>\n    <div class=\"fl\"  style=\"margin-left: 2px\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"buttonVerification('submit')\">提交</el-button>\n    </div>\n    <div class=\"fl\"  style=\"margin-left: 2px\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"buttonVerification('check')\">审核</el-button>\n    </div>\n     <div class=\"fr\">\n      <ifbp-search :template-code=\"searchTemplateCode\" @search=\"handleSearch\"></ifbp-search>\n    </div>\n  </div>\n\n   \n\n  <!-- 合同列表 -->\n  <div id=\"contractList\" class=\"list-main-container clearfix\">\n    <!--模板组件:pkTemp=\"pk_temp\"-->\n   <ifbp-template ref=\"contractinfo_table\"\n                  tplId=\"contractinfo-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  :tplData=\"contractnfoListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @edit-table-click=\"tableEditClick\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n\n    <el-dialog title=\"变更类型选择\" :modal=\"true\" v-model=\"dialogTableVisible\">\n        <el-form :inline=\"true\"  class=\"demo-form-inline\">\n            <el-form-item label=\"合同参照:\" prop=\"contractRef\">\n              <el-ref :is-muti-select=\"true\" \n                :ref-code=\"refCode\" \n                :template-value=\"refValue\"  \n                :is-edit=\"true\"\n                :field=\"field\" \n                :query-params=\"{source_billtype:'CONTRACT_MAKE'}\"\n                ></el-ref>\n          </el-form-item> \n          <el-form-item>\n            <el-checkbox :indeterminate=\"isIndeterminate\" \n                         v-model=\"checkAll\" \n                         @change=\"handleCheckAllChange\">全选</el-checkbox>\n              <el-checkbox-group v-model=\"checkedTypes\" @change=\"handleCheckedTypesChange\">\n                  <el-checkbox v-for=\"typec in typecs\" :label=\"typec.id\" :disabled=\"typec.id === temptype\"  :key=\"typec.id\">{{typec.name}}</el-checkbox>\n              </el-checkbox-group>\n           </el-form-item>\n          <el-form-item> \n              <el-button @click=\"dialogTableVisible = false\">取 消</el-button>\n              <el-button type=\"primary\" @click=\"saveChangeTypeClick\">确 定</el-button>\n          </el-form-item>\n        </el-form>\n  </el-dialog>\n  <el-dialog\n      title=\"提示\"\n      :visible.sync=\"dialogVisibleSubmit\"\n      size=\"tiny\" >\n      <span :key=\"spanText\">{{ spanText }}</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"dialogVisibleSubmit = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"buttonAction\">确 定</el-button>\n      </span>\n  </el-dialog>\n  <el-dialog\n      title=\"提示\"\n      :visible.sync=\"dialogVisibleCheck\"\n      size=\"tiny\" > \n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button type=\"primary\"  @click=\"checkOrUn('check')\">审核通过</el-button>\n          <el-button type=\"primary\"  @click=\"checkOrUn('unCheck')\">审核不通过</el-button>\n          <el-button @click=\"dialogVisibleCheck = false\">取 消</el-button>\n      </span>\n  </el-dialog>\n\n  <!--分页组件-->\n  <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n      :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n  </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/modify/src/contractModify/insuranceModify/custpledge-modify-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['source_bill'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        custpledgeDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT022',
        nexusKey: 'custpledgeModify',
        custpledgeData: {},
        t_Methods: {
          handleRefChange: function handleRefChange(type, data) {
            //参照变化处理函数 依据参照给 证件类型  证件号码赋值
            this.$refs['CustPledge-form'].model.identity_no = data.value[0].identity_no;
            this.$refs['CustPledge-form'].model.identity_type = data.value[0].identity_type;
          }
        },
        custpledgeResetFun: function custpledgeResetFun($node) {
          // let $refNode= this.getNodeById($node, 'd6ivnfpjhb');//获取担保人参照
          // if($refNode.length){
          //   $refNode.attr("v-on:trigger", "handleRefChange"); //给参照添加trigger事件
          // }
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
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
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
              custCondList: [{ "key": "source_bill", "oper": "=", "value": this.source_bill }]
            }
          }
        };
        this.$http({
          url: _publicData.ylsBusi + 'contr/modify/pledge/page',
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
      custpledgeFormConfirm: function custpledgeFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = void 0;
        var data = this.$refs.custpledgeRef.comp.CustPledge;
        if (data.pk_prj_cust_pledge) {
          url = _publicData.ylsBusi + 'contr/modify/pledge/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/pledge/create';
        }
        data.source_bill = this.source_bill;
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
      },
  
      // 保证担保信息form的取消操作
      custpledgeFormCancel: function custpledgeFormCancel(type) {
        if (type === 'form') {
          this.$refs['custpledgeRef'].comp.formShow = false;
          this.$emit("closeAddForm");
        } else {
          this.$refs['custpledgeRef'].getTableComp().closeExpandRow();
        }
      },
  
      //担保编辑
      custpledgeEditTableRow: function custpledgeEditTableRow(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs['custpledgeRef'].getTableComp().expandRow(row);
        this.$refs['custpledgeRef'].formShow = false;
        //custpledgeRef为表单数据对象参数
        this.$refs['custpledgeRef'].setData('CustPledge', row);
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
          url: _publicData.ylsBusi + 'contr/modify/pledge/deleteById',
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
 
 define('yls^busi/modify/src/contractModify/insuranceModify/mortgage-modify-info.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    props: ['source_bill', 'invisible'],
    data: function data() {
      var oThis = this;
      var validator = function validator(rule, value, callback) {};
      return {
        mortgageDelVisible: false,
        rmoveindex: '',
        delId: '',
        funnode: 'BT022',
        nexusKey: 'mortgageModify',
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
  
    //监听引用传参后实时变动
    computed: {
      currentsource_bill: function currentsource_bill() {
        return this.source_bill;
      }
    },
    //监听参数变动后方法
    watch: {
      source_bill: function source_bill(val) {
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
          url: _publicData.ylsBusi + 'contr/modify/mp/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['mortgageRef'].setData('mortgagePledgeEntity0_t', JSON.parse(JSON.stringify(_this.originalValue)));
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
        var data = this.$refs.mortgageRef.comp.mortgagePledgeEntity0;
        if (data.pk_mortgage_pledge) {
          url = _publicData.ylsBusi + 'contr/modify/mp/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/mp/create';
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
            var linarraydata = _this2.$refs.mortgageRef.getData('mortgagePledgeEntity0_t');
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
            _this2.$refs.mortgageRef.setData('mortgagePledgeEntity0_t', JSON.parse(JSON.stringify(linarraydata)));
  
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
        this.$refs['mortgageRef'].setData('mortgagePledgeEntity0', row);
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
          url: _publicData.ylsBusi + 'contr/modify/mp/deleteById',
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
 
 define('yls^busi/modify/src/contractModify/insuranceModify/pledge-modify-info.vue', function(require, exports, module) {

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
        funnode: 'BT022',
        nexusKey: 'pledgeModify',
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
          url: _publicData.ylsBusi + 'contr/modify/mp/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs['pledgeRef'].setData('PledgeEntity0_t', JSON.parse(JSON.stringify(_this.originalValue)));
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
        var data = this.$refs.pledgeRef.comp.PledgeEntity0;
        if (data.pk_mortgage_pledge) {
          url = _publicData.ylsBusi + 'contr/modify/mp/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/mp/create';
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
            var linarraydata = _this2.$refs.pledgeRef.getData('PledgeEntity0_t');
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
            _this2.$refs.pledgeRef.setData('PledgeEntity0_t', JSON.parse(JSON.stringify(linarraydata)));
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
        this.$refs['pledgeRef'].setData('PledgeEntity0', row);
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
          url: _publicData.ylsBusi + 'contr/modify/mp/deleteById',
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
 
 define('yls^busi/modify/src/contractModify/payConditionModify/payConditionModify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    props: ["source_bill"],
    data: function data() {
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        funnode: "BT022",
        nexusKey: "payconditionModify",
        payDelVisible: false,
        delId: null,
        delIndex: null,
        paytplData: {},
        payResetFun: function payResetFun($node) {
          var $table = $node.find("el-table");
          var operateArr = [{
            icon: "search",
            title: "查看"
          }, {
            icon: "edit",
            title: "编辑"
          }, {
            icon: "delete",
            title: "删除"
          }];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      };
    },
  
  
    computed: {
      cur_source_bill: function cur_source_bill() {
        return this.source_bill;
      }
    },
    watch: {
      source_bill: function source_bill(val) {
        this.payForQuery();
      }
    },
    created: function created() {
      this.payForQuery();
    },
  
    methods: {
  
      //查询
      payForQuery: function payForQuery() {
        var _this = this;
  
        if (this.cur_source_bill) {
          var url = _publicData.ylsBusi + "contr/modify/paymentCondition/page";
          var dataParams = {
            orderList: [{
              direction: "desc",
              property: "ts"
            }],
            searchParams: {
              searchMap: {
                custCondList: [{ key: "source_bill", oper: "=", value: this.cur_source_bill }]
              }
            }
          };
          this.$http.post(url, dataParams, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            var originalValue = res.data.data.content;
            _this.$refs.payConditionRef.setTableData(JSON.parse(JSON.stringify(originalValue)));
          });
        }
      },
  
  
      //查看
      paySearchRow: function paySearchRow(scope) {
        this.$refs.payConditionRef.getTableComp().expandRow(scope.row);
        this.$refs.payConditionRef.comp.formShow = false;
        this.$refs.payConditionRef.editable = false;
        this.$refs.payConditionRef.setFormData(scope.row);
      },
  
      //编辑
      payEditRow: function payEditRow(scope) {
        //备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
  
        this.$refs.payConditionRef.getTableComp().expandRow(scope.row);
        this.$refs.payConditionRef.comp.formShow = false;
        this.$refs.payConditionRef.editable = true;
        this.$refs.payConditionRef.setFormData(scope.row);
      },
  
      //编辑/保存-取消
      payFormCancel: function payFormCancel(type) {
        if (type === "form") {
          this.$refs.payConditionRef.comp.formShow = false;
        } else {
          this.$refs.payConditionRef.getTableComp().closeExpandRow();
          //回复为取消前的数据
          this.paytplData.payconditionModifyTable[this.baseEditIndex] = this.baseData;
          // this.$refs.payConditionRef.setFormData(payTableData);
        }
      },
  
      //编辑-保存
      payFormConfirm: function payFormConfirm(type) {
        var _this2 = this;
  
        var data = this.$refs.payConditionRef.comp.payconditionModifyForm;
        //保存
        if (type === "form") {
          data.source_bill = this.cur_source_bill;
          var url = _publicData.ylsBusi + "contr/modify/paymentCondition/create";
          this.$http.post(url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "保存成功！",
                type: "success"
              });
              _this2.paytplData.payconditionModifyTable.unshift(res.data.data);
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.payConditionRef.comp.formShow = false;
        } else {
          //更新
          var _url = _publicData.ylsBusi + "contr/modify/paymentCondition/update";
          this.$http.post(_url, data, { headers: { "Content-Type": "application/json" } }).then(function (res) {
            if (res.data.success === true) {
              _this2.$message({
                message: "更新成功！",
                type: "success"
              });
            } else {
              _this2.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          });
          this.$refs.payConditionRef.getTableComp().closeExpandRow();
        }
      },
  
      //删除-弹框提醒
      payDeleteRow: function payDeleteRow(scope) {
        this.payDelVisible = true;
        this.delId = scope.row.pk_prj_payment_condition;
        this.delIndex = scope.$index;
      },
  
      //删除-确定
      payFormDelete: function payFormDelete() {
        var _this3 = this;
  
        var url = _publicData.ylsBusi + "contr/modify/paymentCondition/deleteById";
        this.$http.post(url, this.delId, { headers: { "Content-Type": "application/json" } }).then(function (res) {
          if (res.data.success === true) {
            _this3.$message({
              message: "删除成功！",
              type: "success"
            });
            _this3.paytplData.payconditionModifyTable.splice(_this3.delIndex, 1);
          } else {
            _this3.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        });
        this.payDelVisible = false;
        this.delId = null;
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
  __vue__options__.template = "\r\n<!--付款条件变更管理模块-->\r\n<div>\r\n     <ifbp-template ref=\"payConditionRef\"\r\n                    tplId=\"payConditionTemplate\"\r\n                    :funnode=\"funnode\"\r\n                    :nexuskey=\"nexusKey\"\r\n                    :tplData=\"paytplData\"\r\n                    show-type=\"table-form\"\r\n                    :tplResetFun=\"payResetFun\"\r\n                    @search-table-click=\"paySearchRow\"\r\n                    @edit-table-click=\"payEditRow\"\r\n                    @delete-table-click=\"payDeleteRow\"\r\n                    @form-confirm-click=\"payFormConfirm\"\r\n                    @form-cancel-click=\"payFormCancel\">\r\n     </ifbp-template>\r\n\r\n    <!-- 业务付款条件删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"payDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"payDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button @click=\"payFormDelete\" type=\"primary\" >确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/modify/src/contractModify/pentaltyruledeModify/pentaltyruledeModify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        penaltyRuleDeDelVisible: false,
        rmoveindex: "",
        delId: "",
  
        funnode: "BT022",
  
        nexusKey: "pentaltyruledeModify",
  
        //逾期利率
        penaltyRuleDeIcons: [{
          icon: "plus",
          click: function click() {
  
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "未获取到合同",
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
  
        penaltyRuleDeData: {
          rules: {}
        },
        //渲染表格
        penaltyRuleDeResetFun: function penaltyRuleDeResetFun($node) {
  
          //获取table,此id为ui模板上面的表格Id
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
        this.requestPenaltyRule();
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
          this.requestPenaltyRule();
        }
      },
  
      //请求业务逾期利率
      requestPenaltyRule: function requestPenaltyRule() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "contr/modify/penaltyRuleDe/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "source_bill"
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
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        }).then(function (res) {
          _this.originalValue = res.data.data.content;
          _this.$refs["penaltyRuleDeRef"].setData("PenaltyRuleList", JSON.parse(JSON.stringify(_this.originalValue)));
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
        }
      },
      //逾期利率主表保存
      penaltyRuleDeFormConfirm: function penaltyRuleDeFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.penaltyRuleDeRef.comp.PenaltyRuleDetail;
        data.source_bill = this.source_bill;
  
        if (data.pk_prj_rule) {
          url = _publicData.ylsBusi + 'contr/modify/penaltyRuleDe/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/penaltyRuleDe/create';
        }
        //保存校验
        this.$refs.penaltyRuleDeRef.comp.$refs["PenaltyRuleDetailRef"].validate(function (valid) {
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
                var linarraydata = _this2.$refs.penaltyRuleDeRef.getData("PenaltyRuleList");
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
                _this2.$refs.penaltyRuleDeRef.setData("PenaltyRuleList", JSON.parse(JSON.stringify(linarraydata)));
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
        this.$refs["penaltyRuleDeRef"].setData("PenaltyRuleDetail", row);
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
          url: _publicData.ylsBusi + "contr/modify/penaltyRuleDe/deleteById",
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
            _this3.requestPenaltyRule();
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
  __vue__options__.template = "\r\n<!--逾期利率变更管理模块-->\r\n<div>\r\n          <ifbp-template ref=\"penaltyRuleDeRef\"\r\n                        tplId=\"penaltyRuleDe-template\"\r\n                        :funnode=\"funnode\"\r\n                        :nexuskey=\"nexusKey\"\r\n                        :tplData=\"penaltyRuleDeData\"\r\n                        :tplResetFun=\"penaltyRuleDeResetFun\"\r\n                        @form-confirm-click=\"penaltyRuleDeFormConfirm\"\r\n                        @form-cancel-click=\"penaltyRuleDeFormCancel\"\r\n                        show-type=\"table-form\"\r\n                        @edit-table-click=\"penaltyRuleDeFormedit\"\r\n                        @delete-table-click=\"penaltyRuleDeFormdelete\"\r\n                        >\r\n          </ifbp-template>\r\n\r\n    <!-- 业务变更 删除提示框 -->\r\n    <el-dialog\r\n      title=\"提示\"\r\n      v-model=\"penaltyRuleDeDelVisible\"\r\n      :modal=\"true\"\r\n      size=\"tiny\">\r\n      <span>确认删除该条记录？删除后无法恢复。</span>\r\n      <span slot=\"footer\" class=\"dialog-footer\">\r\n        <el-button @click=\"penaltyRuleDeDelVisible = false , this.delId=''\">取 消</el-button>\r\n        <el-button type=\"primary\" @click=\"penaltyRuleDeDeleteClick\">确 定</el-button>\r\n      </span>\r\n    </el-dialog>\r\n  </div>\r\n"
  

});
 
 define('yls^busi/modify/src/contractModify/rentthingModify/rentthing-modify.vue', function(require, exports, module) {

  "use strict";
  
  exports.__esModule = true;
  
  var _publicData = require("yls^/src/apps/common/js/publicData");
  
  exports["default"] = {
    //应用vue传过来接收参数
    props: ["source_bill"],
    data: function data() {
      var oThis = this;
      //校验
      var validatecustomer = function validatecustomer(rule, value, callback) {};
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        renttingDelVisible: false,
        rmoveindex: "",
        delId: "",
        //租赁物
        renttingIcons: [{
          icon: "plus",
          click: function click() {
            debugger;
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.busirenttingRef.comp;
            var table = uitemplateComp.$refs["proRentThing_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.busirenttingRef.setData("proRentThing", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["proRentThing_ref"].resetFields();
          }
        }],
        funnode: "BT022",
        nexuskey: "rentthing_busi_modify",
        //渲染表格
        renttingResetFun: function renttingResetFun($node) {
  
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
        this.requestPrjrentting();
      }
    },
    //获取数据数据初始化操作
    created: function created() {
      // this.request();
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
        if (this.source_bill != "") {
          this.requestPrjrentting();
        }
      },
  
      //请求业务租赁物
      requestPrjrentting: function requestPrjrentting() {
        var _this = this;
  
        var url;
        url = _publicData.ylsBusi + "contr/modify/rentth/page";
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          pageNum: 0,
          pageSize: 0,
          searchParams: {
            searchMap: {
              custCondList: [{ "key": "source_bill", "oper": "=", "value": this.source_bill }]
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
          _this.$refs["busirenttingRef"].setData("proRentThing_t", JSON.parse(JSON.stringify(_this.originalValue)));
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      //租赁物取消按钮
      renttingFormCancel: function renttingFormCancel(type) {
        this.rmoveindex = "";
        //关闭表单或者是下拉显示行
        if (type === "form") {
          this.$refs["busirenttingRef"].comp.formShow = false;
        } else {
          this.$refs["busirenttingRef"].getTableComp().closeExpandRow();
        }
      },
      //租赁物主表保存
      renttingFormConfirm: function renttingFormConfirm() {
        var _this2 = this;
  
        //获取当前数据
        var url = "";
        var data = this.$refs.busirenttingRef.comp.proRentThing;
        data.source_bill = this.source_bill;
        if (data.pk_prj_rent_thing) {
          url = _publicData.ylsBusi + 'contr/modify/rentth/update';
        } else {
          url = _publicData.ylsBusi + 'contr/modify/rentth/create';
        }
        //保存校验
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
            _this2.originalValue = res.data.data;
            //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
            var linarraydata = _this2.$refs.busirenttingRef.getData("proRentThing_t");
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
            _this2.$refs.busirenttingRef.setData("proRentThing_t", JSON.parse(JSON.stringify(linarraydata)));
            //隐藏详情列表
            _this2.$refs["busirenttingRef"].comp.formShow = false;
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
      //租赁物行编辑
      renttingFormedit: function renttingFormedit(scope) {
        //记录删除位置
        this.rmoveindex = scope.$index;
        //行下展开表单界面
        var row = scope.row;
        this.$refs["busirenttingRef"].getTableComp().expandRow(row);
        this.$refs["busirenttingRef"].formShow = false;
        //proRentThing为表单数据对象参数
        this.$refs["busirenttingRef"].setData("proRentThing", row);
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
          url: _publicData.ylsBusi + "contr/modify/rentth/deleteById",
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
            _this3.requestPrjrentting();
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
        this.renttingDelVisible = false;
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
  __vue__options__.template = "\n<!--租赁物信息管理模块-->\n<div>\n          <ifbp-template ref=\"busirenttingRef\"\n                        tplId=\"busirentting\"\n                        :funnode=\"funnode\"\n                        :nexuskey=\"nexuskey\" \n                        :tplResetFun=\"renttingResetFun\"\n                        @form-confirm-click=\"renttingFormConfirm\"\n                        @form-cancel-click=\"renttingFormCancel\"\n                        show-type=\"table-form\"\n                        @edit-table-click=\"renttingFormedit\"\n                        @delete-table-click=\"renttingFormdelete\"\n                        >\n          </ifbp-template>\n\n    <!-- 业务租赁物 删除提示框 -->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"renttingDelVisible\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该条记录？删除后无法恢复。</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n        <el-button @click=\"renttingDelVisible = false , this.delId=''\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"renttingDeleteClick\">确 定</el-button>\n      </span>\n    </el-dialog>\n  </div>\n"
  

});

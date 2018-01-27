 
 define('yls^busi/quote/src/product-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    // components: {
    //   'ifbp-template': template,
    // },
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName("view")[0],
        pk_quote_scheme: '',
        templist: [], // 存模板数据
        baseIcons: [{
          icon: "edit",
          click: function click() {
            oThis.productEdit = !oThis.productEdit;
            oThis.baseFormData = JSON.parse(JSON.stringify(oThis.$refs.baseTemplateRef.getData("quoteScheme")));
          }
        }],
        addIcons: [{
          icon: "plus",
          click: function click() {
            oThis.dialogFormVisiable = true;
            oThis.resetFormDialog();
          }
        }],
        metadataOptions: [{
          id: "2889d7d2-b6e1-4953-a8f8-d259a34d4d2a",
          pid: "0274c39c-4658-4802-a96f-6b40feba2842",
          value: "报价测算表",
          type: "base"
        }, {
          id: "281d0c07-2e08-459d-84dd-1e786b10bc80",
          pid: "0274c39c-4658-4802-a96f-6b40feba2842",
          value: "测算投放计划",
          type: "loanPlan"
        }, {
          id: "cefe8a9f-79fc-4664-859a-565a5f006b34",
          pid: "0274c39c-4658-4802-a96f-6b40feba2842",
          value: "测算规则设置",
          type: "rulePlan"
        }, {
          id: "58d9f826-8918-4d71-814f-a71ba8f54d1e",
          pid: "0274c39c-4658-4802-a96f-6b40feba2842",
          value: "测算收支计划",
          type: "inoutPlan"
        }],
        productPk: "f820f976-e378-4051-acda-ef645ceb070c",
        baseFormData: {}, // 表单数据对象
        productData: {
          quoteScheme: {
            // templist: [],
          },
          rules: {
            // scheme_name: [{ required: true, message: "方案名称不能为空", trigger: "blur" }],
            // scheme_code: [{ required: true, message: "方案编码不能为空", trigger: "blur" }]
          }
        },
        productEdit: false,
        dialogFormVisiable: false,
        metadataFormData: {
          pkMetadata: "",
          pkClass: "",
          sysflag: "",
          name: ""
        }
        // productFormResetFun: function($node) {
        //   var $refNode = $node.find("el-ref"); // 根据_id属性找到对应el-ref元素
        //   if($refNode.length) {
        //     $refNode.attr("v-on:trigger", "handleRefChange"); // 添加绑定事件, 参照改变是触发handleRefChange方法
        //   }
        // },
        // t_Methods: {
        //   handleRefChange: function(type, data) {
        //     console.log("触发参照改变:", type, data);
        //     /*
        //      * 这里的this指向 ifbp-element组件实例，
        //      * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
        //      * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
        //     */
        //     this.$refs.quote_scheme_form.model.memo = data.value[0].refcode; // 给form中某个字段赋值，比如这里的memo(产品描述字段)
        //   }
        // },
      };
    },
    created: function created() {
      this.request();
      var oThis = this;
      try {
        if (typeof window.designerCB !== "function") {
          // 设计器页面点击保存时执行的回调参数
          window.designerCB = function (pk_temp) {
            // oThis.requestProductInfo();
            if (pk_temp) {
              var currentIndex = -1; // pk_temp在templist数组中的index值
              var changedTempObj = null; // pk_temp对应的templist数组项
              oThis.templist.forEach(function (item, index) {
                if (item.temp_id === pk_temp) {
                  currentIndex = index;
                  changedTempObj = item;
                }
              });
  
              if (changedTempObj && currentIndex > -1) {
                oThis.templist.splice(currentIndex, 1);
                // 先把修改的UI模板从数组中，先删除延迟200ms再添加，以触发页面重新渲染
                setTimeout(function () {
                  oThis.templist.splice(currentIndex === 0 ? currentIndex : currentIndex - 1, 0, changedTempObj);
                }, 200);
              }
            } else {
              var arrTemplist = JSON.parse(JSON.stringify(oThis.templist));
              oThis.templist = [];
              // 先把UI模板数组先清空延迟200ms再赋值，以触发页面重新渲染
              setTimeout(function () {
                oThis.templist = arrTemplist;
              }, 200);
            }
          };
        }
      } catch (e) {
        console.log(e);
      }
    },
  
    methods: {
      afterCreateFun: function afterCreateFun() {
        var _this = this;
  
        this.$nextTick(function () {
          _this.baseFormData = JSON.parse(JSON.stringify(_this.$refs.baseTemplateRef.getData("quoteScheme")));
        });
      },
      request: function request() {
        this.pk_quote_scheme = this.$root.$router.currentRoute.params.id;
        // 请求客户基本信息详情
        if (this.pk_quote_scheme) {
          this.requestProductInfo();
        } else if (this.$root.$router.currentRoute.fullPath.indexOf('/add') > -1) {
          this.productEdit = true;
        }
      },
  
      // 请求产品方案信息详情
      requestProductInfo: function requestProductInfo() {
        var _this2 = this;
  
        // var baseUrl = "/yls-busi-web/";
        this.$http({
          url: _publicData.ylsBusi + "quote/scheme/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: this.pk_quote_scheme
        }).then(function (res) {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(_this2.$refs.baseTemplateRef);
            // this.$set(this.productData, 'quoteScheme', JSON.parse(JSON.stringify(originalValue)));
            _this2.$refs.baseTemplateRef.setData("quoteScheme", JSON.parse(JSON.stringify(originalValue)));
            if (Object.prototype.toString.call(originalValue.templist) === '[object Array]' && originalValue.templist.length > 0) {
              _this2.templist = JSON.parse(JSON.stringify(originalValue.templist));
            }
          } else {
            _this2.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          console.error(e);
          _this2.$message({
            message: "产品方案信息详情获取失败",
            type: "error"
          });
        });
      },
  
      // 点击取消按钮
      productInfoCancel: function productInfoCancel() {
        this.productEdit = false;
        /**
         * 在设计器上将所有参照字段设置清空参照
         */
        // var refs = this.$refs.baseTemplateRef.comp.$refs;
        // for(let key in refs) {
        //   if(key.indexOf("ref_") > -1) {
        //     var ref = refs[key].$children[0];
        //       try {
        //         if(ref && typeof ref.reset === "function") {
        //           ref.reset();
        //         }
        //       } catch(e) {
        //         console.log(e);
        //       }
        //     }
        // }
        // 重置value
        this.$refs.baseTemplateRef.setData("quoteScheme", JSON.parse(JSON.stringify(this.baseFormData)));
      },
  
      // 点击保存按钮
      productInfoConfirm: function productInfoConfirm() {
        var _this3 = this;
  
        var url;
        var data = this.$refs.baseTemplateRef.getData("quoteScheme");
        data.templist = this.templist;
        console.log(data);
        var baseUrl = _publicData.ylsBusi;
        if (this.pk_quote_scheme) {
          url = baseUrl + 'quote/scheme/update';
        } else {
          url = baseUrl + 'quote/scheme/create';
        }
        this.$refs.baseTemplateRef.comp.$refs["quote_scheme_form"].validate(function (valid) {
          if (valid) {
            _this3.$http({
              url: url,
              headers: { 'Content-Type': 'application/json' },
              method: "post",
              data: JSON.parse(JSON.stringify(data))
            }).then(function (res) {
              if (res.data.success === true) {
                _this3.$message({
                  message: "产品方案数据保存成功",
                  type: "success"
                });
                _this3.originalValue = res.data.data;
                _this3.$refs.baseTemplateRef.setData("quoteScheme", JSON.parse(JSON.stringify(_this3.originalValue)));
                _this3.productEdit = false;
                // 如果为新增，则跳转到详情页面
                if (_this3.originalValue.pk_quote_scheme && !_this3.pk_quote_scheme) {
                  _this3.$router.replace('/productsolution/detail/' + _this3.originalValue.pk_quote_scheme);
                  _this3.pk_quote_scheme = _this3.originalValue.pk_quote_scheme;
                }
              } else {
                _this3.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            })["catch"](function () {
              _this3.$message({
                message: "产品方案数据保存失败",
                type: "error"
              });
            });
          }
        });
      },
      goBack: function goBack() {
        this.$router.back();
      },
      refChangFun: function refChangFun(id) {
        for (var i = 0; i < this.metadataOptions.length; i++) {
          if (this.metadataOptions[i].id === id) {
            this.metadataFormData.pkMetadata = this.metadataOptions[i].pid;
            this.metadataFormData.pkClass = this.metadataOptions[i].id;
            this.metadataFormData.sysflag = "Y";
            this.metadataFormData.type = this.metadataOptions[i].type;
            // this.metadataFormData.name = this.metadataOptions[i].value;
          }
        }
      },
      resetFormDialog: function resetFormDialog() {
        var _this4 = this;
  
        Object.keys(this.metadataFormData).forEach(function (key) {
          _this4.metadataFormData[key] = '';
        });
        if (this.$refs.editForm) {
          this.$refs.editForm.resetFields();
        }
      },
      cancelFormDialog: function cancelFormDialog() {
        this.dialogFormVisiable = false;
      },
  
      // 点击新建UI模板弹框的确认按钮，创建UI模板
      confirm: function confirm() {
        var _this5 = this;
  
        var oThis = this;
        this.$refs.editForm.validate(function (valid) {
          if (valid) {
            var formData = "data=" + JSON.stringify({ form: _this5.metadataFormData }) + "&pkMetadata=" + _this5.metadataFormData.pkMetadata + "&pk_temp=";
            _this5.$http({
              url: "/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/saveTemplate",
              method: 'post',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
              data: formData
            }).then(function (res) {
              if (res.data.form) {
                _this5.dialogFormVisiable = false;
                var data = res.data.form;
                var pkTemplateObj = {
                  temp_id: data.pk_temp, // 模板pk_temp
                  temp_title: data.name, // 模板名称
                  temp_type: _this5.metadataFormData.type, // 模板类型
                  pk_quote_scheme: _this5.pk_quote_scheme || '' // 主表id
                };
                _this5.saveTemplate(pkTemplateObj).then(function () {
                  var pk_temp = data ? data.pk_temp : '';
                  _this5.openDesiginerPage(pk_temp);
                });
              } else {
                _this5.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })["catch"](function (e) {
              _this5.$message({
                message: "创建UI模板出错",
                type: "error"
              });
            });
            _this5.dialogFormVisiable = false;
          }
        });
      },
  
      // 将模板数据关联到该方案中
      saveTemplate: function saveTemplate(data) {
        var _this6 = this;
  
        // var baseUrl = '/yls-busi-web/';
        var url = _publicData.ylsBusi + "quote/scheme/temp/create";
        debugger;
        return this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: JSON.parse(JSON.stringify(data))
        }).then(function (res) {
          if (res.data.success === true) {
            var pkTemplateObj = JSON.parse(JSON.stringify(data));
            // 添加取子表的pk_quote_scheme_temp
            pkTemplateObj.pk_quote_scheme_temp = res.data.data.pk_quote_scheme_temp;
            _this6.templist.push(pkTemplateObj);
            _this6.$message({
              message: "产品方案模板数据保存成功",
              type: "success"
            });
          }
        })["catch"](function (e) {
          console.log("产品方案模板数据保存出错", e);
          _this6.$message({
            message: "产品方案模板数据保存出错",
            type: "error"
          });
        });
      },
      openDesiginerPage: function openDesiginerPage(pk) {
        var baseUrl = location.protocol + "//" + location.host + "/uitemplate_web/index.html?pk_temp=";
        // 打开新窗口根据 pk_temp 进入设计器页面
        window.open(baseUrl + pk);
      },
      showDeleteDesiginerDialog: function showDeleteDesiginerDialog(data, index) {
        var _this7 = this;
  
        this.$confirm('确定从该方案中删除此关联模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          _this7.deleteQuoteSchemeComp(data, index).then(function () {
            // 从该方案中删除此模板pk后，再根据pk从模板库中删除
            _this7.deleteTemplateData(data);
          });
        })["catch"](function () {
          _this7.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
  
      // 从该方案中删除此模板pk后
      deleteQuoteSchemeComp: function deleteQuoteSchemeComp(data, index) {
        var _this8 = this;
  
        var baseUrl = '/yls-busi-web/';
        var url = baseUrl + "quote/scheme/temp/deleteById";
        return this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data.pk_quote_scheme_temp
        }).then(function (res) {
          if (res.data.success === true) {
            _this8.$message({
              message: "方案模板：" + data.temp_title + "从该方案中删除成功",
              type: "success"
            });
            _this8.templist.splice(index, 1);
          }
        })["catch"](function (e) {
          console.log("方案模板：" + data.temp_title + "从该方案中删除出错", e);
          _this8.$message({
            message: "方案模板：" + data.temp_title + "从该方案中删除出错",
            type: "error"
          });
        });
      },
  
      // 根据pk从模板库中删除模板
      deleteTemplateData: function deleteTemplateData(data) {
        var _this9 = this;
  
        var url = "/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/deleteTemplate";
        this.$http({
          url: url,
          contentType: 'application/x-www-form-urlencoded',
          method: "post",
          data: "data=" + JSON.stringify({ form: { id: data.temp_id } })
        }).then(function (res) {
          if (res.data.status === 1) {
            _this9.$message({
              message: '方案模板：' + data.temp_title + "从UI模板库中删除成功",
              type: "success"
            });
          }
        })["catch"](function (e) {
          console.log("模板" + data.temp_title + "从UI模板库中删除出错", e);
          _this9.$message({
            message: "模板" + data.temp_title + "从UI模板库中删除出错",
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\" id=\"product-detail\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">产品方案设计</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <div class=\"header-panel\">\n      <el-button class=\"fr\" type=\"primary\" @click=\"goBack\">返 回</el-button>\n    </div>\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <ifbp-panel id=\"productInfo\" title=\"方案信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                       tplId=\"baseTemplate\"\n                       :pkTemp=\"productPk\"\n                       show-type=\"form\"\n                       :tplData=\"productData\"\n                       @after-create=\"afterCreateFun\"\n                       :editable=\"productEdit\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"productEdit\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"productInfoCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"productInfoConfirm\">保存</el-button>\n        </div>\n      </ifbp-panel>\n\n        <ifbp-panel id=\"productPreview\" title=\"方案展示\" :icons=\"addIcons\" v-if=\"!!pk_quote_scheme\">\n          <ifbp-panel :id=\"'productPreviewDetail'+index\" :title=\"item.temp_title\"  v-for=\"(item, index) in templist\" :key=\"item.temp_id\">\n              <div class=\"template-title\">\n                <i class=\"el-icon-menu fr\" title=\"设计模板\" @click=\"openDesiginerPage(item.temp_id)\"></i>\n                <i class=\"el-icon-delete fr\" title=\"删除模板\" @click=\"showDeleteDesiginerDialog(item, index)\"></i>\n              </div>\n              <ifbp-template\n                :pkTemp=\"item.temp_id\"\n                :tplId=\"item.temp_id\"\n                :editable=\"true\">\n              </ifbp-template>\n          </ifbp-panel>\n        </ifbp-panel>\n\n      <!-- <ifbp-panel id=\"productPreview\" title=\"方案展示\" :icons=\"addIcons\" v-if=\"!!pk_quote_scheme\">\n        <div class=\"template-container\" v-for=\"(item, index) in templist\" :key=\"item.temp_id\">\n          <div class=\"template-title\">\n            <span>{{item.temp_title}}</span>\n            <i class=\"el-icon-menu\" title=\"设计模板\" @click=\"openDesiginerPage(item.temp_id)\"></i>\n            <i class=\"el-icon-delete\" title=\"删除模板\" @click=\"showDeleteDesiginerDialog(item, index)\"></i>\n          </div>\n          <ifbp-template\n            :pkTemp=\"item.temp_id\"\n            :tplId=\"item.temp_id\"\n            :editable=\"true\">\n          </ifbp-template>\n        </div>\n      </ifbp-panel> -->\n    </ifbp-panel-group>\n  </div>\n\n  <!-- 新增UI模板的 form 弹框 -->\n  <el-dialog title=\"创建UI模板\" :modal=\"false\" v-model=\"dialogFormVisiable\">\n    <el-form :model=\"metadataFormData\" label-width=\"100px\" ref=\"editForm\">\n      <el-form-item label=\"模板名称:\"\n                    prop=\"name\"\n                    :rules=\"[{ required: true, message: '模板名称不能为空'}]\">\n        <el-input v-model=\"metadataFormData.name\"></el-input>\n      </el-form-item>\n      <el-form-item label=\"元数据:\"\n                    prop=\"pkClass\"\n                    :rules=\"[{ required: true, message: '元数据不能为空'}]\">\n        <el-select @change=\"refChangFun\" v-model=\"metadataFormData.pkClass\">\n          <el-option\n            v-for=\"item in metadataOptions\"\n            :key=\"item.id\"\n            :label=\"item.value\"\n            :value=\"item.id\">\n          </el-option>\n        </el-select>\n      </el-form-item>\n    </el-form>\n    <div slot=\"footer\" class=\"dialog-footer\">\n      <el-button @click=\"cancelFormDialog\">取 消</el-button>\n      <el-button type=\"primary\" @click=\"confirm\">确 定</el-button>\n    </div>\n  </el-dialog>\n</div>\n"
  

});
 
 define('yls^busi/quote/src/product-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    mixins: [(0, _publicData.pagination)('request')],
    data: function data() {
      var oThis = this;
      return {
        productPk: "f820f976-e378-4051-acda-ef645ceb070c",
        showDeleteButton: false,
        search_input: "",
        isHide: true,
        delDialogVisible: false,
        multiDelDialogVisible: false,
        productTableData: {
          quoteScheme_t: []
        },
        productTableResetFun: function productTableResetFun($node) {
          var $table = this.getNodeById($node, "9uh48offlq5");
          var operateArr = [{
            title: "编辑",
            icon: "edit"
          }, {
            title: "删除",
            icon: "delete"
          }];
          // getTableOperateHtml方法需要传一个操作按钮数组
          var operateHtml = this.getTableOperateHtml(operateArr);
          var labelStr = 'label="';
          var newLabelStr = 'label="操作';
          // 直接操作operateHtml字符串，为新增的最后一列加标题“操作”
          $table.append(operateHtml.replace(labelStr, newLabelStr));
          return $node[0].outerHTML;
        }
      };
    },
    created: function created() {
      var requestDefer = this.request();
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
        location.hash = "/productsolution/detail/" + scope.row.pk_quote_scheme;
      },
      tableDeleteClick: function tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_quote_scheme;
      },
      initPromise: function initPromise(request) {
        Promise.all([request]).then(function () {
          // this.$refs.cover.remove();
        });
      },
      searchInputEnterClick: function searchInputEnterClick() {
        alert(this.search_input);
      },
      request: function request() {
        var _this = this;
  
        var url;
        // var search =
        //   "&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
        // if (n === undefined) {
        //   url = "/uapbd/custbaseinfo/pageList?pn=1&ps=10&sortColumn=" + search;
        // } else {
        //   url = "/uapbd/custbaseinfo/pageList?pn=" + n + "&ps=" + s + search;
        // }
        // var baseUrl = '/yls-busi-web/';
        url = _publicData.ylsBusi + 'quote/scheme/page';
  
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "scheme_name"
          }],
          "pageNum": this.currentPage - 1,
          "pageSize": this.pageSize,
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
          _this.$refs["template-table"].setData("quoteScheme_t", JSON.parse(JSON.stringify(_this.originalValue)));
          _this.totalElements = res.data.data.totalElements; // 总条数
          // this.size = res.data.data.size; // 每页的条数
        })["catch"](function () {
          _this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      },
  
      // 高级搜索
      showSearch: function showSearch() {
        this.isHide = !this.isHide;
      },
      search: function search() {
        this.request();
      },
  
  
      // 跳转到添加产品方案
      addProductSolution: function addProductSolution() {
        location.hash = "/productsolution/add";
      },
      multiDeleteDialgShow: function multiDeleteDialgShow() {
        this.multiDelDialogVisible = true;
      },
      deleteClick: function deleteClick() {
        var _this2 = this;
  
        // var baseUrl = '/yls-busi-web/';
        var url = _publicData.ylsBusi + 'quote/scheme/deleteById';
        var delId = this.delId; //this.$refs["template-table"].comp.delId;
        console.log("delete" + delId);
        this.$http({
          url: url,
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          dataType: "json",
          data: delId
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
        })["catch"](function () {
          _this2.$message({
            message: "Network error",
            type: "error"
          });
        });
        this.delDialogVisible = false;
      },
      multiDeleteClick: function multiDeleteClick() {
        var tableSelections = this.$refs["template-table"].comp.$refs["product_solution_table"].getSelection();
        var delIds = [];
        if (tableSelections && tableSelections.length > 0) {
          for (var i = 0; i < tableSelections.length; i++) {
            var row = tableSelections[i];
            var id = row.pk_customer;
            delIds.push(id);
          }
        }
        console.log("multi" + delIds);
        this.delDialogVisible = false;
        return;
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">产品方案列表</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addProductSolution\">新增</el-button>\n      <el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"请选择编码/方案\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n\n  </div>\n\n  <!-- 主体区域 -->\n  <div class=\"list-main-container clearfix\">\n    <!--新模板组件:tplCode=\"tplCode\"-->\n    <ifbp-template ref=\"template-table\"\n                  tplId=\"product-table-template\"\n                  :pkTemp=\"productPk\"\n                  :tplData=\"productTableData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"productTableResetFun\"\n                  @selection-change=\"handleSelectionChange\"\n                  @edit-table-click=\"tableEditClick\"\n                  @delete-table-click=\"tableDeleteClick\">\n    </ifbp-template>\n    <!--分页组件-->\n    <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n        :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n    </el-pagination>\n  </div>\n  \n  <!--删除确认Dialog-->\n  <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n        <span>确认删除该数据？删除后无法恢复。</span>\n        <div slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteClick\">确 定</el-button>\n        </div>\n  </el-dialog>\n  <el-dialog\n      title=\"提示\"\n      v-model=\"multiDelDialogVisible\"\n      @update:visible=\"val => multiDelDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n        <span>确认删除所选数据？删除后无法恢复。</span>\n        <div slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"multiDelDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"multiDeleteClick\">确 定</el-button>\n        </div>\n  </el-dialog>\n  <!--数据加载过程中页面最上端显示的层-->\n  <!-- <div id=\"cover\" ref=\"cover\">\n    <div class=\"el-loading-spinner\">\n      <svg viewBox=\"25 25 50 50\" class=\"circular\">\n        <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"none\" class=\"path\"></circle>\n      </svg>\n    </div>\n  </div> -->\n</div>\n"
  

});
 
 define('yls^busi/quote/src/quote-detail.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        //固定写法
        scrollDom: document.getElementsByClassName('view')[0],
        //报价主键
        pk_calc: '',
        //删除对话框是否展示
        delDialogVisible: false,
        //删除标识，区分子表
        delType: '',
        //删除实体主键
        delId: '',
        // 报价主模板 baseTemplateRef start
        // pk_temp:'a57c6167-ee45-434a-bff1-ed127f18f5d3',
        funnode: "BT007",
        nexusKey: "CALC001",
        tplData: {},
        //是否编辑态
        editable: false,
        baseIcons: [{
          icon: 'edit',
          click: function click() {
            oThis.editable = !oThis.editable;
            //备份数据，取消时使用
            oThis.data = JSON.parse(JSON.stringify(oThis.$refs.baseTemplateRef.getData('QuoteCalculator')));
          }
        }],
        //控件绑定事件
        formResetFun: function formResetFun($node) {
          //投放金额
          var $loan_plan_cash = $node.find("el-number[v-model='QuoteCalculator.loan_plan_cash']");
          if ($loan_plan_cash.length) {
            // 添加绑定事件, 首付款绑定downPaymentChange
            $loan_plan_cash.attr("v-on:change", "loanPlanCashChange");
          }
  
          //首付款
          var $down_payment = $node.find("el-number[v-model='QuoteCalculator.down_payment']");
          if ($down_payment.length) {
            // 添加绑定事件, 首付款绑定downPaymentChange
            $down_payment.attr("v-on:change", "downPaymentChange");
          }
  
          //首付款比例
          var $down_payment_ratio = $node.find("el-percent[v-model='QuoteCalculator.down_payment_ratio']");
          if ($down_payment_ratio.length) {
            $down_payment_ratio.attr("v-on:change", "downPaymentRatioChange");
          }
  
          //保证金
          var $deposit_cash = $node.find("el-number[v-model='QuoteCalculator.deposit_cash']");
          if ($deposit_cash.length) {
            $deposit_cash.attr("v-on:change", "depositCashChange");
          }
          //保证金比例
          var $deposit_ratio = $node.find("el-percent[v-model='QuoteCalculator.deposit_ratio']");
          if ($deposit_ratio.length) {
            $deposit_ratio.attr("v-on:change", "depositRatioChange");
          }
  
          //手续费
          var $srvfee_cash_in = $node.find("el-number[v-model='QuoteCalculator.srvfee_cash_in']");
          if ($srvfee_cash_in.length) {
            $srvfee_cash_in.attr("v-on:change", "srvfeeCashInChange");
          }
          //手续费比例
          var $srvfee_ratio_in = $node.find("el-percent[v-model='QuoteCalculator.srvfee_ratio_in']");
          if ($srvfee_ratio_in.length) {
            $srvfee_ratio_in.attr("v-on:change", "srvfeeRatioInChange");
          }
        },
  
        //控件绑定事件实现
        formReSetMethods: {
  
          //投放金额
          loanPlanCashChange: function loanPlanCashChange(data) {
            if (data && data !== '') {
              var down_payment = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment;
              var down_payment_ratio = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment_ratio;
              if (down_payment && down_payment !== '') {
                //计算首付款比例
                down_payment_ratio = down_payment / data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment_ratio = down_payment_ratio;
              } else if (down_payment_ratio && down_payment_ratio !== '') {
                //计算首付款
                down_payment = down_payment_ratio * data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment = down_payment;
              }
  
              //保证金
              var deposit_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash;
              var deposit_ratio = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_ratio;
              if (deposit_cash && deposit_cash !== '') {
                deposit_ratio = deposit_cash / data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_ratio = deposit_ratio;
              } else if (deposit_ratio && deposit_ratio !== '') {
                deposit_cash = deposit_ratio * data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash = deposit_cash;
              }
  
              //手续费
              var srvfee_cash_in = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_cash_in;
              var srvfee_ratio_in = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_ratio_in;
              if (srvfee_cash_in && srvfee_cash_in !== '') {
                srvfee_ratio_in = srvfee_cash_in / data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_ratio_in = srvfee_ratio_in;
              } else if (srvfee_ratio_in && srvfee_ratio_in !== '') {
                srvfee_cash_in = srvfee_ratio_in * data;
                oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash = srvfee_cash_in;
              }
            }
          },
  
          //首付款失去焦点
          downPaymentChange: function downPaymentChange(data) {
            if (data && data !== '') {
              var loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
              var down_payment_ratio = data / loan_plan_cash;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment_ratio = down_payment_ratio;
            }
          },
  
          //首付款比例失去焦点
          downPaymentRatioChange: function downPaymentRatioChange(data) {
            if (data && data !== '') {
              var loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
              var down_payment = loan_plan_cash * data;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.down_payment = down_payment;
            }
          },
  
          //保证金金额
          depositCashChange: function depositCashChange(data) {
            if (data && data !== '') {
              var loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
              var deposit_ratio = data / loan_plan_cash;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_ratio = deposit_ratio;
            }
          },
  
          //保证金比例
          depositRatioChange: function depositRatioChange(data) {
            if (data && data !== '') {
              var loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
              var deposit_cash = data * loan_plan_cash;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.deposit_cash = deposit_cash;
            }
          },
  
          //服务费
          srvfeeCashInChange: function srvfeeCashInChange(data) {
            if (data && data !== '') {
              var loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
              var srvfee_ratio_in = data / loan_plan_cash;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_ratio_in = srvfee_ratio_in;
            }
          },
  
          //服务费比例
          srvfeeRatioInChange: function srvfeeRatioInChange(data) {
            if (data && data !== '') {
              var loan_plan_cash = oThis.$refs.baseTemplateRef.comp.QuoteCalculator.loan_plan_cash;
              var srvfee_cash_in = data * loan_plan_cash;
              oThis.$refs.baseTemplateRef.comp.QuoteCalculator.srvfee_cash_in = srvfee_cash_in;
            }
          }
        },
        // 报价主模板 baseTemplateRef end
  
        // 投放计划 loanPlanRef start
        // loanPlan_pk_temp:'cece85f5-6732-4c39-ba6a-0d4810ca03f8',
        loanPlan_funnode: "BT007",
        loanPlan_nexusKey: "CALC002",
        loanPlanData: {},
        loanPlanResetFun: function loanPlanResetFun($node) {
          var $table = $node.find("el-table");
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
  
        //投放计划添加
        loanPlanPlusIcons: [{
          icon: 'plus',
          click: function click() {
            // 关闭table中的编辑区
            oThis.$refs.loanPlanRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.loanPlanRef.resetFormData();
            // 显示新增区域
            oThis.$refs.loanPlanRef.formShow = true;
          }
        }],
        // 投放计划 loanPlanRef end
  
        // 规则设置 loanRuleRef start
        // loanRule_pk_temp:'c286e256-19e3-4bdf-83d2-7d0a4111f346',
        loanRule_funnode: "BT007",
        loanRule_nexusKey: "CALC003",
        loanRuleData: {},
        loanRuleResetFun: function loanRuleResetFun($node) {
          var $table = $node.find("el-table");
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
  
        //投放规则添加
        loanRulePlusIcons: [{
          icon: 'plus',
          click: function click() {
            // 关闭table中的编辑区
            oThis.$refs.loanRuleRef.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.loanRuleRef.resetFormData();
            // 显示新增区域
            oThis.$refs.loanRuleRef.formShow = true;
          }
        }],
        // 规则设置 loanRuleRef end
  
        // 租金计划表 inoutPlanRef start
        // inoutPlan_pk_temp:"ba531d61-3088-4abb-8531-ae6b165a3031",
        inoutPlan_funnode: "BT007",
        inoutPlan_nexusKey: "CALC004",
        inoutPlanData: {}
        // 租金计划表 inoutPlanRef end
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
  
      //测算
      onCalc: function onCalc() {
        var _this = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'quote/calc/calculateById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.pk_calc
        }).then(function (res) {
          debugger;
          //加载租金计划表
          _this.loadInoutPlan(_this.pk_calc);
        })["catch"](function (e) {
          _this.$message({
            message: '报价测算失败！',
            type: 'error'
          });
        });
      },
  
      // 报价主模板 baseTemplateRef 事件处理 start
      clickCancel: function clickCancel() {
        this.editable = false;
        //恢复修改前值
        // this.$refs.baseTemplateRef.setData('QuoteCalculator',this.data);
        this.$refs["baseTemplateRef"].setData('QuoteCalculator', this.data);
      },
      clickSave: function clickSave() {
        var _this2 = this;
  
        var data = this.$refs.baseTemplateRef.comp.QuoteCalculator;
        this.$http({
          url: _publicData.ylsBusi + 'quote/calc/save',
          // headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data: data
        }).then(function (res) {
          _this2.pk_calc = res.data.data.pk_quote_calculator;
          location.hash = '/quote/detail/' + _this2.pk_calc;
          _this2.editable = false;
          var originalValue = res.data.data;
          _this2.$refs["baseTemplateRef"].setData('QuoteCalculator', originalValue);
          //加载投放信息
          _this2.loadLoanPlan(_this2.pk_calc);
          //加载规则信息
          _this2.loadPlanRule(_this2.pk_calc);
        })["catch"](function (e) {
          _this2.$message({
            message: '报价保存失败！',
            type: 'error'
          });
        });
      },
  
      // 报价主模板 baseTemplateRef 事件处理 end
  
      // 投放计划 loanPlanRef 事件处理 start
      loanPlanFormConfirm: function loanPlanFormConfirm() {
        var _this3 = this;
  
        if (this.pk_calc && this.pk_calc !== '') {
          var data = this.$refs.loanPlanRef.comp.QuoteLoanPlan;
          var jsonData = JSON.parse(JSON.stringify(data));
          jsonData.pk_quote_calculator = this.pk_calc;
          this.$http({
            url: _publicData.ylsBusi + 'quote/loanPlan/save',
            // headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data: jsonData
          }).then(function (res) {
            if (res.data.success === true) {
              _this3.$message({
                message: '保存成功！',
                type: 'success'
              });
              _this3.$refs.loanPlanRef.comp.formShow = false;
              _this3.loadLoanPlan(_this3.pk_calc);
            } else {
              _this3.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          })["catch"](function (e) {
            _this3.$message({
              message: '投放计划保存失败！',
              type: 'error'
            });
          });
        } else {
          this.$message({
            message: '请先保存报价信息!',
            type: 'error'
          });
        }
      },
      loanPlanFormCancel: function loanPlanFormCancel(type) {
        this.$refs.loanPlanRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.loanPlanRef.formShow = false;
        } else {
          this.$refs.loanPlanRef.getTableComp().closeExpandRow();
          var loanPlanTable = this.$refs.loanPlanRef.getData('QuoteLoanPlan_t');
          loanPlanTable[this.baseEditIndex] = this.baseData;
          this.$refs.loanPlanRef.setData('QuoteLoanPlan_t', loanPlanTable);
        }
      },
      loanPlanEditTableRow: function loanPlanEditTableRow(scope) {
        this.$refs.loanPlanRef.getTableComp().expandRow(scope.row);
        this.$refs.loanPlanRef.comp.formShow = false;
        this.$refs.loanPlanRef.setData('QuoteLoanPlan', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      loanPlanDeleteTableRow: function loanPlanDeleteTableRow(scope) {
        this.delType = 'loanPlan';
        this.delDialogVisible = true;
        this.delId = scope.row.pk_quote_loan_plan;
      },
  
      // 投放计划 loanPlanRef 事件处理 end
  
      // 规则设置 loanRuleRef 事件处理 start
      loanRuleFormConfirm: function loanRuleFormConfirm() {
        var _this4 = this;
  
        if (this.pk_calc && this.pk_calc !== '') {
          var data = this.$refs.loanRuleRef.comp.QuoteRule;
          var jsonData = JSON.parse(JSON.stringify(data));
          jsonData.pk_quote_calculator = this.pk_calc;
          this.$http({
            url: _publicData.ylsBusi + 'quote/rule/save',
            method: 'post',
            data: jsonData
          }).then(function (res) {
            if (res.data.success === true) {
              _this4.$message({
                message: '保存成功！',
                type: 'success'
              });
              _this4.$refs.loanRuleRef.comp.formShow = false;
              _this4.loadPlanRule(_this4.pk_calc);
            } else {
              _this4.$message({
                message: res.data.error.errorMessage,
                type: "error"
              });
            }
          })["catch"](function (e) {
            _this4.$message({
              message: '投放规则保存失败！',
              type: 'error'
            });
          });
        } else {
          this.$message({
            message: '请先保存报价信息!',
            type: 'error'
          });
        }
      },
      loanRuleFormCancel: function loanRuleFormCancel(type) {
        this.$refs.loanRuleRef.getTableComp().closeExpandRow();
        if (type === 'form') {
          this.$refs.loanRuleRef.formShow = false;
        } else {
          this.$refs.loanRuleRef.getTableComp().closeExpandRow();
          var loanRuleTable = this.$refs.loanRuleRef.getData('QuoteRule_t');
          loanRuleTable[this.baseEditIndex] = this.baseData;
          this.$refs.loanRuleRef.setData('QuoteRule_t', loanRuleTable);
        }
      },
      loanRuleEditTableRow: function loanRuleEditTableRow(scope) {
        this.$refs.loanRuleRef.getTableComp().expandRow(scope.row);
        this.$refs.loanRuleRef.comp.formShow = false;
        this.$refs.loanRuleRef.setData('QuoteRule', scope.row);
  
        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      loanRuleDeleteTableRow: function loanRuleDeleteTableRow(scope) {
        this.delType = 'loanRule';
        this.delDialogVisible = true;
        this.delId = scope.row.pk_quote_rule;
      },
  
      // 规则设置 loanRuleRef 事件处理 end
  
      //加载数据方法
      loadData: function loadData() {
        this.pk_calc = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if (this.pk_calc && this.pk_calc !== '') {
          //加载报价信息
          this.loadQuoteCalc(this.pk_calc);
          //加载投放信息
          this.loadLoanPlan(this.pk_calc);
          // //加载规则信息
          this.loadPlanRule(this.pk_calc);
          //加载租金计划表
          this.loadInoutPlan(this.pk_calc);
        } else {
          this.editable = true;
        }
      },
  
      //加载报价信息
      loadQuoteCalc: function loadQuoteCalc(pk_calc) {
        var _this5 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'quote/calc/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_calc
        }).then(function (res) {
          var originalValue = res.data.data;
          _this5.$refs['baseTemplateRef'].setData('QuoteCalculator', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this5.$message({
            message: '报价详情获取失败',
            type: 'error'
          });
        });
      },
  
      //加载投放信息
      loadLoanPlan: function loadLoanPlan(pk_calc) {
        var _this6 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'quote/loanPlan/getByCalcId ',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_calc
        }).then(function (res) {
          var originalValue = res.data.data;
          _this6.$refs['loanPlanRef'].setData('QuoteLoanPlan_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this6.$message({
            message: ' 投放计划获取失败',
            type: 'error'
          });
        });
      },
  
      //加载规则信息
      loadPlanRule: function loadPlanRule(pk_calc) {
        var _this7 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'quote/rule/getByCalcId',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_calc
        }).then(function (res) {
          var originalValue = res.data.data;
          _this7.$refs['loanRuleRef'].setData('QuoteRule_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this7.$message({
            message: '投放规则获取失败',
            type: 'error'
          });
        });
      },
  
      //加载租金计划表
      loadInoutPlan: function loadInoutPlan(pk_calc) {
        var _this8 = this;
  
        this.$http({
          url: _publicData.ylsBusi + 'quote/inoutPlan/getByCalcId ',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: pk_calc
        }).then(function (res) {
          var originalValue = res.data.data;
          _this8.$refs['inoutPlanRef'].setData('QuoteInoutPlan_t', JSON.parse(JSON.stringify(originalValue)));
        })["catch"](function (e) {
          _this8.$message({
            message: '租金计划表获取失败',
            type: 'error'
          });
        });
      },
  
  
      //删除确定按钮
      deleteConfirmClick: function deleteConfirmClick() {
        var _this9 = this;
  
        var requestUrl = '';
        if (this.delType === 'loanRule') {
          requestUrl = _publicData.ylsBusi + 'quote/rule/deleteById';
        } else if (this.delType === 'loanPlan') {
          requestUrl = _publicData.ylsBusi + 'quote/loanPlan/deleteById';
        }
        if (requestUrl !== '') {
          this.$http({
            url: requestUrl,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: this.delId
          }).then(function (res) {
            if (res.data.success === true) {
              _this9.$message({
                message: '删除成功',
                type: 'success'
              });
              _this9.delDialogVisible = false;
              //刷新列表
              if (_this9.delType === 'loanRule') {
                _this9.loadPlanRule(_this9.pk_calc);
              } else if (_this9.delType === 'loanPlan') {
                _this9.loadLoanPlan(_this9.pk_calc);
              }
            } else {
              _this9.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          })["catch"](function (e) {
            _this9.$message({
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
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">报价测算</h2>\n  </div>\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n    <ifbp-panel-group :navbar=\"true\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n      <div class=\"detail-button-header\">\n        <el-button class=\"fr\" type=\"primary\" @click=\"goBack\" >返回</el-button>\n        <el-button class=\"fr\" type=\"primary\" @click=\"onCalc\" style=\"margin-right:10px\" v-show=\"true\">测算</el-button>\n      </div>\n      <!-- 报价主模板 temp start-->\n      <ifbp-panel id=\"basePanel\" title=\"报价信息\" :icons=\"baseIcons\">\n        <ifbp-template ref=\"baseTemplateRef\"\n                  tplId=\"baseTemplate\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  :methods=\"formReSetMethods\"\n                  :tpl-reset-fun=\"formResetFun\"\n                  show-type=\"form\"\n                  :tplData=\"tplData\"\n                  :editable=\"editable\">\n        </ifbp-template>\n        <div class=\"form-button-div\" v-if=\"editable\">\n          <el-button type=\"default\" class=\"button-no-radius\" @click=\"clickCancel\">取消</el-button>\n          <el-button type=\"primary\" class=\"button-no-radius\" @click=\"clickSave\">保存</el-button>\n        </div>\n      </ifbp-panel>\n      <!-- 报价主模板 temp end-->\n\n      <!-- 投放计划 temp start-->\n        <ifbp-panel id=\"loanPlanPanel\" title=\"投放计划\" :icons=\"loanPlanPlusIcons\">\n        <ifbp-template ref=\"loanPlanRef\"\n                      tplId=\"linkmanTemplate\"\n                      :funnode=\"loanPlan_funnode\"\n                      :nexuskey=\"loanPlan_nexusKey\"\n                      :tplData=\"loanPlanData\"\n                      :tplResetFun=\"loanPlanResetFun\"\n                      @form-confirm-click=\"loanPlanFormConfirm\"\n                      @form-cancel-click=\"loanPlanFormCancel\"\n                      @edit-table-click=\"loanPlanEditTableRow\"\n                      @delete-table-click=\"loanPlanDeleteTableRow\"\n                      show-type=\"table-form\"\n                      >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 投放计划 temp end-->\n\n      <!-- 规则设置 temp start-->\n      <ifbp-panel id=\"loanRulePanel\" title=\"投放规则\" :icons=\"loanRulePlusIcons\">\n        <ifbp-template ref=\"loanRuleRef\"\n                      tplId=\"loanRuleTemplate\"\n                      :funnode=\"loanRule_funnode\"\n                      :nexuskey=\"loanRule_nexusKey\"\n                      :tplData=\"loanRuleData\"\n                      :tplResetFun=\"loanRuleResetFun\"\n                      @form-confirm-click=\"loanRuleFormConfirm\"\n                      @form-cancel-click=\"loanRuleFormCancel\"\n                      @edit-table-click=\"loanRuleEditTableRow\"\n                      @delete-table-click=\"loanRuleDeleteTableRow\"\n                      show-type=\"table-form\"\n                     >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 规则设置 temp end-->\n\n      <!-- 租金计划表 temp start-->\n      <ifbp-panel id=\"inoutPlanPanel\" title=\"租金计划表\">\n        <ifbp-template ref=\"inoutPlanRef\"\n                      tplId=\"inoutPlanTemplate\"\n                      :funnode=\"inoutPlan_funnode\"\n                      :nexuskey=\"inoutPlan_nexusKey\"\n                      :tplData=\"inoutPlanData\"\n                      show-type=\"table\"\n                     >\n        </ifbp-template>\n      </ifbp-panel>\n      <!-- 租金计划表 temp end-->\n    </ifbp-panel-group>\n  </div>\n\n  <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n\n</div>\n"
  

});
 
 define('yls^busi/quote/src/quote-list.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
      mixins: [(0, _publicData.pagination)('request')],
      data: function data() {
          return {
              //模版主键
              // pk_temp:'a57c6167-ee45-434a-bff1-ed127f18f5d3',
              funnode: "BT007",
              nexusKey: "CALC001",
              quoteListData: {},
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
                  var $table = $node.find("el-table");
                  // let $table = this.getNodeById($node, 'mp8586otvv');
                  //定义操作
                  var operateArr = [{
                      icon: 'search',
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
          this.request();
      },
  
      methods: {
          // 高级搜索
          showSearch: function showSearch() {
              this.isHide = !this.isHide;
          },
  
          // 添加按钮
          addInterrateInfo: function addInterrateInfo() {
              location.hash = '/quote/add';
          },
  
          //快捷搜索
          searchInputEnterClick: function searchInputEnterClick() {
              this.$message('搜索：' + this.search_input);
          },
  
          //查看按钮
          tableSearchClick: function tableSearchClick(scope) {
              location.hash = '/quote/detail/' + scope.row.pk_quote_calculator;
          },
  
          //删除操作
          tableDeleteClick: function tableDeleteClick(scope) {
              this.delId = scope.row.pk_quote_calculator;
              this.delDialogVisible = true;
          },
  
          //删除确定
          deleteConfirmClick: function deleteConfirmClick() {
              var _this = this;
  
              this.$http({
                  url: _publicData.ylsBusi + 'quote/calc/deleteById',
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
                      _this.request();
                  } else {
                      debugger;
                      _this.$message({
                          message: res.data.error.errorMessage,
                          type: "error"
                      });
                  }
                  _this.delDialogVisible = false;
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
                  "orderList": [{
                      "direction": "desc",
                      "property": "ts"
                  }],
                  "pageNum": this.currentPage - 1,
                  "pageSize": this.pageSize,
                  "searchParams": {
                      "searchMap": {}
                  }
              };
              this.$http({
                  url: _publicData.ylsBusi + 'quote/calc/page',
                  headers: { 'Content-Type': 'application/json' },
                  method: 'post',
                  data: data,
                  dataType: 'json'
              }).then(function (res) {
                  //QuoteCalculator_table UI模板表格名称
                  var originalValue = res.data.data.content;
                  _this2.$refs['quoteList-table'].setData('QuoteCalculator_table', originalValue);
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
  //
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
  __vue__options__.template = "\n<div class=\"main-panel\">\n  <!--节点title-->\n  <div class=\"title-container\">\n    <h2 class=\"name\">报价测算</h2>\n  </div>\n  <!--按钮区域-->\n  <div class=\"operator-container\">\n    <div class=\"fl\">\n      <el-button type=\"primary\" class=\"button-no-radius\" @click=\"addInterrateInfo\">新增</el-button>\n      <!--<el-button class=\"button-no-radius\" @click=\"multiDeleteDialgShow\" v-show=\"showDeleteButton\">删除</el-button>-->\n    </div>\n    <div class=\"fr\">\n      <el-input placeholder=\"测算编码/名称\" v-model=\"search_input\" icon=\"search\"  @keyup.enter.native=\"searchInputEnterClick\" :on-icon-click=\"searchInputEnterClick\"></el-input>\n      <el-button type=\"text\" @click=\"showSearch\">\n        高级\n        <i class=\"el-icon-arrow-down\" v-if=\"this.isHide\"></i>\n        <i class=\"el-icon-arrow-up\" v-if=\"!this.isHide\"></i>\n      </el-button>\n    </div>\n  </div>\n\n  <!--高级搜索区域-->\n  <div class=\"advanced-search-panel\" :class=\"{hide: isHide}\">\n  \n  </div>\n\n  <!-- 报价列表 -->\n <div id=\"quoteList\" class=\"list-main-container clearfix\">\n    <!--模板组件-->\n   <ifbp-template ref=\"quoteList-table\"\n                  tplId=\"quoteList-template\"\n                  :funnode=\"funnode\"\n                  :nexuskey=\"nexusKey\"\n                  :tplData=\"quoteListData\"\n                  show-type=\"table\"\n                  :tplResetFun=\"templateTableFormResetFun\"\n                  @search-table-click=\"tableSearchClick\"\n                  @delete-table-click=\"tableDeleteClick\" >\n    </ifbp-template>\n      <!--分页组件-->\n      <el-pagination @size-change=\"handleSizeChange\" @current-change=\"handleCurrentChange\" :current-page=\"currentPage\" :page-sizes=\"pageSizes\"\n          :page-size=\"pageSize\" layout=\"total, sizes, prev, pager, next, jumper\" :total=\"totalElements\">\n      </el-pagination>\n\n    <!--删除确认Dialog-->\n    <el-dialog\n      title=\"提示\"\n      v-model=\"delDialogVisible\"\n      @update:visible=\"val => delDialogVisible = val\"\n      :modal=\"true\"\n      size=\"tiny\">\n      <span>确认删除该数据？</span>\n      <span slot=\"footer\" class=\"dialog-footer\">\n          <el-button @click=\"delDialogVisible = false\">取 消</el-button>\n          <el-button type=\"primary\" @click=\"deleteConfirmClick\">确 定</el-button>\n      </span>\n     </el-dialog>\n  </div>\n</div>\n"
  

});
 
 define('yls^busi/quote/src/quote-scheme-ref.vue', function(require, exports, module) {

  'use strict';
  
  exports.__esModule = true;
  
  var _publicData = require('yls^/src/apps/common/js/publicData');
  
  exports["default"] = {
    data: function data() {
      var oThis = this;
      return {
        scrollDom: document.getElementsByClassName('view')[0],
        refcode: "bdcurrType_ref",
        field: "pk_quote_scheme",
        isEdit: true,
        refTemplateValue: {},
        templist: [], // 存模板数据
        editable: true,
        tplData: {
          baseData: {},
          loanPlanData: {},
          rulePlanData: {},
          inoutPlanData: {}
        },
        plusIcons: {
          basePlusIcons: [{
            icon: 'edit',
            click: function click() {
              debugger;
              oThis.$refs.baseRef;
              oThis.editable = !oThis.editable;
              oThis.data = JSON.parse(JSON.stringify(oThis.$refs.baseRef.getData('QuoteCalculator')));
            }
          }],
          loanPlanPlusIcons: [{
            icon: 'plus',
            click: function click() {}
          }],
          rulePlanPlusIcons: [{
            icon: 'plus',
            click: function click() {}
          }],
          inoutPlanPlusIcons: [{
            icon: 'plus',
            click: function click() {}
          }]
  
        }
      };
    },
  
    methods: {
      //参照更改事件
      onChange: function onChange(type, data) {
        var _this = this;
  
        // let pk_quote_scheme = data.value[0].id;
        //测试使用
        var pk_quote_scheme = 'OID10000001hovd';
        debugger;
        //请求方案信息
        this.$http({
          url: _publicData.ylsBusi + "quote/scheme/getById",
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: pk_quote_scheme
        }).then(function (res) {
          if (res.data.success === true) {
            debugger;
            var originalValue = res.data.data;
            if (Object.prototype.toString.call(originalValue.templist) === '[object Array]' && originalValue.templist.length > 0) {
              _this.templist = JSON.parse(JSON.stringify(originalValue.templist));
            }
          } else {
            _this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })["catch"](function (e) {
          _this.$message({
            message: "报价方案加载失败",
            type: "error"
          });
        });
      },
  
      //参照重置事件
      onReset: function onReset() {
        debugger;
        this.templist = [];
        this.$message({
          message: "清空",
          type: "error"
        });
      },
  
      //按钮注册
      tplResetFun: function tplResetFun(temp_type) {},
  
      //表单确认
      formConfirm: function formConfirm(temp_type) {},
  
      //表单取消
      formCancel: function formCancel(temp_type) {},
  
      //编辑行
      editTableRow: function editTableRow(temp_type) {},
  
      //删除行
      deleteTableRow: function deleteTableRow(temp_type) {}
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
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "\n<div class=\"main-panel\">\n    <!--节点title-->\n  <!-- <div class=\"title-container\">\n    <h2 class=\"name\">产品方案选择</h2>\n  </div> -->\n  <!-- 主体区域 -->\n  <div class=\"detail-main-container clearfix\">\n      <ifbp-panel-group :navbar=\"false\" :base-scroll-top=\"50\" :scroll-dom=\"scrollDom\" :base-nav-bar-top=\"125\"> \n          <div class=\"detail-button-header\">\n                <!-- <h3>产品方案选择</h3> -->\n                <el-ref :ref-code='refcode'\n                  :field=\"field\"\n                  :template-value='refTemplateValue'\n                  :is-edit='isEdit'\n                  @trigger='onChange'\n                  @reset='onReset'\n                  style=\"width:300px\"\n                  >\n                </el-ref>\n          </div>\n          <ifbp-panel :id=\"'productPreviewDetail'+index\" :title=\"item.temp_title\" v-for=\"(item, index) in templist\" :icons=\"plusIcons[item.temp_type+'PlusIcons']\" :key=\"item.temp_id\">\n              <ifbp-template :ref=\"item.temp_type+'Ref'\"\n                      :tplId=\"item.temp_id\"\n                      :pkTemp=\"item.temp_id\"\n                      :tplData=\"tplData[item.temp_type+'Data']\"\n                      :tplResetFun=\"function($node){tplResetFun($node, item.temp_type)}\"\n                      @form-confirm-click=\"formConfirm(item.temp_type)\"\n                      @form-cancel-click=\"formCancel(item.temp_type)\"\n                      @edit-table-click=\"editTableRow(item.temp_type)\"\n                      @delete-table-click=\"deleteTableRow(item.temp_type)\"\n                      :editable='editable'\n                      >\n              </ifbp-template>\n          </ifbp-panel>\n      </ifbp-panel-group>\n  </div>\n</div>\n"
  

});

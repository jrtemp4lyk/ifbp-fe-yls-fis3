<template>
  <div class="main-panel" id="product-detail">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">产品方案设计</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <div class="header-panel">
        <el-button class="fr" type="primary" @click="goBack">返 回</el-button>
      </div>
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <ifbp-panel id="productInfo" title="方案信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                         tplId="baseTemplate"
                         :pkTemp="productPk"
                         show-type="form"
                         :tplData="productData"
                         @after-create="afterCreateFun"
                         :editable="productEdit">
          </ifbp-template>
          <div class="form-button-div" v-if="productEdit">
            <el-button type="default" class="button-no-radius" @click="productInfoCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="productInfoConfirm">保存</el-button>
          </div>
        </ifbp-panel>

          <ifbp-panel id="productPreview" title="方案展示" :icons="addIcons" v-if="!!pk_quote_scheme">
            <ifbp-panel :id="'productPreviewDetail'+index" :title="item.temp_title"  v-for="(item, index) in templist" :key="item.temp_id">
                <div class="template-title">
                  <i class="el-icon-menu fr" title="设计模板" @click="openDesiginerPage(item.temp_id)"></i>
                  <i class="el-icon-delete fr" title="删除模板" @click="showDeleteDesiginerDialog(item, index)"></i>
                </div>
                <ifbp-template
                  :pkTemp="item.temp_id"
                  :tplId="item.temp_id"
                  :editable="true">
                </ifbp-template>
            </ifbp-panel>
          </ifbp-panel>

        <!-- <ifbp-panel id="productPreview" title="方案展示" :icons="addIcons" v-if="!!pk_quote_scheme">
          <div class="template-container" v-for="(item, index) in templist" :key="item.temp_id">
            <div class="template-title">
              <span>{{item.temp_title}}</span>
              <i class="el-icon-menu" title="设计模板" @click="openDesiginerPage(item.temp_id)"></i>
              <i class="el-icon-delete" title="删除模板" @click="showDeleteDesiginerDialog(item, index)"></i>
            </div>
            <ifbp-template
              :pkTemp="item.temp_id"
              :tplId="item.temp_id"
              :editable="true">
            </ifbp-template>
          </div>
        </ifbp-panel> -->
      </ifbp-panel-group>
    </div>

    <!-- 新增UI模板的 form 弹框 -->
    <el-dialog title="创建UI模板" :modal="false" v-model="dialogFormVisiable">
      <el-form :model="metadataFormData" label-width="100px" ref="editForm">
        <el-form-item label="模板名称:"
                      prop="name"
                      :rules="[{ required: true, message: '模板名称不能为空'}]">
          <el-input v-model="metadataFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="元数据:"
                      prop="pkClass"
                      :rules="[{ required: true, message: '元数据不能为空'}]">
          <el-select @change="refChangFun" v-model="metadataFormData.pkClass">
            <el-option
              v-for="item in metadataOptions"
              :key="item.id"
              :label="item.value"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFormDialog">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js'
export default {
  // components: {
  //   'ifbp-template': template,
  // },
  data() {
    var oThis = this;
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      pk_quote_scheme: '',
      templist: [], // 存模板数据
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.productEdit = !oThis.productEdit;
            oThis.baseFormData = JSON.parse(JSON.stringify(oThis.$refs.baseTemplateRef.getData("quoteScheme")));
          }
        }
      ],
      addIcons: [
        {
          icon: "plus",
          click: function() {
            oThis.dialogFormVisiable = true;
            oThis.resetFormDialog();
          }
        }
      ],
      metadataOptions: [
        {
          id:"2889d7d2-b6e1-4953-a8f8-d259a34d4d2a",
          pid:"0274c39c-4658-4802-a96f-6b40feba2842",
          value:"报价测算表",
          type: "base",
        },
        {
          id:"281d0c07-2e08-459d-84dd-1e786b10bc80",
          pid:"0274c39c-4658-4802-a96f-6b40feba2842",
          value:"测算投放计划",
          type: "loanPlan",
        },
        {
          id:"cefe8a9f-79fc-4664-859a-565a5f006b34",
          pid:"0274c39c-4658-4802-a96f-6b40feba2842",
          value:"测算规则设置",
          type: "rulePlan",
        },
        {
          id:"58d9f826-8918-4d71-814f-a71ba8f54d1e",
          pid:"0274c39c-4658-4802-a96f-6b40feba2842",
          value:"测算收支计划",
          type: "inoutPlan",
        }
      ],
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
        name: "",
      },
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
  created() {
    this.request();
    var oThis = this;
    try {
      if(typeof window.designerCB !== "function") {
        // 设计器页面点击保存时执行的回调参数
        window.designerCB = function(pk_temp) {
          // oThis.requestProductInfo();
          if(pk_temp) {
            var currentIndex = -1; // pk_temp在templist数组中的index值
            var changedTempObj = null; // pk_temp对应的templist数组项
            oThis.templist.forEach((item, index) => {
              if(item.temp_id === pk_temp) {
                currentIndex = index;
                changedTempObj = item;
              }
            });

            if(changedTempObj && currentIndex > -1) {
              oThis.templist.splice(currentIndex, 1);
              // 先把修改的UI模板从数组中，先删除延迟200ms再添加，以触发页面重新渲染
              setTimeout(() => {
                oThis.templist.splice((currentIndex === 0 ? currentIndex : currentIndex - 1), 0, changedTempObj);
              }, 200);
            }
          } else {
            var arrTemplist = JSON.parse(JSON.stringify(oThis.templist));
            oThis.templist = [];
            // 先把UI模板数组先清空延迟200ms再赋值，以触发页面重新渲染
            setTimeout(() => {
              oThis.templist = arrTemplist;
            }, 200);
          }
        }
      }
    } catch(e) {
      console.log(e);
    }
  },
  methods: {
    afterCreateFun() {
      this.$nextTick(() => {
        this.baseFormData = JSON.parse(JSON.stringify(this.$refs.baseTemplateRef.getData("quoteScheme")));
      });
    },
    request() {
      this.pk_quote_scheme = this.$root.$router.currentRoute.params.id;
      // 请求客户基本信息详情
      if(this.pk_quote_scheme){
        this.requestProductInfo();
      } else if(this.$root.$router.currentRoute.fullPath.indexOf('/add') > -1) {
        this.productEdit = true;
      }
    },
    // 请求产品方案信息详情
    requestProductInfo() {
      // var baseUrl = "/yls-busi-web/";
      this.$http({
         url: ylsBusi + "quote/scheme/getById",
         headers: {'Content-Type': 'application/json'},
         method: "post",
         data: this.pk_quote_scheme,
      })
      .then(res => {
        if (res.data.success === true) {
          var originalValue = res.data.data;
          console.log(this.$refs.baseTemplateRef);
          // this.$set(this.productData, 'quoteScheme', JSON.parse(JSON.stringify(originalValue)));
          this.$refs.baseTemplateRef.setData(
            "quoteScheme",
            JSON.parse(JSON.stringify(originalValue))
          );
          if(Object.prototype.toString.call(originalValue.templist) === '[object Array]' && originalValue.templist.length > 0) {
            this.templist = JSON.parse(JSON.stringify(originalValue.templist));
          }
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      })
      .catch(e => {
        console.error(e);
        this.$message({
          message: "产品方案信息详情获取失败",
          type: "error"
        });
      });
    },
    // 点击取消按钮
    productInfoCancel() {
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
        this.$refs.baseTemplateRef.setData(
          "quoteScheme",
          JSON.parse(JSON.stringify(this.baseFormData))
        );
    },
    // 点击保存按钮
    productInfoConfirm() {
      var url;
      var data = this.$refs.baseTemplateRef.getData("quoteScheme");
      data.templist = this.templist;
      console.log(data);
      var baseUrl = ylsBusi;
      if(this.pk_quote_scheme){
         url = baseUrl+'quote/scheme/update';
      }else{
        url = baseUrl+'quote/scheme/create';
      }
      this.$refs.baseTemplateRef.comp.$refs["quote_scheme_form"].validate(valid => {
        if (valid) {
          this.$http({
            url: url,
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: "产品方案数据保存成功",
                  type: "success"
                });
                this.originalValue = res.data.data;
                this.$refs.baseTemplateRef.setData(
                  "quoteScheme",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                this.productEdit = false;
                // 如果为新增，则跳转到详情页面
                if(this.originalValue.pk_quote_scheme && !this.pk_quote_scheme) {
                  this.$router.replace('/productsolution/detail/' + this.originalValue.pk_quote_scheme);
                  this.pk_quote_scheme = this.originalValue.pk_quote_scheme;
                }
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "产品方案数据保存失败",
                type: "error"
              });
            });
        }
      });
    },
    goBack() {
      this.$router.back();
    },
    refChangFun(id){
      for(let i = 0; i < this.metadataOptions.length; i++) {
        if(this.metadataOptions[i].id === id) {
          this.metadataFormData.pkMetadata = this.metadataOptions[i].pid;
          this.metadataFormData.pkClass = this.metadataOptions[i].id;
          this.metadataFormData.sysflag = "Y";
          this.metadataFormData.type = this.metadataOptions[i].type;
          // this.metadataFormData.name = this.metadataOptions[i].value;
        }
      }
    },
    resetFormDialog() {
      Object.keys(this.metadataFormData).forEach((key) => {
        this.metadataFormData[key] = '';
      });
      if(this.$refs.editForm) {
        this.$refs.editForm.resetFields();
      }
    },
    cancelFormDialog() {
      this.dialogFormVisiable = false;
    },
    // 点击新建UI模板弹框的确认按钮，创建UI模板
    confirm() {
      var oThis = this;
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          var formData = "data=" + JSON.stringify({form: this.metadataFormData}) + 
                         "&pkMetadata=" + this.metadataFormData.pkMetadata +
                         "&pk_temp=";
          this.$http({
            url: "/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/saveTemplate",
            method: 'post',
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            data: formData,
          }).then((res) => {
            if(res.data.form) {
              this.dialogFormVisiable = false;
              var data = res.data.form;
              var pkTemplateObj = {
                temp_id: data.pk_temp, // 模板pk_temp
                temp_title: data.name, // 模板名称
                temp_type: this.metadataFormData.type, // 模板类型
                pk_quote_scheme: this.pk_quote_scheme || '' // 主表id
              };
              this.saveTemplate(pkTemplateObj).then(() => {
                var pk_temp = data ? data.pk_temp : '';
                this.openDesiginerPage(pk_temp);
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          }).catch((e) => {
            this.$message({
              message: "创建UI模板出错",
              type: "error"
            });
          });
          this.dialogFormVisiable = false;
        }
      });
    },
    // 将模板数据关联到该方案中
    saveTemplate(data) {
      // var baseUrl = '/yls-busi-web/';
      var url = ylsBusi + "quote/scheme/temp/create";
      debugger;
      return this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        data: JSON.parse(JSON.stringify(data))
      })
        .then(res => {
            if (res.data.success === true) {
              var pkTemplateObj = JSON.parse(JSON.stringify(data));
              // 添加取子表的pk_quote_scheme_temp
              pkTemplateObj.pk_quote_scheme_temp = res.data.data.pk_quote_scheme_temp;
              this.templist.push(pkTemplateObj);
              this.$message({
                message: "产品方案模板数据保存成功",
                type: "success"
              });
            }
        })
        .catch(e => {
          console.log("产品方案模板数据保存出错", e);
          this.$message({
            message: "产品方案模板数据保存出错",
            type: "error"
          });
        });
    },
    openDesiginerPage(pk) {
      var baseUrl = location.protocol + "//" + location.host+ "/uitemplate_web/index.html?pk_temp=";
      // 打开新窗口根据 pk_temp 进入设计器页面
      window.open(baseUrl + pk);
    },
    showDeleteDesiginerDialog(data, index) {
      this.$confirm('确定从该方案中删除此关联模板吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteQuoteSchemeComp(data, index).then(() => {
            // 从该方案中删除此模板pk后，再根据pk从模板库中删除
            this.deleteTemplateData(data);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    // 从该方案中删除此模板pk后
    deleteQuoteSchemeComp(data, index) {
      var baseUrl = '/yls-busi-web/';
      var url = baseUrl + "quote/scheme/temp/deleteById";
      return this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        data: data.pk_quote_scheme_temp
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "方案模板：" + data.temp_title + "从该方案中删除成功",
              type: "success"
            });
            this.templist.splice(index, 1);
          }
        })
        .catch(e => {
          console.log("方案模板：" + data.temp_title + "从该方案中删除出错", e);
          this.$message({
            message: "方案模板：" + data.temp_title + "从该方案中删除出错",
            type: "error"
          });
        });
    },
    // 根据pk从模板库中删除模板
    deleteTemplateData(data) {
      var url = "/uitemplate_web/uitemplate_ctr/uitemplate_design_ctr/deleteTemplate";
      this.$http({
        url: url,
        contentType: 'application/x-www-form-urlencoded',
        method: "post",
        data: "data=" + JSON.stringify({form: {id: data.temp_id}})
      })
        .then(res => {
          if (res.data.status === 1) {
            this.$message({
              message: '方案模板：' + data.temp_title + "从UI模板库中删除成功",
              type: "success"
            });
          }
        })
        .catch(e => {
          console.log("模板" + data.temp_title + "从UI模板库中删除出错", e);
          this.$message({
            message: "模板" + data.temp_title + "从UI模板库中删除出错",
            type: "error"
          });
        });
    }
  }
}
</script>
<style>
#product-detail .ifbp-panel {
  position: relative;
}
.main-panel .header-panel {
  width: calc(100% - 174px);
  padding: 5px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 6px;
  overflow: hidden;
}

#productPreview .template-title {
  position: absolute;
  right: 35px;
  top: 20px;
}
#productPreview .template-title i {
  cursor: pointer;
  font-size: 13px;
  margin-left: 5px;
}
#productPreview .yon-uitemplate {
  margin: 0 10px;
}
</style>

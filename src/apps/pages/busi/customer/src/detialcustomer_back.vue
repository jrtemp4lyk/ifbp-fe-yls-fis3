<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">客户管理</h2>
    </div>
    <!-- 主体区域(详情页结构) -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <!--客户基本信息模块界面-->
        <ifbp-panel id="basePanel" title="客户基本信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :pkTemp="customerPk"
                    show-type="form"
                    :tplData="customerData"
                    :editable="customerEdit">
          </ifbp-template>
            <ifbp-template ref="baseTemplateRef1"
                    tplId="baseTemplate1"
                    pkTemp='ff13095f-7842-4c1c-9e3f-71ccda9f5ce4'
                    show-type="form"
                    :tplData="customerData1"
                    :editable="customerEdit">
           </ifbp-template>
          <div class="form-button-div" v-if="customerEdit">
            <el-button type="default" class="button-no-radius" @click="customerCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="customerConfirm">保存</el-button>
          </div>
        </ifbp-panel>
        <!--联系人模块界面-->
        <!--icons="linkmanIcons"新增按钮定义 -->
        <ifbp-panel id="linkmanPanel" title="联系人信息" :icons="linkmanIcons">
          <ifbp-template ref="custlinkmanRef"
                        tplId="linkmanTemplate"
                        :pkTemp="custlinkmanPk"
                        :tplData="custlinkmanData"
                        :tplResetFun="linkmanResetFun"
                        :tplMethods="custlinkmanTplMethods"
                        @form-confirm-click="linkmanFormConfirm"
                        @form-cancel-click="linkmanFormCancel"
                        show-type="table-form"
                        @edit-table-click="linkmanFormedit"
                        @delete-table-click="linkmanFormdelete"
                        >
          </ifbp-template>
        </ifbp-panel>
        <!--股东信息界面-->
        <ifbp-panel id="ShareholderPanel" title="股东信息" :icons="ShareholderIcons">
          <ifbp-template ref="ShareholderRef"
                        tplId="ShareholderTemplate"
                        :pkTemp="ShareholderPk"
                        :tplData="ShareholderData"
                        :tplResetFun="ShareholderResetFun"
                        :tplMethods="ShareholderTplMethods"
                        @form-confirm-click="ShareholderFormConfirm"
                        @form-cancel-click="ShareholderFormCancel"
                        @edit-table-click="ShareholderEditTableRow"
                        @delete-table-click="ShareholderDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
import {ylsBusi} from '../../../../common/js/publicData.js';

    <!-- 客户联系人 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="linkmanDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkmanDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="linkmanDeleteClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 股东信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="ShareholderDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ShareholderDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="ShareholderDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    //校验
    let validatecustomer = function(rule, value, callback) {
      
      //证件号码唯一校验
      if (rule.field === "identity_no") {
        if (value === "") {
          callback(new Error("证件号不能为空"));
        } else {
          let datam = {
            identity_no: value,
            pk_customer:oThis.pk_customer
          };
          oThis
            .$http({
              url: ylsBusi + "cust/customer/checkOnlyOne",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(datam))
            })
            .then(res => {
              
              if (res.data.success === true) {
                callback();
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })
            .catch(() => {
              callback(new Error("后台服务有误，请联系管理员！"));
            });
        }
      }
      //客户名称
      if(rule.field==="customer_name"){
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
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.customerEdit = !oThis.customerEdit;
          }
        }
      ],
      customerPk: "54fc5e2c-414d-49e5-9a44-1bf2bbe002e1",
      customerData: {
        customer: {},
        rules: {
          customer_name: [{validator: validatecustomer, trigger: "blur" }
          ],
          identity_no: [{ validator: validatecustomer, trigger: "blur" }],
          cusotmer_class: [
            { required: true, message: "客户基本分类不能为空", trigger: "blur" }
          ]
        }
      },
      customerEdit: false,

      //联系人
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存客户基本信息",
                  type: "error"
                });
                return;
            }
            let uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            let table = uitemplateComp.$refs["OtherContact_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.custlinkmanRef.setData("OtherContact", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["OtherContact_ref"].resetFields();
          }
        }
      ],
      custlinkmanPk: "946c2308-f17d-4d80-bc5b-3f3f406df306", //linkman
      custlinkmanData: {
        rules: {
          customer_name: [
            { required: true, message: "请输入联系人名称", trigger: "blur" }
          ]
        }
      },
      //渲染表格
      linkmanResetFun: function($node) {
        let $table = this.getNodeById($node, "bimh5ti3qnq");
        //  $table.attr(':show-header','false');
        let operateArr = [
          {
            title: "编辑",

            icon: "edit"
          },
          {
            title: "删除",

            icon: "delete"
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },

      custlinkmanTplMethods: {
        // form的保存操作
        // form的取消操作
      },

      // 股东信息新增
      ShareholderIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存客户基本信息",
                  type: "error"
                });
                return;
            }
            let uitemplateComp = oThis.$refs.ShareholderRef.comp;
            let table = uitemplateComp.$refs["Shareholder_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      ShareholderPk: "4206377c-53b0-497d-a5b6-c6f98fa6631d", //custaxes
      ShareholderData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      ShareholderResetFun: function($node) {
        let $table = this.getNodeById($node, "uob2e9t4f2");
        // $table.attr(":show-header", "false");
        let operateArr = [
          {
            title: "编辑",

            icon: "edit"
          },
          {
            title: "删除",

            icon: "delete"
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);

        $table.append(operateHtml);

        let $pkCountry = this.getNodeById($node, "u5itmgcx7c");
        let $pkTaxes = this.getNodeById($node, "1idpzwci9up");
        $pkCountry.html(
          '<template scope="scope"><div>{{scope.row.beanMap?' +
            "(scope.row.beanMap.pk_country_ref?" +
            'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' +
            "</div></template>"
        );

        $pkTaxes.html(
          '<template scope="scope"><div>{{scope.row.beanMap?' +
            "(scope.row.beanMap.pk_taxes_ref?" +
            'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' +
            "</div></template>"
        );

        return $node[0].outerHTML;
      },
      ShareholderTplMethods: {
        // form的保存操作
      }
    };
  },
  //获取数据数据初始化操作
  created() {},
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
    
    /**
       *   初始响应方法
       **/
    request() {
      this.pk_customer = this.$root.$router.currentRoute.params.id;
      //请求客户基本信息详情
      if(this.pk_customer===undefined){
        this.pk_customer="";
        this.customerEdit=true;
        return;
      }
      let method = this.$root.$router.currentRoute.name;
      if (method != "customer_baseinfo-save") {
        if (this.pk_customer != "") {
          this.requestCustBaseInfo();
          this.requestCustlinkman();
          this.requestShareholder();
        }
      }
    },
    //请求客户基本信息详情
    requestCustBaseInfo() {
      this.$http({
        url: ylsBusi + "cust/customer/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: this.pk_customer
      })
        .then(res => {
          let originalValue = res.data.data;
          this.$refs.baseTemplateRef.setData(
            "customer",
            JSON.parse(JSON.stringify(originalValue))
          );
          
          this.$refs.baseTemplateRef1.setData(
            "CustCorp",
            JSON.parse(JSON.stringify(originalValue.cust_corp_list[0]))
          );
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "客户基本信息详情获取失败",
            type: "error"
          });
        });
    },
    //请求客户银行账户
    requestCustBank() {
      this.$http({
        url:
          "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" +
          this.pk_customer,
        method: "get"
      })
        .then(res => {
          if (res.data.success === true) {
            let custbankOriginal = res.data.data;
            this.$refs.custbankRef.setData(
              "bankaccount",
              JSON.parse(JSON.stringify(custbankOriginal))
            );
            this.$nextTick(() => {
              this.$refs.custbankRef.setData("tableShow", false);
            });
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
    },
    //请求客户联系人
    requestCustlinkman() {
      let url;
      url = ylsBusi + "cust/otherContact/page";
      let data = {
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
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs["custlinkmanRef"].setData(
            "OtherContact_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    //请求股东信息
    requestShareholder() {
      let url;
      url = ylsBusi + "cust/shareholder/page";
      let data = {
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
      })
        .then(res => {
          
          this.originalValue = res.data.data.content;
          this.$refs["ShareholderRef"].setData(
            "Shareholder_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },

    customerCancel() {
      this.customerEdit = false;
      // 重置value
    },
    //客户基本信息保存
    customerConfirm() {
      let data = this.$refs.baseTemplateRef.comp.customer;
      let data1 = this.$refs.baseTemplateRef1.comp.CustCorp;
      
      let a=[data1];
      data.cust_corp_list=a;
      console.log(data);
      let baseUrl = ylsBusi;
      //表单formRef  表格tableRef
      this.$refs.baseTemplateRef.comp.$refs["formRef"].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/customer/create",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.originalValue = res.data.data;
                console.log(this.$refs.baseTemplateRef);
                this.$refs.baseTemplateRef.setData(
                  "customer",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                
                this.pk_customer=this.originalValue.pk_cust_customer;
                this.customerEdit = false;
              } else {
                this.$message({
                  message: "res.data.error.errorMessage",
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    },
    //联系人取消按钮
    linkmanFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["custlinkmanRef"].comp.formShow = false;
      } else {
        this.$refs["custlinkmanRef"].getTableComp().closeExpandRow();
      }
    },
    //联系人主表保存
    linkmanFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.custlinkmanRef.comp.OtherContact;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.custlinkmanRef.comp.$refs[
        "OtherContact_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/otherContact/updateORinsert",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.custlinkmanRef.getData(
                  "OtherContact_t"
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (this.rmoveindex !== "") {
                  linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(this.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                this.$refs.custlinkmanRef.setData(
                  "OtherContact_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["custlinkmanRef"].comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    },
    //联系人行编辑
    linkmanFormedit: function(scope) {
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
      let row = scope.row;
      this.$refs["custlinkmanRef"].getTableComp().expandRow(row);
      this.$refs["custlinkmanRef"].formShow = false;
      //OtherContact为表单数据对象参数
      this.$refs["custlinkmanRef"].setData("OtherContact", row);
    },
    //联系人删除提示
    linkmanFormdelete: function(scope) {
      this.linkmanDelVisible = true;
      this.delId = scope.row.pk_cust_other_contact;
    },
    //联系人删除方法
    linkmanDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/otherContact/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            //this.delDialogVisible = false;
            this.requestCustlinkman();
            // this.request(this.currentPage - 1, this.size);
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      this.linkmanDelVisible = false;
      this.delId = "";
    },
    //股东情况保存
    ShareholderFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.ShareholderRef.comp.Shareholder;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.ShareholderRef.comp.$refs[
        "Shareholder_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/shareholder/create",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.ShareholderRef.getData(
                  "Shareholder_t"
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                
                if (this.rmoveindex !== "") {
                  linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(this.originalValue);
                }
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                this.$refs.ShareholderRef.setData(
                  "Shareholder_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["ShareholderRef"].comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    },
    // 股东信息form的取消操作
    ShareholderFormCancel: function(type) {
      if (type === "form") {
        this.$refs["ShareholderRef"].comp.formShow = false;
      } else {
        this.$refs["ShareholderRef"].getTableComp().closeExpandRow();
      }
    },
    //股东编辑
    ShareholderEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs["ShareholderRef"].getTableComp().expandRow(row);
      this.$refs["ShareholderRef"].formShow = false;
      //ShareholderRef为表单数据对象参数
      this.$refs["ShareholderRef"].setData("Shareholder", row);
    },
    //股东信息删除提示
    ShareholderDeleteTableRow: function(scope) {
      this.ShareholderDelVisible = true;
      this.delId = scope.row.pk_cust_shareholder;
    },
    //股东信息删除
    ShareholderDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/shareholder/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.requestShareholder();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      this.ShareholderDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

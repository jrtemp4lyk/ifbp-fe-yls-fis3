<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">项目信息设置</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <ifbp-panel id="basePanel" title="基本信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :pkTemp="projectPk"
                    show-type="form"
                    :tplData="projectData"
                    :editable="projectEdit">
          </ifbp-template>
          <div class="form-button-div" v-if="projectEdit">
            <el-button type="default" class="button-no-radius" @click="customerCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="customerConfirm">保存</el-button>
          </div>
        </ifbp-panel>
        <ifbp-panel id="bankPanel" title="银行账户信息" :icons="bankIcons">
          <ifbp-template ref="custbankRef"
                        tplId="bankTemplate"
                        :pkTemp="custbankPk"
                        :tplData="custbankData"
                        :tplResetFun="custbankResetFun"
                        :tplMethods="custbankTplMethods"
                        form-confirm-fun="custbankFormConfirm"
                        form-cancel-fun="custbankFormCancel"
                        show-type="table-form">
          </ifbp-template>
        </ifbp-panel>
        <ifbp-panel id="linkmanPanel" title="联系人信息" :icons="linkmanIcons">
          <ifbp-template ref="custlinkmanRef"
                        tplId="linkmanTemplate"
                        :pkTemp="custlinkmanPk"
                        :tplData="custlinkmanData"
                        :tplResetFun="linkmanResetFun"
                        :tplMethods="custlinkmanTplMethods"
                        form-confirm-fun="linkmanFormConfirm"
                        form-cancel-fun="linkmanFormCancel"
                        show-type="table-form"
                        :page-comp="this">
          </ifbp-template>
        </ifbp-panel>
        <ifbp-panel id="countryTaxesPanel" title="税类信息" :icons="countryTaxesIcons">
          <ifbp-template ref="custCountryTaxesRef"
                        tplId="countryTaxesTemplate"
                        :pkTemp="custCountryTaxesPk"
                        :tplData="custCountryTaxesData"
                        :tplResetFun="custCountryTaxesResetFun"
                        :tplMethods="custCountryTaxesTplMethods"
                        form-confirm-fun="custCountryFormConfirm"
                        form-cancel-fun="custCountryFormCancel"
                        show-type="table-form"
                        :page-comp="this">
          </ifbp-template>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>

    <!-- 客户联系人 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="custbankDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="custbankDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="custbankDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 客户联系人 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="linkmanDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkmanDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="linkmanDeleteClick">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 客户国家税类 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="custCountryTaxesDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="custCountryTaxesDelVisible = false">取 消</el-button>
        <el-button type="primary" @click="custCountryTaxesDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// import test from "../detail-mock.js";
// import ElTemplate from "../../../template.vue";
// import ifbpPanelGroup from "../../../ifbp-panel-group.vue";
export default {
  // components: {
  //   "ifbp-template": ElTemplate,
  //   "ifbp-panel-group": ifbpPanelGroup
  // },
  data() {
    var oThis = this;
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      pk_project: '',
      linkmanDelVisible: false,
      custbankDelVisible: false,
      custCountryTaxesDelVisible: false,

      //customer
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.projectEdit = !oThis.projectEdit;
          }
        }
      ],
      projectPk: "2c604f78-c8ae-4939-b036-5551ab5d6dd1", 
      projectData: {
        customer: {},
        rules: {
          name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
          pk_custclass: [
            { required: true, message: "客户基本分类不能为空", trigger: "blur" }
          ]
        }
      },
      projectEdit: false,
      
      // bank
      bankIcons: [
        {
          icon: "plus",
          click: function() {
            var uitemplateComp = oThis.$refs.custbankRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }
      ],
      custbankPk: "000111100000001Z8DZS", 
      custbankData:{
        params: {
          pk_banktype: ""
        },
        rules: {
          accnum: [{ required: true, message: "账号不能为空", trigger: "blur" }],
          accname: [{ required: true, message: "户名不能为空", trigger: "blur" }],
          pk_bankdoc: [
            { required: true, message: "开户银行不能为空", trigger: "blur" }
          ],
          pk_banktype: [
            { required: true, message: "银行类型不能为空", trigger: "blur" }
          ],
          accountproperty: [
            { required: true, message: "账户性质不能为空", trigger: "blur" }
          ]
        }
      },
      custbankTplMethods: {
        // form的保存操作
        custbankFormConfirm: function(){
          this.$refs['bankaccount_form'].validate((valid) => {
            if(valid){
              var data = this.bankaccount;
            }
            console.log(data);
          });
        },
        // form的取消操作
        custbankFormCancel: function(){
          this.$refs['bankaccount_table'].closeExpandRow();
          this.formShow = false;
        },
        custbankEditTableRow: function(scope) {
          var row = scope.row;
          this.$refs['bankaccount_table'].expandRow(row);
          this.bankaccount = row;
          this.formShow = false;
        },
        custbankDeleteTableRow: function(scope) {
          console.log("delete", scope.row);
          this.pageComp.custbankDelVisible = true;
          this.pageComp.custbankDel = scope.row;
          //            this.pk_custbank = scope.row.pk_custbank;
        },
        enableTableRow: function(scope) {
          alert("enable");
          console.log("enable", scope.row);
          this.pageComp.custbankDelVisible = true;
          this.pk_custbank = scope.row.pk_custbank;
        }
      },
      custbankResetFun: function($node) {
        var $table = this.getNodeById($node, "no5ii9v42op");
        $table.attr(':show-header','false');
        var operateArr = [
          {
            title: "编辑",
            click: "custbankEditTableRow",
            icon: "edit"
          },
          {
            title: "启用",
            click: "enableTableRow",
            icon: "pt-tuichu"
          },
          {
            title: "删除",
            click: "custbankDeleteTableRow",
            icon: "delete"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);

        var $accnum = this.getNodeBy_Id($node, "krvqs7xlxfs"); //账号 
        var $accname = this.getNodeBy_Id($node, "83oyd6v35wm"); //户名
        var $pkBankdoc = this.getNodeBy_Id($node, "r69m5jd8zul"); //开户银行
        var $pkBanktype = this.getNodeBy_Id($node, "bo4dg59b0v"); //银行类别
        var $contactpsn = this.getNodeBy_Id($node, "vpthxzig1da"); //联系人
        var $tel = this.getNodeBy_Id($node, "k3bvpmgm9m"); //联系电话

        $accnum.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>'
        );
        $accname.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>'
        );
        $pkBankdoc.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' +
            "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." +
            'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>'
        );
        $pkBanktype.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' +
            "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." +
            'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>'
        );

        $contactpsn.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>'
        );
        $tel.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>'
        );
        return $node[0].outerHTML;
      },


      //联系人
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            var uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            var table = uitemplateComp.$refs['linkman_table'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }
      ],
      custlinkmanPk: "34cc4979-181e-44dc-9cd7-79ab1b51738d", //linkman
      custlinkmanData: {
        rules: {
          name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
        }
      },
      linkmanResetFun: function($node) {
        var $table = this.getNodeBy_Id($node, "zxhlnr94qvd");
        $table.attr(':show-header','false');
        var operateArr = [
          {
            title: "编辑",
            click: "custlinkmanEditTableRow",
            icon: "edit"
          },
          {
            title: "删除",
            click: "custlinkmanDeleteTableRow",
            icon: "delete"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);

        var $sex = this.getNodeBy_Id($node, "ir66pzdxiic"); //性别
        var $isdefault = this.getNodeBy_Id($node, "h81qk6u00p5"); //是否默认
        $sex.html(
          '<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>'
        );
        $isdefault.html(
          '<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>'
        );
        return $node[0].outerHTML;
      },
      custlinkmanTplMethods: {
        // form的保存操作
        linkmanFormConfirm: function(){
          this.$refs['linkman_form'].validate((valid) => {
            if(valid){
              var data = this.linkman;
            }
            console.log(data);
          });
        },
        // form的取消操作
        linkmanFormCancel: function(){
          this.$refs['linkman_table'].closeExpandRow();
          this.formShow = false;
        },
        // table行的编辑操作
        custlinkmanEditTableRow: function(scope) {
          var row = scope.row;
          this.$refs['linkman_table'].expandRow(row);
          this.linkman = row;
          this.formShow = false;
        },
        // table行的删除操作
        custlinkmanDeleteTableRow: function(scope) {
          console.log("delete", scope.row);
          this.pageComp.linkmanDel = scope.row;
          this.pageComp.linkmanDelVisible = true;
          this.pageComp.pk_linkman = scope.row.pk_linkman;
        }
      },


      // 税类信息
      countryTaxesIcons: [
        {
          icon: "plus",
          click: function() {
            var uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            var table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }
      ],
      custCountryTaxesPk: "7a7287cf-0833-4009-8cc5-c18cf0e2c4ce", //custaxes
      custCountryTaxesData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      custCountryTaxesResetFun: function($node) {
        var $table = this.getNodeBy_Id($node, "xnl0066wpf9");
        $table.attr(':show-header','false');
        var operateArr = [
          {
            title: "编辑",
            click: "custCountryTaxesEditTableRow",
            icon: "edit"
          },
          {
            title: "删除",
            click: "custCountryTaxesDeleteTableRow",
            icon: "delete"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        
        $table.append(operateHtml);

        var $pkCountry = this.getNodeBy_Id($node, "u5itmgcx7c");
        var $pkTaxes = this.getNodeBy_Id($node, "1idpzwci9up");
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
      custCountryTaxesTplMethods: {
        // form的保存操作
        custCountryFormConfirm: function(){
          var data = this.custaxes;
          console.log(data);
        },
        // form的取消操作
        custCountryFormCancel: function(){
          this.$refs['custaxes_table'].closeExpandRow();
          this.formShow = false;
        },
        custCountryTaxesEditTableRow: function(scope) {
          var row = scope.row;
          this.$refs['custaxes_table'].expandRow(row);
          this.custaxes = row;
          this.formShow = false;
        },
        custCountryTaxesDeleteTableRow: function(scope) {
          console.log("delete", scope.row);
          this.pageComp.custCountryTaxesDelVisible = true;
          this.pageComp.custtaxtypesDel = scope.row;
        }
      }
    };
  },
  mounted() {
    this.request();
  },
  methods: {
    /**
       *   单个地点详情
       **/
    request() {
      this.pk_project = this.$root.$router.currentRoute.params.id;
      //请求客户基本信息详情
     if(this.pk_project){
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
    requestCustBaseInfo() {
      debugger;
      this.$http({
         url: "/yls-busi-web/prj/getbyid" ,
         headers: {'Content-Type': 'application/json'},  
         method: "post",
         data:this.pk_project
      })
        .then(res => {
          if (res.data.success === true) {
            var originalValue = res.data.data;
            console.log(this.$refs.baseTemplateRef);
            this.$refs.baseTemplateRef.setData(
              "project",
              JSON.parse(JSON.stringify(originalValue))
            );
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
          if (res.data.status === true) {
            var custbankOriginal = res.data.data;
            this.$refs.custbankRef.setData(
              "bankaccount",
              JSON.parse(JSON.stringify(custbankOriginal))
            );
            this.$nextTick(() =>{
              this.$refs.custbankRef.setData("tableShow",false);  
            })
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
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
    },
    //请求客户联系人
    requestCustlinkman() {
      this.$http({
        url:
          "/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=" +
          this.pk_customer,
        method: "get"
      })
        .then(res => {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            console.log(this.$refs.custlinkmanRef);
            //             this.custlinkmanData = {
            //               linkman_t :  JSON.parse(JSON.stringify(this.originalValue))
            //             };
            this.$refs.custlinkmanRef.setData(
              "linkman_t",
              JSON.parse(JSON.stringify(originalValue))
            );
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
            message: "客户联系人信息获取失败",
            type: "error"
          });
        });
    },
    //请求客户国家税类
    requestCustCountryTaxes() {
      this.$http({
        url:
          "/uapbd/custcountrytaxes/list?pn=1&ps=10&sortColumn=auto&pk_customer=" +
          this.pk_customer,
        method: "get"
      })
        .then(res => {
          if (res.data.status === true) {
            var originalValue = res.data.data;
            //            this.custCountryTaxesData = {
            //              custaxes_t :  JSON.parse(JSON.stringify(this.originalValue))
            //            };
            this.$refs.custCountryTaxesRef.setData(
              "custaxes_t",
              JSON.parse(JSON.stringify(originalValue))
            );
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
            message: "客户国家税类信息获取失败",
            type: "error"
          });
        });
    },
    
    linkmanDeleteClick() {
      var delData = {};
      delData.linkman = this.linkmanDel;
      delData.pk_customer = this.pk_customer;
      this.$http({
        url: "/uapbd/custlinkman/delete",
        method: "post",
        data: delData
      })
        .then(res => {
          if (res.data.status === true) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.linkmanDelVisible = false;
            this.requestCustlinkman();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
    },
    custbankDeleteClick() {
      var delData = this.custbankDel;
      var ts = this.$refs.baseTemplateRef.comp.customer.ts;
      delData.ts = ts;
      delData.pk_customer = this.pk_customer;
      this.$http({
        url: "/uapbd/custbank/delete",
        method: "post",
        data: delData
      })
        .then(res => {
          if (res.data.status === true) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.custbankDelVisible = false;
            this.requestCustBank();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
    },
    custCountryTaxesDeleteClick() {
      this.custtaxtypesDel.pk_customer = this.pk_customer;
      this.$http({
        url: "/uapbd/custcountrytaxes/delete",
        method: "post",
        data: this.custtaxtypesDel
      })
        .then(res => {
          if (res.data.status === true) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.custCountryTaxesDelVisible = false;
            this.requestCustCountryTaxes();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除接口调用失败",
            type: "error"
          });
        });
    },
    customerCancel() {
      this.projectEdit = false;
      // 重置value
    },
    customerConfirm() {
      var url;
      var data = this.$refs.baseTemplateRef.comp.project;
      var baseUrl = '/yls-busi-web/';
      if(this.pk_project){
         url = baseUrl+'prj/update';
      }else{
        url = baseUrl+'prj/create';
      }
      this.$refs.baseTemplateRef.comp.$refs["project-form"].validate(valid => {
        if (valid) {
          this.$http({
            url: url,
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: JSON.parse(JSON.stringify(data))  
          })
            .then(res => {
              if (res.data.status === true) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.originalValue = res.data.data;
                console.log(this.$refs.baseTemplateRef);
                this.$refs.baseTemplateRef.setData(
                  "project",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                this.projectEdit = false;
              } else {
                this.$message({
                  message: res.data.msg,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "地点更新失败",
                type: "error"
              });
            });
        }
      });
    },
  }
};
</script>
<style>

</style>

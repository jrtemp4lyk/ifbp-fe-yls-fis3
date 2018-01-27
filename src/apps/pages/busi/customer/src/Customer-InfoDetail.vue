<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">客户信息管理</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <ifbp-panel id="basePanel" title="代理商信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :pkTemp="customerPk"
                    show-type="form"
                    :tplData="customerData"
                    :editable="customerEdit">
          </ifbp-template>
          <div class="form-button-div" v-if="customerEdit">
            <el-button type="default" class="button-no-radius" @click="customerCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="customerConfirm">保存</el-button>
          </div>
        </ifbp-panel>
       
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
                      
                        >
          </ifbp-template>
        
        </ifbp-panel>
        <ifbp-panel id="countryTaxesPanel" title="股东信息" :icons="countryTaxesIcons">
          <ifbp-template ref="custCountryTaxesRef"
                        tplId="countryTaxesTemplate"
                        :pkTemp="custCountryTaxesPk"
                        :tplData="custCountryTaxesData"
                        :tplResetFun="custCountryTaxesResetFun"
                        :tplMethods="custCountryTaxesTplMethods"
                        form-confirm-fun="custCountryFormConfirm"
                        @form-cancel-click="custCountryFormCancel"
                        show-type="table-form"
                       >
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
import {ylsBusi} from '../../../../common/js/publicData.js';

export default {
 
  data() {
    let oThis = this;
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      pk_customer: '',
      linkmanDelVisible: false,
      custbankDelVisible: false,
      custCountryTaxesDelVisible: false,

      //customer
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.customerEdit = !oThis.customerEdit;
          }
        }
      ],
      customerPk: "e121f450-50c2-46ba-8b04-1c95a04da420", 
      customerData: {
        customer: {},
        rules: {
          name: [{ required: true, message: "客户名称不能为空", trigger: "blur" }],
          pk_custclass: [
            { required: true, message: "客户基本分类不能为空", trigger: "blur" }
          ]
        }
      },
      customerEdit: false,
      
      // bank
      bankIcons: [
        {
          icon: "plus",
          click: function() {
            let uitemplateComp = oThis.$refs.custbankRef.comp;
            let table = uitemplateComp.$refs['bankaccount_table'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }
      ],
      custbankPk: "", 
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
              let data = this.bankaccount;
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
          let row = scope.row;
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
        let $table = this.getNodeById($node, "b327bj95th6");
        $table.attr(':show-header','false');
        let operateArr = [
          {
            title: "编辑",
           
            icon: "edit"
          },
          {
            title: "启用",
            
            icon: "pt-tuichu"
          },
          {
            title: "删除",
            
            icon: "delete"
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);

        let $accnum = this.getNodeById($node, "krvqs7xlxfs"); //账号 
        let $accname = this.getNodeById($node, "83oyd6v35wm"); //户名
        let $pkBankdoc = this.getNodeById($node, "r69m5jd8zul"); //开户银行
        let $pkBanktype = this.getNodeById($node, "bo4dg59b0v"); //银行类别
        let $contactpsn = this.getNodeById($node, "0mhkj42m1w5"); //联系人
        let $tel = this.getNodeById($node, "k3bvpmgm9m"); //联系电话

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
            let uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            let table = uitemplateComp.$refs['OtherContact_t_ref'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }
      ],
      custlinkmanPk: "946c2308-f17d-4d80-bc5b-3f3f406df306", //linkman
      custlinkmanData: {
        rules: {
          name: [{ required: true, message: "请输入联系人名称", trigger: "blur" }]
        }
      },
      linkmanResetFun: function($node) {
        
        let $table = this.getNodeById($node, "bimh5ti3qnq");
         $table.attr(':show-header','false');
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
      countryTaxesIcons: [
        {
          icon: "plus",
          click: function() {
            let uitemplateComp = oThis.$refs.custCountryTaxesRef.comp;
            let table = uitemplateComp.$refs['Shareholder_t_ref'];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
          }
        }
      ],
      custCountryTaxesPk: "4206377c-53b0-497d-a5b6-c6f98fa6631d", //custaxes
      custCountryTaxesData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      custCountryTaxesResetFun: function($node) {
        let $table = this.getNodeById($node, "uob2e9t4f2");
        $table.attr(':show-header','false');
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
      custCountryTaxesTplMethods: {
        // form的保存操作
        
      }
    };
  },
  mounted() {
    
    this.request();
  },
  methods: {
         linkmanFormConfirm: function(){
           
        let data = this.$refs.custlinkmanRef.comp.OtherContact;
       data.pk_customer=this.pk_customer;
        //data.append("', 'pk_customer': 'OID10000000f04h'");
        
        let baseUrl = '/yls-busi-web/';
        let jsonStr = JSON.stringify(data);
       
        this.$refs.custlinkmanRef.comp.$refs["OtherContact_ref"].validate(valid => {
          if (valid) {
            this.$http({
              url: baseUrl+'cust/otherContact/updateORinsert',
              headers: {'Content-Type': 'application/json'},
              method: "post",
              data: JSON.parse(JSON.stringify(data))   
            })
              .then(res => {
                if (res.data.success === true) {
                  this.$message({
                    message: res.data.msg,
                    type: "success"
                  });
                  this.originalValue = res.data.data;
                  console.log(this.$refs.custlinkmanRef);
                  this.$refs.custlinkmanRef.setData(
                    "OtherContact",
                    JSON.parse(JSON.stringify(this.originalValue))
                  );
                  //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                  this.customerEdit = false;
                } else {
                  this.$message({
                    message: res.data.msg,
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
    custCountryFormConfirm: function(){
          let data = this.custaxes;
          console.log(data);
        },
        // form的取消操作
        custCountryFormCancel: function(type){
          if(type === 'form'){
          this.$refs['custCountryTaxesRef'].comp.formShow = false;
        }else{
          this.$refs['custCountryTaxesRef'].getTableComp().closeExpandRow();
        }
        },
        custCountryTaxesEditTableRow: function(scope) {
          let row = scope.row;
          this.$refs['custaxes_table'].expandRow(row);
          this.custaxes = row;
          this.formShow = false;
        },
        custCountryTaxesDeleteTableRow: function(scope) {
          console.log("delete", scope.row);
          this.pageComp.custCountryTaxesDelVisible = true;
          this.pageComp.custtaxtypesDel = scope.row;
        },
  
     linkmanFormCancel: function(type){
            if(type === 'form'){
              this.$refs['custlinkmanRef'].comp.formShow = false;
            }else{
              this.$refs['custlinkmanRef'].getTableComp().closeExpandRow();
            }
       
        },
        // table行的编辑操作
        custlinkmanEditTableRow: function(scope) {
           
          let row = scope.row;
          this.$refs['custlinkmanRef'].expandRow(row);
          this.linkman = row;
          this.formShow = false;
        },
        // table行的删除操作
        custlinkmanDeleteTableRow: function(scope) {
          console.log("delete", scope.row);
          this.pageComp.linkmanDel = scope.row;
          this.pageComp.linkmanDelVisible = true;
          this.pageComp.pk_linkman = scope.row.pk_linkman;
        },
    /**
       *   单个地点详情
       **/
    request() {
      this.pk_customer = this.$root.$router.currentRoute.params.id;
      //请求客户基本信息详情
      
      let method=this.$root.$router.currentRoute.name;
      if(method!="customer_baseinfo-save"){
         
        if(this.pk_customer !=""){
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
   requestCustBaseInfo() {
      this.$http({
       url: "/yls-busi-web/cust/customer/getById" ,
         headers: {'Content-Type': 'application/json'},  
         method: "post",
         data:this.pk_customer
      }).then(res => {
            let originalValue = res.data.data;
            console.log(this.$refs.baseTemplateRef);
            this.$refs.baseTemplateRef.setData(
              "customer",
              JSON.parse(JSON.stringify(originalValue))
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
      let url;
      let baseUrl = '/yls-busi-web/';
      url = baseUrl + 'cust/otherContact/page';
      let data = {
        "pageNum": 0,
        "pageSize": 0,
        "searchParams": {
          "searchMap": {
            "pk_customer":this.pk_customer
          }
        }
      };
      this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
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
         // this.totalElements = res.data.data.totalElements; // 总条数
         // this.size = res.data.data.size; // 每页的条数
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    //请求股东信息
    requestCustCountryTaxes() {
       let url;
      let baseUrl = '/yls-busi-web/';
      url = baseUrl + 'cust/related_company/page';
      let data = {
        "pageNum": 0,
        "pageSize": 0,
        "searchParams": {
          "searchMap": {
            "pk_customer":this.pk_customer
          }
        }
      };
      this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs["custCountryTaxesRef"].setData(
            "Shareholder_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
         // this.totalElements = res.data.data.totalElements; // 总条数
         // this.size = res.data.data.size; // 每页的条数
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    
    linkmanDeleteClick() {
      let delData = {};
      delData.linkman = this.linkmanDel;
      delData.pk_customer = this.pk_customer;
      this.$http({
        url: "/uapbd/custlinkman/delete",
        method: "post",
        data: delData
      })
        .then(res => {
          if (res.data.success === true) {
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
      let delData = this.custbankDel;
      let ts = this.$refs.baseTemplateRef.comp.customer.ts;
      delData.ts = ts;
      delData.pk_customer = this.pk_customer;
      this.$http({
        url: "/uapbd/custbank/delete",
        method: "post",
        data: delData
      })
        .then(res => {
          if (res.data.success === true) {
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
          if (res.data.success === true) {
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
      this.customerEdit = false;
      // 重置value
    },
    customerConfirm() {
      let data = this.$refs.baseTemplateRef.comp.customer;
      console.log(data);
      let baseUrl = '/yls-busi-web/';
      let jsonStr = JSON.stringify(data);
      
      this.$refs.baseTemplateRef.comp.$refs["customer_ref"].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl+'cust/customer/updateORinsert',
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: JSON.parse(JSON.stringify(data))   
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.originalValue = res.data.data;
                console.log(this.$refs.baseTemplateRef);
                this.$refs.baseTemplateRef.setData(
                  "customer",
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                //            this.originalValue = JSON.parse(JSON.stringify(this.currentValue));
                this.customerEdit = false;
              } else {
                this.$message({
                  message: res.data.msg,
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
  }
};
</script>
<style>

</style>

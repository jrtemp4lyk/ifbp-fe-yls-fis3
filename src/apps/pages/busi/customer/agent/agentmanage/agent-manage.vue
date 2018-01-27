<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">代理商管理</h2>
    </div>
    <!-- 主体区域(详情页结构) -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <!--企业客户基本信息模块界面-->
        <ifbp-panel id="basePanel" title="代理商信息" :icons="agentIcons">
          <ifbp-template ref="agentbaseTemplateRef"
                    tplId="baseTemplate"
                    :pkTemp="agentPk"
                    @form-confirm-click="agentbaseFormConfirm"
                    @form-cancel-click="agentbaseFormCancel"
                    show-type="table-form"
                    :tplResetFun="templateTableFormResetFun"
                    :tplData="customerData"
                    :editable="customerEdit"                  
                    @delete-table-click="tableDeleteClickRow"
                    @search-table-click="updateagentbaseDataRow"
                    :pk_customer="pk_customer">
          </ifbp-template>
          <el-dialog
            title="提示"
            v-model="custVisible"
            :modal="true"
            size="tiny">
            <span>确认删除该条记录 ？删除后无法恢复。</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="custVisible = false, this.delId=''">取 消</el-button>
              <el-button type="primary" @click="tableDeleteClick">确 定</el-button>
            </span>
          </el-dialog>
         
        </ifbp-panel>
        <!--联系人模块界面-->
         <ifbp-panel id="linkmanPanel"  title="联系人信息" :icons="linkmanIcons">
          <custlinkmanRef
            ref="custlinkmanRef"
            :pk_customer="pk_customer">
          </custlinkmanRef>
        </ifbp-panel> 
        <!--股东信息模块界面-->
        <ifbp-panel id="ShareholderPanel" title="股东信息" :icons="ShareholderIcons">
          <ShareholderRef
            ref="ShareholderRef"
            :pk_customer="pk_customer">
          </ShareholderRef>
        </ifbp-panel>
        <!--财务报表模块界面-->
        <ifbp-panel id="none"    title="财务报表信息" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel>
        <!-- 尽职调查 -->
        <ifbp-panel id="none"  title="尽职调查" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel>
        <!--资料上传模块界面-->
        <ifbp-panel id="none"    title="资料上传" :icons="none">
          <none
            ref="none"
            :pk_customer="pk_customer">
          </none>
        </ifbp-panel>
        
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';
//引入联系人和股东信息面板
import custlinkmanRef from '../creditgrant/linkmanpanel.vue';
import Shareholderpanel from '../creditgrant/Shareholderpanel.vue';

export default {
  components: {
     'custlinkmanRef':custlinkmanRef,
     'ShareholderRef':Shareholderpanel
  },
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
      //企业客户名称
      if(rule.field==="customer_name"){
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
      custVisible :false,
      //操作按钮
      templateTableFormResetFun:function($node){
          //获取table,此id为ui模板上面的表格Id
          let $table = this.getNodeById($node, "jkcwc96ndh8");
          //定义操作
          let operateArr = [
              {
                  title:"查看",
                  icon:"search"
              },
              {
                  title:"删除",
                  icon:"delete"
              }
          ];
          //获取操作按钮html片段
          let operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
      },
    
      //企业客户基本信息修改
      //级联参照
      corpResetFun: function($node) {
        var $refNode1 = this.getNodeById($node, 'w85l2pcqcf');  //开户行省
         var $refNode2 = this.getNodeById($node, 'gu0cc609z7q');
          var $refNode3 = this.getNodeById($node, 'vijgevbe1li');
          

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        }
        if($refNode2.length) {
          $refNode2.attr("v-on:trigger", "handleRefChange2"); 
        }
        if($refNode3.length) {
          $refNode3.attr("v-on:trigger", "handleRefChange3"); 
        }

         

        
      },
      t_Methods: {
        handleRefChange1: function(type, data) {
          debugger;
          if(type === 'change') {
            debugger;
            var innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.h_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange2: function(type, data) {
          debugger;
          if(type === 'change') {
            debugger;
            var innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.m_ref.changeQueryParams(innerCode);
          }
        },
        handleRefChange3: function(type, data) {
          debugger;
          if(type === 'change') {
            debugger;
            var innerCode = data.value[0].refcode;
            oThis.$refs.baseTemplateRef1.comp.$refs.s_ref.changeQueryParams(innerCode);
          }
        }
      },
        //基本信息
      agentIcons: [
        {
          icon: "plus",
          click: function() {
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
            if(oThis.pk_customer =="" || oThis.pk_customer ==undefined){
               oThis.$refs.agentbaseTemplateRef.resetFormData();
               // 显示新增区域
               oThis.$refs.agentbaseTemplateRef.comp.formShow = true;
            }
             oThis.customerEdit = !oThis.customerEdit;
          }
        }
      ],
      //点击编辑
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            debugger;
            oThis.customerEdit = !oThis.customerEdit;
          }
        }
      ],
      agentPk: "72f361bd-34e3-42ec-8933-d4fce9b0cd29",
      customerData: {
        customer: {},
        rules: {
          customer_name: [{validator: validatecustomer, trigger: "blur" }
          ],
          identity_no: [{ validator: validatecustomer, trigger: "blur" }],
          cusotmer_class: [
            // { required: true, message: "企业客户基本分类不能为空", trigger: "blur" }
          ]
        }
      },
      customerEdit: false,
      //联系人修改
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            debugger;
            if(oThis.pk_customer===""){
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
        }
      ],
      // 股东信息新增
      ShareholderIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
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
        }
      ]

    };
  },
  //获取数据数据初始化操作
  created() {
    // debugger;
    //  this.id = this.$root.$router.currentRoute.params.id;
    //     // 如果是编辑请求, 则请求基本信息详情
    //     if (this.id) {
    //      this.request(this.currentPage - 1, this.size);
    //     }
    // this.request();
  },
  //页面操作
  mounted() {
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
    agentrequest() {
      this.pk_customer = this.$root.$router.currentRoute.params.id;
      //请求企业客户基本信息详情
      if(this.pk_customer===undefined){
        this.pk_customer="";
        this.customerEdit=true;
         this.request();
        return;
      }
      let method = this.$root.$router.currentRoute.name;
      if (method === "AgentManagedetail") {
        if (this.pk_customer != "") {
          this.requestCustBaseInfo();
         
        }
      }
    },
     //后台请求
      request() {
        debugger;
        let url;
        let baseUrl =  ylsBusi;
        url = baseUrl + 'cust/corp/page';
        let data = {
            "orderList": [
            {
                "direction": "desc",
                "property": "ts"
            }
            ],
            "pageNum": 0,
            "pageSize": 20,
            "searchParams": {
            "searchMap": {
              "creator":"102440"
            }
            }
        };
      this.$http({
          url: url,
          headers: {'Content-Type': 'application/json'},
          method: "post",
          data: data,
          dataType: "json"
      }).then(res => {
          //customer_table UI模板表格名称
          let originalValue = res.data.data.content;
          this.$refs['agentbaseTemplateRef'].setData(
              "CustCorp_t",
              JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          this.size = res.data.data.size; // 每页的条数
          }).catch((e) => {
              this.$message({
                  message: "信息获取失败",
                  type: "error"
              });
          });
      },
    tableDeleteClickRow: function(scope) {
        this.custVisible = true;
        this.delId = scope.row.pk_cust_corp;
    },
    
     //确认后调用删除
      tableDeleteClick:function(scope){
           // let delId = scope.row.pk_cust_customer;
           debugger;
            this.$http({
                url:  ylsBusi+"cust/corp/deleteCustcpAndCust",
                headers: { 'Content-Type': 'application/json' },
                method: "post",
                dataType: "json",
                data: this.delId
                }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                    message: "删除成功",
                    type: "success"
                    });
                   this.custVisible = false;    
                   this.request();             
                } else {
                    this.$message({
                    message: res.data.message,
                    type: "error"
                    });
                     this.request();    
                }
                }).catch((e) => {
                    this.$message({
                        message: "信息删除失败！",
                        type: "error"
                    });
                     this.request();    
                });
      },
     //代理商form取消按钮
    agentbaseFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs.agentbaseTemplateRef.comp.formShow = false;
      } else {
        this.$refs.agentbaseTemplateRef.getTableComp().closeExpandRow();
      }
    },
    //代理商主表保存
    agentbaseFormConfirm: function() {
      debugger;
      //获取当前数据
      let data = this.$refs.agentbaseTemplateRef.comp.customer;
      let data1 = this.$refs.agentbaseTemplateRef.comp.CustCorp;
      let jsonCustomer = JSON.parse(JSON.stringify(data));
      //设置为企业客户
      jsonCustomer.customer_type = 'CORP';
      //客户设置为代理商
      jsonCustomer.cusotmer_class = 'yls_dev100000000ffv';
      let jsonCustCorpObj = JSON.parse(JSON.stringify(data1));
      jsonCustCorpObj.cust_type = 'CORP';
      jsonCustomer.customer_name = jsonCustCorpObj.cust_name;
      // let a=[data1];
      let a=[jsonCustCorpObj];
      data = jsonCustomer;
      data.cust_corp_list=a;
      console.log(data);
       let baseUrl = ylsBusi;
      //保存校验
      this.$refs.agentbaseTemplateRef.comp.$refs[
        "CustCorp-form"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/customer/CustCorpInsert",
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
                debugger;
                this.originalValue = res.data.data;
                this.pk_customer=this.originalValue.pk_cust_customer;
                this.customerEdit = false;
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
                this.request();
                //隐藏详情列表
                this.$refs.agentbaseTemplateRef.comp.formShow = false;
                // this.rmoveindex = "";
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

    //请求企业客户基本信息详情
    requestCustBaseInfo() {
      debugger;
      this.$http({
        url: ylsBusi + "cust/corp/getByPkCustomer",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: this.pk_customer
      })
        .then(res => {
          debugger;
          let originalValue = res.data.data;
          // this.$refs.baseTemplateRef.setData(
          //   "customer",
          //   JSON.parse(JSON.stringify(originalValue))
          // );
          this.$refs.agentbaseTemplateRef.setData(
            "CustCorp",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.request();
          this.$refs.agentbaseTemplateRef.comp.formShow = true;
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "代理商基本信息详情获取失败",
            type: "error"
          });
        });
    },

    customerCancel() {
      this.customerEdit = false;
      // 重置value
    },
    //股东编辑
    updateagentbaseDataRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      this.$refs.agentbaseTemplateRef.getTableComp().expandRow(scope.row);
      this.$refs.agentbaseTemplateRef.comp.formShow = false;
      this.$refs.agentbaseTemplateRef.setData('CustCorp',scope.row);
      this.customerEdit = true;

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
  }
};
</script>
<style>

</style>

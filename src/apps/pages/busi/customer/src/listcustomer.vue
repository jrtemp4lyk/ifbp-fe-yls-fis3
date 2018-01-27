<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">客户信息</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" v-show="!createType" @mouseenter.native="createType=true" >新增</el-button>
        <div v-show="createType" @mouseleave.self="createType=false">
            <el-button type="primary" class="button-no-radius" @click="addPersonCustomerInfo">自然人客户</el-button>
            <el-button type="primary" class="button-no-radius"  @click="addCorpCustomerInfo">企业客户</el-button>
        </div>
      </div>
      <div class="fr">
          <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
      </div>
    </div>

    <!-- 客户列表 -->
   <div id="customerList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="customerList-table"
                    tplId="customerList-template"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    :tplData="customerListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    
                    @search-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClickRow" >
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
      
      <!--分页组件-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
            </el-pagination>
    </div>
  </div>
</template>
<script>

import {pagination,ylsBusi} from '../../../../common/js/publicData.js';
export default {
    mixins: [pagination()],
  data() {
    let oThis = this;
    return {
            funnode:"BT003",
            nexuskey:"Lessee_list",
            

            createType: false,
            custVisible :false,
           

            // 查询模板编码
            searchTemplateCode: 'YLSCXMB_BUSICUST_LISTCUSTOMER',
            sp:'',
            customerListData:{},
            //操作按钮
            templateTableFormResetFun:function($node){
                //获取table,此id为ui模板上面的表格Id
                let $table = $node.find('el-table');
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
                $table.append(operateHtml);
                return $node[0].outerHTML;
            }
        }
  },
  created() {
    this.request();
  },
   methods: {

        
        // 查询
        handleSearch(searchTemplate){
            this.sp = JSON.stringify(searchTemplate);
            this.request();
        },
        // 添加按钮
        addPersonCustomerInfo() {
            location.hash = "/cust/Personcustomer/add/";
        },
        addCorpCustomerInfo() {
            location.hash = "/cust/Corpcustomer/add/";
        },
        //编辑按钮
        tableSearchClick:function(scope) {
            
            if(scope.row.customer_type ==='CORP'){
                location.hash = "/cust/Corpcustomer/detail/" + scope.row.pk_cust_customer;


            }else if(scope.row.customer_type === 'PERSON'){
                location.hash = "/cust/Personcustomer/detail/" + scope.row.pk_cust_customer;

            }
           
        },
        tableDeleteClickRow: function(scope) {
            debugger;
            this.custVisible = true;
            this.delId = scope.row.pk_cust_customer;
        },
        //删除操作
        tableDeleteClick:function(scope){
            debugger;
           // let delId = scope.row.pk_cust_customer;
            this.$http({
                url:  ylsBusi+"cust/customer/deleteById",
                headers: { 'Content-Type': 'application/json' },
                method: "post",
                dataType: "json",
                data: this.delId
                }).then(res => {
                    debugger;
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
                }
                }).catch((e) => {
                    this.$message({
                        message: "信息删除失败！",
                        type: "error"
                    });
                });
        },
        //后台请求
        request() {
        let url;
        let baseUrl =  ylsBusi;
        url = baseUrl + 'cust/customer/page';
        debugger;
        let data = {
            "orderList": [
            {
                "direction": "desc",
                "property": "ts"
            }
            ],
            "pageNum": this.currentPage - 1,
            "pageSize": this.pageSize,
            "searchParams": {
                "searchMap": {
                    'custCondList': [
                        {'key':'cusotmer_class',
                        'oper':'=',
                        'value':'yls_dev100000000ffn'
                        }
                    ],
                    'qtAggVO':this.sp
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
            debugger;
            //customer_table UI模板表格名称
            let originalValue = res.data.data.content;
            this.$refs["customerList-table"].setData(
                "customer_t",
                JSON.parse(JSON.stringify(originalValue))
            );
            this.totalElements = res.data.data.totalElements; // 总条数
            }).catch((e) => {
                this.$message({
                    message: "信息获取失败",
                    type: "error"
                });
            });
        }
    }
};
</script>
<style>

</style>

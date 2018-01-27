<template>
  <div class="main-panel">
    <!--节点title-->
    <!-- <div class="title-container">
      <h2 class="name">客户信息</h2>
    </div> -->
    <!--按钮区域-->
    <div class="operator-container">
      <ifbp-search class='fr' :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
    </div>
    
    <!-- 客户列表 -->
   <div id="customerList" class="list-main-container clearfix">
      <!-- <div id='checkshow'>
        <el-checkbox-group v-model="checkList" @change="changeCkeckList">
        <el-checkbox label='只看自然人'></el-checkbox>
        <el-checkbox label='只看企业'></el-checkbox>
        </el-checkbox-group>
     </div> -->
      <!--模板组件-->
     <ifbp-template ref="customerapply-table"
                    tplId="customerList-template"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    :tplData="customerListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @selection-change="handleSelectionChange"
                    @pt-shenpi-table-click="tableApplyClick">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'

export default {
  mixins: [pagination()],//分页方法引入  
  data() {
    return {
            //多选按钮选择
            // checkList:[],
            //模版主键
            funnode:"BT008",
            nexuskey: "custmor-apply",
            // 当前点击的行
            currentRow: null,
            customerListData:{},
            // 高级搜索
            searchTemplateCode:'YLSCXMB_BUSI_APPLY',
            searchParameters:'{}',
            //快捷查询输入值
            title:'',
            customertype:'',
            //showDeleteButton: true,
            //操作按钮
            templateTableFormResetFun:function($node){
                //获取table,此id为ui模板上面的表格Id
                var $table = this.getNodeById($node, "efrb43qabsh");
                //定义操作
                var operateArr = [
                    {
                        title:"发起申请",
                        icon:"pt-shenpi"
                    },
                ];
                //获取操作按钮html片段
                var operateHtml = this.getTableOperateHtml(operateArr);
                $table.append(operateHtml);
                return $node[0].outerHTML;
            }
        }
  },
  mounted() {
    this.request();
    this.loadData();
  },
   methods: {
       handleSearch(searchTemplate) {
            this.searchParameters = JSON.stringify(searchTemplate);
            this.request();
    },
        // 添加按钮
        addCustomerInfo() {
            location.hash = "/cust/customer/add/";
        },
         // 加载数据方法
        loadData(){
            // 判断brandMsg
            if (this.brandMsg == 'add'){
            this.title = "基于客户放款进展表";
            } else {
            this.title = "基于客户放款进展表";
            this.pk_brand = this.brandMsg;
            }
           
        },
        //编辑按钮
        tableApplyClick:function(scope) {
           var pk_customer = scope.row.pk_cust_customer;
           var customer_type = scope.row.customer_type;
           if("CORP" == customer_type){
                //企业
               var promise = this.applyConfirm(pk_customer,customer_type);
               promise.then((res)=>{
                    var pk_application = res.data.data.pk_application;
                    this.$emit('change-cust-list', ["CORP",pk_customer,pk_application]);
               });
           }
           else if("person" == customer_type || "PERSON" == customer_type){
               //自然人
               var promise = this.applyConfirm(pk_customer,customer_type);
               promise.then((res)=>{
                    var pk_application = res.data.data.pk_application;
                    this.$emit('change-cust-list', ["person",pk_customer,pk_application]);
               });
           }else{
               this.$message({
                    message: "操作失败！",
                    type: "error"
               });
           }
        },
        //选择条数改变
        handleSelectionChange:function(selection){
            this.$message("选中条数为:" + selection.length);
            // var $table = this.$refs["customerapply-table"] && this.$refs["customerapply-table"].comp 
            //             ? this.$refs["customerapply-table"].comp.$refs['customerapply-table']
            //             : null;
            // if($table && this.currentRow) {
            //     this.currentRow = null;
            //     $table.clearSelection();
            //     debugger;
            //     $table.setCurrentRow(this.currentRow);
            // }
        },
       
        //后台请求
        request() {
            let data = {
                'orderList': [
                    {
                    'direction': 'desc',
                    'property': 'ts'
                    }
                ],
                'pageNum': this.currentPage - 1,
                'pageSize': this.pageSize,
                'searchParams': {
                    'searchMap': {
                    'custCondList':[{key:"cusotmer_class",oper:" LIKE ",value:"%yls_dev100000000ffn%"}],
                    'qtAggVO': this.searchParameters
                    }
                }
            };
            debugger;
        this.$http({
            url: ylsBusi + 'prj/apply/pagecust',
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            data: data,
            dataType: 'json'
        }).then(res => {
            var originalValue = res.data.data.content;
            this.$refs['customerapply-table'].setData(
                'customer_t',
                JSON.parse(JSON.stringify(originalValue))
            );
            this.totalElements = res.data.data.totalElements; // 总条数
            this.pageSize = res.data.data.pageSize; // 每页的条数
            }).catch((e) => {
                this.$message({
                    message: "信息获取失败",
                    type: "error"
                });
            });
        },
       
        /**
         * 提交到申请表变为待申请 
        */
        applyConfirm(pk_customer,customer_type) {
            var url = '/yls-busi-web/prj/apply/createapply';
            var data = {
                'issubmit': '0',
                'pk_customer': pk_customer,
                'customer_type':customer_type
            };
            
            var promise = new Promise((resolve, reject) => {
                this.$http({
                    url: url,
                    headers: {'Content-Type': 'application/json'},
                    method: "post",
                    data: JSON.parse(JSON.stringify(data))
                }).then(res => {
                    if (res.data.success === true) {
                        resolve(res);
                        this.$message({
                        message: "操作成功！",
                        type: "success"
                        });
                        this.inoutTypeFormEdit = false;
                    } else {
                        reject({});
                        this.$message({
                        message: res.data.message,
                        type: "error"
                        });
                    }
                }).catch((e) => {
                    console.log(e);
                    reject({});
                    this.$message({
                        message: "操作失败",
                        type: "error"
                    });
                });
            });
            return promise;
        }
    }
};
</script>
<style>
.main-panel .operator-title {
    display: inline-block;
    line-height: 35px;
} 
</style>

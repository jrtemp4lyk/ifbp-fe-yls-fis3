<template>
  <div class="main-panel">
    <div class="title-container">
      <h2 class="name">代理商管理</h2>
    </div>
    <div class="operator-container">
      <div class="operator-title">代理商信息资料表</div>
      <div class="fr">
        <el-button class="button-no-radius" @click="toagentbaseaddFun">添加</el-button>
        <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
      </div>
      
    </div>

    <div class="list-main-container clearfix">
      <ifbp-template ref="customertable"
                    tpl-id="agent-customer-table-id"
                    :pk-temp="agentinfoPk"
                    :tpl-data="agentinfoData"
                    show-type="table"
                    :tpl-reset-fun="agentinfoResetFun"
                    @selection-change="handleSelectionChange"
                    @edit-table-click="tableEditClick">
      </ifbp-template>

       <!--分页组件-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
        </el-pagination>

      <!-- <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除该数据？删除后无法恢复。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteClick">确 定</el-button>
        </span>
      </el-dialog> -->
      
    </div>
  </div>
</template>

<script>
import {pagination,ylsBusi} from '../../../../../common/js/publicData.js'
  export default {
    mixins:[pagination()],//分页方法引入
    data() {
      return {
        //代理商信息资料表
        agentinfoPk: '9416d0f3-3d5b-4d9b-b8fa-5c1b002602b4',
        agentinfoData: {},
        showDeleteButton: false,
        delDialogVisible: false,
        agentinfoResetFun: function($node) {
          var $table = this.getNodeById($node, 't7fci5oq9j');
          var operateArr = [
            {
              title: '编辑',
              icon: 'edit'
            }
          ];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.prepend(operateHtml);
          return $node[0].outerHTML;
        }
      }
    },

    created() {
      var requestDefer = this.request();
      this.initPromise(requestDefer);
    },
    
    methods: {
       // 查询
        handleSearch(searchTemplate){
            this.sp = JSON.stringify(searchTemplate);
            this.request();
        },
      // table行的编辑操作
      tableEditClick(scope) {
         var pk_customer = scope.row.pk_cust_customer;
         location.hash = "/agentmanage/detail-edit/"+scope.row.pk_cust_customer;
        //  this.$emit('chang-apply-submitting', ['toapplycustomerlist',pk_customer,pk_application,customer_type]);
      },

      toagentbaseaddFun() {
        location.hash = "/agentmanageadd";
      },

      handleSelectionChange: function(selection) {
        if (selection && selection.length > 0) {
          this.showDeleteButton = true;
        } else {
          this.showDeleteButton = false;
        }
      },

      initPromise(request) {
        Promise.all([request]).then(() => {
          // this.$refs.cover.remove();
        });
      },

      request() {
        debugger;
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          "pageNum": this.currentPage - 1,
          "pageSize": this.pageSize,
          "searchParams": {
            "searchMap": {
                'custCondList': [
                    {'key':'cusotmer_class',
                    'oper':'=',
                    'value':'yls_dev100000000ffv'
                    }
                ],
                'qtAggVO':this.sp
            }
          }
        };
        let baseUrl =  ylsBusi;
        debugger;
        this.$http({
          url: baseUrl + 'cust/customer/page',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(res => {
          debugger;
          this.originalValue = res.data.data.content;
          this.$refs.customertable.setData(
            "customer_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
        }).catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
      }
    }
  }
</script>

<style>
.main-panel .operator-title {
    display: inline-block;
    line-height: 35px;
}
    
</style>
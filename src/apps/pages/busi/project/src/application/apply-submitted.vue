<template>
  <div class="main-panel">
    <!-- 组件 -->
    <div class="list-main-container clearfix">
      <ifbp-template ref="application-table"
                    tpl-id="applied-id"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    :tpl-data="appliedTableData"
                    show-type="table"
                    :tpl-reset-fun="appliedTableResetFun"
                    @selection-change="handleSelectionChange"
                    @edit-table-click="tableEditClick"
                    @delete-table-click="tableDeleteClick">
      </ifbp-template>

      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>

      <el-dialog
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
      </el-dialog>
      
    </div>
  </div>
</template>

<script>
import { pagination, ylsBusi } from '../../../../../common/js/publicData.js';
  export default {
    mixins: [pagination('request')],//分页方法引入
    data() {
      return {
        funnode:"BT008",
        nexuskey: "application",
        appliedTableData: {},
        showDeleteButton: false,
     
        delDialogVisible: false,
        appliedTableResetFun: function($node) {
          var $table = $node.find('el-table');
          var operateArr = [
            {
              title: "编辑",
              icon: "search"
            }
          ];
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      }
    },

    created() {
      var requestDefer = this.request(this.currentPage - 1, this.size);
      this.initPromise(requestDefer);
    },
    
    methods: {
      // table行的编辑操作
      tableEditClick(scope) {
        // location.hash = "/inoutType/detail/" + scope.row.pk_inout_type;
        var pk_application = scope.row.pk_application;
        var pk_customer = scope.row.pk_customer;
        var customer_type = scope.row.customer_type;
        this.$emit('chang-apply-submitted', ['toapplycustomerlist',pk_customer,pk_application,customer_type]);
      },

      tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_inout_type;
      },

      applyFor() {
        // location.hash = "/inoutType/add";
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
        var data = {
          "orderList": [{
            "direction": "desc",
            "property": "ts"
          }],
          
          "pageNum": this.currentPage - 1,
          "pageSize": this.pageSize,
          "searchParams": {
            "searchMap": {
                custCondList:[{key:"issubmit",oper:"=",value:"1"}]
            }
          }
        };

        this.$http({
          url: ylsBusi+'prj/apply/page',
          headers: { 'Content-Type': 'application/json' },
          method: "post",
          data: data,
          dataType: "json"
        }).then(res => {
          this.originalValue = res.data.data.content;
          this.$refs["application-table"].setData(
            "application_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          this.pageSize = res.data.data.pageSize; // 每页的条数
        }).catch(() => {
          this.$message({
            message: '信息获取失败',
            type: "error"
          });
        });
      },

      deleteClick() {
        var delId = this.delId;
        this.$http({
          url: ylsBusi+'inoutType/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: delId
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: "success"
            });
            this.delDialogVisible = false;
            this.request(this.currentPage - 1, this.size);
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        }).catch(() => {
          this.$message({
            message: "Network Error",
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
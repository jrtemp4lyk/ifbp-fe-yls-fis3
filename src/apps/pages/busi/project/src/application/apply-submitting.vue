<template>
  <div class="main-panel">
    <div class="list-main-container clearfix">
      <ifbp-template ref="application-table"
                    tpl-id="appling-table-id"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    :tpl-data="applingTableData"
                    show-type="table"
                    :tpl-reset-fun="applingTableResetFun"
                    @selection-change="handleSelectionChange"
                    @edit-table-click="tableEditClick"
                    @delete-table-click="tableDeleteClick"
                    @pt-shangchuan-table-click="tableSubmitClick">
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
    mixins: [pagination()],//分页方法引入
    data() {
      return {
        funnode:"BT008",
        nexuskey: "application",
        applingTableData: {},
        showDeleteButton: false,
        
        delDialogVisible: false,
        applingTableResetFun: function($node) {
          var $table = $node.find('el-table');
          var operateArr = [
            {
              title: '编辑',
              icon: 'edit'
            },
            {
              title: '删除',
              icon: 'delete'
            },
            {
              title: '提交',
              icon: 'pt-shangchuan'
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
         var pk_application = scope.row.pk_application;
         var pk_customer = scope.row.pk_customer;
         var customer_type = scope.row.customer_type;
         this.$emit('chang-apply-submitting', ['toapplycustomerlist',pk_customer,pk_application,customer_type]);
      },
      //提交
      tableSubmitClick(scope){
        this.submitappling(scope);
      },
      tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_application;
      },

      submitApplication() {
        // location.hash = "/inoutType/add";
        var url = ylsBusi+'prj/apply/createapply';
            var data = {
                'issubmit': '0',
                'pk_customer': pk_customer
                };
            this.$http({
            url: url,
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: JSON.parse(JSON.stringify(data))
            }).then(res => {
            if (res.data.success === true) {
                this.$message({
                message: '操作成功！',
                type: "success"
                });
                this.inoutTypeFormEdit = false;
            } else {
                this.$message({
                message: res.data.msg,
                type: "error"
                });
            }
            }).catch(() => {
                this.$message({
                    message: "操作失败",
                    type: "error"
                });
            });
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
              custCondList:[{key:"issubmit",oper:"=",value:"0"}
              ]
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
            message: "信息获取失败",
            type: "error"
          });
        });
      },

      deleteClick() {
        var delId = this.delId;
        this.$http({
          url: ylsBusi+'apply/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: delId
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
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
      },

      //提交待申请
      submitappling(scope){
         var pk_application = scope.row.pk_application;
         var url = ylsBusi+'prj/apply/updateapply';
            var data = {
                "pk_application": pk_application
             };
            this.$http({
            url: url,
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: JSON.parse(JSON.stringify(data))
            }).then(res => {
            if (res.data.success === true) {
                this.$message({
                message: "操作成功！",
                type: "success"
                });
                this.$emit('chang-apply-submitting', ['flushapplysubmitting','','','']);
                this.inoutTypeFormEdit = false;
            } else {
                this.$message({
                message: res.data.msg,
                type: "error"
                });
            }
            }).catch(() => {
                this.$message({
                    message: "操作失败",
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
<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">代理商授信信息表</h2>
    </div>
    <!--按钮区域-->
    <div class="creditapply-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addInterrateInfo">新增</el-button>
        <el-button type="primary" class="button-no-radius" @click="creditApply">申请授信</el-button>
      </div>

      <div class="fr">
        <el-input placeholder="输入代理商名称即可搜索" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
        <el-button type="text" @click="showSearch">
          高级
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
      </div>
    </div>

    <!-- 报价列表 -->
   <div id="creditapplyList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="creditapplyList-table"
                    tplId="creditapplyList-template"
                    :pkTemp="pk_temp"
                    :tplData="creditapplyListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @edit-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClick" >
      </ifbp-template>
      <!--分页组件-->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
      </el-pagination>

      <!-- 删除确认Dialog -->
      <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除该数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
        </span>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js'
export default {
    data() {
        return {
          //模版主键
        pk_temp:'54bf78a0-6e0a-44d2-aeb8-f0c23c1c2a06',
        currentPage:1,
        pageSize:[10,20,30,40],
        size:20,
        totalSize:0,
        creditapplyListData:{},
        delDialogVisible:false,
        templateTableFormResetFun($node){
            //获取table,此id为ui模板上面的表格Id
            let $table = this.getNodeById($node, 'sgoj12dnalh');
            //定义操作
            let operateArr = [
                 {
                    icon: 'edit',
                    title:"查看",
                },
                {
                    title:'删除',
                    icon:'delete',
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
    this.request(this.currentPage - 1, this.size);
},
    methods: {
       handleSizeChange(sizeVal){
         this.size=window.pageSize = sizeVal;
         var maxPage = Math.ceil(this.totalSize / sizeVal);
         if (maxPage >= this.currentPage) {
            this.request(this.currentPage - 1, this.size);
        }
    },
       handleCurrentChange(currVal){
         this.currentPage = currVal;
         this.request(this.currentPage - 1, this.size);
       },
        //查看按钮
        tableSearchClick(scope) {
           location.hash = '/agentbaseadd/' + scope.row.agent_name;
        },
        // 申请授信按钮
        creditApply() {
            location.hash = '/operation/add';
        },

        //删除操作
    tableDeleteClick: function(scope) {
      this.delDialogVisible = true;
      this.pk_operation_protocol = scope.row.pk_operation_protocol;
    }, 

    //删除确定
    deleteConfirmClick() {
      debugger;
      this.$http({
        url: ylsBusi+'cust/operation/deleteById',
        headers: {'Content-Type': 'application/json'},
        method: "post",
        dataType: "json",
        data: this.pk_operation_protocol
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
        }).catch((e) => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    
    request(n, s) {
        let data = {
            "orderList": [
            {
            "direction": "desc",
             "property": "ts"
             }
                ],
                "pageNum": n,
                "pageSize": s,
                "searchParams": {
                "searchMap": {}
                }
            };
            this.$http({
                url: ylsBusi+'cust/operation/page',
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                data,
                dataType: 'json',
            }).then(res => {
                //QuoteCalculator_table UI模板表格名称
                var originalValue = res.data.data.content;
                this.$refs['creditapplyList-table'].setData(
                    'OperationProtocol_t',
                    originalValue
                );
                this.totalSize = res.data.data.totalElements; // 总条数
                this.size = res.data.data.size; // 每页的条数
            }).catch((e) => {
                console.log(e);
                this.$message({
                    message: '信息获取失败',
                    type: 'error',
                });
            });
        } 
    }
};
</script>
<style>
</style>
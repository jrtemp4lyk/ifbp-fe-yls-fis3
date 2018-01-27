<template>
  <div class="main-panel">
    <!-- 报价列表 -->
   <div id="operationList" class="list-main-container clearfix">
      <!--模板组件-->
    <ifbp-panel id="basePanel" title="合作协议" :icons="detailIcons">
        <ifbp-template ref="operationTable"
                    tplId="operationList-template"
                    :pkTemp="pk_temp"
                    :tplData="operationListData"
                    show-type="table-form"
                    :tplResetFun="templateTableFormResetFun"
                    @edit-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClick" >
        </ifbp-template>
        <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
        </div>
    </ifbp-panel>
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
        let oThis = this;
        return {
          //模版主键
        pk_temp:'51775896-9d65-4a80-b88f-35daf4608d09',
        currentPage:1,
        pageSize:[10,20,30,40],
        size:20,
        totalSize:0,
        operationListData:{},
        delDialogVisible:false,
        //子表详情
      detailIcons: [
        {
          icon: "plus",
          click: function() {
              debugger;
            var uitemplateComp = oThis.$refs.operationTable.comp;
            var table = uitemplateComp.$refs['OperationProtocol_t_ref'];
            table.closeExpandRow();
            uitemplateComp.linkman = {};
            uitemplateComp.formShow = true;
          }
        }
      ],

      
        templateTableFormResetFun($node){
            //获取table,此id为ui模板上面的表格Id
            let $table = this.getNodeById($node, 'dgngfb74qds');
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
           debugger;
           var uitemplateComp = this.$refs.operationTable.comp;
           var table = uitemplateComp.$refs['OperationProtocol_ref'];
           table.closeExpandRow;
           uitemplateComp.formShow = true;
           var row = scope.row;
           this.$refs.operationTable.setData(
           "OperationProtocol",
           JSON.parse(JSON.stringify(row))
      );
        },
        // 添加按钮
        addInterrateInfo() {
            location.hash = '/operation/add';
        },


        //返回按钮
      goBack(){
        window.history.back(-1);
      },
      // 主模板 baseTemplateRef 事件处理 start
      clickCancel(){
        this.editable = false;
      },
      clickSave(){
          debugger;
        let data1 = this.$refs.operationTable.comp.OperationProtocol;
        this.$http({
            url: ylsBusi+'cust/operation/UpdateOrCreate',
            // headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:data1,
        }).then(res => {
            location.hash = '/operation/list';
            this.editable = false;
            let originalValue = res.data.data;
            this.$refs["operationTable"].setData(
              'OperationProtocol_t',
              originalValue
            );
            this.$message({
            message: '保存成功',
            type: 'success',
          });
        }).catch(e => {
          this.$message({
            message: '保存失败',
            type: 'error',
          });
        });
      },
      // 主模板 baseTemplateRef 事件处理 end

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

    //加载信息
      loadDemoInfo(id){
        this.$http({
            url: ylsBusi+'cust/operation/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:id
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'OperationProtocol',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '详情获取失败',
            type: 'error',
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
                "searchMap": {
                    "p_id": this.id
                }
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
                this.$refs['operationTable'].setData(
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
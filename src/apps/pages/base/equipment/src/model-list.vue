<template>
  <div class='main-panel'>
    <!-- 按钮区域 -->
    <div class='operator-container'>
      <div class='fl'>
        <h3 class='name'>型号列表</h3>
        <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button>-->
      </div>
      <div class='fr'>
        <el-button type='primary' class='button-no-radius' @click='addModelInfo'> 新 增 </el-button>
      </div>
      <ifbp-search class='fr' :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
      
    </div>

    <!-- 型号列表 -->
   <div id='modelList' class='list-main-container clearfix'>
      <!--模板组件-->
     <ifbp-template ref='modelList-table'
                    tplId='modelList-template'
                    :funnode='funNode'
                    :nexuskey='nexusKey'
                    :tplData='modelListData'
                    show-type='table'
                    :tplResetFun='templateTableFormResetFun'
                    @search-table-click='tableSearchClick'
                    @delete-table-click='tableDeleteClick' >
      </ifbp-template>
      <!--分页组件-->
      <el-pagination
        :current-page='currentPage'
        :page-sizes='pageSizes'
        :page-size='pageSize'
        layout='total, sizes, prev, pager, next, jumper'
        :total='totalElements'
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        >
      </el-pagination>

      <!--删除确认Dialog-->
      <el-dialog
        title='提示'
        v-model='delDialogVisible'
        @update:visible='val => delDialogVisible = val'
        :modal='true'
        size='tiny'>
        <span>确认删除该数据？</span>
        <span slot='footer' class='dialog-footer'>
            <el-button @click='delDialogVisible = false'>取 消</el-button>
            <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>
        </span>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import { pagination, ylsBase } from '../../../../common/js/publicData.js'
export default {
  mixins: [ pagination() ],// 分页方法引入
  data() {
    return {
            //模版主键
            funNode: 'BT011',
            nexusKey: 'Equip_Model',
            searchTemplateCode: 'YLSCXMB_BASE_EQUIP',
            searchParameters: '',
            modelListData: {},
            //删除对话框
            delDialogVisible: false,
            //待删除数据id
            delId: '',
            //showDeleteButton: true,
            //操作按钮
            templateTableFormResetFun: function($node) {
                //获取table,此id为ui模板上面的表格Id
                let $table = $node.find('el-table');
                //定义操作
                let operateArr = [
                    {
                        icon: 'search',
                        title: '查看'
                    },
                    {
                        title: '删除',
                        icon: 'delete'
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
        // 添加按钮
        handleSearch(searchTemplate) {
          this.searchParameters = JSON.stringify(searchTemplate);
          this.request();
        },
        addModelInfo() {
            // location.hash = '/quote/add';

            this.$emit('change-model-list', 'add');
        },
        //查看按钮
        tableSearchClick(scope) {
           this.$emit('change-model-list', scope.row.pk_model)
        },
        //删除操作
        tableDeleteClick(scope){
            this.delId = scope.row.pk_model;
            this.delDialogVisible = true;
        },
        //删除确定
        deleteConfirmClick(){
            this.$http({
                url: ylsBase + 'model/deleteById',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: this.delId
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.delDialogVisible = false;
                    this.request();
                } else {
                    this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '信息删除失败！',
                    type: 'error'
                });
            });
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
                  'qtAggVO': this.searchParameters
                }
                }
            };
            this.$http({
                url: ylsBase + 'model/page',
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                data: data,
                dataType: 'json'
            }).then(res => {
              if (res.data.success === true) {
                let originalValue = res.data.data.content;
                this.$refs['modelList-table'].setData(
                    'Model_t',
                    JSON.parse(JSON.stringify(originalValue))
                );
                this.totalElements = res.data.data.totalElements; // 总条数
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                })
              }
            }).catch((e) => {
                this.$message({
                    message: '信息获取失败',
                    type: 'error'
                });
            });
        }
    }
};
</script>
<style>

</style>

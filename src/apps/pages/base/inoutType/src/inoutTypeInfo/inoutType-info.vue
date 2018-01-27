<template>
  <div class='main-panel'>
    <div class='title-container'>
      <h2 class='name'>收支-全局</h2>
    </div>

    <div class='operator-container'>
      <div class='fl'>
        <el-button type='primary' class='button-no-radius' @click='addInoutTypeInfo'>新增</el-button>
      </div>
      <ifbp-search class='fr' :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
    </div>


    <div class='list-main-container clearfix'>
      <ifbp-template ref='inoutType-table'
                    tpl-id='inoutType-table-id'
                    :funnode='funNode'
                    :nexuskey='nexusKey'
                    :tpl-data='inoutTypeTableData'
                    show-type='table'
                    :tpl-reset-fun='inoutTypeTableResetFun'
                    @search-table-click='tableSearchClick'
                    @delete-table-click='tableDeleteClick'>
      </ifbp-template>

      <el-pagination
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :current-page='currentPage'
        :page-sizes='pageSizes'
        :page-size='pageSize'
        layout='total, sizes, prev, pager, next, jumper'
        :total='totalElements'>
      </el-pagination>

      <el-dialog
        title='提示'
        v-model='delDialogVisible'
        @update:visible='val => delDialogVisible = val'
        :modal='true'
        size='tiny'>
        <span>确认删除该数据？删除后无法恢复。</span>
        <span slot='footer' class='dialog-footer'>
          <el-button @click='delDialogVisible = false'>取 消</el-button>
          <el-button type='primary' @click='deleteClick'>确 定</el-button>
        </span>
      </el-dialog>
      
    </div>
  </div>
</template>

<script>
import { pagination,ylsBase } from '../../../../../common/js/publicData.js'
  export default {
    mixins: [ pagination() ],//分页方法引入
    mounted() {
      this.request();
    },
    data() {
      return {
        funNode: 'BT002',
        nexusKey: 'Inout_type',
        inoutTypeTableData: {},
        searchTemplateCode: 'YLSCXMB_BASE_INOUTTYPE',
        searchParameters: '',
        delDialogVisible: false,
        inoutTypeTableResetFun: function($node) {
          let $table = $node.find('el-table');
          let operateArr = [
            {
              title: '查看',
              icon: 'search'
            },
            {
              title: '删除',
              icon: 'delete'
            }
          ];
          let operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      }
    },
    
    methods: {

      handleSearch(searchTemplate){
        this.searchParameters = JSON.stringify(searchTemplate);
        this.request();
      },
      // table行的编辑操作
      tableSearchClick(scope) {
        location.hash = '/inoutType/detail/' + scope.row.pk_inout_type;
      },

      tableDeleteClick(scope) {
        this.delDialogVisible = true;
        this.delId = scope.row.pk_inout_type;
      },

      addInoutTypeInfo() {
        location.hash = '/inoutType/add';
      },
      request() {
        let data = {
          'orderList': [{
            'direction': 'desc',
            'property': 'ts'
          }],
          'pageNum': this.currentPage - 1,
          'pageSize': this.pageSize,
          'searchParams': {
            'searchMap': {
              'qtAggVO': this.searchParameters
            }
          }
        };

        this.$http({
          url: ylsBase + 'inoutType/page',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(res => {
          if (res.data.success === true) {
            this.originalValue = res.data.data.content;
            this.$refs['inoutType-table'].setData(
              'InoutType_t',
              this.originalValue
            );
            this.totalElements = res.data.data.totalElements; // 总条数
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            })
          }
        }).catch(() => {
          this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
      },

      deleteClick() {
        let delId = this.delId;
        this.$http({
          url: ylsBase + 'inoutType/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: delId
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
        }).catch(() => {
          this.$message({
            message: 'Network Error',
            type: 'error'
          });
        });
      }

    }
  }
</script>

<style>
</style>
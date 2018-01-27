<template>
  <div class='main-panel'>
    <!--节点title-->
    <div class='title-container'>
      <h2 class='name'>立项申请</h2>
    </div>
    <!--按钮区域-->
    <div class='operator-container'>
      <div class='fl'>
        <el-button type='primary' class='button-no-radius' @click='addInfo'>新增</el-button>
        <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button-->
      </div>
      <!-- <div class='fr'>
        <ifbp-search :template-code='searchTemplateCode' @search='handleSearch'></ifbp-search>
      </div> -->
    </div>

    <!-- 利率列表 -->
    <div id='list' class='list-main-container clearfix'>
      <!--模板组件-->
      <ifbp-template ref='prjApproval-table'
                    tplId='prjApproval-table-template'
                    :funnode='funnode'
                    :nexuskey='nexuskey'
                    :tplData='tableData'
                    show-type='table'
                    :tplResetFun='templateTableFormResetFun'
                    @search-table-click='tableSearchClick'
                    @delete-table-click='tableDeleteClick' >
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='currentPage' :page-sizes='pageSizes'
        :page-size='pageSize' layout='total, sizes, prev, pager, next, jumper' :total='totalElements'>
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
import {pagination,ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  mixins: [pagination()],//分页方法引入
  data() {
    return {
      //模版主键
      funnode:'BT008',
      nexuskey:'prjApproval',
      tableData: {},
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId:'',
      // 查询模板编码
      searchTemplateCode: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      sp:'{}',
      //操作按钮
      templateTableFormResetFun: function($node) {
        let $table = $node.find('el-table');
        //定义操作
        let operateArr = [
          {
            icon: 'search',
            title:'查看'
          },
          // {
          //   title:'删除',
          //   icon:'delete'
          // }
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
      if(searchTemplate!==''){
        this.sp = JSON.stringify(searchTemplate);
      }
      this.request();
    },
    // 添加按钮
    addInfo() {
      location.hash = '/projectApproval/add';
    },
    //查看按钮
    tableSearchClick(scope) {
      location.hash = '/projectApproval/detail/' + scope.row.pk_prj_approval;
    },
    //删除操作
    tableDeleteClick(scope){
      this.delId = scope.row.pk_prj_approval;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: '/yls-busi-web/prj/approval/deleteById',
        headers: {'Content-Type': 'application/json'},
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
              'qtAggVO':this.sp
            }
          }
      };
      this.$http({
        url: '/yls-busi-web/prj/approval/page',
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        data: data,
        dataType: 'json'
      }).then(res => {
        let originalValue = res.data.data.content;
        this.$refs['prjApproval-table'].setData(
          'projectApproval_t',
          JSON.parse(JSON.stringify(originalValue))
        );
        this.totalElements = res.data.data.totalElements; // 总条数
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

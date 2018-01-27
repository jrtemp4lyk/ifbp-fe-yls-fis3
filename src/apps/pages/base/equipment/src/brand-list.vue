<template>
  <div class='main-panel'>
    <!--按钮区域-->
    <div class='operator-container'>
      <div class='fl'>
        <h3 class='name'>厂牌列表</h3>
        <!--<el-button class='button-no-radius' @click='multiDeleteDialgShow' v-show='showDeleteButton'>删除</el-button>-->
      </div>
      <div class='fr'>
        <el-input placeholder='测算编码/名称' v-model='search_input' icon='search'  @keyup.enter.native='searchInputEnterClick' :on-icon-click='searchInputEnterClick'></el-input>
        <el-button type='text' @click='showSearch'>
          高级  
          <i class='el-icon-arrow-down' v-if='this.isHide'></i>
          <i class='el-icon-arrow-up' v-if='!this.isHide'></i>
        </el-button>
        <el-button type='primary' class='button-no-radius' @click='addBrandInfo'> 新 增</el-button>
      </div>
    </div>

    <!--高级搜索区域-->
    <div class='advanced-search-panel' :class='{hide: isHide}'>
    
    </div>

    <!-- 报价列表 -->
   <div id='brandList' class='list-main-container clearfix'>
      <!--模板组件-->
     <ifbp-template ref='brandList-table'
                    tplId='brandList-template'
                    :funnode='funNode'
                    :nexuskey='nexusKey'
                    :tplData='brandListData'
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
import { pagination,ylsBase } from '../../../../common/js/publicData.js'
export default {
  mixins: [ pagination() ],// 分页方法引入
  data() {
    return {
            //模版主键
            funNode: 'BT011',
            nexusKey: 'Equip_Brand',
            brandListData: {},
            // 高级搜索
            // 搜索模板
            searchTemplate: {},
            // 条件列表
            conditionList: [],
            // 是否显示已选中标签
            showSelectedTags: true,
            // 当前打开的高级条件编号
            currentConditionCode: '',
            // 当前打开的高级条件内容
            currentCondition: null,
            //高级查询是否展示
            isHide: true,
            //快捷查询输入值
            search_input: '',
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
       // 高级搜索
        showSearch() {
            this.isHide = !this.isHide;
        },
        // 添加按钮
        addBrandInfo() {
            // location.hash = '/quote/add';

            this.$emit('change-brand-list', 'add');
        },
        //快捷搜索
        searchInputEnterClick() {
            this.$message('搜索：' + this.search_input);
        },
        //查看按钮
        tableSearchClick(scope) {
           this.$emit('change-brand-list', scope.row.pk_brand)
        },
        //删除操作
        tableDeleteClick(scope){
            this.delId = scope.row.pk_brand;
            this.delDialogVisible = true;
        },
        //删除确定
        deleteConfirmClick(){
            this.$http({
                url: ylsBase + 'brand/deleteById',
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
                'searchMap': {}
                }
            };
            this.$http({
                url: ylsBase + 'brand/page',
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                data: data,
                dataType: 'json'
            }).then(res => {
                //brandList_table UI模板表格名称
                if (res.data.success === true) {
                  let originalValue = res.data.data.content;
                  this.$refs['brandList-table'].setData(
                      'Brand_t',
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

<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">合同</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addInterrateInfo">新增</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="合同编码/名称" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
        <el-button type="text" @click="showSearch">
          高级
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
      </div>
    </div>

    <!--高级搜索区域-->
    <div class="advanced-search-panel" :class="{hide: isHide}">
    
    </div>

    <!-- 合同列表 -->
    <div id="contractList" class="list-main-container clearfix">
      <!--模板组件:pkTemp="pk_temp"-->
     <ifbp-template ref="contractinfo_table"
                    tplId="contractinfo-template"
                     :funnode="funnode"
                     :nexuskey="nexusKey"
                    :tplData="contractnfoListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @search-table-click="tableSearchClick"
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

      <!--删除确认Dialog-->
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


export default {
  data() {
    return {
            //模版主键
            funnode:"BT009",
            nexusKey:"contract",
            //当前页
            currentPage:1,
            //每页显示个数选择器的选项设置
            pageSizes:window.pubPageSizes,
            //每页显示条目个数
            size: window.pubSize,
            //总条目数
            totalSize:0,
            contractnfoListData:{},
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
            search_input: "",
            //删除对话框
            delDialogVisible: false,
            //待删除数据id
            delId:"",
            //showDeleteButton: true,
            //操作按钮
            templateTableFormResetFun:function($node){
                //获取table,此id为ui模板上面的表格Id
                var $table = this.getNodeById($node, "qi6snhn95f");
                //定义操作
                var operateArr = [
                    {
                        icon: 'search',
                        title:"查看"
                    },
                    {
                        title:"删除",
                        icon:"delete"
                    }
                ];
                //获取操作按钮html片段
                var operateHtml = this.getTableOperateHtml(operateArr);
                $table.append(operateHtml);
                return $node[0].outerHTML;
            }
        }
  },
  created() {
    this.request(this.currentPage - 1, this.size);
  },
   methods: {
       // 高级搜索
        showSearch() {
            this.isHide = !this.isHide;
        },
        // 添加按钮
        addInterrateInfo() {
            location.hash = "/contractinfo/add";
        },
        //快捷搜索
        searchInputEnterClick() {
            this.$message("搜索："+this.search_input);
        },
        //查看按钮
        tableSearchClick(scope) {
           location.hash = "/contractinfo/detail/" + scope.row.pk_contract;
        },
        //每页显示条数改变
        handleSizeChange(sizeVal){
            this.size=window.pageSize = sizeVal;
            var maxPage = Math.ceil(this.totalSize / sizeVal);
            if (maxPage >= this.currentPage) {
                this.request(this.currentPage - 1, this.size);
            }
        },
        //当前页发生改变
        handleCurrentChange(currVal){
            this.currentPage = currVal;
            this.request(this.currentPage - 1, this.size);
        },
        //删除操作
        tableDeleteClick(scope){
            this.delId = scope.row.pk_contract;
            this.delDialogVisible = true;
        },
        //删除确定
        deleteConfirmClick(){
            this.delDialogVisible=false;
            this.$http({
                url: "/yls-busi-web/contr/contractinfo/deleteById",
                headers: { 'Content-Type': 'application/json' },
                method: "post",
                dataType: "json",
                data: this.delId
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error"
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: "信息删除失败！",
                    type: "error"
                });
            });
        },
        //后台请求
        request(n, s) {
            debugger;
            var url;
            var baseUrl = "/yls-busi-web";
            url = baseUrl + '/contr/contractinfo/page';
            var data = {
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
                url: url,
                headers: {'Content-Type': 'application/json'},
                method: "post",
                data: data,
                dataType: "json"
            }).then(res => {
                //QuoteCalculator_table UI模板表格名称
                debugger;
                var originalValue = res.data.data.content;
                this.$refs["contractinfo_table"].setData(
                    "contract_t",
                    JSON.parse(JSON.stringify(originalValue))
                );
                this.totalSize = res.data.data.totalElements; // 总条数
                console.log(res.data.data.size);
                this.size = res.data.data.size; // 每页的条数
            }).catch((e) => {
                console.log(e);
                 debugger;
                this.$message({
                    message: "信息获取失败",
                    type: "error"
                });
            });
        }
    }
};
</script>
<style>

</style>


<template>
  

  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">付款安排</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addInterrateInfo">新增</el-button>
        <el-button type="primary" class="button-no-radius" @click="submitClick">合并付款</el-button>
        <!--
            <el-button type="primary" class="button-no-radius" @click="submitClick">单一付款</el-button>
        -->
        
     </div>
      <div class="fr">
        <el-input placeholder="付款编码/名称" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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

    <!-- 列表 -->
   <div id="quoteList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="planListTableRef"
                    tplId="quoteList-template"
                    funnode="BT014"
                    nexuskey="payment-plan"
                    :tplData="planListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @selection-change="handleSelectionChange"
                    @search-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClick" >
      </ifbp-template>
      <!--分页组件-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
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

import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'

export default {
  mixins: [pagination('refreshPage')],
  data() {
    return {
            planListData:{
                handleSelectable(row,index){
                    if(row.pk_payment_execute==null){
                        return true;
                    }
                }
            },
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
                var $table = $node.find("el-table");
                $table.find("el-table-column[type='selection']").attr("v-bind:selectable","handleSelectable")
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
  mounted() {
    this.refreshPage();
  },
   methods: {
       // 高级搜索
        showSearch() {
            this.isHide = !this.isHide;
        },
        // 添加按钮
        addInterrateInfo() {
            location.hash = "/payment-plan/add";
        },
        //提交
        submitClick(){
            var tableSelections = this.$refs.planListTableRef.getTableComp().getSelection();
            
            if (tableSelections && tableSelections.length > 0) {
                var pks = [];
                tableSelections.forEach((item,index) => {
                    pks[index]=item.pk_payment_plan;
                });
                this.$http({
                    url: "/yls-busi-web/fin/execute/pushExecute",
                    headers: { 'Content-Type': 'application/json' },
                    method: "post",
                    dataType: "json",
                    data: pks
                }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: "提交成功",
                        type: "success"
                    });
                    this.refreshPage();
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error"
                    });
                }
                }).catch((e) => {
                    this.$message({
                    message: "信息提交失败！",
                    type: "error"
                });
                });
            }else{
                this.$message({
                    message: "请选择付款安排！",
                    type: "error"
                });
            }
        },
        //快捷搜索
        searchInputEnterClick() {
            this.$message("搜索："+this.search_input);
        },
        //查看按钮
        tableSearchClick(scope) {
           location.hash = "/payment-plan/card/" + scope.row.pk_payment_plan;
        },
        //删除操作
        tableDeleteClick(scope){
            this.delId = scope.row.pk_payment_plan;
            this.delDialogVisible = true;
        },
        handleSelectionChange(selection) {
            this.$message('选中条数为:' + selection.length);
        },
        //删除确定
        deleteConfirmClick(){
            this.$http({
                url: "/yls-busi-web/fin/plan/deleteById",
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
                    this.delDialogVisible = false;
                    this.refreshPage();
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
    refreshPage() {
        
                this.$http.post(ylsBusi + '/fin/plan/page', {
                    pageNum: this.currentPage - 1,
                    pageSize: this.pageSize,
                }).then((resp) => {
                    

                    if (resp.data.success) {
                        this.$refs.planListTableRef.setData('PaymentPlan_t',resp.data.data.content)
                        this.totalElements = resp.data.data.totalElements;
                    }
                })
        }
    }
};
</script>
<style>

</style>

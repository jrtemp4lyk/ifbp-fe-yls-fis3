<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">银行到账</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
     
        <el-button type="primary" class="button-no-radius" @click="addInfo">新增</el-button> 
        <el-button type="primary" class="button-no-radius" @click="batchCheck">批量复核</el-button>
        <el-button type="primary" class="button-no-radius" @click="cancelCheck">取消复核</el-button>
        <el-button type="primary" class="button-no-radius" @click="batchClassify">批量分类</el-button>
        <el-button type="primary" class="button-no-radius" @click="cancelClassify">取消分类</el-button>
        <el-button type="primary" class="button-no-radius" @click="imports">导入</el-button>
        <el-button type="primary" class="button-no-radius" @click="batchDelete">删除</el-button>
        <el-button type="primary" class="button-no-radius" @click="batchSubmit">提交</el-button>
        <el-button type="primary" class="button-no-radius" @click="cancelSubmit">取消提交</el-button>
      
      <div class="fr">
        <el-input placeholder="请选择交易日期" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
        <el-button type="text" @click="showSearch">
          高级
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
      </div>
    </div>
    <!--高级搜索区域-->
    <div class="advanced-search-panel" :class="{hide: isHide}">

    <!-- 已选参数展示 -->
    <div v-if="showSelectedTags" class="options-selected">
      <template v-for="condition in conditionList">
        <el-tag v-if="condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)"
          :key="condition.fieldcode"
          :closable="true"
          type="gray"
          @close="cancelConditionSelection(condition.optionList)">
          {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}
        </el-tag>
        <el-tag
          v-for="option in condition.optionList.options"
          :key="option.value"
          v-if="option.selected"
          :closable="true"
          type="gray"
          @close="cancelConditionSelection(condition.optionList)">
          {{option.name}}
        </el-tag>
      </template>
    </div>

    <!-- 搜索参数 -->
   

    <!-- 当前选中的条件选项 -->
    
  </div>

   <!-- 银行到账列表 -->
   <div id="quoteList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="bankflow_table"
                    tplId="bankflow-template"
                    :funnode="funnode"
                    :nexuskey ="nexusKey"
                    :tplData="bankflowListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @search-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClick"
                    @edit-table-click="tableEditClick" >
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

      <!--批量删除确认Dialog-->
      <el-dialog
        title="提示"
        v-model="batchDelDialogVisible"
        @update:visible="val => batchDelDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除所选数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="batchDelDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="batchDeleteConfirm">确 定</el-button>
        </span>
       </el-dialog>

        <!--批量分类Dialog-->        
        <el-dialog title="请选择分类" :visible.sync="classifyDialogVisible" 
        @update:visible="val => classifyDialogVisible = val" >
        <ifbp-template ref="bankFlowClassifyRef"
                    tplId="bank_flow_class_id"
                    :funnode="funnodeclass"
                    :nexuskey="nexusKeyclass"
                    :tplData="bankflowClassifyListData"
                    show-type="form"
                    editable="true"
                     >
        </ifbp-template>
        <div slot="footer" class="dialog-footer">
            <el-button @click="classifyDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="batchClassifyConfirm">确 定</el-button>
        </div>
        </el-dialog>

    </div>
  </div>
</template>
<script>
import {pagination, ylsBusi} from '../../../../../common/js/publicData.js'
export default {
  mixins: [pagination('request')],//分页方法引入
  data() {
    return {
            funnode:"BT017",
            nexusKey:"bankflow",
            funnodeclass:"BT017",
            nexusKeyclass:"bankFlowClass",
            
            bankflowListData:{},
            bankflowClassifyListData:{
                BankFlow_f:{
                    pk_dept_doc: ''
                }
            },
            totalElements:'',
            // 高级搜索
            // 搜索模板
            searchTemplate: {},
            form:{
                choice: ''
            },
            // 条件列表
            conditionList: [],
            // 是否显示已选中标签
            showSelectedTags: true,
            // 批量分类Dialog
            classifyDialogVisible:false,
            // 批量删除Dialog
            batchDelDialogVisible:false,
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
            showDeleteButton: true,
            //操作按钮
            templateTableFormResetFun:function($node){
                //获取table,此id为ui模板上面的表格Id
                var $table = $node.find("el-table");
                //定义操作
                var operateArr = [
                    {
                        icon: 'edit',
                        title:"编辑"
                    },
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
        // 添加按钮
        addInfo() {
            location.hash = "/bankflow/add";
        },
        // 批量复核
        batchCheck() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            //var checkIds = [];
            //if (tableSelections && tableSelections.length > 0) {
            //    tableSelections.forEach((item,index) => {
            //    checkIds[index]=item;
            //    });
            //}
            this.$http({
                url: '/yls-busi-web/fin/bankflow/batchCheck',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: tableSelections,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '复核成功',
                        type: 'success',
                    });
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '复核失败！',
                    type: 'error',
                });
            });
        },
        // 取消复核
        cancelCheck() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            this.$http({
                url: '/yls-busi-web/fin/bankflow/cancelCheck',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: tableSelections,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '复核已取消',
                        type: 'success',
                    });
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '取消失败！',
                    type: 'error',
                });
            });
        },
        // 批量分类
        batchClassify() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            if (tableSelections && tableSelections.length > 0) {
                this.classifyDialogVisible = true;
            } else {
                this.$message({
                    message: "至少选择一条进行分类！",
                    type: "error",
                });
            }
        },
        // 批量分类确定
        batchClassifyConfirm() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            var value =this.$refs.bankFlowClassifyRef.comp.BankFlow_f.pk_dept_doc;
            var selIds = [];
            if (tableSelections && tableSelections.length > 0) {
                tableSelections.forEach((item,index) => {
                selIds[index]=item.pk_bank_flow;
                });
            }
            var oData = {
                strArray: selIds,
                pk: value
            }
            this.$http({
                url: '/yls-busi-web/fin/bankflow/batchClassify',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: oData,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '分类完成！',
                        type: 'success',
                    });
                    this.classifyDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '分类失败！',
                    type: 'error',
                });
            });
        },
        // 取消分类
        cancelClassify() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            var data ={
                strArray:tableSelections
            }
            this.$http({
                url: '/yls-busi-web/fin/bankflow/cancelClassify',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: tableSelections,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '取消分类完成！',
                        type: 'success',
                    });
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '取消分类失败！',
                    type: 'error',
                });
            });
        },
        // 导入
        imports() {
            location.hash = "/bankflow/add";
        },
        // 批量删除
        batchDelete() {
            this.batchDelDialogVisible = true;
        },
        // 批量删除确定
        batchDeleteConfirm() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            var selIds = [];
            if (tableSelections && tableSelections.length > 0) {
                tableSelections.forEach((item,index) => {
                selIds[index]=item.pk_bank_flow;
                });
            }
            var oData = {
                strArray: selIds
            }
            this.$http({
                url: '/yls-busi-web/fin/bankflow/batchDelete',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: oData,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success',
                    });
                    this.batchDelDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '删除失败！',
                    type: 'error',
                });
            });
        },
        // 提交
        batchSubmit() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            this.$http({
                url: '/yls-busi-web/fin/bankflow/batchSubmit',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: tableSelections,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '已提交！',
                        type: 'success',
                    });
                    this.delDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '提交失败！',
                    type: 'error',
                });
            });
        },
        // 取消提交
        cancelSubmit() {
            var tableSelections = this.$refs.bankflow_table.getTableComp().getSelection();
            var selIds = [];
            if (tableSelections && tableSelections.length > 0) {
                tableSelections.forEach((item,index) => {
                selIds[index]=item.pk_bank_flow;
                });
            }
            var data ={
                strArray:selIds
            }
            this.$http({
                url: '/yls-busi-web/fin/bankflow/cancelSubmit',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: data,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '已取消！',
                        type: 'success',
                    });
                    this.delDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '取消失败！',
                    type: 'error',
                });
            });
        },
        //快捷搜索
        searchInputEnterClick() {
            this.$message("搜索："+this.search_input);
        },
        //查看按钮
        tableSearchClick(scope) {
           location.hash = "/bankflow/detail/" + scope.row.pk_bank_flow;
        },
        //编辑按钮
        tableEditClick: function(scope) {
           location.hash = "/bankflow/detail/" + scope.row.pk_bank_flow;
        },
        //删除操作
        tableDeleteClick(scope){
            this.delId = scope.row.pk_bank_flow;
            this.delDialogVisible = true;
        },
        //删除确定
        deleteConfirmClick(){
            this.$http({
                url: '/yls-busi-web/fin/bankflow/deleteById',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: this.delId,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    });
                    this.delDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '信息删除失败！',
                    type: 'error',
                });
            });
        },
        //后台请求
        request(n, s) {
            var url;
            var baseUrl = "/yls-busi-web";
            url = baseUrl + '/fin/bankflow/page';
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
                //UI模板表格名称
                var originalValue = res.data.data.content;
                this.$refs["bankflow_table"].setData(
                    "BankFlow_f_t",
                    JSON.parse(JSON.stringify(originalValue))
                );
                this.totalElements = res.data.data.totalElements; // 总条数
                console.log(res.data.data.size);
                this.size = res.data.data.size; // 每页的条数
            }).catch((e) => {
                console.log(e);
                this.$message({
                    message: "信息获取失败",
                    type: "error"
                });
            });
        },
        // 高级搜索
        showSearch() {
        this.isHide = !this.isHide;
        },
        /**
         * 高级搜索
        */
        // 设置选中
        selectConditionOption(optionList, option, ctrltype) {
        let optionSelected = false;
        let options = optionList.options;
        if (option && option.selected) {
            optionSelected = true;
        }
        if (ctrltype === 'DateComponent') {
            if (!optionList.def_min_value && !optionList.def_max_value && !option) {
            return;
            }
            if (optionList.def_min_value) {
            optionList.def_min_value = this.formatDate(optionList.def_min_value);
            }
            if (optionList.def_max_value) {
            optionList.def_max_value = this.formatDate(optionList.def_max_value);
            }
        }
        for (let i = 0; i < options.length; i++) {
            options[i].selected = false;
        }
        if (option) {
            option.selected = !optionSelected;
            optionList.def_min_value = null;
            optionList.def_max_value = null;
            this.setCurrentCondition();
        }
        },
        // 已选中日期格式整理
        formatSelectedDate(startDay, endDay) {
        let dateString = '';
        if (startDay && endDay) {
            dateString = startDay + ' 至 ' + endDay;
        } else if (startDay) {
            dateString = startDay + '之后';
        } else {
            dateString = endDay + '之前';
        }
        return dateString;
        },
        // 整理date格式
        formatDate(time) {
        let date = new Date(time);
        return date.getFullYear() + '-' + ((date.getMonth()) >= 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())) + ' ' + (date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds()));
        },

        // 取消选中
        cancelConditionSelection(optionList) {
        let options = optionList.options;
        for (let i = 0; i < options.length; i++) {
            options[i].selected = false;
        }
        optionList.def_min_value = null;
        optionList.def_max_value = null;
        this.setCurrentCondition();
        },

        // 设置当前选中的高级条件
        setCurrentCondition(condition) {
        if (!condition || (this.currentConditionCode === condition.fieldcode)) {
            this.currentConditionCode = '';
            this.currentCondition = null;
        } else {
            this.currentConditionCode = condition.fieldcode;
            this.currentCondition = condition;
        }
        },
        search() {
        this.request();
        }
    }
};
</script>
<style>

</style>

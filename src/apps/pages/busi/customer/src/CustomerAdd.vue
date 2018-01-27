<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">客户信息</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addCustomerInfo">新增</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="客户编码/名称" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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
        <el-tag v-if="condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)"
          :key="condition.fieldcode"
          :closable="true"
          type="gray"
          @close="cancelConditionSelection(condition.optionList)"
        >
          <!--{{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}-->
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
  </div>

    <!-- 客户列表 -->
   <div id="customerList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="customerList-table"
                    tplId="customerList-template"
                    :pkTemp="pk_temp"
                    :tplData="customerListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @selection-change="handleSelectionChange"
                    @edit-table-click="tableEditClick"
                    
                    @delete-table-click="tableDeleteClick" >
      </ifbp-template>
      <!--分页组件-->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js';

export default {
  data() {
    return {
            //模版主键
            pk_temp:"a27b783d-c4d4-463e-8b10-772248af03f0",
            //当前页
            currentPage:1,
            //每页显示个数选择器的选项设置
            pageSizes:[10, 20, 30, 40],
            //每页显示条目个数
            size: 10,
            //总条目数
            totalElements:0,
            customerListData:{},
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
            //showDeleteButton: true,
            //操作按钮
            templateTableFormResetFun:function($node){
                //获取table,此id为ui模板上面的表格Id
                let $table = this.getNodeById($node, "t3w8pjkb6md");
                //定义操作
                let operateArr = [
                    {
                        title:"查看",
                        icon:"edit"
                    },
                    {
                        title:"删除",
                        icon:"delete"
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
        // 添加按钮
        addCustomerInfo() {
            location.hash = "/cust/customer/add/";
        },
        //快捷搜索
        searchInputEnterClick() {
            this.$message("搜索："+this.search_input);
        },
        //编辑按钮
        tableEditClick:function(scope) {
           location.hash = "/cust/customer/detail/" + scope.row.pk_customer;
        },
        //选择条数改变
        handleSelectionChange:function(selection){
            this.$message("选中条数为:" + selection.length);
        },
        //每页显示条数改变
        handleSizeChange:function(sizeVal){
            this.size = sizeVal;
            let maxPage = Math.ceil(this.totalElements / sizeVal);
            if (maxPage >= this.currentPage) {
                this.request(this.currentPage - 1, this.size);
            }
        },
        //当前页发生改变
        handleCurrentChange:function(currVal){
            this.currentPage = currVal;
            this.request(this.currentPage - 1, this.size);
        },
        //删除操作
        tableDeleteClick:function(scope){
            let delId = scope.row.pk_customer;
            this.$http({
                url: "/yls-busi-web/cust/customer/deleteById",
                headers: { 'Content-Type': 'application/json' },
                method: "post",
                dataType: "json",
                data: delId
                }).then(res => {
                if (res.data.status === true) {
                    this.$message({
                    message: "删除成功",
                    type: "success"
                    });
                    //this.delDialogVisible = false;
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
        let url;
        let baseUrl = "/yls-busi-web";
        url = baseUrl + '/cust/customer/page';
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
            url: url,
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: data,
            dataType: "json"
        }).then(res => {
            //customerCalculator_table UI模板表格名称
            let originalValue = res.data.data.content;
            this.$refs["customerList-table"].setData(
                "customer_t",
                JSON.parse(JSON.stringify(originalValue))
            );
            this.totalElements = res.data.data.totalElements; // 总条数
            this.size = res.data.data.size; // 每页的条数
            }).catch((e) => {
                this.$message({
                    message: "信息获取失败",
                    type: "error"
                });
            });
        },
       
        /**
         * 高级搜索相关 start
        */

        // 高级搜索
        showSearch() {
            this.isHide = !this.isHide;
            //this.searchTemplate = testSearchTemplate;
            //this.conditionList = testSearchTemplate.conditionList;
        },
        // 设置选中
        selectConditionOption(optionList, option, ctrltype) {
            // console.log(arguments);
            let optionSelected = false;
            let options = optionList.options;
            if (option && option.selected) {
                optionSelected = true;
            }
            if (ctrltype === 'DateComponent') {
                if (!optionList.def_min_value && !optionList.def_max_value && !option) { // 修复 el-date-picker 置空时引起的bug
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

        // 已选中数值格式整理
        formatSelectedNumber(min, max) {
            if (min && max) {
                return min + '-' + max + '万元';
            } else if (min) {
                return min + '万元及以上';
            } else {
                return '低于' + max + '万元';
            }
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
        }
        /**
         * 高级搜索相关 end
        */
    }
};
</script>
<style>

</style>

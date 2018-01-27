<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">融信通对账单</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="importExcel">导入</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="xxxx" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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
    <!-- 融信通到账记录列表 -->
   <div id="accountRecordList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="rxtbankflow_table"
                    tplId="finrxtbankflow-template"
                    :funnode="funnode"
                    :nexuskey ="nexusKey"
                    :tplData="finrxtbankflowListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @search-table-click="tableSearchClick">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {pagination, ylsBusi} from '../../../../../common/js/publicData.js'
export default {
  mixins: [pagination('request')],//分页方法引入
  data() {
    return {
      funnode:"BT021",
      nexusKey:"accountRecord",
      
      finrxtbankflowListData: {},
      totalElements:'',
      // 高级搜索
      // 搜索模板
      searchTemplate: {},
      // 条件列表
      conditionList: [],
      // 是否显示已选中标签
      showSelectedTags: true,
      // 当前打开的高级条件编号
      currentConditionCode: "",
      // 当前打开的高级条件内容
      currentCondition: null,
      //高级查询是否展示
      isHide: true,
      //快捷查询输入值
      search_input: "",
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId: "",
      //showDeleteButton: true,
      //操作按钮
      templateTableFormResetFun: function($node) {
        //获取table,此id为ui模板上面的表格Id
        var $table = $node.find("el-table");
        //定义操作
        var operateArr = [
          {
            icon: "search",
            title: "查看"
          }
        ];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
  },
  created() {
    this.request(this.currentPage - 1, this.size);
  },
  methods: {
    // 高级搜索
    showSearch() {
      this.isHide = !this.isHide;
    },
    //快捷搜索
    searchInputEnterClick() {
      this.$message("搜索：" + this.search_input);
    },
    //查看按钮
    tableSearchClick(scope) {
      location.hash = "/rxtbankflow/detail/" + scope.row.pk_bank_flow;
    },
    // 导入按钮
    importExcel() {
        location.hash = "/rxtbankflow/detail";
    },
    //每页显示条数改变
    handleSizeChange(sizeVal) {
      this.size = window.pageSize = sizeVal;
      var maxPage = Math.ceil(this.totalSize / sizeVal);
      if (maxPage >= this.currentPage) {
        this.request(this.currentPage - 1, this.size);
      }
    },
    //当前页发生改变
    handleCurrentChange(currVal) {
      this.currentPage = currVal;
      this.request(this.currentPage - 1, this.size);
    },
    //后台请求
    request(n, s) {
      var url;
      var baseUrl = "/yls-busi-web";
      url = baseUrl + "/fin/bankflow/page";
      var data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: n,
        pageSize: s,
        searchParams: {
          searchMap: {}
        }
      };
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
          // UI模板表格名称
          var originalValue = res.data.data.content;
          this.$refs["rxtbankflow_table"].setData(
            "BankFlow_rxt_t",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          console.log(res.data.data.size);
          this.size = res.data.data.size; // 每页的条数
        })
        .catch(e => {
          console.log(e);
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

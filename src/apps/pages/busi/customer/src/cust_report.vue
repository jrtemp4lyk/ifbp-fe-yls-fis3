<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">财报导入</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addInterrateInfo">新增</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="请输入。。。" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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
   <div id="quoteList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="cust-report-table"
                    tplId="quoteList-template"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :tplData="quoteListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
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
import { pagination, ylsBusi } from "../../../../common/js/publicData.js";
export default {
  mixins: [pagination("request")],
  data() {
    return {
      funnode: "BT003",
      nexusKey: "cust_report",
      quoteListData: {},
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
      templateTableFormResetFun($node) {
        //获取table,此id为ui模板上面的表格Id
        let $table = $node.find("el-table");
        // let $table = this.getNodeById($node, 'mp8586otvv');
        //定义操作
        let operateArr = [
          {
            icon: "search",
            title: "查看"
          },
          {
            title: "删除",
            icon: "delete"
          }
        ];
        //获取操作按钮html片段
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
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
    addInterrateInfo() {
      location.hash = "/custReport/add";
    },
    //快捷搜索
    searchInputEnterClick() {
      this.$message("搜索：" + this.search_input);
    },
    //查看按钮
    tableSearchClick(scope) {
      location.hash = "/custReport/detail/" + scope.row.pk_cust_report;
    },
    //删除操作
    tableDeleteClick(scope) {
      this.delId = scope.row.pk_cust_report;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi + "cust/report/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.delDialogVisible = false;
            this.request();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
    },
    //后台请求
    request() {
      let data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: this.currentPage - 1,
        pageSize: this.pageSize,
        searchParams: {
          searchMap: {}
        }
      };
      this.$http({
        url: ylsBusi + "/cust/report/page",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data,
        dataType: "json"
      })
        .then(res => {
          //custReport_t UI模板表格名称
          var originalValue = res.data.data.content;
          this.$refs["cust-report-table"].setData(
            "custReport_t",
            originalValue
          );
          this.totalElements = res.data.data.totalElements; // 总条数
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

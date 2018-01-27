<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">付款/退款申请列表</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addloan">新增</el-button>
        <!-- <el-button type="primary" class="button-no-radius" @click="addInterrateInfo">新增</el-button> -->
        <el-button type="primary" class="button-no-radius" @click="sendloancont">发送</el-button>
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
    <!-- <div class="advanced-search-panel" :class="{hide: isHide}">
         <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search> 
    </div> -->
    <!-- 投放申请列表 -->
   <div id="finloancontinfoList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="loancontinfo_table"
                    tplId="loancontinfo-template"
                    :tplData="loancontinfoListData"
                    show-type="table"
                    funnode="BT012"
                    nexuskey ="loancontinfo"
                    @selection-change="selectionChange"
                    :tplResetFun="templateTableFormResetFun"
                    @search-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClick" >
      </ifbp-template>
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
       <el-dialog title="新增子表"  v-model="dialogTableVisible" size="large" >
          <dialogRef
            ref="dialogRef"
            @dialogreturn="dialogRefreturn"
            :sourcebill="pk_loan_cont_info">
          </dialogRef>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import { pagination, ylsBusi } from "../../../../../common/js/publicData.js";
import dialogRef from "./paymentinout-list-inout-dlog.vue";
export default {
  components: {
    dialogRef
  },
  mixins: [pagination("refreshPage")],
  mounted() {
    this.refreshPage();
  },
  data() {
    return {
      // searchTemplateCode: "",
      searchTemplateParam: {},
      pk_loan_cont_info: "",
      dialogTableVisible: false,
      delDialogVisible: false,
      //模版主键
      loancontinfoListData: {},
      // 高级搜索
      // 搜索模板
      searchTemplate: {},
      // 条件列表
      conditionList: [],
      //高级查询是否展示
      isHide: true,
      //快捷查询输入值
      search_input: "",
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId: "",
      // 选中行
      selectionRows: [],
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
          },
          {
            title: "删除",
            icon: "delete"
          }
        ];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
  },
  methods: {
    // 查询
    handleSearch(searchTemplate) {
      this.currentPage = 1; //点查询按钮当前页设为1
      this.searchTemplateParam = searchTemplate;
      this.refreshPage();
    },
    dialogRefreturn() {
      this.dialogTableVisible = false;
      this.refreshPage();
    },
    addloan() {
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    selectionChange(selection) {
      console.log(selection);
      this.selectionRows = selection;
    },
    // 高级搜索
    showSearch() {
      this.isHide = !this.isHide;
    },
    // // 添加按钮
    // addInterrateInfo() {
    //   location.hash = "/loancontinfo/add";
    // },
    // 添加按钮
    addInfo() {
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    //快捷搜索
    searchInputEnterClick() {
      this.$message("搜索：" + this.search_input);
    },
    //查看按钮
    tableSearchClick(scope) {
      location.hash = "/paymentinout/detail/" + scope.row.pk_loan_cont_info;
    },
    //删除操作
    tableDeleteClick(scope) {
      this.delId = scope.row.pk_loan_cont_info;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi + "fin/loancontinfo/deleteById",
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
            this.refreshPage();
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
    //发送投放计划
    sendloancont() {
      let tableSelections = this.$refs.loancontinfo_table
        .getTableComp()
        .getSelection();
      let ids = [];
      if (tableSelections && tableSelections.length > 0) {
        tableSelections.forEach((item, index) => {
          ids[index] = item.pk_loan_cont_info;
        });
      }
      if (this.selectionRows) {
        this.$http({
          url: ylsBusi + "fin/loancontinfo/sendLoanContInfo",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: ids
        })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "发送成功",
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
          })
          .catch(e => {
            this.$message({
              message: "发送失败！",
              type: "error"
            });
          });
      } else {
      }
    },
    refreshPage() {
      this.$http
        .post(ylsBusi + "/fin/loancontinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize,
          searchParams: {
            searchMap: { qtAggVO: JSON.stringify(this.searchTemplateParam) }
          }
        })
        .then(resp => {
          if (resp.data.success) {
            this.$refs.loancontinfo_table.setData(
              "LoanContInfo_t",
              resp.data.data.content
            );
            this.totalElements = resp.data.data.totalElements;
          }
        });
    }
  }
};
</script>
<style>

</style>

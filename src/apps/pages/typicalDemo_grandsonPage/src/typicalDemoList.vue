<template>
  <div class="main-panel">
    <!-- 节点title -->
    <div class="title-container">
      <h2 class="name">主子孙典型页面</h2>
    </div>
    <!-- 按钮区域 -->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addtypicalDemo">新增</el-button>
        <el-button class="button-no-radius" @click="multiDeleteDialgShow" v-show="showDeleteButton">删除</el-button>
      </div>
       <!-- 查询模板组件 -->
      <ifbp-search class="fr"
        :template-code="searchCode"
        @search="handleSearch">
      </ifbp-search>
    </div>

    <!-- 主体区域 -->
    <div class="list-main-container clearfix">
      <!-- UI模板组件 -->
      <ifbp-template ref="typicalDemoTableRef"
                    tpl-id="typicalDemoTableId"
                    :funnode="typicalDemoTableFunnode"
                    :nexuskey="typicalDemoTableNexuskey"
                    :tpl-data="typicalDemoTableData"
                    show-type="table"
                    :tplResetFun="typicalDemoTableResetFun"
                    @selection-change="customerSelectionChange"
                    @edit-table-click="typicalDemoTableEditClick"
                    @delete-table-click="typicalDemoTableDeleteClick">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements"
        >
      </el-pagination>
    </div>

    <!--删除确认Dialog-->
    <ifbp-del-dialog
      v-model="delDialogVisible"
      message="确认删除该数据？删除后无法恢复。"
      @click="deleteClick"
      >
    </ifbp-del-dialog>
    <ifbp-del-dialog
      v-model="multiDelDialogVisible"
      message="确认删除所选数据？删除后无法恢复。"
      @click="multiDeleteClick"
      >
    </ifbp-del-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 查询模板传入参数
      searchCode: "TYPICAL_SEARCH",
      searchData: "",
      // UI模板传入参数
      typicalDemoTableFunnode: "CJGL",
      typicalDemoTableNexuskey: "typical",
      typicalDemoTableData: {},
      typicalDemoTableResetFun: function($node) {
        // 增加默认的新增删除按钮
        var $table = this.getTableDom($node);
        var operateHtml = this.getBaseTableOperateHtml();
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },

      // 分页组件传入参数
      totalElements: 0,
      currentPage: 0,
      size: 10,
      // 是否显示批量删除按钮
      showDeleteButton: false,
      // 是否显示删除dialog
      delDialogVisible: false,
      multiDelDialogVisible: false
    };
  },
  created() {
    this.request();
  },
  methods: {
    // 请求数据
    request(curPage, size) {
      var data = {
        pageNum: curPage || 0,
        pageSize: size || this.size
      };
      if (this.searchData) {
        data.searchParams = {
          searchMap: {
            qtAggVO: JSON.stringify(this.searchData)
          }
        };
      }
      this.$http({
        url: "/ifbp-app-sm-infoset-web/typical_demo/page",
        method: "post",
        data: data,
        headers: {
          "Content-Type": "application/json"
        },
        dataType: "application/json"
      })
        .then(res => {
          this.$refs.typicalDemoTableRef.setData(
            "TypicalDemoEntity_t",
            res.data.data.content
          );
          this.totalElements = res.data.data.totalElements;
          this.size = res.data.data.size;
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },

    // 查询区点击搜索后的处理
    handleSearch(searchData) {
      if (!searchData) {
        return;
      }
      this.searchData = searchData;
      this.request();
    },

    // 跳转到添加地点页面
    addtypicalDemo() {
      this.$router.push("/gra_typicalDemo/add");
    },

    // table行的编辑操作
    typicalDemoTableEditClick(scope) {
      this.$router.push("/gra_typicalDemo/detail/" + scope.row.id);
    },

    // table行的删除操作
    typicalDemoTableDeleteClick(scope) {
      this.delDialogVisible = true;
      this.delId = scope.row.id;
    },

    // 删除处理
    deleteClick() {
      var vm = this;
      var data = {
        id: this.delId
      };
      this.$http({
        url: "/ifbp-app-sm-infoset-web/typical_demo/delete",
        method: "post",
        data: data,
        headers: {
          "Content-Type": "application/json"
        },
        dataType: "application/json"
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.delDialogVisible = false;
            this.request(0, this.size);
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },

    // table选中改变
    customerSelectionChange(selection) {
      if (selection && selection.length > 0) {
        this.showDeleteButton = true;
      } else {
        this.showDeleteButton = false;
      }
    },

    // 批量删除点击处理
    multiDeleteDialgShow() {
      this.multiDelDialogVisible = true;
    },

    // 批量删除处理
    multiDeleteClick() {
      var tableSelections = this.$refs.typicalDemoTableRef
        .getTableComp()
        .getSelection();
      var delIds = [];
      if (tableSelections && tableSelections.length > 0) {
        for (var i = 0; i < tableSelections.length; i++) {
          var row = tableSelections[i];
          var id = row.id;
          delIds.push(id);
        }
      }
      console.log("multiDelete" + delIds);
      this.multiDelDialogVisible = false;
    },

    // 翻页标签改变每页显示数据
    handleSizeChange(val) {
      this.request(0, val);
    },

    // 翻页标签改变当前页
    handleCurrentChange(val) {
      this.request(val - 1, this.size);
    }
  }
};
</script>
<style>

</style>

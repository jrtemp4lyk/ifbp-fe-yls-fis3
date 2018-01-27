<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">产品方案列表</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="addProductSolution">新增</el-button>
        <el-button class="button-no-radius" @click="multiDeleteDialgShow" v-show="showDeleteButton">删除</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="请选择编码/方案" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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

    <!-- 主体区域 -->
    <div class="list-main-container clearfix">
      <!--新模板组件:tplCode="tplCode"-->
      <ifbp-template ref="template-table"
                    tplId="product-table-template"
                    :pkTemp="productPk"
                    :tplData="productTableData"
                    show-type="table"
                    :tplResetFun="productTableResetFun"
                    @selection-change="handleSelectionChange"
                    @edit-table-click="tableEditClick"
                    @delete-table-click="tableDeleteClick">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
    </div>
    
    <!--删除确认Dialog-->
    <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
          <span>确认删除该数据？删除后无法恢复。</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteClick">确 定</el-button>
          </div>
    </el-dialog>
    <el-dialog
        title="提示"
        v-model="multiDelDialogVisible"
        @update:visible="val => multiDelDialogVisible = val"
        :modal="true"
        size="tiny">
          <span>确认删除所选数据？删除后无法恢复。</span>
          <div slot="footer" class="dialog-footer">
            <el-button @click="multiDelDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="multiDeleteClick">确 定</el-button>
          </div>
    </el-dialog>
    <!--数据加载过程中页面最上端显示的层-->
    <!-- <div id="cover" ref="cover">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
        </svg>
      </div>
    </div> -->
  </div>
</template>
<script>
import { pagination, ylsBusi } from '../../../../common/js/publicData.js'
export default {
  mixins: [pagination('request')],
  data() {
    var oThis = this;
    return {
      productPk: "f820f976-e378-4051-acda-ef645ceb070c",
      showDeleteButton: false,
      search_input: "",
      isHide: true,
      delDialogVisible: false,
      multiDelDialogVisible: false,
      productTableData: {
        quoteScheme_t: [],
      },
      productTableResetFun: function($node) {
        var $table = this.getNodeById($node, "9uh48offlq5");
        var operateArr = [
          {
            title: "编辑",
            icon: "edit"
          },
          {
            title: "删除",
            icon: "delete"
          }
        ]; 
        // getTableOperateHtml方法需要传一个操作按钮数组
        var operateHtml = this.getTableOperateHtml(operateArr); 
        var labelStr = 'label="';
        var newLabelStr = 'label="操作';
        // 直接操作operateHtml字符串，为新增的最后一列加标题“操作”
        $table.append(operateHtml.replace(labelStr, newLabelStr)); 
        return $node[0].outerHTML;
      }
    };
  },
  created() {
    var requestDefer = this.request();
    this.initPromise(requestDefer);
  },
  methods: {
    handleSelectionChange: function(selection) {
      if (selection && selection.length > 0) {
        this.showDeleteButton = true;
      } else {
        this.showDeleteButton = false;
      }
    },
    tableEditClick: function(scope) {
      location.hash = "/productsolution/detail/" + scope.row.pk_quote_scheme;
    },
    tableDeleteClick: function(scope) {
      this.delDialogVisible = true;
      this.delId = scope.row.pk_quote_scheme;
    },
    initPromise(request) {
      Promise.all([request]).then(() => {
        // this.$refs.cover.remove();
      });
    },
    searchInputEnterClick() {
      alert(this.search_input);
    },
    request() {
      var url;
       // var search =
      //   "&search_LIKE_code=&search_LIKE_name=&search_LIKE_enable_state=";
      // if (n === undefined) {
      //   url = "/uapbd/custbaseinfo/pageList?pn=1&ps=10&sortColumn=" + search;
      // } else {
      //   url = "/uapbd/custbaseinfo/pageList?pn=" + n + "&ps=" + s + search;
      // }
      // var baseUrl = '/yls-busi-web/';
      url = ylsBusi + 'quote/scheme/page';
      
      var data = {
        "orderList": [
          {
            "direction": "desc",
            "property": "scheme_name"
          }
        ],
        "pageNum": this.currentPage - 1,
        "pageSize": this.pageSize,
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
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs["template-table"].setData(
            "quoteScheme_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          // this.size = res.data.data.size; // 每页的条数
        })
        .catch(() => {
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

    search() {
      this.request();
    },
    
    // 跳转到添加产品方案
    addProductSolution() {
      location.hash = "/productsolution/add";
    },

    multiDeleteDialgShow() {
      this.multiDelDialogVisible = true;
    },

    deleteClick() {
      // var baseUrl = '/yls-busi-web/';
      var url = ylsBusi+'quote/scheme/deleteById';
      var delId = this.delId; //this.$refs["template-table"].comp.delId;
      console.log("delete" + delId);
      this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        dataType: "json",
        data: delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.request();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "Network error",
            type: "error"
          });
        });
      this.delDialogVisible = false;
    },

    multiDeleteClick() {
      var tableSelections = this.$refs["template-table"].comp.$refs[
        "product_solution_table"
      ].getSelection();
      var delIds = [];
      if (tableSelections && tableSelections.length > 0) {
        for (var i = 0; i < tableSelections.length; i++) {
          var row = tableSelections[i];
          var id = row.pk_customer;
          delIds.push(id);
        }
      }
      console.log("multi" + delIds);
      this.delDialogVisible = false;
      return;
    }
  }
};
</script>
<style>
.operator-container .el-input {
    width: auto;
}
</style>



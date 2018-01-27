<template>
  <div class="main-panel">
        <div class="operator-container">
            <div class="fr">
                <el-input placeholder="合同编码/名称" v-model="search_input" icon="search"  @keyup.enter.native="search" :on-icon-click="search"></el-input>
                <el-button type="text" @click="showSearch">
                高级
                <i class="el-icon-arrow-down" v-if="this.isHide"></i>
                <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
                </el-button>
            </div>
        </div>
        <!--高级搜索区域-->
        <div class="advanced-search-panel" :class="{hide: isHide}">
          <!-- <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search> -->
        </div> 
        <ifbp-template ref="dialogref"
                    tplId="dialogref-template"
                    funnode="BT012"
                    nexuskey ="loancontinfo"
                    :tplData="dialogrefData"
                    show-type="table" >
        </ifbp-template>
        <div class="fr">
            <el-button class="button-no-radius" type="primary" @click="addMain">确 定</el-button>
            <el-button class="button-no-radius" type="default" @click="close">取 消</el-button>
        </div>
        <!--分页组件-->
        <div >
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
        </el-pagination>
        </div>
    </div>
</template>
<script>
import { pagination, ylsBusi } from "../../../../../common/js/publicData.js";
export default {
  props: ["sourcebill"],
  mixins: [pagination("refreshPage")],
  mounted() {
    this.refreshPage();
  },
  data() {
    var oThis = this;
    var change = false;
    return {
      //高级查询是否展示
      isHide: true,
      search_input: "",
      //数据信息
      dialogrefData: {}
    };
  },
  methods: {
    // 高级搜索
    showSearch() {
      this.isHide = !this.isHide;
    },
    refreshPage() {
      this.$http
        .post(ylsBusi + "/fin/loancontinfo/page", {
          pageNum: this.currentPage - 1,
          pageSize: this.pageSize
        })
        .then(resp => {
          if (resp.data.success) {
            this.$refs.dialogref.setData(
              "LoanContInfo_t",
              resp.data.data.content
            );
            this.totalElements = resp.data.data.totalElements;
          }
        });
    },
    search() {},
    close() {
      this.$emit("dialogreturn", this.change);
    },
    addMain() {
      let tableSelections = this.$refs.dialogref.getTableComp().getSelection();
      let ids = [];
      let pk = this.sourcebill;
      if (tableSelections && tableSelections.length > 0) {
        tableSelections.forEach((item, index) => {
          ids[index] = item.pk_loan_cont_info;
        });
        var data = {
          strArray: ids,
          pk: pk
        };
        this.$http({
          url: ylsBusi + "fin/loanapply/addLoanApplyInfo",
          headers: { "Content-Type": "application/json" },
          method: "post",
          dataType: "json",
          data: data
        })
          .then(res => {
            if (res.data.success === true) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.change = true;
              this.close();
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          })
          .catch(e => {
            this.$message({
              message: "添加失败！",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "请选择要增加的数据",
          type: "error"
        });
      }
    }
  }
};
</script>
<style>
.detail-button-header {
  height: 56px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
}
</style>

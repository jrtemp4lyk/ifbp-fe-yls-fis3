<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">付款/退款申请单</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 放款主模板 temp start-->
        <ifbp-panel id="basePanel" title="投放申请" :icons="baseIcons" >
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    funnode="BT012"
                    nexuskey ="loanapply"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 放款申请单列表信息 temp start-->
        <loanlistdef
            ref="loanlistdef"
            @openreturn="conginfodopen"
            @opendecutedreturn="decutedopen"
            @dialogreturn="loanlistdlogdefreturn"
            :sourcebill="pk_fin_loan_apply">
        </loanlistdef>
        <!-- 放款申请单列表信息 temp end-->
      <el-dialog title="新增子表"  v-model="dialogTableVisible" size="large" >
        <loanlistdlogdef
            ref="loanlistdlogdef"
            @dialogreturn="loanlistdlogdefreturn"
            :sourcebill="pk_fin_loan_apply">
        </loanlistdlogdef>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  pubSizes,
  pubPageSizes,
  pubPageMethods,
  ylsBusi
} from "../../../../../common/js/publicData.js";
import loanlistdlogdef from "./paymentapply-detail-inout-dlog.vue";
import loanlistdef from "./paymentapply-detail-inout.vue";
export default {
  components: {
    loanlistdlogdef,
    loanlistdef: loanlistdef,
  },
  data() {
    var oThis = this;
    return {
      dialogVisible: false,
      dialogTableVisible: false,
      //放款主键
      pk_fin_loan_apply: "",
      pk_loan_cont_info: "",
      // 放款申请主模板 baseTemplateRef start
      tplData: {},
      editable: false,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
      ]
      // 放款申请主模板 baseTemplateRef end
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loanlistdlogdefreturn() {
      this.dialogTableVisible = false;
      this.loadData();
    },
    conginfodopen() {
      this.dialogTableVisible = !this.dialogTableVisible;
    },
    decutedopen(pk_loan_cont_info) {
      this.pk_loan_cont_info=pk_loan_cont_info
      this.dialogVisible = true;
    },
    decutedclose(){
      this.dialogVisible = false;
      this.loadData();
    },
    //返回按钮
    goBack() {
      window.history.back(-1);
    },
    // 放款主模板 baseTemplateRef 事件处理 start
    clickCancel() {
      this.editable = false;
    },
    clickSave() {
      var data = this.$refs.baseTemplateRef.comp.LoanApply_f;
      var jsonData = JSON.parse(JSON.stringify(data));
      let url = "";
      if (data.pk_fin_loan_apply) {
        url = ylsBusi + "fin/loanapply/update";
      } else {
        url = ylsBusi + "fin/loanapply/create";
      }
      this.$http({
        url: url,
        // headers: {'Content-Type': 'application/json'},
        method: "post",
        data: jsonData
      })
        .then(res => {
          this.editable = false;
          var originalValue = res.data.data;
          this.pk_fin_loan_apply = res.data.data.pk_fin_loan_apply;
          this.$refs["baseTemplateRef"].setData(
            "LoanApply_f",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "放款保存失败！",
            type: "error"
          });
        });
    },
    // 放款主模板 baseTemplateRef 事件处理 end
    //加载数据方法
    loadData() {
      this.pk_fin_loan_apply = this.$root.$router.currentRoute.params.id;
      //router name
      //this.$root.$router.currentRoute.name;
      //详情页面
      if (this.pk_fin_loan_apply && this.pk_fin_loan_apply != "") {
        //加载放款信息
        this.loadfinloanapply(this.pk_fin_loan_apply);
      } else {
        this.editable = true;
      }
    },
    //加载放款信息
    loadfinloanapply(pk_fin_loan_apply) {
      this.$http({
        url: ylsBusi + "fin/loanapply/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: pk_fin_loan_apply
      })
        .then(res => {
          var originalValue = res.data.data;
          this.$refs["baseTemplateRef"].setData(
            "LoanApply_f",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.$refs.loanlistdef.loadFinLoanContInfo(pk_fin_loan_apply);
        })
        .catch(e => {
          this.$message({
            message: "放款详情获取失败",
            type: "error"
          });
        });
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

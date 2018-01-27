<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">收款核销</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="false" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 主模板 temp start-->
        <ifbp-panel id="basePanel" title="收款核销" :icons="baseIcons" >
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="funnode"
                    :nexuskey ="nexusKey"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 核销明细信息 temp start-->
        <ifbp-panel id="gatherAuditSubPanel" title="核销明细" :icons="subBaseIcons" >
          <ifbp-template ref="gatherAuditSubRef"
                        tplId="gatherAuditSubTemplate"
                        :tplData="gatherAuditSubData"
                        :tplResetFun="gatherAuditSubResetFun"
                        :funnode="funnode"
                        :nexuskey ="nexusKeysub"
                        :editable="editablesub"
                        show-type="table-form" 
                        >
          </ifbp-template>
        </ifbp-panel>
        <!-- 核销明细信息 temp end-->
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var oThis = this;
    return {
      delDialogVisible: false,
      funnode: "BT019",
      nexusKey: "gatherAuditMain",
      nexusKeysub: "gatherAuditSub",
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //主键
      pk_gather_account: "",

      // 主模板 baseTemplateRef start
      tplData: {
        GatherAccount_f: {}
      },
      //是否编辑态
      editable: false,
      editablesub: false,
      // 主模板 baseTemplateRef end

      // 核销明细信息 gatherAuditSubRef start
      gatherAuditSubData: {
        GatherAuditPlan_t: []
      },
      gatherAuditSubResetFun: function($node) {
        var $table = $node.find("el-table");
        $table.attr(":show-header", "true");
        //定义操作
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
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //返回按钮
    goBack() {
      window.history.back(-1);
    },
    // 主模板 baseTemplateRef 事件处理 start
    clickCancel() {
      this.editable = false;
    },
    clickSave() {
      var data = this.$refs.baseTemplateRef.comp.GatherAccount_f;
      var jsonData = JSON.parse(JSON.stringify(data));
      let url = "";
      if (data.pk_gather_account) {
        url = "/yls-busi-web/fin/gatheraccount/update";
      } else {
        url = "/yls-busi-web/fin/gatheraccount/create";
      }
      this.$http({
        url: url,
        method: "post",
        data: jsonData
      })
        .then(res => {
          var originalValue = res.data.data;
          this.pk_gather_account = res.data.data.pk_gather_account;
          this.$refs["baseTemplateRef"].setData(
            "GatherAccount_f",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.loadData();
          this.editable = false;
        })
        .catch(e => {
          this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
    },
    // 主模板 baseTemplateRef 事件处理 end

    // 核销明细信息 gatherAuditSubRef 事件处理 start
    gatherAuditSubFormCancel(tpe) {
      this.$refs.gatherAuditSubRef.getTableComp().closeExpandRow();
      this.$refs.gatherAuditSubRef.comp.formShow = false;
      this.$refs.gatherAuditSubRef.getTableComp().closeExpandRow();
      let gatherAuditSub = this.$refs.gatherAuditSubRef.getData(
        "GatherAuditPlan_t"
      );
      gatherAuditSub[this.baseEditIndex] = this.baseData;
      this.$refs.gatherAuditSubRef.setData("GatherAuditPlan_t", gatherAuditSub);
    },
    // 核销明细信息 gatherAuditSubRef 事件处理 end

    //加载数据方法
    loadData() {
      this.pk_gather_account = this.$root.$router.currentRoute.params.id;
      //详情页面
      if (this.pk_gather_account && this.pk_gather_account != "") {
        //加载到账单信息
        this.loadGatherAuditMain(this.pk_gather_account);
        this.loadGatherAuditSub(this.pk_gather_account);
      } else {
        this.editable = true;
      }
    },
    //加载核销主表信息
    loadGatherAuditMain(pk_gather_account) {
      this.$http({
        url: "/yls-busi-web/fin/gatheraccount/getById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: pk_gather_account
      })
        .then(res => {
          var originalValue = res.data.data;
          this.$refs["baseTemplateRef"].setData(
            "GatherAccount_f",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "收款信息获取失败",
            type: "error"
          });
        });
    },
    //加载核销明细信息
    loadGatherAuditSub(pk_gather_account) {
      this.$http({
        url: "/yls-busi-web/fin/gatheraccount/getSubsById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: pk_gather_account
      })
        .then(res => {
          var originalValue = res.data.data;
          this.$refs["gatherAuditSubRef"].setData(
            "GatherAuditPlan_t",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          this.$message({
            message: "核销明细信息获取失败",
            type: "error"
          });
        });
    },
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

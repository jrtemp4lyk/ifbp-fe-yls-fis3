<template>
<!-- 工作日志 -->
<div>
    <ifbp-template ref="projectOperationPlanRef"
                tplId="projectOperationPlan"
                :funnode="projectOperationPlanFunnode"
                :nexuskey="projectOperationPlanNexusKey"
                :tplData="projectOperationPlanData"
                @form-confirm-click="projectOperationPlanFormConfirm"
                @form-cancel-click="projectOperationPlanFormCancel"
                show-type="form"
                :editable="projectOperationPlanEdit">
    </ifbp-template>
    <div class="form-button-div" v-if="projectOperationPlanEdit">
        <el-button type="default" class="button-no-radius" @click="projectOperationPlanFormCancel">取消</el-button>
        <el-button type="primary" class="button-no-radius" @click="projectOperationPlanFormConfirm">保存</el-button>
    </div>
</div>
</template>

<script>
import {ylsSale} from '../../../../common/js/publicData.js'
export default {
  //应用vue传过来接收参数
  props: ["pk_sale_info"],
  data() {
      var oThis = this;
      return {
          scrollDom: document.getElementsByClassName("view")[0],
          delId: "",
          projectOperationPlanFunnode: "YLSBT003",
          projectOperationPlanNexusKey: "project_operation_plan",
          projectOperationPlanEdit: false,
          projectOperationPlanCacheData: '',
          projectOperationPlanData: {
              rules: {}
          },
      };
  },

  //页面操作
  mounted() {
      this.request();
  },

  methods: {
      request() {
          if (this.pk_sale_info) {
              this.requestProjectOperationPlan();
          }
      },

      //请求项目操作方案数据
      requestProjectOperationPlan() {
          var url = ylsSale + "sale/projectOperationPlan/getByParentId";
          this.$http({
              url: url,
              headers: {"Content-Type": "application/json"},
              method: "post",
              data: this.pk_sale_info,
              dataType: "json"
          }).then(res => {
              this.$refs.projectOperationPlanRef.setData("ProjectOperationPlan", res.data.data);
              //列表数据缓存
              this.projectOperationPlanCacheData = JSON.parse(JSON.stringify(this.$refs.projectOperationPlanRef.getData('ProjectOperationPlan')));
          }).catch(() => {
              this.$message({
                  message: "项目操作方案信息获取失败",
                  type: "error"
              });
          });
      },

      //取消按钮
      projectOperationPlanFormCancel: function(type) {
          this.projectOperationPlanEdit = false;
          //还原数据
          this.$refs.projectOperationPlanRef.setData('ProjectOperationPlan', this.projectOperationPlanCacheData);

      },

      //保存
      projectOperationPlanFormConfirm: function() {
          //获取当前数据
          let url = "";
          var data = this.$refs.projectOperationPlanRef.comp.ProjectOperationPlan;
          data.pk_sale_info = this.pk_sale_info;
          if (data.pk_prj_operation_plan) {
              url = ylsSale + '/sale/projectOperationPlan/update';
          } else {
              url = ylsSale + '/sale/projectOperationPlan/create';
          }
          this.$http({
              url: url,
              headers: {"Content-Type": "application/json"},
              method: "post",
              data: JSON.parse(JSON.stringify(data))
          }).then(res => {
              if (res.data.success === true) {
                  this.$message({
                      message: "保存成功！",
                      type: "success"
                  });
                  this.projectOperationPlanEdit = false;
                  this.$refs.projectOperationPlanRef.setData("ProjectOperationPlan", res.data.data);
              //列表数据缓存
              this.projectOperationPlanCacheData = JSON.parse(JSON.stringify(this.$refs.projectOperationPlanRef.getData('ProjectOperationPlan')));
              } else {
                  this.$message({
                      message: res.data.error.errorMessage,
                      type: "error"
                  });
              }
          }).catch(() => {
              this.$message({
                  message: "更新失败",
                  type: "error"
              });
          });
      },
  }
};
</script>
<<style>

</style>



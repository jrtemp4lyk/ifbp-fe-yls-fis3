<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">主子孙典型页面信息设置</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125">
        <!-- 主表编辑页签 -->
        <ifbp-panel id="basePanel" title="基本信息" :icons="typicalDemoIcons">
          <ifbp-template ref="typicalDemoRef"
                    tplId="typicalDemoId"
                    :funnode="typicalDemoFunnode"
                    :nexuskey="typicalDemoNexuskey"
                    show-type="form"
                    :tplData="typicalDemoData"
                    :editable="typicalDemoEdit">
          </ifbp-template>
          <div class="form-button-div" v-if="typicalDemoEdit">
            <el-button type="default" class="button-no-radius" @click="typicalDemoCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="typicalDemoConfirm">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 子表页签 -->
         <ifbp-panel id="childPanel" title="子表信息" :icons="childIcons">
          <ifbp-template ref="typicalDemoChildRef"
                tpl-id="typicalDemoChildId"
                :funnode="typicalDemoChildFunnode"
                :nexuskey="typicalDemoChildNexuskey"
                :tpl-data="typicalDemoChildData"
                show-type="table"
                :tpl-reset-fun="typicalDemoChildResetFun"
                @edit-table-click="childEditClick"
                @delete-table-click="childDeleteClick">
          </ifbp-template>
          <!--删除确认Dialog-->
          <ifbp-del-dialog
            v-model="childDelDialogVisible"
            message="确认删除该数据？删除后无法恢复。"
            @click="childDeleteDialogClick"
            >
          </ifbp-del-dialog>
        </ifbp-panel>
      </ifbp-panel-group>
      <!-- 孙表页签 -->
      <ifbp-grandson-page ref="grandsonPage" title="孙表信息" width="900">
          <typicalDemoDetailGrandson ref="typicalDemoChildFormRef" :value="currentChildRowValue"></typicalDemoDetailGrandson>
      </ifbp-grandson-page>
    </div>
  </div>
</template>
<script>
import typicalDemoDetailChild from "./typicalDemoDetailChild.js";
import typicalDemoDetailGrandson from './typicalDemoDetail_grandson.vue';
export default {
  mixins: [typicalDemoDetailChild],
  components: {
    'typicalDemoDetailGrandson': typicalDemoDetailGrandson,
  },
  data() {
    var vm = this;
    var id = this.$root.$router.currentRoute.params.id;
    return {
      // 通过传入的参数判断是新增还是修改操作
      id: id,
      // ifbp-panel-group所需参数，非特殊情况请使用平台封装后的参数ifbpScrollDom
      scrollDom: "ifbpScrollDom",
      // 基础panel显示图标
      typicalDemoIcons: [
        {
          icon: "edit",
          click: function() {
            vm.typicalDemoEdit = !vm.typicalDemoEdit;
          }
        }
      ],
      // UI模板所需参数
      typicalDemoFunnode: "CJGL",
      typicalDemoNexuskey: "typical",
      typicalDemoData: {},
      // 基本信息默认是否可修改
      typicalDemoEdit: true
    };
  },
  mounted() {
    this.request();
    // 修改页面默认不可编辑
    if (this.id) {
      this.typicalDemoEdit = false;
    }
  },
  methods: {
    showGrandsonPage() {
      this.$refs.grandsonPage.showPage();
    },
    // 获取数据
    request() {
      // 请求客户基本信息详情
      this.requestTypicalDemoBaseInfo();
      // 请求客户银行账户列表
      this.requestTypicalDemoChild();
    },
    // 请求客户基本信息详情
    requestTypicalDemoBaseInfo() {
      if (!this.id) return;
      this.$http({
        url: "/ifbp-app-sm-infoset-web/typical_demo/getById",
        method: "post",
        data: this.id,
        headers: {
          "Content-Type": "application/json"
        },
        dataType: "application/json"
      })
        .then(res => {
          if (res.data.success === true) {
            this.$refs.typicalDemoRef.setData(
              "TypicalDemoEntity",
              res.data.data
            );
            this.baseData = JSON.parse(JSON.stringify(res.data.data));
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "基本信息详情获取失败",
            type: "error"
          });
        });
    },
    // 基本信息取消按钮操作
    typicalDemoCancel() {
      this.typicalDemoEdit = false;
      if (this.baseData) {
        this.$refs.typicalDemoRef.setData("TypicalDemoEntity", this.baseData);
      } else {
        this.$refs.typicalDemoRef.resetFormData();
      }
    },
    // 基本信息保存按钮操作
    typicalDemoConfirm() {
      var vm = this;
      var url = "/ifbp-app-sm-infoset-web/typical_demo/update";
      this.$refs.typicalDemoRef.validate(valid => {
        if (valid) {
          var data = vm.$refs.typicalDemoRef.getData("TypicalDemoEntity");
          if (!vm.id) {
            url = "/ifbp-app-sm-infoset-web/typical_demo/create";
          }
          vm
            .$http({
              url: url,
              method: "post",
              data: data,
              headers: {
                "Content-Type": "application/json"
              },
              dataType: "application/json"
            })
            .then(res => {
              if (res.data.success) {
                vm.$message({
                  message: "保存成功"
                });
                if (!vm.id) {
                  vm.id = res.data.data.id;
                }

                vm.$refs.typicalDemoRef.setData(
                  "TypicalDemoEntity",
                  res.data.data
                );
                vm.baseData = JSON.parse(JSON.stringify(res.data.data));
                vm.typicalDemoEdit = false;
              } else {
                vm.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              vm.$message({
                message: "保存失败",
                type: "error"
              });
            });
        } else {
          this.$message("校验未通过");
        }
      });
    }
  }
};
</script>
<style>

</style>

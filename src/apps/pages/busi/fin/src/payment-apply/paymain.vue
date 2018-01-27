<template>
  <el-tabs id="busi-main" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="放款申请-列表" name="first">
        <finloancontinfo ref="finloanapply"></finloancontinfo>
    </el-tab-pane>
    <el-tab-pane label="放款申请单" name="second">
        <finloanapply  ref="finloancontinfo"></finloanapply>
    </el-tab-pane>
  </el-tabs>
  
</template>
<script>
import finloancontinfo from "./loancontinfo-list.vue";
import finloanapply from "../loanapply-info/loanapply-list.vue";
export default {
  components: {
    finloancontinfo,
    finloanapply
  },
  data() {
    return {
      activeName: "first",
      custType: true
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.$options.propsData.name == "second") {
        this.$refs.finloanapply.request(
          this.$refs.finloanapply.currentPage - 1,
          this.$refs.finloanapply.size
        );
        this.$refs.finloancontinfo.request(
          this.$refs.finloancontinfo.currentPage - 1,
          this.$refs.finloancontinfo.size
        );
      }
      if (tab.$options.propsData.name == "first") {
        this.$refs.finloanapply.request(
          this.$refs.finloanapply.currentPage - 1,
          this.$refs.finloanapply.size
        );
        this.$refs.finloancontinfo.request(
          this.$refs.finloancontinfo.currentPage - 1,
          this.$refs.finloancontinfo.size
        );
      }
    },
  }
};
</script>
<style>
#busi-main .el-tabs__content {
  overflow: auto;
}
</style>

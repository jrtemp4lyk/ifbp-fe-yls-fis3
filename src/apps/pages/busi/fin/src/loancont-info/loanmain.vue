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
      activeName: "first"
    };
  },
  created() {
    this.change();
  },
  methods: {
    change() {
      if (this.$root.$router.currentRoute.params.id) {
        if ((this.$root.$router.currentRoute.params.id == "second")) {
          this.activeName = "second";
        }
      } else {
        this.activeName = "first";
      }
    },
    handleClick(tab, event) {
      if (tab.$options.propsData.name == "second") {
        this.$refs.finloanapply.refreshPage();
        this.$refs.finloancontinfo.refreshPage();
      }
      if (tab.$options.propsData.name == "first") {
        this.$refs.finloanapply.refreshPage();
        this.$refs.finloancontinfo.refreshPage();
      }
    }
  }
};
</script>
<style>

</style>

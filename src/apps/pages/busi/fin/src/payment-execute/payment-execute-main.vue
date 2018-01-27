<template>
  <el-tabs v-model="activeName" type="border-card" >
    <el-tab-pane label="付款安排" name="plan">
          <paymentPlanRef ref="paymentPlanRef"></paymentPlanRef>
    </el-tab-pane>
    <el-tab-pane label="付款处理" name="execute">
          <paymentExecuteRef ref="paymentExecuteRef"></paymentExecuteRef>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
//引入付款安排
import paymentPlanRef from '../payment-plan/payment-plan-list.vue';
import paymentExecuteRef from '../payment-execute/payment-execute-list.vue';
  export default {
    components:{
        'paymentPlanRef': paymentPlanRef,
        'paymentExecuteRef':paymentExecuteRef
    },
    data() {
      return {
        activeName: 'plan'
      };
    }
  };
</script>
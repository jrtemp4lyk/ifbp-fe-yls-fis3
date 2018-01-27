<template>
  <el-tabs id="busi-agent-apply" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="厂商授信申请" name="first">
        <creditfactoryapply v-if="istrue" @change-credit-grant='changecreditgrant'>
        </creditfactoryapply>
         <creditfactoryinfo v-else :pkCustomer='pkCustomer' :creditgrant='creditgrant' @change-credit-edit='changecreditedit'>
         </creditfactoryinfo>
    </el-tab-pane>
    <el-tab-pane label="已授信厂商" name="second">
    </el-tab-pane>
    <el-tab-pane label="分配授信" name="third">
    </el-tab-pane>
  </el-tabs>
  
</template>
<script>
import creditfactoryapply from '../manufacturer/creditfactoryapply.vue';
import creditfactoryinfo from '../manufacturer/creditfactoryinfo.vue';

  export default {
    components: {
      'creditfactoryapply':creditfactoryapply,
      'creditfactoryinfo':creditfactoryinfo
    },
    data() {
      return {
        activeName: 'first',
        istrue:true,
        pkCustomer:'',
        creditgrant:''
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
     
      changecreditgrant(val){
         if('tocreditgrantadd' == val[0]){
             this.istrue = false;
         }
         else if('tocreditgrantinfo' == val[0]){
             this.istrue = false;
             this.pkCustomer = val[1];
             this.creditgrant = 'creditgrant'
         }
      },
      changecreditedit(val){
        if(val){
          this.pkCustomer = '';
          this.istrue = true;
        }
      }
    }
  };
</script>
<style>
#busi-agent-apply .el-tabs__content {
  overflow: auto;
}
</style>

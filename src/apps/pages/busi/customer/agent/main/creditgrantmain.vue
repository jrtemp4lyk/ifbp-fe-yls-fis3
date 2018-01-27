<template>
  <el-tabs id="busi-agent-apply" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="代理商授信申请" name="first">
        <creditgrant v-if="istrue" @change-credit-grant='changecreditgrant'></creditgrant>
         <creditgrantedit v-else :pkCustomerVal='pkCustomerVal' :creditgrant='creditgrant' @change-credit-edit='changecreditedit'>
         </creditgrantedit>
    </el-tab-pane>
     <el-tab-pane label="已授信代理商" name="second">
       已授信代理商
    </el-tab-pane>
  </el-tabs>
  
</template>
<script>
import creditgrant from '../creditgrant/creditgrantapply.vue';
import creditgrantedit from '../creditgrant/creditgrantinfo.vue';

  export default {
    components: {
      'creditgrant':creditgrant,
      'creditgrantedit':creditgrantedit
    },
    data() {
      return {
        activeName: 'first',
        istrue:true,
        pkCustomerVal:'',
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
             this.pkCustomerVal = val[1];
             this.creditgrant = 'creditgrant'
         }
      },
      changecreditedit(val){
        if(val){
          this.pkCustomerVal = '';
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

<template>
  <el-tabs id="busi-main" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="已提交申请" name="first">
        <applysubmitted ref="applysubmitted" @chang-apply-submitted="changeapplysubmitted"></applysubmitted>
    </el-tab-pane>
    <el-tab-pane label="待提交申请" name="second">
        <applysubmitting  ref="applysubmitting" @chang-apply-submitting="changeapplysubmit"></applysubmitting>
    </el-tab-pane>
    <el-tab-pane label="基于客户" name="third">
        <applycustomer v-if="custType" @change-cust-list="changecustlist"></applycustomer>
        <div v-else-if="clickDisabled">
          <corpapplyClickDisabled v-if="corpapplyType" :pkCustomer="pkCustomer" :pkApplication="pkApplication" @change-corp-card="changecust">
          </corpapplyClickDisabled>
          <personapplyClickDisabled v-else :pkCustomer="pkCustomer" :pkApplication="pkApplication" @change-person-card="changeperson">
          </personapplyClickDisabled>
        </div>
        <div v-else>
          <corpapply v-if="corpapplyType" :pkCustomer="pkCustomer" :pkApplication="pkApplication" @change-corp-card="changecust">
          </corpapply>
          <personapply v-else :pkCustomer="pkCustomer" :pkApplication="pkApplication" @change-person-card="changeperson">
          </personapply>
        </div>
    </el-tab-pane>
    <!-- <el-tab-pane label="基于CRM" name="fourth">基于CRM</el-tab-pane> -->
  </el-tabs>
  
</template>
<script>
import applysubmitted from '../application/apply-submitted.vue';
import applysubmitting from '../application/apply-submitting.vue';
import applycustomer from '../customer/apply-customerlist.vue';
import corpapply from '../buni/busi_corp_apply.vue';
import personapply from '../buni/busi_person_apply.vue';
import corpapplyClickDisabled from '../buni/busi_corp_apply_clickDisabled.vue';
import personapplyClickDisabled from '../buni/busi_person_apply_clickDisabled.vue';
  export default {
    components: {
      applysubmitted,
      applysubmitting,
      applycustomer,
      corpapply,
      personapply,
      corpapplyClickDisabled,
      personapplyClickDisabled
    },
    data() {
      return {
        activeName: 'first',
        custType:true,
        corpapplyType:false,
        clickDisabled:false,
        pkCustomer:'',
        pkApplication:'',
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        if(tab.$options.propsData.name == "first"){
           this.$refs.applysubmitted.request(this.$refs.applysubmitted.currentPage - 1,this.$refs.applysubmitted.size);
        }
        else if(tab.$options.propsData.name == "second"){
           this.$refs.applysubmitting.request(this.$refs.applysubmitting.currentPage - 1,this.$refs.applysubmitting.size);
        }
      },
      changeapplysubmit(val){
        if('flushapplysubmitting' == val[0]){
          this.$refs.applysubmitting.request(this.$refs.applysubmitting.currentPage - 1,this.$refs.applysubmitting.size);
        }
        else if('toapplycustomerlist' == val[0]){
             if('CORP' == val[3]){
               this.corpapplyType = true;
               this.custType = false;
               this.clickDisabled = false;
               this.pkCustomer = val[1];
               this.pkApplication = val[2];
               this.activeName = 'third';
           }
           else if('person' == val[3].toLocaleLowerCase()){
               this.corpapplyType = false;
               this.custType = false;
               this.clickDisabled = false;
               this.pkCustomer = val[1];
               this.pkApplication = val[2];
               this.activeName = 'third';
           }
        }
      },
      changecustlist(val){
         if(val){
           if('CORP' == val[0]){
               this.corpapplyType = true;
               this.custType = false;
               this.pkCustomer = val[1];
               this.pkApplication = val[2];
           }
           else if('person' == val[0].toLocaleLowerCase()){
               this.corpapplyType = false;
               this.custType = false;
               this.pkCustomer = val[1];
               this.pkApplication = val[2];
           }
         }
      },
      changecust(val){
         if("toapplycustomerlist" == val){
            this.custType = true;
            this.corpapplyType = false;
         }
         else if('toapplied' == val){
            this.activeName = 'first';
            this.$refs.applysubmitted.request(this.$refs.applysubmitted.currentPage - 1,this.$refs.applysubmitted.size);
            this.custType = true;
            this.corpapplyType = false;
         }
         
      },
      changeperson(val){
        if('toapplycustomerlist' == val){
            this.custType = true;
            this.corpapplyType = false;
         }
         else if('toapplied' == val){
            this.activeName = 'first'
            this.$refs.applysubmitted.request(this.$refs.applysubmitted.currentPage - 1,this.$refs.applysubmitted.size);
            this.custType = true;
            this.corpapplyType = false;
         }
      },
      changeapplysubmitted(val){
        if('toapplycustomerlist' == val[0]){
          if('CORP' == val[3]){
            this.corpapplyType = true;
            this.custType = false;
            this.clickDisabled = true;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
            this.activeName = 'third';
          }
          else if('person' == val[3].toLocaleLowerCase()){
            this.corpapplyType = false;
            this.custType = false;
            this.clickDisabled = true;
            this.pkCustomer = val[1];
            this.pkApplication = val[2];
            this.activeName = 'third';
          }
        }
      }
    }
  };
</script>
<style>
#busi-main .el-tabs__content {
  overflow: auto;
}
</style>

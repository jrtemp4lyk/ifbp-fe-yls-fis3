<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">付款执行</h2>
    </div>
    
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 主模板 temp start-->
        <ifbp-panel id="basePanel" title="付款执行信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    funnode="BT014"
                    nexuskey="payment-execute"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 主模板 temp end-->

        <!-- 付款安排主模板 temp start-->
        <impPaymentPlanChildRef :pk_payment_execute="pk_payment_execute" ref="impPaymentPlanChildRef"></impPaymentPlanChildRef>
        <!-- 付款安排主模板 temp end-->
    </div>
  </div>


  
</template>
<script>
import impPaymentPlanChildRef from '../payment-plan/payment-plan-child-list.vue';

export default {
  components:{
        'impPaymentPlanChildRef':impPaymentPlanChildRef
  },
  data() {
    var oThis = this;
    return {
      //主键
      pk_payment_execute:"",
      paymentPlanChildRef:impPaymentPlanChildRef,
      //主模板 baseTemplateRef start
      tplData:{},
      delId:{},
      editable:false,
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
      goBack(){
        window.history.back(-1);
      },
      // 报价主模板 baseTemplateRef 事件处理 start
      clickCancel(){
        this.editable = false;
      },
      clickSave(){
        var data = this.$refs.baseTemplateRef.comp.PaymentExecute;
        var jsonData = JSON.parse(JSON.stringify(data));
        this.$http({
            url: '/yls-busi-web/fin/execute/save',
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:jsonData
        }).then(res => {
          
            this.editable = false;
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData("PaymentExecute",JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.editable = true;
          this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
      // 报价主模板 baseTemplateRef 事件处理 end

      //加载数据方法
      loadData(){
        this.pk_payment_execute = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if(this.pk_payment_execute && this.pk_payment_execute != ""){
          //加载信息
          this.loadPayment(this.pk_payment_execute);
          //加载付款安排
          this.paymentPlanChildRef.methods.refreshPage();
        }else{
          this.editable = true;
        }
      },
      //加载付款执行信息
      loadPayment(pk_payment_execute){
        
        this.$http({
            url: "/yls-busi-web/fin/execute/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:pk_payment_execute
        }).then(res => {
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData("PaymentExecute",
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: "详情获取失败",
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

<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">融信通扣款记录</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="false" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 主模板 temp start-->
        <ifbp-panel id="basePanel" title="融信通扣款记录">
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
          </div>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    var oThis = this;
    return {
      delDialogVisible:false,
      funnode:"BT021",
      nexusKey:"debitRecord",
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //主键
      pk_debit_record:"",

      // 主模板 baseTemplateRef start
      tplData:{
        DebitRecord_f:{},
      },
      //是否编辑态
      editable:false,
      // 主模板 baseTemplateRef end      
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
      // 主模板 baseTemplateRef 事件处理 start
      clickCancel(){
        this.editable = false;
      },
      // 主模板 baseTemplateRef 事件处理 end
      //加载数据方法
      loadData(){
        this.pk_debit_record = this.$root.$router.currentRoute.params.id;
        //详情页面
        if(this.pk_debit_record && this.pk_debit_record != ""){
          //加载扣款记录信息
          this.loadDeductRecord(this.pk_debit_record);
        }else{
          this.editable = true;
        }
      },
      //加载融信通扣款记录信息
      loadDeductRecord(pk_debit_record){
        this.$http({
            url: "/yls-busi-web/fin/debitrecord/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:pk_debit_record
        }).then(res => {
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              "DebitRecord_f",
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: "扣款记录详情获取失败",
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

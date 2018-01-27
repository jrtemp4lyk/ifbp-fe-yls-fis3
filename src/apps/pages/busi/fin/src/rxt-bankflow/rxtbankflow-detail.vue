<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">融信通对账单</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 主模板 temp start-->
        <ifbp-panel id="basePanel" title="融信通到账记录" >
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
        <!-- 融信通扣款记录信息 temp start-->
        <ifbp-panel id="DebitRecordPanel" title="融信通扣款记录">
          <ifbp-template ref="DebitRecordRef"
                        tplId="DebitRecordTemplate"
                        :tplData="DebitRecordData"
                        :tplResetFun="DebitRecordResetFun"
                        :funnode="funnode"
                        :nexuskey ="nexusKey2"
                        :editable="editable2"
                        show-type="table-form" 
                        >
          </ifbp-template>
        </ifbp-panel>
        <!-- 融信通扣款记录信息 temp end-->
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
      nexusKey:"accountRecord",
      nexusKey2:"debitRecord",
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //主键
      pk_bank_flow:"",

      // 主模板 baseTemplateRef start
      tplData:{
        BankFlow_rxt_f:{},
      },
      //是否编辑态
      editable:false,
      editable2:false,
      // 主模板 baseTemplateRef end

      // 融信通扣款记录信息 DebitRecordRef start
      DebitRecordData:{
        GatherAudit_f_t: [],
      },
      DebitRecordResetFun:function($node) {
        var $table = $node.find("el-table");
        $table.attr(':show-header','true');
        //定义操作
        var operateArr = [
          {
            title: "编辑",
            icon: "edit"
          },
          {
            title: "删除",
            icon: "delete"
          }];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
      
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

      // 融信通扣款记录信息 DebitRecordRef 事件处理 start
      DebitRecordFormCancel(tpe){
        this.$refs.DebitRecordRef.getTableComp().closeExpandRow();
        this.$refs.DebitRecordRef.comp.formShow = false;
        this.$refs.DebitRecordRef.getTableComp().closeExpandRow();
        let debitRecord = this.$refs.DebitRecordRef.getData('DebitRecord_f_t');
        debitRecord[this.baseEditIndex] = this.baseData;
        this.$refs.DebitRecordRef.setData('DebitRecord_f_t', debitRecord);
      },
      DebitRecordEditDeleteClick(scope){
        location.hash = "/rxtdebitrecord/detail/" + scope.row.pk_bank_flow;
      },
      // 融信通扣款记录信息 DebitRecordRef 事件处理 end

      //加载数据方法
      loadData(){
        this.pk_bank_flow = this.$root.$router.currentRoute.params.id;
        //详情页面
        if(this.pk_bank_flow && this.pk_bank_flow != ""){
          //加载到账单信息
          this.loadDebitRecord(this.pk_bank_flow);
          this.loadAccountRecord(this.pk_bank_flow);
        }else{
          this.editable = true;
        }
      },
      //加载融信通扣款记录信息
      loadAccountRecord(pk_bank_flow){
        this.$http({
            url: "/yls-busi-web/fin/bankflow/getSubsById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:pk_bank_flow
        }).then(res => {
            var originalValue = res.data.data;
            this.$refs["DebitRecordRef"].setData(
              "DebitRecord_f_t",
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: "扣款记录详情获取失败",
            type: "error"
          });
        });
      },
      //加载银行到账单信息
      loadDebitRecord(pk_bank_flow){
        this.$http({
            url: "/yls-busi-web/fin/bankflow/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:pk_bank_flow
        }).then(res => {
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              "BankFlow_rxt_f",
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: "银行到账单信息获取失败",
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

<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">银行到账</h2>
    </div>
    
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="false" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 银行对账单主模板 temp start-->
        <ifbp-panel id="basePanel" title="银行到账" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    show-type="form"
                    :funnode="funnode"
                    :nexuskey ="nexusKey"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 银行对账单主模板 temp end-->
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
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //主键
      pk_bank_flow:"",

      // 银行到账主模板 baseTemplateRef start
      funnode:"BT017",
      nexusKey:"bankflow",
      tplData:{},
      editable:false,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
      ],
      // 银行到账主模板 baseTemplateRef end
      
    };
  },

  attmData:{},
  created() {
    this.loadData();
  },
  methods: {
      //返回按钮
      goBack(){
        window.history.back(-1);
      },
      clickCancel(){
        this.editable = false;
      },
      clickSave(){
        var data = this.$refs.baseTemplateRef.comp.BankFlow_f;
        var jsonData = JSON.parse(JSON.stringify(data));
        let url ='';
        if(data.pk_bank_flow){
            url='/yls-busi-web/fin/bankflow/update';
          }else{
            url='/yls-busi-web/fin/bankflow/create';
        }
        this.$http({
            url: url,
            method: "post",
            data:jsonData
        }).then(res => {
            this.editable = false;
            var originalValue = res.data.data;
            this.pk_bank_flow=res.data.data.pk_bank_flow;
            this.$refs["baseTemplateRef"].setData(
              "BankFlow_f",
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
      //加载数据方法
      loadData(){
        this.pk_bank_flow = this.$root.$router.currentRoute.params.id;
        //详情页面
        if(this.pk_bank_flow && this.pk_bank_flow != ""){
          //加载银行到账信息
          this.loadfinbankflow(this.pk_bank_flow);
        }else{
          this.editable = true;
        }
      },
      //加载银行到账信息
      loadfinbankflow(pk_bank_flow){
        this.$http({
            url: "/yls-busi-web/fin/bankflow/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:pk_bank_flow
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'BankFlow_f',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '银行到账详情获取失败',
            type: 'error',
          });
        });
      },
      attmFormConfirm(){
        if( this.pk_bank_flow != null ){
          var data = this.$refs.BankFlow_f_ref.comp.BankFlow_f;
          data.pk_bank_flow = this.pk_bank_flow; 
          var jsonData = JSON.parse(JSON.stringify(data));
          this.$http({
            url: "/yls-busi-web/fin/bankflow/create", 
            method: "post",
            data:jsonData
          }).then(res => {
            if (res.data.success === true) {
                  this.$message({
                    message: "保存成功！",
                    type: "success"
                  });
                  this.$refs.BankFlow_f_ref.comp.formShow = false;
                  this.loadAttm(this.pk_bank_flow);
                } else {
                  this.$message({
                    message: res.data.msg,
                    type: "error"
                  });
                }
          }).catch(e => {
            this.$message({
              message: "保存失败！",
              type: "error"
            });
          });

        }else{
          this.$message({
                  message: "",
                  type: "error"
                });
        }
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

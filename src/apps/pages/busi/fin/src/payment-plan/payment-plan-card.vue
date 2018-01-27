<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">付款安排</h2>
    </div>
    
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 主模板 temp start-->
        <ifbp-panel id="basePanel" title="付款安排信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    funnode="BT014"
                    nexuskey="payment-plan"
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

    </div>
  </div>
</template>
<script>


export default {
  data() {
    var oThis = this;
    return {
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //报价主键
      pk_payment_plan:"",
      tplData:{},
      editable:false,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
        
      ]
      // 报价主模板 baseTemplateRef end
    };
  },

  attmData:{},
  
  attmResetFun:function($node) {
        var $table = $node.find("el-table");
        $table.attr(':show-header','false');
        var operateArr = [              
          {
            title: "编辑",
            icon: "edit"
          },
          {
            title: "删除",
            icon: "delete"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
  mounted() {
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
        var data = this.$refs.baseTemplateRef.comp.PaymentPlan;
        var jsonData = JSON.parse(JSON.stringify(data));
        var urlSave;
        if(this.pk_payment_plan){
             urlSave ='/yls-busi-web/fin/plan/update';
        }else{
             urlSave = '/yls-busi-web/fin/plan/create';
        }
        this.$http({
            url: urlSave,
            // headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:jsonData
        }).then(res => {
            this.editable = false;
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              "PaymentPlan",
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: "保存失败！",
            type: "error"
          });
        });
      },
      // 报价主模板 baseTemplateRef 事件处理 end

      //加载数据方法
      loadData(){
        this.pk_payment_plan = this.$root.$router.currentRoute.params.id;
        //router name
        //this.$root.$router.currentRoute.name;
        //详情页面
        if(this.pk_payment_plan && this.pk_payment_plan != ""){
          //加载报价信息
          this.loadPayment(this.pk_payment_plan);
        }else{
          this.editable = true;
        }
      },
      //加载报价信息
      loadPayment(pk_payment_plan){
        this.$http({
            url: "/yls-busi-web/fin/plan/getById" ,
            headers: {'Content-Type': 'application/json'},  
            method: "post",
            data:pk_payment_plan
        }).then(res => {
            var originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData("PaymentPlan",
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

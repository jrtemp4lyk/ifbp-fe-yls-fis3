<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">合作协议</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack" >返回</el-button>
          <!--<el-button class="fr" type="primary" @click="onCalc" style="margin-right:10px" v-show="calcBtnshow">保存</el-button>-->
      </div>
        <!-- 主模板 temp start-->
        <ifbp-panel id="basePanel" title="主表信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :pkTemp="pk_temp"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable"
                    :methods="t_Methods"
                    :tplResetFun="templateTableFormResetFun">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 主模板 temp end-->

      </ifbp-panel-group>
    </div>

  </div>
</template>
<script>
import {pubSizes,pubPageSizes,pubPageMethods,ylsBusi} from '../../../../common/js/publicData.js'
export default {
  data() {
    let oThis = this;
    return {
      //固定写法
      scrollDom: document.getElementsByClassName('view')[0],
      //合作协议主键
      pk_operation_protocol:'',
      //删除对话框是否展示
      delDialogVisible:false,
      //删除标识，区分子表
      delType:'',
      //删除实体主键
      delId:'',
      pid:'',
      // 主模板 baseTemplateRef start
      pk_temp:'51775896-9d65-4a80-b88f-35daf4608d09',
      tplData:{

      },
        templateTableFormResetFun($node){
      let $refNode= this.getNodeById($node, '1nnheivkgfc');//获取客户参照
      if( oThis.pid !== undefined){
        $refNode.attr("v-bind:disabled", 'true'); //客户参照只读
      } else {
        $refNode.attr("v-bind:disabled", 'false'); //客户参照可编辑
      }
    },
      //是否编辑态
      editable:false,
      calcBtnshow:true,
      baseIcons: [
        {
          icon: 'edit',
          click: function() {
            oThis.editable = !oThis.editable;
          },
        }
      ],
      // 主模板 baseTemplateRef end
    };
  },
   t_Methods:{
        handleRefChange(type, data) {  //参照变化处理函数 依据参照给 证件类型  证件号码赋值
           this.$refs['OperationProtocol_ref'].model.agent_name = data.value[0].agent_name;
           //this.$refs['CustPledge-form'].model.identity_type = data.value[0].identity_type;
        },
      },

  created() {
    this.pid = this.$root.$router.currentRoute.params.id;
    if(this.pid != '' && this.pid){
      this.loadDemoInfo(this.pid);
    } else {
      this.calcBtnshow = false;
    }
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
      clickSave(){
        let data1 = this.$refs.baseTemplateRef.comp.OperationProtocol;
        this.$http({
            url: ylsBusi+'cust/operation/UpdateOrCreate',
            // headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:data1,
        }).then(res => {
            location.hash = '/operation/list';
            this.editable = false;
            let originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              'OperationProtocol_t',
              originalValue
            );
            this.$message({
            message: '保存成功',
            type: 'success',
          });
        }).catch(e => {
          this.$message({
            message: '保存失败',
            type: 'error',
          });
        });
      },
      // 主模板 baseTemplateRef 事件处理 end

     //加载信息
      loadDemoInfo(id){
        this.$http({
            url: ylsBusi+'cust/operation/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:id
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'OperationProtocol',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '详情获取失败',
            type: 'error',
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

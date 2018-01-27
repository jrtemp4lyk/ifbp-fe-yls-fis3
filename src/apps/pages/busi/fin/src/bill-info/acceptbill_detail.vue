<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">汇票详情</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
        <!-- 收付汇票主模板 temp start-->
        <ifbp-panel id="basePanel" title="收付汇票" :icons="baseIcons" >
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    funnode="BZ023"
                    nexuskey ="AcceptBillDetail"
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

          <!-- 收支计划 temp start-->
          <ifbp-panel id="InOutPlanPanel" title="收支计划">
          <ifbp-template ref="InOutPlanRef"
                        tplId="InOutTemplate"
                        funnode="BZ023"
                        nexuskey="InOutPlanDetail"
                        show-type="table-form"
                        :tplData="InOutPlanData"
                        :tplResetFun="InOutPlanResetFun"
                        @search-table-click="InOutPlanSearchTable"
                        >
          </ifbp-template>
        </ifbp-panel>
        <!-- 投放计划 temp end-->
      </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {pubSizes,pubPageSizes,pubPageMethods,ylsBusi} from "../../../../../common/js/publicData.js";
export default {
  data() {
    let oThis = this;
    return {
      //弹出窗口信息start
      //当前页
      loancurrentPage: 1,
      //每页显示个数选择器的选项设置
      loanpageSizes: window.pubPageSizes,
      //每页显示条目个数
      loansize: window.pubSize,
      //总条目数
      loantotalSize: 0,
      disabled:false,
      dialogTableVisible: false,
      //数据信息
      finpayinouttData: {},
      //弹出窗口end
      delDialogVisible: false,
      isShow:false,
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //签发汇票主键
      pk_accept_bill: "",

      // 签发汇票主模板 baseTemplateRef start
      tplData: {},
      InOutPlanData:{},
      editable: false,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
          }
        }
      ],
      // 签发汇票主模板 baseTemplateRef end
      templateTableFormResetFun($node){
        debugger;
        let $refNode= this.getNodeById($node, 'mrety870uin');//获取汇票状态id
        if( oThis.pk_accept_bill !== undefined){
          $refNode.attr("v-show:isShow", 'true'); //汇票状态显示
          if(oThis.eid == "2"){
            let $refNode1 = $node.find("el-money[v-model='AcceptBill.sign_money']"); //获取出票金额id
            $refNode1.attr("v-bind:disabled", 'editable'); //出票金额只读
            let $refNode2 = $node.find("el-money[v-model='AcceptBill.money']");//获取贴现息id
            $refNode2.attr("v-bind:disabled", 'editable'); //贴现息只读
            let $refNode3 = $node.find("el-money[v-model='AcceptBill.infact_money']");//获取实际回笼金额id
            $refNode3.attr("v-bind:disabled", 'editable'); //实际回笼金额只读
          }
        } else {
          $refNode.attr("v-show:isShow", 'false'); //汇票状态隐藏
        }
      },
       InOutPlanResetFun($node) {
        let $table = this.getNodeById($node,'y8asz7au8a');
        // $table.attr(':show-header','true');
        let operateArr = [
          {
            title: '查看详情',
            icon: 'search',
          },
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
  },
  created() {
    this.eid = this.$root.$router.currentRoute.params.eid;
    this.loadData();
  },
  methods: {
    //返回按钮
    goBack() {
      window.history.back(-1);
    },
    // 前发汇票主模板 baseTemplateRef 事件处理 start
    clickCancel() {
      this.editable = false;
    },
    clickSave() {
      debugger;
      let data1 = this.$refs.baseTemplateRef.comp.AcceptBill;
      let url = "";
      if (data1.pk_accept_bill) {
        url = ylsBusi + "fin/acceptBill/update";
      } else {
        url = ylsBusi + "fin/acceptBill/create";
      }
      this.$http({
        url: url,
        method:"post",
        data:data1,
      })
      .then(res => {
            location.hash = '/acceptbill/list';
            this.editable = false;
            let originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              'AcceptBill_t',
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
    // 签发汇票主模板 baseTemplateRef 事件处理 end

    InOutPlanSearchTable(scope){
       this.$refs.InOutPlanRef.getTableComp().expandRow(scope.row);
       this.$refs.InOutPlanRef.comp.formShow = false;
       this.$refs.InOutPlanRef.setData('QuoteInoutPlan',scope.row);

      // // 备份数据
      // this.baseData = JSON.parse(JSON.stringify(scope.row));
      // this.baseEditIndex = scope.$index;

      },

    //加载信息
      loadData(){
        if (!this.pk_accept_bill) {
            this.pk_accept_bill = this.$root.$router.currentRoute.params.id;
        }
         //详情页面
        if (this.pk_accept_bill) {
        //加载投放计划信息
            this.loadDemoInfo(this.pk_accept_bill);
            this.loadChildDemoInfo(this.pk_accept_bill);
         } else {
            this.editable = true;
         }
      },
        //加载信息
      loadDemoInfo(pk_accept_bill){
        this.$http({
            url: ylsBusi+'fin/acceptBill/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:this.pk_accept_bill
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'AcceptBill',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '详情获取失败',
            type: 'error',
          });
        });  
      },
      //加载信息
      loadChildDemoInfo(pk_accept_bill){
        this.pk_bill = this.pk_accept_bill;
        this.$http({
            url: ylsBusi+'fin/signBill/getInOut' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:this.pk_bill
        }).then(res => {
            let originalValue = res.data.data;
            this.$refs['InOutPlanRef'].setData(
              'QuoteInoutPlan_t',
              JSON.parse(JSON.stringify(originalValue))
            );
        }).catch(e => {
          this.$message({
            message: '获取详情失败',
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


<template>
 <div id="executeList" class="list-main-container clearfix">
    <!-- 列表 -->
   <ifbp-panel id="id_payment_plan" title="付款安排" :icons="planPlusIcons">
      <!--模板组件-->
        <ifbp-template ref="paymentPlanRef"
                        tplId="paymentPlanId"
                        funnode="BT014"
                        nexuskey="payment-execute-plan"
                        :tplData="paymentPlanData"
                        :tplResetFun="planResetFun"
                        show-type="table-form"
                        >
        </ifbp-template>
      <!--分页组件-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
        </el-pagination>
    </ifbp-panel>

        <!--安排选择-->
        <el-dialog  title="付款安排"   v-model="selDialogVisible"
         @update:visible="val => selDialogVisible = val" :modal="true"  size="large">
           <paymentPlanDialogRef ref="paymentPlanDialogRef"  v-if="selDialogVisible"></paymentPlanDialogRef>
        <span slot="footer" class="dialog-footer">
            <el-button @click="selDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="selConfirmClick">确 定</el-button>
        </span>
       </el-dialog>

       
        <!--取消付款安排Dialog-->
        <el-dialog
        title="提示"
        v-model="cancelPlanDialogVisible"
        @update:visible="val => cancelPlanDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确定取消安排计划？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelPlanDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cancelPlan">确 定</el-button>
        </span>
       </el-dialog>
 </div>
    
</template>
<script>

import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'
import paymentPlanDialogRef from '../payment-plan/payment-plan-dialog.vue';

export default {
  mixins: [pagination('refreshPage')],
  props:["pk_payment_execute"],
  components:{
        'paymentPlanDialogRef':paymentPlanDialogRef
  },
  data() {
    var oThis = this;
    return {
            delDialogVisible:false,
            selDialogVisible:false,
            pageSize:10,
            cancelPlanDialogVisible:false,
            planDialogRef:paymentPlanDialogRef,
            planListData:{
                handleSelectable(row,index){
                    if(row.pk_payment_execute==null){
                        return true;
                    }
                }
            },
            planPlusIcons: [
                {
                title:"新增",
                icon: "plus",
                click () {
                    oThis.selDialogVisible=true;
                }
                },{
                title:"取消关联",
                icon: "minus",
                click () {
                    var tableSelections = oThis.$refs.paymentPlanRef.getTableComp().getSelection();
                    if (tableSelections && tableSelections.length > 0) {
                    oThis.cancelPlanDialogVisible=true;
                    }else{
                    oThis.$message({
                            message: "请选择需要需取消的付款安排！",
                            type: "error"
                        });
                    }
                    
                }
                }
            ],
            paymentPlanData:{},
            playDialogListData:{},
            planResetFun ($node) {
                    var $table = $node.find("el-table");
                    $table.attr(':show-header','true');
                    var operateArr = [      
                    {
                        title: "编辑",
                        icon: "edit"
                    },
                    {
                        title: "取消安排",
                        icon: "delete"
                    },
                    ];
                    var operateHtml = this.getTableOperateHtml(operateArr);
                    $table.append(operateHtml);
                    return $node[0].outerHTML;
            },
            planDialogResetFun ($node) {
                    var $table = $node.find("el-table");
                    $table.attr(':show-header','true');
                    return $node[0].outerHTML;
            }
        }
  },
  created() {
    this.refreshPage();
  },
   methods: {
        handleSelectionChange(selection) {
            this.$message('选中条数为:' + selection.length);
        },
        refreshPage() {
            if(this.pk_payment_execute!=null){
                this.$http.post(ylsBusi + '/fin/plan/getByIds', {
                    pk:this.pk_payment_execute,
                    pageParam:{
                      pageNum: this.currentPage - 1,
                      pageSize: this.pageSize
                    }
                }).then((resp) => {
                    if (resp.data.success) {
                        this.$refs.paymentPlanRef.setData('PaymentPlan_t',resp.data.data.content)
                        this.totalElements = resp.data.data.totalElements;
                    }
                })
            }
                
        },
       selConfirmClick(){
           
           var tableSelections = this.$refs.paymentPlanDialogRef.$refs.planDialogRef.getTableComp().getSelection();
            if (tableSelections && tableSelections.length > 0) {
              var pks = [];
                tableSelections.forEach((item,index) => {
                    pks[index]=item.pk_payment_plan;
                });
                
               var data ={
                   strArray:pks,
                   executeEntity:this.$parent.$refs.baseTemplateRef.comp.PaymentExecute
                }
                
                var vm = this;
                this.$http({
                    url: "/yls-busi-web/fin/execute/relationPlan",
                    headers: { 'Content-Type': 'application/json' },
                    method: "post",
                    dataType: "json",
                    data: data
                }).then(res => {
                  
                if (res.data.success === true) {
                    
                    if(this.pk_payment_execute==null){
                       this.pk_payment_execute=res.data.data.pk_payment_execute;
                    }
                   this.$parent.$refs["baseTemplateRef"].setData("PaymentExecute",
                      JSON.parse(JSON.stringify(res.data.data)));
                   vm.refreshPage();
                   this.selDialogVisible=false;
                   this.$message({
                        message: "关联成功",
                        type: "success"
                  });
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error"
                    });
                }
                }).catch((e) => {
                    this.$message({
                    message: "信息提交失败！",
                    type: "error"
                });
                });
            }else{
                this.$message({
                    message: "请选择付款安排！",
                    type: "error"
                });
            }
      },
       //取消关联计划
      cancelPlan(){
        
         var tableSelections = this.$refs.paymentPlanRef.getTableComp().getSelection();
            if (tableSelections && tableSelections.length > 0) {
               var pks = [];
                tableSelections.forEach((item,index) => {
                    pks[index]=item.pk_payment_plan;
                });
               var data ={
                   strArray:pks,
                   executeEntity:this.$parent.$refs.baseTemplateRef.comp.PaymentExecute
                }
                var vm = this;
                this.$http({
                    url: "/yls-busi-web/fin/execute/cancelPlan",
                    headers: { 'Content-Type': 'application/json' },
                    method: "post",
                    dataType: "json",
                    data: data
                }).then(res => {
                    if (res.data.success === true) {
                      this.$parent.loadPayment(this.pk_payment_execute);
                      vm.refreshPage();
                      this.cancelPlanDialogVisible=false;
                      this.$message({
                            message: "取消成功",
                            type: "success"
                      });
                    } else {
                        this.$message({
                        message: res.data.msg,
                        type: "error"
                        });
                    }
                }).catch((e) => {
                    this.$message({
                    message: "信息提交失败！",
                    type: "error"
                });
                });
            }else{
                this.$message({
                    message: "请选择取消的付款安排！",
                    type: "error"
                });
            }
      }
    }
};
</script>
<style>

</style>

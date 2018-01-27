
<template>
    <!-- 列表区域 -->
    <div class="list-main-container">
        <ifbp-template ref="planDialogRef"
                    tplId="planDialogId"
                    funnode="BT013"
                    nexuskey="payment-apply-select"
                    :tplData="playDialogListData"
                    :tplResetFun="planDialogResetFun"
                    show-type="table" >
        </ifbp-template>
        <!--分页组件-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
        </el-pagination>
    </div>
</template>
<script>
import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'

export default {
    mixins: [pagination('refreshPage')],
    oThis:this,
    data() {
    return {
        playDialogListData:[],
        pageSize:10,
        mounted() {
            this.refreshPage();
        },
        planDialogResetFun($node) {
            //获取table,此id为ui模板上面的表格Id
            let $table = $node.find("el-table");
            //获取操作按钮html片段
            let operateHtml = this.getBaseTableOperateHtml();
            $table.append(operateHtml);
            return $node[0].outerHTML;
        }
    }
  },
  created() {
     this.refreshPage();
  },
  methods: {
        refreshPage() {
                this.$http.post(ylsBusi + 'fin/plan/pageUnCheck', {
                    pageNum: this.currentPage - 1,
                    pageSize: this.pageSize,
                }).then((resp) => {
                    if (resp.data.success) {
                        this.$refs.planDialogRef.setData('PaymentPlan_t',resp.data.data.content)
                        this.totalElements = resp.data.data.totalElements;
                    }
                })
        }
    }
};
</script>
<style>

</style>

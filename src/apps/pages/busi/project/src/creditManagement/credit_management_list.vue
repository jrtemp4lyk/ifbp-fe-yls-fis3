<template>
    <div class="main-panel">
        <div class="title-header">
            <h2 class="name">授信管理列表页</h2>
        </div>

        <div class="operator-container">
            <div class="fl">
                <el-button type="primary" class="legacy" @click="addcreditManagementInfo">新增</el-button>
            </div>
        </div>

        <div class="list-main-container clearfix">
            <ifbp-template ref="creditManagementListRef"
                tplId="creditManagementList"
                :funnode="creditManagementListFunnode"
                :nexuskey="creditManagementListNexuskey"
                :tplData="creditManagementListData"
                show-type="table"
                :tplResetFun="creditManagementListResetFun"
                @edit-table-click="rowEditClick"
                @delete-table-click="rowDeleteClick">
            </ifbp-template>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
            </el-pagination>

            <el-dialog title="提示"
                v-model="delDialogVisible"
                @update:visible="val => delDialogVisible = val"
                :modal="true"
                size="tiny">
                <span>确认删除该数据？删除后无法恢复。</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="delDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {pagination, ylsBusi} from '../../../../../common/js/publicData.js'
export default {
    mixins: [pagination('request')],
    mounted() {
            this.request();
    },
    data(){
        return {
            creditManagementListFunnode: 'BT008',
            creditManagementListNexuskey: 'credit_management_list',
            creditManagementListData: {},
            delDialogVisible: false,
            delId: '',

            creditManagementListResetFun($node) {
                let $table = $node.find('el-table');
                let operateArr = [
                    {
                        icon: 'edit',
                        title:'编辑',
                    },
                    {
                        icon:'delete',
                        title:'删除'
                        
                    }
                ];
                let operateHtml = this.getTableOperateHtml(operateArr);
                $table.append(operateHtml);
                return $node[0].outerHTML;
            },
        };
    },

    methods: {
        request() {
            var url = ylsBusi + 'creditManagement/getCreditManagementList';
            var data = {
                'orderList': [
                    {
                        'direction': 'desc',
                        'property': 'ts'
                    }
                ],
                'pageNum': this.currentPage - 1,
                'pageSize': this.pageSize,
                'searchParams': {
                    'searchMap': {}
                }
            };
            this.$http({
                url: url,
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                data: data,
                dataType: 'json'
            }).then(res => {
                this.$refs.creditManagementListRef.setData('CreditManagement_t', res.data.data.content);
                this.totalElements = res.data.data.totalElements;
            }).catch(() => {
                this.$message({
                    message: '信息获取失败',
                    type: 'error'
                });
            });
        },

        addcreditManagementInfo() {
            location.hash = '/creditManagement/detail/add';
        },

        rowEditClick(scope) {
            location.hash = '/creditManagement/detail/' + scope.row.pk_project_credit;
        },

        rowDeleteClick(scope) {
            this.delId = scope.row.pk_project_credit;
            this.delDialogVisible = true;
        },

        deleteConfirmClick() {
            this.$http({
                url: ylsBusi + 'creditManagement/deleteCreditManagement',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: this.delId,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '删除成功',
                        type: 'success',
                    });
                    this.delDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                        message: res.data.msg,
                        type: 'error',
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '信息删除失败！',
                    type: 'error',
                });
            });
        },
    },
}
</script>
<<style>

</style>



<template>
    <div class="main-panel">
        <!--按钮区域-->
        <div class="operator-container">
            <el-button @click="addUser" class="button-no-radius" type="primary">新增</el-button>
        </div>
        <!-- 列表区域 -->
        <div class="list-main-container">
            <!-- 微信用户列表 -->
            <ifbp-template :tpl-data="userListData" :editable="userListEditable" :tplResetFun="resetUserList" @delete-table-click="delUser"
                @edit-table-click="editUser" @form-confirm-click="confirm" @form-cancel-click="cancel" funnode="YLSBT002" nexuskey="YLS-IFACE-WECHAT-USER"
                ref="wechatUserList" show-type="table-form">
            </ifbp-template>
            <!--分页组件-->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
            </el-pagination>
        </div>
        <!--删除确认Dialog-->
        <el-dialog :modal="true" size="tiny" title="删除确认" v-model="delUserDlgVisible">
            <span>
                确认删除该微信用户？删除后无法恢复。
            </span>
            <span class="dialog-footer" slot="footer">
                <el-button @click="delUserDlgVisible = false">取 消</el-button>
                <el-button @click="deleteConfirmClick" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'
    export default {
        mixins: [pagination('refreshPage')],
        mounted() {
            this.refreshPage();
        },
        data() {
            return {
                userListEditable: true,
                userListData: {},
                delUserDlgVisible: false,
                delUserId: null,
                editingIndex: null,
                deletingIndex: null,
                resetUserList($node) {
                    //获取table,此id为ui模板上面的表格Id
                    let $table = $node.find("el-table");
                    //获取操作按钮html片段
                    let operateHtml = this.getBaseTableOperateHtml();
                    $table.append(operateHtml);
                    return $node[0].outerHTML;
                }
            }
        },
        methods: {
            refreshPage() {
                this.$http.post(ylsBusi + 'iface/wechat/users/page', {
                    pageNum: this.currentPage - 1,
                    pageSize: this.pageSize,
                }).then((resp) => {
                    if (resp.data.success) {
                        this.$refs.wechatUserList.setData('WechatUserEntity_t', resp.data.data.content)
                        this.totalElements = resp.data.data.totalElements;
                    }
                })
            },
            addUser() {
                this.$refs.wechatUserList.resetFormData();
                this.$refs.wechatUserList.getTableComp().closeExpandRow();
                this.$refs.wechatUserList.formShow = true;
            },
            delUser(scope) {
                this.deletingIndex = scope.$index;
                this.delUserId = scope.row.pk_wechat_user;
                this.delUserDlgVisible = true;
            },
            deleteConfirmClick() {
                this.delUserDlgVisible = false;
                this.$http.post(ylsBusi + 'iface/wechat/users/deleteById', this.delUserId,
                    { headers: { 'Content-Type': 'text/plain' } }).then(resp => {
                        if (resp.data.success) {
                            this.userListData['WechatUserEntity_t'].splice(this.deletingIndex, 1)
                            this.totalElements--;
                        } else {
                            this.$message({
                                message: resp.data.error.errorMessage,
                                type: 'error'
                            });
                        }
                    });
            },
            editUser(scope) {
                this.editingIndex = scope.$index;
                this.$refs.wechatUserList.getTableComp().expandRow(scope.row);
                this.formEditable = true;
                this.$refs.wechatUserList.comp.formShow = false;
                this.$refs.wechatUserList.setData('WechatUserEntity', JSON.parse(JSON.stringify(scope.row)));
            },
            confirm(type) {
                if (type === 'form') {
                    //新增
                    const newUser = this.$refs.wechatUserList.getData('WechatUserEntity')
                    this.$http.post(ylsBusi + 'iface/wechat/users/create', newUser).then((resp) => {
                        if (resp.data.success) {
                            this.$refs.wechatUserList.getData('WechatUserEntity_t').push(resp.data.data)
                            this.totalElements++;
                        } else {
                            this.$message({
                                message: resp.data.error.errorMessage,
                                type: 'error'
                            });
                        }
                    })
                    this.$refs.wechatUserList.comp.formShow = false
                } else {
                    //修改
                    const user = this.$refs.wechatUserList.getData('WechatUserEntity')
                    this.$http.post(ylsBusi + 'iface/wechat/users/update', user).then((resp) => {
                        if (resp.data.success) {
                            const userList = this.$refs.wechatUserList.getData('WechatUserEntity_t');
                            this.$set(userList, this.editingIndex, resp.data.data);
                        } else {
                            this.$message({
                                message: resp.data.error.errorMessage,
                                type: 'error'
                            });
                        }
                    })
                    this.$refs.wechatUserList.getTableComp().closeExpandRow();
                }
            },
            cancel(type) {
                if (type === 'form') {
                    this.$refs.wechatUserList.formShow = false;
                } else {
                    this.$refs.wechatUserList.getTableComp().closeExpandRow();
                }
            }
        }
    }
</script>
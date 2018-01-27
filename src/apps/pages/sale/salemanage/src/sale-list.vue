<template>
    <div class="main-panel">
        <div class="title-header">
            <h2 class="name">营销管理列表页</h2>
        </div>

        <div class="operator-container">
            <div class="fl">
                <el-button type="primary" class="legacy" @click="addSaleInfo">新增</el-button>
            </div>
            <div class="fr">
                <el-button type="text" @click="showSearch">
                    高级搜索
                    <i class="el-icon-arrow-down" v-if="this.isHide"></i>
                    <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
                </el-button>
            </div>
        </div>

        <div id="advanced-search" :class="{hide: isHide}">
            <el-row>
                <el-col :span="2"><span class="search-label"> 客户名称:</span></el-col>
                 <el-col :span="3">
                     <el-ref
                        :ref-code="custNameRefCode"
                        :field="custNameRefField"
                        :template-value="custNameRefTemplate"
                        @trigger="custNameRefTrigger"
                        @reset="custNameRefReset">
                    </el-ref>
                 </el-col>
                <el-col :span="2"><span class="search-label"> 控股股东:</span></el-col>
                <el-col :span="3">
                    <el-input type="text" v-model="controlShareholder" placeholder="请输入控股股东"></el-input>
                </el-col>
                <el-col :span="2"><span class="search-label"> 营销状态:</span></el-col>
                <el-col :span="4">
                    <el-select id="s-state" v-model="saleStatus">
                        <el-option
                            v-for="(item,index) in sale_status_option"
                            :label="item.label"
                            :value="item.value"
                            :key="index">
                        </el-option>
                    </el-select>
                </el-col>
                <div class="fr">
                <el-button @click="advancedSearch">搜索</el-button>
                </div>
            </el-row>
        </div>

        <div class="list-main-container clearfix">
            <ifbp-template ref="saleListRef"
                tplId="saleList"
                :funnode="saleListFunnode"
                :nexuskey="saleListNexuskey"
                :tplData="saleListData"
                show-type="table"
                :tplResetFun="saleListResetFun"
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
import {pagination, ylsSale} from '../../../../common/js/publicData.js'
export default {
    mixins: [pagination('request')],
    mounted() {
            this.request();
    },
    data(){
        return {
            isHide: true,
            custNameRefCode: 'prj_customer_ref',
            custNameRefField: 'pk_customer',
            custNameRefTemplate: {},
            custName: '',
            controlShareholder: '',
            saleStatus: '',
            sale_status_option: [
                {
                    label: '潜在营销机会',
                    value: 'POTENTIAL'
                },
                {
                    label: '意向待评估',
                    value: 'INTENTION'
                },
                {
                    label: '方案洽谈中',
                    value: 'NEGOTIATING'
                },
                {
                    label: '暂缓',
                    value: 'SUSPENDED'
                },
                {
                    label: '立项审批',
                    value: 'PROJECT_APPROVAL'
                },
                {
                    label: '签约完成',
                    value: 'SIGNING_COMPLETED'
                },
            ],

            saleListFunnode: 'YLSBT003',
            saleListNexuskey: 'sale-manage',

            saleListData: {},

            delDialogVisible: false,
            delId: '',

            saleListResetFun($node) {
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
            var url = ylsSale + 'sale/saleInfo/page';
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
                    'searchMap': {
                        'pk_customer': this.custName,
                        'control_shareholder': this.controlShareholder,
                        'sale_status': this.saleStatus,

                    }
                }
            };
            this.$http({
                url: url,
                headers: {'Content-Type': 'application/json'},
                method: 'post',
                data: data,
                dataType: 'json'
            }).then(res => {
                this.$refs.saleListRef.setData('SaleInfo_t', res.data.data.content);
                this.totalElements = res.data.data.totalElements;
            }).catch(() => {
                this.$message({
                    message: '信息获取失败',
                    type: 'error'
                });
            });
        },

        addSaleInfo() {
            location.hash = '/sale/saleInfo/add';
        },

        advancedSearch() {
            this.request();
        },

        rowEditClick(scope) {
            location.hash = '/sale/saleInfo/detail/' + scope.row.pk_sale_info;
        },

        rowDeleteClick(scope) {
            this.delId = scope.row.pk_sale_info;
            this.delDialogVisible = true;
        },

        deleteConfirmClick() {
            this.$http({
                url: ylsSale + 'sale/saleInfo/deleteById',
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

        showSearch() {
            this.isHide = !this.isHide;
        },

        custNameRefTrigger(type, data) {
            if (type === 'change') {
                this.custName = data.value[0].id;
            }
        },

        custNameRefReset() {
            this.custName = '';
        }


    },
}
</script>
<<style>

</style>



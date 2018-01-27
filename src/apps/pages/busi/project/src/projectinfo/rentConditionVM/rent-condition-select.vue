
<template>
    <!-- 列表区域 -->
    <div class="list-main-container">
        <ifbp-template ref="rentDialogRef"
                    tplId="rentDialogId"
                    funnode="BT015"
                    nexuskey="rent_condition"
                    :tplData="rentDialogListData"
                    show-type="table" >
        </ifbp-template>
        <!--分页组件-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
        </el-pagination>
    </div>
</template>
<script>
import { pagination, ylsBusi } from '../../../../../../common/js/publicData.js'

export default {
    mixins: [pagination('refreshPage')],
    props: ["conditions","reload"],
    data() {
    return {
        rentDialogListData:[],
        mounted() {
            this.refreshPage();
        },

    }
  },
  created() {
     this.refreshPage();
  },
  watch :{
     reload(val){
 
         if(val === true){
             this.refreshPage();
         }
     },
  },
  methods: {
        refreshPage() {
        
                this.$http.post(ylsBusi + 'contr/rentCondition/page', {
                    pageNum: this.currentPage - 1,
                    pageSize: this.pageSize,
                     searchParams: {
                        searchMap: {
                        custCondList: [
                            {
                                'key': 'source_bill',
                                'oper': '=',
                                'value':""
                            },
                            
                            ]
                        }
                    }
                }).then((resp) => {
             
                    if (resp.data.success) {
                    
                        var  content = resp.data.data.content;
                        var  conditions = this.conditions;
                        var lastContent = content.filter(
                            function(item){
                                if(conditions){
                                    debugger;
                                    if($.inArray(item.pk_prj_rent_condition, conditions) ==-1) {
                                        return item;
                                    };
                                }
                            }
                        );
                     
                        this.$refs.rentDialogRef.setData('RentCondition_t',lastContent);
                        this.totalElements = resp.data.data.totalElements;
                    }
                })
        }


    }
};
</script>
<style>

</style>

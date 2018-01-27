<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">
        预生成凭证规则列表
      </h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button @click="addDrools" class="button-no-radius" type="primary">
          新增规则
        </el-button>
      </div>
      <div class="fr">
        <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
      </div>
    </div>
    <!-- 预生成凭证规则列表 -->
    <div class="list-main-container" id="quoteList">
      <ifbp-template :editable="formEditable" 
        :tplResetFun="templateTableFormResetFun"
        @delete-table-click="tableDeleteClick" 
        @more-table-click="tableFormMoreClick"
        @form-confirm-click="templateTableFormConfirm"
        @form-cancel-click="templateTableFormCancel"
        funnode="YLSBT009" nexuskey="ylsifacevoucherdrools" 
        ref="prevoucherdroolsList" show-type="table-form" 
        tplid="prevoucherdrools-template">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
      <!--删除确认Dialog-->
      <el-dialog :modal="true" size="tiny" title="提示" v-model="delDialogVisible">
        <span>
          确认删除该项预生成凭证规则？删除后无法恢复。
        </span>
        <span class="dialog-footer" slot="footer">
          <el-button @click="delDialogVisible = false">
            取 消
          </el-button>
          <el-button @click="deleteConfirmClick" type="primary">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'
export default {
  mixins: [pagination('request')],//分页
  data() {
    return {
      deletingIndex:null,
      // 查询模板编码
      searchTemplateCode: "YLSCXMB_IFACE_CONFIG",
      searchTemplateParam:{},
      formEditable: true,
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId: "",
      templateTableFormResetFun($node){
        //获取table,此id为ui模板上面的表格Id
        let $table = $node.find("el-table");
        //获取操作按钮html片段
        let operateArr = [{icon:'more',title:"凭证明细"},
                          {icon:'delete',title:'删除'}
                         ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
  },
  mounted() {
    this.request();
  },
  methods: {
    // 新增预生成凭证规则
    addDrools() {
      // 新增清空表单数据
      this.$refs.prevoucherdroolsList.setData('IfacePrevoucherDrools', {});
      this.$refs.prevoucherdroolsList.formShow = true;
      this.$refs.prevoucherdroolsList.getTableComp().closeExpandRow();
    },
    //表单保存
    templateTableFormConfirm(type) {
      this.$refs.prevoucherdroolsList.validate((valid) => {
        if(valid){
          if(type === 'form'){
            var formData = this.$refs.prevoucherdroolsList.getData('IfacePrevoucherDrools');
            var url = ylsBusi+'iface/prevoucherdrools/create';
            this.$http({
              url: url,
              method: 'POST',
              data: formData,
              dataType: 'json'
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: '添加预生成凭证生成规则成功！',
                  type: 'success'
                });
                var droolsList= this.$refs.prevoucherdroolsList.getData('IfacePrevoucherDrools_t');
                droolsList.unshift(res.data.data);
                this.templateTableFormCancel(type);
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(() => {
              this.$message({
                message: '接口调用失败！',
                type: 'error'
              });
            });
          }
        }
      } ,type);
    },
    // 表单取消
    templateTableFormCancel(type) {
      if(type === 'form'){
        this.$refs.prevoucherdroolsList.formShow = false;
      }else{
        this.$refs.prevoucherdroolsList.getTableComp().closeExpandRow();
      }
    },
    // 查询
    handleSearch(searchTemplate){
      this.currentPage = 1;//点查询按钮当前页设为1
      this.searchTemplateParam = searchTemplate;
      this.request();
    },
    // 预生成凭证规则明细
    tableFormMoreClick(scope){
      var droolsid = scope.row.pk_iface_prevoucher_drools;
      this.$root.$router.push({path:'/iface/prevoucherdroolsdetail/'+droolsid});
    },
    //删除操作
    tableDeleteClick(scope) {
      this.deletingIndex = scope.$index;
      this.delId = scope.row.pk_iface_prevoucher;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+"/iface/prevoucherdrools/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
      .then(res => {
        if (res.data.success === true) {
          this.delDialogVisible = false;
          this.$message({
            message: "预生成凭证生成规则删除成功",
            type: "success"
          });
          var typeList = this.$refs.prevoucherList.getData('IfacePrevoucherDrools_t');
          typeList.splice(this.deletingIndex, 1);
          this.totalElements--;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      })
      .catch(e => {
        this.$message({
          message: "发生异常,预生成凭证生成规则删除失败!",
          type: "error"
        });
      });
    },
    //后台请求
    request() {
      var url = ylsBusi+"iface/prevoucherdrools/page";
      var data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: this.currentPage - 1,
        pageSize: this.pageSize,
        searchParams: {
          searchMap: {qtAggVO:JSON.stringify(this.searchTemplateParam)}
        }
      };
      this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: data,
          dataType: "json"
        })
        .then(res => {
          var originalValue = res.data.data.content;
          this.$refs.prevoucherdroolsList.setData('IfacePrevoucherDrools_t',originalValue);
          this.totalElements = res.data.data.totalElements; // 总条数
        })
        .catch(e => {
          console.log(e);
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    }
  }
};
</script>
<style>
</style>
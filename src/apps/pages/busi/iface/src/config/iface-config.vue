<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">
        接口服务配置
      </h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button @click="addInfo" class="button-no-radius" type="primary">
          新增
        </el-button>
      </div>
      <div class="fr">
        <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
      </div>
    </div>
    <!-- 投放申请列表 -->
    <div class="list-main-container" id="quoteList">
      <!--模板组件-->
      <ifbp-template :tpl-data="valuemapListData" :editable="formEditable" 
        :tplResetFun="templateTableFormResetFun"
        @delete-table-click="tableDeleteClick" 
        @edit-table-click="tableFormEditClick" 
        @form-confirm-click="templateTableFormConfirm"
        @form-cancel-click="templateTableFormCancel"
        @more-table-click="logView"
        funnode="YLSBT004" nexuskey="ylsifaceserviceconfig" 
        ref="valuemapForm" show-type="table-form" 
        tplid="valuemap-template">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
      <!--删除确认Dialog-->
      <el-dialog :modal="true" size="tiny" title="提示" v-model="delDialogVisible">
        <span>
          确认删除该项映射配置？删除后无法恢复。
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
      valuemapListData: {},
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
        let operateArr = [{icon:'edit',title:"编辑"},
                          {icon:'delete',title:'删除'},
                          {icon:'more',title:'查看日志'}
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
    // 添加按钮
    addInfo() {
      // 新增清空表单数据
      this.$refs.valuemapForm.setData('InterfaceConfig', {});
      this.$refs.valuemapForm.formShow = true;
      this.$refs.valuemapForm.getTableComp().closeExpandRow();
    },
    //表单保存
    templateTableFormConfirm(type) {
      this.$refs.valuemapForm.validate((valid) => {
        if(valid){
          if(type === 'form' || type === 'table-form'){
            var formData = this.$refs.valuemapForm.getData('InterfaceConfig');
            var url = ylsBusi+'iface/serviceconfig/create';
            if(type === 'table-form'){
              url = ylsBusi+'iface/serviceconfig/update';
            }
            this.$http({
              url: url,
              method: 'POST',
              data: formData,
              dataType: 'json'
            }).then((res) => {
              if (res.data.success) {
                this.$message({
                  message: '恭喜你，添加成功！',
                  type: 'success'
                });
                this.templateTableFormCancel('form');
                this.request();
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
        this.$refs.valuemapForm.formShow = false;
      }else{
        this.$refs.valuemapForm.getTableComp().closeExpandRow();
      }
    },
    // 查询
    handleSearch(searchTemplate){
      this.currentPage = 1;//点查询按钮当前页设为1
      this.searchTemplateParam = searchTemplate;
      this.request();
    },
    // 编辑按钮
    tableFormEditClick(scope){
      var row = scope.row;
      this.$refs.valuemapForm.getTableComp().expandRow(row);
      this.formEditable=true;
      this.$refs.valuemapForm.formShow = false;
      this.$refs.valuemapForm.setData('InterfaceConfig', row);
    },
    //删除操作
    tableDeleteClick(scope) {
      this.delId = scope.row.pk_iface_name;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+"/iface/serviceconfig/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
      .then(res => {
        if (res.data.success === true) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.delDialogVisible = false;
          this.request();
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      })
      .catch(e => {
        this.$message({
          message: "信息删除失败！",
          type: "error"
        });
      });
    },
    // 查看日志
    logView(scope, rowIndex){
      var configID = scope.row.pk_iface_name;
      this.$root.$router.push({path:'/iface/servicelog/'+configID});
    },
    //后台请求
    request() {
      var url = ylsBusi+"iface/serviceconfig/page";
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
          this.$refs.valuemapForm.setData('InterfaceConfig_t',originalValue);
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

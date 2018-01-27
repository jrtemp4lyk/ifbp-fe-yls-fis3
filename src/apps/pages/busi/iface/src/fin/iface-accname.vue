<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">
        预生成凭证科目信息
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
    <!-- 预生成凭证科目信息列表 -->
    <div class="list-main-container" id="quoteList">
      <!--模板组件-->
      <ifbp-template :editable="formEditable" 
        :tplResetFun="templateTableFormResetFun"
        @delete-table-click="tableDeleteClick" 
        @edit-table-click="tableFormEditClick" 
        @form-confirm-click="templateTableFormConfirm"
        @form-cancel-click="templateTableFormCancel"
        funnode="YLSBT008" nexuskey="ylsifaceaccname" 
        ref="accnameForm" show-type="table-form" 
        tplid="accname-template">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>
      <!--删除确认Dialog-->
      <el-dialog :modal="true" size="tiny" title="提示" v-model="delDialogVisible">
        <span>
          确认删除该项预生成凭证科目信息？删除后无法恢复。
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
      editingIndex: null,
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
        let operateArr = [{icon:'edit',title:"编辑"},
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
    // 添加按钮
    addInfo() {
      // 新增清空表单数据
      this.$refs.accnameForm.setData('IfaceAccountName', {});
      this.$refs.accnameForm.formShow = true;
      this.$refs.accnameForm.getTableComp().closeExpandRow();
    },
    //表单保存
    templateTableFormConfirm(type) {
      this.$refs.accnameForm.validate((valid) => {
        if(valid){
          if(type === 'form' || type === 'table-form'){
            var formData = this.$refs.accnameForm.getData('IfaceAccountName');
            var url = ylsBusi+'iface/accname/create';
            if(type === 'table-form'){
              url = ylsBusi+'iface/accname/update';
            }
            this.$http({
              url: url,
              method: 'POST',
              data: formData,
              dataType: 'json'
            }).then((res) => {
              if (res.data.success) {
                if(type === 'table-form'){
                  this.$message({
                    message: '修改预生成凭证科目信息成功！',
                    type: 'success'
                  });
                  debugger;
                  var typeList= this.$refs.accnameForm.getData('IfaceAccountName_t');
                  this.$set(typeList, this.editingIndex, res.data.data);
                }else{
                  this.$message({
                    message: '添加预生成凭证科目信息成功！',
                    type: 'success'
                  });
                  var typeList= this.$refs.accnameForm.getData('IfaceAccountName_t');
                  typeList.unshift(res.data.data);
                }
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
        this.$refs.accnameForm.formShow = false;
      }else{
        this.$refs.accnameForm.getTableComp().closeExpandRow();
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
      this.editingIndex = scope.$index;
      var asstypeTempData = JSON.parse(JSON.stringify(scope.row));//对象拷贝
      this.$refs.accnameForm.getTableComp().expandRow(scope.row);
      this.formEditable=true;
      this.$refs.accnameForm.formShow = false;
      this.$refs.accnameForm.setData('IfaceAccountName', asstypeTempData);
    },
    //删除操作
    tableDeleteClick(scope) {
      this.deletingIndex = scope.$index;
      this.delId = scope.row.pk_iface_name;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+"/iface/accname/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
      .then(res => {
        if (res.data.success === true) {
          this.delDialogVisible = false;
          this.$message({
            message: "预生成凭证科目信息删除成功",
            type: "success"
          });
          var typeList = this.$refs.accnameForm.getData('IfaceAccountName_t');
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
          message: "发生异常,预生成凭证科目信息删除失败!",
          type: "error"
        });
      });
    },
    //后台请求
    request() {
      var url = ylsBusi+"iface/accname/page";
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
          this.$refs.accnameForm.setData('IfaceAccountName_t',originalValue);
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
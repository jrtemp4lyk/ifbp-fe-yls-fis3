<template>
  <div class="dataitem-panel">
    <div class="dataitem-tablepanel" id="dataitemList">
      <div class="operator-container">
        <div class="fl">
          <el-button @click="addInfo" class="button-no-radius" type="primary">
            新增规则数据项
          </el-button>
        </div>
      </div>
      <!--规则数据项列表-->
      <ifbp-template :editable="formEditable" 
        :tplResetFun="templateTableFormResetFun"
        @delete-table-click="tableDeleteClick" 
        @edit-table-click="tableFormEditClick" 
        @form-confirm-click="templateTableFormConfirm"
        @form-cancel-click="templateTableFormCancel"
        funnode="YLSBT009" nexuskey="ylsprecouvherdataitem" 
        ref="droolsDataitemForm" show-type="table-form" 
        tplid="droolsDataitem-template">
      </ifbp-template>
    </div>
    <!--删除确认Dialog-->
    <el-dialog :modal="true" size="tiny" title="提示" v-model="delDialogVisible">
      <span>
        确认删除该项预生成凭证规则数据项？删除后无法恢复。
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
</template>
<script>
import { ylsBusi } from '../../../../../common/js/publicData.js'
export default {
  data() {
    return {
      editingIndex: null,
      deletingIndex:null,
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
  props:{
    droolsid:null
  },
  methods: {
    // 添加按钮
    addInfo() {
      // 新增清空表单数据
      this.$refs.droolsDataitemForm.setData('IfacePreVoucherDataItem', {pk_iface_prevuh_drools:this.droolsid});
      this.$refs.droolsDataitemForm.formShow = true;
      this.$refs.droolsDataitemForm.getTableComp().closeExpandRow();
    },
    //表单保存
    templateTableFormConfirm(type) {
      this.$refs.droolsDataitemForm.validate((valid) => {
        if(valid){
          if(type === 'form' || type === 'table-form'){
            var formData = this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem');
            var url = ylsBusi+'iface/prevoucherdataitem/create';
            if(type === 'table-form'){
              url = ylsBusi+'iface/prevoucherdataitem/update';
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
                    message: '修改预生成凭证规则数据项成功！',
                    type: 'success'
                  });
                  var typeList= this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem_t');
                  this.$set(typeList, this.editingIndex, res.data.data);
                }else{
                  this.$message({
                    message: '添加预生成凭证规则数据项成功！',
                    type: 'success'
                  });
                  var typeList= this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem_t');
                  typeList.push(res.data.data);
                }
                this.templateTableFormCancel(type);
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch((e) => {
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
        this.$refs.droolsDataitemForm.formShow = false;
      }else{
        this.$refs.droolsDataitemForm.getTableComp().closeExpandRow();
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
      this.$refs.droolsDataitemForm.getTableComp().expandRow(scope.row);
      this.formEditable=true;
      this.$refs.droolsDataitemForm.formShow = false;
      this.$refs.droolsDataitemForm.setData('IfacePreVoucherDataItem', asstypeTempData);
    },
    //删除操作
    tableDeleteClick(scope) {
      this.deletingIndex = scope.$index;
      this.delId = scope.row.pk_iface_prevuh_dataitem;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+"/iface/prevoucherdataitem/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
      .then(res => {
        if (res.data.success === true) {
          this.delDialogVisible = false;
          this.$message({
            message: "预生成凭证规则数据项删除成功",
            type: "success"
          });
          var typeList = this.$refs.droolsDataitemForm.getData('IfacePreVoucherDataItem_t');
          typeList.splice(this.deletingIndex, 1);
          this.totalElements--;
        } else {
          this.$message({
            message: res.data.msg,
            type: "error"
          });
        }
      }).catch(e => {
        this.$message({
          message: "发生异常,预生成凭证规则数据项删除失败!",
          type: "error"
        });
      });
    },
    //后台请求
    request() {
      var url = ylsBusi+"iface/prevoucherdataitem/listAllOfDrools";
      this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.droolsid,
          dataType: "json"
        })
        .then(res => {
          var originalValue = res.data.data;
          this.$refs.droolsDataitemForm.setData('IfacePreVoucherDataItem_t',originalValue);
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
.dataitem-tablepanel{
  border-top:1px solid #e3e3e3;
  padding:10px 20px 10px 20px;
}
</style>
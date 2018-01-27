<!-- 保证担保信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="operationTable"
                        tplId="operationTemplate"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="operationData"
                        :tplResetFun="operationResetFun"
                        :tplMethods="operationTplMethods"
                        :methods="t_Methods"
                        @form-confirm-click="operationFormConfirm"
                        @form-cancel-click="operationFormCancel"
                        @edit-table-click="operationEditTableRow"
                        @delete-table-click="operationDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 担保信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="operationDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="operationDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="operationDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js';
export default {
  props: ['source_bill'],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      operationDelVisible: false,
      rmoveindex: '',
      delId: '',
      funnode:'BT004',
      nexusKey:'OperationProtocol',
      operationData: {
       
      },
      t_Methods:{

      },
      operationResetFun($node) {
        if(oThis.invisible) {
          return;
        }
      let $refNode= this.getNodeById($node, '1nnheivkgfc');//获取客户参照
      if( oThis.pid !== undefined){
        $refNode.attr("v-bind:disabled", 'true'); //客户参照只读
      } else {
        $refNode.attr("v-bind:disabled", 'false'); //客户参照可编辑
      }
        let $table = $node.find("el-table");
        let operateArr = [
          {
            title: '编辑',

            icon: 'edit'
          },
          {
            title: '删除',

            icon: 'delete'
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      operationTplMethods: {
        // form的保存操作
      }
    };
  },
  //获取数据数据初始化操作
  created() {},
  //页面操作
  mounted() {
    this.request();
  },
  methods: {
//请求方法
    request() {
        if (this.source_bill != '') {
          this.requestOperation();
      }
    },
    closeAddForm(){
      this.$refs['operationTable'].comp.formShow = false; //关闭添加表单事件
    },
    //请求保证担保信息
    requestOperation() {
      let data = {
        pageNum: 0,
        pageSize: 10,
        searchParams: {
          searchMap: {
            source_bill: this.source_bill,
          }
        }
      };
      this.$http({
        url:  ylsBusi+'cust/operation/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data,
        dataType: 'json'
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs['operationTable'].setData(
            'OperationProtocol_t',
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
    },
    //保证担保情况保存
    operationFormConfirm() {
      //获取当前数据
      let url;
      let data1 = this.$refs.operationTable.comp.OperationProtocol;
        this.$http({
            url: ylsBusi+'cust/operation/UpdateOrCreate',
            // headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:data1,
        }).then(res => {
            location.hash = '/operation/list';
            this.editable = false;
            let originalValue = res.data.data;
            this.$refs["operationTable"].setData(
              'OperationProtocol_t',
              originalValue
            );
            this.$message({
            message: '保存成功',
            type: 'success',
          });
        }).catch(e => {
          this.$message({
            message: '保存失败',
            type: 'error',
          });
        });
    },
    // 保证担保信息form的取消操作
    operationFormCancel(type) {
      if (type === 'form') {
        this.$refs['operationTable'].comp.formShow = false;
        this.$emit("closeAddForm");
      } else {
        this.$refs['operationTable'].getTableComp().closeExpandRow();
      }
    },
    //担保编辑
    operationEditTableRow(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['operationTable'].getTableComp().expandRow(row);
      this.$refs['operationTable'].formShow = false;
      //operationTable为表单数据对象参数
      this.$refs['operationTable'].setData('OperationProtocol', row);
    },
    //担保信息删除提示
    operationDeleteTableRow(scope) {
      this.operationDelVisible = true;
      this.pk_operation_protocol = scope.row.pk_operation_protocol;
    },
    //担保信息删除
    operationDeleteClick() {
      this.$http({
        url: ylsBusi+'cust/operation/deleteById',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        dataType: 'json',
        data: this.delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.requestOperation();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })
        .catch(e => {
          this.$message({
            message: '信息删除失败',
            type: 'error'
          });
        });
      this.operationDelVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

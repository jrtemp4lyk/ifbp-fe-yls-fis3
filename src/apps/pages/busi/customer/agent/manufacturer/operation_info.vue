<!-- 合作协议模块 -->
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
    <!-- 合作协议信息 删除提示框 -->
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
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  //应用vue传过来接收参数
  props: ['pk_customer'],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      operationDelVisible: false,
      rmoveindex: '',
      delId: '',
      funnode:'BT005',
      nexusKey:'cooperation_agreement',
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
  //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.request();
    }
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
        if (this.pk_customer != '' && this.pk_customer != undefined) {
          this.requestOperation();
      }
    },
    closeAddForm(){
      this.$refs['operationTable'].comp.formShow = false; //关闭添加表单事件
    },
    //请求合作协议信息
    requestOperation() {
      let data = {
        pageNum: 0,
        pageSize: 10,
        searchParams: {
          searchMap: {
            custCondList:[{key:"agent_name",oper:"=",value:this.pk_customer}]
          }
        }
      };
      this.$http({
        url:  ylsBusi+'cust/operation/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data:data,
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
    //合作协议保存
    operationFormConfirm() {
      //获取当前数据
      let url;
      let data = this.$refs.operationTable.comp.OperationProtocol;
      data.agent_name = this.pk_customer;
        this.$http({
            url: ylsBusi+'cust/operation/UpdateOrCreate',
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data:JSON.parse(JSON.stringify(data)),
        }).then(res => {
            // location.hash = '/operation/list';
            this.editable = false;
           
            // this.$refs["operationTable"].setData(
            //   'OperationProtocol_t',
            //   originalValue
            // );
            if(res.data.success === true){
               this.$message({
                message: '保存成功',
                type: 'success',
              });
              // let originalValue = res.data.data;
              //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
              // let linarraydata = this.$refs.operationTable.getData(
              //   "OperationProtocol_t"
              // );
              /**@augments 移除位置 
               * @augments 移除个数
               * @augments 用新的对象替换（不传值则删除）
               */
                // if (this.rmoveindex !== "") {
                //   linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                // } else {
                  //加入数组开始
                //   linarraydata.unshift(this.originalValue);
                // } 

                 //给对象赋值
                // this.$refs.operationTable.setData(
                //   "OperationProtocol_t",
                //   JSON.parse(JSON.stringify(linarraydata))
                // );
                this.requestOperation();
                 //隐藏详情列表
                this.$refs['operationTable'].comp.formShow = false;
            }else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
            }
        })
        .catch(() => {
          this.$message({
            message: '保存失败',
            type: 'error',
          });
        });
    },
    // 合作协议form的取消操作
    operationFormCancel(type) {
      if (type === 'form') {
        this.$refs['operationTable'].comp.formShow = false;
        this.$emit("closeAddForm");
      } else {
        this.$refs['operationTable'].getTableComp().closeExpandRow();
      }
    },
    //合作协议编辑
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
    //合作协议删除提示
    operationDeleteTableRow(scope) {
      this.operationDelVisible = true;
      this.pk_operation_protocol = scope.row.pk_operation_protocol;
    },
    //合作协议删除
    operationDeleteClick() {
      this.$http({
        url: ylsBusi+'cust/operation/deleteById',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        dataType: 'json',
        data: this.delId
      })
        .then(res => {
          debugger;
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.requestOperation();
          } else {
            debugger;
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })
        .catch(e => {
          debugger;
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

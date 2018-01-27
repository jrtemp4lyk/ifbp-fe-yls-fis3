<!-- 保证担保信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="custpledgeRef"
                        tplId="custpledgeTemplate"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="custpledgeData"
                        :tplResetFun="custpledgeResetFun"
                        :tplMethods="custpledgeTplMethods"
                        :methods="t_Methods"
                        @form-confirm-click="custpledgeFormConfirm"
                        @form-cancel-click="custpledgeFormCancel"
                        @edit-table-click="custpledgeEditTableRow"
                        @delete-table-click="custpledgeDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 担保信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="custpledgeDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="custpledgeDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="custpledgeDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../../common/js/publicData.js';
export default {
  props: ['source_bill'],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      custpledgeDelVisible: false,
      rmoveindex: '',
      delId: '',
      funnode:'BT022',
      nexusKey:'custpledgeModify',
      custpledgeData: {
       
      },
      t_Methods:{
        handleRefChange(type, data) {  //参照变化处理函数 依据参照给 证件类型  证件号码赋值
           this.$refs['CustPledge-form'].model.identity_no = data.value[0].identity_no;
           this.$refs['CustPledge-form'].model.identity_type = data.value[0].identity_type;
        },
      },
      custpledgeResetFun($node) {
        // let $refNode= this.getNodeById($node, 'd6ivnfpjhb');//获取担保人参照
        // if($refNode.length){
        //   $refNode.attr("v-on:trigger", "handleRefChange"); //给参照添加trigger事件
        // }
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
      custpledgeTplMethods: {
        // form的保存操作
      }
    };
  },
  //监听引用传参后实时变动
  computed: {
    currentsource_bill() {
      return this.source_bill;
    }
  },
  //监听参数变动后方法
  watch: {
    source_bill(val) {
      this.request();
    }
  },
  //获取数据数据初始化操作
  created() { 
  },
  //页面操作
  mounted() {
    this.request();
  },
  methods: {
//请求方法
    request() {
        if (this.source_bill != '') {
          this.requestCustpledge();
      }
    },
    closeAddForm(){
      this.$refs['custpledgeRef'].comp.formShow = false; //关闭添加表单事件
    },
    //请求保证担保信息
    requestCustpledge() {
      let data = {
        pageNum: 0,
        pageSize: 10,
        searchParams: {
          searchMap: {
            custCondList:[{"key":"source_bill","oper":"=","value":this.source_bill}]
          }
        }
      };
      this.$http({
        url: ylsBusi + 'contr/modify/pledge/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data,
        dataType: 'json'
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs['custpledgeRef'].setData(
            'CustPledge_t',
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
    custpledgeFormConfirm() {
      //获取当前数据
      let url;
      let data = this.$refs.custpledgeRef.comp.CustPledge;
      if(data.pk_prj_cust_pledge){
         url = ylsBusi+'contr/modify/pledge/update';
      }else{
         url = ylsBusi+'contr/modify/pledge/create';
      }
      data.source_bill = this.source_bill;
          this.$http({
            url, //添加接口或修改接口
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.custpledgeRef.getData(
                  'CustPledge_t'
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                if (this.rmoveindex !== '') {
                   linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(this.originalValue); 
                }
                //给对象赋值
                this.$refs.custpledgeRef.setData(
                  'CustPledge_t',
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs['custpledgeRef'].comp.formShow = false;
                this.$emit("closeAddForm"); //触发父组件事件 让父组件关闭其他子组件添加表单
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            })
            .catch(() => {
              this.$message({
                message: '更新失败',
                type: 'error'
              });
            });
    },
    // 保证担保信息form的取消操作
    custpledgeFormCancel(type) {
      if (type === 'form') {
        this.$refs['custpledgeRef'].comp.formShow = false;
        this.$emit("closeAddForm");
      } else {
        this.$refs['custpledgeRef'].getTableComp().closeExpandRow();
      }
    },
    //担保编辑
    custpledgeEditTableRow(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['custpledgeRef'].getTableComp().expandRow(row);
      this.$refs['custpledgeRef'].formShow = false;
      //custpledgeRef为表单数据对象参数
      this.$refs['custpledgeRef'].setData('CustPledge', row);
    },
    //担保信息删除提示
    custpledgeDeleteTableRow(scope) {
      this.custpledgeDelVisible = true;
      this.delId = scope.row.pk_prj_cust_pledge;
    },
    //担保信息删除
    custpledgeDeleteClick() {
      this.$http({
        url: ylsBusi + 'contr/modify/pledge/deleteById',
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
            this.requestCustpledge();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })
        .catch(e => {
          this.$message({
            message: '信息删除失败！',
            type: 'error'
          });
        });
      this.custpledgeDelVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

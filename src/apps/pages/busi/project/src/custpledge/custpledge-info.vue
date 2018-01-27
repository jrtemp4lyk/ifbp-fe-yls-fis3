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
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  props: ['pk_customer','source_bill','invisible'],
  data() {
    let oThis = this;
    return {
      custpledgeDelVisible: false,
      rmoveindex: '',
      delId: '',
      aaa:'',
      bbb:'',
      funnode:'BT008',
      nexusKey:'custpledge',
      custpledgeData: {
        rules: {
          identity_no: [{ required: true,message:'证件号码不能为空!', trigger: 'blur' }],
          identity_type: [{ required: true,message:'证件类型不能为空!',trigger: 'change'}],
        },
        testOptionsVar:[]
      },
      t_Methods:{
          querySearchAsync(queryStr,callback){
            if(queryStr!=oThis.aaa&&oThis.aaa!=''){
               this.$refs['CustPledge-form'].model.phone='';
               oThis.aaa='';
            }
            oThis.arr=[                             //及时查询处理的下拉arr
              {"value": "北京", "address": "11111" }, 
              {"value": "北京月饼", "address": "22222" },
              { "value": "麻辣烫", "address": "广州" },
              { "value": "炸鸡", "address": "上海市" }
              ];
            callback(oThis.arr);
          },
          handleSelect(item){
            oThis.aaa=item.value;
            this.$refs['CustPledge-form'].model.phone=item.address;
          },
      },
      //重写dom
      custpledgeResetFun($node) {
        if(oThis.invisible) {
          return;
        }
        let $refNode= this.getNodeById($node, 'd6ivnfpjhb');//获取担保人
        let $refNodeParent=$refNode.parent();
        $refNode.remove();
        $refNodeParent.append('<el-autocomplete v-model="CustPledge.pk_customer" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>');
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
            custCondList:[{key:"source_bill",oper:"=",value:this.source_bill}]
          }
        }
      };
      this.$http({
        url: ylsBusi + 'prj/pledge/page',
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
    custpledgeFormConfirm(type) {
        this.$refs.custpledgeRef.validate(valid => {
          if (valid) {
              //获取当前数据
            let url;
            let data = this.$refs.custpledgeRef.comp.CustPledge;
            if(data.pk_prj_cust_pledge){
              url = ylsBusi+'prj/pledge/update';
            }else{
              url = ylsBusi+'prj/pledge/create';
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
                      console.log(res.data.data);
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
          }else{
            this.$message('校验未通过');
          }
        },type);
    },
    // 保证担保信息form的取消操作
    custpledgeFormCancel(type) {
      if (type === 'form') {
        this.$refs['custpledgeRef'].comp.formShow = false;
        this.$emit("closeAddForm");
      } else {
        this.$refs['custpledgeRef'].getTableComp().closeExpandRow();
        //填充备份值
        let CustplTable = this.$refs['custpledgeRef'].getData('CustPledge_t');
        CustplTable[this.baseEditIndex] = this.baseData;
        this.$refs['custpledgeRef'].setData('CustPledge_t', CustplTable);
      }
    },
    //担保编辑
    custpledgeEditTableRow(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['custpledgeRef'].getTableComp().expandRow(row);
      this.$refs['custpledgeRef'].comp.formShow = false;
      //custpledgeRef为表单数据对象参数
      this.$refs['custpledgeRef'].setData('CustPledge', row);
      this.aaa=this.$refs['custpledgeRef'].getFormData().pk_customer;
       // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //担保信息删除提示
    custpledgeDeleteTableRow(scope) {
      this.custpledgeDelVisible = true;
      this.delId = scope.row.pk_prj_cust_pledge;
    },
    //担保信息删除
    custpledgeDeleteClick() {
      this.$http({
        url: ylsBusi + 'prj/pledge/deleteById',
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

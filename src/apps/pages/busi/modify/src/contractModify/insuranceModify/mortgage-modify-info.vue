<!-- 抵押担保信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="mortgageRef"
                        tplId="mortgageTemplate"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="mortgageData"
                        :tplResetFun="mortgageResetFun"
                        :tplMethods="mortgageTplMethods"
                        @form-confirm-click="mortgageFormConfirm"
                        @form-cancel-click="mortgageFormCancel"
                        @edit-table-click="mortgageEditTableRow"
                        @delete-table-click="mortgageDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 抵押担保信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="mortgageDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mortgageDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="mortgageDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../../common/js/publicData.js';
export default {
  props: ['source_bill','invisible'],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      mortgageDelVisible: false,
      rmoveindex: '',
      delId: '',
      funnode:'BT022',
      nexusKey:'mortgageModify',
      mortgageData: {
       
      },
      mortgageResetFun: function($node) {
        if(oThis.invisible) {
          return;
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
      mortgageTplMethods: {
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
          this.requestMortgage();
      }
    },
    closeAddForm(){
        this.$refs['mortgageRef'].comp.formShow = false;
    },
    //请求抵押担保信息
    requestMortgage( ) {
      let data = {
        pageNum: 0,
        pageSize: 10,
        searchParams: {
          searchMap: {
            custCondList:[
              {key:'source_bill',oper:'=',value:this.source_bill},
              {key:'guarantee_type',oper:'=',value:'COLLATERAL'}
              ]
          }
        }
      };
      this.$http({
        url: ylsBusi + 'contr/modify/mp/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: data,
        dataType: 'json'
      })
        .then(res => {
          this.originalValue = res.data.data.content;
          this.$refs['mortgageRef'].setData(
            'mortgagePledgeEntity0_t',
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
    //抵押担保情况保存
    mortgageFormConfirm() {
      //获取当前数据
      let url;
      let data = this.$refs.mortgageRef.comp.mortgagePledgeEntity0;
      if(data.pk_mortgage_pledge){
         url = ylsBusi+'contr/modify/mp/update';
      }else{
         url = ylsBusi+'contr/modify/mp/create';
      }
      data.source_bill = this.source_bill;
      data.guarantee_type='COLLATERAL'; //添加抵押担保区分字段（抵押质押在一个表）
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
                let linarraydata = this.$refs.mortgageRef.getData(
                  'mortgagePledgeEntity0_t'
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
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                this.$refs.mortgageRef.setData(
                  'mortgagePledgeEntity0_t',
                  JSON.parse(JSON.stringify(linarraydata))
                ); 

                //隐藏详情列表
                this.$refs['mortgageRef'].comp.formShow = false;
                this.$emit("closeAddForm"); 
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
    // 抵押担保信息form的取消操作
    mortgageFormCancel: function(type) {
      if (type === 'form') {
        this.$refs['mortgageRef'].comp.formShow = false;
        this.$emit("closeAddForm");
      } else { 
        this.$refs['mortgageRef'].getTableComp().closeExpandRow();
      }
    },
    //抵押担保编辑
    mortgageEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row; 
      this.$refs['mortgageRef'].getTableComp().expandRow(row);
      this.$refs['mortgageRef'].formShow = false;
      //mortgageRef为表单数据对象参数
      this.$refs['mortgageRef'].setData('mortgagePledgeEntity0', row);
    },
    //抵押担保信息删除提示
    mortgageDeleteTableRow: function(scope) {
      this.mortgageDelVisible = true;
      this.delId = scope.row.pk_mortgage_pledge;
    },
    //抵押担保信息删除
    mortgageDeleteClick() {
      this.$http({
        url: ylsBusi + 'contr/modify/mp/deleteById',
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
            this.requestMortgage();
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
      this.mortgageDelVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

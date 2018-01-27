<template>
<!--租赁物信息管理模块-->
<div>
          <ifbp-template ref="busirenttingRef"
                        tplId="busirentting"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="busirenttingData"
                        :tplResetFun="renttingResetFun"
                        :methods="changeMethods"
                        @form-confirm-click="renttingFormConfirm"
                        @form-cancel-click="renttingFormCancel"
                        show-type="table-form"
                        @edit-table-click="renttingFormedit"
                        @delete-table-click="renttingFormdelete"
                        >
          </ifbp-template>

    <!-- 业务租赁物 删除提示框 -->
    <el-dialog
      title='提示'
      v-model='renttingDelVisible'
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="renttingDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="renttingDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["pk_prjId","type","invisible","Leasehold"],
  data() {
    let oThis = this;
    //校验
    let validatecustomer = function(rule, value, callback) {
      
    };
    return {
      Leasehold:'',
      
      scrollDom: document.getElementsByClassName('view')[0],
      renttingDelVisible: false,
      rmoveindex: '',
      delId: '',
      //租赁物
      renttingIcons: [
        {
          icon: 'plus',
          click: function() {
            if (oThis.pk_prjId === '') {
              oThis.$message({
                message: '未获取到项目',
                type: 'error'
              });
              return;
            }
            let uitemplateComp = oThis.$refs.busirenttingRef.comp;
            let table = uitemplateComp.$refs['proRentThing_t_ref'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.busirenttingRef.setData('proRentThing', {
              // mobile:'13'
            });
            oThis.rmoveindex = '';
            uitemplateComp.$refs['proRentThing_ref'].resetFields();
          }
        }
      ],
      funnode:'BT008',
      //type=prj 然后372a2fcb-1db3-4ca1-98a1-c235e40329e7 否者a7715073-8a24-420a-86de-9110786e8e4b
      nexuskey: oThis.type==='prj' ?'rentthingprjUI':(oThis.type==='prjApproval' ?'rentThing-prjApproval':'rentthing_busi_apply'),

      busirenttingData: {
        IsShowCust:'',
        rules: {
          thing_name: [
            { required: true, message: '请输入租赁物名称', trigger: 'blur' }
          ]
        }
      },
      //渲染表格
      renttingResetFun: function($node) {
        if(oThis.invisible) {
          return;
        }

        //获取供应商的节点
        let $cust = $node.find("el-ref[v-model='proRentThing.pk_consumer']");
        //如果主表选择直租，该组件可见，否则不可见
        debugger;
       
        //$cust.parent().css("v-bind:display",'IsShowCust');
        // $cust.parent().attr("v-bind:style='{display:IsShowCust}'")
        $cust.parent().attr("v-bind:style","{display:IsShowCust}")
      

        //绑定事件
        //数量
        let $thing_number = $node.find("el-number[v-model='proRentThing.thing_number']");
        if($thing_number.length) {
          // 添加绑定事件, 数量绑定thing_numberChange
          $thing_number.attr("v-on:change", "thing_numberChange");
        };
        //设备单价
        let $unit_cost = $node.find("el-money[v-model='proRentThing.unit_cost']");
        if($unit_cost.length) {
          // 添加绑定事件, 设备单价绑定unit_costChange
          $unit_cost.attr("v-on:change", "unit_costChange");
        };

        // let $table = this.getNodeById($node, id_co);
        let $table = $node.find('el-table');
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
      changeMethods:{
          thing_numberChange:function(data){
            if(data&&data!==''){
              if(oThis.$refs.busirenttingRef.comp.proRentThing.unit_cost!==''){
                    let unit_cost=oThis.$refs.busirenttingRef.comp.proRentThing.unit_cost;
                    let thing_number=data;
                    oThis.$refs.busirenttingRef.comp.proRentThing.total_cost=thing_number*unit_cost;
                  }
            }
          },
          unit_costChange:function(data){
            if(data&&data!==''){
              if(oThis.$refs.busirenttingRef.comp.proRentThing.thing_number!==''){
                    let unit_cost=data;
                    let thing_number=oThis.$refs.busirenttingRef.comp.proRentThing.thing_number;
                    oThis.$refs.busirenttingRef.comp.proRentThing.total_cost=thing_number*unit_cost;
                  }
            }
          },

      },
    };
  },
  //监听引用传参后实时变动
  computed: {
    currentpk_prjId() {
      return this.pk_prjId;
    },
    currentLeasehold() {
      return this.Leasehold;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_prjId(val) {
      this.requestPrjrentting();
    },
    Leasehold(val) {
    
      
      if(this.Leasehold==='LEASEDIRECT'){
        
        this.$refs["busirenttingRef"].setData("IsShowCust",'inline-block');

      }else{
        debugger;
         this.$refs["busirenttingRef"].setData("IsShowCust",'none');
      }
    }
  },
  //获取数据数据初始化操作
  created() {},
  //页面操作
  mounted() {
    this.request();
  },
  methods: {
    /**
       *   初始响应方法
       **/
    request() {
      if (this.pk_prjId != '' && this.pk_prjId != undefined) {
        this.requestPrjrentting();
      }
    },
    //请求业务租赁物
    requestPrjrentting() {
      let data = {
        'orderList': [
          {
            'direction': 'desc',
            'property': 'ts'
          }
        ],
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            custCondList:[{key:'source_bill',oper:'=',value:this.pk_prjId}]
          }
        }
      };
      this.$http({
        url: ylsBusi + 'prj/rentth/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: data,
        dataType: 'json'
      })
        .then(res => {
          let originalValue = res.data.data.content;
          this.$refs['busirenttingRef'].setData(
            'proRentThing_t',
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
    },
    //租赁物取消按钮
    renttingFormCancel: function(type) {
      this.rmoveindex = '';
      //关闭表单或者是下拉显示行
      if (type === 'form') {
        this.$refs['busirenttingRef'].comp.formShow = false;
      } else {
        this.$refs['busirenttingRef'].getTableComp().closeExpandRow();
        
        let OtherContactTable = this.$refs.busirenttingRef.getData('proRentThing_t');
        OtherContactTable[this.baseEditIndex] = this.baseData;
        this.$refs.busirenttingRef.setData('proRentThing_t', OtherContactTable);
      }
    },
    //租赁物主表保存
    renttingFormConfirm: function() {
      //获取当前数据
      let url='';
      let data = this.$refs.busirenttingRef.comp.proRentThing;
      data.source_bill = this.pk_prjId;
      if(data.pk_prj_rent_thing){
         url = ylsBusi+'prj/rentth/update';
      }else{
         url = ylsBusi+'prj/rentth/create';
      }
      //保存校验
      this.$refs.busirenttingRef.comp.$refs[
        'proRentThing_ref'
      ].validate(valid => {
        if (valid) {  
          this.$http({
            url: url,
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
                // this.requestPrjrentting();
                let originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.busirenttingRef.getData(
                  'proRentThing_t'
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                
                if (this.rmoveindex !== '') {
                  linarraydata.splice(this.rmoveindex, 1, originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(originalValue);
                }
                this.$refs.busirenttingRef.setData(
                  'proRentThing_t',
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs['busirenttingRef'].comp.formShow = false;
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
        }
      });
    },
    //租赁物行编辑
    renttingFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['busirenttingRef'].getTableComp().expandRow(row);
      this.$refs['busirenttingRef'].comp.formShow = false;
      //proRentThing为表单数据对象参数
      this.$refs['busirenttingRef'].setData('proRentThing', row);
      
      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    // 租赁物删除提示
    renttingFormdelete: function(scope) {
      this.renttingDelVisible = true;
      this.delId = scope.row.pk_prj_rent_thing;
    },
    // 租赁物删除方法
    renttingDeleteClick() {
      this.$http({
        url: ylsBusi + 'prj/rentth/deleteById',
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
            this.requestPrjrentting();
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
      this.renttingDelVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

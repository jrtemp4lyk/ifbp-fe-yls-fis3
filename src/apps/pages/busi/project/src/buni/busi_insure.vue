<template>
<!--保险信息管理模块-->
  <div>
    <ifbp-template ref='insuranceRef'
                  tplId='insuranceId'
                  :funnode="funnode"
                  :nexuskey="nexuskey"
                  :tplData='insuranceData'
                  :tplResetFun='insuranceResetFun'
                  @form-confirm-click='insuranceFormConfirm'
                  @form-cancel-click='insuranceFormCancel'
                  show-type='table-form'
                  @edit-table-click='insuranceFormedit'
                  @delete-table-click='insuranceFormdelete'
                  >
    </ifbp-template>

    <!-- 业务保险 删除提示框 -->
    <el-dialog
      title='提示'
      v-model='insuranceDelVisible'
      :modal='true'
      size='tiny'>
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot='footer' class='dialog-footer'>
        <el-button @click="insuranceDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type='primary' @click='insuranceDeleteClick'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ['source_bill','type','invisible'],
  data() {
    let oThis = this;
    //校验
    let validateInsurance = function(rule, value, callback) {
    };
    return {
      scrollDom: document.getElementsByClassName('view')[0],
      insuranceDelVisible: false,
      rmoveindex: '',
      delId: '',
      back_object:'',
      //保险
      insuranceIcons: [
        {
          icon: 'plus',
          click: function() {
            if (oThis.source_bill === '') {
              oThis.$message({
                message: '未获取到项目',
                type: 'error'
              });
              return;
            }
            let uitemplateComp = oThis.$refs.insuranceRef.comp;
            let table = uitemplateComp.$refs['projectInsure-table'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.insuranceRef.setData('ProjectInsure', {
              // mobile:'13'
            });
            oThis.rmoveindex = '';
            uitemplateComp.$refs['projectInsure-form'].resetFields();
          }
        }
      ],
      funnode:'BT008',
      nexuskey: oThis.type==='prj' ? 'ProjectInsureUI':(oThis.type==='prjApproval' ? 'PrjApprovalInsureUI':'insurance_apply'),
      insuranceData: {
        // rules: {
        //   thing_name: [
        //     { required: true, message: '请输入保险名称', trigger: 'blur' }
        //   ]
        // }
      },
      //渲染表格
      insuranceResetFun: function($node) {
        if(oThis.invisible) {
          return;
        }

        var id_co='';
        if(oThis.type==='prj')
          id_co='hw9gl1c375v';
        else if(oThis.type==='contr')
          id_co='';
        else if(oThis.type==='prjApproval')
          id_co='e0zihi349o';
        else
          id_co="k9goab2oawo";
        var $table = this.getNodeById($node, id_co);
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
      }
    };
  },
  //监听引用传参后实时变动
  computed: {
    currentSource_bill() {
      return this.source_bill;
    }
  },
  //监听参数变动后方法
  watch: {
    source_bill(val) {
      this.requestInsurance();
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
      if (this.source_bill != '' && this.source_bill != undefined) {
        this.requestInsurance();
      }
    },
    //请求业务保险
    requestInsurance() {
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
            custCondList:[{key:'source_bill',oper:'=',value:this.source_bill}]
          }
        }
      };
      this.$http({
        url: ylsBusi + 'prj/ins/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: data,
        dataType: 'json'
      })
        .then(res => {
          let originalValue = res.data.data.content;
          this.$refs['insuranceRef'].setData(
            'ProjectInsure_t',
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
    //保险取消按钮
    insuranceFormCancel: function(type) {
      this.rmoveindex = '';
      //关闭表单或者是下拉显示行
      if (type === 'form') {
        this.$refs['insuranceRef'].comp.formShow = false;
      } else {
        this.$refs['insuranceRef'].getTableComp().closeExpandRow();
        let OtherContactTable = this.$refs.insuranceRef.getData('ProjectInsure_t');
        OtherContactTable[this.baseEditIndex] = this.baseData;
        this.$refs.insuranceRef.setData('ProjectInsure_t', OtherContactTable);
      }
    },
    //保险主表保存
    insuranceFormConfirm: function() {
      //获取当前数据
      let url='';
      let data = this.$refs.insuranceRef.comp.ProjectInsure;
      data.source_bill = this.source_bill;
      if(data.pk_prj_insure){
         url = ylsBusi+'prj/ins/update';
      }else{
         url = ylsBusi+'prj/ins/create';
      }
      //保存校验
      this.$refs.insuranceRef.comp.$refs[
        'projectInsure-form'
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
                this.requestInsurance();
                this.$refs['insuranceRef'].comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.message,
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
    //保险行编辑
    insuranceFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['insuranceRef'].getTableComp().expandRow(row);
      this.$refs['insuranceRef'].comp.formShow = false;
      //ProjectInsure为表单数据对象参数
      this.$refs['insuranceRef'].setData('ProjectInsure', row);

      
      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    // 保险删除提示
    insuranceFormdelete: function(scope) {
      this.insuranceDelVisible = true;
      this.delId = scope.row.pk_prj_insure;
    },
    // 保险删除方法
    insuranceDeleteClick() {
      this.$http({
        url: ylsBusi + 'prj/ins/deleteById',
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
            this.requestInsurance();
          } else {
            this.$message({
              message: res.data.message,
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
      this.insuranceDelVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

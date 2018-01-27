<template>
  <!--项目推进计划模块-->
  <div>
    <ifbp-template
      ref="baseRef"
      tplId="tplId"
      :funnode="funnode"
      :nexuskey="nexusKey"
      :tplData="tplData"
      :tplResetFun="resetFun"
      @form-confirm-click="formConfirm"
      @form-cancel-click="formCancel"
      show-type="table-form"
      @edit-table-click="formEdit"
      @delete-table-click="formDelete">
    </ifbp-template>

    <!-- 项目推进计划 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="delVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="deleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["source_bill"],
  data() {
    let oThis = this;
    //校验

    return {
      scrollDom: document.getElementsByClassName("view")[0],
      delVisible: false,
      rmoveindex: '',
      delId: '',
      //标签
      icons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.source_bill === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            let uitemplateComp = oThis.$refs.baseRef.comp;
            let table = uitemplateComp.$refs['PrjPromotPlan_t_ref'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.baseRef.setData('PrjPromotPlan', {
              // mobile:'13'
            });
            oThis.rmoveindex ='';
            uitemplateComp.$refs['PrjPromotPlan_ref'].resetFields();
          }
        }
      ],
      funnode: 'BT008',
      nexusKey: 'prjPromotPlan_prjApproval',
      tplData: {},
      editIndex:'',
      editBakData:{},
      //渲染表格
      resetFun: function($node) {
        let $table = this.getNodeById($node, 'bz9hbv2702j');
        let operateArr = [
          {
            title: "编辑",

            icon: "edit"
          },
          {
            title: "删除",

            icon: "delete"
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
    currentsource_bill() {
      return this.source_bill;
    }
  },
  //监听参数变动后方法
  watch: {
    source_bill(val) {
      this.requestPrjPromotPlan();
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
    /**
       *   初始响应方法
       **/
    request() {
      if (this.source_bill != '' && this.source_bill != undefined) {
        this.requestPrjPromotPlan();
      }
    },
    //请求项目推进计划
    requestPrjPromotPlan() {
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
            custCondList : [
              {
                'key': 'source_bill',
                'oper': '=',
                'value': this.source_bill
              }
            ]
          }
        }
      };
      this.$http({
        url: ylsBusi + 'prj/promotPlan/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: data,
        dataType: 'json'
      })
        .then(res => {
          let originalValue = res.data.data.content;
          this.$refs['baseRef'].setData(
            'PrjPromotPlan_t',
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
    //取消按钮
    formCancel: function(type) {
      this.rmoveindex = '';
      //关闭表单或者是下拉显示行
      if (type === 'form') {
        this.$refs['baseRef'].comp.formShow = false;
      } else {
        this.$refs['baseRef'].getTableComp().closeExpandRow();
        var bakData = this.$refs.baseRef.getData("PrjPromotPlan_t");
        bakData[this.editIndex] = this.editBakData;
        this.$refs.baseRef.setData("PrjPromotPlan_t",bakData);
      }
    },
    //项目推进计划主表保存
    formConfirm: function() {
      //获取当前数据
      let data = this.$refs.baseRef.comp.PrjPromotPlan;
      data.source_bill = this.source_bill;
      if(data.pk_prj_promot_plan){
         url = ylsBusi+'prj/promotPlan/update';
      }else{
         url = ylsBusi+'prj/promotPlan/create';
      }
      //保存校验
      this.$refs.baseRef.comp.$refs[
        'PrjPromotPlan_ref'
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
                this.requestPrjPromotPlan();
                this.$refs['baseRef'].comp.formShow = false;
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
    //项目推进计划 行编辑
    formEdit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['baseRef'].getTableComp().expandRow(row);
      this.$refs['baseRef'].formShow = false;
      this.$refs['baseRef'].setData('PrjPromotPlan', row);
      this.editBakData = JSON.parse(JSON.stringify(scope.row));
      this.editIndex = scope.$index;
    },
    //删除提示
    formDelete: function(scope) {
      this.delVisible = true;
      this.delId = scope.row.pk_prj_promot_plan;
    },
    // 删除方法
    deleteClick() {
      this.$http({
        url: ylsBusi + 'prj/promotPlan/deleteById',
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
            this.requestPrjPromotPlan();
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
      this.delVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

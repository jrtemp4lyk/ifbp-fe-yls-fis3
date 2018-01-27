<template>
<!--风险及控制措施汇总-->
<div>
          <ifbp-template ref="RiskControlRef"
                        tplId="RiskControl"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="RiskControlData"
                        :tpl-reset-fun="RiskResetFun"
                        :methods="bothlesseeMethods"
                        @form-confirm-click="RiskFormConfirm"
                        @form-cancel-click="RiskFormCancel"
                        show-type="table-form"
                        @edit-table-click="RiskFormedit"
                        @delete-table-click="RiskFormdelete"
                        >
          </ifbp-template>

    <!-- 风险 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="RiskDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RiskDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="RiskDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["source_bill","type"],
  data() {
    var oThis = this;
    //校验
    var validatecustomer = function(rule, value, callback) {
      
    };
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      RiskDelVisible: false,
      rmoveindex: "",
      delId: "",
      //出租人标签
      RiskIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.RiskControlRef.comp;
            var table = uitemplateComp.$refs["RiskControl_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.RiskControlRef.setData("projectRisk", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["RiskControl_t_ref"].resetFields();
          }
        }
      ],

      funnode: oThis.type==="prj" ? "BT008":"BT008",
      nexusKey: oThis.type==="prj" ?"prj_risk_control" : "prj_risk_control",
      RiskControlData: {
      },
      //渲染表格
      RiskResetFun: function($node) {
         var $refNode = this.getNodeById($node,'5r6hp3gwgju');
        // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
        // var $refNode = $node.find("el-ref");
        if($refNode.length) {
          // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
          $refNode.attr("v-on:trigger", "customerRefChange"); 
        };
        //项目承租信息表格id：owwkujphew
        var $table = $node.find("el-table");
        var operateArr = [
          {
            title: "编辑",

            icon: "edit"
          },
          {
            title: "删除",

            icon: "delete"
          }
        ];

        var operateHtml = this.getTableOperateHtml(operateArr);

        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      bothlesseeMethods: {
        customerRefChange: function(type, data) {

        },
      },
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
      this.requestPrjRisk();
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
      if (this.source_bill != "") {
        this.requestPrjRisk();
      }
    },
    //请求业务出租方
    requestPrjRisk() {
      var url;
      if (this.source_bill == "") {
        return;
      }
      url = ylsBusi + "prj/riskControl/page"; 
      var data = {
        "orderList": [
          {
            "direction": "desc",
            "property": "ts"
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
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
  
          this.originalValue = res.data.data.content;
         
          this.$refs["RiskControlRef"].setData(
            "RiskControl_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    //风险及控制措施汇总取消按钮
    RiskFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["RiskControlRef"].comp.formShow = false;
      } else {
        this.$refs["RiskControlRef"].getTableComp().closeExpandRow();

        var riskBakData = this.$refs.RiskControlRef.getData("RiskControl_t");
        riskBakData[this.riskEditIndex] = this.riskEditBakData;
        this.$refs.RiskControlRef.setData("RiskControl_t",riskBakData);
      }
    },
    //风险及控制措施汇总主表保存
    RiskFormConfirm: function() {
      //获取当前数据
      let url="";
      debugger;
      var data = this.$refs.RiskControlRef.comp.RiskControl;
      data.source_bill = this.source_bill;
 
      if(data.pk_risk_control){
         url = ylsBusi+'prj/riskControl/update';
      }else{
         url = ylsBusi+'prj/riskControl/create';
      }
      //保存校验
      this.$refs.RiskControlRef.comp.$refs[
        "RiskControl_ref"
      ].validate(valid => {
        if (valid) {
   
          this.$http({
            url: url,
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {

              if (res.data.success === true) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.requestPrjRisk();
                this.$refs["RiskControlRef"].comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.$message({
                message: "更新失败",
                type: "error"
              });
            });
        }
      });
    },
    //风险及控制措施汇总行编辑
    RiskFormedit: function(scope) {
      debugger;
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["RiskControlRef"].getTableComp().expandRow(row);
      this.$refs["RiskControlRef"].formShow = false;
      this.$refs['RiskControlRef'].setData('RiskControl', row);
      //编辑前备份
      this.riskEditBakData = JSON.parse(JSON.stringify(scope.row));
      this.riskEditIndex = scope.$index;
   
    },
    // 风险及控制措施汇总删除提示
    RiskFormdelete: function(scope) {
      this.RiskDelVisible = true;
      this.delId = scope.row.pk_risk_control;
    },
    // 风险及控制措施汇总删除方法
    RiskDeleteClick() {
      this.$http({
        url: ylsBusi + "prj/riskControl/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.requestPrjRisk();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      this.RiskDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

<template>
<!--逾期利率管理模块-->
<div>
          <ifbp-template ref="penaltyRuleDeRef"
                        tplId="penaltyRuleDe-template"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="penaltyRuleDeData"
                        :tplResetFun="penaltyRuleDeResetFun"
                        @form-confirm-click="penaltyRuleDeFormConfirm"
                        @form-cancel-click="penaltyRuleDeFormCancel"
                        show-type="table-form"
                        @edit-table-click="penaltyRuleDeFormedit"
                        @delete-table-click="penaltyRuleDeFormdelete"
                        >
          </ifbp-template>

    <!-- 业务逾期利率 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="penaltyRuleDeDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="penaltyRuleDeDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="penaltyRuleDeDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["pk_prjId","type"],
  data() {
    var oThis = this;
    //校验
    var validatecustomer = function(rule, value, callback) {
      
    };
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      penaltyRuleDeDelVisible: false,
      rmoveindex: "",
      delId: "",

      funnode:"BT009",

      nexusKey:"penalty_rule",
      
      //逾期利率
      penaltyRuleDeIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.penaltyRuleDeRef.comp;
            var table = uitemplateComp.$refs["PenaltyRuleDe_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.penaltyRuleDeRef.setData("PenaltyRuleDe", { });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["PenaltyRuleDe_ref"].resetFields();
          }
        }
      ],
    
      penaltyRuleDeData: {
          rules:{}
      },
      //渲染表格
      penaltyRuleDeResetFun: function($node) {
        
        var $table = this.getNodeById($node, "whw2hugq91");
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
      }
    };
  },
  //监听引用传参后实时变动
  computed: {
    currentpk_prjId() {
      return this.pk_prjId;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_prjId(val) {
      this.requestPayCondition();
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
      if (this.pk_prjId != "") {
        this.requestPayCondition();
      }
    },
    //请求业务逾期利率
    requestPayCondition() {

      var url;
      url = ylsBusi + "contr/penaltyRuleDe/page";
      var data = {
        "orderList": [
          {
            "direction": "desc",
            "property": "source_bill"
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
              'value': this.pk_prjId
            },
            {
               'key': 'is_base',
              'oper': '=',
              'value': '1'
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

          console.log();
          this.originalValue = res.data.data.content;
          console.log(this.originalValue);
          this.$refs["penaltyRuleDeRef"].setData(
            "PenaltyRuleDe_t",
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
    //逾期利率取消按钮
    penaltyRuleDeFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["penaltyRuleDeRef"].comp.formShow = false;
      } else {
        this.$refs["penaltyRuleDeRef"].getTableComp().closeExpandRow();
        var penaltyDatas = this.$refs.penaltyRuleDeRef.getData("PenaltyRuleDe_t");
        penaltyDatas[this.penaltyEditBakIndex] = this.penaltyEditBakData;
        this.$refs.penaltyRuleDeRef.setData("PenaltyRuleDe_t",penaltyDatas);
      }
    },
    //逾期利率主表保存
    penaltyRuleDeFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.penaltyRuleDeRef.comp.PenaltyRuleDe;
      data.source_bill = this.pk_prjId;
      data.is_base='1';
      if(data.pk_prj_rule){
         url = ylsBusi+'contr/penaltyRuleDe/update';
      }else{
         url = ylsBusi+'contr/penaltyRuleDe/create';
      }
      //保存校验
      this.$refs.penaltyRuleDeRef.comp.$refs[
        "PenaltyRuleDe_ref"
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
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.penaltyRuleDeRef.getData(
                  "PenaltyRuleDe_t"
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                
                if (this.rmoveindex !== "") {
                  linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(this.originalValue);
                }
                this.$refs.penaltyRuleDeRef.setData(
                  "proRentThing_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                this.$refs["penaltyRuleDeRef"].comp.formShow = false;
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
    //逾期利率行编辑
    penaltyRuleDeFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["penaltyRuleDeRef"].getTableComp().expandRow(row);
      this.$refs["penaltyRuleDeRef"].formShow = false;
      //PenaltyRuleDe为表单数据对象参数
      this.$refs["penaltyRuleDeRef"].setData("PenaltyRuleDe", row);
      this.penaltyEditBakData = JSON.parse(JSON.stringify(row));
      this.penaltyEditBakIndex = scope.$index;
    },
    // 逾期利率删除提示
    penaltyRuleDeFormdelete: function(scope) {
   
      this.penaltyRuleDeDelVisible = true;
      this.delId = scope.row.pk_prj_rule;
    },
    // 逾期利率删除方法
    penaltyRuleDeDeleteClick() {
   
      this.$http({
        url: ylsBusi + "contr/penaltyRuleDe/deleteById",
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
            this.requestPayCondition();
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
      this.penaltyRuleDeDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

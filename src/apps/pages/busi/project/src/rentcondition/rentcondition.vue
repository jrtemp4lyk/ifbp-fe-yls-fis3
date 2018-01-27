<template>
<!--起租条件管理模块-->
<div>
          <ifbp-template ref="rentConditionRef"
                        tplId="rentCondition-template"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="rentConditionData"
                        :tplResetFun="rentConditionResetFun"
                        @form-confirm-click="rentConditionFormConfirm"
                        @form-cancel-click="rentConditionFormCancel"
                        show-type="table-form"
                        @edit-table-click="rentConditionFormedit"
                        @delete-table-click="rentConditionFormdelete"
                        >
          </ifbp-template>

    <!-- 业务起租条件 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="rentConditionDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rentConditionDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="rentConditionDeleteClick">确 定</el-button>
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
      rentConditionDelVisible: false,
      rmoveindex: "",
      delId: "",

      funnode:"BT015",

      nexusKey:"rent_condition",
      
      //起租条件
      rentConditionIcons: [
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
            var uitemplateComp = oThis.$refs.rentConditionRef.comp;
            var table = uitemplateComp.$refs["RentCondition_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.rentConditionRef.setData("RentCondition", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["RentCondition_ref"].resetFields();
          }
        }
      ],
    
      rentConditionData: {
        rules:{}
      },
      //渲染表格
      rentConditionResetFun: function($node) {
        
        var $table = this.getNodeById($node, "37701xar6kjshlfnq8bgc4bo6r");
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
      this.requestRentCondition();
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
        this.requestRentCondition();
      }
    },
    //请求业务起租条件
    requestRentCondition() {
      var url;
      url = ylsBusi + "contr/rentCondition/page";
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
            // 'source_bill': this.pk_prjId
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
          this.$refs["rentConditionRef"].setData(
            "RentCondition_t",
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
    //起租条件取消按钮
    rentConditionFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["rentConditionRef"].comp.formShow = false;
      } else {
        this.$refs["rentConditionRef"].getTableComp().closeExpandRow();
      }
    },
    //起租条件主表保存
    rentConditionFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.rentConditionRef.comp.RentCondition;
      data.source_bill = this.pk_prjId;
      if(data.pk_prj_rent_condition){
         url = ylsBusi+'contr/rentCondition/update';
      }else{
         url = ylsBusi+'contr/rentCondition/create';
      }
      //保存校验
      this.$refs.rentConditionRef.comp.$refs[
        "RentCondition_ref"
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
                let linarraydata = this.$refs.rentConditionRef.getData(
                  "RentCondition_t"
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
                this.$refs.rentConditionRef.setData(
                  "proRentThing_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                this.$refs["rentConditionRef"].comp.formShow = false;
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
    //起租条件行编辑
    rentConditionFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["rentConditionRef"].getTableComp().expandRow(row);
      this.$refs["rentConditionRef"].comp.formShow = false;
      //RentCondition为表单数据对象参数
      this.$refs["rentConditionRef"].setData("RentCondition", row);
    },
    // 起租条件删除提示
    rentConditionFormdelete: function(scope) {
      this.rentConditionDelVisible = true;
      this.delId = scope.row.pk_prj_rent_condition;
    },
    // 起租条件删除方法
    rentConditionDeleteClick() {
      this.$http({
        url: ylsBusi + "contr/rentCondition/deleteById",
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
            this.requestRentCondition();
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
      this.rentConditionDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

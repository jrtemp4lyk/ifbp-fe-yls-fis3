<template>
<!--租赁物信息管理模块-->
<div>
          <ifbp-template ref="busirenttingRef"
                        tplId="busirentting"
                        :funnode="funnode"
                        :nexuskey="nexuskey" 
                        :tplResetFun="renttingResetFun"
                        @form-confirm-click="renttingFormConfirm"
                        @form-cancel-click="renttingFormCancel"
                        show-type="table-form"
                        @edit-table-click="renttingFormedit"
                        @delete-table-click="renttingFormdelete"
                        >
          </ifbp-template>

    <!-- 业务租赁物 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="renttingDelVisible"
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

import {ylsBusi} from '../../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["source_bill"],
  data() {
    var oThis = this;
    //校验
    var validatecustomer = function(rule, value, callback) {
      
    };
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      renttingDelVisible: false,
      rmoveindex: "",
      delId: "",
      //租赁物
      renttingIcons: [
        {
          icon: "plus",
          click: function() {
            debugger
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.busirenttingRef.comp;
            var table = uitemplateComp.$refs["proRentThing_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.busirenttingRef.setData("proRentThing", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["proRentThing_ref"].resetFields();
          }
        }
      ],
      funnode:"BT022",
      nexuskey:"rentthing_busi_modify",
      //渲染表格
      renttingResetFun: function($node) {
         
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
      this.requestPrjrentting();
    }
  },
  //获取数据数据初始化操作
  created() {
    // this.request();
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
      if (this.source_bill != "") {
        this.requestPrjrentting();
      }
    },
    //请求业务租赁物
    requestPrjrentting() {
      var url;
      url = ylsBusi + "contr/modify/rentth/page";
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
            custCondList:[{"key":"source_bill","oper":"=","value":this.source_bill}]
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
          this.$refs["busirenttingRef"].setData(
            "proRentThing_t",
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
    //租赁物取消按钮
    renttingFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["busirenttingRef"].comp.formShow = false;
      } else {
        this.$refs["busirenttingRef"].getTableComp().closeExpandRow();
      }
    },
    //租赁物主表保存
    renttingFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.busirenttingRef.comp.proRentThing;
      data.source_bill = this.source_bill;
      if(data.pk_prj_rent_thing){
         url = ylsBusi+'contr/modify/rentth/update';
      }else{
         url = ylsBusi+'contr/modify/rentth/create';
      }
      //保存校验
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
            let linarraydata = this.$refs.busirenttingRef.getData(
              "proRentThing_t"
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
            this.$refs.busirenttingRef.setData(
              "proRentThing_t",
              JSON.parse(JSON.stringify(linarraydata))
            );
            //隐藏详情列表
            this.$refs["busirenttingRef"].comp.formShow = false;
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
    },
    //租赁物行编辑
    renttingFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["busirenttingRef"].getTableComp().expandRow(row);
      this.$refs["busirenttingRef"].formShow = false;
      //proRentThing为表单数据对象参数
      this.$refs["busirenttingRef"].setData("proRentThing", row);
    },
    // 租赁物删除提示
    renttingFormdelete: function(scope) {
      this.renttingDelVisible = true;
      this.delId = scope.row.pk_prj_rent_thing;
    },
    // 租赁物删除方法
    renttingDeleteClick() {
      this.$http({
        url: ylsBusi + "contr/modify/rentth/deleteById",
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
            this.requestPrjrentting();
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
      this.renttingDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

<template>
<!--收付各方条件管理模块-->
<div>
          <ifbp-template ref="projectAccountRef"
                        tplId="projectAccount-template"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="projectAccountData"
                        :tplResetFun="projectAccountResetFun"
                        @form-confirm-click="projectAccountFormConfirm"
                        @form-cancel-click="projectAccountFormCancel"
                        show-type="table-form"
                        @edit-table-click="projectAccountFormedit"
                        @delete-table-click="projectAccountFormdelete"
                        >
          </ifbp-template>

    <!-- 业务收付各方条件 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="projectAccountDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="projectAccountDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="projectAccountDeleteClick">确 定</el-button>
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
      projectAccountDelVisible: false,
      rmoveindex: "",
      delId: "",

      funnode:"BT008",

      nexusKey:"prj_account",

      //收付各方条件
      projectAccountIcons: [
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
            var uitemplateComp = oThis.$refs.projectAccountRef.comp;
            var table = uitemplateComp.$refs["ProjectAccount_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.projectAccountRef.setData("ProjectAccount", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["ProjectAccount_ref"].resetFields();
          }
        }
      ],
    
      projectAccountData: {
         rules:{}
      },
      //渲染表格
      projectAccountResetFun: function($node) {
        
        var $table = this.getNodeById($node, "hp7r5u13d3welfj6rs4cayvi");
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
      this.requestProjectAccount();
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
        this.requestProjectAccount();
      }
    },
    //请求业务收付各方条件
    requestProjectAccount() {
      var url;
      url = ylsBusi + "contr/projectAccount/page";
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
          this.$refs["projectAccountRef"].setData(
            "ProjectAccount_t",
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
    //收付各方条件取消按钮
    projectAccountFormCancel: function(type) {
      debugger;
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["projectAccountRef"].comp.formShow = false;
      } else {
        this.$refs["projectAccountRef"].getTableComp().closeExpandRow();
        var accountDatas = this.$refs.projectAccountRef.getData("ProjectAccount_t");
        accountDatas[this.accountEditBakIndex] = this.accountEditBakData;
        this.$refs.projectAccountRef.setData("ProjectAccount_t",accountDatas);
      }
    },
    //收付各方条件主表保存
    projectAccountFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.projectAccountRef.comp.ProjectAccount;
      data.source_bill = this.pk_prjId;
      if(data.pk_prj_account){
         url = ylsBusi+'contr/projectAccount/update';
      }else{
         url = ylsBusi+'contr/projectAccount/create';
      }
      //保存校验
      this.$refs.projectAccountRef.comp.$refs[
        "ProjectAccount_ref"
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
                let linarraydata = this.$refs.projectAccountRef.getData(
                  "ProjectAccount_t"
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
                this.$refs.projectAccountRef.setData(
                  "proRentThing_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                this.$refs["projectAccountRef"].comp.formShow = false;
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
    //收付各方条件行编辑
    projectAccountFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["projectAccountRef"].getTableComp().expandRow(row);
      this.$refs["projectAccountRef"].comp.formShow = false;
      //ProjectAccount为表单数据对象参数
      this.$refs["projectAccountRef"].setData("ProjectAccount", row);
      this.accountEditBakData = JSON.parse(JSON.stringify(row));
      this.accountEditBakIndex = scope.$index;
    },
    // 收付各方条件删除提示
    projectAccountFormdelete: function(scope) {
      this.projectAccountDelVisible = true;
      this.delId = scope.row.pk_prj_account;
    },
    // 收付各方条件删除方法
    projectAccountDeleteClick() {
      this.$http({
        url: ylsBusi + "contr/projectAccount/deleteById",
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
            this.requestProjectAccount();
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
      this.projectAccountDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

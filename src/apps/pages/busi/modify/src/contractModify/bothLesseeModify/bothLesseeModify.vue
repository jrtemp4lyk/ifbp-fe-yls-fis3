<template>
<!--承租人管理模块-->
<div>
          <ifbp-template ref="bothlesseeRef"
                        tplId="bothlessee"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="bothlesseeData"
                        :tplResetFun="bothlesseeResetFun"
                        :methods="bothlesseeMethods"
                        @form-confirm-click="bothlesseeFormConfirm"
                        @form-cancel-click="bothlesseeFormCancel"
                        show-type="table-form"
                        @edit-table-click="bothlesseeFormedit"
                        @delete-table-click="bothlesseeFormdelete"
                        >
          </ifbp-template>

    <!-- 承租人 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="bothlesseeDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bothlesseeDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="bothlesseeDeleteClick">确 定</el-button>
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
      bothlesseeDelVisible: false,
      rmoveindex: "",
      delId: "",
      //承租人标签
      bothlesseeIcons: [
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
            var uitemplateComp = oThis.$refs.bothlesseeRef.comp;
            var table = uitemplateComp.$refs["projectBothLessee_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.bothlesseeRef.setData("projectBothLessee", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["projectBothLessee_ref"].resetFields();
          }
        }
      ],
      //type=prj 然后项目ui_id:9d4022c1-438e-4bc8-8a10-9b9776cab14c 否者a7715073-8a24-420a-86de-9110786e8e4b
      funnode: "BT022",
      nexusKey:"projectBothLesseeModify",
      bothlesseeData: {
      },
      //渲染表格
      bothlesseeResetFun: function($node) {
        //合同承租信息表格
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
          // 拿到当前参照的数据，然后再操作其他字段
          console.log("触发参照改变:", type, data);
          /*
           * 这里的this指向 ifbp-element组件实例，
           * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
           * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
          */
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.customer_code=data.value[0].refcode;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.legal_person_name=data.value[0].legal_person_name;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.fax=data.value[0].fax;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.email=data.value[0].email;
        },
        banknoRefChange_l: function(type, data) {
          // 拿到当前参照的数据，然后再操作其他字段
          console.log("触发参照改变:", type, data);
          /*
           * 这里的this指向 ifbp-element组件实例，
           * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
           * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
          */
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.account_bank_l=data.value[0].refcode;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_no_l=data.value[0].bank_no;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_code_l=data.value[0].bank_code;
        },
        banknoRefChange: function(type, data) {
          // 拿到当前参照的数据，然后再操作其他字段
          console.log("触发参照改变:", type, data);
          /*
           * 这里的this指向 ifbp-element组件实例，
           * this.$refs.quote_scheme_form取到form实例（quote_scheme_form为UI模板设计器页面表单的"引用信息"，默认是formRef），
           * this.$refs.quote_scheme_form.model拿到model，里面有form上绑定的的全部数据。
          */
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.account_bank=data.value[0].refcode;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_no=data.value[0].bank_no;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.bank_code=data.value[0].bank_code;
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
      this.requestPrjbothlessee();
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
        this.requestPrjbothlessee();
      }
    },
    //请求业务承租方
    requestPrjbothlessee() {
      var url;
      if (this.source_bill == "") {
        return;
      }
      url = ylsBusi + "/contr/modify/lessee/page";
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
            source_bill: this.source_bill
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
          // for(var item=0;item<this.originalValue.length;item++){
          //   this.originalValu[item].customer_code=this.originalValu[item].beanMap[this.originalValu[item].pk_customer].code;
          // }
          this.$refs["bothlesseeRef"].setData(
            "projectBothLessee_t",
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
    //承租方取消按钮
    bothlesseeFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs.bothlesseeRef.comp.formShow = false;
      } else {
        this.$refs.bothlesseeRef.comp.getTableComp().closeExpandRow();
      }
    },
    //承租方主表保存
    bothlesseeFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.bothlesseeRef.comp.projectBothLessee;
      data.source_bill = this.source_bill;
      delete data.customer_code;
      delete data.fax;
      delete data.email;
      delete data.legal_person_name;
      delete data.bank_no;
      delete data.account_bank;
      delete data.bank_code;
      delete data.bank_no_l;
      delete data.account_bank_l;
      delete data.bank_code_l;
      if(data.pk_prj_both_lessee){
         url = ylsBusi+'contr/modify/lessee/update';
      }else{
         url = ylsBusi+'contr/modify/lessee/create';
      }
      //保存校验
      this.$refs.bothlesseeRef.comp.$refs[
        "projectBothLessee_ref"
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
                this.requestPrjbothlessee();
                this.$refs["bothlesseeRef"].comp.formShow = false;
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
    //承租方行编辑
    bothlesseeFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs.bothlesseeRef.getTableComp().expandRow(row);
      this.$refs.bothlesseeRef.comp.formShow = false;
      //projectBothLessee为表单数据对象参数
      this.$refs.bothlesseeRef.setData("projectBothLessee", row);
      this.$refs.bothlesseeRef.comp.projectBothLessee.customer_code=row.beanMap.pk_customer_ref[row.pk_customer].code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.legal_person_name=row.beanMap.pk_customer_ref[row.pk_customer].legal_person_name;
      this.$refs.bothlesseeRef.comp.projectBothLessee.fax=row.beanMap.pk_customer_ref[row.pk_customer].fax;
      this.$refs.bothlesseeRef.comp.projectBothLessee.email=row.beanMap.pk_customer_ref[row.pk_customer].email;
      this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank_l=row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no_l=row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_no;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code_l=row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank=row.beanMap.pk_account_ref[row.pk_account].code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no=row.beanMap.pk_account_ref[row.pk_account].bank_no;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code=row.beanMap.pk_account_ref[row.pk_account].bank_code;
    },
    // 承租方删除提示
    bothlesseeFormdelete: function(scope) {
      this.bothlesseeDelVisible = true;
      this.delId = scope.row.pk_prj_both_lessee;
    },
    // 承租方删除方法
    bothlesseeDeleteClick() {
      this.$http({
        url: ylsBusi + "/contr/modify/lessee/deleteById",
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
            this.requestPrjbothlessee();
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
      this.bothlesseeDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

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

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数 source_bill 主表主键； type 节点类型
  props: ["source_bill","type","is_lessee_type"],
  data() {
    var oThis = this;
    //校验
    var validatecustomer = function(rule, value, callback) {
      
    };
    var validate=function(){


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
      funnode: oThis.type==="prj" ? "BT008":"BT008",
      nexusKey: oThis.type==="prj" ?"projectBothLesseeUI" : "projectBothLesseeUI",
      bothlesseeData: {
        pk_account_lessee_ref:{},
      },
      //渲染表格
      bothlesseeResetFun: function($node) {
          //  var $refNode = $node.find("el-ref[_id='wdipll8xpjj']");
        var $refNode = this.getNodeById($node,'wdipll8xpjj');
        var $refNodebankno_l = this.getNodeById($node,'n00x90su5os');
        var $refNodebankno = this.getNodeById($node,'4ytx4t2pjmq');
        // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
        // var $refNode = $node.find("el-ref");
        if($refNode.length) {
          // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
          $refNode.attr("v-on:trigger", "customerRefChange"); 
        };
        if($refNodebankno_l.length) {
          // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
          $refNodebankno_l.attr("v-on:trigger", "banknoRefChange_l"); 
        };
        if($refNodebankno.length) {
          // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
          $refNodebankno.attr("v-on:trigger", "banknoRefChange"); 
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
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.realworkmail=data.value[0].realworkmail;
          oThis.$refs.bothlesseeRef.comp.projectBothLessee.realworkplace=data.value[0].realworkplace;
          if(type === 'change') {
            debugger;
            oThis.$refs.bothlesseeRef.setData('pk_account_lessee_ref',{"pk_customer":data.value[0].id});
          }
        },
        banknoRefChange_l: function(type, data) {
          // 拿到当前参照的数据，然后再操作其他字段
          console.log("触发参照改变:", type, data);
          debugger;
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
      url = ylsBusi + "prj/lessee/page";
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
        var bothBakData = this.$refs.bothlesseeRef.getData("projectBothLessee_t");
        bothBakData[this.bothEditIndex] = this.bothEditBakData;
        this.$refs.bothlesseeRef.setData("projectBothLessee_t",bothBakData);
      }
    },
    //承租方主表保存
    bothlesseeFormConfirm: function(type) {
      
      //获取当前数据
      let url="";
      var data = this.$refs.bothlesseeRef.comp.projectBothLessee;
      //校验主表是否有共同承租人
      if(this.is_lessee_type==='N'&&data.lessee_type==='BOTH'){
        this.$message({
                  message: '是否有共同承租人为否，不允许添加共同承租人！',
                  type: "error"
                });
            return;
      }
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
      delete data.realworkmail;
      delete data.realworkplace;
      if(data.pk_prj_both_lessee){
         url = ylsBusi+'prj/lessee/update';
      }else{
        let linarraydata = this.$refs.bothlesseeRef.getData("projectBothLessee_t");
        debugger;
        for(let i=0;i<linarraydata.length;i++){
          if(data.lessee_type==='MAIN'&&linarraydata[i].lessee_type==='MAIN'){
            this.$message({
                  message: '已存在主承租人，不允许重复添加！',
                  type: "error"
                });
            return;
          }
        }
         url = ylsBusi+'prj/lessee/create';
      }
      //保存校验
      this.$refs.bothlesseeRef.validate(valid => {
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
      },type);
    },
    //承租方行编辑
    bothlesseeFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs.bothlesseeRef.getTableComp().expandRow(row);
      this.$refs.bothlesseeRef.comp.formShow = false;
      this.bothEditBakData = JSON.parse(JSON.stringify(scope.row));
      this.bothEditIndex = scope.$index;
      //projectBothLessee为表单数据对象参数
      this.$refs.bothlesseeRef.setData("projectBothLessee", row);
      debugger;
      if(row.beanMap.pk_customer_ref!==null&&row.beanMap.pk_customer_ref!==undefined){
      this.$refs.bothlesseeRef.comp.projectBothLessee.customer_code=row.beanMap.pk_customer_ref[row.pk_customer].code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.legal_person_name=row.beanMap.pk_customer_ref[row.pk_customer].legal_person_name;
      this.$refs.bothlesseeRef.comp.projectBothLessee.fax=row.beanMap.pk_customer_ref[row.pk_customer].fax;
      this.$refs.bothlesseeRef.comp.projectBothLessee.email=row.beanMap.pk_customer_ref[row.pk_customer].email;
      this.$refs.bothlesseeRef.comp.projectBothLessee.realworkmail=row.beanMap.pk_customer_ref[row.pk_customer].realworkmail;
      this.$refs.bothlesseeRef.comp.projectBothLessee.realworkplace=row.beanMap.pk_customer_ref[row.pk_customer].realworkplace;
      }
      if(row.beanMap.pk_account_lessee_ref!==null&&row.beanMap.pk_account_lessee_ref!==undefined){
      this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank_l=row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no_l=row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_no;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code_l=row.beanMap.pk_account_lessee_ref[row.pk_account_lessee].bank_code;
      }
      if(row.beanMap.pk_account_ref!==null&&row.beanMap.pk_account_ref!==undefined && row.pk_account){
      this.$refs.bothlesseeRef.comp.projectBothLessee.account_bank=row.beanMap.pk_account_ref[row.pk_account].code;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_no=row.beanMap.pk_account_ref[row.pk_account].bank_no;
      this.$refs.bothlesseeRef.comp.projectBothLessee.bank_code=row.beanMap.pk_account_ref[row.pk_account].bank_code;
      }
      this.$nextTick(() => {
        if(row.pk_customer!==null)  {
          this.$refs.bothlesseeRef.setData('pk_account_lessee_ref',{"pk_customer":row.pk_customer});;
        }
      });
      
    },
    // 承租方删除提示
    bothlesseeFormdelete: function(scope) {
      this.bothlesseeDelVisible = true;
      this.delId = scope.row.pk_prj_both_lessee;
    },
    // 承租方删除方法
    bothlesseeDeleteClick() {
      this.$http({
        url: ylsBusi + "/prj/lessee/deleteById",
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

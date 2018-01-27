<!-- 股东信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="ShareholderRef"
                        tplId="ShareholderTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="ShareholderData"
                        :tplResetFun="ShareholderResetFun"
                        :tplMethods="ShareholderTplMethods"
                        @form-confirm-click="ShareholderFormConfirm"
                        @form-cancel-click="ShareholderFormCancel"
                        @edit-table-click="ShareholderEditTableRow"
                        @delete-table-click="ShareholderDeleteTableRow"
                        show-type="table-form"
                        :methods="t_Methods"
                       >
          </ifbp-template>
    <!-- 股东信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="ShareholderDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ShareholderDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="ShareholderDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>


import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  props: ["pk_customer","invisible"],
  data() {
    var oThis = this;
    var validator = function(rule, value, callback) {};
    return {
      ShareholderDelVisible: false,
      rmoveindex: "",
      delId: "",
      back_object:"",
      // 股东信息新增
      ShareholderIcons: [
        {
          icon: "plus",
          click: function() {
            if(oThis.pk_customer===""){
              oThis.$message({
                  message: "请先保存基本信息",
                  type: "error"
                });
                return;
            }
            var uitemplateComp = oThis.$refs.ShareholderRef.comp;
            var table = uitemplateComp.$refs["Shareholder_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      funnode:"BT003",
      nexuskey:"corp_shareholder_busi_apply",
      ShareholderData: {
        rules: {
        }
      },
      ShareholderResetFun: function($node) {
        if(oThis.invisible) {
          return;
        }
        var $refname = this.getNodeById($node, 'huepldc1v46'); //股东名称
        if($refname.length) {
          $refname.attr("v-on:change", "nameRefChange"); 
        }

        var $table = this.getNodeById($node, "wc3ufqnfqkl");
        // $table.attr(":show-header", "false");
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

        var $pkCountry = this.getNodeById($node, "u5itmgcx7c");
        var $pkTaxes = this.getNodeById($node, "1idpzwci9up");
        $pkCountry.html(
          '<template scope="scope"><div>{{scope.row.beanMap?' +
            "(scope.row.beanMap.pk_country_ref?" +
            'scope.row.beanMap.pk_country_ref[scope.row.pk_country].name:""):""}}' +
            "</div></template>"
        );

        $pkTaxes.html(
          '<template scope="scope"><div>{{scope.row.beanMap?' +
            "(scope.row.beanMap.pk_taxes_ref?" +
            'scope.row.beanMap.pk_taxes_ref[scope.row.pk_taxes].name:""):""}}' +
            "</div></template>"
        );

        return $node[0].outerHTML;
      },
      t_Methods: {
        nameRefChange:function(type, data){//参照变化处理函数 依据参照赋值
          if(type === 'change') {
           this.$refs['Shareholder_ref'].model.share_type = data.value[0].customer_type;
           this.$refs['Shareholder_ref'].model.identity_type = data.value[0].identity_type;
           this.$refs['Shareholder_ref'].model.identity_num = data.value[0].identity_no;
          }
        }
      },
      ShareholderTplMethods: {
        // form的保存操作
      }
    };
  },
  //获取数据数据初始化操作
  created() {},
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.requestShareholder();
    }
  },
    //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
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
        if (this.pk_customer != "") {
          this.requestShareholder();
      }
    },
    //请求股东信息
    requestShareholder() {
      var url;
      url = ylsBusi + "cust/shareholder/page";
      var data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            custCondList:[{key:"pk_customer",oper:"=",value:this.pk_customer}]
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
          this.$refs["ShareholderRef"].setData(
            "Shareholder_t",
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
    //股东情况保存
    ShareholderFormConfirm: function() {
      //获取当前数据
      var data = this.$refs.ShareholderRef.comp.Shareholder;
      data.pk_customer = this.pk_customer;
      //保存校验
      this.$refs.ShareholderRef.comp.$refs[
        "Shareholder_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: ylsBusi + "cust/shareholder/create",
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
                var linarraydata = this.$refs.ShareholderRef.getData(
                  "Shareholder_t"
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
                //加入数组结尾
                // linarraydata.push(this.originalValue);
                //给对象赋值
                this.$refs.ShareholderRef.setData(
                  "Shareholder_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["ShareholderRef"].comp.formShow = false;
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
    // 股东信息form的取消操作
    ShareholderFormCancel: function(type) {
      if (type === "form") {
        this.$refs["ShareholderRef"].comp.formShow = false;
      } else {
        this.$refs["ShareholderRef"].getTableComp().closeExpandRow();
      }
      let linarraydata = this.$refs.ShareholderRef.getData(
                  "Shareholder_t"
                );
        linarraydata.splice(this.rmoveindex, 1,this.back_object);
        this.$refs.ShareholderRef.setData(
                  "Shareholder_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
    },
    //股东编辑
    ShareholderEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["ShareholderRef"].getTableComp().expandRow(row);
      this.$refs["ShareholderRef"].formShow = false;
      //ShareholderRef为表单数据对象参数
      this.$refs["ShareholderRef"].setData("Shareholder", row);
      this.back_object=row;
    },
    //股东信息删除提示
    ShareholderDeleteTableRow: function(scope) {
      this.ShareholderDelVisible = true;
      this.delId = scope.row.pk_cust_shareholder;
    },
    //股东信息删除
    ShareholderDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/shareholder/deleteById",
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
            this.requestShareholder();
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
      this.ShareholderDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

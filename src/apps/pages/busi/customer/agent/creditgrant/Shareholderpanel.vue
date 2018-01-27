<!-- 股东信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="ShareholderRef"
                        tplId="ShareholderTemplate"
                        :funnode="shareholderfunnode"
                        :nexuskey="shareholdernexuskey"
                        :tplData="ShareholderData"
                        :tplResetFun="ShareholderResetFun"
                        :tplMethods="ShareholderTplMethods"
                        :methods="t_Methods"
                        @form-confirm-click="ShareholderFormConfirm"
                        @form-cancel-click="ShareholderFormCancel"
                        @edit-table-click="ShareholderEditTableRow"
                        @delete-table-click="ShareholderDeleteTableRow"
                        show-type="table-form"
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
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  props: ["pk_customer"],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      shareholderfunnode:'BT004',
      shareholdernexuskey:'agent-shareholder',
      ShareholderDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 股东信息新增
      ShareholderIcons: [
        {
          icon: "plus",
          click: function() {
            // if(oThis.pk_customer===""){
            //   oThis.$message({
            //       message: "请先保存基本信息",
            //       type: "error"
            //     });
            //     return;
            // }
            let uitemplateComp = oThis.$refs.ShareholderRef.comp;
            let table = uitemplateComp.$refs["Shareholder_table"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      ShareholderData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      ShareholderResetFun: function($node) {
        let $table = this.getNodeById($node, "266ene4nt9n");
 
       //股东参照联动
        var $refNode1 = this.getNodeById($node, 'linx947hht9');

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        }
        // $table.attr(":show-header", "false");
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
        $table.prepend(operateHtml);
        return $node[0].outerHTML;
      },
       t_Methods: {
        handleRefChange1: function(type, data) {
          if(type === 'change') {
            
            this.$refs['Shareholder-form'].model.share_type=data.value[0].customer_type;
          }
        }
      },
      ShareholderTplMethods: {
        // form的保存操作
      }
    };
  },
  //获取数据数据初始化操作
  created() {
    
  },
    //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.request();
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
      debugger;
        if (this.pk_customer != "") {
          debugger;
          this.reqShhderByPkCustomer();
        }else{
          // this.requestShareholder();
          return;
        }
    },
    //请求股东信息
    requestShareholder() {
      let url;
      url = ylsBusi + "cust/shareholder/page";
      let data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            'pk_customer': this.pk_customer
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
        .catch((e) => {
          this.$message({
            message: "股东信息获取失败",
            type: "error"
          });
        });
    },
    //通过pk_customer获得实体并注入到表格
    reqShhderByPkCustomer(){
      debugger;
        this.$http({
        url: window.ctxs.cust + 'cust/shareholder/getListbycolumn',
        headers: { "Content-Type": "application/json" },
        method: 'post',
        data: this.pk_customer
      })
        .then(res => {
          debugger;
          let originalValue = res.data.data;
           this.$refs.ShareholderRef.setData(
            "Shareholder_t",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.$refs["ShareholderRef"].comp.formShow = false;
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "股东信息详情获取失败",
            type: "error"
          });
        });
    },
    //股东情况保存
    ShareholderFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.ShareholderRef.comp.Shareholder;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.ShareholderRef.comp.$refs[
        "Shareholder-form"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/shareholder/updateORinsert",
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              debugger;
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.ShareholderRef.getData(
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
                this.$refs.ShareholderRef.comp.formShow = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch((e) => {
              debugger;
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
    },
    //股东编辑
    ShareholderEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      // let row = scope.row;
      // this.$refs["ShareholderRef"].getTableComp().expandRow(row);
      // this.$refs["ShareholderRef"].formShow = false;
      // //ShareholderRef为表单数据对象参数
      // this.$refs["ShareholderRef"].setData("Shareholder", row);
     
      this.$refs.ShareholderRef.getTableComp().expandRow(scope.row);
      this.$refs.ShareholderRef.comp.formShow = false;
      this.$refs.ShareholderRef.setData('Shareholder',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
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
           
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
           this.reqShhderByPkCustomer();
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

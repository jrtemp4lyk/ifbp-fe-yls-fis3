<template>
<!--联系人信息管理模块-->
<div>
       <ifbp-template ref="custlinkmanRef"
                        tplId="linkmanTemplate"
                        :funnode="linkmanfunnode"
                        :nexuskey="linkmannexuskey"
                        :tplData="custlinkmanData"
                        :tplResetFun="linkmanResetFun"
                        @form-confirm-click="linkmanFormConfirm"
                        @form-cancel-click="linkmanFormCancel"
                        show-type="table-form"
                        @edit-table-click="linkmanFormedit"
                        @delete-table-click="linkmanFormdelete"
                        :methods="t_Methods">
          </ifbp-template>

    <!-- 代理商联系人 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="linkmanDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkmanDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="linkmanDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../../common/js/publicData.js';
export default {
  //应用vue传过来接收参数
  props: ["pk_customer"],
  data() {
    let oThis = this;
    //校验
    let validatecustomer = function(rule, value, callback) {
      
      //证件号码唯一校验
      if (rule.field === "identity_no") {
        if (value === "") {
          callback(new Error("证件号不能为空"));
        } else {
          let datam = {
            identity_no: value,
            pk_customer: oThis.pk_customer
          };
          oThis
            .$http({
              url: window.ctxs.cust + "cust/customer/checkOnlyOne",
              headers: { "Content-Type": "application/json" },
              method: "post",
              data: JSON.parse(JSON.stringify(datam))
            })
            .then(res => {
              
              if (res.data.success === true) {
                callback();
              } else {
                callback(new Error(res.data.error.errorMessage));
              }
            })
            .catch(() => {
              callback(new Error("后台服务有误，请联系管理员！"));
            });
        }
      }
    };
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      linkmanfunnode:'BT004',
      linkmannexuskey:'agent-linkman',
      linkmanDelVisible: false,
      rmoveindex: "",
      delId: "",
      custlinkmanData: {
        // rules: {
        //   customer_name: [
        //     { required: true, message: "请输入联系人名称", trigger: "blur" }
        //   ]
        // }
      },
      //渲染表格
      linkmanResetFun: function($node) {
        let $refNode = this.getNodeById($node, 'ow80d1amej');  //开户行省

        if($refNode.length) {
          $refNode.attr("v-on:trigger", "handleRefChange"); 
        }

        let $table = this.getNodeById($node, "z629xchuu6r");
        //  $table.attr(':show-header','false');
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
        handleRefChange: function(type, data) {
          if(type === 'change') {
             
            let param = {'key':data.value[0].innercode};
            oThis.$refs.custlinkmanRef.setData('cityParams', param);
          }
        }
      },
    };
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
      // this.requestCustlinkman();
      // this.requestLinkManByPkCustomer();
      this.request();
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
      debugger;
      if (this.pk_customer != "") {
        this.requestLinkManByPkCustomer();
      }
      else{
        // this.requestCustlinkman();
        return;
      }
    },
    //请求客户联系人
    requestCustlinkman() {
      let url;
      url = window.ctxs.cust + "cust/otherContact/page";
      let data = {
        pageNum: 0,
        pageSize: 100,
        searchParams: {
          searchMap: {
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
          this.$refs["custlinkmanRef"].setData(
            "OtherContact_t",
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
    
      //请求联系人基本信息详情
    requestLinkManByPkCustomer() {
      debugger;
      this.$http({
        url: window.ctxs.cust + 'cust/otherContact/getListbycolumn',
        headers: { "Content-Type": "application/json" },
        method: 'post',
        data: this.pk_customer
      })
        .then(res => {
          debugger;
          let originalValue = res.data.data;
           this.$refs.custlinkmanRef.setData(
            "OtherContact_t",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.$refs["custlinkmanRef"].comp.formShow = false;
          debugger;
        })
        .catch(e => {
          debugger;
          console.error(e);
          this.$message({
            message: "联系人信息详情获取失败",
            type: "error"
          });
        });
    },
    //联系人取消按钮
    linkmanFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["custlinkmanRef"].comp.formShow = false;
      } else {
        this.$refs["custlinkmanRef"].getTableComp().closeExpandRow();
      }
    },
    //联系人主表保存
    linkmanFormConfirm: function() {
      debugger;
      //获取当前数据
      let data = this.$refs.custlinkmanRef.comp.OtherContact;
      data.pk_customer = this.pk_customer;
      let baseUrl = window.ctxs.cust;
      //保存校验
      this.$refs.custlinkmanRef.comp.$refs[
        "OtherContact-from"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/otherContact/updateORinsert",
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
                let linarraydata = this.$refs.custlinkmanRef.getData(
                  "OtherContact_t"
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
                this.$refs.custlinkmanRef.setData(
                  "OtherContact_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["custlinkmanRef"].comp.formShow = false;
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
    //联系人行编辑
    linkmanFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //新增的界面方式进行修改
      // let uitemplateComp = this.$refs.custlinkmanRef.comp;
      // let table = uitemplateComp.$refs["OtherContact_t_ref"];
      // table.closeExpandRow();
      // uitemplateComp.linkman = {};
      // uitemplateComp.formShow = true;
      // this.$refs.custlinkmanRef.comp.OtherContact = scope.row;

      //行下展开表单界面
      let row = scope.row;
      this.$refs["custlinkmanRef"].getTableComp().expandRow(row);
      this.$refs["custlinkmanRef"].formShow = false;
      //OtherContact为表单数据对象参数
      this.$refs["custlinkmanRef"].setData("OtherContact", row);
    },
    //联系人删除提示
    linkmanFormdelete: function(scope) {
      this.linkmanDelVisible = true;
      this.delId = scope.row.pk_cust_other_contact;
    },
    //联系人删除方法
    linkmanDeleteClick() {
      this.$http({
        url: window.ctxs.cust + "cust/otherContact/deleteById",
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
            //this.delDialogVisible = false;
            this.requestLinkManByPkCustomer(); 
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
      this.linkmanDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

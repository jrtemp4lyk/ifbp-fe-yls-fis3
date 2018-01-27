<template>
<!--联系人信息管理模块-->
<div>
          <ifbp-template ref="custlinkmanRef"
                        tplId="linkmanTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="custlinkmanData"
                        :tplResetFun="linkmanResetFun"
                        :methods="t_Methods"
                        @form-confirm-click="linkmanFormConfirm"
                        @form-cancel-click="linkmanFormCancel"
                        show-type="table-form"
                        @edit-table-click="linkmanFormedit"
                        @delete-table-click="linkmanFormdelete"
                        >
          </ifbp-template>

    <!-- 客户联系人 删除提示框 -->
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
import {ylsBusi} from '../../../../common/js/publicData.js';
export default {
  //应用vue传过来接收参数
  props: ["pk_customer","type"],
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
              url:ylsBusi + "cust/customer/checkOnlyOne",
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
      $refNodeIdType:'',
      funnode:"BT003",
      nexuskey: oThis.type==="corp" ?"Contacts_UI" : "person_contact",
      scrollDom: document.getElementsByClassName("view")[0],
      linkmanDelVisible: false,
      rmoveindex: "",
      delId: "",
      //联系人
      linkmanIcons: [
        {
          icon: "plus",
          click: function() {
            if (oThis.pk_customer === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            let uitemplateComp = oThis.$refs.custlinkmanRef.comp;
            let table = uitemplateComp.$refs["OtherContact_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.custlinkmanRef.setData("OtherContact", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["OtherContact_ref"].resetFields();
          }
        }
      ],
      custlinkmanPk: "946c2308-f17d-4d80-bc5b-3f3f406df306", //linkman
      custlinkmanData: {
        isEdit:false,
       
      },
      //渲染表格
      linkmanResetFun: function($node) {
        let $table =  $node.find('el-table');
        let $refNodeName = $node.find("el-ref[v-model='OtherContact.customer_name']"); //获取姓名节点
        if($refNodeName.length) {
          $refNodeName.attr("v-on:trigger", "getMessageFromName"); //根据姓名带出证件号与类型
        }
        debugger;
        let $refNodeIdType = $node.find("el-select[v-model='OtherContact.identity_type']"); //获取证件类型节点
        $refNodeIdType.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑
        let $refNodeIdNo = $node.find("el-input[v-model='OtherContact.identity_card_numb']"); //获取证件号节点
        $refNodeIdNo.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑


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
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      t_Methods: {
        getMessageFromName: function(type, data) {
            
          if(type === 'change') {
            
            this.$refs['OtherContact_ref'].model.identity_type=data.value[0].identity_type;
            this.$refs['OtherContact_ref'].model.identity_card_numb=data.value[0].identity_no;
            oThis.$refs["custlinkmanRef"].setData("isEdit",true);

            
          }
        }
      }
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
      this.requestCustlinkman();
    }
  },
  //获取数据数据初始化操作
  created() {},
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
   //通过cookie获取当前登录用户的ID
    getCookie(cName) {
        let cStart;
        let cEnd;
        if (document.cookie.length > 0) {
          cStart = document.cookie.indexOf(cName + "=");
          if (cStart !== -1) {
            cStart = cStart + cName.length + 1;
            cEnd = document.cookie.indexOf(";", cStart);
            if (cEnd === -1) {
              cEnd = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(cStart, cEnd));
          }
        }
        return "";
    }, 
    /**
       *   初始响应方法
       **/
    request() {
      if (this.pk_customer != "") {
        this.requestCustlinkman();
      }
    },
    //请求客户联系人
    requestCustlinkman() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/otherContact/page";
      let data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            custCondList: [
              {
                'key': 'pk_customer',
                'oper': '=',
                'value': this.pk_customer
              },
              {
                'key': 'message_owner',
                'oper': '=',
                'value': ownerId
              }
            ]
          }
        }
      };
     
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data
       
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
            message: "联系人信息获取失败",
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
        this.$refs["custlinkmanRef"].getTableComp().closeExpandRow();//关闭新增区域表单
        let OtherContactTable = this.$refs.custlinkmanRef.getData('OtherContact_t');
        OtherContactTable[this.baseEditIndex] = this.baseData;//获取点击修改前的值
        this.$refs.custlinkmanRef.setData('OtherContact_t', OtherContactTable);
      }
    },
    //联系人主表保存
    linkmanFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.custlinkmanRef.comp.OtherContact;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
        
      this.$refs.custlinkmanRef.comp.$refs[
        "OtherContact_ref"
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

      //行下展开表单界面
      let row = scope.row;
      this.$refs["custlinkmanRef"].getTableComp().expandRow(row);
      this.$refs["custlinkmanRef"].formShow = false;
      //OtherContact为表单数据对象参数
      this.$refs["custlinkmanRef"].setData("OtherContact", row);
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

    },
    //联系人删除提示
    linkmanFormdelete: function(scope) {
      this.linkmanDelVisible = true;
      this.delId = scope.row.pk_cust_other_contact;
    },
    //联系人删除方法
    linkmanDeleteClick() {
      this.$http({
        url:ylsBusi + "cust/otherContact/deleteById",
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
            this.requestCustlinkman();
            // this.request(this.currentPage - 1, this.size);
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

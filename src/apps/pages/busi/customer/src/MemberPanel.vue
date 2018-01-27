<!-- 客户来源信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="MemberRef"
                        tplId="MemberTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="MemberData"
                        :tplResetFun="MemberResetFun"
                        :tplMethods="MemberTplMethods"
                        :methods="t_Methods"
                        @form-confirm-click="MemberFormConfirm"
                        @form-cancel-click="MemberFormCancel"
                        @edit-table-click="MemberEditTableRow"
                        @delete-table-click="MemberDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 客户来源信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="MemberDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="MemberDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="MemberDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js';
export default {
  props: ["pk_customer"],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      funnode:"BT003",
      nexuskey:"Member",
      MemberDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 客户来源信息新增
      MemberIcons: [
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
            let uitemplateComp = oThis.$refs.MemberRef.comp;
            let table = uitemplateComp.$refs["Member_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
     
      MemberData: {
        isEdit:false,
      },
      MemberResetFun: function($node) {
        let $refNode = $node.find("el-ref[v-model='Member.customer_name']"); 
        
        if($refNode.length) {
          $refNode.attr("v-on:trigger", "handleRefChange"); 
        }
        let $refNodeIdType = $node.find("el-select[v-model='Member.identity_type']"); //获取证件类型节点
        $refNodeIdType.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑
        let $refNodeIdNo = $node.find("el-input[v-model='Member.identity_card_numb']"); //获取证件号节点
        $refNodeIdNo.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑


        let $table =  $node.find('el-table');
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

        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      t_Methods: {
        handleRefChange: function(type, data) {
           
          if(type === 'change') {
             
           
            this.$refs['Member_ref'].model.pk_customer_ref=data.value[0].code;
            this.$refs['Member_ref'].model.identity_type=data.value[0].identity_type;
            this.$refs['Member_ref'].model.identity_card_numb=data.value[0].identity_no;
            oThis.$refs["MemberRef"].setData("isEdit",true);
          }
        }
      },
      MemberTplMethods: {
        // form的保存操作
      }
    };
  },
  //获取数据数据初始化操作
  created() {},
    //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.requestMember();
    }
  },
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
          this.requestMember();
      }
    },
    //请求客户来源信息
    requestMember() {
      debugger;
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/Member/page";
      let data = {
        "orderList": [
            {
                "direction": "desc",
                "property": "ts"
            }
            ],
            'pageNum': 0,
            'pageSize': 100,
            "searchParams": {
            "searchMap": {
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
          debugger;
          this.originalValue = res.data.data.content;
          this.$refs["MemberRef"].setData(
            "Member_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "高管信息获取失败",
            type: "error"
          });
        });
    },
    //客户来源情况保存
    MemberFormConfirm: function() {
      
      //获取当前数据
       debugger;
      let data = this.$refs.MemberRef.comp.Member;
      data.pk_customer = this.pk_customer;
    
      let baseUrl = ylsBusi;
      //保存校验
      
      this.$refs.MemberRef.comp.$refs[
        "Member_ref"
      ].validate(valid => {
         
        if (valid) {
          this.$http({
            url: baseUrl + "cust/Member/updateORinsert",
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
                let linarraydata = this.$refs.MemberRef.getData(
                  "Member_t"
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
                this.$refs.MemberRef.setData(
                  "Member_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["MemberRef"].comp.formShow = false;
                //this.requestMember();
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
    // 客户来源信息form的取消操作
    MemberFormCancel: function(type) {
      if (type === "form") {
        this.$refs["MemberRef"].comp.formShow = false;
      } else {
        this.$refs.MemberRef.getTableComp().closeExpandRow();
          let MemberTable = this.$refs.MemberRef.getData('Member_t');
          MemberTable[this.baseEditIndex] = this.baseData;
          this.$refs.MemberRef.setData('Member_t', MemberTable);
      }
    },
    //客户来源编辑
    MemberEditTableRow: function(scope) {
      //记录位置
      this.rmoveindex = scope.$index;
      // //行下展开表单界面
      let row = scope.row;
      this.$refs.MemberRef.getTableComp().expandRow(scope.row);
      this.$refs.MemberRef.comp.formShow = false;
      this.$refs.MemberRef.setData('Member',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

    },
    //客户来源信息删除提示
    MemberDeleteTableRow: function(scope) {
      this.MemberDelVisible = true;
      this.delId = scope.row.pk_cust_member;
    },
    //客户来源信息删除
    MemberDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/Member/deleteById",
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
            this.requestMember();
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
      this.MemberDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

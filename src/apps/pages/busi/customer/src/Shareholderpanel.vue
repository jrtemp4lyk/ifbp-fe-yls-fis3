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
import {pagination,ylsBusi} from '../../../../common/js/publicData.js';
export default {
   mixins: [pagination('request')],
  props: ["pk_customer"],
  data() {
    let oThis = this;
    let validator = function(rule, value, callback) {};
    return {
      funnode:"BT003",
      nexuskey:"Shareholder_UI",
      ShareholderDelVisible: false,
      rmoveindex: "",
      delId: "",
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
            let uitemplateComp = oThis.$refs.ShareholderRef.comp;
            let table = uitemplateComp.$refs["Shareholder_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      ShareholderPk: "4206377c-53b0-497d-a5b6-c6f98fa6631d", //custaxes
      ShareholderData: {
       isEdit:false,
      },
      ShareholderResetFun: function($node) {
        let $table =  $node.find('el-table');
 
       //股东参照联动
        var $refNode1 = this.getNodeById($node, 'linx947hht9');

        if($refNode1.length) {
          $refNode1.attr("v-on:trigger", "handleRefChange1"); 
        }

        let $refNodeIdType = $node.find("el-select[v-model='Shareholder.identity_type']"); //获取证件类型节点
        $refNodeIdType.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑
        let $refNodeIdNo = $node.find("el-input[v-model='Shareholder.identity_num']"); //获取证件号节点
        $refNodeIdNo.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑
        let $refNodeCustType = $node.find("el-select[v-model='Shareholder.share_type']"); //获取证件号节点
        $refNodeCustType.attr("v-bind:disabled",'isEdit');//选择参照变成不可编辑
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
        handleRefChange1: function(type, data) {
           
          if(type === 'change') {
            
            this.$refs['Shareholder_ref'].model.share_type=data.value[0].customer_type;
            this.$refs['Shareholder_ref'].model.identity_type=data.value[0].identity_type;
            this.$refs['Shareholder_ref'].model.identity_num=data.value[0].identity_no;
            oThis.$refs["ShareholderRef"].setData("isEdit",true);
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
    //监听引用传参后实时变动
  computed: {
    currentpk_customer() {
      return this.pk_customer;
    }
  },
  //监听参数变动后方法
  watch: {
    pk_customer(val) {
      this.requestShareholder();
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
          this.requestShareholder();
      }
    },
    //请求股东信息
    requestShareholder() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/shareholder/page";
      let data = {
        "orderList": [
            {
                "direction": "desc",
                "property": "ts"
            }
            ],
            'pageNum': this.currentPage - 1,
            'pageSize': this.pageSize,
            "searchParams": {
            "searchMap": {
                'custCondList': [
                    {
                      'key':'pk_customer',
                      'oper':'=',
                      'value':this.pk_customer
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
            message: "股东信息获取失败",
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
        "Shareholder_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/shareholder/updateORinsert",
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
        let ShareholderTable = this.$refs.ShareholderRef.getData('Shareholder_t');
        ShareholderTable[this.baseEditIndex] = this.baseData;
        this.$refs.ShareholderRef.setData('Shareholder_t', ShareholderTable);
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

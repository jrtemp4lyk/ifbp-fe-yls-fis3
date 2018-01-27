<!-- 客户来源信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="RelatedCompanyRef"
                        tplId="RelatedCompanyTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="RelatedCompanyData"
                        :tplResetFun="RelatedCompanyResetFun"
                        :tplMethods="RelatedCompanyTplMethods"
                        :methods="t_Methods"
                        @form-confirm-click="RelatedCompanyFormConfirm"
                        @form-cancel-click="RelatedCompanyFormCancel"
                        @edit-table-click="RelatedCompanyEditTableRow"
                        @delete-table-click="RelatedCompanyDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 客户来源信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="RelatedCompanyDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RelatedCompanyDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="RelatedCompanyDeleteClick">确 定</el-button>
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
      nexuskey:"RelatedCompany",
      RelatedCompanyDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 客户来源信息新增
      RelatedCompanyIcons: [
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
            let uitemplateComp = oThis.$refs.RelatedCompanyRef.comp;
            let table = uitemplateComp.$refs["RelatedCompany_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      RelatedCompanyPk: "e06ff927-e356-437b-b9c8-a7974f2859b2", //custaxes
      RelatedCompanyData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      RelatedCompanyResetFun: function($node) {
        var $refNode = this.getNodeById($node, 'ork10hzfxh');  
        
        if($refNode.length) {
          $refNode.attr("v-on:trigger", "handleRefChange"); 
        }
       



        let $table = $node.find('el-table');
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
             
            var innerCode = data.value[0].refcode;
            this.$refs['RelatedCompany_ref'].model.intermediary_type=data.value[0].customer_type;
            this.$refs['RelatedCompany_ref'].model.intermediarycode=data.value[0].code;
          }
        }
      },
      RelatedCompanyTplMethods: {
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
      this.requestRelatedCompany();
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
          this.requestRelatedCompany();
      }
    },
    //请求客户来源信息
    requestRelatedCompany() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/RelatedCompany/page";
      let data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            pk_customer: this.pk_customer,
            message_owner: ownerId
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
          this.$refs["RelatedCompanyRef"].setData(
            "RelatedCompany_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "客户来源信息获取失败",
            type: "error"
          });
        });
    },
    //客户来源情况保存
    RelatedCompanyFormConfirm: function() {
      
      //获取当前数据
      let data = this.$refs.RelatedCompanyRef.comp.RelatedCompany;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.RelatedCompanyRef.comp.$refs[
        "RelatedCompany_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/RelatedCompany/updateORinsert",
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
                let linarraydata = this.$refs.RelatedCompanyRef.getData(
                  "RelatedCompany_t"
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
                this.$refs.RelatedCompanyRef.setData(
                  "RelatedCompany_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["RelatedCompanyRef"].comp.formShow = false;
                //this.requestRelatedCompany();
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
    RelatedCompanyFormCancel: function(type) {
      
      //this.$refs.RelatedCompanyRef.getTableComp().closeExpandRow();
        

        if (type === "form") {
          this.$refs["RelatedCompanyRef"].comp.formShow = false;
        } else {
          this.$refs["RelatedCompanyRef"].getTableComp().closeExpandRow();
          let RelatedCompanyTable = this.$refs.RelatedCompanyRef.getData('RelatedCompany_t');
          RelatedCompanyTable[this.baseEditIndex] = this.baseData;//获取点击修改前的值
          this.$refs.RelatedCompanyRef.setData('RelatedCompany_t', RelatedCompanyTable);
        }
    },
    //客户来源编辑
    RelatedCompanyEditTableRow: function(scope) {   
      //记录位置
      this.rmoveindex = scope.$index;
      // //行下展开表单界面
      let row = scope.row;
      // this.$refs["RelatedCompanyRef"].getTableComp().expandRow(row);
      // this.$refs["RelatedCompanyRef"].formShow = false;
      // //RelatedCompanyRef为表单数据对象参数
      // this.$refs["RelatedCompanyRef"].setData("RelatedCompany", row);
       
      this.$refs.RelatedCompanyRef.getTableComp().expandRow(scope.row);
      this.$refs.RelatedCompanyRef.comp.formShow = false;
      this.$refs.RelatedCompanyRef.setData('RelatedCompany',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

    },
    //客户来源信息删除提示
    RelatedCompanyDeleteTableRow: function(scope) {
      this.RelatedCompanyDelVisible = true;
      this.delId = scope.row.pk_cust_related_company;
    },
    //客户来源信息删除
    RelatedCompanyDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/RelatedCompany/deleteById",
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
            this.requestRelatedCompany();
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
      this.RelatedCompanyDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

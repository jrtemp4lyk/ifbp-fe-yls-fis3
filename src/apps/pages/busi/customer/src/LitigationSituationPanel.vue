<!-- 涉诉信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="LitigationSituationRef"
                        tplId="LitigationSituationTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="LitigationSituationData"
                        :tplResetFun="LitigationSituationResetFun"
                        :tplMethods="LitigationSituationTplMethods"
                        @form-confirm-click="LitigationSituationFormConfirm"
                        @form-cancel-click="LitigationSituationFormCancel"
                        @edit-table-click="LitigationSituationEditTableRow"
                        @delete-table-click="LitigationSituationDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 涉诉信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="LitigationSituationDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="LitigationSituationDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="LitigationSituationDeleteClick">确 定</el-button>
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
      nexuskey:"LitigationSituation",
      LitigationSituationDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 涉诉信息新增
      LitigationSituationIcons: [
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
            let uitemplateComp = oThis.$refs.LitigationSituationRef.comp;
            let table = uitemplateComp.$refs["LitigationSituation_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      LitigationSituationPk: "4a422aaa-feef-4858-8769-a8f4c48db8d1", //custaxes
      LitigationSituationData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      LitigationSituationResetFun: function($node) {
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
      LitigationSituationTplMethods: {
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
      this.requestLitigationSituation();
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
          this.requestLitigationSituation();
      }
    },
    //请求涉诉信息
    requestLitigationSituation() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/LitigationSituation/page";
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
        data: data,
        dataType: "json"
      })
        .then(res => {
          
          this.originalValue = res.data.data.content;
          this.$refs["LitigationSituationRef"].setData(
            "LitigationSituation_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "涉诉信息获取失败",
            type: "error"
          });
        });
    },
    //涉诉信息保存
    LitigationSituationFormConfirm: function() {
      
      //获取当前数据
      let data = this.$refs.LitigationSituationRef.comp.LitigationSituation;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.LitigationSituationRef.comp.$refs[
        "LitigationSituation_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/LitigationSituation/updateORinsert",
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
                let linarraydata = this.$refs.LitigationSituationRef.getData(
                  "LitigationSituation_t"
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
                this.$refs.LitigationSituationRef.setData(
                  "LitigationSituation_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["LitigationSituationRef"].comp.formShow = false;
                //this.requestLitigationSituation();
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
    // 涉诉信息form的取消操作
    LitigationSituationFormCancel: function(type) {
      
      this.$refs.LitigationSituationRef.getTableComp().closeExpandRow();
        if (type === "form") {
        this.$refs["LitigationSituationRef"].comp.formShow = false;
      } else {
        this.$refs["LitigationSituationRef"].getTableComp().closeExpandRow();
        let LitigationSituationTable = this.$refs.LitigationSituationRef.getData('LitigationSituation_t');
        LitigationSituationTable[this.baseEditIndex] = this.baseData;
        this.$refs.LitigationSituationRef.setData('LitigationSituation_t', LitigationSituationTable);
      }
    },
    //涉诉编辑
    LitigationSituationEditTableRow: function(scope) {
      //记录位置
      this.rmoveindex = scope.$index;
      // //行下展开表单界面
      let row = scope.row;
      // this.$refs["LitigationSituationRef"].getTableComp().expandRow(row);
      // this.$refs["LitigationSituationRef"].formShow = false;
      // //LitigationSituationRef为表单数据对象参数
      // this.$refs["LitigationSituationRef"].setData("LitigationSituation", row);
      
      this.$refs.LitigationSituationRef.getTableComp().expandRow(scope.row);
      this.$refs.LitigationSituationRef.comp.formShow = false;
      this.$refs.LitigationSituationRef.setData('LitigationSituation',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

    },
    //涉诉信息删除提示
    LitigationSituationDeleteTableRow: function(scope) {
      this.LitigationSituationDelVisible = true;
      this.delId = scope.row.pk_cust_litigation_situation;
    },
    //涉诉信息删除
    LitigationSituationDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/LitigationSituation/deleteById",
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
            this.requestLitigationSituation();
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
      this.LitigationSituationDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

<!-- 外部评级信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="ExternalRatingRef"
                        tplId="ExternalRatingTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="ExternalRatingData"
                        :tplResetFun="ExternalRatingResetFun"
                        :tplMethods="ExternalRatingTplMethods"
                        @form-confirm-click="ExternalRatingFormConfirm"
                        @form-cancel-click="ExternalRatingFormCancel"
                        @edit-table-click="ExternalRatingEditTableRow"
                        @delete-table-click="ExternalRatingDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 外部评级信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="ExternalRatingDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ExternalRatingDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="ExternalRatingDeleteClick">确 定</el-button>
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
      nexuskey:"ExternalRating",
      ExternalRatingDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 外部评级信息新增
      ExternalRatingIcons: [
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
            let uitemplateComp = oThis.$refs.ExternalRatingRef.comp;
            let table = uitemplateComp.$refs["ExternalRating_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      ExternalRatingPk: "01b45188-5c39-4283-9a55-f7d223a95889", //custaxes
      ExternalRatingData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      ExternalRatingResetFun: function($node) {
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

        let $pkCountry = this.getNodeById($node, "u5itmgcx7c");
        let $pkTaxes = this.getNodeById($node, "1idpzwci9up");
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
      ExternalRatingTplMethods: {
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
      this.requestExternalRating();
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
          this.requestExternalRating();
      }
    },
    //请求外部评级信息
    requestExternalRating() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/ExternalRating/page";
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
          this.$refs["ExternalRatingRef"].setData(
            "ExternalRating_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "外部评级信息获取失败",
            type: "error"
          });
        });
    },
    //外部评级情况保存
    ExternalRatingFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.ExternalRatingRef.comp.ExternalRating;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.ExternalRatingRef.comp.$refs[
        "ExternalRating_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/ExternalRating/updateORinsert",
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
                let linarraydata = this.$refs.ExternalRatingRef.getData(
                  "ExternalRating_t"
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
                this.$refs.ExternalRatingRef.setData(
                  "ExternalRating_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["ExternalRatingRef"].comp.formShow = false;
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
    // 外部评级信息form的取消操作
    ExternalRatingFormCancel: function(type) {
      if (type === "form") {
        this.$refs["ExternalRatingRef"].comp.formShow = false;
      } else {
        this.$refs["ExternalRatingRef"].getTableComp().closeExpandRow();
        let ExternalRatingTable = this.$refs.ExternalRatingRef.getData('ExternalRating_t');
        ExternalRatingTable[this.baseEditIndex] = this.baseData;//获取点击修改前的值
        this.$refs.ExternalRatingRef.setData('ExternalRating_t', ExternalRatingTable);
      }
    },
    //外部评级编辑
    ExternalRatingEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      // let row = scope.row;
      // this.$refs["ExternalRatingRef"].getTableComp().expandRow(row);
      // this.$refs["ExternalRatingRef"].formShow = false;
      // //ExternalRatingRef为表单数据对象参数
      // this.$refs["ExternalRatingRef"].setData("ExternalRating", row);
      this.$refs.ExternalRatingRef.getTableComp().expandRow(scope.row);
      this.$refs.ExternalRatingRef.comp.formShow = false;
      this.$refs.ExternalRatingRef.setData('ExternalRating',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //外部评级信息删除提示
    ExternalRatingDeleteTableRow: function(scope) {
      this.ExternalRatingDelVisible = true;
      this.delId = scope.row.pk_cust_external_rating;
    },
    //外部评级信息删除
    ExternalRatingDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/ExternalRating/deleteById",
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
            this.requestExternalRating();
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
      this.ExternalRatingDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

<!-- 上下游客户信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="CustUpDownRef"
                        tplId="CustUpDownTemplate"
                        :pkTemp="CustUpDownPk"
                        :tplData="CustUpDownData"
                        :tplResetFun="CustUpDownResetFun"
                        :tplMethods="CustUpDownTplMethods"
                        @form-confirm-click="CustUpDownFormConfirm"
                        @form-cancel-click="CustUpDownFormCancel"
                        @edit-table-click="CustUpDownEditTableRow"
                        @delete-table-click="CustUpDownDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 上下游客户信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="CustUpDownDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="CustUpDownDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="CustUpDownDeleteClick">确 定</el-button>
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
      CustUpDownDelVisible: false,                           
      rmoveindex: "",
      delId: "",
      // 上下游客户信息新增
      CustUpDownIcons: [
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
            let uitemplateComp = oThis.$refs.CustUpDownRef.comp;
            let table = uitemplateComp.$refs["CustUpDown_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      CustUpDownPk: "b3d4602b-1b66-45c9-bd97-8d2e8ebf5e5d", //custaxes
      CustUpDownData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      CustUpDownResetFun: function($node) {
        let $table = this.getNodeById($node, "ziehg8lr0t");
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
      CustUpDownTplMethods: {
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
      this.requestCustUpDown();
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
          this.requestCustUpDown();
      }
    },
    //请求上下游客户信息
    requestCustUpDown() {
      let url;
      url = ylsBusi + "cust/CustUpDown/page";
      let data = {
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
            pk_customer: this.pk_customer
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
          this.$refs["CustUpDownRef"].setData(
            "CustUpDown_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "上下游客户信息获取失败",
            type: "error"
          });
        });
    },
    //上下游客户情况保存
    CustUpDownFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.CustUpDownRef.comp.CustUpDown;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验
      this.$refs.CustUpDownRef.comp.$refs[
        "CustUpDown_ref"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/CustUpDown/updateORinsert",
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
                let linarraydata = this.$refs.CustUpDownRef.getData(
                  "CustUpDown_t"
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
                this.$refs.CustUpDownRef.setData(
                  "CustUpDown_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["CustUpDownRef"].comp.formShow = false;
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
    // 上下游客户信息form的取消操作
    CustUpDownFormCancel: function(type) {
      if (type === "form") {
        this.$refs["CustUpDownRef"].comp.formShow = false;
      } else {
        this.$refs["CustUpDownRef"].getTableComp().closeExpandRow();
        let CustUpDownTable = this.$refs.CustUpDownRef.getData('CustUpDown_t');
        CustUpDownTable[this.baseEditIndex] = this.baseData;//获取点击修改前的值
        this.$refs.CustUpDownRef.setData('CustUpDown_t', CustUpDownTable);
      }
    },
    //上下游客户编辑
    CustUpDownEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      // let row = scope.row;
      // this.$refs["CustUpDownRef"].getTableComp().expandRow(row);
      // this.$refs["CustUpDownRef"].formShow = false;
      // //CustUpDownRef为表单数据对象参数
      // this.$refs["CustUpDownRef"].setData("CustUpDown", row);
      this.$refs.CustUpDownRef.getTableComp().expandRow(scope.row);
      this.$refs.CustUpDownRef.comp.formShow = false;
      this.$refs.CustUpDownRef.setData('CustUpDown',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //上下游客户信息删除提示
    CustUpDownDeleteTableRow: function(scope) {
      this.CustUpDownDelVisible = true;
      this.delId = scope.row.pk_cust_updown;
    },
    //上下游客户信息删除
    CustUpDownDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/CustUpDown/deleteById",
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
            this.requestCustUpDown();
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
      this.CustUpDownDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

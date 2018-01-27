<!-- 资质认证信息管理模块 -->
<template>
  <div>
          <ifbp-template ref="QualificationCertRef"
                        tplId="QualificationCertTemplate"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="QualificationCertData"
                        :tplResetFun="QualificationCertResetFun"
                        :tplMethods="QualificationCertTplMethods"
                        @form-confirm-click="QualificationCertFormConfirm"
                        @form-cancel-click="QualificationCertFormCancel"
                        @edit-table-click="QualificationCertEditTableRow"
                        @delete-table-click="QualificationCertDeleteTableRow"
                        show-type="table-form"
                       >
          </ifbp-template>
    <!-- 资质认证信息 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="QualificationCertDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录 ？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="QualificationCertDelVisible = false, this.delId=''">取 消</el-button>
        <el-button type="primary" @click="QualificationCertDeleteClick">确 定</el-button>
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
      nexuskey:"QualificationCert",
      QualificationCertDelVisible: false,
      rmoveindex: "",
      delId: "",
      // 资质认证信息新增
      QualificationCertIcons: [
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
            let uitemplateComp = oThis.$refs.QualificationCertRef.comp;
            let table = uitemplateComp.$refs["QualificationCert_t_ref"];
            table.closeExpandRow();
            uitemplateComp.bankaccount = {};
            uitemplateComp.formShow = true;
            oThis.rmoveindex = "";
          }
        }
      ],
      QualificationCertPk: "af888fa3-e3ef-4801-9b24-ffcd64950923", //custaxes
      QualificationCertData: {
        rules: {
          pk_country: [
            { required: true, message: "发货国家不能为空", trigger: "blur" }
          ],
          pk_taxes: [{ required: true, message: "税类不能为空", trigger: "blur" }]
        }
      },
      QualificationCertResetFun: function($node) {
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
      QualificationCertTplMethods: {
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
      this.requestQualificationCert();
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
          this.requestQualificationCert();
      }
    },
    //请求资质认证信息
    requestQualificationCert() {
      let url;
      let ownerId=this.getCookie("_A_P_id");
      url = ylsBusi + "cust/QualificationCert/page";
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
          this.$refs["QualificationCertRef"].setData(
            "QualificationCert_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "资质认证信息获取失败",
            type: "error"
          });
        });
    },
    //资质认证情况保存
    QualificationCertFormConfirm: function() {
      //获取当前数据
      let data = this.$refs.QualificationCertRef.comp.QualificationCert;
      data.pk_customer = this.pk_customer;
      let baseUrl = ylsBusi;
      //保存校验de
       
      this.$refs.QualificationCertRef.comp.$refs[
        "QualificationCert_t"
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: baseUrl + "cust/QualificationCert/updateORinsert",
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
                let linarraydata = this.$refs.QualificationCertRef.getData(
                  "QualificationCert_t"
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
                this.$refs.QualificationCertRef.setData(
                  "QualificationCert_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                //隐藏详情列表
                this.$refs["QualificationCertRef"].comp.formShow = false;
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
    // 资质认证信息form的取消操作
    QualificationCertFormCancel: function(type) {
      if (type === "form") {
        this.$refs["QualificationCertRef"].comp.formShow = false;
      } else {
        this.$refs["QualificationCertRef"].getTableComp().closeExpandRow();
        let QualificationCertTable = this.$refs.QualificationCertRef.getData('QualificationCert_t');
        QualificationCertTable[this.baseEditIndex] = this.baseData;
        this.$refs.QualificationCertRef.setData('QualificationCert_t', QualificationCertTable);
      }
    },
    //资质认证编辑
    QualificationCertEditTableRow: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      // let row = scope.row;
      // this.$refs["QualificationCertRef"].getTableComp().expandRow(row);
      // this.$refs["QualificationCertRef"].formShow = false;
      // //QualificationCertRef为表单数据对象参数
      // this.$refs["QualificationCertRef"].setData("QualificationCert", row);
       this.$refs.QualificationCertRef.getTableComp().expandRow(scope.row);
      this.$refs.QualificationCertRef.comp.formShow = false;
      this.$refs.QualificationCertRef.setData('QualificationCert',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    //资质认证信息删除提示
    QualificationCertDeleteTableRow: function(scope) {
      this.QualificationCertDelVisible = true;
      this.delId = scope.row.pk_cust_qualification_cert;
    },
    //资质认证信息删除
    QualificationCertDeleteClick() {
      this.$http({
        url: ylsBusi + "cust/QualificationCert/deleteById",
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
            this.requestQualificationCert();
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
      this.QualificationCertDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

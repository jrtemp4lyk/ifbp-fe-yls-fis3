<template>
  <div id="customerDetailBank">
    <ifbp-template ref="custBankRef"
          tpl-id="custBankId"
          :pk-temp="custBankPk"
          :tpl-data="custBankData"
          show-type="table-form"
          :tpl-reset-fun="custBankResetFun"
          @edit-table-click="bankEditClick"
          @delete-table-click="bankDeleteClick"
          @form-confirm-click="bankFormConfirm"
          @form-cancel-click="bankFormCancel">
    </ifbp-template>
    <!--删除确认Dialog-->
    <ifbp-del-dialog
      v-model="bankDelDialogVisible"
      message="确认删除该数据？删除后无法恢复。"
      @click="bankDeleteDialogClick"
      >
    </ifbp-del-dialog>
  </div>
</template>
<script>
export default {
  data() {
    var pk_customer = this.$root.$router.currentRoute.params.id;
    return {
      // 通过传入的参数判断是新增还是修改操作
      pk_customer: pk_customer,
      // UI模板传入参数
      custBankPk: "000111100000001Z8DZS",
      custBankData: {
        params: {
          pk_banktype: ""
        },
        rules: {
          accnum: [
            {
              required: true,
              message: "账号不能为空",
              trigger: "blur"
            }
          ],
          accname: [
            {
              required: true,
              message: "户名不能为空",
              trigger: "blur"
            }
          ],
          pk_bankdoc: [
            {
              required: true,
              message: "开户银行不能为空",
              trigger: "blur"
            }
          ],
          pk_banktype: [
            {
              required: true,
              message: "银行类型不能为空",
              trigger: "blur"
            }
          ],
          accountproperty: [
            {
              required: true,
              message: "账户性质不能为空",
              trigger: "blur"
            }
          ]
        }
      },
      custBankResetFun($node) {
        var $table = this.getNodeById($node, "b327bj95th6");
        $table.attr(":show-header", "false");
        var operateArr = [
          {
            title: "启用",
            icon: "pt-tuichu"
          }
        ];
        var operateHtml = this.getBaseTableOperateHtml(operateArr);
        $table.append(operateHtml);

        var $accnum = this.getNodeById($node, "krvqs7xlxfs"); //账号
        var $accname = this.getNodeById($node, "83oyd6v35wm"); //户名
        var $pkBankdoc = this.getNodeById($node, "r69m5jd8zul"); //开户银行
        var $pkBanktype = this.getNodeById($node, "bo4dg59b0v"); //银行类别
        var $contactpsn = this.getNodeById($node, "vpthxzig1da"); //联系人
        var $tel = this.getNodeById($node, "k3bvpmgm9m"); //联系电话

        $accnum.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.accnum?scope.row.bankAccbas.accnum:""}}</div></template>'
        );
        $accname.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.accname?scope.row.bankAccbas.accname:""}}</div></template>'
        );
        $pkBankdoc.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' +
            "scope.row.bankAccbas.beanMap.pk_bankdoc_ref?scope.row.bankAccbas.beanMap." +
            'pk_bankdoc_ref[scope.row.bankAccbas.pk_bankdoc].name:"":""}}</div></template>'
        );
        $pkBanktype.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.beanMap?' +
            "scope.row.bankAccbas.beanMap.pk_banktype_ref?scope.row.bankAccbas.beanMap." +
            'pk_banktype_ref[scope.row.bankAccbas.pk_banktype].name:"":""}}</div></template>'
        );

        $contactpsn.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.contactpsn?scope.row.bankAccbas.contactpsn:""}}</div></template>'
        );
        $tel.html(
          '<template scope="scope"><div>{{scope.row.bankAccbas.tel?scope.row.bankAccbas.tel:""}}</div></template>'
        );
        return $node[0].outerHTML;
      },
      // 是否显示删除dialog
      bankDelDialogVisible: false
    };
  },
  mounted() {
    this.requestCustBank();
  },
  methods: {
    // 初始化加载数据
    requestCustBank() {
      if (!this.pk_customer) {
        this.$nextTick(() => {
          this.$refs.custBankRef.tableShow = false;
        });
        return;
      }
      this.$http({
        url:
          "/uapbd/custbank/list?pn=1&ps=10&sortColumn=auto&pk_customer=" +
          this.pk_customer,
        method: "get"
      })
        .then(res => {
          if (res.data.status === true) {
            this.$nextTick(() => {
              var custbankOriginal = res.data.data;
              this.$refs.custBankRef.setData(
                "bankaccount_t",
                JSON.parse(JSON.stringify(custbankOriginal))
              );
              if (custbankOriginal.length < 1) {
                this.$refs.custBankRef.tableShow = false;
              }
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(e => {
          console.error(e);
          this.$message({
            message: "银行信息获取失败",
            type: "error"
          });
        });
    },
    // table行的编辑操作
    bankEditClick(scope) {
      this.$refs.custBankRef.getTableComp().expandRow(scope.row);
      this.$refs.custBankRef.formShow = false;
      this.$refs.custBankRef.setData("bankaccount", scope.row);
      // 备份数据
      this.bankBaseData = JSON.parse(JSON.stringify(scope.row));
      this.bankEditIndex = scope.$index;
    },
    // table行的删除操作
    bankDeleteClick(scope) {
      this.custbankDel = scope.row;
      this.bankDelDialogVisible = true;
    },
    // form的保存操作
    bankFormConfirm(type) {
      this.$refs.custBankRef.validate(valid => {
        if (valid) {
          var data = this.$refs.custBankRef.getData("bankaccount");
          if (type === "form") {
            this.$message("新增数据为:" + JSON.stringify(data));
          } else {
            this.$message("修改数据为:" + JSON.stringify(data));
          }
        } else {
          this.$message("校验未通过");
        }
      }, type);
    },
    // form的取消操作
    bankFormCancel(type) {
      if (type === "form") {
        this.$refs.custBankRef.formShow = false;
      } else {
        this.$refs.custBankRef.getTableComp().closeExpandRow();
        var bankT = this.$refs.custLinkmanRef.getData("bankaccount_t");
        bankT[this.bankEditIndex] = this.bankBaseData;
        this.$refs.custLinkmanRef.setData("bankaccount_t", bankT);
      }
    },
    bankDeleteDialogClick() {
      var custbankDel = this.custbankDel;
      console.log("delete" + JSON.stringify(custbankDel));
      this.bankDelDialogVisible = false;
    }
  }
};
</script>
<style>

</style>

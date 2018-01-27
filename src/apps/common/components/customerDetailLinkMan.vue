<template>
  <div id="customerDetailBank">
    <ifbp-template ref="custLinkmanRef"
          tpl-id="custLinkmanId"
          :pk-temp="custLinkmanPk"
          :tpl-data="custLinkmanData"
          show-type="table-form"
          :tpl-reset-fun="linkmanResetFun"
          @edit-table-click="linkmanEditClick"
          @delete-table-click="linkmanDeleteClick"
          @form-confirm-click="linkmanFormConfirm"
          @form-cancel-click="linkmanFormCancel">
    </ifbp-template>
    <!-- 删除确认Dialog -->
    <ifbp-del-dialog
      v-model="linkmanDelDialogVisible"
      message="确认删除该数据？删除后无法恢复。"
      @click="linkmanDeleteDialogClick"
      >
    </ifbp-del-dialog>
  </div>
</template>
<script>
export default {

  props:['pk'],
  data() {
    var pk_customer = this.$root.$router.currentRoute.params.id;
    return {
      // 通过传入的参数判断是新增还是修改操作
      pk_customer: pk_customer,
      // UI模板传入参数
      custLinkmanPk: '34cc4979-181e-44dc-9cd7-79ab1b51738d',
      custLinkmanData: {
        rules: {
          name: [{
            required: true,
            message: '请输入联系人名称',
            trigger: 'blur'
          }]
        }
      },
      linkmanResetFun($node) {
        const $table = this.getNodeById($node, 'zxhlnr94qvd');
        $table.attr(':show-header', 'false');
        const operateHtml = this.getBaseTableOperateHtml();
        $table.append(operateHtml);

        const $sex = this.getNodeById($node, 'ir66pzdxiic'); //性别
        const $isdefault = this.getNodeById($node, 'h81qk6u00p5'); //是否默认
        $sex.html(
          '<template scope="scope"><div>{{scope.row.sex?(scope.row.sex===1?"男":"女"):""}}</div></template>'
        );
        $isdefault.html(
          '<template scope="scope"><div>{{scope.row.isdefault?(scope.row.isdefault===true?"是":""):""}}</div></template>'
        );
        return $node[0].outerHTML;
      },
      // 是否显示删除dialog
      linkmanDelDialogVisible: false
    };
  },
  mounted() {
    this.requestCustlinkman();
  },
  computed:{
    currentPK() {
      return this.pk;
    }
  },
  watch: {
    pk(val) {
      this.requestCustlinkman();
    }
  },
  methods: {
    // 初始化加载数据
    requestCustlinkman() {
      if (!this.pk) {
        this.$nextTick(() => {
            this.$refs.custLinkmanRef.tableShow = false;
        });
        return;
      }
      this.$http({
          url: '/uapbd/custlinkman/list?pn=1&ps=10&sortColumn=auto&pk_customer=' +
            this.pk_customer,
          method: 'get'
        })
        .then((res) => {
          if (res.data.status === true) {
            this.$nextTick(() => {
              var originalValue = res.data.data;
              this.$refs.custLinkmanRef.setData(
                'linkman_t',
                JSON.parse(JSON.stringify(originalValue))
              );
              if (custbankOriginal.length < 1) {
                this.$refs.custLinkmanRef.tableShow = false;
              }
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
        .catch((e) => {
          console.error(e);
          this.$message({
            message: '联系人信息获取失败',
            type: 'error'
          });
        });
    },
    // table行的编辑操作
    linkmanEditClick(scope) {
      this.$refs.custLinkmanRef.getTableComp().expandRow(scope.row);
      this.$refs.custLinkmanRef.formShow = false;
      this.$refs.custLinkmanRef.setData('linkman', scope.row);
      // 备份数据
      this.linkmanBaseData = JSON.parse(JSON.stringify(scope.row));
      this.linkmanEditIndex = scope.$index;
    },
    // table行的删除操作
    linkmanDeleteClick(scope) {
      this.delId = scope.row.pk_linkman;
      this.linkmanDelDialogVisible = true;
    },
    // form的保存操作
    linkmanFormConfirm(type) {
      this.$refs.custLinkmanRef.validate((valid) => {
        if (valid) {
          var data = this.$refs.custLinkmanRef.getData('linkman');
          if (type === 'form') {
            this.$message('新增数据为:' + JSON.stringify(data));
          } else {
            this.$message('修改数据为:' + JSON.stringify(data));
          }
        } else {
          this.$message('校验未通过');
        }
      }, type);
    },
    // form的取消操作
    linkmanFormCancel(type) {
      if (type === 'form') {
        this.$refs.custLinkmanRef.formShow = false;
      } else {
        this.$refs.custLinkmanRef.getTableComp().closeExpandRow();
        var linkmanT = this.$refs.custLinkmanRef.getData('linkman_t');
        linkmanT[this.linkmanEditIndex] = this.linkmanBaseData;
        this.$refs.custLinkmanRef.setData('linkman_t', linkmanT);
      }
    },
    linkmanDeleteDialogClick() {
      var delId = this.delId;
      console.log('delete' + delId);
      this.linkmanDelDialogVisible = false;
    }
  }
};

</script>
<style>

</style>

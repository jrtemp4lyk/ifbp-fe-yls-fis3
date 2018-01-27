export default {
  data() {
    return {
      // 标题旁的显示图标
      childIcons: [{
        icon: 'plus',
        click: () => {
          if (!this.id) {
            this.$message({
              message: "请先保存主表信息",
              type: 'error'
            });
          } else {
            this.currentChildRowValue = null;
            // 重置新增数据
            this.$refs.typicalDemoChildFormRef.resetData();

            // 显示右侧展开form
            this.$refs.grandsonPage.showPage();
          }
        }
      }],
      // UI模板传入参数
      typicalDemoChildFunnode: 'CJGL',
      typicalDemoChildNexuskey: 'typicalChild',
      typicalDemoChildData: {},
      typicalDemoChildResetFun($node) {
        var $table = this.getTableDom($node);
        // 子表默认不显示标题
        $table.attr(':show-header', 'false');
        var operateHtml = this.getBaseTableOperateHtml();
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      // 是否显示删除dialog
      childDelDialogVisible: false,
      // 是否孙表可编辑
      typicalDemoChildCreate: false,
      currentChildRowValue: null,
    };
  },
  methods: {
    // 初始化加载数据
    requestTypicalDemoChild() {
      // 新增时默认不显示子表的table
      if (!this.id) {
        this.$nextTick(() => {
          this.$refs.typicalDemoChildRef.tableShow = false;
        });
        return;
      }
      var data = {
        searchParams: {
          searchMap: {
            pk_example: this.id
          }
        }
      };
      this.$http({
          url: '/ifbp-app-sm-infoset-web/typical_demo_child/page',
          method: 'post',
          data: data,
          headers: {
            "Content-Type": "application/json"
          },
          dataType: "application/json"
        })
        .then((res) => {
          if (res.data.success === true) {
            this.$nextTick(() => {
              var resData = res.data.data.content;
              this.$refs.typicalDemoChildRef.setData(
                'TypicalDemoChildEntity_t', resData);
              this.$refs.typicalDemoChildRef.tableShow = resData.length < 1 ? false : true;
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            message: '子表信息获取失败',
            type: 'error'
          });
        });
    },
    // table行的编辑操作
    childEditClick(scope) {
      // 获取当前选中行的数据
      this.currentChildRowValue = JSON.parse(JSON.stringify(scope.row));
      // 备份数据
      this.childBaseData = JSON.parse(JSON.stringify(scope.row));
      this.childEditIndex = scope.$index;
      // 显示右侧滑出页面
      this.$refs.grandsonPage.showPage();
    },
    // table行的删除操作
    childDeleteClick(scope) {
      this.typicalDemoChildDel = scope.row;
      this.childDelDialogVisible = true;
    },

    childDeleteDialogClick() {
      var data = this.typicalDemoChildDel;
      this.$http({
          url: "/ifbp-app-sm-infoset-web/typical_demo_child/delete",
          method: "post",
          data: data,
          headers: {
            "Content-Type": "application/json"
          },
          dataType: "application/json"
        })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.childDelDialogVisible = false;
            this.requestTypicalDemoChild();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    }
  }
};

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
            // 关闭table中的编辑区
            this.$refs.typicalDemoChildRef.getTableComp().closeExpandRow();
            // 重置新增数据
            this.$refs.typicalDemoChildRef.resetFormData();
            // 显示新增区域
            this.$refs.typicalDemoChildRef.formShow = true;
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
      childDelDialogVisible: false
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
              this.$refs.typicalDemoChildRef.setTableData(resData);
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
          console.log(e)
          this.$message({
            message: '子表信息获取失败',
            type: 'error'
          });
        });
    },
    // table行的编辑操作
    childEditClick(scope) {
      this.$refs.typicalDemoChildRef.getTableComp().expandRow(scope.row);
      this.$refs.typicalDemoChildRef.formShow = false;
      this.$refs.typicalDemoChildRef.setFormData(scope.row);
      // 备份数据
      this.childBaseData = JSON.parse(JSON.stringify(scope.row));
      this.childEditIndex = scope.$index;
    },
    // form的保存操作
    childFormConfirm(type) {
      var vm = this;
      var url = "/ifbp-app-sm-infoset-web/typical_demo_child/update";
      this.$refs.typicalDemoChildRef.validate(valid => {
        if (valid) {
          var data = vm.$refs.typicalDemoChildRef.getFormData();
          // 拼接主表的id
          data = $.extend(data, {
            pk_example: vm.id
          });
          if (type === 'form') {
            url = "/ifbp-app-sm-infoset-web/typical_demo_child/create";
          }
          vm.$http({
            url: url,
            method: "post",
            data: data,
            headers: {
              "Content-Type": "application/json"
            },
            dataType: "application/json"
          })
            .then(res => {
              if (res.data.success) {
                vm.$message({
                  message: "保存成功"
                });
                vm.$refs.typicalDemoChildRef.tableShow = true;
                // 隐藏新增区域
                vm.$refs.typicalDemoChildRef.formShow = false;
                // 关闭Table中的编辑区域
                vm.$refs.typicalDemoChildRef.getTableComp().closeExpandRow();
                if (type === 'form') {
                  vm.requestTypicalDemoChild();
                }
              } else {
                vm.$message({
                  message: res.data.error.errorMessage,
                  type: "error"
                });
              }
            })
            .catch(() => {
              vm.$message({
                message: "保存失败",
                type: "error"
              });
            });
        } else {
          vm.$message('校验未通过');
        }
      });
    },
    // form的取消操作
    childFormCancel(type) {
      if (type === 'form') {
        this.$refs.typicalDemoChildRef.formShow = false;
      } else {
        this.$refs.typicalDemoChildRef.getTableComp().closeExpandRow();
        var childT = this.$refs.typicalDemoChildRef.getTableData();
        childT[this.childEditIndex] = this.childBaseData;
        this.$refs.typicalDemoChildRef.setTableData(childT);
      }
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

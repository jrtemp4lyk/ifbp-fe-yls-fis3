<template>
<!-- 工作日志 -->
<div>
    <ifbp-template ref="workLogRef"
                tplId="workLog"
                :funnode="workLogFunnode"
                :nexuskey="workLogNexusKey"
                :tplData="workLogData"
                :tplResetFun="workLogResetFun"
                @form-confirm-click="workLogFormConfirm"
                @form-cancel-click="workLogFormCancel"
                show-type="table-form"
                @edit-table-click="workLogEdit"
                @delete-table-click="workLogDelete"
                >
     </ifbp-template>

    <!-- 删除提示框-->
    <el-dialog
        title="提示"
        v-model="workLogDelVisible"
        :modal="true"
        size="tiny">
        <span>确认删除该条记录？删除后无法恢复。</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="workLogDelVisible = false, this.delId=''">取消</el-button>
            <el-button type="primary" @click="workLogDelClick">确定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import {ylsSale} from '../../../../common/js/publicData.js'
export default {
  //应用vue传过来接收参数
 
  props: ["pk_sale_info"],
  data() {
      var oThis = this;
      return {
          scrollDom: document.getElementsByClassName("view")[0],
          workLogDelVisible: false,
          delId: "",
          workLogFunnode: "YLSBT003",
          workLogNexusKey: "sale_work_log",
          workLogData: {
              rules: {}
          },
          workLogListSize: '',
          workLogCacheData: '',
          workLogResetFun: function($node) {
              var $table = $node.find("el-table");
              var operateArr = [
                  {
                      title: "编辑",
                      icon: "edit"
                  },
                  {
                      title: "删除",
                      icon: "delete"
                  }
              ];
              var operateHtml = this.getTableOperateHtml(operateArr);
              $table.append(operateHtml);
              return $node[0].outerHTML;
          }
      };
  },

  //获取数据初始化操作
  created () {},

  //页面操作
  mounted() {
      this.request();
  },

  watch: {
      workLogListSize(val) {
          this.$emit('workLogSizeListener', val);
      }
  },

  methods: {
      request() {
          if (this.pk_sale_info) {
              this.requestWorkLog();
          }
      },

      //请求工作日志表格数据
      requestWorkLog() {
          var url = ylsSale + "/sale/workLog/page";
          var data = {
              "orderList": [
                  {
                      "direction": "desc",
                      "property": "ts"
                  }
              ],
              pageNum: 0,
              pageSize: 0,
              searchParams: {
                  searchMap: {
                      'pk_sale_info': this.pk_sale_info
                  }
              }
          };
          this.$http({
              url: url,
              headers: {"Content-Type": "application/json"},
              method: "post",
              data: data,
              dataType: "json"
          }).then(res => {
              this.workLogData = res.data.data.content;
              this.workLogListSize = res.data.data.totalElements;
              this.$refs["workLogRef"].setData(
                  "WorkLog_t",
                  JSON.parse(JSON.stringify(this.workLogData))
              );

              //列表数据缓存
              this.workLogCacheData = JSON.parse(JSON.stringify(this.$refs.workLogRef.getData('WorkLog_t')));
          }).catch(() => {
              this.$message({
                  message: "信息获取失败",
                  type: "error"
              });
          });
      },

      //工作日志取消按钮
      workLogFormCancel: function(type) {
          //关闭表单或者下拉显示行
          if (type === "form") {
              this.$refs["workLogRef"].comp.formShow = false;
          } else {
              this.$refs["workLogRef"].getTableComp().closeExpandRow();
          }

          //还原数据
          this.$refs.workLogRef.setData('WorkLog_t', this.workLogCacheData);

      },

      //工作日志保存
      workLogFormConfirm: function() {
          //获取当前数据
          let url = "";
          var data = this.$refs.workLogRef.comp.WorkLog;
          data.pk_sale_info = this.pk_sale_info;
          if (data.pk_work_log) {
              url = ylsSale + '/sale/workLog/update';
          } else {
              url = ylsSale + '/sale/workLog/create';
          }
          this.$http({
              url: url,
              headers: {"Content-Type": "application/json"},
              method: "post",
              data: JSON.parse(JSON.stringify(data))
          }).then(res => {
              if (res.data.success === true) {
                  this.$message({
                      message: "保存成功！",
                      type: "success"
                  });
                  this.requestWorkLog();
                  this.$refs["workLogRef"].comp.formShow = false;
              } else {
                  this.$message({
                      message: res.data.error.errorMessage,
                      type: "error"
                  });
              }
          }).catch(() => {
              this.$message({
                  message: "更新失败",
                  type: "error"
              });
          });
      },

      //工作日志行编辑
      workLogEdit: function(scope) {
          //行下展开表单页面
          var row = scope.row;
          this.$refs.workLogRef.getTableComp().expandRow(row);
          this.$refs.workLogRef.formShow = false;

          //workLog为表单数据对象参数
          this.$refs.workLogRef.setData("WorkLog", row);

          //备份，点击取消时还原
          this.workLogCacheData = JSON.parse(JSON.stringify(this.$refs.workLogRef.getData('WorkLog_t')));
      },

      //工作日志行删除提示
      workLogDelete: function (scope) {
          this.workLogDelVisible = true;
          this.delId = scope.row.pk_work_log;
      },

      //工作日志行删除方法
      workLogDelClick() {
          this.$http({
              url: ylsSale + "/sale/workLog/deleteById",
              headers: {"Content-Type": "application/json"},
              method: "post",
              dataType: "json",
              data: this.delId
          }).then(res => {
              if (res.data.success === true) {
                  this.$message({
                      message: "删除成功",
                      type: "success"
                  });
                  this.requestWorkLog();
              } else {
                  this.$message({
                      message: res.data.error.errorMessage,
                      type: "error"
                  });
              }
          }).catch(e => {
              this.$message({
                  message: "信息删除失败！",
                  type: "error"
              });
          });
          this.workLogDelVisible = false;
          this.delId = "";
      }
  }
};
</script>
<<style>

</style>



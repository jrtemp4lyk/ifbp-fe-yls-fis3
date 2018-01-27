<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">财报信息</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack" >返回</el-button>
        </div>
        <!-- 财报信息主模板 temp start-->
        <ifbp-panel id="basePanel" title="财报信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :methods="formReSetMethods"
                    :tpl-reset-fun="formResetFun"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
            <el-upload
                  class="button-no-radius fr"
                  :action="action"
                  ref="upload"
                  :data="uploadType"
                  :auto-upload="false"
                  :show-file-list="false"
                  :on-success="uploaded"
                  :on-change="filechange"
                  :before-upload="beforeAvatarUpload">
                  <el-button type="primary" class="button-no-radius">点击上传</el-button>
            </el-upload>
          </div>
        </ifbp-panel>
          <ifbp-panel id="basePanelchild" title="财报信息">
          <ifbp-template ref="custreportchild"
                    tplId="pkiTemplate"
                    :funnode="kpi_funnode"
                    :nexuskey="kpi_nexusKey"
                    :methods="kpi_formReSetMethods"
                    show-type="table"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <!--分页组件-->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
        </el-pagination>
          </ifbp-panel>
      </ifbp-panel-group>
    </div>
    <!--删除确认Dialog-->
      <el-dialog
        title="提示"
        v-model="delDialogVisible"
        @update:visible="val => delDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认删除该数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
        </span>
       </el-dialog>
  </div>
</template>
<script>
import { pagination, ylsBusi } from "../../../../common/js/publicData.js";
export default {
  mixins: [pagination("loadcustreportkpi")],
  data() {
    let oThis = this;
    let file = "";
    return {
      //固定写法
      scrollDom: document.getElementsByClassName("view")[0],
      //主键
      pk_cust_report: "",
      //当前实体
      custreport: "",
      //删除对话框是否展示
      delDialogVisible: false,
      //上传路径
      action: ylsBusi + "cust/report/financeImprot",
      uploadType: {
        custreport: ""
      },
      //删除标识，区分子表
      delType: "",
      //删除实体主键
      delId: "",
      funnode: "BT003",
      kpi_funnode: "BT003",
      nexusKey: "cust_report",
      kpi_nexusKey: "cust_kpi",
      tplData: {},
      //是否编辑态
      editable: false,
      calcBtnshow: true,
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editable = !oThis.editable;
            oThis.calcBtnshow = !oThis.calcBtnshow;
          }
        }
      ],
      //控件绑定事件
      formResetFun($node) {},
      //控件绑定事件实现
      formReSetMethods: {},
      kpi_formReSetMethods: {}
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //返回按钮
    goBack() {
      window.history.back(-1);
    },
    clickCancel() {
      this.editable = false;
      //恢复修改前值
      this.$refs["baseTemplateRef"].setData("custReport_t", this.data);
    },
    clickSave() {
      let data = this.$refs.baseTemplateRef.comp.custReport;
      this.custreport = JSON.stringify(data);
      this.uploadType.custreport = this.custreport;
      if (this.$refs.baseTemplateRef.comp.$refs["formRef"].model.report_name ==="") {
        this.$message.error("请选择导入文件！");
      } else {
        this.$refs.upload.submit();
      }
      this.$refs.upload.submit();
    },
    uploaded(re) {
      if (re.success) {
        this.$emit("getData");
        this.$message({
          type: "success",
          message: "成功导入" + re.data.importSum + "条数据"
        });
        this.pk_cust_report = re.data.pk;
        this.loadData();
      } else {
        this.$message.error(re.error.errorMessage);
      }
    },
    filechange(file, fileList) {
      debugger;
      var oThis = this;
      setTimeout(function() {
        let filename = file.name;
        filename = filename.substring(filename.lastIndexOf(".") + 1);
        if ("xlsx" === filename || "xls" === filename) {
          var formData = oThis.$refs.baseTemplateRef.getFormData();
          formData = JSON.parse(JSON.stringify(formData));
          formData.report_name = file.name;
          oThis.$refs["baseTemplateRef"].setData(
            "custReport",
            JSON.parse(JSON.stringify(formData))
          );
        } else {
          oThis.$message.error("导入文件必须为Excel文件!");
        }
      });
    },
    beforeAvatarUpload(file) {
      return true;
    },
    //加载数据方法
    loadData() {
      debugger;
      if (this.pk_cust_report === "" && !this.pk_cust_report) {
        this.pk_cust_report = this.$root.$router.currentRoute.params.id;
      }
      if (this.pk_cust_report !== "" && this.pk_cust_report) {
        //加载主表
        this.loadcustreport(this.pk_cust_report);
        //加载字表
        this.loadcustreportkpi(this.pk_cust_report);
        this.editable = false;
        this.calcBtnshow = true;
      } else {
        this.editable = true;
        this.calcBtnshow = false;
      }
    },
    //详情查询
    loadcustreport(pk_cust_report) {
      debugger;
      if (this.pk_cust_report !== "") {
        console.log(this.pk_cust_report !== "");
        this.$http({
          url: ylsBusi + "cust/report/getById",
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.pk_cust_report
        })
          .then(res => {
            debugger;
            let originalValue = res.data.data;
            this.$refs["baseTemplateRef"].setData(
              "custReport",
              JSON.parse(JSON.stringify(originalValue))
            );
          })
          .catch(e => {
            this.$message({
              message: "财报详情获取失败",
              type: "error"
            });
          });
      }
    },
    //字表详情
    loadcustreportkpi(pk_cust_report) {
      let data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: this.currentPage - 1,
        pageSize: this.pageSize,
        searchParams: {
          searchMap: {
            fk_id_reportkpi: this.pk_cust_report
          }
        }
      };
      this.$http({
        url: ylsBusi + "/report/pki/page",
        headers: { "Content-Type": "application/json" },
        method: "post",
        data
      })
        .then(res => {
          debugger;
          let kpiValue = res.data.data.content;
          this.$refs["custreportchild"].setData(
            "reportKpi_t",
            JSON.parse(JSON.stringify(kpiValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
        })
        .catch(e => {
          this.$message({
            message: "财报详情获取失败",
            type: "error"
          });
        });
    },
    //删除确定按钮
    deleteConfirmClick() {
      this.delId = scope.row.pk_cust_report;
      this.$http({
        url: ylsBusi + "cust/report/deleteById",
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
            this.delDialogVisible = false;
            //刷新列表
            if (this.delType === "loanRule") {
              this.loadPlanRule(this.pk_calc);
            } else if (this.delType === "loanPlan") {
              this.loadLoanPlan(this.pk_calc);
            }
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    }
  }
};
</script>
<style>
.detail-button-header {
  height: 56px;
  padding: 10px 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e3e3e3;
}
input[type="file"] {
  visibility: hidden;
  width: 1px;
  id: "file";
}
</style>

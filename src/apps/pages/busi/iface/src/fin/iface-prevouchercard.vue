<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">
        凭证明细
      </h2>
    </div>
    <!-- 凭证卡片 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125">
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
        </div>
        <ifbp-panel id="basePanel" title="凭证信息" :icons="baseIcons">
          <!--接口凭证主表表单-->
          <ifbp-template :editable="formEditable"
            funnode="YLSBT010" nexuskey="ylsifaceprevoucher" 
            ref="prevoucherForm" show-type="form" 
            tplid="prevoucher-template">
          </ifbp-template>
        </ifbp-panel>
        <ifbp-panel id="basePanel" title="分录信息" :icons="baseIcons">
          <!--凭证分录-->
          <ifbp-template
            funnode="YLSBT010" nexuskey="ylsprevoucherdetail" 
            ref="prevoucherdetailForm" show-type="table" tplid="prevoucherdetail-template">
          </ifbp-template>
        </ifbp-panel>
      </ifbp-panel-group>
      <!--删除确认Dialog-->
      <el-dialog :modal="true" size="tiny" title="提示" v-model="delDialogVisible">
        <span>
          确认删除该凭证分录？删除后无法恢复。
        </span>
        <span class="dialog-footer" slot="footer">
          <el-button @click="delDialogVisible = false">
            取 消
          </el-button>
          <el-button @click="deleteConfirmClick" type="primary">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { pagination, ylsBusi } from '../../../../../common/js/publicData.js'
export default {
  mixins: [pagination('request')],//分页
  data() {
    return {
      curServiceConfig: {},
      formEditable: false,
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId: ""
    };
  },
  mounted() {
    this.requestVoucherEntity();
  },
  methods: {
    goBack(){
      window.history.back(-1);
    },
    // 添加按钮
    addInfo() {
      // 新增清空表单数据
      this.$refs.valuemapForm.setData('InterfaceConfig', {});
      this.$refs.valuemapForm.formShow = true;
      this.$refs.valuemapForm.getTableComp().closeExpandRow();
    },
    //删除操作
    tableDeleteClick(scope) {
      this.delId = scope.row.pk_iface_name;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+"/iface/serviceconfig/deleteById",
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
          this.request();
        } else {
          this.$message({
            message: res.data.msg,
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
    },
    // 查询凭证主表实体
    requestVoucherEntity() {
      var url = ylsBusi+"iface/serviceconfig/getById";
      this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.$root.$router.currentRoute.params.configid,
          dataType: "json"
        })
        .then(res => {
          console.log(JSON.stringify(res));
          var originalValue = res.data.data;
          this.$refs.serviceconfigForm.setData('InterfaceConfig',originalValue);
        })
        .catch(e => {
          console.log(e);
          this.$message({
            message: "获取接口信息",
            type: "error"
          });
        });
    },
    //后台请求
    request() {
        var url = ylsBusi+"iface/servicelog/page";
        var data = {
          orderList: [
            {
              direction: "desc",
              property: "ts"
            }
          ],
        pageNum: this.currentPage - 1,
        pageSize: this.pageSize,
        searchParams: {
          searchMap: {qtAggVO:JSON.stringify(this.searchTemplateParam)}
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
          var originalValue = res.data.data.content;
          this.$refs.servicelog.setData('IfaceCallLog_t',originalValue);
          this.totalElements = res.data.data.totalElements; // 总条数
        })
        .catch(e => {
          console.log(e);
          this.$message({
            message: "信息获取失败",
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
</style>

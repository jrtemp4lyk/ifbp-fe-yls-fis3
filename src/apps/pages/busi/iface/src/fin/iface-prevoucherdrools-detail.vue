<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">
        预生成凭证规则明细
      </h2>
    </div>
    <!-- 凭证卡片 -->
    <div class="detail-main-container clearfix">
      <div class="detail-button-header">
        <el-button class="fr" type="primary" @click="goBack">返回</el-button>
      </div>
      <el-tabs v-model="activeName" type="card" class="detail-tab" @tab-click="tabClick">
        <el-tab-pane name="droolstab" label="预生成凭证规则">
          <ifbp-panel id="basePanel" title="预生成凭证规则基本信息" :icons="baseIcons">
            <!--接口凭证主表表单-->
            <ifbp-template :editable="formEditable" :tpl-data="curDroolsEntity"
              funnode="YLSBT009" nexuskey="ylsifacevoucherdrools" 
              ref="prevoucherdroolsForm" show-type="form" 
              tplid="prevoucherdrools-template">
            </ifbp-template>
            <div class="form-button-div" v-show="formEditable">
              <el-button type="default" class="button-no-radius" @click="droolsCancel">取消</el-button>
              <el-button type="primary" class="button-no-radius" @click="droolsSave">保存</el-button>
            </div>
          </ifbp-panel>
        </el-tab-pane>
        <el-tab-pane name="dataitemtab" label="预生成凭证数据项">
          <div class="droolsdataitem-formpanel">
            <el-form ref="sqlform" :model="curDroolsEntity" label-width="80px">
              <el-form-item label="取数SQL">
                <el-input type="textarea" :rows="4" v-model="curDroolsEntity.mybatis_sql"></el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="saveMybatisSQL">保存SQL</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--单据数据项-->
          <iface-prevoucherdrools-dataitem :droolsid="droolsid" ref="droolsdataitemref"></iface-prevoucherdrools-dataitem>
        </el-tab-pane>
      </el-tabs>
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
import { ylsBusi } from '../../../../../common/js/publicData.js'
import droolsdataitem from './iface-prevoucherdrools-dataitem.vue'

export default {
  data() {
    var oThis = this;
    return {
      activeName: 'droolstab',
      droolsid:null,
      curDroolsEntity: {},
      formEditable: false,
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId: "",
      baseIcons: [
        {
          icon: "edit",
          click: function() {
            oThis.editDroolsInfo();
          }
        }
      ]
    };
  },
  components:{
    'iface-prevoucherdrools-dataitem':droolsdataitem //局部注册
  },
  mounted() {
    this.requestVoucherEntity();
  },
  methods: {
    tabClick(tab, event) {
      if('dataitemtab' === tab.name){
        this.$refs.droolsdataitemref.request();
      }
    },
    goBack(){
      window.history.back(-1);
    },
    // 修改Drools
    editDroolsInfo() {
      this.formEditable = true;
    },
    // 取消编辑
    droolsCancel() {
      this.formEditable = false;
    },
    // 保存SQL
    saveMybatisSQL() {
      this.$refs.sqlform.validate((valid) => {
        if(valid){
          var url = ylsBusi+'iface/prevoucherdrools/updateMybatisSql';
          this.$http({
            url: url,
            method: 'POST',
            data: this.curDroolsEntity,
            dataType: 'json'
          }).then((res) => {
            if (res.data.success) {
              this.$message({
                message: '修改预生成凭证规则取数SQL成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '修改修改预生成凭证规则取数SQL接口调用失败！',
              type: 'error'
            });
          });
        }
      });
    },
    // 保存修改
    droolsSave() {
      this.$refs.prevoucherdroolsForm.validate((valid) => {
        if(valid){
          var formData = this.$refs.prevoucherdroolsForm.getData('IfacePrevoucherDrools');
          var url = ylsBusi+'iface/prevoucherdrools/update';
          this.$http({
            url: url,
            method: 'POST',
            data: formData,
            dataType: 'json'
          }).then((res) => {
            if (res.data.success) {
              this.$message({
                message: '修改预生成凭证生成规则成功！',
                type: 'success'
              });
              this.droolsCancel();
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '修改预生成凭证生成规则接口调用失败！',
              type: 'error'
            });
          });
        }
      });
    },
    //删除操作
    tableDeleteClick(scope) {
      this.delId = scope.row.pk_iface_name;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+"/iface/prevoucherdrools/deleteById",
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
      this.droolsid = this.$root.$router.currentRoute.params.droolsid;
      var url = ylsBusi+"iface/prevoucherdrools/getById";
      this.$http({
          url: url,
          headers: { "Content-Type": "application/json" },
          method: "post",
          data: this.droolsid,
          dataType: "json"
        })
        .then(res => {
          console.log(JSON.stringify(res));
          this.curDroolsEntity = res.data.data;
          this.$refs.prevoucherdroolsForm.setData('IfacePrevoucherDrools',this.curDroolsEntity);
        })
        .catch(e => {
          console.log(e);
          this.$message({
            message: "获取接口信息",
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

  .detail-tab{
    background-color: #ffffff;
    padding-top: 20px;
  }

  .droolsdataitem-formpanel{
    padding:10px 20px 10px 20px;
  }
</style>

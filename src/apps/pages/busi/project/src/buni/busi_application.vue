<template>
  <div>
    <ifbp-template ref="applyRef"
                  tplId="applyId"
                  :funnode="applyFunnode"
                  :nexuskey="applyNexuskey"
                  show-type="form"
                  :tplData="applyData"
                  :editable="applyEditable">
    </ifbp-template>
    <div class="form-button-div" v-if="applyEditable">
      <el-button type="default" class="button-no-radius" @click="applyCancel">取消</el-button>
      <el-button type="primary" class="button-no-radius" @click="applyConfirm">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {ylsBusi} from '../../../../../common/js/publicData.js';
  export default {
    props: ['pk_application'],
    data() {
      let oThis = this;
      return {
        // 固定写法
        scrollDom: document.getElementsByClassName("view")[0],
        // 表单是否可编辑
        applyEditable: false,
        // 模板元素start
        applyFunnode: 'BT008',
        applyNexuskey: 'application',
        applyData: {
          rules: {}
        }
        // 模板元素end
      }
    },
    mounted() {
      if (this.pk_customer !== '' && this.pk_application !== '') {
        this.loadData();
      } else {
        this.$message({
          message:'客户主键与业务申请逐渐传递为空'}
        );
      }
    },
    methods: {
      // 加载初始数据
      loadData() {
        this.$http({
          url: ylsBusi + 'prj/apply/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_application
        }).then(res => {
          if (res.data.success === true) {
            let originalValue = res.data.data;
            console.log(originalValue);
            this.$refs.applyRef.setFormData(originalValue);

            // 备份数据
            this.copyForData = JSON.parse(JSON.stringify(originalValue));
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(e => {
          console.log(e);
          this.$message({
            message: '业务申请基本信息获取失败',
            type: 'error'
          });
        })
      },
      applyCancel() {
        this.applyEditable = false;
        debugger;
        // 加载备份的数据
        this.$refs.applyRef.setFormData(JSON.parse(JSON.stringify(this.copyForData)));
      },
      applyConfirm() {
        let datam = this.$refs.applyRef.getFormData();
        this.$http({
          url: ylsBusi + 'prj/apply/update',
          headers: {'Content-Type': 'application/json'},
          method: 'post',
          data: datam
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '业务申请更新成功',
              type: 'success'
            })
            let originalValue = res.data.data;
            this.$refs.applyRef.setFormData(originalValue);
            this.applyEditable = false;
            // 备份数据
            this.copyForData = JSON.parse(JSON.stringify(originalValue));
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(e => {
          console.log(e);
          this.$message({
            message: '业务申请更新失败',
            type: 'error'
          });
        })
      }
    }
  }
</script>
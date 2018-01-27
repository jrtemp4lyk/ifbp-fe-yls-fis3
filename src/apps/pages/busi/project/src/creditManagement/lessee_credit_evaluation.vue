<template>
  <div>
    <div class="eval-title">您也可以<a @click="switchEnterStatus" v-text="evaluationMethod"></a>承租人资信评价</div>
    <div v-show="enterStatus">
      <ifbp-template ref="lesseeCreditEvaluationRef"
                  tplId="lesseeCreditEvaluation"
                  :funnode="Funnode"
                  :nexuskey="NexusKey"
                  :tplData="lesseeCreditEvaluationData"
                  @form-confirm-click="Confirm"
                  @form-cancel-click="Cancel"
                  show-type="form"
                  >
      </ifbp-template>
      <div class="form-button-div">
          <el-button type="default" class="button-no-radius" @click="enterCancl">取消</el-button>
          <el-button type="primary" class="button-no-radius" @click="enterSave">保存</el-button>
      </div>
    </div>
    <div v-show="!enterStatus">
      <el-upload
        class="upload-demo"
        drag
        action=""
        multiple
        auto-upload="false"
        show-file-list="true"
        :file-list="fileList">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">文件大小不超过10M</div>
      </el-upload>
      <div class="form-button-div">
          <el-button type="primary" class="button-no-radius" @click="annexUpload">上传</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {ylsSale} from '../../../../../common/js/publicData.js'
export default {
  props: ["pk_project_credit"],
  data() {
    var oThis = this;
    return {
      Funnode: 'BT008',
      NexusKey: 'lessee_credit_evaluation',
      enterStatus: true,
      evaluationMethod: '附件上传',
      fileList: [],
      lesseeCreditEvaluationData: {
        rules: {}
      },


    };
  },

  mounted() {

  },

  methods: {

    enterCancl() {

    },

    enterSave() {

    },

    annexCancl() {

    },

    annexUpload() {
      let fileList = this.fileList;
      this.$refs.upload.submit();
      debugger
    },

    switchEnterStatus() {
      this.enterStatus = !this.enterStatus;
      if (this.enterStatus) {
        this.evaluationMethod = '附件上传';
      } else {
        this.evaluationMethod = '手工录入';     
      }
    },

  }
  
}
</script>
<style>
.eval-title {
  font-size: 14px;
  margin-bottom: 20px;
}

input[type="file"] {
  visibility: hidden;
  width: 1px;
  id: "file";
}
</style>



<template>
  <div class='main-panel'>
    <!-- 主体区域 -->
    <div class='detail-main-container clearfix'>
      <div class='operator-container'>
        <div class='fl'>
          <h3 class='name'>{{ title }}</h3>
        </div>
        <div class='fr'>
          <el-button type='default' class='button-no-radius' @click='goBack'> 取 消 </el-button>
          <el-button type='primary' class='button-no-radius' @click='clickSave'> 保 存 </el-button>
        </div>
      </div>
      <!-- 型号主模板 temp start -->
      <ifbp-template ref='baseTemplateRef'
                    tplId='baseTemplate'
                    :funnode='funNode'
                    :nexuskey='nexusKey'
                    show-type='form'
                    :tplResetFun='tplResetFun'
                    :methods='t_Methods'
                    :tplData='tplData'
                    :editable='editable'>
      </ifbp-template>
      <!-- 型号主模板 temp end -->
    </div>
  </div>
</template>
<script>
import {ylsBase} from '../../../../common/js/publicData.js'
export default {
  data() {
    let oThis = this;
    let validateModel = function(rule, value, callback) {
      if (rule.field = 'model_name') {
        if (value == '') {
          callback(new Error('名称不能为空! '));
        } else {
          let fkBrand = oThis.$refs.baseTemplateRef.comp.$refs['model_form'].model.fk_brand;
          let fkSeries = oThis.$refs.baseTemplateRef.comp.$refs['model_form'].model.fk_series;
          let datam = {
            fkBrand: fkBrand,
            fkSeries: fkSeries,
            name: value
          };
          if (oThis.pk_model != '') {
            datam.pk = oThis.pk_model;
          }
          oThis.$http({
            url: ylsBase + 'model/isUnique',
            hearders: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(datam))
          }).then(res => {
            if (res.data.success === true) {
              if (res.data.data === true) {
                callback();
              } else {
                callback(new Error('型号已存在! '));
              }
            } else {
              callback(new Error(res.data.error.errorMessage));
            }
          }).catch(() => {
            callback(new Error('后台服务有误，请联系管理员！'));
          })
        }
      }
    }
    return {
      // 固定写法
      scrollDom: document.getElementsByClassName('view')[0],
      // 型号主键
      pk_model: '',
      // 页面标题
      title: '',
      // 型号主模板 baseTemplateRef start
      funNode: 'BT011',
      nexusKey: 'Equip_Model',
      tplData: {
        rules: { model_name: [{ validator: validateModel, trigger: 'blur' }] }
      },
      editable: true,
      tplResetFun: function($node) {
        //厂牌参照
        let $refNode = this.getNodeById($node, 'tsech3wodyb'); 
        if($refNode.length) {
          $refNode.attr("v-on:trigger", "handleRefChange"); 
        }
      },
      t_Methods: {
        handleRefChange: function(type, data) {
          if(type === 'change') {
            let refParams={'key':data.value[0].id};
            oThis.$refs.baseTemplateRef.setData('series_param', refParams);
          }
        }
      }
      // 型号主模板 baseTemplateRef end
    };
  },
  props: ['modelMsg'],
  created() {
    this.loadData();
  },
  methods: {
     // 返回按钮
      goBack() {
        // window.history.back(-1);
        this.$emit('change-model-detail', 'swithToTable');
      },
      // 型号主模板 baseTemplateRef 事件处理 start
      clickSave(){
        let data = this.$refs.baseTemplateRef.comp.Model;
        let jsonData = JSON.parse(JSON.stringify(data));
        let url;
        this.$refs.baseTemplateRef.validate(valid => {
          if (valid) {
            if (this.modelMsg == 'add') {
              url = ylsBase + 'model/create';
            } else {
              url = ylsBase + 'model/update';
            }
            this.$http({
                url: url,
                headers: {'Content-Type': 'application/json'},  
                method: 'post',
                data: jsonData
            }).then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '操作成功!',
                  type: 'success'
                });
                // this.editable = false;
                // let originalValue = res.data.data;
                // this.$refs['baseTemplateRef'].setData(
                  // 'Model',
                  // JSON.parse(JSON.stringify(originalValue))
                // );
                this.$emit('change-model-detail', 'swithToTable');
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(e => {
              this.$message({
                message: '型号保存失败！',
                type: 'error'
              });
            });
          } else {
            this.$message('校验未通过! ');
          }
        })
      },
      // 型号主模板 baseTemplateRef 事件处理 end

      // 加载数据方法
      loadData() {
        // 判断modelMsg
        if (this.modelMsg == 'add'){
          this.title = '型号列表 > 型号新增';
        } else {
          this.title = '型号列表 > 型号变更';
          this.pk_model = this.modelMsg;
        }
        // 详情页面
        if (this.pk_model && this.pk_model != '') {
          // 加载型号信息
          this.loadModelDetail(this.pk_model);
        } else {
          this.editable = true;
        }
      },
      // 加载型号信息
      loadModelDetail(pk_model){
        this.$http({
            url: ylsBase + 'model/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data: pk_model
        }).then(res => {
          if (res.data.success === true) {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'Model',
              JSON.parse(JSON.stringify(originalValue))
            );
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            })
          }
        }).catch(e => {
          this.$message({
            message: '报价详情获取失败',
            type: 'error'
          });
        });
      }
  }
};
</script>
<style>
  .operator-container {
    height: 56px;
    padding: 10px 20px;
    background-color: #ffffff;
    border-bottom: 1px solid #e3e3e3;
  }
</style>

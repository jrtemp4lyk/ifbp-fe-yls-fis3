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
      <!-- 系列主模板 temp start -->
      <ifbp-template ref='baseTemplateRef'
                    tplId='baseTemplate'
                    :funnode='funNode'
                    :nexuskey='nexusKey'
                    show-type='form'
                    :tplData='tplData'
                    :editable='editable'>
      </ifbp-template>
      <!-- 系列主模板 temp end -->
    </div>
  </div>
</template>
<script>
import {ylsBase} from '../../../../common/js/publicData.js'
export default {
  data() {
    let oThis = this;
    let validateSeries = function(rule, value, callback) {
      if (rule.field == 'series_name') {
        if (value === '') {
          callback(new Error('名称不能为空! '));
        } else {
          let fk = oThis.$refs.baseTemplateRef.comp.$refs['series_form'].model.fk_brand;
          let datam = {
            fk: fk,
            name: value
          };
          if (oThis.pk_series != '') {
            datam.pk = oThis.pk_series;
          }
          oThis.$http({
            url: ylsBase + 'series/isUnique',
            hearders: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(datam))
          }).then(res => {
            if (res.data.success === true) {
              if (res.data.data === true) {
                callback();
              } else {
                callback(new Error('系列已存在! '));
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
      // 系列主键
      pk_series: '',
      // 页面标题
      title: '',
      // 系列主模板 baseTemplateRef start
      funNode: 'BT011',
      nexusKey: 'Equip_Series',
      tplData: {
        rules: { series_name: [{ validator: validateSeries, trigger: 'blur' }] }
      },
      editable: true,
      // 系列主模板 baseTemplateRef end
    };
  },
  props: ['seriesMsg'],
  created() {
    this.loadData();
  },
  methods: {
     // 返回按钮
      goBack() {
        // window.history.back(-1);
        this.$emit('change-series-detail', 'swithToTable');
      },
      // 系列主模板 baseTemplateRef 事件处理 start
      clickSave() {
        let data = this.$refs.baseTemplateRef.comp.Series;
        let jsonData = JSON.parse(JSON.stringify(data));
        let url;
        this.$refs.baseTemplateRef.validate(valid => {
          if (valid) {
            if (this.seriesMsg == 'add') {
              url = ylsBase + 'series/create';
            } else {
              url = ylsBase + 'series/update';
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
                  // 'Series',
                  // JSON.parse(JSON.stringify(originalValue))
                // );
                this.$emit('change-series-detail', 'swithToTable');
              } else {
                this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
              }
            }).catch(e => {
              this.$message({
                message: '系列保存失败！',
                type: 'error'
              });
            });
          } else {
            this.$message('校验未通过! ');
          }
        })
      },
      // 系列主模板 baseTemplateRef 事件处理 end

      // 加载数据方法
      loadData() {
        // 判断seriesMsg
        if (this.seriesMsg == 'add'){
          this.title = '系列列表 > 系列新增';
        } else {
          this.title = '系列列表 > 系列变更';
          this.pk_series = this.seriesMsg;
        }
        // 详情页面
        if (this.pk_series && this.pk_series != '') {
          // 加载系列信息
          this.loadSeriesDetail(this.pk_series);
        } else {
          this.editable = true;
        }
      },
      // 加载系列信息
      loadSeriesDetail(pk_series){
        this.$http({
            url: ylsBase + 'series/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data: pk_series
        }).then(res => {
          if (res.data.success === true) {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'Series',
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
            message: '详情获取失败',
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

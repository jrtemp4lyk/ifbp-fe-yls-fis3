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
      <!-- 厂牌主模板 temp start-->
      <ifbp-template ref='baseTemplateRef'
                    tplId='baseTemplate'
                    :funnode='funNode'
                    :nexuskey='nexusKey'
                    show-type='form'
                    :tplData='tplData'
                    :editable='editable'>
      </ifbp-template>
      <!-- 厂牌主模板 temp end-->
    </div>
  </div>
</template>
<script>
import {ylsBase} from '../../../../common/js/publicData.js'
export default {
  data() {
    let oThis = this;
    let validateBrand = function(rule, value, callback) {
      debugger;
      // 编码非空校验
      if (rule.field == 'brand_code') {
        if (value === '') {
          callback(new Error('编码不能为空! '));
        } else {
          let datam = { 
            code: value
          };
          if (oThis.pk_brand != '') {
            datam.pk = oThis.pk_brand;
          }
          oThis.$http({
            url: ylsBase + 'brand/isUnique',
            hearders: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(datam))
          }).then(res => {
            if (res.data.success === true) {
              if (res.data.data === true) {
                callback();
              } else {
                callback(new Error('编码已存在! '));
              }
            } else {
              callback(new Error(res.data.error.errorMessage));
            }
          }).catch(() => {
            callback(new Error('后台服务有误，请联系管理员！'));
          })
        }
      }
      // 名称非空校验
      if (rule.field == 'brand_name') {
        if (value === '') {
          callback(new Error('名称不能为空! '));
        } else {
          let datam = { 
            name: value
          };
          if (oThis.pk_brand != '') {
            datam.pk = oThis.pk_brand;
          }
          oThis.$http({
            url: ylsBase + 'brand/isUnique',
            hearders: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(datam))
          }).then(res => {
            if (res.data.success === true) {
              if (res.data.data === true) {
                callback();
              } else {
                callback(new Error('名称已存在! '));
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
      // 厂牌主键
      pk_brand: '',
      // 页面标题
      title: '',
      // 报价主模板 baseTemplateRef start
      funNode: 'BT011',
      nexusKey: 'Equip_Brand',
      tplData: {
        rules: {
          brand_code: [{ validator: validateBrand, trigger: 'blur' }],
          brand_name: [{ validator: validateBrand, trigger: 'blur' }]
        }
      },
      editable: true,
      // 报价主模板 baseTemplateRef end
    };
  },
  props: ['brandMsg'],
  created() {
    this.loadData();
  },
  methods: {
     //返回按钮
      goBack() {
        // window.history.back(-1);
        this.$emit('change-brand-detail', 'swithToTable');
      },
      // 厂牌主模板 baseTemplateRef 事件处理 start
      clickSave(){
        debugger;
        let data = this.$refs.baseTemplateRef.comp.Brand;
        let jsonData = JSON.parse(JSON.stringify(data));
        let url;
        this.$refs.baseTemplateRef.validate(valid => {
          if (valid) {
            if (this.brandMsg == 'add') {
            url = ylsBase + 'brand/create';
            } else {
              url = ylsBase + 'brand/update';
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
                  // 'Brand',
                  // JSON.parse(JSON.stringify(originalValue))
                // );
                this.$emit('change-brand-detail', 'swithToTable');
              } else {
                this.$message({
                    message: res.data.error.errorMessage,
                    type: 'error'
                  });
              }
            }).catch(e => {
              this.$message({
              message: '厂牌保存失败！',
              type: 'error'
              });
            });
          } else {
            this.$message('校验未通过! ');
          }
        })
        
      },
      // 厂牌主模板 baseTemplateRef 事件处理 end

      // 加载数据方法
      loadData(){
        // 判断brandMsg
        if (this.brandMsg == 'add'){
          this.title = '厂牌列表 > 厂牌新增';
        } else {
          this.title = '厂牌列表 > 厂牌变更';
          this.pk_brand = this.brandMsg;
        }
        debugger;
        // 详情页面
        if (this.pk_brand && this.pk_brand != '') {
          // 加载厂牌信息
          this.loadBrandDetail(this.pk_brand);
        } else {
          this.editable = true;
        }
      },
      // 加载厂牌信息
      loadBrandDetail(pk_brand){
        this.$http({
            url: ylsBase + 'brand/getById' ,
            headers: {'Content-Type': 'application/json'},  
            method: 'post',
            data: pk_brand
        }).then(res => {
          if (res.data.success === true) {
            let originalValue = res.data.data;
            this.$refs['baseTemplateRef'].setData(
              'Brand',
              JSON.parse(JSON.stringify(originalValue))
            );
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch(e => {
          this.$message({
            message: '厂牌详情获取失败',
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

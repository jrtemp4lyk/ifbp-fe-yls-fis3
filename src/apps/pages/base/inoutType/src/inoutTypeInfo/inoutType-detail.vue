<template>
  <div class='main-panel'>
    <!-- 节点title -->
    <div class='title-container'>
      <h2 class='name'>收支信息设置</h2>
    </div>

    <!-- 主体区域 -->
    <div class='detail-main-container clearfix'>
      <ifbp-panel-group :navbar='true' :base-scroll-top='50' :scroll-dom='scrollDom' :base-nav-bar-top='125'>
        <ifbp-panel id='basePanel' title='基本信息' :icons='baseIcons'>
          <ifbp-template ref='inoutTypeForm'
                        tpl-id='inoutTypeForm-id'
                        :funnode='funNode'
                        :nexuskey='nexusKey'
                        :tpl-data='inoutTypeFormData'
                        show-type='form'
                        :editable='inoutTypeFormEdit'>
          </ifbp-template>
          <div class='form-button-div' v-if='inoutTypeFormEdit'>
            <el-button type='default' class='button-no-radius' @click='inoutTypeCancel'>取消</el-button>
            <el-button type='primary' class='button-no-radius' @click='inoutTypeConfirm'>保存</el-button>
          </div>
        </ifbp-panel>
      </ifbp-panel-group>
    </div>
  </div>
</template>

<script>
import {ylsBase} from '../../../../../common/js/publicData.js'
  export default {
    data() {
      let oThis = this;
      let validateInoutType = function(rule, value, callback) {
        debugger;
        // 编码非空校验
        if (rule.field == 'inout_code') {
          if (value === '') {
            callback(new Error('编码不能为空! '));
          } else {
            let datam = { 
              code: value
            };
            if (oThis.pk_inoutType != '') {
              datam.pk = oThis.pk_inoutType;
            }
            oThis.$http({
              url: ylsBase + 'inoutType/isUnique',
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
              callback(new Error("后台服务有误，请联系管理员！"));
            })
          }
        }
        // 名称非空校验
        if (rule.field == 'inout_name') {
          if (value === '') {
            callback(new Error('名称不能为空! '));
          } else {
            let datam = { 
              name: value
            };
            if (oThis.pk_inoutType != '') {
              datam.pk = oThis.pk_inoutType;
            }
            oThis.$http({
              url: ylsBase + 'inoutType/isUnique',
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
              callback(new Error("后台服务有误，请联系管理员！"));
            })
          }
        }

      };
      return {
        scrollDom: document.getElementsByClassName('view')[0],
        pk_inoutType: '',
        baseIcons: [{
          icon: 'edit',
          click: function() {
            if (oThis.inoutTypeFormEdit === false) {
              oThis.inoutTypeFormEdit = true;
              // 备份数据
              let copyData = oThis.$refs.inoutTypeForm.comp.InoutType;
              oThis.copyForData = JSON.parse(JSON.stringify(copyData));
            } else {
              oThis.inoutTypeCancel();
            }
          }
        }],
        funNode: 'BT002',
        nexusKey: 'Inout_type',
        inoutTypeFormEdit: false,
        inoutTypeFormData: {
          rules: {
            inout_code: [{ validator: validateInoutType, trigger: 'blur' }],
            inout_name: [{ validator: validateInoutType, trigger: 'blur' }]
          }
        }
      };
    },

    mounted() {
      this.request();
    },

    methods: {
      request() {
        // debugger;
        this.pk_inoutType = this.$root.$router.currentRoute.params.id;
        // 如果是编辑请求, 则请求客户基本信息详情
        if (this.pk_inoutType && this.pk_inoutType != '') {
          this.requestInoutTypeInfo();
        } else {
          this.inoutTypeFormEdit = true;
        }
      },

      requestInoutTypeInfo() {
        
        this.$http({
          url: ylsBase + 'inoutType/getById',
          headers: { 'Content-Type': 'application/json' },
          method: 'post',
          data: this.pk_inoutType,
          dataType: 'json'
        }).then(res => {
          if (res.data.success === true) {
            let originalValue = res.data.data;
            this.$refs.inoutTypeForm.setData(
              'InoutType',
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
            message: '基本信息详情获取失败',
            type: 'error'
          });
        });
      },

      inoutTypeCancel() {
        this.inoutTypeFormEdit = false;
        this.$refs.inoutTypeForm.setData('InoutType', this.copyForData);
      },

      inoutTypeConfirm() {
        debugger;
        let url;
        let baseUrl = ylsBase + 'inoutType/';
        let data = this.$refs.inoutTypeForm.comp.InoutType;
        this.$refs.inoutTypeForm.validate(valid => {
          if (valid) {
            if (this.pk_inoutType) {
              url = baseUrl + 'update';
            } else {
              url = baseUrl + 'create';
            }
            this.$http({
              url: url,
              headers: {'Content-Type': 'application/json'},
              method: 'post',
              data: JSON.parse(JSON.stringify(data))
            }).then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                debugger;
                this.originalValue = res.data.data;
                this.$refs.inoutTypeForm.setData(
                  'InoutType',
                  JSON.parse(JSON.stringify(this.originalValue))
                );
                this.inoutTypeFormEdit = false;
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(() => {
              this.$message({
                message: '更新失败',
                type: 'error'
              });
            });
          } else {
            this.$message('校验未通过! ');
          }
        })
      }

    }

  }
</script>

<style>
</style>
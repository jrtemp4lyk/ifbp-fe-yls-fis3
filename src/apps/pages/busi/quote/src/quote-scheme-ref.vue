<template>
  <div class="main-panel">
      <!--节点title-->
    <!-- <div class="title-container">
      <h2 class="name">产品方案选择</h2>
    </div> -->
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
        <ifbp-panel-group :navbar="false" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
            <div class="detail-button-header">
                  <!-- <h3>产品方案选择</h3> -->
                  <el-ref :ref-code='refcode'
                    :field="field"
                    :template-value='refTemplateValue'
                    :is-edit='isEdit'
                    @trigger='onChange'
                    @reset='onReset'
                    style="width:300px"
                    >
                  </el-ref>
            </div>
            <ifbp-panel :id="'productPreviewDetail'+index" :title="item.temp_title" v-for="(item, index) in templist" :icons="plusIcons[item.temp_type+'PlusIcons']" :key="item.temp_id">
                <ifbp-template :ref="item.temp_type+'Ref'"
                        :tplId="item.temp_id"
                        :pkTemp="item.temp_id"
                        :tplData="tplData[item.temp_type+'Data']"
                        :tplResetFun="function($node){tplResetFun($node, item.temp_type)}"
                        @form-confirm-click="formConfirm(item.temp_type)"
                        @form-cancel-click="formCancel(item.temp_type)"
                        @edit-table-click="editTableRow(item.temp_type)"
                        @delete-table-click="deleteTableRow(item.temp_type)"
                        :editable='editable'
                        >
                </ifbp-template>
            </ifbp-panel>
        </ifbp-panel-group>
    </div>
  </div>
</template>
<script>
import {ylsBusi} from '../../../../common/js/publicData.js'
export default {
      data() {
        let oThis = this;
        return {
          scrollDom: document.getElementsByClassName('view')[0],
          refcode: "bdcurrType_ref",
          field: "pk_quote_scheme",
          isEdit: true,
          refTemplateValue: {},
          templist: [], // 存模板数据
          editable:true,
          tplData:{
            baseData:{},
            loanPlanData:{},
            rulePlanData:{},
            inoutPlanData:{},
          },
          plusIcons: {
            basePlusIcons: [
              {
                icon: 'edit',
                click:function() {
                  debugger;
                  oThis.$refs.baseRef;
                  oThis.editable = !oThis.editable;
                  oThis.data = JSON.parse(JSON.stringify(oThis.$refs.baseRef.getData('QuoteCalculator')));
                }
              }
            ],
            loanPlanPlusIcons: [
              {
                icon: 'plus',
                click:function() {

                }
              }
            ],
            rulePlanPlusIcons: [
              {
                icon: 'plus',
                click:function() {

                }
              }
            ],
            inoutPlanPlusIcons: [
              {
                icon: 'plus',
                click:function() {

                }
              }
            ],

          }
        };
      },
      methods: {
        //参照更改事件
        onChange(type,data){
          // let pk_quote_scheme = data.value[0].id;
          //测试使用
           let pk_quote_scheme ='OID10000001hovd';
           debugger;
          //请求方案信息
          this.$http({
            url: ylsBusi + "quote/scheme/getById",
            headers: {'Content-Type': 'application/json'},
            method: "post",
            data: pk_quote_scheme,
          }).then(res => {
            if (res.data.success === true) {
              debugger;
              var originalValue = res.data.data;
              if(Object.prototype.toString.call(originalValue.templist) === '[object Array]' && originalValue.templist.length > 0) {
                this.templist = JSON.parse(JSON.stringify(originalValue.templist));
              }
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          }).catch(e => {
            this.$message({
              message: "报价方案加载失败",
              type: "error"
            });
          });
        },
        //参照重置事件
        onReset(){
          debugger;
          this.templist =[];
          this.$message({
              message: "清空",
              type: "error"
            });
        },
        //按钮注册
        tplResetFun(temp_type){

        },
        //表单确认
        formConfirm(temp_type){

        },
        //表单取消
        formCancel(temp_type){

        },
        //编辑行
        editTableRow(temp_type){

        },
        //删除行
        deleteTableRow(temp_type){

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

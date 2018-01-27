<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">币种转换信息</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125"> 
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack" >返回</el-button>
        </div>
        <!-- 币种转换主模板 temp start-->
        <ifbp-panel id="basePanel" title="币种转换信息" :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="infoFunNode"
                    :nexuskey="infoNexusKey"
                    show-type="form"
                    :tplData="tplData"
                    :editable="editable">
          </ifbp-template>
          <div class="form-button-div" v-if="editable">
            <el-button type="default" class="button-no-radius" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="clickSave">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 币种转换主模板 temp end-->

        <!-- 汇率 temp start-->
        <ifbp-panel id="currRatePanel" title="汇率" :icons="currRatePlusIcons" v-show="true">
          <ifbp-template ref="currRateRef"
                        tplId="currRateTemplate"
                        :funnode="rateFunNode"
                        :nexuskey="rateNexusKey"
                        :tplData="currRateData"
                        :tplResetFun="currRateResetFun"
                        @form-confirm-click="currRateFormConfirm"
                        @form-cancel-click="currRateFormCancel"
                        @edit-table-click="currRateEditTableRow"
                        @delete-table-click="currRateDeleteTableRow"
                        show-type="table-form"
                        >
          </ifbp-template>
          <!--分页组件-->
          <el-pagination
            :current-page='currentPage'
            :page-sizes='pageSizes'
            :page-size='pageSize'
            layout='total, sizes, prev, pager, next, jumper'
            :total='totalElements'
            @size-change='handleSizeChange'
            @current-change='handleCurrentChange'
            >
          </el-pagination>
        </ifbp-panel>
        <!-- 汇率 temp end-->
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
import { pagination, ylsBase } from '../../../../common/js/publicData.js'
export default {
  mixins: [ pagination('loadCurrRate') ],//分页方法引入
  data() {
    let oThis = this;
    return {
      //固定写法
      scrollDom: document.getElementsByClassName('view')[0],
      //币种转换主键
      pk_currInfo:'',
      //删除对话框是否展示
      delDialogVisible:false,
      //删除标识，区分子表
      delType:'',
      //删除实体主键
      delId:'',
      // 币种转换主模板 baseTemplateRef start
      infoFunNode: 'BT001',
      infoNexusKey: 'Curr_Info',
      tplData:{},
      //是否编辑态
      editable:false,
      baseIcons: [
        {
          icon: 'edit',
          click: function() {
            if (oThis.editable === false) {
              oThis.editable = true;
              // 备份数据
              let copyData = oThis.$refs.baseTemplateRef.comp.CurrInfo;
              oThis.copyForData = JSON.parse(JSON.stringify(copyData));
            } else {
              oThis.clickCancel();
            }
          },
        }
      ],
      // 币种转换主模板 baseTemplateRef end

      // 汇率 currRateRef start
      rateFunNode: 'BT001',
      rateNexusKey: 'Curr_Rate',
      currRateData:{},
      currRateResetFun($node) {
        let $table = $node.find('el-table');
        $table.attr(':show-header','true');
        let operateArr = [
          {
            title: '编辑',
            icon: 'edit',
          },
          {
            title: '删除',
            icon: 'delete',
          }
        ];
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      //汇率添加
      currRatePlusIcons: [
        {
          icon: 'plus',
          click () {
             // 关闭table中的编辑区
            if (oThis.pk_currInfo != null && oThis.pk_currInfo != '') { 
              oThis.$refs.currRateRef.getTableComp().closeExpandRow();
              // 重置新增数据
              oThis.$refs.currRateRef.resetFormData();
              // 显示新增区域
              oThis.$refs.currRateRef.comp.formShow = true;
            } else {
              oThis.$message({
                message: '请先保存主表信息!',
                type: 'error'
              });
            }
          },
        }
      ],
      // 汇率 currRateRef end
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //返回按钮
    goBack(){
      location.hash = '/currInfo/list';
    },
    // 币种转换主模板 baseTemplateRef 事件处理 start
    clickCancel(){
      this.editable = false;
      this.$refs.baseTemplateRef.setData('CurrInfo', this.copyForData);
    },
    clickSave(){
      let data = this.$refs.baseTemplateRef.comp.CurrInfo;
      this.$http({
          url: ylsBase+'currInfo/save',
          headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data: data,
      }).then(res => {
        if (res.data.success === true) {
          this.pk_currInfo = res.data.data.pk_curr_info;
          location.hash = '/currInfo/detail/' + this.pk_currInfo;
          this.editable = false;
          let originalValue = res.data.data;
          this.$refs["baseTemplateRef"].setData(
            'CurrInfo',
            originalValue
          );
          //加载租金计划表
          this.loadCurrRate();
        } else {
          this.$message({
            message: res.data.error.errorMessage,
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message: '主表保存失败！',
          type: 'error'
        });
      });
    },
    // 币种转换主模板 baseTemplateRef 事件处理 end

    // 汇率 currRateRef 事件处理 start
    currRateFormConfirm(){
      if( this.pk_currInfo != null && this.pk_currInfo != '' ){
        let data = this.$refs.currRateRef.comp.CurrRate;
        let jsonData = JSON.parse(JSON.stringify(data));
        jsonData.fk_currinfo = this.pk_currInfo;
        this.$http({
          url: ylsBase+'currRate/save',
          headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data:jsonData
        }).then(res => {
          if (res.data.success === true) {
                this.$message({
                  message: '保存成功！',
                  type: 'success'
                });
                this.$refs.currRateRef.comp.formShow = false;
                this.loadCurrRate();
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
        }).catch(e => {
          this.$message({
            message: '汇率保存失败！',
            type: 'error'
          });
        });
      }else{
        this.$message({
                message: '请先保存主表信息!',
                type: 'error'
              });
      }
    },
    currRateFormCancel(type){
      this.$refs.currRateRef.getTableComp().closeExpandRow();
      if (type === 'form') {
        this.$refs.currRateRef.comp.formShow = false;
      } else {
        this.$refs.currRateRef.getTableComp().closeExpandRow();
        let currRateTable = this.$refs.currRateRef.getData('CurrRate_t');
        currRateTable[this.baseEditIndex] = this.baseData;
        this.$refs.currRateRef.setData('CurrRate_t', currRateTable);
      }
    },
    currRateEditTableRow(scope){
      this.$refs.currRateRef.getTableComp().expandRow(scope.row);
      this.$refs.currRateRef.comp.formShow = false;
      this.$refs.currRateRef.setData('CurrRate',scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;

    },
    currRateDeleteTableRow(scope){
      this.delType = 'currRate';
      this.delDialogVisible = true;
      this.delId = scope.row.pk_curr_rate;
    },
    // 汇率 currRateRef 事件处理 end

    //加载数据方法
    loadData(){
      this.pk_currInfo = this.$root.$router.currentRoute.params.id;
      //router name
      //this.$root.$router.currentRoute.name;
      //详情页面
      if(this.pk_currInfo && this.pk_currInfo != ''){
        //加载币种转换信息
        this.loadCurrInfo(this.pk_currInfo);
        //加载投放信息
        this.loadCurrRate();
      }else{
        this.editable = true;
      }
    },
    //加载币种转换信息
    loadCurrInfo(pk_currInfo){
      this.$http({
          url: ylsBase+'currInfo/getById' ,
          headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data:pk_currInfo
      }).then(res => {
        if (res.data.success === true) {
          let originalValue = res.data.data;
          this.$refs['baseTemplateRef'].setData(
            'CurrInfo',
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
          message: '币种转换详情获取失败',
          type: 'error',
        });
      });
    },
    //加载投放信息
    loadCurrRate(){
      let data = {
        'orderList': [
          {
            'direction': 'desc',
            'property': 'ts'
          }
        ],
        'pageNum': this.currentPage - 1,
        'pageSize': this.pageSize,
        'searchParams': {
          'searchMap': {
            custCondList: [{
              'key': 'fk_currinfo',
              'oper': '=',
              'value': this.pk_currInfo
            }]
          }
        }
      };
      this.$http({
          url: ylsBase+'currRate/page',
          headers: {'Content-Type': 'application/json'},  
          method: 'post',
          data: data
      }).then(res => {
        if (res.data.success === true) {
          let originalValue = res.data.data.content;
          this.$refs['currRateRef'].setData(
            'CurrRate_t',
            JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements;
        } else {
          this.$message({
            message: res.data.error.errorMessage,
            type: 'error'
          })
        }
      }).catch(e => {
        this.$message({
          message:' 汇率获取失败',
          type: 'error',
        });
      });
    },

      //删除确定按钮
    deleteConfirmClick() {
      let requestUrl = '';
      if(this.delType == 'currRate') {
        requestUrl = ylsBase+'currRate/deleteById';
      }
      if(requestUrl != ''){
        this.$http({
          url: requestUrl,
          headers: { 'Content-Type': 'application/json' },
          method:'post',
          dataType: 'json',
          data: this.delId
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.delDialogVisible = false;
            //刷新列表
            if(this.delType == 'currRate'){
              this.loadCurrRate();
            }
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error',
            });
          }
        }).catch((e) => {
          this.$message({
            message: '删除失败',
            type: 'error',
          });
        });
      }
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

<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">利率</h2>
    </div>
    <!-- 主体区域 -->
    <div class="detail-main-container clearfix">
      <ifbp-panel-group :navbar="true" :base-scroll-top="50" :scroll-dom="scrollDom" :base-nav-bar-top="125">
        <div class="detail-button-header">
          <el-button class="fr" type="primary" @click="goBack">返回</el-button>
        </div>
        <!-- 利率主模板 temp start-->
        <ifbp-panel id='basePanel' title='利率信息' :icons="baseIcons">
          <ifbp-template ref="baseTemplateRef"
                    tplId="baseTemplate"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    show-type="form"
                    
                    :tplResetFun='resetFunction'
                    :methods='mainMethod'
                    :tplData="interestRateData"
                    :editable="interestRateEdit">
          </ifbp-template>
          <div class="form-button-div" v-if="interestRateEdit">
            <el-button type="default" class="button-no-radius" @click="interestRateClickCancel">取消</el-button>
            <el-button type="primary" class="button-no-radius" @click="interestRateSaveConfirm">保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 利率主模板 temp end-->


        <!-- 利率详情列表 temp start-->
        <ifbp-panel id='detailList' title='利率详情' :icons="detailIcons">
          <ifbp-template ref="detailTable"
                        tplId="detailTable-template"
                        :funnode="detailFunnode"
                        :nexuskey="detailNexuskey"
                        :tplData="detailTableData"
                        :tplResetFun="templateTableFormResetFun"
                        @after-create="getTotalSelections"
                        @form-confirm-click="detailFormConfirm"
                        @form-cancel-click="detailFormCancel"
                        @edit-table-click="detailEditTableRow"
                        @delete-table-click="detailDeleteTableRow"
                        show-type="table-form"
                        >
          </ifbp-template>
          <!--分页组件-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
          </el-pagination>
        </ifbp-panel>
        <!-- 利率详情列表 temp end-->
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
import {pagination,ylsBase} from '../../../../common/js/publicData.js'

export default {
  mixins: [pagination('loadDetail')],//分页方法引入
  data() {
    let oThis = this;
    return {
      //固定写法
      scrollDom: document.getElementsByClassName('view')[0],

      // 利率主模板 baseTemplateRef start
      funnode:'BT010',
      nexuskey:'INTEREST-RATE',
      interestRateData: {
        rules: {}
      },
      mainMethod: {
        selectionChange(val) {
          debugger;
          if (oThis.copyForRate !== undefined) {
            if (val === oThis.copyForRate.interrate_type) {
              oThis.selectedValue = val;
              // 更新子表的档次枚举项
              oThis.refreshSelections();
              oThis.$refs.detailTable.setTableData(oThis.copyForItem);
              oThis.ifDeleteItems = false;
            } else {
              oThis.$confirm('修改利率种类将在保存时清空子表, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                oThis.selectedValue = val;
                // 更新子表的档次枚举项
                oThis.refreshSelections();
                // 清空子表
                oThis.$refs.detailTable.setTableData();
                oThis.ifDeleteItems = true;
              }).catch(() => {
                oThis.$refs.baseTemplateRef.getFormData().interrate_type = oThis.copyForRate.interrate_type;
              });
            }
          } else {
            oThis.selectedValue = val;
            // 更新子表的档次枚举项
            oThis.refreshSelections();
          }
        }
      },
      totalSelections: '',
      selectedValue: '',
      ifDeleteItems: false,
      interestRateEdit: false,
      pk_interest_rate : '',
      baseIcons: [
        {
          icon: 'edit',
          click: function() {
            if (oThis.interestRateEdit === false) {
              oThis.interestRateEdit = true;
              // 备份数据
              let copyRate = oThis.$refs.baseTemplateRef.getFormData();
              oThis.copyForRate = JSON.parse(JSON.stringify(copyRate));
            } else {
              oThis.interestRateClickCancel();
            }
          }
        }
      ],
      resetFunction: function($node) {
        let $select = $node.find('el-select');
        $select.attr('v-on:change', 'selectionChange');
      },
      // 利率主模板 baseTemplateRef end

      // 利率详情 detailRef start
      //模版主键
      detailFunnode:'BT010',
      detailNexuskey:'INTEREST-RATE-ITEM',
      detailTableData: {
        rules: {}
      },
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      pk_interest_rate_item:'',
      //利率详情
      detailIcons: [
        {
          icon: 'plus',
          click() {
            if (oThis.pk_interest_rate == null) {
              oThis.$message({
                message: '请先保存利率信息',
                type: 'error'
              });
              return;
            }
            if (oThis.interestRateEdit === true) {
              oThis.$message({
                message: '利率信息尚处于编辑状态, 不可新增详情',
                type: 'error'
              });
              return;
            }

            // 关闭table中的编辑区
            oThis.$refs.detailTable.getTableComp().closeExpandRow();
            // 重置新增数据
            oThis.$refs.detailTable.resetFormData();
            // 显示新增区域
            oThis.$refs.detailTable.comp.formShow = true;
          }
        }
      ],
      //操作按钮
      templateTableFormResetFun: function($node) {
        //获取table,此id为ui模板上面的表格Id
        let $table = $node.find('el-table');
        $table.attr(':show-header','true');
        //定义操作
        let operateArr = [
          {
            icon: 'edit',
            title:'编辑'
          },
          {
            title:'删除',
            icon:'delete'
          }
        ];
        //获取操作按钮html片段
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
      // 利率详情 detailRef end
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    //返回按钮
    goBack(){
      location.hash = '/interestRate';
    },
    // 获得子表档次的所有枚举项
    getTotalSelections() {
      this.totalSelections = [].concat(this.$refs.detailTable.getData('interrate_classvar'));
      debugger;
    },
    // 更新子表档次枚举项
    refreshSelections() {
      debugger;
      let levelSelectionList = new Array();
      if (this.selectedValue === 'SHIBOR') {
        levelSelectionList.push(this.totalSelections[0]);
        levelSelectionList.push(this.totalSelections[1]);
        levelSelectionList.push(this.totalSelections[2]);
        levelSelectionList.push(this.totalSelections[3]);
        levelSelectionList.push(this.totalSelections[5]);
        levelSelectionList.push(this.totalSelections[8]);
        levelSelectionList.push(this.totalSelections[11]);
        levelSelectionList.push(this.totalSelections[14]);
      } else if (this.selectedValue === 'LIBOR') {
        for (let i = 0; i < 15; i++) {
          levelSelectionList.push(this.totalSelections[i]);
        }
      } else if (this.selectedValue === 'PBCDR') {
        for (let i = 15; i < 22; i++) {
          levelSelectionList.push(this.totalSelections[i]);
        }
      } else if (this.selectedValue === 'PBCCR') {
        for (let i = 22; i < 27; i++) {
          levelSelectionList.push(this.totalSelections[i]);
        }
      }
      console.log('lyktest');
      console.log(levelSelectionList);
      this.$refs.detailTable.setData('interrate_classvar',levelSelectionList);
    },
    // 利率主模板 baseTemplateRef 事件处理 start
    interestRateClickCancel() {
      this.interestRateEdit = false;
      this.$refs.baseTemplateRef.setFormData(this.copyForRate);
      this.$refs.detailTable.setTableData(this.copyForItem);
    },
    interestRateSaveConfirm() {
      let data = this.$refs.baseTemplateRef.getFormData();
      this.$http({
        url: ylsBase + 'interestRate/updateOrCreate',
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        data: JSON.parse(JSON.stringify(data))   
      }).then(res => {
        if (res.data.success === true) {
          this.$message({
            message: '更新主表成功',
            type: 'success'
          });
          let originalValue = res.data.data;
          this.pk_interest_rate = originalValue.pk_interest_rate;
          location.hash = '/interestRate/detail/' + this.pk_interest_rate;
          this.interestRateEdit = false;
          this.$refs['baseTemplateRef'].setFormData(
            JSON.parse(JSON.stringify(originalValue))
          );
          // 判断是否清空子表
          debugger;
          if (this.ifDeleteItems === true) {
            this.$http({
              url: ylsBase + 'interestRateItem/deleteBatch',
              headers: { 'Content-Type': 'application/json' },
              method: 'post',
              data: this.copyForItem
            }).then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '清空子表成功',
                  type: 'success'
                });
                this.loadDetail();
              } else {
                this.$message({
                  message: res.data.error.errorMessage,
                  type: 'error'
                });
              }
            }).catch(() => {
              this.$message({
                message: '清空失败',
                type: 'error'
              });
            })
          } else {
            this.loadDetail();
          }
        } else {
          this.$message({
            message: res.data.error.errorMessage,
            type: 'error'
          });
        }
      }).catch(() => {
        this.$message({
          message: '保存失败',
          type: 'error'
        });
      });
      
    },
    //加载利率信息
    loadInterestRateInfo() {
      this.$http({
        url: ylsBase + 'interestRate/getById',
        headers: {'Content-Type': 'application/json'},  
        method: 'post',
        data: this.pk_interest_rate
      }).then(res => {
        if (res.data.success === true) {
          let originalValue = res.data.data;
          this.$refs['baseTemplateRef'].setFormData(
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
          message: '利率信息获取失败',
          type: 'error'
        });
      });
    },
    // 利率主模板 baseTemplateRef 事件处理 end

    // 利率详情 detailRef 事件处理 start
    //删除操作
    detailDeleteTableRow: function(scope) {
      this.delDialogVisible = true;
      this.pk_interest_rate_item = scope.row.pk_interest_rate_item;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBase + 'interestRateItem/deleteById',
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        dataType: 'json',
        data: this.pk_interest_rate_item
      }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialogVisible = false;
            this.loadDetail();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        }).catch((e) => {
          this.$message({
            message: '信息删除失败！',
            type: 'error'
          });
        });
    },
    //后台请求
    loadDetail() {
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
              custCondList: [
                {'key':'fk_interest_rate',
                'oper':'=',
                'value':this.pk_interest_rate
                }
              ]
            }
          }
      };
      this.$http({
        url: ylsBase + 'interestRateItem/page',
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        data: data,
        dataType: 'json'
      }).then(res => {
        if (res.data.success === true) {
          //InterestRateItemEntity_t UI模板表格名称
          let originalValue = res.data.data.content;
          this.$refs['detailTable'].setTableData(
            JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          // 备份数据
          let copyItem = this.$refs.detailTable.getTableData();
          this.copyForItem = JSON.parse(JSON.stringify(copyItem));
        } else {
          this.$message({
            message: res.data.error.errorMessage,
            type: 'error'
          });
        }
      }).catch((e) => {
        this.$message({
          message: '信息获取失败',
          type: 'error'
        });
      });
    },
    //利率详情信息添加确认
    detailFormConfirm() {
      if(this.pk_interest_rate != null){
        let data = this.$refs.detailTable.getFormData();
        data.fk_interest_rate = this.pk_interest_rate;
        this.$http({
          url: ylsBase + 'interestRateItem/updateOrCreate',
          headers: {'Content-Type': 'application/json'},
          method: 'post',
          data: JSON.parse(JSON.stringify(data))   
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.$refs.detailTable.comp.formShow = false;
            this.loadDetail();
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
      }
    },
    detailFormCancel(type){
      if(type === 'form'){
        this.$refs['detailTable'].comp.formShow = false;
      } else {
        this.$refs['detailTable'].getTableComp().closeExpandRow();
        let tmpTable = this.$refs.detailTable.getTableData();
        tmpTable[this.baseEditIndex] = this.baseData;
        this.$refs.detailTable.setTableData(tmpTable);
      }
    },
    detailEditTableRow(scope) {
      this.$refs.detailTable.getTableComp().expandRow(scope.row);
      this.$refs.detailTable.comp.formShow = false;
      this.$refs.detailTable.setFormData(scope.row);

      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    // 利率详情 detailRef 事件处理 end

    //加载数据
    loadData() {
      this.pk_interest_rate = this.$root.$router.currentRoute.params.id;
      if(this.pk_interest_rate && this.pk_interest_rate != ''){
        //加载利率信息
        this.loadInterestRateInfo();
        //加载利率详情列表
        this.loadDetail();
      } else{
          this.interestRateEdit = true;
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

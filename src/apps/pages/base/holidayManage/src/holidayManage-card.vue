<template>
  <div class='main-panel'>
    <!--节点title-->
    <div class='title-container'>
      <h2 class='name'>节假日管理</h2>
    </div>

    <!-- 主体区域 -->
    <div class='detail-main-container clearfix'>
      <ifbp-panel-group :navbar='true' :base-scroll-top='50' :scroll-dom='scrollDom' :base-nav-bar-top='125'>
        <div class='detail-button-header'>
          <el-button class='fr' type='primary' @click='goBack'>返回</el-button>
        </div>
        <!-- 假日类别主模板 temp start-->
        <ifbp-panel id='basePanel' title='假日类别信息' :icons='baseIcons'>
          <ifbp-template ref='baseTemplateRef'
                    tplId='baseTemplate'
                    :funnode='categoryNode'
                    :nexuskey='categoryKey'
                    show-type='form'
                    :tplData='holidayCategoryData'
                    :editable='holidayCategoryEdit'>
          </ifbp-template>
          <div class='form-button-div' v-if='holidayCategoryEdit'>
            <el-button type='default' class='button-no-radius' @click='holidayCategoryClickCancel'>取消</el-button>
            <el-button type='primary' class='button-no-radius' @click='holidayCategorySaveConfirm'>保存</el-button>
          </div>
        </ifbp-panel>
        <!-- 假日类别主模板 temp end-->


        <!-- 详情列表 temp start-->
        <ifbp-panel id='detailList' title='详情' :icons='detailIcons'>
          <ifbp-template ref='detailTable'
                        tplId='detailTable-template'
                        :funnode='itemNode'
                        :nexuskey='itemKey'
                        :tplData='detailTableData'
                        :tplResetFun='templateTableFormResetFun'
                        
                        @form-confirm-click='detailFormConfirm'
                        @form-cancel-click='detailFormCancel'
                        @edit-table-click='detailEditTableRow'
                        @delete-table-click='detailDeleteTableRow'
                        show-type='table-form'
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
        <!-- 详情列表 temp end-->
      </ifbp-panel-group>
    </div>

    <!--删除确认Dialog-->
    <el-dialog
      title='提示'
      v-model='delDialogVisible'
      @update:visible='val => delDialogVisible = val'
      :modal='true'
      size='tiny'>
      <span>确认删除该数据？</span>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='delDialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='deleteConfirmClick'>确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { pagination, ylsBase } from '../../../../common/js/publicData.js'

export default {
  mixins: [ pagination() ],//分页方法引入
  data() {
    let oThis = this;
    let validateCategory = function(rule, value, callback) {
      // 编码非空校验
      if (rule.field == 'code') {
        if (value === '') {
          callback(new Error('编码不能为空! '));
        } else {
          let datam = { 
            code: value
           };
           if (oThis.pk_holiday_category != '') {
             datam.pk = oThis.pk_holiday_category;
           }
          oThis.$http({
            url: ylsBase + 'holidayCategory/isUnique',
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
      if (rule.field == 'name') {
        if (value === '') {
          callback(new Error('名称不能为空! '));
        } else {
          let datam = { 
            name: value, 
          };
          if (oThis.pk_holiday_category != '') {
            datam.pk = oThis.pk_holiday_category;
          }
          oThis.$http({
            url: ylsBase + 'holidayCategory/isUnique',
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
    }
    let validateItem = function(rule, value, callback) {
      // 编码非空校验
      if (rule.field == 'code') {
        if (value === '') {
          callback(new Error('编码不能为空! '));
        } else {
          let datam = {
            fk: oThis.pk_holiday_category,
            code: value 
          };
          if (oThis.pk_holiday_item != '') {
            datam.pk = oThis.pk_holiday_item;
          }
          oThis.$http({
            url: ylsBase + 'holidayItem/isUnique',
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
      if (rule.field == 'name') {
        if (value === '') {
          callback(new Error('名称不能为空! '));
        } else {
          let datam = {
            fk: oThis.pk_holiday_category,
            name: value 
          };
          if (oThis.pk_holiday_item != '') {
            datam.pk = oThis.pk_holiday_item;
          }
          oThis.$http({
            url: ylsBase + 'holidayItem/isUnique',
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
    }
    return {
      //固定写法
      scrollDom: document.getElementsByClassName('view')[0],

      // 假日类别主模板 baseTemplateRef start
      categoryNode: 'BT018',
      categoryKey: 'HOLIDAY-CATEGORY',
      holidayCategoryData: {
        rules: {
          code: [{ validator: validateCategory, trigger: 'blur' }],
          name: [{ validator: validateCategory, trigger: 'blur' }]
        }
      },
      holidayCategoryEdit: false,
      pk_holiday_category : '',
      baseIcons: [
        {
          icon: 'edit',
          click: function() {
            if (oThis.holidayCategoryEdit === false) {
              oThis.holidayCategoryEdit = true;
              // 备份数据
              let copyData = oThis.$refs.baseTemplateRef.comp.HolidayCategoryEntity;
              oThis.copyForData = JSON.parse(JSON.stringify(copyData));
            } else {
              oThis.holidayCategoryClickCancel();
            }
          }
        }
      ],
      // 假日类别主模板 baseTemplateRef end

      // 详情 detailRef start
      //模版主键
      itemNode: 'BT018',
      itemKey: 'HOLIDAY-ITEM',
      detailTableData: {
        rules: {
          code: [{ validator: validateItem, trigger: 'blur' }],
          name: [{ validator: validateItem, trigger: 'blur' }]
        }
      },
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      pk_holiday_item:'',
      itemDelId: '',
      //详情
      detailIcons: [
        {
          icon: 'plus',
          click: function() {
            if (oThis.pk_holiday_category != null && oThis.pk_holiday_category != '') { 
              oThis.$refs.detailTable.getTableComp().closeExpandRow();
              // 重置新增数据
              oThis.$refs.detailTable.resetFormData();
              // 显示新增区域
              oThis.$refs.detailTable.comp.formShow = true;
              oThis.pk_holiday_item = "";
            } else {
              oThis.$message({
                message: '请先保存主表信息!',
                type: 'error'
              });
            }
          }
        }
      ],
      //操作按钮
      templateTableFormResetFun: function($node) {
        //获取table,此id为ui模板上面的表格Id
        let $table = $node.find('el-table');
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
      location.hash = '/holidayManage/list';
    },




    // 假日类别模板 baseTemplateRef 事件处理 start
    holidayCategoryClickCancel() {
      this.holidayCategoryEdit = false;
      this.$refs.baseTemplateRef.setData('HolidayCategoryEntity', this.copyForData);
    },
    holidayCategorySaveConfirm() {
      let data = this.$refs.baseTemplateRef.comp.HolidayCategoryEntity;
      this.$refs.baseTemplateRef.validate(valid => {
        if (valid) {
          this.$http({
            url: ylsBase + 'holidayCategory/save',
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            data: JSON.parse(JSON.stringify(data))   
          }).then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.pk_holiday_category = res.data.data.pk_holiday_category;
                location.hash = '/holidayManage/detail/' + this.pk_holiday_category;
                this.holidayCategoryEdit = false;
                let originalValue = res.data.data;
                this.$refs['baseTemplateRef'].setData(
                  'HolidayCategoryEntity',
                  originalValue
                );
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
        } else {
          this.$message('校验未通过! ');
        }
      });
    },
    //加载假日类别信息
    loadHolidayCategoryInfo() {
      this.$http({
        url: ylsBase + 'holidayCategory/getById',
        headers: {'Content-Type': 'application/json'},  
        method: 'post',
        data: this.pk_holiday_category
      }).then(res => {
        if (res.data.success === true) {
          let originalValue = res.data.data;
          this.$refs['baseTemplateRef'].setData(
            'HolidayCategoryEntity',
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
    // 假日类别主模板 baseTemplateRef 事件处理 end

    // 详情 detailRef 事件处理 start
    //删除操作
    detailDeleteTableRow: function(scope) {
      this.delDialogVisible = true;
      this.itemDelId = scope.row.pk_holiday_item;
    },
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBase + 'holidayItem/deleteById',
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        dataType: 'json',
        data: this.itemDelId
      }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialogVisible = false;
            this.request();
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
    request() {
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
              'custCondList': [{
                'key': 'fk_category',
                'oper': '=',
                'value': this.pk_holiday_category
              }]
            }
          }
      };
      this.$http({
        url: ylsBase + 'holidayItem/page',
        headers: {'Content-Type': 'application/json'},
        method: 'post',
        data: data,
        dataType: 'json'
      }).then(res => {
        if (res.data.success === true) {
          //HolidayItemEntity_t UI模板表格名称
          let originalValue = res.data.data.content;
          this.$refs['detailTable'].setData(
            'HolidayItemEntity_t',
            JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
        } else {
          this.$message({
            message: res.data.error.errorMessage,
            type: 'error'
          })
        }
        }).catch((e) => {
          this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
    },
    //详情信息添加确认
    detailFormConfirm: function(type){
      let data = this.$refs.detailTable.comp.HolidayItemEntity;
      data.fk_category = this.pk_holiday_category;
      if(this.pk_holiday_category != null){
        this.$refs.detailTable.validate(valid => {
          if (valid) {
            this.$http({
              url: ylsBase + 'holidayItem/save',
              headers: {'Content-Type': 'application/json'},
              method: 'post',
              data: JSON.parse(JSON.stringify(data))   
            }).then(res => {
              if (res.data.success === true) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                //this.holidayCategoryEdit = false;
                this.$refs.detailTable.comp.formShow = false;
                this.request();
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
        }, type);
      } else {
        this.$message({
          message: '请先保存主表信息',
          type: 'error'
        });
      }
    },
    detailFormCancel: function(type){
      this.$refs.detailTable.getTableComp().closeExpandRow();
      if (type === 'form') {
        this.$refs.detailTable.comp.formShow = false;
      } else {
        this.$refs.detailTable.getTableComp().closeExpandRow();
        let itemTable = this.$refs.detailTable.getData('HolidayItemEntity_t');
        itemTable[this.baseEditIndex] = this.baseData;
        this.$refs.detailTable.setData('HolidayItemEntity_t', itemTable);
      }
    },
    detailEditTableRow: function(scope) {
      this.pk_holiday_item = scope.row.pk_holiday_item;
      this.$refs.detailTable.getTableComp().expandRow(scope.row);
      this.$refs.detailTable.comp.formShow = false;
      this.$refs.detailTable.setData('HolidayItemEntity',scope.row);
      // 备份数据
      this.baseData = JSON.parse(JSON.stringify(scope.row));
      this.baseEditIndex = scope.$index;
    },
    // 利率详情 detailRef 事件处理 end

    //加载数据
    loadData() {
      this.pk_holiday_category = this.$root.$router.currentRoute.params.id;
      if(this.pk_holiday_category && this.pk_holiday_category != ''){
        //加载假日类别信息
        this.loadHolidayCategoryInfo();
        //加载详情列表
        this.request();
      } else{
          this.holidayCategoryEdit = true;
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

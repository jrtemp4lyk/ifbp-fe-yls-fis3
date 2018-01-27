<template>
  <div class='main-panel'>
    <!--按钮区域-->
    <!-- <div class='operator-container'>
    </div> -->
    <!-- 币种列表 -->
    <ifbp-panel id='currTypeList' title='币种档案' :icons='icons'>
      <!--模板组件-->
      <ifbp-template ref='currTypeRef'
                    tpl-id='currType-table-id'
                    :funnode='funnode'
                    :nexuskey='nexuskey'
                    :tpl-data='currTypeTableData'
                    :tpl-reset-fun='currTypeTableResetFun'

                    @form-confirm-click='currTypeConfirm'
                    @form-cancel-click='currTypeCancel'
                    @edit-table-click='tableEditClick'
                    @delete-table-click='tableDeleteClick'
                    show-type='table-form'>
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change='handleSizeChange' @current-change='handleCurrentChange' :current-page='currentPage' :page-sizes='pageSizes'
        :page-size='pageSize' layout='total, sizes, prev, pager, next, jumper' :total='totalElements'>
      </el-pagination>

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
          <el-button type='primary' @click='deleteClick'>确 定</el-button>
        </span>
      </el-dialog>
      
    </ifbp-panel>
  </div>
</template>

<script>
import {pagination, ylsBase} from '../../../../common/js/publicData.js'
  export default {
    mixins: [pagination()],//分页方法引入
    data() {
      let oThis = this;
      let validateCurrType = function(rule, value, callback) {
        if (rule.field == 'code') {
          if (value == '') {
            callback(new Error('编码不能为空! '));
          } else {
            let datam = {
              code: value
            };
            if (oThis.pk_currType != '') {
              datam.pk = oThis.pk_currType;
            }
            oThis.$http({
              url: ylsBase + 'bdcurr/isUnique',
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
      }
      return {
        //模版主键
        funnode:__('solution'),
        nexuskey:__('CURRTYPE'),
        delId: '',
        pk_currType: '',
        delDialogVisible: false,
        currTypeTableData: {
          rules: {
            code: [{ validator: validateCurrType, trigger: 'blur' }]
          }
        },
        baseEditIndex:'',
        icons: [
          {
            icon: 'plus',
            click: function() {
              oThis.pk_currType = '';
              // 关闭table中的编辑区
              oThis.$refs.currTypeRef.getTableComp().closeExpandRow();
              // 重置新增数据
              oThis.$refs.currTypeRef.resetFormData();
              // 显示新增区域
              oThis.$refs.currTypeRef.comp.formShow = true;
              console.log(oThis.pk_currType);
            }
          }
        ],
        //操作按钮
        currTypeTableResetFun: function($node) {
          //获取table,此id为ui模板上面的表格Id
          let $table = $node.find('el-table');
          $table.attr(':show-header','true');
          let operateArr = [
            {
              title: '编辑',
              icon: 'edit'
            },
            {
              title: '删除',
              icon: 'delete'
            }
          ];
          //获取操作按钮html片段
          let operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      }
    },

    created() {
      this.request();
    },
    
    methods: {
      //查看按钮
      tableEditClick(scope) {
        this.pk_currType = scope.row.id;
        this.$refs.currTypeRef.getTableComp().expandRow(scope.row);
        this.$refs.currTypeRef.comp.formShow = false;
        this.$refs.currTypeRef.setData('currtype',scope.row);

        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
      //删除操作
      tableDeleteClick(scope) {
        this.delId = scope.row.id;
        this.delDialogVisible = true;
      },
      //删除确定
      deleteClick() {
        this.$http({
          url: '/yls-base-web/bdcurr/deleteById',
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.delId
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
        }).catch(() => {
          this.$message({
            message: 'Network Error',
            type: 'error'
          });
        });
      },
      //保存确定
      currTypeConfirm: function(type){
        let data = this.$refs.currTypeRef.comp.currtype;
        this.$refs.currTypeRef.validate(valid => {
          if (valid) {
            this.$http({
              url: '/yls-base-web/bdcurr/updateOrCreate',
              headers: {'Content-Type': 'application/json'},
              method: 'post',
              data: JSON.parse(JSON.stringify(data))   
            }).then(res => {
              if (res.data.success == true) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
                this.$refs['currTypeRef'].comp.formShow = false;
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
        }, type)
      },
      //保存取消
      currTypeCancel(type){
        debugger;
        this.$refs.currTypeRef.getTableComp().closeExpandRow();
        if(type === 'form'){
          this.$refs.currTypeRef.comp.formShow = false;
        } else {
          this.$refs.currTypeRef.getTableComp().closeExpandRow();
          let currTypeTable = this.$refs.currTypeRef.getData('currtype_t');
          currTypeTable[this.baseEditIndex] = this.baseData;
          this.$refs.currTypeRef.setData('currtype_t', currTypeTable);
        }
      },
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
            'searchMap': {}
          }
        };
        this.$http({
          url: '/yls-base-web/bdcurr/page',
          headers: {'Content-Type': 'application/json'},
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(res => {
          //currtype_t UI模板表格名称
          if (res.data.success === true) {
            let originalValue = res.data.data.content;
            this.$refs['currTypeRef'].setData(
              'currtype_t',
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
      }
    }
  }
</script>

<style>
.aa{
  width: 100%;
}
</style>
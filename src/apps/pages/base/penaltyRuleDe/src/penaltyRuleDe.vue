<template>
  <div class="main-panel">
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fr">
        <el-input placeholder="编码/名称" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
        <el-button type="text" @click="showSearch">
          高级
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
      </div>
    </div>

    <!--高级搜索区域-->
    <div class="advanced-search-panel" :class="{hide: isHide}">
    </div>

    <!-- 逾期利率列表 -->
    <ifbp-panel id="penaltyRuleDeList" title="逾期利率" :icons="icons">
      <!--模板组件-->
      <ifbp-template ref="penaltyRuleDeRef"
                    tpl-id="penaltyRuleDe-table-id"
                    :funnode="funnode"
                    :nexuskey="nexuskey"
                    :tpl-data="penaltyRuleDeTableData"
                    :tpl-reset-fun="penaltyRuleDeTableResetFun"
                    :methods="tMethods"
                    @form-confirm-click="penaltyRuleDeConfirm"
                    @form-cancel-click="penaltyRuleDeCancel"
                    @edit-table-click="tableEditClick"
                    @delete-table-click="tableDeleteClick"
                    show-type="table-form">
      </ifbp-template>

      <!--分页组件-->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        >
      </el-pagination>

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
          <el-button type="primary" @click="deleteClick">确 定</el-button>
        </span>
      </el-dialog>
      
    

    </ifbp-panel>
  </div>
</template>

<script>
import {pubSizes,pubPageSizes,pubPageMethods,ylsBase} from '../../../../common/js/publicData.js'
import {ylsBusi} from '../../../../common/js/publicData.js'
  export default {
    mixins: [pubPageMethods()],//分页方法引入
    data() {
      let oThis = this;
      return {


        //模版主键
        funnode:'BT009',
        nexuskey:'penalty_rule',
        //当前页
        currentPage:1,
        //每页显示个数选择器的选项设置
        pageSizes:pubPageSizes,
        //每页显示条目个数
        size: pubSizes(),
        //总条目数
        totalSize:0,
        penaltyRuleDeTableData: {
        },
        // 高级搜索
        // 搜索模板
        searchTemplate: {},
        // 条件列表
        conditionList: [],
        // 是否显示已选中标签
        showSelectedTags: true,
        // 当前打开的高级条件编号
        currentConditionCode: '',
        // 当前打开的高级条件内容
        currentCondition: null,
        //高级查询是否展示
        isHide: true,
        //快捷查询输入值
        search_input: '',
        //删除对话框
        delDialogVisible: false,
        //待删除数据id
        pk_prj_rule:'',
        //showDeleteButton: true,
        baseData:'',
        baseEditIndex:'',
        icons: [
          {
            icon: "plus",
            click: function() {
              // 关闭table中的编辑区
              oThis.$refs.penaltyRuleDeRef.getTableComp().closeExpandRow();
              // 重置新增数据
              oThis.$refs.penaltyRuleDeRef.resetFormData();
              // 显示新增区域
              oThis.$refs.penaltyRuleDeRef.comp.formShow = true;
            }
          }
        ],
        // 方法
        tMethods: {
            isActiveClick(val, scope){
              var data = scope.row;
              this.confirmClick(data);
              debugger;
              var penaltyRuleDe  = oThis.$refs.penaltyRuleDeRef.getTableData();
              for(var i =0; i<penaltyRuleDe.length;i++ ){
                var obj= penaltyRuleDe[i];
                if(scope.$index != i && obj.is_active=="0"){
                   obj.is_active ="1";
                } 
              }
            },

            confirmClick(data){
              this.$http({
                url: ylsBusi + "contr/penaltyRuleDe/updateStatus",
                headers: { 'Content-type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: JSON.parse(JSON.stringify(data))  
              }).then(res => {
                if (res.data.success === true) {
                  this.$message({
                    message: '更新状态成功',
                    type: 'success'
                  });
                  this.delDialogVisible = false;
                  this.request(this.currentPage - 1, this.size);
                } else {
                  this.$message({
                    message: '更新状态失败',
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
                
        },
        //操作按钮
        penaltyRuleDeTableResetFun: function($node) {
          //获取table,此id为ui模板上面的表格Id
          let $table = $node.find('el-table');//this.getNodeById($node, "w53nyhnbbdc");
          $table.attr(':show-header','true');
          let operateArr = [
            {
              title: '编辑',
              icon: 'edit'
            },
            {
              title: '删除',
              icon: 'delete'
            },
            
          ];

         

          //获取操作按钮html片段
          let isActiveHtml = '<el-table-column label="是否启用"   width="100" ><template scope="scope">' +
          `<el-tooltip :content="PenaltyRuleDe_t[scope.$index].is_active == 1 ? '点击启用' : '点击禁用'" placement="top">` + 
            '<el-switch v-model="PenaltyRuleDe_t[scope.$index].is_active"  on-color="#13ce66"  off-color="#ff4949" on-value="0" off-value="1"' +
            '@change="function(val){isActiveClick(val, scope);}">' + 
            '</el-switch>' + 
          '</el-tooltip></template></el-table-column>';
          let operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(isActiveHtml);
          $table.append(operateHtml);
          return $node[0].outerHTML;
        }
      }
    },

    created() {
      this.request(this.currentPage - 1, this.size);
    },
    
    methods: {
      // 高级搜索
      showSearch() {
        this.isHide = !this.isHide;
      },
      //快捷搜索
      searchInputEnterClick() {
        this.$message('搜索：'+this.search_input);
      },
      //查看按钮
      tableEditClick(scope) {
        this.$refs.penaltyRuleDeRef.getTableComp().expandRow(scope.row);
        this.$refs.penaltyRuleDeRef.comp.formShow = false;
        this.$refs.penaltyRuleDeRef.setData('PenaltyRuleDe',scope.row);

        // 备份数据
        this.baseData = JSON.parse(JSON.stringify(scope.row));
        this.baseEditIndex = scope.$index;
      },
  
      //删除操作
      tableDeleteClick(scope) {
        this.pk_prj_rule = scope.row.pk_prj_rule;
        this.delDialogVisible = true;
      },

      //更新是否启用状态
   
      //删除确定
      deleteClick() {
        this.$http({
          url: ylsBusi + "contr/penaltyRuleDe/deleteById",
          headers: { 'Content-type': 'application/json' },
          method: 'post',
          dataType: 'json',
          data: this.pk_prj_rule
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.delDialogVisible = false;
            this.request(this.currentPage - 1, this.size);
          } else {
            this.$message({
              message: '删除失败',
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
      penaltyRuleDeConfirm: function(){
        //获取当前数据
        let url="";
        var data = this.$refs.penaltyRuleDeRef.comp.PenaltyRuleDe;
        data.source_bill = this.pk_prjId;
        //是否系统设置此节点新增数据
        data.is_base = "0";
        data.is_active= "1"; //新增的时候不启用
        if(data.pk_prj_rule){
          url = ylsBusi+'contr/penaltyRuleDe/update';
        }else{
         url = ylsBusi+'contr/penaltyRuleDe/create';
        }
        this.$http({
          url: url,
          headers: {'Content-Type': 'application/json'},
          method: "post",
          data: JSON.parse(JSON.stringify(data))   
        }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.$refs['penaltyRuleDeRef'].comp.formShow = false;
            this.request(this.currentPage - 1, this.size);
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        }).catch(() => {
          this.$message({
            message: '更新失败',
            type: 'error'
          });
        });
      },
      //保存取消
      penaltyRuleDeCancel(type){
        if(type === 'form'){
          this.$refs['penaltyRuleDeRef'].comp.formShow = false;
        } else {
          this.$refs['penaltyRuleDeRef'].getTableComp().closeExpandRow();
          let penaltyRuleDeTable = this.$refs.penaltyRuleDeRef.getData('penaltyRuleDe_t');
          penaltyRuleDeTable[this.baseEditIndex] = this.baseData;
          this.$refs.penaltyRuleDeRef.setData('penaltyRuleDe_t', penaltyRuleDeTable);
        }
      },
      request(n, s) {
        let data = {
          "orderList": [
            {
              "direction": "desc",
              "property": "ts"
            }
          ],
          pageNum: n,
          pageSize: s,
          searchParams: {
            searchMap: {
               custCondList : [
                {
                'key': 'is_base',
                'oper': '=',
                'value': '0'
                }
             ]             
            }
          }
        };
         var url;
         url = ylsBusi + "contr/penaltyRuleDe/page";
        this.$http({
          url: url,
          headers: {'Content-Type': 'application/json'},
          method: 'post',
          data: data,
          dataType: 'json'
        }).then(res => {
          //PenaltyRuleDe_t UI模板表格名称
          var originalValue = res.data.data.content;

          this.$refs['penaltyRuleDeRef'].setData(
            'PenaltyRuleDe_t',
            JSON.parse(JSON.stringify(originalValue))
          );
          this.totalSize = res.data.data.totalElements; // 总条数
          this.size = res.data.data.size; // 每页的条数
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
</style>
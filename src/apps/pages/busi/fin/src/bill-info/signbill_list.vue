<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">签发汇票</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class='fl'>
          <el-button type="primary" class="button-no-radius" @click="addSignBillInfo">录入</el-button>
          <el-button type="primary" class="button-no-radius" @click="addInfoByExcel">excel导入</el-button>
          <el-button type="primary" class="button-no-radius" @click="linkInOutPlan">关联付款计划</el-button>
          <el-button type="primary" class="button-no-radius" @click="executeVerification">核销</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="请输入搜索关键字" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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
    <!-- 汇票签发列表 -->
   <div id="signBillList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="signBill_table"
                    tplId="signBill-template"
                    :funnode="funnode"
                    :nexuskey ="nexusKey"
                    :tplData="SignBillListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @search-table-click="tableSearchClick"
                    @edit-table-click="tableExchangeClick"
                    @delete-table-click="tableDeleteClick">
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
      <el-dialog title="提示" v-model="delDialogVisible" @update:visible="val => delDialogVisible = val" :modal="true" size="tiny">
        <span>确认删除数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="delDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
        </span>
       </el-dialog>

       <!--核销确认Dialog-->  
      <el-dialog title="提示" v-model="verificationDialogVisible" @update:visible="val => verificationDialogVisible = val" :modal="true" size="tiny">
        <span>确认核销票据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="verificationDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="verificationConfirmClick">确 定</el-button>
        </span>
       </el-dialog>

        <!--收支计划Dialog-->  
      <el-dialog title="收支计划" v-model="handInOutDialogVisible"
      @update:visible="val => handInOutDialogVisible = val" :modal="true" size="large">
      <ifbp-template ref="InOutDialog"
              tplId="InOutDialogid"
              :funnode="funnodedialog"
              :nexuskey="nexuskeydialog"
              :tplData="InOutDialogListData"
              :tplResetFun="InOutDialogResetFun"
              show-type="table" >
      </ifbp-template>
      <span slot="footer" class="dialog-footer">
            <el-button @click="handInOutDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handInOutDialogConfirm">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {pubSizes,pubPageSizes,pubPageMethods,ylsBusi} from '../../../../../common/js/publicData.js'
export default {
  mixins: [pubPageMethods()],//分页方法引入
  data() {
    return {
      //签发汇票模板
      funnode:"BZ023",
      nexusKey:"SignBill",
      //收支计划模板
      funnodedialog:"BZ023",
      nexuskeydialog:"QuoteCalculator",
      //当前页
      currentPage:1,
      //每页显示个数选择器的选项设置
      pageSizes:pubPageSizes,
      //每页显示条目个数
      size: pubSizes(),
      //总条目数
      totalSize:0,
      SignBillListData: {},
      InOutDialogListData:{},
      // 搜索模板
      searchTemplate: {},
      // 条件列表
      conditionList: [],
      // 是否显示已选中标签
      showSelectedTags: true,
      // 当前打开的高级条件编号
      currentConditionCode: "",
      // 当前打开的高级条件内容
      currentCondition: null,
      //高级查询是否展示
      isHide: true,
      //快捷查询输入值
      search_input: "",
      //新增按钮是否动态
      createType: false,
      //删除对话框
      delDialogVisible: false,
      //收支计划弹出框
      handInOutDialogVisible: false,
      //核销确认弹出框
      verificationDialogVisible:false,
      //待删除数据id
      delId: "",
      tableSelections:"",
      selects:[],
      //showDeleteButton: true,
      //签发汇票操作按钮
      templateTableFormResetFun: function($node) {
        //获取table,此id为ui模板上面的表格Id
       let $table = this.getNodeById($node,'qz4clr679u');
        //定义操作
        var operateArr = [
          {
            icon: "search",
            title: "查看"
          },
          {
            icon: "edit",
            title: "变更"
          },
          {
              title:'删除',
              icon:'delete',
          }
        ];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
       //收支计划操作按钮
      addDialogResetFun:function($node){
          //获取table,此id为ui模板上面的表格Id
         let $table = this.getNodeById($node,'7g1u2z54tiu');
          //定义操作
          var operateArr = [];
          //获取操作按钮html片段
          var operateHtml = this.getTableOperateHtml(operateArr);
          $table.append(operateHtml);
          return $node[0].outerHTML;
      }
    };
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
      this.$message("搜索：" + this.search_input);
    },
    //查看按钮
    tableSearchClick(scope) {
      location.hash = "/signbill/detail/" + scope.row.pk_sign_bill + "/" + "1";
    },
    // 手动录入添加按钮
    addSignBillInfo() {
        location.hash = '/signbill/add';
    },
    //excel导入添加按钮
    addInfoByExcel(){
      alert("待开发");
    },
    //关联计划
    linkPlan() {
        var tableSelections = this.$refs.signBill_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
            this.addInoutPlanInfo(this.currentPage - 1, this.pageSize);
        } else {
            this.$message({
                message: "至少选择一条收支计划",
                type: "error",
            });
        }
    },
    //关联收支计划操作
    linkInOutPlan(){
      this.handInOutDialogVisible = true;
    },
    //核销操作
    executeVerification(){
      let tableSelections = this.$refs.signBill_table.getTableComp().getSelection();
      let ids = [];
      let flag = true;
      if (tableSelections && tableSelections.length > 0) {
        tableSelections.forEach((item, index) => {
          if(item.bill_status == 2){
            this.$message({
              message: "已核销汇票不允许再次核销",
              type: "error", 
             });
             flag = false;
          }
          this.selects[index] = item.pk_sign_bill
      });
      if(flag){
        this.verificationDialogVisible = true;
      }
      } else {
          this.$message({
              message: "至少选择一张汇票",
              type: "error"
          });
        }
    },
    //核销确认
    verificationConfirmClick(){
      this.$http({
        url: ylsBusi+'fin/signBill/updateBillStatus',
        headers: {'Content-Type': 'application/json'},
        method: "post",
        dataType: "json",
        data: this.selects,
      }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "核销成功",
              type: "success"
            });
            this.verificationDialogVisible = false;
            this.request(this.currentPage - 1, this.size);
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        }).catch((e) => {
          this.$message({
            message: "核销失败",
            type: "error"
          });
        });
    },
    //变更按钮
    tableExchangeClick(scope){
       location.hash = "/signbill/detail/" + scope.row.pk_sign_bill + "/" + "2";
    },
    //删除操作
    tableDeleteClick: function(scope) {
      this.delDialogVisible = true;
      this.pk_sign_bill = scope.row.pk_sign_bill;
    }, 
    //删除确定
    deleteConfirmClick() {
      this.$http({
        url: ylsBusi+'fin/signBill/deleteById',
        headers: {'Content-Type': 'application/json'},
        method: "post",
        dataType: "json",
        data: this.pk_sign_bill
      }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.delDialogVisible = false;
            this.request(this.currentPage - 1, this.size);
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        }).catch((e) => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },
    //每页显示条数改变
    handleSizeChange(sizeVal) {
      this.size = window.pageSize = sizeVal;
      var maxPage = Math.ceil(this.totalSize / sizeVal);
      if (maxPage >= this.currentPage) {
        this.request(this.currentPage - 1, this.size);
      }
    },
    //当前页发生改变
    handleCurrentChange(currVal) {
      this.currentPage = currVal;
      this.request(this.currentPage - 1, this.size);
    },
    //后台请求
    request(n, s) {
        let data = {
            "orderList": [
            {
            "direction": "desc",
             "property": "ts"
             }
                ],
                "pageNum": n,
                "pageSize": s,
                "searchParams": {
                "searchMap": {
                    "p_id": this.id
                }
            }
        };
        this.$http({
            url: ylsBusi+'fin/signBill/page',
            headers: {'Content-Type': 'application/json'},
            method: 'post',
            data,
            dataType: 'json',
        }).then(res => {
            //QuoteCalculator_table UI模板表格名称
            var originalValue = res.data.data.content;
            this.$refs['signBill_table'].setData(
                'SignBill_t',
                originalValue
            );
            this.totalSize = res.data.data.totalElements; // 总条数
            this.size = res.data.data.size; // 每页的条数
        }).catch((e) => {
            console.log(e);
            this.$message({
                message: '信息获取失败',
                type: 'error',
            });
        });
    } 
  }
};
</script>
<style>

</style>
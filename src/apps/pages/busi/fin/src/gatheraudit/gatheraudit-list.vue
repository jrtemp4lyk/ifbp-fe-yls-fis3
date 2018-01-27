<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">收款核销</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="autoAdd">自动核销</el-button>
        <el-button type="primary" class="button-no-radius" @click="handAdd">手工核销</el-button>
        <el-button type="primary" class="button-no-radius" @click="cancelAdd">取消关联</el-button>
        <el-button type="primary" class="button-no-radius" @click="cancelCheck">取消核销</el-button>
        <el-button type="primary" class="button-no-radius" @click="sign">暂挂账</el-button>
        <el-button type="primary" class="button-no-radius" @click="cancelSign">取消暂挂账</el-button>
        <el-button type="primary" class="button-no-radius" @click="regionConfirm">待区域确认</el-button>
        <el-button type="primary" class="button-no-radius" @click="submit">提交</el-button>
        <el-button type="primary" class="button-no-radius" @click="check">复核</el-button>
        <el-button type="primary" class="button-no-radius" @click="checkVouch">联查凭证</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="xxxx" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
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
    <!-- 收款核销列表 -->
   <div id="gatherAuditList" class="list-main-container clearfix">
      <!--模板组件-->
     <ifbp-template ref="gatherAudit_table"
                    tplId="gatherAudit-template"
                    :funnode="funnode"
                    :nexuskey ="nexusKey"
                    :tplData="gatherAuditListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @search-table-click="tableSearchClick"
                    @edit-table-click="tableEditClick">
      </ifbp-template>
      <!--分页组件-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
                :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
      </el-pagination>

      <!--自动核销Dialog-->
      <el-dialog
        title="提示"
        v-model="autoAddDialogVisible"
        @update:visible="val => autoAddDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>是否确定自动核销？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="autoAddDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="autoAddConfirm">确 定</el-button>
        </span>
       </el-dialog>

      <!--手工核销Dialog-->  
      <el-dialog title="手工核销" v-model="handAddDialogVisible"
      @update:visible="val => handAddDialogVisible = val" :modal="true" size="large">
      <ifbp-template ref="addDialogRef"
              tplId="addDialogid"
              :funnode="funnodedialog"
              :nexuskey="nexuskeydialog"
              :tplData="addDialogListData"
              :tplResetFun="addDialogResetFun"
              show-type="table" >
      </ifbp-template>
      <span slot="footer" class="dialog-footer">
            <el-button @click="handAddDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handAddDialogConfirm">确 定</el-button>
      </span>
      </el-dialog>
      
      <!--暂挂账确认Dialog-->
      <el-dialog
        title="提示"
        v-model="batchSignDialogVisible"
        @update:visible="val => batchSignDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认挂账所选数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="batchSignDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="batchSignConfirm">确 定</el-button>
        </span>
       </el-dialog>
      
      <!--取消暂挂账确认Dialog-->
      <el-dialog
        title="提示"
        v-model="cancelSignDialogVisible"
        @update:visible="val => cancelSignDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认取消暂挂账？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelSignDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cancelSignConfirm">确 定</el-button>
        </span>
       </el-dialog>
      
      <!--待区域确认Dialog-->
      <el-dialog
        title="提示"
        v-model="regionConfirmDialogVisible"
        @update:visible="val => regionConfirmDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认该笔收款？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="regionConfirmDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="regionConfirmBtn">确 定</el-button>
        </span>
       </el-dialog>
      
      <!--取消核销确认Dialog-->
      <el-dialog
        title="提示"
        v-model="cancelCheckDialogVisible"
        @update:visible="val => cancelCheckDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认取消所选数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelCheckDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="cancelCheckConfirm">确 定</el-button>
        </span>
       </el-dialog>
      
      <!--审核确认Dialog-->
      <el-dialog
        title="提示"
        v-model="checkDialogVisible"
        @update:visible="val => checkDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认审核该条数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="checkDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="checkConfirm">确 定</el-button>
        </span>
       </el-dialog>
      
      <!--提交确认Dialog-->
      <el-dialog
        title="提示"
        v-model="submitDialogVisible"
        @update:visible="val => submitDialogVisible = val"
        :modal="true"
        size="tiny">
        <span>确认提交该条数据？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="submitDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitConfirm">确 定</el-button>
        </span>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import {pagination, ylsBusi} from '../../../../../common/js/publicData.js'
export default {
  mixins: [pagination('request')],//分页方法引入
  data() {
    return {
      funnode:"BT019",
      nexusKey:"gatherAuditMain",
      funnodedialog:"BT019",
      nexuskeydialog:"addDialog",
      
      gatherAuditListData: {},
      addDialogListData:{},
      totalElements:'',
      // 高级搜索
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
      //删除对话框
      delDialogVisible: false,
      // 自动核销Dialog
      autoAddDialogVisible:false,
      // 手工核销Dialog
      handAddDialogVisible:false,
      // 暂挂账Dialog
      batchSignDialogVisible:false,
      // 取消暂挂账Dialog
      cancelSignDialogVisible:false,
      // 待区域确认Dialog
      regionConfirmDialogVisible:false,
      // 取消核销Dialog
      cancelCheckDialogVisible:false,
      // 提交Dialog
      submitDialogVisible:false,
      // 审核Dialog
      checkDialogVisible:false,
      //待删除数据id
      delId: "",
      //showDeleteButton: true,
      //操作按钮
      templateTableFormResetFun: function($node) {
        //获取table,此id为ui模板上面的表格Id
        var $table = $node.find("el-table");
        //定义操作
        var operateArr = [
          {
            icon: "search",
            title: "查看"
          },
          {
              title:'编辑',
              icon:'edit',
          }
        ];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      //操作按钮
      addDialogResetFun:function($node){
          //获取table,此id为ui模板上面的表格Id
          var $table = $node.find("el-table");
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
      location.hash = "/gatheraudit/detail/" + scope.row.pk_gather_account;
    },
    //编辑按钮
    tableEditClick: function(scope) {
        location.hash = "/gatheraudit/detail/" + scope.row.pk_gather_account;
    },
    // 自动核销
    autoAdd() {
      this.autoAddDialogVisible = true;
    },
    //自动核销确定
    autoAddConfirm() {
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/autoAdd',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '自动核销完毕！',
                    type: 'success',
                });
                this.autoAddDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '自动核销失败！',
                type: 'error',
            });
        });
    },
    // 手工核销
    handAdd() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
            this.addInoutPlanInfo(this.currentPage - 1, this.pageSize);
        } else {
            this.$message({
                message: "至少选择一条进行核销！",
                type: "error",
            });
        }
    },
    //点击手工核销按钮查看收支计划
    addInoutPlanInfo(n, s) {
      this.handAddDialogVisible = true;
      var url;
      var baseUrl = "/yls-busi-web";
      url = baseUrl + "/quote/inoutPlan/page";
      var data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: n,
        pageSize: s,
        searchParams: {
          searchMap: {}
        }
      };
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
          //UI模板表格名称
          var originalValue = res.data.data.content;
          this.$refs["addDialogRef"].setData(
            "QuoteInoutPlan_t",
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(e => {
          console.log(e);
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    // 手工核销确定
    handAddDialogConfirm() {
        debugger;
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var subSelections = this.$refs.addDialogRef.getTableComp().getSelection();
        var selIds = [];
        var subIds = [];
        if (subSelections && subSelections.length > 0) {
            subSelections.forEach((item,index) => {
            subIds[index]=item.pk_quote_inout_plan;
            });
            if (tableSelections && tableSelections.length > 0) {
                tableSelections.forEach((item,index) => {
                selIds[index]=item.pk_gather_account;
                });
            }
            var oData = {
                strArray: selIds,
                strArray2: subIds
            };
            this.$http({
                url: '/yls-busi-web/fin/gatheraccount/handAdd',
                headers: { 'Content-Type': 'application/json' },
                method: 'post',
                dataType: 'json',
                data: oData,
            }).then(res => {
                if (res.data.success === true) {
                    this.$message({
                        message: '核销完成！',
                        type: 'success',
                    });
                    this.handAddDialogVisible = false;
                    this.request(this.currentPage - 1, this.size);
                } else {
                    this.$message({
                    message: res.data.msg,
                    type: "error",
                    });
                }
            }).catch((e) => {
                this.$message({
                    message: '核销失败！',
                    type: 'error',
                });
            });
        } else {
            this.$message({
                  message: "未关联收支计划！",
                  type: "error",
            });
        }
    },
    // 暂挂账
    sign() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
            this.batchSignDialogVisible = true;
        } else {
            this.$message({
                message: "至少选择一条进行暂挂账处理！",
                type: "error",
            });
        }
    },
    // 暂挂账确定
    batchSignConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/sign',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '挂账完成！',
                    type: 'success',
                });
                this.batchSignDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '挂账失败！',
                type: 'error',
            });
        });
    },
    // 待区域确认
    regionConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
            this.regionConfirmDialogVisible = true;
        } else {
            this.$message({
                message: "请选择确认信息！",
                type: "error",
            });
        }
    },
    // 待区域确认
    regionConfirmBtn() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/regionConfirm',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '已确认！',
                    type: 'success',
                });
                this.regionConfirmDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '确认失败！',
                type: 'error',
            });
        });
    },
    // 取消暂挂账
    cancelSign() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
            this.cancelSignDialogVisible = true;
        } else {
            this.$message({
                message: "至少选择一条取消！",
                type: "error",
            });
        }
    },
    // 取消暂挂账确定
    cancelSignConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/cancelSign',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '已取消挂账！',
                    type: 'success',
                });
                this.cancelSignDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '取消挂账失败！',
                type: 'error',
            });
        });
    },
    // 取消关联
    cancelAdd() {
        this.cancelCheck();
    },
    // 取消核销
    cancelCheck() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length > 0) {
            this.cancelCheckDialogVisible = true;
        } else {
            this.$message({
                message: "至少选择一条取消！",
                type: "error",
            });
        }
    },
    // 取消核销确定
    cancelCheckConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/cancelCheck',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '已取消！',
                    type: 'success',
                });
                this.cancelCheckDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '取消核销失败！',
                type: 'error',
            });
        });
    },
    // 提交
    submit() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length === 1) {
            this.submitDialogVisible = true;
        } else {
            this.$message({
                message: "请选择一条数据！",
                type: "error",
            });
        }
    },
    // 提交确定
    submitConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/submit',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '已提交！',
                    type: 'success',
                });
                this.submitDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '提交失败！',
                type: 'error',
            });
        });
    },
    // 审核
    check() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length === 1) {
            this.checkDialogVisible = true;
        } else {
            this.$message({
                message: "请选择一条数据！",
                type: "error",
            });
        }
    },
    // 审核确定
    checkConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/check',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.$message({
                    message: '审核通过！',
                    type: 'success',
                });
                this.checkDialogVisible = false;
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '审核失败！',
                type: 'error',
            });
        });
    },
    // 联查凭证
    checkVouch() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        if (tableSelections && tableSelections.length === 1) {
            this.checkVouchConfirm();
        } else {
            this.$message({
                message: "请选择一条数据！",
                type: "error",
            });
        }
    },
    // 联查凭证确定
    checkVouchConfirm() {
        var tableSelections = this.$refs.gatherAudit_table.getTableComp().getSelection();
        var selIds = [];
        if (tableSelections && tableSelections.length > 0) {
            tableSelections.forEach((item,index) => {
            selIds[index]=item.pk_gather_account;
            });
        }
        var oData = {
            strArray: selIds
        }
        this.$http({
            url: '/yls-busi-web/fin/gatheraccount/checkVouch',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            dataType: 'json',
            data: oData,
        }).then(res => {
            if (res.data.success === true) {
                this.request(this.currentPage - 1, this.size);
            } else {
                this.$message({
                message: res.data.msg,
                type: "error",
                });
            }
        }).catch((e) => {
            this.$message({
                message: '暂无凭证！',
                type: 'error',
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
      var url;
      var baseUrl = "/yls-busi-web";
      url = baseUrl + "/fin/gatheraccount/page";
      var data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: n,
        pageSize: s,
        searchParams: {
          searchMap: {}
        }
      };
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
          // UI模板表格名称
          var originalValue = res.data.data.content;
          this.$refs["gatherAudit_table"].setData(
            "GatherAccount_t",
            JSON.parse(JSON.stringify(originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          console.log(res.data.data.size);
          this.size = res.data.data.size; // 每页的条数
        })
        .catch(e => {
          console.log(e);
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    }
  }
};
</script>
<style>

</style>

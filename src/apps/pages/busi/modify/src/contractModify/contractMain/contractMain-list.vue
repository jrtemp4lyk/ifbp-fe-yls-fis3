<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">合同变更</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="add">新增</el-button>
      </div>
      <div class="fl"  style="margin-left: 2px">
        <el-button type="primary" class="button-no-radius" @click="buttonVerification('submit')">提交</el-button>
      </div>
      <div class="fl"  style="margin-left: 2px">
        <el-button type="primary" class="button-no-radius" @click="buttonVerification('check')">审核</el-button>
      </div>
       <div class="fr">
        <ifbp-search :template-code="searchTemplateCode" @search="handleSearch"></ifbp-search>
      </div>
    </div>

     

    <!-- 合同列表 -->
    <div id="contractList" class="list-main-container clearfix">
      <!--模板组件:pkTemp="pk_temp"-->
     <ifbp-template ref="contractinfo_table"
                    tplId="contractinfo-template"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :tplData="contractnfoListData"
                    show-type="table"
                    :tplResetFun="templateTableFormResetFun"
                    @edit-table-click="tableEditClick"
                    @search-table-click="tableSearchClick"
                    @delete-table-click="tableDeleteClick" >
      </ifbp-template>

      <el-dialog title="变更类型选择" :modal="true" v-model="dialogTableVisible">
          <el-form :inline="true"  class="demo-form-inline">
              <el-form-item label="合同参照:" prop="contractRef">
                <el-ref :is-muti-select="true" 
                  :ref-code="refCode" 
                  :template-value="refValue"  
                  :is-edit="true"
                  :field="field" 
                  :query-params="{source_billtype:'CONTRACT_MAKE'}"
                  ></el-ref>
            </el-form-item> 
            <el-form-item>
              <el-checkbox :indeterminate="isIndeterminate" 
                           v-model="checkAll" 
                           @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedTypes" @change="handleCheckedTypesChange">
                    <el-checkbox v-for="typec in typecs" :label="typec.id" :disabled="typec.id === temptype"  :key="typec.id">{{typec.name}}</el-checkbox>
                </el-checkbox-group>
             </el-form-item>
            <el-form-item> 
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveChangeTypeClick">确 定</el-button>
            </el-form-item>
          </el-form>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleSubmit"
        size="tiny" >
        <span :key="spanText">{{ spanText }}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleSubmit = false">取 消</el-button>
            <el-button type="primary" @click="buttonAction">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleCheck"
        size="tiny" > 
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="checkOrUn('check')">审核通过</el-button>
            <el-button type="primary"  @click="checkOrUn('unCheck')">审核不通过</el-button>
            <el-button @click="dialogVisibleCheck = false">取 消</el-button>
        </span>
    </el-dialog>

    <!--分页组件-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes"
        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalElements">
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
            <el-button type="primary" @click="deleteConfirmClick">确 定</el-button>
        </span>
       </el-dialog>
    </div>
  </div>
</template>
<script>
import {  pagination, ylsBusi } from "../../../../../../common/js/publicData.js";
const typeOptions = [
  { name: "合同主信息变更", id: "cont" },
  { name: "租金方案变更", id: "cal" },
  { name: "供应商信息变更", id: "pro" },
  { name: "租赁物信息变更", id: "rentThing" },
  { name: "承租方信息变更", id: "lessee" },
  { name: "担保信息变更", id: "custPledge" },
  { name: "付款条件变更", id: "payCond" },
  { name: "罚息率变更", id: "penaltyRule" }
];
const defaultTypeOptions = ["cont"];
const allTypeOptions = [
  "cont",
  "cal",
  "pro",
  "rentThing",
  "lessee",
  "custPledge",
  "payCond",
  "penaltyRule"
];
export default {
    mixins: [pagination('request')],
  data() {
    return {
      // 查询模板编码
      searchTemplateCode: "contractModify",
      searchTemplateParam:{},
      checkAll: true,
      temptype: "cont",
      checkedTypes: [],
      typecs: typeOptions,
      isIndeterminate: false,
      field: "pk_contract",
      //模版主键
      funnode: "BT022",
      nexusKey: "contractModify",   
      contractnfoListData: {},
      refCode: "contract_ref",
      refValue: {},      
      //删除对话框
      delDialogVisible: false,
      //待删除数据id
      delId: "",
      //showDeleteButton: true,
      dialogTableVisible: false,
      dialogVisibleSubmit: false,
      dialogVisibleCheck: false,
      spanText: "",
      satatus: "",
      mess: "",
      selectIndex:0,

      //操作按钮
      templateTableFormResetFun: function($node) {
        //获取table,此id为ui模板上面的表格Id
        let $table = $node.find("el-table");
        //定义操作
        var operateArr = [
          {
            icon: "search",
            title: "查看"
          },
          {
            icon: "edit",
            title: "修改"
          },
          {
            title: "删除",
            icon: "delete"
          }
        ];
        //获取操作按钮html片段
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      }
    };
  },
  created() {
    this.request();
  },
  methods: {
    // 查询
    handleSearch(searchTemplate){
      this.currentPage = 1;//点查询按钮当前页设为1
      this.searchTemplateParam = searchTemplate;
      this.request();
    },
    handleCheckAllChange(event) {
      this.checkedTypes = event.target.checked ? allTypeOptions : defaultTypeOptions;
      this.isIndeterminate = false;
    },
    handleCheckedTypesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.typecs.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.typecs.length;
    },
    add() {
      this.checkedTypes = allTypeOptions; 
      this.refValue = {} ;
      this.dialogTableVisible = true;
    },
    buttonVerification(statusTemp) {
      this.status = statusTemp;
      if (this.status == "check") {
        this.mess = "审核";
        // this.spanText = "是否确认审核！";
      } else if (this.status == "submit") {
        this.mess = "提交";
        this.spanText = "是否确认提交！";
      }

      var tableSelections = this.$refs["contractinfo_table"].getTableComp().getSelection();
      if (tableSelections.length === 1) {
        if (this.status == "submit") {
          this.dialogVisibleSubmit = true;
        } else {
          this.dialogVisibleCheck = true;
        }
      } else {
        this.$message({
          message: "请选择有且只有一条记录进行" + this.mess + "动作！",
          type: "error"
        });
      }
    },
    checkOrUn(statusTemp) {
         this.status = statusTemp; 
         this.buttonAction();
    },
    buttonAction() {
      this.dialogVisibleCheck = false;
      this.dialogVisibleSubmit = false;
      var tableSelections = this.$refs["contractinfo_table"].getTableComp().getSelection(); 
      this.selectIndex = this.$refs["contractinfo_table"].getData("contract_t").indexOf(tableSelections[0]);

      var jsonData = JSON.parse(JSON.stringify(tableSelections[0]));
      var url;
      if (this.status == "check") {
        url = ylsBusi + "contr/modify/contractinfo/check";
      } else if (this.status == "submit") {
        url = ylsBusi + "contr/modify/contractinfo/submit";
      } else if (this.status == "unCheck") {
        url = ylsBusi + "contr/modify/contractinfo/unCheck";
      }
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: jsonData
      }).then(res => {
          this.originalValue = res.data.data;
          let contdata = this.$refs["contractinfo_table"].getData("contract_t"); 
          contdata.splice(this.selectIndex, 1, this.originalValue);
      }).catch(e => {
          this.$message({
            message: "合同" + this.mess + "失败！",
            type: "error"
          });
        });
    },
    // 选择变更类型
    saveChangeTypeClick() { 
      debugger
      if (this.refValue.pk_contract==undefined || this.refValue.pk_contract =="") {
         this.$message({
            message: "请选择需要变更的合同",
            type: "error"
          }); 
          return;
      }
      this.dialogTableVisible = false;
      location.hash = "/contr/modify/contractinfo/add/" + this.checkedTypes + "/" + this.refValue.pk_contract;
    }, 
    //查看按钮
    tableSearchClick(scope) { 
      location.hash = "/contr/modify/contractinfo/detail/" + scope.row.pk_contract + "/" + scope.row.change_type;
    },
    //修改按钮
    tableEditClick(scope) { 
      location.hash = "/contr/modify/contractinfo/edit/" + scope.row.pk_contract + "/edit/" + scope.row.change_type;
    },
    //删除操作
    tableDeleteClick(scope) {
      this.delId = scope.row.pk_contract;
      this.delDialogVisible = true;
    },
    //删除确定
    deleteConfirmClick() {
      this.delDialogVisible = false;
      this.$http({
        url: ylsBusi + "contr/modify/contractinfo/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.request();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        })
        .catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
    },
    //后台请求
    request() {
      var url = ylsBusi + "contr/modify/contractinfo/page";
      var data = {
        orderList: [
          {
            direction: "desc",
            property: "ts"
          }
        ],
        pageNum: this.currentPage - 1,
        pageSize: this.pageSize,
        searchParams: {
          searchMap: {
            searchMap: {qtAggVO:JSON.stringify(this.searchTemplateParam)}
          }
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
          //QuoteCalculator_table UI模板表格名称
          var originalValue = res.data.data.content;
          this.$refs["contractinfo_table"].setData(
            "contract_t",
            JSON.parse(JSON.stringify(originalValue))
          ); 
          this.totalElements = res.data.data.totalElements;
        })
        .catch(e => {
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

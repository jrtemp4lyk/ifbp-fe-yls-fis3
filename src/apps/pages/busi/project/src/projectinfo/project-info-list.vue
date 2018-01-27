<template>
  <div class="main-panel">
    <!--节点title-->
    <div class="title-container">
      <h2 class="name">项目管理</h2>
    </div>
    <!--按钮区域-->
    <div class="operator-container">
      <div class="fl">
        <el-button type="primary" class="button-no-radius" @click="updataProjectInfo">新增</el-button>
        <el-button class="button-no-radius" @click="multiDeleteDialgShow" v-show="showDeleteButton">删除</el-button>
      </div>
      <div class="fr">
        <el-input placeholder="请选择编码/客户" v-model="search_input" icon="search"  @keyup.enter.native="searchInputEnterClick" :on-icon-click="searchInputEnterClick"></el-input>
        <el-button type="text" @click="showSearch">
          高级
          <i class="el-icon-arrow-down" v-if="this.isHide"></i>
          <i class="el-icon-arrow-up" v-if="!this.isHide"></i>
        </el-button>
      </div>
    </div>

    <!--高级搜索区域-->
    <div class="advanced-search-panel" :class="{hide: isHide}">

    <!-- <el-row type="flex" justify="end">
      <el-col :span="2">
        <el-button @click="search">搜索</el-button>
      </el-col>
    </el-row> -->

    <!-- 已选参数展示 -->
    <div v-if="showSelectedTags" class="options-selected">
      <template v-for="condition in conditionList">
        <el-tag v-if="condition.ctrltype === 'DateComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)"
          :key="condition.fieldcode"
          :closable="true"
          type="gray"
          @close="cancelConditionSelection(condition.optionList)">
          {{formatSelectedDate(condition.optionList.def_min_value, condition.optionList.def_max_value)}}
        </el-tag>
        <el-tag v-if="condition.ctrltype === 'NumberComponent' && (condition.optionList.def_min_value || condition.optionList.def_max_value)"
          :key="condition.fieldcode"
          :closable="true"
          type="gray"
          @close="cancelConditionSelection(condition.optionList)"
        >
          {{formatSelectedNumber(condition.optionList.def_min_value, condition.optionList.def_max_value)}}
        </el-tag>
        <el-tag
          v-for="option in condition.optionList.options"
          :key="option.value"
          v-if="option.selected"
          :closable="true"
          type="gray"
          @close="cancelConditionSelection(condition.optionList)">
          {{option.name}}
        </el-tag>
      </template>
    </div>

    <!-- 搜索参数 -->
    <template>

      <!-- 前三条平铺条件 -->
      <el-row
        :gutter="10"
        v-for="(condition, index) in conditionList"
        :key="condition.fieldcode"
        v-if="index < 3">
        <!-- 条件名 -->
        <el-col :span="2" :sm="3" :xs="3">
          <span class="search-label">{{condition.fieldname}}:</span>
        </el-col>
        <!-- 条件选项 -->
        <el-col class="condition-options" :span="22" :sm="21" :xs="21">

          <!-- 通用选项 -->
          <template v-if="condition.optionList.options.length">
            <span
              v-for="option in condition.optionList.options"
              :key="option.value"
              class="condition-option"
              :class="{selected: option.selected}"
              @click="selectConditionOption(condition.optionList, option, condition.ctrltype)"
            >{{option.name}}</span>
          </template>

          <!-- 数值字段 -->
          <template v-if="condition.ctrltype === 'NumberComponent'">
            <div class="option-num-container">
              <el-input
                v-model="condition.optionList.def_min_value"
                @change="selectConditionOption(condition.optionList, null, condition.ctrltype)"
                size="small"
                placeholder="最小值">
              </el-input>
            </div>
              -
            <div class="option-num-container">
              <el-input
                v-model="condition.optionList.def_max_value"
                @change="selectConditionOption(condition.optionList, null, condition.ctrltype)"
                size="small"
                placeholder="最大值">
              </el-input>
            </div>
          </template>

          <!-- 日期字段 -->
          <template v-else-if="condition.ctrltype === 'DateComponent'">
            <div class="option-date-container">
              <el-date-picker
                v-model="condition.optionList.def_min_value"
                format="yyyy-MM-dd HH:mm:ss"
                @change="selectConditionOption(condition.optionList, null,'DateComponent')"
                type="datetime"
                size="small"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
              -
            <div class="option-date-container">
              <el-date-picker
                v-model="condition.optionList.def_max_value"
                @change="selectConditionOption(condition.optionList, null,'DateComponent')"
                type="datetime"
                size="small"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
          </template>
        </el-col>
      </el-row>

      <!-- 高级条件 -->
      <el-row :gutter="10">
        <el-col :span="2" :sm="3" :xs="3">
          <span class="search-label">高级:</span>
        </el-col>
        <!-- 条件名 -->
        <el-col class="advanced-conditions" :span="18" :sm="13" :xs="13">
          <span v-for="(condition, index) in conditionList"
            v-if="index >= 3"
            class="advanced-condition"
            :class="{current: currentConditionCode === condition.fieldcode}"
            :key="condition.fieldcode"
            @click="setCurrentCondition(condition)">
            {{condition.fieldname}}
            <i class="el-icon-arrow-up" v-if="currentConditionCode === condition.fieldcode"></i>
            <i class="el-icon-arrow-down" v-else></i>
          </span>
        </el-col>

        <!-- 按钮 -->
        <el-col class="advanced-search-btns" :span="4" :sm="8" :xs="8">
          <el-button type="primary" class="button-no-radius">搜索</el-button>
          <el-button class="button-no-radius">清空</el-button>
        </el-col>
      </el-row>
    </template>

    <!-- 当前选中的条件选项 -->
    <div class="current-condition-options" v-if="currentCondition">

      <!-- 通用选项 -->
      <template v-if="currentCondition.optionList.options.length">
        <span
          v-for="option in currentCondition.optionList.options"
          :key="option.value"
          class="condition-option"
          :class="{selected: option.selected}"
          @click="selectConditionOption(currentCondition.optionList, option, currentCondition.ctrltype)"
        >{{option.name}}</span>
      </template>

      <!-- 数值字段 -->
      <template v-if="currentCondition.ctrltype === 'NumberComponent'">
        <div class="option-num-container">
          <el-input
            v-model="currentCondition.optionList.def_min_value"
            @change="selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)"
            size="small"
            placeholder="最小值">
          </el-input>
        </div>
          -
        <div class="option-num-container">
          <el-input
            v-model="currentCondition.optionList.def_max_value"
            @change="selectConditionOption(currentCondition.optionList, null, currentCondition.ctrltype)"
            size="small"
            placeholder="最大值">
          </el-input>
        </div>
      </template>

      <!-- 日期字段 -->
      <template v-else-if="currentCondition.ctrltype === 'DateComponent'">
        <div class="option-date-container">
          <el-date-picker
            v-model="currentCondition.optionList.def_min_value"
            format="yyyy-MM-dd HH:mm:ss"
            @change="selectConditionOption(currentCondition.optionList, null,'DateComponent')"
            type="datetime"
            size="small"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
          -
        <div class="option-date-container">
          <el-date-picker
            v-model="currentCondition.optionList.def_max_value"
            @change="selectConditionOption(currentCondition.optionList, null,'DateComponent')"
            type="datetime"
            size="small"
            placeholder="选择日期时间">
          </el-date-picker>
        </div>
      </template>
    </div>
  </div>

    <!-- 主体区域 -->
    <div class="list-main-container clearfix">
      <!--新模板组件:tplCode="tplCode"-->
      <ifbp-template ref="template-table"
                    tplId="project-table-template"
                    :funnode="funnode"
                    :nexuskey="nexusKey"
                    :tplData="projectTableData"
                    show-type="table"
                    :tplResetFun="projectTableResetFun"
                    @selection-change="handleSelectionChange"
                    @edit-table-click="tableEditClick"
                    @delete-table-click="tableDeleteClick" >
      </ifbp-template>
      <!--分页组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalElements">
      </el-pagination>
    </div>
    
    <!--删除确认Dialog-->
    <el-dialog
      title="提示"
      v-model="delDialogVisible"
      @update:visible="val => delDialogVisible = val"
      :modal="true"
      size="tiny">
      <span>确认删除该数据？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteClick">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      v-model="multiDelDialogVisible"
      @update:visible="val => multiDelDialogVisible = val"
      :modal="true"
      size="tiny">
      <span>确认删除所选数据？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="multiDelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="multiDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    var oThis = this;
    return {
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
      funnode:"BT008",
      nexusKey:"projectinfoUI",
      showDeleteButton: false,
      search_input: "",
      isHide: true,
      totalElements: 0,
      currentPage: 1,
      size: 10,
      delDialogVisible: false,
      multiDelDialogVisible: false,

      projectTableData: {},
      projectTableMethods: {
      
      },
      projectTableResetFun: function($node) {
        var $table = $node.find("el-table");
        var operateArr = [
          {
            title: "编辑",
            icon: "edit"
          },
          {
            title: "删除",
            icon: "delete"
          }
        ];
        var operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },

      // 待删除 begin
      code: "",
      name: "",
      ts: "",
      mobile: "",
      enablestate: "",
      search_options: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "未启用",
          value: 1
        },
        {
          label: "已启用",
          value: 2
        },
        {
          label: "已停用",
          value: 3
        }
      ]
      // 待删除 end
    };
  },
  created() {
    var requestDefer = this.request(this.currentPage - 1, this.size);
    this.initPromise(requestDefer);
  },
  methods: {
    handleSelectionChange: function(selection) {
      if (selection && selection.length > 0) {
        this.showDeleteButton = true;
      } else {
        this.showDeleteButton = false;
      }
    },
    tableEditClick: function(scope) {
      location.hash = "/prj/projectinfo/detial/" + scope.row.pk_project +"/"+scope.row.lease_type;
    },
    tableDeleteClick: function(scope) {
      this.delDialogVisible = true;
      this.delId = scope.row.pk_project;
    },
    initPromise(request) {
      Promise.all([request]).then(() => {
        // this.$refs.cover.remove();
      });
    },
    searchInputEnterClick() {
      alert(this.search_input);
    },
    request(n, s) {
      var url;
      var baseUrl = '/yls-busi-web/';
      url = baseUrl + 'prj/pagelist';
      var data = {
        "orderList": [
          {
            "direction": "desc",
            "property": "pk_project"
          }
        ],
        "pageNum": n,
        "pageSize": s,
        "searchParams": {
          "searchMap": {}
        }
      };
      this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        data: data,
        dataType: "json"
      })
        .then(res => {
          debugger;
          this.originalValue = res.data.data.content;
          this.$refs["template-table"].setData(
            "project_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
          this.totalElements = res.data.data.totalElements; // 总条数
          this.size = res.data.data.size; // 每页的条数
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    handleSizeChange(val) {
      this.size = val;
      var maxPage = parseInt(this.totalElements / val) + 1;
      if (maxPage >= this.currentPage) {
        this.request(this.currentPage - 1, this.size);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.request(this.currentPage - 1, this.size); 
    },
     // 高级搜索
    showSearch() {
      this.isHide = !this.isHide;
      this.searchTemplate = testSearchTemplate;
      this.conditionList = testSearchTemplate.conditionList;
    },
    // 设置选中
    selectConditionOption(optionList, option, ctrltype) {
      // console.log(arguments);
      var optionSelected = false;
      var options = optionList.options;
      if (option && option.selected) {
        optionSelected = true;
      }
      if (ctrltype === 'DateComponent') {
        if (!optionList.def_min_value && !optionList.def_max_value && !option) { // 修复 el-date-picker 置空时引起的bug
          return;
        }
        if (optionList.def_min_value) {
          optionList.def_min_value = this.formatDate(optionList.def_min_value);
        }
        if (optionList.def_max_value) {
          optionList.def_max_value = this.formatDate(optionList.def_max_value);
        }
      }
      for (var i = 0; i < options.length; i++) {
        options[i].selected = false;
      }
      if (option) {
        option.selected = !optionSelected;
        optionList.def_min_value = null;
        optionList.def_max_value = null;
        this.setCurrentCondition();
      }
    },

    // 已选中日期格式整理
    formatSelectedDate(startDay, endDay) {
      var dateString = '';
      // 改到 el-date-picker@change 时修改
      // if (startDay) {
      //   startDay = this.formatDate(startDay);
      // }
      // if (endDay) {
      //   endDay = this.formatDate(endDay);
      // }
      if (startDay && endDay) {
        dateString = startDay + ' 至 ' + endDay;
      } else if (startDay) {
        dateString = startDay + '之后';
      } else {
        dateString = endDay + '之前';
      }
      return dateString;
    },

    // 已选中数值格式整理
    formatSelectedNumber(min, max) {
      if (min && max) {
        return min + '-' + max + '万元';
      } else if (min) {
        return min + '万元及以上';
      } else {
        return '低于' + max + '万元';
      }
    },

    // 整理date格式
    formatDate(time) {
      var date = new Date(time);
      return date.getFullYear() + '-' + ((date.getMonth()) >= 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)) + '-' + (date.getDate() > 9 ? date.getDate() : ('0' + date.getDate())) + ' ' + (date.getHours() > 9 ? date.getHours() : ('0' + date.getHours())) + ':' + (date.getMinutes() > 9 ? date.getMinutes() : ('0' + date.getMinutes())) + ':' + (date.getSeconds() > 9 ? date.getSeconds() : ('0' + date.getSeconds()));
    },

    // 取消选中
    cancelConditionSelection(optionList) {
      var options = optionList.options;
      for (var i = 0; i < options.length; i++) {
        options[i].selected = false;
      }
      optionList.def_min_value = null;
      optionList.def_max_value = null;
      this.setCurrentCondition();
    },

    // 设置当前选中的高级条件
    setCurrentCondition(condition) {
      if (!condition || (this.currentConditionCode === condition.fieldcode)) {
        this.currentConditionCode = '';
        this.currentCondition = null;
      } else {
        this.currentConditionCode = condition.fieldcode;
        this.currentCondition = condition;
      }
    },
    search() {
      this.request();
    },
    // 跳转到添加地点页面
    updataProjectInfo() {
      location.hash = "/prj/projectinfo/add";
    },
    multiDeleteDialgShow() {
      this.multiDelDialogVisible = true;
    },

    /**
       *  启用状态修改
       *
       * */
    stateTableRow(row) {
      // 操作列增加启用按钮
      this.$http({
        url: "/uapbd/addressdoc/enable/" + row.pk_customer,
        method: "post"
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.request();
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "Network error",
            type: "error"
          });
        });
    },
    deleteClick() {
      debugger;
      this.delDialogVisible=false;
      var baseUrl = '/yls-busi-web/';
      var url = baseUrl+'prj/deletebyid';
      var delId = this.delId; //this.$refs["template-table"].comp.delId;
      this.$http({
        url: url,
        headers: {'Content-Type': 'application/json'},
        method: "post",
        dataType: "json",
        data: delId
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
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "Network error",
            type: "error"
          });
        });
    },

    multiDeleteClick() {
      var tableSelections = this.$refs["template-table"].comp.$refs[
        "customer_table"
      ].getSelection();
      var delIds = [];
      if (tableSelections && tableSelections.length > 0) {
        for (var i = 0; i < tableSelections.length; i++) {
          var row = tableSelections[i];
          var id = row.pk_customer;
          delIds.push(id);
        }
      }
      console.log("multi" + delIds);
      return;
    }
  }
};
</script>
<style>

</style>

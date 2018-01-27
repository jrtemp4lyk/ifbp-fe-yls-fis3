<template>
<!--项目来源管理模块-->
<div>
    <ifbp-template ref="ContSourceRef"
                  tplId="ContSource"
                  :funnode="funnode"
                  :nexuskey="nexusKey"
                  :tplData="ContSourceData"
                  :tplResetFun="ContSourceResetFun"
                  @form-confirm-click="ContSourceFormConfirm"
                  @form-cancel-click="ContSourceFormCancel"
                  show-type="table-form"
                  :methods="t_Methods"
                  @edit-table-click="ContSourceFormedit"
                  @delete-table-click="ContSourceFormdelete"
                  >
    </ifbp-template>

    <!-- 项目来源 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="ContSourceDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ContSourceDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="ContSourceDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["pk_prjId","type"],
  data() {
    var oThis = this;
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      ContSourceDelVisible: false,
      rmoveindex: "",
      delId: "",
      funnode: "BT008",
      nexusKey: "prj_cont_source",
      ContSourceData: {
        rules: {},
        midAccountParams:{}
      },
      ContSourceResetFun: function($node) {

        var $refResourceCustomer = this.getNodeById($node, 'puvynqv5aps');  //客户名称

        if($refResourceCustomer.length) {
          $refResourceCustomer.attr("v-on:trigger", "handleRefChange"); 
        }


        var $table =  $node.find("el-table");
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

        t_Methods: {

          handleRefChange:function(type,data){
             if(type === 'change') {
            var param = {'pk_customer':data.value[0].id};
            oThis.$refs.ContSourceRef.setData('midAccountParams',param);
            
          }
          }

        }

    };
  },

  //监听引用传参后实时变动
  computed: {
    currentpk_prjId() {
      return this.pk_prjId;
    }
  },

  //监听参数变动后方法
  watch: {
    pk_prjId(val) {
      this.requestPrjContSource();
    }
  },

  //获取数据初始化操作
  created() {},

  //页面操作
  mounted() {
    this.request();
  },

  methods: {
    request() {
      if (this.pk_prjId != "") {
        this.requestPrjContSource();
      }
    },

    //请求合同来源信息表格数据
    requestPrjContSource() {
      var url = ylsBusi + "prj/contSource/page";
      var data = {
        "orderList": [
          {
            "direction": "desc",
            "property": "ts"
          }
        ],
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
         
              custCondList : [
              {
              'key': 'source_bill',
              'oper': '=',
              'value': this.pk_prjId
            }
            ]
          }
        }
      };
      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: data,
        dataType: "json"
      }).then(res => {
          this.ContSourceData = res.data.data.content;
          this.$refs["ContSourceRef"].setData(
            "ContSource_t",
            JSON.parse(JSON.stringify(this.ContSourceData))
          );
        }).catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },

    //合同来源信息取消按钮
    ContSourceFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["ContSourceRef"].comp.formShow = false;
      } else {
        this.$refs["ContSourceRef"].getTableComp().closeExpandRow();
        var  sourceData = this.$refs.ContSourceRef.getData("ContSource_t");
        sourceData[this.resourceEditIndex] = this.resourceEditBakData;
        this.$refs.ContSourceRef.setData("ContSource_t",sourceData);
      }
    },

    //合同来源信息保存
    ContSourceFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.ContSourceRef.comp.ContSource;

      data.source_bill = this.pk_prjId;
      if(data.pk_prj_source){
         url = ylsBusi+'/prj/contSource/update';
      }else{
         url = ylsBusi+'/prj/contSource/create';
      }

      this.$http({
        url: url,
        headers: { "Content-Type": "application/json" },
        method: "post",
        data: JSON.parse(JSON.stringify(data))
      }).then(res => {

          if (res.data.success === true) {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.requestPrjContSource();
            this.$refs["ContSourceRef"].comp.formShow = false;
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        })
        .catch(() => {
          this.$message({
            message: "更新失败",
            type: "error"
          });
        });
    },

    //合同来源信息行编辑
    ContSourceFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs.ContSourceRef.getTableComp().expandRow(row);
      this.$refs.ContSourceRef.formShow = false;
      //ContSource为表单数据对象参数
      this.$refs.ContSourceRef.setData("ContSource", row);
      this.resourceEditBakData = JSON.parse(JSON.stringify(scope.row));
      this.resourceEditIndex = scope.$index;
    },

    // 合同来源信息行删除提示
    ContSourceFormdelete: function(scope) {
      this.ContSourceDelVisible = true;
      this.delId = scope.row.pk_prj_source;
    },

    //合同来源信息行删除方法
    ContSourceDeleteClick() {
      this.$http({
        url: ylsBusi + "/prj/contSource/deleteById",
        headers: { "Content-Type": "application/json" },
        method: "post",
        dataType: "json",
        data: this.delId
      }).then(res => {
          if (res.data.success === true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.requestPrjContSource();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: "error"
            });
          }
        }).catch(e => {
          this.$message({
            message: "信息删除失败！",
            type: "error"
          });
        });
      this.ContSourceDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

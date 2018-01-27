<template>
<!--合同相关方信息管理模块-->
<div>
          <ifbp-template ref="busirelevantPartyRef"
                        tplId="busirelevantParty"
                        :funnode="funnode"
                        :nexuskey="nexuskey"
                        :tplData="busirelevantPartyData"
                        :tplResetFun="relevantPartyResetFun"
                        @form-confirm-click="relevantPartyFormConfirm"
                        @form-cancel-click="relevantPartyFormCancel"
                        show-type="table-form"
                        :methods="t_Methods"
                        @edit-table-click="relevantPartyFormedit"
                        @delete-table-click="relevantPartyFormdelete"
                        >
          </ifbp-template>

    <!-- 业务合同相关方 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="relevantPartyDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="relevantPartyDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="relevantPartyDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["pk_prjId","type","invisible"],
  data() {
    var oThis = this;
    //校验 合同相关方
    var validateItem = function(rule, value, callback) {
      //相关方类型 非空校验
      var  formObj = oThis.$refs.busirelevantPartyRef.getFormData();
      if(formObj.pk_relevant_party ===null){

      if (rule.field == 'linkman_name') {
        if (value === '') {
          callback(new Error('联系人不能为空! '));
        } else {

          oThis.$http({
            url: ylsBusi + 'prj/relevantParty/selectByConditions',
            hearders: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(formObj))
          }).then(res => {
            if (res.data.success === true) {
              if (res.data.data === true) {
                callback();
              } else {
               
                 oThis.$message({
                    message: "已存在此条信息记录",
                    type: "error"
                 });
              }
            } else {
              callback(new Error(res.data.error.errorMessage));
            }
          }).catch(() => {
            callback(new Error("后台服务有误，请联系管理员！"));
          })
        }
      }
      }else{
    
        callback();
      }

      
    };
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      relevantPartyDelVisible: false,
      rmoveindex: "",
      delId: "",
      back_object:"",
      //合同相关方
      relevantPartyIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.pk_prjId === "") {
              oThis.$message({
                message: "未获取到项目",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.busirelevantPartyRef.comp;
            var table = uitemplateComp.$refs["ApplyRelevantParty_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.busirelevantPartyRef.setData("ApplyRelevantParty", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["ApplyRelevantParty_ref"].resetFields();
          }
        }
      ],
      funnode:"BT008",
      nexuskey: oThis.type==="prj" ?"relevantParty_busi_apply":"relevantParty_busi_apply",
      busirelevantPartyData: {
        rules:{
          linkman_name:[{ validator: validateItem, trigger: 'blur' }]       
        },
        linkmanSel:{},
        nameSel: {},
      },
      //渲染表格
      relevantPartyResetFun: function($node) {
        if(oThis.invisible) {
          return;
        }
        
         var $refType = $node.find("el-select[v-model='ApplyRelevantParty.rp_type']"); //相关方类型
        

        if($refType.length) {
          $refType.attr("v-on:change", "typeRefChange"); 
        }
        var $refNode = $node.find("el-ref[v-model='ApplyRelevantParty.rp_name']");  //相关方名称

        if($refNode.length) {
          debugger;
          $refNode.attr("v-on:trigger", "handleRefChange"); 
        }

        var $refLinkman = $node.find("el-ref[v-model='ApplyRelevantParty.linkman_name']");  //相关方联系人


        if($refLinkman.length) {
          $refLinkman.attr("v-on:trigger", "linkmanRefChange"); 
        }

        // var $table = this.getNodeById($node, "ekpkytxzio9");
        var $table =$node.find("el-table");
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
        typeRefChange: function(type, data) {
          
            var cusotmer_class='';
            if(type === 'Lessee'){
              cusotmer_class='yls_dev100000000ffn';
            }else if(type === 'Guarantee'){
              cusotmer_class='yls_dev100000000ffr';
            }else if(type === 'Manufacturer'){
              cusotmer_class='yls_dev100000000fft';
            }else if(type === 'Agent'){
              cusotmer_class='yls_dev100000000ffv';
            }
            // var param = {"cusotmer_class":cusotmer_class};
            // oThis.$refs.busirelevantPartyRef.setData('nameSel',param);
            // oThis.$nextTick(() => {
              
              oThis.$refs.busirelevantPartyRef.setData('nameSel',{"cusotmer_class":cusotmer_class});
            // });
        },
        handleRefChange: function(type, data) {
          if(type === 'change') {
            var param = {'pk_customer':data.value[0].id};
            oThis.$refs.busirelevantPartyRef.setData('linkmanSel',param);
          }
        },
        linkmanRefChange:function(type, data){//参照变化处理函数 依据参照给 电话地址赋值
          if(type === 'change') {
           this.$refs['ApplyRelevantParty_ref'].model.linkman_phone = data.value[0].mobile;
           this.$refs['ApplyRelevantParty_ref'].model.linkman_add = data.value[0].office_addr_details;
          }
        }
      },
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
      this.requestPrjrelevantParty();
    }
  },
  //获取数据数据初始化操作
  created() {},
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
    /**
       *   初始响应方法
       **/
    request() {
      if (this.pk_prjId != "") {
        this.requestPrjrelevantParty();
      }
    },
    //请求业务合同相关方
    requestPrjrelevantParty() {
      var url;
      url = ylsBusi + "prj/relevantParty/page";
      var data = {
        "orderList": [
          {
            "direction": "desc",
            "property": "source_bill"
          }
        ],
        pageNum: 0,
        pageSize: 0,
        searchParams: {
          searchMap: {
             custCondList: [{
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
      })
        .then(res => {
          console.log();
          this.originalValue = res.data.data.content;
          console.log(this.originalValue);
          this.$refs["busirelevantPartyRef"].setData(
            "ApplyRelevantParty_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "相关方信息获取失败",
            type: "error"
          });
        });
    },
    //合同相关方取消按钮
    relevantPartyFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["busirelevantPartyRef"].comp.formShow = false;
      } else {
        this.$refs["busirelevantPartyRef"].getTableComp().closeExpandRow();
        var releBakData = this.$refs.busirelevantPartyRef.getData("ApplyRelevantParty_t");
        releBakData[this.releEditBakIndex] = this.back_object;
        this.$refs.busirelevantPartyRef.setData("ApplyRelevantParty_t",releBakData);
      }
    },
    //合同相关方主表保存
    relevantPartyFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.busirelevantPartyRef.comp.ApplyRelevantParty;
      data.source_bill = this.pk_prjId;
      
      if(data.pk_relevant_party){
         url = ylsBusi+'prj/relevantParty/update';
      }else{
         url = ylsBusi+'prj/relevantParty/create';
      }
      //保存校验
      this.$refs.busirelevantPartyRef.comp.$refs[
        "ApplyRelevantParty_ref"
      ].validate(valid => {
        if (valid) {
          
          this.$http({
            url: url,
            headers: { "Content-Type": "application/json" },
            method: "post",
            data: JSON.parse(JSON.stringify(data))
          })
            .then(res => {
              
              if (res.data.success === true) {
                this.$message({
                  message: "保存成功！",
                  type: "success"
                });
                this.originalValue = res.data.data;
                //获取列表数组（根据表格数据对象参数获取相应的数组或对象）
                let linarraydata = this.$refs.busirelevantPartyRef.getData(
                  "ApplyRelevantParty_t"
                );
                /**@augments 移除位置 
                 * @augments 移除个数
                 * @augments 用新的对象替换（不传值则删除）
                 */
                
                if (this.rmoveindex !== "") {
                  linarraydata.splice(this.rmoveindex, 1, this.originalValue);
                } else {
                  //加入数组开始
                  linarraydata.unshift(this.originalValue);
                }
                this.$refs.busirelevantPartyRef.setData(
                  "ApplyRelevantParty_t",
                  JSON.parse(JSON.stringify(linarraydata))
                );
                this.$refs["busirelevantPartyRef"].comp.formShow = false;
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
        }
      });
    },
    //合同相关方行编辑
    relevantPartyFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["busirelevantPartyRef"].getTableComp().expandRow(row);
      this.$refs["busirelevantPartyRef"].comp.formShow = false;
      //ApplyRelevantParty为表单数据对象参数
      this.$refs["busirelevantPartyRef"].setData("ApplyRelevantParty", row);
      this.back_object=JSON.parse(JSON.stringify(row));
      this.releEditBakIndex = scope.$index;
    },
    // 合同相关方删除提示
    relevantPartyFormdelete: function(scope) {
      this.relevantPartyDelVisible = true;
      this.delId = scope.row.pk_relevant_party;
    },
    // 合同相关方删除方法
    relevantPartyDeleteClick() {
      this.$http({
        url: ylsBusi + "prj/relevantParty/deleteById",
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
            this.requestPrjrelevantParty();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
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
      this.relevantPartyDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

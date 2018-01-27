<template>
<!--出租人管理模块-->
<div>
          <ifbp-template ref="OrginfoRef"
                        tplId="Orginfo"
                        :funnode="funnode"
                        :nexuskey="nexusKey"
                        :tplData="OrginfoData"
                        :tplResetFun="OrginfoResetFun"
                        :methods="bothlesseeMethods"
                        @form-confirm-click="OrginfoFormConfirm"
                        @form-cancel-click="OrginfoFormCancel"
                        show-type="table-form"
                        @edit-table-click="OrginfoFormedit"
                        @delete-table-click="OrginfoFormdelete"
                        >
          </ifbp-template>

    <!-- 出租人 删除提示框 -->
    <el-dialog
      title="提示"
      v-model="OrginfoDelVisible"
      :modal="true"
      size="tiny">
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="OrginfoDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type="primary" @click="OrginfoDeleteClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ["source_bill","type"],
  data() {
    var oThis = this;
    //校验
    var validatecustomer = function(rule, value, callback) {
      
    };
    return {
      scrollDom: document.getElementsByClassName("view")[0],
      OrginfoDelVisible: false,
      rmoveindex: "",
      delId: "",
      //出租人标签
      OrginfoIcons: [
        {
          icon: "plus",
          click: function() {
            
            if (oThis.source_bill === "") {
              oThis.$message({
                message: "请先保存基本信息",
                type: "error"
              });
              return;
            }
            var uitemplateComp = oThis.$refs.OrginfoRef.comp;
            var table = uitemplateComp.$refs["projectOrginfo_t_ref"];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.OrginfoRef.setData("projectOrginfo", {
              // mobile:'13'
            });
            oThis.rmoveindex = "";
            uitemplateComp.$refs["projectOrginfo_ref"].resetFields();
          }
        }
      ],
      //type=prj 然后项目ui_id:8e13c344-fe4b-4e0c-a171-8e18395ee236 否者a7715073-8a24-420a-86de-9110786e8e4b
      funnode: oThis.type==="prj" ? "BT008":"BT008",
      nexusKey: oThis.type==="prj" ?"projectOrginfoUI" : "projectOrginfoUI",
      OrginfoData: {
      },
      //渲染表格
      OrginfoResetFun: function($node) {
         var $refNode = this.getNodeById($node,'zi1iz33e0z');
        // 获取form中所有el-ref，可以给所有el-ref加上事件，统一触发同一方法
        // var $refNode = $node.find("el-ref");
        if($refNode.length) {
          // 添加绑定事件, 参照改变时触发trigger事件，调用customerRefChange方法
          $refNode.attr("v-on:trigger", "customerRefChange"); 
        };
        //项目承租信息表格id：owwkujphew
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
        // var $customercode = this.getNodeById($node, "irwohmupzb"); //出租人编码
        // var $legalpersonname = this.getNodeById($node, "zmimbwbx3qn"); //法人代表
        // var $taxpayernumber = this.getNodeById($node, "349ebc0s246"); //纳税人识别号

        //  $customercode.html(
        //    '<template scope="scope"><div>{{scope.row.beanMap?' +
        //     "(scope.row.beanMap.pk_customer_ref ? scope.row.beanMap." +
        //     'pk_customer_ref[scope.row.pk_customer].code : "") : ""}}</div></template>'
        // );

        // $legalpersonname.html(
        //    '<template scope="scope"><div>{{scope.row.beanMap?' +
        //     "(scope.row.beanMap.pk_customer_ref ? scope.row.beanMap." +
        //     'pk_customer_ref[scope.row.pk_customer].legal_person_name : "") : ""}}</div></template>'
        // );

        //  $taxpayernumber.html(
        //    '<template scope="scope"><div>{{scope.row.beanMap?' +
        //     "(scope.row.beanMap.pk_customer_ref ? scope.row.beanMap." +
        //     'pk_customer_ref[scope.row.pk_customer].taxpayer_number : "") : ""}}</div></template>'
        // );

        $table.append(operateHtml);
        return $node[0].outerHTML;
      },
      bothlesseeMethods: {
        customerRefChange: function(type, data) {
          debugger;
          oThis.$refs.OrginfoRef.comp.projectOrginfo.identity_num=data.value[0].identity_num;  //证件号码
          oThis.$refs.OrginfoRef.comp.projectOrginfo.pk_legal_person=data.value[0].pk_legal_person; //法定代表人
          oThis.$refs.OrginfoRef.comp.projectOrginfo.pk_linkman=data.value[0].pk_linkman; //联系人
          oThis.$refs.OrginfoRef.comp.projectOrginfo.linkman_phone=data.value[0].linkman_phone;//联系人电话
       
        },
      },
    };
  },
  //监听引用传参后实时变动
  computed: {
    currentsource_bill() {
      return this.source_bill;
    }
  },
  //监听参数变动后方法
  watch: {
    source_bill(val) {
      this.requestPrjOrginfo();
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
      if (this.source_bill != "") {
        this.requestPrjOrginfo();
      }
    },
    //请求业务出租方
    requestPrjOrginfo() {
      var url;
      if (this.source_bill == "") {
        return;
      }
      url = ylsBusi + "prj/orginfo/page";
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
              'value': this.source_bill
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
  
          this.originalValue = res.data.data.content;
         
          this.$refs["OrginfoRef"].setData(
            "projectOrginfo_t",
            JSON.parse(JSON.stringify(this.originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: "信息获取失败",
            type: "error"
          });
        });
    },
    //出租方取消按钮
    OrginfoFormCancel: function(type) {
      this.rmoveindex = "";
      //关闭表单或者是下拉显示行
      if (type === "form") {
        this.$refs["OrginfoRef"].comp.formShow = false;
      } else {
        this.$refs["OrginfoRef"].getTableComp().closeExpandRow();
      }
    },
    //出租方主表保存
    OrginfoFormConfirm: function() {
      //获取当前数据
      let url="";
      var data = this.$refs.OrginfoRef.comp.projectOrginfo;
      data.source_bill = this.source_bill;
      delete data.legal_person_name;
      delete data.customer_code;
      delete data.taxpayer_number;
      delete data.realworkplace;
      delete data.realworkmail;
 
      if(data.pk_prj_orginfo){
         url = ylsBusi+'/prj/orginfo/update';
      }else{
         url = ylsBusi+'/prj/orginfo/create';
      }
      //保存校验
      this.$refs.OrginfoRef.comp.$refs[
        "projectOrginfo_ref"
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
                this.requestPrjOrginfo();
                this.$refs["OrginfoRef"].comp.formShow = false;
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
    //出租方行编辑
    OrginfoFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      var row = scope.row;
      this.$refs["OrginfoRef"].getTableComp().expandRow(row);
      this.$refs["OrginfoRef"].formShow = false;
      //projectOrginfo为表单数据对象参数
      this.$refs["OrginfoRef"].setData("projectOrginfo", row);
      this.$refs.OrginfoRef.comp.projectOrginfo.customer_code=row.beanMap.pk_customer_ref[row.pk_customer].code;
      this.$refs.OrginfoRef.comp.projectOrginfo.legal_person_name=row.beanMap.pk_customer_ref[row.pk_customer].legal_person_name;
      this.$refs.OrginfoRef.comp.projectOrginfo.taxpayer_number=row.beanMap.pk_customer_ref[row.pk_customer].taxpayer_number;

      this.$refs.OrginfoRef.comp.projectOrginfo.realworkplace=row.beanMap.pk_customer_ref[row.pk_customer].realworkplace;//实际告知地址
      this.$refs.OrginfoRef.comp.projectOrginfo.realworkmail=row.beanMap.pk_customer_ref[row.pk_customer].realworkmail;//实际告知邮编
    },
    // 出租方删除提示
    OrginfoFormdelete: function(scope) {
      this.OrginfoDelVisible = true;
      this.delId = scope.row.pk_prj_orginfo;
    },
    // 出租方删除方法
    OrginfoDeleteClick() {
      this.$http({
        url: ylsBusi + "/prj/orginfo/deleteById",
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
            this.requestPrjOrginfo();
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
      this.OrginfoDelVisible = false;
      this.delId = "";
    }
  }
};
</script>
<style>

</style>

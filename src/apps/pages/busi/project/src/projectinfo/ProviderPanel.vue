<template>
  <!--供应商管理模块-->
  <div>
    <ifbp-template ref='contProviderRef'
      tplId='contProvider'
      :funnode='funnode'
      :nexuskey='nexusKey'
      :tplData='contProviderData'
      :tplResetFun='contProviderResetFun'
      @form-confirm-click='contProviderFormConfirm'
      @form-cancel-click='contProviderFormCancel'
      show-type='table-form'
      :methods='t_Methods'
      @edit-table-click='contProviderFormedit'
      @delete-table-click='contProviderFormdelete'
    >
    </ifbp-template>

    <!-- 供应商 删除提示框 -->
    <el-dialog
      title='提示'
      v-model='contProviderDelVisible'
      :modal='true'
      size='tiny'>
      <span>确认删除该条记录？删除后无法恢复。</span>
      <span slot='footer' class='dialog-footer'>
        <el-button @click="contProviderDelVisible = false , this.delId=''">取 消</el-button>
        <el-button type='primary' @click='contProviderDeleteClick'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import {ylsBusi} from '../../../../../common/js/publicData.js'

export default {
  //应用vue传过来接收参数
  props: ['source_bill','type'],
  data() {
    let oThis = this;
    //校验

    return {
      scrollDom: document.getElementsByClassName('view')[0],
      contProviderDelVisible: false,
      rmoveindex: '',
      delId: '',
      //供应商标签
      contProviderIcons: [
        {
          icon: 'plus',
          click: function() {
            if (oThis.source_bill === '') {
              oThis.$message({
                message: '请先保存基本信息',
                type: 'error'
              });
              return;
            }
            let uitemplateComp = oThis.$refs.contProviderRef.comp;
            let table = uitemplateComp.$refs['contProvider_t_ref'];
            table.closeExpandRow();
            uitemplateComp.formShow = true;
            //初始化值
            oThis.$refs.contProviderRef.setData('contProvider', {
              // mobile:'13'
            });
            oThis.rmoveindex ='';
            uitemplateComp.$refs['contProvider_ref'].resetFields();
          }
        }
      ],
      //type=prj 然后项目ui_id:8e13c344-fe4b-4e0c-a171-8e18395ee236 否者a7715073-8a24-420a-86de-9110786e8e4b
      funnode: oThis.type==='prj' ? 'BT008':'BT008',
      nexusKey: oThis.type==='prj' ? 'prjProviderUI' : (oThis.type==='prjApproval' ? 'prjApproval_provider' : 'prjProviderUI'),
      contProviderData: {
        linkManParams:{},
        providerParams:{},
        rentParams:{'pk_customer':'yls_dev100000001pqc'} //出租人  （一般写成固定 pk）
      },
      //渲染表格
      contProviderResetFun: function($node) {
        //获取需要过滤的控件(type === prj)
        // let $salesCustomer = this.getNodeById($node, '5zouflppncd');  //卖方客户主键
        // if($salesCustomer.length) {
        //   $salesCustomer.attr('v-on:trigger', 'saleRefChange'); 
        // }

        // let $pkLinkMan = this.getNodeById($node, '6bt70kv30vb');  //承租人主键
        // if($pkLinkMan.length) {
        //   $pkLinkMan.attr('v-on:trigger', 'linkManRefChange'); 
        // }
        //end

        let $pkProvider= this.getNodeById($node, 'ibgjz2m7kkd');  //供应商外键
        if($pkProvider.length) {
          $pkProvider.attr('v-on:trigger', 'pkProviderRefChange'); 
        }

        //项目承租信息表格id：owwkujphew
        let id_co='';
        if(oThis.type==='prj')
          id_co='i71amo6wy18';
        else if(oThis.type==='contr')
          id_co='';
        else if(oThis.type==='prjApproval')
          id_co='npnshehd4lh';
        let $table = this.getNodeById($node, id_co);
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
        let operateHtml = this.getTableOperateHtml(operateArr);
        $table.append(operateHtml);
        return $node[0].outerHTML;
      },

      t_Methods : {
        // saleRefChange: function(type, data) {
        //   if(type === 'change') {
        //     let param = {'pk_customer':data.value[0].id};
        //     oThis.$refs.contProviderRef.setData('providerParams',param);
        //   }
        // },
        // linkManRefChange: function(type,data){
        //   if(type === 'change') {
        //     let param = {'pk_customer':data.value[0].id};
        //     oThis.$refs.contProviderRef.setData('linkManParams',param);
        //   }
        // },
        pkProviderRefChange: function(type,data){
          if(type === 'change') {
            debugger;
            oThis.$refs.contProviderRef.comp.contProvider.provider_code=data.value[0].refcode; //供应商编码
            oThis.$refs.contProviderRef.comp.contProvider.identity_num=data.value[0].identity_num; //证件号码
            oThis.$refs.contProviderRef.comp.contProvider.capital=data.value[0].capital;//注册资本
            oThis.$refs.contProviderRef.comp.contProvider.capital_paidin=data.value[0].capital_paidin; //实收资本
            oThis.$refs.contProviderRef.comp.contProvider.pk_legal_person=data.value[0].pk_legal_person;//法定代表人
            oThis.$refs.contProviderRef.comp.contProvider.establish_date=data.value[0].establish_date; //成立时间
            oThis.$refs.contProviderRef.comp.contProvider.comm_addr=data.value[0].comm_addr;//通讯地址
            oThis.$refs.contProviderRef.comp.contProvider.comm_mail=data.value[0].comm_mail;//通讯邮编
            // this.$refs['contProvider_ref'].model.customer_code = data.value[0].refcode;
            // this.$refs['contProvider_ref'].model.society_credit = data.value[0].society_credit;
            // this.$refs['contProvider_ref'].model.capital = data.value[0].capital;
            // this.$refs['contProvider_ref'].model.capital_paidin = data.value[0].capital_paidin;
            // this.$refs['contProvider_ref'].model.legal_person_name = data.value[0].legal_person_name;
            // this.$refs['contProvider_ref'].model.establish_date = data.value[0].establish_date;
            // this.$refs['contProvider_ref'].model.comm_addr = data.value[0].comm_addr;
            // this.$refs['contProvider_ref'].model.comm_mail = data.value[0].comm_mail;
          }
        }
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
      this.requestPrjcontProvider();
    }
  },
  //获取数据数据初始化操作
  created() {
   
  },
  //页面操作
  mounted() {
    
    this.request();
  },
  methods: {
    /**
       *   初始响应方法
       **/
    request() {
      if (this.source_bill != '' && this.source_bill != undefined) {
        this.requestPrjcontProvider();
      }
    },
    //请求业务供应商
    requestPrjcontProvider() {
      let data = {
        'orderList': [
          {
            'direction': 'desc',
            'property': 'ts'
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
        url: ylsBusi + 'prj/provider/page',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        data: data,
        dataType: 'json'
      })
        .then(res => {
          let originalValue = res.data.data.content;
          this.$refs['contProviderRef'].setData(
            'contProvider_t',
            JSON.parse(JSON.stringify(originalValue))
          );
        })
        .catch(() => {
          this.$message({
            message: '信息获取失败',
            type: 'error'
          });
        });
    },
    //供应商取消按钮
    contProviderFormCancel: function(type) {
      this.rmoveindex = '';
      //关闭表单或者是下拉显示行
      if (type === 'form') {
        this.$refs['contProviderRef'].comp.formShow = false;
      } else {
        this.$refs['contProviderRef'].getTableComp().closeExpandRow();
        var providerBakData = this.$refs.contProviderRef.getData('contProvider_t');
        providerBakData[this.providerEditIndex] = this.providerEditBakData;
        this.$refs.contProviderRef.setData('contProvider_t',providerBakData);
      }
    },
    //供应商主表保存
    contProviderFormConfirm: function() {
      //获取当前数据
      let url='';
      let data = this.$refs.contProviderRef.comp.contProvider;
      data.source_bill = this.source_bill;
      if(data.pk_prj_provider){
         url = ylsBusi+'prj/provider/update';
      }else{
         url = ylsBusi+'prj/provider/create';
      }
      //保存校验
      this.$refs.contProviderRef.comp.$refs[
        'contProvider_ref'
      ].validate(valid => {
        if (valid) {
          this.$http({
            url: url,
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(data))
          }).then(res => {
            if (res.data.success === true) {
              this.$message({
                message: '保存成功！',
                type: 'success'
                });
              this.requestPrjcontProvider();
              this.$refs['contProviderRef'].comp.formShow = false;
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

          //回写到单位客户表里去
          let writeback = {};
          writeback.pk_customer = this.$refs.contProviderRef.comp.contProvider.pk_provider_name; //客户外键
          writeback.customer_code = this.$refs.contProviderRef.comp.contProvider.provider_code; //编码
          writeback.society_credit = this.$refs.contProviderRef.comp.contProvider.identity_num; //证件号码
          writeback.capital = this.$refs.contProviderRef.comp.contProvider.capital;//注册资本
          writeback.capital_paidin = this.$refs.contProviderRef.comp.contProvider.capital_paidin; //实收资本
          writeback.pk_legal_person = this.$refs.contProviderRef.comp.contProvider.pk_legal_person;//法定代表人
          writeback.establish_date = this.$refs.contProviderRef.comp.contProvider.establish_date; //成立时间
          writeback.comm_addr = this.$refs.contProviderRef.comp.contProvider.comm_addr;//通讯地址
          writeback.comm_mail = this.$refs.contProviderRef.comp.contProvider.comm_mail;//通讯邮编
          
          this.$http({
            url: ylsBusi+'cust/corp/updateOptionalByPkCustomer',
            headers: { 'Content-Type': 'application/json' },
            method: 'post',
            data: JSON.parse(JSON.stringify(writeback))
          }).then(res => {
            if (res.data.success === true) {
              this.$message({
                message: '回写成功！',
                type: 'success'
              });
            } else {
              this.$message({
                message: res.data.error.errorMessage,
                type: 'error'
              });
            }
          }).catch(() => {
            this.$message({
              message: '回写失败',
              type: 'error'
            });
          });
        }
      });
    },
    //供应商行编辑
    contProviderFormedit: function(scope) {
      //记录删除位置
      this.rmoveindex = scope.$index;
      //行下展开表单界面
      let row = scope.row;
      this.$refs['contProviderRef'].getTableComp().expandRow(row);
      this.$refs['contProviderRef'].formShow = false;
      //contProvider为表单数据对象参数
      this.$refs['contProviderRef'].setData('contProvider', row);
      this.providerEditBakData = JSON.parse(JSON.stringify(scope.row));
      this.providerEditIndex = scope.$index;
    },
    // 供应商删除提示
    contProviderFormdelete: function(scope) {
      this.contProviderDelVisible = true;
      this.delId = scope.row.pk_prj_provider;
    },
    // 供应商删除方法
    contProviderDeleteClick() {
      this.$http({
        url: ylsBusi + 'prj/provider/deleteById',
        headers: { 'Content-Type': 'application/json' },
        method: 'post',
        dataType: 'json',
        data: this.delId
      })
        .then(res => {
          if (res.data.success === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.requestPrjcontProvider();
          } else {
            this.$message({
              message: res.data.error.errorMessage,
              type: 'error'
            });
          }
        })
        .catch(e => {
          this.$message({
            message: '信息删除失败！',
            type: 'error'
          });
        });
      this.contProviderDelVisible = false;
      this.delId = '';
    }
  }
};
</script>
<style>

</style>

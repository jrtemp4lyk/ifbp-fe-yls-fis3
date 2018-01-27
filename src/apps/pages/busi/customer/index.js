module.exports = {
  routes: [
    //代理商管理页面
      {
        name: 'AgentManage',
        path: '/agentmanage',
        component: './agent/agentmanage/agentmanageinfo.vue'
      },
      //代理商管理添加页面
      {
        name: 'AgentManageAdd',
        path: '/agentmanageadd',
        component: './agent/agentmanage/agent-manage.vue'
      },
      //代理商管理编辑时页面
      {
        name: 'AgentManagedetail',
        path: '/agentmanage/detail-edit/:id',
        component: './agent/agentmanage/agent-manage.vue'
      },
      //代理商授信
      {
        name: 'AgentCreditGrantApply',
        path: '/creditgrant',
        component: './agent/main/creditgrantmain.vue'
      },
    
    {
      name: 'CorpCustomerDetial',//单位客户界面详情（待修改）
      path: '/cust/Corpcustomer/detail/:id',
      component: './src/CorpCustomerDetial.vue'
    },
    {
      name: 'AddCorpCustomerDetial',//新增单位客户界面（待修改）
      path: '/cust/Corpcustomer/add/:cust_type',
      component: './src/CorpCustomerDetial.vue'
    },
    {
      name: 'PersonCustomerDetial',//自然人客户详情页面（待修改）
      path: '/cust/Personcustomer/detail/:id',
      component: './src/PersonCustomerDetail.vue'
    },
    {
      name: 'AddPersonCustomerDetial',//自然人新增页面（待修改）
      path: '/cust/Personcustomer/add/:cust_type',
      component: './src/PersonCustomerDetail.vue'
    },
    {
      name: 'operation_list',//不是我的
      path: '/operation/list',
      component: './src/operation_list.vue'
    },
    {
      name: 'operation_detail',//不是我的
      path: '/operation/detail/:id',
      component: './src/operation_detail.vue'
    },
    {
      name: 'operation-add',//不是我的
      path: '/operation/add',
      component: './src/operation_detail.vue'
    },
    {
      name: 'creditapply-list',//不是我的
      path: '/creditapply/list',
      component: './src/creditApply_list.vue'
    },
    {
      name: 'Agent-list', //代理商列表页
      path: '/Agent/list',
      component: './src/Agent-baseinfo.vue'
    },
  
    {
      name: 'Manufacturer-list',//厂商列表页
      path: '/Manufacturer/list',
      component: './src/Manufacturer-baseinfo.vue'
    },
    {
      name: 'Lessee-list',//承租人列表页
      path: '/Lessee/list',
      component: './src/Lessee-baseinfo.vue'
    }
    ,
    {
      name: 'others_cust-list',//其他客户列表页
      path: '/others_cust/list',
      component: './src/Others_cust-baseinfo.vue'
    },
    {
      name: 'Guarantee-list',//担保客户列表页
      path: '/Guarantee/list',
      component: './src/Guarantee-baseinfo.vue'
    },
    {
      
      name: 'AgentCreditManufacturerApply',
      path: '/creditmanufacturer',
      component: './agent/main/creditmanufacturer.vue'
    }
    ,
    {
      name: 'cust-report',//财报导入
      path: '/custReport',
      component: './src/cust_report.vue'
    }
    ,
    {
      name: 'cust-report',//财报导入新增
      path: '/custReport/add',
      component: './src/cust_report_detail.vue'
    }
    ,
    {
      name: 'cust-report',//财报导入详情
      path: '/custReport/detail/:id',
      component: './src/cust_report_detail.vue'
    }
  ]
}

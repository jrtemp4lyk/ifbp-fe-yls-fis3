module.exports = {
  routes: [
    {
      name: 'main',
      path: '/busiapply',
      component: './src/busiapply/busiapplymain.vue'
    },
    
    // 项目基本信息
    {
      name: 'projectbase',
      path: '/projectbase',
      component: './src/projectapplyinfo/project-info.vue'
    },
    // 项目基本信息列表
    {
      name: 'projectinfo',
      path: '/prj/projectinfo',
      component: './src/projectinfo/project-info-list.vue'
    },
    // 项目基本详情
    {
      name: 'projectinfoDetial',
      path: '/prj/projectinfo/detial/:id/:lease',
      component: './src/projectinfo/project-info-detail.vue'
    },
    {
      name: 'projectinfoadd',
      path: '/prj/projectinfo/add',
      component: './src/projectinfo/project-info-detail.vue'
    },
    {
      name: 'projectbaseinfoadd',
      path: '/projectbase/add',
      component: './src/projectapplyinfo/project-detail.vue'
    },
    {
      name: 'projectbaseinfodetail',
      path: '/projectbase/detail/:id',
      component: './src/projectapplyinfo/project-detail.vue'
    },
     
    //联系人
    {
      name: 'linkmaninfo',
      path: '/linkman',
      component: './src/linkman/linkman-info.vue'
    },
    {
      name: 'linkmanadd',
      path: '/linkman/add',
      component: './src/linkman/linkman-detail.vue'
    },
    {
      name: 'linkmandetail',
      path: '/linkman/detail/:id',
      component: './src/linkman/linkman-detail.vue'
    },

    //租赁物信息
    {
      name: 'rentthinginfo',
      path: '/rentthing',
      component: './src/rentthinginfo/rentthing-info.vue'
    },
    {
      name: 'rentthingadd',
      path: '/rentthing/add',
      component: './src/rentthinginfo/rentthing-detail.vue'
    },
    {
      name: 'rentthingdetail',
      path: '/rentthing/detail/:id',
      component: './src/rentthinginfo/rentthing-detail.vue'
    },

    //保险信息
    {
      name: 'insuranceinfo',
      path: '/insurance',
      component: './src/insuranceinfo/insurance-info.vue'
    },
    {
      name: 'insuranceadd',
      path: '/insurance/add',
      component: './src/insuranceinfo/insurance-detail.vue'
    },
    {
      name: 'insurancedetail',
      path: '/insurance/detail/:id',
      component: './src/insuranceinfo/insurance-detail.vue'
    },
    {
      name: 'busi_corp_apply',
      path: '/insurance/busi_corp_apply/:id/:prjId',
      // path: '/insurance/busi_corp_apply',
      component: './src/buni/busi_corp_apply.vue'
    },
    {
      name: 'busi_person_apply',
      path: '/insurance/busi_person_apply/:id/:prjId',
      component: './src/buni/busi_person_apply.vue'
    },

     // 合同基本信息
     {
      name: 'contractinfo-list',
      path: '/contractinfo/list',
      component: './src/contractinfo/contractinfo-list.vue'
    },
    {
      name: 'contractinfo-detail',
      path: '/contractinfo/detail/:id',
      component: './src/contractinfo/contractinfo-detail.vue'
    },
    {
      name: 'contractinfo-add',
      path: '/contractinfo/add',
      component: './src/contractinfo/contractinfo-detail.vue'
    },

    //立项信息
    {
      name: 'projectApprovalInfo',
      path: '/projectApproval',
      component: './src/projectApproval/projectApproval-table.vue'
    }, 
    {
      name: 'projectApprovalAdd',
      path: '/projectApproval/add',
      component: './src/projectApproval/projectApproval-card.vue'
    }, 
    {
      name: 'projectApprovalDetail',
      path: '/projectApproval/detail/:id',
      component: './src/projectApproval/projectApproval-card.vue'
    },

    //授信审批
    {
      name: 'creditManagement',
      path: '/creditManagement/list',
      component: './src/creditManagement/credit_management_list.vue'
    },
    {
      name: 'creditManagementAdd',
      path: '/creditManagement/detail/add',
      component: './src/creditManagement/credit_management_detail.vue'
    },
    {
      name: 'creditManagementDetail',
      path: '/creditManagement/detail/:id',
      component: './src/creditManagement/credit_management_detail.vue'
    },
  ]
}

module.exports = {
  routes: [
    {
      name: 'paymentapply-list',
      path: '/paymentapply/list',
      component: './src/payment-apply/paymentapply-list.vue'
    },
    {
      name: 'paymentapply-add',
      path: '/paymentapply/add',
      component: './src/payment-apply/paymentapply-detail.vue'
    },
    {
      name: 'paymentapply-detail',
      path: '/paymentapply/detail/:id',
      component: './src/payment-apply/paymentapply-detail.vue'
    },
    {
      name: 'paymentinout-list',
      path: '/paymentinout/list',
      component: './src/payment-inout/paymentinout-list.vue'
    },
    {
      name: 'paymentinout-add',
      path: '/paymentinout/add',
      component: './src/payment-inout/paymentinout-detail.vue'
    },
    {
      name: 'paymentinout-detail',
      path: '/paymentinout/detail/:id',
      component: './src/payment-inout/paymentinout-detail.vue'
    },
    {
      name: 'payment-plan',
      path: '/payment-plan/list',
      component: './src/payment-plan/payment-plan-list.vue'
    },
    {
      name: 'payment-add',
      path: '/payment-plan/add',
      component: './src/payment-plan/payment-plan-card.vue'
    },
    {
      name: 'payment-plan-card',
      path: '/payment-plan/card/:id',
      component: './src/payment-plan/payment-plan-card.vue'
    },
    {
      name: 'payment-execute-list',
      path: '/payment-execute/list',
      component: './src/payment-execute/payment-execute-list.vue'
    },
    {
      name: 'payment-execute-add',
      path: '/payment-execute/add',
      component: './src/payment-execute/payment-execute-card.vue'
    },
    {
      name: 'payment-execute-card',
      path: '/payment-execute/card/:id',
      component: './src/payment-execute/payment-execute-card.vue'
    },
    {
      name: 'payment-execute-main',
      path: '/payment-execute/main',
      component: './src/payment-execute/payment-execute-main.vue'
    },
    {
      name: 'loanapply-list',
      path: '/loanapply/list',
      component: './src/loanapply-info/loanapply-list.vue'
    },
    {
      name: 'loanapply-detail',
      path: '/loanapply/detail/:id',
      component: './src/loanapply-info/loanapply-detail.vue'
    },
    {
      name: 'loanapply-add',
      path: '/loanapply/add',
      component: './src/loanapply-info/loanapply-detail.vue'
    },
    {
      name: 'rentinfo-list',
      path: '/rentinfo/list',
      component: './src/rent-info/rentinfo-list.vue'
    },
    {
      name: 'rentinfo-detail',
      path: '/rentinfo/detail/:id',
      component: './src/rent-info/rentinfo-detail.vue'
    },
    {
      name: 'rentinfo-add',
      path: '/rentinfo/add',
      component: './src/rent-info/rentinfo-detail.vue'
    },
    {
      name: 'loancontinfo-list',
      path: '/loancontinfo/list',
      component: './src/loancont-info/loancontinfo-list.vue'
    },
    {
      name: 'loancontinfo-detail',
      path: '/loancontinfo/detail/:id',
      component: './src/loancont-info/loancontinfo-detail.vue'
    },
    {
      name: 'loancontinfo-add',
      path: '/loancontinfo/add',
      component: './src/loancont-info/loancontinfo-detail.vue'
    },
    {
      name: 'loanmain',
      path: '/loancontinfo/loanmain',
      component: './src/loancont-info/loanmain.vue'
    },
    {
      name: 'loanmain-change',
      path: '/loancontinfo/loanmain/:id',
      component: './src/loancont-info/loanmain.vue'
    },
    {
      name: 'bankflow-list',
      path: '/bankflow/list',
      component: './src/bankflow/bankflow-list.vue'
    },
    {
      name: 'bankflow-detail',
      path: '/bankflow/detail/:id',
      component: './src/bankflow/bankflow-detail.vue'
    },
    {
      name: 'bankflow-add',
      path: '/bankflow/add',
      component: './src/bankflow/bankflow-detail.vue'
    },
    {
      name: 'rxtbankflow-list',
      path: '/rxtbankflow/list',
      component: './src/rxt-bankflow/rxtbankflow-list.vue'
    },
    {
      name: 'rxtbankflow-detail',
      path: '/rxtbankflow/detail/:id',
      component: './src/rxt-bankflow/rxtbankflow-detail.vue'
    },
    {
      name: 'gatheraudit-list',
      path: '/gatheraudit/list',
      component: './src/gatheraudit/gatheraudit-list.vue'
    },
    {
      name: 'gatheraudit-detail',
      path: '/gatheraudit/detail/:id',
      component: './src/gatheraudit/gatheraudit-detail.vue'
    },
    {
      name: 'gatheraudit-add',
      path: '/gatheraudit/add',
      component: './src/gatheraudit/gatheraudit-detail.vue'
    },
    {
      name: 'rxtdebitrecord-list',
      path: '/rxtdebitrecord/list',
      component: './src/rxt-debitrecord/rxtdebitrecord-list.vue'
    },
    {
      name: 'rxtdebitrecord-detail',
      path: '/rxtdebitrecord/detail/:id',
      component: './src/rxt-debitrecord/rxtdebitrecord-detail.vue'
    },
    {
      name: 'rxtdebitrecord-add',
      path: '/rxtdebitrecord/add',
      component: './src/rxt-debitrecord/rxtdebitrecord-detail.vue'
    },
    {
      name: 'signbill-add',  //签发汇票添加
      path: '/signbill/add',
      component: './src/bill-info/signbill_detail.vue'
    },
    {
      name: 'signbill-detail',  //添加汇票详情
      path: '/signbill/detail/:id/:eid',
      component: './src/bill-info/signbill_detail.vue'
    },
    {
      name: 'signbill-list',   //签发汇票列表
      path: '/signbill/list',
      component: './src/bill-info/signbill_list.vue'
    }, 
    {
      name: 'acceptbill-add',  //收付汇票添加
      path: '/acceptbill/add',
      component: './src/bill-info/acceptbill_detail.vue'
    },
    {
      name: 'acceptbill-detail',  //收付汇票详情
      path: '/acceptbill/detail/:id/:eid',
      component: './src/bill-info/acceptbill_detail.vue'
    },
    {
      name: 'acceptbill-list',   //收付汇票列表
      path: '/acceptbill/list',
      component: './src/bill-info/acceptbill_list.vue'
    }
  ]
}

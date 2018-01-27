module.exports = {
  routes: [
    {
      name: 'holidayManage-list',
      path: '/holidayManage/list',
      component: './src/holidayManage-table.vue'
    },
    {
      name: 'holidayManage-detail',
      path: '/holidayManage/detail/:id',
      component: './src/holidayManage-card.vue'
    },
    {
      name: 'holidayManage-add',
      path: '/holidayManage/add',
      component: './src/holidayManage-card.vue'
    }
  ]
}
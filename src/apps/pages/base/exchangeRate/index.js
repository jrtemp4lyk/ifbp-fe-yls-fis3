module.exports = {
  routes: [
    {
      name: 'currInfo-list',
      path: '/currInfo/list',
      component: './src/curr-info-list.vue'
    },
    {
      name: 'currInfo-detail',
      path: '/currInfo/detail/:id',
      component: './src/curr-info-detail.vue'
    },
    {
      name: 'currInfo-add',
      path: '/currInfo/add',
      component: './src/curr-info-detail.vue'
    }
  ]
}
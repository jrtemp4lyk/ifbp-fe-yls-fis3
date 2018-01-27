module.exports = {
  routes: [
    {
      name: 'quote-list',
      path: '/quote/list',
      component: './src/quote-list.vue'
    },
    {
      name: 'quote-detail',
      path: '/quote/detail/:id',
      component: './src/quote-detail.vue'
    },
    {
      name: 'quote-add',
      path: '/quote/add',
      component: './src/quote-detail.vue'
    },
    {
      name: 'product_list',
      path: '/productsolution/list',
      component: './src/product-list.vue'
    },
    {
      name: 'product_detail',
      path: '/productsolution/detail/:id',
      component: './src/product-detail.vue'
    },
    {
      name: 'product_add',
      path: '/productsolution/add',
      component: './src/product-detail.vue'
    },
  ]
}

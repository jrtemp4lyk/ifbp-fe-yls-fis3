module.exports = {
    routes: [
        {
            name: 'saleInfoList',
            path: '/sale/saleList',
            component: './src/sale-list.vue'
        },
        {
            name: 'saleInfoDetail',
            path: '/sale/saleInfo/detail/:id',
            component: './src/sale-info.vue'
        },
        {
            name: 'saleInfoAdd',
            path: '/sale/saleInfo/add',
            component: './src/sale-info.vue'
        }
    ]
}
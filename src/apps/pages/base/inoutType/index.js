module.exports = {
    routes: [
        {
            name: 'inoutTypeInfo',
            path: '/inoutType',
            component: './src/inoutTypeInfo/inoutType-info.vue'
        }, 
        {
            name: 'inoutTypeAdd',
            path: '/inoutType/add',
            component: './src/inoutTypeInfo/inoutType-detail.vue'
        }, 
        {
            name: 'inoutTypeDetail',
            path: '/inoutType/detail/:id',
            component: './src/inoutTypeInfo/inoutType-detail.vue'
        }
    ]
}
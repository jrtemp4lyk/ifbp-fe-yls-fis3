module.exports = {
    routes: [{
        name: 'iface-valuemap-info',
        path: '/iface/valuemaplist',
        component: './src/dataval/iface-valuemap-info.vue'
    },{
        name: 'iface-config-info',
        path: '/iface/serviceconfig',
        component: './src/config/iface-config.vue'
    },{
        name: 'iface-config-info',
        path: '/iface/servicelog/:configid',
        component: './src/config/iface-service-log.vue'
    },{
        name: 'iface-wechat-user',
        path: '/iface/wechat/user',
        component: './src/wechat/wechat-user.vue'
    },{
        name: 'iface-accasstype',
        path: '/iface/accasstype',
        component: './src/fin/iface-accasstype.vue'
    },{
        name: 'iface-assdoc',
        path: '/iface/assdoc',
        component: './src/fin/iface-assdoc.vue'
    },{
        name: 'iface-accname',
        path: '/iface/accname',
        component: './src/fin/iface-accname.vue'
    },{
        name: 'iface-prevoucherlist',
        path: '/iface/prevoucherlist',
        component: './src/fin/iface-prevoucherlist.vue'
    },{
        name: 'iface-prevouchercard',
        path: '/iface/prevouchercard/:voucherid',
        component: './src/fin/iface-prevouchercard.vue'
    },{
        name: 'iface-prevoucherdrools',
        path: '/iface/prevoucherdrools',
        component: './src/fin/iface-prevoucherdrools.vue'
    },{
        name: 'iface-prevoucherdroolsdetail',
        path: '/iface/prevoucherdroolsdetail/:droolsid',
        component: './src/fin/iface-prevoucherdrools-detail.vue'
    },{
        name: 'iface-prevoucherdroolsadd',
        path: '/iface/prevoucherdroolsadd',
        component: './src/fin/iface-prevoucherdrools-detail.vue'
    }]
}
module.exports = {
    routes: [
        {
            name: 'interestRateInfo',
            path: '/interestRate',
            component: './src/interestRate-table.vue'
        }, 
        {
            name: 'interestRateAdd',
            path: '/interestRate/add',
            component: './src/interestRate-card.vue'
        }, 
        {
            name: 'interestRateDetail',
            path: '/interestRate/detail/:id',
            component: './src/interestRate-card.vue'
        }
    ]
  }
  
module.exports = {
	// 合同列表页面
	routes : [ {
		name : 'modifyContract-list',
		path : '/contr/modify/contractinfo',
		component : './src/contractModify/contractMain/contractMain-list.vue'
	},
	// 合同新增页面
	 {
		name : 'modifyContract-add',
		path : '/contr/modify/contractinfo/add/:changetype/:oldid',
		component : './src/contractModify/contractMain/contractMain-detail.vue'
	},
	// 合同新增页面
	{
		name : 'modifyContract-edit',
		path : '/contr/modify/contractinfo/edit/:editId/:flag/:changetype',
		component : './src/contractModify/contractMain/contractMain-detail.vue'
	},
	// 合同卡片页面
	{
		name : 'modifyContract-card',
		path : '/contr/modify/contractinfo/detail/:id/:changetype',
		component : './src/contractModify/contractMain/contractMain-detail.vue'
	},
	// 保险信息
	{
		name : 'modifyCustpledge',
		path : '/contr/pledge',
		component : './src/contractModify/insuranceModify/custpledge-modify-info.vue'
	}, 
	// 租赁物信息
	{
		name : 'modifyRentthing',
		path : '/contr/rentthing',
		component : './src/contractModify/rentthingModify/rentthing-modify.vue'
	}, 
]
}

import Vue from "vue"
var bus = new Vue();
/*
 		完整菜单信息的数据中心
 		@bus vue提供的非父子组件的一种数据通信方式
 		@route 完整菜单信息
 * */
export default {
	bus:bus,
	menu:[]
}

import Vue from "vue"
import axios from "axios"
import qs from "qs"
import bus from "./bus.js"
var defaultConf = {
	/*
	 	数据集合
	 	@param {baseUrl} 需要提交的数据的地址
	 	@param {formData} 提交的数据的
	 	@param {params} 提交的额外的参数
	 	@param {callbackMethods} 是否执行自定义的函数(false:不执行)
	 * */
	data() {
		return {
			baseUrl: "",
			formData: "",
			currentTable: {},
			currentComponent: {},
			params: {},
			callbackMethods: false
		}
	}
}
const successCallback = function(config) {
	config.$message({
		showClose: true,
		message: '保存成功',
		type: 'success',
		duration: 1000
	});
	config.currentComponent.$emit("hide")
	config.currentTable.loadTableData()
}
const errorCallback = function(config) {
	config.$message({
		showClose: true,
		message: '保存失败',
		type: 'error',
		duration: 1000
	});
	config.currentComponent.$emit("hide")
	config.currentTable.loadTableData()
}

const successRemoveCallback = function(config) {
	config.$message({
		showClose: true,
		message: '删除成功',
		type: 'success',
		duration: 1000
	});
	config.currentComponent.$emit("hide")
	config.currentTable.loadTableData()
}
const errorRemoveCallback = function(config) {
	config.$message({
		showClose: true,
		message: '删除失败',
		type: 'error',
		duration: 1000
	});
	config.currentComponent.$emit("hide")
	config.currentTable.loadTableData()
}

/*
 * 切换页面状态
 * @param {pageState} 页面状态的集合
 * @param {state} 编辑页或者详情页(true：编辑页)
 * */

const _commitDataRemove = function(config) {

		//vue提供的混合对象的方法，合并配置
		var Config = new(Vue.extend({
				mixins: [defaultConf, config]
			}))()
			//合并表单以及自定义参数
		var data = Object.assign({}, Config.params, Config.formData)
			/*
			 axios提交数据*/
		axios.post(Config.baseUrl, qs.stringify(data)).then(function(response) {
				if (response.data.success) {
					if (Config.callbackMethods)
						Config.onSaveSuccess(response.data)
					else {
						successRemoveCallback(Config)
					}
				} else {
					if (Config.callbackMethods)
						Config.onSaveError(response.data);
					else {
						errorRemoveCallback(Config);
					}
				}
				window.bus.$emit("load-tree")

			})
			.catch(function(error) {
				if (Config.callbackMethods)
					Config.onSaveError(error);
				else {
					errorRemoveCallback(Config);
				}
				window.bus.$emit("load-tree")
				
			});

	}
	/*
	 	提交数据
	 	@param {config} 自定义参数配置
	 * */
const _commitData = function(config) {
	//vue提供的混合对象的方法，合并配置
	var Config = new(Vue.extend({
			mixins: [defaultConf, config]
		}))()
		//合并表单以及自定义参数
	var data = Object.assign({}, Config.params, Config.formData)
		/*
		 axios提交数据*/
	axios.post(Config.baseUrl, qs.stringify(data))
		.then(function(response) {
			debugger
			if (response.data.success) {
				if (Config.callbackMethods) {
					Config.onSaveSuccess(response.data)
				} else {
					successCallback(Config)
				}
				if (Config.afterSuccessSave)
					Config.afterSuccessSave(response.data)
			} else {
				if (Config.callbackMethods) {
					Config.onSaveError(response)
				} else {
					errorCallback(Config)
				}
				if (Config.afterErrorSave)
					Config.afterErrorSave(response);
			}
			window.bus.$emit("load-tree")

		})
		.catch(function(error) {
			if (Config.callbackMethods)
				Config.onSaveError(error)
			else
				errorCallback(Config)
				window.bus.$emit("load-tree")
		});
}

/**
 * 设置cookie
 * cookieName 
 * cookieValue
 * expiredays 有效期（天）
 */

const _setCookie = function(cookieName, cookieValue, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * 根据cookieName取值
 */
const _getCookie = function(cookieName) {
	if (document.cookie.length > 0) {
		var cookieValue = document.cookie;
		var c_start = cookieValue.indexOf(cookieName + "=")
		if (c_start != -1) {
			c_start = c_start + cookieName.length + 1
			var c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1) c_end = cookieValue.length
			console.log(cookieValue);
			return unescape(cookieValue.substring(c_start, c_end))
		}
	}
	return ""
}

const _dicData = function(config) {
	var pubDicTypeList = "";
	for (var i = 0; i < config.dicType.pub.length; i++) {
		pubDicTypeList += config.dicType.pub[i] + ","
	}

	var praDicTypeList = "";
	for (var i = 0; i < config.dicType.pra.length; i++) {
		praDicTypeList += config.dicType.pra[i] + ","
	}

	var param = {
		"pubDic": pubDicTypeList,
		"praDic": praDicTypeList
	};
	axios.post(config.dicUrl, qs.stringify(param)).then(function(response) {
		config.callback(response.data);
	})
}

/*
 	对外提供的接口
 * */
export default {
	saveData: (config) => {
		_commitData(config)
	},
	removeData: (config) => {
		_commitDataRemove(config)
	},
	getDicData: (config) => {
		_dicData(config);
	},
	setCookie: (cookieName, cookieValue, expiredays) => {
		_setCookie(cookieName, cookieValue, expiredays);
	},
	getCookie(cookieName) {
		return _getCookie(cookieName);
	},
	pageState: function(active) {
		this.active = active;
		this.activearr = [active]
		this.goNext = function(page, btnName) {
			this.active = page
			this.activearr.push(page)
			if (btnName)
				bus.bus.$emit("setPage", true, btnName)
			else
				bus.bus.$emit("setPage", true, "详情")
		}
		this.goBack = function() {
			if (this.activearr.length === 1)
				return;
			this.activearr.pop()
			bus.bus.$emit("setPage", false)
			this.active = this.activearr[this.activearr.length - 1]

		}
	}
}
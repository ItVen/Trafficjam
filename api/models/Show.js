/**
 * Show.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 *
 *用户提交后保存的表单
 *
 *属性有
 *用户名,用户头像(可以关联用户表)
 *地理位置信息(经纬度和地名)
 *堵车状态
 *堵车原因 (可多选的字符串 ','隔开的)
 *情绪表达 (','隔开的)
 *自定义情绪(可为空)
 */

 module.exports = {
 	tableName: 'show',
 	attributes: {
 		state:'integer',//状态 
 		reason:'string',//原因
 		custom:'string',//自定义
 		think:'string', //想法
 		//TODO 关联用户信息

 		//TODO 地理位置
 	}
 };


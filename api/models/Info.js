/**
 * Info.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 *第二页的有两个功能:
 *	一、数据展示:
 *			1、堵车的状态 0-3
 *			2、堵车原因 （4个）
 *			3、情绪表达 （6个）
 *	二、数据上传 ：
 *			1、地理位置信息 （经纬度+详细信息）
 *			2、堵车状态
 *			3、堵车原因
 *			4、情绪表达选择
 *			5、自定义表达（10字内）
 *			6、个人信息
 */

 module.exports = {
 	tableName: 'info',
 	attributes: {
 		traffic:{
 			type:'integer'
 		},
 		reason:{
 			type:'string'
 		},
 		think:{
 			type:'string'
 		},
 		custom:{
 			type:'string'
 		},
 		imag:{
 			type:'string'
 		},
 		city:{
 			type:'string'
 		},
 		district:{
 			type:'string'
 		},
 		nation:{
 			type:'string'
 		},
 		province:{
 			type:'string'
 		},
 		street:{
 			type:'string'
 		},
 		street_number:{
 			type:'string'
 		},
 		user_id:{
			type:'string'
 		},
 		delay:{
 			type:'string'
 		},
 		data:{
 			type:'integer'
 		},
	location:{
		type: 'json'
	}
	//TODO 关联表暂时不做
}
};


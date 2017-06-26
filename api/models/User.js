/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/
 *
 *保存用户信息 --(微信的用户信息)
 * 用户头像(有特殊符号,需要转码显示)
 * 用户名
 * session(微信的长连接保持机制)
 */

module.exports = {
  tableName: 'user',
 	attributes: {
 		//用户上传
		userPush:{
			type:'json',
		},
		
		session_key:{
			type:'string'
		},
		openid:{
			type:'string',
			unique: true //唯一
		}
		
	}
};


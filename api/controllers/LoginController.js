/**
 * LoginController
 *
 * @description :: Server-side logic for managing logins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 *微信注册登录页面接口
 *
 *
 */
 const https = require('https');
// let appid ='wxa96da6eef87853eb'//微信小程序的appid
// let secret = '3caa377712a500b8385b85d0a91d327b'

// const down = require('../services/downImage')
module.exports = {
	add: function (req, res) {
        // 由请求参数构造待创建Feedback对象
        let user = req.allParams();
        let js_code=user.wxcode;
        let that= res
        //https 请求
        var options = {
        	hostname: 'api.weixin.qq.com',
        	port: 443,
        	path: '/sns/jscode2session?appid=wxa96da6eef87853eb&secret=3caa377712a500b8385b85d0a91d327b&grant_type=authorization_code&js_code='+js_code,
        	method: 'GET',
        	headers: {  
        		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
        	} 

        };
        var req = https.request(options, function (res) {

        	res.setEncoding('utf8');
        	res.on('data', function(data){
				//创建用户
				let json = JSON.parse(data)
				let userData ={
					userPush:user,
					openid:json.openid,
					session_key:json.session_key
			}
			
			
			//检查是否存在openID
			User.findOne({"openid":json.openid}).exec(function find(err, db){
				if(err){
					console.log(err);
				}else{
					// console.log(db);
					//没有数据时网数据库里添加用户
					if(db){
						//下载用户头像到本地
						let user = db.userPush.rawdata
						//TODO 判断图片的存储时间1天存放一次
						
						// downImage.down(JSON.parse(user).avatarUrl,db.id);
						// downImage.crop(db.id);
						// that.json({"session_key":db.id})
						return that.json({
		                	"code":"200",
		                	'info':{"session_key":db.id}
		            	})
						
					}else{
						User.create(userData).exec(function createCB(err, created) {
							if (err) {
					                // 如果有误，返回错误
					                return that.json({
					                	"code":"417",
					                	'info':err
					            	})
					            } else {
					            	//2.0后弃用 下载用户头像到本地 
					            	// let user = created.userPush.rawdata
					            	// downImage.down(JSON.parse(user).avatarUrl,created.id);
					            	// that.json({"session_key":created.id})
					            	return that.json({
					                	"code":"200",
					                	'info':{"session_key":created.id}
					            	})
					            }
					        });
					}
				}
			})
			
		});
    	res.on('error', function(e){
    		console.log(e);
    		return that.json({
            	"code":"418",
            	'info':e
        	})
    	});

        });
        req.end();
    },
};


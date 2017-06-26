/**
 * InfoController
 *
 * @description :: Server-side logic for managing infoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
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

 //这里需要数据库的操作功能比较多
 
 module.exports = {

 	//展示接口完成
 	show:function(req,res){
 		let reason=[]
 		let think = []
 		let stats =0
 		Data.find().exec(function (err,data) {
 			if(err){
 				console.log(data)
 			}else{
 				data.forEach(function(item,index){
 					if(data[index].reason){
 						reason.push(data[index].reason)
 					}
 					/***2.0添加的数据*/
 					// if(data[index].think){
 					// 	think.push(data[index].think)
 					// }
 				})
 				if(data.length==0){
 					console.log('无数据')
 				}
 				let mydata={
 					reason:reason,
 					think: think,
 					stats:stats
 				}
 				res.json(mydata)
 			}

 		})
 	},

	//用户提交的选择信息
	save:function(req,res){
		var start = Date.parse(new Date());
		var info = req.allParams();
		// console.log(info)
		//保存用户信息到数据库
		id = req.headers.ucloudtech_3rd_key
		User.findOne({"id":id}).exec(function(err,db){
			if(err){
				console.log(err);
				return res.json({"info":err,'code':102})
			}else{
				// let user = JSON.parse(db.userPush.rawdata)  ////2.0 后去取消此功能
				// palce = info.city+info.district+info.street_number//2.0 后去取消此功能
				//TODO funImage
				// downImage.show(id,user.nickName,palce,info.delay,"",start);//2.0 后去取消此功能
				var data ={
					// imag: id+"_"+start+'.png', //2.0 后不生成图片
					traffic:info.traffic,
					// think:info.think,   //2.0后修改
					custom:info.custom,
					location:info.location,
					city:info.city,
					district:info.district,
					nation:info.nation,
					province:info.province,
					street:info.street,
					reason:info.reason,
					user_id:info.user_id,
					data:info.data,
					// delay:info.   //2.0 后去取消此功能
				}
				Info.create(data).exec(function createCB(err, created) {
					if (err) {
		                // 如果有误，返回错误
		                return res.json({"err":err,'code':101,'info':'写入失败'})
		            } else {
		                //TODO 提示
		                return res.json({"info":"写入成功!",'code':100})
		            }
		        });
			}

		});
		
scp root@wxapp.ucloudtech.com:/home/wen/Desktop  ~/Traffica.tar.tgz 

		
		
	},

	
	// 
	delet:function(req,res){
		var query=req.allParams()
		console.log(query)
		if(query ==undefined){
			return res.badRequest('id err');
		}else{

			if(query.reason!==""){
				
				query={reason:query.reason}

			}else if(query.think!==""){
				query={think:query.think}

			}
			console.log(query)
			Data.destroy(query,function(err,movie){
				if(err){
					return res.badRequest(err);
				}else{
					let reason=[]
					let think = []
					let fun = new Array;
					Data.find().exec(function (err,data) {
						if(err){
							return res.badRequest(err+'错误');
						}else{
							data.forEach(function(item,index){
								if(data[index].reason){
									reason.push(data[index].reason)
								}
								if(data[index].think){
									think.push(data[index].think)
								}
							})
							Fun.find().exec(function (err,data) {
								fun=data;
								return res.render("page/infoDetail",{
									title: "文案",
									reason:reason,
									think: think,
									fun:fun,
								});
							});
						}
					})
				}
			});
		}
		



	},
	//添加数据到数据库
	add:function(req,res){
		var data = req.allParams()
		Data.create(data).exec(function createCB(err,created){
			if (err) {
                // 如果有误，返回错误
                return res.badRequest('写入失败');
            } else {
                //TODO 提示
                let reason=[]
                let think = []
                let fun = new Array;
                Data.find().exec(function (err,data) {
                	if(err){
                		return res.badRequest(err+'错误');
                	}else{
                		data.forEach(function(item,index){
                			if(data[index].reason){
                				reason.push(data[index].reason)
                			}
                			if(data[index].think){
                				think.push(data[index].think)
                			}
                		})
                		Fun.find().exec(function (err,data) {
                			fun=data;
                			return res.render("page/infoDetail",{
                				title: "文案",
                				reason:reason,
                				think: think,
                				fun:fun,
                			});
                		});
                	}
                })
            }

        })
	}

};

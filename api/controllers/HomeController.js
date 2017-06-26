/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 * 首页:返回一张图片和一段文字
 *  	需要上传个人的用户信息
 *		周围的人数 (随机shu)
 *有两个动作暴露 
 **
 *2.0 
 *首页 返回目的的/出发点
 */
 var fs = require('fs');
 var Path = require('path');
 var imgName=[];
 let imagePath= new Array();

 function walkDir (dirPath) {

 	fs.readdir(dirPath, function (err, entires) {
 		if(err){
 			console.log(err);
 		}else{
 			imgName=[];
 			for (var idx in entires) {
 				var fullPath = Path.join(dirPath, entires[idx]);
 				(function (fullPath) {
 					fs.stat(fullPath, function (err, stats) {
 						if (stats && stats.isFile()) {
 							imgName.push(Path.basename(fullPath))
 						}
 					})
 				})(fullPath);
 			}
 		}

 	});
 }
 function initImage( ishome ){
 	imagePath=[];
 	for (var index in imgName) {
 		if(index >5 && ishome){
 			console.log(ishome +"---jumb")
 			break;
 		}
 		imagePath.push('/'+imgName[index])
 	}

 	// console.log(imagePath+"------images-----")
 	return imagePath;
 }



 
 walkDir('assets/images');
 module.exports = {
	//TODO 获取微信上传的信息
	show:function(req,res){
		console.log(imgName)
		var length = imgName.length
		var num = Math.random()*(length-1);
		num = parseInt(num, 10);
		var date = new Date();
		var month = date.getMonth() + 1;
		var around = Math.random()*1000+20;
		around=parseInt(around, 10)
		var data={
			year:date.getFullYear(),
			month :month,
			day:date.getDate(),
			around: around,
			image:imgName[num]
		}
		return res.json(data) //前端拼接的方案可行
	},


	//后台界面添加修改图片
	add:function(req,res){
		
		req.file('upload').upload({
			maxBytes: 10000000,
			dirname: '../../assets/images',
			
			
		}, function (err, uploadedFiles){
			if(err){
				return res.serverError(err);
			}
			else if(uploadedFiles.length === 0){
			    // proceed without files
			    return res.badRequest('No file was uploaded');
			}
			else{
			    //  handle uploaded file
			    walkDir('assets/images'); 
			    return res.render("page/image",{
			    	title: "Images",
			    	images: initImage(false)
			    });
			}
		});
		
	},

		//后台界面删除图片
		delet:function(req,res){
			var query=req.allParams();
			console.log(query)
			if(query.name==""){
				return res.badRequest('错误');
			}else{
				var dname = query.name.replace("/","")
				let dirPath = 'assets/images/'+dname
				// console.log(dirPath)
				fs.exists(dirPath,function(exists){
					console.log(exists);
					if(exists){
						fs.unlinkSync(dirPath);
						console.log("delet")
						walkDir('assets/images'); 
						return res.render("page/image",{
							title: "Images",
							images: initImage(false)
						});
					}else{
						return res.badRequest('no file');
					}
				});
			}
			

			
		},
		
		home:function(req,res){
			//Info
			let reason=[]
			let think = []
			let fun = new Array;
			let feedback =new Array;
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
						// fun=data;
						for (var index in data) {
							if(index>1){
								break;
							}
							fun.push(data[index])

						}
						// console.log(fun)
						Feeback.find() .exec(function getData(err,data){

							if(err){
								console.log(err)
							}else{
								// feedback=data;
								for (var index in data) {
									if(index>1){
										break;
									}
									feedback.push(data[index])

								}

								// console.log(feedback)
								return res.render("page/home",{
									title: "TrafficJam Home",
									images:initImage(true),
									reason:reason,
									think: think,
									fun:fun,
									feedback:feedback,
								});
							}
						});
					});
				}
			})
		}
	};



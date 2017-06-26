/**
 * WebController
 *
 * @description :: Server-side logic for managing webs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var fs = require('fs');
 var Path = require('path');
 var imgName=[];
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
 function initImage(){
 	let imagePath= new Array();
 	for (var index in imgName) {
 		imagePath.push('/'+imgName[index])
 	}
 	return imagePath;
 }
 walkDir('assets/images');
 module.exports = {

 	showAllImage:function(req,res){
 		walkDir('assets/images');
 		return res.render("page/image",{
 			title: "Images",
 			images:initImage(),
 		});
 	},
 	uploadeThink:function(req,res){

 	},
 	showInfo:function(req,res){
 		//Info
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


 };


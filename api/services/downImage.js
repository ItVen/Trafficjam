//这个是下载用户头像的服务
var request = require('request');
var Path = require('path')

var fs = require('fs');
PNG = require('pngjs').PNG;
var gm = require('gm');
var gm2 = require('gm').subClass({ imageMagick: true });
var size = 200;
var fileUrl  = 'http://image.tianjimedia.com/uploadImages/2015/129/56/J63MI042Z4P8.jpg';
/*
* url 网络文件地址
* filename 文件名
* callback 回调函数
*/

function downloadFile(uri,filename,callback){
	var stream = fs.createWriteStream(filename);
	
	request(uri).pipe(stream).on('close', callback); 
}

/**
* 根据id删除图片
*/
function deletImage(id,time){
	// var Cts = "bblText";
	// if(){
	// 	console.log('Cts中包含Text字符串');
	// } 
	let dirPath = 'assets/images/show/'
	fs.readdir(dirPath, function (err, entires) {
		if(err){
			console.log(err);
		}else{
			time = time+""
			for (var idx in entires) {
				var fullPath = Path.join(dirPath, entires[idx]);
				(function (fullPath) {
					fs.stat(fullPath, function (err, stats) {
						if (stats && stats.isFile()) {
 							//查找匹配id的图片,删除掉 除了生成的一张,其他的都删除
 							//imgName.push(Path.basename(fullPath))
 							let name =Path.basename(fullPath)
 							console.log(name+"-------"+time)
 							if(name.indexOf(time) > 0 ){
 								console.log('name中包含time字符串');
 								if((name+'_'+time)==(id +"_"+time)){
 									console.log(fullPath)
 								}else{
 									console.log(name)
 								}
 							}else{
 								console.log(fullPath)
 								//delet file
 								fs.unlinkSync(fullPath);
 								//console.log(fullPath)
 							}
 							
 						}
 					})
				})(fullPath);
			}
		}

	});
}
/***
*
*裁剪圆形图片
*
**/
function crop(id){
	var original = 'assets/images/header/'+id+'.png';
	var output = 'assets/images/header/out_'+id+'.png';
	gm2(original)
		.resize(size, size,'!')//设置图片大小
		.write(original, function(err) {
			if(!err){
				gm2(size, size, 'none')
				.fill(original)
				.drawCircle(size/2,size/2, size/2, size/10)
				.write(original, function(err) {
					console.log(err || 'done');
				});
			}
			
		});
	}

	module.exports = {

		down :function(url,id){
		//TODO图像存储在assets/images/header/_id.png
		let filename = 'assets/images/header/'+id+'.png';

		downloadFile(url,filename,function(){
			console.log(filename+'下载完毕');
			//TODO 裁剪图片
			crop(id)
			
		});
	},
	

	//合并生成图片,并返回图片的生成路径
	show:function(path,name,addr,time,think,out){
		//todo 删除以前的图片
		deletImage(path,out)

		var _info = "总有些天真的人类以为\n\t\t堵车多按几下喇叭\n\t\t\t\t车就会动起来";
		Fun.find().exec(function (err,data) {
			var length = data.length
			if(length>0){
				var num = Math.random()*length;
				num = parseInt(num, 10);
				var str =data[num].fun.replace(new RegExp("\\\\t","gm"),"\t")
				str = str.replace(new RegExp("\\\\n","gm"),"\n")
				_info=str
			}

			if(time.length==1){
				gm(640, 960, "#ffffff")  
				.draw('image Over 0, 0 640, 260 "assets/images/number/bg_white.png"') 
				.draw('image Over 0, 260 640, 700 "assets/images/number/bg.png"')

			.draw('image Over 35, 20 100, 100 "assets/images/header/'+path+'.png"')//头像的位置
			.draw('image Over 30, 15 80, 80 "assets/images/number/top.png"')//头像的位置
			.draw('image Over 270, 158 24, 31 "assets/images/number/n_'+time+'.png"')//设置时间位置<1位数时>
			
			.font('assets/fonts/PingFang.ttf',25)//设置字体
			.drawText(150, 60 ,name+"\t 被堵在了")
			// .drawText(150, 60 ,"地理位置地理位置地理位置地理位置被堵在了")	//TODO用户名
			.drawText(150, 100,addr)	//TODO地理位置
			//TODO 用户选择的话
			.draw('image Over 0, 300 213, 110 "assets/images/number/word_1.png"')//设置时间位置<1位数时>
			.draw('image Over 213, 300 213, 110 "assets/images/number/word_2.png"')//设置时间位置<1位数时>
			.draw('image Over 426, 300 213, 110 "assets/images/number/word_2.png"')//设置时间位置<1位数时>
			.font('assets/fonts/W5.TTC',35)//设置字体
			
			.drawText(160, 500,_info)	//一些有趣的话
			.write('assets/images/show/'+path+"_"+out+'.png', function(err) {        
				if (!err){  
					console.log('done');
					//返回图片路径
					return 'assets/images/show/'+path+"_"+out+'.png'

				}else{console.log(err.message || "出错了！"); } });

		}else if(time.length==2){
			if(time.charAt(0)!="-"){
				gm(640, 960, "#ffffff")  
				.draw('image Over 0, 0 640, 260 "assets/images/number/bg_white.png"') 
				.draw('image Over 0, 260 640, 700 "assets/images/number/bg.png"')

			.draw('image Over 35, 20 100, 100 "assets/images/header/'+path+'.png"')//头像的位置
			.draw('image Over 30, 15 80, 80 "assets/images/number/top.png"')//头像的位置
			.draw('image Over 255, 158 24, 31 "assets/images/number/n_'+time.charAt(0)+'.png"')//当有两位数
			.draw('image Over 280, 158 24, 31 "assets/images/number/n_'+time.charAt(1)+'.png"')
			.font('assets/fonts/PingFang.ttf',25)//设置字体
			.drawText(150, 60 ,name+"\t 被堵在了")	//TODO用户名
			.drawText(150, 100,addr)	//TODO地理位置
			//TODO 用户选择的话
			.draw('image Over 0, 300 213, 110 "assets/images/number/word_1.png"')//设置时间位置<1位数时>
			.draw('image Over 213, 300 213, 110 "assets/images/number/word_2.png"')//设置时间位置<1位数时>
			.draw('image Over 426, 300 213, 110 "assets/images/number/word_2.png"')//设置时间位置<1位数时>
			.font('assets/fonts/W5.TTC',35)//设置字体
			.drawText(160, 520,_info)	//一些有趣的话
			.write('assets/images/show/'+path+"_"+out+'.png', function(err) {        
				if (!err){  
					console.log('done');
					//返回图片路径
					return 'assets/images/show/'+path+"_"+out+'.png'

				}else{console.log(err.message || "出错了！"); } });
		}


	}

});
		

		

	},
	


}




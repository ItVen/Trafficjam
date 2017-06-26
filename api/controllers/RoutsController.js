/**
 * RoutsController
 *
 * @description :: Server-side logic for managing Routs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
const https = require('https');
const querystring = require('querystring');
const key = '043d1bcd92f7602cd9825bd8f6fd5be7';
const hostname ="restapi.amap.com";
const oldTime =0;//时间

/**
*交通态势
*/
 function getTaiShi(laction,cb1,cb2,cb3){
 	console.log('---getTaiShi----'+laction)
 	let post_data = querystring.stringify({
      'location' : laction,
      'radius':'800',
      // 'level':'5',
      // 'extensions':'all',
      'key':key
    }); 
	let options = {  
	    hostname: hostname,
	    path: '/v3/traffic/status/circle?'+post_data,
		method: 'GET',
	}; 
	let body = [];
	let req = https.request(options, function (res) {  
	    res.setEncoding('utf8');  
	    res.on('data', function (response) {

	    	body.push(response);
	    });  
	    res.on('end', function() {
			let info = JSON.parse(body.join(''));

	    	let des =info.trafficinfo.description;
	    	let  description = des.toString().split('；');
	    	let street =[];
	    	for (let index in description){
	    		let addr = description[index];
	    		if(addr.match(/畅通/)){
	    			let name = description[index].split("：")
	    			street.push(name[0])
	    		}
	    	}
	    	if(street.length>0){
	    		getCode(street.join("|"),cb1,cb3);
	    	}else{
	    		//返回堵死了
	    		cb2()
	    	}

	    });
	    res.on('error', function(e){
			cb3(e)
		});
	});
	req.end();

 }

/**
*地理位置编码
*/ 
function getCode(name,cb1,cb3){
	console.log('---getCode---'+name) 	
	const codes = [];
	var post_data = querystring.stringify({
      'address' : name,
      'batch':true,
      'key':key
    }); 
	var options = {  
	    hostname: hostname,
	    path: '/v3/geocode/geo?'+post_data,
		method: 'GET',
	}; 
	let body = [];
	let req = https.request(options, function (res) {  
	    res.setEncoding('utf8');  
	    res.on('data', function (response) { 
	    	body.push(response);
	    });   
	    res.on('end', function() {
	    	const info  = JSON.parse(body.join(''));
	    	const geocodes = info.geocodes;
	    	for (const index in geocodes ){
	    		if(geocodes[index].location !==[]){
					codes.push(geocodes[index].location)
	    		}
	    	}
	    	//todo 根据codes进行新的路径规
	    	cb1(codes,true,name)

	    });  
	    res.on('error', function(e){
	    	console.log('---getCode--e-'+e)
			cb3(e);
		});
	});
	req.end();
}


/**
*路径规划
*/ 
function getRoutes(myorigin,origin,destination,isNew,cb1,cb2,cb3){
	console.log("getRoutes--origin--"+ origin);
	console.log("getRoutes---destination--"+destination);
	let data = [];
	let post_data = querystring.stringify({
      'strategy' : '4',
      'origin': origin,//出发点
      'destination': destination, // 目的地
      'extensions':'all',
      'key':key
    }); 
	let options = {  
	    hostname: hostname,
	    path: '/v3/direction/driving?'+post_data,
		method: 'GET',
	}; 
	var req = https.request(options, function (res) {
	    res.setEncoding('utf8');  
	    res.on('data', function (response) {  
	    	console.log("getRoutes--body.route--"+ response);
	      data.push(response);
	    });  
	    res.on('end', function() {
	      var body = JSON.parse(data.join(''));
	      if(body.infocode.match('10000')){
	      		 if (isNew) {
		          // 判断时间 返回数据 yes or no
		          console.log("getRoutes--body.route--"+ body.route);
		          if(body.route){
			          	const time = body.route.paths[0].duration
			          if(parseInt(time)<oldTime || parseInt(time)< (oldTime+600)){
			          	//重新规划我的路线 
			          	getmiddlewareRoutes(myorigin,origin,parseInt(time),cb1,cb3);
			          }else{
			          	cb3(null); 
			          }
		          }else{
		          	cb3(null); 
		          }
		          
		      }else{
		        //todo 返回数据
		        cb2(JSON.stringify(body.route.paths));
		      }
	      }else{
	      	cb3(JSON.stringify(body)); 
	      }
	     
	    });
	    res.on('error', function(e){
			console.log(e);
			b3(e);
		});
	});
	req.end();
}

function getmiddlewareRoutes(origin,destination,newTime,cb1,cb3){
	let data = [];
	let post_data = querystring.stringify({
      'strategy' : '4',
      'origin': origin,//出发点
      'destination': destination, // 目的地
      'extensions':'all',
      'key':key
    }); 
	let options = {  
	    hostname: hostname,
	    path: '/v3/direction/driving?'+post_data,
		method: 'GET',
	}; 
	var req = https.request(options, function (res) {
	    res.setEncoding('utf8');  
	    res.on('data', function (response) {  
	      data.push(response);
	    });  
	    res.on('end', function() {
	      var body = JSON.parse(data.join(''));
	      // 判断是否是重新规划路线
	      const time = parseInt(body.route.paths[0].duration)+newTime;
	          if(time <oldTime || time < (oldTime+600)){
	          	//重新规划我的路线 目的的变化，出发地变化
	          	cb1(JSON.stringify(body.route.paths),time,2); 
	          }else{
	          	cb3(null); 
	          } 
		});
	    res.on('error', function(e){
			console.log(e);
			b3(e);
		});
	});
	req.end();
}



module.exports = {

	state : function(req, res){
		//用户提供的经纬度 第一次路线规划使用的时间 目的地的坐标

		let location = req.allParams();
		let origin =location.lat+","+location.lon;
		let myorigin =location.myorigin
		let destination =location.destination;
		oldTime = location.time;
			getTaiShi(origin,
				function cb1(data,isNew,name){
					let names = name.split("|");
					if(data.length){
						for (let index in data){
							if(data[index]!=[]){
								console.log("data=1="+data[index]);
								getRoutes(myorigin,data[index],destination,isNew,
								function call1(data,time){
									console.log("data=="+data[index]);
									const sendData = JSON.parse(data);
									// sendData.push({
									// 	'streetName':names[index],
									// 	'newTime':time
									// })
									return res.end({
					                	"code":"200",
					                	'info':sendData
					            	}); 
									
									// console.log(sendData)
									// return res.end(JSON.stringify(sendData))
								},
								function call2(data){
									// return res.end(data)
									return res.json({
					                	"code":"200",
					                	'info':data
					            	});  
								},
								function call3(err){
									if (err){
										return res.json({
						                	"code":"418",
						                	'info':err
						            	})
										// return res.end(err);
									}else{
										// return res.end("trafficJam ");
										return res.json({
						                	"code":"417",
						                	'info':'请求错误'
						            	})
									}
								});
								break;
							}
							
						}
					}else{
						// return res.end("堵死啦 cb1")
						return res.json({
		                	"code":"201",
		                	'info':'堵死啦'
		            	});  
					}
				},
				function cb2(){
					// return res.end("堵死啦 cb2")
					return res.json({
		                	"code":"201",
		                	'info':'堵死啦'
		            	})
				},
				function cb3(err){
					if (err){
						return res.json({
		                	"code":"418",
		                	'info':err
		            	})
						// return res.end(err);
					}else{
						// return res.end("trafficJam ");
						return res.json({
		                	"code":"417",
		                	'info':'请求错误'
		            	})
					}
				}
			)
	},

	route: function(req, res){
		//todo 路线规划
		let location = req.allParams();
		console.log('---state---'+location.lat);
		let origin =location.lat+","+location.lon;
		let myorigin =location.myorigin//todo 我的出发地;
		let destination =location.destination; //todo 目的地的坐标
		// let myorigin ='104.069191,30.625042'//todo 我的出发地;
		// let destination ='104.058697,30.632546'; //todo 目的地的坐标
		getRoutes(myorigin,myorigin,destination,false,
			function call1(data,time){
				// return res.end(data)
				return res.json({
                	"code":"200",
                	'info':data
            	})
			},
			function call2(data){
				//todo 时间
				// return res.end(data)
				return res.json({
                	"code":"200",
                	'info':data
            	})
			},
			function call3(err){
				if (err){
					return res.json({
	                	"code":"418",
	                	'info':err
	            	})
					// return res.end(err);
				}else{
					// return res.end("trafficJam ");
					return res.json({
	                	"code":"417",
	                	'info':'请求错误'
	            	})
				}
			});

		}

	
};
scp root@wxapp.ucloudtech.com:~/Desktop  ~/Trafficjam.tar.tgz 


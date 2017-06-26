/**
 * ShowController
 *
 * @description :: Server-side logic for managing shows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 *
 *
 *第三页展示页面在
 *	上传: 地理位置信息(经纬度)
 *	返回:   周围堵车人数
 *		    堵车的地理位置(经纬度)
 *			分享图片
 *			关于信息
 * */
//获取12分钟钱的时间
function getTime(time){
 	//得到时间戳

 	var timestamp = Date.parse(new Date());
 	//console.log(timestamp)
	//减去time分钟的毫秒数
	let tStart = timestamp-time*60000
	// console.log(tStart)
	
	return tStart 


}
let key =""
module.exports = {
	//TODO 展示需要的数据
	show:function(req,res){
		var start =getTime(12)
		//查询用户数据 
		let id = req.headers.ucloudtech_3rd_key 
		Info.findOne({'user_id':id }).sort({ createdAt : -1 }).exec(function (err,dbs) {
					if(err){
						console.log(err);
						return res.json({"info":"fail"})
					}else{
					console.log(dbs.imag)	
					let info =req.allParams();
					let that = res;
					let lon,lat,level;
					let point = [];
					let image = dbs.imag;
					Info.find({ location :
						{ $near :
							{
								$geometry : {
									type : "Point" ,
								coordinates : [parseFloat(info.longitude), parseFloat(info.latitude)] },//经纬度待客户端上传
								$maxDistance :1000
							}
						},data: {$gte: start}
					}).exec(function (err,data) {
						if(err){
							console.log(err)
							return res.json(data)
						}else{
							data.forEach(function(item,index){
								lon = item.location.coordinates[0]
								lat = item.location.coordinates[1]
								level =item.traffic
								let data={
									lon:lon,
									lat:lat,
									level:level
								}
								point.push(data)
							})
							let length = data.length
							let out={
								point:point,
								imag: image,//TODO 生成图片
								around:length,
								thanks:'成都悠云高科技公司与瓜几拉联合出品'
							}

							return res.json(out)
						}

					});

				}
			});	



	},

};


//检测用户权限
module.exports=function(req,res,next){
	var user=req.session.user;
	
	if(user.username !='admin'&&user.password!="ucloud"){
		// console.log("not match")
		return res.redirect('/');
	}else{
		// console.log("admin match")
		next();
	}
	
};

function isLogin(req,res){
	req.session.user = user;
	res.locals.user=user;
	req.isAuthenticated=true; 
};

//show HomeImages
function getImages(){

}
module.exports = {
    //处理登录逻辑
    processSignin: function(req,res){
         user= req.allParams();
         console.log(user.username)
         console.log(user.password)
        // // 使用本地验证策略对登录进行验证
        if(user.username =='admin'&&user.password=="ucloud"){
    		res.cookie('id',user.name);
        	isLogin(req,res);
        	return res.redirect('/web/home');
        	
       
        }else{
        	return res.render('admin/login',{
        			message: "info.message",
        			user: user,
        			err:'err'
        		});

        }
        
    },
    //处理登出逻辑
    logout: function(req, res) {
    	// req.logout();
    	delete req.session.user;
    	res.clearCookie('id');
    	res.redirect('/');
    }
};
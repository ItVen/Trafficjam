module.exports = function(req, res, next) {
    var id = req.headers.ucloudtech_3rd_key;
    console.log(id+'-------')
    if(id){
       User.findOne({"id":id}).exec(function(err,user){
            if(err){
              console.log(err)
            }else{
            	
            	if(user){
					next();
					console.log(user)
            	}else{
            		console.log('no_user')
            		return res.json({"info":"fail"})            		
            	}
            	
            }
        })
    }else{
        return res.json({"info":"请登录"})   
    }
    
};



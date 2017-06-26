/**
 * FunController
 *
 * @description :: Server-side logic for managing funs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
   add:function(req,res){
      var data = req.allParams()


      Fun.create(data).exec(function createCB(err,created){
         if (err) {
                // 如果有误，返回错误
                // res.json({"err":err,'info':'写入失败'})
                return res.badRequest('写入失败');
            } else {
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
  },
  delet:function(req,res){
    var query=req.allParams();
    if(query ==undefined){
        return res.badRequest('id err');
    }else{
        Fun.destroy(query,function(err,movie){
            if(err){
                return res.badRequest('delet err');
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

}

};


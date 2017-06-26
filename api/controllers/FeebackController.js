/**
 * FeebackController
 *
 * @description :: Server-side logic for managing feebacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers'
 *
 *
 *意见反馈信息:
 *		上传:   意见类型
 *				意见信息
 *			    反馈用户
 */

module.exports = {
	/**
     * 列表展示
     * @param req
     * @param res
     */
	
    show:function(req,res){
        Feeback.find()
        .exec(function getData(err,data){
            if(err){
                console.log(err)
            }else{
                //console.log("ok")
                res.render('page/feedback',{
                    title:'Feedback列表页',
                    data:data
                })
            }
        });
    },
	 /**
     * 处理添加意见反馈逻辑
     * @param req
     * @param res
     */
	 add: function (req, res) {
        // 由请求参数构造待创建Feedback对象
        var feedback = req.allParams();
       // console.log(feedback);
        Feeback.create(feedback).exec(function createCB(err, created) {
            if (err) {
                // 如果有误，返回错误
                res.json({"info":"写入失败"})
                // res.view('passport/register', {err: err});

            } else {
                //提示写入成功
                res.json({"info":"写入成功!"})
            }
        });
    },
};

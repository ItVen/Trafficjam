/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

 module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'admin/login'
  },

  /*************图片上传测试***************/
  // '/image':{
  //   view:'page/home'
  // },
  'GET /web/home':'HomeController.home',
  'GET /web/logout' : 'AuthController.logout',
  'GET /web/images':'WebController.showAllImage',
  'GET /web/info/detail':'WebController.showInfo',
  'GET /web/feedback':'FeebackController.show' ,

  /*********************用户登录界面***************************/
  'POST /login':'LoginController.add',

  'POST /web/login':'AuthController.processSignin',
  /**********************反馈页信息**************************/
  'POST /feedback': 'FeebackController.add',
  /****************************第二页信息**************************/ 
  'POST /info/add':'InfoController.add',
  'POST /info/update':'InfoController.update',
  'POST /info/delet':'InfoController.delet',
  'POST /info/save':'InfoController.save',
  'Get /info/show':'InfoController.show',
  /****************************首页信息**************************/ 
  'GET /home/show':'HomeController.show',
  'POST /feedback': 'FeebackController.add',
  'POST /home/delet': 'HomeController.delet',
  'POST /home/add':'HomeController.add',
  // 'GET /home/list':'HomeController.list',
  /************************第三页信息*****************************/ 
  'GET /show':'ShowController.show',

  'POST /fun/add': 'FunController.add',
  'POST /fun/delet':'FunController.delet',
  /************************* Feedback *********************/


  /*******************************交通态势*****************************/

  'GET /traffic/situation':'RoutsController.state',
  'GET /traffic/route':'RoutsController.route'

};

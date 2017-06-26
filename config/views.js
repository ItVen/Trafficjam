/**
 * View Engine Configuration
 * (sails.config.views)
 *
 * Server-sent views are a classic and effective way to get your app up
 * and running. Views are normally served from controllers.  Below, you can
 * configure your templating language/framework of choice and configure
 * Sails' layout support.
 *
 * For more information on views and layouts, check out:
 * http://sailsjs.org/#!/documentation/concepts/Views
 *
 *替换了模板引擎 修改ejs为swig
 *并对swig做一些方便我们开发的配置
 *为了在开发环境下修改swig而不用重启服务器，我们需要设置swig默认不缓存
 *
 */
 var extras = require('swig-extras');
 module.exports.views = {
  engine: {
    /* Template File Extension */
    ext: 'swig',

    /* Function to handle render request */
    fn: function (path, data, cb) {
      /* Swig Renderer */
      var swig = require('swig');
            // 保证我们在开发环境下每次更改swig不用重启sails
            if (data.settings.env === 'development') {
              swig.setDefaults({cache: false});
            }
            // 维护一个site变量
            // data.site = sails.config.site;
            // 提供一个变量标示用户是否登录
            // if (typeof (data.isLogged) == 'undefined') {
            //   data.isLogged = !!data.req.isAuthenticated();
            // }
            /*
             * 绑定一些常用路径
             * Thanks to: https://github.com/mahdaen/sails-views-swig
             * */
             var paths = {
              script: '/js',
              style: '/styles/default',
              image: '/images',
              font: '/fonts',
              icon: '/icons',
              bower: '/bower_components'
            };

            if (!data.path) {
              data.path = paths;
            }
            else {
              for (var key in paths) {
                if (!key in data.path) {
                  data.path[key] = paths[key];
                }
              }
            }
            // 补充extra
            extras.useFilter(swig, 'split');
            /* Render Templates */
            return swig.renderFile(path, data, cb);
          }
        },

        layout: 'layout',

        partials: false

      };
const gulp = require('gulp');
const connect = require('gulp-connect');
const args = require('./util/args');
const open = require('open');
const path = require('path');
const proxy = require('http-proxy-middleware');

/**
 * 获取本机IP地址
 * @returns {*}
 */
function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}

gulp.task('server', (cb) => {
  if (!args.watch) return cb();
  connect.server({
    root: path.resolve(__dirname, '../'),
    livereload: true,
    host: getIPAdress(),
    port: 9001,
    /**
    * 这里可以添加服务器代理
    * */
    // middleware: function(connect, opt) {
    //   return [
    //     proxy(['/**/*', '!/static/**/*', '!/templates/**/*'], {
    //       target: 'http://webtest.qiyou.cn',
    //       changeOrigin: true
    //     }),
    //   ]
    // }
  })
  if (args.act) {
    setTimeout(() => {
      open(`http://${getIPAdress()}:9001/dist/${args.act}/index.html`)
    })
  }
});
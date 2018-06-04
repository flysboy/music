import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';//开启服务器
import args from './util/args';

gulp.task('serve', (cb)=>{
	if(!args.watch) return cb();//不是监听状态，返回回调函数
//如果是处于监听状态下，创建服务器,启动的就是server/bin/www下的服务器脚本
	var server = liveserver.new(['--harmony','server/bin/www']);
	server.start();
	//要实现自动刷新，监听server下所有js和ejs是否发生改变
	gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'], function(file){
		server.notify.apply(server,[file]);//提示服务器改变
	})
	//监听路由的改变，需要server重启
	gulp.watch(['server/routes/**/*.js','server/app.js'], function(){
		server.start.bind(server)()
	});
})
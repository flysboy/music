var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less')

//转移html到dist文件夹
gulp.task("html", function(){
	//取文件用流的方式
	gulp.src("./src/index.html")
			.pipe(connect.reload())
			.pipe(gulp.dest("./dist"));
})

//监听任务

gulp.task("watch", function(){
	gulp.watch("./src/index.html",["html"]);
	gulp.watch("./src/css/*.less",["less"]);
})

//服务开启任务
gulp.task("server", function(){
	connect.server({
		root: './dist',
		port: 8091,
		livereload: true
	});
})

//把less转换成css
gulp.task("less", function(){
	gulp.src('./src/less/*.less')
		.pipe(connect.reload())
		.pipe(less())
		.pipe(gulp.dest('./dist/css/'));
})

gulp.task("default", ["html","watch","server","less"]);
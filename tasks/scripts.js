import gulp from 'gulp';
import gulpif from 'gulp-if';
import concat from 'gulp-concat';
import webpack from 'webpack';
import gulpWebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log,colors} from 'gulp-util';
import args from './util/args';

gulp.task('scripts',()=>{//创建一个gulp任务scripts
	return gulp.src(['app/js/index.js'])
	.pipe(plumber({//集中处理错误，改变gulp原有处理错误的机制
		errorHandler: function(){

		}
	}))
	.pipe(named())//重新命名
	.pipe(gulpWebpack({//采用webpack对js进行编译，
		module: {
			loaders: [{
				test:/\.js$/,
				loader: 'babel-loader'
			}]
		}
	}), null,(err, stats)=>{//第三个参数是处理错误的情况
		log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
			chunks: false
		}))
	})
	.pipe(gulp.dest('server/public/js'))//指定编译后的路径
	.pipe(rename({//生成文件副本，重新命名，并进行压缩
		basename: 'cp',
		extname: '.min.js'
	}))
	.pipe(uglify({compress:{properties: false},output:{'quote_keys': true}}))//压缩
	.pipe(gulp.dest('server/public/js'))//副本编译后路径
	.pipe(gulpif(args.watch, livereload()))//监听并自动刷新
})
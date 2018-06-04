import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';

gulp.task('browser', (cb)=>{//监听app下的文件变化
	if(!args.watch) return cb();
	gulp.watch('app/**/*.js',['scripts']);
	gulp.watch('app/**/*.ejs',['pages']);
	gulp.watch('app/**/*.css',['css']);
});
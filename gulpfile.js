var gulp = require('gulp');
var del = require('del');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

//清空
gulp.task('clean:dist', function() {
	return del(['dist']);
});

// 复制
gulp.task('copy', ['clean:dist'], function() {
	return gulp.src(['src/jquery.slide.js'])
				.pipe(gulp.dest('dist'));
});

// 压缩js
gulp.task('jsmin', ['clean:dist'], function() {
	return gulp.src(['src/*.js'])
				.pipe(uglify({// 配置文档 https://github.com/mishoo/UglifyJS2#mangle-properties-options
					mangle: true,// 类型：Boolean 默认：true 是否修改变量名
				    compress: true,// 类型：Boolean 默认：true 是否完全压缩
				    /*output: {
				    	comments: true// (default false) -- pass true or "all" to preserve all comments
				    }*/
				}))
				.pipe(rename({ extname: '.min.js' }))
				.pipe(gulp.dest('dist'));
});

gulp.task('default', ['copy', 'jsmin']);
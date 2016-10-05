'use strict'

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	concatCss = require('gulp-concat-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	cssmin = require('gulp-cssmin'),
	connect = require('gulp-connect'),
	livereload = require('gulp-livereload'),
	sass = require('gulp-sass'),
	pug = require('gulp-pug'),
	jade = require('gulp-jade'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	pump = require('pump'),
	uncss = require('gulp-uncss'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify');

//CONNECT
gulp.task('connect', function () {
	connect.server({
		root: 'app',
		livereload: true
	});
});

//CSS
gulp.task('css', function () {
	return gulp.src('dev/css/*.css')
		.pipe(concatCss('bundle.css'))
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(cssmin())
		.pipe(rename({
		suffix: '.min'
	}))
		.pipe(gulp.dest('app/css/'))
		.pipe(connect.reload());
});

////CSS-VENDORS
//gulp.task('css-vendors', function () {
//	return gulp.src('dev/css/vendors/*.css')
//		.pipe(concatCss('vendors.css'))
//		.pipe(uncss({
//			html: ['app/*.html']
//		}))
//		.pipe(autoprefixer({
//			browsers: ['last 10 versions'],
//			cascade: false
//		}))
//		.pipe(gulp.dest('app/css/'))
//		.pipe(connect.reload());
//});

////CSSmin
//gulp.task('cssmini', function () {
//	return gulp.src('app/css/bundle.css')
//		.pipe(cssmin())
//		.pipe(rename({
//			suffix: '.min'
//		}))
//		.pipe(gulp.dest('app/css/'))
//		.pipe(connect.reload());
//});

//CSSCOMPRESSION
gulp.task('csscomp', function () {
	return gulp.src('app/css/bundle.css')
		.pipe(uncss({
			html: ['app/*.html']
		}))
		.pipe(gulp.dest('app/css/'));
});

//SASS2CSS
gulp.task('sass', function () {
	return gulp.src('dev/scss/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dev/css/'));
});


//JADE2HTML
function errorLog(error) {
	console.log([
		'',
		"----------ERROR MESSAGE START----------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MESSAGE END----------",
		''
	].join('\n'));
	this.end();
}

gulp.task('jade', function () {
	return gulp.src('dev/jade/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.on('error', errorLog)
		.pipe(gulp.dest('app/'))
		.pipe(connect.reload());
});

//JSmini
gulp.task('jsmini', function (cb) {
	pump([
		gulp.src('dev/js/*.js'),
		uglify(),
		gulp.dest('app/js/')
	],
			 cb
			)
		.pipe(connect.reload());
});

//IMAGE-COMPRESSION
gulp.task('imagemin', function () {
	gulp.src('dev/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('app/images/'))
		.pipe(connect.reload());
});

//WATCH
gulp.task('watch', function () {
	gulp.watch('dev/jade/**/*.jade', ['jade'])
	gulp.watch('dev/jade/*.jade', ['jade'])
	gulp.watch('dev/scss/*.scss', ['sass'])
	gulp.watch('dev/css/*.css', ['css'])
	gulp.watch('dev/js/*.js', ['jsmini'])
//	gulp.watch('app/css/bundle.css', ['cssmini'])
	gulp.watch('dev/images/*.*', ['imagemin'])
});

//DEFAULT
gulp.task('default', ['connect', 'jade', 'sass', 'css', 'jsmini', 'imagemin', 'watch']);
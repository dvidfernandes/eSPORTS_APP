var gulp        = require('gulp'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    plumber     = require('gulp-plumber'),
    imagemin    = require('gulp-imagemin'),
    compass     = require('gulp-compass'),
    htmlmin     = require('gulp-htmlmin'),
    cssnano     = require('gulp-cssnano'),
    fileinclude = require('gulp-file-include');

gulp.task('js-plugins', function(){
    gulp.src(['src/plugins/*.js','src/plugins/**/*.js'])
        .pipe(plumber())
        .pipe(concat('plugins.js',{newLine:';'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('js-libs', function(){
    gulp.src(['src/libs/*.js','src/libs/**/*.js'])
        .pipe(plumber())
        .pipe(concat('libs.js'),{newLine:';'})
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('js-src', function(){
    gulp.src(['src/*.js'])
        .pipe(plumber())
        .pipe(concat('source.js'),{newLine:';'})
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('bundle', function(){
    gulp.src(['public/js/libs.js','public/js/plugins.js','public/js/source.js'])
        .pipe(plumber())
        .pipe(concat('bundle.js',{newLine:';'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('images', function(){
    gulp.src('images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images/'));
});


gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: './public'
        }
    });
});


gulp.task('html', function(){
    gulp.src('templates/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'components/',
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('compass', function(){
    gulp.src(['scss/*.scss','scss/**/*.scss'])
        .pipe(plumber())
        .pipe(compass({
            css: 'css/output',
            sass: 'scss'
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('css/output'))
});

gulp.task('css-output', function(){
    gulp.src(['css/output/*.css'])
        .pipe(plumber())
        .pipe(plumber.stop())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('css/'));
});

gulp.task('css-libs', function(){
    gulp.src('css/libs/*.css')
        .pipe(plumber())
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('css/'))
});

gulp.task('css-bundle', function(){
    gulp.src(['css/libs.css','css/all.css'])
        .pipe(plumber())
        .pipe(cssnano())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('watch', function(){
    gulp.watch(['src/js/libs/*.js','src/js/libs/**/*.js'], ['js-libs']).on('change', browserSync.reload );
    gulp.watch(['src/js/plugins/*.js','src/js/plugins/**/*.js'], ['js-plugins']).on('change', browserSync.reload );
    gulp.watch(['src/*.js'], ['js-src']).on('change', browserSync.reload );

    gulp.watch(['images/*'],['images']).on('change', browserSync.reload );

    gulp.watch(['scss/*.scss','scss/**/*.scss'],['compass']);
    gulp.watch(['css/output/*.css'],['css-output']);
    gulp.watch(['css/libs/*.css'],['css-libs']);
    gulp.watch(['css/all.css','css/libs.css'],['css-bundle']).on('change', browserSync.reload );

    gulp.watch(['templates/*.html',['components/*.html']],['html']).on('change', browserSync.reload );
    gulp.watch(['public/js/libs.js','public/js/plugins.js','public/js/source.js'],['bundle']).on('change', browserSync.reload );
});

gulp.task('default', ['js-libs','js-plugins','js-src','bundle','images','html','browser-sync','compass','css-libs','css-output','css-bundle','watch']);

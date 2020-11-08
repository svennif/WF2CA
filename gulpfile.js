const gulp = require('gulp');
const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();

function css() {
    return src('./app/sass/style.scss')
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
}

function image() {
    return src('./app/images/*')
        .pipe(imagemin())
        .pipe(dest('./dist/imgages'))
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './',
        }
    });
    gulp.watch('./app/images/*', image);
    gulp.watch('./app/sass/*.scss', css);
    gulp.watch('./app/*.html').on('change', browserSync.reload);
}

exports.watch = watch;

// 引入 gulp,compass
const gulp = require('gulp');
// const imagemin = require('gulp-imagemin');
/*const pngquant = require('imagemin-pngquant');*/
var compass = require('gulp-compass');
    // jshint = require('gulp-jshint');
    // source = require('vinyl-source-stream');

var paths = {
    base: './',
    js: './js-bs/**/*.js',
    sass: './sass/**/*.scss',
    bsass: './sass/bootstrap/**/*.scss',
    img: './img-bs/**/*'
};

// 创建 Compass 任务
gulp.task('compass', () => {
    gulp.src(paths.bsass)
        .pipe(compass({
            comments: false,
            config_file: './config.rb',
            css: 'css',
            sass: 'sass',
            image: 'img'
        }));
});

gulp.task('lint', () => {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', () => {
    return gulp.src('4/img-u/*')
        .pipe(imagemin({
            optimizationLevel: 6,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('4/img'));
});

// Rerun the task when a file changes
gulp.task('watch', () => {
    gulp.watch(paths.sass, ['compass']);
    // gulp.watch(paths.js, ['scripts']);
    // gulp.watch(paths.img, ['min-png', 'min-jpeg']);
});


// 默认任务
gulp.task('default', ['compass', 'watch']);

// 引入 gulp,compass
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
/*const pngquant = require('imagemin-pngquant');*/
var compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream');

var paths = {
    base: './public/',
    js: './public/js-bs/**/*.js',
    sass: './public/sass/**/*.scss',
    img: './public/img-bs/**/*'
};

// 创建 Compass 任务
gulp.task('compass', () => {
    gulp.src(paths.sass)
        .pipe(compass({
            comments: false,
            config_file: './config.rb',
            css: 'public/css',
            sass: 'public/sass',
            image: 'public/img'
        }));
});

gulp.task('lint', () => {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('imagemin', () => {
    return gulp.src('public/4/img-u/*')
        .pipe(imagemin({
            optimizationLevel: 6,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest('public/4/img'));
});

// Rerun the task when a file changes 
gulp.task('watch', () => {
    gulp.run('scripts');
    gulp.watch(paths.js, ['scripts']);
    // gulp.watch(paths.img, ['min-png', 'min-jpeg']);
});


// 默认任务
gulp.task('default', ['imagemin']);

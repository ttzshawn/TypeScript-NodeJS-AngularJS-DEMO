// 引入 gulp,compass
var gulp = require('gulp'),
    compass = require('gulp-compass');
// 创建 Compass 任务
gulp.task('compass', function() {
    gulp.src('./public/sass/**')
        .pipe(compass({
            comments: false,
            config_file: './config.rb',
            css: 'public/css',
            sass: 'public/sass',
            image: 'public/img'
        }));
});
// 默认任务
gulp.task('default', function() {
    gulp.run('compass');
    gulp.watch([
        './public/sass/**',
        './public/img/**'
    ], function(event) {
        gulp.run('compass');
    });
});

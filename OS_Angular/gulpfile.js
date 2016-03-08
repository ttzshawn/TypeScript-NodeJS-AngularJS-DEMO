// Require gulp,compass
const gulp = require('gulp');
const compass = require('gulp-compass');
const concat = require("gulp-concat");

const paths = {
    base: './',
    js: './public/js/**/*.js',
    sass: './public/sass/**/*.scss',
    css: './public/css/**/*.css',
    img: './public/img/**/*'
};

// Concat JS files
gulp.task('scripts', () => {
    return gulp.src(paths.js)
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/js/'));
});

// Compile SASS
gulp.task('compass', () => {
    gulp.src(paths.sass)
        .pipe(compass({
            comments: false,
            config_file: './config.rb',
            css: 'public/css',
            sass: 'public/sass'
        }))
        .pipe(gulp.dest('public/css/'));
});

// Watching files change
gulp.task('watch', () => {
    gulp.watch(paths.sass, ['compass']);
    // gulp.watch(paths.js, ['scripts']);
    // gulp.watch(paths.img, ['min-png', 'min-jpeg']);
});

// Default Task
gulp.task('default', ['compass', 'watch', 'scripts']);

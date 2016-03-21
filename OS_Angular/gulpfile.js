// Require gulp,compass
const gulp = require('gulp');
const compass = require('gulp-compass');
const concat = require("gulp-concat");
const connect = require("gulp-connect");

const paths = {
    base: './',
    js: './src/public/js/**/*.js',
    sass: './src/public/sass/**/*.scss',
    css: './src/public/css/**/*.css',
    img: './src/public/img/**/*'
};

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        fallback: 'index.html'
    });
});

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
            style: 'expanded',
            require: ['compass/import-once/activate'],
            css: './src/public/css',
            sass: './src/public/sass'
        }))
        .pipe(gulp.dest('./src/public/css/'));
});

// Watching files change
gulp.task('watch', () => {
    gulp.watch(paths.sass, ['compass']);
    // gulp.watch(paths.js, ['scripts']);
});

// Default Task
gulp.task('default', ['connect', 'watch']);

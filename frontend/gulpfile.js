// Require gulp,compass
const gulp = require('gulp');
const compass = require('gulp-compass');
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const minifyJs = require("gulp-uglify");
const sourcemaps = require('gulp-sourcemaps');

const paths = {
    base: './',
    jsModule: './src/public/js/**/*.module.js',
    js: './src/public/js/**/*.js',
    sass: './src/public/sass/**/*.scss',
    css: './src/public/css/**/*.css',
    img: './src/public/img/**/*'
};

gulp.task('connect', function() {
    connect.server({
        root: './src',
        port: 8080
    });
});

// Concat JS files with sourcemaps
gulp.task('scripts', () => {
    return gulp.src([paths.js, '!./src/public/js/**/all.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        // .pipe(minifyJs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/public/js/'));
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
    gulp.watch(paths.js, ['scripts']);
});

// Default Task
gulp.task('default', ['connect', 'scripts', 'watch']);

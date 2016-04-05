// Require gulp,compass
const gulp = require('gulp'),
    compass = require('gulp-compass'),
    usemin = require('gulp-usemin'),
    concat = require("gulp-concat"),
    connect = require("gulp-connect"),
    minifyJs = require("gulp-uglify"),
    minifyCss = require('gulp-cssnano'),
    minifyHTML = require('gulp-htmlmin'),
    sourcemaps = require('gulp-sourcemaps');

const paths = {
    base: './',
    index: './src/index.html',
    html: './src/html/**/*.html',
    htmlTemplates: './src/js/**/*.html',
    js: './src/js/**/*.js',
    jsModule: './src/js/**/*.module.js',
    sass: './src/sass/**/*.scss',
    css: './src/css/**/*.css',
    img: './src/img/**/*'
};

gulp.task('connect', function() {
    connect.server({
        root: './src',
        port: 8080
    });
});

// Concat JS files with sourcemaps
gulp.task('scripts', () => {
    return gulp.src([paths.js, '!./src/js/**/main.min.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        // .pipe(minifyJs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/js/'));
});

// Handle components from index
gulp.task('build-usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({
                keepSpecialComments: 0
            }), 'concat'],
        }))
        .pipe(gulp.dest('../webapp/static/'));
});
gulp.task('build-html', function() {
    return gulp.src([paths.html])
        .pipe(minifyHTML())
        .pipe(gulp.dest('../webapp/static/html'));
});
gulp.task('build-htmlTemplates', function() {
    return gulp.src([paths.htmlTemplates])
        .pipe(minifyHTML())
        .pipe(gulp.dest('../webapp/static/js'));
});
gulp.task('build-img', function() {
    return gulp.src(paths.img)
        .pipe(gulp.dest('../webapp/static/img'));
})
// Compile SASS
gulp.task('compass', () => {
    gulp.src(paths.sass)
        .pipe(compass({
            comments: false,
            style: 'expanded',
            require: ['compass/import-once/activate'],
            css: './src/css',
            sass: './src/sass'
        }))
        .pipe(gulp.dest('./src/css/'));
});

// Watching files change
gulp.task('watch', () => {
    gulp.watch(paths.sass, ['compass']);
    gulp.watch(paths.js, ['scripts']);
});

// Default Task
gulp.task('default', ['connect', 'scripts', 'watch']);
gulp.task('build', ['build-usemin', 'build-html', 'build-htmlTemplates', 'build-img']);

// Front-end building

const gulp = require('gulp'),
    babel = require('gulp-babel'),
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
    fontsAwesome: './src/lib/font-awesome-4.5.0/fonts/*',
    fontsBootstrap: './src/lib/bootstrap/fonts/*',
    js: './src/js/**/*.js',
    jsModule: './src/js/**/*.module.js',
    sass: './src/sass/**/*.scss',
    css: './src/css/**/*.css',
    img: './src/img/**/*'
};

// local web server
gulp.task('connect', () => {
    connect.server({
        root: './src',
        port: 8080
    });
});

// Concat JS files with sourcemaps
gulp.task('scripts', () => {
    return gulp.src([paths.js, '!./src/js/**/main.min.js'])
        .pipe(sourcemaps.init())
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(concat('main.min.js'))
        // .pipe(minifyJs())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/js/'));
});

// Compile SASS to css
gulp.task('compass', () => {
    gulp.src(paths.sass)
        .pipe(compass({
            comments: false,
            style: 'nested',
            require: ['compass/import-once/activate'],
            css: './src/css',
            sass: './src/sass'
        }))
        .pipe(gulp.dest('./src/css/'));
});

// Watching files change and run tasks
gulp.task('watch', () => {
    gulp.watch(paths.sass, ['compass']);
    gulp.watch(paths.js, ['scripts']);
});


// Handle components from index
gulp.task('build-usemin', () => {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: ['concat'],
            js1: ['concat'],
            css: [minifyCss({
                keepSpecialComments: 0
            }), 'concat'],
            css1: [minifyCss({
                keepSpecialComments: 0
            }), 'concat']
        }))
        .pipe(gulp.dest('../webapp/static/'));
});
gulp.task('build-html', () => {
    return gulp.src([paths.html])
        .pipe(minifyHTML())
        .pipe(gulp.dest('../webapp/static/html'));
});
gulp.task('build-htmlTemplates', () => {
    return gulp.src([paths.htmlTemplates])
        .pipe(minifyHTML())
        .pipe(gulp.dest('../webapp/static/js'));
});
gulp.task('build-fonts', () => {
    return gulp.src([paths.fontsAwesome, paths.fontsBootstrap])
        .pipe(gulp.dest('../webapp/static/fonts'));
});
gulp.task('build-img', () => {
    return gulp.src(paths.img)
        .pipe(gulp.dest('../webapp/static/img'));
})


// Default Task
gulp.task('default', ['scripts', 'compass', 'watch']);
gulp.task('server', ['connect']);
gulp.task('build', ['build-usemin', 'build-html', 'build-htmlTemplates', 'build-fonts', 'build-img']);

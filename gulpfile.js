// 引入 gulp,compass
var gulp = require('gulp'),
    compass = require('gulp-compass'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageminJpegtran = require('imagemin-jpegtran'),
    browserify = require('browserify');

var source = require('vinyl-source-stream');

var paths = {
    js: './public/js-bs/**/*.js',
    sass: 'public/sass/**/*.scss',
    img: 'public/img-bs/**/*'
};









/*




var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var concat = require('gulp-concat');
var transform = require('vinyl-transform');

gulp.task('build-lib', function() {

    // use `vinyl-transform` to wrap around the regular ReadableStream returned by b.bundle();
    // so that we can use it down a vinyl pipeline as a vinyl file object.
    // `vinyl-transform` takes care of creating both streaming and buffered vinyl file objects.
    var browserified = transform(function(filename) {

        // basename, for eg: 'a.js'
        var basename = path.basename(filename);

        // define the exposed name that your client.js would use to require();
        // for eg: require('lib/a.js'); // -> exposed name should be 'lib/a.js'
        var expose = 'lib/' + basename;

        return browserify(filename)
            .require(filename, {
                expose: expose
            })
            .bundle();
    });

    return gulp.src(['./lib/*.js'])
        .pipe(browserified)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build-client', function() {

    var browserified = transform(function(filename) {
        // filename = './client.js'

        // let browserify know that lib/a.js and and lib/b.js are external files
        // and will be loaded externally (in your case, by loading the bundled lib.js 
        // for eg: <script src='dist/lib.js'>)
        return browserify(filename)
            .external('lib/a.js')
            .external('lib/b.js')
            .bundle();
    });

    return gulp.src(['./client.js'])
        .pipe(browserified)
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build-lib', 'build-client']);



    var EXTERNALS = [{
        require: "lodash",
        expose: 'underscore'
    }, {
        require: "jquery",
        expose: 'jquery'
    }, {
        require: "es5-shim"
    }, {
        require: "rsvp",
        expose: 'rsvp'
    }, {
        require: "../../#{VENDOR_DIR}backbone-1.1.2",
        expose: 'backbone'
    }, {
        require: "../../#{VENDOR_DIR}d3-3.4.3",
        expose: 'd3'
    }, {
        require: "../../#{VENDOR_DIR}jquery.nouisliSder-5.0.0",
        expose: 'jquery.nouislider'
    }, {
        require: "../../#{VENDOR_DIR}topojson-1.4.9",
        expose: 'topojson'
    }, {
        require: "../../#{VENDOR_DIR}matchMedia-0.2.0.js",
        expose: 'matchmedia'
    }]

*/







// preborwerify
gulp.task('pre', function() {
    var options = {
        'entries': ['./public/js-bs/views/beep.js'],
    };

    return browserify(options)
        .external('./public/js-bs/views/robot.js')
        .external('./public/js-bs/views/common.js')
        .bundle()
        .pipe(source('e.js'))
        .pipe(gulp.dest('./public/js-bs/views/'))
        /*    return browserify('./public/js-bs/views/beep.js')
                .bundle()*/
        //Pass desired output filename to vinyl-source-stream
        /*.pipe(source('index.js'))*/
        // Start piping stream to tasks!
});


// browserify task
gulp.task('browserify', function() {
    var options = {
        'entries': ['./public/js-bs/views/beep.js'],
        'basedir ': '',
        'paths ': '',
        'debug': 'false'
    };

    var externals = ['./public/js-bs/views/robot.js', './public/js-bs/views/common.js', './public/js-bs/views/common.js', './public/js-bs/views/common.js', './public/js-bs/views/common.js', './public/js-bs/views/common.js', './public/js-bs/views/common.js']

    return browserify(options)
        .external(externals)
        .bundle()
        .pipe(source('e.js'))
        .pipe(gulp.dest('./public/js-bs/views/'))
        /*    return browserify('./public/js-bs/views/beep.js')
                .bundle()*/
        //Pass desired output filename to vinyl-source-stream
        /*.pipe(source('index.js'))*/
        // Start piping stream to tasks!
});











// 创建 Compass 任务
gulp.task('compass', function() {
    gulp.src(paths.sass)
        .pipe(compass({
            comments: false,
            config_file: './config.rb',
            css: 'public/css',
            sass: 'public/sass',
            image: 'public/img'
        }));
});

gulp.task('lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('min-png',  function ()  {    
    return  gulp.src('public/img-bs/*.png')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]        
        }))
        .pipe(gulp.dest('public/img'));
});

gulp.task('min-jpeg', function() {
    return gulp.src('public/img-bs/*.jpg')
        .pipe(imageminJpegtran({
            progressive: true
        })())
        .pipe(gulp.dest('public/img'));
});


// Rerun the task when a file changes 
gulp.task('watch', function() {
    gulp.run('scripts');
    gulp.watch(paths.js, ['scripts']);
    // gulp.watch(paths.img, ['min-png', 'min-jpeg']);
});


// 默认任务
gulp.task('default', ['watch']);

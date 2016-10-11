'use strict';

var path = require('path'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    del = require('del'),
    connect = require('gulp-connect');

var src = {
    js: {
        libs: [
            './public/bower_components/angular/angular.min.js',
            './public/bower_components/angular-route/angular-route.js',
            './public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './public/bower_components/angular-ui-mask/dist/mask.js',
            './public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            './public/bower_components/angular-aria/angular-aria.js',
            './public/bower_components/angular-animate/angular-animate.js',
            './public/bower_components/angular-material/angular-material.js'

        ],
        custom: [
            './src/main.js',
            './src/app.constants.js',
            './src/services/*.js',
            './src/controllers/*.js'
        ]
    },
    css: {
        libs: [
            './public/bower_components/bootstrap-css/css/bootstrap.css',
            './public/bower_components/angular-material/angular-material.css'],
        custom: ['./src/styles/style.css']
    },
    html: {
        main: './src/index.html',
        partials: ['./src/template/*.html']
    }
},
    dest = './public';


gulp.task('clean', () => del(dest));
 
gulp.task('connect', () => 
    connect.server({
    root: './public',
    livereload: true
  }));    

gulp.task('bower-install', () => 
     bower('./public/bower_components')
    .pipe(gulp.dest('./public/bower_components')));

gulp.task('copy-html', () => gulp.src(src.html.main).pipe(gulp.dest(dest)));

gulp.task('copy-templates', () => gulp.src(src.html.partials).pipe(gulp.dest(path.join(dest, '/template'))));

gulp.task('compile-css', () => gulp.src(src.css.custom).pipe(gulp.dest(path.join(dest, '/css'))));

gulp.task('compile-js', () =>
    gulp.src(src.js.custom)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest)));

gulp.task('build', gulp.series(
    'clean', gulp.parallel('bower-install', 'copy-templates', 'compile-js', 'compile-css'), () => {
    var sourceFiles = gulp.src(src.js.libs
                                     .concat([path.join(dest, 'all.js')])
                                     .concat(src.css.libs)
                                     .concat([path.join(dest, 'css', '*.css')]), { read: false }, {relative: true});

    return gulp.src(src.html.main)
               .pipe(inject(sourceFiles, {ignorePath: 'public'}))
               .pipe(gulp.dest(dest))
}));

gulp.task('default', gulp.series('build', 'connect'));
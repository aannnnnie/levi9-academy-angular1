'use strict';

var path = require('path'),
    gulp = require('gulp'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    del = require('del'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    templateCache = require('gulp-angular-templatecache'),
    addStream = require('add-stream'),
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
            './src/controllers/*.js',
            './public/template/templates.js'
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

gulp.task('cache', function(){
   return gulp.src(src.html.partials)
    .pipe(templateCache('templates.js', {
      standalone: true,
      module: 'templatescache'
    }))
    .pipe(gulp.dest(path.join(dest, '/template')))
});

gulp.task('clean', () => del(dest));
 
gulp.task('jshint', function(){
    return gulp.src(src.js.custom)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
})

gulp.task('bower-install', () => 
     bower('./public/bower_components')
    .pipe(gulp.dest('./public/bower_components')));

gulp.task('copy-html', () => 
    gulp.src(src.html.main).pipe(gulp.dest(dest)));


gulp.task('compile-css', () => 
    gulp.src(src.css.custom)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.join(dest, '/css'))));

gulp.task('compile-js', () =>
    //pump([
        gulp.src(src.js.custom)
            .pipe(sourcemaps.init())
            .pipe(babel( {presets: ['es2015']} ))
            .pipe(ngAnnotate())
            .pipe(uglify())
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(dest)));

gulp.task('build', gulp.series(
    'clean', 'cache', gulp.parallel('bower-install', 'copy-html', 'compile-js', 'compile-css'), () => {
    var sourceFiles = gulp.src(src.js.libs
                                     .concat([path.join(dest, 'all.js')])
                                     .concat(src.css.libs)
                                     .concat([path.join(dest, 'css', '*.css')]), { read: false }, {relative: true});

    return gulp.src(src.html.main)
               .pipe(inject(sourceFiles, {ignorePath: 'public'}))
               .pipe(gulp.dest(dest))
}));


gulp.task('watch', function() {
    gulp.watch(src.css.custom, gulp.series('compile-css'));
    gulp.watch(src.js.custom, gulp.series('compile-js'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });

  browserSync.watch(dest).on('change', browserSync.reload);
});

gulp.task('default', gulp.series('build', 'jshint', gulp.parallel('watch', 'serve')));
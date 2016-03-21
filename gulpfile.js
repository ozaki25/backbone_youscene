'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let browserify = require('browserify');
let source = require('vinyl-source-stream');

//let backbonePath = './app/assets/javascripts/backbone/';
let backbonePath = './backbone/';

// default
gulp.task('default', ['build']);

// build
gulp.task('build', () => {
    runSequence(['html', 'css', 'browserify']);
});

// browserify
gulp.task('browserify', () => {
    browserify({
        entries: [backbonePath + 'src/js/main.js'],
        require: ['jquery', 'underscore','backbone']
    })
        .bundle()
        .pipe(source('app.js'))
        //.pipe(gulp.dest('./public/javascripts/'));
        .pipe(gulp.dest('app/assets/javascripts/'));
});

gulp.task('html', () => {
/*
    gulp.src(backbonePath + 'src/index.html')
        .pipe(gulp.dest(backbonePath + 'dist/'));
*/
});

gulp.task('css', () => {
    gulp.src(backbonePath + 'src/css/*.css')
        .pipe(gulp.dest('app/assets/stylesheets/'));
});

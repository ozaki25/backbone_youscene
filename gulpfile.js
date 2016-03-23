'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let browserify = require('browserify');
let source = require('vinyl-source-stream');

// default
gulp.task('default', ['build']);

// build
gulp.task('build', () => {
    runSequence(['css', 'browserify']);
});

// browserify
gulp.task('browserify', () => {
    browserify({
        //entries: ['./backbone/js/app.js'],
        entries: ['./backbone/js/main.js'],
        require: ['jquery', 'underscore','backbone']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('css', () => {
    gulp.src('./backbone/css/*.css')
        .pipe(gulp.dest('./app/assets/stylesheets/'));
});

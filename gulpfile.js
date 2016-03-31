'use strict';

let gulp = require('gulp');
let runSequence = require('run-sequence');
let browserify = require('browserify');
let source = require('vinyl-source-stream');

// default
gulp.task('default', ['build']);

// build
gulp.task('build', () => {
    runSequence(['html', 'css', 'browserify']);
});

// browserify
gulp.task('browserify', () => {
    browserify({
        entries: ['./src/app/scripts/app.js'],
        require: ['jquery', 'underscore','backbone']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/app/scripts/'));
});

gulp.task('css', () => {
    gulp.src('./src/app/styles/*.css')
        .pipe(gulp.dest('./dist/app/styles/'));
});

gulp.task('html', () => {
    gulp.src('./src/app/index.html')
        .pipe(gulp.dest('./dist/app/'));
});

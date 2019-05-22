'use strict';

var gulp = require('gulp');
var conf = require('./conf');
var path = require('path');
var gulpNgConfig = require('gulp-ng-config');
var args = require('yargs').argv,
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    PluginError = $.util.PluginError,
    del = require('del'),
    karmaServer = require('karma').Server,
    protractor = $.protractor.protractor,
    webdriver = $.protractor.webdriver,
    express = require('express');

/*
 * Development Section
 * */

// This generates the development configuration(live) file
// app/config.js
// This task is used by the task "build:development"
gulp.task('generateDevelopmentLocalConfig', function() {
    var dir = path.join(conf.paths.src, '/js/');
    log(dir);
    gulp.src('config.json')
        .pipe(gulpNgConfig('angle', {
            environment: ['env.development.local', 'global']
        }))
        .pipe(gulp.dest(dir));
});

/*
 * Staging Section
 * */

// This generates the staging configuration file
// app/config.js
// Which outputs angular module "pdx.config"
// This task is used by the task "build:staging"
gulp.task('generateStagingPublicConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('angle', {
            environment: ['env.staging.public', 'global']
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/js/')));
});

gulp.task('generateStagingLocalConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('angle', {
            environment: ['env.staging.local', 'global']
        }))
        .pipe(gulp.dest(path.join(conf.paths.src, '/js/')));
});


/*
 * Production Section
 * */

// This generates the production(live) configuration file
// src/app/config.js
// Which outputs angular module "pdx.config"
// This task is used by the task "build:production"
gulp.task('generateProductionConfig', function() {
    gulp.src('config.json')
        .pipe(gulpNgConfig('angle', {
            environment: ['env.production', 'global']
        }))
        .pipe(gulp.dest(path.join(conf.paths.app, '/js/')))
});


// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}
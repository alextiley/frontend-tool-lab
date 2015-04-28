/**
 * ----------------------
 * Usage ./gulp.sh [task]
 * ----------------------
 *
 * @todo: SASS compilation, asset minification
 *
 * LiveReload on save
 * ------------------
 * 1. Install the Chrome / Firefox LiveReload plugin for your browser
 * 2. Enable the LiveReload plugin in the browser
 * 3. Run gulp, i.e. './gulp.sh' - the default task will load and scan for changes to css files
 * 4. Change a file that is being watched (defined in paths.livereload, below)
 *
 * Unit tests on save
 * ------------------
 * 1. Run gulp, i.e. './gulp.sh' - the default task will load and scan for changes to css files
 * 2. Change a file that is being watched (defined in karma.conf.js)
 */
(function () {

    'use strict';

    /*global require, __dirname*/

    var gulp = require('gulp'),
        plugins = {},
        paths = {},
        self = {};

    /**
     * List all plugins here
     * @type {{}}
     */
    plugins = {
        karma: require('karma').server,
        util: require('gulp-util'),
        livereload: require('gulp-livereload')
    };

    /**
     * When these files are changed, live reload will trigger if running
     * @type []
     */
    paths.livereload = [
        __dirname + 'css/**/*.css'
    ];

    /**
     * Initializes karma test runner
     * @param watch boolean
     * @param done function
     */
    self.initKarma = function (watch, done) {
        var config = {
            configFile: __dirname + '/karma.conf.js',
            autoWatch: watch,
            singleRun: !watch
        };

        plugins.karma.start(config, function () {
            done(0); // Exit code zero prevents stack trace everytime tests fail.
        });
    };

    /**
     * Runs unit tests ad-hoc. See karma.conf.js for configuration
     */
    gulp.task('test', function (done) {
        self.initKarma(false, done);
    });

    /**
     * Default task. Sets up:
     * 1. Live reload
     * 2. Karma unit test runner
     */
    gulp.task('default', function (done) {
        // Initialise live reload
        plugins.livereload.listen({
            quiet: true
        });

        // Trigger live reload on file change
        gulp.watch(paths.livereload).on('change', function (e) {
            // Log something pretty
            plugins.util.log(
                plugins.util.colors.cyan('[livereload]') + ' Change detected in: ' + plugins.util.colors.green(e.path)
            );
            // Start live reload
            return gulp.src(paths.livereload).pipe(plugins.livereload({
                start: true
            }));
        });

        // Karma unit test runner
        self.initKarma(true, done);
    });

}());

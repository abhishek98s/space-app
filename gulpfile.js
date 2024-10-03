/////////////////////////////////////////////////////////////////
// inside web folder run cmd & type
// gulp watch			>>>>> for FRONTEND SCSS > CSS
/////////////////////////////////////////////////////////////////

// project constants
const projectBaseUrl = "http://tenshima.local.com"; // using vhost

// project paths for watch cmds
var proxyWatchFrontend = projectBaseUrl;

'use strict';
// defining required dependencies
var gulp = require('gulp');
// Importing all the Gulp-related packages we want to use
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

// Frontend File paths
var paths = {
	styles: {
		// By using styles/**/*.sass we're telling gulp to check all folders for any sass file
		src: "src/scss/**/*.scss",
		// Compiled files will end up in whichever folder it's found in (partials are not compiled)
		dest: "dist/css"
	},
	scripts: {
		// By using scripts/**/*.js we're telling gulp to check all folders for any sass file
		src: "src/js/**/*.js",
		// Compiled files will end up in whichever folder it's found in (partials are not compiled)
		dest: "dist/js"
	}
};

// Sass task: compiles the style.scss file into style.css
function style() {
	return gulp
		.src(paths.styles.src)
		.pipe(sass())
		.on("error", sass.logError)
		// Use postcss with autoprefixer and compress the compiled file using cssnano
		.pipe(postcss([autoprefixer('last 2 versions')]))
		.pipe(gulp.dest(paths.styles.dest))

		// Compress/Minify the compiled file using cssnano
		.pipe(postcss([autoprefixer('last 2 versions'), cssnano()]))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.styles.dest))

		// Add browsersync stream pipe after compilation
		.pipe(browserSync.reload({
			stream: true
		}))
}

// JS task: concatenates and uglifies JS files to script.js
function script() {
	return gulp
		.src(paths.scripts.src)
		.pipe(concat('script.js'))
		.pipe(gulp.dest(paths.scripts.dest))

		// Compress the compiled file using uglify
		.pipe(uglify())
		.pipe(concat('script.min.js'))
		.pipe(gulp.dest(paths.scripts.dest))

		.pipe(browserSync.reload({
			stream: true
		}))
}

// A simple task to reload the page
function reload() {
	browserSync.reload();
	done();
}

// Add browsersync initialization at the start of the watch task
function watch() {
	browserSync.init({
		proxy: proxyWatchFrontend,
		online: true,
		port: 3000,
		notify: false
	});
	gulp.watch(paths.styles.src, style);
	gulp.watch(paths.scripts.src, script);

	// We should tell gulp which files to watch to trigger the reload
	gulp.watch("./*.html").on('change', browserSync.reload);
	gulp.watch("./*.php").on('change', browserSync.reload);
}

// Don't forget to expose the task!
exports.watch = watch
exports.style = style;
exports.script = script;

// Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
var build = gulp.parallel(style, script, watch);

// Define default task that can be called by just running `gulp` from cli
gulp.task('default', build);

// export buildFront as well; gulp buildFront
exports.buildFront = gulp.parallel(style, script);

// last updated
// pratap@mi2023_02_20

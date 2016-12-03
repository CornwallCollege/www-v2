"use strict";

var config = require('./gulpconfig.json'),
	gulp = require('gulp'),
	shell = require('gulp-shell'),
	runSequence = require('run-sequence'),
	autoprefixer = require('gulp-autoprefixer'),
	uncss = require('gulp-uncss'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	replace = require('gulp-replace'),
	fs = require('fs'),
	download = require('gulp-download-stream'),
	git = require('gulp-git'),
	gulpif = require('gulp-if'),
	browserSync = require('browser-sync').create(),
	reload      = browserSync.reload,
	build_environment="development";

gulp.task('configure-environment', function() {
  	if(process.env.TRAVIS_BRANCH === 'master') {
  		build_environment = 'production';	
	}
	console.log("Configuring for " +build_environment);
});


gulp.task('fetch-newest-analytics', function() {
	return download('https://www.google-analytics.com/analytics.js')
    	.pipe(gulp.dest('_assets/js'));
});

gulp.task('fetch-newest-maps', function() {
	return download({url:'https://maps.googleapis.com/maps/api/js?key=AIzaSyBanzA6NUlcWkOb4dC8DyPuxs2S9uIrdkQ',
					file:'googlemaps.js'})
    	.pipe(gulp.dest('_assets/js/'));
});

gulp.task('build-bicton', shell.task(['JEKYLL_ENV=' + build_environment + ' bundle exec jekyll build --config _config.yml,_site_bicton_ac_uk.yml']));

gulp.task('build-cornwall', shell.task(['JEKYLL_ENV=' + build_environment + ' bundle exec jekyll build --config _config.yml,_site_cornwall_ac_uk.yml']));

gulp.task('build-duchy', shell.task(['JEKYLL_ENV=' + build_environment + ' bundle exec jekyll build --config _config.yml,_site_duchy_ac_uk.yml']));

gulp.task('build-falmouth', shell.task([ 'JEKYLL_ENV=' + build_environment + ' bundle exec jekyll build --config _config.yml,_site_falmouthmarineschool_ac_uk.yml']));

// Validate html, links, etc.
gulp.task('html-proofer-bicton', function() {
	return gulp.src('index.html', { read: false })
  		.pipe(shell(['bundle exec htmlproofer ./_site/bicton_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/bicton_ac_uk/template.html"  --check-opengraph "true" --check-html "true" --disable-external > ./_site/bicton_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('html-proofer-cornwall', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell(['bundle exec htmlproofer ./_site/cornwall_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/cornwall_ac_uk/template.html" --check-opengraph "true" --check-html "true" --disable-external > ./_site/cornwall_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('html-proofer-duchy', function(done) {
	return gulp.src('index.html', { read: false })
 		.pipe(shell(['bundle exec htmlproofer ./_site/duchy_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/duchy_ac_uk/template.html"  --check-opengraph "true" --check-html "true" --disable-external > ./_site/duchy_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('html-proofer-falmouth', function(done) {
	return gulp.src('index.html', { read: false })
  		.pipe(shell(['bundle exec htmlproofer ./_site/falmouthmarineschool_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/falmouthmarineschool_ac_uk/template.html"  --check-opengraph "true" --check-html "true" --disable-external > ./_site/falmouthmarineschool_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('optimize-html', function() {
 	return gulp.src('index.html', { read: false })
		.pipe(gulpif(build_environment==="production",shell([
			'html-minifier -c html-minifier.conf --input-dir ./_site --output-dir ./_site --file-ext html'
		])));
});

gulp.task('optimize-images', function () {
	return gulp.src(['_site/**/*.jpg', '_site/**/*.jpeg', '_site/**/*.gif', '_site/**/*.png'])
		.pipe(imagemin())
		.pipe(gulp.dest('_site/'));
});

gulp.task('optimize-css-cornwall', function() {
   return gulp.src('_site/cornwall_ac_uk/**/*.css')
	   .pipe(autoprefixer())
	   .pipe(uncss({
		   html: ['_site/cornwall_ac_uk/**/*.html'],
		   ignore: []
	   }))
	   .pipe(cleanCSS())
	   .pipe(gulp.dest('_site/cornwall_ac_uk/'));
});

// Sorting the CSS
gulp.task('styles', ['less'], function() {
  return gulp.src('./assets/css/big/style.css')
  .pipe(csscomb())
  .pipe(gulp.dest('./assets/css/combed'));
});

// Removing unused classes in CSS
gulp.task('uncss', ['styles'], function() {
  return gulp.src('./assets/css/combed/style.css')
    .pipe(uncss({
    html: ['./_site/**/*.html'],
    ignore: [/fp/],
    timeout: 1000
  }))
  .pipe(gulp.dest('./assets/css/uncss/'));
});

// Removing tabs and spaces in CSS
gulp.task('minify-css', ['uncss'], function() {
  return gulp.src('assets/css/uncss/style.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('assets/css/'));
});

// Extracting the critical path CSS
gulp.task('critical', ['minify-css'], function() {
  critical.generate({
    base: '_site/',
    src: 'index.html',  // Extract critical path CSS for index.html
    css: ['assets/css/style.css'],
    dest: './_includes/critical.css',
    minify: true,
    include: [/cc_/],
    ignore: ['@font-face']
  });
});

function buildSite(site_name, callback) {
	console.log('Starting build of: ' + site_name);
	runSequence(
		//'fetch-newest-analytics',
		//'fetch-newest-maps',
		'configure-environment',
		'build-'+site_name,
		'html-proofer-'+site_name, 
		callback
	);	
}

function serveSite(site_name) {

	buildSite(site_name, () => {
		browserSync.init({
		    files: ['./_site/' +site_name+'_ac_uk/**'],
		    port: 4000,
		    server: {
		      baseDir: './_site/' +site_name+'_ac_uk/'
		    }
		});
	});	
}

gulp.task('serve-bicton', () => {
	serveSite('bicton');
});

gulp.task('serve-cornwall', () => {
	serveSite('cornwall');
  
});

gulp.task('serve-duchy', () => {
	serveSite('duchy');
  
});

gulp.task('serve-falmouth', () => {
	serveSite('falmouth');
  
});

gulp.task('dry-run-all', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'fetch-newest-maps',
		'configure-environment',
		'build-bicton',
		'build-cornwall',
		'build-duchy',
		'build-falmouth',
		'html-proofer-bicton',
		'html-proofer-cornwall',
		'html-proofer-duchy',
		'html-proofer-falmouth',
		'optimize-images',
		'optimize-css',
		'optimize-html',
		callback
	);
});

gulp.task('deploy', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'fetch-newest-maps',
		'configure-environment',
		'build-bicton',
		'build-cornwall',
		'build-duchy',
		'build-falmouth',
		'html-proofer-bicton',
		'html-proofer-cornwall',
		'html-proofer-duchy',
		'html-proofer-falmouth',
		'optimize-html',
		'optimize-images',
		callback
	);
});
var config = require('./gulpconfig.json'),
	gulp = require('gulp'),
	shell = require('gulp-shell'),
	htmlmin = require('gulp-html-minifier'),
	runSequence = require('run-sequence'),
	autoprefixer = require('gulp-autoprefixer'),
	uncss = require('gulp-uncss'),
	cleanCSS = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	replace = require('gulp-replace'),
	fs = require('fs'),
	download = require('gulp-download-stream'),
	git = require('gulp-git'),
	build_environment="development";

gulp.task('fetch-newest-analytics', function() {
	return download('https://www.google-analytics.com/analytics.js')
    	.pipe(gulp.dest('_assets/js'));
});

gulp.task('fetch-newest-maps', function() {
	return download({url:'https://maps.googleapis.com/maps/api/js?key=AIzaSyBanzA6NUlcWkOb4dC8DyPuxs2S9uIrdkQ',
					file:'googlemaps.js'})
    	.pipe(gulp.dest('_assets/js/'));
});

gulp.task('build-bicton', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'JEKYLL_ENV=' + build_environment + ' jekyll build --config _config.yml,_site_bicton_ac_uk.yml'
		]));
});

gulp.task('build-cornwall', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'JEKYLL_ENV=' + build_environment + ' jekyll build --config _config.yml,_site_cornwall_ac_uk.yml'
		]));
});

gulp.task('build-duchy', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'JEKYLL_ENV=' + build_environment + ' jekyll build --config _config.yml,_site_duchy_ac_uk.yml'
		]));
});

gulp.task('build-falmouth', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'JEKYLL_ENV=' + build_environment + ' jekyll build --config _config.yml,_site_falmouthmarineschool_ac_uk.yml'
		]));
});

// Validate html, links, etc.
gulp.task('html-proofer-bicton', function() {
	return gulp.src('index.html', { read: false })
  		.pipe(shell(['htmlproofer ./_site/bicton_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/bicton_ac_uk/template.html"  --check-opengraph "true" --check-html "true" --disable-external > ./_site/bicton_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('html-proofer-cornwall', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell(['htmlproofer ./_site/cornwall_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/cornwall_ac_uk/template.html" --check-opengraph "true" --check-html "true" --disable-external > ./_site/cornwall_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('html-proofer-duchy', function(done) {
	return gulp.src('index.html', { read: false })
 		.pipe(shell(['./_site/duchy_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/duchy_ac_uk/template.html"  --check-opengraph "true" --check-html "true" --disable-external > ./_site/duchy_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('html-proofer-falmouth', function(done) {
	return gulp.src('index.html', { read: false })
  		.pipe(shell(['./_site/falmouthmarineschool_ac_uk --url-ignore "/#.*/" --file-ignore "./_site/falmouthmarineschool_ac_uk/template.html"  --check-opengraph "true" --check-html "true" --disable-external > ./_site/falmouthmarineschool_ac_uk/error.txt 2>&1'], {ignoreErrors: true}));
});

gulp.task('optimize-html', function() {
 	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'html-minifier -c html-minifier.conf --input-dir ./_site --output-dir ./_site --file-ext html'
		]));
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

gulp.task('rsync-files', function() {
	return gulp.src('index.html', { read: false })
		.pipe(shell([
			'cd _site && rsync -az --delete . ' + config.remoteServer + ':' + config.remotePath
		]));
});

gulp.task('configure-environment', function() {
  	if(process.env.TRAVIS_BRANCH === 'master') {
  		build_environment = 'production';	
	}
});

gulp.task('raw-build-all', function(callback) {
	runSequence(
		'configure-environment',
		'build-bicton',
		'build-cornwall',
		'build-duchy',
		'build-falmouth',
		callback
	);
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

gulp.task('dry-run-cornwall', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'fetch-newest-maps',
		'configure-environment',
		'build-cornwall',
		'html-proofer-cornwall',
		'optimize-html',
		'optimize-images',
		//'optimize-css-cornwall',
		callback
	);
});

gulp.task('deploy', function(callback) {
	runSequence(
		'fetch-newest-analytics',
		'jekyll',
		'optimize-images',
		'optimize-css',
		'optimize-html',
		'rsync-files',
		'purge-cache',
		callback
	);
});
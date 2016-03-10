var fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    exec = require('child_process').exec,
    unzip = require('gulp-unzip'),
    sass = require('gulp-sass'),
    imports = require('gulp-imports'),
    rename = require('gulp-rename'),
    upload = require('gulp-upload'),
    webserver = require('gulp-webserver'),
    replace = require('gulp-replace'),
    download = require('gulp-download');

//
// Replace this with the API token that you want to use when authenticating
// with Reflect services.
//
const REFLECT_API_TOKEN = '',
      REFLECT_PROJECT_SLUG = '';

//
// This might need to be updated incrementally.
//
const REFLECT_UI_LATEST_URL = "https://s3.amazonaws.com/reflect-io/reflect-ui-latest.zip";
const REFLECT_JS_LATEST_URL = "https://s3.amazonaws.com/reflect-io/reflect-latest.zip";

gulp.task('compile', ['html', 'js', 'sass']);
gulp.task('default', ['compile', 'serve', 'watch']);

gulp.task('download-reflect-js', function() {
  download(REFLECT_JS_LATEST_URL)
    .pipe(unzip())
    .pipe(gulp.dest("vendor/reflect-js/"));
});

gulp.task('download-reflect-ui', function() {
  download(REFLECT_UI_LATEST_URL)
    .pipe(unzip())
    .pipe(gulp.dest("vendor/reflect-ui/"));
});

gulp.task('html', function() {
  var view_configuration = fs.readFileSync('./view_configuration.json', 'utf-8');

  gulp.src('src/index.html')
    .pipe(replace('{{view_configuration}}', view_configuration))
    .pipe(replace('{{api_token}}', REFLECT_API_TOKEN))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  gulp.src('src/js/index.js')
    .pipe(imports())
    .pipe(gulp.dest('build/js'));
});

gulp.task('sass', function() {
  gulp.src('src/styles/styles.scss')
    .pipe(sass({errLogToConsole: true, includePaths: ['./vendor']}))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('serve', function() {
  gulp.src('build')
    .pipe(webserver());
});

gulp.task('watch', function() {
  gulp.watch(['./src/*.html'], ['html']);
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/styles/*.scss'], ['sass']);
})

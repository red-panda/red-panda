var autoprefixer = require('autoprefixer');
var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var rev = require('gulp-rev');
var imagemin = require('imagemin');

gulp.task('css', function(){
    return gulp.src('src/app/assets/stylesheets/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(({outputStyle: 'compressed'})).on('error', sass.logError))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write())
        // .pipe(rev())
        .pipe(gulp.dest('build/css/'))
});

gulp.task('watch', function () {
    gulp.watch('src/app/assets/stylesheets/**/*.scss', ['css']);
    gulp.watch('src/app/assets/javascript/**/*.javascript', ['js']);
});

gulp.task('js', function(){
    return gulp.src('src/app/assets/javascript/*.javascript')
        .pipe(sourcemaps.init())
        .pipe(concat('app.min.javascript'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

gulp.task('images', function () {
    return gulp.src('src/app/assets/images/**/*.{gif,jpg,jpeg,png,svg}', ['images'])
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

gulp.task('default', [ 'css', 'js', 'images' ]);
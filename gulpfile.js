
var gulp = require('gulp'),
nodemon = require('gulp-nodemon');
const exec = require('child_process').exec

gulp.task('node-build', function() {
  nodemon({
    script: 'build/build.js',
    watch: [
      'src/apps/**/*.*'
    ]
  });
})


gulp.task('node-dev', function() {
  exec('node build/dev-server.js')
})

gulp.task('default',['node-build','node-dev']);
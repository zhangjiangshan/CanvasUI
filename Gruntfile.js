module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
        dist: {
           options: {
              transform: [
                 ["babelify"]
              ]
           },
           files: {
              // if the source file has an extension of es6 then
              // we change the name of the source file accordingly.
              // The result file's extension is always .js
              "./dist/bundle.js": ["./main.js"]
           }
        }
     },
     watch: {
        scripts: {
           files: ["./view/*.js", "./main.js", "./util/*.js"],
           tasks: ["browserify"]
        }
     }
  });

}

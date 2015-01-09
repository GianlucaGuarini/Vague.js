module.exports = function(grunt) {

  grunt.initConfig({

    // Tasks configuration
    uglify: {
      my_target: {
        files: {
          'vague.min.js': ['vague.js']
        }
      }
    },
    
    watch: {
      files: ['vague.js'],
      tasks: ['uglify']
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Custom tasks
  grunt.registerTask('default', ['uglify']);

};
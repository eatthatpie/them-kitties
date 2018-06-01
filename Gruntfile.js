module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
      paths: {
          dest: {
              js: 'docs/build.js'
          }
      },
      concat: {
          js: {
              options: {
                  separator: ';'
              },
              src: [
                'src/game.js', 
                'src/game.levels.js', 
                'src/game.values.js', 
                'src/game.strings.js', 
                'src/game.dialog.js', 
                'src/game.sound.js', 
                'src/game.board.js', 
                'src/game.board.cat.js', 
                'src/game.hud.js', 
                'src/game.listeners.js'
              ],
              dest: '<%= paths.dest.js %>'
          }
      }
  });

  grunt.registerTask('default', ['concat']);
};
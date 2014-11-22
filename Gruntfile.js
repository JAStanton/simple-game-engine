module.exports = function(grunt) {
  grunt.initConfig({

    sass: {
      dist: {
        options: {
          compass: true,
          style: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'frontend/stylesheets',
          src: ['**/*.sass'],
          dest: 'frontend/static/css_compiled',
          ext: '.css'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          'frontend/static/css_compiled/game.min.css': [
            'frontend/static/css_compiled/**/*.css',
            '!frontend/static/css_compiled/**/*.min.css'
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: ['frontend/javascript/**/*.js'],
        tasks: ['js']
      },
      sass: {
        files: ['frontend/stylesheets/**/*.sass'],
        tasks: ['css']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'frontend/static/**/*'
        ]
      }
    },

    fixjsstyle: {
      options: {
        flags: [
          '--strict',
          '--closurized_namespaces=Game'
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: 'frontend/javascript/**/*.js'
      }
    },

    gjslint: {
      options: {
        flags: [
          '--strict',
          '--closurized_namespaces=Game'
        ],
        reporter: {
          name: 'console'
        }
      },
      all: {
        src: 'frontend/javascript/**/*.js'
      }
    },

    'closure-compiler': {
      prod: {
        closurePath: '$CLOSURE_PATH',
        js: 'frontend/javascript/**/*.js',
        jsOutputFile: 'frontend/static/js_compiled/game.min.js',
        maxBuffer: 500,
        options: {
          compilation_level: 'ADVANCED_OPTIMIZATIONS',
          language_in: 'ECMASCRIPT5_STRICT'
        }
      },
      dev: {
        closurePath: '$CLOSURE_PATH',
        js: 'frontend/javascript/**/*.js',
        jsOutputFile: 'frontend/static/js_compiled/game.js',
        maxBuffer: 500,
        options: {
          compilation_level: 'SIMPLE_OPTIMIZATIONS',
          debug: true,
          warning_level: 'VERBOSE',
          formatting: 'PRETTY_PRINT'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-gjslint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('js', ['gjslint', 'closure-compiler']);
  grunt.registerTask('css', ['sass', 'cssmin']);
  grunt.registerTask('build', ['js', 'css']);
  grunt.registerTask('default', ['js', 'css', 'watch']);
};

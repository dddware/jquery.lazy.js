module.exports = function(grunt)
{
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            default: ['src/jquery.lazy.js']
        },

        uglify: {
            default: {
                files: {
                    'dist/jquery.lazy.min.js': ['src/jquery.lazy.js']
                }
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['jshint', 'uglify']);
};
module.exports = function (grunt) {
    grunt.initConfig({
        ngdocs: {
            options: {
                dest: 'docs',
                scripts: [
                    'https://code.jquery.com/jquery-2.1.4.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular.js',
                    'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular-animate.js',
                    '../src/sui-checkbox.js',
                    '../src/sui-rating.js',
                    '../src/sui-accordion.js'
                ],
                styles: [
                    'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.0.7/semantic.css'
                ]
            },
            api: {
                src: ['src/**/*.js'],
                title: "Angular-sui Documentation"
            }
        },
        clean: ['docs'],
        watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/**/*.js'
                ],
                tasks: ['ngdocs']
            }
        },
        connect: {
            options: {
                port: 8000,
                livereload: true
            },
            livereload: {
                options: {
                    open: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-ngdocs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('api', ['clean', 'ngdocs', 'connect:livereload', 'watch']);
    grunt.registerTask('default', ['api']);
};

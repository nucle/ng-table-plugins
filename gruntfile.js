/**
 * Created by nucle on 24.09.15.
 * version: 0.1.0
 *
 * To run this script install all needed packages with the following command:
 * npm install <package> --save-dev
 *
 * Packages:
 * grunt-contrib-concat
 * grunt-contrib-uglify
 * grunt-contrib-cssmin
 *
 */
module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        cmpnt: grunt.file.readJSON('bower.json'),
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! ngTablePlugins v<%= cmpnt.version %> by <%= cmpnt.authors %>*/\n',
        concat: {
            js: {
                src: [
                    // app
                    'src/scripts/column-visibility.js',
                    'dist/ng-table-plugins-templates.js'
                ],
                dest: 'dist/ng-table-plugins.js'
            },
            css: {
                src: [
                    'src/scripts/style.css'
                ],
                dest: 'dist/ng-table-plugins.css'

            }
        },
        uglify: {
            js: {
                src: ['dist/ng-table-plugins.js'],
                dest: 'dist/ng-table-plugins.min.js',

                options: {
                    banner: '<%= banner %>',
                    sourceMap: true,
                    mangle: false,
                    report: 'min'
                }
            }
        },
        cssmin: {
            css: {
                files: {
                    'web/wkg-tool.min.css': 'src/css/wkg-tool.css'
                },
                options: {
                    banner: '<%= banner %>'
                }
            }
        },
        clean: {
            src: ['dist/*'],
            rem: ['dist/ng-table-plugins-templates.js']
        },
        copy: {
            main: {
                expand: true,
                flatten: true,
                src: ['dist/*'],
                dest: 'examples/'
            }
        },
        watch: {
            scripts: {
                files: ['src/**'],
                tasks: ['build'],
                options: {
                    spawn: false
                }
            }
        },
        html2js: {
            options: {
                base: 'src/',
                singleModule: true,
                module: 'ngTablePluginsTemplates',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }

            },
            main: {
                src: ['src/templates/**/*.html'],
                dest: 'dist/ng-table-plugins-templates.js'
            }
        },
        "file-creator": {
            "prod": {
                "web/config.js": function (fs, fd, done) {
                    fs.writeSync(fd, 'var debug = false;\n');
                    fs.writeSync(fd, 'var version = "v0.7.7";');
                    done();
                }
            }
        }

    });

    grunt.registerTask('build', ['clean', 'html2js', 'concat', 'uglify', 'cssmin', 'clean:rem', 'copy']);
};
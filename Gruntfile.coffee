path = require 'path'

# Build configurations.
module.exports = (grunt) ->
    grunt.initConfig
        cmpnt: grunt.file.readJSON('bower.json'),
        banner: '/*! ngTablePlugins v<%= cmpnt.version %> by Christian Behon(christian.behon@knusperleicht.at) - ' +
                    'https://github.com/nucle/ng-table-plugins - New BSD License */\n',
            
        # Deletes built file and temp directories.
        clean:
            working:
                src: [
                    'ng-table.*'
                    './.temp/views'
                    './.temp/'
                ]

        uglify:
            # concat js files before minification
            js:
                src: ['ng-table-plugins.src.js']
                dest: 'ng-table-plugins.js'
                options:
                  banner: '<%= banner %>'
                  sourceMap: (fileName) ->
                    fileName.replace /\.js$/, '.map'
        concat:
            # concat js files before minification
            js:
                src: [
                    'src/scripts/*.js'
                ]
                dest: 'ng-table-plugins.src.js'

    grunt.loadNpmTasks 'grunt-contrib-clean'
    grunt.loadNpmTasks 'grunt-contrib-copy'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-concat'

    grunt.registerTask 'dev', [
        'clean'
        'concat'
    ]
    grunt.registerTask 'default', [
        'dev'
        'uglify'
    ]

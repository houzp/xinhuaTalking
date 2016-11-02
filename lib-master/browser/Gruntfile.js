/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-07-13-01:46:45
 *
 * @Last modified by:   SuperWoods
 * @Last modified time: 2016-07-14-09:47:35
 */

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // 显示解析时间
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/**\n' +
            ' * Copyright (c) 2000 - <%= grunt.template.today("yyyy") %> XINHUANET.com All Rights Reserved.\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
            ' */\n',
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            execute: {
                files: {
                    'dist/browser.min.js': ['dist/browser.js'],
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'uglify',
    ]);
};

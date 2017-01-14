/**
* @Author: St. <SuperWoods>
* @Date:   2017-01-14-11:34:26
* @Email:  st_sister@iCloud.com
* @Filename: Gruntfile.js
* @Last modified by:   SuperWoods
* @Last modified time: 2017-01-14-16:38:16
* @License: MIT
* @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
*/

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    // 显示解析时间
    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: {
            src: 'dev', // 开发环境目录
            dist: 'build' // 生产环境目录
        },
        banner: '/**\n' +
            ' * Copyright (c) 2000 - <%= grunt.template.today("yyyy") %> XINHUANET.com All Rights Reserved.\n' +
            ' * <%= pkg.name %> v<%= pkg.version %>\n' +
            ' * @time <%= grunt.template.today("yyyy-mm-dd-HH.MM.ss") %>\n' +
            ' */\n',
        //css文件合并
        concat: {
            options: {
                //all 不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                // preserveComments: 'false',
                banner: '<%= banner %>',
                stripBanners: true
            },
            cssAddBanner: {
                files: [{
                    expand: true,
                    cwd: 'bundle/',
                    src: ['*.css'],
                    dest: 'bundle/',
                }]
            },
            buildIndexAllJS: {
                files: {
                    'bundle/index.all.js': [ // bundle js
                        'lib/Swiper-3.4.1/dist/js/swiper.jquery.min.js',
                        'lib/jquery.qrcode/jquery.qrcode.min.js',
                        'lib/gsap/TweenMax.min.js',
                        'lib/triangleBg/cav.js',
                        'lib/resLoader/resLoader.min.js',
                        'bundle/index.min.js',
                        'hzpIsMostHandsome/index2.js',
                    ],
                }
            },
        },
        cssmin: {
            execute: {
                files: {
                    'bundle/index.min.css': ['bundle/index.min.css'],
                }
            },
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            execute: {
                files: {
                    'bundle/index.min.js': ['bundle/index.min.js'],
                    'bundle/footer.min.js': ['bundle/footer.min.js'],
                    'bundle/isAboveIE9.swiper.min.js': ['bundle/isAboveIE9.swiper.min.js'],
                    'bundle/isAboveIE9.jquery.parallax.min.js': ['bundle/isAboveIE9.jquery.parallax.min.js'],
                    // 'bundle/footer.min.js': ['bundle/footer.min.js'],
                    // 'bundle/jquery.parallax.min.js': ['bundle/jquery.parallax.min.js'],
                    // 'bundle/mask.min.js': ['bundle/mask.min.js'],
                    // 'bundle/mod-ani.min.js': ['bundle/mod-ani.min.js'],
                    // 'bundle/nav.min.js': ['bundle/nav.min.js'],
                }
            },
            indexAll: {
                files: {
                    'bundle/index.all.min.js': ['bundle/index.all.js']
                }
            },
            triangleBg: {
                files: {
                    'lib/triangleBg/cav.min.js': ['lib/triangleBg/cav.js'],
                    'lib/triangleBg/triangleBg.min.js': ['lib/triangleBg/triangleBg.js'],
                }
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // grunt.registerTask('html', ['copy', 'useminPrepare', 'usemin']);
    // grunt css
    grunt.registerTask('css', [
        'cssmin', // css: cssmin
        'concat:cssAddBanner', // cssAddBanner
    ]);

    // grunt css
    grunt.registerTask('cssBtn', [
        'cssmin:btn',
    ]);

    // grunt css
    grunt.registerTask('triangleBg', [
        'uglify:triangleBg',
    ]);

    // default
    grunt.registerTask('default', [
        'concat:buildIndexAllJS', // js: concat
        'uglify:indexAll', // uglify
        'cssmin', // css: cssmin
        'concat:cssAddBanner', // cssAddBanner
    ]);

};

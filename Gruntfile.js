/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-07-13-01:46:45
 *
* @Last modified by:   SuperWoods
* @Last modified time: 2017-01-10-09:50:30
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

        // // 清空dist
        // clean: {
        //     dist: {
        //         src: ['<%= config.dist %>']
        //     },
        //     // dist2: {
        //     //     src: [
        //     //         '<%= config.dist %>/index.html',
        //     //     ]
        //     // },
        // },
        //
        // // copy img 到dist目录，如果启用img压缩模块请关闭这里
        copy: {
            // img: {
            //     files: [{
            //         expand: true,
            //         cwd: '<%= config.src %>/img/', // Src matches are relative to this path
            //         src: ['*.{png,jpg,jpeg,gif,webp,svg}'], // Actual patterns to match
            //         dest: '<%= config.dist %>/img/' // Destination path prefix
            //     }]
            // },
            // html: {
            //     files: [{
            //         expand: true,
            //         cwd: '<%= config.src %>/',
            //         src: ['*.html'], // *.html: all
            //         dest: '<%= config.dist %>/', // Destination path prefix.
            //         // ext: '.html', // Dest filepaths will have this extension.
            //     }]
            // },
            maps: {
                files: [{
                    expand: true,
                    cwd: 'js/maps/',
                    src: ['*.map'],
                    dest: 'bundle/maps/',
                }]
            },
            // cases: {
            // 	files: [{
            //         expand: true,
            //         cwd: '<%= config.src %>/case/',
            //         src: ['*.*'],
            //         dest: '<%= config.dist %>/case/',
            //     }]
            // }
        },
        //
        // // Reads HTML for usemin blocks to enable smart builds that automatically
        // // concat, minify and revision files. Creates configurations in memory so
        // // additional tasks can operate on them
        // useminPrepare: {
        //     html: '<%= config.dist %>/*.html',
        //     options: {
        //         dest: '<%= config.dist %>/',
        //     }
        // },
        // // Performs rewrites based on filerev and the useminPrepare configuration
        // usemin: {
        //     html: ['<%= config.dist %>/{,*/}*.html'],
        //     options: {
        //         assetsDirs: [
        //             '<%= config.dist %>/',
        //         ],
        //     }
        // },

        concat: { //css文件合并
            options: {
                //all 不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                // preserveComments: 'false',
                banner: '<%= banner %>',
                stripBanners: true
            },
            // js: {
            //     /*
            //         输出路径: [
            //             输入路径,
            //             输入路径
            //         ]
            //     */
            //     files: {
            //         '<%= config.dist %>/dist/index.js': [ // bundle js
            //             "<%= config.src %>/js/jq.js",
            //             "<%= config.src %>/js/swiper.jquery.min.js",
            //             // "<%= config.src %>/js/echarts-all.js",
            //             "<%= config.src %>/bundle/index.js",
            //         ],
            //     },
            // },
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
                        'bundle/isAboveIE9.swiper.min.js',
                        'bundle/isAboveIE9.jquery.parallax.min.js',
                        'bundle/jquery-ui.min.js',
                        'bundle/index.min.js',
                        'bundle/footer.min.js',
                    ],
                }
            },
        },

        cssmin: {
            execute: {
                files: {
                    'bundle/index.min.css': ['bundle/index.min.css'],
                    // 'bundle/homepage.min.css': ['bundle/homepage.min.css'],
                    // 'bundle/idangerous.swiper.css': ['bundle/idangerous.swiper.css'],
                }
            },
            btn: {
                files: {
                    'css/btn.min.css': ['css/btn.css'],
                    // 'bundle/homepage.min.css': ['bundle/homepage.min.css'],
                    // 'bundle/idangerous.swiper.css': ['bundle/idangerous.swiper.css'],
                }
            }
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
            // history_info1: {
            //     files: {
            //         'jade/history_info1.data.js': ['tool/history_info2/dist/history_info1.data.js']
            //     }
            // },
            // history_info2: {
            //     files: {
            //         'jade/history_info2.data.js': ['tool/history_info2/dist/history_info2.data.js']
            //     }
            // },
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
        // 'clean:dist',          //  dist: clean
        'concat:buildIndexAllJS', //    js: concat
        'uglify:indexAll', //        uglify
        'cssmin', //   css: cssmin
        'concat:cssAddBanner', //        cssAddBanner
        // 'concat:buildIndexAllJS', //        buildIndexAllJS
        // 'copy:html',           //  html: copy
        // 'useminPrepare',       //        useminPrepare
        // 'usemin',              //        usemin
        // 'copy:img',            //   img: copy
        // 'copy:maps',           //  maps: copy
        // 'copy:cases',          // cases: copy
    ]);

    // // grunt buildIndexAllJS
    // grunt.registerTask('buildIndexAllJS', [
    //     'concat:buildIndexAllJS', //        buildIndexAllJS
    // ]);


};

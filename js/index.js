/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-05-15:14:23
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {
    const $window = $(window);
    const $body = $('body');

    let media_$tag = null;
    let media_size = {};
    // let media_index = 0;
    let windowScrollTop = 0;
    let swiper = null;

    // 设置 parallax ------------------------------------------------------------
    const $parallaxScene = $('#parallax-scene');

    const isAboveIE9 = window.BROWSER.browser !== 'oldie' && window.BROWSER.browser !== 'ie9';
    const isPC = window.BROWSER.device !== 'iphone' && window.BROWSER.device !== 'android';
    // 初始化parallax
    if (isAboveIE9) {
        // $body.append(`
        //         <script src="bundle/swiper.min.js"></script>
        //         <script src="bundle/jquery.parallax.min.js"></script>
        //         `);
        $parallaxScene.parallax();
        swiper = new Swiper('#part-item-pic', {
            loop: true,
            pagination: '.swiper-pagination',
            prevButton: '.swiper-button-prev',
            nextButton: '.swiper-button-next',
            // effect: 'cube',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 60,
                stretch: 90,
                depth: 500,
                modifier: 1,
                slideShadows: true
            }
        });
    } else {
        // < ie10 提示
        $body.append(`
                <!--[if lt IE 10]>
                    <div class="ie-tip">为达到更佳浏览效果，请使用chrome、Safari、firefox、IE9及以上浏览器</div>
                <![endif]-->`);
    }

    // 添加行和间距 br
    $('.part-text .abs br').after('<br>&#8195;&#8195;');

    // // 写入人物文字
    // if (window.BROWSER.device !== 'iphone' && window.BROWSER.device !== 'android') {
    //     $parallaxScene
    //         .find('.person-img-title')
    //         .text($parallaxScene.find('.person-img-text').text());
    // }


    // if (window.BROWSER.browser === 'oldie' || window.BROWSER.browser === 'ie9') {
    //
    // }


    // 设置 banner 背景 ---------------------------------------------------------
    // $parallaxScene
    //     .find('.banner')
    //     .css({
    //         'background-image': `url(${$parallaxScene.find('.part-bg img').attr('src')})`,
    //     });

    // 设置 #part 第一条引号为灰色-------------------------------------------------
    const $part = $('#part');
    $part.find('.part-item:eq(0)').addClass('gray');

    // 写入头像 -----------------------------------------------------------------
    const setAvatar = (opt) => {
        const $tag = opt.$tag;
        const list = opt.$list;
        $tag.each(function (i, e) {
            const $e = $(e);
            const n = ($.trim($e.text()) - 0 - 1);
            // console.log(n, $e.text());
            // console.log(n >= 0);
            // console.log(n < list.length);
            // console.log(n !== '');
            if (n >= 0 && n < list.length) {
                $e.after(list.eq(n).clone());
            } else {
                if (opt.isRemove && opt.isRemove === true) {
                    $e.parent().remove();
                } else {
                    let clasName = 'part-no-avatar';
                    if (opt.isNoClass && opt.isNoClass !== '') {
                        clasName = opt.isNoClass;
                    }
                    $e.after(`<div class="${clasName}">暂无头像</div>`);
                }
            }
        });
    };
    setAvatar({
        $tag: $('.part-avatar-img-num'),
        $list: $('#part-avatar-imgs').find('img'),
        isRemove: 'remove',
        // isNoClass: 'part-no-avatar'
    });

    // 媒体数据检查 --------------------------------------------------------------
    const checkMedia = ($tag) => {
        let obj = {};
        // set src
        const src = $tag.find('.src-string');
        if (src.length > 0) {
            let srcText = src.text();
            const keywords = {
                http: 'http://',
                vid: '?vid'
            };
            const isHttp = srcText.indexOf(keywords.http) !== -1;
            const isVid = srcText.lastIndexOf(keywords.vid) !== -1;

            console.log(isHttp && isVid);

            if (isHttp && isVid) {
                obj.type = 'video';
                obj.src = $.trim(srcText);
            }
        }
        // set title
        const title = $tag.find('.title-string');
        if (title.length > 0) {
            obj.title = $.trim(title.text());
        }
        // set poster
        const img = $tag.find('img');
        if (img.length > 0) {
            obj.poster = img.attr('src');
        }
        // console.log('checkMedia ', obj);
        return obj;
    };

    // 对话框 -------------------------------------------------------------------
    const $dialogTag = $('#dialog-video');

    // 实例化对话框
    const dialog = $dialogTag.dialog({
        autoOpen: false,
        height: 425,
        width: 640,
        resizable: true,
        modal: false,
        // show: {
        //     effect: "zoom",
        //     duration: 800
        // },
        close: () => {
            $('.isVideoPlay').remove();
        }
    });

    // 移动版 mobileIframeHieght
    let mobileIframeHieght = null;

    // 对话框处理器
    const dialogHandler = (config) => {
        // 获取目标
        const $tag = config.$tag;
        // 获取播放数据
        const media = checkMedia($tag);
        // 如果是视频
        if (media && media.type === 'video') {
            $tag.addClass('isVideo');

            const iframeDOM = `<iframe class="isVideoPlay" frameborder="0" scrolling="no" width="100%" height="${(isPC)?'100%':((mobileIframeHieght===null)?mobileIframeHieght=$window.width()*9/16:mobileIframeHieght)}" src="${media.src}"></iframe>`;

            if (isPC) {
                // 装载 dialog
                dialog.dialog({
                    // modal: true,
                    position: {
                        of: $tag
                    },
                    open: () => {
                        $dialogTag.html(iframeDOM);
                    }
                });
                // config.button
                // let $btn = $tag;
                // if (config.button && config.button === true) {
                //     $btn = $tag.button();
                // }
                // click
                $tag.on("click", () => {
                    if (dialog.dialog("isOpen")) {
                        dialog.dialog("close");
                    }
                    media_$tag = $tag;
                    dialog.dialog({
                        height: 425,
                        width: 640,
                        position: {
                            my: "center top",
                            at: "center top",
                            of: $tag
                        },
                        title: media.title
                    });
                    dialog.dialog("open");
                    // media_index = config.i;
                    media_size = {
                        top: Math.round($tag.offset().top),
                        bottom: $window.height() - $tag.height(),
                        index: config.i
                    };
                });
            } else {
                $tag.on("click", () => {
                    $tag.html(iframeDOM).removeClass('isVideo');
                });
            }
        } else {
            // isNoBtn
            $tag.removeClass('isVideo');
        }
    };

    // 批量装载对话框
    const $dialogMedia = $body.find('.dialog-media');
    if ($dialogMedia.length) {

        $dialogMedia.each((i, e) => {
            dialogHandler({
                $tag: $(e),
                i: i
            })
        });

        // // 获取第一个 $dialogMedia
        // const dialogMedia0_offsetTop = $dialogMedia.eq(0).offset().top;
        // // const isZoom = (status) => {
        // //     if (!status) {
        // //         return media_index === 0;
        // //     } else {
        // //         return true;
        // //     }
        // // };

        // 返回顶部按钮处理器
        const backTopHandler = {
            css: {
                width: 50,
                // height: '60',
                position: 'fixed',
                right: 10,
                bottom: 20,
                'padding-top': '10px',
                'z-index': 99,
                // background: 'red',
                // cursor: 'pointer'
            },
            $tag: null,
            isTop: false,
            set: function (opt) {
                this.isTop = opt.windowScrollTop < 800;
                if (this.$tag !== null) {
                    if (this.isTop) {
                        this.hide();
                    } else {
                        this.show();
                    }
                } else {
                    this.add();
                    this.events();
                }
            },
            add: function () {
                $body.append(`
                    <div id="backTopBtn" class="hide">
                        <div class="ui-button ui-corner-all ui-widget" style="padding:.6em 0; width: 48px;">
                            <span class="ui-icon ui-icon-arrowthickstop-1-n"></span>
                        </div>
                    </div>`);
                this.$tag = $('#backTopBtn');
                this.$tag.css(this.css);
                // console.log('this.isTop', this.isTop);
                if (this.isTop === false) {
                    this.show();
                }
            },
            events: function () {
                const _this = this;
                _this.$tag.on('click', function () {
                    $body.animate({
                        scrollTop: 0
                    }, '3000', function () {
                        _this.hide();
                    });
                });
            },
            hide: function () {
                this.$tag.fadeOut('1000');
            },
            show: function () {
                this.$tag.fadeIn('1000');
            }
        };


        // 第一屏视频滚动缩放控制器
        if (isAboveIE9) {
            $window.on('scroll', () => {

                windowScrollTop = $window.scrollTop();

                if (dialog.dialog("isOpen")) {
                    // console.log(media_size, windowScrollTop);
                    if (media_size.top < windowScrollTop || media_size.top > (media_size.bottom + windowScrollTop)) {

                        const isTop = backTopHandler.isTop === true;

                        dialog.dialog({
                            height: 256,
                            width: 320,
                            position: {
                                my: "right bottom",
                                at: (isTop) ? "right bottom" : "right top",
                                of: (isTop) ? $window : backTopHandler.$tag
                            }
                        });

                    } else {

                        dialog.dialog({
                            height: 425,
                            width: 640,
                            position: {
                                my: "center top",
                                at: "center top",
                                of: media_$tag
                            }
                        });

                    }
                }

                backTopHandler.set({
                    windowScrollTop: windowScrollTop
                });
            });
        }
    }
});

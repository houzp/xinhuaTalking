/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-21-21:01:02
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {
    // 必要的全局对象
    const $window = $(window);
    const $body = $('body');

    // loader
    const resources = [ // 需要预加载的资源
        '../xinhuaTalking/index-assets/bg.jpg',
        '../xinhuaTalking/index-assets/cover-logo.png',
        '../xinhuaTalking/index-assets/scenes-1-btn-1-active-bg.png',
        '../xinhuaTalking/index-assets/scenes-1-btn-1-bg.png',
    ];

    const loader = new resLoader({
        resources: resources,
        onStart: function (total) {
            // console.log('start:' + total);
        },
        onProgress: function (current, total) {
            // console.log(current + '/' + total);
            // var percent = current / total * 100;
            // $('.progressbar').css('width', percent + '%');
            // $('.progresstext .current').text(current);
            // $('.progresstext .total').text(total);
        },
        onComplete: function (total) {
            // cover
            cover.init();
            // xinhuaTalking
            xinhuaTalking.init();
        }
    });


    // cover
    const cover = {
        $cover: $('#cover'),
        timeout: null,
        init: function () {
            console.log('cover mod:', this.$cover.length);
            if (this.$cover.length) {
                this.coverClear();
                this.coverTimeout();
                this.coverClick();
            }
        },
        coverClick: function () {
            const _this = this;
            _this.$cover.on('click', () => {
                TweenMax.killAll();
                _this.coverHide();
                _this.coverClear();
                console.log('click', _this.timeout);
            });
        },
        coverClear: function () {
            clearTimeout(this.timeout);
            this.timeout = null;
        },
        coverTimeout: function () {
            const _this = this;
            _this.timeout = setTimeout(() => {
                _this.coverHide();
            }, 200);
        },
        coverHide: function () {
            console.log('coverHide');
            const _this = this;
            const time = 4;
            $body.addClass('overflow-hidden');
            // anis
            TweenMax.to(_this.$cover, time, {
                scale: 12,
                opacity: 0,
                ease: Power4.easeInOut,
                // ease: SlowMo.ease.config(0.7, 0.7, false),
                onStart: function () {
                    _this.$cover.off('click');
                },
                onComplete: function () {
                    _this.$cover.remove();
                    $body.removeClass('overflow-hidden');
                    console.log('remove');
                }
            });
        }
    };

    const xinhuaTalking = {
        $nav: $('#nav'),
        $scenes1: $('#scenes-1'),
        navHeight: 67,
        activeIndex: 0,
        init: function () {
            const _this = this;

            // getSize
            _this.getSize();

            // nav
            _this.navHeight = this.$nav.height();
            $window.on('resize', () => {
                if (_this.activeIndex < 1) {
                    _this.getSize();
                }
                _this.navStatus(_this.activeIndex);
            });

            // swiper
            _this.scenesMain = _this.scenesMain(1000);
            _this.scenes[1] = _this.scenes(1, {
                onInit: function (swiper) {
                    _this.zoom();
                    _this.qrcode();
                },
                // onSlideChangeStart: function (swiper) {
                //     _this.qrcode(swiper.activeIndex);
                // }
            });
            // _this.scenes[2] = _this.scenes(2);
            // _this.scenes[3] = _this.scenes(3);
        },
        getSize: function () {
            this.size = {
                height: $window.height(),
                width: $window.width(),
            };
        },
        qrcode: function () {
            const qrcodes = this.$scenes1.find('.scenes-1-qrcode');
            qrcodes.each(function (i, e) {
                const $e = $(e);
                $e.qrcode({
                    correctLevel: 1,
                    // background: "#999",
                    foreground: "#666", //"#0099ff"
                    width: 108,
                    height: 108,
                    text: $.trim($e.find('.scenes-1-qrcode-url').text())
                });
            });
        },
        zoom: function () {
            const tags = [{
                tag: '.scenes-1-logo',
            }, {
                tag: '.scenes-1-title-top',
            }, {
                tag: '.scenes-1-title-1',
            }, {
                tag: '.scenes-1-title-4',
            }, {
                tag: '.scenes-1-content',
            }, {
                tag: '.scenes-1-pic',
                type: 'height'
            }];
            const ratio = (num) => Math.round(num * this.size.height / 1080);
            const set = (opt) => {
                let css = {
                    top: ratio(opt.num),
                };
                if (opt.type === 'height') {
                    css = {
                        height: ratio(opt.num),
                    };
                }
                opt.tag.css(css);
            };
            const init = () => {
                this.getSize();
                for (let i = 0, j = tags.length; i < j; i++) {
                    if (!tags[i].num) {
                        tags[i].tag = this.$scenes1.find(tags[i].tag);
                        console.log(tags[i].tag);
                        if (tags[i].type !== 'height') {
                            tags[i].num = tags[i].tag.offset().top;
                        } else {
                            tags[i].num = tags[i].tag.outerHeight();
                        }
                    }
                    set(tags[i]);
                }
            };
            init();
            $window.on('resize', function () {
                init();
            });
        },
        navPos: function (num, time, callback) {
            TweenMax.to(this.$nav, time, {
                top: num,
                bottom: 'auto',
                onComplete: callback || null
            });
        },
        navStatus: function (activeIndex) {
            const _this = this;
            if (activeIndex < 1) {
                _this.navPos((_this.size.height - _this.navHeight), 0.6, function () {
                    _this.$nav.removeClass('nav-isTop');
                });
            } else {
                _this.navPos(0, 0.6, function () {
                    _this.$nav.addClass('nav-isTop');
                });
            }
        },
        scenesMain: function (time) {
            const _this = this;
            return new Swiper('#main', {
                speed: time || 800,
                // hashnav: true,
                direction: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                // onSlideChangeStart
                onTransitionStart: function (swiper) {
                    console.log(swiper.activeIndex);
                    _this.activeIndex = swiper.activeIndex;
                    _this.navStatus(swiper.activeIndex);
                }
            });
        },
        scenes: function (num, callback) {
            return new Swiper(`#scenes-${num}`, {
                // autoplay: 5000, //可选选项，自动滑动
                loop: true,
                parallax: true,
                pagination: `#scenes-${num} .swiper-pagination`,
                prevButton: `#scenes-${num} .swiper-button-prev`,
                nextButton: `#scenes-${num} .swiper-button-next`,
                paginationClickable: true,
                speed: 2000,
                onInit: callback.onInit,
                onSlideChangeStart: callback.onSlideChangeStart,
            });
        },
    };

    // 读取开始
    loader.start();

});

/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-22-21:44:06
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
        '../xinhuaTalking/index-assets/demo-pic-0.png',
        '../xinhuaTalking/index-assets/demo-pic-1.png',
        '../xinhuaTalking/index-assets/demo-pic-2.png',
        '../xinhuaTalking/index-assets/demo-pic-3.png',
        '../xinhuaTalking/index-assets/demo-pic-4.png',
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
        scenesMain_realIndex: 0,
        aaSwiperIndex: 0,
        init: function () {
            const _this = this;
            // getData
            _this.getData();

            // getSize
            _this.getSize();

            // nav
            _this.navHeight = this.$nav.height();
            $window.on('resize', () => {
                if (_this.scenesMain_realIndex < 1) {
                    _this.getSize();
                }
                _this.navStatus(_this.scenesMain_realIndex);
            });

            // swiper
            _this.scenesMain = new Swiper('#main', {
                speed: 1000,
                hashnav: true,
                direction: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                // onSlideChangeStart
                // onInit: callback.onInit,
                onSlideChangeStart: function (swiper) {
                    console.log(swiper.realIndex);
                    _this.scenesMain_realIndex = swiper.realIndex;
                    _this.navStatus(swiper.realIndex);
                },
                // mousewheelEventsTarged: '#nav',
            });

            _this.scenes_1 = new Swiper(`#scenes-1`, {
                autoplay: 8000, //可选选项，自动滑动
                loop: true,
                parallax: true,
                pagination: `#scenes-1 .swiper-pagination`,
                prevButton: `#scenes-1 .swiper-button-prev`,
                nextButton: `#scenes-1 .swiper-button-next`,
                paginationClickable: true,
                speed: 3000,
                onInit: function (swiper) {
                    _this.zoom();
                    _this.qrcode();
                },
                onSlideChangeStart: function (swiper) {
                    // console.log('s1', swiper.realIndex);
                    $('.swiper-button-content').fadeOut();
                    _this.setBtnPrev(swiper.realIndex);
                    _this.setBtnNext(swiper.realIndex);
                    // _this.setButtonPrev(swiper.realIndex);
                    // _this.setButtonNext(swiper.realIndex);
                },
                onSlideChangeEnd: function (swiper) {
                    // console.log(swiper.realIndex);
                    $('.swiper-button-content').fadeIn();
                },
            });
        },
        getData: function () {
            const _this = this;
            _this.data = new Array();
            _this.$scenes1
                .find('.swiper-slide')
                .each(function (i, e) {
                    const $e = $(e);
                    _this.data.push({
                        title: $.trim($e.find('.scenes-1-title-1').text()),
                        img: $e.find('.scenes-1-pic img').attr('src')
                    });
                });
        },
        setBtnPrev: function (num) {
            const _this = this;
            // console.log('setBtnPrev', num);
            num = num - 1;
            if (num < 0) {
                num = _this.data.length - 1;
            }
            // console.log('setBtnPrev', p);
            $('#prev-img').attr('src', _this.data[num].img)
            $('#prev-t').text(_this.data[num].title);
        },
        setBtnNext: function (num) {
            const _this = this;
            num = num + 1;
            // console.log('setBtnNext', p);
            if (num >= _this.data.length) {
                num = 0;
            }
            // console.log('setBtnNext', num);
            $('#next-img').attr('src', _this.data[num].img)
            $('#next-t').text(_this.data[num].title);
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
                    foreground: "#333", //"#0099ff"
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
                        if (tags[i].type !== 'height') {
                            tags[i].num = tags[i].tag.offset().top;
                        } else {
                            tags[i].num = tags[i].tag.outerHeight();
                        }
                    }
                    set(tags[i]);
                }
            };
            $window.on('resize', function () {
                init();
            });
            init();
        },
        navPos: function (num, time, callback) {
            TweenMax.to(this.$nav, time, {
                top: num,
                bottom: 'auto',
                onComplete: callback || null
            });
        },
        navStatus: function (scenesMain_realIndex) {
            const _this = this;
            if (scenesMain_realIndex < 1) {
                _this.navPos((_this.size.height - _this.navHeight), 0.6, function () {
                    _this.$nav.removeClass('nav-isTop');
                });
            } else {
                _this.navPos(0, 0.6, function () {
                    _this.$nav.addClass('nav-isTop');
                });
            }
        },
    };

    // 读取开始
    loader.start();

});

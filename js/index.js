/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-21-14:20:48
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
            // alert('加载完毕:'+total+'个资源');
            // loadingMask.off();

            // zoom
            zoom.init();
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
            }, 2000);
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
                ease: Power1.easeIn,
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

    const zoom = {
        init: function () {

        },
        setPos: function () {

        },
        setSize: function () {

        },
        reset: function () {

        },
    };

    const xinhuaTalking = {
        $nav: $('#nav'),
        navHeight: 67,
        activeIndex: 0,
        $window: ($window) ? $window : $(window),
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
            _this.scenes[1] = _this.scenes(1);
            // _this.scenes[2] = _this.scenes(2);
            // _this.scenes[3] = _this.scenes(3);
        },
        getSize: function () {
            this.size = {
                height: $window.height(),
                width: $window.width(),
            };
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
        scenes: function (num) {
            return new Swiper(`#scenes-${num}`, {
                // autoplay: 5000, //可选选项，自动滑动
                loop: true,
                parallax: true,
                pagination: `#scenes-${num} .swiper-pagination`,
                prevButton: `#scenes-${num} .swiper-button-prev`,
                nextButton: `#scenes-${num} .swiper-button-next`,
                paginationClickable: true,
                speed: 2000,
            });
        },
    };

    // 读取开始
    loader.start();

});

/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-20-13:58:07
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {

    const $window = $(window);
    const $body = $('body');

    const xinhuaTalking = {
        activeIndex: 0,
        $nav: $('#nav'),
        navHeight: 67,
        timeout: null,
        init: function () {
            const _this = this;
            // getSize
            _this.getSize();

            // cover
            _this.coverInit();

            // nav
            $window.on('resize', () => {
                if (_this.activeIndex < 1) {
                    _this.getSize();
                }
                _this.navStatus(_this.activeIndex);
            });
            _this.navHeight = this.$nav.height();

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
            return this.size;
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
                    _this.$nav.removeClass('isTop');
                });
            } else {
                _this.navPos(0, 0.6, function () {
                    _this.$nav.addClass('isTop');
                });
            }
        },
        coverInit: function (time) {
            const _this = this;
            _this.$cover = $('#cover');
            _this.coverClick = function () {
                _this.$cover.on('click', () => {
                    TweenMax.killAll();
                    _this.coverHide();
                    _this.coverClear();
                    console.log('click', _this.timeout);
                });
            };
            _this.coverClear = function () {
                clearTimeout(this.timeout);
                this.timeout = null;
            };
            _this.coverTimeout = function (time) {
                // const _this = this;
                _this.timeout = setTimeout(function () {
                    _this.coverHide();
                }, (time || 2000));
            };
            _this.coverHide = function () {
                console.log('coverHide');
                // const _this = this;
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
            };
            // console.log(this.$cover.length);
            // init
            if (_this.$cover.length) {
                _this.coverClear();
                _this.coverTimeout();
                _this.coverClick();
            }
        },
        scenesMain: function (time) {
            const _this = this;
            return new Swiper('#main', {
                // loop: true,
                speed: time || 800,
                hashnav: true,
                direction: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                // freeMode: true, // 不能用无法有效控制nav
                // freeModeSticky: true, // 不能用无法有效控制nav
                // onSlideChangeStart
                // onSlideChangeEnd
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
                pagination: `#scenes-${num} .swiper-pagination`,
                prevButton: `#scenes-${num} .swiper-button-prev`,
                nextButton: `#scenes-${num} .swiper-button-next`,
                paginationClickable: true,
            });
        },
    };

    xinhuaTalking.init();

    return xinhuaTalking;
});

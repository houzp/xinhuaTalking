/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-19-22:13:57
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {

    const $window = $(window);
    const $body = $('body');

    const xinhuaTalking = {
        activeIndex: 0,
        $nav: $('#nav'),
        $cover: $('#cover'),
        navHeight: 67,
        timeout: null,
        init: function () {
            const _this = this;
            _this.size = _this.getSize();
            // cover
            _this.coverInit();

            // nav
            $window.on('resize', () => {
                _this.size = _this.getSize();
                _this.setNavStatus(_this.activeIndex);
            });
            _this.navHeight = this.$nav.height();
            _this.setNavPos((_this.size.height - _this.navHeight), 0);

            // swiper
            _this.scenes_main = _this.scenes_main();
            _this.scenes[1] = _this.scenes(1);
            _this.scenes[2] = _this.scenes(2);
            _this.scenes[3] = _this.scenes(3);
        },
        getSize: function () {
            return {
                height: $window.height(),
                width: $window.width(),
            }
        },
        setNavPos: function (num, time) {
            this.$nav
                .stop(false, true)
                .animate({
                    top: num,
                }, time);
            // return this.$nav;
        },
        setNavStatus: function (activeIndex) {
            if (activeIndex < 1) {
                this.setNavPos((this.size.height - 69), 400);
            } else {
                this.setNavPos(0, 400);
            }
        },
        coverInit: function (time) {
            const _this = this;
            var time = time || 2000;
            _this.coverClear();
            _this.timeout = setTimeout(function () {
                _this.coverHide();
            }, time);

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
        coverHide: function () {

            console.log('coverHide');

            const _this = this;
            const time = 4;
            $body.addClass('overflow-hidden');
            // scale
            TweenMax.fromTo(_this.$cover, time, {
                css: {
                    scale: 1,
                }
            }, {
                css: {
                    scale: 10,
                },
                repeat: 0,
                yoyo: false,
                ease: Power1.easeIn,
                onStart: function () {
                    _this.$cover.off('click');
                },
                onComplete: function () {
                    _this.$cover.remove();
                    $body.removeClass('overflow-hidden');
                    console.log('remove');
                },
            });
            // opacity
            TweenMax.fromTo(_this.$cover, time, {
                css: {
                    opacity: 1,
                }
            }, {
                css: {
                    opacity: 0,
                },
                repeat: 0,
                yoyo: false,
                ease: Power1.easeIn,
            });
        },
        scenes_main: function () {
            const _this = this;
            return new Swiper('#main', {
                // loop: true,
                hashnav: true,
                direction: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                // direction: 'vertical',
                // mousewheelForceToAxis: true,
                onSlideChangeStart: function (swiper) {
                    _this.activeIndex = swiper.activeIndex;
                    // console.log(swiper.activeIndex);
                    _this.setNavStatus(_this.activeIndex);
                }
            });
        },
        scenes: function (num) {
            return new Swiper(`#scenes-${num}`, {
                // autoplay: 5000, //可选选项，自动滑动
                pagination: `#scenes-${num} .swiper-pagination`,
                prevButton: `#scenes-${num} .swiper-button-prev`,
                nextButton: `#scenes-${num} .swiper-button-next`,
                // paginationClickable: true,
            });
        },
    };

    xinhuaTalking.init();
});

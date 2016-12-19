/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-19-22:51:26
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
            // getSize
            _this.getSize();

            // cover
            _this.coverInit();

            // nav
            $window.on('resize', () => {
                _this.getSize();
                _this.navStatus(_this.activeIndex);
            });

            _this.navHeight = this.$nav.height();
            _this.navPos((_this.size.height - _this.navHeight), 0);

            // swiper
            _this.scenesMain = _this.scenesMain();
            _this.scenes[1] = _this.scenes(1);
            _this.scenes[2] = _this.scenes(2);
            _this.scenes[3] = _this.scenes(3);
        },
        getSize: function () {
            this.size = {
                height: $window.height(),
                width: $window.width(),
            };
            return this.size;
        },
        navPos: function (num, time) {
            TweenMax.to(this.$nav, time, {
                top: num
            });
            // return this.$nav;
        },
        navStatus: function (activeIndex) {
            if (activeIndex < 1) {
                this.navPos((this.size.height - this.navHeight), 0.4);
            } else {
                this.navPos(0, 0.4);
            }
        },
        coverInit: function (time) {
            console.log(this.$cover.length);
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
        coverTimeout: function (time) {
            const _this = this;
            _this.timeout = setTimeout(function () {
                _this.coverHide();
            }, (time || 2000));
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
        },
        scenesMain: function () {
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
                    _this.navStatus(_this.activeIndex);
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

    return xinhuaTalking;
});

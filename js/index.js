/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-19-20:32:30
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {

    const $window = $(window);
    const $body = $('body');

    const xinhuaTalking = {
        activeIndex: 0,
        init: function () {
            const _this = this;




            _this.size = _this.getSize();
            $window.on('resize', () => {
                _this.size = _this.getSize();
                if (_this) {
                    _this.$nav
                        // .addClass('position-top')
                        .animate({
                            bottom: _this.size.height - 69,
                        }, 400);
                }
            });

            _this.scenes_main();
            _this.scenes[1] = _this.scenes(1);
            _this.scenes[2] = _this.scenes(2);
            _this.scenes[3] = _this.scenes(3);
        },
        getCover: function () {
            this.$cover = $('#cover');
        },
        getNav: function () {
            this.$nav = $('#nav');
        },
        getSize: function () {
            return {
                height: $window.height(),
                width: $window.width(),
            }
        },
        scenes_main: function () {
            const _this = this;

            _this.getNav();

            _this.main = new Swiper('#main', {
                // loop: true,
                hashnav: true,
                direction: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                // direction: 'vertical',
                // mousewheelForceToAxis: true,
                onSlideChangeStart: function (swiper) {

                    _this.activeIndex = swiper.activeIndex;

                    console.log(swiper.activeIndex);

                    if (swiper.activeIndex < 1) {
                        _this.$nav
                            // .removeClass('position-top')
                            .animate({
                                bottom: 0,
                            }, 400);
                    } else {
                        _this.$nav
                            // .addClass('position-top')
                            .animate({
                                bottom: _this.size.height - 69,
                            }, 400);
                    }
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

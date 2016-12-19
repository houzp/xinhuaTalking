/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-19-20:25:06
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {

    // $('#cover').html(`<div id="indexcover_hype_container" style="margin:auto;position:relative;width:100%;height:100%;overflow:hidden;z-index:9999;" aria-live="polite">
    //     <script type="text/javascript" charset="utf-8" src="index-cover.hyperesources/indexcover_hype_generated_script.js?22734"></script>
    // </div>`)

    const $window = $(window);
    const $body = $('body');

    const xinhuaTalking = {
        $nav: $('#nav'),
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
                        }, 400, function () {

                        });
                }
            });

            _this.scenes_main();
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
        scenes_main: function () {
            const _this = this;

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
                            }, 400, function () {

                            });
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

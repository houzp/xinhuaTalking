/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-12-27-20:31:24
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperMoo
* @Last modified time: 2016-12-27-20:35:20
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {
    // 必要的全局对象
    const XHT = window.XHT;
    const $window = window.$window = $(window);
    const $body = window.$body = $('body');
    const cover = XHT.cover; // cover 组件
    const zoom = XHT.zoom;

    let scens1 = null;

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
            // xinhuaTalking
            xinhuaTalking.init();
        }
    });

    const xinhuaTalking = {
        $nav: $('#nav'),
        navHeight: 67,
        scenesMain_realIndex: 0,
        $scenes1: $('#scenes-1'),
        scenes1: null,
        init: function () {
            const _this = this;

            new cover({
                // tag: $('#cover1'), //主目标
                // isOff: 1, //开关
                // hashKey: 'no-cover', //不显示封面的hash关键字
                // aniTime: 4, // TweenMax动画时间
                // delay: 2000, //
            });

            // swiper
            _this.scenesMain = new Swiper('#main', {
                lazyLoading: true,
                speed: 1000,
                hashnav: true,
                direction: 'vertical',
                keyboardControl: true,
                mousewheelControl: true,
                // onSlideChangeStart
                onInit: function (swiper) {
                    // getSwiperData
                    _this.getSwiperData();
                    // getSize
                    _this.getSize();
                    // nav
                    _this.navHeight = _this.$nav.height();

                    $window.on('resize', () => {
                        if (_this.scenesMain_realIndex < 1) {
                            _this.getSize();
                        }
                        _this.navStatus(_this.scenesMain_realIndex);
                    });
                    // scenes_1_init
                    _this.scenes1_init();
                },
                onSlideChangeStart: function (swiper) {
                    console.log(swiper.realIndex);
                    _this.scenesMain_realIndex = swiper.realIndex;
                    _this.navStatus(swiper.realIndex);
                },
                onSlideChangeEnd: function (swiper) {
                    // scenes_1_init
                    _this.scenes1_init();
                },
            });
        },
        scenes1_init: function () {
            const _this = this;
            if (_this.scenesMain_realIndex === 0) {

                new zoom({
                    id: _this.$scenes1,
                    array: [{
                        tag: '.scenes-1-logo',
                    }, {
                        tag: '.scenes-1-title-top',
                    }, {
                        tag: '.scenes-1-title-1',
                    }, {
                        tag: '.scenes-1-title-4',
                    }, {
                        tag: '.scenes-1-content',
                    }],
                });

                if (_this.scenes1 === null) {
                    console.log('scenes_1_init start');
                    _this.scenes1 = new Swiper('#scenes-1', {
                        lazyLoading: true,
                        autoplay: 8000,
                        loop: true,
                        parallax: true,
                        pagination: '#scenes-1 .swiper-pagination',
                        prevButton: '#scenes-1 .swiper-button-prev',
                        nextButton: '#scenes-1 .swiper-button-next',
                        paginationClickable: true,
                        speed: 2000,
                        onInit: function (swiper) {
                            _this.qrcode();
                            const activeBtn = swiper.nextButton;
                            activeBtn
                                .addClass('active')
                                .on('mouseout', function () {
                                    activeBtn.removeClass('active');
                                });
                        },
                        onSlideChangeStart: function (swiper) {
                            let num = [
                                swiper.realIndex - 1,
                                swiper.realIndex + 1
                            ];
                            if (num[0] < 0) {
                                num[0] = _this.data.length - 1;
                            }
                            if (num[1] >= _this.data.length) {
                                num[1] = 0;
                            }
                            _this.setSwiperButton(swiper.prevButton, num[0]);
                            _this.setSwiperButton(swiper.nextButton, num[1]);
                        },
                        // onSlideChangeEnd: function (swiper) {
                        //     $('.setSwiperButtonOn').addClass('active');
                        //     // console.log(swiper.realIndex);
                        //     // $('.swiper-button-content').show();
                        // },
                    });
                } else {
                    _this.scenes1.unlockSwipes();
                }
            } else {
                if (_this.scenes1 !== null) {
                    _this.scenes1.lockSwipes();
                }
            }
        },
        getSwiperData: function () {
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
        setSwiperButton: function ($tag, num) {
            const _this = this;
            $tag.html(`
                    <div class="swiper-button-content">
                        <div class="p">
                            <img src="${_this.data[num].img}" width="102" height="auto">
                        </div>
                        <div class="t">${_this.data[num].title}</div>
                    </div>
                    <div class="icon"></div>
                    <div class="b"></div>`);
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

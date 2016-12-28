/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-28-23:46:34
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
        init: function (_switch) {

            console.log('cover mod:', this.$cover.length);

            if (this.$cover.length && _switch !== 0 && window.location.hash.lastIndexOf('no-cover') < 0) {
                this.coverClear();
                this.coverTimeout();
                this.coverClick();
            } else {
                this.$cover.remove();
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

    const $scenes2 = $('#scenes-2');
    const $scenes2_slide = $scenes2.find('.swiper-slide');
    const scenes2_slide_len = $scenes2_slide.length;
    const $scenes2_items = $scenes2.find('.item');
    let scenesSwiper = null;
    const scenes2_ani = function (num, toggle) {
        console.log('scenes2_ani:', num, toggle);
        if (toggle === 'show') {
            $scenes2_slide
                .eq(num)
                .find('.item')
                .each(function (i, e) {
                    TweenMax.to($(e), 0.4, {
                        x: 0,
                        opacity: 1,
                        delay: i * 0.1
                    });
                });
        } else if (toggle === 'hide') {
            $scenes2_slide
                .eq(num)
                .find('.item')
                .each(function (i, e) {
                    scenes2_hide($(e), 0.4, i * 0.08);
                });
        }
    };

    const scenes2_hide = function (tag, time, delay) {
        TweenMax.to(tag, time, {
            x: 30,
            opacity: 0,
            delay: delay
        });
    };

    const scenes2_init = function (num) {
        console.log(num, num === 1);

        if (num === 1) {
            if (scenesSwiper === null) {
                scenesSwiper = new Swiper('#scenes-2', {
                    lazyLoading: true,
                    effect: 'fade',
                    autoplay: 8000,
                    // loop: true, // 因为背景透明无法使用loop
                    prevButton: '#scenes-2 .swiper-button-prev',
                    nextButton: '#scenes-2 .swiper-button-next',
                    paginationClickable: true,
                    speed: 1800,
                    spaceBetween: 80,
                    onInit: function (swiper) {
                        scenes2_hide($scenes2_items, 0, 0);
                        scenes2_ani(swiper.activeIndex, 'show', 1);
                        // $scenes2_slide.eq(swiper.realIndex).css({
                        //     overflow: 'visibliy'
                        // });
                        $scenes2_items.on('mouseover', function () {
                            const $this = $(this);
                            TweenMax.to($this, 0.2, {
                                scale: 1.25,
                                'box-shadow': '6px 6px 32px rgba(0, 0, 0, 0.35)',
                                onStart: function () {
                                    $this.css({
                                        'z-index': 2,
                                    });
                                    // $this.find('img').css({
                                    //     width: '-=1px',
                                    //     height: '-=1px',
                                    //     'border': '1px #FFF solid',
                                    // });
                                    TweenMax.to($this.find('.mask'), 0.8, {
                                        opacity: 0,
                                    });
                                },
                            });
                        });
                        $scenes2_items.on('mouseout', function () {
                            const $this = $(this);
                            const time = 1.2;
                            TweenMax.to($this, time, {
                                scale: 1,
                                'box-shadow': 'none',
                                onStart: function () {
                                    TweenMax.to($this.find('.mask'), time, {
                                        opacity: 1,
                                    });
                                    $this.css({
                                        'z-index': 1,
                                    });
                                    // $this.find('img').css({
                                    //     width: '100%',
                                    //     height: '100%',
                                    //     'border': 'none',
                                    // });
                                },
                            });
                        });
                    },
                    onSlideChangeStart: function (swiper) {
                        scenes2_ani(swiper.activeIndex, 'show');
                        scenes2_ani(swiper.previousIndex, 'hide');
                    },
                });
                // scenesSwiper.prevButton.on('click', function () {
                //     scenes2_ani(scenesSwiper.activeIndex, 'show');
                //     scenes2_ani(scenesSwiper.previousIndex, 'hide');
                // });
                // scenesSwiper.nextButton.on('click', function () {
                //     scenes2_ani(scenesSwiper.previousIndex, 'hide');
                //     scenes2_ani(scenesSwiper.activeIndex, 'show');
                // });
            } else {
                scenesSwiper.unlockSwipes();
                scenes2_ani(scenesSwiper.activeIndex, 'show', 1);
            }
        } else {
            scenesSwiper.lockSwipes();
            scenes2_hide($scenes2_items, 0, 0);
        }
    };

    const xinhuaTalking = {
        $nav: $('#nav'),
        navHeight: 67,
        scenesMain_realIndex: 0,
        $scenes1: $('#scenes-1'),
        scenes1: null,
        init: function () {
            const _this = this;
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
                    // scenes2_init
                    scenes2_init(swiper.realIndex);

                    // only for test
                    // swiper.slideTo(1);
                    // swiper.lockSwipes();
                },
                onSlideChangeStart: function (swiper) {
                    console.log(swiper.realIndex);
                    _this.scenesMain_realIndex = swiper.realIndex;
                    _this.navStatus(swiper.realIndex);

                    scenes2_init(swiper.realIndex);
                },
                onSlideChangeEnd: function (swiper) {
                    // scenes_1_init
                    _this.scenes1_init();
                    // scenes2_init
                },
            });
        },
        scenes1_init: function () {
            const _this = this;
            if (_this.scenesMain_realIndex === 0) {
                _this.zoom();
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
                        speed: 3000,
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
        zoomTags: [{
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
        zoomResize: null,
        zoomRatio: function (num) {
            return Math.round(num * this.size.height / 1080);
        },
        zoomSet: function (opt) {
            const _this = this;
            let css = {
                top: _this.zoomRatio(opt.num),
            };
            if (opt.type === 'height') {
                css = {
                    height: _this.zoomRatio(opt.num),
                };
            }
            opt.tag.css(css);
        },
        zoomSets: function () {
            console.log('zoomSets');
            this.getSize();
            for (let i = 0, j = this.zoomTags.length; i < j; i++) {
                if (!this.zoomTags[i].num) {
                    this.zoomTags[i].tag = this.$scenes1.find(this.zoomTags[i].tag);
                    if (this.zoomTags[i].type !== 'height') {
                        this.zoomTags[i].num = this.zoomTags[i].tag.offset().top;
                    } else {
                        this.zoomTags[i].num = this.zoomTags[i].tag.outerHeight();
                    }
                }
                this.zoomSet(this.zoomTags[i]);
            }
        },
        zoom: function () {
            console.log('zoom');
            const _this = this;
            if (_this.zoomResize === null) {
                _this.zoomResize = $window.on('resize', function () {
                    _this.zoomSets();
                });
            }
            _this.zoomSets();
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

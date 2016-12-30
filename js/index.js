/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-30-15:13:54
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {
    // 必要的全局对象
    const $window = $(window);
    const $body = $('body');

    const $topNav = $('.top-nav');

    let coverStatus = null;

    const $scenes1 = $('#scenes1');
    const $scenes1Pagination = $scenes1.find('.swiper-pagination');
    const $scenes1SwiperButtonNext = $scenes1.find('.swiper-button-next');
    // const $scenes1SwiperButtonPrev = $scenes1.find('.swiper-button-prev');
    const $scenes1SlideLeft = $scenes1.find('.swiper-slide').find('.scenes-ani-left');
    const $scenes1SlidePic = $scenes1.find('.swiper-slide').find('.scenes1-pic');

    const $scenes2 = $('#scenes2');
    const $scenes2Slide = $scenes2.find('.swiper-slide');
    // const scenes2SlideLen = $scenes2Slide.length;
    const $scenes2Items = $scenes2.find('.item');

    const $scenes3 = $('#scenes3');



    let mainSwiper = null
    let scenes1Swiper = null;
    let scenes2Swiper = null;

    let mainSwiperRealIndex = 0;
    let scenes1SwiperRealIndex = 0;
    let scenes3SwiperRealIndex = 0;


    /* -------------------------------------------------------------------------
     * loader
    ------------------------------------------------------------------------- */
    const resources = [ // 需要预加载的资源
        '../xinhuaTalking/index-assets/bg.jpg',
        '../xinhuaTalking/index-assets/cover-logo.png',
        '../xinhuaTalking/index-assets/scenes1-btn-1-active-bg.png',
        '../xinhuaTalking/index-assets/scenes1-btn-1-bg.png',
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
            scenes1Page1Hide();
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

    /* -------------------------------------------------------------------------
     * scenes1Page1
    ------------------------------------------------------------------------- */
    const scenes1Page1Hide = function () {
        TweenMax.to($topNav, 0, {
            y: 300,
            opacity: 0,
        });
        TweenMax.to($scenes1Pagination, 0, {
            y: -300,
            opacity: 0,
        });
        TweenMax.to($scenes1SlideLeft, 0, {
            x: 300,
            opacity: 0,
        });
        TweenMax.to($scenes1SlidePic, 0, {
            x: -300,
            opacity: 0,
        });
        $scenes1SwiperButtonNext.removeClass('active');
    };
    const scenes1Page1Show = function () {
        TweenMax.to($topNav, 2, {
            y: 0,
            opacity: 1,
            ease: Power0.ease,
        });
        TweenMax.to($scenes1Pagination, 2.5, {
            y: 0,
            opacity: 1,
            ease: Power0.ease,
        });
        TweenMax.to($scenes1SlideLeft, 2.5, {
            x: 0,
            opacity: 1,
            ease: Power0.ease,
        });
        TweenMax.to($scenes1SlidePic, 2, {
            x: 0,
            opacity: 1,
            ease: Power0.ease,
            onStart: function () {
                $scenes1SwiperButtonNext.addClass('active');
            }
        });
    };
    /* -------------------------------------------------------------------------
     * cover
    ------------------------------------------------------------------------- */
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

            coverStatus = 'hide';

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

                    console.log('remove', mainSwiperRealIndex);

                    if (mainSwiperRealIndex === 0) {
                        scenes1Page1Show();
                    }
                }
            });
        }
    };
    /* -------------------------------------------------------------------------
     * scenes2
    ------------------------------------------------------------------------- */
    const scenes2Ani = function (num, toggle) {
        console.log('scenes2Ani:', num, toggle);
        if (toggle === 'show') {
            $scenes2Slide
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
            $scenes2Slide
                .eq(num)
                .find('.item')
                .each(function (i, e) {
                    scenes2Hide($(e), 0.4, i * 0.08);
                });
        }
    };

    const scenes2Hide = function (tag, time, delay) {
        TweenMax.to(tag, time, {
            x: 30,
            opacity: 0,
            delay: delay
        });
    };

    const scenes2Mouseover = function ($tag) {
        TweenMax.to($tag, 0.2, {
            scale: 1.25,
            'box-shadow': '6px 6px 32px rgba(0, 0, 0, 0.35)',
            onStart: function () {
                $tag.css({
                    'z-index': 2,
                });
                // $tag.find('img').css({
                //     width: '-=1px',
                //     height: '-=1px',
                //     'border': '1px #FFF solid',
                // });
                TweenMax.to($tag.find('.mask'), 0.8, {
                    opacity: 0,
                });
            },
            onComplete: function () {
                scenes2SetTitles($tag);
            }
        });
    };

    const $scenes2TitleBox = $('#scenes2-title-box');
    const scenes2SetTitles = function ($tag) {
        $scenes2TitleBox
            .stop(false, true)
            .fadeOut('2000', function () {
                $(this)
                    .html(`
                <div class="t2 title-2">${$tag.find('.t2').html()}</div>
                <div class="t3 title-3">${$tag.find('.t3').html()}</div>
                <div class="t1 title-1">${$tag.find('.t1').html()}</div>`)
                    .fadeIn('2000');
            });

    };

    const scenes2Mouseout = function ($tag, time) {
        TweenMax.to($tag, 1.2, {
            scale: 1,
            'box-shadow': 'none',
            onStart: function () {
                TweenMax.to($tag.find('.mask'), 1.2, {
                    opacity: 1,
                });
                $tag.css({
                    'z-index': 1,
                });
                // $tag.find('img').css({
                //     width: '100%',
                //     height: '100%',
                //     'border': 'none',
                // });
            },
        });
    };

    const scenes2Init = function (num) {
        console.log(num, num === 1);
        if (num === 1) {
            if (scenes2Swiper === null) {
                scenes2Swiper = new Swiper('#scenes2', {
                    lazyLoading: true,
                    effect: 'fade',
                    autoplay: 8000,
                    // loop: true, // 因为背景透明无法使用loop
                    prevButton: '#scenes2 .swiper-button-prev',
                    nextButton: '#scenes2 .swiper-button-next',
                    paginationClickable: true,
                    speed: 1800,
                    // spaceBetween: 80,
                    onInit: function (swiper) {
                        scenes2Hide($scenes2Items, 0, 0);
                        scenes2Ani(swiper.activeIndex, 'show', 1);

                        const firstNum = 0;
                        const $firstItem = $scenes2Items.eq(firstNum);

                        setTimeout(function () {
                            scenes2Mouseover($firstItem);
                        }, 2500);

                        $scenes2Items.on('mouseover', function () {
                            const $this = $(this);
                            if ($this.index() !== firstNum) {
                                scenes2Mouseout($firstItem);
                            }
                            scenes2Mouseover($this)
                        });

                        $scenes2Items.on('mouseout', function () {
                            const $this = $(this);
                            scenes2Mouseout($this);
                        });
                    },
                    onSlideChangeStart: function (swiper) {
                        scenes2Ani(swiper.activeIndex, 'show');
                        scenes2Ani(swiper.previousIndex, 'hide');
                    },
                });
                // scenes2Swiper.prevButton.on('click', function () {
                //     scenes2Ani(scenes2Swiper.activeIndex, 'show');
                //     scenes2Ani(scenes2Swiper.previousIndex, 'hide');
                // });
                // scenes2Swiper.nextButton.on('click', function () {
                //     scenes2Ani(scenes2Swiper.previousIndex, 'hide');
                //     scenes2Ani(scenes2Swiper.activeIndex, 'show');
                // });
            } else {
                scenes2Swiper.unlockSwipes();
                scenes2Ani(scenes2Swiper.activeIndex, 'show');
            }
        } else {
            if (scenes2Swiper !== null) {
                scenes2Swiper.lockSwipes();
                scenes2Hide($scenes2Items, 0, 0);
            }
        }
    };
    /* -------------------------------------------------------------------------
     * navLine
    ------------------------------------------------------------------------- */
    const $nav = $('#nav');
    const $navLine = $nav.find('.nav-line');
    const $navA = $nav.find('.nav-btn-box a');
    $navA.on('mouseover', function () {
        navLine(($(this).index() - 1), 0.3);
    });
    const navLine = function (index, time) {
        TweenMax.to($navLine, time, {
            x: index * (100 + 20)
        });
    };

    /* -------------------------------------------------------------------------
     * xinhuaTalking
    ------------------------------------------------------------------------- */
    const xinhuaTalking = {
        $nav: $nav,
        navHeight: 67,
        // scenesMain_realIndex: 0,
        $scenes1: $scenes1,
        scenes1: null,
        init: function () {
            const _this = this;
            // swiper
            _this.scenesMain = new Swiper('#main', {
                lazyLoading: true,
                speed: 1000,
                hashnav: true,
                hashnavWatchState: true,
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
                    navLine(swiper.realIndex, 1);

                    $window.on('resize', () => {
                        if (mainSwiperRealIndex < 1) {
                            _this.getSize();
                        }
                        _this.navStatus(mainSwiperRealIndex);
                    });
                    // scenes1Init
                    _this.scenes1Init();

                    // scenes2Init
                    scenes2Init(swiper.realIndex);

                    // only for test
                    // swiper.slideTo(1);
                    // swiper.lockSwipes();
                },
                onSlideChangeStart: function (swiper) {
                    navLine(swiper.realIndex, 1);

                    console.log(swiper.realIndex);
                    mainSwiperRealIndex = swiper.realIndex;
                    _this.navStatus(swiper.realIndex);

                    scenes2Init(swiper.realIndex);
                },
                onSlideChangeEnd: function (swiper) {
                    // scenes1Init
                    _this.scenes1Init();
                },
            });
        },
        scenes1Init: function () {
            const _this = this;
            if (mainSwiperRealIndex === 0) {
                _this.zoom();
                if (_this.scenes1 === null) {
                    console.log('scenes1Init start');
                    _this.scenes1 = new Swiper('#scenes1', {
                        lazyLoading: true,
                        // autoplay: 12000,
                        parallax: true,
                        pagination: '#scenes1 .swiper-pagination',
                        prevButton: '#scenes1 .swiper-button-prev',
                        nextButton: '#scenes1 .swiper-button-next',
                        paginationClickable: true,
                        speed: 3000,
                        runCallbacksOnInit: true,
                        onInit: function (swiper) {
                            _this.qrcode();
                            // 按钮移除 active
                            swiper.nextButton
                                .on('mouseout', function () {
                                    swiper.nextButton.removeClass('active');
                                });
                            swiper.prevButton
                                .on('mouseover', function () {
                                    swiper.nextButton.removeClass('active');
                                });

                            // 图片盒子 hover
                            $scenes1SlidePic
                                .on('mouseover', function () {
                                    TweenMax.to($(this), 0.8, {
                                        x: 30,
                                    });
                                })
                                .on('mouseout', function () {
                                    TweenMax.to($(this), 0.8, {
                                        x: 0,
                                    });
                                });
                            // swiper.nextButton
                            //     .addClass('active')
                            //     .on('mouseout', function () {
                            //         $(this).removeClass('active');
                            //     });
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

                if (coverStatus === 'hide') {
                    scenes1Page1Show();
                }
            } else {

                if (_this.scenes1 !== null) {
                    _this.scenes1.lockSwipes();
                }

                if (coverStatus === 'hide') {
                    scenes1Page1Hide();
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
                        title: $.trim($e.find('.scenes1-title-1').text()),
                        img: $e.find('.scenes1-pic img').attr('src')
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
            const qrcodes = this.$scenes1.find('.scenes1-qrcode');
            qrcodes.each(function (i, e) {
                const $e = $(e);
                $e.qrcode({
                    correctLevel: 1,
                    // background: "#999",
                    foreground: "#333", //"#0099ff"
                    width: 108,
                    height: 108,
                    text: $.trim($e.find('.scenes1-qrcode-url').text())
                });
            });
        },
        zoomTags: [{
            tag: '.scenes1-logo',
        }, {
            tag: '.scenes1-title-top',
        }, {
            tag: '.scenes1-title-1',
        }, {
            tag: '.scenes1-title-4',
        }, {
            tag: '.scenes1-content',
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

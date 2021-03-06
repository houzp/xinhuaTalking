/**
 * @Author: St. <SuperWoods>
 * @Date:   2017-01-04-21:39:00
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2017-01-15-23:02:06
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */
$(() => {
    const SCENES2_SRC = "./bg-scenes2.hyperesources/bgscenes2_hype_generated_script.js";
    const SCENES4_SRC = "./bg-scenes4.hyperesources/bgscenes4_hype_generated_script.js";

    // 判断是否为高性能设备
    console.log('window.BROWSER', window.BROWSER);
    // const IS_IE = $('html').hasClass('ie');
    const IS_NOT_OLDIE = "oldie" !== window.BROWSER.browser && "ie9" !== window.BROWSER.browser;
    const IS_WIN = "windows" === window.BROWSER.device;
    let IS_HIGH_PERFORMANCE = false;
    if (IS_WIN) {
        if ("ie11" === window.BROWSER.browser) {
            IS_HIGH_PERFORMANCE = true;
        }
    } else {
        IS_HIGH_PERFORMANCE = true;
    }

    // const IS_WIN7 = window.BROWSER.UA.indexOf('windows nt 6') ;
    // const IS_NOT_WIN = "windows" !== window.BROWSER.device;

    console.log('IS_HIGH_PERFORMANCE', IS_HIGH_PERFORMANCE);

    // // .no-csstransforms .box { color: red; }
    // // .csstransforms .box { color: green; }
    // // JS
    // if (Modernizr.csstransforms) {
    //     console.log(Modernizr);
    //   // supported
    // } else {
    //   // not-supported
    //   console.log('no', Modernizr.csstransforms);
    // }

    // cover
    if (!IS_NOT_OLDIE) {
        $('.cover-logo').after(`
            <div class="hackTips">
                <h1 class="t1">Oops！似乎遇到了一些问题</h1>
                <p>如果您能看到这个提示，这说明您的浏览器版本已经过于陈旧，<br>
                我们建议您赶紧升级一下她们吧？</p>
                <div class="t2">
                    PS: 公元2015年微软放弃了ie10和以下浏览器的安全更新，<br>2016年某宝某猫某某巴巴已经都不支持ie8、9、10了！<br>
                    如果您还在用这些浏览器会使您的网络存在极大的安全风险！
                </div>
                <span class="t3">一些有用的信息：${window.BROWSER.browser} + ${window.BROWSER.device}<br>
                ${window.BROWSER.UA}
                </span>
            </div>`);
    }

    // 必要的全局对象
    const $window = $(window);
    const $body = $('body');
    const $topNav = $('.top-nav');
    let coverStatus = null;
    // main
    let mainSwiper = null
    let mainSwiperRealIndex = 0;
    // 1
    let scenes1Swiper = null;
    let scenes1SwiperRealIndex = 0;
    const $scenes1 = $('#scenes1');
    const $scenes1Pagination = $scenes1.find('.swiper-pagination');
    const $scenes1SwiperButtonNext = $scenes1.find('.swiper-button-next');
    // const $scenes1SwiperButtonPrev = $scenes1.find('.swiper-button-prev');
    const $scenes1SlideLeft = $scenes1
        .find('.swiper-slide')
        .find('.scenes-ani-left');
    const $scenes1SlidePic = $scenes1
        .find('.swiper-slide')
        .find('.scenes1-pic');
    // 2
    let scenes2Swiper = null;
    const $scenes2 = $('#scenes2');
    const $scenes2Slide = $scenes2.find('.swiper-slide');
    // const scenes2SlideLen = $scenes2Slide.length;
    const $scenes2Items = $scenes2.find('.item');
    /* -------------------------------------------------------------------------
     * loader
    ------------------------------------------------------------------------- */
    const resources = [ // 需要预加载的资源
        'index-assets/bg.jpg',
        // 'index-assets/cover-logo.svg',
        // 'index-assets/scenes1-btn-1-active-bg.png',
        // 'index-assets/scenes1-btn-1-bg.png',
        // 'index-assets/demo-pic-0.png',
        // 'index-assets/demo-pic-1.png',
        // 'index-assets/demo-pic-2.png',
        // 'index-assets/demo-pic-3.png',
        // 'index-assets/demo-pic-4.png'
    ];
    const loader = new resLoader({
        resources: resources,
        onStart: function(total) {
            // console.log('start:' + total);
            // scenes1Slide1Hide();
            // scenes3Slide1Hide();
            $scenes1.hide();
        },
        onProgress: function(current, total) {
            // console.log(current + '/' + total);
            // var percent = current / total * 100;
            // $('.progressbar').css('width', percent + '%');
            // $('.progresstext .current').text(current);
            // $('.progresstext .total').text(total);
        },
        onComplete: function(total) {
            // cover
            if ("oldie" !== window.BROWSER.browser && "ie9" !== window.BROWSER.browser) {
                cover.init();
                // xinhuaTalking
                xinhuaTalking.init();
            }
        }
    });
    /* -------------------------------------------------------------------------
     * cover
    ------------------------------------------------------------------------- */
    const cover = {
        $cover: $('#cover'),
        timeout: null,
        init: function(_switch) {
            console.log('cover mod:', this.$cover.length);
            if (this.$cover.length && _switch !== 0 && window.location.hash.lastIndexOf('no-cover') < 0) {
                this.coverClear();
                this.coverTimeout();
                this.coverClick();
            } else {
                this
                    .$cover
                    .remove();
                coverStatus = 'hide';
                console.log('coverHide', coverStatus);
            }
        },
        coverClick: function() {
            const _this = this;
            _this
                .$cover
                .on('click', () => {
                    TweenMax.killAll();
                    _this.coverHide();
                    _this.coverClear();
                    console.log('click', _this.timeout);
                });
        },
        coverClear: function() {
            clearTimeout(this.timeout);
            this.timeout = null;
        },
        coverTimeout: function() {
            const _this = this;
            _this.timeout = setTimeout(() => {
                _this.coverHide();
            }, 200);
        },
        coverHide: function() {
            coverStatus = 'hide';
            console.log('coverHide', coverStatus);
            const _this = this;
            const time = 2.5;
            $body.addClass('overflow-hidden');
            if (IS_HIGH_PERFORMANCE) {
                // anis
                TweenMax.to(_this.$cover.find('.cover-logo'), time, {
                    scale: 8,
                    // opacity: 0,
                    ease: Power4.easeInOut,
                    onStart: function() {
                        TweenMax.to(_this.$cover, time * 1.2, {
                            // scale: 3,
                            opacity: 0,
                            ease: Power4.easeInOut,
                            // delay: 1,
                            // ease: SlowMo.ease.config(0.7, 0.7, false),
                            onStart: function() {
                                _this
                                    .$cover
                                    .off('click');

                                setTimeout(function() {
                                    if (mainSwiperRealIndex === 0) {
                                        scenes1Slide1Show();
                                    }
                                }, time * 0.5 * 1000);

                                setTimeout(function() {
                                    if (mainSwiperRealIndex === 2) {
                                        scenes3Slide1Show();
                                    }
                                }, time * 0.1 * 1000);
                            },
                            onComplete: function() {
                                _this
                                    .$cover
                                    .remove();
                                $body.removeClass('overflow-hidden');
                                // if (mainSwiperRealIndex === 0) {
                                //     scenes1Slide1Show();
                                // }
                            }
                        });
                    }
                });

            } else {

                setTimeout(function() {
                    if (mainSwiperRealIndex === 0) {
                        scenes1Slide1Show();
                    }
                }, time * 0.5 * 1000);

                // setTimeout(function() {
                //     if (mainSwiperRealIndex === 2) {
                //         scenes3Slide1Show(0);
                //     }
                // }, time * 0.1 * 1000);

                _this.$cover.fadeOut('3000');
                $body.removeClass('overflow-hidden');
            }
        }
    };

    /* -------------------------------------------------------------------------
     * zoomHandler
    ------------------------------------------------------------------------- */

    const zoomHandler = {
        zoomSets: function() {
            if ($window.height() < 1080) {
                $('#scenes2').addClass('ctlHeight');
            } else {
                $('#scenes2').removeClass('ctlHeight');
            }
        },
        init: function() {
            console.log('init zoom');
            const _this = this;
            $window.on('resize', function() {
                _this.zoomSets();
            });
            _this.zoomSets();
        },
    };


    /* -------------------------------------------------------------------------
     * scenes1Slide1
    ------------------------------------------------------------------------- */
    const scenes1Slide1Ani = function(swiperRealIndex) {
        if (coverStatus === 'hide' && swiperRealIndex === 0) {
            scenes1Slide1Show();
        } else {
            scenes1Slide1Hide();
        }
    };
    const scenes1Slide1Hide = function() {
        TweenMax.to($topNav, 0, {
            y: 200,
            opacity: 0
        });
        TweenMax.to($scenes1Pagination, 0, {
            y: -200,
            opacity: 0
        });
        TweenMax.to($scenes1SlideLeft, 0, {
            x: 200,
            opacity: 0
        });
        TweenMax.to($scenes1SlidePic, 0, {
            x: -200,
            opacity: 0
        });
        // $scenes1SwiperButtonNext.removeClass('active');
    };
    const scenes1Slide1Show = function() {
        TweenMax.to($topNav, 2, {
            y: 0,
            opacity: 1,
            ease: Power0.ease
        });
        TweenMax.to($scenes1Pagination, 2.5, {
            y: 0,
            opacity: 1,
            ease: Power0.ease
        });
        TweenMax.to($scenes1SlideLeft, 2.5, {
            x: 0,
            opacity: 1,
            ease: Power0.ease
        });
        TweenMax.to($scenes1SlidePic, 2, {
            x: 0,
            opacity: 1,
            ease: Power0.ease,
            // onStart: function() {
            //     $scenes1SwiperButtonNext.addClass('active');
            // }
        });
    };
    /* -------------------------------------------------------------------------
     * scenes2
    ------------------------------------------------------------------------- */
    const scenes2Ani = function(num, toggle) {
        console.log('scenes2Ani:', num, toggle);
        if (toggle === 'show') {
            if (IS_HIGH_PERFORMANCE) {
                $scenes2Slide
                    .eq(num)
                    .find('.item')
                    .each(function(i, e) {
                        TweenMax.to($(e), 0.4, {
                            x: 0,
                            opacity: 1,
                            delay: i * 0.1
                        });
                    });
            } else {
                // TweenMax.to($scenes2Slide.find('.item'), 0.4, {
                //     x: 0,
                //     opacity: 1,
                //     delay: i * 0.1
                // });
            }
        } else if (toggle === 'hide') {
            if (IS_HIGH_PERFORMANCE) {
                $scenes2Slide
                    .eq(num)
                    .find('.item')
                    .each(function(i, e) {
                        scenes2Hide($(e), 0.4, i * 0.08);
                    });
            }
        }
    };
    const scenes2Hide = function(tag, time, delay) {
        if (IS_HIGH_PERFORMANCE) {
            TweenMax.to(tag, time, {
                x: 30,
                opacity: 0,
                delay: delay
            });
        }
    };
    const scenes2Mouseover = function($tag) {

        console.log('scenes2Mouseover', $tag);

        TweenMax.to($tag, 0.2, {
            scale: 1.25,
            'box-shadow': '6px 6px 32px rgba(0, 0, 0, 0.35)',
            onStart: function() {
                $tag.css({
                    'z-index': 2
                });
                // $tag.find('img').css({
                //     width: '-=1px',
                //     height: '-=1px',
                //     'border': '1px #FFF solid',
                // });
                TweenMax.to($tag.find('.mask'), 0.8, {
                    opacity: 0
                });
            },
            onComplete: function() {
                scenes2SetTitles($tag);
            }
        });
    };
    const $scenes2TitleBox = $('#scenes2-title-box');
    const scenes2SetTitles = function($tag) {

        console.log('scenes2SetTitles', $tag);

        let t1 = $tag.find('.t1').html();
        let t2 = $tag.find('.t2').html();
        let t3 = $tag.find('.t3').html();
        let t3Href = $tag.find('.t3').find('a').attr('href');

        $tag.on('click', function(){
            window.open(t3Href, '_blank');
        });

        if (t1 === 'undefined') {
            t1 = '';
        }

        if (t2 === 'undefined') {
            t2 = '';
        }

        if (t3 === 'undefined') {
            t3 = '';
        }

        $scenes2TitleBox
            .stop(false, true)
            .fadeOut('2000', function() {
                $(this).html(`
                <div class="t2 title-2">${t2}</div>
                <div class="t3 title-3">${t3}</div>
                <div class="t1 title-1">${t1}</div>`).fadeIn('2000');
            });

    };
    const scenes2Mouseout = function($tag, time) {
        // if (IS_HIGH_PERFORMANCE) {
        TweenMax.to($tag, 1.2, {
            scale: 1,
            'box-shadow': 'none',
            onStart: function() {
                TweenMax.to($tag.find('.mask'), 1.2, {
                    opacity: 1
                });
                $tag.css({
                    'z-index': 1
                });
                // $tag.find('img').css({
                //     width: '100%',
                //     height: '100%',
                //     'border': 'none',
                // });
            }
        });
        // }
    };
    const scenes2Init = function(num) {
        console.log(num, num === 1);
        if (num === 1) {
            if (scenes2Swiper === null) {
                scenes2Swiper = new Swiper('#scenes2', {
                    lazyLoading: true,
                    effect: 'fade',
                    // autoplay: 8000,
                    // loop: true, // 因为背景透明无法使用loop
                    prevButton: '#scenes2 .swiper-button-prev',
                    nextButton: '#scenes2 .swiper-button-next',
                    paginationClickable: true,
                    speed: 1800,
                    // spaceBetween: 200,
                    onInit: function(swiper) {
                        IS_HIGH_PERFORMANCE && $.getScript(SCENES2_SRC);

                        scenes2Hide($scenes2Items, 0, 0);
                        scenes2Ani(swiper.activeIndex, 'show', 1);

                        const firstNum = 0;
                        const $firstItem = $scenes2Items.eq(firstNum);
                        setTimeout(function() {
                            scenes2Mouseover($firstItem);
                        }, 2500);
                        $scenes2Items.on('mouseover', function() {
                            const $this = $(this);
                            if ($this.index() !== firstNum) {
                                scenes2Mouseout($firstItem);
                            }
                            scenes2Mouseover($this)
                        });
                        $scenes2Items.on('mouseout', function() {
                            const $this = $(this);
                            scenes2Mouseout($this);
                        });

                        $('#scenes2').find('.swiper-slide').css({
                            'z-index': 8888
                        });
                        $('#scenes2').find('.swiper-slide').eq(swiper.activeIndex).css({
                            'z-index': 9999
                        });

                        zoomHandler.init();
                    },
                    onSlideChangeStart: function(swiper) {
                        scenes2Ani(swiper.activeIndex, 'show');
                        scenes2Ani(swiper.previousIndex, 'hide');

                        $('#scenes2').find('.swiper-slide').css({
                            'z-index': 8888
                        });
                        $('#scenes2').find('.swiper-slide').eq(swiper.activeIndex).css({
                            'z-index': 9999
                        });

                    }
                });
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
     * scenes3
    ------------------------------------------------------------------------- */
    // 3
    let scenes3Bg = null;
    let scenes3Swiper = null;
    let scenes3SwiperIns = new Array();
    let scenes3Data = new Array();
    const $scenes3 = $('#scenes3');
    const $scenes3InSlide = $scenes3.find('.scenes3-container-in .swiper-slide');
    const scenes3Init = function(swiperRealIndex) {

        if (IS_HIGH_PERFORMANCE) {
            window.location.hash === ('#no-scroll') && cenes3Slide1Ani(mainSwiperRealIndex);
        }

        if (mainSwiperRealIndex === 2) {
            if (scenes3Swiper === null) {
                scenes3Btn();

                window.location.hash === ('#no-scroll') && IS_HIGH_PERFORMANCE && triangleBgInit(mainSwiperRealIndex, 2);

                scenes3Swiper = new Swiper($scenes3.selector, {
                    lazyLoading: true,
                    // autoplay: 12000,
                    // parallax: true,
                    pagination: '#scenes3-pagination',
                    prevButton: '#scenes3-prev',
                    nextButton: '#scenes3-next',
                    // paginationClickable: true,
                    speed: IS_HIGH_PERFORMANCE && 3000 || 0,
                    // runCallbacksOnInit: true,
                    onInit: function(swiper) {
                        scenes3GetSwiperData();
                        scenes3BtnUpdate(swiper);

                        // if (mainSwiperRealIndex === 2) {
                        // scenes3Slide1Show(0);
                        if (!IS_HIGH_PERFORMANCE && scenes3SwiperIns[0] === undefined) {
                            scenes3SwiperIns[0] = scenes3SwiperInInit(0);
                        }
                        // }

                        swiper.nextButton
                            .on('click', function() {
                                console.log('scenes3SwiperInInit', scenes3SwiperIns, swiper.realIndex);
                                if (scenes3SwiperIns[swiper.realIndex] === undefined) {
                                    scenes3SwiperIns[swiper.realIndex] = scenes3SwiperInInit(swiper.realIndex);
                                }
                            });
                    },
                    onSlideChangeStart: function(swiper) {
                        scenes3BtnUpdate(swiper);
                        // scenes3BtnHide(swiper.slides.eq(swiper.realIndex).find('.swiper-slide:eq(0)'));
                    },
                    onSlideChangeEnd: function(swiper) {
                        scenes3BtnShow(swiper.slides.eq(swiper.realIndex).find('.swiper-slide:eq(0)'));
                    }
                });
            } else {
                scenes3Swiper.unlockSwipes();
            }

            if (scenes3SwiperIns[0] === undefined) {
                scenes3SwiperIns[0] = scenes3SwiperInInit(0);
            }

            // bgToggle('show');
            // if (coverStatus === 'hide') {
            //     scenes3Slide1Show();
            // }
        } else {
            if (scenes3Swiper !== null) {
                scenes3Swiper.lockSwipes();
            }
            // bgToggle('hide');
        }
    };
    const scenes3BtnUpdate = function(swiper) {
        let num = [
            swiper.realIndex - 1,
            swiper.realIndex + 1
        ];
        if (num[0] < 0) {
            num[0] = scenes3Data.length - 1;
        }
        if (num[1] >= scenes3Data.length) {
            num[1] = 0;
        }
        scenes3SetSwiperButton(swiper.prevButton, num[0]);
        scenes3SetSwiperButton(swiper.nextButton, num[1]);
    };
    const scenes3Btn = function() {
        $scenes3InSlide
            .on('mouseover mouseout', function(e) {
                const $this = $(this);
                if (e.type === 'mouseover') {
                    // $this.addClass('active').siblings().removeClass('active');
                    scenes3BtnHide($this.siblings());
                    scenes3BtnShow($this);
                } else if (e.type === 'mouseout') {
                    scenes3BtnHide($this);
                    // $this.removeClass('active');
                }
            });
    };
    const scenes3BtnHide = function($this) {
        $this.removeClass('active');
    };
    const scenes3BtnShow = function($this) {
        $this.addClass('active');
    };
    const scenes3GetSwiperData = function() {
        $scenes3
            .find('.scenes3-container-in')
            .each(function(i, e) {
                const $e = $(e);
                scenes3Data.push({
                    title: `
                        ${$.trim($e.find('.t1').text())}
                        <div class="a">
                            ${$.trim($e.find('.t2').text())}
                        </div>`,
                    img: $.trim($e.find('.t3').attr('src'))
                });
            });
    };
    const scenes3SetSwiperButton = function($tag, num) {
        $tag.html(`
                <div class="swiper-button-content">
                    <div class="p">
                        <img src="${scenes3Data[num].img}" width="auto" height="102">
                    </div>
                    <div class="t">${scenes3Data[num].title}</div>
                </div>
                <div class="icon"></div>
                <div class="b"></div>`);
    };


    const scenes3SwiperInInit = function(num) {
        new Swiper('#scenes3-in' + num, {
            lazyLoading: true,
            // autoplay: 12000,
            // parallax: true,
            // pagination: $scenes3In.selector + ' .swiper-pagination',
            // prevButton: '#scenes3-in-prev' + num,
            // nextButton: '#scenes3-in-next' + num,
            paginationClickable: true,
            // speed: 3000,
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween: 30,
            // centeredSlides : true,
            // runCallbacksOnInit: true,
            nested: true, // 不能使用loop: true
            // resistanceRatio: 0,
            onInit: function(swiper) {
                (num === 0) && scenes3BtnShow(swiper.slides.eq(0));
                const $nextBtn = $('#scenes3-in-next' + num);
                const $prevBtn = $('#scenes3-in-prev' + num);

                // $nextBtn.css({
                //     'opacity': 1,
                //     'pointer-events': 'visible',
                //     'cursor': 'pointer',
                // })

                console.log(num, scenes3SwiperIns[num + 1] === undefined);
                // nextBtn
                $nextBtn.off('click');
                $nextBtn.on('click', function() {
                    swiper.slideNext();
                    if ($prevBtn.attr('data-click') === 'scenes3Swiper_Prev') {
                        $prevBtn.off('click');
                        $prevBtn.on('click', function() {
                            swiper.slidePrev();
                            if (swiper.isBeginning) {
                                $(this).off('click').attr('data-click', 'scenes3Swiper_Prev');
                                $(this).click(function() {
                                    scenes3Swiper.slidePrev();
                                });
                            }
                        });
                    }
                    if (swiper.isEnd) {
                        $(this).off('click').attr('data-click', 'scenes3Swiper_Next');
                        $(this).click(function() {
                            if (scenes3SwiperIns[num + 1] === undefined) {
                                scenes3SwiperIns[num + 1] = scenes3SwiperInInit(num + 1);
                            }
                            scenes3Swiper.slideNext();
                            // $(this).off('click');
                        });
                    }
                });

                // prevBtn
                $prevBtn.off('click');
                $prevBtn.on('click', function() {
                    swiper.slidePrev();
                    if ($nextBtn.attr('data-click') === 'scenes3Swiper_Next') {
                        $nextBtn.off('click');
                        $nextBtn.on('click', function() {
                            swiper.slideNext();
                            if (swiper.isEnd) {
                                $(this).off('click').attr('data-click', 'scenes3Swiper_Next');
                                $(this).click(function() {
                                    if (scenes3SwiperIns[num + 1] === undefined) {
                                        scenes3SwiperIns[num + 1] = scenes3SwiperInInit(num + 1);
                                    }
                                    scenes3Swiper.slideNext();
                                });
                            }
                        });
                    }
                    if (swiper.isBeginning) {
                        $(this).off('click').attr('data-click', 'scenes3Swiper_Prev');
                        $(this).click(function() {
                            scenes3Swiper.slidePrev();
                        });
                    }
                });
            },
        });
    };
    /* -------------------------------------------------------------------------
     * scenes3Page1
    ------------------------------------------------------------------------- */
    const $scenes3Slide1 = $scenes3.find('.swiper-slide:eq(0)');
    const $scenes3Slide1Title = $scenes3Slide1.find('.scenes3-title');
    const $scenes3Slide1Abs = $scenes3Slide1.find('.scenes3-absract');
    const $scenes3Slide1Cont = $scenes3Slide1.find('.swiper-container');
    const scenes3Slide1Ani = function(swiperRealIndex) {
        if (coverStatus === 'hide' && swiperRealIndex === 2) {
            scenes3Slide1Show();
        } else {
            scenes3Slide1Hide();
        }
    };
    const scenes3Slide1Hide = function() {
        TweenMax.to($scenes3Slide1Title, 0, {
            y: 200,
            opacity: 0
        });
        TweenMax.to($scenes3Slide1Abs, 0, {
            y: 200,
            opacity: 0
        });
        TweenMax.to($scenes3Slide1Cont, 0, {
            y: -100,
            opacity: 0
        });
        // if (triangleBg !== null) {
        triangleBgHide();
        // }
    };
    const scenes3Slide1Show = function(time) {
        // if (scenes3SwiperIns[0] === undefined) {
        //     scenes3SwiperIns[0] = scenes3SwiperInInit(0);
        // }
        TweenMax.to($scenes3Slide1Title, time || 2.2, {
            y: 0,
            opacity: 1,
            ease: Power0.ease,
            onComplete: function() {
                if (scenes3SwiperIns[0] === undefined) {
                    scenes3SwiperIns[0] = scenes3SwiperInInit(0);
                }
            }
        });
        TweenMax.to($scenes3Slide1Abs, 1.4, {
            y: 0,
            opacity: 1,
            ease: Power0.ease
        });
        TweenMax.to($scenes3Slide1Cont, 2, {
            y: 0,
            opacity: 1,
            ease: Power0.ease
        });
        triangleBgShow();
    };
    /* -------------------------------------------------------------------------
     * scenes4
    ------------------------------------------------------------------------- */

    // console.log(Modernizr);

    // 4
    let scenes4Bg = null;
    const scenes4BgInit = function(swiperRealIndex) {
        if (scenes4Bg === null) {
            scenes4Bg = $.getScript(SCENES4_SRC);
        }
    };
    const scenes4Init = function(swiperRealIndex) {
        if (mainSwiperRealIndex === 3 && IS_HIGH_PERFORMANCE) {
            scenes4BgInit(swiperRealIndex);
            if ($window.height() < 910) {
                $('#scenes4').addClass('ctlHeight4');
            } else {
                $('#scenes4').removeClass('ctlHeight4');
            }
            $window.on('resize', function(){
                if ($window.height() < 910) {
                    $('#scenes4').addClass('ctlHeight4');
                } else {
                    $('#scenes4').removeClass('ctlHeight4');
                }
            });
        }
    };
    /* -------------------------------------------------------------------------
     * nav
    ------------------------------------------------------------------------- */
    const $nav = $('#nav');
    const $navLine = $nav.find('.nav-line');
    const $navA = $nav.find('.nav-btn-box a');
    $navA.on('mouseover', function() {
        navLine(($(this).index() - 1), 0.3);
    });
    const navLine = function(index, time) {
        // if (IS_HIGH_PERFORMANCE) {
        TweenMax.to($navLine, time, {
            x: index * (100 + 20)
        });
        // }
    };
    // nav按钮点击事件
    $navA.on('click', function(e) {
        e.preventDefault();
        // console.log($(this).index()-1);
        mainSwiper.slideTo($(this).index() - 1);
        return false;
    });
    /* -------------------------------------------------------------------------
     * triangleBg
    ------------------------------------------------------------------------- */
    let triangleBg = null;
    let $triangleBg = null;
    const triangleBgHide = function() {
        if (triangleBg !== null) {
            console.log('triangleBgHide');
            TweenMax.to($triangleBg, 0, {
                opacity: 0
            });
        }
    };
    const triangleBgShow = function() {
        if (triangleBg !== null) {
            console.log('triangleBgShow');
            TweenMax.to($triangleBg, 3, {
                opacity: 0.2,
                onStart: function() {
                    $('.scenes3').css({
                        background: 'none'
                    });
                }
            });
        }
    };
    const triangleBgHandler = function() {
        console.log('is cav');
        var $triangleBg = $("#triangleBg");
        var $triangleBgAnitOut = $("#triangleBg-anitOut");
        if (!!document.createElement("canvas").getContext) {
            // $.getScript("/lib/triangleBg/cav.min.js", function(){})
            // function() {
            var t = {
                width: 0.8,
                height: 1,
                depth: 40,
                segments: 5,
                slices: 0,
                xRange: 0.5,
                yRange: 0.2,
                zRange: 1,
                ambient: "#444444",
                diffuse: "#FFFFFF",
                speed: 0.0003
            };
            var G = {
                count: 2,
                xyScalar: 1,
                zOffset: 100,
                ambient: "#FFFFFF",
                diffuse: "#FFFFFF",
                speed: 0.001,
                gravity: 1200,
                dampening: 0.95,
                minLimit: 10,
                maxLimit: 1,
                minDistance: 20,
                maxDistance: 400,
                autopilot: false,
                draw: false,
                bounds: CAV.Vector3.create(),
                step: CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1))
            };
            var m = "canvas";
            var E = "svg";
            var x = {
                renderer: m
            };
            var i, n = Date.now();
            var L = CAV.Vector3.create();
            var k = CAV.Vector3.create();
            var z = $triangleBg[0];
            var w = $triangleBgAnitOut[0];
            var D, I, h, q, y;
            var g;
            var r;

            function C() {
                F();
                p();
                s();
                B();
                v();
                K(z.offsetWidth, z.offsetHeight);
                o()
            }

            function F() {
                g = new CAV.CanvasRenderer();
                H(x.renderer)
            }

            function H(N) {
                if (D) {
                    w.removeChild(D.element)
                }
                switch (N) {
                    case m:
                        D = g;
                        break
                }
                D.setSize(z.offsetWidth, z.offsetHeight);
                w.appendChild(D.element)
            }

            function p() {
                I = new CAV.Scene()
            }

            function s() {
                I.remove(h);
                D.clear();
                q = new CAV.Plane(t.width * D.width, t.height * D.height, t.segments, t.slices);
                y = new CAV.Material(t.ambient, t.diffuse);
                h = new CAV.Mesh(q, y);
                I.add(h);
                var N, O;
                for (N = q.vertices.length - 1; N >= 0; N--) {
                    O = q.vertices[N];
                    O.anchor = CAV.Vector3.clone(O.position);
                    O.step = CAV.Vector3.create(Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1), Math.randomInRange(0.2, 1));
                    O.time = Math.randomInRange(0, Math.PIM2)
                }
            }

            function B() {
                var O, N;
                for (O = I.lights.length - 1; O >= 0; O--) {
                    N = I.lights[O];
                    I.remove(N)
                }
                D.clear();
                for (O = 0; O < G.count; O++) {
                    N = new CAV.Light(G.ambient, G.diffuse);
                    N.ambientHex = N.ambient.format();
                    N.diffuseHex = N.diffuse.format();
                    I.add(N);
                    N.mass = Math.randomInRange(0.5, 1);
                    N.velocity = CAV.Vector3.create();
                    N.acceleration = CAV.Vector3.create();
                    N.force = CAV.Vector3.create()
                }
            }

            function K(O, N) {
                D.setSize(O, N);
                CAV.Vector3.set(L, D.halfWidth, D.halfHeight);
                s()
            }

            function o() {
                i = Date.now() - n;
                u();
                M();
                requestAnimationFrame(o)
            }

            function u() {
                var Q, P, O, R, T, V, U, S = t.depth / 2;
                CAV.Vector3.copy(G.bounds, L);
                CAV.Vector3.multiplyScalar(G.bounds, G.xyScalar);
                CAV.Vector3.setZ(k, G.zOffset);
                for (R = I.lights.length - 1; R >= 0; R--) {
                    T = I.lights[R];
                    CAV.Vector3.setZ(T.position, G.zOffset);
                    var N = Math.clamp(CAV.Vector3.distanceSquared(T.position, k), G.minDistance, G.maxDistance);
                    var W = G.gravity * T.mass / N;
                    CAV.Vector3.subtractVectors(T.force, k, T.position);
                    CAV.Vector3.normalise(T.force);
                    CAV.Vector3.multiplyScalar(T.force, W);
                    CAV.Vector3.set(T.acceleration);
                    CAV.Vector3.add(T.acceleration, T.force);
                    CAV.Vector3.add(T.velocity, T.acceleration);
                    CAV.Vector3.multiplyScalar(T.velocity, G.dampening);
                    CAV.Vector3.limit(T.velocity, G.minLimit, G.maxLimit);
                    CAV.Vector3.add(T.position, T.velocity)
                }
                for (V = q.vertices.length - 1; V >= 0; V--) {
                    U = q.vertices[V];
                    Q = Math.sin(U.time + U.step[0] * i * t.speed);
                    P = Math.cos(U.time + U.step[1] * i * t.speed);
                    O = Math.sin(U.time + U.step[2] * i * t.speed);
                    CAV.Vector3.set(U.position, t.xRange * q.segmentWidth * Q, t.yRange * q.sliceHeight * P, t.zRange * S * O - S);
                    CAV.Vector3.add(U.position, U.anchor)
                }
                q.dirty = true
            }

            function M() {
                D.render(I)
            }

            function J(O) {
                var Q, N, S = O;
                var P = function(T) {
                    for (Q = 0, l = I.lights.length; Q < l; Q++) {
                        N = I.lights[Q];
                        N.ambient.set(T);
                        N.ambientHex = N.ambient.format()
                    }
                };
                var R = function(T) {
                    for (Q = 0, l = I.lights.length; Q < l; Q++) {
                        N = I.lights[Q];
                        N.diffuse.set(T);
                        N.diffuseHex = N.diffuse.format()
                    }
                };
                return {
                    set: function() {
                        P(S[0]);
                        R(S[1])
                    }
                }
            }

            function v() {
                window.addEventListener("resize", j)
            }

            function A(N) {
                CAV.Vector3.set(k, N.x, D.height - N.y);
                CAV.Vector3.subtract(k, L)
            }

            function j(N) {
                K(z.offsetWidth, z.offsetHeight);
                M()
            }
            C();
            // }
        } else {
            $triangleBg.remove();
        }
    };

    const triangleBgInit = function(swiperRealIndex, num) {
        if (swiperRealIndex === num && triangleBg === null) {
            $triangleBg = $('#triangleBg');
            // triangleBg = $.getScript("lib/triangleBg/triangleBg.js", function() {
            //     triangleBgShow();
            // });
            triangleBg = triangleBgHandler();
            triangleBgShow();
            // triangleBgHide();
        }
    };

    let scense5Fn = null;
    const scenes5Init = function(num) {
        if (scense5Fn === null && num === 4) {
            scense5Fn = scense_five();
            // scense_five();
            function setFooter() {
                if ($window.height() < 900) {
                    $('.footer').css({
                        'bottom': -80
                    });
                } else {
                    $('.footer').css({
                        'bottom': 0
                    });
                }
            }
            $window.on('resize', function() {
                setFooter();
            });
            setFooter();
        }
    }

    /* -------------------------------------------------------------------------
     * xinhuaTalking
    ------------------------------------------------------------------------- */
    const isScroll = function(){
        const condition = window.location.hash === '#no-scroll';
        let temp;
        if (condition) {
            temp = false;
        } else {
            temp = true;
        }
        return temp;
    };

    const xinhuaTalking = {
        $nav: $nav,
        navHeight: 67,
        // scenesMain_realIndex: 0,
        $scenes1: $scenes1,
        scenes1: null,
        init: function() {
            const _this = this;
            // swiper
            mainSwiper = new Swiper('#main', {
                lazyLoading: true,
                speed: IS_HIGH_PERFORMANCE && 2000 || 500,
                // hashnav: true, // for dev
                hashnavWatchState: true,
                direction: 'vertical',
                keyboardControl: true,
                runCallbacksOnInit: true, // 必须开启，onInit触发回调
                mousewheelControl: isScroll(),
                // mousewheelSensitivity : 1,
                onInit: function(swiper) {
                    // getSize
                    _this.getSize();
                    // nav
                    _this.navHeight = _this
                        .$nav
                        .height();
                    // navLine(swiper.realIndex, 1);
                    $window.on('resize', () => {
                        if (mainSwiperRealIndex < 1) {
                            _this.getSize();
                        }
                        _this.navSetPosition(mainSwiperRealIndex);
                    });
                    _this.scenes1Init(swiper.realIndex);
                },
                onSlideChangeStart: function(swiper) {
                    mainSwiperRealIndex = swiper.realIndex;
                    _this.navSetPosition(swiper.realIndex);
                    scenes2Init(swiper.realIndex);

                    scenes5Init(swiper.realIndex);
                },
                onSlideChangeEnd: function(swiper) {
                    navLine(swiper.realIndex, 1);
                    // scenes1Init
                    _this.scenes1Init(swiper.realIndex);
                    scenes3Init(swiper.realIndex);
                    scenes4Init(swiper.realIndex);


                }
            });
        },
        scenes1Init: function(num) {
            $scenes1.show();
            const _this = this;
            if (IS_HIGH_PERFORMANCE) {
                scenes1Slide1Ani(num);
            }
            if (num === 0) {
                _this.zoom();
                if (scenes1Swiper === null) {
                    console.log('scenes1Init start');
                    scenes1Swiper = new Swiper('#scenes1', {
                        spaceBetween: 200,
                        lazyLoading: true,
                        // autoplay: 12000,
                        parallax: (IS_HIGH_PERFORMANCE) ? true : false,
                        // parallax: true,
                        pagination: '#scenes1-pagination',
                        prevButton: '#scenes1-prev',
                        nextButton: '#scenes1-next',
                        paginationClickable: true,
                        speed: (IS_HIGH_PERFORMANCE) ? 3000 : 1100,
                        // effect : (IS_HIGH_PERFORMANCE) ? 'slide' : 'fade',
                        // fade: {
                        //   crossFade: false,
                        // },
                        runCallbacksOnInit: true,
                        onInit: function(swiper) {

                            scense_one_video_mask();

                            // getSwiperData
                            _this.getSwiperData();
                            _this.qrcode();
                            // 图片盒子 hover
                            $scenes1SlidePic.on('mouseover', function() {
                                    TweenMax.to($(this), 0.8, {
                                        x: 30
                                    });
                                })
                                .on('mouseout', function() {
                                    TweenMax.to($(this), 0.8, {
                                        x: 0
                                    });
                                });
                            // swiper.nextButton
                            //     .addClass('active')
                            //     .on('mouseout', function () {
                            //         $(this).removeClass('active');
                            //     });
                            // 按钮移除 active
                            swiper
                                .nextButton
                                .on('mouseout', function() {
                                    swiper
                                        .nextButton
                                        .removeClass('active');
                                });
                            swiper
                                .prevButton
                                .on('mouseover', function() {
                                    swiper
                                        .nextButton
                                        .removeClass('active');
                                });
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
                        onSlideChangeStart: function(swiper) {
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
                    scenes1Swiper.unlockSwipes();
                }
                // if (coverStatus === 'hide') {
                //     scenes1Slide1Show();
                // }
            } else {
                if (scenes1Swiper !== null) {
                    scenes1Swiper.lockSwipes();
                }
                // if (coverStatus === 'hide') {
                //     scenes1Slide1Hide();
                // }
            }
        },
        getSwiperData: function() {
            const _this = this;
            _this.data = new Array();
            $scenes1
                .find('.swiper-slide')
                .each(function(i, e) {
                    const $e = $(e);
                    _this
                        .data
                        .push({
                            title: $.trim($e.find('.scenes1-title-1').text()),
                            img: $e
                                .find('.scenes1-pic img')
                                .attr('src')
                        });
                });
            console.log(_this.data);
        },
        setSwiperButton: function($tag, num) {
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
        getSize: function() {
            this.size = {
                height: $window.height(),
                width: $window.width()
            };
        },
        qrcode: function() {
            const qrcodes = $scenes1.find('.scenes1-qrcode');
            qrcodes.each(function(i, e) {
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
            tag: '.scenes1-logo'
        }, {
            tag: '.scenes1-title-top'
        }, {
            tag: '.scenes1-title-1'
        }, {
            tag: '.scenes1-title-4'
        }, {
            tag: '.scenes1-content'
        }],
        zoomResize: null,
        zoomRatio: function(num) {
            return Math.round(num * this.size.height / 1080);
        },
        zoomSet: function(opt) {
            const _this = this;
            let css = {
                top: _this.zoomRatio(opt.num)
            };
            if (opt.type === 'height') {
                css = {
                    height: _this.zoomRatio(opt.num)
                };
            }
            opt
                .tag
                .css(css);
        },
        zoomSets: function() {
            console.log('zoomSets');
            this.getSize();
            for (let i = 0, j = this.zoomTags.length; i < j; i++) {
                if (!this.zoomTags[i].num) {
                    this.zoomTags[i].tag = this
                        .$scenes1
                        .find(this.zoomTags[i].tag);
                    if (this.zoomTags[i].type !== 'height') {
                        this.zoomTags[i].num = this
                            .zoomTags[i]
                            .tag
                            .offset()
                            .top;
                    } else {
                        this.zoomTags[i].num = this
                            .zoomTags[i]
                            .tag
                            .outerHeight();
                    }
                }
                this.zoomSet(this.zoomTags[i]);
            }
        },
        zoom: function() {
            console.log('zoom');
            const _this = this;
            if (_this.zoomResize === null) {
                _this.zoomResize = $window.on('resize', function() {
                    _this.zoomSets();
                });
            }
            _this.zoomSets();
        },
        navSetPositionAnis: function(num, time, callback) {
            if (IS_HIGH_PERFORMANCE) {
                TweenMax.to(this.$nav, time, {
                    top: num,
                    bottom: 'auto',
                    onComplete: callback || null
                });
            } else {
                this.$nav.css({
                    top: num,
                    bottom: 'auto',
                    // onComplete: callback || null
                });
                callback;
            }
        },
        navSetPosition: function(scenesMain_realIndex) {
            const _this = this;
            if (scenesMain_realIndex < 1) {
                _this
                    .navSetPositionAnis((_this.size.height - _this.navHeight), 0.6, function() {
                        _this
                            .$nav
                            .removeClass('nav-isTop');
                    });
            } else {
                _this
                    .navSetPositionAnis(0, 0.6, function() {
                        _this
                            .$nav
                            .addClass('nav-isTop');
                    });
            }
        }
    };
    // 读取开始
    loader.start();
});

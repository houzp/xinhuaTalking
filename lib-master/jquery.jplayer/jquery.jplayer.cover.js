/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @project jd95
 * @file    cover/jquery.jplayer.cover.js
 * @author  St. <st_sister@icloud.com>
 * @times   2016-06-17-20.20
 *          2016-06-22-09.21 更新video.mp4、videoPoster.jpg和video时长
 *          2016-06-22-09.56 添加控制参数并组件化
 */

/**
 * @api     // 调用 $.JD95_INDEX_COVER(object) 并配置参数: object 参数为必要项
            $.JD95_INDEX_COVER({
                status: 'on', // 是否开启视频cover: string 'on':开启, 'off':关闭（必要）
                media: { // 视频媒体对象（必要）
                    m4v: 'url', // 视频地址: string （必要）
                    poster: 'url', // 视频预览图: string（必要）
                    title: 'title', // 视频标题: string（可选）
                },
                sidebar: '.floatCtro', // 需要回调显示的浮窗: string（可选）
                jplayerID: '#jquery_jplayer_1', // 播放器id: string（可选）
                delay: 0, // video消失延迟时间: nummber（可选）
                maxTime: 14, // 视频总时长 (s): nummber（可选）
                videoDebug: 1 // 打开debug模式，1:开启, 0:关闭
            });
 */
(function($) {
    // jQuery 浏览器兼容模块
    jQuery.browser = {
        UA: function() {
            return navigator.userAgent.toLowerCase();
        },
        // version: (UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
        // msie: /msie/.test(UA) && !/opera/.test(UA),
        // safari: /webkit/.test(UA),
        // opera: /opera/.test(UA),
        // msie11: /trident/.test(UA),
        // mozilla: /mozilla/.test(UA) && !/(compatible|webkit)/.test(UA),
        // ieVersion: function(){
        //     var UA = this.UA();
        //     if (/msie/.test(UA) && !/opera/.test(UA)) {
        //         return ((UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]);
        //     }
        // },
        ie8: function() {
            var UA = this.UA();
            return (/msie/.test(UA) && !/opera/.test(UA) && ((UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]) < 9.0);
        },
        init: function($html) {

            // console.log(!$html);

            if (!$html) {
                $html = $('html');
            }
            // 声明 UA
            var UA = this.UA();
            // console.log(UA);
            // 版本获取
            var version = (UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];
            // console.log(version);

            // 是否为 ie
            if (/msie/.test(UA) && !/opera/.test(UA)) {
                $html.addClass('ie');
                // 是否为低版本ie
                if (version < 9.0) {
                    $html.addClass('oldie');
                    $html.removeClass('ie11');
                } else {
                    $html.removeClass('oldie');
                }
            } else {
                $html.removeClass('ie');
            }

            // 是否为 ie11 (ie11删除了UA中的msie )
            if (/trident/.test(UA) && !/msie/.test(UA)) {
                $html.addClass('ie ie11');
            } else {
                $html.removeClass('ie11');
            }

            // 是否为 chrome
            if (/chrome/.test(UA)) {
                $html.addClass('chrome');
            } else {
                $html.removeClass('chrome');
            }

            // 是否为 safari
            if (/safari/.test(UA) && !/chrome/.test(UA)) {
                $html.addClass('safari');
            } else {
                $html.removeClass('safari');
            }
        }
    };
    $.JD95_INDEX_COVER = function(options) {
        var fn = {
            delay: 0, // video消失延迟时间
            size: function() { // size
                var _this = this;

                if (!_this.$window) {
                    _this.$window = $(window);
                }
                if (!_this.$indexCover) {
                    _this.$indexCover = $('#indexCover');
                }
                if (!_this.$indexCoverImg) {
                    _this.$indexCoverImg = _this.$indexCover.find('img');
                }

                var width = _this.$window.width();
                _this.sizeObj = {
                    width: width,
                    height: Math.round(width * 0.5625)
                };

                _this.$indexCover.css({
                    'width': _this.sizeObj.width,
                    'height': _this.sizeObj.height,
                    'position': 'relative',
                    'overflow': 'hidden'
                });

                _this.$indexCoverImg.css({
                    'width': _this.sizeObj.width,
                    'height': _this.sizeObj.height,
                    'position': 'absolute',
                    'top': 0,
                    'left': 0,
                    'z-index': '999'
                });

                if (_this.videoJplayer !== undefined) {
                    $(_this.jplayerID).jPlayer('option', {
                        size: {
                            width: _this.sizeObj.width,
                            height: _this.sizeObj.height
                        }
                    });
                }
            },
            videoInit: function(options) {
                var _this = this;
                if (options) {
                    _this = $.extend(_this, options);
                }
                $.browser.init();
                if (!$.browser.ie8() && _this.status === 'on' && !_this.videoJplayer && _this.media.m4v) {
                    if (!_this.jplayerID) {
                        _this.jplayerID = '#jp_jplayer';
                    }
                    if (_this.videoDebug) {
                        _this.videoDebug =
                            '<button class="jp-play" role="button" tabindex="0" style="position:absolute; z-index:9999; left:50%; bottom:10px; width:100px; margin-left:-50px; display:block;">play</button>' + // 调试
                            '<div class="jp-current-time" style="position:absolute; z-index:9999; top: 0;" role="timer" aria-label="time">&nbsp;</div>' + // 调试
                            '<div class="jp-duration" style="position:absolute; z-index:9999; top: 0; right:0;" role="timer" aria-label="duration">&nbsp;</div>'; // 调试
                    } else {
                        _this.videoDebug = '';
                    }
                    var jplayerID = _this.jplayerID.replace('#', '');
                    var temp =
                        '<div id="indexCover">' +
                        '<img src="' + _this.media.poster + '" width="100%" height="auto">' +
                        '<div id="' + jplayerID + '_container' + '" class="jp-video">' +
                        '<div id="' + jplayerID + '" class="jp-jplayer"></div>' +
                        // ((/pad/.test(navigator.userAgent.toLowerCase())) ? '<div class="jp-play videoBgPoster" role="button" tabindex="0" onClick="$(this).hide();"><div class="t"><div class="iconPlay"></div></div></div>' : '') +
                        _this.videoDebug +
                        '</div>' +
                        '<div class="btnSQ" style="width:40px;">收起</div>' +
                        '</div>';

                    _this.$body = $('body');
                    _this.$body.prepend(temp);
                    // var indexCoverDom = '<div class="panel" id="indexCover">' +
                    //     // '<img src="' + _this.media.poster + '" width="100%" height="auto">' +
                    //     '</div>';

                    _this.size();
                    _this.$window.resize(function() {
                        _this.size();
                    });

                    _this.$indexCover.after('<div class="btnSQ2">展开</div>');
                    // _this.$indexCoverImg.after(temp);

                    // 获取 $indexCover 下三个新装载的目标
                    _this.$jplayer_id = _this.$indexCover.find(_this.jplayerID);
                    _this.$videoClose = _this.$indexCover.find('.btnSQ');
                    _this.$videoOpen = _this.$indexCover.next('.btnSQ2');
                    var btnStyle = {
                        'cursor': 'pointer',
                        'display': 'block',
                        'width': 40,
                        'height': 22,
                        'font-size': 12,
                        'text-align': 'center',
                        'background': '#FFF',
                        'color': '#09F',
                        'position': 'absolute',
                        'bottom': 0,
                        'right': 0
                    }
                    _this.$videoClose.css(btnStyle);
                    _this.$videoOpen.css(btnStyle).css({
                        'top': 0,
                        'display': 'none'
                    });
                    // if (!_this.sidebar) {
                    //     _this.sidebar = '.floatCtro';
                    // }
                    // _this.$floatCtro = _this.$body.find(_this.sidebar);

                    // 初始化jplayer
                    _this.videoJplayer = _this.$jplayer_id.jPlayer({
                        swfPath: "http://www.xinhuanet.com/politics/jd95/cover",
                        supplied: "webmv, ogv, m4v",
                        size: _this.sizeObj,
                        useStateClassSkin: true,
                        cssSelectorAncestor: _this.jplayerID + '_container',
                        autoBlur: false,
                        smoothPlayBar: true,
                        keyEnabled: true,
                        remainingDuration: true,
                        toggleDuration: true,
                        wmode: "window", // 让古代firefox浏览器支持flash播放
                        preload: "auto",
                        volume: 1,
                        ready: function() {
                            $(this).jPlayer("setMedia", _this.media);
                            $(this).jPlayer("play");
                        },
                        play: function() {
                            if (_this.delay > 0) {
                                _this.timeout = null;
                                clearTimeout(_this.timeout);
                            }
                            _this.$indexCoverImg.fadeOut();
                        },
                        timeupdate: function(event) {
                            if (_this.maxTime) {
                                var time = event.jPlayer.status.currentTime;
                                // console.log('timeupdate', time);
                                if (time > (_this.maxTime - 1)) {
                                    $(this).jPlayer("pause");
                                    if (_this.delay > 0) {
                                        clearTimeout(_this.timeout);
                                        _this.timeout = null;
                                        _this.timeout = setTimeout(function() {
                                            _this.videoOff();
                                        }, _this.delay * 1000);
                                    } else {
                                        _this.videoOff();
                                    }

                                }
                            }
                        },
                        ended: function() {
                            if (!_this.maxTime) {
                                // console.log('ended', _this.maxTime);
                                _this.$indexCoverImg.fadeIn();
                                $(this).jPlayer("pause");
                                if (_this.delay > 0) {
                                    clearTimeout(_this.timeout);
                                    _this.timeout = null;
                                    _this.timeout = setTimeout(function() {
                                        _this.videoOff();
                                    }, _this.delay * 1000);
                                } else {
                                    _this.videoOff();
                                }
                            }
                        },
                    });
                    _this.$videoClose
                        .on('click', function() {
                            _this.videoOff();
                        });
                    _this.$videoOpen
                        .on('click', function() {
                            _this.videoOn();
                        });
                }
            },
            videoOff: function() {
                var _this = this;
                _this.$indexCoverImg.fadeIn();
                _this.$indexCover.animate({
                    height: 0
                }, 800, function() {
                    _this.$videoClose.hide();
                    _this.$videoOpen.show();
                    // if (_this.sidebar) {
                    //     _this.$floatCtro.show();
                    // }
                    $(this).hide();
                });
                _this.$jplayer_id.jPlayer("pause");
                _this.timeout = null;
                clearTimeout(_this.timeout);
            },
            videoOn: function() {
                var _this = this;
                _this.$indexCover
                    .show()
                    .animate({
                        height: _this.sizeObj.height
                    }, 800, function() {
                        _this.$jplayer_id.jPlayer("play", 0);
                    });
                _this.$videoClose.show();
                _this.$videoOpen.hide();
                // if (_this.sidebar) {
                //     _this.$floatCtro.hide();
                // }
            }
        };
        fn.videoInit(options);
        if (options.videoDebug) {
            return (console.log(fn));
        }
    }
})(jQuery);

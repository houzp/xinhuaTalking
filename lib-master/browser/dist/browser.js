'use strict';

/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-06-17-16.35
 *          2016-07-11-15.04
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-09-16-08:39:56
 */

(function () {
    // 是否拥有 trim 方法
    if (!String.prototype.trim) {
        String.prototype.trim = function () {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    }

    // 浏览器规则
    var b = {
        msie: 'msie',
        ie: 'ie',
        oldie: 'oldie',
        ie9: 'ie9',
        ie10: 'ie10',
        ie11: 'ie11',
        trident: 'trident',
        chrome: 'chrome',
        safari: 'safari',
        firefox: 'firefox',
        opera: 'opera',
        crios: 'crios'
    };

    // 设备规则
    var d = {
        ipad: 'ipad',
        iphone: 'iphone',
        iphoneOs: 'iphone os',
        mac: 'mac',
        macintosh: 'macintosh',
        windows: 'windows',
        pc: 'pc',
        mobile: 'mobile',
        otherMobile: 'OtherMobile',
        android: 'android'
    };

    // 是否开启跳转
    var BROWSER_NOJUMP = document.getElementById('BROWSER_NOJUMP');
    // 添加 BROWSER_NOJUMP， 如果 window.BROWSER_NOJUMP = true; 则关闭跳转
    var isJUMP = BROWSER_NOJUMP === null && !window.BROWSER_NOJUMP;
    var JUMPTO_URL = 'mobile';

    console.log('window.BROWSER_JUMPTO:', window.BROWSER_JUMPTO);

    if (isJUMP && window.BROWSER_JUMPTO) {
        JUMPTO_URL = window.BROWSER_JUMPTO;
    }

    console.log('JUMPTO_URL:', JUMPTO_URL);

    console.log('isJUMP:', isJUMP);

    // tag: html
    var HTML = document.getElementsByTagName('html')[0];
    // UA
    var UA = navigator.userAgent.toLowerCase();
    // href
    var href = window.location.href;
    // version
    var version = (UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

    // device
    var device = '';
    // apple
    var isMacintosh = UA.indexOf(d.macintosh) > 0;
    if (isMacintosh) device += ' ' + d.mac;
    var isIPad = UA.indexOf(d.ipad) > 0;
    if (isIPad) device += ' ' + d.ipad;
    var isIPhone = UA.indexOf(d.iphone) > 0;
    var isIPhoneOS = UA.indexOf(d.iphoneOs) > 0;
    if (isIPhone || isIPhoneOS) device += ' ' + d.iphone;

    // android
    var isAndroid = UA.indexOf(d.android) > 0;
    if (isAndroid) device += ' ' + d.android;
    // console.log('aa device:', isAndroid);

    // windows
    var isWindows = UA.indexOf(d.windows) > 0;
    if (isWindows) device += ' ' + d.windows;
    var isWindowsMobile = UA.indexOf('windows mobile') > 0;
    if (isWindowsMobile) device += ' windowsMobile';
    var isPCMod = href.lastIndexOf('#' + d.pc) !== -1;
    if (isPCMod) device += ' ' + d.pc + 'Mod';
    var isEdge = UA.indexOf('edge') > 0;
    if (isEdge) device += ' edge';

    // miui
    var isMiPad = UA.indexOf('mi pad') !== -1;
    if (isMiPad) device += ' miPad';
    var isMiBrowser = UA.indexOf('xiaomi/miuibrowser') !== -1;
    if (isMiBrowser) device += ' xiaomi_miuibrowser';

    // UC web
    var isUCWeb = UA.indexOf(/ucweb/i) > 0;
    if (isUCWeb) device += ' ucweb';

    // browser
    var browser = '';
    var isMsie = UA.indexOf(b.msie) > 0;
    var isTrident = UA.indexOf(b.trident) > 0;
    var isChrome = UA.indexOf(b.chrome) > 0 || UA.indexOf(b.crios) > 0;
    var isSafari = UA.indexOf(b.safari) > 0;
    var isFF = UA.indexOf(b.firefox) > 0;
    var isOpera = UA.indexOf(b.opera) > 0;
    var isGecko = UA.indexOf('gecko') > -1;
    var isKhtml = UA.indexOf('khtml') === -1;
    var isV11 = version === '11.0';

    // 跳转模块
    if (isJUMP) {

        var mobileHref = void 0;

        console.log('JUMPTO_URL2:', JUMPTO_URL);

        var isMobilePage = href.lastIndexOf(JUMPTO_URL) > 0;

        console.log('isMobile', isMobilePage);

        if (UA === null || UA === '' || isPCMod) {
            console.log('isPCMod');
        } else {
            // 处理 mobileHref
            // 处理 .html 和 .htm
            var endName = '';
            if (JUMPTO_URL.lastIndexOf('.html') !== -1) {
                JUMPTO_URL = JUMPTO_URL.replace('.html', '');
                endName = 'l';
            } else if (JUMPTO_URL.lastIndexOf('.htm') !== -1) {
                JUMPTO_URL = JUMPTO_URL.replace('.htm', '');
            }

            if (href.lastIndexOf('index') !== -1) {
                if (href.lastIndexOf('.html') !== -1) {
                    mobileHref = href.replace('index.html', JUMPTO_URL + '.html');
                } else if (href.lastIndexOf('.htm') !== -1) {
                    mobileHref = href.replace('index.htm', JUMPTO_URL + '.htm');
                } else {
                    mobileHref = href.replace('index', JUMPTO_URL);
                }
            } else {
                mobileHref = '' + href + JUMPTO_URL + '.htm' + endName;
            }
            // 此时得到正确的 mobileHref
            console.log('mobileHref:', mobileHref);

            // 判断 pad 或 phone
            if (isMiPad || isMiBrowser || isIPad) {
                // 如果是 pad
                console.log('isPad');

                // 是否开始pad跳转
                var isJUMP_PAD = document.getElementsByName('BROWSER_JUMP_PAD').length > 0; // 默认：不开启
                // console.log('isJUMP_PAD', isJUMP_PAD);
                console.log('isJUMP_PAD:', isJUMP_PAD);

                // 启用 pad跳转模块，默认不开启
                if (!isMobilePage && isJUMP_PAD) {

                    var padHref = void 0;

                    // 处理 padHref
                    if (href.lastIndexOf('index') > 0 || href.lastIndexOf('mobile') > 0) {
                        padHref = href.replace('index', 'pad');
                        padHref = href.replace('mobile', 'pad');
                    } else {
                        padHref = href + 'pad.htm';
                    }
                    window.location.href = padHref;
                }
            } else {
                if (isIPhone || isIPhoneOS || isAndroid || isWindowsMobile || isUCWeb) {
                    // 如果是 phone
                    console.log('isPhone');
                    if (!isMobilePage) {
                        window.location.href = mobileHref;
                    }
                } else {
                    if (isGecko && isKhtml && isFF && isV11) {
                        // 如果是 otherMobile
                        console.log('otherMobile');
                        if (!isMobilePage) {
                            window.location.href = mobileHref;
                        }
                    }
                }
            }
        }
    }

    // 设置 browser
    // 是否为 ie
    if (isMsie) {
        if (!isOpera) {
            if (version < 9.0) {
                browser = b.oldie;
            } else if (version < 10.0) {
                browser = b.ie9;
            } else if (version < 11.0) {
                browser = b.ie10;
            }
        }
    } else {
        if (isTrident) browser = b.ie11;
        if (isFF) browser = b.firefox;
        if (isOpera) browser = b.opera;
        if (isSafari) browser = b.safari;
        if (isChrome) browser = b.chrome;
    }

    // 设置 device
    // if (isIPhone || isIPhoneOS) device = d.iphone;
    // if (isIPad) device = d.ipad;
    // if (isMacintosh) device = d.mac;
    // if (isWindows) device = d.windows;
    if (browser === '') {
        browser = 'unknown';
    }
    // 如果是ie 或者高版本ie（edge or ie11）
    if (isMsie || !isMsie && isTrident) {
        HTML.className = b.ie + ' ' + browser;
    } else {
        HTML.className = browser;
    }

    if (device === '') {
        device = ' unknown';
    }

    HTML.className += '' + device;

    // 输出 BROWSER 对象
    window.BROWSER = {
        browser: browser,
        device: device.trim(),
        version: version,
        UA: UA
    };

    console.log('--- browser.js well done!');
})();

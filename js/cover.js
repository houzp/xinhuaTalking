/**
 * @Author: St. <SuperWoods>
 * @Date:   2016-12-27-16:16:06
 * @Email:  st_sister@iCloud.com
 * @Filename: cover.js
* @Last modified by:   SuperMoo
* @Last modified time: 2016-12-27-20:47:19
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

// cover
(function () {
    const cover = function (opts) {
        this.defaults = {
            tag: $('#cover'), //主目标
            isOff: 0, //开关
            hashKey: 'no-cover', //不显示封面的hash关键字
            aniTime: 4, // TweenMax动画时间
            delay: 200, //
        };

        for (let prop in opts) {
            this.defaults[prop] = opts[prop];
        }

        this.$cover = this.defaults.tag;
        this.isOff = this.defaults.isOff;
        this.hashKey = this.defaults.hashKey;
        this.aniTime = this.defaults.aniTime;
        this.delay = this.defaults.delay;

        this.$body = window.$body || $('body');
        this.timeout = null;

        // init
        this.init();
    }

    cover.prototype.init = function () {
        console.log('cover mod:', this.$cover.length);
        if (this.$cover.length) {
            if (this.isOff !== 1 && window.location.hash.lastIndexOf(this.hashKey) < 0) {
                this.clear();
                this.initTimeout();
                this.click();
            } else {
                console.log('this.isOff:', this.isOff);
                this.$cover.remove();
            }
        } else {
            console.log(`ERROR:`, this.$cover, this.$cover.length, );
            $('.cover').remove();
        }
    }

    cover.prototype.hide = function () {
        console.log('hide');
        const _this = this;
        _this.$body.addClass('overflow-hidden');
        // anis
        TweenMax.to(_this.$cover, _this.aniTime, {
            scale: 12,
            opacity: 0,
            ease: Power4.easeInOut,
            // ease: SlowMo.ease.config(0.7, 0.7, false),
            onStart: function () {
                _this.$cover.off('click');
            },
            onComplete: function () {
                _this.$cover.remove();
                _this.$body.removeClass('overflow-hidden');
                console.log('remove');
            }
        });
    };

    cover.prototype.click = function () {
        const _this = this;
        _this.$cover.on('click', () => {
            console.log('click', _this.timeout);
            TweenMax.killAll();
            _this.hide();
            _this.clear();
        });
    }

    cover.prototype.clear = function () {
        clearTimeout(this.timeout);
        this.timeout = null;
    }

    cover.prototype.initTimeout = function () {
        const _this = this;
        _this.timeout = setTimeout(() => {
            _this.hide();
        }, _this.delay);
    }

    const XHT = window.XHT = window.XHT || {};
    XHT.cover = cover;
})();

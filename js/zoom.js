/**
 * @Author: St. <SuperWoods>
 * @Date:   2016-12-27-19:32:26
 * @Email:  st_sister@iCloud.com
 * @Filename: zoom.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-27-20:20:51
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */
(function () {
    const XHT = window.XHT = window.XHT || {};
    window.$window = window.$window || $(window);

    const zoom = function (opts) {
        console.log('zoom');

        this.id = opts.id;
        this.array = opts.array;

        this.zoomResize = null;

        if (this.zoomResize === null) {
            const _this = this;
            this.zoomResize = window.$window.on('resize', function () {
                _this.sets();
            });
        }

        this.sets();
    };

    zoom.prototype.getSize = function () {
        this.size = {
            height: window.$window.height(),
            width: window.$window.width(),
        };
    };

    zoom.prototype.ratio = function (num) {
        return Math.round(num * this.size.height / 1080);
    };

    zoom.prototype.set = function (opt) {
        const _this = this;
        let css = {
            top: _this.ratio(opt.num),
        };
        if (opt.type === 'height') {
            css = {
                height: _this.ratio(opt.num),
            };
        }
        opt.tag.css(css);
    };

    zoom.prototype.sets = function () {
        console.log('zoom sets');
        this.getSize();
        for (let i = 0, j = this.array.length; i < j; i++) {
            if (!this.array[i].num) {
                this.array[i].tag = this.id.find(this.array[i].tag);
                if (this.array[i].type !== 'height') {
                    this.array[i].num = this.array[i].tag.offset().top;
                } else {
                    this.array[i].num = this.array[i].tag.outerHeight();
                }
            }
            this.set(this.array[i]);
        }
    };

    XHT.zoom = zoom;
})();

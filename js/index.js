/**
 * @Author: St. <SuperMoo>
 * @Date:   2016-11-29-11:15:57
 * @Email:  st_sister@iCloud.com
 * @Filename: index.js
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-16-17:23:14
 * @License: MIT
 * @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
 */

$(() => {
    const $window = $(window);
    const $body = $('body');

    const main = new Swiper('#main', {
        // loop: true,
        hashnav: true,
        direction: 'vertical',
        keyboardControl: true,
        mousewheelControl: true,
        // direction: 'vertical',
        // mousewheelForceToAxis: true,
    });

    const scenes1 = new Swiper('#scenes-1', {
        // autoplay: 5000, //可选选项，自动滑动
        pagination: '#scenes-1 .swiper-pagination',
        prevButton: '#scenes-1 .swiper-button-prev',
        nextButton: '#scenes-1 .swiper-button-next',
        // paginationClickable: true,

    });

    const scenes2 = new Swiper('#scenes-2', {
        // autoplay: 5000, //可选选项，自动滑动
        pagination: '#scenes-2 .swiper-pagination',
        prevButton: '#scenes-2 .swiper-button-prev',
        nextButton: '#scenes-2 .swiper-button-next',
        // paginationClickable: true,

    });

    const scenes3 = new Swiper('#scenes-3', {
        // autoplay: 5000, //可选选项，自动滑动
        pagination: '#scenes-3 .swiper-pagination',
        prevButton: '#scenes-3 .swiper-button-prev',
        nextButton: '#scenes-3 .swiper-button-next',
        // paginationClickable: true,

    });

});

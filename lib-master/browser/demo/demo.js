/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @License: MIT
 * @Author: SuperWoods
 * @Email:  st_sister@iCloud.com
 * @Date:   2016-08-21-05:08:24
 *
 * @(demo)Last modified by:   SuperWoods
 * @(demo)Last modified time: 2016-08-29-04:52:40
 */
// window.onload = function () {
var browser = window.BROWSER;
if (browser) {
    var htmlClass = document.getElementsByTagName('html')[0].getAttribute('class');
    document.getElementById('text').innerHTML =
        '<li><b>html class:</b>' + htmlClass + '</li>' +
        '<li><b>device: </b>' + browser.device + '</li>' +
        '<li><b>browser: </b>' + browser.browser + '</li>' +
        '<li><b>version: </b>' + browser.version + '</li>' +
        '<li><b>UA: </b>' + browser.UA + '</li>';

}
// };

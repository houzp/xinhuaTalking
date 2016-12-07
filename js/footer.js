/**
 * @Author: SuperWoods
 * @Date:   2016-11-13-11:46:14
 * @Email:  st_sister@iCloud.com
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-02-11:13:23
 * @License: MIT
 */
// footer
$(() => {
    const d = new Date();
    const year = d.getFullYear();
    const br = (window.BROWSER.device === 'iphone' || window.BROWSER.device === 'android') ? '<br>' : '　　';
    $('body').append(`<div class="footer">Copyright &copy; 2000-${year} XINHUANET.com${br}All Rights Reserved.<br>制作单位：新华网股份有限公司${br}版权所有 新华网股份有限公司</div>`);
});

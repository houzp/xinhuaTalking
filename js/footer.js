/**
 * @Author: SuperWoods
 * @Date:   2016-11-13-11:46:14
 * @Email:  st_sister@iCloud.com
* @Last modified by:   SuperWoods
* @Last modified time: 2016-12-16-16:43:13
 * @License: MIT
 */
// footer
$(() => {
    const d = new Date();
    const year = d.getFullYear();
    const br = '<br>';
    $('#footer').append(`<div class="footer">Copyright &copy; 2000-${year}  XINHUANET.com All Rights Reserved.${br}制作单位：新华网股份有限公司 版权所有 新华网股份有限公司</div>`);
});
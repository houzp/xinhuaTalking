/**
* @Author: St. <SuperWoods>
* @Date:   2017-01-04-21:40:37
* @Email:  st_sister@iCloud.com
* @Filename: footer.js
* @Last modified by:   SuperWoods
* @Last modified time: 2017-01-04-21:40:37
* @License: MIT
* @Copyright: Copyright (c) Xinhuanet Inc. All rights reserved.
*/

// footer
$(() => {
    const d = new Date();
    const year = d.getFullYear();
    const br = '<br>';
    $('#footer').append(`<div class="footer">Copyright &copy; 2000-${year}  XINHUANET.com All Rights Reserved.${br}制作单位：新华网股份有限公司 版权所有 新华网股份有限公司</div>`);
});

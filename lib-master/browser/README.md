# **browser.js**

demo: https://xinhuaradiolab.github.io/lib/browser/index.htm

## _**Introduction**_

- _**browser.js**_ without jQuery.
- 添加 _**browser.min.js**_ 的页面，将自动识别终端设备，移动设备能够自动跳转到 `/mobile.htm`。
- 添加 `window.BROWSER` 对象，通过他我们可以添加更多浏览器自定义扩展。您可以直接在控制台使用 `console.log(window.BROWSER)` 查看。

## _**Functions**_

_**browser.js**_ 拥有一个hash开关和两个内置扩展功能，**所有功能都是可选的，默认不使用**：

### hash 开关功能:

hash 开关功能直接使用 hash 即可开启，页面地址栏尾部添加 `#pc`, 将停止移动设备自动跳转至手机页面。 同时 `<html>` 标签变为 `<html class="pcMod">`，用于单独标记这个页面状态。

### 内置扩展功能:

内置扩展功能通过 `id` 和 `name` 进行开启，**这里需要注意的是，使用了"关闭手机版跳转"功能后，"开启pad设备跳转"的功能将变为关闭**:

1. `id="BROWSER_NOJUMP"` 关闭手机版跳转，移动设备将停止自动跳转至手机页面。

2. `name="BROWSER_JUMP_PAD"` 开启pad设备跳转，pad设备将自动跳转至 `/pad.htm`。

下面是一个使用扩展参数的demo：

```html
<script src="../browser.min.js" id="BROWSER_NOJUMP" name="BROWSER_JUMP_PAD"></script>
```

### _**Extensions**_

自定义扩展，通过实例化 `window.BROWSER` 来添加自定义扩展：

```javascript
// 声明一个变量 browser
var browser = window.BROWSER;
// 例如在 mac chrome中，此时得到结果： {browser: "chrome", version: "537.36", device: "mac", UA: "..."}

// 使用 browser || version || device || UA 实现自定义的浏览器识别
if (browser.version < 9.0 && browser.browser === 'ie') {
    // todo sth...
}
```

## _**Tips**_

_**browser.js**_ 通过javascript对象 **`navigator.userAgent`** 实现判断浏览器和设备识别，自动给 `<html>` 标签添加带有浏览器信息的 `class` 类来控制兼容性调整所需要的 _**css hacks**_, 所以使用 _**browser.js**_ 几乎不会造成产生非标准的 class 类的问题。

### 通常情况下：

例如：mac电脑中的chrome浏览器，`<html>`标签将自动识别为`<html class="chrome mac">`, 如果你想给这个设备的浏览器设置单独的样式，即可在您的样式表文件中添加样式：

```css
.style1 { background: green; } /* 全部非 chrome浏览器中 .style1 背景为绿 */
.chrome .style1 { background: red; } /* chrome浏览器中 .style1 背景色变为红 */
```

## ie 浏览器类（**非常重要**）：

所有 ie 浏览器将自动添加 `ie` 类，用于区别其他浏览器，低于 ie8 的版本将出现 `oldie`，edge 将出现`ie11` 或 `edge` （也可能同时出现）, 其他版本（9、10）将出现对应的ie版本`ie9`、`ie10`。

### `unknown` 未知浏览器:

无法识别的浏览器和设备将返回`unknown`，例如一部iPhone手机中的微信内置的浏览器，将可能会出现 `<html class="unknown iphone">`。

## _**Bugs**_

由于目前我们缺少android、小米、windows phone等终端设备，所以这些设备的识别可靠性有待后续验证。

--------------------------------------------------------------------------------

如果您想捐赠我们，您可以 e-mail 我：_**st_sister@iCloud.com**_ 沟通。

PS: 一起喝杯☕️是个不错的开始哦！😊

 

Have fun~

Chrees🍻

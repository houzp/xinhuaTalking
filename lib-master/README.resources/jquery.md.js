/*
    jquery.md.js
    @St. 2016-04-13-18.24
         2016-04-14-09.58 Clean file
         2016-07-25-23.21 Turn off highlighting
*/
(function($) {
    $.fn.md = function(options) {
        var defaults = {
            render: null
        };
        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);

        // console.log(opts);

        // var this = this.tag();
        var url = this.text().trim();
        // console.log(url);
        if (url) {
            (function(_this, url) {
                $.when($.ajax({
                    async: false, // 这里需要测试是否可以使用异步？
                    url: url
                        // type: 'GET',
                        // dataType: 'jsonp',
                        // jsonp: 'callback'
                })).then(function(data) {
                    // 这个是异步使用的 require 方式
                    // var marked = require('marked');
                    // var markdownString = '```js\n console.log("hello"); \n```';
                    // var markdownString = data;
                    // Async highlighting with pygmentize-bundled
                    // marked.setOptions({
                    //   highlight: function (code, lang, callback) {
                    //     require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
                    //       callback(err, result.toString());
                    //     });
                    //   }
                    // });

                    // console.log(data);

                    // Using async version of marked
                    var temp = marked('');

                    // Synchronous highlighting with highlight.js
                    // marked.setOptions({
                    //     highlight: function(code) {
                    //         return hljs.highlightAuto(code).value;
                    //     }
                    // });

                    temp = marked(data);
                    // console.log(temp);
                    // temp = hljs.highlightBlock(temp);

                    // console.log(opts.after);
                    var vDom = '<div class="markdown-body">' +
                        temp +
                        '</div>';

                    var cons = opts.render;
                    // console.log($(cons).length);
                    if (cons === null || options === undefined) {
                        _this[0].innerHTML = temp;
                    } else if (cons === 'perpend') {
                        _this.perpend(vDom);
                    } else if (cons === 'append') {
                        _this.append(vDom);
                    } else if (cons === 'after') {
                        _this.after(vDom);
                    } else if (cons === 'body') {
                        $('body').append(vDom);
                    } else if ($(cons).length > 0 && (cons.indexOf('#') || cons.indexOf('.'))) {
                        $(cons).html(vDom);
                    } else {
                        console.log('options错误：', opts);
                    }
                    // hljs.highlightBlock(temp);
                }, function() {
                    console.log('似乎出错了，刷新试试？', url);
                    // console.log(404);
                });
            })(this, url);
        } else {
            console.log('jQuery对象异常：', this);
        }
    }
})(jQuery);

// 调用插件
/*
    var options = {
        render: 'perpend' | 'after' | 'append' | 'body': $('body').append(md); | '#id or .class': $obj.html(md);
    });
    $.md(options);
*/
$('#md').md();

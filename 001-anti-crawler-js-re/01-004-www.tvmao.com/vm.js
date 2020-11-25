var A = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    _keyStr2: "KQMFS=DVGO",

    /**
     * 这个函数其实并没有看，扫了一眼看着像是base64，然后就在console上调用它加密一个字符串：
     * A.J("CC11001100")
     * 得到"Q0MxMTAwMTEwMA=="，然后base64对它解码之后得到原字符串，证明这是一个标准的base64加密
     * 所以，折叠不看了...
     *
     * @param a
     * @returns {string|string}
     * @constructor
     */
    J: function (a) {
        var b = "";
        var c, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        a = A._C(a);
        while (i < a.length) {
            c = a.charCodeAt(i++);
            chr2 = a.charCodeAt(i++);
            chr3 = a.charCodeAt(i++);
            enc1 = c >> 2;
            enc2 = ((c & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
                enc4 = 64
            }
            b = b + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4)
        }
        return b
    },

    H: function (a) {
        a = a.toString();
        var b = '';
        for (var i = 0; i < a.length; i++) {
            b += this._keyStr2[a.charAt(i)]
        }
        for (var i = 0; i < a.length; i++) {
            b += this._keyStr[a.charAt(i)]
        }
        return b
    },

    _C: function (a) {
        a = a.replace(/\r\n/g, "\n");
        var b = "";
        for (var n = 0; n < a.length; n++) {
            var c = a.charCodeAt(n);
            if (c < 128) {
                b += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                b += String.fromCharCode((c >> 6) | 192);
                b += String.fromCharCode((c & 63) | 128)
            } else {
                b += String.fromCharCode((c >> 12) | 224);
                b += String.fromCharCode(((c >> 6) & 63) | 128);
                b += String.fromCharCode((c & 63) | 128)
            }
        }
        return b
    },
    E: function (a) {
        $(':input[name="ed"]', a).val(A.J('l' + $(".ed", a).val() + 'o'))
    },
    B: function (a) {
        var b = (new Date()).getTime();
        if (a != undefined)
            return A.J(a + '|' + b);
        else
            return A.J('' + b)
    },

    /**
     *
     * step 6:
     *
     * 返回页面上第一个form的a属性
     *
     * @param u
     * @returns {*}
     */
    e: function (u) {
        // u --> "a"
        // // document.querySelector("form").querySelector("input[class='baidu']")
        // 并没有选到东西...
        var x = 1;
        var f = $('form').first();
        var a = f.find("input[class='baidu']");
        if (a != undefined) {
            x = 2
        } else if (u != undefined) {
            x = u
        }
        if (f == undefined)
            return x;
        // 所以兜了半天最后返回的还是form的a属性
        // document.querySelector("form")
        // 30B972D97E1572D06EAA84CDA91A136DB0
        return f.attr('a')
    },

    /**
     *
     * step 5:
     * 这一步就是获取页面上第一个form的submit按钮的id属性
     *
     * @param e
     * @returns {*}
     */
    c: function (e) {
        var v;
        var f = $('form').first();
        if (f == undefined)
            return "";
        var s = f.find("*[type='submit']");
        if (s == undefined) {
            v = f.find("input[class='qq']");
            if (v == undefined)
                return "";
            v = e
        }
        // 在console上模拟这个过程，选取这个元素：
        // document.getElementsByTagName("form")[0].querySelector("*[type='submit']");
        // 拿到其id属性为： A50CB26A1B14FFF05ECA58F9128FE059406FED4EFD
        v = s.attr('id');
        return v
    },

    /**
     *
     * step 2: 跟进来的是这个方法，但是实际上这里并不先被执行，先执行最下面的立即执行方法，然后执行这里
     *
     * @param p 本次调用是 "a"
     * @param h 本次调用是 "src"
     * @returns {string}
     */
    d: function (p, h) {

        // h --> "src"
        var v = A.w(h);

        // 混淆视听的，x在这两个地方的赋值根本没被用到
        var a = $("div.fix");
        var x = a || p;
        if (a != undefined) {
            x = h || $("s.fix1")
        }
        // 真正有用的赋值是这里
        // 获取到页面上第一个表单的submit按钮的id属性
        x = A.c();

        var b = new Date();
        var c = b.getUTCDate();
        var d = b.getDay();
        var i = d == 0 ? 7 : d;
        i = i * i;
        var F = this._keyStr.charAt(i);

        return F + A.J(x + "|" + A.e(p)) + v
    },

    /**
     * step 3:
     *
     * @param v
     */
    w: function (v) { // v --> "src"
        var t = $("head");
        var a = "|";
        if (t == undefined) {
            tl = "/"
        } else {
            tl = v
        }

        // tl --> "src"
        // A.J("|07BBCD432D5102A1B885F27E8988AAB4AC8BF81B26C74F565501E65C69")
        var r = A.J(a + k(tl));
        // r --> "fDA3QkJDRDQzMkQ1MTAyQTFCODg1RjI3RTg5ODhBQUI0QUM4QkY4MUIyNkM3NEY1NjU1MDFFNjVDNjk="
        return r
    },

    s: function (a, b) {
        var c = this._keyStr.charAt(37);
        return A.J(c + a)
    }
};

// step 1: 下面的这一段在js加载的时候就先执行


// 只是定义了个k函数，在A.w里面调用了一下这个
var k = function (a) {
    // step 4:
    // 就是获取页面上第一个form的q属性
    // 在console上执行 document.getElementsByTagName("form")[0];
    // 它的q属性是类似于这样的： 07BBCD432D5102A1B885F27E8988AAB4AC8BF81B26C74F565501E65C69

    var f = $('form').first();
    if (f == undefined)
        return "";
    var b = f.attr('id');
    if (b == undefined)
        f.attr('id', a);
    return f.attr('q')
};

// 然后是一个立即执行的函数，这个函数给一个表单及一些链接添加了ek参数，但是似乎也并没用到，先不管
$(function () {
    //
    var b = $('<input type="hidden" name="ek"/>');
    b.val(A.B());
    $('form[name="frmlogin"]').append(b);
    $('a[class^="by"]').each(function () {
        var a = $(this).attr("href") + "&ek=" + encodeURIComponent(A.B());
        $(this).attr("href", a)
    })
});

/**
 * jquery.Jcrop.min.js v0.9.12 (build:20130202)
 * jQuery Image Cropping Plugin - released under MIT License
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC
 * https://github.com/tapmodo/Jcrop
 */
(function (a) {
        a.Jcrop = function (b, c) {
            function i(a) {
                return Math.round(a) + "px"
            }

            function j(a) {
                return d.baseClass + "-" + a
            }

            function k() {
                return a.fx.step.hasOwnProperty("backgroundColor")
            }

            function l(b) {
                var c = a(b).offset();
                return [c.left, c.top]
            }

            function m(a) {
                return [a.pageX - e[0], a.pageY - e[1]]
            }

            function n(b) {
                typeof b != "object" && (b = {}),
                    d = a.extend(d, b),
                    a.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (a, b) {
                        typeof d[b] != "function" && (d[b] = function () {
                            }
                        )
                    })
            }

            function o(a, b, c) {
                e = l(D),
                    bc.setCursor(a === "move" ? a : a + "-resize");
                if (a === "move")
                    return bc.activateHandlers(q(b), v, c);
                var d = _.getFixed()
                    , f = r(a)
                    , g = _.getCorner(r(f));
                _.setPressed(_.getCorner(f)),
                    _.setCurrent(g),
                    bc.activateHandlers(p(a, d), v, c)
            }

            function p(a, b) {
                return function (c) {
                    if (!d.aspectRatio)
                        switch (a) {
                            case "e":
                                c[1] = b.y2;
                                break;
                            case "w":
                                c[1] = b.y2;
                                break;
                            case "n":
                                c[0] = b.x2;
                                break;
                            case "s":
                                c[0] = b.x2
                        }
                    else
                        switch (a) {
                            case "e":
                                c[1] = b.y + 1;
                                break;
                            case "w":
                                c[1] = b.y + 1;
                                break;
                            case "n":
                                c[0] = b.x + 1;
                                break;
                            case "s":
                                c[0] = b.x + 1
                        }
                    _.setCurrent(c),
                        bb.update()
                }
            }

            function q(a) {
                var b = a;
                return bd.watchKeys(),
                    function (a) {
                        _.moveOffset([a[0] - b[0], a[1] - b[1]]),
                            b = a,
                            bb.update()
                    }
            }

            function r(a) {
                switch (a) {
                    case "n":
                        return "sw";
                    case "s":
                        return "nw";
                    case "e":
                        return "nw";
                    case "w":
                        return "ne";
                    case "ne":
                        return "sw";
                    case "nw":
                        return "se";
                    case "se":
                        return "nw";
                    case "sw":
                        return "ne"
                }
            }

            function s(a) {
                return function (b) {
                    return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = l(D),
                        W = !0,
                        o(a, m(b)),
                        b.stopPropagation(),
                        b.preventDefault(),
                        !1)
                }
            }

            function t(a, b, c) {
                var d = a.width()
                    , e = a.height();
                d > b && b > 0 && (d = b,
                    e = b / a.width() * a.height()),
                e > c && c > 0 && (e = c,
                    d = c / a.height() * a.width()),
                    T = a.width() / d,
                    U = a.height() / e,
                    a.width(d).height(e)
            }

            function u(a) {
                return {
                    x: a.x * T,
                    y: a.y * U,
                    x2: a.x2 * T,
                    y2: a.y2 * U,
                    w: a.w * T,
                    h: a.h * U
                }
            }

            function v(a) {
                var b = _.getFixed();
                b.w > d.minSelect[0] && b.h > d.minSelect[1] ? (bb.enableHandles(),
                    bb.done()) : bb.release(),
                    bc.setCursor(d.allowSelect ? "crosshair" : "default")
            }

            function w(a) {
                if (d.disabled)
                    return !1;
                if (!d.allowSelect)
                    return !1;
                W = !0,
                    e = l(D),
                    bb.disableHandles(),
                    bc.setCursor("crosshair");
                var b = m(a);
                return _.setPressed(b),
                    bb.update(),
                    bc.activateHandlers(x, v, a.type.substring(0, 5) === "touch"),
                    bd.watchKeys(),
                    a.stopPropagation(),
                    a.preventDefault(),
                    !1
            }

            function x(a) {
                _.setCurrent(a),
                    bb.update()
            }

            function y() {
                var b = a("<div></div>").addClass(j("tracker"));
                return g && b.css({
                    opacity: 0,
                    backgroundColor: "white"
                }),
                    b
            }

            function be(a) {
                G.removeClass().addClass(j("holder")).addClass(a)
            }

            function bf(a, b) {
                function t() {
                    window.setTimeout(u, l)
                }

                var c = a[0] / T
                    , e = a[1] / U
                    , f = a[2] / T
                    , g = a[3] / U;
                if (X)
                    return;
                var h = _.flipCoords(c, e, f, g)
                    , i = _.getFixed()
                    , j = [i.x, i.y, i.x2, i.y2]
                    , k = j
                    , l = d.animationDelay
                    , m = h[0] - j[0]
                    , n = h[1] - j[1]
                    , o = h[2] - j[2]
                    , p = h[3] - j[3]
                    , q = 0
                    , r = d.swingSpeed;
                c = k[0],
                    e = k[1],
                    f = k[2],
                    g = k[3],
                    bb.animMode(!0);
                var s, u = function () {
                    return function () {
                        q += (100 - q) / r,
                            k[0] = Math.round(c + q / 100 * m),
                            k[1] = Math.round(e + q / 100 * n),
                            k[2] = Math.round(f + q / 100 * o),
                            k[3] = Math.round(g + q / 100 * p),
                        q >= 99.8 && (q = 100),
                            q < 100 ? (bh(k),
                                t()) : (bb.done(),
                                bb.animMode(!1),
                            typeof b == "function" && b.call(bs))
                    }
                }();
                t()
            }

            function bg(a) {
                bh([a[0] / T, a[1] / U, a[2] / T, a[3] / U]),
                    d.onSelect.call(bs, u(_.getFixed())),
                    bb.enableHandles()
            }

            function bh(a) {
                _.setPressed([a[0], a[1]]),
                    _.setCurrent([a[2], a[3]]),
                    bb.update()
            }

            function bi() {
                return u(_.getFixed())
            }

            function bj() {
                return _.getFixed()
            }

            function bk(a) {
                n(a),
                    br()
            }

            function bl() {
                d.disabled = !0,
                    bb.disableHandles(),
                    bb.setCursor("default"),
                    bc.setCursor("default")
            }

            function bm() {
                d.disabled = !1,
                    br()
            }

            function bn() {
                bb.done(),
                    bc.activateHandlers(null, null)
            }

            function bo() {
                G.remove(),
                    A.show(),
                    A.css("visibility", "visible"),
                    a(b).removeData("Jcrop")
            }

            function bp(a, b) {
                bb.release(),
                    bl();
                var c = new Image;
                c.onload = function () {
                    var e = c.width
                        , f = c.height
                        , g = d.boxWidth
                        , h = d.boxHeight;
                    D.width(e).height(f),
                        D.attr("src", a),
                        H.attr("src", a),
                        t(D, g, h),
                        E = D.width(),
                        F = D.height(),
                        H.width(E).height(F),
                        M.width(E + L * 2).height(F + L * 2),
                        G.width(E).height(F),
                        ba.resize(E, F),
                        bm(),
                    typeof b == "function" && b.call(bs)
                }
                    ,
                    c.src = a
            }

            function bq(a, b, c) {
                var e = b || d.bgColor;
                d.bgFade && k() && d.fadeTime && !c ? a.animate({
                    backgroundColor: e
                }, {
                    queue: !1,
                    duration: d.fadeTime
                }) : a.css("backgroundColor", e)
            }

            function br(a) {
                d.allowResize ? a ? bb.enableOnly() : bb.enableHandles() : bb.disableHandles(),
                    bc.setCursor(d.allowSelect ? "crosshair" : "default"),
                    bb.setCursor(d.allowMove ? "move" : "default"),
                d.hasOwnProperty("trueSize") && (T = d.trueSize[0] / E,
                    U = d.trueSize[1] / F),
                d.hasOwnProperty("setSelect") && (bg(d.setSelect),
                    bb.done(),
                    delete d.setSelect),
                    ba.refresh(),
                d.bgColor != N && (bq(d.shade ? ba.getShades() : G, d.shade ? d.shadeColor || d.bgColor : d.bgColor),
                    N = d.bgColor),
                O != d.bgOpacity && (O = d.bgOpacity,
                    d.shade ? ba.refresh() : bb.setBgOpacity(O)),
                    P = d.maxSize[0] || 0,
                    Q = d.maxSize[1] || 0,
                    R = d.minSize[0] || 0,
                    S = d.minSize[1] || 0,
                d.hasOwnProperty("outerImage") && (D.attr("src", d.outerImage),
                    delete d.outerImage),
                    bb.refresh()
            }

            var d = a.extend({}, a.Jcrop.defaults), e, f = navigator.userAgent.toLowerCase(), g = /msie/.test(f),
                h = /msie [1-6]\./.test(f);
            typeof b != "object" && (b = a(b)[0]),
            typeof c != "object" && (c = {}),
                n(c);
            var z = {
                border: "none",
                visibility: "visible",
                margin: 0,
                padding: 0,
                position: "absolute",
                top: 0,
                left: 0
            }
                , A = a(b)
                , B = !0;
            if (b.tagName == "IMG") {
                if (A[0].width != 0 && A[0].height != 0)
                    A.width(A[0].width),
                        A.height(A[0].height);
                else {
                    var C = new Image;
                    C.src = A[0].src,
                        A.width(C.width),
                        A.height(C.height)
                }
                var D = A.clone().removeAttr("id").css(z).show();
                D.width(A.width()),
                    D.height(A.height()),
                    A.after(D).hide()
            } else
                D = A.css(z).show(),
                    B = !1,
                d.shade === null && (d.shade = !0);
            t(D, d.boxWidth, d.boxHeight);
            var E = D.width()
                , F = D.height()
                , G = a("<div />").width(E).height(F).addClass(j("holder")).css({
                position: "relative",
                backgroundColor: d.bgColor
            }).insertAfter(A).append(D);
            d.addClass && G.addClass(d.addClass);
            var H = a("<div />")
                , I = a("<div />").width("100%").height("100%").css({
                zIndex: 310,
                position: "absolute",
                overflow: "hidden"
            })
                , J = a("<div />").width("100%").height("100%").css("zIndex", 320)
                , K = a("<div />").css({
                position: "absolute",
                zIndex: 600
            }).dblclick(function () {
                var a = _.getFixed();
                d.onDblClick.call(bs, a)
            }).insertBefore(D).append(I, J);
            B && (H = a("<img />").attr("src", D.attr("src")).css(z).width(E).height(F),
                I.append(H)),
            h && K.css({
                overflowY: "hidden"
            });
            var L = d.boundary, M = y().width(E + L * 2).height(F + L * 2).css({
                position: "absolute",
                top: i(-L),
                left: i(-L),
                zIndex: 290
            }).mousedown(w), N = d.bgColor, O = d.bgOpacity, P, Q, R, S, T, U, V = !0, W, X, Y;
            e = l(D);
            var Z = function () {
                function a() {
                    var a = {}, b = ["touchstart", "touchmove", "touchend"], c = document.createElement("div"), d;
                    try {
                        for (d = 0; d < b.length; d++) {
                            var e = b[d];
                            e = "on" + e;
                            var f = e in c;
                            f || (c.setAttribute(e, "return;"),
                                f = typeof c[e] == "function"),
                                a[b[d]] = f
                        }
                        return a.touchstart && a.touchend && a.touchmove
                    } catch (g) {
                        return !1
                    }
                }

                function b() {
                    return d.touchSupport === !0 || d.touchSupport === !1 ? d.touchSupport : a()
                }

                return {
                    createDragger: function (a) {
                        return function (b) {
                            return d.disabled ? !1 : a === "move" && !d.allowMove ? !1 : (e = l(D),
                                W = !0,
                                o(a, m(Z.cfilter(b)), !0),
                                b.stopPropagation(),
                                b.preventDefault(),
                                !1)
                        }
                    },
                    newSelection: function (a) {
                        return w(Z.cfilter(a))
                    },
                    cfilter: function (a) {
                        return a.pageX = a.originalEvent.changedTouches[0].pageX,
                            a.pageY = a.originalEvent.changedTouches[0].pageY,
                            a
                    },
                    isSupported: a,
                    support: b()
                }
            }()
                , _ = function () {
                function h(d) {
                    d = n(d),
                        c = a = d[0],
                        e = b = d[1]
                }

                function i(a) {
                    a = n(a),
                        f = a[0] - c,
                        g = a[1] - e,
                        c = a[0],
                        e = a[1]
                }

                function j() {
                    return [f, g]
                }

                function k(d) {
                    var f = d[0]
                        , g = d[1];
                    0 > a + f && (f -= f + a),
                    0 > b + g && (g -= g + b),
                    F < e + g && (g += F - (e + g)),
                    E < c + f && (f += E - (c + f)),
                        a += f,
                        c += f,
                        b += g,
                        e += g
                }

                function l(a) {
                    var b = m();
                    switch (a) {
                        case "ne":
                            return [b.x2, b.y];
                        case "nw":
                            return [b.x, b.y];
                        case "se":
                            return [b.x2, b.y2];
                        case "sw":
                            return [b.x, b.y2]
                    }
                }

                function m() {
                    if (!d.aspectRatio)
                        return p();
                    var f = d.aspectRatio, g = d.minSize[0] / T, h = d.maxSize[0] / T, i = d.maxSize[1] / U, j = c - a,
                        k = e - b, l = Math.abs(j), m = Math.abs(k), n = l / m, r, s, t, u;
                    return h === 0 && (h = E * 10),
                    i === 0 && (i = F * 10),
                        n < f ? (s = e,
                            t = m * f,
                            r = j < 0 ? a - t : t + a,
                            r < 0 ? (r = 0,
                                u = Math.abs((r - a) / f),
                                s = k < 0 ? b - u : u + b) : r > E && (r = E,
                                u = Math.abs((r - a) / f),
                                s = k < 0 ? b - u : u + b)) : (r = c,
                            u = l / f,
                            s = k < 0 ? b - u : b + u,
                            s < 0 ? (s = 0,
                                t = Math.abs((s - b) * f),
                                r = j < 0 ? a - t : t + a) : s > F && (s = F,
                                t = Math.abs(s - b) * f,
                                r = j < 0 ? a - t : t + a)),
                        r > a ? (r - a < g ? r = a + g : r - a > h && (r = a + h),
                            s > b ? s = b + (r - a) / f : s = b - (r - a) / f) : r < a && (a - r < g ? r = a - g : a - r > h && (r = a - h),
                            s > b ? s = b + (a - r) / f : s = b - (a - r) / f),
                        r < 0 ? (a -= r,
                            r = 0) : r > E && (a -= r - E,
                            r = E),
                        s < 0 ? (b -= s,
                            s = 0) : s > F && (b -= s - F,
                            s = F),
                        q(o(a, b, r, s))
                }

                function n(a) {
                    return a[0] < 0 && (a[0] = 0),
                    a[1] < 0 && (a[1] = 0),
                    a[0] > E && (a[0] = E),
                    a[1] > F && (a[1] = F),
                        [Math.round(a[0]), Math.round(a[1])]
                }

                function o(a, b, c, d) {
                    var e = a
                        , f = c
                        , g = b
                        , h = d;
                    return c < a && (e = c,
                        f = a),
                    d < b && (g = d,
                        h = b),
                        [e, g, f, h]
                }

                function p() {
                    var d = c - a, f = e - b, g;
                    return P && Math.abs(d) > P && (c = d > 0 ? a + P : a - P),
                    Q && Math.abs(f) > Q && (e = f > 0 ? b + Q : b - Q),
                    S / U && Math.abs(f) < S / U && (e = f > 0 ? b + S / U : b - S / U),
                    R / T && Math.abs(d) < R / T && (c = d > 0 ? a + R / T : a - R / T),
                    a < 0 && (c -= a,
                        a -= a),
                    b < 0 && (e -= b,
                        b -= b),
                    c < 0 && (a -= c,
                        c -= c),
                    e < 0 && (b -= e,
                        e -= e),
                    c > E && (g = c - E,
                        a -= g,
                        c -= g),
                    e > F && (g = e - F,
                        b -= g,
                        e -= g),
                    a > E && (g = a - F,
                        e -= g,
                        b -= g),
                    b > F && (g = b - F,
                        e -= g,
                        b -= g),
                        q(o(a, b, c, e))
                }

                function q(a) {
                    return {
                        x: a[0],
                        y: a[1],
                        x2: a[2],
                        y2: a[3],
                        w: a[2] - a[0],
                        h: a[3] - a[1]
                    }
                }

                var a = 0, b = 0, c = 0, e = 0, f, g;
                return {
                    flipCoords: o,
                    setPressed: h,
                    setCurrent: i,
                    getOffset: j,
                    moveOffset: k,
                    getCorner: l,
                    getFixed: m
                }
            }()
                , ba = function () {
                function f(a, b) {
                    e.left.css({
                        height: i(b)
                    }),
                        e.right.css({
                            height: i(b)
                        })
                }

                function g() {
                    return h(_.getFixed())
                }

                function h(a) {
                    e.top.css({
                        left: i(a.x),
                        width: i(a.w),
                        height: i(a.y)
                    }),
                        e.bottom.css({
                            top: i(a.y2),
                            left: i(a.x),
                            width: i(a.w),
                            height: i(F - a.y2)
                        }),
                        e.right.css({
                            left: i(a.x2),
                            width: i(E - a.x2)
                        }),
                        e.left.css({
                            width: i(a.x)
                        })
                }

                function j() {
                    return a("<div />").css({
                        position: "absolute",
                        backgroundColor: d.shadeColor || d.bgColor
                    }).appendTo(c)
                }

                function k() {
                    b || (b = !0,
                        c.insertBefore(D),
                        g(),
                        bb.setBgOpacity(1, 0, 1),
                        H.hide(),
                        l(d.shadeColor || d.bgColor, 1),
                        bb.isAwake() ? n(d.bgOpacity, 1) : n(1, 1))
                }

                function l(a, b) {
                    bq(p(), a, b)
                }

                function m() {
                    b && (c.remove(),
                        H.show(),
                        b = !1,
                        bb.isAwake() ? bb.setBgOpacity(d.bgOpacity, 1, 1) : (bb.setBgOpacity(1, 1, 1),
                            bb.disableHandles()),
                        bq(G, 0, 1))
                }

                function n(a, e) {
                    b && (d.bgFade && !e ? c.animate({
                        opacity: 1 - a
                    }, {
                        queue: !1,
                        duration: d.fadeTime
                    }) : c.css({
                        opacity: 1 - a
                    }))
                }

                function o() {
                    d.shade ? k() : m(),
                    bb.isAwake() && n(d.bgOpacity)
                }

                function p() {
                    return c.children()
                }

                var b = !1
                    , c = a("<div />").css({
                    position: "absolute",
                    zIndex: 240,
                    opacity: 0
                })
                    , e = {
                    top: j(),
                    left: j().height(F),
                    right: j().height(F),
                    bottom: j()
                };
                return {
                    update: g,
                    updateRaw: h,
                    getShades: p,
                    setBgColor: l,
                    enable: k,
                    disable: m,
                    resize: f,
                    refresh: o,
                    opacity: n
                }
            }()
                , bb = function () {
                function k(b) {
                    var c = a("<div />").css({
                        position: "absolute",
                        opacity: d.borderOpacity
                    }).addClass(j(b));
                    return I.append(c),
                        c
                }

                function l(b, c) {
                    var d = a("<div />").mousedown(s(b)).css({
                        cursor: b + "-resize",
                        position: "absolute",
                        zIndex: c
                    }).addClass("ord-" + b);
                    return Z.support && d.bind("touchstart.jcrop", Z.createDragger(b)),
                        J.append(d),
                        d
                }

                function m(a) {
                    var b = d.handleSize
                        , e = l(a, c++).css({
                        opacity: d.handleOpacity
                    }).addClass(j("handle"));
                    return b && e.width(b).height(b),
                        e
                }

                function n(a) {
                    return l(a, c++).addClass("jcrop-dragbar")
                }

                function o(a) {
                    var b;
                    for (b = 0; b < a.length; b++)
                        g[a[b]] = n(a[b])
                }

                function p(a) {
                    var b, c;
                    for (c = 0; c < a.length; c++) {
                        switch (a[c]) {
                            case "n":
                                b = "hline";
                                break;
                            case "s":
                                b = "hline bottom";
                                break;
                            case "e":
                                b = "vline right";
                                break;
                            case "w":
                                b = "vline"
                        }
                        e[a[c]] = k(b)
                    }
                }

                function q(a) {
                    var b;
                    for (b = 0; b < a.length; b++)
                        f[a[b]] = m(a[b])
                }

                function r(a, b) {
                    d.shade || H.css({
                        top: i(-b),
                        left: i(-a)
                    }),
                        K.css({
                            top: i(b),
                            left: i(a)
                        })
                }

                function t(a, b) {
                    K.width(Math.round(a)).height(Math.round(b))
                }

                function v() {
                    var a = _.getFixed();
                    _.setPressed([a.x, a.y]),
                        _.setCurrent([a.x2, a.y2]),
                        w()
                }

                function w(a) {
                    if (b)
                        return x(a)
                }

                function x(a) {
                    var c = _.getFixed();
                    t(c.w, c.h),
                        r(c.x, c.y),
                    d.shade && ba.updateRaw(c),
                    b || A(),
                        a ? d.onSelect.call(bs, u(c)) : d.onChange.call(bs, u(c))
                }

                function z(a, c, e) {
                    if (!b && !c)
                        return;
                    d.bgFade && !e ? D.animate({
                        opacity: a
                    }, {
                        queue: !1,
                        duration: d.fadeTime
                    }) : D.css("opacity", a)
                }

                function A() {
                    K.show(),
                        d.shade ? ba.opacity(O) : z(O, !0),
                        b = !0
                }

                function B() {
                    F(),
                        K.hide(),
                        d.shade ? ba.opacity(1) : z(1),
                        b = !1,
                        d.onRelease.call(bs)
                }

                function C() {
                    h && J.show()
                }

                function E() {
                    h = !0;
                    if (d.allowResize)
                        return J.show(),
                            !0
                }

                function F() {
                    h = !1,
                        J.hide()
                }

                function G(a) {
                    a ? (X = !0,
                        F()) : (X = !1,
                        E())
                }

                function L() {
                    G(!1),
                        v()
                }

                var b, c = 370, e = {}, f = {}, g = {}, h = !1;
                d.dragEdges && a.isArray(d.createDragbars) && o(d.createDragbars),
                a.isArray(d.createHandles) && q(d.createHandles),
                d.drawBorders && a.isArray(d.createBorders) && p(d.createBorders),
                    a(document).bind("touchstart.jcrop-ios", function (b) {
                        a(b.currentTarget).hasClass("jcrop-tracker") && b.stopPropagation()
                    });
                var M = y().mousedown(s("move")).css({
                    cursor: "move",
                    position: "absolute",
                    zIndex: 360
                });
                return Z.support && M.bind("touchstart.jcrop", Z.createDragger("move")),
                    I.append(M),
                    F(),
                    {
                        updateVisible: w,
                        update: x,
                        release: B,
                        refresh: v,
                        isAwake: function () {
                            return b
                        },
                        setCursor: function (a) {
                            M.css("cursor", a)
                        },
                        enableHandles: E,
                        enableOnly: function () {
                            h = !0
                        },
                        showHandles: C,
                        disableHandles: F,
                        animMode: G,
                        setBgOpacity: z,
                        done: L
                    }
            }()
                , bc = function () {
                function f(b) {
                    M.css({
                        zIndex: 450
                    }),
                        b ? a(document).bind("touchmove.jcrop", k).bind("touchend.jcrop", l) : e && a(document).bind("mousemove.jcrop", h).bind("mouseup.jcrop", i)
                }

                function g() {
                    M.css({
                        zIndex: 290
                    }),
                        a(document).unbind(".jcrop")
                }

                function h(a) {
                    return b(m(a)),
                        !1
                }

                function i(a) {
                    return a.preventDefault(),
                        a.stopPropagation(),
                    W && (W = !1,
                            c(m(a)),
                        bb.isAwake() && d.onSelect.call(bs, u(_.getFixed())),
                            g(),
                            b = function () {
                            }
                            ,
                            c = function () {
                            }
                    ),
                        !1
                }

                function j(a, d, e) {
                    return W = !0,
                        b = a,
                        c = d,
                        f(e),
                        !1
                }

                function k(a) {
                    return b(m(Z.cfilter(a))),
                        !1
                }

                function l(a) {
                    return i(Z.cfilter(a))
                }

                function n(a) {
                    M.css("cursor", a)
                }

                var b = function () {
                }
                    , c = function () {
                }
                    , e = d.trackDocument;
                return e || M.mousemove(h).mouseup(i).mouseout(i),
                    D.before(M),
                    {
                        activateHandlers: j,
                        setCursor: n
                    }
            }()
                , bd = function () {
                function e() {
                    d.keySupport && (b.show(),
                        b.focus())
                }

                function f(a) {
                    b.hide()
                }

                function g(a, b, c) {
                    d.allowMove && (_.moveOffset([b, c]),
                        bb.updateVisible(!0)),
                        a.preventDefault(),
                        a.stopPropagation()
                }

                function i(a) {
                    if (a.ctrlKey || a.metaKey)
                        return !0;
                    Y = a.shiftKey ? !0 : !1;
                    var b = Y ? 10 : 1;
                    switch (a.keyCode) {
                        case 37:
                            g(a, -b, 0);
                            break;
                        case 39:
                            g(a, b, 0);
                            break;
                        case 38:
                            g(a, 0, -b);
                            break;
                        case 40:
                            g(a, 0, b);
                            break;
                        case 27:
                            d.allowSelect && bb.release();
                            break;
                        case 9:
                            return !0
                    }
                    return !1
                }

                var b = a('<input type="radio" />').css({
                    position: "fixed",
                    left: "-120px",
                    width: "12px"
                }).addClass("jcrop-keymgr")
                    , c = a("<div />").css({
                    position: "absolute",
                    overflow: "hidden"
                }).append(b);
                return d.keySupport && (b.keydown(i).blur(f),
                    h || !d.fixedSupport ? (b.css({
                        position: "absolute",
                        left: "-20px"
                    }),
                        c.append(b).insertBefore(D)) : b.insertBefore(D)),
                    {
                        watchKeys: e
                    }
            }();
            Z.support && M.bind("touchstart.jcrop", Z.newSelection),
                J.hide(),
                br(!0);
            var bs = {
                setImage: bp,
                animateTo: bf,
                setSelect: bg,
                setOptions: bk,
                tellSelect: bi,
                tellScaled: bj,
                setClass: be,
                disable: bl,
                enable: bm,
                cancel: bn,
                release: bb.release,
                destroy: bo,
                focus: bd.watchKeys,
                getBounds: function () {
                    return [E * T, F * U]
                },
                getWidgetSize: function () {
                    return [E, F]
                },
                getScaleFactor: function () {
                    return [T, U]
                },
                getOptions: function () {
                    return d
                },
                ui: {
                    holder: G,
                    selection: K
                }
            };
            return g && G.bind("selectstart", function () {
                return !1
            }),
                A.data("Jcrop", bs),
                bs
        }
            ,
            a.fn.Jcrop = function (b, c) {
                var d;
                return this.each(function () {
                    if (a(this).data("Jcrop")) {
                        if (b === "api")
                            return a(this).data("Jcrop");
                        a(this).data("Jcrop").setOptions(b)
                    } else
                        this.tagName == "IMG" ? a.Jcrop.Loader(this, function () {
                            a(this).css({
                                display: "block",
                                visibility: "hidden"
                            }),
                                d = a.Jcrop(this, b),
                            a.isFunction(c) && c.call(d)
                        }) : (a(this).css({
                            display: "block",
                            visibility: "hidden"
                        }),
                            d = a.Jcrop(this, b),
                        a.isFunction(c) && c.call(d))
                }),
                    this
            }
            ,
            a.Jcrop.Loader = function (b, c, d) {
                function g() {
                    f.complete ? (e.unbind(".jcloader"),
                    a.isFunction(c) && c.call(f)) : window.setTimeout(g, 50)
                }

                var e = a(b)
                    , f = e[0];
                e.bind("load.jcloader", g).bind("error.jcloader", function (b) {
                    e.unbind(".jcloader"),
                    a.isFunction(d) && d.call(f)
                }),
                f.complete && a.isFunction(c) && (e.unbind(".jcloader"),
                    c.call(f))
            }
            ,
            a.Jcrop.defaults = {
                allowSelect: !0,
                allowMove: !0,
                allowResize: !0,
                trackDocument: !0,
                baseClass: "jcrop",
                addClass: null,
                bgColor: "black",
                bgOpacity: .6,
                bgFade: !1,
                borderOpacity: .4,
                handleOpacity: .5,
                handleSize: null,
                aspectRatio: 0,
                keySupport: !0,
                createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
                createDragbars: ["n", "s", "e", "w"],
                createBorders: ["n", "s", "e", "w"],
                drawBorders: !0,
                dragEdges: !0,
                fixedSupport: !0,
                touchSupport: null,
                shade: null,
                boxWidth: 0,
                boxHeight: 0,
                boundary: 2,
                fadeTime: 400,
                animationDelay: 20,
                swingSpeed: 3,
                minSelect: [0, 0],
                maxSize: [0, 0],
                minSize: [0, 0],
                onChange: function () {
                },
                onSelect: function () {
                },
                onDblClick: function () {
                },
                onRelease: function () {
                }
            }
    }
)(jQuery);
var Hashtable = function () {
    function n(t) {
        var r;
        if (typeof t == "string")
            return t;
        if (typeof t.hashCode == e)
            return r = t.hashCode(),
                typeof r == "string" ? r : n(r);
        if (typeof t.toString == e)
            return t.toString();
        try {
            return String(t)
        } catch (i) {
            return Object.prototype.toString.call(t)
        }
    }

    function r(e, t) {
        return e.equals(t)
    }

    function i(t, n) {
        return typeof n.equals == e ? n.equals(t) : t === n
    }

    function s(e) {
        return function (t) {
            if (t === null)
                throw new Error("null is not a valid " + e);
            if (typeof t == "undefined")
                throw new Error(e + " must not be undefined")
        }
    }

    function a(e, t, n, r) {
        this[0] = e,
            this.entries = [],
            this.addEntry(t, n),
        r !== null && (this.getEqualityFunction = function () {
                return r
            }
        )
    }

    function h(e) {
        return function (t) {
            var n = this.entries.length, r, i = this.getEqualityFunction(t);
            while (n--) {
                r = this.entries[n];
                if (i(t, r[0]))
                    switch (e) {
                        case f:
                            return !0;
                        case l:
                            return r;
                        case c:
                            return [n, r[1]]
                    }
            }
            return !1
        }
    }

    function p(e) {
        return function (t) {
            var n = t.length;
            for (var r = 0, i = this.entries.length; r < i; ++r)
                t[n + r] = this.entries[r][e]
        }
    }

    function d(e, t) {
        var n = e.length, r;
        while (n--) {
            r = e[n];
            if (t === r[0])
                return n
        }
        return null
    }

    function v(e, t) {
        var n = e[t];
        return n && n instanceof a ? n : null
    }

    function m(r, i) {
        var s = this
            , f = []
            , l = {}
            , c = typeof r == e ? r : n
            , h = typeof i == e ? i : null;
        this.put = function (e, t) {
            o(e),
                u(t);
            var n = c(e), r, i, s = null;
            return r = v(l, n),
                r ? (i = r.getEntryForKey(e),
                    i ? (s = i[1],
                        i[1] = t) : r.addEntry(e, t)) : (r = new a(n, e, t, h),
                    f[f.length] = r,
                    l[n] = r),
                s
        }
            ,
            this.get = function (e) {
                o(e);
                var t = c(e)
                    , n = v(l, t);
                if (n) {
                    var r = n.getEntryForKey(e);
                    if (r)
                        return r[1]
                }
                return null
            }
            ,
            this.containsKey = function (e) {
                o(e);
                var t = c(e)
                    , n = v(l, t);
                return n ? n.containsKey(e) : !1
            }
            ,
            this.containsValue = function (e) {
                u(e);
                var t = f.length;
                while (t--)
                    if (f[t].containsValue(e))
                        return !0;
                return !1
            }
            ,
            this.clear = function () {
                f.length = 0,
                    l = {}
            }
            ,
            this.isEmpty = function () {
                return !f.length
            }
        ;
        var p = function (e) {
            return function () {
                var t = []
                    , n = f.length;
                while (n--)
                    f[n][e](t);
                return t
            }
        };
        this.keys = p("keys"),
            this.values = p("values"),
            this.entries = p("getEntries"),
            this.remove = function (e) {
                o(e);
                var n = c(e), r, i = null, s = v(l, n);
                return s && (i = s.removeEntryForKey(e),
                i !== null && (s.entries.length || (r = d(f, n),
                    t(f, r),
                    delete l[n]))),
                    i
            }
            ,
            this.size = function () {
                var e = 0
                    , t = f.length;
                while (t--)
                    e += f[t].entries.length;
                return e
            }
            ,
            this.each = function (e) {
                var t = s.entries(), n = t.length, r;
                while (n--)
                    r = t[n],
                        e(r[0], r[1])
            }
            ,
            this.putAll = function (t, n) {
                var r = t.entries(), i, o, u, a, f = r.length, l = typeof n == e;
                while (f--)
                    i = r[f],
                        o = i[0],
                        u = i[1],
                    l && (a = s.get(o)) && (u = n(o, a, u)),
                        s.put(o, u)
            }
            ,
            this.clone = function () {
                var e = new m(r, i);
                return e.putAll(s),
                    e
            }
    }

    var e = "function"
        , t = typeof Array.prototype.splice == e ? function (e, t) {
            e.splice(t, 1)
        }
        : function (e, t) {
            var n, r, i;
            if (t === e.length - 1)
                e.length = t;
            else {
                n = e.slice(t + 1),
                    e.length = t;
                for (r = 0,
                         i = n.length; r < i; ++r)
                    e[t + r] = n[r]
            }
        }
        , o = s("key")
        , u = s("value")
        , f = 0
        , l = 1
        , c = 2;
    return a.prototype = {
        getEqualityFunction: function (t) {
            return typeof t.equals == e ? r : i
        },
        getEntryForKey: h(l),
        getEntryAndIndexForKey: h(c),
        removeEntryForKey: function (e) {
            var n = this.getEntryAndIndexForKey(e);
            return n ? (t(this.entries, n[0]),
                n[1]) : null
        },
        addEntry: function (e, t) {
            this.entries[this.entries.length] = [e, t]
        },
        keys: p(0),
        values: p(1),
        getEntries: function (e) {
            var t = e.length;
            for (var n = 0, r = this.entries.length; n < r; ++n)
                e[t + n] = this.entries[n].slice(0)
        },
        containsKey: h(f),
        containsValue: function (e) {
            var t = this.entries.length;
            while (t--)
                if (e === this.entries[t][1])
                    return !0;
            return !1
        }
    },
        m
}();
(function (e) {
        function a(e, t, n) {
            this.dec = e,
                this.group = t,
                this.neg = n
        }

        function f() {
            for (var e = 0; e < u.length; e++) {
                localeGroup = u[e];
                for (var n = 0; n < localeGroup.length; n++)
                    t.put(localeGroup[n], e)
            }
        }

        function l(e, n) {
            t.size() == 0 && f();
            var r = "."
                , i = ","
                , s = "-";
            n == 0 && (e.indexOf("_") != -1 ? e = e.split("_")[1].toLowerCase() : e.indexOf("-") != -1 && (e = e.split("-")[1].toLowerCase()));
            var u = t.get(e);
            if (u) {
                var l = o[u];
                l && (r = l[0],
                    i = l[1])
            }
            return new a(r, i, s)
        }

        var t = new Hashtable
            , n = ["ae", "au", "ca", "cn", "eg", "gb", "hk", "il", "in", "jp", "sk", "th", "tw", "us"]
            , r = ["at", "br", "de", "dk", "es", "gr", "it", "nl", "pt", "tr", "vn"]
            , i = ["cz", "fi", "fr", "ru", "se", "pl"]
            , s = ["ch"]
            , o = [[".", ","], [",", "."], [",", " "], [".", "'"]]
            , u = [n, r, i, s];
        e.fn.formatNumber = function (t, n, r) {
            return this.each(function () {
                n == null && (n = !0),
                r == null && (r = !0);
                var i;
                e(this).is(":input") ? i = new String(e(this).val()) : i = new String(e(this).text());
                var s = e.formatNumber(i, t);
                n && (e(this).is(":input") ? e(this).val(s) : e(this).text(s));
                if (r)
                    return s
            })
        }
            ,
            e.formatNumber = function (t, n) {
                var n = e.extend({}, e.fn.formatNumber.defaults, n)
                    , r = l(n.locale.toLowerCase(), n.isFullLocale)
                    , i = r.dec
                    , s = r.group
                    , o = r.neg
                    , u = "0#-,."
                    , a = ""
                    , f = !1;
                for (var c = 0; c < n.format.length; c++) {
                    if (u.indexOf(n.format.charAt(c)) != -1) {
                        if (c == 0 && n.format.charAt(c) == "-") {
                            f = !0;
                            continue
                        }
                        break
                    }
                    a += n.format.charAt(c)
                }
                var h = "";
                for (var c = n.format.length - 1; c >= 0; c--) {
                    if (u.indexOf(n.format.charAt(c)) != -1)
                        break;
                    h = n.format.charAt(c) + h
                }
                n.format = n.format.substring(a.length),
                    n.format = n.format.substring(0, n.format.length - h.length);
                var p = new Number(t);
                return e._formatNumber(p, n, h, a, f)
            }
            ,
            e._formatNumber = function (t, n, r, i, s) {
                var n = e.extend({}, e.fn.formatNumber.defaults, n)
                    , o = l(n.locale.toLowerCase(), n.isFullLocale)
                    , u = o.dec
                    , a = o.group
                    , f = o.neg
                    , c = !1;
                if (isNaN(t)) {
                    if (n.nanForceZero != 1)
                        return null;
                    t = 0,
                        c = !0
                }
                r == "%" && (t *= 100);
                var h = "";
                if (n.format.indexOf(".") > -1) {
                    var p = u
                        , d = n.format.substring(n.format.lastIndexOf(".") + 1);
                    if (n.round == 1)
                        t = new Number(t.toFixed(d.length));
                    else {
                        var v = t.toString();
                        v = v.substring(0, v.lastIndexOf(".") + d.length + 1),
                            t = new Number(v)
                    }
                    var m = t % 1
                        , g = new String(m.toFixed(d.length));
                    g = g.substring(g.lastIndexOf(".") + 1);
                    for (var y = 0; y < d.length; y++) {
                        if (d.charAt(y) == "#" && g.charAt(y) != "0") {
                            p += g.charAt(y);
                            continue
                        }
                        if (d.charAt(y) == "#" && g.charAt(y) == "0") {
                            var b = g.substring(y);
                            if (b.match("[1-9]")) {
                                p += g.charAt(y);
                                continue
                            }
                            break
                        }
                        d.charAt(y) == "0" && (p += g.charAt(y))
                    }
                    h += p
                } else
                    t = Math.round(t);
                var w = Math.floor(t);
                t < 0 && (w = Math.ceil(t));
                var E = "";
                n.format.indexOf(".") == -1 ? E = n.format : E = n.format.substring(0, n.format.indexOf("."));
                var S = "";
                if (w != 0 || E.substr(E.length - 1) != "#" || c) {
                    var x = new String(Math.abs(w))
                        , T = 9999;
                    E.lastIndexOf(",") != -1 && (T = E.length - E.lastIndexOf(",") - 1);
                    var N = 0;
                    for (var y = x.length - 1; y > -1; y--)
                        S = x.charAt(y) + S,
                            N++,
                        N == T && y != 0 && (S = a + S,
                            N = 0);
                    if (E.length > S.length) {
                        var C = E.indexOf("0");
                        if (C != -1) {
                            var k = E.length - C
                                , L = E.length - S.length - 1;
                            while (S.length < k) {
                                var A = E.charAt(L);
                                A == "," && (A = a),
                                    S = A + S,
                                    L--
                            }
                        }
                    }
                }
                return !S && E.indexOf("0", E.length - 1) !== -1 && (S = "0"),
                    h = S + h,
                    t < 0 && s && i.length > 0 ? i = f + i : t < 0 && (h = f + h),
                n.decimalSeparatorAlwaysShown || h.lastIndexOf(u) == h.length - 1 && (h = h.substring(0, h.length - 1)),
                    h = i + h + r,
                    h
            }
            ,
            e.fn.parseNumber = function (t, n, r) {
                n == null && (n = !0),
                r == null && (r = !0);
                var i;
                e(this).is(":input") ? i = new String(e(this).val()) : i = new String(e(this).text());
                var s = e.parseNumber(i, t);
                if (s) {
                    n && (e(this).is(":input") ? e(this).val(s.toString()) : e(this).text(s.toString()));
                    if (r)
                        return s
                }
            }
            ,
            e.parseNumber = function (t, n) {
                var n = e.extend({}, e.fn.parseNumber.defaults, n)
                    , r = l(n.locale.toLowerCase(), n.isFullLocale)
                    , i = r.dec
                    , s = r.group
                    , o = r.neg
                    , u = "1234567890.-";
                while (t.indexOf(s) > -1)
                    t = t.replace(s, "");
                t = t.replace(i, ".").replace(o, "-");
                var a = ""
                    , f = !1;
                if (t.charAt(t.length - 1) == "%" || n.isPercentage == 1)
                    f = !0;
                for (var c = 0; c < t.length; c++)
                    u.indexOf(t.charAt(c)) > -1 && (a += t.charAt(c));
                var h = new Number(a);
                if (f) {
                    h /= 100;
                    var p = a.indexOf(".");
                    if (p != -1) {
                        var d = a.length - p - 1;
                        h = h.toFixed(d + 2)
                    } else
                        h = h.toFixed(a.length - 1)
                }
                return h
            }
            ,
            e.fn.parseNumber.defaults = {
                locale: "us",
                decimalSeparatorAlwaysShown: !1,
                isPercentage: !1,
                isFullLocale: !1
            },
            e.fn.formatNumber.defaults = {
                format: "#,###.00",
                locale: "us",
                decimalSeparatorAlwaysShown: !1,
                nanForceZero: !0,
                round: !0,
                isFullLocale: !1
            },
            Number.prototype.toFixed = function (t) {
                return e._roundNumber(this, t)
            }
            ,
            e._roundNumber = function (e, t) {
                var n = Math.pow(10, t || 0)
                    , r = String(Math.round(e * n) / n);
                if (t > 0) {
                    var i = r.indexOf(".");
                    i == -1 ? (r += ".",
                        i = 0) : i = r.length - (i + 1);
                    while (i < t)
                        r += "0",
                            i++
                }
                return r
            }
    }
)(jQuery),
    function () {
        var e = {};
        this.tmpl = function t(n, r) {
            var i = /\W/.test(n) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + n.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : e[n] = e[n] || t(document.getElementById(n).innerHTML);
            return r ? i(r) : i
        }
    }(),
    function (e) {
        e.baseClass = function (t) {
            return t = e(t),
                t.get(0).className.match(/([^ ]+)/)[1]
        }
            ,
            e.fn.addDependClass = function (t, n) {
                var r = {
                    delimiter: n ? n : "-"
                };
                return this.each(function () {
                    var n = e.baseClass(this);
                    n && e(this).addClass(n + r.delimiter + t)
                })
            }
            ,
            e.fn.removeDependClass = function (t, n) {
                var r = {
                    delimiter: n ? n : "-"
                };
                return this.each(function () {
                    var n = e.baseClass(this);
                    n && e(this).removeClass(n + r.delimiter + t)
                })
            }
            ,
            e.fn.toggleDependClass = function (t, n) {
                var r = {
                    delimiter: n ? n : "-"
                };
                return this.each(function () {
                    var n = e.baseClass(this);
                    n && (e(this).is("." + n + r.delimiter + t) ? e(this).removeClass(n + r.delimiter + t) : e(this).addClass(n + r.delimiter + t))
                })
            }
    }(jQuery),
    function (e) {
        function t() {
            this._init.apply(this, arguments)
        }

        t.prototype.oninit = function () {
        }
            ,
            t.prototype.events = function () {
            }
            ,
            t.prototype.onmousedown = function () {
                this.ptr.css({
                    position: "absolute"
                })
            }
            ,
            t.prototype.onmousemove = function (e, t, n) {
                this.ptr.css({
                    left: t,
                    top: n
                })
            }
            ,
            t.prototype.onmouseup = function () {
            }
            ,
            t.prototype.isDefault = {
                drag: !1,
                clicked: !1,
                toclick: !0,
                mouseup: !1
            },
            t.prototype._init = function () {
                if (arguments.length > 0) {
                    this.ptr = e(arguments[0]),
                        this.outer = e(".draggable-outer"),
                        this.is = {},
                        e.extend(this.is, this.isDefault);
                    var t = this.ptr.offset();
                    this.d = {
                        left: t.left,
                        top: t.top,
                        width: this.ptr.width(),
                        height: this.ptr.height()
                    },
                        this.oninit.apply(this, arguments),
                        this._events()
                }
            }
            ,
            t.prototype._getPageCoords = function (e) {
                return e.targetTouches && e.targetTouches[0] ? {
                    x: e.targetTouches[0].pageX,
                    y: e.targetTouches[0].pageY
                } : {
                    x: e.pageX,
                    y: e.pageY
                }
            }
            ,
            t.prototype._bindEvent = function (e, t, n) {
                var r = this;
                this.supportTouches_ ? e.get(0).addEventListener(this.events_[t], n, !1) : e.bind(this.events_[t], n)
            }
            ,
            t.prototype._events = function () {
                var t = this;
                this.supportTouches_ = e.browser.webkit && navigator.userAgent.indexOf("Mobile") != -1,
                    this.events_ = {
                        click: this.supportTouches_ ? "touchstart" : "click",
                        down: this.supportTouches_ ? "touchstart" : "mousedown",
                        move: this.supportTouches_ ? "touchmove" : "mousemove",
                        up: this.supportTouches_ ? "touchend" : "mouseup"
                    },
                    this._bindEvent(e(document), "move", function (e) {
                        t.is.drag && (e.stopPropagation(),
                            e.preventDefault(),
                            t._mousemove(e))
                    }),
                    this._bindEvent(e(document), "down", function (e) {
                        t.is.drag && (e.stopPropagation(),
                            e.preventDefault())
                    }),
                    this._bindEvent(e(document), "up", function (e) {
                        t._mouseup(e)
                    }),
                    this._bindEvent(this.ptr, "down", function (e) {
                        return t._mousedown(e),
                            !1
                    }),
                    this._bindEvent(this.ptr, "up", function (e) {
                        t._mouseup(e)
                    }),
                    this.ptr.find("a").click(function () {
                        t.is.clicked = !0;
                        if (!t.is.toclick)
                            return t.is.toclick = !0,
                                !1
                    }).mousedown(function (e) {
                        return t._mousedown(e),
                            !1
                    }),
                    this.events()
            }
            ,
            t.prototype._mousedown = function (t) {
                this.is.drag = !0,
                    this.is.clicked = !1,
                    this.is.mouseup = !1;
                var n = this.ptr.offset()
                    , r = this._getPageCoords(t);
                this.cx = r.x - n.left,
                    this.cy = r.y - n.top,
                    e.extend(this.d, {
                        left: n.left,
                        top: n.top,
                        width: this.ptr.width(),
                        height: this.ptr.height()
                    }),
                this.outer && this.outer.get(0) && this.outer.css({
                    height: Math.max(this.outer.height(), e(document.body).height()),
                    overflow: "hidden"
                }),
                    this.onmousedown(t)
            }
            ,
            t.prototype._mousemove = function (e) {
                this.is.toclick = !1;
                var t = this._getPageCoords(e);
                this.onmousemove(e, t.x - this.cx, t.y - this.cy)
            }
            ,
            t.prototype._mouseup = function (t) {
                var n = this;
                this.is.drag && (this.is.drag = !1,
                this.outer && this.outer.get(0) && (e.browser.mozilla ? this.outer.css({
                    overflow: "hidden"
                }) : this.outer.css({
                    overflow: "visible"
                }),
                    e.browser.msie && e.browser.version == "6.0" ? this.outer.css({
                        height: "100%"
                    }) : this.outer.css({
                        height: "auto"
                    })),
                    this.onmouseup(t))
            }
            ,
            window.Draggable = t
    }(jQuery),
    function (e) {
        function t(e) {
            return typeof e == "undefined" ? !1 : e instanceof Array || !(e instanceof Object) && Object.prototype.toString.call(e) == "[object Array]" || typeof e.length == "number" && typeof e.splice != "undefined" && typeof e.propertyIsEnumerable != "undefined" && !e.propertyIsEnumerable("splice") ? !0 : !1
        }

        function r() {
            return this.init.apply(this, arguments)
        }

        function i() {
            Draggable.apply(this, arguments)
        }

        e.slider = function (t, n) {
            var i = e(t);
            return i.data("jslider") || i.data("jslider", new r(t, n)),
                i.data("jslider")
        }
            ,
            e.fn.slider = function (n, r) {
                function o(e) {
                    return e !== undefined
                }

                function u(e) {
                    return e != null
                }

                var i, s = arguments;
                return this.each(function () {
                    var a = e.slider(this, n);
                    if (typeof n == "string")
                        switch (n) {
                            case "value":
                                if (o(s[1]) && o(s[2])) {
                                    var f = a.getPointers();
                                    u(f[0]) && u(s[1]) && (f[0].set(s[1]),
                                        f[0].setIndexOver()),
                                    u(f[1]) && u(s[2]) && (f[1].set(s[2]),
                                        f[1].setIndexOver())
                                } else if (o(s[1])) {
                                    var f = a.getPointers();
                                    u(f[0]) && u(s[1]) && (f[0].set(s[1]),
                                        f[0].setIndexOver())
                                } else
                                    i = a.getValue();
                                break;
                            case "prc":
                                if (o(s[1]) && o(s[2])) {
                                    var f = a.getPointers();
                                    u(f[0]) && u(s[1]) && (f[0]._set(s[1]),
                                        f[0].setIndexOver()),
                                    u(f[1]) && u(s[2]) && (f[1]._set(s[2]),
                                        f[1].setIndexOver())
                                } else if (o(s[1])) {
                                    var f = a.getPointers();
                                    u(f[0]) && u(s[1]) && (f[0]._set(s[1]),
                                        f[0].setIndexOver())
                                } else
                                    i = a.getPrcValue();
                                break;
                            case "calculatedValue":
                                var l = a.getValue().split(";");
                                i = "";
                                for (var c = 0; c < l.length; c++)
                                    i += (c > 0 ? ";" : "") + a.nice(l[c]);
                                break;
                            case "skin":
                                a.setSkin(s[1])
                        }
                    else
                        !n && !r && (t(i) || (i = []),
                            i.push(a))
                }),
                t(i) && i.length == 1 && (i = i[0]),
                i || this
            }
        ;
        var n = {
            settings: {
                from: 1,
                to: 10,
                step: 1,
                smooth: !0,
                limits: !0,
                round: 0,
                format: {
                    format: "#,##0.##"
                },
                value: "5;7",
                dimension: ""
            },
            className: "jslider",
            selector: ".jslider-",
            template: tmpl('<span class="<%=className%>"><table><tr><td><div class="<%=className%>-bg"><i class="l"></i><i class="f"></i><i class="r"></i><i class="v"></i></div><div class="<%=className%>-pointer"></div><div class="<%=className%>-pointer <%=className%>-pointer-to"></div><div class="<%=className%>-label"><span><%=settings.from%></span></div><div class="<%=className%>-label <%=className%>-label-to"><span><%=settings.to%></span><%=settings.dimension%></div><div class="<%=className%>-value"><span></span><%=settings.dimension%></div><div class="<%=className%>-value <%=className%>-value-to"><span></span><%=settings.dimension%></div><div class="<%=className%>-scale"><%=scale%></div></td></tr></table></span>')
        };
        r.prototype.init = function (t, r) {
            this.settings = e.extend(!0, {}, n.settings, r ? r : {}),
                this.inputNode = e(t).hide(),
                this.settings.interval = this.settings.to - this.settings.from,
                this.settings.value = this.inputNode.attr("value"),
            this.settings.calculate && e.isFunction(this.settings.calculate) && (this.nice = this.settings.calculate),
            this.settings.onstatechange && e.isFunction(this.settings.onstatechange) && (this.onstatechange = this.settings.onstatechange),
                this.is = {
                    init: !1
                },
                this.o = {},
                this.create()
        }
            ,
            r.prototype.onstatechange = function () {
            }
            ,
            r.prototype.create = function () {
                var t = this;
                this.domNode = e(n.template({
                    className: n.className,
                    settings: {
                        from: this.nice(this.settings.from),
                        to: this.nice(this.settings.to),
                        dimension: this.settings.dimension
                    },
                    scale: this.generateScale()
                })),
                    this.inputNode.after(this.domNode),
                    this.drawScale(),
                this.settings.skin && this.settings.skin.length > 0 && this.setSkin(this.settings.skin),
                    this.sizes = {
                        domWidth: this.domNode.width(),
                        domOffset: this.domNode.offset()
                    },
                    e.extend(this.o, {
                        pointers: {},
                        labels: {
                            0: {
                                o: this.domNode.find(n.selector + "value").not(n.selector + "value-to")
                            },
                            1: {
                                o: this.domNode.find(n.selector + "value").filter(n.selector + "value-to")
                            }
                        },
                        limits: {
                            0: this.domNode.find(n.selector + "label").not(n.selector + "label-to"),
                            1: this.domNode.find(n.selector + "label").filter(n.selector + "label-to")
                        }
                    }),
                    e.extend(this.o.labels[0], {
                        value: this.o.labels[0].o.find("span")
                    }),
                    e.extend(this.o.labels[1], {
                        value: this.o.labels[1].o.find("span")
                    }),
                t.settings.value.split(";")[1] || (this.settings.single = !0,
                    this.domNode.addDependClass("single")),
                t.settings.limits || this.domNode.addDependClass("limitless"),
                    this.domNode.find(n.selector + "pointer").each(function (e) {
                        var n = t.settings.value.split(";")[e];
                        if (n) {
                            t.o.pointers[e] = new i(this, e, t);
                            var r = t.settings.value.split(";")[e - 1];
                            r && new Number(n) < new Number(r) && (n = r),
                                n = n < t.settings.from ? t.settings.from : n,
                                n = n > t.settings.to ? t.settings.to : n,
                                t.o.pointers[e].set(n, !0)
                        }
                    }),
                    this.o.value = this.domNode.find(".v"),
                    this.is.init = !0,
                    e.each(this.o.pointers, function (e) {
                        t.redraw(this)
                    }),
                    function (t) {
                        e(window).resize(function () {
                            t.onresize()
                        })
                    }(this)
            }
            ,
            r.prototype.setSkin = function (e) {
                this.skin_ && this.domNode.removeDependClass(this.skin_, "_"),
                    this.domNode.addDependClass(this.skin_ = e, "_")
            }
            ,
            r.prototype.setPointersIndex = function (t) {
                e.each(this.getPointers(), function (e) {
                    this.index(e)
                })
            }
            ,
            r.prototype.getPointers = function () {
                return this.o.pointers
            }
            ,
            r.prototype.generateScale = function () {
                if (this.settings.scale && this.settings.scale.length > 0) {
                    var e = ""
                        , t = this.settings.scale
                        , n = Math.round(100 / (t.length - 1) * 10) / 10;
                    for (var r = 0; r < t.length; r++)
                        e += '<span style="left: ' + r * n + '%">' + (t[r] != "|" ? "<ins>" + t[r] + "</ins>" : "") + "</span>";
                    return e
                }
                return ""
            }
            ,
            r.prototype.drawScale = function () {
                this.domNode.find(n.selector + "scale span ins").each(function () {
                    e(this).css({
                        marginLeft: -e(this).outerWidth() / 2
                    })
                })
            }
            ,
            r.prototype.onresize = function () {
                var t = this;
                this.sizes = {
                    domWidth: this.domNode.width(),
                    domOffset: this.domNode.offset()
                },
                    e.each(this.o.pointers, function (e) {
                        t.redraw(this)
                    })
            }
            ,
            r.prototype.update = function () {
                this.onresize(),
                    this.drawScale()
            }
            ,
            r.prototype.limits = function (e, t) {
                if (!this.settings.smooth) {
                    var n = this.settings.step * 100 / this.settings.interval;
                    e = Math.round(e / n) * n
                }
                var r = this.o.pointers[1 - t.uid];
                return r && t.uid && e < r.value.prc && (e = r.value.prc),
                r && !t.uid && e > r.value.prc && (e = r.value.prc),
                e < 0 && (e = 0),
                e > 100 && (e = 100),
                Math.round(e * 10) / 10
            }
            ,
            r.prototype.redraw = function (e) {
                if (!this.is.init)
                    return !1;
                this.setValue(),
                this.o.pointers[0] && this.o.pointers[1] && this.o.value.css({
                    left: this.o.pointers[0].value.prc + "%",
                    width: this.o.pointers[1].value.prc - this.o.pointers[0].value.prc + "%"
                }),
                    this.o.labels[e.uid].value.html(this.nice(e.value.origin)),
                    this.redrawLabels(e)
            }
            ,
            r.prototype.redrawLabels = function (e) {
                function t(e, t, r) {
                    return t.margin = -t.label / 2,
                        label_left = t.border + t.margin,
                    label_left < 0 && (t.margin -= label_left),
                        t.border + t.label / 2 > n.sizes.domWidth ? (t.margin = 0,
                            t.right = !0) : t.right = !1,
                        e.o.css({
                            left: r + "%",
                            marginLeft: t.margin,
                            right: "auto"
                        }),
                    t.right && e.o.css({
                        left: "auto",
                        right: 0
                    }),
                        t
                }

                var n = this
                    , r = this.o.labels[e.uid]
                    , i = e.value.prc
                    , s = {
                    label: r.o.outerWidth(),
                    right: !1,
                    border: i * this.sizes.domWidth / 100
                };
                if (!this.settings.single) {
                    var o = this.o.pointers[1 - e.uid]
                        , u = this.o.labels[o.uid];
                    switch (e.uid) {
                        case 0:
                            s.border + s.label / 2 > u.o.offset().left - this.sizes.domOffset.left ? (u.o.css({
                                visibility: "hidden"
                            }),
                                u.value.html(this.nice(o.value.origin)),
                                r.o.css({
                                    visibility: "visible"
                                }),
                                i = (o.value.prc - i) / 2 + i,
                            o.value.prc != e.value.prc && (r.value.html(this.nice(e.value.origin) + "&nbsp;&ndash;&nbsp;" + this.nice(o.value.origin)),
                                s.label = r.o.outerWidth(),
                                s.border = i * this.sizes.domWidth / 100)) : u.o.css({
                                visibility: "visible"
                            });
                            break;
                        case 1:
                            s.border - s.label / 2 < u.o.offset().left - this.sizes.domOffset.left + u.o.outerWidth() ? (u.o.css({
                                visibility: "hidden"
                            }),
                                u.value.html(this.nice(o.value.origin)),
                                r.o.css({
                                    visibility: "visible"
                                }),
                                i = (i - o.value.prc) / 2 + o.value.prc,
                            o.value.prc != e.value.prc && (r.value.html(this.nice(o.value.origin) + "&nbsp;&ndash;&nbsp;" + this.nice(e.value.origin)),
                                s.label = r.o.outerWidth(),
                                s.border = i * this.sizes.domWidth / 100)) : u.o.css({
                                visibility: "visible"
                            })
                    }
                }
                s = t(r, s, i);
                if (u) {
                    var s = {
                        label: u.o.outerWidth(),
                        right: !1,
                        border: o.value.prc * this.sizes.domWidth / 100
                    };
                    s = t(u, s, o.value.prc)
                }
                this.redrawLimits()
            }
            ,
            r.prototype.redrawLimits = function () {
                if (this.settings.limits) {
                    var e = [!0, !0];
                    for (key in this.o.pointers)
                        if (!this.settings.single || key == 0) {
                            var t = this.o.pointers[key]
                                , n = this.o.labels[t.uid]
                                , r = n.o.offset().left - this.sizes.domOffset.left
                                , i = this.o.limits[0];
                            r < i.outerWidth() && (e[0] = !1);
                            var i = this.o.limits[1];
                            r + n.o.outerWidth() > this.sizes.domWidth - i.outerWidth() && (e[1] = !1)
                        }
                    for (var s = 0; s < e.length; s++)
                        e[s] ? this.o.limits[s].fadeIn("fast") : this.o.limits[s].fadeOut("fast")
                }
            }
            ,
            r.prototype.setValue = function () {
                var e = this.getValue();
                this.inputNode.attr("value", e),
                    this.onstatechange.call(this, e)
            }
            ,
            r.prototype.getValue = function () {
                if (!this.is.init)
                    return !1;
                var t = this
                    , n = "";
                return e.each(this.o.pointers, function (e) {
                    this.value.prc != undefined && !isNaN(this.value.prc) && (n += (e > 0 ? ";" : "") + t.prcToValue(this.value.prc))
                }),
                    n
            }
            ,
            r.prototype.getPrcValue = function () {
                if (!this.is.init)
                    return !1;
                var t = this
                    , n = "";
                return e.each(this.o.pointers, function (e) {
                    this.value.prc != undefined && !isNaN(this.value.prc) && (n += (e > 0 ? ";" : "") + this.value.prc)
                }),
                    n
            }
            ,
            r.prototype.prcToValue = function (e) {
                if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0) {
                    var t = this.settings.heterogeneity
                        , n = 0
                        , r = this.settings.from;
                    for (var i = 0; i <= t.length; i++) {
                        if (t[i])
                            var s = t[i].split("/");
                        else
                            var s = [100, this.settings.to];
                        s[0] = new Number(s[0]),
                            s[1] = new Number(s[1]);
                        if (e >= n && e <= s[0])
                            var o = r + (e - n) * (s[1] - r) / (s[0] - n);
                        n = s[0],
                            r = s[1]
                    }
                } else
                    var o = this.settings.from + e * this.settings.interval / 100;
                return this.round(o)
            }
            ,
            r.prototype.valueToPrc = function (e, t) {
                if (this.settings.heterogeneity && this.settings.heterogeneity.length > 0) {
                    var n = this.settings.heterogeneity
                        , r = 0
                        , i = this.settings.from;
                    for (var s = 0; s <= n.length; s++) {
                        if (n[s])
                            var o = n[s].split("/");
                        else
                            var o = [100, this.settings.to];
                        o[0] = new Number(o[0]),
                            o[1] = new Number(o[1]);
                        if (e >= i && e <= o[1])
                            var u = t.limits(r + (e - i) * (o[0] - r) / (o[1] - i));
                        r = o[0],
                            i = o[1]
                    }
                } else
                    var u = t.limits((e - this.settings.from) * 100 / this.settings.interval);
                return u
            }
            ,
            r.prototype.round = function (e) {
                return e = Math.round(e / this.settings.step) * this.settings.step,
                    this.settings.round ? e = Math.round(e * Math.pow(10, this.settings.round)) / Math.pow(10, this.settings.round) : e = Math.round(e),
                    e
            }
            ,
            r.prototype.nice = function (t) {
                return t = t.toString().replace(/,/gi, ".").replace(/ /gi, ""),
                    e.formatNumber ? e.formatNumber(new Number(t), this.settings.format || {}).replace(/-/gi, "&minus;") : new Number(t)
            }
            ,
            i.prototype = new Draggable,
            i.prototype.oninit = function (e, t, n) {
                this.uid = t,
                    this.parent = n,
                    this.value = {},
                    this.settings = this.parent.settings
            }
            ,
            i.prototype.onmousedown = function (e) {
                this._parent = {
                    offset: this.parent.domNode.offset(),
                    width: this.parent.domNode.width()
                },
                    this.ptr.addDependClass("hover"),
                    this.setIndexOver()
            }
            ,
            i.prototype.onmousemove = function (e, t) {
                var n = this._getPageCoords(e);
                this._set(this.calc(n.x))
            }
            ,
            i.prototype.onmouseup = function (t) {
                this.parent.settings.callback && e.isFunction(this.parent.settings.callback) && this.parent.settings.callback.call(this.parent, this.parent.getValue()),
                    this.ptr.removeDependClass("hover")
            }
            ,
            i.prototype.setIndexOver = function () {
                this.parent.setPointersIndex(1),
                    this.index(2)
            }
            ,
            i.prototype.index = function (e) {
                this.ptr.css({
                    zIndex: e
                })
            }
            ,
            i.prototype.limits = function (e) {
                return this.parent.limits(e, this)
            }
            ,
            i.prototype.calc = function (e) {
                var t = this.limits((e - this._parent.offset.left) * 100 / this._parent.width);
                return t
            }
            ,
            i.prototype.set = function (e, t) {
                this.value.origin = this.parent.round(e),
                    this._set(this.parent.valueToPrc(e, this), t)
            }
            ,
            i.prototype._set = function (e, t) {
                t || (this.value.origin = this.parent.prcToValue(e)),
                    this.value.prc = e,
                    this.ptr.css({
                        left: e + "%"
                    }),
                    this.parent.redraw(this)
            }
    }(jQuery);
window.Modernizr = function (n, t, i) {
    function l(n) {
        w.cssText = n
    }

    function u(n, t) {
        return typeof n === t
    }

    var r = {}, p = t.documentElement, a = t.createElement("modernizr"), w = a.style, b, tt = {}.toString,
        v = " -webkit- -moz- -o- -ms- ".split(" "), k = {
            svg: "http://www.w3.org/2000/svg"
        }, f = {}, y = [], s = y.slice, e, h = {}.hasOwnProperty, c, o;
    c = !u(h, "undefined") && !u(h.call, "undefined") ? function (n, t) {
            return h.call(n, t)
        }
        : function (n, t) {
            return t in n && u(n.constructor.prototype[t], "undefined")
        }
    ;
    Function.prototype.bind || (Function.prototype.bind = function (n) {
            var t = this, i, r;
            if (typeof t != "function")
                throw new TypeError;
            return i = s.call(arguments, 1),
                r = function () {
                    var f, e, u;
                    return this instanceof r ? (f = function () {
                    }
                        ,
                        f.prototype = t.prototype,
                        e = new f,
                        u = t.apply(e, i.concat(s.call(arguments))),
                        Object(u) === u ? u : e) : t.apply(n, i.concat(s.call(arguments)))
                }
                ,
                r
        }
    );
    f.inlinesvg = function () {
        var n = t.createElement("div");
        return n.innerHTML = "<svg/>",
        (n.firstChild && n.firstChild.namespaceURI) == k.svg
    }
    ;
    for (o in f)
        c(f, o) && (e = o.toLowerCase(),
            r[e] = f[o](),
            y.push((r[e] ? "" : "no-") + e));
    return r.addTest = function (n, t) {
        if (typeof n == "object")
            for (var u in n)
                c(n, u) && r.addTest(u, n[u]);
        else {
            if (n = n.toLowerCase(),
            r[n] !== i)
                return r;
            t = typeof t == "function" ? t() : t;
            typeof enableClasses != "undefined" && enableClasses && (p.className += " " + (t ? "" : "no-") + n);
            r[n] = t
        }
        return r
    }
        ,
        l(""),
        a = b = null,
        r._version = "2.7.1",
        r._prefixes = v,
        r
}(this, this.document);
Modernizr.addTest("cssfilters", function () {
    var n = document.createElement("div");
    return n.style.cssText = Modernizr._prefixes.join("filter:blur(2px); "),
    !!n.style.length && (document.documentMode === undefined || document.documentMode > 9)
});
Modernizr.addTest("svgfilters", function () {
    var n = !1;
    try {
        n = typeof SVGFEColorMatrixElement !== undefined && SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2
    } catch (t) {
    }
    return n
}),
    function (n, t) {
        function u(t, u) {
            u = u || {};
            classes = u.classes || {};
            fadeClass = classes.fade || r.classes.fade;
            u.fade = u.fade || t.className.indexOf(fadeClass) > -1;
            this.element = t;
            this.settings = n.extend({}, r, u);
            this._defaults = r;
            this._name = i;
            this.init()
        }

        var i = "gray"
            , r = {
            fade: !1,
            classes: {
                fade: "grayscale-fade"
            }
        };
        u.prototype = {
            init: function () {
                !Modernizr.cssfilters && Modernizr.inlinesvg && Modernizr.svgfilters && (element = n(this.element),
                (this.cssFilterDeprecated(element) || this.settings.fade) && this.switchImage(element))
            },
            cssFilterDeprecated: function (n) {
                return n.css("filter") === "none"
            },
            elementType: function (n) {
                return n.prop("tagName") === "IMG" ? "Img" : "Bg"
            },
            getComputedStyle: function (n) {
                var i = {}, f = {}, r, e, u, o;
                for (i = t.getComputedStyle(n, null),
                         r = 0,
                         e = i.length; r < e; r++)
                    u = i[r],
                        o = i.getPropertyValue(u),
                        f[u] = o;
                return f
            },
            extractUrl: function (n) {
                return startRegex = /^url\(["']?/,
                    endRegex = /["']?\)$/,
                    n.replace(startRegex, "").replace(endRegex, "")
            },
            positionToNegativeMargin: function (n) {
                var t, i;
                return t = n.match(/^(-?\d+\S+)/)[0],
                    i = n.match(/\s(-?\d+\S+)$/)[0],
                "margin:" + i + " 0 0 " + t
            },
            getBgSize: function (t, i) {
                var r, e, s, u, h, f, o;
                return r = new Image,
                    r.src = t,
                i !== "auto" && i !== "cover" && i !== "contain" && i !== "inherit" && (o = n(this.element),
                    e = r.width / r.height,
                    u = parseInt((i.match(/^(\d+)px/) || [0, 0])[1]),
                    f = parseInt((i.match(/\s(\d+)px$/) || [0, 0])[1]),
                    s = o.height() * e,
                    h = o.width() / e,
                    u = u || s,
                    f = f || h),
                    u || f ? {
                        width: u,
                        height: f
                    } : {
                        width: r.width,
                        height: r.height
                    }
            },
            getParams: function (n) {
                var t = this.elementType(n);
                return this["get" + t + "Params"](n)
            },
            getImgParams: function (n) {
                var t = {};
                return t.styles = this.getComputedStyle(n[0]),
                    t.svg = {
                        url: n[0].src,
                        width: t.styles.width.replace("px", ""),
                        height: t.styles.height.replace("px", ""),
                        offset: ""
                    },
                    t
            },
            getBgParams: function (t) {
                var i = {}, r;
                return r = this.extractUrl(t.css("background-image")),
                    bgSize = this.getBgSize(r, t.css("background-size")),
                    offset = this.positionToNegativeMargin(t.css("background-position")),
                    i.styles = this.getComputedStyle(t[0]),
                    i.svg = n.extend({
                        url: r
                    }, bgSize, {
                        offset: offset
                    }),
                    i
            },
            setFadeStyles: function (n, t) {
                return n["background-image"] = 'url("' + t + '")',
                    delete n.filter,
                    n
            },
            switchImage: function (t) {
                var i, u, r;
                i = this.getParams(t);
                u = this.settings.fade ? this.settings.classes.fade : "";
                r = n('<div class="grayscale-replaced ' + u + '"><svg xmlns="http://www.w3.org/2000/svg" id="svgroot" viewBox="0 0 ' + i.svg.width + " " + i.svg.height + '" width="' + i.svg.width + '" height="' + i.svg.height + '" style="' + i.svg.offset + '"><defs><filter id="gray"><feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0" /><\/filter><\/defs><image filter="url(&quot;#gray&quot;)" x="0" y="0" width="' + i.svg.width + '" height="' + i.svg.height + '" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + i.svg.url + '" /><\/svg><\/div>');
                i.styles.display = "inline-block";
                i.styles.overflow = i.styles["overflow-x"] = i.styles["overflow-y"] = "hidden";
                this.settings.fade && (i.styles = this.setFadeStyles(i.styles, i.svg.url));
                r.css(i.styles);
                t.replaceWith(r)
            }
        };
        n.fn[i] = function (t) {
            return this.each(function () {
                n.data(this, "plugin_" + i) || n.data(this, "plugin_" + i, new u(this, t))
            }),
                this
        }
        ;
        n(t).on("load", function () {
            n(".grayscale")[i]()
        })
    }(jQuery, window, document);
(function (n) {
        function t(t) {
            if (typeof t.data == "string" && (t.data = {
                keys: t.data
            }),
            t.data && t.data.keys && typeof t.data.keys == "string") {
                var r = t.handler
                    , i = t.data.keys.toLowerCase().split(" ");
                t.handler = function (t) {
                    var o, h;
                    if (this === t.target || !(/textarea|select/i.test(t.target.nodeName) || n.hotkeys.options.filterTextInputs && n.inArray(t.target.type, n.hotkeys.textAcceptingInputTypes) > -1)) {
                        var f = t.type !== "keypress" && n.hotkeys.specialKeys[t.which]
                            , s = String.fromCharCode(t.which).toLowerCase()
                            , u = ""
                            , e = {};
                        for (n.each(["alt", "ctrl", "shift"], function (n, i) {
                            t[i + "Key"] && f !== i && (u += i + "+")
                        }),
                             t.metaKey && !t.ctrlKey && f !== "meta" && (u += "meta+"),
                             t.metaKey && f !== "meta" && u.indexOf("alt+ctrl+shift+") > -1 && (u = u.replace("alt+ctrl+shift+", "hyper+")),
                                 f ? e[u + f] = !0 : (e[u + s] = !0,
                                     e[u + n.hotkeys.shiftNums[s]] = !0,
                                 u === "shift+" && (e[n.hotkeys.shiftNums[s]] = !0)),
                                 o = 0,
                                 h = i.length; o < h; o++)
                            if (e[i[o]])
                                return r.apply(this, arguments)
                    }
                }
            }
        }

        n.hotkeys = {
            version: "0.8",
            specialKeys: {
                8: "backspace",
                9: "tab",
                10: "return",
                13: "return",
                16: "shift",
                17: "ctrl",
                18: "alt",
                19: "pause",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "del",
                59: ";",
                61: "=",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                144: "numlock",
                145: "scroll",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            },
            shiftNums: {
                "`": "~",
                "1": "!",
                "2": "@",
                "3": "#",
                "4": "$",
                "5": "%",
                "6": "^",
                "7": "&",
                "8": "*",
                "9": "(",
                "0": ")",
                "-": "_",
                "=": "+",
                ";": ": ",
                "'": '"',
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|"
            },
            textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"],
            options: {
                filterTextInputs: !0
            }
        };
        n.each(["keydown", "keyup", "keypress"], function () {
            n.event.special[this] = {
                add: t
            }
        })
    }
)(jQuery || this.jQuery || window.jQuery);
(function (n) {
        for (var t, i, f = document.getElementsByTagName("head")[0].style, u = "transformProperty WebkitTransform OTransform msTransform MozTransform".split(" "), r = 0; r < u.length; r++)
            f[u[r]] !== undefined && (t = u[r]);
        t && (i = t.replace(/[tT]ransform/, "TransformOrigin"),
        i[0] == "T" && (i[0] = "t"));
        eval('IE = "v"=="\v"');
        jQuery.fn.extend({
            rotate: function (t) {
                var u, r, f, i, e, o;
                if (this.length !== 0 && typeof t != "undefined") {
                    for (typeof t == "number" && (t = {
                        angle: t
                    }),
                             u = [],
                             r = 0,
                             f = this.length; r < f; r++)
                        i = this.get(r),
                            i.Wilq32 && i.Wilq32.PhotoEffect ? i.Wilq32.PhotoEffect._handleRotation(t) : (e = n.extend(!0, {}, t),
                                o = new Wilq32.PhotoEffect(i, e)._rootObj,
                                u.push(n(o)));
                    return u
                }
            },
            getRotateAngle: function () {
                for (var t, i = [], n = 0, r = this.length; n < r; n++)
                    t = this.get(n),
                    t.Wilq32 && t.Wilq32.PhotoEffect && (i[n] = t.Wilq32.PhotoEffect._angle);
                return i
            },
            stopRotate: function () {
                for (var t, n = 0, i = this.length; n < i; n++)
                    t = this.get(n),
                    t.Wilq32 && t.Wilq32.PhotoEffect && clearTimeout(t.Wilq32.PhotoEffect._timer)
            }
        });
        Wilq32 = window.Wilq32 || {};
        Wilq32.PhotoEffect = function () {
            return t ? function (n, t) {
                    n.Wilq32 = {
                        PhotoEffect: this
                    };
                    this._img = this._rootObj = this._eventObj = n;
                    this._handleRotation(t)
                }
                : function (n, t) {
                    if (this._img = n,
                        this._onLoadDelegate = [t],
                        this._rootObj = document.createElement("span"),
                        this._rootObj.style.display = "inline-block",
                        this._rootObj.Wilq32 = {
                            PhotoEffect: this
                        },
                        n.parentNode.insertBefore(this._rootObj, n),
                        n.complete)
                        this._Loader();
                    else {
                        var i = this;
                        jQuery(this._img).bind("load", function () {
                            i._Loader()
                        })
                    }
                }
        }();
        Wilq32.PhotoEffect.prototype = {
            _setupParameters: function (n) {
                this._parameters = this._parameters || {};
                typeof this._angle != "number" && (this._angle = 0);
                typeof n.angle == "number" && (this._angle = n.angle);
                this._parameters.animateTo = typeof n.animateTo == "number" ? n.animateTo : this._angle;
                this._parameters.step = n.step || this._parameters.step || null;
                this._parameters.easing = n.easing || this._parameters.easing || this._defaultEasing;
                this._parameters.duration = "duration" in n ? n.duration : n.duration || this._parameters.duration || 1e3;
                this._parameters.callback = n.callback || this._parameters.callback || this._emptyFunction;
                this._parameters.center = n.center || this._parameters.center || ["50%", "50%"];
                this._rotationCenterX = typeof this._parameters.center[0] == "string" ? parseInt(this._parameters.center[0], 10) / 100 * this._imgWidth * this._aspectW : this._parameters.center[0];
                this._rotationCenterY = typeof this._parameters.center[1] == "string" ? parseInt(this._parameters.center[1], 10) / 100 * this._imgHeight * this._aspectH : this._parameters.center[1];
                n.bind && n.bind != this._parameters.bind && this._BindEvents(n.bind)
            },
            _emptyFunction: function () {
            },
            _defaultEasing: function (n, t, i, r, u) {
                return -r * ((t = t / u - 1) * t * t * t - 1) + i
            },
            _handleRotation: function (n, i) {
                if (!t && !this._img.complete && !i) {
                    this._onLoadDelegate.push(n);
                    return
                }
                this._setupParameters(n);
                this._angle == this._parameters.animateTo ? this._rotate(this._angle) : this._animateStart()
            },
            _BindEvents: function (n) {
                var i, t;
                if (n && this._eventObj) {
                    if (this._parameters.bind) {
                        i = this._parameters.bind;
                        for (t in i)
                            i.hasOwnProperty(t) && jQuery(this._eventObj).unbind(t, i[t])
                    }
                    this._parameters.bind = n;
                    for (t in n)
                        n.hasOwnProperty(t) && jQuery(this._eventObj).bind(t, n[t])
                }
            },
            _Loader: function () {
                return IE ? function () {
                        var n = this._img.width, t = this._img.height, i;
                        for (this._imgWidth = n,
                                 this._imgHeight = t,
                                 this._img.parentNode.removeChild(this._img),
                                 this._vimage = this.createVMLNode("image"),
                                 this._vimage.src = this._img.src,
                                 this._vimage.style.height = t + "px",
                                 this._vimage.style.width = n + "px",
                                 this._vimage.style.position = "absolute",
                                 this._vimage.style.top = "0px",
                                 this._vimage.style.left = "0px",
                                 this._aspectW = this._aspectH = 1,
                                 this._container = this.createVMLNode("group"),
                                 this._container.style.width = n,
                                 this._container.style.height = t,
                                 this._container.style.position = "absolute",
                                 this._container.style.top = "0px",
                                 this._container.style.left = "0px",
                                 this._container.setAttribute("coordsize", n - 1 + "," + (t - 1)),
                                 this._container.appendChild(this._vimage),
                                 this._rootObj.appendChild(this._container),
                                 this._rootObj.style.position = "relative",
                                 this._rootObj.style.width = n + "px",
                                 this._rootObj.style.height = t + "px",
                                 this._rootObj.setAttribute("id", this._img.getAttribute("id")),
                                 this._rootObj.className = this._img.className,
                                 this._eventObj = this._rootObj; i = this._onLoadDelegate.shift();)
                            this._handleRotation(i, !0)
                    }
                    : function () {
                        var n, t;
                        for (this._rootObj.setAttribute("id", this._img.getAttribute("id")),
                                 this._rootObj.className = this._img.className,
                                 this._imgWidth = this._img.naturalWidth,
                                 this._imgHeight = this._img.naturalHeight,
                                 n = Math.sqrt(this._imgHeight * this._imgHeight + this._imgWidth * this._imgWidth),
                                 this._width = n * 3,
                                 this._height = n * 3,
                                 this._aspectW = this._img.offsetWidth / this._img.naturalWidth,
                                 this._aspectH = this._img.offsetHeight / this._img.naturalHeight,
                                 this._img.parentNode.removeChild(this._img),
                                 this._canvas = document.createElement("canvas"),
                                 this._canvas.setAttribute("width", this._width),
                                 this._canvas.style.position = "relative",
                                 this._canvas.style.left = -this._img.height * this._aspectW + "px",
                                 this._canvas.style.top = -this._img.width * this._aspectH + "px",
                                 this._canvas.Wilq32 = this._rootObj.Wilq32,
                                 this._rootObj.appendChild(this._canvas),
                                 this._rootObj.style.width = this._img.width * this._aspectW + "px",
                                 this._rootObj.style.height = this._img.height * this._aspectH + "px",
                                 this._eventObj = this._canvas,
                                 this._cnv = this._canvas.getContext("2d"); t = this._onLoadDelegate.shift();)
                            this._handleRotation(t, !0)
                    }
            }(),
            _animateStart: function () {
                this._timer && clearTimeout(this._timer);
                this._animateStartTime = +new Date;
                this._animateStartAngle = this._angle;
                this._animate()
            },
            _animate: function () {
                var t = +new Date, i = t - this._animateStartTime > this._parameters.duration, r, n;
                i && !this._parameters.animatedGif ? clearTimeout(this._timer) : ((this._canvas || this._vimage || this._img) && (r = this._parameters.easing(0, t - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration),
                    this._rotate(~~(r * 10) / 10)),
                this._parameters.step && this._parameters.step(this._angle),
                    n = this,
                    this._timer = setTimeout(function () {
                        n._animate.call(n)
                    }, 10));
                this._parameters.callback && i && (this._angle = this._parameters.animateTo,
                    this._rotate(this._angle),
                    this._parameters.callback.call(this._rootObj))
            },
            _rotate: function () {
                var n = Math.PI / 180;
                return IE ? function (n) {
                        this._angle = n;
                        this._container.style.rotation = n % 360 + "deg";
                        this._vimage.style.top = -(this._rotationCenterY - this._imgHeight / 2) + "px";
                        this._vimage.style.left = -(this._rotationCenterX - this._imgWidth / 2) + "px";
                        this._container.style.top = this._rotationCenterY - this._imgHeight / 2 + "px";
                        this._container.style.left = this._rotationCenterX - this._imgWidth / 2 + "px"
                    }
                    : t ? function (n) {
                            this._angle = n;
                            this._img.style[t] = "rotate(" + n % 360 + "deg)";
                            this._img.style[i] = this._parameters.center.join(" ")
                        }
                        : function (t) {
                            this._angle = t;
                            t = t % 360 * n;
                            this._canvas.width = this._width;
                            this._canvas.height = this._height;
                            this._cnv.translate(this._imgWidth * this._aspectW, this._imgHeight * this._aspectH);
                            this._cnv.translate(this._rotationCenterX, this._rotationCenterY);
                            this._cnv.rotate(t);
                            this._cnv.translate(-this._rotationCenterX, -this._rotationCenterY);
                            this._cnv.scale(this._aspectW, this._aspectH);
                            this._cnv.drawImage(this._img, 0, 0)
                        }
            }()
        };
        IE && (Wilq32.PhotoEffect.prototype.createVMLNode = function () {
            document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                return document.namespaces.rvml || document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"),
                    function (n) {
                        return document.createElement("<rvml:" + n + ' class="rvml">')
                    }
            } catch (n) {
                return function (n) {
                    return document.createElement("<" + n + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                }
            }
        }())
    }
)(jQuery);

function panelBind(n) {
    $("#nav-sec,#history").hover(function () {
        $(this).addClass("more-hover")
    }, function () {
        $(this).removeClass("more-hover")
    });
    $("#prev").click(function () {
        SMH.prev()
    });
    $("#next").click(function () {
        SMH.next()
    });
    $(".prevC").click(function () {
        SMH.prevC()
    });
    $(".nextC").click(function () {
        SMH.nextC()
    });
    $("#viewList").attr("href", "/comic/" + n.bid + "/");
    $("#support-help").attr("href", "/help/");
    $("#tbBox").live({
        mousedown: function (n) {
            e = +new Date;
            var t, i = $(document), r = function (n) {
                return i.scrollTop(i.scrollTop() + t - n.pageY),
                    !1
            };
            return $(this).css("cursor", "move"),
                t = n.pageY,
                $(this).bind("mousemove", r),
                !1
        },
        mouseup: function () {
            $(this).css("cursor", "default").unbind("mousemove")
        }
    });
    pfuncs[pVars.curFunc].fn();
    SMH.shortcuts.init();
    SMH.qrcodes.init();
    SMH.zoomtool.init();
    $(document).bind("keydown", "left", function () {
        SMH.prev()
    }).bind("keydown", "right", function () {
        SMH.next()
    }).bind("keydown", "z", function () {
        SMH.prevC()
    }).bind("keydown", "x", function () {
        SMH.nextC()
    }).bind("keydown", "c", function () {
        SMH.lighter.change()
    }).bind("keydown", "v", function () {
        window.scrollTo(0, 0)
    });
    SMH.lighter.init();
    SMH.history.init();
    $("#support-error").click(function () {
        SMH.feedback.open()
    });
    $("#tool-crop").click(function () {
        var i, t;
        SMH.croping || (SMH.croping = !0,
            i = $.pb({
                id: "pb-crop",
                title: "裁切图片",
                width: 320,
                height: 65,
                mask: !1,
                resize: !1,
                fixed: !1,
                head: !1,
                oBtnText: "确定",
                content: '<span>请调整方框来选择裁切的区域！<\/span><br/><span>长宽比：<\/span><select id="aspectRatio"><option value="0">不限制<\/option><option value="1">正方形(1:1)<\/option><option value="2/3">长方形(2:3)<\/option><option value="3/4">长方形(3:4)<\/option><\/select><br><span>验证码：<\/span><input type="text" name="code" size="4" maxlength="4"/><img name="code" src="" width="50px" height="21px" style="vertical-align: top;" />',
                onCancel: function () {
                    t.destroy();
                    SMH.croping = !1;
                    $("#mangaFile").height("auto")
                },
                onOk: function () {
                    var r = $("input[name=code]").val();
                    return $.trim(r) != "" ? (t.setOptions({
                        allowMove: !1,
                        allowResize: !1
                    }),
                        t.focus(),
                        $("#pb-crop >>> .pb-ok").remove(),
                        i.setContent("<span>正在裁切图片,请稍等...<\/span>"),
                        $.extend(t.pos, {
                            cid: n.cid,
                            p: pVars.page,
                            code: r
                        }),
                        $.ajax({
                            type: "POST",
                            url: "/tools/crop.ashx",
                            data: t.pos,
                            dataType: "json",
                            success: function (r) {
                                r.success ? (i.setContent('<span><a href="' + r.img + '" target="_blank">图片裁切<\/a>完成！建议您分享图片以便持久保存。<\/span><div class="bdsharebuttonbox" data-tag="share_crop"><a class="bds_mshare" data-cmd="mshare"><\/a><a class="bds_qzone" data-cmd="qzone" href="#"><\/a><a class="bds_tsina" data-cmd="tsina"><\/a><a class="bds_baidu" data-cmd="baidu"><\/a><a class="bds_renren" data-cmd="renren"><\/a><a class="bds_tqq" data-cmd="tqq"><\/a><a class="bds_more" data-cmd="more">更多<\/a><\/div>'),
                                    window._bd_share_main = null,
                                    window._bd_share_config = {
                                        common: {
                                            bdDesc: "hi，我正在对 " + n.bname + " - " + n.cname + " 第" + n.page + "页漫画截屏，快来manhuagui.com试试吧！",
                                            bdPic: r.img,
                                            onAfterClick: function () {
                                                t.destroy();
                                                SMH.croping = !1;
                                                $("#mangaFile").height("auto");
                                                i.dispose()
                                            }
                                        },
                                        share: [{
                                            tag: "share_crop",
                                            bdSize: 24
                                        }]
                                    },
                                    SMH.utils.bdShareLoad()) : i.setContent("<span>" + (r.errorMessage ? r.errorMessage : "裁切图片失败，请稍后重试！") + "<\/span>")
                            }
                        })) : alert("请输入验证码！"),
                        !1
                }
            }),
            $("img[name=code]").click(function () {
                $(this).attr("src", "/tools/verify_code.ashx?NumCount=4&id" + new Date)
            }).attr("src", "/tools/verify_code.ashx?NumCount=4&id" + new Date),
            $("#aspectRatio").change(function () {
                t.setOptions({
                    aspectRatio: eval(this.value)
                });
                t.focus()
            }),
            $("#mangaFile").css("width", "auto"),
            t = $.Jcrop("#mangaFile"),
            t.setOptions({
                allowSelect: !1,
                onChange: function (n) {
                    var i = $('div[class="jcrop-hline bottom"]').offset();
                    $("#pb-crop").offset({
                        left: i.left,
                        top: i.top + 5
                    });
                    t.pos = n
                },
                setSelect: function () {
                    var n = t.getBounds();
                    return [0, 0, n[0] > 199 ? 199 : n[0], n[1] > 300 ? 300 : n[1]]
                }()
            }),
            t.focus())
    });
    $("#tool-gray").click(function () {
        var n = !SMH.store.get("grayscale");
        SMH.store.set("grayscale", n);
        n ? ($(this).addClass("sel"),
            $("img[data-tag=mangaFile]").addClass("grayscale").gray()) : location.reload(!1)
    });
    SMH.store.get("speed") ? $("#tool-speed").addClass("sel") : $("#tool-speed").removeClass("sel");
    $("#tool-speed").click(function () {
        var n = !SMH.store.get("speed");
        SMH.store.set("speed", n);
        n ? $(this).addClass("sel") : $(this).removeClass("sel")
    });
    $("#tool-rotate").click(function () {
        SMH.rotate.change()
    });
    $("#pageSelect").change(function () {
        SMH.utils.goPage(this.options[this.selectedIndex].value)
    });
    SMH.suggest({
        key: "txtKey",
        result: "sList",
        button: "btnSend"
    });
    SMH.backtotop()
}

var servs = [{
    name: "自动",
    hosts: [{
        h: "i",
        w: 100
    }, {
        h: "us",
        w: 1
    }]
}, {
    name: "电信",
    hosts: [{
        h: "eu",
        w: 100
    }, {
        h: "i",
        w: 1
    }, {
        h: "us",
        w: 1
    }]
}, {
    name: "联通",
    hosts: [{
        h: "us",
        w: 100
    }, {
        h: "i",
        w: 1
    }, {
        h: "eu",
        w: 1
    }]
}], pfuncs = [{
    name: "双击",
    desc: '<strong>下一页：<\/strong><span class="keyboard key-click"><\/span>双击鼠标左键',
    fn: function () {
        $("#mangaBox").dblclick(function () {
            SMH.next()
        })
    }
}, {
    name: "单击",
    desc: '<strong>下一页：<\/strong><span class="keyboard key-click"><\/span>单击鼠标左键<br /><strong>上一页：<\/strong><span class="keyboard key-click"><\/span>单击鼠标右键',
    fn: function () {
        $("#mangaBox").click(function () {
            SMH.next()
        });
        $("#mangaBox").mousedown(function (n) {
            3 == n.which && SMH.prev()
        })
    }
}, {
    name: "两侧",
    desc: '<strong>下一页：<\/strong><span class="keyboard key-click"><\/span>单击图片右侧<br /><strong>上一页：<\/strong><span class="keyboard key-click"><\/span>单击图片左侧',
    fn: function () {
        $("#tbBox").append('<div id="efpLeftArea" class="arrLeft" title="上一张" onclick="SMH.prev();"><\/div><div id="efpRightArea" class="arrRight" title="下一张" onclick="SMH.next();"><\/div>');
        sys.ie6 && $("#efpLeftArea,#efpRightArea").css("filter", 'progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=image, src="/images/dian.png");').css("background", "url(/images/dian.png) no-repeat 0 0 !important;").height(600)
    }
}, {
    name: "下拉",
    desc: '<strong>下一页：<\/strong><span class="keyboard key-click"><\/span>鼠标滑轮下滚<br /><strong>上一页：<\/strong><span class="keyboard key-click"><\/span>鼠标滑轮上滚',
    fn: function () {
        SMH.utils.moreLoad()
    }
}], cInfo;
SMH.utils = function () {
    var n = {};
    return {
        init: function (t) {
            n = t
        },
        getQuery: function (n) {
            var t = RegExp("[#&]" + n + "=([^&]*)").exec(window.location.hash) || RegExp("[0-9]+_" + n + "([^&]*).html").exec(window.location);
            return t ? decodeURIComponent(t[1].replace(/\+/g, " ")) : ""
        },
        goPage: function (t) {
            location.hash = "p=" + t;
            $("html,body").animate({
                scrollTop: 0
            }, 100);
            pVars.page = n.getPage();
            $("#page").html(pVars.page);
            try {
                $("#pageSelect").val(pVars.page)
            } catch (i) {
                setTimeout("$('#pageSelect').val('" + pVars.page + "')", 1)
            }
            $("#mangaFile").remove();
            n.loadIMG()
        },
        moreLoad: function () {
            $("#tbBox").append('<div align="center" id="mangaMoreBox"><\/div><div class="loading-box" id="loading" style="display:none;"><img src="/images/sloading.gif" alt="" /><\/div>');
            n.moreLoad($("#mangaMoreBox"))
        },
        pageTop: function () {
            var n = document
                ,
                t = /iPad|iPhone/i.test(navigator.userAgent.toLowerCase()) == !0 ? window.pageYOffset : Math.max(n.documentElement.scrollTop, n.body.scrollTop);
            return n.documentElement.clientHeight + t
        },
        throttle: function (n, t) {
            var r = 200, i;
            return function () {
                var u = this
                    , f = arguments;
                i && clearTimeout(i);
                i = setTimeout(function () {
                    n.apply(u, f)
                }, t || r)
            }
        },
        addToFav: function (n, t) {
            n = n || location.protocol + "//www.manhuagui.com/";
            t = t || "看漫画，属于你的漫画乐园！";
            var i = navigator.userAgent.toLowerCase().indexOf("mac") != -1 ? "Command/Cmd" : "CTRL";
            try {
                document.all ? window.external.addFavorite(n, t) : window.sidebar ? window.sidebar.addPanel(t, n, "") : alert("您可以尝试通过快捷键" + i + " + D 加入到收藏夹!")
            } catch (r) {
                alert("您可以尝试通过快捷键" + i + " + D 加入到收藏夹!")
            }
        },
        getPath: function (n, t) {
            return location.protocol + "//" + n + ".hamreus.com" + t
        },
        getRandomIndex: function (n) {
            var i = []
                , f = 0;
            $.each(n, function (n, t) {
                f += t.w;
                i[n] = f
            });
            $.each(n, function (n) {
                i[n] = i[n] / f
            });
            for (var r = Math.random(), u = i.length - 1, t = 0; t < u;)
                if (probe = Math.ceil((u + t) / 2),
                i[probe] < r)
                    t = probe + 1;
                else if (i[probe] > r)
                    u = probe - 1;
                else
                    return probe;
            return t != u ? i[t] >= r ? t : probe : i[t] >= r ? t : t + 1
        },
        imgRender: function (n, t) {
            var i = $(n).width()
                , u = SMH.store.get("autosize")
                , r = SMH.store.get("zoom");
            $(n).attr("imgw", i);
            u ? (i > $(window).width() - 20 ? $(n).width($(window).width() - 20) : i < $("#mangaBox").width() && $(n).width($("#mangaBox").width()),
                $("#tool-zoom").removeClass().addClass("sel fit").text("适应")) : r != 0 && ($(n).width(i + i * r / 100),
                $("#tool-zoom").text((r > 0 ? "+" : "-") + $.formatNumber(Math.abs(r), {
                    format: "00"
                })).removeClass().addClass("sel zoom" + (r > 0 ? "in" : "out")));
            pVars.curFunc == 2 && sys.ie6 && $("#efpLeftArea,#efpRightArea").height($("#tbBox").height());
            SMH.store.get("grayscale") && $(n).gray();
            typeof $('[data-tag="mangaFile"]').rotate != "undefined" && ($('[data-tag="mangaFile"]').rotate(0),
                t ? SMH.rotate.init() : SMH.rotate.render())
        },
        imgGrayScale: function () {
            SMH.store.get("grayscale") && ($("img[data-tag=mangaFile]:last").addClass("grayscale"),
            $("#tool-gray").hasClass("sel") || $("#tool-gray").addClass("sel"))
        },
        bdShareLoad: function () {
            $.getScript("http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=" + ~(-new Date / 36e5))
        }
    }
}();
cInfo = {};
SMH.imgData = function () {
    return function (n) {
        function h(n) {
            var t = document.createElement("img");
            $(t).attr("src", n).hide();
            $("#imgPreLoad").append(t);
            $("#imgPreLoad").hide()
        }

        function o(n) {
            var t = Math.floor(Math.random() * servs[pVars.curServ].hosts.length);
            return n.indexOf(t) >= 0 ? o.apply(this, arguments) : (f.push(t),
                t)
        }

        function c(n) {
            s() ? $("#checkAdult").length > 0 && !$.cookie(e) ? ($("#imgLoading").hide(),
                $("#efpRightArea,#efpLeftArea").hide(),
                $("#checkAdult").click(function () {
                    try {
                        $.cookie(e, 1, {
                            expires: 7,
                            path: "/"
                        })
                    } catch (t) {
                    }
                    $("#efpRightArea,#efpLeftArea").show();
                    n()
                }).show()) : n() : $("#imgLoading").hide()
        }

        function s() {
            var n = "HX", i, r;
            return typeof $.cookie != "undefined" && (n = $.cookie("country")),
                i = n != null && t.block_cc.indexOf(n) < 0,
                r = !navigator.cookieEnabled && t.block_cc == "",
            i || r
        }

        function i(n) {
            var u = pVars.manga.filePath + t.files[n]
                , i = [];
            for (var r in t.sl)
                i.push(r + "=" + t.sl[r]);
            return u + (i.length > 0 ? "?" + i.join("&") : "")
        }

        var t = $.extend({}, n), r = 0, f = [], u, e = "isAdult";
        return f.push(pVars.curHost),
            {
                init: function () {
                    if (this.writeList(),
                        $.each(["autosize|0", "grayscale|0", "simple|0", "speed|1"], function (n, t) {
                            var i = t.split("|");
                            SMH.store.get(i[0]) == null && SMH.store.set(i[0], i[1] == "1")
                        }),
                    (SMH.store.get("zoom") == null || Math.abs(SMH.store.get("zoom")) > 80) && SMH.store.set("zoom", 0),
                    t.files.length == 0) {
                        $("#imgLoading").hide();
                        return
                    }
                    var n = document.createElement("canvas")
                        ,
                        i = n.getContext && n.getContext("2d") && n.toDataURL("image/webp").indexOf("data:image/webp") == 0;
                    i || $.each(t.files, function (n, i) {
                        t.files[n] = i.replace(/(.*)\.webp$/gi, "$1")
                    });
                    panelBind(t);
                    this.loadIMG()
                },
                preInit: function () {
                    if (SMH.utils.init(this),
                        $.each(["bid", "cid", "len", "prevId", "nextId"], function (n, i) {
                            cInfo[i] = t[i]
                        }),
                    $.cookie("country") != null)
                        this.init();
                    else {
                        var n = this;
                        $.get("/tools/submit_ajax.ashx?action=user_check_login", function () {
                            n.init()
                        })
                    }
                },
                getHost: function () {
                    var i, r, u, n;
                    $.each(servs, function (n) {
                        servs[n].w = 0;
                        $.each(servs[n].hosts, function (t) {
                            servs[n].w += servs[n].hosts[t].w
                        })
                    });
                    try {
                        i = SMH.store.get("imgServ");
                        i == null ? (pVars.curServ = 0,
                            SMH.store.set("imgServ", pVars.curServ)) : (n = parseInt(i),
                        n >= 0 && n < servs.length && (pVars.curServ = n));
                        i = SMH.store.get("imgHost");
                        i == null ? (r = SMH.utils.getRandomIndex(servs[pVars.curServ].hosts),
                            SMH.store.set("imgHost", r),
                            pVars.curHost = r) : (n = parseInt(i),
                        n >= 0 && n < servs[pVars.curServ].hosts.length && (pVars.curHost = n));
                        pVars.manga.filePath = SMH.utils.getPath(servs[pVars.curServ].hosts[pVars.curHost].h, t.path);
                        i = SMH.store.get("pageFunc");
                        i == null ? (u = sys.mobile ? 2 : 1,
                            SMH.store.set("pageFunc", u),
                            pVars.curFunc = u) : (n = parseInt(i),
                        n >= 0 && n < pfuncs.length && (pVars.curFunc = n))
                    } catch (f) {
                    }
                },
                writeList: function () {
                    var i, n, f, r, u;
                    for (this.getHost(),
                             i = [],
                             n = 0,
                             f = servs.length; n < f; n++)
                        r = n == pVars.curServ ? ['class="current"', ""] : ["", ""],
                            i.push('<li><a href="javascript:void(0)" ' + r[0] + ' onclick="SMH.setServ(' + n + ')">' + r[1] + servs[n].name + "<\/a><\/li>");
                    for ($("#servList ul").append(i.join("")),
                             i = [],
                             n = 0,
                             f = pfuncs.length; n < f; n++)
                        r = n == pVars.curFunc ? ['class="current"', ""] : ["", ""],
                            i.push('<li class="pfunc"><a href="javascript:void(0)" ' + r[0] + ' onclick="SMH.setFunc(' + n + ')">' + r[1] + pfuncs[n].name + "<\/a><\/li>");
                    for (sys.mobile && (i[0] = ""),
                             $(".support ul").append(i.join("")),
                             pVars.page = this.getPage(),
                             $("#page").html(pVars.page),
                             i = [],
                             u = 0; u < t.len; u++)
                        i.push('<option value="' + (u + 1) + '"' + (u + 1 == pVars.page ? ' selected="selected"' : "") + ">第" + (u + 1) + "页<\/option>");
                    $("#pageSelect").append(i.join(""))
                },
                getPage: function () {
                    var n = SMH.utils.getQuery("p");
                    return n = n <= 0 ? 1 : n >= t.files.length ? t.files.length : n,
                        parseInt(n, 10)
                },
                loadIMG: function () {
                    var n = this;
                    c(function () {
                        $("span.nopic,#erroraudit_show").remove();
                        $("#imgLoading").show();
                        pVars.curFile = i(pVars.page - 1);
                        $('<img alt="' + t.bname + " " + t.cname + '" id="mangaFile" src="' + pVars.curFile + '" class="mangaFile" data-tag="mangaFile" style="display:block;" />').load(function () {
                            n.success(this)
                        }).error(function () {
                            n.error(this)
                        }).appendTo("#mangaBox");
                        SMH.utils.imgGrayScale()
                    });
                    $(function () {
                        $("#pagination").html(SMH.pager({
                            cp: pVars.page - 1,
                            pc: t.len
                        }));
                        setTimeout(function () {
                            SMH.history.add({
                                bn: t.bname,
                                bid: t.bid,
                                cn: t.cname,
                                cid: t.cid,
                                p: pVars.page,
                                t: parseInt((new Date).getTime() / 1e3)
                            })
                        }, 1e3)
                    })
                },
                success: function (n) {
                    SMH.utils.imgRender("#mangaFile", !0);
                    u && clearTimeout(u);
                    $("#imgLoading").hide();
                    n = n.onload = n.onerror = null;
                    r > 1 && SMH.store.set("imgHost", pVars.curHost);
                    this.preload()
                },
                error: function (n) {
                    var e = this;
                    r < servs[pVars.curServ].hosts.length ? (u && clearTimeout(u),
                        r == 0 ? pVars.curFile += "&_" + sys.tk : (pVars.curHost = o(f),
                            pVars.manga.filePath = SMH.utils.getPath(servs[pVars.curServ].hosts[pVars.curHost].h, t.path),
                            pVars.curFile = i(pVars.page - 1)),
                        e.reload(n, pVars.curFile),
                        r++) : ($("#imgLoading").hide(),
                        $("#mangaBox").html('<span class="nopic">图片载入失败，请 " 按F5键刷新页面 " 或 "切换服务器线路" ，如果依然不行，请 " 进行报错，管理员会尽快解决 " :(<\/span>'))
                },
                reload: function (n, t) {
                    var r = this
                        , i = new Image;
                    i.onerror = function () {
                        r.error(this)
                    }
                    ;
                    i.onload = function () {
                        $("#mangaFile").attr("src", t);
                        r.success(this)
                    }
                    ;
                    i.src = t
                },
                preload: function () {
                    for (var r, n = 1; n <= pVars.manga.preLoadNumber; n++) {
                        if (pVars.page + n - 1 >= t.len)
                            break;
                        r = i(pVars.page - 1 + n);
                        h(r)
                    }
                },
                moreLoad: function (n) {
                    function v() {
                        window.loaded != 1 && (pVars.page < t.files.length ? h() : window.loaded = 1)
                    }

                    function h() {
                        var r;
                        if (pVars.page == c || !o)
                            return !1;
                        c = pVars.page;
                        var u = pVars.page + 1
                            ,
                            f = '<img src="' + i(pVars.page) + '" alt="" data-tag="mangaFile" style="display:block;" />'
                            ,
                            e = '<p class="img_info">(<span class="img_page">' + u + "<\/span>/" + t.files.length + ")<\/p>";
                        n.append(f);
                        SMH.utils.imgGrayScale();
                        r = $("#mangaMoreBox img").last();
                        r.hide();
                        $("#loading").show();
                        r.imgAutoSize(0, function () {
                            $("#loading").hide();
                            r.show();
                            r.after(e);
                            pVars.page++
                        })
                    }

                    function w() {
                        var i = n.offset().top
                            , f = document.documentElement.clientHeight || document.body.clientHeight
                            , e = $(document).scrollTop()
                            , o = e + f
                            , u = r;
                        return $("#mangaMoreBox img").each(function (n) {
                            if (i += $(this).height(),
                            i > o) {
                                var f = r + n - 2;
                                return f = f > r ? f : r,
                                    u = f < t.files.length ? f : t.files.length - 1,
                                    !1
                            }
                        }),
                            u
                    }

                    var l, e, f, r;
                    if (pVars.page != t.files.length && s()) {
                        l = this;
                        $.preLoadImg = function (n, t) {
                            if (!o)
                                return !1;
                            var i = new Image;
                            t || (t = function () {
                                }
                            );
                            i.src = n;
                            i.complete ? t.call(i) : (i.onload = function () {
                                    t.call(i);
                                    i.onload = null
                                }
                                    ,
                                    i.onerror = function () {
                                        t.call(i)
                                    }
                            )
                        }
                        ;
                        $.fn.imgAutoSize = function (n, t) {
                            var i = i || this.innerWidth() - (n || 0);
                            return this.each(function (n, i) {
                                $.preLoadImg(this.src, function () {
                                    t || (t = function () {
                                        }
                                    );
                                    t.call(this);
                                    SMH.utils.imgRender(i, !1)
                                })
                            })
                        }
                        ;
                        $("#next,#prev").hide();
                        n.append('<p class="img_info">(<span class="img_page">' + pVars.page + "<\/span>/" + t.files.length + ")<\/p>");
                        e = null;
                        $(window).scroll(function a() {
                            clearTimeout(e);
                            e = setTimeout(function () {
                                window.loaded == 1 && $(window).unbind("scroll", a);
                                var t = document.documentElement.clientHeight || document.body.clientHeight
                                    , i = $(document).scrollTop();
                                i + t >= n.offset().top + n.height() && v()
                            }, 100)
                        });
                        var u = -1
                            , y = setInterval(function () {
                            if (pVars.page + 1 == u)
                                return !1;
                            if (u = pVars.page + 1,
                            u >= t.files.length) {
                                clearInterval(y);
                                return
                            }
                            var r = document.documentElement.clientHeight || document.body.clientHeight
                                , f = $(document).scrollTop();
                            f + r + 6e3 >= n.offset().top + n.height() && $.preLoadImg(i(u), function () {
                                h()
                            })
                        }, 100)
                            , c = -1
                            , o = !1;
                        (function p() {
                                setTimeout(function () {
                                    $("#imgPreLoad img").length > 0 ? (o = !0,
                                        h()) : p()
                                }, 1e3)
                            }
                        )();
                        f = pVars.page;
                        r = f;
                        setInterval(function () {
                            var n = w();
                            return n > f && (f = n,
                                SMH.history.add({
                                    bn: t.bname,
                                    bid: t.bid,
                                    cn: t.cname,
                                    cid: t.cid,
                                    p: n,
                                    t: parseInt((new Date).getTime() / 1e3)
                                })),
                                !1
                        }, 3e3)
                    }
                }
            }
    }
}(),
    function (n) {
        var i = n(document)
            , r = n(window)
            , f = n.browser.msie
            , e = f && n.browser.version < 7
            , u = Math.max
            , o = Math.min
            , t = function (n) {
            return t.list[n.id] ? t.list[n.id] : new t.fn._init(n)
        };
        t.fn = t.prototype = {
            constructor: t,
            _init: function (i) {
                var u = n.extend({}, t.defaults, i || {})
                    ,
                    s = ['<div id="', u.id, '" class="pb">', u.head ? '<div class="pb-hd">' + (u.xBtn ? '<a class="pb-x" href="javascript:;" title="关闭">✕<\/a>' : "") + '<span class="pb-title">' + u.title + "<\/span><\/div>" : "", '<div class="pb-bd"><div class="pb-ct"><\/div>', u.foot ? '<div class="pb-ft">' + (u.cBtn ? '<a class="pb-btn pb-cl">' + u.cBtnText + "<\/a>" : "") + '<a class="pb-btn pb-ok">' + u.oBtnText + "<\/a><\/div>" : "", "<\/div><\/div>"].join("")
                    , f = n(s)
                    , o = f.find(".pb-hd")
                    , e = f.find(".pb-ft")
                    , r = this;
                return r.$pb = f,
                    r.$head = o,
                    r.$foot = e,
                    r.$xBtn = o.find(".pb-x"),
                    r.$cont = f.find(".pb-ct"),
                    r.$cBtn = e.find(".pb-cl"),
                    r.$oBtn = e.find(".pb-ok"),
                    r.$pb.appendTo(document.body),
                    r.opts = u,
                    r.offsetHeight = o.outerHeight() + e.outerHeight(),
                    r._bindEvent(),
                    r._setPbZindex(),
                    r.resize(u.width, u.height),
                    r.setContent(u.content),
                u.mask && r._setMask(),
                u.fixed || r.$pb.css("position", "absolute"),
                    r.setPos(u.top, u.left),
                    t.list[u.id] = r,
                    r._focus(),
                    r
            },
            _zindex: function () {
                return window.pb_zindex = window.pb_zindex || 2209,
                    ++window.pb_zindex
            },
            _setPbZindex: function () {
                var n = this;
                return n.$pb.css("z-index", n._zindex())
            },
            _setMaskZindex: function () {
                var t = this;
                return n("#pb-mask").css("z-index", t._zindex()).show()
            },
            _setMask: function () {
                var t = this, i, r;
                n("#pb-mask").length ? (t._setMaskZindex(),
                    t._setPbZindex()) : (i = "position:fixed;width:100%;height:100%;top:0;left:0;filter:alpha(opacity=30);opacity:0.3;overflow:hidden;background-color:#000;_position:absolute;left:expression(documentElement.scrollLeft+documentElement.clientWidth-this.offsetWidth);top:expression(documentElement.scrollTop+documentElement.clientHeight-this.offsetHeight);",
                    r = e ? '<iframe src="about:blank" style="width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;filter:alpha(opacity=0)"><\/iframe>' : "",
                    n('<div id="pb-mask" style="' + i + '">' + r + "<\/div>").css("z-index", t._zindex()).appendTo(document.body),
                    t._setPbZindex())
            },
            _setDrag: function () {
                return new t.dragable(this.$pb, this.$head)
            },
            _bindEvent: function (t) {
                var i = this, t = i.opts, u;
                i.$xBtn.length && i.$xBtn.click(function () {
                    n.isFunction(t.onClose) && t.onClose();
                    i.dispose()
                });
                i.$cBtn.length && i.$cBtn.click(function () {
                    n.isFunction(t.onCancel) && t.onCancel();
                    i.dispose()
                });
                i.$oBtn.length && i.$oBtn.click(function () {
                    var r = !0;
                    n.isFunction(t.onOk) && (r = t.onOk(),
                    r != !1 && (r = !0));
                    r == !0 && i.dispose()
                });
                t.resize && r.resize(function () {
                    u && clearTimeout(u);
                    u = setTimeout(function () {
                        i.setPos(t.top, t.left)
                    }, 40)
                });
                n(document).bind("keydown", "return", function () {
                    i.$oBtn.click()
                }).bind("keydown", "esc", function () {
                    i.$xBtn.click()
                })
            },
            _focus: function () {
                var n = t.focus;
                this.prev = n;
                t.focus = this
            },
            resize: function (n, t) {
                var i = this;
                return i.$pb.css("width", u.call(Math, 150, n) + "px"),
                    i.$cont.css("height", u.call(Math, 50, t) + "px"),
                    i
            },
            setPos: function (n, t) {
                var u = this
                    , f = u.opts.fixed ? 0 : i.scrollLeft()
                    , e = u.opts.fixed ? 0 : i.scrollTop();
                return n === "c" && (n = r.height() - u.$pb.outerHeight(),
                    n = n > 0 ? e + (n >> 1) - (n >> 3) : 0),
                t === "c" && (t = r.width() - u.$pb.outerWidth(),
                    t = t > 0 ? f + (t >> 1) : 0),
                    u.$pb.css({
                        top: n,
                        left: t
                    }),
                    u
            },
            center: function () {
                return this.setPos("c", "c")
            },
            setContent: function (n) {
                var t = this;
                if (typeof n == "string")
                    t.$cont.html(n);
                else if (n instanceof jQuery) {
                    var f = n.css("display")
                        , i = n.prev()
                        , r = n.next()
                        , u = n.parent();
                    t._elemBack = function () {
                        i.length ? i.after(n) : r.length ? r.before(n) : u.length && u.append(n);
                        n.css("display", f);
                        t._elemBack = null
                    }
                    ;
                    t.$cont.append(n)
                }
                return t
            },
            dispose: function () {
                var r = this;
                r._elemBack && r._elemBack();
                r.$pb.remove();
                delete t.list[r.opts.id];
                t.focus = t.focus.prev;
                t.focus ? (t.focus.opts.mask ? r._setMaskZindex() : n("#pb-mask").hide(),
                    n(".pb").last().css("z-index", r._zindex())) : n("#pb-mask").remove();
                i.unbind("keydown", "return").unbind("keydown", "esc")
            }
        };
        t.fn._init.prototype = t.fn;
        t.defaults = {
            id: "pb",
            title: "标题",
            content: "",
            width: "auto",
            height: "auto",
            left: "c",
            top: "c",
            resize: !0,
            fixed: !0,
            drag: !0,
            mask: !0,
            head: !0,
            foot: !0,
            xBtn: !0,
            cBtn: !0,
            cBtnText: "取消",
            oBtnText: "确定",
            onClose: null,
            onOk: null,
            onCancel: null
        };
        t.focus = null;
        t.list = {};
        window.pb = n.pb = n.purebox = t;
        n.fn.pb = n.fn.purebox = function (t) {
            return this.bind("click", function () {
                n.pb(t)
            })
        }
    }(window.jQuery),
    function (n) {
        n.fn.center = function (t) {
            var i = n.extend({
                position: "fixed",
                top: "50%",
                left: "50%",
                zIndex: 1e3,
                relative: !0
            }, t || {});
            return this.each(function () {
                var t = n(this);
                i.top == "50%" && (i.marginTop = -t.outerHeight() / 2);
                i.left == "50%" && (i.marginLeft = -t.outerWidth() / 2);
                i.relative && !t.parent().is("body") && t.parent().css("position") == "static" && t.parent().css("position", "relative");
                delete i.relative;
                i.position == "fixed" && n.browser.version == "6.0" && (i.marginTop += n(window).scrollTop(),
                    i.position = "absolute",
                    n(window).scroll(function () {
                        t.stop().animate({
                            marginTop: n(window).scrollTop() - t.outerHeight() / 2
                        })
                    }));
                t.css(i)
            })
        }
    }(jQuery);
SMH.pager = function (n) {
    function o() {
        var t = Math.ceil(n.nde / 2)
            , i = n.pc - n.nde
            , r = n.cp > t ? Math.max(Math.min(n.cp - t, i), 0) : 0
            , u = n.cp > t ? Math.min(n.cp + t, n.pc) : Math.min(n.nde, n.pc);
        return [r, u]
    }

    var f, e, t;
    n = $.extend({
        cp: 0,
        pc: 0,
        nde: 7,
        nee: 2
    }, n || {});
    var i = []
        , u = function (t) {
        t = t < 0 ? 0 : t < n.pc ? t : n.pc - 1;
        t === n.cp ? i.push('<span class="current">' + (t + 1) + "<\/span>") : i.push('<a href="javascript:SMH.utils.goPage(' + (t + 1) + ')">' + (t + 1) + "<\/a>")
    }
        , r = o();
    if (i.push('<a class="btn-red prev" onclick="SMH.prevC()" href="javascript:void(0);">上一章<\/a>'),
        n.cp === 0 ? i.push('<span class="disabled">上一页<\/span>') : i.push('<a class="btn-red prev" href="javascript:SMH.utils.goPage(' + (pVars.page - 1) + ')">上一页<\/a>'),
    r[0] > 0) {
        for (f = Math.min(n.nee, r[0]),
                 t = 0; t < f; t++)
            u(t);
        n.nee < r[0] && i.push("<span>...<\/span>")
    }
    for (t = r[0]; t < r[1]; t++)
        u(t);
    if (r[1] < n.pc)
        for (n.pc - n.nee > r[1] && i.push("<span>...<\/span>"),
                 e = Math.max(n.pc - n.nee, r[1]),
                 t = e; t < n.pc; t++)
            u(t);
    return n.cp === n.pc - 1 ? i.push('<span class="disabled">下一页<\/span>') : i.push('<a class="btn-red next" href="javascript:SMH.utils.goPage(' + (pVars.page + 1) + ')">下一页<\/a>'),
        i.push('<a class="btn-red next" onclick="SMH.nextC()" href="javascript:void(0);">下一章<\/a>'),
        i.join("")
}
;
SMH.backtotop = function () {
    function r() {
        t = $(".sub-btn").position().top;
        n = $(u).appendTo($("body"));
        $("#backTop").click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 120)
        });
        $("#report").live("click", SMH.feedback.open)
    }

    function i() {
        var i, u;
        t || r();
        i = $(document).scrollTop();
        i > t ? n.show() : n.hide();
        sys.ie6 && (u = $(this).height(),
            n.css("top", i + u - 166))
    }

    var u = '<div class="backToTop"><a href="javascript:;" id="report" title="举报报错">举报报错<\/a><a href="javascript:;" id="backTop" title="返回顶部">回到顶部<\/a><\/div>',
        t, n;
    i();
    $(window).bind("scroll resize", i)
}
;
SMH.feedback = {},
    function (n, t) {
        function i() {
            var n = [];
            return n.push('<div class="feedback"><form id="feedback"><h4 style="padding-top:10px;">请选择问题的类型：<\/h4><ul id="fdType">'),
                t.each(u, function () {
                    n.push('<li><label><input type="checkbox"  value="' + this + '" /> ' + this + "<\/label><\/li>")
                }),
                n.push("<\/ul>"),
                n.push("<h4>请输入问题的描述：<span>(请输入问题的详细描述，以方便我们解决问题。您最多可输入500字。)<\/span><\/h4>"),
                n.push('<textarea id="fdCont" maxlength="500" resizable="false"><\/textarea>'),
                n.push("<h4>留下您的联系方式：<span>(留下您的电子邮箱，方便客服与您解决问题。更有机会获取礼品。)<\/span><\/h4>"),
                n.push('<input id="fdContact" class="fd-contact" type="textbox" >'),
                n.push("<\/form><\/div>"),
                n.join("")
        }

        function r() {
            var i = [], n;
            return (t("#fdType li").each(function () {
                var n = t(this).find("input")[0];
                n.checked && i.push(n.value)
            }),
            i.length == 0) ? (alert("请选择问题的类型"),
                !1) : t.trim(t("#fdCont").val()) == "" ? (alert("请输入有关问题的描述"),
                t("#fdCont").focus(),
                !1) : t.trim(t("#fdContact").val()) == "" ? (alert("请留下您的联系方式"),
                t("#fdContact").focus(),
                !1) : (n = {},
                n.errors = i.join(","),
                n.bookid = cInfo.bid,
                n.chapterid = cInfo.cid,
                n.content = t("#fdCont").val(),
                n.contact = t("#fdContact").val(),
                n.url = window.location.href,
                n.img = t("#mangaFile").attr("src"),
                t.ajax({
                    type: "POST",
                    url: "/tools/feedback.ashx",
                    data: n,
                    success: function (n) {
                        n.success ? alert("感谢您的提交") : alert("抱歉，内容提交失败，请稍后重试")
                    },
                    dataType: "json"
                }),
                !0)
        }

        var u = ["漫画要更新啦", "图片不显示", "简介有误", "章节错误", "章节内图片顺序错误"];
        n.open = function () {
            t.pb({
                title: "遇到了问题，没关系，请报错给我们",
                width: 600,
                height: 320,
                content: i(),
                cBtnText: "取消提交",
                oBtnText: "确定提交",
                onOk: function () {
                    return r()
                }
            })
        }
        ;
        t(function () {
            t("#error").click(n.open)
        })
    }(SMH.feedback, jQuery);
SMH.next = function () {
    if (!SMH.croping) {
        var n = pVars.page + 1;
        n > cInfo.len ? SMH.chapter.confirm(1) : SMH.utils.goPage(n);
        window.event.returnValue = !1
    }
}
;
SMH.prev = function () {
    if (!SMH.croping) {
        var n = pVars.page - 1;
        n <= 0 ? SMH.chapter.confirm(0) : SMH.utils.goPage(n);
        window.event.returnValue = !1
    }
}
;
SMH.setServ = function (n) {
    SMH.store.set("imgServ", n);
    SMH.store.remove("imgHost", n);
    location.reload()
}
;
SMH.setFunc = function (n) {
    SMH.store.set("pageFunc", n);
    SMH.store.set("tip-again", 1);
    location.reload()
}
;
SMH.chapter = function () {
    function u(r, u) {
        r = r || 2e3;
        u = u || n.tip_failed;
        t && clearTimeout(t);
        t = setTimeout(function () {
            i.hide(u, r)
        }, n.timeout)
    }

    function r(r) {
        console.log(r);
        u(2e3);
        i.show(r === 1 ? n.tip_next : n.tip_prev);
        setTimeout(function () {
            t && clearTimeout(t);
            r === 1 ? cInfo.nextId == 0 ? (i.hide(),
                i.alert(cInfo.finished == 0 ? n.tip_last : n.tip_end)) : location.href = "/comic/" + cInfo.bid + "/" + cInfo.nextId + ".html" : cInfo.prevId == 0 ? i.hide(n.tip_first, 2e3) : location.href = "/comic/" + cInfo.bid + "/" + cInfo.prevId + ".html"
        }, 2e3)
    }

    var n = {
        url: "/tools/chapter.ashx",
        timeout: 1e4,
        tip_ready_next: "本章节已阅览完毕，是否进入下一章节？",
        tip_next: "正在进入下一章节，请稍候....",
        tip_ready_prev: "这是本章节的第一页，是否进入上一章节？",
        tip_prev: "正在返回上一章节，请稍候....",
        tip_last: "这是本作品最新一章，敬请关注下次更新。",
        tip_end: "漫画已完结，这是本作品最后一章了。",
        tip_first: "这是本作品第一章，没有上一章哦。",
        tip_failed: "抱歉，章节获取失败，请稍后重试。"
    }, t, i = function () {
        var n = !1;
        return {
            append: function () {
                n = !0;
                var t = '<div id="smh-msg-box" class="smh-msg-box"><div id="smh-msg-cont" class="smh-msg-cont"><\/div><\/div>';
                sys.ie6 && (t = '<div id="smh-msg-box" class="smh-msg-box"><iframe frameborder="0" class="smh-msg-iframe"><\/iframe><div id="smh-msg-cont" class="smh-msg-cont"><\/div><\/div>');
                $("body").append(t)
            },
            show: function (t) {
                n === !1 && (this.append(),
                    $("#smh-msg-box").show().center());
                $("#smh-msg-box").show();
                $("#smh-msg-cont").html("<span>" + t + "<\/span>" + t)
            },
            hide: function (n, t) {
                n = n || "";
                t = t || 0;
                n != "" && $("#smh-msg-cont").html("<span>" + n + "<\/span>" + n);
                t > 0 ? setTimeout(function () {
                    $("#smh-msg-box").fadeOut()
                }, t) : $("#smh-msg-box").fadeOut()
            },
            alert: function (n) {
                $.pb({
                    title: "提示",
                    width: 580,
                    height: 100,
                    content: '<div class="tip-alert"><i><\/i>' + n + '<br /><a href="/comic/' + cInfo.bid + '/">返回目录<\/a><\/div>',
                    foot: !1
                })
            }
        }
    }();
    return {
        next: function () {
            r(1)
        },
        prev: function () {
            r(0)
        },
        confirm: function (t) {
            var i = this;
            $.pb({
                title: "提示",
                width: 580,
                height: 100,
                content: '<div class="tip-alert"><i><\/i>' + (t === 1 ? n.tip_ready_next : n.tip_ready_prev) + '<br /><a href="/comic/' + cInfo.bid + '/">返回目录<\/a><\/div>',
                foot: !0,
                oBtnText: "是的。我知道了，直接进入" + (t === 1 ? "下" : "上") + "一章节。",
                cBtn: !1,
                onOk: function () {
                    r(t)
                }
            })
        }
    }
}();
SMH.nextC = function () {
    return SMH.chapter.next(),
        !1
}
;
SMH.prevC = function () {
    return SMH.chapter.prev(),
        !1
}
;
SMH.support = function () {
}
;
SMH.shortcuts = function () {
    function u() {
        if (n == 0) {
            var t = [];
            return t.push('<div class="tip-shortcuts" id="tip-shortcuts">'),
                t.push('<div id="tip-close"><a title="关闭" href="javascript:void(0);">关闭<\/a><\/div>'),
                t.push("<i><i><\/i><\/i>"),
                t.push('<div class="shadow tip-cont"><ol>'),
                t.push(pVars.shortcuts.tip()),
                t.push("<\/ol>"),
                t.push("<\/div>"),
                t.push("<\/div>"),
                t.join("")
        }
        return ""
    }

    function i() {
        n == 0 && ($(".support-shortcuts").after(u()),
            $("#tip-close a").click(function () {
                $("#tip-shortcuts").hide();
                SMH.store.set("tip-again", 0);
                r()
            }),
            n = 1)
    }

    function r() {
        $("#shortcuts").hover(function () {
            i();
            $("#tip-shortcuts").show()
        }, function () {
            $("#tip-shortcuts").hide()
        })
    }

    var t = 0
        , n = 0;
    return {
        init: function () {
            var n = SMH.store.get("tip-again");
            t = n == null || n == undefined ? 1 : n;
            t == 1 ? (i(),
                $("#tip-shortcuts").show().delay(3e3).hide(500),
                SMH.store.set("tip-again", 0)) : r()
        }
    }
}();
SMH.qrcodes = function () {
    function t() {
        if (n == 0) {
            var i = location.href.replace(/(www|tw)\.ikanman\.com/, "m.ikanman.com").replace(/\_p([0-9]+)\.html/g, ".html") + "#p=" + pVars.page
                , t = [];
            return t.push('<div class="tip-shortcuts" id="tip-qr">'),
                t.push("<i><i><\/i><\/i>"),
                t.push('<div class="shadow tip-cont"><ol>'),
                t.push('<li><div style="float:left;"><strong>电脑版<\/strong><br><img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&qzone=6&data=' + encodeURIComponent(location.href) + '" /><\/div>'),
                t.push('<strong>手机版<\/strong><br><img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&qzone=6&data=' + encodeURIComponent(i) + '" /><\/li>'),
                t.push("<li>用手机扫描二维码<br />把本页扫到手机上继续阅读<\/li>"),
                t.push("<\/ol>"),
                t.push("<\/div>"),
                t.push("<\/div>"),
                t.join("")
        }
        return ""
    }

    function i() {
        n == 0 && ($("#tool-qr").after(t()),
            n = 1)
    }

    function r() {
        $("#qrcodes").hover(function () {
            i();
            $("#tip-qr").show()
        }, function () {
            $("#tip-qr").hide()
        })
    }

    var n = 0;
    return {
        init: function () {
            r()
        }
    }
}();
SMH.zoomtool = function () {
    function i() {
        if (n == 0) {
            var t = [];
            return t.push('<div class="tip-shortcuts" id="tip-zoom">'),
                t.push('<div id="tip-close1"><a title="关闭" href="javascript:void(0);">关闭<\/a><\/div>'),
                t.push("<i><i><\/i><\/i>"),
                t.push('<div class="shadow tip-cont"><ol>'),
                t.push('<li><label><input type="checkbox" ' + (SMH.store.get("autosize") ? "checked" : "") + "/> 自适应宽度<\/label><\/li>"),
                t.push('<li>缩放图片<\/li><li><div class="slider-cont"><input id="slider-zoom" type="slider" value="' + SMH.store.get("zoom") + '" /><\/div><\/li>'),
                t.push("<\/ol>"),
                t.push("<\/div>"),
                t.push("<\/div>"),
                t.join("")
        }
        return ""
    }

    function r() {
        n == 0 && ($("#tool-zoom").after(i()),
            $("#tip-close1 a").click(function (n) {
                n.stopPropagation();
                $("#tip-zoom").hide();
                t()
            }),
            u(),
            n = 1)
    }

    function t() {
        $("#zoomtool").click(function () {
            r();
            $("#tip-zoom").show()
        })
    }

    function u() {
        $("#tip-zoom").find('input[type="checkbox"]').change(function () {
            var n = !SMH.store.get("autosize");
            SMH.store.set("zoom", 0);
            SMH.store.set("autosize", n);
            location.reload(!1)
        });
        $("#slider-zoom").slider({
            from: -80,
            to: 80,
            step: 1,
            round: 0,
            limits: !1,
            scale: [-80, "|", -40, "|", 0, "|", 40, "|", 80],
            dimension: "&nbsp;%",
            onstatechange: function (n) {
                var i = $("#tip-zoom").find('input[type="checkbox"]'), t, r;
                SMH.store.get("autosize") && n != 0 && (i.attr("checked", !1),
                    SMH.store.remove("autosize"),
                    $("#mangaBox img,#mangaMoreBox img").each(function (n, t) {
                        $(t).css("width", "auto")
                    }));
                i.is(":checked") || (t = parseInt(n),
                Math.abs(t) < 100 && (SMH.store.set("zoom", t),
                    r = $(this),
                    $("#mangaBox img,#mangaMoreBox img").each(function (n, i) {
                        var r = parseInt($(i).attr("imgw"));
                        $(i).width(r + r * t / 100);
                        t == 0 ? ($("#tool-zoom").removeClass("sel"),
                            $("#tool-zoom").text("缩放")) : $("#tool-zoom").text((t > 0 ? "+" : "-") + $.formatNumber(Math.abs(t), {
                            format: "00"
                        })).removeClass().addClass("sel zoom" + (t > 0 ? "in" : "out"))
                    })))
            }
        })
    }

    var n = 0;
    return {
        init: function () {
            t()
        }
    }
}();
SMH.suggest = function (n) {
    function l() {
        if (i >= 0)
            window.location.href = $("#ret" + i).attr("rel");
        else {
            var n = $.trim($("#" + t.key).val());
            if (n == u || n == "")
                return $("#" + t.key).focus(),
                    window.alert("请输入要你要搜索的漫画"),
                    !1;
            window.location.href = "/s/" + n + ".html"
        }
    }

    function h() {
        $("#" + t.result).show()
    }

    function e() {
        $("#" + t.result).hide()
    }

    function y(n) {
        f[n] ? a(f[n], n) : $.ajax({
            type: "POST",
            url: t.url,
            data: "s=2&key=" + escape(n),
            dataType: "json",
            success: function (t) {
                a(t, n)
            }
        })
    }

    function a(n, u) {
        i = -1;
        $("#" + t.result).html("<ul>" + p(n, u) + "<\/ul>");
        n.length > 0 ? h() : e();
        r = $("#" + t.result + " li").length;
        f[u] = n;
        f.length > 10 && f.pop();
        $("#" + t.result + " li").mouseover(function () {
            $("#" + t.result + " li").removeClass("selected");
            $(this).addClass("selected")
        })
    }

    function p(n, t) {
        var r = [], u, i;
        for (u in n)
            i = n[u],
                r.push('<li id="ret' + u + '" rel="' + i.u + '" title="' + i.t + '" onclick="location.href=\'' + i.u + "'\">"),
                r.push(i.s == "1" ? "<em>已完结<\/em>" : "<span>" + i.ct + "<\/span>"),
                r.push('<a href="' + i.u + '">' + i.t.replace(new RegExp("(" + t + ")", "gi"), "<strong>$1<\/strong>") + "<\/a> <i>[" + i.a.replace(new RegExp("(" + t + ")", "gi"), "<strong>$1<\/strong>") + "]<\/i>"),
                r.push("<\/li>");
        return r.join("")
    }

    function v() {
        o && clearTimeout(o);
        o = window.setTimeout(function () {
            var n = $.trim($("#" + t.key).val());
            s != n && (s = n,
                n != "" ? y(n) : (i = -1,
                    r = 0,
                    e(),
                    $("#" + t.result).html("")))
        }, t.delay)
    }

    function c() {
        if (i < -1 ? i = r - 1 : i >= r && (i = -1),
            $("#" + t.result + " li").removeClass("selected"),
        i == -1)
            $("#" + t.key).val(s);
        else {
            var n = $("#ret" + i);
            $(n).addClass("selected");
            $("#" + t.key).val($(n).attr("title"))
        }
    }

    var t = {
        url: "/tools/word.ashx",
        key: "txtKey",
        result: "suggest",
        button: "btnSend",
        delay: 200
    }
        , u = "请输入漫画或作者名称或拼音";
    $.extend(t, n || {});
    var i = -1, r = 0, o, s, f = [];
    return $("#" + t.key).val(u).css("color", "#ccc"),
        function () {
            $("#" + t.key).val(u).focus(function () {
                $(this).val() == u && $(this).val("").css("color", "#333")
            }).blur(function () {
                $(this).val() == "" && $(this).val(u).css("color", "#ccc")
            });
            $("#" + t.key).keyup(function (n) {
                if (n.stopPropagation(),
                n.keyCode == 13)
                    l();
                else {
                    var u = document.getElementById(t.result).style.display != "none";
                    if (u)
                        switch (n.keyCode) {
                            case 27:
                                i != -1 ? (i = -1,
                                    c()) : e();
                                break;
                            case 38:
                                i--;
                                c();
                                break;
                            case 40:
                                i++;
                                c();
                                break;
                            default:
                                v()
                        }
                    else
                        switch (n.keyCode) {
                            case 38:
                            case 40:
                                r > 0 && h();
                                break;
                            default:
                                v()
                        }
                }
            });
            $("#" + t.key).blur(function () {
                setTimeout(function () {
                    e()
                }, 300)
            });
            $("#" + t.key).focus(function () {
                r > 0 && h()
            });
            $("#" + t.button).click(function () {
                l()
            })
        }()
}
;
SMH.history = function () {
    function t(n) {
        var i = n * 1e3
            , r = new Date(i)
            , o = new Date
            , s = Date.parse(o.toDateString())
            , e = o.getTime()
            , h = 36e5
            , u = 0
            , f = function (n) {
            return n < 10 ? "0" + n : n
        }
            , t = [];
        if (s > i) {
            u = Math.ceil((s - i) / 864e5);
            switch (u) {
                case 1:
                    t.push("昨天 ");
                    break;
                case 2:
                    t.push("前天 ");
                    break;
                default:
                    t.push(f(r.getMonth() + 1), "月", f(r.getDate()), "日")
            }
            t.push(f(r.getHours()) + ":" + f(r.getMinutes()))
        } else
            e - i < 6e4 ? (u = Math.ceil((e - i) / 1e3),
                t.push(u, "秒前")) : (u = Math.ceil((e - i) / h),
                u == 1 ? t.push(Math.floor((e - i) % h / 6e4), "分钟前") : t.push("今天 ", f(r.getHours()), ":", f(r.getMinutes())));
        return t.join("")
    }

    var n = {
        maxLen: 50,
        len: 0,
        cname: "viewed",
        cvalue: [],
        got: !1,
        init: !1
    };
    return {
        get: function () {
            if (n.got === !1) {
                var t = SMH.store.get(n.cname);
                t && $.each(t, function () {
                    n.cvalue.push(this);
                    n.len++
                });
                n.got = !0
            }
        },
        add: function (t) {
            this.get();
            t != null && typeof t != "undefined" && ($.each(n.cvalue, function (i) {
                if (this.bid == t.bid)
                    return n.cvalue.splice(i, 1),
                        n.len--,
                        !1
            }),
                n.cvalue.push(t),
                n.len++,
            n.len > n.maxLen && (n.cvalue.splice(0, n.len - n.maxLen + 1),
                n.len = n.maxLen));
            n.cvalue.length > 0 && SMH.store.set(n.cname, n.cvalue)
        },
        remove: function (t, i) {
            if (n.cvalue.splice(t, 1),
                n.len--,
                n.len <= 0 ? SMH.store.remove(n.cname) : SMH.store.set(n.cname, n.cvalue),
                $(i).parent().hide(200),
            n.len <= 0) {
                $("#hList").html('<div class="hNone">暂时没有观看记录!<\/div>');
                return
            }
            n.len <= 5 && $(".hList").removeClass("hListMax")
        },
        clear: function () {
            SMH.store.set(n.cname, "");
            n.len = 0;
            n.cvalue = [];
            $("#hList").html('<div class="hNone">暂时没有观看记录!<\/div>')
        },
        init: function () {
            var t = this;
            $("#history").hover(function () {
                $(this).addClass("more-hover");
                n.init == !1 && t.format()
            }, function () {
                $(this).removeClass("more-hover")
            })
        },
        format: function () {
            var i, u, r;
            this.get();
            n.init = !0;
            i = [];
            n.len > 0 && $.each(n.cvalue, function (r, u) {
                var f = [];
                f.push('<li><a class="hDelete fr" title="删除" rel="' + r + '"><span>删除<\/span><\/a>');
                f.push('<a class="book" href="/comic/' + u.bid + '/">' + u.bn + '<\/a> <em>/<\/em> <a href="/comic/' + u.bid + "/" + u.cid + '.html" class="red">' + u.cn + "<\/a>");
                f.push('<div><span class="fr" style="line-height:1.6em;"><a href="/comic/' + u.bid + "/" + u.cid + ".html" + (u.p == 1 ? "" : "#p=" + u.p) + '">继续观看<\/a><\/span>');
                r == n.cvalue.length - 1 ? f.push('<span class="hTime">正在浏览观看……<\/span>') : f.push('<span class="hTime">上次于 ' + t(u.t) + " 观看<\/span>");
                f.push("<\/div><\/li>");
                i.push(f.join(""))
            });
            u = this;
            r = n.len;
            r == 0 ? $("#hList").html('<div class="hNone">暂时没有观看记录!<\/div>') : ($("#hList").html('<div class="hList"><ul>' + i.reverse().join("") + "<\/ul><\/div>"),
                $(".hList li").hover(function () {
                    $(this).addClass("hHover")
                }, function () {
                    $(this).removeClass("hHover")
                }),
                $("#hList .hDelete").click(function () {
                    u.remove($(this).attr("rel"), this)
                }),
            r > 6 && $(".hList").addClass("hListMax"))
        }
    }
}();
SMH.rotate = function () {
    function i() {
        t % 360 > 0 ? ($("#tool-rotate").addClass("sel"),
            $("#tool-rotate").text(t % 360)) : ($("#tool-rotate").removeClass("sel"),
            $("#tool-rotate").text("旋转"))
    }

    function r() {
        if ($(n).width() > $(n).height() && t / 90 % 2 == 1) {
            var i = ($(n).width() - $(n).height()) / 2 + "px";
            $(n).css("padding", i + " 0px")
        } else
            $(n).css("padding", "")
    }

    var t = 0
        , n = '[data-tag="mangaFile"]';
    return {
        init: function () {
            t = 0;
            i()
        },
        render: function () {
            $(n).rotate(t);
            r()
        },
        change: function () {
            t += 90;
            $(n).rotate({
                animateTo: t
            });
            i();
            r()
        }
    }
}();
SMH.lighter = {
    init: function () {
        var t = this
            , n = pVars.lighter.config[pVars.lighter.cvalue];
        $("#lighter").text(n[0]).attr("class", n[1]);
        $("#lighter").click(function () {
            t.change()
        })
    },
    change: function () {
        SMH.store.set(pVars.lighter.cname, pVars.lighter.cvalue == 0 ? 1 : 0);
        location.reload()
    }
},
    function () {
        $("#qrcode").hover(function () {
            $(this).addClass("more-hover")
        }, function () {
            $(this).removeClass("more-hover")
        })
    }(document);
document.oncontextmenu = function () {
    return !1
}
;
document.onmousedown = function (n) {
    return n = n || window.event,
        n.button == 2 ? !1 : void 0
}
;
window.onerror = function () {
    return !0
}
;
$(function () {
    $(".nav-sec").html('<ul><li><a href="/list/japan/">日本<\/a><\/li><li><a href="/list/hongkong/">港台<\/a><\/li><li><a href="/list/other/">其它<\/a><\/li><li><a href="/list/europe/">欧美<\/a><\/li><li><a href="/list/china/">内地<\/a><\/li><li><a href="/list/korea/">韩国<\/a><\/li><li><a href="/list/rexue/">热血<\/a><\/li><li><a href="/list/maoxian/">冒险<\/a><\/li><li><a href="/list/mohuan/">魔幻<\/a><\/li><li><a href="/list/shengui/">神鬼<\/a><\/li><li><a href="/list/gaoxiao/">搞笑<\/a><\/li><li><a href="/list/mengxi/">萌系<\/a><\/li><li><a href="/list/aiqing/">爱情<\/a><\/li><li><a href="/list/kehuan/">科幻<\/a><\/li><li><a href="/list/mofa/">魔法<\/a><\/li><li><a href="/list/gedou/">格斗<\/a><\/li><li><a href="/list/wuxia/">武侠<\/a><\/li><li><a href="/list/jizhan/">机战<\/a><\/li><li><a href="/list/zhanzheng/">战争<\/a><\/li><li><a href="/list/jingji/">竞技<\/a><\/li><li><a href="/list/tiyu/">体育<\/a><\/li><li><a href="/list/xiaoyuan/">校园<\/a><\/li><li><a href="/list/shenghuo/">生活<\/a><\/li><li><a href="/list/lizhi/">励志<\/a><\/li><li><a href="/list/lishi/">历史<\/a><\/li><li><a href="/list/weiniang/">伪娘<\/a><\/li><li><a href="/list/zhainan/">宅男<\/a><\/li><li><a href="/list/funv/">腐女<\/a><\/li><li><a href="/list/danmei/">耽美<\/a><\/li><li><a href="/list/baihe/">百合<\/a><\/li><li><a href="/list/hougong/">后宫<\/a><\/li><li><a href="/list/zhiyu/">治愈<\/a><\/li><li><a href="/list/meishi/">美食<\/a><\/li><li><a href="/list/tuili/">推理<\/a><\/li><li><a href="/list/xuanyi/">悬疑<\/a><\/li><li><a href="/list/kongbu/">恐怖<\/a><\/li><li><a href="/list/sige/">四格<\/a><\/li><li><a href="/list/zhichang/">职场<\/a><\/li><li><a href="/list/zhentan/">侦探<\/a><\/li><li><a href="/list/shehui/">社会<\/a><\/li><li><a href="/list/yinyue/">音乐<\/a><\/li><li><a href="/list/wudao/">舞蹈<\/a><\/li><li><a href="/list/zazhi/">杂志<\/a><\/li><li><a href="/list/heidao/">黑道<\/a><\/li><li><a href="/list/shaonv/">少女<\/a><\/li><li><a href="/list/shaonian/">少年<\/a><\/li><li><a href="/list/qingnian/">青年<\/a><\/li><li><a href="/list/ertong/">儿童<\/a><\/li><li><a href="/list/tongyong/">通用<\/a><\/li><\/ul>');
    SMH.store.get("lc_cid") != cInfo.cid && pVars.page == 1 && ($.get("/tools/count.ashx", {
        bookId: cInfo.bid,
        chapterId: cInfo.cid
    }),
        SMH.store.set("lc_cid", cInfo.cid)),
        function () {
            var n = n || function () {
                var t = new Date
                    , n = [];
                return n.push(t.getFullYear()),
                    n.push(t.getMonth() + 1),
                    n.push(t.getDate()),
                    n.push(t.getHours()),
                    n.join("")
            }()
                , t = !1
                , i = function () {
                var i = SMH.utils.pageTop() + 30;
                $(".book-scores").length > 0 && $(".book-scores").offset().top <= i && t == !1 && ($.get("/support/recent_score.html", {
                    ts: n
                }, function (n) {
                    $(".book-scores .loading").replaceWith(n)
                }),
                    t = !0)
            };
            i();
            $(window).bind("scroll resize", SMH.utils.throttle(i, 200))
        }()
});

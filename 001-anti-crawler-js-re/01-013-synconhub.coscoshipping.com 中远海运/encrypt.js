const window = {};
const navigator = {
    appName: "Netscape"
};
window.navigator = navigator;

!function (t) {
    "use strict";
    var e = "0123456789abcdefghijklmnopqrstuvwxyz";

    function n(t) {
        return e.charAt(t)
    }

    function r(t, e) {
        return t & e
    }

    function i(t, e) {
        return t | e
    }

    function o(t, e) {
        return t ^ e
    }

    function a(t, e) {
        return t & ~e
    }

    function s(t) {
        if (0 == t)
            return -1;
        var e = 0;
        return 0 == (65535 & t) && (t >>= 16,
            e += 16),
        0 == (255 & t) && (t >>= 8,
            e += 8),
        0 == (15 & t) && (t >>= 4,
            e += 4),
        0 == (3 & t) && (t >>= 2,
            e += 2),
        0 == (1 & t) && ++e,
            e
    }

    function u(t) {
        for (var e = 0; 0 != t;)
            t &= t - 1,
                ++e;
        return e
    }

    var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        , f = "=";

    function l(t) {
        var e, n, r = "";
        for (e = 0; e + 3 <= t.length; e += 3)
            n = parseInt(t.substring(e, e + 3), 16),
                r += c.charAt(n >> 6) + c.charAt(63 & n);
        for (e + 1 == t.length ? (n = parseInt(t.substring(e, e + 1), 16),
            r += c.charAt(n << 2)) : e + 2 == t.length && (n = parseInt(t.substring(e, e + 2), 16),
            r += c.charAt(n >> 2) + c.charAt((3 & n) << 4)); (3 & r.length) > 0;)
            r += f;
        return r
    }

    function h(t) {
        var e, r = "", i = 0, o = 0;
        for (e = 0; e < t.length && t.charAt(e) != f; ++e) {
            var a = c.indexOf(t.charAt(e));
            a < 0 || (0 == i ? (r += n(a >> 2),
                o = 3 & a,
                i = 1) : 1 == i ? (r += n(o << 2 | a >> 4),
                o = 15 & a,
                i = 2) : 2 == i ? (r += n(o),
                r += n(a >> 2),
                o = 3 & a,
                i = 3) : (r += n(o << 2 | a >> 4),
                r += n(15 & a),
                i = 0))
        }
        return 1 == i && (r += n(o << 2)),
            r
    }

    var p, d, v = function (t, e) {
            return (v = Object.setPrototypeOf || {
                        __proto__: []
                    } instanceof Array && function (t, e) {
                        t.__proto__ = e
                    }
                    || function (t, e) {
                        for (var n in e)
                            e.hasOwnProperty(n) && (t[n] = e[n])
                    }
            )(t, e)
        }, y = {
            decode: function (t) {
                var e;
                if (void 0 === p) {
                    var n = "0123456789ABCDEF"
                        , r = " \f\n\r\t \u2028\u2029";
                    for (p = {},
                             e = 0; e < 16; ++e)
                        p[n.charAt(e)] = e;
                    for (n = n.toLowerCase(),
                             e = 10; e < 16; ++e)
                        p[n.charAt(e)] = e;
                    for (e = 0; e < r.length; ++e)
                        p[r.charAt(e)] = -1
                }
                var i = []
                    , o = 0
                    , a = 0;
                for (e = 0; e < t.length; ++e) {
                    var s = t.charAt(e);
                    if ("=" == s)
                        break;
                    if (-1 != (s = p[s])) {
                        if (void 0 === s)
                            throw new Error("Illegal character at offset " + e);
                        o |= s,
                            ++a >= 2 ? (i[i.length] = o,
                                o = 0,
                                a = 0) : o <<= 4
                    }
                }
                if (a)
                    throw new Error("Hex encoding incomplete: 4 bits missing");
                return i
            }
        }, m = {
            decode: function (t) {
                var e;
                if (void 0 === d) {
                    var n = "= \f\n\r\t \u2028\u2029";
                    for (d = Object.create(null),
                             e = 0; e < 64; ++e)
                        d["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e)] = e;
                    for (e = 0; e < n.length; ++e)
                        d[n.charAt(e)] = -1
                }
                var r = []
                    , i = 0
                    , o = 0;
                for (e = 0; e < t.length; ++e) {
                    var a = t.charAt(e);
                    if ("=" == a)
                        break;
                    if (-1 != (a = d[a])) {
                        if (void 0 === a)
                            throw new Error("Illegal character at offset " + e);
                        i |= a,
                            ++o >= 4 ? (r[r.length] = i >> 16,
                                r[r.length] = i >> 8 & 255,
                                r[r.length] = 255 & i,
                                i = 0,
                                o = 0) : i <<= 6
                    }
                }
                switch (o) {
                    case 1:
                        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
                    case 2:
                        r[r.length] = i >> 10;
                        break;
                    case 3:
                        r[r.length] = i >> 16,
                            r[r.length] = i >> 8 & 255
                }
                return r
            },
            re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            unarmor: function (t) {
                var e = m.re.exec(t);
                if (e)
                    if (e[1])
                        t = e[1];
                    else {
                        if (!e[2])
                            throw new Error("RegExp out of sync");
                        t = e[2]
                    }
                return m.decode(t)
            }
        }, g = function () {
            function t(t) {
                this.buf = [+t || 0]
            }

            return t.prototype.mulAdd = function (t, e) {
                var n, r, i = this.buf, o = i.length;
                for (n = 0; n < o; ++n)
                    (r = i[n] * t + e) < 1e13 ? e = 0 : r -= 1e13 * (e = 0 | r / 1e13),
                        i[n] = r;
                e > 0 && (i[n] = e)
            }
                ,
                t.prototype.sub = function (t) {
                    var e, n, r = this.buf, i = r.length;
                    for (e = 0; e < i; ++e)
                        (n = r[e] - t) < 0 ? (n += 1e13,
                            t = 1) : t = 0,
                            r[e] = n;
                    for (; 0 === r[r.length - 1];)
                        r.pop()
                }
                ,
                t.prototype.toString = function (t) {
                    if (10 != (t || 10))
                        throw new Error("only base 10 is supported");
                    for (var e = this.buf, n = e[e.length - 1].toString(), r = e.length - 2; r >= 0; --r)
                        n += (1e13 + e[r]).toString().substring(1);
                    return n
                }
                ,
                t.prototype.valueOf = function () {
                    for (var t = this.buf, e = 0, n = t.length - 1; n >= 0; --n)
                        e = 1e13 * e + t[n];
                    return e
                }
                ,
                t.prototype.simplify = function () {
                    var t = this.buf;
                    return 1 == t.length ? t[0] : this
                }
                ,
                t
        }(), _ = "…",
        b = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
        w = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;

    function x(t, e) {
        return t.length > e && (t = t.substring(0, e) + _),
            t
    }

    var S, O = function () {
            function t(e, n) {
                this.hexDigits = "0123456789ABCDEF",
                    e instanceof t ? (this.enc = e.enc,
                        this.pos = e.pos) : (this.enc = e,
                        this.pos = n)
            }

            return t.prototype.get = function (t) {
                if (void 0 === t && (t = this.pos++),
                t >= this.enc.length)
                    throw new Error("Requesting byte offset " + t + " on a stream of length " + this.enc.length);
                return "string" == typeof this.enc ? this.enc.charCodeAt(t) : this.enc[t]
            }
                ,
                t.prototype.hexByte = function (t) {
                    return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(15 & t)
                }
                ,
                t.prototype.hexDump = function (t, e, n) {
                    for (var r = "", i = t; i < e; ++i)
                        if (r += this.hexByte(this.get(i)),
                        !0 !== n)
                            switch (15 & i) {
                                case 7:
                                    r += "  ";
                                    break;
                                case 15:
                                    r += "\n";
                                    break;
                                default:
                                    r += " "
                            }
                    return r
                }
                ,
                t.prototype.isASCII = function (t, e) {
                    for (var n = t; n < e; ++n) {
                        var r = this.get(n);
                        if (r < 32 || r > 176)
                            return !1
                    }
                    return !0
                }
                ,
                t.prototype.parseStringISO = function (t, e) {
                    for (var n = "", r = t; r < e; ++r)
                        n += String.fromCharCode(this.get(r));
                    return n
                }
                ,
                t.prototype.parseStringUTF = function (t, e) {
                    for (var n = "", r = t; r < e;) {
                        var i = this.get(r++);
                        n += i < 128 ? String.fromCharCode(i) : i > 191 && i < 224 ? String.fromCharCode((31 & i) << 6 | 63 & this.get(r++)) : String.fromCharCode((15 & i) << 12 | (63 & this.get(r++)) << 6 | 63 & this.get(r++))
                    }
                    return n
                }
                ,
                t.prototype.parseStringBMP = function (t, e) {
                    for (var n, r, i = "", o = t; o < e;)
                        n = this.get(o++),
                            r = this.get(o++),
                            i += String.fromCharCode(n << 8 | r);
                    return i
                }
                ,
                t.prototype.parseTime = function (t, e, n) {
                    var r = this.parseStringISO(t, e)
                        , i = (n ? b : w).exec(r);
                    return i ? (n && (i[1] = +i[1],
                        i[1] += +i[1] < 70 ? 2e3 : 1900),
                        r = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                    i[5] && (r += ":" + i[5],
                    i[6] && (r += ":" + i[6],
                    i[7] && (r += "." + i[7]))),
                    i[8] && (r += " UTC",
                    "Z" != i[8] && (r += i[8],
                    i[9] && (r += ":" + i[9]))),
                        r) : "Unrecognized time: " + r
                }
                ,
                t.prototype.parseInteger = function (t, e) {
                    for (var n, r = this.get(t), i = r > 127, o = i ? 255 : 0, a = ""; r == o && ++t < e;)
                        r = this.get(t);
                    if (0 == (n = e - t))
                        return i ? -1 : 0;
                    if (n > 4) {
                        for (a = r,
                                 n <<= 3; 0 == (128 & (+a ^ o));)
                            a = +a << 1,
                                --n;
                        a = "(" + n + " bit)\n"
                    }
                    i && (r -= 256);
                    for (var s = new g(r), u = t + 1; u < e; ++u)
                        s.mulAdd(256, this.get(u));
                    return a + s.toString()
                }
                ,
                t.prototype.parseBitString = function (t, e, n) {
                    for (var r = this.get(t), i = (e - t - 1 << 3) - r, o = "(" + i + " bit)\n", a = "", s = t + 1; s < e; ++s) {
                        for (var u = this.get(s), c = s == e - 1 ? r : 0, f = 7; f >= c; --f)
                            a += u >> f & 1 ? "1" : "0";
                        if (a.length > n)
                            return o + x(a, n)
                    }
                    return o + a
                }
                ,
                t.prototype.parseOctetString = function (t, e, n) {
                    if (this.isASCII(t, e))
                        return x(this.parseStringISO(t, e), n);
                    var r = e - t
                        , i = "(" + r + " byte)\n";
                    r > (n /= 2) && (e = t + n);
                    for (var o = t; o < e; ++o)
                        i += this.hexByte(this.get(o));
                    return r > n && (i += _),
                        i
                }
                ,
                t.prototype.parseOID = function (t, e, n) {
                    for (var r = "", i = new g, o = 0, a = t; a < e; ++a) {
                        var s = this.get(a);
                        if (i.mulAdd(128, 127 & s),
                            o += 7,
                            !(128 & s)) {
                            if ("" === r)
                                if ((i = i.simplify()) instanceof g)
                                    i.sub(80),
                                        r = "2." + i.toString();
                                else {
                                    var u = i < 80 ? i < 40 ? 0 : 1 : 2;
                                    r = u + "." + (i - 40 * u)
                                }
                            else
                                r += "." + i.toString();
                            if (r.length > n)
                                return x(r, n);
                            i = new g,
                                o = 0
                        }
                    }
                    return o > 0 && (r += ".incomplete"),
                        r
                }
                ,
                t
        }(), E = function () {
            function t(t, e, n, r, i) {
                if (!(r instanceof T))
                    throw new Error("Invalid tag value.");
                this.stream = t,
                    this.header = e,
                    this.length = n,
                    this.tag = r,
                    this.sub = i
            }

            return t.prototype.typeName = function () {
                switch (this.tag.tagClass) {
                    case 0:
                        switch (this.tag.tagNumber) {
                            case 0:
                                return "EOC";
                            case 1:
                                return "BOOLEAN";
                            case 2:
                                return "INTEGER";
                            case 3:
                                return "BIT_STRING";
                            case 4:
                                return "OCTET_STRING";
                            case 5:
                                return "NULL";
                            case 6:
                                return "OBJECT_IDENTIFIER";
                            case 7:
                                return "ObjectDescriptor";
                            case 8:
                                return "EXTERNAL";
                            case 9:
                                return "REAL";
                            case 10:
                                return "ENUMERATED";
                            case 11:
                                return "EMBEDDED_PDV";
                            case 12:
                                return "UTF8String";
                            case 16:
                                return "SEQUENCE";
                            case 17:
                                return "SET";
                            case 18:
                                return "NumericString";
                            case 19:
                                return "PrintableString";
                            case 20:
                                return "TeletexString";
                            case 21:
                                return "VideotexString";
                            case 22:
                                return "IA5String";
                            case 23:
                                return "UTCTime";
                            case 24:
                                return "GeneralizedTime";
                            case 25:
                                return "GraphicString";
                            case 26:
                                return "VisibleString";
                            case 27:
                                return "GeneralString";
                            case 28:
                                return "UniversalString";
                            case 30:
                                return "BMPString"
                        }
                        return "Universal_" + this.tag.tagNumber.toString();
                    case 1:
                        return "Application_" + this.tag.tagNumber.toString();
                    case 2:
                        return "[" + this.tag.tagNumber.toString() + "]";
                    case 3:
                        return "Private_" + this.tag.tagNumber.toString()
                }
            }
                ,
                t.prototype.content = function (t) {
                    if (void 0 === this.tag)
                        return null;
                    void 0 === t && (t = 1 / 0);
                    var e = this.posContent()
                        , n = Math.abs(this.length);
                    if (!this.tag.isUniversal())
                        return null !== this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                    switch (this.tag.tagNumber) {
                        case 1:
                            return 0 === this.stream.get(e) ? "false" : "true";
                        case 2:
                            return this.stream.parseInteger(e, e + n);
                        case 3:
                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + n, t);
                        case 4:
                            return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + n, t);
                        case 6:
                            return this.stream.parseOID(e, e + n, t);
                        case 16:
                        case 17:
                            return null !== this.sub ? "(" + this.sub.length + " elem)" : "(no elem)";
                        case 12:
                            return x(this.stream.parseStringUTF(e, e + n), t);
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 26:
                            return x(this.stream.parseStringISO(e, e + n), t);
                        case 30:
                            return x(this.stream.parseStringBMP(e, e + n), t);
                        case 23:
                        case 24:
                            return this.stream.parseTime(e, e + n, 23 == this.tag.tagNumber)
                    }
                    return null
                }
                ,
                t.prototype.toString = function () {
                    return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
                }
                ,
                t.prototype.toPrettyString = function (t) {
                    void 0 === t && (t = "");
                    var e = t + this.typeName() + " @" + this.stream.pos;
                    if (this.length >= 0 && (e += "+"),
                        e += this.length,
                        this.tag.tagConstructed ? e += " (constructed)" : !this.tag.isUniversal() || 3 != this.tag.tagNumber && 4 != this.tag.tagNumber || null === this.sub || (e += " (encapsulates)"),
                        e += "\n",
                    null !== this.sub) {
                        t += "  ";
                        for (var n = 0, r = this.sub.length; n < r; ++n)
                            e += this.sub[n].toPrettyString(t)
                    }
                    return e
                }
                ,
                t.prototype.posStart = function () {
                    return this.stream.pos
                }
                ,
                t.prototype.posContent = function () {
                    return this.stream.pos + this.header
                }
                ,
                t.prototype.posEnd = function () {
                    return this.stream.pos + this.header + Math.abs(this.length)
                }
                ,
                t.prototype.toHexString = function () {
                    return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
                }
                ,
                t.decodeLength = function (t) {
                    var e = t.get()
                        , n = 127 & e;
                    if (n == e)
                        return n;
                    if (n > 6)
                        throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
                    if (0 === n)
                        return null;
                    e = 0;
                    for (var r = 0; r < n; ++r)
                        e = 256 * e + t.get();
                    return e
                }
                ,
                t.prototype.getHexStringValue = function () {
                    var t = this.toHexString()
                        , e = 2 * this.header
                        , n = 2 * this.length;
                    return t.substr(e, n)
                }
                ,
                t.decode = function (e) {
                    var n;
                    n = e instanceof O ? e : new O(e, 0);
                    var r = new O(n)
                        , i = new T(n)
                        , o = t.decodeLength(n)
                        , a = n.pos
                        , s = a - r.pos
                        , u = null
                        , c = function () {
                        var e = [];
                        if (null !== o) {
                            for (var r = a + o; n.pos < r;)
                                e[e.length] = t.decode(n);
                            if (n.pos != r)
                                throw new Error("Content size is not correct for container starting at offset " + a)
                        } else
                            try {
                                for (; ;) {
                                    var i = t.decode(n);
                                    if (i.tag.isEOC())
                                        break;
                                    e[e.length] = i
                                }
                                o = a - n.pos
                            } catch (t) {
                                throw new Error("Exception while decoding undefined length content: " + t)
                            }
                        return e
                    };
                    if (i.tagConstructed)
                        u = c();
                    else if (i.isUniversal() && (3 == i.tagNumber || 4 == i.tagNumber))
                        try {
                            if (3 == i.tagNumber && 0 != n.get())
                                throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
                            u = c();
                            for (var f = 0; f < u.length; ++f)
                                if (u[f].tag.isEOC())
                                    throw new Error("EOC is not supposed to be actual content.")
                        } catch (t) {
                            u = null
                        }
                    if (null === u) {
                        if (null === o)
                            throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
                        n.pos = a + Math.abs(o)
                    }
                    return new t(r, s, o, i, u)
                }
                ,
                t
        }(), T = function () {
            function t(t) {
                var e = t.get();
                if (this.tagClass = e >> 6,
                    this.tagConstructed = 0 != (32 & e),
                    this.tagNumber = 31 & e,
                31 == this.tagNumber) {
                    var n = new g;
                    do {
                        e = t.get(),
                            n.mulAdd(128, 127 & e)
                    } while (128 & e);
                    this.tagNumber = n.simplify()
                }
            }

            return t.prototype.isUniversal = function () {
                return 0 === this.tagClass
            }
                ,
                t.prototype.isEOC = function () {
                    return 0 === this.tagClass && 0 === this.tagNumber
                }
                ,
                t
        }(),
        M = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997],
        A = (1 << 26) / M[M.length - 1], k = function () {
            function t(t, e, n) {
                null != t && ("number" == typeof t ? this.fromNumber(t, e, n) : null == e && "string" != typeof t ? this.fromString(t, 256) : this.fromString(t, e))
            }

            return t.prototype.toString = function (t) {
                if (this.s < 0)
                    return "-" + this.negate().toString(t);
                var e;
                if (16 == t)
                    e = 4;
                else if (8 == t)
                    e = 3;
                else if (2 == t)
                    e = 1;
                else if (32 == t)
                    e = 5;
                else {
                    if (4 != t)
                        return this.toRadix(t);
                    e = 2
                }
                var r, i = (1 << e) - 1, o = !1, a = "", s = this.t, u = this.DB - s * this.DB % e;
                if (s-- > 0)
                    for (u < this.DB && (r = this[s] >> u) > 0 && (o = !0,
                        a = n(r)); s >= 0;)
                        u < e ? (r = (this[s] & (1 << u) - 1) << e - u,
                            r |= this[--s] >> (u += this.DB - e)) : (r = this[s] >> (u -= e) & i,
                        u <= 0 && (u += this.DB,
                            --s)),
                        r > 0 && (o = !0),
                        o && (a += n(r));
                return o ? a : "0"
            }
                ,
                t.prototype.negate = function () {
                    var e = C();
                    return t.ZERO.subTo(this, e),
                        e
                }
                ,
                t.prototype.abs = function () {
                    return this.s < 0 ? this.negate() : this
                }
                ,
                t.prototype.compareTo = function (t) {
                    var e = this.s - t.s;
                    if (0 != e)
                        return e;
                    var n = this.t;
                    if (0 != (e = n - t.t))
                        return this.s < 0 ? -e : e;
                    for (; --n >= 0;)
                        if (0 != (e = this[n] - t[n]))
                            return e;
                    return 0
                }
                ,
                t.prototype.bitLength = function () {
                    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + B(this[this.t - 1] ^ this.s & this.DM)
                }
                ,
                t.prototype.mod = function (e) {
                    var n = C();
                    return this.abs().divRemTo(e, null, n),
                    this.s < 0 && n.compareTo(t.ZERO) > 0 && e.subTo(n, n),
                        n
                }
                ,
                t.prototype.modPowInt = function (t, e) {
                    var n;
                    return n = t < 256 || e.isEven() ? new D(e) : new R(e),
                        this.exp(t, n)
                }
                ,
                t.prototype.clone = function () {
                    var t = C();
                    return this.copyTo(t),
                        t
                }
                ,
                t.prototype.intValue = function () {
                    if (this.s < 0) {
                        if (1 == this.t)
                            return this[0] - this.DV;
                        if (0 == this.t)
                            return -1
                    } else {
                        if (1 == this.t)
                            return this[0];
                        if (0 == this.t)
                            return 0
                    }
                    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
                }
                ,
                t.prototype.byteValue = function () {
                    return 0 == this.t ? this.s : this[0] << 24 >> 24
                }
                ,
                t.prototype.shortValue = function () {
                    return 0 == this.t ? this.s : this[0] << 16 >> 16
                }
                ,
                t.prototype.signum = function () {
                    return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
                }
                ,
                t.prototype.toByteArray = function () {
                    var t = this.t
                        , e = [];
                    e[0] = this.s;
                    var n, r = this.DB - t * this.DB % 8, i = 0;
                    if (t-- > 0)
                        for (r < this.DB && (n = this[t] >> r) != (this.s & this.DM) >> r && (e[i++] = n | this.s << this.DB - r); t >= 0;)
                            r < 8 ? (n = (this[t] & (1 << r) - 1) << 8 - r,
                                n |= this[--t] >> (r += this.DB - 8)) : (n = this[t] >> (r -= 8) & 255,
                            r <= 0 && (r += this.DB,
                                --t)),
                            0 != (128 & n) && (n |= -256),
                            0 == i && (128 & this.s) != (128 & n) && ++i,
                            (i > 0 || n != this.s) && (e[i++] = n);
                    return e
                }
                ,
                t.prototype.equals = function (t) {
                    return 0 == this.compareTo(t)
                }
                ,
                t.prototype.min = function (t) {
                    return this.compareTo(t) < 0 ? this : t
                }
                ,
                t.prototype.max = function (t) {
                    return this.compareTo(t) > 0 ? this : t
                }
                ,
                t.prototype.and = function (t) {
                    var e = C();
                    return this.bitwiseTo(t, r, e),
                        e
                }
                ,
                t.prototype.or = function (t) {
                    var e = C();
                    return this.bitwiseTo(t, i, e),
                        e
                }
                ,
                t.prototype.xor = function (t) {
                    var e = C();
                    return this.bitwiseTo(t, o, e),
                        e
                }
                ,
                t.prototype.andNot = function (t) {
                    var e = C();
                    return this.bitwiseTo(t, a, e),
                        e
                }
                ,
                t.prototype.not = function () {
                    for (var t = C(), e = 0; e < this.t; ++e)
                        t[e] = this.DM & ~this[e];
                    return t.t = this.t,
                        t.s = ~this.s,
                        t
                }
                ,
                t.prototype.shiftLeft = function (t) {
                    var e = C();
                    return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e),
                        e
                }
                ,
                t.prototype.shiftRight = function (t) {
                    var e = C();
                    return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e),
                        e
                }
                ,
                t.prototype.getLowestSetBit = function () {
                    for (var t = 0; t < this.t; ++t)
                        if (0 != this[t])
                            return t * this.DB + s(this[t]);
                    return this.s < 0 ? this.t * this.DB : -1
                }
                ,
                t.prototype.bitCount = function () {
                    for (var t = 0, e = this.s & this.DM, n = 0; n < this.t; ++n)
                        t += u(this[n] ^ e);
                    return t
                }
                ,
                t.prototype.testBit = function (t) {
                    var e = Math.floor(t / this.DB);
                    return e >= this.t ? 0 != this.s : 0 != (this[e] & 1 << t % this.DB)
                }
                ,
                t.prototype.setBit = function (t) {
                    return this.changeBit(t, i)
                }
                ,
                t.prototype.clearBit = function (t) {
                    return this.changeBit(t, a)
                }
                ,
                t.prototype.flipBit = function (t) {
                    return this.changeBit(t, o)
                }
                ,
                t.prototype.add = function (t) {
                    var e = C();
                    return this.addTo(t, e),
                        e
                }
                ,
                t.prototype.subtract = function (t) {
                    var e = C();
                    return this.subTo(t, e),
                        e
                }
                ,
                t.prototype.multiply = function (t) {
                    var e = C();
                    return this.multiplyTo(t, e),
                        e
                }
                ,
                t.prototype.divide = function (t) {
                    var e = C();
                    return this.divRemTo(t, e, null),
                        e
                }
                ,
                t.prototype.remainder = function (t) {
                    var e = C();
                    return this.divRemTo(t, null, e),
                        e
                }
                ,
                t.prototype.divideAndRemainder = function (t) {
                    var e = C()
                        , n = C();
                    return this.divRemTo(t, e, n),
                        [e, n]
                }
                ,
                t.prototype.modPow = function (t, e) {
                    var n, r, i = t.bitLength(), o = V(1);
                    if (i <= 0)
                        return o;
                    n = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6,
                        r = i < 8 ? new D(e) : e.isEven() ? new F(e) : new R(e);
                    var a = []
                        , s = 3
                        , u = n - 1
                        , c = (1 << n) - 1;
                    if (a[1] = r.convert(this),
                    n > 1) {
                        var f = C();
                        for (r.sqrTo(a[1], f); s <= c;)
                            a[s] = C(),
                                r.mulTo(f, a[s - 2], a[s]),
                                s += 2
                    }
                    var l, h, p = t.t - 1, d = !0, v = C();
                    for (i = B(t[p]) - 1; p >= 0;) {
                        for (i >= u ? l = t[p] >> i - u & c : (l = (t[p] & (1 << i + 1) - 1) << u - i,
                        p > 0 && (l |= t[p - 1] >> this.DB + i - u)),
                                 s = n; 0 == (1 & l);)
                            l >>= 1,
                                --s;
                        if ((i -= s) < 0 && (i += this.DB,
                            --p),
                            d)
                            a[l].copyTo(o),
                                d = !1;
                        else {
                            for (; s > 1;)
                                r.sqrTo(o, v),
                                    r.sqrTo(v, o),
                                    s -= 2;
                            s > 0 ? r.sqrTo(o, v) : (h = o,
                                o = v,
                                v = h),
                                r.mulTo(v, a[l], o)
                        }
                        for (; p >= 0 && 0 == (t[p] & 1 << i);)
                            r.sqrTo(o, v),
                                h = o,
                                o = v,
                                v = h,
                            --i < 0 && (i = this.DB - 1,
                                --p)
                    }
                    return r.revert(o)
                }
                ,
                t.prototype.modInverse = function (e) {
                    var n = e.isEven();
                    if (this.isEven() && n || 0 == e.signum())
                        return t.ZERO;
                    for (var r = e.clone(), i = this.clone(), o = V(1), a = V(0), s = V(0), u = V(1); 0 != r.signum();) {
                        for (; r.isEven();)
                            r.rShiftTo(1, r),
                                n ? (o.isEven() && a.isEven() || (o.addTo(this, o),
                                    a.subTo(e, a)),
                                    o.rShiftTo(1, o)) : a.isEven() || a.subTo(e, a),
                                a.rShiftTo(1, a);
                        for (; i.isEven();)
                            i.rShiftTo(1, i),
                                n ? (s.isEven() && u.isEven() || (s.addTo(this, s),
                                    u.subTo(e, u)),
                                    s.rShiftTo(1, s)) : u.isEven() || u.subTo(e, u),
                                u.rShiftTo(1, u);
                        r.compareTo(i) >= 0 ? (r.subTo(i, r),
                        n && o.subTo(s, o),
                            a.subTo(u, a)) : (i.subTo(r, i),
                        n && s.subTo(o, s),
                            u.subTo(a, u))
                    }
                    return 0 != i.compareTo(t.ONE) ? t.ZERO : u.compareTo(e) >= 0 ? u.subtract(e) : u.signum() < 0 ? (u.addTo(e, u),
                        u.signum() < 0 ? u.add(e) : u) : u
                }
                ,
                t.prototype.pow = function (t) {
                    return this.exp(t, new j)
                }
                ,
                t.prototype.gcd = function (t) {
                    var e = this.s < 0 ? this.negate() : this.clone()
                        , n = t.s < 0 ? t.negate() : t.clone();
                    if (e.compareTo(n) < 0) {
                        var r = e;
                        e = n,
                            n = r
                    }
                    var i = e.getLowestSetBit()
                        , o = n.getLowestSetBit();
                    if (o < 0)
                        return e;
                    for (i < o && (o = i),
                         o > 0 && (e.rShiftTo(o, e),
                             n.rShiftTo(o, n)); e.signum() > 0;)
                        (i = e.getLowestSetBit()) > 0 && e.rShiftTo(i, e),
                        (i = n.getLowestSetBit()) > 0 && n.rShiftTo(i, n),
                            e.compareTo(n) >= 0 ? (e.subTo(n, e),
                                e.rShiftTo(1, e)) : (n.subTo(e, n),
                                n.rShiftTo(1, n));
                    return o > 0 && n.lShiftTo(o, n),
                        n
                }
                ,
                t.prototype.isProbablePrime = function (t) {
                    var e, n = this.abs();
                    if (1 == n.t && n[0] <= M[M.length - 1]) {
                        for (e = 0; e < M.length; ++e)
                            if (n[0] == M[e])
                                return !0;
                        return !1
                    }
                    if (n.isEven())
                        return !1;
                    for (e = 1; e < M.length;) {
                        for (var r = M[e], i = e + 1; i < M.length && r < A;)
                            r *= M[i++];
                        for (r = n.modInt(r); e < i;)
                            if (r % M[e++] == 0)
                                return !1
                    }
                    return n.millerRabin(t)
                }
                ,
                t.prototype.copyTo = function (t) {
                    for (var e = this.t - 1; e >= 0; --e)
                        t[e] = this[e];
                    t.t = this.t,
                        t.s = this.s
                }
                ,
                t.prototype.fromInt = function (t) {
                    this.t = 1,
                        this.s = t < 0 ? -1 : 0,
                        t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0
                }
                ,
                t.prototype.fromString = function (e, n) {
                    var r;
                    if (16 == n)
                        r = 4;
                    else if (8 == n)
                        r = 3;
                    else if (256 == n)
                        r = 8;
                    else if (2 == n)
                        r = 1;
                    else if (32 == n)
                        r = 5;
                    else {
                        if (4 != n)
                            return void this.fromRadix(e, n);
                        r = 2
                    }
                    this.t = 0,
                        this.s = 0;
                    for (var i = e.length, o = !1, a = 0; --i >= 0;) {
                        var s = 8 == r ? 255 & +e[i] : I(e, i);
                        s < 0 ? "-" == e.charAt(i) && (o = !0) : (o = !1,
                            0 == a ? this[this.t++] = s : a + r > this.DB ? (this[this.t - 1] |= (s & (1 << this.DB - a) - 1) << a,
                                this[this.t++] = s >> this.DB - a) : this[this.t - 1] |= s << a,
                        (a += r) >= this.DB && (a -= this.DB))
                    }
                    8 == r && 0 != (128 & +e[0]) && (this.s = -1,
                    a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
                        this.clamp(),
                    o && t.ZERO.subTo(this, this)
                }
                ,
                t.prototype.clamp = function () {
                    for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t;)
                        --this.t
                }
                ,
                t.prototype.dlShiftTo = function (t, e) {
                    var n;
                    for (n = this.t - 1; n >= 0; --n)
                        e[n + t] = this[n];
                    for (n = t - 1; n >= 0; --n)
                        e[n] = 0;
                    e.t = this.t + t,
                        e.s = this.s
                }
                ,
                t.prototype.drShiftTo = function (t, e) {
                    for (var n = t; n < this.t; ++n)
                        e[n - t] = this[n];
                    e.t = Math.max(this.t - t, 0),
                        e.s = this.s
                }
                ,
                t.prototype.lShiftTo = function (t, e) {
                    for (var n = t % this.DB, r = this.DB - n, i = (1 << r) - 1, o = Math.floor(t / this.DB), a = this.s << n & this.DM, s = this.t - 1; s >= 0; --s)
                        e[s + o + 1] = this[s] >> r | a,
                            a = (this[s] & i) << n;
                    for (var s = o - 1; s >= 0; --s)
                        e[s] = 0;
                    e[o] = a,
                        e.t = this.t + o + 1,
                        e.s = this.s,
                        e.clamp()
                }
                ,
                t.prototype.rShiftTo = function (t, e) {
                    e.s = this.s;
                    var n = Math.floor(t / this.DB);
                    if (n >= this.t)
                        e.t = 0;
                    else {
                        var r = t % this.DB
                            , i = this.DB - r
                            , o = (1 << r) - 1;
                        e[0] = this[n] >> r;
                        for (var a = n + 1; a < this.t; ++a)
                            e[a - n - 1] |= (this[a] & o) << i,
                                e[a - n] = this[a] >> r;
                        r > 0 && (e[this.t - n - 1] |= (this.s & o) << i),
                            e.t = this.t - n,
                            e.clamp()
                    }
                }
                ,
                t.prototype.subTo = function (t, e) {
                    for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i;)
                        r += this[n] - t[n],
                            e[n++] = r & this.DM,
                            r >>= this.DB;
                    if (t.t < this.t) {
                        for (r -= t.s; n < this.t;)
                            r += this[n],
                                e[n++] = r & this.DM,
                                r >>= this.DB;
                        r += this.s
                    } else {
                        for (r += this.s; n < t.t;)
                            r -= t[n],
                                e[n++] = r & this.DM,
                                r >>= this.DB;
                        r -= t.s
                    }
                    e.s = r < 0 ? -1 : 0,
                        r < -1 ? e[n++] = this.DV + r : r > 0 && (e[n++] = r),
                        e.t = n,
                        e.clamp()
                }
                ,
                t.prototype.multiplyTo = function (e, n) {
                    var r = this.abs()
                        , i = e.abs()
                        , o = r.t;
                    for (n.t = o + i.t; --o >= 0;)
                        n[o] = 0;
                    for (o = 0; o < i.t; ++o)
                        n[o + r.t] = r.am(0, i[o], n, o, 0, r.t);
                    n.s = 0,
                        n.clamp(),
                    this.s != e.s && t.ZERO.subTo(n, n)
                }
                ,
                t.prototype.squareTo = function (t) {
                    for (var e = this.abs(), n = t.t = 2 * e.t; --n >= 0;)
                        t[n] = 0;
                    for (n = 0; n < e.t - 1; ++n) {
                        var r = e.am(n, e[n], t, 2 * n, 0, 1);
                        (t[n + e.t] += e.am(n + 1, 2 * e[n], t, 2 * n + 1, r, e.t - n - 1)) >= e.DV && (t[n + e.t] -= e.DV,
                            t[n + e.t + 1] = 1)
                    }
                    t.t > 0 && (t[t.t - 1] += e.am(n, e[n], t, 2 * n, 0, 1)),
                        t.s = 0,
                        t.clamp()
                }
                ,
                t.prototype.divRemTo = function (e, n, r) {
                    var i = e.abs();
                    if (!(i.t <= 0)) {
                        var o = this.abs();
                        if (o.t < i.t)
                            return null != n && n.fromInt(0),
                                void (null != r && this.copyTo(r));
                        null == r && (r = C());
                        var a = C()
                            , s = this.s
                            , u = e.s
                            , c = this.DB - B(i[i.t - 1]);
                        c > 0 ? (i.lShiftTo(c, a),
                            o.lShiftTo(c, r)) : (i.copyTo(a),
                            o.copyTo(r));
                        var f = a.t
                            , l = a[f - 1];
                        if (0 != l) {
                            var h = l * (1 << this.F1) + (f > 1 ? a[f - 2] >> this.F2 : 0)
                                , p = this.FV / h
                                , d = (1 << this.F1) / h
                                , v = 1 << this.F2
                                , y = r.t
                                , m = y - f
                                , g = null == n ? C() : n;
                            for (a.dlShiftTo(m, g),
                                 r.compareTo(g) >= 0 && (r[r.t++] = 1,
                                     r.subTo(g, r)),
                                     t.ONE.dlShiftTo(f, g),
                                     g.subTo(a, a); a.t < f;)
                                a[a.t++] = 0;
                            for (; --m >= 0;) {
                                var _ = r[--y] == l ? this.DM : Math.floor(r[y] * p + (r[y - 1] + v) * d);
                                if ((r[y] += a.am(0, _, r, m, 0, f)) < _)
                                    for (a.dlShiftTo(m, g),
                                             r.subTo(g, r); r[y] < --_;)
                                        r.subTo(g, r)
                            }
                            null != n && (r.drShiftTo(f, n),
                            s != u && t.ZERO.subTo(n, n)),
                                r.t = f,
                                r.clamp(),
                            c > 0 && r.rShiftTo(c, r),
                            s < 0 && t.ZERO.subTo(r, r)
                        }
                    }
                }
                ,
                t.prototype.invDigit = function () {
                    if (this.t < 1)
                        return 0;
                    var t = this[0];
                    if (0 == (1 & t))
                        return 0;
                    var e = 3 & t;
                    return (e = (e = (e = (e = e * (2 - (15 & t) * e) & 15) * (2 - (255 & t) * e) & 255) * (2 - ((65535 & t) * e & 65535)) & 65535) * (2 - t * e % this.DV) % this.DV) > 0 ? this.DV - e : -e
                }
                ,
                t.prototype.isEven = function () {
                    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
                }
                ,
                t.prototype.exp = function (e, n) {
                    if (e > 4294967295 || e < 1)
                        return t.ONE;
                    var r = C()
                        , i = C()
                        , o = n.convert(this)
                        , a = B(e) - 1;
                    for (o.copyTo(r); --a >= 0;)
                        if (n.sqrTo(r, i),
                        (e & 1 << a) > 0)
                            n.mulTo(i, o, r);
                        else {
                            var s = r;
                            r = i,
                                i = s
                        }
                    return n.revert(r)
                }
                ,
                t.prototype.chunkSize = function (t) {
                    return Math.floor(Math.LN2 * this.DB / Math.log(t))
                }
                ,
                t.prototype.toRadix = function (t) {
                    if (null == t && (t = 10),
                    0 == this.signum() || t < 2 || t > 36)
                        return "0";
                    var e = this.chunkSize(t)
                        , n = Math.pow(t, e)
                        , r = V(n)
                        , i = C()
                        , o = C()
                        , a = "";
                    for (this.divRemTo(r, i, o); i.signum() > 0;)
                        a = (n + o.intValue()).toString(t).substr(1) + a,
                            i.divRemTo(r, i, o);
                    return o.intValue().toString(t) + a
                }
                ,
                t.prototype.fromRadix = function (e, n) {
                    this.fromInt(0),
                    null == n && (n = 10);
                    for (var r = this.chunkSize(n), i = Math.pow(n, r), o = !1, a = 0, s = 0, u = 0; u < e.length; ++u) {
                        var c = I(e, u);
                        c < 0 ? "-" == e.charAt(u) && 0 == this.signum() && (o = !0) : (s = n * s + c,
                        ++a >= r && (this.dMultiply(i),
                            this.dAddOffset(s, 0),
                            a = 0,
                            s = 0))
                    }
                    a > 0 && (this.dMultiply(Math.pow(n, a)),
                        this.dAddOffset(s, 0)),
                    o && t.ZERO.subTo(this, this)
                }
                ,
                t.prototype.fromNumber = function (e, n, r) {
                    if ("number" == typeof n)
                        if (e < 2)
                            this.fromInt(1);
                        else
                            for (this.fromNumber(e, r),
                                 this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), i, this),
                                 this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n);)
                                this.dAddOffset(2, 0),
                                this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
                    else {
                        var o = []
                            , a = 7 & e;
                        o.length = 1 + (e >> 3),
                            n.nextBytes(o),
                            a > 0 ? o[0] &= (1 << a) - 1 : o[0] = 0,
                            this.fromString(o, 256)
                    }
                }
                ,
                t.prototype.bitwiseTo = function (t, e, n) {
                    var r, i, o = Math.min(t.t, this.t);
                    for (r = 0; r < o; ++r)
                        n[r] = e(this[r], t[r]);
                    if (t.t < this.t) {
                        for (i = t.s & this.DM,
                                 r = o; r < this.t; ++r)
                            n[r] = e(this[r], i);
                        n.t = this.t
                    } else {
                        for (i = this.s & this.DM,
                                 r = o; r < t.t; ++r)
                            n[r] = e(i, t[r]);
                        n.t = t.t
                    }
                    n.s = e(this.s, t.s),
                        n.clamp()
                }
                ,
                t.prototype.changeBit = function (e, n) {
                    var r = t.ONE.shiftLeft(e);
                    return this.bitwiseTo(r, n, r),
                        r
                }
                ,
                t.prototype.addTo = function (t, e) {
                    for (var n = 0, r = 0, i = Math.min(t.t, this.t); n < i;)
                        r += this[n] + t[n],
                            e[n++] = r & this.DM,
                            r >>= this.DB;
                    if (t.t < this.t) {
                        for (r += t.s; n < this.t;)
                            r += this[n],
                                e[n++] = r & this.DM,
                                r >>= this.DB;
                        r += this.s
                    } else {
                        for (r += this.s; n < t.t;)
                            r += t[n],
                                e[n++] = r & this.DM,
                                r >>= this.DB;
                        r += t.s
                    }
                    e.s = r < 0 ? -1 : 0,
                        r > 0 ? e[n++] = r : r < -1 && (e[n++] = this.DV + r),
                        e.t = n,
                        e.clamp()
                }
                ,
                t.prototype.dMultiply = function (t) {
                    this[this.t] = this.am(0, t - 1, this, 0, 0, this.t),
                        ++this.t,
                        this.clamp()
                }
                ,
                t.prototype.dAddOffset = function (t, e) {
                    if (0 != t) {
                        for (; this.t <= e;)
                            this[this.t++] = 0;
                        for (this[e] += t; this[e] >= this.DV;)
                            this[e] -= this.DV,
                            ++e >= this.t && (this[this.t++] = 0),
                                ++this[e]
                    }
                }
                ,
                t.prototype.multiplyLowerTo = function (t, e, n) {
                    var r = Math.min(this.t + t.t, e);
                    for (n.s = 0,
                             n.t = r; r > 0;)
                        n[--r] = 0;
                    for (var i = n.t - this.t; r < i; ++r)
                        n[r + this.t] = this.am(0, t[r], n, r, 0, this.t);
                    for (var i = Math.min(t.t, e); r < i; ++r)
                        this.am(0, t[r], n, r, 0, e - r);
                    n.clamp()
                }
                ,
                t.prototype.multiplyUpperTo = function (t, e, n) {
                    --e;
                    var r = n.t = this.t + t.t - e;
                    for (n.s = 0; --r >= 0;)
                        n[r] = 0;
                    for (r = Math.max(e - this.t, 0); r < t.t; ++r)
                        n[this.t + r - e] = this.am(e - r, t[r], n, 0, 0, this.t + r - e);
                    n.clamp(),
                        n.drShiftTo(1, n)
                }
                ,
                t.prototype.modInt = function (t) {
                    if (t <= 0)
                        return 0;
                    var e = this.DV % t
                        , n = this.s < 0 ? t - 1 : 0;
                    if (this.t > 0)
                        if (0 == e)
                            n = this[0] % t;
                        else
                            for (var r = this.t - 1; r >= 0; --r)
                                n = (e * n + this[r]) % t;
                    return n
                }
                ,
                t.prototype.millerRabin = function (e) {
                    var n = this.subtract(t.ONE)
                        , r = n.getLowestSetBit();
                    if (r <= 0)
                        return !1;
                    var i = n.shiftRight(r);
                    (e = e + 1 >> 1) > M.length && (e = M.length);
                    for (var o = C(), a = 0; a < e; ++a) {
                        o.fromInt(M[Math.floor(Math.random() * M.length)]);
                        var s = o.modPow(i, this);
                        if (0 != s.compareTo(t.ONE) && 0 != s.compareTo(n)) {
                            for (var u = 1; u++ < r && 0 != s.compareTo(n);)
                                if (0 == (s = s.modPowInt(2, this)).compareTo(t.ONE))
                                    return !1;
                            if (0 != s.compareTo(n))
                                return !1
                        }
                    }
                    return !0
                }
                ,
                t.prototype.square = function () {
                    var t = C();
                    return this.squareTo(t),
                        t
                }
                ,
                t.prototype.gcda = function (t, e) {
                    var n = this.s < 0 ? this.negate() : this.clone()
                        , r = t.s < 0 ? t.negate() : t.clone();
                    if (n.compareTo(r) < 0) {
                        var i = n;
                        n = r,
                            r = i
                    }
                    var o = n.getLowestSetBit()
                        , a = r.getLowestSetBit();
                    if (a < 0)
                        e(n);
                    else {
                        o < a && (a = o),
                        a > 0 && (n.rShiftTo(a, n),
                            r.rShiftTo(a, r));
                        var s = function () {
                            (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                            (o = r.getLowestSetBit()) > 0 && r.rShiftTo(o, r),
                                n.compareTo(r) >= 0 ? (n.subTo(r, n),
                                    n.rShiftTo(1, n)) : (r.subTo(n, r),
                                    r.rShiftTo(1, r)),
                                n.signum() > 0 ? setTimeout(s, 0) : (a > 0 && r.lShiftTo(a, r),
                                    setTimeout(function () {
                                        e(r)
                                    }, 0))
                        };
                        setTimeout(s, 10)
                    }
                }
                ,
                t.prototype.fromNumberAsync = function (e, n, r, o) {
                    if ("number" == typeof n)
                        if (e < 2)
                            this.fromInt(1);
                        else {
                            this.fromNumber(e, r),
                            this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), i, this),
                            this.isEven() && this.dAddOffset(1, 0);
                            var a = this
                                , s = function () {
                                a.dAddOffset(2, 0),
                                a.bitLength() > e && a.subTo(t.ONE.shiftLeft(e - 1), a),
                                    a.isProbablePrime(n) ? setTimeout(function () {
                                        o()
                                    }, 0) : setTimeout(s, 0)
                            };
                            setTimeout(s, 0)
                        }
                    else {
                        var u = []
                            , c = 7 & e;
                        u.length = 1 + (e >> 3),
                            n.nextBytes(u),
                            c > 0 ? u[0] &= (1 << c) - 1 : u[0] = 0,
                            this.fromString(u, 256)
                    }
                }
                ,
                t
        }(), j = function () {
            function t() {
            }

            return t.prototype.convert = function (t) {
                return t
            }
                ,
                t.prototype.revert = function (t) {
                    return t
                }
                ,
                t.prototype.mulTo = function (t, e, n) {
                    t.multiplyTo(e, n)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e)
                }
                ,
                t
        }(), D = function () {
            function t(t) {
                this.m = t
            }

            return t.prototype.convert = function (t) {
                return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t
            }
                ,
                t.prototype.revert = function (t) {
                    return t
                }
                ,
                t.prototype.reduce = function (t) {
                    t.divRemTo(this.m, null, t)
                }
                ,
                t.prototype.mulTo = function (t, e, n) {
                    t.multiplyTo(e, n),
                        this.reduce(n)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                t
        }(), R = function () {
            function t(t) {
                this.m = t,
                    this.mp = t.invDigit(),
                    this.mpl = 32767 & this.mp,
                    this.mph = this.mp >> 15,
                    this.um = (1 << t.DB - 15) - 1,
                    this.mt2 = 2 * t.t
            }

            return t.prototype.convert = function (t) {
                var e = C();
                return t.abs().dlShiftTo(this.m.t, e),
                    e.divRemTo(this.m, null, e),
                t.s < 0 && e.compareTo(k.ZERO) > 0 && this.m.subTo(e, e),
                    e
            }
                ,
                t.prototype.revert = function (t) {
                    var e = C();
                    return t.copyTo(e),
                        this.reduce(e),
                        e
                }
                ,
                t.prototype.reduce = function (t) {
                    for (; t.t <= this.mt2;)
                        t[t.t++] = 0;
                    for (var e = 0; e < this.m.t; ++e) {
                        var n = 32767 & t[e]
                            , r = n * this.mpl + ((n * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
                        for (n = e + this.m.t,
                                 t[n] += this.m.am(0, r, t, e, 0, this.m.t); t[n] >= t.DV;)
                            t[n] -= t.DV,
                                t[++n]++
                    }
                    t.clamp(),
                        t.drShiftTo(this.m.t, t),
                    t.compareTo(this.m) >= 0 && t.subTo(this.m, t)
                }
                ,
                t.prototype.mulTo = function (t, e, n) {
                    t.multiplyTo(e, n),
                        this.reduce(n)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                t
        }(), F = function () {
            function t(t) {
                this.m = t,
                    this.r2 = C(),
                    this.q3 = C(),
                    k.ONE.dlShiftTo(2 * t.t, this.r2),
                    this.mu = this.r2.divide(t)
            }

            return t.prototype.convert = function (t) {
                if (t.s < 0 || t.t > 2 * this.m.t)
                    return t.mod(this.m);
                if (t.compareTo(this.m) < 0)
                    return t;
                var e = C();
                return t.copyTo(e),
                    this.reduce(e),
                    e
            }
                ,
                t.prototype.revert = function (t) {
                    return t
                }
                ,
                t.prototype.reduce = function (t) {
                    for (t.drShiftTo(this.m.t - 1, this.r2),
                         t.t > this.m.t + 1 && (t.t = this.m.t + 1,
                             t.clamp()),
                             this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
                             this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0;)
                        t.dAddOffset(1, this.m.t + 1);
                    for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0;)
                        t.subTo(this.m, t)
                }
                ,
                t.prototype.mulTo = function (t, e, n) {
                    t.multiplyTo(e, n),
                        this.reduce(n)
                }
                ,
                t.prototype.sqrTo = function (t, e) {
                    t.squareTo(e),
                        this.reduce(e)
                }
                ,
                t
        }();

    function C() {
        return new k(null)
    }

    function P(t, e) {
        return new k(t, e)
    }

    "Microsoft Internet Explorer" == navigator.appName ? (k.prototype.am = function (t, e, n, r, i, o) {
        for (var a = 32767 & e, s = e >> 15; --o >= 0;) {
            var u = 32767 & this[t]
                , c = this[t++] >> 15
                , f = s * u + c * a;
            u = a * u + ((32767 & f) << 15) + n[r] + (1073741823 & i),
                i = (u >>> 30) + (f >>> 15) + s * c + (i >>> 30),
                n[r++] = 1073741823 & u
        }
        return i
    }
        ,
        S = 30) : "Netscape" != navigator.appName ? (k.prototype.am = function (t, e, n, r, i, o) {
        for (; --o >= 0;) {
            var a = e * this[t++] + n[r] + i;
            i = Math.floor(a / 67108864),
                n[r++] = 67108863 & a
        }
        return i
    }
        ,
        S = 26) : (k.prototype.am = function (t, e, n, r, i, o) {
        for (var a = 16383 & e, s = e >> 14; --o >= 0;) {
            var u = 16383 & this[t]
                , c = this[t++] >> 14
                , f = s * u + c * a;
            u = a * u + ((16383 & f) << 14) + n[r] + i,
                i = (u >> 28) + (f >> 14) + s * c,
                n[r++] = 268435455 & u
        }
        return i
    }
        ,
        S = 28),
        k.prototype.DB = S,
        k.prototype.DM = (1 << S) - 1,
        k.prototype.DV = 1 << S,
        k.prototype.FV = Math.pow(2, 52),
        k.prototype.F1 = 52 - S,
        k.prototype.F2 = 2 * S - 52;
    var N, L, U = [];
    for (N = "0".charCodeAt(0),
             L = 0; L <= 9; ++L)
        U[N++] = L;
    for (N = "a".charCodeAt(0),
             L = 10; L < 36; ++L)
        U[N++] = L;
    for (N = "A".charCodeAt(0),
             L = 10; L < 36; ++L)
        U[N++] = L;

    function I(t, e) {
        var n = U[t.charCodeAt(e)];
        return null == n ? -1 : n
    }

    function V(t) {
        var e = C();
        return e.fromInt(t),
            e
    }

    function B(t) {
        var e, n = 1;
        return 0 != (e = t >>> 16) && (t = e,
            n += 16),
        0 != (e = t >> 8) && (t = e,
            n += 8),
        0 != (e = t >> 4) && (t = e,
            n += 4),
        0 != (e = t >> 2) && (t = e,
            n += 2),
        0 != (e = t >> 1) && (t = e,
            n += 1),
            n
    }

    k.ZERO = V(0),
        k.ONE = V(1);
    var Y, q, K = function () {
        function t() {
            this.i = 0,
                this.j = 0,
                this.S = []
        }

        return t.prototype.init = function (t) {
            var e, n, r;
            for (e = 0; e < 256; ++e)
                this.S[e] = e;
            for (n = 0,
                     e = 0; e < 256; ++e)
                n = n + this.S[e] + t[e % t.length] & 255,
                    r = this.S[e],
                    this.S[e] = this.S[n],
                    this.S[n] = r;
            this.i = 0,
                this.j = 0
        }
            ,
            t.prototype.next = function () {
                var t;
                return this.i = this.i + 1 & 255,
                    this.j = this.j + this.S[this.i] & 255,
                    t = this.S[this.i],
                    this.S[this.i] = this.S[this.j],
                    this.S[this.j] = t,
                    this.S[t + this.S[this.i] & 255]
            }
            ,
            t
    }(), W = 256, X = null;
    if (null == X) {
        X = [],
            q = 0;
        var G = void 0;
        if (window.crypto && window.crypto.getRandomValues) {
            var $ = new Uint32Array(256);
            for (window.crypto.getRandomValues($),
                     G = 0; G < $.length; ++G)
                X[q++] = 255 & $[G]
        }
        var H = function (t) {
            if (this.count = this.count || 0,
            this.count >= 256 || q >= W)
                window.removeEventListener ? window.removeEventListener("mousemove", H, !1) : window.detachEvent && window.detachEvent("onmousemove", H);
            else
                try {
                    var e = t.x + t.y;
                    X[q++] = 255 & e,
                        this.count += 1
                } catch (t) {
                }
        };
        window.addEventListener ? window.addEventListener("mousemove", H, !1) : window.attachEvent && window.attachEvent("onmousemove", H)
    }

    function Z() {
        if (null == Y) {
            for (Y = new K; q < W;) {
                var t = Math.floor(65536 * Math.random());
                X[q++] = 255 & t
            }
            for (Y.init(X),
                     q = 0; q < X.length; ++q)
                X[q] = 0;
            q = 0
        }
        return Y.next()
    }

    var z = function () {
        function t() {
        }

        return t.prototype.nextBytes = function (t) {
            for (var e = 0; e < t.length; ++e)
                t[e] = Z()
        }
            ,
            t
    }()
        , J = function () {
        function t() {
            this.n = null,
                this.e = 0,
                this.d = null,
                this.p = null,
                this.q = null,
                this.dmp1 = null,
                this.dmq1 = null,
                this.coeff = null
        }

        return t.prototype.doPublic = function (t) {
            return t.modPowInt(this.e, this.n)
        }
            ,
            t.prototype.doPrivate = function (t) {
                if (null == this.p || null == this.q)
                    return t.modPow(this.d, this.n);
                for (var e = t.mod(this.p).modPow(this.dmp1, this.p), n = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(n) < 0;)
                    e = e.add(this.p);
                return e.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
            }
            ,
            t.prototype.setPublic = function (t, e) {
                null != t && null != e && t.length > 0 && e.length > 0 && (this.n = P(t, 16),
                    this.e = parseInt(e, 16))
            }
            ,
            t.prototype.encrypt = function (t) {
                var e = function (t, e) {
                    if (e < t.length + 11)
                        return null;
                    for (var n = [], r = t.length - 1; r >= 0 && e > 0;) {
                        var i = t.charCodeAt(r--);
                        i < 128 ? n[--e] = i : i > 127 && i < 2048 ? (n[--e] = 63 & i | 128,
                            n[--e] = i >> 6 | 192) : (n[--e] = 63 & i | 128,
                            n[--e] = i >> 6 & 63 | 128,
                            n[--e] = i >> 12 | 224)
                    }
                    n[--e] = 0;
                    for (var o = new z, a = []; e > 2;) {
                        for (a[0] = 0; 0 == a[0];)
                            o.nextBytes(a);
                        n[--e] = a[0]
                    }
                    return n[--e] = 2,
                        n[--e] = 0,
                        new k(n)
                }(t, this.n.bitLength() + 7 >> 3);
                if (null == e)
                    return null;
                var n = this.doPublic(e);
                if (null == n)
                    return null;
                var r = n.toString(16);
                return 0 == (1 & r.length) ? r : "0" + r
            }
            ,
            t.prototype.setPrivate = function (t, e, n) {
                null != t && null != e && t.length > 0 && e.length > 0 && (this.n = P(t, 16),
                    this.e = parseInt(e, 16),
                    this.d = P(n, 16))
            }
            ,
            t.prototype.setPrivateEx = function (t, e, n, r, i, o, a, s) {
                null != t && null != e && t.length > 0 && e.length > 0 && (this.n = P(t, 16),
                    this.e = parseInt(e, 16),
                    this.d = P(n, 16),
                    this.p = P(r, 16),
                    this.q = P(i, 16),
                    this.dmp1 = P(o, 16),
                    this.dmq1 = P(a, 16),
                    this.coeff = P(s, 16))
            }
            ,
            t.prototype.generate = function (t, e) {
                var n = new z
                    , r = t >> 1;
                this.e = parseInt(e, 16);
                for (var i = new k(e, 16); ;) {
                    for (; this.p = new k(t - r, 1, n),
                           0 != this.p.subtract(k.ONE).gcd(i).compareTo(k.ONE) || !this.p.isProbablePrime(10);)
                        ;
                    for (; this.q = new k(r, 1, n),
                           0 != this.q.subtract(k.ONE).gcd(i).compareTo(k.ONE) || !this.q.isProbablePrime(10);)
                        ;
                    if (this.p.compareTo(this.q) <= 0) {
                        var o = this.p;
                        this.p = this.q,
                            this.q = o
                    }
                    var a = this.p.subtract(k.ONE)
                        , s = this.q.subtract(k.ONE)
                        , u = a.multiply(s);
                    if (0 == u.gcd(i).compareTo(k.ONE)) {
                        this.n = this.p.multiply(this.q),
                            this.d = i.modInverse(u),
                            this.dmp1 = this.d.mod(a),
                            this.dmq1 = this.d.mod(s),
                            this.coeff = this.q.modInverse(this.p);
                        break
                    }
                }
            }
            ,
            t.prototype.decrypt = function (t) {
                var e = P(t, 16)
                    , n = this.doPrivate(e);
                return null == n ? null : function (t, e) {
                    for (var n = t.toByteArray(), r = 0; r < n.length && 0 == n[r];)
                        ++r;
                    if (n.length - r != e - 1 || 2 != n[r])
                        return null;
                    for (++r; 0 != n[r];)
                        if (++r >= n.length)
                            return null;
                    for (var i = ""; ++r < n.length;) {
                        var o = 255 & n[r];
                        o < 128 ? i += String.fromCharCode(o) : o > 191 && o < 224 ? (i += String.fromCharCode((31 & o) << 6 | 63 & n[r + 1]),
                            ++r) : (i += String.fromCharCode((15 & o) << 12 | (63 & n[r + 1]) << 6 | 63 & n[r + 2]),
                            r += 2)
                    }
                    return i
                }(n, this.n.bitLength() + 7 >> 3)
            }
            ,
            t.prototype.generateAsync = function (t, e, n) {
                var r = new z
                    , i = t >> 1;
                this.e = parseInt(e, 16);
                var o = new k(e, 16)
                    , a = this
                    , s = function () {
                    var e = function () {
                        if (a.p.compareTo(a.q) <= 0) {
                            var t = a.p;
                            a.p = a.q,
                                a.q = t
                        }
                        var e = a.p.subtract(k.ONE)
                            , r = a.q.subtract(k.ONE)
                            , i = e.multiply(r);
                        0 == i.gcd(o).compareTo(k.ONE) ? (a.n = a.p.multiply(a.q),
                            a.d = o.modInverse(i),
                            a.dmp1 = a.d.mod(e),
                            a.dmq1 = a.d.mod(r),
                            a.coeff = a.q.modInverse(a.p),
                            setTimeout(function () {
                                n()
                            }, 0)) : setTimeout(s, 0)
                    }
                        , u = function () {
                        a.q = C(),
                            a.q.fromNumberAsync(i, 1, r, function () {
                                a.q.subtract(k.ONE).gcda(o, function (t) {
                                    0 == t.compareTo(k.ONE) && a.q.isProbablePrime(10) ? setTimeout(e, 0) : setTimeout(u, 0)
                                })
                            })
                    }
                        , c = function () {
                        a.p = C(),
                            a.p.fromNumberAsync(t - i, 1, r, function () {
                                a.p.subtract(k.ONE).gcda(o, function (t) {
                                    0 == t.compareTo(k.ONE) && a.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(c, 0)
                                })
                            })
                    };
                    setTimeout(c, 0)
                };
                setTimeout(s, 0)
            }
            ,
            t.prototype.sign = function (t, e, n) {
                var r = Q[n] || ""
                    , i = r + e(t).toString()
                    , o = function (t, e) {
                    if (e < t.length + 22)
                        return null;
                    for (var n = e - t.length - 6, r = "", i = 0; i < n; i += 2)
                        r += "ff";
                    return P("0001" + r + "00" + t, 16)
                }(i, this.n.bitLength() / 4);
                if (null == o)
                    return null;
                var a = this.doPrivate(o);
                if (null == a)
                    return null;
                var s = a.toString(16);
                return 0 == (1 & s.length) ? s : "0" + s
            }
            ,
            t.prototype.verify = function (t, e, n) {
                var r = P(e, 16)
                    , i = this.doPublic(r);
                if (null == i)
                    return null;
                var o = i.toString(16).replace(/^1f+00/, "")
                    , a = function (t) {
                    for (var e in Q)
                        if (Q.hasOwnProperty(e)) {
                            var n = Q[e]
                                , r = n.length;
                            if (t.substr(0, r) == n)
                                return t.substr(r)
                        }
                    return t
                }(o);
                return a == n(t).toString()
            }
            ,
            t
    }()
        , Q = {
        md2: "3020300c06082a864886f70d020205000410",
        md5: "3020300c06082a864886f70d020505000410",
        sha1: "3021300906052b0e03021a05000414",
        sha224: "302d300d06096086480165030402040500041c",
        sha256: "3031300d060960864801650304020105000420",
        sha384: "3041300d060960864801650304020205000430",
        sha512: "3051300d060960864801650304020305000440",
        ripemd160: "3021300906052b2403020105000414"
    }
        , tt = {};
    tt.lang = {
        extend: function (t, e, n) {
            if (!e || !t)
                throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
            var r = function () {
            };
            if (r.prototype = e.prototype,
                t.prototype = new r,
                t.prototype.constructor = t,
                t.superclass = e.prototype,
            e.prototype.constructor == Object.prototype.constructor && (e.prototype.constructor = e),
                n) {
                var i;
                for (i in n)
                    t.prototype[i] = n[i];
                var o = function () {
                }
                    , a = ["toString", "valueOf"];
                try {
                    /MSIE/.test(navigator.userAgent) && (o = function (t, e) {
                            for (i = 0; i < a.length; i += 1) {
                                var n = a[i]
                                    , r = e[n];
                                "function" == typeof r && r != Object.prototype[n] && (t[n] = r)
                            }
                        }
                    )
                } catch (t) {
                }
                o(t.prototype, n)
            }
        }
    };
    var et = {};
    void 0 !== et.asn1 && et.asn1 || (et.asn1 = {}),
        et.asn1.ASN1Util = new function () {
            this.integerToByteHex = function (t) {
                var e = t.toString(16);
                return e.length % 2 == 1 && (e = "0" + e),
                    e
            }
                ,
                this.bigIntToMinTwosComplementsHex = function (t) {
                    var e = t.toString(16);
                    if ("-" != e.substr(0, 1))
                        e.length % 2 == 1 ? e = "0" + e : e.match(/^[0-7]/) || (e = "00" + e);
                    else {
                        var n = e.substr(1)
                            , r = n.length;
                        r % 2 == 1 ? r += 1 : e.match(/^[0-7]/) || (r += 2);
                        for (var i = "", o = 0; o < r; o++)
                            i += "f";
                        var a = new k(i, 16)
                            , s = a.xor(t).add(k.ONE);
                        e = s.toString(16).replace(/^-/, "")
                    }
                    return e
                }
                ,
                this.getPEMStringFromHex = function (t, e) {
                    return hextopem(t, e)
                }
                ,
                this.newObject = function (t) {
                    var e = et
                        , n = e.asn1
                        , r = n.DERBoolean
                        , i = n.DERInteger
                        , o = n.DERBitString
                        , a = n.DEROctetString
                        , s = n.DERNull
                        , u = n.DERObjectIdentifier
                        , c = n.DEREnumerated
                        , f = n.DERUTF8String
                        , l = n.DERNumericString
                        , h = n.DERPrintableString
                        , p = n.DERTeletexString
                        , d = n.DERIA5String
                        , v = n.DERUTCTime
                        , y = n.DERGeneralizedTime
                        , m = n.DERSequence
                        , g = n.DERSet
                        , _ = n.DERTaggedObject
                        , b = n.ASN1Util.newObject
                        , w = Object.keys(t);
                    if (1 != w.length)
                        throw "key of param shall be only one.";
                    var x = w[0];
                    if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + x + ":"))
                        throw "undefined key: " + x;
                    if ("bool" == x)
                        return new r(t[x]);
                    if ("int" == x)
                        return new i(t[x]);
                    if ("bitstr" == x)
                        return new o(t[x]);
                    if ("octstr" == x)
                        return new a(t[x]);
                    if ("null" == x)
                        return new s(t[x]);
                    if ("oid" == x)
                        return new u(t[x]);
                    if ("enum" == x)
                        return new c(t[x]);
                    if ("utf8str" == x)
                        return new f(t[x]);
                    if ("numstr" == x)
                        return new l(t[x]);
                    if ("prnstr" == x)
                        return new h(t[x]);
                    if ("telstr" == x)
                        return new p(t[x]);
                    if ("ia5str" == x)
                        return new d(t[x]);
                    if ("utctime" == x)
                        return new v(t[x]);
                    if ("gentime" == x)
                        return new y(t[x]);
                    if ("seq" == x) {
                        for (var S = t[x], O = [], E = 0; E < S.length; E++) {
                            var T = b(S[E]);
                            O.push(T)
                        }
                        return new m({
                            array: O
                        })
                    }
                    if ("set" == x) {
                        for (var S = t[x], O = [], E = 0; E < S.length; E++) {
                            var T = b(S[E]);
                            O.push(T)
                        }
                        return new g({
                            array: O
                        })
                    }
                    if ("tag" == x) {
                        var M = t[x];
                        if ("[object Array]" === Object.prototype.toString.call(M) && 3 == M.length) {
                            var A = b(M[2]);
                            return new _({
                                tag: M[0],
                                explicit: M[1],
                                obj: A
                            })
                        }
                        var k = {};
                        if (void 0 !== M.explicit && (k.explicit = M.explicit),
                        void 0 !== M.tag && (k.tag = M.tag),
                        void 0 === M.obj)
                            throw "obj shall be specified for 'tag'.";
                        return k.obj = b(M.obj),
                            new _(k)
                    }
                }
                ,
                this.jsonToASN1HEX = function (t) {
                    var e = this.newObject(t);
                    return e.getEncodedHex()
                }
        }
        ,
        et.asn1.ASN1Util.oidHexToInt = function (t) {
            for (var e = "", n = parseInt(t.substr(0, 2), 16), r = Math.floor(n / 40), i = n % 40, e = r + "." + i, o = "", a = 2; a < t.length; a += 2) {
                var s = parseInt(t.substr(a, 2), 16)
                    , u = ("00000000" + s.toString(2)).slice(-8);
                if (o += u.substr(1, 7),
                "0" == u.substr(0, 1)) {
                    var c = new k(o, 2);
                    e = e + "." + c.toString(10),
                        o = ""
                }
            }
            return e
        }
        ,
        et.asn1.ASN1Util.oidIntToHex = function (t) {
            var e = function (t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                    e
            }
                , n = function (t) {
                var n = ""
                    , r = new k(t, 10)
                    , i = r.toString(2)
                    , o = 7 - i.length % 7;
                7 == o && (o = 0);
                for (var a = "", s = 0; s < o; s++)
                    a += "0";
                i = a + i;
                for (var s = 0; s < i.length - 1; s += 7) {
                    var u = i.substr(s, 7);
                    s != i.length - 7 && (u = "1" + u),
                        n += e(parseInt(u, 2))
                }
                return n
            };
            if (!t.match(/^[0-9.]+$/))
                throw "malformed oid string: " + t;
            var r = ""
                , i = t.split(".")
                , o = 40 * parseInt(i[0]) + parseInt(i[1]);
            r += e(o),
                i.splice(0, 2);
            for (var a = 0; a < i.length; a++)
                r += n(i[a]);
            return r
        }
        ,
        et.asn1.ASN1Object = function () {
            this.getLengthHexFromValue = function () {
                if (void 0 === this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + "".length + ",v=" + this.hV;
                var t = this.hV.length / 2
                    , e = t.toString(16);
                if (e.length % 2 == 1 && (e = "0" + e),
                t < 128)
                    return e;
                var n = e.length / 2;
                if (n > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                var r = 128 + n;
                return r.toString(16) + e
            }
                ,
                this.getEncodedHex = function () {
                    return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                        this.hL = this.getLengthHexFromValue(),
                        this.hTLV = this.hT + this.hL + this.hV,
                        this.isModified = !1),
                        this.hTLV
                }
                ,
                this.getValueHex = function () {
                    return this.getEncodedHex(),
                        this.hV
                }
                ,
                this.getFreshValueHex = function () {
                    return ""
                }
        }
        ,
        et.asn1.DERAbstractString = function (t) {
            et.asn1.DERAbstractString.superclass.constructor.call(this),
                this.getString = function () {
                    return this.s
                }
                ,
                this.setString = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = t,
                        this.hV = stohex(this.s)
                }
                ,
                this.setStringHex = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && ("string" == typeof t ? this.setString(t) : void 0 !== t.str ? this.setString(t.str) : void 0 !== t.hex && this.setStringHex(t.hex))
        }
        ,
        tt.lang.extend(et.asn1.DERAbstractString, et.asn1.ASN1Object),
        et.asn1.DERAbstractTime = function (t) {
            et.asn1.DERAbstractTime.superclass.constructor.call(this),
                this.localDateToUTC = function (t) {
                    utc = t.getTime() + 6e4 * t.getTimezoneOffset();
                    var e = new Date(utc);
                    return e
                }
                ,
                this.formatDate = function (t, e, n) {
                    var r = this.zeroPadding
                        , i = this.localDateToUTC(t)
                        , o = String(i.getFullYear());
                    "utc" == e && (o = o.substr(2, 2));
                    var a = r(String(i.getMonth() + 1), 2)
                        , s = r(String(i.getDate()), 2)
                        , u = r(String(i.getHours()), 2)
                        , c = r(String(i.getMinutes()), 2)
                        , f = r(String(i.getSeconds()), 2)
                        , l = o + a + s + u + c + f;
                    if (!0 === n) {
                        var h = i.getMilliseconds();
                        if (0 != h) {
                            var p = r(String(h), 3);
                            p = p.replace(/[0]+$/, ""),
                                l = l + "." + p
                        }
                    }
                    return l + "Z"
                }
                ,
                this.zeroPadding = function (t, e) {
                    return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t
                }
                ,
                this.getString = function () {
                    return this.s
                }
                ,
                this.setString = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = t,
                        this.hV = stohex(t)
                }
                ,
                this.setByDateValue = function (t, e, n, r, i, o) {
                    var a = new Date(Date.UTC(t, e - 1, n, r, i, o, 0));
                    this.setByDate(a)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
        }
        ,
        tt.lang.extend(et.asn1.DERAbstractTime, et.asn1.ASN1Object),
        et.asn1.DERAbstractStructured = function (t) {
            et.asn1.DERAbstractString.superclass.constructor.call(this),
                this.setByASN1ObjectArray = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.asn1Array = t
                }
                ,
                this.appendASN1Object = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.asn1Array.push(t)
                }
                ,
                this.asn1Array = new Array,
            void 0 !== t && void 0 !== t.array && (this.asn1Array = t.array)
        }
        ,
        tt.lang.extend(et.asn1.DERAbstractStructured, et.asn1.ASN1Object),
        et.asn1.DERBoolean = function () {
            et.asn1.DERBoolean.superclass.constructor.call(this),
                this.hT = "01",
                this.hTLV = "0101ff"
        }
        ,
        tt.lang.extend(et.asn1.DERBoolean, et.asn1.ASN1Object),
        et.asn1.DERInteger = function (t) {
            et.asn1.DERInteger.superclass.constructor.call(this),
                this.hT = "02",
                this.setByBigInteger = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                }
                ,
                this.setByInteger = function (t) {
                    var e = new k(String(t), 10);
                    this.setByBigInteger(e)
                }
                ,
                this.setValueHex = function (t) {
                    this.hV = t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.bigint ? this.setByBigInteger(t.bigint) : void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        tt.lang.extend(et.asn1.DERInteger, et.asn1.ASN1Object),
        et.asn1.DERBitString = function (t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = et.asn1.ASN1Util.newObject(t.obj);
                t.hex = "00" + e.getEncodedHex()
            }
            et.asn1.DERBitString.superclass.constructor.call(this),
                this.hT = "03",
                this.setHexValueIncludingUnusedBits = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = t
                }
                ,
                this.setUnusedBitsAndHexValue = function (t, e) {
                    if (t < 0 || 7 < t)
                        throw "unused bits shall be from 0 to 7: u = " + t;
                    var n = "0" + t;
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = n + e
                }
                ,
                this.setByBinaryString = function (t) {
                    var e = 8 - (t = t.replace(/0+$/, "")).length % 8;
                    8 == e && (e = 0);
                    for (var n = 0; n <= e; n++)
                        t += "0";
                    for (var r = "", n = 0; n < t.length - 1; n += 8) {
                        var i = t.substr(n, 8)
                            , o = parseInt(i, 2).toString(16);
                        1 == o.length && (o = "0" + o),
                            r += o
                    }
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = "0" + e + r
                }
                ,
                this.setByBooleanArray = function (t) {
                    for (var e = "", n = 0; n < t.length; n++)
                        1 == t[n] ? e += "1" : e += "0";
                    this.setByBinaryString(e)
                }
                ,
                this.newFalseArray = function (t) {
                    for (var e = new Array(t), n = 0; n < t; n++)
                        e[n] = !1;
                    return e
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && ("string" == typeof t && t.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(t) : void 0 !== t.hex ? this.setHexValueIncludingUnusedBits(t.hex) : void 0 !== t.bin ? this.setByBinaryString(t.bin) : void 0 !== t.array && this.setByBooleanArray(t.array))
        }
        ,
        tt.lang.extend(et.asn1.DERBitString, et.asn1.ASN1Object),
        et.asn1.DEROctetString = function (t) {
            if (void 0 !== t && void 0 !== t.obj) {
                var e = et.asn1.ASN1Util.newObject(t.obj);
                t.hex = e.getEncodedHex()
            }
            et.asn1.DEROctetString.superclass.constructor.call(this, t),
                this.hT = "04"
        }
        ,
        tt.lang.extend(et.asn1.DEROctetString, et.asn1.DERAbstractString),
        et.asn1.DERNull = function () {
            et.asn1.DERNull.superclass.constructor.call(this),
                this.hT = "05",
                this.hTLV = "0500"
        }
        ,
        tt.lang.extend(et.asn1.DERNull, et.asn1.ASN1Object),
        et.asn1.DERObjectIdentifier = function (t) {
            var e = function (t) {
                var e = t.toString(16);
                return 1 == e.length && (e = "0" + e),
                    e
            }
                , n = function (t) {
                var n = ""
                    , r = new k(t, 10)
                    , i = r.toString(2)
                    , o = 7 - i.length % 7;
                7 == o && (o = 0);
                for (var a = "", s = 0; s < o; s++)
                    a += "0";
                i = a + i;
                for (var s = 0; s < i.length - 1; s += 7) {
                    var u = i.substr(s, 7);
                    s != i.length - 7 && (u = "1" + u),
                        n += e(parseInt(u, 2))
                }
                return n
            };
            et.asn1.DERObjectIdentifier.superclass.constructor.call(this),
                this.hT = "06",
                this.setValueHex = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = t
                }
                ,
                this.setValueOidString = function (t) {
                    if (!t.match(/^[0-9.]+$/))
                        throw "malformed oid string: " + t;
                    var r = ""
                        , i = t.split(".")
                        , o = 40 * parseInt(i[0]) + parseInt(i[1]);
                    r += e(o),
                        i.splice(0, 2);
                    for (var a = 0; a < i.length; a++)
                        r += n(i[a]);
                    this.hTLV = null,
                        this.isModified = !0,
                        this.s = null,
                        this.hV = r
                }
                ,
                this.setValueName = function (t) {
                    var e = et.asn1.x509.OID.name2oid(t);
                    if ("" === e)
                        throw "DERObjectIdentifier oidName undefined: " + t;
                    this.setValueOidString(e)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && ("string" == typeof t ? t.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(t) : this.setValueName(t) : void 0 !== t.oid ? this.setValueOidString(t.oid) : void 0 !== t.hex ? this.setValueHex(t.hex) : void 0 !== t.name && this.setValueName(t.name))
        }
        ,
        tt.lang.extend(et.asn1.DERObjectIdentifier, et.asn1.ASN1Object),
        et.asn1.DEREnumerated = function (t) {
            et.asn1.DEREnumerated.superclass.constructor.call(this),
                this.hT = "0a",
                this.setByBigInteger = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.hV = et.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t)
                }
                ,
                this.setByInteger = function (t) {
                    var e = new k(String(t), 10);
                    this.setByBigInteger(e)
                }
                ,
                this.setValueHex = function (t) {
                    this.hV = t
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.int ? this.setByInteger(t.int) : "number" == typeof t ? this.setByInteger(t) : void 0 !== t.hex && this.setValueHex(t.hex))
        }
        ,
        tt.lang.extend(et.asn1.DEREnumerated, et.asn1.ASN1Object),
        et.asn1.DERUTF8String = function (t) {
            et.asn1.DERUTF8String.superclass.constructor.call(this, t),
                this.hT = "0c"
        }
        ,
        tt.lang.extend(et.asn1.DERUTF8String, et.asn1.DERAbstractString),
        et.asn1.DERNumericString = function (t) {
            et.asn1.DERNumericString.superclass.constructor.call(this, t),
                this.hT = "12"
        }
        ,
        tt.lang.extend(et.asn1.DERNumericString, et.asn1.DERAbstractString),
        et.asn1.DERPrintableString = function (t) {
            et.asn1.DERPrintableString.superclass.constructor.call(this, t),
                this.hT = "13"
        }
        ,
        tt.lang.extend(et.asn1.DERPrintableString, et.asn1.DERAbstractString),
        et.asn1.DERTeletexString = function (t) {
            et.asn1.DERTeletexString.superclass.constructor.call(this, t),
                this.hT = "14"
        }
        ,
        tt.lang.extend(et.asn1.DERTeletexString, et.asn1.DERAbstractString),
        et.asn1.DERIA5String = function (t) {
            et.asn1.DERIA5String.superclass.constructor.call(this, t),
                this.hT = "16"
        }
        ,
        tt.lang.extend(et.asn1.DERIA5String, et.asn1.DERAbstractString),
        et.asn1.DERUTCTime = function (t) {
            et.asn1.DERUTCTime.superclass.constructor.call(this, t),
                this.hT = "17",
                this.setByDate = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.date = t,
                        this.s = this.formatDate(this.date, "utc"),
                        this.hV = stohex(this.s)
                }
                ,
                this.getFreshValueHex = function () {
                    return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                        this.s = this.formatDate(this.date, "utc"),
                        this.hV = stohex(this.s)),
                        this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{12}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date))
        }
        ,
        tt.lang.extend(et.asn1.DERUTCTime, et.asn1.DERAbstractTime),
        et.asn1.DERGeneralizedTime = function (t) {
            et.asn1.DERGeneralizedTime.superclass.constructor.call(this, t),
                this.hT = "18",
                this.withMillis = !1,
                this.setByDate = function (t) {
                    this.hTLV = null,
                        this.isModified = !0,
                        this.date = t,
                        this.s = this.formatDate(this.date, "gen", this.withMillis),
                        this.hV = stohex(this.s)
                }
                ,
                this.getFreshValueHex = function () {
                    return void 0 === this.date && void 0 === this.s && (this.date = new Date,
                        this.s = this.formatDate(this.date, "gen", this.withMillis),
                        this.hV = stohex(this.s)),
                        this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.str ? this.setString(t.str) : "string" == typeof t && t.match(/^[0-9]{14}Z$/) ? this.setString(t) : void 0 !== t.hex ? this.setStringHex(t.hex) : void 0 !== t.date && this.setByDate(t.date),
            !0 === t.millis && (this.withMillis = !0))
        }
        ,
        tt.lang.extend(et.asn1.DERGeneralizedTime, et.asn1.DERAbstractTime),
        et.asn1.DERSequence = function (t) {
            et.asn1.DERSequence.superclass.constructor.call(this, t),
                this.hT = "30",
                this.getFreshValueHex = function () {
                    for (var t = "", e = 0; e < this.asn1Array.length; e++) {
                        var n = this.asn1Array[e];
                        t += n.getEncodedHex()
                    }
                    return this.hV = t,
                        this.hV
                }
        }
        ,
        tt.lang.extend(et.asn1.DERSequence, et.asn1.DERAbstractStructured),
        et.asn1.DERSet = function (t) {
            et.asn1.DERSet.superclass.constructor.call(this, t),
                this.hT = "31",
                this.sortFlag = !0,
                this.getFreshValueHex = function () {
                    for (var t = new Array, e = 0; e < this.asn1Array.length; e++) {
                        var n = this.asn1Array[e];
                        t.push(n.getEncodedHex())
                    }
                    return 1 == this.sortFlag && t.sort(),
                        this.hV = t.join(""),
                        this.hV
                }
                ,
            void 0 !== t && void 0 !== t.sortflag && 0 == t.sortflag && (this.sortFlag = !1)
        }
        ,
        tt.lang.extend(et.asn1.DERSet, et.asn1.DERAbstractStructured),
        et.asn1.DERTaggedObject = function (t) {
            et.asn1.DERTaggedObject.superclass.constructor.call(this),
                this.hT = "a0",
                this.hV = "",
                this.isExplicit = !0,
                this.asn1Object = null,
                this.setASN1Object = function (t, e, n) {
                    this.hT = e,
                        this.isExplicit = t,
                        this.asn1Object = n,
                        this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                            this.hTLV = null,
                            this.isModified = !0) : (this.hV = null,
                            this.hTLV = n.getEncodedHex(),
                            this.hTLV = this.hTLV.replace(/^../, e),
                            this.isModified = !1)
                }
                ,
                this.getFreshValueHex = function () {
                    return this.hV
                }
                ,
            void 0 !== t && (void 0 !== t.tag && (this.hT = t.tag),
            void 0 !== t.explicit && (this.isExplicit = t.explicit),
            void 0 !== t.obj && (this.asn1Object = t.obj,
                this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        tt.lang.extend(et.asn1.DERTaggedObject, et.asn1.ASN1Object);
    var nt = function (t) {
        function e(n) {
            var r = t.call(this) || this;
            return n && ("string" == typeof n ? r.parseKey(n) : (e.hasPrivateKeyProperty(n) || e.hasPublicKeyProperty(n)) && r.parsePropertiesFrom(n)),
                r
        }

        return function (t, e) {
            function n() {
                this.constructor = t
            }

            v(t, e),
                t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
                    new n)
        }(e, t),
            e.prototype.parseKey = function (t) {
                try {
                    var e = 0
                        , n = 0
                        , r = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(t) ? y.decode(t) : m.unarmor(t)
                        , i = E.decode(r);
                    if (3 === i.sub.length && (i = i.sub[2].sub[0]),
                    9 === i.sub.length) {
                        e = i.sub[1].getHexStringValue(),
                            this.n = P(e, 16),
                            n = i.sub[2].getHexStringValue(),
                            this.e = parseInt(n, 16);
                        var o = i.sub[3].getHexStringValue();
                        this.d = P(o, 16);
                        var a = i.sub[4].getHexStringValue();
                        this.p = P(a, 16);
                        var s = i.sub[5].getHexStringValue();
                        this.q = P(s, 16);
                        var u = i.sub[6].getHexStringValue();
                        this.dmp1 = P(u, 16);
                        var c = i.sub[7].getHexStringValue();
                        this.dmq1 = P(c, 16);
                        var f = i.sub[8].getHexStringValue();
                        this.coeff = P(f, 16)
                    } else {
                        if (2 !== i.sub.length)
                            return !1;
                        var l = i.sub[1]
                            , h = l.sub[0];
                        e = h.sub[0].getHexStringValue(),
                            this.n = P(e, 16),
                            n = h.sub[1].getHexStringValue(),
                            this.e = parseInt(n, 16)
                    }
                    return !0
                } catch (t) {
                    return !1
                }
            }
            ,
            e.prototype.getPrivateBaseKey = function () {
                var t = {
                    array: [new et.asn1.DERInteger({
                        int: 0
                    }), new et.asn1.DERInteger({
                        bigint: this.n
                    }), new et.asn1.DERInteger({
                        int: this.e
                    }), new et.asn1.DERInteger({
                        bigint: this.d
                    }), new et.asn1.DERInteger({
                        bigint: this.p
                    }), new et.asn1.DERInteger({
                        bigint: this.q
                    }), new et.asn1.DERInteger({
                        bigint: this.dmp1
                    }), new et.asn1.DERInteger({
                        bigint: this.dmq1
                    }), new et.asn1.DERInteger({
                        bigint: this.coeff
                    })]
                }
                    , e = new et.asn1.DERSequence(t);
                return e.getEncodedHex()
            }
            ,
            e.prototype.getPrivateBaseKeyB64 = function () {
                return l(this.getPrivateBaseKey())
            }
            ,
            e.prototype.getPublicBaseKey = function () {
                var t = new et.asn1.DERSequence({
                    array: [new et.asn1.DERObjectIdentifier({
                        oid: "1.2.840.113549.1.1.1"
                    }), new et.asn1.DERNull]
                })
                    , e = new et.asn1.DERSequence({
                    array: [new et.asn1.DERInteger({
                        bigint: this.n
                    }), new et.asn1.DERInteger({
                        int: this.e
                    })]
                })
                    , n = new et.asn1.DERBitString({
                    hex: "00" + e.getEncodedHex()
                })
                    , r = new et.asn1.DERSequence({
                    array: [t, n]
                });
                return r.getEncodedHex()
            }
            ,
            e.prototype.getPublicBaseKeyB64 = function () {
                return l(this.getPublicBaseKey())
            }
            ,
            e.wordwrap = function (t, e) {
                if (e = e || 64,
                    !t)
                    return t;
                var n = "(.{1," + e + "})( +|$\n?)|(.{1," + e + "})";
                return t.match(RegExp(n, "g")).join("\n")
            }
            ,
            e.prototype.getPrivateKey = function () {
                var t = "-----BEGIN RSA PRIVATE KEY-----\n";
                return t += e.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
                    t += "-----END RSA PRIVATE KEY-----"
            }
            ,
            e.prototype.getPublicKey = function () {
                var t = "-----BEGIN PUBLIC KEY-----\n";
                return t += e.wordwrap(this.getPublicBaseKeyB64()) + "\n",
                    t += "-----END PUBLIC KEY-----"
            }
            ,
            e.hasPublicKeyProperty = function (t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e")
            }
            ,
            e.hasPrivateKeyProperty = function (t) {
                return (t = t || {}).hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff")
            }
            ,
            e.prototype.parsePropertiesFrom = function (t) {
                this.n = t.n,
                    this.e = t.e,
                t.hasOwnProperty("d") && (this.d = t.d,
                    this.p = t.p,
                    this.q = t.q,
                    this.dmp1 = t.dmp1,
                    this.dmq1 = t.dmq1,
                    this.coeff = t.coeff)
            }
            ,
            e
    }(J)
        , rt = function () {
        function t(t) {
            t = t || {},
                this.default_key_size = parseInt(t.default_key_size, 10) || 1024,
                this.default_public_exponent = t.default_public_exponent || "010001",
                this.log = t.log || !1,
                this.key = null
        }

        return t.prototype.setKey = function (t) {
            this.log && this.key,
                this.key = new nt(t)
        }
            ,
            t.prototype.setPrivateKey = function (t) {
                this.setKey(t)
            }
            ,
            t.prototype.setPublicKey = function (t) {
                this.setKey(t)
            }
            ,
            t.prototype.decrypt = function (t) {
                try {
                    return this.getKey().decrypt(h(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.encrypt = function (t) {
                try {
                    return l(this.getKey().encrypt(t))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.sign = function (t, e, n) {
                try {
                    return l(this.getKey().sign(t, e, n))
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.verify = function (t, e, n) {
                try {
                    return this.getKey().verify(t, h(e), n)
                } catch (t) {
                    return !1
                }
            }
            ,
            t.prototype.getKey = function (t) {
                if (!this.key) {
                    if (this.key = new nt,
                    t && "[object Function]" === {}.toString.call(t))
                        return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
                    this.key.generate(this.default_key_size, this.default_public_exponent)
                }
                return this.key
            }
            ,
            t.prototype.getPrivateKey = function () {
                return this.getKey().getPrivateKey()
            }
            ,
            t.prototype.getPrivateKeyB64 = function () {
                return this.getKey().getPrivateBaseKeyB64()
            }
            ,
            t.prototype.getPublicKey = function () {
                return this.getKey().getPublicKey()
            }
            ,
            t.prototype.getPublicKeyB64 = function () {
                return this.getKey().getPublicBaseKeyB64()
            }
            ,
            t.version = "3.0.0-rc.1",
            t
    }();
    window.JSEncrypt = rt,
        t.JSEncrypt = rt,
        t.default = rt,
        Object.defineProperty(t, "__esModule", {
            value: !0
        })
}(window);

function encryptPasswd(passwd) {
    const o = new window.JSEncrypt();
    o.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsy4xppPDUT2eAOR5h0cyydzxtKB9O80AGjUT6FmDgg6CwelpnE0C2h2JQyP1gCveJs6GDwSDn20RVVpD67f//YPYErjaH/CBOxNG3k5IkW1oQx04uqFNMtWvjzk0aFh2eJLsBi7Ha4elw3WySg00B8oZCL4VBay4ML9kyOAjjCj5jHCX8a2yxIMJIF+EjW3kBR68IMwBvuDL45Qa0oB24vTffaSEs+hGjMTQvoCciOfti3pmEAlVc438/cBgAhK5cIMfIMElxYAVvmsDy0I7RCUTrajetKjX94Q+JuQUxnIHNC3IVtYsl1x0lNRtb93IhlRCkZ9djOu350eqhZIOXQIDAQAB");
    return o.encrypt(passwd);
}

// console.log(encryptPasswd("123456"));


var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/*!
 * Chart.js v3.7.0
 * https://www.chartjs.org
 * (c) 2021 Chart.js Contributors
 * Released under the MIT License
 */
!function (t, e) { "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).Chart = e(); }(this, (function () {
    "use strict";
    var t = "undefined" == typeof window ? function (t) { return t(); } : window.requestAnimationFrame;
    function e(e, i, s) { var n = s || (function (t) { return Array.prototype.slice.call(t); }); var o = !1, a = []; return function () {
        var s = [];
        for (var _b = 0; _b < arguments.length; _b++) {
            s[_b] = arguments[_b];
        }
        a = n(s), o || (o = !0, t.call(window, (function () { o = !1, e.apply(i, a); })));
    }; }
    function i(t, e) { var i; return function () {
        var s = [];
        for (var _b = 0; _b < arguments.length; _b++) {
            s[_b] = arguments[_b];
        }
        return e ? (clearTimeout(i), i = setTimeout(t, e, s)) : t.apply(this, s), e;
    }; }
    var s = function (t) { return "start" === t ? "left" : "end" === t ? "right" : "center"; }, n = function (t, e, i) { return "start" === t ? e : "end" === t ? i : (e + i) / 2; }, o = function (t, e, i, s) { return t === (s ? "left" : "right") ? i : "center" === t ? (e + i) / 2 : e; };
    var a = new /** @class */ (function () {
        function class_1() {
            this._request = null, this._charts = new Map, this._running = !1, this._lastDate = void 0;
        }
        class_1.prototype._notify = function (t, e, i, s) { var n = e.listeners[s], o = e.duration; n.forEach((function (s) { return s({ chart: t, initial: e.initial, numSteps: o, currentStep: Math.min(i - e.start, o) }); })); };
        class_1.prototype._refresh = function () {
            var _this = this;
            this._request || (this._running = !0, this._request = t.call(window, (function () { _this._update(), _this._request = null, _this._running && _this._refresh(); })));
        };
        class_1.prototype._update = function (t) {
            var _this = this;
            if (t === void 0) { t = Date.now(); }
            var e = 0;
            this._charts.forEach((function (i, s) { if (!i.running || !i.items.length)
                return; var n = i.items; var o, a = n.length - 1, r = !1; for (; a >= 0; --a)
                o = n[a], o._active ? (o._total > i.duration && (i.duration = o._total), o.tick(t), r = !0) : (n[a] = n[n.length - 1], n.pop()); r && (s.draw(), _this._notify(s, i, t, "progress")), n.length || (i.running = !1, _this._notify(s, i, t, "complete"), i.initial = !1), e += n.length; })), this._lastDate = t, 0 === e && (this._running = !1);
        };
        class_1.prototype._getAnims = function (t) { var e = this._charts; var i = e.get(t); return i || (i = { running: !1, initial: !0, items: [], listeners: { complete: [], progress: [] } }, e.set(t, i)), i; };
        class_1.prototype.listen = function (t, e, i) { this._getAnims(t).listeners[e].push(i); };
        class_1.prototype.add = function (t, e) {
            var _b;
            e && e.length && (_b = this._getAnims(t).items).push.apply(_b, e);
        };
        class_1.prototype.has = function (t) { return this._getAnims(t).items.length > 0; };
        class_1.prototype.start = function (t) { var e = this._charts.get(t); e && (e.running = !0, e.start = Date.now(), e.duration = e.items.reduce((function (t, e) { return Math.max(t, e._duration); }), 0), this._refresh()); };
        class_1.prototype.running = function (t) { if (!this._running)
            return !1; var e = this._charts.get(t); return !!(e && e.running && e.items.length); };
        class_1.prototype.stop = function (t) { var e = this._charts.get(t); if (!e || !e.items.length)
            return; var i = e.items; var s = i.length - 1; for (; s >= 0; --s)
            i[s].cancel(); e.items = [], this._notify(t, e, Date.now(), "complete"); };
        class_1.prototype.remove = function (t) { return this._charts.delete(t); };
        return class_1;
    }());
    /*!
     * @kurkle/color v0.1.9
     * https://github.com/kurkle/color#readme
     * (c) 2020 Jukka Kurkela
     * Released under the MIT License
     */ var r = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 }, l = "0123456789ABCDEF", h = function (t) { return l[15 & t]; }, c = function (t) { return l[(240 & t) >> 4] + l[15 & t]; }, d = function (t) { return (240 & t) >> 4 == (15 & t); };
    function u(t) { var e = function (t) { return d(t.r) && d(t.g) && d(t.b) && d(t.a); }(t) ? h : c; return t ? "#" + e(t.r) + e(t.g) + e(t.b) + (t.a < 255 ? e(t.a) : "") : t; }
    function f(t) { return t + .5 | 0; }
    var g = function (t, e, i) { return Math.max(Math.min(t, i), e); };
    function p(t) { return g(f(2.55 * t), 0, 255); }
    function m(t) { return g(f(255 * t), 0, 255); }
    function x(t) { return g(f(t / 2.55) / 100, 0, 1); }
    function b(t) { return g(f(100 * t), 0, 100); }
    var _ = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
    var y = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
    function v(t, e, i) { var s = e * Math.min(i, 1 - i), n = function (e, n) {
        if (n === void 0) { n = (e + t / 30) % 12; }
        return i - s * Math.max(Math.min(n - 3, 9 - n, 1), -1);
    }; return [n(0), n(8), n(4)]; }
    function w(t, e, i) { var s = function (s, n) {
        if (n === void 0) { n = (s + t / 60) % 6; }
        return i - i * e * Math.max(Math.min(n, 4 - n, 1), 0);
    }; return [s(5), s(3), s(1)]; }
    function M(t, e, i) { var s = v(t, 1, .5); var n; for (e + i > 1 && (n = 1 / (e + i), e *= n, i *= n), n = 0; n < 3; n++)
        s[n] *= 1 - e - i, s[n] += e; return s; }
    function k(t) { var e = t.r / 255, i = t.g / 255, s = t.b / 255, n = Math.max(e, i, s), o = Math.min(e, i, s), a = (n + o) / 2; var r, l, h; return n !== o && (h = n - o, l = a > .5 ? h / (2 - n - o) : h / (n + o), r = n === e ? (i - s) / h + (i < s ? 6 : 0) : n === i ? (s - e) / h + 2 : (e - i) / h + 4, r = 60 * r + .5), [0 | r, l || 0, a]; }
    function S(t, e, i, s) { return (Array.isArray(e) ? t(e[0], e[1], e[2]) : t(e, i, s)).map(m); }
    function P(t, e, i) { return S(v, t, e, i); }
    function D(t) { return (t % 360 + 360) % 360; }
    function C(t) { var e = y.exec(t); var i, s = 255; if (!e)
        return; e[5] !== i && (s = e[6] ? p(+e[5]) : m(+e[5])); var n = D(+e[2]), o = +e[3] / 100, a = +e[4] / 100; return i = "hwb" === e[1] ? function (t, e, i) { return S(M, t, e, i); }(n, o, a) : "hsv" === e[1] ? function (t, e, i) { return S(w, t, e, i); }(n, o, a) : P(n, o, a), { r: i[0], g: i[1], b: i[2], a: s }; }
    var O = { x: "dark", Z: "light", Y: "re", X: "blu", W: "gr", V: "medium", U: "slate", A: "ee", T: "ol", S: "or", B: "ra", C: "lateg", D: "ights", R: "in", Q: "turquois", E: "hi", P: "ro", O: "al", N: "le", M: "de", L: "yello", F: "en", K: "ch", G: "arks", H: "ea", I: "ightg", J: "wh" }, A = { OiceXe: "f0f8ff", antiquewEte: "faebd7", aqua: "ffff", aquamarRe: "7fffd4", azuY: "f0ffff", beige: "f5f5dc", bisque: "ffe4c4", black: "0", blanKedOmond: "ffebcd", Xe: "ff", XeviTet: "8a2be2", bPwn: "a52a2a", burlywood: "deb887", caMtXe: "5f9ea0", KartYuse: "7fff00", KocTate: "d2691e", cSO: "ff7f50", cSnflowerXe: "6495ed", cSnsilk: "fff8dc", crimson: "dc143c", cyan: "ffff", xXe: "8b", xcyan: "8b8b", xgTMnPd: "b8860b", xWay: "a9a9a9", xgYF: "6400", xgYy: "a9a9a9", xkhaki: "bdb76b", xmagFta: "8b008b", xTivegYF: "556b2f", xSange: "ff8c00", xScEd: "9932cc", xYd: "8b0000", xsOmon: "e9967a", xsHgYF: "8fbc8f", xUXe: "483d8b", xUWay: "2f4f4f", xUgYy: "2f4f4f", xQe: "ced1", xviTet: "9400d3", dAppRk: "ff1493", dApskyXe: "bfff", dimWay: "696969", dimgYy: "696969", dodgerXe: "1e90ff", fiYbrick: "b22222", flSOwEte: "fffaf0", foYstWAn: "228b22", fuKsia: "ff00ff", gaRsbSo: "dcdcdc", ghostwEte: "f8f8ff", gTd: "ffd700", gTMnPd: "daa520", Way: "808080", gYF: "8000", gYFLw: "adff2f", gYy: "808080", honeyMw: "f0fff0", hotpRk: "ff69b4", RdianYd: "cd5c5c", Rdigo: "4b0082", ivSy: "fffff0", khaki: "f0e68c", lavFMr: "e6e6fa", lavFMrXsh: "fff0f5", lawngYF: "7cfc00", NmoncEffon: "fffacd", ZXe: "add8e6", ZcSO: "f08080", Zcyan: "e0ffff", ZgTMnPdLw: "fafad2", ZWay: "d3d3d3", ZgYF: "90ee90", ZgYy: "d3d3d3", ZpRk: "ffb6c1", ZsOmon: "ffa07a", ZsHgYF: "20b2aa", ZskyXe: "87cefa", ZUWay: "778899", ZUgYy: "778899", ZstAlXe: "b0c4de", ZLw: "ffffe0", lime: "ff00", limegYF: "32cd32", lRF: "faf0e6", magFta: "ff00ff", maPon: "800000", VaquamarRe: "66cdaa", VXe: "cd", VScEd: "ba55d3", VpurpN: "9370db", VsHgYF: "3cb371", VUXe: "7b68ee", VsprRggYF: "fa9a", VQe: "48d1cc", VviTetYd: "c71585", midnightXe: "191970", mRtcYam: "f5fffa", mistyPse: "ffe4e1", moccasR: "ffe4b5", navajowEte: "ffdead", navy: "80", Tdlace: "fdf5e6", Tive: "808000", TivedBb: "6b8e23", Sange: "ffa500", SangeYd: "ff4500", ScEd: "da70d6", pOegTMnPd: "eee8aa", pOegYF: "98fb98", pOeQe: "afeeee", pOeviTetYd: "db7093", papayawEp: "ffefd5", pHKpuff: "ffdab9", peru: "cd853f", pRk: "ffc0cb", plum: "dda0dd", powMrXe: "b0e0e6", purpN: "800080", YbeccapurpN: "663399", Yd: "ff0000", Psybrown: "bc8f8f", PyOXe: "4169e1", saddNbPwn: "8b4513", sOmon: "fa8072", sandybPwn: "f4a460", sHgYF: "2e8b57", sHshell: "fff5ee", siFna: "a0522d", silver: "c0c0c0", skyXe: "87ceeb", UXe: "6a5acd", UWay: "708090", UgYy: "708090", snow: "fffafa", sprRggYF: "ff7f", stAlXe: "4682b4", tan: "d2b48c", teO: "8080", tEstN: "d8bfd8", tomato: "ff6347", Qe: "40e0d0", viTet: "ee82ee", JHt: "f5deb3", wEte: "ffffff", wEtesmoke: "f5f5f5", Lw: "ffff00", LwgYF: "9acd32" };
    var T;
    function L(t) { T || (T = function () { var t = {}, e = Object.keys(A), i = Object.keys(O); var s, n, o, a, r; for (s = 0; s < e.length; s++) {
        for (a = r = e[s], n = 0; n < i.length; n++)
            o = i[n], r = r.replace(o, O[o]);
        o = parseInt(A[a], 16), t[r] = [o >> 16 & 255, o >> 8 & 255, 255 & o];
    } return t; }(), T.transparent = [0, 0, 0, 0]); var e = T[t.toLowerCase()]; return e && { r: e[0], g: e[1], b: e[2], a: 4 === e.length ? e[3] : 255 }; }
    function R(t, e, i) { if (t) {
        var s_1 = k(t);
        s_1[e] = Math.max(0, Math.min(s_1[e] + s_1[e] * i, 0 === e ? 360 : 1)), s_1 = P(s_1), t.r = s_1[0], t.g = s_1[1], t.b = s_1[2];
    } }
    function E(t, e) { return t ? Object.assign(e || {}, t) : t; }
    function I(t) { var e = { r: 0, g: 0, b: 0, a: 255 }; return Array.isArray(t) ? t.length >= 3 && (e = { r: t[0], g: t[1], b: t[2], a: 255 }, t.length > 3 && (e.a = m(t[3]))) : (e = E(t, { r: 0, g: 0, b: 0, a: 1 })).a = m(e.a), e; }
    function z(t) { return "r" === t.charAt(0) ? function (t) { var e = _.exec(t); var i, s, n, o = 255; if (e) {
        if (e[7] !== i) {
            var t_1 = +e[7];
            o = 255 & (e[8] ? p(t_1) : 255 * t_1);
        }
        return i = +e[1], s = +e[3], n = +e[5], i = 255 & (e[2] ? p(i) : i), s = 255 & (e[4] ? p(s) : s), n = 255 & (e[6] ? p(n) : n), { r: i, g: s, b: n, a: o };
    } }(t) : C(t); }
    var F = /** @class */ (function () {
        function F(t) {
            if (t instanceof F)
                return t;
            var e = typeof t;
            var i;
            var s, n, o;
            "object" === e ? i = I(t) : "string" === e && (o = (s = t).length, "#" === s[0] && (4 === o || 5 === o ? n = { r: 255 & 17 * r[s[1]], g: 255 & 17 * r[s[2]], b: 255 & 17 * r[s[3]], a: 5 === o ? 17 * r[s[4]] : 255 } : 7 !== o && 9 !== o || (n = { r: r[s[1]] << 4 | r[s[2]], g: r[s[3]] << 4 | r[s[4]], b: r[s[5]] << 4 | r[s[6]], a: 9 === o ? r[s[7]] << 4 | r[s[8]] : 255 })), i = n || L(t) || z(t)), this._rgb = i, this._valid = !!i;
        }
        Object.defineProperty(F.prototype, "valid", {
            get: function () { return this._valid; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(F.prototype, "rgb", {
            get: function () { var t = E(this._rgb); return t && (t.a = x(t.a)), t; },
            set: function (t) { this._rgb = I(t); },
            enumerable: false,
            configurable: true
        });
        F.prototype.rgbString = function () { return this._valid ? (t = this._rgb) && (t.a < 255 ? "rgba(".concat(t.r, ", ").concat(t.g, ", ").concat(t.b, ", ").concat(x(t.a), ")") : "rgb(".concat(t.r, ", ").concat(t.g, ", ").concat(t.b, ")")) : this._rgb; var t; };
        F.prototype.hexString = function () { return this._valid ? u(this._rgb) : this._rgb; };
        F.prototype.hslString = function () { return this._valid ? function (t) { if (!t)
            return; var e = k(t), i = e[0], s = b(e[1]), n = b(e[2]); return t.a < 255 ? "hsla(".concat(i, ", ").concat(s, "%, ").concat(n, "%, ").concat(x(t.a), ")") : "hsl(".concat(i, ", ").concat(s, "%, ").concat(n, "%)"); }(this._rgb) : this._rgb; };
        F.prototype.mix = function (t, e) { var i = this; if (t) {
            var s_2 = i.rgb, n_1 = t.rgb;
            var o_1;
            var a_1 = e === o_1 ? .5 : e, r_1 = 2 * a_1 - 1, l_1 = s_2.a - n_1.a, h_1 = ((r_1 * l_1 == -1 ? r_1 : (r_1 + l_1) / (1 + r_1 * l_1)) + 1) / 2;
            o_1 = 1 - h_1, s_2.r = 255 & h_1 * s_2.r + o_1 * n_1.r + .5, s_2.g = 255 & h_1 * s_2.g + o_1 * n_1.g + .5, s_2.b = 255 & h_1 * s_2.b + o_1 * n_1.b + .5, s_2.a = a_1 * s_2.a + (1 - a_1) * n_1.a, i.rgb = s_2;
        } return i; };
        F.prototype.clone = function () { return new F(this.rgb); };
        F.prototype.alpha = function (t) { return this._rgb.a = m(t), this; };
        F.prototype.clearer = function (t) { return this._rgb.a *= 1 - t, this; };
        F.prototype.greyscale = function () { var t = this._rgb, e = f(.3 * t.r + .59 * t.g + .11 * t.b); return t.r = t.g = t.b = e, this; };
        F.prototype.opaquer = function (t) { return this._rgb.a *= 1 + t, this; };
        F.prototype.negate = function () { var t = this._rgb; return t.r = 255 - t.r, t.g = 255 - t.g, t.b = 255 - t.b, this; };
        F.prototype.lighten = function (t) { return R(this._rgb, 2, t), this; };
        F.prototype.darken = function (t) { return R(this._rgb, 2, -t), this; };
        F.prototype.saturate = function (t) { return R(this._rgb, 1, t), this; };
        F.prototype.desaturate = function (t) { return R(this._rgb, 1, -t), this; };
        F.prototype.rotate = function (t) { return function (t, e) { var i = k(t); i[0] = D(i[0] + e), i = P(i), t.r = i[0], t.g = i[1], t.b = i[2]; }(this._rgb, t), this; };
        return F;
    }());
    function B(t) { return new F(t); }
    var V = function (t) { return t instanceof CanvasGradient || t instanceof CanvasPattern; };
    function W(t) { return V(t) ? t : B(t); }
    function N(t) { return V(t) ? t : B(t).saturate(.5).darken(.1).hexString(); }
    function H() { }
    var j = function () { var t = 0; return function () { return t++; }; }();
    function $(t) { return null == t; }
    function Y(t) { if (Array.isArray && Array.isArray(t))
        return !0; var e = Object.prototype.toString.call(t); return "[object" === e.substr(0, 7) && "Array]" === e.substr(-6); }
    function U(t) { return null !== t && "[object Object]" === Object.prototype.toString.call(t); }
    var X = function (t) { return ("number" == typeof t || t instanceof Number) && isFinite(+t); };
    function q(t, e) { return X(t) ? t : e; }
    function K(t, e) { return void 0 === t ? e : t; }
    var G = function (t, e) { return "string" == typeof t && t.endsWith("%") ? parseFloat(t) / 100 : t / e; }, Z = function (t, e) { return "string" == typeof t && t.endsWith("%") ? parseFloat(t) / 100 * e : +t; };
    function J(t, e, i) { if (t && "function" == typeof t.call)
        return t.apply(i, e); }
    function Q(t, e, i, s) { var n, o, a; if (Y(t))
        if (o = t.length, s)
            for (n = o - 1; n >= 0; n--)
                e.call(i, t[n], n);
        else
            for (n = 0; n < o; n++)
                e.call(i, t[n], n);
    else if (U(t))
        for (a = Object.keys(t), o = a.length, n = 0; n < o; n++)
            e.call(i, t[a[n]], a[n]); }
    function tt(t, e) { var i, s, n, o; if (!t || !e || t.length !== e.length)
        return !1; for (i = 0, s = t.length; i < s; ++i)
        if (n = t[i], o = e[i], n.datasetIndex !== o.datasetIndex || n.index !== o.index)
            return !1; return !0; }
    function et(t) { if (Y(t))
        return t.map(et); if (U(t)) {
        var e_1 = Object.create(null), i_1 = Object.keys(t), s_3 = i_1.length;
        var n_2 = 0;
        for (; n_2 < s_3; ++n_2)
            e_1[i_1[n_2]] = et(t[i_1[n_2]]);
        return e_1;
    } return t; }
    function it(t) { return -1 === ["__proto__", "prototype", "constructor"].indexOf(t); }
    function st(t, e, i, s) { if (!it(t))
        return; var n = e[t], o = i[t]; U(n) && U(o) ? nt(n, o, s) : e[t] = et(o); }
    function nt(t, e, i) { var s = Y(e) ? e : [e], n = s.length; if (!U(t))
        return t; var o = (i = i || {}).merger || st; for (var a_2 = 0; a_2 < n; ++a_2) {
        if (!U(e = s[a_2]))
            continue;
        var n_3 = Object.keys(e);
        for (var s_4 = 0, a_3 = n_3.length; s_4 < a_3; ++s_4)
            o(n_3[s_4], t, e, i);
    } return t; }
    function ot(t, e) { return nt(t, e, { merger: at }); }
    function at(t, e, i) { if (!it(t))
        return; var s = e[t], n = i[t]; U(s) && U(n) ? ot(s, n) : Object.prototype.hasOwnProperty.call(e, t) || (e[t] = et(n)); }
    function rt(t, e) { var i = t.indexOf(".", e); return -1 === i ? t.length : i; }
    function lt(t, e) { if ("" === e)
        return t; var i = 0, s = rt(e, i); for (; t && s > i;)
        t = t[e.substr(i, s - i)], i = s + 1, s = rt(e, i); return t; }
    function ht(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
    var ct = function (t) { return void 0 !== t; }, dt = function (t) { return "function" == typeof t; }, ut = function (t, e) { if (t.size !== e.size)
        return !1; for (var _b = 0, t_2 = t; _b < t_2.length; _b++) {
        var i_2 = t_2[_b];
        if (!e.has(i_2))
            return !1;
    } return !0; };
    function ft(t) { return "mouseup" === t.type || "click" === t.type || "contextmenu" === t.type; }
    var gt = Object.create(null), pt = Object.create(null);
    function mt(t, e) { if (!e)
        return t; var i = e.split("."); for (var e_2 = 0, s_5 = i.length; e_2 < s_5; ++e_2) {
        var s_6 = i[e_2];
        t = t[s_6] || (t[s_6] = Object.create(null));
    } return t; }
    function xt(t, e, i) { return "string" == typeof e ? nt(mt(t, e), i) : nt(mt(t, ""), e); }
    var bt = new /** @class */ (function () {
        function class_2(t) {
            this.animation = void 0, this.backgroundColor = "rgba(0,0,0,0.1)", this.borderColor = "rgba(0,0,0,0.1)", this.color = "#666", this.datasets = {}, this.devicePixelRatio = function (t) { return t.chart.platform.getDevicePixelRatio(); }, this.elements = {}, this.events = ["mousemove", "mouseout", "click", "touchstart", "touchmove"], this.font = { family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", size: 12, style: "normal", lineHeight: 1.2, weight: null }, this.hover = {}, this.hoverBackgroundColor = function (t, e) { return N(e.backgroundColor); }, this.hoverBorderColor = function (t, e) { return N(e.borderColor); }, this.hoverColor = function (t, e) { return N(e.color); }, this.indexAxis = "x", this.interaction = { mode: "nearest", intersect: !0 }, this.maintainAspectRatio = !0, this.onHover = null, this.onClick = null, this.parsing = !0, this.plugins = {}, this.responsive = !0, this.scale = void 0, this.scales = {}, this.showLine = !0, this.drawActiveElementsOnTop = !0, this.describe(t);
        }
        class_2.prototype.set = function (t, e) { return xt(this, t, e); };
        class_2.prototype.get = function (t) { return mt(this, t); };
        class_2.prototype.describe = function (t, e) { return xt(pt, t, e); };
        class_2.prototype.override = function (t, e) { return xt(gt, t, e); };
        class_2.prototype.route = function (t, e, i, s) {
            var _b;
            var n = mt(this, t), o = mt(this, i), a = "_" + e;
            Object.defineProperties(n, (_b = {}, _b[a] = { value: n[e], writable: !0 }, _b[e] = { enumerable: !0, get: function () { var t = this[a], e = o[s]; return U(t) ? Object.assign({}, e, t) : K(t, e); }, set: function (t) { this[a] = t; } }, _b));
        };
        return class_2;
    }())({ _scriptable: function (t) { return !t.startsWith("on"); }, _indexable: function (t) { return "events" !== t; }, hover: { _fallback: "interaction" }, interaction: { _scriptable: !1, _indexable: !1 } });
    var _t = Math.PI, yt = 2 * _t, vt = yt + _t, wt = Number.POSITIVE_INFINITY, Mt = _t / 180, kt = _t / 2, St = _t / 4, Pt = 2 * _t / 3, Dt = Math.log10, Ct = Math.sign;
    function Ot(t) { var e = Math.round(t); t = Lt(t, e, t / 1e3) ? e : t; var i = Math.pow(10, Math.floor(Dt(t))), s = t / i; return (s <= 1 ? 1 : s <= 2 ? 2 : s <= 5 ? 5 : 10) * i; }
    function At(t) { var e = [], i = Math.sqrt(t); var s; for (s = 1; s < i; s++)
        t % s == 0 && (e.push(s), e.push(t / s)); return i === (0 | i) && e.push(i), e.sort((function (t, e) { return t - e; })).pop(), e; }
    function Tt(t) { return !isNaN(parseFloat(t)) && isFinite(t); }
    function Lt(t, e, i) { return Math.abs(t - e) < i; }
    function Rt(t, e) { var i = Math.round(t); return i - e <= t && i + e >= t; }
    function Et(t, e, i) { var s, n, o; for (s = 0, n = t.length; s < n; s++)
        o = t[s][i], isNaN(o) || (e.min = Math.min(e.min, o), e.max = Math.max(e.max, o)); }
    function It(t) { return t * (_t / 180); }
    function zt(t) { return t * (180 / _t); }
    function Ft(t) { if (!X(t))
        return; var e = 1, i = 0; for (; Math.round(t * e) / e !== t;)
        e *= 10, i++; return i; }
    function Bt(t, e) { var i = e.x - t.x, s = e.y - t.y, n = Math.sqrt(i * i + s * s); var o = Math.atan2(s, i); return o < -.5 * _t && (o += yt), { angle: o, distance: n }; }
    function Vt(t, e) { return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)); }
    function Wt(t, e) { return (t - e + vt) % yt - _t; }
    function Nt(t) { return (t % yt + yt) % yt; }
    function Ht(t, e, i, s) { var n = Nt(t), o = Nt(e), a = Nt(i), r = Nt(o - n), l = Nt(a - n), h = Nt(n - o), c = Nt(n - a); return n === o || n === a || s && o === a || r > l && h < c; }
    function jt(t, e, i) { return Math.max(e, Math.min(i, t)); }
    function $t(t) { return jt(t, -32768, 32767); }
    function Yt(t, e, i, s) {
        if (s === void 0) { s = 1e-6; }
        return t >= Math.min(e, i) - s && t <= Math.max(e, i) + s;
    }
    function Ut(t) { return !t || $(t.size) || $(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family; }
    function Xt(t, e, i, s, n) { var o = e[n]; return o || (o = e[n] = t.measureText(n).width, i.push(n)), o > s && (s = o), s; }
    function qt(t, e, i, s) { var n = (s = s || {}).data = s.data || {}, o = s.garbageCollect = s.garbageCollect || []; s.font !== e && (n = s.data = {}, o = s.garbageCollect = [], s.font = e), t.save(), t.font = e; var a = 0; var r = i.length; var l, h, c, d, u; for (l = 0; l < r; l++)
        if (d = i[l], null != d && !0 !== Y(d))
            a = Xt(t, n, o, a, d);
        else if (Y(d))
            for (h = 0, c = d.length; h < c; h++)
                u = d[h], null == u || Y(u) || (a = Xt(t, n, o, a, u)); t.restore(); var f = o.length / 2; if (f > i.length) {
        for (l = 0; l < f; l++)
            delete n[o[l]];
        o.splice(0, f);
    } return a; }
    function Kt(t, e, i) { var s = t.currentDevicePixelRatio, n = 0 !== i ? Math.max(i / 2, .5) : 0; return Math.round((e - n) * s) / s + n; }
    function Gt(t, e) { (e = e || t.getContext("2d")).save(), e.resetTransform(), e.clearRect(0, 0, t.width, t.height), e.restore(); }
    function Zt(t, e, i, s) { var n, o, a, r, l; var h = e.pointStyle, c = e.rotation, d = e.radius; var u = (c || 0) * Mt; if (h && "object" == typeof h && (n = h.toString(), "[object HTMLImageElement]" === n || "[object HTMLCanvasElement]" === n))
        return t.save(), t.translate(i, s), t.rotate(u), t.drawImage(h, -h.width / 2, -h.height / 2, h.width, h.height), void t.restore(); if (!(isNaN(d) || d <= 0)) {
        switch (t.beginPath(), h) {
            default:
                t.arc(i, s, d, 0, yt), t.closePath();
                break;
            case "triangle":
                t.moveTo(i + Math.sin(u) * d, s - Math.cos(u) * d), u += Pt, t.lineTo(i + Math.sin(u) * d, s - Math.cos(u) * d), u += Pt, t.lineTo(i + Math.sin(u) * d, s - Math.cos(u) * d), t.closePath();
                break;
            case "rectRounded":
                l = .516 * d, r = d - l, o = Math.cos(u + St) * r, a = Math.sin(u + St) * r, t.arc(i - o, s - a, l, u - _t, u - kt), t.arc(i + a, s - o, l, u - kt, u), t.arc(i + o, s + a, l, u, u + kt), t.arc(i - a, s + o, l, u + kt, u + _t), t.closePath();
                break;
            case "rect":
                if (!c) {
                    r = Math.SQRT1_2 * d, t.rect(i - r, s - r, 2 * r, 2 * r);
                    break;
                }
                u += St;
            case "rectRot":
                o = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - o, s - a), t.lineTo(i + a, s - o), t.lineTo(i + o, s + a), t.lineTo(i - a, s + o), t.closePath();
                break;
            case "crossRot": u += St;
            case "cross":
                o = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - o, s - a), t.lineTo(i + o, s + a), t.moveTo(i + a, s - o), t.lineTo(i - a, s + o);
                break;
            case "star":
                o = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - o, s - a), t.lineTo(i + o, s + a), t.moveTo(i + a, s - o), t.lineTo(i - a, s + o), u += St, o = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - o, s - a), t.lineTo(i + o, s + a), t.moveTo(i + a, s - o), t.lineTo(i - a, s + o);
                break;
            case "line":
                o = Math.cos(u) * d, a = Math.sin(u) * d, t.moveTo(i - o, s - a), t.lineTo(i + o, s + a);
                break;
            case "dash": t.moveTo(i, s), t.lineTo(i + Math.cos(u) * d, s + Math.sin(u) * d);
        }
        t.fill(), e.borderWidth > 0 && t.stroke();
    } }
    function Jt(t, e, i) { return i = i || .5, !e || t && t.x > e.left - i && t.x < e.right + i && t.y > e.top - i && t.y < e.bottom + i; }
    function Qt(t, e) { t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip(); }
    function te(t) { t.restore(); }
    function ee(t, e, i, s, n) { if (!e)
        return t.lineTo(i.x, i.y); if ("middle" === n) {
        var s_7 = (e.x + i.x) / 2;
        t.lineTo(s_7, e.y), t.lineTo(s_7, i.y);
    }
    else
        "after" === n != !!s ? t.lineTo(e.x, i.y) : t.lineTo(i.x, e.y); t.lineTo(i.x, i.y); }
    function ie(t, e, i, s) { if (!e)
        return t.lineTo(i.x, i.y); t.bezierCurveTo(s ? e.cp1x : e.cp2x, s ? e.cp1y : e.cp2y, s ? i.cp2x : i.cp1x, s ? i.cp2y : i.cp1y, i.x, i.y); }
    function se(t, e, i, s, n, o) {
        if (o === void 0) { o = {}; }
        var a = Y(e) ? e : [e], r = o.strokeWidth > 0 && "" !== o.strokeColor;
        var l, h;
        for (t.save(), t.font = n.string, function (t, e) { e.translation && t.translate(e.translation[0], e.translation[1]); $(e.rotation) || t.rotate(e.rotation); e.color && (t.fillStyle = e.color); e.textAlign && (t.textAlign = e.textAlign); e.textBaseline && (t.textBaseline = e.textBaseline); }(t, o), l = 0; l < a.length; ++l)
            h = a[l], r && (o.strokeColor && (t.strokeStyle = o.strokeColor), $(o.strokeWidth) || (t.lineWidth = o.strokeWidth), t.strokeText(h, i, s, o.maxWidth)), t.fillText(h, i, s, o.maxWidth), ne(t, i, s, h, o), s += n.lineHeight;
        t.restore();
    }
    function ne(t, e, i, s, n) { if (n.strikethrough || n.underline) {
        var o_2 = t.measureText(s), a_4 = e - o_2.actualBoundingBoxLeft, r_2 = e + o_2.actualBoundingBoxRight, l_2 = i - o_2.actualBoundingBoxAscent, h_2 = i + o_2.actualBoundingBoxDescent, c_1 = n.strikethrough ? (l_2 + h_2) / 2 : h_2;
        t.strokeStyle = t.fillStyle, t.beginPath(), t.lineWidth = n.decorationWidth || 2, t.moveTo(a_4, c_1), t.lineTo(r_2, c_1), t.stroke();
    } }
    function oe(t, e) { var i = e.x, s = e.y, n = e.w, o = e.h, a = e.radius; t.arc(i + a.topLeft, s + a.topLeft, a.topLeft, -kt, _t, !0), t.lineTo(i, s + o - a.bottomLeft), t.arc(i + a.bottomLeft, s + o - a.bottomLeft, a.bottomLeft, _t, kt, !0), t.lineTo(i + n - a.bottomRight, s + o), t.arc(i + n - a.bottomRight, s + o - a.bottomRight, a.bottomRight, kt, 0, !0), t.lineTo(i + n, s + a.topRight), t.arc(i + n - a.topRight, s + a.topRight, a.topRight, 0, -kt, !0), t.lineTo(i + a.topLeft, s); }
    function ae(t, e, i) { i = i || (function (i) { return t[i] < e; }); var s, n = t.length - 1, o = 0; for (; n - o > 1;)
        s = o + n >> 1, i(s) ? o = s : n = s; return { lo: o, hi: n }; }
    var re = function (t, e, i) { return ae(t, i, (function (s) { return t[s][e] < i; })); }, le = function (t, e, i) { return ae(t, i, (function (s) { return t[s][e] >= i; })); };
    function he(t, e, i) { var s = 0, n = t.length; for (; s < n && t[s] < e;)
        s++; for (; n > s && t[n - 1] > i;)
        n--; return s > 0 || n < t.length ? t.slice(s, n) : t; }
    var ce = ["push", "pop", "shift", "splice", "unshift"];
    function de(t, e) { t._chartjs ? t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", { configurable: !0, enumerable: !1, value: { listeners: [e] } }), ce.forEach((function (e) { var i = "_onData" + ht(e), s = t[e]; Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: function () {
            var e = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                e[_b] = arguments[_b];
            }
            var n = s.apply(this, e);
            return t._chartjs.listeners.forEach((function (t) { "function" == typeof t[i] && t[i].apply(t, e); })), n;
        } }); }))); }
    function ue(t, e) { var i = t._chartjs; if (!i)
        return; var s = i.listeners, n = s.indexOf(e); -1 !== n && s.splice(n, 1), s.length > 0 || (ce.forEach((function (e) { delete t[e]; })), delete t._chartjs); }
    function fe(t) { var e = new Set; var i, s; for (i = 0, s = t.length; i < s; ++i)
        e.add(t[i]); return e.size === s ? t : Array.from(e); }
    function ge() { return "undefined" != typeof window && "undefined" != typeof document; }
    function pe(t) { var e = t.parentNode; return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e; }
    function me(t, e, i) { var s; return "string" == typeof t ? (s = parseInt(t, 10), -1 !== t.indexOf("%") && (s = s / 100 * e.parentNode[i])) : s = t, s; }
    var xe = function (t) { return window.getComputedStyle(t, null); };
    function be(t, e) { return xe(t).getPropertyValue(e); }
    var _e = ["top", "right", "bottom", "left"];
    function ye(t, e, i) { var s = {}; i = i ? "-" + i : ""; for (var n_4 = 0; n_4 < 4; n_4++) {
        var o_3 = _e[n_4];
        s[o_3] = parseFloat(t[e + "-" + o_3 + i]) || 0;
    } return s.width = s.left + s.right, s.height = s.top + s.bottom, s; }
    function ve(t, e) { var i = e.canvas, s = e.currentDevicePixelRatio, n = xe(i), o = "border-box" === n.boxSizing, a = ye(n, "padding"), r = ye(n, "border", "width"), _b = function (t, e) { var i = t.native || t, s = i.touches, n = s && s.length ? s[0] : i, o = n.offsetX, a = n.offsetY; var r, l, h = !1; if ((function (t, e, i) { return (t > 0 || e > 0) && (!i || !i.shadowRoot); })(o, a, i.target))
        r = o, l = a;
    else {
        var t_3 = e.getBoundingClientRect();
        r = n.clientX - t_3.left, l = n.clientY - t_3.top, h = !0;
    } return { x: r, y: l, box: h }; }(t, i), l = _b.x, h = _b.y, c = _b.box, d = a.left + (c && r.left), u = a.top + (c && r.top); var f = e.width, g = e.height; return o && (f -= a.width + r.width, g -= a.height + r.height), { x: Math.round((l - d) / f * i.width / s), y: Math.round((h - u) / g * i.height / s) }; }
    var we = function (t) { return Math.round(10 * t) / 10; };
    function Me(t, e, i, s) { var n = xe(t), o = ye(n, "margin"), a = me(n.maxWidth, t, "clientWidth") || wt, r = me(n.maxHeight, t, "clientHeight") || wt, l = function (t, e, i) { var s, n; if (void 0 === e || void 0 === i) {
        var o_4 = pe(t);
        if (o_4) {
            var t_4 = o_4.getBoundingClientRect(), a_5 = xe(o_4), r_3 = ye(a_5, "border", "width"), l_3 = ye(a_5, "padding");
            e = t_4.width - l_3.width - r_3.width, i = t_4.height - l_3.height - r_3.height, s = me(a_5.maxWidth, o_4, "clientWidth"), n = me(a_5.maxHeight, o_4, "clientHeight");
        }
        else
            e = t.clientWidth, i = t.clientHeight;
    } return { width: e, height: i, maxWidth: s || wt, maxHeight: n || wt }; }(t, e, i); var h = l.width, c = l.height; if ("content-box" === n.boxSizing) {
        var t_5 = ye(n, "border", "width"), e_3 = ye(n, "padding");
        h -= e_3.width + t_5.width, c -= e_3.height + t_5.height;
    } return h = Math.max(0, h - o.width), c = Math.max(0, s ? Math.floor(h / s) : c - o.height), h = we(Math.min(h, a, l.maxWidth)), c = we(Math.min(c, r, l.maxHeight)), h && !c && (c = we(h / 2)), { width: h, height: c }; }
    function ke(t, e, i) { var s = e || 1, n = Math.floor(t.height * s), o = Math.floor(t.width * s); t.height = n / s, t.width = o / s; var a = t.canvas; return a.style && (i || !a.style.height && !a.style.width) && (a.style.height = "".concat(t.height, "px"), a.style.width = "".concat(t.width, "px")), (t.currentDevicePixelRatio !== s || a.height !== n || a.width !== o) && (t.currentDevicePixelRatio = s, a.height = n, a.width = o, t.ctx.setTransform(s, 0, 0, s, 0, 0), !0); }
    var Se = function () { var t = !1; try {
        var e_4 = { get passive() { return t = !0, !1; } };
        window.addEventListener("test", null, e_4), window.removeEventListener("test", null, e_4);
    }
    catch (t) { } return t; }();
    function Pe(t, e) { var i = be(t, e), s = i && i.match(/^(\d+)(\.\d+)?px$/); return s ? +s[1] : void 0; }
    function De(t, e) { return "native" in t ? { x: t.x, y: t.y } : ve(t, e); }
    function Ce(t, e, i, s) { var n = t.controller, o = t.data, a = t._sorted, r = n._cachedMeta.iScale; if (r && e === r.axis && "r" !== e && a && o.length) {
        var t_6 = r._reversePixels ? le : re;
        if (!s)
            return t_6(o, e, i);
        if (n._sharedOptions) {
            var s_8 = o[0], n_5 = "function" == typeof s_8.getRange && s_8.getRange(e);
            if (n_5) {
                var s_9 = t_6(o, e, i - n_5), a_6 = t_6(o, e, i + n_5);
                return { lo: s_9.lo, hi: a_6.hi };
            }
        }
    } return { lo: 0, hi: o.length - 1 }; }
    function Oe(t, e, i, s, n) { var o = t.getSortedVisibleDatasetMetas(), a = i[e]; for (var t_7 = 0, i_3 = o.length; t_7 < i_3; ++t_7) {
        var _b = o[t_7], i_4 = _b.index, r_4 = _b.data, _c = Ce(o[t_7], e, a, n), l_4 = _c.lo, h_3 = _c.hi;
        for (var t_8 = l_4; t_8 <= h_3; ++t_8) {
            var e_5 = r_4[t_8];
            e_5.skip || s(e_5, i_4, t_8);
        }
    } }
    function Ae(t, e, i, s) { var n = []; if (!Jt(e, t.chartArea, t._minPadding))
        return n; return Oe(t, i, e, (function (t, i, o) { t.inRange(e.x, e.y, s) && n.push({ element: t, datasetIndex: i, index: o }); }), !0), n; }
    function Te(t, e, i, s, n) { var o = []; var a = function (t) { var e = -1 !== t.indexOf("x"), i = -1 !== t.indexOf("y"); return function (t, s) { var n = e ? Math.abs(t.x - s.x) : 0, o = i ? Math.abs(t.y - s.y) : 0; return Math.sqrt(Math.pow(n, 2) + Math.pow(o, 2)); }; }(i); var r = Number.POSITIVE_INFINITY; return Oe(t, i, e, (function (i, l, h) { var c = i.inRange(e.x, e.y, n); if (s && !c)
        return; var d = i.getCenterPoint(n); if (!Jt(d, t.chartArea, t._minPadding) && !c)
        return; var u = a(e, d); u < r ? (o = [{ element: i, datasetIndex: l, index: h }], r = u) : u === r && o.push({ element: i, datasetIndex: l, index: h }); })), o; }
    function Le(t, e, i, s, n) { return Jt(e, t.chartArea, t._minPadding) ? "r" !== i || s ? Te(t, e, i, s, n) : function (t, e, i, s) { var n = []; return Oe(t, i, e, (function (t, i, o) { var _b = t.getProps(["startAngle", "endAngle"], s), a = _b.startAngle, r = _b.endAngle, l = Bt(t, { x: e.x, y: e.y }).angle; Ht(l, a, r) && n.push({ element: t, datasetIndex: i, index: o }); })), n; }(t, e, i, n) : []; }
    function Re(t, e, i, s) { var n = De(e, t), o = [], a = i.axis, r = "x" === a ? "inXRange" : "inYRange"; var l = !1; return function (t, e) {
        var _b;
        var i = t.getSortedVisibleDatasetMetas();
        var s, n, o;
        for (var t_9 = 0, a_7 = i.length; t_9 < a_7; ++t_9) {
            (_b = i[t_9], s = _b.index, n = _b.data);
            for (var t_10 = 0, i_5 = n.length; t_10 < i_5; ++t_10)
                o = n[t_10], o.skip || e(o, s, t_10);
        }
    }(t, (function (t, e, i) { t[r](n[a], s) && o.push({ element: t, datasetIndex: e, index: i }), t.inRange(n.x, n.y, s) && (l = !0); })), i.intersect && !l ? [] : o; }
    var Ee = { modes: { index: function (t, e, i, s) { var n = De(e, t), o = i.axis || "x", a = i.intersect ? Ae(t, n, o, s) : Le(t, n, o, !1, s), r = []; return a.length ? (t.getSortedVisibleDatasetMetas().forEach((function (t) { var e = a[0].index, i = t.data[e]; i && !i.skip && r.push({ element: i, datasetIndex: t.index, index: e }); })), r) : []; }, dataset: function (t, e, i, s) { var n = De(e, t), o = i.axis || "xy"; var a = i.intersect ? Ae(t, n, o, s) : Le(t, n, o, !1, s); if (a.length > 0) {
                var e_6 = a[0].datasetIndex, i_6 = t.getDatasetMeta(e_6).data;
                a = [];
                for (var t_11 = 0; t_11 < i_6.length; ++t_11)
                    a.push({ element: i_6[t_11], datasetIndex: e_6, index: t_11 });
            } return a; }, point: function (t, e, i, s) { return Ae(t, De(e, t), i.axis || "xy", s); }, nearest: function (t, e, i, s) { return Le(t, De(e, t), i.axis || "xy", i.intersect, s); }, x: function (t, e, i, s) { return Re(t, e, { axis: "x", intersect: i.intersect }, s); }, y: function (t, e, i, s) { return Re(t, e, { axis: "y", intersect: i.intersect }, s); } } };
    var Ie = new RegExp(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/), ze = new RegExp(/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/);
    function Fe(t, e) { var i = ("" + t).match(Ie); if (!i || "normal" === i[1])
        return 1.2 * e; switch (t = +i[2], i[3]) {
        case "px": return t;
        case "%": t /= 100;
    } return e * t; }
    function Be(t, e) { var i = {}, s = U(e), n = s ? Object.keys(e) : e, o = U(t) ? s ? function (i) { return K(t[i], t[e[i]]); } : function (e) { return t[e]; } : function () { return t; }; for (var _b = 0, n_6 = n; _b < n_6.length; _b++) {
        var t_12 = n_6[_b];
        i[t_12] = +o(t_12) || 0;
    } return i; }
    function Ve(t) { return Be(t, { top: "y", right: "x", bottom: "y", left: "x" }); }
    function We(t) { return Be(t, ["topLeft", "topRight", "bottomLeft", "bottomRight"]); }
    function Ne(t) { var e = Ve(t); return e.width = e.left + e.right, e.height = e.top + e.bottom, e; }
    function He(t, e) { t = t || {}, e = e || bt.font; var i = K(t.size, e.size); "string" == typeof i && (i = parseInt(i, 10)); var s = K(t.style, e.style); s && !("" + s).match(ze) && (console.warn('Invalid font style specified: "' + s + '"'), s = ""); var n = { family: K(t.family, e.family), lineHeight: Fe(K(t.lineHeight, e.lineHeight), i), size: i, style: s, weight: K(t.weight, e.weight), string: "" }; return n.string = Ut(n), n; }
    function je(t, e, i, s) { var n, o, a, r = !0; for (n = 0, o = t.length; n < o; ++n)
        if (a = t[n], void 0 !== a && (void 0 !== e && "function" == typeof a && (a = a(e), r = !1), void 0 !== i && Y(a) && (a = a[i % a.length], r = !1), void 0 !== a))
            return s && !r && (s.cacheable = !1), a; }
    function $e(t, e, i) { var s = t.min, n = t.max, o = Z(e, (n - s) / 2), a = function (t, e) { return i && 0 === t ? 0 : t + e; }; return { min: a(s, -Math.abs(o)), max: a(n, o) }; }
    function Ye(t, e) { return Object.assign(Object.create(t), e); }
    var Ue = ["left", "top", "right", "bottom"];
    function Xe(t, e) { return t.filter((function (t) { return t.pos === e; })); }
    function qe(t, e) { return t.filter((function (t) { return -1 === Ue.indexOf(t.pos) && t.box.axis === e; })); }
    function Ke(t, e) { return t.sort((function (t, i) { var s = e ? i : t, n = e ? t : i; return s.weight === n.weight ? s.index - n.index : s.weight - n.weight; })); }
    function Ge(t, e) { var i = function (t) { var e = {}; for (var _b = 0, t_13 = t; _b < t_13.length; _b++) {
        var i_7 = t_13[_b];
        var t_14 = i_7.stack, s_10 = i_7.pos, n_7 = i_7.stackWeight;
        if (!t_14 || !Ue.includes(s_10))
            continue;
        var o_5 = e[t_14] || (e[t_14] = { count: 0, placed: 0, weight: 0, size: 0 });
        o_5.count++, o_5.weight += n_7;
    } return e; }(t), s = e.vBoxMaxWidth, n = e.hBoxMaxHeight; var o, a, r; for (o = 0, a = t.length; o < a; ++o) {
        r = t[o];
        var a_8 = r.box.fullSize, l_5 = i[r.stack], h_4 = l_5 && r.stackWeight / l_5.weight;
        r.horizontal ? (r.width = h_4 ? h_4 * s : a_8 && e.availableWidth, r.height = n) : (r.width = s, r.height = h_4 ? h_4 * n : a_8 && e.availableHeight);
    } return i; }
    function Ze(t, e, i, s) { return Math.max(t[i], e[i]) + Math.max(t[s], e[s]); }
    function Je(t, e) { t.top = Math.max(t.top, e.top), t.left = Math.max(t.left, e.left), t.bottom = Math.max(t.bottom, e.bottom), t.right = Math.max(t.right, e.right); }
    function Qe(t, e, i, s) { var n = i.pos, o = i.box, a = t.maxPadding; if (!U(n)) {
        i.size && (t[n] -= i.size);
        var e_7 = s[i.stack] || { size: 0, count: 1 };
        e_7.size = Math.max(e_7.size, i.horizontal ? o.height : o.width), i.size = e_7.size / e_7.count, t[n] += i.size;
    } o.getPadding && Je(a, o.getPadding()); var r = Math.max(0, e.outerWidth - Ze(a, t, "left", "right")), l = Math.max(0, e.outerHeight - Ze(a, t, "top", "bottom")), h = r !== t.w, c = l !== t.h; return t.w = r, t.h = l, i.horizontal ? { same: h, other: c } : { same: c, other: h }; }
    function ti(t, e) { var i = e.maxPadding; function s(t) { var s = { left: 0, top: 0, right: 0, bottom: 0 }; return t.forEach((function (t) { s[t] = Math.max(e[t], i[t]); })), s; } return s(t ? ["left", "right"] : ["top", "bottom"]); }
    function ei(t, e, i, s) { var n = []; var o, a, r, l, h, c; for (o = 0, a = t.length, h = 0; o < a; ++o) {
        r = t[o], l = r.box, l.update(r.width || e.w, r.height || e.h, ti(r.horizontal, e));
        var _b = Qe(e, i, r, s), a_9 = _b.same, d_1 = _b.other;
        h |= a_9 && n.length, c = c || d_1, l.fullSize || n.push(r);
    } return h && ei(n, e, i, s) || c; }
    function ii(t, e, i, s, n) { t.top = i, t.left = e, t.right = e + s, t.bottom = i + n, t.width = s, t.height = n; }
    function si(t, e, i, s) { var n = i.padding; var o = e.x, a = e.y; for (var _b = 0, t_15 = t; _b < t_15.length; _b++) {
        var r_5 = t_15[_b];
        var t_16 = r_5.box, l_6 = s[r_5.stack] || { count: 1, placed: 0, weight: 1 }, h_5 = r_5.stackWeight / l_6.weight || 1;
        if (r_5.horizontal) {
            var s_11 = e.w * h_5, o_6 = l_6.size || t_16.height;
            ct(l_6.start) && (a = l_6.start), t_16.fullSize ? ii(t_16, n.left, a, i.outerWidth - n.right - n.left, o_6) : ii(t_16, e.left + l_6.placed, a, s_11, o_6), l_6.start = a, l_6.placed += s_11, a = t_16.bottom;
        }
        else {
            var s_12 = e.h * h_5, a_10 = l_6.size || t_16.width;
            ct(l_6.start) && (o = l_6.start), t_16.fullSize ? ii(t_16, o, n.top, a_10, i.outerHeight - n.bottom - n.top) : ii(t_16, o, e.top + l_6.placed, a_10, s_12), l_6.start = o, l_6.placed += s_12, o = t_16.right;
        }
    } e.x = o, e.y = a; }
    bt.set("layout", { autoPadding: !0, padding: { top: 0, right: 0, bottom: 0, left: 0 } });
    var ni = { addBox: function (t, e) { t.boxes || (t.boxes = []), e.fullSize = e.fullSize || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function () { return [{ z: 0, draw: function (t) { e.draw(t); } }]; }, t.boxes.push(e); }, removeBox: function (t, e) { var i = t.boxes ? t.boxes.indexOf(e) : -1; -1 !== i && t.boxes.splice(i, 1); }, configure: function (t, e, i) { e.fullSize = i.fullSize, e.position = i.position, e.weight = i.weight; }, update: function (t, e, i, s) { if (!t)
            return; var n = Ne(t.options.layout.padding), o = Math.max(e - n.width, 0), a = Math.max(i - n.height, 0), r = function (t) { var e = function (t) {
            var _b, _c;
            var e = [];
            var i, s, n, o, a, r;
            for (i = 0, s = (t || []).length; i < s; ++i)
                n = t[i], (o = n.position, _b = n.options, a = _b.stack, _c = _b.stackWeight, r = _c === void 0 ? 1 : _c), e.push({ index: i, box: n, pos: o, horizontal: n.isHorizontal(), weight: n.weight, stack: a && o + a, stackWeight: r });
            return e;
        }(t), i = Ke(e.filter((function (t) { return t.box.fullSize; })), !0), s = Ke(Xe(e, "left"), !0), n = Ke(Xe(e, "right")), o = Ke(Xe(e, "top"), !0), a = Ke(Xe(e, "bottom")), r = qe(e, "x"), l = qe(e, "y"); return { fullSize: i, leftAndTop: s.concat(o), rightAndBottom: n.concat(l).concat(a).concat(r), chartArea: Xe(e, "chartArea"), vertical: s.concat(n).concat(l), horizontal: o.concat(a).concat(r) }; }(t.boxes), l = r.vertical, h = r.horizontal; Q(t.boxes, (function (t) { "function" == typeof t.beforeLayout && t.beforeLayout(); })); var c = l.reduce((function (t, e) { return e.box.options && !1 === e.box.options.display ? t : t + 1; }), 0) || 1, d = Object.freeze({ outerWidth: e, outerHeight: i, padding: n, availableWidth: o, availableHeight: a, vBoxMaxWidth: o / 2 / c, hBoxMaxHeight: a / 2 }), u = Object.assign({}, n); Je(u, Ne(s)); var f = Object.assign({ maxPadding: u, w: o, h: a, x: n.left, y: n.top }, n), g = Ge(l.concat(h), d); ei(r.fullSize, f, d, g), ei(l, f, d, g), ei(h, f, d, g) && ei(l, f, d, g), function (t) { var e = t.maxPadding; function i(i) { var s = Math.max(e[i] - t[i], 0); return t[i] += s, s; } t.y += i("top"), t.x += i("left"), i("right"), i("bottom"); }(f), si(r.leftAndTop, f, d, g), f.x += f.w, f.y += f.h, si(r.rightAndBottom, f, d, g), t.chartArea = { left: f.left, top: f.top, right: f.left + f.w, bottom: f.top + f.h, height: f.h, width: f.w }, Q(r.chartArea, (function (e) { var i = e.box; Object.assign(i, t.chartArea), i.update(f.w, f.h, { left: 0, top: 0, right: 0, bottom: 0 }); })); } };
    function oi(t, e, i, s, n) {
        var _b;
        if (e === void 0) { e = [""]; }
        if (i === void 0) { i = t; }
        if (n === void 0) { n = (function () { return t[0]; }); }
        ct(s) || (s = mi("_fallback", t));
        var o = (_b = {}, _b[Symbol.toStringTag] = "Object", _b._cacheable = !0, _b._scopes = t, _b._rootScopes = i, _b._fallback = s, _b._getTarget = n, _b.override = function (n) { return oi(__spreadArray([n], t, true), e, i, s); }, _b);
        return new Proxy(o, { deleteProperty: function (e, i) { return (delete e[i], delete e._keys, delete t[0][i], !0); }, get: function (i, s) { return ci(i, s, (function () { return function (t, e, i, s) { var n; for (var _b = 0, e_8 = e; _b < e_8.length; _b++) {
                var o_7 = e_8[_b];
                if (n = mi(li(o_7, t), i), ct(n))
                    return hi(t, n) ? gi(i, s, t, n) : n;
            } }(s, e, t, i); })); }, getOwnPropertyDescriptor: function (t, e) { return Reflect.getOwnPropertyDescriptor(t._scopes[0], e); }, getPrototypeOf: function () { return Reflect.getPrototypeOf(t[0]); }, has: function (t, e) { return xi(t).includes(e); }, ownKeys: function (t) { return xi(t); }, set: function (t, e, i) { var s = t._storage || (t._storage = n()); return t[e] = s[e] = i, delete t._keys, !0; } });
    }
    function ai(t, e, i, s) { var n = { _cacheable: !1, _proxy: t, _context: e, _subProxy: i, _stack: new Set, _descriptors: ri(t, s), setContext: function (e) { return ai(t, e, i, s); }, override: function (n) { return ai(t.override(n), e, i, s); } }; return new Proxy(n, { deleteProperty: function (e, i) { return (delete e[i], delete t[i], !0); }, get: function (t, e, i) { return ci(t, e, (function () { return function (t, e, i) { var s = t._proxy, n = t._context, o = t._subProxy, a = t._descriptors; var r = s[e]; dt(r) && a.isScriptable(e) && (r = function (t, e, i, s) { var n = i._proxy, o = i._context, a = i._subProxy, r = i._stack; if (r.has(t))
            throw new Error("Recursion detected: " + Array.from(r).join("->") + "->" + t); r.add(t), e = e(o, a || s), r.delete(t), hi(t, e) && (e = gi(n._scopes, n, t, e)); return e; }(e, r, t, i)); Y(r) && r.length && (r = function (t, e, i, s) { var n = i._proxy, o = i._context, a = i._subProxy, r = i._descriptors; if (ct(o.index) && s(t))
            e = e[o.index % e.length];
        else if (U(e[0])) {
            var i_9 = e, s_13 = n._scopes.filter((function (t) { return t !== i_9; }));
            e = [];
            for (var _b = 0, i_8 = i_9; _b < i_8.length; _b++) {
                var l_7 = i_8[_b];
                var i_10 = gi(s_13, n, t, l_7);
                e.push(ai(i_10, o, a && a[t], r));
            }
        } return e; }(e, r, t, a.isIndexable)); hi(e, r) && (r = ai(r, n, o && o[e], a)); return r; }(t, e, i); })); }, getOwnPropertyDescriptor: function (e, i) { return e._descriptors.allKeys ? Reflect.has(t, i) ? { enumerable: !0, configurable: !0 } : void 0 : Reflect.getOwnPropertyDescriptor(t, i); }, getPrototypeOf: function () { return Reflect.getPrototypeOf(t); }, has: function (e, i) { return Reflect.has(t, i); }, ownKeys: function () { return Reflect.ownKeys(t); }, set: function (e, i, s) { return (t[i] = s, delete e[i], !0); } }); }
    function ri(t, e) {
        if (e === void 0) { e = { scriptable: !0, indexable: !0 }; }
        var _b = t._scriptable, i = _b === void 0 ? e.scriptable : _b, _c = t._indexable, s = _c === void 0 ? e.indexable : _c, _d = t._allKeys, n = _d === void 0 ? e.allKeys : _d;
        return { allKeys: n, scriptable: i, indexable: s, isScriptable: dt(i) ? i : function () { return i; }, isIndexable: dt(s) ? s : function () { return s; } };
    }
    var li = function (t, e) { return t ? t + ht(e) : e; }, hi = function (t, e) { return U(e) && "adapters" !== t && (null === Object.getPrototypeOf(e) || e.constructor === Object); };
    function ci(t, e, i) { if (Object.prototype.hasOwnProperty.call(t, e))
        return t[e]; var s = i(); return t[e] = s, s; }
    function di(t, e, i) { return dt(t) ? t(e, i) : t; }
    var ui = function (t, e) { return !0 === t ? e : "string" == typeof t ? lt(e, t) : void 0; };
    function fi(t, e, i, s, n) { for (var _b = 0, e_9 = e; _b < e_9.length; _b++) {
        var o_8 = e_9[_b];
        var e_10 = ui(i, o_8);
        if (e_10) {
            t.add(e_10);
            var o_9 = di(e_10._fallback, i, n);
            if (ct(o_9) && o_9 !== i && o_9 !== s)
                return o_9;
        }
        else if (!1 === e_10 && ct(s) && i !== s)
            return null;
    } return !1; }
    function gi(t, e, i, s) { var n = e._rootScopes, o = di(e._fallback, i, s), a = __spreadArray(__spreadArray([], t, true), n, true), r = new Set; r.add(s); var l = pi(r, a, i, o || i, s); return null !== l && ((!ct(o) || o === i || (l = pi(r, a, o, l, s), null !== l)) && oi(Array.from(r), [""], n, o, (function () { return function (t, e, i) { var s = t._getTarget(); e in s || (s[e] = {}); var n = s[e]; if (Y(n) && U(i))
        return i; return n; }(e, i, s); }))); }
    function pi(t, e, i, s, n) { for (; i;)
        i = fi(t, e, i, s, n); return i; }
    function mi(t, e) { for (var _b = 0, e_11 = e; _b < e_11.length; _b++) {
        var i_11 = e_11[_b];
        if (!i_11)
            continue;
        var e_12 = i_11[t];
        if (ct(e_12))
            return e_12;
    } }
    function xi(t) { var e = t._keys; return e || (e = t._keys = function (t) { var e = new Set; for (var _b = 0, t_17 = t; _b < t_17.length; _b++) {
        var i_12 = t_17[_b];
        for (var _c = 0, _d = Object.keys(i_12).filter((function (t) { return !t.startsWith("_"); })); _c < _d.length; _c++) {
            var t_18 = _d[_c];
            e.add(t_18);
        }
    } return Array.from(e); }(t._scopes)), e; }
    var bi = Number.EPSILON || 1e-14, _i = function (t, e) { return e < t.length && !t[e].skip && t[e]; }, yi = function (t) { return "x" === t ? "y" : "x"; };
    function vi(t, e, i, s) { var n = t.skip ? e : t, o = e, a = i.skip ? e : i, r = Vt(o, n), l = Vt(a, o); var h = r / (r + l), c = l / (r + l); h = isNaN(h) ? 0 : h, c = isNaN(c) ? 0 : c; var d = s * h, u = s * c; return { previous: { x: o.x - d * (a.x - n.x), y: o.y - d * (a.y - n.y) }, next: { x: o.x + u * (a.x - n.x), y: o.y + u * (a.y - n.y) } }; }
    function wi(t, e) {
        if (e === void 0) { e = "x"; }
        var i = yi(e), s = t.length, n = Array(s).fill(0), o = Array(s);
        var a, r, l, h = _i(t, 0);
        for (a = 0; a < s; ++a)
            if (r = l, l = h, h = _i(t, a + 1), l) {
                if (h) {
                    var t_19 = h[e] - l[e];
                    n[a] = 0 !== t_19 ? (h[i] - l[i]) / t_19 : 0;
                }
                o[a] = r ? h ? Ct(n[a - 1]) !== Ct(n[a]) ? 0 : (n[a - 1] + n[a]) / 2 : n[a - 1] : n[a];
            }
        !function (t, e, i) { var s = t.length; var n, o, a, r, l, h = _i(t, 0); for (var c_2 = 0; c_2 < s - 1; ++c_2)
            l = h, h = _i(t, c_2 + 1), l && h && (Lt(e[c_2], 0, bi) ? i[c_2] = i[c_2 + 1] = 0 : (n = i[c_2] / e[c_2], o = i[c_2 + 1] / e[c_2], r = Math.pow(n, 2) + Math.pow(o, 2), r <= 9 || (a = 3 / Math.sqrt(r), i[c_2] = n * a * e[c_2], i[c_2 + 1] = o * a * e[c_2]))); }(t, n, o), function (t, e, i) {
            if (i === void 0) { i = "x"; }
            var s = yi(i), n = t.length;
            var o, a, r, l = _i(t, 0);
            for (var h_6 = 0; h_6 < n; ++h_6) {
                if (a = r, r = l, l = _i(t, h_6 + 1), !r)
                    continue;
                var n_8 = r[i], c_3 = r[s];
                a && (o = (n_8 - a[i]) / 3, r["cp1".concat(i)] = n_8 - o, r["cp1".concat(s)] = c_3 - o * e[h_6]), l && (o = (l[i] - n_8) / 3, r["cp2".concat(i)] = n_8 + o, r["cp2".concat(s)] = c_3 + o * e[h_6]);
            }
        }(t, o, e);
    }
    function Mi(t, e, i) { return Math.max(Math.min(t, i), e); }
    function ki(t, e, i, s, n) { var o, a, r, l; if (e.spanGaps && (t = t.filter((function (t) { return !t.skip; }))), "monotone" === e.cubicInterpolationMode)
        wi(t, n);
    else {
        var i_13 = s ? t[t.length - 1] : t[0];
        for (o = 0, a = t.length; o < a; ++o)
            r = t[o], l = vi(i_13, r, t[Math.min(o + 1, a - (s ? 0 : 1)) % a], e.tension), r.cp1x = l.previous.x, r.cp1y = l.previous.y, r.cp2x = l.next.x, r.cp2y = l.next.y, i_13 = r;
    } e.capBezierPoints && function (t, e) { var i, s, n, o, a, r = Jt(t[0], e); for (i = 0, s = t.length; i < s; ++i)
        a = o, o = r, r = i < s - 1 && Jt(t[i + 1], e), o && (n = t[i], a && (n.cp1x = Mi(n.cp1x, e.left, e.right), n.cp1y = Mi(n.cp1y, e.top, e.bottom)), r && (n.cp2x = Mi(n.cp2x, e.left, e.right), n.cp2y = Mi(n.cp2y, e.top, e.bottom))); }(t, i); }
    var Si = function (t) { return 0 === t || 1 === t; }, Pi = function (t, e, i) { return -Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * yt / i); }, Di = function (t, e, i) { return Math.pow(2, -10 * t) * Math.sin((t - e) * yt / i) + 1; }, Ci = { linear: function (t) { return t; }, easeInQuad: function (t) { return t * t; }, easeOutQuad: function (t) { return -t * (t - 2); }, easeInOutQuad: function (t) { return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1); }, easeInCubic: function (t) { return t * t * t; }, easeOutCubic: function (t) { return (t -= 1) * t * t + 1; }, easeInOutCubic: function (t) { return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2); }, easeInQuart: function (t) { return t * t * t * t; }, easeOutQuart: function (t) { return -((t -= 1) * t * t * t - 1); }, easeInOutQuart: function (t) { return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2); }, easeInQuint: function (t) { return t * t * t * t * t; }, easeOutQuint: function (t) { return (t -= 1) * t * t * t * t + 1; }, easeInOutQuint: function (t) { return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2); }, easeInSine: function (t) { return 1 - Math.cos(t * kt); }, easeOutSine: function (t) { return Math.sin(t * kt); }, easeInOutSine: function (t) { return -.5 * (Math.cos(_t * t) - 1); }, easeInExpo: function (t) { return 0 === t ? 0 : Math.pow(2, 10 * (t - 1)); }, easeOutExpo: function (t) { return 1 === t ? 1 : 1 - Math.pow(2, -10 * t); }, easeInOutExpo: function (t) { return Si(t) ? t : t < .5 ? .5 * Math.pow(2, 10 * (2 * t - 1)) : .5 * (2 - Math.pow(2, -10 * (2 * t - 1))); }, easeInCirc: function (t) { return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1); }, easeOutCirc: function (t) { return Math.sqrt(1 - (t -= 1) * t); }, easeInOutCirc: function (t) { return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1); }, easeInElastic: function (t) { return Si(t) ? t : Pi(t, .075, .3); }, easeOutElastic: function (t) { return Si(t) ? t : Di(t, .075, .3); }, easeInOutElastic: function (t) { var e = .1125; return Si(t) ? t : t < .5 ? .5 * Pi(2 * t, e, .45) : .5 + .5 * Di(2 * t - 1, e, .45); }, easeInBack: function (t) { var e = 1.70158; return t * t * ((e + 1) * t - e); }, easeOutBack: function (t) { var e = 1.70158; return (t -= 1) * t * ((e + 1) * t + e) + 1; }, easeInOutBack: function (t) { var e = 1.70158; return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2); }, easeInBounce: function (t) { return 1 - Ci.easeOutBounce(1 - t); }, easeOutBounce: function (t) { var e = 7.5625, i = 2.75; return t < 1 / i ? e * t * t : t < 2 / i ? e * (t -= 1.5 / i) * t + .75 : t < 2.5 / i ? e * (t -= 2.25 / i) * t + .9375 : e * (t -= 2.625 / i) * t + .984375; }, easeInOutBounce: function (t) { return t < .5 ? .5 * Ci.easeInBounce(2 * t) : .5 * Ci.easeOutBounce(2 * t - 1) + .5; } };
    function Oi(t, e, i, s) { return { x: t.x + i * (e.x - t.x), y: t.y + i * (e.y - t.y) }; }
    function Ai(t, e, i, s) { return { x: t.x + i * (e.x - t.x), y: "middle" === s ? i < .5 ? t.y : e.y : "after" === s ? i < 1 ? t.y : e.y : i > 0 ? e.y : t.y }; }
    function Ti(t, e, i, s) { var n = { x: t.cp2x, y: t.cp2y }, o = { x: e.cp1x, y: e.cp1y }, a = Oi(t, n, i), r = Oi(n, o, i), l = Oi(o, e, i), h = Oi(a, r, i), c = Oi(r, l, i); return Oi(h, c, i); }
    var Li = new Map;
    function Ri(t, e, i) { return function (t, e) { e = e || {}; var i = t + JSON.stringify(e); var s = Li.get(i); return s || (s = new Intl.NumberFormat(t, e), Li.set(i, s)), s; }(e, i).format(t); }
    function Ei(t, e, i) { return t ? function (t, e) { return { x: function (i) { return t + t + e - i; }, setWidth: function (t) { e = t; }, textAlign: function (t) { return "center" === t ? t : "right" === t ? "left" : "right"; }, xPlus: function (t, e) { return t - e; }, leftForLtr: function (t, e) { return t - e; } }; }(e, i) : { x: function (t) { return t; }, setWidth: function (t) { }, textAlign: function (t) { return t; }, xPlus: function (t, e) { return t + e; }, leftForLtr: function (t, e) { return t; } }; }
    function Ii(t, e) { var i, s; "ltr" !== e && "rtl" !== e || (i = t.canvas.style, s = [i.getPropertyValue("direction"), i.getPropertyPriority("direction")], i.setProperty("direction", e, "important"), t.prevTextDirection = s); }
    function zi(t, e) { void 0 !== e && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1])); }
    function Fi(t) { return "angle" === t ? { between: Ht, compare: Wt, normalize: Nt } : { between: Yt, compare: function (t, e) { return t - e; }, normalize: function (t) { return t; } }; }
    function Bi(_b) {
        var t = _b.start, e = _b.end, i = _b.count, s = _b.loop, n = _b.style;
        return { start: t % i, end: e % i, loop: s && (e - t + 1) % i == 0, style: n };
    }
    function Vi(t, e, i) { if (!i)
        return [t]; var s = i.property, n = i.start, o = i.end, a = e.length, _b = Fi(s), r = _b.compare, l = _b.between, h = _b.normalize, _c = function (t, e, i) { var s = i.property, n = i.start, o = i.end, _b = Fi(s), a = _b.between, r = _b.normalize, l = e.length; var h, c, d = t.start, u = t.end, f = t.loop; if (f) {
        for (d += l, u += l, h = 0, c = l; h < c && a(r(e[d % l][s]), n, o); ++h)
            d--, u--;
        d %= l, u %= l;
    } return u < d && (u += l), { start: d, end: u, loop: f, style: t.style }; }(t, e, i), c = _c.start, d = _c.end, u = _c.loop, f = _c.style, g = []; var p, m, x, b = !1, _ = null; var y = function () { return b || l(n, x, p) && 0 !== r(n, x); }, v = function () { return !b || 0 === r(o, p) || l(o, x, p); }; for (var t_20 = c, i_14 = c; t_20 <= d; ++t_20)
        m = e[t_20 % a], m.skip || (p = h(m[s]), p !== x && (b = l(p, n, o), null === _ && y() && (_ = 0 === r(p, n) ? t_20 : i_14), null !== _ && v() && (g.push(Bi({ start: _, end: t_20, loop: u, count: a, style: f })), _ = null), i_14 = t_20, x = p)); return null !== _ && g.push(Bi({ start: _, end: d, loop: u, count: a, style: f })), g; }
    function Wi(t, e) { var i = [], s = t.segments; for (var n_9 = 0; n_9 < s.length; n_9++) {
        var o_10 = Vi(s[n_9], t.points, e);
        o_10.length && i.push.apply(i, o_10);
    } return i; }
    function Ni(t, e) { var i = t.points, s = t.options.spanGaps, n = i.length; if (!n)
        return []; var o = !!t._loop, _b = function (t, e, i, s) { var n = 0, o = e - 1; if (i && !s)
        for (; n < e && !t[n].skip;)
            n++; for (; n < e && t[n].skip;)
        n++; for (n %= e, i && (o += n); o > n && t[o % e].skip;)
        o--; return o %= e, { start: n, end: o }; }(i, n, o, s), a = _b.start, r = _b.end; if (!0 === s)
        return Hi(t, [{ start: a, end: r, loop: o }], i, e); return Hi(t, function (t, e, i, s) { var n = t.length, o = []; var a, r = e, l = t[e]; for (a = e + 1; a <= i; ++a) {
        var i_15 = t[a % n];
        i_15.skip || i_15.stop ? l.skip || (s = !1, o.push({ start: e % n, end: (a - 1) % n, loop: s }), e = r = i_15.stop ? a : null) : (r = a, l.skip && (e = a)), l = i_15;
    } return null !== r && o.push({ start: e % n, end: r % n, loop: s }), o; }(i, a, r < a ? r + n : r, !!t._fullLoop && 0 === a && r === n - 1), i, e); }
    function Hi(t, e, i, s) { return s && s.setContext && i ? function (t, e, i, s) { var n = t._chart.getContext(), o = ji(t.options), a = t._datasetIndex, r = t.options.spanGaps, l = i.length, h = []; var c = o, d = e[0].start, u = d; function f(t, e, s, n) { var o = r ? -1 : 1; if (t !== e) {
        for (t += l; i[t % l].skip;)
            t -= o;
        for (; i[e % l].skip;)
            e += o;
        t % l != e % l && (h.push({ start: t % l, end: e % l, loop: s, style: n }), c = n, d = e % l);
    } } for (var _b = 0, e_13 = e; _b < e_13.length; _b++) {
        var t_21 = e_13[_b];
        d = r ? d : t_21.start;
        var e_14 = void 0, o_11 = i[d % l];
        for (u = d + 1; u <= t_21.end; u++) {
            var r_6 = i[u % l];
            e_14 = ji(s.setContext(Ye(n, { type: "segment", p0: o_11, p1: r_6, p0DataIndex: (u - 1) % l, p1DataIndex: u % l, datasetIndex: a }))), $i(e_14, c) && f(d, u - 1, t_21.loop, c), o_11 = r_6, c = e_14;
        }
        d < u - 1 && f(d, u - 1, t_21.loop, c);
    } return h; }(t, e, i, s) : e; }
    function ji(t) { return { backgroundColor: t.backgroundColor, borderCapStyle: t.borderCapStyle, borderDash: t.borderDash, borderDashOffset: t.borderDashOffset, borderJoinStyle: t.borderJoinStyle, borderWidth: t.borderWidth, borderColor: t.borderColor }; }
    function $i(t, e) { return e && JSON.stringify(t) !== JSON.stringify(e); }
    var Yi = Object.freeze({ __proto__: null, easingEffects: Ci, color: W, getHoverColor: N, noop: H, uid: j, isNullOrUndef: $, isArray: Y, isObject: U, isFinite: X, finiteOrDefault: q, valueOrDefault: K, toPercentage: G, toDimension: Z, callback: J, each: Q, _elementsEqual: tt, clone: et, _merger: st, merge: nt, mergeIf: ot, _mergerIf: at, _deprecated: function (t, e, i, s) { void 0 !== e && console.warn(t + ': "' + i + '" is deprecated. Please use "' + s + '" instead'); }, resolveObjectKey: lt, _capitalize: ht, defined: ct, isFunction: dt, setsEqual: ut, _isClickEvent: ft, toFontString: Ut, _measureText: Xt, _longestText: qt, _alignPixel: Kt, clearCanvas: Gt, drawPoint: Zt, _isPointInArea: Jt, clipArea: Qt, unclipArea: te, _steppedLineTo: ee, _bezierCurveTo: ie, renderText: se, addRoundedRectPath: oe, _lookup: ae, _lookupByKey: re, _rlookupByKey: le, _filterBetween: he, listenArrayEvents: de, unlistenArrayEvents: ue, _arrayUnique: fe, _createResolver: oi, _attachContext: ai, _descriptors: ri, splineCurve: vi, splineCurveMonotone: wi, _updateBezierControlPoints: ki, _isDomSupported: ge, _getParentNode: pe, getStyle: be, getRelativePosition: ve, getMaximumSize: Me, retinaScale: ke, supportsEventListenerOptions: Se, readUsedSize: Pe, fontString: function (t, e, i) { return e + " " + t + "px " + i; }, requestAnimFrame: t, throttled: e, debounce: i, _toLeftRightCenter: s, _alignStartEnd: n, _textX: o, _pointInLine: Oi, _steppedInterpolation: Ai, _bezierInterpolation: Ti, formatNumber: Ri, toLineHeight: Fe, _readValueToProps: Be, toTRBL: Ve, toTRBLCorners: We, toPadding: Ne, toFont: He, resolve: je, _addGrace: $e, createContext: Ye, PI: _t, TAU: yt, PITAU: vt, INFINITY: wt, RAD_PER_DEG: Mt, HALF_PI: kt, QUARTER_PI: St, TWO_THIRDS_PI: Pt, log10: Dt, sign: Ct, niceNum: Ot, _factorize: At, isNumber: Tt, almostEquals: Lt, almostWhole: Rt, _setMinAndMaxByKey: Et, toRadians: It, toDegrees: zt, _decimalPlaces: Ft, getAngleFromPoint: Bt, distanceBetweenPoints: Vt, _angleDiff: Wt, _normalizeAngle: Nt, _angleBetween: Ht, _limitValue: jt, _int16Range: $t, _isBetween: Yt, getRtlAdapter: Ei, overrideTextDirection: Ii, restoreTextDirection: zi, _boundSegment: Vi, _boundSegments: Wi, _computeSegments: Ni });
    var Ui = /** @class */ (function () {
        function Ui() {
        }
        Ui.prototype.acquireContext = function (t, e) { };
        Ui.prototype.releaseContext = function (t) { return !1; };
        Ui.prototype.addEventListener = function (t, e, i) { };
        Ui.prototype.removeEventListener = function (t, e, i) { };
        Ui.prototype.getDevicePixelRatio = function () { return 1; };
        Ui.prototype.getMaximumSize = function (t, e, i, s) { return e = Math.max(0, e || t.width), i = i || t.height, { width: e, height: Math.max(0, s ? Math.floor(e / s) : i) }; };
        Ui.prototype.isAttached = function (t) { return !0; };
        Ui.prototype.updateConfig = function (t) { };
        return Ui;
    }());
    var Xi = /** @class */ (function (_super) {
        __extends(Xi, _super);
        function Xi() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Xi.prototype.acquireContext = function (t) { return t && t.getContext && t.getContext("2d") || null; };
        Xi.prototype.updateConfig = function (t) { t.options.animation = !1; };
        return Xi;
    }(Ui));
    var qi = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" }, Ki = function (t) { return null === t || "" === t; };
    var Gi = !!Se && { passive: !0 };
    function Zi(t, e, i) { t.canvas.removeEventListener(e, i, Gi); }
    function Ji(t, e) { for (var _b = 0, t_22 = t; _b < t_22.length; _b++) {
        var i_16 = t_22[_b];
        if (i_16 === e || i_16.contains(e))
            return !0;
    } }
    function Qi(t, e, i) { var s = t.canvas, n = new MutationObserver((function (t) { var e = !1; for (var _b = 0, t_23 = t; _b < t_23.length; _b++) {
        var i_17 = t_23[_b];
        e = e || Ji(i_17.addedNodes, s), e = e && !Ji(i_17.removedNodes, s);
    } e && i(); })); return n.observe(document, { childList: !0, subtree: !0 }), n; }
    function ts(t, e, i) { var s = t.canvas, n = new MutationObserver((function (t) { var e = !1; for (var _b = 0, t_24 = t; _b < t_24.length; _b++) {
        var i_18 = t_24[_b];
        e = e || Ji(i_18.removedNodes, s), e = e && !Ji(i_18.addedNodes, s);
    } e && i(); })); return n.observe(document, { childList: !0, subtree: !0 }), n; }
    var es = new Map;
    var is = 0;
    function ss() { var t = window.devicePixelRatio; t !== is && (is = t, es.forEach((function (e, i) { i.currentDevicePixelRatio !== t && e(); }))); }
    function ns(t, i, s) { var n = t.canvas, o = n && pe(n); if (!o)
        return; var a = e((function (t, e) { var i = o.clientWidth; s(t, e), i < o.clientWidth && s(); }), window), r = new ResizeObserver((function (t) { var e = t[0], i = e.contentRect.width, s = e.contentRect.height; 0 === i && 0 === s || a(i, s); })); return r.observe(o), function (t, e) { es.size || window.addEventListener("resize", ss), es.set(t, e); }(t, a), r; }
    function os(t, e, i) { i && i.disconnect(), "resize" === e && function (t) { es.delete(t), es.size || window.removeEventListener("resize", ss); }(t); }
    function as(t, i, s) { var n = t.canvas, o = e((function (e) { null !== t.ctx && s(function (t, e) { var i = qi[t.type] || t.type, _b = ve(t, e), s = _b.x, n = _b.y; return { type: i, chart: e, native: t, x: void 0 !== s ? s : null, y: void 0 !== n ? n : null }; }(e, t)); }), t, (function (t) { var e = t[0]; return [e, e.offsetX, e.offsetY]; })); return function (t, e, i) { t.addEventListener(e, i, Gi); }(n, i, o), o; }
    var rs = /** @class */ (function (_super) {
        __extends(rs, _super);
        function rs() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        rs.prototype.acquireContext = function (t, e) { var i = t && t.getContext && t.getContext("2d"); return i && i.canvas === t ? (function (t, e) { var i = t.style, s = t.getAttribute("height"), n = t.getAttribute("width"); if (t.$chartjs = { initial: { height: s, width: n, style: { display: i.display, height: i.height, width: i.width } } }, i.display = i.display || "block", i.boxSizing = i.boxSizing || "border-box", Ki(n)) {
            var e_15 = Pe(t, "width");
            void 0 !== e_15 && (t.width = e_15);
        } if (Ki(s))
            if ("" === t.style.height)
                t.height = t.width / (e || 2);
            else {
                var e_16 = Pe(t, "height");
                void 0 !== e_16 && (t.height = e_16);
            } }(t, e), i) : null; };
        rs.prototype.releaseContext = function (t) { var e = t.canvas; if (!e.$chartjs)
            return !1; var i = e.$chartjs.initial; ["height", "width"].forEach((function (t) { var s = i[t]; $(s) ? e.removeAttribute(t) : e.setAttribute(t, s); })); var s = i.style || {}; return Object.keys(s).forEach((function (t) { e.style[t] = s[t]; })), e.width = e.width, delete e.$chartjs, !0; };
        rs.prototype.addEventListener = function (t, e, i) { this.removeEventListener(t, e); var s = t.$proxies || (t.$proxies = {}), n = { attach: Qi, detach: ts, resize: ns }[e] || as; s[e] = n(t, e, i); };
        rs.prototype.removeEventListener = function (t, e) { var i = t.$proxies || (t.$proxies = {}), s = i[e]; if (!s)
            return; ({ attach: os, detach: os, resize: os }[e] || Zi)(t, e, s), i[e] = void 0; };
        rs.prototype.getDevicePixelRatio = function () { return window.devicePixelRatio; };
        rs.prototype.getMaximumSize = function (t, e, i, s) { return Me(t, e, i, s); };
        rs.prototype.isAttached = function (t) { var e = pe(t); return !(!e || !e.isConnected); };
        return rs;
    }(Ui));
    function ls(t) { return !ge() || "undefined" != typeof OffscreenCanvas && t instanceof OffscreenCanvas ? Xi : rs; }
    var hs = Object.freeze({ __proto__: null, _detectPlatform: ls, BasePlatform: Ui, BasicPlatform: Xi, DomPlatform: rs });
    var cs = "transparent", ds = { boolean: function (t, e, i) { return i > .5 ? e : t; }, color: function (t, e, i) { var s = W(t || cs), n = s.valid && W(e || cs); return n && n.valid ? n.mix(s, i).hexString() : e; }, number: function (t, e, i) { return t + (e - t) * i; } };
    var us = /** @class */ (function () {
        function us(t, e, i, s) {
            var n = e[i];
            s = je([t.to, s, n, t.from]);
            var o = je([t.from, n, s]);
            this._active = !0, this._fn = t.fn || ds[t.type || typeof o], this._easing = Ci[t.easing] || Ci.linear, this._start = Math.floor(Date.now() + (t.delay || 0)), this._duration = this._total = Math.floor(t.duration), this._loop = !!t.loop, this._target = e, this._prop = i, this._from = o, this._to = s, this._promises = void 0;
        }
        us.prototype.active = function () { return this._active; };
        us.prototype.update = function (t, e, i) { if (this._active) {
            this._notify(!1);
            var s_14 = this._target[this._prop], n_10 = i - this._start, o_12 = this._duration - n_10;
            this._start = i, this._duration = Math.floor(Math.max(o_12, t.duration)), this._total += n_10, this._loop = !!t.loop, this._to = je([t.to, e, s_14, t.from]), this._from = je([t.from, s_14, e]);
        } };
        us.prototype.cancel = function () { this._active && (this.tick(Date.now()), this._active = !1, this._notify(!1)); };
        us.prototype.tick = function (t) { var e = t - this._start, i = this._duration, s = this._prop, n = this._from, o = this._loop, a = this._to; var r; if (this._active = n !== a && (o || e < i), !this._active)
            return this._target[s] = a, void this._notify(!0); e < 0 ? this._target[s] = n : (r = e / i % 2, r = o && r > 1 ? 2 - r : r, r = this._easing(Math.min(1, Math.max(0, r))), this._target[s] = this._fn(n, a, r)); };
        us.prototype.wait = function () { var t = this._promises || (this._promises = []); return new Promise((function (e, i) { t.push({ res: e, rej: i }); })); };
        us.prototype._notify = function (t) { var e = t ? "res" : "rej", i = this._promises || []; for (var t_25 = 0; t_25 < i.length; t_25++)
            i[t_25][e](); };
        return us;
    }());
    bt.set("animation", { delay: void 0, duration: 1e3, easing: "easeOutQuart", fn: void 0, from: void 0, loop: void 0, to: void 0, type: void 0 });
    var fs = Object.keys(bt.animation);
    bt.describe("animation", { _fallback: !1, _indexable: !1, _scriptable: function (t) { return "onProgress" !== t && "onComplete" !== t && "fn" !== t; } }), bt.set("animations", { colors: { type: "color", properties: ["color", "borderColor", "backgroundColor"] }, numbers: { type: "number", properties: ["x", "y", "borderWidth", "radius", "tension"] } }), bt.describe("animations", { _fallback: "animation" }), bt.set("transitions", { active: { animation: { duration: 400 } }, resize: { animation: { duration: 0 } }, show: { animations: { colors: { from: "transparent" }, visible: { type: "boolean", duration: 0 } } }, hide: { animations: { colors: { to: "transparent" }, visible: { type: "boolean", easing: "linear", fn: function (t) { return 0 | t; } } } } });
    var gs = /** @class */ (function () {
        function gs(t, e) {
            this._chart = t, this._properties = new Map, this.configure(e);
        }
        gs.prototype.configure = function (t) { if (!U(t))
            return; var e = this._properties; Object.getOwnPropertyNames(t).forEach((function (i) { var s = t[i]; if (!U(s))
            return; var n = {}; for (var _b = 0, fs_1 = fs; _b < fs_1.length; _b++) {
            var t_26 = fs_1[_b];
            n[t_26] = s[t_26];
        } (Y(s.properties) && s.properties || [i]).forEach((function (t) { t !== i && e.has(t) || e.set(t, n); })); })); };
        gs.prototype._animateOptions = function (t, e) { var i = e.options, s = function (t, e) { if (!e)
            return; var i = t.options; if (!i)
            return void (t.options = e); i.$shared && (t.options = i = Object.assign({}, i, { $shared: !1, $animations: {} })); return i; }(t, i); if (!s)
            return []; var n = this._createAnimations(s, i); return i.$shared && function (t, e) { var i = [], s = Object.keys(e); for (var e_17 = 0; e_17 < s.length; e_17++) {
            var n_11 = t[s[e_17]];
            n_11 && n_11.active() && i.push(n_11.wait());
        } return Promise.all(i); }(t.options.$animations, i).then((function () { t.options = i; }), (function () { })), n; };
        gs.prototype._createAnimations = function (t, e) { var i = this._properties, s = [], n = t.$animations || (t.$animations = {}), o = Object.keys(e), a = Date.now(); var r; for (r = o.length - 1; r >= 0; --r) {
            var l_8 = o[r];
            if ("$" === l_8.charAt(0))
                continue;
            if ("options" === l_8) {
                s.push.apply(s, this._animateOptions(t, e));
                continue;
            }
            var h_7 = e[l_8];
            var c_4 = n[l_8];
            var d_2 = i.get(l_8);
            if (c_4) {
                if (d_2 && c_4.active()) {
                    c_4.update(d_2, h_7, a);
                    continue;
                }
                c_4.cancel();
            }
            d_2 && d_2.duration ? (n[l_8] = c_4 = new us(d_2, t, l_8, h_7), s.push(c_4)) : t[l_8] = h_7;
        } return s; };
        gs.prototype.update = function (t, e) { if (0 === this._properties.size)
            return void Object.assign(t, e); var i = this._createAnimations(t, e); return i.length ? (a.add(this._chart, i), !0) : void 0; };
        return gs;
    }());
    function ps(t, e) { var i = t && t.options || {}, s = i.reverse, n = void 0 === i.min ? e : 0, o = void 0 === i.max ? e : 0; return { start: s ? o : n, end: s ? n : o }; }
    function ms(t, e) { var i = [], s = t._getSortedDatasetMetas(e); var n, o; for (n = 0, o = s.length; n < o; ++n)
        i.push(s[n].index); return i; }
    function xs(t, e, i, s) {
        if (s === void 0) { s = {}; }
        var n = t.keys, o = "single" === s.mode;
        var a, r, l, h;
        if (null !== e) {
            for (a = 0, r = n.length; a < r; ++a) {
                if (l = +n[a], l === i) {
                    if (s.all)
                        continue;
                    break;
                }
                h = t.values[l], X(h) && (o || 0 === e || Ct(e) === Ct(h)) && (e += h);
            }
            return e;
        }
    }
    function bs(t, e) { var i = t && t.options.stacked; return i || void 0 === i && void 0 !== e.stack; }
    function _s(t, e, i) { var s = t[e] || (t[e] = {}); return s[i] || (s[i] = {}); }
    function ys(t, e, i, s) { for (var _b = 0, _c = e.getMatchingVisibleMetas(s).reverse(); _b < _c.length; _b++) {
        var n_12 = _c[_b];
        var e_18 = t[n_12.index];
        if (i && e_18 > 0 || !i && e_18 < 0)
            return n_12.index;
    } return null; }
    function vs(t, e) { var i = t.chart, s = t._cachedMeta, n = i._stacks || (i._stacks = {}), o = s.iScale, a = s.vScale, r = s.index, l = o.axis, h = a.axis, c = function (t, e, i) { return "".concat(t.id, ".").concat(e.id, ".").concat(i.stack || i.type); }(o, a, s), d = e.length; var u; for (var t_27 = 0; t_27 < d; ++t_27) {
        var i_19 = e[t_27], _b = i_19, _c = l, o_13 = _b[_c], _d = h, d_3 = _b[_d];
        u = (i_19._stacks || (i_19._stacks = {}))[h] = _s(n, c, o_13), u[r] = d_3, u._top = ys(u, a, !0, s.type), u._bottom = ys(u, a, !1, s.type);
    } }
    function ws(t, e) { var i = t.scales; return Object.keys(i).filter((function (t) { return i[t].axis === e; })).shift(); }
    function Ms(t, e) { var i = t.controller.index, s = t.vScale && t.vScale.axis; if (s) {
        e = e || t._parsed;
        for (var _b = 0, e_19 = e; _b < e_19.length; _b++) {
            var t_28 = e_19[_b];
            var e_20 = t_28._stacks;
            if (!e_20 || void 0 === e_20[s] || void 0 === e_20[s][i])
                return;
            delete e_20[s][i];
        }
    } }
    var ks = function (t) { return "reset" === t || "none" === t; }, Ss = function (t, e) { return e ? t : Object.assign({}, t); };
    var Ps = /** @class */ (function () {
        function Ps(t, e) {
            this.chart = t, this._ctx = t.ctx, this.index = e, this._cachedDataOpts = {}, this._cachedMeta = this.getMeta(), this._type = this._cachedMeta.type, this.options = void 0, this._parsing = !1, this._data = void 0, this._objectData = void 0, this._sharedOptions = void 0, this._drawStart = void 0, this._drawCount = void 0, this.enableOptionSharing = !1, this.$context = void 0, this._syncList = [], this.initialize();
        }
        Ps.prototype.initialize = function () { var t = this._cachedMeta; this.configure(), this.linkScales(), t._stacked = bs(t.vScale, t), this.addElements(); };
        Ps.prototype.updateIndex = function (t) { this.index !== t && Ms(this._cachedMeta), this.index = t; };
        Ps.prototype.linkScales = function () { var t = this.chart, e = this._cachedMeta, i = this.getDataset(), s = function (t, e, i, s) { return "x" === t ? e : "r" === t ? s : i; }, n = e.xAxisID = K(i.xAxisID, ws(t, "x")), o = e.yAxisID = K(i.yAxisID, ws(t, "y")), a = e.rAxisID = K(i.rAxisID, ws(t, "r")), r = e.indexAxis, l = e.iAxisID = s(r, n, o, a), h = e.vAxisID = s(r, o, n, a); e.xScale = this.getScaleForId(n), e.yScale = this.getScaleForId(o), e.rScale = this.getScaleForId(a), e.iScale = this.getScaleForId(l), e.vScale = this.getScaleForId(h); };
        Ps.prototype.getDataset = function () { return this.chart.data.datasets[this.index]; };
        Ps.prototype.getMeta = function () { return this.chart.getDatasetMeta(this.index); };
        Ps.prototype.getScaleForId = function (t) { return this.chart.scales[t]; };
        Ps.prototype._getOtherScale = function (t) { var e = this._cachedMeta; return t === e.iScale ? e.vScale : e.iScale; };
        Ps.prototype.reset = function () { this._update("reset"); };
        Ps.prototype._destroy = function () { var t = this._cachedMeta; this._data && ue(this._data, this), t._stacked && Ms(t); };
        Ps.prototype._dataCheck = function () { var t = this.getDataset(), e = t.data || (t.data = []), i = this._data; if (U(e))
            this._data = function (t) { var e = Object.keys(t), i = new Array(e.length); var s, n, o; for (s = 0, n = e.length; s < n; ++s)
                o = e[s], i[s] = { x: o, y: t[o] }; return i; }(e);
        else if (i !== e) {
            if (i) {
                ue(i, this);
                var t_29 = this._cachedMeta;
                Ms(t_29), t_29._parsed = [];
            }
            e && Object.isExtensible(e) && de(e, this), this._syncList = [], this._data = e;
        } };
        Ps.prototype.addElements = function () { var t = this._cachedMeta; this._dataCheck(), this.datasetElementType && (t.dataset = new this.datasetElementType); };
        Ps.prototype.buildOrUpdateElements = function (t) { var e = this._cachedMeta, i = this.getDataset(); var s = !1; this._dataCheck(); var n = e._stacked; e._stacked = bs(e.vScale, e), e.stack !== i.stack && (s = !0, Ms(e), e.stack = i.stack), this._resyncElements(t), (s || n !== e._stacked) && vs(this, e._parsed); };
        Ps.prototype.configure = function () { var t = this.chart.config, e = t.datasetScopeKeys(this._type), i = t.getOptionScopes(this.getDataset(), e, !0); this.options = t.createResolver(i, this.getContext()), this._parsing = this.options.parsing, this._cachedDataOpts = {}; };
        Ps.prototype.parse = function (t, e) { var _b = this, i = _b._cachedMeta, s = _b._data, n = i.iScale, o = i._stacked, a = n.axis; var r, l, h, c = 0 === t && e === s.length || i._sorted, d = t > 0 && i._parsed[t - 1]; if (!1 === this._parsing)
            i._parsed = s, i._sorted = !0, h = s;
        else {
            h = Y(s[t]) ? this.parseArrayData(i, s, t, e) : U(s[t]) ? this.parseObjectData(i, s, t, e) : this.parsePrimitiveData(i, s, t, e);
            var n_13 = function () { return null === l[a] || d && l[a] < d[a]; };
            for (r = 0; r < e; ++r)
                i._parsed[r + t] = l = h[r], c && (n_13() && (c = !1), d = l);
            i._sorted = c;
        } o && vs(this, h); };
        Ps.prototype.parsePrimitiveData = function (t, e, i, s) {
            var _b;
            var n = t.iScale, o = t.vScale, a = n.axis, r = o.axis, l = n.getLabels(), h = n === o, c = new Array(s);
            var d, u, f;
            for (d = 0, u = s; d < u; ++d)
                f = d + i, c[d] = (_b = {}, _b[a] = h || n.parse(l[f], f), _b[r] = o.parse(e[f], f), _b);
            return c;
        };
        Ps.prototype.parseArrayData = function (t, e, i, s) { var n = t.xScale, o = t.yScale, a = new Array(s); var r, l, h, c; for (r = 0, l = s; r < l; ++r)
            h = r + i, c = e[h], a[r] = { x: n.parse(c[0], h), y: o.parse(c[1], h) }; return a; };
        Ps.prototype.parseObjectData = function (t, e, i, s) { var n = t.xScale, o = t.yScale, _b = this._parsing, _c = _b.xAxisKey, a = _c === void 0 ? "x" : _c, _d = _b.yAxisKey, r = _d === void 0 ? "y" : _d, l = new Array(s); var h, c, d, u; for (h = 0, c = s; h < c; ++h)
            d = h + i, u = e[d], l[h] = { x: n.parse(lt(u, a), d), y: o.parse(lt(u, r), d) }; return l; };
        Ps.prototype.getParsed = function (t) { return this._cachedMeta._parsed[t]; };
        Ps.prototype.getDataElement = function (t) { return this._cachedMeta.data[t]; };
        Ps.prototype.applyStack = function (t, e, i) { var s = this.chart, n = this._cachedMeta, o = e[t.axis]; return xs({ keys: ms(s, !0), values: e._stacks[t.axis] }, o, n.index, { mode: i }); };
        Ps.prototype.updateRangeFromParsed = function (t, e, i, s) { var n = i[e.axis]; var o = null === n ? NaN : n; var a = s && i._stacks[e.axis]; s && a && (s.values = a, o = xs(s, n, this._cachedMeta.index)), t.min = Math.min(t.min, o), t.max = Math.max(t.max, o); };
        Ps.prototype.getMinMax = function (t, e) { var i = this._cachedMeta, s = i._parsed, n = i._sorted && t === i.iScale, o = s.length, a = this._getOtherScale(t), r = (function (t, e, i) { return t && !e.hidden && e._stacked && { keys: ms(i, !0), values: null }; })(e, i, this.chart), l = { min: Number.POSITIVE_INFINITY, max: Number.NEGATIVE_INFINITY }, _b = function (t) { var _b = t.getUserBounds(), e = _b.min, i = _b.max, s = _b.minDefined, n = _b.maxDefined; return { min: s ? e : Number.NEGATIVE_INFINITY, max: n ? i : Number.POSITIVE_INFINITY }; }(a), h = _b.min, c = _b.max; var d, u; function f() { u = s[d]; var e = u[a.axis]; return !X(u[t.axis]) || h > e || c < e; } for (d = 0; d < o && (f() || (this.updateRangeFromParsed(l, t, u, r), !n)); ++d)
            ; if (n)
            for (d = o - 1; d >= 0; --d)
                if (!f()) {
                    this.updateRangeFromParsed(l, t, u, r);
                    break;
                } return l; };
        Ps.prototype.getAllParsedValues = function (t) { var e = this._cachedMeta._parsed, i = []; var s, n, o; for (s = 0, n = e.length; s < n; ++s)
            o = e[s][t.axis], X(o) && i.push(o); return i; };
        Ps.prototype.getMaxOverflow = function () { return !1; };
        Ps.prototype.getLabelAndValue = function (t) { var e = this._cachedMeta, i = e.iScale, s = e.vScale, n = this.getParsed(t); return { label: i ? "" + i.getLabelForValue(n[i.axis]) : "", value: s ? "" + s.getLabelForValue(n[s.axis]) : "" }; };
        Ps.prototype._update = function (t) { var e = this._cachedMeta; this.update(t || "default"), e._clip = function (t) { var e, i, s, n; return U(t) ? (e = t.top, i = t.right, s = t.bottom, n = t.left) : e = i = s = n = t, { top: e, right: i, bottom: s, left: n, disabled: !1 === t }; }(K(this.options.clip, function (t, e, i) { if (!1 === i)
            return !1; var s = ps(t, i), n = ps(e, i); return { top: n.end, right: s.end, bottom: n.start, left: s.start }; }(e.xScale, e.yScale, this.getMaxOverflow()))); };
        Ps.prototype.update = function (t) { };
        Ps.prototype.draw = function () { var t = this._ctx, e = this.chart, i = this._cachedMeta, s = i.data || [], n = e.chartArea, o = [], a = this._drawStart || 0, r = this._drawCount || s.length - a, l = this.options.drawActiveElementsOnTop; var h; for (i.dataset && i.dataset.draw(t, n, a, r), h = a; h < a + r; ++h) {
            var e_21 = s[h];
            e_21.hidden || (e_21.active && l ? o.push(e_21) : e_21.draw(t, n));
        } for (h = 0; h < o.length; ++h)
            o[h].draw(t, n); };
        Ps.prototype.getStyle = function (t, e) { var i = e ? "active" : "default"; return void 0 === t && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(i) : this.resolveDataElementOptions(t || 0, i); };
        Ps.prototype.getContext = function (t, e, i) { var s = this.getDataset(); var n; if (t >= 0 && t < this._cachedMeta.data.length) {
            var e_22 = this._cachedMeta.data[t];
            n = e_22.$context || (e_22.$context = function (t, e, i) { return Ye(t, { active: !1, dataIndex: e, parsed: void 0, raw: void 0, element: i, index: e, mode: "default", type: "data" }); }(this.getContext(), t, e_22)), n.parsed = this.getParsed(t), n.raw = s.data[t], n.index = n.dataIndex = t;
        }
        else
            n = this.$context || (this.$context = function (t, e) { return Ye(t, { active: !1, dataset: void 0, datasetIndex: e, index: e, mode: "default", type: "dataset" }); }(this.chart.getContext(), this.index)), n.dataset = s, n.index = n.datasetIndex = this.index; return n.active = !!e, n.mode = i, n; };
        Ps.prototype.resolveDatasetElementOptions = function (t) { return this._resolveElementOptions(this.datasetElementType.id, t); };
        Ps.prototype.resolveDataElementOptions = function (t, e) { return this._resolveElementOptions(this.dataElementType.id, e, t); };
        Ps.prototype._resolveElementOptions = function (t, e, i) {
            var _this = this;
            if (e === void 0) { e = "default"; }
            var s = "active" === e, n = this._cachedDataOpts, o = t + "-" + e, a = n[o], r = this.enableOptionSharing && ct(i);
            if (a)
                return Ss(a, r);
            var l = this.chart.config, h = l.datasetElementScopeKeys(this._type, t), c = s ? ["".concat(t, "Hover"), "hover", t, ""] : [t, ""], d = l.getOptionScopes(this.getDataset(), h), u = Object.keys(bt.elements[t]), f = l.resolveNamedOptions(d, u, (function () { return _this.getContext(i, s); }), c);
            return f.$shared && (f.$shared = r, n[o] = Object.freeze(Ss(f, r))), f;
        };
        Ps.prototype._resolveAnimations = function (t, e, i) { var s = this.chart, n = this._cachedDataOpts, o = "animation-".concat(e), a = n[o]; if (a)
            return a; var r; if (!1 !== s.options.animation) {
            var s_15 = this.chart.config, n_14 = s_15.datasetAnimationScopeKeys(this._type, e), o_14 = s_15.getOptionScopes(this.getDataset(), n_14);
            r = s_15.createResolver(o_14, this.getContext(t, i, e));
        } var l = new gs(s, r && r.animations); return r && r._cacheable && (n[o] = Object.freeze(l)), l; };
        Ps.prototype.getSharedOptions = function (t) { if (t.$shared)
            return this._sharedOptions || (this._sharedOptions = Object.assign({}, t)); };
        Ps.prototype.includeOptions = function (t, e) { return !e || ks(t) || this.chart._animationsDisabled; };
        Ps.prototype.updateElement = function (t, e, i, s) { ks(s) ? Object.assign(t, i) : this._resolveAnimations(e, s).update(t, i); };
        Ps.prototype.updateSharedOptions = function (t, e, i) { t && !ks(e) && this._resolveAnimations(void 0, e).update(t, i); };
        Ps.prototype._setStyle = function (t, e, i, s) { t.active = s; var n = this.getStyle(e, s); this._resolveAnimations(e, i, s).update(t, { options: !s && this.getSharedOptions(n) || n }); };
        Ps.prototype.removeHoverStyle = function (t, e, i) { this._setStyle(t, i, "active", !1); };
        Ps.prototype.setHoverStyle = function (t, e, i) { this._setStyle(t, i, "active", !0); };
        Ps.prototype._removeDatasetHoverStyle = function () { var t = this._cachedMeta.dataset; t && this._setStyle(t, void 0, "active", !1); };
        Ps.prototype._setDatasetHoverStyle = function () { var t = this._cachedMeta.dataset; t && this._setStyle(t, void 0, "active", !0); };
        Ps.prototype._resyncElements = function (t) { var e = this._data, i = this._cachedMeta.data; for (var _b = 0, _c = this._syncList; _b < _c.length; _b++) {
            var _d = _c[_b], t_30 = _d[0], e_23 = _d[1], i_20 = _d[2];
            this[t_30](e_23, i_20);
        } this._syncList = []; var s = i.length, n = e.length, o = Math.min(n, s); o && this.parse(0, o), n > s ? this._insertElements(s, n - s, t) : n < s && this._removeElements(n, s - n); };
        Ps.prototype._insertElements = function (t, e, i) {
            if (i === void 0) { i = !0; }
            var s = this._cachedMeta, n = s.data, o = t + e;
            var a;
            var r = function (t) { for (t.length += e, a = t.length - 1; a >= o; a--)
                t[a] = t[a - e]; };
            for (r(n), a = t; a < o; ++a)
                n[a] = new this.dataElementType;
            this._parsing && r(s._parsed), this.parse(t, e), i && this.updateElements(n, t, e, "reset");
        };
        Ps.prototype.updateElements = function (t, e, i, s) { };
        Ps.prototype._removeElements = function (t, e) { var i = this._cachedMeta; if (this._parsing) {
            var s_16 = i._parsed.splice(t, e);
            i._stacked && Ms(i, s_16);
        } i.data.splice(t, e); };
        Ps.prototype._sync = function (t) { if (this._parsing)
            this._syncList.push(t);
        else {
            var e_24 = t[0], i_21 = t[1], s_17 = t[2];
            this[e_24](i_21, s_17);
        } this.chart._dataChanges.push(__spreadArray([this.index], t, true)); };
        Ps.prototype._onDataPush = function () { var t = arguments.length; this._sync(["_insertElements", this.getDataset().data.length - t, t]); };
        Ps.prototype._onDataPop = function () { this._sync(["_removeElements", this._cachedMeta.data.length - 1, 1]); };
        Ps.prototype._onDataShift = function () { this._sync(["_removeElements", 0, 1]); };
        Ps.prototype._onDataSplice = function (t, e) { e && this._sync(["_removeElements", t, e]); var i = arguments.length - 2; i && this._sync(["_insertElements", t, i]); };
        Ps.prototype._onDataUnshift = function () { this._sync(["_insertElements", 0, arguments.length]); };
        return Ps;
    }());
    Ps.defaults = {}, Ps.prototype.datasetElementType = null, Ps.prototype.dataElementType = null;
    var Ds = /** @class */ (function () {
        function Ds() {
            this.x = void 0, this.y = void 0, this.active = !1, this.options = void 0, this.$animations = void 0;
        }
        Ds.prototype.tooltipPosition = function (t) { var _b = this.getProps(["x", "y"], t), e = _b.x, i = _b.y; return { x: e, y: i }; };
        Ds.prototype.hasValue = function () { return Tt(this.x) && Tt(this.y); };
        Ds.prototype.getProps = function (t, e) {
            var _this = this;
            var i = this.$animations;
            if (!e || !i)
                return this;
            var s = {};
            return t.forEach((function (t) { s[t] = i[t] && i[t].active() ? i[t]._to : _this[t]; })), s;
        };
        return Ds;
    }());
    Ds.defaults = {}, Ds.defaultRoutes = void 0;
    var Cs = { values: function (t) { return Y(t) ? t : "" + t; }, numeric: function (t, e, i) { if (0 === t)
            return "0"; var s = this.chart.options.locale; var n, o = t; if (i.length > 1) {
            var e_25 = Math.max(Math.abs(i[0].value), Math.abs(i[i.length - 1].value));
            (e_25 < 1e-4 || e_25 > 1e15) && (n = "scientific"), o = function (t, e) { var i = e.length > 3 ? e[2].value - e[1].value : e[1].value - e[0].value; Math.abs(i) >= 1 && t !== Math.floor(t) && (i = t - Math.floor(t)); return i; }(t, i);
        } var a = Dt(Math.abs(o)), r = Math.max(Math.min(-1 * Math.floor(a), 20), 0), l = { notation: n, minimumFractionDigits: r, maximumFractionDigits: r }; return Object.assign(l, this.options.ticks.format), Ri(t, s, l); }, logarithmic: function (t, e, i) { if (0 === t)
            return "0"; var s = t / Math.pow(10, Math.floor(Dt(t))); return 1 === s || 2 === s || 5 === s ? Cs.numeric.call(this, t, e, i) : ""; } };
    var Os = { formatters: Cs };
    function As(t, e) { var i = t.options.ticks, s = i.maxTicksLimit || function (t) { var e = t.options.offset, i = t._tickSize(), s = t._length / i + (e ? 0 : 1), n = t._maxLength / i; return Math.floor(Math.min(s, n)); }(t), n = i.major.enabled ? function (t) { var e = []; var i, s; for (i = 0, s = t.length; i < s; i++)
        t[i].major && e.push(i); return e; }(e) : [], o = n.length, a = n[0], r = n[o - 1], l = []; if (o > s)
        return function (t, e, i, s) { var n, o = 0, a = i[0]; for (s = Math.ceil(s), n = 0; n < t.length; n++)
            n === a && (e.push(t[n]), o++, a = i[o * s]); }(e, l, n, o / s), l; var h = function (t, e, i) { var s = function (t) { var e = t.length; var i, s; if (e < 2)
        return !1; for (s = t[0], i = 1; i < e; ++i)
        if (t[i] - t[i - 1] !== s)
            return !1; return s; }(t), n = e.length / i; if (!s)
        return Math.max(n, 1); var o = At(s); for (var t_31 = 0, e_26 = o.length - 1; t_31 < e_26; t_31++) {
        var e_27 = o[t_31];
        if (e_27 > n)
            return e_27;
    } return Math.max(n, 1); }(n, e, s); if (o > 0) {
        var t_32, i_22;
        var s_18 = o > 1 ? Math.round((r - a) / (o - 1)) : null;
        for (Ts(e, l, h, $(s_18) ? 0 : a - s_18, a), t_32 = 0, i_22 = o - 1; t_32 < i_22; t_32++)
            Ts(e, l, h, n[t_32], n[t_32 + 1]);
        return Ts(e, l, h, r, $(s_18) ? e.length : r + s_18), l;
    } return Ts(e, l, h), l; }
    function Ts(t, e, i, s, n) { var o = K(s, 0), a = Math.min(K(n, t.length), t.length); var r, l, h, c = 0; for (i = Math.ceil(i), n && (r = n - s, i = r / Math.floor(r / i)), h = o; h < 0;)
        c++, h = Math.round(o + c * i); for (l = Math.max(o, 0); l < a; l++)
        l === h && (e.push(t[l]), c++, h = Math.round(o + c * i)); }
    bt.set("scale", { display: !0, offset: !1, reverse: !1, beginAtZero: !1, bounds: "ticks", grace: 0, grid: { display: !0, lineWidth: 1, drawBorder: !0, drawOnChartArea: !0, drawTicks: !0, tickLength: 8, tickWidth: function (t, e) { return e.lineWidth; }, tickColor: function (t, e) { return e.color; }, offset: !1, borderDash: [], borderDashOffset: 0, borderWidth: 1 }, title: { display: !1, text: "", padding: { top: 4, bottom: 4 } }, ticks: { minRotation: 0, maxRotation: 50, mirror: !1, textStrokeWidth: 0, textStrokeColor: "", padding: 3, display: !0, autoSkip: !0, autoSkipPadding: 3, labelOffset: 0, callback: Os.formatters.values, minor: {}, major: {}, align: "center", crossAlign: "near", showLabelBackdrop: !1, backdropColor: "rgba(255, 255, 255, 0.75)", backdropPadding: 2 } }), bt.route("scale.ticks", "color", "", "color"), bt.route("scale.grid", "color", "", "borderColor"), bt.route("scale.grid", "borderColor", "", "borderColor"), bt.route("scale.title", "color", "", "color"), bt.describe("scale", { _fallback: !1, _scriptable: function (t) { return !t.startsWith("before") && !t.startsWith("after") && "callback" !== t && "parser" !== t; }, _indexable: function (t) { return "borderDash" !== t && "tickBorderDash" !== t; } }), bt.describe("scales", { _fallback: "scale" }), bt.describe("scale.ticks", { _scriptable: function (t) { return "backdropPadding" !== t && "callback" !== t; }, _indexable: function (t) { return "backdropPadding" !== t; } });
    var Ls = function (t, e, i) { return "top" === e || "left" === e ? t[e] + i : t[e] - i; };
    function Rs(t, e) { var i = [], s = t.length / e, n = t.length; var o = 0; for (; o < n; o += s)
        i.push(t[Math.floor(o)]); return i; }
    function Es(t, e, i) { var s = t.ticks.length, n = Math.min(e, s - 1), o = t._startPixel, a = t._endPixel, r = 1e-6; var l, h = t.getPixelForTick(n); if (!(i && (l = 1 === s ? Math.max(h - o, a - h) : 0 === e ? (t.getPixelForTick(1) - h) / 2 : (h - t.getPixelForTick(n - 1)) / 2, h += n < e ? l : -l, h < o - r || h > a + r)))
        return h; }
    function Is(t) { return t.drawTicks ? t.tickLength : 0; }
    function zs(t, e) { if (!t.display)
        return 0; var i = He(t.font, e), s = Ne(t.padding); return (Y(t.text) ? t.text.length : 1) * i.lineHeight + s.height; }
    function Fs(t, e, i) { var n = s(t); return (i && "right" !== e || !i && "right" === e) && (n = (function (t) { return "left" === t ? "right" : "right" === t ? "left" : t; })(n)), n; }
    var Bs = /** @class */ (function (_super) {
        __extends(Bs, _super);
        function Bs(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.id = t.id, _this.type = t.type, _this.options = void 0, _this.ctx = t.ctx, _this.chart = t.chart, _this.top = void 0, _this.bottom = void 0, _this.left = void 0, _this.right = void 0, _this.width = void 0, _this.height = void 0, _this._margins = { left: 0, right: 0, top: 0, bottom: 0 }, _this.maxWidth = void 0, _this.maxHeight = void 0, _this.paddingTop = void 0, _this.paddingBottom = void 0, _this.paddingLeft = void 0, _this.paddingRight = void 0, _this.axis = void 0, _this.labelRotation = void 0, _this.min = void 0, _this.max = void 0, _this._range = void 0, _this.ticks = [], _this._gridLineItems = null, _this._labelItems = null, _this._labelSizes = null, _this._length = 0, _this._maxLength = 0, _this._longestTextCache = {}, _this._startPixel = void 0, _this._endPixel = void 0, _this._reversePixels = !1, _this._userMax = void 0, _this._userMin = void 0, _this._suggestedMax = void 0, _this._suggestedMin = void 0, _this._ticksLength = 0, _this._borderValue = 0, _this._cache = {}, _this._dataLimitsCached = !1, _this.$context = void 0;
            return _this;
        }
        Bs.prototype.init = function (t) { this.options = t.setContext(this.getContext()), this.axis = t.axis, this._userMin = this.parse(t.min), this._userMax = this.parse(t.max), this._suggestedMin = this.parse(t.suggestedMin), this._suggestedMax = this.parse(t.suggestedMax); };
        Bs.prototype.parse = function (t, e) { return t; };
        Bs.prototype.getUserBounds = function () { var _b = this, t = _b._userMin, e = _b._userMax, i = _b._suggestedMin, s = _b._suggestedMax; return t = q(t, Number.POSITIVE_INFINITY), e = q(e, Number.NEGATIVE_INFINITY), i = q(i, Number.POSITIVE_INFINITY), s = q(s, Number.NEGATIVE_INFINITY), { min: q(t, i), max: q(e, s), minDefined: X(t), maxDefined: X(e) }; };
        Bs.prototype.getMinMax = function (t) { var e, _b = this.getUserBounds(), i = _b.min, s = _b.max, n = _b.minDefined, o = _b.maxDefined; if (n && o)
            return { min: i, max: s }; var a = this.getMatchingVisibleMetas(); for (var r_7 = 0, l_9 = a.length; r_7 < l_9; ++r_7)
            e = a[r_7].controller.getMinMax(this, t), n || (i = Math.min(i, e.min)), o || (s = Math.max(s, e.max)); return i = o && i > s ? s : i, s = n && i > s ? i : s, { min: q(i, q(s, i)), max: q(s, q(i, s)) }; };
        Bs.prototype.getPadding = function () { return { left: this.paddingLeft || 0, top: this.paddingTop || 0, right: this.paddingRight || 0, bottom: this.paddingBottom || 0 }; };
        Bs.prototype.getTicks = function () { return this.ticks; };
        Bs.prototype.getLabels = function () { var t = this.chart.data; return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || []; };
        Bs.prototype.beforeLayout = function () { this._cache = {}, this._dataLimitsCached = !1; };
        Bs.prototype.beforeUpdate = function () { J(this.options.beforeUpdate, [this]); };
        Bs.prototype.update = function (t, e, i) { var _b = this.options, s = _b.beginAtZero, n = _b.grace, o = _b.ticks, a = o.sampleSize; this.beforeUpdate(), this.maxWidth = t, this.maxHeight = e, this._margins = i = Object.assign({ left: 0, right: 0, top: 0, bottom: 0 }, i), this.ticks = null, this._labelSizes = null, this._gridLineItems = null, this._labelItems = null, this.beforeSetDimensions(), this.setDimensions(), this.afterSetDimensions(), this._maxLength = this.isHorizontal() ? this.width + i.left + i.right : this.height + i.top + i.bottom, this._dataLimitsCached || (this.beforeDataLimits(), this.determineDataLimits(), this.afterDataLimits(), this._range = $e(this, n, s), this._dataLimitsCached = !0), this.beforeBuildTicks(), this.ticks = this.buildTicks() || [], this.afterBuildTicks(); var r = a < this.ticks.length; this._convertTicksToLabels(r ? Rs(this.ticks, a) : this.ticks), this.configure(), this.beforeCalculateLabelRotation(), this.calculateLabelRotation(), this.afterCalculateLabelRotation(), o.display && (o.autoSkip || "auto" === o.source) && (this.ticks = As(this, this.ticks), this._labelSizes = null), r && this._convertTicksToLabels(this.ticks), this.beforeFit(), this.fit(), this.afterFit(), this.afterUpdate(); };
        Bs.prototype.configure = function () { var t, e, i = this.options.reverse; this.isHorizontal() ? (t = this.left, e = this.right) : (t = this.top, e = this.bottom, i = !i), this._startPixel = t, this._endPixel = e, this._reversePixels = i, this._length = e - t, this._alignToPixels = this.options.alignToPixels; };
        Bs.prototype.afterUpdate = function () { J(this.options.afterUpdate, [this]); };
        Bs.prototype.beforeSetDimensions = function () { J(this.options.beforeSetDimensions, [this]); };
        Bs.prototype.setDimensions = function () { this.isHorizontal() ? (this.width = this.maxWidth, this.left = 0, this.right = this.width) : (this.height = this.maxHeight, this.top = 0, this.bottom = this.height), this.paddingLeft = 0, this.paddingTop = 0, this.paddingRight = 0, this.paddingBottom = 0; };
        Bs.prototype.afterSetDimensions = function () { J(this.options.afterSetDimensions, [this]); };
        Bs.prototype._callHooks = function (t) { this.chart.notifyPlugins(t, this.getContext()), J(this.options[t], [this]); };
        Bs.prototype.beforeDataLimits = function () { this._callHooks("beforeDataLimits"); };
        Bs.prototype.determineDataLimits = function () { };
        Bs.prototype.afterDataLimits = function () { this._callHooks("afterDataLimits"); };
        Bs.prototype.beforeBuildTicks = function () { this._callHooks("beforeBuildTicks"); };
        Bs.prototype.buildTicks = function () { return []; };
        Bs.prototype.afterBuildTicks = function () { this._callHooks("afterBuildTicks"); };
        Bs.prototype.beforeTickToLabelConversion = function () { J(this.options.beforeTickToLabelConversion, [this]); };
        Bs.prototype.generateTickLabels = function (t) { var e = this.options.ticks; var i, s, n; for (i = 0, s = t.length; i < s; i++)
            n = t[i], n.label = J(e.callback, [n.value, i, t], this); };
        Bs.prototype.afterTickToLabelConversion = function () { J(this.options.afterTickToLabelConversion, [this]); };
        Bs.prototype.beforeCalculateLabelRotation = function () { J(this.options.beforeCalculateLabelRotation, [this]); };
        Bs.prototype.calculateLabelRotation = function () { var t = this.options, e = t.ticks, i = this.ticks.length, s = e.minRotation || 0, n = e.maxRotation; var o, a, r, l = s; if (!this._isVisible() || !e.display || s >= n || i <= 1 || !this.isHorizontal())
            return void (this.labelRotation = s); var h = this._getLabelSizes(), c = h.widest.width, d = h.highest.height, u = jt(this.chart.width - c, 0, this.maxWidth); o = t.offset ? this.maxWidth / i : u / (i - 1), c + 6 > o && (o = u / (i - (t.offset ? .5 : 1)), a = this.maxHeight - Is(t.grid) - e.padding - zs(t.title, this.chart.options.font), r = Math.sqrt(c * c + d * d), l = zt(Math.min(Math.asin(jt((h.highest.height + 6) / o, -1, 1)), Math.asin(jt(a / r, -1, 1)) - Math.asin(jt(d / r, -1, 1)))), l = Math.max(s, Math.min(n, l))), this.labelRotation = l; };
        Bs.prototype.afterCalculateLabelRotation = function () { J(this.options.afterCalculateLabelRotation, [this]); };
        Bs.prototype.beforeFit = function () { J(this.options.beforeFit, [this]); };
        Bs.prototype.fit = function () { var t = { width: 0, height: 0 }, _b = this, e = _b.chart, _c = _b.options, i = _c.ticks, s = _c.title, n = _c.grid, o = this._isVisible(), a = this.isHorizontal(); if (o) {
            var o_15 = zs(s, e.options.font);
            if (a ? (t.width = this.maxWidth, t.height = Is(n) + o_15) : (t.height = this.maxHeight, t.width = Is(n) + o_15), i.display && this.ticks.length) {
                var _d = this._getLabelSizes(), e_28 = _d.first, s_19 = _d.last, n_15 = _d.widest, o_16 = _d.highest, r_8 = 2 * i.padding, l_10 = It(this.labelRotation), h_8 = Math.cos(l_10), c_5 = Math.sin(l_10);
                if (a) {
                    var e_29 = i.mirror ? 0 : c_5 * n_15.width + h_8 * o_16.height;
                    t.height = Math.min(this.maxHeight, t.height + e_29 + r_8);
                }
                else {
                    var e_30 = i.mirror ? 0 : h_8 * n_15.width + c_5 * o_16.height;
                    t.width = Math.min(this.maxWidth, t.width + e_30 + r_8);
                }
                this._calculatePadding(e_28, s_19, c_5, h_8);
            }
        } this._handleMargins(), a ? (this.width = this._length = e.width - this._margins.left - this._margins.right, this.height = t.height) : (this.width = t.width, this.height = this._length = e.height - this._margins.top - this._margins.bottom); };
        Bs.prototype._calculatePadding = function (t, e, i, s) { var _b = this.options, _c = _b.ticks, n = _c.align, o = _c.padding, a = _b.position, r = 0 !== this.labelRotation, l = "top" !== a && "x" === this.axis; if (this.isHorizontal()) {
            var a_11 = this.getPixelForTick(0) - this.left, h_9 = this.right - this.getPixelForTick(this.ticks.length - 1);
            var c_6 = 0, d_4 = 0;
            r ? l ? (c_6 = s * t.width, d_4 = i * e.height) : (c_6 = i * t.height, d_4 = s * e.width) : "start" === n ? d_4 = e.width : "end" === n ? c_6 = t.width : (c_6 = t.width / 2, d_4 = e.width / 2), this.paddingLeft = Math.max((c_6 - a_11 + o) * this.width / (this.width - a_11), 0), this.paddingRight = Math.max((d_4 - h_9 + o) * this.width / (this.width - h_9), 0);
        }
        else {
            var i_23 = e.height / 2, s_20 = t.height / 2;
            "start" === n ? (i_23 = 0, s_20 = t.height) : "end" === n && (i_23 = e.height, s_20 = 0), this.paddingTop = i_23 + o, this.paddingBottom = s_20 + o;
        } };
        Bs.prototype._handleMargins = function () { this._margins && (this._margins.left = Math.max(this.paddingLeft, this._margins.left), this._margins.top = Math.max(this.paddingTop, this._margins.top), this._margins.right = Math.max(this.paddingRight, this._margins.right), this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom)); };
        Bs.prototype.afterFit = function () { J(this.options.afterFit, [this]); };
        Bs.prototype.isHorizontal = function () { var _b = this.options, t = _b.axis, e = _b.position; return "top" === e || "bottom" === e || "x" === t; };
        Bs.prototype.isFullSize = function () { return this.options.fullSize; };
        Bs.prototype._convertTicksToLabels = function (t) { var e, i; for (this.beforeTickToLabelConversion(), this.generateTickLabels(t), e = 0, i = t.length; e < i; e++)
            $(t[e].label) && (t.splice(e, 1), i--, e--); this.afterTickToLabelConversion(); };
        Bs.prototype._getLabelSizes = function () { var t = this._labelSizes; if (!t) {
            var e_31 = this.options.ticks.sampleSize;
            var i_24 = this.ticks;
            e_31 < i_24.length && (i_24 = Rs(i_24, e_31)), this._labelSizes = t = this._computeLabelSizes(i_24, i_24.length);
        } return t; };
        Bs.prototype._computeLabelSizes = function (t, e) { var _b = this, i = _b.ctx, s = _b._longestTextCache, n = [], o = []; var a, r, l, h, c, d, u, f, g, p, m, x = 0, b = 0; for (a = 0; a < e; ++a) {
            if (h = t[a].label, c = this._resolveTickFontOptions(a), i.font = d = c.string, u = s[d] = s[d] || { data: {}, gc: [] }, f = c.lineHeight, g = p = 0, $(h) || Y(h)) {
                if (Y(h))
                    for (r = 0, l = h.length; r < l; ++r)
                        m = h[r], $(m) || Y(m) || (g = Xt(i, u.data, u.gc, g, m), p += f);
            }
            else
                g = Xt(i, u.data, u.gc, g, h), p = f;
            n.push(g), o.push(p), x = Math.max(g, x), b = Math.max(p, b);
        } !function (t, e) { Q(t, (function (t) { var i = t.gc, s = i.length / 2; var n; if (s > e) {
            for (n = 0; n < s; ++n)
                delete t.data[i[n]];
            i.splice(0, s);
        } })); }(s, e); var _ = n.indexOf(x), y = o.indexOf(b), v = function (t) { return ({ width: n[t] || 0, height: o[t] || 0 }); }; return { first: v(0), last: v(e - 1), widest: v(_), highest: v(y), widths: n, heights: o }; };
        Bs.prototype.getLabelForValue = function (t) { return t; };
        Bs.prototype.getPixelForValue = function (t, e) { return NaN; };
        Bs.prototype.getValueForPixel = function (t) { };
        Bs.prototype.getPixelForTick = function (t) { var e = this.ticks; return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value); };
        Bs.prototype.getPixelForDecimal = function (t) { this._reversePixels && (t = 1 - t); var e = this._startPixel + t * this._length; return $t(this._alignToPixels ? Kt(this.chart, e, 0) : e); };
        Bs.prototype.getDecimalForPixel = function (t) { var e = (t - this._startPixel) / this._length; return this._reversePixels ? 1 - e : e; };
        Bs.prototype.getBasePixel = function () { return this.getPixelForValue(this.getBaseValue()); };
        Bs.prototype.getBaseValue = function () { var _b = this, t = _b.min, e = _b.max; return t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0; };
        Bs.prototype.getContext = function (t) { var e = this.ticks || []; if (t >= 0 && t < e.length) {
            var i_25 = e[t];
            return i_25.$context || (i_25.$context = function (t, e, i) { return Ye(t, { tick: i, index: e, type: "tick" }); }(this.getContext(), t, i_25));
        } return this.$context || (this.$context = Ye(this.chart.getContext(), { scale: this, type: "scale" })); };
        Bs.prototype._tickSize = function () { var t = this.options.ticks, e = It(this.labelRotation), i = Math.abs(Math.cos(e)), s = Math.abs(Math.sin(e)), n = this._getLabelSizes(), o = t.autoSkipPadding || 0, a = n ? n.widest.width + o : 0, r = n ? n.highest.height + o : 0; return this.isHorizontal() ? r * i > a * s ? a / i : r / s : r * s < a * i ? r / i : a / s; };
        Bs.prototype._isVisible = function () { var t = this.options.display; return "auto" !== t ? !!t : this.getMatchingVisibleMetas().length > 0; };
        Bs.prototype._computeGridLineItems = function (t) { var e = this.axis, i = this.chart, s = this.options, n = s.grid, o = s.position, a = n.offset, r = this.isHorizontal(), l = this.ticks.length + (a ? 1 : 0), h = Is(n), c = [], d = n.setContext(this.getContext()), u = d.drawBorder ? d.borderWidth : 0, f = u / 2, g = function (t) { return Kt(i, t, u); }; var p, m, x, b, _, y, v, w, M, k, S, P; if ("top" === o)
            p = g(this.bottom), y = this.bottom - h, w = p - f, k = g(t.top) + f, P = t.bottom;
        else if ("bottom" === o)
            p = g(this.top), k = t.top, P = g(t.bottom) - f, y = p + f, w = this.top + h;
        else if ("left" === o)
            p = g(this.right), _ = this.right - h, v = p - f, M = g(t.left) + f, S = t.right;
        else if ("right" === o)
            p = g(this.left), M = t.left, S = g(t.right) - f, _ = p + f, v = this.left + h;
        else if ("x" === e) {
            if ("center" === o)
                p = g((t.top + t.bottom) / 2 + .5);
            else if (U(o)) {
                var t_33 = Object.keys(o)[0], e_32 = o[t_33];
                p = g(this.chart.scales[t_33].getPixelForValue(e_32));
            }
            k = t.top, P = t.bottom, y = p + f, w = y + h;
        }
        else if ("y" === e) {
            if ("center" === o)
                p = g((t.left + t.right) / 2);
            else if (U(o)) {
                var t_34 = Object.keys(o)[0], e_33 = o[t_34];
                p = g(this.chart.scales[t_34].getPixelForValue(e_33));
            }
            _ = p - f, v = _ - h, M = t.left, S = t.right;
        } var D = K(s.ticks.maxTicksLimit, l), C = Math.max(1, Math.ceil(l / D)); for (m = 0; m < l; m += C) {
            var t_35 = n.setContext(this.getContext(m)), e_34 = t_35.lineWidth, s_21 = t_35.color, o_17 = n.borderDash || [], l_11 = t_35.borderDashOffset, h_10 = t_35.tickWidth, d_5 = t_35.tickColor, u_1 = t_35.tickBorderDash || [], f_1 = t_35.tickBorderDashOffset;
            x = Es(this, m, a), void 0 !== x && (b = Kt(i, x, e_34), r ? _ = v = M = S = b : y = w = k = P = b, c.push({ tx1: _, ty1: y, tx2: v, ty2: w, x1: M, y1: k, x2: S, y2: P, width: e_34, color: s_21, borderDash: o_17, borderDashOffset: l_11, tickWidth: h_10, tickColor: d_5, tickBorderDash: u_1, tickBorderDashOffset: f_1 }));
        } return this._ticksLength = l, this._borderValue = p, c; };
        Bs.prototype._computeLabelItems = function (t) { var e = this.axis, i = this.options, s = i.position, n = i.ticks, o = this.isHorizontal(), a = this.ticks, r = n.align, l = n.crossAlign, h = n.padding, c = n.mirror, d = Is(i.grid), u = d + h, f = c ? -h : u, g = -It(this.labelRotation), p = []; var m, x, b, _, y, v, w, M, k, S, P, D, C = "middle"; if ("top" === s)
            v = this.bottom - f, w = this._getXAxisLabelAlignment();
        else if ("bottom" === s)
            v = this.top + f, w = this._getXAxisLabelAlignment();
        else if ("left" === s) {
            var t_36 = this._getYAxisLabelAlignment(d);
            w = t_36.textAlign, y = t_36.x;
        }
        else if ("right" === s) {
            var t_37 = this._getYAxisLabelAlignment(d);
            w = t_37.textAlign, y = t_37.x;
        }
        else if ("x" === e) {
            if ("center" === s)
                v = (t.top + t.bottom) / 2 + u;
            else if (U(s)) {
                var t_38 = Object.keys(s)[0], e_35 = s[t_38];
                v = this.chart.scales[t_38].getPixelForValue(e_35) + u;
            }
            w = this._getXAxisLabelAlignment();
        }
        else if ("y" === e) {
            if ("center" === s)
                y = (t.left + t.right) / 2 - u;
            else if (U(s)) {
                var t_39 = Object.keys(s)[0], e_36 = s[t_39];
                y = this.chart.scales[t_39].getPixelForValue(e_36);
            }
            w = this._getYAxisLabelAlignment(d).textAlign;
        } "y" === e && ("start" === r ? C = "top" : "end" === r && (C = "bottom")); var O = this._getLabelSizes(); for (m = 0, x = a.length; m < x; ++m) {
            b = a[m], _ = b.label;
            var t_40 = n.setContext(this.getContext(m));
            M = this.getPixelForTick(m) + n.labelOffset, k = this._resolveTickFontOptions(m), S = k.lineHeight, P = Y(_) ? _.length : 1;
            var e_37 = P / 2, i_26 = t_40.color, r_9 = t_40.textStrokeColor, h_11 = t_40.textStrokeWidth;
            var d_6 = void 0;
            if (o ? (y = M, D = "top" === s ? "near" === l || 0 !== g ? -P * S + S / 2 : "center" === l ? -O.highest.height / 2 - e_37 * S + S : -O.highest.height + S / 2 : "near" === l || 0 !== g ? S / 2 : "center" === l ? O.highest.height / 2 - e_37 * S : O.highest.height - P * S, c && (D *= -1)) : (v = M, D = (1 - P) * S / 2), t_40.showLabelBackdrop) {
                var e_38 = Ne(t_40.backdropPadding), i_27 = O.heights[m], s_22 = O.widths[m];
                var n_16 = v + D - e_38.top, o_18 = y - e_38.left;
                switch (C) {
                    case "middle":
                        n_16 -= i_27 / 2;
                        break;
                    case "bottom": n_16 -= i_27;
                }
                switch (w) {
                    case "center":
                        o_18 -= s_22 / 2;
                        break;
                    case "right": o_18 -= s_22;
                }
                d_6 = { left: o_18, top: n_16, width: s_22 + e_38.width, height: i_27 + e_38.height, color: t_40.backdropColor };
            }
            p.push({ rotation: g, label: _, font: k, color: i_26, strokeColor: r_9, strokeWidth: h_11, textOffset: D, textAlign: w, textBaseline: C, translation: [y, v], backdrop: d_6 });
        } return p; };
        Bs.prototype._getXAxisLabelAlignment = function () { var _b = this.options, t = _b.position, e = _b.ticks; if (-It(this.labelRotation))
            return "top" === t ? "left" : "right"; var i = "center"; return "start" === e.align ? i = "left" : "end" === e.align && (i = "right"), i; };
        Bs.prototype._getYAxisLabelAlignment = function (t) { var _b = this.options, e = _b.position, _c = _b.ticks, i = _c.crossAlign, s = _c.mirror, n = _c.padding, o = t + n, a = this._getLabelSizes().widest.width; var r, l; return "left" === e ? s ? (l = this.right + n, "near" === i ? r = "left" : "center" === i ? (r = "center", l += a / 2) : (r = "right", l += a)) : (l = this.right - o, "near" === i ? r = "right" : "center" === i ? (r = "center", l -= a / 2) : (r = "left", l = this.left)) : "right" === e ? s ? (l = this.left + n, "near" === i ? r = "right" : "center" === i ? (r = "center", l -= a / 2) : (r = "left", l -= a)) : (l = this.left + o, "near" === i ? r = "left" : "center" === i ? (r = "center", l += a / 2) : (r = "right", l = this.right)) : r = "right", { textAlign: r, x: l }; };
        Bs.prototype._computeLabelArea = function () { if (this.options.ticks.mirror)
            return; var t = this.chart, e = this.options.position; return "left" === e || "right" === e ? { top: 0, left: this.left, bottom: t.height, right: this.right } : "top" === e || "bottom" === e ? { top: this.top, left: 0, bottom: this.bottom, right: t.width } : void 0; };
        Bs.prototype.drawBackground = function () { var _b = this, t = _b.ctx, e = _b.options.backgroundColor, i = _b.left, s = _b.top, n = _b.width, o = _b.height; e && (t.save(), t.fillStyle = e, t.fillRect(i, s, n, o), t.restore()); };
        Bs.prototype.getLineWidthForValue = function (t) { var e = this.options.grid; if (!this._isVisible() || !e.display)
            return 0; var i = this.ticks.findIndex((function (e) { return e.value === t; })); if (i >= 0) {
            return e.setContext(this.getContext(i)).lineWidth;
        } return 0; };
        Bs.prototype.drawGrid = function (t) { var e = this.options.grid, i = this.ctx, s = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(t)); var n, o; var a = function (t, e, s) { s.width && s.color && (i.save(), i.lineWidth = s.width, i.strokeStyle = s.color, i.setLineDash(s.borderDash || []), i.lineDashOffset = s.borderDashOffset, i.beginPath(), i.moveTo(t.x, t.y), i.lineTo(e.x, e.y), i.stroke(), i.restore()); }; if (e.display)
            for (n = 0, o = s.length; n < o; ++n) {
                var t_41 = s[n];
                e.drawOnChartArea && a({ x: t_41.x1, y: t_41.y1 }, { x: t_41.x2, y: t_41.y2 }, t_41), e.drawTicks && a({ x: t_41.tx1, y: t_41.ty1 }, { x: t_41.tx2, y: t_41.ty2 }, { color: t_41.tickColor, width: t_41.tickWidth, borderDash: t_41.tickBorderDash, borderDashOffset: t_41.tickBorderDashOffset });
            } };
        Bs.prototype.drawBorder = function () { var _b = this, t = _b.chart, e = _b.ctx, i = _b.options.grid, s = i.setContext(this.getContext()), n = i.drawBorder ? s.borderWidth : 0; if (!n)
            return; var o = i.setContext(this.getContext(0)).lineWidth, a = this._borderValue; var r, l, h, c; this.isHorizontal() ? (r = Kt(t, this.left, n) - n / 2, l = Kt(t, this.right, o) + o / 2, h = c = a) : (h = Kt(t, this.top, n) - n / 2, c = Kt(t, this.bottom, o) + o / 2, r = l = a), e.save(), e.lineWidth = s.borderWidth, e.strokeStyle = s.borderColor, e.beginPath(), e.moveTo(r, h), e.lineTo(l, c), e.stroke(), e.restore(); };
        Bs.prototype.drawLabels = function (t) { if (!this.options.ticks.display)
            return; var e = this.ctx, i = this._computeLabelArea(); i && Qt(e, i); var s = this._labelItems || (this._labelItems = this._computeLabelItems(t)); var n, o; for (n = 0, o = s.length; n < o; ++n) {
            var t_42 = s[n], i_28 = t_42.font, o_19 = t_42.label;
            t_42.backdrop && (e.fillStyle = t_42.backdrop.color, e.fillRect(t_42.backdrop.left, t_42.backdrop.top, t_42.backdrop.width, t_42.backdrop.height)), se(e, o_19, 0, t_42.textOffset, i_28, t_42);
        } i && te(e); };
        Bs.prototype.drawTitle = function () { var _b = this, t = _b.ctx, _c = _b.options, e = _c.position, i = _c.title, s = _c.reverse; if (!i.display)
            return; var o = He(i.font), a = Ne(i.padding), r = i.align; var l = o.lineHeight / 2; "bottom" === e || "center" === e || U(e) ? (l += a.bottom, Y(i.text) && (l += o.lineHeight * (i.text.length - 1))) : l += a.top; var _d = function (t, e, i, s) { var o = t.top, a = t.left, r = t.bottom, l = t.right, h = t.chart, c = h.chartArea, d = h.scales; var u, f, g, p = 0; var m = r - o, x = l - a; if (t.isHorizontal()) {
            if (f = n(s, a, l), U(i)) {
                var t_43 = Object.keys(i)[0], s_23 = i[t_43];
                g = d[t_43].getPixelForValue(s_23) + m - e;
            }
            else
                g = "center" === i ? (c.bottom + c.top) / 2 + m - e : Ls(t, i, e);
            u = l - a;
        }
        else {
            if (U(i)) {
                var t_44 = Object.keys(i)[0], s_24 = i[t_44];
                f = d[t_44].getPixelForValue(s_24) - x + e;
            }
            else
                f = "center" === i ? (c.left + c.right) / 2 - x + e : Ls(t, i, e);
            g = n(s, r, o), p = "left" === i ? -kt : kt;
        } return { titleX: f, titleY: g, maxWidth: u, rotation: p }; }(this, l, e, r), h = _d.titleX, c = _d.titleY, d = _d.maxWidth, u = _d.rotation; se(t, i.text, 0, 0, o, { color: i.color, maxWidth: d, rotation: u, textAlign: Fs(r, e, s), textBaseline: "middle", translation: [h, c] }); };
        Bs.prototype.draw = function (t) { this._isVisible() && (this.drawBackground(), this.drawGrid(t), this.drawBorder(), this.drawTitle(), this.drawLabels(t)); };
        Bs.prototype._layers = function () {
            var _this = this;
            var t = this.options, e = t.ticks && t.ticks.z || 0, i = K(t.grid && t.grid.z, -1);
            return this._isVisible() && this.draw === Bs.prototype.draw ? [{ z: i, draw: function (t) { _this.drawBackground(), _this.drawGrid(t), _this.drawTitle(); } }, { z: i + 1, draw: function () { _this.drawBorder(); } }, { z: e, draw: function (t) { _this.drawLabels(t); } }] : [{ z: e, draw: function (t) { _this.draw(t); } }];
        };
        Bs.prototype.getMatchingVisibleMetas = function (t) { var e = this.chart.getSortedVisibleDatasetMetas(), i = this.axis + "AxisID", s = []; var n, o; for (n = 0, o = e.length; n < o; ++n) {
            var o_20 = e[n];
            o_20[i] !== this.id || t && o_20.type !== t || s.push(o_20);
        } return s; };
        Bs.prototype._resolveTickFontOptions = function (t) { return He(this.options.ticks.setContext(this.getContext(t)).font); };
        Bs.prototype._maxDigits = function () { var t = this._resolveTickFontOptions(0).lineHeight; return (this.isHorizontal() ? this.width : this.height) / t; };
        return Bs;
    }(Ds));
    var Vs = /** @class */ (function () {
        function Vs(t, e, i) {
            this.type = t, this.scope = e, this.override = i, this.items = Object.create(null);
        }
        Vs.prototype.isForType = function (t) { return Object.prototype.isPrototypeOf.call(this.type.prototype, t.prototype); };
        Vs.prototype.register = function (t) { var e = Object.getPrototypeOf(t); var i; (function (t) { return "id" in t && "defaults" in t; })(e) && (i = this.register(e)); var s = this.items, n = t.id, o = this.scope + "." + n; if (!n)
            throw new Error("class does not have id: " + t); return n in s || (s[n] = t, function (t, e, i) { var s = nt(Object.create(null), [i ? bt.get(i) : {}, bt.get(e), t.defaults]); bt.set(e, s), t.defaultRoutes && function (t, e) { Object.keys(e).forEach((function (i) { var s = i.split("."), n = s.pop(), o = [t].concat(s).join("."), a = e[i].split("."), r = a.pop(), l = a.join("."); bt.route(o, n, l, r); })); }(e, t.defaultRoutes); t.descriptors && bt.describe(e, t.descriptors); }(t, o, i), this.override && bt.override(t.id, t.overrides)), o; };
        Vs.prototype.get = function (t) { return this.items[t]; };
        Vs.prototype.unregister = function (t) { var e = this.items, i = t.id, s = this.scope; i in e && delete e[i], s && i in bt[s] && (delete bt[s][i], this.override && delete gt[i]); };
        return Vs;
    }());
    var Ws = new /** @class */ (function () {
        function class_3() {
            this.controllers = new Vs(Ps, "datasets", !0), this.elements = new Vs(Ds, "elements"), this.plugins = new Vs(Object, "plugins"), this.scales = new Vs(Bs, "scales"), this._typedRegistries = [this.controllers, this.scales, this.elements];
        }
        class_3.prototype.add = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("register", t);
        };
        class_3.prototype.remove = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("unregister", t);
        };
        class_3.prototype.addControllers = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("register", t, this.controllers);
        };
        class_3.prototype.addElements = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("register", t, this.elements);
        };
        class_3.prototype.addPlugins = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("register", t, this.plugins);
        };
        class_3.prototype.addScales = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("register", t, this.scales);
        };
        class_3.prototype.getController = function (t) { return this._get(t, this.controllers, "controller"); };
        class_3.prototype.getElement = function (t) { return this._get(t, this.elements, "element"); };
        class_3.prototype.getPlugin = function (t) { return this._get(t, this.plugins, "plugin"); };
        class_3.prototype.getScale = function (t) { return this._get(t, this.scales, "scale"); };
        class_3.prototype.removeControllers = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("unregister", t, this.controllers);
        };
        class_3.prototype.removeElements = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("unregister", t, this.elements);
        };
        class_3.prototype.removePlugins = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("unregister", t, this.plugins);
        };
        class_3.prototype.removeScales = function () {
            var t = [];
            for (var _b = 0; _b < arguments.length; _b++) {
                t[_b] = arguments[_b];
            }
            this._each("unregister", t, this.scales);
        };
        class_3.prototype._each = function (t, e, i) {
            var _this = this;
            __spreadArray([], e, true).forEach((function (e) { var s = i || _this._getRegistryForType(e); i || s.isForType(e) || s === _this.plugins && e.id ? _this._exec(t, s, e) : Q(e, (function (e) { var s = i || _this._getRegistryForType(e); _this._exec(t, s, e); })); }));
        };
        class_3.prototype._exec = function (t, e, i) { var s = ht(t); J(i["before" + s], [], i), e[t](i), J(i["after" + s], [], i); };
        class_3.prototype._getRegistryForType = function (t) { for (var e_39 = 0; e_39 < this._typedRegistries.length; e_39++) {
            var i_29 = this._typedRegistries[e_39];
            if (i_29.isForType(t))
                return i_29;
        } return this.plugins; };
        class_3.prototype._get = function (t, e, i) { var s = e.get(t); if (void 0 === s)
            throw new Error('"' + t + '" is not a registered ' + i + "."); return s; };
        return class_3;
    }());
    var Ns = /** @class */ (function () {
        function Ns() {
            this._init = [];
        }
        Ns.prototype.notify = function (t, e, i, s) { "beforeInit" === e && (this._init = this._createDescriptors(t, !0), this._notify(this._init, t, "install")); var n = s ? this._descriptors(t).filter(s) : this._descriptors(t), o = this._notify(n, t, e, i); return "afterDestroy" === e && (this._notify(n, t, "stop"), this._notify(this._init, t, "uninstall")), o; };
        Ns.prototype._notify = function (t, e, i, s) { s = s || {}; for (var _b = 0, t_45 = t; _b < t_45.length; _b++) {
            var n_17 = t_45[_b];
            var t_46 = n_17.plugin;
            if (!1 === J(t_46[i], [e, s, n_17.options], t_46) && s.cancelable)
                return !1;
        } return !0; };
        Ns.prototype.invalidate = function () { $(this._cache) || (this._oldCache = this._cache, this._cache = void 0); };
        Ns.prototype._descriptors = function (t) { if (this._cache)
            return this._cache; var e = this._cache = this._createDescriptors(t); return this._notifyStateChanges(t), e; };
        Ns.prototype._createDescriptors = function (t, e) { var i = t && t.config, s = K(i.options && i.options.plugins, {}), n = function (t) { var e = [], i = Object.keys(Ws.plugins.items); for (var t_47 = 0; t_47 < i.length; t_47++)
            e.push(Ws.getPlugin(i[t_47])); var s = t.plugins || []; for (var t_48 = 0; t_48 < s.length; t_48++) {
            var i_30 = s[t_48];
            -1 === e.indexOf(i_30) && e.push(i_30);
        } return e; }(i); return !1 !== s || e ? function (t, e, i, s) { var n = [], o = t.getContext(); for (var a_12 = 0; a_12 < e.length; a_12++) {
            var r_10 = e[a_12], l_12 = Hs(i[r_10.id], s);
            null !== l_12 && n.push({ plugin: r_10, options: js(t.config, r_10, l_12, o) });
        } return n; }(t, n, s, e) : []; };
        Ns.prototype._notifyStateChanges = function (t) { var e = this._oldCache || [], i = this._cache, s = function (t, e) { return t.filter((function (t) { return !e.some((function (e) { return t.plugin.id === e.plugin.id; })); })); }; this._notify(s(e, i), t, "stop"), this._notify(s(i, e), t, "start"); };
        return Ns;
    }());
    function Hs(t, e) { return e || !1 !== t ? !0 === t ? {} : t : null; }
    function js(t, e, i, s) { var n = t.pluginScopeKeys(e), o = t.getOptionScopes(i, n); return t.createResolver(o, s, [""], { scriptable: !1, indexable: !1, allKeys: !0 }); }
    function $s(t, e) { var i = bt.datasets[t] || {}; return ((e.datasets || {})[t] || {}).indexAxis || e.indexAxis || i.indexAxis || "x"; }
    function Ys(t, e) { return "x" === t || "y" === t ? t : e.axis || ("top" === (i = e.position) || "bottom" === i ? "x" : "left" === i || "right" === i ? "y" : void 0) || t.charAt(0).toLowerCase(); var i; }
    function Us(t) { var e = t.options || (t.options = {}); e.plugins = K(e.plugins, {}), e.scales = function (t, e) { var i = gt[t.type] || { scales: {} }, s = e.scales || {}, n = $s(t.type, e), o = Object.create(null), a = Object.create(null); return Object.keys(s).forEach((function (t) { var e = s[t]; if (!U(e))
        return console.error("Invalid scale configuration for scale: ".concat(t)); if (e._proxy)
        return console.warn("Ignoring resolver passed as options for scale: ".concat(t)); var r = Ys(t, e), l = function (t, e) { return t === e ? "_index_" : "_value_"; }(r, n), h = i.scales || {}; o[r] = o[r] || t, a[t] = ot(Object.create(null), [{ axis: r }, e, h[r], h[l]]); })), t.data.datasets.forEach((function (i) { var n = i.type || t.type, r = i.indexAxis || $s(n, e), l = (gt[n] || {}).scales || {}; Object.keys(l).forEach((function (t) { var e = function (t, e) { var i = t; return "_index_" === t ? i = e : "_value_" === t && (i = "x" === e ? "y" : "x"), i; }(t, r), n = i[e + "AxisID"] || o[e] || e; a[n] = a[n] || Object.create(null), ot(a[n], [{ axis: e }, s[n], l[t]]); })); })), Object.keys(a).forEach((function (t) { var e = a[t]; ot(e, [bt.scales[e.type], bt.scale]); })), a; }(t, e); }
    function Xs(t) { return (t = t || {}).datasets = t.datasets || [], t.labels = t.labels || [], t; }
    var qs = new Map, Ks = new Set;
    function Gs(t, e) { var i = qs.get(t); return i || (i = e(), qs.set(t, i), Ks.add(i)), i; }
    var Zs = function (t, e, i) { var s = lt(e, i); void 0 !== s && t.add(s); };
    var Js = /** @class */ (function () {
        function Js(t) {
            this._config = function (t) { return (t = t || {}).data = Xs(t.data), Us(t), t; }(t), this._scopeCache = new Map, this._resolverCache = new Map;
        }
        Object.defineProperty(Js.prototype, "platform", {
            get: function () { return this._config.platform; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Js.prototype, "type", {
            get: function () { return this._config.type; },
            set: function (t) { this._config.type = t; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Js.prototype, "data", {
            get: function () { return this._config.data; },
            set: function (t) { this._config.data = Xs(t); },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Js.prototype, "options", {
            get: function () { return this._config.options; },
            set: function (t) { this._config.options = t; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Js.prototype, "plugins", {
            get: function () { return this._config.plugins; },
            enumerable: false,
            configurable: true
        });
        Js.prototype.update = function () { var t = this._config; this.clearCache(), Us(t); };
        Js.prototype.clearCache = function () { this._scopeCache.clear(), this._resolverCache.clear(); };
        Js.prototype.datasetScopeKeys = function (t) { return Gs(t, (function () { return [["datasets.".concat(t), ""]]; })); };
        Js.prototype.datasetAnimationScopeKeys = function (t, e) { return Gs("".concat(t, ".transition.").concat(e), (function () { return [["datasets.".concat(t, ".transitions.").concat(e), "transitions.".concat(e)], ["datasets.".concat(t), ""]]; })); };
        Js.prototype.datasetElementScopeKeys = function (t, e) { return Gs("".concat(t, "-").concat(e), (function () { return [["datasets.".concat(t, ".elements.").concat(e), "datasets.".concat(t), "elements.".concat(e), ""]]; })); };
        Js.prototype.pluginScopeKeys = function (t) { var e = t.id; return Gs("".concat(this.type, "-plugin-").concat(e), (function () { return [__spreadArray(["plugins.".concat(e)], t.additionalOptionScopes || [], true)]; })); };
        Js.prototype._cachedScopes = function (t, e) { var i = this._scopeCache; var s = i.get(t); return s && !e || (s = new Map, i.set(t, s)), s; };
        Js.prototype.getOptionScopes = function (t, e, i) { var _b = this, s = _b.options, n = _b.type, o = this._cachedScopes(t, i), a = o.get(e); if (a)
            return a; var r = new Set; e.forEach((function (e) { t && (r.add(t), e.forEach((function (e) { return Zs(r, t, e); }))), e.forEach((function (t) { return Zs(r, s, t); })), e.forEach((function (t) { return Zs(r, gt[n] || {}, t); })), e.forEach((function (t) { return Zs(r, bt, t); })), e.forEach((function (t) { return Zs(r, pt, t); })); })); var l = Array.from(r); return 0 === l.length && l.push(Object.create(null)), Ks.has(e) && o.set(e, l), l; };
        Js.prototype.chartOptionScopes = function () { var _b = this, t = _b.options, e = _b.type; return [t, gt[e] || {}, bt.datasets[e] || {}, { type: e }, bt, pt]; };
        Js.prototype.resolveNamedOptions = function (t, e, i, s) {
            if (s === void 0) { s = [""]; }
            var n = { $shared: !0 }, _b = Qs(this._resolverCache, t, s), o = _b.resolver, a = _b.subPrefixes;
            var r = o;
            if (function (t, e) { var _b = ri(t), i = _b.isScriptable, s = _b.isIndexable; for (var _c = 0, e_41 = e; _c < e_41.length; _c++) {
                var n_18 = e_41[_c];
                var e_42 = i(n_18), o_21 = s(n_18), a_13 = (o_21 || e_42) && t[n_18];
                if (e_42 && (dt(a_13) || tn(a_13)) || o_21 && Y(a_13))
                    return !0;
            } return !1; }(o, e)) {
                n.$shared = !1;
                r = ai(o, i = dt(i) ? i() : i, this.createResolver(t, i, a));
            }
            for (var _c = 0, e_40 = e; _c < e_40.length; _c++) {
                var t_49 = e_40[_c];
                n[t_49] = r[t_49];
            }
            return n;
        };
        Js.prototype.createResolver = function (t, e, i, s) {
            if (i === void 0) { i = [""]; }
            var n = Qs(this._resolverCache, t, i).resolver;
            return U(e) ? ai(n, e, void 0, s) : n;
        };
        return Js;
    }());
    function Qs(t, e, i) { var s = t.get(e); s || (s = new Map, t.set(e, s)); var n = i.join(); var o = s.get(n); if (!o) {
        o = { resolver: oi(e, i), subPrefixes: i.filter((function (t) { return !t.toLowerCase().includes("hover"); })) }, s.set(n, o);
    } return o; }
    var tn = function (t) { return U(t) && Object.getOwnPropertyNames(t).reduce((function (e, i) { return e || dt(t[i]); }), !1); };
    var en = ["top", "bottom", "left", "right", "chartArea"];
    function sn(t, e) { return "top" === t || "bottom" === t || -1 === en.indexOf(t) && "x" === e; }
    function nn(t, e) { return function (i, s) { return i[t] === s[t] ? i[e] - s[e] : i[t] - s[t]; }; }
    function on(t) { var e = t.chart, i = e.options.animation; e.notifyPlugins("afterRender"), J(i && i.onComplete, [t], e); }
    function an(t) { var e = t.chart, i = e.options.animation; J(i && i.onProgress, [t], e); }
    function rn(t) { return ge() && "string" == typeof t ? t = document.getElementById(t) : t && t.length && (t = t[0]), t && t.canvas && (t = t.canvas), t; }
    var ln = {}, hn = function (t) { var e = rn(t); return Object.values(ln).filter((function (t) { return t.canvas === e; })).pop(); };
    function cn(t, e, i) { var s = Object.keys(t); for (var _b = 0, s_25 = s; _b < s_25.length; _b++) {
        var n_19 = s_25[_b];
        var s_26 = +n_19;
        if (s_26 >= e) {
            var o_22 = t[n_19];
            delete t[n_19], (i > 0 || s_26 > e) && (t[s_26 + i] = o_22);
        }
    } }
    var dn = /** @class */ (function () {
        function dn(t, e) {
            var _this = this;
            var s = this.config = new Js(e), n = rn(t), o = hn(n);
            if (o)
                throw new Error("Canvas is already in use. Chart with ID '" + o.id + "' must be destroyed before the canvas can be reused.");
            var r = s.createResolver(s.chartOptionScopes(), this.getContext());
            this.platform = new (s.platform || ls(n)), this.platform.updateConfig(s);
            var l = this.platform.acquireContext(n, r.aspectRatio), h = l && l.canvas, c = h && h.height, d = h && h.width;
            this.id = j(), this.ctx = l, this.canvas = h, this.width = d, this.height = c, this._options = r, this._aspectRatio = this.aspectRatio, this._layers = [], this._metasets = [], this._stacks = void 0, this.boxes = [], this.currentDevicePixelRatio = void 0, this.chartArea = void 0, this._active = [], this._lastEvent = void 0, this._listeners = {}, this._responsiveListeners = void 0, this._sortedMetasets = [], this.scales = {}, this._plugins = new Ns, this.$proxies = {}, this._hiddenIndices = {}, this.attached = !1, this._animationsDisabled = void 0, this.$context = void 0, this._doResize = i((function (t) { return _this.update(t); }), r.resizeDelay || 0), this._dataChanges = [], ln[this.id] = this, l && h ? (a.listen(this, "complete", on), a.listen(this, "progress", an), this._initialize(), this.attached && this.update()) : console.error("Failed to create chart: can't acquire context from the given item");
        }
        Object.defineProperty(dn.prototype, "aspectRatio", {
            get: function () { var _b = this, _c = _b.options, t = _c.aspectRatio, e = _c.maintainAspectRatio, i = _b.width, s = _b.height, n = _b._aspectRatio; return $(t) ? e && n ? n : s ? i / s : null : t; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(dn.prototype, "data", {
            get: function () { return this.config.data; },
            set: function (t) { this.config.data = t; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(dn.prototype, "options", {
            get: function () { return this._options; },
            set: function (t) { this.config.options = t; },
            enumerable: false,
            configurable: true
        });
        dn.prototype._initialize = function () { return this.notifyPlugins("beforeInit"), this.options.responsive ? this.resize() : ke(this, this.options.devicePixelRatio), this.bindEvents(), this.notifyPlugins("afterInit"), this; };
        dn.prototype.clear = function () { return Gt(this.canvas, this.ctx), this; };
        dn.prototype.stop = function () { return a.stop(this), this; };
        dn.prototype.resize = function (t, e) { a.running(this) ? this._resizeBeforeDraw = { width: t, height: e } : this._resize(t, e); };
        dn.prototype._resize = function (t, e) { var i = this.options, s = this.canvas, n = i.maintainAspectRatio && this.aspectRatio, o = this.platform.getMaximumSize(s, t, e, n), a = i.devicePixelRatio || this.platform.getDevicePixelRatio(), r = this.width ? "resize" : "attach"; this.width = o.width, this.height = o.height, this._aspectRatio = this.aspectRatio, ke(this, a, !0) && (this.notifyPlugins("resize", { size: o }), J(i.onResize, [this, o], this), this.attached && this._doResize(r) && this.render()); };
        dn.prototype.ensureScalesHaveIDs = function () { Q(this.options.scales || {}, (function (t, e) { t.id = e; })); };
        dn.prototype.buildOrUpdateScales = function () {
            var _this = this;
            var t = this.options, e = t.scales, i = this.scales, s = Object.keys(i).reduce((function (t, e) { return (t[e] = !1, t); }), {});
            var n = [];
            e && (n = n.concat(Object.keys(e).map((function (t) { var i = e[t], s = Ys(t, i), n = "r" === s, o = "x" === s; return { options: i, dposition: n ? "chartArea" : o ? "bottom" : "left", dtype: n ? "radialLinear" : o ? "category" : "linear" }; })))), Q(n, (function (e) { var n = e.options, o = n.id, a = Ys(o, n), r = K(n.type, e.dtype); void 0 !== n.position && sn(n.position, a) === sn(e.dposition) || (n.position = e.dposition), s[o] = !0; var l = null; if (o in i && i[o].type === r)
                l = i[o];
            else {
                l = new (Ws.getScale(r))({ id: o, type: r, ctx: _this.ctx, chart: _this }), i[l.id] = l;
            } l.init(n, t); })), Q(s, (function (t, e) { t || delete i[e]; })), Q(i, (function (t) { ni.configure(_this, t, t.options), ni.addBox(_this, t); }));
        };
        dn.prototype._updateMetasets = function () { var t = this._metasets, e = this.data.datasets.length, i = t.length; if (t.sort((function (t, e) { return t.index - e.index; })), i > e) {
            for (var t_50 = e; t_50 < i; ++t_50)
                this._destroyDatasetMeta(t_50);
            t.splice(e, i - e);
        } this._sortedMetasets = t.slice(0).sort(nn("order", "index")); };
        dn.prototype._removeUnreferencedMetasets = function () {
            var _this = this;
            var _b = this, t = _b._metasets, e = _b.data.datasets;
            t.length > e.length && delete this._stacks, t.forEach((function (t, i) { 0 === e.filter((function (e) { return e === t._dataset; })).length && _this._destroyDatasetMeta(i); }));
        };
        dn.prototype.buildOrUpdateControllers = function () { var t = [], e = this.data.datasets; var i, s; for (this._removeUnreferencedMetasets(), i = 0, s = e.length; i < s; i++) {
            var s_27 = e[i];
            var n_20 = this.getDatasetMeta(i);
            var o_23 = s_27.type || this.config.type;
            if (n_20.type && n_20.type !== o_23 && (this._destroyDatasetMeta(i), n_20 = this.getDatasetMeta(i)), n_20.type = o_23, n_20.indexAxis = s_27.indexAxis || $s(o_23, this.options), n_20.order = s_27.order || 0, n_20.index = i, n_20.label = "" + s_27.label, n_20.visible = this.isDatasetVisible(i), n_20.controller)
                n_20.controller.updateIndex(i), n_20.controller.linkScales();
            else {
                var e_43 = Ws.getController(o_23), _b = bt.datasets[o_23], s_28 = _b.datasetElementType, a_14 = _b.dataElementType;
                Object.assign(e_43.prototype, { dataElementType: Ws.getElement(a_14), datasetElementType: s_28 && Ws.getElement(s_28) }), n_20.controller = new e_43(this, i), t.push(n_20.controller);
            }
        } return this._updateMetasets(), t; };
        dn.prototype._resetElements = function () {
            var _this = this;
            Q(this.data.datasets, (function (t, e) { _this.getDatasetMeta(e).controller.reset(); }), this);
        };
        dn.prototype.reset = function () { this._resetElements(), this.notifyPlugins("reset"); };
        dn.prototype.update = function (t) { var e = this.config; e.update(); var i = this._options = e.createResolver(e.chartOptionScopes(), this.getContext()), s = this._animationsDisabled = !i.animation; if (this._updateScales(), this._checkEventBindings(), this._updateHiddenIndices(), this._plugins.invalidate(), !1 === this.notifyPlugins("beforeUpdate", { mode: t, cancelable: !0 }))
            return; var n = this.buildOrUpdateControllers(); this.notifyPlugins("beforeElementsUpdate"); var o = 0; for (var t_51 = 0, e_44 = this.data.datasets.length; t_51 < e_44; t_51++) {
            var e_45 = this.getDatasetMeta(t_51).controller, i_31 = !s && -1 === n.indexOf(e_45);
            e_45.buildOrUpdateElements(i_31), o = Math.max(+e_45.getMaxOverflow(), o);
        } o = this._minPadding = i.layout.autoPadding ? o : 0, this._updateLayout(o), s || Q(n, (function (t) { t.reset(); })), this._updateDatasets(t), this.notifyPlugins("afterUpdate", { mode: t }), this._layers.sort(nn("z", "_idx")); var _b = this, a = _b._active, r = _b._lastEvent; r ? this._eventHandler(r, !0) : a.length && this._updateHoverStyles(a, a, !0), this.render(); };
        dn.prototype._updateScales = function () {
            var _this = this;
            Q(this.scales, (function (t) { ni.removeBox(_this, t); })), this.ensureScalesHaveIDs(), this.buildOrUpdateScales();
        };
        dn.prototype._checkEventBindings = function () { var t = this.options, e = new Set(Object.keys(this._listeners)), i = new Set(t.events); ut(e, i) && !!this._responsiveListeners === t.responsive || (this.unbindEvents(), this.bindEvents()); };
        dn.prototype._updateHiddenIndices = function () { var t = this._hiddenIndices, e = this._getUniformDataChanges() || []; for (var _b = 0, e_46 = e; _b < e_46.length; _b++) {
            var _c = e_46[_b], i_32 = _c.method, s_29 = _c.start, n_21 = _c.count;
            cn(t, s_29, "_removeElements" === i_32 ? -n_21 : n_21);
        } };
        dn.prototype._getUniformDataChanges = function () { var t = this._dataChanges; if (!t || !t.length)
            return; this._dataChanges = []; var e = this.data.datasets.length, i = function (e) { return new Set(t.filter((function (t) { return t[0] === e; })).map((function (t, e) { return e + "," + t.splice(1).join(","); }))); }, s = i(0); for (var t_52 = 1; t_52 < e; t_52++)
            if (!ut(s, i(t_52)))
                return; return Array.from(s).map((function (t) { return t.split(","); })).map((function (t) { return ({ method: t[1], start: +t[2], count: +t[3] }); })); };
        dn.prototype._updateLayout = function (t) {
            var _this = this;
            if (!1 === this.notifyPlugins("beforeLayout", { cancelable: !0 }))
                return;
            ni.update(this, this.width, this.height, t);
            var e = this.chartArea, i = e.width <= 0 || e.height <= 0;
            this._layers = [], Q(this.boxes, (function (t) {
                var _b;
                i && "chartArea" === t.position || (t.configure && t.configure(), (_b = _this._layers).push.apply(_b, t._layers()));
            }), this), this._layers.forEach((function (t, e) { t._idx = e; })), this.notifyPlugins("afterLayout");
        };
        dn.prototype._updateDatasets = function (t) { if (!1 !== this.notifyPlugins("beforeDatasetsUpdate", { mode: t, cancelable: !0 })) {
            for (var t_53 = 0, e_47 = this.data.datasets.length; t_53 < e_47; ++t_53)
                this.getDatasetMeta(t_53).controller.configure();
            for (var e_48 = 0, i_33 = this.data.datasets.length; e_48 < i_33; ++e_48)
                this._updateDataset(e_48, dt(t) ? t({ datasetIndex: e_48 }) : t);
            this.notifyPlugins("afterDatasetsUpdate", { mode: t });
        } };
        dn.prototype._updateDataset = function (t, e) { var i = this.getDatasetMeta(t), s = { meta: i, index: t, mode: e, cancelable: !0 }; !1 !== this.notifyPlugins("beforeDatasetUpdate", s) && (i.controller._update(e), s.cancelable = !1, this.notifyPlugins("afterDatasetUpdate", s)); };
        dn.prototype.render = function () { !1 !== this.notifyPlugins("beforeRender", { cancelable: !0 }) && (a.has(this) ? this.attached && !a.running(this) && a.start(this) : (this.draw(), on({ chart: this }))); };
        dn.prototype.draw = function () { var t; if (this._resizeBeforeDraw) {
            var _b = this._resizeBeforeDraw, t_54 = _b.width, e_49 = _b.height;
            this._resize(t_54, e_49), this._resizeBeforeDraw = null;
        } if (this.clear(), this.width <= 0 || this.height <= 0)
            return; if (!1 === this.notifyPlugins("beforeDraw", { cancelable: !0 }))
            return; var e = this._layers; for (t = 0; t < e.length && e[t].z <= 0; ++t)
            e[t].draw(this.chartArea); for (this._drawDatasets(); t < e.length; ++t)
            e[t].draw(this.chartArea); this.notifyPlugins("afterDraw"); };
        dn.prototype._getSortedDatasetMetas = function (t) { var e = this._sortedMetasets, i = []; var s, n; for (s = 0, n = e.length; s < n; ++s) {
            var n_22 = e[s];
            t && !n_22.visible || i.push(n_22);
        } return i; };
        dn.prototype.getSortedVisibleDatasetMetas = function () { return this._getSortedDatasetMetas(!0); };
        dn.prototype._drawDatasets = function () { if (!1 === this.notifyPlugins("beforeDatasetsDraw", { cancelable: !0 }))
            return; var t = this.getSortedVisibleDatasetMetas(); for (var e_50 = t.length - 1; e_50 >= 0; --e_50)
            this._drawDataset(t[e_50]); this.notifyPlugins("afterDatasetsDraw"); };
        dn.prototype._drawDataset = function (t) { var e = this.ctx, i = t._clip, s = !i.disabled, n = this.chartArea, o = { meta: t, index: t.index, cancelable: !0 }; !1 !== this.notifyPlugins("beforeDatasetDraw", o) && (s && Qt(e, { left: !1 === i.left ? 0 : n.left - i.left, right: !1 === i.right ? this.width : n.right + i.right, top: !1 === i.top ? 0 : n.top - i.top, bottom: !1 === i.bottom ? this.height : n.bottom + i.bottom }), t.controller.draw(), s && te(e), o.cancelable = !1, this.notifyPlugins("afterDatasetDraw", o)); };
        dn.prototype.getElementsAtEventForMode = function (t, e, i, s) { var n = Ee.modes[e]; return "function" == typeof n ? n(this, t, i, s) : []; };
        dn.prototype.getDatasetMeta = function (t) { var e = this.data.datasets[t], i = this._metasets; var s = i.filter((function (t) { return t && t._dataset === e; })).pop(); return s || (s = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null, order: e && e.order || 0, index: t, _dataset: e, _parsed: [], _sorted: !1 }, i.push(s)), s; };
        dn.prototype.getContext = function () { return this.$context || (this.$context = Ye(null, { chart: this, type: "chart" })); };
        dn.prototype.getVisibleDatasetCount = function () { return this.getSortedVisibleDatasetMetas().length; };
        dn.prototype.isDatasetVisible = function (t) { var e = this.data.datasets[t]; if (!e)
            return !1; var i = this.getDatasetMeta(t); return "boolean" == typeof i.hidden ? !i.hidden : !e.hidden; };
        dn.prototype.setDatasetVisibility = function (t, e) { this.getDatasetMeta(t).hidden = !e; };
        dn.prototype.toggleDataVisibility = function (t) { this._hiddenIndices[t] = !this._hiddenIndices[t]; };
        dn.prototype.getDataVisibility = function (t) { return !this._hiddenIndices[t]; };
        dn.prototype._updateVisibility = function (t, e, i) { var s = i ? "show" : "hide", n = this.getDatasetMeta(t), o = n.controller._resolveAnimations(void 0, s); ct(e) ? (n.data[e].hidden = !i, this.update()) : (this.setDatasetVisibility(t, i), o.update(n, { visible: i }), this.update((function (e) { return e.datasetIndex === t ? s : void 0; }))); };
        dn.prototype.hide = function (t, e) { this._updateVisibility(t, e, !1); };
        dn.prototype.show = function (t, e) { this._updateVisibility(t, e, !0); };
        dn.prototype._destroyDatasetMeta = function (t) { var e = this._metasets[t]; e && e.controller && e.controller._destroy(), delete this._metasets[t]; };
        dn.prototype._stop = function () { var t, e; for (this.stop(), a.remove(this), t = 0, e = this.data.datasets.length; t < e; ++t)
            this._destroyDatasetMeta(t); };
        dn.prototype.destroy = function () { this.notifyPlugins("beforeDestroy"); var _b = this, t = _b.canvas, e = _b.ctx; this._stop(), this.config.clearCache(), t && (this.unbindEvents(), Gt(t, e), this.platform.releaseContext(e), this.canvas = null, this.ctx = null), this.notifyPlugins("destroy"), delete ln[this.id], this.notifyPlugins("afterDestroy"); };
        dn.prototype.toBase64Image = function () {
            var _b;
            var t = [];
            for (var _c = 0; _c < arguments.length; _c++) {
                t[_c] = arguments[_c];
            }
            return (_b = this.canvas).toDataURL.apply(_b, t);
        };
        dn.prototype.bindEvents = function () { this.bindUserEvents(), this.options.responsive ? this.bindResponsiveEvents() : this.attached = !0; };
        dn.prototype.bindUserEvents = function () {
            var _this = this;
            var t = this._listeners, e = this.platform, i = function (i, s) { e.addEventListener(_this, i, s), t[i] = s; }, s = function (t, e, i) { t.offsetX = e, t.offsetY = i, _this._eventHandler(t); };
            Q(this.options.events, (function (t) { return i(t, s); }));
        };
        dn.prototype.bindResponsiveEvents = function () {
            var _this = this;
            this._responsiveListeners || (this._responsiveListeners = {});
            var t = this._responsiveListeners, e = this.platform, i = function (i, s) { e.addEventListener(_this, i, s), t[i] = s; }, s = function (i, s) { t[i] && (e.removeEventListener(_this, i, s), delete t[i]); }, n = function (t, e) { _this.canvas && _this.resize(t, e); };
            var o;
            var a = function () { s("attach", a), _this.attached = !0, _this.resize(), i("resize", n), i("detach", o); };
            o = function () { _this.attached = !1, s("resize", n), _this._stop(), _this._resize(0, 0), i("attach", a); }, e.isAttached(this.canvas) ? a() : o();
        };
        dn.prototype.unbindEvents = function () {
            var _this = this;
            Q(this._listeners, (function (t, e) { _this.platform.removeEventListener(_this, e, t); })), this._listeners = {}, Q(this._responsiveListeners, (function (t, e) { _this.platform.removeEventListener(_this, e, t); })), this._responsiveListeners = void 0;
        };
        dn.prototype.updateHoverStyle = function (t, e, i) { var s = i ? "set" : "remove"; var n, o, a, r; for ("dataset" === e && (n = this.getDatasetMeta(t[0].datasetIndex), n.controller["_" + s + "DatasetHoverStyle"]()), a = 0, r = t.length; a < r; ++a) {
            o = t[a];
            var e_51 = o && this.getDatasetMeta(o.datasetIndex).controller;
            e_51 && e_51[s + "HoverStyle"](o.element, o.datasetIndex, o.index);
        } };
        dn.prototype.getActiveElements = function () { return this._active || []; };
        dn.prototype.setActiveElements = function (t) {
            var _this = this;
            var e = this._active || [], i = t.map((function (_b) {
                var t = _b.datasetIndex, e = _b.index;
                var i = _this.getDatasetMeta(t);
                if (!i)
                    throw new Error("No dataset found at index " + t);
                return { datasetIndex: t, element: i.data[e], index: e };
            }));
            !tt(i, e) && (this._active = i, this._lastEvent = null, this._updateHoverStyles(i, e));
        };
        dn.prototype.notifyPlugins = function (t, e, i) { return this._plugins.notify(this, t, e, i); };
        dn.prototype._updateHoverStyles = function (t, e, i) { var s = this.options.hover, n = function (t, e) { return t.filter((function (t) { return !e.some((function (e) { return t.datasetIndex === e.datasetIndex && t.index === e.index; })); })); }, o = n(e, t), a = i ? t : n(t, e); o.length && this.updateHoverStyle(o, s.mode, !1), a.length && s.mode && this.updateHoverStyle(a, s.mode, !0); };
        dn.prototype._eventHandler = function (t, e) {
            var _this = this;
            var i = { event: t, replay: e, cancelable: !0, inChartArea: Jt(t, this.chartArea, this._minPadding) }, s = function (e) { return (e.options.events || _this.options.events).includes(t.native.type); };
            if (!1 === this.notifyPlugins("beforeEvent", i, s))
                return;
            var n = this._handleEvent(t, e, i.inChartArea);
            return i.cancelable = !1, this.notifyPlugins("afterEvent", i, s), (n || i.changed) && this.render(), this;
        };
        dn.prototype._handleEvent = function (t, e, i) { var _b = this, _c = _b._active, s = _c === void 0 ? [] : _c, n = _b.options, o = e, a = this._getActiveElements(t, s, i, o), r = ft(t), l = function (t, e, i, s) { return i && "mouseout" !== t.type ? s ? e : t : null; }(t, this._lastEvent, i, r); i && (this._lastEvent = null, J(n.onHover, [t, a, this], this), r && J(n.onClick, [t, a, this], this)); var h = !tt(a, s); return (h || e) && (this._active = a, this._updateHoverStyles(a, s, e)), this._lastEvent = l, h; };
        dn.prototype._getActiveElements = function (t, e, i, s) { if ("mouseout" === t.type)
            return []; if (!i)
            return e; var n = this.options.hover; return this.getElementsAtEventForMode(t, n.mode, n, s); };
        return dn;
    }());
    var un = function () { return Q(dn.instances, (function (t) { return t._plugins.invalidate(); })); }, fn = !0;
    function gn() { throw new Error("This method is not implemented: Check that a complete date adapter is provided."); }
    Object.defineProperties(dn, { defaults: { enumerable: fn, value: bt }, instances: { enumerable: fn, value: ln }, overrides: { enumerable: fn, value: gt }, registry: { enumerable: fn, value: Ws }, version: { enumerable: fn, value: "3.7.0" }, getChart: { enumerable: fn, value: hn }, register: { enumerable: fn, value: function () {
                var t = [];
                for (var _b = 0; _b < arguments.length; _b++) {
                    t[_b] = arguments[_b];
                }
                Ws.add.apply(Ws, t), un();
            } }, unregister: { enumerable: fn, value: function () {
                var t = [];
                for (var _b = 0; _b < arguments.length; _b++) {
                    t[_b] = arguments[_b];
                }
                Ws.remove.apply(Ws, t), un();
            } } });
    var pn = /** @class */ (function () {
        function pn(t) {
            this.options = t || {};
        }
        pn.prototype.formats = function () { return gn(); };
        pn.prototype.parse = function (t, e) { return gn(); };
        pn.prototype.format = function (t, e) { return gn(); };
        pn.prototype.add = function (t, e, i) { return gn(); };
        pn.prototype.diff = function (t, e, i) { return gn(); };
        pn.prototype.startOf = function (t, e, i) { return gn(); };
        pn.prototype.endOf = function (t, e) { return gn(); };
        return pn;
    }());
    pn.override = function (t) { Object.assign(pn.prototype, t); };
    var mn = { _date: pn };
    function xn(t) { var e = t.iScale, i = function (t, e) { if (!t._cache.$bar) {
        var i_34 = t.getMatchingVisibleMetas(e);
        var s_30 = [];
        for (var e_52 = 0, n_23 = i_34.length; e_52 < n_23; e_52++)
            s_30 = s_30.concat(i_34[e_52].controller.getAllParsedValues(t));
        t._cache.$bar = fe(s_30.sort((function (t, e) { return t - e; })));
    } return t._cache.$bar; }(e, t.type); var s, n, o, a, r = e._length; var l = function () { 32767 !== o && -32768 !== o && (ct(a) && (r = Math.min(r, Math.abs(o - a) || r)), a = o); }; for (s = 0, n = i.length; s < n; ++s)
        o = e.getPixelForValue(i[s]), l(); for (a = void 0, s = 0, n = e.ticks.length; s < n; ++s)
        o = e.getPixelForTick(s), l(); return r; }
    function bn(t, e, i, s) { return Y(t) ? function (t, e, i, s) { var n = i.parse(t[0], s), o = i.parse(t[1], s), a = Math.min(n, o), r = Math.max(n, o); var l = a, h = r; Math.abs(a) > Math.abs(r) && (l = r, h = a), e[i.axis] = h, e._custom = { barStart: l, barEnd: h, start: n, end: o, min: a, max: r }; }(t, e, i, s) : e[i.axis] = i.parse(t, s), e; }
    function _n(t, e, i, s) { var n = t.iScale, o = t.vScale, a = n.getLabels(), r = n === o, l = []; var h, c, d, u; for (h = i, c = i + s; h < c; ++h)
        u = e[h], d = {}, d[n.axis] = r || n.parse(a[h], h), l.push(bn(u, d, o, h)); return l; }
    function yn(t) { return t && void 0 !== t.barStart && void 0 !== t.barEnd; }
    function vn(t, e, i, s) { var n = e.borderSkipped; var o = {}; if (!n)
        return void (t.borderSkipped = o); var _b = function (t) { var e, i, s, n, o; return t.horizontal ? (e = t.base > t.x, i = "left", s = "right") : (e = t.base < t.y, i = "bottom", s = "top"), e ? (n = "end", o = "start") : (n = "start", o = "end"), { start: i, end: s, reverse: e, top: n, bottom: o }; }(t), a = _b.start, r = _b.end, l = _b.reverse, h = _b.top, c = _b.bottom; "middle" === n && i && (t.enableBorderRadius = !0, (i._top || 0) === s ? n = h : (i._bottom || 0) === s ? n = c : (o[wn(c, a, r, l)] = !0, n = h)), o[wn(n, a, r, l)] = !0, t.borderSkipped = o; }
    function wn(t, e, i, s) { var n, o, a; return s ? (a = i, t = Mn(t = (n = t) === (o = e) ? a : n === a ? o : n, i, e)) : t = Mn(t, e, i), t; }
    function Mn(t, e, i) { return "start" === t ? e : "end" === t ? i : t; }
    function kn(t, _b, i) {
        var e = _b.inflateAmount;
        t.inflateAmount = "auto" === e ? 1 === i ? .33 : 0 : e;
    }
    var Sn = /** @class */ (function (_super) {
        __extends(Sn, _super);
        function Sn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Sn.prototype.parsePrimitiveData = function (t, e, i, s) { return _n(t, e, i, s); };
        Sn.prototype.parseArrayData = function (t, e, i, s) { return _n(t, e, i, s); };
        Sn.prototype.parseObjectData = function (t, e, i, s) { var n = t.iScale, o = t.vScale, _b = this._parsing, _c = _b.xAxisKey, a = _c === void 0 ? "x" : _c, _d = _b.yAxisKey, r = _d === void 0 ? "y" : _d, l = "x" === n.axis ? a : r, h = "x" === o.axis ? a : r, c = []; var d, u, f, g; for (d = i, u = i + s; d < u; ++d)
            g = e[d], f = {}, f[n.axis] = n.parse(lt(g, l), d), c.push(bn(lt(g, h), f, o, d)); return c; };
        Sn.prototype.updateRangeFromParsed = function (t, e, i, s) { _super.prototype.updateRangeFromParsed.call(this, t, e, i, s); var n = i._custom; n && e === this._cachedMeta.vScale && (t.min = Math.min(t.min, n.min), t.max = Math.max(t.max, n.max)); };
        Sn.prototype.getMaxOverflow = function () { return 0; };
        Sn.prototype.getLabelAndValue = function (t) { var e = this._cachedMeta, i = e.iScale, s = e.vScale, n = this.getParsed(t), o = n._custom, a = yn(o) ? "[" + o.start + ", " + o.end + "]" : "" + s.getLabelForValue(n[s.axis]); return { label: "" + i.getLabelForValue(n[i.axis]), value: a }; };
        Sn.prototype.initialize = function () { this.enableOptionSharing = !0, _super.prototype.initialize.call(this); this._cachedMeta.stack = this.getDataset().stack; };
        Sn.prototype.update = function (t) { var e = this._cachedMeta; this.updateElements(e.data, 0, e.data.length, t); };
        Sn.prototype.updateElements = function (t, e, i, s) { var n = "reset" === s, _b = this, o = _b.index, a = _b._cachedMeta.vScale, r = a.getBasePixel(), l = a.isHorizontal(), h = this._getRuler(), c = this.resolveDataElementOptions(e, s), d = this.getSharedOptions(c), u = this.includeOptions(s, d); this.updateSharedOptions(d, s, c); for (var c_7 = e; c_7 < e + i; c_7++) {
            var e_53 = this.getParsed(c_7), i_35 = n || $(e_53[a.axis]) ? { base: r, head: r } : this._calculateBarValuePixels(c_7), f_2 = this._calculateBarIndexPixels(c_7, h), g_1 = (e_53._stacks || {})[a.axis], p_1 = { horizontal: l, base: i_35.base, enableBorderRadius: !g_1 || yn(e_53._custom) || o === g_1._top || o === g_1._bottom, x: l ? i_35.head : f_2.center, y: l ? f_2.center : i_35.head, height: l ? f_2.size : Math.abs(i_35.size), width: l ? Math.abs(i_35.size) : f_2.size };
            u && (p_1.options = d || this.resolveDataElementOptions(c_7, t[c_7].active ? "active" : s));
            var m_1 = p_1.options || t[c_7].options;
            vn(p_1, m_1, g_1, o), kn(p_1, m_1, h.ratio), this.updateElement(t[c_7], c_7, p_1, s);
        } };
        Sn.prototype._getStacks = function (t, e) { var i = this._cachedMeta.iScale, s = i.getMatchingVisibleMetas(this._type), n = i.options.stacked, o = s.length, a = []; var r, l; for (r = 0; r < o; ++r)
            if (l = s[r], l.controller.options.grouped) {
                if (void 0 !== e) {
                    var t_55 = l.controller.getParsed(e)[l.controller._cachedMeta.vScale.axis];
                    if ($(t_55) || isNaN(t_55))
                        continue;
                }
                if ((!1 === n || -1 === a.indexOf(l.stack) || void 0 === n && void 0 === l.stack) && a.push(l.stack), l.index === t)
                    break;
            } return a.length || a.push(void 0), a; };
        Sn.prototype._getStackCount = function (t) { return this._getStacks(void 0, t).length; };
        Sn.prototype._getStackIndex = function (t, e, i) { var s = this._getStacks(t, i), n = void 0 !== e ? s.indexOf(e) : -1; return -1 === n ? s.length - 1 : n; };
        Sn.prototype._getRuler = function () { var t = this.options, e = this._cachedMeta, i = e.iScale, s = []; var n, o; for (n = 0, o = e.data.length; n < o; ++n)
            s.push(i.getPixelForValue(this.getParsed(n)[i.axis], n)); var a = t.barThickness; return { min: a || xn(e), pixels: s, start: i._startPixel, end: i._endPixel, stackCount: this._getStackCount(), scale: i, grouped: t.grouped, ratio: a ? 1 : t.categoryPercentage * t.barPercentage }; };
        Sn.prototype._calculateBarValuePixels = function (t) { var _b = this, _c = _b._cachedMeta, e = _c.vScale, i = _c._stacked, _d = _b.options, s = _d.base, n = _d.minBarLength, o = s || 0, a = this.getParsed(t), r = a._custom, l = yn(r); var h, c, d = a[e.axis], u = 0, f = i ? this.applyStack(e, a, i) : d; f !== d && (u = f - d, f = d), l && (d = r.barStart, f = r.barEnd - r.barStart, 0 !== d && Ct(d) !== Ct(r.barEnd) && (u = 0), u += d); var g = $(s) || l ? u : s; var p = e.getPixelForValue(g); if (h = this.chart.getDataVisibility(t) ? e.getPixelForValue(u + f) : p, c = h - p, Math.abs(c) < n && (c = function (t, e, i) { return 0 !== t ? Ct(t) : (e.isHorizontal() ? 1 : -1) * (e.min >= i ? 1 : -1); }(c, e, o) * n, d === o && (p -= c / 2), h = p + c), p === e.getPixelForValue(o)) {
            var t_56 = Ct(c) * e.getLineWidthForValue(o) / 2;
            p += t_56, c -= t_56;
        } return { size: c, base: p, head: h, center: h + c / 2 }; };
        Sn.prototype._calculateBarIndexPixels = function (t, e) { var i = e.scale, s = this.options, n = s.skipNull, o = K(s.maxBarThickness, 1 / 0); var a, r; if (e.grouped) {
            var i_36 = n ? this._getStackCount(t) : e.stackCount, l_13 = "flex" === s.barThickness ? function (t, e, i, s) { var n = e.pixels, o = n[t]; var a = t > 0 ? n[t - 1] : null, r = t < n.length - 1 ? n[t + 1] : null; var l = i.categoryPercentage; null === a && (a = o - (null === r ? e.end - e.start : r - o)), null === r && (r = o + o - a); var h = o - (o - Math.min(a, r)) / 2 * l; return { chunk: Math.abs(r - a) / 2 * l / s, ratio: i.barPercentage, start: h }; }(t, e, s, i_36) : function (t, e, i, s) { var n = i.barThickness; var o, a; return $(n) ? (o = e.min * i.categoryPercentage, a = i.barPercentage) : (o = n * s, a = 1), { chunk: o / s, ratio: a, start: e.pixels[t] - o / 2 }; }(t, e, s, i_36), h_12 = this._getStackIndex(this.index, this._cachedMeta.stack, n ? t : void 0);
            a = l_13.start + l_13.chunk * h_12 + l_13.chunk / 2, r = Math.min(o, l_13.chunk * l_13.ratio);
        }
        else
            a = i.getPixelForValue(this.getParsed(t)[i.axis], t), r = Math.min(o, e.min * e.ratio); return { base: a - r / 2, head: a + r / 2, center: a, size: r }; };
        Sn.prototype.draw = function () { var t = this._cachedMeta, e = t.vScale, i = t.data, s = i.length; var n = 0; for (; n < s; ++n)
            null !== this.getParsed(n)[e.axis] && i[n].draw(this._ctx); };
        return Sn;
    }(Ps));
    Sn.id = "bar", Sn.defaults = { datasetElementType: !1, dataElementType: "bar", categoryPercentage: .8, barPercentage: .9, grouped: !0, animations: { numbers: { type: "number", properties: ["x", "y", "base", "width", "height"] } } }, Sn.overrides = { scales: { _index_: { type: "category", offset: !0, grid: { offset: !0 } }, _value_: { type: "linear", beginAtZero: !0 } } };
    var Pn = /** @class */ (function (_super) {
        __extends(Pn, _super);
        function Pn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Pn.prototype.initialize = function () { this.enableOptionSharing = !0, _super.prototype.initialize.call(this); };
        Pn.prototype.parsePrimitiveData = function (t, e, i, s) { var n = _super.prototype.parsePrimitiveData.call(this, t, e, i, s); for (var t_57 = 0; t_57 < n.length; t_57++)
            n[t_57]._custom = this.resolveDataElementOptions(t_57 + i).radius; return n; };
        Pn.prototype.parseArrayData = function (t, e, i, s) { var n = _super.prototype.parseArrayData.call(this, t, e, i, s); for (var t_58 = 0; t_58 < n.length; t_58++) {
            var s_31 = e[i + t_58];
            n[t_58]._custom = K(s_31[2], this.resolveDataElementOptions(t_58 + i).radius);
        } return n; };
        Pn.prototype.parseObjectData = function (t, e, i, s) { var n = _super.prototype.parseObjectData.call(this, t, e, i, s); for (var t_59 = 0; t_59 < n.length; t_59++) {
            var s_32 = e[i + t_59];
            n[t_59]._custom = K(s_32 && s_32.r && +s_32.r, this.resolveDataElementOptions(t_59 + i).radius);
        } return n; };
        Pn.prototype.getMaxOverflow = function () { var t = this._cachedMeta.data; var e = 0; for (var i_37 = t.length - 1; i_37 >= 0; --i_37)
            e = Math.max(e, t[i_37].size(this.resolveDataElementOptions(i_37)) / 2); return e > 0 && e; };
        Pn.prototype.getLabelAndValue = function (t) { var e = this._cachedMeta, i = e.xScale, s = e.yScale, n = this.getParsed(t), o = i.getLabelForValue(n.x), a = s.getLabelForValue(n.y), r = n._custom; return { label: e.label, value: "(" + o + ", " + a + (r ? ", " + r : "") + ")" }; };
        Pn.prototype.update = function (t) { var e = this._cachedMeta.data; this.updateElements(e, 0, e.length, t); };
        Pn.prototype.updateElements = function (t, e, i, s) { var n = "reset" === s, _b = this._cachedMeta, o = _b.iScale, a = _b.vScale, r = this.resolveDataElementOptions(e, s), l = this.getSharedOptions(r), h = this.includeOptions(s, l), c = o.axis, d = a.axis; for (var r_11 = e; r_11 < e + i; r_11++) {
            var e_54 = t[r_11], i_38 = !n && this.getParsed(r_11), l_14 = {}, u_2 = l_14[c] = n ? o.getPixelForDecimal(.5) : o.getPixelForValue(i_38[c]), f_3 = l_14[d] = n ? a.getBasePixel() : a.getPixelForValue(i_38[d]);
            l_14.skip = isNaN(u_2) || isNaN(f_3), h && (l_14.options = this.resolveDataElementOptions(r_11, e_54.active ? "active" : s), n && (l_14.options.radius = 0)), this.updateElement(e_54, r_11, l_14, s);
        } this.updateSharedOptions(l, s, r); };
        Pn.prototype.resolveDataElementOptions = function (t, e) { var i = this.getParsed(t); var s = _super.prototype.resolveDataElementOptions.call(this, t, e); s.$shared && (s = Object.assign({}, s, { $shared: !1 })); var n = s.radius; return "active" !== e && (s.radius = 0), s.radius += K(i && i._custom, n), s; };
        return Pn;
    }(Ps));
    Pn.id = "bubble", Pn.defaults = { datasetElementType: !1, dataElementType: "point", animations: { numbers: { type: "number", properties: ["x", "y", "borderWidth", "radius"] } } }, Pn.overrides = { scales: { x: { type: "linear" }, y: { type: "linear" } }, plugins: { tooltip: { callbacks: { title: function () { return ""; } } } } };
    var Dn = /** @class */ (function (_super) {
        __extends(Dn, _super);
        function Dn(t, e) {
            var _this = this;
            _this = _super.call(this, t, e) || this, _this.enableOptionSharing = !0, _this.innerRadius = void 0, _this.outerRadius = void 0, _this.offsetX = void 0, _this.offsetY = void 0;
            return _this;
        }
        Dn.prototype.linkScales = function () { };
        Dn.prototype.parse = function (t, e) { var i = this.getDataset().data, s = this._cachedMeta; if (!1 === this._parsing)
            s._parsed = i;
        else {
            var n_24, o_24, a_15 = function (t) { return +i[t]; };
            if (U(i[t])) {
                var _b = this._parsing.key, t_60 = _b === void 0 ? "value" : _b;
                a_15 = function (e) { return +lt(i[e], t_60); };
            }
            for (n_24 = t, o_24 = t + e; n_24 < o_24; ++n_24)
                s._parsed[n_24] = a_15(n_24);
        } };
        Dn.prototype._getRotation = function () { return It(this.options.rotation - 90); };
        Dn.prototype._getCircumference = function () { return It(this.options.circumference); };
        Dn.prototype._getRotationExtents = function () { var t = yt, e = -yt; for (var i_39 = 0; i_39 < this.chart.data.datasets.length; ++i_39)
            if (this.chart.isDatasetVisible(i_39)) {
                var s_33 = this.chart.getDatasetMeta(i_39).controller, n_25 = s_33._getRotation(), o_25 = s_33._getCircumference();
                t = Math.min(t, n_25), e = Math.max(e, n_25 + o_25);
            } return { rotation: t, circumference: e - t }; };
        Dn.prototype.update = function (t) { var e = this.chart, i = e.chartArea, s = this._cachedMeta, n = s.data, o = this.getMaxBorderWidth() + this.getMaxOffset(n) + this.options.spacing, a = Math.max((Math.min(i.width, i.height) - o) / 2, 0), r = Math.min(G(this.options.cutout, a), 1), l = this._getRingWeight(this.index), _b = this._getRotationExtents(), h = _b.circumference, c = _b.rotation, _c = function (t, e, i) { var s = 1, n = 1, o = 0, a = 0; if (e < yt) {
            var r_12 = t, l_15 = r_12 + e, h_13 = Math.cos(r_12), c_8 = Math.sin(r_12), d_7 = Math.cos(l_15), u_3 = Math.sin(l_15), f_4 = function (t, e, s) { return Ht(t, r_12, l_15, !0) ? 1 : Math.max(e, e * i, s, s * i); }, g_2 = function (t, e, s) { return Ht(t, r_12, l_15, !0) ? -1 : Math.min(e, e * i, s, s * i); }, p_2 = f_4(0, h_13, d_7), m_2 = f_4(kt, c_8, u_3), x_1 = g_2(_t, h_13, d_7), b_1 = g_2(_t + kt, c_8, u_3);
            s = (p_2 - x_1) / 2, n = (m_2 - b_1) / 2, o = -(p_2 + x_1) / 2, a = -(m_2 + b_1) / 2;
        } return { ratioX: s, ratioY: n, offsetX: o, offsetY: a }; }(c, h, r), d = _c.ratioX, u = _c.ratioY, f = _c.offsetX, g = _c.offsetY, p = (i.width - o) / d, m = (i.height - o) / u, x = Math.max(Math.min(p, m) / 2, 0), b = Z(this.options.radius, x), _ = (b - Math.max(b * r, 0)) / this._getVisibleDatasetWeightTotal(); this.offsetX = f * b, this.offsetY = g * b, s.total = this.calculateTotal(), this.outerRadius = b - _ * this._getRingWeightOffset(this.index), this.innerRadius = Math.max(this.outerRadius - _ * l, 0), this.updateElements(n, 0, n.length, t); };
        Dn.prototype._circumference = function (t, e) { var i = this.options, s = this._cachedMeta, n = this._getCircumference(); return e && i.animation.animateRotate || !this.chart.getDataVisibility(t) || null === s._parsed[t] || s.data[t].hidden ? 0 : this.calculateCircumference(s._parsed[t] * n / yt); };
        Dn.prototype.updateElements = function (t, e, i, s) { var n = "reset" === s, o = this.chart, a = o.chartArea, r = o.options.animation, l = (a.left + a.right) / 2, h = (a.top + a.bottom) / 2, c = n && r.animateScale, d = c ? 0 : this.innerRadius, u = c ? 0 : this.outerRadius, f = this.resolveDataElementOptions(e, s), g = this.getSharedOptions(f), p = this.includeOptions(s, g); var m, x = this._getRotation(); for (m = 0; m < e; ++m)
            x += this._circumference(m, n); for (m = e; m < e + i; ++m) {
            var e_55 = this._circumference(m, n), i_40 = t[m], o_26 = { x: l + this.offsetX, y: h + this.offsetY, startAngle: x, endAngle: x + e_55, circumference: e_55, outerRadius: u, innerRadius: d };
            p && (o_26.options = g || this.resolveDataElementOptions(m, i_40.active ? "active" : s)), x += e_55, this.updateElement(i_40, m, o_26, s);
        } this.updateSharedOptions(g, s, f); };
        Dn.prototype.calculateTotal = function () { var t = this._cachedMeta, e = t.data; var i, s = 0; for (i = 0; i < e.length; i++) {
            var n_26 = t._parsed[i];
            null === n_26 || isNaN(n_26) || !this.chart.getDataVisibility(i) || e[i].hidden || (s += Math.abs(n_26));
        } return s; };
        Dn.prototype.calculateCircumference = function (t) { var e = this._cachedMeta.total; return e > 0 && !isNaN(t) ? yt * (Math.abs(t) / e) : 0; };
        Dn.prototype.getLabelAndValue = function (t) { var e = this._cachedMeta, i = this.chart, s = i.data.labels || [], n = Ri(e._parsed[t], i.options.locale); return { label: s[t] || "", value: n }; };
        Dn.prototype.getMaxBorderWidth = function (t) { var e = 0; var i = this.chart; var s, n, o, a, r; if (!t)
            for (s = 0, n = i.data.datasets.length; s < n; ++s)
                if (i.isDatasetVisible(s)) {
                    o = i.getDatasetMeta(s), t = o.data, a = o.controller;
                    break;
                } if (!t)
            return 0; for (s = 0, n = t.length; s < n; ++s)
            r = a.resolveDataElementOptions(s), "inner" !== r.borderAlign && (e = Math.max(e, r.borderWidth || 0, r.hoverBorderWidth || 0)); return e; };
        Dn.prototype.getMaxOffset = function (t) { var e = 0; for (var i_41 = 0, s_34 = t.length; i_41 < s_34; ++i_41) {
            var t_61 = this.resolveDataElementOptions(i_41);
            e = Math.max(e, t_61.offset || 0, t_61.hoverOffset || 0);
        } return e; };
        Dn.prototype._getRingWeightOffset = function (t) { var e = 0; for (var i_42 = 0; i_42 < t; ++i_42)
            this.chart.isDatasetVisible(i_42) && (e += this._getRingWeight(i_42)); return e; };
        Dn.prototype._getRingWeight = function (t) { return Math.max(K(this.chart.data.datasets[t].weight, 1), 0); };
        Dn.prototype._getVisibleDatasetWeightTotal = function () { return this._getRingWeightOffset(this.chart.data.datasets.length) || 1; };
        return Dn;
    }(Ps));
    Dn.id = "doughnut", Dn.defaults = { datasetElementType: !1, dataElementType: "arc", animation: { animateRotate: !0, animateScale: !1 }, animations: { numbers: { type: "number", properties: ["circumference", "endAngle", "innerRadius", "outerRadius", "startAngle", "x", "y", "offset", "borderWidth", "spacing"] } }, cutout: "50%", rotation: 0, circumference: 360, radius: "100%", spacing: 0, indexAxis: "r" }, Dn.descriptors = { _scriptable: function (t) { return "spacing" !== t; }, _indexable: function (t) { return "spacing" !== t; } }, Dn.overrides = { aspectRatio: 1, plugins: { legend: { labels: { generateLabels: function (t) { var e = t.data; if (e.labels.length && e.datasets.length) {
                        var i_43 = t.legend.options.labels.pointStyle;
                        return e.labels.map((function (e, s) { var n = t.getDatasetMeta(0).controller.getStyle(s); return { text: e, fillStyle: n.backgroundColor, strokeStyle: n.borderColor, lineWidth: n.borderWidth, pointStyle: i_43, hidden: !t.getDataVisibility(s), index: s }; }));
                    } return []; } }, onClick: function (t, e, i) { i.chart.toggleDataVisibility(e.index), i.chart.update(); } }, tooltip: { callbacks: { title: function () { return ""; }, label: function (t) { var e = t.label; var i = ": " + t.formattedValue; return Y(e) ? (e = e.slice(), e[0] += i) : e += i, e; } } } } };
    var Cn = /** @class */ (function (_super) {
        __extends(Cn, _super);
        function Cn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Cn.prototype.initialize = function () { this.enableOptionSharing = !0, _super.prototype.initialize.call(this); };
        Cn.prototype.update = function (t) { var e = this._cachedMeta, i = e.dataset, _b = e.data, s = _b === void 0 ? [] : _b, n = e._dataset, o = this.chart._animationsDisabled; var _c = function (t, e, i) { var s = e.length; var n = 0, o = s; if (t._sorted) {
            var a_16 = t.iScale, r_13 = t._parsed, l_16 = a_16.axis, _b = a_16.getUserBounds(), h_14 = _b.min, c_9 = _b.max, d_8 = _b.minDefined, u_4 = _b.maxDefined;
            d_8 && (n = jt(Math.min(re(r_13, a_16.axis, h_14).lo, i ? s : re(e, l_16, a_16.getPixelForValue(h_14)).lo), 0, s - 1)), o = u_4 ? jt(Math.max(re(r_13, a_16.axis, c_9).hi + 1, i ? 0 : re(e, l_16, a_16.getPixelForValue(c_9)).hi + 1), n, s) - n : s - n;
        } return { start: n, count: o }; }(e, s, o), a = _c.start, r = _c.count; this._drawStart = a, this._drawCount = r, function (t) { var e = t.xScale, i = t.yScale, s = t._scaleRanges, n = { xmin: e.min, xmax: e.max, ymin: i.min, ymax: i.max }; if (!s)
            return t._scaleRanges = n, !0; var o = s.xmin !== e.min || s.xmax !== e.max || s.ymin !== i.min || s.ymax !== i.max; return Object.assign(s, n), o; }(e) && (a = 0, r = s.length), i._chart = this.chart, i._datasetIndex = this.index, i._decimated = !!n._decimated, i.points = s; var l = this.resolveDatasetElementOptions(t); this.options.showLine || (l.borderWidth = 0), l.segment = this.options.segment, this.updateElement(i, void 0, { animated: !o, options: l }, t), this.updateElements(s, a, r, t); };
        Cn.prototype.updateElements = function (t, e, i, s) { var n = "reset" === s, _b = this._cachedMeta, o = _b.iScale, a = _b.vScale, r = _b._stacked, l = _b._dataset, h = this.resolveDataElementOptions(e, s), c = this.getSharedOptions(h), d = this.includeOptions(s, c), u = o.axis, f = a.axis, _c = this.options, g = _c.spanGaps, p = _c.segment, m = Tt(g) ? g : Number.POSITIVE_INFINITY, x = this.chart._animationsDisabled || n || "none" === s; var b = e > 0 && this.getParsed(e - 1); for (var h_15 = e; h_15 < e + i; ++h_15) {
            var e_56 = t[h_15], i_44 = this.getParsed(h_15), g_3 = x ? e_56 : {}, _1 = $(i_44[f]), y_1 = g_3[u] = o.getPixelForValue(i_44[u], h_15), v_1 = g_3[f] = n || _1 ? a.getBasePixel() : a.getPixelForValue(r ? this.applyStack(a, i_44, r) : i_44[f], h_15);
            g_3.skip = isNaN(y_1) || isNaN(v_1) || _1, g_3.stop = h_15 > 0 && i_44[u] - b[u] > m, p && (g_3.parsed = i_44, g_3.raw = l.data[h_15]), d && (g_3.options = c || this.resolveDataElementOptions(h_15, e_56.active ? "active" : s)), x || this.updateElement(e_56, h_15, g_3, s), b = i_44;
        } this.updateSharedOptions(c, s, h); };
        Cn.prototype.getMaxOverflow = function () { var t = this._cachedMeta, e = t.dataset, i = e.options && e.options.borderWidth || 0, s = t.data || []; if (!s.length)
            return i; var n = s[0].size(this.resolveDataElementOptions(0)), o = s[s.length - 1].size(this.resolveDataElementOptions(s.length - 1)); return Math.max(i, n, o) / 2; };
        Cn.prototype.draw = function () { var t = this._cachedMeta; t.dataset.updateControlPoints(this.chart.chartArea, t.iScale.axis), _super.prototype.draw.call(this); };
        return Cn;
    }(Ps));
    Cn.id = "line", Cn.defaults = { datasetElementType: "line", dataElementType: "point", showLine: !0, spanGaps: !1 }, Cn.overrides = { scales: { _index_: { type: "category" }, _value_: { type: "linear" } } };
    var On = /** @class */ (function (_super) {
        __extends(On, _super);
        function On(t, e) {
            var _this = this;
            _this = _super.call(this, t, e) || this, _this.innerRadius = void 0, _this.outerRadius = void 0;
            return _this;
        }
        On.prototype.getLabelAndValue = function (t) { var e = this._cachedMeta, i = this.chart, s = i.data.labels || [], n = Ri(e._parsed[t].r, i.options.locale); return { label: s[t] || "", value: n }; };
        On.prototype.update = function (t) { var e = this._cachedMeta.data; this._updateRadius(), this.updateElements(e, 0, e.length, t); };
        On.prototype._updateRadius = function () { var t = this.chart, e = t.chartArea, i = t.options, s = Math.min(e.right - e.left, e.bottom - e.top), n = Math.max(s / 2, 0), o = (n - Math.max(i.cutoutPercentage ? n / 100 * i.cutoutPercentage : 1, 0)) / t.getVisibleDatasetCount(); this.outerRadius = n - o * this.index, this.innerRadius = this.outerRadius - o; };
        On.prototype.updateElements = function (t, e, i, s) { var n = "reset" === s, o = this.chart, a = this.getDataset(), r = o.options.animation, l = this._cachedMeta.rScale, h = l.xCenter, c = l.yCenter, d = l.getIndexAngle(0) - .5 * _t; var u, f = d; var g = 360 / this.countVisibleElements(); for (u = 0; u < e; ++u)
            f += this._computeAngle(u, s, g); for (u = e; u < e + i; u++) {
            var e_57 = t[u];
            var i_45 = f, p_3 = f + this._computeAngle(u, s, g), m_3 = o.getDataVisibility(u) ? l.getDistanceFromCenterForValue(a.data[u]) : 0;
            f = p_3, n && (r.animateScale && (m_3 = 0), r.animateRotate && (i_45 = p_3 = d));
            var x_2 = { x: h, y: c, innerRadius: 0, outerRadius: m_3, startAngle: i_45, endAngle: p_3, options: this.resolveDataElementOptions(u, e_57.active ? "active" : s) };
            this.updateElement(e_57, u, x_2, s);
        } };
        On.prototype.countVisibleElements = function () {
            var _this = this;
            var t = this.getDataset(), e = this._cachedMeta;
            var i = 0;
            return e.data.forEach((function (e, s) { !isNaN(t.data[s]) && _this.chart.getDataVisibility(s) && i++; })), i;
        };
        On.prototype._computeAngle = function (t, e, i) { return this.chart.getDataVisibility(t) ? It(this.resolveDataElementOptions(t, e).angle || i) : 0; };
        return On;
    }(Ps));
    On.id = "polarArea", On.defaults = { dataElementType: "arc", animation: { animateRotate: !0, animateScale: !0 }, animations: { numbers: { type: "number", properties: ["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius"] } }, indexAxis: "r", startAngle: 0 }, On.overrides = { aspectRatio: 1, plugins: { legend: { labels: { generateLabels: function (t) { var e = t.data; if (e.labels.length && e.datasets.length) {
                        var i_46 = t.legend.options.labels.pointStyle;
                        return e.labels.map((function (e, s) { var n = t.getDatasetMeta(0).controller.getStyle(s); return { text: e, fillStyle: n.backgroundColor, strokeStyle: n.borderColor, lineWidth: n.borderWidth, pointStyle: i_46, hidden: !t.getDataVisibility(s), index: s }; }));
                    } return []; } }, onClick: function (t, e, i) { i.chart.toggleDataVisibility(e.index), i.chart.update(); } }, tooltip: { callbacks: { title: function () { return ""; }, label: function (t) { return t.chart.data.labels[t.dataIndex] + ": " + t.formattedValue; } } } }, scales: { r: { type: "radialLinear", angleLines: { display: !1 }, beginAtZero: !0, grid: { circular: !0 }, pointLabels: { display: !1 }, startAngle: 0 } } };
    var An = /** @class */ (function (_super) {
        __extends(An, _super);
        function An() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return An;
    }(Dn));
    An.id = "pie", An.defaults = { cutout: 0, rotation: 0, circumference: 360, radius: "100%" };
    var Tn = /** @class */ (function (_super) {
        __extends(Tn, _super);
        function Tn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Tn.prototype.getLabelAndValue = function (t) { var e = this._cachedMeta.vScale, i = this.getParsed(t); return { label: e.getLabels()[t], value: "" + e.getLabelForValue(i[e.axis]) }; };
        Tn.prototype.update = function (t) { var e = this._cachedMeta, i = e.dataset, s = e.data || [], n = e.iScale.getLabels(); if (i.points = s, "resize" !== t) {
            var e_58 = this.resolveDatasetElementOptions(t);
            this.options.showLine || (e_58.borderWidth = 0);
            var o_27 = { _loop: !0, _fullLoop: n.length === s.length, options: e_58 };
            this.updateElement(i, void 0, o_27, t);
        } this.updateElements(s, 0, s.length, t); };
        Tn.prototype.updateElements = function (t, e, i, s) { var n = this.getDataset(), o = this._cachedMeta.rScale, a = "reset" === s; for (var r_14 = e; r_14 < e + i; r_14++) {
            var e_59 = t[r_14], i_47 = this.resolveDataElementOptions(r_14, e_59.active ? "active" : s), l_17 = o.getPointPositionForValue(r_14, n.data[r_14]), h_16 = a ? o.xCenter : l_17.x, c_10 = a ? o.yCenter : l_17.y, d_9 = { x: h_16, y: c_10, angle: l_17.angle, skip: isNaN(h_16) || isNaN(c_10), options: i_47 };
            this.updateElement(e_59, r_14, d_9, s);
        } };
        return Tn;
    }(Ps));
    Tn.id = "radar", Tn.defaults = { datasetElementType: "line", dataElementType: "point", indexAxis: "r", showLine: !0, elements: { line: { fill: "start" } } }, Tn.overrides = { aspectRatio: 1, scales: { r: { type: "radialLinear" } } };
    var Ln = /** @class */ (function (_super) {
        __extends(Ln, _super);
        function Ln() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Ln;
    }(Cn));
    Ln.id = "scatter", Ln.defaults = { showLine: !1, fill: !1 }, Ln.overrides = { interaction: { mode: "point" }, plugins: { tooltip: { callbacks: { title: function () { return ""; }, label: function (t) { return "(" + t.label + ", " + t.formattedValue + ")"; } } } }, scales: { x: { type: "linear" }, y: { type: "linear" } } };
    var Rn = Object.freeze({ __proto__: null, BarController: Sn, BubbleController: Pn, DoughnutController: Dn, LineController: Cn, PolarAreaController: On, PieController: An, RadarController: Tn, ScatterController: Ln });
    function En(t, e, i) { var s = e.startAngle, n = e.pixelMargin, o = e.x, a = e.y, r = e.outerRadius, l = e.innerRadius; var h = n / r; t.beginPath(), t.arc(o, a, r, s - h, i + h), l > n ? (h = n / l, t.arc(o, a, l, i + h, s - h, !0)) : t.arc(o, a, n, i + kt, s - kt), t.closePath(), t.clip(); }
    function In(t, e, i, s) { var n = Be(t.options.borderRadius, ["outerStart", "outerEnd", "innerStart", "innerEnd"]); var o = (i - e) / 2, a = Math.min(o, s * e / 2), r = function (t) { var e = (i - Math.min(o, t)) * s / 2; return jt(t, 0, Math.min(o, e)); }; return { outerStart: r(n.outerStart), outerEnd: r(n.outerEnd), innerStart: jt(n.innerStart, 0, a), innerEnd: jt(n.innerEnd, 0, a) }; }
    function zn(t, e, i, s) { return { x: i + t * Math.cos(e), y: s + t * Math.sin(e) }; }
    function Fn(t, e, i, s, n) { var o = e.x, a = e.y, r = e.startAngle, l = e.pixelMargin, h = e.innerRadius, c = Math.max(e.outerRadius + s + i - l, 0), d = h > 0 ? h + s + i + l : 0; var u = 0; var f = n - r; if (s) {
        var t_62 = ((h > 0 ? h - s : 0) + (c > 0 ? c - s : 0)) / 2;
        u = (f - (0 !== t_62 ? f * t_62 / (t_62 + s) : f)) / 2;
    } var g = (f - Math.max(.001, f * c - i / _t) / c) / 2, p = r + g + u, m = n - g - u, _b = In(e, d, c, m - p), x = _b.outerStart, b = _b.outerEnd, _ = _b.innerStart, y = _b.innerEnd, v = c - x, w = c - b, M = p + x / v, k = m - b / w, S = d + _, P = d + y, D = p + _ / S, C = m - y / P; if (t.beginPath(), t.arc(o, a, c, M, k), b > 0) {
        var e_60 = zn(w, k, o, a);
        t.arc(e_60.x, e_60.y, b, k, m + kt);
    } var O = zn(P, m, o, a); if (t.lineTo(O.x, O.y), y > 0) {
        var e_61 = zn(P, C, o, a);
        t.arc(e_61.x, e_61.y, y, m + kt, C + Math.PI);
    } if (t.arc(o, a, d, m - y / d, p + _ / d, !0), _ > 0) {
        var e_62 = zn(S, D, o, a);
        t.arc(e_62.x, e_62.y, _, D + Math.PI, p - kt);
    } var A = zn(v, p, o, a); if (t.lineTo(A.x, A.y), x > 0) {
        var e_63 = zn(v, M, o, a);
        t.arc(e_63.x, e_63.y, x, p - kt, M);
    } t.closePath(); }
    function Bn(t, e, i, s, n) { var o = e.options, a = o.borderWidth, r = o.borderJoinStyle, l = "inner" === o.borderAlign; a && (l ? (t.lineWidth = 2 * a, t.lineJoin = r || "round") : (t.lineWidth = a, t.lineJoin = r || "bevel"), e.fullCircles && function (t, e, i) { var s = e.x, n = e.y, o = e.startAngle, a = e.pixelMargin, r = e.fullCircles, l = Math.max(e.outerRadius - a, 0), h = e.innerRadius + a; var c; for (i && En(t, e, o + yt), t.beginPath(), t.arc(s, n, h, o + yt, o, !0), c = 0; c < r; ++c)
        t.stroke(); for (t.beginPath(), t.arc(s, n, l, o, o + yt), c = 0; c < r; ++c)
        t.stroke(); }(t, e, l), l && En(t, e, n), Fn(t, e, i, s, n), t.stroke()); }
    var Vn = /** @class */ (function (_super) {
        __extends(Vn, _super);
        function Vn(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.options = void 0, _this.circumference = void 0, _this.startAngle = void 0, _this.endAngle = void 0, _this.innerRadius = void 0, _this.outerRadius = void 0, _this.pixelMargin = 0, _this.fullCircles = 0, t && Object.assign(_this, t);
            return _this;
        }
        Vn.prototype.inRange = function (t, e, i) { var s = this.getProps(["x", "y"], i), _b = Bt(s, { x: t, y: e }), n = _b.angle, o = _b.distance, _c = this.getProps(["startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], i), a = _c.startAngle, r = _c.endAngle, l = _c.innerRadius, h = _c.outerRadius, c = _c.circumference, d = this.options.spacing / 2, u = K(c, r - a) >= yt || Ht(n, a, r), f = Yt(o, l + d, h + d); return u && f; };
        Vn.prototype.getCenterPoint = function (t) { var _b = this.getProps(["x", "y", "startAngle", "endAngle", "innerRadius", "outerRadius", "circumference"], t), e = _b.x, i = _b.y, s = _b.startAngle, n = _b.endAngle, o = _b.innerRadius, a = _b.outerRadius, _c = this.options, r = _c.offset, l = _c.spacing, h = (s + n) / 2, c = (o + a + l + r) / 2; return { x: e + Math.cos(h) * c, y: i + Math.sin(h) * c }; };
        Vn.prototype.tooltipPosition = function (t) { return this.getCenterPoint(t); };
        Vn.prototype.draw = function (t) { var _b = this, e = _b.options, i = _b.circumference, s = (e.offset || 0) / 2, n = (e.spacing || 0) / 2; if (this.pixelMargin = "inner" === e.borderAlign ? .33 : 0, this.fullCircles = i > yt ? Math.floor(i / yt) : 0, 0 === i || this.innerRadius < 0 || this.outerRadius < 0)
            return; t.save(); var o = 0; if (s) {
            o = s / 2;
            var e_64 = (this.startAngle + this.endAngle) / 2;
            t.translate(Math.cos(e_64) * o, Math.sin(e_64) * o), this.circumference >= _t && (o = s);
        } t.fillStyle = e.backgroundColor, t.strokeStyle = e.borderColor; var a = function (t, e, i, s) { var n = e.fullCircles, o = e.startAngle, a = e.circumference; var r = e.endAngle; if (n) {
            Fn(t, e, i, s, o + yt);
            for (var e_65 = 0; e_65 < n; ++e_65)
                t.fill();
            isNaN(a) || (r = o + a % yt, a % yt == 0 && (r += yt));
        } return Fn(t, e, i, s, r), t.fill(), r; }(t, this, o, n); Bn(t, this, o, n, a), t.restore(); };
        return Vn;
    }(Ds));
    function Wn(t, e, i) {
        if (i === void 0) { i = e; }
        t.lineCap = K(i.borderCapStyle, e.borderCapStyle), t.setLineDash(K(i.borderDash, e.borderDash)), t.lineDashOffset = K(i.borderDashOffset, e.borderDashOffset), t.lineJoin = K(i.borderJoinStyle, e.borderJoinStyle), t.lineWidth = K(i.borderWidth, e.borderWidth), t.strokeStyle = K(i.borderColor, e.borderColor);
    }
    function Nn(t, e, i) { t.lineTo(i.x, i.y); }
    function Hn(t, e, i) {
        if (i === void 0) { i = {}; }
        var s = t.length, _b = i.start, n = _b === void 0 ? 0 : _b, _c = i.end, o = _c === void 0 ? s - 1 : _c, a = e.start, r = e.end, l = Math.max(n, a), h = Math.min(o, r), c = n < a && o < a || n > r && o > r;
        return { count: s, start: l, loop: e.loop, ilen: h < l && !c ? s + h - l : h - l };
    }
    function jn(t, e, i, s) { var n = e.points, o = e.options, _b = Hn(n, i, s), a = _b.count, r = _b.start, l = _b.loop, h = _b.ilen, c = function (t) { return t.stepped ? ee : t.tension || "monotone" === t.cubicInterpolationMode ? ie : Nn; }(o); var d, u, f, _c = s || {}, _d = _c.move, g = _d === void 0 ? !0 : _d, p = _c.reverse; for (d = 0; d <= h; ++d)
        u = n[(r + (p ? h - d : d)) % a], u.skip || (g ? (t.moveTo(u.x, u.y), g = !1) : c(t, f, u, p, o.stepped), f = u); return l && (u = n[(r + (p ? h : 0)) % a], c(t, f, u, p, o.stepped)), !!l; }
    function $n(t, e, i, s) { var n = e.points, _b = Hn(n, i, s), o = _b.count, a = _b.start, r = _b.ilen, _c = s || {}, _d = _c.move, l = _d === void 0 ? !0 : _d, h = _c.reverse; var c, d, u, f, g, p, m = 0, x = 0; var b = function (t) { return (a + (h ? r - t : t)) % o; }, _ = function () { f !== g && (t.lineTo(m, g), t.lineTo(m, f), t.lineTo(m, p)); }; for (l && (d = n[b(0)], t.moveTo(d.x, d.y)), c = 0; c <= r; ++c) {
        if (d = n[b(c)], d.skip)
            continue;
        var e_66 = d.x, i_48 = d.y, s_35 = 0 | e_66;
        s_35 === u ? (i_48 < f ? f = i_48 : i_48 > g && (g = i_48), m = (x * m + e_66) / ++x) : (_(), t.lineTo(e_66, i_48), u = s_35, x = 0, f = g = i_48), p = i_48;
    } _(); }
    function Yn(t) { var e = t.options, i = e.borderDash && e.borderDash.length; return !(t._decimated || t._loop || e.tension || "monotone" === e.cubicInterpolationMode || e.stepped || i) ? $n : jn; }
    Vn.id = "arc", Vn.defaults = { borderAlign: "center", borderColor: "#fff", borderJoinStyle: void 0, borderRadius: 0, borderWidth: 2, offset: 0, spacing: 0, angle: void 0 }, Vn.defaultRoutes = { backgroundColor: "backgroundColor" };
    var Un = "function" == typeof Path2D;
    function Xn(t, e, i, s) { Un && !e.options.segment ? function (t, e, i, s) { var n = e._path; n || (n = e._path = new Path2D, e.path(n, i, s) && n.closePath()), Wn(t, e.options), t.stroke(n); }(t, e, i, s) : function (t, e, i, s) { var n = e.segments, o = e.options, a = Yn(e); for (var _b = 0, n_27 = n; _b < n_27.length; _b++) {
        var r_15 = n_27[_b];
        Wn(t, o, r_15.style), t.beginPath(), a(t, e, r_15, { start: i, end: i + s - 1 }) && t.closePath(), t.stroke();
    } }(t, e, i, s); }
    var qn = /** @class */ (function (_super) {
        __extends(qn, _super);
        function qn(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.animated = !0, _this.options = void 0, _this._chart = void 0, _this._loop = void 0, _this._fullLoop = void 0, _this._path = void 0, _this._points = void 0, _this._segments = void 0, _this._decimated = !1, _this._pointsUpdated = !1, _this._datasetIndex = void 0, t && Object.assign(_this, t);
            return _this;
        }
        qn.prototype.updateControlPoints = function (t, e) { var i = this.options; if ((i.tension || "monotone" === i.cubicInterpolationMode) && !i.stepped && !this._pointsUpdated) {
            var s_36 = i.spanGaps ? this._loop : this._fullLoop;
            ki(this._points, i, t, s_36, e), this._pointsUpdated = !0;
        } };
        Object.defineProperty(qn.prototype, "points", {
            get: function () { return this._points; },
            set: function (t) { this._points = t, delete this._segments, delete this._path, this._pointsUpdated = !1; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(qn.prototype, "segments", {
            get: function () { return this._segments || (this._segments = Ni(this, this.options.segment)); },
            enumerable: false,
            configurable: true
        });
        qn.prototype.first = function () { var t = this.segments, e = this.points; return t.length && e[t[0].start]; };
        qn.prototype.last = function () { var t = this.segments, e = this.points, i = t.length; return i && e[t[i - 1].end]; };
        qn.prototype.interpolate = function (t, e) { var i = this.options, s = t[e], n = this.points, o = Wi(this, { property: e, start: s, end: s }); if (!o.length)
            return; var a = [], r = function (t) { return t.stepped ? Ai : t.tension || "monotone" === t.cubicInterpolationMode ? Ti : Oi; }(i); var l, h; for (l = 0, h = o.length; l < h; ++l) {
            var _b = o[l], h_17 = _b.start, c_11 = _b.end, d_10 = n[h_17], u_5 = n[c_11];
            if (d_10 === u_5) {
                a.push(d_10);
                continue;
            }
            var f_5 = r(d_10, u_5, Math.abs((s - d_10[e]) / (u_5[e] - d_10[e])), i.stepped);
            f_5[e] = t[e], a.push(f_5);
        } return 1 === a.length ? a[0] : a; };
        qn.prototype.pathSegment = function (t, e, i) { return Yn(this)(t, this, e, i); };
        qn.prototype.path = function (t, e, i) { var s = this.segments, n = Yn(this); var o = this._loop; e = e || 0, i = i || this.points.length - e; for (var _b = 0, s_37 = s; _b < s_37.length; _b++) {
            var a_17 = s_37[_b];
            o &= n(t, this, a_17, { start: e, end: e + i - 1 });
        } return !!o; };
        qn.prototype.draw = function (t, e, i, s) { var n = this.options || {}; (this.points || []).length && n.borderWidth && (t.save(), Xn(t, this, i, s), t.restore()), this.animated && (this._pointsUpdated = !1, this._path = void 0); };
        return qn;
    }(Ds));
    function Kn(t, e, i, s) { var n = t.options, _b = t.getProps([i], s), _c = i, o = _b[_c]; return Math.abs(e - o) < n.radius + n.hitRadius; }
    qn.id = "line", qn.defaults = { borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", borderWidth: 3, capBezierPoints: !0, cubicInterpolationMode: "default", fill: !1, spanGaps: !1, stepped: !1, tension: 0 }, qn.defaultRoutes = { backgroundColor: "backgroundColor", borderColor: "borderColor" }, qn.descriptors = { _scriptable: !0, _indexable: function (t) { return "borderDash" !== t && "fill" !== t; } };
    var Gn = /** @class */ (function (_super) {
        __extends(Gn, _super);
        function Gn(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.options = void 0, _this.parsed = void 0, _this.skip = void 0, _this.stop = void 0, t && Object.assign(_this, t);
            return _this;
        }
        Gn.prototype.inRange = function (t, e, i) { var s = this.options, _b = this.getProps(["x", "y"], i), n = _b.x, o = _b.y; return Math.pow(t - n, 2) + Math.pow(e - o, 2) < Math.pow(s.hitRadius + s.radius, 2); };
        Gn.prototype.inXRange = function (t, e) { return Kn(this, t, "x", e); };
        Gn.prototype.inYRange = function (t, e) { return Kn(this, t, "y", e); };
        Gn.prototype.getCenterPoint = function (t) { var _b = this.getProps(["x", "y"], t), e = _b.x, i = _b.y; return { x: e, y: i }; };
        Gn.prototype.size = function (t) { var e = (t = t || this.options || {}).radius || 0; e = Math.max(e, e && t.hoverRadius || 0); return 2 * (e + (e && t.borderWidth || 0)); };
        Gn.prototype.draw = function (t, e) { var i = this.options; this.skip || i.radius < .1 || !Jt(this, e, this.size(i) / 2) || (t.strokeStyle = i.borderColor, t.lineWidth = i.borderWidth, t.fillStyle = i.backgroundColor, Zt(t, i, this.x, this.y)); };
        Gn.prototype.getRange = function () { var t = this.options || {}; return t.radius + t.hitRadius; };
        return Gn;
    }(Ds));
    function Zn(t, e) { var _b = t.getProps(["x", "y", "base", "width", "height"], e), i = _b.x, s = _b.y, n = _b.base, o = _b.width, a = _b.height; var r, l, h, c, d; return t.horizontal ? (d = a / 2, r = Math.min(i, n), l = Math.max(i, n), h = s - d, c = s + d) : (d = o / 2, r = i - d, l = i + d, h = Math.min(s, n), c = Math.max(s, n)), { left: r, top: h, right: l, bottom: c }; }
    function Jn(t, e, i, s) { return t ? 0 : jt(e, i, s); }
    function Qn(t) { var e = Zn(t), i = e.right - e.left, s = e.bottom - e.top, n = function (t, e, i) { var s = t.options.borderWidth, n = t.borderSkipped, o = Ve(s); return { t: Jn(n.top, o.top, 0, i), r: Jn(n.right, o.right, 0, e), b: Jn(n.bottom, o.bottom, 0, i), l: Jn(n.left, o.left, 0, e) }; }(t, i / 2, s / 2), o = function (t, e, i) { var s = t.getProps(["enableBorderRadius"]).enableBorderRadius, n = t.options.borderRadius, o = We(n), a = Math.min(e, i), r = t.borderSkipped, l = s || U(n); return { topLeft: Jn(!l || r.top || r.left, o.topLeft, 0, a), topRight: Jn(!l || r.top || r.right, o.topRight, 0, a), bottomLeft: Jn(!l || r.bottom || r.left, o.bottomLeft, 0, a), bottomRight: Jn(!l || r.bottom || r.right, o.bottomRight, 0, a) }; }(t, i / 2, s / 2); return { outer: { x: e.left, y: e.top, w: i, h: s, radius: o }, inner: { x: e.left + n.l, y: e.top + n.t, w: i - n.l - n.r, h: s - n.t - n.b, radius: { topLeft: Math.max(0, o.topLeft - Math.max(n.t, n.l)), topRight: Math.max(0, o.topRight - Math.max(n.t, n.r)), bottomLeft: Math.max(0, o.bottomLeft - Math.max(n.b, n.l)), bottomRight: Math.max(0, o.bottomRight - Math.max(n.b, n.r)) } } }; }
    function to(t, e, i, s) { var n = null === e, o = null === i, a = t && !(n && o) && Zn(t, s); return a && (n || Yt(e, a.left, a.right)) && (o || Yt(i, a.top, a.bottom)); }
    function eo(t, e) { t.rect(e.x, e.y, e.w, e.h); }
    function io(t, e, i) {
        if (i === void 0) { i = {}; }
        var s = t.x !== i.x ? -e : 0, n = t.y !== i.y ? -e : 0, o = (t.x + t.w !== i.x + i.w ? e : 0) - s, a = (t.y + t.h !== i.y + i.h ? e : 0) - n;
        return { x: t.x + s, y: t.y + n, w: t.w + o, h: t.h + a, radius: t.radius };
    }
    Gn.id = "point", Gn.defaults = { borderWidth: 1, hitRadius: 1, hoverBorderWidth: 1, hoverRadius: 4, pointStyle: "circle", radius: 3, rotation: 0 }, Gn.defaultRoutes = { backgroundColor: "backgroundColor", borderColor: "borderColor" };
    var so = /** @class */ (function (_super) {
        __extends(so, _super);
        function so(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.options = void 0, _this.horizontal = void 0, _this.base = void 0, _this.width = void 0, _this.height = void 0, _this.inflateAmount = void 0, t && Object.assign(_this, t);
            return _this;
        }
        so.prototype.draw = function (t) { var _b = this, e = _b.inflateAmount, _c = _b.options, i = _c.borderColor, s = _c.backgroundColor, _d = Qn(this), n = _d.inner, o = _d.outer, a = (r = o.radius).topLeft || r.topRight || r.bottomLeft || r.bottomRight ? oe : eo; var r; t.save(), o.w === n.w && o.h === n.h || (t.beginPath(), a(t, io(o, e, n)), t.clip(), a(t, io(n, -e, o)), t.fillStyle = i, t.fill("evenodd")), t.beginPath(), a(t, io(n, e)), t.fillStyle = s, t.fill(), t.restore(); };
        so.prototype.inRange = function (t, e, i) { return to(this, t, e, i); };
        so.prototype.inXRange = function (t, e) { return to(this, t, null, e); };
        so.prototype.inYRange = function (t, e) { return to(this, null, t, e); };
        so.prototype.getCenterPoint = function (t) { var _b = this.getProps(["x", "y", "base", "horizontal"], t), e = _b.x, i = _b.y, s = _b.base, n = _b.horizontal; return { x: n ? (e + s) / 2 : e, y: n ? i : (i + s) / 2 }; };
        so.prototype.getRange = function (t) { return "x" === t ? this.width / 2 : this.height / 2; };
        return so;
    }(Ds));
    so.id = "bar", so.defaults = { borderSkipped: "start", borderWidth: 0, borderRadius: 0, inflateAmount: "auto", pointStyle: void 0 }, so.defaultRoutes = { backgroundColor: "backgroundColor", borderColor: "borderColor" };
    var no = Object.freeze({ __proto__: null, ArcElement: Vn, LineElement: qn, PointElement: Gn, BarElement: so });
    function oo(t) { if (t._decimated) {
        var e_67 = t._data;
        delete t._decimated, delete t._data, Object.defineProperty(t, "data", { value: e_67 });
    } }
    function ao(t) { t.data.datasets.forEach((function (t) { oo(t); })); }
    var ro = { id: "decimation", defaults: { algorithm: "min-max", enabled: !1 }, beforeElementsUpdate: function (t, e, i) { if (!i.enabled)
            return void ao(t); var s = t.width; t.data.datasets.forEach((function (e, n) { var o = e._data, a = e.indexAxis, r = t.getDatasetMeta(n), l = o || e.data; if ("y" === je([a, t.options.indexAxis]))
            return; if ("line" !== r.type)
            return; var h = t.scales[r.xAxisID]; if ("linear" !== h.type && "time" !== h.type)
            return; if (t.options.parsing)
            return; var _b = function (t, e) { var i = e.length; var s, n = 0; var o = t.iScale, _b = o.getUserBounds(), a = _b.min, r = _b.max, l = _b.minDefined, h = _b.maxDefined; return l && (n = jt(re(e, o.axis, a).lo, 0, i - 1)), s = h ? jt(re(e, o.axis, r).hi + 1, n, i) - n : i - n, { start: n, count: s }; }(r, l), c = _b.start, d = _b.count; if (d <= (i.threshold || 4 * s))
            return void oo(e); var u; switch (($(o) && (e._data = l, delete e.data, Object.defineProperty(e, "data", { configurable: !0, enumerable: !0, get: function () { return this._decimated; }, set: function (t) { this._data = t; } })), i.algorithm)) {
            case "lttb":
                u = function (t, e, i, s, n) { var o = n.samples || s; if (o >= i)
                    return t.slice(e, e + i); var a = [], r = (i - 2) / (o - 2); var l = 0; var h = e + i - 1; var c, d, u, f, g, p = e; for (a[l++] = t[p], c = 0; c < o - 2; c++) {
                    var s_38 = void 0, n_28 = 0, o_28 = 0;
                    var h_18 = Math.floor((c + 1) * r) + 1 + e, m_4 = Math.min(Math.floor((c + 2) * r) + 1, i) + e, x_3 = m_4 - h_18;
                    for (s_38 = h_18; s_38 < m_4; s_38++)
                        n_28 += t[s_38].x, o_28 += t[s_38].y;
                    n_28 /= x_3, o_28 /= x_3;
                    var b_2 = Math.floor(c * r) + 1 + e, _2 = Math.min(Math.floor((c + 1) * r) + 1, i) + e, _b = t[p], y_2 = _b.x, v_2 = _b.y;
                    for (u = f = -1, s_38 = b_2; s_38 < _2; s_38++)
                        f = .5 * Math.abs((y_2 - n_28) * (t[s_38].y - v_2) - (y_2 - t[s_38].x) * (o_28 - v_2)), f > u && (u = f, d = t[s_38], g = s_38);
                    a[l++] = d, p = g;
                } return a[l++] = t[h], a; }(l, c, d, s, i);
                break;
            case "min-max":
                u = function (t, e, i, s) { var n, o, a, r, l, h, c, d, u, f, g = 0, p = 0; var m = [], x = e + i - 1, b = t[e].x, _ = t[x].x - b; for (n = e; n < e + i; ++n) {
                    o = t[n], a = (o.x - b) / _ * s, r = o.y;
                    var e_68 = 0 | a;
                    if (e_68 === l)
                        r < u ? (u = r, h = n) : r > f && (f = r, c = n), g = (p * g + o.x) / ++p;
                    else {
                        var i_49 = n - 1;
                        if (!$(h) && !$(c)) {
                            var e_69 = Math.min(h, c), s_39 = Math.max(h, c);
                            e_69 !== d && e_69 !== i_49 && m.push(__assign(__assign({}, t[e_69]), { x: g })), s_39 !== d && s_39 !== i_49 && m.push(__assign(__assign({}, t[s_39]), { x: g }));
                        }
                        n > 0 && i_49 !== d && m.push(t[i_49]), m.push(o), l = e_68, p = 0, u = f = r, h = c = d = n;
                    }
                } return m; }(l, c, d, s);
                break;
            default: throw new Error("Unsupported decimation algorithm '".concat(i.algorithm, "'"));
        } e._decimated = u; })); }, destroy: function (t) { ao(t); } };
    function lo(t, e, i) { var s = function (t) { var e = t.options, i = e.fill; var s = K(i && i.target, i); return void 0 === s && (s = !!e.backgroundColor), !1 !== s && null !== s && (!0 === s ? "origin" : s); }(t); if (U(s))
        return !isNaN(s.value) && s; var n = parseFloat(s); return X(n) && Math.floor(n) === n ? ("-" !== s[0] && "+" !== s[0] || (n = e + n), !(n === e || n < 0 || n >= i) && n) : ["origin", "start", "end", "stack", "shape"].indexOf(s) >= 0 && s; }
    var ho = /** @class */ (function () {
        function ho(t) {
            this.x = t.x, this.y = t.y, this.radius = t.radius;
        }
        ho.prototype.pathSegment = function (t, e, i) { var _b = this, s = _b.x, n = _b.y, o = _b.radius; return e = e || { start: 0, end: yt }, t.arc(s, n, o, e.end, e.start, !0), !i.bounds; };
        ho.prototype.interpolate = function (t) { var _b = this, e = _b.x, i = _b.y, s = _b.radius, n = t.angle; return { x: e + Math.cos(n) * s, y: i + Math.sin(n) * s, angle: n }; };
        return ho;
    }());
    function co(t) { return (t.scale || {}).getPointPositionForValue ? function (t) { var e = t.scale, i = t.fill, s = e.options, n = e.getLabels().length, o = [], a = s.reverse ? e.max : e.min, r = s.reverse ? e.min : e.max; var l, h, c; if (c = "start" === i ? a : "end" === i ? r : U(i) ? i.value : e.getBaseValue(), s.grid.circular)
        return h = e.getPointPositionForValue(0, a), new ho({ x: h.x, y: h.y, radius: e.getDistanceFromCenterForValue(c) }); for (l = 0; l < n; ++l)
        o.push(e.getPointPositionForValue(l, c)); return o; }(t) : function (t) { var _b = t.scale, e = _b === void 0 ? {} : _b, i = t.fill; var s, n = null; return "start" === i ? n = e.bottom : "end" === i ? n = e.top : U(i) ? n = e.getPixelForValue(i.value) : e.getBasePixel && (n = e.getBasePixel()), X(n) ? (s = e.isHorizontal(), { x: s ? n : null, y: s ? null : n }) : null; }(t); }
    function uo(t, e, i) { for (; e > t; e--) {
        var t_63 = i[e];
        if (!isNaN(t_63.x) && !isNaN(t_63.y))
            break;
    } return e; }
    function fo(t, e, i) { var s = []; for (var n_29 = 0; n_29 < i.length; n_29++) {
        var o_29 = i[n_29], _b = go(o_29, e, "x"), a_18 = _b.first, r_16 = _b.last, l_18 = _b.point;
        if (!(!l_18 || a_18 && r_16))
            if (a_18)
                s.unshift(l_18);
            else if (t.push(l_18), !r_16)
                break;
    } t.push.apply(t, s); }
    function go(t, e, i) { var s = t.interpolate(e, i); if (!s)
        return {}; var n = s[i], o = t.segments, a = t.points; var r = !1, l = !1; for (var t_64 = 0; t_64 < o.length; t_64++) {
        var e_70 = o[t_64], s_40 = a[e_70.start][i], h_19 = a[e_70.end][i];
        if (Yt(n, s_40, h_19)) {
            r = n === s_40, l = n === h_19;
            break;
        }
    } return { first: r, last: l, point: s }; }
    function po(t) { var e = t.chart, i = t.fill, s = t.line; if (X(i))
        return function (t, e) { var i = t.getDatasetMeta(e); return i && t.isDatasetVisible(e) ? i.dataset : null; }(e, i); if ("stack" === i)
        return function (t) { var e = t.scale, i = t.index, s = t.line, n = [], o = s.segments, a = s.points, r = function (t, e) { var i = [], s = t.getMatchingVisibleMetas("line"); for (var t_65 = 0; t_65 < s.length; t_65++) {
            var n_30 = s[t_65];
            if (n_30.index === e)
                break;
            n_30.hidden || i.unshift(n_30.dataset);
        } return i; }(e, i); r.push(mo({ x: null, y: e.bottom }, s)); for (var t_66 = 0; t_66 < o.length; t_66++) {
            var e_71 = o[t_66];
            for (var t_67 = e_71.start; t_67 <= e_71.end; t_67++)
                fo(n, a[t_67], r);
        } return new qn({ points: n, options: {} }); }(t); if ("shape" === i)
        return !0; var n = co(t); return n instanceof ho ? n : mo(n, s); }
    function mo(t, e) { var i = [], s = !1; return Y(t) ? (s = !0, i = t) : i = function (t, e) { var _b = t || {}, _c = _b.x, i = _c === void 0 ? null : _c, _d = _b.y, s = _d === void 0 ? null : _d, n = e.points, o = []; return e.segments.forEach((function (_b) {
        var t = _b.start, e = _b.end;
        e = uo(t, e, n);
        var a = n[t], r = n[e];
        null !== s ? (o.push({ x: a.x, y: s }), o.push({ x: r.x, y: s })) : null !== i && (o.push({ x: i, y: a.y }), o.push({ x: i, y: r.y }));
    })), o; }(t, e), i.length ? new qn({ points: i, options: { tension: 0 }, _loop: s, _fullLoop: s }) : null; }
    function xo(t, e, i) { var s = t[e].fill; var n = [e]; var o; if (!i)
        return s; for (; !1 !== s && -1 === n.indexOf(s);) {
        if (!X(s))
            return s;
        if (o = t[s], !o)
            return !1;
        if (o.visible)
            return s;
        n.push(s), s = o.fill;
    } return !1; }
    function bo(t, e, i) { t.beginPath(), e.path(t), t.lineTo(e.last().x, i), t.lineTo(e.first().x, i), t.closePath(), t.clip(); }
    function _o(t, e, i, s) { if (s)
        return; var n = e[t], o = i[t]; return "angle" === t && (n = Nt(n), o = Nt(o)), { property: t, start: n, end: o }; }
    function yo(t, e, i, s) { return t && e ? s(t[i], e[i]) : t ? t[i] : e ? e[i] : 0; }
    function vo(t, e, i) { var _b = e.chart.chartArea, s = _b.top, n = _b.bottom, _c = i || {}, o = _c.property, a = _c.start, r = _c.end; "x" === o && (t.beginPath(), t.rect(a, s, r - a, n - s), t.clip()); }
    function wo(t, e, i, s) { var n = e.interpolate(i, s); n && t.lineTo(n.x, n.y); }
    function Mo(t, e) { var i = e.line, s = e.target, n = e.property, o = e.color, a = e.scale, r = function (t, e, i) {
        var _b, _c;
        var s = t.segments, n = t.points, o = e.points, a = [];
        for (var _d = 0, s_41 = s; _d < s_41.length; _d++) {
            var t_68 = s_41[_d];
            var s_42 = t_68.start, r_19 = t_68.end;
            r_19 = uo(s_42, r_19, n);
            var l_19 = _o(i, n[s_42], n[r_19], t_68.loop);
            if (!e.segments) {
                a.push({ source: t_68, target: l_19, start: n[s_42], end: n[r_19] });
                continue;
            }
            var h_21 = Wi(e, l_19);
            for (var _f = 0, h_20 = h_21; _f < h_20.length; _f++) {
                var e_72 = h_20[_f];
                var s_43 = _o(i, o[e_72.start], o[e_72.end], e_72.loop), r_20 = Vi(t_68, n, s_43);
                for (var _g = 0, r_18 = r_20; _g < r_18.length; _g++) {
                    var t_69 = r_18[_g];
                    a.push({ source: t_69, target: e_72, start: (_b = {}, _b[i] = yo(l_19, s_43, "start", Math.max), _b), end: (_c = {}, _c[i] = yo(l_19, s_43, "end", Math.min), _c) });
                }
            }
        }
        return a;
    }(i, s, n); for (var _b = 0, r_17 = r; _b < r_17.length; _b++) {
        var _c = r_17[_b], e_73 = _c.source, l_20 = _c.target, h_22 = _c.start, c_12 = _c.end;
        var _d = e_73.style, _f = _d === void 0 ? {} : _d, _g = _f.backgroundColor, r_21 = _g === void 0 ? o : _g, d_11 = !0 !== s;
        t.save(), t.fillStyle = r_21, vo(t, a, d_11 && _o(n, h_22, c_12)), t.beginPath();
        var u_6 = !!i.pathSegment(t, e_73);
        var f_6 = void 0;
        if (d_11) {
            u_6 ? t.closePath() : wo(t, s, c_12, n);
            var e_74 = !!s.pathSegment(t, l_20, { move: u_6, reverse: !0 });
            f_6 = u_6 && e_74, f_6 || wo(t, s, h_22, n);
        }
        t.closePath(), t.fill(f_6 ? "evenodd" : "nonzero"), t.restore();
    } }
    function ko(t, e, i) { var s = po(e), n = e.line, o = e.scale, a = e.axis, r = n.options, l = r.fill, h = r.backgroundColor, _b = l || {}, _c = _b.above, c = _c === void 0 ? h : _c, _d = _b.below, d = _d === void 0 ? h : _d; s && n.points.length && (Qt(t, i), function (t, e) { var i = e.line, s = e.target, n = e.above, o = e.below, a = e.area, r = e.scale, l = i._loop ? "angle" : e.axis; t.save(), "x" === l && o !== n && (bo(t, s, a.top), Mo(t, { line: i, target: s, color: n, scale: r, property: l }), t.restore(), t.save(), bo(t, s, a.bottom)), Mo(t, { line: i, target: s, color: o, scale: r, property: l }), t.restore(); }(t, { line: n, target: s, above: c, below: d, area: i, scale: o, axis: a }), te(t)); }
    var So = { id: "filler", afterDatasetsUpdate: function (t, e, i) { var s = (t.data.datasets || []).length, n = []; var o, a, r, l; for (a = 0; a < s; ++a)
            o = t.getDatasetMeta(a), r = o.dataset, l = null, r && r.options && r instanceof qn && (l = { visible: t.isDatasetVisible(a), index: a, fill: lo(r, a, s), chart: t, axis: o.controller.options.indexAxis, scale: o.vScale, line: r }), o.$filler = l, n.push(l); for (a = 0; a < s; ++a)
            l = n[a], l && !1 !== l.fill && (l.fill = xo(n, a, i.propagate)); }, beforeDraw: function (t, e, i) { var s = "beforeDraw" === i.drawTime, n = t.getSortedVisibleDatasetMetas(), o = t.chartArea; for (var e_75 = n.length - 1; e_75 >= 0; --e_75) {
            var i_50 = n[e_75].$filler;
            i_50 && (i_50.line.updateControlPoints(o, i_50.axis), s && ko(t.ctx, i_50, o));
        } }, beforeDatasetsDraw: function (t, e, i) { if ("beforeDatasetsDraw" !== i.drawTime)
            return; var s = t.getSortedVisibleDatasetMetas(); for (var e_76 = s.length - 1; e_76 >= 0; --e_76) {
            var i_51 = s[e_76].$filler;
            i_51 && ko(t.ctx, i_51, t.chartArea);
        } }, beforeDatasetDraw: function (t, e, i) { var s = e.meta.$filler; s && !1 !== s.fill && "beforeDatasetDraw" === i.drawTime && ko(t.ctx, s, t.chartArea); }, defaults: { propagate: !0, drawTime: "beforeDatasetDraw" } };
    var Po = function (t, e) { var _b = t.boxHeight, i = _b === void 0 ? e : _b, _c = t.boxWidth, s = _c === void 0 ? e : _c; return t.usePointStyle && (i = Math.min(i, e), s = Math.min(s, e)), { boxWidth: s, boxHeight: i, itemHeight: Math.max(e, i) }; };
    var Do = /** @class */ (function (_super) {
        __extends(Do, _super);
        function Do(t) {
            var _this = this;
            _this = _super.call(this) || this, _this._added = !1, _this.legendHitBoxes = [], _this._hoveredItem = null, _this.doughnutMode = !1, _this.chart = t.chart, _this.options = t.options, _this.ctx = t.ctx, _this.legendItems = void 0, _this.columnSizes = void 0, _this.lineWidths = void 0, _this.maxHeight = void 0, _this.maxWidth = void 0, _this.top = void 0, _this.bottom = void 0, _this.left = void 0, _this.right = void 0, _this.height = void 0, _this.width = void 0, _this._margins = void 0, _this.position = void 0, _this.weight = void 0, _this.fullSize = void 0;
            return _this;
        }
        Do.prototype.update = function (t, e, i) { this.maxWidth = t, this.maxHeight = e, this._margins = i, this.setDimensions(), this.buildLabels(), this.fit(); };
        Do.prototype.setDimensions = function () { this.isHorizontal() ? (this.width = this.maxWidth, this.left = this._margins.left, this.right = this.width) : (this.height = this.maxHeight, this.top = this._margins.top, this.bottom = this.height); };
        Do.prototype.buildLabels = function () {
            var _this = this;
            var t = this.options.labels || {};
            var e = J(t.generateLabels, [this.chart], this) || [];
            t.filter && (e = e.filter((function (e) { return t.filter(e, _this.chart.data); }))), t.sort && (e = e.sort((function (e, i) { return t.sort(e, i, _this.chart.data); }))), this.options.reverse && e.reverse(), this.legendItems = e;
        };
        Do.prototype.fit = function () { var _b = this, t = _b.options, e = _b.ctx; if (!t.display)
            return void (this.width = this.height = 0); var i = t.labels, s = He(i.font), n = s.size, o = this._computeTitleHeight(), _c = Po(i, n), a = _c.boxWidth, r = _c.itemHeight; var l, h; e.font = s.string, this.isHorizontal() ? (l = this.maxWidth, h = this._fitRows(o, n, a, r) + 10) : (h = this.maxHeight, l = this._fitCols(o, n, a, r) + 10), this.width = Math.min(l, t.maxWidth || this.maxWidth), this.height = Math.min(h, t.maxHeight || this.maxHeight); };
        Do.prototype._fitRows = function (t, e, i, s) { var _b = this, n = _b.ctx, o = _b.maxWidth, a = _b.options.labels.padding, r = this.legendHitBoxes = [], l = this.lineWidths = [0], h = s + a; var c = t; n.textAlign = "left", n.textBaseline = "middle"; var d = -1, u = -h; return this.legendItems.forEach((function (t, f) { var g = i + e / 2 + n.measureText(t.text).width; (0 === f || l[l.length - 1] + g + 2 * a > o) && (c += h, l[l.length - (f > 0 ? 0 : 1)] = 0, u += h, d++), r[f] = { left: 0, top: u, row: d, width: g, height: s }, l[l.length - 1] += g + a; })), c; };
        Do.prototype._fitCols = function (t, e, i, s) { var _b = this, n = _b.ctx, o = _b.maxHeight, a = _b.options.labels.padding, r = this.legendHitBoxes = [], l = this.columnSizes = [], h = o - t; var c = a, d = 0, u = 0, f = 0, g = 0; return this.legendItems.forEach((function (t, o) { var p = i + e / 2 + n.measureText(t.text).width; o > 0 && u + s + 2 * a > h && (c += d + a, l.push({ width: d, height: u }), f += d + a, g++, d = u = 0), r[o] = { left: f, top: u, col: g, width: p, height: s }, d = Math.max(d, p), u += s + a; })), c += d, l.push({ width: d, height: u }), c; };
        Do.prototype.adjustHitBoxes = function () { if (!this.options.display)
            return; var t = this._computeTitleHeight(), _b = this, e = _b.legendHitBoxes, _c = _b.options, i = _c.align, s = _c.labels.padding, o = _c.rtl, a = Ei(o, this.left, this.width); if (this.isHorizontal()) {
            var o_30 = 0, r_22 = n(i, this.left + s, this.right - this.lineWidths[o_30]);
            for (var _d = 0, e_77 = e; _d < e_77.length; _d++) {
                var l_21 = e_77[_d];
                o_30 !== l_21.row && (o_30 = l_21.row, r_22 = n(i, this.left + s, this.right - this.lineWidths[o_30])), l_21.top += this.top + t + s, l_21.left = a.leftForLtr(a.x(r_22), l_21.width), r_22 += l_21.width + s;
            }
        }
        else {
            var o_31 = 0, r_23 = n(i, this.top + t + s, this.bottom - this.columnSizes[o_31].height);
            for (var _f = 0, e_78 = e; _f < e_78.length; _f++) {
                var l_22 = e_78[_f];
                l_22.col !== o_31 && (o_31 = l_22.col, r_23 = n(i, this.top + t + s, this.bottom - this.columnSizes[o_31].height)), l_22.top = r_23, l_22.left += this.left + s, l_22.left = a.leftForLtr(a.x(l_22.left), l_22.width), r_23 += l_22.height + s;
            }
        } };
        Do.prototype.isHorizontal = function () { return "top" === this.options.position || "bottom" === this.options.position; };
        Do.prototype.draw = function () { if (this.options.display) {
            var t_70 = this.ctx;
            Qt(t_70, this), this._draw(), te(t_70);
        } };
        Do.prototype._draw = function () {
            var _this = this;
            var _b = this, t = _b.options, e = _b.columnSizes, i = _b.lineWidths, s = _b.ctx, a = t.align, r = t.labels, l = bt.color, h = Ei(t.rtl, this.left, this.width), c = He(r.font), d = r.color, u = r.padding, f = c.size, g = f / 2;
            var p;
            this.drawTitle(), s.textAlign = h.textAlign("left"), s.textBaseline = "middle", s.lineWidth = .5, s.font = c.string;
            var _c = Po(r, f), m = _c.boxWidth, x = _c.boxHeight, b = _c.itemHeight, _ = this.isHorizontal(), y = this._computeTitleHeight();
            p = _ ? { x: n(a, this.left + u, this.right - i[0]), y: this.top + u + y, line: 0 } : { x: this.left + u, y: n(a, this.top + y + u, this.bottom - e[0].height), line: 0 }, Ii(this.ctx, t.textDirection);
            var v = b + u;
            this.legendItems.forEach((function (w, M) { s.strokeStyle = w.fontColor || d, s.fillStyle = w.fontColor || d; var k = s.measureText(w.text).width, S = h.textAlign(w.textAlign || (w.textAlign = r.textAlign)), P = m + g + k; var D = p.x, C = p.y; h.setWidth(_this.width), _ ? M > 0 && D + P + u > _this.right && (C = p.y += v, p.line++, D = p.x = n(a, _this.left + u, _this.right - i[p.line])) : M > 0 && C + v > _this.bottom && (D = p.x = D + e[p.line].width + u, p.line++, C = p.y = n(a, _this.top + y + u, _this.bottom - e[p.line].height)); !function (t, e, i) { if (isNaN(m) || m <= 0 || isNaN(x) || x < 0)
                return; s.save(); var n = K(i.lineWidth, 1); if (s.fillStyle = K(i.fillStyle, l), s.lineCap = K(i.lineCap, "butt"), s.lineDashOffset = K(i.lineDashOffset, 0), s.lineJoin = K(i.lineJoin, "miter"), s.lineWidth = n, s.strokeStyle = K(i.strokeStyle, l), s.setLineDash(K(i.lineDash, [])), r.usePointStyle) {
                var o_32 = { radius: m * Math.SQRT2 / 2, pointStyle: i.pointStyle, rotation: i.rotation, borderWidth: n }, a_19 = h.xPlus(t, m / 2);
                Zt(s, o_32, a_19, e + g);
            }
            else {
                var o_33 = e + Math.max((f - x) / 2, 0), a_20 = h.leftForLtr(t, m), r_24 = We(i.borderRadius);
                s.beginPath(), Object.values(r_24).some((function (t) { return 0 !== t; })) ? oe(s, { x: a_20, y: o_33, w: m, h: x, radius: r_24 }) : s.rect(a_20, o_33, m, x), s.fill(), 0 !== n && s.stroke();
            } s.restore(); }(h.x(D), C, w), D = o(S, D + m + g, _ ? D + P : _this.right, t.rtl), function (t, e, i) { se(s, i.text, t, e + b / 2, c, { strikethrough: i.hidden, textAlign: h.textAlign(i.textAlign) }); }(h.x(D), C, w), _ ? p.x += P + u : p.y += v; })), zi(this.ctx, t.textDirection);
        };
        Do.prototype.drawTitle = function () { var t = this.options, e = t.title, i = He(e.font), o = Ne(e.padding); if (!e.display)
            return; var a = Ei(t.rtl, this.left, this.width), r = this.ctx, l = e.position, h = i.size / 2, c = o.top + h; var d, u = this.left, f = this.width; if (this.isHorizontal())
            f = Math.max.apply(Math, this.lineWidths), d = this.top + c, u = n(t.align, u, this.right - f);
        else {
            var e_79 = this.columnSizes.reduce((function (t, e) { return Math.max(t, e.height); }), 0);
            d = c + n(t.align, this.top, this.bottom - e_79 - t.labels.padding - this._computeTitleHeight());
        } var g = n(l, u, u + f); r.textAlign = a.textAlign(s(l)), r.textBaseline = "middle", r.strokeStyle = e.color, r.fillStyle = e.color, r.font = i.string, se(r, e.text, g, d, i); };
        Do.prototype._computeTitleHeight = function () { var t = this.options.title, e = He(t.font), i = Ne(t.padding); return t.display ? e.lineHeight + i.height : 0; };
        Do.prototype._getLegendItemAt = function (t, e) { var i, s, n; if (Yt(t, this.left, this.right) && Yt(e, this.top, this.bottom))
            for (n = this.legendHitBoxes, i = 0; i < n.length; ++i)
                if (s = n[i], Yt(t, s.left, s.left + s.width) && Yt(e, s.top, s.top + s.height))
                    return this.legendItems[i]; return null; };
        Do.prototype.handleEvent = function (t) { var e = this.options; if (!function (t, e) { if ("mousemove" === t && (e.onHover || e.onLeave))
            return !0; if (e.onClick && ("click" === t || "mouseup" === t))
            return !0; return !1; }(t.type, e))
            return; var i = this._getLegendItemAt(t.x, t.y); if ("mousemove" === t.type) {
            var o_34 = this._hoveredItem, a_21 = (n = i, null !== (s = o_34) && null !== n && s.datasetIndex === n.datasetIndex && s.index === n.index);
            o_34 && !a_21 && J(e.onLeave, [t, o_34, this], this), this._hoveredItem = i, i && !a_21 && J(e.onHover, [t, i, this], this);
        }
        else
            i && J(e.onClick, [t, i, this], this); var s, n; };
        return Do;
    }(Ds));
    var Co = { id: "legend", _element: Do, start: function (t, e, i) { var s = t.legend = new Do({ ctx: t.ctx, options: i, chart: t }); ni.configure(t, s, i), ni.addBox(t, s); }, stop: function (t) { ni.removeBox(t, t.legend), delete t.legend; }, beforeUpdate: function (t, e, i) { var s = t.legend; ni.configure(t, s, i), s.options = i; }, afterUpdate: function (t) { var e = t.legend; e.buildLabels(), e.adjustHitBoxes(); }, afterEvent: function (t, e) { e.replay || t.legend.handleEvent(e.event); }, defaults: { display: !0, position: "top", align: "center", fullSize: !0, reverse: !1, weight: 1e3, onClick: function (t, e, i) { var s = e.datasetIndex, n = i.chart; n.isDatasetVisible(s) ? (n.hide(s), e.hidden = !0) : (n.show(s), e.hidden = !1); }, onHover: null, onLeave: null, labels: { color: function (t) { return t.chart.options.color; }, boxWidth: 40, padding: 10, generateLabels: function (t) { var e = t.data.datasets, _b = t.legend.options.labels, i = _b.usePointStyle, s = _b.pointStyle, n = _b.textAlign, o = _b.color; return t._getSortedDatasetMetas().map((function (t) { var a = t.controller.getStyle(i ? 0 : void 0), r = Ne(a.borderWidth); return { text: e[t.index].label, fillStyle: a.backgroundColor, fontColor: o, hidden: !t.visible, lineCap: a.borderCapStyle, lineDash: a.borderDash, lineDashOffset: a.borderDashOffset, lineJoin: a.borderJoinStyle, lineWidth: (r.width + r.height) / 4, strokeStyle: a.borderColor, pointStyle: s || a.pointStyle, rotation: a.rotation, textAlign: n || a.textAlign, borderRadius: 0, datasetIndex: t.index }; }), this); } }, title: { color: function (t) { return t.chart.options.color; }, display: !1, position: "center", text: "" } }, descriptors: { _scriptable: function (t) { return !t.startsWith("on"); }, labels: { _scriptable: function (t) { return !["generateLabels", "filter", "sort"].includes(t); } } } };
    var Oo = /** @class */ (function (_super) {
        __extends(Oo, _super);
        function Oo(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.chart = t.chart, _this.options = t.options, _this.ctx = t.ctx, _this._padding = void 0, _this.top = void 0, _this.bottom = void 0, _this.left = void 0, _this.right = void 0, _this.width = void 0, _this.height = void 0, _this.position = void 0, _this.weight = void 0, _this.fullSize = void 0;
            return _this;
        }
        Oo.prototype.update = function (t, e) { var i = this.options; if (this.left = 0, this.top = 0, !i.display)
            return void (this.width = this.height = this.right = this.bottom = 0); this.width = this.right = t, this.height = this.bottom = e; var s = Y(i.text) ? i.text.length : 1; this._padding = Ne(i.padding); var n = s * He(i.font).lineHeight + this._padding.height; this.isHorizontal() ? this.height = n : this.width = n; };
        Oo.prototype.isHorizontal = function () { var t = this.options.position; return "top" === t || "bottom" === t; };
        Oo.prototype._drawArgs = function (t) { var _b = this, e = _b.top, i = _b.left, s = _b.bottom, o = _b.right, a = _b.options, r = a.align; var l, h, c, d = 0; return this.isHorizontal() ? (h = n(r, i, o), c = e + t, l = o - i) : ("left" === a.position ? (h = i + t, c = n(r, s, e), d = -.5 * _t) : (h = o - t, c = n(r, e, s), d = .5 * _t), l = s - e), { titleX: h, titleY: c, maxWidth: l, rotation: d }; };
        Oo.prototype.draw = function () { var t = this.ctx, e = this.options; if (!e.display)
            return; var i = He(e.font), n = i.lineHeight / 2 + this._padding.top, _b = this._drawArgs(n), o = _b.titleX, a = _b.titleY, r = _b.maxWidth, l = _b.rotation; se(t, e.text, 0, 0, i, { color: e.color, maxWidth: r, rotation: l, textAlign: s(e.align), textBaseline: "middle", translation: [o, a] }); };
        return Oo;
    }(Ds));
    var Ao = { id: "title", _element: Oo, start: function (t, e, i) { !function (t, e) { var i = new Oo({ ctx: t.ctx, options: e, chart: t }); ni.configure(t, i, e), ni.addBox(t, i), t.titleBlock = i; }(t, i); }, stop: function (t) { var e = t.titleBlock; ni.removeBox(t, e), delete t.titleBlock; }, beforeUpdate: function (t, e, i) { var s = t.titleBlock; ni.configure(t, s, i), s.options = i; }, defaults: { align: "center", display: !1, font: { weight: "bold" }, fullSize: !0, padding: 10, position: "top", text: "", weight: 2e3 }, defaultRoutes: { color: "color" }, descriptors: { _scriptable: !0, _indexable: !1 } };
    var To = new WeakMap;
    var Lo = { id: "subtitle", start: function (t, e, i) { var s = new Oo({ ctx: t.ctx, options: i, chart: t }); ni.configure(t, s, i), ni.addBox(t, s), To.set(t, s); }, stop: function (t) { ni.removeBox(t, To.get(t)), To.delete(t); }, beforeUpdate: function (t, e, i) { var s = To.get(t); ni.configure(t, s, i), s.options = i; }, defaults: { align: "center", display: !1, font: { weight: "normal" }, fullSize: !0, padding: 0, position: "top", text: "", weight: 1500 }, defaultRoutes: { color: "color" }, descriptors: { _scriptable: !0, _indexable: !1 } };
    var Ro = { average: function (t) { if (!t.length)
            return !1; var e, i, s = 0, n = 0, o = 0; for (e = 0, i = t.length; e < i; ++e) {
            var i_52 = t[e].element;
            if (i_52 && i_52.hasValue()) {
                var t_71 = i_52.tooltipPosition();
                s += t_71.x, n += t_71.y, ++o;
            }
        } return { x: s / o, y: n / o }; }, nearest: function (t, e) { if (!t.length)
            return !1; var i, s, n, o = e.x, a = e.y, r = Number.POSITIVE_INFINITY; for (i = 0, s = t.length; i < s; ++i) {
            var s_44 = t[i].element;
            if (s_44 && s_44.hasValue()) {
                var t_72 = Vt(e, s_44.getCenterPoint());
                t_72 < r && (r = t_72, n = s_44);
            }
        } if (n) {
            var t_73 = n.tooltipPosition();
            o = t_73.x, a = t_73.y;
        } return { x: o, y: a }; } };
    function Eo(t, e) { return e && (Y(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t; }
    function Io(t) { return ("string" == typeof t || t instanceof String) && t.indexOf("\n") > -1 ? t.split("\n") : t; }
    function zo(t, e) { var i = e.element, s = e.datasetIndex, n = e.index, o = t.getDatasetMeta(s).controller, _b = o.getLabelAndValue(n), a = _b.label, r = _b.value; return { chart: t, label: a, parsed: o.getParsed(n), raw: t.data.datasets[s].data[n], formattedValue: r, dataset: o.getDataset(), dataIndex: n, datasetIndex: s, element: i }; }
    function Fo(t, e) { var i = t.chart.ctx, s = t.body, n = t.footer, o = t.title, a = e.boxWidth, r = e.boxHeight, l = He(e.bodyFont), h = He(e.titleFont), c = He(e.footerFont), d = o.length, u = n.length, f = s.length, g = Ne(e.padding); var p = g.height, m = 0, x = s.reduce((function (t, e) { return t + e.before.length + e.lines.length + e.after.length; }), 0); if (x += t.beforeBody.length + t.afterBody.length, d && (p += d * h.lineHeight + (d - 1) * e.titleSpacing + e.titleMarginBottom), x) {
        p += f * (e.displayColors ? Math.max(r, l.lineHeight) : l.lineHeight) + (x - f) * l.lineHeight + (x - 1) * e.bodySpacing;
    } u && (p += e.footerMarginTop + u * c.lineHeight + (u - 1) * e.footerSpacing); var b = 0; var _ = function (t) { m = Math.max(m, i.measureText(t).width + b); }; return i.save(), i.font = h.string, Q(t.title, _), i.font = l.string, Q(t.beforeBody.concat(t.afterBody), _), b = e.displayColors ? a + 2 + e.boxPadding : 0, Q(s, (function (t) { Q(t.before, _), Q(t.lines, _), Q(t.after, _); })), b = 0, i.font = c.string, Q(t.footer, _), i.restore(), m += g.width, { width: m, height: p }; }
    function Bo(t, e, i, s) { var n = i.x, o = i.width, a = t.width, _b = t.chartArea, r = _b.left, l = _b.right; var h = "center"; return "center" === s ? h = n <= (r + l) / 2 ? "left" : "right" : n <= o / 2 ? h = "left" : n >= a - o / 2 && (h = "right"), function (t, e, i, s) { var n = s.x, o = s.width, a = i.caretSize + i.caretPadding; return "left" === t && n + o + a > e.width || "right" === t && n - o - a < 0 || void 0; }(h, t, e, i) && (h = "center"), h; }
    function Vo(t, e, i) { var s = i.yAlign || e.yAlign || function (t, e) { var i = e.y, s = e.height; return i < s / 2 ? "top" : i > t.height - s / 2 ? "bottom" : "center"; }(t, i); return { xAlign: i.xAlign || e.xAlign || Bo(t, e, i, s), yAlign: s }; }
    function Wo(t, e, i, s) { var n = t.caretSize, o = t.caretPadding, a = t.cornerRadius, r = i.xAlign, l = i.yAlign, h = n + o, _b = We(a), c = _b.topLeft, d = _b.topRight, u = _b.bottomLeft, f = _b.bottomRight; var g = function (t, e) { var i = t.x, s = t.width; return "right" === e ? i -= s : "center" === e && (i -= s / 2), i; }(e, r); var p = function (t, e, i) { var s = t.y, n = t.height; return "top" === e ? s += i : s -= "bottom" === e ? n + i : n / 2, s; }(e, l, h); return "center" === l ? "left" === r ? g += h : "right" === r && (g -= h) : "left" === r ? g -= Math.max(c, u) + n : "right" === r && (g += Math.max(d, f) + n), { x: jt(g, 0, s.width - e.width), y: jt(p, 0, s.height - e.height) }; }
    function No(t, e, i) { var s = Ne(i.padding); return "center" === e ? t.x + t.width / 2 : "right" === e ? t.x + t.width - s.right : t.x + s.left; }
    function Ho(t) { return Eo([], Io(t)); }
    function jo(t, e) { var i = e && e.dataset && e.dataset.tooltip && e.dataset.tooltip.callbacks; return i ? t.override(i) : t; }
    var $o = /** @class */ (function (_super) {
        __extends($o, _super);
        function $o(t) {
            var _this = this;
            _this = _super.call(this) || this, _this.opacity = 0, _this._active = [], _this._eventPosition = void 0, _this._size = void 0, _this._cachedAnimations = void 0, _this._tooltipItems = [], _this.$animations = void 0, _this.$context = void 0, _this.chart = t.chart || t._chart, _this._chart = _this.chart, _this.options = t.options, _this.dataPoints = void 0, _this.title = void 0, _this.beforeBody = void 0, _this.body = void 0, _this.afterBody = void 0, _this.footer = void 0, _this.xAlign = void 0, _this.yAlign = void 0, _this.x = void 0, _this.y = void 0, _this.height = void 0, _this.width = void 0, _this.caretX = void 0, _this.caretY = void 0, _this.labelColors = void 0, _this.labelPointStyles = void 0, _this.labelTextColors = void 0;
            return _this;
        }
        $o.prototype.initialize = function (t) { this.options = t, this._cachedAnimations = void 0, this.$context = void 0; };
        $o.prototype._resolveAnimations = function () { var t = this._cachedAnimations; if (t)
            return t; var e = this.chart, i = this.options.setContext(this.getContext()), s = i.enabled && e.options.animation && i.animations, n = new gs(this.chart, s); return s._cacheable && (this._cachedAnimations = Object.freeze(n)), n; };
        $o.prototype.getContext = function () { return this.$context || (this.$context = (t = this.chart.getContext(), e = this, i = this._tooltipItems, Ye(t, { tooltip: e, tooltipItems: i, type: "tooltip" }))); var t, e, i; };
        $o.prototype.getTitle = function (t, e) { var i = e.callbacks, s = i.beforeTitle.apply(this, [t]), n = i.title.apply(this, [t]), o = i.afterTitle.apply(this, [t]); var a = []; return a = Eo(a, Io(s)), a = Eo(a, Io(n)), a = Eo(a, Io(o)), a; };
        $o.prototype.getBeforeBody = function (t, e) { return Ho(e.callbacks.beforeBody.apply(this, [t])); };
        $o.prototype.getBody = function (t, e) {
            var _this = this;
            var i = e.callbacks, s = [];
            return Q(t, (function (t) { var e = { before: [], lines: [], after: [] }, n = jo(i, t); Eo(e.before, Io(n.beforeLabel.call(_this, t))), Eo(e.lines, n.label.call(_this, t)), Eo(e.after, Io(n.afterLabel.call(_this, t))), s.push(e); })), s;
        };
        $o.prototype.getAfterBody = function (t, e) { return Ho(e.callbacks.afterBody.apply(this, [t])); };
        $o.prototype.getFooter = function (t, e) { var i = e.callbacks, s = i.beforeFooter.apply(this, [t]), n = i.footer.apply(this, [t]), o = i.afterFooter.apply(this, [t]); var a = []; return a = Eo(a, Io(s)), a = Eo(a, Io(n)), a = Eo(a, Io(o)), a; };
        $o.prototype._createItems = function (t) {
            var _this = this;
            var e = this._active, i = this.chart.data, s = [], n = [], o = [];
            var a, r, l = [];
            for (a = 0, r = e.length; a < r; ++a)
                l.push(zo(this.chart, e[a]));
            return t.filter && (l = l.filter((function (e, s, n) { return t.filter(e, s, n, i); }))), t.itemSort && (l = l.sort((function (e, s) { return t.itemSort(e, s, i); }))), Q(l, (function (e) { var i = jo(t.callbacks, e); s.push(i.labelColor.call(_this, e)), n.push(i.labelPointStyle.call(_this, e)), o.push(i.labelTextColor.call(_this, e)); })), this.labelColors = s, this.labelPointStyles = n, this.labelTextColors = o, this.dataPoints = l, l;
        };
        $o.prototype.update = function (t, e) { var i = this.options.setContext(this.getContext()), s = this._active; var n, o = []; if (s.length) {
            var t_74 = Ro[i.position].call(this, s, this._eventPosition);
            o = this._createItems(i), this.title = this.getTitle(o, i), this.beforeBody = this.getBeforeBody(o, i), this.body = this.getBody(o, i), this.afterBody = this.getAfterBody(o, i), this.footer = this.getFooter(o, i);
            var e_80 = this._size = Fo(this, i), a_22 = Object.assign({}, t_74, e_80), r_25 = Vo(this.chart, i, a_22), l_23 = Wo(i, a_22, r_25, this.chart);
            this.xAlign = r_25.xAlign, this.yAlign = r_25.yAlign, n = { opacity: 1, x: l_23.x, y: l_23.y, width: e_80.width, height: e_80.height, caretX: t_74.x, caretY: t_74.y };
        }
        else
            0 !== this.opacity && (n = { opacity: 0 }); this._tooltipItems = o, this.$context = void 0, n && this._resolveAnimations().update(this, n), t && i.external && i.external.call(this, { chart: this.chart, tooltip: this, replay: e }); };
        $o.prototype.drawCaret = function (t, e, i, s) { var n = this.getCaretPosition(t, i, s); e.lineTo(n.x1, n.y1), e.lineTo(n.x2, n.y2), e.lineTo(n.x3, n.y3); };
        $o.prototype.getCaretPosition = function (t, e, i) { var _b = this, s = _b.xAlign, n = _b.yAlign, o = i.caretSize, a = i.cornerRadius, _c = We(a), r = _c.topLeft, l = _c.topRight, h = _c.bottomLeft, c = _c.bottomRight, d = t.x, u = t.y, f = e.width, g = e.height; var p, m, x, b, _, y; return "center" === n ? (_ = u + g / 2, "left" === s ? (p = d, m = p - o, b = _ + o, y = _ - o) : (p = d + f, m = p + o, b = _ - o, y = _ + o), x = p) : (m = "left" === s ? d + Math.max(r, h) + o : "right" === s ? d + f - Math.max(l, c) - o : this.caretX, "top" === n ? (b = u, _ = b - o, p = m - o, x = m + o) : (b = u + g, _ = b + o, p = m + o, x = m - o), y = b), { x1: p, x2: m, x3: x, y1: b, y2: _, y3: y }; };
        $o.prototype.drawTitle = function (t, e, i) { var s = this.title, n = s.length; var o, a, r; if (n) {
            var l_24 = Ei(i.rtl, this.x, this.width);
            for (t.x = No(this, i.titleAlign, i), e.textAlign = l_24.textAlign(i.titleAlign), e.textBaseline = "middle", o = He(i.titleFont), a = i.titleSpacing, e.fillStyle = i.titleColor, e.font = o.string, r = 0; r < n; ++r)
                e.fillText(s[r], l_24.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + a, r + 1 === n && (t.y += i.titleMarginBottom - a);
        } };
        $o.prototype._drawColorBox = function (t, e, i, s, n) { var o = this.labelColors[i], a = this.labelPointStyles[i], r = n.boxHeight, l = n.boxWidth, h = n.boxPadding, c = He(n.bodyFont), d = No(this, "left", n), u = s.x(d), f = r < c.lineHeight ? (c.lineHeight - r) / 2 : 0, g = e.y + f; if (n.usePointStyle) {
            var e_81 = { radius: Math.min(l, r) / 2, pointStyle: a.pointStyle, rotation: a.rotation, borderWidth: 1 }, i_53 = s.leftForLtr(u, l) + l / 2, h_23 = g + r / 2;
            t.strokeStyle = n.multiKeyBackground, t.fillStyle = n.multiKeyBackground, Zt(t, e_81, i_53, h_23), t.strokeStyle = o.borderColor, t.fillStyle = o.backgroundColor, Zt(t, e_81, i_53, h_23);
        }
        else {
            t.lineWidth = o.borderWidth || 1, t.strokeStyle = o.borderColor, t.setLineDash(o.borderDash || []), t.lineDashOffset = o.borderDashOffset || 0;
            var e_82 = s.leftForLtr(u, l - h), i_54 = s.leftForLtr(s.xPlus(u, 1), l - h - 2), a_23 = We(o.borderRadius);
            Object.values(a_23).some((function (t) { return 0 !== t; })) ? (t.beginPath(), t.fillStyle = n.multiKeyBackground, oe(t, { x: e_82, y: g, w: l, h: r, radius: a_23 }), t.fill(), t.stroke(), t.fillStyle = o.backgroundColor, t.beginPath(), oe(t, { x: i_54, y: g + 1, w: l - 2, h: r - 2, radius: a_23 }), t.fill()) : (t.fillStyle = n.multiKeyBackground, t.fillRect(e_82, g, l, r), t.strokeRect(e_82, g, l, r), t.fillStyle = o.backgroundColor, t.fillRect(i_54, g + 1, l - 2, r - 2));
        } t.fillStyle = this.labelTextColors[i]; };
        $o.prototype.drawBody = function (t, e, i) { var s = this.body, n = i.bodySpacing, o = i.bodyAlign, a = i.displayColors, r = i.boxHeight, l = i.boxWidth, h = i.boxPadding, c = He(i.bodyFont); var d = c.lineHeight, u = 0; var f = Ei(i.rtl, this.x, this.width), g = function (i) { e.fillText(i, f.x(t.x + u), t.y + d / 2), t.y += d + n; }, p = f.textAlign(o); var m, x, b, _, y, v, w; for (e.textAlign = o, e.textBaseline = "middle", e.font = c.string, t.x = No(this, p, i), e.fillStyle = i.bodyColor, Q(this.beforeBody, g), u = a && "right" !== p ? "center" === o ? l / 2 + h : l + 2 + h : 0, _ = 0, v = s.length; _ < v; ++_) {
            for (m = s[_], x = this.labelTextColors[_], e.fillStyle = x, Q(m.before, g), b = m.lines, a && b.length && (this._drawColorBox(e, t, _, f, i), d = Math.max(c.lineHeight, r)), y = 0, w = b.length; y < w; ++y)
                g(b[y]), d = c.lineHeight;
            Q(m.after, g);
        } u = 0, d = c.lineHeight, Q(this.afterBody, g), t.y -= n; };
        $o.prototype.drawFooter = function (t, e, i) { var s = this.footer, n = s.length; var o, a; if (n) {
            var r_26 = Ei(i.rtl, this.x, this.width);
            for (t.x = No(this, i.footerAlign, i), t.y += i.footerMarginTop, e.textAlign = r_26.textAlign(i.footerAlign), e.textBaseline = "middle", o = He(i.footerFont), e.fillStyle = i.footerColor, e.font = o.string, a = 0; a < n; ++a)
                e.fillText(s[a], r_26.x(t.x), t.y + o.lineHeight / 2), t.y += o.lineHeight + i.footerSpacing;
        } };
        $o.prototype.drawBackground = function (t, e, i, s) { var _b = this, n = _b.xAlign, o = _b.yAlign, a = t.x, r = t.y, l = i.width, h = i.height, _c = We(s.cornerRadius), c = _c.topLeft, d = _c.topRight, u = _c.bottomLeft, f = _c.bottomRight; e.fillStyle = s.backgroundColor, e.strokeStyle = s.borderColor, e.lineWidth = s.borderWidth, e.beginPath(), e.moveTo(a + c, r), "top" === o && this.drawCaret(t, e, i, s), e.lineTo(a + l - d, r), e.quadraticCurveTo(a + l, r, a + l, r + d), "center" === o && "right" === n && this.drawCaret(t, e, i, s), e.lineTo(a + l, r + h - f), e.quadraticCurveTo(a + l, r + h, a + l - f, r + h), "bottom" === o && this.drawCaret(t, e, i, s), e.lineTo(a + u, r + h), e.quadraticCurveTo(a, r + h, a, r + h - u), "center" === o && "left" === n && this.drawCaret(t, e, i, s), e.lineTo(a, r + c), e.quadraticCurveTo(a, r, a + c, r), e.closePath(), e.fill(), s.borderWidth > 0 && e.stroke(); };
        $o.prototype._updateAnimationTarget = function (t) { var e = this.chart, i = this.$animations, s = i && i.x, n = i && i.y; if (s || n) {
            var i_55 = Ro[t.position].call(this, this._active, this._eventPosition);
            if (!i_55)
                return;
            var o_35 = this._size = Fo(this, t), a_24 = Object.assign({}, i_55, this._size), r_27 = Vo(e, t, a_24), l_25 = Wo(t, a_24, r_27, e);
            s._to === l_25.x && n._to === l_25.y || (this.xAlign = r_27.xAlign, this.yAlign = r_27.yAlign, this.width = o_35.width, this.height = o_35.height, this.caretX = i_55.x, this.caretY = i_55.y, this._resolveAnimations().update(this, l_25));
        } };
        $o.prototype.draw = function (t) { var e = this.options.setContext(this.getContext()); var i = this.opacity; if (!i)
            return; this._updateAnimationTarget(e); var s = { width: this.width, height: this.height }, n = { x: this.x, y: this.y }; i = Math.abs(i) < .001 ? 0 : i; var o = Ne(e.padding), a = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length; e.enabled && a && (t.save(), t.globalAlpha = i, this.drawBackground(n, t, s, e), Ii(t, e.textDirection), n.y += o.top, this.drawTitle(n, t, e), this.drawBody(n, t, e), this.drawFooter(n, t, e), zi(t, e.textDirection), t.restore()); };
        $o.prototype.getActiveElements = function () { return this._active || []; };
        $o.prototype.setActiveElements = function (t, e) {
            var _this = this;
            var i = this._active, s = t.map((function (_b) {
                var t = _b.datasetIndex, e = _b.index;
                var i = _this.chart.getDatasetMeta(t);
                if (!i)
                    throw new Error("Cannot find a dataset at index " + t);
                return { datasetIndex: t, element: i.data[e], index: e };
            })), n = !tt(i, s), o = this._positionChanged(s, e);
            (n || o) && (this._active = s, this._eventPosition = e, this._ignoreReplayEvents = !0, this.update(!0));
        };
        $o.prototype.handleEvent = function (t, e, i) {
            if (i === void 0) { i = !0; }
            if (e && this._ignoreReplayEvents)
                return !1;
            this._ignoreReplayEvents = !1;
            var s = this.options, n = this._active || [], o = this._getActiveElements(t, n, e, i), a = this._positionChanged(o, t), r = e || !tt(o, n) || a;
            return r && (this._active = o, (s.enabled || s.external) && (this._eventPosition = { x: t.x, y: t.y }, this.update(!0, e))), r;
        };
        $o.prototype._getActiveElements = function (t, e, i, s) { var n = this.options; if ("mouseout" === t.type)
            return []; if (!s)
            return e; var o = this.chart.getElementsAtEventForMode(t, n.mode, n, i); return n.reverse && o.reverse(), o; };
        $o.prototype._positionChanged = function (t, e) { var _b = this, i = _b.caretX, s = _b.caretY, n = _b.options, o = Ro[n.position].call(this, t, e); return !1 !== o && (i !== o.x || s !== o.y); };
        return $o;
    }(Ds));
    $o.positioners = Ro;
    var Yo = { id: "tooltip", _element: $o, positioners: Ro, afterInit: function (t, e, i) { i && (t.tooltip = new $o({ chart: t, options: i })); }, beforeUpdate: function (t, e, i) { t.tooltip && t.tooltip.initialize(i); }, reset: function (t, e, i) { t.tooltip && t.tooltip.initialize(i); }, afterDraw: function (t) { var e = t.tooltip, i = { tooltip: e }; !1 !== t.notifyPlugins("beforeTooltipDraw", i) && (e && e.draw(t.ctx), t.notifyPlugins("afterTooltipDraw", i)); }, afterEvent: function (t, e) { if (t.tooltip) {
            var i_56 = e.replay;
            t.tooltip.handleEvent(e.event, i_56, e.inChartArea) && (e.changed = !0);
        } }, defaults: { enabled: !0, external: null, position: "average", backgroundColor: "rgba(0,0,0,0.8)", titleColor: "#fff", titleFont: { weight: "bold" }, titleSpacing: 2, titleMarginBottom: 6, titleAlign: "left", bodyColor: "#fff", bodySpacing: 2, bodyFont: {}, bodyAlign: "left", footerColor: "#fff", footerSpacing: 2, footerMarginTop: 6, footerFont: { weight: "bold" }, footerAlign: "left", padding: 6, caretPadding: 2, caretSize: 5, cornerRadius: 6, boxHeight: function (t, e) { return e.bodyFont.size; }, boxWidth: function (t, e) { return e.bodyFont.size; }, multiKeyBackground: "#fff", displayColors: !0, boxPadding: 0, borderColor: "rgba(0,0,0,0)", borderWidth: 0, animation: { duration: 400, easing: "easeOutQuart" }, animations: { numbers: { type: "number", properties: ["x", "y", "width", "height", "caretX", "caretY"] }, opacity: { easing: "linear", duration: 200 } }, callbacks: { beforeTitle: H, title: function (t) { if (t.length > 0) {
                    var e_83 = t[0], i_57 = e_83.chart.data.labels, s_45 = i_57 ? i_57.length : 0;
                    if (this && this.options && "dataset" === this.options.mode)
                        return e_83.dataset.label || "";
                    if (e_83.label)
                        return e_83.label;
                    if (s_45 > 0 && e_83.dataIndex < s_45)
                        return i_57[e_83.dataIndex];
                } return ""; }, afterTitle: H, beforeBody: H, beforeLabel: H, label: function (t) { if (this && this.options && "dataset" === this.options.mode)
                    return t.label + ": " + t.formattedValue || t.formattedValue; var e = t.dataset.label || ""; e && (e += ": "); var i = t.formattedValue; return $(i) || (e += i), e; }, labelColor: function (t) { var e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex); return { borderColor: e.borderColor, backgroundColor: e.backgroundColor, borderWidth: e.borderWidth, borderDash: e.borderDash, borderDashOffset: e.borderDashOffset, borderRadius: 0 }; }, labelTextColor: function () { return this.options.bodyColor; }, labelPointStyle: function (t) { var e = t.chart.getDatasetMeta(t.datasetIndex).controller.getStyle(t.dataIndex); return { pointStyle: e.pointStyle, rotation: e.rotation }; }, afterLabel: H, afterBody: H, beforeFooter: H, footer: H, afterFooter: H } }, defaultRoutes: { bodyFont: "font", footerFont: "font", titleFont: "font" }, descriptors: { _scriptable: function (t) { return "filter" !== t && "itemSort" !== t && "external" !== t; }, _indexable: !1, callbacks: { _scriptable: !1, _indexable: !1 }, animation: { _fallback: !1 }, animations: { _fallback: "animation" } }, additionalOptionScopes: ["interaction"] }, Uo = Object.freeze({ __proto__: null, Decimation: ro, Filler: So, Legend: Co, SubTitle: Lo, Title: Ao, Tooltip: Yo });
    function Xo(t, e, i, s) { var n = t.indexOf(e); if (-1 === n)
        return (function (t, e, i, s) { return ("string" == typeof e ? (i = t.push(e) - 1, s.unshift({ index: i, label: e })) : isNaN(e) && (i = null), i); })(t, e, i, s); return n !== t.lastIndexOf(e) ? i : n; }
    var qo = /** @class */ (function (_super) {
        __extends(qo, _super);
        function qo(t) {
            var _this = this;
            _this = _super.call(this, t) || this, _this._startValue = void 0, _this._valueRange = 0, _this._addedLabels = [];
            return _this;
        }
        qo.prototype.init = function (t) { var e = this._addedLabels; if (e.length) {
            var t_75 = this.getLabels();
            for (var _b = 0, e_84 = e; _b < e_84.length; _b++) {
                var _c = e_84[_b], i_58 = _c.index, s_46 = _c.label;
                t_75[i_58] === s_46 && t_75.splice(i_58, 1);
            }
            this._addedLabels = [];
        } _super.prototype.init.call(this, t); };
        qo.prototype.parse = function (t, e) { if ($(t))
            return null; var i = this.getLabels(); return (function (t, e) { return null === t ? null : jt(Math.round(t), 0, e); })(e = isFinite(e) && i[e] === t ? e : Xo(i, t, K(e, t), this._addedLabels), i.length - 1); };
        qo.prototype.determineDataLimits = function () { var _b = this.getUserBounds(), t = _b.minDefined, e = _b.maxDefined; var _c = this.getMinMax(!0), i = _c.min, s = _c.max; "ticks" === this.options.bounds && (t || (i = 0), e || (s = this.getLabels().length - 1)), this.min = i, this.max = s; };
        qo.prototype.buildTicks = function () { var t = this.min, e = this.max, i = this.options.offset, s = []; var n = this.getLabels(); n = 0 === t && e === n.length - 1 ? n : n.slice(t, e + 1), this._valueRange = Math.max(n.length - (i ? 0 : 1), 1), this._startValue = this.min - (i ? .5 : 0); for (var i_59 = t; i_59 <= e; i_59++)
            s.push({ value: i_59 }); return s; };
        qo.prototype.getLabelForValue = function (t) { var e = this.getLabels(); return t >= 0 && t < e.length ? e[t] : t; };
        qo.prototype.configure = function () { _super.prototype.configure.call(this), this.isHorizontal() || (this._reversePixels = !this._reversePixels); };
        qo.prototype.getPixelForValue = function (t) { return "number" != typeof t && (t = this.parse(t)), null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange); };
        qo.prototype.getPixelForTick = function (t) { var e = this.ticks; return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t].value); };
        qo.prototype.getValueForPixel = function (t) { return Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange); };
        qo.prototype.getBasePixel = function () { return this.bottom; };
        return qo;
    }(Bs));
    function Ko(t, e, _b) {
        var i = _b.horizontal, s = _b.minRotation;
        var n = It(s), o = (i ? Math.sin(n) : Math.cos(n)) || .001, a = .75 * e * ("" + t).length;
        return Math.min(e / o, a);
    }
    qo.id = "category", qo.defaults = { ticks: { callback: qo.prototype.getLabelForValue } };
    var Go = /** @class */ (function (_super) {
        __extends(Go, _super);
        function Go(t) {
            var _this = this;
            _this = _super.call(this, t) || this, _this.start = void 0, _this.end = void 0, _this._startValue = void 0, _this._endValue = void 0, _this._valueRange = 0;
            return _this;
        }
        Go.prototype.parse = function (t, e) { return $(t) || ("number" == typeof t || t instanceof Number) && !isFinite(+t) ? null : +t; };
        Go.prototype.handleTickRangeOptions = function () { var t = this.options.beginAtZero, _b = this.getUserBounds(), e = _b.minDefined, i = _b.maxDefined; var _c = this, s = _c.min, n = _c.max; var o = function (t) { return s = e ? s : t; }, a = function (t) { return n = i ? n : t; }; if (t) {
            var t_76 = Ct(s), e_85 = Ct(n);
            t_76 < 0 && e_85 < 0 ? a(0) : t_76 > 0 && e_85 > 0 && o(0);
        } if (s === n) {
            var e_86 = 1;
            (n >= Number.MAX_SAFE_INTEGER || s <= Number.MIN_SAFE_INTEGER) && (e_86 = Math.abs(.05 * n)), a(n + e_86), t || o(s - e_86);
        } this.min = s, this.max = n; };
        Go.prototype.getTickLimit = function () { var t = this.options.ticks; var e, i = t.maxTicksLimit, s = t.stepSize; return s ? (e = Math.ceil(this.max / s) - Math.floor(this.min / s) + 1, e > 1e3 && (console.warn("scales.".concat(this.id, ".ticks.stepSize: ").concat(s, " would result generating up to ").concat(e, " ticks. Limiting to 1000.")), e = 1e3)) : (e = this.computeTickLimit(), i = i || 11), i && (e = Math.min(i, e)), e; };
        Go.prototype.computeTickLimit = function () { return Number.POSITIVE_INFINITY; };
        Go.prototype.buildTicks = function () { var t = this.options, e = t.ticks; var i = this.getTickLimit(); i = Math.max(2, i); var s = function (t, e) { var i = [], s = t.bounds, n = t.step, o = t.min, a = t.max, r = t.precision, l = t.count, h = t.maxTicks, c = t.maxDigits, d = t.includeBounds, u = n || 1, f = h - 1, g = e.min, p = e.max, m = !$(o), x = !$(a), b = !$(l), _ = (p - g) / (c + 1); var y, v, w, M, k = Ot((p - g) / f / u) * u; if (k < 1e-14 && !m && !x)
            return [{ value: g }, { value: p }]; M = Math.ceil(p / k) - Math.floor(g / k), M > f && (k = Ot(M * k / f / u) * u), $(r) || (y = Math.pow(10, r), k = Math.ceil(k * y) / y), "ticks" === s ? (v = Math.floor(g / k) * k, w = Math.ceil(p / k) * k) : (v = g, w = p), m && x && n && Rt((a - o) / n, k / 1e3) ? (M = Math.round(Math.min((a - o) / k, h)), k = (a - o) / M, v = o, w = a) : b ? (v = m ? o : v, w = x ? a : w, M = l - 1, k = (w - v) / M) : (M = (w - v) / k, M = Lt(M, Math.round(M), k / 1e3) ? Math.round(M) : Math.ceil(M)); var S = Math.max(Ft(k), Ft(v)); y = Math.pow(10, $(r) ? S : r), v = Math.round(v * y) / y, w = Math.round(w * y) / y; var P = 0; for (m && (d && v !== o ? (i.push({ value: o }), v < o && P++, Lt(Math.round((v + P * k) * y) / y, o, Ko(o, _, t)) && P++) : v < o && P++); P < M; ++P)
            i.push({ value: Math.round((v + P * k) * y) / y }); return x && d && w !== a ? i.length && Lt(i[i.length - 1].value, a, Ko(a, _, t)) ? i[i.length - 1].value = a : i.push({ value: a }) : x && w !== a || i.push({ value: w }), i; }({ maxTicks: i, bounds: t.bounds, min: t.min, max: t.max, precision: e.precision, step: e.stepSize, count: e.count, maxDigits: this._maxDigits(), horizontal: this.isHorizontal(), minRotation: e.minRotation || 0, includeBounds: !1 !== e.includeBounds }, this._range || this); return "ticks" === t.bounds && Et(s, this, "value"), t.reverse ? (s.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), s; };
        Go.prototype.configure = function () { var t = this.ticks; var e = this.min, i = this.max; if (_super.prototype.configure.call(this), this.options.offset && t.length) {
            var s_47 = (i - e) / Math.max(t.length - 1, 1) / 2;
            e -= s_47, i += s_47;
        } this._startValue = e, this._endValue = i, this._valueRange = i - e; };
        Go.prototype.getLabelForValue = function (t) { return Ri(t, this.chart.options.locale, this.options.ticks.format); };
        return Go;
    }(Bs));
    var Zo = /** @class */ (function (_super) {
        __extends(Zo, _super);
        function Zo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Zo.prototype.determineDataLimits = function () { var _b = this.getMinMax(!0), t = _b.min, e = _b.max; this.min = X(t) ? t : 0, this.max = X(e) ? e : 1, this.handleTickRangeOptions(); };
        Zo.prototype.computeTickLimit = function () { var t = this.isHorizontal(), e = t ? this.width : this.height, i = It(this.options.ticks.minRotation), s = (t ? Math.sin(i) : Math.cos(i)) || .001, n = this._resolveTickFontOptions(0); return Math.ceil(e / Math.min(40, n.lineHeight / s)); };
        Zo.prototype.getPixelForValue = function (t) { return null === t ? NaN : this.getPixelForDecimal((t - this._startValue) / this._valueRange); };
        Zo.prototype.getValueForPixel = function (t) { return this._startValue + this.getDecimalForPixel(t) * this._valueRange; };
        return Zo;
    }(Go));
    function Jo(t) { return 1 === t / Math.pow(10, Math.floor(Dt(t))); }
    Zo.id = "linear", Zo.defaults = { ticks: { callback: Os.formatters.numeric } };
    var Qo = /** @class */ (function (_super) {
        __extends(Qo, _super);
        function Qo(t) {
            var _this = this;
            _this = _super.call(this, t) || this, _this.start = void 0, _this.end = void 0, _this._startValue = void 0, _this._valueRange = 0;
            return _this;
        }
        Qo.prototype.parse = function (t, e) { var i = Go.prototype.parse.apply(this, [t, e]); if (0 !== i)
            return X(i) && i > 0 ? i : null; this._zero = !0; };
        Qo.prototype.determineDataLimits = function () { var _b = this.getMinMax(!0), t = _b.min, e = _b.max; this.min = X(t) ? Math.max(0, t) : null, this.max = X(e) ? Math.max(0, e) : null, this.options.beginAtZero && (this._zero = !0), this.handleTickRangeOptions(); };
        Qo.prototype.handleTickRangeOptions = function () { var _b = this.getUserBounds(), t = _b.minDefined, e = _b.maxDefined; var i = this.min, s = this.max; var n = function (e) { return i = t ? i : e; }, o = function (t) { return s = e ? s : t; }, a = function (t, e) { return Math.pow(10, Math.floor(Dt(t)) + e); }; i === s && (i <= 0 ? (n(1), o(10)) : (n(a(i, -1)), o(a(s, 1)))), i <= 0 && n(a(s, -1)), s <= 0 && o(a(i, 1)), this._zero && this.min !== this._suggestedMin && i === a(this.min, 0) && n(a(i, -1)), this.min = i, this.max = s; };
        Qo.prototype.buildTicks = function () { var t = this.options, e = function (t, e) { var i = Math.floor(Dt(e.max)), s = Math.ceil(e.max / Math.pow(10, i)), n = []; var o = q(t.min, Math.pow(10, Math.floor(Dt(e.min)))), a = Math.floor(Dt(o)), r = Math.floor(o / Math.pow(10, a)), l = a < 0 ? Math.pow(10, Math.abs(a)) : 1; do {
            n.push({ value: o, major: Jo(o) }), ++r, 10 === r && (r = 1, ++a, l = a >= 0 ? 1 : l), o = Math.round(r * Math.pow(10, a) * l) / l;
        } while (a < i || a === i && r < s); var h = q(t.max, o); return n.push({ value: h, major: Jo(o) }), n; }({ min: this._userMin, max: this._userMax }, this); return "ticks" === t.bounds && Et(e, this, "value"), t.reverse ? (e.reverse(), this.start = this.max, this.end = this.min) : (this.start = this.min, this.end = this.max), e; };
        Qo.prototype.getLabelForValue = function (t) { return void 0 === t ? "0" : Ri(t, this.chart.options.locale, this.options.ticks.format); };
        Qo.prototype.configure = function () { var t = this.min; _super.prototype.configure.call(this), this._startValue = Dt(t), this._valueRange = Dt(this.max) - Dt(t); };
        Qo.prototype.getPixelForValue = function (t) { return void 0 !== t && 0 !== t || (t = this.min), null === t || isNaN(t) ? NaN : this.getPixelForDecimal(t === this.min ? 0 : (Dt(t) - this._startValue) / this._valueRange); };
        Qo.prototype.getValueForPixel = function (t) { var e = this.getDecimalForPixel(t); return Math.pow(10, this._startValue + e * this._valueRange); };
        return Qo;
    }(Bs));
    function ta(t) { var e = t.ticks; if (e.display && t.display) {
        var t_77 = Ne(e.backdropPadding);
        return K(e.font && e.font.size, bt.font.size) + t_77.height;
    } return 0; }
    function ea(t, e, i, s, n) { return t === s || t === n ? { start: e - i / 2, end: e + i / 2 } : t < s || t > n ? { start: e - i, end: e } : { start: e, end: e + i }; }
    function ia(t) { var e = { l: t.left + t._padding.left, r: t.right - t._padding.right, t: t.top + t._padding.top, b: t.bottom - t._padding.bottom }, i = Object.assign({}, e), s = [], n = [], o = t._pointLabels.length, a = t.options.pointLabels, r = a.centerPointLabels ? _t / o : 0; for (var d_12 = 0; d_12 < o; d_12++) {
        var o_36 = a.setContext(t.getPointLabelContext(d_12));
        n[d_12] = o_36.padding;
        var u_7 = t.getPointPosition(d_12, t.drawingArea + n[d_12], r), f_7 = He(o_36.font), g_4 = (l = t.ctx, h = f_7, c = Y(c = t._pointLabels[d_12]) ? c : [c], { w: qt(l, h.string, c), h: c.length * h.lineHeight });
        s[d_12] = g_4;
        var p_4 = Nt(t.getIndexAngle(d_12) + r), m_5 = Math.round(zt(p_4));
        sa(i, e, p_4, ea(m_5, u_7.x, g_4.w, 0, 180), ea(m_5, u_7.y, g_4.h, 90, 270));
    } var l, h, c; t.setCenterPoint(e.l - i.l, i.r - e.r, e.t - i.t, i.b - e.b), t._pointLabelItems = function (t, e, i) { var s = [], n = t._pointLabels.length, o = t.options, a = ta(o) / 2, r = t.drawingArea, l = o.pointLabels.centerPointLabels ? _t / n : 0; for (var o_37 = 0; o_37 < n; o_37++) {
        var n_31 = t.getPointPosition(o_37, r + a + i[o_37], l), h_24 = Math.round(zt(Nt(n_31.angle + kt))), c_13 = e[o_37], d_13 = aa(n_31.y, c_13.h, h_24), u_8 = na(h_24), f_8 = oa(n_31.x, c_13.w, u_8);
        s.push({ x: n_31.x, y: d_13, textAlign: u_8, left: f_8, top: d_13, right: f_8 + c_13.w, bottom: d_13 + c_13.h });
    } return s; }(t, s, n); }
    function sa(t, e, i, s, n) { var o = Math.abs(Math.sin(i)), a = Math.abs(Math.cos(i)); var r = 0, l = 0; s.start < e.l ? (r = (e.l - s.start) / o, t.l = Math.min(t.l, e.l - r)) : s.end > e.r && (r = (s.end - e.r) / o, t.r = Math.max(t.r, e.r + r)), n.start < e.t ? (l = (e.t - n.start) / a, t.t = Math.min(t.t, e.t - l)) : n.end > e.b && (l = (n.end - e.b) / a, t.b = Math.max(t.b, e.b + l)); }
    function na(t) { return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right"; }
    function oa(t, e, i) { return "right" === i ? t -= e : "center" === i && (t -= e / 2), t; }
    function aa(t, e, i) { return 90 === i || 270 === i ? t -= e / 2 : (i > 270 || i < 90) && (t -= e), t; }
    function ra(t, e, i, s) { var n = t.ctx; if (i)
        n.arc(t.xCenter, t.yCenter, e, 0, yt);
    else {
        var i_60 = t.getPointPosition(0, e);
        n.moveTo(i_60.x, i_60.y);
        for (var o_38 = 1; o_38 < s; o_38++)
            i_60 = t.getPointPosition(o_38, e), n.lineTo(i_60.x, i_60.y);
    } }
    Qo.id = "logarithmic", Qo.defaults = { ticks: { callback: Os.formatters.logarithmic, major: { enabled: !0 } } };
    var la = /** @class */ (function (_super) {
        __extends(la, _super);
        function la(t) {
            var _this = this;
            _this = _super.call(this, t) || this, _this.xCenter = void 0, _this.yCenter = void 0, _this.drawingArea = void 0, _this._pointLabels = [], _this._pointLabelItems = [];
            return _this;
        }
        la.prototype.setDimensions = function () { var t = this._padding = Ne(ta(this.options) / 2), e = this.width = this.maxWidth - t.width, i = this.height = this.maxHeight - t.height; this.xCenter = Math.floor(this.left + e / 2 + t.left), this.yCenter = Math.floor(this.top + i / 2 + t.top), this.drawingArea = Math.floor(Math.min(e, i) / 2); };
        la.prototype.determineDataLimits = function () { var _b = this.getMinMax(!1), t = _b.min, e = _b.max; this.min = X(t) && !isNaN(t) ? t : 0, this.max = X(e) && !isNaN(e) ? e : 0, this.handleTickRangeOptions(); };
        la.prototype.computeTickLimit = function () { return Math.ceil(this.drawingArea / ta(this.options)); };
        la.prototype.generateTickLabels = function (t) {
            var _this = this;
            Go.prototype.generateTickLabels.call(this, t), this._pointLabels = this.getLabels().map((function (t, e) { var i = J(_this.options.pointLabels.callback, [t, e], _this); return i || 0 === i ? i : ""; })).filter((function (t, e) { return _this.chart.getDataVisibility(e); }));
        };
        la.prototype.fit = function () { var t = this.options; t.display && t.pointLabels.display ? ia(this) : this.setCenterPoint(0, 0, 0, 0); };
        la.prototype.setCenterPoint = function (t, e, i, s) { this.xCenter += Math.floor((t - e) / 2), this.yCenter += Math.floor((i - s) / 2), this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(t, e, i, s)); };
        la.prototype.getIndexAngle = function (t) { return Nt(t * (yt / (this._pointLabels.length || 1)) + It(this.options.startAngle || 0)); };
        la.prototype.getDistanceFromCenterForValue = function (t) { if ($(t))
            return NaN; var e = this.drawingArea / (this.max - this.min); return this.options.reverse ? (this.max - t) * e : (t - this.min) * e; };
        la.prototype.getValueForDistanceFromCenter = function (t) { if ($(t))
            return NaN; var e = t / (this.drawingArea / (this.max - this.min)); return this.options.reverse ? this.max - e : this.min + e; };
        la.prototype.getPointLabelContext = function (t) { var e = this._pointLabels || []; if (t >= 0 && t < e.length) {
            var i_61 = e[t];
            return function (t, e, i) { return Ye(t, { label: i, index: e, type: "pointLabel" }); }(this.getContext(), t, i_61);
        } };
        la.prototype.getPointPosition = function (t, e, i) {
            if (i === void 0) { i = 0; }
            var s = this.getIndexAngle(t) - kt + i;
            return { x: Math.cos(s) * e + this.xCenter, y: Math.sin(s) * e + this.yCenter, angle: s };
        };
        la.prototype.getPointPositionForValue = function (t, e) { return this.getPointPosition(t, this.getDistanceFromCenterForValue(e)); };
        la.prototype.getBasePosition = function (t) { return this.getPointPositionForValue(t || 0, this.getBaseValue()); };
        la.prototype.getPointLabelPosition = function (t) { var _b = this._pointLabelItems[t], e = _b.left, i = _b.top, s = _b.right, n = _b.bottom; return { left: e, top: i, right: s, bottom: n }; };
        la.prototype.drawBackground = function () { var _b = this.options, t = _b.backgroundColor, e = _b.grid.circular; if (t) {
            var i_62 = this.ctx;
            i_62.save(), i_62.beginPath(), ra(this, this.getDistanceFromCenterForValue(this._endValue), e, this._pointLabels.length), i_62.closePath(), i_62.fillStyle = t, i_62.fill(), i_62.restore();
        } };
        la.prototype.drawGrid = function () {
            var _this = this;
            var t = this.ctx, e = this.options, i = e.angleLines, s = e.grid, n = this._pointLabels.length;
            var o, a, r;
            if (e.pointLabels.display && function (t, e) { var i = t.ctx, s = t.options.pointLabels; for (var n_32 = e - 1; n_32 >= 0; n_32--) {
                var e_87 = s.setContext(t.getPointLabelContext(n_32)), o_39 = He(e_87.font), _b = t._pointLabelItems[n_32], a_25 = _b.x, r_28 = _b.y, l_26 = _b.textAlign, h_25 = _b.left, c_14 = _b.top, d_14 = _b.right, u_9 = _b.bottom, f_9 = e_87.backdropColor;
                if (!$(f_9)) {
                    var t_78 = Ne(e_87.backdropPadding);
                    i.fillStyle = f_9, i.fillRect(h_25 - t_78.left, c_14 - t_78.top, d_14 - h_25 + t_78.width, u_9 - c_14 + t_78.height);
                }
                se(i, t._pointLabels[n_32], a_25, r_28 + o_39.lineHeight / 2, o_39, { color: e_87.color, textAlign: l_26, textBaseline: "middle" });
            } }(this, n), s.display && this.ticks.forEach((function (t, e) { if (0 !== e) {
                a = _this.getDistanceFromCenterForValue(t.value);
                !function (t, e, i, s) { var n = t.ctx, o = e.circular, a = e.color, r = e.lineWidth; !o && !s || !a || !r || i < 0 || (n.save(), n.strokeStyle = a, n.lineWidth = r, n.setLineDash(e.borderDash), n.lineDashOffset = e.borderDashOffset, n.beginPath(), ra(t, i, o, s), n.closePath(), n.stroke(), n.restore()); }(_this, s.setContext(_this.getContext(e - 1)), a, n);
            } })), i.display) {
                for (t.save(), o = n - 1; o >= 0; o--) {
                    var s_48 = i.setContext(this.getPointLabelContext(o)), n_33 = s_48.color, l_27 = s_48.lineWidth;
                    l_27 && n_33 && (t.lineWidth = l_27, t.strokeStyle = n_33, t.setLineDash(s_48.borderDash), t.lineDashOffset = s_48.borderDashOffset, a = this.getDistanceFromCenterForValue(e.ticks.reverse ? this.min : this.max), r = this.getPointPosition(o, a), t.beginPath(), t.moveTo(this.xCenter, this.yCenter), t.lineTo(r.x, r.y), t.stroke());
                }
                t.restore();
            }
        };
        la.prototype.drawBorder = function () { };
        la.prototype.drawLabels = function () {
            var _this = this;
            var t = this.ctx, e = this.options, i = e.ticks;
            if (!i.display)
                return;
            var s = this.getIndexAngle(0);
            var n, o;
            t.save(), t.translate(this.xCenter, this.yCenter), t.rotate(s), t.textAlign = "center", t.textBaseline = "middle", this.ticks.forEach((function (s, a) { if (0 === a && !e.reverse)
                return; var r = i.setContext(_this.getContext(a)), l = He(r.font); if (n = _this.getDistanceFromCenterForValue(_this.ticks[a].value), r.showLabelBackdrop) {
                t.font = l.string, o = t.measureText(s.label).width, t.fillStyle = r.backdropColor;
                var e_88 = Ne(r.backdropPadding);
                t.fillRect(-o / 2 - e_88.left, -n - l.size / 2 - e_88.top, o + e_88.width, l.size + e_88.height);
            } se(t, s.label, 0, -n, l, { color: r.color }); })), t.restore();
        };
        la.prototype.drawTitle = function () { };
        return la;
    }(Go));
    la.id = "radialLinear", la.defaults = { display: !0, animate: !0, position: "chartArea", angleLines: { display: !0, lineWidth: 1, borderDash: [], borderDashOffset: 0 }, grid: { circular: !1 }, startAngle: 0, ticks: { showLabelBackdrop: !0, callback: Os.formatters.numeric }, pointLabels: { backdropColor: void 0, backdropPadding: 2, display: !0, font: { size: 10 }, callback: function (t) { return t; }, padding: 5, centerPointLabels: !1 } }, la.defaultRoutes = { "angleLines.color": "borderColor", "pointLabels.color": "color", "ticks.color": "color" }, la.descriptors = { angleLines: { _fallback: "grid" } };
    var ha = { millisecond: { common: !0, size: 1, steps: 1e3 }, second: { common: !0, size: 1e3, steps: 60 }, minute: { common: !0, size: 6e4, steps: 60 }, hour: { common: !0, size: 36e5, steps: 24 }, day: { common: !0, size: 864e5, steps: 30 }, week: { common: !1, size: 6048e5, steps: 4 }, month: { common: !0, size: 2628e6, steps: 12 }, quarter: { common: !1, size: 7884e6, steps: 4 }, year: { common: !0, size: 3154e7 } }, ca = Object.keys(ha);
    function da(t, e) { return t - e; }
    function ua(t, e) { if ($(e))
        return null; var i = t._adapter, _b = t._parseOpts, s = _b.parser, n = _b.round, o = _b.isoWeekday; var a = e; return "function" == typeof s && (a = s(a)), X(a) || (a = "string" == typeof s ? i.parse(a, s) : i.parse(a)), null === a ? null : (n && (a = "week" !== n || !Tt(o) && !0 !== o ? i.startOf(a, n) : i.startOf(a, "isoWeek", o)), +a); }
    function fa(t, e, i, s) { var n = ca.length; for (var o_40 = ca.indexOf(t); o_40 < n - 1; ++o_40) {
        var t_79 = ha[ca[o_40]], n_34 = t_79.steps ? t_79.steps : Number.MAX_SAFE_INTEGER;
        if (t_79.common && Math.ceil((i - e) / (n_34 * t_79.size)) <= s)
            return ca[o_40];
    } return ca[n - 1]; }
    function ga(t, e, i) { if (i) {
        if (i.length) {
            var _b = ae(i, e), s_49 = _b.lo, n_35 = _b.hi;
            t[i[s_49] >= e ? i[s_49] : i[n_35]] = !0;
        }
    }
    else
        t[e] = !0; }
    function pa(t, e, i) { var s = [], n = {}, o = e.length; var a, r; for (a = 0; a < o; ++a)
        r = e[a], n[r] = a, s.push({ value: r, major: !1 }); return 0 !== o && i ? function (t, e, i, s) { var n = t._adapter, o = +n.startOf(e[0].value, s), a = e[e.length - 1].value; var r, l; for (r = o; r <= a; r = +n.add(r, 1, s))
        l = i[r], l >= 0 && (e[l].major = !0); return e; }(t, s, n, i) : s; }
    var ma = /** @class */ (function (_super) {
        __extends(ma, _super);
        function ma(t) {
            var _this = this;
            _this = _super.call(this, t) || this, _this._cache = { data: [], labels: [], all: [] }, _this._unit = "day", _this._majorUnit = void 0, _this._offsets = {}, _this._normalized = !1, _this._parseOpts = void 0;
            return _this;
        }
        ma.prototype.init = function (t, e) { var i = t.time || (t.time = {}), s = this._adapter = new mn._date(t.adapters.date); ot(i.displayFormats, s.formats()), this._parseOpts = { parser: i.parser, round: i.round, isoWeekday: i.isoWeekday }, _super.prototype.init.call(this, t), this._normalized = e.normalized; };
        ma.prototype.parse = function (t, e) { return void 0 === t ? null : ua(this, t); };
        ma.prototype.beforeLayout = function () { _super.prototype.beforeLayout.call(this), this._cache = { data: [], labels: [], all: [] }; };
        ma.prototype.determineDataLimits = function () { var t = this.options, e = this._adapter, i = t.time.unit || "day"; var _b = this.getUserBounds(), s = _b.min, n = _b.max, o = _b.minDefined, a = _b.maxDefined; function r(t) { o || isNaN(t.min) || (s = Math.min(s, t.min)), a || isNaN(t.max) || (n = Math.max(n, t.max)); } o && a || (r(this._getLabelBounds()), "ticks" === t.bounds && "labels" === t.ticks.source || r(this.getMinMax(!1))), s = X(s) && !isNaN(s) ? s : +e.startOf(Date.now(), i), n = X(n) && !isNaN(n) ? n : +e.endOf(Date.now(), i) + 1, this.min = Math.min(s, n - 1), this.max = Math.max(s + 1, n); };
        ma.prototype._getLabelBounds = function () { var t = this.getLabelTimestamps(); var e = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY; return t.length && (e = t[0], i = t[t.length - 1]), { min: e, max: i }; };
        ma.prototype.buildTicks = function () { var t = this.options, e = t.time, i = t.ticks, s = "labels" === i.source ? this.getLabelTimestamps() : this._generate(); "ticks" === t.bounds && s.length && (this.min = this._userMin || s[0], this.max = this._userMax || s[s.length - 1]); var n = this.min, o = he(s, n, this.max); return this._unit = e.unit || (i.autoSkip ? fa(e.minUnit, this.min, this.max, this._getLabelCapacity(n)) : function (t, e, i, s, n) { for (var o_41 = ca.length - 1; o_41 >= ca.indexOf(i); o_41--) {
            var i_63 = ca[o_41];
            if (ha[i_63].common && t._adapter.diff(n, s, i_63) >= e - 1)
                return i_63;
        } return ca[i ? ca.indexOf(i) : 0]; }(this, o.length, e.minUnit, this.min, this.max)), this._majorUnit = i.major.enabled && "year" !== this._unit ? function (t) { for (var e_89 = ca.indexOf(t) + 1, i_64 = ca.length; e_89 < i_64; ++e_89)
            if (ha[ca[e_89]].common)
                return ca[e_89]; }(this._unit) : void 0, this.initOffsets(s), t.reverse && o.reverse(), pa(this, o, this._majorUnit); };
        ma.prototype.initOffsets = function (t) { var e, i, s = 0, n = 0; this.options.offset && t.length && (e = this.getDecimalForValue(t[0]), s = 1 === t.length ? 1 - e : (this.getDecimalForValue(t[1]) - e) / 2, i = this.getDecimalForValue(t[t.length - 1]), n = 1 === t.length ? i : (i - this.getDecimalForValue(t[t.length - 2])) / 2); var o = t.length < 3 ? .5 : .25; s = jt(s, 0, o), n = jt(n, 0, o), this._offsets = { start: s, end: n, factor: 1 / (s + 1 + n) }; };
        ma.prototype._generate = function () { var t = this._adapter, e = this.min, i = this.max, s = this.options, n = s.time, o = n.unit || fa(n.minUnit, e, i, this._getLabelCapacity(e)), a = K(n.stepSize, 1), r = "week" === o && n.isoWeekday, l = Tt(r) || !0 === r, h = {}; var c, d, u = e; if (l && (u = +t.startOf(u, "isoWeek", r)), u = +t.startOf(u, l ? "day" : o), t.diff(i, e, o) > 1e5 * a)
            throw new Error(e + " and " + i + " are too far apart with stepSize of " + a + " " + o); var f = "data" === s.ticks.source && this.getDataTimestamps(); for (c = u, d = 0; c < i; c = +t.add(c, a, o), d++)
            ga(h, c, f); return c !== i && "ticks" !== s.bounds && 1 !== d || ga(h, c, f), Object.keys(h).sort((function (t, e) { return t - e; })).map((function (t) { return +t; })); };
        ma.prototype.getLabelForValue = function (t) { var e = this._adapter, i = this.options.time; return i.tooltipFormat ? e.format(t, i.tooltipFormat) : e.format(t, i.displayFormats.datetime); };
        ma.prototype._tickFormatFunction = function (t, e, i, s) { var n = this.options, o = n.time.displayFormats, a = this._unit, r = this._majorUnit, l = a && o[a], h = r && o[r], c = i[e], d = r && h && c && c.major, u = this._adapter.format(t, s || (d ? h : l)), f = n.ticks.callback; return f ? J(f, [u, e, i], this) : u; };
        ma.prototype.generateTickLabels = function (t) { var e, i, s; for (e = 0, i = t.length; e < i; ++e)
            s = t[e], s.label = this._tickFormatFunction(s.value, e, t); };
        ma.prototype.getDecimalForValue = function (t) { return null === t ? NaN : (t - this.min) / (this.max - this.min); };
        ma.prototype.getPixelForValue = function (t) { var e = this._offsets, i = this.getDecimalForValue(t); return this.getPixelForDecimal((e.start + i) * e.factor); };
        ma.prototype.getValueForPixel = function (t) { var e = this._offsets, i = this.getDecimalForPixel(t) / e.factor - e.end; return this.min + i * (this.max - this.min); };
        ma.prototype._getLabelSize = function (t) { var e = this.options.ticks, i = this.ctx.measureText(t).width, s = It(this.isHorizontal() ? e.maxRotation : e.minRotation), n = Math.cos(s), o = Math.sin(s), a = this._resolveTickFontOptions(0).size; return { w: i * n + a * o, h: i * o + a * n }; };
        ma.prototype._getLabelCapacity = function (t) { var e = this.options.time, i = e.displayFormats, s = i[e.unit] || i.millisecond, n = this._tickFormatFunction(t, 0, pa(this, [t], this._majorUnit), s), o = this._getLabelSize(n), a = Math.floor(this.isHorizontal() ? this.width / o.w : this.height / o.h) - 1; return a > 0 ? a : 1; };
        ma.prototype.getDataTimestamps = function () { var t, e, i = this._cache.data || []; if (i.length)
            return i; var s = this.getMatchingVisibleMetas(); if (this._normalized && s.length)
            return this._cache.data = s[0].controller.getAllParsedValues(this); for (t = 0, e = s.length; t < e; ++t)
            i = i.concat(s[t].controller.getAllParsedValues(this)); return this._cache.data = this.normalize(i); };
        ma.prototype.getLabelTimestamps = function () { var t = this._cache.labels || []; var e, i; if (t.length)
            return t; var s = this.getLabels(); for (e = 0, i = s.length; e < i; ++e)
            t.push(ua(this, s[e])); return this._cache.labels = this._normalized ? t : this.normalize(t); };
        ma.prototype.normalize = function (t) { return fe(t.sort(da)); };
        return ma;
    }(Bs));
    function xa(t, e, i) {
        var _b, _c, _d, _f, _g, _h;
        var s, n, o, a, r = 0, l = t.length - 1;
        i ? (e >= t[r].pos && e <= t[l].pos && (_b = re(t, "pos", e), r = _b.lo, l = _b.hi, _b), (_c = t[r], s = _c.pos, o = _c.time), (_d = t[l], n = _d.pos, a = _d.time, _d)) : (e >= t[r].time && e <= t[l].time && (_f = re(t, "time", e), r = _f.lo, l = _f.hi, _f), (_g = t[r], s = _g.time, o = _g.pos), (_h = t[l], n = _h.time, a = _h.pos, _h));
        var h = n - s;
        return h ? o + (a - o) * (e - s) / h : o;
    }
    ma.id = "time", ma.defaults = { bounds: "data", adapters: {}, time: { parser: !1, unit: !1, round: !1, isoWeekday: !1, minUnit: "millisecond", displayFormats: {} }, ticks: { source: "auto", major: { enabled: !1 } } };
    var ba = /** @class */ (function (_super) {
        __extends(ba, _super);
        function ba(t) {
            var _this = this;
            _this = _super.call(this, t) || this, _this._table = [], _this._minPos = void 0, _this._tableRange = void 0;
            return _this;
        }
        ba.prototype.initOffsets = function () { var t = this._getTimestampsForTable(), e = this._table = this.buildLookupTable(t); this._minPos = xa(e, this.min), this._tableRange = xa(e, this.max) - this._minPos, _super.prototype.initOffsets.call(this, t); };
        ba.prototype.buildLookupTable = function (t) { var _b = this, e = _b.min, i = _b.max, s = [], n = []; var o, a, r, l, h; for (o = 0, a = t.length; o < a; ++o)
            l = t[o], l >= e && l <= i && s.push(l); if (s.length < 2)
            return [{ time: e, pos: 0 }, { time: i, pos: 1 }]; for (o = 0, a = s.length; o < a; ++o)
            h = s[o + 1], r = s[o - 1], l = s[o], Math.round((h + r) / 2) !== l && n.push({ time: l, pos: o / (a - 1) }); return n; };
        ba.prototype._getTimestampsForTable = function () { var t = this._cache.all || []; if (t.length)
            return t; var e = this.getDataTimestamps(), i = this.getLabelTimestamps(); return t = e.length && i.length ? this.normalize(e.concat(i)) : e.length ? e : i, t = this._cache.all = t, t; };
        ba.prototype.getDecimalForValue = function (t) { return (xa(this._table, t) - this._minPos) / this._tableRange; };
        ba.prototype.getValueForPixel = function (t) { var e = this._offsets, i = this.getDecimalForPixel(t) / e.factor - e.end; return xa(this._table, i * this._tableRange + this._minPos, !0); };
        return ba;
    }(ma));
    ba.id = "timeseries", ba.defaults = ma.defaults;
    var _a = Object.freeze({ __proto__: null, CategoryScale: qo, LinearScale: Zo, LogarithmicScale: Qo, RadialLinearScale: la, TimeScale: ma, TimeSeriesScale: ba });
    return dn.register(Rn, _a, no, Uo), dn.helpers = __assign({}, Yi), dn._adapters = mn, dn.Animation = us, dn.Animations = gs, dn.animator = a, dn.controllers = Ws.controllers.items, dn.DatasetController = Ps, dn.Element = Ds, dn.elements = no, dn.Interaction = Ee, dn.layouts = ni, dn.platforms = hs, dn.Scale = Bs, dn.Ticks = Os, Object.assign(dn, Rn, _a, no, Uo, hs), dn.Chart = dn, "undefined" != typeof window && (window.Chart = dn), dn;
}));
var script;
(function (script) {
    /**
     * Calculate the steam seller price <br>
     * Stolen and slightly optimized from Steams' economy_common.js
     *
     * @param amount
     * @param publisherFee
     */
    function calculateSellerPrice(amount, publisherFee) {
        if (publisherFee === void 0) { publisherFee = 0.1; }
        /**
         * Get the fees
         *
         * @param receivedAmount
         * @param publisherFee
         */
        function getFees(receivedAmount, publisherFee) {
            var _a = {
                wallet_fee_base: 0,
                wallet_fee_percent: 0.05,
                wallet_fee_minimum: 1
            }, wallet_fee_base = _a.wallet_fee_base, wallet_fee_percent = _a.wallet_fee_percent, wallet_fee_minimum = _a.wallet_fee_minimum;
            var nSteamFee = Math.floor(Math.max(receivedAmount * wallet_fee_percent, wallet_fee_minimum) + wallet_fee_base);
            var nPublisherFee = Math.floor(publisherFee > 0 ? Math.max(receivedAmount * publisherFee, 1) : 0);
            var nAmountToSend = receivedAmount + nSteamFee + nPublisherFee;
            return {
                steam_fee: nSteamFee,
                publisher_fee: nPublisherFee,
                fees: nSteamFee + nPublisherFee,
                amount: ~~nAmountToSend
            };
        }
        var _a = {
            wallet_fee_base: 0,
            wallet_fee_percent: 0.05
        }, wallet_fee_base = _a.wallet_fee_base, wallet_fee_percent = _a.wallet_fee_percent;
        // Since getFees has a Math.floor, we could be off a cent or two. Let's check:
        var iterations = 0; // shouldn't be needed, but included to be sure nothing unforeseen causes us to get stuck
        var estimatedReceivedValue = (amount - wallet_fee_base) / (wallet_fee_percent + publisherFee + 1);
        var undershot = false;
        var fees = getFees(estimatedReceivedValue, publisherFee);
        while (fees.amount != amount && iterations < 10) {
            if (fees.amount > amount) {
                if (undershot) {
                    fees = getFees(estimatedReceivedValue - 1, publisherFee);
                    fees.steam_fee += (amount - fees.amount);
                    fees.fees += (amount - fees.amount);
                    fees.amount = amount;
                    break;
                }
                else {
                    estimatedReceivedValue--;
                }
            }
            else {
                undershot = true;
                estimatedReceivedValue++;
            }
            fees = getFees(estimatedReceivedValue, publisherFee);
            iterations++;
        }
        return fees;
    }
    /**
     * Calculate the steam buyer price <br>
     * Stolen and slightly optimized from Steams' economy_common.js
     *
     * @param receivedAmount
     * @param publisherFee
     */
    function calculateBuyerPrice(receivedAmount, publisherFee) {
        if (publisherFee === void 0) { publisherFee = 0.1; }
        var _a = {
            wallet_fee_base: 0,
            wallet_fee_percent: 0.05,
            wallet_fee_minimum: 1
        }, wallet_fee_base = _a.wallet_fee_base, wallet_fee_percent = _a.wallet_fee_percent, wallet_fee_minimum = _a.wallet_fee_minimum;
        var nSteamFee = Math.floor(Math.max(receivedAmount * wallet_fee_percent, wallet_fee_minimum) + wallet_fee_base);
        var nPublisherFee = Math.floor(publisherFee > 0 ? Math.max(receivedAmount * publisherFee, 1) : 0);
        var nAmountToSend = receivedAmount + nSteamFee + nPublisherFee;
        return {
            steam_fee: nSteamFee,
            publisher_fee: nPublisherFee,
            fees: nSteamFee + nPublisherFee,
            amount: nAmountToSend
        };
    }
    /** graph stuff **/
    var valueSteps = [
        3, 4, 5, 6, 7, 8, 9, 10,
        20, 30, 40, 50, 60, 70, 80, 90, 100,
        200, 300, 400, 500, 600, 700, 800, 900, 1000,
        2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
        20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000,
        110000, 120000, 130000, 140000, 150000, 160000, 170000, 180000, 190000, 200000
    ];
    function makeSteps(values, status) {
        var amountSteps = [];
        var feeSteps = [];
        var feePercentSteps = [];
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var l_value = values_1[_i];
            var calc = calculateSellerPrice(l_value);
            amountSteps.push(calc.amount / 100);
            feeSteps.push((calc.amount - calc.fees) / 100);
            feePercentSteps.push((~~((1 - ((calc.amount - calc.fees) / calc.amount)) * 10000)) / 100);
        }
        return {
            amountSteps: {
                data: amountSteps,
                enabled: (status !== null && status !== void 0 ? status : [true])[0]
            },
            feeSteps: {
                data: feeSteps,
                enabled: (status !== null && status !== void 0 ? status : [true, true])[1]
            },
            feePercentSteps: {
                data: feePercentSteps,
                enabled: (status !== null && status !== void 0 ? status : [true, true, true])[2]
            }
        };
    }
    var target_steps = makeSteps(valueSteps);
    // console.debug(amountSteps, feeSteps);
    var options = {
        interaction: {
            mode: 'index',
            intersect: false
        }
    };
    var context_target = document.querySelector('#target').getContext('2d');
    var context_visualizer = document.querySelector('#visualizer').getContext('2d');
    function createChart(context, steps) {
        return new Chart.Chart(context, {
            type: 'line',
            data: {
                labels: steps.amountSteps.data,
                datasets: [
                    {
                        label: 'Before Fees',
                        data: steps.amountSteps.data,
                        backgroundColor: '#00cbb3',
                        hidden: !steps.amountSteps.enabled
                    },
                    {
                        label: 'After Fees',
                        data: steps.feeSteps.data,
                        backgroundColor: '#9100cb',
                        hidden: !steps.feeSteps.enabled
                    },
                    {
                        label: '% Fees',
                        data: steps.feePercentSteps.data,
                        backgroundColor: '#cb5b00',
                        hidden: !steps.feePercentSteps.enabled
                    }
                ]
            },
            options: options
        });
    }
    createChart(context_target, target_steps);
    var userChart;
    var input_buyer_price = document.querySelector('#buyer_price');
    var input_seller_gain = document.querySelector('#seller_gain');
    var span_fees = document.querySelector('#fees');
    function update(caller) {
        var val = 0;
        if (caller == 'buyer') {
            val = +input_buyer_price.value;
            if (isNaN(val) || !isFinite(val))
                return;
            if (val < 0.03)
                val = 0.03;
            if (userChart)
                userChart.destroy();
            var calc = calculateSellerPrice(~~(val * 100));
            input_seller_gain.value = "".concat((calc.amount - calc.fees) / 100);
            span_fees.innerHTML = "".concat(calc.fees / 100, " (").concat((~~((1 - ((calc.amount - calc.fees) / calc.amount)) * 10000)) / 100, "%)");
        }
        else if (caller == 'seller') {
            val = +input_seller_gain.value;
            if (isNaN(val) || !isFinite(val))
                return;
            if (val < 0.01)
                val = 0.01;
            if (userChart)
                userChart.destroy();
            var calc = calculateBuyerPrice(~~(val * 100));
            input_buyer_price.value = "".concat((calc.amount) / 100);
            span_fees.innerHTML = "".concat(calc.fees / 100, " (").concat((~~((1 - ((calc.amount - calc.fees) / calc.amount)) * 10000)) / 100, "%)");
        }
        var steps = makeSteps([
            -100, -50, -10, -5, -3, -2, -1,
            1, 2, 3, 5, 10, 50, 100
        ].map(function (x) {
            var d_value = ~~(val * 100) + x;
            if (d_value < 3)
                d_value = 3;
            return d_value;
        }), [false, false, true]);
        userChart = createChart(context_visualizer, steps);
    }
    script.update = update;
})(script || (script = {}));

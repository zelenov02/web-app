document.addEventListener("DOMContentLoaded", function () {
    var t, a, e, s = s || {};
    s.scope = {}, s.findInternal = function (t, a, e) {
        t instanceof String && (t = String(t));
        for (var s = t.length, r = 0; r < s; r++) {
            var n = t[r];
            if (a.call(e, n, r, t)) return {i: r, v: n}
        }
        return {i: -1, v: void 0}
    }, s.ASSUME_ES5 = !1, s.ASSUME_NO_NATIVE_MAP = !1, s.ASSUME_NO_NATIVE_SET = !1, s.SIMPLE_FROUND_POLYFILL = !1, s.defineProperty = s.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (t, a, e) {
        t != Array.prototype && t != Object.prototype && (t[a] = e.value)
    }, s.getGlobal = function (t) {
        return "undefined" != typeof window && window === t ? t : "undefined" != typeof global && null != global ? global : t
    }, s.global = s.getGlobal(this), s.polyfill = function (t, a, e, r) {
        if (a) {
            for (e = s.global, t = t.split("."), r = 0; r < t.length - 1; r++) {
                var n = t[r];
                n in e || (e[n] = {}), e = e[n]
            }
            (a = a(r = e[t = t[t.length - 1]])) != r && null != a && s.defineProperty(e, t, {
                configurable: !0,
                writable: !0,
                value: a
            })
        }
    }, s.polyfill("Array.prototype.find", function (t) {
        return t || function (t, a) {
            return s.findInternal(this, t, a).v
        }
    }, "es6", "es3"), t = function (t) {
        var a = function (a, e, s) {
            var r = {
                invalid: [], getCaret: function () {
                    try {
                        var t = 0, e = a.get(0), s = document.selection, n = e.selectionStart;
                        if (s && -1 === navigator.appVersion.indexOf("MSIE 10")) {
                            var i = s.createRange();
                            i.moveStart("character", -r.val().length), t = i.text.length
                        } else (n || "0" === n) && (t = n);
                        return t
                    } catch (t) {
                    }
                }, setCaret: function (t) {
                    try {
                        if (a.is(":focus")) {
                            var e = a.get(0);
                            if (e.setSelectionRange) e.setSelectionRange(t, t); else {
                                var s = e.createTextRange();
                                s.collapse(!0), s.moveEnd("character", t), s.moveStart("character", t), s.select()
                            }
                        }
                    } catch (t) {
                    }
                }, events: function () {
                    a.on("keydown.mask", function (t) {
                        a.data("mask-keycode", t.keyCode || t.which), a.data("mask-previus-value", a.val()), a.data("mask-previus-caret-pos", r.getCaret()), r.maskDigitPosMapOld = r.maskDigitPosMap
                    }).on(t.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", r.behaviour).on("paste.mask drop.mask", function () {
                        setTimeout(function () {
                            a.keydown().keyup()
                        }, 100)
                    }).on("change.mask", function () {
                        a.data("changed", !0)
                    }).on("blur.mask", function () {
                        o === r.val() || a.data("changed") || a.trigger("change"), a.data("changed", !1)
                    }).on("blur.mask", function () {
                        o = r.val()
                    }).on("focus.mask", function (a) {
                        !0 === s.selectOnFocus && t(a.target).select()
                    }).on("focusout.mask", function () {
                        s.clearIfNotMatch && !n.test(r.val()) && r.val("")
                    })
                }, getRegexMask: function () {
                    for (var t, a, s, r, n = [], o = 0; o < e.length; o++) (t = i.translation[e.charAt(o)]) ? (a = t.pattern.toString().replace(/.{1}$|^.{1}/g, ""), s = t.optional, (t = t.recursive) ? (n.push(e.charAt(o)), r = {
                        digit: e.charAt(o),
                        pattern: a
                    }) : n.push(s || t ? a + "?" : a)) : n.push(e.charAt(o).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                    return n = n.join(""), r && (n = n.replace(new RegExp("(" + r.digit + "(.*" + r.digit + ")?)"), "($1)?").replace(new RegExp(r.digit, "g"), r.pattern)), new RegExp(n)
                }, destroyEvents: function () {
                    a.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))
                }, val: function (t) {
                    var e = a.is("input") ? "val" : "text";
                    return 0 < arguments.length ? (a[e]() !== t && a[e](t), e = a) : e = a[e](), e
                }, calculateCaretPosition: function (t) {
                    var e = r.getMasked(), s = r.getCaret();
                    if (t !== e) {
                        var n = a.data("mask-previus-caret-pos") || 0;
                        e = e.length;
                        var i, o = t.length, l = t = 0, c = 0, p = 0;
                        for (i = s; i < e && r.maskDigitPosMap[i]; i++) l++;
                        for (i = s - 1; 0 <= i && r.maskDigitPosMap[i]; i--) t++;
                        for (i = s - 1; 0 <= i; i--) r.maskDigitPosMap[i] && c++;
                        for (i = n - 1; 0 <= i; i--) r.maskDigitPosMapOld[i] && p++;
                        s > o ? s = 10 * e : n >= s && n !== o ? r.maskDigitPosMapOld[s] || (n = s, s = s - (p - c) - t, r.maskDigitPosMap[s] && (s = n)) : s > n && (s = s + (c - p) + l)
                    }
                    return s
                }, behaviour: function (e) {
                    e = e || window.event, r.invalid = [];
                    var s = a.data("mask-keycode");
                    if (-1 === t.inArray(s, i.byPassKeys)) {
                        s = r.getMasked();
                        var n = r.getCaret(), o = a.data("mask-previus-value") || "";
                        return setTimeout(function () {
                            r.setCaret(r.calculateCaretPosition(o))
                        }, t.jMaskGlobals.keyStrokeCompensation), r.val(s), r.setCaret(n), r.callbacks(e)
                    }
                }, getMasked: function (t, a) {
                    var n, o = [], l = void 0 === a ? r.val() : a + "", c = 0, p = e.length, d = 0, u = l.length, m = 1,
                        k = "push", b = -1, f = 0;
                    if (a = [], s.reverse) {
                        k = "unshift", m = -1;
                        var v = 0;
                        c = p - 1, d = u - 1;
                        var _ = function () {
                            return -1 < c && -1 < d
                        }
                    } else v = p - 1, _ = function () {
                        return c < p && d < u
                    };
                    for (; _();) {
                        var h = e.charAt(c), g = l.charAt(d), y = i.translation[h];
                        y ? (g.match(y.pattern) ? (o[k](g), y.recursive && (-1 === b ? b = c : c === v && c !== b && (c = b - m), v === b && (c -= m)), c += m) : g === n ? (f--, n = void 0) : y.optional ? (c += m, d -= m) : y.fallback ? (o[k](y.fallback), c += m, d -= m) : r.invalid.push({
                            p: d,
                            v: g,
                            e: y.pattern
                        }), d += m) : (t || o[k](h), g === h ? (a.push(d), d += m) : (n = h, a.push(d + f), f++), c += m)
                    }
                    return t = e.charAt(v), p !== u + 1 || i.translation[t] || o.push(t), o = o.join(""), r.mapMaskdigitPositions(o, a, u), o
                }, mapMaskdigitPositions: function (t, a, e) {
                    for (t = s.reverse ? t.length - e : 0, r.maskDigitPosMap = {}, e = 0; e < a.length; e++) r.maskDigitPosMap[a[e] + t] = 1
                }, callbacks: function (t) {
                    var n = r.val(), i = n !== o, l = [n, t, a, s], c = function (t, a, e) {
                        "function" == typeof s[t] && a && s[t].apply(this, e)
                    };
                    c("onChange", !0 === i, l), c("onKeyPress", !0 === i, l), c("onComplete", n.length === e.length, l), c("onInvalid", 0 < r.invalid.length, [n, t, a, r.invalid, s])
                }
            };
            a = t(a);
            var n, i = this, o = r.val();
            e = "function" == typeof e ? e(r.val(), void 0, a, s) : e, i.mask = e, i.options = s, i.remove = function () {
                var t = r.getCaret();
                return i.options.placeholder && a.removeAttr("placeholder"), a.data("mask-maxlength") && a.removeAttr("maxlength"), r.destroyEvents(), r.val(i.getCleanVal()), r.setCaret(t), a
            }, i.getCleanVal = function () {
                return r.getMasked(!0)
            }, i.getMaskedVal = function (t) {
                return r.getMasked(!1, t)
            }, i.init = function (o) {
                if (o = o || !1, s = s || {}, i.clearIfNotMatch = t.jMaskGlobals.clearIfNotMatch, i.byPassKeys = t.jMaskGlobals.byPassKeys, i.translation = t.extend({}, t.jMaskGlobals.translation, s.translation), i = t.extend(!0, {}, i, s), n = r.getRegexMask(), o) r.events(), r.val(r.getMasked()); else {
                    s.placeholder && a.attr("placeholder", s.placeholder), a.data("mask") && a.attr("autocomplete", "off"), o = 0;
                    for (var l = !0; o < e.length; o++) {
                        var c = i.translation[e.charAt(o)];
                        if (c && c.recursive) {
                            l = !1;
                            break
                        }
                    }
                    l && a.attr("maxlength", e.length).data("mask-maxlength", !0), r.destroyEvents(), r.events(), o = r.getCaret(), r.val(r.getMasked()), r.setCaret(o)
                }
            }, i.init(!a.is("input"))
        };
        t.maskWatchers = {};
        var e = function () {
            var e = t(this), r = {}, n = e.attr("data-mask");
            if (e.attr("data-mask-reverse") && (r.reverse = !0), e.attr("data-mask-clearifnotmatch") && (r.clearIfNotMatch = !0), "true" === e.attr("data-mask-selectonfocus") && (r.selectOnFocus = !0), s(e, n, r)) return e.data("mask", new a(this, n, r))
        }, s = function (a, e, s) {
            s = s || {};
            var r = t(a).data("mask"), n = JSON.stringify;
            a = t(a).val() || t(a).text();
            try {
                return "function" == typeof e && (e = e(a)), "object" != typeof r || n(r.options) !== n(s) || r.mask !== e
            } catch (t) {
            }
        }, r = function (t) {
            var a = document.createElement("div"), e = (t = "on" + t) in a;
            return e || (a.setAttribute(t, "return;"), e = "function" == typeof a[t]), e
        };
        t.fn.mask = function (e, r) {
            r = r || {};
            var n = this.selector, i = t.jMaskGlobals, o = i.watchInterval;
            i = r.watchInputs || i.watchInputs;
            var l = function () {
                if (s(this, e, r)) return t(this).data("mask", new a(this, e, r))
            };
            return t(this).each(l), n && "" !== n && i && (clearInterval(t.maskWatchers[n]), t.maskWatchers[n] = setInterval(function () {
                t(document).find(n).each(l)
            }, o)), this
        }, t.fn.masked = function (t) {
            return this.data("mask").getMaskedVal(t)
        }, t.fn.unmask = function () {
            return clearInterval(t.maskWatchers[this.selector]), delete t.maskWatchers[this.selector], this.each(function () {
                var a = t(this).data("mask");
                a && a.remove().removeData("mask")
            })
        }, t.fn.cleanVal = function () {
            return this.data("mask").getCleanVal()
        }, t.applyDataMask = function (a) {
            ((a = a || t.jMaskGlobals.maskElements) instanceof t ? a : t(a)).filter(t.jMaskGlobals.dataMaskAttr).each(e)
        }, r = {
            maskElements: "input,td,span,div",
            dataMaskAttr: "*[data-mask]",
            dataMask: !0,
            watchInterval: 300,
            watchInputs: !0,
            keyStrokeCompensation: 10,
            useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && r("input"),
            watchDataMask: !1,
            byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
            translation: {
                0: {pattern: /\d/},
                9: {pattern: /\d/, optional: !0},
                "#": {pattern: /\d/, recursive: !0},
                A: {pattern: /[a-zA-Z0-9]/},
                S: {pattern: /[a-zA-Z]/}
            }
        }, t.jMaskGlobals = t.jMaskGlobals || {}, (r = t.jMaskGlobals = t.extend(!0, {}, r, t.jMaskGlobals)).dataMask && t.applyDataMask(), setInterval(function () {
            t.jMaskGlobals.watchDataMask && t.applyDataMask()
        }, r.watchInterval)
    }, a = window.jQuery, e = window.Zepto, "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports && "undefined" == typeof Meteor ? module.exports = t(require("jquery")) : t(a || e)
}), document.addEventListener("DOMContentLoaded", function () {
    var t, a, e;
    t = jQuery, a = {
        productElement: "product__element",
        buttonAddToBasket: "product__add-to-cart-button",
        countryCode: "+38",
        smartBasketCurrency: "₴",
        productQuantityWrapper: !1,
        productPrice: !1,
        productSize: !1,
        smartBasketMinArea: "header__basket-min",
        smartBasketMinIconPath: "/smartbasket/img/shopping-basket-wight.svg",
        smartBasketMinText: !1,
        telIsRequired: !0,
        emailIsRequired: !1,
        nameIsRequired: !0,
        localStorageName: "basketItems",
        yaCounter: {counterID: "", targetID: ""}
    }, e = {
        getProducts: function () {
            return JSON.parse(localStorage.getItem(a.localStorageName))
        }, setProducts: function (t) {
            let e = JSON.stringify(t, "", 4);
            return localStorage.setItem(a.localStorageName, e), !1
        }, deleteProducts: function (a, s) {
            let r = t("<button>").attr({class: "smart-basket__product-delete"}).html('<span class="smart-basket__delete-icon">×</span>');
            return r.click(function (r) {
                r.preventDefault();
                let n = t(this).data("sbProductDelete");
                delete a[n], e.setProducts(a), t(this).parents("." + s.attr("class")).remove(), e.getSmartBasketMinState(a, "updateSmartBasketMin"), e.commonResult(a, "updateCommonResult")
            }), r
        }, showProducts: function (s) {
            let r = t("<form>").attr({
                    class: "smart-basket__form",
                    method: "POST",
                    id: "smart-basket__form",
                    enctype: "multipart/form-data",
                    action: 'telegram_order.php'
                }),
                n = t("<div>").attr({class: "smart-basket__product-item"}),
                i = t("<div>").attr({class: "smart-basket__product-id"}).text("ID"),
                o = t("<div>").attr({class: "smart-basket__product-name"}).text("Товар"),
                l = t("<div>").attr({class: "smart-basket__product-quantity smart-basket__product-quantity_header"}).text("Кол-во"),
                c = t("<span>").attr({class: "smart-basket__info-icon"}).text("?"),
                p = t("<button>").attr({class: "smart-basket__info-msgs-close"}).text("×"),
                d = t("<span>").attr({class: "smart-basket__info-msgs"}).html("Цена за 1 товар или услугу").append(p),
                u = t("<div>").attr({class: "smart-basket__product-price"}).html(`Цена / ${a.smartBasketCurrency}`).append(c).append(d);
            c.click(() => {
                d.fadeToggle()
            }), p.click(t => {
                t.preventDefault(), d.fadeToggle()
            });
            let m = t("<div>").attr({class: "smart-basket__product-price-common"}).html(`Общая цена / ${a.smartBasketCurrency}`),
                k = t("<div>").attr({class: "smart-basket__product-delete"}).text("Удалить");
            n.append(o).append(i).append(u).append(l).append(m).append(k), r.append(n);
            for (let n in s) {
                let i = t("<div>").attr({class: "smart-basket__product-item"}),
                    o = t("<div>").attr({class: "smart-basket__product-id"}),
                    l = t("<input>").attr({class: "smart-basket__input", type: "hidden"}),
                    c = t("<div>").attr({class: "smart-basket__product-name"}),
                    p = t("<input>").attr({class: "smart-basket__input", type: "hidden"}),
                    d = t("<input>").attr({class: "smart-basket__input", type: "hidden"}),
                    u = t("<input>").attr({class: "smart-basket__input", type: "hidden"}),
                    m = t("<div>").attr({class: "smart-basket__product-quantity"}),
                    k = t("<input>").attr({class: "smart-basket__input", type: "hidden"}),
                    b = t("<button>").attr({class: "smart-basket__add-item"}).text("+"),
                    f = t("<button>").attr({class: "smart-basket__remove-item"}).text("-"), v = t("<input>").attr({
                        class: "smart-basket__product-quantity-state",
                        type: "number",
                        min: "1",
                        step: "1",
                        pattern: "^[0-9]"
                    });
                a.productQuantityWrapper || (b.attr({disabled: "disabled"}), f.attr({disabled: "disabled"}), v.attr({disabled: "disabled"})), m.append(f).append(v).append(b);
                let _ = t("<div>").attr({class: "smart-basket__product-price"}),
                    h = t("<input>").attr({class: "smart-basket__input", type: "hidden"}),
                    g = t("<div>").attr({class: "smart-basket__product-price-common"}),
                    y = t("<input>").attr({class: "smart-basket__input"}), M = e.deleteProducts(s, i);
                for (let a in s[n]) {
                    if ("sbId" === a && (o.html(s[n][a]), l.val(s[n][a]), p.attr({name: s[n][a] + "[productName]"}), d.attr({name: s[n][a] + "[productSize]"}), l.attr({name: s[n][a] + "[productId]"}), k.attr({name: s[n][a] + "[productQuantity]"}), v.attr({"data-sb-id": s[n][a]}), b.attr({"data-sb-id": s[n][a]}), f.attr({"data-sb-id": s[n][a]}), h.attr({name: s[n][a] + "[productPrice]"}), y.attr({name: s[n][a] + "[productPriceCommon]"}), u.attr({name: s[n][a] + "[productImg]"}), M.attr({"data-sb-product-delete": s[n][a]})), "sbImg" === a) {
                        let e = t("<img>").attr({src: s[n][a], width: 60});
                        u.val(s[n][a]), c.append(e)
                    }
                    if ("sbName" === a && (c.append(`<span>${s[n][a]}</span>`), p.val(s[n][a])), "sbSize" === a && void 0 !== s[n][a] && (c.children("span").append(`<span class="smart-basket__product-size"> Размер: ${s[n][a]}</span>`), d.val(s[n][a])), "sbPrice" === a && (_.html(s[n][a]), h.val(s[n][a])), "sbPriceCommon" === a) {
                        let t = +s[n][a];
                        y.val(+t.toFixed(2))
                    }
                    "sbQuantity" === a && (v.val(s[n][a]), k.val(s[n][a]))
                }
                f.click(function (a) {
                    a.preventDefault();
                    let r = t(this).data("sbId"), n = +v.val(), i = +h.val(), o = i * n;
                    n > 1 && (o = i * --n, k.val(n), e.updateBasket(s, r, n, o), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.commonResult(s, "updateCommonResult")), h.val(i), y.val(+o.toFixed(2)), v.val(n)
                }), b.click(function (a) {
                    a.preventDefault();
                    let r = t(this).data("sbId"), n = +v.val(), i = +h.val(), o = i * n;
                    n >= 1 ? (o = i * ++n, k.val(n), e.updateBasket(s, r, n, o), e.getSmartBasketMinState(s, "updateSmartBasketMin"), e.commonResult(s, "updateCommonResult")) : n = 1, h.val(i), y.val(+o.toFixed(2)), v.val(n)
                }), o.append(l), c.append(u), c.append(p), c.append(d), m.append(k), _.append(h), g.append(y), r.append(i.append(c).append(o).append(_).append(m).append(g).append(M))
            }
            return r.append(e.commonResult(s)), r.append(e.userForm()), r
        }, stateBasket: function () {
            let s, r, n, i, o = e.getProducts() || {}, l = t("<div>").attr({class: "smart-basket"}),
                c = t("." + a.buttonAddToBasket);
            if (localStorage.getItem(a.localStorageName), l.append(e.showProducts(o)), a.productQuantityWrapper) {
                const e = t("<div>").attr({class: "smart-basket__quantity-item"});
                let o = t("<button>").attr({class: "smart-basket__add-item"}).html("+"),
                    l = t("<button>").attr({class: "smart-basket__remove-item"}).html("-");
                s = t("<input>").attr({
                    class: "smart-basket__product-quantity-state",
                    min: "1",
                    step: "1",
                    pattern: "^[0-9]",
                    value: "1"
                }), e.append(l).append(s).append(o), o.click(function (e) {
                    e.preventDefault(), r = t(this).parents("." + a.productElement).find("." + s.attr("class")), n = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket), (i = +t(this).parents("." + a.productElement).find("." + s.attr("class")).val()) >= 1 ? (i++, r.val(i), n.attr("data-sb-product-quantity", i)) : (r.val(1), n.attr("data-sb-product-quantity", 1))
                }), l.click(function (e) {
                    e.preventDefault(), r = t(this).parents("." + a.productElement).find("." + s.attr("class")), n = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket), (i = +t(this).parents("." + a.productElement).find("." + s.attr("class")).val()) > 1 ? (i--, r.val(i), n.attr("data-sb-product-quantity", i)) : (r.val(1), n.attr("data-sb-product-quantity", 1))
                }), t("." + a.productQuantityWrapper).append(e)
            }
            if (a.productSize && a.productPrice) {
                let e = t("." + a.productSize);
                t("." + a.productElement).find("." + a.productSize + ":first-child").addClass(a.productSize + "_active"), e.click(function (e) {
                    e.preventDefault(), t(this).parents("." + a.productElement).find("." + a.productSize).removeClass(a.productSize + "_active"), t(this).addClass(a.productSize + "_active");
                    let s = t(this).parents("." + a.productElement).find("." + a.buttonAddToBasket),
                        r = t(this).parents("." + a.productElement).find("." + a.productPrice),
                        n = t(this).attr("data-sb-curent-size");
                    console.log(n);
                    let i = t(this).attr("data-sb-curent-price"), o = t(this).attr("data-sb-curent-id-or-vendor-code");
                    console.log(o), s.attr({
                        "data-sb-product-price": i,
                        "data-sb-product-size": n,
                        "data-sb-id-or-vendor-code": o
                    }), r.html(i)
                })
            } else console.log("Заполните параметры productSize и productPrice");
            return e.getSmartBasketMinState(o), c.click(function () {
                let r = e.getProducts() || {}, n = t(this).attr("data-sb-id-or-vendor-code");
                if (void 0 !== r[n]) {
                    let a = t(this).html();
                    return t(this).text("Товар уже в корзине"), t("body").append(e.alertBlock("alreadyAdded")), setTimeout(() => {
                        t(this).html(a)
                    }, 1500), !1
                }
                {
                    let i = {};
                    i.sbId = n, i.sbImg = t(this).data("sbProductImg"), i.sbName = t(this).data("sbProductName"), a.productSize && a.productPrice && (i.sbSize = t(this).attr("data-sb-product-size")), i.sbQuantity = a.productQuantityWrapper ? t(this).parents("." + a.productElement).find("." + s.attr("class")).val() : +t(this).data("sbProductQuantity"), i.sbPrice = +t(this).attr("data-sb-product-price"), i.sbPrice.toFixed(2), a.productQuantityWrapper ? (i.sbPriceCommon = +t(this).attr("data-sb-product-price") * t(this).parents("." + a.productElement).find("." + s.attr("class")).val(), i.sbPriceCommon.toFixed(2)) : (i.sbPriceCommon = +t(this).attr("data-sb-product-price") * +t(this).data("sbProductQuantity"), i.sbPriceCommon.toFixed(2)), r[n] = i, e.setProducts(r), l.empty(), l.append(e.showProducts(r)), e.getSmartBasketMinState(r, "updateSmartBasketMin"), e.commonResult(r, "updateCommonResult"), t("body").append(e.alertBlock("inBasket"))
                }
            }), l
        }, commonResult: function (e, s, r) {
            let n = 0, i = 0,
                o = t("<div>").attr({class: "smart-basket__empty-title"}).text("Корзина пуста. Вы не добавили ни одного товара").fadeOut(),
                l = t("<div>").attr({class: "smart-basket__success-title"}).text("Заказ принят. Ожидайте звонка").css("display", "none"),
                c = t("<div>").attr({class: "smart-basket__result-common"}),
                p = t("<div>").attr({class: "smart-basket__price-common"}),
                d = t("<div>").attr({class: "smart-basket__quantity-common"});
            for (let t in e) for (let a in e[t]) "sbQuantity" === a && (n += +e[t][a]), "sbPriceCommon" === a && (i += +e[t][a]);
            if (0 == +n ? o.fadeIn() : o.fadeOut(), r) t("." + l.attr("class")).css("display", "block"), setTimeout(() => {
                t("." + l.attr("class")).css("display", "none"), t("." + o.attr("class")).css("display", "block")
            }, 3e3); else {
                if (!s) return d.html(`<span>Всего товаров: </span> ${n}`), p.html(`<span>Общая стоимость: </span> <input name="finalPrice" class="smart-basket__total-cost" type="text" value="${i.toFixed(2)} ${a.smartBasketCurrency}">`), c.append(o).append(l).append(d).append(p), c;
                0 == +n && t("." + o.attr("class")).css("display", "block"), t("." + d.attr("class")).html("<span>Всего товаров: </span> "), t("." + d.attr("class")).html(`<span>Всего товаров: </span> ${n}`), t("." + p.attr("class")).html("<span>Общая стоимость: </span> "), t("." + p.attr("class")).html(`<span>Общая стоимость: </span> <input name="finalPrice" class="smart-basket__total-cost" type="text" value="${i.toFixed(2)} ${a.smartBasketCurrency}">`)
            }
        }, getSmartBasketMinState: function (s, r) {
            let n = 0;
            for (let t in s) for (let a in s[t]) "sbQuantity" === a && (n += +s[t][a]);
            let i = t("<button>").attr({class: "smart-basket__min"});
            a.smartBasketMinText && i.prepend(`<span class="smart-basket__min-text">${a.smartBasketMinText}</span> `);
            let o = t("<img>").attr({
                class: "smart-basket__min-icon",
                src: a.smartBasketMinIconPath,
                width: 18,
                alt: "Корзина"
            }), l = t("<span>").attr({class: "smart-basket__min-count"});
            r ? (t("." + l.attr("class")).html(""), t("." + l.attr("class")).html(n)) : (l.html(n), t("." + a.smartBasketMinArea).append(i.append(o).append(l))), e.getModalBasket(i, s)
        }, updateBasket: function (t, a, s, r) {
            let n = 0, i = 0;
            for (let o in t) {
                if (o === a) {
                    let n = 0, i = {};
                    for (let a in t[o]) i.sbId = t[o].sbId, i.sbImg = t[o].sbImg, i.sbName = t[o].sbName, i.sbSize = t[o].sbSize, i.sbPrice = t[o].sbPrice, "sbPriceCommon" == a && (i.sbPriceCommon = r.toFixed(2)), "sbQuantity" == a && (i.sbQuantity = s, n += s);
                    t[a] = i, e.setProducts(t)
                }
                for (let a in t[o]) "sbQuantity" === a && (n += t[o][a]), "sbPriceCommon" === a && (i += +t[o][a])
            }
        }, userForm: function () {
            let s = t("<div>").attr({class: "smart-basket__user-form"}),
                r = t("<div>").attr({class: "smart-basket__user-info"}),
                n = t("<div>").attr({class: "smart-basket__input-wrapper"}), i = t("<input>").attr({
                    class: "smart-basket__user-input",
                    type: "text",
                    placeholder: "Введите имя",
                    name: "userName",
                    required: !0
                });
            n.append(i);
            let o = t("<div>").attr({class: "smart-basket__input-wrapper"}), l = t("<input>").attr({
                class: "smart-basket__user-input",
                type: "tel",
                placeholder: "Введите телефон",
                name: "userTel",
                required: a.telIsRequired
            }).mask(a.countryCode + "(000)000-00-00");
            o.append(l);
            let c = t("<div>").attr({class: "smart-basket__input-wrapper"}), p = t("<input>").attr({
                class: "smart-basket__user-input",
                type: "email",
                placeholder: "Введите e-mail",
                name: "userEmail",
                required: a.emailIsRequired
            });
            if (c.append(p), a.agreement.isRequired) {
                var d = t("<div>").attr({class: "smart-basket__agreement-wrapper"});
                let e = t("<label>").attr({
                    class: "smart-basket__label-agreement",
                    for: "smart-basket__input-agreement"
                }), s = t("<input>").attr({
                    type: "checkbox",
                    name: "agreement",
                    class: "smart-basket__input-agreement",
                    id: "smart-basket__input-agreement",
                    checked: a.agreement.isChecked,
                    value: "Я принимаю условия пользовательского соглашения"
                }), r = null;
                r = a.agreement.isLink ? t("<a>").attr({
                    class: "smart-basket__link-agreement",
                    href: a.agreement.isLink,
                    target: "_blank",
                    rel: "nofollow"
                }) : t("<span>").attr({class: "smart-basket__link-agreement"}), s.is(":checked") ? r.text("Я принимаю условия пользовательского соглашения") : r.text("Я не принимаю условия пользовательского соглашения"), e.click(function () {
                    s.is(":checked") ? (r.text("Я не принимаю условия пользовательского соглашения"), s.val("Я не принимаю условия пользовательского соглашения"), m.attr({disabled: "disabled"}), d.addClass("smart-basket__input-wrapper_error")) : (r.text("Я принимаю условия пользовательского соглашения"), s.val("Я принимаю условия пользовательского соглашения"), m.attr({disabled: !1}), d.removeClass("smart-basket__input-wrapper_error"))
                }), d.append(s).append(e).append(r)
            }
            let u = t("<button>").attr({class: "smart-basket__close-form"}).text("Продолжить покупки");
            e.closeModalBasket(u);
            let m = t("<button>").attr({
                class: "smart-basket__send-form",
                form: "smart-basket__form",
                type: "submit"
            }).text("Сделать заказ"), k = t("<div>").attr({class: "smart-basket__footer"});
            r.append(n).append(o).append(c), a.agreement.isChecked && r.append(d), k.append(u).append(m), s.append(r).append(k), m.click(function (t) {
                t.preventDefault();
                let s = e.getProducts() || {};

                function r(t) {
                    for (let a in t) return !1;
                    return !0
                }

                if (a.nameIsRequired && a.telIsRequired && a.emailIsRequired) {
                    if ("" === l.val() || "" === i.val() || "" === p.val() || r(s)) return "" === l.val() && l.parent().addClass("smart-basket__input-wrapper_error"), "" === i.val() && i.parent().addClass("smart-basket__input-wrapper_error"), "" === p.val() && p.parent().addClass("smart-basket__input-wrapper_error"), !1;
                    e.sendCart()
                } else if (a.telIsRequired || a.emailIsRequired) {
                    if ("" === i.val() || !("" !== l.val() && a.telIsRequired || "" !== p.val() && a.emailIsRequired) || r(s)) return "" === l.val() && a.telIsRequired && l.parent().addClass("smart-basket__input-wrapper_error"), "" === p.val() && a.emailIsRequired && p.parent().addClass("smart-basket__input-wrapper_error"), "" === i.val() && i.parent().addClass("smart-basket__input-wrapper_error"), !1;
                    e.sendCart()
                }
            });
            let b = a => {
                a.focus(function () {
                    t(this).parent().addClass("smart-basket__input-wrapper_focus")
                }), a.blur(function () {
                    t(this).parent().removeClass("smart-basket__input-wrapper_focus"), "" === this.value && t(this).parent().addClass("smart-basket__input-wrapper_error")
                }), a.parent().on("input", function () {
                    t(this).removeClass("smart-basket__input-wrapper_error")
                }), a.change(function () {
                    t(this).parent().removeClass("smart-basket__input-wrapper_error"), t(this).parent().addClass("smart-basket__input-wrapper_focus")
                })
            };
            return b(i), a.telIsRequired && b(l), a.emailIsRequired && b(p), s
        }, getModalBasket: function (a, s) {
            e.commonResult(s, "updateCommonResult"), a.click(a => {
                a.preventDefault(), t(".smart-basket").toggleClass("smart-basket_active"), t("body").css("overflow", "hidden")
            })
        }, closeModalBasket(a) {
            a.click(a => {
                a.preventDefault(), t(".smart-basket").toggleClass("smart-basket_active"), t("body").css("overflow", "auto")
            })
        }, sendCart: function () {
            let s = t("#smart-basket__form")[0], r = new FormData(s);
            t.ajax({
                url: "telegram_order.php",
                type: "POST",
                data: r,
                processData: !1,
                contentType: !1,
                beforeSend: function () {
                },
                success: function (t) {
                },
                complete: function (s) {
                    t(".smart-basket__product-item:not(:first)").remove();
                    let r = e.getProducts() || {};
                    e.commonResult(r, "", "submitEvent"), localStorage.clear(), "" !== a.yaCounter.counterID && "" !== a.yaCounter.targetID && ym(a.yaCounter.counterID, "reachGoal", a.yaCounter.targetID), setTimeout(() => {
                        t(".smart-basket").toggleClass("smart-basket_active"), t("body").css("overflow", "auto")
                    }, 3e3), setTimeout(() => {
                        r = e.getProducts() || {}, e.commonResult(r, "updateCommonResult"), e.getSmartBasketMinState(r, "updateSmartBasketMin"), e.showProducts(r)
                    }, 4e3)
                }
            })
        }, alertBlock: function (a) {
            let s = t("<div>").attr({class: "smart-basket__alert-wrapper"}),
                r = t("<div>").attr({class: "smart-basket__alert"}),
                n = t("<div>").attr({class: "smart-basket__alert-icon"}),
                i = t("<div>").attr({class: "smart-basket__alert-text"}),
                o = t("<div>").attr({class: "smart-basket__alert-footer"}),
                l = t("<button>").attr({class: "smart-basket__alert-button smart-basket__alert-button_close"}).text("Продолжить покупки"),
                c = t("<button>").attr({class: "smart-basket__alert-button smart-basket__alert-button_by"}).text("В корзину");
            l.click(function () {
                t(this).parents("." + s.attr("class")).remove()
            }), c.click(function () {
                t(this).parents("." + s.attr("class")).remove()
            });
            let p = e.getProducts() || {};
            return e.getModalBasket(c, p), "inBasket" === a && (n.html('\n\t\t\t\t<svg class="" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">\n         <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>\n         <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>\n\t\t\t\t</svg>'), i.text("Товар добавлен в корзину")), "alreadyAdded" === a && (n.html('\n\t\t\t\t<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">\n          <circle class="path circle" fill="none" stroke="#D06079" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>\n          <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3"/>\n          <line class="path line" fill="none" stroke="#D06079" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2"/>\n\t\t\t\t</svg>\n\t\t\t\t'), i.append("Товар уже добавлен в корзину")), o.append(l).append(c), s.append(r.append(n).append(i).append(o)), s
        }, init: function (s) {
            t.extend(a, s);
            return this.each(function () {
                t(this).append(e.stateBasket())
            })
        }
    }, t.fn.smbasket = function (a) {
        return e[a] ? e[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void t.error("Метод " + a + " не найден") : e.init.apply(this, arguments)
    }
});
function u(){};
function A(a,b,c){}
new A(1,2,3); 

! function(e, o) {
    "function" == typeof define && define.amd ? define("organisms/modal/js/modal", ["jquery", "tcom"], function(t, n) {
        return e.tcom.ui.Modal = o(t, n)
    }) : e.tcom.ui.Modal = o(e.jQuery, e.tcom)
}(this, function(e, o) {
    var t, n, a, l, s, i;
    return t = function(e) {
        return e.partials["organisms/modal/tpl/modal-wrapper"] = e.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, o, t, n) {
                return '<div class="tcom-modal-wrapper">\n    <div class="tcom-modal-content tcom-modal-body"></div>\n    <div class="tcom-modal-fixed-content"></div>\n</div>\n'
            },
            useData: !0
        })
    }(Handlebars), n = function(e) {
        return e.partials["organisms/modal/tpl/modal-close-button"] = e.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, o, t, n) {
                var a;
                return '<div><button class="btn-close text"><span class="close-text">' + this.escapeExpression((a = null != (a = o.closeBtnTitle || (null != e ? e.closeBtnTitle : e)) ? a : o.helperMissing, "function" == typeof a ? a.call(e, {
                    name: "closeBtnTitle",
                    hash: {},
                    data: n
                }) : a)) + '</span><svg class="tcom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 45 45" enable-background="new 0 0 45 45" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" points="29.364,18.05 27.95,16.635 23,21.585 18.05,16.635 16.636,18.05 21.586,23 16.636,27.949 18.051,29.363 23,24.414 27.95,29.363 29.364,27.949 24.415,23 "/></svg></button></div>\n'
            },
            useData: !0
        })
    }(Handlebars), a = function(e) {
        return e.partials["organisms/modal/tpl/modal-close-icon"] = e.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, o, t, n) {
                return '<i class="icon-ui-modal-close">&nbsp;</i>\n'
            },
            useData: !0
        })
    }(Handlebars), l = function(e) {
        return e.partials["organisms/modal/tpl/modal-done-button"] = e.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, o, t, n) {
                var a;
                return '<button class="tcom-btn tcom-btn-one tcom-modal-done-btn">\n    ' + this.escapeExpression((a = null != (a = o.buttonTitle || (null != e ? e.buttonTitle : e)) ? a : o.helperMissing, "function" == typeof a ? a.call(e, {
                    name: "buttonTitle",
                    hash: {},
                    data: n
                }) : a)) + "\n</button>\n"
            },
            useData: !0
        })
    }(Handlebars), s = function(e, o, t, n, a, l) {
        var s, i = window.TCOM,
            d = o._,
            c = o.dom,
            m = c.$window,
            r = (c.$document, e("body")),
            p = "en",
            u = function() {
                var c = "es" === p ? "CERRAR" : "CLOSE",
                    u = "es" === p ? "HECHO" : "DONE";
                return d.extend(this, {
                    $modal: e(),
                    template: t(),
                    closeTemplate: n({
                        closeBtnTitle: c
                    }),
                    doneTemplate: l({
                        buttonTitle: u
                    }),
                    closeIconFont: a(),
                    defaults: {
                        "class": !1,
                        closeButton: !0,
                        headTemplate: !1,
                        fixedHeader: !1,
                        minWidth: !1,
                        maxWidth: !1,
                        overlay: !0,
                        callback: null,
                        title: !1,
                        fullscreen: !1,
                        exclusive: !0,
                        openInExisting: !1,
                        hash: "",
                        transitionClass: "zoomIn"
                    },
                    noHeaderFormTypes: ["REQUEST_QUOTE", "CONTACT_DEALER", "INVENTORY_SEARCH", "REQUEST_QUOTE_EFC", "REQUEST_QUOTE_CONFIGURED", "LOCALSPECIALS"],
                    initialize: function(t) {
                        var n = this;
                        this.$el = t.clone ? t.el.clone() : t.el, o.pubsub.publish("tcom.ui.modal.before"), n.settings = d.extend({}, n.defaults, t), n.eventNamespace = n.guid(), n.settings.doneCTA && (n.settings.doneTemplate = n.doneTemplate), n.settings.closeTemplate || (n.settings.closeTemplate = n.closeTemplate), n.render(), o.pubsub.publish("tcom.ui.modal.init"), e.isFunction(n.settings.callback) && (n.settings.callback(), o.pubsub.publish("tcom.ui.modal.done"))
                    },
                    guid: function() {
                        function e() {
                            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                        }
                        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
                    },
                    render: function() {
                        var t, n, a, l = this,
                            c = "",
                            p = e(".tcom-modal"),
                            u = l.settings.fixedHeader ? " is-fixed" : "";
                        n = l.settings.doneCTA ? l.settings.doneTemplate : l.settings.closeButton ? '<div class="tcom-modal-close-wrapper"><div class="tcom-modal-close" data-role="close-modal">' + l.settings.closeTemplate + "</div></div>" : "", l.settings.headTemplate ? c = '<div class="tcom-modal-header' + u + '">' + l.settings.headTemplate + "</div>" : !d.contains(l.noHeaderFormTypes, l.settings.type) && l.settings.title && (c = '<div class="tcom-modal-header' + u + '"><h2>' + l.settings.title + "</h2>", c += l.settings.subtitle ? "<h3>" + l.settings.subtitle + "</h3>" : "", c += "</div>");
                        var f = e(c);
                        p.length && l.settings.openInExisting ? (l.$modal = p, t = e(l.template), t.addClass(l.settings.transitionClass), t.prepend(n, f).find(".tcom-modal-content").append(l.$el), l.settings.className && t.addClass(l.settings.className), t.appendTo(l.$modal)) : (l.$modal = e('<div class="tcom-modal">' + l.template + '<div class="tcom-modal-overlay" data-role="close-modal"></div></div>'), t = l.$modal.find(".tcom-modal-wrapper"), t.addClass(l.settings.transitionClass), t.prepend(n, c).find(".tcom-modal-content").append(l.$el), l.settings.className && t.addClass(l.settings.className), s = e(window).scrollTop(), r.css("width", i.width + "px").append(l.$modal).addClass("tcom-modal-is-on"), l.setEvents()), l.settings.fullscreen && t.addClass("is-fullscreen"), a = t && t.find(".tcom-modal-content"), a && a.length && a.on("scroll", d.throttle(function() {
                            var e = a.scrollTop(),
                                t = l.settings.className ? "modal:scrolling:" + l.settings.className.replace(/\W/gi, "") : "modal:scrolling";
                            o.pubsub.publish(t, [e])
                        }, 16)), d.delay(function() {
                            l.$el.show(), l.$modal.addClass("is-on"), l.$modal.data("modal", l), t.addClass("is-on"), m.one("resizing.tcomModal", function() {
                                i.$body.css("width", "")
                            }), o.pubsub.publish("tcom.ui.modal.open")
                        }, 20)
                    },
                    setEvents: function() {
                        var t = this;
                        o.pubsub.subscribe("tcom.ui.modal.close.tcomModal", e.proxy(t.close, t)), t.$modal.on("click.tcomModal", '[data-role="close-modal"]', e.proxy(t.onCloseClick, t)), t.$modal.on("click.tcomModal", ".tcom-modal-done-btn", e.proxy(t.onDoneClick, t)), m.on("keydown." + t.eventNamespace, e.proxy(t.onKeyDown, t))
                    },
                    setTitle: function(e) {
                        this.$el.find(".tcom-modal-header").text(e)
                    },
                    onKeyDown: function(o) {
                        var t = 27;
                        if (o.keyCode === t) {
                            var n = e(".tcom-modal:last-of-type");
                            this.$el.trigger("modal.closeescape"), d.defer(function() {
                                n.data("modal").close()
                            })
                        }
                    },
                    onDoneClick: function(o) {
                        var t = this,
                            n = e(o.currentTarget);
                        o.preventDefault(), t.$el.trigger("modal.doneclick", {
                            title: n.text().trim()
                        }), t.close()
                    },
                    onCloseClick: function(o) {
                        var t = this;
                        o && (o.stopPropagation(), o.preventDefault()), e("html, body").animate({
                            scrollTop: s
                        }, 10), t.$modal.trigger("modal:closebutton"), t.close()
                    },
                    close: function() {
                        var t = this,
                            n = t.$modal.find(".tcom-modal-wrapper"),
                            a = n.last();
                        t.settings.preserveElement && t.$el.appendTo("body"), e("body > .popover").remove(), a.removeClass("is-on").each(function() {
                            var o = e(this);
                            d.delay(function() {
                                o.remove()
                            }, 1200)
                        }), n.length <= 1 && (t.$modal.off(".tcomModal"), o.pubsub.unsubscribe(".tcomModal"), m.off(".tcomModal"), t.$modal.removeClass("is-on").each(function() {
                            var o = e(this);
                            d.delay(function() {
                                o.remove(), e(".tcom-modal.is-on").length || r.removeClass("tcom-modal-is-on modal-app-is-on").css("width", "")
                            }, 1500)
                        }), t.$modal = e(), e(".tcom-modal.is-on").length || r.removeClass("tcom-modal-is-on modal-app-is-on").css("width", ""), o.pubsub.publish("tcom.ui.modal.close")), m.off("keydown." + t.eventNamespace), t.$el.trigger("modal.close")
                    }
                })
            };
        return e.isFunction(e.fn.tcomModal) === !1 && (e.fn.tcomModal = function(o) {
            var t = this,
                n = e.extend({
                    el: t
                }, o),
                a = new u(n);
            return a.initialize(n), a
        }), u
    }(e, o, t, n, a, l), i = function(e, o) {
        var t, n = o.util,
            a = o.ui,
            l = function(t) {
                var n = this;
                l.superclass.constructor.call(n, t), n._proxiedHandleEvent = e.proxy(n._handleEvent, n), o.pubsub.subscribe("tcom.window.resize", n._proxiedHandleEvent), o.pubsub.subscribe("tcom.ui.modal.close", function(e, t) {
                    o.dom.$body.find("footer").show()
                })
            };
        return t = l.events = {
            CLOSE: "modal.close",
            CLOSE_ESC: "modal.close_escape",
            CLOSE_BTN: "modal.close_btn",
            SHOW: "modal.show",
            DONE: "modal.done"
        }, n.inherits(l, a.Component), l.prototype.id = "tcom.ui.modal", l.prototype._defaults = {
            show: !1
        }, l.prototype._handleEvent = function(n, a) {
            var l = this;
            e(n.currentTarget);
            "modal" === n.type && "close" === n.namespace ? (l.options.preserveElement && l.$el.appendTo("body"), l.emit(t.CLOSE, {
                eventType: t.CLOSE,
                data: {}
            })) : "modal" === n.type && "doneclick" === n.namespace ? l.emit(t.DONE, {
                eventType: t.DONE,
                data: a
            }) : "modal" === n.type && "closeescape" === n.namespace ? l.emit(t.CLOSE_ESC, {
                eventType: t.CLOSE_ESC,
                data: a
            }) : "orientationchange" === a.event.type && _.defer(function() {
                o.dom.$window.scrollTop(0)
            })
        }, l.prototype.show = function() {
            var n = this,
                l = n.options;
            return n.modal = e(l.content).tcomModal(l), n.modal.$el.on("modal.close modal.doneclick modal.closeescape", n._proxiedHandleEvent), ("phone" === a.viewport.getCurrentQuery() || "phablet" === a.viewport.getCurrentQuery()) && o.dom.$body.find("footer").hide(), n.emit(t.SHOW, {
                eventType: t.SHOW,
                data: {}
            }), n.modal.$modal.on("click", '[data-role="close-modal"]', function() {
                n.emit(t.CLOSE_BTN, {
                    eventType: t.CLOSE_BTN,
                    data: {}
                })
            }), n.modal.$modal.on("modal:closeescape", function() {
                n.emit(t.CLOSE_ESC, {
                    eventType: t.CLOSE_ESC,
                    data: {}
                })
            }), n
        }, l.prototype.close = function() {
            var e = this;
            e.modal.close(), o.dom.$body.find("footer").show(), o.pubsub.unsubscribe("tcom.window.resize", e._proxiedHandleEvent)
        }, l
    }(e, o)
});


! function(t, e) {
    "function" == typeof define && define.amd ? define("organisms/tda-flyout/js/tda-flyout", 
	["jquery", 
	 "tcom", 
	 "organisms/modal/js/modal"], 
	 function(a, n, o, l, i) {
        return t.tcom.ui.TdaFlyout = e(a, n, o, l, i)
    }) : t.tcom.ui.TdaFlyout = e(t.jQuery, t.tcom, t.tcom.ui.LocationCta, t.tcom.ui.CtaBox, t.tcom.ui.Modal)
}(this, function(jquery, tcom, atoms_location_cta_js_location_cta, molecules_cta_box_js_cta_box, organisms_modal_js_modal) {
    var atoms_button_tpl_button, molecules_cta_box_tpl_cta_box, atoms_location_cta_tpl_location_cta, tcom_ui_img_icons_tcom_icon_location, organisms_tda_flyout_tpl_tda_flyout, text, json, json_organisms_tda_flyout_data_stringsjson, organisms_tda_flyout_js_tda_flyout;
    return atoms_button_tpl_button = function(t) {
        return t.partials["atoms/button/tpl/button"] = t.template({
            1: function(t, e, a, n) {
                var o;
                return this.escapeExpression((o = null != (o = e.tag || (null != t ? t.tag : t)) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "tag",
                    hash: {},
                    data: n
                }) : o))
            },
            3: function(t, e, a, n) {
                return "a"
            },
            5: function(t, e, a, n) {
                var o;
                return 'href="' + this.escapeExpression((o = null != (o = e.url || (null != t ? t.url : t)) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "url",
                    hash: {},
                    data: n
                }) : o)) + '"'
            },
            7: function(t, e, a, n) {
                var o;
                return null != (o = e.each.call(t, null != t ? t.data : t, {
                    name: "each",
                    hash: {},
                    fn: this.program(8, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : ""
            },
            8: function(t, e, a, n) {
                var o, l = this.escapeExpression;
                return "data-" + l((o = null != (o = e.key || n && n.key) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "key",
                    hash: {},
                    data: n
                }) : o)) + '="' + l(this.lambda(t, t)) + '"'
            },
            10: function(t, e, a, n) {
                var o;
                return 'target="' + this.escapeExpression((o = null != (o = e.target || (null != t ? t.target : t)) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "target",
                    hash: {},
                    data: n
                }) : o)) + '"'
            },
            12: function(t, e, a, n) {
                var o;
                return " " + this.escapeExpression((o = null != (o = e["class"] || (null != t ? t["class"] : t)) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "class",
                    hash: {},
                    data: n
                }) : o))
            },
            14: function(t, e, a, n) {
                var o, l;
                return "    " + (null != (l = null != (l = e.html || (null != t ? t.html : t)) ? l : e.helperMissing, o = "function" == typeof l ? l.call(t, {
                    name: "html",
                    hash: {},
                    data: n
                }) : l) ? o : "") + "\n"
            },
            16: function(t, e, a, n) {
                var o, l;
                return "    " + (null != (l = null != (l = e.text || (null != t ? t.text : t)) ? l : e.helperMissing, o = "function" == typeof l ? l.call(t, {
                    name: "text",
                    hash: {},
                    data: n
                }) : l) ? o : "") + "\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, a, n) {
                var o;
                return "<" + (null != (o = e["if"].call(t, null != t ? t.tag : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, n, 0),
                    inverse: this.program(3, n, 0),
                    data: n
                })) ? o : "") + " " + (null != (o = e["if"].call(t, null != t ? t.url : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : "") + " " + (null != (o = e["if"].call(t, null != t ? t.data : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(7, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : "") + " " + (null != (o = e["if"].call(t, null != t ? t.target : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(10, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : "") + ' class="tcom-btn' + (null != (o = e["if"].call(t, null != t ? t["class"] : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(12, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : "") + '">\n' + (null != (o = e["if"].call(t, null != t ? t.html : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(14, n, 0),
                    inverse: this.program(16, n, 0),
                    data: n
                })) ? o : "") + "</" + (null != (o = e["if"].call(t, null != t ? t.tag : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, n, 0),
                    inverse: this.program(3, n, 0),
                    data: n
                })) ? o : "") + ">\n"
            },
            useData: !0
        })
    }(Handlebars), molecules_cta_box_tpl_cta_box = function(t) {
        return t.partials["molecules/cta-box/tpl/cta-box"] = t.template({
            1: function(t, e, a, n) {
                var o, l;
                return '        <div class="tcom-cta-box-address-ct">\n            <p class="tcom-cta-box-address">' + this.escapeExpression((l = null != (l = e.address || (null != t ? t.address : t)) ? l : e.helperMissing, "function" == typeof l ? l.call(t, {
                    name: "address",
                    hash: {},
                    data: n
                }) : l)) + "</p>\n            " + (null != (o = e["if"].call(t, null != t ? t.distance : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(2, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : "") + "\n        </div>\n"
            },
            2: function(t, e, a, n) {
                var o;
                return '<p class="tcom-cta-box-distance">' + this.escapeExpression((o = null != (o = e.distance || (null != t ? t.distance : t)) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "distance",
                    hash: {},
                    data: n
                }) : o)) + "</p>"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, a, n) {
                var o, l, i = e.helperMissing,
                    s = "function";
                return '<div class="tcom-cta-box ' + this.escapeExpression((l = null != (l = e["box-type-class"] || (null != t ? t["box-type-class"] : t)) ? l : i, typeof l === s ? l.call(t, {
                    name: "box-type-class",
                    hash: {},
                    data: n
                }) : l)) + '">\n    <p class="tcom-cta-box-copy">' + (null != (l = null != (l = e.copy || (null != t ? t.copy : t)) ? l : i, o = typeof l === s ? l.call(t, {
                    name: "copy",
                    hash: {},
                    data: n
                }) : l) ? o : "") + "</p>\n" + (null != (o = e["if"].call(t, null != t ? t.address : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, n, 0),
                    inverse: this.noop,
                    data: n
                })) ? o : "") + "\n    <!-- button -->\n" + (null != (o = this.invokePartial(a["atoms/button/tpl/button"], null != t ? t.cta : t, {
                    name: "atoms/button/tpl/button",
                    data: n,
                    indent: "        ",
                    helpers: e,
                    partials: a
                })) ? o : "") + "    <!-- /button -->\n</div>\n"
            },
            usePartial: !0,
            useData: !0
        })
    }(Handlebars), atoms_location_cta_tpl_location_cta = function(t) {
        return t.partials["atoms/location-cta/tpl/location-cta"] = t.template({
            1: function(t, e, a, n) {
                var o;
                return this.escapeExpression((o = null != (o = e.cta || (null != t ? t.cta : t)) ? o : e.helperMissing, "function" == typeof o ? o.call(t, {
                    name: "cta",
                    hash: {},
                    data: n
                }) : o))
            },
            3: function(t, e, a, n) {
                return "#tcom-nav-zip-modal"
            },
            5: function(t, e, a, n) {
                var o, l;
                return "        " + (null != (l = null != (l = e.text || (null != t ? t.text : t)) ? l : e.helperMissing, o = "function" == typeof l ? l.call(t, {
                    name: "text",
                    hash: {},
                    data: n
                }) : l) ? o : "") + "\n"
            },
            7: function(t, e, a, n) {
                return "        Location:\n"
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, a, n) {
                var o, l, i = e.helperMissing,
                    s = "function",
                    r = this.escapeExpression;
                return '<button class="tcom-location-cta ' + r((l = null != (l = e["class"] || (null != t ? t["class"] : t)) ? l : i, typeof l === s ? l.call(t, {
                    name: "class",
                    hash: {},
                    data: n
                }) : l)) + '" data-target="' + (null != (o = e["if"].call(t, null != t ? t.cta : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(1, n, 0),
                    inverse: this.program(3, n, 0),
                    data: n
                })) ? o : "") + '">\n    <span class="location">\n' + (null != (o = e["if"].call(t, null != t ? t.text : t, {
                    name: "if",
                    hash: {},
                    fn: this.program(5, n, 0),
                    inverse: this.program(7, n, 0),
                    data: n
                })) ? o : "") + '        <span class="zip">' + r((l = null != (l = e.currentZip || (null != t ? t.currentZip : t)) ? l : i, typeof l === s ? l.call(t, {
                    name: "currentZip",
                    hash: {},
                    data: n
                }) : l)) + '</span>\n        <svg version="1.1" class="tcom-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="107.8 639.6 64 64" xml:space="preserve">\n            <g>\n                <path d="M158,671.6l-5.3-9l-5.2,9l4.1,0c0,1.1-0.2,2.3-0.5,3.4c-1.9,6.2-8.4,9.8-14.6,7.9c-1.7-0.5-3.2-1.4-4.5-2.6l-2.2,2.4c1.6,1.5,3.6,2.7,5.8,3.3c7.9,2.4,16.2-2.1,18.6-10.1c0.4-1.4,0.6-2.9,0.6-4.3L158,671.6z"/>\n                <path d="M128.2,672.7c-0.1-1.5,0-3,0.5-4.5c1.9-6.2,8.4-9.8,14.6-7.9c1.7,.5,3.3,1.4,4.6,2.7l2.2-2.3c-1.6-1.5-3.6-2.7-5.9-3.4c-7.9-2.4-16.2,2.1-18.6,10.1c-0.5,1.8-0.7,3.6-0.6,5.4l-3.5,0l5.2,9l5.3-9L128.2,672.7z"/>\n            </g>\n        </svg>\n    </span>\n</button>\n'
            },
            useData: !0
        })
    }(Handlebars), tcom_ui_img_icons_tcom_icon_location = function(t) {
        return t.partials["tcom-ui/img/icons/tcom-icon-location"] = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, a, n) {
                return '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-196.2 1087.6 32 32" class="tcom-icon tcom-icon-location"><path d="M-180.2 1096.6c-2.8 0-5 2.2-5 5 0 3.5 5 8.7 5 8.7s5-5.4 5-8.7c0-2.7-2.3-5-5-5zm0 7c-1.3 0-2.4-1.1-2.4-2.4 0-1.3 1.1-2.4 2.4-2.4 1.3 0 2.4 1.1 2.4 2.4 0 1.3-1.1 2.4-2.4 2.4z"/></svg>'
            },
            useData: !0
        })
    }(Handlebars), organisms_tda_flyout_tpl_tda_flyout = function(t) {
        return t.partials["organisms/tda-flyout/tpl/tda-flyout"] = t.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(t, e, a, n) {
                var o, l;
                return "<div class='tcom-multiple-tda'>\n    <div class='tda-modal-header'>\n" + (null != (o = this.invokePartial(a["atoms/location-cta/tpl/location-cta"], null != t ? t["location-cta"] : t, {
                    name: "atoms/location-cta/tpl/location-cta",
                    data: n,
                    indent: "        ",
                    helpers: e,
                    partials: a
                })) ? o : "") + "        <div class='tda-modal-icon'>" + (null != (o = this.invokePartial(a["tcom-ui/img/icons/tcom-icon-location"], t, {
                    name: "tcom-ui/img/icons/tcom-icon-location",
                    data: n,
                    helpers: e,
                    partials: a
                })) ? o : "") + "</div>\n        <div class='tda-modal-title'>" + this.escapeExpression((l = null != (l = e.title || (null != t ? t.title : t)) ? l : e.helperMissing, "function" == typeof l ? l.call(t, {
                    name: "title",
                    hash: {},
                    data: n
                }) : l)) + '</div>\n    </div>\n\n    <div class="cta-list-ct">\n\n    </div>\n</div>\n'
            },
            usePartial: !0,
            useData: !0
        })
    }(Handlebars), text = function(t) {
        var e, a, n, o, l, i = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
            s = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
            r = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
            c = "undefined" != typeof location && location.href,
            u = c && location.protocol && location.protocol.replace(/\:/, ""),
            d = c && location.hostname,
            p = c && (location.port || void 0),
            m = {},
            f = t.config && t.config() || {};
        return e = {
            version: "2.0.14",
            strip: function(t) {
                if (t) {
                    t = t.replace(s, "");
                    var e = t.match(r);
                    e && (t = e[1])
                } else t = "";
                return t
            },
            jsEscape: function(t) {
                return t.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
            },
            createXhr: f.createXhr || function() {
                var t, e, a;
                if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
                if ("undefined" != typeof ActiveXObject)
                    for (e = 0; 3 > e; e += 1) {
                        a = i[e];
                        try {
                            t = new ActiveXObject(a)
                        } catch (n) {}
                        if (t) {
                            i = [a];
                            break
                        }
                    }
                return t
            },
            parseName: function(t) {
                var e, a, n, o = !1,
                    l = t.lastIndexOf("."),
                    i = 0 === t.indexOf("./") || 0 === t.indexOf("../");
                return -1 !== l && (!i || l > 1) ? (e = t.substring(0, l), a = t.substring(l + 1)) : e = t, n = a || e, l = n.indexOf("!"), -1 !== l && (o = "strip" === n.substring(l + 1), n = n.substring(0, l), a ? a = n : e = n), {
                    moduleName: e,
                    ext: a,
                    strip: o
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(t, a, n, o) {
                var l, i, s, r = e.xdRegExp.exec(t);
                return r ? (l = r[2], i = r[3], i = i.split(":"), s = i[1], i = i[0], !(l && l !== a || i && i.toLowerCase() !== n.toLowerCase() || (s || i) && s !== o)) : !0
            },
            finishLoad: function(t, a, n, o) {
                n = a ? e.strip(n) : n, f.isBuild && (m[t] = n), o(n)
            },
            load: function(t, a, n, o) {
                if (o && o.isBuild && !o.inlineText) return void n();
                f.isBuild = o && o.isBuild;
                var l = e.parseName(t),
                    i = l.moduleName + (l.ext ? "." + l.ext : ""),
                    s = a.toUrl(i),
                    r = f.useXhr || e.useXhr;
                return 0 === s.indexOf("empty:") ? void n() : void(!c || r(s, u, d, p) ? e.get(s, function(a) {
                    e.finishLoad(t, l.strip, a, n)
                }, function(t) {
                    n.error && n.error(t)
                }) : a([i], function(t) {
                    e.finishLoad(l.moduleName + "." + l.ext, l.strip, t, n)
                }))
            },
            write: function(t, a, n, o) {
                if (m.hasOwnProperty(a)) {
                    var l = e.jsEscape(m[a]);
                    n.asModule(t + "!" + a, "define(function () { return '" + l + "';});\n")
                }
            },
            writeFile: function(t, a, n, o, l) {
                var i = e.parseName(a),
                    s = i.ext ? "." + i.ext : "",
                    r = i.moduleName + s,
                    c = n.toUrl(i.moduleName + s) + ".js";
                e.load(r, n, function(a) {
                    var n = function(t) {
                        return o(c, t)
                    };
                    n.asModule = function(t, e) {
                        return o.asModule(t, c, e)
                    }, e.write(t, r, n, l)
                }, l)
            }
        }, "node" === f.env || !f.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] && !process.versions["atom-shell"] ? (a = require.nodeRequire("fs"), e.get = function(t, e, n) {
            try {
                var o = a.readFileSync(t, "utf8");
                "\ufeff" === o[0] && (o = o.substring(1)), e(o)
            } catch (l) {
                n && n(l)
            }
        }) : "xhr" === f.env || !f.env && e.createXhr() ? e.get = function(t, a, n, o) {
            var l, i = e.createXhr();
            if (i.open("GET", t, !0), o)
                for (l in o) o.hasOwnProperty(l) && i.setRequestHeader(l.toLowerCase(), o[l]);
            f.onXhr && f.onXhr(i, t), i.onreadystatechange = function(e) {
                var o, l;
                4 === i.readyState && (o = i.status || 0, o > 399 && 600 > o ? (l = new Error(t + " HTTP status: " + o), l.xhr = i, n && n(l)) : a(i.responseText), f.onXhrComplete && f.onXhrComplete(i, t))
            }, i.send(null)
        } : "rhino" === f.env || !f.env && "undefined" != typeof Packages && "undefined" != typeof java ? e.get = function(t, e) {
            var a, n, o = "utf-8",
                l = new java.io.File(t),
                i = java.lang.System.getProperty("line.separator"),
                s = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(l), o)),
                r = "";
            try {
                for (a = new java.lang.StringBuffer, n = s.readLine(), n && n.length() && 65279 === n.charAt(0) && (n = n.substring(1)), null !== n && a.append(n); null !== (n = s.readLine());) a.append(i), a.append(n);
                r = String(a.toString())
            } finally {
                s.close()
            }
            e(r)
        } : ("xpconnect" === f.env || !f.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (n = Components.classes, o = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), l = "@mozilla.org/windows-registry-key;1" in n, e.get = function(t, e) {
            var a, i, s, r = {};
            l && (t = t.replace(/\//g, "\\")), s = new FileUtils.File(t);
            try {
                a = n["@mozilla.org/network/file-input-stream;1"].createInstance(o.nsIFileInputStream), a.init(s, 1, 0, !1), i = n["@mozilla.org/intl/converter-input-stream;1"].createInstance(o.nsIConverterInputStream), i.init(a, "utf-8", a.available(), o.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), i.readString(a.available(), r), i.close(), a.close(), e(r.value)
            } catch (c) {
                throw new Error((s && s.path || "") + ": " + c)
            }
        }), e
    }({}), json = function(text) {
        var parseJSON = JSON && JSON.parse ? JSON.parse : function(val) {
            return eval("(" + val + ")")
        };
        return {
            load: function(t, e, a, n) {
                n.isBuild ? a("") : e(["text!" + t], function(t) {
                    a(parseJSON(t))
                })
            },
            loadFromFileSystem: function(t, e) {
                var a = nodeRequire("fs"),
                    n = require.toUrl(e),
                    o = a.readFileSync(n).toString();
                return o = 'define("' + t + "!" + e + '", function () {\nreturn ' + o + ";\n});\n"
            },
            write: function(t, e, a) {
                a(this.loadFromFileSystem(t, e))
            }
        }
    }(text), json_organisms_tda_flyout_data_stringsjson = {
        title: "Select Your Dealer",
        "location-cta": {
            cta: "#tcom-nav-zip-modal",
            location: "LOCATON:"
        }
    }, organisms_tda_flyout_js_tda_flyout = function(t, e, a, n, o, l, i, s, r) {
        var c, u, t = e.$,
            d = e._,
            p = e.ui,
            m = e.util,
            f = (e.pubsub, e.analytics),
            h = "misc",
            _ = function(a) {
                var n = this;
                u = t.proxy(n._handleEvent, n), n.siteSection = n.getSiteSection(), _.superclass.constructor.call(n, a), e.pubsub.subscribe("tcom.geolocation.multiple.tda", t.proxy(n.checkTDAStatus, n)), n.checkTDAStatus()
            };
        return m.inherits(_, p.Component), c = _.events = {
            ZIPCODE_CLICK: "TDAFlyout.zipcodeclick"
        }, _.prototype.id = "tcom.ui.tdaflyout", _.prototype._defaults = {}, _.prototype._handleEvent = function(a) {
            var n = this;
            t(a.currentTarget);
            return console.log("handleEvent Fired", a.eventType), "ctabox.click" === a.eventType ? (n.dealerName = a.data.name, n.dealerId = a.data.dealer, n.zipcode = a.data.value, e.geolocation.setZip(n.zipcode), f.fire(h, "248.2", {
                site_section: n.siteSection,
                tda_code: t.cookie("tda") || "",
                dealer_name: n.dealerName,
                dealer_code: n.dealerId,
                zip_code: n.zipcode,
                cta: "select"
            }), t.cookie("tda-multiple", a.data.dealer), n.modal && n.modal.close(), TCOM.Events.trigger("modal:close.tcomModal")) : "locationcta.click" === a.eventType ? (n.fireLocationModal(), f.fire(h, "248.2", {
                site_section: n.siteSection,
                tda_code: t.cookie("tda") || "",
                dealer_name: n.dealerName || "",
                dealer_code: n.dealerId || "",
                zip_code: t.cookie("zipcode") || "",
                cta: "change_zip_code"
            })) : "modal.close_btn" === a.eventType && e.analytics.fire(h, "248.2", {
                site_section: n.siteSection,
                tda_code: t.cookie("tda") || "",
                dealer_name: n.dealerName,
                dealer_code: n.dealerId,
                zip_code: t.cookie("zipcode") || "",
                cta: "close"
            }), n
        }, _.prototype.checkTDAStatus = function() {
            var a = this,
                n = t.cookie("tda-multiple"),
                o = t.cookie("zipcode");
            return (null !== o && "true" === n || null !== o && null === n) && (a.multiplePMAs = e.geolocation.getMultipleTDA(), d.isUndefined(a.multiplePMAs) === !0 ? e.geolocation.setTDAcode(o) : t(".tcom-modal-is-on").length < 1 && (t(".tcom-multiple-tda").empty(), a.multipleTDAData())), a
        }, _.prototype.multipleTDAData = function() {
            var t = this,
                e = [];
            return t.dealerName = t.multiplePMAs[0].name, t.dealerId = t.multiplePMAs[0].dealerId, e = d.map(t.multiplePMAs, function(t) {
                return {
                    "box-type-class": "list-box",
                    copy: t.name,
                    address: t.address1 + " " + t.city + " " + t.state + " " + t.zip,
                    distance: t.distance + " Miles Away",
                    cta: {
                        href: "#",
                        text: "Select",
                        "class": "tcom-btn-one",
                        data: {
                            value: t.zip,
                            dealer: t.dealerId,
                            name: t.name
                        }
                    }
                }
            }), t.renderTDAModal(e), t
        }, _.prototype.renderTDAModal = function(s) {
            var c, d = this;
            d.$el.append(i(r));
            var p = t(".cta-list-ct"),
                m = t(".tcom-multiple-tda"),
                f = t(".tcom-location-cta");
            return t.each(s, function(t, e) {
                c = new o({
                    el: n(e)
                }), c.on("**", u), p.append(c.$el)
            }), d.locationCTA = new a({
                el: f
            }), d.locationCTA.on("**", u), e.analytics.fire(h, "248.1", {
                site_section: d.siteSection,
                tda_code: t.cookie("tda") || "",
                zip_code: t.cookie("zipcode") || ""
            }), t.cookie("tda-multiple", "prompted"), void 0 != l ? d.modal = new l({
                title: "  ",
                el: m
            }).show() : "undefined" != e.ui.Modal && (d.modal = new e.ui.Modal({
                title: "  ",
                el: m
            }).show()), d.modal.on("**", u), d
        }, _.prototype.fireLocationModal = function() {
            var a = this;
            return t(t('button[data-target="#tcom-nav-zip-flyout"]')[0]).click(), a.emit(c.ZIPCODE_CLICK, {
                eventType: c.ZIPCODE_CLICK,
                data: {
                    cta: "edit"
                }
            }), e.pubsub.subscribe("tcom.zipflyout.close", function() {
                e.pubsub.unsubscribe("tcom.geolocation.zipcode.change")
            }), e.pubsub.subscribe("tcom.geolocation.zipcode.change", function() {
                e.pubsub.unsubscribe("tcom.zipflyout.close"), a.modal && a.modal.close(), TCOM.Events.trigger("modal:close.tcomModal")
            }), a
        }, _.prototype.getSiteSection = function() {
            var e;
            return t("[data-app-name]").length > 0 ? e = t("[data-app-name]").attr("data-app-name") : t("[data-page-name]").length > 0 && (e = t("[data-page-name]").attr("data-page-name")), e
        }, _
    }(jquery, tcom, atoms_location_cta_js_location_cta, molecules_cta_box_tpl_cta_box, molecules_cta_box_js_cta_box, organisms_modal_js_modal, organisms_tda_flyout_tpl_tda_flyout, organisms_tda_flyout_js_tda_flyout, json_organisms_tda_flyout_data_stringsjson)
});

! function(e, a) {
    "function" == typeof define && define.amd ? define("organisms/disclaimers/js/disclaimers", ["jquery", "tcom", "organisms/modal/js/modal"], function(i, t, s) {
        return e.tcom.ui.Disclaimers = a(i, t, s)
    }) : e.tcom.ui.Disclaimers = a(e.jQuery, e.tcom, e.tcom.ui.Modal)
}(this, function(e, a, i) {
    var t, s, r;
    return t = function(e) {
        return e.partials["organisms/disclaimers/tpl/disclaimers-item"] = e.template({
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, a, i, t) {
                var s, r, l = a.helperMissing,
                    o = "function",
                    c = this.escapeExpression;
                return '<li class="tcom-disclaimers-item" data-code="' + c((r = null != (r = a.code || (null != e ? e.code : e)) ? r : l, typeof r === o ? r.call(e, {
                    name: "code",
                    hash: {},
                    data: t
                }) : r)) + '">' + c((r = null != (r = a.index || (null != e ? e.index : e)) ? r : l, typeof r === o ? r.call(e, {
                    name: "index",
                    hash: {},
                    data: t
                }) : r)) + ". " + (null != (r = null != (r = a.text || (null != e ? e.text : e)) ? r : l, s = typeof r === o ? r.call(e, {
                    name: "text",
                    hash: {},
                    data: t
                }) : r) ? s : "") + "</li>\n"
            },
            useData: !0
        })
    }(Handlebars), s = function(e) {
        return e.partials["organisms/disclaimers/tpl/disclaimers"] = e.template({
            1: function(e, a, i, t) {
                var s;
                return null != (s = this.invokePartial(i["organisms/disclaimers/tpl/disclaimers-item"], e, {
                    name: "organisms/disclaimers/tpl/disclaimers-item",
                    data: t,
                    indent: "                ",
                    helpers: a,
                    partials: i
                })) ? s : ""
            },
            compiler: [6, ">= 2.0.0-beta.1"],
            main: function(e, a, i, t) {
                var s;
                return '    <div>\n        <ul class="tcom-disclaimers-list">\n' + (null != (s = a.each.call(e, null != e ? e.disclaimers : e, {
                    name: "each",
                    hash: {},
                    fn: this.program(1, t, 0),
                    inverse: this.noop,
                    data: t
                })) ? s : "") + "        </ul>\n    </div>\n\n\n\n\n\n\n"
            },
            usePartial: !0,
            useData: !0
        })
    }(Handlebars), r = function(e, a, i, t, s) {
        function r() {
            var e = arguments,
                a = e[0];
            if (!a || !a.length) return a;
            for (var i = 0, t = e.length; ++i < t;)
                for (var s = 0, r = e[i];
                    (s = u.indexOf(a, r, s)) > -1;)[].splice.call(a, s, 1);
            return a
        }
        var l = /\[([\w\-]+)\]/g,
            o = /(\[[\w\-]+\])/g,
            c = /^(<a\s+id=["'](\d+)\s*["']\s*>\s*<\/a>|\s*\[(\d+)\]\s*\-\s*)/,
            n = "vehicle-landing",
            d = "tcom.app.render",
            m = a.util,
            p = a.ui,
            u = a._,
            h = a.env,
            D = a.pubsub,
            f = TCOM.Analytics,
            g = a.dom.$body,
            _ = a.dom.$document,
            v = window.tcom.services,
            T = 0,
            y = 0,
            C = {
                SHOW_DISCLAIMERS: "tcom.disclaimers.show",
                UPDATE_DISCLAIMERS: "tcom.disclaimers.update"
            },
            I = function(a) {
                var i, t, s = this;
                I.superclass.constructor.call(s, a), i = s.options.modalOptions.disclaimersElId, t = e("#" + i), s.deferred = e.Deferred(), s.disclaimers = [], s.$disclaimersEl = t.length ? t : e('<div id="' + i + '" />').appendTo(g), s._getAppData(), s._getDataDisclaimerCodes(), s.hasDisclaimerData = !s._getDisclaimerData(), s.hasDisclaimerData && (s._parseIncludedDisclaimers(), s._formatIncludedDisclaimers(), s.updateElDisclaimerTags()), g.on("click", "[data-disclaimer]", u.bind(s._onDisclaimerClick, s)), g.on("render", u.bind(s.render, s)), _.on("render", u.bind(s.render, s)), D.subscribe(d, function(e, a) {
                    s._handleTopic(e, a)
                }), D.subscribe(C.SHOW_DISCLAIMERS, function(e, a) {
                    s._handleTopic(e, a)
                }), D.subscribe(C.UPDATE_DISCLAIMERS, function(e, a) {
                    s._handleTopic(e, a)
                }), s.topics = C, "tmob" === h.site && (s.touchDisclaimers = [])
            };
        return m.inherits(I, p.Component), I.prototype.id = "tcom.ui.disclaimers", I.prototype.parseTCOMDiscLI = {}, I.prototype.disclaimersItemTemplate = s, I.prototype._defaults = {
            modalOptions: {
                disclaimersElId: "tcom-disclaimers",
                modalElId: "tcom-disclaimers-modal",
                className: "disclaimers-modal",
                title: "en" === a.i18n.getCurrentLocale() ? "DISCLOSURES" : "AVISOS",
                fixedHeader: !0,
                closeButton: !0,
                fullscreen: !1,
                exclusive: !0,
                hash: "#disclaimers"
            },
            scrollDelay: 750,
            scrollSpeed: 400
        }, I.prototype._getAppData = function() {
            var a = this,
                i = e(".app"),
                t = g.data("app-name"),
                s = i.length ? i : null;
            return s = !s && t ? g : s, s && (a.app = a.app || {
                name: s.data("app-name"),
                disclaimerName: s.data("disclaimers-name"),
                pageName: s.data("page-name"),
                series: s.data("series-code"),
                year: s.data("year")
            }, i.length && !a.app.name && (a.app.name = t)), a
        }, I.prototype._getDataDisclaimerCodes = function() {
            var a = this;
            return a.dataDisclaimerCodes = e("[data-disclaimer]:not(li)").map(function() {
                return e(this).data("disclaimer")
            }), a.dataDisclaimerCodes = u.compact(u.uniq(a.dataDisclaimerCodes)), a
        }, I.prototype._getDisclaimerData = function() {
            var e = this;
            return e._hasIncludedDisclaimers() ? !1 : (e._getGlobalDisclaimerData(), !0)
        }, I.prototype._hasIncludedDisclaimers = function() {
            return e("#tcom-disclaimers").length ? !0 : !1
        }, I.prototype._parseIncludedDisclaimers = function() {
            var a = this,
                i = a.$disclaimersEl.find("li");
            return a.disclaimers = [], i.each(function(i) {
                var t = e(this);
                t.attr("data-code", t.data("disclaimer")), a.disclaimers.push({
                    code: t.data("code"),
                    index: i + 1,
                    text: t.html()
                })
            }), a
        }, I.prototype._formatIncludedDisclaimers = function() {
            var e = this,
                a = e.$disclaimersEl.find("ul"),
                i = e.$disclaimersEl.find("li");
            return a.addClass("tcom-disclaimers-list"), i.addClass("tcom-disclaimers-item").prepend(function(e) {
                var a = e + 1;
                return String(a + ". ")
            }), e
        }, I.prototype._handleTopic = function(e, a) {
            var i = this;
            switch (e) {
                case C.SHOW_DISCLAIMERS:
                    i._onShowDisclaimer(a);
                    break;
                case C.UPDATE_DISCLAIMERS:
                    i.resetInPageDisclaimers();
                    break;
                case d:
                    i.updateElDisclaimerTags(a.el);
                    break;
                default:
                    throw TypeError('Disclaimers.handleTopic: Topic "' + e + '" not recognized.')
            }
        }, I.prototype.render = function(e, a) {
            this.updateElDisclaimerTags(a)
        }, I.prototype.updateElDisclaimerTags = function(a, i) {
            var t, s = this;
            t = a ? e(a) : g, s._replaceDisclaimerCommas(t), t.find("[data-disclaimer]:not(.is-loaded)").not("li").each(u.bind(s.updateDisclaimerTag, s)), s._createDisclaimerHTML(i)
        }, I.prototype._replaceDisclaimerCommas = function(a) {
            e(a).find("[data-disclaimer]").not("li").each(function() {
                (e(this.previousSibling).data("disclaimer") ? 0 : 1) || e(this).before("<sup>, </sup>")
            })
        }, I.prototype.updateDisclaimerTag = function(e, a) {
            var i = this;
            i.app ? i._updateTCOMDisclaimerTag(a) : i._updateRITDisclaimerTag(a)
        }, I.prototype._updateTCOMDisclaimerTag = function(a) {
            var i = this,
                t = e(a),
                s = t.data("disclaimer"),
                r = i.getDisclaimerIndex(s);
            r && r > 0 && s && t.text(r).addClass("is-loaded")
        }, I.prototype.getDisclaimerIndex = function(e) {
            var a = this,
                i = u.find(a.disclaimers, {
                    code: e
                });
            return i ? i.index : -1
        }, I.prototype.getDisclaimerByCode = function(e) {
            return this.getDisclaimerIndex(e)
        }, I.prototype._onDisclaimerClick = function(i) {
            var t, s, r = this,
                l = e(i.currentTarget).parent().hasClass("vehicle-select-item-as-shown"),
                o = e(i.currentTarget).attr("data-disclaimer"),
                c = g.hasClass("tcom-modal-is-on");
            if (f.fire("global", "224.27", {}), c ? 0 : i.preventDefault(), i.stopImmediatePropagation(), r.app && (r.app.pageName || r.app.name) || "tmob" !== h.site) {
                if (e(i.currentTarget).hasClass("tcom-disclaimers-item")) return;
                r.showDisclaimerModal(o)
            } else r._onTouchDisclaimerClick(i);
            return 0 === e(i.currentTarget).closest(".vehicle-select-item").length ? a.analytics.fire("misc", "224.1", {}) : (t = l ? "57.119" : "57.85", s = l ? {
                linkname: "Price",
                tab_title: e(i.currentTarget).closest(".tcom-modal").find(".tcom-modal-header h2").text(),
                model_name: e(i.currentTarget).closest(".vehicle-select-item").data("modelCode")
            } : {
                linkname: "Disclaimer",
                link_position: parseInt(e(".tcom-modal .slider-indicator.is-on").data("page")) + 1,
                tab_title: e(i.currentTarget).closest(".tcom-modal").find(".tcom-modal-header h2").text(),
                model_name: e(i.currentTarget).closest(".vehicle-select-item").data("modelCode")
            }, f.fire("home", t, s)), c ? void 0 : !1
        }, I.prototype._onShowDisclaimer = function(e) {
            var a = this;
            "tmob" !== h.site || a.app && (a.app.pageName || a.app.name) ? a.showDisclaimerModal(e) : a._showTouchDisclaimerModal()
        }, I.prototype._getGlobalDisclaimerData = function() {
            var e = this,
                a = u.bind(e._parseGlobalDiscData, e);
            v.getDisclaimers.global().done(a)
        }, I.prototype._getTCOMAppDisclaimerData = function() {
            var e = this,
                a = {
                    appName: e.app.name,
                    disclaimerName: e.app.disclaimerName
                },
                i = u.bind(e.parseTCOMDiscData, e);
            "undefined" != typeof a.appName && "undefined" != typeof a.disclaimerName && v.getDisclaimers.app(a).done(i)
        }, I.prototype._getTCOMMLPDisclaimerData = function() {
            var e = this,
                a = {
                    series: e.app.series,
                    year: e.app.year
                },
                i = u.bind(e.parseTCOMDiscData, e);
            v.getDisclaimers.mlp(a).done(i)
        }, I.prototype._parseGlobalDiscData = function(e) {
            var a = this;
            a.parseTCOMDiscData(e, !0), a._getInPageDisclaimers()
        }, I.prototype._getInPageDisclaimers = function() {
            var e = this;
            e.app && e.app.pageName ? e.app.pageName === n ? e._getTCOMMLPDisclaimerData() : e._getTCOMAppDisclaimerData() : "tmob" === h.site ? e._getTouchDisclaimerData() : e._getRITDisclaimerData()
        }, I.prototype.parseTCOMDiscData = function(a, i) {
            var t, s, l, o, c = this,
                n = e(a);
            n.each(function(a, n) {
                s = e(n), l = s.data("disclaimer"), o = s.html(), a = 0, t = c.getDisclaimerIndex(l), t && t > 0 || (i ? (a = c.disclaimers.length + 1, T++, c.dataDisclaimerCodes = r(c.dataDisclaimerCodes, l)) : (a = u.indexOf(c.dataDisclaimerCodes, l), a > -1 ? a = u.indexOf(c.dataDisclaimerCodes, l) + 1 + T : (y++, a = T + c.dataDisclaimerCodes.length + y)), c.disclaimers.push({
                    code: l,
                    text: o,
                    index: a,
                    type: i ? "global" : "in-page"
                }))
            }), c.updateElDisclaimerTags(null, !0)
        }, I.prototype.resetInPageDisclaimers = function() {
            var e = this;
            e.disclaimers = u.filter(e.disclaimers, {
                type: "global"
            }), e._getInPageDisclaimers(), e.updateElDisclaimerTags(null, !0)
        }, I.prototype._createDisclaimerHTML = function(a) {
            var i, s = this;
            window.tcom.disclaimers = this, (!s.hasDisclaimerData || a) && (s.disclaimers = u.sortBy(s.disclaimers, "index"), i = t({
                disclaimers: s.disclaimers
            }), s.$disclaimersEl.html(i), s.hasDisclaimerData = !0, e("[data-disclaimer]").off("click", u.bind(s._onDisclaimerClick, s)), e("[data-disclaimer]").on("click", u.bind(s._onDisclaimerClick, s)), window.tcom.pubsub.publish("tcom.disclaimers.ready"), s.deferred.done(function() {
                s.deferred = e.Deferred()
            }), s.deferred.resolve())
        }, I.prototype.getDeferred = function() {
            var e = this;
            return e.deferred.promise()
        }, I.prototype.showDisclaimerModal = function(a) {
            var i, t = this;
            t.$modalEl = e("#" + t.options.modalOptions.modalElId), t.$modalEl.length ? t.$modalEl.hasClass("is-open") || (t.$modalEl.addClass("is-open"), t.$modalEl.tcomModal(t.options.modalOptions)) : (t.$modalEl = t.$disclaimersEl.clone(), t.$modalEl.attr("id", t.options.modalOptions.modalElId).addClass("is-open"), t.$modalEl.tcomModal(t.options.modalOptions)), i = a ? t.$modalEl.find('.tcom-disclaimers-item[data-code="' + a + '"]') : e(""), i.length && (t.$modalEl.find(".tcom-disclaimers-item").removeClass("is-active"), i.addClass("is-active"), u.delay(function() {
                t._scrollToActive(i)
            }, 750)), "phone" === p.viewport.getCurrentQuery() && window.scrollTo(0, p.viewport.scrollTop ? p.viewport.scrollTop : 0), e("#tcom-disclaimers-modal li a").each(function(a, i) {
                e(i).text().indexOf("toyota.com") > -1 && e(i).attr("target") ? e(i).removeAttr("target") : e(i).attr("target") || e(i).attr("target", "_blank")
            })
        }, I.prototype._scrollToActive = function(e) {
            var a = this,
                i = e,
                t = a.$modalEl.parent(),
                s = t.outerHeight(),
                r = i.position().top,
                l = Math.floor(s / 2) - Math.floor(i.outerHeight() / 2),
                o = r - l;
            if (r > l) {
                var c = o,
                    n = a.scrollSpeed;
                Modernizr.touch && (t.scrollTop(o), c = "-=1", n = 1), u.delay(function() {
                    t.animate({
                        scrollTop: c
                    }, n, "swing")
                }, a.scrollDelay)
            }
        }, I.prototype._onTouchDisclaimerClick = function(a) {
            var i = this,
                t = Boolean(e(a.currentTarget).closest(".tcom-global-nav-header").length),
                s = e(a.currentTarget).attr("data-disclaimer");
            t || i.touchDisclaimers && i.touchDisclaimers.length < 1 ? i.showDisclaimerModal(s) : i._showTouchDisclaimerModal()
        }, I.prototype._getTouchDisclaimerData = function() {
            var a = this,
                i = e(".custom_footer_disclaimers li, #app-disclaimers li");
            a._parseTouchDisclaimerData(i)
        }, I.prototype._parseTouchDisclaimerData = function(a) {
            var i, t = this,
                s = e(a);
            for (t.touchDisclaimers = t.touchDisclaimers || [], i = 0; i < s.length; i++) t._parseTouchDiscItem(s.eq(i))
        }, I.prototype._parseTouchDiscItem = function(a) {
            var i = this,
                t = e(a),
                s = t.html(),
                r = i.touchDisclaimers.length + 1;
            i.touchDisclaimers.push({
                code: r,
                text: s.replace(c, ""),
                index: r,
                type: "in-page"
            })
        }, I.prototype._showTouchDisclaimerModal = function() {
            var a, i = this;
            i._getTouchDisclaimerData(), a = t({
                disclaimers: i.touchDisclaimers
            }), i.$modalEl = e("#" + i.options.modalOptions.modalElId), i.$modalEl.length ? i.$modalEl.html(a) : (i.$modalEl = e("<div />"), i.$modalEl.html(a).attr("id", i.options.modalOptions.modalElId).tcomModal(i.options.modalOptions))
        }, I.prototype._updateRITDisclaimerTag = function(a) {
            var i = this,
                t = e(a),
                s = t.data("disclaimer"),
                r = i.getDisclaimerIndex(s);
            if (r && r > 0) "a" === a.nodeName.toLowerCase() ? t.html("<sup>" + r + "</sup>") : t.text(r), t.attr("data-disclaimer", s).addClass("is-loaded");
            else if (s = parseInt(s, 10), s < i.disclaimers.length) {
                var l = u.find(i.disclaimers, {
                    index: s
                });
                "a" === a.nodeName.toLowerCase() ? t.html("<sup>" + l.index + "</sup>") : t.text(l.index), t.attr("data-disclaimer", l.code).addClass("is-loaded")
            }
        }, I.prototype._getRITDisclaimerData = function() {
            var a = this,
                i = e(".disclaimers-container li");
            a._parseRITDisclaimersData(i)
        }, I.prototype._parseRITDisclaimersData = function(a) {
            for (var i = this, t = e(a), s = 0; s < t.length; s++) i._parseRITDisclaimerItem(t.eq(s));
            i.updateElDisclaimerTags(null, !0)
        }, I.prototype._parseRITDisclaimerItem = function(a) {
            var i, t, s = this,
                r = e(a),
                l = r.html(),
                o = c.test(l),
                n = l.replace(c, "");
            o && (i = c.exec(l)[2]), t = Boolean(u.find(s.disclaimers, {
                index: i
            })), t || s.disclaimers.push({
                code: i,
                text: n,
                index: i,
                type: "in-page"
            })
        }, I.prototype.link = function(e) {
            var a = this;
            return a._replaceDisclaimerShortCodes(e)
        }, I.prototype._replaceDisclaimerShortCodes = function(e) {
            var a = this,
                i = e.match(o);
            return u.each(i, function(i) {
                e = e.replace(i, a._replaceDisclaimerShortCode(i))
            }), e
        }, I.prototype._replaceDisclaimerShortCode = function(a) {
            var i, t, s, r = this,
                o = a.toString().match(l);
            return o ? (o = o[0].replace(/[\[\]]/g, ""), i = r.getDisclaimerIndex(o), t = e("<sup/>"), t.attr("data-disclaimer", o), i && t.text(i).addClass("is-loaded"), s = e("<div>").append(t).html()) : null
        }, I.prototype.load = function() {}, I
    }(e, a, i, s, t)
});

! function(e) {
    function t() {
        var e = r();
        e !== l && (l = e, p.trigger("orientationchange"))
    }

    function i(t, i, n, a) {
        var o = n.type;
        n.type = i, e.event.dispatch.call(t, n, a), n.type = o
    }
    e.attrFn = e.attrFn || {};
    var n = navigator.userAgent.toLowerCase(),
        a = n.indexOf("chrome") > -1 && (n.indexOf("windows") > -1 || n.indexOf("macintosh") > -1 || n.indexOf("linux") > -1) && n.indexOf("mobile") < 0 && n.indexOf("android") < 0,
        o = {
            tap_pixel_range: 5,
            swipe_h_threshold: 50,
            swipe_v_threshold: 50,
            taphold_threshold: 750,
            doubletap_int: 500,
            touch_capable: window.navigator.msPointerEnabled ? !1 : "ontouchstart" in window && !a,
            orientation_support: "orientation" in window && "onorientationchange" in window,
            startevent: window.navigator.msPointerEnabled ? "MSPointerDown" : "ontouchstart" in window && !a ? "touchstart" : "mousedown",
            endevent: window.navigator.msPointerEnabled ? "MSPointerUp" : "ontouchstart" in window && !a ? "touchend" : "mouseup",
            moveevent: window.navigator.msPointerEnabled ? "MSPointerMove" : "ontouchstart" in window && !a ? "touchmove" : "mousemove",
            tapevent: "ontouchstart" in window && !a ? "tap" : "click",
            scrollevent: "ontouchstart" in window && !a ? "touchmove" : "scroll",
            hold_timer: null,
            tap_timer: null
        };
    e.isTouchCapable = function() {
        return o.touch_capable
    }, e.getStartEvent = function() {
        return o.startevent
    }, e.getEndEvent = function() {
        return o.endevent
    }, e.getMoveEvent = function() {
        return o.moveevent
    }, e.getTapEvent = function() {
        return o.tapevent
    }, e.getScrollEvent = function() {
        return o.scrollevent
    }, e.each(["tapstart", "tapend", "tapmove", "tap", "tap2", "tap3", "tap4", "singletap", "doubletap", "taphold", "swipe", "swipeup", "swiperight", "swipedown", "swipeleft", "swipeend", "scrollstart", "scrollend", "orientationchange"], function(t, i) {
        e.fn[i] = function(e) {
            return e ? this.on(i, e) : this.trigger(i)
        }, e.attrFn[i] = !0
    }), e.event.special.tapstart = {
        setup: function() {
            var t = this,
                n = e(t);
            n.on(o.startevent, function a(e) {
                if (n.data("callee", a), e.which && 1 !== e.which) return !1;
                var s = e.originalEvent,
                    r = {
                        position: {
                            x: o.touch_capable ? s.touches[0].screenX : e.screenX,
                            y: o.touch_capable ? s.touches[0].screenY : e.screenY
                        },
                        offset: {
                            x: o.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : e.offsetX,
                            y: o.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : e.offsetY
                        },
                        time: Date.now(),
                        target: e.target
                    };
                return i(t, "tapstart", e, r), !0
            })
        },
        remove: function() {
            e(this).off(o.startevent, e(this).data.callee)
        }
    }, e.event.special.tapmove = {
        setup: function() {
            var t = this,
                n = e(t);
            n.on(o.moveevent, function a(e) {
                n.data("callee", a);
                var s = e.originalEvent,
                    r = {
                        position: {
                            x: o.touch_capable ? s.touches[0].screenX : e.screenX,
                            y: o.touch_capable ? s.touches[0].screenY : e.screenY
                        },
                        offset: {
                            x: o.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : e.offsetX,
                            y: o.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : e.offsetY
                        },
                        time: Date.now(),
                        target: e.target
                    };
                return i(t, "tapmove", e, r), !0
            })
        },
        remove: function() {
            e(this).off(o.moveevent, e(this).data.callee)
        }
    }, e.event.special.tapend = {
        setup: function() {
            var t = this,
                n = e(t);
            n.on(o.endevent, function a(e) {
                n.data("callee", a);
                var s = e.originalEvent,
                    r = {
                        position: {
                            x: o.touch_capable ? s.changedTouches[0].screenX : e.screenX,
                            y: o.touch_capable ? s.changedTouches[0].screenY : e.screenY
                        },
                        offset: {
                            x: o.touch_capable ? s.changedTouches[0].pageX - s.changedTouches[0].target.offsetLeft : e.offsetX,
                            y: o.touch_capable ? s.changedTouches[0].pageY - s.changedTouches[0].target.offsetTop : e.offsetY
                        },
                        time: Date.now(),
                        target: e.target
                    };
                return i(t, "tapend", e, r), !0
            })
        },
        remove: function() {
            e(this).off(o.endevent, e(this).data.callee)
        }
    }, e.event.special.taphold = {
        setup: function() {
            var t, n = this,
                a = e(n),
                s = {
                    x: 0,
                    y: 0
                },
                r = 0,
                l = 0;
            a.on(o.startevent, function c(e) {
                if (e.which && 1 !== e.which) return !1;
                a.data("tapheld", !1), t = e.target;
                var d = e.originalEvent,
                    p = Date.now(),
                    u = {
                        x: o.touch_capable ? d.touches[0].screenX : e.screenX,
                        y: o.touch_capable ? d.touches[0].screenY : e.screenY
                    },
                    m = {
                        x: o.touch_capable ? d.touches[0].pageX - d.touches[0].target.offsetLeft : e.offsetX,
                        y: o.touch_capable ? d.touches[0].pageY - d.touches[0].target.offsetTop : e.offsetY
                    };
                return s.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, s.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, r = s.x, l = s.y, o.hold_timer = window.setTimeout(function() {
                    var f = s.x - r,
                        h = s.y - l;
                    if (e.target === t && (s.x === r && s.y === l || f >= -o.tap_pixel_range && f <= o.tap_pixel_range && h >= -o.tap_pixel_range && h <= o.tap_pixel_range)) {
                        a.data("tapheld", !0);
                        var g = Date.now(),
                            v = {
                                x: o.touch_capable ? d.touches[0].screenX : e.screenX,
                                y: o.touch_capable ? d.touches[0].screenY : e.screenY
                            },
                            w = {
                                x: o.touch_capable ? d.touches[0].pageX - d.touches[0].target.offsetLeft : e.offsetX,
                                y: o.touch_capable ? d.touches[0].pageY - d.touches[0].target.offsetTop : e.offsetY
                            },
                            b = g - p,
                            y = {
                                startTime: p,
                                endTime: g,
                                startPosition: u,
                                startOffset: m,
                                endPosition: v,
                                endOffset: w,
                                duration: b,
                                target: e.target
                            };
                        a.data("callee1", c), i(n, "taphold", e, y)
                    }
                }, o.taphold_threshold), !0
            }).on(o.endevent, function d() {
                a.data("callee2", d), a.data("tapheld", !1), window.clearTimeout(o.hold_timer)
            }).on(o.moveevent, function p(e) {
                a.data("callee3", p), r = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, l = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY
            })
        },
        remove: function() {
            e(this).off(o.startevent, e(this).data.callee1).off(o.endevent, e(this).data.callee2).off(o.moveevent, e(this).data.callee3)
        }
    }, e.event.special.doubletap = {
        setup: function() {
            var t, n, a, s, r, l = this,
                c = e(l),
                d = !1;
            c.on(o.startevent, function p(e) {
                return e.which && 1 !== e.which ? !1 : (c.data("doubletapped", !1), t = e.target, c.data("callee1", p), s = e.originalEvent, a = {
                    position: {
                        x: o.touch_capable ? s.touches[0].screenX : e.screenX,
                        y: o.touch_capable ? s.touches[0].screenY : e.screenY
                    },
                    offset: {
                        x: o.touch_capable ? s.touches[0].pageX - s.touches[0].target.offsetLeft : e.offsetX,
                        y: o.touch_capable ? s.touches[0].pageY - s.touches[0].target.offsetTop : e.offsetY
                    },
                    time: Date.now(),
                    target: e.target
                }, !0)
            }).on(o.endevent, function u(e) {
                var s = Date.now(),
                    p = c.data("lastTouch") || s + 1,
                    m = s - p;
                if (window.clearTimeout(n), c.data("callee2", u), m < o.doubletap_int && e.target === t && m > 100) {
                    c.data("doubletapped", !0), window.clearTimeout(o.tap_timer);
                    var f = {
                            position: {
                                x: o.touch_capable ? e.originalEvent.changedTouches[0].screenX : e.screenX,
                                y: o.touch_capable ? e.originalEvent.changedTouches[0].screenY : e.screenY
                            },
                            offset: {
                                x: o.touch_capable ? e.originalEvent.changedTouches[0].pageX - e.originalEvent.changedTouches[0].target.offsetLeft : e.offsetX,
                                y: o.touch_capable ? e.originalEvent.changedTouches[0].pageY - e.originalEvent.changedTouches[0].target.offsetTop : e.offsetY
                            },
                            time: Date.now(),
                            target: e.target
                        },
                        h = {
                            firstTap: a,
                            secondTap: f,
                            interval: f.time - a.time
                        };
                    d || i(l, "doubletap", e, h), d = !0, r = window.setTimeout(function() {
                        d = !1
                    }, o.doubletap_int)
                } else c.data("lastTouch", s), n = window.setTimeout(function() {
                    window.clearTimeout(n)
                }, o.doubletap_int, [e]);
                c.data("lastTouch", s)
            })
        },
        remove: function() {
            e(this).off(o.startevent, e(this).data.callee1).off(o.endevent, e(this).data.callee2)
        }
    }, e.event.special.singletap = {
        setup: function() {
            var t = this,
                n = e(t),
                a = null,
                s = null,
                r = {
                    x: 0,
                    y: 0
                };
            n.on(o.startevent, function l(e) {
                return e.which && 1 !== e.which ? !1 : (s = Date.now(), a = e.target, n.data("callee1", l), r.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, r.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, !0)
            }).on(o.endevent, function c(e) {
                if (n.data("callee2", c), e.target === a) {
                    var l = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX,
                        d = e.originalEvent.changedTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY;
                    o.tap_timer = window.setTimeout(function() {
                        if (!n.data("doubletapped") && !n.data("tapheld") && r.x === l && r.y === d) {
                            var a = e.originalEvent,
                                c = {
                                    position: {
                                        x: o.touch_capable ? a.changedTouches[0].screenX : e.screenX,
                                        y: o.touch_capable ? a.changedTouches[0].screenY : e.screenY
                                    },
                                    offset: {
                                        x: o.touch_capable ? a.changedTouches[0].pageX - a.changedTouches[0].target.offsetLeft : e.offsetX,
                                        y: o.touch_capable ? a.changedTouches[0].pageY - a.changedTouches[0].target.offsetTop : e.offsetY
                                    },
                                    time: Date.now(),
                                    target: e.target
                                };
                            c.time - s < o.taphold_threshold && i(t, "singletap", e, c)
                        }
                    }, o.doubletap_int)
                }
            })
        },
        remove: function() {
            e(this).off(o.startevent, e(this).data.callee1).off(o.endevent, e(this).data.callee2)
        }
    }, e.event.special.tap = {
        setup: function() {
            var t, n, a = this,
                s = e(a),
                r = !1,
                l = null,
                c = {
                    x: 0,
                    y: 0
                };
            s.on(o.startevent, function d(e) {
                return s.data("callee1", d), e.which && 1 !== e.which ? !1 : (r = !0, c.x = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageX : e.pageX, c.y = e.originalEvent.targetTouches ? e.originalEvent.targetTouches[0].pageY : e.pageY, t = Date.now(), l = e.target, n = e.originalEvent.targetTouches ? e.originalEvent.targetTouches : [e], !0)
            }).on(o.endevent, function p(e) {
                s.data("callee2", p);
                var d, u = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageX : e.pageX,
                    m = e.originalEvent.targetTouches ? e.originalEvent.changedTouches[0].pageY : e.pageY,
                    f = c.x - u,
                    h = c.y - m;
                if (l === e.target && r && Date.now() - t < o.taphold_threshold && (c.x === u && c.y === m || f >= -o.tap_pixel_range && f <= o.tap_pixel_range && h >= -o.tap_pixel_range && h <= o.tap_pixel_range)) {
                    for (var g = e.originalEvent, v = [], w = 0; w < n.length; w++) {
                        var b = {
                            position: {
                                x: o.touch_capable ? g.changedTouches[w].screenX : e.screenX,
                                y: o.touch_capable ? g.changedTouches[w].screenY : e.screenY
                            },
                            offset: {
                                x: o.touch_capable ? g.changedTouches[w].pageX - g.changedTouches[w].target.offsetLeft : e.offsetX,
                                y: o.touch_capable ? g.changedTouches[w].pageY - g.changedTouches[w].target.offsetTop : e.offsetY
                            },
                            time: Date.now(),
                            target: e.target
                        };
                        v.push(b)
                    }
                    d = "tap" + (n.length >= 2 ? n.length : ""), i(a, d, e, v)
                }
            })
        },
        remove: function() {
            e(this).off(o.startevent, e(this).data.callee1).off(o.endevent, e(this).data.callee2)
        }
    }, e.event.special.swipe = {
        setup: function() {
            function t(i) {
                r = e(i.currentTarget), r.data("callee1", t), d.x = i.originalEvent.targetTouches ? i.originalEvent.targetTouches[0].pageX : i.pageX, d.y = i.originalEvent.targetTouches ? i.originalEvent.targetTouches[0].pageY : i.pageY, p.x = d.x, p.y = d.y, l = !0;
                var n = i.originalEvent;
                a = {
                    position: {
                        x: o.touch_capable ? n.touches[0].screenX : i.screenX,
                        y: o.touch_capable ? n.touches[0].screenY : i.screenY
                    },
                    offset: {
                        x: o.touch_capable ? n.touches[0].pageX - n.touches[0].target.offsetLeft : i.offsetX,
                        y: o.touch_capable ? n.touches[0].pageY - n.touches[0].target.offsetTop : i.offsetY
                    },
                    time: Date.now(),
                    target: i.target
                }
            }

            function i(t) {
                r = e(t.currentTarget), r.data("callee2", i), p.x = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageX : t.pageX, p.y = t.originalEvent.targetTouches ? t.originalEvent.targetTouches[0].pageY : t.pageY;
                var n, s = r.parent().data("xthreshold") ? r.parent().data("xthreshold") : r.data("xthreshold"),
                    u = r.parent().data("ythreshold") ? r.parent().data("ythreshold") : r.data("ythreshold"),
                    m = "undefined" != typeof s && s !== !1 && parseInt(s, 10) ? parseInt(s, 10) : o.swipe_h_threshold,
                    f = "undefined" != typeof u && u !== !1 && parseInt(u, 10) ? parseInt(u, 10) : o.swipe_v_threshold;
                if (d.y > p.y && d.y - p.y > f && (n = "swipeup"), d.x < p.x && p.x - d.x > m && (n = "swiperight"), d.y < p.y && p.y - d.y > f && (n = "swipedown"), d.x > p.x && d.x - p.x > m && (n = "swipeleft"), void 0 !== n && l) {
                    d.x = 0, d.y = 0, p.x = 0, p.y = 0, l = !1;
                    var h = t.originalEvent,
                        g = {
                            position: {
                                x: o.touch_capable ? h.touches[0].screenX : t.screenX,
                                y: o.touch_capable ? h.touches[0].screenY : t.screenY
                            },
                            offset: {
                                x: o.touch_capable ? h.touches[0].pageX - h.touches[0].target.offsetLeft : t.offsetX,
                                y: o.touch_capable ? h.touches[0].pageY - h.touches[0].target.offsetTop : t.offsetY
                            },
                            time: Date.now(),
                            target: t.target
                        },
                        v = Math.abs(a.position.x - g.position.x),
                        w = Math.abs(a.position.y - g.position.y),
                        b = {
                            startEvnt: a,
                            endEvnt: g,
                            direction: n.replace("swipe", ""),
                            xAmount: v,
                            yAmount: w,
                            duration: g.time - a.time
                        };
                    c = !0, r.trigger("swipe", b).trigger(n, b)
                }
            }

            function n(t) {
                r = e(t.currentTarget);
                var i = "";
                if (r.data("callee3", n), c) {
                    var s = r.data("xthreshold"),
                        d = r.data("ythreshold"),
                        p = "undefined" != typeof s && s !== !1 && parseInt(s, 10) ? parseInt(s, 10) : o.swipe_h_threshold,
                        u = "undefined" != typeof d && d !== !1 && parseInt(d, 10) ? parseInt(d, 10) : o.swipe_v_threshold,
                        m = t.originalEvent,
                        f = {
                            position: {
                                x: o.touch_capable ? m.changedTouches[0].screenX : t.screenX,
                                y: o.touch_capable ? m.changedTouches[0].screenY : t.screenY
                            },
                            offset: {
                                x: o.touch_capable ? m.changedTouches[0].pageX - m.changedTouches[0].target.offsetLeft : t.offsetX,
                                y: o.touch_capable ? m.changedTouches[0].pageY - m.changedTouches[0].target.offsetTop : t.offsetY
                            },
                            time: Date.now(),
                            target: t.target
                        };
                    a.position.y > f.position.y && a.position.y - f.position.y > u && (i = "swipeup"), a.position.x < f.position.x && f.position.x - a.position.x > p && (i = "swiperight"), a.position.y < f.position.y && f.position.y - a.position.y > u && (i = "swipedown"), a.position.x > f.position.x && a.position.x - f.position.x > p && (i = "swipeleft");
                    var h = Math.abs(a.position.x - f.position.x),
                        g = Math.abs(a.position.y - f.position.y),
                        v = {
                            startEvnt: a,
                            endEvnt: f,
                            direction: i.replace("swipe", ""),
                            xAmount: h,
                            yAmount: g,
                            duration: f.time - a.time
                        };
                    r.trigger("swipeend", v)
                }
                l = !1, c = !1
            }
            var a, s = this,
                r = e(s),
                l = !1,
                c = !1,
                d = {
                    x: 0,
                    y: 0
                },
                p = {
                    x: 0,
                    y: 0
                };
            r.on(o.startevent, t), r.on(o.moveevent, i), r.on(o.endevent, n)
        },
        remove: function() {
            e(this).off(o.startevent, e(this).data.callee1).off(o.moveevent, e(this).data.callee2).off(o.endevent, e(this).data.callee3)
        }
    }, e.event.special.scrollstart = {
        setup: function() {
            function t(e, t) {
                n = t, i(s, n ? "scrollstart" : "scrollend", e)
            }
            var n, a, s = this,
                r = e(s);
            r.on(o.scrollevent, function l(e) {
                r.data("callee", l), n || t(e, !0), clearTimeout(a), a = setTimeout(function() {
                    t(e, !1)
                }, 50)
            })
        },
        remove: function() {
            e(this).off(o.scrollevent, e(this).data.callee)
        }
    };
    var s, r, l, c, d, p = e(window),
        u = {
            0: !0,
            180: !0
        };
    if (o.orientation_support) {
        var m = window.innerWidth || p.width(),
            f = window.innerHeight || p.height(),
            h = 50;
        c = m > f && m - f > h, d = u[window.orientation], (c && d || !c && !d) && (u = {
            "-90": !0,
            90: !0
        })
    }
    e.event.special.orientationchange = s = {
        setup: function() {
            return o.orientation_support ? !1 : (l = r(), p.on("throttledresize", t), !0)
        },
        teardown: function() {
            return o.orientation_support ? !1 : (p.off("throttledresize", t), !0)
        },
        add: function(e) {
            var t = e.handler;
            e.handler = function(e) {
                return e.orientation = r(), t.apply(this, arguments)
            }
        }
    }, e.event.special.orientationchange.orientation = r = function() {
        var e = !0,
            t = document.documentElement;
        return e = o.orientation_support ? u[window.orientation] : t && t.clientWidth / t.clientHeight < 1.1, e ? "portrait" : "landscape"
    }, e.event.special.throttledresize = {
        setup: function() {
            e(this).on("resize", y)
        },
        teardown: function() {
            e(this).off("resize", y)
        }
    };
    var g, v, w, b = 250,
        y = function() {
            v = Date.now(), w = v - $, w >= b ? ($ = v, e(this).trigger("throttledresize")) : (g && window.clearTimeout(g), g = window.setTimeout(t, b - w))
        },
        $ = 0;
    e.each({
        scrollend: "scrollstart",
        swipeup: "swipe",
        swiperight: "swipe",
        swipedown: "swipe",
        swipeleft: "swipe",
        swipeend: "swipe",
        tap2: "tap"
    }, function(t, i) {
        e.event.special[t] = {
            setup: function() {
                e(this).on(i, e.noop)
            }
        }
    })
}(jQuery), define("js/awards", 
     [], 
	  function(e, t, i, n, a) {
    var o, s, r = window.TCOM,
        l = r.$,
        c = r._,
        d = {
            $el: l(".mlp-reviews"),
            isInViewport: !1,
            backgroundHeight: 0,
            initialize: function(e) {
                var t = this;
                if (0 !== this.$el.length) {
                    o = e.main, s = r.Analytics, c.bindAll(this, "onKBBRatings", "onEdmundsRatings", "onDetailClick", "onDetailClose", "handleParallax", "bindScrollListener", "getBackgroundHeight", "onAwardClick"), t.$welcome = l(".mlp-welcome");
                    var i = t.$welcome.data("series"),
                        n = t.$el.find("[data-year]").data("year") || t.$welcome.data("year");
                    this.$slider = this.$el.find(".tcom-slider"), window.tcom.services.getKBBRating(i, n).done(function(e) {
                        t.onKBBRatings(e)
                    }), window.tcom.services.getEdmundsRating(i, n).done(function(e) {
                        t.onEdmundsRatings(e)
                    }), this.parallaxBackgroundImg = l(".mlp-awards-background-image"), this.parallaxPicture = this.parallaxPictureImg = l(".mlp-awards-background-image .tcom-picture img"), r.Events.on("Scroller:target", this.bindScrollListener), this.$el.on("click", ".mlp-awards-detail-link", this.onDetailClick), this.$el.on("click", ".btn-close", this.onDetailClose), this.$el.on("click", ".mlp-awards-logo", this.onAwardClick)
                }
            },
            bindScrollListener: function(e, t) {
                var i = this;
                i.isInViewport === !1 && Modernizr.touch === !1 && r.width >= 1023 && (".mlp-models" === t.target || ".mlp-awards" === t.target || ".mlp-reviews" === t.target) && (i.parallaxBackgroundImg.length || i.parallaxPicture.length || i.parallaxPictureImg.length) ? (i.isInViewport = !0, i.getBackgroundHeight(), r.Events.on("Scroller:scrolling.mlpAwards resizing:complete.mlpAwards", i.handleParallax)) : i.isInViewport === !0 && ".mlp-awards" !== t.target && ".mlp-models" !== t.target && (i.isInViewport = !1, r.Events.off(".mlpAwards"))
            },
            getBackgroundHeight: function() {
                this.parallaxBackgroundImg && (this.pictureHeight = this.parallaxPictureImg.height(), this.backgroundHeight = this.parallaxBackgroundImg.height())
            },
            handleParallax: function() {
                var e = 300,
                    t = 300,
                    i = r.height - e,
                    n = this.backgroundHeight - t,
                    a = this.parallaxBackgroundImg.offset().top,
                    o = r.Scroller.scrollTop,
                    s = this.pictureHeight - this.backgroundHeight,
                    l = (a - o + n) / (i + n);
                l = 1 - l, this.parallaxPicture.css("transform", "translate3d(0, -" + Math.min(l * s, s) + "px, 0)")
            },
            getBtnData: function() {
                var e = this.$el.find(".mlp-awards-view-all").first().text(),
                    t = this.$el.find(".mlp-awards-view-all").first().attr("href");
                return {
                    btnText: e,
                    btnLink: t,
                    edmundsURL: this.$el.data("edmundsUrl"),
                    kbbURL: this.$el.data("kbbUrl")
                }
            },
            onKBBRatings: function(e) {
                e && e.channel && e.channel.title ? this.$slider.append(t(c.extend(e, this.getBtnData()))) : o.awardsError = "KBB data not found.", this.kbbReady = !0, this.checkReadyState()
            },
            onEdmundsRatings: function(t) {
                t && t.averageRating ? this.$slider.append(e(c.extend(t, this.getBtnData()))) : o.awardsError = "Edmunds data not found.", this.edmundsReady = !0, this.checkReadyState()
            },
            onDetailClick: function(e) {
                var t = l(e.currentTarget);
                l(".mlp-awards-detail-content").html(t.find(".mlp-awards-detail-content").html()), this.$el.addClass("detail-active"), this.$el.find(".mlp-awards-detail").addClass("is-on"), s.fire("mlp", "223.24", {
                    linkname: "details"
                })
            },
            onDetailClose: function() {
                this.$el.removeClass("detail-active"), this.$el.find(".mlp-awards-detail").removeClass("is-on"), s.fire("mlp", "223.24", {
                    linkname: "close"
                })
            },
            checkReadyState: function() {
                var e = this;
                e.edmundsReady && e.kbbReady && l.when(r.windowLoad).then(function() {
                    var t = l("html").hasClass("ie8") ? 978 : 1500;
                    e.$slider.slider({
                        defaultSliderWidth: 1e4,
                        maxSliderWidth: t,
                        maxSlideWidth: t,
                        maxPerPage: 1,
                        minPerPage: 1,
                        shrinkRatio: 1,
                        arrowPosition: "outside",
                        marginRatio: 0,
                        pageIndicator: !0,
                        render: !0,
                        templateSlides: e.$el.find(".mlp-awards-panel"),
                        resizable: !0
                    }), e.$el.find(".mlp-awards-detail-content").each(function(e, t) {
                        "" !== l.trim(l(this).text()) && l(this).closest(".mlp-awards-panel").addClass("has-details")
                    }), e.$slider.on("click", "button,.btn,.slider-indicator", function(e) {
                        var t = l(e.currentTarget);
                        t.hasClass("next") ? s.fire("mlp", "223.24", {
                            linkname: "Next"
                        }) : t.hasClass("prev") ? s.fire("mlp", "223.24", {
                            linkname: "Previous"
                        }) : t.hasClass("btn") ? s.fire("mlp", "223.24", {
                            linkname: t.text()
                        }) : t.hasClass("slider-indicator") && s.fire("mlp", "223.24", {
                            linkname: "Pagination"
                        })
                    })
                })
            },
            onAwardClick: function(e) {
                var t = l(e.currentTarget),
                    i = t.closest("a").attr("href");
                i && i.indexOf("edmunds") >= 0 ? s.fire("mlp", "223.23", {
                    award_site: "edmunds.com"
                }) : i && i.indexOf("kbb") >= 0 ? s.fire("mlp", "223.23", {
                    award_site: "kbb.com"
                }) : i && i.indexOf("alg") >= 0 && s.fire("mlp", "223.23", {
                    award_site: "alg.com"
                })
            }
        };
    return d
}),define("js/compare", 
     [], 
	  function(e, t) {
    var i, n, a = window.TCOM,
        o = a.$,
        s = a._,
        r = {
            initialize: function(e) {
                var t = this;
                t.lang = a.Util.lang, this.$el = o(e.$el), this.seriesCode = e.seriesCode, this.seriesName = e.seriesName, this.seriesYear = e.seriesYear, this.$el.addClass("rendering"), 0 !== this.$el.length && (i = e.main, n = a.Analytics, s.bindAll(this, "onKeyCompetitorTrims", "onChangeCompareTrim", "onComparisonReportComplete", "renderComparisonReport", "resizeOptions"), window.tcom.services.getKeyCompetitorTrims(this.$el.data("chromeId")).done(this.onKeyCompetitorTrims), this.changeInitialized = !1, this.$el.on("change", "select", this.onChangeCompareTrim), a.Events.on("resizing", this.resizeOptions), t.initCompareAnalytics())
            },
            onKeyCompetitorTrims: function(e) {
                var t = this;
                a.log("key competitor trims received"), e && e.length && (this.keyCompetitorTrims = e, s.each(e, function(e) {
                    var i = '<option data-trim="' + e.trimName + '" data-make="' + t.toProperCase(e.makeName) + '" data-model="' + e.modelName + '" value="' + e.trimId + '"><span>' + t.toProperCase(e.makeName) + " " + e.trimName + " f " + e.trimName.split("(")[0] + "</span></option>";
                    t.$el.find("select").append(i)
                }), t.onChangeCompareTrim())
            },
            onChangeCompareTrim: function() {
                var e = this.$el.find("select"),
                    t = e.find("option:selected");
                window.tcom.services.getComparisonReport([this.$el.data("chromeId"), e.val()]).done(this.onComparisonReportComplete), this.changeInitialized && n.fire("mlp", "223.26", {
                    competitor_name: t.attr("data-make") + " " + t.attr("data-model")
                }), this.changeInitialized = !0
            },
            onComparisonReportComplete: function(e) {
                -1 !== e.statusCode && (a.log("comparison report complete"), this.comparisonReportData = e, this.renderComparisonReport(e), this.$el.removeClass("rendering"), this.resizeOptions())
            },
            getDisplayName: function(e) {
                var t = o(e).html();
                return t
            },
            renderComparisonReport: function(e) {
                var t = this;
                t.$el.find("select").fancySelect({
                    className: "compare-select",
                    triggerTemplate: function(e) {
                        return e.data("trim") ? "<strong>" + e.data("make") + "</strong><br />" + e.data("model") + " " + e.data("trim").split("(")[0] : ""
                    },
                    optionTemplate: function(e) {
                        return "<strong>" + e.data("make") + "</strong><br />" + e.data("model") + " " + e.data("trim").split("(")[0]
                    }
                });
                var i = s.map(this.$el.find(".mlp-compare-fields li"), function(e) {
                        return {
                            displayName: t.getDisplayName(e),
                            serviceName: o(e).data("comparisonreportTitle") ? o(e).data("comparisonreportTitle") : o(e).html()
                        }
                    }),
                    n = [],
                    r = [],
                    l = {
                        en: [{
                            heading: "cost",
                            label: "msrp"
                        }, {
                            heading: "fuel economy",
                            label: "epa city"
                        }, {
                            heading: "fuel economy",
                            label: "epa highway"
                        }],
                        es: [{
                            heading: "costo",
                            label: "msrp"
                        }, {
                            heading: "economia de combustible",
                            label: "epa en ciudad"
                        }, {
                            heading: "economia de combustible",
                            label: "epa en carretera"
                        }]
                    }[t.lang || "en"],
                    c = this;
                if (this.$el.find(".tbl-category").remove(), this.$el.find("table.col-2 tbody tr:not(.table-header)").remove(), s.each(e.comparisonData.heading, function(e) {
                        s.each(e.rowAndSubHeading, function(t) {
                            t.rowLabel.indexOf("Fuel Cap") > -1 && (r.push(t.vehicleData[0].colData), r.push(t.vehicleData[1].colData));
                            var a = s.find(l, function(i) {
                                return t.rowLabel.toLowerCase().indexOf(i.label) > -1 && e.headingName.toLowerCase() === i.heading
                            });
                            a && (a.info = jQuery.extend(!0, {}, t)), s.each(i, function(e, a) {
                                t.rowLabel.indexOf(e.serviceName) > -1 && (n.push(s.extend(s.clone(t, !0), {
                                    displayName: e.displayName,
                                    sortOrder: a
                                })), i[a] = {})
                            })
                        })
                    }), n = s.sortBy(n, function(e) {
                        return e.sortOrder
                    }), l[0].info) {
                    var d = t.getMsrpMpgCategory(l);
                    n.unshift(d)
                }
                for (var p = 0; p < n.length; p++) {
                    var u = 0;
                    if (n[p].displayName = n[p].displayName.replace("[", '<sup data-disclaimer="'), n[p].displayName = n[p].displayName.replace("]", '"></sup>'), n[p].displayName.indexOf("Fuel Cap") > -1)
                        for (u; u < r.length; u++) n[p].vehicleData[u].colData = r[u];
                    c.addTableCategory(n[p])
                }
                a.Events.trigger("render")
            },
            resizeOptions: function(e) {
                var t = this.$el.find("table").height() - this.$el.find("th").height();
                this.$el.find(".options").css("min-height", t)
            },
            addTableCategory: function(t) {
                a.log("Adding compare category", t);
                var i = e(t);
                this.$el.find("table.col-2 tbody").append(i)
            },
            toProperCase: function(e) {
                return s.chain(e.split(" ")).map(function(e) {
                    return e.length < 4 ? e : e.toLowerCase().replace(/\b([a-z])/g, function(e) {
                        return e.toUpperCase()
                    })
                }).join(" ").value()
            },
            getMsrpMpgCategory: function(e) {
                var t = e[0].info,
                    i = e[1].info && e[2].info;
                if (t && i) {
                    var n = e[0].info.vehicleData[0].advantageFlag,
                        a = e[1].info.vehicleData[0].advantageFlag && e[2].info.vehicleData[0].advantageFlag,
                        o = "True" === n || "True" === a;
                    e[0].info.displayName = "Total MSRP / MPG<sup data-disclaimer='msrp_total'></sup>", e[0].info.vehicleData[0].advantageFlag = o, "True" === n ? e[0].info.vehicleData[0].colData = "<span class='msrp-label'>" + e[0].info.vehicleData[0].colData + "</span>" : e[0].info.vehicleData[0].colData = "<span class='msrp-label no-advantage'>" + e[0].info.vehicleData[0].colData + "</span>", "True" === a ? e[0].info.vehicleData[0].colData += "<span>" + e[1].info.vehicleData[0].colData + "/" + e[2].info.vehicleData[0].colData + " mpg</span>" : e[0].info.vehicleData[0].colData += "<span class='no-advantage'>" + e[1].info.vehicleData[0].colData + "/" + e[2].info.vehicleData[0].colData + " mpg</span>", e[0].info.vehicleData[1].colData = "<span class='msrp-label'>" + e[0].info.vehicleData[1].colData + "</span><span>" + e[1].info.vehicleData[1].colData + "/" + e[2].info.vehicleData[1].colData + " mpg</span>"
                } else if (t) {
                    var n = e[0].info.vehicleData[0].advantageFlag,
                        o = "True" === n;
                    e[0].info.displayName = "Total MSRP<sup data-disclaimer='msrp_total'></sup>", e[0].info.vehicleData[0].advantageFlag = o, "True" === n ? e[0].info.vehicleData[0].colData = "<span class='msrp-label no-border'>" + e[0].info.vehicleData[0].colData + "</span>" : e[0].info.vehicleData[0].colData = "<span class='msrp-label no-advantage no-border'>" + e[0].info.vehicleData[0].colData + "</span>", e[0].info.vehicleData[1].colData = "<span class='msrp-label no-border'>" + e[0].info.vehicleData[1].colData + "</span>"
                } else if (i) {
                    var a = e[1].info.vehicleData[0].advantageFlag && e[2].info.vehicleData[0].advantageFlag,
                        o = "True" === a;
                    e[0].info.displayName = "MPG", e[0].info.vehicleData[0].advantageFlag = o, "True" === a ? e[0].info.vehicleData[0].colData = "<span>" + e[1].info.vehicleData[0].colData + "/" + e[2].info.vehicleData[0].colData + " mpg</span>" : e[0].info.vehicleData[0].colData = "<span class='no-advantage'>" + e[1].info.vehicleData[0].colData + "/" + e[2].info.vehicleData[0].colData + " mpg</span>", e[0].info.vehicleData[1].colData = "<span>" + e[1].info.vehicleData[1].colData + "/" + e[2].info.vehicleData[1].colData + " mpg</span>"
                }
                return e[0].info
            },
            initCompareAnalytics: function() {
                var e = this;
                e.$el.on("tap", "a, .trigger", function(e) {
                    var t = o(e.currentTarget),
                        i = "";
                    t.hasClass("trigger") ? n.fire("mlp", "223.25", {
                        linkname: "Expand"
                    }) : t.hasClass("mlp-compare-detail-link") ? (i = t.text().replace(/[0-9]/g, ""), n.fire("mlp", "223.25", {
                        linkname: i
                    })) : t.closest(".mlp-compare-chrome").length && n.fire("mlp", "223.25", {
                        linkname: "Chrome Data"
                    })
                })
            }
        };
    return r
});
var HANDJS = HANDJS || {};
! function() {
    function e() {
        T = !0, clearTimeout(S), S = setTimeout(function() {
            T = !1
        }, 700)
    }

    function t(e) {
        var t = [];
        if (e)
            for (t.unshift(e); e.parentNode;) t.unshift(e.parentNode), e = e.parentNode;
        return t
    }

    function i(e, i) {
        for (var n = t(e), a = t(i), o = null; n.length > 0 && n[0] == a.shift();) o = n.shift();
        return o
    }

    function n(e, t, n) {
        for (var a = i(e, t), o = e, s = []; o && o != a;) g(o, "pointerenter") && s.push(o), o = o.parentNode;
        for (; s.length > 0;) n(s.pop())
    }

    function a(e, t, n) {
        for (var a = i(e, t), o = e; o && o != a;) g(o, "pointerleave") && n(o), o = o.parentNode
    }

    function o(e, t) {
        ["pointerdown", "pointermove", "pointerup", "pointerover", "pointerout"].forEach(function(i) {
            window.addEventListener(e(i), function(e) {
                !T && v(e.target, i) && t(e, i, !0)
            })
        }), void 0 === window["on" + e("pointerenter").toLowerCase()] && window.addEventListener(e("pointerover"), function(e) {
            if (!T) {
                var i = v(e.target, "pointerenter");
                i && i !== window && (i.contains(e.relatedTarget) || n(i, e.relatedTarget, function(i) {
                    t(e, "pointerenter", !1, i, e.relatedTarget)
                }))
            }
        }), void 0 === window["on" + e("pointerleave").toLowerCase()] && window.addEventListener(e("pointerout"), function(e) {
            if (!T) {
                var i = v(e.target, "pointerleave");
                i && i !== window && (i.contains(e.relatedTarget) || a(i, e.relatedTarget, function(i) {
                    t(e, "pointerleave", !1, i, e.relatedTarget)
                }))
            }
        })
    }
    if (!window.PointerEvent) {
        Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
            var t = Object(this),
                i = t.length >>> 0;
            if (0 === i) return -1;
            var n = 0;
            if (arguments.length > 0 && (n = Number(arguments[1]), n != n ? n = 0 : 0 != n && n != 1 / 0 && n != -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), n >= i) return -1;
            for (var a = n >= 0 ? n : Math.max(i - Math.abs(n), 0); i > a; a++)
                if (a in t && t[a] === e) return a;
            return -1
        }), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
            if (!(this && e instanceof Function)) throw new TypeError;
            for (var i = 0; i < this.length; i++) e.call(t, this[i], i, this)
        }), String.prototype.trim || (String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/, "")
        });
        var s = ["pointerdown", "pointerup", "pointermove", "pointerover", "pointerout", "pointercancel", "pointerenter", "pointerleave"],
            r = ["PointerDown", "PointerUp", "PointerMove", "PointerOver", "PointerOut", "PointerCancel", "PointerEnter", "PointerLeave"],
            l = "touch",
            c = "pen",
            d = "mouse",
            p = {},
            u = function(e) {
                for (; e && !e.handjs_forcePreventDefault;) e = e.parentNode;
                return !!e || window.handjs_forcePreventDefault
            },
            m = function(e, t, i, n, a) {
                var o;
                if (document.createEvent ? (o = document.createEvent("MouseEvents"), o.initMouseEvent(t, i, !0, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, a || e.relatedTarget)) : (o = document.createEventObject(), o.screenX = e.screenX, o.screenY = e.screenY, o.clientX = e.clientX, o.clientY = e.clientY, o.ctrlKey = e.ctrlKey, o.altKey = e.altKey, o.shiftKey = e.shiftKey, o.metaKey = e.metaKey, o.button = e.button, o.relatedTarget = a || e.relatedTarget), void 0 === o.offsetX && (void 0 !== e.offsetX ? (Object && void 0 !== Object.defineProperty && (Object.defineProperty(o, "offsetX", {
                        writable: !0
                    }), Object.defineProperty(o, "offsetY", {
                        writable: !0
                    })), o.offsetX = e.offsetX, o.offsetY = e.offsetY) : Object && void 0 !== Object.defineProperty ? (Object.defineProperty(o, "offsetX", {
                        get: function() {
                            return this.currentTarget && this.currentTarget.offsetLeft ? e.clientX - this.currentTarget.offsetLeft : e.clientX
                        }
                    }), Object.defineProperty(o, "offsetY", {
                        get: function() {
                            return this.currentTarget && this.currentTarget.offsetTop ? e.clientY - this.currentTarget.offsetTop : e.clientY
                        }
                    })) : void 0 !== e.layerX && (o.offsetX = e.layerX - e.currentTarget.offsetLeft, o.offsetY = e.layerY - e.currentTarget.offsetTop)), void 0 !== e.isPrimary ? o.isPrimary = e.isPrimary : o.isPrimary = !0, e.pressure) o.pressure = e.pressure;
                else {
                    var s = 0;
                    void 0 !== e.which ? s = e.which : void 0 !== e.button && (s = e.button), o.pressure = 0 == s ? 0 : .5
                }
                if (e.rotation ? o.rotation = e.rotation : o.rotation = 0, e.hwTimestamp ? o.hwTimestamp = e.hwTimestamp : o.hwTimestamp = 0, e.tiltX ? o.tiltX = e.tiltX : o.tiltX = 0, e.tiltY ? o.tiltY = e.tiltY : o.tiltY = 0, e.height ? o.height = e.height : o.height = 0, e.width ? o.width = e.width : o.width = 0, o.preventDefault = function() {
                        void 0 !== e.preventDefault && e.preventDefault()
                    }, void 0 !== o.stopPropagation) {
                    var r = o.stopPropagation;
                    o.stopPropagation = function() {
                        void 0 !== e.stopPropagation && e.stopPropagation(), r.call(this)
                    }
                }
                switch (o.pointerId = e.pointerId, o.pointerType = e.pointerType, o.pointerType) {
                    case 2:
                        o.pointerType = l;
                        break;
                    case 3:
                        o.pointerType = c;
                        break;
                    case 4:
                        o.pointerType = d
                }
                n ? n.dispatchEvent(o) : e.target ? e.target.dispatchEvent(o) : e.srcElement.fireEvent("on" + b(t), o)
            },
            f = function(e, t, i, n, a) {
                e.pointerId = 1, e.pointerType = d, m(e, t, i, n, a)
            },
            h = function(e, t, i, n, a, o) {
                var s = t.identifier + 2;
                t.pointerId = s, t.pointerType = l, t.currentTarget = i, void 0 !== n.preventDefault && (t.preventDefault = function() {
                    n.preventDefault()
                }), m(t, e, a, i, o)
            },
            g = function(e, t) {
                return e.__handjsGlobalRegisteredEvents && e.__handjsGlobalRegisteredEvents[t]
            },
            v = function(e, t) {
                for (; e && !g(e, t);) e = e.parentNode;
                return e ? e : g(window, t) ? window : void 0
            },
            w = function(e, t, i, n, a, o) {
                v(i, e) && h(e, t, i, n, a, o)
            },
            b = function(e) {
                return e.toLowerCase().replace("pointer", "mouse")
            },
            y = function(e, t) {
                var i = s.indexOf(t),
                    n = e + r[i];
                return n
            },
            $ = function(e, t, i, n) {
                if (void 0 === e.__handjsRegisteredEvents && (e.__handjsRegisteredEvents = []), n) {
                    if (void 0 !== e.__handjsRegisteredEvents[t]) return void e.__handjsRegisteredEvents[t]++;
                    e.__handjsRegisteredEvents[t] = 1, e.addEventListener(t, i, !1)
                } else {
                    if (-1 !== e.__handjsRegisteredEvents.indexOf(t) && (e.__handjsRegisteredEvents[t]--, 0 != e.__handjsRegisteredEvents[t])) return;
                    e.removeEventListener(t, i), e.__handjsRegisteredEvents[t] = 0
                }
            },
            _ = function(e, t, i) {
                if (e.__handjsGlobalRegisteredEvents || (e.__handjsGlobalRegisteredEvents = []), i) {
                    if (void 0 !== e.__handjsGlobalRegisteredEvents[t]) return void e.__handjsGlobalRegisteredEvents[t]++;
                    e.__handjsGlobalRegisteredEvents[t] = 1
                } else void 0 !== e.__handjsGlobalRegisteredEvents[t] && (e.__handjsGlobalRegisteredEvents[t]--, e.__handjsGlobalRegisteredEvents[t] < 0 && (e.__handjsGlobalRegisteredEvents[t] = 0));
                var n, a;
                switch (window.MSPointerEvent ? (n = function(e) {
                    return y("MS", e)
                }, a = m) : (n = b, a = f), t) {
                    case "pointerenter":
                    case "pointerleave":
                        var o = n(t);
                        void 0 !== e["on" + o.toLowerCase()] && $(e, o, function(e) {
                            a(e, t)
                        }, i)
                }
            },
            C = function(e) {
                var t = e.prototype ? e.prototype.addEventListener : e.addEventListener,
                    i = function(e, i, n) {
                        -1 != s.indexOf(e) && _(this, e, !0), void 0 === t ? this.attachEvent("on" + b(e), i) : t.call(this, e, i, n)
                    };
                e.prototype ? e.prototype.addEventListener = i : e.addEventListener = i
            },
            x = function(e) {
                var t = e.prototype ? e.prototype.removeEventListener : e.removeEventListener,
                    i = function(e, i, n) {
                        -1 != s.indexOf(e) && _(this, e, !1), void 0 === t ? this.detachEvent(b(e), i) : t.call(this, e, i, n)
                    };
                e.prototype ? e.prototype.removeEventListener = i : e.removeEventListener = i
            };
        C(window), C(window.HTMLElement || window.Element), C(document), C(HTMLBodyElement), C(HTMLDivElement), C(HTMLImageElement), C(HTMLUListElement), C(HTMLAnchorElement), C(HTMLLIElement), C(HTMLTableElement), window.HTMLSpanElement && C(HTMLSpanElement), window.HTMLCanvasElement && C(HTMLCanvasElement), window.SVGElement && C(SVGElement), x(window), x(window.HTMLElement || window.Element), x(document), x(HTMLBodyElement), x(HTMLDivElement), x(HTMLImageElement), x(HTMLUListElement), x(HTMLAnchorElement), x(HTMLLIElement), x(HTMLTableElement), window.HTMLSpanElement && x(HTMLSpanElement), window.HTMLCanvasElement && x(HTMLCanvasElement), window.SVGElement && x(SVGElement);
        var T = !1,
            S = -1;
        ! function() {
            window.MSPointerEvent ? o(function(e) {
                return y("MS", e)
            }, m) : (o(b, f), void 0 !== window.ontouchstart && (window.addEventListener("touchstart", function(t) {
                for (var i = 0; i < t.changedTouches.length; ++i) {
                    var a = t.changedTouches[i];
                    p[a.identifier] = a.target, w("pointerover", a, a.target, t, !0), n(a.target, null, function(e) {
                        h("pointerenter", a, e, t, !1)
                    }), w("pointerdown", a, a.target, t, !0)
                }
                e()
            }), window.addEventListener("touchend", function(t) {
                for (var i = 0; i < t.changedTouches.length; ++i) {
                    var n = t.changedTouches[i],
                        o = p[n.identifier];
                    w("pointerup", n, o, t, !0), w("pointerout", n, o, t, !0), a(o, null, function(e) {
                        h("pointerleave", n, e, t, !1)
                    })
                }
                e()
            }), window.addEventListener("touchmove", function(t) {
                for (var i = 0; i < t.changedTouches.length; ++i) {
                    var o = t.changedTouches[i],
                        s = document.elementFromPoint(o.clientX, o.clientY),
                        r = p[o.identifier];
                    r && u(r) === !0 && t.preventDefault(), w("pointermove", o, r, t, !0), r !== s && (r && (w("pointerout", o, r, t, !0, s), r.contains(s) || a(r, s, function(e) {
                        h("pointerleave", o, e, t, !1, s)
                    })), s && (w("pointerover", o, s, t, !0, r), s.contains(r) || n(s, r, function(e) {
                        h("pointerenter", o, e, t, !1, r)
                    })), p[o.identifier] = s)
                }
                e()
            }), window.addEventListener("touchcancel", function(e) {
                for (var t = 0; t < e.changedTouches.length; ++t) {
                    var i = e.changedTouches[t];
                    w("pointercancel", i, p[i.identifier], e, !0)
                }
            })))
        }(), void 0 === navigator.pointerEnabled && (navigator.pointerEnabled = !0, navigator.msPointerEnabled && (navigator.maxTouchPoints = navigator.msMaxTouchPoints)), document.styleSheets && document.addEventListener && document.addEventListener("DOMContentLoaded", function() {
            if (!HANDJS.doNotProcessCSS && void 0 === document.body.style.touchAction) {
                var e = new RegExp(".+?{.*?}", "m"),
                    t = new RegExp(".+?{", "m"),
                    i = function(i) {
                        var n = e.exec(i);
                        if (n) {
                            var a = n[0];
                            i = i.replace(a, "").trim();
                            var o = t.exec(a)[0].replace("{", "").trim();
                            if (-1 != a.replace(/\s/g, "").indexOf("touch-action:none"))
                                for (var s = document.querySelectorAll(o), r = 0; r < s.length; r++) {
                                    var l = s[r];
                                    void 0 !== l.style.msTouchAction ? l.style.msTouchAction = "none" : l.handjs_forcePreventDefault = !0
                                }
                            return i
                        }
                    },
                    n = function(e) {
                        if (window.setImmediate) e && setImmediate(n, i(e));
                        else
                            for (; e;) e = i(e)
                    };
                try {
                    for (var a = 0; a < document.styleSheets.length; a++) {
                        var o = document.styleSheets[a];
                        if (void 0 != o.href) {
                            var s = new XMLHttpRequest;
                            s.open("get", o.href), s.send();
                            var r = s.responseText.replace(/(\n|\r)/g, "");
                            n(r)
                        }
                    }
                } catch (l) {}
                for (var c = document.getElementsByTagName("style"), a = 0; a < c.length; a++) {
                    var d = c[a],
                        p = d.innerHTML.replace(/(\n|\r)/g, "").trim();
                    n(p)
                }
            }
        }, !1)
    }
},
define("js/mlp", 
      ["./awards", 
	   "./compare",  
	   "tcom", 
	   "organisms/disclaimers/js/disclaimers", 
	   "organisms/tda-flyout/js/tda-flyout"], 
	   function(e, t, i, n, a, o, s, r, l, c, d, p, u, m, f, h, g, v, w, b, y, $, _, C, x, T, S, A) {
    "use strict";
    var k = window.TCOM,
        E = k.$,
        P = k._,
        D = (k.$html, k.Analytics),
        x = window.tcom.ui.Disclaimers,
        O = {
            phone: "(max-width:480px)",
            phablet: "(min-width:481px) and (max-width:768px)",
            tablet: "(min-width:769px) and (max-width:1024px)",
            desktop: "(min-width:1025px)",
            retina: "(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)"
        },
        M = {
            initialize: function() {
                var i = this;
                window.picturefill && window.picturefill(), k.appName = "mlp", i.$app = E(".app"), i.seriesCode = i.$app.attr("data-series-code") || i.$welcome.attr("data-series"), i.seriesYear = i.$app.attr("data-year") || i.$welcome.attr("data-year"), i.seriesName = i.$app.attr("data-series-name") || i.$welcome.attr("data-series-name"), i.Analytics = D, e.initialize({
                    main: i,
                    $el: E(".tcom-welcome,.mlp-welcome"),
                    selectors: {
                        welcomeHero: ".mlp-welcome-hero",
                        localSpecials: ".mlp-local-specials"
                    },
                    seriesCode: i.seriesCode,
                    seriesYear: i.seriesYear
                }), t.initialize({
                    main: i
                }), i.initDisclaimers(), i.initTdaFlyout(), k.getGlobal(), P.delay(P.bind(i.kickstart, i), 200)
            },
            mq: function(e) {
                return "retina" === e ? window.devicePixelRatio > 1 || window.matchMedia(O[e]).matches : window.matchMedia(O[e]).matches
            },
            getBreakpoint: function() {
                return this.mq("phone") ? "phone" : this.mq("phablet") ? "phablet" : this.mq("tablet") ? "tablet" : "desktop"
            },
            _initAllAccessPanel: function() {
                var e, t = this;
                if ("undefined" == typeof Bootstrapper) E("section.tcom-picture-frame").hide();
                else if (e = E.inArray(E.cookie("zipcode"), Bootstrapper.zips), 0 > e) E("section.tcom-picture-frame").hide();
                else {
                    t.scrollEvents.register([{
                        $el: E(".tcom-picture-frame").first(),
                        offsetTop: 0,
                        offsetBottom: -60,
                        centeredViewport: !0,
                        onResize: function() {}
                    }]), t.scrollEvents.initialize();
                    var i = new g({
                        $el: E(".tcom-picture-frame").first(),
                        tagOnload: "223.31",
                        tagCTA: "223.44",
                        tilePosition: 2,
                        analyticsApp: "mlp"
                    }, t.Analytics);
                    i.initialize()
                }
            },
            kickstart: function() {
                var e = this,
                    t = {
                        main: this
                    },
                    l = e.scrollEvents = new p;
                i.initialize(t), e._initAllAccessPanel(), e.initCustomPanels(), n.initialize(t), a.initialize(t), o.initialize(t), s.initialize(t), r.initialize({
                    main: e,
                    $el: E(".mlp-compare"),
                    seriesName: e.seriesName,
                    seriesCode: e.seriesCode,
                    seriesYear: e.seriesYear
                }), this.$app.find(".tcom-video").each(function() {
                    var t = E(this);
                    e.video = new c({
                        $el: t,
                        tagParams: {
                            current_pagename: "T:Home"
                        }
                    }).initialize(), l.register({
                        $el: t,
                        offsetTop: 0,
                        offsetBottom: 0,
                        delay: 1e3
                    }), t.on("scroll:enter", function() {
                        E(this).data("analyticsFired") || (E(this).data("analyticsFired", "true"), D.fire("mlp", "223.31", {
                            mdl_tile_position: 2,
                            campaign_title: "rav4_hybrid_|_video",
                            breakpoint: k.CurrentQuery
                        }))
                    })
                }), e.initLazyLoad(), e.initBackToTop(), e.initDeepLinks(), e.initAnalytics(), Modernizr.borderradius || e.$app.find(".circle").addClass("tcom-icon-fallback-circle"), k.Util.legacyPicturefill(), e.initSalesEvent(), k.Events.trigger("mlp:ready")
            },
            initLazyLoad: function() {
                window.tcom.ui.lazyImages.add({
                    type: "scroll",
                    point: 10,
                    $el: E(".app")
                })
            },
            initSalesEvent: function() {
                l.init(this.seriesCode)
            },
            initBackToTop: function() {
                new u({
                    analyticsApp: "mlp",
                    analyticsOnClick: "223.18",
                    analyticsParams: {
                        linkname: "Top",
                        device_type: k.Util.getCurrentQuery()
                    }
                })
            },
            initAnalytics: function() {
                var e = this,
                    t = {
                        ".mlp-custom": "223.31",
                        ".mlp-gallery": "223.6",
                        ".mlp-reviews": M.awardsError ? "223.1" : "223.2",
                        ".mlp-compare": "223.4",
                        ".mlp-models": "223.8"
                    },
                    i = D.site + ":" + D.clean(e.seriesName || e.seriesCode || "Series") + ":Overview:",
                    n = {
                        223.1: i + "Awards",
                        223.2: i + "Awards",
                        223.31: i + "Campaign",
                        223.4: i + "Compare",
                        223.5: i + "Feature",
                        223.6: i + "Gallery",
                        223.7: i + "Intro",
                        223.8: i + "Models"
                    };
                e.$app.find('section[class*="mlp"],.mlp-features-section').not(".mlp-features").each(function(e) {
                    this.setAttribute("data-panel-index", e + 1)
                }), D.getTags("mlp"), D.setVar("mlp", "vehicle", e.seriesName || e.seriesCode || "Series"), D.setVar("mlp", "model_year", e.seriesYear), D.setVar("mlp", "model_name", e.seriesName || e.seriesCode || "Series"), e.loadEventsFired = {}, e.loadEventTimer = null, D.fire("mlp", "223.7", {
                    test_name: window.welcomeMattFound ? window.welcomeMattFound.title : "",
                    default_color: E(".mlp-colorizer-name").text(),
                    mdl_tile_position: 1,
                    device_type: e.getBreakpoint(),
                    display_year: e.seriesYear,
                    series_code: e.seriesName
                }), e.$app.find(".mlp-video .mlp-gallery-cta .btn").on("click", function(t) {
                    D.setPageName("T:" + e.seriesName + ":Overview:Campaign:" + e.seriesName + "_|_Videos"), D.fire("mlp", "223.32", {
                        button_name: E(t.currentTarget).hasClass("btn") ? E(t.currentTarget).text() : "click_to_play",
                        campaign_title: E(".tcom-video-headline").text(),
                        video_name: "enchufe_|_nueva_rav4_hybrid_|_toyota"
                    })
                }), D.setPageName(n[window.welcomeMattFound ? "223.3" : "223.7"]);
                var a = function() {
                    if (e.currentTarget) {
                        var i = e.currentTarget;
                        if (i.altTarget && !e.loadEventsFired[i.altTarget]) {
                            e.loadEventsFired[i.altTarget] = !0;
                            var a = D.clean(i.altTarget.replace("-", " "));
                            D.setPageName(n[223.5] + ":" + a), D.fire("mlp", "223.5", {
                                tile_title: a,
                                mdl_tile_position: i.$target.attr("data-panel-index")
                            })
                        } else i.target && t[i.target] && !e.loadEventsFired[i.target] && (e.loadEventsFired[i.target] = !0, D.setPageName(n[t[i.target]]), D.fire("mlp", t[i.target], {
                            ratings_unavailable_msg: M.awardsError || "",
                            mdl_tile_position: i.$target.attr("data-panel-index"),
                            traffic_source: "",
                            campaign_title: i.$target.hasClass("mlp-custom-prius-video") ? "super bowl 2016" : i.$target.hasClass("mlp-custom-rav4-video") ? i.$target.find(".mlp-rav4-title").text() : ".mlp-custom" === i.target ? i.$target.data("panel") || i.$target.find(".mlp-custom-video-player:visible").eq(0).data("yttitle") : ""
                        }))
                    }
                };
                k.Events.on("Scroller:start", function() {
                    e.loadEventTimer && window.clearTimeout(e.loadEventTimer)
                }), k.Events.on("Scroller:end", function() {
                    e.loadEventTimer && window.clearTimeout(e.loadEventTimer), e.loadEventTimer = window.setTimeout(a, 500)
                }), k.Events.on("Scroller:target Scroller:featureTarget", function(t, i) {
                    i && i.target && (e.currentTarget = i)
                }), k.Events.one("globalmodal:load", function(t, i) {
                    e.initModalAnalytics(i.loadId, i), E(".tcom-global-modal").find('[data-role="close-modal"]').on("click", function(t) {
                        var n = E(t.target).closest("button");
                        e.initModalAnalytics(i.closeId, P.extend({
                            button_name: n.text()
                        }, i))
                    }), E(".tcom-modal-overlay").one("click", function() {
                        e.initModalAnalytics(i.closeId, P.extend({
                            button_name: "Click_Out_of_Overlay"
                        }, i))
                    }), E(".mlp-awards-view-all").on("click", function() {
                        D.fire("mlp", "223.24", {
                            linkname: "View_All_Reviews_&_Awards"
                        })
                    })
                })
            },
            initModalAnalytics: function(e, t) {
                var i = this;
                D.fire("mlp", e, P.extend({
                    vehicle: i.seriesName || i.seriesCode || "Series",
                    model_year: i.seriesYear,
                    breakpoint: k.CurrentQuery
                }, t))
            },
            initCustomPanels: function() {
                var e = this,
                    t = [m, f, h, v, w, b, y, $];
                e.$custom = E(".mlp-custom").each(function() {
                    var i = E(this).data("panel"),
                        n = P.find(t, function(e) {
                            return e.panelName === i
                        });
                    n && n.initialize({
                        seriesName: e.seriesName
                    })
                })
            },
            initDisclaimers: function() {
                var e = this;
                e.disclaimers = new x({
                    el: "#tcom-disclaimers"
                })
            },
            initTdaFlyout: function() {
                self.tdaFlyout = new A({
                    el: "body"
                })
            },
            updateHistory: function(e) {
                e = e ? e : "";
                var t = P.isArray(e) ? e.join("/") : e;
                history.pushState ? history.pushState(null, null, "#!/" + t.toLowerCase()) : location.hash = "#!/" + t
            },
            isMobileLayout: function() {
                return "phone" === k.CurrentQuery || "phablet" === k.CurrentQuery ? !0 : !1
            }
        };
    M.initialize()
}), require(["js/mlp"]);
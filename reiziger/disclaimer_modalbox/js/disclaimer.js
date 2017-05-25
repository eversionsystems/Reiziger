var requirejs, require, define;
! function(global) {
    function isFunction(a) {
        return "[object Function]" === ostring.call(a)
    }

    function isArray(a) {
        return "[object Array]" === ostring.call(a)
    }

    function each(a, b) {
        if (a) {
            var c;
            for (c = 0; c < a.length && (!a[c] || !b(a[c], c, a)); c += 1);
        }
    }

    function eachReverse(a, b) {
        if (a) {
            var c;
            for (c = a.length - 1; c > -1 && (!a[c] || !b(a[c], c, a)); c -= 1);
        }
    }

    function hasProp(a, b) {
        return hasOwn.call(a, b)
    }

    function getOwn(a, b) {
        return hasProp(a, b) && a[b]
    }

    function eachProp(a, b) {
        var c;
        for (c in a)
            if (hasProp(a, c) && b(a[c], c)) break
    }

    function mixin(a, b, c, d) {
        return b && eachProp(b, function(b, e) {
            !c && hasProp(a, e) || (!d || "object" != typeof b || !b || isArray(b) || isFunction(b) || b instanceof RegExp ? a[e] = b : (a[e] || (a[e] = {}), mixin(a[e], b, c, d)))
        }), a
    }

    function bind(a, b) {
        return function() {
            return b.apply(a, arguments)
        }
    }

    function scripts() {
        return document.getElementsByTagName("script")
    }

    function defaultOnError(a){ /*throw a*/  }

    function newContext(a) {
        function b(a) {
            var b, c;
            for (b = 0; b < a.length; b++)
                if (c = a[b], "." === c) a.splice(b, 1), b -= 1;
                else if (".." === c) {
                if (0 === b || 1 === b && ".." === a[2] || ".." === a[b - 1]) continue;
                b > 0 && (a.splice(b - 1, 2), b -= 2)
            }
        }

        function c(a, c, d) {
            var e, f, g, h, i, j, k, l, m, n, o, p, q = c && c.split("/"),
                r = x.map,
                s = r && r["*"];
            if (a && (a = a.split("/"), k = a.length - 1, x.nodeIdCompat && jsSuffixRegExp.test(a[k]) && (a[k] = a[k].replace(jsSuffixRegExp, "")), "." === a[0].charAt(0) && q && (p = q.slice(0, q.length - 1), a = p.concat(a)), b(a), a = a.join("/")), d && r && (q || s)) {
                g = a.split("/");
                a: for (h = g.length; h > 0; h -= 1) {
                    if (j = g.slice(0, h).join("/"), q)
                        for (i = q.length; i > 0; i -= 1)
                            if (f = getOwn(r, q.slice(0, i).join("/")), f && (f = getOwn(f, j))) {
                                l = f, m = h;
                                break a
                            }!n && s && getOwn(s, j) && (n = getOwn(s, j), o = h)
                }!l && n && (l = n, m = o), l && (g.splice(0, m, l), a = g.join("/"))
            }
            return e = getOwn(x.pkgs, a), e ? e : a
        }

        function d(a) {
            isBrowser && each(scripts(), function(b) {
                if (b.getAttribute("data-requiremodule") === a && b.getAttribute("data-requirecontext") === u.contextName) return b.parentNode.removeChild(b), !0
            })
        }

        function e(a) {
            var b = getOwn(x.paths, a);
            if (b && isArray(b) && b.length > 1) return b.shift(), u.require.undef(a), u.makeRequire(null, {
                skipMap: !0
            })([a]), !0
        }

        function f(a) {
            var b, c = a ? a.indexOf("!") : -1;
            return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
        }

        function g(a, b, d, e) {
            var g, h, i, j, k = null,
                l = b ? b.name : null,
                m = a,
                n = !0,
                o = "";
            return a || (n = !1, a = "_@r" + (F += 1)), j = f(a), k = j[0], a = j[1], k && (k = c(k, l, e), h = getOwn(C, k)), a && (k ? o = h && h.normalize ? h.normalize(a, function(a) {
                return c(a, l, e)
            }) : a.indexOf("!") === -1 ? c(a, l, e) : a : (o = c(a, l, e), j = f(o), k = j[0], o = j[1], d = !0, g = u.nameToUrl(o))), i = !k || h || d ? "" : "_unnormalized" + (G += 1), {
                prefix: k,
                name: o,
                parentMap: b,
                unnormalized: !!i,
                url: g,
                originalName: m,
                isDefine: n,
                id: (k ? k + "!" + o : o) + i
            }
        }

        function h(a) {
            var b = a.id,
                c = getOwn(y, b);
            return c || (c = y[b] = new u.Module(a)), c
        }

        function i(a, b, c) {
            var d = a.id,
                e = getOwn(y, d);
            !hasProp(C, d) || e && !e.defineEmitComplete ? (e = h(a), e.error && "error" === b ? c(e.error) : e.on(b, c)) : "defined" === b && c(C[d])
        }

        function j(a, b) {
            var c = a.requireModules,
                d = !1;
            b ? b(a) : (each(c, function(b) {
                var c = getOwn(y, b);
                c && (c.error = a, c.events.error && (d = !0, c.emit("error", a)))
            }), d || req.onError(a))
        }

        function k() {
            globalDefQueue.length && (apsp.apply(B, [B.length, 0].concat(globalDefQueue)), globalDefQueue = [])
        }

        function l(a) {
            delete y[a], delete z[a]
        }

        function m(a, b, c) {
            var d = a.map.id;
            a.error ? a.emit("error", a.error) : (b[d] = !0, each(a.depMaps, function(d, e) {
                var f = d.id,
                    g = getOwn(y, f);
                !g || a.depMatched[e] || c[f] || (getOwn(b, f) ? (a.defineDep(e, C[f]), a.check()) : m(g, b, c))
            }), c[d] = !0)
        }

        function o(a) {
            hasProp(C, a[0]) || h(g(a[0], null, !0)).init(a[1], a[2])
        }

        function p(a, b, c, d) {
            a.detachEvent && !isOpera ? d && a.detachEvent(d, b) : a.removeEventListener(c, b, !1)
        }

        function q(a) {
            var b = a.currentTarget || a.srcElement;
            return p(b, u.onScriptLoad, "load", "onreadystatechange"), p(b, u.onScriptError, "error"), {
                node: b,
                id: b && b.getAttribute("data-requiremodule")
            }
        }

        function r() {
            var a;
            for (k(); B.length;) {
                if (a = B.shift(), null === a[0]) return j(makeError("mismatch", "Mismatched anonymous define() module: " + a[a.length - 1]));
                o(a)
            }
        }
        var s, t, u, v, w, x = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                bundles: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            y = {},
            z = {},
            A = {},
            B = [],
            C = {},
            D = {},
            E = {},
            F = 1,
            G = 1;
        return v = {
            require: function(a) {
                return a.require ? a.require : a.require = u.makeRequire(a.map)
            },
            exports: function(a) {
                if (a.usingExports = !0, a.map.isDefine) return a.exports ? C[a.map.id] = a.exports : a.exports = C[a.map.id] = {}
            },
            module: function(a) {
                return a.module ? a.module : a.module = {
                    id: a.map.id,
                    uri: a.map.url,
                    config: function() {
                        return getOwn(x.config, a.map.id) || {}
                    },
                    exports: a.exports || (a.exports = {})
                }
            }
        }, t = function(a) {
            this.events = getOwn(A, a.id) || {}, this.map = a, this.shim = getOwn(x.shim, a.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
        }, t.prototype = {
            init: function(a, b, c, d) {
                d = d || {}, this.inited || (this.factory = b, c ? this.on("error", c) : this.events.error && (c = bind(this, function(a) {
                    this.emit("error", a)
                })), this.depMaps = a && a.slice(0), this.errback = c, this.inited = !0, this.ignore = d.ignore, d.enabled || this.enabled ? this.enable() : this.check())
            },
            defineDep: function(a, b) {
                this.depMatched[a] || (this.depMatched[a] = !0, this.depCount -= 1, this.depExports[a] = b)
            },
            fetch: function() {
                if (!this.fetched) {
                    this.fetched = !0, u.startTime = (new Date).getTime();
                    var a = this.map;
                    return this.shim ? void u.makeRequire(this.map, {
                        enableBuildCallback: !0
                    })(this.shim.deps || [], bind(this, function() {
                        return a.prefix ? this.callPlugin() : this.load()
                    })) : a.prefix ? this.callPlugin() : this.load()
                }
            },
            load: function() {
                var a = this.map.url;
                D[a] || (D[a] = !0, u.load(this.map.id, a))
            },
            check: function() {
                if (this.enabled && !this.enabling) {
                    var a, b, c = this.map.id,
                        d = this.depExports,
                        e = this.exports,
                        f = this.factory;
                    if (this.inited) {
                        if (this.error) this.emit("error", this.error);
                        else if (!this.defining) {
                            if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                if (isFunction(f)) {
                                    if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                        e = u.execCb(c, f, d, e)
                                    } catch (b) {
                                        a = b
                                    } else e = u.execCb(c, f, d, e);
                                    if (this.map.isDefine && void 0 === e && (b = this.module, b ? e = b.exports : this.usingExports && (e = this.exports)), a) return a.requireMap = this.map, a.requireModules = this.map.isDefine ? [this.map.id] : null, a.requireType = this.map.isDefine ? "define" : "require", j(this.error = a)
                                } else e = f;
                                this.exports = e, this.map.isDefine && !this.ignore && (C[c] = e, req.onResourceLoad && req.onResourceLoad(u, this.map, this.depMaps)), l(c), this.defined = !0
                            }
                            this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                        }
                    } else this.fetch()
                }
            },
            callPlugin: function() {
                var a = this.map,
                    b = a.id,
                    d = g(a.prefix);
                this.depMaps.push(d), i(d, "defined", bind(this, function(d) {
                    var e, f, k, m = getOwn(E, this.map.id),
                        n = this.map.name,
                        o = this.map.parentMap ? this.map.parentMap.name : null,
                        p = u.makeRequire(a.parentMap, {
                            enableBuildCallback: !0
                        });
                    return this.map.unnormalized ? (d.normalize && (n = d.normalize(n, function(a) {
                        return c(a, o, !0)
                    }) || ""), f = g(a.prefix + "!" + n, this.map.parentMap), i(f, "defined", bind(this, function(a) {
                        this.init([], function() {
                            return a
                        }, null, {
                            enabled: !0,
                            ignore: !0
                        })
                    })), k = getOwn(y, f.id), void(k && (this.depMaps.push(f), this.events.error && k.on("error", bind(this, function(a) {
                        this.emit("error", a)
                    })), k.enable()))) : m ? (this.map.url = u.nameToUrl(m), void this.load()) : (e = bind(this, function(a) {
                        this.init([], function() {
                            return a
                        }, null, {
                            enabled: !0
                        })
                    }), e.error = bind(this, function(a) {
                        this.inited = !0, this.error = a, a.requireModules = [b], eachProp(y, function(a) {
                            0 === a.map.id.indexOf(b + "_unnormalized") && l(a.map.id)
                        }), j(a)
                    }), e.fromText = bind(this, function(c, d) {
                        var f = a.name,
                            i = g(f),
                            k = useInteractive;
                        d && (c = d), k && (useInteractive = !1), h(i), hasProp(x.config, b) && (x.config[f] = x.config[b]);
                        try {
                            req.exec(c)
                        } catch (a) {
                            return j(makeError("fromtexteval", "fromText eval for " + b + " failed: " + a, a, [b]))
                        }
                        k && (useInteractive = !0), this.depMaps.push(i), u.completeLoad(f), p([f], e)
                    }), void d.load(a.name, p, e, x))
                })), u.enable(d, this), this.pluginMaps[d.id] = d
            },
            enable: function() {
                z[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(a, b) {
                    var c, d, e;
                    if ("string" == typeof a) {
                        if (a = g(a, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[b] = a, e = getOwn(v, a.id)) return void(this.depExports[b] = e(this));
                        this.depCount += 1, i(a, "defined", bind(this, function(a) {
                            this.defineDep(b, a), this.check()
                        })), this.errback ? i(a, "error", bind(this, this.errback)) : this.events.error && i(a, "error", bind(this, function(a) {
                            this.emit("error", a)
                        }))
                    }
                    c = a.id, d = y[c], hasProp(v, c) || !d || d.enabled || u.enable(a, this)
                })), eachProp(this.pluginMaps, bind(this, function(a) {
                    var b = getOwn(y, a.id);
                    b && !b.enabled && u.enable(a, this)
                })), this.enabling = !1, this.check()
            },
            on: function(a, b) {
                var c = this.events[a];
                c || (c = this.events[a] = []), c.push(b)
            },
            emit: function(a, b) {
                each(this.events[a], function(a) {
                    a(b)
                }), "error" === a && delete this.events[a]
            }
        }, u = {
            config: x,
            contextName: a,
            registry: y,
            defined: C,
            urlFetched: D,
            defQueue: B,
            Module: t,
            makeModuleMap: g,
            nextTick: req.nextTick,
            onError: j,
            configure: function(a) {
                a.baseUrl && "/" !== a.baseUrl.charAt(a.baseUrl.length - 1) && (a.baseUrl += "/");
                var b = x.shim,
                    c = {
                        paths: !0,
                        bundles: !0,
                        config: !0,
                        map: !0
                    };
                eachProp(a, function(a, b) {
                    c[b] ? (x[b] || (x[b] = {}), mixin(x[b], a, !0, !0)) : x[b] = a
                }), a.bundles && eachProp(a.bundles, function(a, b) {
                    each(a, function(a) {
                        a !== b && (E[a] = b)
                    })
                }), a.shim && (eachProp(a.shim, function(a, c) {
                    isArray(a) && (a = {
                        deps: a
                    }), !a.exports && !a.init || a.exportsFn || (a.exportsFn = u.makeShimExports(a)), b[c] = a
                }), x.shim = b), a.packages && each(a.packages, function(a) {
                    var b, c;
                    a = "string" == typeof a ? {
                        name: a
                    } : a, c = a.name, b = a.location, b && (x.paths[c] = a.location), x.pkgs[c] = a.name + "/" + (a.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                }), eachProp(y, function(a, b) {
                    a.inited || a.map.unnormalized || (a.map = g(b))
                }), (a.deps || a.callback) && u.require(a.deps || [], a.callback)
            },
            makeShimExports: function(a) {
                function b() {
                    var b;
                    return a.init && (b = a.init.apply(global, arguments)), b || a.exports && getGlobal(a.exports)
                }
                return b
            },
            makeRequire: function(b, e) {
                function f(c, d, i) {
                    var k, l, m;
                    return e.enableBuildCallback && d && isFunction(d) && (d.__requireJsBuild = !0), "string" == typeof c ? isFunction(d) ? j(makeError("requireargs", "Invalid require call"), i) : b && hasProp(v, c) ? v[c](y[b.id]) : req.get ? req.get(u, c, b, f) : (l = g(c, b, !1, !0), k = l.id, hasProp(C, k) ? C[k] : j(makeError("notloaded", 'Module name "' + k + '" has not been loaded yet for context: ' + a + (b ? "" : ". Use require([])")))) : (r(), u.nextTick(function() {
                        r(), m = h(g(null, b)), m.skipMap = e.skipMap, m.init(c, d, i, {
                            enabled: !0
                        })
                    }), f)
                }
                return e = e || {}, mixin(f, {
                    isBrowser: isBrowser,
                    toUrl: function(a) {
                        var d, e = a.lastIndexOf("."),
                            f = a.split("/")[0],
                            g = "." === f || ".." === f;
                        return e !== -1 && (!g || e > 1) && (d = a.substring(e, a.length), a = a.substring(0, e)), u.nameToUrl(c(a, b && b.id, !0), d, !0)
                    },
                    defined: function(a) {
                        return hasProp(C, g(a, b, !1, !0).id)
                    },
                    specified: function(a) {
                        return a = g(a, b, !1, !0).id, hasProp(C, a) || hasProp(y, a)
                    }
                }), b || (f.undef = function(a) {
                    k();
                    var c = g(a, b, !0),
                        e = getOwn(y, a);
                    d(a), delete C[a], delete D[c.url], delete A[a], eachReverse(B, function(b, c) {
                        b[0] === a && B.splice(c, 1)
                    }), e && (e.events.defined && (A[a] = e.events), l(a))
                }), f
            },
            enable: function(a) {
                var b = getOwn(y, a.id);
                b && h(a).enable()
            },
            completeLoad: function(a) {
                var b, c, d, f = getOwn(x.shim, a) || {},
                    g = f.exports;
                for (k(); B.length;) {
                    if (c = B.shift(), null === c[0]) {
                        if (c[0] = a, b) break;
                        b = !0
                    } else c[0] === a && (b = !0);
                    o(c)
                }
                if (d = getOwn(y, a), !b && !hasProp(C, a) && d && !d.inited) {
                    if (!(!x.enforceDefine || g && getGlobal(g))) return e(a) ? void 0 : j(makeError("nodefine", "No define call for " + a, null, [a]));
                    o([a, f.deps || [], f.exportsFn])
                }
                n()
            },
            nameToUrl: function(a, b, c) {
                var d, e, f, g, h, i, j, k = getOwn(x.pkgs, a);
                if (k && (a = k), j = getOwn(E, a)) return u.nameToUrl(j, b, c);
                if (req.jsExtRegExp.test(a)) h = a + (b || "");
                else {
                    for (d = x.paths, e = a.split("/"), f = e.length; f > 0; f -= 1)
                        if (g = e.slice(0, f).join("/"), i = getOwn(d, g)) {
                            isArray(i) && (i = i[0]), e.splice(0, f, i);
                            break
                        }
                    h = e.join("/"), h += b || (/^data\:|\?/.test(h) || c ? "" : ".js"), h = ("/" === h.charAt(0) || h.match(/^[\w\+\.\-]+:/) ? "" : x.baseUrl) + h
                }
                return x.urlArgs ? h + ((h.indexOf("?") === -1 ? "?" : "&") + x.urlArgs) : h
            },
            load: function(a, b) {
                req.load(u, a, b)
            },
            execCb: function(a, b, c, d) {
                return b.apply(d, c)
            },
            onScriptLoad: function(a) {
                if ("load" === a.type || readyRegExp.test((a.currentTarget || a.srcElement).readyState)) {
                    interactiveScript = null;
                    var b = q(a);
                    u.completeLoad(b.id)
                }
            },
            onScriptError: function(a) {
                var b = q(a);
                if (!e(b.id)) return j(makeError("scripterror", "Script error for: " + b.id, a, [b.id]))
            }
        }, u.require = u.makeRequire(), u
    }

    function getInteractiveScript() {
        return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(a) {
            if ("interactive" === a.readyState) return interactiveScript = a
        }), interactiveScript)
    }
    var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.17",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
        isWebWorker = !isBrowser && "undefined" != typeof importScripts,
        readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = !1;
    if ("undefined" == typeof define) {
        if ("undefined" != typeof requirejs) {
            if (isFunction(requirejs)) return;
            cfg = requirejs, requirejs = void 0
        }
        "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(a, b, c, d) {
            var e, f, g = defContextName;
            return isArray(a) || "string" == typeof a || (f = a, isArray(b) ? (a = b, b = c, c = d) : a = []), f && f.context && (g = f.context), e = getOwn(contexts, g), e || (e = contexts[g] = req.s.newContext(g)), f && e.configure(f), e.require(a, b, c)
        }, req.config = function(a) {
            return req(a)
        }, req.nextTick = "undefined" != typeof setTimeout ? function(a) {
            setTimeout(a, 4)
        } : function(a) {
            a()
        }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
            contexts: contexts,
            newContext: newContext
        }, req({}), each(["toUrl", "undef", "defined", "specified"], function(a) {
            req[a] = function() {
                var b = contexts[defContextName];
                return b.require[a].apply(b, arguments)
            }
        }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(a, b, c) {
            var d = a.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
            return d.type = a.scriptType || "text/javascript", d.charset = "utf-8", d.async = !0, d
        }, req.load = function(a, b, c) {
            var d, e = a && a.config || {};
            if (isBrowser) return d = req.createNode(e, b, c), d.setAttribute("data-requirecontext", a.contextName), d.setAttribute("data-requiremodule", b), !d.attachEvent || d.attachEvent.toString && d.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (d.addEventListener("load", a.onScriptLoad, !1), d.addEventListener("error", a.onScriptError, !1)) : (useInteractive = !0, d.attachEvent("onreadystatechange", a.onScriptLoad)), d.src = c, currentlyAddingScript = d, baseElement ? head.insertBefore(d, baseElement) : head.appendChild(d), currentlyAddingScript = null, d;
            if (isWebWorker) try {
                importScripts(c), a.completeLoad(b)
            } catch (d) {
                a.onError(makeError("importscripts", "importScripts failed for " + b + " at " + c, d, [b]))
            }
        }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(a) {
            if (head || (head = a.parentNode), dataMain = a.getAttribute("data-main")) return mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0
        }), define = function(a, b, c) {
            var d, e;
            "string" != typeof a && (c = b, b = a, a = null), isArray(b) || (c = b, b = null), !b && isFunction(c) && (b = [], c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
                b.push(c)
            }), b = (1 === c.length ? ["require"] : ["require", "exports", "module"]).concat(b))), useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")])), (e ? e.defQueue : globalDefQueue).push([a, b, c])
        }, define.amd = {
            jQuery: !0
        }, req.exec = function(text) {
            return eval(text)
        }, req(cfg)
    }
}(this);

! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = a.length,
            c = _.type(a);
        return "function" !== c && !_.isWindow(a) && (!(1 !== a.nodeType || !b) || ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a))
    }

    function d(a, b, c) {
        if (_.isFunction(b)) return _.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return _.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (ha.test(b)) return _.filter(b, a, c);
            b = _.filter(b, a)
        }
        return _.grep(a, function(a) {
            return U.call(b, a) >= 0 !== c
        })
    }

    function e(a, b) {
        for (;
            (a = a[b]) && 1 !== a.nodeType;);
        return a
    }

    function f(a) {
        var b = oa[a] = {};
        return _.each(a.match(na) || [], function(a, c) {
            b[c] = !0
        }), b
    }

    function g() {
        Z.removeEventListener("DOMContentLoaded", g, !1), a.removeEventListener("load", g, !1), _.ready()
    }

    function h() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = _.expando + h.uid++
    }

    function i(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(ua, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c || "false" !== c && ("null" === c ? null : +c + "" === c ? +c : ta.test(c) ? _.parseJSON(c) : c)
                } catch (a) {}
                sa.set(a, b, c)
            } else c = void 0;
        return c
    }

    function j() {
        return !0
    }

    function k() {
        return !1
    }

    function l() {
        try {
            return Z.activeElement
        } catch (a) {}
    }

    function m(a, b) {
        return _.nodeName(a, "table") && _.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function n(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function o(a) {
        var b = Ka.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function p(a, b) {
        for (var c = 0, d = a.length; c < d; c++) ra.set(a[c], "globalEval", !b || ra.get(b[c], "globalEval"))
    }

    function q(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (ra.hasData(a) && (f = ra.access(a), g = ra.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; c < d; c++) _.event.add(b, e, j[e][c])
            }
            sa.hasData(a) && (h = sa.access(a), i = _.extend({}, h), sa.set(b, i))
        }
    }

    function r(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && _.nodeName(a, b) ? _.merge([a], c) : c
    }

    function s(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && ya.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
    }

    function t(b, c) {
        var d, e = _(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : _.css(e[0], "display");
        return e.detach(), f
    }

    function v(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || Ra(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || _.contains(a.ownerDocument, a) || (g = _.style(a, b)), Qa.test(g) && Pa.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function w(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function x(a, b) {
        if (b in a) return b;
        for (var c = b[0].toUpperCase() + b.slice(1), d = b, e = Xa.length; e--;)
            if (b = Xa[e] + c, b in a) return b;
        return d
    }

    function y(a, b, c) {
        var d = Ta.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function z(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; f < 4; f += 2) "margin" === c && (g += _.css(a, c + wa[f], !0, e)), d ? ("content" === c && (g -= _.css(a, "padding" + wa[f], !0, e)), "margin" !== c && (g -= _.css(a, "border" + wa[f] + "Width", !0, e))) : (g += _.css(a, "padding" + wa[f], !0, e), "padding" !== c && (g += _.css(a, "border" + wa[f] + "Width", !0, e)));
        return g
    }

    function A(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ra(a),
            g = "border-box" === _.css(a, "boxSizing", !1, f);
        if (e <= 0 || null == e) {
            if (e = v(a, b, f), (e < 0 || null == e) && (e = a.style[b]), Qa.test(e)) return e;
            d = g && (Y.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + z(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function B(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; g < h; g++) d = a[g], d.style && (f[g] = ra.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && xa(d) && (f[g] = ra.access(d, "olddisplay", u(d.nodeName)))) : (e = xa(d), "none" === c && e || ra.set(d, "olddisplay", e ? c : _.css(d, "display"))));
        for (g = 0; g < h; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function C(a, b, c, d, e) {
        return new C.prototype.init(a, b, c, d, e)
    }

    function D() {
        return setTimeout(function() {
            Ya = void 0
        }), Ya = _.now()
    }

    function E(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; d < 4; d += 2 - b) c = wa[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function F(a, b, c) {
        for (var d, e = (cb[b] || []).concat(cb["*"]), f = 0, g = e.length; f < g; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function G(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
            m = {},
            n = a.style,
            o = a.nodeType && xa(a),
            p = ra.get(a, "fxshow");
        c.queue || (h = _._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, _.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = _.css(a, "display"), k = "none" === j ? ra.get(a, "olddisplay") || u(a.nodeName) : j, "inline" === k && "none" === _.css(a, "float") && (n.display = "inline-block")), c.overflow && (n.overflow = "hidden", l.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], $a.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                    if ("show" !== e || !p || void 0 === p[d]) continue;
                    o = !0
                }
                m[d] = p && p[d] || _.style(a, d)
            } else j = void 0;
        if (_.isEmptyObject(m)) "inline" === ("none" === j ? u(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden" in p && (o = p.hidden) : p = ra.access(a, "fxshow", {}), f && (p.hidden = !o), o ? _(a).show() : l.done(function() {
                _(a).hide()
            }), l.done(function() {
                var b;
                ra.remove(a, "fxshow");
                for (b in m) _.style(a, b, m[b])
            });
            for (d in m) g = F(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function H(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = _.camelCase(c), e = b[d], f = a[c], _.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = _.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function I(a, b, c) {
        var d, e, f = 0,
            g = bb.length,
            h = _.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = Ya || D(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: _.extend({}, b),
                opts: _.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: Ya || D(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = _.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; c < d; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (H(k, j.opts.specialEasing); f < g; f++)
            if (d = bb[f].call(j, a, k, j.opts)) return d;
        return _.map(k, F, j), _.isFunction(j.opts.start) && j.opts.start.call(a, j), _.fx.timer(_.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function J(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(na) || [];
            if (_.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function K(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, _.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {},
            g = a === tb;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function L(a, b) {
        var c, d, e = _.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && _.extend(!0, a, d), a
    }

    function M(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes;
            "*" === i[0];) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        if (f) return f !== i[0] && i.unshift(f), c[f]
    }

    function N(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a.throws) b = g(b);
                else try {
                    b = g(b)
                } catch (a) {
                    return {
                        state: "parsererror",
                        error: g ? a : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function O(a, b, c, d) {
        var e;
        if (_.isArray(b)) _.each(b, function(b, e) {
            c || yb.test(a) ? d(a, e) : O(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== _.type(b)) d(a, b);
        else
            for (e in b) O(a + "[" + e + "]", b[e], c, d)
    }

    function P(a) {
        return _.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    var Q = [],
        R = Q.slice,
        S = Q.concat,
        T = Q.push,
        U = Q.indexOf,
        V = {},
        W = V.toString,
        X = V.hasOwnProperty,
        Y = {},
        Z = a.document,
        $ = "2.1.3",
        _ = function(a, b) {
            return new _.fn.init(a, b)
        },
        aa = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ba = /^-ms-/,
        ca = /-([\da-z])/gi,
        da = function(a, b) {
            return b.toUpperCase()
        };
    _.fn = _.prototype = {
        jquery: $,
        constructor: _,
        selector: "",
        length: 0,
        toArray: function() {
            return R.call(this)
        },
        get: function(a) {
            return null != a ? a < 0 ? this[a + this.length] : this[a] : R.call(this)
        },
        pushStack: function(a) {
            var b = _.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return _.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(_.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(R.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (a < 0 ? b : 0);
            return this.pushStack(c >= 0 && c < b ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: T,
        sort: Q.sort,
        splice: Q.splice
    }, _.extend = _.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || _.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (_.isPlainObject(d) || (e = _.isArray(d))) ? (e ? (e = !1, f = c && _.isArray(c) ? c : []) : f = c && _.isPlainObject(c) ? c : {}, g[b] = _.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, _.extend({
        expando: "jQuery" + ($ + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === _.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return !_.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" === _.type(a) && !a.nodeType && !_.isWindow(a) && !(a.constructor && !X.call(a.constructor.prototype, "isPrototypeOf"))
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? V[W.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = _.trim(a), a && (1 === a.indexOf("use strict") ? (b = Z.createElement("script"), b.text = a, Z.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(ba, "ms-").replace(ca, da)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a);
            if (d) {
                if (h)
                    for (; f < g && (e = b.apply(a[f], d), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.apply(a[f], d), e === !1) break
            } else if (h)
                for (; f < g && (e = b.call(a[f], f, a[f]), e !== !1); f++);
            else
                for (f in a)
                    if (e = b.call(a[f], f, a[f]), e === !1) break; return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(aa, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? _.merge(d, "string" == typeof a ? [a] : a) : T.call(d, a)), d
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : U.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; d < c; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a),
                i = [];
            if (h)
                for (; f < g; f++) e = b(a[f], f, d), null != e && i.push(e);
            else
                for (f in a) e = b(a[f], f, d), null != e && i.push(e);
            return S.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            if ("string" == typeof b && (c = a[b], b = a, a = c), _.isFunction(a)) return d = R.call(arguments, 2), e = function() {
                return a.apply(b || this, d.concat(R.call(arguments)))
            }, e.guid = a.guid = a.guid || _.guid++, e
        },
        now: Date.now,
        support: Y
    }), _.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        V["[object " + b + "]"] = b.toLowerCase()
    });
    var ea = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, c = c || [], h = b.nodeType, "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h) return c;
            if (!d && I) {
                if (11 !== h && (e = sa.exec(a)))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g), !f || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g) return c.push(f), c
                    } else {
                        if (e[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && v.getElementsByClassName) return $.apply(c, b.getElementsByClassName(g)), c
                    }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N, o = b, p = 1 !== h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a), (l = b.getAttribute("id")) ? n = l.replace(ua, "\\$&") : b.setAttribute("id", n), n = "[id='" + n + "'] ", i = j.length; i--;) j[i] = n + m(j[i]);
                        o = ta.test(a) && k(b.parentNode) || b, p = j.join(",")
                    }
                    if (p) try {
                        return $.apply(c, o.querySelectorAll(p)), c
                    } catch (a) {} finally {
                        l || b.removeAttribute("id")
                    }
                }
            }
            return B(a.replace(ia, "$1"), b, c, d)
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function d(a) {
            return a[N] = !0, a
        }

        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (a) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--;) w.attrHandle[c[d]] = b
        }

        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        function l() {}

        function m(a) {
            for (var b = 0, c = a.length, d = ""; b < c; b++) d += a[b].value;
            return d
        }

        function n(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = Q++;
            return b.first ? function(b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) {
                            if (i = b[N] || (b[N] = {}), (h = i[d]) && h[0] === P && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function p(a, c, d) {
            for (var e = 0, f = c.length; e < f; e++) b(a, c[e], d);
            return d
        }

        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    r = d || p(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !d && b ? r : q(r, m, a, h, i),
                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e)
                    for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? aa(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
            })
        }

        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                    return a === b
                }, g, !0), j = n(function(a) {
                    return aa(b, a) > -1
                }, g, !0), k = [function(a, c, d) {
                    var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                    return b = null, e
                }]; h < e; h++)
                if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                else {
                    if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d = ++h; d < e && !w.relative[a[d].type]; d++);
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ia, "$1"), c, h < d && s(a.slice(h, d)), d < e && s(a = a.slice(d)), d < e && m(a))
                    }
                    k.push(c)
                }
            return o(k)
        }

        function t(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function(d, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        p = d && [],
                        r = [],
                        s = C,
                        t = d || f && w.find.TAG("*", j),
                        u = P += null == s ? 1 : Math.random() || .1,
                        v = t.length;
                    for (j && (C = g !== G && g); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0; m = a[l++];)
                                if (m(k, g, h)) {
                                    i.push(k);
                                    break
                                }
                            j && (P = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, r, g, h);
                        if (d) {
                            if (n > 0)
                                for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                            r = q(r)
                        }
                        $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (P = u, C = s), p
                };
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
            O = a.document,
            P = 0,
            Q = 0,
            R = c(),
            S = c(),
            T = c(),
            U = function(a, b) {
                return a === b && (E = !0), 0
            },
            V = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            aa = function(a, b) {
                for (var c = 0, d = a.length; c < d; c++)
                    if (a[c] === b) return c;
                return -1
            },
            ba = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ca = "[\\x20\\t\\r\\n\\f]",
            da = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            ea = da.replace("w", "w#"),
            fa = "\\[" + ca + "*(" + da + ")(?:" + ca + "*([*^$|!~]?=)" + ca + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ea + "))|)" + ca + "*\\]",
            ga = ":(" + da + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fa + ")*)|.*)\\)|)",
            ha = new RegExp(ca + "+", "g"),
            ia = new RegExp("^" + ca + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ca + "+$", "g"),
            ja = new RegExp("^" + ca + "*," + ca + "*"),
            ka = new RegExp("^" + ca + "*([>+~]|" + ca + ")" + ca + "*"),
            la = new RegExp("=" + ca + "*([^\\]'\"]*?)" + ca + "*\\]", "g"),
            ma = new RegExp(ga),
            na = new RegExp("^" + ea + "$"),
            oa = {
                ID: new RegExp("^#(" + da + ")"),
                CLASS: new RegExp("^\\.(" + da + ")"),
                TAG: new RegExp("^(" + da.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + fa),
                PSEUDO: new RegExp("^" + ga),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ca + "*(even|odd|(([+-]|)(\\d*)n|)" + ca + "*(?:([+-]|)" + ca + "*(\\d+)|))" + ca + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + ba + ")$", "i"),
                needsContext: new RegExp("^" + ca + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ca + "*((?:-\\d)?\\d*)" + ca + "*\\)|)(?=[^-]|$)", "i")
            },
            pa = /^(?:input|select|textarea|button)$/i,
            qa = /^h\d$/i,
            ra = /^[^{]+\{\s*\[native \w/,
            sa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ta = /[+~]/,
            ua = /'|\\/g,
            va = new RegExp("\\\\([\\da-f]{1,6}" + ca + "?|(" + ca + ")|.)", "ig"),
            wa = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            xa = function() {
                F()
            };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
        } catch (a) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        v = b.support = {}, y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return !!b && "HTML" !== b.nodeName
        }, F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = d.documentElement, c = d.defaultView, c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xa, !1) : c.attachEvent && c.attachEvent("onunload", xa)), I = !y(d), v.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")), !a.getElementsByTagName("*").length
            }), v.getElementsByClassName = ra.test(d.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N, !d.getElementsByName || !d.getElementsByName(N).length
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(va, wa);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                if (I) return b.getElementsByClassName(a)
            }, K = [], J = [], (v.qsa = ra.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + ca + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + ca + "*(?:value|" + ba + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }), e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + ca + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
            })), (v.matchesSelector = ra.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", ga)
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = ra.test(H.compareDocumentPosition), M = b || ra.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? aa(D, a) - aa(D, b) : 0 : 4 & c ? -1 : 1)
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var c, e = 0,
                    f = a.parentNode,
                    h = b.parentNode,
                    i = [a],
                    j = [b];
                if (!f || !h) return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? aa(D, a) - aa(D, b) : 0;
                if (f === h) return g(a, b);
                for (c = a; c = c.parentNode;) i.unshift(c);
                for (c = b; c = c.parentNode;) j.unshift(c);
                for (; i[e] === j[e];) e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }, d) : G
        }, b.matches = function(a, c) {
            return b(a, null, null, c)
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(la, "='$1']"), v.matchesSelector && I && (!K || !K.test(c)) && (!J || !J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (a) {}
            return b(c, G, null, [a]).length > 0
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b)
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()],
                d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, b.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return D = null, a
        }, x = b.getText = function(a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += x(b);
            return c
        }, w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: oa,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(va, wa), a[3] = (a[3] || a[4] || a[5] || "").replace(va, wa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return oa.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && ma.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(va, wa).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + ca + ")" + a + "(" + ca + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : !c || (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(ha, " ") + " ").indexOf(d) > -1 : "|=" === c && (f === d || f.slice(0, d.length + 1) === d + "-"))
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (k = q[N] || (q[N] = {}), j = k[a] || [], n = j[0] === P && j[1], m = j[0] === P && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P) m = j[1];
                            else
                                for (;
                                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]), l !== b)););
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = aa(a, e[g]), a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [],
                        c = [],
                        e = A(a.replace(ia, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return a = a.replace(va, wa),
                        function(b) {
                            return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                        }
                }),
                lang: d(function(a) {
                    return na.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(va, wa).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                            while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !w.pseudos.empty(a)
                },
                header: function(a) {
                    return qa.test(a.nodeName)
                },
                input: function(a) {
                    return pa.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }),
                last: j(function(a, b) {
                    return [b - 1]
                }),
                eq: j(function(a, b, c) {
                    return [c < 0 ? c + b : c]
                }),
                even: j(function(a, b) {
                    for (var c = 0; c < b; c += 2) a.push(c);
                    return a
                }),
                odd: j(function(a, b) {
                    for (var c = 1; c < b; c += 2) a.push(c);
                    return a
                }),
                lt: j(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: j(function(a, b, c) {
                    for (var d = c < 0 ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (u in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[u] = h(u);
        for (u in {
                submit: !0,
                reset: !0
            }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h;) {
                d && !(e = ja.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = ka.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ia, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = oa[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }, A = b.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)), f.selector = a
            }
            return f
        }, B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
                l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(va, wa), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = oa.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(va, wa), ta.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, ta.test(a) && k(b.parentNode) || b), c
        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function(a, b, c) {
            if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), v.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, b, c) {
            if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue
        }), e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(ba, function(a, b, c) {
            var d;
            if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), b
    }(a);
    _.find = ea, _.expr = ea.selectors, _.expr[":"] = _.expr.pseudos, _.unique = ea.uniqueSort, _.text = ea.getText, _.isXMLDoc = ea.isXML, _.contains = ea.contains;
    var fa = _.expr.match.needsContext,
        ga = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        ha = /^.[^:#\[\.,]*$/;
    _.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? _.find.matchesSelector(d, a) ? [d] : [] : _.find.matches(a, _.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, _.fn.extend({
        find: function(a) {
            var b, c = this.length,
                d = [],
                e = this;
            if ("string" != typeof a) return this.pushStack(_(a).filter(function() {
                for (b = 0; b < c; b++)
                    if (_.contains(e[b], this)) return !0
            }));
            for (b = 0; b < c; b++) _.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? _.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && fa.test(a) ? _(a) : a || [], !1).length
        }
    });
    var ia, ja = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ka = _.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : ja.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || ia).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof _ ? b[0] : b, _.merge(this, _.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : Z, !0)), ga.test(c[1]) && _.isPlainObject(b))
                        for (c in b) _.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                return d = Z.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = Z, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : _.isFunction(a) ? "undefined" != typeof ia.ready ? ia.ready(a) : a(_) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), _.makeArray(a, this))
        };
    ka.prototype = _.fn, ia = _(Z);
    var la = /^(?:parents|prev(?:Until|All))/,
        ma = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    _.extend({
        dir: function(a, b, c) {
            for (var d = [], e = void 0 !== c;
                (a = a[b]) && 9 !== a.nodeType;)
                if (1 === a.nodeType) {
                    if (e && _(a).is(c)) break;
                    d.push(a)
                }
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), _.fn.extend({
        has: function(a) {
            var b = _(a, this),
                c = b.length;
            return this.filter(function() {
                for (var a = 0; a < c; a++)
                    if (_.contains(this, b[a])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = fa.test(a) || "string" != typeof a ? _(a, b || this.context) : 0; d < e; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && _.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? _.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? U.call(_(a), this[0]) : U.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(_.unique(_.merge(this.get(), _(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), _.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return _.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return _.dir(a, "parentNode", c)
        },
        next: function(a) {
            return e(a, "nextSibling")
        },
        prev: function(a) {
            return e(a, "previousSibling")
        },
        nextAll: function(a) {
            return _.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return _.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return _.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return _.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return _.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return _.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || _.merge([], a.childNodes)
        }
    }, function(a, b) {
        _.fn[a] = function(c, d) {
            var e = _.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = _.filter(d, e)), this.length > 1 && (ma[a] || _.unique(e), la.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var na = /\S+/g,
        oa = {};
    _.Callbacks = function(a) {
        a = "string" == typeof a ? oa[a] || f(a) : _.extend({}, a);
        var b, c, d, e, g, h, i = [],
            j = !a.once && [],
            k = function(f) {
                for (b = a.memory && f, c = !0, h = e || 0, e = 0, g = i.length, d = !0; i && h < g; h++)
                    if (i[h].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                d = !1, i && (j ? j.length && k(j.shift()) : b ? i = [] : l.disable())
            },
            l = {
                add: function() {
                    if (i) {
                        var c = i.length;
                        ! function b(c) {
                            _.each(c, function(c, d) {
                                var e = _.type(d);
                                "function" === e ? a.unique && l.has(d) || i.push(d) : d && d.length && "string" !== e && b(d)
                            })
                        }(arguments), d ? g = i.length : b && (e = c, k(b))
                    }
                    return this
                },
                remove: function() {
                    return i && _.each(arguments, function(a, b) {
                        for (var c;
                            (c = _.inArray(b, i, c)) > -1;) i.splice(c, 1), d && (c <= g && g--, c <= h && h--)
                    }), this
                },
                has: function(a) {
                    return a ? _.inArray(a, i) > -1 : !(!i || !i.length)
                },
                empty: function() {
                    return i = [], g = 0, this
                },
                disable: function() {
                    return i = j = b = void 0, this
                },
                disabled: function() {
                    return !i
                },
                lock: function() {
                    return j = void 0, b || l.disable(), this
                },
                locked: function() {
                    return !j
                },
                fireWith: function(a, b) {
                    return !i || c && !j || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? j.push(b) : k(b)), this
                },
                fire: function() {
                    return l.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return l
    }, _.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", _.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", _.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", _.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return _.Deferred(function(c) {
                            _.each(b, function(b, f) {
                                var g = _.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && _.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? _.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, _.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b, c, d, e = 0,
                f = R.call(arguments),
                g = f.length,
                h = 1 !== g || a && _.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : _.Deferred(),
                j = function(a, c, d) {
                    return function(e) {
                        c[a] = this, d[a] = arguments.length > 1 ? R.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = new Array(g), c = new Array(g), d = new Array(g); e < g; e++) f[e] && _.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    });
    var pa;
    _.fn.ready = function(a) {
        return _.ready.promise().done(a), this
    }, _.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? _.readyWait++ : _.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --_.readyWait : _.isReady) || (_.isReady = !0, a !== !0 && --_.readyWait > 0 || (pa.resolveWith(Z, [_]), _.fn.triggerHandler && (_(Z).triggerHandler("ready"), _(Z).off("ready"))))
        }
    }), _.ready.promise = function(b) {
        return pa || (pa = _.Deferred(), "complete" === Z.readyState ? setTimeout(_.ready) : (Z.addEventListener("DOMContentLoaded", g, !1), a.addEventListener("load", g, !1))), pa.promise(b)
    }, _.ready.promise();
    var qa = _.access = function(a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;
        if ("object" === _.type(c)) {
            e = !0;
            for (h in c) _.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, _.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                return j.call(_(a), c)
            })), b))
            for (; h < i; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    _.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    }, h.uid = 1, h.accepts = _.acceptData, h.prototype = {
        key: function(a) {
            if (!h.accepts(a)) return 0;
            var b = {},
                c = a[this.expando];
            if (!c) {
                c = h.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c, _.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },
        set: function(a, b, c) {
            var d, e = this.key(a),
                f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (_.isEmptyObject(f)) _.extend(this.cache[e], b);
            else
                for (d in b) f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, _.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a),
                g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                _.isArray(b) ? d = b.concat(b.map(_.camelCase)) : (e = _.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(na) || [])), c = d.length;
                for (; c--;) delete g[d[c]]
            }
        },
        hasData: function(a) {
            return !_.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var ra = new h,
        sa = new h,
        ta = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        ua = /([A-Z])/g;
    _.extend({
        hasData: function(a) {
            return sa.hasData(a) || ra.hasData(a)
        },
        data: function(a, b, c) {
            return sa.access(a, b, c)
        },
        removeData: function(a, b) {
            sa.remove(a, b)
        },
        _data: function(a, b, c) {
            return ra.access(a, b, c)
        },
        _removeData: function(a, b) {
            ra.remove(a, b)
        }
    }), _.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = sa.get(f), 1 === f.nodeType && !ra.get(f, "hasDataAttrs"))) {
                    for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = _.camelCase(d.slice(5)), i(f, d, e[d])));
                    ra.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                sa.set(this, a)
            }) : qa(this, function(b) {
                var c, d = _.camelCase(a);
                if (f && void 0 === b) {
                    if (c = sa.get(f, a), void 0 !== c) return c;
                    if (c = sa.get(f, d), void 0 !== c) return c;
                    if (c = i(f, d, void 0), void 0 !== c) return c
                } else this.each(function() {
                    var c = sa.get(this, d);
                    sa.set(this, d, b), a.indexOf("-") !== -1 && void 0 !== c && sa.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                sa.remove(this, a)
            })
        }
    }), _.extend({
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = ra.get(a, b), c && (!d || _.isArray(c) ? d = ra.access(a, b, _.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = _.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = _._queueHooks(a, b),
                g = function() {
                    _.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return ra.get(a, c) || ra.access(a, c, {
                empty: _.Callbacks("once memory").add(function() {
                    ra.remove(a, [b + "queue", c])
                })
            })
        }
    }), _.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? _.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = _.queue(this, a, b);
                _._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && _.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                _.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = _.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = ra.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var va = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        wa = ["Top", "Right", "Bottom", "Left"],
        xa = function(a, b) {
            return a = b || a, "none" === _.css(a, "display") || !_.contains(a.ownerDocument, a)
        },
        ya = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = Z.createDocumentFragment(),
            b = a.appendChild(Z.createElement("div")),
            c = Z.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), Y.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", Y.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var za = "undefined";
    Y.focusinBubbles = "onfocusin" in a;
    var Aa = /^key/,
        Ba = /^(?:mouse|pointer|contextmenu)|click/,
        Ca = /^(?:focusinfocus|focusoutblur)$/,
        Da = /^([^.]*)(?:\.(.+)|)$/;
    _.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.get(a);
            if (q)
                for (c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = _.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function(b) {
                        return typeof _ !== za && _.event.triggered !== b.type ? _.event.dispatch.apply(a, arguments) : void 0
                    }), b = (b || "").match(na) || [""], j = b.length; j--;) h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = _.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = _.event.special[n] || {}, k = _.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && _.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), _.event.global[n] = !0)
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = ra.hasData(a) && ra.get(a);
            if (q && (i = q.events)) {
                for (b = (b || "").match(na) || [""], j = b.length; j--;)
                    if (h = Da.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = _.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length; f--;) k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || _.removeEvent(a, n, q.handle), delete i[n])
                    } else
                        for (n in i) _.event.remove(a, n + b[j], c, d, !0);
                _.isEmptyObject(i) && (delete q.handle, ra.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || Z],
                n = X.call(b, "type") ? b.type : b,
                o = X.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || Z, 3 !== d.nodeType && 8 !== d.nodeType && !Ca.test(n + _.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."), n = o.shift(), o.sort()), j = n.indexOf(":") < 0 && "on" + n, b = b[_.expando] ? b : new _.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : _.makeArray(c, [b]), l = _.event.special[n] || {}, e || !l.trigger || l.trigger.apply(d, c) !== !1)) {
                if (!e && !l.noBubble && !_.isWindow(d)) {
                    for (i = l.delegateType || n, Ca.test(i + n) || (g = g.parentNode); g; g = g.parentNode) m.push(g), h = g;
                    h === (d.ownerDocument || Z) && m.push(h.defaultView || h.parentWindow || a)
                }
                for (f = 0;
                    (g = m[f++]) && !b.isPropagationStopped();) b.type = f > 1 ? i : l.bindType || n, k = (ra.get(g, "events") || {})[b.type] && ra.get(g, "handle"), k && k.apply(g, c), k = j && g[j], k && k.apply && _.acceptData(g) && (b.result = k.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = n, e || b.isDefaultPrevented() || l._default && l._default.apply(m.pop(), c) !== !1 || !_.acceptData(d) || j && _.isFunction(d[n]) && !_.isWindow(d) && (h = d[j], h && (d[j] = null), _.event.triggered = n, d[n](), _.event.triggered = void 0, h && (d[j] = h)), b.result
            }
        },
        dispatch: function(a) {
            a = _.event.fix(a);
            var b, c, d, e, f, g = [],
                h = R.call(arguments),
                i = (ra.get(this, "events") || {})[a.type] || [],
                j = _.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = _.event.handlers.call(this, a, i), b = 0;
                    (e = g[b++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = e.elem, c = 0;
                        (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();) a.namespace_re && !a.namespace_re.test(f.namespace) || (a.handleObj = f, a.data = f.data, d = ((_.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [], c = 0; c < h; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? _(e, this).index(i) >= 0 : _.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || Z, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[_.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Ba.test(e) ? this.mouseHooks : Aa.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new _.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
            return a.target || (a.target = Z), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== l() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === l() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && _.nodeName(this, "input")) return this.click(), !1
                },
                _default: function(a) {
                    return _.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = _.extend(new _.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? _.event.trigger(e, null, b) : _.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, _.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }, _.Event = function(a, b) {
        return this instanceof _.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? j : k) : this.type = a, b && _.extend(this, b), this.timeStamp = a && a.timeStamp || _.now(), void(this[_.expando] = !0)) : new _.Event(a, b)
    }, _.Event.prototype = {
        isDefaultPrevented: k,
        isPropagationStopped: k,
        isImmediatePropagationStopped: k,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = j, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = j, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = j, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, _.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        _.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return e && (e === d || _.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), Y.focusinBubbles || _.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            _.event.simulate(b, a.target, _.event.fix(a), !0)
        };
        _.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = ra.access(d, b);
                e || d.addEventListener(a, c, !0), ra.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = ra.access(d, b) - 1;
                e ? ra.access(d, b, e) : (d.removeEventListener(a, c, !0), ra.remove(d, b))
            }
        }
    }), _.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = k;
            else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return _().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = _.guid++)), this.each(function() {
                _.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, _(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = k), this.each(function() {
                _.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                _.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            if (c) return _.event.trigger(a, b, c, !0)
        }
    });
    var Ea = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Fa = /<([\w:]+)/,
        Ga = /<|&#?\w+;/,
        Ha = /<(?:script|style|link)/i,
        Ia = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Ja = /^$|\/(?:java|ecma)script/i,
        Ka = /^true\/(.*)/,
        La = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Ma = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    Ma.optgroup = Ma.option, Ma.tbody = Ma.tfoot = Ma.colgroup = Ma.caption = Ma.thead, Ma.th = Ma.td, _.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = _.contains(a.ownerDocument, a);
            if (!(Y.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || _.isXMLDoc(a)))
                for (g = r(h), f = r(a), d = 0, e = f.length; d < e; d++) s(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || r(a), g = g || r(h), d = 0, e = f.length; d < e; d++) q(f[d], g[d]);
                else q(a, h);
            return g = r(h, "script"), g.length > 0 && p(g, !i && r(a, "script")), h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, n = a.length; m < n; m++)
                if (e = a[m], e || 0 === e)
                    if ("object" === _.type(e)) _.merge(l, e.nodeType ? [e] : e);
                    else if (Ga.test(e)) {
                for (f = f || k.appendChild(b.createElement("div")), g = (Fa.exec(e) || ["", ""])[1].toLowerCase(), h = Ma[g] || Ma._default, f.innerHTML = h[1] + e.replace(Ea, "<$1></$2>") + h[2], j = h[0]; j--;) f = f.lastChild;
                _.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
            } else l.push(b.createTextNode(e));
            for (k.textContent = "", m = 0; e = l[m++];)
                if ((!d || _.inArray(e, d) === -1) && (i = _.contains(e.ownerDocument, e), f = r(k.appendChild(e), "script"), i && p(f), c))
                    for (j = 0; e = f[j++];) Ja.test(e.type || "") && c.push(e);
            return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = _.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (_.acceptData(c) && (e = c[ra.expando], e && (b = ra.cache[e]))) {
                    if (b.events)
                        for (d in b.events) f[d] ? _.event.remove(c, d) : _.removeEvent(c, d, b.handle);
                    ra.cache[e] && delete ra.cache[e]
                }
                delete sa.cache[c[sa.expando]]
            }
        }
    }), _.fn.extend({
        text: function(a) {
            return qa(this, function(a) {
                return void 0 === a ? _.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = m(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? _.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || _.cleanData(r(c)), c.parentNode && (b && _.contains(c.ownerDocument, c) && p(r(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (_.cleanData(r(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null != a && a, b = null == b ? a : b, this.map(function() {
                return _.clone(this, a, b)
            })
        },
        html: function(a) {
            return qa(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !Ha.test(a) && !Ma[(Fa.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(Ea, "<$1></$2>");
                    try {
                        for (; c < d; c++) b = this[c] || {}, 1 === b.nodeType && (_.cleanData(r(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (a) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, _.cleanData(r(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = S.apply([], a);
            var c, d, e, f, g, h, i = 0,
                j = this.length,
                k = this,
                l = j - 1,
                m = a[0],
                p = _.isFunction(m);
            if (p || j > 1 && "string" == typeof m && !Y.checkClone && Ia.test(m)) return this.each(function(c) {
                var d = k.eq(c);
                p && (a[0] = m.call(this, c, d.html())), d.domManip(a, b)
            });
            if (j && (c = _.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (e = _.map(r(c, "script"), n), f = e.length; i < j; i++) g = c, i !== l && (g = _.clone(g, !0, !0), f && _.merge(e, r(g, "script"))), b.call(this[i], g, i);
                if (f)
                    for (h = e[e.length - 1].ownerDocument, _.map(e, o), i = 0; i < f; i++) g = e[i], Ja.test(g.type || "") && !ra.access(g, "globalEval") && _.contains(h, g) && (g.src ? _._evalUrl && _._evalUrl(g.src) : _.globalEval(g.textContent.replace(La, "")))
            }
            return this
        }
    }), _.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        _.fn[a] = function(a) {
            for (var c, d = [], e = _(a), f = e.length - 1, g = 0; g <= f; g++) c = g === f ? this : this.clone(!0), _(e[g])[b](c), T.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var Na, Oa = {},
        Pa = /^margin/,
        Qa = new RegExp("^(" + va + ")(?!px)[a-z%]+$", "i"),
        Ra = function(b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
        };
    ! function() {
        function b() {
            g.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", g.innerHTML = "", e.appendChild(f);
            var b = a.getComputedStyle(g, null);
            c = "1%" !== b.top, d = "4px" === b.width, e.removeChild(f)
        }
        var c, d, e = Z.documentElement,
            f = Z.createElement("div"),
            g = Z.createElement("div");
        g.style && (g.style.backgroundClip = "content-box", g.cloneNode(!0).style.backgroundClip = "", Y.clearCloneStyle = "content-box" === g.style.backgroundClip, f.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", f.appendChild(g), a.getComputedStyle && _.extend(Y, {
            pixelPosition: function() {
                return b(), c
            },
            boxSizingReliable: function() {
                return null == d && b(), d
            },
            reliableMarginRight: function() {
                var b, c = g.appendChild(Z.createElement("div"));
                return c.style.cssText = g.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", g.style.width = "1px", e.appendChild(f), b = !parseFloat(a.getComputedStyle(c, null).marginRight), e.removeChild(f), g.removeChild(c), b
            }
        }))
    }(), _.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var Sa = /^(none|table(?!-c[ea]).+)/,
        Ta = new RegExp("^(" + va + ")(.*)$", "i"),
        Ua = new RegExp("^([+-])=(" + va + ")", "i"),
        Va = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Wa = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Xa = ["Webkit", "O", "Moz", "ms"];
    _.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = v(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = _.camelCase(b),
                    i = a.style;
                return b = _.cssProps[h] || (_.cssProps[h] = x(i, h)), g = _.cssHooks[b] || _.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ua.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(_.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || _.cssNumber[h] || (c += "px"), Y.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = _.camelCase(b);
            return b = _.cssProps[h] || (_.cssProps[h] = x(a.style, h)), g = _.cssHooks[b] || _.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = v(a, b, d)), "normal" === e && b in Wa && (e = Wa[b]), "" === c || c ? (f = parseFloat(e), c === !0 || _.isNumeric(f) ? f || 0 : e) : e
        }
    }), _.each(["height", "width"], function(a, b) {
        _.cssHooks[b] = {
            get: function(a, c, d) {
                if (c) return Sa.test(_.css(a, "display")) && 0 === a.offsetWidth ? _.swap(a, Va, function() {
                    return A(a, b, d)
                }) : A(a, b, d)
            },
            set: function(a, c, d) {
                var e = d && Ra(a);
                return y(a, c, d ? z(a, b, d, "border-box" === _.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), _.cssHooks.marginRight = w(Y.reliableMarginRight, function(a, b) {
        if (b) return _.swap(a, {
            display: "inline-block"
        }, v, [a, "marginRight"])
    }), _.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        _.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) e[a + wa[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, Pa.test(a) || (_.cssHooks[a + b].set = y)
    }), _.fn.extend({
        css: function(a, b) {
            return qa(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (_.isArray(b)) {
                    for (d = Ra(a), e = b.length; g < e; g++) f[b[g]] = _.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? _.style(a, b, c) : _.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return B(this, !0)
        },
        hide: function() {
            return B(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                xa(this) ? _(this).show() : _(this).hide()
            })
        }
    }), _.Tween = C, C.prototype = {
        constructor: C,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (_.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = C.propHooks[this.prop];
            return a && a.get ? a.get(this) : C.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = C.propHooks[this.prop];
            return this.options.duration ? this.pos = b = _.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : C.propHooks._default.set(this), this
        }
    }, C.prototype.init.prototype = C.prototype, C.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = _.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                _.fx.step[a.prop] ? _.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[_.cssProps[a.prop]] || _.cssHooks[a.prop]) ? _.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, C.propHooks.scrollTop = C.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, _.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, _.fx = C.prototype.init, _.fx.step = {};
    var Ya, Za, $a = /^(?:toggle|show|hide)$/,
        _a = new RegExp("^(?:([+-])=|)(" + va + ")([a-z%]*)$", "i"),
        ab = /queueHooks$/,
        bb = [G],
        cb = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = _a.exec(b),
                    f = e && e[3] || (_.cssNumber[a] ? "" : "px"),
                    g = (_.cssNumber[a] || "px" !== f && +d) && _a.exec(_.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, _.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };
    _.Animation = _.extend(I, {
            tweener: function(a, b) {
                _.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; d < e; d++) c = a[d], cb[c] = cb[c] || [], cb[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? bb.unshift(a) : bb.push(a)
            }
        }), _.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? _.extend({}, a) : {
                complete: c || !c && b || _.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !_.isFunction(b) && b
            };
            return d.duration = _.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in _.fx.speeds ? _.fx.speeds[d.duration] : _.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                _.isFunction(d.old) && d.old.call(this), d.queue && _.dequeue(this, d.queue)
            }, d
        }, _.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(xa).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = _.isEmptyObject(a),
                    f = _.speed(b, c, d),
                    g = function() {
                        var b = I(this, _.extend({}, a), f);
                        (e || ra.get(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = _.timers,
                        g = ra.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && ab.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    !b && c || _.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = ra.get(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = _.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, _.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; b < g; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), _.each(["toggle", "show", "hide"], function(a, b) {
            var c = _.fn[b];
            _.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(E(b, !0), a, d, e)
            }
        }), _.each({
            slideDown: E("show"),
            slideUp: E("hide"),
            slideToggle: E("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            _.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), _.timers = [], _.fx.tick = function() {
            var a, b = 0,
                c = _.timers;
            for (Ya = _.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || _.fx.stop(), Ya = void 0
        }, _.fx.timer = function(a) {
            _.timers.push(a), a() ? _.fx.start() : _.timers.pop()
        }, _.fx.interval = 13, _.fx.start = function() {
            Za || (Za = setInterval(_.fx.tick, _.fx.interval))
        }, _.fx.stop = function() {
            clearInterval(Za), Za = null
        }, _.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, _.fn.delay = function(a, b) {
            return a = _.fx ? _.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        function() {
            var a = Z.createElement("input"),
                b = Z.createElement("select"),
                c = b.appendChild(Z.createElement("option"));
            a.type = "checkbox", Y.checkOn = "" !== a.value, Y.optSelected = c.selected, b.disabled = !0, Y.optDisabled = !c.disabled, a = Z.createElement("input"), a.value = "t", a.type = "radio", Y.radioValue = "t" === a.value
        }();
    var db, eb, fb = _.expr.attrHandle;
    _.fn.extend({
        attr: function(a, b) {
            return qa(this, _.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                _.removeAttr(this, a)
            })
        }
    }), _.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === za ? _.prop(a, b, c) : (1 === f && _.isXMLDoc(a) || (b = b.toLowerCase(), d = _.attrHooks[b] || (_.expr.match.bool.test(b) ? eb : db)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = _.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void _.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(na);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = _.propFix[c] || c, _.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!Y.radioValue && "radio" === b && _.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), eb = {
        set: function(a, b, c) {
            return b === !1 ? _.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, _.each(_.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = fb[b] || _.find.attr;
        fb[b] = function(a, b, d) {
            var e, f;
            return d || (f = fb[b], fb[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, fb[b] = f), e
        }
    });
    var gb = /^(?:input|select|textarea|button)$/i;
    _.fn.extend({
        prop: function(a, b) {
            return qa(this, _.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[_.propFix[a] || a]
            })
        }
    }), _.extend({
        propFix: {
            for: "htmlFor",
            class: "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !_.isXMLDoc(a), f && (b = _.propFix[b] || b, e = _.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || gb.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }), Y.optSelected || (_.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }
    }), _.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        _.propFix[this.toLowerCase()] = this
    });
    var hb = /[\t\r\n\f]/g;
    _.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).addClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(na) || []; i < j; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : " ")) {
                        for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = _.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (_.isFunction(a)) return this.each(function(b) {
                _(this).removeClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(na) || []; i < j; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(hb, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                        g = a ? _.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : _.isFunction(a) ? this.each(function(c) {
                _(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if ("string" === c)
                    for (var b, d = 0, e = _(this), f = a.match(na) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else c !== za && "boolean" !== c || (this.className && ra.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : ra.get(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; c < d; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(hb, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    });
    var ib = /\r/g;
    _.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = _.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, _(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : _.isArray(e) && (e = _.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = _.valHooks[this.type] || _.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = _.valHooks[e.type] || _.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(ib, "") : null == c ? "" : c)
            }
        }
    }), _.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = _.find.attr(a, "value");
                    return null != b ? b : _.trim(_.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || e < 0, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; i < h; i++)
                        if (c = d[i], (c.selected || i === e) && (Y.optDisabled ? !c.disabled : null === c.getAttribute("disabled")) && (!c.parentNode.disabled || !_.nodeName(c.parentNode, "optgroup"))) {
                            if (b = _(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = _.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = _.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), _.each(["radio", "checkbox"], function() {
        _.valHooks[this] = {
            set: function(a, b) {
                if (_.isArray(b)) return a.checked = _.inArray(_(a).val(), b) >= 0
            }
        }, Y.checkOn || (_.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    }), _.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        _.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), _.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var jb = _.now(),
        kb = /\?/;
    _.parseJSON = function(a) {
        return JSON.parse(a + "")
    }, _.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (a) {
            b = void 0
        }
        return b && !b.getElementsByTagName("parsererror").length || _.error("Invalid XML: " + a), b
    };
    var lb = /#.*$/,
        mb = /([?&])_=[^&]*/,
        nb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        ob = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        pb = /^(?:GET|HEAD)$/,
        qb = /^\/\//,
        rb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        sb = {},
        tb = {},
        ub = "*/".concat("*"),
        vb = a.location.href,
        wb = rb.exec(vb.toLowerCase()) || [];
    _.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: vb,
            type: "GET",
            isLocal: ob.test(wb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",

            accepts: {
                "*": ub,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": _.parseJSON,
                "text xml": _.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? L(L(a, _.ajaxSettings), b) : L(_.ajaxSettings, a)
        },
        ajaxPrefilter: J(sb),
        ajaxTransport: J(tb),
        ajax: function(a, b) {
            function c(a, b, c, g) {
                var i, k, r, s, u, w = b;
                2 !== t && (t = 2, h && clearTimeout(h), d = void 0, f = g || "", v.readyState = a > 0 ? 4 : 0, i = a >= 200 && a < 300 || 304 === a, c && (s = M(l, v, c)), s = N(l, s, v, i), i ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"), u && (_.lastModified[e] = u), u = v.getResponseHeader("etag"), u && (_.etag[e] = u)), 204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state, k = s.data, r = s.error, i = !r)) : (r = w, !a && w || (w = "error", a < 0 && (a = 0))), v.status = a, v.statusText = (b || w) + "", i ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]), v.statusCode(q), q = void 0, j && n.trigger(i ? "ajaxSuccess" : "ajaxError", [v, l, i ? k : r]), p.fireWith(m, [v, w]), j && (n.trigger("ajaxComplete", [v, l]), --_.active || _.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var d, e, f, g, h, i, j, k, l = _.ajaxSetup({}, b),
                m = l.context || l,
                n = l.context && (m.nodeType || m.jquery) ? _(m) : _.event,
                o = _.Deferred(),
                p = _.Callbacks("once memory"),
                q = l.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!g)
                                for (g = {}; b = nb.exec(f);) g[b[1].toLowerCase()] = b[2];
                            b = g[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (l.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (t < 2)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return d && d.abort(b), c(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, l.url = ((a || l.url || vb) + "").replace(lb, "").replace(qb, wb[1] + "//"), l.type = b.method || b.type || l.method || l.type, l.dataTypes = _.trim(l.dataType || "*").toLowerCase().match(na) || [""], null == l.crossDomain && (i = rb.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] === wb[1] && i[2] === wb[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (wb[3] || ("http:" === wb[1] ? "80" : "443")))), l.data && l.processData && "string" != typeof l.data && (l.data = _.param(l.data, l.traditional)), K(sb, l, b, v), 2 === t) return v;
            j = _.event && l.global, j && 0 === _.active++ && _.event.trigger("ajaxStart"), l.type = l.type.toUpperCase(), l.hasContent = !pb.test(l.type), e = l.url, l.hasContent || (l.data && (e = l.url += (kb.test(e) ? "&" : "?") + l.data, delete l.data), l.cache === !1 && (l.url = mb.test(e) ? e.replace(mb, "$1_=" + jb++) : e + (kb.test(e) ? "&" : "?") + "_=" + jb++)), l.ifModified && (_.lastModified[e] && v.setRequestHeader("If-Modified-Since", _.lastModified[e]), _.etag[e] && v.setRequestHeader("If-None-Match", _.etag[e])), (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType), v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + ub + "; q=0.01" : "") : l.accepts["*"]);
            for (k in l.headers) v.setRequestHeader(k, l.headers[k]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (k in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[k](l[k]);
            if (d = K(tb, l, b, v)) {
                v.readyState = 1, j && n.trigger("ajaxSend", [v, l]), l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout")
                }, l.timeout));
                try {
                    t = 1, d.send(r, c)
                } catch (a) {
                    if (!(t < 2)) throw a;
                    c(-1, a)
                }
            } else c(-1, "No Transport");
            return v
        },
        getJSON: function(a, b, c) {
            return _.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return _.get(a, void 0, b, "script")
        }
    }), _.each(["get", "post"], function(a, b) {
        _[b] = function(a, c, d, e) {
            return _.isFunction(c) && (e = e || d, d = c, c = void 0), _.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), _._evalUrl = function(a) {
        return _.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            throws: !0
        })
    }, _.fn.extend({
        wrapAll: function(a) {
            var b;
            return _.isFunction(a) ? this.each(function(b) {
                _(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = _(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                for (var a = this; a.firstElementChild;) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return _.isFunction(a) ? this.each(function(b) {
                _(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = _(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = _.isFunction(a);
            return this.each(function(c) {
                _(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                _.nodeName(this, "body") || _(this).replaceWith(this.childNodes)
            }).end()
        }
    }), _.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, _.expr.filters.visible = function(a) {
        return !_.expr.filters.hidden(a)
    };
    var xb = /%20/g,
        yb = /\[\]$/,
        zb = /\r?\n/g,
        Ab = /^(?:submit|button|image|reset|file)$/i,
        Bb = /^(?:input|select|textarea|keygen)/i;
    _.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = _.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = _.ajaxSettings && _.ajaxSettings.traditional), _.isArray(a) || a.jquery && !_.isPlainObject(a)) _.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) O(c, a[c], b, e);
        return d.join("&").replace(xb, "+")
    }, _.fn.extend({
        serialize: function() {
            return _.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = _.prop(this, "elements");
                return a ? _.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !_(this).is(":disabled") && Bb.test(this.nodeName) && !Ab.test(a) && (this.checked || !ya.test(a))
            }).map(function(a, b) {
                var c = _(this).val();
                return null == c ? null : _.isArray(c) ? _.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(zb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(zb, "\r\n")
                }
            }).get()
        }
    }), _.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var Cb = 0,
        Db = {},
        Eb = {
            0: 200,
            1223: 204
        },
        Fb = _.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Db) Db[a]()
    }), Y.cors = !!Fb && "withCredentials" in Fb, Y.ajax = Fb = !!Fb, _.ajaxTransport(function(a) {
        var b;
        if (Y.cors || Fb && !a.crossDomain) return {
            send: function(c, d) {
                var e, f = a.xhr(),
                    g = ++Cb;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Db[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Eb[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Db[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (a) {
                    if (b) throw a
                }
            },
            abort: function() {
                b && b()
            }
        }
    }), _.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {

                return _.globalEval(a), a
            }
        }
    }), _.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), _.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = _("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), Z.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Gb = [],
        Hb = /(=)\?(?=&|$)|\?\?/;
    _.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Gb.pop() || _.expando + "_" + jb++;
            return this[a] = !0, a
        }
    }), _.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Hb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Hb.test(b.data) && "data");
        if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = _.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Hb, "$1" + e) : b.jsonp !== !1 && (b.url += (kb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || _.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Gb.push(e)), g && _.isFunction(f) && f(g[0]), g = f = void 0
        }), "script"
    }), _.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || Z;
        var d = ga.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = _.buildFragment([a], b, e), e && e.length && _(e).remove(), _.merge([], d.childNodes))
    };
    var Ib = _.fn.load;
    _.fn.load = function(a, b, c) {
        if ("string" != typeof a && Ib) return Ib.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = _.trim(a.slice(h)), a = a.slice(0, h)), _.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && _.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? _("<div>").append(_.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }), this
    }, _.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        _.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), _.expr.filters.animated = function(a) {
        return _.grep(_.timers, function(b) {
            return a === b.elem
        }).length
    };
    var Jb = a.document.documentElement;
    _.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = _.css(a, "position"),
                l = _(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = _.css(a, "top"), i = _.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), _.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, _.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                _.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
                e = {
                    top: 0,
                    left: 0
                },
                f = d && d.ownerDocument;
            if (f) return b = f.documentElement, _.contains(b, d) ? (typeof d.getBoundingClientRect !== za && (e = d.getBoundingClientRect()), c = P(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === _.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), _.nodeName(a[0], "html") || (d = a.offset()), d.top += _.css(a[0], "borderTopWidth", !0), d.left += _.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - _.css(c, "marginTop", !0),
                    left: b.left - d.left - _.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || Jb; a && !_.nodeName(a, "html") && "static" === _.css(a, "position");) a = a.offsetParent;
                return a || Jb
            })
        }
    }), _.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        _.fn[b] = function(e) {
            return qa(this, function(b, e, f) {
                var g = P(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }), _.each(["top", "left"], function(a, b) {
        _.cssHooks[b] = w(Y.pixelPosition, function(a, c) {
            if (c) return c = v(a, b), Qa.test(c) ? _(a).position()[b] + "px" : c
        })
    }), _.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        _.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            _.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return qa(this, function(b, c, d) {
                    var e;
                    return _.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? _.css(b, c, g) : _.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), _.fn.size = function() {
        return this.length
    }, _.fn.andSelf = _.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return _
    });
    var Kb = a.jQuery,
        Lb = a.$;
    return _.noConflict = function(b) {
        return a.$ === _ && (a.$ = Lb), b && a.jQuery === _ && (a.jQuery = Kb), _
    }, typeof b === za && (a.jQuery = a.$ = _), _
});

! function(a) {
    function b() {}
    for (var c, d = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","); c = d.pop();) a[c] = a[c] || b
}(function() {
    try {
        return console.log(), window.console
    } catch (a) {
        return window.console = {}
    }
}()), console.log("TCOM:AWS - This page is on an aws server."),
    function(a) {
        if ("function" == typeof define && define.amd) {
            var b = "[history" + (new Date).getTime() + "]",
                c = requirejs.onError;
            a.toString = function() {
                return b
            }, requirejs.onError = function(a) {
                a.message.indexOf(b) === -1 && c.call(requirejs, a)
            }, define("history", [], a)
        }
        a()
    }(function() {
        function a() {}

        function b(a, c, d) {
            var e = /(?:(\w+\:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/;
            if (null == a || "" === a || c) a = c ? a : w.href, B && !d || (a = a.replace(/^[^#]*/, "") || "#", a = w.protocol.replace(/:.*$|$/, ":") + "//" + w.host + M.basepath + a.replace(new RegExp("^#[/]?(?:" + M.type + ")?"), ""));
            else {
                var f = b(),
                    g = s.getElementsByTagName("base")[0];
                !d && g && g.getAttribute("href") && (g.href = g.href, f = b(g.href, null, !0));
                var h = f._pathname,
                    i = f._protocol;
                a = "" + a, a = /^(?:\w+\:)?\/\//.test(a) ? 0 === a.indexOf("/") ? i + a : a : i + "//" + f._host + (0 === a.indexOf("/") ? a : 0 === a.indexOf("?") ? h + a : 0 === a.indexOf("#") ? h + f._search + a : h.replace(/[^\/]+$/g, "") + a)
            }
            O.href = a;
            var j = e.exec(O.href),
                k = j[2] + (j[3] ? ":" + j[3] : ""),
                l = j[4] || "/",
                m = j[5] || "",
                n = "#" === j[6] ? "" : j[6] || "",
                o = l + m + n,
                p = l.replace(new RegExp("^" + M.basepath, "i"), M.type) + m;
            return {
                _href: j[1] + "//" + k + o,
                _protocol: j[1],
                _host: k,
                _hostname: j[2],
                _port: j[3] || "",
                _pathname: l,
                _search: m,
                _hash: n,
                _relative: o,
                _nohash: p,
                _special: p + n
            }
        }

        function c() {
            var a;
            try {
                a = r.sessionStorage, a.setItem(N + "t", "1"), a.removeItem(N + "t")
            } catch (b) {
                a = {
                    getItem: function(a) {
                        var b = s.cookie.split(a + "=");
                        return b.length > 1 && b.pop().split(";").shift() || "null"
                    },
                    setItem: function(a, b) {
                        var c = {};
                        (c[w.href] = y.state) && (s.cookie = a + "=" + v.stringify(c))
                    }
                }
            }
            try {
                U = v.parse(a.getItem(N)) || {}
            } catch (a) {
                U = {}
            }
            J(F + "unload", function() {
                a.setItem(N, v.stringify(U))
            }, !1)
        }

        function d(b, c, d, e) {
            var f = 0;
            d || (d = {
                set: a
            }, f = 1);
            var g = !d.set,
                h = !d.get,
                i = {
                    configurable: !0,
                    set: function() {
                        g = 1
                    },
                    get: function() {
                        h = 1
                    }
                };
            try {
                D(b, c, i), b[c] = b[c], D(b, c, d)
            } catch (a) {}
            if (!(g && h || (b.__defineGetter__ && (b.__defineGetter__(c, i.get), b.__defineSetter__(c, i.set), b[c] = b[c], d.get && b.__defineGetter__(c, d.get), d.set && b.__defineSetter__(c, d.set)), g && h))) {
                if (f) return !1;
                if (b === r) {
                    try {
                        var j = b[c];
                        b[c] = null
                    } catch (a) {}
                    if ("execScript" in r) r.execScript("Public " + c, "VBScript"), r.execScript("var " + c + ";", "JavaScript");
                    else try {
                        D(b, c, {
                            value: a
                        })
                    } catch (a) {
                        "onpopstate" === c && (J("popstate", d = function() {
                            K("popstate", d, !1);
                            var a = b.onpopstate;
                            b.onpopstate = null, setTimeout(function() {
                                b.onpopstate = a
                            }, 1)
                        }, !1), R = 0)
                    }
                    b[c] = j
                } else try {
                    try {
                        var k = u.create(b);
                        D(u.getPrototypeOf(k) === b ? k : b, c, d);
                        for (var l in b) "function" == typeof b[l] && (k[l] = b[l].bind(b));
                        try {
                            e.call(k, k, b)
                        } catch (a) {}
                        b = k
                    } catch (a) {
                        D(b.constructor.prototype, c, d)
                    }
                } catch (a) {
                    return !1
                }
            }
            return b
        }

        function e(a, b, c) {
            return c = c || {}, a = a === $ ? w : a, c.set = c.set || function(c) {
                a[b] = c
            }, c.get = c.get || function() {
                return a[b]
            }, c
        }

        function f(a, b, c) {
            a in V ? V[a].push(b) : arguments.length > 3 ? J(a, b, c, arguments[3]) : J(a, b, c)
        }

        function g(a, b, c) {
            var d = V[a];
            if (d) {
                for (var e = d.length; e--;)
                    if (d[e] === b) {
                        d.splice(e, 1);
                        break
                    }
            } else K(a, b, c)
        }

        function h(b, c) {
            var e = ("" + ("string" == typeof b ? b : b.type)).replace(/^on/, ""),
                f = V[e];
            if (f) {
                if (c = "string" == typeof b ? c : b, null == c.target)
                    for (var g = ["target", "currentTarget", "srcElement", "type"]; b = g.pop();) c = d(c, b, {
                        get: "type" === b ? function() {
                            return e
                        } : function() {
                            return r
                        }
                    });
                R && (("popstate" === e ? r.onpopstate : r.onhashchange) || a).call(r, c);
                for (var h = 0, i = f.length; h < i; h++) f[h].call(r, c);
                return !0
            }
            return L(b, c)
        }

        function i() {
            var a = s.createEvent ? s.createEvent("Event") : s.createEventObject();
            a.initEvent ? a.initEvent("popstate", !1, !1) : a.type = "popstate", a.state = y.state, h(a)
        }

        function j() {
            S && (S = !1, i())
        }

        function k(a, c, d, e) {
            if (B) P = w.href;
            else {
                0 === T && (T = 2);
                var f = b(c, 2 === T && ("" + c).indexOf("#") !== -1);
                f._relative !== b()._relative && (P = e, d ? w.replace("#" + f._special) : w.hash = f._special)
            }!C && a && (U[w.href] = a), S = !1
        }

        function l(a) {
            var c = P;
            if (P = w.href, c) {
                Q !== w.href && i(), a = a || r.event;
                var d = b(c, !0),
                    e = b();
                a.oldURL || (a.oldURL = d._href, a.newURL = e._href), d._hash !== e._hash && h(a)
            }
        }

        function m(a) {
            setTimeout(function() {
                J("popstate", function(a) {
                    Q = w.href, C || (a = d(a, "state", {
                        get: function() {
                            return y.state
                        }
                    })), h(a)
                }, !1)
            }, 0), !B && a !== !0 && "location" in y && (p(E.hash), j())
        }

        function n(a) {
            for (; a;) {
                if ("A" === a.nodeName) return a;
                a = a.parentNode
            }
        }

        function o(a) {
            var c = a || r.event,
                d = n(c.target || c.srcElement),
                e = "defaultPrevented" in c ? c.defaultPrevented : c.returnValue === !1;
            if (d && "A" === d.nodeName && !e) {
                var f = b(),
                    g = b(d.getAttribute("href", 2)),
                    h = f._href.split("#").shift() === g._href.split("#").shift();
                h && g._hash && (f._hash !== g._hash && (E.hash = g._hash), p(g._hash), c.preventDefault ? c.preventDefault() : c.returnValue = !1)
            }
        }

        function p(a) {
            var b = s.getElementById(a = (a || "").replace(/^#/, ""));
            if (b && b.id === a && "A" === b.nodeName) {
                var c = b.getBoundingClientRect();
                r.scrollTo(t.scrollLeft || 0, c.top + (t.scrollTop || 0) - (t.clientTop || 0))
            }
        }

        function q() {
            var a = s.getElementsByTagName("script"),
                f = (a[a.length - 1] || {}).src || "",
                g = f.indexOf("?") !== -1 ? f.split("?").pop() : "";
            g.replace(/(\w+)(?:=([^&]*))?/g, function(a, b, c) {
                M[b] = (c || "").replace(/^(0|false)$/, "")
            }), J(F + "hashchange", l, !1);
            var h = [$, E, X, r, Z, y];
            C && delete Z.state;
            for (var i = 0; i < h.length; i += 2)
                for (var j in h[i])
                    if (h[i].hasOwnProperty(j))
                        if ("function" == typeof h[i][j]) h[i + 1][j] = h[i][j];
                        else {
                            var k = e(h[i], j, h[i][j]);
                            if (!d(h[i + 1], j, k, function(a, b) {
                                    b === y && (r.history = y = h[i + 1] = a)
                                })) return K(F + "hashchange", l, !1), !1;
                            h[i + 1] === r && (V[j] = V[j.substr(2)] = [])
                        }
            return y.setup(), M.redirect && y.redirect(), M.init && (T = 1), !C && v && c(), B || s[G](F + "click", o, !1), "complete" === s.readyState ? m(!0) : (B || b()._relative === M.basepath || (S = !0), J(F + "load", m, !1)), !0
        }
        var r = ("object" == typeof window ? window : this) || {};
        if (!r.history || "emulate" in r.history) return r.history;
        var s = r.document,
            t = s.documentElement,
            u = r.Object,
            v = r.JSON,
            w = r.location,
            x = r.history,
            y = x,
            z = x.pushState,
            A = x.replaceState,
            B = !!z,
            C = "state" in x,
            D = u.defineProperty,
            E = d({}, "t") ? {} : s.createElement("a"),
            F = "",
            G = r.addEventListener ? "addEventListener" : (F = "on") && "attachEvent",
            H = r.removeEventListener ? "removeEventListener" : "detachEvent",
            I = r.dispatchEvent ? "dispatchEvent" : "fireEvent",
            J = r[G],
            K = r[H],
            L = r[I],
            M = {
                basepath: "/",
                redirect: 0,
                type: "/",
                init: 0
            },
            N = "__historyAPI__",
            O = s.createElement("a"),
            P = w.href,
            Q = "",
            R = 1,
            S = !1,
            T = 0,
            U = {},
            V = {},
            W = s.title,
            X = {
                onhashchange: null,
                onpopstate: null
            },
            Y = function(a, b) {
                var c = r.history !== x;
                c && (r.history = x), a.apply(x, b), c && (r.history = y)
            },
            Z = {
                setup: function(a, b, c) {
                    M.basepath = ("" + (null == a ? M.basepath : a)).replace(/(?:^|\/)[^\/]*$/, "/"), M.type = null == b ? M.type : b, M.redirect = null == c ? M.redirect : !!c
                },
                redirect: function(a, c) {
                    if (y.setup(c, a), c = M.basepath, r.top == r.self) {
                        var d = b(null, !1, !0)._relative,
                            e = w.pathname + w.search;
                        B ? (e = e.replace(/([^\/])$/, "$1/"), d != c && new RegExp("^" + c + "$", "i").test(e) && w.replace(d)) : e != c && (e = e.replace(/([^\/])\?/, "$1/?"), new RegExp("^" + c, "i").test(e) && w.replace(c + "#" + e.replace(new RegExp("^" + c, "i"), M.type) + w.hash))
                    }
                },
                pushState: function(a, b, c) {
                    var d = s.title;
                    null != W && (s.title = W), z && Y(z, arguments), k(a, c), s.title = d, W = b
                },
                replaceState: function(a, b, c) {
                    var d = s.title;
                    null != W && (s.title = W), delete U[w.href], A && Y(A, arguments), k(a, c, !0), s.title = d, W = b
                },
                location: {
                    set: function(a) {
                        0 === T && (T = 1), r.location = a
                    },
                    get: function() {
                        return 0 === T && (T = 1), B ? w : E
                    }
                },
                state: {
                    get: function() {
                        return U[w.href] || null
                    }
                }
            },
            $ = {
                assign: function(a) {
                    0 === ("" + a).indexOf("#") ? k(null, a) : w.assign(a)
                },
                reload: function() {
                    w.reload()
                },
                replace: function(a) {
                    0 === ("" + a).indexOf("#") ? k(null, a, !0) : w.replace(a)
                },
                toString: function() {
                    return this.href
                },
                href: {
                    get: function() {
                        return b()._href
                    }
                },
                protocol: null,
                host: null,
                hostname: null,
                port: null,
                pathname: {
                    get: function() {
                        return b()._pathname
                    }
                },
                search: {
                    get: function() {
                        return b()._search
                    }
                },
                hash: {
                    set: function(a) {
                        k(null, ("" + a).replace(/^(#|)/, "#"), !1, P)
                    },
                    get: function() {
                        return b()._hash
                    }
                }
            };
        return q() ? (y.emulate = !B, r[G] = f, r[H] = g, r[I] = h, y) : void 0
    }),
    function(a, b) {
        "object" == typeof exports && "object" == typeof module ? module.exports = b() : "function" == typeof define && define.amd ? define("Handlebars", b) : "object" == typeof exports && (exports.Handlebars = b()), a.Handlebars = b()
    }(this, function() {
        return function(a) {
            function b(d) {
                if (c[d]) return c[d].exports;
                var e = c[d] = {
                    exports: {},
                    id: d,
                    loaded: !1
                };
                return a[d].call(e.exports, e, e.exports, b), e.loaded = !0, e.exports
            }
            var c = {};
            return b.m = a, b.c = c, b.p = "", b(0)
        }([function(a, b, c) {
            "use strict";

            function d() {
                var a = new g.HandlebarsEnvironment;
                return m.extend(a, g), a.SafeString = i.default, a.Exception = k.default, a.Utils = m, a.escapeExpression = m.escapeExpression, a.VM = o, a.template = function(b) {
                    return o.template(b, a)
                }, a
            }
            var e = c(7).default;
            b.__esModule = !0;
            var f = c(1),
                g = e(f),
                h = c(2),
                i = e(h),
                j = c(3),
                k = e(j),
                l = c(4),
                m = e(l),
                n = c(5),
                o = e(n),
                p = c(6),
                q = e(p),
                r = d();
            r.create = d, q.default(r), r.default = r, b.default = r, a.exports = b.default
        }, function(a, b, c) {
            "use strict";

            function d(a, b) {
                this.helpers = a || {}, this.partials = b || {}, e(this)
            }

            function e(a) {
                a.registerHelper("helperMissing", function() {
                    if (1 !== arguments.length) throw new k.default('Missing helper: "' + arguments[arguments.length - 1].name + '"')
                }), a.registerHelper("blockHelperMissing", function(b, c) {
                    var d = c.inverse,
                        e = c.fn;
                    if (b === !0) return e(this);
                    if (b === !1 || null == b) return d(this);
                    if (o(b)) return b.length > 0 ? (c.ids && (c.ids = [c.name]), a.helpers.each(b, c)) : d(this);
                    if (c.data && c.ids) {
                        var g = f(c.data);
                        g.contextPath = i.appendContextPath(c.data.contextPath, c.name), c = {
                            data: g
                        }
                    }
                    return e(b, c)
                }), a.registerHelper("each", function(a, b) {
                    function c(b, c, e) {
                        j && (j.key = b, j.index = c, j.first = 0 === c, j.last = !!e, l && (j.contextPath = l + b)), h += d(a[b], {
                            data: j,
                            blockParams: i.blockParams([a[b], b], [l + b, null])
                        })
                    }
                    if (!b) throw new k.default("Must pass iterator to #each");
                    var d = b.fn,
                        e = b.inverse,
                        g = 0,
                        h = "",
                        j = void 0,
                        l = void 0;
                    if (b.data && b.ids && (l = i.appendContextPath(b.data.contextPath, b.ids[0]) + "."), p(a) && (a = a.call(this)), b.data && (j = f(b.data)), a && "object" == typeof a)
                        if (o(a))
                            for (var m = a.length; g < m; g++) c(g, g, g === a.length - 1);
                        else {
                            var n = void 0;
                            for (var q in a) a.hasOwnProperty(q) && (n && c(n, g - 1), n = q, g++);
                            n && c(n, g - 1, !0)
                        }
                    return 0 === g && (h = e(this)), h
                }), a.registerHelper("if", function(a, b) {
                    return p(a) && (a = a.call(this)), !b.hash.includeZero && !a || i.isEmpty(a) ? b.inverse(this) : b.fn(this)
                }), a.registerHelper("unless", function(b, c) {
                    return a.helpers.if.call(this, b, {
                        fn: c.inverse,
                        inverse: c.fn,
                        hash: c.hash
                    })
                }), a.registerHelper("with", function(a, b) {
                    p(a) && (a = a.call(this));
                    var c = b.fn;
                    if (i.isEmpty(a)) return b.inverse(this);
                    if (b.data && b.ids) {
                        var d = f(b.data);
                        d.contextPath = i.appendContextPath(b.data.contextPath, b.ids[0]), b = {
                            data: d
                        }
                    }
                    return c(a, b)
                }), a.registerHelper("log", function(b, c) {
                    var d = c.data && null != c.data.level ? parseInt(c.data.level, 10) : 1;
                    a.log(d, b)
                }), a.registerHelper("lookup", function(a, b) {
                    return a && a[b]
                })
            }

            function f(a) {
                var b = i.extend({}, a);
                return b._parent = a, b
            }
            var g = c(7).default;
            b.__esModule = !0, b.HandlebarsEnvironment = d, b.createFrame = f;
            var h = c(4),
                i = g(h),
                j = c(3),
                k = g(j),
                l = "3.0.1";
            b.VERSION = l;
            var m = 6;
            b.COMPILER_REVISION = m;
            var n = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: "== 1.x.x",
                5: "== 2.0.0-alpha.x",
                6: ">= 2.0.0-beta.1"
            };
            b.REVISION_CHANGES = n;
            var o = i.isArray,
                p = i.isFunction,
                q = i.toString,
                r = "[object Object]";
            d.prototype = {
                constructor: d,
                logger: s,
                log: t,
                registerHelper: function(a, b) {
                    if (q.call(a) === r) {
                        if (b) throw new k.default("Arg not supported with multiple helpers");
                        i.extend(this.helpers, a)
                    } else this.helpers[a] = b
                },
                unregisterHelper: function(a) {
                    delete this.helpers[a]
                },
                registerPartial: function(a, b) {
                    if (q.call(a) === r) i.extend(this.partials, a);
                    else {
                        if ("undefined" == typeof b) throw new k.default("Attempting to register a partial as undefined");
                        this.partials[a] = b
                    }
                },
                unregisterPartial: function(a) {
                    delete this.partials[a]
                }
            };
            var s = {
                methodMap: {
                    0: "debug",
                    1: "info",
                    2: "warn",
                    3: "error"
                },
                DEBUG: 0,
                INFO: 1,
                WARN: 2,
                ERROR: 3,
                level: 1,
                log: function(a, b) {
                    if ("undefined" != typeof console && s.level <= a) {
                        var c = s.methodMap[a];
                        (console[c] || console.log).call(console, b)
                    }
                }
            };
            b.logger = s;
            var t = s.log;
            b.log = t
        }, function(a, b, c) {
            "use strict";

            function d(a) {
                this.string = a
            }
            b.__esModule = !0, d.prototype.toString = d.prototype.toHTML = function() {
                return "" + this.string
            }, b.default = d, a.exports = b.default
        }, function(a, b, c) {
            "use strict";

            function d(a, b) {
                var c = b && b.loc,
                    f = void 0,
                    g = void 0;
                c && (f = c.start.line, g = c.start.column, a += " - " + f + ":" + g);
                for (var h = Error.prototype.constructor.call(this, a), i = 0; i < e.length; i++) this[e[i]] = h[e[i]];
                Error.captureStackTrace && Error.captureStackTrace(this, d), c && (this.lineNumber = f, this.column = g)
            }
            b.__esModule = !0;
            var e = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"];
            d.prototype = new Error, b.default = d, a.exports = b.default
        }, function(a, b, c) {
            "use strict";

            function d(a) {
                return k[a]
            }

            function e(a) {
                for (var b = 1; b < arguments.length; b++)
                    for (var c in arguments[b]) Object.prototype.hasOwnProperty.call(arguments[b], c) && (a[c] = arguments[b][c]);
                return a
            }

            function f(a, b) {
                for (var c = 0, d = a.length; c < d; c++)
                    if (a[c] === b) return c;
                return -1
            }

            function g(a) {
                if ("string" != typeof a) {
                    if (a && a.toHTML) return a.toHTML();
                    if (null == a) return "";
                    if (!a) return a + "";
                    a = "" + a
                }
                return m.test(a) ? a.replace(l, d) : a
            }

            function h(a) {
                return !a && 0 !== a || !(!p(a) || 0 !== a.length)
            }

            function i(a, b) {
                return a.path = b, a
            }

            function j(a, b) {
                return (a ? a + "." : "") + b
            }
            b.__esModule = !0, b.extend = e, b.indexOf = f, b.escapeExpression = g, b.isEmpty = h, b.blockParams = i, b.appendContextPath = j;
            var k = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#x27;",
                    "`": "&#x60;"
                },
                l = /[&<>"'`]/g,
                m = /[&<>"'`]/,
                n = Object.prototype.toString;
            b.toString = n;
            var o = function(a) {
                return "function" == typeof a
            };
            o(/x/) && (b.isFunction = o = function(a) {
                return "function" == typeof a && "[object Function]" === n.call(a)
            });
            var o;
            b.isFunction = o;
            var p = Array.isArray || function(a) {
                return !(!a || "object" != typeof a) && "[object Array]" === n.call(a)
            };
            b.isArray = p
        }, function(a, b, c) {
            "use strict";

            function d(a) {
                var b = a && a[0] || 1,
                    c = p.COMPILER_REVISION;
                if (b !== c) {
                    if (b < c) {
                        var d = p.REVISION_CHANGES[c],
                            e = p.REVISION_CHANGES[b];
                        throw new o.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + d + ") or downgrade your runtime to an older version (" + e + ").")
                    }
                    throw new o.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + a[1] + ").")
                }
            }

            function e(a, b) {
                function c(c, d, e) {
                    e.hash && (d = m.extend({}, d, e.hash)), c = b.VM.resolvePartial.call(this, c, d, e);
                    var f = b.VM.invokePartial.call(this, c, d, e);
                    if (null == f && b.compile && (e.partials[e.name] = b.compile(c, a.compilerOptions, b), f = e.partials[e.name](d, e)), null != f) {
                        if (e.indent) {
                            for (var g = f.split("\n"), h = 0, i = g.length; h < i && (g[h] || h + 1 !== i); h++) g[h] = e.indent + g[h];
                            f = g.join("\n")
                        }
                        return f
                    }
                    throw new o.default("The partial " + e.name + " could not be compiled when running in runtime-only mode")
                }

                function d(b) {
                    var c = void 0 === arguments[1] ? {} : arguments[1],
                        f = c.data;
                    d._setup(c), !c.partial && a.useData && (f = j(b, f));
                    var g = void 0,
                        h = a.useBlockParams ? [] : void 0;
                    return a.useDepths && (g = c.depths ? [b].concat(c.depths) : [b]), a.main.call(e, b, e.helpers, e.partials, f, h, g)
                }
                if (!b) throw new o.default("No environment passed to template");
                if (!a || !a.main) throw new o.default("Unknown template object: " + typeof a);
                b.VM.checkRevision(a.compiler);
                var e = {
                    strict: function(a, b) {
                        if (!(b in a)) throw new o.default('"' + b + '" not defined in ' + a);
                        return a[b]
                    },
                    lookup: function(a, b) {
                        for (var c = a.length, d = 0; d < c; d++)
                            if (a[d] && null != a[d][b]) return a[d][b]
                    },
                    lambda: function(a, b) {
                        return "function" == typeof a ? a.call(b) : a
                    },
                    escapeExpression: m.escapeExpression,
                    invokePartial: c,
                    fn: function(b) {
                        return a[b]
                    },
                    programs: [],
                    program: function(a, b, c, d, e) {
                        var g = this.programs[a],
                            h = this.fn(a);
                        return b || e || d || c ? g = f(this, a, h, b, c, d, e) : g || (g = this.programs[a] = f(this, a, h)), g
                    },
                    data: function(a, b) {
                        for (; a && b--;) a = a._parent;
                        return a
                    },
                    merge: function(a, b) {
                        var c = a || b;
                        return a && b && a !== b && (c = m.extend({}, b, a)), c
                    },
                    noop: b.VM.noop,
                    compilerInfo: a.compiler
                };
                return d.isTop = !0, d._setup = function(c) {
                    c.partial ? (e.helpers = c.helpers, e.partials = c.partials) : (e.helpers = e.merge(c.helpers, b.helpers), a.usePartial && (e.partials = e.merge(c.partials, b.partials)))
                }, d._child = function(b, c, d, g) {
                    if (a.useBlockParams && !d) throw new o.default("must pass block params");
                    if (a.useDepths && !g) throw new o.default("must pass parent depths");
                    return f(e, b, a[b], c, 0, d, g)
                }, d
            }

            function f(a, b, c, d, e, f, g) {
                function h(b) {
                    var e = void 0 === arguments[1] ? {} : arguments[1];
                    return c.call(a, b, a.helpers, a.partials, e.data || d, f && [e.blockParams].concat(f), g && [b].concat(g))
                }
                return h.program = b, h.depth = g ? g.length : 0, h.blockParams = e || 0, h
            }

            function g(a, b, c) {
                return a ? a.call || c.name || (c.name = a, a = c.partials[a]) : a = c.partials[c.name], a
            }

            function h(a, b, c) {
                if (c.partial = !0, void 0 === a) throw new o.default("The partial " + c.name + " could not be found");
                if (a instanceof Function) return a(b, c)
            }

            function i() {
                return ""
            }

            function j(a, b) {
                return b && "root" in b || (b = b ? p.createFrame(b) : {}, b.root = a), b
            }
            var k = c(7).default;
            b.__esModule = !0, b.checkRevision = d, b.template = e, b.wrapProgram = f, b.resolvePartial = g, b.invokePartial = h, b.noop = i;
            var l = c(4),
                m = k(l),
                n = c(3),
                o = k(n),
                p = c(1)
        }, function(a, b, c) {
            (function(c) {
                "use strict";
                b.__esModule = !0, b.default = function(a) {
                    var b = "undefined" != typeof c ? c : window,
                        d = b.Handlebars;
                    a.noConflict = function() {
                        b.Handlebars === a && (b.Handlebars = d)
                    }
                }, a.exports = b.default
            }).call(b, function() {
                return this
            }())
        }, function(a, b, c) {
            "use strict";
            b.default = function(a) {
                return a && a.__esModule ? a : {
                    default: a
                }
            }, b.__esModule = !0
        }])
    }),
    function(a, b, c, d) {
        "use strict";

        function e(a, b, c) {
            return setTimeout(k(a, c), b)
        }

        function f(a, b, c) {
            return !!Array.isArray(a) && (g(a, c[b], c), !0)
        }

        function g(a, b, c) {
            var e;
            if (a)
                if (a.forEach) a.forEach(b, c);
                else if (a.length !== d)
                for (e = 0; e < a.length;) b.call(c, a[e], e, a), e++;
            else
                for (e in a) a.hasOwnProperty(e) && b.call(c, a[e], e, a)
        }

        function h(a, b, c) {
            for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
            return a
        }

        function i(a, b) {
            return h(a, b, !0)
        }

        function j(a, b, c) {
            var d, e = b.prototype;
            d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c)
        }

        function k(a, b) {
            return function() {
                return a.apply(b, arguments)
            }
        }

        function l(a, b) {
            return typeof a == ka ? a.apply(b ? b[0] || d : d, b) : a
        }

        function m(a, b) {
            return a === d ? b : a
        }

        function n(a, b, c) {
            g(r(b), function(b) {
                a.addEventListener(b, c, !1)
            })
        }

        function o(a, b, c) {
            g(r(b), function(b) {
                a.removeEventListener(b, c, !1)
            })
        }

        function p(a, b) {
            for (; a;) {
                if (a == b) return !0;
                a = a.parentNode
            }
            return !1
        }

        function q(a, b) {
            return a.indexOf(b) > -1
        }

        function r(a) {
            return a.trim().split(/\s+/g)
        }

        function s(a, b, c) {
            if (a.indexOf && !c) return a.indexOf(b);
            for (var d = 0; d < a.length;) {
                if (c && a[d][c] == b || !c && a[d] === b) return d;
                d++
            }
            return -1
        }

        function t(a) {
            return Array.prototype.slice.call(a, 0)
        }

        function u(a, b, c) {
            for (var d = [], e = [], f = 0; f < a.length;) {
                var g = b ? a[f][b] : a[f];
                s(e, g) < 0 && d.push(a[f]), e[f] = g, f++
            }
            return c && (d = b ? d.sort(function(a, c) {
                return a[b] > c[b]
            }) : d.sort()), d
        }

        function v(a, b) {
            for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ia.length;) {
                if (c = ia[g], e = c ? c + f : b, e in a) return e;
                g++
            }
            return d
        }

        function w() {
            return oa++
        }

        function x(a) {
            var b = a.ownerDocument;
            return b.defaultView || b.parentWindow
        }

        function y(a, b) {
            var c = this;
            this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function(b) {
                l(a.options.enable, [a]) && c.handler(b)
            }, this.init()
        }

        function z(a) {
            var b, c = a.options.inputClass;
            return new(b = c ? c : ra ? N : sa ? Q : qa ? S : M)(a, A)
        }

        function A(a, b, c) {
            var d = c.pointers.length,
                e = c.changedPointers.length,
                f = b & ya && d - e === 0,
                g = b & (Aa | Ba) && d - e === 0;
            c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
        }

        function B(a, b) {
            var c = a.session,
                d = b.pointers,
                e = d.length;
            c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
            var f = c.firstInput,
                g = c.firstMultiple,
                h = g ? g.center : f.center,
                i = b.center = F(d);
            b.timeStamp = na(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
            var j = a.element;
            p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j
        }

        function C(a, b) {
            var c = b.center,
                d = a.offsetDelta || {},
                e = a.prevDelta || {},
                f = a.prevInput || {};
            b.eventType !== ya && f.eventType !== Aa || (e = a.prevDelta = {
                x: f.deltaX || 0,
                y: f.deltaY || 0
            }, d = a.offsetDelta = {
                x: c.x,
                y: c.y
            }), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
        }

        function D(a, b) {
            var c, e, f, g, h = a.lastInterval || b,
                i = b.timeStamp - h.timeStamp;
            if (b.eventType != Ba && (i > xa || h.velocity === d)) {
                var j = h.deltaX - b.deltaX,
                    k = h.deltaY - b.deltaY,
                    l = G(i, j, k);
                e = l.x, f = l.y, c = ma(l.x) > ma(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b
            } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
            b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
        }

        function E(a) {
            for (var b = [], c = 0; c < a.pointers.length;) b[c] = {
                clientX: la(a.pointers[c].clientX),
                clientY: la(a.pointers[c].clientY)
            }, c++;
            return {
                timeStamp: na(),
                pointers: b,
                center: F(b),
                deltaX: a.deltaX,
                deltaY: a.deltaY
            }
        }

        function F(a) {
            var b = a.length;
            if (1 === b) return {
                x: la(a[0].clientX),
                y: la(a[0].clientY)
            };
            for (var c = 0, d = 0, e = 0; e < b;) c += a[e].clientX, d += a[e].clientY, e++;
            return {
                x: la(c / b),
                y: la(d / b)
            }
        }

        function G(a, b, c) {
            return {
                x: b / a || 0,
                y: c / a || 0
            }
        }

        function H(a, b) {
            return a === b ? Ca : ma(a) >= ma(b) ? a > 0 ? Da : Ea : b > 0 ? Fa : Ga
        }

        function I(a, b, c) {
            c || (c = Ka);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return Math.sqrt(d * d + e * e)
        }

        function J(a, b, c) {
            c || (c = Ka);
            var d = b[c[0]] - a[c[0]],
                e = b[c[1]] - a[c[1]];
            return 180 * Math.atan2(e, d) / Math.PI
        }

        function K(a, b) {
            return J(b[1], b[0], La) - J(a[1], a[0], La)
        }

        function L(a, b) {
            return I(b[0], b[1], La) / I(a[0], a[1], La)
        }

        function M() {
            this.evEl = Na, this.evWin = Oa, this.allow = !0, this.pressed = !1, y.apply(this, arguments)
        }

        function N() {
            this.evEl = Ra, this.evWin = Sa, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
        }

        function O() {
            this.evTarget = Ua, this.evWin = Va, this.started = !1, y.apply(this, arguments)
        }

        function P(a, b) {
            var c = t(a.touches),
                d = t(a.changedTouches);
            return b & (Aa | Ba) && (c = u(c.concat(d), "identifier", !0)), [c, d]
        }

        function Q() {
            this.evTarget = Xa, this.targetIds = {}, y.apply(this, arguments)
        }

        function R(a, b) {
            var c = t(a.touches),
                d = this.targetIds;
            if (b & (ya | za) && 1 === c.length) return d[c[0].identifier] = !0, [c, c];
            var e, f, g = t(a.changedTouches),
                h = [],
                i = this.target;
            if (f = c.filter(function(a) {
                    return p(a.target, i)
                }), b === ya)
                for (e = 0; e < f.length;) d[f[e].identifier] = !0, e++;
            for (e = 0; e < g.length;) d[g[e].identifier] && h.push(g[e]), b & (Aa | Ba) && delete d[g[e].identifier], e++;
            return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0
        }

        function S() {
            y.apply(this, arguments);
            var a = k(this.handler, this);
            this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a)
        }

        function T(a, b) {
            this.manager = a, this.set(b)
        }

        function U(a) {
            if (q(a, bb)) return bb;
            var b = q(a, cb),
                c = q(a, db);
            return b && c ? cb + " " + db : b || c ? b ? cb : db : q(a, ab) ? ab : _a
        }

        function V(a) {
            this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = eb, this.simultaneous = {}, this.requireFail = []
        }

        function W(a) {
            return a & jb ? "cancel" : a & hb ? "end" : a & gb ? "move" : a & fb ? "start" : ""
        }

        function X(a) {
            return a == Ga ? "down" : a == Fa ? "up" : a == Da ? "left" : a == Ea ? "right" : ""
        }

        function Y(a, b) {
            var c = b.manager;
            return c ? c.get(a) : a
        }

        function Z() {
            V.apply(this, arguments)
        }

        function $() {
            Z.apply(this, arguments), this.pX = null, this.pY = null
        }

        function _() {
            Z.apply(this, arguments)
        }

        function aa() {
            V.apply(this, arguments), this._timer = null, this._input = null
        }

        function ba() {
            Z.apply(this, arguments)
        }

        function ca() {
            Z.apply(this, arguments)
        }

        function da() {
            V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
        }

        function ea(a, b) {
            return b = b || {}, b.recognizers = m(b.recognizers, ea.defaults.preset), new fa(a, b)
        }

        function fa(a, b) {
            b = b || {}, this.options = i(b, ea.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), ga(this, !0), g(b.recognizers, function(a) {
                var b = this.add(new a[0](a[1]));
                a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
            }, this)
        }

        function ga(a, b) {
            var c = a.element;
            g(a.options.cssProps, function(a, d) {
                c.style[v(c.style, d)] = b ? a : ""
            })
        }

        function ha(a, c) {
            var d = b.createEvent("Event");
            d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
        }
        var ia = ["", "webkit", "moz", "MS", "ms", "o"],
            ja = b.createElement("div"),
            ka = "function",
            la = Math.round,
            ma = Math.abs,
            na = Date.now,
            oa = 1,
            pa = /mobile|tablet|ip(ad|hone|od)|android/i,
            qa = "ontouchstart" in a,
            ra = v(a, "PointerEvent") !== d,
            sa = qa && pa.test(navigator.userAgent),
            ta = "touch",
            ua = "pen",
            va = "mouse",
            wa = "kinect",
            xa = 25,
            ya = 1,
            za = 2,
            Aa = 4,
            Ba = 8,
            Ca = 1,
            Da = 2,
            Ea = 4,
            Fa = 8,
            Ga = 16,
            Ha = Da | Ea,
            Ia = Fa | Ga,
            Ja = Ha | Ia,
            Ka = ["x", "y"],
            La = ["clientX", "clientY"];
        y.prototype = {
            handler: function() {},
            init: function() {
                this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler)
            },
            destroy: function() {
                this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler)
            }
        };
        var Ma = {
                mousedown: ya,
                mousemove: za,
                mouseup: Aa
            },
            Na = "mousedown",
            Oa = "mousemove mouseup";
        j(M, y, {
            handler: function(a) {
                var b = Ma[a.type];
                b & ya && 0 === a.button && (this.pressed = !0), b & za && 1 !== a.which && (b = Aa), this.pressed && this.allow && (b & Aa && (this.pressed = !1), this.callback(this.manager, b, {
                    pointers: [a],
                    changedPointers: [a],
                    pointerType: va,
                    srcEvent: a
                }))
            }
        });
        var Pa = {
                pointerdown: ya,
                pointermove: za,
                pointerup: Aa,
                pointercancel: Ba,
                pointerout: Ba
            },
            Qa = {
                2: ta,
                3: ua,
                4: va,
                5: wa
            },
            Ra = "pointerdown",
            Sa = "pointermove pointerup pointercancel";
        a.MSPointerEvent && (Ra = "MSPointerDown", Sa = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, {
            handler: function(a) {
                var b = this.store,
                    c = !1,
                    d = a.type.toLowerCase().replace("ms", ""),
                    e = Pa[d],
                    f = Qa[a.pointerType] || a.pointerType,
                    g = f == ta,
                    h = s(b, a.pointerId, "pointerId");
                e & ya && (0 === a.button || g) ? h < 0 && (b.push(a), h = b.length - 1) : e & (Aa | Ba) && (c = !0), h < 0 || (b[h] = a, this.callback(this.manager, e, {
                    pointers: b,
                    changedPointers: [a],
                    pointerType: f,
                    srcEvent: a
                }), c && b.splice(h, 1))
            }
        });
        var Ta = {
                touchstart: ya,
                touchmove: za,
                touchend: Aa,
                touchcancel: Ba
            },
            Ua = "touchstart",
            Va = "touchstart touchmove touchend touchcancel";
        j(O, y, {
            handler: function(a) {
                var b = Ta[a.type];
                if (b === ya && (this.started = !0), this.started) {
                    var c = P.call(this, a, b);
                    b & (Aa | Ba) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {
                        pointers: c[0],
                        changedPointers: c[1],
                        pointerType: ta,
                        srcEvent: a
                    })
                }
            }
        });
        var Wa = {
                touchstart: ya,
                touchmove: za,
                touchend: Aa,
                touchcancel: Ba
            },
            Xa = "touchstart touchmove touchend touchcancel";
        j(Q, y, {
            handler: function(a) {
                var b = Wa[a.type],
                    c = R.call(this, a, b);
                c && this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: ta,
                    srcEvent: a
                })
            }
        }), j(S, y, {
            handler: function(a, b, c) {
                var d = c.pointerType == ta,
                    e = c.pointerType == va;
                if (d) this.mouse.allow = !1;
                else if (e && !this.mouse.allow) return;
                b & (Aa | Ba) && (this.mouse.allow = !0), this.callback(a, b, c)
            },
            destroy: function() {
                this.touch.destroy(), this.mouse.destroy()
            }
        });
        var Ya = v(ja.style, "touchAction"),
            Za = Ya !== d,
            $a = "compute",
            _a = "auto",
            ab = "manipulation",
            bb = "none",
            cb = "pan-x",
            db = "pan-y";
        T.prototype = {
            set: function(a) {
                a == $a && (a = this.compute()), Za && (this.manager.element.style[Ya] = a), this.actions = a.toLowerCase().trim()
            },
            update: function() {
                this.set(this.manager.options.touchAction)
            },
            compute: function() {
                var a = [];
                return g(this.manager.recognizers, function(b) {
                    l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
                }), U(a.join(" "))
            },
            preventDefaults: function(a) {
                if (!Za) {
                    var b = a.srcEvent,
                        c = a.offsetDirection;
                    if (this.manager.session.prevented) return void b.preventDefault();
                    var d = this.actions,
                        e = q(d, bb),
                        f = q(d, db),
                        g = q(d, cb);
                    return e || f && c & Ha || g && c & Ia ? this.preventSrc(b) : void 0
                }
            },
            preventSrc: function(a) {
                this.manager.session.prevented = !0, a.preventDefault()
            }
        };
        var eb = 1,
            fb = 2,
            gb = 4,
            hb = 8,
            ib = hb,
            jb = 16,
            kb = 32;
        V.prototype = {
            defaults: {},
            set: function(a) {
                return h(this.options, a), this.manager && this.manager.touchAction.update(), this
            },
            recognizeWith: function(a) {
                if (f(a, "recognizeWith", this)) return this;
                var b = this.simultaneous;
                return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
            },
            dropRecognizeWith: function(a) {
                return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this)
            },
            requireFailure: function(a) {
                if (f(a, "requireFailure", this)) return this;
                var b = this.requireFail;
                return a = Y(a, this), s(b, a) === -1 && (b.push(a), a.requireFailure(this)), this
            },
            dropRequireFailure: function(a) {
                if (f(a, "dropRequireFailure", this)) return this;
                a = Y(a, this);
                var b = s(this.requireFail, a);
                return b > -1 && this.requireFail.splice(b, 1), this
            },
            hasRequireFailures: function() {
                return this.requireFail.length > 0
            },
            canRecognizeWith: function(a) {
                return !!this.simultaneous[a.id]
            },
            emit: function(a) {
                function b(b) {
                    c.manager.emit(c.options.event + (b ? W(d) : ""), a)
                }
                var c = this,
                    d = this.state;
                d < hb && b(!0), b(), d >= hb && b(!0)
            },
            tryEmit: function(a) {
                return this.canEmit() ? this.emit(a) : void(this.state = kb)
            },
            canEmit: function() {
                for (var a = 0; a < this.requireFail.length;) {
                    if (!(this.requireFail[a].state & (kb | eb))) return !1;
                    a++
                }
                return !0
            },
            recognize: function(a) {
                var b = h({}, a);
                return l(this.options.enable, [this, b]) ? (this.state & (ib | jb | kb) && (this.state = eb), this.state = this.process(b), void(this.state & (fb | gb | hb | jb) && this.tryEmit(b))) : (this.reset(), void(this.state = kb))
            },
            process: function(a) {},
            getTouchAction: function() {},
            reset: function() {}
        }, j(Z, V, {
            defaults: {
                pointers: 1
            },
            attrTest: function(a) {
                var b = this.options.pointers;
                return 0 === b || a.pointers.length === b
            },
            process: function(a) {
                var b = this.state,
                    c = a.eventType,
                    d = b & (fb | gb),
                    e = this.attrTest(a);
                return d && (c & Ba || !e) ? b | jb : d || e ? c & Aa ? b | hb : b & fb ? b | gb : fb : kb
            }
        }), j($, Z, {
            defaults: {
                event: "pan",
                threshold: 10,
                pointers: 1,
                direction: Ja
            },
            getTouchAction: function() {
                var a = this.options.direction,
                    b = [];
                return a & Ha && b.push(db), a & Ia && b.push(cb), b
            },
            directionTest: function(a) {
                var b = this.options,
                    c = !0,
                    d = a.distance,
                    e = a.direction,
                    f = a.deltaX,
                    g = a.deltaY;
                return e & b.direction || (b.direction & Ha ? (e = 0 === f ? Ca : f < 0 ? Da : Ea, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Ca : g < 0 ? Fa : Ga, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
            },
            attrTest: function(a) {
                return Z.prototype.attrTest.call(this, a) && (this.state & fb || !(this.state & fb) && this.directionTest(a))
            },
            emit: function(a) {
                this.pX = a.deltaX, this.pY = a.deltaY;
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a)
            }
        }), j(_, Z, {
            defaults: {
                event: "pinch",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [bb]
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fb)
            },
            emit: function(a) {
                if (this._super.emit.call(this, a), 1 !== a.scale) {
                    var b = a.scale < 1 ? "in" : "out";
                    this.manager.emit(this.options.event + b, a)
                }
            }
        }), j(aa, V, {
            defaults: {
                event: "press",
                pointers: 1,
                time: 500,
                threshold: 5
            },
            getTouchAction: function() {
                return [_a]
            },
            process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime > b.time;
                if (this._input = a, !d || !c || a.eventType & (Aa | Ba) && !f) this.reset();
                else if (a.eventType & ya) this.reset(), this._timer = e(function() {
                    this.state = ib, this.tryEmit()
                }, b.time, this);
                else if (a.eventType & Aa) return ib;
                return kb
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function(a) {
                this.state === ib && (a && a.eventType & Aa ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = na(), this.manager.emit(this.options.event, this._input)))
            }
        }), j(ba, Z, {
            defaults: {
                event: "rotate",
                threshold: 0,
                pointers: 2
            },
            getTouchAction: function() {
                return [bb]
            },
            attrTest: function(a) {
                return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fb)
            }
        }), j(ca, Z, {
            defaults: {
                event: "swipe",
                threshold: 10,
                velocity: .65,
                direction: Ha | Ia,
                pointers: 1
            },
            getTouchAction: function() {
                return $.prototype.getTouchAction.call(this)
            },
            attrTest: function(a) {
                var b, c = this.options.direction;
                return c & (Ha | Ia) ? b = a.velocity : c & Ha ? b = a.velocityX : c & Ia && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && ma(b) > this.options.velocity && a.eventType & Aa
            },
            emit: function(a) {
                var b = X(a.direction);
                b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
            }
        }), j(da, V, {
            defaults: {
                event: "tap",
                pointers: 1,
                taps: 1,
                interval: 300,
                time: 250,
                threshold: 2,
                posThreshold: 10
            },
            getTouchAction: function() {
                return [ab]
            },
            process: function(a) {
                var b = this.options,
                    c = a.pointers.length === b.pointers,
                    d = a.distance < b.threshold,
                    f = a.deltaTime < b.time;
                if (this.reset(), a.eventType & ya && 0 === this.count) return this.failTimeout();
                if (d && f && c) {
                    if (a.eventType != Aa) return this.failTimeout();
                    var g = !this.pTime || a.timeStamp - this.pTime < b.interval,
                        h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                    this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
                    var i = this.count % b.taps;
                    if (0 === i) return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = ib, this.tryEmit()
                    }, b.interval, this), fb) : ib
                }
                return kb
            },
            failTimeout: function() {
                return this._timer = e(function() {
                    this.state = kb
                }, this.options.interval, this), kb
            },
            reset: function() {
                clearTimeout(this._timer)
            },
            emit: function() {
                this.state == ib && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
            }
        }), ea.VERSION = "2.0.4", ea.defaults = {
            domEvents: !1,
            touchAction: $a,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [
                [ba, {
                    enable: !1
                }],
                [_, {
                        enable: !1
                    },
                    ["rotate"]
                ],
                [ca, {
                    direction: Ha
                }],
                [$, {
                        direction: Ha
                    },
                    ["swipe"]
                ],
                [da],
                [da, {
                        event: "doubletap",
                        taps: 2
                    },
                    ["tap"]
                ],
                [aa]
            ],
            cssProps: {
                userSelect: "none",
                touchSelect: "none",
                touchCallout: "none",
                contentZooming: "none",
                userDrag: "none",
                tapHighlightColor: "rgba(0,0,0,0)"
            }
        };
        var lb = 1,
            mb = 2;
        fa.prototype = {
            set: function(a) {
                return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
            },
            stop: function(a) {
                this.session.stopped = a ? mb : lb
            },
            recognize: function(a) {
                var b = this.session;
                if (!b.stopped) {
                    this.touchAction.preventDefaults(a);
                    var c, d = this.recognizers,
                        e = b.curRecognizer;
                    (!e || e && e.state & ib) && (e = b.curRecognizer = null);
                    for (var f = 0; f < d.length;) c = d[f], b.stopped === mb || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fb | gb | hb) && (e = b.curRecognizer = c), f++
                }
            },
            get: function(a) {
                if (a instanceof V) return a;
                for (var b = this.recognizers, c = 0; c < b.length; c++)
                    if (b[c].options.event == a) return b[c];
                return null
            },
            add: function(a) {
                if (f(a, "add", this)) return this;
                var b = this.get(a.options.event);
                return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
            },
            remove: function(a) {
                if (f(a, "remove", this)) return this;
                var b = this.recognizers;
                return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this
            },
            on: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) {
                    c[a] = c[a] || [], c[a].push(b)
                }), this
            },
            off: function(a, b) {
                var c = this.handlers;
                return g(r(a), function(a) {
                    b ? c[a].splice(s(c[a], b), 1) : delete c[a]
                }), this
            },
            emit: function(a, b) {
                this.options.domEvents && ha(a, b);
                var c = this.handlers[a] && this.handlers[a].slice();
                if (c && c.length) {
                    b.type = a, b.preventDefault = function() {
                        b.srcEvent.preventDefault()
                    };
                    for (var d = 0; d < c.length;) c[d](b), d++
                }
            },
            destroy: function() {
                this.element && ga(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
            }
        }, h(ea, {
            INPUT_START: ya,
            INPUT_MOVE: za,
            INPUT_END: Aa,
            INPUT_CANCEL: Ba,
            STATE_POSSIBLE: eb,
            STATE_BEGAN: fb,
            STATE_CHANGED: gb,
            STATE_ENDED: hb,
            STATE_RECOGNIZED: ib,
            STATE_CANCELLED: jb,
            STATE_FAILED: kb,
            DIRECTION_NONE: Ca,
            DIRECTION_LEFT: Da,
            DIRECTION_RIGHT: Ea,
            DIRECTION_UP: Fa,
            DIRECTION_DOWN: Ga,
            DIRECTION_HORIZONTAL: Ha,
            DIRECTION_VERTICAL: Ia,
            DIRECTION_ALL: Ja,
            Manager: fa,
            Input: y,
            TouchAction: T,
            TouchInput: Q,
            MouseInput: M,
            PointerEventInput: N,
            TouchMouseInput: S,
            SingleTouchInput: O,
            Recognizer: V,
            AttrRecognizer: Z,
            Tap: da,
            Pan: $,
            Swipe: ca,
            Pinch: _,
            Rotate: ba,
            Press: aa,
            on: n,
            off: o,
            each: g,
            merge: i,
            extend: h,
            inherit: j,
            bindFn: k,
            prefixed: v
        }), typeof define == ka && define.amd ? define("Hammer", function() {
            return ea
        }) : "undefined" != typeof module && module.exports && (module.exports = ea), a[c] = ea
    }(window, document, "Hammer"),
    function(a, b) {
        a.tcom = b(a.jQuery), "function" == typeof define && define.amd && define("tcom", function() {
            return a.tcom
        })
    }(this, function(a) {
        var b, c;
        b = c = a, ! function(a) {
            "object" == typeof exports && "undefined" != typeof module ? module.exports = a() : "function" == typeof define && define.amd && define("page", [], a);
            var b;
            "undefined" != typeof window ? b = window : "undefined" != typeof global ? b = global : "undefined" != typeof self && (b = self), b.page = a()
        }(function() {
            return function a(b, c, d) {
                function e(g, h) {
                    if (!c[g]) {
                        if (!b[g]) {
                            var i = "function" == typeof require && require;
                            if (!h && i) return i(g, !0);
                            if (f) return f(g, !0);
                            var j = new Error("Cannot find module '" + g + "'");
                            throw j.code = "MODULE_NOT_FOUND", j
                        }
                        var k = c[g] = {
                            exports: {}
                        };
                        b[g][0].call(k.exports, function(a) {
                            var c = b[g][1][a];
                            return e(c ? c : a)
                        }, k, k.exports, a, b, c, d)
                    }
                    return c[g].exports
                }
                for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
                return e
            }({
                1: [function(a, b, c) {
                    (function(c) {
                        "use strict";

                        function d(a, b) {
                            if ("function" == typeof a) return d("*", a);
                            if ("function" == typeof b)
                                for (var c = new h(a), e = 1; e < arguments.length; ++e) d.callbacks.push(c.middleware(arguments[e]));
                            else "string" == typeof a ? d["string" == typeof b ? "redirect" : "show"](a, b) : d.start(a)
                        }

                        function e(a) {
                            if (!a.handled) {
                                var b;
                                b = t ? s + p.hash.replace("#!", "") : p.pathname + p.search, b !== a.canonicalPath && (d.stop(), a.handled = !1, p.href = a.canonicalPath)
                            }
                        }

                        function f(a) {
                            return "string" != typeof a ? a : r ? decodeURIComponent(a.replace(/\+/g, " ")) : a
                        }

                        function g(a, b) {
                            "/" === a[0] && 0 !== a.indexOf(s) && (a = s + (t ? "#!" : "") + a);
                            var c = a.indexOf("?");
                            if (this.canonicalPath = a, this.path = a.replace(s, "") || "/", t && (this.path = this.path.replace("#!", "") || "/"), this.title = document.title, this.state = b || {}, this.state.path = a, this.querystring = ~c ? f(a.slice(c + 1)) : "", this.pathname = f(~c ? a.slice(0, c) : a), this.params = {}, this.hash = "", !t) {
                                if (!~this.path.indexOf("#")) return;
                                var d = this.path.split("#");
                                this.path = d[0], this.hash = f(d[1]) || "", this.querystring = this.querystring.split("#")[0]
                            }
                        }

                        function h(a, b) {
                            b = b || {}, this.path = "*" === a ? "(.*)" : a, this.method = "GET", this.regexp = l(this.path, this.keys = [], b.sensitive, b.strict)
                        }

                        function i(a) {
                            if (1 === j(a) && !(a.metaKey || a.ctrlKey || a.shiftKey || a.defaultPrevented)) {
                                for (var b = a.target; b && "A" !== b.nodeName;) b = b.parentNode;
                                if (b && "A" === b.nodeName && !b.hasAttribute("download") && "external" !== b.getAttribute("rel")) {
                                    var e = b.getAttribute("href");
                                    if ((t || b.pathname !== p.pathname || !b.hash && "#" !== e) && !(e && e.indexOf("mailto:") > -1) && !b.target && k(b.href)) {
                                        var f = b.pathname + b.search + (b.hash || "");
                                        "undefined" != typeof c && f.match(/^\/[a-zA-Z]:\//) && (f = f.replace(/^\/[a-zA-Z]:\//, "/"));
                                        var g = f;
                                        0 === f.indexOf(s) && (f = f.substr(s.length)), t && (f = f.replace("#!", "")), s && g === f || (a.preventDefault(), d.show(g))
                                    }
                                }
                            }
                        }

                        function j(a) {
                            return a = a || window.event, null === a.which ? a.button : a.which
                        }

                        function k(a) {
                            var b = p.protocol + "//" + p.hostname;
                            return p.port && (b += ":" + p.port), a && 0 === a.indexOf(b)
                        }
                        var l = a("path-to-regexp");
                        b.exports = d;
                        var m, n, o = "undefined" != typeof document && document.ontouchstart ? "touchstart" : "click",
                            p = "undefined" != typeof window && (window.history.location || window.location),
                            q = !0,
                            r = !0,
                            s = "",
                            t = !1;
                        d.callbacks = [], d.exits = [], d.current = "", d.len = 0, d.base = function(a) {
                            return 0 === arguments.length ? s : void(s = a)
                        }, d.start = function(a) {
                            if (a = a || {}, !m && (m = !0, !1 === a.dispatch && (q = !1), !1 === a.decodeURLComponents && (r = !1), !1 !== a.popstate && window.addEventListener("popstate", u, !1), !1 !== a.click && document.addEventListener(o, i, !1), !0 === a.hashbang && (t = !0), q)) {
                                var b = t && ~p.hash.indexOf("#!") ? p.hash.substr(2) : p.pathname + p.search + p.hash;
                                d.replace(b, null, !0, q)
                            }
                        }, d.stop = function() {
                            m && (d.current = "", d.len = 0, m = !1, document.removeEventListener(o, i, !1), window.removeEventListener("popstate", u, !1))
                        }, d.show = function(a, b, c, e) {
                            var f = new g(a, b);
                            return d.current = f.path, !1 !== c && d.dispatch(f), !1 !== f.handled && !1 !== e && f.pushState(), f
                        }, d.back = function(a, b) {
                            d.len > 0 ? (history.back(), d.len--) : a ? setTimeout(function() {
                                d.show(a, b)
                            }) : setTimeout(function() {
                                d.show(s, b)
                            })
                        }, d.redirect = function(a, b) {
                            "string" == typeof a && "string" == typeof b && d(a, function(a) {
                                setTimeout(function() {
                                    d.replace(b)
                                }, 0)
                            }), "string" == typeof a && "undefined" == typeof b && setTimeout(function() {
                                d.replace(a)
                            }, 0)
                        }, d.replace = function(a, b, c, e) {
                            var f = new g(a, b);
                            return d.current = f.path, f.init = c, f.save(), !1 !== e && d.dispatch(f), f
                        }, d.dispatch = function(a) {
                            function b() {
                                var a = d.exits[h++];
                                return a ? void a(f, b) : c()
                            }

                            function c() {
                                var b = d.callbacks[g++];
                                return a.path !== d.current ? void(a.handled = !1) : b ? void b(a, c) : e(a)
                            }
                            var f = n,
                                g = 0,
                                h = 0;
                            n = a, f ? b() : c()
                        }, d.exit = function(a, b) {
                            if ("function" == typeof a) return d.exit("*", a);
                            for (var c = new h(a), e = 1; e < arguments.length; ++e) d.exits.push(c.middleware(arguments[e]))
                        }, d.Context = g, g.prototype.pushState = function() {
                            d.len++, history.pushState(this.state, this.title, t && "/" !== this.path ? "#!" + this.path : this.canonicalPath)
                        }, g.prototype.save = function() {
                            history.replaceState(this.state, this.title, t && "/" !== this.path ? "#!" + this.path : this.canonicalPath)
                        }, d.Route = h, h.prototype.middleware = function(a) {
                            var b = this;
                            return function(c, d) {
                                return b.match(c.path, c.params) ? a(c, d) : void d()
                            }
                        }, h.prototype.match = function(a, b) {
                            var c = this.keys,
                                d = a.indexOf("?"),
                                e = ~d ? a.slice(0, d) : a,
                                g = this.regexp.exec(decodeURIComponent(e));
                            if (!g) return !1;
                            for (var h = 1, i = g.length; h < i; ++h) {
                                var j = c[h - 1],
                                    k = f(g[h]);
                                void 0 === k && hasOwnProperty.call(b, j.name) || (b[j.name] = k)
                            }
                            return !0
                        };
                        var u = function() {
                            var a = !1;
                            if ("undefined" != typeof window) return "complete" === document.readyState ? a = !0 : window.addEventListener("load", function() {
                                    setTimeout(function() {
                                        a = !0
                                    }, 0)
                                }),
                                function(b) {
                                    if (a)
                                        if (b.state) {
                                            var c = b.state.path;
                                            d.replace(c, b.state)
                                        } else d.show(p.pathname + p.hash, void 0, void 0, !1)
                                }
                        }();
                        d.sameOrigin = k
                    }).call(this, a("_process"))
                }, {
                    _process: 2,
                    "path-to-regexp": 3
                }],
                2: [function(a, b, c) {
                    function d() {}
                    var e = b.exports = {};
                    e.nextTick = function() {
                        var a = "undefined" != typeof window && window.setImmediate,
                            b = "undefined" != typeof window && window.MutationObserver,
                            c = "undefined" != typeof window && window.postMessage && window.addEventListener;
                        if (a) return function(a) {
                            return window.setImmediate(a)
                        };
                        var d = [];
                        if (b) {
                            var e = document.createElement("div"),
                                f = new MutationObserver(function() {
                                    var a = d.slice();
                                    d.length = 0, a.forEach(function(a) {
                                        a()
                                    })
                                });
                            return f.observe(e, {
                                    attributes: !0
                                }),
                                function(a) {
                                    d.length || e.setAttribute("yes", "no"), d.push(a)
                                }
                        }
                        return c ? (window.addEventListener("message", function(a) {
                            var b = a.source;
                            if ((b === window || null === b) && "process-tick" === a.data && (a.stopPropagation(), d.length > 0)) {
                                var c = d.shift();
                                c()
                            }
                        }, !0), function(a) {
                            d.push(a), window.postMessage("process-tick", "*")
                        }) : function(a) {
                            setTimeout(a, 0)
                        }
                    }(), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = d, e.addListener = d, e.once = d, e.off = d, e.removeListener = d, e.removeAllListeners = d, e.emit = d, e.binding = function(a) {
                        throw new Error("process.binding is not supported")
                    }, e.cwd = function() {
                        return "/"
                    }, e.chdir = function(a) {
                        throw new Error("process.chdir is not supported")
                    }
                }, {}],
                3: [function(a, b, c) {
                    function d(a) {
                        return a.replace(/([=!:$\/()])/g, "\\$1")
                    }

                    function e(a, b) {
                        return a.keys = b, a
                    }

                    function f(a) {
                        return a.sensitive ? "" : "i"
                    }

                    function g(a, b) {
                        var c = a.source.match(/\((?!\?)/g);
                        if (c)
                            for (var d = 0; d < c.length; d++) b.push({
                                name: d,
                                delimiter: null,
                                optional: !1,
                                repeat: !1
                            });
                        return e(a, b)
                    }

                    function h(a, b, c) {
                        for (var d = [], g = 0; g < a.length; g++) d.push(j(a[g], b, c).source);
                        var h = new RegExp("(?:" + d.join("|") + ")", f(c));
                        return e(h, b)
                    }

                    function i(a, b) {
                        function c(a, c, f, g, h, i, j, k) {
                            if (c) return c;
                            if (k) return "\\" + k;
                            var l = "+" === j || "*" === j,
                                m = "?" === j || "*" === j;
                            return b.push({
                                name: g || e++,
                                delimiter: f || "/",
                                optional: m,
                                repeat: l
                            }), f = f ? "\\" + f : "", h = d(h || i || "[^" + (f || "\\/") + "]+?"), l && (h = h + "(?:" + f + h + ")*"), m ? "(?:" + f + "(" + h + "))?" : f + "(" + h + ")"
                        }
                        var e = 0;
                        return a.replace(l, c)
                    }

                    function j(a, b, c) {
                        if (b = b || [], k(b) ? c || (c = {}) : (c = b, b = []), a instanceof RegExp) return g(a, b, c);
                        if (k(a)) return h(a, b, c);
                        var d = c.strict,
                            j = c.end !== !1,
                            l = i(a, b),
                            m = "/" === a.charAt(a.length - 1);
                        return d || (l = (m ? l.slice(0, -2) : l) + "(?:\\/(?=$))?"), l += j ? "$" : d && m ? "" : "(?=\\/|$)", e(new RegExp("^" + l, f(c)), b)
                    }
                    var k = a("isarray");
                    b.exports = j;
                    var l = new RegExp(["(\\\\.)", "([\\/.])?(?:\\:(\\w+)(?:\\(((?:\\\\.|[^)])*)\\))?|\\(((?:\\\\.|[^)])*)\\))([+*?])?", "([.+*?=^!:${}()[\\]|\\/])"].join("|"), "g")
                }, {
                    isarray: 4
                }],
                4: [function(a, b, c) {
                    b.exports = Array.isArray || function(a) {
                        return "[object Array]" == Object.prototype.toString.call(a)
                    }
                }, {}]
            }, {}, [1])(1)
        });
        var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, aa, ba, ca, da;
        return function() {
                function a(a) {
                    function b(b, c, d, e, f, g) {
                        for (; f >= 0 && f < g; f += a) {
                            var h = e ? e[f] : f;
                            d = c(d, b[h], h, b)
                        }
                        return d
                    }
                    return function(c, d, e, f) {
                        d = u(d, f, 4);
                        var g = !B(c) && t.keys(c),
                            h = (g || c).length,
                            i = a > 0 ? 0 : h - 1;
                        return arguments.length < 3 && (e = c[g ? g[i] : i], i += a), b(c, d, e, g, i, h)
                    }
                }

                function b(a) {
                    return function(b, c, d) {
                        c = v(c, d);
                        for (var e = A(b), f = a > 0 ? 0 : e - 1; f >= 0 && f < e; f += a)
                            if (c(b[f], f, b)) return f;
                        return -1
                    }
                }

                function c(a, b, c) {
                    return function(d, e, f) {
                        var g = 0,
                            h = A(d);
                        if ("number" == typeof f) a > 0 ? g = f >= 0 ? f : Math.max(f + h, g) : h = f >= 0 ? Math.min(f + 1, h) : f + h + 1;
                        else if (c && f && h) return f = c(d, e), d[f] === e ? f : -1;
                        if (e !== e) return f = b(l.call(d, g, h), t.isNaN), f >= 0 ? f + g : -1;
                        for (f = a > 0 ? g : h - 1; f >= 0 && f < h; f += a)
                            if (d[f] === e) return f;
                        return -1
                    }
                }

                function e(a, b) {
                    var c = G.length,
                        d = a.constructor,
                        e = t.isFunction(d) && d.prototype || i,
                        f = "constructor";
                    for (t.has(a, f) && !t.contains(b, f) && b.push(f); c--;) f = G[c], f in a && a[f] !== e[f] && !t.contains(b, f) && b.push(f)
                }
                var f = this,
                    g = f._,
                    h = Array.prototype,
                    i = Object.prototype,
                    j = Function.prototype,
                    k = h.push,
                    l = h.slice,
                    m = i.toString,
                    n = i.hasOwnProperty,
                    o = Array.isArray,
                    p = Object.keys,
                    q = j.bind,
                    r = Object.create,
                    s = function() {},
                    t = function(a) {
                        return a instanceof t ? a : this instanceof t ? void(this._wrapped = a) : new t(a)
                    };
                "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = t), exports._ = t) : f._ = t, t.VERSION = "1.8.3";
                var u = function(a, b, c) {
                        if (void 0 === b) return a;
                        switch (null == c ? 3 : c) {
                            case 1:
                                return function(c) {
                                    return a.call(b, c)
                                };
                            case 2:
                                return function(c, d) {
                                    return a.call(b, c, d)
                                };
                            case 3:
                                return function(c, d, e) {
                                    return a.call(b, c, d, e)
                                };
                            case 4:
                                return function(c, d, e, f) {
                                    return a.call(b, c, d, e, f)
                                }
                        }
                        return function() {
                            return a.apply(b, arguments)
                        }
                    },
                    v = function(a, b, c) {
                        return null == a ? t.identity : t.isFunction(a) ? u(a, b, c) : t.isObject(a) ? t.matcher(a) : t.property(a)
                    };
                t.iteratee = function(a, b) {
                    return v(a, b, 1 / 0)
                };
                var w = function(a, b) {
                        return function(c) {
                            var d = arguments.length;
                            if (d < 2 || null == c) return c;
                            for (var e = 1; e < d; e++)
                                for (var f = arguments[e], g = a(f), h = g.length, i = 0; i < h; i++) {
                                    var j = g[i];
                                    b && void 0 !== c[j] || (c[j] = f[j])
                                }
                            return c
                        }
                    },
                    x = function(a) {
                        if (!t.isObject(a)) return {};
                        if (r) return r(a);
                        s.prototype = a;
                        var b = new s;
                        return s.prototype = null, b
                    },
                    y = function(a) {
                        return function(b) {
                            return null == b ? void 0 : b[a]
                        }
                    },
                    z = Math.pow(2, 53) - 1,
                    A = y("length"),
                    B = function(a) {
                        var b = A(a);
                        return "number" == typeof b && b >= 0 && b <= z
                    };
                t.each = t.forEach = function(a, b, c) {
                    b = u(b, c);
                    var d, e;
                    if (B(a))
                        for (d = 0, e = a.length; d < e; d++) b(a[d], d, a);
                    else {
                        var f = t.keys(a);
                        for (d = 0, e = f.length; d < e; d++) b(a[f[d]], f[d], a)
                    }
                    return a
                }, t.map = t.collect = function(a, b, c) {
                    b = v(b, c);
                    for (var d = !B(a) && t.keys(a), e = (d || a).length, f = Array(e), g = 0; g < e; g++) {
                        var h = d ? d[g] : g;
                        f[g] = b(a[h], h, a)
                    }
                    return f
                }, t.reduce = t.foldl = t.inject = a(1), t.reduceRight = t.foldr = a(-1), t.find = t.detect = function(a, b, c) {
                    var d;
                    if (d = B(a) ? t.findIndex(a, b, c) : t.findKey(a, b, c), void 0 !== d && d !== -1) return a[d]
                }, t.filter = t.select = function(a, b, c) {
                    var d = [];
                    return b = v(b, c), t.each(a, function(a, c, e) {
                        b(a, c, e) && d.push(a)
                    }), d
                }, t.reject = function(a, b, c) {
                    return t.filter(a, t.negate(v(b)), c)
                }, t.every = t.all = function(a, b, c) {
                    b = v(b, c);
                    for (var d = !B(a) && t.keys(a), e = (d || a).length, f = 0; f < e; f++) {
                        var g = d ? d[f] : f;
                        if (!b(a[g], g, a)) return !1
                    }
                    return !0
                }, t.some = t.any = function(a, b, c) {
                    b = v(b, c);
                    for (var d = !B(a) && t.keys(a), e = (d || a).length, f = 0; f < e; f++) {
                        var g = d ? d[f] : f;
                        if (b(a[g], g, a)) return !0
                    }
                    return !1
                }, t.contains = t.includes = t.include = function(a, b, c, d) {
                    return B(a) || (a = t.values(a)), ("number" != typeof c || d) && (c = 0), t.indexOf(a, b, c) >= 0
                }, t.invoke = function(a, b) {
                    var c = l.call(arguments, 2),
                        d = t.isFunction(b);
                    return t.map(a, function(a) {
                        var e = d ? b : a[b];
                        return null == e ? e : e.apply(a, c)
                    })
                }, t.pluck = function(a, b) {
                    return t.map(a, t.property(b))
                }, t.where = function(a, b) {
                    return t.filter(a, t.matcher(b))
                }, t.findWhere = function(a, b) {
                    return t.find(a, t.matcher(b))
                }, t.max = function(a, b, c) {
                    var d, e, f = -(1 / 0),
                        g = -(1 / 0);
                    if (null == b && null != a) {
                        a = B(a) ? a : t.values(a);
                        for (var h = 0, i = a.length; h < i; h++) d = a[h], d > f && (f = d)
                    } else b = v(b, c), t.each(a, function(a, c, d) {
                        e = b(a, c, d), (e > g || e === -(1 / 0) && f === -(1 / 0)) && (f = a, g = e)
                    });
                    return f
                }, t.min = function(a, b, c) {
                    var d, e, f = 1 / 0,
                        g = 1 / 0;
                    if (null == b && null != a) {
                        a = B(a) ? a : t.values(a);
                        for (var h = 0, i = a.length; h < i; h++) d = a[h], d < f && (f = d)
                    } else b = v(b, c), t.each(a, function(a, c, d) {
                        e = b(a, c, d), (e < g || e === 1 / 0 && f === 1 / 0) && (f = a, g = e)
                    });
                    return f
                }, t.shuffle = function(a) {
                    for (var b, c = B(a) ? a : t.values(a), d = c.length, e = Array(d), f = 0; f < d; f++) b = t.random(0, f), b !== f && (e[f] = e[b]), e[b] = c[f];
                    return e
                }, t.sample = function(a, b, c) {
                    return null == b || c ? (B(a) || (a = t.values(a)), a[t.random(a.length - 1)]) : t.shuffle(a).slice(0, Math.max(0, b))
                }, t.sortBy = function(a, b, c) {
                    return b = v(b, c), t.pluck(t.map(a, function(a, c, d) {
                        return {
                            value: a,
                            index: c,
                            criteria: b(a, c, d)
                        }
                    }).sort(function(a, b) {
                        var c = a.criteria,
                            d = b.criteria;
                        if (c !== d) {
                            if (c > d || void 0 === c) return 1;
                            if (c < d || void 0 === d) return -1
                        }
                        return a.index - b.index
                    }), "value")
                };
                var C = function(a) {
                    return function(b, c, d) {
                        var e = {};
                        return c = v(c, d), t.each(b, function(d, f) {
                            var g = c(d, f, b);
                            a(e, d, g)
                        }), e
                    }
                };
                t.groupBy = C(function(a, b, c) {
                    t.has(a, c) ? a[c].push(b) : a[c] = [b]
                }), t.indexBy = C(function(a, b, c) {
                    a[c] = b
                }), t.countBy = C(function(a, b, c) {
                    t.has(a, c) ? a[c]++ : a[c] = 1
                }), t.toArray = function(a) {
                    return a ? t.isArray(a) ? l.call(a) : B(a) ? t.map(a, t.identity) : t.values(a) : []
                }, t.size = function(a) {
                    return null == a ? 0 : B(a) ? a.length : t.keys(a).length
                }, t.partition = function(a, b, c) {
                    b = v(b, c);
                    var d = [],
                        e = [];
                    return t.each(a, function(a, c, f) {
                        (b(a, c, f) ? d : e).push(a)
                    }), [d, e]
                }, t.first = t.head = t.take = function(a, b, c) {
                    if (null != a) return null == b || c ? a[0] : t.initial(a, a.length - b)
                }, t.initial = function(a, b, c) {
                    return l.call(a, 0, Math.max(0, a.length - (null == b || c ? 1 : b)))
                }, t.last = function(a, b, c) {
                    if (null != a) return null == b || c ? a[a.length - 1] : t.rest(a, Math.max(0, a.length - b))
                }, t.rest = t.tail = t.drop = function(a, b, c) {
                    return l.call(a, null == b || c ? 1 : b)
                }, t.compact = function(a) {
                    return t.filter(a, t.identity)
                };
                var D = function(a, b, c, d) {
                    for (var e = [], f = 0, g = d || 0, h = A(a); g < h; g++) {
                        var i = a[g];
                        if (B(i) && (t.isArray(i) || t.isArguments(i))) {
                            b || (i = D(i, b, c));
                            var j = 0,
                                k = i.length;
                            for (e.length += k; j < k;) e[f++] = i[j++]
                        } else c || (e[f++] = i)
                    }
                    return e
                };
                t.flatten = function(a, b) {
                    return D(a, b, !1)
                }, t.without = function(a) {
                    return t.difference(a, l.call(arguments, 1))
                }, t.uniq = t.unique = function(a, b, c, d) {
                    t.isBoolean(b) || (d = c, c = b, b = !1), null != c && (c = v(c, d));
                    for (var e = [], f = [], g = 0, h = A(a); g < h; g++) {
                        var i = a[g],
                            j = c ? c(i, g, a) : i;
                        b ? (g && f === j || e.push(i), f = j) : c ? t.contains(f, j) || (f.push(j), e.push(i)) : t.contains(e, i) || e.push(i)
                    }
                    return e
                }, t.union = function() {
                    return t.uniq(D(arguments, !0, !0))
                }, t.intersection = function(a) {
                    for (var b = [], c = arguments.length, d = 0, e = A(a); d < e; d++) {
                        var f = a[d];
                        if (!t.contains(b, f)) {
                            for (var g = 1; g < c && t.contains(arguments[g], f); g++);
                            g === c && b.push(f)
                        }
                    }
                    return b
                }, t.difference = function(a) {
                    var b = D(arguments, !0, !0, 1);
                    return t.filter(a, function(a) {
                        return !t.contains(b, a)
                    })
                }, t.zip = function() {
                    return t.unzip(arguments)
                }, t.unzip = function(a) {
                    for (var b = a && t.max(a, A).length || 0, c = Array(b), d = 0; d < b; d++) c[d] = t.pluck(a, d);
                    return c
                }, t.object = function(a, b) {
                    for (var c = {}, d = 0, e = A(a); d < e; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
                    return c
                }, t.findIndex = b(1), t.findLastIndex = b(-1), t.sortedIndex = function(a, b, c, d) {
                    c = v(c, d, 1);
                    for (var e = c(b), f = 0, g = A(a); f < g;) {
                        var h = Math.floor((f + g) / 2);
                        c(a[h]) < e ? f = h + 1 : g = h
                    }
                    return f
                }, t.indexOf = c(1, t.findIndex, t.sortedIndex), t.lastIndexOf = c(-1, t.findLastIndex), t.range = function(a, b, c) {
                    null == b && (b = a || 0, a = 0), c = c || 1;
                    for (var d = Math.max(Math.ceil((b - a) / c), 0), e = Array(d), f = 0; f < d; f++, a += c) e[f] = a;
                    return e
                };
                var E = function(a, b, c, d, e) {
                    if (!(d instanceof b)) return a.apply(c, e);
                    var f = x(a.prototype),
                        g = a.apply(f, e);
                    return t.isObject(g) ? g : f
                };
                t.bind = function(a, b) {
                    if (q && a.bind === q) return q.apply(a, l.call(arguments, 1));
                    if (!t.isFunction(a)) throw new TypeError("Bind must be called on a function");
                    var c = l.call(arguments, 2),
                        d = function() {
                            return E(a, d, b, this, c.concat(l.call(arguments)))
                        };
                    return d
                }, t.partial = function(a) {
                    var b = l.call(arguments, 1),
                        c = function() {
                            for (var d = 0, e = b.length, f = Array(e), g = 0; g < e; g++) f[g] = b[g] === t ? arguments[d++] : b[g];
                            for (; d < arguments.length;) f.push(arguments[d++]);
                            return E(a, c, this, this, f)
                        };
                    return c
                }, t.bindAll = function(a) {
                    var b, c, d = arguments.length;
                    if (d <= 1) throw new Error("bindAll must be passed function names");
                    for (b = 1; b < d; b++) c = arguments[b], a[c] = t.bind(a[c], a);
                    return a
                }, t.memoize = function(a, b) {
                    var c = function(d) {
                        var e = c.cache,
                            f = "" + (b ? b.apply(this, arguments) : d);
                        return t.has(e, f) || (e[f] = a.apply(this, arguments)), e[f]
                    };
                    return c.cache = {}, c
                }, t.delay = function(a, b) {
                    var c = l.call(arguments, 2);
                    return setTimeout(function() {
                        return a.apply(null, c)
                    }, b)
                }, t.defer = t.partial(t.delay, t, 1), t.throttle = function(a, b, c) {
                    var d, e, f, g = null,
                        h = 0;
                    c || (c = {});
                    var i = function() {
                        h = c.leading === !1 ? 0 : t.now(), g = null, f = a.apply(d, e), g || (d = e = null)
                    };
                    return function() {
                        var j = t.now();
                        h || c.leading !== !1 || (h = j);
                        var k = b - (j - h);
                        return d = this, e = arguments, k <= 0 || k > b ? (g && (clearTimeout(g), g = null), h = j, f = a.apply(d, e), g || (d = e = null)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
                    }
                }, t.debounce = function(a, b, c) {
                    var d, e, f, g, h, i = function() {
                        var j = t.now() - g;
                        j < b && j >= 0 ? d = setTimeout(i, b - j) : (d = null, c || (h = a.apply(f, e), d || (f = e = null)))
                    };
                    return function() {
                        f = this, e = arguments, g = t.now();
                        var j = c && !d;
                        return d || (d = setTimeout(i, b)), j && (h = a.apply(f, e), f = e = null), h
                    }
                }, t.wrap = function(a, b) {
                    return t.partial(b, a)
                }, t.negate = function(a) {
                    return function() {
                        return !a.apply(this, arguments)
                    }
                }, t.compose = function() {
                    var a = arguments,
                        b = a.length - 1;
                    return function() {
                        for (var c = b, d = a[b].apply(this, arguments); c--;) d = a[c].call(this, d);
                        return d
                    }
                }, t.after = function(a, b) {
                    return function() {
                        if (--a < 1) return b.apply(this, arguments)
                    }
                }, t.before = function(a, b) {
                    var c;
                    return function() {
                        return --a > 0 && (c = b.apply(this, arguments)), a <= 1 && (b = null), c
                    }
                }, t.once = t.partial(t.before, 2);
                var F = !{
                        toString: null
                    }.propertyIsEnumerable("toString"),
                    G = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
                t.keys = function(a) {
                    if (!t.isObject(a)) return [];
                    if (p) return p(a);
                    var b = [];
                    for (var c in a) t.has(a, c) && b.push(c);
                    return F && e(a, b), b
                }, t.allKeys = function(a) {
                    if (!t.isObject(a)) return [];
                    var b = [];
                    for (var c in a) b.push(c);
                    return F && e(a, b), b
                }, t.values = function(a) {
                    for (var b = t.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) d[e] = a[b[e]];
                    return d
                }, t.mapObject = function(a, b, c) {
                    b = v(b, c);
                    for (var d, e = t.keys(a), f = e.length, g = {}, h = 0; h < f; h++) d = e[h], g[d] = b(a[d], d, a);
                    return g
                }, t.pairs = function(a) {
                    for (var b = t.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) d[e] = [b[e], a[b[e]]];
                    return d
                }, t.invert = function(a) {
                    for (var b = {}, c = t.keys(a), d = 0, e = c.length; d < e; d++) b[a[c[d]]] = c[d];
                    return b
                }, t.functions = t.methods = function(a) {
                    var b = [];
                    for (var c in a) t.isFunction(a[c]) && b.push(c);
                    return b.sort()
                }, t.extend = w(t.allKeys), t.extendOwn = t.assign = w(t.keys), t.findKey = function(a, b, c) {
                    b = v(b, c);
                    for (var d, e = t.keys(a), f = 0, g = e.length; f < g; f++)
                        if (d = e[f], b(a[d], d, a)) return d
                }, t.pick = function(a, b, c) {
                    var d, e, f = {},
                        g = a;
                    if (null == g) return f;
                    t.isFunction(b) ? (e = t.allKeys(g), d = u(b, c)) : (e = D(arguments, !1, !1, 1), d = function(a, b, c) {
                        return b in c
                    }, g = Object(g));
                    for (var h = 0, i = e.length; h < i; h++) {
                        var j = e[h],
                            k = g[j];
                        d(k, j, g) && (f[j] = k)
                    }
                    return f
                }, t.omit = function(a, b, c) {
                    if (t.isFunction(b)) b = t.negate(b);
                    else {
                        var d = t.map(D(arguments, !1, !1, 1), String);
                        b = function(a, b) {
                            return !t.contains(d, b)
                        }
                    }
                    return t.pick(a, b, c)
                }, t.defaults = w(t.allKeys, !0), t.create = function(a, b) {
                    var c = x(a);
                    return b && t.extendOwn(c, b), c
                }, t.clone = function(a) {
                    return t.isObject(a) ? t.isArray(a) ? a.slice() : t.extend({}, a) : a
                }, t.tap = function(a, b) {
                    return b(a), a
                }, t.isMatch = function(a, b) {
                    var c = t.keys(b),
                        d = c.length;
                    if (null == a) return !d;
                    for (var e = Object(a), f = 0; f < d; f++) {
                        var g = c[f];
                        if (b[g] !== e[g] || !(g in e)) return !1
                    }
                    return !0
                };
                var H = function(a, b, c, d) {
                    if (a === b) return 0 !== a || 1 / a === 1 / b;
                    if (null == a || null == b) return a === b;
                    a instanceof t && (a = a._wrapped), b instanceof t && (b = b._wrapped);
                    var e = m.call(a);
                    if (e !== m.call(b)) return !1;
                    switch (e) {
                        case "[object RegExp]":
                        case "[object String]":
                            return "" + a == "" + b;
                        case "[object Number]":
                            return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
                        case "[object Date]":
                        case "[object Boolean]":
                            return +a === +b
                    }
                    var f = "[object Array]" === e;
                    if (!f) {
                        if ("object" != typeof a || "object" != typeof b) return !1;
                        var g = a.constructor,
                            h = b.constructor;
                        if (g !== h && !(t.isFunction(g) && g instanceof g && t.isFunction(h) && h instanceof h) && "constructor" in a && "constructor" in b) return !1
                    }
                    c = c || [], d = d || [];
                    for (var i = c.length; i--;)
                        if (c[i] === a) return d[i] === b;
                    if (c.push(a), d.push(b), f) {
                        if (i = a.length, i !== b.length) return !1;
                        for (; i--;)
                            if (!H(a[i], b[i], c, d)) return !1
                    } else {
                        var j, k = t.keys(a);
                        if (i = k.length, t.keys(b).length !== i) return !1;
                        for (; i--;)
                            if (j = k[i], !t.has(b, j) || !H(a[j], b[j], c, d)) return !1
                    }
                    return c.pop(), d.pop(), !0
                };
                t.isEqual = function(a, b) {
                    return H(a, b)
                }, t.isEmpty = function(a) {
                    return null == a || (B(a) && (t.isArray(a) || t.isString(a) || t.isArguments(a)) ? 0 === a.length : 0 === t.keys(a).length)
                }, t.isElement = function(a) {
                    return !(!a || 1 !== a.nodeType)
                }, t.isArray = o || function(a) {
                    return "[object Array]" === m.call(a)
                }, t.isObject = function(a) {
                    var b = typeof a;
                    return "function" === b || "object" === b && !!a
                }, t.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(a) {
                    t["is" + a] = function(b) {
                        return m.call(b) === "[object " + a + "]"
                    }
                }), t.isArguments(arguments) || (t.isArguments = function(a) {
                    return t.has(a, "callee")
                }), "function" != typeof /./ && "object" != typeof Int8Array && (t.isFunction = function(a) {
                    return "function" == typeof a || !1
                }), t.isFinite = function(a) {
                    return isFinite(a) && !isNaN(parseFloat(a))
                }, t.isNaN = function(a) {
                    return t.isNumber(a) && a !== +a
                }, t.isBoolean = function(a) {
                    return a === !0 || a === !1 || "[object Boolean]" === m.call(a)
                }, t.isNull = function(a) {
                    return null === a
                }, t.isUndefined = function(a) {
                    return void 0 === a
                }, t.has = function(a, b) {
                    return null != a && n.call(a, b)
                }, t.noConflict = function() {
                    return f._ = g, this
                }, t.identity = function(a) {
                    return a
                }, t.constant = function(a) {
                    return function() {
                        return a
                    }
                }, t.noop = function() {}, t.property = y, t.propertyOf = function(a) {
                    return null == a ? function() {} : function(b) {
                        return a[b]
                    }
                }, t.matcher = t.matches = function(a) {
                    return a = t.extendOwn({}, a),
                        function(b) {
                            return t.isMatch(b, a)
                        }
                }, t.times = function(a, b, c) {
                    var d = Array(Math.max(0, a));
                    b = u(b, c, 1);
                    for (var e = 0; e < a; e++) d[e] = b(e);
                    return d
                }, t.random = function(a, b) {
                    return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
                }, t.now = Date.now || function() {
                    return (new Date).getTime()
                };
                var I = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#x27;",
                        "`": "&#x60;"
                    },
                    J = t.invert(I),
                    K = function(a) {
                        var b = function(b) {
                                return a[b]
                            },
                            c = "(?:" + t.keys(a).join("|") + ")",
                            d = RegExp(c),
                            e = RegExp(c, "g");
                        return function(a) {
                            return a = null == a ? "" : "" + a, d.test(a) ? a.replace(e, b) : a
                        }
                    };
                t.escape = K(I), t.unescape = K(J), t.result = function(a, b, c) {
                    var d = null == a ? void 0 : a[b];
                    return void 0 === d && (d = c), t.isFunction(d) ? d.call(a) : d
                };
                var L = 0;
                t.uniqueId = function(a) {
                    var b = ++L + "";
                    return a ? a + b : b
                }, t.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                };
                var M = /(.)^/,
                    N = {
                        "'": "'",
                        "\\": "\\",
                        "\r": "r",
                        "\n": "n",
                        "\u2028": "u2028",
                        "\u2029": "u2029"
                    },
                    O = /\\|'|\r|\n|\u2028|\u2029/g,
                    P = function(a) {
                        return "\\" + N[a]
                    };
                t.template = function(a, b, c) {
                    !b && c && (b = c), b = t.defaults({}, b, t.templateSettings);
                    var d = RegExp([(b.escape || M).source, (b.interpolate || M).source, (b.evaluate || M).source].join("|") + "|$", "g"),
                        e = 0,
                        f = "__p+='";
                    a.replace(d, function(b, c, d, g, h) {
                        return f += a.slice(e, h).replace(O, P), e = h + b.length, c ? f += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+='"), b
                    }), f += "';\n", b.variable || (f = "with(obj||{}){\n" + f + "}\n"), f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
                    try {
                        var g = new Function(b.variable || "obj", "_", f)
                    } catch (a) {
                        throw a.source = f, a
                    }
                    var h = function(a) {
                            return g.call(this, a, t)
                        },
                        i = b.variable || "obj";
                    return h.source = "function(" + i + "){\n" + f + "}", h
                }, t.chain = function(a) {
                    var b = t(a);
                    return b._chain = !0, b
                };
                var Q = function(a, b) {
                    return a._chain ? t(b).chain() : b
                };
                t.mixin = function(a) {
                    t.each(t.functions(a), function(b) {
                        var c = t[b] = a[b];
                        t.prototype[b] = function() {
                            var a = [this._wrapped];
                            return k.apply(a, arguments), Q(this, c.apply(t, a))
                        }
                    })
                }, t.mixin(t), t.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(a) {
                    var b = h[a];
                    t.prototype[a] = function() {
                        var c = this._wrapped;
                        return b.apply(c, arguments), "shift" !== a && "splice" !== a || 0 !== c.length || delete c[0], Q(this, c)
                    }
                }), t.each(["concat", "join", "slice"], function(a) {
                    var b = h[a];
                    t.prototype[a] = function() {
                        return Q(this, b.apply(this._wrapped, arguments))
                    }
                }), t.prototype.value = function() {
                    return this._wrapped
                }, t.prototype.valueOf = t.prototype.toJSON = t.prototype.value, t.prototype.toString = function() {
                    return "" + this._wrapped
                }, d = function() {
                    return t
                }()
            }.call(this), e = function(a) {
                var b = {};
                return b.$window = a(window), b.$document = a(document), b.$html = a("html"), b.$body = a("body"), b.$app = a(".app").first(), b.bodyData = b.$body.data(), b.redraw = function(b) {
                    "jquery" != typeof b && (b = a(b));
                    var c = document.createTextNode(" ");
                    b.append(c), setTimeout(function() {
                        c.parentNode.removeChild(c)
                    }, 0)
                }, a.fn.redraw = function() {
                    return a(this).each(function() {
                        b.redraw(this)
                    })
                }, b
            }(c), f = function(a) {
                var b = {},
                    c = document.location;
                return b.hasPushState = !(!window.history || !window.history.pushState || window.history.emulate), b.name = function(a) {
                    return a.indexOf("staging") >= 0 ? "staging" : a.indexOf("devcpd") >= 0 || a.indexOf("dev1") >= 0 || a.indexOf("dev2") >= 0 ? "dev" : a.indexOf("tstcpd") >= 0 || a.indexOf("test1") >= 0 || a.indexOf("test2") >= 0 ? "test" : 0 === a.indexOf("local") || 0 === a.indexOf("devixd") ? "local" : /^www|^origin\.(www|touch)|^toyota|^touch\.toyota|next\.toyota/.test(a) ? "prod" : "dev"
                }(c.hostname), b.site = /touch/.test(c.hostname) ? "tmob" : "tcom", b.sslHost = function(a) {
                    return a = "staging" === b.name || "dev" === b.name || "test" === b.name || "local" === b.name ? "https://staging." + a : "https://" + a, b.host = a.replace("ssl.", ""), a
                }("ssl.toyota.com"), b.windowsOS = function() {
                    var b = navigator.appVersion.indexOf("Win") > -1;
                    return a.$html.addClass(b ? "windows" : "no-windows"), b
                }(), b.isDebug = function() {
                    return window.location.href.indexOf("debug=true") > -1
                }, b.isProd = function() {
                    return "prod" === this.name
                }, b.isSecure = function() {
                    return "https:" === c.protocol
                }, b
            }(e), g = function(a, b) {
                var c = function(c, d, e) {
                    if (d === b) {
                        var f = null;
                        if (document.cookie && "" !== document.cookie)
                            for (var g = document.cookie.split(";"), h = 0; h < g.length; h++) {
                                var i = a.trim(g[h]);
                                if (i.substring(0, c.length + 1) == c + "=") {
                                    f = decodeURIComponent(i.substring(c.length + 1));
                                    break
                                }
                            }
                        if (JSON.parse && f && f.match(/^\s*\{/)) try {
                                f = JSON.parse(f)
                            } catch (a) {} else if (a.evalJSON && f && f.match(/^\s*\{/)) try {
                                f = a.evalJSON(f)
                            } catch (a) {}
                            return f
                    }
                    e = e || {}, null === d && (d = "", e.expires = -1), "object" == typeof d && JSON.stringify ? d = JSON.stringify(d) : "object" == typeof d && a.toJSON && (d = a.toJSON(d));
                    var j = "";
                    if (e.expires && ("number" == typeof e.expires || e.expires.toUTCString)) {
                        var k;
                        "number" == typeof e.expires ? (k = new Date, k.setTime(k.getTime() + 24 * e.expires * 60 * 60 * 1e3)) : k = e.expires, j = "; expires=" + k.toUTCString()
                    }
                    var l = e.path ? "; path=" + e.path : "",
                        m = e.domain ? "; domain=" + e.domain : "",
                        n = e.secure ? "; secure" : "";
                    document.cookie = [c, "=", encodeURIComponent(d), j, l, m, n].join("")
                };
                return "function" != typeof a.cookie && (a.cookie = c), c
            }(c), h = function(a) {
                if (window.parent && window.parent.HeaderData) return window.parent.HeaderData;
                var b = function() {
                    var b = a.Deferred(),
                        c = {},
                        d = {
                            getHeader: function(a) {
                                return c[a]
                            },
                            getAllHeaders: function() {
                                return c
                            }
                        };
                    
                    return b.promise()
                }();
                return window.HeaderData = b
            }(c), i = function() {
                function a(a) {
                    var b;
                    for (b in a)
                        if (a.hasOwnProperty(b)) return !0;
                    return !1
                }

                function b(a) {
                    return function() {
                        throw a
                    }
                }

                function c(a, c, d) {
                    try {
                        a(c, d)
                    } catch (a) {
                        setTimeout(b(a), 0)
                    }
                }

                function d(a, b, c) {
                    a(b, c)
                }

                function e(a, b, e, f) {
                    var g, h = j[b],
                        i = f ? d : c;
                    if (j.hasOwnProperty(b))
                        for (g in h) h.hasOwnProperty(g) && i(h[g], a, e)
                }

                function f(a, b, c) {
                    return function() {
                        var d = String(a),
                            f = d.lastIndexOf(".");
                        for (e(a, a, b, c); f !== -1;) d = d.substr(0, f), f = d.lastIndexOf("."), e(a, d, b, c)
                    }
                }

                function g(b) {
                    for (var c = String(b), d = Boolean(j.hasOwnProperty(c) && a(j[c])), e = c.lastIndexOf("."); !d && e !== -1;) c = c.substr(0, e), e = c.lastIndexOf("."), d = Boolean(j.hasOwnProperty(c) && a(j[c]));
                    return d
                }

                function h(a, b, c, d) {
                    var e = f(a, b, d),
                        h = g(a);
                    return !!h && (c === !0 ? e() : setTimeout(e, 0), !0)
                }
                var i = {},
                    j = {},
                    k = -1;
                return i.publish = function(a, b) {
                    return h(a, b, !1, i.immediateExceptions)
                }, i.publishSync = function(a, b) {
                    return h(a, b, !0, i.immediateExceptions)
                }, i.subscribe = function(a, b) {
                    if ("function" != typeof b) return !1;
                    j.hasOwnProperty(a) || (j[a] = {});
                    var c = "uid_" + String(++k);
                    return j[a][c] = b, c
                }, i.clearAllSubscriptions = function() {
                    j = {}
                }, i.clearSubscriptions = function(a) {
                    var b;
                    for (b in j) j.hasOwnProperty(b) && 0 === b.indexOf(a) && delete j[b]
                }, i.unsubscribe = function(a) {
                    var b, c, d, e = "string" == typeof a && j.hasOwnProperty(a),
                        f = !e && "string" == typeof a,
                        g = "function" == typeof a,
                        h = !1;
                    if (e) return void delete j[a];
                    for (b in j)
                        if (j.hasOwnProperty(b)) {
                            if (c = j[b], f && c[a]) {
                                delete c[a], h = a;
                                break
                            }
                            if (g)
                                for (d in c) c.hasOwnProperty(d) && c[d] === a && (delete c[d],
                                    h = !0)
                        }
                    return h
                }, i
            }(),
			
			k = function(a, b) {
                var c = function(c) {
                    var d, e, f, g = a.Deferred();
                    a.ajax({
                        dataType: "json",
                        url: b.locateDealers + "?brandId=1&zipCode=" + c,
                        success: function(a, b, c) {
                            a.success === !1 ? (console.log("tda data returned FALSE"), g.reject()) : (d = _.isUndefined(a.dealers) === !1 && a.dealers[0] && a.dealers[0].tda.code, e = _.filter(a.dealers, function(a) {
                                return a.pma === !0
                            }), f = _.find(e, function(a) {
                                return d !== a.tda.code
                            }), f = void 0 !== f, g.resolve(d, e, f))
                        },
                        error: function() {
                            g.reject()
                        }
                    });
                    return g.promise()
                };
                return c
            }(c, j), l = function(a, b, c, d, e, f, g) {
                function h() {
                    x || n(), /\?/.test(window.location.href) && (B = m(), b.has(B, "zipcode") && s.setZip(B.zipcode)), v.resolve(), u = !0
                }

                function i() {
                    "sessionStorage" in window && (window.sessionStorage.ipadSession || (sessionStorage.setItem("ipadSession", !0), A = sessionStorage.getItem("ipadSession")))
                }

                function j() {
                    var a = !1;
                    return "sessionStorage" in window && sessionStorage.ipadSession && (a = sessionStorage.getItem("ipadSession")), a
                }

                function k() {

                    var a = "sTest",
                        b = window.sessionStorage,
                        c = !0;
                    try {
                        b.setItem(a, "test"), b.removeItem(a)
                    } catch (a) {
                        if (a.code != DOMException.QUOTA_EXCEEDED_ERR || 0 !== b.length) throw a;
                        c = !1
                    }
                    return c
                }

                function l() {
                    navigator.geolocation && (/iPad/.test(navigator.userAgent) || /touch/.test(window.location.hostname)) && z && !A && !c("geofail") && navigator.geolocation.getCurrentPosition(function(b) {
                        b && b.coords && b.coords.accuracy <= 8e3 && a.getJSON(q, {
                            lat: b.coords.latitude,
                            long: b.coords.longitude
                        }, function(a) {
                            a && (i(), s.setZip(a.zipCode, !1, !0))
                        }).error(function(a, b, c) {})
                    }, function(a) {
                        var b = ["Toyota can serve you more accurate local information if you enable location services.", "Toyota can serve you more accurate local information if you enable location services.", "Your position is currently unavailable."][a.code];
                        c("geofail", !0, 1), 1 === a.code && alert(b)
                    }, {
                        enableHighAccuracy: !0,
                        timeout: 2e4,
                        maximumAge: 0
                    })
                }

                function m() {
                    var a = {};
                    return b(window.location.href.replace(/%20/g, " ").split("?")[1].split("/#!")[0].split("#!")[0].split("#")[0].split("&")).chain().invoke("split", "=").each(function(b) {
                        a[b[0]] = b[1]
                    }), a
                }

                function n() {
                    var a, b = c("zipcode");
                    s.validateZipcode(b) === !1 ? (l(), e.done(function(a) {
                        y = a.getHeader("E-Ak-Zip")
                    }).fail(function() {})) : (a = c("ugzipcode"), a && a.html5 && s.setZip(a.zipcode, !1, !0))
                }

                function o(a) {
                    var b, c, d = "";
                    if (!a) return !1;
                    if (s.validateZipcode(a)) return a;
                    if (a = a.split("+"), b = parseInt(Math.random() * a.length, 10), c = a[b], s.validateZipcode(c)) return c;
                    if (c = c.split("-"), !s.validateZipcode(c[0]) || !s.validateZipcode(c[1])) return !1;
                    var e = parseInt(c[0], 10),
                        f = parseInt(c[1], 10),
                        g = f - e;
                    return d = "" + parseInt(e + Math.random() * g, 10), !!s.validateZipcode(d) && d
                }
                var p = 365,
                    q = "/ToyotaSite/rest/longLatToZip",
                    r = {
                        ZIPCODE_CHANGE: "tcom.geolocation.zipcode.change",
                        TDA_SET: "tcom.geolocation.tda.set",
                        MULTIPLE_TDA: "tcom.geolocation.multiple.tda"
                    },
                    s = {
                        topics: r,
                        geoPromise: a.Deferred()
                    },
                    t = {
                        path: "/"
                    },
                    u = !1,
                    v = a.Deferred(),
                    w = a.Deferred(),
                    x = !1,
                    y = null,
                    z = k(),
                    A = z && j(),
                    B = null;
                return s.getZip = function() {
                    var d = this;
                    return a.when(v).then(function() {
                        var a = c("zipcode"),
                            f = c("ugzipcode"),
                            g = f && b.isObject(f) && f.type ? {
                                type: f.type
                            } : "";
                        d.validateZipcode(a) ? d.geoPromise.resolve(a, g) : x ? d.geoPromise.resolve(x, g) : e.done(function() {
                            a = o(y), a ? (d.setZip(a, !0), d.geoPromise.resolve(a, g)) : d.geoPromise.reject()
                        }).fail(function() {
                            d.geoPromise.reject()
                        })
                    }), d.geoPromise
                }, s.setZip = function(b, e, g) {
                    var h = this;
                    /\d{5}/.test(b) && a.when(v).then(function() {
                        var i = {
                            type: "geo"
                        };
                        b = ("" + b).replace(/\D/g, ""), e || (t.expires = g ? 1 : p, i = {
                            type: "user",
                            html5: !!g && g
                        }, c("ugzipcode", a.extend({
                            zipcode: b
                        }, i), t)), h.setTDAcode(b), console.log("setTDA fired"), c("zipcode", b, t), x = b, h.geoPromise && "resolved" !== h.geoPromise.state() && h.geoPromise.resolve(x, i), h.geoPromise = a.Deferred(), h.geoPromise.resolve(x, i), f.publish(r.ZIPCODE_CHANGE, {
                            zipcode: b
                        }), d.$body.hasClass("homepage")
                    })
                }, s.setTDAcode = function(b) {
                    var d, e = this;
                    return c("zipcode") === b && "prompted" === c("tda-multiple") ? e : (w = a.Deferred(), d = new g(b), d.done(function(a, b, d) {
                        c("tda", a, t), f.publish(r.TDA_SET), d === !0 ? (c("tda-multiple", "true"), e.multiplePMAs = b, f.publish(r.MULTIPLE_TDA)) : c("tda-multiple", b[0].dealerId)
                    }).fail(function() {
                        c("tda", "service timed out", t), f.publish(r.TDA_SET)
                    }), e)
                }, s.getMultipleTDA = function() {
                    var a = this;
                    return a.multiplePMAs
                }, s.getTDAstate = function(a) {
                    return "resolve" === a && w.resolve(), w
                }, s.setExternalZip = function(b, d) {
                    a.when(v).then(function() {
                        "object" == typeof b && (b = d), b = "" + b;
                        c("zipcode");
                        self.geoPromise = a.Deferred(), self.geoPromise.resolve(b, {
                            type: "user"
                        })
                    })
                }, s.validateZipcode = function(c) {
                    return !!c && (5 === ("" + a.trim(c)).length && !b.isNaN(parseInt(c, 10)))
                }, h(), s
            }(c, d, g, e, h, i, k), m = function(a) {
                function b() {
                    var b;
                    return void 0 !== d ? d : (b = a.$html.attr("lang"), b && "" !== b ? d = c(b) : (b = navigator.userLanguage || navigator.language || navigator.browserLanguage || navigator.systemLanguage, b && "" !== b ? d = c(b) : "unknown"))
                }

                function c(a) {
                    return 2 === a.length ? a : a.split("-")[0]
                }
                var d, e = {};
                return e.getCurrentLocale = function() {
                    return b()
                }, e.getLangPath = function() {
                    return "es" === e.getCurrentLocale() ? "espanol/" : ""
                }, e.setCurrentLocale = function(a) {
                    if (!a || 2 !== a.length) throw TypeError("setCurrentLocale() expects a two char language");
                    return d = a, this
                }, e
            }(e), n = function(a, b) {
                var c, d = {};
                return c = d.topics = {
                    STYLESHEET_LOADED: "tcom.loader.stylesheet.loaded"
                }, d.loadScript = function(b) {
                    return a.getScript(b)
                }, d.loadStylesheet = function(d) {
                    var e, f, g, h;
                    if (void 0 === d || d && "undefined" == typeof d.url) throw TypeError("loadStylesheet requires options.url");
                    e = window.document.createElement("link"), f = d && d.before || window.document.getElementsByTagName("meta")[0], g = document.createElement("link"), h = d && d.url, e.rel = "stylesheet", e.href = h, e.media = "only x", g && f ? (a("head").append(e), setTimeout(function() {
                        e.media = d && d.media || "all", d && d.eventTrigger && TCOM && TCOM.Events && TCOM.Events.trigger(d && d.eventTrigger), b.publish(c.STYLESHEET_LOADED, {
                            options: d
                        })
                    })) : (a('<link rel="stylesheet" href="' + h + '" />').appendTo("head"), TCOM && TCOM.Events && TCOM.Events.trigger("CSS:loaded"), b.publish(c.STYLESHEET_LOADED, {
                        options: d
                    }))
                }, d
            }(c, i), o = function(a, b, c) {
                var d;
                window.mboxRecipe = window.mboxRecipe || [], window.mboxCampaigns = window.mboxCampaigns || [];
                var e = {
                    initialize: function() {
                        var e = this;
                        window.TCOM.mbox.mboxDef = a.Deferred(), e.resolver() ? a.when(window.TCOM.mbox.mboxDef).then(function() {
                            "undefined" != typeof d && b.has(d, "campaign") && b.has(d, "recipe") && b.has(d, "options") ? (window.mboxCampaigns.push({
                                campaign: d.campaign,
                                recipe: d.recipe,
                                options: JSON.parse(decodeURIComponent(d.options))
                            }), e.fire(d.campaign, d.recipe, JSON.parse(decodeURIComponent(d.options)))) : a.isArray(window.mboxRecipe) && window.mboxRecipe.length > 0 ? a.each(window.mboxRecipe, function(a, b) {
                                window.mboxCampaigns.push({
                                    campaign: b.campaign,
                                    recipe: b.recipe,
                                    options: b.options
                                }), e.fire(b.campaign, b.recipe, b.options)
                            }) : (window.mboxCampaigns.push({
                                campaign: window.mboxRecipe.campaign,
                                recipe: window.mboxRecipe.recipe,
                                options: window.mboxRecipe.options
                            }), e.fire(window.mboxRecipe.campaign, window.mboxRecipe.recipe, window.mboxRecipe.options)), c.publish("tcom.mbox.complete")
                        }) : a.when(window.TCOM.mbox.mboxDef).then(function() {
                            c.publish("tcom.mbox.empty"), c.publish("tcom.mbox.complete")
                        })
                    },
                    fire: function(a, b, d) {
                        c.publish("tcom.mbox.recipe", {
                            campaign: a,
                            recipe: b,
                            options: d
                        })
                    },
                    getParams: function() {
                        var a = {};
                        return b(window.location.href.replace(/%20/g, " ").split("?")[1].split("&")).chain().invoke("split", "=").each(function(b) {
                            a[b[0]] = b[1]
                        }), a
                    },
                    resolver: function() {
                        var c = this,
                            e = !1;
                        return /\?/.test(window.location.href) && (d = c.getParams(), b.has(d, "campaign") && b.has(d, "recipe") && b.has(d, "options") && (e = !0)), "undefined" != typeof window.mboxRecipe && a.isArray(window.mboxRecipe) && window.mboxRecipe.length > 0 && (e = !0), e
                    }
                };
                return e
            }(c, d, i), p = function(a, c) {
                var d = {};
                document.location;
                return d.appName = function() {
                    var b = a.bodyData,
                        c = a.$app;
                    return b && b.appName ? b.appName : c.length && c.attr("data-app-name") ? c.attr("data-app-name") : c.length && c.attr("data-page-name") ? c.attr("data-page-name") : ""
                }(), d.debounce = c.debounce, d.throttle = c.throttle, d.inherits = function(a, b) {
                    var c = function() {};
                    c.prototype = b.prototype, c.prototype.constructor = b, a.prototype = new c, a.prototype.constructor = a, a.superclass = b.prototype
                }, d.updateTouchLinks = function(a) {
                    window.TCOM && "touch" === TCOM.site && (a = a && a.length ? a : TCOM.$body, a.find("[data-touch-href],[data-touch-label]").each(function() {
                        var a = b(this),
                            c = a.attr("data-touch-href"),
                            d = a.attr("data-touch-label");
                        c && a.attr("href", c).removeAttr("data-touch-href"), d && a.html(d)
                    }))
                }, d
            }(e, d), q = function(a, c, d) {
                function e() {
                    clearTimeout(b.data(o, "scrollTimer")), b.data(o, "scrollTimer", setTimeout(function() {
                        u()
                    }, 250))
                }

                function f() {
                    j = {
                        width: a.$window.width(),
                        height: a.$window.height()
                    }
                }
                var g, h, i, j, k, l, m = ".tcomViewport",
                    n = {},
                    o = a.$window,
                    p = a.$body,
                    q = a.$html.hasClass("touch");
                k = n.topics = {
                    SCROLL_START: "tcom.window.scrollstart",
                    SCROLL: "tcom.window.scroll",
                    SCROLL_END: "tcom.window.scrollend",
                    RESIZE: "tcom.window.resize",
                    QUERY_CHANGE: "tcom.viewport.query.change"
                }, h = {
                    phone: "(max-width:599px)",
                    phablet: "(min-width:600px) and (max-width:767px)",
                    tablet: "(min-width:768px) and (max-width:1023px)",
                    desktop: "(min-width:1024px)",
                    retina: "(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)"
                }, i = !!window.matchMedia, g = n.breakpointNames = {
                    DESKTOP: "desktop",
                    TABLET: "tablet",
                    PHABLET: "phablet",
                    PHONE: "phone"
                }, n.scrollTop = 0, n.isScrolling = !1, n.getCurrentQuery = function() {
                    if (!/MSIE 9/i.test(navigator.userAgent)) return this.mq(g.PHONE) && g.PHONE || this.mq(g.PHABLET) && g.PHABLET || this.mq(g.TABLET) && g.TABLET || this.mq(g.DESKTOP) && g.DESKTOP || !1;
                    var a = b(window).width();
                    return a <= 599 ? "phone" : a >= 600 && a <= 767 ? "phablet" : a >= 768 && a <= 1023 ? "tablet" : a >= 1024 ? "desktop" : void 0
                }, n.getSize = function(a) {
                    return (void 0 === j || a) && f(), j
                }, n.isMobileLayout = function() {
                    var a = this.getCurrentQuery();
                    return a === g.PHONE || a === g.PHABLET
                }, n.mq = function(a) {
                    return i ? "retina" === a ? window.devicePixelRatio > 1 || window.matchMedia(h[a]).matches : a ? window.matchMedia(h[a]).matches : void 0 : a === g.DESKTOP
                };
                var r = d.throttle(function(a) {
                        n.scrollTop = o.scrollTop(), n.isScrolling = !0, p.addClass("is-scrolling"), c.publish(k.SCROLL, {
                            event: a
                        }), e()
                    }, 50),
                    s = d.throttle(function(a) {
                        _.delay(function() {
                            n.scrollTop = o.scrollTop(), n.isScrolling = !0, p.addClass("is-scrolling"), c.publish(k.SCROLL_START, {
                                event: a
                            }), e()
                        }, 50)
                    }),
                    t = d.debounce(function(a) {
                        n.scrollTop = o.scrollTop(), _.defer(function() {
                            c.publish(k.SCROLL, {
                                event: a
                            })
                        })
                    }, 96),
                    u = d.debounce(function(a) {
                        n.scrollTop = o.scrollTop(), n.isScrolling = !1, p.removeClass("is-scrolling"), c.publish(k.SCROLL_END, {
                            event: a
                        })
                    }, q ? 128 : 800),
                    v = d.debounce(function(a) {
                        l !== n.getCurrentQuery() && (l = n.getCurrentQuery(), c.publish(k.QUERY_CHANGE, {
                            event: a,
                            currentQuery: l
                        })), c.publish(k.RESIZE, {
                            event: a
                        })
                    }, 100);
                return q ? (o.on("touchstart" + m, s), o.on("scroll" + m, t), o.on("touchend" + m, u)) : o.on("scroll" + m, r), o.on("resize orientationchange", v), l = n.getCurrentQuery(), n
            }(e, i, p), r = function(a, b, c, d, e, f, g, h, i, j, k) {
                function l(a, b) {
                    var c = this;
                    switch (console.log("analytics handleEvent", a, b), a) {
                        case e.topics.ZIPCODE_CHANGE:
                            t = b.zipcode;
                            break;
                        case e.topics.TDA_SET:
                            n();
                            break;
                        case c.topics.FIRE_TAG:
                            console.log("case: fire tag");
                            break;
                        default:
                            throw TypeError('Analytics._handleTopic: Topic "' + a + '" not recognized.')
                    }
                }

                function m() {
                    r = e.getZip(), r.done(function(a) {
                        t = a
                    }), "rejected" === r.state() && (z = e.getTDAstate("resolve"))
                }

                function n() {
                    var b = a.cookie("tda");
                    z = e.getTDAstate(), b && (s = b, z = e.getTDAstate("resolve"))
                }

                function o() {
                    var b = a.cookie("x-akamai-device-characteristics");
                    switch (!0) {
                        case b && b.indexOf("is_mobile=true") !== -1 && b.indexOf("is_tablet=false") !== -1:
                            return "phone";
                        case b && b.indexOf("is_tablet=true") !== -1:
                            return "tablet";
                        case b && b.indexOf("is_mobile=false") !== -1 && b.indexOf("is_tablet=false") !== -1:
                            return "desktop";
                        default:
                            return "no-devicetype"
                    }
                }
                var p, q, r, s, t, u = "/analytics/tags/",
                    v = {
                        deviceType: "",
                        topics: {
                            FIRE_TAG: "tcom.analytics.firetag"
                        },
                        vars: {}
                    },
                    w = {
                        phone: 320,
                        phablet: 600,
                        tablet: 768,
                        desktop: 1024
                    },
                    x = {
                        burrell: "//bs.serving-sys.com/BurstingPipe/ActivityServer.bs?cn=as&ActivityID=<%= ActivityID %>",
                        vendor: "jspath"
                    },
                    y = !1,
                    z = e.getTDAstate("resolve"),
                    A = "undefined" == typeof window.Bootstrapper ? {} : window.Bootstrapper.tagMap;
                return v.init = function() {
                    var h = this;
                    if (y) return h;
                    if (p = "", q = j.appName, h.deviceType = o(), m(), n(), window.taglist || (window.taglist = {}), window.tmsomni = window.tmsomni || {}, window.TCOM_TAG = window.TCOM_TAG || {}, !window.rit) {
                        window.rit = {}, window.rit.omni = {}, window.rit.omni.language = f.getCurrentLocale(), window.rit.omni.isDev = "prod" !== d.name, window.rit.omni.loaded = a.Deferred();
                        var k = "tmob" === d.site ? "/js/libs/Tmob_af.js" : "/analytics/tcom_af.js";
                        g.loadScript(k).done(function() {
                            window.rit.omni.loaded.resolve()
                        })
                    }
                    return c.$body.hasClass("configurator") && b.indexOf(window.location.toString().split("/"), "espanol") !== -1 && (window.tmsomni.language = "es"), i.subscribe(h.topics.FIRE_TAG, l), i.subscribe(e.topics.ZIPCODE_CHANGE, l), i.subscribe(e.topics.TDA_SET, l), y = !0, h
                }, v.vendor = function(a, c) {
                    var d, e, f = x[a];
                    "object" == typeof c && (f = b.template(f, c)), d = f.indexOf("?") > 0 ? "&" : "?", e = Math.round(1e6 * Math.random())
                }, v.getTags = function(c) {
                    if (c || (c = j.appName), !rit.omni[c] || "pending" !== rit.omni[c].state() && "resolved" !== rit.omni[c].state()) return rit.omni[c] = a.Deferred(), a.getJSON(u + "rit." + c + ".json", function(a) {
                        b.extend(window.taglist, a), rit.omni[c].resolve()
                    }), this
                }, v.checkTag = function(a, b) {
                    return a = ("" + a).split("."), !(2 !== a.length || !b) && !!b["F" + a[0] + "X" + a[1]]
                }, v.setDefaultApp = function(a) {
                    q = a
                }, v.setPageName = function(a) {
                    p = a
                }, v.currentPageName = function() {
                    return p
                }, v.setVar = function(a, b, c) {
                    var d = this;
                    return d.vars[a] || (d.vars[a] = {}), d.vars[a][b] = c, d
                }, v.removeWhack = function(a) {
                    var b = a.replace("Entune [entune,2]", "Entune"),
                        c = b.replace(/,|®|°|&amp;|&deg;|<\S[^><]*>/g, "");
                    return c
                }, v.prepareLinkName = function(a, c) {
                    var d = this;
                    if (!(arguments.length < 2 || "error_message" !== c)) {
                        var e = d.removeWhack(a);
                        return e = e.replace(/\s+/g, "_")
                    }
                    if (a && b.isString(a) && !/^http/.test(a) && "/" != a.charAt(0)) {
                        if ("tcom" === a || "tmob" === a) return a = a.substr(0, 2).toUpperCase() + a.slice(2);
                        var e = d.removeWhack(a),
                            f = e.replace(/&/g, "").replace(/\w\S*/g, function(a) {
                                return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()
                            });
                        return e = f.replace(/^\s+|\s+$/g, "").replace(/\s+|__/g, "_")
                    }
                    return a
                }, v.clean = function(a) {
                    return this.prepareLinkName(a)
                }, v.fire = function(c, g, h) {
                    var i = this;
                    m(), z = e.getTDAstate(), h || (h = g, g = c, c = q), a.when(window.rit.omni.loaded, window.rit.omni[c]).then(function() {
                        var a = {};
                        i.vars[c] && b.each(i.vars[c], function(b, c) {
                            a["<" + c + ">"] = i.prepareLinkName(b)
                        }), b.each(h, function(b, c) {
                            a["<" + c + ">"] = i.prepareLinkName(b, c)
                        }), a["<zip_code>"] = t || "", a["<tda_code>"] = s || "undefined", a["<site>"] = "tmob" === d.site || "touch" === d.site ? "TMob" : "T", a["<current_pagename>"] = v.currentPageName(), a["<break_point>"] = w[k.getCurrentQuery()], a["<device_type>"] = i.deviceType, a["<current_pagename>"] || (a["<current_pagename>"] = i.currentPageName()), b.allKeys(A).indexOf(g) !== -1 && (a["<tag_id>"] = g, g = A[g], window.TCOM_TAG.tags = {}, window.TCOM_TAG.tags[g] = a), console.log("Analytics.fire() > tagid is --" + g + "-- and args is ", a), window.TCOM_TAG = b.extend(window.TCOM_TAG, {
                            appName: j.appName,
                            language: f.getCurrentLocale(),
                            site: d.site,
                            environment: d.name,
                            tdaCode: s,
                            zipCode: t,
                            breakpoint: w[k.getCurrentQuery()]
                        }), fireTag(g, a)
                    })
                }, v.init()
            }(c, d, e, f, l, m, n, o, i, p, q), s = function(a) {
                var b = {};
                return b.getParams = function(a) {
                    var b, c, d, e = {};
                    if (a ? (b = a.indexOf("?"), b > -1 && (c = a.substring(b + 1).split("&"))) : c = location.search.substring(1).split("&"), void 0 === c) return e;
                    for (var f = 0, g = c.length; f < g; f += 1) d = c[f].split("="), e[d[0]] = d[1] || "true";
                    return e
                }, b.initialParams = b.getParams(), b
            }(c), t = function(a) {
                var b = {},
                    c = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        msTransition: "MSTransitionEnd",
                        transition: "transitionend"
                    };
                return b.DRAG_EVENTS = "dragstart dragmove dragend", b.TOUCH_EVENTS = "touchstart touchmove touchend touchcancel", b.TRANSITION_END_EVENTS = "webkitTransitionEnd oTransitionEnd MSTransitionEnd transitionend", b.TRANSITION_END_EVENT = function() {
                    return c[Modernizr.prefixed("transition")]
                }(), a.fn.emulateTransitionEnd = function(c) {
                    var d = !1,
                        e = this;
                    a(this).one(b.TRANSITION_END_EVENT, function() {
                        d = !0
                    });
                    var f = function() {
                        d || a(e).trigger(b.TRANSITION_END_EVENT)
                    };
                    setTimeout(f, c)
                }, b
            }(c), u = function(a, b, c) {
                function d(a, c) {
                    var d = b.$window.height(),
                        e = b.$window.width();
                    return void 0 === d || d !== c || void 0 === e || e !== a
                }

                function e() {
                    var a, e = this,
                        f = b.$window.height(),
                        g = b.$window.width();
                    e.isResizing === !1 && b.$body.addClass(i), d.call(e, e.MRT.width, e.MRT.height) && (e.MRT.CurrentQuery = c.getCurrentQuery(), a = {
                        mq: e.MRT.CurrentQuery,
                        width: e.MRT.width
                    }, b.$window.trigger(k.RESIZING, a), e.trigger(k.RESIZING, a), e.MRT.width = g, e.MRT.height = f)
                }

                function f() {
                    var a, e = this,
                        f = b.$window.height(),
                        g = b.$window.width();
                    d.call(e, e.MRT.finalWidth, e.MRT.finalHeight) && (b.$body.removeClass(i), e.MRT.CurrentQuery = c.getCurrentQuery(), e.MRT.width = b.$window.width(), e.MRT.height = b.$window.height(), a = {
                        mq: e.MRT.CurrentQuery,
                        width: e.MRT.width
                    }, b.$window.trigger(k.RESIZING_COMPLETE, a), e.trigger(k.RESIZING_COMPLETE, a), e.trigger(k.APP_CALC_OPEN_PARENTS), e.MRT.finalWidth = g, e.MRT.finalHeight = f)
                }

                function g() {
                    var a = this;
                    a.trigger(j.HASH_CHANGE)
                }
                var h, i = "is-resizing",
                    j = {
                        RESIZING: "resizing",
                        RESIZING_COMPLETE: "resizing:complete",
                        APP_CALC_OPEN_PARENTS: "app:calculateOpenParents",
                        HASH_CHANGE: "TCOM:hashchange",
                        INITIALIZE: "TCOM:initialize",
                        MRT_READY: "TCOM:ready",
                        RENDER: "render",
                        GLOBAL_READY: "GLOBAL:ready",
                        ZIPCODE_CHANGED: "zipcode:changed"
                    },
                    k = function(a) {
                        var b = this;
                        b.MRT = a, b.isResizing = !1
                    };
                return k = a.extend(k, j), h = k.prototype, h.initialize = function() {
                    var c = this,
                        d = b.$window,
                        h = a.bind(e, c),
                        i = a.bind(f, c),
                        j = a.bind(g, c);
                    return d.on("resize orientationchange", a.throttle(h, 100)).on("resize orientationchange", a.debounce(i, 300)).on("hashchange", a.debounce(j, 300)), c
                }, h.trigger = function(a, c) {
                    var d = this;
                    return b.$document.trigger(a, c), d
                }, h.on = function() {
                    var a = b.$document;
                    return a.on.apply(a, Array.prototype.slice.apply(arguments))
                }, h.off = function() {
                    var a = b.$document;
                    return a.off.apply(a, Array.prototype.slice.apply(arguments))
                }, h.one = function() {
                    var a = b.$document;
                    return a.one.apply(a, Array.prototype.slice.apply(arguments))
                }, k
            }(d, e, q), v = function(a) {
                function b(a) {
                    return {
                        trim: function(a) {
                            return _.isString(a) ? String.prototype.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "") : a
                        },
                        randomRange: function(a, b) {
                            return Math.round(Math.random() * (b - a) + a)
                        },
                        formatNumber: function(a) {
                            return String(a).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                        },
                        formatPrice: function(a, b) {
                            var c = this.toDollarAmount(a);
                            return 0 !== c || b ? this.toDollar(c) : ""
                        },
                        toDollarAmount: function(a) {
                            return parseInt(String(a).replace(/\$|\,|\.00/gi, ""), 10) || 0
                        },
                        toNumber: function(a) {
                            var b = String(a).replace(/^\D+|\,/g, ""),
                                c = parseInt(b, 10);
                            return !isNaN(c) && c || 0
                        },
                        toDollar: function(a) {
                            return "$" + this.formatNumber(a)
                        },
                        validateZipCode: function(a) {
                            return /^[0-9]{5}$/.test(a)
                        },
                        makeStrong: function(a) {
                            return "<strong>" + a + "</strong>"
                        },
                        mod: function(a, b) {
                            return a - b * Math.floor(a / b)
                        },
                        crush: function(b) {
                            return a.flatten(a.map(b, a.values))
                        }
                    }
                }
                return a.mixin(b(a)), b
            }(d), w = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
                TCOM = {
                    $: a,
                    _: b,
                    $app: f.$app,
                    $body: f.$body,
                    $document: f.$document,
                    $html: f.$html,
                    $window: f.$window,
                    Analytics: c,
                    CurrentQuery: o.getCurrentQuery(),
                    Disclaimers: {},
                    Events: new p(this).initialize(),
                    GeoPromise: a.Deferred(),
                    Geolocation: i,
                    Global: void 0,
                    PATH: "/tcom1",
                    RAQBridge: {},
                    Util: {
                        blanksrc: "/img/blank.gif",
                        en: !(this.es = "es" === this.lang),
                        env: g.name,
                        formatCurrency: function(a) {
                            return "$" + String(a).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        },
                        getCurrentQuery: o.getCurrentQuery,
                        host: g.host,
                        i18n: {
                            lang: j.getCurrentLocale()
                        },
                        isDev: !g.isProd,
                        isLegacy: function() {
                            var b = a(".app").attr("data-app-name");
                            return !b
                        },
                        isMobileLayout: o.isMobileLayout,
                        isSecure: g.isSecure(),
                        lang: j.getCurrentLocale(),
                        langPath: "es" === j.getCurrentLocale() ? "espanol/" : "",
                        legacyPicturefill: function() {
                            TCOM.$html.hasClass("lt-ie9") && a(".tcom-picture").not(".is-loaded").each(function() {
                                var b = a(this),
                                    c = b.find("source").first().attr("srcset");
                                b.find("img").attr("src", c), b.addClass("is-loaded")
                            })
                        },
                        loadScript: k.loadScript,
                        //lscs_base: "/ToyotaSite/rest/lscs/" + ("en" !== this.lang ? "es-US/" : "") + "getDocument?templatePath=templatedata/",
                        mq: o.mq,
                        newGuid: function() {},
                        site: g.site,
                        sslHost: g.sslHost,
                        updateHistory: function(a) {
                            a = a ? a : "";
                            var c = b.isArray(a) ? a.join("/") : a;
                            history.pushState ? history.pushState(null, null, "#!/" + c.toLowerCase()) : location.hash = "#!/" + c
                        },
                        updateTouchLinks: n.updateTouchLinks,
                        url: document.location.href,
                        useBuilt: function() {
                            return "local" !== this.env && !/useBuilt=false/g.test(document.cookie)
                        }()
                    },
                    VideoModalBridge: {},
                    analytics: c,
                    app: "",
                    appName: n.appName,
                    bodyData: f.bodyData,
                    cookie: e,
                    debug: g.isDebug(),
                    debugMode: g.isDebug(),
                    disclaimers: this.Disclaimers,
                    events: this.Events,
                    geoLocation: i,
                    globalReady: a.Deferred(),
                    height: f.$window.height(),
                    ie: f.$html.hasClass("ie"),
                    ie8: f.$html.hasClass("ie8"),
                    ie9: f.$html.hasClass("ie9"),
                    logger: {},
                    mbox: l,
                    params: d.getParams(),
                    path: "/tcom1",
                    site: g.site,
                    taglist: {},
                    util: this.Util,
                    version: "MRT",
                    width: f.$window.width(),
                    windowLoad: a.Deferred(),
                    getGlobal: function() {
                        var b = "/tcom-ui/organisms/tcom-global-header/js/tcom-global-header.js",
                            c = "/tcom-ui/organisms/tcom-global-footer/js/tcom-global-footer.js";
                        "function" == typeof window.define && window.define.amd && (b = "/tcom-ui/organisms/tcom-global-header/js/tcom-global-header.main.js", c = "/tcom-ui/organisms/tcom-global-footer/js/tcom-global-footer.main.js"), a.ajax({
                            url: b,
                            dataType: "script",
                            cache: !0
                        }), a.ajax({
                            url: c,
                            dataType: "script",
                            cache: !0
                        })
                    },
                    log: this.debug ? function() {
                        console && console.log.apply(console, arguments)
                    } : function() {}
                }, TCOM.Events = new p(TCOM).initialize(), window.TCOM = TCOM, TCOM.Events.trigger("TCOM:initialize"), TCOM.$window.on("hashchange", b.debounce(function(a) {
                    TCOM.Events.trigger("TCOM:hashchange")
                }, 300));
                var r = window.setTimeout(function() {
                    TCOM.windowLoad.resolve()
                }, 1e4);
                return TCOM.$window.one("load", function() {
                    window.clearTimeout(r), TCOM.windowLoad.resolve()
                }), m.subscribe("tcom.geolocation.zipcode.change", function(a) {
                    TCOM.Events.trigger("zipcode:changed", a.zipcode)
                }), TCOM.Util.legacyPicturefill(), "touch" === TCOM.site && (TCOM.Util.updateTouchLinks(TCOM.$body), TCOM.Events.on("render", function() {
                    TCOM.Util.updateTouchLinks(TCOM.$body)
                })), TCOM.Events.trigger("TCOM:ready"), TCOM
            }(c, d, r, s, g, e, f, t, l, m, n, o, i, p, q, u, v), x = void 0, ! function(a) {
                function b() {
                    this._events = {}, this._conf && c.call(this, this._conf)
                }

                function c(a) {
                    a && (this._conf = a, a.delimiter && (this.delimiter = a.delimiter), a.maxListeners && (this._events.maxListeners = a.maxListeners), a.wildcard && (this.wildcard = a.wildcard), a.newListener && (this.newListener = a.newListener), this.wildcard && (this.listenerTree = {}))
                }

                function d(a) {
                    this._events = {}, this.newListener = !1, c.call(this, a)
                }

                function e(a, b, c, d) {
                    if (!c) return [];
                    var f, g, h, i, j, k, l, m = [],
                        n = b.length,
                        o = b[d],
                        p = b[d + 1];
                    if (d === n && c._listeners) {
                        if ("function" == typeof c._listeners) return a && a.push(c._listeners), [c];
                        for (f = 0, g = c._listeners.length; f < g; f++) a && a.push(c._listeners[f]);
                        return [c]
                    }
                    if ("*" === o || "**" === o || c[o]) {
                        if ("*" === o) {
                            for (h in c) "_listeners" !== h && c.hasOwnProperty(h) && (m = m.concat(e(a, b, c[h], d + 1)));
                            return m
                        }
                        if ("**" === o) {
                            l = d + 1 === n || d + 2 === n && "*" === p, l && c._listeners && (m = m.concat(e(a, b, c, n)));
                            for (h in c) "_listeners" !== h && c.hasOwnProperty(h) && ("*" === h || "**" === h ? (c[h]._listeners && !l && (m = m.concat(e(a, b, c[h], n))), m = m.concat(e(a, b, c[h], d))) : m = h === p ? m.concat(e(a, b, c[h], d + 2)) : m.concat(e(a, b, c[h], d)));
                            return m
                        }
                        m = m.concat(e(a, b, c[o], d + 1))
                    }
                    if (i = c["*"], i && e(a, b, i, d + 1), j = c["**"])
                        if (d < n) {
                            j._listeners && e(a, b, j, n);
                            for (h in j) "_listeners" !== h && j.hasOwnProperty(h) && (h === p ? e(a, b, j[h], d + 2) : h === o ? e(a, b, j[h], d + 1) : (k = {}, k[h] = j[h], e(a, b, {
                                "**": k
                            }, d + 1)))
                        } else j._listeners ? e(a, b, j, n) : j["*"] && j["*"]._listeners && e(a, b, j["*"], n);
                    return m
                }

                function f(a, b) {
                    a = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                    for (var c = 0, d = a.length; c + 1 < d; c++)
                        if ("**" === a[c] && "**" === a[c + 1]) return;
                    for (var e = this.listenerTree, f = a.shift(); f;) {
                        if (e[f] || (e[f] = {}), e = e[f], 0 === a.length) {
                            if (e._listeners) {
                                if ("function" == typeof e._listeners) e._listeners = [e._listeners, b];
                                else if (g(e._listeners) && (e._listeners.push(b), !e._listeners.warned)) {
                                    var i = h;
                                    "undefined" != typeof this._events.maxListeners && (i = this._events.maxListeners), i > 0 && e._listeners.length > i && (e._listeners.warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", e._listeners.length), console.trace())
                                }
                            } else e._listeners = b;
                            return !0
                        }
                        f = a.shift()
                    }
                    return !0
                }
                var g = Array.isArray ? Array.isArray : function(a) {
                        return "[object Array]" === Object.prototype.toString.call(a)
                    },
                    h = 10;
                d.prototype.delimiter = ".", d.prototype.setMaxListeners = function(a) {
                    this._events || b.call(this), this._events.maxListeners = a, this._conf || (this._conf = {}), this._conf.maxListeners = a
                }, d.prototype.event = "", d.prototype.once = function(a, b) {
                    return this.many(a, 1, b), this
                }, d.prototype.many = function(a, b, c) {
                    function d() {
                        0 === --b && e.off(a, d), c.apply(this, arguments)
                    }
                    var e = this;
                    if ("function" != typeof c) throw new Error("many only accepts instances of Function");
                    return d._origin = c, this.on(a, d), e
                }, d.prototype.emit = function() {
                    this._events || b.call(this);
                    var a = arguments[0];
                    if ("newListener" === a && !this.newListener && !this._events.newListener) return !1;
                    if (this._all) {
                        for (var c = arguments.length, d = new Array(c - 1), f = 1; f < c; f++) d[f - 1] = arguments[f];
                        for (f = 0, c = this._all.length; f < c; f++) this.event = a, this._all[f].apply(this, d)
                    }
                    if ("error" === a && !(this._all || this._events.error || this.wildcard && this.listenerTree.error)) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
                    var g;
                    if (this.wildcard) {
                        g = [];
                        var h = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                        e.call(this, g, h, this.listenerTree, 0)
                    } else g = this._events[a];
                    if ("function" == typeof g) {
                        if (this.event = a, 1 === arguments.length) g.call(this);
                        else if (arguments.length > 1) switch (arguments.length) {
                            case 2:
                                g.call(this, arguments[1]);
                                break;
                            case 3:
                                g.call(this, arguments[1], arguments[2]);
                                break;
                            default:
                                for (var c = arguments.length, d = new Array(c - 1), f = 1; f < c; f++) d[f - 1] = arguments[f];
                                g.apply(this, d)
                        }
                        return !0
                    }
                    if (g) {
                        for (var c = arguments.length, d = new Array(c - 1), f = 1; f < c; f++) d[f - 1] = arguments[f];
                        for (var i = g.slice(), f = 0, c = i.length; f < c; f++) this.event = a, i[f].apply(this, d);
                        return i.length > 0 || !!this._all
                    }
                    return !!this._all
                }, d.prototype.on = function(a, c) {
                    if ("function" == typeof a) return this.onAny(a), this;
                    if ("function" != typeof c) throw new Error("on only accepts instances of Function");
                    if (this._events || b.call(this), this.emit("newListener", a, c), this.wildcard) return f.call(this, a, c), this;
                    if (this._events[a]) {
                        if ("function" == typeof this._events[a]) this._events[a] = [this._events[a], c];
                        else if (g(this._events[a]) && (this._events[a].push(c), !this._events[a].warned)) {
                            var d = h;
                            "undefined" != typeof this._events.maxListeners && (d = this._events.maxListeners), d > 0 && this._events[a].length > d && (this._events[a].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[a].length), console.trace())
                        }
                    } else this._events[a] = c;
                    return this
                }, d.prototype.onAny = function(a) {
                    if ("function" != typeof a) throw new Error("onAny only accepts instances of Function");
                    return this._all || (this._all = []), this._all.push(a), this
                }, d.prototype.addListener = d.prototype.on, d.prototype.off = function(a, b) {
                    if ("function" != typeof b) throw new Error("removeListener only takes instances of Function");
                    var c, d = [];
                    if (this.wildcard) {
                        var f = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                        d = e.call(this, null, f, this.listenerTree, 0)
                    } else {
                        if (!this._events[a]) return this;
                        c = this._events[a], d.push({
                            _listeners: c
                        })
                    }
                    for (var h = 0; h < d.length; h++) {
                        var i = d[h];
                        if (c = i._listeners, g(c)) {
                            for (var j = -1, k = 0, l = c.length; k < l; k++)
                                if (c[k] === b || c[k].listener && c[k].listener === b || c[k]._origin && c[k]._origin === b) {
                                    j = k;
                                    break
                                }
                            if (j < 0) continue;
                            return this.wildcard ? i._listeners.splice(j, 1) : this._events[a].splice(j, 1), 0 === c.length && (this.wildcard ? delete i._listeners : delete this._events[a]), this
                        }(c === b || c.listener && c.listener === b || c._origin && c._origin === b) && (this.wildcard ? delete i._listeners : delete this._events[a])
                    }
                    return this
                }, d.prototype.offAny = function(a) {
                    var b, c = 0,
                        d = 0;
                    if (a && this._all && this._all.length > 0) {
                        for (b = this._all, c = 0, d = b.length; c < d; c++)
                            if (a === b[c]) return b.splice(c, 1), this
                    } else this._all = [];
                    return this
                }, d.prototype.removeListener = d.prototype.off, d.prototype.removeAllListeners = function(a) {
                    if (0 === arguments.length) return !this._events || b.call(this), this;
                    if (this.wildcard)
                        for (var c = "string" == typeof a ? a.split(this.delimiter) : a.slice(), d = e.call(this, null, c, this.listenerTree, 0), f = 0; f < d.length; f++) {
                            var g = d[f];
                            g._listeners = null
                        } else {
                            if (!this._events[a]) return this;
                            this._events[a] = null
                        }
                    return this
                }, d.prototype.listeners = function(a) {
                    if (this.wildcard) {
                        var c = [],
                            d = "string" == typeof a ? a.split(this.delimiter) : a.slice();
                        return e.call(this, c, d, this.listenerTree, 0), c
                    }
                    return this._events || b.call(this), this._events[a] || (this._events[a] = []), g(this._events[a]) || (this._events[a] = [this._events[a]]), this._events[a]
                }, d.prototype.listenersAny = function() {
                    return this._all ? this._all : []
                }, y = function() {
                    return d
                }()
            }(), z = function(a) {
                return a
            }(y), A = function() {
                var a = {},
                    b = {},
                    c = 0;
                return a.add = function(a, d) {
                    return b[a + "_" + c] = !0, c += 1, this
                }, a.getAll = function() {
                    return b
                }, a
            }(), B = function(a, b, c, d) {
                var e = function(b) {
                    var c, f, g = this;
                    if (void 0 === b) throw TypeError("missing param `options` [Object]");
                    if (void 0 === b.el) {
                        if (b.render !== !0) throw TypeError("missing param options.el");
                        if (void 0 === g.Template) throw TypeError("missing Template");
                        c = a(g.Template(b.data))
                    } else c = b.el;
                    var h = {
                        wildcard: !0,
                        delimiter: ".",
                        newListener: !1,
                        maxListeners: 20
                    };
                    e.superclass.constructor.call(g, h),
                        c && "object" == typeof c && c.length ? (f = c, c = f[0]) : (f = a(c), c = f[0]), this.$el = f, this.el = c, g.options = a.extend({}, g._defaults || {}, b || {}, f.data()), g.components = [], d.add(g.id || "unknown", g), this.$el && this.$el.data("component", this), this.debug = g.options.debug || !1, g.debug && console.debug("DEBUG", g)
                };
                return b.inherits(e, c), e.prototype._defaults = {}, e.prototype.$ = function(a) {
                    return this.$el.find(a)
                }, e.prototype.attach = function(b) {
                    var c = this;
                    return c.components.push(b), b.onAny(a.proxy(c.bubbleEvent, c)), b
                }, e.prototype.detach = function(a) {
                    var b = this;
                    b.components.indexOf(a) && (a.offAny(b.bubbleEvent), b.components.splice(b.components.indexOf(a)))
                }, e.prototype.detachAll = function() {
                    var a = this;
                    _.each(a.components, function(b) {
                        b.offAny(a.bubbleEvent)
                    }), a.components = []
                }, e.prototype.bubbleEvent = function(a) {
                    var b = this;
                    a && b.emit(a.eventType, a)
                }, e
            }(c, p, z, A),     
			
             

			ba = function(a, b, c, d, e, f, g, h) {
                var i = {
                    Component: a,
                    lazyImages: b,
                    RAQBridge: c,
                    ScrollEvents: f,
                    scrollEvents: g,
                    scrollTransitions: h,
                    util: d,
                    viewport: e
                };
                return i
            }(B, W, X, Y, q, Z, $, aa), 
			ca = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
                var A = "0.0.1",
                    B = {};
                return B = {
                    VERSION: A,
                    appType: "rplus",
                    $: a,
                    _: _,
                    Handlebars: c,
                    analytics: f,
                    BaseApp: g,
                    browser: h,
                    cookie: j,
                    dom: i,
                    env: k,
                    EventEmitter: m,
                    events: l,
                    geolocation: n,
                    geoPromise: n.geoPromise,
                    headers: o,
                    i18n: p,
                    loader: q,
                    Mbox: r,
                    paths: s,
                    pubsub: t,
                    registry: u,
                    router: v,
                    services: w,
                    adapter: x,
                    util: y,
                    ui: z
                }, window.tcom = B, window.TCOM.mbox = r, window.TCOM.mbox.initialize(), B
            }(c, d, Handlebars, history, x, r, D, s, e, g, f, t, z, l, h, m, n, o, E, i, A, C, T, S, p, ba), 
			da = function(a) {
                return a
            }(ca)
    });
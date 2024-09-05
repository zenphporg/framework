!(function (t, r) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = r())
    : 'function' == typeof define && define.amd
      ? define(r)
      : ((t || self).route = r());
})(this, function () {
  function t() {
    try {
      var r = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (r) {}
    return (t = function () {
      return !!r;
    })();
  }
  function r(t) {
    var r = (function (t, r) {
      if ('object' != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var n = e.call(t, 'string');
        if ('object' != typeof n) return n;
        throw new TypeError('@@toPrimitive must return a primitive value.');
      }
      return String(t);
    })(t);
    return 'symbol' == typeof r ? r : String(r);
  }
  function e(t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        'value' in o && (o.writable = !0),
        Object.defineProperty(t, r(o.key), o);
    }
  }
  function n(t, r, n) {
    return r && e(t.prototype, r), n && e(t, n), Object.defineProperty(t, 'prototype', { writable: !1 }), t;
  }
  function o() {
    return (
      (o = Object.assign
        ? Object.assign.bind()
        : function (t) {
            for (var r = 1; r < arguments.length; r++) {
              var e = arguments[r];
              for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
            }
            return t;
          }),
      o.apply(this, arguments)
    );
  }
  function i(t) {
    return (
      (i = Object.setPrototypeOf
        ? Object.getPrototypeOf.bind()
        : function (t) {
            return t.__proto__ || Object.getPrototypeOf(t);
          }),
      i(t)
    );
  }
  function u(t, r) {
    return (
      (u = Object.setPrototypeOf
        ? Object.setPrototypeOf.bind()
        : function (t, r) {
            return (t.__proto__ = r), t;
          }),
      u(t, r)
    );
  }
  function f(r) {
    var e = 'function' == typeof Map ? new Map() : void 0;
    return (
      (f = function (r) {
        if (
          null === r ||
          !(function (t) {
            try {
              return -1 !== Function.toString.call(t).indexOf('[native code]');
            } catch (r) {
              return 'function' == typeof t;
            }
          })(r)
        )
          return r;
        if ('function' != typeof r) throw new TypeError('Super expression must either be null or a function');
        if (void 0 !== e) {
          if (e.has(r)) return e.get(r);
          e.set(r, n);
        }
        function n() {
          return (function (r, e, n) {
            if (t()) return Reflect.construct.apply(null, arguments);
            var o = [null];
            o.push.apply(o, e);
            var i = new (r.bind.apply(r, o))();
            return n && u(i, n.prototype), i;
          })(r, arguments, i(this).constructor);
        }
        return (
          (n.prototype = Object.create(r.prototype, {
            constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 },
          })),
          u(n, r)
        );
      }),
      f(r)
    );
  }
  var a = String.prototype.replace,
    c = /%20/g,
    l = 'RFC3986',
    s = {
      default: l,
      formatters: {
        RFC1738: function (t) {
          return a.call(t, c, '+');
        },
        RFC3986: function (t) {
          return String(t);
        },
      },
      RFC1738: 'RFC1738',
      RFC3986: l,
    },
    v = Object.prototype.hasOwnProperty,
    p = Array.isArray,
    y = (function () {
      for (var t = [], r = 0; r < 256; ++r) t.push('%' + ((r < 16 ? '0' : '') + r.toString(16)).toUpperCase());
      return t;
    })(),
    d = function (t, r) {
      for (var e = r && r.plainObjects ? Object.create(null) : {}, n = 0; n < t.length; ++n)
        void 0 !== t[n] && (e[n] = t[n]);
      return e;
    },
    b = {
      arrayToObject: d,
      assign: function (t, r) {
        return Object.keys(r).reduce(function (t, e) {
          return (t[e] = r[e]), t;
        }, t);
      },
      combine: function (t, r) {
        return [].concat(t, r);
      },
      compact: function (t) {
        for (var r = [{ obj: { o: t }, prop: 'o' }], e = [], n = 0; n < r.length; ++n)
          for (var o = r[n], i = o.obj[o.prop], u = Object.keys(i), f = 0; f < u.length; ++f) {
            var a = u[f],
              c = i[a];
            'object' == typeof c && null !== c && -1 === e.indexOf(c) && (r.push({ obj: i, prop: a }), e.push(c));
          }
        return (
          (function (t) {
            for (; t.length > 1; ) {
              var r = t.pop(),
                e = r.obj[r.prop];
              if (p(e)) {
                for (var n = [], o = 0; o < e.length; ++o) void 0 !== e[o] && n.push(e[o]);
                r.obj[r.prop] = n;
              }
            }
          })(r),
          t
        );
      },
      decode: function (t, r, e) {
        var n = t.replace(/\+/g, ' ');
        if ('iso-8859-1' === e) return n.replace(/%[0-9a-f]{2}/gi, unescape);
        try {
          return decodeURIComponent(n);
        } catch (t) {
          return n;
        }
      },
      encode: function (t, r, e, n, o) {
        if (0 === t.length) return t;
        var i = t;
        if (
          ('symbol' == typeof t ? (i = Symbol.prototype.toString.call(t)) : 'string' != typeof t && (i = String(t)),
          'iso-8859-1' === e)
        )
          return escape(i).replace(/%u[0-9a-f]{4}/gi, function (t) {
            return '%26%23' + parseInt(t.slice(2), 16) + '%3B';
          });
        for (var u = '', f = 0; f < i.length; ++f) {
          var a = i.charCodeAt(f);
          45 === a ||
          46 === a ||
          95 === a ||
          126 === a ||
          (a >= 48 && a <= 57) ||
          (a >= 65 && a <= 90) ||
          (a >= 97 && a <= 122) ||
          (o === s.RFC1738 && (40 === a || 41 === a))
            ? (u += i.charAt(f))
            : a < 128
              ? (u += y[a])
              : a < 2048
                ? (u += y[192 | (a >> 6)] + y[128 | (63 & a)])
                : a < 55296 || a >= 57344
                  ? (u += y[224 | (a >> 12)] + y[128 | ((a >> 6) & 63)] + y[128 | (63 & a)])
                  : ((a = 65536 + (((1023 & a) << 10) | (1023 & i.charCodeAt((f += 1))))),
                    (u +=
                      y[240 | (a >> 18)] + y[128 | ((a >> 12) & 63)] + y[128 | ((a >> 6) & 63)] + y[128 | (63 & a)]));
        }
        return u;
      },
      isBuffer: function (t) {
        return !(!t || 'object' != typeof t || !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t)));
      },
      isRegExp: function (t) {
        return '[object RegExp]' === Object.prototype.toString.call(t);
      },
      maybeMap: function (t, r) {
        if (p(t)) {
          for (var e = [], n = 0; n < t.length; n += 1) e.push(r(t[n]));
          return e;
        }
        return r(t);
      },
      merge: function t(r, e, n) {
        if (!e) return r;
        if ('object' != typeof e) {
          if (p(r)) r.push(e);
          else {
            if (!r || 'object' != typeof r) return [r, e];
            ((n && (n.plainObjects || n.allowPrototypes)) || !v.call(Object.prototype, e)) && (r[e] = !0);
          }
          return r;
        }
        if (!r || 'object' != typeof r) return [r].concat(e);
        var o = r;
        return (
          p(r) && !p(e) && (o = d(r, n)),
          p(r) && p(e)
            ? (e.forEach(function (e, o) {
                if (v.call(r, o)) {
                  var i = r[o];
                  i && 'object' == typeof i && e && 'object' == typeof e ? (r[o] = t(i, e, n)) : r.push(e);
                } else r[o] = e;
              }),
              r)
            : Object.keys(e).reduce(function (r, o) {
                var i = e[o];
                return (r[o] = v.call(r, o) ? t(r[o], i, n) : i), r;
              }, o)
        );
      },
    },
    h = Object.prototype.hasOwnProperty,
    g = {
      brackets: function (t) {
        return t + '[]';
      },
      comma: 'comma',
      indices: function (t, r) {
        return t + '[' + r + ']';
      },
      repeat: function (t) {
        return t;
      },
    },
    m = Array.isArray,
    j = String.prototype.split,
    w = Array.prototype.push,
    O = function (t, r) {
      w.apply(t, m(r) ? r : [r]);
    },
    E = Date.prototype.toISOString,
    S = s.default,
    R = {
      addQueryPrefix: !1,
      allowDots: !1,
      charset: 'utf-8',
      charsetSentinel: !1,
      delimiter: '&',
      encode: !0,
      encoder: b.encode,
      encodeValuesOnly: !1,
      format: S,
      formatter: s.formatters[S],
      indices: !1,
      serializeDate: function (t) {
        return E.call(t);
      },
      skipNulls: !1,
      strictNullHandling: !1,
    },
    k = function t(r, e, n, o, i, u, f, a, c, l, s, v, p, y) {
      var d,
        h = r;
      if (
        ('function' == typeof f
          ? (h = f(e, h))
          : h instanceof Date
            ? (h = l(h))
            : 'comma' === n &&
              m(h) &&
              (h = b.maybeMap(h, function (t) {
                return t instanceof Date ? l(t) : t;
              })),
        null === h)
      ) {
        if (o) return u && !p ? u(e, R.encoder, y, 'key', s) : e;
        h = '';
      }
      if (
        'string' == typeof (d = h) ||
        'number' == typeof d ||
        'boolean' == typeof d ||
        'symbol' == typeof d ||
        'bigint' == typeof d ||
        b.isBuffer(h)
      ) {
        if (u) {
          var g = p ? e : u(e, R.encoder, y, 'key', s);
          if ('comma' === n && p) {
            for (var w = j.call(String(h), ','), E = '', S = 0; S < w.length; ++S)
              E += (0 === S ? '' : ',') + v(u(w[S], R.encoder, y, 'value', s));
            return [v(g) + '=' + E];
          }
          return [v(g) + '=' + v(u(h, R.encoder, y, 'value', s))];
        }
        return [v(e) + '=' + v(String(h))];
      }
      var k,
        T = [];
      if (void 0 === h) return T;
      if ('comma' === n && m(h)) k = [{ value: h.length > 0 ? h.join(',') || null : void 0 }];
      else if (m(f)) k = f;
      else {
        var x = Object.keys(h);
        k = a ? x.sort(a) : x;
      }
      for (var N = 0; N < k.length; ++N) {
        var C = k[N],
          $ = 'object' == typeof C && void 0 !== C.value ? C.value : h[C];
        if (!i || null !== $) {
          var A = m(h) ? ('function' == typeof n ? n(e, C) : e) : e + (c ? '.' + C : '[' + C + ']');
          O(T, t($, A, n, o, i, u, f, a, c, l, s, v, p, y));
        }
      }
      return T;
    },
    T = Object.prototype.hasOwnProperty,
    x = Array.isArray,
    N = {
      allowDots: !1,
      allowPrototypes: !1,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: !1,
      comma: !1,
      decoder: b.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: !1,
      interpretNumericEntities: !1,
      parameterLimit: 1e3,
      parseArrays: !0,
      plainObjects: !1,
      strictNullHandling: !1,
    },
    C = function (t) {
      return t.replace(/&#(\d+);/g, function (t, r) {
        return String.fromCharCode(parseInt(r, 10));
      });
    },
    $ = function (t, r) {
      return t && 'string' == typeof t && r.comma && t.indexOf(',') > -1 ? t.split(',') : t;
    },
    A = function (t, r, e, n) {
      if (t) {
        var o = e.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
          i = /(\[[^[\]]*])/g,
          u = e.depth > 0 && /(\[[^[\]]*])/.exec(o),
          f = u ? o.slice(0, u.index) : o,
          a = [];
        if (f) {
          if (!e.plainObjects && T.call(Object.prototype, f) && !e.allowPrototypes) return;
          a.push(f);
        }
        for (var c = 0; e.depth > 0 && null !== (u = i.exec(o)) && c < e.depth; ) {
          if (((c += 1), !e.plainObjects && T.call(Object.prototype, u[1].slice(1, -1)) && !e.allowPrototypes)) return;
          a.push(u[1]);
        }
        return (
          u && a.push('[' + o.slice(u.index) + ']'),
          (function (t, r, e, n) {
            for (var o = n ? r : $(r, e), i = t.length - 1; i >= 0; --i) {
              var u,
                f = t[i];
              if ('[]' === f && e.parseArrays) u = [].concat(o);
              else {
                u = e.plainObjects ? Object.create(null) : {};
                var a = '[' === f.charAt(0) && ']' === f.charAt(f.length - 1) ? f.slice(1, -1) : f,
                  c = parseInt(a, 10);
                e.parseArrays || '' !== a
                  ? !isNaN(c) && f !== a && String(c) === a && c >= 0 && e.parseArrays && c <= e.arrayLimit
                    ? ((u = [])[c] = o)
                    : '__proto__' !== a && (u[a] = o)
                  : (u = { 0: o });
              }
              o = u;
            }
            return o;
          })(a, r, e, n)
        );
      }
    },
    D = function (t, r) {
      var e = (function (t) {
        if (!t) return N;
        if (null != t.decoder && 'function' != typeof t.decoder) throw new TypeError('Decoder has to be a function.');
        if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset)
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
        return {
          allowDots: void 0 === t.allowDots ? N.allowDots : !!t.allowDots,
          allowPrototypes: 'boolean' == typeof t.allowPrototypes ? t.allowPrototypes : N.allowPrototypes,
          arrayLimit: 'number' == typeof t.arrayLimit ? t.arrayLimit : N.arrayLimit,
          charset: void 0 === t.charset ? N.charset : t.charset,
          charsetSentinel: 'boolean' == typeof t.charsetSentinel ? t.charsetSentinel : N.charsetSentinel,
          comma: 'boolean' == typeof t.comma ? t.comma : N.comma,
          decoder: 'function' == typeof t.decoder ? t.decoder : N.decoder,
          delimiter: 'string' == typeof t.delimiter || b.isRegExp(t.delimiter) ? t.delimiter : N.delimiter,
          depth: 'number' == typeof t.depth || !1 === t.depth ? +t.depth : N.depth,
          ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
          interpretNumericEntities:
            'boolean' == typeof t.interpretNumericEntities ? t.interpretNumericEntities : N.interpretNumericEntities,
          parameterLimit: 'number' == typeof t.parameterLimit ? t.parameterLimit : N.parameterLimit,
          parseArrays: !1 !== t.parseArrays,
          plainObjects: 'boolean' == typeof t.plainObjects ? t.plainObjects : N.plainObjects,
          strictNullHandling: 'boolean' == typeof t.strictNullHandling ? t.strictNullHandling : N.strictNullHandling,
        };
      })(r);
      if ('' === t || null == t) return e.plainObjects ? Object.create(null) : {};
      for (
        var n =
            'string' == typeof t
              ? (function (t, r) {
                  var e,
                    n = {},
                    o = (r.ignoreQueryPrefix ? t.replace(/^\?/, '') : t).split(
                      r.delimiter,
                      Infinity === r.parameterLimit ? void 0 : r.parameterLimit
                    ),
                    i = -1,
                    u = r.charset;
                  if (r.charsetSentinel)
                    for (e = 0; e < o.length; ++e)
                      0 === o[e].indexOf('utf8=') &&
                        ('utf8=%E2%9C%93' === o[e]
                          ? (u = 'utf-8')
                          : 'utf8=%26%2310003%3B' === o[e] && (u = 'iso-8859-1'),
                        (i = e),
                        (e = o.length));
                  for (e = 0; e < o.length; ++e)
                    if (e !== i) {
                      var f,
                        a,
                        c = o[e],
                        l = c.indexOf(']='),
                        s = -1 === l ? c.indexOf('=') : l + 1;
                      -1 === s
                        ? ((f = r.decoder(c, N.decoder, u, 'key')), (a = r.strictNullHandling ? null : ''))
                        : ((f = r.decoder(c.slice(0, s), N.decoder, u, 'key')),
                          (a = b.maybeMap($(c.slice(s + 1), r), function (t) {
                            return r.decoder(t, N.decoder, u, 'value');
                          }))),
                        a && r.interpretNumericEntities && 'iso-8859-1' === u && (a = C(a)),
                        c.indexOf('[]=') > -1 && (a = x(a) ? [a] : a),
                        (n[f] = T.call(n, f) ? b.combine(n[f], a) : a);
                    }
                  return n;
                })(t, e)
              : t,
          o = e.plainObjects ? Object.create(null) : {},
          i = Object.keys(n),
          u = 0;
        u < i.length;
        ++u
      ) {
        var f = i[u],
          a = A(f, n[f], e, 'string' == typeof t);
        o = b.merge(o, a, e);
      }
      return b.compact(o);
    },
    P = /*#__PURE__*/ (function () {
      function t(t, r, e) {
        var n, o;
        (this.name = t),
          (this.definition = r),
          (this.bindings = null != (n = r.bindings) ? n : {}),
          (this.wheres = null != (o = r.wheres) ? o : {}),
          (this.config = e);
      }
      var r = t.prototype;
      return (
        (r.matchesUrl = function (t) {
          var r = this;
          if (!this.definition.methods.includes('GET')) return !1;
          var e = this.template
              .replace(/(\/?){([^}?]*)(\??)}/g, function (t, e, n, o) {
                var i,
                  u =
                    '(?<' +
                    n +
                    '>' +
                    ((null == (i = r.wheres[n]) ? void 0 : i.replace(/(^\^)|(\$$)/g, '')) || '[^/?]+') +
                    ')';
                return o ? '(' + e + u + ')?' : '' + e + u;
              })
              .replace(/^\w+:\/\//, ''),
            n = t.replace(/^\w+:\/\//, '').split('?'),
            o = n[0],
            i = n[1],
            u = new RegExp('^' + e + '/?$').exec(decodeURI(o));
          if (u) {
            for (var f in u.groups)
              u.groups[f] = 'string' == typeof u.groups[f] ? decodeURIComponent(u.groups[f]) : u.groups[f];
            return { params: u.groups, query: D(i) };
          }
          return !1;
        }),
        (r.compile = function (t) {
          var r = this;
          return this.parameterSegments.length
            ? this.template
                .replace(/{([^}?]+)(\??)}/g, function (e, n, o) {
                  var i, u;
                  if (!o && [null, void 0].includes(t[n]))
                    throw new Error("Ziggy error: '" + n + "' parameter is required for route '" + r.name + "'.");
                  if (
                    r.wheres[n] &&
                    !new RegExp('^' + (o ? '(' + r.wheres[n] + ')?' : r.wheres[n]) + '$').test(
                      null != (u = t[n]) ? u : ''
                    )
                  )
                    throw new Error(
                      "Ziggy error: '" +
                        n +
                        "' parameter '" +
                        t[n] +
                        "' does not match required format '" +
                        r.wheres[n] +
                        "' for route '" +
                        r.name +
                        "'."
                    );
                  return encodeURI(null != (i = t[n]) ? i : '')
                    .replace(/%7C/g, '|')
                    .replace(/%25/g, '%')
                    .replace(/\$/g, '%24');
                })
                .replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, '$1/')
                .replace(/\/+$/, '')
            : this.template;
        }),
        n(t, [
          {
            key: 'template',
            get: function () {
              var t = (this.origin + '/' + this.definition.uri).replace(/\/+$/, '');
              return '' === t ? '/' : t;
            },
          },
          {
            key: 'origin',
            get: function () {
              return this.config.absolute
                ? this.definition.domain
                  ? '' +
                    this.config.url.match(/^\w+:\/\//)[0] +
                    this.definition.domain +
                    (this.config.port ? ':' + this.config.port : '')
                  : this.config.url
                : '';
            },
          },
          {
            key: 'parameterSegments',
            get: function () {
              var t, r;
              return null !=
                (t =
                  null == (r = this.template.match(/{[^}?]+\??}/g))
                    ? void 0
                    : r.map(function (t) {
                        return { name: t.replace(/{|\??}/g, ''), required: !/\?}$/.test(t) };
                      }))
                ? t
                : [];
            },
          },
        ]),
        t
      );
    })(),
    F = /*#__PURE__*/ (function (t) {
      var r, e;
      function i(r, e, n, i) {
        var u;
        if (
          (void 0 === n && (n = !0),
          ((u = t.call(this) || this).t =
            null != i ? i : 'undefined' != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy),
          (u.t = o({}, u.t, { absolute: n })),
          r)
        ) {
          if (!u.t.routes[r]) throw new Error("Ziggy error: route '" + r + "' is not in the route list.");
          (u.i = new P(r, u.t.routes[r], u.t)), (u.u = u.l(e));
        }
        return u;
      }
      (e = t), ((r = i).prototype = Object.create(e.prototype)), (r.prototype.constructor = r), u(r, e);
      var f = i.prototype;
      return (
        (f.toString = function () {
          var t = this,
            r = Object.keys(this.u)
              .filter(function (r) {
                return !t.i.parameterSegments.some(function (t) {
                  return t.name === r;
                });
              })
              .filter(function (t) {
                return '_query' !== t;
              })
              .reduce(function (r, e) {
                var n;
                return o({}, r, (((n = {})[e] = t.u[e]), n));
              }, {});
          return (
            this.i.compile(this.u) +
            (function (t, r) {
              var e,
                n = t,
                o = (function (t) {
                  if (!t) return R;
                  if (null != t.encoder && 'function' != typeof t.encoder)
                    throw new TypeError('Encoder has to be a function.');
                  var r = t.charset || R.charset;
                  if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset)
                    throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
                  var e = s.default;
                  if (void 0 !== t.format) {
                    if (!h.call(s.formatters, t.format)) throw new TypeError('Unknown format option provided.');
                    e = t.format;
                  }
                  var n = s.formatters[e],
                    o = R.filter;
                  return (
                    ('function' == typeof t.filter || m(t.filter)) && (o = t.filter),
                    {
                      addQueryPrefix: 'boolean' == typeof t.addQueryPrefix ? t.addQueryPrefix : R.addQueryPrefix,
                      allowDots: void 0 === t.allowDots ? R.allowDots : !!t.allowDots,
                      charset: r,
                      charsetSentinel: 'boolean' == typeof t.charsetSentinel ? t.charsetSentinel : R.charsetSentinel,
                      delimiter: void 0 === t.delimiter ? R.delimiter : t.delimiter,
                      encode: 'boolean' == typeof t.encode ? t.encode : R.encode,
                      encoder: 'function' == typeof t.encoder ? t.encoder : R.encoder,
                      encodeValuesOnly:
                        'boolean' == typeof t.encodeValuesOnly ? t.encodeValuesOnly : R.encodeValuesOnly,
                      filter: o,
                      format: e,
                      formatter: n,
                      serializeDate: 'function' == typeof t.serializeDate ? t.serializeDate : R.serializeDate,
                      skipNulls: 'boolean' == typeof t.skipNulls ? t.skipNulls : R.skipNulls,
                      sort: 'function' == typeof t.sort ? t.sort : null,
                      strictNullHandling:
                        'boolean' == typeof t.strictNullHandling ? t.strictNullHandling : R.strictNullHandling,
                    }
                  );
                })(r);
              'function' == typeof o.filter ? (n = (0, o.filter)('', n)) : m(o.filter) && (e = o.filter);
              var i = [];
              if ('object' != typeof n || null === n) return '';
              var u =
                g[
                  r && r.arrayFormat in g
                    ? r.arrayFormat
                    : r && 'indices' in r
                      ? r.indices
                        ? 'indices'
                        : 'repeat'
                      : 'indices'
                ];
              e || (e = Object.keys(n)), o.sort && e.sort(o.sort);
              for (var f = 0; f < e.length; ++f) {
                var a = e[f];
                (o.skipNulls && null === n[a]) ||
                  O(
                    i,
                    k(
                      n[a],
                      a,
                      u,
                      o.strictNullHandling,
                      o.skipNulls,
                      o.encode ? o.encoder : null,
                      o.filter,
                      o.sort,
                      o.allowDots,
                      o.serializeDate,
                      o.format,
                      o.formatter,
                      o.encodeValuesOnly,
                      o.charset
                    )
                  );
              }
              var c = i.join(o.delimiter),
                l = !0 === o.addQueryPrefix ? '?' : '';
              return (
                o.charsetSentinel && (l += 'iso-8859-1' === o.charset ? 'utf8=%26%2310003%3B&' : 'utf8=%E2%9C%93&'),
                c.length > 0 ? l + c : ''
              );
            })(o({}, r, this.u._query), {
              addQueryPrefix: !0,
              arrayFormat: 'indices',
              encodeValuesOnly: !0,
              skipNulls: !0,
              encoder: function (t, r) {
                return 'boolean' == typeof t ? Number(t) : r(t);
              },
            })
          );
        }),
        (f.v = function (t) {
          var r = this;
          t ? this.t.absolute && t.startsWith('/') && (t = this.p().host + t) : (t = this.h());
          var e = {},
            n = Object.entries(this.t.routes).find(function (n) {
              return (e = new P(n[0], n[1], r.t).matchesUrl(t));
            }) || [void 0, void 0];
          return o({ name: n[0] }, e, { route: n[1] });
        }),
        (f.h = function () {
          var t = this.p(),
            r = t.pathname,
            e = t.search;
          return (
            (this.t.absolute
              ? t.host + r
              : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ''), '').replace(/^\/+/, '/')) + e
          );
        }),
        (f.current = function (t, r) {
          var e = this.v(),
            n = e.name,
            i = e.params,
            u = e.query,
            f = e.route;
          if (!t) return n;
          var a = new RegExp('^' + t.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$').test(n);
          if ([null, void 0].includes(r) || !a) return a;
          var c = new P(n, f, this.t);
          r = this.l(r, c);
          var l = o({}, i, u);
          return (
            !(
              !Object.values(r).every(function (t) {
                return !t;
              }) ||
              Object.values(l).some(function (t) {
                return void 0 !== t;
              })
            ) ||
            (function t(r, e) {
              return Object.entries(r).every(function (r) {
                var n = r[0],
                  o = r[1];
                return Array.isArray(o) && Array.isArray(e[n])
                  ? o.every(function (t) {
                      return e[n].includes(t);
                    })
                  : 'object' == typeof o && 'object' == typeof e[n] && null !== o && null !== e[n]
                    ? t(o, e[n])
                    : e[n] == o;
              });
            })(r, l)
          );
        }),
        (f.p = function () {
          var t,
            r,
            e,
            n,
            o,
            i,
            u = 'undefined' != typeof window ? window.location : {},
            f = u.host,
            a = u.pathname,
            c = u.search;
          return {
            host: null != (t = null == (r = this.t.location) ? void 0 : r.host) ? t : void 0 === f ? '' : f,
            pathname: null != (e = null == (n = this.t.location) ? void 0 : n.pathname) ? e : void 0 === a ? '' : a,
            search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : void 0 === c ? '' : c,
          };
        }),
        (f.has = function (t) {
          return Object.keys(this.t.routes).includes(t);
        }),
        (f.l = function (t, r) {
          var e = this;
          void 0 === t && (t = {}),
            void 0 === r && (r = this.i),
            null != t || (t = {}),
            (t = ['string', 'number'].includes(typeof t) ? [t] : t);
          var n = r.parameterSegments.filter(function (t) {
            return !e.t.defaults[t.name];
          });
          if (Array.isArray(t))
            t = t.reduce(function (t, r, e) {
              var i, u;
              return o(
                {},
                t,
                n[e] ? (((i = {})[n[e].name] = r), i) : 'object' == typeof r ? r : (((u = {})[r] = ''), u)
              );
            }, {});
          else if (
            1 === n.length &&
            !t[n[0].name] &&
            (t.hasOwnProperty(Object.values(r.bindings)[0]) || t.hasOwnProperty('id'))
          ) {
            var i;
            ((i = {})[n[0].name] = t), (t = i);
          }
          return o({}, this.m(r), this.j(t, r));
        }),
        (f.m = function (t) {
          var r = this;
          return t.parameterSegments
            .filter(function (t) {
              return r.t.defaults[t.name];
            })
            .reduce(function (t, e, n) {
              var i,
                u = e.name;
              return o({}, t, (((i = {})[u] = r.t.defaults[u]), i));
            }, {});
        }),
        (f.j = function (t, r) {
          var e = r.bindings,
            n = r.parameterSegments;
          return Object.entries(t).reduce(function (t, r) {
            var i,
              u,
              f = r[0],
              a = r[1];
            if (
              !a ||
              'object' != typeof a ||
              Array.isArray(a) ||
              !n.some(function (t) {
                return t.name === f;
              })
            )
              return o({}, t, (((u = {})[f] = a), u));
            if (!a.hasOwnProperty(e[f])) {
              if (!a.hasOwnProperty('id'))
                throw new Error(
                  "Ziggy error: object passed as '" +
                    f +
                    "' parameter is missing route model binding key '" +
                    e[f] +
                    "'."
                );
              e[f] = 'id';
            }
            return o({}, t, (((i = {})[f] = a[e[f]]), i));
          }, {});
        }),
        (f.valueOf = function () {
          return this.toString();
        }),
        n(i, [
          {
            key: 'params',
            get: function () {
              var t = this.v();
              return o({}, t.params, t.query);
            },
          },
          {
            key: 'routeParams',
            get: function () {
              return this.v().params;
            },
          },
          {
            key: 'queryParams',
            get: function () {
              return this.v().query;
            },
          },
        ]),
        i
      );
    })(/*#__PURE__*/ f(String));
  return function (t, r, e, n) {
    var o = new F(t, r, e, n);
    return t ? o.toString() : o;
  };
});

function r() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (r = function () {
    return !!t;
  })();
}
function t(r) {
  var t = (function (r, t) {
    if ('object' != typeof r || !r) return r;
    var n = r[Symbol.toPrimitive];
    if (void 0 !== n) {
      var e = n.call(r, 'string');
      if ('object' != typeof e) return e;
      throw new TypeError('@@toPrimitive must return a primitive value.');
    }
    return String(r);
  })(r);
  return 'symbol' == typeof t ? t : String(t);
}
function n(r, n) {
  for (var e = 0; e < n.length; e++) {
    var o = n[e];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(r, t(o.key), o);
  }
}
function e(r, t, e) {
  return t && n(r.prototype, t), e && n(r, e), Object.defineProperty(r, 'prototype', { writable: !1 }), r;
}
function o() {
  return (
    (o = Object.assign
      ? Object.assign.bind()
      : function (r) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var e in n) Object.prototype.hasOwnProperty.call(n, e) && (r[e] = n[e]);
          }
          return r;
        }),
    o.apply(this, arguments)
  );
}
function i(r) {
  return (
    (i = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        }),
    i(r)
  );
}
function u(r, t) {
  return (
    (u = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (r, t) {
          return (r.__proto__ = t), r;
        }),
    u(r, t)
  );
}
function f(t) {
  var n = 'function' == typeof Map ? new Map() : void 0;
  return (
    (f = function (t) {
      if (
        null === t ||
        !(function (r) {
          try {
            return -1 !== Function.toString.call(r).indexOf('[native code]');
          } catch (t) {
            return 'function' == typeof r;
          }
        })(t)
      )
        return t;
      if ('function' != typeof t) throw new TypeError('Super expression must either be null or a function');
      if (void 0 !== n) {
        if (n.has(t)) return n.get(t);
        n.set(t, e);
      }
      function e() {
        return (function (t, n, e) {
          if (r()) return Reflect.construct.apply(null, arguments);
          var o = [null];
          o.push.apply(o, n);
          var i = new (t.bind.apply(t, o))();
          return e && u(i, e.prototype), i;
        })(t, arguments, i(this).constructor);
      }
      return (
        (e.prototype = Object.create(t.prototype, {
          constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
        })),
        u(e, t)
      );
    }),
    f(t)
  );
}
var a = String.prototype.replace,
  c = /%20/g,
  l = 'RFC3986',
  s = {
    default: l,
    formatters: {
      RFC1738: function (r) {
        return a.call(r, c, '+');
      },
      RFC3986: function (r) {
        return String(r);
      },
    },
    RFC1738: 'RFC1738',
    RFC3986: l,
  },
  v = Object.prototype.hasOwnProperty,
  y = Array.isArray,
  p = (function () {
    for (var r = [], t = 0; t < 256; ++t) r.push('%' + ((t < 16 ? '0' : '') + t.toString(16)).toUpperCase());
    return r;
  })(),
  d = function (r, t) {
    for (var n = t && t.plainObjects ? Object.create(null) : {}, e = 0; e < r.length; ++e)
      void 0 !== r[e] && (n[e] = r[e]);
    return n;
  },
  b = {
    arrayToObject: d,
    assign: function (r, t) {
      return Object.keys(t).reduce(function (r, n) {
        return (r[n] = t[n]), r;
      }, r);
    },
    combine: function (r, t) {
      return [].concat(r, t);
    },
    compact: function (r) {
      for (var t = [{ obj: { o: r }, prop: 'o' }], n = [], e = 0; e < t.length; ++e)
        for (var o = t[e], i = o.obj[o.prop], u = Object.keys(i), f = 0; f < u.length; ++f) {
          var a = u[f],
            c = i[a];
          'object' == typeof c && null !== c && -1 === n.indexOf(c) && (t.push({ obj: i, prop: a }), n.push(c));
        }
      return (
        (function (r) {
          for (; r.length > 1; ) {
            var t = r.pop(),
              n = t.obj[t.prop];
            if (y(n)) {
              for (var e = [], o = 0; o < n.length; ++o) void 0 !== n[o] && e.push(n[o]);
              t.obj[t.prop] = e;
            }
          }
        })(t),
        r
      );
    },
    decode: function (r, t, n) {
      var e = r.replace(/\+/g, ' ');
      if ('iso-8859-1' === n) return e.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(e);
      } catch (r) {
        return e;
      }
    },
    encode: function (r, t, n, e, o) {
      if (0 === r.length) return r;
      var i = r;
      if (
        ('symbol' == typeof r ? (i = Symbol.prototype.toString.call(r)) : 'string' != typeof r && (i = String(r)),
        'iso-8859-1' === n)
      )
        return escape(i).replace(/%u[0-9a-f]{4}/gi, function (r) {
          return '%26%23' + parseInt(r.slice(2), 16) + '%3B';
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
            ? (u += p[a])
            : a < 2048
              ? (u += p[192 | (a >> 6)] + p[128 | (63 & a)])
              : a < 55296 || a >= 57344
                ? (u += p[224 | (a >> 12)] + p[128 | ((a >> 6) & 63)] + p[128 | (63 & a)])
                : ((a = 65536 + (((1023 & a) << 10) | (1023 & i.charCodeAt((f += 1))))),
                  (u += p[240 | (a >> 18)] + p[128 | ((a >> 12) & 63)] + p[128 | ((a >> 6) & 63)] + p[128 | (63 & a)]));
      }
      return u;
    },
    isBuffer: function (r) {
      return !(!r || 'object' != typeof r || !(r.constructor && r.constructor.isBuffer && r.constructor.isBuffer(r)));
    },
    isRegExp: function (r) {
      return '[object RegExp]' === Object.prototype.toString.call(r);
    },
    maybeMap: function (r, t) {
      if (y(r)) {
        for (var n = [], e = 0; e < r.length; e += 1) n.push(t(r[e]));
        return n;
      }
      return t(r);
    },
    merge: function r(t, n, e) {
      if (!n) return t;
      if ('object' != typeof n) {
        if (y(t)) t.push(n);
        else {
          if (!t || 'object' != typeof t) return [t, n];
          ((e && (e.plainObjects || e.allowPrototypes)) || !v.call(Object.prototype, n)) && (t[n] = !0);
        }
        return t;
      }
      if (!t || 'object' != typeof t) return [t].concat(n);
      var o = t;
      return (
        y(t) && !y(n) && (o = d(t, e)),
        y(t) && y(n)
          ? (n.forEach(function (n, o) {
              if (v.call(t, o)) {
                var i = t[o];
                i && 'object' == typeof i && n && 'object' == typeof n ? (t[o] = r(i, n, e)) : t.push(n);
              } else t[o] = n;
            }),
            t)
          : Object.keys(n).reduce(function (t, o) {
              var i = n[o];
              return (t[o] = v.call(t, o) ? r(t[o], i, e) : i), t;
            }, o)
      );
    },
  },
  h = Object.prototype.hasOwnProperty,
  g = {
    brackets: function (r) {
      return r + '[]';
    },
    comma: 'comma',
    indices: function (r, t) {
      return r + '[' + t + ']';
    },
    repeat: function (r) {
      return r;
    },
  },
  m = Array.isArray,
  j = String.prototype.split,
  w = Array.prototype.push,
  O = function (r, t) {
    w.apply(r, m(t) ? t : [t]);
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
    serializeDate: function (r) {
      return E.call(r);
    },
    skipNulls: !1,
    strictNullHandling: !1,
  },
  k = function r(t, n, e, o, i, u, f, a, c, l, s, v, y, p) {
    var d,
      h = t;
    if (
      ('function' == typeof f
        ? (h = f(n, h))
        : h instanceof Date
          ? (h = l(h))
          : 'comma' === e &&
            m(h) &&
            (h = b.maybeMap(h, function (r) {
              return r instanceof Date ? l(r) : r;
            })),
      null === h)
    ) {
      if (o) return u && !y ? u(n, R.encoder, p, 'key', s) : n;
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
        var g = y ? n : u(n, R.encoder, p, 'key', s);
        if ('comma' === e && y) {
          for (var w = j.call(String(h), ','), E = '', S = 0; S < w.length; ++S)
            E += (0 === S ? '' : ',') + v(u(w[S], R.encoder, p, 'value', s));
          return [v(g) + '=' + E];
        }
        return [v(g) + '=' + v(u(h, R.encoder, p, 'value', s))];
      }
      return [v(n) + '=' + v(String(h))];
    }
    var k,
      T = [];
    if (void 0 === h) return T;
    if ('comma' === e && m(h)) k = [{ value: h.length > 0 ? h.join(',') || null : void 0 }];
    else if (m(f)) k = f;
    else {
      var x = Object.keys(h);
      k = a ? x.sort(a) : x;
    }
    for (var N = 0; N < k.length; ++N) {
      var C = k[N],
        $ = 'object' == typeof C && void 0 !== C.value ? C.value : h[C];
      if (!i || null !== $) {
        var A = m(h) ? ('function' == typeof e ? e(n, C) : n) : n + (c ? '.' + C : '[' + C + ']');
        O(T, r($, A, e, o, i, u, f, a, c, l, s, v, y, p));
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
  C = function (r) {
    return r.replace(/&#(\d+);/g, function (r, t) {
      return String.fromCharCode(parseInt(t, 10));
    });
  },
  $ = function (r, t) {
    return r && 'string' == typeof r && t.comma && r.indexOf(',') > -1 ? r.split(',') : r;
  },
  A = function (r, t, n, e) {
    if (r) {
      var o = n.allowDots ? r.replace(/\.([^.[]+)/g, '[$1]') : r,
        i = /(\[[^[\]]*])/g,
        u = n.depth > 0 && /(\[[^[\]]*])/.exec(o),
        f = u ? o.slice(0, u.index) : o,
        a = [];
      if (f) {
        if (!n.plainObjects && T.call(Object.prototype, f) && !n.allowPrototypes) return;
        a.push(f);
      }
      for (var c = 0; n.depth > 0 && null !== (u = i.exec(o)) && c < n.depth; ) {
        if (((c += 1), !n.plainObjects && T.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes)) return;
        a.push(u[1]);
      }
      return (
        u && a.push('[' + o.slice(u.index) + ']'),
        (function (r, t, n, e) {
          for (var o = e ? t : $(t, n), i = r.length - 1; i >= 0; --i) {
            var u,
              f = r[i];
            if ('[]' === f && n.parseArrays) u = [].concat(o);
            else {
              u = n.plainObjects ? Object.create(null) : {};
              var a = '[' === f.charAt(0) && ']' === f.charAt(f.length - 1) ? f.slice(1, -1) : f,
                c = parseInt(a, 10);
              n.parseArrays || '' !== a
                ? !isNaN(c) && f !== a && String(c) === a && c >= 0 && n.parseArrays && c <= n.arrayLimit
                  ? ((u = [])[c] = o)
                  : '__proto__' !== a && (u[a] = o)
                : (u = { 0: o });
            }
            o = u;
          }
          return o;
        })(a, t, n, e)
      );
    }
  },
  D = function (r, t) {
    var n = (function (r) {
      if (!r) return N;
      if (null != r.decoder && 'function' != typeof r.decoder) throw new TypeError('Decoder has to be a function.');
      if (void 0 !== r.charset && 'utf-8' !== r.charset && 'iso-8859-1' !== r.charset)
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      return {
        allowDots: void 0 === r.allowDots ? N.allowDots : !!r.allowDots,
        allowPrototypes: 'boolean' == typeof r.allowPrototypes ? r.allowPrototypes : N.allowPrototypes,
        arrayLimit: 'number' == typeof r.arrayLimit ? r.arrayLimit : N.arrayLimit,
        charset: void 0 === r.charset ? N.charset : r.charset,
        charsetSentinel: 'boolean' == typeof r.charsetSentinel ? r.charsetSentinel : N.charsetSentinel,
        comma: 'boolean' == typeof r.comma ? r.comma : N.comma,
        decoder: 'function' == typeof r.decoder ? r.decoder : N.decoder,
        delimiter: 'string' == typeof r.delimiter || b.isRegExp(r.delimiter) ? r.delimiter : N.delimiter,
        depth: 'number' == typeof r.depth || !1 === r.depth ? +r.depth : N.depth,
        ignoreQueryPrefix: !0 === r.ignoreQueryPrefix,
        interpretNumericEntities:
          'boolean' == typeof r.interpretNumericEntities ? r.interpretNumericEntities : N.interpretNumericEntities,
        parameterLimit: 'number' == typeof r.parameterLimit ? r.parameterLimit : N.parameterLimit,
        parseArrays: !1 !== r.parseArrays,
        plainObjects: 'boolean' == typeof r.plainObjects ? r.plainObjects : N.plainObjects,
        strictNullHandling: 'boolean' == typeof r.strictNullHandling ? r.strictNullHandling : N.strictNullHandling,
      };
    })(t);
    if ('' === r || null == r) return n.plainObjects ? Object.create(null) : {};
    for (
      var e =
          'string' == typeof r
            ? (function (r, t) {
                var n,
                  e = {},
                  o = (t.ignoreQueryPrefix ? r.replace(/^\?/, '') : r).split(
                    t.delimiter,
                    Infinity === t.parameterLimit ? void 0 : t.parameterLimit
                  ),
                  i = -1,
                  u = t.charset;
                if (t.charsetSentinel)
                  for (n = 0; n < o.length; ++n)
                    0 === o[n].indexOf('utf8=') &&
                      ('utf8=%E2%9C%93' === o[n] ? (u = 'utf-8') : 'utf8=%26%2310003%3B' === o[n] && (u = 'iso-8859-1'),
                      (i = n),
                      (n = o.length));
                for (n = 0; n < o.length; ++n)
                  if (n !== i) {
                    var f,
                      a,
                      c = o[n],
                      l = c.indexOf(']='),
                      s = -1 === l ? c.indexOf('=') : l + 1;
                    -1 === s
                      ? ((f = t.decoder(c, N.decoder, u, 'key')), (a = t.strictNullHandling ? null : ''))
                      : ((f = t.decoder(c.slice(0, s), N.decoder, u, 'key')),
                        (a = b.maybeMap($(c.slice(s + 1), t), function (r) {
                          return t.decoder(r, N.decoder, u, 'value');
                        }))),
                      a && t.interpretNumericEntities && 'iso-8859-1' === u && (a = C(a)),
                      c.indexOf('[]=') > -1 && (a = x(a) ? [a] : a),
                      (e[f] = T.call(e, f) ? b.combine(e[f], a) : a);
                  }
                return e;
              })(r, n)
            : r,
        o = n.plainObjects ? Object.create(null) : {},
        i = Object.keys(e),
        u = 0;
      u < i.length;
      ++u
    ) {
      var f = i[u],
        a = A(f, e[f], n, 'string' == typeof r);
      o = b.merge(o, a, n);
    }
    return b.compact(o);
  },
  P = /*#__PURE__*/ (function () {
    function r(r, t, n) {
      var e, o;
      (this.name = r),
        (this.definition = t),
        (this.bindings = null != (e = t.bindings) ? e : {}),
        (this.wheres = null != (o = t.wheres) ? o : {}),
        (this.config = n);
    }
    var t = r.prototype;
    return (
      (t.matchesUrl = function (r) {
        var t = this;
        if (!this.definition.methods.includes('GET')) return !1;
        var n = this.template
            .replace(/(\/?){([^}?]*)(\??)}/g, function (r, n, e, o) {
              var i,
                u =
                  '(?<' +
                  e +
                  '>' +
                  ((null == (i = t.wheres[e]) ? void 0 : i.replace(/(^\^)|(\$$)/g, '')) || '[^/?]+') +
                  ')';
              return o ? '(' + n + u + ')?' : '' + n + u;
            })
            .replace(/^\w+:\/\//, ''),
          e = r.replace(/^\w+:\/\//, '').split('?'),
          o = e[0],
          i = e[1],
          u = new RegExp('^' + n + '/?$').exec(decodeURI(o));
        if (u) {
          for (var f in u.groups)
            u.groups[f] = 'string' == typeof u.groups[f] ? decodeURIComponent(u.groups[f]) : u.groups[f];
          return { params: u.groups, query: D(i) };
        }
        return !1;
      }),
      (t.compile = function (r) {
        var t = this;
        return this.parameterSegments.length
          ? this.template
              .replace(/{([^}?]+)(\??)}/g, function (n, e, o) {
                var i, u;
                if (!o && [null, void 0].includes(r[e]))
                  throw new Error("Ziggy error: '" + e + "' parameter is required for route '" + t.name + "'.");
                if (
                  t.wheres[e] &&
                  !new RegExp('^' + (o ? '(' + t.wheres[e] + ')?' : t.wheres[e]) + '$').test(
                    null != (u = r[e]) ? u : ''
                  )
                )
                  throw new Error(
                    "Ziggy error: '" +
                      e +
                      "' parameter '" +
                      r[e] +
                      "' does not match required format '" +
                      t.wheres[e] +
                      "' for route '" +
                      t.name +
                      "'."
                  );
                return encodeURI(null != (i = r[e]) ? i : '')
                  .replace(/%7C/g, '|')
                  .replace(/%25/g, '%')
                  .replace(/\$/g, '%24');
              })
              .replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, '$1/')
              .replace(/\/+$/, '')
          : this.template;
      }),
      e(r, [
        {
          key: 'template',
          get: function () {
            var r = (this.origin + '/' + this.definition.uri).replace(/\/+$/, '');
            return '' === r ? '/' : r;
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
            var r, t;
            return null !=
              (r =
                null == (t = this.template.match(/{[^}?]+\??}/g))
                  ? void 0
                  : t.map(function (r) {
                      return { name: r.replace(/{|\??}/g, ''), required: !/\?}$/.test(r) };
                    }))
              ? r
              : [];
          },
        },
      ]),
      r
    );
  })(),
  I = /*#__PURE__*/ (function (r) {
    var t, n;
    function i(t, n, e, i) {
      var u;
      if (
        (void 0 === e && (e = !0),
        ((u = r.call(this) || this).t =
          null != i ? i : 'undefined' != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy),
        (u.t = o({}, u.t, { absolute: e })),
        t)
      ) {
        if (!u.t.routes[t]) throw new Error("Ziggy error: route '" + t + "' is not in the route list.");
        (u.i = new P(t, u.t.routes[t], u.t)), (u.u = u.l(n));
      }
      return u;
    }
    (n = r), ((t = i).prototype = Object.create(n.prototype)), (t.prototype.constructor = t), u(t, n);
    var f = i.prototype;
    return (
      (f.toString = function () {
        var r = this,
          t = Object.keys(this.u)
            .filter(function (t) {
              return !r.i.parameterSegments.some(function (r) {
                return r.name === t;
              });
            })
            .filter(function (r) {
              return '_query' !== r;
            })
            .reduce(function (t, n) {
              var e;
              return o({}, t, (((e = {})[n] = r.u[n]), e));
            }, {});
        return (
          this.i.compile(this.u) +
          (function (r, t) {
            var n,
              e = r,
              o = (function (r) {
                if (!r) return R;
                if (null != r.encoder && 'function' != typeof r.encoder)
                  throw new TypeError('Encoder has to be a function.');
                var t = r.charset || R.charset;
                if (void 0 !== r.charset && 'utf-8' !== r.charset && 'iso-8859-1' !== r.charset)
                  throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
                var n = s.default;
                if (void 0 !== r.format) {
                  if (!h.call(s.formatters, r.format)) throw new TypeError('Unknown format option provided.');
                  n = r.format;
                }
                var e = s.formatters[n],
                  o = R.filter;
                return (
                  ('function' == typeof r.filter || m(r.filter)) && (o = r.filter),
                  {
                    addQueryPrefix: 'boolean' == typeof r.addQueryPrefix ? r.addQueryPrefix : R.addQueryPrefix,
                    allowDots: void 0 === r.allowDots ? R.allowDots : !!r.allowDots,
                    charset: t,
                    charsetSentinel: 'boolean' == typeof r.charsetSentinel ? r.charsetSentinel : R.charsetSentinel,
                    delimiter: void 0 === r.delimiter ? R.delimiter : r.delimiter,
                    encode: 'boolean' == typeof r.encode ? r.encode : R.encode,
                    encoder: 'function' == typeof r.encoder ? r.encoder : R.encoder,
                    encodeValuesOnly: 'boolean' == typeof r.encodeValuesOnly ? r.encodeValuesOnly : R.encodeValuesOnly,
                    filter: o,
                    format: n,
                    formatter: e,
                    serializeDate: 'function' == typeof r.serializeDate ? r.serializeDate : R.serializeDate,
                    skipNulls: 'boolean' == typeof r.skipNulls ? r.skipNulls : R.skipNulls,
                    sort: 'function' == typeof r.sort ? r.sort : null,
                    strictNullHandling:
                      'boolean' == typeof r.strictNullHandling ? r.strictNullHandling : R.strictNullHandling,
                  }
                );
              })(t);
            'function' == typeof o.filter ? (e = (0, o.filter)('', e)) : m(o.filter) && (n = o.filter);
            var i = [];
            if ('object' != typeof e || null === e) return '';
            var u =
              g[
                t && t.arrayFormat in g
                  ? t.arrayFormat
                  : t && 'indices' in t
                    ? t.indices
                      ? 'indices'
                      : 'repeat'
                    : 'indices'
              ];
            n || (n = Object.keys(e)), o.sort && n.sort(o.sort);
            for (var f = 0; f < n.length; ++f) {
              var a = n[f];
              (o.skipNulls && null === e[a]) ||
                O(
                  i,
                  k(
                    e[a],
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
          })(o({}, t, this.u._query), {
            addQueryPrefix: !0,
            arrayFormat: 'indices',
            encodeValuesOnly: !0,
            skipNulls: !0,
            encoder: function (r, t) {
              return 'boolean' == typeof r ? Number(r) : t(r);
            },
          })
        );
      }),
      (f.v = function (r) {
        var t = this;
        r ? this.t.absolute && r.startsWith('/') && (r = this.p().host + r) : (r = this.h());
        var n = {},
          e = Object.entries(this.t.routes).find(function (e) {
            return (n = new P(e[0], e[1], t.t).matchesUrl(r));
          }) || [void 0, void 0];
        return o({ name: e[0] }, n, { route: e[1] });
      }),
      (f.h = function () {
        var r = this.p(),
          t = r.pathname,
          n = r.search;
        return (
          (this.t.absolute
            ? r.host + t
            : t.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ''), '').replace(/^\/+/, '/')) + n
        );
      }),
      (f.current = function (r, t) {
        var n = this.v(),
          e = n.name,
          i = n.params,
          u = n.query,
          f = n.route;
        if (!r) return e;
        var a = new RegExp('^' + r.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$').test(e);
        if ([null, void 0].includes(t) || !a) return a;
        var c = new P(e, f, this.t);
        t = this.l(t, c);
        var l = o({}, i, u);
        return (
          !(
            !Object.values(t).every(function (r) {
              return !r;
            }) ||
            Object.values(l).some(function (r) {
              return void 0 !== r;
            })
          ) ||
          (function r(t, n) {
            return Object.entries(t).every(function (t) {
              var e = t[0],
                o = t[1];
              return Array.isArray(o) && Array.isArray(n[e])
                ? o.every(function (r) {
                    return n[e].includes(r);
                  })
                : 'object' == typeof o && 'object' == typeof n[e] && null !== o && null !== n[e]
                  ? r(o, n[e])
                  : n[e] == o;
            });
          })(t, l)
        );
      }),
      (f.p = function () {
        var r,
          t,
          n,
          e,
          o,
          i,
          u = 'undefined' != typeof window ? window.location : {},
          f = u.host,
          a = u.pathname,
          c = u.search;
        return {
          host: null != (r = null == (t = this.t.location) ? void 0 : t.host) ? r : void 0 === f ? '' : f,
          pathname: null != (n = null == (e = this.t.location) ? void 0 : e.pathname) ? n : void 0 === a ? '' : a,
          search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : void 0 === c ? '' : c,
        };
      }),
      (f.has = function (r) {
        return Object.keys(this.t.routes).includes(r);
      }),
      (f.l = function (r, t) {
        var n = this;
        void 0 === r && (r = {}),
          void 0 === t && (t = this.i),
          null != r || (r = {}),
          (r = ['string', 'number'].includes(typeof r) ? [r] : r);
        var e = t.parameterSegments.filter(function (r) {
          return !n.t.defaults[r.name];
        });
        if (Array.isArray(r))
          r = r.reduce(function (r, t, n) {
            var i, u;
            return o({}, r, e[n] ? (((i = {})[e[n].name] = t), i) : 'object' == typeof t ? t : (((u = {})[t] = ''), u));
          }, {});
        else if (
          1 === e.length &&
          !r[e[0].name] &&
          (r.hasOwnProperty(Object.values(t.bindings)[0]) || r.hasOwnProperty('id'))
        ) {
          var i;
          ((i = {})[e[0].name] = r), (r = i);
        }
        return o({}, this.m(t), this.j(r, t));
      }),
      (f.m = function (r) {
        var t = this;
        return r.parameterSegments
          .filter(function (r) {
            return t.t.defaults[r.name];
          })
          .reduce(function (r, n, e) {
            var i,
              u = n.name;
            return o({}, r, (((i = {})[u] = t.t.defaults[u]), i));
          }, {});
      }),
      (f.j = function (r, t) {
        var n = t.bindings,
          e = t.parameterSegments;
        return Object.entries(r).reduce(function (r, t) {
          var i,
            u,
            f = t[0],
            a = t[1];
          if (
            !a ||
            'object' != typeof a ||
            Array.isArray(a) ||
            !e.some(function (r) {
              return r.name === f;
            })
          )
            return o({}, r, (((u = {})[f] = a), u));
          if (!a.hasOwnProperty(n[f])) {
            if (!a.hasOwnProperty('id'))
              throw new Error(
                "Ziggy error: object passed as '" + f + "' parameter is missing route model binding key '" + n[f] + "'."
              );
            n[f] = 'id';
          }
          return o({}, r, (((i = {})[f] = a[n[f]]), i));
        }, {});
      }),
      (f.valueOf = function () {
        return this.toString();
      }),
      e(i, [
        {
          key: 'params',
          get: function () {
            var r = this.v();
            return o({}, r.params, r.query);
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
function Z(r, t, n, e) {
  var o = new I(r, t, n, e);
  return r ? o.toString() : o;
}
var F = {
  install: function (r, t) {
    var n = function (r, n, e, o) {
      return void 0 === o && (o = t), Z(r, n, e, o);
    };
    parseInt(r.version) > 2
      ? ((r.config.globalProperties.route = n), r.provide('route', n))
      : r.mixin({ methods: { route: n } });
  },
};
function q(r) {
  if (!r && !globalThis.Ziggy && 'undefined' == typeof Ziggy)
    throw new Error(
      'Ziggy error: missing configuration. Ensure that a `Ziggy` variable is defined globally or pass a config object into the useRoute hook.'
    );
  return function (t, n, e, o) {
    return void 0 === o && (o = r), Z(t, n, e, o);
  };
}
export { F as ZiggyVue, Z as route, q as useRoute };

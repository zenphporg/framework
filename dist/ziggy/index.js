function t() {
  return (
    (t = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e];
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
          }
          return t;
        }),
    t.apply(this, arguments)
  );
}
var e = String.prototype.replace,
  r = /%20/g,
  n = 'RFC3986',
  o = {
    default: n,
    formatters: {
      RFC1738: function (t) {
        return e.call(t, r, '+');
      },
      RFC3986: function (t) {
        return String(t);
      },
    },
    RFC1738: 'RFC1738',
    RFC3986: n,
  },
  i = Object.prototype.hasOwnProperty,
  u = Array.isArray,
  a = (function () {
    for (var t = [], e = 0; e < 256; ++e) t.push('%' + ((e < 16 ? '0' : '') + e.toString(16)).toUpperCase());
    return t;
  })(),
  s = function (t, e) {
    for (var r = e && e.plainObjects ? Object.create(null) : {}, n = 0; n < t.length; ++n)
      void 0 !== t[n] && (r[n] = t[n]);
    return r;
  },
  f = {
    arrayToObject: s,
    assign: function (t, e) {
      return Object.keys(e).reduce(function (t, r) {
        return (t[r] = e[r]), t;
      }, t);
    },
    combine: function (t, e) {
      return [].concat(t, e);
    },
    compact: function (t) {
      for (var e = [{ obj: { o: t }, prop: 'o' }], r = [], n = 0; n < e.length; ++n)
        for (var o = e[n], i = o.obj[o.prop], a = Object.keys(i), s = 0; s < a.length; ++s) {
          var f = a[s],
            c = i[f];
          'object' == typeof c && null !== c && -1 === r.indexOf(c) && (e.push({ obj: i, prop: f }), r.push(c));
        }
      return (
        (function (t) {
          for (; t.length > 1; ) {
            var e = t.pop(),
              r = e.obj[e.prop];
            if (u(r)) {
              for (var n = [], o = 0; o < r.length; ++o) void 0 !== r[o] && n.push(r[o]);
              e.obj[e.prop] = n;
            }
          }
        })(e),
        t
      );
    },
    decode: function (t, e, r) {
      var n = t.replace(/\+/g, ' ');
      if ('iso-8859-1' === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
      try {
        return decodeURIComponent(n);
      } catch (t) {
        return n;
      }
    },
    encode: function (t, e, r, n, i) {
      if (0 === t.length) return t;
      var u = t;
      if (
        ('symbol' == typeof t ? (u = Symbol.prototype.toString.call(t)) : 'string' != typeof t && (u = String(t)),
        'iso-8859-1' === r)
      )
        return escape(u).replace(/%u[0-9a-f]{4}/gi, function (t) {
          return '%26%23' + parseInt(t.slice(2), 16) + '%3B';
        });
      for (var s = '', f = 0; f < u.length; ++f) {
        var c = u.charCodeAt(f);
        45 === c ||
        46 === c ||
        95 === c ||
        126 === c ||
        (c >= 48 && c <= 57) ||
        (c >= 65 && c <= 90) ||
        (c >= 97 && c <= 122) ||
        (i === o.RFC1738 && (40 === c || 41 === c))
          ? (s += u.charAt(f))
          : c < 128
            ? (s += a[c])
            : c < 2048
              ? (s += a[192 | (c >> 6)] + a[128 | (63 & c)])
              : c < 55296 || c >= 57344
                ? (s += a[224 | (c >> 12)] + a[128 | ((c >> 6) & 63)] + a[128 | (63 & c)])
                : ((c = 65536 + (((1023 & c) << 10) | (1023 & u.charCodeAt((f += 1))))),
                  (s += a[240 | (c >> 18)] + a[128 | ((c >> 12) & 63)] + a[128 | ((c >> 6) & 63)] + a[128 | (63 & c)]));
      }
      return s;
    },
    isBuffer: function (t) {
      return !(!t || 'object' != typeof t || !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t)));
    },
    isRegExp: function (t) {
      return '[object RegExp]' === Object.prototype.toString.call(t);
    },
    maybeMap: function (t, e) {
      if (u(t)) {
        for (var r = [], n = 0; n < t.length; n += 1) r.push(e(t[n]));
        return r;
      }
      return e(t);
    },
    merge: function t(e, r, n) {
      if (!r) return e;
      if ('object' != typeof r) {
        if (u(e)) e.push(r);
        else {
          if (!e || 'object' != typeof e) return [e, r];
          ((n && (n.plainObjects || n.allowPrototypes)) || !i.call(Object.prototype, r)) && (e[r] = !0);
        }
        return e;
      }
      if (!e || 'object' != typeof e) return [e].concat(r);
      var o = e;
      return (
        u(e) && !u(r) && (o = s(e, n)),
        u(e) && u(r)
          ? (r.forEach(function (r, o) {
              if (i.call(e, o)) {
                var u = e[o];
                u && 'object' == typeof u && r && 'object' == typeof r ? (e[o] = t(u, r, n)) : e.push(r);
              } else e[o] = r;
            }),
            e)
          : Object.keys(r).reduce(function (e, o) {
              var u = r[o];
              return (e[o] = i.call(e, o) ? t(e[o], u, n) : u), e;
            }, o)
      );
    },
  },
  c = Object.prototype.hasOwnProperty,
  l = {
    brackets: function (t) {
      return t + '[]';
    },
    comma: 'comma',
    indices: function (t, e) {
      return t + '[' + e + ']';
    },
    repeat: function (t) {
      return t;
    },
  },
  p = Array.isArray,
  h = String.prototype.split,
  y = Array.prototype.push,
  d = function (t, e) {
    y.apply(t, p(e) ? e : [e]);
  },
  b = Date.prototype.toISOString,
  g = o.default,
  m = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: 'utf-8',
    charsetSentinel: !1,
    delimiter: '&',
    encode: !0,
    encoder: f.encode,
    encodeValuesOnly: !1,
    format: g,
    formatter: o.formatters[g],
    indices: !1,
    serializeDate: function (t) {
      return b.call(t);
    },
    skipNulls: !1,
    strictNullHandling: !1,
  },
  v = function t(e, r, n, o, i, u, a, s, c, l, y, b, g, v) {
    var j,
      w = e;
    if (
      ('function' == typeof a
        ? (w = a(r, w))
        : w instanceof Date
          ? (w = l(w))
          : 'comma' === n &&
            p(w) &&
            (w = f.maybeMap(w, function (t) {
              return t instanceof Date ? l(t) : t;
            })),
      null === w)
    ) {
      if (o) return u && !g ? u(r, m.encoder, v, 'key', y) : r;
      w = '';
    }
    if (
      'string' == typeof (j = w) ||
      'number' == typeof j ||
      'boolean' == typeof j ||
      'symbol' == typeof j ||
      'bigint' == typeof j ||
      f.isBuffer(w)
    ) {
      if (u) {
        var $ = g ? r : u(r, m.encoder, v, 'key', y);
        if ('comma' === n && g) {
          for (var O = h.call(String(w), ','), E = '', S = 0; S < O.length; ++S)
            E += (0 === S ? '' : ',') + b(u(O[S], m.encoder, v, 'value', y));
          return [b($) + '=' + E];
        }
        return [b($) + '=' + b(u(w, m.encoder, v, 'value', y))];
      }
      return [b(r) + '=' + b(String(w))];
    }
    var R,
      x = [];
    if (void 0 === w) return x;
    if ('comma' === n && p(w)) R = [{ value: w.length > 0 ? w.join(',') || null : void 0 }];
    else if (p(a)) R = a;
    else {
      var N = Object.keys(w);
      R = s ? N.sort(s) : N;
    }
    for (var T = 0; T < R.length; ++T) {
      var k = R[T],
        C = 'object' == typeof k && void 0 !== k.value ? k.value : w[k];
      if (!i || null !== C) {
        var _ = p(w) ? ('function' == typeof n ? n(r, k) : r) : r + (c ? '.' + k : '[' + k + ']');
        d(x, t(C, _, n, o, i, u, a, s, c, l, y, b, g, v));
      }
    }
    return x;
  },
  j = Object.prototype.hasOwnProperty,
  w = Array.isArray,
  $ = {
    allowDots: !1,
    allowPrototypes: !1,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: !1,
    comma: !1,
    decoder: f.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: !1,
    interpretNumericEntities: !1,
    parameterLimit: 1e3,
    parseArrays: !0,
    plainObjects: !1,
    strictNullHandling: !1,
  },
  O = function (t) {
    return t.replace(/&#(\d+);/g, function (t, e) {
      return String.fromCharCode(parseInt(e, 10));
    });
  },
  E = function (t, e) {
    return t && 'string' == typeof t && e.comma && t.indexOf(',') > -1 ? t.split(',') : t;
  },
  S = function (t, e, r, n) {
    if (t) {
      var o = r.allowDots ? t.replace(/\.([^.[]+)/g, '[$1]') : t,
        i = /(\[[^[\]]*])/g,
        u = r.depth > 0 && /(\[[^[\]]*])/.exec(o),
        a = u ? o.slice(0, u.index) : o,
        s = [];
      if (a) {
        if (!r.plainObjects && j.call(Object.prototype, a) && !r.allowPrototypes) return;
        s.push(a);
      }
      for (var f = 0; r.depth > 0 && null !== (u = i.exec(o)) && f < r.depth; ) {
        if (((f += 1), !r.plainObjects && j.call(Object.prototype, u[1].slice(1, -1)) && !r.allowPrototypes)) return;
        s.push(u[1]);
      }
      return (
        u && s.push('[' + o.slice(u.index) + ']'),
        (function (t, e, r, n) {
          for (var o = n ? e : E(e, r), i = t.length - 1; i >= 0; --i) {
            var u,
              a = t[i];
            if ('[]' === a && r.parseArrays) u = [].concat(o);
            else {
              u = r.plainObjects ? Object.create(null) : {};
              var s = '[' === a.charAt(0) && ']' === a.charAt(a.length - 1) ? a.slice(1, -1) : a,
                f = parseInt(s, 10);
              r.parseArrays || '' !== s
                ? !isNaN(f) && a !== s && String(f) === s && f >= 0 && r.parseArrays && f <= r.arrayLimit
                  ? ((u = [])[f] = o)
                  : '__proto__' !== s && (u[s] = o)
                : (u = { 0: o });
            }
            o = u;
          }
          return o;
        })(s, e, r, n)
      );
    }
  },
  R = function (t, e) {
    var r = (function (t) {
      if (!t) return $;
      if (null != t.decoder && 'function' != typeof t.decoder) throw new TypeError('Decoder has to be a function.');
      if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset)
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      return {
        allowDots: void 0 === t.allowDots ? $.allowDots : !!t.allowDots,
        allowPrototypes: 'boolean' == typeof t.allowPrototypes ? t.allowPrototypes : $.allowPrototypes,
        arrayLimit: 'number' == typeof t.arrayLimit ? t.arrayLimit : $.arrayLimit,
        charset: void 0 === t.charset ? $.charset : t.charset,
        charsetSentinel: 'boolean' == typeof t.charsetSentinel ? t.charsetSentinel : $.charsetSentinel,
        comma: 'boolean' == typeof t.comma ? t.comma : $.comma,
        decoder: 'function' == typeof t.decoder ? t.decoder : $.decoder,
        delimiter: 'string' == typeof t.delimiter || f.isRegExp(t.delimiter) ? t.delimiter : $.delimiter,
        depth: 'number' == typeof t.depth || !1 === t.depth ? +t.depth : $.depth,
        ignoreQueryPrefix: !0 === t.ignoreQueryPrefix,
        interpretNumericEntities:
          'boolean' == typeof t.interpretNumericEntities ? t.interpretNumericEntities : $.interpretNumericEntities,
        parameterLimit: 'number' == typeof t.parameterLimit ? t.parameterLimit : $.parameterLimit,
        parseArrays: !1 !== t.parseArrays,
        plainObjects: 'boolean' == typeof t.plainObjects ? t.plainObjects : $.plainObjects,
        strictNullHandling: 'boolean' == typeof t.strictNullHandling ? t.strictNullHandling : $.strictNullHandling,
      };
    })(e);
    if ('' === t || null == t) return r.plainObjects ? Object.create(null) : {};
    for (
      var n =
          'string' == typeof t
            ? (function (t, e) {
                var r,
                  n = {},
                  o = (e.ignoreQueryPrefix ? t.replace(/^\?/, '') : t).split(
                    e.delimiter,
                    Infinity === e.parameterLimit ? void 0 : e.parameterLimit
                  ),
                  i = -1,
                  u = e.charset;
                if (e.charsetSentinel)
                  for (r = 0; r < o.length; ++r)
                    0 === o[r].indexOf('utf8=') &&
                      ('utf8=%E2%9C%93' === o[r] ? (u = 'utf-8') : 'utf8=%26%2310003%3B' === o[r] && (u = 'iso-8859-1'),
                      (i = r),
                      (r = o.length));
                for (r = 0; r < o.length; ++r)
                  if (r !== i) {
                    var a,
                      s,
                      c = o[r],
                      l = c.indexOf(']='),
                      p = -1 === l ? c.indexOf('=') : l + 1;
                    -1 === p
                      ? ((a = e.decoder(c, $.decoder, u, 'key')), (s = e.strictNullHandling ? null : ''))
                      : ((a = e.decoder(c.slice(0, p), $.decoder, u, 'key')),
                        (s = f.maybeMap(E(c.slice(p + 1), e), function (t) {
                          return e.decoder(t, $.decoder, u, 'value');
                        }))),
                      s && e.interpretNumericEntities && 'iso-8859-1' === u && (s = O(s)),
                      c.indexOf('[]=') > -1 && (s = w(s) ? [s] : s),
                      (n[a] = j.call(n, a) ? f.combine(n[a], s) : s);
                  }
                return n;
              })(t, r)
            : t,
        o = r.plainObjects ? Object.create(null) : {},
        i = Object.keys(n),
        u = 0;
      u < i.length;
      ++u
    ) {
      var a = i[u],
        s = S(a, n[a], r, 'string' == typeof t);
      o = f.merge(o, s, r);
    }
    return f.compact(o);
  };
class x {
  constructor(t, e, r) {
    var n, o;
    (this.name = t),
      (this.definition = e),
      (this.bindings = null != (n = e.bindings) ? n : {}),
      (this.wheres = null != (o = e.wheres) ? o : {}),
      (this.config = r);
  }
  get template() {
    const t = `${this.origin}/${this.definition.uri}`.replace(/\/+$/, '');
    return '' === t ? '/' : t;
  }
  get origin() {
    return this.config.absolute
      ? this.definition.domain
        ? `${this.config.url.match(/^\w+:\/\//)[0]}${this.definition.domain}${this.config.port ? `:${this.config.port}` : ''}`
        : this.config.url
      : '';
  }
  get parameterSegments() {
    var t, e;
    return null !=
      (t =
        null == (e = this.template.match(/{[^}?]+\??}/g))
          ? void 0
          : e.map((t) => ({ name: t.replace(/{|\??}/g, ''), required: !/\?}$/.test(t) })))
      ? t
      : [];
  }
  matchesUrl(t) {
    if (!this.definition.methods.includes('GET')) return !1;
    const e = this.template
        .replace(/(\/?){([^}?]*)(\??)}/g, (t, e, r, n) => {
          var o;
          const i = `(?<${r}>${(null == (o = this.wheres[r]) ? void 0 : o.replace(/(^\^)|(\$$)/g, '')) || '[^/?]+'})`;
          return n ? `(${e}${i})?` : `${e}${i}`;
        })
        .replace(/^\w+:\/\//, ''),
      [r, n] = t.replace(/^\w+:\/\//, '').split('?'),
      o = new RegExp(`^${e}/?$`).exec(decodeURI(r));
    if (o) {
      for (const t in o.groups)
        o.groups[t] = 'string' == typeof o.groups[t] ? decodeURIComponent(o.groups[t]) : o.groups[t];
      return { params: o.groups, query: R(n) };
    }
    return !1;
  }
  compile(t) {
    return this.parameterSegments.length
      ? this.template
          .replace(/{([^}?]+)(\??)}/g, (e, r, n) => {
            var o, i;
            if (!n && [null, void 0].includes(t[r]))
              throw new Error(`Ziggy error: '${r}' parameter is required for route '${this.name}'.`);
            if (
              this.wheres[r] &&
              !new RegExp(`^${n ? `(${this.wheres[r]})?` : this.wheres[r]}$`).test(null != (i = t[r]) ? i : '')
            )
              throw new Error(
                `Ziggy error: '${r}' parameter '${t[r]}' does not match required format '${this.wheres[r]}' for route '${this.name}'.`
              );
            return encodeURI(null != (o = t[r]) ? o : '')
              .replace(/%7C/g, '|')
              .replace(/%25/g, '%')
              .replace(/\$/g, '%24');
          })
          .replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, '$1/')
          .replace(/\/+$/, '')
      : this.template;
  }
}
class N extends String {
  constructor(e, r, n = !0, o) {
    if (
      (super(),
      (this.t = null != o ? o : 'undefined' != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy),
      (this.t = t({}, this.t, { absolute: n })),
      e)
    ) {
      if (!this.t.routes[e]) throw new Error(`Ziggy error: route '${e}' is not in the route list.`);
      (this.i = new x(e, this.t.routes[e], this.t)), (this.u = this.l(r));
    }
  }
  toString() {
    const e = Object.keys(this.u)
      .filter((t) => !this.i.parameterSegments.some(({ name: e }) => e === t))
      .filter((t) => '_query' !== t)
      .reduce((e, r) => t({}, e, { [r]: this.u[r] }), {});
    return (
      this.i.compile(this.u) +
      (function (t, e) {
        var r,
          n = t,
          i = (function (t) {
            if (!t) return m;
            if (null != t.encoder && 'function' != typeof t.encoder)
              throw new TypeError('Encoder has to be a function.');
            var e = t.charset || m.charset;
            if (void 0 !== t.charset && 'utf-8' !== t.charset && 'iso-8859-1' !== t.charset)
              throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
            var r = o.default;
            if (void 0 !== t.format) {
              if (!c.call(o.formatters, t.format)) throw new TypeError('Unknown format option provided.');
              r = t.format;
            }
            var n = o.formatters[r],
              i = m.filter;
            return (
              ('function' == typeof t.filter || p(t.filter)) && (i = t.filter),
              {
                addQueryPrefix: 'boolean' == typeof t.addQueryPrefix ? t.addQueryPrefix : m.addQueryPrefix,
                allowDots: void 0 === t.allowDots ? m.allowDots : !!t.allowDots,
                charset: e,
                charsetSentinel: 'boolean' == typeof t.charsetSentinel ? t.charsetSentinel : m.charsetSentinel,
                delimiter: void 0 === t.delimiter ? m.delimiter : t.delimiter,
                encode: 'boolean' == typeof t.encode ? t.encode : m.encode,
                encoder: 'function' == typeof t.encoder ? t.encoder : m.encoder,
                encodeValuesOnly: 'boolean' == typeof t.encodeValuesOnly ? t.encodeValuesOnly : m.encodeValuesOnly,
                filter: i,
                format: r,
                formatter: n,
                serializeDate: 'function' == typeof t.serializeDate ? t.serializeDate : m.serializeDate,
                skipNulls: 'boolean' == typeof t.skipNulls ? t.skipNulls : m.skipNulls,
                sort: 'function' == typeof t.sort ? t.sort : null,
                strictNullHandling:
                  'boolean' == typeof t.strictNullHandling ? t.strictNullHandling : m.strictNullHandling,
              }
            );
          })(e);
        'function' == typeof i.filter ? (n = (0, i.filter)('', n)) : p(i.filter) && (r = i.filter);
        var u = [];
        if ('object' != typeof n || null === n) return '';
        var a =
          l[
            e && e.arrayFormat in l
              ? e.arrayFormat
              : e && 'indices' in e
                ? e.indices
                  ? 'indices'
                  : 'repeat'
                : 'indices'
          ];
        r || (r = Object.keys(n)), i.sort && r.sort(i.sort);
        for (var s = 0; s < r.length; ++s) {
          var f = r[s];
          (i.skipNulls && null === n[f]) ||
            d(
              u,
              v(
                n[f],
                f,
                a,
                i.strictNullHandling,
                i.skipNulls,
                i.encode ? i.encoder : null,
                i.filter,
                i.sort,
                i.allowDots,
                i.serializeDate,
                i.format,
                i.formatter,
                i.encodeValuesOnly,
                i.charset
              )
            );
        }
        var h = u.join(i.delimiter),
          y = !0 === i.addQueryPrefix ? '?' : '';
        return (
          i.charsetSentinel && (y += 'iso-8859-1' === i.charset ? 'utf8=%26%2310003%3B&' : 'utf8=%E2%9C%93&'),
          h.length > 0 ? y + h : ''
        );
      })(t({}, e, this.u._query), {
        addQueryPrefix: !0,
        arrayFormat: 'indices',
        encodeValuesOnly: !0,
        skipNulls: !0,
        encoder: (t, e) => ('boolean' == typeof t ? Number(t) : e(t)),
      })
    );
  }
  p(e) {
    e ? this.t.absolute && e.startsWith('/') && (e = this.h().host + e) : (e = this.m());
    let r = {};
    const [n, o] = Object.entries(this.t.routes).find(([t, n]) => (r = new x(t, n, this.t).matchesUrl(e))) || [
      void 0,
      void 0,
    ];
    return t({ name: n }, r, { route: o });
  }
  m() {
    const { host: t, pathname: e, search: r } = this.h();
    return (this.t.absolute ? t + e : e.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ''), '').replace(/^\/+/, '/')) + r;
  }
  current(e, r) {
    const { name: n, params: o, query: i, route: u } = this.p();
    if (!e) return n;
    const a = new RegExp(`^${e.replace(/\./g, '\\.').replace(/\*/g, '.*')}$`).test(n);
    if ([null, void 0].includes(r) || !a) return a;
    const s = new x(n, u, this.t);
    r = this.l(r, s);
    const f = t({}, o, i);
    if (Object.values(r).every((t) => !t) && !Object.values(f).some((t) => void 0 !== t)) return !0;
    const c = (t, e) =>
      Object.entries(t).every(([t, r]) =>
        Array.isArray(r) && Array.isArray(e[t])
          ? r.every((r) => e[t].includes(r))
          : 'object' == typeof r && 'object' == typeof e[t] && null !== r && null !== e[t]
            ? c(r, e[t])
            : e[t] == r
      );
    return c(r, f);
  }
  h() {
    var t, e, r, n, o, i;
    const { host: u = '', pathname: a = '', search: s = '' } = 'undefined' != typeof window ? window.location : {};
    return {
      host: null != (t = null == (e = this.t.location) ? void 0 : e.host) ? t : u,
      pathname: null != (r = null == (n = this.t.location) ? void 0 : n.pathname) ? r : a,
      search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : s,
    };
  }
  get params() {
    const { params: e, query: r } = this.p();
    return t({}, e, r);
  }
  get routeParams() {
    return this.p().params;
  }
  get queryParams() {
    return this.p().query;
  }
  has(t) {
    return Object.keys(this.t.routes).includes(t);
  }
  l(e = {}, r = this.i) {
    null != e || (e = {}), (e = ['string', 'number'].includes(typeof e) ? [e] : e);
    const n = r.parameterSegments.filter(({ name: t }) => !this.t.defaults[t]);
    return (
      Array.isArray(e)
        ? (e = e.reduce((e, r, o) => t({}, e, n[o] ? { [n[o].name]: r } : 'object' == typeof r ? r : { [r]: '' }), {}))
        : 1 !== n.length ||
          e[n[0].name] ||
          (!e.hasOwnProperty(Object.values(r.bindings)[0]) && !e.hasOwnProperty('id')) ||
          (e = { [n[0].name]: e }),
      t({}, this.v(r), this.j(e, r))
    );
  }
  v(e) {
    return e.parameterSegments
      .filter(({ name: t }) => this.t.defaults[t])
      .reduce((e, { name: r }, n) => t({}, e, { [r]: this.t.defaults[r] }), {});
  }
  j(e, { bindings: r, parameterSegments: n }) {
    return Object.entries(e).reduce((e, [o, i]) => {
      if (!i || 'object' != typeof i || Array.isArray(i) || !n.some(({ name: t }) => t === o))
        return t({}, e, { [o]: i });
      if (!i.hasOwnProperty(r[o])) {
        if (!i.hasOwnProperty('id'))
          throw new Error(
            `Ziggy error: object passed as '${o}' parameter is missing route model binding key '${r[o]}'.`
          );
        r[o] = 'id';
      }
      return t({}, e, { [o]: i[r[o]] });
    }, {});
  }
  valueOf() {
    return this.toString();
  }
}
function T(t, e, r, n) {
  const o = new N(t, e, r, n);
  return t ? o.toString() : o;
}
const k = {
  install(t, e) {
    const r = (t, r, n, o = e) => T(t, r, n, o);
    parseInt(t.version) > 2
      ? ((t.config.globalProperties.route = r), t.provide('route', r))
      : t.mixin({ methods: { route: r } });
  },
};
function C(t) {
  if (!t && !globalThis.Ziggy && 'undefined' == typeof Ziggy)
    throw new Error(
      'Ziggy error: missing configuration. Ensure that a `Ziggy` variable is defined globally or pass a config object into the useRoute hook.'
    );
  return (e, r, n, o = t) => T(e, r, n, o);
}
export { k as ZiggyVue, T as route, C as useRoute };

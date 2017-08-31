// Copyright Google Inc. All Rights Reserved.

//// Additial Code Block ////
var startup = new Date().getTime();
var messageQueue = [];

var pushMessage = function(message) {
  var now = new Date().getTime();
  var elapsed = now - startup;
  messageQueue.push({
    time: elapsed,
    ipcMessage: message
  });
};

var exportRecordedScenario = function() {
  console.log(
    JSON.stringify({
      timeline: messageQueue
    })
  );
};
//// Additial Code Block ////

(function() {
  "use strict";
  var h,
    k = function(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.Ua = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      for (var d in b)
        if ("prototype" != d)
          if (Object.defineProperties) {
            var e = Object.getOwnPropertyDescriptor(b, d);
            e && Object.defineProperty(a, d, e);
          } else a[d] = b[d];
    },
    aa =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    ba =
      "undefined" != typeof window && window === this
        ? this
        : "undefined" != typeof global && null != global ? global : this,
    ca = function() {
      ca = function() {};
      ba.Symbol || (ba.Symbol = da);
    },
    ea = 0,
    da = function(a) {
      return "jscomp_symbol_" + (a || "") + ea++;
    },
    ha = function() {
      ca();
      var a = ba.Symbol.iterator;
      a || (a = ba.Symbol.iterator = ba.Symbol("iterator"));
      "function" != typeof Array.prototype[a] &&
        aa(Array.prototype, a, {
          configurable: !0,
          writable: !0,
          value: function() {
            return fa(this);
          }
        });
      ha = function() {};
    },
    fa = function(a) {
      var b = 0;
      return ia(function() {
        return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
      });
    },
    ia = function(a) {
      ha();
      a = { next: a };
      a[ba.Symbol.iterator] = function() {
        return this;
      };
      return a;
    },
    l = function(a) {
      ha();
      var b = a[Symbol.iterator];
      return b ? b.call(a) : fa(a);
    },
    m = this,
    n = function(a) {
      return void 0 !== a;
    },
    ja = function(a) {
      return "string" == typeof a;
    },
    p = function(a) {
      return "number" == typeof a;
    },
    q = function() {},
    ka = function(a) {
      a.Ab = void 0;
      a.fa = function() {
        return a.Ab ? a.Ab : (a.Ab = new a());
      };
    },
    la = function(a) {
      var b = typeof a;
      if ("object" == b)
        if (a) {
          if (a instanceof Array) return "array";
          if (a instanceof Object) return b;
          var c = Object.prototype.toString.call(a);
          if ("[object Window]" == c) return "object";
          if (
            "[object Array]" == c ||
            ("number" == typeof a.length &&
              "undefined" != typeof a.splice &&
              "undefined" != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable("splice"))
          )
            return "array";
          if (
            "[object Function]" == c ||
            ("undefined" != typeof a.call &&
              "undefined" != typeof a.propertyIsEnumerable &&
              !a.propertyIsEnumerable("call"))
          )
            return "function";
        } else return "null";
      else if ("function" == b && "undefined" == typeof a.call) return "object";
      return b;
    },
    ma = function(a) {
      return "array" == la(a);
    },
    na = function(a) {
      return "function" == la(a);
    },
    oa = function(a) {
      var b = typeof a;
      return ("object" == b && null != a) || "function" == b;
    },
    pa = function(a, b, c) {
      return a.call.apply(a.bind, arguments);
    },
    qa = function(a, b, c) {
      if (!a) throw Error();
      if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function() {
          var c = Array.prototype.slice.call(arguments);
          Array.prototype.unshift.apply(c, d);
          return a.apply(b, c);
        };
      }
      return function() {
        return a.apply(b, arguments);
      };
    },
    r = function(a, b, c) {
      r =
        Function.prototype.bind &&
        -1 != Function.prototype.bind.toString().indexOf("native code")
          ? pa
          : qa;
      return r.apply(null, arguments);
    },
    ra = function(a, b) {
      var c = Array.prototype.slice.call(arguments, 1);
      return function() {
        var b = c.slice();
        b.push.apply(b, arguments);
        return a.apply(this, b);
      };
    },
    sa =
      Date.now ||
      function() {
        return +new Date();
      },
    u = function(a, b) {
      a = a.split(".");
      var c = m;
      a[0] in c || !c.execScript || c.execScript("var " + a[0]);
      for (var d; a.length && (d = a.shift()); )
        !a.length && n(b)
          ? (c[d] = b)
          : (c = c[d] && c[d] !== Object.prototype[d] ? c[d] : (c[d] = {}));
    },
    ta = function(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.Ua = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.qf = function(a, c, f) {
        for (
          var d = Array(arguments.length - 2), e = 2;
          e < arguments.length;
          e++
        )
          d[e - 2] = arguments[e];
        return b.prototype[c].apply(a, d);
      };
    };
  var cast = m.cast || {};
  u("cast.receiver.VERSION", "2.0.0");
  var ua = function(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return 0 == a.indexOf(b) || 0 == b.indexOf(a);
  };
  var va = function(a) {
    if (Error.captureStackTrace) Error.captureStackTrace(this, va);
    else {
      var b = Error().stack;
      b && (this.stack = b);
    }
    a && (this.message = String(a));
  };
  ta(va, Error);
  va.prototype.name = "CustomError";
  var xa = function(a, b) {
      return 0 == wa(b, a.substr(0, b.length));
    },
    ya = function(a, b) {
      for (
        var c = a.split("%s"),
          d = "",
          e = Array.prototype.slice.call(arguments, 1);
        e.length && 1 < c.length;

      )
        d += c.shift() + e.shift();
      return d + c.join("%s");
    },
    za = String.prototype.trim
      ? function(a) {
          return a.trim();
        }
      : function(a) {
          return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
        },
    wa = function(a, b) {
      a = String(a).toLowerCase();
      b = String(b).toLowerCase();
      return a < b ? -1 : a == b ? 0 : 1;
    },
    Aa = function(a, b) {
      return a < b ? -1 : a > b ? 1 : 0;
    };
  var Ba = function(a, b) {
    b.unshift(a);
    va.call(this, ya.apply(null, b));
    b.shift();
  };
  ta(Ba, va);
  Ba.prototype.name = "AssertionError";
  var Ca = function(a, b, c, d) {
      var e = "Assertion failed";
      if (c) {
        e += ": " + c;
        var f = d;
      } else a && ((e += ": " + a), (f = b));
      throw new Ba("" + e, f || []);
    },
    v = function(a, b, c) {
      a || Ca("", null, b, Array.prototype.slice.call(arguments, 2));
    },
    Da = function(a, b) {
      throw new Ba(
        "Failure" + (a ? ": " + a : ""),
        Array.prototype.slice.call(arguments, 1)
      );
    },
    Ea = function(a, b, c) {
      p(a) ||
        Ca(
          "Expected number but got %s: %s.",
          [la(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
      return a;
    },
    Fa = function(a, b, c) {
      na(a) ||
        Ca(
          "Expected function but got %s: %s.",
          [la(a), a],
          b,
          Array.prototype.slice.call(arguments, 2)
        );
    };
  var Ga = Array.prototype.indexOf
      ? function(a, b, c) {
          v(null != a.length);
          return Array.prototype.indexOf.call(a, b, c);
        }
      : function(a, b, c) {
          c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
          if (ja(a)) return ja(b) && 1 == b.length ? a.indexOf(b, c) : -1;
          for (; c < a.length; c++) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ha = Array.prototype.lastIndexOf
      ? function(a, b, c) {
          v(null != a.length);
          return Array.prototype.lastIndexOf.call(
            a,
            b,
            null == c ? a.length - 1 : c
          );
        }
      : function(a, b, c) {
          c = null == c ? a.length - 1 : c;
          0 > c && (c = Math.max(0, a.length + c));
          if (ja(a)) return ja(b) && 1 == b.length ? a.lastIndexOf(b, c) : -1;
          for (; 0 <= c; c--) if (c in a && a[c] === b) return c;
          return -1;
        },
    Ja = function(a, b) {
      b = Ga(a, b);
      var c;
      (c = 0 <= b) && Ia(a, b);
      return c;
    },
    Ia = function(a, b) {
      v(null != a.length);
      Array.prototype.splice.call(a, b, 1);
    },
    La = function(a, b, c, d) {
      v(null != a.length);
      return Array.prototype.splice.apply(a, Ka(arguments, 1));
    },
    Ka = function(a, b, c) {
      v(null != a.length);
      return 2 >= arguments.length
        ? Array.prototype.slice.call(a, b)
        : Array.prototype.slice.call(a, b, c);
    };
  var Ma;
  a: {
    var Na = m.navigator;
    if (Na) {
      var Oa = Na.userAgent;
      if (Oa) {
        Ma = Oa;
        break a;
      }
    }
    Ma = "";
  }
  var w = function(a) {
    return -1 != Ma.indexOf(a);
  };
  var Pa = function(a, b, c) {
      for (var d in a) b.call(c, a[d], d, a);
    },
    Qa = function(a, b) {
      for (var c in a) if (b.call(void 0, a[c], c, a)) return !0;
      return !1;
    },
    Ra = function(a) {
      var b = [],
        c = 0,
        d;
      for (d in a) b[c++] = d;
      return b;
    },
    Sa = function(a, b) {
      return null !== a && b in a;
    },
    Ta = function(a) {
      var b = {},
        c;
      for (c in a) b[c] = a[c];
      return b;
    },
    Ua = function(a) {
      var b = la(a);
      if ("object" == b || "array" == b) {
        if (na(a.clone)) return a.clone();
        b = "array" == b ? [] : {};
        for (var c in a) b[c] = Ua(a[c]);
        return b;
      }
      return a;
    },
    Va = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
      " "
    ),
    Wa = function(a, b) {
      for (var c, d, e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d) a[c] = d[c];
        for (var f = 0; f < Va.length; f++)
          (c = Va[f]),
            Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
      }
    };
  var Xa = function(a) {
    Xa[" "](a);
    return a;
  };
  Xa[" "] = q;
  var Za = function(a, b) {
    var c = Ya;
    return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : (c[a] = b(a));
  };
  var $a = w("Opera"),
    ab = w("Trident") || w("MSIE"),
    bb = w("Edge"),
    cb =
      w("Gecko") &&
      !(-1 != Ma.toLowerCase().indexOf("webkit") && !w("Edge")) &&
      !(w("Trident") || w("MSIE")) &&
      !w("Edge"),
    db = -1 != Ma.toLowerCase().indexOf("webkit") && !w("Edge"),
    eb = function() {
      var a = m.document;
      return a ? a.documentMode : void 0;
    },
    fb;
  a: {
    var gb = "",
      hb = (function() {
        var a = Ma;
        if (cb) return /rv\:([^\);]+)(\)|;)/.exec(a);
        if (bb) return /Edge\/([\d\.]+)/.exec(a);
        if (ab) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
        if (db) return /WebKit\/(\S+)/.exec(a);
        if ($a) return /(?:Version)[ \/]?(\S+)/.exec(a);
      })();
    hb && (gb = hb ? hb[1] : "");
    if (ab) {
      var ib = eb();
      if (null != ib && ib > parseFloat(gb)) {
        fb = String(ib);
        break a;
      }
    }
    fb = gb;
  }
  var jb = fb,
    Ya = {},
    kb = function(a) {
      return Za(a, function() {
        for (
          var b = 0,
            c = za(String(jb)).split("."),
            d = za(String(a)).split("."),
            e = Math.max(c.length, d.length),
            f = 0;
          0 == b && f < e;
          f++
        ) {
          var g = c[f] || "",
            t = d[f] || "";
          do {
            g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
            t = /(\d*)(\D*)(.*)/.exec(t) || ["", "", "", ""];
            if (0 == g[0].length && 0 == t[0].length) break;
            b =
              Aa(
                0 == g[1].length ? 0 : parseInt(g[1], 10),
                0 == t[1].length ? 0 : parseInt(t[1], 10)
              ) ||
              Aa(0 == g[2].length, 0 == t[2].length) ||
              Aa(g[2], t[2]);
            g = g[3];
            t = t[3];
          } while (0 == b);
        }
        return 0 <= b;
      });
    },
    lb;
  var mb = m.document;
  lb =
    mb && ab
      ? eb() || ("CSS1Compat" == mb.compatMode ? parseInt(jb, 10) : 5)
      : void 0;
  var nb = function(a, b, c, d, e) {
    this.reset(a, b, c, d, e);
  };
  nb.prototype.lb = 0;
  nb.prototype.Zb = null;
  var ob = 0;
  nb.prototype.reset = function(a, b, c, d, e) {
    this.lb = "number" == typeof e ? e : ob++;
    this.qd = d || sa();
    this.ta = a;
    this.Mc = b;
    this.Ic = c;
    delete this.Zb;
  };
  nb.prototype.uc = function(a) {
    this.ta = a;
  };
  var pb = function(a) {
      this.Nc = a;
      this.ab = this.Ub = this.ta = this.K = null;
    },
    x = function(a, b) {
      this.name = a;
      this.value = b;
    };
  x.prototype.toString = function() {
    return this.name;
  };
  var qb = new x("SHOUT", 1200),
    rb = new x("SEVERE", 1e3),
    sb = new x("WARNING", 900),
    tb = new x("INFO", 800),
    ub = new x("CONFIG", 700),
    vb = new x("FINE", 500),
    y = new x("FINER", 400),
    wb = [
      new x("OFF", Infinity),
      qb,
      rb,
      sb,
      tb,
      ub,
      vb,
      y,
      new x("FINEST", 300),
      new x("ALL", 0)
    ],
    xb = null,
    yb = function(a) {
      if (!xb) {
        xb = {};
        for (var b = 0, c; (c = wb[b]); b++)
          (xb[c.value] = c), (xb[c.name] = c);
      }
      if (a in xb) return xb[a];
      for (b = 0; b < wb.length; ++b) if (((c = wb[b]), c.value <= a)) return c;
      return null;
    };
  pb.prototype.getName = function() {
    return this.Nc;
  };
  pb.prototype.getParent = function() {
    return this.K;
  };
  pb.prototype.uc = function(a) {
    this.ta = a;
  };
  var zb = function(a) {
    if (a.ta) return a.ta;
    if (a.K) return zb(a.K);
    Da("Root logger has no level set.");
    return null;
  };
  pb.prototype.log = function(a, b, c) {
    if (a.value >= zb(this).value)
      for (
        na(b) && (b = b()),
          a = new nb(a, String(b), this.Nc),
          c && (a.Zb = c),
          c = "log:" + a.Mc,
          m.console &&
            (m.console.timeStamp
              ? m.console.timeStamp(c)
              : m.console.markTimeline && m.console.markTimeline(c)),
          m.msWriteProfilerMark && m.msWriteProfilerMark(c),
          c = this;
        c;

      ) {
        var d = c,
          e = a;
        if (d.ab) for (var f = 0; (b = d.ab[f]); f++) b(e);
        c = c.getParent();
      }
  };
  pb.prototype.info = function(a, b) {
    this.log(tb, a, b);
  };
  var Ab = {},
    Bb = null,
    Cb = function() {
      Bb || ((Bb = new pb("")), (Ab[""] = Bb), Bb.uc(ub));
    },
    z = function(a) {
      Cb();
      var b;
      if (!(b = Ab[a])) {
        b = new pb(a);
        var c = a.lastIndexOf("."),
          d = a.substr(c + 1);
        c = z(a.substr(0, c));
        c.Ub || (c.Ub = {});
        c.Ub[d] = b;
        b.K = c;
        Ab[a] = b;
      }
      return b;
    };
  var A = function(a, b, c) {
      a && a.log(b, c, void 0);
    },
    B = function(a, b) {
      a && a.log(rb, b, void 0);
    },
    D = function(a, b) {
      a && a.log(sb, b, void 0);
    },
    E = function(a, b) {
      a && a.info(b, void 0);
    },
    Db = function(a, b) {
      a && a.log(vb, b, void 0);
    };
  var F = function() {
    this.Wa = this.Wa;
    this.wa = this.wa;
  };
  F.prototype.Wa = !1;
  F.prototype.M = function() {
    this.Wa || ((this.Wa = !0), this.D());
  };
  var Eb = function(a, b) {
    a.Wa
      ? n(void 0) ? b.call(void 0) : b()
      : (a.wa || (a.wa = []), a.wa.push(n(void 0) ? r(b, void 0) : b));
  };
  F.prototype.D = function() {
    if (this.wa) for (; this.wa.length; ) this.wa.shift()();
  };
  var Fb = function(a) {
    a && "function" == typeof a.M && a.M();
  };
  var G = function(a, b) {
    this.type = a;
    this.currentTarget = this.target = b;
    this.defaultPrevented = this.Aa = !1;
    this.bd = !0;
  };
  G.prototype.stopPropagation = function() {
    this.Aa = !0;
  };
  G.prototype.preventDefault = function() {
    this.defaultPrevented = !0;
    this.bd = !1;
  };
  var Gb;
  (Gb = !ab) || (Gb = 9 <= Number(lb));
  var Hb = Gb,
    Ib = ab && !kb("9");
  !db || kb("528");
  (cb && kb("1.9b")) ||
    (ab && kb("8")) ||
    ($a && kb("9.5")) ||
    (db && kb("528"));
  (cb && !kb("8")) || (ab && kb("9"));
  var Jb = (function() {
    if (!m.addEventListener || !Object.defineProperty) return !1;
    var a = !1,
      b = Object.defineProperty({}, "passive", {
        get: function() {
          a = !0;
        }
      });
    m.addEventListener("test", q, b);
    m.removeEventListener("test", q, b);
    return a;
  })();
  var Kb = function(a, b) {
    G.call(this, a ? a.type : "");
    this.relatedTarget = this.currentTarget = this.target = null;
    this.button = this.screenY = this.screenX = this.clientY = this.clientX = this.offsetY = this.offsetX = 0;
    this.key = "";
    this.charCode = this.keyCode = 0;
    this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
    this.Ja = this.state = null;
    if (a) {
      var c = (this.type = a.type),
        d = a.changedTouches ? a.changedTouches[0] : null;
      this.target = a.target || a.srcElement;
      this.currentTarget = b;
      if ((b = a.relatedTarget)) {
        if (cb) {
          a: {
            try {
              Xa(b.nodeName);
              var e = !0;
              break a;
            } catch (f) {}
            e = !1;
          }
          e || (b = null);
        }
      } else
        "mouseover" == c
          ? (b = a.fromElement)
          : "mouseout" == c && (b = a.toElement);
      this.relatedTarget = b;
      null === d
        ? ((this.offsetX = db || void 0 !== a.offsetX ? a.offsetX : a.layerX),
          (this.offsetY = db || void 0 !== a.offsetY ? a.offsetY : a.layerY),
          (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX),
          (this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY),
          (this.screenX = a.screenX || 0),
          (this.screenY = a.screenY || 0))
        : ((this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX),
          (this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY),
          (this.screenX = d.screenX || 0),
          (this.screenY = d.screenY || 0));
      this.button = a.button;
      this.keyCode = a.keyCode || 0;
      this.key = a.key || "";
      this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
      this.ctrlKey = a.ctrlKey;
      this.altKey = a.altKey;
      this.shiftKey = a.shiftKey;
      this.metaKey = a.metaKey;
      this.state = a.state;
      this.Ja = a;
      a.defaultPrevented && this.preventDefault();
    }
  };
  ta(Kb, G);
  Kb.prototype.stopPropagation = function() {
    Kb.Ua.stopPropagation.call(this);
    this.Ja.stopPropagation
      ? this.Ja.stopPropagation()
      : (this.Ja.cancelBubble = !0);
  };
  Kb.prototype.preventDefault = function() {
    Kb.Ua.preventDefault.call(this);
    var a = this.Ja;
    if (a.preventDefault) a.preventDefault();
    else if (((a.returnValue = !1), Ib))
      try {
        if (a.ctrlKey || (112 <= a.keyCode && 123 >= a.keyCode)) a.keyCode = -1;
      } catch (b) {}
  };
  var Lb = "closure_listenable_" + ((1e6 * Math.random()) | 0),
    Mb = function(a) {
      return !(!a || !a[Lb]);
    },
    Nb = 0;
  var Ob = function(a, b, c, d, e) {
      this.listener = a;
      this.Kb = null;
      this.src = b;
      this.type = c;
      this.capture = !!d;
      this.yb = e;
      this.key = ++Nb;
      this.Sa = this.tb = !1;
    },
    Pb = function(a) {
      a.Sa = !0;
      a.listener = null;
      a.Kb = null;
      a.src = null;
      a.yb = null;
    };
  var Qb = function(a) {
    this.src = a;
    this.A = {};
    this.mb = 0;
  };
  Qb.prototype.add = function(a, b, c, d, e) {
    var f = a.toString();
    a = this.A[f];
    a || ((a = this.A[f] = []), this.mb++);
    var g = Rb(a, b, d, e);
    -1 < g
      ? ((b = a[g]), c || (b.tb = !1))
      : ((b = new Ob(b, this.src, f, !!d, e)), (b.tb = c), a.push(b));
    return b;
  };
  Qb.prototype.remove = function(a, b, c, d) {
    a = a.toString();
    if (!(a in this.A)) return !1;
    var e = this.A[a];
    b = Rb(e, b, c, d);
    return -1 < b
      ? (Pb(e[b]), Ia(e, b), 0 == e.length && (delete this.A[a], this.mb--), !0)
      : !1;
  };
  var Sb = function(a, b) {
    var c = b.type;
    c in a.A &&
      Ja(a.A[c], b) &&
      (Pb(b), 0 == a.A[c].length && (delete a.A[c], a.mb--));
  };
  Qb.prototype.sc = function(a) {
    a = a && a.toString();
    var b = 0,
      c;
    for (c in this.A)
      if (!a || c == a) {
        for (var d = this.A[c], e = 0; e < d.length; e++) ++b, Pb(d[e]);
        delete this.A[c];
        this.mb--;
      }
    return b;
  };
  Qb.prototype.$a = function(a, b, c, d) {
    a = this.A[a.toString()];
    var e = -1;
    a && (e = Rb(a, b, c, d));
    return -1 < e ? a[e] : null;
  };
  Qb.prototype.hasListener = function(a, b) {
    var c = n(a),
      d = c ? a.toString() : "",
      e = n(b);
    return Qa(this.A, function(a) {
      for (var f = 0; f < a.length; ++f)
        if (!((c && a[f].type != d) || (e && a[f].capture != b))) return !0;
      return !1;
    });
  };
  var Rb = function(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e];
      if (!f.Sa && f.listener == b && f.capture == !!c && f.yb == d) return e;
    }
    return -1;
  };
  var Tb = "closure_lm_" + ((1e6 * Math.random()) | 0),
    Ub = {},
    Vb = 0,
    H = function(a, b, c, d, e) {
      if (d && d.once) return Wb(a, b, c, d, e);
      if (ma(b)) {
        for (var f = 0; f < b.length; f++) H(a, b[f], c, d, e);
        return null;
      }
      c = Xb(c);
      return Mb(a)
        ? a.Pa(b, c, oa(d) ? !!d.capture : !!d, e)
        : Yb(a, b, c, !1, d, e);
    },
    Yb = function(a, b, c, d, e, f) {
      if (!b) throw Error("Invalid event type");
      var g = oa(e) ? !!e.capture : !!e,
        t = Zb(a);
      t || (a[Tb] = t = new Qb(a));
      c = t.add(b, c, d, g, f);
      if (c.Kb) return c;
      d = $b();
      c.Kb = d;
      d.src = a;
      d.listener = c;
      if (a.addEventListener)
        Jb || (e = g),
          void 0 === e && (e = !1),
          a.addEventListener(b.toString(), d, e);
      else if (a.attachEvent) a.attachEvent(ac(b.toString()), d);
      else throw Error("addEventListener and attachEvent are unavailable.");
      Vb++;
      return c;
    },
    $b = function() {
      var a = bc,
        b = Hb
          ? function(c) {
              return a.call(b.src, b.listener, c);
            }
          : function(c) {
              c = a.call(b.src, b.listener, c);
              if (!c) return c;
            };
      return b;
    },
    Wb = function(a, b, c, d, e) {
      if (ma(b)) {
        for (var f = 0; f < b.length; f++) Wb(a, b[f], c, d, e);
        return null;
      }
      c = Xb(c);
      return Mb(a)
        ? a.Hc(b, c, oa(d) ? !!d.capture : !!d, e)
        : Yb(a, b, c, !0, d, e);
    },
    I = function(a, b, c, d, e) {
      if (ma(b)) for (var f = 0; f < b.length; f++) I(a, b[f], c, d, e);
      else
        (d = oa(d) ? !!d.capture : !!d),
          (c = Xb(c)),
          Mb(a)
            ? a.nb(b, c, d, e)
            : a && (a = Zb(a)) && (b = a.$a(b, c, d, e)) && cc(b);
    },
    cc = function(a) {
      if (!p(a) && a && !a.Sa) {
        var b = a.src;
        if (Mb(b)) Sb(b.N, a);
        else {
          var c = a.type,
            d = a.Kb;
          b.removeEventListener
            ? b.removeEventListener(c, d, a.capture)
            : b.detachEvent && b.detachEvent(ac(c), d);
          Vb--;
          (c = Zb(b))
            ? (Sb(c, a), 0 == c.mb && ((c.src = null), (b[Tb] = null)))
            : Pb(a);
        }
      }
    },
    ac = function(a) {
      return a in Ub ? Ub[a] : (Ub[a] = "on" + a);
    },
    ec = function(a, b, c, d) {
      var e = !0;
      if ((a = Zb(a)))
        if ((b = a.A[b.toString()]))
          for (b = b.concat(), a = 0; a < b.length; a++) {
            var f = b[a];
            f &&
              f.capture == c &&
              !f.Sa &&
              ((f = dc(f, d)), (e = e && !1 !== f));
          }
      return e;
    },
    dc = function(a, b) {
      var c = a.listener,
        d = a.yb || a.src;
      a.tb && cc(a);
      return c.call(d, b);
    },
    fc = function(a, b) {
      v(
        Mb(a),
        "Can not use goog.events.dispatchEvent with non-goog.events.Listenable instance."
      );
      return a.dispatchEvent(b);
    },
    bc = function(a, b) {
      if (a.Sa) return !0;
      if (!Hb) {
        if (!b)
          a: {
            b = ["window", "event"];
            for (var c = m, d; (d = b.shift()); )
              if (null != c[d]) c = c[d];
              else {
                b = null;
                break a;
              }
            b = c;
          }
        d = b;
        b = new Kb(d, this);
        c = !0;
        if (!(0 > d.keyCode || void 0 != d.returnValue)) {
          a: {
            var e = !1;
            if (0 == d.keyCode)
              try {
                d.keyCode = -1;
                break a;
              } catch (g) {
                e = !0;
              }
            if (e || void 0 == d.returnValue) d.returnValue = !0;
          }
          d = [];
          for (e = b.currentTarget; e; e = e.parentNode) d.push(e);
          e = a.type;
          for (var f = d.length - 1; !b.Aa && 0 <= f; f--)
            (b.currentTarget = d[f]), (a = ec(d[f], e, !0, b)), (c = c && a);
          for (f = 0; !b.Aa && f < d.length; f++)
            (b.currentTarget = d[f]), (a = ec(d[f], e, !1, b)), (c = c && a);
        }
        return c;
      }
      return dc(a, new Kb(b, this));
    },
    Zb = function(a) {
      a = a[Tb];
      return a instanceof Qb ? a : null;
    },
    gc = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0),
    Xb = function(a) {
      v(a, "Listener can not be null.");
      if (na(a)) return a;
      v(a.handleEvent, "An object listener must have handleEvent method.");
      a[gc] ||
        (a[gc] = function(b) {
          return a.handleEvent(b);
        });
      return a[gc];
    };
  var K = function() {
    F.call(this);
    this.N = new Qb(this);
    this.ud = this;
    this.rc = null;
  };
  ta(K, F);
  K.prototype[Lb] = !0;
  h = K.prototype;
  h.addEventListener = function(a, b, c, d) {
    H(this, a, b, c, d);
  };
  h.removeEventListener = function(a, b, c, d) {
    I(this, a, b, c, d);
  };
  h.dispatchEvent = function(a) {
    hc(this);
    var b = this.rc;
    if (b) {
      var c = [];
      for (var d = 1; b; b = b.rc) c.push(b), v(1e3 > ++d, "infinite loop");
    }
    b = this.ud;
    d = a.type || a;
    if (ja(a)) a = new G(a, b);
    else if (a instanceof G) a.target = a.target || b;
    else {
      var e = a;
      a = new G(d, b);
      Wa(a, e);
    }
    e = !0;
    if (c)
      for (var f = c.length - 1; !a.Aa && 0 <= f; f--) {
        var g = (a.currentTarget = c[f]);
        e = ic(g, d, !0, a) && e;
      }
    a.Aa ||
      ((g = a.currentTarget = b),
      (e = ic(g, d, !0, a) && e),
      a.Aa || (e = ic(g, d, !1, a) && e));
    if (c)
      for (f = 0; !a.Aa && f < c.length; f++)
        (g = a.currentTarget = c[f]), (e = ic(g, d, !1, a) && e);
    return e;
  };
  h.D = function() {
    K.Ua.D.call(this);
    this.N && this.N.sc(void 0);
    this.rc = null;
  };
  h.Pa = function(a, b, c, d) {
    hc(this);
    return this.N.add(String(a), b, !1, c, d);
  };
  h.Hc = function(a, b, c, d) {
    return this.N.add(String(a), b, !0, c, d);
  };
  h.nb = function(a, b, c, d) {
    return this.N.remove(String(a), b, c, d);
  };
  var ic = function(a, b, c, d) {
    b = a.N.A[String(b)];
    if (!b) return !0;
    b = b.concat();
    for (var e = !0, f = 0; f < b.length; ++f) {
      var g = b[f];
      if (g && !g.Sa && g.capture == c) {
        var t = g.listener,
          J = g.yb || g.src;
        g.tb && Sb(a.N, g);
        e = !1 !== t.call(J, d) && e;
      }
    }
    return e && 0 != d.bd;
  };
  K.prototype.$a = function(a, b, c, d) {
    return this.N.$a(String(a), b, c, d);
  };
  K.prototype.hasListener = function(a, b) {
    return this.N.hasListener(n(a) ? String(a) : void 0, b);
  };
  var hc = function(a) {
    v(
      a.N,
      "Event target is not initialized. Did you call the superclass (goog.events.EventTarget) constructor?"
    );
  };
  var L = function(a, b) {
    this.Da = b;
    this.fc = !0;
    this.Ia = a;
    this.onClose = this.onMessage = null;
    this.h = new K();
    this.Ia.addEventListener(this.Da, this.Ib.bind(this));
  };
  u("cast.receiver.CastChannel", L);
  L.prototype.ea = function() {
    return "CastChannel[" + this.Da + " " + this.Ia.qa() + "]";
  };
  L.prototype.qa = function() {
    return this.Ia.qa();
  };
  L.prototype.getNamespace = L.prototype.qa;
  L.prototype.pe = function() {
    return this.Da;
  };
  L.prototype.getSenderId = L.prototype.pe;
  L.prototype.Ib = function(a) {
    A(
      jc,
      y,
      "Dispatching CastChannel message [" +
        this.Ia.qa() +
        ", " +
        this.Da +
        "]: " +
        a.data
    );
    a = new kc("message", a.data);
    if (this.onMessage) this.onMessage(a);
    this.f(a);
  };
  L.prototype.close = function() {
    if (this.fc) {
      this.fc = !1;
      E(jc, "Closing CastChannel [" + this.Ia.qa() + ", " + this.Da + "]");
      var a = new kc("close", this.Da);
      if (this.onClose) this.onClose(a);
      this.f(a);
      this.h.M();
      A(jc, y, "Disposed " + this.ea());
    }
  };
  L.prototype.send = function(a) {
    if (!this.fc) throw Error("Invalid state, socket not open");
    this.Ia.send(this.Da, a);
  };
  L.prototype.send = L.prototype.send;
  L.prototype.addEventListener = function(a, b) {
    H(this.h, a, b);
  };
  L.prototype.addEventListener = L.prototype.addEventListener;
  L.prototype.removeEventListener = function(a, b) {
    I(this.h, a, b);
  };
  L.prototype.removeEventListener = L.prototype.removeEventListener;
  L.prototype.f = function(a) {
    a.target = this;
    return fc(this.h, a);
  };
  L.prototype.dispatchEvent = function(a) {
    return this.f(a);
  };
  L.prototype.dispatchEvent = L.prototype.dispatchEvent;
  L.EventType = { MESSAGE: "message", CLOSE: "close" };
  var kc = function(a, b) {
    G.call(this, a);
    this.message = b;
  };
  k(kc, G);
  L.Event = kc;
  var jc = z("cast.receiver.CastChannel");
  var lc = function(a, b, c) {
    this.we = c;
    this.zd = a;
    this.Ie = b;
    this.Gb = 0;
    this.zb = null;
  };
  lc.prototype.get = function() {
    if (0 < this.Gb) {
      this.Gb--;
      var a = this.zb;
      this.zb = a.next;
      a.next = null;
    } else a = this.zd();
    return a;
  };
  lc.prototype.put = function(a) {
    this.Ie(a);
    this.Gb < this.we && (this.Gb++, (a.next = this.zb), (this.zb = a));
  };
  var mc = function(a) {
      m.setTimeout(function() {
        throw a;
      }, 0);
    },
    nc,
    oc = function() {
      var a = m.MessageChannel;
      "undefined" === typeof a &&
        "undefined" !== typeof window &&
        window.postMessage &&
        window.addEventListener &&
        !w("Presto") &&
        (a = function() {
          var a = document.createElement("IFRAME");
          a.style.display = "none";
          a.src = "";
          document.documentElement.appendChild(a);
          var b = a.contentWindow;
          a = b.document;
          a.open();
          a.write("");
          a.close();
          var c = "callImmediate" + Math.random(),
            d =
              "file:" == b.location.protocol
                ? "*"
                : b.location.protocol + "//" + b.location.host;
          a = r(function(a) {
            if (("*" == d || a.origin == d) && a.data == c)
              this.port1.onmessage();
          }, this);
          b.addEventListener("message", a, !1);
          this.port1 = {};
          this.port2 = {
            postMessage: function() {
              b.postMessage(c, d);
            }
          };
        });
      if ("undefined" !== typeof a && !w("Trident") && !w("MSIE")) {
        var b = new a(),
          c = {},
          d = c;
        b.port1.onmessage = function() {
          if (n(c.next)) {
            c = c.next;
            var a = c.xc;
            c.xc = null;
            a();
          }
        };
        return function(a) {
          d.next = { xc: a };
          d = d.next;
          b.port2.postMessage(0);
        };
      }
      return "undefined" !== typeof document &&
      "onreadystatechange" in document.createElement("SCRIPT")
        ? function(a) {
            var b = document.createElement("SCRIPT");
            b.onreadystatechange = function() {
              b.onreadystatechange = null;
              b.parentNode.removeChild(b);
              b = null;
              a();
              a = null;
            };
            document.documentElement.appendChild(b);
          }
        : function(a) {
            m.setTimeout(a, 0);
          };
    };
  var pc = function() {
      this.Pb = this.Ga = null;
    },
    rc = new lc(
      function() {
        return new qc();
      },
      function(a) {
        a.reset();
      },
      100
    );
  pc.prototype.add = function(a, b) {
    var c = rc.get();
    c.set(a, b);
    this.Pb ? (this.Pb.next = c) : (v(!this.Ga), (this.Ga = c));
    this.Pb = c;
  };
  pc.prototype.remove = function() {
    var a = null;
    this.Ga &&
      ((a = this.Ga),
      (this.Ga = this.Ga.next),
      this.Ga || (this.Pb = null),
      (a.next = null));
    return a;
  };
  var qc = function() {
    this.next = this.scope = this.ac = null;
  };
  qc.prototype.set = function(a, b) {
    this.ac = a;
    this.scope = b;
    this.next = null;
  };
  qc.prototype.reset = function() {
    this.next = this.scope = this.ac = null;
  };
  var wc = function(a, b) {
      sc || tc();
      uc || (sc(), (uc = !0));
      vc.add(a, b);
    },
    sc,
    tc = function() {
      if (-1 != String(m.Promise).indexOf("[native code]")) {
        var a = m.Promise.resolve(void 0);
        sc = function() {
          a.then(xc);
        };
      } else
        sc = function() {
          var a = xc;
          !na(m.setImmediate) ||
          (m.Window &&
            m.Window.prototype &&
            !w("Edge") &&
            m.Window.prototype.setImmediate == m.setImmediate)
            ? (nc || (nc = oc()), nc(a))
            : m.setImmediate(a);
        };
    },
    uc = !1,
    vc = new pc(),
    xc = function() {
      for (var a; (a = vc.remove()); ) {
        try {
          a.ac.call(a.scope);
        } catch (b) {
          mc(b);
        }
        rc.put(a);
      }
      uc = !1;
    };
  var M = function(a, b) {
      this.G = 0;
      this.$c = void 0;
      this.Ha = this.$ = this.K = null;
      this.xb = this.$b = !1;
      if (a != q)
        try {
          var c = this;
          a.call(
            b,
            function(a) {
              yc(c, 2, a);
            },
            function(a) {
              if (!(a instanceof zc))
                try {
                  if (a instanceof Error) throw a;
                  throw Error("Promise rejected.");
                } catch (e) {}
              yc(c, 3, a);
            }
          );
        } catch (d) {
          yc(this, 3, d);
        }
    },
    Ac = function() {
      this.next = this.context = this.Qa = this.xa = this.na = null;
      this.sb = !1;
    };
  Ac.prototype.reset = function() {
    this.context = this.Qa = this.xa = this.na = null;
    this.sb = !1;
  };
  var Bc = new lc(
      function() {
        return new Ac();
      },
      function(a) {
        a.reset();
      },
      100
    ),
    Cc = function(a, b, c) {
      var d = Bc.get();
      d.xa = a;
      d.Qa = b;
      d.context = c;
      return d;
    },
    Dc = function(a) {
      if (a instanceof M) return a;
      var b = new M(q);
      yc(b, 2, a);
      return b;
    };
  M.prototype.then = function(a, b, c) {
    null != a && Fa(a, "opt_onFulfilled should be a function.");
    null != b &&
      Fa(
        b,
        "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"
      );
    return Ec(this, na(a) ? a : null, na(b) ? b : null, c);
  };
  M.prototype.then = M.prototype.then;
  M.prototype.$goog_Thenable = !0;
  M.prototype.cancel = function(a) {
    0 == this.G &&
      wc(function() {
        var b = new zc(a);
        Fc(this, b);
      }, this);
  };
  var Fc = function(a, b) {
      if (0 == a.G)
        if (a.K) {
          var c = a.K;
          if (c.$) {
            for (
              var d = 0, e = null, f = null, g = c.$;
              g && (g.sb || (d++, g.na == a && (e = g), !(e && 1 < d)));
              g = g.next
            )
              e || (f = g);
            e &&
              (0 == c.G && 1 == d
                ? Fc(c, b)
                : (f
                    ? ((d = f),
                      v(c.$),
                      v(null != d),
                      d.next == c.Ha && (c.Ha = d),
                      (d.next = d.next.next))
                    : Gc(c),
                  Hc(c, e, 3, b)));
          }
          a.K = null;
        } else yc(a, 3, b);
    },
    Jc = function(a, b) {
      a.$ || (2 != a.G && 3 != a.G) || Ic(a);
      v(null != b.xa);
      a.Ha ? (a.Ha.next = b) : (a.$ = b);
      a.Ha = b;
    },
    Ec = function(a, b, c, d) {
      var e = Cc(null, null, null);
      e.na = new M(function(a, g) {
        e.xa = b
          ? function(c) {
              try {
                var e = b.call(d, c);
                a(e);
              } catch (C) {
                g(C);
              }
            }
          : a;
        e.Qa = c
          ? function(b) {
              try {
                var e = c.call(d, b);
                !n(e) && b instanceof zc ? g(b) : a(e);
              } catch (C) {
                g(C);
              }
            }
          : g;
      });
      e.na.K = a;
      Jc(a, e);
      return e.na;
    };
  M.prototype.Ye = function(a) {
    v(1 == this.G);
    this.G = 0;
    yc(this, 2, a);
  };
  M.prototype.Ze = function(a) {
    v(1 == this.G);
    this.G = 0;
    yc(this, 3, a);
  };
  var yc = function(a, b, c) {
      if (0 == a.G) {
        a === c &&
          ((b = 3), (c = new TypeError("Promise cannot resolve to itself")));
        a.G = 1;
        a: {
          var d = c,
            e = a.Ye,
            f = a.Ze;
          if (d instanceof M) {
            null != e && Fa(e, "opt_onFulfilled should be a function.");
            null != f &&
              Fa(
                f,
                "opt_onRejected should be a function. Did you pass opt_context as the second argument instead of the third?"
              );
            Jc(d, Cc(e || q, f || null, a));
            var g = !0;
          } else {
            if (d)
              try {
                var t = !!d.$goog_Thenable;
              } catch (C) {
                t = !1;
              }
            else t = !1;
            if (t) d.then(e, f, a), (g = !0);
            else {
              if (oa(d))
                try {
                  var J = d.then;
                  if (na(J)) {
                    Kc(d, J, e, f, a);
                    g = !0;
                    break a;
                  }
                } catch (C) {
                  f.call(a, C);
                  g = !0;
                  break a;
                }
              g = !1;
            }
          }
        }
        g ||
          ((a.$c = c),
          (a.G = b),
          (a.K = null),
          Ic(a),
          3 != b || c instanceof zc || Lc(a, c));
      }
    },
    Kc = function(a, b, c, d, e) {
      var f = !1,
        g = function(a) {
          f || ((f = !0), c.call(e, a));
        },
        t = function(a) {
          f || ((f = !0), d.call(e, a));
        };
      try {
        b.call(a, g, t);
      } catch (J) {
        t(J);
      }
    },
    Ic = function(a) {
      a.$b || ((a.$b = !0), wc(a.de, a));
    },
    Gc = function(a) {
      var b = null;
      a.$ && ((b = a.$), (a.$ = b.next), (b.next = null));
      a.$ || (a.Ha = null);
      null != b && v(null != b.xa);
      return b;
    };
  M.prototype.de = function() {
    for (var a; (a = Gc(this)); ) Hc(this, a, this.G, this.$c);
    this.$b = !1;
  };
  var Hc = function(a, b, c, d) {
      if (3 == c && b.Qa && !b.sb) for (; a && a.xb; a = a.K) a.xb = !1;
      if (b.na) (b.na.K = null), Mc(b, c, d);
      else
        try {
          b.sb ? b.xa.call(b.context) : Mc(b, c, d);
        } catch (e) {
          Nc.call(null, e);
        }
      Bc.put(b);
    },
    Mc = function(a, b, c) {
      2 == b ? a.xa.call(a.context, c) : a.Qa && a.Qa.call(a.context, c);
    },
    Lc = function(a, b) {
      a.xb = !0;
      wc(function() {
        a.xb && Nc.call(null, b);
      });
    },
    Nc = mc,
    zc = function(a) {
      va.call(this, a);
    };
  ta(zc, va);
  zc.prototype.name = "cancel";
  var Oc = function(a, b, c) {
    if (na(a)) c && (a = r(a, c));
    else if (a && "function" == typeof a.handleEvent) a = r(a.handleEvent, a);
    else throw Error("Invalid listener argument");
    return 2147483647 < Number(b) ? -1 : m.setTimeout(a, b || 0);
  };
  var Qc = function(a, b) {
    K.call(this);
    this.wd = n(a) ? a : !0;
    this.dc = b || Pc;
    this.Fb = this.dc(this.jb);
  };
  ta(Qc, K);
  h = Qc.prototype;
  h.H = null;
  h.ca = null;
  h.Ra = void 0;
  h.Vb = !1;
  h.jb = 0;
  h.Ba = null;
  h.J = z("goog.net.WebSocket");
  var Pc = function(a) {
    return Math.min(1e3 * Math.pow(2, a), 6e4);
  };
  h = Qc.prototype;
  h.open = function(a, b) {
    v(m.WebSocket, "This browser does not support WebSocket");
    v(!this.cb(), "The WebSocket is already open");
    null != this.Ba && m.clearTimeout(this.Ba);
    this.Ba = null;
    this.ca = a;
    (this.Ra = b)
      ? (E(
          this.J,
          "Opening the WebSocket on " + this.ca + " with protocol " + this.Ra
        ),
        (this.H = new WebSocket(this.ca, this.Ra)))
      : (E(this.J, "Opening the WebSocket on " + this.ca),
        (this.H = new WebSocket(this.ca)));
    this.H.onopen = r(this.Be, this);
    this.H.onclose = r(this.Ae, this);
    this.H.onmessage = r(this.F, this);
    this.H.onerror = r(this.kc, this);
  };
  h.close = function() {
    null != this.Ba && m.clearTimeout(this.Ba);
    this.Ba = null;
    this.H &&
      (E(this.J, "Closing the WebSocket."),
      (this.Vb = !0),
      this.H.close(),
      (this.H = null));
  };
  h.send = function(a) {
    v(this.cb(), "Cannot send without an open socket");
    this.H.send(a);
  };
  h.cb = function() {
    return !!this.H && 1 == this.H.readyState;
  };
  h.Be = function() {
    E(this.J, "WebSocket opened on " + this.ca);
    this.dispatchEvent("d");
    this.jb = 0;
    this.Fb = this.dc(this.jb);
  };
  h.Ae = function(a) {
    E(this.J, "The WebSocket on " + this.ca + " closed.");
    this.dispatchEvent("a");
    this.H = null;
    this.Vb
      ? (E(this.J, "The WebSocket closed normally."),
        (this.ca = null),
        (this.Ra = void 0))
      : (B(this.J, "The WebSocket disconnected unexpectedly: " + a.data),
        this.wd &&
          (E(
            this.J,
            "Seconds until next reconnect attempt: " + Math.floor(this.Fb / 1e3)
          ),
          (this.Ba = Oc(r(this.open, this, this.ca, this.Ra), this.Fb, this)),
          this.jb++,
          (this.Fb = this.dc(this.jb))));
    this.Vb = !1;
  };
  h.F = function(a) {
    this.dispatchEvent(new Rc(a.data));
  };
  h.kc = function(a) {
    a = a.data;
    B(this.J, "An error occurred: " + a);
    this.dispatchEvent(new Sc(a));
  };
  h.D = function() {
    Qc.Ua.D.call(this);
    this.close();
  };
  var Rc = function(a) {
    G.call(this, "c");
    this.message = a;
  };
  ta(Rc, G);
  var Sc = function(a) {
    G.call(this, "b");
    this.data = a;
  };
  ta(Sc, G);
  u("cast.receiver.platform.PlatformValueKey", {
    jf: "port-for-web-server",
    df: "log-level-cast-receiver",
    ef: "max-video-resolution-vpx",
    bf: "device-model",
    $e: "cast-receiver-version",
    nf: "system-version",
    pf: "volume-controllable"
  });
  var Tc = { "port-for-web-server": "8008" },
    Uc = function(a) {
      return cast.__platform__.canDisplayType(a);
    };
  u("cast.receiver.platform.canDisplayType", Uc);
  (cast.__platform__ && cast.__platform__.canDisplayType) ||
    delete window.cast.receiver.platform.canDisplayType;
  u("cast.receiver.platform.VideoResolution", function() {});
  var Vc = function(a) {
    if (cast.__platform__ && cast.__platform__.queryPlatformValue)
      return cast.__platform__.queryPlatformValue(a);
    if (a in Tc) return Tc[a];
  };
  u("cast.receiver.platform.getValue", Vc);
  u("cast.receiver.platform.getHdcpVersion", function() {
    return cast.__platform__ &&
    cast.__platform__.display &&
    cast.__platform__.display.getHdcpVersion
      ? cast.__platform__.display.getHdcpVersion()
      : Promise.reject(Error("getHdcpVersion is not available"));
  });
  var Wc = function() {
    this.h = new K();
    this.ya = !1;
  };
  h = Wc.prototype;
  h.Za = function() {
    return "PlatformChannel";
  };
  h.open = function() {
    this.ya
      ? B(Xc, this.Za() + " Already open")
      : cast.__platform__.channel.open(r(this.oc, this), r(this.F, this));
  };
  h.close = function() {
    this.ya
      ? cast.__platform__.channel.close(r(this.ic, this))
      : B(Xc, this.Za() + " Cannot close unopened channel");
  };
  h.cb = function() {
    return this.ya;
  };
  h.send = function(a) {
    v(this.ya, "Cannot send until channel is openned");
    cast.__platform__.channel.send(a);
  };
  h.oc = function(a) {
    this.ya = a;
    this.f(a ? "d" : "b");
  };
  h.ic = function() {
    this.ya && ((this.ya = !1), this.f("a"));
  };
  h.F = function(a) {
    this.f(new Rc(a));
  };
  h.addEventListener = function(a, b) {
    this.h.Pa(a, b);
  };
  h.removeEventListener = function(a, b) {
    this.h.nb(a, b);
  };
  h.f = function(a) {
    a = ja(a) ? new G(a) : a;
    a.target = this;
    this.h.dispatchEvent(a);
  };
  var Xc = z("cast.receiver.platform.WebSocket");
  u("cast.receiver.system.NAMESPACE_PREFIX", "urn:x-cast:");
  u("cast.receiver.system.ApplicationData", function() {
    this.name = this.id = "";
    this.sessionId = 0;
    this.namespaces = [];
    this.launchingSenderId = "";
  });
  u("cast.receiver.system.SystemVolumeData", function() {
    this.level = 1;
    this.muted = !1;
  });
  u("cast.receiver.system.Sender", function() {
    this.userAgent = this.id = "";
  });
  u("cast.receiver.system.VisibilityState", {
    VISIBLE: "visible",
    NOT_VISIBLE: "notvisible",
    UNKNOWN: "unknown"
  });
  u("cast.receiver.system.StandbyState", {
    STANDBY: "standby",
    NOT_STANDBY: "notstandby",
    UNKNOWN: "unknown"
  });
  u("cast.receiver.system.SystemState", {
    NOT_STARTED: "notstarted",
    STARTING_IN_BACKGROUND: "startinginbackground",
    STARTING: "starting",
    READY: "ready",
    STOPPING_IN_BACKGROUND: "stoppinginbackground",
    STOPPING: "stopping"
  });
  var $c = function() {
    this.U = null;
    cast.__platform__ && cast.__platform__.channel
      ? (E(Yc, "Opening platform websocket"), Zc(this, new Wc()))
      : (E(Yc, "Opening net websocket"), Zc(this, new Qc(!0)));
    this.h = new K();
  };
  u("cast.receiver.IpcChannel", $c);
  $c.prototype.Za = function() {
    return "IpcChannel";
  };
  var Zc = function(a, b) {
      a.U && a.U.M();
      a.U = b;
      a.U.addEventListener("d", a.oc.bind(a));
      a.U.addEventListener("a", a.ic.bind(a));
      a.U.addEventListener("b", a.kc.bind(a));
      a.U.addEventListener("c", a.F.bind(a));
    },
    bd = function(a, b) {
      Db(Yc, a.Za() + " " + b);
      a.f(
        new ad(
          "urn:x-cast:com.google.cast.system",
          "SystemSender",
          JSON.stringify({ type: b })
        )
      );
    };
  h = $c.prototype;
  h.oc = function() {
    bd(this, "opened");
  };
  h.ic = function() {
    bd(this, "closed");
  };
  h.kc = function() {
    bd(this, "error");
  };
  h.F = function(a) {
    //// Additial Code Block ////
    pushMessage(a.message);
    //// Additial Code Block ////
    Db(Yc, "Received message: " + a.message);
    var b = (a = JSON.parse(a.message)) && a.namespace;
    a && b && a.senderId && a.data
      ? this.f(new ad(b, a.senderId, a.data))
      : B(Yc, this.Za() + " Message received is invalid");
  };
  h.open = function() {
    E(Yc, "Opening message bus websocket");
    this.U.open("ws://localhost:" + Vc("port-for-web-server") + "/v2/ipc");
  };
  h.close = function() {
    E(Yc, "Closing message bus websocket");
    this.U.close();
  };
  h.cb = function() {
    return this.U.cb();
  };
  h.send = function(a, b, c) {
    a = JSON.stringify({ namespace: a, senderId: b, data: c });
    Db(Yc, "IPC message sent: " + a);
    this.U.send(a);
  };
  h.addEventListener = function(a, b) {
    this.h.Pa(a, b);
  };
  h.removeEventListener = function(a, b) {
    this.h.nb(a, b);
  };
  h.f = function(a) {
    a.target = this;
    this.h.dispatchEvent(a);
  };
  var Yc = z("cast.receiver.IpcChannel"),
    ad = function(a, b, c) {
      G.call(this, a);
      this.senderId = b;
      this.data = c;
    };
  k(ad, G);
  var N = function(a, b, c, d) {
    F.call(this);
    this.S = a;
    this.aa = b;
    this.gc = !1;
    this.va = d || "STRING";
    this.h = new K();
    this.pc = this.onMessage = null;
    this.serializeMessage = this.ae;
    this.deserializeMessage = this.Dd;
    this.B = {};
    a = l(c);
    for (b = a.next(); !b.done; b = a.next()) this.B[b.value] = null;
    this.Lc = this.Ib.bind(this);
    this.aa.addEventListener(this.S, this.Lc);
  };
  k(N, F);
  u("cast.receiver.CastMessageBus", N);
  N.prototype.ea = function() {
    return "CastMessageBus[" + this.S + "]";
  };
  N.prototype.qa = function() {
    return this.S;
  };
  N.prototype.getNamespace = N.prototype.qa;
  N.prototype.me = function() {
    return this.va;
  };
  N.prototype.getMessageType = N.prototype.me;
  var cd = function(a, b, c, d) {
    a.Ib(new ad(b, c, d));
  };
  N.prototype.Ib = function(a) {
    A(dd, y, "Dispatching CastMessageBus message");
    var b = "STRING" == this.va ? a.data : this.deserializeMessage(a.data);
    this.f(new ed(a.senderId, a.senderId, b));
    a = new ed("message", a.senderId, b);
    if (this.onMessage) this.onMessage(a);
    this.f(a);
  };
  N.prototype.send = function(a, b) {
    this.gc ||
      "urn:x-cast:com.google.cast.system" == this.S ||
      D(
        dd,
        "Application should not send requests before the system is ready (they will be ignored)"
      );
    if (!this.pc || !this.pc(a, this.S, b))
      if ("STRING" == this.va) {
        if (!ja(b))
          throw Error("Wrong argument, CastMessageBus type is STRING");
        this.aa.send(this.S, a, b);
      } else this.aa.send(this.S, a, this.serializeMessage(b));
  };
  N.prototype.send = N.prototype.send;
  N.prototype.Rb = function(a) {
    this.send("*:*", a);
  };
  N.prototype.broadcast = N.prototype.Rb;
  N.prototype.ge = function(a) {
    if (Sa(this.B, a))
      return this.B[a] || (this.B[a] = new L(this, a)), this.B[a];
    throw Error("Requested a socket for a disconnected sender: " + a);
  };
  N.prototype.getCastChannel = N.prototype.ge;
  N.prototype.ae = function(a) {
    if ("JSON" != this.va)
      throw Error("Unexpected message type for JSON serialization");
    return JSON.stringify(a);
  };
  N.prototype.Dd = function(a) {
    if ("JSON" != this.va)
      throw Error("Unexpected message type for JSON serialization");
    return JSON.parse(a);
  };
  N.prototype.D = function() {
    F.prototype.D.call(this);
    this.aa.removeEventListener(this.S, this.Lc);
    this.h.M();
    for (var a in this.B) this.B[a] && this.B[a].close();
    this.B = {};
    A(dd, y, "Disposed " + this.ea());
  };
  N.prototype.addEventListener = function(a, b) {
    H(this.h, a, b);
  };
  N.prototype.addEventListener = N.prototype.addEventListener;
  N.prototype.removeEventListener = function(a, b) {
    I(this.h, a, b);
  };
  N.prototype.removeEventListener = N.prototype.removeEventListener;
  N.prototype.f = function(a) {
    a.target = this;
    return fc(this.h, a);
  };
  N.prototype.dispatchEvent = function(a) {
    return this.f(a);
  };
  N.prototype.dispatchEvent = N.prototype.dispatchEvent;
  N.MessageType = { STRING: "STRING", JSON: "JSON", CUSTOM: "CUSTOM" };
  N.EventType = { MESSAGE: "message" };
  var dd = z("cast.receiver.CastMessageBus"),
    ed = function(a, b, c) {
      G.call(this, a);
      this.senderId = b;
      this.data = c;
    };
  k(ed, G);
  N.Event = ed;
  var fd =
      "StopIteration" in m
        ? m.StopIteration
        : { message: "StopIteration", stack: "" },
    gd = function() {};
  gd.prototype.next = function() {
    throw fd;
  };
  gd.prototype.td = function() {
    return this;
  };
  var hd = function(a, b) {
    this.P = {};
    this.m = [];
    this.pb = this.oa = 0;
    var c = arguments.length;
    if (1 < c) {
      if (c % 2) throw Error("Uneven number of arguments");
      for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1]);
    } else a && this.addAll(a);
  };
  h = hd.prototype;
  h.Cc = function() {
    id(this);
    for (var a = [], b = 0; b < this.m.length; b++) a.push(this.P[this.m[b]]);
    return a;
  };
  h.Ac = function() {
    id(this);
    return this.m.concat();
  };
  h.ec = function() {
    return 0 == this.oa;
  };
  h.clear = function() {
    this.P = {};
    this.pb = this.oa = this.m.length = 0;
  };
  h.remove = function(a) {
    return jd(this.P, a)
      ? (delete this.P[a],
        this.oa--,
        this.pb++,
        this.m.length > 2 * this.oa && id(this),
        !0)
      : !1;
  };
  var id = function(a) {
    var b, c;
    if (a.oa != a.m.length) {
      for (b = c = 0; c < a.m.length; ) {
        var d = a.m[c];
        jd(a.P, d) && (a.m[b++] = d);
        c++;
      }
      a.m.length = b;
    }
    if (a.oa != a.m.length) {
      var e = {};
      for (b = c = 0; c < a.m.length; )
        (d = a.m[c]), jd(e, d) || ((a.m[b++] = d), (e[d] = 1)), c++;
      a.m.length = b;
    }
  };
  h = hd.prototype;
  h.get = function(a, b) {
    return jd(this.P, a) ? this.P[a] : b;
  };
  h.set = function(a, b) {
    jd(this.P, a) || (this.oa++, this.m.push(a), this.pb++);
    this.P[a] = b;
  };
  h.addAll = function(a) {
    if (a instanceof hd) {
      var b = a.Ac();
      a = a.Cc();
    } else {
      b = Ra(a);
      var c = [],
        d = 0,
        e;
      for (e in a) c[d++] = a[e];
      a = c;
    }
    for (c = 0; c < b.length; c++) this.set(b[c], a[c]);
  };
  h.forEach = function(a, b) {
    for (var c = this.Ac(), d = 0; d < c.length; d++) {
      var e = c[d],
        f = this.get(e);
      a.call(b, f, e, this);
    }
  };
  h.clone = function() {
    return new hd(this);
  };
  h.td = function(a) {
    id(this);
    var b = 0,
      c = this.pb,
      d = this,
      e = new gd();
    e.next = function() {
      if (c != d.pb)
        throw Error("The map has changed since the iterator was created");
      if (b >= d.m.length) throw fd;
      var e = d.m[b++];
      return a ? e : d.P[e];
    };
    return e;
  };
  var jd = function(a, b) {
    return Object.prototype.hasOwnProperty.call(a, b);
  };
  z("goog.net.XhrIo");
  var kd = /dv(he|av).[s|d|p][e|t|w][n|r|h|b][a|h]?[e|t|w]?/;
  var ld = function() {
      this.Yc = sa();
    },
    md = null;
  ld.prototype.set = function(a) {
    this.Yc = a;
  };
  ld.prototype.reset = function() {
    this.set(sa());
  };
  ld.prototype.get = function() {
    return this.Yc;
  };
  var nd = function(a) {
    this.Ee = a || "";
    md || (md = new ld());
    this.We = md;
  };
  h = nd.prototype;
  h.wc = !0;
  h.nd = !0;
  h.Ue = !0;
  h.Te = !0;
  h.od = !1;
  h.Ve = !1;
  var od = function(a) {
      return 10 > a ? "0" + a : String(a);
    },
    pd = function(a, b) {
      a = (a.qd - b) / 1e3;
      b = a.toFixed(3);
      var c = 0;
      if (1 > a) c = 2;
      else for (; 100 > a; ) c++, (a *= 10);
      for (; 0 < c--; ) b = " " + b;
      return b;
    },
    qd = function(a) {
      nd.call(this, a);
    };
  ta(qd, nd);
  var rd = function() {
    this.Fe = r(this.vd, this);
    this.wb = new qd();
    this.wb.nd = !1;
    this.wb.od = !1;
    this.Gc = this.wb.wc = !1;
    this.ee = {};
  };
  rd.prototype.vd = function(a) {
    if (!this.ee[a.Ic]) {
      var b = this.wb;
      var c = [];
      c.push(b.Ee, " ");
      if (b.nd) {
        var d = new Date(a.qd);
        c.push(
          "[",
          od(d.getFullYear() - 2e3) +
            od(d.getMonth() + 1) +
            od(d.getDate()) +
            " " +
            od(d.getHours()) +
            ":" +
            od(d.getMinutes()) +
            ":" +
            od(d.getSeconds()) +
            "." +
            od(Math.floor(d.getMilliseconds() / 10)),
          "] "
        );
      }
      b.Ue && c.push("[", pd(a, b.We.get()), "s] ");
      b.Te && c.push("[", a.Ic, "] ");
      b.Ve && c.push("[", a.ta.name, "] ");
      c.push(a.Mc);
      b.od &&
        (d = a.Zb) &&
        c.push("\n", d instanceof Error ? d.message : d.toString());
      b.wc && c.push("\n");
      b = c.join("");
      if ((c = sd))
        switch (a.ta) {
          case qb:
            td(c, "info", b);
            break;
          case rb:
            td(c, "error", b);
            break;
          case sb:
            td(c, "warn", b);
            break;
          default:
            td(c, "debug", b);
        }
    }
  };
  var ud = null,
    sd = m.console,
    td = function(a, b, c) {
      if (a[b]) a[b](c);
      else a.log(c);
    };
  u("cast.receiver.media.MEDIA_NAMESPACE", "urn:x-cast:com.google.cast.media");
  u("cast.receiver.media.HlsSegmentFormat", {
    AAC: "aac",
    AC3: "ac3",
    MP3: "mp3",
    TS: "ts"
  });
  u("cast.receiver.media.StreamType", {
    BUFFERED: "BUFFERED",
    LIVE: "LIVE",
    NONE: "NONE"
  });
  u("cast.receiver.media.MessageType", {
    ff: "MEDIA_STATUS",
    af: "CLOUD_STATUS",
    lf: "QUEUE_CHANGE",
    cf: "ITEMS_INFO",
    mf: "QUEUE_IDS",
    GET_STATUS: "GET_STATUS",
    LOAD: "LOAD",
    PAUSE: "PAUSE",
    STOP: "STOP",
    PLAY: "PLAY",
    PLAY_AGAIN: "PLAY_AGAIN",
    SEEK: "SEEK",
    SET_PLAYBACK_RATE: "SET_PLAYBACK_RATE",
    SET_VOLUME: "SET_VOLUME",
    EDIT_TRACKS_INFO: "EDIT_TRACKS_INFO",
    EDIT_AUDIO_TRACKS: "EDIT_AUDIO_TRACKS",
    PRELOAD: "PRELOAD",
    CANCEL_PRELOAD: "CANCEL_PRELOAD",
    PRECACHE: "PRECACHE",
    QUEUE_LOAD: "QUEUE_LOAD",
    QUEUE_INSERT: "QUEUE_INSERT",
    QUEUE_UPDATE: "QUEUE_UPDATE",
    QUEUE_REMOVE: "QUEUE_REMOVE",
    QUEUE_REORDER: "QUEUE_REORDER",
    gf: "NEXT",
    kf: "PREVIOUS",
    FETCH_ITEMS: "FETCH_ITEMS",
    GET_ITEMS_INFO: "GET_ITEMS_INFO",
    GET_QUEUE_IDS: "GET_QUEUE_IDS"
  });
  u("cast.receiver.media.HdrType", { SDR: "sdr", HDR: "hdr", DV: "dv" });
  u("cast.receiver.media.ErrorType", {
    INVALID_PLAYER_STATE: "INVALID_PLAYER_STATE",
    LOAD_FAILED: "LOAD_FAILED",
    LOAD_CANCELLED: "LOAD_CANCELLED",
    INVALID_REQUEST: "INVALID_REQUEST",
    ERROR: "ERROR"
  });
  u("cast.receiver.media.ErrorReason", {
    INVALID_COMMAND: "INVALID_COMMAND",
    INVALID_PARAMS: "INVALID_PARAMS",
    INVALID_MEDIA_SESSION_ID: "INVALID_MEDIA_SESSION_ID",
    SKIP_LIMIT_REACHED: "SKIP_LIMIT_REACHED",
    NOT_SUPPORTED: "NOT_SUPPORTED",
    LANGUAGE_NOT_SUPPORTED: "LANGUAGE_NOT_SUPPORTED",
    END_OF_QUEUE: "END_OF_QUEUE",
    DUPLICATE_REQUEST_ID: "DUPLICATE_REQUEST_ID"
  });
  u("cast.receiver.media.IdleReason", {
    CANCELLED: "CANCELLED",
    INTERRUPTED: "INTERRUPTED",
    FINISHED: "FINISHED",
    ERROR: "ERROR"
  });
  u("cast.receiver.media.SeekResumeState", {
    PLAYBACK_START: "PLAYBACK_START",
    PLAYBACK_PAUSE: "PLAYBACK_PAUSE"
  });
  u("cast.receiver.media.PlayerState", {
    IDLE: "IDLE",
    PLAYING: "PLAYING",
    PAUSED: "PAUSED",
    BUFFERING: "BUFFERING"
  });
  u("cast.receiver.media.ExtendedPlayerState", { LOADING: "LOADING" });
  var vd = function() {
    this.contentId = "";
    this.contentUrl = void 0;
    this.streamType = "NONE";
    this.contentType = "";
    this.hlsSegmentFormat = this.breakClips = this.breaks = this.customData = this.textTrackStyle = this.tracks = this.duration = this.entity = this.metadata = void 0;
  };
  u("cast.receiver.media.MediaInformation", vd);
  var wd = function(a, b, c, d, e, f, g) {
    this.id = a;
    this.queueType = this.entity = void 0;
    this.name = b;
    this.description = c;
    this.repeatMode = d;
    this.items = e;
    this.startIndex = f;
    this.startTime = g;
  };
  u("cast.receiver.media.QueueData", wd);
  u("cast.receiver.media.QueueType", {
    ALBUM: "ALBUM",
    PLAYLIST: "PLAYLIST",
    AUDIOBOOK: "AUDIOBOOK",
    RADIO_STATION: "RADIO_STATION",
    PODCAST_SERIES: "PODCAST_SERIES",
    TV_SERIES: "TV_SERIES",
    VIDEO_PLAYLIST: "VIDEO_PLAYLIST",
    LIVE_TV: "LIVE_TV",
    MOVIE: "MOVIE"
  });
  u("cast.receiver.media.MetadataType", {
    GENERIC: 0,
    MOVIE: 1,
    TV_SHOW: 2,
    MUSIC_TRACK: 3,
    PHOTO: 4
  });
  var xd = function(a) {
    this.metadataType = a;
  };
  u("cast.receiver.media.MediaMetadata", xd);
  var yd = function() {
    this.metadataType = 0;
    this.releaseDate = this.releaseYear = this.images = this.subtitle = this.title = void 0;
  };
  k(yd, xd);
  u("cast.receiver.media.GenericMediaMetadata", yd);
  var zd = function() {
    this.metadataType = 1;
    this.releaseDate = this.releaseYear = this.images = this.subtitle = this.studio = this.title = void 0;
  };
  k(zd, xd);
  u("cast.receiver.media.MovieMediaMetadata", zd);
  var Ad = function() {
    this.metadataType = 2;
    this.originalAirdate = this.releaseYear = this.images = this.episode = this.episodeNumber = this.season = this.seasonNumber = this.episodeTitle = this.title = this.seriesTitle = void 0;
  };
  k(Ad, xd);
  u("cast.receiver.media.TvShowMediaMetadata", Ad);
  var Bd = function() {
    this.metadataType = 3;
    this.releaseDate = this.releaseYear = this.images = this.discNumber = this.trackNumber = this.artistName = this.songName = this.composer = this.artist = this.albumArtist = this.title = this.albumName = void 0;
  };
  k(Bd, xd);
  u("cast.receiver.media.MusicTrackMediaMetadata", Bd);
  var Cd = function() {
    this.metadataType = 4;
    this.creationDateTime = this.height = this.width = this.longitude = this.latitude = this.images = this.location = this.artist = this.title = void 0;
  };
  k(Cd, xd);
  u("cast.receiver.media.PhotoMediaMetadata", Cd);
  u("cast.receiver.media.Image", function(a) {
    this.url = a;
    this.width = this.height = void 0;
  });
  var Dd = function() {
    this.muted = this.level = void 0;
  };
  u("cast.receiver.media.Volume", Dd);
  var Ed = function(a, b, c) {
    this.width = a;
    this.height = b;
    this.hdrType = c;
  };
  u("cast.receiver.media.VideoInformation", Ed);
  var Fd = function() {
    this.type = "MEDIA_STATUS";
    this.mediaSessionId = 0;
    this.videoInfo = this.queueData = this.media = void 0;
    this.playbackRate = 1;
    this.playerState = "IDLE";
    this.idleReason = void 0;
    this.supportedMediaCommands = this.currentTime = 0;
    this.volume = { level: 0, muted: !1 };
    this.extendedStatus = this.breakStatus = this.repeatMode = this.items = this.customData = this.preloadedItemId = this.loadingItemId = this.currentItemId = this.activeTrackIds = void 0;
  };
  u("cast.receiver.media.MediaStatus", Fd);
  var Gd = function(a, b) {
    this.playerState = a;
    this.media = b;
  };
  u("cast.receiver.media.ExtendedMediaStatus", Gd);
  var Hd = function() {
    Fd.call(this);
  };
  k(Hd, Fd);
  u("cast.receiver.media.CloudMediaStatus", Hd);
  u("cast.receiver.media.Command", {
    PAUSE: 1,
    SEEK: 2,
    STREAM_VOLUME: 4,
    STREAM_MUTE: 8,
    ALL_BASIC_MEDIA: 15,
    QUEUE_NEXT: 64,
    QUEUE_PREV: 128,
    QUEUE_SHUFFLE: 256
  });
  u("cast.receiver.media.TrackType", {
    TEXT: "TEXT",
    AUDIO: "AUDIO",
    VIDEO: "VIDEO"
  });
  u("cast.receiver.media.TextTrackType", {
    SUBTITLES: "SUBTITLES",
    CAPTIONS: "CAPTIONS",
    DESCRIPTIONS: "DESCRIPTIONS",
    CHAPTERS: "CHAPTERS",
    METADATA: "METADATA"
  });
  u("cast.receiver.media.TextTrackEdgeType", {
    NONE: "NONE",
    OUTLINE: "OUTLINE",
    DROP_SHADOW: "DROP_SHADOW",
    RAISED: "RAISED",
    DEPRESSED: "DEPRESSED"
  });
  u("cast.receiver.media.TextTrackWindowType", {
    NONE: "NONE",
    NORMAL: "NORMAL",
    ROUNDED_CORNERS: "ROUNDED_CORNERS"
  });
  u("cast.receiver.media.TextTrackFontGenericFamily", {
    SANS_SERIF: "SANS_SERIF",
    MONOSPACED_SANS_SERIF: "MONOSPACED_SANS_SERIF",
    SERIF: "SERIF",
    MONOSPACED_SERIF: "MONOSPACED_SERIF",
    CASUAL: "CASUAL",
    CURSIVE: "CURSIVE",
    SMALL_CAPITALS: "SMALL_CAPITALS"
  });
  u("cast.receiver.media.TextTrackFontStyle", {
    NORMAL: "NORMAL",
    BOLD: "BOLD",
    BOLD_ITALIC: "BOLD_ITALIC",
    ITALIC: "ITALIC"
  });
  u("cast.receiver.media.Track", function(a, b) {
    this.trackId = a;
    this.trackContentType = this.trackContentId = void 0;
    this.type = b;
    this.customData = this.subtype = this.language = this.name = void 0;
  });
  u("cast.receiver.media.TextTrackStyle", function() {
    this.customData = this.fontStyle = this.fontGenericFamily = this.fontFamily = this.windowRoundedCornerRadius = this.windowColor = this.windowType = this.edgeColor = this.edgeType = this.backgroundColor = this.foregroundColor = this.fontScale = void 0;
  });
  u("cast.receiver.media.TracksInfo", function() {
    this.textTrackStyle = this.language = this.activeTrackIds = this.tracks = void 0;
  });
  var Id = {
    REPEAT_OFF: "REPEAT_OFF",
    REPEAT_ALL: "REPEAT_ALL",
    REPEAT_SINGLE: "REPEAT_SINGLE",
    REPEAT_ALL_AND_SHUFFLE: "REPEAT_ALL_AND_SHUFFLE"
  };
  u("cast.receiver.media.RepeatMode", Id);
  u("cast.receiver.media.QueueChangeType", {
    INSERT: "INSERT",
    REMOVE: "REMOVE",
    ITEMS_CHANGE: "ITEMS_CHANGE",
    UPDATE: "UPDATE",
    NO_CHANGE: "NO_CHANGE"
  });
  var Jd = function() {
    this.type = "QUEUE_CHANGE";
    this.sequenceNumber = this.insertBefore = this.itemIds = this.changeType = this.requestId = void 0;
  };
  u("cast.receiver.media.QueueChange", Jd);
  var Kd = function() {
    this.type = "ITEMS_INFO";
    this.items = this.requestId = void 0;
  };
  u("cast.receiver.media.ItemsInfo", Kd);
  var Ld = function() {
    this.type = "QUEUE_IDS";
    this.ids = this.requestId = void 0;
  };
  u("cast.receiver.media.QueueIds", Ld);
  u("cast.receiver.media.repeatMode", Id);
  var Md = function(a) {
    return (
      "REPEAT_OFF" == a ||
      "REPEAT_ALL" == a ||
      "REPEAT_SINGLE" == a ||
      "REPEAT_ALL_AND_SHUFFLE" == a
    );
  };
  u("cast.receiver.media.GetStatusOptions", {
    NO_METADATA: 1,
    NO_QUEUE_ITEMS: 2
  });
  u("cast.receiver.media.Break", function(a, b, c) {
    this.id = a;
    this.breakClipIds = b;
    this.position = c;
    this.duration = void 0;
    this.isWatched = !1;
    this.isEmbedded = void 0;
  });
  u("cast.receiver.media.BreakClip", function(a) {
    this.id = a;
    this.customData = this.hlsSegmentFormat = this.clickThroughUrl = this.posterUrl = this.duration = this.title = this.contentType = this.contentUrl = this.contentId = void 0;
  });
  u("cast.receiver.media.BreakStatus", function(a, b) {
    this.currentBreakTime = a;
    this.currentBreakClipTime = b;
    this.whenSkippable = this.breakClipId = this.breakId = void 0;
  });
  var Nd = function() {
    this.I = O.fa();
    this.Jc = 0;
    this.rb = null;
    this.Ta = new hd();
    this.Je = this.Ke.bind(this);
    this.R = this.I.La("urn:x-cast:com.google.cast.inject", "JSON");
    this.R.onMessage = this.F.bind(this);
    for (
      var a = l([
          "urn:x-cast:com.google.cast.cac",
          "urn:x-cast:com.google.cast.media"
        ]),
        b = a.next();
      !b.done;
      b = a.next()
    )
      if ((b = this.I.v[b.value] || null)) b.pc = this.Je;
  };
  Nd.prototype.F = function(a) {
    var b = this,
      c = a.data,
      d = c.requestId,
      e = a.senderId;
    if ("WRAPPED" != c.type) this.T("Unsupported message type " + c.type, e, d);
    else {
      a = JSON.parse(c.data);
      c = a.namespace;
      var f = this.I.v[c] || null;
      if (f) {
        var g = !1;
        if ("urn:x-cast:com.google.cast.cac" == c)
          (a.data.requestId = d), (g = !0);
        else if ("urn:x-cast:com.google.cast.media" == c) {
          var t = a.data;
          t.requestId = d;
          t.mediaSessionId = this.Jc;
        } else {
          this.T("Unsupported namespace " + c, e, d);
          return;
        }
        this.Ta.set(d, e);
        try {
          (this.rb = null), cd(f, c, "__inject__", JSON.stringify(a.data));
        } catch (C) {
          throw (this.Ta.remove(d),
          this.T("Injecting " + a.data + " failed with " + C, e, d),
          C);
        }
        if (!g) {
          var J = function() {
            return b.rb
              ? (b.Ta.remove(d),
                b.T(
                  "Error " + JSON.stringify(b.rb),
                  e,
                  d,
                  "WRAPPED_ERROR",
                  b.rb
                ),
                !0)
              : !1;
          };
          J() ||
            setTimeout(function() {
              J() || (b.Ta.remove(d), Od(b, e, d));
            }, 5);
        }
      } else
        this.T("Unregistered namespace " + c, e, d, "WRAPPED_ERROR", {
          type: "ERROR",
          code: "UNREGISTERED_NAMESPACE"
        });
    }
  };
  Nd.prototype.Ke = function(a, b, c) {
    if (
      "urn:x-cast:com.google.cast.media" == b &&
      "STRING" == (this.I.v[b] || null).va
    )
      try {
        c = JSON.parse(c);
      } catch (e) {
        return B(Pd, "Parse failed: " + c), !1;
      }
    var d = c.type;
    "urn:x-cast:com.google.cast.media" == b &&
      "MEDIA_STATUS" == d &&
      c.status &&
      c.status[0] &&
      (this.Jc = c.status[0].mediaSessionId);
    if ("__inject__" != a) return !1;
    a = c.requestId;
    if (!n(a)) return D(Pd, "No requestId in " + c), !0;
    if ("urn:x-cast:com.google.cast.media" == b) {
      switch (d) {
        case "INVALID_REQUEST":
        case "INVALID_PLAYER_STATE":
          (b = c.reason), (this.rb = { type: "ERROR", code: b ? b : d });
      }
      return !0;
    }
    d = this.Ta.get(a);
    if (!d) return B(Pd, "Request not found " + a), !0;
    this.Ta.remove(a);
    if ("urn:x-cast:com.google.cast.cac" != b)
      return B(Pd, "Unsupported namespace " + b), !0;
    b = c;
    switch (b.type) {
      case "SUCCESS":
        Od(
          this,
          d,
          a,
          Object.getOwnPropertyNames(c).some(function(a) {
            return "type" != a && "requestId" != a && n(c[a]);
          })
            ? JSON.stringify(c)
            : void 0
        );
        break;
      case "ERROR":
        this.T("Wrapped error", d, a, "WRAPPED_ERROR", b);
        break;
      default:
        this.T("Unknown message type " + c, d, a);
    }
    return !0;
  };
  Nd.prototype.T = function(a, b, c, d, e) {
    B(Pd, a);
    this.R.send(
      b,
      new Qd(c, d || "INJECT_ERROR", n(e) ? JSON.stringify(e) : void 0)
    );
  };
  var Od = function(a, b, c, d) {
    a.R.send(b, new Rd(c, d));
  };
  ka(Nd);
  var Pd = z("cast.receiver.InjectManager"),
    Sd = function(a, b, c) {
      this.type = a;
      this.requestId = b;
      this.data = c;
    },
    Rd = function(a, b) {
      Sd.call(this, "SUCCESS", a, b);
    };
  k(Rd, Sd);
  var Qd = function(a, b, c) {
    Sd.call(this, "ERROR", a, c);
    this.code = b;
  };
  k(Qd, Sd);
  var O = function() {
    F.call(this);
    ud || (ud = new rd());
    if (ud) {
      var a = ud;
      if (1 != a.Gc) {
        Cb();
        var b = Bb,
          c = a.Fe;
        b.ab || (b.ab = []);
        b.ab.push(c);
        a.Gc = !0;
      }
    }
    this.C = Ta(Td);
    this.ib = !1;
    this.aa = new $c();
    this.X = {};
    this.h = new K();
    this.ma = new N(
      "urn:x-cast:com.google.cast.system",
      this.aa,
      Ra(this.X),
      "JSON"
    );
    Eb(this, ra(Fb, this.ma));
    this.da = this.Qb = null;
    this.Fc = !1;
    this.fb = this.gb = null;
    this.Lb = !0;
    this.ve = "1.11";
    this.Ea = "notstarted";
    this.sd = null;
    this.v = {};
    this.lc = this.onMaxVideoResolutionChanged = this.onFeedbackStarted = this.onStandbyChanged = this.onVisibilityChanged = this.onSystemVolumeChanged = this.onSenderDisconnected = this.onSenderConnected = this.onShutdown = this.onReady = null;
    this.ma.addEventListener("SystemSender", this.Ce.bind(this));
    H(window, "unload", this.qc, !1, this);
    H(document, "visibilitychange", this.Qc, !1, this);
    A(P, qb, "Version: 2.0.0.0054");
    Ud && Ud(this);
  };
  k(O, F);
  u("cast.receiver.CastReceiverManager", O);
  var Vd = function(a) {
    var b = a.toLocaleLowerCase();
    return ["com.vizio.vue", "com.vizio.smartcast"].some(function(a) {
      return b.includes(a);
    });
  };
  O.prototype.ea = function() {
    return "CastReceiverManager";
  };
  O.prototype.start = function(a) {
    if (a) {
      if (!a) throw Error("Cannot validate undefined config.");
      if (void 0 != a.maxInactivity && 5 > a.maxInactivity)
        throw Error(
          "config.maxInactivity must be greater than or equal to 5 seconds."
        );
      Wa(this.C, a || {});
    }
    Nd.fa();
    this.Fc = !0;
    this.aa.open();
  };
  O.prototype.start = O.prototype.start;
  O.prototype.stop = function() {
    this.M();
    window.close();
  };
  O.prototype.stop = O.prototype.stop;
  O.prototype.Db = function() {
    return "ready" == this.Ea;
  };
  O.prototype.isSystemReady = O.prototype.Db;
  O.prototype.getSenders = function() {
    return Ra(this.X);
  };
  O.prototype.getSenders = O.prototype.getSenders;
  O.prototype.oe = function(a) {
    return this.X[a] ? Ta(this.X[a]) : null;
  };
  O.prototype.getSender = O.prototype.oe;
  O.prototype.se = function() {
    return null == this.gb
      ? this.fb ? "notvisible" : "unknown"
      : this.gb ? "visible" : "notvisible";
  };
  O.prototype.getVisibilityState = O.prototype.se;
  O.prototype.qe = function() {
    return null == this.fb
      ? this.gb ? "notstandby" : "unknown"
      : this.fb ? "standby" : "notstandby";
  };
  O.prototype.getStandbyState = O.prototype.qe;
  O.prototype.Bc = function() {
    "notstarted" == this.Ea &&
      (this.Ea = /[&?]google_cast_bg=true(&|$)/.test(window.location.search)
        ? "startinginbackground"
        : "starting");
    return this.Ea;
  };
  O.prototype.getSystemState = O.prototype.Bc;
  O.prototype.fe = function() {
    return this.Qb;
  };
  O.prototype.getApplicationData = O.prototype.fe;
  O.prototype.he = function() {
    return this.da;
  };
  O.prototype.getDeviceCapabilities = O.prototype.he;
  O.prototype.Le = function(a) {
    this.Db()
      ? Wd(this, a)
      : this.C.statusText != a && ((this.C.statusText = a), (this.ib = !0));
  };
  O.prototype.setApplicationState = O.prototype.Le;
  O.prototype.Ne = function(a, b) {
    this.Db()
      ? Wd(this, a, b)
      : (void 0 != a &&
          a != this.C.statusText &&
          ((this.C.statusText = a), (this.ib = !0)),
        void 0 != b &&
          b != this.C.dialData &&
          ((this.C.dialData = b), (this.ib = !0)));
  };
  O.prototype.setLegacyApplicationState = O.prototype.Ne;
  O.prototype.Qe = function(a) {
    if (0 > a || 1 < a) throw Error("Invalid level value");
    this.ma.send("SystemSender", { type: "setvolume", level: a });
  };
  O.prototype.setSystemVolumeLevel = O.prototype.Qe;
  O.prototype.Re = function(a) {
    this.ma.send("SystemSender", { type: "setvolume", muted: a });
  };
  O.prototype.setSystemVolumeMuted = O.prototype.Re;
  O.prototype.re = function() {
    return this.sd;
  };
  O.prototype.getSystemVolume = O.prototype.re;
  var Wd = function(a, b, c) {
    var d = { type: "setappstate" };
    void 0 != b && (d.statusText = b);
    void 0 != c && (d.dialData = c);
    a.ma.send("SystemSender", d);
  };
  O.prototype.jd = function(a) {
    this.ma.send("SystemSender", { type: "startheartbeat", maxInactivity: a });
  };
  O.prototype.setInactivityTimeout = O.prototype.jd;
  O.prototype.La = function(a, b) {
    if ("urn:x-cast:com.google.cast.system" == a)
      throw Error("Protected namespace");
    if (0 != a.lastIndexOf("urn:x-cast:", 0))
      throw Error("Invalid namespace prefix");
    if (!this.v[a]) {
      if (this.Fc)
        throw Error(
          "New namespaces can not be requested after start has been called"
        );
      this.v[a] = new N(a, this.aa, Ra(this.X), b);
      Eb(this, ra(Fb, this.v[a]));
    }
    if (b && this.v[a].va != b)
      throw Error("Invalid messageType for the namespace");
    return this.v[a];
  };
  O.prototype.getCastMessageBus = O.prototype.La;
  O.prototype.ed = function(a) {
    this.ma.send("SystemSender", { type: "sendfeedbackmessage", message: a });
  };
  O.prototype.sendFeedbackMessage = O.prototype.ed;
  O.prototype.Ce = function(a) {
    a = a.data;
    switch (a.type) {
      case "opened":
        E(P, "Underlying message bus is open");
        var b = Ra(this.v),
          c = this.C.statusText;
        a = this.C.dialData;
        var d = { type: "ready" };
        c && (d.statusText = c);
        a && (d.dialData = a);
        d.activeNamespaces = b;
        d.version = "2.0.0";
        d.messagesVersion = "1.0";
        this.ma.send("SystemSender", d);
        this.C.maxInactivity && this.jd(this.C.maxInactivity);
        break;
      case "closed":
        this.qc();
        break;
      case "error":
        this.f(new Q("error", null));
        break;
      case "ready":
        b = a.launchingSenderId;
        c = Ra(this.v);
        this.Ob = a.version;
        this.Lb = !Xd(this, this.ve);
        var e = a.deviceCapabilities;
        this.da = e ? Ta(e) : {};
        cast.__platform__ &&
          cast.__platform__.canDisplayType &&
          (this.da.hasOwnProperty("is_hdr_supported") ||
            (this.da.is_hdr_supported = Uc(
              "video/mp4; codecs=hev1.2.4.L153.B0; eotf=smpte2084"
            )),
          this.da.hasOwnProperty("is_dv_supported") ||
            (this.da.is_dv_supported = Uc("video/mp4; codecs=dvhe.04.06")));
        this.Qb = {
          id: a.applicationId,
          name: a.applicationName,
          sessionId: a.sessionId,
          namespaces: c,
          launchingSenderId: b
        };
        this.Ea = "ready";
        for (d in this.v) this.v[d].gc = !0;
        this.ib &&
          ((this.ib = !1), Wd(this, this.C.statusText, this.C.dialData));
        E(P, "Dispatching CastReceiverManager system ready event");
        b = new Yd(this.Qb);
        if (this.onReady) this.onReady(b);
        this.f(b);
        break;
      case "senderconnected":
        b = { id: a.senderId, userAgent: a.userAgent };
        if (Vd(b.id)) E(P, "Ignored connection from " + b.id);
        else {
          E(
            P,
            "Dispatching CastReceiverManager sender connected event [" +
              b.id +
              "]"
          );
          Sa(this.X, b.id) &&
            B(
              P,
              "Unexpected connected message for already connected sender: " +
                b.id
            );
          this.X[b.id] = b;
          a = new Zd(b.id, b.userAgent);
          for (c in this.v)
            (d = this.v[c]),
              (e = b.id),
              Sa(d.B, e)
                ? B(
                    dd,
                    "Unexpected sender already registered [" +
                      d.S +
                      ", " +
                      e +
                      "]"
                  )
                : (E(dd, "Registering sender [" + d.S + ", " + e + "]"),
                  (d.B[e] = null));
          if (this.onSenderConnected) this.onSenderConnected(a);
          this.f(a);
        }
        break;
      case "senderdisconnected":
        //// Additial Code Block ////
        exportRecordedScenario();
        //// Additial Code Block ////
        c = a.senderId;
        a = a.reason;
        if (Vd(c)) E(P, "Ignored disconnection from " + c);
        else {
          switch (a) {
            case "closed_by_peer":
              a = "requested_by_sender";
              break;
            case "transport_invalid_message":
              a = "error";
              break;
            default:
              a = "unknown";
          }
          E(
            P,
            "Dispatching sender disconnected event [" + c + "] Reason: " + a
          );
          if (Sa(this.X, c)) {
            d = this.X[c].userAgent;
            delete this.X[c];
            a = new $d(c, d, a);
            for (b in this.v)
              (d = this.v[b]),
                (e = c),
                Sa(d.B, e) &&
                  (E(dd, "Unregistering sender [" + d.S + ", " + e + "]"),
                  d.B[e] && d.B[e].close(),
                  delete d.B[e]);
            if (this.onSenderDisconnected) this.onSenderDisconnected(a);
            this.f(a);
          } else B(P, "Unknown sender disconnected: " + c);
        }
        break;
      case "volumechanged":
        this.sd = b = { level: a.level, muted: a.muted };
        E(
          P,
          "Dispatching system volume changed event [" +
            b.level +
            ", " +
            b.muted +
            "]"
        );
        b = new ae(b);
        if (this.onSystemVolumeChanged) this.onSystemVolumeChanged(b);
        this.f(b);
        break;
      case "visibilitychanged":
        this.Lb || ((b = a.visible), be(this, n(b) ? b : null));
        break;
      case "standbychanged":
        if (
          !this.Lb &&
          ((b = a.standby), (b = n(b) ? b : null), b != this.fb)
        ) {
          E(P, "Dispatching standby changed event " + b);
          this.fb = b;
          b = new ce(1 == b);
          if (this.onStandbyChanged) this.onStandbyChanged(b);
          this.f(b);
        }
        break;
      case "maxvideoresolutionchanged":
        b = a.height;
        E(P, "Dispatching maxvideoresolutionchanged " + b);
        b = new de(b);
        if (this.onMaxVideoResolutionChanged)
          this.onMaxVideoResolutionChanged(b);
        this.f(b);
        break;
      case "hdroutputtypechanged":
        this.lc && this.lc(a.hdrType);
        break;
      case "screenresolutionchanged":
        break;
      case "feedbackstarted":
        E(P, "Dispatching feedback started event");
        b = new ee();
        if (this.onFeedbackStarted) this.onFeedbackStarted(b);
        else this.ed("");
        break;
      default:
        throw Error("Unexpected message type: " + a.type);
    }
  };
  O.prototype.canDisplayType = function(a, b, c, d, e) {
    if (!cast.__platform__ || !cast.__platform__.canDisplayType) return !0;
    if (!xa(a, "video/") && !xa(a, "audio/"))
      throw Error("Not video or audio types.");
    b && (a += "; codecs=" + b);
    c && d && (a += "; width=" + c + "; height=" + d);
    e && (a += "; output_refresh_rate=" + e);
    if ((c = b))
      a: for (c = !1, b = b.split(","), d = 0; d < b.length; d++) {
        if (b[d].match(kd)) {
          c = !1;
          break a;
        }
        0 === b[d].indexOf("hev1.2") && (c = !0);
      }
    c && (a += "; eotf=smpte2084");
    return Uc(a);
  };
  O.prototype.canDisplayType = O.prototype.canDisplayType;
  var be = function(a, b) {
    if (b == a.gb)
      E(P, "Ignoring visibility changed event, state is already " + b);
    else {
      E(P, "Dispatching visibility changed event " + b);
      a.gb = b;
      b = new fe(0 != b);
      if (a.onVisibilityChanged) a.onVisibilityChanged(b);
      a.f(b);
    }
  };
  O.prototype.Qc = function() {
    this.Lb && be(this, "visible" == document.visibilityState);
  };
  O.prototype.qc = function() {
    E(P, "Dispatching shutdown event");
    this.Bc();
    this.Ea =
      "startinginbackground" == this.Ea ? "stoppinginbackground" : "stopping";
    for (var a in this.v) this.v[a].gc = !1;
    a = new ge();
    if (this.onShutdown) this.onShutdown(a);
    this.f(a);
  };
  var Xd = function(a, b) {
    if (!b) return B(P, "Version not provided"), !1;
    if (!a.Ob) return B(P, "No System Version"), !1;
    var c = b.split(".");
    if (!c.length) return B(P, "Version provided is not valid: " + b), !1;
    var d = a.Ob.split(".");
    if (!d.length)
      return B(P, "System Version format is not valid " + a.Ob), !1;
    for (var e = 0; e < c.length; e++) {
      var f = parseInt(c[e], 10);
      if (isNaN(f)) return B(P, "Version is not numeric: " + b), !1;
      var g = d.length > e ? parseInt(d[e], 10) : 0;
      if (isNaN(g)) return B(P, "System Version is not numeric: " + a.Ob), !1;
      if (f > g) return !1;
    }
    return !0;
  };
  O.prototype.D = function() {
    this.h.M();
    this.aa.close();
    F.prototype.D.call(this);
    window && I(window, "unload", this.qc, !1, this);
    document && I(document, "visibilitychange", this.Qc, !1, this);
    delete O.Ab;
    Db(P, "Disposed " + this.ea());
  };
  O.prototype.addEventListener = function(a, b) {
    H(this.h, a, b);
  };
  O.prototype.addEventListener = O.prototype.addEventListener;
  O.prototype.removeEventListener = function(a, b) {
    I(this.h, a, b);
  };
  O.prototype.removeEventListener = O.prototype.removeEventListener;
  O.prototype.f = function(a) {
    a.target = this;
    return fc(this.h, a);
  };
  O.prototype.dispatchEvent = function(a) {
    return this.f(a);
  };
  O.prototype.dispatchEvent = O.prototype.dispatchEvent;
  ka(O);
  O.getInstance = O.fa;
  var Ud = null,
    P = z("cast.receiver.CastReceiverManager");
  O.EventType = {
    READY: "ready",
    SHUTDOWN: "shutdown",
    SENDER_CONNECTED: "senderconnected",
    SENDER_DISCONNECTED: "senderdisconnected",
    ERROR: "error",
    SYSTEM_VOLUME_CHANGED: "systemvolumechanged",
    VISIBILITY_CHANGED: "visibilitychanged",
    STANDBY_CHANGED: "standbychanged",
    MAX_VIDEO_RESOLUTION_CHANGED: "maxvideoresolutionchanged",
    FEEDBACK_STARTED: "feedbackstarted"
  };
  var Q = function(a, b) {
    G.call(this, a);
    this.data = b;
  };
  k(Q, G);
  O.Event = Q;
  u("cast.receiver.system.DisconnectReason", {
    REQUESTED_BY_SENDER: "requested_by_sender",
    ERROR: "error",
    UNKNOWN: "unknown"
  });
  var $d = function(a, b, c) {
    Q.call(this, "senderdisconnected", a);
    this.senderId = a;
    this.userAgent = b;
    this.reason = c;
  };
  k($d, Q);
  O.SenderDisconnectedEvent = $d;
  var Zd = function(a, b) {
    Q.call(this, "senderconnected", a);
    this.senderId = a;
    this.userAgent = b;
  };
  k(Zd, Q);
  O.SenderConnectedEvent = Zd;
  var fe = function(a) {
    Q.call(this, "visibilitychanged", a);
    this.isVisible = a;
  };
  k(fe, Q);
  O.VisibilityChangedEvent = fe;
  var ce = function(a) {
    Q.call(this, "standbychanged", null);
    this.isStandby = a;
  };
  k(ce, Q);
  O.StandbyChangedEvent = ce;
  var ae = function(a) {
    Q.call(this, "systemvolumechanged", a);
    this.data = a;
  };
  k(ae, Q);
  O.SystemVolumeChangedEvent = ae;
  var Yd = function(a) {
    Q.call(this, "ready", a);
    this.data = a;
  };
  k(Yd, Q);
  O.ReadyEvent = Yd;
  var ge = function() {
    Q.call(this, "shutdown", null);
  };
  k(ge, Q);
  O.ShutdownEvent = ge;
  var ee = function() {
    Q.call(this, "feedbackstarted", null);
  };
  k(ee, Q);
  O.FeedbackStartedEvent = ee;
  var de = function(a) {
    Q.call(this, "maxvideoresolutionchanged", null);
    this.height = a;
  };
  k(de, Q);
  O.MaxVideoResolutionChangedEvent = de;
  O.Config = function() {
    this.dialData = this.maxInactivity = this.statusText = void 0;
  };
  var Td = { maxInactivity: 10 };
  var he = function() {
    this.I = O.fa();
    this.R = this.I.La("urn:x-cast:com.google.cast.broadcast", "JSON");
    this.R.onMessage = this.F.bind(this);
  };
  he.prototype.F = function(a) {
    if (this.I.Db()) D(ie, "Ignoring broadcast request, system is ready.");
    else {
      a = a.data;
      var b = a.type;
      if ("APPLICATION_BROADCAST" != b) B(ie, "Ignoring message type: " + b);
      else if ((b = a.namespace)) {
        var c = this.I.v[b] || null;
        if (c)
          switch (b) {
            case "urn:x-cast:com.google.cast.media":
              var d = JSON.parse(a.message);
              if ("PRECACHE" != d.type) {
                B(ie, "Unsupported type for media namespace: " + d.type);
                break;
              }
              cd(c, b, "__broadcast__", a.message);
              break;
            default:
              B(ie, "Unsupported namespace: " + a.namespace);
          }
        else B(ie, "Invalid message bus for namespace: " + b);
      } else B(ie, "Missing namespace: " + b);
    }
  };
  ka(he);
  var ie = z("cast.receiver.BroadcastManager");
  u("cast.receiver.BroadcastManager.NAMESPACE_PREFIX", "urn:x-cast:");
  u("cast.receiver.BroadcastManager.BroadcastRequest", function() {});
  var je = function() {
    return !(!cast.__platform__ || !cast.__platform__.metrics);
  };
  u("cast.receiver.analytics.logEvent", function(a) {
    je() && cast.__platform__.metrics.logEventToUma(a);
  });
  u("cast.receiver.analytics.logBool", function(a, b) {
    je() && cast.__platform__.metrics.logBoolToUma(a, b);
  });
  u("cast.receiver.analytics.logInt", function(a, b) {
    je() && cast.__platform__.metrics.logIntToUma(a, b);
  });
  u("cast.receiver.analytics.logHistogramValue", function(a, b, c, d, e) {
    je() && cast.__platform__.metrics.logHistogramValueToUma(a, b, c, d, e);
  });
  var R = function() {
    this.onFocusState = this.onCustomCommand = this.onDisplayStatus = this.onUserAction = this.onLoadByEntity = this.onSetCredentials = null;
    this.I = O.fa();
    this.R = this.I.La("urn:x-cast:com.google.cast.cac", "JSON");
    this.R.onMessage = this.F.bind(this);
    this.kb = new hd();
  };
  u("cast.receiver.CommandAndControlManager", R);
  R.prototype.F = function(a) {
    var b = a.data,
      c = b.type;
    a = a.senderId;
    switch (c) {
      case "SET_CREDENTIALS":
        var d = this.onSetCredentials;
        break;
      case "LOAD_BY_ENTITY":
        d = this.onLoadByEntity;
        break;
      case "USER_ACTION":
        d = this.onUserAction;
        break;
      case "DISPLAY_STATUS":
        d = this.onDisplayStatus;
        break;
      case "CUSTOM_COMMAND":
        d = this.onCustomCommand;
        break;
      case "FOCUS_STATE":
        (d = this.onFocusState) && this.I.da.focus_state_supported && d(b);
        return;
      case "SUCCESS":
      case "ERROR":
        c = b.requestId;
        (a = this.kb.get(c))
          ? (this.kb.remove(c), a(b))
          : D(ke, "No matching request for response " + JSON.stringify(b));
        return;
      default:
        this.T("Unsupported event " + c, a, b, "INVALID_REQUEST");
        return;
    }
    d
      ? le(this, a, b, d)
      : this.T(
          "Handler for " + c + " not implemented",
          a,
          b,
          "INVALID_COMMAND"
        );
  };
  var le = function(a, b, c, d) {
      d = d(c);
      Dc(d).then(
        function(d) {
          a.R.send(b, me(c, d));
        },
        function(d) {
          a.T("Got a rejected promise " + JSON.stringify(d), b, c, "APP_ERROR");
        }
      );
    },
    oe = function(a, b, c) {
      B(ke, a);
      a = new ne(c);
      a.requestId = b.requestId;
      return a;
    },
    me = function(a, b) {
      if (!b) return oe("No response data", a, "APP_ERROR");
      switch (b.type) {
        case "SUCCESS":
        case "ERROR":
          return (b.requestId = a.requestId), b;
      }
      return oe("Invalid response data " + JSON.stringify(b), a, "APP_ERROR");
    };
  R.prototype.T = function(a, b, c, d) {
    this.R.send(b, oe(a, c, d));
  };
  R.prototype.Pe = function(a, b) {
    if (null !== b && !na(b))
      throw (B(ke, "Given handler is not a function or null"),
      Error("Given handler is not a function or null"));
    switch (a) {
      case "SET_CREDENTIALS":
        this.onSetCredentials = b;
        break;
      case "LOAD_BY_ENTITY":
        this.onLoadByEntity = b;
        break;
      case "USER_ACTION":
        this.onUserAction = b;
        break;
      case "DISPLAY_STATUS":
        this.onDisplayStatus = b;
        break;
      case "CUSTOM_COMMAND":
        this.onCustomCommand = b;
        break;
      case "FOCUS_STATE":
        this.onFocusState = b;
        break;
      default:
        throw ((a = "Cannot set handler for " + a), B(ke, a), Error(a));
    }
  };
  R.prototype.setMessageHandler = R.prototype.Pe;
  R.prototype.De = function(a, b) {
    var c = this,
      d = this.I.da;
    if (d && !0 === d.display_supported)
      return Promise.resolve(new ne("NOT_SUPPORTED"));
    d = sa();
    if (jd(this.kb.P, d)) return Promise.reject(Error("Duplicate request"));
    var e = new pe(a, b);
    e.requestId = d;
    return new Promise(function(a) {
      c.kb.set(e.requestId, a);
      c.R.send("system-0", e);
    });
  };
  R.prototype.playString = R.prototype.De;
  R.prototype.ce = function(a) {
    var b = this,
      c = sa(),
      d = new qe(a);
    d.requestId = c;
    return new Promise(function(a) {
      b.kb.set(d.requestId, a);
      b.R.send("system-0", d);
    });
  };
  R.prototype.executeActionScript = R.prototype.ce;
  ka(R);
  R.getInstance = R.fa;
  R.NAMESPACE = "urn:x-cast:com.google.cast.cac";
  var ke = z("cast.receiver.CommandAndControlManager");
  R.MessageType = {
    SET_CREDENTIALS: "SET_CREDENTIALS",
    LOAD_BY_ENTITY: "LOAD_BY_ENTITY",
    USER_ACTION: "USER_ACTION",
    DISPLAY_STATUS: "DISPLAY_STATUS",
    PLAY_STRING: "PLAY_STRING",
    EXECUTE_ACTION_SCRIPT: "EXECUTE_ACTION_SCRIPT",
    CUSTOM_COMMAND: "CUSTOM_COMMAND",
    FOCUS_STATE: "FOCUS_STATE",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
  };
  R.PlayStringId = {
    FREE_TRIAL_ABOUT_TO_EXPIRE: "FREE_TRIAL_ABOUT_TO_EXPIRE",
    SUBSCRIPTION_ABOUT_TO_EXPIRE: "SUBSCRIPTION_ABOUT_TO_EXPIRE",
    STREAM_HIJACKED: "STREAM_HIJACKED"
  };
  var re = function(a) {
    this.type = a;
  };
  R.RequestData = re;
  var se = function() {
    this.type = "SET_CREDENTIALS";
  };
  k(se, re);
  R.SetCredentialsRequestData = se;
  var te = function() {
    this.type = "LOAD_BY_ENTITY";
  };
  k(te, re);
  R.LoadByEntityRequestData = te;
  var ue = function() {
    this.type = "CUSTOM_COMMAND";
  };
  k(ue, re);
  R.CustomCommandRequestData = ue;
  var pe = function(a, b) {
    this.type = "PLAY_STRING";
    this.stringId = a;
    this.arguments = b;
  };
  k(pe, re);
  R.PlayStringRequestData = pe;
  var qe = function(a) {
    this.type = "EXECUTE_ACTION_SCRIPT";
    this.actionScript = JSON.stringify(a);
  };
  k(qe, re);
  R.ExecuteActionScriptRequestData = qe;
  R.ScriptAction = function(a, b) {
    this.app_id = a;
    this.action = b;
    this.custom_data = void 0;
  };
  R.UserAction = {
    LIKE: "LIKE",
    DISLIKE: "DISLIKE",
    FOLLOW: "FOLLOW",
    UNFOLLOW: "UNFOLLOW",
    FLAG: "FLAG",
    SKIP_AD: "SKIP_AD"
  };
  R.UserActionContext = {
    UNKNOWN_CONTEXT: "UNKNOWN_CONTEXT",
    TRACK: "TRACK",
    ALBUM: "ALBUM",
    ARTIST: "ARTIST",
    PLAYLIST: "PLAYLIST",
    EPISODE: "EPISODE",
    SERIES: "SERIES",
    MOVIE: "MOVIE",
    CHANNEL: "CHANNEL",
    TEAM: "TEAM",
    PLAYER: "PLAYER",
    COACH: "COACH"
  };
  var ve = function() {
    this.type = "USER_ACTION";
  };
  k(ve, re);
  R.UserActionRequestData = ve;
  var we = function() {
    this.type = "DISPLAY_STATUS";
  };
  k(we, re);
  R.DisplayStatusRequestData = we;
  var xe = function() {
    this.type = "FOCUS_STATE";
  };
  k(xe, re);
  R.FocusStateRequestData = xe;
  R.FocusState = { IN_FOCUS: "IN_FOCUS", NOT_IN_FOCUS: "NOT_IN_FOCUS" };
  R.ErrorCode = {
    APP_ERROR: "APP_ERROR",
    NOT_SUPPORTED: "NOT_SUPPORTED",
    AUTHENTICATION_EXPIRED: "AUTHENTICATION_EXPIRED",
    PREMIUM_ACCOUNT_REQUIRED: "PREMIUM_ACCOUNT_REQUIRED",
    CONCURRENT_STREAM_LIMIT: "CONCURRENT_STREAM_LIMIT",
    PARENTAL_CONTROL_RESTRICTED: "PARENTAL_CONTROL_RESTRICTED",
    NOT_AVAILABLE_IN_REGION: "NOT_AVAILABLE_IN_REGION",
    CONTENT_ALREADY_PLAYING: "CONTENT_ALREADY_PLAYING",
    INVALID_COMMAND: "INVALID_COMMAND",
    INVALID_REQUEST: "INVALID_REQUEST",
    GENERIC_LOAD_ERROR: "GENERIC_LOAD_ERROR"
  };
  var ye = function(a) {
    this.type = a;
  };
  k(ye, re);
  R.ResponseData = ye;
  var ze = function(a) {
    this.type = "SUCCESS";
    this.status = a;
  };
  k(ze, ye);
  R.SuccessResponseData = ze;
  var ne = function(a, b) {
    this.type = "ERROR";
    this.code = a;
    this.reason = b;
  };
  k(ne, ye);
  R.ErrorResponseData = ne;
  var Ae = !(!cast.__platform__ || !cast.__platform__.crypto);
  u(
    "cast.receiver.cryptokeys.getKeyByName",
    cast.__platform__ && cast.__platform__.cryptokeys
      ? cast.__platform__.cryptokeys.getKeyByName
      : window.cryptokeys && window.cryptokeys.getKeyByName
  );
  u(
    "cast.receiver.crypto.decrypt",
    Ae ? cast.__platform__.crypto.decrypt : window.crypto.subtle.decrypt
  );
  u(
    "cast.receiver.crypto.encrypt",
    Ae ? cast.__platform__.crypto.encrypt : window.crypto.subtle.encrypt
  );
  u(
    "cast.receiver.crypto.sign",
    Ae ? cast.__platform__.crypto.sign : window.crypto.subtle.sign
  );
  u(
    "cast.receiver.crypto.unwrapKey",
    Ae ? cast.__platform__.crypto.unwrapKey : window.crypto.subtle.unwrapKey
  );
  u(
    "cast.receiver.crypto.verify",
    Ae ? cast.__platform__.crypto.verify : window.crypto.subtle.verify
  );
  u(
    "cast.receiver.crypto.wrapKey",
    Ae ? cast.__platform__.crypto.wrapKey : window.crypto.subtle.wrapKey
  );
  var Be = /#(.)(.)(.)(.)/,
    De = function(a) {
      if (!Ce.test(a))
        throw Error("'" + a + "' is not a valid alpha hex color");
      5 == a.length && (a = a.replace(Be, "#$1$1$2$2$3$3$4$4"));
      a = a.toLowerCase();
      return [
        parseInt(a.substr(1, 2), 16),
        parseInt(a.substr(3, 2), 16),
        parseInt(a.substr(5, 2), 16),
        parseInt(a.substr(7, 2), 16) / 255
      ];
    },
    Ce = /^#(?:[0-9a-f]{4}){1,2}$/i,
    Ee = function(a) {
      var b = a.slice(0);
      b[3] = Math.round(1e3 * a[3]) / 1e3;
      return "rgba(" + b.join(",") + ")";
    };
  var Ie = function(a, b, c, d) {
    F.call(this);
    this.c = a;
    this.ub = this.Nb = null;
    for (a = this.c; a.parentNode; ) a = a.parentNode;
    this.cd =
      0 >
      a
        .toString()
        .toLowerCase()
        .indexOf("shadow")
        ? document.head
        : a;
    this.Fa = [];
    this.Wb = !1;
    this.Tb = "cast-captions-" + Math.floor(1e6 * Math.random()).toString();
    this.Ad = "[" + this.Tb + '="true"]::cue ';
    this.Bd = new RegExp(/^[\.'":%,;\s\-0-9a-z]+$/i);
    b = l(b);
    for (a = b.next(); !a.done; a = b.next()) {
      a = a.value;
      var e = a.trackContentId;
      if ("TEXT" == a.type && e) {
        var f = a.trackContentType;
        if (
          0 == wa("vtt", e.substr(e.length - 3, 3)) ||
          (n(f) && 0 == wa(f, "text/vtt"))
        )
          (e = document.createElement("track")),
            (e.src = a.trackContentId),
            (e.id = a.trackId),
            (e.label = a.name),
            (e.srclang = a.language),
            (e.kind = (a.subtype || "CAPTIONS").toLowerCase()),
            this.Fa.push(e),
            this.c.appendChild(e);
      }
    }
    Fe(this);
    d && Ge(this, d);
    He(this, c);
  };
  k(Ie, F);
  Ie.prototype.ea = function() {
    return "TextTracksManager";
  };
  var Je = function(a, b) {
      a = l(a.Fa);
      for (var c = a.next(); !c.done; c = a.next()) {
        c = c.value;
        var d = c.track;
        b(c)
          ? (d.mode = "showing")
          : ((d.mode = "showing"), (d.mode = "disabled"));
      }
    },
    Ke = function(a) {
      return a.Fa.map(function(a) {
        return parseInt(a.id, 10);
      });
    },
    He = function(a, b) {
      Je(a, function(a) {
        return 0 <= Ga(b, parseInt(a.id, 10));
      });
    },
    Le = function(a, b) {
      Je(a, function(a) {
        return ua(b, a.srclang);
      });
    },
    Me = function(a) {
      var b = [];
      a = l(a.Fa);
      for (var c = a.next(); !c.done; c = a.next())
        (c = c.value), "showing" == c.track.mode && b.push(parseInt(c.id, 10));
      return b;
    },
    Ne = function(a) {
      a.ub &&
        (a.c.removeAttribute(a.Tb), a.cd.removeChild(a.ub), (a.Nb = null));
    },
    Oe = function(a) {
      a.Wb && (a.c.removeAttribute("crossorigin"), (a.Wb = !1));
    },
    S = function(a, b, c) {
      1 == c || a.Bd.test(b)
        ? a.Nb.insertRule(a.Ad + "{ " + b + " }", a.Nb.cssRules.length)
        : D(Pe, "Invalid css cue: " + b);
    },
    Fe = function(a) {
      Ne(a);
      Oe(a);
      var b = document.createElement("style");
      b.type = "text/css";
      a.cd.appendChild(b);
      b.appendChild(document.createTextNode(""));
      a.ub = b;
      a.Nb = a.ub.sheet;
      S(a, "font-size: 4.1vh;");
      S(a, "font-family: monospace;");
      S(a, "font-style: normal;");
      S(a, "font-weight: normal;");
      S(a, "background-color: black;");
      S(a, "color: white;");
      a.c.setAttribute(a.Tb, !0);
      0 < a.Fa.length &&
        !a.c.getAttribute("crossorigin") &&
        (a.c.setAttribute("crossorigin", "anonymous"), (a.Wb = !0));
    },
    Qe = function(a, b) {
      try {
        var c = Ee(De(a));
      } catch (d) {
        D(Pe, "Invalid color: " + a);
      }
      if (c)
        switch (((a =
          "rgba(204, 204, 204, " + parseInt(a.substring(7, 9), 16) + ")"),
        b)) {
          case "OUTLINE":
            return (
              "text-shadow: 0 0 4px " +
              c +
              ", 0 0 4px " +
              c +
              ", 0 0 4px " +
              c +
              ", 0 0 4px " +
              c +
              ";"
            );
          case "DROP_SHADOW":
            return (
              "text-shadow: 0px 2px 3px " +
              c +
              ", 0px 2px 4px " +
              c +
              ", 0px 2px 5px " +
              c +
              ";"
            );
          case "RAISED":
            return (
              "text-shadow: 1px 1px " +
              c +
              ", 2px 2px " +
              c +
              ", 3px 3px " +
              c +
              ";"
            );
          case "DEPRESSED":
            return (
              "text-shadow: 1px 1px " +
              a +
              ", 0 1px " +
              a +
              ", -1px -1px " +
              c +
              ", 0 -1px " +
              c +
              ";"
            );
        }
      return "";
    },
    Re = function(a) {
      switch (a) {
        case "BOLD":
          return "font-weight: bold;";
        case "BOLD_ITALIC":
          return "font-style: italic; font-weight: bold;";
        case "ITALIC":
          return "font-style: italic;";
      }
      return "font-style: normal;";
    },
    Ge = function(a, b) {
      if (n(b.foregroundColor))
        try {
          var c = Ee(De(b.foregroundColor));
          S(a, "color: " + c + ";", !0);
        } catch (t) {
          D(Pe, "Invalid color: " + b.foregroundColor);
        }
      if (n(b.backgroundColor))
        try {
          var d = Ee(De(b.backgroundColor));
          S(a, "background-color: " + d + ";", !0);
        } catch (t) {
          D(Pe, "Invalid color: " + b.backgroundColor);
        }
      n(b.fontScale) && S(a, "font-size: " + 100 * b.fontScale + "%;");
      if (n(b.fontFamily) || n(b.fontGenericFamily)) {
        c = b.fontFamily;
        d = b.fontGenericFamily;
        var e = "font-family: ",
          f = "";
        n(c) && ((e += '"' + c + '"'), (f = ", "));
        if (n(d)) {
          switch (d) {
            case "SANS_SERIF":
              var g = '"Droid Sans", sans-serif';
              break;
            case "MONOSPACED_SANS_SERIF":
              g = '"Droid Sans Mono", monospace';
              break;
            case "SERIF":
              g = '"Droid Serif", serif';
              break;
            case "MONOSPACED_SERIF":
              g = '"Cutive Mono"';
              break;
            case "CASUAL":
              g = '"Short Stack"';
              break;
            case "CURSIVE":
              g = "Quintessential";
              break;
            case "SMALL_CAPITALS":
              g = '"Alegreya Sans SC"';
          }
          e += f + g;
        }
        S(a, e + ";");
      }
      n(b.fontStyle) && S(a, Re(b.fontStyle));
      n(b.edgeType) &&
        ((g = n(b.foregroundColor) ? b.foregroundColor : "#FFFFFFFF"),
        (b = n(b.edgeColor) ? Qe(b.edgeColor, b.edgeType) : Qe(g, b.edgeType)),
        S(a, b, !0));
    };
  Ie.prototype.D = function() {
    F.prototype.D.call(this);
    for (var a = l(this.Fa), b = a.next(); !b.done; b = a.next())
      this.c.removeChild(b.value);
    this.Fa.length = 0;
    Ne(this);
    Oe(this);
    A(Pe, y, "Disposed " + this.ea());
  };
  var Pe = z("cast.receiver.TextTracksManager");
  var Se = function(a, b) {
    this.J = a;
    this.c = b;
    this.hc = this.Xb = this.Yb = q;
    this.Na = 0;
    this.ba = this.Ya = null;
    this.Xc = 0;
    this.o = this.w = null;
    this.eb = !1;
    this.Bb = !0;
    H(this.c, "error", this.jc, !1, this);
    H(this.c, "ended", this.Hb, !1, this);
    H(this.c, "loadedmetadata", this.nc, !1, this);
    E(this.J, "Using default Player");
  };
  h = Se.prototype;
  h.Uc = function(a, b, c, d) {
    Te(this);
    this.Bb = a;
    this.Na = b;
    this.Xc = d || 0;
    this.ba = c || null;
  };
  h.jc = function(a) {
    Te(this);
    this.Yb(a);
  };
  h.Hb = function() {
    Te(this);
    this.Xb();
  };
  h.nc = function() {
    this.w && this.o && He(this.w, this.o);
    this.hc();
  };
  h.registerErrorCallback = function(a) {
    this.Yb = a;
  };
  h.registerEndedCallback = function(a) {
    this.Xb = a;
  };
  h.registerLoadCallback = function(a) {
    this.hc = a;
  };
  h.unregisterErrorCallback = function() {
    this.Yb = q;
  };
  h.unregisterEndedCallback = function() {
    this.Xb = q;
  };
  h.unregisterLoadCallback = function() {
    this.hc = q;
  };
  var Ue = function(a) {
      var b = a.c.duration;
      if (isNaN(b) || null == a.ba) return b;
      if (null != a.Ya) return a.Ya;
      a.Ya = 0 <= a.ba ? Math.min(a.Xc + a.ba, b) : Math.max(b + a.ba, a.Na);
      return a.Ya;
    },
    Te = function(a) {
      null != a.ba &&
        (I(a.c, "timeupdate", a.Sc, !1, a), (a.Ya = null), (a.ba = null));
    };
  Se.prototype.Sc = function() {
    Ve(this);
  };
  var Ve = function(a) {
    if (null == a.ba) return !1;
    var b = Ue(a);
    return isNaN(b) ? !1 : a.c.currentTime >= b ? (a.Hb(), !0) : !1;
  };
  h = Se.prototype;
  h.load = function(a, b, c, d, e, f) {
    this.w && (this.w.M(), (this.w = null));
    this.eb = !1;
    d &&
      d.tracks &&
      this.c &&
      (this.w && this.w.M(),
      (this.w = new Ie(
        this.c,
        d.tracks,
        d.activeTrackIds || [],
        d.textTrackStyle || null
      )),
      d.language && Le(this.w, d.language));
    null != this.ba && H(this.c, "timeupdate", this.Sc, !1, this);
    e ||
      ((this.Na = c && 0 < c ? c : 0),
      E(
        this.J,
        "Load - contentId: " + a + " autoplay: " + b + " time: " + this.Na
      ),
      (this.c.autoplay = !1),
      a && (this.c.src = a),
      (this.c.autoplay = b),
      this.c.load(),
      n(f) && (this.c.playbackRate = f));
  };
  h.reset = function() {
    this.eb = !1;
    this.w && (this.w.M(), (this.w = null));
    this.o = null;
    this.c.removeAttribute("src");
    this.Na = 0;
    this.c.load();
    Te(this);
  };
  h.play = function() {
    this.eb = !1;
    this.c.play();
  };
  h.seek = function(a, b) {
    this.c.currentTime != a && (this.c.currentTime = a);
    Ve(this) ||
      ("PLAYBACK_START" == b && this.c.paused
        ? this.c.play()
        : "PLAYBACK_PAUSE" != b || this.c.paused || this.c.pause());
  };
  h.md = function(a) {
    return (this.c.playbackRate = a);
  };
  h.pause = function() {
    this.eb = !0;
    this.c.pause();
  };
  h.getState = function() {
    null == this.Bb && (this.Bb = this.c.autoplay);
    return this.c.paused || isNaN(this.c.duration)
      ? this.c.duration &&
        (this.c.currentTime || 0 == this.c.currentTime) &&
        this.c.currentTime < Ue(this)
        ? this.c.currentTime == this.Na && this.Bb && !this.eb
          ? "BUFFERING"
          : "PAUSED"
        : "IDLE"
      : "PLAYING";
  };
  h.getCurrentTimeSec = function() {
    var a = Ue(this);
    return isNaN(a)
      ? this.c.currentTime
      : this.c.currentTime < a ? this.c.currentTime : a;
  };
  h.getDurationSec = function() {
    return Ue(this);
  };
  h.getVolume = function() {
    return { level: this.c.volume, muted: this.c.muted };
  };
  h.setVolume = function(a) {
    n(a.level) && (this.c.volume = a.level);
    n(a.muted) && (this.c.muted = a.muted);
  };
  h.editTracksInfo = function(a) {
    if (this.w) {
      if (a.textTrackStyle) {
        var b = this.w,
          c = a.textTrackStyle;
        Fe(b);
        Ge(b, c);
      }
      a.language
        ? Le(this.w, a.language)
        : a.activeTrackIds && He(this.w, a.activeTrackIds);
    }
    We(this, a.activeTrackIds);
    return this.o;
  };
  var We = function(a, b) {
    a.o = b ? b.slice(0) : a.o;
    a.o = a.o || [];
    if (a.w) {
      var c = Ke(a.w);
      a.o = a.o
        .filter(function(a) {
          return !c.includes(a);
        })
        .concat(Me(a.w));
    }
    0 == a.o.length && (a.o = null);
  };
  var Xe = function(a) {
    F.call(this);
    this.Ma = a;
    this.m = {};
  };
  ta(Xe, F);
  var Ye = [];
  Xe.prototype.Pa = function(a, b, c, d) {
    ma(b) || (b && (Ye[0] = b.toString()), (b = Ye));
    for (var e = 0; e < b.length; e++) {
      var f = H(a, b[e], c || this.handleEvent, d || !1, this.Ma || this);
      if (!f) break;
      this.m[f.key] = f;
    }
    return this;
  };
  Xe.prototype.Hc = function(a, b, c, d) {
    return Ze(this, a, b, c, d);
  };
  var Ze = function(a, b, c, d, e, f) {
    if (ma(c)) for (var g = 0; g < c.length; g++) Ze(a, b, c[g], d, e, f);
    else {
      b = Wb(b, c, d || a.handleEvent, e, f || a.Ma || a);
      if (!b) return a;
      a.m[b.key] = b;
    }
    return a;
  };
  Xe.prototype.nb = function(a, b, c, d, e) {
    if (ma(b)) for (var f = 0; f < b.length; f++) this.nb(a, b[f], c, d, e);
    else
      (c = c || this.handleEvent),
        (d = oa(d) ? !!d.capture : !!d),
        (e = e || this.Ma || this),
        (c = Xb(c)),
        (d = !!d),
        (b = Mb(a)
          ? a.$a(b, c, d, e)
          : a ? ((a = Zb(a)) ? a.$a(b, c, d, e) : null) : null),
        b && (cc(b), delete this.m[b.key]);
    return this;
  };
  Xe.prototype.sc = function() {
    Pa(
      this.m,
      function(a, b) {
        this.m.hasOwnProperty(b) && cc(a);
      },
      this
    );
    this.m = {};
  };
  Xe.prototype.D = function() {
    Xe.Ua.D.call(this);
    this.sc();
  };
  Xe.prototype.handleEvent = function() {
    throw Error("EventHandler.handleEvent not implemented");
  };
  var $e = { hf: "persistent-release-message" };
  u("cast.receiver.eme.KeySessionType", $e);
  var af = new Uint8Array([
      43,
      248,
      102,
      128,
      198,
      229,
      78,
      36,
      190,
      35,
      15,
      129,
      90,
      96,
      110,
      178
    ]),
    T = function(a, b) {
      this.h = new K();
      this.ue = b;
      this.O = a.createSession("persistent-license");
      this.sessionId = "";
      this.expiration = this.O.expiration;
      this.closed = this.O.closed;
      this.keyStatuses = this.O.keyStatuses;
      this.Ma = new Xe(this);
      Eb(this.h, ra(Fb, this.Ma));
    };
  u("cast.receiver.eme.KeySession", T);
  T.createSession = function(a, b) {
    a: {
      for (var c in $e) if ($e[c] == b) break a;
      throw Error("Unknown key session type: " + b);
    }
    a = new T(a, b);
    a.Ma.Pa(a.O, "message", a.ad).Pa(a.O, "keystatuseschange", a.ad);
    return a;
  };
  T.prototype.generateRequest = function(a, b) {
    if ("persistent-release-message" == this.ue) {
      if ("cenc" != a)
        throw Error(
          "Only cenc initDataType is supported for persistent-release-message session type."
        );
      var c = new Uint8Array([
        0,
        0,
        0,
        0,
        112,
        115,
        115,
        104,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        2,
        0,
        2
      ]);
      c.set(af, 12);
      new DataView(c.buffer).setUint32(0, c.length);
      var d = new Uint8Array(b.byteLength + c.byteLength);
      d.set(new Uint8Array(b), 0);
      d.set(c, b.byteLength);
      b = d;
    }
    return this.O.generateRequest(a, b).then(
      r(function() {
        this.sessionId = this.O.sessionId;
      }, this)
    );
  };
  T.prototype.generateRequest = T.prototype.generateRequest;
  T.prototype.load = function(a) {
    return this.O.load(a);
  };
  T.prototype.load = T.prototype.load;
  T.prototype.update = function(a) {
    return this.O.update(a);
  };
  T.prototype.update = T.prototype.update;
  T.prototype.close = function() {
    this.h.M();
    return this.O.close();
  };
  T.prototype.close = T.prototype.close;
  T.prototype.remove = function() {
    return this.O.remove();
  };
  T.prototype.remove = T.prototype.remove;
  T.prototype.ad = function(a) {
    var b = new G(a.type);
    Wa(b, a.Ja);
    b.target = this;
    this.h.dispatchEvent(b);
  };
  T.prototype.addEventListener = function(a, b) {
    H(this.h, a, b);
  };
  T.prototype.addEventListener = T.prototype.addEventListener;
  T.prototype.removeEventListener = function(a, b) {
    I(this.h, a, b);
  };
  T.prototype.removeEventListener = T.prototype.removeEventListener;
  T.prototype.dispatchEvent = function(a) {
    a.target = this;
    return this.h.dispatchEvent(a);
  };
  T.prototype.dispatchEvent = T.prototype.dispatchEvent;
  var bf = z("cast");
  u("cast.receiver.logger", bf);
  u("cast.receiver.LoggerLevel", {
    DEBUG: 0,
    VERBOSE: 500,
    INFO: 800,
    WARNING: 900,
    ERROR: 1e3,
    NONE: 1500
  });
  bf.kd = function(a) {
    bf && bf.uc(yb(a));
  };
  bf.setLevelValue = bf.kd;
  if (bf) {
    var cf = parseInt(Vc("log-level-cast-receiver"), 10);
    bf.kd(cf || 1e3);
  }
  var df = function() {
    this.V = [];
    this.Z = [];
  };
  df.prototype.enqueue = function(a) {
    this.Z.push(a);
  };
  var ef = function(a) {
    0 == a.V.length && ((a.V = a.Z), a.V.reverse(), (a.Z = []));
    return a.V.pop();
  };
  h = df.prototype;
  h.ec = function() {
    return 0 == this.V.length && 0 == this.Z.length;
  };
  h.clear = function() {
    this.V = [];
    this.Z = [];
  };
  h.contains = function(a) {
    return 0 <= Ga(this.V, a) || 0 <= Ga(this.Z, a);
  };
  h.remove = function(a) {
    var b = this.V;
    var c = Ha(b, a);
    0 <= c ? (Ia(b, c), (b = !0)) : (b = !1);
    return b || Ja(this.Z, a);
  };
  h.Cc = function() {
    for (var a = [], b = this.V.length - 1; 0 <= b; --b) a.push(this.V[b]);
    var c = this.Z.length;
    for (b = 0; b < c; ++b) a.push(this.Z[b]);
    return a;
  };
  var U = function() {};
  u("cast.receiver.QueueBase", U);
  U.prototype.load = function() {
    return Promise.reject("Not implemented");
  };
  U.prototype.load = U.prototype.load;
  U.prototype.pa = function() {
    return null;
  };
  U.prototype.getCurrentItem = U.prototype.pa;
  U.prototype.hd = function() {
    return Promise.reject("Not implemented");
  };
  U.prototype.setCurrentItemById = U.prototype.hd;
  U.prototype.Oc = function() {
    return Promise.reject("Not implemented");
  };
  U.prototype.nextItems = U.prototype.Oc;
  U.prototype.Vc = function() {
    return Promise.reject("Not implemented");
  };
  U.prototype.prevItems = U.prototype.Vc;
  U.prototype.Ka = function() {
    return Promise.reject("Not implemented");
  };
  U.prototype.fetchItems = U.prototype.Ka;
  U.prototype.je = function() {
    return -1;
  };
  U.prototype.getMaxNumItems = U.prototype.je;
  U.prototype.Se = function() {};
  U.prototype.setUpdateCallback = U.prototype.Se;
  var ff = function(a) {
    this.itemId = a;
    this.customData = this.activeTrackIds = this.preloadTime = this.playbackDuration = this.startTime = this.autoplay = this.media = void 0;
  };
  u("cast.receiver.media.QueueItem", ff);
  ff.prototype.clone = function(a) {
    var b = new ff(this.itemId);
    b.autoplay = this.autoplay;
    b.startTime = this.startTime;
    b.playbackDuration = this.playbackDuration;
    b.preloadTime = this.preloadTime;
    b.activeTrackIds = this.activeTrackIds;
    b.customData = this.customData;
    if (!n(a) || a) b.media = this.media;
    return b;
  };
  var V = function(a) {
    this.a = void 0;
    this.L = "REPEAT_OFF";
    this.vc = this.j = 0;
    this.Wc = this.b = void 0;
    this.Ec = a;
    this.lb = 1;
  };
  u("cast.receiver.MediaQueue", V);
  var hf = function(a, b) {
      if (b.queueData) {
        var c = b.queueData;
        if (a.b)
          return Promise.resolve(a.b.load(b)).then(function(b) {
            gf(a, b, !0);
          });
        if (c.items) {
          gf(a, c);
          return;
        }
      }
      c = new ff(a.Ec());
      c.media = b.media;
      c.autoplay = b.autoplay;
      c.activeTrackIds = b.activeTrackIds;
      c.customData = b.customData;
      a.a = [c];
    },
    gf = function(a, b, c) {
      jf(a, b, void 0 === c ? !1 : c) ||
        D(kf, "The passed in queueData is not completely valid: " + b);
      a.Wc = b;
      a.a = b.items;
      a.L = b.repeatMode || a.L;
      a.j = b.startIndex || 0;
      a.vc = b.startTime || 0;
    };
  V.prototype.Ka = function(a, b, c, d) {
    var e = this,
      f = void 0,
      g = lf(this, b);
    this.b
      ? 0 < c && 0 < d
        ? (f = "Queue operations only support expanding the front or back.")
        : 0 > g && (f = "Reference item id is not in current queue.")
      : (f = "Fetch items is only supported with an external queue.");
    if (f) return D(kf, f), Promise.reject(f);
    0 < c
      ? ((f = this.a.length - 1), (c -= f - g), (b = Ea(this.a[f].itemId)))
      : 0 < d && ((d -= g), (b = Ea(this.a[0].itemId)));
    var t = new Jd();
    t.requestId = a;
    return 0 >= c && 0 >= d
      ? ((t.changeType = "NO_CHANGE"),
        (t.sequenceNumber = this.lb - 1),
        Promise.resolve(t))
      : Promise.resolve(this.b.Ka(b, c, d)).then(function(a) {
          if (a && 0 != a.length) {
            var d = 0 < c ? void 0 : b;
            mf(e, a, d);
            t.changeType = "INSERT";
            t.itemIds = a.map(function(a) {
              return a.itemId;
            });
            t.insertBefore = d;
            t.sequenceNumber = e.lb++;
          } else (t.changeType = "NO_CHANGE"), (t.sequenceNumber = e.lb - 1);
          return t;
        });
  };
  var nf = function(a, b, c) {
      var d = new Kd();
      d.requestId = b;
      d.items = [];
      if (a.a)
        for (b = l(c), c = b.next(); !c.done; c = b.next()) {
          c = c.value;
          for (var e = l(a.a), f = e.next(); !f.done; f = e.next())
            if (((f = f.value), f.itemId == c)) {
              d.items.push(f);
              break;
            }
          D(kf, "Unknown item id: " + c);
        }
      return d;
    },
    of = function(a, b) {
      var c = new Ld();
      c.requestId = b;
      c.ids = a.cc().map(function(a) {
        return a.itemId;
      });
      return c;
    },
    pf = function(a, b) {
      return new Promise(function(c, d) {
        var e = void 0,
          f = a.bc();
        Ea(f);
        1 == b
          ? (e = a.b.Oc.bind(a.b))
          : -1 == b
            ? (e = a.b.Vc.bind(a.b))
            : 1 < b
              ? (e = a.b.Ka.bind(a.b, f, b, 0))
              : -1 > b
                ? (e = a.b.Ka.bind(a.b, f, 0, -b))
                : d("Should not be requesting more items on the current item");
        Promise.resolve(e()).then(
          function(e) {
            0 < e.length
              ? (mf(a, e, 0 <= b ? void 0 : a.bc()), c())
              : d("No more items from the queue.");
          },
          function() {
            return d("Failed to get more items from the queue.");
          }
        );
      });
    };
  V.prototype.clear = function() {
    this.a = void 0;
    this.L = "REPEAT_OFF";
    this.vc = this.j = 0;
  };
  V.prototype.cc = function(a) {
    if (!n(a) || a) return v(this.a), this.a;
    for (var b = [], c = 0; c < this.a.length; c++) b.push(this.a[c].clone(a));
    return b;
  };
  V.prototype.getItems = V.prototype.cc;
  V.prototype.ie = function() {
    return this.a.length;
  };
  V.prototype.getLength = V.prototype.ie;
  V.prototype.ne = function() {
    return this.L;
  };
  V.prototype.getRepeatMode = V.prototype.ne;
  V.prototype.bc = function() {
    if (!(0 > this.j)) {
      var a = this.a[this.j].itemId;
      Ea(a);
      return a;
    }
  };
  V.prototype.getCurrentItemId = V.prototype.bc;
  V.prototype.pa = function() {
    return !this.a || 0 > this.j ? null : this.a[this.j];
  };
  V.prototype.getCurrentItem = V.prototype.pa;
  var qf = function(a, b) {
      for (var c = [], d = 0; d < b.length; d++)
        for (var e = 0; e < a.a.length; e++)
          if (b[d] == a.a[e].itemId) {
            c.push(b[d]);
            break;
          }
      return c;
    },
    rf = function(a) {
      return "REPEAT_ALL_AND_SHUFFLE" == a.L;
    },
    lf = function(a, b) {
      for (var c = 0; c < a.a.length; c++) if (b == a.a[c].itemId) return c;
      return -1;
    },
    sf = function(a) {
      return "REPEAT_ALL_AND_SHUFFLE" == a.L || "REPEAT_ALL" == a.L;
    };
  V.prototype.reset = function() {
    this.j = -1;
  };
  var uf = function(a, b) {
      b = lf(a, b);
      if (-1 == b || a.j == b) return !1;
      tf(a, b);
      return !0;
    },
    mf = function(a, b, c, d) {
      v(a.a);
      c = p(c) ? lf(a, c) : a.a.length;
      c = -1 == c ? a.a.length : c;
      ra(La, a.a, c, 0).apply(null, b);
      n(d) ? (a.j = c + d) : a.j >= c && (a.j += b.length);
    },
    vf = function(a, b) {
      return a.b
        ? (b && D(kf, b + " not supported when external queue is provided."),
          !0)
        : !1;
    },
    xf = function(a, b, c) {
      if (0 > a.j) return "QUEUE_ENDED";
      b = a.j + b;
      var d = !1;
      b >= a.a.length
        ? ((b = sf(a) ? b % a.a.length : -1), (d = !0))
        : 0 > b &&
          ((b = sf(a) ? a.a.length + (b + 1) % a.a.length - 1 : 0), (d = !0));
      c && tf(a, b);
      return -1 == b
        ? "QUEUE_ENDED"
        : d
          ? rf(a) ? (wf(a), "QUEUE_SHUFFLED") : "QUEUE_LOOP"
          : "QUEUE_ACTIVE";
    },
    wf = function(a) {
      var b = a.a.length;
      if (!(3 > a.a.length))
        for (; 0 < b; ) {
          var c = Math.floor(Math.random() * b);
          --b;
          var d = a.a[c];
          a.a[c] = a.a[b];
          a.a[b] = d;
        }
    },
    jf = function(a, b, c) {
      c = void 0 === c ? !1 : c;
      if (n(b.startIndex) && (!p(b.startIndex) || 0 > b.startIndex))
        return B(kf, "Invalid startIndex " + b.startIndex), !1;
      var d = (b.startIndex || 0) + 1;
      if (!b.items || b.items.length < d)
        return B(kf, "Invalid number of items"), !1;
      if (b.repeatMode && !Md(b.repeatMode))
        return B(kf, "Invalid repeatMode"), !1;
      for (d = 0; d < b.items.length; d++)
        if (b.items[d].media) {
          if (!c && n(b.items[d].itemId))
            return (
              B(kf, "ItemId should not be defined, element at index: " + d), !1
            );
          b.items[d].itemId = p(b.items[d].itemId) ? b.items[d].itemId : a.Ec();
        } else
          return (
            B(kf, "Media is mandatory, missing in element at index: " + d), !1
          );
      return !0;
    },
    tf = function(a, b) {
      a.j = b;
      a.b &&
        0 <= b &&
        b < a.a.length &&
        Promise.resolve(a.b.hd(Ea(a.a[b].itemId))).catch(function() {
          E(kf, "External queue did not implement setCurrentItemById.");
        });
    },
    kf = z("cast.receiver.MediaQueue");
  var yf = function(a) {
      var b = this;
      this.Pc = a;
      this.s = null;
      this.Dc = "sdr";
      this.Zc = function() {
        b.Pc();
      };
    },
    zf = function(a) {
      return a.s ? a.s.videoWidth : 0;
    },
    Af = function(a) {
      return a.s ? a.s.videoHeight : 0;
    };
  var W = function(a, b, c) {
    var d = this,
      e = O.fa();
    he.fa();
    this.ua = c || "local";
    this.W = e.La("urn:x-cast:com.google.cast.media", "JSON");
    this.ia = 0;
    this.hb = this.sa = null;
    this.Jb = 1;
    this.Xe = b || 15;
    this.pd = this.Kc = this.Oa = this.ra = this.i = this.g = null;
    this.ha = !1;
    this.o = this.ga = this.u = null;
    this.Cb = !0;
    this.Va = null;
    this.Sb = this.xd.bind(this);
    this.b = new V(this.zc.bind(this));
    this.ob = !1;
    this.za = null;
    this.ze = 1;
    this.Mb = -1;
    this.Eb = new df();
    this.bb = !1;
    this.customizedStatusCallback = this.Cd;
    this.customizedCloudStatusCallback = null;
    this.onLoad = this.Nd;
    this.onPlay = this.Rd;
    this.onPlayAgain = this.Qd;
    this.onSeek = this.Xd;
    this.onSetPlaybackRate = this.Yd;
    this.onPause = this.Pd;
    this.onStop = this.$d;
    this.onSetVolume = this.Zd;
    this.onEditTracksInfo = this.Fd;
    this.onEditAudioTracks = this.Ed;
    this.onQueueLoad = this.Ud;
    this.onQueueInsert = this.Td;
    this.onQueueUpdate = this.yc;
    this.onQueueRemove = this.Vd;
    this.onQueueReorder = this.Wd;
    this.onMetadataLoaded = this.Od;
    this.onLoadMetadataError = this.Md;
    this.onEnded = this.Gd;
    this.onQueueEnded = this.Sd;
    this.onAbort = q;
    this.onError = this.Hd;
    this.onMediaStatus = this.onLocalRequestError = q;
    this.onPreload = this.onPrecache = null;
    this.onFetchItems = this.Id;
    this.onGetItemsInfo = this.Jd;
    this.onGetQueueIds = this.Kd;
    this.onCancelPreload = null;
    this.onGetStatus = this.Ld;
    this.qb = new yf(this.l.bind(this, !1));
    e.lc = function(a) {
      var b = d.qb;
      b.Dc = a;
      b.Pc();
    };
    this.h = new K();
    this.ld(a);
    this.W.onMessage = this.mc.bind(this);
    this.Va = Oc(this.Sb, 1e3);
  };
  u("cast.receiver.MediaManager", W);
  W.prototype.ea = function() {
    return "MediaManager";
  };
  W.prototype.zc = function() {
    return this.ze++;
  };
  W.prototype.ke = function() {
    return this.i ? this.i.media || null : null;
  };
  W.prototype.getMediaInformation = W.prototype.ke;
  W.prototype.le = function() {
    return n(this.b.a) ? this.b : null;
  };
  W.prototype.getMediaQueue = W.prototype.le;
  W.prototype.te = function(a, b, c, d, e) {
    a = new Bf(a);
    a.insertBefore = null != b ? b : void 0;
    a.currentItemIndex = null != c ? c : void 0;
    a.currentItemId = null != d ? d : void 0;
    a.currentTime = null != e ? e : void 0;
    a.type = "QUEUE_INSERT";
    Cf(this, this.ua, a);
  };
  W.prototype.insertQueueItems = W.prototype.te;
  W.prototype.He = function(a, b, c) {
    a = new Df(a);
    a.currentItemId = null != b ? b : void 0;
    a.currentTime = null != c ? c : void 0;
    a.type = "QUEUE_REMOVE";
    Cf(this, this.ua, a);
  };
  W.prototype.removeQueueItems = W.prototype.He;
  W.prototype.Oe = function(a, b, c) {
    b = !n(b) || b;
    if (c && !b)
      throw Error("No broadcast call but status customData has been provided");
    this.i && (this.i.media = a);
    b && this.l(!0, null, c);
  };
  W.prototype.setMediaInformation = W.prototype.Oe;
  var Ef = function(a) {
      for (var b = 0; b < a.length; b++)
        if (!n(a[b].trackId) || !n(a[b].type)) return !1;
      return !0;
    },
    Ff = function(a, b) {
      if (!b) return !0;
      if (!a) return !1;
      a = l(a);
      for (var c = a.next(); !c.done; c = a.next())
        if (
          ((c = c.value),
          "TEXT" == c.type && n(c.language) && ua(c.language, b))
        )
          return !0;
      return !1;
    },
    Gf = function(a, b) {
      if (!b) return !0;
      if (!a) return !1;
      a = l(a);
      for (var c = a.next(); !c.done; c = a.next())
        if (
          ((c = c.value),
          "AUDIO" == c.type && n(c.language) && ua(c.language, b))
        )
          return !0;
      return !1;
    },
    Hf = function(a, b) {
      if (!b || 0 == b.length) return !0;
      if (!a || b.length > a.length) return B(X, "Too many track IDs"), !1;
      for (var c = 0, d = 0, e = 0; e < b.length; e++) {
        for (var f = !1, g = 0; g < a.length; g++)
          if (b[e] == a[g].trackId) {
            f = !0;
            break;
          }
        if (!f) return B(X, "Track ID does not exist: " + b[e]), !1;
        "AUDIO" == a[g].type ? d++ : "VIDEO" == a[g].type && c++;
        if (1 < d || 1 < c)
          return (
            B(
              X,
              "Maximum one active video and one active audio track supported"
            ),
            !1
          );
      }
      return !0;
    },
    Cf = function(a, b, c) {
      c.mediaSessionId = a.ia;
      a.mc(new ed("message", b, c));
    };
  W.prototype.mc = function(a) {
    var b = a.data,
      c = b.type;
    if (!this.bb || (this.Eb.ec() && "LOAD" == c)) {
      a = a.senderId;
      var d = b.type;
      var e = b.requestId;
      if (p(e) && e == Math.floor(e)) {
        var f = !1;
        void 0 != b.mediaSessionId && b.mediaSessionId != this.ia
          ? (B(
              X,
              "Invalid media session ID: " +
                b.mediaSessionId +
                "  does not match the expected ID: " +
                this.ia
            ),
            (f = !0))
          : "LOAD" != d &&
            "PLAY_AGAIN" != d &&
            "GET_STATUS" != d &&
            "QUEUE_LOAD" != d &&
            "PRECACHE" != d &&
            (n(b.mediaSessionId)
              ? "IDLE" == If(this) &&
                (B(
                  X,
                  "Unexpected command, player is in IDLE state so the media session ID is not valid yet"
                ),
                (f = !0))
              : (B(X, "Invalid media session ID, it is undefined"), (f = !0)));
        f
          ? (this.la(a, e, "INVALID_REQUEST", "INVALID_MEDIA_SESSION_ID"),
            (d = !1))
          : (A(X, y, "MediaManager message received"), (d = !0));
      } else
        B(X, "Ignoring request, requestId is not an integer: " + e), (d = !1);
      if (d) {
        d = b.requestId;
        delete b.type;
        e = null;
        switch (c) {
          case "LOAD":
            this.ob = !1;
            e = Jf(this, a, b, !0);
            break;
          case "GET_STATUS":
            E(X, "Dispatching MediaManager getStatus event");
            b = new Y("getstatus", b, a);
            if (this.onGetStatus) this.onGetStatus(b);
            this.f(b);
            e = null;
            break;
          case "PLAY":
            E(X, "Dispatching MediaManager play event");
            b = new Y("play", b, a);
            if (this.onPlay) this.onPlay(b);
            this.f(b);
            e = null;
            break;
          case "PLAY_AGAIN":
            E(X, "Dispatching MediaManager play again event");
            b = new Y("playagain", b, a);
            if (this.onPlayAgain) this.onPlayAgain(b);
            this.f(b);
            e = null;
            break;
          case "SEEK":
            if (n(b.currentTime) || n(b.relativeTime)) {
              E(X, "Dispatching MediaManager seek event");
              b = new Y("seek", b, a);
              if (this.onSeek) this.onSeek(b);
              this.f(b);
              e = null;
            } else
              B(X, "currentTime or relativeTime is required"),
                (e = {
                  type: "INVALID_REQUEST",
                  reason: "INVALID_PARAMS"
                });
            break;
          case "SET_PLAYBACK_RATE":
            if (
              !p(b.playbackRate) ||
              0.5 > b.playbackRate ||
              2 < b.playbackRate
            )
              B(X, "Bad value for playback rate " + b.playbackRate),
                (e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" });
            else {
              E(X, "Dispatching MediaManager playback rate event");
              b = new Y("setplaybackrate", b, a);
              if (this.onSetPlaybackRate) this.onSetPlaybackRate(b);
              this.f(b);
              e = null;
            }
            break;
          case "STOP":
            E(X, "Dispatching MediaManager stop event");
            b = new Y("stop", b, a);
            if (this.onStop) this.onStop(b);
            this.f(b);
            e = null;
            break;
          case "PAUSE":
            E(X, "Dispatching MediaManager pause event");
            b = new Y("pause", b, a);
            if (this.onPause) this.onPause(b);
            this.f(b);
            e = null;
            break;
          case "SET_VOLUME":
            if (b.volume && (n(b.volume.level) || n(b.volume.muted)))
              if (
                (void 0 != b.volume.level && 0 > b.volume.level) ||
                1 < b.volume.level
              )
                B(X, "volume level is invalid"),
                  (e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" });
              else {
                E(X, "Dispatching MediaManager setvolume event");
                b = new Y("setvolume", b, a);
                if (this.onSetVolume) this.onSetVolume(b);
                this.f(b);
                e = null;
              }
            else
              B(X, "volume is invalid"),
                (e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" });
            break;
          case "EDIT_TRACKS_INFO":
            E(X, "Dispatching MediaManager editTracksInfo event");
            if (Hf(this.i.media.tracks, b.activeTrackIds)) {
              e = new Y("edittracksinfo", b, a);
              b.textTrackStyle &&
                (this.i.media.textTrackStyle = b.textTrackStyle);
              b.activeTrackIds && (this.o = b.activeTrackIds);
              if (this.onEditTracksInfo) this.onEditTracksInfo(e);
              this.f(e);
              e = null;
            } else
              B(X, "Invalid track info"),
                (e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" });
            break;
          case "EDIT_AUDIO_TRACKS":
            E(X, "Dispatching MediaManager editAudioTracks event");
            b = new Y("editaudiotracks", b, a);
            if (this.onEditAudioTracks) this.onEditAudioTracks(b);
            this.f(b);
            e = null;
            break;
          case "QUEUE_LOAD":
            this.ob = !0;
            E(X, "Dispatching MediaManager queueLoad event");
            if (jf(this.b, b)) {
              b.items = Kf(b.items);
              b = new Y("queueload", b, a);
              if (this.onQueueLoad) this.onQueueLoad(b);
              this.f(b);
              e = null;
            } else e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" };
            break;
          case "QUEUE_INSERT":
            this.ob = !0;
            E(X, "Dispatching MediaManager queueInsert event");
            e = !1;
            if (n(this.b.a))
              if (b.items && 0 != b.items.length)
                if (n(b.currentItemId) && n(b.currentItemIndex))
                  B(X, "Maximum one currentItem must be provided"), (e = !0);
                else if (
                  n(b.currentItemIndex) &&
                  (!p(b.currentItemIndex) ||
                    0 > b.currentItemIndex ||
                    b.currentItemIndex >= b.items.length)
                )
                  B(X, "Invalid currentItemIndex"), (e = !0);
                else if (
                  n(b.currentItemId) &&
                  (!p(b.currentItemId) || 0 > b.currentItemId)
                )
                  B(X, "Invalid currentItemId"), (e = !0);
                else
                  for (c = 0; c < b.items.length; c++)
                    if (p(b.items[c].itemId)) {
                      B(X, "Item contains an itemId at index: " + c);
                      e = !0;
                      break;
                    } else b.items[c].itemId = this.zc();
              else B(X, "No items to insert"), (e = !0);
            else B(X, "Queue does not exist"), (e = !0);
            if (e) e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" };
            else {
              b.items = Kf(b.items);
              b = new Y("queueinsert", b, a);
              if (this.onQueueInsert) this.onQueueInsert(b);
              this.f(b);
              e = null;
            }
            break;
          case "QUEUE_UPDATE":
            e = Lf(this, a, b);
            break;
          case "QUEUE_REMOVE":
            E(X, "Dispatching MediaManager queueRemove event");
            e = !1;
            n(this.b.a)
              ? b.itemIds && 0 != b.itemIds.length
                ? Mf(b.itemIds) || (e = !0)
                : (B(X, "No itemIds to remove"), (e = !0))
              : (B(X, "Queue does not exist"), (e = !0));
            if (e) e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" };
            else {
              b.itemIds && (b.itemIds = qf(this.b, b.itemIds));
              b = new Y("queueremove", b, a);
              if (this.onQueueRemove) this.onQueueRemove(b);
              this.f(b);
              e = null;
            }
            break;
          case "QUEUE_REORDER":
            E(X, "Dispatching MediaManager queueReorder event");
            e = !1;
            n(this.b.a)
              ? b.itemIds && 0 != b.itemIds.length
                ? Mf(b.itemIds)
                  ? n(b.insertBefore) &&
                    0 <= Ga(b.itemIds, b.insertBefore) &&
                    (B(X, "insertBefore can not be one of the reordered items"),
                    (e = !0))
                  : (e = !0)
                : (B(X, "No itemIds to reorder"), (e = !0))
              : (B(X, "Queue does not exist"), (e = !0));
            if (e) e = { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" };
            else {
              b.itemIds && (b.itemIds = qf(this.b, b.itemIds));
              b = new Y("queuereorder", b, a);
              if (this.onQueueReorder) this.onQueueReorder(b);
              this.f(b);
              e = null;
            }
            break;
          case "PRECACHE":
            b = new Y("precache", b, "__broadcast__");
            if (this.onPrecache) this.onPrecache(b);
            this.f(b);
            break;
          case "NEXT":
            b = new Nf();
            b.jump = 1;
            Lf(this, a, b);
            break;
          case "PREVIOUS":
            b = new Nf();
            b.jump = -1;
            Lf(this, a, b);
            break;
          case "FETCH_ITEMS":
            b = new Y("fetchitems", b, a);
            if (this.onFetchItems) this.onFetchItems(b);
            this.f(b);
            break;
          case "GET_ITEMS_INFO":
            b = new Y("getitemsinfo", b, a);
            if (this.onGetItemsInfo) this.onGetItemsInfo(b);
            this.f(b);
            break;
          case "GET_QUEUE_IDS":
            b = new Y("getqueueids", b, a);
            if (this.onGetQueueIds) this.onGetQueueIds(b);
            this.f(b);
            break;
          default:
            B(X, "Unexpected message type: " + c),
              (e = { type: "INVALID_REQUEST", reason: "INVALID_COMMAND" });
        }
        Of(this, e, a, d);
      }
    } else this.Eb.enqueue(a);
  };
  var Of = function(a, b, c, d) {
      b &&
        (B(X, "Sending error: " + b.type + " " + b.reason),
        a.onLocalRequestError && c == a.ua
          ? ((b.requestId = d), a.onLocalRequestError(b))
          : a.la(c, d, b.type, b.reason));
    },
    If = function(a) {
      if (!a.i) return "IDLE";
      var b = a.g.getState();
      return "PLAYING" == b && a.ha ? "BUFFERING" : b;
    },
    Qf = function(a, b, c, d) {
      var e = { type: "MEDIA_STATUS" },
        f = (a.u && a.u.message.media) || null;
      if (!a.i && !a.ra && !f) return (e.status = []), e;
      var g = {
        mediaSessionId: a.ia,
        playbackRate: a.Jb,
        playerState: If(a),
        currentTime: a.g.getCurrentTimeSec(),
        supportedMediaCommands: a.Xe,
        volume: a.g.getVolume()
      };
      a.o && (g.activeTrackIds = a.o);
      a.za && (g.preloadedItemId = a.za);
      var t = zf(a.qb),
        J = Af(a.qb);
      0 < t && 0 < J && (g.videoInfo = new Ed(t, J, a.qb.Dc));
      if (a.i)
        b &&
          ((g.media = a.i.media || void 0), (t = a.b.Wc)) &&
          ((g.queueData = Ta(t)), (g.queueData.items = void 0)),
          (g.currentItemId = a.i.itemId);
      else if (
        (a.ra &&
          (b && (g.media = a.ra.media || void 0),
          (g.currentItemId = a.ra.itemId),
          (a.ra = null)),
        n(a.b.a) && (t = a.b.pa()))
      )
        g.loadingItemId = t.itemId;
      "IDLE" == g.playerState
        ? (a.ga && (g.idleReason = a.ga),
          f && (g.extendedStatus = new Gd("LOADING", f)))
        : (a.ga = null);
      void 0 != c && (g.customData = c);
      n(a.b.a) && (d && (g.items = a.b.cc(b)), (g.repeatMode = a.b.L));
      if (a.customizedStatusCallback)
        return (
          (b = function(a) {
            a ? (e.status = [a]) : (e = null);
            return e;
          }),
          (a = a.customizedStatusCallback(g)),
          Pf(a) ? a.then(b) : b(a)
        );
      e.status = [g];
      return e;
    },
    Rf = function(a) {
      null != a.hb && (m.clearTimeout(a.hb), (a.hb = null));
    },
    Sf = function(a) {
      var b = a.g.getCurrentTimeSec();
      a.Oa = b;
      a.Kc = b;
      a.pd = Date.now();
      null != a.Va && m.clearTimeout(a.Va);
      a.Va = Oc(a.Sb, 1e3);
    };
  W.prototype.xd = function() {
    this.Va = Oc(this.Sb, 1e3);
    var a = If(this);
    if ("IDLE" != a && "PAUSED" != a) {
      a = this.Oa;
      this.Oa = this.g.getCurrentTimeSec();
      var b = this.ha;
      this.ha = 100 > 1e3 * (this.Oa - a);
      b != this.ha
        ? (A(
            X,
            y,
            "Buffering state changed, isPlayerBuffering: " +
              this.ha +
              " old time: " +
              a +
              " current time: " +
              this.Oa
          ),
          this.l(!1))
        : this.ha ||
          ((a = 1e3 * (this.Oa - this.Kc) - this.Jb * (Date.now() - this.pd)),
          1e3 < a || -1e3 > a
            ? (A(X, y, "Time drifted: " + a), this.l(!1))
            : this.i &&
              n(this.b.a) &&
              ((a = this.b),
              (a =
                0 > a.j
                  ? null
                  : "REPEAT_SINGLE" == a.L
                    ? a.a[a.j]
                    : a.j + 1 >= a.a.length && (rf(a) || "REPEAT_OFF" == a.L)
                      ? null
                      : a.a[(a.j + 1) % a.a.length]) &&
                p(a.preloadTime) &&
                this.i.media &&
                !this.u &&
                Tf(this, a.preloadTime) &&
                this.za != a.itemId &&
                (this.onPreload
                  ? (Ea(a.itemId),
                    (b = new Uf(a.itemId)),
                    (b.requestId = 0),
                    (b.mediaSessionId = this.ia),
                    (b.autoplay = a.autoplay),
                    (b.currentTime = a.startTime),
                    (b.customData = a.customData || void 0),
                    (b.activeTrackIds = a.activeTrackIds),
                    (b.media = a.media),
                    (b = new Y("preload", b, "")),
                    Ea(a.itemId),
                    (this.za = a.itemId),
                    E(X, "Sending preload event: " + JSON.stringify(b)),
                    this.onPreload(b) && this.l(!1))
                  : E(X, "Not sending preload event"))));
    }
  };
  W.prototype.l = function(a, b, c, d) {
    var e = this;
    if (this.g) {
      A(X, y, "Sending broadcast status message");
      var f = function(a) {
        if (null != a) {
          if (e.onMediaStatus && a.status) e.onMediaStatus(a.status[0] || null);
          a.requestId = b || 0;
          e.W.Rb(a);
          Sf(e);
          Vf(e, a);
        }
      };
      a = Qf(this, a, c, d);
      Pf(a) ? a.then(f) : f(a);
    } else B(X, "Not sending broadcast status message, state is invalid");
  };
  W.prototype.broadcastStatus = W.prototype.l;
  W.prototype.Me = function(a) {
    A(X, y, "Setting IDLE reason: " + a);
    this.ga = a;
  };
  W.prototype.setIdleReason = W.prototype.Me;
  W.prototype.la = function(a, b, c, d, e) {
    E(X, "Sending error message to " + a);
    var f = {};
    f.requestId = b;
    f.type = c;
    d && (f.reason = d);
    e && (f.customData = e);
    this.W.send(a, f);
  };
  W.prototype.sendError = W.prototype.la;
  W.prototype.gd = function(a, b, c, d, e) {
    var f = this;
    if (this.g) {
      A(X, y, "Sending status message to " + a);
      var g = function(c) {
        if (null != c) {
          if (f.onMediaStatus && c.status) f.onMediaStatus(c.status[0] || null);
          c.requestId = b;
          f.W.send(a, c);
          Sf(f);
        }
      };
      c = Qf(this, c, d, e);
      Pf(c) ? c.then(g) : g(c);
    } else
      B(X, "State is invalid"), this.la(a, b, "INVALID_PLAYER_STATE", null, d);
  };
  W.prototype.sendStatus = W.prototype.gd;
  var Vf = function(a, b) {
    if (a.customizedCloudStatusCallback) {
      b = Ua(b);
      b.type = "CLOUD_STATUS";
      try {
        b = a.customizedCloudStatusCallback(b);
      } catch (c) {
        B(X, "Cloud status handler failed. " + c);
        return;
      }
      Pf(b)
        ? b.then(function(b) {
            a.W.send("__cloud__", b);
          })
        : a.W.send("__cloud__", b);
    }
  };
  W.prototype.Cd = function(a) {
    return a;
  };
  var Wf = function(a) {
    a.u = null;
    if (a.bb) for (a.bb = !1; !a.Eb.ec() && !a.bb; ) a.mc(ef(a.Eb));
  };
  W.prototype.load = function(a) {
    a.type = "LOAD";
    Cf(this, this.ua, a);
  };
  W.prototype.load = W.prototype.load;
  W.prototype.Ge = function(a) {
    a.type = "QUEUE_LOAD";
    Cf(this, this.ua, a);
  };
  W.prototype.queueLoad = W.prototype.Ge;
  var Jf = function(a, b, c, d, e) {
    E(X, "Dispatching MediaManager load event");
    E(X, "Load message received:" + JSON.stringify(c));
    var f = !1,
      g = e;
    c.media
      ? c.media.tracks && !Ef(c.media.tracks)
        ? (B(X, "Invalid tracks information"), (f = !0))
        : c.activeTrackIds && !Hf(c.media.tracks, c.activeTrackIds) && (f = !0)
      : (B(X, "Media is mandatory"), (f = !0));
    e = c.playbackRate;
    if (n(e) && (!p(e) || 0.5 > e || 2 < e))
      return (
        B(X, "Bad value for playback rate " + e),
        { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" }
      );
    if (f)
      return g && g(), { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" };
    a.u
      ? a.tc("LOAD_CANCELLED")
      : a.i && (a.Ca("INTERRUPTED", !1), (g = a.l.bind(a, !0)));
    a.u = { senderId: b, message: c };
    g && g();
    a.o = c.activeTrackIds || null;
    a.bb = !0;
    f = function() {
      var d = g;
      a.i = a.b.pa();
      Rf(a);
      a.sa = c;
      if (a.Cb && a.g.Uc) {
        var e = a.b.vc;
        a.g.Uc(
          n(c.autoplay) ? c.autoplay : !0,
          0 < c.currentTime ? c.currentTime : 0 < e ? e : 0,
          a.i.playbackDuration,
          a.i.startTime
        );
      }
      e = new Y("load", c, b);
      a.onLoad && ((a.Jb = c.playbackRate ? c.playbackRate : 1), a.onLoad(e));
      a.f(e);
      d || a.l(!0);
      a.za = null;
    };
    if (
      d &&
      (a.ia++, (a.ga = null), (a.ob = n(c.queueData)), (d = hf(a.b, c)), Pf(d))
    )
      return d.then(f), null;
    f();
    return null;
  };
  W.prototype.Nd = function(a) {
    a = a.data;
    if (a.media && (a.media.contentUrl || a.media.contentId)) {
      var b = n(a.autoplay) ? a.autoplay : !0,
        c = a.media.contentUrl || a.media.contentId;
      a.media.tracks
        ? this.g.load(
            c,
            b,
            a.currentTime,
            {
              tracks: a.media.tracks,
              activeTrackIds: a.activeTrackIds,
              textTrackStyle: a.media.textTrackStyle
            },
            void 0,
            a.playbackRate
          )
        : this.g.load(c, b, a.currentTime, void 0, void 0, a.playbackRate);
    }
  };
  W.prototype.ye = function(a) {
    if (!this.u) return !1;
    a.tracks = a.tracks || void 0;
    if (a.tracks && !Ef(a.tracks))
      return B(X, "Invalid tracks information"), !1;
    if (a.activeTrackIds && !Hf(a.tracks, a.activeTrackIds))
      return B(X, "Invalid active tracks"), !1;
    this.o = a.activeTrackIds || null;
    var b = this.b.pa();
    b &&
      b.media &&
      ((b.media.tracks = a.tracks),
      (b.media.textTrackStyle = a.textTrackStyle || void 0));
    this.g.load("", !1, void 0, a, !0);
    return !0;
  };
  W.prototype.loadTracksInfo = W.prototype.ye;
  W.prototype.ld = function(a) {
    if (a != this.g) {
      this.g &&
        (this.g.unregisterErrorCallback(),
        this.g.unregisterEndedCallback(),
        this.g.unregisterLoadCallback());
      this.g = (this.Cb = a.getState ? !1 : !0) ? new Se(X, a) : a;
      this.g.registerErrorCallback(this.jc.bind(this));
      this.g.registerEndedCallback(this.Hb.bind(this));
      this.g.registerLoadCallback(this.nc.bind(this));
      var b = this.qb;
      b.s && b.s.removeEventListener("resize", b.Zc);
      var c = null;
      a.tagName && "video" == a.tagName.toLowerCase()
        ? (c = a)
        : ((a = document.getElementsByTagName("video")),
          1 == a.length && (c = a[0]));
      b.s = c;
      b.s && b.s.addEventListener("resize", b.Zc);
    }
  };
  W.prototype.setMediaElement = W.prototype.ld;
  W.prototype.nc = function() {
    if (this.u)
      if (
        (E(X, "Metadata loaded"),
        this.i &&
          this.i.media &&
          (this.i.media.duration = this.g.getDurationSec()),
        (this.ha = !0),
        this.onMetadataLoaded)
      )
        this.onMetadataLoaded(this.u);
      else Wf(this);
  };
  W.prototype.Od = function(a) {
    this.Cb &&
      a.message &&
      void 0 != a.message.currentTime &&
      a.message.currentTime != this.g.getCurrentTimeSec() &&
      this.g.seek(a.message.currentTime);
    this.fd();
  };
  W.prototype.jc = function(a) {
    if (this.u)
      if ((B(X, "Load metadata error: " + a), this.onLoadMetadataError))
        this.onLoadMetadataError(this.u);
      else Wf(this);
    else if (this.onError) this.onError(a);
  };
  W.prototype.tc = function(a, b) {
    if (this.u) {
      a = a || "LOAD_FAILED";
      if (this.u.senderId == this.ua) {
        if (this.onLocalRequestError) this.onLocalRequestError({ type: a });
      } else this.la(this.u.senderId, this.u.message.requestId, a, null, b);
      Wf(this);
    } else B(X, "Not sending LOAD error as there is no on going LOAD request");
  };
  W.prototype.sendLoadError = W.prototype.tc;
  W.prototype.fd = function(a) {
    if (this.u) {
      var b = this.u.message.requestId;
      this.l(!0, b, a, 0 != b);
      Wf(this);
    } else B(X, "Not sending status as there is no on going LOAD request");
  };
  W.prototype.sendLoadComplete = W.prototype.fd;
  h = W.prototype;
  h.Hd = function() {
    this.Ca("ERROR");
  };
  h.Md = function() {
    this.u &&
    "" == this.u.senderId &&
    this.u.message &&
    0 == this.u.message.requestId
      ? this.Ca("ERROR", !0)
      : (this.Ca("ERROR", !1), this.tc("LOAD_FAILED"));
  };
  h.Hb = function() {
    if (this.onEnded) this.onEnded();
  };
  h.Gd = function() {
    if (n(this.b.a)) {
      var a = -1 != this.Mb ? this.Mb : void 0;
      this.Mb = -1;
      Xf(
        this,
        "REPEAT_SINGLE" == this.b.L ? 0 : 1,
        !1,
        a,
        void 0,
        void 0,
        void 0,
        "FINISHED"
      );
    }
  };
  h.Sd = function(a, b) {
    this.Ca(a, !0, b);
  };
  var Xf = function(a, b, c, d, e, f, g, t) {
    c = a.xe.bind(a, b, c, d, e, f, g, t);
    (n(a.b.a) && "QUEUE_ENDED" != xf(a.b, b, !1)) || !vf(a.b)
      ? c()
      : pf(a.b, b).then(c, c);
  };
  h = W.prototype;
  h.xe = function(a, b, c, d, e, f, g) {
    g = g || "INTERRUPTED";
    if (n(this.b.a) && "QUEUE_ENDED" != xf(this.b, a, !1)) {
      var t = xf(this.b, a, !0);
      E(X, "After " + a + " jump, transition is: " + t);
      if ((a = Yf(this, this.b.pa(), void 0, f))) {
        if (
          this.i &&
          ((this.o = null),
          (this.ga = g),
          (this.ra = this.i),
          (this.i = null),
          "QUEUE_SHUFFLED" == t && (e = !0),
          "INTERRUPTED" == this.ga)
        )
          this.onAbort();
        Jf(this, "", a, !1, this.l.bind(this, b, c, d, e));
      } else if (this.onQueueEnded) this.onQueueEnded(g, c);
    } else if (this.onQueueEnded) this.onQueueEnded(g, c);
  };
  h.Ld = function(a) {
    A(X, y, "onGetStatus");
    var b = a.data;
    A(X, y, "onGetStatus: " + JSON.stringify(b));
    var c = !0,
      d = !0;
    b.options && (b.options & 1 && (c = !1), b.options & 1 && (d = !1));
    this.gd(a.senderId, a.data.requestId, c, null, d);
  };
  h.Rd = function(a) {
    A(X, y, "onPlay");
    this.g.play();
    this.l(!1, a.data.requestId);
  };
  h.Qd = function(a) {
    A(X, y, "onPlayAgain");
    this.i
      ? (this.g.seek(0), this.g.play(), this.l(!1, a.data.requestId))
      : this.sa &&
        ((this.sa.type = "LOAD"),
        (this.sa.autoplay = !0),
        Cf(this, this.ua, this.sa));
  };
  h.Xd = function(a) {
    a = a.data;
    A(X, y, "onSeek: " + JSON.stringify(a));
    var b = n(a.relativeTime)
      ? this.g.getCurrentTimeSec() + a.relativeTime
      : a.currentTime;
    Ea(b);
    this.g.seek(b, a.resumeState);
    "PAUSED" != this.g.getState() && (this.ha = !0);
    this.g.getCurrentTimeSec() < this.g.getDurationSec()
      ? this.l(!1, a.requestId)
      : (this.Mb = a.requestId);
  };
  h.Yd = function(a) {
    a = a.data;
    A(X, y, "onSetPlaybackRate: " + JSON.stringify(a));
    this.g.md
      ? this.rd(this.g.md(Number(a.playbackRate)))
      : D(X, "setPlaybackRate is not supported");
    this.l(!1, a.requestId);
  };
  h.rd = function(a) {
    this.Jb = a;
  };
  W.prototype.updatePlaybackRate = W.prototype.rd;
  W.prototype.$d = function(a) {
    this.Ca("CANCELLED", !0, a.data.requestId);
  };
  W.prototype.Ca = function(a, b, c, d) {
    var e = this;
    b = !n(b) || b;
    if ((d || c) && !b)
      throw Error(
        "customData and requestId should only be provided in broadcast mode"
      );
    this.i
      ? (this.b.clear(),
        this.g.reset(),
        (this.o = null),
        a && (this.ga = a),
        (this.ra = this.i),
        (this.i = null),
        b && this.l(!1, c, d, void 0))
      : E(X, "Nothing to reset, Media is already null");
    this.sa &&
      (Rf(this),
      (this.hb = Oc(function() {
        e.sa = null;
        e.hb = null;
      }, 9e5)));
    if (a && "INTERRUPTED" == a) this.onAbort();
  };
  W.prototype.resetMediaElement = W.prototype.Ca;
  W.prototype.Pd = function(a) {
    this.g.pause();
    this.l(!1, a.data.requestId);
  };
  W.prototype.Zd = function(a) {
    a = a.data;
    this.g.setVolume(a.volume);
    this.l(!1, a.requestId);
  };
  W.prototype.Fd = function(a) {
    var b = a.data;
    Ff(this.i.media.tracks, b.language)
      ? ((a = {
          activeTrackIds: b.activeTrackIds,
          language: b.language,
          textTrackStyle: b.textTrackStyle
        }),
        this.g.editTracksInfo && (this.o = this.g.editTracksInfo(a)),
        this.l(b.textTrackStyle ? !0 : !1, b.requestId))
      : (B(X, "Invalid track language"),
        this.la(
          a.senderId,
          b.requestId,
          "INVALID_REQUEST",
          "LANGUAGE_NOT_SUPPORTED"
        ));
  };
  W.prototype.Ed = function(a) {
    var b = a.data;
    Gf(this.i.media.tracks, b.language)
      ? (this.g.be && (this.o = this.g.be(b)), this.l(!1, b.requestId))
      : (B(X, "Invalid audio track language"),
        this.la(
          a.senderId,
          b.requestId,
          "INVALID_REQUEST",
          "LANGUAGE_NOT_SUPPORTED"
        ));
  };
  var Mf = function(a) {
      if (2 > a.length) return !0;
      for (var b = 0; b < a.length; b++)
        for (var c = b + 1; c < a.length; c++)
          if (a[b] == a[c])
            return (
              B(X, "Duplicate itemId: " + a[b] + "at positions:" + b + " " + c),
              !1
            );
      return !0;
    },
    Zf = function(a) {
      for (var b = 0; b < a.length; b++) {
        if (!p(a[b].itemId))
          return B(X, "Invalid itemId at position: " + b), !1;
        for (var c = b + 1; c < a.length; c++) {
          if (!p(a[c].itemId))
            return B(X, "Invalid itemId at position: " + c), !1;
          if (a[b].itemId == a[c].itemId)
            return (
              B(
                X,
                "Duplicate itemId: " +
                  a[b].itemId +
                  "at positions:" +
                  b +
                  " " +
                  c
              ),
              !1
            );
        }
      }
      return !0;
    },
    Kf = function(a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = new ff(a[c].itemId);
        d.media = a[c].media;
        d.autoplay = a[c].autoplay;
        d.startTime = a[c].startTime;
        d.playbackDuration = a[c].playbackDuration;
        d.preloadTime = a[c].preloadTime;
        d.activeTrackIds = a[c].activeTrackIds;
        d.customData = a[c].customData;
        b.push(d);
      }
      return b;
    },
    Yf = function(a, b, c, d) {
      if (!b) return null;
      var e = new $f();
      e.requestId = c || 0;
      e.mediaSessionId = a.ia;
      e.type = "LOAD";
      e.autoplay = b.autoplay;
      e.currentTime = n(d) ? d : b.startTime;
      e.activeTrackIds = b.activeTrackIds;
      e.customData = b.customData || void 0;
      e.media = b.media;
      return e;
    },
    Tf = function(a, b) {
      if (a.i.media.duration - a.g.getCurrentTimeSec() <= b) return !0;
      if (null == a.za) return !1;
      a.za = null;
      if (!a.onCancelPreload) return !1;
      b = new Z("CANCEL_PRELOAD");
      b.requestId = 0;
      b.mediaSessionId = a.ia;
      b = new Y("cancelpreload", b, "");
      E(X, "Sending cancel preload event: " + JSON.stringify(b));
      a.onCancelPreload(b) && a.l(!1);
      return !1;
    };
  W.prototype.Ud = function(a) {
    var b = a.data,
      c = Yf(
        this,
        b.items ? b.items[b.startIndex || 0] : null,
        b.requestId,
        b.currentTime
      ),
      d = new wd();
    d.items = b.items;
    d.startIndex = b.startIndex || 0;
    d.startTime = b.currentTime;
    d.repeatMode = b.repeatMode || "REPEAT_OFF";
    c.queueData = d;
    c ? Jf(this, a.senderId, c, !0) : B(X, "Queue Load request is invalid");
  };
  W.prototype.Td = function(a) {
    a = a.data;
    E(X, "Queue insert data: " + JSON.stringify(a));
    var b = !1;
    n(a.currentItemId) && (b = uf(this.b, a.currentItemId));
    n(a.currentItemIndex) && (b = !0);
    var c = this.b,
      d = a.items,
      e = a.insertBefore,
      f = a.currentItemIndex;
    vf(c, "insertItems") || mf(c, d, e, f);
    b
      ? Xf(this, 0, !0, a.requestId, a.customData, !0, a.currentTime)
      : this.l(!0, a.requestId, a.customData, !0);
  };
  var Lf = function(a, b, c) {
    E(X, "Dispatching MediaManager queueUpdate event");
    var d = !1;
    n(a.b.a)
      ? c.items && !Zf(c.items)
        ? (d = !0)
        : c.repeatMode &&
          !Md(c.repeatMode) &&
          (B(X, "Invalid repeatMode"), (d = !0))
      : (B(X, "Queue does not exist"), (d = !0));
    if (d) return { type: "INVALID_REQUEST", reason: "INVALID_PARAMS" };
    if (c.items && 0 < c.items.length) {
      d = a.b;
      for (var e = c.items, f = [], g = 0; g < e.length; g++)
        for (var t = 0; t < d.a.length; t++)
          if (e[g].itemId == d.a[t].itemId) {
            f.push(e[g]);
            break;
          }
      c.items = Kf(f);
    }
    b = new Y("queueupdate", c, b);
    if (a.onQueueUpdate) a.onQueueUpdate(b);
    a.f(b);
    return null;
  };
  h = W.prototype;
  h.Id = function(a) {
    var b = this,
      c = a.data;
    this.b.Ka(c.requestId, c.itemId, c.nextCount, c.prevCount).then(
      function(c) {
        "NO_CHANGE" == c.changeType ? b.W.send(a.senderId, c) : b.W.Rb(c);
      },
      function() {
        Of(
          b,
          { type: "INVALID_REQUEST", reason: "INVALID_COMMAND" },
          a.senderId,
          c.requestId
        );
      }
    );
  };
  h.Jd = function(a) {
    var b = a.data;
    this.W.send(a.senderId, nf(this.b, b.requestId, b.itemIds));
  };
  h.Kd = function(a) {
    this.W.send(a.senderId, of(this.b, a.data.requestId));
  };
  h.yc = function(a) {
    var b = a.data;
    if (this.ob) {
      E(X, "Queue update data: " + JSON.stringify(b));
      var c = !1;
      a = !1;
      p(b.currentItemId) && (a = uf(this.b, b.currentItemId));
      p(b.jump) && (a = !0);
      b.repeatMode && (this.b.L = b.repeatMode);
      if (b.items && 0 < b.items.length) {
        c = this.b;
        for (var d = b.items, e = 0; e < d.length; e++)
          for (var f = 0; f < c.a.length; f++)
            d[e].itemId == c.a[f].itemId && (c.a[f] = d[e]);
        c = !0;
      }
      b.shuffle && (wf(this.b), (a = !0));
      a
        ? Xf(this, b.jump || 0, c, b.requestId, b.customData, c, b.currentTime)
        : this.l(c, b.requestId, b.customData, c);
    } else
      (a = a.senderId),
        "__inject__" == a && this.onQueueUpdate == this.yc
          ? this.la(a, b.requestId, "INVALID_REQUEST", "INVALID_COMMAND")
          : (E(X, "QUEUE_UPDATE request ignored"), this.l(!1, b.requestId));
  };
  h.Vd = function(a) {
    a = a.data;
    E(X, "Queue remove data: " + JSON.stringify(a));
    var b = !1;
    p(a.currentItemId) && (b = uf(this.b, a.currentItemId));
    if (a.itemIds && 0 != a.itemIds.length) {
      if (!b) {
        b = this.b;
        var c = a.itemIds;
        if (vf(b, "removeItems")) b = !1;
        else {
          for (var d = !1, e = 0; e < c.length; e++)
            for (var f = 0; f < b.a.length; f++)
              if (c[e] == b.a[f].itemId) {
                b.a.splice(f, 1);
                b.j == f ? (d = !0) : b.j > f && b.j--;
                break;
              }
          b.j >= b.a.length &&
            ((b.j = sf(b) ? 0 : -1), rf(b) && 0 == b.j && wf(b));
          b = d;
        }
      }
      b
        ? Xf(this, 0, !1, a.requestId, a.customData, !0, a.currentTime)
        : this.l(!1, a.requestId, a.customData, !0);
    } else B(X, "No itemIds to remove");
  };
  h.Wd = function(a) {
    a = a.data;
    E(X, "Queue reorder data: " + JSON.stringify(a));
    var b = !1,
      c = !1;
    p(a.currentItemId) && (c = uf(this.b, a.currentItemId));
    if (a.itemIds && 0 < a.itemIds.length) {
      b = this.b;
      var d = a.itemIds,
        e = a.insertBefore;
      if (!vf(b, "reorderItems") && d && 0 != d.length) {
        var f = b.a[b.j].itemId,
          g = n(e) ? e : -1;
        e = b.a.length - d.length;
        for (var t = [], J = -1 == g ? !0 : !1, C = 0; C < b.a.length; C++)
          0 <= Ga(d, b.a[C].itemId)
            ? J || b.a[C].itemId != d[0] || (e = t.length)
            : (t.push(b.a[C]),
              g == b.a[C].itemId && ((e = t.length - 1), (J = !0)));
        g = [];
        for (J = 0; J < d.length; J++) {
          a: {
            for (C = 0; C < b.a.length; C++)
              if (d[J] == b.a[C].itemId) {
                C = b.a[C];
                break a;
              }
            C = null;
          }
          g.push(C);
        }
        ra(La, t, e, 0).apply(null, g);
        b.a = t;
        n(f) && uf(b, f);
      }
      b = !0;
    }
    c
      ? Xf(this, 0, !1, a.requestId, a.customData, b, a.currentTime)
      : this.l(!1, a.requestId, a.customData, b);
  };
  h.addEventListener = function(a, b) {
    H(this.h, a, b);
  };
  W.prototype.addEventListener = W.prototype.addEventListener;
  W.prototype.removeEventListener = function(a, b) {
    I(this.h, a, b);
  };
  W.prototype.removeEventListener = W.prototype.removeEventListener;
  W.prototype.f = function(a) {
    a.target = this;
    return fc(this.h, a);
  };
  W.prototype.dispatchEvent = function(a) {
    return this.f(a);
  };
  W.prototype.dispatchEvent = W.prototype.dispatchEvent;
  var Pf = function(a) {
      return !!a && oa(a) && "function" === typeof a.then;
    },
    X = z("cast.receiver.MediaManager");
  W.EventType = {
    LOAD: "load",
    STOP: "stop",
    PAUSE: "pause",
    PLAY: "play",
    PLAY_AGAIN: "playagain",
    SEEK: "seek",
    SET_PLAYBACK_RATE: "setplaybackrate",
    SET_VOLUME: "setvolume",
    GET_STATUS: "getstatus",
    EDIT_TRACKS_INFO: "edittracksinfo",
    EDIT_AUDIO_TRACKS: "editaudiotracks",
    QUEUE_LOAD: "queueload",
    QUEUE_INSERT: "queueinsert",
    QUEUE_UPDATE: "queueupdate",
    QUEUE_REMOVE: "queueremove",
    QUEUE_REORDER: "queuereorder",
    PRECACHE: "precache",
    PRELOAD: "preload",
    CANCEL_PRELOAD: "cancelpreload",
    FETCH_ITEMS: "fetchitems",
    GET_ITEMS_INFO: "getitemsinfo",
    GET_QUEUE_IDS: "getqueueids"
  };
  var Y = function(a, b, c) {
    G.call(this, a);
    this.data = b;
    this.senderId = c;
  };
  k(Y, G);
  W.Event = Y;
  var Z = function(a) {
    this.type = a;
    this.requestId = 0;
    this.customData = this.mediaSessionId = void 0;
  };
  W.RequestData = Z;
  var $f = function() {
    Z.call(this, "LOAD");
    this.media = new vd();
    this.autoplay = !1;
    this.currentTime = 0;
    this.playbackRate = 1;
    this.credentialsType = this.credentials = this.queueData = this.activeTrackIds = void 0;
  };
  k($f, Z);
  W.LoadRequestData = $f;
  var Uf = function(a) {
    $f.call(this);
    this.type = "PRELOAD";
    this.itemId = a;
  };
  k(Uf, $f);
  W.PreloadRequestData = Uf;
  var ag = function(a) {
    Z.call(this, "PRECACHE");
    this.data = a;
  };
  k(ag, Z);
  W.PrecacheRequestData = ag;
  var bg = function() {
    Z.call(this, "SET_VOLUME");
    this.volume = new Dd();
  };
  k(bg, Z);
  W.VolumeRequestData = bg;
  var cg = function() {
    Z.call(this, "EDIT_TRACKS_INFO");
    this.isSuggestedLanguage = this.textTrackStyle = this.language = this.activeTrackIds = void 0;
  };
  k(cg, Z);
  W.EditTracksInfoData = cg;
  var dg = function() {
    Z.call(this, "EDIT_AUDIO_TRACKS");
    this.isSuggestedLanguage = this.language = void 0;
  };
  k(dg, Z);
  W.EditAudioTracksData = dg;
  var eg = function() {
    Z.call(this, "SEEK");
    this.resumeState = void 0;
    this.currentTime = 0;
    this.relativeTime = void 0;
  };
  k(eg, Z);
  W.SeekRequestData = eg;
  var fg = function() {
    Z.call(this, "SET_PLAYBACK_RATE");
    this.playbackRate = 1;
  };
  k(fg, Z);
  W.SetPlaybackRateRequestData = fg;
  var gg = function() {
    Z.call(this, "GET_STATUS");
    this.options = void 0;
  };
  k(gg, Z);
  W.GetStatusRequestData = gg;
  var hg = function(a) {
    Z.call(this, "QUEUE_LOAD");
    this.repeatMode = void 0;
    this.items = a;
    this.currentTime = this.startIndex = void 0;
  };
  k(hg, Z);
  W.QueueLoadRequestData = hg;
  var Bf = function(a) {
    Z.call(this, "QUEUE_INSERT");
    this.currentTime = this.currentItemId = this.currentItemIndex = this.insertBefore = void 0;
    this.items = a;
  };
  k(Bf, Z);
  W.QueueInsertRequestData = Bf;
  var Nf = function() {
    Z.call(this, "QUEUE_UPDATE");
    this.shuffle = this.repeatMode = this.items = this.jump = this.currentTime = this.currentItemId = void 0;
  };
  k(Nf, Z);
  W.QueueUpdateRequestData = Nf;
  var Df = function(a) {
    Z.call(this, "QUEUE_REMOVE");
    this.currentTime = this.currentItemId = void 0;
    this.itemIds = a;
  };
  k(Df, Z);
  W.QueueRemoveRequestData = Df;
  var ig = function(a) {
    Z.call(this, "QUEUE_REORDER");
    this.insertBefore = this.currentTime = this.currentItemId = void 0;
    this.itemIds = a;
  };
  k(ig, Z);
  W.QueueReorderRequestData = ig;
  W.LoadInfo = function(a, b) {
    this.message = a;
    this.senderId = b;
  };
  var jg = function(a, b, c) {
    Z.call(this, "FETCH_ITEMS");
    this.itemId = a;
    this.nextCount = b;
    this.prevCount = c;
  };
  k(jg, Z);
  W.FetchItemsRequestData = jg;
  var kg = function(a) {
    Z.call(this, "GET_ITEMS_INFO");
    this.itemIds = a;
  };
  k(kg, Z);
  W.GetItemsInfoRequestData = kg;
  var lg = function(a) {
    this.yd = a.La("urn:x-cast:com.google.cast.debugoverlay", "JSON");
    this.yd.onMessage = this.F.bind(this);
    this.Y = this.s = this.vb = this.Xa = null;
    this.ja = [];
    this.ka = [];
  };
  lg.prototype.F = function(a) {
    E(mg, "DebugOverlay: " + JSON.stringify(a.data));
    switch (a.data.type) {
      case "SHOW":
        ng(this);
        break;
      case "HIDE":
        og(this);
    }
  };
  var ng = function(a) {
      a.s ||
        a.Y ||
        ((a.ja.length = 0),
        (a.ka.length = 0),
        a.dd(),
        a.s || (a.Y = window.setInterval(a.dd.bind(a), 1e3)));
    },
    og = function(a) {
      if (a.s || a.Y)
        a.Xa && (document.body.removeChild(a.Xa.parentElement), (a.Xa = null)),
          a.vb && (window.clearInterval(a.vb), (a.vb = null)),
          a.s && (I(a.s, "seeking", a.Tc, !1, a), (a.s = null)),
          a.Y && (window.clearInterval(a.Y), (a.Y = null));
    },
    pg = function(a, b) {
      E(mg, "found active video");
      a.s = b;
      b = document.createElement("div");
      b.style.cssText =
        "position:absolute;top:0;left:0;width:100%;height:100%;z-index:9001;-webkit-text-fill-color:black;-webkit-text-stroke-color:red;-webkit-text-stroke-width:1px;padding-left:5vw;padding-top:5vh;margin:0;font-size:24pt";
      var c = document.createTextNode("");
      b.appendChild(c);
      b.id = "__CAST_DEBUG_OVERLAY__";
      document.body.appendChild(b);
      a.Xa = c;
      a.Rc();
      a.vb = window.setInterval(a.Rc.bind(a), 1e3);
      H(a.s, "seeking", a.Tc, !1, a);
      a.Y && (window.clearInterval(a.Y), (a.Y = null));
    };
  lg.prototype.Rc = function() {
    var a = this.s;
    if (a && a.src && !a.error && !a.ended && 1 <= a.readyState) {
      var b = a.videoWidth,
        c = a.videoHeight;
      if (0 >= b || 0 >= c)
        Db(mg, "canceling draw because video not initialized");
      else {
        var d = 0;
        if (a.paused || a.seeking)
          Db(mg, "not calculating fps because paused or seeking");
        else {
          d = a.webkitDecodedFrameCount;
          a = a.currentTime;
          var e = 0;
          if (0 < this.ja.length && 0 < this.ka.length) {
            var f = this.ja[0],
              g = this.ka[0];
            a > f && d > g && (e = (d - g) / (a - f));
          }
          this.ja.push(a);
          this.ka.push(d);
          5 <= this.ja.length &&
            5 <= this.ka.length &&
            (this.ja.splice(0, this.ja.length - 5),
            this.ka.splice(0, this.ka.length - 5));
          d = e;
        }
        b = b + "x" + c + "(" + (0 < d ? Math.round(d).toString() : "?") + ")";
        Db(mg, "video is " + b);
        this.Xa.textContent = b;
      }
    } else if (
      (Db(mg, "video is no longer active, restarting search procedure"),
      this.s || this.Y)
    )
      og(this), ng(this);
  };
  lg.prototype.Tc = function() {
    E(mg, "onSeeking");
    this.ja = [this.s.currentTime];
    this.ka = [this.s.webkitDecodedFrameCount];
  };
  lg.prototype.dd = function() {
    var a = function(b) {
        for (
          var c = l(b.document.getElementsByTagName("video")), e = c.next();
          !e.done;
          e = c.next()
        )
          if (
            ((e = e.value), e.src && !e.error && !e.ended && 1 <= e.readyState)
          )
            return e;
        for (c = 0; c < b.frames.length; ++c)
          try {
            var f = a(b.frames[c]);
            if (f) return f;
          } catch (g) {}
        return null;
      },
      b = a(window);
    b && pg(this, b);
  };
  var mg = z("cast.receiver.DebugOverlay");
  Ud = function(a) {
    new lg(a);
  };
}.call(window));

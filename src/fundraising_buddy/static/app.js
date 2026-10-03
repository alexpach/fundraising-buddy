function Aw(a, s) {
  for (var l = 0; l < s.length; l++) {
    const r = s[l];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const u in r)
        if (u !== "default" && !(u in a)) {
          const h = Object.getOwnPropertyDescriptor(r, u);
          h && Object.defineProperty(a, u, h.get ? h : {
            enumerable: !0,
            get: () => r[u]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(a, Symbol.toStringTag, { value: "Module" }));
}
function Mw(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Nd = { exports: {} }, tr = {};
var Ty;
function Nw() {
  if (Ty) return tr;
  Ty = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), s = /* @__PURE__ */ Symbol.for("react.fragment");
  function l(r, u, h) {
    var f = null;
    if (h !== void 0 && (f = "" + h), u.key !== void 0 && (f = "" + u.key), "key" in u) {
      h = {};
      for (var p in u)
        p !== "key" && (h[p] = u[p]);
    } else h = u;
    return u = h.ref, {
      $$typeof: a,
      type: r,
      key: f,
      ref: u !== void 0 ? u : null,
      props: h
    };
  }
  return tr.Fragment = s, tr.jsx = l, tr.jsxs = l, tr;
}
var Cy;
function kw() {
  return Cy || (Cy = 1, Nd.exports = Nw()), Nd.exports;
}
var d = kw(), kd = { exports: {} }, De = {};
var Ey;
function Dw() {
  if (Ey) return De;
  Ey = 1;
  var a = /* @__PURE__ */ Symbol.for("react.transitional.element"), s = /* @__PURE__ */ Symbol.for("react.portal"), l = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), u = /* @__PURE__ */ Symbol.for("react.profiler"), h = /* @__PURE__ */ Symbol.for("react.consumer"), f = /* @__PURE__ */ Symbol.for("react.context"), p = /* @__PURE__ */ Symbol.for("react.forward_ref"), y = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), x = /* @__PURE__ */ Symbol.for("react.lazy"), g = /* @__PURE__ */ Symbol.for("react.activity"), S = /* @__PURE__ */ Symbol.for("react.view_transition"), E = Symbol.iterator;
  function j(T) {
    return T === null || typeof T != "object" ? null : (T = E && T[E] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var V = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, M = Object.assign, q = {};
  function L(T, H, ae) {
    this.props = T, this.context = H, this.refs = q, this.updater = ae || V;
  }
  L.prototype.isReactComponent = {}, L.prototype.setState = function(T, H) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, H, "setState");
  }, L.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function K() {
  }
  K.prototype = L.prototype;
  function X(T, H, ae) {
    this.props = T, this.context = H, this.refs = q, this.updater = ae || V;
  }
  var ee = X.prototype = new K();
  ee.constructor = X, M(ee, L.prototype), ee.isPureReactComponent = !0;
  var oe = Array.isArray;
  function Q() {
  }
  var D = { H: null, A: null, T: null, S: null }, W = Object.prototype.hasOwnProperty;
  function te(T, H, ae) {
    var me = ae.ref;
    return {
      $$typeof: a,
      type: T,
      key: H,
      ref: me !== void 0 ? me : null,
      props: ae
    };
  }
  function Ae(T, H) {
    return te(T.type, H, T.props);
  }
  function Ce(T) {
    return typeof T == "object" && T !== null && T.$$typeof === a;
  }
  function Te(T) {
    var H = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(ae) {
      return H[ae];
    });
  }
  var Ee = /\/+/g;
  function ce(T, H) {
    return typeof T == "object" && T !== null && T.key != null ? Te("" + T.key) : H.toString(36);
  }
  function Z(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(Q, Q) : (T.status = "pending", T.then(
          function(H) {
            T.status === "pending" && (T.status = "fulfilled", T.value = H);
          },
          function(H) {
            T.status === "pending" && (T.status = "rejected", T.reason = H);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function $(T, H, ae, me, Ne) {
    var xe = typeof T;
    (xe === "undefined" || xe === "boolean") && (T = null);
    var Me = !1;
    if (T === null) Me = !0;
    else
      switch (xe) {
        case "bigint":
        case "string":
        case "number":
          Me = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case a:
            case s:
              Me = !0;
              break;
            case x:
              return Me = T._init, $(
                Me(T._payload),
                H,
                ae,
                me,
                Ne
              );
          }
      }
    if (Me)
      return Ne = Ne(T), Me = me === "" ? "." + ce(T, 0) : me, oe(Ne) ? (ae = "", Me != null && (ae = Me.replace(Ee, "$&/") + "/"), $(Ne, H, ae, "", function(Tt) {
        return Tt;
      })) : Ne != null && (Ce(Ne) && (Ne = Ae(
        Ne,
        ae + (Ne.key == null || T && T.key === Ne.key ? "" : ("" + Ne.key).replace(
          Ee,
          "$&/"
        ) + "/") + Me
      )), H.push(Ne)), 1;
    Me = 0;
    var le = me === "" ? "." : me + ":";
    if (oe(T))
      for (var Se = 0; Se < T.length; Se++)
        me = T[Se], xe = le + ce(me, Se), Me += $(
          me,
          H,
          ae,
          xe,
          Ne
        );
    else if (Se = j(T), typeof Se == "function")
      for (T = Se.call(T), Se = 0; !(me = T.next()).done; )
        me = me.value, xe = le + ce(me, Se++), Me += $(
          me,
          H,
          ae,
          xe,
          Ne
        );
    else if (xe === "object") {
      if (typeof T.then == "function")
        return $(
          Z(T),
          H,
          ae,
          me,
          Ne
        );
      throw H = String(T), Error(
        "Objects are not valid as a React child (found: " + (H === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : H) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Me;
  }
  function ne(T, H, ae) {
    if (T == null) return T;
    var me = [], Ne = 0;
    return $(T, me, "", "", function(xe) {
      return H.call(ae, xe, Ne++);
    }), me;
  }
  function he(T) {
    if (T._status === -1) {
      var H = T._result, ae = H();
      ae.then(
        function(me) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = me, ae.status === void 0 && (ae.status = "fulfilled", ae.value = me));
        },
        function(me) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = me, ae.status === void 0 && (ae.status = "rejected", ae.reason = me));
        }
      ), T._status === -1 && (T._status = 0, T._result = ae);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var P = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var H = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(H)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function Ye(T) {
    var H = D.T, ae = {};
    ae.types = H !== null ? H.types : null, D.T = ae;
    try {
      var me = T(), Ne = D.S;
      Ne !== null && Ne(ae, me), typeof me == "object" && me !== null && typeof me.then == "function" && me.then(Q, P);
    } catch (xe) {
      P(xe);
    } finally {
      H !== null && ae.types !== null && (H.types = ae.types), D.T = H;
    }
  }
  function ut(T) {
    var H = D.T;
    if (H !== null) {
      var ae = H.types;
      ae === null ? H.types = [T] : ae.indexOf(T) === -1 && ae.push(T);
    } else Ye(ut.bind(null, T));
  }
  var ke = {
    map: ne,
    forEach: function(T, H, ae) {
      ne(
        T,
        function() {
          H.apply(this, arguments);
        },
        ae
      );
    },
    count: function(T) {
      var H = 0;
      return ne(T, function() {
        H++;
      }), H;
    },
    toArray: function(T) {
      return ne(T, function(H) {
        return H;
      }) || [];
    },
    only: function(T) {
      if (!Ce(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return De.Activity = g, De.Children = ke, De.Component = L, De.Fragment = l, De.Profiler = u, De.PureComponent = X, De.StrictMode = r, De.Suspense = y, De.ViewTransition = S, De.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D, De.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return D.H.useMemoCache(T);
    }
  }, De.addTransitionType = ut, De.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, De.cacheSignal = function() {
    return null;
  }, De.cloneElement = function(T, H, ae) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var me = M({}, T.props), Ne = T.key;
    if (H != null)
      for (xe in H.key !== void 0 && (Ne = "" + H.key), H)
        !W.call(H, xe) || xe === "key" || xe === "__self" || xe === "__source" || xe === "ref" && H.ref === void 0 || (me[xe] = H[xe]);
    var xe = arguments.length - 2;
    if (xe === 1) me.children = ae;
    else if (1 < xe) {
      for (var Me = Array(xe), le = 0; le < xe; le++)
        Me[le] = arguments[le + 2];
      me.children = Me;
    }
    return te(T.type, Ne, me);
  }, De.createContext = function(T) {
    return T = {
      $$typeof: f,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: h,
      _context: T
    }, T;
  }, De.createElement = function(T, H, ae) {
    var me, Ne = {}, xe = null;
    if (H != null)
      for (me in H.key !== void 0 && (xe = "" + H.key), H)
        W.call(H, me) && me !== "key" && me !== "__self" && me !== "__source" && (Ne[me] = H[me]);
    var Me = arguments.length - 2;
    if (Me === 1) Ne.children = ae;
    else if (1 < Me) {
      for (var le = Array(Me), Se = 0; Se < Me; Se++)
        le[Se] = arguments[Se + 2];
      Ne.children = le;
    }
    if (T && T.defaultProps)
      for (me in Me = T.defaultProps, Me)
        Ne[me] === void 0 && (Ne[me] = Me[me]);
    return te(T, xe, Ne);
  }, De.createRef = function() {
    return { current: null };
  }, De.forwardRef = function(T) {
    return { $$typeof: p, render: T };
  }, De.isValidElement = Ce, De.lazy = function(T) {
    return {
      $$typeof: x,
      _payload: { _status: -1, _result: T },
      _init: he
    };
  }, De.memo = function(T, H) {
    return {
      $$typeof: v,
      type: T,
      compare: H === void 0 ? null : H
    };
  }, De.startTransition = Ye, De.unstable_useCacheRefresh = function() {
    return D.H.useCacheRefresh();
  }, De.use = function(T) {
    return D.H.use(T);
  }, De.useActionState = function(T, H, ae) {
    return D.H.useActionState(T, H, ae);
  }, De.useCallback = function(T, H) {
    return D.H.useCallback(T, H);
  }, De.useContext = function(T) {
    return D.H.useContext(T);
  }, De.useDebugValue = function() {
  }, De.useDeferredValue = function(T, H) {
    return D.H.useDeferredValue(T, H);
  }, De.useEffect = function(T, H) {
    return D.H.useEffect(T, H);
  }, De.useEffectEvent = function(T) {
    return D.H.useEffectEvent(T);
  }, De.useId = function() {
    return D.H.useId();
  }, De.useImperativeHandle = function(T, H, ae) {
    return D.H.useImperativeHandle(T, H, ae);
  }, De.useInsertionEffect = function(T, H) {
    return D.H.useInsertionEffect(T, H);
  }, De.useLayoutEffect = function(T, H) {
    return D.H.useLayoutEffect(T, H);
  }, De.useMemo = function(T, H) {
    return D.H.useMemo(T, H);
  }, De.useOptimistic = function(T, H) {
    return D.H.useOptimistic(T, H);
  }, De.useReducer = function(T, H, ae) {
    return D.H.useReducer(T, H, ae);
  }, De.useRef = function(T) {
    return D.H.useRef(T);
  }, De.useState = function(T) {
    return D.H.useState(T);
  }, De.useSyncExternalStore = function(T, H, ae) {
    return D.H.useSyncExternalStore(
      T,
      H,
      ae
    );
  }, De.useTransition = function() {
    return D.H.useTransition();
  }, De.version = "19.3.0", De;
}
var jy;
function Oh() {
  return jy || (jy = 1, kd.exports = Dw()), kd.exports;
}
var C = Oh();
const Rw = /* @__PURE__ */ Mw(C), _w = /* @__PURE__ */ Aw({
  __proto__: null,
  default: Rw
}, [C]);
var Dd = { exports: {} }, nr = {}, Rd = { exports: {} }, _d = {};
var Ay;
function zw() {
  return Ay || (Ay = 1, (function(a) {
    function s(Z, $) {
      var ne = Z.length;
      Z.push($);
      e: for (; 0 < ne; ) {
        var he = ne - 1 >>> 1, P = Z[he];
        if (0 < u(P, $))
          Z[he] = $, Z[ne] = P, ne = he;
        else break e;
      }
    }
    function l(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function r(Z) {
      if (Z.length === 0) return null;
      var $ = Z[0], ne = Z.pop();
      if (ne !== $) {
        Z[0] = ne;
        e: for (var he = 0, P = Z.length, Ye = P >>> 1; he < Ye; ) {
          var ut = 2 * (he + 1) - 1, ke = Z[ut], T = ut + 1, H = Z[T];
          if (0 > u(ke, ne))
            T < P && 0 > u(H, ke) ? (Z[he] = H, Z[T] = ne, he = T) : (Z[he] = ke, Z[ut] = ne, he = ut);
          else if (T < P && 0 > u(H, ne))
            Z[he] = H, Z[T] = ne, he = T;
          else break e;
        }
      }
      return $;
    }
    function u(Z, $) {
      var ne = Z.sortIndex - $.sortIndex;
      return ne !== 0 ? ne : Z.id - $.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var h = performance;
      a.unstable_now = function() {
        return h.now();
      };
    } else {
      var f = Date, p = f.now();
      a.unstable_now = function() {
        return f.now() - p;
      };
    }
    var y = [], v = [], x = 1, g = null, S = 3, E = !1, j = !1, V = !1, M = !1, q = typeof setTimeout == "function" ? setTimeout : null, L = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function X(Z) {
      for (var $ = l(v); $ !== null; ) {
        if ($.callback === null) r(v);
        else if ($.startTime <= Z)
          r(v), $.sortIndex = $.expirationTime, s(y, $);
        else break;
        $ = l(v);
      }
    }
    function ee(Z) {
      if (V = !1, X(Z), !j)
        if (l(y) !== null)
          j = !0, oe || (oe = !0, Ce());
        else {
          var $ = l(v);
          $ !== null && ce(ee, $.startTime - Z);
        }
    }
    var oe = !1, Q = -1, D = 5, W = -1;
    function te() {
      return M ? !0 : !(a.unstable_now() - W < D);
    }
    function Ae() {
      if (M = !1, oe) {
        var Z = a.unstable_now();
        W = Z;
        var $ = !0;
        try {
          e: {
            j = !1, V && (V = !1, L(Q), Q = -1), E = !0;
            var ne = S;
            try {
              t: {
                for (X(Z), g = l(y); g !== null && !(g.expirationTime > Z && te()); ) {
                  var he = g.callback;
                  if (typeof he == "function") {
                    g.callback = null, S = g.priorityLevel;
                    var P = he(
                      g.expirationTime <= Z
                    );
                    if (Z = a.unstable_now(), typeof P == "function") {
                      g.callback = P, X(Z), $ = !0;
                      break t;
                    }
                    g === l(y) && r(y), X(Z);
                  } else r(y);
                  g = l(y);
                }
                if (g !== null) $ = !0;
                else {
                  var Ye = l(v);
                  Ye !== null && ce(
                    ee,
                    Ye.startTime - Z
                  ), $ = !1;
                }
              }
              break e;
            } finally {
              g = null, S = ne, E = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? Ce() : oe = !1;
        }
      }
    }
    var Ce;
    if (typeof K == "function")
      Ce = function() {
        K(Ae);
      };
    else if (typeof MessageChannel < "u") {
      var Te = new MessageChannel(), Ee = Te.port2;
      Te.port1.onmessage = Ae, Ce = function() {
        Ee.postMessage(null);
      };
    } else
      Ce = function() {
        q(Ae, 0);
      };
    function ce(Z, $) {
      Q = q(function() {
        Z(a.unstable_now());
      }, $);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, a.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, a.unstable_next = function(Z) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = S;
      }
      var ne = S;
      S = $;
      try {
        return Z();
      } finally {
        S = ne;
      }
    }, a.unstable_requestPaint = function() {
      M = !0;
    }, a.unstable_runWithPriority = function(Z, $) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var ne = S;
      S = Z;
      try {
        return $();
      } finally {
        S = ne;
      }
    }, a.unstable_scheduleCallback = function(Z, $, ne) {
      var he = a.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? he + ne : he) : ne = he, Z) {
        case 1:
          var P = -1;
          break;
        case 2:
          P = 250;
          break;
        case 5:
          P = 1073741823;
          break;
        case 4:
          P = 1e4;
          break;
        default:
          P = 5e3;
      }
      return P = ne + P, Z = {
        id: x++,
        callback: $,
        priorityLevel: Z,
        startTime: ne,
        expirationTime: P,
        sortIndex: -1
      }, ne > he ? (Z.sortIndex = ne, s(v, Z), l(y) === null && Z === l(v) && (V ? (L(Q), Q = -1) : V = !0, ce(ee, ne - he))) : (Z.sortIndex = P, s(y, Z), j || E || (j = !0, oe || (oe = !0, Ce()))), Z;
    }, a.unstable_shouldYield = te, a.unstable_wrapCallback = function(Z) {
      var $ = S;
      return function() {
        var ne = S;
        S = $;
        try {
          return Z.apply(this, arguments);
        } finally {
          S = ne;
        }
      };
    };
  })(_d)), _d;
}
var My;
function Ow() {
  return My || (My = 1, Rd.exports = zw()), Rd.exports;
}
var zd = { exports: {} }, Gt = {};
var Ny;
function Uw() {
  if (Ny) return Gt;
  Ny = 1;
  var a = Oh();
  function s(x) {
    var g = "https://react.dev/errors/" + x;
    if (1 < arguments.length) {
      g += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        g += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + x + "; visit " + g + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var r = {
    d: {
      f: l,
      r: function() {
        throw Error(s(522));
      },
      D: l,
      C: l,
      L: l,
      m: l,
      X: l,
      S: l,
      M: l
    },
    p: 0,
    findDOMNode: null
  }, u = /* @__PURE__ */ Symbol.for("react.portal"), h = /* @__PURE__ */ Symbol.for("react.recoverable"), f = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function p(x, g, S) {
    var E = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: u,
      key: E == null ? null : E === f ? f : "" + E,
      children: x,
      containerInfo: g,
      implementation: S
    };
  }
  var y = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(x, g) {
    if (x === "font") return "";
    if (typeof g == "string")
      return g === "use-credentials" ? g : "";
  }
  return Gt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Gt.browser = function(x) {
    return { $$typeof: h, _reason: x };
  }, Gt.createPortal = function(x, g) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!g || g.nodeType !== 1 && g.nodeType !== 9 && g.nodeType !== 11)
      throw Error(s(299));
    return p(x, g, null, S);
  }, Gt.flushSync = function(x) {
    var g = y.T, S = r.p;
    try {
      if (y.T = null, r.p = 2, x) return x();
    } finally {
      y.T = g, r.p = S, r.d.f();
    }
  }, Gt.preconnect = function(x, g) {
    typeof x == "string" && (g ? (g = g.crossOrigin, g = typeof g == "string" ? g === "use-credentials" ? g : "" : void 0) : g = null, r.d.C(x, g));
  }, Gt.prefetchDNS = function(x) {
    typeof x == "string" && r.d.D(x);
  }, Gt.preinit = function(x, g) {
    if (typeof x == "string" && g && typeof g.as == "string") {
      var S = g.as, E = v(S, g.crossOrigin), j = typeof g.integrity == "string" ? g.integrity : void 0, V = typeof g.fetchPriority == "string" ? g.fetchPriority : void 0;
      S === "style" ? r.d.S(
        x,
        typeof g.precedence == "string" ? g.precedence : void 0,
        {
          crossOrigin: E,
          integrity: j,
          fetchPriority: V
        }
      ) : S === "script" && r.d.X(x, {
        crossOrigin: E,
        integrity: j,
        fetchPriority: V,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0
      });
    }
  }, Gt.preinitModule = function(x, g) {
    if (typeof x == "string")
      if (typeof g == "object" && g !== null) {
        if (g.as == null || g.as === "script") {
          var S = v(
            g.as,
            g.crossOrigin
          );
          r.d.M(x, {
            crossOrigin: S,
            integrity: typeof g.integrity == "string" ? g.integrity : void 0,
            nonce: typeof g.nonce == "string" ? g.nonce : void 0,
            fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
          });
        }
      } else g == null && r.d.M(x);
  }, Gt.preload = function(x, g) {
    if (typeof x == "string" && typeof g == "object" && g !== null && typeof g.as == "string") {
      var S = g.as, E = v(S, g.crossOrigin);
      r.d.L(x, S, {
        crossOrigin: E,
        integrity: typeof g.integrity == "string" ? g.integrity : void 0,
        nonce: typeof g.nonce == "string" ? g.nonce : void 0,
        type: typeof g.type == "string" ? g.type : void 0,
        fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0,
        referrerPolicy: typeof g.referrerPolicy == "string" ? g.referrerPolicy : void 0,
        imageSrcSet: typeof g.imageSrcSet == "string" ? g.imageSrcSet : void 0,
        imageSizes: typeof g.imageSizes == "string" ? g.imageSizes : void 0,
        media: typeof g.media == "string" ? g.media : void 0
      });
    }
  }, Gt.preloadModule = function(x, g) {
    if (typeof x == "string")
      if (g) {
        var S = v(g.as, g.crossOrigin);
        r.d.m(x, {
          as: typeof g.as == "string" && g.as !== "script" ? g.as : void 0,
          crossOrigin: S,
          integrity: typeof g.integrity == "string" ? g.integrity : void 0,
          nonce: typeof g.nonce == "string" ? g.nonce : void 0,
          fetchPriority: typeof g.fetchPriority == "string" ? g.fetchPriority : void 0
        });
      } else r.d.m(x);
  }, Gt.requestFormReset = function(x) {
    r.d.r(x);
  }, Gt.unstable_batchedUpdates = function(x, g) {
    return x(g);
  }, Gt.useFormState = function(x, g, S) {
    return y.H.useFormState(x, g, S);
  }, Gt.useFormStatus = function() {
    return y.H.useHostTransitionStatus();
  }, Gt.version = "19.3.0", Gt;
}
var ky;
function Vw() {
  if (ky) return zd.exports;
  ky = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return a(), zd.exports = Uw(), zd.exports;
}
var Dy;
function Lw() {
  if (Dy) return nr;
  Dy = 1;
  var a = Ow(), s = Oh(), l = Vw();
  function r(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        t += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u(e) {
    return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
  }
  function h(e) {
    for (var t = e, n = t; n && !n.alternate; )
      t = n, (t.flags & 4098) !== 0 && (e = t.return), n = t.return;
    for (; t.return; ) t = t.return;
    return t.tag === 3 ? e : null;
  }
  function f(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function p(e) {
    if (e.tag === 31) {
      var t = e.memoizedState;
      if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
    }
    return null;
  }
  function y(e) {
    if (h(e) !== e)
      throw Error(r(188));
  }
  function v(e) {
    var t = e.alternate;
    if (!t) {
      if (t = h(e), t === null) throw Error(r(188));
      return t !== e ? null : e;
    }
    for (var n = e, i = t; ; ) {
      var o = n.return;
      if (o === null) break;
      var c = o.alternate;
      if (c === null) {
        if (i = o.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (o.child === c.child) {
        for (c = o.child; c; ) {
          if (c === n) return y(o), e;
          if (c === i) return y(o), t;
          c = c.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== i.return) n = o, i = c;
      else {
        for (var m = !1, b = o.child; b; ) {
          if (b === n) {
            m = !0, n = o, i = c;
            break;
          }
          if (b === i) {
            m = !0, i = o, n = c;
            break;
          }
          b = b.sibling;
        }
        if (!m) {
          for (b = c.child; b; ) {
            if (b === n) {
              m = !0, n = c, i = o;
              break;
            }
            if (b === i) {
              m = !0, i = c, n = o;
              break;
            }
            b = b.sibling;
          }
          if (!m) throw Error(r(189));
        }
      }
      if (n.alternate !== i) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? e : t;
  }
  function x(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (t = x(e), t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  function g(e, t, n, i, o, c) {
    for (; e !== null; ) {
      if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, i, o, c) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && g(
        e.child,
        t,
        n,
        i,
        o,
        c
      ))
        return !0;
      e = e.sibling;
    }
    return !1;
  }
  function S(e) {
    for (e = e.return; e !== null; ) {
      if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
      e = e.return;
    }
    return null;
  }
  function E(e) {
    var t = !1;
    for (e = e.return; e !== null && (e.tag === 4 && (t = !0), !(e.tag === 3 || e.tag === 5 || e.tag === 27)); )
      e = e.return;
    return t;
  }
  function j(e) {
    var t = [null, null], n = S(e);
    return n === null || V(
      t,
      e,
      n.child,
      { foundSelf: !1 }
    ), t;
  }
  function V(e, t, n, i) {
    for (; n !== null; ) {
      if (n === t) i.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (i.foundSelf) return e[1] = n, !0;
        e[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && V(
        e,
        t,
        n.child,
        i
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function M(e) {
    switch (e.tag) {
      case 5:
      case 27:
      case 6:
        return e.stateNode;
      case 3:
        return e.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var q = null, L = null;
  function K(e, t, n) {
    return e === n ? !0 : e === t ? (q = e, !0) : !1;
  }
  function X(e, t, n) {
    return e === n ? (L = e, !1) : e === t ? (L !== null && (q = e), !0) : !1;
  }
  function ee(e) {
    if (e === null) return null;
    do
      e = e === null ? null : e.return;
    while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
    return e || null;
  }
  function oe(e, t, n) {
    for (var i = 0, o = e; o; o = n(o)) i++;
    o = 0;
    for (var c = t; c; c = n(c)) o++;
    for (; 0 < i - o; ) e = n(e), i--;
    for (; 0 < o - i; ) t = n(t), o--;
    for (; i--; ) {
      if (e === t || t !== null && e === t.alternate)
        return e;
      e = n(e), t = n(t);
    }
    return null;
  }
  var Q = Object.assign, D = /* @__PURE__ */ Symbol.for("react.element"), W = /* @__PURE__ */ Symbol.for("react.transitional.element"), te = /* @__PURE__ */ Symbol.for("react.portal"), Ae = /* @__PURE__ */ Symbol.for("react.fragment"), Ce = /* @__PURE__ */ Symbol.for("react.strict_mode"), Te = /* @__PURE__ */ Symbol.for("react.profiler"), Ee = /* @__PURE__ */ Symbol.for("react.consumer"), ce = /* @__PURE__ */ Symbol.for("react.context"), Z = /* @__PURE__ */ Symbol.for("react.forward_ref"), $ = /* @__PURE__ */ Symbol.for("react.suspense"), ne = /* @__PURE__ */ Symbol.for("react.suspense_list"), he = /* @__PURE__ */ Symbol.for("react.memo"), P = /* @__PURE__ */ Symbol.for("react.lazy"), Ye = /* @__PURE__ */ Symbol.for("react.activity"), ut = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), ke = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), T = /* @__PURE__ */ Symbol.for("react.view_transition"), H = /* @__PURE__ */ Symbol.for("react.recoverable"), ae = Symbol.iterator;
  function me(e) {
    return e === null || typeof e != "object" ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
  }
  var Ne = /* @__PURE__ */ Symbol.for("react.client.reference");
  function xe(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ne ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case Ae:
        return "Fragment";
      case Te:
        return "Profiler";
      case Ce:
        return "StrictMode";
      case $:
        return "Suspense";
      case ne:
        return "SuspenseList";
      case Ye:
        return "Activity";
      case T:
        return "ViewTransition";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case te:
          return "Portal";
        case ce:
          return e.displayName || "Context";
        case Ee:
          return (e._context.displayName || "Context") + ".Consumer";
        case Z:
          var t = e.render;
          return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
        case he:
          return t = e.displayName || null, t !== null ? t : xe(e.type) || "Memo";
        case P:
          t = e._payload, e = e._init;
          try {
            return xe(e(t));
          } catch {
          }
      }
    return null;
  }
  var Me = Array.isArray, le = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Se = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Tt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Rt = [], an = -1;
  function _t(e) {
    return { current: e };
  }
  function at(e) {
    0 > an || (e.current = Rt[an], Rt[an] = null, an--);
  }
  function Ze(e, t) {
    an++, Rt[an] = e.current, e.current = t;
  }
  var R = _t(null), J = _t(null), I = _t(null), F = _t(null);
  function we(e, t) {
    switch (Ze(I, t), Ze(J, e), Ze(R, null), t.nodeType) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? R0(e) : 0;
        break;
      default:
        if (e = t.tagName, t = t.namespaceURI)
          t = R0(t), e = _0(t, e);
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    at(R), Ze(R, e);
  }
  function ot() {
    at(R), at(J), at(I);
  }
  function Qn(e) {
    var t = e.memoizedState;
    t !== null && (Zs._currentValue = t.memoizedState, Ze(F, e)), t = R.current;
    var n = _0(t, e.type);
    t !== n && (Ze(J, e), Ze(R, n));
  }
  function Tn(e) {
    J.current === e && (at(R), at(J)), F.current === e && (at(F), Zs._currentValue = Tt);
  }
  var ma, as;
  function mt(e) {
    if (ma === void 0)
      try {
        throw Error();
      } catch (n) {
        var t = n.stack.trim().match(/\n( *(at )?)/);
        ma = t && t[1] || "", as = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ma + e + as;
  }
  var sl = !1;
  function ll(e, t) {
    if (!e || sl) return "";
    sl = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (t) {
              var Y = function() {
                throw Error();
              };
              if (Object.defineProperty(Y.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(Y, []);
                } catch (ie) {
                  var N = ie;
                }
                Reflect.construct(e, [], Y);
              } else {
                try {
                  Y.call();
                } catch (ie) {
                  N = ie;
                }
                Y = !1;
                try {
                  var U = Object.getOwnPropertyDescriptor(
                    e.prototype,
                    "props"
                  );
                  Object.defineProperty(e.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), Y = !0, new e();
                } finally {
                  Y && (U !== void 0 ? Object.defineProperty(e.prototype, "props", U) : delete e.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (ie) {
                N = ie;
              }
              (Y = e()) && typeof Y.catch == "function" && Y.catch(function() {
              });
            }
          } catch (ie) {
            if (ie && N && typeof ie.stack == "string")
              return [ie.stack, N.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var o = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      o && o.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var c = i.DetermineComponentFrameRoot(), m = c[0], b = c[1];
      if (m && b) {
        var w = m.split(`
`), _ = b.split(`
`);
        for (o = i = 0; i < w.length && !w[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; o < _.length && !_[o].includes(
          "DetermineComponentFrameRoot"
        ); )
          o++;
        if (i === w.length || o === _.length)
          for (i = w.length - 1, o = _.length - 1; 1 <= i && 0 <= o && w[i] !== _[o]; )
            o--;
        for (; 1 <= i && 0 <= o; i--, o--)
          if (w[i] !== _[o]) {
            if (i !== 1 || o !== 1)
              do
                if (i--, o--, 0 > o || w[i] !== _[o]) {
                  var B = `
` + w[i].replace(" at new ", " at ");
                  return e.displayName && B.includes("<anonymous>") && (B = B.replace("<anonymous>", e.displayName)), B;
                }
              while (1 <= i && 0 <= o);
            break;
          }
      }
    } finally {
      sl = !1, Error.prepareStackTrace = n;
    }
    return (n = e ? e.displayName || e.name : "") ? mt(n) : "";
  }
  function gt(e, t) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return mt(e.type);
      case 16:
        return mt("Lazy");
      case 13:
        return e.child !== t && t !== null ? mt("Suspense Fallback") : mt("Suspense");
      case 19:
        return mt("SuspenseList");
      case 0:
      case 15:
        return ll(e.type, !1);
      case 11:
        return ll(e.type.render, !1);
      case 1:
        return ll(e.type, !0);
      case 31:
        return mt("Activity");
      case 30:
        return mt("ViewTransition");
      default:
        return "";
    }
  }
  function pa(e) {
    try {
      var t = "", n = null;
      do
        t += gt(e, n), n = e, e = e.return;
      while (e);
      return t;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Qt = Object.prototype.hasOwnProperty, Un = a.unstable_scheduleCallback, Fn = a.unstable_cancelCallback, Ua = a.unstable_shouldYield, Dr = a.unstable_requestPaint, Ft = a.unstable_now, is = a.unstable_getCurrentPriorityLevel, Mt = a.unstable_ImmediatePriority, rl = a.unstable_UserBlockingPriority, Va = a.unstable_NormalPriority, nu = a.unstable_LowPriority, Rr = a.unstable_IdlePriority, It = a.log, ol = a.unstable_setDisableYieldValue, ga = null, Pt = null;
  function zt(e) {
    if (typeof It == "function" && ol(e), Pt && typeof Pt.setStrictMode == "function")
      try {
        Pt.setStrictMode(ga, e);
      } catch {
      }
  }
  var Xt = Math.clz32 ? Math.clz32 : au, cl = Math.log, _r = Math.LN2;
  function au(e) {
    return e >>>= 0, e === 0 ? 32 : 31 - (cl(e) / _r | 0) | 0;
  }
  var wi = 256, La = 262144, Ti = 4194304;
  function dn(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return e & -e;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function ss(e, t, n) {
    var i = e.pendingLanes;
    if (i === 0) return 0;
    var o = 0, c = e.suspendedLanes, m = e.pingedLanes;
    e = e.warmLanes;
    var b = i & 134217727;
    return b !== 0 ? (i = b & ~c, i !== 0 ? o = dn(i) : (m &= b, m !== 0 ? o = dn(m) : n || (n = b & ~e, n !== 0 && (o = dn(n))))) : (b = i & ~c, b !== 0 ? o = dn(b) : m !== 0 ? o = dn(m) : n || (n = i & ~e, n !== 0 && (o = dn(n)))), o === 0 ? 0 : t !== 0 && t !== o && (t & c) === 0 && (c = o & -o, n = t & -t, c >= n || c === 32 && (n & 4194048) !== 0) ? t : o;
  }
  function In(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function zr(e, t) {
    (t & 8) !== 0 && (t |= t & 32);
    var n = e.entangledLanes;
    if (n !== 0)
      for (e = e.entanglements, n &= t; 0 < n; ) {
        var i = 31 - Xt(n), o = 1 << i;
        t |= e[i], n &= ~o;
      }
    return t;
  }
  function Or(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ur() {
    var e = Ti;
    return Ti <<= 1, (Ti & 62914560) === 0 && (Ti = 4194304), e;
  }
  function ul(e) {
    for (var t = [], n = 0; 31 > n; n++) t.push(e);
    return t;
  }
  function Ba(e, t) {
    e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
  }
  function ls(e, t, n, i, o, c) {
    var m = e.pendingLanes;
    e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
    var b = e.entanglements, w = e.expirationTimes, _ = e.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var B = 31 - Xt(n), Y = 1 << B;
      b[B] = 0, w[B] = -1;
      var N = _[B];
      if (N !== null)
        for (_[B] = null, B = 0; B < N.length; B++) {
          var U = N[B];
          U !== null && (U.lane &= -536870913);
        }
      n &= ~Y;
    }
    i !== 0 && Vr(e, i, 0), c !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= c & ~(m & ~t));
  }
  function Vr(e, t, n) {
    e.pendingLanes |= t, e.suspendedLanes &= ~t;
    var i = 31 - Xt(t);
    e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | n & 261930;
  }
  function Lr(e, t) {
    var n = e.entangledLanes |= t;
    for (e = e.entanglements; n; ) {
      var i = 31 - Xt(n), o = 1 << i;
      o & t | e[i] & t && (e[i] |= t), n &= ~o;
    }
  }
  function Br(e, t) {
    var n = t & -t;
    return n = (n & 42) !== 0 ? 1 : fl(n), (n & (e.suspendedLanes | t)) !== 0 ? 0 : n;
  }
  function fl(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function rs(e) {
    return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function dl() {
    var e = Se.p;
    return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : gy(e.type));
  }
  function Hr(e, t) {
    var n = Se.p;
    try {
      return Se.p = e, t();
    } finally {
      Se.p = n;
    }
  }
  var Cn = Math.random().toString(36).slice(2), lt = "__reactFiber$" + Cn, Ot = "__reactProps$" + Cn, ya = "__reactContainer$" + Cn, qr = "__reactEvents$" + Cn, os = "__reactListeners$" + Cn, Gr = "__reactHandles$" + Cn, Yr = "__reactResources$" + Cn, Ci = "__reactMarker$" + Cn, O = "__reactLoad$" + Cn;
  function re(e) {
    delete e[lt], delete e[Ot], delete e[os], delete e[Gr];
  }
  function se(e) {
    var t;
    if (t = e[lt]) return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ya] || n[lt]) {
        if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
          for (e = P0(e); e !== null; ) {
            if (n = e[lt]) return n;
            e = P0(e);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function be(e) {
    if (e = e[lt] || e[ya]) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Le(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(r(33));
  }
  function We(e) {
    var t = e[Yr];
    return t || (t = e[Yr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
  }
  function Oe(e) {
    e[Ci] = !0;
  }
  function sn(e) {
    e[O] = void 0;
  }
  var va = /* @__PURE__ */ new Set(), Ut = {};
  function hn(e, t) {
    Ha(e, t), Ha(e + "Capture", t);
  }
  function Ha(e, t) {
    for (Ut[e] = t, e = 0; e < t.length; e++)
      va.add(t[e]);
  }
  var Xr = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Zr = {}, ym = {};
  function Kx(e) {
    return Qt.call(ym, e) ? !0 : Qt.call(Zr, e) ? !1 : Xr.test(e) ? ym[e] = !0 : (Zr[e] = !0, !1);
  }
  var Ke = !1;
  function vm() {
    var e = Ke;
    return Ke = !1, e;
  }
  function Kr(e, t, n) {
    if (Kx(t))
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var i = t.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, n);
      }
  }
  function Qr(e, t, n) {
    if (n === null) e.removeAttribute(t);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, n);
    }
  }
  function ba(e, t, n, i) {
    if (i === null) e.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(n);
          return;
      }
      e.setAttributeNS(t, n, i);
    }
  }
  function mn(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function bm(e) {
    var t = e.type;
    return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function Qx(e, t, n) {
    var i = Object.getOwnPropertyDescriptor(
      e.constructor.prototype,
      t
    );
    if (!e.hasOwnProperty(t) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var o = i.get, c = i.set;
      return Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return o.call(this);
        },
        set: function(m) {
          n = "" + m, c.call(this, m);
        }
      }), Object.defineProperty(e, t, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(m) {
          n = "" + m;
        },
        stopTracking: function() {
          e._valueTracker = null, delete e[t];
        }
      };
    }
  }
  function iu(e) {
    if (!e._valueTracker) {
      var t = bm(e) ? "checked" : "value";
      e._valueTracker = Qx(
        e,
        t,
        "" + e[t]
      );
    }
  }
  function xm(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var n = t.getValue(), i = "";
    return e && (i = bm(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
  }
  var Fx = /[\n"\\]/g;
  function En(e) {
    return e.replace(
      Fx,
      function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function su(e, t, n, i, o, c, m, b) {
    e.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? e.type = m : e.removeAttribute("type"), t != null ? m === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + mn(t)) : e.value !== "" + mn(t) && (e.value = "" + mn(t)) : m !== "submit" && m !== "reset" || e.removeAttribute("value"), t != null ? m === "number" && e.value == t ? lu(e, mn(e.value)) : lu(e, mn(t)) : n != null ? lu(e, mn(n)) : i != null && e.removeAttribute("value"), o == null && c != null && (e.defaultChecked = !!c), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? e.name = "" + mn(b) : e.removeAttribute("name");
  }
  function Sm(e, t, n, i, o, c, m, b) {
    if (c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" && (e.type = c), t != null || n != null) {
      if (!(c !== "submit" && c !== "reset" || t != null)) {
        iu(e);
        return;
      }
      n = n != null ? "" + mn(n) : "", t = t != null ? "" + mn(t) : n, b || t === e.value || (e.value = t), e.defaultValue = t;
    }
    i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = b ? e.checked : !!i, e.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (e.name = m), iu(e);
  }
  function lu(e, t) {
    e.defaultValue !== "" + t && (e.defaultValue = "" + t);
  }
  function cs(e, t, n, i) {
    if (e = e.options, t) {
      t = {};
      for (var o = 0; o < n.length; o++)
        t["$" + n[o]] = !0;
      for (n = 0; n < e.length; n++)
        o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && i && (e[n].defaultSelected = !0);
    } else {
      for (n = "" + mn(n), t = null, o = 0; o < e.length; o++) {
        if (e[o].value === n) {
          e[o].selected = !0, i && (e[o].defaultSelected = !0);
          return;
        }
        t !== null || e[o].disabled || (t = e[o]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function wm(e, t, n) {
    if (t != null && (t = "" + mn(t), t !== e.value && (e.value = t), n == null)) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = n != null ? "" + mn(n) : "";
  }
  function Tm(e, t, n, i) {
    if (t == null) {
      if (i != null) {
        if (n != null) throw Error(r(92));
        if (Me(i)) {
          if (1 < i.length) throw Error(r(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), t = n;
    }
    n = mn(t), e.defaultValue = n, i = e.textContent, i === n && i !== "" && i !== null && (e.value = i), iu(e);
  }
  function us(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === 3) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Ix = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cm(e, t, n) {
    var i = t.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Ix.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
  }
  function Em(e, t, n) {
    if (t != null && typeof t != "object")
      throw Error(r(62));
    if (e = e.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || t != null && t.hasOwnProperty(i) || (i.indexOf("--") === 0 ? e.setProperty(i, "") : i === "float" ? e.cssFloat = "" : e[i] = "", Ke = !0);
      for (var o in t)
        i = t[o], t.hasOwnProperty(o) && n[o] !== i && (Cm(e, o, i), Ke = !0);
    } else
      for (var c in t)
        t.hasOwnProperty(c) && Cm(e, c, t[c]);
  }
  function ru(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Px = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Jx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Fr(e) {
    return Jx.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
  }
  function Pn() {
  }
  var ou = null;
  function cu(e) {
    return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
  }
  var fs = null, ds = null;
  function jm(e) {
    var t = be(e);
    if (t && (e = t.stateNode)) {
      var n = e[Ot] || null;
      e: switch (e = t.stateNode, t.type) {
        case "input":
          if (su(
            e,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), t = n.name, n.type === "radio" && t != null) {
            for (n = e; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + En(
                "" + t
              ) + '"][type="radio"]'
            ), t = 0; t < n.length; t++) {
              var i = n[t];
              if (i !== e && i.form === e.form) {
                var o = i[Ot] || null;
                if (!o) throw Error(r(90));
                su(
                  i,
                  o.value,
                  o.defaultValue,
                  o.defaultValue,
                  o.checked,
                  o.defaultChecked,
                  o.type,
                  o.name
                );
              }
            }
            for (t = 0; t < n.length; t++)
              i = n[t], i.form === e.form && xm(i);
          }
          break e;
        case "textarea":
          wm(e, n.value, n.defaultValue);
          break e;
        case "select":
          t = n.value, t != null && cs(e, !!n.multiple, t, !1);
      }
    }
  }
  var uu = !1;
  function Am(e, t, n) {
    if (uu) return e(t, n);
    uu = !0;
    try {
      var i = e(t);
      return i;
    } finally {
      if (uu = !1, (fs !== null || ds !== null) && (Io(), fs && (t = fs, e = ds, ds = fs = null, jm(t), e)))
        for (t = 0; t < e.length; t++) jm(e[t]);
    }
  }
  function hl(e, t) {
    var n = e.stateNode;
    if (n === null) return null;
    var i = n[Ot] || null;
    if (i === null) return null;
    n = i[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (n && typeof n != "function")
      throw Error(
        r(231, t, typeof n)
      );
    return n;
  }
  var xa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), fu = !1;
  if (xa)
    try {
      var ml = {};
      Object.defineProperty(ml, "passive", {
        get: function() {
          fu = !0;
        }
      }), window.addEventListener("test", ml, ml), window.removeEventListener("test", ml, ml);
    } catch {
      fu = !1;
    }
  var qa = null, du = null, Ir = null;
  function Mm() {
    if (Ir) return Ir;
    var e, t = du, n = t.length, i, o = "value" in qa ? qa.value : qa.textContent, c = o.length;
    for (e = 0; e < n && t[e] === o[e]; e++) ;
    var m = n - e;
    for (i = 1; i <= m && t[n - i] === o[c - i]; i++) ;
    return Ir = o.slice(e, 1 < i ? 1 - i : void 0);
  }
  function Pr(e) {
    var t = e.keyCode;
    return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
  }
  function Jr() {
    return !0;
  }
  function Nm() {
    return !1;
  }
  function Jt(e) {
    function t(n, i, o, c, m) {
      this._reactName = n, this._targetInst = o, this.type = i, this.nativeEvent = c, this.target = m, this.currentTarget = null;
      for (var b in e)
        e.hasOwnProperty(b) && (n = e[b], this[b] = n ? n(c) : c[b]);
      return this.isDefaultPrevented = (c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1) ? Jr : Nm, this.isPropagationStopped = Nm, this;
    }
    return Q(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Jr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Jr);
      },
      persist: function() {
      },
      isPersistent: Jr
    }), t;
  }
  var Ga = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, $r = Jt(Ga), pl = Q({}, Ga, { view: 0, detail: 0 }), $x = Jt(pl), hu, mu, gl, Wr = Q({}, pl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: gu,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (e !== gl && (gl && e.type === "mousemove" ? (hu = e.screenX - gl.screenX, mu = e.screenY - gl.screenY) : mu = hu = 0, gl = e), hu);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : mu;
    }
  }), km = Jt(Wr), Wx = Q({}, Wr, { dataTransfer: 0 }), e2 = Jt(Wx), t2 = Q({}, pl, { relatedTarget: 0 }), pu = Jt(t2), n2 = Q({}, Ga, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), a2 = Jt(n2), i2 = Q({}, Ga, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), s2 = Jt(i2), l2 = Q({}, Ga, { data: 0 }), Dm = Jt(l2), r2 = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, o2 = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, c2 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function u2(e) {
    var t = this.nativeEvent;
    return t.getModifierState ? t.getModifierState(e) : (e = c2[e]) ? !!t[e] : !1;
  }
  function gu() {
    return u2;
  }
  var f2 = Q({}, pl, {
    key: function(e) {
      if (e.key) {
        var t = r2[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress" ? (e = Pr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? o2[e.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: gu,
    charCode: function(e) {
      return e.type === "keypress" ? Pr(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Pr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), d2 = Jt(f2), h2 = Q({}, Wr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Rm = Jt(h2), m2 = Q({}, Ga, { submitter: 0 }), p2 = Jt(m2), g2 = Q({}, pl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: gu
  }), y2 = Jt(g2), v2 = Q({}, Ga, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), b2 = Jt(v2), x2 = Q({}, Wr, {
    deltaX: function(e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function(e) {
      return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), S2 = Jt(x2), w2 = Q({}, Ga, {
    newState: 0,
    oldState: 0,
    source: 0
  }), T2 = Jt(w2), C2 = [9, 13, 27, 32], yu = xa && "CompositionEvent" in window, yl = null;
  xa && "documentMode" in document && (yl = document.documentMode);
  var E2 = xa && "TextEvent" in window && !yl, _m = xa && (!yu || yl && 8 < yl && 11 >= yl), zm = " ", Om = !1;
  function Um(e, t) {
    switch (e) {
      case "keyup":
        return C2.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Vm(e) {
    return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
  }
  var hs = !1;
  function j2(e, t) {
    switch (e) {
      case "compositionend":
        return Vm(t);
      case "keypress":
        return t.which !== 32 ? null : (Om = !0, zm);
      case "textInput":
        return e = t.data, e === zm && Om ? null : e;
      default:
        return null;
    }
  }
  function A2(e, t) {
    if (hs)
      return e === "compositionend" || !yu && Um(e, t) ? (e = Mm(), Ir = du = qa = null, hs = !1, e) : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
          if (t.char && 1 < t.char.length)
            return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return _m && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var M2 = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Lm(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!M2[e.type] : t === "textarea";
  }
  function Bm(e, t, n, i) {
    fs ? ds ? ds.push(i) : ds = [i] : fs = i, t = tc(t, "onChange"), 0 < t.length && (n = new $r(
      "onChange",
      "change",
      null,
      n,
      i
    ), e.push({ event: n, listeners: t }));
  }
  var vl = null, bl = null;
  function N2(e) {
    j0(e, 0);
  }
  function eo(e) {
    var t = Le(e);
    if (xm(t)) return e;
  }
  function Hm(e, t) {
    if (e === "change") return t;
  }
  var qm = !1;
  if (xa) {
    var vu;
    if (xa) {
      var bu = "oninput" in document;
      if (!bu) {
        var Gm = document.createElement("div");
        Gm.setAttribute("oninput", "return;"), bu = typeof Gm.oninput == "function";
      }
      vu = bu;
    } else vu = !1;
    qm = vu && (!document.documentMode || 9 < document.documentMode);
  }
  function Ym() {
    vl && (vl.detachEvent("onpropertychange", Xm), bl = vl = null);
  }
  function Xm(e) {
    if (e.propertyName === "value" && eo(bl)) {
      var t = [];
      Bm(
        t,
        bl,
        e,
        cu(e)
      ), Am(N2, t);
    }
  }
  function k2(e, t, n) {
    e === "focusin" ? (Ym(), vl = t, bl = n, vl.attachEvent("onpropertychange", Xm)) : e === "focusout" && Ym();
  }
  function D2(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return eo(bl);
  }
  function R2(e, t) {
    if (e === "click") return eo(t);
  }
  function _2(e, t) {
    if (e === "input" || e === "change")
      return eo(t);
  }
  function z2(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var pn = typeof Object.is == "function" ? Object.is : z2;
  function xl(e, t) {
    if (pn(e, t)) return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), i = Object.keys(t);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var o = n[i];
      if (!Qt.call(t, o) || !pn(e[o], t[o]))
        return !1;
    }
    return !0;
  }
  function xu(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function Zm(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Km(e, t) {
    var n = Zm(e);
    e = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = e + n.textContent.length, e <= t && i >= t)
          return { node: n, offset: t - e };
        e = i;
      }
      e: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break e;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Zm(n);
    }
  }
  function Qm(e, t) {
    return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Qm(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
  }
  function Fm(e) {
    e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
    for (var t = xu(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var n = typeof t.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) e = t.contentWindow;
      else break;
      t = xu(e.document);
    }
    return t;
  }
  function Su(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  var O2 = xa && "documentMode" in document && 11 >= document.documentMode, ms = null, wu = null, Sl = null, Tu = !1;
  function Im(e, t, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Tu || ms == null || ms !== xu(i) || (i = ms, "selectionStart" in i && Su(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), Sl && xl(Sl, i) || (Sl = i, i = tc(wu, "onSelect"), 0 < i.length && (t = new $r(
      "onSelect",
      "select",
      null,
      t,
      n
    ), e.push({ event: t, listeners: i }), t.target = ms)));
  }
  function Ei(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var ps = {
    animationend: Ei("Animation", "AnimationEnd"),
    animationiteration: Ei("Animation", "AnimationIteration"),
    animationstart: Ei("Animation", "AnimationStart"),
    transitionrun: Ei("Transition", "TransitionRun"),
    transitionstart: Ei("Transition", "TransitionStart"),
    transitioncancel: Ei("Transition", "TransitionCancel"),
    transitionend: Ei("Transition", "TransitionEnd")
  }, Cu = {}, Pm = {};
  xa && (Pm = document.createElement("div").style, "AnimationEvent" in window || (delete ps.animationend.animation, delete ps.animationiteration.animation, delete ps.animationstart.animation), "TransitionEvent" in window || delete ps.transitionend.transition);
  function ji(e) {
    if (Cu[e]) return Cu[e];
    if (!ps[e]) return e;
    var t = ps[e], n;
    for (n in t)
      if (t.hasOwnProperty(n) && n in Pm)
        return Cu[e] = t[n];
    return e;
  }
  var Jm = ji("animationend"), $m = ji("animationiteration"), Wm = ji("animationstart"), U2 = ji("transitionrun"), V2 = ji("transitionstart"), L2 = ji("transitioncancel"), ep = ji("transitionend"), tp = /* @__PURE__ */ new Map(), Eu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Eu.push("scrollEnd");
  function Vn(e, t) {
    tp.set(e, t), hn(t, [e]);
  }
  var B2 = 0;
  function Sa(e, t) {
    if (e.name != null && e.name !== "auto") return e.name;
    if (t.autoName !== null) return t.autoName;
    e = qn.identifierPrefix;
    var n = B2++;
    return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
  }
  function np(e) {
    if (e == null || typeof e == "string")
      return e;
    var t = null, n = Os;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var o = e[n[i]];
        if (o != null) {
          if (o === "none") return "none";
          t = t == null ? o : t + (" " + o);
        }
      }
    return t ?? e.default;
  }
  function wa(e, t) {
    return e = np(e), t = np(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
  }
  var to = typeof reportError == "function" ? reportError : function(e) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var t = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
        error: e
      });
      if (!window.dispatchEvent(t)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", e);
      return;
    }
    console.error(e);
  }, jn = [], gs = 0, ju = 0;
  function no() {
    for (var e = gs, t = ju = gs = 0; t < e; ) {
      var n = jn[t];
      jn[t++] = null;
      var i = jn[t];
      jn[t++] = null;
      var o = jn[t];
      jn[t++] = null;
      var c = jn[t];
      if (jn[t++] = null, i !== null && o !== null) {
        var m = i.pending;
        m === null ? o.next = o : (o.next = m.next, m.next = o), i.pending = o;
      }
      c !== 0 && ap(n, o, c);
    }
  }
  function ao(e, t, n, i) {
    jn[gs++] = e, jn[gs++] = t, jn[gs++] = n, jn[gs++] = i, ju |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
  }
  function Au(e, t, n, i) {
    return ao(e, t, n, i), io(e);
  }
  function Ai(e, t) {
    return ao(e, null, null, t), io(e);
  }
  function ap(e, t, n) {
    e.lanes |= n;
    var i = e.alternate;
    i !== null && (i.lanes |= n);
    for (var o = !1, c = e.return; c !== null; )
      c.childLanes |= n, i = c.alternate, i !== null && (i.childLanes |= n), c.tag === 22 && (e = c.stateNode, e === null || e._visibility & 1 || (o = !0)), e = c, c = c.return;
    return e.tag === 3 ? (c = e.stateNode, o && t !== null && (o = 31 - Xt(n), e = c.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = n | 536870912), c) : null;
  }
  function io(e) {
    if (50 < Yl)
      throw Yl = 0, Fo = null, Error(r(185));
    for (var t = e.return; t !== null; )
      e = t, t = e.return;
    return e.tag === 3 ? e.stateNode : null;
  }
  var ys = {};
  function H2(e, t, n, i) {
    this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ln(e, t, n, i) {
    return new H2(e, t, n, i);
  }
  function Mu(e) {
    return e = e.prototype, !(!e || !e.isReactComponent);
  }
  function Ta(e, t) {
    var n = e.alternate;
    return n === null ? (n = ln(
      e.tag,
      t,
      e.key,
      e.mode
    ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
  }
  function ip(e, t) {
    e.flags &= 1206910978;
    var n = e.alternate;
    return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
      lanes: t.lanes,
      firstContext: t.firstContext
    }), e;
  }
  function so(e, t, n, i, o, c) {
    var m = 0;
    if (i = e, typeof i == "function") Mu(i) && (m = 1);
    else if (typeof i == "string")
      m = mw(
        e,
        n,
        R.current
      ) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
    else
      e: switch (i) {
        case Ye:
          return e = ln(31, n, t, o), e.elementType = Ye, e.lanes = c, e;
        case Ae:
          return Mi(n.children, o, c, t);
        case Ce:
          m = 8, o |= 24;
          break;
        case Te:
          return e = ln(12, n, t, o | 2), e.elementType = Te, e.lanes = c, e;
        case $:
          return e = ln(13, n, t, o), e.elementType = $, e.lanes = c, e;
        case ne:
          return e = ln(19, n, t, o), e.elementType = ne, e.lanes = c, e;
        case ut:
        case T:
          return e = o | 32, e = ln(30, n, t, e), e.elementType = T, e.lanes = c, e.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, e;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case ce:
                m = 10;
                break e;
              case Ee:
                m = 9;
                break e;
              case Z:
                m = 11;
                break e;
              case he:
                m = 14;
                break e;
              case P:
                m = 16, i = null;
                break e;
            }
          m = 29, n = Error(
            r(130, e === null ? "null" : typeof e, "")
          ), i = null;
      }
    return t = ln(m, n, t, o), t.elementType = e, t.type = i, t.lanes = c, t;
  }
  function Mi(e, t, n, i) {
    return e = ln(7, e, i, t), e.lanes = n, e;
  }
  function Nu(e, t, n) {
    return e = ln(6, e, null, t), e.lanes = n, e;
  }
  function sp(e) {
    var t = ln(18, null, null, 0);
    return t.stateNode = e, t;
  }
  function ku(e, t, n) {
    return t = ln(
      4,
      e.children !== null ? e.children : [],
      e.key,
      t
    ), t.lanes = n, t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation
    }, t;
  }
  var lp = /* @__PURE__ */ new WeakMap();
  function An(e, t) {
    if (typeof e == "object" && e !== null) {
      var n = lp.get(e);
      return n !== void 0 ? n : (t = {
        value: e,
        source: t,
        stack: pa(t)
      }, lp.set(e, t), t);
    }
    return {
      value: e,
      source: t,
      stack: pa(t)
    };
  }
  var vs = [], bs = 0, lo = null, wl = 0, Mn = [], Nn = 0, Ya = null, Jn = 1, $n = "";
  function Ca(e, t) {
    vs[bs++] = wl, vs[bs++] = lo, lo = e, wl = t;
  }
  function rp(e, t, n) {
    Mn[Nn++] = Jn, Mn[Nn++] = $n, Mn[Nn++] = Ya, Ya = e;
    var i = Jn;
    e = $n;
    var o = 32 - Xt(i) - 1;
    i &= ~(1 << o), n += 1;
    var c = 32 - Xt(t) + o;
    if (30 < c) {
      var m = o - o % 5;
      c = (i & (1 << m) - 1).toString(32), i >>= m, o -= m, Jn = 1 << 32 - Xt(t) + o | n << o | i, $n = c + e;
    } else
      Jn = 1 << c | n << o | i, $n = e;
  }
  function ro(e) {
    e.return !== null && (Ca(e, 1), rp(e, 1, 0));
  }
  function Du(e) {
    for (; e === lo; )
      lo = vs[--bs], vs[bs] = null, wl = vs[--bs], vs[bs] = null;
    for (; e === Ya; )
      Ya = Mn[--Nn], Mn[Nn] = null, $n = Mn[--Nn], Mn[Nn] = null, Jn = Mn[--Nn], Mn[Nn] = null;
  }
  function op(e, t) {
    Mn[Nn++] = Jn, Mn[Nn++] = $n, Mn[Nn++] = Ya, Jn = t.id, $n = t.overflow, Ya = e;
  }
  var Nt = null, it = null, Ue = !1, Xa = null, kn = !1, Ru = Error(r(519));
  function Za(e) {
    var t = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Tl(An(t, e)), Ru;
  }
  function cp(e) {
    var t = e.stateNode, n = e.type, i = e.memoizedProps;
    switch (t[lt] = e, t[Ot] = i, n) {
      case "dialog":
        He("cancel", t), He("close", t);
        break;
      case "iframe":
      case "object":
      case "embed":
        He("load", t);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Zl.length; n++)
          He(Zl[n], t);
        break;
      case "source":
        He("error", t);
        break;
      case "img":
      case "image":
      case "link":
        He("error", t), He("load", t);
        break;
      case "details":
        He("toggle", t);
        break;
      case "input":
        He("invalid", t), Sm(
          t,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        He("invalid", t);
        break;
      case "textarea":
        He("invalid", t), Tm(t, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === !0 || k0(t.textContent, n) ? (i.popover != null && (He("beforetoggle", t), He("toggle", t)), i.onScroll != null && He("scroll", t), i.onScrollEnd != null && He("scrollend", t), i.onClick != null && (t.onclick = Pn), t = !0) : t = !1, t || Za(e, !0);
  }
  function oo(e) {
    for (Nt = e.return; Nt; )
      switch (Nt.tag) {
        case 5:
        case 31:
        case 13:
          kn = !1;
          return;
        case 27:
        case 3:
          kn = !0;
          return;
        default:
          Nt = Nt.return;
      }
  }
  function xs(e) {
    if (e !== Nt) return !1;
    if (!Ue) return oo(e), Ue = !0, !1;
    var t = e.tag, n;
    if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || cd(e.type, e.memoizedProps)), n = !n), n && it && Za(e), oo(e), t === 13) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      it = I0(e);
    } else if (t === 31) {
      if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
      it = I0(e);
    } else
      t === 27 ? (t = it, ri(e.type) ? (e = vd, vd = null, it = e) : it = t) : it = Nt ? Rn(e.stateNode.nextSibling) : null;
    return !0;
  }
  function Ni() {
    it = Nt = null, Ue = !1;
  }
  function _u() {
    var e = Xa;
    return e !== null && (cn === null ? cn = e : cn.push.apply(
      cn,
      e
    ), Xa = null), e;
  }
  function Tl(e) {
    Xa === null ? Xa = [e] : Xa.push(e);
  }
  var zu = _t(null), ki = null, Ea = null;
  function Ka(e, t, n) {
    Ze(zu, t._currentValue), t._currentValue = n;
  }
  function ja(e) {
    e._currentValue = zu.current, at(zu);
  }
  function co(e, t, n) {
    for (; e !== null; ) {
      var i = e.alternate;
      if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
      e = e.return;
    }
  }
  function Ou(e, t, n, i) {
    var o = e.child;
    for (o !== null && (o.return = e); o !== null; ) {
      var c = o.dependencies;
      if (c !== null) {
        var m = o.child;
        c = c.firstContext;
        e: for (; c !== null; ) {
          var b = c;
          c = o;
          for (var w = 0; w < t.length; w++)
            if (b.context === t[w]) {
              c.lanes |= n, b = c.alternate, b !== null && (b.lanes |= n), co(
                c.return,
                n,
                e
              ), i || (m = null);
              break e;
            }
          c = b.next;
        }
      } else if (o.tag === 18) {
        if (m = o.return, m === null) throw Error(r(341));
        m.lanes |= n, c = m.alternate, c !== null && (c.lanes |= n), co(m, n, e), m = null;
      } else
        o.tag === 13 && o.memoizedState !== null && o.memoizedState.dehydrated === null ? (o.lanes |= n, m = o.alternate, m !== null && (m.lanes |= n), co(
          o.return,
          n,
          e
        ), m = o.child, m = m !== null ? m.sibling : null) : m = o.child;
      if (m !== null) m.return = o;
      else
        for (m = o; m !== null; ) {
          if (m === e) {
            m = null;
            break;
          }
          if (o = m.sibling, o !== null) {
            o.return = m.return, m = o;
            break;
          }
          m = m.return;
        }
      o = m;
    }
  }
  function Di(e, t, n, i) {
    e = null;
    for (var o = t, c = !1; o !== null; ) {
      if (!c) {
        if ((o.flags & 524288) !== 0) c = !0;
        else if ((o.flags & 262144) !== 0) break;
      }
      if (o.tag === 10) {
        var m = o.alternate;
        if (m === null) throw Error(r(387));
        if (m = m.memoizedProps, m !== null) {
          var b = o.type;
          pn(o.pendingProps.value, m.value) || (e !== null ? e.push(b) : e = [b]);
        }
      } else if (o === F.current) {
        if (m = o.alternate, m === null) throw Error(r(387));
        m.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(Zs) : e = [Zs]);
      }
      o = o.return;
    }
    return e !== null && Ou(
      t,
      e,
      n,
      i
    ), t.flags |= 262144, e !== null;
  }
  function uo(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!pn(
        e.context._currentValue,
        e.memoizedValue
      ))
        return !0;
      e = e.next;
    }
    return !1;
  }
  function Ri(e) {
    ki = e, Ea = null, e = e.dependencies, e !== null && (e.firstContext = null);
  }
  function Vt(e) {
    return up(ki, e);
  }
  function fo(e, t) {
    return ki === null && Ri(e), up(e, t);
  }
  function up(e, t) {
    var n = t._currentValue;
    if (t = { context: t, memoizedValue: n, next: null }, Ea === null) {
      if (e === null) throw Error(r(308));
      Ea = t, e.dependencies = { lanes: 0, firstContext: t }, e.flags |= 524288;
    } else Ea = Ea.next = t;
    return n;
  }
  var q2 = typeof AbortController < "u" ? AbortController : function() {
    var e = [], t = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        e.push(i);
      }
    };
    this.abort = function() {
      t.aborted = !0, e.forEach(function(n) {
        return n();
      });
    };
  }, G2 = a.unstable_scheduleCallback, Y2 = a.unstable_NormalPriority, yt = {
    $$typeof: ce,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Uu() {
    return {
      controller: new q2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Cl(e) {
    e.refCount--, e.refCount === 0 && G2(Y2, function() {
      e.controller.abort();
    });
  }
  function fp(e, t) {
    if ((e.pendingLanes & 4194048) !== 0) {
      var n = e.transitionTypes;
      for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
        var i = t[e];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var El = null;
  function X2(e) {
    var t = e.transitionTypes;
    return e.transitionTypes = null, t;
  }
  var jl = null, Vu = 0, _i = 0, Ss = null;
  function Z2(e, t) {
    if (jl === null) {
      var n = jl = [];
      Vu = 0, _i = ed(), Ss = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return Vu++, t.then(dp, dp), t;
  }
  function dp() {
    if (--Vu === 0 && (El = null, jl !== null)) {
      Ss !== null && (Ss.status = "fulfilled");
      var e = jl;
      jl = null, _i = 0, Ss = null;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function K2(e, t) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(o) {
        n.push(o);
      }
    };
    return e.then(
      function() {
        i.status = "fulfilled", i.value = t;
        for (var o = 0; o < n.length; o++) (0, n[o])(t);
      },
      function(o) {
        for (i.status = "rejected", i.reason = o, o = 0; o < n.length; o++)
          (0, n[o])(void 0);
      }
    ), i;
  }
  var hp = le.S;
  le.S = function(e, t) {
    if (s0 = Ft(), typeof t == "object" && t !== null && typeof t.then == "function" && Z2(e, t), El !== null)
      for (var n = Bs; n !== null; )
        fp(n, El), n = n.next;
    if (n = e.types, n !== null) {
      for (var i = Bs; i !== null; )
        fp(i, n), i = i.next;
      if (_i !== 0) {
        i = El, i === null && (i = El = []);
        for (var o = 0; o < n.length; o++) {
          var c = n[o];
          i.indexOf(c) === -1 && i.push(c);
        }
      }
    }
    hp !== null && hp(e, t);
  };
  var zi = _t(null);
  function Lu() {
    var e = zi.current;
    return e !== null ? e : tt.pooledCache;
  }
  function ho(e, t) {
    t === null ? Ze(zi, zi.current) : Ze(zi, t.pool);
  }
  function mp() {
    var e = Lu();
    return e === null ? null : { parent: yt._currentValue, pool: e };
  }
  var ws = Error(r(460)), Bu = Error(r(474)), mo = Error(r(542)), po = { then: function() {
  } };
  function pp(e) {
    return e = e.status, e === "fulfilled" || e === "rejected";
  }
  function gp(e, t, n) {
    switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Pn, Pn), t = n), t.status) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw e = t.reason, vp(e), e === void 0 && !("reason" in t) ? Error(r(600)) : e;
      default:
        if (typeof t.status == "string") t.then(Pn, Pn);
        else {
          if (e = tt, e !== null && 100 < e.shellSuspendCounter)
            throw Error(r(482));
          e = t, e.status = "pending", e.then(
            function(i) {
              if (t.status === "pending") {
                var o = t;
                o.status = "fulfilled", o.value = i;
              }
            },
            function(i) {
              if (t.status === "pending") {
                var o = t;
                o.status = "rejected", o.reason = i;
              }
            }
          );
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw e = t.reason, vp(e), e;
        }
        throw Ui = t, ws;
    }
  }
  function Oi(e) {
    try {
      var t = e._init;
      return t(e._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Ui = n, ws) : n;
    }
  }
  var Ui = null;
  function yp() {
    if (Ui === null) throw Error(r(459));
    var e = Ui;
    return Ui = null, e;
  }
  function vp(e) {
    if (e === ws || e === mo)
      throw Error(r(483));
  }
  var Ts = null, Al = 0;
  function go(e) {
    var t = Al;
    return Al += 1, Ts === null && (Ts = []), gp(Ts, e, t);
  }
  function Qa(e, t) {
    t = t.props.ref, e.ref = t !== void 0 ? t : null;
  }
  function yo(e, t) {
    throw t.$$typeof === D ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(
      r(
        31,
        e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e
      )
    ));
  }
  function bp(e) {
    function t(k, A) {
      if (e) {
        var z = k.deletions;
        z === null ? (k.deletions = [A], k.flags |= 16) : z.push(A);
      }
    }
    function n(k, A) {
      if (!e) return null;
      for (; A !== null; )
        t(k, A), A = A.sibling;
      return null;
    }
    function i(k) {
      for (var A = /* @__PURE__ */ new Map(); k !== null; )
        k.key === null ? A.set(k.index, k) : A.set(k.key, k), k = k.sibling;
      return A;
    }
    function o(k, A) {
      return k = Ta(k, A), k.index = 0, k.sibling = null, k;
    }
    function c(k, A, z) {
      return k.index = z, e ? (z = k.alternate, z !== null ? (z = z.index, z < A ? (k.flags |= 2, A) : z) : (k.flags |= 134217730, A)) : (k.flags |= 1048576, A);
    }
    function m(k) {
      return e && k.alternate === null && (k.flags |= 134217730), k;
    }
    function b(k, A, z, G) {
      return A === null || A.tag !== 6 ? (A = Nu(z, k.mode, G), A.return = k, A) : (A = o(A, z), A.return = k, A);
    }
    function w(k, A, z, G) {
      var ue = z.type;
      return ue === Ae ? (k = B(
        k,
        A,
        z.props.children,
        G,
        z.key
      ), Qa(k, z), k) : A !== null && (A.elementType === ue || typeof ue == "object" && ue !== null && ue.$$typeof === P && Oi(ue) === A.type) ? (A = o(A, z.props), Qa(A, z), A.return = k, A) : (A = so(
        z.type,
        z.key,
        z.props,
        null,
        k.mode,
        G
      ), Qa(A, z), A.return = k, A);
    }
    function _(k, A, z, G) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== z.containerInfo || A.stateNode.implementation !== z.implementation ? (A = ku(z, k.mode, G), A.return = k, A) : (A = o(A, z.children || []), A.return = k, A);
    }
    function B(k, A, z, G, ue) {
      return A === null || A.tag !== 7 ? (A = Mi(
        z,
        k.mode,
        G,
        ue
      ), A.return = k, A) : (A = o(A, z), A.return = k, A);
    }
    function Y(k, A, z) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Nu(
          "" + A,
          k.mode,
          z
        ), A.return = k, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case W:
            return z = so(
              A.type,
              A.key,
              A.props,
              null,
              k.mode,
              z
            ), Qa(z, A), z.return = k, z;
          case te:
            return A = ku(
              A,
              k.mode,
              z
            ), A.return = k, A;
          case P:
            return A = Oi(A), Y(k, A, z);
        }
        if (Me(A) || me(A))
          return A = Mi(
            A,
            k.mode,
            z,
            null
          ), A.return = k, A;
        if (typeof A.then == "function")
          return Y(k, go(A), z);
        if (A.$$typeof === ce)
          return Y(
            k,
            fo(k, A),
            z
          );
        yo(k, A);
      }
      return null;
    }
    function N(k, A, z, G) {
      var ue = A !== null ? A.key : null;
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return ue !== null ? null : b(k, A, "" + z, G);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case W:
            return z.key === ue ? w(k, A, z, G) : null;
          case te:
            return z.key === ue ? _(k, A, z, G) : null;
          case P:
            return z = Oi(z), N(k, A, z, G);
        }
        if (Me(z) || me(z))
          return ue !== null ? null : B(k, A, z, G, null);
        if (typeof z.then == "function")
          return N(
            k,
            A,
            go(z),
            G
          );
        if (z.$$typeof === ce)
          return N(
            k,
            A,
            fo(k, z),
            G
          );
        yo(k, z);
      }
      return null;
    }
    function U(k, A, z, G, ue) {
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return k = k.get(z) || null, b(A, k, "" + G, ue);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case W:
            return k = k.get(
              G.key === null ? z : G.key
            ) || null, w(A, k, G, ue);
          case te:
            return k = k.get(
              G.key === null ? z : G.key
            ) || null, _(A, k, G, ue);
          case P:
            return G = Oi(G), U(
              k,
              A,
              z,
              G,
              ue
            );
        }
        if (Me(G) || me(G))
          return k = k.get(z) || null, B(A, k, G, ue, null);
        if (typeof G.then == "function")
          return U(
            k,
            A,
            z,
            go(G),
            ue
          );
        if (G.$$typeof === ce)
          return U(
            k,
            A,
            z,
            fo(A, G),
            ue
          );
        yo(A, G);
      }
      return null;
    }
    function ie(k, A, z, G) {
      for (var ue = null, Ge = null, ve = A, je = A = 0, xt = null; ve !== null && je < z.length; je++) {
        ve.index > je ? (xt = ve, ve = null) : xt = ve.sibling;
        var Xe = N(
          k,
          ve,
          z[je],
          G
        );
        if (Xe === null) {
          ve === null && (ve = xt);
          break;
        }
        e && ve && Xe.alternate === null && t(k, ve), A = c(Xe, A, je), Ge === null ? ue = Xe : Ge.sibling = Xe, Ge = Xe, ve = xt;
      }
      if (je === z.length)
        return n(k, ve), Ue && Ca(k, je), ue;
      if (ve === null) {
        for (; je < z.length; je++)
          ve = Y(k, z[je], G), ve !== null && (A = c(
            ve,
            A,
            je
          ), Ge === null ? ue = ve : Ge.sibling = ve, Ge = ve);
        return Ue && Ca(k, je), ue;
      }
      for (ve = i(ve); je < z.length; je++)
        xt = U(
          ve,
          k,
          je,
          z[je],
          G
        ), xt !== null && (e && (Xe = xt.alternate, Xe !== null && ve.delete(Xe.key === null ? je : Xe.key)), A = c(
          xt,
          A,
          je
        ), Ge === null ? ue = xt : Ge.sibling = xt, Ge = xt);
      return e && ve.forEach(function(di) {
        return t(k, di);
      }), Ue && Ca(k, je), ue;
    }
    function pe(k, A, z, G) {
      if (z == null) throw Error(r(151));
      for (var ue = null, Ge = null, ve = A, je = A = 0, xt = null, Xe = z.next(); ve !== null && !Xe.done; je++, Xe = z.next()) {
        ve.index > je ? (xt = ve, ve = null) : xt = ve.sibling;
        var di = N(k, ve, Xe.value, G);
        if (di === null) {
          ve === null && (ve = xt);
          break;
        }
        e && ve && di.alternate === null && t(k, ve), A = c(di, A, je), Ge === null ? ue = di : Ge.sibling = di, Ge = di, ve = xt;
      }
      if (Xe.done)
        return n(k, ve), Ue && Ca(k, je), ue;
      if (ve === null) {
        for (; !Xe.done; je++, Xe = z.next())
          Xe = Y(k, Xe.value, G), Xe !== null && (A = c(Xe, A, je), Ge === null ? ue = Xe : Ge.sibling = Xe, Ge = Xe);
        return Ue && Ca(k, je), ue;
      }
      for (ve = i(ve); !Xe.done; je++, Xe = z.next())
        Xe = U(ve, k, je, Xe.value, G), Xe !== null && (e && (xt = Xe.alternate, xt !== null && ve.delete(
          xt.key === null ? je : xt.key
        )), A = c(Xe, A, je), Ge === null ? ue = Xe : Ge.sibling = Xe, Ge = Xe);
      return e && ve.forEach(function(jw) {
        return t(k, jw);
      }), Ue && Ca(k, je), ue;
    }
    function _e(k, A, z, G) {
      if (typeof z == "object" && z !== null && z.type === Ae && z.key === null && z.props.ref === void 0 && (z = z.props.children), typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case W:
            e: {
              for (var ue = z.key; A !== null; ) {
                if (A.key === ue) {
                  if (ue = z.type, ue === Ae) {
                    if (A.tag === 7) {
                      n(
                        k,
                        A.sibling
                      ), G = o(
                        A,
                        z.props.children
                      ), Qa(G, z), G.return = k, k = G;
                      break e;
                    }
                  } else if (A.elementType === ue || typeof ue == "object" && ue !== null && ue.$$typeof === P && Oi(ue) === A.type) {
                    n(
                      k,
                      A.sibling
                    ), G = o(A, z.props), Qa(G, z), G.return = k, k = G;
                    break e;
                  }
                  n(k, A);
                  break;
                } else t(k, A);
                A = A.sibling;
              }
              z.type === Ae ? (G = Mi(
                z.props.children,
                k.mode,
                G,
                z.key
              ), Qa(G, z), G.return = k, k = G) : (G = so(
                z.type,
                z.key,
                z.props,
                null,
                k.mode,
                G
              ), Qa(G, z), G.return = k, k = G);
            }
            return m(k);
          case te:
            e: {
              for (ue = z.key; A !== null; ) {
                if (A.key === ue)
                  if (A.tag === 4 && A.stateNode.containerInfo === z.containerInfo && A.stateNode.implementation === z.implementation) {
                    n(
                      k,
                      A.sibling
                    ), G = o(A, z.children || []), G.return = k, k = G;
                    break e;
                  } else {
                    n(k, A);
                    break;
                  }
                else t(k, A);
                A = A.sibling;
              }
              G = ku(z, k.mode, G), G.return = k, k = G;
            }
            return m(k);
          case P:
            return z = Oi(z), _e(
              k,
              A,
              z,
              G
            );
        }
        if (Me(z))
          return ie(
            k,
            A,
            z,
            G
          );
        if (me(z)) {
          if (ue = me(z), typeof ue != "function") throw Error(r(150));
          return z = ue.call(z), pe(
            k,
            A,
            z,
            G
          );
        }
        if (typeof z.then == "function")
          return _e(
            k,
            A,
            go(z),
            G
          );
        if (z.$$typeof === ce)
          return _e(
            k,
            A,
            fo(k, z),
            G
          );
        yo(k, z);
      }
      return typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint" ? (z = "" + z, A !== null && A.tag === 6 ? (n(k, A.sibling), G = o(A, z), G.return = k, k = G) : (n(k, A), G = Nu(z, k.mode, G), G.return = k, k = G), m(k)) : n(k, A);
    }
    return function(k, A, z, G) {
      try {
        Al = 0;
        var ue = _e(
          k,
          A,
          z,
          G
        );
        return Ts = null, ue;
      } catch (ve) {
        if (ve === ws || ve === mo) throw ve;
        var Ge = ln(29, ve, null, k.mode);
        return Ge.lanes = G, Ge.return = k, Ge;
      }
    };
  }
  var Vi = bp(!0), xp = bp(!1), Fa = !1;
  function Hu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qu(e, t) {
    e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
      baseState: e.baseState,
      firstBaseUpdate: e.firstBaseUpdate,
      lastBaseUpdate: e.lastBaseUpdate,
      shared: e.shared,
      callbacks: null
    });
  }
  function Ia(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function Pa(e, t, n) {
    var i = e.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (Qe & 2) !== 0) {
      var o = i.pending;
      return o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = io(e), ap(e, null, n), t;
    }
    return ao(e, i, t, n), io(e);
  }
  function Ml(e, t, n) {
    if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, Lr(e, n);
    }
  }
  function Gu(e, t) {
    var n = e.updateQueue, i = e.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var o = null, c = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var m = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          c === null ? o = c = m : c = c.next = m, n = n.next;
        } while (n !== null);
        c === null ? o = c = t : c = c.next = t;
      } else o = c = t;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: o,
        lastBaseUpdate: c,
        shared: i.shared,
        callbacks: i.callbacks
      }, e.updateQueue = n;
      return;
    }
    e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
  }
  var Yu = !1;
  function Nl() {
    if (Yu) {
      var e = Ss;
      if (e !== null) throw e;
    }
  }
  function kl(e, t, n, i) {
    Yu = !1;
    var o = e.updateQueue;
    Fa = !1;
    var c = o.firstBaseUpdate, m = o.lastBaseUpdate, b = o.shared.pending;
    if (b !== null) {
      o.shared.pending = null;
      var w = b, _ = w.next;
      w.next = null, m === null ? c = _ : m.next = _, m = w;
      var B = e.alternate;
      B !== null && (B = B.updateQueue, b = B.lastBaseUpdate, b !== m && (b === null ? B.firstBaseUpdate = _ : b.next = _, B.lastBaseUpdate = w));
    }
    if (c !== null) {
      var Y = o.baseState;
      m = 0, B = _ = w = null, b = c;
      do {
        var N = b.lane & -536870913, U = N !== b.lane;
        if (U ? (qe & N) === N : (i & N) === N) {
          N !== 0 && N === _i && (Yu = !0), B !== null && (B = B.next = {
            lane: 0,
            tag: b.tag,
            payload: b.payload,
            callback: null,
            next: null
          });
          e: {
            var ie = e, pe = b;
            N = t;
            var _e = n;
            switch (pe.tag) {
              case 1:
                if (ie = pe.payload, typeof ie == "function") {
                  Y = ie.call(_e, Y, N);
                  break e;
                }
                Y = ie;
                break e;
              case 3:
                ie.flags = ie.flags & -65537 | 128;
              case 0:
                if (ie = pe.payload, N = typeof ie == "function" ? ie.call(_e, Y, N) : ie, N == null) break e;
                Y = Q({}, Y, N);
                break e;
              case 2:
                Fa = !0;
            }
          }
          N = b.callback, N !== null && (e.flags |= 64, U && (e.flags |= 8192), U = o.callbacks, U === null ? o.callbacks = [N] : U.push(N));
        } else
          U = {
            lane: N,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null
          }, B === null ? (_ = B = U, w = Y) : B = B.next = U, m |= N;
        if (b = b.next, b === null) {
          if (b = o.shared.pending, b === null)
            break;
          U = b, b = U.next, U.next = null, o.lastBaseUpdate = U, o.shared.pending = null;
        }
      } while (!0);
      B === null && (w = Y), o.baseState = w, o.firstBaseUpdate = _, o.lastBaseUpdate = B, c === null && (o.shared.lanes = 0), ai |= m, e.lanes = m, e.memoizedState = Y;
    }
  }
  function Sp(e, t) {
    if (typeof e != "function")
      throw Error(r(191, e));
    e.call(t);
  }
  function wp(e, t) {
    var n = e.callbacks;
    if (n !== null)
      for (e.callbacks = null, e = 0; e < n.length; e++)
        Sp(n[e], t);
  }
  var Ja = _t(null), vo = _t(0);
  function Tp(e, t) {
    e = Da, Ze(vo, e), Ze(Ja, t), Da = e | t.baseLanes;
  }
  function Xu() {
    Ze(vo, Da), Ze(Ja, Ja.current);
  }
  function Zu() {
    Da = vo.current, at(Ja), at(vo);
  }
  var Lt = _t(null), Zt = null;
  function $a(e) {
    var t = e.alternate;
    Ze(Bt, Bt.current & 1), Ze(Lt, e), Zt === null && (t === null || Ja.current !== null || t.memoizedState !== null) && (Zt = e);
  }
  function Ku(e) {
    Ze(Bt, Bt.current), Ze(Lt, e), Zt === null && (Zt = e);
  }
  function Cp(e) {
    e.tag === 22 ? (Ze(Bt, Bt.current), Ze(Lt, e), Zt === null && (Zt = e)) : Wa();
  }
  function Wa() {
    Ze(Bt, Bt.current), Ze(Lt, Lt.current);
  }
  function gn(e) {
    at(Lt), Zt === e && (Zt = null), at(Bt);
  }
  var Bt = _t(0);
  function Dl(e, t) {
    Ze(Lt, Lt.current), Ze(Bt, t);
  }
  function Qu(e) {
    at(Bt), at(Lt), Zt === e && (Zt = null);
  }
  function bo(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var n = t.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || gd(n) || yd(n)))
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        t.child.return = t, t = t.child;
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
    return null;
  }
  var Aa = 0, Re = null, et = null, vt = null, xo = !1, Cs = !1, Li = !1, So = 0, Rl = 0, Es = null, Q2 = 0;
  function ft() {
    throw Error(r(321));
  }
  function Fu(e, t) {
    if (t === null) return !1;
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!pn(e[n], t[n])) return !1;
    return !0;
  }
  function Iu(e, t, n, i, o, c) {
    return Aa = c, Re = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, le.H = e === null || e.memoizedState === null ? rg : og, Li = !1, c = n(i, o), Li = !1, Cs && (c = jp(
      t,
      n,
      i,
      o
    )), Ep(e), c;
  }
  function Ep(e) {
    le.H = Mo;
    var t = et !== null && et.next !== null;
    if (Aa = 0, vt = et = Re = null, xo = !1, Rl = 0, Es = null, t) throw Error(r(300));
    e === null || bt || (e = e.dependencies, e !== null && uo(e) && (bt = !0));
  }
  function jp(e, t, n, i) {
    Re = e;
    var o = 0;
    do {
      if (Cs && (Es = null), Rl = 0, Cs = !1, 25 <= o) throw Error(r(301));
      if (o += 1, vt = et = null, e.updateQueue != null) {
        var c = e.updateQueue;
        c.lastEffect = null, c.events = null, c.stores = null, c.memoCache != null && (c.memoCache.index = 0);
      }
      le.H = tS, c = t(n, i);
    } while (Cs);
    return c;
  }
  function F2() {
    var e = le.H, t = e.useState()[0];
    return t = typeof t.then == "function" ? _l(t) : t, e = e.useState()[0], (et !== null ? et.memoizedState : null) !== e && (Re.flags |= 1024), t;
  }
  function Pu() {
    var e = So !== 0;
    return So = 0, e;
  }
  function Ju(e, t, n) {
    t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
  }
  function $u(e) {
    if (xo) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      xo = !1;
    }
    Aa = 0, vt = et = Re = null, Cs = !1, Rl = So = 0, Es = null;
  }
  function $t() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return vt === null ? Re.memoizedState = vt = e : vt = vt.next = e, vt;
  }
  function pt() {
    if (et === null) {
      var e = Re.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = et.next;
    var t = vt === null ? Re.memoizedState : vt.next;
    if (t !== null)
      vt = t, et = e;
    else {
      if (e === null)
        throw Re.alternate === null ? Error(r(467)) : Error(r(310));
      et = e, e = {
        memoizedState: et.memoizedState,
        baseState: et.baseState,
        baseQueue: et.baseQueue,
        queue: et.queue,
        next: null
      }, vt === null ? Re.memoizedState = vt = e : vt = vt.next = e;
    }
    return vt;
  }
  function wo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function _l(e) {
    var t = Rl;
    return Rl += 1, Es === null && (Es = []), e = gp(Es, e, t), t = Re, (vt === null ? t.memoizedState : vt.next) === null && (t = t.alternate, le.H = t === null || t.memoizedState === null ? rg : og), e;
  }
  function To(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return _l(e);
      if (e.$$typeof === H) return;
      if (e.$$typeof === ce) return Vt(e);
    }
    throw Error(r(438, String(e)));
  }
  function Wu(e) {
    var t = null, n = Re.updateQueue;
    if (n !== null && (t = n.memoCache), t == null) {
      var i = Re.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
        data: i.data.map(function(o) {
          return o.slice();
        }),
        index: 0
      })));
    }
    if (t == null && (t = { data: [], index: 0 }), n === null && (n = wo(), Re.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0)
      for (n = t.data[t.index] = Array(e), i = 0; i < e; i++)
        n[i] = ke;
    return t.index++, n;
  }
  function Ma(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Co(e) {
    var t = pt();
    return ef(t, et, e);
  }
  function ef(e, t, n) {
    var i = e.queue;
    if (i === null) throw Error(r(311));
    i.lastRenderedReducer = n;
    var o = e.baseQueue, c = i.pending;
    if (c !== null) {
      if (o !== null) {
        var m = o.next;
        o.next = c.next, c.next = m;
      }
      t.baseQueue = o = c, i.pending = null;
    }
    if (c = e.baseState, o === null) e.memoizedState = c;
    else {
      t = o.next;
      var b = m = null, w = null, _ = t, B = !1;
      do {
        var Y = _.lane & -536870913;
        if (Y !== _.lane ? (qe & Y) === Y : (Aa & Y) === Y) {
          var N = _.revertLane;
          if (N === 0)
            w !== null && (w = w.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }), Y === _i && (B = !0);
          else if ((Aa & N) === N) {
            _ = _.next, N === _i && (B = !0);
            continue;
          } else
            Y = {
              lane: 0,
              revertLane: _.revertLane,
              gesture: null,
              action: _.action,
              hasEagerState: _.hasEagerState,
              eagerState: _.eagerState,
              next: null
            }, w === null ? (b = w = Y, m = c) : w = w.next = Y, Re.lanes |= N, ai |= N;
          Y = _.action, Li && n(c, Y), c = _.hasEagerState ? _.eagerState : n(c, Y);
        } else
          N = {
            lane: Y,
            revertLane: _.revertLane,
            gesture: _.gesture,
            action: _.action,
            hasEagerState: _.hasEagerState,
            eagerState: _.eagerState,
            next: null
          }, w === null ? (b = w = N, m = c) : w = w.next = N, Re.lanes |= Y, ai |= Y;
        _ = _.next;
      } while (_ !== null && _ !== t);
      if (w === null ? m = c : w.next = b, !pn(c, e.memoizedState) && (bt = !0, B && (n = Ss, n !== null)))
        throw n;
      e.memoizedState = c, e.baseState = m, e.baseQueue = w, i.lastRenderedState = c;
    }
    return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
  }
  function tf(e) {
    var t = pt(), n = t.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = e;
    var i = n.dispatch, o = n.pending, c = t.memoizedState;
    if (o !== null) {
      n.pending = null;
      var m = o = o.next;
      do
        c = e(c, m.action), m = m.next;
      while (m !== o);
      pn(c, t.memoizedState) || (bt = !0), t.memoizedState = c, t.baseQueue === null && (t.baseState = c), n.lastRenderedState = c;
    }
    return [c, i];
  }
  function Ap(e, t, n) {
    var i = Re, o = pt(), c = Ue;
    if (c) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = t();
    var m = !pn(
      (et || o).memoizedState,
      n
    );
    if (m && (o.memoizedState = n, bt = !0), o = o.queue, sf(kp.bind(null, i, o, e), [
      e
    ]), e = o.getSnapshot !== t || m || vt !== null && (vt.memoizedState.tag & 1) !== 0, js(
      e ? 9 : 8,
      { destroy: void 0 },
      Np.bind(null, i, o, n, t),
      null
    ), e) {
      if (i.flags |= 2048, tt === null) throw Error(r(349));
      c || (Aa & 127) !== 0 || Mp(i, t, n);
    }
    return n;
  }
  function Mp(e, t, n) {
    e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Re.updateQueue, t === null ? (t = wo(), Re.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
  }
  function Np(e, t, n, i) {
    t.value = n, t.getSnapshot = i, Dp(t) && Rp(e);
  }
  function kp(e, t, n) {
    return n(function() {
      Dp(t) && Rp(e);
    });
  }
  function Dp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var n = t();
      return !pn(e, n);
    } catch {
      return !0;
    }
  }
  function Rp(e) {
    var t = Ai(e, 2);
    t !== null && un(t, e, 2);
  }
  function nf(e) {
    var t = $t();
    if (typeof e == "function") {
      var n = e;
      if (e = n(), Li) {
        zt(!0);
        try {
          n();
        } finally {
          zt(!1);
        }
      }
    }
    return t.memoizedState = t.baseState = e, t.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ma,
      lastRenderedState: e
    }, t;
  }
  function _p(e, t, n, i) {
    return e.baseState = n, ef(
      e,
      et,
      typeof i == "function" ? i : Ma
    );
  }
  function I2(e, t, n, i, o) {
    if (Ao(e)) throw Error(r(485));
    if (e = t.action, e !== null) {
      var c = {
        payload: o,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          c.listeners.push(m);
        }
      };
      le.T !== null ? n(!0) : c.isTransition = !1, i(c), n = t.pending, n === null ? (c.next = t.pending = c, zp(t, c)) : (c.next = n.next, t.pending = n.next = c);
    }
  }
  function zp(e, t) {
    var n = t.action, i = t.payload, o = e.state;
    if (t.isTransition) {
      var c = le.T, m = {};
      m.types = c !== null ? c.types : null, le.T = m;
      try {
        var b = n(o, i), w = le.S;
        w !== null && w(m, b), Op(e, t, b);
      } catch (_) {
        af(e, t, _);
      } finally {
        c !== null && m.types !== null && (c.types = m.types), le.T = c;
      }
    } else
      try {
        c = n(o, i), Op(e, t, c);
      } catch (_) {
        af(e, t, _);
      }
  }
  function Op(e, t, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        Up(e, t, i);
      },
      function(i) {
        return af(e, t, i);
      }
    ) : Up(e, t, n);
  }
  function Up(e, t, n) {
    t.status = "fulfilled", t.value = n, Vp(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, zp(e, n)));
  }
  function af(e, t, n) {
    var i = e.pending;
    if (e.pending = null, i !== null) {
      i = i.next;
      do
        t.status = "rejected", t.reason = n, Vp(t), t = t.next;
      while (t !== i);
    }
    e.action = null;
  }
  function Vp(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Lp(e, t) {
    return t;
  }
  function Bp(e, t) {
    if (Ue) {
      var n = tt.formState;
      if (n !== null) {
        e: {
          var i = Re;
          if (Ue) {
            if (it) {
              t: {
                for (var o = it, c = kn; o.nodeType !== 8; ) {
                  if (!c) {
                    o = null;
                    break t;
                  }
                  if (o = Rn(
                    o.nextSibling
                  ), o === null) {
                    o = null;
                    break t;
                  }
                }
                c = o.data, o = c === "F!" || c === "F" ? o : null;
              }
              if (o) {
                it = Rn(
                  o.nextSibling
                ), i = o.data === "F!";
                break e;
              }
            }
            Za(i);
          }
          i = !1;
        }
        i && (t = n[0]);
      }
    }
    return n = $t(), n.memoizedState = n.baseState = t, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Lp,
      lastRenderedState: t
    }, n.queue = i, n = ig.bind(
      null,
      Re,
      i
    ), i.dispatch = n, i = nf(!1), c = uf.bind(
      null,
      Re,
      !1,
      i.queue
    ), i = $t(), o = {
      state: t,
      dispatch: null,
      action: e,
      pending: null
    }, i.queue = o, n = I2.bind(
      null,
      Re,
      o,
      c,
      n
    ), o.dispatch = n, i.memoizedState = e, [t, n, !1];
  }
  function Hp(e) {
    var t = pt();
    return qp(t, et, e);
  }
  function qp(e, t, n) {
    if (t = ef(
      e,
      t,
      Lp
    )[0], e = Co(Ma)[0], typeof t == "object" && t !== null && typeof t.then == "function")
      try {
        var i = _l(t);
      } catch (m) {
        throw m === ws ? mo : m;
      }
    else i = t;
    t = pt();
    var o = t.queue, c = o.dispatch;
    return n !== t.memoizedState && (Re.flags |= 2048, js(
      9,
      { destroy: void 0 },
      P2.bind(null, o, n),
      null
    )), [i, c, e];
  }
  function P2(e, t) {
    e.action = t;
  }
  function Gp(e) {
    var t = pt(), n = et;
    if (n !== null)
      return qp(t, n, e);
    pt(), t = t.memoizedState, n = pt();
    var i = n.queue.dispatch;
    return n.memoizedState = e, [t, i, !1];
  }
  function js(e, t, n, i) {
    return e = { tag: e, create: n, deps: i, inst: t, next: null }, t = Re.updateQueue, t === null && (t = wo(), Re.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
  }
  function Yp() {
    return pt().memoizedState;
  }
  function Eo(e, t, n, i) {
    var o = $t();
    Re.flags |= e, o.memoizedState = js(
      1 | t,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function jo(e, t, n, i) {
    var o = pt();
    i = i === void 0 ? null : i;
    var c = o.memoizedState.inst;
    et !== null && i !== null && Fu(i, et.memoizedState.deps) ? o.memoizedState = js(t, c, n, i) : (Re.flags |= e, o.memoizedState = js(
      1 | t,
      c,
      n,
      i
    ));
  }
  function Xp(e, t) {
    Eo(8390656, 8, e, t);
  }
  function sf(e, t) {
    jo(2048, 8, e, t);
  }
  function J2(e) {
    Re.flags |= 4;
    var t = Re.updateQueue;
    if (t === null)
      t = wo(), Re.updateQueue = t, t.events = [e];
    else {
      var n = t.events;
      n === null ? t.events = [e] : n.push(e);
    }
  }
  function Zp(e) {
    var t = pt().memoizedState;
    return J2({ ref: t, nextImpl: e }), function() {
      if ((Qe & 2) !== 0) throw Error(r(440));
      return t.impl.apply(void 0, arguments);
    };
  }
  function Kp(e, t) {
    return jo(4, 2, e, t);
  }
  function Qp(e, t) {
    return jo(4, 4, e, t);
  }
  function Fp(e, t) {
    if (typeof t == "function") {
      e = e();
      var n = t(e);
      return function() {
        typeof n == "function" ? n() : t(null);
      };
    }
    if (t != null)
      return e = e(), t.current = e, function() {
        t.current = null;
      };
  }
  function Ip(e, t, n) {
    n = n != null ? n.concat([e]) : null, jo(4, 4, Fp.bind(null, t, e), n);
  }
  function lf() {
  }
  function Pp(e, t) {
    var n = pt();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    return t !== null && Fu(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
  }
  function Jp(e, t) {
    var n = pt();
    t = t === void 0 ? null : t;
    var i = n.memoizedState;
    if (t !== null && Fu(t, i[1]))
      return i[0];
    if (i = e(), Li) {
      zt(!0);
      try {
        e();
      } finally {
        zt(!1);
      }
    }
    return n.memoizedState = [i, t], i;
  }
  function rf(e, t, n) {
    return n === void 0 || (Aa & 1073741824) !== 0 && (qe & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = n, e = r0(), Re.lanes |= e, ai |= e, n);
  }
  function $p(e, t, n, i) {
    return pn(n, t) ? n : Ja.current !== null ? (e = rf(e, n, i), pn(e, t) || (bt = !0), e) : (Aa & 106) === 0 || (Aa & 1073741824) !== 0 && (qe & 261930) === 0 ? (bt = !0, e.memoizedState = n) : (e = r0(), Re.lanes |= e, ai |= e, t);
  }
  function Wp(e, t, n, i, o) {
    var c = Se.p;
    Se.p = c !== 0 && 8 > c ? c : 8;
    var m = le.T, b = {};
    b.types = m !== null ? m.types : null, le.T = b, uf(e, !1, t, n);
    try {
      var w = o(), _ = le.S;
      if (_ !== null && _(b, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var B = K2(
          w,
          i
        );
        zl(
          e,
          t,
          B,
          xn(e)
        );
      } else
        zl(
          e,
          t,
          i,
          xn(e)
        );
    } catch (Y) {
      zl(
        e,
        t,
        { then: function() {
        }, status: "rejected", reason: Y },
        xn()
      );
    } finally {
      Se.p = c, m !== null && b.types !== null && (m.types = b.types), le.T = m;
    }
  }
  function $2() {
  }
  function of(e, t, n, i) {
    if (e.tag !== 5) throw Error(r(476));
    var o = eg(e).queue;
    Wp(
      e,
      o,
      t,
      Tt,
      n === null ? $2 : function() {
        return tg(e), n(i);
      }
    );
  }
  function eg(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Tt,
      baseState: Tt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ma,
        lastRenderedState: Tt
      },
      next: null
    };
    var n = {};
    return t.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Ma,
        lastRenderedState: n
      },
      next: null
    }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
  }
  function tg(e) {
    var t = eg(e);
    t.next === null && (t = e.alternate.memoizedState), zl(
      e,
      t.next.queue,
      {},
      xn()
    );
  }
  function cf() {
    return Vt(Zs);
  }
  function ng() {
    return pt().memoizedState;
  }
  function ag() {
    return pt().memoizedState;
  }
  function W2(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var n = xn();
          e = Ia(n);
          var i = Pa(t, e, n);
          i !== null && (un(i, t, n), Ml(i, t, n)), t = { cache: Uu() }, e.payload = t;
          return;
      }
      t = t.return;
    }
  }
  function eS(e, t, n) {
    var i = xn();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ao(e) ? sg(t, n) : (n = Au(e, t, n, i), n !== null && (un(n, e, i), lg(n, t, i)));
  }
  function ig(e, t, n) {
    var i = xn();
    zl(e, t, n, i);
  }
  function zl(e, t, n, i) {
    var o = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ao(e)) sg(t, o);
    else {
      var c = e.alternate;
      if (e.lanes === 0 && (c === null || c.lanes === 0) && (c = t.lastRenderedReducer, c !== null))
        try {
          var m = t.lastRenderedState, b = c(m, n);
          if (o.hasEagerState = !0, o.eagerState = b, pn(b, m))
            return ao(e, t, o, 0), tt === null && no(), !1;
        } catch {
        }
      if (n = Au(e, t, o, i), n !== null)
        return un(n, e, i), lg(n, t, i), !0;
    }
    return !1;
  }
  function uf(e, t, n, i) {
    if (i = {
      lane: 2,
      revertLane: ed(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ao(e)) {
      if (t) throw Error(r(479));
    } else
      t = Au(
        e,
        n,
        i,
        2
      ), t !== null && un(t, e, 2);
  }
  function Ao(e) {
    var t = e.alternate;
    return e === Re || t !== null && t === Re;
  }
  function sg(e, t) {
    Cs = xo = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function lg(e, t, n) {
    if ((n & 4194048) !== 0) {
      var i = t.lanes;
      i &= e.pendingLanes, n |= i, t.lanes = n, Lr(e, n);
    }
  }
  var Mo = {
    readContext: Vt,
    use: To,
    useCallback: ft,
    useContext: ft,
    useEffect: ft,
    useImperativeHandle: ft,
    useLayoutEffect: ft,
    useInsertionEffect: ft,
    useMemo: ft,
    useReducer: ft,
    useRef: ft,
    useState: ft,
    useDebugValue: ft,
    useDeferredValue: ft,
    useTransition: ft,
    useSyncExternalStore: ft,
    useId: ft,
    useHostTransitionStatus: ft,
    useFormState: ft,
    useActionState: ft,
    useOptimistic: ft,
    useMemoCache: ft,
    useCacheRefresh: ft,
    useEffectEvent: ft
  }, rg = {
    readContext: Vt,
    use: To,
    useCallback: function(e, t) {
      return $t().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    },
    useContext: Vt,
    useEffect: Xp,
    useImperativeHandle: function(e, t, n) {
      n = n != null ? n.concat([e]) : null, Eo(
        4194308,
        4,
        Fp.bind(null, t, e),
        n
      );
    },
    useLayoutEffect: function(e, t) {
      return Eo(4194308, 4, e, t);
    },
    useInsertionEffect: function(e, t) {
      Eo(4, 2, e, t);
    },
    useMemo: function(e, t) {
      var n = $t();
      t = t === void 0 ? null : t;
      var i = e();
      if (Li) {
        zt(!0);
        try {
          e();
        } finally {
          zt(!1);
        }
      }
      return n.memoizedState = [i, t], i;
    },
    useReducer: function(e, t, n) {
      var i = $t();
      if (n !== void 0) {
        var o = n(t);
        if (Li) {
          zt(!0);
          try {
            n(t);
          } finally {
            zt(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = eS.bind(
        null,
        Re,
        e
      ), [i.memoizedState, e];
    },
    useRef: function(e) {
      var t = $t();
      return e = { current: e }, t.memoizedState = e;
    },
    useState: function(e) {
      e = nf(e);
      var t = e.queue, n = ig.bind(null, Re, t);
      return t.dispatch = n, [e.memoizedState, n];
    },
    useDebugValue: lf,
    useDeferredValue: function(e, t) {
      var n = $t();
      return rf(n, e, t);
    },
    useTransition: function() {
      var e = nf(!1);
      return e = Wp.bind(
        null,
        Re,
        e.queue,
        !0,
        !1
      ), $t().memoizedState = e, [!1, e];
    },
    useSyncExternalStore: function(e, t, n) {
      var i = Re, o = $t();
      if (Ue) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = t(), tt === null)
          throw Error(r(349));
        (qe & 127) !== 0 || Mp(i, t, n);
      }
      o.memoizedState = n;
      var c = { value: n, getSnapshot: t };
      return o.queue = c, Xp(kp.bind(null, i, c, e), [
        e
      ]), i.flags |= 2048, js(
        9,
        { destroy: void 0 },
        Np.bind(
          null,
          i,
          c,
          n,
          t
        ),
        null
      ), n;
    },
    useId: function() {
      var e = $t(), t = tt.identifierPrefix;
      if (Ue) {
        var n = $n, i = Jn;
        n = (i & ~(1 << 32 - Xt(i) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = So++, 0 < n && (t += "H" + n.toString(32)), t += "_";
      } else
        n = Q2++, t = "_" + t + "r_" + n.toString(32) + "_";
      return e.memoizedState = t;
    },
    useHostTransitionStatus: cf,
    useFormState: Bp,
    useActionState: Bp,
    useOptimistic: function(e) {
      var t = $t();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = uf.bind(
        null,
        Re,
        !0,
        n
      ), n.dispatch = t, [e, t];
    },
    useMemoCache: Wu,
    useCacheRefresh: function() {
      return $t().memoizedState = W2.bind(
        null,
        Re
      );
    },
    useEffectEvent: function(e) {
      var t = $t(), n = { impl: e };
      return t.memoizedState = n, function() {
        if ((Qe & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, og = {
    readContext: Vt,
    use: To,
    useCallback: Pp,
    useContext: Vt,
    useEffect: sf,
    useImperativeHandle: Ip,
    useInsertionEffect: Kp,
    useLayoutEffect: Qp,
    useMemo: Jp,
    useReducer: Co,
    useRef: Yp,
    useState: function() {
      return Co(Ma);
    },
    useDebugValue: lf,
    useDeferredValue: function(e, t) {
      var n = pt();
      return $p(
        n,
        et.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = Co(Ma)[0], t = pt().memoizedState;
      return [
        typeof e == "boolean" ? e : _l(e),
        t
      ];
    },
    useSyncExternalStore: Ap,
    useId: ng,
    useHostTransitionStatus: cf,
    useFormState: Hp,
    useActionState: Hp,
    useOptimistic: function(e, t) {
      var n = pt();
      return _p(n, et, e, t);
    },
    useMemoCache: Wu,
    useCacheRefresh: ag,
    useEffectEvent: Zp
  }, tS = {
    readContext: Vt,
    use: To,
    useCallback: Pp,
    useContext: Vt,
    useEffect: sf,
    useImperativeHandle: Ip,
    useInsertionEffect: Kp,
    useLayoutEffect: Qp,
    useMemo: Jp,
    useReducer: tf,
    useRef: Yp,
    useState: function() {
      return tf(Ma);
    },
    useDebugValue: lf,
    useDeferredValue: function(e, t) {
      var n = pt();
      return et === null ? rf(n, e, t) : $p(
        n,
        et.memoizedState,
        e,
        t
      );
    },
    useTransition: function() {
      var e = tf(Ma)[0], t = pt().memoizedState;
      return [
        typeof e == "boolean" ? e : _l(e),
        t
      ];
    },
    useSyncExternalStore: Ap,
    useId: ng,
    useHostTransitionStatus: cf,
    useFormState: Gp,
    useActionState: Gp,
    useOptimistic: function(e, t) {
      var n = pt();
      return et !== null ? _p(n, et, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    },
    useMemoCache: Wu,
    useCacheRefresh: ag,
    useEffectEvent: Zp
  };
  function ff(e, t, n, i) {
    t = e.memoizedState, n = n(i, t), n = n == null ? t : Q({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
  }
  var df = {
    enqueueSetState: function(e, t, n) {
      e = e._reactInternals;
      var i = xn(), o = Ia(i);
      o.payload = t, n != null && (o.callback = n), t = Pa(e, o, i), t !== null && (un(t, e, i), Ml(t, e, i));
    },
    enqueueReplaceState: function(e, t, n) {
      e = e._reactInternals;
      var i = xn(), o = Ia(i);
      o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Pa(e, o, i), t !== null && (un(t, e, i), Ml(t, e, i));
    },
    enqueueForceUpdate: function(e, t) {
      e = e._reactInternals;
      var n = xn(), i = Ia(n);
      i.tag = 2, t != null && (i.callback = t), t = Pa(e, i, n), t !== null && (un(t, e, n), Ml(t, e, n));
    }
  };
  function cg(e, t, n, i, o, c, m) {
    return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(i, c, m) : t.prototype && t.prototype.isPureReactComponent ? !xl(n, i) || !xl(o, c) : !0;
  }
  function ug(e, t, n, i) {
    e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== e && df.enqueueReplaceState(t, t.state, null);
  }
  function Bi(e, t) {
    var n = t;
    if ("ref" in t) {
      n = {};
      for (var i in t)
        i !== "ref" && (n[i] = t[i]);
    }
    if (e = e.defaultProps) {
      n === t && (n = Q({}, n));
      for (var o in e)
        n[o] === void 0 && (n[o] = e[o]);
    }
    return n;
  }
  function fg(e) {
    to(e);
  }
  function dg(e) {
    console.error(e);
  }
  function hg(e) {
    to(e);
  }
  function No(e, t) {
    try {
      var n = e.onUncaughtError;
      n(t.value, { componentStack: t.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function mg(e, t, n) {
    try {
      var i = e.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null
      });
    } catch (o) {
      setTimeout(function() {
        throw o;
      });
    }
  }
  function hf(e, t, n) {
    return n = Ia(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      No(e, t);
    }, n;
  }
  function pg(e) {
    return e = Ia(e), e.tag = 3, e;
  }
  function gg(e, t, n, i) {
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = i.value;
      e.payload = function() {
        return o(c);
      }, e.callback = function() {
        mg(t, n, i);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (e.callback = function() {
      mg(t, n, i), typeof o != "function" && (ii === null ? ii = /* @__PURE__ */ new Set([this]) : ii.add(this));
      var b = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: b !== null ? b : ""
      });
    });
  }
  function nS(e, t, n, i, o) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (t = n.alternate, t !== null && Di(
        t,
        n,
        o,
        !0
      ), n = Lt.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Zt === null ? Po() : n.alternate === null && dt === 0 && (dt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = o, i === po ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Jf(e, i, o)), !1;
          case 22:
            return n.flags |= 65536, i === po ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Jf(e, i, o)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Jf(e, i, o), Po(), !1;
    }
    if (Ue)
      return t = Lt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== Ru && (e = Error(r(422), { cause: i }), Tl(An(e, n)))) : (i !== Ru && (t = Error(r(423), {
        cause: i
      }), Tl(
        An(t, n)
      )), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = An(i, n), o = hf(
        e.stateNode,
        i,
        o
      ), Gu(e, o), dt !== 4 && (dt = 2)), !1;
    var c = Error(r(520), { cause: i });
    if (c = An(c, n), Gl === null ? Gl = [c] : Gl.push(c), dt !== 4 && (dt = 2), t === null) return !0;
    i = An(i, n), n = t;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, e = o & -o, n.lanes |= e, e = hf(n.stateNode, i, e), Gu(n, e), !1;
        case 1:
          if (t = n.type, c = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || c !== null && typeof c.componentDidCatch == "function" && (ii === null || !ii.has(c))))
            return n.flags |= 65536, o &= -o, n.lanes |= o, o = pg(o), gg(
              o,
              e,
              n,
              i
            ), Gu(n, o), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var mf = Error(r(461)), bt = !1;
  function Ct(e, t, n, i) {
    t.child = e === null ? xp(t, null, n, i) : Vi(
      t,
      e.child,
      n,
      i
    );
  }
  function yg(e, t, n, i, o) {
    n = n.render;
    var c = t.ref;
    if ("ref" in i) {
      var m = {};
      for (var b in i)
        b !== "ref" && (m[b] = i[b]);
    } else m = i;
    return Ri(t), i = Iu(
      e,
      t,
      n,
      m,
      c,
      o
    ), b = Pu(), e !== null && !bt ? (Ju(e, t, o), Na(e, t, o)) : (Ue && b && ro(t), t.flags |= 1, Ct(e, t, i, o), t.child);
  }
  function vg(e, t, n, i, o) {
    if (e === null) {
      var c = n.type;
      return typeof c == "function" && !Mu(c) && c.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = c, bg(
        e,
        t,
        c,
        i,
        o
      )) : (e = so(
        n.type,
        null,
        i,
        t,
        t.mode,
        o
      ), e.ref = t.ref, e.return = t, t.child = e);
    }
    if (c = e.child, !wf(e, o)) {
      var m = c.memoizedProps;
      if (n = n.compare, n = n !== null ? n : xl, n(m, i) && e.ref === t.ref)
        return Na(e, t, o);
    }
    return t.flags |= 1, e = Ta(c, i), e.ref = t.ref, e.return = t, t.child = e;
  }
  function bg(e, t, n, i, o) {
    if (e !== null) {
      var c = e.memoizedProps;
      if (xl(c, i) && e.ref === t.ref)
        if (bt = !1, t.pendingProps = i = c, wf(e, o))
          (e.flags & 131072) !== 0 && (bt = !0);
        else
          return t.lanes = e.lanes, Na(e, t, o);
    }
    return pf(
      e,
      t,
      n,
      i,
      o
    );
  }
  function xg(e, t, n, i) {
    var o = i.children, c = e !== null ? e.memoizedState : null;
    if (e === null && t.stateNode === null && (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (c = c !== null ? c.baseLanes | n : n, e !== null) {
          for (i = t.child = e.child, o = 0; i !== null; )
            o = o | i.lanes | i.childLanes, i = i.sibling;
          i = o & ~c;
        } else i = 0, t.child = null;
        return Sg(
          e,
          t,
          c,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && ho(
          t,
          c !== null ? c.cachePool : null
        ), c !== null ? Tp(t, c) : Xu(), Cp(t);
      else
        return i = t.lanes = 536870912, Sg(
          e,
          t,
          c !== null ? c.baseLanes | n : n,
          n,
          i
        );
    } else
      c !== null ? (ho(t, c.cachePool), Tp(t, c), Wa(), t.memoizedState = null) : (e !== null && ho(t, null), Xu(), Wa());
    return Ct(e, t, o, n), t.child;
  }
  function Ol(e, t) {
    return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), t.sibling;
  }
  function Sg(e, t, n, i, o) {
    var c = Lu();
    return c = c === null ? null : { parent: yt._currentValue, pool: c }, t.memoizedState = {
      baseLanes: n,
      cachePool: c
    }, e !== null && ho(t, null), Xu(), Cp(t), e !== null && Di(e, t, i, !0), t.childLanes = o, null;
  }
  function ko(e, t) {
    return t = Do(
      { mode: t.mode, children: t.children },
      e.mode
    ), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function wg(e, t, n) {
    return Vi(t, e.child, null, n), e = ko(t, t.pendingProps), e.flags |= 2, gn(t), t.memoizedState = null, e;
  }
  function aS(e, t, n) {
    var i = t.pendingProps, o = (t.flags & 128) !== 0;
    if (t.flags &= -129, e === null) {
      if (Ue) {
        if (i.mode === "hidden")
          return e = ko(t, i), t.lanes = 536870912, e.memoizedState = { baseLanes: 0, cachePool: null }, Ol(null, e);
        if (Ku(t), (e = it) ? (e = F0(
          e,
          kn
        ), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ya !== null ? { id: Jn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = sp(e), n.return = t, t.child = n, Nt = t, it = null)) : e = null, e === null) throw Za(t);
        return t.lanes = 536870912, null;
      }
      return ko(t, i);
    }
    var c = e.memoizedState;
    if (c !== null) {
      var m = c.dehydrated;
      if (Ku(t), o)
        if (t.flags & 256)
          t.flags &= -257, t = wg(
            e,
            t,
            n
          );
        else if (t.memoizedState !== null)
          t.child = e.child, t.flags |= 128, t = null;
        else throw Error(r(558));
      else if (bt || Di(e, t, n, !1), o = (n & e.childLanes) !== 0, bt || o) {
        if (Ja.current === null) {
          if (i = tt, i !== null && (m = Br(i, n), m !== 0 && m !== c.retryLane))
            throw c.retryLane = m, Ai(e, m), un(i, e, m), mf;
          Po();
        }
        t = wg(
          e,
          t,
          n
        );
      } else
        e = c.treeContext, it = Rn(m.nextSibling), Nt = t, Ue = !0, Xa = null, kn = !1, e !== null && op(t, e), t = ko(t, i), t.flags |= 134221824;
      return t;
    }
    return e = Ta(e.child, {
      mode: i.mode,
      children: i.children
    }), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function As(e, t) {
    var n = t.ref;
    if (n === null)
      e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (e === null || e.ref !== n) && (t.flags |= 4194816);
    }
  }
  function pf(e, t, n, i, o) {
    return Ri(t), n = Iu(
      e,
      t,
      n,
      i,
      void 0,
      o
    ), i = Pu(), e !== null && !bt ? (Ju(e, t, o), Na(e, t, o)) : (Ue && i && ro(t), t.flags |= 1, Ct(e, t, n, o), t.child);
  }
  function Tg(e, t, n, i, o, c) {
    return Ri(t), t.updateQueue = null, n = jp(
      t,
      i,
      n,
      o
    ), Ep(e), i = Pu(), e !== null && !bt ? (Ju(e, t, c), Na(e, t, c)) : (Ue && i && ro(t), t.flags |= 1, Ct(e, t, n, c), t.child);
  }
  function Cg(e, t, n, i, o) {
    if (Ri(t), t.stateNode === null) {
      var c = ys, m = n.contextType;
      typeof m == "object" && m !== null && (c = Vt(m)), c = new n(i, c), t.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, c.updater = df, t.stateNode = c, c._reactInternals = t, c = t.stateNode, c.props = i, c.state = t.memoizedState, c.refs = {}, Hu(t), m = n.contextType, c.context = typeof m == "object" && m !== null ? Vt(m) : ys, c.state = t.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (ff(
        t,
        n,
        m,
        i
      ), c.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (m = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), m !== c.state && df.enqueueReplaceState(c, c.state, null), kl(t, i, c, o), Nl(), c.state = t.memoizedState), typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !0;
    } else if (e === null) {
      c = t.stateNode;
      var b = t.memoizedProps, w = Bi(n, b);
      c.props = w;
      var _ = c.context, B = n.contextType;
      m = ys, typeof B == "object" && B !== null && (m = Vt(B));
      var Y = n.getDerivedStateFromProps;
      B = typeof Y == "function" || typeof c.getSnapshotBeforeUpdate == "function", b = t.pendingProps !== b, B || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (b || _ !== m) && ug(
        t,
        c,
        i,
        m
      ), Fa = !1;
      var N = t.memoizedState;
      c.state = N, kl(t, i, c, o), Nl(), _ = t.memoizedState, b || N !== _ || Fa ? (typeof Y == "function" && (ff(
        t,
        n,
        Y,
        i
      ), _ = t.memoizedState), (w = Fa || cg(
        t,
        n,
        w,
        i,
        N,
        _,
        m
      )) ? (B || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount()), typeof c.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = i, t.memoizedState = _), c.props = i, c.state = _, c.context = m, i = w) : (typeof c.componentDidMount == "function" && (t.flags |= 4194308), i = !1);
    } else {
      c = t.stateNode, qu(e, t), m = t.memoizedProps, B = Bi(n, m), c.props = B, Y = t.pendingProps, N = c.context, _ = n.contextType, w = ys, typeof _ == "object" && _ !== null && (w = Vt(_)), b = n.getDerivedStateFromProps, (_ = typeof b == "function" || typeof c.getSnapshotBeforeUpdate == "function") || typeof c.UNSAFE_componentWillReceiveProps != "function" && typeof c.componentWillReceiveProps != "function" || (m !== Y || N !== w) && ug(
        t,
        c,
        i,
        w
      ), Fa = !1, N = t.memoizedState, c.state = N, kl(t, i, c, o), Nl();
      var U = t.memoizedState;
      m !== Y || N !== U || Fa || e !== null && e.dependencies !== null && uo(e.dependencies) ? (typeof b == "function" && (ff(
        t,
        n,
        b,
        i
      ), U = t.memoizedState), (B = Fa || cg(
        t,
        n,
        B,
        i,
        N,
        U,
        w
      ) || e !== null && e.dependencies !== null && uo(e.dependencies)) ? (_ || typeof c.UNSAFE_componentWillUpdate != "function" && typeof c.componentWillUpdate != "function" || (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, U, w), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(
        i,
        U,
        w
      )), typeof c.componentDidUpdate == "function" && (t.flags |= 4), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof c.componentDidUpdate != "function" || m === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = U), c.props = i, c.state = U, c.context = w, i = B) : (typeof c.componentDidUpdate != "function" || m === e.memoizedProps && N === e.memoizedState || (t.flags |= 4), typeof c.getSnapshotBeforeUpdate != "function" || m === e.memoizedProps && N === e.memoizedState || (t.flags |= 1024), i = !1);
    }
    return c = i, As(e, t), i = (t.flags & 128) !== 0, c || i ? (c = t.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : c.render(), t.flags |= 1, e !== null && i ? (t.child = Vi(
      t,
      e.child,
      null,
      o
    ), t.child = Vi(
      t,
      null,
      n,
      o
    )) : Ct(e, t, n, o), t.memoizedState = c.state, e = t.child) : e = Na(
      e,
      t,
      o
    ), e;
  }
  function Eg(e, t, n, i) {
    return Ni(), t.flags |= 256, Ct(e, t, n, i), t.child;
  }
  var gf = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function yf(e) {
    return { baseLanes: e, cachePool: mp() };
  }
  function vf(e, t, n) {
    return e = e !== null ? e.childLanes & ~n : 0, t && (e |= bn), e;
  }
  function jg(e, t, n) {
    var i = t.pendingProps, o = !1, c = (t.flags & 128) !== 0, m;
    if ((m = c) || (m = e !== null && e.memoizedState === null ? !1 : (Bt.current & 2) !== 0), m && (o = !0, t.flags &= -129), m = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
      if (Ue) {
        if (o ? $a(t) : Wa(), (e = it) ? (e = F0(
          e,
          kn
        ), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
          dehydrated: e,
          treeContext: Ya !== null ? { id: Jn, overflow: $n } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = sp(e), n.return = t, t.child = n, Nt = t, it = null)) : e = null, e === null) throw Za(t);
        return yd(e) ? t.lanes = 32 : t.lanes = 536870912, null;
      }
      return c = i.children, i = i.fallback, o ? (Wa(), o = t.mode, c = Do(
        { mode: "hidden", children: c },
        o
      ), i = Mi(
        i,
        o,
        n,
        null
      ), c.return = t, i.return = t, c.sibling = i, t.child = c, i = t.child, i.memoizedState = yf(n), i.childLanes = vf(
        e,
        m,
        n
      ), t.memoizedState = gf, Ol(null, i)) : ($a(t), bf(t, c));
    }
    var b = e.memoizedState;
    if (b !== null) {
      var w = b.dehydrated;
      if (w !== null)
        return iS(
          e,
          t,
          c,
          m,
          i,
          w,
          b,
          n
        );
    }
    return o ? (Wa(), o = i.fallback, c = t.mode, b = e.child, w = b.sibling, i = Ta(b, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = b.subtreeFlags & 1206910976, w !== null ? o = Ta(w, o) : (o = Mi(
      o,
      c,
      n,
      null
    ), o.flags |= 2), o.return = t, i.return = t, i.sibling = o, t.child = i, Ol(null, i), i = t.child, o = e.child.memoizedState, o === null ? o = yf(n) : (c = o.cachePool, c !== null ? (b = yt._currentValue, c = c.parent !== b ? { parent: b, pool: b } : c) : c = mp(), o = {
      baseLanes: o.baseLanes | n,
      cachePool: c
    }), i.memoizedState = o, i.childLanes = vf(
      e,
      m,
      n
    ), t.memoizedState = gf, Ol(e.child, i)) : ($a(t), n = e.child, e = n.sibling, n = Ta(n, {
      mode: "visible",
      children: i.children
    }), n.return = t, n.sibling = null, e !== null && (m = t.deletions, m === null ? (t.deletions = [e], t.flags |= 16) : m.push(e)), t.child = n, t.memoizedState = null, n);
  }
  function bf(e, t) {
    return t = Do(
      { mode: "visible", children: t },
      e.mode
    ), t.return = e, e.child = t;
  }
  function Do(e, t) {
    return e = ln(22, e, null, t), e.lanes = 0, e;
  }
  function Ro(e, t, n) {
    return Vi(t, e.child, null, n), e = bf(
      t,
      t.pendingProps.children
    ), e.flags |= 2, t.memoizedState = null, e;
  }
  function iS(e, t, n, i, o, c, m, b) {
    if (n)
      return t.flags & 256 ? ($a(t), t.flags &= -257, Ro(
        e,
        t,
        b
      )) : t.memoizedState !== null ? (Wa(), t.child = e.child, t.flags |= 128, null) : (Wa(), c = o.fallback, m = t.mode, o = Do(
        { mode: "visible", children: o.children },
        m
      ), c = Mi(
        c,
        m,
        b,
        null
      ), c.flags |= 2, o.return = t, c.return = t, o.sibling = c, t.child = o, Vi(t, e.child, null, b), o = t.child, o.memoizedState = yf(b), o.childLanes = vf(
        e,
        i,
        b
      ), t.memoizedState = gf, Ol(null, o));
    if ($a(t), yd(c)) {
      if (i = c.nextSibling && c.nextSibling.dataset, i) var w = i.dgst;
      return i = w, i !== "" && (o = Error(r(419)), o.stack = "", o.digest = i, Tl({ value: o, source: null, stack: null })), Ro(
        e,
        t,
        b
      );
    }
    if (bt || Di(e, t, b, !1), i = (b & e.childLanes) !== 0, bt || i) {
      if (Ja.current !== null)
        return Ro(
          e,
          t,
          b
        );
      if (i = tt, i !== null && (o = Br(
        i,
        b
      ), o !== 0 && o !== m.retryLane))
        throw m.retryLane = o, Ai(e, o), un(i, e, o), mf;
      return gd(c) || Po(), Ro(
        e,
        t,
        b
      );
    }
    return gd(c) ? (t.flags |= 192, t.child = e.child, null) : (e = m.treeContext, it = Rn(c.nextSibling), Nt = t, Ue = !0, Xa = null, kn = !1, e !== null && op(t, e), t = bf(
      t,
      o.children
    ), t.flags |= 134221824, t);
  }
  function Ag(e, t, n) {
    e.lanes |= t;
    var i = e.alternate;
    i !== null && (i.lanes |= t), co(e.return, t, n);
  }
  function Mg(e) {
    for (var t = null; e !== null; ) {
      var n = e.alternate;
      n !== null && bo(n) === null && (t = e), e = e.sibling;
    }
    return t;
  }
  function _o(e, t, n, i, o, c) {
    var m = e.memoizedState;
    m === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: o,
      treeForkCount: c
    } : (m.isBackwards = t, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = n, m.tailMode = o, m.treeForkCount = c);
  }
  function xf(e) {
    var t = e.child;
    for (e.child = null; t !== null; ) {
      var n = t.sibling;
      t.sibling = e.child, e.child = t, t = n;
    }
  }
  function Sf(e, t, n) {
    var i = t.pendingProps, o = i.revealOrder, c = i.tail;
    i = i.children;
    var m = Bt.current;
    if (t.flags & 128)
      return Dl(t, m), null;
    var b = (m & 2) !== 0;
    if (b ? (m = m & 1 | 2, t.flags |= 128) : m &= 1, Dl(t, m), o === "backwards" && e !== null ? (xf(e), Ct(e, t, i, n), xf(e)) : Ct(e, t, i, n), i = Ue ? wl : 0, !b && e !== null && (e.flags & 128) !== 0)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13)
          e.memoizedState !== null && Ag(e, n, t);
        else if (e.tag === 19)
          Ag(e, n, t);
        else if (e.child !== null) {
          e.child.return = e, e = e.child;
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t)
            break e;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    switch (o) {
      case "backwards":
        n = Mg(t.child), n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null, xf(t)), _o(
          t,
          !0,
          o,
          null,
          c,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (e = o.alternate, e !== null && bo(e) === null) {
            t.child = o;
            break;
          }
          e = o.sibling, o.sibling = n, n = o, o = e;
        }
        _o(
          t,
          !0,
          n,
          null,
          c,
          i
        );
        break;
      case "together":
        _o(
          t,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      case "independent":
        t.memoizedState = null;
        break;
      default:
        n = Mg(t.child), n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), _o(
          t,
          !1,
          o,
          n,
          c,
          i
        );
    }
    return t.child;
  }
  function Ng(e, t, n) {
    var i = t.pendingProps;
    return Ka(t, t.type, i.value), Ct(e, t, i.children, n), t.child;
  }
  function Na(e, t, n) {
    if (e !== null && (t.dependencies = e.dependencies), ai |= t.lanes, (n & t.childLanes) === 0)
      if (e !== null) {
        if (Di(
          e,
          t,
          n,
          !1
        ), (n & t.childLanes) === 0)
          return null;
      } else return null;
    if (e !== null && t.child !== e.child)
      throw Error(r(153));
    if (t.child !== null) {
      for (e = t.child, n = Ta(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
        e = e.sibling, n = n.sibling = Ta(e, e.pendingProps), n.return = t;
      n.sibling = null;
    }
    return t.child;
  }
  function wf(e, t) {
    return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && uo(e)));
  }
  function sS(e, t, n) {
    switch (t.tag) {
      case 3:
        we(t, t.stateNode.containerInfo), Ka(t, yt, e.memoizedState.cache), Ni();
        break;
      case 27:
      case 5:
        Qn(t);
        break;
      case 4:
        we(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ka(
          t,
          t.type,
          t.memoizedProps.value
        );
        break;
      case 31:
        if (t.memoizedState !== null)
          return t.flags |= 128, Ku(t), null;
        break;
      case 13:
        var i = t.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return $a(t), t.flags |= 128, null;
          i = Di(
            e,
            t,
            n,
            !1
          );
          var o = t.child.childLanes;
          return i || (n & o) !== 0 ? jg(e, t, n) : ($a(t), e = Na(
            e,
            t,
            n
          ), e !== null ? e.sibling : null);
        }
        $a(t);
        break;
      case 19:
        if (t.flags & 128)
          return Sf(
            e,
            t,
            n
          );
        if (o = (e.flags & 128) !== 0, i = (n & t.childLanes) !== 0, i || (Di(
          e,
          t,
          n,
          !1
        ), i = (n & t.childLanes) !== 0), o) {
          if (i)
            return Sf(
              e,
              t,
              n
            );
          t.flags |= 128;
        }
        if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Dl(t, Bt.current), i) break;
        return null;
      case 22:
        return t.lanes = 0, xg(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        Ka(t, yt, e.memoizedState.cache);
    }
    return Na(e, t, n);
  }
  function kg(e, t, n) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps)
        bt = !0;
      else {
        if (!wf(e, n) && (t.flags & 128) === 0)
          return bt = !1, sS(
            e,
            t,
            n
          );
        bt = (e.flags & 131072) !== 0;
      }
    else
      bt = !1, Ue && (t.flags & 1048576) !== 0 && rp(t, wl, t.index);
    switch (t.lanes = 0, t.tag) {
      case 16:
        e: {
          var i = t.pendingProps;
          if (e = Oi(t.elementType), t.type = e, typeof e == "function")
            Mu(e) ? (i = Bi(e, i), t.tag = 1, t = Cg(
              null,
              t,
              e,
              i,
              n
            )) : (t.tag = 0, t = pf(
              null,
              t,
              e,
              i,
              n
            ));
          else {
            if (e != null) {
              var o = e.$$typeof;
              if (o === Z) {
                t.tag = 11, t = yg(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (o === he) {
                t.tag = 14, t = vg(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (o === ce) {
                t.tag = 10, t.type = e, t = Ng(
                  null,
                  t,
                  n
                );
                break e;
              }
            }
            throw t = xe(e) || e, Error(r(306, t, ""));
          }
        }
        return t;
      case 0:
        return pf(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 1:
        return i = t.type, o = Bi(
          i,
          t.pendingProps
        ), Cg(
          e,
          t,
          i,
          o,
          n
        );
      case 3:
        e: {
          if (we(
            t,
            t.stateNode.containerInfo
          ), e === null) throw Error(r(387));
          i = t.pendingProps;
          var c = t.memoizedState;
          o = c.element, qu(e, t), kl(t, i, null, n);
          var m = t.memoizedState;
          if (i = m.cache, Ka(t, yt, i), i !== c.cache && Ou(
            t,
            [yt],
            n,
            !0
          ), Nl(), i = m.element, c.isDehydrated)
            if (c = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, t.updateQueue.baseState = c, t.memoizedState = c, t.flags & 256) {
              t = Eg(
                e,
                t,
                i,
                n
              );
              break e;
            } else if (i !== o) {
              o = An(
                Error(r(424)),
                t
              ), Tl(o), t = Eg(
                e,
                t,
                i,
                n
              );
              break e;
            } else
              for (e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, it = Rn(e.firstChild), Nt = t, Ue = !0, Xa = null, kn = !0, n = xp(
                t,
                null,
                i,
                n
              ), t.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (Ni(), i === o) {
              t = Na(
                e,
                t,
                n
              );
              break e;
            }
            Ct(e, t, i, n);
          }
          t = t.child;
        }
        return t;
      case 26:
        return As(e, t), e === null ? (n = ty(
          t.type,
          null,
          t.pendingProps,
          null
        )) ? t.memoizedState = n : Ue || (t.stateNode = z0(
          t.type,
          t.pendingProps,
          I.current,
          t
        )) : t.memoizedState = ty(
          t.type,
          e.memoizedProps,
          t.pendingProps,
          e.memoizedState
        ), null;
      case 27:
        return Qn(t), e === null && Ue && (i = t.stateNode = J0(
          t.type,
          t.pendingProps,
          I.current
        ), Nt = t, kn = !0, o = it, ri(t.type) ? (vd = o, it = Rn(i.firstChild)) : it = o), Ct(
          e,
          t,
          t.pendingProps.children,
          n
        ), As(e, t), e === null && (t.flags |= 4194304), t.child;
      case 5:
        return e === null && Ue && ((o = i = it) && (i = WS(
          i,
          t.type,
          t.pendingProps,
          kn
        ), i !== null ? (t.stateNode = i, Nt = t, it = Rn(i.firstChild), kn = !1, o = !0) : o = !1), o || Za(t)), Qn(t), o = t.type, c = t.pendingProps, m = e !== null ? e.memoizedProps : null, i = c.children, cd(o, c) ? i = null : m !== null && cd(o, m) && (t.flags |= 32), t.memoizedState !== null && (o = Iu(
          e,
          t,
          F2,
          null,
          null,
          n
        ), Zs._currentValue = o), As(e, t), Ct(e, t, i, n), t.child;
      case 6:
        return e === null && Ue && ((e = n = it) && (n = ew(
          n,
          t.pendingProps,
          kn
        ), n !== null ? (t.stateNode = n, Nt = t, it = null, e = !0) : e = !1), e || Za(t)), null;
      case 13:
        return jg(e, t, n);
      case 4:
        return we(
          t,
          t.stateNode.containerInfo
        ), i = t.pendingProps, e === null ? t.child = Vi(
          t,
          null,
          i,
          n
        ) : Ct(e, t, i, n), t.child;
      case 11:
        return yg(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 7:
        return i = t.pendingProps, As(e, t), Ct(e, t, i, n), t.child;
      case 8:
        return Ct(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 12:
        return Ct(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 10:
        return Ng(e, t, n);
      case 9:
        return o = t.type._context, i = t.pendingProps.children, Ri(t), o = Vt(o), i = i(o), t.flags |= 1, Ct(e, t, i, n), t.child;
      case 14:
        return vg(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 15:
        return bg(
          e,
          t,
          t.type,
          t.pendingProps,
          n
        );
      case 19:
        return Sf(e, t, n);
      case 31:
        return aS(e, t, n);
      case 22:
        return xg(
          e,
          t,
          n,
          t.pendingProps
        );
      case 24:
        return Ri(t), i = Vt(yt), e === null ? (o = Lu(), o === null && (o = tt, c = Uu(), o.pooledCache = c, c.refCount++, c !== null && (o.pooledCacheLanes |= n), o = c), t.memoizedState = { parent: i, cache: o }, Hu(t), Ka(t, yt, o)) : ((e.lanes & n) !== 0 && (qu(e, t), kl(t, null, null, n), Nl()), o = e.memoizedState, c = t.memoizedState, o.parent !== i ? (o = { parent: i, cache: i }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), Ka(t, yt, i)) : (i = c.cache, Ka(t, yt, i), i !== o.cache && Ou(
          t,
          [yt],
          n,
          !0
        ))), Ct(
          e,
          t,
          t.pendingProps.children,
          n
        ), t.child;
      case 30:
        return t.stateNode === null && (t.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), i = t.pendingProps, i.name != null && i.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : Ue && ro(t), e !== null && e.memoizedProps.name !== i.name ? t.flags |= 4194816 : As(e, t), Ct(e, t, i.children, n), t.child;
      case 29:
        throw t.pendingProps;
    }
    throw Error(r(156, t.tag));
  }
  function ka(e) {
    e.flags |= 4;
  }
  function Tf(e, t, n, i, o) {
    var c;
    if ((c = (e.mode & 32) !== 0) && (c = n === null ? sy(t, i) : sy(t, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), c) {
      if (e.flags |= 16777216, (o & 335544128) === o)
        if (e.stateNode.complete) e.flags |= 8192;
        else if (f0()) e.flags |= 8192;
        else
          throw Ui = po, Bu;
    } else e.flags &= -16777217;
  }
  function Dg(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (e.flags |= 16777216, !ly(t))
      if (f0()) e.flags |= 8192;
      else
        throw Ui = po, Bu;
  }
  function zo(e, t) {
    t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Ur() : 536870912, e.lanes |= t, Rs |= t);
  }
  function Ul(e, t) {
    if (!Ue)
      switch (e.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = e.tail, i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
          break;
        default:
          for (t = e.tail, n = null; t !== null; )
            t.alternate !== null && (n = t), t = t.sibling;
          n === null ? e.tail = null : n.sibling = null;
      }
  }
  function st(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
    if (t)
      for (var o = e.child; o !== null; )
        n |= o.lanes | o.childLanes, i |= o.subtreeFlags & 1206910976, i |= o.flags & 1206910976, o.return = e, o = o.sibling;
    else
      for (o = e.child; o !== null; )
        n |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
    return e.subtreeFlags |= i, e.childLanes = n, t;
  }
  function lS(e, t, n) {
    var i = t.pendingProps;
    switch (Du(t), t.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return st(t), null;
      case 1:
        return st(t), null;
      case 3:
        return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), ja(yt), ot(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (xs(t) ? ka(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, _u())), st(t), null;
      case 26:
        var o = t.type, c = t.memoizedState;
        return e === null ? (ka(t), c !== null ? (st(t), Dg(t, c)) : (st(t), Tf(
          t,
          o,
          null,
          i,
          n
        ))) : c ? c !== e.memoizedState ? (ka(t), st(t), Dg(t, c)) : (st(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== i && ka(t), st(t), Tf(
          t,
          o,
          e,
          i,
          n
        )), null;
      case 27:
        if (Tn(t), n = I.current, o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && ka(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(r(166));
            return st(t), t.subtreeFlags &= -33554433, null;
          }
          e = R.current, xs(t) ? cp(t) : (e = J0(o, i, n), t.stateNode = e, ka(t));
        }
        return st(t), t.subtreeFlags &= -33554433, null;
      case 5:
        if (Tn(t), o = t.type, e !== null && t.stateNode != null)
          e.memoizedProps !== i && ka(t);
        else {
          if (!i) {
            if (t.stateNode === null)
              throw Error(r(166));
            return st(t), t.subtreeFlags &= -33554433, null;
          }
          if (c = R.current, xs(t))
            cp(t);
          else {
            var m = Ql(
              I.current
            );
            switch (c) {
              case 1:
                c = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  o
                );
                break;
              case 2:
                c = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  o
                );
                break;
              default:
                switch (o) {
                  case "svg":
                    c = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      o
                    );
                    break;
                  case "math":
                    c = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      o
                    );
                    break;
                  case "script":
                    c = m.createElement("div"), c.innerHTML = "<script><\/script>", c = c.removeChild(
                      c.firstChild
                    );
                    break;
                  case "select":
                    c = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? c.multiple = !0 : i.size && (c.size = i.size);
                    break;
                  default:
                    c = typeof i.is == "string" ? m.createElement(o, { is: i.is }) : m.createElement(o);
                }
            }
            c[lt] = t, c[Ot] = i;
            e: for (m = t.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                c.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === t) break e;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === t)
                  break e;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            t.stateNode = c;
            e: switch (qt(c, o, i), o) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break e;
              case "img":
                i = !0;
                break e;
              default:
                i = !1;
            }
            i && ka(t);
          }
        }
        return st(t), t.subtreeFlags &= -33554433, Tf(
          t,
          t.type,
          e === null ? null : e.memoizedProps,
          t.pendingProps,
          n
        ), null;
      case 6:
        if (e && t.stateNode != null)
          e.memoizedProps !== i && ka(t);
        else {
          if (typeof i != "string" && t.stateNode === null)
            throw Error(r(166));
          if (e = I.current, xs(t)) {
            if (e = t.stateNode, n = t.memoizedProps, i = null, o = Nt, o !== null)
              switch (o.tag) {
                case 27:
                case 5:
                  i = o.memoizedProps;
              }
            e[lt] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || k0(e.nodeValue, n)), e || Za(t, !0);
          } else
            e = Ql(e).createTextNode(
              i
            ), e[lt] = t, t.stateNode = e;
        }
        return st(t), null;
      case 31:
        if (n = t.memoizedState, e === null || e.memoizedState !== null) {
          if (i = xs(t), n !== null) {
            if (e === null) {
              if (!i) throw Error(r(318));
              if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
              e[lt] = t;
            } else
              Ni(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), e = !1;
          } else
            n = _u(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
          if (!e)
            return t.flags & 256 ? (gn(t), t) : (gn(t), null);
          if ((t.flags & 128) !== 0)
            throw Error(r(558));
        }
        return st(t), null;
      case 13:
        if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          if (o = xs(t), i !== null && i.dehydrated !== null) {
            if (e === null) {
              if (!o) throw Error(r(318));
              if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(r(317));
              o[lt] = t;
            } else
              Ni(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
            st(t), o = !1;
          } else
            o = _u(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
          if (!o)
            return t.flags & 256 ? (gn(t), t) : (gn(t), null);
        }
        return gn(t), (t.flags & 128) !== 0 ? (t.lanes = n, t) : (n = i !== null, e = e !== null && e.memoizedState !== null, n && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), c = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (c = i.memoizedState.cachePool.pool), c !== o && (i.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), zo(t, t.updateQueue), st(t), null);
      case 4:
        return ot(), e === null && id(t.stateNode.containerInfo), t.flags |= 67108864, st(t), null;
      case 10:
        return ja(t.type), st(t), null;
      case 19:
        if (Qu(t), i = t.memoizedState, i === null) return st(t), null;
        if (o = (t.flags & 128) !== 0, c = i.rendering, c === null)
          if (o) Ul(i, !1);
          else {
            if (dt !== 0 || e !== null && (e.flags & 128) !== 0)
              for (e = t.child; e !== null; ) {
                if (c = bo(e), c !== null) {
                  for (t.flags |= 128, Ul(i, !1), e = c.updateQueue, t.updateQueue = e, zo(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                    ip(n, e), n = n.sibling;
                  return Dl(
                    t,
                    Bt.current & 1 | 2
                  ), Ue && Ca(t, i.treeForkCount), t.child;
                }
                e = e.sibling;
              }
            i.tail !== null && Ft() > Ko && (t.flags |= 128, o = !0, Ul(i, !1), t.lanes = 4194304);
          }
        else {
          if (!o)
            if (e = bo(c), e !== null) {
              if (t.flags |= 128, o = !0, e = e.updateQueue, t.updateQueue = e, zo(t, e), Ul(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !c.alternate && !Ue)
                return st(t), null;
            } else
              2 * Ft() - i.renderingStartTime > Ko && n !== 536870912 && (t.flags |= 128, o = !0, Ul(i, !1), t.lanes = 4194304);
          i.isBackwards ? (c.sibling = t.child, t.child = c) : (e = i.last, e !== null ? e.sibling = c : t.child = c, i.last = c);
        }
        if (i.tail !== null) {
          e = i.tail;
          e: {
            for (n = e; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break e;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return i.rendering = e, i.tail = e.sibling, i.renderingStartTime = Ft(), e.sibling = null, c = Bt.current, c = o ? c & 1 | 2 : c & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || Ue ? Dl(t, c) : (n = c, Ze(Lt, t), Ze(Bt, n), Zt === null && (Zt = t)), Ue && Ca(t, i.treeForkCount), e;
        }
        return st(t), null;
      case 22:
      case 23:
        return gn(t), Zu(), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (st(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : st(t), n = t.updateQueue, n !== null && zo(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && at(zi), null;
      case 24:
        return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), ja(yt), st(t), null;
      case 25:
        return null;
      case 30:
        return t.flags |= 33554432, st(t), null;
    }
    throw Error(r(156, t.tag));
  }
  function rS(e, t) {
    switch (Du(t), t.tag) {
      case 1:
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 3:
        return ja(yt), ot(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
      case 26:
      case 27:
      case 5:
        return Tn(t), null;
      case 31:
        if (t.memoizedState !== null) {
          if (gn(t), t.alternate === null)
            throw Error(r(340));
          Ni();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 13:
        if (gn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
          if (t.alternate === null)
            throw Error(r(340));
          Ni();
        }
        return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 19:
        return Qu(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
      case 4:
        return ot(), null;
      case 10:
        return ja(t.type), null;
      case 22:
      case 23:
        return gn(t), Zu(), e !== null && at(zi), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
      case 24:
        return ja(yt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Rg(e, t) {
    switch (Du(t), t.tag) {
      case 3:
        ja(yt), ot();
        break;
      case 26:
      case 27:
      case 5:
        Tn(t);
        break;
      case 4:
        ot();
        break;
      case 31:
        t.memoizedState !== null && gn(t);
        break;
      case 13:
        gn(t);
        break;
      case 19:
        Qu(t);
        break;
      case 10:
        ja(t.type);
        break;
      case 22:
      case 23:
        gn(t), Zu(), e !== null && at(zi);
        break;
      case 24:
        ja(yt);
    }
  }
  function Vl(e, t) {
    try {
      var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var o = i.next;
        n = o;
        do {
          if ((n.tag & e) === e) {
            i = void 0;
            var c = n.create, m = n.inst;
            i = c(), m.destroy = i;
          }
          n = n.next;
        } while (n !== o);
      }
    } catch (b) {
      Je(t, t.return, b);
    }
  }
  function ei(e, t, n) {
    try {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next;
        i = c;
        do {
          if ((i.tag & e) === e) {
            var m = i.inst, b = m.destroy;
            if (b !== void 0) {
              m.destroy = void 0, o = t;
              var w = n, _ = b;
              try {
                _();
              } catch (B) {
                Je(
                  o,
                  w,
                  B
                );
              }
            }
          }
          i = i.next;
        } while (i !== c);
      }
    } catch (B) {
      Je(t, t.return, B);
    }
  }
  function _g(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var n = e.stateNode;
      try {
        wp(t, n);
      } catch (i) {
        Je(e, e.return, i);
      }
    }
  }
  function zg(e, t, n) {
    n.props = Bi(
      e.type,
      e.memoizedProps
    ), n.state = e.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      Je(e, t, i);
    }
  }
  function Wn(e, t) {
    try {
      var n = e.ref;
      if (n !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var i = e.stateNode;
            break;
          case 30:
            var o = e.stateNode, c = Sa(e.memoizedProps, o);
            (o.ref === null || o.ref.name !== c) && (o.ref = q0(c)), i = o.ref;
            break;
          case 7:
            if (e.stateNode === null) {
              var m = new Sn(e);
              g(
                e.child,
                !1,
                JS,
                m,
                void 0,
                void 0
              ), e.stateNode = m;
            }
            i = e.stateNode;
            break;
          default:
            i = e.stateNode;
        }
        typeof n == "function" ? e.refCleanup = n(i) : n.current = i;
      }
    } catch (b) {
      Je(e, t, b);
    }
  }
  function Ht(e, t) {
    var n = e.ref, i = e.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (o) {
          Je(e, t, o);
        } finally {
          e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (o) {
          Je(e, t, o);
        }
      else n.current = null;
  }
  function Oo(e, t) {
    if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null)
      for (var n = 0; n < t.length; n++)
        Q0(
          e.stateNode,
          t[n]
        );
  }
  function Og(e) {
    for (var t = e.return; t !== null && (Ef(t) && Q0(e.stateNode, t.stateNode), !Cf(t)); )
      t = t.return;
  }
  function Ll(e) {
    for (var t = e.return; t !== null && (Ef(t) && $S(e.stateNode, t.stateNode), !Cf(t)); )
      t = t.return;
  }
  function Cf(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 27;
  }
  function Ef(e) {
    return e && e.tag === 7 && e.stateNode !== null;
  }
  function jf(e) {
    var t = e.type, n = e.memoizedProps, i = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break e;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (o) {
      Je(e, e.return, o);
    }
  }
  function Af(e, t, n) {
    try {
      var i = e.stateNode;
      _S(i, e.type, n, t), i[Ot] = t;
    } catch (o) {
      Je(e, e.return, o);
    }
  }
  function Ug(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && ri(e.type) || e.tag === 4;
  }
  function Mf(e) {
    e: for (; ; ) {
      for (; e.sibling === null; ) {
        if (e.return === null || Ug(e.return)) return null;
        e = e.return;
      }
      for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
        if (e.tag === 27 && ri(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
        e.child.return = e, e = e.child;
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function Nf(e, t, n, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      o = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(o, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(o), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Pn)), Oo(e, i), Ke = !0;
    else if (o !== 4 && (o === 27 && (Oo(e, i), i = null, ri(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null))
      for (Nf(
        e,
        t,
        n,
        i
      ), e = e.sibling; e !== null; )
        Nf(
          e,
          t,
          n,
          i
        ), e = e.sibling;
  }
  function Uo(e, t, n, i) {
    var o = e.tag;
    if (o === 5 || o === 6)
      o = e.stateNode, t ? n.insertBefore(o, t) : n.appendChild(o), Oo(e, i), Ke = !0;
    else if (o !== 4 && (o === 27 && (Oo(e, i), i = null, ri(e.type) && (n = e.stateNode)), e = e.child, e !== null))
      for (Uo(
        e,
        t,
        n,
        i
      ), e = e.sibling; e !== null; )
        Uo(
          e,
          t,
          n,
          i
        ), e = e.sibling;
  }
  function Vg(e) {
    var t = e.stateNode, n = e.memoizedProps;
    try {
      for (var i = e.type, o = t.attributes; o.length; )
        t.removeAttributeNode(o[0]);
      qt(t, i, n), t[lt] = e, t[Ot] = n;
    } catch (c) {
      Je(e, e.return, c);
    }
  }
  var Vo = !1, yn = null;
  function Lg(e) {
    (e.tag === 30 || (e.subtreeFlags & 33554432) !== 0) && (Vo = !0);
  }
  var ea = null;
  function Bg() {
    var e = ea;
    return ea = null, e;
  }
  var rn = 0;
  function Ms(e, t, n, i, o) {
    return rn = 0, Hg(
      e.child,
      t,
      n,
      i,
      o
    );
  }
  function Hg(e, t, n, i, o) {
    for (var c = !1; e !== null; ) {
      if (e.tag === 5) {
        var m = e.stateNode;
        if (i !== null) {
          var b = dd(m);
          i.push(b), b.view && (c = !0);
        } else
          c || dd(m).view && (c = !0);
        Vo = !0, B0(
          m,
          rn === 0 ? t : t + "_" + rn,
          n
        ), rn++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && o || Hg(
        e.child,
        t,
        n,
        i,
        o
      ) && (c = !0));
      e = e.sibling;
    }
    return c;
  }
  function ta(e, t) {
    for (; e !== null; )
      e.tag === 5 ? H0(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || ta(
        e.child,
        t
      )), e = e.sibling;
  }
  function Lo(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if ((e.tag !== 22 || e.memoizedState === null) && (Lo(e), e.tag === 30 && (e.flags & 18874368) !== 0 && e.stateNode.paired)) {
          var t = e.memoizedProps;
          if (t.name == null || t.name === "auto")
            throw Error(r(544));
          var n = t.name;
          t = wa(t.default, t.share), t !== "none" && (Ms(
            e,
            n,
            t,
            null,
            !1
          ) || ta(e.child, !1));
        }
        e = e.sibling;
      }
  }
  function kf(e, t) {
    if (e.tag === 30) {
      var n = e.stateNode, i = e.memoizedProps, o = Sa(i, n), c = wa(
        i.default,
        n.paired ? i.share : i.enter
      );
      c !== "none" ? Ms(e, o, c, null, !1) ? (Lo(e), n.paired || t || Us(e, i.onEnter)) : ta(e.child, !1) : Lo(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        kf(e, t), e = e.sibling;
    else Lo(e);
  }
  function Df(e) {
    if (yn !== null && yn.size !== 0) {
      var t = yn;
      if ((e.subtreeFlags & 18874368) !== 0)
        for (e = e.child; e !== null; ) {
          if (e.tag !== 22 || e.memoizedState === null) {
            if (e.tag === 30 && (e.flags & 18874368) !== 0) {
              var n = e.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var o = t.get(i);
                if (o !== void 0) {
                  var c = wa(
                    n.default,
                    n.share
                  );
                  if (c !== "none" && (Ms(
                    e,
                    i,
                    c,
                    null,
                    !1
                  ) ? (c = e.stateNode, o.paired = c, c.paired = o, Us(e, n.onShare)) : ta(e.child, !1)), t.delete(i), t.size === 0) break;
                }
              }
            }
            Df(e);
          }
          e = e.sibling;
        }
    }
  }
  function Rf(e) {
    if (e.tag === 30) {
      var t = e.memoizedProps, n = Sa(t, e.stateNode), i = yn !== null ? yn.get(n) : void 0, o = wa(
        t.default,
        i !== void 0 ? t.share : t.exit
      );
      o !== "none" && (Ms(e, n, o, null, !1) ? i !== void 0 ? (o = e.stateNode, i.paired = o, o.paired = i, yn.delete(n), Us(e, t.onShare)) : Us(e, t.onExit) : ta(e.child, !1)), yn !== null && Df(e);
    } else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Rf(e), e = e.sibling;
    else
      yn !== null && Df(e);
  }
  function qg(e) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var t = e.memoizedProps, n = Sa(t, e.stateNode);
        t = wa(t.default, t.update), e.flags &= -5, t !== "none" && Ms(
          e,
          n,
          t,
          e.memoizedState = [],
          !1
        );
      } else
        (e.subtreeFlags & 33554432) !== 0 && qg(e);
      e = e.sibling;
    }
  }
  function _f(e) {
    if ((e.subtreeFlags & 18874368) !== 0)
      for (e = e.child; e !== null; ) {
        if (e.tag !== 22 || e.memoizedState === null) {
          if (e.tag === 30 && (e.flags & 18874368) !== 0) {
            var t = e.stateNode;
            t.paired !== null && (t.paired = null, ta(e.child, !1));
          }
          _f(e);
        }
        e = e.sibling;
      }
  }
  function Bo(e) {
    if (e.tag === 30)
      e.stateNode.paired = null, ta(e.child, !1), _f(e);
    else if ((e.subtreeFlags & 33554432) !== 0)
      for (e = e.child; e !== null; )
        Bo(e), e = e.sibling;
    else _f(e);
  }
  function Gg(e) {
    for (e = e.child; e !== null; )
      e.tag === 30 ? ta(e.child, !1) : (e.subtreeFlags & 33554432) !== 0 && Gg(e), e = e.sibling;
  }
  function zf(e, t, n, i, o, c, m) {
    for (var b = !1; t !== null; ) {
      if (t.tag === 5) {
        var w = t.stateNode;
        if (c !== null && rn < c.length) {
          var _ = c[rn], B = dd(w);
          (_.view || B.view) && (b = !0);
          var Y;
          if (Y = (e.flags & 4) === 0)
            if (B.clip) Y = !0;
            else {
              Y = _.rect;
              var N = B.rect;
              Y = Y.y !== N.y || Y.x !== N.x || Y.height !== N.height || Y.width !== N.width;
            }
          Y && (e.flags |= 4), B.abs ? B = !_.abs : (_ = _.rect, B = B.rect, B = _.height !== B.height || _.width !== B.width), B && (e.flags |= 32);
        } else e.flags |= 32;
        (e.flags & 4) !== 0 && B0(
          w,
          rn === 0 ? n : n + "_" + rn,
          o
        ), b && (e.flags & 4) !== 0 || (ea === null && (ea = []), ea.push(
          w,
          rn === 0 ? i : i + "_" + rn,
          t.memoizedProps
        )), rn++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && m ? e.flags |= t.flags & 32 : zf(
        e,
        t.child,
        n,
        i,
        o,
        c,
        m
      ) && (b = !0));
      t = t.sibling;
    }
    return b;
  }
  function Yg(e, t) {
    for (e = e.child; e !== null; ) {
      if (e.tag === 30) {
        var n = e.memoizedProps, i = e.stateNode, o = Sa(n, i), c = wa(n.default, n.update), m;
        m = e.memoizedState, e.memoizedState = null, i = e;
        var b = e.child;
        rn = 0, o = zf(
          i,
          b,
          o,
          o,
          c,
          m,
          !1
        ), (e.flags & 4) !== 0 && o && Us(e, n.onUpdate);
      } else
        (e.subtreeFlags & 33554432) !== 0 && Yg(e);
      e = e.sibling;
    }
  }
  var kt = !1, Fe = !1, na = !1, Of = !1, Xg = typeof WeakSet == "function" ? WeakSet : Set, Dt = null, aa = !1, Bl = !1, Ho = !1, Uf = !1;
  function oS(e, t, n) {
    if (e = e.containerInfo, rd = Ks, e = Fm(e), Su(e)) {
      if ("selectionStart" in e)
        var i = {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      else
        e: {
          i = (i = e.ownerDocument) && i.defaultView || window;
          var o = i.getSelection && i.getSelection();
          if (o && o.rangeCount !== 0) {
            i = o.anchorNode;
            var c = o.anchorOffset, m = o.focusNode;
            o = o.focusOffset;
            try {
              i.nodeType, m.nodeType;
            } catch {
              i = null;
              break e;
            }
            var b = 0, w = -1, _ = -1, B = 0, Y = 0, N = e, U = null;
            t: for (; ; ) {
              for (var ie; N !== i || c !== 0 && N.nodeType !== 3 || (w = b + c), N !== m || o !== 0 && N.nodeType !== 3 || (_ = b + o), N.nodeType === 3 && (b += N.nodeValue.length), (ie = N.firstChild) !== null; )
                U = N, N = ie;
              for (; ; ) {
                if (N === e) break t;
                if (U === i && ++B === c && (w = b), U === m && ++Y === o && (_ = b), (ie = N.nextSibling) !== null) break;
                N = U, U = N.parentNode;
              }
              N = ie;
            }
            i = w === -1 || _ === -1 ? null : { start: w, end: _ };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (od = { focusedElem: e, selectionRange: i }, Ks = !1, n = (n & 335544064) === n, Dt = t, t = n ? 9270 : 1024; Dt !== null; ) {
      if (e = Dt, n && (i = e.deletions, i !== null))
        for (c = 0; c < i.length; c++)
          n && Rf(i[c]);
      if (e.alternate === null && (e.flags & 2) !== 0)
        n && Lg(e), qo(n);
      else {
        if (e.tag === 22) {
          if (i = e.alternate, e.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && Rf(i), qo(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && Lg(e), qo(n);
            continue;
          }
        }
        i = e.child, (e.subtreeFlags & t) !== 0 && i !== null ? (i.return = e, Dt = i) : (n && qg(e), qo(n));
      }
    }
    yn = null;
  }
  function qo(e) {
    for (; Dt !== null; ) {
      var t = Dt, n = e, i = t.alternate, o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((o & 1024) !== 0 && i !== null) {
            n = void 0, o = i.memoizedProps, i = i.memoizedState;
            var c = t.stateNode;
            try {
              var m = Bi(
                t.type,
                o
              );
              n = c.getSnapshotBeforeUpdate(
                m,
                i
              ), c.__reactInternalSnapshotBeforeUpdate = n;
            } catch (b) {
              Je(t, t.return, b);
            }
          }
          break;
        case 3:
          if ((o & 1024) !== 0) {
            if (i = t.stateNode.containerInfo, n = i.nodeType, n === 9)
              pd(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  pd(i);
                  break;
                default:
                  i.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && i !== null && (n = Sa(
            i.memoizedProps,
            i.stateNode
          ), o = t.memoizedProps, o = wa(o.default, o.update), o !== "none" && Ms(
            i,
            n,
            o,
            i.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((o & 1024) !== 0) throw Error(r(163));
      }
      if (i = t.sibling, i !== null) {
        i.return = t.return, Dt = i;
        break;
      }
      Dt = t.return;
    }
  }
  function Zg(e, t, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ia(e, n), i & 4 && Vl(5, n);
        break;
      case 1:
        if (ia(e, n), i & 4)
          if (e = n.stateNode, t === null)
            try {
              e.componentDidMount();
            } catch (m) {
              Je(n, n.return, m);
            }
          else {
            var o = Bi(
              n.type,
              t.memoizedProps
            );
            t = t.memoizedState;
            try {
              e.componentDidUpdate(
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              Je(
                n,
                n.return,
                m
              );
            }
          }
        i & 64 && _g(n), i & 512 && Wn(n, n.return);
        break;
      case 3:
        if (ia(e, n), i & 64 && (e = n.updateQueue, e !== null)) {
          if (t = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                t = n.child.stateNode;
                break;
              case 1:
                t = n.child.stateNode;
            }
          try {
            wp(e, t);
          } catch (m) {
            Je(n, n.return, m);
          }
        }
        break;
      case 27:
        t === null && i & 4 && Vg(n);
      case 26:
      case 5:
        ia(e, n), t === null && i & 4 && jf(n), i & 512 && Wn(n, n.return);
        break;
      case 12:
        ia(e, n);
        break;
      case 31:
        ia(e, n), i & 4 && Ig(e, n);
        break;
      case 13:
        ia(e, n), i & 4 && Pg(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = xS.bind(
          null,
          n
        ), tw(e, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || kt, !i) {
          var c = t !== null && t.memoizedState !== null || Fe;
          t = kt, o = Fe, kt = i, (Fe = c) && !o ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), Hn(
            e,
            n,
            i
          )) : ia(e, n), kt = t, Fe = o;
        }
        break;
      case 30:
        ia(e, n), i & 512 && Wn(n, n.return);
        break;
      case 7:
        i & 512 && Wn(n, n.return);
      default:
        ia(e, n);
    }
  }
  function Vf(e, t) {
    for (e = e.child; e !== null; )
      Kg(e, t), e = e.sibling;
  }
  function Kg(e, t) {
    switch (e.tag) {
      case 5:
      case 26:
        try {
          var n = e.stateNode;
          if (t) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var o = e.stateNode, c = e.memoizedProps.style, m = c != null && c.hasOwnProperty("display") ? c.display : null;
            o.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
          }
        } catch (w) {
          Je(e, e.return, w);
        }
        Lf(e, t);
        break;
      case 6:
        try {
          e.stateNode.nodeValue = t ? "" : e.memoizedProps, Ke = !0;
        } catch (w) {
          Je(e, e.return, w);
        }
        break;
      case 18:
        try {
          var b = e.stateNode;
          t ? L0(b, !0) : L0(e.stateNode, !1);
        } catch (w) {
          Je(e, e.return, w);
        }
        break;
      case 22:
      case 23:
        e.memoizedState === null && Vf(e, t);
        break;
      default:
        Vf(e, t);
    }
  }
  function Lf(e, t) {
    if (e.subtreeFlags & 67108864)
      for (e = e.child; e !== null; ) {
        e: {
          var n = e, i = t;
          switch (n.tag) {
            case 4:
              Kg(n, i);
              break e;
            case 22:
              n.memoizedState === null && Lf(n, i);
              break e;
            default:
              Lf(n, i);
          }
        }
        e = e.sibling;
      }
  }
  function Qg(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Qg(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && re(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
  }
  var rt = null, on = !1;
  function Ln(e, t, n) {
    for (n = n.child; n !== null; )
      Fg(e, t, n), n = n.sibling;
  }
  function Fg(e, t, n) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(ga, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Fe || Ht(n, t), Ln(
          e,
          t,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Fe && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Fe || Ht(n, t), Ll(n);
        var i = rt, o = on;
        ri(n.type) && (rt = n.stateNode, on = !1), Ln(
          e,
          t,
          n
        ), $0(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), rt = i, on = o;
        break;
      case 5:
        Fe || Ht(n, t), Ll(n);
      case 6:
        if (n.tag === 6 && Ll(n), i = rt, o = on, rt = null, Ln(
          e,
          t,
          n
        ), rt = i, on = o, rt !== null)
          if (on)
            try {
              (rt.nodeType === 9 ? rt.body : rt.nodeName === "HTML" ? rt.ownerDocument.body : rt).removeChild(n.stateNode), Ke = !0;
            } catch (c) {
              Je(
                n,
                t,
                c
              );
            }
          else
            try {
              rt.removeChild(n.stateNode), Ke = !0;
            } catch (c) {
              Je(
                n,
                t,
                c
              );
            }
        break;
      case 18:
        rt !== null && (on ? (e = rt, V0(
          e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
          n.stateNode
        ), Qs(e)) : V0(rt, n.stateNode));
        break;
      case 4:
        i = rt, o = on, rt = n.stateNode.containerInfo, on = !0, Ln(
          e,
          t,
          n
        ), rt = i, on = o;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ei(2, n, t), Fe || ei(4, n, t), Ln(
          e,
          t,
          n
        );
        break;
      case 1:
        Fe || (Ht(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && zg(
          n,
          t,
          i
        )), Ln(
          e,
          t,
          n
        );
        break;
      case 21:
        Ln(
          e,
          t,
          n
        );
        break;
      case 22:
        Fe = (i = Fe) || n.memoizedState !== null, Ln(
          e,
          t,
          n
        ), Fe = i;
        break;
      case 30:
        Ht(n, t), Ln(
          e,
          t,
          n
        );
        break;
      case 7:
        Fe || Ht(n, t), Ln(
          e,
          t,
          n
        );
        break;
      default:
        Ln(
          e,
          t,
          n
        );
    }
  }
  function Ig(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
      e = e.dehydrated;
      try {
        Qs(e);
      } catch (n) {
        Je(t, t.return, n);
      }
    }
  }
  function Pg(e, t) {
    if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
      try {
        Qs(e);
      } catch (n) {
        Je(t, t.return, n);
      }
  }
  function cS(e) {
    switch (e.tag) {
      case 31:
      case 13:
      case 19:
        var t = e.stateNode;
        return t === null && (t = e.stateNode = new Xg()), t;
      case 22:
        return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Xg()), t;
      default:
        throw Error(r(435, e.tag));
    }
  }
  function Go(e, t) {
    var n = cS(e);
    t.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var o = SS.bind(null, e, i);
        i.then(o, o);
      }
    });
  }
  function Wt(e, t, n) {
    var i = t.deletions;
    if (i !== null)
      for (var o = 0; o < i.length; o++) {
        var c = i[o], m = e, b = t, w = b;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 27:
              if (ri(w.type)) {
                rt = w.stateNode, on = !1;
                break e;
              }
              break;
            case 5:
              rt = w.stateNode, on = !1;
              break e;
            case 3:
            case 4:
              rt = w.stateNode.containerInfo, on = !0;
              break e;
          }
          w = w.return;
        }
        if (rt === null) throw Error(r(160));
        Fg(m, b, c), rt = null, on = !1, m = c.alternate, m !== null && (m.return = null), c.return = null;
      }
    if (t.subtreeFlags & 13886)
      for (t = t.child; t !== null; )
        Jg(t, e, n), t = t.sibling;
  }
  var Bn = null;
  function Jg(e, t, n) {
    var i = e.alternate, o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (o & 4 && (i = e.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var c = 0; c < i.length; c++) {
            var m = i[c];
            m.ref.impl = m.nextImpl;
          }
        Wt(t, e, n), en(e), o & 4 && (ei(3, e, e.return), Vl(3, e), ei(5, e, e.return));
        break;
      case 1:
        Wt(t, e, n), en(e), o & 512 && (Fe || i === null || Ht(i, i.return)), o & 64 && kt && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
        break;
      case 26:
        if (c = Bn, Wt(t, e, n), en(e), o & 512 && (Fe || i === null || Ht(i, i.return)), o & 4)
          if (o = i !== null ? i.memoizedState : null, n = e.memoizedState, i === null)
            if (n === null)
              if (e.stateNode === null)
                if (kt)
                  e.stateNode = z0(
                    e.type,
                    e.memoizedProps,
                    t.containerInfo,
                    e
                  );
                else {
                  e: {
                    t = e.type, n = e.memoizedProps, o = c.ownerDocument || c;
                    t: switch (t) {
                      case "title":
                        i = o.getElementsByTagName("title")[0], (!i || i[Ci] || i[lt] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = o.createElement(t), o.head.insertBefore(
                          i,
                          o.querySelector("head > title")
                        )), qt(i, t, n), i[lt] = e, Oe(i), t = i;
                        break e;
                      case "link":
                        if (c = iy(
                          "link",
                          "href",
                          o
                        ).get(t + (n.href || ""))) {
                          for (m = 0; m < c.length; m++)
                            if (i = c[m], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              c.splice(m, 1);
                              break t;
                            }
                        }
                        i = o.createElement(t), qt(i, t, n), o.head.appendChild(i);
                        break;
                      case "meta":
                        if (c = iy(
                          "meta",
                          "content",
                          o
                        ).get(t + (n.content || ""))) {
                          for (m = 0; m < c.length; m++)
                            if (i = c[m], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              c.splice(m, 1);
                              break t;
                            }
                        }
                        i = o.createElement(t), qt(i, t, n), o.head.appendChild(i);
                        break;
                      default:
                        throw Error(r(468, t));
                    }
                    i[lt] = e, Oe(i), t = i;
                  }
                  e.stateNode = t;
                }
              else
                kt || wd(c, e.type, e.stateNode);
            else
              e.stateNode = ay(
                c,
                n,
                e.memoizedProps
              );
          else
            o !== n ? (o === null ? (t = i.stateNode, t === null || Fe || t.parentNode.removeChild(t)) : o.count--, n === null ? kt || wd(c, e.type, e.stateNode) : ay(c, n, e.memoizedProps)) : n === null && e.stateNode !== null && Af(
              e,
              e.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        Wt(t, e, n), en(e), o & 512 && (Fe || i === null || Ht(i, i.return)), i !== null && o & 4 && Af(
          e,
          e.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (c = na, na = !1, Wt(t, e, n), na = c, en(e), o & 512 && (Fe || i === null || Ht(i, i.return)), e.flags & 32) {
          t = e.stateNode;
          try {
            us(t, ""), Ke = !0;
          } catch (B) {
            Je(e, e.return, B);
          }
        }
        o & 4 && e.stateNode != null && (t = e.memoizedProps, Af(
          e,
          t,
          i !== null ? i.memoizedProps : t
        )), o & 1024 && (Of = !0);
        break;
      case 6:
        if (Wt(t, e, n), en(e), o & 4) {
          if (e.stateNode === null)
            throw Error(r(162));
          t = e.memoizedProps, n = e.stateNode;
          try {
            n.nodeValue = t, Ke = !0;
          } catch (B) {
            Je(e, e.return, B);
          }
        }
        break;
      case 3:
        if (Ke = !1, ac = null, c = Bn, Bn = Fl(t.containerInfo), Wt(t, e, n), Bn = c, en(e), o & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            Qs(t.containerInfo);
          } catch (B) {
            Je(e, e.return, B);
          }
        Of && (Of = !1, $g(e)), Ke = !1;
        break;
      case 4:
        o = na, na = kt, i = vm(), c = Bn, Bn = Fl(
          e.stateNode.containerInfo
        ), Wt(t, e, n), en(e), Bn = c, Ke && Bl && (Ho = !0), Ke = i, na = o;
        break;
      case 12:
        Wt(t, e, n), en(e);
        break;
      case 31:
        Wt(t, e, n), en(e), o & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Go(e, t)));
        break;
      case 13:
        Wt(t, e, n), en(e), e.child.flags & 8192 && e.memoizedState !== null != (i !== null && i.memoizedState !== null) && (Zo = Ft()), o & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Go(e, t)));
        break;
      case 22:
        c = e.memoizedState !== null, m = i !== null && i.memoizedState !== null;
        var b = kt, w = Fe, _ = na;
        kt = b || c, na = _ || c, Fe = w || m, Wt(t, e, n), Fe = w, na = _, kt = b, en(e), o & 8192 && (t = e.stateNode, t._visibility = c ? t._visibility & -2 : t._visibility | 1, !c || i === null || m || kt || Fe || (t = m || Fe, n = kt, i = Fe, kt = c || kt, Fe = t, ti(e, 2), kt = n, Fe = i), !c && na || Vf(e, c)), o & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Go(e, n))));
        break;
      case 19:
        Wt(t, e, n), en(e), o & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Go(e, t)));
        break;
      case 30:
        o & 512 && (Fe || i === null || Ht(i, i.return)), o = vm(), c = Bl, m = (n & 335544064) === n, b = e.memoizedProps, Bl = m && wa(
          b.default,
          b.update
        ) !== "none", Wt(t, e, n), en(e), m && i !== null && Ke && (e.flags |= 4), Bl = c, Ke = o;
        break;
      case 21:
        break;
      case 7:
        o & 512 && (Fe || i === null || Ht(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = e);
      default:
        Wt(t, e, n), en(e);
    }
  }
  function en(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var n, i = e.return; i !== null; ) {
          if (Ug(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var o = e.return; o !== null; ) {
          if (Ef(o)) {
            var c = o.stateNode;
            i === null ? i = [c] : i.push(c);
          }
          if (Cf(o)) break;
          o = o.return;
        }
        var m = i;
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var b = n.stateNode, w = Mf(e);
            Uo(
              e,
              w,
              b,
              m
            );
            break;
          case 5:
            var _ = n.stateNode;
            n.flags & 32 && (us(_, ""), n.flags &= -33);
            var B = Mf(e);
            Uo(
              e,
              B,
              _,
              m
            );
            break;
          case 3:
          case 4:
            var Y = n.stateNode.containerInfo, N = Mf(e);
            Nf(
              e,
              N,
              Y,
              m
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (U) {
        Je(e, e.return, U);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function $g(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        $g(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, Ks = !0, t.reset(), Ks = !1), e = e.sibling;
      }
  }
  function Ns(e, t) {
    if (t.subtreeFlags & 9270)
      for (t = t.child; t !== null; )
        Wg(t, e), t = t.sibling;
    else Yg(t);
  }
  function Wg(e, t) {
    var n = e.alternate;
    if (n === null) kf(e, !1);
    else
      switch (e.tag) {
        case 3:
          if (Uf = aa = !1, Bg(), Ns(t, e), !aa && !Ho) {
            if (e = ea, e !== null)
              for (var i = 0; i < e.length; i += 3) {
                n = e[i];
                var o = e[i + 1];
                H0(n, e[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + o + ")"
                  }
                );
              }
            e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), e.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), Uf = !0;
          }
          ea = null;
          break;
        case 5:
          Ns(t, e);
          break;
        case 4:
          i = aa, aa = !1, Ns(t, e), aa && (Ho = !0), aa = i;
          break;
        case 22:
          e.memoizedState === null && (n.memoizedState !== null ? kf(e, !1) : Ns(t, e));
          break;
        case 30:
          i = aa, o = Bg(), aa = !1, Ns(t, e), aa && (e.flags |= 4);
          var c = e.memoizedProps, m = e.stateNode;
          t = Sa(c, m), m = Sa(n.memoizedProps, m);
          var b = wa(c.default, c.update);
          b === "none" ? t = !1 : (c = n.memoizedState, n.memoizedState = null, n = e.child, rn = 0, t = zf(
            e,
            n,
            t,
            m,
            b,
            c,
            !0
          ), rn !== (c === null ? 0 : c.length) && (e.flags |= 32)), (e.flags & 4) !== 0 && t ? (Us(
            e,
            e.memoizedProps.onUpdate
          ), ea = o) : o !== null && (o.push.apply(o, ea), ea = o), aa = (e.flags & 32) !== 0 ? !0 : i;
          break;
        default:
          Ns(t, e);
      }
  }
  function ia(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; )
        Zg(e, t.alternate, t), t = t.sibling;
  }
  function ti(e, t) {
    for (e = e.child; e !== null; ) {
      var n = e, i = t;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ei(4, n, n.return), ti(
            n,
            i
          );
          break;
        case 1:
          Ht(n, n.return);
          var o = n.stateNode;
          typeof o.componentWillUnmount == "function" && zg(
            n,
            n.return,
            o
          ), ti(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && $0(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          Ht(n, n.return), n.tag !== 5 && n.tag !== 27 || Ll(n), ti(
            n,
            i
          );
          break;
        case 6:
          Ll(n);
          break;
        case 26:
          Ht(n, n.return), o = n.stateNode, n.memoizedState !== null || o === null || Fe || o.parentNode.removeChild(o), ti(
            n,
            i
          );
          break;
        case 22:
          n.memoizedState === null && ti(
            n,
            i
          );
          break;
        case 30:
          Ht(n, n.return), ti(
            n,
            i
          );
          break;
        case 7:
          Ht(n, n.return);
        default:
          ti(
            n,
            i
          );
      }
      e = e.sibling;
    }
  }
  function Hn(e, t, n) {
    for (n = (t.subtreeFlags & 8772) !== 0 ? n : n & -2, t = t.child; t !== null; ) {
      var i = t.alternate, o = e, c = t, m = c.flags, b = (n & 1) !== 0;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          Hn(
            o,
            c,
            n
          ), Vl(4, c);
          break;
        case 1:
          if (Hn(
            o,
            c,
            n
          ), i = c, o = i.stateNode, typeof o.componentDidMount == "function")
            try {
              o.componentDidMount();
            } catch (B) {
              Je(i, i.return, B);
            }
          if (i = c, o = i.updateQueue, o !== null) {
            var w = i.stateNode;
            try {
              var _ = o.shared.hiddenCallbacks;
              if (_ !== null)
                for (o.shared.hiddenCallbacks = null, o = 0; o < _.length; o++)
                  Sp(_[o], w);
            } catch (B) {
              Je(i, i.return, B);
            }
          }
          b && m & 64 && _g(c), Wn(c, c.return);
          break;
        case 27:
          (n & 2) !== 0 && Vg(c);
        case 5:
          c.tag !== 5 && c.tag !== 27 || Og(c), Hn(
            o,
            c,
            n
          ), b && i === null && m & 4 && jf(c), Wn(c, c.return);
          break;
        case 6:
          Og(c);
          break;
        case 26:
          w = c.stateNode, c.memoizedState !== null || w === null || kt || wd(
            Fl(w.ownerDocument),
            c.type,
            w
          ), Hn(
            o,
            c,
            n
          ), b && i === null && m & 4 && jf(c), Wn(c, c.return);
          break;
        case 12:
          Hn(
            o,
            c,
            n
          );
          break;
        case 31:
          Hn(
            o,
            c,
            n
          ), b && m & 4 && Ig(o, c);
          break;
        case 13:
          Hn(
            o,
            c,
            n
          ), b && m & 4 && Pg(o, c);
          break;
        case 22:
          c.memoizedState === null && Hn(
            o,
            c,
            n
          ), Wn(c, c.return);
          break;
        case 30:
          Hn(
            o,
            c,
            n
          ), Wn(c, c.return);
          break;
        case 7:
          Wn(c, c.return);
        default:
          Hn(
            o,
            c,
            n
          );
      }
      t = t.sibling;
    }
  }
  function Bf(e, t) {
    var n = null;
    e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Cl(n));
  }
  function Hf(e, t) {
    e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Cl(e));
  }
  function Dn(e, t, n, i) {
    var o = (n & 335544064) === n;
    if (t.subtreeFlags & (o ? 10262 : 10256))
      for (t = t.child; t !== null; )
        e0(
          e,
          t,
          n,
          i
        ), t = t.sibling;
    else o && Gg(t);
  }
  function e0(e, t, n, i) {
    var o = (n & 335544064) === n;
    o && t.alternate === null && t.return !== null && t.return.alternate !== null && Bo(t);
    var c = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Dn(
          e,
          t,
          n,
          i
        ), c & 2048 && Vl(9, t);
        break;
      case 1:
        Dn(
          e,
          t,
          n,
          i
        );
        break;
      case 3:
        Dn(
          e,
          t,
          n,
          i
        ), o && Uf && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), c & 2048 && (c = null, t.alternate !== null && (c = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== c && (t.refCount++, c != null && Cl(c)));
        break;
      case 12:
        if (c & 2048) {
          Dn(
            e,
            t,
            n,
            i
          ), c = t.stateNode;
          try {
            var m = t.memoizedProps, b = m.id, w = m.onPostCommit;
            typeof w == "function" && w(
              b,
              t.alternate === null ? "mount" : "update",
              c.passiveEffectDuration,
              -0
            );
          } catch (_) {
            Je(t, t.return, _);
          }
        } else
          Dn(
            e,
            t,
            n,
            i
          );
        break;
      case 31:
        Dn(
          e,
          t,
          n,
          i
        );
        break;
      case 13:
        Dn(
          e,
          t,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        m = t.stateNode, b = t.alternate, t.memoizedState !== null ? (o && b !== null && b.memoizedState === null && Bo(b), m._visibility & 2 ? Dn(
          e,
          t,
          n,
          i
        ) : Hl(
          e,
          t
        )) : (o && b !== null && b.memoizedState !== null && Bo(t), m._visibility & 2 ? Dn(
          e,
          t,
          n,
          i
        ) : (m._visibility |= 2, ks(
          e,
          t,
          n,
          i,
          (t.subtreeFlags & 10256) !== 0 || !1
        ))), c & 2048 && Bf(b, t);
        break;
      case 24:
        Dn(
          e,
          t,
          n,
          i
        ), c & 2048 && Hf(t.alternate, t);
        break;
      case 30:
        o && (c = t.alternate, c !== null && (ta(c.child, !0), ta(t.child, !0))), Dn(
          e,
          t,
          n,
          i
        );
        break;
      default:
        Dn(
          e,
          t,
          n,
          i
        );
    }
  }
  function ks(e, t, n, i, o) {
    for (o = o && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null; ) {
      var c = e, m = t, b = n, w = i, _ = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          ks(
            c,
            m,
            b,
            w,
            o
          ), Vl(8, m);
          break;
        case 23:
          break;
        case 22:
          var B = m.stateNode;
          m.memoizedState !== null ? B._visibility & 2 ? ks(
            c,
            m,
            b,
            w,
            o
          ) : Hl(
            c,
            m
          ) : (B._visibility |= 2, ks(
            c,
            m,
            b,
            w,
            o
          )), o && _ & 2048 && Bf(
            m.alternate,
            m
          );
          break;
        case 24:
          ks(
            c,
            m,
            b,
            w,
            o
          ), o && _ & 2048 && Hf(m.alternate, m);
          break;
        default:
          ks(
            c,
            m,
            b,
            w,
            o
          );
      }
      t = t.sibling;
    }
  }
  function Hl(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var n = e, i = t, o = i.flags;
        switch (i.tag) {
          case 22:
            Hl(n, i), o & 2048 && Bf(
              i.alternate,
              i
            );
            break;
          case 24:
            Hl(n, i), o & 2048 && Hf(i.alternate, i);
            break;
          default:
            Hl(n, i);
        }
        t = t.sibling;
      }
  }
  var Hi = 8192;
  function qi(e, t, n) {
    if (e.subtreeFlags & Hi)
      for (e = e.child; e !== null; )
        t0(
          e,
          t,
          n
        ), e = e.sibling;
  }
  function t0(e, t, n) {
    switch (e.tag) {
      case 26:
        qi(
          e,
          t,
          n
        ), e.flags & Hi && (e.memoizedState !== null ? pw(
          n,
          Bn,
          e.memoizedState,
          e.memoizedProps
        ) : (e = e.stateNode, (t & 335544128) === t && oy(n, e)));
        break;
      case 5:
        qi(
          e,
          t,
          n
        ), e.flags & Hi && (e = e.stateNode, (t & 335544128) === t && oy(n, e));
        break;
      case 3:
      case 4:
        var i = Bn;
        Bn = Fl(e.stateNode.containerInfo), qi(
          e,
          t,
          n
        ), Bn = i;
        break;
      case 22:
        e.memoizedState === null && (i = e.alternate, i !== null && i.memoizedState !== null ? (i = Hi, Hi = 16777216, qi(
          e,
          t,
          n
        ), Hi = i) : qi(
          e,
          t,
          n
        ));
        break;
      case 30:
        if ((e.flags & Hi) !== 0 && (i = e.memoizedProps.name, i != null && i !== "auto")) {
          var o = e.stateNode;
          o.paired = null, yn === null && (yn = /* @__PURE__ */ new Map()), yn.set(i, o);
        }
        qi(
          e,
          t,
          n
        );
        break;
      default:
        qi(
          e,
          t,
          n
        );
    }
  }
  function n0(e) {
    var t = e.alternate;
    if (t !== null && (e = t.child, e !== null)) {
      t.child = null;
      do
        t = e.sibling, e.sibling = null, e = t;
      while (e !== null);
    }
  }
  function ql(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          Dt = i, i0(
            i,
            e
          );
        }
      n0(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        a0(e), e = e.sibling;
  }
  function a0(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        ql(e), e.flags & 2048 && ei(9, e, e.return);
        break;
      case 3:
        ql(e);
        break;
      case 12:
        ql(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Yo(e)) : ql(e);
        break;
      default:
        ql(e);
    }
  }
  function Yo(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          Dt = i, i0(
            i,
            e
          );
        }
      n0(e);
    }
    for (e = e.child; e !== null; ) {
      switch (t = e, t.tag) {
        case 0:
        case 11:
        case 15:
          ei(8, t, t.return), Yo(t);
          break;
        case 22:
          n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Yo(t));
          break;
        default:
          Yo(t);
      }
      e = e.sibling;
    }
  }
  function i0(e, t) {
    for (; Dt !== null; ) {
      var n = Dt;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ei(8, n, t);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Cl(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, Dt = i;
      else
        e: for (n = e; Dt !== null; ) {
          i = Dt;
          var o = i.sibling, c = i.return;
          if (Qg(i), i === n) {
            Dt = null;
            break e;
          }
          if (o !== null) {
            o.return = c, Dt = o;
            break e;
          }
          Dt = c;
        }
    }
  }
  var uS = {
    getCacheForType: function(e) {
      var t = Vt(yt), n = t.data.get(e);
      return n === void 0 && (n = e(), t.data.set(e, n)), n;
    },
    cacheSignal: function() {
      return Vt(yt).controller.signal;
    }
  }, fS = typeof WeakMap == "function" ? WeakMap : Map, Qe = 0, tt = null, Be = null, qe = 0, Pe = 0, vn = null, ni = !1, Ds = !1, qf = !1, Da = 0, dt = 0, ai = 0, Gi = 0, Xo = 0, bn = 0, Rs = 0, Gl = null, cn = null, Gf = !1, Zo = 0, s0 = 0, Ko = 1 / 0, Qo = null, ii = null, ct = 0, qn = null, Yi = null, sa = 0, Yf = 0, Xf = null, l0 = null, _s = null, zs = null, Os = null, Yl = 0, Fo = null;
  function xn() {
    return (Qe & 2) !== 0 && qe !== 0 ? qe & -qe : le.T !== null ? ed() : dl();
  }
  function r0() {
    if (bn === 0)
      if ((qe & 536870912) === 0 || Ue) {
        var e = La;
        La <<= 1, (La & 3932160) === 0 && (La = 262144), bn = e;
      } else bn = 536870912;
    return e = Lt.current, e !== null && (e.flags |= 32), bn;
  }
  function Us(e, t) {
    if (t != null) {
      var n = e.stateNode, i = n.ref;
      i === null && (i = n.ref = q0(
        Sa(e.memoizedProps, n)
      )), zs === null && (zs = []), zs.push(t.bind(null, i));
    }
  }
  function un(e, t, n) {
    (e === tt && (Pe === 2 || Pe === 9) || e.cancelPendingCommit !== null) && (Vs(e, 0), si(
      e,
      qe,
      bn,
      !1
    )), Ba(e, n), ((Qe & 2) === 0 || e !== tt) && (e === tt && ((Qe & 2) === 0 && (Gi |= n), dt === 4 && si(
      e,
      qe,
      bn,
      !1
    )), la(e));
  }
  function o0(e, t, n) {
    if ((Qe & 6) !== 0) throw Error(r(327));
    var i = !n && (t & 127) === 0 && (t & e.expiredLanes) === 0 || In(e, t), o = i ? mS(e, t) : Kf(e, t, !0), c = i;
    do {
      if (o === 0) {
        Ds && !i && si(e, t, 0, !1);
        break;
      } else {
        if (n = e.current.alternate, c && !dS(n)) {
          o = Kf(e, t, !1), c = !1;
          continue;
        }
        if (o === 2) {
          if (c = t, e.errorRecoveryDisabledLanes & c)
            var m = 0;
          else
            m = e.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            t = m;
            e: {
              var b = e;
              o = Gl;
              var w = b.current.memoizedState.isDehydrated;
              if (w && (Vs(b, m).flags |= 256), m = Kf(
                b,
                m,
                !1
              ), m !== 2 && m !== 6) {
                if (qf && !w) {
                  b.errorRecoveryDisabledLanes |= c, Gi |= c, o = 4;
                  break e;
                }
                c = cn, cn = o, c !== null && (cn === null ? cn = c : cn.push.apply(
                  cn,
                  c
                ));
              }
              o = m;
            }
            if (c = !1, o !== 2) continue;
          }
        }
        if (o === 1) {
          Vs(e, 0), si(e, t, 0, !0);
          break;
        }
        e: {
          switch (i = e, c = o, c) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((t & 4194048) !== t && (t & 62914560) !== t)
                break;
            case 6:
              si(
                i,
                t,
                bn,
                !ni
              );
              break e;
            case 2:
              cn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((t & 62914560) === t && (o = Zo + 300 - Ft(), 10 < o)) {
            if (si(
              i,
              t,
              bn,
              !ni
            ), ss(i, 0, !0) !== 0) break e;
            sa = t, i.timeoutHandle = fd(
              c0.bind(
                null,
                i,
                n,
                cn,
                Qo,
                Gf,
                t,
                bn,
                Gi,
                Rs,
                ni,
                c,
                "Throttled",
                -0,
                0
              ),
              o
            );
            break e;
          }
          c0(
            i,
            n,
            cn,
            Qo,
            Gf,
            t,
            bn,
            Gi,
            Rs,
            ni,
            c,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    la(e);
  }
  function c0(e, t, n, i, o, c, m, b, w, _, B, Y, N, U) {
    e.timeoutHandle = -1;
    var ie = t.subtreeFlags, pe = (c & 335544064) === c;
    if (Y = null, (pe || ie & 8192 || (ie & 16785408) === 16785408) && (Y = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: Pn
    }, yn = null, t0(
      t,
      c,
      Y
    ), pe && (ie = Y, pe = e.containerInfo, pe = (pe.nodeType === 9 ? pe : pe.ownerDocument).__reactViewTransition, pe != null && (ie.count++, ie.waitingForViewTransition = !0, ie = Jl.bind(ie), pe.finished.then(ie, ie))), ie = (c & 62914560) === c ? Zo - Ft() : (c & 4194048) === c ? s0 - Ft() : 0, ie = gw(
      Y,
      ie
    ), ie !== null)) {
      sa = c, e.cancelPendingCommit = ie(
        y0.bind(
          null,
          e,
          t,
          c,
          n,
          i,
          o,
          m,
          b,
          w,
          _,
          B,
          Y,
          null,
          N,
          U
        )
      ), si(e, c, m, !_);
      return;
    }
    y0(
      e,
      t,
      c,
      n,
      i,
      o,
      m,
      b,
      w,
      _,
      B,
      Y
    );
  }
  function dS(e) {
    for (var t = e; ; ) {
      var n = t.tag;
      if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var o = n[i], c = o.getSnapshot;
          o = o.value;
          try {
            if (!pn(c(), o)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = t.child, t.subtreeFlags & 16384 && n !== null)
        n.return = t, t = n;
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    }
    return !0;
  }
  function si(e, t, n, i) {
    t = zr(e, t), t &= ~Xo, t &= ~Gi, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
    for (var o = t; 0 < o; ) {
      var c = 31 - Xt(o), m = 1 << c;
      i[c] = -1, o &= ~m;
    }
    n !== 0 && Vr(e, n, t);
  }
  function Io() {
    return (Qe & 6) === 0 ? (Xl(0), !1) : !0;
  }
  function Zf() {
    if (Be !== null) {
      if (Pe === 0)
        var e = Be.return;
      else
        e = Be, Ea = ki = null, $u(e), Ts = null, Al = 0, e = Be;
      for (; e !== null; )
        Rg(e.alternate, e), e = e.return;
      Be = null;
    }
  }
  function Vs(e, t) {
    var n = e.timeoutHandle;
    return n !== -1 && (e.timeoutHandle = -1, US(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), sa = 0, Zf(), tt = e, Be = n = Ta(e.current, null), qe = t, Pe = 0, vn = null, ni = !1, Ds = In(e, t), qf = !1, Rs = bn = Xo = Gi = ai = dt = 0, cn = Gl = null, Gf = !1, Da = zr(e, t), no(), n;
  }
  function u0(e, t) {
    Re = null, le.H = Mo, t === ws || t === mo ? (t = yp(), Pe = 3) : t === Bu ? (t = yp(), Pe = 4) : Pe = t === mf ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, vn = t, Be === null && (dt = 1, No(
      e,
      An(t, e.current)
    ));
  }
  function f0() {
    var e = Lt.current;
    return e === null ? !0 : (qe & 4194048) === qe ? Zt === null : (qe & 62914560) === qe || (qe & 536870912) !== 0 ? e === Zt : !1;
  }
  function d0() {
    var e = le.H;
    return le.H = Mo, e === null ? Mo : e;
  }
  function h0() {
    var e = le.A;
    return le.A = uS, e;
  }
  function Po() {
    dt = 4, ni || (qe & 4194048) !== qe && Lt.current !== null || (Ds = !0), (ai & 134217727) === 0 && (Gi & 134217727) === 0 || tt === null || si(
      tt,
      qe,
      bn,
      !1
    );
  }
  function Kf(e, t, n) {
    var i = Qe;
    Qe |= 2;
    var o = d0(), c = h0();
    (tt !== e || qe !== t) && (Qo = null, Vs(e, t)), t = !1;
    var m = dt;
    e: do
      try {
        if (Pe !== 0 && Be !== null) {
          var b = Be, w = vn;
          switch (Pe) {
            case 8:
              Zf(), m = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              Lt.current === null && (t = !0);
              var _ = Pe;
              if (Pe = 0, vn = null, Ls(e, b, w, _), n && Ds) {
                m = 0;
                break e;
              }
              break;
            default:
              _ = Pe, Pe = 0, vn = null, Ls(e, b, w, _);
          }
        }
        hS(), m = dt;
        break;
      } catch (B) {
        u0(e, B);
      }
    while (!0);
    return t && e.shellSuspendCounter++, Ea = ki = null, Qe = i, le.H = o, le.A = c, Be === null && (tt = null, qe = 0, no()), m;
  }
  function hS() {
    for (; Be !== null; ) m0(Be);
  }
  function mS(e, t) {
    var n = Qe;
    Qe |= 2;
    var i = d0(), o = h0();
    tt !== e || qe !== t ? (Qo = null, Ko = Ft() + 500, Vs(e, t)) : Ds = In(
      e,
      t
    );
    e: do
      try {
        if (Pe !== 0 && Be !== null) {
          t = Be;
          var c = vn;
          t: switch (Pe) {
            case 1:
              Pe = 0, vn = null, Ls(e, t, c, 1);
              break;
            case 2:
            case 9:
              if (pp(c)) {
                Pe = 0, vn = null, p0(t);
                break;
              }
              t = function() {
                Pe !== 2 && Pe !== 9 || tt !== e || (Pe = 7), la(e);
              }, c.then(t, t);
              break e;
            case 3:
              Pe = 7;
              break e;
            case 4:
              Pe = 5;
              break e;
            case 7:
              pp(c) ? (Pe = 0, vn = null, p0(t)) : (Pe = 0, vn = null, Ls(e, t, c, 7));
              break;
            case 5:
              var m = null;
              switch (Be.tag) {
                case 26:
                  m = Be.memoizedState;
                case 5:
                case 27:
                  var b = Be;
                  if (m ? ly(m) : b.stateNode.complete) {
                    Pe = 0, vn = null;
                    var w = b.sibling;
                    if (w !== null) Be = w;
                    else {
                      var _ = b.return;
                      _ !== null ? (Be = _, Jo(_)) : Be = null;
                    }
                    break t;
                  }
              }
              Pe = 0, vn = null, Ls(e, t, c, 5);
              break;
            case 6:
              Pe = 0, vn = null, Ls(e, t, c, 6);
              break;
            case 8:
              Zf(), dt = 6;
              break e;
            default:
              throw Error(r(462));
          }
        }
        pS();
        break;
      } catch (B) {
        u0(e, B);
      }
    while (!0);
    return Ea = ki = null, le.H = i, le.A = o, Qe = n, Be !== null ? 0 : (tt = null, qe = 0, no(), dt);
  }
  function pS() {
    for (; Be !== null && !Ua(); )
      m0(Be);
  }
  function m0(e) {
    var t = kg(e.alternate, e, Da);
    e.memoizedProps = e.pendingProps, t === null ? Jo(e) : Be = t;
  }
  function p0(e) {
    var t = e, n = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = Tg(
          n,
          t,
          t.pendingProps,
          t.type,
          void 0,
          qe
        );
        break;
      case 11:
        t = Tg(
          n,
          t,
          t.pendingProps,
          t.type.render,
          t.ref,
          qe
        );
        break;
      case 5:
        $u(t);
        var i = t;
        i === Nt && (Ue ? (oo(i), i.tag === 5 && i.stateNode != null && (it = i.stateNode)) : (oo(i), Ue = !0));
      default:
        Rg(n, t), t = Be = ip(t, Da), t = kg(n, t, Da);
    }
    e.memoizedProps = e.pendingProps, t === null ? Jo(e) : Be = t;
  }
  function Ls(e, t, n, i) {
    Ea = ki = null, $u(t), Ts = null, Al = 0;
    var o = t.return;
    try {
      if (nS(
        e,
        o,
        t,
        n,
        qe
      )) {
        dt = 1, No(
          e,
          An(n, e.current)
        ), Be = null;
        return;
      }
    } catch (c) {
      if (o !== null) throw Be = o, c;
      dt = 1, No(
        e,
        An(n, e.current)
      ), Be = null;
      return;
    }
    t.flags & 32768 ? (Ue || i === 1 ? e = !0 : Ds || (qe & 536870912) !== 0 ? e = !1 : (ni = e = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Lt.current, i !== null && i.tag === 13 && (i.flags |= 16384))), g0(t, e)) : Jo(t);
  }
  function Jo(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        g0(
          t,
          ni
        );
        return;
      }
      e = t.return;
      var n = lS(
        t.alternate,
        t,
        Da
      );
      if (n !== null) {
        Be = n;
        return;
      }
      if (t = t.sibling, t !== null) {
        Be = t;
        return;
      }
      Be = t = e;
    } while (t !== null);
    dt === 0 && (dt = 5);
  }
  function g0(e, t) {
    do {
      var n = rS(e.alternate, e);
      if (n !== null) {
        n.flags &= 32767, Be = n;
        return;
      }
      if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
        Be = e;
        return;
      }
      Be = e = n;
    } while (e !== null);
    dt = 6, Be = null;
  }
  function y0(e, t, n, i, o, c, m, b, w, _, B, Y) {
    e.cancelPendingCommit = null;
    do
      $o();
    while (ct !== 0);
    if ((Qe & 6) !== 0) throw Error(r(327));
    if (t !== null) {
      if (t === e.current) throw Error(r(177));
      e === tt && (Be = tt = null, qe = 0), Yi = t, qn = e, sa = n, Xf = o, l0 = i, gS(
        e,
        t,
        n,
        m,
        b,
        w,
        Y
      );
    }
  }
  function gS(e, t, n, i, o, c, m) {
    var b = t.lanes | t.childLanes;
    if (Yf = b, b |= ju, ls(
      e,
      n,
      b,
      i,
      o,
      c
    ), zs = null, (n & 335544064) === n ? (Os = X2(e), i = 10262) : (Os = null, i = 10256), (t.subtreeFlags & i) !== 0 || (t.flags & i) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, wS(Va, function() {
      return Pf(), null;
    })) : (e.callbackNode = null, e.callbackPriority = 0), Vo = !1, i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
      i = le.T, le.T = null, o = Se.p, Se.p = 2, c = Qe, Qe |= 4;
      try {
        oS(e, t, n);
      } finally {
        Qe = c, Se.p = o, le.T = i;
      }
    }
    ct = 1, Vo ? _s = GS(
      m,
      e.containerInfo,
      Os,
      Qf,
      Ff,
      vS,
      If,
      Pf,
      yS
    ) : (Qf(), Ff(), If());
  }
  function yS(e) {
    if (ct !== 0) {
      var t = qn.onRecoverableError;
      t(e, { componentStack: null });
    }
  }
  function vS() {
    ct === 3 && (ct = 0, Wg(Yi, qn), ct = 4);
  }
  function Qf() {
    if (ct === 1) {
      ct = 0;
      var e = qn, t = Yi, n = sa, i = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || i) {
        i = le.T, le.T = null;
        var o = Se.p;
        Se.p = 2;
        var c = Qe;
        Qe |= 4;
        try {
          Bl = Ho = !1, Jg(t, e, n), n = od;
          var m = Fm(e.containerInfo), b = n.focusedElem, w = n.selectionRange;
          if (m !== b && b && b.ownerDocument && Qm(
            b.ownerDocument.documentElement,
            b
          )) {
            if (w !== null && Su(b)) {
              var _ = w.start, B = w.end;
              if (B === void 0 && (B = _), "selectionStart" in b)
                b.selectionStart = _, b.selectionEnd = Math.min(
                  B,
                  b.value.length
                );
              else {
                var Y = b.ownerDocument || document, N = Y && Y.defaultView || window;
                if (N.getSelection) {
                  var U = N.getSelection(), ie = b.textContent.length, pe = Math.min(w.start, ie), _e = w.end === void 0 ? pe : Math.min(w.end, ie);
                  !U.extend && pe > _e && (m = _e, _e = pe, pe = m);
                  var k = Km(
                    b,
                    pe
                  ), A = Km(
                    b,
                    _e
                  );
                  if (k && A && (U.rangeCount !== 1 || U.anchorNode !== k.node || U.anchorOffset !== k.offset || U.focusNode !== A.node || U.focusOffset !== A.offset)) {
                    var z = Y.createRange();
                    z.setStart(k.node, k.offset), U.removeAllRanges(), pe > _e ? (U.addRange(z), U.extend(A.node, A.offset)) : (z.setEnd(A.node, A.offset), U.addRange(z));
                  }
                }
              }
            }
            for (Y = [], U = b; U = U.parentNode; )
              U.nodeType === 1 && Y.push({
                element: U,
                left: U.scrollLeft,
                top: U.scrollTop
              });
            for (typeof b.focus == "function" && b.focus(), b = 0; b < Y.length; b++) {
              var G = Y[b];
              G.element.scrollLeft = G.left, G.element.scrollTop = G.top;
            }
          }
          Ks = !!rd, od = rd = null;
        } finally {
          Qe = c, Se.p = o, le.T = i;
        }
      }
      e.current = t, ct = 2;
    }
  }
  function Ff() {
    if (ct === 2) {
      ct = 0;
      var e = qn, t = Yi, n = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || n) {
        n = le.T, le.T = null;
        var i = Se.p;
        Se.p = 2;
        var o = Qe;
        Qe |= 4;
        try {
          Zg(e, t.alternate, t);
        } finally {
          Qe = o, Se.p = i, le.T = n;
        }
      }
      ct = 3;
    }
  }
  function If() {
    if (ct === 4 || ct === 3) {
      ct = 0;
      var e = _s;
      _s = null, Dr();
      var t = qn, n = Yi, i = sa, o = l0, c = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & c) !== 0 || (n.flags & c) !== 0 ? ct = 5 : (ct = 0, Yi = qn = null, v0(t, t.pendingLanes)), c = t.pendingLanes, c === 0 && (ii = null), rs(i), n = n.stateNode, Pt && typeof Pt.onCommitFiberRoot == "function")
        try {
          Pt.onCommitFiberRoot(
            ga,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (o !== null) {
        n = le.T, c = Se.p, Se.p = 2, le.T = null;
        try {
          for (var m = t.onRecoverableError, b = 0; b < o.length; b++) {
            var w = o[b];
            m(w.value, {
              componentStack: w.stack
            });
          }
        } finally {
          le.T = n, Se.p = c;
        }
      }
      if (o = zs, m = Os, Os = null, o !== null && (zs = null, m === null && (m = []), e !== null))
        for (w = 0; w < o.length; w++)
          n = (0, o[w])(
            m
          ), n !== void 0 && e.finished.finally(n);
      (sa & 3) !== 0 && $o(), la(t), c = t.pendingLanes, (i & 261930) !== 0 && (c & 42) !== 0 ? t === Fo ? Yl++ : (Yl = 0, Fo = t) : (Yl = 0, Fo = null), Xl(0);
    }
  }
  function v0(e, t) {
    (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Cl(t)));
  }
  function $o() {
    return _s !== null && (_s.skipTransition(), _s = null), Qf(), Ff(), If(), Pf();
  }
  function Pf() {
    if (ct !== 5) return !1;
    var e = qn, t = Yf;
    Yf = 0;
    var n = rs(sa), i = le.T, o = Se.p;
    try {
      Se.p = 32 > n ? 32 : n, le.T = null, n = Xf, Xf = null;
      var c = qn, m = sa;
      if (ct = 0, Yi = qn = null, sa = 0, (Qe & 6) !== 0) throw Error(r(331));
      var b = Qe;
      if (Qe |= 4, a0(c.current), e0(
        c,
        c.current,
        m,
        n
      ), Qe = b, Xl(0, !1), Pt && typeof Pt.onPostCommitFiberRoot == "function")
        try {
          Pt.onPostCommitFiberRoot(ga, c);
        } catch {
        }
      return !0;
    } finally {
      Se.p = o, le.T = i, v0(e, t);
    }
  }
  function b0(e, t, n) {
    t = An(n, t), t = hf(e.stateNode, t, 2), e = Pa(e, t, 2), e !== null && (Ba(e, 2), la(e));
  }
  function Je(e, t, n) {
    if (e.tag === 3)
      b0(e, e, n);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          b0(
            t,
            e,
            n
          );
          break;
        } else if (t.tag === 1) {
          var i = t.stateNode;
          if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (ii === null || !ii.has(i))) {
            e = An(n, e), n = pg(2), i = Pa(t, n, 2), i !== null && (gg(
              n,
              i,
              t,
              e
            ), Ba(i, 2), la(i));
            break;
          }
        }
        t = t.return;
      }
  }
  function Jf(e, t, n) {
    var i = e.pingCache;
    if (i === null) {
      i = e.pingCache = new fS();
      var o = /* @__PURE__ */ new Set();
      i.set(t, o);
    } else
      o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
    o.has(n) || (qf = !0, o.add(n), e = bS.bind(null, e, t, n), t.then(e, e));
  }
  function bS(e, t, n) {
    var i = e.pingCache;
    i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, tt === e && (qe & n) === n && ((dt === 4 || dt === 3 && (qe & 62914560) === qe && 300 > Ft() - Zo) && (Qe & 2) === 0 ? Vs(e, 0) : Xo |= n, Rs === qe && (Rs = 0)), la(e);
  }
  function x0(e, t) {
    t === 0 && (t = Ur()), e = Ai(e, t), e !== null && (Ba(e, t), la(e));
  }
  function xS(e) {
    var t = e.memoizedState, n = 0;
    t !== null && (n = t.retryLane), x0(e, n);
  }
  function SS(e, t) {
    var n = 0;
    switch (e.tag) {
      case 31:
      case 13:
        var i = e.stateNode, o = e.memoizedState;
        o !== null && (n = o.retryLane);
        break;
      case 19:
        i = e.stateNode;
        break;
      case 22:
        i = e.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    i !== null && i.delete(t), x0(e, n);
  }
  function wS(e, t) {
    return Un(e, t);
  }
  var Bs = null, Hs = null, $f = !1, Wo = !1, Wf = !1, li = 0;
  function la(e) {
    e !== Hs && e.next === null && (Hs === null ? Bs = Hs = e : Hs = Hs.next = e), Wo = !0, $f || ($f = !0, CS());
  }
  function Xl(e, t) {
    if (!Wf && Wo) {
      Wf = !0;
      do
        for (var n = !1, i = Bs; i !== null; ) {
          if (e !== 0) {
            var o = i.pendingLanes;
            if (o === 0) var c = 0;
            else {
              var m = i.suspendedLanes, b = i.pingedLanes;
              c = (1 << 31 - Xt(42 | e) + 1) - 1, c &= o & ~(m & ~b), c = c & 201326741 ? c & 201326741 | 1 : c ? c | 2 : 0;
            }
            c !== 0 && (n = !0, C0(i, c));
          } else
            c = qe, c = ss(
              i,
              i === tt ? c : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (c & 3) === 0 || In(i, c) || (n = !0, C0(i, c));
          i = i.next;
        }
      while (n);
      Wf = !1;
    }
  }
  function TS() {
    S0();
  }
  function S0() {
    Wo = $f = !1;
    var e = 0;
    li !== 0 && OS() && (e = li);
    for (var t = Ft(), n = null, i = Bs; i !== null; ) {
      var o = i.next, c = w0(i, t);
      c === 0 ? (i.next = null, n === null ? Bs = o : n.next = o, o === null && (Hs = n)) : (n = i, (e !== 0 || (c & 3) !== 0) && (Wo = !0)), i = o;
    }
    ct !== 0 && ct !== 5 || Xl(e), li !== 0 && (li = 0);
  }
  function w0(e, t) {
    for (var n = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, c = e.pendingLanes & -62914561; 0 < c; ) {
      var m = 31 - Xt(c), b = 1 << m, w = o[m];
      w === -1 ? ((b & n) === 0 || (b & i) !== 0) && (o[m] = Or(b, t)) : w <= t && (e.expiredLanes |= b), c &= ~b;
    }
    if (t = tt, n = qe, n = ss(
      e,
      e === t ? n : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i = e.callbackNode, n === 0 || e === t && (Pe === 2 || Pe === 9) || e.cancelPendingCommit !== null)
      return i !== null && i !== null && Fn(i), e.callbackNode = null, e.callbackPriority = 0;
    if ((n & 3) === 0 || In(e, n)) {
      if (t = n & -n, t === e.callbackPriority) return t;
      switch (i !== null && Fn(i), rs(n)) {
        case 2:
        case 8:
          n = rl;
          break;
        case 32:
          n = Va;
          break;
        case 268435456:
          n = Rr;
          break;
        default:
          n = Va;
      }
      return i = T0.bind(null, e), n = Un(n, i), e.callbackPriority = t, e.callbackNode = n, t;
    }
    return i !== null && i !== null && Fn(i), e.callbackPriority = 2, e.callbackNode = null, 2;
  }
  function T0(e, t) {
    if (ct !== 0 && ct !== 5)
      return e.callbackNode = null, e.callbackPriority = 0, null;
    var n = e.callbackNode;
    if ($o() && e.callbackNode !== n)
      return null;
    var i = qe;
    return i = ss(
      e,
      e === tt ? i : 0,
      e.cancelPendingCommit !== null || e.timeoutHandle !== -1
    ), i === 0 ? null : (o0(e, i, t), w0(e, Ft()), e.callbackNode != null && e.callbackNode === n ? T0.bind(null, e) : null);
  }
  function C0(e, t) {
    if ($o()) return null;
    o0(e, t, !0);
  }
  function CS() {
    VS(function() {
      (Qe & 6) !== 0 ? Un(
        Mt,
        TS
      ) : S0();
    });
  }
  function ed() {
    if (li === 0) {
      var e = _i;
      e === 0 && (e = wi, wi <<= 1, (wi & 261888) === 0 && (wi = 256)), li = e;
    }
    return li;
  }
  function E0(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Fr(e);
  }
  function ES(e, t, n, i, o) {
    if (t === "submit" && n && n.stateNode === o) {
      var c = E0(
        (o[Ot] || null).action
      ), m = i.submitter;
      m && (t = (t = m[Ot] || null) ? E0(t.formAction) : m.getAttribute("formAction"), t !== null && (c = t, m = null));
      var b = new $r(
        "action",
        "action",
        null,
        i,
        o
      );
      e.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (li !== 0) {
                  var w = new FormData(o, m);
                  of(
                    n,
                    {
                      pending: !0,
                      data: w,
                      method: o.method,
                      action: c
                    },
                    null,
                    w
                  );
                }
              } else
                typeof c == "function" && (b.preventDefault(), w = new FormData(o, m), of(
                  n,
                  {
                    pending: !0,
                    data: w,
                    method: o.method,
                    action: c
                  },
                  c,
                  w
                ));
            },
            currentTarget: o
          }
        ]
      });
    }
  }
  for (var td = 0; td < Eu.length; td++) {
    var nd = Eu[td], jS = nd.toLowerCase(), AS = nd[0].toUpperCase() + nd.slice(1);
    Vn(
      jS,
      "on" + AS
    );
  }
  Vn(Jm, "onAnimationEnd"), Vn($m, "onAnimationIteration"), Vn(Wm, "onAnimationStart"), Vn("dblclick", "onDoubleClick"), Vn("focusin", "onFocus"), Vn("focusout", "onBlur"), Vn(U2, "onTransitionRun"), Vn(V2, "onTransitionStart"), Vn(L2, "onTransitionCancel"), Vn(ep, "onTransitionEnd"), Ha("onMouseEnter", ["mouseout", "mouseover"]), Ha("onMouseLeave", ["mouseout", "mouseover"]), Ha("onPointerEnter", ["pointerout", "pointerover"]), Ha("onPointerLeave", ["pointerout", "pointerover"]), hn(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), hn(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), hn("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), hn(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), hn(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), hn(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Zl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), MS = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zl)
  );
  function j0(e, t) {
    t = (t & 4) !== 0;
    for (var n = 0; n < e.length; n++) {
      var i = e[n], o = i.event;
      i = i.listeners;
      e: {
        var c = void 0;
        if (t)
          for (var m = i.length - 1; 0 <= m; m--) {
            var b = i[m], w = b.instance, _ = b.currentTarget;
            if (b = b.listener, w !== c && o.isPropagationStopped())
              break e;
            c = b, o.currentTarget = _;
            try {
              c(o);
            } catch (B) {
              to(B);
            }
            o.currentTarget = null, c = w;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (b = i[m], w = b.instance, _ = b.currentTarget, b = b.listener, w !== c && o.isPropagationStopped())
              break e;
            c = b, o.currentTarget = _;
            try {
              c(o);
            } catch (B) {
              to(B);
            }
            o.currentTarget = null, c = w;
          }
      }
    }
  }
  function He(e, t) {
    var n = t[qr];
    n === void 0 && (n = t[qr] = /* @__PURE__ */ new Set());
    var i = e + "__bubble";
    n.has(i) || (A0(t, e, 2, !1), n.add(i));
  }
  function ad(e, t, n) {
    var i = 0;
    t && (i |= 4), A0(
      n,
      e,
      i,
      t
    );
  }
  var ec = "_reactListening" + Math.random().toString(36).slice(2);
  function id(e) {
    if (!e[ec]) {
      e[ec] = !0, va.forEach(function(n) {
        n !== "selectionchange" && (MS.has(n) || ad(n, !1, e), ad(n, !0, e));
      });
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[ec] || (t[ec] = !0, ad("selectionchange", !1, t));
    }
  }
  function A0(e, t, n, i) {
    switch (gy(t)) {
      case 2:
        var o = xw;
        break;
      case 8:
        o = Sw;
        break;
      default:
        o = Cd;
    }
    n = o.bind(
      null,
      t,
      n,
      e
    ), o = void 0, !fu || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, n, {
      capture: !0,
      passive: o
    }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
      passive: o
    }) : e.addEventListener(t, n, !1);
  }
  function sd(e, t, n, i, o) {
    var c = i;
    if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
      e: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var b = i.stateNode.containerInfo;
          if (b === o) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var w = m.tag;
              if ((w === 3 || w === 4) && m.stateNode.containerInfo === o)
                return;
              m = m.return;
            }
          for (; b !== null; ) {
            if (m = se(b), m === null) return;
            if (w = m.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              i = c = m;
              continue e;
            }
            b = b.parentNode;
          }
        }
        i = i.return;
      }
    Am(function() {
      var _ = c, B = cu(n), Y = [];
      e: {
        var N = tp.get(e);
        if (N !== void 0) {
          var U = $r, ie = e;
          switch (e) {
            case "keypress":
              if (Pr(n) === 0) break e;
            case "keydown":
            case "keyup":
              U = d2;
              break;
            case "focusin":
              ie = "focus", U = pu;
              break;
            case "focusout":
              ie = "blur", U = pu;
              break;
            case "beforeblur":
            case "afterblur":
              U = pu;
              break;
            case "click":
              if (n.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              U = km;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              U = e2;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              U = y2;
              break;
            case Jm:
            case $m:
            case Wm:
              U = a2;
              break;
            case ep:
              U = b2;
              break;
            case "scroll":
            case "scrollend":
              U = $x;
              break;
            case "wheel":
              U = S2;
              break;
            case "copy":
            case "cut":
            case "paste":
              U = s2;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              U = Rm;
              break;
            case "submit":
              U = p2;
              break;
            case "toggle":
            case "beforetoggle":
              U = T2;
          }
          var pe = (t & 4) !== 0, _e = !pe && (e === "scroll" || e === "scrollend"), k = pe ? N !== null ? N + "Capture" : null : N;
          pe = [];
          for (var A = _, z; A !== null; ) {
            var G = A;
            if (z = G.stateNode, G = G.tag, G !== 5 && G !== 26 && G !== 27 || z === null || k === null || (G = hl(A, k), G != null && pe.push(
              Kl(A, G, z)
            )), _e) break;
            A = A.return;
          }
          0 < pe.length && (N = new U(
            N,
            ie,
            null,
            n,
            B
          ), Y.push({ event: N, listeners: pe }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (U = e === "mouseover" || e === "pointerover", N = e === "mouseout" || e === "pointerout", U && n !== ou && (ie = n.relatedTarget || n.fromElement) && (se(ie) || ie[ya]))
            break e;
          (N || U) && (ie = B.window === B ? B : (U = B.ownerDocument) ? U.defaultView || U.parentWindow : window, N ? (U = n.relatedTarget || n.toElement, N = _, U = U ? se(U) : null, U !== null && (_e = h(U), pe = U.tag, U !== _e || pe !== 5 && pe !== 27 && pe !== 6) && (U = null)) : (N = null, U = _), N !== U && (pe = km, G = "onMouseLeave", k = "onMouseEnter", A = "mouse", (e === "pointerout" || e === "pointerover") && (pe = Rm, G = "onPointerLeave", k = "onPointerEnter", A = "pointer"), _e = N == null ? ie : Le(N), z = U == null ? ie : Le(U), ie = new pe(
            G,
            A + "leave",
            N,
            n,
            B
          ), ie.target = _e, ie.relatedTarget = z, G = null, se(B) === _ && (pe = new pe(
            k,
            A + "enter",
            U,
            n,
            B
          ), pe.target = z, pe.relatedTarget = _e, G = pe), _e = G, pe = N && U ? oe(
            N,
            U,
            NS
          ) : null, N !== null && M0(
            Y,
            ie,
            N,
            pe,
            !1
          ), U !== null && _e !== null && M0(
            Y,
            _e,
            U,
            pe,
            !0
          )));
        }
        e: {
          if (N = _ ? Le(_) : window, U = N.nodeName && N.nodeName.toLowerCase(), U === "select" || U === "input" && N.type === "file")
            var ue = Hm;
          else if (Lm(N))
            if (qm)
              ue = _2;
            else {
              ue = D2;
              var Ge = k2;
            }
          else
            U = N.nodeName, !U || U.toLowerCase() !== "input" || N.type !== "checkbox" && N.type !== "radio" ? _ && ru(_.elementType) && (ue = Hm) : ue = R2;
          if (ue && (ue = ue(e, _))) {
            Bm(
              Y,
              ue,
              n,
              B
            );
            break e;
          }
          Ge && Ge(e, N, _);
        }
        switch (Ge = _ ? Le(_) : window, e) {
          case "focusin":
            (Lm(Ge) || Ge.contentEditable === "true") && (ms = Ge, wu = _, Sl = null);
            break;
          case "focusout":
            Sl = wu = ms = null;
            break;
          case "mousedown":
            Tu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Tu = !1, Im(Y, n, B);
            break;
          case "selectionchange":
            if (O2) break;
          case "keydown":
          case "keyup":
            Im(Y, n, B);
        }
        var ve;
        if (yu)
          e: {
            switch (e) {
              case "compositionstart":
                var je = "onCompositionStart";
                break e;
              case "compositionend":
                je = "onCompositionEnd";
                break e;
              case "compositionupdate":
                je = "onCompositionUpdate";
                break e;
            }
            je = void 0;
          }
        else
          hs ? Um(e, n) && (je = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (je = "onCompositionStart");
        je && (_m && n.locale !== "ko" && (hs || je !== "onCompositionStart" ? je === "onCompositionEnd" && hs && (ve = Mm()) : (qa = B, du = "value" in qa ? qa.value : qa.textContent, hs = !0)), Ge = tc(_, je), 0 < Ge.length && (je = new Dm(
          je,
          e,
          null,
          n,
          B
        ), Y.push({ event: je, listeners: Ge }), ve ? je.data = ve : (ve = Vm(n), ve !== null && (je.data = ve)))), (ve = E2 ? j2(e, n) : A2(e, n)) && (je = tc(_, "onBeforeInput"), 0 < je.length && (Ge = new Dm(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          B
        ), Y.push({
          event: Ge,
          listeners: je
        }), Ge.data = ve)), ES(
          Y,
          e,
          _,
          n,
          B
        );
      }
      j0(Y, t);
    });
  }
  function Kl(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function tc(e, t) {
    for (var n = t + "Capture", i = []; e !== null; ) {
      var o = e, c = o.stateNode;
      if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || c === null || (o = hl(e, n), o != null && i.unshift(
        Kl(e, o, c)
      ), o = hl(e, t), o != null && i.push(
        Kl(e, o, c)
      )), e.tag === 3) return i;
      e = e.return;
    }
    return [];
  }
  function NS(e) {
    if (e === null) return null;
    do
      e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function M0(e, t, n, i, o) {
    for (var c = t._reactName, m = []; n !== null && n !== i; ) {
      var b = n, w = b.alternate, _ = b.stateNode;
      if (b = b.tag, w !== null && w === i) break;
      b !== 5 && b !== 26 && b !== 27 || _ === null || (w = _, o ? (_ = hl(n, c), _ != null && m.unshift(
        Kl(n, _, w)
      )) : o || (_ = hl(n, c), _ != null && m.push(
        Kl(n, _, w)
      ))), n = n.return;
    }
    m.length !== 0 && e.push({ event: t, listeners: m });
  }
  var kS = /\r\n?/g, DS = /\u0000|\uFFFD/g;
  function N0(e) {
    return (typeof e == "string" ? e : "" + e).replace(kS, `
`).replace(DS, "");
  }
  function k0(e, t) {
    return t = N0(t), N0(e) === t;
  }
  function $e(e, t, n, i, o, c) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          t === "body" || t === "textarea" && i === "" || us(e, i);
        else if (typeof i == "number" || typeof i == "bigint")
          t !== "body" && us(e, "" + i);
        else return;
        break;
      case "className":
        Qr(e, "class", i);
        break;
      case "tabIndex":
        Qr(e, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Qr(e, n, i);
        break;
      case "style":
        Em(e, i, c);
        return;
      case "data":
        if (t !== "object") {
          Qr(e, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (t !== "a" || n !== "href")) {
          e.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = Fr(i), e.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          e.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof c == "function" && (n === "formAction" ? (t !== "input" && $e(e, t, "name", o.name, o, null), $e(
            e,
            t,
            "formEncType",
            o.formEncType,
            o,
            null
          ), $e(
            e,
            t,
            "formMethod",
            o.formMethod,
            o,
            null
          ), $e(
            e,
            t,
            "formTarget",
            o.formTarget,
            o,
            null
          )) : ($e(e, t, "encType", o.encType, o, null), $e(e, t, "method", o.method, o, null), $e(e, t, "target", o.target, o, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          e.removeAttribute(n);
          break;
        }
        i = Fr(i), e.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (e.onclick = Pn);
        return;
      case "onScroll":
        i != null && He("scroll", e);
        return;
      case "onScrollEnd":
        i != null && He("scrollend", e);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(r(61));
          if (n = i.__html, n != null) {
            if (o.children != null) throw Error(r(60));
            c?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "multiple":
        e.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        e.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          e.removeAttribute("xlink:href");
          break;
        }
        n = Fr(i), e.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? e.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? e.setAttribute(n, i) : e.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(n) : e.setAttribute(n, i);
        break;
      case "popover":
        He("beforetoggle", e), He("toggle", e), Kr(e, "popover", i);
        break;
      case "xlinkActuate":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        ba(
          e,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        ba(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        ba(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        ba(
          e,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        Kr(e, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = Px.get(n) || n, Kr(e, n, i);
        else return;
    }
    Ke = !0;
  }
  function ld(e, t, n, i, o, c) {
    switch (n) {
      case "style":
        Em(e, i, c);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(r(61));
          if (n = i.__html, n != null) {
            if (o.children != null) throw Error(r(60));
            c?.__html !== n && (e.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof i == "string") us(e, i);
        else if (typeof i == "number" || typeof i == "bigint")
          us(e, "" + i);
        else return;
        break;
      case "onScroll":
        i != null && He("scroll", e);
        return;
      case "onScrollEnd":
        i != null && He("scrollend", e);
        return;
      case "onClick":
        i != null && (e.onclick = Pn);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!Ut.hasOwnProperty(n))
          e: {
            if (n[0] === "o" && n[1] === "n" && (o = n.endsWith("Capture"), c = n.slice(2, o ? n.length - 7 : void 0), t = e[Ot] || null, t = t != null ? t[n] : null, typeof t == "function" && e.removeEventListener(c, t, o), typeof i == "function")) {
              typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(c, i, o);
              break e;
            }
            Ke = !0, n in e ? e[n] = i : i === !0 ? e.setAttribute(n, "") : Kr(e, n, i);
          }
        return;
    }
    Ke = !0;
  }
  function qt(e, t, n) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        He("error", e), He("load", e);
        var i = !1, o = !1, c;
        for (c in n)
          if (n.hasOwnProperty(c)) {
            var m = n[c];
            if (m != null)
              switch (c) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  o = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, t));
                default:
                  $e(e, t, c, m, n, null);
              }
          }
        o && $e(e, t, "srcSet", n.srcSet, n, null), i && $e(e, t, "src", n.src, n, null);
        return;
      case "input":
        He("invalid", e);
        var b = c = m = o = null, w = null, _ = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var B = n[i];
            if (B != null)
              switch (i) {
                case "name":
                  o = B;
                  break;
                case "type":
                  m = B;
                  break;
                case "checked":
                  w = B;
                  break;
                case "defaultChecked":
                  _ = B;
                  break;
                case "value":
                  c = B;
                  break;
                case "defaultValue":
                  b = B;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null)
                    throw Error(r(137, t));
                  break;
                default:
                  $e(e, t, i, B, n, null);
              }
          }
        Sm(
          e,
          c,
          b,
          w,
          _,
          m,
          o,
          !1
        );
        return;
      case "select":
        He("invalid", e), i = m = c = null;
        for (o in n)
          if (n.hasOwnProperty(o) && (b = n[o], b != null))
            switch (o) {
              case "value":
                c = b;
                break;
              case "defaultValue":
                m = b;
                break;
              case "multiple":
                i = b;
              default:
                $e(e, t, o, b, n, null);
            }
        t = c, n = m, e.multiple = !!i, t != null ? cs(e, !!i, t, !1) : n != null && cs(e, !!i, n, !0);
        return;
      case "textarea":
        He("invalid", e), c = o = i = null;
        for (m in n)
          if (n.hasOwnProperty(m) && (b = n[m], b != null))
            switch (m) {
              case "value":
                i = b;
                break;
              case "defaultValue":
                o = b;
                break;
              case "children":
                c = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(r(91));
                break;
              default:
                $e(e, t, m, b, n, null);
            }
        Tm(e, i, o, c);
        return;
      case "option":
        for (w in n)
          n.hasOwnProperty(w) && (i = n[w], i != null) && (w === "selected" ? e.selected = i && typeof i != "function" && typeof i != "symbol" : $e(e, t, w, i, n, null));
        return;
      case "dialog":
        He("beforetoggle", e), He("toggle", e), He("cancel", e), He("close", e);
        break;
      case "iframe":
      case "object":
        He("load", e);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Zl.length; i++)
          He(Zl[i], e);
        break;
      case "image":
        He("error", e), He("load", e);
        break;
      case "details":
        He("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        He("error", e), He("load", e);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (_ in n)
          if (n.hasOwnProperty(_) && (i = n[_], i != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, t));
              default:
                $e(e, t, _, i, n, null);
            }
        return;
      default:
        if (ru(t)) {
          for (B in n)
            n.hasOwnProperty(B) && (i = n[B], i !== void 0 && ld(
              e,
              t,
              B,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (b in n)
      n.hasOwnProperty(b) && (i = n[b], i != null && $e(e, t, b, i, n, null));
  }
  var RS = {};
  function _S(e, t, n, i) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var o = null, c = null, m = null, b = null, w = null, _ = null, B = null;
        for (U in n) {
          var Y = n[U];
          if (n.hasOwnProperty(U) && Y != null)
            switch (U) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = Y;
              default:
                i.hasOwnProperty(U) || $e(e, t, U, null, i, Y);
            }
        }
        for (var N in i) {
          var U = i[N];
          if (Y = n[N], i.hasOwnProperty(N) && (U != null || Y != null))
            switch (N) {
              case "type":
                U !== Y && (Ke = !0), c = U;
                break;
              case "name":
                U !== Y && (Ke = !0), o = U;
                break;
              case "checked":
                U !== Y && (Ke = !0), _ = U;
                break;
              case "defaultChecked":
                U !== Y && (Ke = !0), B = U;
                break;
              case "value":
                U !== Y && (Ke = !0), m = U;
                break;
              case "defaultValue":
                U !== Y && (Ke = !0), b = U;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(r(137, t));
                break;
              default:
                U !== Y && $e(
                  e,
                  t,
                  N,
                  U,
                  i,
                  Y
                );
            }
        }
        su(
          e,
          m,
          b,
          w,
          _,
          B,
          c,
          o
        );
        return;
      case "select":
        U = m = b = N = null;
        for (c in n)
          if (w = n[c], n.hasOwnProperty(c) && w != null)
            switch (c) {
              case "value":
                break;
              case "multiple":
                U = w;
              default:
                i.hasOwnProperty(c) || $e(
                  e,
                  t,
                  c,
                  null,
                  i,
                  w
                );
            }
        for (o in i)
          if (c = i[o], w = n[o], i.hasOwnProperty(o) && (c != null || w != null))
            switch (o) {
              case "value":
                c !== w && (Ke = !0), N = c;
                break;
              case "defaultValue":
                c !== w && (Ke = !0), b = c;
                break;
              case "multiple":
                c !== w && (Ke = !0), m = c;
              default:
                c !== w && $e(
                  e,
                  t,
                  o,
                  c,
                  i,
                  w
                );
            }
        t = b, n = m, i = U, N != null ? cs(e, !!n, N, !1) : !!i != !!n && (t != null ? cs(e, !!n, t, !0) : cs(e, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        U = N = null;
        for (b in n)
          if (o = n[b], n.hasOwnProperty(b) && o != null && !i.hasOwnProperty(b))
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                $e(e, t, b, null, i, o);
            }
        for (m in i)
          if (o = i[m], c = n[m], i.hasOwnProperty(m) && (o != null || c != null))
            switch (m) {
              case "value":
                o !== c && (Ke = !0), N = o;
                break;
              case "defaultValue":
                o !== c && (Ke = !0), U = o;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (o != null) throw Error(r(91));
                break;
              default:
                o !== c && $e(e, t, m, o, i, c);
            }
        wm(e, N, U);
        return;
      case "option":
        for (var ie in n)
          N = n[ie], n.hasOwnProperty(ie) && N != null && !i.hasOwnProperty(ie) && (ie === "selected" ? e.selected = !1 : $e(
            e,
            t,
            ie,
            null,
            i,
            N
          ));
        for (w in i)
          N = i[w], U = n[w], i.hasOwnProperty(w) && N !== U && (N != null || U != null) && (w === "selected" ? (N !== U && (Ke = !0), e.selected = N && typeof N != "function" && typeof N != "symbol") : $e(
            e,
            t,
            w,
            N,
            i,
            U
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var pe in n)
          N = n[pe], n.hasOwnProperty(pe) && N != null && !i.hasOwnProperty(pe) && $e(e, t, pe, null, i, N);
        for (_ in i)
          if (N = i[_], U = n[_], i.hasOwnProperty(_) && N !== U && (N != null || U != null))
            switch (_) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(r(137, t));
                break;
              default:
                $e(
                  e,
                  t,
                  _,
                  N,
                  i,
                  U
                );
            }
        return;
      default:
        if (ru(t)) {
          for (var _e in n)
            N = n[_e], n.hasOwnProperty(_e) && N !== void 0 && !i.hasOwnProperty(_e) && ld(
              e,
              t,
              _e,
              void 0,
              i,
              N
            );
          for (B in i)
            N = i[B], U = n[B], !i.hasOwnProperty(B) || N === U || N === void 0 && U === void 0 || ld(
              e,
              t,
              B,
              N,
              i,
              U
            );
          return;
        }
    }
    for (var k in n)
      N = n[k], n.hasOwnProperty(k) && N != null && !i.hasOwnProperty(k) && $e(e, t, k, null, i, N);
    for (Y in i)
      N = i[Y], U = n[Y], !i.hasOwnProperty(Y) || N === U || N == null && U == null || $e(e, t, Y, N, i, U);
  }
  function D0(e) {
    switch (e) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function zS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var o = n[i], c = o.transferSize, m = o.initiatorType, b = o.duration;
        if (c && b && D0(m)) {
          for (m = 0, b = o.responseEnd, i += 1; i < n.length; i++) {
            var w = n[i], _ = w.startTime;
            if (_ > b) break;
            var B = w.transferSize, Y = w.initiatorType;
            B && D0(Y) && (w = w.responseEnd, m += B * (w < b ? 1 : (b - _) / (w - _)));
          }
          if (--i, t += 8 * (c + m) / (o.duration / 1e3), e++, 10 < e) break;
        }
      }
      if (0 < e) return t / e / 1e6;
    }
    return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
  }
  var rd = null, od = null;
  function Ql(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function R0(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function _0(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function z0(e, t, n, i) {
    return n = Ql(
      n
    ).createElement(e), n[lt] = i, n[Ot] = t, qt(n, e, t), Oe(n), n;
  }
  function cd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  var ud = null;
  function OS() {
    var e = window.event;
    return e && e.type === "popstate" ? e === ud ? !1 : (ud = e, !0) : (ud = null, !1);
  }
  var fd = typeof setTimeout == "function" ? setTimeout : void 0, US = typeof clearTimeout == "function" ? clearTimeout : void 0, O0 = typeof Promise == "function" ? Promise : void 0, U0 = typeof requestAnimationFrame == "function" ? requestAnimationFrame : fd, VS = typeof queueMicrotask == "function" ? queueMicrotask : typeof O0 < "u" ? function(e) {
    return O0.resolve(null).then(e).catch(LS);
  } : fd;
  function LS(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function ri(e) {
    return e === "head";
  }
  function V0(e, t) {
    var n = t, i = 0;
    do {
      var o = n.nextSibling;
      if (e.removeChild(n), o && o.nodeType === 8)
        if (n = o.data, n === "/$" || n === "/&") {
          if (i === 0) {
            e.removeChild(o), Qs(t);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          bd(
            e.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = e.ownerDocument.head, bd(n);
          for (var c = n.firstChild; c; ) {
            var m = c.nextSibling, b = c.nodeName;
            c[Ci] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && c.rel.toLowerCase() === "stylesheet" || n.removeChild(c), c = m;
          }
        } else
          n === "body" && bd(e.ownerDocument.body);
      n = o;
    } while (n);
    Qs(t);
  }
  function L0(e, t) {
    var n = e;
    e = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (e === 0) break;
          e--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
      n = i;
    } while (n);
  }
  function B0(e, t, n) {
    if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
      if (t = e.getClientRects(), t.length === 1) var i = 1;
      else
        for (var o = i = 0; o < t.length; o++) {
          var c = t[o];
          0 < c.width && 0 < c.height && i++;
        }
      i === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
    }
  }
  function H0(e, t) {
    e = e.style, t = t.style;
    var n = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
    e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n != null ? e.margin = n : (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t)));
  }
  function BS(e, t, n) {
    return n = n.ownerDocument.defaultView, {
      rect: e,
      abs: t.position === "absolute" || t.position === "fixed",
      clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
      view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
    };
  }
  function dd(e) {
    var t = e.getBoundingClientRect(), n = getComputedStyle(e);
    return BS(t, n, e);
  }
  function HS(e) {
    return e.documentElement.clientHeight;
  }
  function qS(e) {
    this.addEventListener("load", e), this.addEventListener("error", e);
  }
  function GS(e, t, n, i, o, c, m, b, w) {
    var _ = t.nodeType === 9 ? t : t.ownerDocument;
    try {
      var B = _.startViewTransition({
        update: function() {
          var N = _.defaultView, U = N.navigation && N.navigation.transition, ie = _.fonts.status;
          i();
          var pe = [];
          if (ie === "loaded" && (HS(_), _.fonts.status === "loading" && pe.push(_.fonts.ready)), ie = pe.length, e !== null)
            for (var _e = e.suspenseyImages, k = 0, A = 0; A < _e.length; A++) {
              var z = _e[A];
              if (!z.complete) {
                var G = z.getBoundingClientRect();
                if (0 < G.bottom && 0 < G.right && G.top < N.innerHeight && G.left < N.innerWidth) {
                  if (k += ry(z), k > ic) {
                    pe.length = ie;
                    break;
                  }
                  z = new Promise(
                    qS.bind(z)
                  ), pe.push(z);
                }
              }
            }
          if (0 < pe.length)
            return N = Promise.race([
              Promise.all(pe),
              new Promise(function(ue) {
                return setTimeout(ue, 500);
              })
            ]).then(o, o), (U ? Promise.allSettled([U.finished, N]) : N).then(c, c);
          if (o(), U)
            return U.finished.then(
              c,
              c
            );
          c();
        },
        types: n
      });
      _.__reactViewTransition = B;
      var Y = [];
      return B.ready.then(
        function() {
          for (var N = _.documentElement.getAnimations({
            subtree: !0
          }), U = 0; U < N.length; U++) {
            var ie = N[U], pe = ie.effect, _e = pe.pseudoElement;
            if (_e != null && _e.startsWith("::view-transition")) {
              Y.push(ie), ie = pe.getKeyframes();
              for (var k = _e = void 0, A = !0, z = 0; z < ie.length; z++) {
                var G = ie[z], ue = G.width;
                if (_e === void 0) _e = ue;
                else if (_e !== ue) {
                  A = !1;
                  break;
                }
                if (ue = G.height, k === void 0) k = ue;
                else if (k !== ue) {
                  A = !1;
                  break;
                }
                delete G.width, delete G.height, G.transform === "none" && delete G.transform;
              }
              A && _e !== void 0 && k !== void 0 && (pe.setKeyframes(ie), A = getComputedStyle(
                pe.target,
                pe.pseudoElement
              ), A.width !== _e || A.height !== k) && (A = ie[0], A.width = _e, A.height = k, A = ie[ie.length - 1], A.width = _e, A.height = k, pe.setKeyframes(ie));
            }
          }
          m();
        },
        function(N) {
          _.__reactViewTransition === B && (_.__reactViewTransition = null);
          try {
            typeof N == "object" && N !== null && N.name === "InvalidStateError" && (N.message === "View transition was skipped because document visibility state is hidden." || N.message === "Skipping view transition because document visibility state has become hidden." || N.message === "Skipping view transition because viewport size changed." || N.message === "Transition was aborted because of invalid state") && (N = null), N !== null && w(N);
          } finally {
            i(), o(), m();
          }
        }
      ), B.finished.finally(function() {
        for (var N = 0; N < Y.length; N++)
          Y[N].cancel();
        _.__reactViewTransition === B && (_.__reactViewTransition = null), b();
      }), B;
    } catch {
      return i(), o(), m(), null;
    }
  }
  function Xi(e, t) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
  }
  Xi.prototype.animate = function(e, t) {
    return t = typeof t == "number" ? { duration: t } : Q({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
  }, Xi.prototype.getAnimations = function() {
    for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), i = [], o = 0; o < n.length; o++) {
      var c = n[o].effect;
      c !== null && c.target === e && c.pseudoElement === t && i.push(n[o]);
    }
    return i;
  }, Xi.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function q0(e) {
    return {
      name: e,
      group: new Xi("group", e),
      imagePair: new Xi("image-pair", e),
      old: new Xi("old", e),
      new: new Xi("new", e)
    };
  }
  function Sn(e) {
    this._fragmentFiber = e, this._observers = this._eventListeners = null;
  }
  Sn.prototype.addEventListener = function(e, t, n) {
    var i = null, o = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var c = this._eventListeners;
      if (Y0(c, e, t, n) === -1) {
        var m = this, b = t;
        n != null && typeof n != "boolean" && n.once === !0 && (b = function(w) {
          m.removeEventListener(
            e,
            t,
            n
          ), typeof t == "function" ? t.call(this, w) : t.handleEvent(w);
        }), i !== null && (o = m.removeEventListener.bind(
          m,
          e,
          t,
          n
        ), i.addEventListener("abort", o, { once: !0 }), o = i.removeEventListener.bind(i, "abort", o)), i = qs(n), c.push({
          type: e,
          listener: t,
          optionsOrUseCapture: n,
          attachedListener: b,
          cleanup: o
        }), g(
          this._fragmentFiber.child,
          !1,
          YS,
          e,
          b,
          i
        );
      }
      this._eventListeners = c;
    }
  };
  function YS(e, t, n, i) {
    return M(e).addEventListener(
      t,
      n,
      i
    ), !1;
  }
  Sn.prototype.removeEventListener = function(e, t, n) {
    var i = this._eventListeners;
    if (i !== null && (t = Y0(
      i,
      e,
      t,
      n
    ), t !== -1)) {
      var o = i[t];
      n = o.attachedListener;
      var c = o.cleanup;
      o = qs(o.optionsOrUseCapture), g(
        this._fragmentFiber.child,
        !1,
        XS,
        e,
        n,
        o
      ), i.splice(t, 1), c !== null && c();
    }
  };
  function XS(e, t, n, i) {
    return M(e).removeEventListener(
      t,
      n,
      i
    ), !1;
  }
  function qs(e) {
    return e != null && typeof e != "boolean" && (e.once === !0 || e.signal instanceof AbortSignal) ? { capture: e.capture, passive: e.passive } : e;
  }
  function G0(e) {
    return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
  }
  function Y0(e, t, n, i) {
    if (e.length === 0) return -1;
    i = G0(i);
    for (var o = 0; o < e.length; o++) {
      var c = e[o];
      if (c.type === t && c.listener === n && G0(c.optionsOrUseCapture) === i)
        return o;
    }
    return -1;
  }
  Sn.prototype.dispatchEvent = function(e) {
    var t = S(
      this._fragmentFiber
    );
    if (t === null) return !0;
    t = M(t);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !e.bubbles) {
      var i = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
      if (n)
        for (var o = 0; o < n.length; o++) {
          var c = n[o];
          i.addEventListener(
            c.type,
            c.attachedListener,
            qs(c.optionsOrUseCapture)
          );
        }
      if (t.appendChild(i), e = i.dispatchEvent(e), n)
        for (o = 0; o < n.length; o++)
          c = n[o], i.removeEventListener(
            c.type,
            c.attachedListener,
            qs(c.optionsOrUseCapture)
          );
      return t.removeChild(i), e;
    }
    return t.dispatchEvent(e);
  }, Sn.prototype.focus = function(e) {
    g(
      this._fragmentFiber.child,
      !0,
      X0,
      e,
      void 0,
      void 0
    );
  };
  function X0(e, t) {
    return e.tag === 6 ? !1 : (e = M(e), nw(e, t));
  }
  Sn.prototype.focusLast = function(e) {
    var t = [];
    g(
      this._fragmentFiber.child,
      !0,
      hd,
      t,
      void 0,
      void 0
    );
    for (var n = t.length - 1; 0 <= n && !X0(t[n], e); n--) ;
  };
  function hd(e, t) {
    return t.push(e), !1;
  }
  Sn.prototype.blur = function() {
    var e = S(
      this._fragmentFiber
    );
    e !== null && (e = M(e), e = Ql(e).activeElement, e !== null && g(
      this._fragmentFiber.child,
      !1,
      ZS,
      e,
      void 0,
      void 0
    ));
  };
  function ZS(e, t) {
    return e.tag === 6 ? !1 : (e = M(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
  }
  Sn.prototype.observeUsing = function(e) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), g(
      this._fragmentFiber.child,
      !1,
      KS,
      e,
      void 0,
      void 0
    );
  };
  function KS(e, t) {
    return e.tag === 6 || (e = M(e), t.observe(e)), !1;
  }
  Sn.prototype.unobserveUsing = function(e) {
    var t = this._observers;
    if (t !== null && t.has(e)) {
      t.delete(e), g(
        this._fragmentFiber.child,
        !1,
        QS,
        e,
        void 0,
        void 0
      );
      for (var n = t = 0; n < Gn.length; n++) {
        var i = Gn[n];
        i.fragmentInstance === this && i.observer === e ? e.unobserve(i.instance) : Gn[t++] = i;
      }
      Gn.length = t;
    }
  };
  function QS(e, t) {
    return e.tag === 6 || (e = M(e), t.unobserve(e)), !1;
  }
  var Gn = [], md = !1;
  function FS(e, t, n) {
    Gn.push({
      fragmentInstance: e,
      observer: t,
      instance: n
    }), md || (md = !0, aw(function() {
      md = !1;
      var i = Gn;
      Gn = [];
      for (var o = 0; o < i.length; o++) {
        var c = i[o];
        c.observer.unobserve(c.instance);
      }
    }));
  }
  Sn.prototype.getClientRects = function() {
    var e = [];
    return g(
      this._fragmentFiber.child,
      !1,
      IS,
      e,
      void 0,
      void 0
    ), e;
  };
  function IS(e, t) {
    if (e.tag === 6) {
      e = e.stateNode;
      var n = e.ownerDocument.createRange();
      n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
    } else
      e = M(e), t.push.apply(t, e.getClientRects());
    return !1;
  }
  Sn.prototype.getRootNode = function(e) {
    var t = S(
      this._fragmentFiber
    );
    return t === null ? this : M(t).getRootNode(e);
  }, Sn.prototype.compareDocumentPosition = function(e) {
    var t = S(
      this._fragmentFiber
    );
    if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    g(
      this._fragmentFiber.child,
      !1,
      hd,
      n,
      void 0,
      void 0
    );
    var i = M(t);
    if (n.length === 0) {
      if (n = i, E(this._fragmentFiber)) {
        e: {
          for (t = this._fragmentFiber.return; t !== null; ) {
            if (t.tag === 4) {
              t = t.stateNode.containerInfo;
              break e;
            }
            if (t.tag === 3 || t.tag === 5 || t.tag === 27)
              break;
            t = t.return;
          }
          t = null;
        }
        t != null && (n = t);
      }
      t = this._fragmentFiber;
      var o = i = n.compareDocumentPosition(e);
      return n === e ? o = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = j(t)[1], n === null ? o = Node.DOCUMENT_POSITION_PRECEDING : (e = M(n).compareDocumentPosition(
        e
      ), o = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), o |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    t = M(n[0]), o = M(n[n.length - 1]);
    var c = E(this._fragmentFiber) ? t.parentElement : i;
    if (c == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = c.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, c = c.compareDocumentPosition(o) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var m = t.compareDocumentPosition(e), b = o.compareDocumentPosition(e), w = m & Node.DOCUMENT_POSITION_CONTAINED_BY || b & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return b = i && c && m & Node.DOCUMENT_POSITION_FOLLOWING && b & Node.DOCUMENT_POSITION_PRECEDING, t = i && t === e || c && o === e || w || b ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && t === e || !c && o === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : m, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || PS(
      t,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      e
    ) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function PS(e, t, n, i, o) {
    var c = se(o);
    if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!c)
        e: {
          for (; c !== null; ) {
            if (c.tag === 7 && (c === t || c.alternate === t)) {
              n = !0;
              break e;
            }
            c = c.return;
          }
          n = !1;
        }
      return n;
    }
    if (e & Node.DOCUMENT_POSITION_CONTAINS) {
      if (c === null)
        return c = o.ownerDocument, o === c || o === c.documentElement || o === c.body;
      e: {
        for (c = t, t = S(t); c !== null; ) {
          if (!(c.tag !== 5 && c.tag !== 3 && c.tag !== 27 || c !== t && c.alternate !== t)) {
            c = !0;
            break e;
          }
          c = c.return;
        }
        c = !1;
      }
      return c;
    }
    return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!c) && !(t = c === n) && (t = oe(
      n,
      c,
      ee
    ), t === null ? t = !1 : (g(
      t,
      !0,
      K,
      c,
      n
    ), c = q, q = null, t = c !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!c) && !(t = c === i) && (t = oe(
      i,
      c,
      ee
    ), t === null ? t = !1 : (g(
      t,
      !0,
      X,
      c,
      i
    ), c = q, L = q = null, t = c !== null)), t) : !1;
  }
  function Z0(e, t) {
    var n = e.ownerDocument.createRange();
    n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + e.left,
      t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight
    );
  }
  Sn.prototype.scrollIntoView = function(e) {
    if (typeof e == "object") throw Error(r(566));
    var t = [];
    g(
      this._fragmentFiber.child,
      !1,
      hd,
      t,
      void 0,
      void 0
    );
    var n = e !== !1;
    if (t.length === 0) {
      var i = j(
        this._fragmentFiber
      );
      if (i = n ? i[1] || i[0] || S(this._fragmentFiber) : i[0] || i[1], i === null) return;
      if (i.tag === 6) {
        e = M(i), Z0(e, n);
        return;
      }
      if (i = M(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(e);
          return;
        }
        i.scrollIntoView(e);
      }
    }
    for (i = n ? t.length - 1 : 0; i !== (n ? -1 : t.length); ) {
      var o = t[i];
      o.tag === 6 ? (o = M(o), Z0(o, n)) : M(o).scrollIntoView(e), i += n ? -1 : 1;
    }
  };
  function JS(e, t) {
    return e = M(e), K0(e, t), !1;
  }
  function K0(e, t) {
    e.reactFragments == null && (e.reactFragments = /* @__PURE__ */ new Set()), e.reactFragments.add(t);
  }
  function Q0(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var o = n[i];
        e.addEventListener(
          o.type,
          o.attachedListener,
          qs(o.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(c) {
      for (var m = 0, b = 0; b < Gn.length; b++) {
        var w = Gn[b];
        (w.fragmentInstance !== t || w.observer !== c || w.instance !== e) && (Gn[m++] = w);
      }
      Gn.length = m, c.observe(e);
    }), K0(e, t));
  }
  function $S(e, t) {
    var n = t._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var o = n[i];
        e.removeEventListener(
          o.type,
          o.attachedListener,
          qs(o.optionsOrUseCapture)
        );
      }
    e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(c) {
      typeof c.rootMargin == "string" ? FS(
        t,
        c,
        e
      ) : c.unobserve(e);
    }), e.reactFragments != null && e.reactFragments.delete(t));
  }
  function pd(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var n = t;
      switch (t = t.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          pd(n), re(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(n);
    }
  }
  function WS(e, t, n, i) {
    for (; e.nodeType === 1; ) {
      var o = n;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
          break;
      } else if (i) {
        if (!e[Ci])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (c = e.getAttribute("rel"), c === "stylesheet" && e.hasAttribute("data-precedence"))
                break;
              if (c !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (c = e.getAttribute("src"), (c !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && c && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var c = o.name == null ? null : "" + o.name;
        if (o.type === "hidden" && e.getAttribute("name") === c)
          return e;
      } else return e;
      if (e = Rn(e.nextSibling), e === null) break;
    }
    return null;
  }
  function ew(e, t, n) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Rn(e.nextSibling), e === null)) return null;
    return e;
  }
  function F0(e, t) {
    for (; e.nodeType !== 8; )
      if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Rn(e.nextSibling), e === null)) return null;
    return e;
  }
  function gd(e) {
    return e.data === "$?" || e.data === "$~";
  }
  function yd(e) {
    return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
  }
  function tw(e, t) {
    var n = e.ownerDocument;
    if (e.data === "$~") e._reactRetry = t;
    else if (e.data !== "$?" || n.readyState !== "loading")
      t();
    else {
      var i = function() {
        t(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
    }
  }
  function Rn(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F")
          break;
        if (t === "/$" || t === "/&") return null;
      }
    }
    return e;
  }
  var vd = null;
  function I0(e) {
    e = e.nextSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "/$" || n === "/&") {
          if (t === 0)
            return Rn(e.nextSibling);
          t--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
      }
      e = e.nextSibling;
    }
    return null;
  }
  function P0(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var n = e.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (t === 0) return e;
          t--;
        } else n !== "/$" && n !== "/&" || t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function nw(e, t) {
    function n() {
      i = !0;
    }
    if (e.ownerDocument.activeElement === e) return !0;
    var i = !1;
    try {
      e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
    } finally {
      e.ownerDocument.removeEventListener("focus", n, !0);
    }
    return i;
  }
  function aw(e) {
    U0(function() {
      U0(function(t) {
        return e(t);
      });
    });
  }
  function J0(e, t, n) {
    switch (t = Ql(n), e) {
      case "html":
        if (e = t.documentElement, !e) throw Error(r(452));
        return e;
      case "head":
        if (e = t.head, !e) throw Error(r(453));
        return e;
      case "body":
        if (e = t.body, !e) throw Error(r(454));
        return e;
      default:
        throw Error(r(451));
    }
  }
  function $0(e, t, n) {
    for (var i in n) {
      var o = n[i];
      n.hasOwnProperty(i) && o != null && $e(e, t, i, null, RS, o);
    }
    n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === Pn && (e.onclick = null), re(e);
  }
  function bd(e) {
    for (var t = e.attributes; t.length; )
      e.removeAttributeNode(t[0]);
    re(e);
  }
  var _n = /* @__PURE__ */ new Map(), W0 = /* @__PURE__ */ new Set();
  function Fl(e) {
    if (typeof e.getRootNode == "function") {
      var t = e.getRootNode();
      if (t.nodeType === 9 || t.nodeType === 11) return t;
    }
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  var Ra = Se.d;
  Se.d = {
    f: iw,
    r: sw,
    D: lw,
    C: rw,
    L: ow,
    m: cw,
    X: fw,
    S: uw,
    M: dw
  };
  function iw() {
    var e = Ra.f(), t = Io();
    return e || t;
  }
  function sw(e) {
    var t = be(e);
    t !== null && t.tag === 5 && t.type === "form" ? tg(t) : Ra.r(e);
  }
  var Gs = typeof document > "u" ? null : document;
  function ey(e, t, n) {
    var i = Gs;
    if (i && typeof t == "string" && t) {
      var o = En(t);
      o = 'link[rel="' + e + '"][href="' + o + '"]', typeof n == "string" && (o += '[crossorigin="' + n + '"]'), W0.has(o) || (W0.add(o), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), qt(t, "link", e), Oe(t), i.head.appendChild(t)));
    }
  }
  function lw(e) {
    Ra.D(e), ey("dns-prefetch", e, null);
  }
  function rw(e, t) {
    Ra.C(e, t), ey("preconnect", e, t);
  }
  function ow(e, t, n) {
    Ra.L(e, t, n);
    var i = Gs;
    if (i && e && t) {
      var o = 'link[rel="preload"][as="' + En(t) + '"]';
      t === "image" && n && n.imageSrcSet ? (o += '[imagesrcset="' + En(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (o += '[imagesizes="' + En(
        n.imageSizes
      ) + '"]')) : o += '[href="' + En(e) + '"]';
      var c = o;
      switch (t) {
        case "style":
          c = Ys(e);
          break;
        case "script":
          c = Xs(e);
      }
      if (!(_n.has(c) || (e = Q(
        {
          rel: "preload",
          href: t === "image" && n && n.imageSrcSet ? void 0 : e,
          as: t
        },
        n
      ), _n.set(c, e), i.querySelector(o) !== null || t === "style" && i.querySelector(Il(c)) || t === "script" && i.querySelector(Pl(c))))) {
        var m = i.createElement("link");
        qt(m, "link", e), t === "style" && (m[O] = !0, m.onload = m.onerror = function() {
          sn(m);
        }), Oe(m), i.head.appendChild(m);
      }
    }
  }
  function cw(e, t) {
    Ra.m(e, t);
    var n = Gs;
    if (n && e) {
      var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + En(i) + '"][href="' + En(e) + '"]', c = o;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          c = Xs(e);
      }
      if (!_n.has(c) && (e = Q({ rel: "modulepreload", href: e }, t), _n.set(c, e), n.querySelector(o) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Pl(c)))
              return;
        }
        i = n.createElement("link"), qt(i, "link", e), Oe(i), n.head.appendChild(i);
      }
    }
  }
  function uw(e, t, n) {
    Ra.S(e, t, n);
    var i = Gs;
    if (i && e) {
      var o = We(i).hoistableStyles, c = Ys(e);
      t = t || "default";
      var m = o.get(c);
      if (!m) {
        var b = { loading: 0, preload: null };
        if (m = i.querySelector(
          Il(c)
        ))
          b.loading = 5;
        else {
          e = Q(
            { rel: "stylesheet", href: e, "data-precedence": t },
            n
          ), (n = _n.get(c)) && xd(e, n);
          var w = m = i.createElement("link");
          Oe(w), qt(w, "link", e), w._p = new Promise(function(_, B) {
            w.onload = _, w.onerror = B;
          }), w.addEventListener("load", function() {
            b.loading |= 1;
          }), w.addEventListener("error", function() {
            b.loading |= 2;
          }), b.loading |= 4, nc(m, t, i);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: b
        }, o.set(c, m);
      }
    }
  }
  function fw(e, t) {
    Ra.X(e, t);
    var n = Gs;
    if (n && e) {
      var i = We(n).hoistableScripts, o = Xs(e), c = i.get(o);
      c || (c = n.querySelector(Pl(o)), c || (e = Q({ src: e, async: !0 }, t), (t = _n.get(o)) && Sd(e, t), c = n.createElement("script"), Oe(c), qt(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(o, c));
    }
  }
  function dw(e, t) {
    Ra.M(e, t);
    var n = Gs;
    if (n && e) {
      var i = We(n).hoistableScripts, o = Xs(e), c = i.get(o);
      c || (c = n.querySelector(Pl(o)), c || (e = Q({ src: e, async: !0, type: "module" }, t), (t = _n.get(o)) && Sd(e, t), c = n.createElement("script"), Oe(c), qt(c, "link", e), n.head.appendChild(c)), c = {
        type: "script",
        instance: c,
        count: 1,
        state: null
      }, i.set(o, c));
    }
  }
  function ty(e, t, n, i) {
    var o = (o = I.current) ? Fl(o) : null;
    if (!o) throw Error(r(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Ys(n.href), t = We(
          o
        ).hoistableStyles, i = t.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          e = Ys(n.href);
          var c = We(
            o
          ).hoistableStyles, m = c.get(e);
          if (m || (o = o.ownerDocument || o, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, c.set(e, m), (c = o.querySelector(
            Il(e)
          )) ? c._p || (m.instance = c, m.state.loading = 5) : (c = _n.get(e), c || (c = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, _n.set(e, c)), hw(
            o,
            e,
            c,
            m.state
          ))), t && i === null)
            throw Error(r(528, ""));
          return m;
        }
        if (t && i !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Xs(n), t = We(
          o
        ).hoistableScripts, i = t.get(n), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, t.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, e));
    }
  }
  function Ys(e) {
    return 'href="' + En(e) + '"';
  }
  function Il(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function ny(e) {
    return Q({}, e, {
      "data-precedence": e.precedence,
      precedence: null
    });
  }
  function hw(e, t, n, i) {
    if (t = e.querySelector(
      'link[rel="preload"][as="style"][' + t + "]"
    )) {
      if (t[O] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      t = e.createElement("link"), t[O] = !0, t.onload = t.onerror = sn.bind(null, t), qt(t, "link", n), Oe(t), e.head.appendChild(t);
    i.preload = t, t.addEventListener("load", function() {
      return i.loading |= 1;
    }), t.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function Xs(e) {
    return '[src="' + En(e) + '"]';
  }
  function Pl(e) {
    return "script[async]" + e;
  }
  function ay(e, t, n) {
    if (t.count++, t.instance === null)
      switch (t.type) {
        case "style":
          var i = e.querySelector(
            'style[data-href~="' + En(n.href) + '"]'
          );
          if (i)
            return t.instance = i, Oe(i), i;
          var o = Q({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (e.ownerDocument || e).createElement(
            "style"
          ), Oe(i), qt(i, "style", o), nc(i, n.precedence, e), t.instance = i;
        case "stylesheet":
          o = Ys(n.href);
          var c = e.querySelector(
            Il(o)
          );
          if (c)
            return t.state.loading |= 4, t.instance = c, Oe(c), c;
          i = ny(n), (o = _n.get(o)) && xd(i, o), c = (e.ownerDocument || e).createElement("link"), Oe(c);
          var m = c;
          return m._p = new Promise(function(b, w) {
            m.onload = b, m.onerror = w;
          }), qt(c, "link", i), t.state.loading |= 4, nc(c, n.precedence, e), t.instance = c;
        case "script":
          return c = Xs(n.src), (o = e.querySelector(
            Pl(c)
          )) ? (t.instance = o, Oe(o), o) : (i = n, (o = _n.get(c)) && (i = Q({}, n), Sd(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), Oe(o), qt(o, "link", i), e.head.appendChild(o), t.instance = o);
        case "void":
          return null;
        default:
          throw Error(r(443, t.type));
      }
    else
      t.type === "stylesheet" && (t.state.loading & 4) === 0 && (i = t.instance, t.state.loading |= 4, nc(i, n.precedence, e));
    return t.instance;
  }
  function nc(e, t, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), o = i.length ? i[i.length - 1] : null, c = o, m = 0; m < i.length; m++) {
      var b = i[m];
      if (b.dataset.precedence === t) c = b;
      else if (c !== o) break;
    }
    c ? c.parentNode.insertBefore(e, c.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
  }
  function xd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
  }
  function Sd(e, t) {
    e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
  }
  var ac = null;
  function iy(e, t, n) {
    if (ac === null) {
      var i = /* @__PURE__ */ new Map(), o = ac = /* @__PURE__ */ new Map();
      o.set(n, i);
    } else
      o = ac, i = o.get(n), i || (i = /* @__PURE__ */ new Map(), o.set(n, i));
    if (i.has(e)) return i;
    for (i.set(e, null), n = n.getElementsByTagName(e), o = 0; o < n.length; o++) {
      var c = n[o];
      if (!(c[Ci] || c[lt] || e === "link" && c.getAttribute("rel") === "stylesheet") && c.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = c.getAttribute(t) || "";
        m = e + m;
        var b = i.get(m);
        b ? b.push(c) : i.set(m, [c]);
      }
    }
    return i;
  }
  function wd(e, t, n) {
    e = e.ownerDocument || e, e.head.insertBefore(
      n,
      t === "title" ? e.querySelector("head > title") : null
    );
  }
  function mw(e, t, n) {
    if (n === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
          break;
        return !0;
      case "link":
        if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError)
          break;
        return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
      case "script":
        if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string")
          return !0;
    }
    return !1;
  }
  function sy(e, t) {
    return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
  }
  function ly(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  function ry(e) {
    return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function oy(e, t) {
    typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += ry(t), e.suspenseyImages.push(t)), e = yw.bind(e), t.decode().then(e, e));
  }
  function pw(e, t, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var o = Ys(i.href), c = t.querySelector(
          Il(o)
        );
        if (c) {
          t = c._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = Jl.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = c, Oe(c);
          return;
        }
        c = t.ownerDocument || t, i = ny(i), (o = _n.get(o)) && xd(i, o), c = c.createElement("link"), Oe(c);
        var m = c;
        m._p = new Promise(function(b, w) {
          m.onload = b, m.onerror = w;
        }), qt(c, "link", i), n.instance = c;
      }
      e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (e.count++, n = Jl.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
    }
  }
  var ic = 0;
  function gw(e, t) {
    return e.stylesheets && e.count === 0 && lc(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (e.stylesheets && lc(e, e.stylesheets), e.unsuspend) {
          var c = e.unsuspend;
          e.unsuspend = null, c();
        }
      }, 6e4 + t);
      0 < e.imgBytes && ic === 0 && (ic = 62500 * zS());
      var o = setTimeout(
        function() {
          if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && lc(e, e.stylesheets), e.unsuspend)) {
            var c = e.unsuspend;
            e.unsuspend = null, c();
          }
        },
        (e.imgBytes > ic ? 50 : 800) + t
      );
      return e.unsuspend = n, function() {
        e.unsuspend = null, clearTimeout(i), clearTimeout(o);
      };
    } : null;
  }
  function cy(e) {
    if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
      if (e.stylesheets) lc(e, e.stylesheets);
      else if (e.unsuspend) {
        var t = e.unsuspend;
        e.unsuspend = null, t();
      }
    }
  }
  function Jl() {
    this.count--, cy(this);
  }
  function yw() {
    this.imgCount--, cy(this);
  }
  var sc = null;
  function lc(e, t) {
    e.stylesheets = null, e.unsuspend !== null && (e.count++, sc = /* @__PURE__ */ new Map(), t.forEach(vw, e), sc = null, Jl.call(e));
  }
  function vw(e, t) {
    if (!(t.state.loading & 4)) {
      var n = sc.get(e);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), sc.set(e, n);
        for (var o = e.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), c = 0; c < o.length; c++) {
          var m = o[c];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), i = m);
        }
        i && n.set(null, i);
      }
      o = t.instance, m = o.getAttribute("data-precedence"), c = n.get(m) || i, c === i && n.set(null, o), n.set(m, o), this.count++, i = Jl.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), c ? c.parentNode.insertBefore(o, c.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= 4;
    }
  }
  var Zs = {
    $$typeof: ce,
    Provider: null,
    Consumer: null,
    _currentValue: Tt,
    _currentValue2: Tt,
    _threadCount: 0
  };
  function bw(e, t, n, i, o, c, m, b, w) {
    this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ul(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ul(0), this.hiddenUpdates = ul(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = c, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function uy(e, t, n, i, o, c, m, b, w, _, B, Y) {
    return e = new bw(
      e,
      t,
      n,
      m,
      w,
      _,
      B,
      Y,
      b
    ), t = 1, c === !0 && (t |= 24), c = ln(3, null, null, t), e.current = c, c.stateNode = e, t = Uu(), t.refCount++, e.pooledCache = t, t.refCount++, c.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: t
    }, Hu(c), e;
  }
  function fy(e) {
    return e ? (e = ys, e) : ys;
  }
  function dy(e, t, n, i, o, c) {
    o = fy(o), i.context === null ? i.context = o : i.pendingContext = o, i = Ia(t), i.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (i.callback = c), n = Pa(e, i, t), n !== null && (un(n, e, t), Ml(n, e, t));
  }
  function hy(e, t) {
    if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
      var n = e.retryLane;
      e.retryLane = n !== 0 && n < t ? n : t;
    }
  }
  function Td(e, t) {
    hy(e, t), (e = e.alternate) && hy(e, t);
  }
  function my(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = Ai(e, 67108864);
      t !== null && un(t, e, 67108864), Td(e, 67108864);
    }
  }
  function py(e) {
    if (e.tag === 13 || e.tag === 31) {
      var t = xn();
      t = fl(t);
      var n = Ai(e, t);
      n !== null && un(n, e, t), Td(e, t);
    }
  }
  var Ks = !0;
  function xw(e, t, n, i) {
    var o = le.T;
    le.T = null;
    var c = Se.p;
    try {
      Se.p = 2, Cd(e, t, n, i);
    } finally {
      Se.p = c, le.T = o;
    }
  }
  function Sw(e, t, n, i) {
    var o = le.T;
    le.T = null;
    var c = Se.p;
    try {
      Se.p = 8, Cd(e, t, n, i);
    } finally {
      Se.p = c, le.T = o;
    }
  }
  function Cd(e, t, n, i) {
    if (Ks) {
      var o = Ed(i);
      if (o === null)
        sd(
          e,
          t,
          i,
          rc,
          n
        ), yy(e, i);
      else if (Tw(
        o,
        e,
        t,
        n,
        i
      ))
        i.stopPropagation();
      else if (yy(e, i), t & 4 && -1 < ww.indexOf(e)) {
        for (; o !== null; ) {
          var c = be(o);
          if (c !== null)
            switch (c.tag) {
              case 3:
                if (c = c.stateNode, c.current.memoizedState.isDehydrated) {
                  var m = dn(c.pendingLanes);
                  if (m !== 0) {
                    var b = c;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; m; ) {
                      var w = 1 << 31 - Xt(m);
                      b.entanglements[1] |= w, m &= ~w;
                    }
                    la(c), (Qe & 6) === 0 && (Ko = Ft() + 500, Xl(0));
                  }
                }
                break;
              case 31:
              case 13:
                b = Ai(c, 2), b !== null && un(b, c, 2), Io(), Td(c, 2);
            }
          if (c = Ed(i), c === null && sd(
            e,
            t,
            i,
            rc,
            n
          ), c === o) break;
          o = c;
        }
        o !== null && i.stopPropagation();
      } else
        sd(
          e,
          t,
          i,
          null,
          n
        );
    }
  }
  function Ed(e) {
    return e = cu(e), jd(e);
  }
  var rc = null;
  function jd(e) {
    if (rc = null, e = se(e), e !== null) {
      var t = h(e);
      if (t === null) e = null;
      else {
        var n = t.tag;
        if (n === 13) {
          if (e = f(t), e !== null) return e;
          e = null;
        } else if (n === 31) {
          if (e = p(t), e !== null) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return rc = e, null;
  }
  function gy(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (is()) {
          case Mt:
            return 2;
          case rl:
            return 8;
          case Va:
          case nu:
            return 32;
          case Rr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Ad = !1, oi = null, ci = null, ui = null, $l = /* @__PURE__ */ new Map(), Wl = /* @__PURE__ */ new Map(), fi = [], ww = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function yy(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        oi = null;
        break;
      case "dragenter":
      case "dragleave":
        ci = null;
        break;
      case "mouseover":
      case "mouseout":
        ui = null;
        break;
      case "pointerover":
      case "pointerout":
        $l.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Wl.delete(t.pointerId);
    }
  }
  function er(e, t, n, i, o, c) {
    return e === null || e.nativeEvent !== c ? (e = {
      blockedOn: t,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: c,
      targetContainers: [o]
    }, t !== null && (t = be(t), t !== null && my(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
  }
  function Tw(e, t, n, i, o) {
    switch (t) {
      case "focusin":
        return oi = er(
          oi,
          e,
          t,
          n,
          i,
          o
        ), !0;
      case "dragenter":
        return ci = er(
          ci,
          e,
          t,
          n,
          i,
          o
        ), !0;
      case "mouseover":
        return ui = er(
          ui,
          e,
          t,
          n,
          i,
          o
        ), !0;
      case "pointerover":
        var c = o.pointerId;
        return $l.set(
          c,
          er(
            $l.get(c) || null,
            e,
            t,
            n,
            i,
            o
          )
        ), !0;
      case "gotpointercapture":
        return c = o.pointerId, Wl.set(
          c,
          er(
            Wl.get(c) || null,
            e,
            t,
            n,
            i,
            o
          )
        ), !0;
    }
    return !1;
  }
  function vy(e) {
    var t = se(e.target);
    if (t !== null) {
      var n = h(t);
      if (n !== null) {
        if (t = n.tag, t === 13) {
          if (t = f(n), t !== null) {
            e.blockedOn = t, Hr(e.priority, function() {
              py(n);
            });
            return;
          }
        } else if (t === 31) {
          if (t = p(n), t !== null) {
            e.blockedOn = t, Hr(e.priority, function() {
              py(n);
            });
            return;
          }
        } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function oc(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var n = Ed(e.nativeEvent);
      if (n === null) {
        n = e.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        ou = i, n.target.dispatchEvent(i), ou = null;
      } else
        return t = be(n), t !== null && my(t), e.blockedOn = n, !1;
      t.shift();
    }
    return !0;
  }
  function by(e, t, n) {
    oc(e) && n.delete(t);
  }
  function Cw() {
    Ad = !1, oi !== null && oc(oi) && (oi = null), ci !== null && oc(ci) && (ci = null), ui !== null && oc(ui) && (ui = null), $l.forEach(by), Wl.forEach(by);
  }
  function cc(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Ad || (Ad = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      Cw
    )));
  }
  var uc = null;
  function xy(e) {
    uc !== e && (uc = e, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        uc === e && (uc = null);
        for (var t = 0; t < e.length; t += 3) {
          var n = e[t], i = e[t + 1], o = e[t + 2];
          if (typeof i != "function") {
            if (jd(i || n) === null)
              continue;
            break;
          }
          var c = be(n);
          c !== null && (e.splice(t, 3), t -= 3, of(
            c,
            {
              pending: !0,
              data: o,
              method: n.method,
              action: i
            },
            i,
            o
          ));
        }
      }
    ));
  }
  function Qs(e) {
    function t(w) {
      return cc(w, e);
    }
    oi !== null && cc(oi, e), ci !== null && cc(ci, e), ui !== null && cc(ui, e), $l.forEach(t), Wl.forEach(t);
    for (var n = 0; n < fi.length; n++) {
      var i = fi[n];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; 0 < fi.length && (n = fi[0], n.blockedOn === null); )
      vy(n), n.blockedOn === null && fi.shift();
    if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var o = n[i], c = n[i + 1], m = o[Ot] || null;
        if (typeof c == "function")
          m || xy(n);
        else if (m) {
          var b = null;
          if (c && c.hasAttribute("formAction")) {
            if (o = c, m = c[Ot] || null)
              b = m.formAction;
            else if (jd(o) !== null) continue;
          } else b = m.action;
          typeof b == "function" ? n[i + 1] = b : (n.splice(i, 3), i -= 3), xy(n);
        }
      }
  }
  function Sy() {
    function e(c) {
      c.canIntercept && c.info === "react-transition" && c.intercept({
        handler: function() {
          return new Promise(function(m) {
            return o = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function t() {
      o !== null && (o(), o = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var c = navigation.currentEntry;
        c && c.url != null && navigation.navigate(c.url, {
          state: c.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, o = null;
      return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), o !== null && (o(), o = null);
      };
    }
  }
  function Md(e) {
    this._internalRoot = e;
  }
  fc.prototype.render = Md.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null) throw Error(r(409));
    var n = t.current, i = xn();
    dy(n, i, e, t, null, null);
  }, fc.prototype.unmount = Md.prototype.unmount = function() {
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      dy(e.current, 2, null, e, null, null), Io(), t[ya] = null;
    }
  };
  function fc(e) {
    this._internalRoot = e;
  }
  fc.prototype.unstable_scheduleHydration = function(e) {
    if (e) {
      var t = dl();
      e = { blockedOn: null, target: e, priority: t };
      for (var n = 0; n < fi.length && t !== 0 && t < fi[n].priority; n++) ;
      fi.splice(n, 0, e), n === 0 && vy(e);
    }
  };
  var wy = s.version;
  if (wy !== "19.3.0")
    throw Error(
      r(
        527,
        wy,
        "19.3.0"
      )
    );
  Se.findDOMNode = function(e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
    return e = v(t), e = e !== null ? x(e) : null, e = e === null ? null : e.stateNode, e;
  };
  var Ew = {
    bundleType: 0,
    version: "19.3.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: le,
    reconcilerVersion: "19.3.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var dc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!dc.isDisabled && dc.supportsFiber)
      try {
        ga = dc.inject(
          Ew
        ), Pt = dc;
      } catch {
      }
  }
  return nr.createRoot = function(e, t) {
    if (!u(e)) throw Error(r(299));
    var n = !1, i = "", o = fg, c = dg, m = hg;
    return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (c = t.onCaughtError), t.onRecoverableError !== void 0 && (m = t.onRecoverableError)), t = uy(
      e,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      o,
      c,
      m,
      Sy
    ), e[ya] = t.current, id(e), new Md(t);
  }, nr.hydrateRoot = function(e, t, n) {
    if (!u(e)) throw Error(r(299));
    var i = !1, o = "", c = fg, m = dg, b = hg, w = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (c = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError), n.formState !== void 0 && (w = n.formState)), t = uy(
      e,
      1,
      !0,
      t,
      n ?? null,
      i,
      o,
      w,
      c,
      m,
      b,
      Sy
    ), t.context = fy(null), n = t.current, i = xn(), i = fl(i), o = Ia(i), o.callback = null, Pa(n, o, i), n = i, t.current.lanes = n, Ba(t, n), la(t), e[ya] = t.current, id(e), new fc(t);
  }, nr.version = "19.3.0", nr;
}
var Ry;
function Bw() {
  if (Ry) return Dd.exports;
  Ry = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (s) {
        console.error(s);
      }
  }
  return a(), Dd.exports = Lw(), Dd.exports;
}
var Hw = Bw();
const vr = C.createContext({});
function tl(a) {
  const s = C.useRef(null);
  return s.current === null && (s.current = a()), s.current;
}
const qw = typeof window < "u", Er = qw ? C.useLayoutEffect : C.useEffect, Ic = /* @__PURE__ */ C.createContext(null);
function Uh(a, s) {
  a.indexOf(s) === -1 && a.push(s);
}
function Uc(a, s) {
  const l = a.indexOf(s);
  l > -1 && a.splice(l, 1);
}
const ha = (a, s, l) => l > s ? s : l < a ? a : l;
let Pc = () => {
};
const bi = {}, C1 = (a) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(a), E1 = (a) => typeof a == "object" && a !== null, j1 = (a) => /^0[^.\s]+$/u.test(a);
// @__NO_SIDE_EFFECTS__
function A1(a) {
  let s;
  return () => (s === void 0 && (s = a()), s);
}
const On = /* @__NO_SIDE_EFFECTS__ */ (a) => a, jr = (...a) => a.reduce((s, l) => (r) => l(s(r))), br = /* @__NO_SIDE_EFFECTS__ */ (a, s, l) => {
  const r = s - a;
  return r ? (l - a) / r : 1;
};
class Vh {
  constructor() {
    this.subscriptions = [];
  }
  add(s) {
    return Uh(this.subscriptions, s), () => Uc(this.subscriptions, s);
  }
  notify(s, l, r) {
    const u = this.subscriptions.length;
    if (u)
      if (u === 1)
        this.subscriptions[0](s, l, r);
      else
        for (let h = 0; h < u; h++) {
          const f = this.subscriptions[h];
          f && f(s, l, r);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const wn = /* @__NO_SIDE_EFFECTS__ */ (a) => a * 1e3, zn = /* @__NO_SIDE_EFFECTS__ */ (a) => a / 1e3, M1 = /* @__NO_SIDE_EFFECTS__ */ (a, s) => s ? a * (1e3 / s) : 0, N1 = (a, s, l) => (((1 - 3 * l + 3 * s) * a + (3 * l - 6 * s)) * a + 3 * s) * a, Gw = 1e-7, Yw = 12;
function Xw(a, s, l, r, u) {
  let h, f, p = 0;
  do
    f = s + (l - s) / 2, h = N1(f, r, u) - a, h > 0 ? l = f : s = f;
  while (Math.abs(h) > Gw && ++p < Yw);
  return f;
}
// @__NO_SIDE_EFFECTS__
function Ar(a, s, l, r) {
  if (a === s && l === r)
    return On;
  const u = (h) => Xw(h, 0, 1, a, l);
  return (h) => h === 0 || h === 1 ? h : N1(u(h), s, r);
}
const k1 = /* @__NO_SIDE_EFFECTS__ */ (a) => (s) => s <= 0.5 ? a(2 * s) / 2 : (2 - a(2 * (1 - s))) / 2, D1 = /* @__NO_SIDE_EFFECTS__ */ (a) => (s) => 1 - a(1 - s), R1 = /* @__PURE__ */ Ar(0.33, 1.53, 0.69, 0.99), Lh = /* @__PURE__ */ D1(R1), _1 = /* @__PURE__ */ k1(Lh), z1 = (a) => a >= 1 ? 1 : (a *= 2) < 1 ? 0.5 * Lh(a) : 0.5 * (2 - Math.pow(2, -10 * (a - 1))), Bh = (a) => 1 - Math.sin(Math.acos(a)), O1 = /* @__PURE__ */ D1(Bh), U1 = /* @__PURE__ */ k1(Bh), Zw = /* @__PURE__ */ Ar(0.42, 0, 1, 1), Kw = /* @__PURE__ */ Ar(0, 0, 0.58, 1), V1 = /* @__PURE__ */ Ar(0.42, 0, 0.58, 1), Qw = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] != "number", L1 = /* @__NO_SIDE_EFFECTS__ */ (a) => Array.isArray(a) && typeof a[0] == "number", Fw = {
  linear: On,
  easeIn: Zw,
  easeInOut: V1,
  easeOut: Kw,
  circIn: Bh,
  circInOut: U1,
  circOut: O1,
  backIn: Lh,
  backInOut: _1,
  backOut: R1,
  anticipate: z1
}, Iw = (a) => typeof a == "string", _y = (a) => {
  if (/* @__PURE__ */ L1(a)) {
    Pc(a.length === 4);
    const [s, l, r, u] = a;
    return /* @__PURE__ */ Ar(s, l, r, u);
  } else if (Iw(a))
    return Fw[a];
  return a;
}, hc = [
  "setup",
  // Compute
  "read",
  // Read
  "resolveKeyframes",
  // Write/Read/Write/Read
  "preUpdate",
  // Compute
  "update",
  // Compute
  "preRender",
  // Compute
  "render",
  // Write
  "postRender"
  // Compute
];
function Pw(a) {
  let s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Set(), r = !1, u = !1;
  const h = /* @__PURE__ */ new WeakSet();
  let f = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  };
  function p(v) {
    h.has(v) && (y.schedule(v), a()), v(f);
  }
  const y = {
    /**
     * Schedule a process to run on the next frame.
     */
    schedule: (v, x = !1, g = !1) => {
      const E = g && r ? s : l;
      return x && h.add(v), E.add(v), v;
    },
    /**
     * Cancel the provided callback from running on the next frame.
     */
    cancel: (v) => {
      l.delete(v), h.delete(v);
    },
    /**
     * Execute all schedule callbacks.
     */
    process: (v) => {
      if (f = v, r) {
        u = !0;
        return;
      }
      r = !0;
      const x = s;
      s = l, l = x, s.forEach(p), s.clear(), r = !1, u && (u = !1, y.process(v));
    }
  };
  return y;
}
const Jw = 40;
function B1(a, s) {
  let l = !1, r = !0;
  const u = {
    delta: 0,
    timestamp: 0,
    isProcessing: !1
  }, h = () => l = !0, f = hc.reduce((K, X) => (K[X] = Pw(h), K), {}), { setup: p, read: y, resolveKeyframes: v, preUpdate: x, update: g, preRender: S, render: E, postRender: j } = f, V = () => {
    const K = bi.useManualTiming, X = K ? u.timestamp : performance.now();
    l = !1, K || (u.delta = r ? 1e3 / 60 : Math.max(Math.min(X - u.timestamp, Jw), 1)), u.timestamp = X, u.isProcessing = !0, p.process(u), y.process(u), v.process(u), x.process(u), g.process(u), S.process(u), E.process(u), j.process(u), u.isProcessing = !1, l && s && (r = !1, a(V));
  }, M = () => {
    l = !0, r = !0, u.isProcessing || a(V);
  };
  return { schedule: hc.reduce((K, X) => {
    const ee = f[X];
    return K[X] = (oe, Q = !1, D = !1) => (l || M(), ee.schedule(oe, Q, D)), K;
  }, {}), cancel: (K) => {
    for (let X = 0; X < hc.length; X++)
      f[hc[X]].cancel(K);
  }, state: u, steps: f };
}
const { schedule: Ie, cancel: Oa, state: Yt, steps: Od } = /* @__PURE__ */ B1(typeof requestAnimationFrame < "u" ? requestAnimationFrame : On, !0);
let Ec;
function $w() {
  Ec = void 0;
}
const tn = {
  now: () => (Ec === void 0 && tn.set(Yt.isProcessing || bi.useManualTiming ? Yt.timestamp : performance.now()), Ec),
  set: (a) => {
    Ec = a, queueMicrotask($w);
  }
}, H1 = (a) => (s) => typeof s == "string" && s.startsWith(a), q1 = /* @__PURE__ */ H1("--"), Ww = /* @__PURE__ */ H1("var(--"), Hh = (a) => Ww(a) ? eT.test(a.split("/*")[0].trim()) : !1, eT = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function zy(a) {
  return typeof a != "string" ? !1 : a.split("/*")[0].includes("var(--");
}
const nl = {
  test: (a) => typeof a == "number",
  parse: parseFloat,
  transform: (a) => a
}, xr = {
  ...nl,
  transform: (a) => ha(0, 1, a)
}, mc = {
  ...nl,
  default: 1
}, ur = (a) => Math.round(a * 1e5) / 1e5, qh = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function tT(a) {
  return a == null;
}
const nT = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Gh = (a, s) => (l) => !!(typeof l == "string" && nT.test(l) && l.startsWith(a) || s && !tT(l) && Object.prototype.hasOwnProperty.call(l, s)), G1 = (a, s, l) => (r) => {
  if (typeof r != "string")
    return r;
  const [u, h, f, p] = r.match(qh);
  return {
    [a]: parseFloat(u),
    [s]: parseFloat(h),
    [l]: parseFloat(f),
    alpha: p !== void 0 ? parseFloat(p) : 1
  };
}, aT = (a) => ha(0, 255, a), Ud = {
  ...nl,
  transform: (a) => Math.round(aT(a))
}, Pi = {
  test: /* @__PURE__ */ Gh("rgb", "red"),
  parse: /* @__PURE__ */ G1("red", "green", "blue"),
  transform: ({ red: a, green: s, blue: l, alpha: r = 1 }) => "rgba(" + Ud.transform(a) + ", " + Ud.transform(s) + ", " + Ud.transform(l) + ", " + ur(xr.transform(r)) + ")"
};
function iT(a) {
  let s = "", l = "", r = "", u = "";
  return a.length > 5 ? (s = a.substring(1, 3), l = a.substring(3, 5), r = a.substring(5, 7), u = a.substring(7, 9)) : (s = a.substring(1, 2), l = a.substring(2, 3), r = a.substring(3, 4), u = a.substring(4, 5), s += s, l += l, r += r, u += u), {
    red: parseInt(s, 16),
    green: parseInt(l, 16),
    blue: parseInt(r, 16),
    alpha: u ? parseInt(u, 16) / 255 : 1
  };
}
const ih = {
  test: /* @__PURE__ */ Gh("#"),
  parse: iT,
  transform: Pi.transform
}, Mr = /* @__NO_SIDE_EFFECTS__ */ (a) => ({
  test: (s) => typeof s == "string" && s.endsWith(a) && s.split(" ").length === 1,
  parse: parseFloat,
  transform: (s) => `${s}${a}`
}), za = /* @__PURE__ */ Mr("deg"), fa = /* @__PURE__ */ Mr("%"), ge = /* @__PURE__ */ Mr("px"), sT = /* @__PURE__ */ Mr("vh"), lT = /* @__PURE__ */ Mr("vw"), Oy = {
  ...fa,
  parse: (a) => fa.parse(a) / 100,
  transform: (a) => fa.transform(a * 100)
}, Is = {
  test: /* @__PURE__ */ Gh("hsl", "hue"),
  parse: /* @__PURE__ */ G1("hue", "saturation", "lightness"),
  transform: ({ hue: a, saturation: s, lightness: l, alpha: r = 1 }) => "hsla(" + Math.round(a) + ", " + fa.transform(ur(s)) + ", " + fa.transform(ur(l)) + ", " + ur(xr.transform(r)) + ")"
}, St = {
  test: (a) => Pi.test(a) || ih.test(a) || Is.test(a),
  parse: (a) => Pi.test(a) ? Pi.parse(a) : Is.test(a) ? Is.parse(a) : ih.parse(a),
  transform: (a) => typeof a == "string" ? a : a.hasOwnProperty("red") ? Pi.transform(a) : Is.transform(a),
  getAnimatableNone: (a) => {
    const s = St.parse(a);
    return s.alpha = 0, St.transform(s);
  }
}, rT = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function oT(a) {
  return isNaN(a) && typeof a == "string" && (a.match(qh)?.length || 0) + (a.match(rT)?.length || 0) > 0;
}
const Y1 = "number", X1 = "color", cT = "var", uT = "var(", Uy = "${}", fT = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function el(a) {
  const s = a.toString(), l = [], r = {
    color: [],
    number: [],
    var: []
  }, u = [];
  let h = 0;
  const p = s.replace(fT, (y) => (St.test(y) ? (r.color.push(h), u.push(X1), l.push(St.parse(y))) : y.startsWith(uT) ? (r.var.push(h), u.push(cT), l.push(y)) : (r.number.push(h), u.push(Y1), l.push(parseFloat(y))), ++h, Uy)).split(Uy);
  return { values: l, split: p, indexes: r, types: u };
}
function dT(a) {
  return el(a).values;
}
function Z1({ split: a, types: s }) {
  const l = a.length;
  return (r) => {
    let u = "";
    for (let h = 0; h < l; h++)
      if (u += a[h], r[h] !== void 0) {
        const f = s[h];
        f === Y1 ? u += ur(r[h]) : f === X1 ? u += St.transform(r[h]) : u += r[h];
      }
    return u;
  };
}
function hT(a) {
  return Z1(el(a));
}
const mT = (a) => typeof a == "number" ? 0 : St.test(a) ? St.getAnimatableNone(a) : a, pT = (a, s) => typeof a == "number" ? s?.trim().endsWith("/") ? a : 0 : mT(a);
function gT(a) {
  const s = el(a);
  return Z1(s)(s.values.map((r, u) => pT(r, s.split[u])));
}
const Zn = {
  test: oT,
  parse: dT,
  createTransformer: hT,
  getAnimatableNone: gT
};
function Vd(a, s, l) {
  return l < 0 && (l += 1), l > 1 && (l -= 1), l < 1 / 6 ? a + (s - a) * 6 * l : l < 1 / 2 ? s : l < 2 / 3 ? a + (s - a) * (2 / 3 - l) * 6 : a;
}
function yT({ hue: a, saturation: s, lightness: l, alpha: r }) {
  a /= 360, s /= 100, l /= 100;
  let u = 0, h = 0, f = 0;
  if (!s)
    u = h = f = l;
  else {
    const p = l < 0.5 ? l * (1 + s) : l + s - l * s, y = 2 * l - p;
    u = Vd(y, p, a + 1 / 3), h = Vd(y, p, a), f = Vd(y, p, a - 1 / 3);
  }
  return {
    red: Math.round(u * 255),
    green: Math.round(h * 255),
    blue: Math.round(f * 255),
    alpha: r
  };
}
function Vc(a, s) {
  return (l) => l > 0 ? s : a;
}
const nt = (a, s, l) => a + (s - a) * l, Ld = (a, s, l) => {
  const r = a * a, u = l * (s * s - r) + r;
  return u < 0 ? 0 : Math.sqrt(u);
}, vT = [ih, Pi, Is], bT = (a) => vT.find((s) => s.test(a));
function Vy(a) {
  const s = bT(a);
  if (!s)
    return !1;
  let l = s.parse(a);
  return s === Is && (l = yT(l)), l;
}
const Ly = (a, s) => {
  const l = Vy(a), r = Vy(s);
  if (!l || !r)
    return Vc(a, s);
  const u = { ...l };
  return (h) => (u.red = Ld(l.red, r.red, h), u.green = Ld(l.green, r.green, h), u.blue = Ld(l.blue, r.blue, h), u.alpha = nt(l.alpha, r.alpha, h), Pi.transform(u));
}, sh = /* @__PURE__ */ new Set(["none", "hidden"]);
function xT(a, s) {
  return sh.has(a) ? (l) => l <= 0 ? a : s : (l) => l >= 1 ? s : a;
}
function ST(a, s) {
  return (l) => nt(a, s, l);
}
function Yh(a) {
  return typeof a == "number" ? ST : typeof a == "string" ? Hh(a) ? Vc : St.test(a) ? Ly : CT : Array.isArray(a) ? K1 : typeof a == "object" ? St.test(a) ? Ly : wT : Vc;
}
function K1(a, s) {
  const l = [...a], r = l.length, u = a.map((h, f) => Yh(h)(h, s[f]));
  return (h) => {
    for (let f = 0; f < r; f++)
      l[f] = u[f](h);
    return l;
  };
}
function wT(a, s) {
  const l = { ...a, ...s }, r = {};
  for (const u in l)
    a[u] !== void 0 && s[u] !== void 0 && (r[u] = Yh(a[u])(a[u], s[u]));
  return (u) => {
    for (const h in r)
      l[h] = r[h](u);
    return l;
  };
}
function TT(a, s) {
  const l = [], r = { color: 0, var: 0, number: 0 };
  for (let u = 0; u < s.values.length; u++) {
    const h = s.types[u], f = a.indexes[h][r[h]], p = a.values[f] ?? 0;
    l[u] = p, r[h]++;
  }
  return l;
}
const CT = (a, s) => {
  const l = Zn.createTransformer(s), r = el(a), u = el(s);
  return r.indexes.var.length === u.indexes.var.length && r.indexes.color.length === u.indexes.color.length && r.indexes.number.length >= u.indexes.number.length ? sh.has(a) && !u.values.length || sh.has(s) && !r.values.length ? xT(a, s) : jr(K1(TT(r, u), u.values), l) : Vc(a, s);
};
function Q1(a, s, l) {
  return typeof a == "number" && typeof s == "number" && typeof l == "number" ? nt(a, s, l) : Yh(a)(a, s);
}
const ET = (a) => {
  const s = ({ timestamp: l }) => a(l);
  return {
    start: (l = !0) => Ie.update(s, l),
    stop: () => Oa(s),
    /**
     * If we're processing this frame we can use the
     * framelocked timestamp to keep things in sync.
     */
    now: () => Yt.isProcessing ? Yt.timestamp : tn.now()
  };
}, F1 = (a, s, l = 10) => {
  let r = "";
  const u = Math.max(Math.round(s / l), 2);
  for (let h = 0; h < u; h++)
    r += Math.round(a(h / (u - 1)) * 1e4) / 1e4 + ", ";
  return `linear(${r.substring(0, r.length - 2)})`;
}, Lc = 2e4;
function Xh(a) {
  let s = 0;
  const l = 50;
  let r = a.next(s);
  for (; !r.done && s < Lc; )
    s += l, r = a.next(s);
  return s >= Lc ? 1 / 0 : s;
}
function jT(a, s = 100, l) {
  const r = l({ ...a, keyframes: [0, s] }), u = Math.min(Xh(r), Lc);
  return {
    type: "keyframes",
    ease: (h) => r.next(u * h).value / s,
    duration: /* @__PURE__ */ zn(u)
  };
}
const ht = {
  // Default spring physics
  stiffness: 100,
  damping: 10,
  mass: 1,
  velocity: 0,
  // Default duration/bounce-based options
  duration: 800,
  // in ms
  bounce: 0.3,
  visualDuration: 0.3,
  // in seconds
  // Rest thresholds
  restSpeed: {
    granular: 0.01,
    default: 2
  },
  restDelta: {
    granular: 5e-3,
    default: 0.5
  },
  // Limits
  minDuration: 0.01,
  // in seconds
  maxDuration: 10,
  // in seconds
  minDamping: 0.05,
  maxDamping: 1
};
function lh(a, s) {
  return a * Math.sqrt(1 - s * s);
}
const AT = 12;
function MT(a, s, l) {
  let r = l;
  for (let u = 1; u < AT; u++)
    r = r - a(r) / s(r);
  return r;
}
const Bd = 1e-3;
function NT({ duration: a = ht.duration, bounce: s = ht.bounce, velocity: l = ht.velocity, mass: r = ht.mass }) {
  let u, h, f = 1 - s;
  f = ha(ht.minDamping, ht.maxDamping, f), a = ha(ht.minDuration, ht.maxDuration, /* @__PURE__ */ zn(a)), f < 1 ? (u = (v) => {
    const x = v * f, g = x * a, S = x - l, E = lh(v, f), j = Math.exp(-g);
    return Bd - S / E * j;
  }, h = (v) => {
    const g = v * f * a, S = g * l + l, E = Math.pow(f, 2) * Math.pow(v, 2) * a, j = Math.exp(-g), V = lh(Math.pow(v, 2), f);
    return (-u(v) + Bd > 0 ? -1 : 1) * ((S - E) * j) / V;
  }) : (u = (v) => {
    const x = Math.exp(-v * a), g = (v - l) * a + 1;
    return -Bd + x * g;
  }, h = (v) => {
    const x = Math.exp(-v * a), g = (l - v) * (a * a);
    return x * g;
  });
  const p = 5 / a, y = MT(u, h, p);
  if (a = /* @__PURE__ */ wn(a), isNaN(y))
    return {
      stiffness: ht.stiffness,
      damping: ht.damping,
      duration: a
    };
  {
    const v = Math.pow(y, 2) * r;
    return {
      stiffness: v,
      damping: f * 2 * Math.sqrt(r * v),
      duration: a
    };
  }
}
const kT = ["duration", "bounce"], DT = ["stiffness", "damping", "mass"];
function By(a, s) {
  return s.some((l) => a[l] !== void 0);
}
function RT(a) {
  let s = {
    velocity: ht.velocity,
    stiffness: ht.stiffness,
    damping: ht.damping,
    mass: ht.mass,
    isResolvedFromDuration: !1,
    ...a
  };
  if (!By(a, DT) && By(a, kT))
    if (s.velocity = 0, a.visualDuration) {
      const l = a.visualDuration, r = 2 * Math.PI / (l * 1.2), u = r * r, h = 2 * ha(0.05, 1, 1 - (a.bounce || 0)) * Math.sqrt(u);
      s = {
        ...s,
        mass: ht.mass,
        stiffness: u,
        damping: h
      };
    } else {
      const l = NT({ ...a, velocity: 0 });
      s = {
        ...s,
        ...l,
        mass: ht.mass
      }, s.isResolvedFromDuration = !0;
    }
  return s;
}
function Bc(a = ht.visualDuration, s = ht.bounce) {
  const l = typeof a != "object" ? {
    visualDuration: a,
    keyframes: [0, 1],
    bounce: s
  } : a;
  let { restSpeed: r, restDelta: u } = l;
  const h = l.keyframes[0], f = l.keyframes[l.keyframes.length - 1], p = { done: !1, value: h }, { stiffness: y, damping: v, mass: x, duration: g, velocity: S, isResolvedFromDuration: E } = RT({
    ...l,
    velocity: -/* @__PURE__ */ zn(l.velocity || 0)
  }), j = S || 0, V = v / (2 * Math.sqrt(y * x)), M = f - h, q = /* @__PURE__ */ zn(Math.sqrt(y / x)), L = Math.abs(M) < 5;
  r || (r = L ? ht.restSpeed.granular : ht.restSpeed.default), u || (u = L ? ht.restDelta.granular : ht.restDelta.default);
  let K, X, ee, oe, Q, D;
  if (V < 1)
    ee = lh(q, V), oe = (j + V * q * M) / ee, K = (te) => {
      const Ae = Math.exp(-V * q * te);
      return f - Ae * (oe * Math.sin(ee * te) + M * Math.cos(ee * te));
    }, Q = V * q * oe + M * ee, D = V * q * M - oe * ee, X = (te) => Math.exp(-V * q * te) * (Q * Math.sin(ee * te) + D * Math.cos(ee * te));
  else if (V === 1) {
    K = (Ae) => f - Math.exp(-q * Ae) * (M + (j + q * M) * Ae);
    const te = j + q * M;
    X = (Ae) => Math.exp(-q * Ae) * (q * te * Ae - j);
  } else {
    const te = q * Math.sqrt(V * V - 1);
    K = (Ee) => {
      const ce = Math.exp(-V * q * Ee), Z = Math.min(te * Ee, 300);
      return f - ce * ((j + V * q * M) * Math.sinh(Z) + te * M * Math.cosh(Z)) / te;
    };
    const Ae = (j + V * q * M) / te, Ce = V * q * Ae - M * te, Te = V * q * M - Ae * te;
    X = (Ee) => {
      const ce = Math.exp(-V * q * Ee), Z = Math.min(te * Ee, 300);
      return ce * (Ce * Math.sinh(Z) + Te * Math.cosh(Z));
    };
  }
  const W = {
    calculatedDuration: E && g || null,
    velocity: (te) => /* @__PURE__ */ wn(X(te)),
    next: (te) => {
      if (!E && V < 1) {
        const Ce = Math.exp(-V * q * te), Te = Math.sin(ee * te), Ee = Math.cos(ee * te), ce = f - Ce * (oe * Te + M * Ee), Z = /* @__PURE__ */ wn(Ce * (Q * Te + D * Ee));
        return p.done = Math.abs(Z) <= r && Math.abs(f - ce) <= u, p.value = p.done ? f : ce, p;
      }
      const Ae = K(te);
      if (E)
        p.done = te >= g;
      else {
        const Ce = /* @__PURE__ */ wn(X(te));
        p.done = Math.abs(Ce) <= r && Math.abs(f - Ae) <= u;
      }
      return p.value = p.done ? f : Ae, p;
    },
    toString: () => {
      const te = Math.min(Xh(W), Lc), Ae = F1((Ce) => W.next(te * Ce).value, te, 30);
      return te + "ms " + Ae;
    },
    toTransition: () => {
    }
  };
  return W;
}
Bc.applyToOptions = (a) => {
  const s = jT(a, 100, Bc);
  return a.ease = s.ease, a.duration = /* @__PURE__ */ wn(s.duration), a.type = "keyframes", a;
};
const _T = 5;
function I1(a, s, l) {
  const r = Math.max(s - _T, 0);
  return /* @__PURE__ */ M1(l - a(r), s - r);
}
function rh({ keyframes: a, velocity: s = 0, power: l = 0.8, timeConstant: r = 325, bounceDamping: u = 10, bounceStiffness: h = 500, modifyTarget: f, min: p, max: y, restDelta: v = 0.5, restSpeed: x }) {
  const g = a[0], S = {
    done: !1,
    value: g
  }, E = (D) => p !== void 0 && D < p || y !== void 0 && D > y, j = (D) => p === void 0 ? y : y === void 0 || Math.abs(p - D) < Math.abs(y - D) ? p : y;
  let V = l * s;
  const M = g + V, q = f === void 0 ? M : f(M);
  q !== M && (V = q - g);
  const L = (D) => -V * Math.exp(-D / r), K = (D) => q + L(D), X = (D) => {
    const W = L(D), te = K(D);
    S.done = Math.abs(W) <= v, S.value = S.done ? q : te;
  };
  let ee, oe;
  const Q = (D) => {
    E(S.value) && (ee = D, oe = Bc({
      keyframes: [S.value, j(S.value)],
      velocity: I1(K, D, S.value),
      // TODO: This should be passing * 1000
      damping: u,
      stiffness: h,
      restDelta: v,
      restSpeed: x
    }));
  };
  return Q(0), {
    calculatedDuration: null,
    next: (D) => {
      let W = !1;
      return !oe && ee === void 0 && (W = !0, X(D), Q(D)), ee !== void 0 && D >= ee ? oe.next(D - ee) : (!W && X(D), S);
    }
  };
}
function zT(a, s, l) {
  const r = [], u = l || bi.mix || Q1, h = a.length - 1;
  for (let f = 0; f < h; f++) {
    let p = u(a[f], a[f + 1]);
    if (s) {
      const y = Array.isArray(s) ? s[f] || On : s;
      p = jr(y, p);
    }
    r.push(p);
  }
  return r;
}
function P1(a, s, { clamp: l = !0, ease: r, mixer: u } = {}) {
  const h = a.length;
  if (Pc(h === s.length), h === 1)
    return () => s[0];
  if (h === 2 && s[0] === s[1])
    return () => s[1];
  const f = a[0] === a[1];
  a[0] > a[h - 1] && (a = [...a].reverse(), s = [...s].reverse());
  const p = zT(s, r, u), y = p.length, v = (x) => {
    if (f && x < a[0])
      return s[0];
    let g = 0;
    if (y > 1)
      for (; g < a.length - 2 && !(x < a[g + 1]); g++)
        ;
    const S = /* @__PURE__ */ br(a[g], a[g + 1], x);
    return p[g](S);
  };
  return l ? (x) => v(ha(a[0], a[h - 1], x)) : v;
}
function OT(a, s) {
  const l = a[a.length - 1];
  for (let r = 1; r <= s; r++) {
    const u = /* @__PURE__ */ br(0, s, r);
    a.push(nt(l, 1, u));
  }
}
function UT(a) {
  const s = [0];
  return OT(s, a.length - 1), s;
}
function VT(a, s) {
  return a.map((l) => l * s);
}
function LT(a, s) {
  return a.map(() => s || V1).splice(0, a.length - 1);
}
function fr({ duration: a = 300, keyframes: s, times: l, ease: r = "easeInOut" }) {
  const u = /* @__PURE__ */ Qw(r) ? r.map(_y) : _y(r), h = {
    done: !1,
    value: s[0]
  }, f = VT(
    // Only use the provided offsets if they're the correct length
    // TODO Maybe we should warn here if there's a length mismatch
    l && l.length === s.length ? l : UT(s),
    a
  ), p = P1(f, s, {
    ease: Array.isArray(u) ? u : LT(s, u)
  });
  return {
    calculatedDuration: a,
    next: (y) => (h.value = p(y), h.done = y >= a, h)
  };
}
const BT = (a) => a !== null;
function Jc(a, { repeat: s, repeatType: l = "loop" }, r, u = 1) {
  const h = a.filter(BT), p = u < 0 || s && l !== "loop" && s % 2 === 1 ? 0 : h.length - 1;
  return !p || r === void 0 ? h[p] : r;
}
const HT = {
  decay: rh,
  inertia: rh,
  tween: fr,
  keyframes: fr,
  spring: Bc
};
function J1(a) {
  typeof a.type == "string" && (a.type = HT[a.type]);
}
class Zh {
  constructor() {
    this.updateFinished();
  }
  get finished() {
    return this._finished;
  }
  updateFinished() {
    this._finished = new Promise((s) => {
      this.resolve = s;
    });
  }
  notifyFinished() {
    this.resolve();
  }
  /**
   * Allows the animation to be awaited.
   *
   * @deprecated Use `finished` instead.
   */
  then(s, l) {
    return this.finished.then(s, l);
  }
}
const qT = (a) => a / 100;
class Sr extends Zh {
  constructor(s) {
    super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
      done: !1,
      value: void 0
    }, this.stop = () => {
      const { motionValue: l } = this.options;
      l && l.updatedAt !== tn.now() && this.tick(tn.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
    }, this.options = s, this.initAnimation(), this.play(), s.autoplay === !1 && this.pause();
  }
  initAnimation() {
    const { options: s } = this;
    J1(s);
    const { type: l = fr, repeat: r = 0, repeatDelay: u = 0, repeatType: h, velocity: f = 0 } = s;
    let { keyframes: p } = s;
    const y = l || fr;
    y !== fr && typeof p[0] != "number" && (this.mixKeyframes = jr(qT, Q1(p[0], p[1])), p = [0, 100]);
    const v = y({ ...s, keyframes: p });
    h === "mirror" && (this.mirroredGenerator = y({
      ...s,
      keyframes: [...p].reverse(),
      velocity: -f
    })), v.calculatedDuration === null && (v.calculatedDuration = Xh(v));
    const { calculatedDuration: x } = v;
    this.calculatedDuration = x, this.resolvedDuration = x + u, this.totalDuration = this.resolvedDuration * (r + 1) - u, this.generator = v;
  }
  updateTime(s) {
    const l = Math.round(s - this.startTime) * this.playbackSpeed;
    this.holdTime !== null ? this.currentTime = this.holdTime : this.currentTime = l;
  }
  tick(s, l = !1) {
    const { generator: r, totalDuration: u, mixKeyframes: h, mirroredGenerator: f, resolvedDuration: p, calculatedDuration: y } = this;
    if (this.startTime === null)
      return r.next(0);
    const { delay: v = 0, keyframes: x, repeat: g, repeatType: S, repeatDelay: E, type: j, onUpdate: V, finalKeyframe: M } = this.options;
    this.speed > 0 ? this.startTime = Math.min(this.startTime, s) : this.speed < 0 && (this.startTime = Math.min(s - u / this.speed, this.startTime)), l ? this.currentTime = s : this.updateTime(s);
    const q = this.currentTime - v * (this.playbackSpeed >= 0 ? 1 : -1), L = this.playbackSpeed >= 0 ? q < 0 : q > u;
    this.currentTime = Math.max(q, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = u);
    let K = this.currentTime, X = r;
    if (g) {
      const D = Math.min(this.currentTime, u) / p;
      let W = Math.floor(D), te = D % 1;
      !te && D >= 1 && (te = 1), te === 1 && W--, W = Math.min(W, g + 1), W % 2 && (S === "reverse" ? (te = 1 - te, E && (te -= E / p)) : S === "mirror" && (X = f)), K = ha(0, 1, te) * p;
    }
    let ee;
    L ? (this.delayState.value = x[0], ee = this.delayState) : ee = X.next(K), h && !L && (ee.value = h(ee.value));
    let { done: oe } = ee;
    !L && y !== null && (oe = this.playbackSpeed >= 0 ? this.currentTime >= u : this.currentTime <= 0);
    const Q = this.holdTime === null && (this.state === "finished" || this.state === "running" && oe);
    return Q && j !== rh && (ee.value = Jc(x, this.options, M, this.speed)), V && V(ee.value), Q && this.finish(), ee;
  }
  /**
   * Allows the returned animation to be awaited or promise-chained. Currently
   * resolves when the animation finishes at all but in a future update could/should
   * reject if its cancels.
   */
  then(s, l) {
    return this.finished.then(s, l);
  }
  get duration() {
    return /* @__PURE__ */ zn(this.calculatedDuration);
  }
  get iterationDuration() {
    const { delay: s = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ zn(s);
  }
  get time() {
    return /* @__PURE__ */ zn(this.currentTime);
  }
  set time(s) {
    s = /* @__PURE__ */ wn(s), this.currentTime = s, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = s : this.driver && (this.startTime = this.driver.now() - s / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = s, this.tick(s));
  }
  /**
   * Returns the generator's velocity at the current time in units/second.
   * Uses the analytical derivative when available (springs), avoiding
   * the MotionValue's frame-dependent velocity estimation.
   */
  getGeneratorVelocity() {
    const s = this.currentTime;
    if (s <= 0)
      return this.options.velocity || 0;
    if (this.generator.velocity)
      return this.generator.velocity(s);
    const l = this.generator.next(s).value;
    return I1((r) => this.generator.next(r).value, s, l);
  }
  get speed() {
    return this.playbackSpeed;
  }
  set speed(s) {
    const l = this.playbackSpeed !== s;
    l && this.driver && this.updateTime(tn.now()), this.playbackSpeed = s, l && this.driver && (this.time = /* @__PURE__ */ zn(this.currentTime));
  }
  play() {
    if (this.isStopped)
      return;
    const { driver: s = ET, startTime: l } = this.options;
    this.driver || (this.driver = s((u) => this.tick(u))), this.options.onPlay?.();
    const r = this.driver.now();
    this.state === "finished" ? (this.updateFinished(), this.startTime = r) : this.holdTime !== null ? this.startTime = r - this.holdTime : this.startTime || (this.startTime = l ?? r), this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
  }
  pause() {
    this.state = "paused", this.updateTime(tn.now()), this.holdTime = this.currentTime;
  }
  complete() {
    this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
  }
  finish() {
    this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
  }
  cancel() {
    this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
  }
  teardown() {
    this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
  }
  stopDriver() {
    this.driver && (this.driver.stop(), this.driver = void 0);
  }
  sample(s) {
    return this.startTime = 0, this.tick(s, !0);
  }
  attachTimeline(s) {
    return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), s.observe(this);
  }
}
function GT(a) {
  for (let s = 1; s < a.length; s++)
    a[s] ?? (a[s] = a[s - 1]);
}
const Ji = (a) => a * 180 / Math.PI, oh = (a) => {
  const s = Ji(Math.atan2(a[1], a[0]));
  return ch(s);
}, YT = {
  x: 4,
  y: 5,
  translateX: 4,
  translateY: 5,
  scaleX: 0,
  scaleY: 3,
  scale: (a) => (Math.abs(a[0]) + Math.abs(a[3])) / 2,
  rotate: oh,
  rotateZ: oh,
  skewX: (a) => Ji(Math.atan(a[1])),
  skewY: (a) => Ji(Math.atan(a[2])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[2])) / 2
}, ch = (a) => (a = a % 360, a < 0 && (a += 360), a), Hy = oh, qy = (a) => Math.sqrt(a[0] * a[0] + a[1] * a[1]), Gy = (a) => Math.sqrt(a[4] * a[4] + a[5] * a[5]), XT = {
  x: 12,
  y: 13,
  z: 14,
  translateX: 12,
  translateY: 13,
  translateZ: 14,
  scaleX: qy,
  scaleY: Gy,
  scale: (a) => (qy(a) + Gy(a)) / 2,
  rotateX: (a) => ch(Ji(Math.atan2(a[6], a[5]))),
  rotateY: (a) => ch(Ji(Math.atan2(-a[2], a[0]))),
  rotateZ: Hy,
  rotate: Hy,
  skewX: (a) => Ji(Math.atan(a[4])),
  skewY: (a) => Ji(Math.atan(a[1])),
  skew: (a) => (Math.abs(a[1]) + Math.abs(a[4])) / 2
};
function uh(a) {
  return a.includes("scale") ? 1 : 0;
}
function fh(a, s) {
  if (!a || a === "none")
    return uh(s);
  const l = a.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
  let r, u;
  if (l)
    r = XT, u = l;
  else {
    const p = a.match(/^matrix\(([-\d.e\s,]+)\)$/u);
    r = YT, u = p;
  }
  if (!u)
    return uh(s);
  const h = r[s], f = u[1].split(",").map(KT);
  return typeof h == "function" ? h(f) : f[h];
}
const ZT = (a, s) => {
  const { transform: l = "none" } = getComputedStyle(a);
  return fh(l, s);
};
function KT(a) {
  return parseFloat(a.trim());
}
const al = [
  "transformPerspective",
  "x",
  "y",
  "z",
  "translateX",
  "translateY",
  "translateZ",
  "scale",
  "scaleX",
  "scaleY",
  "rotate",
  "rotateX",
  "rotateY",
  "rotateZ",
  "skew",
  "skewX",
  "skewY"
], il = /* @__PURE__ */ new Set([...al, "pathRotation"]), Yy = (a) => a === nl || a === ge, QT = /* @__PURE__ */ new Set(["x", "y", "z"]), FT = al.filter((a) => !QT.has(a));
function IT(a) {
  const s = [];
  return FT.forEach((l) => {
    const r = a.getValue(l);
    r !== void 0 && (s.push([l, r.get()]), r.set(l.startsWith("scale") ? 1 : 0));
  }), s;
}
const yi = {
  // Dimensions
  width: ({ x: a }, { paddingLeft: s = "0", paddingRight: l = "0", boxSizing: r }) => {
    const u = a.max - a.min;
    return r === "border-box" ? u : u - parseFloat(s) - parseFloat(l);
  },
  height: ({ y: a }, { paddingTop: s = "0", paddingBottom: l = "0", boxSizing: r }) => {
    const u = a.max - a.min;
    return r === "border-box" ? u : u - parseFloat(s) - parseFloat(l);
  },
  top: (a, { top: s }) => parseFloat(s),
  left: (a, { left: s }) => parseFloat(s),
  bottom: ({ y: a }, { top: s }) => parseFloat(s) + (a.max - a.min),
  right: ({ x: a }, { left: s }) => parseFloat(s) + (a.max - a.min),
  // Transform
  x: (a, { transform: s }) => fh(s, "x"),
  y: (a, { transform: s }) => fh(s, "y")
};
yi.translateX = yi.x;
yi.translateY = yi.y;
const $i = /* @__PURE__ */ new Set();
let dh = !1, hh = !1, mh = !1;
function $1() {
  if (hh) {
    const a = Array.from($i).filter((r) => r.needsMeasurement), s = new Set(a.map((r) => r.element)), l = /* @__PURE__ */ new Map();
    s.forEach((r) => {
      const u = IT(r);
      u.length && (l.set(r, u), r.render());
    }), a.forEach((r) => r.measureInitialState()), s.forEach((r) => {
      r.render();
      const u = l.get(r);
      u && u.forEach(([h, f]) => {
        r.getValue(h)?.set(f);
      });
    }), a.forEach((r) => r.measureEndState()), a.forEach((r) => {
      r.suspendedScrollY !== void 0 && window.scrollTo(0, r.suspendedScrollY);
    });
  }
  hh = !1, dh = !1, $i.forEach((a) => a.complete(mh)), $i.clear();
}
function W1() {
  $i.forEach((a) => {
    a.readKeyframes(), a.needsMeasurement && (hh = !0);
  });
}
function PT() {
  mh = !0, W1(), $1(), mh = !1;
}
class Kh {
  constructor(s, l, r, u, h, f = !1) {
    this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...s], this.onComplete = l, this.name = r, this.motionValue = u, this.element = h, this.isAsync = f;
  }
  scheduleResolve() {
    this.state = "scheduled", this.isAsync ? ($i.add(this), dh || (dh = !0, Ie.read(W1), Ie.resolveKeyframes($1))) : (this.readKeyframes(), this.complete());
  }
  readKeyframes() {
    const { unresolvedKeyframes: s, name: l, element: r, motionValue: u } = this;
    if (s[0] === null) {
      const h = u?.get(), f = s[s.length - 1];
      if (h !== void 0)
        s[0] = h;
      else if (r && l) {
        const p = r.readValue(l, f);
        p != null && (s[0] = p);
      }
      s[0] === void 0 && (s[0] = f), u && h === void 0 && u.set(s[0]);
    }
    GT(s);
  }
  setFinalKeyframe() {
  }
  measureInitialState() {
  }
  renderEndStyles() {
  }
  measureEndState() {
  }
  complete(s = !1) {
    this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, s), $i.delete(this);
  }
  cancel() {
    this.state === "scheduled" && ($i.delete(this), this.state = "pending");
  }
  resume() {
    this.state === "pending" && this.scheduleResolve();
  }
}
const JT = (a) => a.startsWith("--");
function eb(a, s, l) {
  JT(s) ? a.style.setProperty(s, l) : a.style[s] = l;
}
const $T = {};
function tb(a, s) {
  const l = /* @__PURE__ */ A1(a);
  return () => $T[s] ?? l();
}
const WT = /* @__PURE__ */ tb(() => window.ScrollTimeline !== void 0, "scrollTimeline"), nb = /* @__PURE__ */ tb(() => {
  try {
    document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
  } catch {
    return !1;
  }
  return !0;
}, "linearEasing"), rr = ([a, s, l, r]) => `cubic-bezier(${a}, ${s}, ${l}, ${r})`, Xy = {
  linear: "linear",
  ease: "ease",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  circIn: /* @__PURE__ */ rr([0, 0.65, 0.55, 1]),
  circOut: /* @__PURE__ */ rr([0.55, 0, 1, 0.45]),
  backIn: /* @__PURE__ */ rr([0.31, 0.01, 0.66, -0.59]),
  backOut: /* @__PURE__ */ rr([0.33, 1.53, 0.69, 0.99])
};
function ab(a, s) {
  if (a)
    return typeof a == "function" ? nb() ? F1(a, s) : "ease-out" : /* @__PURE__ */ L1(a) ? rr(a) : Array.isArray(a) ? a.map((l) => ab(l, s) || Xy.easeOut) : Xy[a];
}
function eC(a, s, l, { delay: r = 0, duration: u = 300, repeat: h = 0, repeatType: f = "loop", ease: p = "easeOut", times: y } = {}, v = void 0) {
  const x = {
    [s]: l
  };
  y && (x.offset = y);
  const g = ab(p, u);
  Array.isArray(g) && (x.easing = g);
  const S = {
    delay: r,
    duration: u,
    easing: Array.isArray(g) ? "linear" : g,
    fill: "both",
    iterations: h + 1,
    direction: f === "reverse" ? "alternate" : "normal"
  };
  return v && (S.pseudoElement = v), a.animate(x, S);
}
function ib(a) {
  return typeof a == "function" && "applyToOptions" in a;
}
function tC({ type: a, ...s }) {
  return ib(a) && nb() ? a.applyToOptions(s) : (s.duration ?? (s.duration = 300), s.ease ?? (s.ease = "easeOut"), s);
}
class sb extends Zh {
  constructor(s) {
    if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !s)
      return;
    const { element: l, name: r, keyframes: u, pseudoElement: h, allowFlatten: f = !1, finalKeyframe: p, onComplete: y } = s;
    this.isPseudoElement = !!h, this.allowFlatten = f, this.options = s, Pc(typeof s.type != "string");
    const v = tC(s);
    this.animation = eC(l, r, u, v, h), v.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
      if (this.finishedTime = this.time, !h) {
        const x = Jc(u, this.options, p, this.speed);
        this.updateMotionValue && this.updateMotionValue(x), eb(l, r, x), this.animation.cancel();
      }
      y?.(), this.notifyFinished();
    };
  }
  play() {
    this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.finish?.();
  }
  cancel() {
    try {
      this.animation.cancel();
    } catch {
    }
  }
  stop() {
    if (this.isStopped)
      return;
    this.isStopped = !0;
    const { state: s } = this;
    s === "idle" || s === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * In this method, we commit styles back to the DOM before cancelling
   * the animation.
   *
   * This is designed to be overridden by NativeAnimationExtended, which
   * will create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to also correctly calculate velocity for any subsequent animation
   * while deferring the commit until the next animation frame.
   */
  commitStyles() {
    const s = this.options?.element;
    !this.isPseudoElement && s?.isConnected && this.animation.commitStyles?.();
  }
  get duration() {
    const s = this.animation.effect?.getComputedTiming?.().duration || 0;
    return /* @__PURE__ */ zn(Number(s));
  }
  get iterationDuration() {
    const { delay: s = 0 } = this.options || {};
    return this.duration + /* @__PURE__ */ zn(s);
  }
  get time() {
    return /* @__PURE__ */ zn(Number(this.animation.currentTime) || 0);
  }
  set time(s) {
    const l = this.finishedTime !== null;
    this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ wn(s), l && this.animation.pause();
  }
  /**
   * The playback speed of the animation.
   * 1 = normal speed, 2 = double speed, 0.5 = half speed.
   */
  get speed() {
    return this.animation.playbackRate;
  }
  set speed(s) {
    s < 0 && (this.finishedTime = null), this.animation.playbackRate = s;
  }
  get state() {
    return this.finishedTime !== null ? "finished" : this.animation.playState;
  }
  get startTime() {
    return this.manualStartTime ?? Number(this.animation.startTime);
  }
  set startTime(s) {
    this.manualStartTime = this.animation.startTime = s;
  }
  /**
   * Attaches a timeline to the animation, for instance the `ScrollTimeline`.
   */
  attachTimeline({ timeline: s, rangeStart: l, rangeEnd: r, observe: u }) {
    return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, s && WT() ? (this.animation.timeline = s, l && (this.animation.rangeStart = l), r && (this.animation.rangeEnd = r), On) : u(this);
  }
}
const lb = {
  anticipate: z1,
  backInOut: _1,
  circInOut: U1
};
function nC(a) {
  return a in lb;
}
function aC(a) {
  typeof a.ease == "string" && nC(a.ease) && (a.ease = lb[a.ease]);
}
const Hd = 10;
class iC extends sb {
  constructor(s) {
    aC(s), J1(s), super(s), s.startTime !== void 0 && s.autoplay !== !1 && (this.startTime = s.startTime), this.options = s;
  }
  /**
   * WAAPI doesn't natively have any interruption capabilities.
   *
   * Rather than read committed styles back out of the DOM, we can
   * create a renderless JS animation and sample it twice to calculate
   * its current value, "previous" value, and therefore allow
   * Motion to calculate velocity for any subsequent animation.
   */
  updateMotionValue(s) {
    const { motionValue: l, onUpdate: r, onComplete: u, element: h, ...f } = this.options;
    if (!l)
      return;
    if (s !== void 0) {
      l.set(s);
      return;
    }
    const p = new Sr({
      ...f,
      autoplay: !1
    }), y = Math.max(Hd, tn.now() - this.startTime), v = ha(0, Hd, y - Hd), x = p.sample(y).value, { name: g } = this.options;
    h && g && eb(h, g, x), l.setWithVelocity(p.sample(Math.max(0, y - v)).value, x, v), p.stop();
  }
}
const Zy = (a, s) => s === "zIndex" ? !1 : !!(typeof a == "number" || Array.isArray(a) || typeof a == "string" && // It's animatable if we have a string
(Zn.test(a) || a === "0") && // And it contains numbers and/or colors
!a.startsWith("url("));
function sC(a) {
  const s = a[0];
  if (a.length === 1)
    return !0;
  for (let l = 0; l < a.length; l++)
    if (a[l] !== s)
      return !0;
}
function lC(a, s, l, r) {
  const u = a[0];
  if (u === null)
    return !1;
  if (s === "display" || s === "visibility")
    return !0;
  const h = a[a.length - 1], f = Zy(u, s), p = Zy(h, s);
  return !f || !p ? !1 : sC(a) || (l === "spring" || ib(l)) && r;
}
function ph(a) {
  a.duration = 0, a.type = "keyframes";
}
const rb = /* @__PURE__ */ new Set([
  "opacity",
  "clipPath",
  "filter",
  "transform",
  "backgroundColor"
]), rC = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function oC(a) {
  for (let s = 0; s < a.length; s++)
    if (typeof a[s] == "string" && rC.test(a[s]))
      return !0;
  return !1;
}
const cC = /* @__PURE__ */ new Set([
  "color",
  "backgroundColor",
  "outlineColor",
  "fill",
  "stroke",
  "borderColor",
  "borderTopColor",
  "borderRightColor",
  "borderBottomColor",
  "borderLeftColor"
]), uC = /* @__PURE__ */ A1(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function fC(a) {
  const { motionValue: s, name: l, repeatDelay: r, repeatType: u, damping: h, type: f, keyframes: p } = a, y = s?.owner?.current;
  if (!(y instanceof HTMLElement) && !(y instanceof SVGElement))
    return !1;
  const { onUpdate: v, transformTemplate: x } = s.owner.getProps();
  return uC() && l && /**
   * Force WAAPI for color properties with browser-only color formats
   * (oklch, oklab, lab, lch, etc.) that the JS animation path can't parse.
   */
  (rb.has(l) || cC.has(l) && oC(p)) && (l !== "transform" || !x) && /**
   * If we're outputting values to onUpdate then we can't use WAAPI as there's
   * no way to read the value from WAAPI every frame.
   */
  !v && !r && u !== "mirror" && h !== 0 && f !== "inertia";
}
const dC = 40;
class hC extends Zh {
  constructor({ autoplay: s = !0, delay: l = 0, type: r = "keyframes", repeat: u = 0, repeatDelay: h = 0, repeatType: f = "loop", keyframes: p, name: y, motionValue: v, element: x, ...g }) {
    super(), this.stop = () => {
      this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
    }, this.createdAt = tn.now();
    const S = {
      autoplay: s,
      delay: l,
      type: r,
      repeat: u,
      repeatDelay: h,
      repeatType: f,
      name: y,
      motionValue: v,
      element: x,
      ...g
    }, E = x?.KeyframeResolver || Kh;
    this.keyframeResolver = new E(p, (j, V, M) => this.onKeyframesResolved(j, V, S, !M), y, v, x), this.keyframeResolver?.scheduleResolve();
  }
  onKeyframesResolved(s, l, r, u) {
    this.keyframeResolver = void 0;
    const { name: h, type: f, velocity: p, delay: y, isHandoff: v, onUpdate: x } = r;
    this.resolvedAt = tn.now();
    let g = !0;
    lC(s, h, f, p) || (g = !1, (bi.instantAnimations || !y) && x?.(Jc(s, r, l)), s[0] = s[s.length - 1], ph(r), r.repeat = 0);
    const E = {
      startTime: u ? this.resolvedAt ? this.resolvedAt - this.createdAt > dC ? this.resolvedAt : this.createdAt : this.createdAt : void 0,
      finalKeyframe: l,
      ...r,
      keyframes: s
    }, j = g && !v && fC(E), V = E.motionValue?.owner?.current;
    let M;
    if (j)
      try {
        M = new iC({
          ...E,
          element: V
        });
      } catch {
        M = new Sr(E);
      }
    else
      M = new Sr(E);
    M.finished.then(() => {
      this.notifyFinished();
    }).catch(On), this.pendingTimeline && (this.stopTimeline = M.attachTimeline(this.pendingTimeline), this.pendingTimeline = void 0), this._animation = M;
  }
  get finished() {
    return this._animation ? this.animation.finished : this._finished;
  }
  then(s, l) {
    return this.finished.finally(s).then(() => {
    });
  }
  get animation() {
    return this._animation || (this.keyframeResolver?.resume(), PT()), this._animation;
  }
  get duration() {
    return this.animation.duration;
  }
  get iterationDuration() {
    return this.animation.iterationDuration;
  }
  get time() {
    return this.animation.time;
  }
  set time(s) {
    this.animation.time = s;
  }
  get speed() {
    return this.animation.speed;
  }
  get state() {
    return this.animation.state;
  }
  set speed(s) {
    this.animation.speed = s;
  }
  get startTime() {
    return this.animation.startTime;
  }
  attachTimeline(s) {
    return this._animation ? this.stopTimeline = this.animation.attachTimeline(s) : this.pendingTimeline = s, () => this.stop();
  }
  play() {
    this.animation.play();
  }
  pause() {
    this.animation.pause();
  }
  complete() {
    this.animation.complete();
  }
  cancel() {
    this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
  }
}
function ob(a, s, l, r = 0, u = 1) {
  const h = Array.from(a).sort((v, x) => v.sortNodePosition(x)).indexOf(s), f = a.size, p = (f - 1) * r;
  return typeof l == "function" ? l(h, f) : u === 1 ? h * r : p - h * r;
}
const Ky = 30, mC = (a) => !isNaN(parseFloat(a)), dr = {
  current: void 0
};
class pC {
  /**
   * @param init - The initiating value
   * @param config - Optional configuration options
   *
   * -  `transformer`: A function to transform incoming values with.
   */
  constructor(s, l = {}) {
    this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (r) => {
      const u = tn.now();
      if (this.updatedAt !== u && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(r), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents))
        for (const h of this.dependents)
          h.dirty();
    }, this.hasAnimated = !1, this.setCurrent(s), this.owner = l.owner;
  }
  setCurrent(s) {
    this.current = s, this.updatedAt = tn.now(), this.canTrackVelocity === null && s !== void 0 && (this.canTrackVelocity = mC(this.current));
  }
  setPrevFrameValue(s = this.current) {
    this.prevFrameValue = s, this.prevUpdatedAt = this.updatedAt;
  }
  /**
   * Adds a function that will be notified when the `MotionValue` is updated.
   *
   * It returns a function that, when called, will cancel the subscription.
   *
   * When calling `onChange` inside a React component, it should be wrapped with the
   * `useEffect` hook. As it returns an unsubscribe function, this should be returned
   * from the `useEffect` function to ensure you don't add duplicate subscribers..
   *
   * ```jsx
   * export const MyComponent = () => {
   *   const x = useMotionValue(0)
   *   const y = useMotionValue(0)
   *   const opacity = useMotionValue(1)
   *
   *   useEffect(() => {
   *     function updateOpacity() {
   *       const maxXY = Math.max(x.get(), y.get())
   *       const newOpacity = transform(maxXY, [0, 100], [1, 0])
   *       opacity.set(newOpacity)
   *     }
   *
   *     const unsubscribeX = x.on("change", updateOpacity)
   *     const unsubscribeY = y.on("change", updateOpacity)
   *
   *     return () => {
   *       unsubscribeX()
   *       unsubscribeY()
   *     }
   *   }, [])
   *
   *   return <motion.div style={{ x }} />
   * }
   * ```
   *
   * @param subscriber - A function that receives the latest value.
   * @returns A function that, when called, will cancel this subscription.
   *
   * @deprecated
   */
  onChange(s) {
    return this.on("change", s);
  }
  on(s, l) {
    this.events[s] || (this.events[s] = new Vh());
    const r = this.events[s].add(l);
    return s === "change" ? () => {
      r(), Ie.read(() => {
        this.events.change.getSize() || this.stop();
      });
    } : r;
  }
  clearListeners() {
    for (const s in this.events)
      this.events[s].clear();
  }
  /**
   * Attaches a passive effect to the `MotionValue`.
   */
  attach(s, l) {
    this.passiveEffect = s, this.stopPassiveEffect = l;
  }
  /**
   * Sets the state of the `MotionValue`.
   *
   * @remarks
   *
   * ```jsx
   * const x = useMotionValue(0)
   * x.set(10)
   * ```
   *
   * @param latest - Latest value to set.
   * @param render - Whether to notify render subscribers. Defaults to `true`
   *
   * @public
   */
  set(s) {
    this.passiveEffect ? this.passiveEffect(s, this.updateAndNotify) : this.updateAndNotify(s);
  }
  setWithVelocity(s, l, r) {
    this.set(l), this.prev = void 0, this.prevFrameValue = s, this.prevUpdatedAt = this.updatedAt - r;
  }
  /**
   * Set the state of the `MotionValue`, stopping any active animations,
   * effects, and resets velocity to `0`.
   */
  jump(s, l = !0) {
    this.updateAndNotify(s), this.prev = s, this.prevUpdatedAt = this.prevFrameValue = void 0, l && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
  dirty() {
    this.events.change?.notify(this.current);
  }
  addDependent(s) {
    this.dependents || (this.dependents = /* @__PURE__ */ new Set()), this.dependents.add(s);
  }
  removeDependent(s) {
    this.dependents && this.dependents.delete(s);
  }
  /**
   * Returns the latest state of `MotionValue`
   *
   * @returns - The latest state of `MotionValue`
   *
   * @public
   */
  get() {
    return dr.current && dr.current.push(this), this.current;
  }
  /**
   * @public
   */
  getPrevious() {
    return this.prev;
  }
  /**
   * Returns the latest velocity of `MotionValue`
   *
   * @returns - The latest velocity of `MotionValue`. Returns `0` if the state is non-numerical.
   *
   * @public
   */
  getVelocity() {
    const s = tn.now();
    if (!this.canTrackVelocity || this.prevFrameValue === void 0 || s - this.updatedAt > Ky)
      return 0;
    const l = Math.min(this.updatedAt - this.prevUpdatedAt, Ky);
    return /* @__PURE__ */ M1(parseFloat(this.current) - parseFloat(this.prevFrameValue), l);
  }
  /**
   * Registers a new animation to control this `MotionValue`. Only one
   * animation can drive a `MotionValue` at one time.
   *
   * ```jsx
   * value.start()
   * ```
   *
   * @param animation - A function that starts the provided animation
   */
  start(s) {
    return this.stop(), new Promise((l) => {
      this.hasAnimated = !0, this.animation = s(l), this.events.animationStart && this.events.animationStart.notify();
    }).then(() => {
      this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
    });
  }
  /**
   * Stop the currently active animation.
   *
   * @public
   */
  stop() {
    this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
  }
  /**
   * Returns `true` if this value is currently animating.
   *
   * @public
   */
  isAnimating() {
    return !!this.animation;
  }
  clearAnimation() {
    delete this.animation;
  }
  /**
   * Destroy and clean up subscribers to this `MotionValue`.
   *
   * The `MotionValue` hooks like `useMotionValue` and `useTransform` automatically
   * handle the lifecycle of the returned `MotionValue`, so this method is only necessary if you've manually
   * created a `MotionValue` via the `motionValue` function.
   *
   * @public
   */
  destroy() {
    this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
  }
}
function es(a, s) {
  return new pC(a, s);
}
function Qh(a, s) {
  if (a?.inherit && s) {
    const { inherit: l, ...r } = a;
    return { ...s, ...r };
  }
  return a;
}
function Fh(a, s) {
  const l = a?.[s] ?? a?.default ?? a;
  return l !== a ? Qh(l, a) : l;
}
const gC = {
  type: "spring",
  stiffness: 500,
  damping: 25,
  restSpeed: 10
}, yC = (a) => ({
  type: "spring",
  stiffness: 550,
  damping: a === 0 ? 2 * Math.sqrt(550) : 30,
  restSpeed: 10
}), vC = {
  type: "keyframes",
  duration: 0.8
}, bC = {
  type: "keyframes",
  ease: [0.25, 0.1, 0.35, 1],
  duration: 0.3
}, xC = (a, { keyframes: s }) => s.length > 2 ? vC : il.has(a) ? a.startsWith("scale") ? yC(s[1]) : gC : bC, SC = /* @__PURE__ */ new Set([
  "when",
  "delay",
  "delayChildren",
  "staggerChildren",
  "staggerDirection",
  "repeat",
  "repeatType",
  "repeatDelay",
  "from",
  "elapsed"
]);
function wC(a) {
  for (const s in a)
    if (!SC.has(s))
      return !0;
  return !1;
}
const Ih = (a, s, l, r = {}, u, h) => (f) => {
  const p = Fh(r, a) || {}, y = p.delay || r.delay || 0;
  let { elapsed: v = 0 } = r;
  v = v - /* @__PURE__ */ wn(y);
  const x = {
    keyframes: Array.isArray(l) ? l : [null, l],
    ease: "easeOut",
    velocity: s.getVelocity(),
    ...p,
    delay: -v,
    onUpdate: (S) => {
      s.set(S), p.onUpdate && p.onUpdate(S);
    },
    onComplete: () => {
      f(), p.onComplete && p.onComplete();
    },
    name: a,
    motionValue: s,
    element: h ? void 0 : u
  };
  wC(p) || Object.assign(x, xC(a, x)), x.duration && (x.duration = /* @__PURE__ */ wn(x.duration)), x.repeatDelay && (x.repeatDelay = /* @__PURE__ */ wn(x.repeatDelay)), x.from !== void 0 && (x.keyframes[0] = x.from);
  let g = !1;
  if ((x.type === !1 || x.duration === 0 && !x.repeatDelay) && (ph(x), x.delay === 0 && (g = !0)), (bi.instantAnimations || bi.skipAnimations || u?.shouldSkipAnimations || p.skipAnimations) && (g = !0, ph(x), x.delay = 0), x.allowFlatten = !p.type && !p.ease, g && !h && s.get() !== void 0) {
    const S = Jc(x.keyframes, p);
    if (S !== void 0) {
      Ie.update(() => {
        x.onUpdate(S), x.onComplete();
      });
      return;
    }
  }
  return p.isSync ? new Sr(x) : new hC(x);
}, TC = (
  // eslint-disable-next-line redos-detector/no-unsafe-regex -- false positive, as it can match a lot of words
  /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u
);
function CC(a) {
  const s = TC.exec(a);
  if (!s)
    return [,];
  const [, l, r, u] = s;
  return [`--${l ?? r}`, u];
}
function cb(a, s, l = 1) {
  const [r, u] = CC(a);
  if (!r)
    return;
  const h = window.getComputedStyle(s).getPropertyValue(r);
  if (h) {
    const f = h.trim();
    return C1(f) ? parseFloat(f) : f;
  }
  return Hh(u) ? cb(u, s, l + 1) : u;
}
function Qy(a) {
  const s = [{}, {}];
  return a?.values.forEach((l, r) => {
    s[0][r] = l.get(), s[1][r] = l.getVelocity();
  }), s;
}
function Ph(a, s, l, r) {
  if (typeof s == "function") {
    const [u, h] = Qy(r);
    s = s(l !== void 0 ? l : a.custom, u, h);
  }
  if (typeof s == "string" && (s = a.variants && a.variants[s]), typeof s == "function") {
    const [u, h] = Qy(r);
    s = s(l !== void 0 ? l : a.custom, u, h);
  }
  return s;
}
function Wi(a, s, l) {
  const r = a.getProps();
  return Ph(r, s, l !== void 0 ? l : r.custom, a);
}
const ub = /* @__PURE__ */ new Set([
  "width",
  "height",
  "top",
  "left",
  "right",
  "bottom",
  ...al
]), gh = (a) => Array.isArray(a);
function EC(a, s, l) {
  a.hasValue(s) ? a.getValue(s).set(l) : a.addValue(s, es(l));
}
function jC(a) {
  return gh(a) ? a[a.length - 1] || 0 : a;
}
function AC(a, s) {
  const l = Wi(a, s);
  let { transitionEnd: r = {}, transition: u = {}, ...h } = l || {};
  h = { ...h, ...r };
  for (const f in h) {
    const p = jC(h[f]);
    EC(a, f, p);
  }
}
const At = (a) => !!(a && a.getVelocity);
function MC(a) {
  return !!(At(a) && a.add);
}
function yh(a, s) {
  const l = a.getValue("willChange");
  if (MC(l))
    return l.add(s);
  if (!l && bi.WillChange) {
    const r = new bi.WillChange("auto");
    a.addValue("willChange", r), r.add(s);
  }
}
function Jh(a) {
  return a.replace(/([A-Z])/g, (s) => `-${s.toLowerCase()}`);
}
const NC = "framerAppearId", fb = "data-" + Jh(NC);
function db(a) {
  return a.props[fb];
}
function kC({ protectedKeys: a, needsAnimating: s }, l) {
  const r = a.hasOwnProperty(l) && s[l] !== !0;
  return s[l] = !1, r;
}
function hb(a, s, { delay: l = 0, transitionOverride: r, type: u } = {}) {
  let { transition: h, transitionEnd: f, ...p } = s;
  const y = a.getDefaultTransition();
  h = h ? Qh(h, y) : y;
  const v = h?.reduceMotion, x = h?.skipAnimations;
  r && (h = r);
  const g = [], S = u && a.animationState && a.animationState.getState()[u], E = h?.path;
  E && E.animateVisualElement(a, p, h, l, g);
  for (const j in p) {
    const V = a.getValue(j, a.latestValues[j] ?? null), M = p[j];
    if (M === void 0 || S && kC(S, j))
      continue;
    const q = {
      delay: l,
      ...Fh(h || {}, j)
    };
    x && (q.skipAnimations = !0);
    const L = V.get();
    if (L !== void 0 && !V.isAnimating() && !Array.isArray(M) && M === L && !q.velocity) {
      Ie.update(() => V.set(M));
      continue;
    }
    let K = !1;
    if (window.MotionHandoffAnimation) {
      const oe = db(a);
      if (oe) {
        const Q = window.MotionHandoffAnimation(oe, j, Ie);
        Q !== null && (q.startTime = Q, K = !0);
      }
    }
    yh(a, j);
    const X = v ?? a.shouldReduceMotion;
    V.start(Ih(j, V, M, X && ub.has(j) ? { type: !1 } : q, a, K));
    const ee = V.animation;
    ee && g.push(ee);
  }
  if (f) {
    const j = () => Ie.update(() => {
      f && AC(a, f);
    });
    g.length ? Promise.all(g).then(j) : j();
  }
  return g;
}
function vh(a, s, l = {}) {
  const r = Wi(a, s, l.type === "exit" ? a.presenceContext?.custom : void 0);
  let { transition: u = a.getDefaultTransition() || {} } = r || {};
  l.transitionOverride && (u = l.transitionOverride);
  const h = r ? () => Promise.all(hb(a, r, l)) : () => Promise.resolve(), f = a.variantChildren && a.variantChildren.size ? (y = 0) => {
    const { delayChildren: v = 0, staggerChildren: x, staggerDirection: g } = u;
    return DC(a, s, y, v, x, g, l);
  } : () => Promise.resolve(), { when: p } = u;
  if (p) {
    const [y, v] = p === "beforeChildren" ? [h, f] : [f, h];
    return y().then(() => v());
  } else
    return Promise.all([h(), f(l.delay)]);
}
function DC(a, s, l = 0, r = 0, u = 0, h = 1, f) {
  const p = [];
  for (const y of a.variantChildren)
    y.notify("AnimationStart", s), p.push(vh(y, s, {
      ...f,
      delay: l + (typeof r == "function" ? 0 : r) + ob(a.variantChildren, y, r, u, h)
    }).then(() => y.notify("AnimationComplete", s)));
  return Promise.all(p);
}
function RC(a, s, l = {}) {
  a.notify("AnimationStart", s);
  let r;
  if (Array.isArray(s)) {
    const u = s.map((h) => vh(a, h, l));
    r = Promise.all(u);
  } else if (typeof s == "string")
    r = vh(a, s, l);
  else {
    const u = typeof s == "function" ? Wi(a, s, l.custom) : s;
    r = Promise.all(hb(a, u, l));
  }
  return r.then(() => {
    a.notify("AnimationComplete", s);
  });
}
const _C = {
  test: (a) => a === "auto",
  parse: (a) => a
}, mb = (a) => (s) => s.test(a), pb = [nl, ge, fa, za, lT, sT, _C], Fy = (a) => pb.find(mb(a));
function zC(a) {
  return typeof a == "number" ? a === 0 : a !== null ? a === "none" || a === "0" || j1(a) : !0;
}
const OC = /* @__PURE__ */ new Set(["brightness", "contrast", "saturate", "opacity"]);
function UC(a) {
  const [s, l] = a.slice(0, -1).split("(");
  if (s === "drop-shadow")
    return a;
  const [r] = l.match(qh) || [];
  if (!r)
    return a;
  const u = l.replace(r, "");
  let h = OC.has(s) ? 1 : 0;
  return r !== l && (h *= 100), s + "(" + h + u + ")";
}
const VC = /\b([a-z-]*)\(.*?\)/gu, bh = {
  ...Zn,
  getAnimatableNone: (a) => {
    const s = a.match(VC);
    return s ? s.map(UC).join(" ") : a;
  }
}, xh = {
  ...Zn,
  getAnimatableNone: (a) => {
    const s = Zn.parse(a);
    return Zn.createTransformer(a)(s.map((r) => typeof r == "number" ? 0 : typeof r == "object" ? { ...r, alpha: 1 } : r));
  }
}, Iy = {
  ...nl,
  transform: Math.round
}, LC = {
  rotate: za,
  /**
   * Internal channel for `transition.path` orientToPath. Composed onto
   * `rotate` at the transform-build sites so the user's `rotate` is
   * never read or overwritten. Not part of `transformPropOrder`.
   */
  pathRotation: za,
  rotateX: za,
  rotateY: za,
  rotateZ: za,
  scale: mc,
  scaleX: mc,
  scaleY: mc,
  scaleZ: mc,
  skew: za,
  skewX: za,
  skewY: za,
  distance: ge,
  translateX: ge,
  translateY: ge,
  translateZ: ge,
  x: ge,
  y: ge,
  z: ge,
  perspective: ge,
  transformPerspective: ge,
  opacity: xr,
  originX: Oy,
  originY: Oy,
  originZ: ge
}, Hc = {
  // Border props
  borderWidth: ge,
  borderTopWidth: ge,
  borderRightWidth: ge,
  borderBottomWidth: ge,
  borderLeftWidth: ge,
  borderRadius: ge,
  borderTopLeftRadius: ge,
  borderTopRightRadius: ge,
  borderBottomRightRadius: ge,
  borderBottomLeftRadius: ge,
  // Positioning props
  width: ge,
  maxWidth: ge,
  height: ge,
  maxHeight: ge,
  top: ge,
  right: ge,
  bottom: ge,
  left: ge,
  inset: ge,
  insetBlock: ge,
  insetBlockStart: ge,
  insetBlockEnd: ge,
  insetInline: ge,
  insetInlineStart: ge,
  insetInlineEnd: ge,
  // Spacing props
  padding: ge,
  paddingTop: ge,
  paddingRight: ge,
  paddingBottom: ge,
  paddingLeft: ge,
  paddingBlock: ge,
  paddingBlockStart: ge,
  paddingBlockEnd: ge,
  paddingInline: ge,
  paddingInlineStart: ge,
  paddingInlineEnd: ge,
  margin: ge,
  marginTop: ge,
  marginRight: ge,
  marginBottom: ge,
  marginLeft: ge,
  marginBlock: ge,
  marginBlockStart: ge,
  marginBlockEnd: ge,
  marginInline: ge,
  marginInlineStart: ge,
  marginInlineEnd: ge,
  // Typography
  fontSize: ge,
  // Misc
  backgroundPositionX: ge,
  backgroundPositionY: ge,
  ...LC,
  zIndex: Iy,
  // SVG
  fillOpacity: xr,
  strokeOpacity: xr,
  numOctaves: Iy
}, BC = {
  ...Hc,
  // Color props
  color: St,
  backgroundColor: St,
  outlineColor: St,
  fill: St,
  stroke: St,
  // Border props
  borderColor: St,
  borderTopColor: St,
  borderRightColor: St,
  borderBottomColor: St,
  borderLeftColor: St,
  filter: bh,
  WebkitFilter: bh,
  mask: xh,
  WebkitMask: xh
}, gb = (a) => BC[a], HC = /* @__PURE__ */ new Set([bh, xh]);
function yb(a, s) {
  let l = gb(a);
  return HC.has(l) || (l = Zn), l.getAnimatableNone ? l.getAnimatableNone(s) : void 0;
}
const qC = /* @__PURE__ */ new Set(["auto", "none", "0"]);
function GC(a, s, l) {
  let r = 0, u;
  for (; r < a.length && !u; ) {
    const h = a[r];
    typeof h == "string" && !qC.has(h) && el(h).values.length && (u = a[r]), r++;
  }
  if (u && l)
    for (const h of s)
      a[h] = yb(l, u);
}
class YC extends Kh {
  constructor(s, l, r, u, h) {
    super(s, l, r, u, h, !0);
  }
  readKeyframes() {
    const { unresolvedKeyframes: s, element: l, name: r } = this;
    if (!l || !l.current)
      return;
    super.readKeyframes();
    for (let x = 0; x < s.length; x++) {
      let g = s[x];
      if (typeof g == "string" && (g = g.trim(), Hh(g))) {
        const S = cb(g, l.current);
        S !== void 0 && (s[x] = S), x === s.length - 1 && (this.finalKeyframe = g);
      }
    }
    if (this.resolveNoneKeyframes(), !ub.has(r) || s.length !== 2)
      return;
    const [u, h] = s, f = Fy(u), p = Fy(h), y = zy(u), v = zy(h);
    if (y !== v && yi[r]) {
      this.needsMeasurement = !0;
      return;
    }
    if (f !== p)
      if (Yy(f) && Yy(p))
        for (let x = 0; x < s.length; x++) {
          const g = s[x];
          typeof g == "string" && (s[x] = parseFloat(g));
        }
      else yi[r] && (this.needsMeasurement = !0);
  }
  resolveNoneKeyframes() {
    const { unresolvedKeyframes: s, name: l } = this, r = [];
    for (let u = 0; u < s.length; u++)
      (s[u] === null || zC(s[u])) && r.push(u);
    r.length && GC(s, r, l);
  }
  measureInitialState() {
    const { element: s, unresolvedKeyframes: l, name: r } = this;
    if (!s || !s.current)
      return;
    r === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = yi[r](s.measureViewportBox(), window.getComputedStyle(s.current)), l[0] = this.measuredOrigin;
    const u = l[l.length - 1];
    u !== void 0 && s.getValue(r, u).jump(u, !1);
  }
  measureEndState() {
    const { element: s, name: l, unresolvedKeyframes: r } = this;
    if (!s || !s.current)
      return;
    const u = s.getValue(l);
    u && u.jump(this.measuredOrigin, !1);
    const h = r.length - 1, f = r[h];
    r[h] = yi[l](s.measureViewportBox(), window.getComputedStyle(s.current)), f !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = f), this.removedTransforms?.length && this.removedTransforms.forEach(([p, y]) => {
      s.getValue(p).set(y);
    }), this.resolveNoneKeyframes();
  }
}
const $h = [
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomRightRadius",
  "borderBottomLeftRadius"
];
function vb(a, s, l) {
  if (a == null)
    return [];
  if (a instanceof EventTarget)
    return [a];
  if (typeof a == "string") {
    let r = document;
    const u = l?.[a] ?? r.querySelectorAll(a);
    return u ? Array.from(u) : [];
  }
  return Array.from(a).filter((r) => r != null);
}
const Sh = (a, s) => s && typeof a == "number" ? s.transform(a) : a;
function jc(a) {
  return E1(a) && "offsetHeight" in a && !("ownerSVGElement" in a);
}
const { schedule: Wh } = /* @__PURE__ */ B1(queueMicrotask, !1), Xn = {
  x: !1,
  y: !1
};
function bb() {
  return Xn.x || Xn.y;
}
function XC(a) {
  return a === "x" || a === "y" ? Xn[a] ? null : (Xn[a] = !0, () => {
    Xn[a] = !1;
  }) : Xn.x || Xn.y ? null : (Xn.x = Xn.y = !0, () => {
    Xn.x = Xn.y = !1;
  });
}
function xb(a, s) {
  const l = vb(a), r = new AbortController(), u = {
    passive: !0,
    ...s,
    signal: r.signal
  };
  return [l, u, () => r.abort()];
}
function ZC(a) {
  return !(a.pointerType === "touch" || bb());
}
function KC(a, s, l = {}) {
  const [r, u, h] = xb(a, l);
  return r.forEach((f) => {
    let p = !1, y = !1, v;
    const x = () => {
      f.removeEventListener("pointerleave", j);
    }, g = (M) => {
      v && (v(M), v = void 0), x();
    }, S = (M) => {
      p = !1, window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), y && (y = !1, g(M));
    }, E = () => {
      p = !0, window.addEventListener("pointerup", S, u), window.addEventListener("pointercancel", S, u);
    }, j = (M) => {
      if (M.pointerType !== "touch") {
        if (p) {
          y = !0;
          return;
        }
        g(M);
      }
    }, V = (M) => {
      if (!ZC(M))
        return;
      y = !1;
      const q = s(f, M);
      typeof q == "function" && (v = q, f.addEventListener("pointerleave", j, u));
    };
    f.addEventListener("pointerenter", V, u), f.addEventListener("pointerdown", E, u);
  }), h;
}
const Sb = (a, s) => s ? a === s ? !0 : Sb(a, s.parentElement) : !1, em = (a) => a.pointerType === "mouse" ? typeof a.button != "number" || a.button <= 0 : a.isPrimary !== !1, QC = /* @__PURE__ */ new Set([
  "BUTTON",
  "INPUT",
  "SELECT",
  "TEXTAREA",
  "A"
]);
function FC(a) {
  return QC.has(a.tagName) || a.isContentEditable === !0;
}
const IC = /* @__PURE__ */ new Set(["INPUT", "SELECT", "TEXTAREA"]);
function PC(a) {
  return IC.has(a.tagName) || a.isContentEditable === !0;
}
const Ac = /* @__PURE__ */ new WeakSet();
function Py(a) {
  return (s) => {
    s.key === "Enter" && a(s);
  };
}
function qd(a, s) {
  a.dispatchEvent(new PointerEvent("pointer" + s, { isPrimary: !0, bubbles: !0 }));
}
const JC = (a, s) => {
  const l = a.currentTarget;
  if (!l)
    return;
  const r = Py(() => {
    if (Ac.has(l))
      return;
    qd(l, "down");
    const u = Py(() => {
      qd(l, "up");
    }), h = () => qd(l, "cancel");
    l.addEventListener("keyup", u, s), l.addEventListener("blur", h, s);
  });
  l.addEventListener("keydown", r, s), l.addEventListener("blur", () => l.removeEventListener("keydown", r), s);
};
function Jy(a) {
  return em(a) && !bb();
}
const $y = /* @__PURE__ */ new WeakSet();
function $C(a, s, l = {}) {
  const [r, u, h] = xb(a, l), f = (p) => {
    const y = p.currentTarget;
    if (!Jy(p) || $y.has(p))
      return;
    Ac.add(y), l.stopPropagation && $y.add(p);
    const v = s(y, p), x = { ...u, capture: !0 }, g = (j, V) => {
      window.removeEventListener("pointerup", S, x), window.removeEventListener("pointercancel", E, x), Ac.has(y) && Ac.delete(y), Jy(j) && typeof v == "function" && v(j, { success: V });
    }, S = (j) => {
      g(j, y === window || y === document || l.useGlobalTarget || Sb(y, j.target));
    }, E = (j) => {
      g(j, !1);
    };
    window.addEventListener("pointerup", S, x), window.addEventListener("pointercancel", E, x);
  };
  return r.forEach((p) => {
    (l.useGlobalTarget ? window : p).addEventListener("pointerdown", f, u), jc(p) && (p.addEventListener("focus", (v) => JC(v, u)), !FC(p) && !p.hasAttribute("tabindex") && (p.tabIndex = 0));
  }), h;
}
function tm(a) {
  return E1(a) && "ownerSVGElement" in a;
}
const Mc = /* @__PURE__ */ new WeakMap();
let Nc;
const wb = (a, s, l) => (r, u) => u && u[0] ? u[0][a + "Size"] : tm(r) && "getBBox" in r ? r.getBBox()[s] : r[l], WC = /* @__PURE__ */ wb("inline", "width", "offsetWidth"), eE = /* @__PURE__ */ wb("block", "height", "offsetHeight");
function tE({ target: a, borderBoxSize: s }) {
  Mc.get(a)?.forEach((l) => {
    l(a, {
      get width() {
        return WC(a, s);
      },
      get height() {
        return eE(a, s);
      }
    });
  });
}
function nE(a) {
  a.forEach(tE);
}
function aE() {
  typeof ResizeObserver > "u" || (Nc = new ResizeObserver(nE));
}
function iE(a, s) {
  Nc || aE();
  const l = vb(a);
  return l.forEach((r) => {
    let u = Mc.get(r);
    u || (u = /* @__PURE__ */ new Set(), Mc.set(r, u)), u.add(s), Nc?.observe(r);
  }), () => {
    l.forEach((r) => {
      const u = Mc.get(r);
      u?.delete(s), u?.size || Nc?.unobserve(r);
    });
  };
}
const kc = /* @__PURE__ */ new Set();
let Ps;
function sE() {
  Ps = () => {
    const a = {
      get width() {
        return window.innerWidth;
      },
      get height() {
        return window.innerHeight;
      }
    };
    kc.forEach((s) => s(a));
  }, window.addEventListener("resize", Ps);
}
function lE(a) {
  return kc.add(a), Ps || sE(), () => {
    kc.delete(a), !kc.size && typeof Ps == "function" && (window.removeEventListener("resize", Ps), Ps = void 0);
  };
}
function Wy(a, s) {
  return typeof a == "function" ? lE(a) : iE(a, s);
}
function rE(a) {
  return tm(a) && a.tagName === "svg";
}
function oE(...a) {
  const s = !Array.isArray(a[0]), l = s ? 0 : -1, r = a[0 + l], u = a[1 + l], h = a[2 + l], f = a[3 + l], p = P1(u, h, f);
  return s ? p(r) : p;
}
function cE(a, s, l = {}) {
  const r = a.get();
  let u = null, h = r, f;
  const p = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, y = () => {
    u && (u.stop(), u = null), a.animation = void 0;
  }, v = () => {
    const g = ev(a.get()), S = ev(h);
    if (g === S) {
      y();
      return;
    }
    const E = u ? u.getGeneratorVelocity() : a.getVelocity();
    y(), u = new Sr({
      keyframes: [g, S],
      velocity: E,
      // Default to spring if no type specified (matches useSpring behavior)
      type: "spring",
      restDelta: 1e-3,
      restSpeed: 0.01,
      ...l,
      onUpdate: f
    });
  }, x = () => {
    v(), a.animation = u ?? void 0, a.events.animationStart?.notify(), u?.then(() => {
      a.animation = void 0, a.events.animationComplete?.notify();
    });
  };
  if (a.attach((g, S) => {
    h = g, f = (E) => S(Gd(E, p)), Ie.postRender(x);
  }, y), At(s)) {
    let g = l.skipInitialAnimation === !0;
    const S = s.on("change", (j) => {
      g ? (g = !1, a.jump(Gd(j, p), !1)) : a.set(Gd(j, p));
    }), E = a.on("destroy", S);
    return () => {
      S(), E();
    };
  }
  return y;
}
function Gd(a, s) {
  return s ? a + s : a;
}
function ev(a) {
  return typeof a == "number" ? a : parseFloat(a);
}
const uE = [...pb, St, Zn], fE = (a) => uE.find(mb(a)), tv = () => ({
  translate: 0,
  scale: 1,
  origin: 0,
  originPoint: 0
}), Js = () => ({
  x: tv(),
  y: tv()
}), nv = () => ({ min: 0, max: 0 }), jt = () => ({
  x: nv(),
  y: nv()
}), dE = /* @__PURE__ */ new WeakMap();
function $c(a) {
  return a !== null && typeof a == "object" && typeof a.start == "function";
}
function wr(a) {
  return typeof a == "string" || Array.isArray(a);
}
const nm = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whileTap",
  "whileDrag",
  "exit"
], am = ["initial", ...nm];
function Wc(a) {
  return $c(a.animate) || am.some((s) => wr(a[s]));
}
function Tb(a) {
  return !!(Wc(a) || a.variants);
}
function hE(a, s, l) {
  for (const r in s) {
    const u = s[r], h = l[r];
    if (At(u))
      a.addValue(r, u);
    else if (At(h))
      a.addValue(r, es(u, { owner: a }));
    else if (h !== u)
      if (a.hasValue(r)) {
        const f = a.getValue(r);
        f.liveStyle === !0 ? f.jump(u) : f.hasAnimated || f.set(u);
      } else {
        const f = a.getStaticValue(r);
        a.addValue(r, es(f !== void 0 ? f : u, { owner: a }));
      }
  }
  for (const r in l)
    s[r] === void 0 && a.removeValue(r);
  return s;
}
const qc = { current: null }, im = { current: !1 }, mE = typeof window < "u";
function Cb() {
  if (im.current = !0, !!mE)
    if (window.matchMedia) {
      const a = window.matchMedia("(prefers-reduced-motion)"), s = () => qc.current = a.matches;
      a.addEventListener("change", s), s();
    } else
      qc.current = !1;
}
const av = [
  "AnimationStart",
  "AnimationComplete",
  "Update",
  "BeforeLayoutMeasure",
  "LayoutMeasure",
  "LayoutAnimationStart",
  "LayoutAnimationComplete"
];
let Gc = {};
function Eb(a) {
  Gc = a;
}
function pE() {
  return Gc;
}
class gE {
  /**
   * This method takes React props and returns found MotionValues. For example, HTML
   * MotionValues will be found within the style prop, whereas for Three.js within attribute arrays.
   *
   * This isn't an abstract method as it needs calling in the constructor, but it is
   * intended to be one.
   */
  scrapeMotionValuesFromProps(s, l, r) {
    return {};
  }
  constructor({ parent: s, props: l, presenceContext: r, reducedMotionConfig: u, skipAnimations: h, blockInitialAnimation: f, visualState: p }, y = {}) {
    this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = Kh, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
      this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
    }, this.renderScheduledAt = 0, this.scheduleRender = () => {
      const E = tn.now();
      this.renderScheduledAt < E && (this.renderScheduledAt = E, Ie.render(this.render, !1, !0));
    };
    const { latestValues: v, renderState: x } = p;
    this.latestValues = v, this.baseTarget = { ...v }, this.initialValues = l.initial ? { ...v } : {}, this.renderState = x, this.parent = s, this.props = l, this.presenceContext = r, this.depth = s ? s.depth + 1 : 0, this.reducedMotionConfig = u, this.skipAnimationsConfig = h, this.options = y, this.blockInitialAnimation = !!f, this.isControllingVariants = Wc(l), this.isVariantNode = Tb(l), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(s && s.current);
    const { willChange: g, ...S } = this.scrapeMotionValuesFromProps(l, {}, this);
    for (const E in S) {
      const j = S[E];
      v[E] !== void 0 && At(j) && j.set(v[E]);
    }
  }
  mount(s) {
    if (this.hasBeenMounted)
      for (const l in this.initialValues)
        this.values.get(l)?.jump(this.initialValues[l]), this.latestValues[l] = this.initialValues[l];
    this.current = s, dE.set(s, this), this.projection && !this.projection.instance && this.projection.mount(s), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((l, r) => this.bindToMotionValue(r, l)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (im.current || Cb(), this.shouldReduceMotion = qc.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
  }
  unmount() {
    this.projection && this.projection.unmount(), Oa(this.notifyUpdate), Oa(this.render), this.valueSubscriptions.forEach((s) => s()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
    for (const s in this.events)
      this.events[s].clear();
    for (const s in this.features) {
      const l = this.features[s];
      l && (l.unmount(), l.isMounted = !1);
    }
    this.current = null;
  }
  addChild(s) {
    this.children.add(s), this.enteringChildren ?? (this.enteringChildren = /* @__PURE__ */ new Set()), this.enteringChildren.add(s);
  }
  removeChild(s) {
    this.children.delete(s), this.enteringChildren && this.enteringChildren.delete(s);
  }
  bindToMotionValue(s, l) {
    if (this.valueSubscriptions.has(s) && this.valueSubscriptions.get(s)(), l.accelerate && rb.has(s) && this.current instanceof HTMLElement) {
      const { factory: f, keyframes: p, times: y, ease: v, duration: x } = l.accelerate, g = new sb({
        element: this.current,
        name: s,
        keyframes: p,
        times: y,
        ease: v,
        duration: /* @__PURE__ */ wn(x)
      }), S = f(g);
      this.valueSubscriptions.set(s, () => {
        S(), g.cancel();
      });
      return;
    }
    const r = il.has(s);
    r && this.onBindTransform && this.onBindTransform();
    const u = l.on("change", (f) => {
      this.latestValues[s] = f, this.props.onUpdate && Ie.preRender(this.notifyUpdate), r && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
    });
    let h;
    typeof window < "u" && window.MotionCheckAppearSync && (h = window.MotionCheckAppearSync(this, s, l)), this.valueSubscriptions.set(s, () => {
      u(), h && h();
    });
  }
  sortNodePosition(s) {
    return !this.current || !this.sortInstanceNodePosition || this.type !== s.type ? 0 : this.sortInstanceNodePosition(this.current, s.current);
  }
  updateFeatures() {
    let s = "animation";
    for (s in Gc) {
      const l = Gc[s];
      if (!l)
        continue;
      const { isEnabled: r, Feature: u } = l;
      if (!this.features[s] && u && r(this.props) && (this.features[s] = new u(this)), this.features[s]) {
        const h = this.features[s];
        h.isMounted ? h.update() : (h.mount(), h.isMounted = !0);
      }
    }
  }
  triggerBuild() {
    this.build(this.renderState, this.latestValues, this.props);
  }
  /**
   * Measure the current viewport box with or without transforms.
   * Only measures axis-aligned boxes, rotate and skew must be manually
   * removed with a re-render to work.
   */
  measureViewportBox() {
    return this.current ? this.measureInstanceViewportBox(this.current, this.props) : jt();
  }
  getStaticValue(s) {
    return this.latestValues[s];
  }
  setStaticValue(s, l) {
    this.latestValues[s] = l;
  }
  /**
   * Update the provided props. Ensure any newly-added motion values are
   * added to our map, old ones removed, and listeners updated.
   */
  update(s, l) {
    (s.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = s, this.prevPresenceContext = this.presenceContext, this.presenceContext = l;
    for (let r = 0; r < av.length; r++) {
      const u = av[r];
      this.propEventSubscriptions[u] && (this.propEventSubscriptions[u](), delete this.propEventSubscriptions[u]);
      const h = "on" + u, f = s[h];
      f && (this.propEventSubscriptions[u] = this.on(u, f));
    }
    this.prevMotionValues = hE(this, this.scrapeMotionValuesFromProps(s, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
  }
  getProps() {
    return this.props;
  }
  /**
   * Returns the variant definition with a given name.
   */
  getVariant(s) {
    return this.props.variants ? this.props.variants[s] : void 0;
  }
  /**
   * Returns the defined default transition on this component.
   */
  getDefaultTransition() {
    return this.props.transition;
  }
  getTransformPagePoint() {
    return this.props.transformPagePoint;
  }
  getClosestVariantNode() {
    return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
  }
  /**
   * Add a child visual element to our set of children.
   */
  addVariantChild(s) {
    const l = this.getClosestVariantNode();
    if (l)
      return l.variantChildren && l.variantChildren.add(s), () => l.variantChildren.delete(s);
  }
  /**
   * Add a motion value and bind it to this visual element.
   */
  addValue(s, l) {
    const r = this.values.get(s);
    l !== r && (r && this.removeValue(s), this.bindToMotionValue(s, l), this.values.set(s, l), this.latestValues[s] = l.get());
  }
  /**
   * Remove a motion value and unbind any active subscriptions.
   */
  removeValue(s) {
    this.values.delete(s);
    const l = this.valueSubscriptions.get(s);
    l && (l(), this.valueSubscriptions.delete(s)), delete this.latestValues[s], this.removeValueFromRenderState(s, this.renderState);
  }
  /**
   * Check whether we have a motion value for this key
   */
  hasValue(s) {
    return this.values.has(s);
  }
  getValue(s, l) {
    if (this.props.values && this.props.values[s])
      return this.props.values[s];
    let r = this.values.get(s);
    return r === void 0 && l !== void 0 && (r = es(l === null ? void 0 : l, { owner: this }), this.addValue(s, r)), r;
  }
  /**
   * If we're trying to animate to a previously unencountered value,
   * we need to check for it in our state and as a last resort read it
   * directly from the instance (which might have performance implications).
   */
  readValue(s, l) {
    let r = this.latestValues[s] !== void 0 || !this.current ? this.latestValues[s] : this.getBaseTargetFromProps(this.props, s) ?? this.readValueFromInstance(this.current, s, this.options);
    return r != null && (typeof r == "string" && (C1(r) || j1(r)) ? r = parseFloat(r) : !fE(r) && Zn.test(l) && (r = yb(s, l)), this.setBaseTarget(s, At(r) ? r.get() : r)), At(r) ? r.get() : r;
  }
  /**
   * Set the base target to later animate back to. This is currently
   * only hydrated on creation and when we first read a value.
   */
  setBaseTarget(s, l) {
    this.baseTarget[s] = l;
  }
  /**
   * Find the base target for a value thats been removed from all animation
   * props.
   */
  getBaseTarget(s) {
    const { initial: l } = this.props;
    let r;
    if (typeof l == "string" || typeof l == "object") {
      const h = Ph(this.props, l, this.presenceContext?.custom);
      h && (r = h[s]);
    }
    if (l && r !== void 0)
      return r;
    const u = this.getBaseTargetFromProps(this.props, s);
    return u !== void 0 && !At(u) ? u : this.initialValues[s] !== void 0 && r === void 0 ? void 0 : this.baseTarget[s];
  }
  on(s, l) {
    return this.events[s] || (this.events[s] = new Vh()), this.events[s].add(l);
  }
  notify(s, ...l) {
    this.events[s] && this.events[s].notify(...l);
  }
  scheduleRenderMicrotask() {
    Wh.render(this.render);
  }
}
class jb extends gE {
  constructor() {
    super(...arguments), this.KeyframeResolver = YC;
  }
  sortInstanceNodePosition(s, l) {
    return s.compareDocumentPosition(l) & 2 ? 1 : -1;
  }
  getBaseTargetFromProps(s, l) {
    const r = s.style;
    return r ? r[l] : void 0;
  }
  removeValueFromRenderState(s, { vars: l, style: r }) {
    delete l[s], delete r[s];
  }
  handleChildMotionValue() {
    this.childSubscription && (this.childSubscription(), delete this.childSubscription);
    const { children: s } = this.props;
    At(s) && (this.childSubscription = s.on("change", (l) => {
      this.current && (this.current.textContent = `${l}`);
    }));
  }
}
class xi {
  constructor(s) {
    this.isMounted = !1, this.node = s;
  }
  update() {
  }
}
function Ab({ top: a, left: s, right: l, bottom: r }) {
  return {
    x: { min: s, max: l },
    y: { min: a, max: r }
  };
}
function yE({ x: a, y: s }) {
  return { top: s.min, right: a.max, bottom: s.max, left: a.min };
}
function vE(a, s) {
  if (!s)
    return a;
  const l = s({ x: a.left, y: a.top }), r = s({ x: a.right, y: a.bottom });
  return {
    top: l.y,
    left: l.x,
    bottom: r.y,
    right: r.x
  };
}
function Yd(a) {
  return a === void 0 || a === 1;
}
function wh({ scale: a, scaleX: s, scaleY: l }) {
  return !Yd(a) || !Yd(s) || !Yd(l);
}
function Fi(a) {
  return wh(a) || Mb(a) || a.z || a.rotate || a.rotateX || a.rotateY || a.skewX || a.skewY;
}
function Mb(a) {
  return iv(a.x) || iv(a.y);
}
function iv(a) {
  return a && a !== "0%";
}
function Yc(a, s, l) {
  const r = a - l, u = s * r;
  return l + u;
}
function sv(a, s, l, r, u) {
  return u !== void 0 && (a = Yc(a, u, r)), Yc(a, l, r) + s;
}
function Th(a, s = 0, l = 1, r, u) {
  a.min = sv(a.min, s, l, r, u), a.max = sv(a.max, s, l, r, u);
}
function Nb(a, { x: s, y: l }) {
  Th(a.x, s.translate, s.scale, s.originPoint), Th(a.y, l.translate, l.scale, l.originPoint);
}
const lv = 0.999999999999, rv = 1.0000000000001;
function bE(a, s, l, r = !1) {
  const u = l.length;
  if (!u)
    return;
  s.x = s.y = 1;
  let h, f;
  for (let p = 0; p < u; p++) {
    h = l[p], f = h.projectionDelta;
    const { visualElement: y } = h.options;
    y && y.props.style && y.props.style.display === "contents" || (r && h.options.layoutScroll && h.scroll && h !== h.root && (ca(a.x, -h.scroll.offset.x), ca(a.y, -h.scroll.offset.y)), f && (s.x *= f.x.scale, s.y *= f.y.scale, Nb(a, f)), r && Fi(h.latestValues) && Dc(a, h.latestValues, h.layout?.layoutBox));
  }
  s.x < rv && s.x > lv && (s.x = 1), s.y < rv && s.y > lv && (s.y = 1);
}
function ca(a, s) {
  a.min += s, a.max += s;
}
function ov(a, s, l, r, u = 0.5) {
  const h = nt(a.min, a.max, u);
  Th(a, s, l, h, r);
}
function cv(a, s) {
  return typeof a == "string" ? parseFloat(a) / 100 * (s.max - s.min) : a;
}
function Dc(a, s, l) {
  const r = l ?? a;
  ov(a.x, cv(s.x, r.x), s.scaleX, s.scale, s.originX), ov(a.y, cv(s.y, r.y), s.scaleY, s.scale, s.originY);
}
function kb(a, s) {
  return Ab(vE(a.getBoundingClientRect(), s));
}
function xE(a, s, l) {
  const r = kb(a, l), { scroll: u } = s;
  return u && (ca(r.x, u.offset.x), ca(r.y, u.offset.y)), r;
}
const SE = {
  x: "translateX",
  y: "translateY",
  z: "translateZ",
  transformPerspective: "perspective"
}, wE = al.length;
function TE(a, s, l) {
  let r = "", u = !0;
  for (let f = 0; f < wE; f++) {
    const p = al[f], y = a[p];
    if (y === void 0)
      continue;
    let v = !0;
    if (typeof y == "number")
      v = y === (p.startsWith("scale") ? 1 : 0);
    else {
      const x = parseFloat(y);
      v = p.startsWith("scale") ? x === 1 : x === 0;
    }
    if (!v || l) {
      const x = Sh(y, Hc[p]);
      if (!v) {
        u = !1;
        const g = SE[p] || p;
        r += `${g}(${x}) `;
      }
      l && (s[p] = x);
    }
  }
  const h = a.pathRotation;
  return h && (u = !1, r += `rotate(${Sh(h, Hc.pathRotation)}) `), r = r.trim(), l ? r = l(s, u ? "" : r) : u && (r = "none"), r;
}
function sm(a, s, l) {
  const { style: r, vars: u, transformOrigin: h } = a;
  let f = !1, p = !1;
  for (const y in s) {
    const v = s[y];
    if (il.has(y)) {
      f = !0;
      continue;
    } else if (q1(y)) {
      u[y] = v;
      continue;
    } else {
      const x = Sh(v, Hc[y]);
      y.startsWith("origin") ? (p = !0, h[y] = x) : r[y] = x;
    }
  }
  if (s.transform || (f || l ? r.transform = TE(s, a.transform, l) : r.transform && (r.transform = "none")), p) {
    const { originX: y = "50%", originY: v = "50%", originZ: x = 0 } = h;
    r.transformOrigin = `${y} ${v} ${x}`;
  }
}
function Db(a, { style: s, vars: l }, r, u) {
  const h = a.style;
  let f;
  for (f in s)
    h[f] = s[f];
  u?.applyProjectionStyles(h, r);
  for (f in l)
    h.setProperty(f, l[f]);
}
function uv(a, s) {
  return s.max === s.min ? 0 : a / (s.max - s.min) * 100;
}
const ar = {
  correct: (a, s) => {
    if (!s.target)
      return a;
    if (typeof a == "string")
      if (ge.test(a))
        a = parseFloat(a);
      else
        return a;
    const l = uv(a, s.target.x), r = uv(a, s.target.y);
    return `${l}% ${r}%`;
  }
}, CE = {
  correct: (a, { treeScale: s, projectionDelta: l }) => {
    const r = a, u = Zn.parse(a);
    if (u.length > 5)
      return r;
    const h = Zn.createTransformer(a), f = typeof u[0] != "number" ? 1 : 0, p = l.x.scale * s.x, y = l.y.scale * s.y;
    u[0 + f] /= p, u[1 + f] /= y;
    const v = nt(p, y, 0.5);
    return typeof u[2 + f] == "number" && (u[2 + f] /= v), typeof u[3 + f] == "number" && (u[3 + f] /= v), h(u);
  }
}, Ch = {
  borderRadius: {
    ...ar,
    applyTo: [...$h]
  },
  borderTopLeftRadius: ar,
  borderTopRightRadius: ar,
  borderBottomLeftRadius: ar,
  borderBottomRightRadius: ar,
  boxShadow: CE
};
function Rb(a, { layout: s, layoutId: l }) {
  return il.has(a) || a.startsWith("origin") || (s || l !== void 0) && (!!Ch[a] || a === "opacity");
}
function lm(a, s, l) {
  const r = a.style, u = s?.style, h = {};
  if (!r)
    return h;
  for (const f in r)
    (At(r[f]) || u && At(u[f]) || Rb(f, a) || l?.getValue(f)?.liveStyle !== void 0) && (h[f] = r[f]);
  return h;
}
function EE(a) {
  return window.getComputedStyle(a);
}
class jE extends jb {
  constructor() {
    super(...arguments), this.type = "html", this.renderInstance = Db;
  }
  mount(s) {
    Pc(!!s.style), super.mount(s);
  }
  readValueFromInstance(s, l) {
    if (il.has(l))
      return this.projection?.isProjecting ? uh(l) : ZT(s, l);
    {
      const r = EE(s), u = (q1(l) ? r.getPropertyValue(l) : r[l]) || 0;
      return typeof u == "string" ? u.trim() : u;
    }
  }
  measureInstanceViewportBox(s, { transformPagePoint: l }) {
    return kb(s, l);
  }
  build(s, l, r) {
    sm(s, l, r.transformTemplate);
  }
  scrapeMotionValuesFromProps(s, l, r) {
    return lm(s, l, r);
  }
}
const AE = {
  offset: "stroke-dashoffset",
  array: "stroke-dasharray"
}, ME = {
  offset: "strokeDashoffset",
  array: "strokeDasharray"
};
function NE(a, s, l = 1, r = 0, u = !0) {
  a.pathLength = 1;
  const h = u ? AE : ME;
  a[h.offset] = `${-r}`, a[h.array] = `${s} ${l}`;
}
const kE = [
  "offsetDistance",
  "offsetPath",
  "offsetRotate",
  "offsetAnchor"
];
function _b(a, {
  attrX: s,
  attrY: l,
  attrScale: r,
  pathLength: u,
  pathSpacing: h = 1,
  pathOffset: f = 0,
  // This is object creation, which we try to avoid per-frame.
  ...p
}, y, v, x) {
  if (sm(a, p, v), y) {
    a.style.viewBox && (a.attrs.viewBox = a.style.viewBox);
    return;
  }
  a.attrs = a.style, a.style = {};
  const { attrs: g, style: S } = a;
  g.transform && (S.transform = g.transform, delete g.transform), (S.transform || g.transformOrigin) && (S.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), S.transform && (S.transformBox = x?.transformBox ?? "fill-box", delete g.transformBox);
  for (const E of kE)
    g[E] !== void 0 && (S[E] = g[E], delete g[E]);
  s !== void 0 && (g.x = s), l !== void 0 && (g.y = l), r !== void 0 && (g.scale = r), u !== void 0 && NE(g, u, h, f, !1);
}
const zb = /* @__PURE__ */ new Set([
  "baseFrequency",
  "diffuseConstant",
  "kernelMatrix",
  "kernelUnitLength",
  "keySplines",
  "keyTimes",
  "limitingConeAngle",
  "markerHeight",
  "markerWidth",
  "numOctaves",
  "targetX",
  "targetY",
  "surfaceScale",
  "specularConstant",
  "specularExponent",
  "stdDeviation",
  "tableValues",
  "viewBox",
  "gradientTransform",
  "pathLength",
  "startOffset",
  "textLength",
  "lengthAdjust"
]), Ob = (a) => typeof a == "string" && a.toLowerCase() === "svg";
function DE(a, s, l, r) {
  Db(a, s, void 0, r);
  for (const u in s.attrs)
    a.setAttribute(zb.has(u) ? u : Jh(u), s.attrs[u]);
}
function Ub(a, s, l) {
  const r = lm(a, s, l);
  for (const u in a)
    if (At(a[u]) || At(s[u])) {
      const h = al.indexOf(u) !== -1 ? "attr" + u.charAt(0).toUpperCase() + u.substring(1) : u;
      r[h] = a[u];
    }
  return r;
}
class RE extends jb {
  constructor() {
    super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = jt;
  }
  getBaseTargetFromProps(s, l) {
    return s[l];
  }
  readValueFromInstance(s, l) {
    if (il.has(l)) {
      const r = gb(l);
      return r && r.default || 0;
    }
    return l = zb.has(l) ? l : Jh(l), s.getAttribute(l);
  }
  scrapeMotionValuesFromProps(s, l, r) {
    return Ub(s, l, r);
  }
  build(s, l, r) {
    _b(s, l, this.isSVGTag, r.transformTemplate, r.style);
  }
  renderInstance(s, l, r, u) {
    DE(s, l, r, u);
  }
  mount(s) {
    this.isSVGTag = Ob(s.tagName), super.mount(s);
  }
}
const _E = am.length;
function Vb(a) {
  if (!a)
    return;
  if (!a.isControllingVariants) {
    const l = a.parent ? Vb(a.parent) || {} : {};
    return a.props.initial !== void 0 && (l.initial = a.props.initial), l;
  }
  const s = {};
  for (let l = 0; l < _E; l++) {
    const r = am[l], u = a.props[r];
    (wr(u) || u === !1) && (s[r] = u);
  }
  return s;
}
function Lb(a, s) {
  if (!Array.isArray(s))
    return !1;
  const l = s.length;
  if (l !== a.length)
    return !1;
  for (let r = 0; r < l; r++)
    if (s[r] !== a[r])
      return !1;
  return !0;
}
const zE = [...nm].reverse(), OE = nm.length;
function UE(a) {
  return (s) => Promise.all(s.map(({ animation: l, options: r }) => RC(a, l, r)));
}
function VE(a) {
  let s = UE(a), l = fv(), r = !0, u = !1;
  const h = (v) => (x, g) => {
    const S = Wi(a, g, v === "exit" ? a.presenceContext?.custom : void 0);
    if (S) {
      const { transition: E, transitionEnd: j, ...V } = S;
      x = { ...x, ...V, ...j };
    }
    return x;
  };
  function f(v) {
    s = v(a);
  }
  function p(v) {
    const { props: x } = a, g = Vb(a.parent) || {}, S = [], E = /* @__PURE__ */ new Set();
    let j = {}, V = 1 / 0;
    for (let q = 0; q < OE; q++) {
      const L = zE[q], K = l[L], X = x[L] !== void 0 ? x[L] : g[L], ee = wr(X), oe = L === v ? K.isActive : null;
      oe === !1 && (V = q);
      let Q = X === g[L] && X !== x[L] && ee;
      if (Q && (r || u) && a.manuallyAnimateOnMount && (Q = !1), K.protectedKeys = { ...j }, // If it isn't active and hasn't *just* been set as inactive
      !K.isActive && oe === null || // If we didn't and don't have any defined prop for this animation type
      !X && !K.prevProp || // Or if the prop doesn't define an animation
      $c(X) || typeof X == "boolean")
        continue;
      if (L === "exit" && K.isActive && oe !== !0) {
        K.prevResolvedValues && (j = {
          ...j,
          ...K.prevResolvedValues
        });
        continue;
      }
      const D = LE(K.prevProp, X);
      let W = D || // If we're making this variant active, we want to always make it active
      L === v && K.isActive && !Q && ee || // If we removed a higher-priority variant (i is in reverse order)
      q > V && ee, te = !1;
      const Ae = Array.isArray(X) ? X : [X];
      let Ce = Ae.reduce(h(L), {});
      oe === !1 && (Ce = {});
      const { prevResolvedValues: Te = {} } = K, Ee = {
        ...Te,
        ...Ce
      }, ce = (ne) => {
        W = !0, E.has(ne) && (te = !0, E.delete(ne)), K.needsAnimating[ne] = !0;
        const he = a.getValue(ne);
        he && (he.liveStyle = !1);
      };
      for (const ne in Ee) {
        const he = Ce[ne], P = Te[ne];
        if (j.hasOwnProperty(ne))
          continue;
        let Ye = !1;
        gh(he) && gh(P) ? Ye = !Lb(he, P) || D : Ye = he !== P, Ye ? he != null ? ce(ne) : E.add(ne) : he !== void 0 && E.has(ne) ? ce(ne) : K.protectedKeys[ne] = !0;
      }
      K.prevProp = X, K.prevResolvedValues = Ce, K.isActive && (j = { ...j, ...Ce }), (r || u) && a.blockInitialAnimation && (W = !1);
      const Z = Q && D;
      W && (!Z || te) && S.push(...Ae.map((ne) => {
        const he = { type: L };
        if (typeof ne == "string" && (r || u) && !Z && a.manuallyAnimateOnMount && a.parent) {
          const { parent: P } = a, Ye = Wi(P, ne);
          if (P.enteringChildren && Ye) {
            const { delayChildren: ut } = Ye.transition || {};
            he.delay = ob(P.enteringChildren, a, ut);
          }
        }
        return {
          animation: ne,
          options: he
        };
      }));
    }
    if (E.size) {
      const q = {};
      if (typeof x.initial != "boolean") {
        const L = Wi(a, Array.isArray(x.initial) ? x.initial[0] : x.initial);
        L && L.transition && (q.transition = L.transition);
      }
      E.forEach((L) => {
        const K = a.getBaseTarget(L), X = a.getValue(L);
        X && (X.liveStyle = !0), q[L] = K ?? null;
      }), S.push({ animation: q });
    }
    let M = !!S.length;
    return r && (x.initial === !1 || x.initial === x.animate) && !a.manuallyAnimateOnMount && (M = !1), r = !1, u = !1, M ? s(S) : Promise.resolve();
  }
  function y(v, x) {
    if (l[v].isActive === x)
      return Promise.resolve();
    a.variantChildren?.forEach((S) => S.animationState?.setActive(v, x)), l[v].isActive = x;
    const g = p(v);
    for (const S in l)
      l[S].protectedKeys = {};
    return g;
  }
  return {
    animateChanges: p,
    setActive: y,
    setAnimateFunction: f,
    getState: () => l,
    reset: () => {
      l = fv(), u = !0;
    }
  };
}
function LE(a, s) {
  return typeof s == "string" ? s !== a : Array.isArray(s) ? !Lb(s, a) : !1;
}
function Zi(a = !1) {
  return {
    isActive: a,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function fv() {
  return {
    animate: Zi(!0),
    whileInView: Zi(),
    whileHover: Zi(),
    whileTap: Zi(),
    whileDrag: Zi(),
    whileFocus: Zi(),
    exit: Zi()
  };
}
function Eh(a, s) {
  a.min = s.min, a.max = s.max;
}
function Yn(a, s) {
  Eh(a.x, s.x), Eh(a.y, s.y);
}
function dv(a, s) {
  a.translate = s.translate, a.scale = s.scale, a.originPoint = s.originPoint, a.origin = s.origin;
}
const Bb = 1e-4, BE = 1 - Bb, HE = 1 + Bb, Hb = 0.01, qE = 0 - Hb, GE = 0 + Hb;
function nn(a) {
  return a.max - a.min;
}
function YE(a, s, l) {
  return Math.abs(a - s) <= l;
}
function hv(a, s, l, r = 0.5) {
  a.origin = r, a.originPoint = nt(s.min, s.max, a.origin), a.scale = nn(l) / nn(s), a.translate = nt(l.min, l.max, a.origin) - a.originPoint, (a.scale >= BE && a.scale <= HE || isNaN(a.scale)) && (a.scale = 1), (a.translate >= qE && a.translate <= GE || isNaN(a.translate)) && (a.translate = 0);
}
function hr(a, s, l, r) {
  hv(a.x, s.x, l.x, r ? r.originX : void 0), hv(a.y, s.y, l.y, r ? r.originY : void 0);
}
function mv(a, s, l, r = 0) {
  const u = r ? nt(l.min, l.max, r) : l.min;
  a.min = u + s.min, a.max = a.min + nn(s);
}
function XE(a, s, l, r) {
  mv(a.x, s.x, l.x, r?.x), mv(a.y, s.y, l.y, r?.y);
}
function pv(a, s, l, r = 0) {
  const u = r ? nt(l.min, l.max, r) : l.min;
  a.min = s.min - u, a.max = a.min + nn(s);
}
function Xc(a, s, l, r) {
  pv(a.x, s.x, l.x, r?.x), pv(a.y, s.y, l.y, r?.y);
}
function gv(a, s, l, r, u) {
  return a -= s, a = Yc(a, 1 / l, r), u !== void 0 && (a = Yc(a, 1 / u, r)), a;
}
function ZE(a, s = 0, l = 1, r = 0.5, u, h = a, f = a) {
  if (fa.test(s) && (s = parseFloat(s), s = nt(f.min, f.max, s / 100) - f.min), typeof s != "number")
    return;
  let p = nt(h.min, h.max, r);
  a === h && (p -= s), a.min = gv(a.min, s, l, p, u), a.max = gv(a.max, s, l, p, u);
}
function yv(a, s, [l, r, u], h, f) {
  ZE(a, s[l], s[r], s[u], s.scale, h, f);
}
const KE = ["x", "scaleX", "originX"], QE = ["y", "scaleY", "originY"];
function vv(a, s, l, r) {
  yv(a.x, s, KE, l ? l.x : void 0, r ? r.x : void 0), yv(a.y, s, QE, l ? l.y : void 0, r ? r.y : void 0);
}
function bv(a) {
  return a.translate === 0 && a.scale === 1;
}
function qb(a) {
  return bv(a.x) && bv(a.y);
}
function xv(a, s) {
  return a.min === s.min && a.max === s.max;
}
function FE(a, s) {
  return xv(a.x, s.x) && xv(a.y, s.y);
}
function Sv(a, s) {
  return Math.round(a.min) === Math.round(s.min) && Math.round(a.max) === Math.round(s.max);
}
function Gb(a, s) {
  return Sv(a.x, s.x) && Sv(a.y, s.y);
}
function wv(a) {
  return nn(a.x) / nn(a.y);
}
function Tv(a, s) {
  return a.translate === s.translate && a.scale === s.scale && a.originPoint === s.originPoint;
}
function oa(a) {
  return [a("x"), a("y")];
}
function IE(a, s, l) {
  let r = "";
  const u = a.x.translate / s.x, h = a.y.translate / s.y, f = l?.z || 0;
  if ((u || h || f) && (r = `translate3d(${u}px, ${h}px, ${f}px) `), (s.x !== 1 || s.y !== 1) && (r += `scale(${1 / s.x}, ${1 / s.y}) `), l) {
    const { transformPerspective: v, rotate: x, pathRotation: g, rotateX: S, rotateY: E, skewX: j, skewY: V } = l;
    v && (r = `perspective(${v}px) ${r}`), x && (r += `rotate(${x}deg) `), g && (r += `rotate(${g}deg) `), S && (r += `rotateX(${S}deg) `), E && (r += `rotateY(${E}deg) `), j && (r += `skewX(${j}deg) `), V && (r += `skewY(${V}deg) `);
  }
  const p = a.x.scale * s.x, y = a.y.scale * s.y;
  return (p !== 1 || y !== 1) && (r += `scale(${p}, ${y})`), r || "none";
}
const PE = $h.length, Cv = (a) => typeof a == "string" ? parseFloat(a) : a, Ev = (a) => typeof a == "number" || ge.test(a);
function JE(a, s, l, r, u, h) {
  u ? (a.opacity = nt(0, l.opacity ?? 1, $E(r)), a.opacityExit = nt(s.opacity ?? 1, 0, WE(r))) : h && (a.opacity = nt(s.opacity ?? 1, l.opacity ?? 1, r));
  for (let f = 0; f < PE; f++) {
    const p = $h[f];
    let y = jv(s, p), v = jv(l, p);
    if (y === void 0 && v === void 0)
      continue;
    y || (y = 0), v || (v = 0), y === 0 || v === 0 || Ev(y) === Ev(v) ? (a[p] = Math.max(nt(Cv(y), Cv(v), r), 0), (fa.test(v) || fa.test(y)) && (a[p] += "%")) : a[p] = v;
  }
  (s.rotate || l.rotate) && (a.rotate = nt(s.rotate || 0, l.rotate || 0, r));
}
function jv(a, s) {
  return a[s] !== void 0 ? a[s] : a.borderRadius;
}
const $E = /* @__PURE__ */ Yb(0, 0.5, O1), WE = /* @__PURE__ */ Yb(0.5, 0.95, On);
function Yb(a, s, l) {
  return (r) => r < a ? 0 : r > s ? 1 : l(/* @__PURE__ */ br(a, s, r));
}
function e3(a, s, l) {
  const r = At(a) ? a : es(a);
  return r.start(Ih("", r, s, l)), r.animation;
}
function Tr(a, s, l, r = { passive: !0 }) {
  return a.addEventListener(s, l, r), () => a.removeEventListener(s, l, r);
}
const t3 = (a, s) => a.depth - s.depth;
class n3 {
  constructor() {
    this.children = [], this.isDirty = !1;
  }
  add(s) {
    Uh(this.children, s), this.isDirty = !0;
  }
  remove(s) {
    Uc(this.children, s), this.isDirty = !0;
  }
  forEach(s) {
    this.isDirty && this.children.sort(t3), this.isDirty = !1, this.children.forEach(s);
  }
}
function a3(a, s) {
  const l = tn.now(), r = ({ timestamp: u }) => {
    const h = u - l;
    h >= s && (Oa(r), a(h - s));
  };
  return Ie.setup(r, !0), () => Oa(r);
}
function Rc(a) {
  return At(a) ? a.get() : a;
}
class i3 {
  constructor() {
    this.members = [];
  }
  add(s) {
    Uh(this.members, s);
    for (let l = this.members.length - 1; l >= 0; l--) {
      const r = this.members[l];
      if (r === s || r === this.lead || r === this.prevLead)
        continue;
      const u = r.instance;
      (!u || u.isConnected === !1) && !r.snapshot && (Uc(this.members, r), r.unmount());
    }
    s.scheduleRender();
  }
  remove(s) {
    if (Uc(this.members, s), s === this.prevLead && (this.prevLead = void 0), s === this.lead) {
      const l = this.members[this.members.length - 1];
      l && this.promote(l);
    }
  }
  relegate(s) {
    for (let l = this.members.indexOf(s) - 1; l >= 0; l--) {
      const r = this.members[l];
      if (r.isPresent !== !1 && r.instance?.isConnected !== !1)
        return this.promote(r), !0;
    }
    return !1;
  }
  promote(s, l) {
    const r = this.lead;
    if (s !== r && (this.prevLead = r, this.lead = s, s.show(), r)) {
      r.updateSnapshot(), s.scheduleRender();
      const { layoutDependency: u } = r.options, { layoutDependency: h } = s.options;
      (u === void 0 || u !== h) && (s.resumeFrom = r, l && (r.preserveOpacity = !0), r.snapshot && (s.snapshot = r.snapshot, s.snapshot.latestValues = r.animationValues || r.latestValues), s.root?.isUpdating && (s.isLayoutDirty = !0)), s.options.crossfade === !1 && r.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((s) => {
      s.options.onExitComplete?.(), s.resumingFrom?.options.onExitComplete?.();
    });
  }
  scheduleRender() {
    this.members.forEach((s) => s.instance && s.scheduleRender(!1));
  }
  removeLeadSnapshot() {
    this.lead?.snapshot && (this.lead.snapshot = void 0);
  }
}
const _c = {
  /**
   * Global flag as to whether the tree has animated since the last time
   * we resized the window
   */
  hasAnimatedSinceResize: !0,
  /**
   * We set this to true once, on the first update. Any nodes added to the tree beyond that
   * update will be given a `data-projection-id` attribute.
   */
  hasEverUpdated: !1
}, Xd = ["", "X", "Y", "Z"], s3 = 1e3;
let l3 = 0;
function Zd(a, s, l, r) {
  const { latestValues: u } = s;
  u[a] && (l[a] = u[a], s.setStaticValue(a, 0), r && (r[a] = 0));
}
function Xb(a) {
  if (a.hasCheckedOptimisedAppear = !0, a.root === a)
    return;
  const { visualElement: s } = a.options;
  if (!s)
    return;
  const l = db(s);
  if (window.MotionHasOptimisedAnimation(l, "transform")) {
    const { layout: u, layoutId: h } = a.options;
    window.MotionCancelOptimisedAnimation(l, "transform", Ie, !(u || h));
  }
  const { parent: r } = a;
  r && !r.hasCheckedOptimisedAppear && Xb(r);
}
function Zb({ attachResizeListener: a, defaultParent: s, measureScroll: l, checkIsScrollRoot: r, resetTransform: u }) {
  return class {
    constructor(f = {}, p = s?.()) {
      this.id = l3++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = { x: 1, y: 1 }, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
        this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
      }, this.updateProjection = () => {
        this.projectionUpdateScheduled = !1, this.nodes.forEach(c3), this.nodes.forEach(p3), this.nodes.forEach(g3), this.nodes.forEach(u3);
      }, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = f, this.root = p ? p.root || p : this, this.path = p ? [...p.path, p] : [], this.parent = p, this.depth = p ? p.depth + 1 : 0;
      for (let y = 0; y < this.path.length; y++)
        this.path[y].shouldResetTransform = !0;
      this.root === this && (this.nodes = new n3());
    }
    addEventListener(f, p) {
      return this.eventHandlers.has(f) || this.eventHandlers.set(f, new Vh()), this.eventHandlers.get(f).add(p);
    }
    notifyListeners(f, ...p) {
      const y = this.eventHandlers.get(f);
      y && y.notify(...p);
    }
    hasListeners(f) {
      return this.eventHandlers.has(f);
    }
    /**
     * Lifecycles
     */
    mount(f) {
      if (this.instance)
        return;
      this.isSVG = tm(f) && !rE(f), this.instance = f;
      const { layoutId: p, layout: y, visualElement: v } = this.options;
      if (v && !v.current && v.mount(f), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || p) && (this.isLayoutDirty = !0), a) {
        let x, g = 0;
        const S = () => this.root.updateBlockedByResize = !1;
        Ie.read(() => {
          g = window.innerWidth;
        }), a(f, () => {
          const E = window.innerWidth;
          E !== g && (g = E, this.root.updateBlockedByResize = !0, x && x(), x = a3(S, 250), _c.hasAnimatedSinceResize && (_c.hasAnimatedSinceResize = !1, this.nodes.forEach(Nv)));
        });
      }
      p && this.root.registerSharedNode(p, this), this.options.animate !== !1 && v && (p || y) && this.addEventListener("didUpdate", ({ delta: x, hasLayoutChanged: g, hasRelativeLayoutChanged: S, layout: E }) => {
        if (this.isTreeAnimationBlocked()) {
          this.target = void 0, this.relativeTarget = void 0;
          return;
        }
        const j = this.options.transition || v.getDefaultTransition() || S3, { onLayoutAnimationStart: V, onLayoutAnimationComplete: M } = v.getProps(), q = !this.targetLayout || !Gb(this.targetLayout, E), L = !g && S;
        if (this.options.layoutRoot || this.resumeFrom || L || g && (q || !this.currentAnimation)) {
          this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
          const K = {
            ...Fh(j, "layout"),
            onPlay: V,
            onComplete: M
          };
          (v.shouldReduceMotion || this.options.layoutRoot) && (K.delay = 0, K.type = !1), this.startAnimation(K), this.setAnimationOrigin(x, L, K.path);
        } else
          g || Nv(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
        this.targetLayout = E;
      });
    }
    unmount() {
      this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
      const f = this.getStack();
      f && f.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), Oa(this.updateProjection);
    }
    // only on the root
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
    }
    // Note: currently only running on root node
    startUpdate() {
      this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(y3), this.animationId++);
    }
    getTransformTemplate() {
      const { visualElement: f } = this.options;
      return f && f.getProps().transformTemplate;
    }
    willUpdate(f = !0) {
      if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && Xb(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
        return;
      this.isLayoutDirty = !0;
      for (let x = 0; x < this.path.length; x++) {
        const g = this.path[x];
        g.shouldResetTransform = !0, (typeof g.latestValues.x == "string" || typeof g.latestValues.y == "string") && (g.isLayoutDirty = !0), g.updateScroll("snapshot"), g.options.layoutRoot && g.willUpdate(!1);
      }
      const { layoutId: p, layout: y } = this.options;
      if (p === void 0 && !y)
        return;
      const v = this.getTransformTemplate();
      this.prevTransformTemplateValue = v ? v(this.latestValues, "") : void 0, this.updateSnapshot(), f && this.notifyListeners("willUpdate");
    }
    update() {
      if (this.updateScheduled = !1, this.isUpdateBlocked()) {
        const y = this.updateBlockedByResize;
        this.unblockUpdate(), this.updateBlockedByResize = !1, this.clearAllSnapshots(), y && this.nodes.forEach(d3), this.nodes.forEach(Av);
        return;
      }
      if (this.animationId <= this.animationCommitId) {
        this.nodes.forEach(Mv);
        return;
      }
      this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(h3), this.nodes.forEach(m3), this.nodes.forEach(r3), this.nodes.forEach(o3)) : this.nodes.forEach(Mv), this.clearAllSnapshots();
      const p = tn.now();
      Yt.delta = ha(0, 1e3 / 60, p - Yt.timestamp), Yt.timestamp = p, Yt.isProcessing = !0, Od.update.process(Yt), Od.preRender.process(Yt), Od.render.process(Yt), Yt.isProcessing = !1;
    }
    didUpdate() {
      this.updateScheduled || (this.updateScheduled = !0, Wh.read(this.scheduleUpdate));
    }
    clearAllSnapshots() {
      this.nodes.forEach(f3), this.sharedNodes.forEach(v3);
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, Ie.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      Ie.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    /**
     * Update measurements
     */
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !nn(this.snapshot.measuredBox.x) && !nn(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
    }
    updateLayout() {
      if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty))
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let y = 0; y < this.path.length; y++)
          this.path[y].updateScroll();
      const f = this.layout;
      this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected || (this.layoutCorrected = jt()), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
      const { visualElement: p } = this.options;
      p && p.notify("LayoutMeasure", this.layout.layoutBox, f ? f.layoutBox : void 0);
    }
    updateScroll(f = "measure") {
      let p = !!(this.options.layoutScroll && this.instance);
      if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === f && (p = !1), p && this.instance) {
        const y = r(this.instance);
        this.scroll = {
          animationId: this.root.animationId,
          phase: f,
          isRoot: y,
          offset: l(this.instance),
          wasRoot: this.scroll ? this.scroll.isRoot : y
        };
      }
    }
    resetTransform() {
      if (!u)
        return;
      const f = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, p = this.projectionDelta && !qb(this.projectionDelta), y = this.getTransformTemplate(), v = y ? y(this.latestValues, "") : void 0, x = v !== this.prevTransformTemplateValue;
      f && this.instance && (p || Fi(this.latestValues) || x) && (u(this.instance, v), this.shouldResetTransform = !1, this.scheduleRender());
    }
    measure(f = !0) {
      const p = this.measurePageBox();
      let y = this.removeElementScroll(p);
      return f && (y = this.removeTransform(y)), w3(y), {
        animationId: this.root.animationId,
        measuredBox: p,
        layoutBox: y,
        latestValues: {},
        source: this.id
      };
    }
    measurePageBox() {
      const { visualElement: f } = this.options;
      if (!f)
        return jt();
      const p = f.measureViewportBox();
      if (!(this.scroll?.wasRoot || this.path.some(T3))) {
        const { scroll: v } = this.root;
        v && (ca(p.x, v.offset.x), ca(p.y, v.offset.y));
      }
      return p;
    }
    removeElementScroll(f) {
      const p = jt();
      if (Yn(p, f), this.scroll?.wasRoot)
        return p;
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y], { scroll: x, options: g } = v;
        v !== this.root && x && g.layoutScroll && (x.wasRoot && Yn(p, f), ca(p.x, x.offset.x), ca(p.y, x.offset.y));
      }
      return p;
    }
    applyTransform(f, p = !1, y) {
      const v = y || jt();
      Yn(v, f);
      for (let x = 0; x < this.path.length; x++) {
        const g = this.path[x];
        !p && g.options.layoutScroll && g.scroll && g !== g.root && (ca(v.x, -g.scroll.offset.x), ca(v.y, -g.scroll.offset.y)), Fi(g.latestValues) && Dc(v, g.latestValues, g.layout?.layoutBox);
      }
      return Fi(this.latestValues) && Dc(v, this.latestValues, this.layout?.layoutBox), v;
    }
    removeTransform(f) {
      const p = jt();
      Yn(p, f);
      for (let y = 0; y < this.path.length; y++) {
        const v = this.path[y];
        if (!Fi(v.latestValues))
          continue;
        let x;
        v.instance && (wh(v.latestValues) && v.updateSnapshot(), x = jt(), Yn(x, v.measurePageBox())), vv(p, v.latestValues, v.snapshot?.layoutBox, x);
      }
      return Fi(this.latestValues) && vv(p, this.latestValues), p;
    }
    setTargetDelta(f) {
      this.targetDelta = f, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
    }
    setOptions(f) {
      this.options = {
        ...this.options,
        ...f,
        crossfade: f.crossfade !== void 0 ? f.crossfade : !0
      };
    }
    clearMeasurements() {
      this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== Yt.timestamp && this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(f = !1) {
      const p = this.getLead();
      this.isProjectionDirty || (this.isProjectionDirty = p.isProjectionDirty), this.isTransformDirty || (this.isTransformDirty = p.isTransformDirty), this.isSharedProjectionDirty || (this.isSharedProjectionDirty = p.isSharedProjectionDirty);
      const y = !!this.resumingFrom || this !== p;
      if (!(f || y && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize))
        return;
      const { layout: x, layoutId: g } = this.options;
      if (!this.layout || !(x || g))
        return;
      this.resolvedRelativeTargetAt = Yt.timestamp;
      const S = this.getClosestProjectingParent();
      S && this.linkedParentVersion !== S.layoutVersion && !S.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (this.options.layoutAnchor !== !1 && S && S.layout ? this.createRelativeTarget(S, this.layout.layoutBox, S.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = jt(), this.targetWithTransforms = jt()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), XE(this.target, this.relativeTarget, this.relativeParent.target, this.options.layoutAnchor || void 0)) : this.targetDelta ? (this.resumingFrom ? this.applyTransform(this.layout.layoutBox, !1, this.target) : Yn(this.target, this.layout.layoutBox), Nb(this.target, this.targetDelta)) : Yn(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, this.options.layoutAnchor !== !1 && S && !!S.resumingFrom == !!this.resumingFrom && !S.options.layoutScroll && S.target && this.animationProgress !== 1 ? this.createRelativeTarget(S, this.target, S.target) : this.relativeParent = this.relativeTarget = void 0));
    }
    getClosestProjectingParent() {
      if (!(!this.parent || wh(this.parent.latestValues) || Mb(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
    }
    createRelativeTarget(f, p, y) {
      this.relativeParent = f, this.linkedParentVersion = f.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = jt(), this.relativeTargetOrigin = jt(), Xc(this.relativeTargetOrigin, p, y, this.options.layoutAnchor || void 0), Yn(this.relativeTarget, this.relativeTargetOrigin);
    }
    removeRelativeTarget() {
      this.relativeParent = this.relativeTarget = void 0;
    }
    calcProjection() {
      const f = this.getLead(), p = !!this.resumingFrom || this !== f;
      let y = !0;
      if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (y = !1), p && (this.isSharedProjectionDirty || this.isTransformDirty) && (y = !1), this.resolvedRelativeTargetAt === Yt.timestamp && (y = !1), y)
        return;
      const { layout: v, layoutId: x } = this.options;
      if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(v || x))
        return;
      Yn(this.layoutCorrected, this.layout.layoutBox);
      const g = this.treeScale.x, S = this.treeScale.y;
      bE(this.layoutCorrected, this.treeScale, this.path, p), f.layout && !f.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (f.target = f.layout.layoutBox, f.targetWithTransforms = jt());
      const { target: E } = f;
      if (!E) {
        this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
        return;
      }
      !this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (dv(this.prevProjectionDelta.x, this.projectionDelta.x), dv(this.prevProjectionDelta.y, this.projectionDelta.y)), hr(this.projectionDelta, this.layoutCorrected, E, this.latestValues), (this.treeScale.x !== g || this.treeScale.y !== S || !Tv(this.projectionDelta.x, this.prevProjectionDelta.x) || !Tv(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", E));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(f = !0) {
      if (this.options.visualElement?.scheduleRender(), f) {
        const p = this.getStack();
        p && p.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    createProjectionDeltas() {
      this.prevProjectionDelta = Js(), this.projectionDelta = Js(), this.projectionDeltaWithTransform = Js();
    }
    setAnimationOrigin(f, p = !1, y) {
      const v = this.snapshot, x = v ? v.latestValues : {}, g = { ...this.latestValues }, S = Js();
      (!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !p;
      const E = jt(), j = v ? v.source : void 0, V = this.layout ? this.layout.source : void 0, M = j !== V, q = this.getStack(), L = !q || q.members.length <= 1, K = !!(M && !L && this.options.crossfade === !0 && !this.path.some(x3));
      this.animationProgress = 0;
      let X;
      const ee = y?.interpolateProjection(f);
      this.mixTargetDelta = (oe) => {
        const Q = oe / 1e3, D = ee?.(Q);
        D ? (S.x.translate = D.x, S.x.scale = nt(f.x.scale, 1, Q), S.x.origin = f.x.origin, S.x.originPoint = f.x.originPoint, S.y.translate = D.y, S.y.scale = nt(f.y.scale, 1, Q), S.y.origin = f.y.origin, S.y.originPoint = f.y.originPoint) : (kv(S.x, f.x, Q), kv(S.y, f.y, Q)), this.setTargetDelta(S), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (Xc(E, this.layout.layoutBox, this.relativeParent.layout.layoutBox, this.options.layoutAnchor || void 0), b3(this.relativeTarget, this.relativeTargetOrigin, E, Q), X && FE(this.relativeTarget, X) && (this.isProjectionDirty = !1), X || (X = jt()), Yn(X, this.relativeTarget)), M && (this.animationValues = g, JE(g, x, this.latestValues, Q, K, L)), D && D.rotate !== void 0 && (this.animationValues || (this.animationValues = g), this.animationValues.pathRotation = D.rotate), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = Q;
      }, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
    }
    startAnimation(f) {
      this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation && (Oa(this.pendingAnimation), this.pendingAnimation = void 0), this.pendingAnimation = Ie.update(() => {
        _c.hasAnimatedSinceResize = !0, this.motionValue || (this.motionValue = es(0)), this.motionValue.jump(0, !1), this.currentAnimation = e3(this.motionValue, [0, 1e3], {
          ...f,
          velocity: 0,
          isSync: !0,
          onUpdate: (p) => {
            this.mixTargetDelta(p), f.onUpdate && f.onUpdate(p);
          },
          onComplete: () => {
            f.onComplete && f.onComplete(), this.completeAnimation();
          }
        }), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
      });
    }
    completeAnimation() {
      this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
      const f = this.getStack();
      f && f.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(s3), this.currentAnimation.stop()), this.completeAnimation();
    }
    applyTransformsToTarget() {
      const f = this.getLead();
      let { targetWithTransforms: p, target: y, layout: v, latestValues: x } = f;
      if (!(!p || !y || !v)) {
        if (this !== f && this.layout && v && Kb(this.options.animationType, this.layout.layoutBox, v.layoutBox)) {
          y = this.target || jt();
          const g = nn(this.layout.layoutBox.x);
          y.x.min = f.target.x.min, y.x.max = y.x.min + g;
          const S = nn(this.layout.layoutBox.y);
          y.y.min = f.target.y.min, y.y.max = y.y.min + S;
        }
        Yn(p, y), Dc(p, x), hr(this.projectionDeltaWithTransform, this.layoutCorrected, p, x);
      }
    }
    registerSharedNode(f, p) {
      this.sharedNodes.has(f) || this.sharedNodes.set(f, new i3()), this.sharedNodes.get(f).add(p);
      const v = p.options.initialPromotionConfig;
      p.promote({
        transition: v ? v.transition : void 0,
        preserveFollowOpacity: v && v.shouldPreserveFollowOpacity ? v.shouldPreserveFollowOpacity(p) : void 0
      });
    }
    isLead() {
      const f = this.getStack();
      return f ? f.lead === this : !0;
    }
    getLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.lead || this : this;
    }
    getPrevLead() {
      const { layoutId: f } = this.options;
      return f ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      const { layoutId: f } = this.options;
      if (f)
        return this.root.sharedNodes.get(f);
    }
    promote({ needsReset: f, transition: p, preserveFollowOpacity: y } = {}) {
      const v = this.getStack();
      v && v.promote(this, y), f && (this.projectionDelta = void 0, this.needsReset = !0), p && this.setOptions({ transition: p });
    }
    relegate() {
      const f = this.getStack();
      return f ? f.relegate(this) : !1;
    }
    resetSkewAndRotation() {
      const { visualElement: f } = this.options;
      if (!f)
        return;
      let p = !1;
      const { latestValues: y } = f;
      if ((y.z || y.rotate || y.rotateX || y.rotateY || y.rotateZ || y.skewX || y.skewY) && (p = !0), !p)
        return;
      const v = {};
      y.z && Zd("z", f, v, this.animationValues);
      for (let x = 0; x < Xd.length; x++)
        Zd(`rotate${Xd[x]}`, f, v, this.animationValues), Zd(`skew${Xd[x]}`, f, v, this.animationValues);
      f.render();
      for (const x in v)
        f.setStaticValue(x, v[x]), this.animationValues && (this.animationValues[x] = v[x]);
      f.scheduleRender();
    }
    applyProjectionStyles(f, p) {
      if (!this.instance || this.isSVG)
        return;
      if (!this.isVisible) {
        f.visibility = "hidden";
        return;
      }
      const y = this.getTransformTemplate();
      if (this.needsReset) {
        this.needsReset = !1, f.visibility = "", f.opacity = "", f.pointerEvents = Rc(p?.pointerEvents) || "", f.transform = y ? y(this.latestValues, "") : "none";
        return;
      }
      const v = this.getLead();
      if (!this.projectionDelta || !this.layout || !v.target) {
        this.options.layoutId && (f.opacity = this.latestValues.opacity !== void 0 ? this.latestValues.opacity : 1, f.pointerEvents = Rc(p?.pointerEvents) || ""), this.hasProjected && !Fi(this.latestValues) && (f.transform = y ? y({}, "") : "none", this.hasProjected = !1);
        return;
      }
      f.visibility = "";
      const x = v.animationValues || v.latestValues;
      this.applyTransformsToTarget();
      let g = IE(this.projectionDeltaWithTransform, this.treeScale, x);
      y && (g = y(x, g)), f.transform = g;
      const { x: S, y: E } = this.projectionDelta;
      f.transformOrigin = `${S.origin * 100}% ${E.origin * 100}% 0`, v.animationValues ? f.opacity = v === this ? x.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : x.opacityExit : f.opacity = v === this ? x.opacity !== void 0 ? x.opacity : "" : x.opacityExit !== void 0 ? x.opacityExit : 0;
      for (const j in Ch) {
        if (x[j] === void 0)
          continue;
        const { correct: V, applyTo: M, isCSSVariable: q } = Ch[j], L = g === "none" ? x[j] : V(x[j], v);
        if (M) {
          const K = M.length;
          for (let X = 0; X < K; X++)
            f[M[X]] = L;
        } else
          q ? this.options.visualElement.renderState.vars[j] = L : f[j] = L;
      }
      this.options.layoutId && (f.pointerEvents = v === this ? Rc(p?.pointerEvents) || "" : "none");
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    // Only run on root
    resetTree() {
      this.root.nodes.forEach((f) => f.currentAnimation?.stop()), this.root.nodes.forEach(Av), this.root.sharedNodes.clear();
    }
  };
}
function r3(a) {
  a.updateLayout();
}
function o3(a) {
  const s = a.resumeFrom?.snapshot || a.snapshot;
  if (a.isLead() && a.layout && s && a.hasListeners("didUpdate")) {
    const { layoutBox: l, measuredBox: r } = a.layout, { animationType: u } = a.options, h = s.source !== a.layout.source;
    if (u === "size")
      oa((x) => {
        const g = h ? s.measuredBox[x] : s.layoutBox[x], S = nn(g);
        g.min = l[x].min, g.max = g.min + S;
      });
    else if (u === "x" || u === "y") {
      const x = u === "x" ? "y" : "x";
      Eh(h ? s.measuredBox[x] : s.layoutBox[x], l[x]);
    } else Kb(u, s.layoutBox, l) && oa((x) => {
      const g = h ? s.measuredBox[x] : s.layoutBox[x], S = nn(l[x]);
      g.max = g.min + S, a.relativeTarget && !a.currentAnimation && (a.isProjectionDirty = !0, a.relativeTarget[x].max = a.relativeTarget[x].min + S);
    });
    const f = Js();
    hr(f, l, s.layoutBox);
    const p = Js();
    h ? hr(p, a.applyTransform(r, !0), s.measuredBox) : hr(p, l, s.layoutBox);
    const y = !qb(f);
    let v = !1;
    if (!a.resumeFrom) {
      const x = a.getClosestProjectingParent();
      if (x && !x.resumeFrom) {
        const { snapshot: g, layout: S } = x;
        if (g && S) {
          const E = a.options.layoutAnchor || void 0, j = jt();
          Xc(j, s.layoutBox, g.layoutBox, E);
          const V = jt();
          Xc(V, l, S.layoutBox, E), Gb(j, V) || (v = !0), x.options.layoutRoot && (a.relativeTarget = V, a.relativeTargetOrigin = j, a.relativeParent = x);
        }
      }
    }
    a.notifyListeners("didUpdate", {
      layout: l,
      snapshot: s,
      delta: p,
      layoutDelta: f,
      hasLayoutChanged: y,
      hasRelativeLayoutChanged: v
    });
  } else if (a.isLead()) {
    const { onExitComplete: l } = a.options;
    l && l();
  }
  a.options.transition = void 0;
}
function c3(a) {
  a.parent && (a.isProjecting() || (a.isProjectionDirty = a.parent.isProjectionDirty), a.isSharedProjectionDirty || (a.isSharedProjectionDirty = !!(a.isProjectionDirty || a.parent.isProjectionDirty || a.parent.isSharedProjectionDirty)), a.isTransformDirty || (a.isTransformDirty = a.parent.isTransformDirty));
}
function u3(a) {
  a.isProjectionDirty = a.isSharedProjectionDirty = a.isTransformDirty = !1;
}
function f3(a) {
  a.clearSnapshot();
}
function Av(a) {
  a.clearMeasurements();
}
function d3(a) {
  a.isLayoutDirty = !0, a.updateLayout();
}
function Mv(a) {
  a.isLayoutDirty = !1;
}
function h3(a) {
  a.isAnimationBlocked && a.layout && !a.isLayoutDirty && (a.snapshot = a.layout, a.isLayoutDirty = !0);
}
function m3(a) {
  const { visualElement: s } = a.options;
  s && s.getProps().onBeforeLayoutMeasure && s.notify("BeforeLayoutMeasure"), a.resetTransform();
}
function Nv(a) {
  a.finishAnimation(), a.targetDelta = a.relativeTarget = a.target = void 0, a.isProjectionDirty = !0;
}
function p3(a) {
  a.resolveTargetDelta();
}
function g3(a) {
  a.calcProjection();
}
function y3(a) {
  a.resetSkewAndRotation();
}
function v3(a) {
  a.removeLeadSnapshot();
}
function kv(a, s, l) {
  a.translate = nt(s.translate, 0, l), a.scale = nt(s.scale, 1, l), a.origin = s.origin, a.originPoint = s.originPoint;
}
function Dv(a, s, l, r) {
  a.min = nt(s.min, l.min, r), a.max = nt(s.max, l.max, r);
}
function b3(a, s, l, r) {
  Dv(a.x, s.x, l.x, r), Dv(a.y, s.y, l.y, r);
}
function x3(a) {
  return a.animationValues && a.animationValues.opacityExit !== void 0;
}
const S3 = {
  duration: 0.45,
  ease: [0.4, 0, 0.1, 1]
}, Rv = (a) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(a), _v = Rv("applewebkit/") && !Rv("chrome/") ? Math.round : On;
function zv(a) {
  a.min = _v(a.min), a.max = _v(a.max);
}
function w3(a) {
  zv(a.x), zv(a.y);
}
function Kb(a, s, l) {
  return a === "position" || a === "preserve-aspect" && !YE(wv(s), wv(l), 0.2);
}
function T3(a) {
  return a !== a.root && a.scroll?.wasRoot;
}
const C3 = Zb({
  attachResizeListener: (a, s) => Tr(a, "resize", s),
  measureScroll: () => ({
    x: document.documentElement.scrollLeft || document.body?.scrollLeft || 0,
    y: document.documentElement.scrollTop || document.body?.scrollTop || 0
  }),
  checkIsScrollRoot: () => !0
}), E3 = (a) => !a.isLayoutDirty && a.willUpdate(!1);
function Ov() {
  const a = /* @__PURE__ */ new Set(), s = /* @__PURE__ */ new WeakMap(), l = () => a.forEach(E3);
  return {
    add: (r) => {
      a.add(r), s.set(r, r.addEventListener("willUpdate", l));
    },
    remove: (r) => {
      a.delete(r);
      const u = s.get(r);
      u && (u(), s.delete(r)), l();
    },
    dirty: l
  };
}
const Kd = {
  current: void 0
}, Qb = Zb({
  measureScroll: (a) => ({
    x: a.scrollLeft,
    y: a.scrollTop
  }),
  defaultParent: () => {
    if (!Kd.current) {
      const a = new C3({});
      a.mount(window), a.setOptions({ layoutScroll: !0 }), Kd.current = a;
    }
    return Kd.current;
  },
  resetTransform: (a, s) => {
    a.style.transform = s !== void 0 ? s : "none";
  },
  checkIsScrollRoot: (a) => window.getComputedStyle(a).position === "fixed"
}), ts = C.createContext({
  transformPagePoint: (a) => a,
  isStatic: !1,
  reducedMotion: "never"
});
function Uv(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
function j3(...a) {
  return (s) => {
    let l = !1;
    const r = a.map((u) => {
      const h = Uv(u, s);
      return !l && typeof h == "function" && (l = !0), h;
    });
    if (l)
      return () => {
        for (let u = 0; u < r.length; u++) {
          const h = r[u];
          typeof h == "function" ? h() : Uv(a[u], null);
        }
      };
  };
}
function A3(...a) {
  return C.useCallback(j3(...a), a);
}
class M3 extends C.Component {
  getSnapshotBeforeUpdate(s) {
    const l = this.props.childRef.current;
    if (jc(l) && s.isPresent && !this.props.isPresent && this.props.pop !== !1) {
      const r = l.offsetParent, u = jc(r) && r.offsetWidth || 0, h = jc(r) && r.offsetHeight || 0, f = getComputedStyle(l), p = this.props.sizeRef.current;
      p.height = parseFloat(f.height), p.width = parseFloat(f.width), p.top = l.offsetTop, p.left = l.offsetLeft, p.right = u - p.width - p.left, p.bottom = h - p.height - p.top, p.direction = f.direction;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function N3({ children: a, isPresent: s, anchorX: l, anchorY: r, root: u, pop: h }) {
  const f = C.useId(), p = C.useRef(null), y = C.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    direction: "ltr"
  }), { nonce: v } = C.useContext(ts), x = h !== !1 ? a.props?.ref ?? a?.ref : void 0, g = A3(p, x);
  return C.useInsertionEffect(() => {
    const { width: S, height: E, top: j, left: V, right: M, bottom: q, direction: L } = y.current;
    if (s || h === !1 || !p.current || !S || !E)
      return;
    const K = L === "rtl", X = l === "left" ? K ? `right: ${M}` : `left: ${V}` : K ? `left: ${V}` : `right: ${M}`, ee = r === "bottom" ? `bottom: ${q}` : `top: ${j}`;
    p.current.dataset.motionPopId = f;
    const oe = document.createElement("style");
    v && (oe.nonce = v);
    const Q = u ?? document.head;
    return Q.appendChild(oe), oe.sheet && oe.sheet.insertRule(`
          [data-motion-pop-id="${f}"] {
            position: absolute !important;
            width: ${S}px !important;
            height: ${E}px !important;
            ${X}px !important;
            ${ee}px !important;
          }
        `), () => {
      p.current?.removeAttribute("data-motion-pop-id"), Q.contains(oe) && Q.removeChild(oe);
    };
  }, [s]), d.jsx(M3, { isPresent: s, childRef: p, sizeRef: y, pop: h, children: h === !1 ? a : C.cloneElement(a, { ref: g }) });
}
const k3 = ({ children: a, initial: s, isPresent: l, onExitComplete: r, custom: u, presenceAffectsLayout: h, mode: f, anchorX: p, anchorY: y, root: v }) => {
  const x = tl(D3), g = C.useId(), S = C.useRef(l), E = C.useRef(r);
  Er(() => {
    S.current = l, E.current = r;
  });
  let j = !0, V = C.useMemo(() => (j = !1, {
    id: g,
    initial: s,
    isPresent: l,
    custom: u,
    onExitComplete: (M) => {
      x.set(M, !0);
      for (const q of x.values())
        if (!q)
          return;
      r && r();
    },
    register: (M) => (x.set(M, !1), () => {
      x.delete(M), !S.current && !x.size && E.current?.();
    })
  }), [l, x, r]);
  return h && j && (V = { ...V }), C.useMemo(() => {
    x.forEach((M, q) => x.set(q, !1));
  }, [l]), C.useEffect(() => {
    !l && !x.size && r && r();
  }, [l]), a = d.jsx(N3, { pop: f === "popLayout", isPresent: l, anchorX: p, anchorY: y, root: v, children: a }), d.jsx(Ic.Provider, { value: V, children: a });
};
function D3() {
  return /* @__PURE__ */ new Map();
}
function Fb(a = !0) {
  const s = C.useContext(Ic);
  if (s === null)
    return [!0, null];
  const { isPresent: l, onExitComplete: r, register: u } = s, h = C.useId();
  C.useEffect(() => {
    if (a)
      return u(h);
  }, [a]);
  const f = C.useCallback(() => a && r && r(h), [h, r, a]);
  return !l && r ? [!1, f] : [!0];
}
const pc = (a) => a.key || "";
function Vv(a) {
  const s = [];
  return C.Children.forEach(a, (l) => {
    C.isValidElement(l) && s.push(l);
  }), s;
}
const Ii = ({ children: a, custom: s, initial: l = !0, onExitComplete: r, presenceAffectsLayout: u = !0, mode: h = "sync", propagate: f = !1, anchorX: p = "left", anchorY: y = "top", root: v }) => {
  const [x, g] = Fb(f), S = C.useMemo(() => Vv(a), [a]), E = f && !x ? [] : S.map(pc), j = C.useRef(!0), V = C.useRef(S), M = tl(() => /* @__PURE__ */ new Map()), q = C.useRef(/* @__PURE__ */ new Set()), [L, K] = C.useState(S), [X, ee] = C.useState(S);
  Er(() => {
    j.current = !1, V.current = S;
    for (let D = 0; D < X.length; D++) {
      const W = pc(X[D]);
      E.includes(W) ? (M.delete(W), q.current.delete(W)) : M.get(W) !== !0 && M.set(W, !1);
    }
  }, [X, E.length, E.join("-")]);
  const oe = [];
  if (S !== L) {
    let D = [...S];
    for (let W = 0; W < X.length; W++) {
      const te = X[W], Ae = pc(te);
      E.includes(Ae) || (D.splice(W, 0, te), oe.push(te));
    }
    return h === "wait" && oe.length && (D = oe), ee(Vv(D)), K(S), null;
  }
  const { forceRender: Q } = C.useContext(vr);
  return d.jsx(d.Fragment, { children: X.map((D) => {
    const W = pc(D), te = f && !x ? !1 : S === X || E.includes(W), Ae = () => {
      if (q.current.has(W))
        return;
      if (M.has(W))
        q.current.add(W), M.set(W, !0);
      else
        return;
      let Ce = !0;
      M.forEach((Te) => {
        Te || (Ce = !1);
      }), Ce && (Q?.(), ee(V.current), f && g?.(), r && r());
    };
    return d.jsx(k3, { isPresent: te, initial: !j.current || l ? void 0 : !1, custom: s, presenceAffectsLayout: u, mode: h, root: v, onExitComplete: te ? void 0 : Ae, anchorX: p, anchorY: y, children: D }, W);
  }) });
}, R3 = C.createContext(null);
function _3() {
  const a = C.useRef(!1);
  return Er(() => (a.current = !0, () => {
    a.current = !1;
  }), []), a;
}
function z3() {
  const a = _3(), [s, l] = C.useState(0), r = C.useCallback(() => {
    a.current && l(s + 1);
  }, [s]);
  return [C.useCallback(() => Ie.postRender(r), [r]), s];
}
const Ib = (a) => a === !0, O3 = (a) => Ib(a === !0) || a === "id", U3 = ({ children: a, id: s, inherit: l = !0 }) => {
  const r = C.useContext(vr), u = C.useContext(R3), [h, f] = z3(), p = C.useRef(null), y = r.id || u;
  p.current === null && (O3(l) && y && (s = s ? y + "-" + s : y), p.current = {
    id: s,
    group: Ib(l) && r.group || Ov()
  });
  const v = C.useMemo(() => ({ ...p.current, forceRender: h }), [f]);
  return d.jsx(vr.Provider, { value: v, children: a });
}, Pb = C.createContext({ strict: !1 }), Lv = {
  animation: [
    "animate",
    "variants",
    "whileHover",
    "whileTap",
    "exit",
    "whileInView",
    "whileFocus",
    "whileDrag"
  ],
  exit: ["exit"],
  drag: ["drag", "dragControls"],
  focus: ["whileFocus"],
  hover: ["whileHover", "onHoverStart", "onHoverEnd"],
  tap: ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  pan: ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  inView: ["whileInView", "onViewportEnter", "onViewportLeave"],
  layout: ["layout", "layoutId"]
};
let Bv = !1;
function V3() {
  if (Bv)
    return;
  const a = {};
  for (const s in Lv)
    a[s] = {
      isEnabled: (l) => Lv[s].some((r) => !!l[r])
    };
  Eb(a), Bv = !0;
}
function Jb() {
  return V3(), pE();
}
function L3(a) {
  const s = Jb();
  for (const l in a)
    s[l] = {
      ...s[l],
      ...a[l]
    };
  Eb(s);
}
const B3 = /* @__PURE__ */ new Set([
  "animate",
  "exit",
  "variants",
  "initial",
  "style",
  "values",
  "variants",
  "transition",
  "transformTemplate",
  "custom",
  "inherit",
  "onBeforeLayoutMeasure",
  "onAnimationStart",
  "onAnimationComplete",
  "onUpdate",
  "onDragStart",
  "onDrag",
  "onDragEnd",
  "onMeasureDragConstraints",
  "onDirectionLock",
  "onDragTransitionEnd",
  "_dragX",
  "_dragY",
  "onHoverStart",
  "onHoverEnd",
  "onViewportEnter",
  "onViewportLeave",
  "globalTapTarget",
  "propagate",
  "ignoreStrict",
  "viewport"
]);
function Zc(a) {
  return a.startsWith("while") || a.startsWith("drag") && a !== "draggable" || a.startsWith("layout") || a.startsWith("onTap") || a.startsWith("onPan") || a.startsWith("onLayout") || B3.has(a);
}
let $b = (a) => !Zc(a);
function Wb(a) {
  typeof a == "function" && ($b = (s) => s.startsWith("on") ? !Zc(s) : a(s));
}
try {
  Wb(require("@emotion/is-prop-valid").default);
} catch {
}
function H3(a, s, l) {
  const r = {};
  for (const u in a)
    u === "values" && typeof a.values == "object" || At(a[u]) || ($b(u) || l === !0 && Zc(u) || !s && !Zc(u) || // If trying to use native HTML drag events, forward drag listeners
    a.draggable && u.startsWith("onDrag")) && (r[u] = a[u]);
  return r;
}
function q3({ children: a, isValidProp: s, ...l }) {
  s && Wb(s);
  const r = C.useContext(ts);
  l = { ...r, ...l }, l.transition = Qh(l.transition, r.transition), l.isStatic = tl(() => l.isStatic);
  const u = C.useMemo(() => l, [
    JSON.stringify(l.transition),
    l.transformPagePoint,
    l.reducedMotion,
    l.skipAnimations
  ]);
  return d.jsx(ts.Provider, { value: u, children: a });
}
const eu = /* @__PURE__ */ C.createContext({});
function G3(a, s) {
  if (Wc(a)) {
    const { initial: l, animate: r } = a;
    return {
      initial: l === !1 || wr(l) ? l : void 0,
      animate: wr(r) ? r : void 0
    };
  }
  return a.inherit !== !1 ? s : {};
}
function Y3(a) {
  const { initial: s, animate: l } = G3(a, C.useContext(eu));
  return C.useMemo(() => ({ initial: s, animate: l }), [Hv(s), Hv(l)]);
}
function Hv(a) {
  return Array.isArray(a) ? a.join(" ") : a;
}
const rm = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {}
});
function ex(a, s, l) {
  for (const r in s)
    !At(s[r]) && !Rb(r, l) && (a[r] = s[r]);
}
function X3({ transformTemplate: a }, s) {
  return C.useMemo(() => {
    const l = rm();
    return sm(l, s, a), Object.assign({}, l.vars, l.style);
  }, [s]);
}
function Z3(a, s) {
  const l = a.style || {}, r = {};
  return ex(r, l, a), Object.assign(r, X3(a, s)), r;
}
function K3(a, s) {
  const l = {}, r = Z3(a, s);
  return a.drag && a.dragListener !== !1 && (l.draggable = !1, r.userSelect = r.WebkitUserSelect = r.WebkitTouchCallout = "none", r.touchAction = a.drag === !0 ? "none" : `pan-${a.drag === "x" ? "y" : "x"}`), a.tabIndex === void 0 && (a.onTap || a.onTapStart || a.whileTap) && (l.tabIndex = 0), l.style = r, l;
}
const tx = () => ({
  ...rm(),
  attrs: {}
});
function Q3(a, s, l, r) {
  const u = C.useMemo(() => {
    const h = tx();
    return _b(h, s, Ob(r), a.transformTemplate, a.style), {
      ...h.attrs,
      style: { ...h.style }
    };
  }, [s]);
  if (a.style) {
    const h = {};
    ex(h, a.style, a), u.style = { ...h, ...u.style };
  }
  return u;
}
const F3 = [
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "switch",
  "symbol",
  "svg",
  "text",
  "tspan",
  "use",
  "view"
];
function om(a) {
  return (
    /**
     * If it's not a string, it's a custom React component. Currently we only support
     * HTML custom React components.
     */
    typeof a != "string" || /**
     * If it contains a dash, the element is a custom HTML webcomponent.
     */
    a.includes("-") ? !1 : (
      /**
       * If it's in our list of lowercase SVG tags, it's an SVG component
       */
      !!(F3.indexOf(a) > -1 || /**
       * If it contains a capital letter, it's an SVG component
       */
      /[A-Z]/u.test(a))
    )
  );
}
function I3(a, s, l, { latestValues: r }, u, h = !1, f) {
  const y = (f ?? om(a) ? Q3 : K3)(s, r, u, a), v = H3(s, typeof a == "string", h), x = a !== C.Fragment ? { ...v, ...y, ref: l } : {}, { children: g } = s, S = C.useMemo(() => At(g) ? g.get() : g, [g]);
  return C.createElement(a, {
    ...x,
    children: S
  });
}
function P3({ scrapeMotionValuesFromProps: a, createRenderState: s }, l, r, u) {
  return {
    latestValues: J3(l, r, u, a),
    renderState: s()
  };
}
function J3(a, s, l, r) {
  const u = {}, h = r(a, {});
  for (const S in h)
    u[S] = Rc(h[S]);
  let { initial: f, animate: p } = a;
  const y = Wc(a), v = Tb(a);
  s && v && !y && a.inherit !== !1 && (f === void 0 && (f = s.initial), p === void 0 && (p = s.animate));
  let x = l ? l.initial === !1 : !1;
  x = x || f === !1;
  const g = x ? p : f;
  if (g && typeof g != "boolean" && !$c(g)) {
    const S = Array.isArray(g) ? g : [g];
    for (let E = 0; E < S.length; E++) {
      const j = Ph(a, S[E]);
      if (j) {
        const { transitionEnd: V, transition: M, ...q } = j;
        for (const L in q) {
          let K = q[L];
          if (Array.isArray(K)) {
            const X = x ? K.length - 1 : 0;
            K = K[X];
          }
          K !== null && (u[L] = K);
        }
        for (const L in V)
          u[L] = V[L];
      }
    }
  }
  return u;
}
const nx = (a) => (s, l) => {
  const r = C.useContext(eu), u = C.useContext(Ic), h = () => P3(a, s, r, u);
  return l ? h() : tl(h);
}, $3 = /* @__PURE__ */ nx({
  scrapeMotionValuesFromProps: lm,
  createRenderState: rm
}), W3 = /* @__PURE__ */ nx({
  scrapeMotionValuesFromProps: Ub,
  createRenderState: tx
}), ej = /* @__PURE__ */ Symbol.for("motionComponentSymbol");
function tj(a, s, l) {
  const r = C.useRef(l);
  C.useInsertionEffect(() => {
    r.current = l;
  });
  const u = C.useRef(null);
  return C.useCallback((h) => {
    h && a.onMount?.(h), s && (h ? s.mount(h) : s.unmount());
    const f = r.current;
    if (typeof f == "function")
      if (h) {
        const p = f(h);
        typeof p == "function" && (u.current = p);
      } else u.current ? (u.current(), u.current = null) : f(h);
    else f && (f.current = h);
  }, [s]);
}
const ax = C.createContext({});
function Fs(a) {
  return a && typeof a == "object" && Object.prototype.hasOwnProperty.call(a, "current");
}
function nj(a, s, l, r, u, h) {
  const { visualElement: f } = C.useContext(eu), p = C.useContext(Pb), y = C.useContext(Ic), v = C.useContext(ts), x = v.reducedMotion, g = v.skipAnimations, S = C.useRef(null), E = C.useRef(!1);
  r = r || p.renderer, !S.current && r && (S.current = r(a, {
    visualState: s,
    parent: f,
    props: l,
    presenceContext: y,
    blockInitialAnimation: y ? y.initial === !1 : !1,
    reducedMotionConfig: x,
    skipAnimations: g,
    isSVG: h
  }), E.current && S.current && (S.current.manuallyAnimateOnMount = !0));
  const j = S.current, V = C.useContext(ax);
  j && !j.projection && u && (j.type === "html" || j.type === "svg") && aj(S.current, l, u, V);
  const M = C.useRef(!1);
  C.useInsertionEffect(() => {
    j && M.current && j.update(l, y);
  });
  const q = l[fb], L = C.useRef(!!q && typeof window < "u" && !window.MotionHandoffIsComplete?.(q) && window.MotionHasOptimisedAnimation?.(q));
  return Er(() => {
    E.current = !0, j && (M.current = !0, window.MotionIsMounted = !0, j.updateFeatures(), j.scheduleRenderMicrotask(), L.current && j.animationState && j.animationState.animateChanges());
  }), C.useEffect(() => {
    j && (!L.current && j.animationState && j.animationState.animateChanges(), L.current && (queueMicrotask(() => {
      window.MotionHandoffMarkAsComplete?.(q);
    }), L.current = !1), j.enteringChildren = void 0);
  }), j;
}
function aj(a, s, l, r) {
  const { layoutId: u, layout: h, drag: f, dragConstraints: p, layoutScroll: y, layoutRoot: v, layoutAnchor: x, layoutCrossfade: g } = s;
  a.projection = new l(a.latestValues, s["data-framer-portal-id"] ? void 0 : ix(a.parent)), a.projection.setOptions({
    layoutId: u,
    layout: h,
    alwaysMeasureLayout: !!f || p && Fs(p),
    visualElement: a,
    /**
     * TODO: Update options in an effect. This could be tricky as it'll be too late
     * to update by the time layout animations run.
     * We also need to fix this safeToRemove by linking it up to the one returned by usePresence,
     * ensuring it gets called if there's no potential layout animations.
     *
     */
    animationType: typeof h == "string" ? h : "both",
    initialPromotionConfig: r,
    crossfade: g,
    layoutScroll: y,
    layoutRoot: v,
    layoutAnchor: x
  });
}
function ix(a) {
  if (a)
    return a.options.allowProjection !== !1 ? a.projection : ix(a.parent);
}
function Qd(a, { forwardMotionProps: s = !1, type: l } = {}, r, u) {
  r && L3(r);
  const h = l ? l === "svg" : om(a), f = h ? W3 : $3;
  function p(v, x) {
    let g;
    const S = {
      ...C.useContext(ts),
      ...v,
      layoutId: ij(v)
    }, { isStatic: E } = S, j = Y3(v), V = f(v, E);
    if (!E && typeof window < "u") {
      sj();
      const M = lj(S);
      g = M.MeasureLayout, j.visualElement = nj(a, V, S, u, M.ProjectionNode, h);
    }
    return d.jsxs(eu.Provider, { value: j, children: [g && j.visualElement ? d.jsx(g, { visualElement: j.visualElement, ...S }) : null, I3(a, v, tj(V, j.visualElement, x), V, E, s, h)] });
  }
  p.displayName = `motion.${typeof a == "string" ? a : `create(${a.displayName ?? a.name ?? ""})`}`;
  const y = C.forwardRef(p);
  return y[ej] = a, y;
}
function ij({ layoutId: a }) {
  const s = C.useContext(vr).id;
  return s && a !== void 0 ? s + "-" + a : a;
}
function sj(a, s) {
  C.useContext(Pb).strict;
}
function lj(a) {
  const s = Jb(), { drag: l, layout: r } = s;
  if (!l && !r)
    return {};
  const u = { ...l, ...r };
  return {
    MeasureLayout: l?.isEnabled(a) || r?.isEnabled(a) ? u.MeasureLayout : void 0,
    ProjectionNode: u.ProjectionNode
  };
}
function rj(a, s) {
  if (typeof Proxy > "u")
    return Qd;
  const l = /* @__PURE__ */ new Map(), r = (h, f) => Qd(h, f, a, s), u = (h, f) => r(h, f);
  return new Proxy(u, {
    /**
     * Called when `motion` is referenced with a prop: `motion.div`, `motion.input` etc.
     * The prop name is passed through as `key` and we can use that to generate a `motion`
     * DOM component with that name.
     */
    get: (h, f) => f === "create" ? r : (l.has(f) || l.set(f, Qd(f, void 0, a, s)), l.get(f))
  });
}
const oj = (a, s) => s.isSVG ?? om(a) ? new RE(s) : new jE(s, {
  allowProjection: a !== C.Fragment
});
class cj extends xi {
  /**
   * We dynamically generate the AnimationState manager as it contains a reference
   * to the underlying animation library. We only want to load that if we load this,
   * so people can optionally code split it out using the `m` component.
   */
  constructor(s) {
    super(s), s.animationState || (s.animationState = VE(s));
  }
  updateAnimationControlsSubscription() {
    const { animate: s } = this.node.getProps();
    $c(s) && (this.unmountControls = s.subscribe(this.node));
  }
  /**
   * Subscribe any provided AnimationControls to the component's VisualElement
   */
  mount() {
    this.updateAnimationControlsSubscription();
  }
  update() {
    const { animate: s } = this.node.getProps(), { animate: l } = this.node.prevProps || {};
    s !== l && this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.node.animationState.reset(), this.unmountControls?.();
  }
}
let uj = 0;
class fj extends xi {
  constructor() {
    super(...arguments), this.id = uj++, this.isExitComplete = !1;
  }
  update() {
    if (!this.node.presenceContext)
      return;
    const { isPresent: s, onExitComplete: l } = this.node.presenceContext, { isPresent: r } = this.node.prevPresenceContext || {};
    if (!this.node.animationState || s === r)
      return;
    if (s && r === !1) {
      if (this.isExitComplete) {
        const { initial: h, custom: f } = this.node.getProps();
        if (typeof h == "string" || typeof h == "object" && h !== null && !Array.isArray(h)) {
          const p = Wi(this.node, h, f);
          if (p) {
            const { transition: y, transitionEnd: v, ...x } = p;
            for (const g in x)
              this.node.getValue(g)?.jump(x[g]);
          }
        }
        this.node.animationState.reset(), this.node.animationState.animateChanges();
      } else
        this.node.animationState.setActive("exit", !1);
      this.isExitComplete = !1;
      return;
    }
    const u = this.node.animationState.setActive("exit", !s);
    l && !s && u.then(() => {
      this.isExitComplete = !0, l(this.id);
    });
  }
  mount() {
    const { register: s, onExitComplete: l } = this.node.presenceContext || {};
    l && l(this.id), s && (this.unmount = s(this.id));
  }
  unmount() {
  }
}
const dj = {
  animation: {
    Feature: cj
  },
  exit: {
    Feature: fj
  }
};
function Nr(a) {
  return {
    point: {
      x: a.pageX,
      y: a.pageY
    }
  };
}
const hj = (a) => (s) => em(s) && a(s, Nr(s));
function mr(a, s, l, r) {
  return Tr(a, s, hj(l), r);
}
const sx = ({ current: a }) => a ? a.ownerDocument.defaultView : null, qv = (a, s) => Math.abs(a - s);
function mj(a, s) {
  const l = qv(a.x, s.x), r = qv(a.y, s.y);
  return Math.sqrt(l ** 2 + r ** 2);
}
const Gv = /* @__PURE__ */ new Set(["auto", "scroll"]);
class lx {
  constructor(s, l, { transformPagePoint: r, contextWindow: u = window, dragSnapToOrigin: h = !1, distanceThreshold: f = 3, element: p } = {}) {
    if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.lastRawMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.scrollPositions = /* @__PURE__ */ new Map(), this.removeScrollListeners = null, this.onElementScroll = (j) => {
      this.handleScroll(j.target);
    }, this.onWindowScroll = () => {
      this.handleScroll(window);
    }, this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      this.lastRawMoveEventInfo && (this.lastMoveEventInfo = gc(this.lastRawMoveEventInfo, this.transformPagePoint));
      const j = Fd(this.lastMoveEventInfo, this.history), V = this.startEvent !== null, M = mj(j.offset, { x: 0, y: 0 }) >= this.distanceThreshold;
      if (!V && !M)
        return;
      const { point: q } = j, { timestamp: L } = Yt;
      this.history.push({ ...q, timestamp: L });
      const { onStart: K, onMove: X } = this.handlers;
      V || (K && K(this.lastMoveEvent, j), this.startEvent = this.lastMoveEvent), X && X(this.lastMoveEvent, j);
    }, this.handlePointerMove = (j, V) => {
      this.lastMoveEvent = j, this.lastRawMoveEventInfo = V, this.lastMoveEventInfo = gc(V, this.transformPagePoint), Ie.update(this.updatePoint, !0);
    }, this.handlePointerUp = (j, V) => {
      this.end();
      const { onEnd: M, onSessionEnd: q, resumeAnimation: L } = this.handlers;
      if ((this.dragSnapToOrigin || !this.startEvent) && L && L(), !(this.lastMoveEvent && this.lastMoveEventInfo))
        return;
      const K = Fd(j.type === "pointercancel" ? this.lastMoveEventInfo : gc(V, this.transformPagePoint), this.history);
      this.startEvent && M && M(j, K), q && q(j, K);
    }, !em(s))
      return;
    this.dragSnapToOrigin = h, this.handlers = l, this.transformPagePoint = r, this.distanceThreshold = f, this.contextWindow = u || window;
    const y = Nr(s), v = gc(y, this.transformPagePoint), { point: x } = v, { timestamp: g } = Yt;
    this.history = [{ ...x, timestamp: g }];
    const { onSessionStart: S } = l;
    S && S(s, Fd(v, this.history));
    const E = { passive: !0, capture: !0 };
    this.removeListeners = jr(mr(this.contextWindow, "pointermove", this.handlePointerMove, E), mr(this.contextWindow, "pointerup", this.handlePointerUp, E), mr(this.contextWindow, "pointercancel", this.handlePointerUp, E)), p && this.startScrollTracking(p);
  }
  /**
   * Start tracking scroll on ancestors and window.
   */
  startScrollTracking(s) {
    let l = s.parentElement;
    for (; l; ) {
      const r = getComputedStyle(l);
      (Gv.has(r.overflowX) || Gv.has(r.overflowY)) && this.scrollPositions.set(l, {
        x: l.scrollLeft,
        y: l.scrollTop
      }), l = l.parentElement;
    }
    this.scrollPositions.set(window, {
      x: window.scrollX,
      y: window.scrollY
    }), window.addEventListener("scroll", this.onElementScroll, {
      capture: !0
    }), window.addEventListener("scroll", this.onWindowScroll), this.removeScrollListeners = () => {
      window.removeEventListener("scroll", this.onElementScroll, {
        capture: !0
      }), window.removeEventListener("scroll", this.onWindowScroll);
    };
  }
  /**
   * Handle scroll compensation during drag.
   *
   * For element scroll: adjusts history origin since pageX/pageY doesn't change.
   * For window scroll: adjusts lastMoveEventInfo since pageX/pageY would change.
   */
  handleScroll(s) {
    const l = this.scrollPositions.get(s);
    if (!l)
      return;
    const r = s === window, u = r ? { x: window.scrollX, y: window.scrollY } : {
      x: s.scrollLeft,
      y: s.scrollTop
    }, h = { x: u.x - l.x, y: u.y - l.y };
    h.x === 0 && h.y === 0 || (r ? this.lastMoveEventInfo && (this.lastMoveEventInfo.point.x += h.x, this.lastMoveEventInfo.point.y += h.y) : this.history.length > 0 && (this.history[0].x -= h.x, this.history[0].y -= h.y), this.scrollPositions.set(s, u), Ie.update(this.updatePoint, !0));
  }
  updateHandlers(s) {
    this.handlers = s;
  }
  end() {
    this.removeListeners && this.removeListeners(), this.removeScrollListeners && this.removeScrollListeners(), this.scrollPositions.clear(), Oa(this.updatePoint);
  }
}
function gc(a, s) {
  return s ? { point: s(a.point) } : a;
}
function Yv(a, s) {
  return { x: a.x - s.x, y: a.y - s.y };
}
function Fd({ point: a }, s) {
  return {
    point: a,
    delta: Yv(a, rx(s)),
    offset: Yv(a, pj(s)),
    velocity: gj(s, 0.1)
  };
}
function pj(a) {
  return a[0];
}
function rx(a) {
  return a[a.length - 1];
}
function gj(a, s) {
  if (a.length < 2)
    return { x: 0, y: 0 };
  let l = a.length - 1, r = null;
  const u = rx(a);
  for (; l >= 0 && (r = a[l], !(u.timestamp - r.timestamp > /* @__PURE__ */ wn(s))); )
    l--;
  if (!r)
    return { x: 0, y: 0 };
  r === a[0] && a.length > 2 && u.timestamp - r.timestamp > /* @__PURE__ */ wn(s) * 2 && (r = a[1]);
  const h = /* @__PURE__ */ zn(u.timestamp - r.timestamp);
  if (h === 0)
    return { x: 0, y: 0 };
  const f = {
    x: (u.x - r.x) / h,
    y: (u.y - r.y) / h
  };
  return f.x === 1 / 0 && (f.x = 0), f.y === 1 / 0 && (f.y = 0), f;
}
function yj(a, { min: s, max: l }, r) {
  return s !== void 0 && a < s ? a = r ? nt(s, a, r.min) : Math.max(a, s) : l !== void 0 && a > l && (a = r ? nt(l, a, r.max) : Math.min(a, l)), a;
}
function Xv(a, s, l) {
  return {
    min: s !== void 0 ? a.min + s : void 0,
    max: l !== void 0 ? a.max + l - (a.max - a.min) : void 0
  };
}
function vj(a, { top: s, left: l, bottom: r, right: u }) {
  return {
    x: Xv(a.x, l, u),
    y: Xv(a.y, s, r)
  };
}
function Zv(a, s) {
  let l = s.min - a.min, r = s.max - a.max;
  return s.max - s.min < a.max - a.min && ([l, r] = [r, l]), { min: l, max: r };
}
function bj(a, s) {
  return {
    x: Zv(a.x, s.x),
    y: Zv(a.y, s.y)
  };
}
function xj(a, s) {
  let l = 0.5;
  const r = nn(a), u = nn(s);
  return u > r ? l = /* @__PURE__ */ br(s.min, s.max - r, a.min) : r > u && (l = /* @__PURE__ */ br(a.min, a.max - u, s.min)), ha(0, 1, l);
}
function Sj(a, s) {
  const l = {};
  return s.min !== void 0 && (l.min = s.min - a.min), s.max !== void 0 && (l.max = s.max - a.min), l;
}
const jh = 0.35;
function wj(a = jh) {
  return a === !1 ? a = 0 : a === !0 && (a = jh), {
    x: Kv(a, "left", "right"),
    y: Kv(a, "top", "bottom")
  };
}
function Kv(a, s, l) {
  return {
    min: Qv(a, s),
    max: Qv(a, l)
  };
}
function Qv(a, s) {
  return typeof a == "number" ? a : a[s] || 0;
}
const Tj = /* @__PURE__ */ new WeakMap();
class Cj {
  constructor(s) {
    this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = { x: 0, y: 0 }, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = jt(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = s;
  }
  start(s, { snapToCursor: l = !1, distanceThreshold: r } = {}) {
    const { presenceContext: u } = this.visualElement;
    if (u && u.isPresent === !1)
      return;
    const h = (g) => {
      l && this.snapToCursor(Nr(g).point), this.stopAnimation();
    }, f = (g, S) => {
      const { drag: E, dragPropagation: j, onDragStart: V } = this.getProps();
      if (E && !j && (this.openDragLock && this.openDragLock(), this.openDragLock = XC(E), !this.openDragLock))
        return;
      this.latestPointerEvent = g, this.latestPanInfo = S, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), oa((q) => {
        let L = this.getAxisMotionValue(q).get() || 0;
        if (fa.test(L)) {
          const { projection: K } = this.visualElement;
          if (K && K.layout) {
            const X = K.layout.layoutBox[q];
            X && (L = nn(X) * (parseFloat(L) / 100));
          }
        }
        this.originPoint[q] = L;
      }), V && Ie.update(() => V(g, S), !1, !0), yh(this.visualElement, "transform");
      const { animationState: M } = this.visualElement;
      M && M.setActive("whileDrag", !0);
    }, p = (g, S) => {
      this.latestPointerEvent = g, this.latestPanInfo = S;
      const { dragPropagation: E, dragDirectionLock: j, onDirectionLock: V, onDrag: M } = this.getProps();
      if (!E && !this.openDragLock)
        return;
      const { offset: q } = S;
      if (j && this.currentDirection === null) {
        this.currentDirection = jj(q), this.currentDirection !== null && V && V(this.currentDirection);
        return;
      }
      this.updateAxis("x", S.point, q), this.updateAxis("y", S.point, q), this.visualElement.render(), M && Ie.update(() => M(g, S), !1, !0);
    }, y = (g, S) => {
      this.latestPointerEvent = g, this.latestPanInfo = S, this.stop(g, S), this.latestPointerEvent = null, this.latestPanInfo = null;
    }, v = () => {
      const { dragSnapToOrigin: g } = this.getProps();
      (g || this.constraints) && this.startAnimation({ x: 0, y: 0 });
    }, { dragSnapToOrigin: x } = this.getProps();
    this.panSession = new lx(s, {
      onSessionStart: h,
      onStart: f,
      onMove: p,
      onSessionEnd: y,
      resumeAnimation: v
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin: x,
      distanceThreshold: r,
      contextWindow: sx(this.visualElement),
      element: this.visualElement.current
    });
  }
  /**
   * @internal
   */
  stop(s, l) {
    const r = s || this.latestPointerEvent, u = l || this.latestPanInfo, h = this.isDragging;
    if (this.cancel(), !h || !u || !r)
      return;
    const { velocity: f } = u;
    this.startAnimation(f);
    const { onDragEnd: p } = this.getProps();
    p && Ie.postRender(() => p(r, u));
  }
  /**
   * @internal
   */
  cancel() {
    this.isDragging = !1;
    const { projection: s, animationState: l } = this.visualElement;
    s && (s.isAnimationBlocked = !1), this.endPanSession();
    const { dragPropagation: r } = this.getProps();
    !r && this.openDragLock && (this.openDragLock(), this.openDragLock = null), l && l.setActive("whileDrag", !1);
  }
  /**
   * Clean up the pan session without modifying other drag state.
   * This is used during unmount to ensure event listeners are removed
   * without affecting projection animations or drag locks.
   * @internal
   */
  endPanSession() {
    this.panSession && this.panSession.end(), this.panSession = void 0;
  }
  updateAxis(s, l, r) {
    const { drag: u } = this.getProps();
    if (!r || !yc(s, u, this.currentDirection))
      return;
    const h = this.getAxisMotionValue(s);
    let f = this.originPoint[s] + r[s];
    this.constraints && this.constraints[s] && (f = yj(f, this.constraints[s], this.elastic[s])), h.set(f);
  }
  resolveConstraints() {
    const { dragConstraints: s, dragElastic: l } = this.getProps(), r = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, u = this.constraints;
    s && Fs(s) ? this.constraints || (this.constraints = this.resolveRefConstraints()) : s && r ? this.constraints = vj(r.layoutBox, s) : this.constraints = !1, this.elastic = wj(l), u !== this.constraints && !Fs(s) && r && this.constraints && !this.hasMutatedConstraints && oa((h) => {
      this.constraints !== !1 && this.getAxisMotionValue(h) && (this.constraints[h] = Sj(r.layoutBox[h], this.constraints[h]));
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: s, onMeasureDragConstraints: l } = this.getProps();
    if (!s || !Fs(s))
      return !1;
    const r = s.current, { projection: u } = this.visualElement;
    if (!u || !u.layout)
      return !1;
    u.root && (u.root.scroll = void 0, u.root.updateScroll());
    const h = xE(r, u.root, this.visualElement.getTransformPagePoint());
    let f = bj(u.layout.layoutBox, h);
    if (l) {
      const p = l(yE(f));
      this.hasMutatedConstraints = !!p, p && (f = Ab(p));
    }
    return f;
  }
  startAnimation(s) {
    const { drag: l, dragMomentum: r, dragElastic: u, dragTransition: h, dragSnapToOrigin: f, onDragTransitionEnd: p } = this.getProps(), y = this.constraints || {}, v = oa((x) => {
      if (!yc(x, l, this.currentDirection))
        return;
      let g = y && y[x] || {};
      (f === !0 || f === x) && (g = { min: 0, max: 0 });
      const S = u ? 200 : 1e6, E = u ? 40 : 1e7, j = {
        type: "inertia",
        velocity: r ? s[x] : 0,
        bounceStiffness: S,
        bounceDamping: E,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...h,
        ...g
      };
      return this.startAxisValueAnimation(x, j);
    });
    return Promise.all(v).then(p);
  }
  startAxisValueAnimation(s, l) {
    const r = this.getAxisMotionValue(s);
    return yh(this.visualElement, s), r.start(Ih(s, r, 0, l, this.visualElement, !1));
  }
  stopAnimation() {
    oa((s) => this.getAxisMotionValue(s).stop());
  }
  /**
   * Drag works differently depending on which props are provided.
   *
   * - If _dragX and _dragY are provided, we output the gesture delta directly to those motion values.
   * - Otherwise, we apply the delta to the x/y motion values.
   */
  getAxisMotionValue(s) {
    const l = `_drag${s.toUpperCase()}`, u = this.visualElement.getProps()[l];
    return u || this.visualElement.getValue(s, this.visualElement.latestValues[s] ?? 0);
  }
  snapToCursor(s) {
    oa((l) => {
      const { drag: r } = this.getProps();
      if (!yc(l, r, this.currentDirection))
        return;
      const { projection: u } = this.visualElement, h = this.getAxisMotionValue(l);
      if (u && u.layout) {
        const { min: f, max: p } = u.layout.layoutBox[l], y = h.get() || 0;
        h.set(s[l] - nt(f, p, 0.5) + y);
      }
    });
  }
  /**
   * When the viewport resizes we want to check if the measured constraints
   * have changed and, if so, reposition the element within those new constraints
   * relative to where it was before the resize.
   */
  scalePositionWithinConstraints() {
    if (!this.visualElement.current)
      return;
    const { drag: s, dragConstraints: l } = this.getProps(), { projection: r } = this.visualElement;
    if (!Fs(l) || !r || !this.constraints)
      return;
    this.stopAnimation();
    const u = { x: 0, y: 0 };
    oa((f) => {
      const p = this.getAxisMotionValue(f);
      if (p && this.constraints !== !1) {
        const y = p.get();
        u[f] = xj({ min: y, max: y }, this.constraints[f]);
      }
    });
    const { transformTemplate: h } = this.visualElement.getProps();
    this.visualElement.current.style.transform = h ? h({}, "") : "none", r.root && r.root.updateScroll(), r.updateLayout(), this.constraints = !1, this.resolveConstraints(), oa((f) => {
      if (!yc(f, s, null))
        return;
      const p = this.getAxisMotionValue(f), { min: y, max: v } = this.constraints[f];
      p.set(nt(y, v, u[f]));
    }), this.visualElement.render();
  }
  addListeners() {
    if (!this.visualElement.current)
      return;
    Tj.set(this.visualElement, this);
    const s = this.visualElement.current, l = mr(s, "pointerdown", (v) => {
      const { drag: x, dragListener: g = !0 } = this.getProps(), S = v.target, E = S !== s && PC(S);
      x && g && !E && this.start(v);
    });
    let r;
    const u = () => {
      const { dragConstraints: v } = this.getProps();
      Fs(v) && v.current && (this.constraints = this.resolveRefConstraints(), r || (r = Ej(s, v.current, () => this.scalePositionWithinConstraints())));
    }, { projection: h } = this.visualElement, f = h.addEventListener("measure", u);
    h && !h.layout && (h.root && h.root.updateScroll(), h.updateLayout()), Ie.read(u);
    const p = Tr(window, "resize", () => this.scalePositionWithinConstraints()), y = h.addEventListener("didUpdate", (({ delta: v, hasLayoutChanged: x }) => {
      this.isDragging && x && (oa((g) => {
        const S = this.getAxisMotionValue(g);
        S && (this.originPoint[g] += v[g].translate, S.set(S.get() + v[g].translate));
      }), this.visualElement.render());
    }));
    return () => {
      p(), l(), f(), y && y(), r && r();
    };
  }
  getProps() {
    const s = this.visualElement.getProps(), { drag: l = !1, dragDirectionLock: r = !1, dragPropagation: u = !1, dragConstraints: h = !1, dragElastic: f = jh, dragMomentum: p = !0 } = s;
    return {
      ...s,
      drag: l,
      dragDirectionLock: r,
      dragPropagation: u,
      dragConstraints: h,
      dragElastic: f,
      dragMomentum: p
    };
  }
}
function Fv(a) {
  let s = !0;
  return () => {
    if (s) {
      s = !1;
      return;
    }
    a();
  };
}
function Ej(a, s, l) {
  const r = Wy(a, Fv(l)), u = Wy(s, Fv(l));
  return () => {
    r(), u();
  };
}
function yc(a, s, l) {
  return (s === !0 || s === a) && (l === null || l === a);
}
function jj(a, s = 10) {
  let l = null;
  return Math.abs(a.y) > s ? l = "y" : Math.abs(a.x) > s && (l = "x"), l;
}
class Aj extends xi {
  constructor(s) {
    super(s), this.removeGroupControls = On, this.removeListeners = On, this.controls = new Cj(s);
  }
  mount() {
    const { dragControls: s } = this.node.getProps();
    s && (this.removeGroupControls = s.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || On;
  }
  update() {
    const { dragControls: s } = this.node.getProps(), { dragControls: l } = this.node.prevProps || {};
    s !== l && (this.removeGroupControls(), s && (this.removeGroupControls = s.subscribe(this.controls)));
  }
  unmount() {
    this.removeGroupControls(), this.removeListeners(), this.controls.isDragging || this.controls.endPanSession();
  }
}
const Id = (a) => (s, l) => {
  a && Ie.update(() => a(s, l), !1, !0);
};
class Mj extends xi {
  constructor() {
    super(...arguments), this.removePointerDownListener = On;
  }
  onPointerDown(s) {
    this.session = new lx(s, this.createPanHandlers(), {
      transformPagePoint: this.node.getTransformPagePoint(),
      contextWindow: sx(this.node)
    });
  }
  createPanHandlers() {
    const { onPanSessionStart: s, onPanStart: l, onPan: r, onPanEnd: u } = this.node.getProps();
    return {
      onSessionStart: Id(s),
      onStart: Id(l),
      onMove: Id(r),
      onEnd: (h, f) => {
        delete this.session, u && Ie.postRender(() => u(h, f));
      }
    };
  }
  mount() {
    this.removePointerDownListener = mr(this.node.current, "pointerdown", (s) => this.onPointerDown(s));
  }
  update() {
    this.session && this.session.updateHandlers(this.createPanHandlers());
  }
  unmount() {
    this.removePointerDownListener(), this.session && this.session.end();
  }
}
let Pd = !1;
class Nj extends C.Component {
  /**
   * This only mounts projection nodes for components that
   * need measuring, we might want to do it for all components
   * in order to incorporate transforms
   */
  componentDidMount() {
    const { visualElement: s, layoutGroup: l, switchLayoutGroup: r, layoutId: u } = this.props, { projection: h } = s;
    h && (l.group && l.group.add(h), r && r.register && u && r.register(h), Pd && h.root.didUpdate(), h.addEventListener("animationComplete", () => {
      this.safeToRemove();
    }), h.setOptions({
      ...h.options,
      layoutDependency: this.props.layoutDependency,
      onExitComplete: () => this.safeToRemove()
    })), _c.hasEverUpdated = !0;
  }
  getSnapshotBeforeUpdate(s) {
    const { layoutDependency: l, visualElement: r, drag: u, isPresent: h } = this.props, { projection: f } = r;
    return f && (f.isPresent = h, s.layoutDependency !== l && f.setOptions({
      ...f.options,
      layoutDependency: l
    }), Pd = !0, u || s.layoutDependency !== l || l === void 0 || s.isPresent !== h ? f.willUpdate() : this.safeToRemove(), s.isPresent !== h && (h ? f.promote() : f.relegate() || Ie.postRender(() => {
      const p = f.getStack();
      (!p || !p.members.length) && this.safeToRemove();
    }))), null;
  }
  componentDidUpdate() {
    const { visualElement: s, layoutAnchor: l } = this.props, { projection: r } = s;
    r && (r.options.layoutAnchor = l, r.root.didUpdate(), Wh.postRender(() => {
      !r.currentAnimation && r.isLead() && this.safeToRemove();
    }));
  }
  componentWillUnmount() {
    const { visualElement: s, layoutGroup: l, switchLayoutGroup: r } = this.props, { projection: u } = s;
    Pd = !0, u && (u.scheduleCheckAfterUnmount(), l && l.group && l.group.remove(u), r && r.deregister && r.deregister(u));
  }
  safeToRemove() {
    const { safeToRemove: s } = this.props;
    s && s();
  }
  render() {
    return null;
  }
}
function ox(a) {
  const [s, l] = Fb(), r = C.useContext(vr);
  return d.jsx(Nj, { ...a, layoutGroup: r, switchLayoutGroup: C.useContext(ax), isPresent: s, safeToRemove: l });
}
const kj = {
  pan: {
    Feature: Mj
  },
  drag: {
    Feature: Aj,
    ProjectionNode: Qb,
    MeasureLayout: ox
  }
};
function Iv(a, s, l) {
  const { props: r } = a;
  a.animationState && r.whileHover && a.animationState.setActive("whileHover", l === "Start");
  const u = "onHover" + l, h = r[u];
  h && Ie.postRender(() => h(s, Nr(s)));
}
class Dj extends xi {
  mount() {
    const { current: s } = this.node;
    s && (this.unmount = KC(s, (l, r) => (Iv(this.node, r, "Start"), (u) => Iv(this.node, u, "End"))));
  }
  unmount() {
  }
}
class Rj extends xi {
  constructor() {
    super(...arguments), this.isActive = !1;
  }
  onFocus() {
    let s = !1;
    try {
      s = this.node.current.matches(":focus-visible");
    } catch {
      s = !0;
    }
    !s || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
  }
  onBlur() {
    !this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
  }
  mount() {
    this.unmount = jr(Tr(this.node.current, "focus", () => this.onFocus()), Tr(this.node.current, "blur", () => this.onBlur()));
  }
  unmount() {
  }
}
function Pv(a, s, l) {
  const { props: r } = a;
  if (a.current instanceof HTMLButtonElement && a.current.disabled)
    return;
  a.animationState && r.whileTap && a.animationState.setActive("whileTap", l === "Start");
  const u = "onTap" + (l === "End" ? "" : l), h = r[u];
  h && Ie.postRender(() => h(s, Nr(s)));
}
class _j extends xi {
  mount() {
    const { current: s } = this.node;
    if (!s)
      return;
    const { globalTapTarget: l, propagate: r } = this.node.props;
    this.unmount = $C(s, (u, h) => (Pv(this.node, h, "Start"), (f, { success: p }) => Pv(this.node, f, p ? "End" : "Cancel")), {
      useGlobalTarget: l,
      stopPropagation: r?.tap === !1
    });
  }
  unmount() {
  }
}
const Ah = /* @__PURE__ */ new WeakMap(), Jd = /* @__PURE__ */ new WeakMap(), zj = (a) => {
  const s = Ah.get(a.target);
  s && s(a);
}, Oj = (a) => {
  a.forEach(zj);
};
function Uj({ root: a, ...s }) {
  const l = a || document;
  Jd.has(l) || Jd.set(l, {});
  const r = Jd.get(l), u = JSON.stringify(s);
  return r[u] || (r[u] = new IntersectionObserver(Oj, { root: a, ...s })), r[u];
}
function Vj(a, s, l) {
  const r = Uj(s);
  return Ah.set(a, l), r.observe(a), () => {
    Ah.delete(a), r.unobserve(a);
  };
}
const Lj = {
  some: 0,
  all: 1
};
class Bj extends xi {
  constructor() {
    super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
  }
  startObserver() {
    this.stopObserver?.();
    const { viewport: s = {} } = this.node.getProps(), { root: l, margin: r, amount: u = "some", once: h } = s, f = {
      root: l ? l.current : void 0,
      rootMargin: r,
      threshold: typeof u == "number" ? u : Lj[u]
    }, p = (y) => {
      const { isIntersecting: v } = y;
      if (this.isInView === v || (this.isInView = v, h && !v && this.hasEnteredView))
        return;
      v && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", v);
      const { onViewportEnter: x, onViewportLeave: g } = this.node.getProps(), S = v ? x : g;
      S && S(y);
    };
    this.stopObserver = Vj(this.node.current, f, p);
  }
  mount() {
    this.startObserver();
  }
  update() {
    if (typeof IntersectionObserver > "u")
      return;
    const { props: s, prevProps: l } = this.node;
    ["amount", "margin", "root"].some(Hj(s, l)) && this.startObserver();
  }
  unmount() {
    this.stopObserver?.(), this.hasEnteredView = !1, this.isInView = !1;
  }
}
function Hj({ viewport: a = {} }, { viewport: s = {} } = {}) {
  return (l) => a[l] !== s[l];
}
const qj = {
  inView: {
    Feature: Bj
  },
  tap: {
    Feature: _j
  },
  focus: {
    Feature: Rj
  },
  hover: {
    Feature: Dj
  }
}, Gj = {
  layout: {
    ProjectionNode: Qb,
    MeasureLayout: ox
  }
}, Yj = {
  ...dj,
  ...qj,
  ...kj,
  ...Gj
}, Xj = /* @__PURE__ */ rj(Yj, oj);
function Zj(a, s, l) {
  C.useInsertionEffect(() => a.on(s, l), [a, s, l]);
}
function cx(a) {
  const s = tl(() => es(a)), { isStatic: l } = C.useContext(ts);
  if (l) {
    const [, r] = C.useState(a);
    C.useEffect(() => s.on("change", r), []);
  }
  return s;
}
function ux(a, s) {
  const l = cx(s()), r = () => l.set(s());
  return r(), Er(() => {
    const u = () => Ie.preRender(r, !1, !0), h = a.map((f) => f.on("change", u));
    return () => {
      h.forEach((f) => f()), Oa(r);
    };
  }), l;
}
function Kj(a) {
  dr.current = [], a();
  const s = ux(dr.current, a);
  return dr.current = void 0, s;
}
function Qj(a, s, l, r) {
  if (typeof a == "function")
    return Kj(a);
  const h = oE(s, l, r), f = Array.isArray(a) ? Jv(a, h) : Jv([a], ([y]) => h(y)), p = Array.isArray(a) ? void 0 : a.accelerate;
  return p && !p.isTransformed && typeof s != "function" && Array.isArray(l) && r?.clamp !== !1 && (f.accelerate = {
    ...p,
    times: s,
    keyframes: l,
    isTransformed: !0
  }), f;
}
function Jv(a, s) {
  const l = tl(() => []);
  return ux(a, () => {
    l.length = 0;
    const r = a.length;
    for (let u = 0; u < r; u++)
      l[u] = a[u].get();
    return s(l);
  });
}
function Fj(a, s = {}) {
  const { isStatic: l } = C.useContext(ts), r = () => At(a) ? a.get() : a;
  if (l)
    return Qj(r);
  const u = cx(r());
  return C.useInsertionEffect(() => cE(u, a, s), [u, JSON.stringify(s)]), u;
}
function Ij(a, s = {}) {
  return Fj(a, { type: "spring", ...s });
}
function Pj() {
  !im.current && Cb();
  const [a] = C.useState(qc.current);
  return a;
}
const wt = Xj;
const Jj = (a) => a.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), $j = (a) => a.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (s, l, r) => r ? r.toUpperCase() : l.toLowerCase()
), $v = (a) => {
  const s = $j(a);
  return s.charAt(0).toUpperCase() + s.slice(1);
}, fx = (...a) => a.filter((s, l, r) => !!s && s.trim() !== "" && r.indexOf(s) === l).join(" ").trim(), Wj = (a) => {
  for (const s in a)
    if (s.startsWith("aria-") || s === "role" || s === "title")
      return !0;
};
var eA = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const tA = C.forwardRef(
  ({
    color: a = "currentColor",
    size: s = 24,
    strokeWidth: l = 2,
    absoluteStrokeWidth: r,
    className: u = "",
    children: h,
    iconNode: f,
    ...p
  }, y) => C.createElement(
    "svg",
    {
      ref: y,
      ...eA,
      width: s,
      height: s,
      stroke: a,
      strokeWidth: r ? Number(l) * 24 / Number(s) : l,
      className: fx("lucide", u),
      ...!h && !Wj(p) && { "aria-hidden": "true" },
      ...p
    },
    [
      ...f.map(([v, x]) => C.createElement(v, x)),
      ...Array.isArray(h) ? h : [h]
    ]
  )
);
const ze = (a, s) => {
  const l = C.forwardRef(
    ({ className: r, ...u }, h) => C.createElement(tA, {
      ref: h,
      iconNode: s,
      className: fx(
        `lucide-${Jj($v(a))}`,
        `lucide-${a}`,
        r
      ),
      ...u
    })
  );
  return l.displayName = $v(a), l;
};
const nA = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
], Wv = ze("arrow-down", nA);
const aA = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
], iA = ze("arrow-left", aA);
const sA = [
  ["path", { d: "m21 16-4 4-4-4", key: "f6ql7i" }],
  ["path", { d: "M17 20V4", key: "1ejh1v" }],
  ["path", { d: "m3 8 4-4 4 4", key: "11wl7u" }],
  ["path", { d: "M7 4v16", key: "1glfcx" }]
], e1 = ze("arrow-up-down", sA);
const lA = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
], tu = ze("arrow-up-right", lA);
const rA = [
  ["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }],
  ["path", { d: "M12 19V5", key: "x0mq9r" }]
], t1 = ze("arrow-up", rA);
const oA = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  [
    "path",
    {
      d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
      key: "ruj8y"
    }
  ]
], cA = ze("book-open", oA);
const uA = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z", key: "1fy3hk" }]
], or = ze("bookmark", uA);
const fA = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
], n1 = ze("building-2", fA);
const dA = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
], hA = ze("chart-no-axes-column", dA);
const mA = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], dx = ze("check", mA);
const pA = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], hx = ze("chevron-down", pA);
const gA = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], yA = ze("circle-check", gA);
const vA = [
  ["path", { d: "M10.1 2.182a10 10 0 0 1 3.8 0", key: "5ilxe3" }],
  ["path", { d: "M13.9 21.818a10 10 0 0 1-3.8 0", key: "11zvb9" }],
  ["path", { d: "M17.609 3.721a10 10 0 0 1 2.69 2.7", key: "1iw5b2" }],
  ["path", { d: "M2.182 13.9a10 10 0 0 1 0-3.8", key: "c0bmvh" }],
  ["path", { d: "M20.279 17.609a10 10 0 0 1-2.7 2.69", key: "1ruxm7" }],
  ["path", { d: "M21.818 10.1a10 10 0 0 1 0 3.8", key: "qkgqxc" }],
  ["path", { d: "M3.721 6.391a10 10 0 0 1 2.7-2.69", key: "1mcia2" }],
  ["path", { d: "M6.391 20.279a10 10 0 0 1-2.69-2.7", key: "1fvljs" }]
], bA = ze("circle-dashed", vA);
const xA = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
ze("circle-help", xA);
const SA = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
], wA = ze("circle-x", SA);
const TA = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 14.5 16", key: "1pcbox" }]
], CA = ze("clock-5", TA);
const EA = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
], jA = ze("columns-3", EA);
const AA = [
  ["path", { d: "M16 2v2", key: "scm5qe" }],
  ["path", { d: "M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2", key: "1waht3" }],
  ["path", { d: "M8 2v2", key: "pbkmx" }],
  ["circle", { cx: "12", cy: "11", r: "3", key: "itu57m" }],
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", key: "12vinp" }]
], MA = ze("contact", AA);
const NA = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
], kA = ze("copy", NA);
const DA = [
  ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
  ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
], RA = ze("credit-card", DA);
const _A = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
], zA = ze("download", _A);
const OA = [
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m3 15 2 2 4-4", key: "1lhrkk" }]
], UA = ze("file-check-2", OA);
const VA = [
  ["path", { d: "M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4", key: "1pf5j1" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "m5 12-3 3 3 3", key: "oke12k" }],
  ["path", { d: "m9 18 3-3-3-3", key: "112psh" }]
], LA = ze("file-code-2", VA);
const BA = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], HA = ze("file-text", BA);
const qA = [
  ["path", { d: "M12 10v6", key: "1bos4e" }],
  ["path", { d: "M9 13h6", key: "1uhe8q" }],
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360"
    }
  ]
], GA = ze("folder-plus", qA);
const YA = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
], XA = ze("funnel", YA);
const ZA = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], KA = ze("info", ZA);
const QA = [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
], cm = ze("layers", QA);
const FA = [
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }],
  ["path", { d: "M13 6h8", key: "15sg57" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 18h8", key: "oe0vm4" }]
], IA = ze("list-checks", FA);
const PA = [
  ["circle", { cx: "12", cy: "16", r: "1", key: "1au0dj" }],
  ["rect", { x: "3", y: "10", width: "18", height: "12", rx: "2", key: "6s8ecr" }],
  ["path", { d: "M7 10V7a5 5 0 0 1 10 0v3", key: "1pqi11" }]
], a1 = ze("lock-keyhole", PA);
const JA = [
  ["path", { d: "M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z", key: "p1xzt8" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1", key: "1cx29u" }]
];
ze("messages-square", JA);
const $A = [
  ["path", { d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18" }]
], WA = ze("moon", $A);
const eM = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], $d = ze("plus", eM);
const tM = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], nM = ze("refresh-cw", tM);
const aM = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m16 16-1.9-1.9", key: "1dq9hf" }]
], iM = ze("scan-search", aM);
const sM = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], i1 = ze("search", sM);
const lM = [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
], rM = ze("sliders-horizontal", lM);
const oM = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
], cM = ze("sun", oM);
const uM = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
], um = ze("target", uM);
const fM = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], dM = ze("triangle-alert", fM);
const hM = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], mM = ze("users", hM);
const pM = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], ir = ze("x", pM);
function mx(a) {
  var s, l, r = "";
  if (typeof a == "string" || typeof a == "number") r += a;
  else if (typeof a == "object") if (Array.isArray(a)) {
    var u = a.length;
    for (s = 0; s < u; s++) a[s] && (l = mx(a[s])) && (r && (r += " "), r += l);
  } else for (l in a) a[l] && (r && (r += " "), r += l);
  return r;
}
function px() {
  for (var a, s, l = 0, r = "", u = arguments.length; l < u; l++) (a = arguments[l]) && (s = mx(a)) && (r && (r += " "), r += s);
  return r;
}
const gM = (a, s) => {
  const l = new Array(a.length + s.length);
  for (let r = 0; r < a.length; r++)
    l[r] = a[r];
  for (let r = 0; r < s.length; r++)
    l[a.length + r] = s[r];
  return l;
}, yM = (a, s) => ({
  classGroupId: a,
  validator: s
}), gx = (a = /* @__PURE__ */ new Map(), s = null, l) => ({
  nextPart: a,
  validators: s,
  classGroupId: l
}), Kc = "-", s1 = [], vM = "arbitrary..", bM = (a) => {
  const s = SM(a), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: r
  } = a;
  return {
    getClassGroupId: (f) => {
      if (f.startsWith("[") && f.endsWith("]"))
        return xM(f);
      const p = f.split(Kc), y = p[0] === "" && p.length > 1 ? 1 : 0;
      return yx(p, y, s);
    },
    getConflictingClassGroupIds: (f, p) => {
      if (p) {
        const y = r[f], v = l[f];
        return y ? v ? gM(v, y) : y : v || s1;
      }
      return l[f] || s1;
    }
  };
}, yx = (a, s, l) => {
  if (a.length - s === 0)
    return l.classGroupId;
  const u = a[s], h = l.nextPart.get(u);
  if (h) {
    const v = yx(a, s + 1, h);
    if (v) return v;
  }
  const f = l.validators;
  if (f === null)
    return;
  const p = s === 0 ? a.join(Kc) : a.slice(s).join(Kc), y = f.length;
  for (let v = 0; v < y; v++) {
    const x = f[v];
    if (x.validator(p))
      return x.classGroupId;
  }
}, xM = (a) => a.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const s = a.slice(1, -1), l = s.indexOf(":"), r = s.slice(0, l);
  return r ? vM + r : void 0;
})(), SM = (a) => {
  const {
    theme: s,
    classGroups: l
  } = a;
  return wM(l, s);
}, wM = (a, s) => {
  const l = gx();
  for (const r in a) {
    const u = a[r];
    fm(u, l, r, s);
  }
  return l;
}, fm = (a, s, l, r) => {
  const u = a.length;
  for (let h = 0; h < u; h++) {
    const f = a[h];
    TM(f, s, l, r);
  }
}, TM = (a, s, l, r) => {
  if (typeof a == "string") {
    CM(a, s, l);
    return;
  }
  if (typeof a == "function") {
    EM(a, s, l, r);
    return;
  }
  jM(a, s, l, r);
}, CM = (a, s, l) => {
  const r = a === "" ? s : vx(s, a);
  r.classGroupId = l;
}, EM = (a, s, l, r) => {
  if (AM(a)) {
    fm(a(r), s, l, r);
    return;
  }
  s.validators === null && (s.validators = []), s.validators.push(yM(l, a));
}, jM = (a, s, l, r) => {
  const u = Object.entries(a), h = u.length;
  for (let f = 0; f < h; f++) {
    const [p, y] = u[f];
    fm(y, vx(s, p), l, r);
  }
}, vx = (a, s) => {
  let l = a;
  const r = s.split(Kc), u = r.length;
  for (let h = 0; h < u; h++) {
    const f = r[h];
    let p = l.nextPart.get(f);
    p || (p = gx(), l.nextPart.set(f, p)), l = p;
  }
  return l;
}, AM = (a) => "isThemeGetter" in a && a.isThemeGetter === !0, MM = (a) => {
  if (a < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let s = 0, l = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  const u = (h, f) => {
    l[h] = f, s++, s > a && (s = 0, r = l, l = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(h) {
      let f = l[h];
      if (f !== void 0)
        return f;
      if ((f = r[h]) !== void 0)
        return u(h, f), f;
    },
    set(h, f) {
      h in l ? l[h] = f : u(h, f);
    }
  };
}, Mh = "!", l1 = ":", NM = [], r1 = (a, s, l, r, u) => ({
  modifiers: a,
  hasImportantModifier: s,
  baseClassName: l,
  maybePostfixModifierPosition: r,
  isExternal: u
}), kM = (a) => {
  const {
    prefix: s,
    experimentalParseClassName: l
  } = a;
  let r = (u) => {
    const h = [];
    let f = 0, p = 0, y = 0, v;
    const x = u.length;
    for (let V = 0; V < x; V++) {
      const M = u[V];
      if (f === 0 && p === 0) {
        if (M === l1) {
          h.push(u.slice(y, V)), y = V + 1;
          continue;
        }
        if (M === "/") {
          v = V;
          continue;
        }
      }
      M === "[" ? f++ : M === "]" ? f-- : M === "(" ? p++ : M === ")" && p--;
    }
    const g = h.length === 0 ? u : u.slice(y);
    let S = g, E = !1;
    g.endsWith(Mh) ? (S = g.slice(0, -1), E = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      g.startsWith(Mh) && (S = g.slice(1), E = !0)
    );
    const j = v && v > y ? v - y : void 0;
    return r1(h, E, S, j);
  };
  if (s) {
    const u = s + l1, h = r;
    r = (f) => f.startsWith(u) ? h(f.slice(u.length)) : r1(NM, !1, f, void 0, !0);
  }
  if (l) {
    const u = r;
    r = (h) => l({
      className: h,
      parseClassName: u
    });
  }
  return r;
}, DM = (a) => {
  const s = /* @__PURE__ */ new Map();
  return a.orderSensitiveModifiers.forEach((l, r) => {
    s.set(l, 1e6 + r);
  }), (l) => {
    const r = [];
    let u = [];
    for (let h = 0; h < l.length; h++) {
      const f = l[h], p = f[0] === "[", y = s.has(f);
      p || y ? (u.length > 0 && (u.sort(), r.push(...u), u = []), r.push(f)) : u.push(f);
    }
    return u.length > 0 && (u.sort(), r.push(...u)), r;
  };
}, RM = (a) => ({
  cache: MM(a.cacheSize),
  parseClassName: kM(a),
  sortModifiers: DM(a),
  postfixLookupClassGroupIds: _M(a),
  ...bM(a)
}), _M = (a) => {
  const s = /* @__PURE__ */ Object.create(null), l = a.postfixLookupClassGroups;
  if (l)
    for (let r = 0; r < l.length; r++)
      s[l[r]] = !0;
  return s;
}, zM = /\s+/, OM = (a, s) => {
  const {
    parseClassName: l,
    getClassGroupId: r,
    getConflictingClassGroupIds: u,
    sortModifiers: h,
    postfixLookupClassGroupIds: f
  } = s, p = [], y = a.trim().split(zM);
  let v = "";
  for (let x = y.length - 1; x >= 0; x -= 1) {
    const g = y[x], {
      isExternal: S,
      modifiers: E,
      hasImportantModifier: j,
      baseClassName: V,
      maybePostfixModifierPosition: M
    } = l(g);
    if (S) {
      v = g + (v.length > 0 ? " " + v : v);
      continue;
    }
    let q = !!M, L;
    if (q) {
      const Q = V.substring(0, M);
      L = r(Q);
      const D = L && f[L] ? r(V) : void 0;
      D && D !== L && (L = D, q = !1);
    } else
      L = r(V);
    if (!L) {
      if (!q) {
        v = g + (v.length > 0 ? " " + v : v);
        continue;
      }
      if (L = r(V), !L) {
        v = g + (v.length > 0 ? " " + v : v);
        continue;
      }
      q = !1;
    }
    const K = E.length === 0 ? "" : E.length === 1 ? E[0] : h(E).join(":"), X = j ? K + Mh : K, ee = X + L;
    if (p.indexOf(ee) > -1)
      continue;
    p.push(ee);
    const oe = u(L, q);
    for (let Q = 0; Q < oe.length; ++Q) {
      const D = oe[Q];
      p.push(X + D);
    }
    v = g + (v.length > 0 ? " " + v : v);
  }
  return v;
}, UM = (...a) => {
  let s = 0, l, r, u = "";
  for (; s < a.length; )
    (l = a[s++]) && (r = bx(l)) && (u && (u += " "), u += r);
  return u;
}, bx = (a) => {
  if (typeof a == "string")
    return a;
  let s, l = "";
  for (let r = 0; r < a.length; r++)
    a[r] && (s = bx(a[r])) && (l && (l += " "), l += s);
  return l;
}, VM = (a, ...s) => {
  let l, r, u, h;
  const f = (y) => {
    const v = s.reduce((x, g) => g(x), a());
    return l = RM(v), r = l.cache.get, u = l.cache.set, h = p, p(y);
  }, p = (y) => {
    const v = r(y);
    if (v)
      return v;
    const x = OM(y, l);
    return u(y, x), x;
  };
  return h = f, (...y) => h(UM(...y));
}, LM = [], Et = (a) => {
  const s = (l) => l[a] || LM;
  return s.isThemeGetter = !0, s.themeKey = a, s;
}, xx = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Sx = /^\((?:(\w[\w-]*):)?(.+)\)$/i, BM = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, HM = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, qM = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, GM = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, YM = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, XM = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, hi = (a) => BM.test(a), Ve = (a) => !!a && !Number.isNaN(Number(a)), ra = (a) => !!a && Number.isInteger(Number(a)), Wd = (a) => a.endsWith("%") && Ve(a.slice(0, -1)), _a = (a) => HM.test(a), wx = () => !0, ZM = (a) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  qM.test(a) && !GM.test(a)
), dm = () => !1, KM = (a) => YM.test(a), QM = (a) => XM.test(a), FM = (a) => !fe(a) && !de(a), IM = (a) => a.startsWith("@container") && (a[10] === "/" && a[11] !== void 0 || a[11] === "s" && a[16] !== void 0 && a.startsWith("-size/", 10) || a[11] === "n" && a[18] !== void 0 && a.startsWith("-normal/", 10)), PM = (a) => Si(a, Ex, dm), fe = (a) => xx.test(a), Ki = (a) => Si(a, jx, ZM), o1 = (a) => Si(a, i4, Ve), JM = (a) => Si(a, Mx, wx), $M = (a) => Si(a, Ax, dm), c1 = (a) => Si(a, Tx, dm), WM = (a) => Si(a, Cx, QM), vc = (a) => Si(a, Nx, KM), de = (a) => Sx.test(a), sr = (a) => ns(a, jx), e4 = (a) => ns(a, Ax), u1 = (a) => ns(a, Tx), t4 = (a) => ns(a, Ex), n4 = (a) => ns(a, Cx), bc = (a) => ns(a, Nx, !0), a4 = (a) => ns(a, Mx, !0), Si = (a, s, l) => {
  const r = xx.exec(a);
  return r ? r[1] ? s(r[1]) : l(r[2]) : !1;
}, ns = (a, s, l = !1) => {
  const r = Sx.exec(a);
  return r ? r[1] ? s(r[1]) : l : !1;
}, Tx = (a) => a === "position" || a === "percentage", Cx = (a) => a === "image" || a === "url", Ex = (a) => a === "length" || a === "size" || a === "bg-size", jx = (a) => a === "length", i4 = (a) => a === "number", Ax = (a) => a === "family-name", Mx = (a) => a === "number" || a === "weight", Nx = (a) => a === "shadow", s4 = () => {
  const a = Et("color"), s = Et("font"), l = Et("text"), r = Et("font-weight"), u = Et("tracking"), h = Et("leading"), f = Et("breakpoint"), p = Et("container"), y = Et("spacing"), v = Et("radius"), x = Et("shadow"), g = Et("inset-shadow"), S = Et("text-shadow"), E = Et("drop-shadow"), j = Et("blur"), V = Et("perspective"), M = Et("aspect"), q = Et("ease"), L = Et("animate"), K = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], X = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], ee = () => [...X(), de, fe], oe = () => ["auto", "hidden", "clip", "visible", "scroll"], Q = () => ["auto", "contain", "none"], D = () => [de, fe, y], W = () => [hi, "full", "auto", ...D()], te = () => [ra, "none", "subgrid", de, fe], Ae = () => ["auto", {
    span: ["full", ra, de, fe]
  }, ra, de, fe], Ce = () => [ra, "auto", de, fe], Te = () => ["auto", "min", "max", "fr", de, fe], Ee = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ce = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], Z = () => ["auto", ...D()], $ = () => [hi, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...D()], ne = () => [p, hi, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...D()], he = () => [hi, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...D()], P = () => [a, de, fe], Ye = () => [...X(), u1, c1, {
    position: [de, fe]
  }], ut = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ke = () => ["auto", "cover", "contain", t4, PM, {
    size: [de, fe]
  }], T = () => [Wd, sr, Ki], H = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    v,
    de,
    fe
  ], ae = () => ["", Ve, sr, Ki], me = () => ["solid", "dashed", "dotted", "double"], Ne = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], xe = () => [Ve, Wd, u1, c1], Me = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    j,
    de,
    fe
  ], le = () => ["none", Ve, de, fe], Se = () => ["none", Ve, de, fe], Tt = () => [Ve, de, fe], Rt = () => [hi, "full", ...D()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [_a],
      breakpoint: [_a],
      color: [wx],
      container: [_a],
      "drop-shadow": [_a],
      ease: ["in", "out", "in-out"],
      font: [FM],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [_a],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [_a],
      shadow: [_a],
      spacing: ["px", Ve],
      text: [_a],
      "text-shadow": [_a],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", hi, fe, de, M]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", de, fe]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [IM],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Ve, "auto", fe, de, p]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": K()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": K()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: ee()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: oe()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": oe()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": oe()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: Q()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": Q()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": Q()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: W()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": W()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": W()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": W(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: W()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": W(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: W()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": W()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": W()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: W()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: W()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: W()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: W()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [ra, "auto", de, fe]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [hi, "full", "auto", p, ...D()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Ve, hi, "auto", "initial", "none", fe]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Ve, de, fe]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Ve, de, fe]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ra, "first", "last", "none", de, fe]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": te()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: Ae()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Ce()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Ce()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": te()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: Ae()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Ce()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Ce()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Te()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Te()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: D()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": D()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": D()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Ee(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ce(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ce()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Ee()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ce(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ce(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Ee()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ce(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ce()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: D()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: D()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: D()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: D()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: D()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: D()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: D()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: D()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: D()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: D()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: D()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: Z()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: Z()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: Z()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: Z()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: Z()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: Z()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: Z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: Z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: Z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: Z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: Z()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": D()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": D()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: $()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...ne()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...ne()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...ne()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...he()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...he()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...he()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [p, "screen", ...$()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          p,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...$()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          p,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [f]
          },
          ...$()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...$()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...$()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...$()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", l, sr, Ki]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, a4, JM]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Wd, fe]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [e4, $M, s]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [fe]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [u, de, fe]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Ve, "none", de, o1]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          h,
          ...D()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", de, fe]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", de, fe]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: P()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: P()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...me(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Ve, "from-font", "auto", de, Ki]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: P()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Ve, "auto", de, fe]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: D()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [ra, de, fe]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", de, fe]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", de, fe]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: Ye()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ut()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ke()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ra, de, fe],
          radial: ["", de, fe],
          conic: ["", ra, de, fe]
        }, n4, WM]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: P()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: T()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: T()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: T()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: P()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: P()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: P()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: H()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": H()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": H()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": H()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": H()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": H()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": H()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": H()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": H()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": H()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": H()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": H()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": H()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": H()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": H()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: ae()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": ae()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": ae()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": ae()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": ae()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": ae()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": ae()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": ae()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": ae()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": ae()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": ae()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": ae()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": ae()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...me(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...me(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: P()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": P()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": P()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": P()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": P()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": P()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": P()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": P()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": P()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": P()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": P()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: P()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...me(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Ve, de, fe]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Ve, sr, Ki]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: P()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          x,
          bc,
          vc
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: P()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", g, bc, vc]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": P()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: ae()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: P()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Ve, Ki]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": P()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": ae()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": P()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", S, bc, vc]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": P()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Ve, de, fe]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...Ne(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": Ne()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Ve]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": xe()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": xe()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": xe()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": xe()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": xe()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": xe()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": xe()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": xe()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": xe()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": xe()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": xe()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": xe()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": xe()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": xe()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [de, fe]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": xe()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": xe()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": X()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Ve]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": xe()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": xe()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": P()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: Ye()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ut()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ke()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", de, fe]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          de,
          fe
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Me()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Ve, de, fe]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Ve, de, fe]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          E,
          bc,
          vc
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": P()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Ve, de, fe]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Ve, de, fe]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Ve, de, fe]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Ve, de, fe]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Ve, de, fe]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          de,
          fe
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Me()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Ve, de, fe]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Ve, de, fe]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Ve, de, fe]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Ve, de, fe]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Ve, de, fe]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Ve, de, fe]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Ve, de, fe]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Ve, de, fe]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": D()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": D()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": D()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", de, fe]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Ve, "initial", de, fe]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", q, de, fe]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Ve, de, fe]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", L, de, fe]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [V, de, fe]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": ee()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: le()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": le()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": le()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": le()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Se()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Se()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Se()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Se()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: Tt()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Tt()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Tt()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [de, fe, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ee()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Rt()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Rt()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Rt()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Rt()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [ra, de, fe]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: P()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: P()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", de, fe]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": P()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": P()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": D()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": D()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": D()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": D()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": D()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": D()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": D()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": D()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": D()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": D()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": D()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": D()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": D()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": D()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": D()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": D()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": D()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": D()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": D()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": D()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": D()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": D()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", de, fe]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...P()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Ve, sr, Ki, o1]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...P()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, l4 = /* @__PURE__ */ VM(s4);
function ye(...a) {
  return l4(px(a));
}
function kx(a, s, l = 50) {
  const [r, u] = C.useState({ key: s, count: l });
  r.key !== s && u({ key: s, count: l });
  const h = Math.min(a, r.key === s ? r.count : l), f = C.useCallback(() => u((p) => ({
    key: s,
    count: Math.min(a, (p.key === s ? p.count : l) + l)
  })), [a, s, l, h]);
  return { count: h, loadMore: f, hasMore: h < a };
}
function Dx({ hasMore: a, onLoad: s }) {
  const l = C.useRef(null);
  return C.useEffect(() => {
    if (!a || !l.current || !("IntersectionObserver" in window)) return;
    const r = new IntersectionObserver((u) => {
      u.some((h) => h.isIntersecting) && (r.disconnect(), s());
    }, { rootMargin: "160px 0px" });
    return r.observe(l.current), () => r.disconnect();
  }, [a, s]), /* @__PURE__ */ d.jsx("div", { ref: l, className: "infinite-rows", children: a ? /* @__PURE__ */ d.jsx("button", { onClick: s, children: "Load more rows" }) : /* @__PURE__ */ d.jsx("span", { children: "All rows loaded" }) });
}
function kr({ children: a, ...s }) {
  return /* @__PURE__ */ d.jsx("svg", { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", ...s, children: a });
}
function Rx({ children: a, ...s }) {
  return /* @__PURE__ */ d.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      ...s,
      children: a
    }
  );
}
function f1(a) {
  return /* @__PURE__ */ d.jsx(kr, { ...a, children: /* @__PURE__ */ d.jsx(
    "path",
    {
      transform: "translate(6, 7)",
      d: "M4.869,9.631 C4.811,9.574 4.563,9.361 4.359,9.162 C3.076,7.997 0.976,4.958 0.335,3.367 C0.232,3.125 0.014,2.514 0,2.188 C0,1.875 0.072,1.577 0.218,1.293 C0.422,0.938 0.743,0.654 1.122,0.498 C1.385,0.397 2.172,0.242 2.186,0.242 C3.047,0.086 4.446,0 5.992,0 C7.465,0 8.807,0.086 9.681,0.213 C9.695,0.228 10.673,0.384 11.008,0.554 C11.62,0.867 12,1.478 12,2.132 L12,2.188 C11.985,2.614 11.605,3.509 11.591,3.509 C10.949,5.014 8.952,7.983 7.625,9.177 C7.625,9.177 7.284,9.513 7.071,9.659 C6.765,9.887 6.386,10 6.007,10 C5.584,10 5.19,9.872 4.869,9.631"
    }
  ) });
}
function r4(a) {
  return /* @__PURE__ */ d.jsxs(Rx, { ...a, children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "11.7666", cy: "11.7666", r: "8.98856" }),
    /* @__PURE__ */ d.jsx("path", { d: "M18.0183 18.4851L21.5423 22" })
  ] });
}
function o4(a) {
  return /* @__PURE__ */ d.jsx(Rx, { ...a, children: /* @__PURE__ */ d.jsx("path", { d: "M6 6l12 12M18 6L6 18" }) });
}
function c4(a) {
  return /* @__PURE__ */ d.jsx(kr, { ...a, children: /* @__PURE__ */ d.jsx(
    "path",
    {
      transform: "translate(2, 2)",
      d: "M14.34,0 C17.73,0 20,2.38 20,5.92 L20,5.92 L20,14.091 C20,17.621 17.73,20 14.34,20 L14.34,20 L5.67,20 C2.28,20 0,17.621 0,14.091 L0,14.091 L0,5.92 C0,2.38 2.28,0 5.67,0 L5.67,0 Z M13.01,6.971 C12.67,6.63 12.12,6.63 11.77,6.971 L11.77,6.971 L10,8.75 L8.22,6.971 C7.87,6.63 7.32,6.63 6.98,6.971 C6.64,7.311 6.64,7.871 6.98,8.21 L6.98,8.21 L8.76,9.991 L6.98,11.761 C6.64,12.111 6.64,12.661 6.98,13 C7.15,13.17 7.38,13.261 7.6,13.261 C7.83,13.261 8.05,13.17 8.22,13 L8.22,13 L10,11.231 L11.78,13 C11.95,13.181 12.17,13.261 12.39,13.261 C12.62,13.261 12.84,13.17 13.01,13 C13.35,12.661 13.35,12.111 13.01,11.771 L13.01,11.771 L11.23,9.991 L13.01,8.21 C13.35,7.871 13.35,7.311 13.01,6.971 Z"
    }
  ) });
}
function u4(a) {
  return /* @__PURE__ */ d.jsx(kr, { ...a, children: /* @__PURE__ */ d.jsx(
    "path",
    {
      transform: "translate(3, 2)",
      d: "M13.191,0 C16.28,0 18,1.78 18,4.83 L18,4.83 L18,15.16 C18,18.26 16.28,20 13.191,20 L13.191,20 L4.81,20 C1.77,20 0,18.26 0,15.16 L0,15.16 L0,4.83 C0,1.78 1.77,0 4.81,0 L4.81,0 Z M5.08,13.74 C4.78,13.71 4.49,13.85 4.33,14.11 C4.17,14.36 4.17,14.69 4.33,14.95 C4.49,15.2 4.78,15.35 5.08,15.31 L5.08,15.31 L12.92,15.31 C13.319,15.27 13.62,14.929 13.62,14.53 C13.62,14.12 13.319,13.78 12.92,13.74 L12.92,13.74 Z M12.92,9.179 L5.08,9.179 C4.649,9.179 4.3,9.53 4.3,9.96 C4.3,10.39 4.649,10.74 5.08,10.74 L5.08,10.74 L12.92,10.74 C13.35,10.74 13.7,10.39 13.7,9.96 C13.7,9.53 13.35,9.179 12.92,9.179 L12.92,9.179 Z M8.069,4.65 L5.08,4.65 L5.08,4.66 C4.649,4.66 4.3,5.01 4.3,5.44 C4.3,5.87 4.649,6.22 5.08,6.22 L5.08,6.22 L8.069,6.22 C8.5,6.22 8.85,5.87 8.85,5.429 C8.85,5 8.5,4.65 8.069,4.65 L8.069,4.65 Z"
    }
  ) });
}
function f4(a) {
  return /* @__PURE__ */ d.jsxs(kr, { ...a, children: [
    /* @__PURE__ */ d.jsx("path", { d: "M15.565,6.686 C15.709,6.686 15.825,6.57 15.825,6.426 C15.825,4.076 14.315,2.496 12.055,2.496 L6.285,2.496 C4.025,2.496 2.505,4.076 2.505,6.426 L2.505,11.866 C2.505,14.226 4.025,15.806 6.285,15.806 L6.375,15.806 C6.541,15.806 6.675,15.672 6.675,15.506 L6.675,12.126 C6.675,8.976 8.895,6.686 11.945,6.686 L15.565,6.686 Z" }),
    /* @__PURE__ */ d.jsx("path", { d: "M17.722,8.186 L11.949,8.186 C9.691,8.186 8.175,9.77 8.175,12.126 L8.175,17.565 C8.175,19.921 9.691,21.505 11.949,21.505 L17.721,21.505 C19.978,21.505 21.495,19.921 21.495,17.565 L21.495,12.126 C21.495,9.77 19.979,8.186 17.722,8.186 Z" })
  ] });
}
function d4(a) {
  return /* @__PURE__ */ d.jsx(kr, { ...a, children: /* @__PURE__ */ d.jsx(
    "path",
    {
      transform: "translate(2, 2)",
      d: "M14.34,0 C17.73,0 20,2.38 20,5.92 L20,14.091 C20,17.62 17.73,20 14.34,20 L5.67,20 C2.28,20 0,17.62 0,14.091 L0,5.92 C0,2.38 2.28,0 5.67,0 L14.34,0 Z M14.18,7 C13.84,6.66 13.28,6.66 12.94,7 L8.81,11.13 L7.06,9.38 C6.72,9.04 6.16,9.04 5.82,9.38 C5.48,9.72 5.48,10.27 5.82,10.62 L8.2,12.99 C8.37,13.16 8.59,13.24 8.81,13.24 C9.04,13.24 9.26,13.16 9.43,12.99 L14.18,8.24 C14.52,7.9 14.52,7.35 14.18,7 Z"
    }
  ) });
}
const zc = { type: "spring", stiffness: 300, damping: 30 }, pr = { type: "spring", stiffness: 500, damping: 28 }, $s = { type: "spring", duration: 0.3, bounce: 0 }, h4 = { type: "spring", stiffness: 260, damping: 20 }, gi = "transition-[transform,color,background-color,opacity,border-color] duration-150 ease-out active:scale-[0.96]", m4 = { duration: 0.18, ease: "easeOut" }, p4 = { duration: 0.42, ease: [0.32, 0, 0.67, 0] }, g4 = 0.06, Kt = { duration: 0 }, pi = "focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-neutral-950 dark:focus-visible:ring-neutral-300", y4 = "ease-[cubic-bezier(0.2,0,0,1)]", v4 = {
  // 13px is off the type scale on purpose: at `text-xs` a dense table stops
  // being readable, and at `text-sm` it stops being dense.
  compact: { head: "h-9", cell: "py-1.5", text: "text-[13px]", pad: "px-3" },
  default: { head: "h-11", cell: "py-2.5", text: "text-sm", pad: "px-4" },
  relaxed: { head: "h-12", cell: "py-4", text: "text-sm", pad: "px-5" }
}, b4 = {
  default: {
    frame: "rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
    head: "bg-neutral-50 dark:bg-neutral-900",
    headRule: "border-b border-neutral-200 dark:border-neutral-800",
    divider: "border-t border-neutral-100 dark:border-neutral-900",
    rowFill: "bg-white dark:bg-neutral-950",
    stripe: "",
    cell: ""
  },
  bordered: {
    frame: "rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
    head: "bg-neutral-50 dark:bg-neutral-900",
    headRule: "border-b border-neutral-200 dark:border-neutral-800",
    divider: "border-t border-neutral-200 dark:border-neutral-800",
    rowFill: "bg-white dark:bg-neutral-950",
    stripe: "",
    cell: "border-s border-neutral-200 first:border-s-0 dark:border-neutral-800"
  },
  striped: {
    frame: "rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
    head: "bg-white dark:bg-neutral-950",
    headRule: "border-b border-neutral-200 dark:border-neutral-800",
    divider: "",
    rowFill: "bg-white dark:bg-neutral-950",
    stripe: "bg-neutral-50 dark:bg-neutral-900",
    cell: ""
  },
  minimal: {
    frame: "bg-transparent",
    head: "bg-transparent",
    headPinned: "bg-white dark:bg-neutral-950",
    headRule: "border-b border-neutral-200 dark:border-neutral-800",
    divider: "border-t border-neutral-100 dark:border-neutral-900",
    // No frame to sit on, so no fill either.
    rowFill: "bg-transparent",
    stripe: "",
    cell: ""
  },
  panel: {
    frame: "rounded-2xl bg-white shadow-[0_1px_2px_-1px_rgba(0,0,0,0.06),0_2px_4px_0_rgba(0,0,0,0.04)] ring-1 ring-neutral-950/8 dark:bg-neutral-950 dark:shadow-none dark:ring-white/10",
    head: "bg-neutral-50 dark:bg-neutral-900",
    headRule: "border-b border-neutral-200 dark:border-neutral-800",
    divider: "border-t border-neutral-100 dark:border-neutral-900",
    rowFill: "bg-white dark:bg-neutral-950",
    stripe: "",
    cell: ""
  }
}, eh = {
  start: "text-start",
  center: "text-center",
  end: "text-end"
}, xc = 40, th = 48, Qi = 72, Sc = {
  sm: "hidden sm:table-cell",
  md: "hidden md:table-cell",
  lg: "hidden lg:table-cell"
};
function Nh(a) {
  return a == null || a === "";
}
function x4(a, s) {
  return a instanceof Date && s instanceof Date ? a.getTime() - s.getTime() : typeof a == "number" && typeof s == "number" ? a - s : typeof a == "boolean" && typeof s == "boolean" ? Number(a) - Number(s) : String(a).localeCompare(String(s), void 0, { numeric: !0, sensitivity: "base" });
}
function mi(a, s) {
  if (a)
    return a.value ? a.value(s) : s[a.id];
}
function lr(a) {
  return Nh(a) ? "" : a instanceof Date ? a.toISOString().slice(0, 10) : String(a);
}
function S4({
  value: a,
  format: s,
  instant: l
}) {
  const r = C.useRef(null), u = Ij(a, { stiffness: 260, damping: 30 });
  return C.useEffect(() => {
    l ? u.jump(a) : u.set(a);
  }, [a, l, u]), Zj(u, "change", (h) => {
    r.current && (r.current.textContent = s(h));
  }), /* @__PURE__ */ d.jsx("span", { ref: r, children: s(a) });
}
function d1({
  active: a,
  onClick: s,
  label: l,
  count: r,
  plain: u = !1,
  layoutId: h,
  motionOn: f
}) {
  return /* @__PURE__ */ d.jsxs(
    "button",
    {
      type: "button",
      "aria-pressed": a,
      onClick: s,
      className: ye(
        "relative flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium",
        gi,
        u && "capitalize",
        a ? "text-neutral-100 dark:text-neutral-900" : "text-neutral-500 hover:bg-neutral-900/[0.04] hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-100/[0.06] dark:hover:text-neutral-100",
        pi
      ),
      children: [
        a && (f ? /* @__PURE__ */ d.jsx(
          wt.span,
          {
            layoutId: h,
            className: "absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100",
            transition: zc
          }
        ) : /* @__PURE__ */ d.jsx("span", { className: "absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100" })),
        /* @__PURE__ */ d.jsx("span", { className: "relative z-10", children: l }),
        /* @__PURE__ */ d.jsx(
          "span",
          {
            className: ye(
              "relative z-10 tabular-nums",
              a ? "opacity-60" : "text-neutral-400 dark:text-neutral-600"
            ),
            children: r
          }
        )
      ]
    }
  );
}
function w4({ value: a, instant: s }) {
  return /* @__PURE__ */ d.jsx("span", { className: "relative inline-flex overflow-hidden", children: /* @__PURE__ */ d.jsx(Ii, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ d.jsx(
    wt.span,
    {
      className: "inline-block tabular-nums",
      initial: s ? !1 : { y: 8, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: s ? { opacity: 0 } : { y: -8, opacity: 0 },
      transition: s ? Kt : pr,
      children: a
    },
    String(a)
  ) }) });
}
const wc = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};
function T4({
  filtered: a,
  motionOn: s,
  onClear: l
}) {
  return /* @__PURE__ */ d.jsxs(
    wt.div,
    {
      className: "flex flex-col items-center gap-1 text-center",
      initial: s ? "hidden" : !1,
      animate: "visible",
      variants: {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } }
      },
      children: [
        /* @__PURE__ */ d.jsx(wt.div, { variants: wc, transition: s ? $s : Kt, children: /* @__PURE__ */ d.jsx(u4, { className: "mb-2 size-7 text-neutral-300 dark:text-neutral-700" }) }),
        /* @__PURE__ */ d.jsx(
          wt.p,
          {
            variants: wc,
            transition: s ? $s : Kt,
            className: "text-sm font-medium text-neutral-900 dark:text-neutral-100",
            children: a ? "No matching rows" : "Nothing here yet"
          }
        ),
        /* @__PURE__ */ d.jsx(
          wt.p,
          {
            variants: wc,
            transition: s ? $s : Kt,
            className: "text-sm text-neutral-500 dark:text-neutral-400",
            children: a ? "Try different search terms or filters." : "Rows appear here once there is data."
          }
        ),
        a && /* @__PURE__ */ d.jsx(
          wt.button,
          {
            type: "button",
            onClick: l,
            variants: wc,
            transition: s ? $s : Kt,
            className: ye(
              "mt-3 rounded-xl border border-neutral-200 px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 dark:border-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-900",
              gi,
              pi
            ),
            children: "Clear filters"
          }
        )
      ]
    }
  );
}
function h1({
  checked: a,
  indeterminate: s = !1,
  onChange: l,
  onShiftPick: r,
  label: u,
  instant: h
}) {
  const f = C.useRef(null);
  C.useEffect(() => {
    f.current && (f.current.indeterminate = s);
  }, [s]);
  const p = a || s;
  return /* @__PURE__ */ d.jsxs("label", { className: ye("relative grid size-8 cursor-pointer place-items-center", gi), children: [
    /* @__PURE__ */ d.jsx(
      "input",
      {
        ref: f,
        type: "checkbox",
        checked: a,
        "aria-label": u,
        onClick: (y) => {
          !r || !y.shiftKey || (y.preventDefault(), r());
        },
        onChange: (y) => l(y.currentTarget.checked),
        className: "peer absolute inset-0 size-full cursor-pointer appearance-none rounded-xl outline-hidden"
      }
    ),
    /* @__PURE__ */ d.jsxs(
      "span",
      {
        "aria-hidden": "true",
        className: ye(
          "pointer-events-none relative grid size-[18px] place-items-center overflow-hidden rounded-[5px] border",
          "transition-[border-color] duration-150 ease-out",
          p ? "border-neutral-900 dark:border-neutral-100" : "border-neutral-300 bg-white hover:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-950 dark:hover:border-neutral-500",
          "peer-focus-visible:ring-1 peer-focus-visible:ring-neutral-950 dark:peer-focus-visible:ring-neutral-300"
        ),
        children: [
          /* @__PURE__ */ d.jsx(
            wt.span,
            {
              className: "absolute inset-[1px] rounded-[4px] bg-neutral-900 dark:bg-neutral-100",
              initial: !1,
              animate: { scale: p ? 1 : 0.5, opacity: p ? 1 : 0 },
              transition: h ? Kt : pr
            }
          ),
          /* @__PURE__ */ d.jsx("span", { className: "relative z-10 grid size-full place-items-center text-neutral-100 dark:text-neutral-900", children: s ? /* @__PURE__ */ d.jsx("span", { className: "block h-[2.2px] w-[9px] rounded-full bg-current" }) : (
            /* Iconly's tick, re-framed on its own bounds rather than inherited
             * from Tick Square: in that icon the glyph fills a third of a
             * 24-unit box because the square takes the rest, which left a
             * 3px check rattling around inside an 18px control. On a 14-unit
             * box drawn at full size the ink spans two thirds of the control,
             * which is the proportion the eye reads as a checkbox.
             *
             * The geometry is centred on 7,7 and then dropped 0.2 - a check's
             * long arm pulls the eye up, so bounding-box centre sits high. No
             * translate hacks: the nudge lives in the points. */
            /* @__PURE__ */ d.jsx(
              "svg",
              {
                viewBox: "0 0 14 14",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: 2.2,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                className: "block size-full",
                children: /* @__PURE__ */ d.jsx(
                  wt.polyline,
                  {
                    points: "3.9 7.35 6.05 9.55 9.9 4.8",
                    initial: !1,
                    animate: { pathLength: a ? 1 : 0, opacity: a ? 1 : 0 },
                    transition: h ? Kt : m4
                  }
                )
              }
            )
          ) })
        ]
      }
    )
  ] });
}
function gr({
  data: a,
  columns: s,
  rowId: l,
  rowLabel: r,
  variant: u = "default",
  density: h = "default",
  caption: f,
  title: p,
  toolbar: y,
  searchable: v = !1,
  searchPlaceholder: x = "Search",
  searchText: g,
  quickFilter: S,
  defaultSort: E = null,
  sort: j,
  onSortChange: V,
  selectable: M = !1,
  defaultSelectedIds: q,
  selectedIds: L,
  onSelectedChange: K,
  bulkActions: X,
  renderDetail: ee,
  rowActions: oe,
  onDelete: Q,
  batchSize: D = 50,
  loading: W = !1,
  skeletonRows: te = 5,
  emptyState: Ae,
  onRowClick: Ce,
  keyboardNavigation: Te = !0,
  clipboard: Ee = !0,
  totals: ce,
  resizableColumns: Z = !1,
  pinFirstColumn: $ = !1,
  stickyHeader: ne = !1,
  maxHeight: he,
  animate: P = !0,
  className: Ye
}) {
  const ut = Pj(), ke = P && !ut, T = b4[u], H = v4[h], [ae, me] = C.useState(""), [Ne, xe] = C.useState(null), [Me, le] = C.useState(0), [Se, Tt] = C.useState(!1), Rt = C.useRef(null), [an, _t] = C.useState(!1), [at, Ze] = C.useState([]), [R, J] = C.useState([]), [I, F] = C.useState({}), [we, ot] = C.useState(null), [Qn, Tn] = C.useState(null), [ma, as] = C.useState(E), mt = j !== void 0 ? j : ma, [sl, ll] = C.useState(q ?? []), gt = L !== void 0 ? L : sl, pa = C.useMemo(() => new Set(gt), [gt]), Qt = C.useCallback(
    (O) => {
      L === void 0 && ll(O), K?.(O);
    },
    [L, K]
  ), Un = C.useMemo(() => {
    const O = Array.from(a);
    return R.length > 0 ? O.filter((re) => !R.includes(l(re))) : O;
  }, [a, R, l]), Fn = C.useMemo(() => {
    const O = ae.trim().toLowerCase();
    return O ? Un.filter((re) => (g ? g(re) : s.map((be) => lr(mi(be, re))).join(" ")).toLowerCase().includes(O)) : Un;
  }, [Un, ae, s, g]), Ua = C.useCallback(
    (O) => {
      if (!S) return "";
      if (S.getValue) return S.getValue(O);
      const re = s.find((se) => se.id === S.columnId);
      return lr(mi(re, O));
    },
    [S, s]
  ), Dr = C.useMemo(() => {
    if (!S) return [];
    if (S.options) return S.options;
    const O = [];
    for (const re of Un) {
      const se = Ua(re);
      se && !O.includes(se) && O.push(se);
    }
    return O.map((re) => ({ value: re }));
  }, [S, Un, Ua]), Ft = C.useMemo(() => {
    if (!S) return {};
    const O = {};
    for (const re of Fn) {
      const se = Ua(re);
      O[se] = (O[se] ?? 0) + 1;
    }
    return O;
  }, [S, Fn, Ua]), is = C.useMemo(() => !S || Ne === null ? Fn : Fn.filter((O) => Ua(O) === Ne), [Fn, S, Ne, Ua]), Mt = C.useMemo(() => {
    if (!mt) return is;
    const O = s.find((se) => se.id === mt.columnId);
    if (!O) return is;
    const re = mt.direction === "asc" ? 1 : -1;
    return [...is].sort((se, be) => {
      const Le = mi(O, se), We = mi(O, be), Oe = Nh(Le), sn = Nh(We);
      return Oe || sn ? Oe === sn ? 0 : Oe ? 1 : -1 : x4(Le, We) * re;
    });
  }, [is, mt, s]), rl = JSON.stringify([ae, Ne, mt, Mt.map(l)]), { count: Va, loadMore: nu, hasMore: Rr } = kx(Mt.length, rl, D), It = C.useMemo(() => Mt.slice(0, Va), [Mt, Va]), ol = (O) => me(O), ga = (O) => xe(O), Pt = (O) => {
    const se = mt?.columnId === O.id ? mt?.direction === "asc" ? { columnId: O.id, direction: "desc" } : null : { columnId: O.id, direction: "asc" };
    j === void 0 && as(se), V?.(se);
  }, zt = It.map(l), Xt = zt.filter((O) => pa.has(O)), cl = zt.length > 0 && Xt.length === zt.length, _r = (O) => {
    Qt(O ? Array.from(/* @__PURE__ */ new Set([...gt, ...zt])) : gt.filter((re) => !zt.includes(re)));
  }, au = (O, re) => {
    Qt(re ? [...gt, O] : gt.filter((se) => se !== O));
  }, wi = (O, re) => {
    const [se, be] = O <= re ? [O, re] : [re, O], Le = It.slice(se, be + 1).map(l);
    Qt(Array.from(/* @__PURE__ */ new Set([...gt, ...Le])));
  }, La = (O, re) => {
    const se = zt[O];
    if (se !== void 0) {
      if (re?.shiftKey && Rt.current !== null) {
        wi(Rt.current, O);
        return;
      }
      Rt.current = O, au(se, !pa.has(se));
    }
  }, Ti = C.useCallback(
    (O) => {
      if (O.length === 0) return;
      const re = It.map(l).filter((be) => O.includes(be)), se = O.filter((be) => !re.includes(be));
      Ze([...re, ...se]);
    },
    [It, l]
  ), dn = C.useRef([]), ss = C.useCallback(
    (O) => {
      dn.current.includes(O) || (dn.current = [...dn.current, O]);
      const re = dn.current;
      if (at.length > 0 && at.every((se) => re.includes(se))) {
        dn.current = [], Q?.(at), Qt(gt.filter((se) => !at.includes(se))), Ze([]), J([]);
        return;
      }
      J(re);
    },
    [at, Q, gt, Qt]
  ), In = C.useMemo(
    () => Un.filter((O) => pa.has(l(O))),
    [Un, pa, l]
  ), zr = C.useMemo(() => {
    if (!ce || ce.length === 0) return {};
    const O = {};
    for (const re of ce) {
      const se = s.find((be) => be.id === re);
      se && (O[re] = Mt.reduce((be, Le) => {
        const We = mi(se, Le);
        return be + (typeof We == "number" ? We : 0);
      }, 0));
    }
    return O;
  }, [ce, s, Mt]), Or = C.useCallback(async () => {
    const O = In.length > 0 ? In : [];
    if (O.length === 0) return;
    const re = s.map(
      (be) => typeof be.header == "string" ? be.header : be.id
    ), se = O.map(
      (be) => s.map((Le) => lr(mi(Le, be))).join("	")
    );
    try {
      await navigator.clipboard.writeText([re.join("	"), ...se].join(`
`)), _t(!0), window.setTimeout(() => _t(!1), 1800);
    } catch {
    }
  }, [In, s]), Ur = Mt.length > 0 && Mt.every((O) => pa.has(l(O))), ul = M && cl && Mt.length > zt.length && !Ur, Ba = s.length + (M ? 1 : 0) + (ee ? 1 : 0) + (oe ? 1 : 0), ls = C.useRef(null);
  C.useEffect(() => {
    ls.current && (ls.current.scrollTop = 0);
  }, [rl]);
  const [Vr, Lr] = C.useState(!1), [Br, fl] = C.useState(!1);
  C.useEffect(() => {
    const O = ls.current;
    if (!O || !ne && !$) return;
    const re = () => {
      Lr(O.scrollTop > 0), fl(Math.abs(O.scrollLeft) > 0);
    };
    return re(), O.addEventListener("scroll", re, { passive: !0 }), () => O.removeEventListener("scroll", re);
  }, [ne, $]);
  const rs = C.useRef({}), dl = Z && Object.keys(I).length === s.length;
  C.useEffect(() => {
    if (!Z) return;
    const re = requestAnimationFrame(() => {
      const se = {};
      for (const be of s) {
        const Le = rs.current[be.id];
        Le && (se[be.id] = Math.max(Qi, Math.round(Le.getBoundingClientRect().width)));
      }
      Object.keys(se).length === s.length && F((be) => Object.keys(be).length === Object.keys(se).length && Object.keys(se).every((We) => be[We] === se[We]) ? be : se);
    });
    return () => cancelAnimationFrame(re);
  }, [Z, s, h]);
  const Hr = (O, re) => {
    const se = I[O] ?? Qi, be = typeof document < "u" && document.dir === "rtl";
    ot(O);
    const Le = (Oe) => {
      const sn = (Oe.clientX - re) * (be ? -1 : 1);
      F((va) => ({ ...va, [O]: Math.max(Qi, se + sn) }));
    }, We = () => {
      ot(null), window.removeEventListener("pointermove", Le), window.removeEventListener("pointerup", We);
    };
    window.addEventListener("pointermove", Le), window.addEventListener("pointerup", We);
  }, Cn = (O, re) => {
    F((se) => ({
      ...se,
      [O]: Math.max(Qi, (se[O] ?? Qi) + re)
    }));
  }, lt = {
    detail: 0,
    select: ee ? xc : 0,
    first: (ee ? xc : 0) + (M ? th : 0)
  }, Ot = $ && Br ? "shadow-[12px_0_10px_-10px_rgba(0,0,0,0.12)] dark:shadow-[12px_0_10px_-10px_rgba(0,0,0,0.55)]" : "", ya = C.useRef([]), qr = `${mt?.columnId ?? ""}:${mt?.direction ?? ""}:${Va}:${ae}:${Ne ?? ""}`, os = C.useId(), Gr = (O) => `${os}-row-${O}`, Yr = (O) => {
    if (!Te || It.length === 0) return;
    const re = O.metaKey || O.ctrlKey;
    if (re && O.key.toLowerCase() === "c") {
      if (!Ee || gt.length === 0) return;
      O.preventDefault(), Or();
      return;
    }
    if (re && O.key.toLowerCase() === "a" && M) {
      O.preventDefault(), _r(!0);
      return;
    }
    const se = O.target;
    if (se !== O.currentTarget && se.closest("input,textarea,select")) return;
    const be = (Le) => {
      const We = Math.max(0, Math.min(It.length - 1, Le));
      O.preventDefault(), O.shiftKey && M && (Rt.current === null && (Rt.current = Me), wi(Rt.current, We)), le(We), ya.current[We]?.scrollIntoView({ block: "nearest" });
    };
    switch (O.key) {
      case "ArrowDown":
        return be(Me + 1);
      case "ArrowUp":
        return be(Me - 1);
      case "PageDown":
        return be(Me + 10);
      case "PageUp":
        return be(Me - 10);
      case "Home":
        return be(0);
      case "End":
        return be(It.length - 1);
      case " ": {
        if (!M) return;
        O.preventDefault(), La(Me, O);
        return;
      }
      case "Enter": {
        const Le = It[Me];
        if (!Le || !Ce) return;
        O.preventDefault(), Ce(Le);
        return;
      }
      case "Escape": {
        if (gt.length === 0) return;
        O.preventDefault(), Qt([]);
        return;
      }
      case "ArrowRight": {
        if (!ee) return;
        O.preventDefault(), Tn(l(It[Me]));
        return;
      }
      case "ArrowLeft": {
        if (!ee) return;
        O.preventDefault(), Tn(null);
        return;
      }
      default:
        return;
    }
  }, Ci = !W && It.length === 0;
  return /* @__PURE__ */ d.jsxs("div", { className: ye("w-full", Ye), children: [
    /* @__PURE__ */ d.jsxs("div", { className: ye("flex flex-col overflow-hidden", T.frame), children: [
      (v || p || y || S) && /* @__PURE__ */ d.jsxs(
        "div",
        {
          className: ye(
            "flex flex-wrap items-center gap-x-4 gap-y-2 py-3",
            H.pad,
            u === "minimal" && "px-0 pt-0"
          ),
          children: [
            p && /* @__PURE__ */ d.jsx("h3", { className: "text-sm font-medium text-neutral-900 dark:text-neutral-100", children: p }),
            /* @__PURE__ */ d.jsxs("div", { className: "ms-auto flex min-w-0 flex-wrap items-center justify-end gap-2", children: [
              S && Dr.length > 0 && /* @__PURE__ */ d.jsx(U3, { id: `${os}-filters`, children: /* @__PURE__ */ d.jsxs(
                "div",
                {
                  role: "group",
                  "aria-label": S.label ?? "Filter rows",
                  className: "flex flex-wrap items-center gap-1",
                  children: [
                    /* @__PURE__ */ d.jsx(
                      d1,
                      {
                        active: Ne === null,
                        onClick: () => ga(null),
                        label: S.allLabel ?? "All",
                        count: Fn.length,
                        layoutId: `${os}-pill`,
                        motionOn: ke
                      }
                    ),
                    Dr.map((O) => /* @__PURE__ */ d.jsx(
                      d1,
                      {
                        active: Ne === O.value,
                        onClick: () => ga(Ne === O.value ? null : O.value),
                        label: O.label ?? O.value,
                        plain: O.label === void 0,
                        count: Ft[O.value] ?? 0,
                        layoutId: `${os}-pill`,
                        motionOn: ke
                      },
                      O.value
                    ))
                  ]
                }
              ) }),
              v && /* @__PURE__ */ d.jsxs("div", { className: "group/search relative w-full transition-[width] duration-300 sm:w-56 sm:focus-within:w-72 ease-[cubic-bezier(0.2,0,0,1)]", children: [
                /* @__PURE__ */ d.jsx(r4, { className: "pointer-events-none absolute inset-y-0 start-2.5 my-auto size-4 text-neutral-400 transition-[color,opacity] duration-150 ease-out group-focus-within/search:text-neutral-700 dark:text-neutral-500 dark:group-focus-within/search:text-neutral-300" }),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    type: "search",
                    value: ae,
                    onChange: (O) => ol(O.currentTarget.value),
                    placeholder: x,
                    "aria-label": x,
                    className: ye(
                      "h-9 w-full rounded-xl border border-neutral-200 bg-white ps-8 pe-8 text-base text-neutral-900 placeholder:text-neutral-400 sm:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-500",
                      "transition-[border-color] duration-150 ease-out",
                      "focus:border-neutral-400 dark:focus:border-neutral-500",
                      "[&::-webkit-search-cancel-button]:hidden",
                      pi
                    )
                  }
                ),
                /* @__PURE__ */ d.jsx(Ii, { initial: !1, children: ae ? /* @__PURE__ */ d.jsx(
                  wt.button,
                  {
                    type: "button",
                    onClick: () => ol(""),
                    "aria-label": "Clear search",
                    initial: ke ? { opacity: 0, scale: 0.25, filter: "blur(4px)" } : !1,
                    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
                    exit: ke ? { opacity: 0, scale: 0.25, filter: "blur(4px)" } : { opacity: 0 },
                    transition: ke ? $s : Kt,
                    className: ye(
                      "absolute inset-y-0 end-1 my-auto grid size-7 place-items-center rounded-lg text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
                      gi,
                      pi
                    ),
                    children: /* @__PURE__ */ d.jsx(o4, { className: "size-3.5" })
                  }
                ) : null })
              ] }),
              y
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d.jsx(Ii, { initial: !1, children: ul && /* @__PURE__ */ d.jsx(
        wt.div,
        {
          initial: { height: 0, opacity: 0 },
          animate: { height: "auto", opacity: 1 },
          exit: { height: 0, opacity: 0 },
          transition: ke ? zc : Kt,
          className: "overflow-hidden border-t border-neutral-100 bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900/60",
          children: /* @__PURE__ */ d.jsxs(
            "p",
            {
              className: ye(
                "flex flex-wrap items-center gap-x-1.5 gap-y-1 py-2 text-sm text-neutral-600 dark:text-neutral-400",
                H.pad
              ),
              children: [
                /* @__PURE__ */ d.jsxs("span", { className: "tabular-nums", children: [
                  "All ",
                  zt.length,
                  " rows currently loaded are selected."
                ] }),
                /* @__PURE__ */ d.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => Qt(Mt.map(l)),
                    className: ye(
                      "rounded-lg font-medium text-neutral-900 underline underline-offset-2 transition-colors duration-100 ease-out hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400",
                      pi
                    ),
                    children: [
                      "Select all ",
                      Mt.length,
                      " that match"
                    ]
                  }
                )
              ]
            }
          )
        }
      ) }),
      /* @__PURE__ */ d.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            ref: ls,
            className: "relative w-full overflow-auto overscroll-x-contain",
            style: he ? { maxHeight: he } : void 0,
            children: [
              /* @__PURE__ */ d.jsxs(
                "table",
                {
                  role: Te ? "grid" : void 0,
                  "aria-multiselectable": Te && M ? !0 : void 0,
                  tabIndex: Te && It.length > 0 ? 0 : void 0,
                  "aria-activedescendant": Te && Se && It[Me] ? Gr(Me) : void 0,
                  onKeyDown: Yr,
                  onFocus: (O) => {
                    O.target === O.currentTarget && Tt(!0);
                  },
                  onBlur: (O) => {
                    O.currentTarget.contains(O.relatedTarget) || Tt(!1);
                  },
                  className: ye(
                    "w-full border-collapse whitespace-nowrap",
                    H.text,
                    "outline-hidden focus-visible:outline-hidden"
                  ),
                  style: dl ? { tableLayout: "fixed", width: "max-content", minWidth: "100%" } : void 0,
                  "aria-busy": W || void 0,
                  children: [
                    f && /* @__PURE__ */ d.jsx("caption", { className: "sr-only", children: f }),
                    /* @__PURE__ */ d.jsx(
                      "thead",
                      {
                        className: ye(
                          T.head,
                          ne && T.headPinned,
                          ne && "sticky top-0 z-10",
                          "transition-shadow duration-150 ease-out",
                          ne && Vr && "shadow-[0_6px_10px_-8px_rgba(0,0,0,0.35)]"
                        ),
                        children: /* @__PURE__ */ d.jsxs("tr", { className: H.head, children: [
                          ee && /* @__PURE__ */ d.jsx(
                            "th",
                            {
                              scope: "col",
                              className: ye("w-10", T.headRule, $ && "sticky z-1"),
                              style: $ ? { insetInlineStart: lt.detail, width: xc } : void 0
                            }
                          ),
                          M && /* @__PURE__ */ d.jsx(
                            "th",
                            {
                              scope: "col",
                              className: ye(
                                "w-12 pe-0",
                                H.pad,
                                T.headRule,
                                $ && "sticky z-1"
                              ),
                              style: $ ? { insetInlineStart: lt.select, width: th } : void 0,
                              children: /* @__PURE__ */ d.jsx(
                                h1,
                                {
                                  checked: cl,
                                  indeterminate: Xt.length > 0 && !cl,
                                  onChange: _r,
                                  label: "Select loaded rows",
                                  instant: !ke
                                }
                              )
                            }
                          ),
                          s.map((O, re) => {
                            const se = O.align ?? (O.numeric ? "end" : "start"), be = mt?.columnId === O.id, Le = $ && re === 0, We = /* @__PURE__ */ d.jsx("span", { children: O.header });
                            return /* @__PURE__ */ d.jsxs(
                              "th",
                              {
                                scope: "col",
                                "aria-sort": O.sortable ? be ? mt?.direction === "asc" ? "ascending" : "descending" : "none" : void 0,
                                ref: (Oe) => {
                                  rs.current[O.id] = Oe;
                                },
                                style: {
                                  ...I[O.id] ? { width: I[O.id] } : O.width ? { width: O.width } : null,
                                  ...Le ? { insetInlineStart: lt.first } : null
                                },
                                className: ye(
                                  "relative font-medium text-neutral-600 dark:text-neutral-400",
                                  H.pad,
                                  eh[se],
                                  T.cell,
                                  T.headRule,
                                  O.hideBelow && Sc[O.hideBelow],
                                  Le && ye("sticky z-1", T.head, Ot),
                                  O.headerClassName
                                ),
                                children: [
                                  O.sortable ? /* @__PURE__ */ d.jsxs(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => Pt(O),
                                      className: ye(
                                        "group/sort -mx-1.5 inline-flex max-w-full items-center gap-1 rounded-xl px-1.5 py-1 font-medium hover:text-neutral-900 dark:hover:text-neutral-100",
                                        gi,
                                        se === "end" && "flex-row-reverse",
                                        be && "text-neutral-900 dark:text-neutral-100",
                                        pi
                                      ),
                                      children: [
                                        We,
                                        /* @__PURE__ */ d.jsx(
                                          wt.span,
                                          {
                                            "aria-hidden": "true",
                                            className: ye(
                                              "grid size-3.5 shrink-0 place-items-center",
                                              "transition-[opacity,scale] duration-150",
                                              y4,
                                              be ? "scale-100 opacity-100" : "scale-75 opacity-0 group-hover/sort:scale-100 group-hover/sort:opacity-40 group-focus-visible/sort:scale-100 group-focus-visible/sort:opacity-40"
                                            ),
                                            initial: !1,
                                            animate: { rotate: be && mt?.direction === "asc" ? 180 : 0 },
                                            transition: ke ? pr : Kt,
                                            children: /* @__PURE__ */ d.jsx(f1, { className: "size-3.5" })
                                          }
                                        )
                                      ]
                                    }
                                  ) : We,
                                  Z && /* A splitter, not a button: arrow keys resize it, and
                                  screen readers announce the width they land on. */
                                  /* @__PURE__ */ d.jsx(
                                    "span",
                                    {
                                      role: "separator",
                                      "aria-orientation": "vertical",
                                      "aria-label": `Resize ${typeof O.header == "string" ? O.header : O.id} column`,
                                      "aria-valuenow": Math.round(I[O.id] ?? Qi),
                                      "aria-valuemin": Qi,
                                      tabIndex: 0,
                                      onPointerDown: (Oe) => {
                                        Oe.preventDefault(), Hr(O.id, Oe.clientX);
                                      },
                                      onKeyDown: (Oe) => {
                                        const sn = Oe.shiftKey ? 48 : 16;
                                        Oe.key === "ArrowRight" ? (Oe.preventDefault(), Cn(O.id, sn)) : Oe.key === "ArrowLeft" && (Oe.preventDefault(), Cn(O.id, -sn));
                                      },
                                      className: ye(
                                        "absolute inset-y-0 end-0 z-1 w-2 translate-x-1/2 cursor-col-resize touch-none",
                                        "before:absolute before:inset-y-1.5 before:left-1/2 before:w-px before:-translate-x-1/2 before:bg-neutral-900 before:opacity-0 before:transition-opacity before:duration-100 before:content-['']",
                                        "hover:before:opacity-20 focus-visible:before:opacity-100 dark:before:bg-neutral-100",
                                        we === O.id && "before:opacity-100",
                                        "focus-visible:outline-hidden"
                                      )
                                    }
                                  )
                                ]
                              },
                              O.id
                            );
                          }),
                          oe && /* @__PURE__ */ d.jsx("th", { scope: "col", className: ye("w-12", T.headRule), children: /* @__PURE__ */ d.jsx("span", { className: "sr-only", children: "Actions" }) })
                        ] })
                      }
                    ),
                    W ? /* @__PURE__ */ d.jsx("tbody", { children: Array.from({ length: te }).map((O, re) => /* @__PURE__ */ d.jsxs("tr", { className: ye(re > 0 && T.divider, T.rowFill), children: [
                      ee && /* @__PURE__ */ d.jsx("td", { className: "w-10" }),
                      M && /* @__PURE__ */ d.jsx("td", { className: ye("w-12 pe-0", H.pad, H.cell), children: /* @__PURE__ */ d.jsx("span", { className: "ms-[7px] block size-[18px] rounded-[5px] bg-neutral-100 dark:bg-neutral-900" }) }),
                      s.map((se, be) => /* @__PURE__ */ d.jsx(
                        "td",
                        {
                          className: ye(
                            H.pad,
                            H.cell,
                            T.cell,
                            se.hideBelow && Sc[se.hideBelow]
                          ),
                          children: /* @__PURE__ */ d.jsx(
                            "span",
                            {
                              className: "block h-3 origin-left animate-pulse rounded-full bg-neutral-100 rtl:origin-right dark:bg-neutral-900",
                              style: {
                                width: `${52 + (re * 17 + se.id.length * 7) % 40}%`,
                                animationDelay: `${re * 80 + be * 40}ms`,
                                animationDuration: "1.4s"
                              }
                            }
                          )
                        },
                        se.id
                      )),
                      oe && /* @__PURE__ */ d.jsx("td", { className: "w-12" })
                    ] }, re)) }) : /* @__PURE__ */ d.jsxs("tbody", { children: [
                      It.map((O, re) => {
                        const se = l(O), be = pa.has(se), Le = Qn === se, We = at.indexOf(se), Oe = We !== -1, sn = r?.(O) || lr(mi(s[0], O)) || "this row", va = "transition-colors duration-100 ease-out group-hover/row:bg-neutral-900/[0.025] dark:group-hover/row:bg-neutral-100/[0.045]";
                        return /* @__PURE__ */ d.jsxs(C.Fragment, { children: [
                          /* @__PURE__ */ d.jsxs(
                            wt.tr,
                            {
                              id: Gr(re),
                              ref: (Ut) => {
                                ya.current[re] = Ut;
                              },
                              "aria-selected": M ? be : void 0,
                              "aria-hidden": Oe || void 0,
                              layout: ke ? "position" : !1,
                              layoutDependency: qr,
                              initial: !1,
                              animate: Oe ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 },
                              onAnimationComplete: () => {
                                Oe && ss(se);
                              },
                              transition: Oe ? ke ? { ...p4, delay: We * g4 } : Kt : zc,
                              "data-selected": be || void 0,
                              onPointerDown: () => le(re),
                              onClick: Ce ? (Ut) => {
                                Ut.target.closest("a,button,input,select,textarea,label") || Ce(O);
                              } : void 0,
                              className: ye(
                                "group/row",
                                re > 0 && T.divider,
                                T.rowFill,
                                re % 2 === 1 && T.stripe,
                                Ce && "cursor-pointer"
                              ),
                              children: [
                                ee && /* @__PURE__ */ d.jsx(
                                  "td",
                                  {
                                    className: ye(
                                      "w-10 ps-2",
                                      H.cell,
                                      va,
                                      $ && ye("sticky z-1", T.rowFill)
                                    ),
                                    style: $ ? { insetInlineStart: lt.detail, width: xc } : void 0,
                                    children: /* @__PURE__ */ d.jsx(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => Tn(Le ? null : se),
                                        "aria-expanded": Le,
                                        "aria-controls": Le ? `${se}-detail` : void 0,
                                        "aria-label": Le ? `Hide ${sn}` : `Show ${sn}`,
                                        className: ye(
                                          "grid size-8 place-items-center rounded-xl text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100",
                                          gi,
                                          pi
                                        ),
                                        children: /* @__PURE__ */ d.jsx(
                                          wt.span,
                                          {
                                            className: "grid size-4 place-items-center",
                                            initial: !1,
                                            animate: { rotate: Le ? 0 : -90 },
                                            transition: ke ? pr : Kt,
                                            children: /* @__PURE__ */ d.jsx(f1, { className: "size-4" })
                                          }
                                        )
                                      }
                                    )
                                  }
                                ),
                                M && /* @__PURE__ */ d.jsx(
                                  "td",
                                  {
                                    className: ye(
                                      "w-12 pe-0",
                                      H.pad,
                                      H.cell,
                                      va,
                                      $ && ye("sticky z-1", T.rowFill)
                                    ),
                                    style: $ ? { insetInlineStart: lt.select, width: th } : void 0,
                                    children: /* @__PURE__ */ d.jsx(
                                      h1,
                                      {
                                        checked: be,
                                        onChange: () => La(re),
                                        onShiftPick: () => {
                                          le(re), La(re, { shiftKey: !0 });
                                        },
                                        label: `Select ${sn}`,
                                        instant: !ke
                                      }
                                    )
                                  }
                                ),
                                s.map((Ut, hn) => {
                                  const Ha = Ut.align ?? (Ut.numeric ? "end" : "start"), Xr = Ut.cell ? Ut.cell(O, re) : lr(mi(Ut, O)), Zr = !!Ce && hn === 0;
                                  return /* @__PURE__ */ d.jsx(
                                    "td",
                                    {
                                      style: $ && hn === 0 ? { insetInlineStart: lt.first } : void 0,
                                      className: ye(
                                        "text-neutral-700 dark:text-neutral-300",
                                        va,
                                        H.pad,
                                        H.cell,
                                        eh[Ha],
                                        T.cell,
                                        Ut.numeric && "tabular-nums",
                                        Ut.hideBelow && Sc[Ut.hideBelow],
                                        // Fixed layout cannot grow, so a long value has
                                        // to end in an ellipsis rather than escape.
                                        dl && "truncate",
                                        hn === 0 && "font-medium text-neutral-900 dark:text-neutral-100",
                                        $ && hn === 0 && ye("sticky z-1", T.rowFill, Ot),
                                        Ut.className
                                      ),
                                      children: Zr ? /* @__PURE__ */ d.jsx(
                                        "button",
                                        {
                                          type: "button",
                                          onClick: () => Ce?.(O),
                                          className: ye(
                                            "-mx-1 flex max-w-[calc(100%+0.5rem)] items-center rounded-xl px-1 text-start",
                                            pi
                                          ),
                                          children: Xr
                                        }
                                      ) : Xr
                                    },
                                    Ut.id
                                  );
                                }),
                                oe && /* @__PURE__ */ d.jsx("td", { className: ye("w-12 pe-2 text-end", H.cell, va), children: /* @__PURE__ */ d.jsx("span", { className: "inline-flex opacity-100 transition-opacity duration-100 ease-out group-focus-within/row:opacity-100 group-hover/row:opacity-100 [@media(hover:hover)]:opacity-0", children: oe(O, { remove: () => Ti([se]) }) }) })
                              ]
                            }
                          ),
                          ee && /* @__PURE__ */ d.jsx(Ii, { initial: !1, children: Le && /* @__PURE__ */ d.jsx(
                            wt.tr,
                            {
                              id: `${se}-detail`,
                              initial: "closed",
                              animate: "open",
                              exit: "closed",
                              className: "bg-neutral-50 dark:bg-neutral-900",
                              children: /* @__PURE__ */ d.jsx("td", { colSpan: Ba, className: "p-0", children: /* @__PURE__ */ d.jsx(
                                wt.div,
                                {
                                  variants: {
                                    closed: { height: 0, opacity: 0 },
                                    open: { height: "auto", opacity: 1 }
                                  },
                                  transition: ke ? zc : Kt,
                                  className: "overflow-hidden",
                                  children: /* @__PURE__ */ d.jsx("div", { className: ye(H.pad, "py-4"), children: ee(O) })
                                }
                              ) })
                            }
                          ) })
                        ] }, se);
                      }),
                      Ci && /* @__PURE__ */ d.jsx("tr", { children: /* @__PURE__ */ d.jsx("td", { colSpan: Ba, className: "px-6 py-16", children: Ae ?? /* @__PURE__ */ d.jsx(
                        T4,
                        {
                          filtered: !!(ae || Ne !== null),
                          motionOn: ke,
                          onClear: () => {
                            ol(""), ga(null);
                          }
                        }
                      ) }) })
                    ] }),
                    ce && ce.length > 0 && !W && Mt.length > 0 && /* @__PURE__ */ d.jsx("tfoot", { children: /* @__PURE__ */ d.jsxs(
                      "tr",
                      {
                        className: ye(
                          T.rowFill,
                          "border-t border-neutral-200 dark:border-neutral-800"
                        ),
                        children: [
                          ee && /* @__PURE__ */ d.jsx("td", { className: "w-10" }),
                          M && /* @__PURE__ */ d.jsx("td", { className: ye("w-12 pe-0", H.pad) }),
                          s.map((O, re) => {
                            const se = O.align ?? (O.numeric ? "end" : "start"), be = zr[O.id];
                            return /* @__PURE__ */ d.jsx(
                              "td",
                              {
                                className: ye(
                                  H.pad,
                                  H.cell,
                                  eh[se],
                                  T.cell,
                                  O.numeric && "tabular-nums",
                                  O.hideBelow && Sc[O.hideBelow],
                                  "font-medium text-neutral-900 dark:text-neutral-100"
                                ),
                                children: be !== void 0 ? /* @__PURE__ */ d.jsx(
                                  S4,
                                  {
                                    value: be,
                                    format: O.formatTotal ?? ((Le) => Math.round(Le).toLocaleString("en-US")),
                                    instant: !ke
                                  }
                                ) : re === 0 ? /* @__PURE__ */ d.jsx("span", { className: "font-normal text-neutral-500 dark:text-neutral-400", children: "Total" }) : null
                              },
                              O.id
                            );
                          }),
                          oe && /* @__PURE__ */ d.jsx("td", { className: "w-12" })
                        ]
                      }
                    ) })
                  ]
                }
              ),
              !W && Mt.length > 0 && /* @__PURE__ */ d.jsx(Dx, { hasMore: Rr, onLoad: nu })
            ]
          }
        ),
        M && X && /* @__PURE__ */ d.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-4 flex justify-center px-3", children: /* @__PURE__ */ d.jsx(Ii, { children: gt.length > 0 && /* @__PURE__ */ d.jsxs(
          wt.div,
          {
            initial: { opacity: 0, y: 12, scale: 0.98 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 8, scale: 0.98 },
            transition: ke ? h4 : Kt,
            className: "pointer-events-auto flex max-w-full items-center gap-1 rounded-full bg-neutral-900 p-1 ps-3 whitespace-nowrap text-neutral-100 shadow-[0_8px_24px_rgba(0,0,0,0.18)] dark:bg-neutral-100 dark:text-neutral-900",
            children: [
              /* @__PURE__ */ d.jsxs("span", { className: "pe-1 text-xs font-medium tabular-nums", children: [
                /* @__PURE__ */ d.jsx(w4, { value: gt.length, instant: !ke }),
                " selected"
              ] }),
              /* @__PURE__ */ d.jsx("span", { className: "h-4 w-px bg-current opacity-20" }),
              Ee && /* @__PURE__ */ d.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    Or();
                  },
                  "aria-label": `Copy ${gt.length} rows to the clipboard`,
                  className: ye(
                    "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-current focus-visible:outline-hidden dark:hover:bg-black/10",
                    gi
                  ),
                  children: [
                    /* @__PURE__ */ d.jsx("span", { className: "relative grid size-4 place-items-center", children: /* @__PURE__ */ d.jsx(Ii, { initial: !1, mode: "popLayout", children: /* @__PURE__ */ d.jsx(
                      wt.span,
                      {
                        initial: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
                        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
                        exit: { opacity: 0, scale: 0.25, filter: "blur(4px)" },
                        transition: ke ? $s : Kt,
                        className: "absolute inset-0 grid place-items-center",
                        children: an ? /* @__PURE__ */ d.jsx(d4, { className: "size-4" }) : /* @__PURE__ */ d.jsx(f4, { className: "size-4" })
                      },
                      an ? "done" : "copy"
                    ) }) }),
                    /* @__PURE__ */ d.jsx("span", { className: "relative hidden h-[1.25em] overflow-hidden sm:inline", children: /* @__PURE__ */ d.jsx(Ii, { mode: "popLayout", initial: !1, children: /* @__PURE__ */ d.jsx(
                      wt.span,
                      {
                        className: "inline-block",
                        initial: ke ? { y: 8, opacity: 0 } : !1,
                        animate: { y: 0, opacity: 1 },
                        exit: ke ? { y: -8, opacity: 0 } : { opacity: 0 },
                        transition: ke ? pr : Kt,
                        children: an ? "Copied" : "Copy"
                      },
                      an ? "copied" : "copy"
                    ) }) })
                  ]
                }
              ),
              X({
                ids: gt,
                rows: In,
                clear: () => Qt([]),
                remove: () => Ti(gt)
              }),
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => Qt([]),
                  "aria-label": "Clear selection",
                  className: ye(
                    "grid size-7 place-items-center rounded-full opacity-60 hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-current",
                    gi
                  ),
                  children: /* @__PURE__ */ d.jsx(c4, { className: "size-4" })
                }
              )
            ]
          }
        ) }) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("div", { role: "status", "aria-live": "polite", className: "sr-only", children: W ? "Loading rows" : `${Mt.length} ${Mt.length === 1 ? "row" : "rows"}${gt.length > 0 ? `, ${gt.length} selected` : ""}` })
  ] });
}
const C4 = [
  { icon: /* @__PURE__ */ d.jsx(HA, {}), label: "Documents" },
  { icon: /* @__PURE__ */ d.jsx(RA, {}), label: "Budget" },
  { icon: /* @__PURE__ */ d.jsx(hA, {}), label: "Reports" }
];
function m1({
  title: a = "Planning",
  items: s = C4,
  className: l,
  activeHref: r
}) {
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: ye(
        "w-full rounded-[16px] bg-white pb-2 pt-4",
        "shadow-[0_0_0_1px_rgba(10,10,10,0.05),0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]",
        "dark:bg-neutral-950 dark:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_1px_3px_0_rgba(0,0,0,0.5)]",
        l
      ),
      children: [
        /* @__PURE__ */ d.jsx("p", { className: "px-5 text-xs font-medium leading-4 text-foreground/70", children: a }),
        /* @__PURE__ */ d.jsx("ul", { className: "mt-2 space-y-1 px-2", children: s.map((u) => {
          const h = /* @__PURE__ */ d.jsxs(
            wt.span,
            {
              whileHover: { x: 2 },
              whileTap: { scale: 0.98 },
              transition: { type: "spring", bounce: 0.4, duration: 0.3 },
              className: "flex h-8 items-center gap-2 rounded-full px-2.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900",
              children: [
                u.icon ? /* @__PURE__ */ d.jsx("span", { className: "flex shrink-0 text-foreground [&_svg]:h-4 [&_svg]:w-4", children: u.icon }) : null,
                /* @__PURE__ */ d.jsx("span", { className: "truncate text-sm leading-5 text-foreground", children: u.label }),
                u.meta && /* @__PURE__ */ d.jsx("span", { "aria-hidden": "true", className: "nav-count ml-auto tabular-nums", children: u.meta })
              ]
            }
          );
          return /* @__PURE__ */ d.jsx("li", { children: u.href ? /* @__PURE__ */ d.jsx("a", { href: u.href, "aria-current": u.href === r ? "page" : void 0, className: "block", children: h }) : /* @__PURE__ */ d.jsx("button", { type: "button", className: "block w-full text-left", children: h }) }, u.label);
        }) })
      ]
    }
  );
}
function E4(a) {
  const s = location.hash.slice(1), l = s.startsWith(a + "?") ? new URLSearchParams(s.slice(a.length + 1)) : new URLSearchParams(), [r, u] = (l.get("sort") || "").split(":"), h = {};
  return l.forEach((f, p) => {
    p.startsWith("f.") && f && (h[p.slice(2)] = f);
  }), { q: l.get("q") || "", sort: r && (u === "asc" || u === "desc") ? { columnId: r, direction: u } : null, filters: h };
}
function j4(a, s) {
  const l = new URLSearchParams();
  s.q && l.set("q", s.q), s.sort && l.set("sort", s.sort.columnId + ":" + s.sort.direction);
  for (const [u, h] of Object.entries(s.filters)) h && l.set("f." + u, h);
  const r = l.toString();
  history.replaceState(null, "", "#" + a + (r ? "?" + r : ""));
}
function A4({ view: a, rows: s, columns: l, rowId: r, onRowClick: u, title: h }) {
  const [f, p] = C.useState(() => E4(a)), y = (E) => {
    const j = { ...f, ...E };
    p(j), j4(a, j);
  }, v = (E, j) => {
    const V = j.get(E);
    return V === void 0 || V === "" ? "" : String(V);
  }, x = C.useMemo(() => {
    const E = f.q.trim().toLowerCase(), j = l.filter((V) => f.filters[V.id]?.trim());
    return s.filter((V) => (!E || l.some((M) => v(V, M).toLowerCase().includes(E))) && j.every((M) => v(V, M).toLowerCase().includes(f.filters[M.id].trim().toLowerCase())));
  }, [s, l, f.q, f.filters]), g = l.map((E) => ({
    id: E.id,
    header: E.header,
    sortable: !0,
    numeric: E.numeric,
    value: (j) => E.get(j),
    cell: (j) => {
      const V = v(j, E);
      return /* @__PURE__ */ d.jsx("span", { className: "grid-cell", title: V, children: V });
    }
  })), S = Object.values(f.filters).filter((E) => E.trim()).length;
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("div", { className: "grid-controls", children: [
      /* @__PURE__ */ d.jsx("input", { type: "search", className: "grid-search", placeholder: "Search all columns...", value: f.q, onChange: (E) => y({ q: E.target.value }), "aria-label": "Search all columns" }),
      /* @__PURE__ */ d.jsxs("details", { open: S > 0 || void 0, children: [
        /* @__PURE__ */ d.jsxs("summary", { children: [
          "Column filters",
          S ? ` (${S})` : ""
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "grid-filters", children: [
          l.map((E) => /* @__PURE__ */ d.jsxs("label", { children: [
            /* @__PURE__ */ d.jsx("span", { children: E.header }),
            /* @__PURE__ */ d.jsx("input", { type: "text", value: f.filters[E.id] || "", onChange: (j) => y({ filters: { ...f.filters, [E.id]: j.target.value } }) })
          ] }, E.id)),
          S > 0 && /* @__PURE__ */ d.jsx("button", { type: "button", className: "grid-clear", onClick: () => y({ filters: {} }), children: "Clear filters" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("span", { className: "grid-count", role: "status", children: [
        x.length.toLocaleString(),
        " of ",
        s.length.toLocaleString()
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(
      gr,
      {
        className: "records-table grid-table",
        data: x,
        columns: g,
        rowId: r,
        title: h,
        caption: h,
        variant: "panel",
        density: "compact",
        batchSize: 50,
        sort: f.sort,
        onSortChange: (E) => y({ sort: E }),
        onRowClick: u,
        keyboardNavigation: !1,
        pinFirstColumn: !0,
        stickyHeader: !0,
        maxHeight: "70vh"
      }
    )
  ] });
}
var M4 = Object.defineProperty, hm = (a, s) => M4(a, "name", { value: s, configurable: !0 });
function kh(a, s) {
  if (typeof a == "function")
    return a(s);
  a != null && (a.current = s);
}
hm(kh, "setRef");
function _x(...a) {
  return (s) => {
    let l = !1;
    const r = a.map((u) => {
      const h = kh(u, s);
      return !l && typeof h == "function" && (l = !0), h;
    });
    if (l)
      return () => {
        for (let u = 0; u < r.length; u++) {
          const h = r[u];
          typeof h == "function" ? h() : kh(a[u], null);
        }
      };
  };
}
hm(_x, "composeRefs");
function zx(...a) {
  return C.useCallback(_x(...a), a);
}
hm(zx, "useComposedRefs");
var N4 = Object.defineProperty, Kn = (a, s) => N4(a, "name", { value: s, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function Ox(a) {
  const s = C.forwardRef((l, r) => {
    let { children: u, ...h } = l, f = null, p = !1;
    const y = [];
    Dh(u) && typeof Tc == "function" && (u = Tc(u._payload)), C.Children.forEach(u, (S) => {
      if (Bx(S)) {
        p = !0;
        const E = S;
        let j = "child" in E.props ? E.props.child : E.props.children;
        Dh(j) && typeof Tc == "function" && (j = Tc(j._payload)), f = R4(E, j), y.push(f?.props?.children);
      } else
        y.push(S);
    }), f ? f = C.cloneElement(f, void 0, y) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target - throw a descriptive error below instead.
      !p && C.Children.count(u) === 1 && C.isValidElement(u) && (f = u)
    );
    const v = f ? Lx(f) : void 0, x = zx(r, v);
    if (!f) {
      if (u || u === 0)
        throw new Error(
          p ? O4(a) : z4(a)
        );
      return u;
    }
    const g = Vx(h, f.props ?? {});
    return f.type !== C.Fragment && (g.ref = r ? x : v), C.cloneElement(f, g);
  });
  return s.displayName = `${a}.Slot`, s;
}
Kn(Ox, "createSlot");
var k4 = /* @__PURE__ */ Ox("Slot"), Ux = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function D4(a) {
  const s = /* @__PURE__ */ Kn((l) => "child" in l ? l.children(l.child) : l.children, "Slottable");
  return s.displayName = `${a}.Slottable`, s.__radixId = Ux, s;
}
Kn(D4, "createSlottable");
var R4 = /* @__PURE__ */ Kn((a, s) => {
  if ("child" in a.props) {
    const l = a.props.child;
    return C.isValidElement(l) ? C.cloneElement(l, void 0, a.props.children(l.props.children)) : null;
  }
  return C.isValidElement(s) ? s : null;
}, "getSlottableElementFromSlottable");
function Vx(a, s) {
  const l = { ...s };
  for (const r in s) {
    const u = a[r], h = s[r];
    /^on[A-Z]/.test(r) ? u && h ? l[r] = (...p) => {
      const y = h(...p);
      return u(...p), y;
    } : u && (l[r] = u) : r === "style" ? l[r] = { ...u, ...h } : r === "className" && (l[r] = [u, h].filter(Boolean).join(" "));
  }
  return { ...a, ...l };
}
Kn(Vx, "mergeProps");
function Lx(a) {
  let s = Object.getOwnPropertyDescriptor(a.props, "ref")?.get, l = s && "isReactWarning" in s && s.isReactWarning;
  return l ? a.ref : (s = Object.getOwnPropertyDescriptor(a, "ref")?.get, l = s && "isReactWarning" in s && s.isReactWarning, l ? a.props.ref : a.props.ref || a.ref);
}
Kn(Lx, "getElementRef");
function Bx(a) {
  return C.isValidElement(a) && typeof a.type == "function" && "__radixId" in a.type && a.type.__radixId === Ux;
}
Kn(Bx, "isSlottable");
var _4 = /* @__PURE__ */ Symbol.for("react.lazy");
function Dh(a) {
  return a != null && typeof a == "object" && "$$typeof" in a && a.$$typeof === _4 && "_payload" in a && Hx(a._payload);
}
Kn(Dh, "isLazyComponent");
function Hx(a) {
  return typeof a == "object" && a !== null && "then" in a;
}
Kn(Hx, "isPromiseLike");
var z4 = /* @__PURE__ */ Kn((a) => `${a} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), O4 = /* @__PURE__ */ Kn((a) => `${a} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Tc = _w[" use ".trim().toString()];
const p1 = (a) => typeof a == "boolean" ? `${a}` : a === 0 ? "0" : a, g1 = px, U4 = (a, s) => (l) => {
  var r;
  if (s?.variants == null) return g1(a, l?.class, l?.className);
  const { variants: u, defaultVariants: h } = s, f = Object.keys(u).map((v) => {
    const x = l?.[v], g = h?.[v];
    if (x === null) return null;
    const S = p1(x) || p1(g);
    return u[v][S];
  }), p = l && Object.entries(l).reduce((v, x) => {
    let [g, S] = x;
    return S === void 0 || (v[g] = S), v;
  }, {}), y = s == null || (r = s.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((v, x) => {
    let { class: g, className: S, ...E } = x;
    return Object.entries(E).every((j) => {
      let [V, M] = j;
      return Array.isArray(M) ? M.includes({
        ...h,
        ...p
      }[V]) : {
        ...h,
        ...p
      }[V] === M;
    }) ? [
      ...v,
      g,
      S
    ] : v;
  }, []);
  return g1(a, f, y, l?.class, l?.className);
}, V4 = U4(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), da = C.forwardRef(
  ({ className: a, variant: s, size: l, asChild: r = !1, ...u }, h) => {
    const f = r ? k4 : "button";
    return /* @__PURE__ */ d.jsx(
      f,
      {
        className: ye(V4({ variant: s, size: l, className: a })),
        ref: h,
        ...u
      }
    );
  }
);
da.displayName = "Button";
const y1 = ["AI", "Robotics & autonomy", "Hardware & electronics", "Semiconductors & computing", "Enterprise software", "Data & cloud infrastructure", "Developer tools", "Cybersecurity", "Fintech & insurance", "Crypto & Web3", "Healthcare", "Biotech & life sciences", "Climate & environment", "Energy", "Industrial & manufacturing", "Materials & chemicals", "Mobility & transportation", "Logistics & supply chain", "Space & aerospace", "Defense & security", "Food & agriculture", "Real estate & construction", "Consumer & retail", "Marketplaces & commerce", "Media & entertainment", "Education & work", "Telecom & connectivity", "Deep tech", "Multi-sector", "Unknown"], L4 = {
  "(aero)space": [
    "Space & aerospace"
  ],
  "10x hardware": [
    "Hardware & electronics"
  ],
  "3d": [
    "Semiconductors & computing"
  ],
  "5g": [
    "Telecom & connectivity"
  ],
  ai: [
    "AI"
  ],
  "ai & analytics": [
    "AI"
  ],
  "ai & data science": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai & ml": [
    "AI"
  ],
  "ai & next generation internet": [
    "AI"
  ],
  "ai ml data": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai quantum": [
    "AI",
    "Semiconductors & computing"
  ],
  "ai applications": [
    "AI"
  ],
  "ai infrastructure": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai infrastructure and applications": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "ai ecosystem": [
    "AI"
  ],
  "ai enablement": [
    "AI"
  ],
  "ai in the physical world": [
    "AI",
    "Robotics & autonomy"
  ],
  "ai powered platforms": [
    "AI"
  ],
  "ai driven business solutions": [
    "AI",
    "Enterprise software"
  ],
  "ai first and ai enabled businesses": [
    "AI"
  ],
  "ai first technology stack": [
    "AI"
  ],
  "ai native applications": [
    "AI"
  ],
  "ai ml": [
    "AI"
  ],
  "access to healthcare": [
    "Healthcare"
  ],
  "advanced compute": [
    "Semiconductors & computing"
  ],
  "advanced computing & security": [
    "Semiconductors & computing"
  ],
  "advanced weapons": [
    "Defense & security"
  ],
  aerospace: [
    "Space & aerospace"
  ],
  agribusiness: [
    "Food & agriculture"
  ],
  "american dynamism": [
    "Unknown"
  ],
  "application software": [
    "Enterprise software"
  ],
  "artificial intelligence": [
    "AI"
  ],
  augmentation: [
    "Healthcare"
  ],
  "automation & industrial ai": [
    "AI",
    "Industrial & manufacturing"
  ],
  automotive: [
    "Mobility & transportation"
  ],
  "autonomous machines": [
    "Robotics & autonomy"
  ],
  "autonomous technology & robotics": [
    "Robotics & autonomy"
  ],
  autonomy: [
    "Robotics & autonomy"
  ],
  b2b: [
    "Unknown"
  ],
  "b2b saas": [
    "Enterprise software"
  ],
  "b2b software": [
    "Enterprise software"
  ],
  "b2b and b2c technology, including ai, b2b saas, devops, fintech, ecommerce and retail, health, edtech, climate, and transport": [
    "AI",
    "Enterprise software",
    "Developer tools",
    "Fintech & insurance",
    "Healthcare",
    "Climate & environment",
    "Mobility & transportation",
    "Consumer & retail",
    "Marketplaces & commerce",
    "Education & work"
  ],
  "b2b tech": [
    "Unknown"
  ],
  "b2b technologies": [
    "Unknown"
  ],
  "b2b technology": [
    "Unknown"
  ],
  "b2b to b2c": [
    "Unknown"
  ],
  "b2b b2c services": [
    "Unknown"
  ],
  "b2b enterprise software": [
    "Enterprise software"
  ],
  "big data cloud solutions": [
    "Data & cloud infrastructure"
  ],
  bio: [
    "Biotech & life sciences"
  ],
  bioit: [
    "Biotech & life sciences"
  ],
  blockchain: [
    "Crypto & Web3"
  ],
  "building construction": [
    "Real estate & construction"
  ],
  "built environment": [
    "Real estate & construction"
  ],
  "business & energy efficiency": [
    "Energy"
  ],
  "business cloud applications & infrastructure": [
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  c5isr: [
    "Defense & security"
  ],
  "carbon management": [
    "Climate & environment"
  ],
  "children & youth": [
    "Unknown"
  ],
  cleantech: [
    "Climate & environment"
  ],
  "cleantech & planet positive": [
    "Climate & environment"
  ],
  climate: [
    "Climate & environment"
  ],
  "climate tech": [
    "Climate & environment"
  ],
  "climate tech & industrial tech": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "climate and sustainability": [
    "Climate & environment"
  ],
  climatetech: [
    "Climate & environment"
  ],
  "cloud infrastructure": [
    "Data & cloud infrastructure"
  ],
  compute: [
    "Semiconductors & computing"
  ],
  "computer related": [
    "Unknown"
  ],
  contech: [
    "Real estate & construction"
  ],
  connectivity: [
    "Telecom & connectivity"
  ],
  "construction & real estate": [
    "Real estate & construction"
  ],
  consumer: [
    "Consumer & retail"
  ],
  "consumer & commerce": [
    "Consumer & retail",
    "Marketplaces & commerce"
  ],
  "consumer & prosumer": [
    "Consumer & retail"
  ],
  consumertech: [
    "Consumer & retail"
  ],
  cosmetics: [
    "Consumer & retail"
  ],
  "crypto web3": [
    "Crypto & Web3"
  ],
  cyber: [
    "Cybersecurity"
  ],
  "cyber security": [
    "Cybersecurity"
  ],
  cybersecurity: [
    "Cybersecurity"
  ],
  "cybersecurity & defense": [
    "Cybersecurity",
    "Defense & security"
  ],
  cybertech: [
    "Cybersecurity"
  ],
  "data & infrastructure": [
    "Data & cloud infrastructure"
  ],
  "data, ml, and ai": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "deep tech": [
    "Deep tech"
  ],
  deeptech: [
    "Deep tech"
  ],
  "deeptech: microelectronics, photonics, digitalization": [
    "Hardware & electronics",
    "Semiconductors & computing",
    "Enterprise software",
    "Deep tech"
  ],
  "defence technologies": [
    "Defense & security"
  ],
  "defense & security": [
    "Defense & security"
  ],
  "defense tech": [
    "Defense & security"
  ],
  "devtools and infrastructure": [
    "Developer tools"
  ],
  "developer platforms": [
    "Developer tools"
  ],
  "developer tools & data": [
    "Data & cloud infrastructure",
    "Developer tools"
  ],
  diagnostics: [
    "Healthcare",
    "Multi-sector"
  ],
  "digital assets": [
    "Crypto & Web3"
  ],
  "digital assets & fintech innovation": [
    "Fintech & insurance",
    "Crypto & Web3"
  ],
  "digital first": [
    "Unknown"
  ],
  "digital health": [
    "Healthcare"
  ],
  "digital solutions": [
    "Enterprise software"
  ],
  "digital technologies & agriculture (private equity)": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "digital transformation": [
    "Enterprise software"
  ],
  "distributed ledger": [
    "Crypto & Web3"
  ],
  distribution: [
    "Logistics & supply chain"
  ],
  "diversified technology": [
    "Multi-sector"
  ],
  "e commerce": [
    "Marketplaces & commerce"
  ],
  "economic infrastructure": [
    "Unknown"
  ],
  edtech: [
    "Education & work"
  ],
  "edge & data infrastructure": [
    "Data & cloud infrastructure"
  ],
  "efficient buildings & infrastructure": [
    "Real estate & construction"
  ],
  "electronics & compute": [
    "Hardware & electronics",
    "Semiconductors & computing"
  ],
  "enabling technologies": [
    "Unknown"
  ],
  energy: [
    "Energy"
  ],
  "energy & electrification": [
    "Energy"
  ],
  "energy transition": [
    "Energy"
  ],
  "energy and climatetech": [
    "Climate & environment",
    "Energy"
  ],
  energytech: [
    "Energy"
  ],
  enterprise: [
    "Enterprise software"
  ],
  "enterprise & cloud": [
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "enterprise & frontier technologies": [
    "Enterprise software",
    "Deep tech"
  ],
  "enterprise software": [
    "Enterprise software"
  ],
  "european tech": [
    "Unknown"
  ],
  fintech: [
    "Fintech & insurance"
  ],
  "fintech & legaltech": [
    "Enterprise software",
    "Fintech & insurance"
  ],
  "financial services": [
    "Fintech & insurance"
  ],
  "financial technology": [
    "Fintech & insurance"
  ],
  "fintech & crypto": [
    "Fintech & insurance",
    "Crypto & Web3"
  ],
  "fintech & insurtech": [
    "Fintech & insurance"
  ],
  "food & agriculture": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "food and agriculture": [
    "Food & agriculture",
    "Media & entertainment"
  ],
  "food as medicine": [
    "Healthcare",
    "Food & agriculture"
  ],
  foodtech: [
    "Food & agriculture"
  ],
  frontier: [
    "Deep tech"
  ],
  "frontier tech": [
    "Deep tech"
  ],
  "frontier technologies": [
    "Deep tech"
  ],
  "future of work": [
    "Education & work"
  ],
  "future of work, retail & living": [
    "Consumer & retail",
    "Education & work"
  ],
  games: [
    "Media & entertainment"
  ],
  gaming: [
    "Media & entertainment"
  ],
  "genomic revolution & biotech": [
    "Biotech & life sciences"
  ],
  "global resilience & energy": [
    "Energy"
  ],
  "government & defense": [
    "Defense & security"
  ],
  hrtech: [
    "Enterprise software",
    "Education & work"
  ],
  "hard tech": [
    "Deep tech"
  ],
  "hardware & deep tech": [
    "Hardware & electronics",
    "Deep tech"
  ],
  health: [
    "Healthcare"
  ],
  "health & bio": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "health & food": [
    "Healthcare",
    "Food & agriculture"
  ],
  "health tech": [
    "Healthcare"
  ],
  "health and biotech": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  healthtech: [
    "Healthcare"
  ],
  healthcare: [
    "Healthcare"
  ],
  "healthcare bio longevity": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "healthcare life sciences": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "human (health, medicine, and wellness)": [
    "Healthcare"
  ],
  humanos: [
    "Healthcare"
  ],
  it: [
    "Unknown"
  ],
  "it infrastructure": [
    "Data & cloud infrastructure"
  ],
  "it services & software": [
    "Enterprise software"
  ],
  "identity and security": [
    "Cybersecurity"
  ],
  industrial: [
    "Industrial & manufacturing"
  ],
  "industrial autonomy": [
    "Robotics & autonomy",
    "Industrial & manufacturing"
  ],
  "industrial biotechnology": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "industrial tech + life science tools": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "industrial technology": [
    "Industrial & manufacturing"
  ],
  industrials: [
    "Industrial & manufacturing"
  ],
  industry: [
    "Industrial & manufacturing"
  ],
  "industry & automation": [
    "Industrial & manufacturing"
  ],
  "industry & deeptech": [
    "Industrial & manufacturing",
    "Deep tech"
  ],
  "infra & dev ops": [
    "Developer tools"
  ],
  infrastructure: [
    "Unknown"
  ],
  "infrastructure & security": [
    "Cybersecurity",
    "Data & cloud infrastructure"
  ],
  "infrastructure ai": [
    "AI"
  ],
  "infrastructure software": [
    "Data & cloud infrastructure"
  ],
  insurtech: [
    "Fintech & insurance"
  ],
  "intelligence (ai, advanced computing, and quantum)": [
    "AI",
    "Semiconductors & computing"
  ],
  "internet technology": [
    "Unknown"
  ],
  iot: [
    "Hardware & electronics"
  ],
  "iot and edge computing": [
    "Hardware & electronics",
    "Data & cloud infrastructure"
  ],
  legaltech: [
    "Enterprise software"
  ],
  "life science": [
    "Biotech & life sciences"
  ],
  "life sciences": [
    "Biotech & life sciences"
  ],
  "life sciences & healthtech": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "life sciences & ehealth": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "life tech": [
    "Unknown"
  ],
  lifestyle: [
    "Consumer & retail"
  ],
  logistics: [
    "Logistics & supply chain"
  ],
  "logistics & supply chain": [
    "Logistics & supply chain"
  ],
  longevity: [
    "Healthcare"
  ],
  "machine assist": [
    "Robotics & autonomy"
  ],
  manufacturing: [
    "Industrial & manufacturing"
  ],
  "manufacturing & industrials": [
    "Industrial & manufacturing"
  ],
  "manufacturing & warehousing": [
    "Industrial & manufacturing",
    "Logistics & supply chain",
    "Real estate & construction"
  ],
  marketplaces: [
    "Marketplaces & commerce"
  ],
  "marketplaces & consumer": [
    "Consumer & retail",
    "Marketplaces & commerce"
  ],
  materials: [
    "Materials & chemicals"
  ],
  "materials & packaging": [
    "Materials & chemicals"
  ],
  media: [
    "Media & entertainment"
  ],
  "media & gaming": [
    "Media & entertainment"
  ],
  "medical life sciences health related": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  "medical devices": [
    "Healthcare"
  ],
  "medical technology": [
    "Healthcare"
  ],
  "mittelstand transformation": [
    "Unknown"
  ],
  "mobile technologies": [
    "Unknown"
  ],
  mobility: [
    "Mobility & transportation"
  ],
  "mobility & automotive": [
    "Mobility & transportation"
  ],
  "mobility transportation": [
    "Mobility & transportation"
  ],
  "mobility and urbanization": [
    "Mobility & transportation",
    "Real estate & construction"
  ],
  "new frontiers": [
    "Unknown"
  ],
  "new markets": [
    "Unknown"
  ],
  "next gen communications": [
    "Telecom & connectivity"
  ],
  "next generation semiconductors": [
    "Semiconductors & computing"
  ],
  "other frontier": [
    "Deep tech"
  ],
  "plg saas": [
    "Enterprise software"
  ],
  "physical ai": [
    "AI",
    "Robotics & autonomy"
  ],
  "physical ai & robotics": [
    "AI",
    "Robotics & autonomy"
  ],
  "physical world intelligence": [
    "Robotics & autonomy"
  ],
  "planet (sustainability, energy, novel materials, and space utilisation)": [
    "Climate & environment",
    "Energy",
    "Materials & chemicals",
    "Space & aerospace"
  ],
  "power & propulsion": [
    "Energy"
  ],
  proptech: [
    "Real estate & construction"
  ],
  quantum: [
    "Semiconductors & computing"
  ],
  "quantum computing": [
    "Semiconductors & computing"
  ],
  "real estate and proptech": [
    "Real estate & construction"
  ],
  "real estate": [
    "Real estate & construction"
  ],
  regtech: [
    "Fintech & insurance"
  ],
  "regulated industries": [
    "Industrial & manufacturing"
  ],
  robotics: [
    "Robotics & autonomy"
  ],
  "robotics advanced materials": [
    "Robotics & autonomy",
    "Materials & chemicals"
  ],
  saas: [
    "Enterprise software"
  ],
  "saas & infrastructure": [
    "Enterprise software"
  ],
  "sector agnostic (venture capital, growth equity)": [
    "Multi-sector"
  ],
  semiconductors: [
    "Semiconductors & computing"
  ],
  "sensors & pnt": [
    "Hardware & electronics"
  ],
  "sexual & reproductive health": [
    "Healthcare"
  ],
  simulation: [
    "Semiconductors & computing"
  ],
  "smart enterprise": [
    "Enterprise software"
  ],
  software: [
    "Enterprise software"
  ],
  "software infrastructure and foundation models": [
    "AI",
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "software ai": [
    "AI",
    "Enterprise software"
  ],
  "space & defense": [
    "Space & aerospace",
    "Defense & security"
  ],
  "space & defense innovation": [
    "Space & aerospace",
    "Defense & security"
  ],
  "space tech": [
    "Space & aerospace"
  ],
  spacetech: [
    "Space & aerospace"
  ],
  "spatial computing": [
    "Semiconductors & computing"
  ],
  sports: [
    "Media & entertainment"
  ],
  "supply chain & manufacturing tech": [
    "Industrial & manufacturing",
    "Logistics & supply chain"
  ],
  sustainability: [
    "Climate & environment"
  ],
  "sustainable & healthy cities": [
    "Healthcare",
    "Climate & environment"
  ],
  "sustainable construction": [
    "Climate & environment",
    "Real estate & construction"
  ],
  "sustainable energy": [
    "Climate & environment",
    "Energy"
  ],
  "sustainable production and consumption": [
    "Climate & environment"
  ],
  "sustainable tech & climate solutions": [
    "Climate & environment"
  ],
  "sustainable agriculture": [
    "Climate & environment",
    "Food & agriculture",
    "Media & entertainment"
  ],
  "sustainable food": [
    "Climate & environment",
    "Food & agriculture"
  ],
  "sustainable materials": [
    "Climate & environment",
    "Materials & chemicals"
  ],
  tech: [
    "Unknown"
  ],
  "tech enabled services": [
    "Enterprise software"
  ],
  telecom: [
    "Telecom & connectivity"
  ],
  "therapeutic products": [
    "Biotech & life sciences"
  ],
  therapeutics: [
    "Biotech & life sciences"
  ],
  tourism: [
    "Consumer & retail"
  ],
  "transportation & logistics": [
    "Mobility & transportation",
    "Logistics & supply chain"
  ],
  "transportation & mobility": [
    "Mobility & transportation"
  ],
  urbantech: [
    "Real estate & construction"
  ],
  "vertical ai": [
    "AI"
  ],
  "vertical saas": [
    "Enterprise software"
  ],
  "vertical software": [
    "Enterprise software"
  ],
  "waste and circularity": [
    "Climate & environment"
  ],
  "water & wastewater": [
    "Climate & environment"
  ],
  watertech: [
    "Climate & environment"
  ],
  web3: [
    "Crypto & Web3"
  ],
  "web3 & blockchain": [
    "Crypto & Web3"
  ],
  "xr metaverse": [
    "Media & entertainment"
  ],
  "academic spinouts": [
    "Deep tech"
  ],
  "access control": [
    "Defense & security"
  ],
  "activist investing": [
    "Unknown"
  ],
  "advanced industrial systems": [
    "Industrial & manufacturing"
  ],
  "advanced manufacturing": [
    "Industrial & manufacturing"
  ],
  "advanced materials": [
    "Materials & chemicals"
  ],
  "ag food": [
    "Food & agriculture"
  ],
  "aging biology": [
    "Biotech & life sciences"
  ],
  "agri tech": [
    "Food & agriculture"
  ],
  agriculture: [
    "Food & agriculture",
    "Media & entertainment"
  ],
  agrifood: [
    "Food & agriculture"
  ],
  agritech: [
    "Food & agriculture"
  ],
  agtech: [
    "Food & agriculture"
  ],
  "ai infra": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "air mobility": [
    "Mobility & transportation"
  ],
  "all industries (innostarterfonds: no sector focus)": [
    "Industrial & manufacturing",
    "Multi-sector"
  ],
  "applied big data ai": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "applied sciences": [
    "Deep tech"
  ],
  "aquatic robots": [
    "Robotics & autonomy"
  ],
  "asset management": [
    "Fintech & insurance"
  ],
  "automate and digitize the physical world": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "automated workflows": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  automation: [
    "Industrial & manufacturing"
  ],
  "automation and productivity": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "automotive manufacturing": [
    "Industrial & manufacturing",
    "Mobility & transportation"
  ],
  "autonomous systems": [
    "Robotics & autonomy"
  ],
  "autonomous driving": [
    "Robotics & autonomy",
    "Mobility & transportation"
  ],
  "autonomous vehicles": [
    "Robotics & autonomy",
    "Mobility & transportation"
  ],
  aviation: [
    "Space & aerospace"
  ],
  "b2b marketplaces": [
    "Marketplaces & commerce"
  ],
  banking: [
    "Fintech & insurance"
  ],
  "banking software": [
    "Enterprise software",
    "Fintech & insurance"
  ],
  "big data": [
    "Data & cloud infrastructure"
  ],
  "bio + healthcare": [
    "Healthcare",
    "Biotech & life sciences"
  ],
  biology: [
    "Biotech & life sciences"
  ],
  biomanufacturing: [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  biopharma: [
    "Biotech & life sciences"
  ],
  biopharmaceuticals: [
    "Biotech & life sciences"
  ],
  biotech: [
    "Biotech & life sciences"
  ],
  "biotech tools and technologies": [
    "Biotech & life sciences"
  ],
  biotechnology: [
    "Biotech & life sciences"
  ],
  "blockchain applications": [
    "Crypto & Web3"
  ],
  "blockchain infrastructure": [
    "Crypto & Web3"
  ],
  brands: [
    "Consumer & retail"
  ],
  "built world real estate technology": [
    "Real estate & construction"
  ],
  "built world": [
    "Real estate & construction"
  ],
  "business services": [
    "Enterprise software"
  ],
  "business software": [
    "Enterprise software"
  ],
  buyouts: [
    "Unknown"
  ],
  "buyouts rollups": [
    "Unknown"
  ],
  "capital markets infrastructure": [
    "Fintech & insurance"
  ],
  "car development": [
    "Mobility & transportation"
  ],
  "carbon economy": [
    "Climate & environment"
  ],
  care: [
    "Healthcare"
  ],
  "care delivery": [
    "Healthcare"
  ],
  "cell and gene therapy": [
    "Biotech & life sciences"
  ],
  chemistry: [
    "Materials & chemicals"
  ],
  "circular economy": [
    "Climate & environment"
  ],
  "circularity and new materials": [
    "Climate & environment",
    "Materials & chemicals"
  ],
  "clean technologies": [
    "Climate & environment"
  ],
  "clean energy": [
    "Energy"
  ],
  "climate + sustainability": [
    "Climate & environment"
  ],
  "climate and energy tech": [
    "Climate & environment",
    "Energy"
  ],
  "climate solutions": [
    "Climate & environment"
  ],
  "climate energy": [
    "Climate & environment",
    "Energy"
  ],
  cloud: [
    "Data & cloud infrastructure"
  ],
  commerce: [
    "Marketplaces & commerce"
  ],
  "commercial open source (>commit)": [
    "Developer tools"
  ],
  communications: [
    "Telecom & connectivity"
  ],
  "community led": [
    "Unknown"
  ],
  compliance: [
    "Enterprise software"
  ],
  "compliance tech": [
    "Cybersecurity"
  ],
  "computational biology": [
    "Biotech & life sciences"
  ],
  "computer science": [
    "Unknown"
  ],
  "computer vision": [
    "AI"
  ],
  conglomerate: [
    "Unknown"
  ],
  construction: [
    "Real estate & construction"
  ],
  "construction tech": [
    "Real estate & construction"
  ],
  "construction technology": [
    "Real estate & construction"
  ],
  "consumer apps": [
    "Consumer & retail"
  ],
  "consumer brands": [
    "Consumer & retail"
  ],
  "consumer internet": [
    "Consumer & retail"
  ],
  "consumer marketplaces": [
    "Consumer & retail",
    "Marketplaces & commerce"
  ],
  "consumer platforms": [
    "Consumer & retail"
  ],
  "consumer software": [
    "Enterprise software",
    "Consumer & retail"
  ],
  "consumer tech": [
    "Consumer & retail"
  ],
  "consumer technology": [
    "Consumer & retail"
  ],
  "consumer health": [
    "Healthcare",
    "Consumer & retail"
  ],
  "consumer retail": [
    "Consumer & retail"
  ],
  "consumerized enterprise": [
    "Enterprise software",
    "Consumer & retail"
  ],
  content: [
    "Media & entertainment"
  ],
  "conviction led": [
    "Unknown"
  ],
  cpg: [
    "Consumer & retail"
  ],
  "creative technologies": [
    "Media & entertainment"
  ],
  "creator economy": [
    "Media & entertainment"
  ],
  credit: [
    "Unknown"
  ],
  "critical minerals": [
    "Materials & chemicals"
  ],
  "cross border payments": [
    "Fintech & insurance"
  ],
  crypto: [
    "Crypto & Web3"
  ],
  culture: [
    "Media & entertainment"
  ],
  data: [
    "Data & cloud infrastructure"
  ],
  "data & ai": [
    "AI",
    "Data & cloud infrastructure"
  ],
  "data analytics": [
    "Data & cloud infrastructure"
  ],
  "data driven healthcare": [
    "Data & cloud infrastructure",
    "Healthcare"
  ],
  "data infrastructure": [
    "Data & cloud infrastructure"
  ],
  "data intelligence": [
    "Data & cloud infrastructure"
  ],
  "data services": [
    "Data & cloud infrastructure"
  ],
  decarbonization: [
    "Climate & environment"
  ],
  decentralization: [
    "Crypto & Web3"
  ],
  "deep physics": [
    "Deep tech"
  ],
  "deep technology": [
    "Deep tech"
  ],
  "deep tech software": [
    "Enterprise software",
    "Deep tech"
  ],
  defense: [
    "Defense & security"
  ],
  "defense and security": [
    "Defense & security"
  ],
  defi: [
    "Crypto & Web3"
  ],
  "design and development tools": [
    "Developer tools"
  ],
  "dev tools": [
    "Developer tools"
  ],
  "developer tools": [
    "Developer tools"
  ],
  "developer tools and infrastructure": [
    "Developer tools"
  ],
  devices: [
    "Hardware & electronics"
  ],
  devops: [
    "Developer tools"
  ],
  digital: [
    "Unknown"
  ],
  "digital biology": [
    "Biotech & life sciences"
  ],
  "digital lifestyle": [
    "Consumer & retail"
  ],
  "digital media": [
    "Media & entertainment"
  ],
  "digital sales and services": [
    "Marketplaces & commerce"
  ],
  "digital startups": [
    "Unknown"
  ],
  "digital identity": [
    "Cybersecurity"
  ],
  "digital infrastructure": [
    "Data & cloud infrastructure"
  ],
  digitalization: [
    "Enterprise software"
  ],
  "disruptive innovation": [
    "Unknown"
  ],
  "distressed debt": [
    "Unknown"
  ],
  diversified: [
    "Multi-sector"
  ],
  drones: [
    "Defense & security"
  ],
  "drug discovery": [
    "Biotech & life sciences"
  ],
  "drug discovery tools": [
    "Biotech & life sciences"
  ],
  "drug delivery": [
    "Biotech & life sciences"
  ],
  "dual use": [
    "Defense & security"
  ],
  "dual use & defence (e2d fund)": [
    "Defense & security"
  ],
  "dual use hardware": [
    "Hardware & electronics",
    "Defense & security"
  ],
  "e commerce and marketplaces": [
    "Marketplaces & commerce"
  ],
  "e health": [
    "Healthcare"
  ],
  "early stage": [
    "Unknown"
  ],
  "ecology, digitalization and social responsibility (innoventurefonds)": [
    "Enterprise software",
    "Climate & environment"
  ],
  education: [
    "Education & work"
  ],
  "electric vehicles": [
    "Mobility & transportation"
  ],
  electrification: [
    "Energy"
  ],
  electronics: [
    "Hardware & electronics"
  ],
  "emerging technologies": [
    "Unknown"
  ],
  "emerging markets": [
    "Unknown"
  ],
  "energy and infrastructure sustainability": [
    "Climate & environment",
    "Energy"
  ],
  "energy equipment": [
    "Energy"
  ],
  "energy services": [
    "Energy"
  ],
  "energy sustainability": [
    "Climate & environment",
    "Energy"
  ],
  "energy tech": [
    "Energy"
  ],
  "energy technology": [
    "Energy"
  ],
  "energy cleantech": [
    "Climate & environment",
    "Energy"
  ],
  "energy hardware": [
    "Hardware & electronics",
    "Energy"
  ],
  "energy storage": [
    "Energy"
  ],
  "energy climate": [
    "Climate & environment",
    "Energy"
  ],
  engineering: [
    "Industrial & manufacturing"
  ],
  "enterprise saas": [
    "Enterprise software"
  ],
  "enterprise and consumer technology": [
    "Enterprise software",
    "Consumer & retail"
  ],
  "enterprise risk management": [
    "Enterprise software",
    "Cybersecurity"
  ],
  "enterprise technology": [
    "Enterprise software"
  ],
  "enterprise ai": [
    "AI",
    "Enterprise software"
  ],
  "enterprise cloud": [
    "Enterprise software",
    "Data & cloud infrastructure"
  ],
  "enterprise it": [
    "Enterprise software"
  ],
  entertainment: [
    "Media & entertainment"
  ],
  ev: [
    "Mobility & transportation"
  ],
  evtol: [
    "Mobility & transportation"
  ],
  "exa scale computing": [
    "Semiconductors & computing"
  ],
  experience: [
    "Unknown"
  ],
  "fin tech": [
    "Fintech & insurance"
  ],
  finance: [
    "Fintech & insurance"
  ],
  "financial technologies": [
    "Fintech & insurance"
  ],
  "financial wellness": [
    "Fintech & insurance",
    "Healthcare"
  ],
  "fintech and infrastructure": [
    "Fintech & insurance"
  ],
  "fintech crypto": [
    "Fintech & insurance",
    "Crypto & Web3"
  ],
  "fintech insurtech": [
    "Fintech & insurance"
  ],
  fleet: [
    "Mobility & transportation"
  ],
  food: [
    "Food & agriculture"
  ],
  "food ag": [
    "Food & agriculture"
  ],
  "food and beverage": [
    "Food & agriculture"
  ],
  "food beverage": [
    "Food & agriculture"
  ],
  "food systems": [
    "Food & agriculture"
  ],
  "food tech": [
    "Food & agriculture"
  ],
  "founder coaching": [
    "Unknown"
  ],
  "franchise brands": [
    "Consumer & retail"
  ],
  "fraud risk": [
    "Fintech & insurance"
  ],
  "frontier infrastructure": [
    "Data & cloud infrastructure"
  ],
  "frontier models": [
    "AI"
  ],
  "frontier technology": [
    "Deep tech"
  ],
  "fund management": [
    "Unknown"
  ],
  "future of commerce": [
    "Marketplaces & commerce"
  ],
  "gene therapy": [
    "Biotech & life sciences"
  ],
  generalist: [
    "Multi-sector"
  ],
  "generalist growth": [
    "Multi-sector"
  ],
  "generative media": [
    "Media & entertainment"
  ],
  "generative ai": [
    "AI"
  ],
  genomics: [
    "Biotech & life sciences"
  ],
  graphics: [
    "Semiconductors & computing"
  ],
  "greenhouse tech": [
    "Food & agriculture"
  ],
  grid: [
    "Energy"
  ],
  "ground robots": [
    "Robotics & autonomy"
  ],
  "growth capital": [
    "Unknown"
  ],
  "growth equity": [
    "Unknown"
  ],
  "hard science": [
    "Deep tech"
  ],
  hardtech: [
    "Deep tech"
  ],
  hardware: [
    "Hardware & electronics"
  ],
  "hardware enabled solutions": [
    "Hardware & electronics"
  ],
  "hardware manufacturing": [
    "Hardware & electronics",
    "Industrial & manufacturing"
  ],
  "health and wellness": [
    "Healthcare"
  ],
  "health technology": [
    "Healthcare"
  ],
  "health wellness": [
    "Healthcare"
  ],
  "healthcare information technology and services": [
    "Healthcare"
  ],
  "healthcare tools": [
    "Healthcare"
  ],
  "healthcare it": [
    "Healthcare"
  ],
  healthspan: [
    "Healthcare"
  ],
  "healthtech + services": [
    "Healthcare"
  ],
  "high growth companies": [
    "Unknown"
  ],
  "high tech growth": [
    "Unknown"
  ],
  holdings: [
    "Unknown"
  ],
  horticulture: [
    "Food & agriculture",
    "Media & entertainment"
  ],
  hospitality: [
    "Consumer & retail"
  ],
  housing: [
    "Real estate & construction"
  ],
  hpc: [
    "Semiconductors & computing"
  ],
  "human experiences": [
    "Media & entertainment"
  ],
  ict: [
    "Telecom & connectivity"
  ],
  "immersive technologies": [
    "Media & entertainment"
  ],
  impact: [
    "Unknown"
  ],
  "industrial biotech": [
    "Biotech & life sciences",
    "Industrial & manufacturing"
  ],
  "industrial decarbonisation": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "industrial digitalisation and automation": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "industrial edge": [
    "Data & cloud infrastructure",
    "Industrial & manufacturing"
  ],
  "industrial innovation": [
    "Industrial & manufacturing"
  ],
  "industrial problems": [
    "Industrial & manufacturing"
  ],
  "industrial tech": [
    "Industrial & manufacturing"
  ],
  "industrial ai": [
    "AI",
    "Industrial & manufacturing"
  ],
  "industrial automation": [
    "Industrial & manufacturing"
  ],
  "industrial decarbonization": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "industrial iot": [
    "Hardware & electronics",
    "Industrial & manufacturing"
  ],
  "industrial software": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  "industry agnostic": [
    "Industrial & manufacturing",
    "Multi-sector"
  ],
  "industry software": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  industrytech: [
    "Industrial & manufacturing"
  ],
  "information technology": [
    "Unknown"
  ],
  "infra tooling": [
    "Data & cloud infrastructure"
  ],
  innovation: [
    "Unknown"
  ],
  "innovative approaches to new and existing industries": [
    "Industrial & manufacturing"
  ],
  insurance: [
    "Fintech & insurance"
  ],
  insuretech: [
    "Fintech & insurance"
  ],
  intelligence: [
    "Unknown"
  ],
  "intelligent collaboration": [
    "Enterprise software"
  ],
  "interactive media": [
    "Media & entertainment"
  ],
  internet: [
    "Unknown"
  ],
  "investment bank": [
    "Fintech & insurance"
  ],
  "ip driven": [
    "Unknown"
  ],
  israel: [
    "Unknown"
  ],
  "it media": [
    "Media & entertainment"
  ],
  "it services": [
    "Enterprise software"
  ],
  "japan corridor": [
    "Unknown"
  ],
  "labour infrastructure": [
    "Education & work"
  ],
  "law enforcement tech": [
    "Defense & security"
  ],
  learning: [
    "Education & work"
  ],
  "legal tech": [
    "Enterprise software"
  ],
  "life sciences and technology": [
    "Biotech & life sciences"
  ],
  "liquid assets": [
    "Unknown"
  ],
  "listed infrastructure": [
    "Unknown"
  ],
  "logistics supply chain": [
    "Logistics & supply chain"
  ],
  logtech: [
    "Logistics & supply chain"
  ],
  "long term equity": [
    "Unknown"
  ],
  "machine learning": [
    "AI"
  ],
  "manufacturing, supply chain and logistics technology": [
    "Industrial & manufacturing",
    "Logistics & supply chain"
  ],
  "manufacturing tech": [
    "Industrial & manufacturing"
  ],
  maritime: [
    "Mobility & transportation"
  ],
  marketplace: [
    "Marketplaces & commerce"
  ],
  "materials science": [
    "Materials & chemicals"
  ],
  "materials transition": [
    "Materials & chemicals"
  ],
  "media tech": [
    "Media & entertainment"
  ],
  "medical technologies": [
    "Healthcare"
  ],
  medtech: [
    "Healthcare",
    "Education & work"
  ],
  "mental health": [
    "Healthcare"
  ],
  "mid cap": [
    "Unknown"
  ],
  mobile: [
    "Unknown"
  ],
  "mobile apps": [
    "Unknown"
  ],
  "mobility and logistics": [
    "Mobility & transportation",
    "Logistics & supply chain"
  ],
  "money fintech": [
    "Fintech & insurance"
  ],
  "national security": [
    "Defense & security"
  ],
  "network effect businesses": [
    "Unknown"
  ],
  "new space": [
    "Space & aerospace"
  ],
  "new energy": [
    "Energy"
  ],
  "new materials": [
    "Materials & chemicals"
  ],
  "niche manufacturing and service businesses": [
    "Industrial & manufacturing"
  ],
  "nordic growth": [
    "Unknown"
  ],
  "nuclear fusion": [
    "Energy"
  ],
  oceans: [
    "Climate & environment"
  ],
  oncology: [
    "Biotech & life sciences"
  ],
  "online entertainment": [
    "Media & entertainment"
  ],
  "operating partner": [
    "Unknown"
  ],
  other: [
    "Unknown"
  ],
  payments: [
    "Fintech & insurance"
  ],
  "people technology": [
    "Education & work"
  ],
  pharma: [
    "Biotech & life sciences"
  ],
  pharmaceuticals: [
    "Biotech & life sciences"
  ],
  "physical economy": [
    "Industrial & manufacturing"
  ],
  "physical products converging with the internet": [
    "Hardware & electronics"
  ],
  "physical science": [
    "Deep tech"
  ],
  "physical security": [
    "Defense & security"
  ],
  physics: [
    "Deep tech"
  ],
  pipe: [
    "Unknown"
  ],
  "placement agent": [
    "Unknown"
  ],
  "planetary health": [
    "Healthcare",
    "Climate & environment"
  ],
  platform: [
    "Unknown"
  ],
  "point of sale": [
    "Marketplaces & commerce"
  ],
  "precision medicine": [
    "Healthcare"
  ],
  "preferred securities": [
    "Unknown"
  ],
  privacy: [
    "Cybersecurity"
  ],
  "private equity": [
    "Unknown"
  ],
  "private credit": [
    "Unknown"
  ],
  "private markets": [
    "Unknown"
  ],
  "process automation": [
    "Enterprise software",
    "Industrial & manufacturing"
  ],
  productivity: [
    "Enterprise software"
  ],
  "professional services": [
    "Enterprise software"
  ],
  "prop tech": [
    "Real estate & construction"
  ],
  "property management": [
    "Real estate & construction"
  ],
  "public sector": [
    "Unknown"
  ],
  "public equities": [
    "Unknown"
  ],
  "public safety": [
    "Defense & security"
  ],
  "quantitative investing": [
    "Unknown"
  ],
  "quantum communications": [
    "Semiconductors & computing",
    "Telecom & connectivity"
  ],
  "quantum materials": [
    "Semiconductors & computing",
    "Materials & chemicals"
  ],
  "quantum networks": [
    "Semiconductors & computing",
    "Telecom & connectivity"
  ],
  "quantum sensing": [
    "Semiconductors & computing",
    "Hardware & electronics"
  ],
  "quantum supply chain": [
    "Semiconductors & computing"
  ],
  "quantum technology": [
    "Semiconductors & computing"
  ],
  "real estate and construction technology": [
    "Real estate & construction"
  ],
  "real estate technology": [
    "Real estate & construction"
  ],
  "real assets": [
    "Unknown"
  ],
  "real estate construction": [
    "Real estate & construction"
  ],
  "real world ai": [
    "AI",
    "Robotics & autonomy"
  ],
  "regional development": [
    "Unknown"
  ],
  "regional development fund": [
    "Unknown"
  ],
  regulatory: [
    "Unknown"
  ],
  reits: [
    "Real estate & construction"
  ],
  "reproductive longevity": [
    "Healthcare"
  ],
  "research tools": [
    "Deep tech"
  ],
  "residential services": [
    "Real estate & construction"
  ],
  "resilience and adaptation": [
    "Climate & environment"
  ],
  restaurant: [
    "Food & agriculture"
  ],
  retail: [
    "Consumer & retail"
  ],
  "retail technology": [
    "Consumer & retail"
  ],
  "revenue based financing": [
    "Unknown"
  ],
  "risk management": [
    "Unknown"
  ],
  "rna therapeutics": [
    "Biotech & life sciences"
  ],
  "robotics autonomous systems": [
    "Robotics & autonomy"
  ],
  "royalty finance": [
    "Fintech & insurance"
  ],
  "royalty financing": [
    "Unknown"
  ],
  safety: [
    "Defense & security"
  ],
  "scalable infrastructure": [
    "Unknown"
  ],
  "science and technology": [
    "Deep tech"
  ],
  "sector agnostic": [
    "Multi-sector"
  ],
  "sector agnostic: portfolio spans sectors, stages, and regions": [
    "Multi-sector"
  ],
  security: [
    "Defense & security"
  ],
  "selective software and consumer": [
    "Enterprise software",
    "Consumer & retail"
  ],
  semiconductor: [
    "Semiconductors & computing"
  ],
  sensing: [
    "Hardware & electronics"
  ],
  sensors: [
    "Hardware & electronics"
  ],
  services: [
    "Unknown"
  ],
  "services as software": [
    "Enterprise software"
  ],
  silicon: [
    "Semiconductors & computing"
  ],
  "skilled trades": [
    "Industrial & manufacturing"
  ],
  "small cap": [
    "Unknown"
  ],
  "small mid cap equities": [
    "Unknown"
  ],
  "smart agents": [
    "AI"
  ],
  "smart spaces": [
    "Real estate & construction"
  ],
  "smart buildings": [
    "Real estate & construction"
  ],
  "smart city": [
    "Real estate & construction"
  ],
  "smart energy": [
    "Energy"
  ],
  "smart home": [
    "Hardware & electronics"
  ],
  "smart infrastructure": [
    "Unknown"
  ],
  "sme lending": [
    "Fintech & insurance"
  ],
  "social impact": [
    "Unknown"
  ],
  "software and saas": [
    "Enterprise software"
  ],
  "software beyond the screen": [
    "Enterprise software"
  ],
  "software infrastructure": [
    "Data & cloud infrastructure"
  ],
  "software driven hardware": [
    "Hardware & electronics",
    "Enterprise software"
  ],
  "software driven startups": [
    "Enterprise software"
  ],
  "software it": [
    "Enterprise software"
  ],
  space: [
    "Space & aerospace"
  ],
  "space and aerospace": [
    "Space & aerospace"
  ],
  "special situations": [
    "Unknown"
  ],
  "specialty finance": [
    "Fintech & insurance"
  ],
  "sports and entertainment": [
    "Media & entertainment"
  ],
  "sports tech": [
    "Media & entertainment"
  ],
  storage: [
    "Energy"
  ],
  "strategy advisory": [
    "Unknown"
  ],
  "supply chain": [
    "Logistics & supply chain"
  ],
  "sustainability (energy, cleantech, foodtech, mobility)": [
    "Climate & environment",
    "Energy",
    "Mobility & transportation",
    "Food & agriculture"
  ],
  "sustainability tech": [
    "Climate & environment"
  ],
  "sustainability services": [
    "Climate & environment"
  ],
  "sustainable industrial innovation": [
    "Climate & environment",
    "Industrial & manufacturing"
  ],
  "swiss smes": [
    "Unknown"
  ],
  "synthetic biology": [
    "Biotech & life sciences"
  ],
  "tax tech": [
    "Enterprise software"
  ],
  "team productivity and collaboration": [
    "Enterprise software"
  ],
  "tech enabled consumer": [
    "Consumer & retail"
  ],
  techbio: [
    "Biotech & life sciences"
  ],
  technology: [
    "Unknown"
  ],
  "technology enabled sectors": [
    "Unknown"
  ],
  "technology startups": [
    "Unknown"
  ],
  "technology based ventures": [
    "Unknown"
  ],
  "technology enabled business services": [
    "Enterprise software"
  ],
  "technology enabled companies": [
    "Unknown"
  ],
  "technology growth": [
    "Unknown"
  ],
  telco: [
    "Telecom & connectivity"
  ],
  "telco and it cloud infrastructure": [
    "Data & cloud infrastructure",
    "Telecom & connectivity"
  ],
  "textile manufacturing": [
    "Industrial & manufacturing"
  ],
  "the cfo stack": [
    "Fintech & insurance"
  ],
  tmt: [
    "Telecom & connectivity",
    "Media & entertainment"
  ],
  "transport mobility": [
    "Mobility & transportation"
  ],
  transportation: [
    "Mobility & transportation"
  ],
  travel: [
    "Consumer & retail"
  ],
  trusttech: [
    "Cybersecurity"
  ],
  uas: [
    "Defense & security"
  ],
  "uk smes": [
    "Unknown"
  ],
  utilities: [
    "Energy"
  ],
  "venture capital": [
    "Unknown"
  ],
  "venture debt": [
    "Unknown"
  ],
  "vertical saas & ai": [
    "AI",
    "Enterprise software"
  ],
  "vertical and horizontal software": [
    "Enterprise software"
  ],
  "vertical technologies": [
    "Unknown"
  ],
  "voice technology": [
    "AI"
  ],
  vr: [
    "Media & entertainment"
  ],
  water: [
    "Climate & environment"
  ],
  "wealth and asset management": [
    "Fintech & insurance"
  ],
  wellness: [
    "Healthcare"
  ],
  "women led": [
    "Unknown"
  ],
  "womens health": [
    "Healthcare"
  ],
  work: [
    "Education & work"
  ],
  "work technology": [
    "Education & work"
  ],
  workwear: [
    "Consumer & retail"
  ]
}, nh = (a) => a.toLowerCase().replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
function B4(a) {
  const s = Array.isArray(a) ? a : typeof a == "string" ? [a] : [], l = new Set(s.flatMap((r) => {
    const u = String(r), h = y1.find((f) => nh(f) === nh(u));
    return h ? [h] : L4[nh(u)] || ["Unknown"];
  }));
  return y1.filter((r) => l.has(r));
}
const cr = { q: "", columns: ["name", "stages", "sectors", "leads_rounds", "record_level", "people_count"], filters: [], match: "all", sorts: [{ field: "name", direction: "asc" }], group: "", list: "" }, qx = "funds-view-v2", fn = (a) => Array.isArray(a) ? a.map(fn).join(", ") : a == null ? "" : typeof a == "object" ? JSON.stringify(a) : String(a), Cr = (a) => Array.isArray(a) ? a.map(fn).filter(Boolean) : fn(a) ? [fn(a)] : [], ua = (a) => a == null || a === "" || Array.isArray(a) && !a.length, Qc = (a) => a === !0 || a === "yes" ? "Yes" : a === !1 || a === "no" ? "No" : ua(a) ? "Unknown" : fn(a), v1 = (a) => ({ aum: "AUM", lps: "LPs", hq: "HQ", id: "ID", "jev-score": "Jev score" })[a] || a.replaceAll("_", " ").replace(/^./, (s) => s.toUpperCase()), H4 = [1e8, 3e8, 5e8, 1e9, 2e9, 5e9, 1e10, 5e10, 1e11, 1 / 0], Rh = ["Under 100M", "100M to <300M", "300M to <500M", "500M to <1B", "1B to <2B", "2B to <5B", "5B to <10B", "10B to <50B", "50B to <100B", "100B+"], b1 = { EUR: 1, USD: 1.1225, GBP: 0.85033, CHF: 0.9279, JPY: 176.99, CAD: 1.5984, AUD: 1.6176, CNY: 7.5259, SEK: 11.29, NOK: 10.8315, DKK: 7.4736, INR: 108.1245, HKD: 8.8084, SGD: 1.4366, NZD: 2.0002 };
function q4(a) {
  if (ua(a)) return "Unknown";
  const s = fn(a).trim(), l = s.match(/\b(?:EUR|USD|GBP|CHF|JPY|CAD|AUD|CNY|SEK|NOK|DKK|INR|HKD|SGD|NZD)\b|Euro\b|US\$|C\$|A\$|[$€£]/i)?.[0], r = l ? { "€": "EUR", "£": "GBP", $: "USD", US$: "USD", C$: "CAD", A$: "AUD", EURO: "EUR" }[l.toUpperCase()] || l.toUpperCase() : "USD", u = s.match(/^(?:(?:approximately|about|over|more than|at least|rund)\s+)?(?:(?:[A-Z]{3}|US|C|A)\s*)?[$€£]?\s*(\d+(?:,\d{3})*(?:[.,]\d+)?)\s*(trillion|billion|million|milliarden|millions|bn|mn|[kmbt])?\b/i);
  if (!u) return "Unknown";
  const h = Number(/^\d+,\d{1,2}$/.test(u[1]) ? u[1].replace(",", ".") : u[1].replaceAll(",", "")), f = (u[2] || "").toLowerCase(), p = h * (f.startsWith("t") ? 1e12 : f === "milliarden" || f.startsWith("b") ? 1e9 : f.startsWith("m") ? 1e6 : f === "k" ? 1e3 : 1);
  if (!Number.isFinite(p) || p <= 0 || !f && p < 1e6) return "Unknown";
  const y = r === "USD" ? p : p * b1.USD / b1[r];
  return Number.isFinite(y) ? Rh[H4.findIndex((v) => y < v)] : "Unknown";
}
const _h = ["pre-seed", "seed", "series A", "series B", "series C+", "growth", "any", "unknown"];
function G4(a) {
  const s = Cr(a).flatMap((l) => {
    const r = l.toLowerCase().trim().replace(/[-_]+/g, " ").replace(/\s+/g, " ");
    if (/^(any|multi stage|stage agnostic)\b/.test(r)) return ["any"];
    if (/^(growth|growth stage|growth equity)$/.test(r)) return ["growth"];
    if (/^(pre seed|pre incorporation|inception)$/.test(r)) return ["pre-seed"];
    if (/^(seed|late seed)$/.test(r)) return ["seed"];
    const u = r.match(/^(?:early )?series ([a-z])\+?$/);
    return u ? [u[1] === "a" ? "series A" : u[1] === "b" ? "series B" : "series C+"] : ["unknown"];
  });
  return _h.filter((l) => s.includes(l));
}
function x1() {
  try {
    const a = new URLSearchParams(location.hash.split("?")[1] || ""), s = a.get("view") || localStorage.getItem(qx), l = s ? JSON.parse(s) : {};
    if (!l || typeof l != "object") return cr;
    const r = { ...cr, ...l };
    if (typeof r.q != "string" || typeof r.group != "string" || typeof r.list != "string" || !["all", "any"].includes(r.match) || !Array.isArray(r.columns) || !r.columns.every((u) => typeof u == "string") || !Array.isArray(r.filters) || !r.filters.every((u) => u && typeof u.field == "string" && typeof u.op == "string" && typeof u.value == "string") || !Array.isArray(r.sorts) || !r.sorts.every((u) => u && typeof u.field == "string" && ["asc", "desc"].includes(u.direction))) return cr;
    a.has("view") && a.get("v") !== "2" && (r.group = ""), a.has("q") && (r.q = a.get("q") || "");
    for (const [u, h] of a) u.startsWith("f.") && (r.filters = [...r.filters, { field: u.slice(2), op: "contains", value: h }]);
    return r;
  } catch {
    return cr;
  }
}
function S1(a, s, l) {
  const r = l.find((p) => p.id === s.field);
  if (!r) return !0;
  const u = r.get(a), h = s.value.trim().toLowerCase();
  if (s.op === "empty") return ua(u);
  if (s.op === "present") return !ua(u);
  if (!h) return !0;
  if (ua(u)) return r.kind === "boolean" && s.op === "equals" && h === "unknown";
  if (r.kind === "number") {
    const p = Number(u), y = Number(h);
    return !Number.isFinite(p) || !Number.isFinite(y) ? !1 : s.op === "gte" ? p >= y : s.op === "lte" ? p <= y : s.op === "not" ? p !== y : p === y;
  }
  const f = r.kind === "boolean" ? [Qc(u).toLowerCase()] : Cr(u).map((p) => p.toLowerCase());
  return s.op === "equals" ? f.includes(h) : s.op === "not" ? !f.includes(h) : s.op === "excludes" ? !f.some((p) => p.includes(h)) : s.op === "gte" ? fn(u) >= s.value : s.op === "lte" ? fn(u) <= s.value : f.some((p) => p.includes(h));
}
function Fc({ value: a, kind: s = "tags" }) {
  const l = s === "research" ? a === "sourced" ? "green" : "gray" : s === "boolean" ? a === "Yes" ? "green" : a === "No" ? "gray" : "amber" : ["violet", "blue", "orange", "green"][Array.from(a).reduce((r, u) => r + u.charCodeAt(0), 0) % 4];
  return /* @__PURE__ */ d.jsxs("span", { className: "fund-pill " + l, children: [
    /* @__PURE__ */ d.jsx("span", { className: "pill-dot" }),
    s === "research" ? a === "sourced" ? "Sourced" : "Directory" : a
  ] });
}
function Y4({ column: a, fund: s }) {
  const l = a.get(s);
  if (a.id === "name") {
    const r = /^https?:\/\//i.test(s.website || "") ? s.website : s.domain ? "https://" + s.domain : "";
    return /* @__PURE__ */ d.jsxs("div", { className: "fund-name", children: [
      /* @__PURE__ */ d.jsx("span", { className: "fund-monogram", children: s.name.slice(0, 2).toUpperCase() }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        /* @__PURE__ */ d.jsx("a", { href: "#page=" + encodeURIComponent("public/firms/" + s.id), children: /* @__PURE__ */ d.jsx("strong", { children: s.name }) }),
        /* @__PURE__ */ d.jsx("small", { children: r ? /* @__PURE__ */ d.jsx("a", { className: "fund-website", href: r, target: "_blank", rel: "noopener noreferrer", children: s.domain || r }) : s.domain })
      ] })
    ] });
  }
  return ua(l) ? /* @__PURE__ */ d.jsx("span", { className: "fund-unknown", children: "Unknown" }) : a.kind === "research" ? /* @__PURE__ */ d.jsx(Fc, { value: fn(l), kind: "research" }) : a.kind === "boolean" ? /* @__PURE__ */ d.jsx(Fc, { value: Qc(l), kind: "boolean" }) : a.kind === "tags" ? /* @__PURE__ */ d.jsx(X4, { items: Cr(l) }, JSON.stringify(l)) : a.kind === "number" ? /* @__PURE__ */ d.jsx("span", { className: "fund-number", children: Number(l).toLocaleString() }) : /* @__PURE__ */ d.jsx("span", { className: "fund-text", title: fn(l), children: fn(l) });
}
function X4({ items: a }) {
  const [s, l] = C.useState(!1);
  return /* @__PURE__ */ d.jsx("div", { className: "fund-tags", children: (s ? a : a.slice(0, 2)).map((r, u) => !s && u === 1 && a.length > 2 ? /* @__PURE__ */ d.jsxs("span", { className: "fund-tag-tail", children: [
    /* @__PURE__ */ d.jsx(Fc, { value: r }),
    /* @__PURE__ */ d.jsxs("button", { className: "extra-tags", "aria-label": "Show " + (a.length - 2) + " more tags", onClick: () => l(!0), children: [
      "+",
      a.length - 2
    ] })
  ] }, r) : /* @__PURE__ */ d.jsx(Fc, { value: r }, r)) });
}
function Z4({ funds: a, people: s, revision: l, shortlistsOnly: r = !1 }) {
  const [u, h] = C.useState(x1), [f, p] = C.useState(), [y, v] = C.useState(""), [x, g] = C.useState(""), [S, E] = C.useState(!1), [j, V] = C.useState(""), [M, q] = C.useState([]), [L, K] = C.useState([]), [X, ee] = C.useState(null), [oe, Q] = C.useState(""), [D, W] = C.useState(""), te = C.useRef(null), [Ae, Ce] = C.useState(""), Te = C.useRef(null), Ee = C.useMemo(() => {
    const R = /* @__PURE__ */ new Map();
    s.forEach((F) => R.set(F.firm_id, (R.get(F.firm_id) || 0) + 1));
    const J = /* @__PURE__ */ new Set(["type", "stages", "sectors", "geographies", "offices"]), I = [.../* @__PURE__ */ new Set(["type", "hq", "stages", "sectors", "geographies", "leads_rounds", "check_size_min", "check_size_max", "aum", "founded", ...a.flatMap((F) => Object.keys(F.fields))])];
    return [
      { id: "name", label: "Fund", kind: "text", get: (F) => F.name },
      ...I.map((F) => ({ id: F, label: { hq: "Headquarters", leads_rounds: "Leads rounds", check_size_min: "Min. check", check_size_max: "Max. check" }[F] || v1(F), kind: J.has(F) ? "tags" : F === "founded" ? "number" : F === "leads_rounds" ? "boolean" : "text", get: (we) => F === "stages" ? G4(we.fields[F]) : F === "sectors" ? B4(we.fields[F]) : we.fields[F] })),
      { id: "record_level", label: "Research", kind: "research", get: (F) => F.record_level },
      { id: "researched_at", label: "Research date", kind: "date", get: (F) => F.researched_at },
      { id: "people_count", label: "People", kind: "number", get: (F) => R.get(F.id) || 0 },
      { id: "portfolio_count", label: "Portfolio", kind: "number", get: (F) => F.portfolio.length },
      { id: "sources_count", label: "Sources", kind: "number", get: (F) => F.sources.length },
      { id: "domain", label: "Domain", kind: "text", get: (F) => F.domain },
      { id: "website", label: "Website", kind: "text", get: (F) => F.website },
      { id: "id", label: "ID", kind: "text", get: (F) => F.id },
      ...[...new Set(a.flatMap((F) => Object.keys(F.scores || {})))].sort().map((F) => ({ id: "score:" + F, label: v1(F) + " (completeness)", kind: "number", get: (we) => we.scores?.[F] }))
    ];
  }, [a, s]), ce = f?.lists.find((R) => R.id === u.list);
  async function Z(R) {
    try {
      const J = await fetch("/api/shortlists", { signal: R }), I = await J.json();
      if (!J.ok) throw new Error(I.error);
      p(I);
    } catch (J) {
      J instanceof Error && J.name === "AbortError" || v(J instanceof Error ? J.message : "Cannot load shortlists");
    }
  }
  C.useEffect(() => {
    const R = new AbortController();
    return Z(R.signal), () => R.abort();
  }, [l]), C.useEffect(() => {
    try {
      localStorage.setItem(qx, JSON.stringify(u));
    } catch {
    }
    const R = r ? "shortlists" : "directory";
    history.replaceState(null, "", "#" + R + "?v=2&view=" + encodeURIComponent(JSON.stringify(u)));
  }, [u, r]), C.useEffect(() => {
    X ? te.current?.showModal() : te.current?.close();
  }, [X]), C.useEffect(() => {
    const R = () => {
      ["directory", "firms-table", "shortlists"].includes(location.hash.slice(1).split("?")[0]) && (h(x1()), q([]), K([]));
    };
    return window.addEventListener("hashchange", R), () => window.removeEventListener("hashchange", R);
  }, []);
  const $ = (R) => {
    h((J) => ({ ...J, ...R })), K([]);
  }, ne = (R) => {
    $({ list: R }), q([]), g("");
  };
  function he(R, J = []) {
    v(""), Q(R === "rename" && ce?.name || ""), W(ce?.id || f?.lists[0]?.id || ""), ee({ mode: R, ids: J });
  }
  async function P(R, J, I = !0) {
    if (f) {
      E(!0), v(""), g("");
      try {
        const F = await fetch("/api/shortlists", { method: "POST", headers: { "Content-Type": "application/json", "X-Shortlist-Token": f.token }, body: JSON.stringify({ revision: f.revision, action: R, ...J }) }), we = await F.json();
        if (!F.ok) throw new Error(we.error || "Cannot save shortlist");
        p(we), q([]), I && ee(null), R === "create" && r && ne(we.changed_id), g(R === "create" ? "Shortlist created." : R === "remove" ? "Funds removed from shortlist." : "Shortlist saved.");
      } catch (F) {
        v(F instanceof Error ? F.message : "Cannot save shortlist");
      } finally {
        E(!1);
      }
    }
  }
  const Ye = [.../* @__PURE__ */ new Set(["name", ...u.columns])].map((R) => Ee.find((J) => J.id === R)).filter((R) => !!R), ut = C.useMemo(() => {
    const R = u.list ? new Set(ce?.firm_ids || []) : null, J = u.q.trim().toLowerCase();
    return a.filter((I) => (!R || R.has(I.id)) && (!J || Ee.some((F) => fn(F.get(I)).toLowerCase().includes(J))) && (!u.filters.length || (u.match === "any" ? u.filters.some((F) => S1(I, F, Ee)) : u.filters.every((F) => S1(I, F, Ee))))).sort((I, F) => {
      for (const we of u.sorts) {
        const ot = Ee.find((as) => as.id === we.field);
        if (!ot) continue;
        const Qn = ot.get(I), Tn = ot.get(F);
        if (ua(Qn) !== ua(Tn)) return ua(Qn) ? 1 : -1;
        const ma = ot.kind === "number" ? Number(Qn) - Number(Tn) : fn(Qn).localeCompare(fn(Tn), void 0, { numeric: !0, sensitivity: "base" });
        if (ma) return we.direction === "asc" ? ma : -ma;
      }
      return I.id.localeCompare(F.id);
    });
  }, [a, Ee, u, ce]), ke = Ee.find((R) => R.id === u.group), T = C.useMemo(() => {
    if (!ke) return [["All funds", ut]];
    const R = /* @__PURE__ */ new Map();
    for (const J of ut) {
      const I = ke.get(J), F = ke.id === "score:jev-score" && !ua(I) && Number.isFinite(Number(I)) ? Math.floor(Number(I) / 10) * 10 : null, we = ke.id === "aum" ? [q4(I)] : ke.id === "score:jev-score" ? F === null ? [] : [F === 100 ? "100" : `${F}-${F + 9}`] : ke.kind === "boolean" ? [Qc(I)] : Cr(I);
      for (const ot of new Set(we.length ? we : [ke.id === "stages" ? "unknown" : "Unknown"])) R.set(ot, [...R.get(ot) || [], J]);
    }
    return [...R].sort(([J], [I]) => ke.id === "stages" ? _h.indexOf(J) - _h.indexOf(I) : J === "Unknown" ? 1 : I === "Unknown" ? -1 : ke.id === "aum" ? Rh.findIndex((F) => J.startsWith(F)) - Rh.findIndex((F) => I.startsWith(F)) || J.localeCompare(I) : J.localeCompare(I, void 0, { numeric: !0 }));
  }, [ut, ke]), H = T.flatMap(([R, J]) => L.includes(R) ? [] : J.map((I) => ({ group: R, fund: I }))), ae = JSON.stringify([u.q, u.filters, u.match, u.sorts, u.group, u.list, l, L]), { count: me, loadMore: Ne, hasMore: xe } = kx(H.length, ae);
  C.useEffect(() => {
    Te.current && (Te.current.scrollTop = 0);
  }, [ae]);
  const Me = H.slice(0, me), le = [...new Set(Me.map((R) => R.fund.id))], Se = T.filter(([R]) => L.includes(R) || Me.some((J) => J.group === R)), Tt = le.length > 0 && le.every((R) => M.includes(R)), Rt = (R) => q((J) => J.includes(R) ? J.filter((I) => I !== R) : [...J, R]), an = (R, J) => {
    const I = Ye.map((ot) => ot.id), F = I.indexOf(R), we = F + J;
    we < 1 || we >= I.length || ([I[F], I[we]] = [I[we], I[F]], $({ columns: I }));
  }, _t = (R, J) => $({ filters: u.filters.map((I, F) => R === F ? { ...I, ...J } : I) }), at = (R) => $({ sorts: [{ field: R, direction: u.sorts[0]?.field === R && u.sorts[0].direction === "asc" ? "desc" : "asc" }, ...u.sorts.filter((J) => J.field !== R)] }), Ze = ce?.firm_ids.filter((R) => !a.some((J) => J.id === R)) || [];
  return /* @__PURE__ */ d.jsxs("section", { className: "funds-workbench", "aria-label": "Funds explorer", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "funds-heading", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("h1", { children: r ? "Shortlists" : "Funds" }),
        /* @__PURE__ */ d.jsxs("p", { children: [
          a.length.toLocaleString(),
          " funds",
          /* @__PURE__ */ d.jsx("span", { children: "·" }),
          f?.lists.length || 0,
          " shortlists"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs(da, { onClick: () => he("create"), disabled: !f, children: [
        /* @__PURE__ */ d.jsx(GA, { size: 15 }),
        "New shortlist"
      ] })
    ] }),
    y && /* @__PURE__ */ d.jsxs("div", { role: "alert", className: "notice", children: [
      y,
      " ",
      /* @__PURE__ */ d.jsx("button", { onClick: () => {
        v(""), Z();
      }, children: "Reload lists" })
    ] }),
    x && /* @__PURE__ */ d.jsxs("p", { className: "funds-message", role: "status", children: [
      /* @__PURE__ */ d.jsx(dx, { size: 15 }),
      x
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "funds-surface", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "funds-tabs", children: [
        /* @__PURE__ */ d.jsxs("button", { className: u.list ? "" : "active", onClick: () => ne(""), children: [
          "All funds ",
          /* @__PURE__ */ d.jsx("span", { children: a.length })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { children: [
          /* @__PURE__ */ d.jsx(or, { size: 15 }),
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "Browse shortlist", value: u.list, onChange: (R) => ne(R.target.value), children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Shortlists" }),
            f?.lists.map((R) => /* @__PURE__ */ d.jsxs("option", { value: R.id, children: [
              R.name,
              " (",
              R.firm_ids.length,
              ")"
            ] }, R.id))
          ] })
        ] }),
        ce && /* @__PURE__ */ d.jsx("button", { className: "rename-list", onClick: () => he("rename"), children: "Rename" })
      ] }),
      r && !u.list && /* @__PURE__ */ d.jsx("div", { className: "shortlist-cards", children: f?.lists.length ? f.lists.map((R) => /* @__PURE__ */ d.jsxs("button", { onClick: () => ne(R.id), children: [
        /* @__PURE__ */ d.jsx(or, { size: 18 }),
        /* @__PURE__ */ d.jsx("strong", { children: R.name }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          R.firm_ids.length,
          " funds"
        ] })
      ] }, R.id)) : /* @__PURE__ */ d.jsx("p", { children: "No shortlists yet. Create one, then add funds." }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "funds-toolbar", children: [
        /* @__PURE__ */ d.jsxs("label", { className: "funds-search", children: [
          /* @__PURE__ */ d.jsx(i1, { size: 16 }),
          /* @__PURE__ */ d.jsx("input", { type: "search", "aria-label": "Search funds", placeholder: "Search funds...", value: u.q, onChange: (R) => $({ q: R.target.value }) })
        ] }),
        /* @__PURE__ */ d.jsx("div", { className: "funds-controls", children: [{ id: "filters", icon: /* @__PURE__ */ d.jsx(XA, { size: 15 }), title: "Filters", count: u.filters.length }, { id: "sort", icon: /* @__PURE__ */ d.jsx(e1, { size: 15 }), title: "Sort", count: u.sorts.length }, { id: "group", icon: /* @__PURE__ */ d.jsx(cm, { size: 15 }), title: "Group", count: u.group ? 1 : 0 }, { id: "columns", icon: /* @__PURE__ */ d.jsx(jA, { size: 15 }), title: "Columns", count: Ye.length }].map((R) => /* @__PURE__ */ d.jsxs("button", { "aria-expanded": j === R.id, onClick: () => V(j === R.id ? "" : R.id), children: [
          R.icon,
          R.title,
          R.count > 0 && /* @__PURE__ */ d.jsx("span", { children: R.count })
        ] }, R.id)) })
      ] }),
      j && /* @__PURE__ */ d.jsxs("div", { className: "funds-settings", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "settings-heading", children: [
          /* @__PURE__ */ d.jsx("strong", { children: j === "columns" ? "Visible columns" : j === "group" ? "Group funds" : j === "sort" ? "Sort funds" : "Filter funds" }),
          /* @__PURE__ */ d.jsx("button", { "aria-label": "Close settings", onClick: () => V(""), children: /* @__PURE__ */ d.jsx(ir, { size: 16 }) })
        ] }),
        j === "columns" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("input", { "aria-label": "Find column", placeholder: "Find a column...", value: Ae, onChange: (R) => Ce(R.target.value) }),
          /* @__PURE__ */ d.jsx("div", { className: "column-choices", children: [...Ye, ...Ee.filter((R) => !Ye.some((J) => J.id === R.id))].filter((R) => R.label.toLowerCase().includes(Ae.toLowerCase())).map((R) => /* @__PURE__ */ d.jsxs("div", { children: [
            /* @__PURE__ */ d.jsxs("label", { children: [
              /* @__PURE__ */ d.jsx("input", { type: "checkbox", checked: Ye.some((J) => J.id === R.id), disabled: R.id === "name", onChange: (J) => $({ columns: J.target.checked ? [...u.columns, R.id] : u.columns.filter((I) => I !== R.id) }) }),
              R.label
            ] }),
            R.id !== "name" && Ye.some((J) => J.id === R.id) && /* @__PURE__ */ d.jsxs("span", { children: [
              /* @__PURE__ */ d.jsx("button", { "aria-label": "Move " + R.label + " left", onClick: () => an(R.id, -1), disabled: Ye[1]?.id === R.id, children: /* @__PURE__ */ d.jsx(t1, { size: 13 }) }),
              /* @__PURE__ */ d.jsx("button", { "aria-label": "Move " + R.label + " right", onClick: () => an(R.id, 1), disabled: Ye.at(-1)?.id === R.id, children: /* @__PURE__ */ d.jsx(Wv, { size: 13 }) })
            ] })
          ] }, R.id)) }),
          /* @__PURE__ */ d.jsx("button", { className: "text-button", onClick: () => $({ columns: cr.columns }), children: "Reset columns" })
        ] }),
        j === "group" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { className: "setting-label", children: [
            "Group by",
            /* @__PURE__ */ d.jsxs("select", { "aria-label": "Group by", value: u.group, onChange: (R) => $({ group: R.target.value }), children: [
              /* @__PURE__ */ d.jsx("option", { value: "", children: "None" }),
              Ee.filter((R) => R.id !== "name").map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.label }, R.id))
            ] })
          ] }),
          /* @__PURE__ */ d.jsx("p", { children: u.group === "aum" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            "AUM buckets are in USD. Unspecified currencies are treated as USD. Conversion uses ",
            /* @__PURE__ */ d.jsx("a", { className: "text-link", href: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html", target: "_blank", rel: "noreferrer", children: "ECB rates from 2 October 2026" }),
            "."
          ] }) : /* @__PURE__ */ d.jsx(d.Fragment, { children: "Funds with several values appear in each matching group. Empty values appear under Unknown." }) }),
          /* @__PURE__ */ d.jsxs("div", { className: "settings-actions", children: [
            /* @__PURE__ */ d.jsx("button", { onClick: () => {
              K(T.map(([R]) => R));
            }, children: "Collapse all" }),
            /* @__PURE__ */ d.jsx("button", { onClick: () => {
              K([]);
            }, children: "Expand all" })
          ] })
        ] }),
        j === "sort" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          u.sorts.map((R, J) => /* @__PURE__ */ d.jsxs("div", { className: "rule-row", children: [
            /* @__PURE__ */ d.jsx("span", { children: J + 1 }),
            /* @__PURE__ */ d.jsx("select", { "aria-label": "Sort field " + (J + 1), value: R.field, onChange: (I) => $({ sorts: u.sorts.map((F, we) => we === J ? { ...F, field: I.target.value } : F) }), children: Ee.map((I) => /* @__PURE__ */ d.jsx("option", { value: I.id, children: I.label }, I.id)) }),
            /* @__PURE__ */ d.jsxs("select", { "aria-label": "Sort direction " + (J + 1), value: R.direction, onChange: (I) => $({ sorts: u.sorts.map((F, we) => we === J ? { ...F, direction: I.target.value } : F) }), children: [
              /* @__PURE__ */ d.jsx("option", { value: "asc", children: "Ascending" }),
              /* @__PURE__ */ d.jsx("option", { value: "desc", children: "Descending" })
            ] }),
            /* @__PURE__ */ d.jsx("button", { "aria-label": "Remove sort " + (J + 1), onClick: () => $({ sorts: u.sorts.filter((I, F) => J !== F) }), children: /* @__PURE__ */ d.jsx(ir, { size: 15 }) })
          ] }, J)),
          /* @__PURE__ */ d.jsxs("button", { className: "text-button", onClick: () => $({ sorts: [...u.sorts, { field: Ee.find((R) => !u.sorts.some((J) => J.field === R.id))?.id || "name", direction: "asc" }] }), children: [
            /* @__PURE__ */ d.jsx($d, { size: 14 }),
            "Add sort"
          ] }),
          /* @__PURE__ */ d.jsx("p", { children: "Sorts apply within each group. Unknown values appear last." })
        ] }),
        j === "filters" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("label", { className: "setting-label", children: [
            "Match",
            /* @__PURE__ */ d.jsxs("select", { "aria-label": "Filter match", value: u.match, onChange: (R) => $({ match: R.target.value }), children: [
              /* @__PURE__ */ d.jsx("option", { value: "all", children: "All rules" }),
              /* @__PURE__ */ d.jsx("option", { value: "any", children: "Any rule" })
            ] })
          ] }),
          u.filters.map((R, J) => {
            const I = Ee.find((we) => we.id === R.field), F = [...new Set(a.flatMap((we) => I?.kind === "boolean" ? [Qc(I.get(we))] : Cr(I?.get(we))))].sort();
            return /* @__PURE__ */ d.jsxs("div", { className: "rule-row", children: [
              /* @__PURE__ */ d.jsx("select", { "aria-label": "Filter field " + (J + 1), value: R.field, onChange: (we) => _t(J, { field: we.target.value, op: "equals", value: "" }), children: Ee.map((we) => /* @__PURE__ */ d.jsx("option", { value: we.id, children: we.label }, we.id)) }),
              /* @__PURE__ */ d.jsx("select", { "aria-label": "Filter operator " + (J + 1), value: R.op, onChange: (we) => _t(J, { op: we.target.value }), children: [...I?.kind === "number" || I?.kind === "date" ? [] : [["contains", "contains"], ["excludes", "does not contain"]], ["equals", "is"], ["not", "is not"], ...I?.kind === "number" || I?.kind === "date" ? [["gte", "at least / after"], ["lte", "at most / before"]] : [], ["empty", "is unknown"], ["present", "is recorded"]].map(([we, ot]) => /* @__PURE__ */ d.jsx("option", { value: we, children: ot }, we)) }),
              !["empty", "present"].includes(R.op) && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                /* @__PURE__ */ d.jsx("input", { "aria-label": "Filter value " + (J + 1), list: "filter-options-" + J, type: I?.kind === "number" ? "number" : I?.kind === "date" ? "date" : "text", placeholder: "Value", value: R.value, onChange: (we) => _t(J, { value: we.target.value }) }),
                /* @__PURE__ */ d.jsx("datalist", { id: "filter-options-" + J, children: F.slice(0, 500).map((we) => /* @__PURE__ */ d.jsx("option", { value: we }, we)) })
              ] }),
              /* @__PURE__ */ d.jsx("button", { "aria-label": "Remove filter " + (J + 1), onClick: () => $({ filters: u.filters.filter((we, ot) => J !== ot) }), children: /* @__PURE__ */ d.jsx(ir, { size: 15 }) })
            ] }, J);
          }),
          /* @__PURE__ */ d.jsxs("div", { className: "settings-actions", children: [
            /* @__PURE__ */ d.jsxs("button", { onClick: () => $({ filters: [...u.filters, { field: "sectors", op: "contains", value: "" }] }), children: [
              /* @__PURE__ */ d.jsx($d, { size: 14 }),
              "Add filter"
            ] }),
            u.filters.length > 0 && /* @__PURE__ */ d.jsx("button", { onClick: () => $({ filters: [] }), children: "Clear filters" })
          ] })
        ] })
      ] }),
      u.filters.length > 0 && /* @__PURE__ */ d.jsxs("div", { className: "active-filters", children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          u.match === "all" ? "All" : "Any",
          ":"
        ] }),
        u.filters.map((R, J) => /* @__PURE__ */ d.jsxs("button", { onClick: () => $({ filters: u.filters.filter((I, F) => J !== F) }), children: [
          Ee.find((I) => I.id === R.field)?.label,
          " ",
          R.op,
          " ",
          R.value,
          /* @__PURE__ */ d.jsx(ir, { size: 12 })
        ] }, J))
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "funds-results", children: [
        /* @__PURE__ */ d.jsxs("span", { children: [
          ce && /* @__PURE__ */ d.jsxs("strong", { children: [
            ce.name,
            " · "
          ] }),
          ut.length.toLocaleString(),
          " funds",
          ke && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            " · ",
            T.length,
            " groups"
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("div", { children: M.length > 0 ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("span", { children: [
            M.length,
            " selected"
          ] }),
          /* @__PURE__ */ d.jsxs("button", { onClick: () => he("add", M), disabled: !f, children: [
            /* @__PURE__ */ d.jsx($d, { size: 14 }),
            "Add to shortlist"
          ] }),
          ce && /* @__PURE__ */ d.jsx("button", { disabled: S, onClick: () => {
            P("remove", { id: ce.id, firm_ids: M });
          }, children: "Remove from list" }),
          /* @__PURE__ */ d.jsx("button", { onClick: () => q([]), children: "Clear" })
        ] }) : /* @__PURE__ */ d.jsx("span", { children: "Select funds to add to a shortlist" }) })
      ] }),
      Ze.length > 0 && /* @__PURE__ */ d.jsxs("p", { className: "notice", children: [
        Ze.length,
        " saved funds are no longer in the catalog. Their IDs remain saved in this shortlist."
      ] }),
      u.list && f && !ce && /* @__PURE__ */ d.jsx("p", { role: "alert", className: "notice", children: "This shortlist is unavailable. Choose another list or All funds." }),
      /* @__PURE__ */ d.jsxs("div", { ref: Te, className: "funds-table-scroll", tabIndex: 0, "aria-label": "Scrollable funds table", children: [
        /* @__PURE__ */ d.jsxs("table", { className: "funds-table", children: [
          /* @__PURE__ */ d.jsx("caption", { className: "sr-only", children: ce?.name || "Funds" }),
          /* @__PURE__ */ d.jsx("thead", { children: /* @__PURE__ */ d.jsxs("tr", { children: [
            /* @__PURE__ */ d.jsx("th", { className: "select-cell", children: /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Select loaded funds", checked: Tt, disabled: !le.length, onChange: () => q((R) => Tt ? R.filter((J) => !le.includes(J)) : [.../* @__PURE__ */ new Set([...R, ...le])]) }) }),
            Ye.map((R) => /* @__PURE__ */ d.jsx("th", { className: R.id === "name" ? "fund-name-column" : void 0, "aria-sort": u.sorts[0]?.field === R.id ? u.sorts[0].direction === "asc" ? "ascending" : "descending" : void 0, children: /* @__PURE__ */ d.jsxs("button", { onClick: () => at(R.id), children: [
              R.label,
              u.sorts.some((J) => J.field === R.id) ? u.sorts.find((J) => J.field === R.id)?.direction === "asc" ? /* @__PURE__ */ d.jsx(t1, { size: 12 }) : /* @__PURE__ */ d.jsx(Wv, { size: 12 }) : /* @__PURE__ */ d.jsx(e1, { size: 12 })
            ] }) }, R.id)),
            /* @__PURE__ */ d.jsxs("th", { children: [
              /* @__PURE__ */ d.jsx("span", { className: "sr-only", children: "Shortlists" }),
              /* @__PURE__ */ d.jsx(or, { size: 14 })
            ] })
          ] }) }),
          Se.map(([R, J]) => /* @__PURE__ */ d.jsxs("tbody", { children: [
            ke && /* @__PURE__ */ d.jsx("tr", { className: "fund-group", children: /* @__PURE__ */ d.jsx("th", { colSpan: Ye.length + 2, children: /* @__PURE__ */ d.jsxs("button", { "aria-expanded": !L.includes(R), onClick: () => {
              K((I) => I.includes(R) ? I.filter((F) => F !== R) : [...I, R]);
            }, children: [
              /* @__PURE__ */ d.jsx(hx, { size: 15, className: L.includes(R) ? "collapsed" : "" }),
              /* @__PURE__ */ d.jsx("span", { className: "group-dot" }),
              /* @__PURE__ */ d.jsx("strong", { children: ke.kind === "research" ? R === "sourced" ? "Sourced profiles" : "Directory seeds" : R }),
              /* @__PURE__ */ d.jsx("span", { className: "group-count", children: J.length })
            ] }) }) }),
            !L.includes(R) && Me.filter((I) => I.group === R).map(({ fund: I }) => /* @__PURE__ */ d.jsxs("tr", { className: M.includes(I.id) ? "selected" : "", children: [
              /* @__PURE__ */ d.jsx("td", { className: "select-cell", children: /* @__PURE__ */ d.jsx("input", { type: "checkbox", "aria-label": "Select " + I.name, checked: M.includes(I.id), onChange: () => Rt(I.id) }) }),
              Ye.map((F) => /* @__PURE__ */ d.jsx("td", { children: /* @__PURE__ */ d.jsx(Y4, { column: F, fund: I }) }, F.id)),
              /* @__PURE__ */ d.jsx("td", { children: /* @__PURE__ */ d.jsx("button", { className: "fund-save " + (f?.lists.some((F) => F.firm_ids.includes(I.id)) ? "saved" : ""), "aria-label": "Add " + I.name + " to shortlist", title: f?.lists.filter((F) => F.firm_ids.includes(I.id)).map((F) => F.name).join(", ") || "Add to shortlist", onClick: () => he("add", [I.id]), disabled: !f, children: /* @__PURE__ */ d.jsx(or, { size: 16 }) }) })
            ] }, I.id))
          ] }, R))
        ] }),
        H.length > 0 && /* @__PURE__ */ d.jsx(Dx, { hasMore: xe, onLoad: Ne }),
        !ut.length && /* @__PURE__ */ d.jsxs("div", { className: "funds-empty", children: [
          /* @__PURE__ */ d.jsx(i1, { size: 24 }),
          /* @__PURE__ */ d.jsx("h2", { children: ce && !ce.firm_ids.length ? "This shortlist is empty" : "No matching funds" }),
          /* @__PURE__ */ d.jsx("p", { children: ce && !ce.firm_ids.length ? "Open All funds and add funds to this list." : "Change the search or filters to see more funds." }),
          /* @__PURE__ */ d.jsx("button", { onClick: () => $({ q: "", filters: [] }), children: "Clear search and filters" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "funds-load-count", children: [
        me,
        " of ",
        H.length,
        " rows loaded",
        ke?.kind === "tags" ? " (funds may appear in several groups)" : ""
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("p", { className: "funds-footnote", children: "Directory data is unverified. Research dates and sources are available in each profile. Completeness scores do not measure investment fit." }),
    /* @__PURE__ */ d.jsx("dialog", { ref: te, className: "shortlist-dialog", "aria-labelledby": "shortlist-dialog-title", onCancel: (R) => {
      S ? R.preventDefault() : ee(null);
    }, onClose: () => {
      S || ee(null);
    }, children: X && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("div", { className: "settings-heading", children: [
        /* @__PURE__ */ d.jsx("h2", { id: "shortlist-dialog-title", children: X.mode === "rename" ? "Rename shortlist" : X.mode === "create" ? "New shortlist" : "Add to shortlist" }),
        /* @__PURE__ */ d.jsx("button", { "aria-label": "Close shortlist dialog", disabled: S, onClick: () => ee(null), children: /* @__PURE__ */ d.jsx(ir, { size: 18 }) })
      ] }),
      X.ids.length > 0 && /* @__PURE__ */ d.jsxs("p", { children: [
        X.ids.length,
        " ",
        X.ids.length === 1 ? "fund" : "funds",
        " selected"
      ] }),
      y && /* @__PURE__ */ d.jsxs("p", { className: "notice", role: "alert", children: [
        y,
        " ",
        /* @__PURE__ */ d.jsx("button", { disabled: S, onClick: () => {
          v(""), Z();
        }, children: "Reload lists" })
      ] }),
      X.mode === "add" && f?.lists.length !== 0 && /* @__PURE__ */ d.jsxs("label", { children: [
        "Shortlist",
        /* @__PURE__ */ d.jsxs("select", { "aria-label": "Destination shortlist", value: D, onChange: (R) => W(R.target.value), children: [
          f?.lists.map((R) => /* @__PURE__ */ d.jsx("option", { value: R.id, children: R.name }, R.id)),
          /* @__PURE__ */ d.jsx("option", { value: "", children: "Create new shortlist" })
        ] })
      ] }),
      (X.mode !== "add" || !D) && /* @__PURE__ */ d.jsxs("label", { children: [
        "Shortlist name",
        /* @__PURE__ */ d.jsx("input", { autoFocus: !0, "aria-label": "Shortlist name", maxLength: 100, value: oe, onChange: (R) => Q(R.target.value), placeholder: "e.g. European seed funds" })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "dialog-actions", children: [
        /* @__PURE__ */ d.jsx(da, { variant: "outline", disabled: S, onClick: () => ee(null), children: "Cancel" }),
        /* @__PURE__ */ d.jsx(da, { disabled: S || !f || (X.mode !== "add" || !D) && !oe.trim(), onClick: () => {
          P(X.mode === "rename" ? "rename" : X.mode === "add" && D ? "add" : "create", { id: X.mode === "rename" ? ce?.id : D, name: oe, firm_ids: X.ids });
        }, children: S ? "Saving..." : X.mode === "rename" ? "Save name" : X.mode === "add" && D ? "Add funds" : "Create shortlist" })
      ] })
    ] }) })
  ] });
}
const K4 = {
  neutral: { icon: CA, style: "bg-neutral-100 text-neutral-600 ring-neutral-500/15" },
  success: { icon: yA, style: "bg-emerald-50 text-emerald-700 ring-emerald-600/15" },
  warning: { icon: dM, style: "bg-amber-50 text-amber-800 ring-amber-600/15" },
  info: { icon: bA, style: "bg-sky-50 text-sky-700 ring-sky-600/15" },
  violet: { icon: iM, style: "bg-violet-50 text-violet-700 ring-violet-600/15" },
  danger: { icon: wA, style: "bg-rose-50 text-rose-700 ring-rose-600/15" }
};
function vi({ children: a, tone: s = "neutral", className: l, showIcon: r = !0 }) {
  const { icon: u, style: h } = K4[s];
  return /* @__PURE__ */ d.jsxs("span", { "data-tone": s, className: ye("inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ring-1 ring-inset", h, l), children: [
    r && /* @__PURE__ */ d.jsx(u, { className: "size-3 shrink-0", strokeWidth: 2, "aria-hidden": "true" }),
    a
  ] });
}
function yr({
  code: a,
  filename: s,
  language: l = "tsx",
  collapsedLines: r = 8,
  variant: u = "Default",
  className: h,
  copyLabel: f = "Copy code"
}) {
  const [p, y] = C.useState(!1), [v, x] = C.useState(!1), g = C.useRef(void 0);
  C.useEffect(() => () => clearTimeout(g.current), []);
  const S = a.replace(/\n$/, "").split(`
`), E = S.length > r, j = v || !E ? S : S.slice(0, r);
  async function V() {
    try {
      await navigator.clipboard.writeText(a);
    } catch {
      return;
    }
    y(!0), clearTimeout(g.current), g.current = setTimeout(() => y(!1), 1600);
  }
  return /* @__PURE__ */ d.jsxs(
    "figure",
    {
      className: ye(
        "w-full max-w-[500px] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-xs dark:border-white/[0.08] dark:bg-[#0B0B0D]",
        h
      ),
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex items-center justify-between gap-3 border-b border-black/[0.06] px-3 py-1.5 dark:border-white/[0.07]", children: [
          /* @__PURE__ */ d.jsxs("span", { className: "flex min-w-0 items-center gap-1.5", children: [
            /* @__PURE__ */ d.jsx(LA, { className: "size-3.5 shrink-0 text-neutral-400 dark:text-neutral-500" }),
            /* @__PURE__ */ d.jsx("span", { className: "truncate font-mono text-[11px] text-neutral-500 dark:text-neutral-400", children: s ?? l })
          ] }),
          /* @__PURE__ */ d.jsx(
            "button",
            {
              type: "button",
              onClick: V,
              "aria-label": p ? "Code copied" : f,
              className: "grid size-7 shrink-0 place-items-center rounded-md text-neutral-400 transition-[color,transform] duration-150 hover:text-neutral-700 active:scale-[0.94] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-500 dark:hover:text-neutral-200",
              children: /* @__PURE__ */ d.jsxs("span", { className: "relative grid size-3.5 place-items-center", children: [
                /* @__PURE__ */ d.jsx(
                  kA,
                  {
                    className: ye(
                      "absolute size-3.5 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      p ? "opacity-0 blur-[2px]" : "opacity-100 blur-0"
                    )
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  dx,
                  {
                    className: ye(
                      "absolute size-3.5 text-emerald-600 transition-[opacity,filter] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] dark:text-emerald-400",
                      p ? "opacity-100 blur-0" : "opacity-0 blur-[2px]"
                    )
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ d.jsx("pre", { className: "code-content overflow-x-auto py-3", tabIndex: 0, "aria-label": s ?? "Code", children: /* @__PURE__ */ d.jsx("code", { children: j.map((M, q) => /* @__PURE__ */ d.jsxs("span", { className: "flex px-4 font-mono text-xs leading-[1.9]", children: [
          u === "Numbered" && /* @__PURE__ */ d.jsx(
            "span",
            {
              "aria-hidden": !0,
              className: "mr-3 w-5 shrink-0 select-none text-right tabular-nums text-neutral-400",
              children: q + 1
            }
          ),
          /* @__PURE__ */ d.jsxs("span", { className: "min-w-0 whitespace-pre-wrap break-words text-neutral-700", children: [
            M || " ",
            `
`
          ] })
        ] }, q)) }) }),
        E && /* @__PURE__ */ d.jsxs(
          "button",
          {
            type: "button",
            "aria-expanded": v,
            onClick: () => x((M) => !M),
            className: "flex w-full items-center justify-center gap-1 border-t border-black/[0.06] py-1.5 font-mono text-[10.5px] text-neutral-400 transition-colors duration-150 hover:bg-black/[0.02] hover:text-neutral-700 dark:hover:bg-white/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:border-white/[0.07] dark:text-neutral-500 dark:hover:text-neutral-300",
            children: [
              v ? "collapse" : `${S.length - r} more lines`,
              /* @__PURE__ */ d.jsx(
                hx,
                {
                  className: ye(
                    "size-3 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
                    v && "rotate-180"
                  )
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const zh = (a) => "#page=" + encodeURIComponent(a), Q4 = (a) => "'" + a.replaceAll("'", `'"'"'`) + "'";
function F4({ row: a, listId: s }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "prospect-detail", children: [
    /* @__PURE__ */ d.jsx("p", { children: /* @__PURE__ */ d.jsx("a", { href: zh("public/firms/" + a.firm_id), children: "Open public research" }) }),
    /* @__PURE__ */ d.jsx("h4", { children: "Fit reasons and evidence" }),
    /* @__PURE__ */ d.jsx("ul", { children: a.reasons.map((l) => /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: l.criterion }),
      " ",
      /* @__PURE__ */ d.jsx(vi, { tone: l.status === "match" ? "success" : l.status === "conflict" ? "warning" : "neutral", children: l.status === "conflict" ? "potential mismatch" : l.status }),
      /* @__PURE__ */ d.jsx("p", { children: l.detail }),
      l.evidence.map((r) => /* @__PURE__ */ d.jsxs("p", { children: [
        /* @__PURE__ */ d.jsxs("a", { href: r.url, target: "_blank", rel: "noreferrer", children: [
          "Source for ",
          r.field
        ] }),
        " · ",
        r.as_of || "Date unknown",
        " · ",
        r.freshness
      ] }, r.field))
    ] }, l.criterion)) }),
    /* @__PURE__ */ d.jsx("h4", { children: "Review flags" }),
    a.warnings.length ? a.warnings.map((l, r) => /* @__PURE__ */ d.jsxs("p", { children: [
      l.detail,
      l.url && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        " ",
        /* @__PURE__ */ d.jsx("a", { href: l.url, target: "_blank", rel: "noreferrer", children: "Source" }),
        " (",
        l.as_of || "date unknown",
        ")"
      ] })
    ] }, r)) : /* @__PURE__ */ d.jsx("p", { children: "No recorded flags. This does not establish absence of conflicts." }),
    /* @__PURE__ */ d.jsx("h4", { children: "Public contacts" }),
    a.contacts.length ? /* @__PURE__ */ d.jsx("ul", { children: a.contacts.map((l) => /* @__PURE__ */ d.jsxs("li", { children: [
      /* @__PURE__ */ d.jsx("strong", { children: l.name }),
      " · ",
      l.title,
      " · Research date: ",
      l.researched_at || "unknown",
      /* @__PURE__ */ d.jsxs("p", { children: [
        l.focus || "Focus not recorded",
        l.focus_overlap ? " (textual focus overlap; verify relevance)" : ""
      ] }),
      l.sources.map((r) => /* @__PURE__ */ d.jsx("a", { href: r, target: "_blank", rel: "noreferrer", children: "Source " }, r))
    ] }, l.id)) }) : /* @__PURE__ */ d.jsx("p", { children: "No public contacts recorded. Research the current team before outreach." }),
    /* @__PURE__ */ d.jsx("h4", { children: "Track explicitly in your terminal" }),
    /* @__PURE__ */ d.jsx(yr, { code: s ? `uv run fundraising-buddy prospects-track ${s} --firm ${a.firm_id}` : `uv run fundraising-buddy track ${a.firm_id}`, filename: "Track selected investor", language: "sh", copyLabel: "Copy tracking command", className: "command-block" }),
    /* @__PURE__ */ d.jsx("p", { children: "Tracking preserves existing relationship history. It does not send a message." })
  ] });
}
function I4({ revision: a }) {
  const [s, l] = C.useState(), [r, u] = C.useState(""), [h, f] = C.useState(""), [p, y] = C.useState([]), [v, x] = C.useState("my-shortlist"), [g, S] = C.useState("My shortlist");
  if (C.useEffect(() => {
    const L = new AbortController();
    return u(""), fetch("/api/prospects", { signal: L.signal }).then(async (K) => {
      const X = await K.json();
      if (!K.ok) throw new Error(X.error || "Unable to load prospects");
      return X;
    }).then((K) => {
      l(K), y([]);
    }).catch((K) => {
      K.name !== "AbortError" && u(K.message);
    }), () => L.abort();
  }, [a]), r) return /* @__PURE__ */ d.jsx("p", { role: "alert", className: "notice", children: r });
  if (!s) return /* @__PURE__ */ d.jsx("p", { role: "status", children: "Loading private prospect criteria..." });
  const E = s.lists.find((L) => L.id === h), j = E ? E.rows : s.rows, V = [
    { id: "name", header: "Investor", sortable: !0, cell: (L) => /* @__PURE__ */ d.jsx("a", { className: "text-link", href: zh("public/firms/" + L.firm_id), children: L.name }) },
    { id: "support_score", header: "Supported fit", sortable: !0, numeric: !0, cell: (L) => `${L.support_score}/100` },
    { id: "record_level", header: "Evidence", sortable: !0, cell: (L) => /* @__PURE__ */ d.jsx(vi, { tone: L.record_level === "sourced" ? "success" : "neutral", children: L.record_level }) },
    { id: "matches", header: "Matches", value: (L) => L.counts.match, numeric: !0 },
    { id: "conflicts", header: "Potential mismatches", value: (L) => L.counts.conflict, numeric: !0 },
    { id: "uncertainties", header: "Unknown / unverified", value: (L) => L.counts.unknown + L.counts.unverified, numeric: !0 }
  ], q = /^[a-z0-9][a-z0-9-]{0,79}$/.test(v) && g.trim() && p.length ? `uv run fundraising-buddy prospects-save ${v} --name ${Q4(g)} ` + p.map((L) => "--firm " + L).join(" ") : "";
  return /* @__PURE__ */ d.jsxs("section", { "aria-label": "Private prospect workflow", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "evidence-note", children: [
      /* @__PURE__ */ d.jsx(KA, { size: 18, "aria-hidden": "true" }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("strong", { children: "How matching works" }),
        /* @__PURE__ */ d.jsx("p", { children: "Supported fit measures recorded sourced support for your criteria. Unknown data is not a mismatch, legacy tags are unverified, and completeness scores do not affect ranking." })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "prospect-setup", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "prospect-panel criteria-panel", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "panel-heading", children: [
          /* @__PURE__ */ d.jsx("span", { className: "panel-icon", children: /* @__PURE__ */ d.jsx(rM, { size: 18 }) }),
          /* @__PURE__ */ d.jsxs("div", { children: [
            /* @__PURE__ */ d.jsx("p", { className: "section-kicker", children: "01 / CRITERIA" }),
            /* @__PURE__ */ d.jsx("h2", { children: "Company and round criteria" })
          ] }),
          /* @__PURE__ */ d.jsx(vi, { tone: "violet", children: "Private" })
        ] }),
        /* @__PURE__ */ d.jsxs("p", { children: [
          "Set your stage, sectors, geography, check range, and lead requirements. Edit ",
          /* @__PURE__ */ d.jsx("code", { children: "workspace/prospects/criteria.json" }),
          " with your agent, then click Refresh."
        ] }),
        /* @__PURE__ */ d.jsxs("details", { children: [
          /* @__PURE__ */ d.jsx("summary", { children: E ? "Saved criteria snapshot" : "Current private criteria" }),
          /* @__PURE__ */ d.jsx(yr, { code: JSON.stringify(E ? E.criteria : s.criteria, null, 2), filename: "criteria.json", language: "json", collapsedLines: 100, variant: "Numbered", copyLabel: "Copy private criteria", className: "command-block" })
        ] }),
        !E && /* @__PURE__ */ d.jsxs("p", { className: "setup-command", children: [
          "First time? Run ",
          /* @__PURE__ */ d.jsx("code", { children: "uv run fundraising-buddy prospects-init" }),
          " to create the private criteria file."
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "prospect-panel shortlist-panel", children: [
        /* @__PURE__ */ d.jsxs("div", { className: "panel-heading", children: [
          /* @__PURE__ */ d.jsx("span", { className: "panel-icon", children: /* @__PURE__ */ d.jsx(IA, { size: 18 }) }),
          /* @__PURE__ */ d.jsxs("div", { children: [
            /* @__PURE__ */ d.jsx("p", { className: "section-kicker", children: "02 / CANDIDATES" }),
            /* @__PURE__ */ d.jsx("h2", { children: E ? "Saved shortlist" : "Choose a shortlist" })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: "field-label", children: [
          "View shortlist",
          /* @__PURE__ */ d.jsxs("select", { "aria-label": "View shortlist", value: h, onChange: (L) => {
            f(L.target.value), y([]);
          }, children: [
            /* @__PURE__ */ d.jsx("option", { value: "", children: "Current matching results" }),
            s.lists.map((L) => /* @__PURE__ */ d.jsx("option", { value: L.id, children: L.name }, L.id))
          ] })
        ] }),
        E ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsxs("p", { children: [
            "Saved ",
            new Date(E.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
            ". These are recorded results, not live matching. Create a new snapshot to revise the list."
          ] }),
          /* @__PURE__ */ d.jsx(yr, { code: `uv run fundraising-buddy prospects-export ${E.id} --format csv`, filename: "Export privately (use --format json for JSON)", language: "sh", copyLabel: "Copy export command", className: "command-block" }),
          /* @__PURE__ */ d.jsx(da, { variant: "outline", size: "sm", asChild: !0, children: /* @__PURE__ */ d.jsxs("a", { href: zh("private/prospect-lists/" + E.id), children: [
            "Open linked wiki snapshot",
            /* @__PURE__ */ d.jsx(tu, {})
          ] }) })
        ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx("p", { children: s.message || "Compare recorded support, potential mismatches, and unverified hints. Expand a row to inspect evidence, dates, conflicts, and contacts before selecting it." }),
          /* @__PURE__ */ d.jsxs("div", { className: "shortlist-summary", children: [
            /* @__PURE__ */ d.jsxs(vi, { tone: "info", children: [
              j.length.toLocaleString(),
              " candidates"
            ] }),
            /* @__PURE__ */ d.jsxs("span", { children: [
              s.lists.length,
              " saved ",
              s.lists.length === 1 ? "list" : "lists"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(gr, { className: "records-table", data: j, columns: V, rowId: (L) => L.firm_id, rowLabel: (L) => L.name, title: E ? E.name : "Matching candidates", caption: "Private investor matching candidates", searchable: !0, searchPlaceholder: "Search matching candidates...", batchSize: 50, variant: "panel", keyboardNavigation: !1, clipboard: !1, selectable: !E, selectedIds: p, onSelectedChange: y, renderDetail: (L) => /* @__PURE__ */ d.jsx(F4, { row: L, listId: E?.id || "" }) }, h || "preview"),
    !E && /* @__PURE__ */ d.jsxs("div", { className: "prospect-panel save-panel", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "panel-heading", children: [
        /* @__PURE__ */ d.jsx("span", { className: "panel-icon", children: /* @__PURE__ */ d.jsx(UA, { size: 18 }) }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("p", { className: "section-kicker", children: "03 / SAVE LIST" }),
          /* @__PURE__ */ d.jsx("h2", { children: "Save selected investors" })
        ] }),
        /* @__PURE__ */ d.jsxs(vi, { tone: p.length ? "violet" : "neutral", children: [
          p.length,
          " selected"
        ] })
      ] }),
      /* @__PURE__ */ d.jsx("p", { children: "Select investors after reviewing their evidence. Each new list preserves its criteria and results; nothing is saved automatically." }),
      /* @__PURE__ */ d.jsxs("div", { className: "prospect-inputs", children: [
        /* @__PURE__ */ d.jsxs("label", { className: "field-label", children: [
          "New list ID",
          /* @__PURE__ */ d.jsx("input", { value: v, onChange: (L) => x(L.target.value) })
        ] }),
        /* @__PURE__ */ d.jsxs("label", { className: "field-label", children: [
          "List name",
          /* @__PURE__ */ d.jsx("input", { value: g, onChange: (L) => S(L.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("p", { role: "status", className: "selection-status", children: [
        p.length,
        " investors selected"
      ] }),
      q ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
        /* @__PURE__ */ d.jsx("p", { children: "Run this command in your terminal, then Refresh:" }),
        /* @__PURE__ */ d.jsx(yr, { code: q, filename: "Save shortlist command", language: "sh", copyLabel: "Copy save command", className: "command-block" })
      ] }) : /* @__PURE__ */ d.jsxs("div", { className: "selection-hint", children: [
        /* @__PURE__ */ d.jsx(um, { size: 16 }),
        /* @__PURE__ */ d.jsx("p", { children: "Select at least one investor and use a valid lowercase list ID and name." })
      ] })
    ] })
  ] });
}
const P4 = "var(--spectrum-chart-up)", J4 = "var(--spectrum-chart-down)", Oc = "cubic-bezier(0.22, 1, 0.36, 1)";
function $4(a) {
  const s = a.length;
  if (s === 0) return "";
  if (s === 1) return `M${a[0].x},${a[0].y}`;
  const l = [], r = [];
  for (let f = 0; f < s - 1; f += 1)
    l[f] = a[f + 1].x - a[f].x, r[f] = l[f] === 0 ? 0 : (a[f + 1].y - a[f].y) / l[f];
  const u = new Array(s);
  u[0] = r[0], u[s - 1] = r[s - 2];
  for (let f = 1; f < s - 1; f += 1)
    if (r[f - 1] * r[f] <= 0)
      u[f] = 0;
    else {
      const p = 2 * l[f] + l[f - 1], y = l[f] + 2 * l[f - 1];
      u[f] = (p + y) / (p / r[f - 1] + y / r[f]);
    }
  let h = `M${a[0].x},${a[0].y}`;
  for (let f = 0; f < s - 1; f += 1) {
    const p = a[f].x + l[f] / 3, y = a[f].y + u[f] * l[f] / 3, v = a[f + 1].x - l[f] / 3, x = a[f + 1].y - u[f + 1] * l[f] / 3;
    h += `C${p.toFixed(2)},${y.toFixed(2)} ${v.toFixed(2)},${x.toFixed(2)} ${a[f + 1].x.toFixed(2)},${a[f + 1].y.toFixed(2)}`;
  }
  return h;
}
function mm() {
  const [a, s] = C.useState(!1);
  return C.useEffect(() => {
    const l = window.matchMedia("(prefers-reduced-motion: reduce)"), r = () => s(l.matches);
    return r(), l.addEventListener("change", r), () => l.removeEventListener("change", r);
  }, []), a;
}
const W4 = (a) => 1 - Math.pow(1 - a, 3);
function e5(a, { duration: s = 520, enabled: l = !0 } = {}) {
  const [r, u] = C.useState(a), h = C.useRef(a), f = C.useRef(a), p = C.useRef(a), y = C.useRef(0), v = C.useRef(0);
  return C.useEffect(() => {
    if (!l) return;
    const x = p.current;
    if (!(x.length !== a.length || a.some((E, j) => E !== x[j]))) return;
    if (p.current = a, h.current.length !== a.length) {
      h.current = a, f.current = a, cancelAnimationFrame(v.current), v.current = requestAnimationFrame(() => u(a));
      return;
    }
    f.current = h.current, y.current = performance.now(), cancelAnimationFrame(v.current);
    const S = (E) => {
      const j = Math.min(1, (E - y.current) / s), V = W4(j), M = f.current, L = p.current.map((K, X) => M[X] + (K - M[X]) * V);
      h.current = L, u(L), j < 1 && (v.current = requestAnimationFrame(S));
    };
    v.current = requestAnimationFrame(S);
  }), C.useEffect(() => () => cancelAnimationFrame(v.current), []), !l || r.length !== a.length ? a : r;
}
function t5(a, s) {
  const l = C.useMemo(() => [a], [a]);
  return e5(l, s)[0];
}
const n5 = `
@keyframes spectrum-mc-rise {
  from { transform: scaleY(0); opacity: 0; }
  to   { transform: scaleY(1); opacity: 1; }
}
@keyframes spectrum-mc-draw {
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
}
@keyframes spectrum-mc-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes spectrum-sk-pulse {
  from { opacity: 1; }
  to   { opacity: 0.4; }
}
@keyframes spectrum-mc-enter {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes spectrum-mc-grow {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes spectrum-mc-flash {
  from { opacity: 0.2; }
  to   { opacity: 0; }
}
@keyframes spectrum-mc-ping {
  0%   { r: 4; opacity: 0.55; }
  70%  { r: 13; opacity: 0; }
  100% { r: 13; opacity: 0; }
}
`;
function pm() {
  return /* @__PURE__ */ d.jsx("style", { nonce: document.querySelector('meta[name="style-nonce"]')?.content, children: n5 });
}
const a5 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
function i5({ char: a, animate: s }) {
  const l = a >= "0" && a <= "9" ? Number(a) : null;
  return l == null ? /* @__PURE__ */ d.jsx("span", { "aria-hidden": !0, className: "inline-block h-[1em] align-bottom leading-none", children: a }) : /* @__PURE__ */ d.jsx(
    "span",
    {
      "aria-hidden": !0,
      className: "relative inline-block h-[1em] w-[1ch] overflow-hidden align-bottom leading-none",
      children: /* @__PURE__ */ d.jsx(
        "span",
        {
          className: "absolute inset-x-0 top-0 block",
          style: {
            transform: `translateY(-${l}em)`,
            transition: s ? "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)" : void 0
          },
          children: a5.map((r) => /* @__PURE__ */ d.jsx("span", { className: "block h-[1em] text-center leading-none", children: r }, r))
        }
      )
    }
  );
}
function s5({
  value: a,
  format: s,
  className: l,
  animate: r = !0
}) {
  const u = s(a);
  return /* @__PURE__ */ d.jsxs("span", { className: ye("inline-flex items-end leading-none tabular-nums", l), children: [
    /* @__PURE__ */ d.jsx("span", { className: "sr-only", children: u }),
    u.split("").map((h, f) => /* @__PURE__ */ d.jsx(i5, { char: h, animate: r }, `${f}-${h >= "0" && h <= "9" ? "digit" : h}`))
  ] });
}
const l5 = "[--spectrum-series-1:#2563eb] [--spectrum-series-2:#f59e0b] [--spectrum-series-3:#0d9488] [--spectrum-series-4:#7c3aed] [--spectrum-series-5:#db2777] [--spectrum-series-6:#64748b] [--spectrum-track:#ececef] [--spectrum-chart-surface:#fff] [--spectrum-chart-up:#059669] [--spectrum-chart-down:#e11d48] dark:[--spectrum-series-1:#60a5fa] dark:[--spectrum-series-2:#fbbf24] dark:[--spectrum-series-3:#2dd4bf] dark:[--spectrum-series-4:#a78bfa] dark:[--spectrum-series-5:#f472b6] dark:[--spectrum-series-6:#94a3b8] dark:[--spectrum-track:#26262b] dark:[--spectrum-chart-surface:#0a0a0a] dark:[--spectrum-chart-up:#34d399] dark:[--spectrum-chart-down:#fb7185]", r5 = "var(--spectrum-track)";
function o5(a, s = 1) {
  return Math.abs(a) < 1e3 ? String(Math.round(a)) : new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: s
  }).format(a);
}
const c5 = [46, 72, 55, 83, 41, 68, 92, 57, 76, 49, 88, 63], u5 = [92, 74, 86, 61, 79, 55];
function Gx({
  variant: a,
  height: s,
  mode: l,
  reduce: r
}) {
  const u = l === "pulse" && !r, h = (p) => u ? { animation: `spectrum-sk-pulse 1.5s ease-in-out ${p * 120}ms infinite alternate` } : void 0, f = "rounded-md bg-black/[0.06] dark:bg-white/[0.08]";
  return a === "bars" ? /* @__PURE__ */ d.jsx("div", { className: "flex h-full items-end gap-2 pb-5 pt-3", children: c5.map((p, y) => /* @__PURE__ */ d.jsx("div", { className: ye("flex-1", f), style: { height: `${p}%`, ...h(y) } }, y)) }) : a === "line" ? /* @__PURE__ */ d.jsxs("div", { className: "relative flex h-full flex-col justify-between py-4", children: [
    [0, 1, 2, 3].map((p) => /* @__PURE__ */ d.jsx("div", { className: "h-px w-full bg-black/[0.05] dark:bg-white/[0.06]" }, p)),
    /* @__PURE__ */ d.jsx(
      "svg",
      {
        className: "absolute inset-x-0 top-1/4 h-1/2 w-full",
        preserveAspectRatio: "none",
        viewBox: "0 0 100 40",
        children: /* @__PURE__ */ d.jsx(
          "path",
          {
            d: "M0,30 C12,10 22,34 34,22 C46,10 54,28 66,16 C78,6 88,20 100,8",
            fill: "none",
            className: "stroke-black/[0.1] dark:stroke-white/[0.12]",
            strokeWidth: 2,
            vectorEffect: "non-scaling-stroke",
            style: h(1)
          }
        )
      }
    )
  ] }) : a === "grid" ? /* @__PURE__ */ d.jsx("div", { className: "grid h-full grid-cols-12 grid-rows-6 gap-1.5 py-2", children: Array.from({ length: 72 }, (p, y) => /* @__PURE__ */ d.jsx(
    "div",
    {
      className: ye("h-full w-full rounded-[3px]", f),
      style: h(y % 14)
    },
    y
  )) }) : a === "rows" ? /* @__PURE__ */ d.jsx("div", { className: "flex h-full flex-col justify-evenly py-2", children: u5.map((p, y) => /* @__PURE__ */ d.jsx("div", { className: ye("h-4", f), style: { width: `${p}%`, ...h(y) } }, y)) }) : a === "cards" ? /* @__PURE__ */ d.jsx("div", { className: "grid h-full grid-cols-2 content-center gap-3 py-2 sm:grid-cols-4", children: [0, 1, 2, 3].map((p) => /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: "flex h-full min-h-16 flex-col justify-between gap-2 rounded-xl border border-black/[0.05] p-3 dark:border-white/[0.06]",
      style: h(p),
      children: [
        /* @__PURE__ */ d.jsx("div", { className: ye("h-2.5 w-1/2", f) }),
        /* @__PURE__ */ d.jsx("div", { className: ye("h-5 w-3/4", f) }),
        /* @__PURE__ */ d.jsx("div", { className: ye("h-6 w-full", f) })
      ]
    },
    p
  )) }) : /* @__PURE__ */ d.jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ d.jsx(
    "div",
    {
      className: "rounded-full border-[14px] border-black/[0.06] dark:border-white/[0.08]",
      style: { width: s * 0.6, height: s * 0.6, ...h(0) }
    }
  ) });
}
function f5({
  variant: a = "bars",
  height: s = 300,
  className: l
}) {
  const r = mm();
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: ye("relative w-full overflow-hidden", l),
      style: { height: s },
      "aria-hidden": !0,
      children: [
        /* @__PURE__ */ d.jsx(pm, {}),
        /* @__PURE__ */ d.jsx(Gx, { variant: a, height: s, mode: "pulse", reduce: r })
      ]
    }
  );
}
function Yx({
  height: a,
  variant: s,
  icon: l,
  iconClassName: r,
  title: u,
  description: h,
  action: f
}) {
  const p = mm();
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: "relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.015] dark:border-white/[0.08] dark:bg-white/[0.02]",
      style: { height: a },
      role: "status",
      children: [
        /* @__PURE__ */ d.jsx(pm, {}),
        /* @__PURE__ */ d.jsx(
          "div",
          {
            "aria-hidden": !0,
            className: "pointer-events-none absolute inset-x-5 inset-y-4 opacity-60 dark:opacity-50",
            style: {
              maskImage: "radial-gradient(ellipse 62% 58% at 50% 50%, transparent 34%, black 78%)",
              WebkitMaskImage: "radial-gradient(ellipse 62% 58% at 50% 50%, transparent 34%, black 78%)"
            },
            children: /* @__PURE__ */ d.jsx(Gx, { variant: s, height: a, mode: "ghost", reduce: p })
          }
        ),
        /* @__PURE__ */ d.jsxs(
          "div",
          {
            className: "relative flex max-w-[38ch] flex-col items-center gap-1 px-6 text-center",
            style: p ? void 0 : { animation: `spectrum-mc-enter 480ms ${Oc} both` },
            children: [
              /* @__PURE__ */ d.jsx(
                "span",
                {
                  className: ye(
                    "mb-2 flex size-10 items-center justify-center rounded-xl border border-black/[0.07] bg-white text-neutral-500 shadow-xs dark:border-white/[0.1] dark:bg-neutral-900 dark:text-neutral-400",
                    r
                  ),
                  children: l
                }
              ),
              /* @__PURE__ */ d.jsx("p", { className: "text-[13px] font-medium text-neutral-900 dark:text-neutral-100", children: u }),
              h ? /* @__PURE__ */ d.jsx("p", { className: "text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400", children: h }) : null,
              f ? /* @__PURE__ */ d.jsx("div", { className: "mt-3", children: f }) : null
            ]
          }
        )
      ]
    }
  );
}
const d5 = "inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3 py-1.5 text-[12px] font-medium text-neutral-900 shadow-xs transition-colors hover:bg-black/[0.03] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/20 dark:border-white/12 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.1] dark:focus-visible:ring-white/25";
function h5({
  height: a = 300,
  variant: s = "line",
  title: l = "No data yet",
  description: r = "Once events start arriving this chart will fill in automatically.",
  action: u
}) {
  return /* @__PURE__ */ d.jsx(
    Yx,
    {
      height: a,
      variant: s,
      title: l,
      description: r,
      action: u,
      icon: /* @__PURE__ */ d.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ d.jsx(
        "path",
        {
          d: "M4 19h16M7 16V9m5 7V5m5 11v-4",
          stroke: "currentColor",
          strokeWidth: "1.7",
          strokeLinecap: "round"
        }
      ) })
    }
  );
}
function m5({
  height: a = 300,
  variant: s = "line",
  title: l = "Could not load this chart",
  description: r = "The request failed. Check the connection and try again.",
  onRetry: u,
  retryLabel: h = "Retry"
}) {
  return /* @__PURE__ */ d.jsx(
    Yx,
    {
      height: a,
      variant: s,
      title: l,
      description: r,
      iconClassName: "text-rose-500/90 dark:text-rose-400/90",
      action: u ? /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: u, className: d5, children: [
        /* @__PURE__ */ d.jsx("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ d.jsx(
          "path",
          {
            d: "M20 11A8 8 0 1 0 18 16M20 5v6h-6",
            stroke: "currentColor",
            strokeWidth: "1.9",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }),
        h
      ] }) : null,
      icon: /* @__PURE__ */ d.jsx("svg", { width: "17", height: "17", viewBox: "0 0 24 24", fill: "none", "aria-hidden": !0, children: /* @__PURE__ */ d.jsx(
        "path",
        {
          d: "M12 8v5m0 3.5v.5M10.3 3.9 2.6 17.3A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.7L13.7 3.9a2 2 0 0 0-3.4 0Z",
          stroke: "currentColor",
          strokeWidth: "1.6",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ) })
    }
  );
}
function p5({
  status: a = "ready",
  height: s = 300,
  variant: l = "bars",
  empty: r,
  error: u,
  onRetry: h,
  children: f
}) {
  return a === "loading" ? /* @__PURE__ */ d.jsxs("div", { "aria-busy": "true", "aria-live": "polite", children: [
    /* @__PURE__ */ d.jsx(f5, { variant: l, height: s }),
    /* @__PURE__ */ d.jsx("span", { className: "sr-only", children: "Loading chart data" })
  ] }) : a === "empty" ? /* @__PURE__ */ d.jsx(h5, { height: s, variant: l, ...r }) : a === "error" ? /* @__PURE__ */ d.jsx(m5, { height: s, variant: l, onRetry: h, ...u }) : /* @__PURE__ */ d.jsx(d.Fragment, { children: f });
}
function g5({
  count: a,
  setIndex: s,
  clear: l
}) {
  return C.useCallback(
    (r) => {
      const { key: u } = r;
      if (u === "Escape") {
        r.preventDefault(), l ? l() : s(null);
        return;
      }
      if (u === "Home" || u === "End") {
        r.preventDefault(), s(u === "Home" ? 0 : a - 1);
        return;
      }
      if (u !== "ArrowLeft" && u !== "ArrowRight") return;
      r.preventDefault();
      const h = u === "ArrowRight" ? 1 : -1;
      s((f) => {
        const p = (f ?? a - 1) + h;
        return Math.max(0, Math.min(a - 1, p));
      });
    },
    [a, s, l]
  );
}
function y5({
  card: a,
  index: s,
  reduce: l
}) {
  const { label: r, series: u, goodWhen: h = "up", deltaLabel: f = "vs start", caption: p, progress: y } = a, v = a.format ?? ((Te) => o5(Te, 1)), [x, g] = C.useState(null), S = C.useRef(null), E = C.useId().replace(/:/g, ""), j = u?.length ?? 0, V = a.value ?? u?.[j - 1] ?? 0, M = x != null && u ? u[x] : V, q = a.previous ?? u?.[0] ?? 0, L = a.previous != null || u ? q ? (V - q) / q * 100 : 0 : null, K = (L ?? 0) >= 0, ee = (h === "up" ? K : !K) ? P4 : J4, oe = t5(M, {
    duration: 260,
    enabled: !l && x == null
  }), [Q, D] = C.useState({ w: 0, h: 0 });
  C.useEffect(() => {
    const Te = S.current;
    if (!Te) return;
    const Ee = new ResizeObserver(
      ([Z]) => D({ w: Z.contentRect.width, h: Z.contentRect.height })
    );
    Ee.observe(Te);
    const ce = Te.getBoundingClientRect();
    return D({ w: ce.width, h: ce.height }), () => Ee.disconnect();
  }, []);
  const W = C.useMemo(() => {
    if (!u || j < 2 || Q.w <= 0 || Q.h <= 0) return null;
    let Te = 1 / 0, Ee = -1 / 0;
    for (const he of u)
      Te = Math.min(Te, he), Ee = Math.max(Ee, he);
    const ce = Ee - Te || 1, Z = u.map((he, P) => ({
      x: 3 + P / (j - 1) * (Q.w - 6),
      y: 7 + (1 - (he - Te) / ce) * (Q.h - 16)
    })), $ = $4(Z), ne = [];
    for (let he = 1; he < j - 1; he += 1)
      (u[he] - u[he - 1]) * (u[he + 1] - u[he]) < 0 && ne.push(he);
    return {
      line: $,
      area: `${$}L${Z[j - 1].x},${Q.h}L${Z[0].x},${Q.h}Z`,
      points: Z,
      extremes: ne.slice(0, 5)
    };
  }, [u, j, Q]), te = (Te) => {
    const Ee = S.current;
    if (!Ee || j < 2) return;
    const ce = Ee.getBoundingClientRect(), Z = (Te - ce.left) / Math.max(1, ce.width);
    g(Math.max(0, Math.min(j - 1, Math.round(Z * (j - 1)))));
  }, Ae = g5({ count: j, setIndex: g }), Ce = x != null && W ? W.points[x] : null;
  return /* @__PURE__ */ d.jsxs(
    "div",
    {
      className: "flex items-stretch justify-between gap-5 rounded-2xl border border-black/8 bg-white/60 p-5 dark:border-white/10 dark:bg-white/[0.02]",
      role: "img",
      "aria-label": `${r}: ${v(V)}${L != null ? `, ${K ? "up" : "down"} ${Math.abs(L).toFixed(0)} percent ${f}` : ""}.${p ? ` ${p}` : ""}`,
      style: l ? void 0 : { animation: `spectrum-mc-enter 420ms ${Oc} ${s * 70}ms both` },
      children: [
        /* @__PURE__ */ d.jsxs("div", { className: "flex min-w-0 flex-col justify-between", children: [
          /* @__PURE__ */ d.jsx("p", { className: "truncate text-[13px] text-neutral-500 dark:text-neutral-400", children: r }),
          /* @__PURE__ */ d.jsx("p", { className: "mt-1.5 text-[27px] font-medium leading-none tracking-tight text-neutral-950 dark:text-white", children: /* @__PURE__ */ d.jsx(
            s5,
            {
              value: x != null ? M : oe,
              format: v,
              animate: !l
            }
          ) }),
          /* @__PURE__ */ d.jsx("p", { className: "mt-2 min-h-[17px] text-[12.5px] font-medium leading-snug", children: x != null && u ? /* @__PURE__ */ d.jsxs("span", { className: "text-neutral-400 dark:text-neutral-500", children: [
            "day ",
            x + 1,
            " of ",
            j
          ] }) : L != null ? /* @__PURE__ */ d.jsxs("span", { style: { color: ee }, children: [
            K ? "↑" : "↓",
            " ",
            Math.abs(L).toFixed(0),
            "% ",
            f
          ] }) : /* @__PURE__ */ d.jsx("span", { className: "text-neutral-500 dark:text-neutral-400", children: p ?? " " }) })
        ] }),
        y != null ? /* @__PURE__ */ d.jsx("div", { className: "flex w-[38%] max-w-44 shrink-0 items-center", children: /* @__PURE__ */ d.jsx(
          "div",
          {
            "aria-hidden": !0,
            className: "relative h-1.5 w-full overflow-hidden rounded-full",
            style: { background: r5 },
            children: /* @__PURE__ */ d.jsx(
              "span",
              {
                className: "absolute inset-y-0 left-0 rounded-full",
                style: {
                  width: `${Math.max(0, Math.min(1, y)) * 100}%`,
                  background: "var(--spectrum-series-2)",
                  transformOrigin: "left center",
                  animation: l ? void 0 : `spectrum-mc-grow 700ms ${Oc} ${s * 70 + 150}ms both`
                }
              }
            )
          }
        ) }) : u && j >= 2 ? /* @__PURE__ */ d.jsx(
          "div",
          {
            ref: S,
            className: "relative w-[44%] max-w-52 shrink-0 cursor-crosshair touch-pan-y select-none self-stretch focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20",
            style: { minHeight: 58 },
            tabIndex: 0,
            onKeyDown: Ae,
            onBlur: () => g(null),
            onPointerMove: (Te) => te(Te.clientX),
            onPointerDown: (Te) => te(Te.clientX),
            onPointerLeave: () => g(null),
            children: W ? /* @__PURE__ */ d.jsxs(
              "svg",
              {
                width: Q.w,
                height: Q.h,
                viewBox: `0 0 ${Q.w} ${Q.h}`,
                className: "block h-full w-full overflow-visible",
                "aria-hidden": !0,
                children: [
                  /* @__PURE__ */ d.jsx("defs", { children: /* @__PURE__ */ d.jsxs("linearGradient", { id: `${E}-fill`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
                    /* @__PURE__ */ d.jsx("stop", { offset: "0%", stopColor: ee, stopOpacity: 0.3 }),
                    /* @__PURE__ */ d.jsx("stop", { offset: "100%", stopColor: ee, stopOpacity: 0.02 })
                  ] }) }),
                  /* @__PURE__ */ d.jsx(
                    "path",
                    {
                      d: W.area,
                      fill: `url(#${E}-fill)`,
                      style: l ? void 0 : { animation: `spectrum-mc-fade 620ms ease-out ${s * 70 + 180}ms both` }
                    }
                  ),
                  /* @__PURE__ */ d.jsx(
                    "path",
                    {
                      d: W.line,
                      fill: "none",
                      stroke: ee,
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      pathLength: 1,
                      style: l ? void 0 : {
                        strokeDasharray: 1,
                        animation: `spectrum-mc-draw 700ms ${Oc} ${s * 70}ms both`
                      }
                    }
                  ),
                  W.extremes.map((Te) => /* @__PURE__ */ d.jsx(
                    "circle",
                    {
                      cx: W.points[Te].x,
                      cy: W.points[Te].y,
                      r: 2.5,
                      fill: ee,
                      style: l ? void 0 : { animation: `spectrum-mc-fade 300ms ease-out ${s * 70 + 500}ms both` }
                    },
                    Te
                  )),
                  Ce ? /* @__PURE__ */ d.jsx(
                    "circle",
                    {
                      cx: Ce.x,
                      cy: Ce.y,
                      r: 4.5,
                      className: "fill-white dark:fill-neutral-950",
                      stroke: ee,
                      strokeWidth: 2
                    }
                  ) : null
                ]
              }
            ) : null
          }
        ) : null
      ]
    }
  );
}
const w1 = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
};
function v5({
  className: a,
  cards: s = [],
  columns: l = 2,
  status: r = "ready",
  onRetry: u
}) {
  const h = mm();
  return /* @__PURE__ */ d.jsxs("div", { className: ye("w-full", l5, a), children: [
    /* @__PURE__ */ d.jsx(pm, {}),
    /* @__PURE__ */ d.jsx(
      p5,
      {
        status: r,
        height: 168,
        variant: "cards",
        empty: {
          title: "No metrics yet",
          description: "Connect a data source and these tiles will start tracking themselves."
        },
        onRetry: u,
        children: /* @__PURE__ */ d.jsx("div", { className: ye("grid gap-3", w1[l] ?? w1[2]), children: s.map((f, p) => /* @__PURE__ */ d.jsx(y5, { card: f, index: p, reduce: h }, f.label)) })
      }
    )
  ] });
}
function b5({ size: a = 22 }) {
  return /* @__PURE__ */ d.jsxs("svg", { width: a, height: a, viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
    /* @__PURE__ */ d.jsx("circle", { cx: "14", cy: "8", r: "2.6" }),
    /* @__PURE__ */ d.jsx("path", { d: "M14 11.5v6.5" }),
    /* @__PURE__ */ d.jsx("path", { d: "M14 13l-5 3.5" }),
    /* @__PURE__ */ d.jsx("path", { d: "M14 13l5.5-3" }),
    /* @__PURE__ */ d.jsx("path", { d: "M14 18l-4 7.5" }),
    /* @__PURE__ */ d.jsx("path", { d: "M14 18l5.5 3" }),
    /* @__PURE__ */ d.jsx("circle", { cx: "24", cy: "7", r: "2.6", fill: "currentColor", stroke: "none" })
  ] });
}
const Ws = {
  directory: ["Funds", ""],
  people: ["People", "Public team members, roles, and sources."],
  shortlists: ["Shortlists", ""],
  "people-table": ["Contacts table", "Sort and filter public team members by recorded attributes."],
  prospects: ["Your prospects", "Company criteria, matching investors, and saved lists."],
  pipeline: ["Your pipeline", "Tracked investors, follow-ups, and next actions."],
  wiki: ["Your wiki", "Private notes and linked pages."]
};
function gm(a) {
  return "#page=" + encodeURIComponent(a);
}
function Cc(a) {
  location.hash = gm(a);
}
async function Xx(a, s) {
  const l = await fetch(a, { signal: s }), r = await l.json();
  if (!l.ok) throw new Error(r.error || "Unable to load workspace");
  return r;
}
function T1({ children: a, tone: s = "neutral" }) {
  return /* @__PURE__ */ d.jsx(vi, { tone: s === "purple" ? "violet" : s === "orange" ? "warning" : s === "success" ? "success" : "neutral", children: a });
}
function ah({ name: a, detail: s }) {
  return /* @__PURE__ */ d.jsxs("span", { className: "record-name", children: [
    /* @__PURE__ */ d.jsx("span", { className: "avatar", "aria-hidden": "true", children: a.slice(0, 2).toUpperCase() }),
    /* @__PURE__ */ d.jsxs("span", { children: [
      /* @__PURE__ */ d.jsx("span", { className: "block font-medium", children: a }),
      s && /* @__PURE__ */ d.jsx("small", { children: s })
    ] })
  ] });
}
function x5({ id: a, data: s, back: l, revision: r }) {
  const [u, h] = C.useState(""), [f, p] = C.useState("");
  C.useEffect(() => {
    const x = new AbortController();
    return h(""), p(""), Xx("/api/page?id=" + encodeURIComponent(a), x.signal).then((g) => h(g.html)).catch((g) => {
      g.name !== "AbortError" && p(g.message);
    }), () => x.abort();
  }, [a, r]);
  const y = s.firms.find((x) => "public/firms/" + x.id === a), v = y && s.private_firms.find((x) => x.id === y.id);
  return /* @__PURE__ */ d.jsxs("section", { className: "reader", children: [
    /* @__PURE__ */ d.jsx(da, { variant: "ghost", asChild: !0, children: /* @__PURE__ */ d.jsxs("a", { href: "#" + l, children: [
      /* @__PURE__ */ d.jsx(iA, {}),
      "Back to ",
      Ws[l][0].toLowerCase()
    ] }) }),
    /* @__PURE__ */ d.jsx("p", { className: "eyebrow mt-8", children: a.startsWith("private/") ? "Private workspace" : "Public research" }),
    y && /* @__PURE__ */ d.jsxs("div", { className: "track-note", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsxs("div", { className: "section-kicker", children: [
          /* @__PURE__ */ d.jsx(um, { size: 15 }),
          "PIPELINE"
        ] }),
        /* @__PURE__ */ d.jsx("strong", { children: v ? "Already in your pipeline" : "Track investor" }),
        /* @__PURE__ */ d.jsx("p", { children: v ? "Your private notes are linked below." : "Run this command to create a private relationship page. Nothing is sent." }),
        /* @__PURE__ */ d.jsx(yr, { code: `uv run fundraising-buddy track ${y.id}`, filename: "Track this investor", language: "sh", copyLabel: "Copy tracking command", className: "command-block" })
      ] }),
      v && /* @__PURE__ */ d.jsx(da, { variant: "outline", asChild: !0, children: /* @__PURE__ */ d.jsxs("a", { href: gm("private/" + v.page), children: [
        "Open relationship",
        /* @__PURE__ */ d.jsx(tu, {})
      ] }) })
    ] }),
    f ? /* @__PURE__ */ d.jsx("div", { role: "alert", className: "notice", children: f }) : u ? /* @__PURE__ */ d.jsx("article", { dangerouslySetInnerHTML: { __html: u } }) : /* @__PURE__ */ d.jsx("p", { role: "status", children: "Loading page..." })
  ] });
}
function S5({ view: a, data: s }) {
  const l = { rowId: (u) => u.id, searchable: !0, batchSize: 50, variant: "panel", caption: Ws[a][0], keyboardNavigation: !1, className: "records-table" };
  if (a === "people") {
    const u = (f) => s.firms.find((p) => p.id === f)?.name || f, h = [
      { id: "name", header: "Person", sortable: !0, cell: (f) => /* @__PURE__ */ d.jsx(ah, { name: f.name }) },
      { id: "firm", header: "Firm", sortable: !0, value: (f) => u(f.firm_id), cell: (f) => /* @__PURE__ */ d.jsx("a", { className: "text-link", href: gm("public/firms/" + f.firm_id), children: u(f.firm_id) }) },
      { id: "title", header: "Role", sortable: !0 },
      { id: "researched_at", header: "Research date", sortable: !0 }
    ];
    return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(gr, { ...l, title: "Public people", data: s.people, columns: h, searchPlaceholder: "Search people...", searchText: (f) => JSON.stringify(f) + " " + u(f.firm_id), onRowClick: (f) => Cc("public/people/" + f.id) }),
      /* @__PURE__ */ d.jsx("p", { className: "footnote", children: "Roles reflect the recorded research date. Verify current employment before reaching out. Personal email addresses are not included." })
    ] });
  }
  if (a === "people-table") {
    const u = (f) => s.firms.find((p) => p.id === f)?.name || f, h = [
      { id: "name", header: "Name", get: (f) => f.name },
      { id: "id", header: "ID", get: (f) => f.id },
      { id: "firm_id", header: "Firm ID", get: (f) => f.firm_id },
      { id: "firm", header: "Firm", get: (f) => u(f.firm_id) },
      { id: "title", header: "Title", get: (f) => f.title },
      { id: "profile", header: "Profile", get: (f) => f.profile },
      { id: "focus", header: "Focus", get: (f) => f.focus },
      { id: "researched_at", header: "Research date", get: (f) => f.researched_at || "" },
      { id: "sources_count", header: "Sources", numeric: !0, get: (f) => f.sources.length }
    ];
    return /* @__PURE__ */ d.jsx(A4, { view: a, rows: s.people, columns: h, rowId: (f) => f.id, title: "Contacts", onRowClick: (f) => Cc("public/people/" + f.id) });
  }
  if (a === "pipeline") {
    const u = [
      { id: "name", header: "Investor", sortable: !0, cell: (h) => /* @__PURE__ */ d.jsx(ah, { name: h.name, detail: h.domain }) },
      { id: "status", header: "Status", sortable: !0, cell: (h) => /* @__PURE__ */ d.jsx(T1, { tone: "purple", children: h.status }) },
      { id: "next_action", header: "Next action", cell: (h) => /* @__PURE__ */ d.jsx("span", { className: "focus-cell", children: h.next_action || "No next action recorded" }) },
      { id: "next_action_due", header: "Due / expected reply", sortable: !0, cell: (h) => /* @__PURE__ */ d.jsx("span", { className: "flex flex-col gap-1", children: [["Action", h.next_action_due], ["Reply", h.expected_response]].filter(([, f]) => f).map(([f, p]) => /* @__PURE__ */ d.jsxs(T1, { tone: p < s.today ? "orange" : "neutral", children: [
        f,
        ": ",
        p
      ] }, f)) }) }
    ];
    return /* @__PURE__ */ d.jsx(gr, { ...l, title: "Private relationships", data: s.private_firms, columns: u, searchPlaceholder: "Search pipeline...", onRowClick: (h) => Cc("private/" + h.page), quickFilter: { columnId: "status" }, emptyState: s.private_firms.length ? void 0 : /* @__PURE__ */ d.jsxs("div", { className: "empty", children: [
      /* @__PURE__ */ d.jsx(cm, {}),
      /* @__PURE__ */ d.jsx("h2", { children: "No tracked investors" }),
      /* @__PURE__ */ d.jsx("p", { children: "Open an investor profile and run its tracking command to add it to the pipeline." }),
      /* @__PURE__ */ d.jsx(da, { asChild: !0, children: /* @__PURE__ */ d.jsxs("a", { href: "#directory", children: [
        "View investors",
        /* @__PURE__ */ d.jsx(tu, {})
      ] }) })
    ] }) });
  }
  const r = [{ id: "title", header: "Page", sortable: !0, cell: (u) => /* @__PURE__ */ d.jsx(ah, { name: u.title }) }, { id: "id", header: "Location", cell: (u) => u.id.replace("private/", "") }];
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsx(gr, { ...l, title: "Workspace pages", data: s.pages.filter((u) => u.id.startsWith("private/")), columns: r, searchPlaceholder: "Search wiki...", onRowClick: (u) => Cc(u.id) }),
    /* @__PURE__ */ d.jsx("p", { className: "footnote", children: "Edit Markdown in workspace/wiki or ask your agent to update it. Run rollup to refresh the pipeline, then click Refresh here." })
  ] });
}
function w5() {
  const a = new URLSearchParams(location.search).get("theme");
  if (a === "dark" || a === "light") return a === "dark";
  try {
    const s = localStorage.getItem("color-theme");
    if (s === "dark" || s === "light") return s === "dark";
  } catch {
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
const Zx = w5();
document.documentElement.classList.toggle("dark", Zx);
function T5() {
  const [a, s] = C.useState(Zx);
  function l() {
    const D = !a;
    s(D), document.documentElement.classList.toggle("dark", D);
    try {
      localStorage.setItem("color-theme", D ? "dark" : "light");
    } catch {
    }
  }
  C.useEffect(() => {
    function D(W) {
      if (W.source !== window.parent || W.data?.type !== "aiex:theme") return;
      const te = W.data.theme === "dark";
      s(te), document.documentElement.classList.toggle("dark", te);
    }
    return addEventListener("message", D), () => removeEventListener("message", D);
  }, []);
  const [r, u] = C.useState(), [h, f] = C.useState(""), [p, y] = C.useState(!1), [v, x] = C.useState(0), [g, S] = C.useState(location.hash.slice(1)), E = C.useRef(0), j = C.useRef("directory"), V = g.split("?")[0] === "firms-table" ? "directory" : g.split("?")[0], M = Object.hasOwn(Ws, V) ? V : j.current;
  g.startsWith("page=") || (j.current = M);
  let q = "";
  try {
    g.startsWith("page=") && (q = decodeURIComponent(g.slice(5)));
  } catch {
    q = "invalid";
  }
  C.useEffect(() => {
    const D = () => S(location.hash.slice(1));
    return window.addEventListener("hashchange", D), () => window.removeEventListener("hashchange", D);
  }, []);
  async function L() {
    const D = ++E.current;
    y(!0), f("");
    try {
      const W = await Xx("/api/catalog");
      D === E.current && (u(W), x((te) => te + 1));
    } catch (W) {
      D === E.current && f(W instanceof Error ? W.message : "Unable to load");
    } finally {
      D === E.current && y(!1);
    }
  }
  C.useEffect(() => {
    L();
  }, []);
  function K() {
    if (!r) return;
    const D = [...new Set(r.firms.map((Ae) => Ae.domain).filter(Boolean))].sort(), W = URL.createObjectURL(new Blob([D.join(`
`) + `
`], { type: "text/plain" })), te = document.createElement("a");
    te.href = W, te.download = "investor-domains.txt", te.click(), setTimeout(() => URL.revokeObjectURL(W), 1e3);
  }
  const X = [
    { icon: /* @__PURE__ */ d.jsx(n1, {}), label: "Funds", href: "#directory", meta: r?.firms.length.toLocaleString() },
    { icon: /* @__PURE__ */ d.jsx(mM, {}), label: "People", href: "#people", meta: r?.people.length.toLocaleString() },
    { icon: /* @__PURE__ */ d.jsx(MA, {}), label: "Contacts table", href: "#people-table" }
  ], ee = [
    { icon: /* @__PURE__ */ d.jsx(or, {}), label: "Shortlists", href: "#shortlists" },
    { icon: /* @__PURE__ */ d.jsx(um, {}), label: "Your prospects", href: "#prospects" },
    { icon: /* @__PURE__ */ d.jsx(cm, {}), label: "Your pipeline", href: "#pipeline", meta: r?.private_firms.length.toLocaleString() },
    { icon: /* @__PURE__ */ d.jsx(cA, {}), label: "Your wiki", href: "#wiki" }
  ], oe = q ? void 0 : "#" + M, Q = q ? q.startsWith("public/") : ["directory", "people", "people-table"].includes(M);
  return /* @__PURE__ */ d.jsxs(q3, { reducedMotion: "user", nonce: document.querySelector('meta[name="style-nonce"]')?.content, children: [
    /* @__PURE__ */ d.jsx("a", { href: "#content", className: "skip-link", onClick: (D) => {
      D.preventDefault(), document.getElementById("content")?.focus();
    }, children: "Skip to content" }),
    /* @__PURE__ */ d.jsxs("div", { className: "app-shell", children: [
      /* @__PURE__ */ d.jsxs("aside", { className: "sidebar", children: [
        /* @__PURE__ */ d.jsxs("a", { href: "#directory", className: "brand", children: [
          /* @__PURE__ */ d.jsx("span", { className: "brand-icon", children: /* @__PURE__ */ d.jsx(b5, { size: 25 }) }),
          /* @__PURE__ */ d.jsx("span", { children: "fundraising buddy" })
        ] }),
        /* @__PURE__ */ d.jsxs("nav", { "aria-label": "Main navigation", "data-current": M, children: [
          /* @__PURE__ */ d.jsx(m1, { title: "RESEARCH LIBRARY", items: X, activeHref: oe }),
          /* @__PURE__ */ d.jsx(m1, { title: "PRIVATE WORKSPACE", items: ee, activeHref: oe })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "sidebar-bottom", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "local-note", children: [
            /* @__PURE__ */ d.jsx("span", { className: "local-note-icon", children: /* @__PURE__ */ d.jsx(a1, { size: 17 }) }),
            /* @__PURE__ */ d.jsx("strong", { children: "Local data" }),
            /* @__PURE__ */ d.jsx("p", { children: "Company details and relationship notes are stored in your private workspace." }),
            /* @__PURE__ */ d.jsx(vi, { tone: "neutral", showIcon: !1, children: "Docker workspace" })
          ] }),
          /* @__PURE__ */ d.jsxs("a", { href: "https://ui.spectrumhq.in", target: "_blank", rel: "noreferrer", className: "spectrum-credit", children: [
            "Built with Spectrum UI",
            /* @__PURE__ */ d.jsx(tu, { size: 13 })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("main", { id: "content", tabIndex: -1, children: [
        /* @__PURE__ */ d.jsxs("header", { className: "topbar", children: [
          /* @__PURE__ */ d.jsxs("div", { className: "breadcrumb", children: [
            /* @__PURE__ */ d.jsx("span", { className: "breadcrumb-icon", children: Q ? /* @__PURE__ */ d.jsx(n1, { size: 15 }) : /* @__PURE__ */ d.jsx(a1, { size: 15 }) }),
            /* @__PURE__ */ d.jsx("span", { children: Q ? "Research library" : "Private workspace" }),
            /* @__PURE__ */ d.jsx("span", { className: "breadcrumb-divider", children: "/" }),
            /* @__PURE__ */ d.jsx("strong", { children: q ? "Profile" : Ws[M][0] })
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "top-actions", children: [
            M === "directory" && !q && /* @__PURE__ */ d.jsxs(da, { variant: "outline", size: "sm", "aria-label": "Export domains", onClick: K, children: [
              /* @__PURE__ */ d.jsx(zA, { size: 14 }),
              /* @__PURE__ */ d.jsx("span", { className: "export-label", children: "Export domains" })
            ] }),
            /* @__PURE__ */ d.jsx("span", { className: "local-status", children: /* @__PURE__ */ d.jsxs(vi, { tone: "success", showIcon: !1, children: [
              /* @__PURE__ */ d.jsx("span", { className: "status-dot" }),
              "Docker workspace"
            ] }) }),
            /* @__PURE__ */ d.jsxs(da, { variant: "outline", size: "sm", onClick: () => {
              L();
            }, disabled: p, children: [
              /* @__PURE__ */ d.jsx(nM, { size: 14, className: p ? "animate-spin" : "" }),
              p ? "Refreshing..." : "Refresh"
            ] }),
            /* @__PURE__ */ d.jsx("button", { className: "theme-toggle", "aria-label": a ? "Switch to day mode" : "Switch to night mode", title: a ? "Switch to day mode" : "Switch to night mode", onClick: l, children: a ? /* @__PURE__ */ d.jsx(cM, { size: 17 }) : /* @__PURE__ */ d.jsx(WA, { size: 17 }) })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "main-content", children: [
          h && /* @__PURE__ */ d.jsxs("div", { role: "alert", className: "notice", children: [
            h,
            " ",
            r ? "Showing previously loaded data." : ""
          ] }),
          !r && !h && /* @__PURE__ */ d.jsx("p", { role: "status", className: "loading-workspace", children: "Loading your workspace..." }),
          r && (q ? /* @__PURE__ */ d.jsx(x5, { id: q, data: r, back: j.current, revision: v }, q) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            M === "directory" || M === "shortlists" ? /* @__PURE__ */ d.jsx(Z4, { funds: r.firms, people: r.people, revision: v, shortlistsOnly: M === "shortlists" }, M) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("section", { className: "intro", children: /* @__PURE__ */ d.jsxs("div", { children: [
                /* @__PURE__ */ d.jsx("h1", { children: Ws[M][0] }),
                /* @__PURE__ */ d.jsx("p", { className: "subtitle", children: Ws[M][1] })
              ] }) }),
              /* @__PURE__ */ d.jsx(v5, { className: "metrics", columns: 4, cards: [
                { label: "Investor firms", value: r.firms.length, format: (D) => Math.round(D).toLocaleString("en-US"), caption: "Public firm identities" },
                { label: "Public people", value: r.people.length, format: (D) => Math.round(D).toLocaleString("en-US"), caption: "People-at-firm records" },
                { label: "Sourced profiles", value: r.firms.filter((D) => D.record_level === "sourced").length, format: (D) => Math.round(D).toLocaleString("en-US"), caption: "Dated evidence, not live verification" },
                { label: "In your pipeline", value: r.private_firms.length, format: (D) => Math.round(D).toLocaleString("en-US"), caption: "Your private relationships" }
              ] }),
              M === "prospects" ? /* @__PURE__ */ d.jsx(I4, { revision: v }) : /* @__PURE__ */ d.jsx(S5, { view: M, data: r }, M)
            ] }),
            /* @__PURE__ */ d.jsx("footer", { className: "page-footer", children: /* @__PURE__ */ d.jsxs("span", { children: [
              "Fundraising Buddy ",
              /* @__PURE__ */ d.jsx("span", { className: "footer-version", children: "LOCAL PREVIEW" })
            ] }) })
          ] }))
        ] })
      ] })
    ] })
  ] });
}
Hw.createRoot(document.getElementById("root")).render(/* @__PURE__ */ d.jsx(T5, {}));

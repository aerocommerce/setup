function e(e, t) {
    const n = Object.create(null),
        o = e.split(',')
    for (let r = 0; r < o.length; r++) n[o[r]] = !0
    return t ? (e) => !!n[e.toLowerCase()] : (e) => !!n[e]
}
const t = e(
        'Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt'
    ),
    n = e('itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly')
function o(e) {
    if (S(e)) {
        const t = {}
        for (let n = 0; n < e.length; n++) {
            const r = e[n],
                i = o(A(r) ? l(r) : r)
            if (i) for (const e in i) t[e] = i[e]
        }
        return t
    }
    if (F(e)) return e
}
const r = /;(?![^(]*\))/g,
    i = /:(.+)/
function l(e) {
    const t = {}
    return (
        e.split(r).forEach((e) => {
            if (e) {
                const n = e.split(i)
                n.length > 1 && (t[n[0].trim()] = n[1].trim())
            }
        }),
        t
    )
}
function s(e) {
    let t = ''
    if (A(e)) t = e
    else if (S(e))
        for (let n = 0; n < e.length; n++) {
            const o = s(e[n])
            o && (t += o + ' ')
        }
    else if (F(e)) for (const n in e) e[n] && (t += n + ' ')
    return t.trim()
}
function a(e, t) {
    if (e === t) return !0
    let n = O(e),
        o = O(t)
    if (n || o) return !(!n || !o) && e.getTime() === t.getTime()
    if (((n = S(e)), (o = S(t)), n || o))
        return (
            !(!n || !o) &&
            (function (e, t) {
                if (e.length !== t.length) return !1
                let n = !0
                for (let o = 0; n && o < e.length; o++) n = a(e[o], t[o])
                return n
            })(e, t)
        )
    if (((n = F(e)), (o = F(t)), n || o)) {
        if (!n || !o) return !1
        if (Object.keys(e).length !== Object.keys(t).length) return !1
        for (const n in e) {
            const o = e.hasOwnProperty(n),
                r = t.hasOwnProperty(n)
            if ((o && !r) || (!o && r) || !a(e[n], t[n])) return !1
        }
    }
    return String(e) === String(t)
}
function u(e, t) {
    return e.findIndex((e) => a(e, t))
}
const c = (e) => (null == e ? '' : F(e) ? JSON.stringify(e, d, 2) : String(e)),
    d = (e, t) =>
        k(t)
            ? { [`Map(${t.size})`]: [...t.entries()].reduce((e, [t, n]) => ((e[`${t} =>`] = n), e), {}) }
            : C(t)
            ? { [`Set(${t.size})`]: [...t.values()] }
            : !F(t) || S(t) || R(t)
            ? t
            : String(t),
    f = {},
    p = [],
    v = () => {},
    h = () => !1,
    m = /^on[^a-z]/,
    g = (e) => m.test(e),
    b = (e) => e.startsWith('onUpdate:'),
    y = Object.assign,
    w = (e, t) => {
        const n = e.indexOf(t)
        n > -1 && e.splice(n, 1)
    },
    x = Object.prototype.hasOwnProperty,
    _ = (e, t) => x.call(e, t),
    S = Array.isArray,
    k = (e) => '[object Map]' === M(e),
    C = (e) => '[object Set]' === M(e),
    O = (e) => e instanceof Date,
    E = (e) => 'function' == typeof e,
    A = (e) => 'string' == typeof e,
    L = (e) => 'symbol' == typeof e,
    F = (e) => null !== e && 'object' == typeof e,
    T = (e) => F(e) && E(e.then) && E(e.catch),
    j = Object.prototype.toString,
    M = (e) => j.call(e),
    R = (e) => '[object Object]' === M(e),
    P = (e) => A(e) && 'NaN' !== e && '-' !== e[0] && '' + parseInt(e, 10) === e,
    B = e(
        ',key,ref,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted'
    ),
    $ = (e) => {
        const t = Object.create(null)
        return (n) => t[n] || (t[n] = e(n))
    },
    D = /-(\w)/g,
    I = $((e) => e.replace(D, (e, t) => (t ? t.toUpperCase() : ''))),
    V = /\B([A-Z])/g,
    N = $((e) => e.replace(V, '-$1').toLowerCase()),
    U = $((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    H = $((e) => (e ? `on${U(e)}` : '')),
    z = (e, t) => e !== t && (e == e || t == t),
    K = (e, t) => {
        for (let n = 0; n < e.length; n++) e[n](t)
    },
    W = (e, t, n) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
    },
    q = (e) => {
        const t = parseFloat(e)
        return isNaN(t) ? e : t
    },
    G = new WeakMap(),
    Y = []
let J
const Q = Symbol(''),
    X = Symbol('')
function Z(e, t = f) {
    ;(function (e) {
        return e && !0 === e._isEffect
    })(e) && (e = e.raw)
    const n = (function (e, t) {
        const n = function () {
            if (!n.active) return e()
            if (!Y.includes(n)) {
                ne(n)
                try {
                    return re.push(oe), (oe = !0), Y.push(n), (J = n), e()
                } finally {
                    Y.pop(), le(), (J = Y[Y.length - 1])
                }
            }
        }
        return (
            (n.id = te++),
            (n.allowRecurse = !!t.allowRecurse),
            (n._isEffect = !0),
            (n.active = !0),
            (n.raw = e),
            (n.deps = []),
            (n.options = t),
            n
        )
    })(e, t)
    return t.lazy || n(), n
}
function ee(e) {
    e.active && (ne(e), e.options.onStop && e.options.onStop(), (e.active = !1))
}
let te = 0
function ne(e) {
    const { deps: t } = e
    if (t.length) {
        for (let n = 0; n < t.length; n++) t[n].delete(e)
        t.length = 0
    }
}
let oe = !0
const re = []
function ie() {
    re.push(oe), (oe = !1)
}
function le() {
    const e = re.pop()
    oe = void 0 === e || e
}
function se(e, t, n) {
    if (!oe || void 0 === J) return
    let o = G.get(e)
    o || G.set(e, (o = new Map()))
    let r = o.get(n)
    r || o.set(n, (r = new Set())), r.has(J) || (r.add(J), J.deps.push(r))
}
function ae(e, t, n, o, r, i) {
    const l = G.get(e)
    if (!l) return
    const s = new Set(),
        a = (e) => {
            e &&
                e.forEach((e) => {
                    ;(e !== J || e.allowRecurse) && s.add(e)
                })
        }
    if ('clear' === t) l.forEach(a)
    else if ('length' === n && S(e))
        l.forEach((e, t) => {
            ;('length' === t || t >= o) && a(e)
        })
    else
        switch ((void 0 !== n && a(l.get(n)), t)) {
            case 'add':
                S(e) ? P(n) && a(l.get('length')) : (a(l.get(Q)), k(e) && a(l.get(X)))
                break
            case 'delete':
                S(e) || (a(l.get(Q)), k(e) && a(l.get(X)))
                break
            case 'set':
                k(e) && a(l.get(Q))
        }
    s.forEach((e) => {
        e.options.scheduler ? e.options.scheduler(e) : e()
    })
}
const ue = e('__proto__,__v_isRef,__isVue'),
    ce = new Set(
        Object.getOwnPropertyNames(Symbol)
            .map((e) => Symbol[e])
            .filter(L)
    ),
    de = me(),
    fe = me(!1, !0),
    pe = me(!0),
    ve = he()
function he() {
    const e = {}
    return (
        ['includes', 'indexOf', 'lastIndexOf'].forEach((t) => {
            const n = Array.prototype[t]
            e[t] = function (...e) {
                const t = tt(this)
                for (let n = 0, r = this.length; n < r; n++) se(t, 0, n + '')
                const o = n.apply(t, e)
                return -1 === o || !1 === o ? n.apply(t, e.map(tt)) : o
            }
        }),
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach((t) => {
            const n = Array.prototype[t]
            e[t] = function (...e) {
                ie()
                const t = n.apply(this, e)
                return le(), t
            }
        }),
        e
    )
}
function me(e = !1, t = !1) {
    return function (n, o, r) {
        if ('__v_isReactive' === o) return !e
        if ('__v_isReadonly' === o) return e
        if ('__v_raw' === o && r === (e ? (t ? qe : We) : t ? Ke : ze).get(n)) return n
        const i = S(n)
        if (!e && i && _(ve, o)) return Reflect.get(ve, o, r)
        const l = Reflect.get(n, o, r)
        if (L(o) ? ce.has(o) : ue(o)) return l
        if ((e || se(n, 0, o), t)) return l
        if (rt(l)) {
            return !i || !P(o) ? l.value : l
        }
        return F(l) ? (e ? Je(l) : Ye(l)) : l
    }
}
function ge(e = !1) {
    return function (t, n, o, r) {
        let i = t[n]
        if (!e && ((o = tt(o)), (i = tt(i)), !S(t) && rt(i) && !rt(o))) return (i.value = o), !0
        const l = S(t) && P(n) ? Number(n) < t.length : _(t, n),
            s = Reflect.set(t, n, o, r)
        return t === tt(r) && (l ? z(o, i) && ae(t, 'set', n, o) : ae(t, 'add', n, o)), s
    }
}
const be = {
        get: de,
        set: ge(),
        deleteProperty: function (e, t) {
            const n = _(e, t)
            e[t]
            const o = Reflect.deleteProperty(e, t)
            return o && n && ae(e, 'delete', t, void 0), o
        },
        has: function (e, t) {
            const n = Reflect.has(e, t)
            return (L(t) && ce.has(t)) || se(e, 0, t), n
        },
        ownKeys: function (e) {
            return se(e, 0, S(e) ? 'length' : Q), Reflect.ownKeys(e)
        },
    },
    ye = { get: pe, set: (e, t) => !0, deleteProperty: (e, t) => !0 },
    we = y({}, be, { get: fe, set: ge(!0) }),
    xe = (e) => (F(e) ? Ye(e) : e),
    _e = (e) => (F(e) ? Je(e) : e),
    Se = (e) => e,
    ke = (e) => Reflect.getPrototypeOf(e)
function Ce(e, t, n = !1, o = !1) {
    const r = tt((e = e.__v_raw)),
        i = tt(t)
    t !== i && !n && se(r, 0, t), !n && se(r, 0, i)
    const { has: l } = ke(r),
        s = o ? Se : n ? _e : xe
    return l.call(r, t) ? s(e.get(t)) : l.call(r, i) ? s(e.get(i)) : void (e !== r && e.get(t))
}
function Oe(e, t = !1) {
    const n = this.__v_raw,
        o = tt(n),
        r = tt(e)
    return e !== r && !t && se(o, 0, e), !t && se(o, 0, r), e === r ? n.has(e) : n.has(e) || n.has(r)
}
function Ee(e, t = !1) {
    return (e = e.__v_raw), !t && se(tt(e), 0, Q), Reflect.get(e, 'size', e)
}
function Ae(e) {
    e = tt(e)
    const t = tt(this)
    return ke(t).has.call(t, e) || (t.add(e), ae(t, 'add', e, e)), this
}
function Le(e, t) {
    t = tt(t)
    const n = tt(this),
        { has: o, get: r } = ke(n)
    let i = o.call(n, e)
    i || ((e = tt(e)), (i = o.call(n, e)))
    const l = r.call(n, e)
    return n.set(e, t), i ? z(t, l) && ae(n, 'set', e, t) : ae(n, 'add', e, t), this
}
function Fe(e) {
    const t = tt(this),
        { has: n, get: o } = ke(t)
    let r = n.call(t, e)
    r || ((e = tt(e)), (r = n.call(t, e))), o && o.call(t, e)
    const i = t.delete(e)
    return r && ae(t, 'delete', e, void 0), i
}
function Te() {
    const e = tt(this),
        t = 0 !== e.size,
        n = e.clear()
    return t && ae(e, 'clear', void 0, void 0), n
}
function je(e, t) {
    return function (n, o) {
        const r = this,
            i = r.__v_raw,
            l = tt(i),
            s = t ? Se : e ? _e : xe
        return !e && se(l, 0, Q), i.forEach((e, t) => n.call(o, s(e), s(t), r))
    }
}
function Me(e, t, n) {
    return function (...o) {
        const r = this.__v_raw,
            i = tt(r),
            l = k(i),
            s = 'entries' === e || (e === Symbol.iterator && l),
            a = 'keys' === e && l,
            u = r[e](...o),
            c = n ? Se : t ? _e : xe
        return (
            !t && se(i, 0, a ? X : Q),
            {
                next() {
                    const { value: e, done: t } = u.next()
                    return t ? { value: e, done: t } : { value: s ? [c(e[0]), c(e[1])] : c(e), done: t }
                },
                [Symbol.iterator]() {
                    return this
                },
            }
        )
    }
}
function Re(e) {
    return function (...t) {
        return 'delete' !== e && this
    }
}
function Pe() {
    const e = {
            get(e) {
                return Ce(this, e)
            },
            get size() {
                return Ee(this)
            },
            has: Oe,
            add: Ae,
            set: Le,
            delete: Fe,
            clear: Te,
            forEach: je(!1, !1),
        },
        t = {
            get(e) {
                return Ce(this, e, !1, !0)
            },
            get size() {
                return Ee(this)
            },
            has: Oe,
            add: Ae,
            set: Le,
            delete: Fe,
            clear: Te,
            forEach: je(!1, !0),
        },
        n = {
            get(e) {
                return Ce(this, e, !0)
            },
            get size() {
                return Ee(this, !0)
            },
            has(e) {
                return Oe.call(this, e, !0)
            },
            add: Re('add'),
            set: Re('set'),
            delete: Re('delete'),
            clear: Re('clear'),
            forEach: je(!0, !1),
        },
        o = {
            get(e) {
                return Ce(this, e, !0, !0)
            },
            get size() {
                return Ee(this, !0)
            },
            has(e) {
                return Oe.call(this, e, !0)
            },
            add: Re('add'),
            set: Re('set'),
            delete: Re('delete'),
            clear: Re('clear'),
            forEach: je(!0, !0),
        }
    return (
        ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
            ;(e[r] = Me(r, !1, !1)), (n[r] = Me(r, !0, !1)), (t[r] = Me(r, !1, !0)), (o[r] = Me(r, !0, !0))
        }),
        [e, n, t, o]
    )
}
const [Be, $e, De, Ie] = Pe()
function Ve(e, t) {
    const n = t ? (e ? Ie : De) : e ? $e : Be
    return (t, o, r) =>
        '__v_isReactive' === o
            ? !e
            : '__v_isReadonly' === o
            ? e
            : '__v_raw' === o
            ? t
            : Reflect.get(_(n, o) && o in t ? n : t, o, r)
}
const Ne = { get: Ve(!1, !1) },
    Ue = { get: Ve(!1, !0) },
    He = { get: Ve(!0, !1) },
    ze = new WeakMap(),
    Ke = new WeakMap(),
    We = new WeakMap(),
    qe = new WeakMap()
function Ge(e) {
    return e.__v_skip || !Object.isExtensible(e)
        ? 0
        : (function (e) {
              switch (e) {
                  case 'Object':
                  case 'Array':
                      return 1
                  case 'Map':
                  case 'Set':
                  case 'WeakMap':
                  case 'WeakSet':
                      return 2
                  default:
                      return 0
              }
          })(((e) => M(e).slice(8, -1))(e))
}
function Ye(e) {
    return e && e.__v_isReadonly ? e : Qe(e, !1, be, Ne, ze)
}
function Je(e) {
    return Qe(e, !0, ye, He, We)
}
function Qe(e, t, n, o, r) {
    if (!F(e)) return e
    if (e.__v_raw && (!t || !e.__v_isReactive)) return e
    const i = r.get(e)
    if (i) return i
    const l = Ge(e)
    if (0 === l) return e
    const s = new Proxy(e, 2 === l ? o : n)
    return r.set(e, s), s
}
function Xe(e) {
    return Ze(e) ? Xe(e.__v_raw) : !(!e || !e.__v_isReactive)
}
function Ze(e) {
    return !(!e || !e.__v_isReadonly)
}
function et(e) {
    return Xe(e) || Ze(e)
}
function tt(e) {
    return (e && tt(e.__v_raw)) || e
}
function nt(e) {
    return W(e, '__v_skip', !0), e
}
const ot = (e) => (F(e) ? Ye(e) : e)
function rt(e) {
    return Boolean(e && !0 === e.__v_isRef)
}
function it(e) {
    return (function (e, t = !1) {
        if (rt(e)) return e
        return new lt(e, t)
    })(e)
}
class lt {
    constructor(e, t) {
        ;(this._rawValue = e), (this._shallow = t), (this.__v_isRef = !0), (this._value = t ? e : ot(e))
    }
    get value() {
        return se(tt(this), 0, 'value'), this._value
    }
    set value(e) {
        z(tt(e), this._rawValue) &&
            ((this._rawValue = e), (this._value = this._shallow ? e : ot(e)), ae(tt(this), 'set', 'value', e))
    }
}
function st(e) {
    return rt(e) ? e.value : e
}
const at = {
    get: (e, t, n) => st(Reflect.get(e, t, n)),
    set: (e, t, n, o) => {
        const r = e[t]
        return rt(r) && !rt(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, o)
    },
}
function ut(e) {
    return Xe(e) ? e : new Proxy(e, at)
}
class ct {
    constructor(e, t, n) {
        ;(this._setter = t),
            (this._dirty = !0),
            (this.__v_isRef = !0),
            (this.effect = Z(e, {
                lazy: !0,
                scheduler: () => {
                    this._dirty || ((this._dirty = !0), ae(tt(this), 'set', 'value'))
                },
            })),
            (this.__v_isReadonly = n)
    }
    get value() {
        const e = tt(this)
        return e._dirty && ((e._value = this.effect()), (e._dirty = !1)), se(e, 0, 'value'), e._value
    }
    set value(e) {
        this._setter(e)
    }
}
function dt(e, t, n, o) {
    let r
    try {
        r = o ? e(...o) : e()
    } catch (i) {
        pt(i, t, n)
    }
    return r
}
function ft(e, t, n, o) {
    if (E(e)) {
        const r = dt(e, t, n, o)
        return (
            r &&
                T(r) &&
                r.catch((e) => {
                    pt(e, t, n)
                }),
            r
        )
    }
    const r = []
    for (let i = 0; i < e.length; i++) r.push(ft(e[i], t, n, o))
    return r
}
function pt(e, t, n, o = !0) {
    t && t.vnode
    if (t) {
        let o = t.parent
        const r = t.proxy,
            i = n
        for (; o; ) {
            const t = o.ec
            if (t) for (let n = 0; n < t.length; n++) if (!1 === t[n](e, r, i)) return
            o = o.parent
        }
        const l = t.appContext.config.errorHandler
        if (l) return void dt(l, null, 10, [e, r, i])
    }
    !(function (e, t, n, o = !0) {
        console.error(e)
    })(e, 0, 0, o)
}
let vt = !1,
    ht = !1
const mt = []
let gt = 0
const bt = []
let yt = null,
    wt = 0
const xt = []
let _t = null,
    St = 0
const kt = Promise.resolve()
let Ct = null,
    Ot = null
function Et(e) {
    const t = Ct || kt
    return e ? t.then(this ? e.bind(this) : e) : t
}
function At(e) {
    if (!((mt.length && mt.includes(e, vt && e.allowRecurse ? gt + 1 : gt)) || e === Ot)) {
        const t = (function (e) {
            let t = gt + 1,
                n = mt.length
            const o = Mt(e)
            for (; t < n; ) {
                const e = (t + n) >>> 1
                Mt(mt[e]) < o ? (t = e + 1) : (n = e)
            }
            return t
        })(e)
        t > -1 ? mt.splice(t, 0, e) : mt.push(e), Lt()
    }
}
function Lt() {
    vt || ht || ((ht = !0), (Ct = kt.then(Rt)))
}
function Ft(e, t, n, o) {
    S(e) ? n.push(...e) : (t && t.includes(e, e.allowRecurse ? o + 1 : o)) || n.push(e), Lt()
}
function Tt(e, t = null) {
    if (bt.length) {
        for (Ot = t, yt = [...new Set(bt)], bt.length = 0, wt = 0; wt < yt.length; wt++) yt[wt]()
        ;(yt = null), (wt = 0), (Ot = null), Tt(e, t)
    }
}
function jt(e) {
    if (xt.length) {
        const e = [...new Set(xt)]
        if (((xt.length = 0), _t)) return void _t.push(...e)
        for (_t = e, _t.sort((e, t) => Mt(e) - Mt(t)), St = 0; St < _t.length; St++) _t[St]()
        ;(_t = null), (St = 0)
    }
}
const Mt = (e) => (null == e.id ? 1 / 0 : e.id)
function Rt(e) {
    ;(ht = !1), (vt = !0), Tt(e), mt.sort((e, t) => Mt(e) - Mt(t))
    try {
        for (gt = 0; gt < mt.length; gt++) {
            const e = mt[gt]
            e && !1 !== e.active && dt(e, null, 14)
        }
    } finally {
        ;(gt = 0), (mt.length = 0), jt(), (vt = !1), (Ct = null), (mt.length || bt.length || xt.length) && Rt(e)
    }
}
function Pt(e, t, ...n) {
    const o = e.vnode.props || f
    let r = n
    const i = t.startsWith('update:'),
        l = i && t.slice(7)
    if (l && l in o) {
        const e = `${'modelValue' === l ? 'model' : l}Modifiers`,
            { number: t, trim: i } = o[e] || f
        i ? (r = n.map((e) => e.trim())) : t && (r = n.map(q))
    }
    let s,
        a = o[(s = H(t))] || o[(s = H(I(t)))]
    !a && i && (a = o[(s = H(N(t)))]), a && ft(a, e, 6, r)
    const u = o[s + 'Once']
    if (u) {
        if (e.emitted) {
            if (e.emitted[s]) return
        } else e.emitted = {}
        ;(e.emitted[s] = !0), ft(u, e, 6, r)
    }
}
function Bt(e, t, n = !1) {
    const o = t.emitsCache,
        r = o.get(e)
    if (void 0 !== r) return r
    const i = e.emits
    let l = {},
        s = !1
    if (!E(e)) {
        const o = (e) => {
            const n = Bt(e, t, !0)
            n && ((s = !0), y(l, n))
        }
        !n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
    }
    return i || s ? (S(i) ? i.forEach((e) => (l[e] = null)) : y(l, i), o.set(e, l), l) : (o.set(e, null), null)
}
function $t(e, t) {
    return (
        !(!e || !g(t)) &&
        ((t = t.slice(2).replace(/Once$/, '')), _(e, t[0].toLowerCase() + t.slice(1)) || _(e, N(t)) || _(e, t))
    )
}
let Dt = null,
    It = null
function Vt(e) {
    const t = Dt
    return (Dt = e), (It = (e && e.type.__scopeId) || null), t
}
function Nt(e) {
    It = e
}
function Ut() {
    It = null
}
const Ht = (e) => zt
function zt(e, t = Dt, n) {
    if (!t) return e
    if (e._n) return e
    const o = (...n) => {
        o._d && jo(-1)
        const r = Vt(t),
            i = e(...n)
        return Vt(r), o._d && jo(1), i
    }
    return (o._n = !0), (o._c = !0), (o._d = !0), o
}
function Kt(e) {
    const {
        type: t,
        vnode: n,
        proxy: o,
        withProxy: r,
        props: i,
        propsOptions: [l],
        slots: s,
        attrs: a,
        emit: u,
        render: c,
        renderCache: d,
        data: f,
        setupState: p,
        ctx: v,
        inheritAttrs: h,
    } = e
    let m
    const g = Vt(e)
    try {
        let e
        if (4 & n.shapeFlag) {
            const t = r || o
            ;(m = Ho(c.call(t, t, d, i, p, f, v))), (e = a)
        } else {
            const n = t
            0, (m = Ho(n.length > 1 ? n(i, { attrs: a, slots: s, emit: u }) : n(i, null))), (e = t.props ? a : Wt(a))
        }
        let g = m
        if (e && !1 !== h) {
            const t = Object.keys(e),
                { shapeFlag: n } = g
            t.length && (1 & n || 6 & n) && (l && t.some(b) && (e = qt(e, l)), (g = Vo(g, e)))
        }
        0,
            n.dirs && (g.dirs = g.dirs ? g.dirs.concat(n.dirs) : n.dirs),
            n.transition && (g.transition = n.transition),
            (m = g)
    } catch (y) {
        ;(Ao.length = 0), pt(y, e, 1), (m = Io(Oo))
    }
    return Vt(g), m
}
const Wt = (e) => {
        let t
        for (const n in e) ('class' === n || 'style' === n || g(n)) && ((t || (t = {}))[n] = e[n])
        return t
    },
    qt = (e, t) => {
        const n = {}
        for (const o in e) (b(o) && o.slice(9) in t) || (n[o] = e[o])
        return n
    }
function Gt(e, t, n) {
    const o = Object.keys(t)
    if (o.length !== Object.keys(e).length) return !0
    for (let r = 0; r < o.length; r++) {
        const i = o[r]
        if (t[i] !== e[i] && !$t(n, i)) return !0
    }
    return !1
}
function Yt(e, t) {
    if (tr) {
        let n = tr.provides
        const o = tr.parent && tr.parent.provides
        o === n && (n = tr.provides = Object.create(o)), (n[e] = t)
    } else;
}
function Jt(e, t, n = !1) {
    const o = tr || Dt
    if (o) {
        const r = null == o.parent ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides
        if (r && e in r) return r[e]
        if (arguments.length > 1) return n && E(t) ? t.call(o.proxy) : t
    }
}
function Qt(e, t) {
    return en(e, null, t)
}
const Xt = {}
function Zt(e, t, n) {
    return en(e, t, n)
}
function en(e, t, { immediate: n, deep: o, flush: r, onTrack: i, onTrigger: l } = f, s = tr) {
    let a,
        u,
        c = !1,
        d = !1
    if (
        (rt(e)
            ? ((a = () => e.value), (c = !!e._shallow))
            : Xe(e)
            ? ((a = () => e), (o = !0))
            : S(e)
            ? ((d = !0),
              (c = e.some(Xe)),
              (a = () => e.map((e) => (rt(e) ? e.value : Xe(e) ? on(e) : E(e) ? dt(e, s, 2) : void 0))))
            : (a = E(e)
                  ? t
                      ? () => dt(e, s, 2)
                      : () => {
                            if (!s || !s.isUnmounted) return u && u(), ft(e, s, 3, [p])
                        }
                  : v),
        t && o)
    ) {
        const e = a
        a = () => on(e())
    }
    let p = (e) => {
            u = b.options.onStop = () => {
                dt(e, s, 4)
            }
        },
        h = d ? [] : Xt
    const m = () => {
        if (b.active)
            if (t) {
                const e = b()
                ;(o || c || (d ? e.some((e, t) => z(e, h[t])) : z(e, h))) &&
                    (u && u(), ft(t, s, 3, [e, h === Xt ? void 0 : h, p]), (h = e))
            } else b()
    }
    let g
    ;(m.allowRecurse = !!t),
        (g =
            'sync' === r
                ? m
                : 'post' === r
                ? () => ao(m, s && s.suspense)
                : () => {
                      !s || s.isMounted
                          ? (function (e) {
                                Ft(e, yt, bt, wt)
                            })(m)
                          : m()
                  })
    const b = Z(a, { lazy: !0, onTrack: i, onTrigger: l, scheduler: g })
    return (
        ur(b, s),
        t ? (n ? m() : (h = b())) : 'post' === r ? ao(b, s && s.suspense) : b(),
        () => {
            ee(b), s && w(s.effects, b)
        }
    )
}
function tn(e, t, n) {
    const o = this.proxy,
        r = A(e) ? (e.includes('.') ? nn(o, e) : () => o[e]) : e.bind(o, o)
    let i
    return E(t) ? (i = t) : ((i = t.handler), (n = t)), en(r, i.bind(o), n, this)
}
function nn(e, t) {
    const n = t.split('.')
    return () => {
        let t = e
        for (let e = 0; e < n.length && t; e++) t = t[n[e]]
        return t
    }
}
function on(e, t = new Set()) {
    if (!F(e) || t.has(e) || e.__v_skip) return e
    if ((t.add(e), rt(e))) on(e.value, t)
    else if (S(e)) for (let n = 0; n < e.length; n++) on(e[n], t)
    else if (C(e) || k(e))
        e.forEach((e) => {
            on(e, t)
        })
    else if (R(e)) for (const n in e) on(e[n], t)
    return e
}
const rn = [Function, Array],
    ln = {
        name: 'BaseTransition',
        props: {
            mode: String,
            appear: Boolean,
            persisted: Boolean,
            onBeforeEnter: rn,
            onEnter: rn,
            onAfterEnter: rn,
            onEnterCancelled: rn,
            onBeforeLeave: rn,
            onLeave: rn,
            onAfterLeave: rn,
            onLeaveCancelled: rn,
            onBeforeAppear: rn,
            onAppear: rn,
            onAfterAppear: rn,
            onAppearCancelled: rn,
        },
        setup(e, { slots: t }) {
            const n = nr(),
                o = (function () {
                    const e = { isMounted: !1, isLeaving: !1, isUnmounting: !1, leavingVNodes: new Map() }
                    return (
                        Sn(() => {
                            e.isMounted = !0
                        }),
                        On(() => {
                            e.isUnmounting = !0
                        }),
                        e
                    )
                })()
            let r
            return () => {
                const i = t.default && fn(t.default(), !0)
                if (!i || !i.length) return
                const l = tt(e),
                    { mode: s } = l,
                    a = i[0]
                if (o.isLeaving) return un(a)
                const u = cn(a)
                if (!u) return un(a)
                const c = an(u, l, o, n)
                dn(u, c)
                const d = n.subTree,
                    f = d && cn(d)
                let p = !1
                const { getTransitionKey: v } = u.type
                if (v) {
                    const e = v()
                    void 0 === r ? (r = e) : e !== r && ((r = e), (p = !0))
                }
                if (f && f.type !== Oo && (!Po(u, f) || p)) {
                    const e = an(f, l, o, n)
                    if ((dn(f, e), 'out-in' === s))
                        return (
                            (o.isLeaving = !0),
                            (e.afterLeave = () => {
                                ;(o.isLeaving = !1), n.update()
                            }),
                            un(a)
                        )
                    'in-out' === s &&
                        u.type !== Oo &&
                        (e.delayLeave = (e, t, n) => {
                            ;(sn(o, f)[String(f.key)] = f),
                                (e._leaveCb = () => {
                                    t(), (e._leaveCb = void 0), delete c.delayedLeave
                                }),
                                (c.delayedLeave = n)
                        })
                }
                return a
            }
        },
    }
function sn(e, t) {
    const { leavingVNodes: n } = e
    let o = n.get(t.type)
    return o || ((o = Object.create(null)), n.set(t.type, o)), o
}
function an(e, t, n, o) {
    const {
            appear: r,
            mode: i,
            persisted: l = !1,
            onBeforeEnter: s,
            onEnter: a,
            onAfterEnter: u,
            onEnterCancelled: c,
            onBeforeLeave: d,
            onLeave: f,
            onAfterLeave: p,
            onLeaveCancelled: v,
            onBeforeAppear: h,
            onAppear: m,
            onAfterAppear: g,
            onAppearCancelled: b,
        } = t,
        y = String(e.key),
        w = sn(n, e),
        x = (e, t) => {
            e && ft(e, o, 9, t)
        },
        _ = {
            mode: i,
            persisted: l,
            beforeEnter(t) {
                let o = s
                if (!n.isMounted) {
                    if (!r) return
                    o = h || s
                }
                t._leaveCb && t._leaveCb(!0)
                const i = w[y]
                i && Po(e, i) && i.el._leaveCb && i.el._leaveCb(), x(o, [t])
            },
            enter(e) {
                let t = a,
                    o = u,
                    i = c
                if (!n.isMounted) {
                    if (!r) return
                    ;(t = m || a), (o = g || u), (i = b || c)
                }
                let l = !1
                const s = (e._enterCb = (t) => {
                    l || ((l = !0), x(t ? i : o, [e]), _.delayedLeave && _.delayedLeave(), (e._enterCb = void 0))
                })
                t ? (t(e, s), t.length <= 1 && s()) : s()
            },
            leave(t, o) {
                const r = String(e.key)
                if ((t._enterCb && t._enterCb(!0), n.isUnmounting)) return o()
                x(d, [t])
                let i = !1
                const l = (t._leaveCb = (n) => {
                    i || ((i = !0), o(), x(n ? v : p, [t]), (t._leaveCb = void 0), w[r] === e && delete w[r])
                })
                ;(w[r] = e), f ? (f(t, l), f.length <= 1 && l()) : l()
            },
            clone: (e) => an(e, t, n, o),
        }
    return _
}
function un(e) {
    if (hn(e)) return ((e = Vo(e)).children = null), e
}
function cn(e) {
    return hn(e) ? (e.children ? e.children[0] : void 0) : e
}
function dn(e, t) {
    6 & e.shapeFlag && e.component
        ? dn(e.component.subTree, t)
        : 128 & e.shapeFlag
        ? ((e.ssContent.transition = t.clone(e.ssContent)), (e.ssFallback.transition = t.clone(e.ssFallback)))
        : (e.transition = t)
}
function fn(e, t = !1) {
    let n = [],
        o = 0
    for (let r = 0; r < e.length; r++) {
        const i = e[r]
        i.type === ko
            ? (128 & i.patchFlag && o++, (n = n.concat(fn(i.children, t))))
            : (t || i.type !== Oo) && n.push(i)
    }
    if (o > 1) for (let r = 0; r < n.length; r++) n[r].patchFlag = -2
    return n
}
function pn(e) {
    return E(e) ? { setup: e, name: e.name } : e
}
const vn = (e) => !!e.type.__asyncLoader,
    hn = (e) => e.type.__isKeepAlive
function mn(e, t) {
    bn(e, 'a', t)
}
function gn(e, t) {
    bn(e, 'da', t)
}
function bn(e, t, n = tr) {
    const o =
        e.__wdc ||
        (e.__wdc = () => {
            let t = n
            for (; t; ) {
                if (t.isDeactivated) return
                t = t.parent
            }
            e()
        })
    if ((wn(t, o, n), n)) {
        let e = n.parent
        for (; e && e.parent; ) hn(e.parent.vnode) && yn(o, t, n, e), (e = e.parent)
    }
}
function yn(e, t, n, o) {
    const r = wn(t, e, o, !0)
    En(() => {
        w(o[t], r)
    }, n)
}
function wn(e, t, n = tr, o = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            i =
                t.__weh ||
                (t.__weh = (...o) => {
                    if (n.isUnmounted) return
                    ie(), or(n)
                    const r = ft(t, n, e, o)
                    return or(null), le(), r
                })
        return o ? r.unshift(i) : r.push(i), i
    }
}
const xn =
        (e) =>
        (t, n = tr) =>
            (!ir || 'sp' === e) && wn(e, t, n),
    _n = xn('bm'),
    Sn = xn('m'),
    kn = xn('bu'),
    Cn = xn('u'),
    On = xn('bum'),
    En = xn('um'),
    An = xn('sp'),
    Ln = xn('rtg'),
    Fn = xn('rtc')
function Tn(e, t = tr) {
    wn('ec', e, t)
}
let jn = !0
function Mn(e) {
    const t = Bn(e),
        n = e.proxy,
        o = e.ctx
    ;(jn = !1), t.beforeCreate && Rn(t.beforeCreate, e, 'bc')
    const {
        data: r,
        computed: i,
        methods: l,
        watch: s,
        provide: a,
        inject: u,
        created: c,
        beforeMount: d,
        mounted: f,
        beforeUpdate: p,
        updated: h,
        activated: m,
        deactivated: g,
        beforeDestroy: b,
        beforeUnmount: y,
        destroyed: w,
        unmounted: x,
        render: _,
        renderTracked: k,
        renderTriggered: C,
        errorCaptured: O,
        serverPrefetch: A,
        expose: L,
        inheritAttrs: T,
        components: j,
        directives: M,
        filters: R,
    } = t
    if (
        (u &&
            (function (e, t, n = v) {
                S(e) && (e = Vn(e))
                for (const o in e) {
                    const n = e[o]
                    F(n) ? (t[o] = 'default' in n ? Jt(n.from || o, n.default, !0) : Jt(n.from || o)) : (t[o] = Jt(n))
                }
            })(u, o, null),
        l)
    )
        for (const v in l) {
            const e = l[v]
            E(e) && (o[v] = e.bind(n))
        }
    if (r) {
        const t = r.call(n, n)
        F(t) && (e.data = Ye(t))
    }
    if (((jn = !0), i))
        for (const S in i) {
            const e = i[S],
                t = dr({
                    get: E(e) ? e.bind(n, n) : E(e.get) ? e.get.bind(n, n) : v,
                    set: !E(e) && E(e.set) ? e.set.bind(n) : v,
                })
            Object.defineProperty(o, S, {
                enumerable: !0,
                configurable: !0,
                get: () => t.value,
                set: (e) => (t.value = e),
            })
        }
    if (s) for (const v in s) Pn(s[v], o, n, v)
    if (a) {
        const e = E(a) ? a.call(n) : a
        Reflect.ownKeys(e).forEach((t) => {
            Yt(t, e[t])
        })
    }
    function P(e, t) {
        S(t) ? t.forEach((t) => e(t.bind(n))) : t && e(t.bind(n))
    }
    if (
        (c && Rn(c, e, 'c'),
        P(_n, d),
        P(Sn, f),
        P(kn, p),
        P(Cn, h),
        P(mn, m),
        P(gn, g),
        P(Tn, O),
        P(Fn, k),
        P(Ln, C),
        P(On, y),
        P(En, x),
        P(An, A),
        S(L))
    )
        if (L.length) {
            const t = e.exposed || (e.exposed = {})
            L.forEach((e) => {
                Object.defineProperty(t, e, { get: () => n[e], set: (t) => (n[e] = t) })
            })
        } else e.exposed || (e.exposed = {})
    _ && e.render === v && (e.render = _),
        null != T && (e.inheritAttrs = T),
        j && (e.components = j),
        M && (e.directives = M)
}
function Rn(e, t, n) {
    ft(S(e) ? e.map((e) => e.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function Pn(e, t, n, o) {
    const r = o.includes('.') ? nn(n, o) : () => n[o]
    if (A(e)) {
        const n = t[e]
        E(n) && Zt(r, n)
    } else if (E(e)) Zt(r, e.bind(n))
    else if (F(e))
        if (S(e)) e.forEach((e) => Pn(e, t, n, o))
        else {
            const o = E(e.handler) ? e.handler.bind(n) : t[e.handler]
            E(o) && Zt(r, o, e)
        }
}
function Bn(e) {
    const t = e.type,
        { mixins: n, extends: o } = t,
        {
            mixins: r,
            optionsCache: i,
            config: { optionMergeStrategies: l },
        } = e.appContext,
        s = i.get(t)
    let a
    return (
        s
            ? (a = s)
            : r.length || n || o
            ? ((a = {}), r.length && r.forEach((e) => $n(a, e, l, !0)), $n(a, t, l))
            : (a = t),
        i.set(t, a),
        a
    )
}
function $n(e, t, n, o = !1) {
    const { mixins: r, extends: i } = t
    i && $n(e, i, n, !0), r && r.forEach((t) => $n(e, t, n, !0))
    for (const l in t)
        if (o && 'expose' === l);
        else {
            const o = Dn[l] || (n && n[l])
            e[l] = o ? o(e[l], t[l]) : t[l]
        }
    return e
}
const Dn = {
    data: In,
    props: Un,
    emits: Un,
    methods: Un,
    computed: Un,
    beforeCreate: Nn,
    created: Nn,
    beforeMount: Nn,
    mounted: Nn,
    beforeUpdate: Nn,
    updated: Nn,
    beforeDestroy: Nn,
    destroyed: Nn,
    activated: Nn,
    deactivated: Nn,
    errorCaptured: Nn,
    serverPrefetch: Nn,
    components: Un,
    directives: Un,
    watch: function (e, t) {
        if (!e) return t
        if (!t) return e
        const n = y(Object.create(null), e)
        for (const o in t) n[o] = Nn(e[o], t[o])
        return n
    },
    provide: In,
    inject: function (e, t) {
        return Un(Vn(e), Vn(t))
    },
}
function In(e, t) {
    return t
        ? e
            ? function () {
                  return y(E(e) ? e.call(this, this) : e, E(t) ? t.call(this, this) : t)
              }
            : t
        : e
}
function Vn(e) {
    if (S(e)) {
        const t = {}
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
        return t
    }
    return e
}
function Nn(e, t) {
    return e ? [...new Set([].concat(e, t))] : t
}
function Un(e, t) {
    return e ? y(y(Object.create(null), e), t) : t
}
function Hn(e, t, n, o = !1) {
    const r = {},
        i = {}
    W(i, Bo, 1), (e.propsDefaults = Object.create(null)), zn(e, t, r, i)
    for (const l in e.propsOptions[0]) l in r || (r[l] = void 0)
    n ? (e.props = o ? r : Qe(r, !1, we, Ue, Ke)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i)
}
function zn(e, t, n, o) {
    const [r, i] = e.propsOptions
    let l,
        s = !1
    if (t)
        for (let a in t) {
            if (B(a)) continue
            const u = t[a]
            let c
            r && _(r, (c = I(a)))
                ? i && i.includes(c)
                    ? ((l || (l = {}))[c] = u)
                    : (n[c] = u)
                : $t(e.emitsOptions, a) || (u !== o[a] && ((o[a] = u), (s = !0)))
        }
    if (i) {
        const t = tt(n),
            o = l || f
        for (let l = 0; l < i.length; l++) {
            const s = i[l]
            n[s] = Kn(r, t, s, o[s], e, !_(o, s))
        }
    }
    return s
}
function Kn(e, t, n, o, r, i) {
    const l = e[n]
    if (null != l) {
        const e = _(l, 'default')
        if (e && void 0 === o) {
            const e = l.default
            if (l.type !== Function && E(e)) {
                const { propsDefaults: i } = r
                n in i ? (o = i[n]) : (or(r), (o = i[n] = e.call(null, t)), or(null))
            } else o = e
        }
        l[0] && (i && !e ? (o = !1) : !l[1] || ('' !== o && o !== N(n)) || (o = !0))
    }
    return o
}
function Wn(e, t, n = !1) {
    const o = t.propsCache,
        r = o.get(e)
    if (r) return r
    const i = e.props,
        l = {},
        s = []
    let a = !1
    if (!E(e)) {
        const o = (e) => {
            a = !0
            const [n, o] = Wn(e, t, !0)
            y(l, n), o && s.push(...o)
        }
        !n && t.mixins.length && t.mixins.forEach(o), e.extends && o(e.extends), e.mixins && e.mixins.forEach(o)
    }
    if (!i && !a) return o.set(e, p), p
    if (S(i))
        for (let c = 0; c < i.length; c++) {
            const e = I(i[c])
            qn(e) && (l[e] = f)
        }
    else if (i)
        for (const c in i) {
            const e = I(c)
            if (qn(e)) {
                const t = i[c],
                    n = (l[e] = S(t) || E(t) ? { type: t } : t)
                if (n) {
                    const t = Jn(Boolean, n.type),
                        o = Jn(String, n.type)
                    ;(n[0] = t > -1), (n[1] = o < 0 || t < o), (t > -1 || _(n, 'default')) && s.push(e)
                }
            }
        }
    const u = [l, s]
    return o.set(e, u), u
}
function qn(e) {
    return '$' !== e[0]
}
function Gn(e) {
    const t = e && e.toString().match(/^\s*function (\w+)/)
    return t ? t[1] : ''
}
function Yn(e, t) {
    return Gn(e) === Gn(t)
}
function Jn(e, t) {
    return S(t) ? t.findIndex((t) => Yn(t, e)) : E(t) && Yn(t, e) ? 0 : -1
}
const Qn = (e) => '_' === e[0] || '$stable' === e,
    Xn = (e) => (S(e) ? e.map(Ho) : [Ho(e)]),
    Zn = (e, t, n) => {
        const o = zt((e) => Xn(t(e)), n)
        return (o._c = !1), o
    },
    eo = (e, t, n) => {
        const o = e._ctx
        for (const r in e) {
            if (Qn(r)) continue
            const n = e[r]
            if (E(n)) t[r] = Zn(0, n, o)
            else if (null != n) {
                const e = Xn(n)
                t[r] = () => e
            }
        }
    },
    to = (e, t) => {
        const n = Xn(t)
        e.slots.default = () => n
    }
function no(e, t) {
    if (null === Dt) return e
    const n = Dt.proxy,
        o = e.dirs || (e.dirs = [])
    for (let r = 0; r < t.length; r++) {
        let [e, i, l, s = f] = t[r]
        E(e) && (e = { mounted: e, updated: e }),
            o.push({ dir: e, instance: n, value: i, oldValue: void 0, arg: l, modifiers: s })
    }
    return e
}
function oo(e, t, n, o) {
    const r = e.dirs,
        i = t && t.dirs
    for (let l = 0; l < r.length; l++) {
        const s = r[l]
        i && (s.oldValue = i[l].value)
        let a = s.dir[o]
        a && (ie(), ft(a, n, 8, [e.el, s, e, t]), le())
    }
}
function ro() {
    return {
        app: null,
        config: {
            isNativeTag: h,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    }
}
let io = 0
function lo(e, t) {
    return function (n, o = null) {
        null == o || F(o) || (o = null)
        const r = ro(),
            i = new Set()
        let l = !1
        const s = (r.app = {
            _uid: io++,
            _component: n,
            _props: o,
            _container: null,
            _context: r,
            _instance: null,
            version: pr,
            get config() {
                return r.config
            },
            set config(e) {},
            use: (e, ...t) => (
                i.has(e) || (e && E(e.install) ? (i.add(e), e.install(s, ...t)) : E(e) && (i.add(e), e(s, ...t))), s
            ),
            mixin: (e) => (r.mixins.includes(e) || r.mixins.push(e), s),
            component: (e, t) => (t ? ((r.components[e] = t), s) : r.components[e]),
            directive: (e, t) => (t ? ((r.directives[e] = t), s) : r.directives[e]),
            mount(i, a, u) {
                if (!l) {
                    const c = Io(n, o)
                    return (
                        (c.appContext = r),
                        a && t ? t(c, i) : e(c, i, u),
                        (l = !0),
                        (s._container = i),
                        (i.__vue_app__ = s),
                        c.component.proxy
                    )
                }
            },
            unmount() {
                l && (e(null, s._container), delete s._container.__vue_app__)
            },
            provide: (e, t) => ((r.provides[e] = t), s),
        })
        return s
    }
}
const so = { scheduler: At, allowRecurse: !0 },
    ao = function (e, t) {
        t && t.pendingBranch ? (S(e) ? t.effects.push(...e) : t.effects.push(e)) : Ft(e, _t, xt, St)
    },
    uo = (e, t, n, o, r = !1) => {
        if (S(e)) return void e.forEach((e, i) => uo(e, t && (S(t) ? t[i] : t), n, o, r))
        if (vn(o) && !r) return
        const i = 4 & o.shapeFlag ? ar(o.component) || o.component.proxy : o.el,
            l = r ? null : i,
            { i: s, r: a } = e,
            u = t && t.r,
            c = s.refs === f ? (s.refs = {}) : s.refs,
            d = s.setupState
        if (
            (null != u && u !== a && (A(u) ? ((c[u] = null), _(d, u) && (d[u] = null)) : rt(u) && (u.value = null)),
            A(a))
        ) {
            const e = () => {
                ;(c[a] = l), _(d, a) && (d[a] = l)
            }
            l ? ((e.id = -1), ao(e, n)) : e()
        } else if (rt(a)) {
            const e = () => {
                a.value = l
            }
            l ? ((e.id = -1), ao(e, n)) : e()
        } else E(a) && dt(a, s, 12, [l, c])
    }
function co(e) {
    return (function (e, t) {
        const {
                insert: n,
                remove: o,
                patchProp: r,
                forcePatchProp: i,
                createElement: l,
                createText: s,
                createComment: a,
                setText: u,
                setElementText: c,
                parentNode: d,
                nextSibling: h,
                setScopeId: m = v,
                cloneNode: g,
                insertStaticContent: b,
            } = e,
            w = (e, t, n, o = null, r = null, i = null, l = !1, s = null, a = !1) => {
                e && !Po(e, t) && ((o = oe(e)), J(e, r, i, !0), (e = null)),
                    -2 === t.patchFlag && ((a = !1), (t.dynamicChildren = null))
                const { type: u, ref: c, shapeFlag: d } = t
                switch (u) {
                    case Co:
                        x(e, t, n, o)
                        break
                    case Oo:
                        S(e, t, n, o)
                        break
                    case Eo:
                        null == e && k(t, n, o, l)
                        break
                    case ko:
                        P(e, t, n, o, r, i, l, s, a)
                        break
                    default:
                        1 & d
                            ? E(e, t, n, o, r, i, l, s, a)
                            : 6 & d
                            ? $(e, t, n, o, r, i, l, s, a)
                            : (64 & d || 128 & d) && u.process(e, t, n, o, r, i, l, s, a, se)
                }
                null != c && r && uo(c, e && e.ref, i, t || e, !t)
            },
            x = (e, t, o, r) => {
                if (null == e) n((t.el = s(t.children)), o, r)
                else {
                    const n = (t.el = e.el)
                    t.children !== e.children && u(n, t.children)
                }
            },
            S = (e, t, o, r) => {
                null == e ? n((t.el = a(t.children || '')), o, r) : (t.el = e.el)
            },
            k = (e, t, n, o) => {
                const r = b(e.children, t, n, o, e.staticCache)
                e.el || (e.staticCache = r), (e.el = r[0]), (e.anchor = r[r.length - 1])
            },
            C = ({ el: e, anchor: t }, o, r) => {
                let i
                for (; e && e !== t; ) (i = h(e)), n(e, o, r), (e = i)
                n(t, o, r)
            },
            O = ({ el: e, anchor: t }) => {
                let n
                for (; e && e !== t; ) (n = h(e)), o(e), (e = n)
                o(t)
            },
            E = (e, t, n, o, r, i, l, s, a) => {
                ;(l = l || 'svg' === t.type), null == e ? A(t, n, o, r, i, l, s, a) : j(e, t, r, i, l, s, a)
            },
            A = (e, t, o, i, s, a, u, d) => {
                let f, p
                const { type: v, props: h, shapeFlag: m, transition: b, patchFlag: y, dirs: w } = e
                if (e.el && void 0 !== g && -1 === y) f = e.el = g(e.el)
                else {
                    if (
                        ((f = e.el = l(e.type, a, h && h.is, h)),
                        8 & m
                            ? c(f, e.children)
                            : 16 & m &&
                              F(e.children, f, null, i, s, a && 'foreignObject' !== v, u, d || !!e.dynamicChildren),
                        w && oo(e, null, i, 'created'),
                        h)
                    ) {
                        for (const t in h) B(t) || r(f, t, null, h[t], a, e.children, i, s, ne)
                        ;(p = h.onVnodeBeforeMount) && fo(p, i, e)
                    }
                    L(f, e, e.scopeId, u, i)
                }
                w && oo(e, null, i, 'beforeMount')
                const x = (!s || (s && !s.pendingBranch)) && b && !b.persisted
                x && b.beforeEnter(f),
                    n(f, t, o),
                    ((p = h && h.onVnodeMounted) || x || w) &&
                        ao(() => {
                            p && fo(p, i, e), x && b.enter(f), w && oo(e, null, i, 'mounted')
                        }, s)
            },
            L = (e, t, n, o, r) => {
                if ((n && m(e, n), o)) for (let i = 0; i < o.length; i++) m(e, o[i])
                if (r) {
                    if (t === r.subTree) {
                        const t = r.vnode
                        L(e, t, t.scopeId, t.slotScopeIds, r.parent)
                    }
                }
            },
            F = (e, t, n, o, r, i, l, s, a = 0) => {
                for (let u = a; u < e.length; u++) {
                    const a = (e[u] = s ? zo(e[u]) : Ho(e[u]))
                    w(null, a, t, n, o, r, i, l, s)
                }
            },
            j = (e, t, n, o, l, s, a) => {
                const u = (t.el = e.el)
                let { patchFlag: d, dynamicChildren: p, dirs: v } = t
                d |= 16 & e.patchFlag
                const h = e.props || f,
                    m = t.props || f
                let g
                if (((g = m.onVnodeBeforeUpdate) && fo(g, n, t, e), v && oo(t, e, n, 'beforeUpdate'), d > 0)) {
                    if (16 & d) R(u, t, h, m, n, o, l)
                    else if (
                        (2 & d && h.class !== m.class && r(u, 'class', null, m.class, l),
                        4 & d && r(u, 'style', h.style, m.style, l),
                        8 & d)
                    ) {
                        const s = t.dynamicProps
                        for (let t = 0; t < s.length; t++) {
                            const a = s[t],
                                c = h[a],
                                d = m[a]
                            ;(d !== c || (i && i(u, a))) && r(u, a, c, d, l, e.children, n, o, ne)
                        }
                    }
                    1 & d && e.children !== t.children && c(u, t.children)
                } else a || null != p || R(u, t, h, m, n, o, l)
                const b = l && 'foreignObject' !== t.type
                p ? M(e.dynamicChildren, p, u, n, o, b, s) : a || z(e, t, u, null, n, o, b, s, !1),
                    ((g = m.onVnodeUpdated) || v) &&
                        ao(() => {
                            g && fo(g, n, t, e), v && oo(t, e, n, 'updated')
                        }, o)
            },
            M = (e, t, n, o, r, i, l) => {
                for (let s = 0; s < t.length; s++) {
                    const a = e[s],
                        u = t[s],
                        c = a.el && (a.type === ko || !Po(a, u) || 6 & a.shapeFlag || 64 & a.shapeFlag) ? d(a.el) : n
                    w(a, u, c, null, o, r, i, l, !0)
                }
            },
            R = (e, t, n, o, l, s, a) => {
                if (n !== o) {
                    for (const u in o) {
                        if (B(u)) continue
                        const c = o[u],
                            d = n[u]
                        ;(c !== d || (i && i(e, u))) && r(e, u, d, c, a, t.children, l, s, ne)
                    }
                    if (n !== f) for (const i in n) B(i) || i in o || r(e, i, n[i], null, a, t.children, l, s, ne)
                }
            },
            P = (e, t, o, r, i, l, a, u, c) => {
                const d = (t.el = e ? e.el : s('')),
                    f = (t.anchor = e ? e.anchor : s(''))
                let { patchFlag: p, dynamicChildren: v, slotScopeIds: h } = t
                v && (c = !0),
                    h && (u = u ? u.concat(h) : h),
                    null == e
                        ? (n(d, o, r), n(f, o, r), F(t.children, o, f, i, l, a, u, c))
                        : p > 0 && 64 & p && v && e.dynamicChildren
                        ? (M(e.dynamicChildren, v, o, i, l, a, u),
                          (null != t.key || (i && t === i.subTree)) && po(e, t, !0))
                        : z(e, t, o, f, i, l, a, u, c)
            },
            $ = (e, t, n, o, r, i, l, s, a) => {
                ;(t.slotScopeIds = s),
                    null == e
                        ? 512 & t.shapeFlag
                            ? r.ctx.activate(t, n, o, l, a)
                            : D(t, n, o, r, i, l, a)
                        : V(e, t, a)
            },
            D = (e, t, n, o, r, i, l) => {
                const s = (e.component = (function (e, t, n) {
                    const o = e.type,
                        r = (t ? t.appContext : e.appContext) || Zo,
                        i = {
                            uid: er++,
                            vnode: e,
                            type: o,
                            parent: t,
                            appContext: r,
                            root: null,
                            next: null,
                            subTree: null,
                            update: null,
                            render: null,
                            proxy: null,
                            exposed: null,
                            exposeProxy: null,
                            withProxy: null,
                            effects: null,
                            provides: t ? t.provides : Object.create(r.provides),
                            accessCache: null,
                            renderCache: [],
                            components: null,
                            directives: null,
                            propsOptions: Wn(o, r),
                            emitsOptions: Bt(o, r),
                            emit: null,
                            emitted: null,
                            propsDefaults: f,
                            inheritAttrs: o.inheritAttrs,
                            ctx: f,
                            data: f,
                            props: f,
                            attrs: f,
                            slots: f,
                            refs: f,
                            setupState: f,
                            setupContext: null,
                            suspense: n,
                            suspenseId: n ? n.pendingId : 0,
                            asyncDep: null,
                            asyncResolved: !1,
                            isMounted: !1,
                            isUnmounted: !1,
                            isDeactivated: !1,
                            bc: null,
                            c: null,
                            bm: null,
                            m: null,
                            bu: null,
                            u: null,
                            um: null,
                            bum: null,
                            da: null,
                            a: null,
                            rtg: null,
                            rtc: null,
                            ec: null,
                            sp: null,
                        }
                    return (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = Pt.bind(null, i)), i
                })(e, o, r))
                if (
                    (hn(e) && (s.ctx.renderer = se),
                    (function (e, t = !1) {
                        ir = t
                        const { props: n, children: o } = e.vnode,
                            r = rr(e)
                        Hn(e, n, r, t),
                            ((e, t) => {
                                if (32 & e.vnode.shapeFlag) {
                                    const n = t._
                                    n ? ((e.slots = tt(t)), W(t, '_', n)) : eo(t, (e.slots = {}))
                                } else (e.slots = {}), t && to(e, t)
                                W(e.slots, Bo, 1)
                            })(e, o)
                        const i = r
                            ? (function (e, t) {
                                  const n = e.type
                                  ;(e.accessCache = Object.create(null)), (e.proxy = nt(new Proxy(e.ctx, Qo)))
                                  const { setup: o } = n
                                  if (o) {
                                      const n = (e.setupContext =
                                          o.length > 1
                                              ? (function (e) {
                                                    const t = (t) => {
                                                        e.exposed = t || {}
                                                    }
                                                    return { attrs: e.attrs, slots: e.slots, emit: e.emit, expose: t }
                                                })(e)
                                              : null)
                                      ;(tr = e), ie()
                                      const r = dt(o, e, 0, [e.props, n])
                                      if ((le(), (tr = null), T(r))) {
                                          const n = () => {
                                              tr = null
                                          }
                                          if ((r.then(n, n), t))
                                              return r
                                                  .then((t) => {
                                                      lr(e, t)
                                                  })
                                                  .catch((t) => {
                                                      pt(t, e, 0)
                                                  })
                                          e.asyncDep = r
                                      } else lr(e, r)
                                  } else sr(e)
                              })(e, t)
                            : void 0
                        ir = !1
                    })(s),
                    s.asyncDep)
                ) {
                    if ((r && r.registerDep(s, U), !e.el)) {
                        const e = (s.subTree = Io(Oo))
                        S(null, e, t, n)
                    }
                } else U(s, e, t, n, r, i, l)
            },
            V = (e, t, n) => {
                const o = (t.component = e.component)
                if (
                    (function (e, t, n) {
                        const { props: o, children: r, component: i } = e,
                            { props: l, children: s, patchFlag: a } = t,
                            u = i.emitsOptions
                        if (t.dirs || t.transition) return !0
                        if (!(n && a >= 0))
                            return !((!r && !s) || (s && s.$stable)) || (o !== l && (o ? !l || Gt(o, l, u) : !!l))
                        if (1024 & a) return !0
                        if (16 & a) return o ? Gt(o, l, u) : !!l
                        if (8 & a) {
                            const e = t.dynamicProps
                            for (let t = 0; t < e.length; t++) {
                                const n = e[t]
                                if (l[n] !== o[n] && !$t(u, n)) return !0
                            }
                        }
                        return !1
                    })(e, t, n)
                ) {
                    if (o.asyncDep && !o.asyncResolved) return void H(o, t, n)
                    ;(o.next = t),
                        (function (e) {
                            const t = mt.indexOf(e)
                            t > gt && mt.splice(t, 1)
                        })(o.update),
                        o.update()
                } else (t.component = e.component), (t.el = e.el), (o.vnode = t)
            },
            U = (e, t, n, o, r, i, l) => {
                e.update = Z(function () {
                    if (e.isMounted) {
                        let t,
                            { next: n, bu: o, u: s, parent: a, vnode: u } = e,
                            c = n
                        n ? ((n.el = u.el), H(e, n, l)) : (n = u),
                            o && K(o),
                            (t = n.props && n.props.onVnodeBeforeUpdate) && fo(t, a, n, u)
                        const f = Kt(e),
                            p = e.subTree
                        ;(e.subTree = f),
                            w(p, f, d(p.el), oe(p), e, r, i),
                            (n.el = f.el),
                            null === c &&
                                (function ({ vnode: e, parent: t }, n) {
                                    for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
                                })(e, f.el),
                            s && ao(s, r),
                            (t = n.props && n.props.onVnodeUpdated) && ao(() => fo(t, a, n, u), r)
                    } else {
                        let l
                        const { el: s, props: a } = t,
                            { bm: u, m: c, parent: d } = e
                        if ((u && K(u), (l = a && a.onVnodeBeforeMount) && fo(l, d, t), s && ce)) {
                            const n = () => {
                                ;(e.subTree = Kt(e)), ce(s, e.subTree, e, r, null)
                            }
                            vn(t) ? t.type.__asyncLoader().then(() => !e.isUnmounted && n()) : n()
                        } else {
                            const l = (e.subTree = Kt(e))
                            w(null, l, n, o, e, r, i), (t.el = l.el)
                        }
                        if ((c && ao(c, r), (l = a && a.onVnodeMounted))) {
                            const e = t
                            ao(() => fo(l, d, e), r)
                        }
                        256 & t.shapeFlag && e.a && ao(e.a, r), (e.isMounted = !0), (t = n = o = null)
                    }
                }, so)
            },
            H = (e, t, n) => {
                t.component = e
                const o = e.vnode.props
                ;(e.vnode = t),
                    (e.next = null),
                    (function (e, t, n, o) {
                        const {
                                props: r,
                                attrs: i,
                                vnode: { patchFlag: l },
                            } = e,
                            s = tt(r),
                            [a] = e.propsOptions
                        let u = !1
                        if (!(o || l > 0) || 16 & l) {
                            let o
                            zn(e, t, r, i) && (u = !0)
                            for (const i in s)
                                (t && (_(t, i) || ((o = N(i)) !== i && _(t, o)))) ||
                                    (a
                                        ? !n ||
                                          (void 0 === n[i] && void 0 === n[o]) ||
                                          (r[i] = Kn(a, s, i, void 0, e, !0))
                                        : delete r[i])
                            if (i !== s) for (const e in i) (t && _(t, e)) || (delete i[e], (u = !0))
                        } else if (8 & l) {
                            const n = e.vnode.dynamicProps
                            for (let o = 0; o < n.length; o++) {
                                let l = n[o]
                                const c = t[l]
                                if (a)
                                    if (_(i, l)) c !== i[l] && ((i[l] = c), (u = !0))
                                    else {
                                        const t = I(l)
                                        r[t] = Kn(a, s, t, c, e, !1)
                                    }
                                else c !== i[l] && ((i[l] = c), (u = !0))
                            }
                        }
                        u && ae(e, 'set', '$attrs')
                    })(e, t.props, o, n),
                    ((e, t, n) => {
                        const { vnode: o, slots: r } = e
                        let i = !0,
                            l = f
                        if (32 & o.shapeFlag) {
                            const e = t._
                            e
                                ? n && 1 === e
                                    ? (i = !1)
                                    : (y(r, t), n || 1 !== e || delete r._)
                                : ((i = !t.$stable), eo(t, r)),
                                (l = t)
                        } else t && (to(e, t), (l = { default: 1 }))
                        if (i) for (const s in r) Qn(s) || s in l || delete r[s]
                    })(e, t.children, n),
                    ie(),
                    Tt(void 0, e.update),
                    le()
            },
            z = (e, t, n, o, r, i, l, s, a = !1) => {
                const u = e && e.children,
                    d = e ? e.shapeFlag : 0,
                    f = t.children,
                    { patchFlag: p, shapeFlag: v } = t
                if (p > 0) {
                    if (128 & p) return void G(u, f, n, o, r, i, l, s, a)
                    if (256 & p) return void q(u, f, n, o, r, i, l, s, a)
                }
                8 & v
                    ? (16 & d && ne(u, r, i), f !== u && c(n, f))
                    : 16 & d
                    ? 16 & v
                        ? G(u, f, n, o, r, i, l, s, a)
                        : ne(u, r, i, !0)
                    : (8 & d && c(n, ''), 16 & v && F(f, n, o, r, i, l, s, a))
            },
            q = (e, t, n, o, r, i, l, s, a) => {
                t = t || p
                const u = (e = e || p).length,
                    c = t.length,
                    d = Math.min(u, c)
                let f
                for (f = 0; f < d; f++) {
                    const o = (t[f] = a ? zo(t[f]) : Ho(t[f]))
                    w(e[f], o, n, null, r, i, l, s, a)
                }
                u > c ? ne(e, r, i, !0, !1, d) : F(t, n, o, r, i, l, s, a, d)
            },
            G = (e, t, n, o, r, i, l, s, a) => {
                let u = 0
                const c = t.length
                let d = e.length - 1,
                    f = c - 1
                for (; u <= d && u <= f; ) {
                    const o = e[u],
                        c = (t[u] = a ? zo(t[u]) : Ho(t[u]))
                    if (!Po(o, c)) break
                    w(o, c, n, null, r, i, l, s, a), u++
                }
                for (; u <= d && u <= f; ) {
                    const o = e[d],
                        u = (t[f] = a ? zo(t[f]) : Ho(t[f]))
                    if (!Po(o, u)) break
                    w(o, u, n, null, r, i, l, s, a), d--, f--
                }
                if (u > d) {
                    if (u <= f) {
                        const e = f + 1,
                            d = e < c ? t[e].el : o
                        for (; u <= f; ) w(null, (t[u] = a ? zo(t[u]) : Ho(t[u])), n, d, r, i, l, s, a), u++
                    }
                } else if (u > f) for (; u <= d; ) J(e[u], r, i, !0), u++
                else {
                    const v = u,
                        h = u,
                        m = new Map()
                    for (u = h; u <= f; u++) {
                        const e = (t[u] = a ? zo(t[u]) : Ho(t[u]))
                        null != e.key && m.set(e.key, u)
                    }
                    let g,
                        b = 0
                    const y = f - h + 1
                    let x = !1,
                        _ = 0
                    const S = new Array(y)
                    for (u = 0; u < y; u++) S[u] = 0
                    for (u = v; u <= d; u++) {
                        const o = e[u]
                        if (b >= y) {
                            J(o, r, i, !0)
                            continue
                        }
                        let c
                        if (null != o.key) c = m.get(o.key)
                        else
                            for (g = h; g <= f; g++)
                                if (0 === S[g - h] && Po(o, t[g])) {
                                    c = g
                                    break
                                }
                        void 0 === c
                            ? J(o, r, i, !0)
                            : ((S[c - h] = u + 1), c >= _ ? (_ = c) : (x = !0), w(o, t[c], n, null, r, i, l, s, a), b++)
                    }
                    const k = x
                        ? (function (e) {
                              const t = e.slice(),
                                  n = [0]
                              let o, r, i, l, s
                              const a = e.length
                              for (o = 0; o < a; o++) {
                                  const a = e[o]
                                  if (0 !== a) {
                                      if (((r = n[n.length - 1]), e[r] < a)) {
                                          ;(t[o] = r), n.push(o)
                                          continue
                                      }
                                      for (i = 0, l = n.length - 1; i < l; )
                                          (s = ((i + l) / 2) | 0), e[n[s]] < a ? (i = s + 1) : (l = s)
                                      a < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), (n[i] = o))
                                  }
                              }
                              ;(i = n.length), (l = n[i - 1])
                              for (; i-- > 0; ) (n[i] = l), (l = t[l])
                              return n
                          })(S)
                        : p
                    for (g = k.length - 1, u = y - 1; u >= 0; u--) {
                        const e = h + u,
                            d = t[e],
                            f = e + 1 < c ? t[e + 1].el : o
                        0 === S[u] ? w(null, d, n, f, r, i, l, s, a) : x && (g < 0 || u !== k[g] ? Y(d, n, f, 2) : g--)
                    }
                }
            },
            Y = (e, t, o, r, i = null) => {
                const { el: l, type: s, transition: a, children: u, shapeFlag: c } = e
                if (6 & c) return void Y(e.component.subTree, t, o, r)
                if (128 & c) return void e.suspense.move(t, o, r)
                if (64 & c) return void s.move(e, t, o, se)
                if (s === ko) {
                    n(l, t, o)
                    for (let e = 0; e < u.length; e++) Y(u[e], t, o, r)
                    return void n(e.anchor, t, o)
                }
                if (s === Eo) return void C(e, t, o)
                if (2 !== r && 1 & c && a)
                    if (0 === r) a.beforeEnter(l), n(l, t, o), ao(() => a.enter(l), i)
                    else {
                        const { leave: e, delayLeave: r, afterLeave: i } = a,
                            s = () => n(l, t, o),
                            u = () => {
                                e(l, () => {
                                    s(), i && i()
                                })
                            }
                        r ? r(l, s, u) : u()
                    }
                else n(l, t, o)
            },
            J = (e, t, n, o = !1, r = !1) => {
                const {
                    type: i,
                    props: l,
                    ref: s,
                    children: a,
                    dynamicChildren: u,
                    shapeFlag: c,
                    patchFlag: d,
                    dirs: f,
                } = e
                if ((null != s && uo(s, null, n, e, !0), 256 & c)) return void t.ctx.deactivate(e)
                const p = 1 & c && f
                let v
                if (((v = l && l.onVnodeBeforeUnmount) && fo(v, t, e), 6 & c)) te(e.component, n, o)
                else {
                    if (128 & c) return void e.suspense.unmount(n, o)
                    p && oo(e, null, t, 'beforeUnmount'),
                        64 & c
                            ? e.type.remove(e, t, n, r, se, o)
                            : u && (i !== ko || (d > 0 && 64 & d))
                            ? ne(u, t, n, !1, !0)
                            : ((i === ko && (128 & d || 256 & d)) || (!r && 16 & c)) && ne(a, t, n),
                        o && Q(e)
                }
                ;((v = l && l.onVnodeUnmounted) || p) &&
                    ao(() => {
                        v && fo(v, t, e), p && oo(e, null, t, 'unmounted')
                    }, n)
            },
            Q = (e) => {
                const { type: t, el: n, anchor: r, transition: i } = e
                if (t === ko) return void X(n, r)
                if (t === Eo) return void O(e)
                const l = () => {
                    o(n), i && !i.persisted && i.afterLeave && i.afterLeave()
                }
                if (1 & e.shapeFlag && i && !i.persisted) {
                    const { leave: t, delayLeave: o } = i,
                        r = () => t(n, l)
                    o ? o(e.el, l, r) : r()
                } else l()
            },
            X = (e, t) => {
                let n
                for (; e !== t; ) (n = h(e)), o(e), (e = n)
                o(t)
            },
            te = (e, t, n) => {
                const { bum: o, effects: r, update: i, subTree: l, um: s } = e
                if ((o && K(o), r)) for (let a = 0; a < r.length; a++) ee(r[a])
                i && (ee(i), J(l, e, t, n)),
                    s && ao(s, t),
                    ao(() => {
                        e.isUnmounted = !0
                    }, t),
                    t &&
                        t.pendingBranch &&
                        !t.isUnmounted &&
                        e.asyncDep &&
                        !e.asyncResolved &&
                        e.suspenseId === t.pendingId &&
                        (t.deps--, 0 === t.deps && t.resolve())
            },
            ne = (e, t, n, o = !1, r = !1, i = 0) => {
                for (let l = i; l < e.length; l++) J(e[l], t, n, o, r)
            },
            oe = (e) =>
                6 & e.shapeFlag ? oe(e.component.subTree) : 128 & e.shapeFlag ? e.suspense.next() : h(e.anchor || e.el),
            re = (e, t, n) => {
                null == e ? t._vnode && J(t._vnode, null, null, !0) : w(t._vnode || null, e, t, null, null, null, n),
                    jt(),
                    (t._vnode = e)
            },
            se = { p: w, um: J, m: Y, r: Q, mt: D, mc: F, pc: z, pbc: M, n: oe, o: e }
        let ue, ce
        t && ([ue, ce] = t(se))
        return { render: re, hydrate: ue, createApp: lo(re, ue) }
    })(e)
}
function fo(e, t, n, o = null) {
    ft(e, t, 7, [n, o])
}
function po(e, t, n = !1) {
    const o = e.children,
        r = t.children
    if (S(o) && S(r))
        for (let i = 0; i < o.length; i++) {
            const e = o[i]
            let t = r[i]
            1 & t.shapeFlag &&
                !t.dynamicChildren &&
                ((t.patchFlag <= 0 || 32 === t.patchFlag) && ((t = r[i] = zo(r[i])), (t.el = e.el)), n || po(e, t))
        }
}
const vo = (e) => e && (e.disabled || '' === e.disabled),
    ho = (e) => 'undefined' != typeof SVGElement && e instanceof SVGElement,
    mo = (e, t) => {
        const n = e && e.to
        if (A(n)) {
            if (t) {
                return t(n)
            }
            return null
        }
        return n
    }
function go(e, t, n, { o: { insert: o }, m: r }, i = 2) {
    0 === i && o(e.targetAnchor, t, n)
    const { el: l, anchor: s, shapeFlag: a, children: u, props: c } = e,
        d = 2 === i
    if ((d && o(l, t, n), (!d || vo(c)) && 16 & a)) for (let f = 0; f < u.length; f++) r(u[f], t, n, 2)
    d && o(s, t, n)
}
const bo = {
    __isTeleport: !0,
    process(e, t, n, o, r, i, l, s, a, u) {
        const {
                mc: c,
                pc: d,
                pbc: f,
                o: { insert: p, querySelector: v, createText: h, createComment: m },
            } = u,
            g = vo(t.props)
        let { shapeFlag: b, children: y, dynamicChildren: w } = t
        if (null == e) {
            const e = (t.el = h('')),
                u = (t.anchor = h(''))
            p(e, n, o), p(u, n, o)
            const d = (t.target = mo(t.props, v)),
                f = (t.targetAnchor = h(''))
            d && (p(f, d), (l = l || ho(d)))
            const m = (e, t) => {
                16 & b && c(y, e, t, r, i, l, s, a)
            }
            g ? m(n, u) : d && m(d, f)
        } else {
            t.el = e.el
            const o = (t.anchor = e.anchor),
                c = (t.target = e.target),
                p = (t.targetAnchor = e.targetAnchor),
                h = vo(e.props),
                m = h ? n : c,
                b = h ? o : p
            if (
                ((l = l || ho(c)),
                w ? (f(e.dynamicChildren, w, m, r, i, l, s), po(e, t, !0)) : a || d(e, t, m, b, r, i, l, s, !1),
                g)
            )
                h || go(t, n, o, u, 1)
            else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
                const e = (t.target = mo(t.props, v))
                e && go(t, e, null, u, 0)
            } else h && go(t, c, p, u, 1)
        }
    },
    remove(e, t, n, o, { um: r, o: { remove: i } }, l) {
        const { shapeFlag: s, children: a, anchor: u, targetAnchor: c, target: d, props: f } = e
        if ((d && i(c), (l || !vo(f)) && (i(u), 16 & s)))
            for (let p = 0; p < a.length; p++) {
                const e = a[p]
                r(e, t, n, !0, !!e.dynamicChildren)
            }
    },
    move: go,
    hydrate: function (e, t, n, o, r, i, { o: { nextSibling: l, parentNode: s, querySelector: a } }, u) {
        const c = (t.target = mo(t.props, a))
        if (c) {
            const a = c._lpa || c.firstChild
            16 & t.shapeFlag &&
                (vo(t.props)
                    ? ((t.anchor = u(l(e), t, s(e), n, o, r, i)), (t.targetAnchor = a))
                    : ((t.anchor = l(e)), (t.targetAnchor = u(a, t, c, n, o, r, i))),
                (c._lpa = t.targetAnchor && l(t.targetAnchor)))
        }
        return t.anchor && l(t.anchor)
    },
}
function yo(e, t) {
    return _o('components', e, !0, t) || e
}
const wo = Symbol()
function xo(e) {
    return A(e) ? _o('components', e, !1) || e : e || wo
}
function _o(e, t, n = !0, o = !1) {
    const r = Dt || tr
    if (r) {
        const n = r.type
        if ('components' === e) {
            const e = cr(n)
            if (e && (e === t || e === I(t) || e === U(I(t)))) return n
        }
        const i = So(r[e] || n[e], t) || So(r.appContext[e], t)
        return !i && o ? n : i
    }
}
function So(e, t) {
    return e && (e[t] || e[I(t)] || e[U(I(t))])
}
const ko = Symbol(void 0),
    Co = Symbol(void 0),
    Oo = Symbol(void 0),
    Eo = Symbol(void 0),
    Ao = []
let Lo = null
function Fo(e = !1) {
    Ao.push((Lo = e ? null : []))
}
let To = 1
function jo(e) {
    To += e
}
function Mo(e, t, n, o, r) {
    const i = Io(e, t, n, o, r, !0)
    return (
        (i.dynamicChildren = To > 0 ? Lo || p : null),
        Ao.pop(),
        (Lo = Ao[Ao.length - 1] || null),
        To > 0 && Lo && Lo.push(i),
        i
    )
}
function Ro(e) {
    return !!e && !0 === e.__v_isVNode
}
function Po(e, t) {
    return e.type === t.type && e.key === t.key
}
const Bo = '__vInternal',
    $o = ({ key: e }) => (null != e ? e : null),
    Do = ({ ref: e }) => (null != e ? (A(e) || rt(e) || E(e) ? { i: Dt, r: e } : e) : null),
    Io = function (e, t = null, n = null, r = 0, i = null, l = !1) {
        ;(e && e !== wo) || (e = Oo)
        if (Ro(e)) {
            const o = Vo(e, t, !0)
            return n && Ko(o, n), o
        }
        ;(a = e), E(a) && '__vccOpts' in a && (e = e.__vccOpts)
        var a
        if (t) {
            ;(et(t) || Bo in t) && (t = y({}, t))
            let { class: e, style: n } = t
            e && !A(e) && (t.class = s(e)), F(n) && (et(n) && !S(n) && (n = y({}, n)), (t.style = o(n)))
        }
        const u = A(e)
                ? 1
                : ((e) => e.__isSuspense)(e)
                ? 128
                : ((e) => e.__isTeleport)(e)
                ? 64
                : F(e)
                ? 4
                : E(e)
                ? 2
                : 0,
            c = {
                __v_isVNode: !0,
                __v_skip: !0,
                type: e,
                props: t,
                key: t && $o(t),
                ref: t && Do(t),
                scopeId: It,
                slotScopeIds: null,
                children: null,
                component: null,
                suspense: null,
                ssContent: null,
                ssFallback: null,
                dirs: null,
                transition: null,
                el: null,
                anchor: null,
                target: null,
                targetAnchor: null,
                shapeFlag: u,
                patchFlag: r,
                dynamicProps: i,
                dynamicChildren: null,
                appContext: null,
            }
        Ko(c, n), 128 & u && e.normalize(c)
        To > 0 && !l && Lo && (r > 0 || 6 & u) && 32 !== r && Lo.push(c)
        return c
    }
function Vo(e, t, n = !1) {
    const { props: r, ref: i, patchFlag: l, children: a } = e,
        u = t
            ? (function (...e) {
                  const t = y({}, e[0])
                  for (let n = 1; n < e.length; n++) {
                      const r = e[n]
                      for (const e in r)
                          if ('class' === e) t.class !== r.class && (t.class = s([t.class, r.class]))
                          else if ('style' === e) t.style = o([t.style, r.style])
                          else if (g(e)) {
                              const n = t[e],
                                  o = r[e]
                              n !== o && (t[e] = n ? [].concat(n, o) : o)
                          } else '' !== e && (t[e] = r[e])
                  }
                  return t
              })(r || {}, t)
            : r
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: u,
        key: u && $o(u),
        ref: t && t.ref ? (n && i ? (S(i) ? i.concat(Do(t)) : [i, Do(t)]) : Do(t)) : i,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: a,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        staticCache: e.staticCache,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== ko ? (-1 === l ? 16 : 16 | l) : l,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Vo(e.ssContent),
        ssFallback: e.ssFallback && Vo(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
    }
}
function No(e = ' ', t = 0) {
    return Io(Co, null, e, t)
}
function Uo(e = '', t = !1) {
    return t ? (Fo(), Mo(Oo, null, e)) : Io(Oo, null, e)
}
function Ho(e) {
    return null == e || 'boolean' == typeof e
        ? Io(Oo)
        : S(e)
        ? Io(ko, null, e.slice())
        : 'object' == typeof e
        ? zo(e)
        : Io(Co, null, String(e))
}
function zo(e) {
    return null === e.el ? e : Vo(e)
}
function Ko(e, t) {
    let n = 0
    const { shapeFlag: o } = e
    if (null == t) t = null
    else if (S(t)) n = 16
    else if ('object' == typeof t) {
        if (1 & o || 64 & o) {
            const n = t.default
            return void (n && (n._c && (n._d = !1), Ko(e, n()), n._c && (n._d = !0)))
        }
        {
            n = 32
            const o = t._
            o || Bo in t
                ? 3 === o && Dt && (1 === Dt.slots._ ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
                : (t._ctx = Dt)
        }
    } else
        E(t)
            ? ((t = { default: t, _ctx: Dt }), (n = 32))
            : ((t = String(t)), 64 & o ? ((n = 16), (t = [No(t)])) : (n = 8))
    ;(e.children = t), (e.shapeFlag |= n)
}
function Wo(e, t) {
    let n
    if (S(e) || A(e)) {
        n = new Array(e.length)
        for (let o = 0, r = e.length; o < r; o++) n[o] = t(e[o], o)
    } else if ('number' == typeof e) {
        n = new Array(e)
        for (let o = 0; o < e; o++) n[o] = t(o + 1, o)
    } else if (F(e))
        if (e[Symbol.iterator]) n = Array.from(e, t)
        else {
            const o = Object.keys(e)
            n = new Array(o.length)
            for (let r = 0, i = o.length; r < i; r++) {
                const i = o[r]
                n[r] = t(e[i], i, r)
            }
        }
    else n = []
    return n
}
function qo(e, t, n = {}, o, r) {
    let i = e[t]
    i && i._c && (i._d = !1), Fo()
    const l = i && Go(i(n)),
        s = Mo(ko, { key: n.key || `_${t}` }, l || (o ? o() : []), l && 1 === e._ ? 64 : -2)
    return !r && s.scopeId && (s.slotScopeIds = [s.scopeId + '-s']), i && i._c && (i._d = !0), s
}
function Go(e) {
    return e.some((e) => !Ro(e) || (e.type !== Oo && !(e.type === ko && !Go(e.children)))) ? e : null
}
const Yo = (e) => (e ? (rr(e) ? ar(e) || e.proxy : Yo(e.parent)) : null),
    Jo = y(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Yo(e.parent),
        $root: (e) => Yo(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Bn(e),
        $forceUpdate: (e) => () => At(e.update),
        $nextTick: (e) => Et.bind(e.proxy),
        $watch: (e) => tn.bind(e),
    }),
    Qo = {
        get({ _: e }, t) {
            const { ctx: n, setupState: o, data: r, props: i, accessCache: l, type: s, appContext: a } = e
            let u
            if ('$' !== t[0]) {
                const s = l[t]
                if (void 0 !== s)
                    switch (s) {
                        case 0:
                            return o[t]
                        case 1:
                            return r[t]
                        case 3:
                            return n[t]
                        case 2:
                            return i[t]
                    }
                else {
                    if (o !== f && _(o, t)) return (l[t] = 0), o[t]
                    if (r !== f && _(r, t)) return (l[t] = 1), r[t]
                    if ((u = e.propsOptions[0]) && _(u, t)) return (l[t] = 2), i[t]
                    if (n !== f && _(n, t)) return (l[t] = 3), n[t]
                    jn && (l[t] = 4)
                }
            }
            const c = Jo[t]
            let d, p
            return c
                ? ('$attrs' === t && se(e, 0, t), c(e))
                : (d = s.__cssModules) && (d = d[t])
                ? d
                : n !== f && _(n, t)
                ? ((l[t] = 3), n[t])
                : ((p = a.config.globalProperties), _(p, t) ? p[t] : void 0)
        },
        set({ _: e }, t, n) {
            const { data: o, setupState: r, ctx: i } = e
            if (r !== f && _(r, t)) r[t] = n
            else if (o !== f && _(o, t)) o[t] = n
            else if (_(e.props, t)) return !1
            return ('$' !== t[0] || !(t.slice(1) in e)) && ((i[t] = n), !0)
        },
        has({ _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: r, propsOptions: i } }, l) {
            let s
            return (
                void 0 !== n[l] ||
                (e !== f && _(e, l)) ||
                (t !== f && _(t, l)) ||
                ((s = i[0]) && _(s, l)) ||
                _(o, l) ||
                _(Jo, l) ||
                _(r.config.globalProperties, l)
            )
        },
    },
    Xo = y({}, Qo, {
        get(e, t) {
            if (t !== Symbol.unscopables) return Qo.get(e, t, e)
        },
        has: (e, n) => '_' !== n[0] && !t(n),
    }),
    Zo = ro()
let er = 0
let tr = null
const nr = () => tr || Dt,
    or = (e) => {
        tr = e
    }
function rr(e) {
    return 4 & e.vnode.shapeFlag
}
let ir = !1
function lr(e, t, n) {
    E(t) ? (e.render = t) : F(t) && (e.setupState = ut(t)), sr(e)
}
function sr(e, t, n) {
    const o = e.type
    e.render || ((e.render = o.render || v), e.render._rc && (e.withProxy = new Proxy(e.ctx, Xo))),
        (tr = e),
        ie(),
        Mn(e),
        le(),
        (tr = null)
}
function ar(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(ut(nt(e.exposed)), {
                get: (t, n) => (n in t ? t[n] : n in Jo ? Jo[n](e) : void 0),
            }))
        )
}
function ur(e, t = tr) {
    t && (t.effects || (t.effects = [])).push(e)
}
function cr(e) {
    return (E(e) && e.displayName) || e.name
}
function dr(e) {
    const t = (function (e) {
        let t, n
        return E(e) ? ((t = e), (n = v)) : ((t = e.get), (n = e.set)), new ct(t, n, E(e) || !e.set)
    })(e)
    return ur(t.effect), t
}
function fr(e, t, n) {
    const o = arguments.length
    return 2 === o
        ? F(t) && !S(t)
            ? Ro(t)
                ? Io(e, null, [t])
                : Io(e, t)
            : Io(e, null, t)
        : (o > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : 3 === o && Ro(n) && (n = [n]), Io(e, t, n))
}
const pr = '3.1.4',
    vr = 'http://www.w3.org/2000/svg',
    hr = 'undefined' != typeof document ? document : null,
    mr = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null)
        },
        remove: (e) => {
            const t = e.parentNode
            t && t.removeChild(e)
        },
        createElement: (e, t, n, o) => {
            const r = t ? hr.createElementNS(vr, e) : hr.createElement(e, n ? { is: n } : void 0)
            return 'select' === e && o && null != o.multiple && r.setAttribute('multiple', o.multiple), r
        },
        createText: (e) => hr.createTextNode(e),
        createComment: (e) => hr.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t
        },
        setElementText: (e, t) => {
            e.textContent = t
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => hr.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, '')
        },
        cloneNode(e) {
            const t = e.cloneNode(!0)
            return '_value' in e && (t._value = e._value), t
        },
        insertStaticContent(e, t, n, o, r) {
            if (r) {
                let e,
                    o,
                    i = 0,
                    l = r.length
                for (; i < l; i++) {
                    const s = r[i].cloneNode(!0)
                    0 === i && (e = s), i === l - 1 && (o = s), t.insertBefore(s, n)
                }
                return [e, o]
            }
            const i = n ? n.previousSibling : t.lastChild
            if (n) {
                let r,
                    i = !1
                n instanceof Element
                    ? (r = n)
                    : ((i = !0), (r = o ? hr.createElementNS(vr, 'g') : hr.createElement('div')), t.insertBefore(r, n)),
                    r.insertAdjacentHTML('beforebegin', e),
                    i && t.removeChild(r)
            } else t.insertAdjacentHTML('beforeend', e)
            let l = i ? i.nextSibling : t.firstChild
            const s = n ? n.previousSibling : t.lastChild,
                a = []
            for (; l && (a.push(l), l !== s); ) l = l.nextSibling
            return a
        },
    }
const gr = /\s*!important$/
function br(e, t, n) {
    if (S(n)) n.forEach((n) => br(e, t, n))
    else if (t.startsWith('--')) e.setProperty(t, n)
    else {
        const o = (function (e, t) {
            const n = wr[t]
            if (n) return n
            let o = I(t)
            if ('filter' !== o && o in e) return (wr[t] = o)
            o = U(o)
            for (let r = 0; r < yr.length; r++) {
                const n = yr[r] + o
                if (n in e) return (wr[t] = n)
            }
            return t
        })(e, t)
        gr.test(n) ? e.setProperty(N(o), n.replace(gr, ''), 'important') : (e[o] = n)
    }
}
const yr = ['Webkit', 'Moz', 'ms'],
    wr = {}
const xr = 'http://www.w3.org/1999/xlink'
let _r = Date.now,
    Sr = !1
if ('undefined' != typeof window) {
    _r() > document.createEvent('Event').timeStamp && (_r = () => performance.now())
    const e = navigator.userAgent.match(/firefox\/(\d+)/i)
    Sr = !!(e && Number(e[1]) <= 53)
}
let kr = 0
const Cr = Promise.resolve(),
    Or = () => {
        kr = 0
    }
function Er(e, t, n, o) {
    e.addEventListener(t, n, o)
}
function Ar(e, t, n, o, r = null) {
    const i = e._vei || (e._vei = {}),
        l = i[t]
    if (o && l) l.value = o
    else {
        const [n, s] = (function (e) {
            let t
            if (Lr.test(e)) {
                let n
                for (t = {}; (n = e.match(Lr)); ) (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0)
            }
            return [N(e.slice(2)), t]
        })(t)
        if (o) {
            Er(
                e,
                n,
                (i[t] = (function (e, t) {
                    const n = (e) => {
                        const o = e.timeStamp || _r()
                        ;(Sr || o >= n.attached - 1) &&
                            ft(
                                (function (e, t) {
                                    if (S(t)) {
                                        const n = e.stopImmediatePropagation
                                        return (
                                            (e.stopImmediatePropagation = () => {
                                                n.call(e), (e._stopped = !0)
                                            }),
                                            t.map((e) => (t) => !t._stopped && e(t))
                                        )
                                    }
                                    return t
                                })(e, n.value),
                                t,
                                5,
                                [e]
                            )
                    }
                    return (n.value = e), (n.attached = (() => kr || (Cr.then(Or), (kr = _r())))()), n
                })(o, r)),
                s
            )
        } else
            l &&
                (!(function (e, t, n, o) {
                    e.removeEventListener(t, n, o)
                })(e, n, l, s),
                (i[t] = void 0))
    }
}
const Lr = /(?:Once|Passive|Capture)$/
const Fr = /^on[a-z]/
const Tr = 'transition',
    jr = (e, { slots: t }) =>
        fr(
            ln,
            (function (e) {
                const t = {}
                for (const y in e) y in Mr || (t[y] = e[y])
                if (!1 === e.css) return t
                const {
                        name: n = 'v',
                        type: o,
                        duration: r,
                        enterFromClass: i = `${n}-enter-from`,
                        enterActiveClass: l = `${n}-enter-active`,
                        enterToClass: s = `${n}-enter-to`,
                        appearFromClass: a = i,
                        appearActiveClass: u = l,
                        appearToClass: c = s,
                        leaveFromClass: d = `${n}-leave-from`,
                        leaveActiveClass: f = `${n}-leave-active`,
                        leaveToClass: p = `${n}-leave-to`,
                    } = e,
                    v = (function (e) {
                        if (null == e) return null
                        if (F(e)) return [Br(e.enter), Br(e.leave)]
                        {
                            const t = Br(e)
                            return [t, t]
                        }
                    })(r),
                    h = v && v[0],
                    m = v && v[1],
                    {
                        onBeforeEnter: g,
                        onEnter: b,
                        onEnterCancelled: w,
                        onLeave: x,
                        onLeaveCancelled: _,
                        onBeforeAppear: S = g,
                        onAppear: k = b,
                        onAppearCancelled: C = w,
                    } = t,
                    O = (e, t, n) => {
                        Dr(e, t ? c : s), Dr(e, t ? u : l), n && n()
                    },
                    E = (e, t) => {
                        Dr(e, p), Dr(e, f), t && t()
                    },
                    A = (e) => (t, n) => {
                        const r = e ? k : b,
                            l = () => O(t, e, n)
                        Rr(r, [t, l]),
                            Ir(() => {
                                Dr(t, e ? a : i), $r(t, e ? c : s), Pr(r) || Nr(t, o, h, l)
                            })
                    }
                return y(t, {
                    onBeforeEnter(e) {
                        Rr(g, [e]), $r(e, i), $r(e, l)
                    },
                    onBeforeAppear(e) {
                        Rr(S, [e]), $r(e, a), $r(e, u)
                    },
                    onEnter: A(!1),
                    onAppear: A(!0),
                    onLeave(e, t) {
                        const n = () => E(e, t)
                        $r(e, d),
                            document.body.offsetHeight,
                            $r(e, f),
                            Ir(() => {
                                Dr(e, d), $r(e, p), Pr(x) || Nr(e, o, m, n)
                            }),
                            Rr(x, [e, n])
                    },
                    onEnterCancelled(e) {
                        O(e, !1), Rr(w, [e])
                    },
                    onAppearCancelled(e) {
                        O(e, !0), Rr(C, [e])
                    },
                    onLeaveCancelled(e) {
                        E(e), Rr(_, [e])
                    },
                })
            })(e),
            t
        )
jr.displayName = 'Transition'
const Mr = {
    name: String,
    type: String,
    css: { type: Boolean, default: !0 },
    duration: [String, Number, Object],
    enterFromClass: String,
    enterActiveClass: String,
    enterToClass: String,
    appearFromClass: String,
    appearActiveClass: String,
    appearToClass: String,
    leaveFromClass: String,
    leaveActiveClass: String,
    leaveToClass: String,
}
jr.props = y({}, ln.props, Mr)
const Rr = (e, t = []) => {
        S(e) ? e.forEach((e) => e(...t)) : e && e(...t)
    },
    Pr = (e) => !!e && (S(e) ? e.some((e) => e.length > 1) : e.length > 1)
function Br(e) {
    return q(e)
}
function $r(e, t) {
    t.split(/\s+/).forEach((t) => t && e.classList.add(t)), (e._vtc || (e._vtc = new Set())).add(t)
}
function Dr(e, t) {
    t.split(/\s+/).forEach((t) => t && e.classList.remove(t))
    const { _vtc: n } = e
    n && (n.delete(t), n.size || (e._vtc = void 0))
}
function Ir(e) {
    requestAnimationFrame(() => {
        requestAnimationFrame(e)
    })
}
let Vr = 0
function Nr(e, t, n, o) {
    const r = (e._endId = ++Vr),
        i = () => {
            r === e._endId && o()
        }
    if (n) return setTimeout(i, n)
    const {
        type: l,
        timeout: s,
        propCount: a,
    } = (function (e, t) {
        const n = window.getComputedStyle(e),
            o = (e) => (n[e] || '').split(', '),
            r = o('transitionDelay'),
            i = o('transitionDuration'),
            l = Ur(r, i),
            s = o('animationDelay'),
            a = o('animationDuration'),
            u = Ur(s, a)
        let c = null,
            d = 0,
            f = 0
        t === Tr
            ? l > 0 && ((c = Tr), (d = l), (f = i.length))
            : 'animation' === t
            ? u > 0 && ((c = 'animation'), (d = u), (f = a.length))
            : ((d = Math.max(l, u)),
              (c = d > 0 ? (l > u ? Tr : 'animation') : null),
              (f = c ? (c === Tr ? i.length : a.length) : 0))
        const p = c === Tr && /\b(transform|all)(,|$)/.test(n.transitionProperty)
        return { type: c, timeout: d, propCount: f, hasTransform: p }
    })(e, t)
    if (!l) return o()
    const u = l + 'end'
    let c = 0
    const d = () => {
            e.removeEventListener(u, f), i()
        },
        f = (t) => {
            t.target === e && ++c >= a && d()
        }
    setTimeout(() => {
        c < a && d()
    }, s + 1),
        e.addEventListener(u, f)
}
function Ur(e, t) {
    for (; e.length < t.length; ) e = e.concat(e)
    return Math.max(...t.map((t, n) => Hr(t) + Hr(e[n])))
}
function Hr(e) {
    return 1e3 * Number(e.slice(0, -1).replace(',', '.'))
}
const zr = (e) => {
    const t = e.props['onUpdate:modelValue']
    return S(t) ? (e) => K(t, e) : t
}
function Kr(e) {
    e.target.composing = !0
}
function Wr(e) {
    const t = e.target
    t.composing &&
        ((t.composing = !1),
        (function (e, t) {
            const n = document.createEvent('HTMLEvents')
            n.initEvent(t, !0, !0), e.dispatchEvent(n)
        })(t, 'input'))
}
const qr = {
        created(e, { modifiers: { lazy: t, trim: n, number: o } }, r) {
            e._assign = zr(r)
            const i = o || 'number' === e.type
            Er(e, t ? 'change' : 'input', (t) => {
                if (t.target.composing) return
                let o = e.value
                n ? (o = o.trim()) : i && (o = q(o)), e._assign(o)
            }),
                n &&
                    Er(e, 'change', () => {
                        e.value = e.value.trim()
                    }),
                t || (Er(e, 'compositionstart', Kr), Er(e, 'compositionend', Wr), Er(e, 'change', Wr))
        },
        mounted(e, { value: t }) {
            e.value = null == t ? '' : t
        },
        beforeUpdate(e, { value: t, modifiers: { trim: n, number: o } }, r) {
            if (((e._assign = zr(r)), e.composing)) return
            if (document.activeElement === e) {
                if (n && e.value.trim() === t) return
                if ((o || 'number' === e.type) && q(e.value) === t) return
            }
            const i = null == t ? '' : t
            e.value !== i && (e.value = i)
        },
    },
    Gr = {
        created(e, { value: t }, n) {
            ;(e.checked = a(t, n.props.value)),
                (e._assign = zr(n)),
                Er(e, 'change', () => {
                    e._assign(Qr(e))
                })
        },
        beforeUpdate(e, { value: t, oldValue: n }, o) {
            ;(e._assign = zr(o)), t !== n && (e.checked = a(t, o.props.value))
        },
    },
    Yr = {
        created(e, { value: t, modifiers: { number: n } }, o) {
            const r = C(t)
            Er(e, 'change', () => {
                const t = Array.prototype.filter.call(e.options, (e) => e.selected).map((e) => (n ? q(Qr(e)) : Qr(e)))
                e._assign(e.multiple ? (r ? new Set(t) : t) : t[0])
            }),
                (e._assign = zr(o))
        },
        mounted(e, { value: t }) {
            Jr(e, t)
        },
        beforeUpdate(e, t, n) {
            e._assign = zr(n)
        },
        updated(e, { value: t }) {
            Jr(e, t)
        },
    }
function Jr(e, t) {
    const n = e.multiple
    if (!n || S(t) || C(t)) {
        for (let o = 0, r = e.options.length; o < r; o++) {
            const r = e.options[o],
                i = Qr(r)
            if (n) S(t) ? (r.selected = u(t, i) > -1) : (r.selected = t.has(i))
            else if (a(Qr(r), t)) return void (e.selectedIndex !== o && (e.selectedIndex = o))
        }
        n || -1 === e.selectedIndex || (e.selectedIndex = -1)
    }
}
function Qr(e) {
    return '_value' in e ? e._value : e.value
}
const Xr = ['ctrl', 'shift', 'alt', 'meta'],
    Zr = {
        stop: (e) => e.stopPropagation(),
        prevent: (e) => e.preventDefault(),
        self: (e) => e.target !== e.currentTarget,
        ctrl: (e) => !e.ctrlKey,
        shift: (e) => !e.shiftKey,
        alt: (e) => !e.altKey,
        meta: (e) => !e.metaKey,
        left: (e) => 'button' in e && 0 !== e.button,
        middle: (e) => 'button' in e && 1 !== e.button,
        right: (e) => 'button' in e && 2 !== e.button,
        exact: (e, t) => Xr.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    ei =
        (e, t) =>
        (n, ...o) => {
            for (let e = 0; e < t.length; e++) {
                const o = Zr[t[e]]
                if (o && o(n, t)) return
            }
            return e(n, ...o)
        },
    ti = {
        beforeMount(e, { value: t }, { transition: n }) {
            ;(e._vod = 'none' === e.style.display ? '' : e.style.display), n && t ? n.beforeEnter(e) : ni(e, t)
        },
        mounted(e, { value: t }, { transition: n }) {
            n && t && n.enter(e)
        },
        updated(e, { value: t, oldValue: n }, { transition: o }) {
            !t != !n &&
                (o
                    ? t
                        ? (o.beforeEnter(e), ni(e, !0), o.enter(e))
                        : o.leave(e, () => {
                              ni(e, !1)
                          })
                    : ni(e, t))
        },
        beforeUnmount(e, { value: t }) {
            ni(e, t)
        },
    }
function ni(e, t) {
    e.style.display = t ? e._vod : 'none'
}
const oi = y(
    {
        patchProp: (e, t, o, r, i = !1, l, s, a, u) => {
            switch (t) {
                case 'class':
                    !(function (e, t, n) {
                        if ((null == t && (t = ''), n)) e.setAttribute('class', t)
                        else {
                            const n = e._vtc
                            n && (t = (t ? [t, ...n] : [...n]).join(' ')), (e.className = t)
                        }
                    })(e, r, i)
                    break
                case 'style':
                    !(function (e, t, n) {
                        const o = e.style
                        if (n)
                            if (A(n)) {
                                if (t !== n) {
                                    const t = o.display
                                    ;(o.cssText = n), '_vod' in e && (o.display = t)
                                }
                            } else {
                                for (const e in n) br(o, e, n[e])
                                if (t && !A(t)) for (const e in t) null == n[e] && br(o, e, '')
                            }
                        else e.removeAttribute('style')
                    })(e, o, r)
                    break
                default:
                    g(t)
                        ? b(t) || Ar(e, t, 0, r, s)
                        : (function (e, t, n, o) {
                              if (o) return 'innerHTML' === t || !!(t in e && Fr.test(t) && E(n))
                              if ('spellcheck' === t || 'draggable' === t) return !1
                              if ('form' === t) return !1
                              if ('list' === t && 'INPUT' === e.tagName) return !1
                              if ('type' === t && 'TEXTAREA' === e.tagName) return !1
                              if (Fr.test(t) && A(n)) return !1
                              return t in e
                          })(e, t, r, i)
                        ? (function (e, t, n, o, r, i, l) {
                              if ('innerHTML' === t || 'textContent' === t)
                                  return o && l(o, r, i), void (e[t] = null == n ? '' : n)
                              if ('value' === t && 'PROGRESS' !== e.tagName) {
                                  e._value = n
                                  const o = null == n ? '' : n
                                  return e.value !== o && (e.value = o), void (null == n && e.removeAttribute(t))
                              }
                              if ('' === n || null == n) {
                                  const o = typeof e[t]
                                  if ('' === n && 'boolean' === o) return void (e[t] = !0)
                                  if (null == n && 'string' === o) return (e[t] = ''), void e.removeAttribute(t)
                                  if ('number' === o) return (e[t] = 0), void e.removeAttribute(t)
                              }
                              try {
                                  e[t] = n
                              } catch (s) {}
                          })(e, t, r, l, s, a, u)
                        : ('true-value' === t ? (e._trueValue = r) : 'false-value' === t && (e._falseValue = r),
                          (function (e, t, o, r, i) {
                              if (r && t.startsWith('xlink:'))
                                  null == o ? e.removeAttributeNS(xr, t.slice(6, t.length)) : e.setAttributeNS(xr, t, o)
                              else {
                                  const r = n(t)
                                  null == o || (r && !1 === o) ? e.removeAttribute(t) : e.setAttribute(t, r ? '' : o)
                              }
                          })(e, t, r, i))
            }
        },
        forcePatchProp: (e, t) => 'value' === t,
    },
    mr
)
let ri
const ii = (...e) => {
    const t = (ri || (ri = co(oi))).createApp(...e),
        { mount: n } = t
    return (
        (t.mount = (e) => {
            const o = (function (e) {
                if (A(e)) {
                    return document.querySelector(e)
                }
                return e
            })(e)
            if (!o) return
            const r = t._component
            E(r) || r.render || r.template || (r.template = o.innerHTML), (o.innerHTML = '')
            const i = n(o, !1, o instanceof SVGElement)
            return o instanceof Element && (o.removeAttribute('v-cloak'), o.setAttribute('data-v-app', '')), i
        }),
        t
    )
}
function li(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M7 16l-4-4m0 0l4-4m-4 4h18',
            }),
        ])
    )
}
function si(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M17 8l4 4m0 0l-4 4m4-4H3',
            }),
        ])
    )
}
function ai(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            }),
        ])
    )
}
function ui(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M5 13l4 4L19 7',
            }),
        ])
    )
}
function ci(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M19 9l-7 7-7-7',
            }),
        ])
    )
}
function di(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M9 5l7 7-7 7',
            }),
        ])
    )
}
function fi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
            }),
        ])
    )
}
function pi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
            }),
        ])
    )
}
function vi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
            }),
        ])
    )
}
function hi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            }),
        ])
    )
}
function mi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
            }),
        ])
    )
}
function gi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            }),
        ])
    )
}
function bi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            }),
        ])
    )
}
function yi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M13 10V3L4 14h7v7l9-11h-7z',
            }),
        ])
    )
}
function wi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
            }),
        ])
    )
}
function xi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
            }),
        ])
    )
}
function _i(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
            }),
        ])
    )
}
function Si(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
            }),
        ])
    )
}
function ki(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
            }),
        ])
    )
}
function Ci(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
            }),
        ])
    )
}
function Oi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
            }),
        ])
    )
}
function Ei(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
            }),
        ])
    )
}
function Ai(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
            }),
        ])
    )
}
function Li(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
            }),
        ])
    )
}
function Fi(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
            }),
        ])
    )
}
function Ti(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z',
            }),
        ])
    )
}
function ji(e, t) {
    return (
        Fo(),
        Mo('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
            Io('path', {
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': '2',
                d: 'M6 18L18 6M6 6l12 12',
            }),
        ])
    )
}
function Mi() {
    return (Mi =
        Object.assign ||
        function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t]
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
            }
            return e
        }).apply(this, arguments)
}
function Ri(e, t) {
    if (null == e) return {}
    var n,
        o,
        r = {},
        i = Object.keys(e)
    for (o = 0; o < i.length; o++) (n = i[o]), t.indexOf(n) >= 0 || (r[n] = e[n])
    return r
}
function Pi(e, t) {
    ;(null == t || t > e.length) && (t = e.length)
    for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n]
    return o
}
function Bi(e, t) {
    var n
    if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
        if (
            Array.isArray(e) ||
            (n = (function (e, t) {
                if (e) {
                    if ('string' == typeof e) return Pi(e, t)
                    var n = Object.prototype.toString.call(e).slice(8, -1)
                    return (
                        'Object' === n && e.constructor && (n = e.constructor.name),
                        'Map' === n || 'Set' === n
                            ? Array.from(e)
                            : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                            ? Pi(e, t)
                            : void 0
                    )
                }
            })(e)) ||
            (t && e && 'number' == typeof e.length)
        ) {
            n && (e = n)
            var o = 0
            return function () {
                return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] }
            }
        }
        throw new TypeError(
            'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
    }
    return (n = e[Symbol.iterator]()).next.bind(n)
}
function $i(e, t) {
    if (e in t) {
        for (var n = t[e], o = arguments.length, r = new Array(o > 2 ? o - 2 : 0), i = 2; i < o; i++)
            r[i - 2] = arguments[i]
        return 'function' == typeof n ? n.apply(void 0, r) : n
    }
    var l = new Error(
        'Tried to handle "' +
            e +
            '" but there is no handler defined. Only defined handlers are: ' +
            Object.keys(t)
                .map(function (e) {
                    return '"' + e + '"'
                })
                .join(', ') +
            '.'
    )
    throw (Error.captureStackTrace && Error.captureStackTrace(l, $i), l)
}
var Di, Ii, Vi, Ni, Ui, Hi
function zi(e) {
    var t,
        n,
        o = e.visible,
        r = void 0 === o || o,
        i = e.features,
        l = void 0 === i ? Di.None : i,
        s = Ri(e, ['visible', 'features'])
    return r || (l & Di.Static && s.props.static)
        ? Ki(s)
        : l & Di.RenderStrategy
        ? $i(
              null == (t = s.props.unmount) || t ? Vi.Unmount : Vi.Hidden,
              (((n = {})[Vi.Unmount] = function () {
                  return null
              }),
              (n[Vi.Hidden] = function () {
                  return Ki(Mi({}, s, { props: Mi({}, s.props, { hidden: !0, style: { display: 'none' } }) }))
              }),
              n)
          )
        : Ki(s)
}
function Ki(e) {
    var t,
        n = e.props,
        o = e.attrs,
        r = e.slots,
        i = e.slot,
        l = e.name,
        s = Wi(n, ['unmount', 'static']),
        a = s.as,
        u = Ri(s, ['as']),
        c = null == r.default ? void 0 : r.default(i)
    if ('template' === a) {
        if (Object.keys(u).length > 0 || Object.keys(o).length > 0) {
            var d = null != c ? c : [],
                f = d[0],
                p = d.slice(1)
            if (
                null == (t = f) ||
                ('string' != typeof t.type && 'object' != typeof t.type && 'function' != typeof t.type) ||
                p.length > 0
            )
                throw new Error(
                    [
                        'Passing props on "template"!',
                        '',
                        'The current component <' + l + ' /> is rendering a "template".',
                        'However we need to passthrough the following props:',
                        Object.keys(u)
                            .concat(Object.keys(o))
                            .map(function (e) {
                                return '  - ' + e
                            })
                            .join('\n'),
                        '',
                        'You can apply a few solutions:',
                        [
                            'Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".',
                            'Render a single element as the child so that we can forward the props onto that element.',
                        ]
                            .map(function (e) {
                                return '  - ' + e
                            })
                            .join('\n'),
                    ].join('\n')
                )
            return Vo(f, u)
        }
        return Array.isArray(c) && 1 === c.length ? c[0] : c
    }
    return fr(a, u, c)
}
function Wi(e, t) {
    void 0 === t && (t = [])
    for (var n, o = Object.assign({}, e), r = Bi(t); !(n = r()).done; ) {
        var i = n.value
        i in o && delete o[i]
    }
    return o
}
;((Ii = Di || (Di = {}))[(Ii.None = 0)] = 'None'),
    (Ii[(Ii.RenderStrategy = 1)] = 'RenderStrategy'),
    (Ii[(Ii.Static = 2)] = 'Static'),
    ((Ni = Vi || (Vi = {}))[(Ni.Unmount = 0)] = 'Unmount'),
    (Ni[(Ni.Hidden = 1)] = 'Hidden'),
    ((Hi = Ui || (Ui = {})).Space = ' '),
    (Hi.Enter = 'Enter'),
    (Hi.Escape = 'Escape'),
    (Hi.Backspace = 'Backspace'),
    (Hi.ArrowLeft = 'ArrowLeft'),
    (Hi.ArrowUp = 'ArrowUp'),
    (Hi.ArrowRight = 'ArrowRight'),
    (Hi.ArrowDown = 'ArrowDown'),
    (Hi.Home = 'Home'),
    (Hi.End = 'End'),
    (Hi.PageUp = 'PageUp'),
    (Hi.PageDown = 'PageDown'),
    (Hi.Tab = 'Tab')
var qi = 0
function Gi() {
    return ++qi
}
var Yi,
    Ji,
    Qi,
    Xi,
    Zi,
    el,
    tl,
    nl,
    ol = [
        '[contentEditable=true]',
        '[tabindex]',
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'iframe',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
    ]
        .map(function (e) {
            return e + ":not([tabindex='-1'])"
        })
        .join(',')
function rl(e) {
    null == e || e.focus({ preventScroll: !0 })
}
function il(e, t) {
    var n = Array.isArray(e)
            ? e
            : (function (e) {
                  return void 0 === e && (e = document.body), null == e ? [] : Array.from(e.querySelectorAll(ol))
              })(e),
        o = document.activeElement,
        r = (function () {
            if (t & (Yi.First | Yi.Next)) return Zi.Next
            if (t & (Yi.Previous | Yi.Last)) return Zi.Previous
            throw new Error('Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last')
        })(),
        i = (function () {
            if (t & Yi.First) return 0
            if (t & Yi.Previous) return Math.max(0, n.indexOf(o)) - 1
            if (t & Yi.Next) return Math.max(0, n.indexOf(o)) + 1
            if (t & Yi.Last) return n.length - 1
            throw new Error('Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last')
        })(),
        l = t & Yi.NoScroll ? { preventScroll: !0 } : {},
        s = 0,
        a = n.length,
        u = void 0
    do {
        var c
        if (s >= a || s + a <= 0) return Qi.Error
        var d = i + s
        if (t & Yi.WrapAround) d = (d + a) % a
        else {
            if (d < 0) return Qi.Underflow
            if (d >= a) return Qi.Overflow
        }
        null == (c = u = n[d]) || c.focus(l), (s += r)
    } while (u !== document.activeElement)
    return u.hasAttribute('tabindex') || u.setAttribute('tabindex', '0'), Qi.Success
}
function ll(e, t, n) {
    window.addEventListener(e, t, n),
        En(function () {
            return window.removeEventListener(e, t, n)
        })
}
function sl(e, t) {
    for (var n, o = Bi(e); !(n = o()).done; ) {
        if (n.value.contains(t)) return !0
    }
    return !1
}
;((Ji = Yi || (Yi = {}))[(Ji.First = 1)] = 'First'),
    (Ji[(Ji.Previous = 2)] = 'Previous'),
    (Ji[(Ji.Next = 4)] = 'Next'),
    (Ji[(Ji.Last = 8)] = 'Last'),
    (Ji[(Ji.WrapAround = 16)] = 'WrapAround'),
    (Ji[(Ji.NoScroll = 32)] = 'NoScroll'),
    ((Xi = Qi || (Qi = {}))[(Xi.Error = 0)] = 'Error'),
    (Xi[(Xi.Overflow = 1)] = 'Overflow'),
    (Xi[(Xi.Success = 2)] = 'Success'),
    (Xi[(Xi.Underflow = 3)] = 'Underflow'),
    ((el = Zi || (Zi = {}))[(el.Previous = -1)] = 'Previous'),
    (el[(el.Next = 1)] = 'Next'),
    ((nl = tl || (tl = {}))[(nl.Strict = 0)] = 'Strict'),
    (nl[(nl.Loose = 1)] = 'Loose')
var al = new Set(),
    ul = new Map()
function cl(e) {
    e.setAttribute('aria-hidden', 'true'), (e.inert = !0)
}
function dl(e) {
    var t = ul.get(e)
    t &&
        (null === t['aria-hidden'] ? e.removeAttribute('aria-hidden') : e.setAttribute('aria-hidden', t['aria-hidden']),
        (e.inert = t.inert))
}
var fl,
    pl,
    vl = Symbol('StackContext')
function hl() {
    return Jt(vl, function () {})
}
function ml(e) {
    var t = hl()
    Yt(vl, function () {
        for (var n = arguments.length, o = new Array(n), r = 0; r < n; r++) o[r] = arguments[r]
        null == e || e.apply(void 0, o), t.apply(void 0, o)
    })
}
;((pl = fl || (fl = {}))[(pl.AddElement = 0)] = 'AddElement'), (pl[(pl.RemoveElement = 1)] = 'RemoveElement')
var gl = Symbol('ForcePortalRootContext')
var bl = pn({
    name: 'ForcePortalRoot',
    props: { as: { type: [Object, String], default: 'template' }, force: { type: Boolean, default: !1 } },
    setup: function (e, t) {
        var n = t.slots,
            o = t.attrs
        return (
            Yt(gl, e.force),
            function () {
                return zi({ props: Ri(e, ['force']), slot: {}, slots: n, attrs: o, name: 'ForcePortalRoot' })
            }
        )
    },
})
function yl() {
    var e = document.getElementById('headlessui-portal-root')
    if (e) return e
    var t = document.createElement('div')
    return t.setAttribute('id', 'headlessui-portal-root'), document.body.appendChild(t)
}
var wl = pn({
        name: 'Portal',
        props: { as: { type: [Object, String], default: 'div' } },
        setup: function (e, t) {
            var n = t.slots,
                o = t.attrs,
                r = Jt(gl, !1),
                i = Jt(xl, null),
                l = it(!0 === r || null === i ? yl() : i.resolveTarget())
            Qt(function () {
                r || (null !== i && (l.value = i.resolveTarget()))
            })
            var s = it(null)
            return (
                (function (e) {
                    var t = hl()
                    Qt(function (n) {
                        var o = null == e ? void 0 : e.value
                        o &&
                            (t(fl.AddElement, o),
                            n(function () {
                                return t(fl.RemoveElement, o)
                            }))
                    })
                })(s),
                En(function () {
                    var e,
                        t = document.getElementById('headlessui-portal-root')
                    t &&
                        l.value === t &&
                        l.value.children.length <= 0 &&
                        (null == (e = l.value.parentElement) || e.removeChild(l.value))
                }),
                ml(),
                function () {
                    if (null === l.value) return null
                    var t = { ref: s }
                    return fr(
                        bo,
                        { to: l.value },
                        zi({ props: Mi({}, e, t), slot: {}, attrs: o, slots: n, name: 'Portal' })
                    )
                }
            )
        },
    }),
    xl = Symbol('PortalGroupContext'),
    _l = pn({
        name: 'PortalGroup',
        props: { as: { type: [Object, String], default: 'template' }, target: { type: Object, default: null } },
        setup: function (e, t) {
            var n = t.attrs,
                o = t.slots,
                r = Ye({
                    resolveTarget: function () {
                        return e.target
                    },
                })
            return (
                Yt(xl, r),
                function () {
                    return zi({ props: Ri(e, ['target']), slot: {}, attrs: n, slots: o, name: 'PortalGroup' })
                }
            )
        },
    }),
    Sl = Symbol('DescriptionContext')
var kl = pn({
    name: 'Description',
    props: { as: { type: [Object, String], default: 'p' } },
    render: function () {
        var e = this.context,
            t = e.name,
            n = void 0 === t ? 'Description' : t,
            o = e.slot,
            r = void 0 === o ? it({}) : o,
            i = e.props,
            l = void 0 === i ? {} : i,
            s = this.$props,
            a = Mi(
                {},
                Object.entries(l).reduce(function (e, t) {
                    var n,
                        o = t[0],
                        r = t[1]
                    return Object.assign(e, (((n = {})[o] = st(r)), n))
                }, {}),
                { id: this.id }
            )
        return zi({ props: Mi({}, s, a), slot: r.value, attrs: this.$attrs, slots: this.$slots, name: n })
    },
    setup: function () {
        var e = (function () {
                var e = Jt(Sl, null)
                if (null === e) throw new Error('Missing parent')
                return e
            })(),
            t = 'headlessui-description-' + Gi()
        return (
            Sn(function () {
                return En(e.register(t))
            }),
            { id: t, context: e }
        )
    },
})
function Cl(e) {
    var t
    return null == e || null == e.value ? null : null != (t = e.value.$el) ? t : e.value
}
var Ol,
    El,
    Al,
    Ll,
    Fl = Symbol('Context')
function Tl() {
    return Jt(Fl, null)
}
function jl(e) {
    Yt(Fl, e)
}
;((El = Ol || (Ol = {}))[(El.Open = 0)] = 'Open'),
    (El[(El.Closed = 1)] = 'Closed'),
    ((Ll = Al || (Al = {}))[(Ll.Open = 0)] = 'Open'),
    (Ll[(Ll.Closed = 1)] = 'Closed')
var Ml = Symbol('DialogContext')
function Rl(e) {
    var t = Jt(Ml, null)
    if (null === t) {
        var n = new Error('<' + e + ' /> is missing a parent <Dialog /> component.')
        throw (Error.captureStackTrace && Error.captureStackTrace(n, Rl), n)
    }
    return t
}
var Pl,
    Bl,
    $l,
    Dl,
    Il,
    Vl = 'DC8F892D-2EBD-447C-A4C8-A03058436FF4',
    Nl = pn({
        name: 'Dialog',
        inheritAttrs: !1,
        props: {
            as: { type: [Object, String], default: 'div' },
            static: { type: Boolean, default: !1 },
            unmount: { type: Boolean, default: !0 },
            open: { type: [Boolean, String], default: Vl },
            initialFocus: { type: Object, default: null },
        },
        emits: ['close'],
        render: function () {
            var e = this,
                t = Mi({}, this.$attrs, {
                    ref: 'el',
                    id: this.id,
                    role: 'dialog',
                    'aria-modal': this.dialogState === Al.Open || void 0,
                    'aria-labelledby': this.titleId,
                    'aria-describedby': this.describedby,
                    onClick: this.handleClick,
                    onKeydown: this.handleKeyDown,
                }),
                n = Ri(this.$props, ['open', 'initialFocus']),
                o = { open: this.dialogState === Al.Open }
            return fr(bl, { force: !0 }, function () {
                return fr(wl, function () {
                    return fr(_l, { target: e.dialogRef }, function () {
                        return fr(bl, { force: !1 }, function () {
                            return zi({
                                props: Mi({}, n, t),
                                slot: o,
                                attrs: e.$attrs,
                                slots: e.$slots,
                                visible: e.visible,
                                features: Di.RenderStrategy | Di.Static,
                                name: 'Dialog',
                            })
                        })
                    })
                })
            })
        },
        setup: function (e, t) {
            var n = t.emit,
                o = it(new Set()),
                r = Tl(),
                i = dr(function () {
                    var t
                    return e.open === Vl && null !== r
                        ? $i(r.value, (((t = {})[Ol.Open] = !0), (t[Ol.Closed] = !1), t))
                        : e.open
                })
            if (!(e.open !== Vl || null !== r)) throw new Error('You forgot to provide an `open` prop to the `Dialog`.')
            if ('boolean' != typeof i.value)
                throw new Error(
                    'You provided an `open` prop to the `Dialog`, but the value is not a boolean. Received: ' +
                        (i.value === Vl ? void 0 : e.open)
                )
            var l = dr(function () {
                    return e.open ? Al.Open : Al.Closed
                }),
                s = dr(function () {
                    return null !== r ? r.value === Ol.Open : l.value === Al.Open
                }),
                a = it(null),
                u = it(l.value === Al.Open)
            Cn(function () {
                u.value = l.value === Al.Open
            })
            var c = 'headlessui-dialog-' + Gi(),
                d = dr(function () {
                    return { initialFocus: e.initialFocus }
                })
            !(function (e, t, n) {
                void 0 === t && (t = it(!0)), void 0 === n && (n = it({}))
                var o = it('undefined' != typeof window ? document.activeElement : null),
                    r = it(null)
                function i() {
                    if (t.value && 1 === e.value.size) {
                        var i = n.value.initialFocus,
                            l = document.activeElement
                        if (i) {
                            if (i === l) return
                        } else if (sl(e.value, l)) return
                        if (((o.value = l), i)) rl(i)
                        else {
                            for (var s, a = !1, u = Bi(e.value); !(s = u()).done; )
                                if (il(s.value, Yi.First) === Qi.Success) {
                                    a = !0
                                    break
                                }
                            if (!a) throw new Error('There are no focusable elements inside the <FocusTrap />')
                        }
                        r.value = document.activeElement
                    }
                }
                function l() {
                    rl(o.value), (o.value = null), (r.value = null)
                }
                Qt(i),
                    Cn(function () {
                        t.value ? i() : l()
                    }),
                    En(l),
                    ll('keydown', function (n) {
                        if (t.value && n.key === Ui.Tab && document.activeElement && 1 === e.value.size) {
                            n.preventDefault()
                            for (var o, i = Bi(e.value); !(o = i()).done; )
                                if (il(o.value, (n.shiftKey ? Yi.Previous : Yi.Next) | Yi.WrapAround) === Qi.Success) {
                                    r.value = document.activeElement
                                    break
                                }
                        }
                    }),
                    ll(
                        'focus',
                        function (n) {
                            if (t.value && 1 === e.value.size) {
                                var o = r.value
                                if (o) {
                                    var i = n.target
                                    i && i instanceof HTMLElement
                                        ? sl(e.value, i)
                                            ? ((r.value = i), rl(i))
                                            : (n.preventDefault(), n.stopPropagation(), rl(o))
                                        : rl(r.value)
                                }
                            }
                        },
                        !0
                    )
            })(o, u, d),
                (function (e, t) {
                    void 0 === t && (t = it(!0)),
                        Qt(function (n) {
                            if (t.value && e.value) {
                                var o = e.value
                                al.add(o)
                                for (var r, i = Bi(ul.keys()); !(r = i()).done; ) {
                                    var l = r.value
                                    l.contains(o) && (dl(l), ul.delete(l))
                                }
                                document.querySelectorAll('body > *').forEach(function (e) {
                                    if (e instanceof HTMLElement) {
                                        for (var t, n = Bi(al); !(t = n()).done; ) {
                                            var o = t.value
                                            if (e.contains(o)) return
                                        }
                                        1 === al.size &&
                                            (ul.set(e, {
                                                'aria-hidden': e.getAttribute('aria-hidden'),
                                                inert: e.inert,
                                            }),
                                            cl(e))
                                    }
                                }),
                                    n(function () {
                                        if ((al.delete(o), al.size > 0))
                                            document.querySelectorAll('body > *').forEach(function (e) {
                                                if (e instanceof HTMLElement && !ul.has(e)) {
                                                    for (var t, n = Bi(al); !(t = n()).done; ) {
                                                        var o = t.value
                                                        if (e.contains(o)) return
                                                    }
                                                    ul.set(e, {
                                                        'aria-hidden': e.getAttribute('aria-hidden'),
                                                        inert: e.inert,
                                                    }),
                                                        cl(e)
                                                }
                                            })
                                        else
                                            for (var e, t = Bi(ul.keys()); !(e = t()).done; ) {
                                                var n = e.value
                                                dl(n), ul.delete(n)
                                            }
                                    })
                            }
                        })
                })(a, u),
                ml(function (e, t) {
                    var n
                    return $i(
                        e,
                        (((n = {})[fl.AddElement] = function () {
                            o.value.add(t)
                        }),
                        (n[fl.RemoveElement] = function () {
                            o.value.delete(t)
                        }),
                        n)
                    )
                })
            var f = (function (e) {
                    var t = void 0 === e ? {} : e,
                        n = t.slot,
                        o = void 0 === n ? it({}) : n,
                        r = t.name,
                        i = void 0 === r ? 'Description' : r,
                        l = t.props,
                        s = void 0 === l ? {} : l,
                        a = it([])
                    return (
                        Yt(Sl, {
                            register: function (e) {
                                return (
                                    a.value.push(e),
                                    function () {
                                        var t = a.value.indexOf(e)
                                        ;-1 !== t && a.value.splice(t, 1)
                                    }
                                )
                            },
                            slot: o,
                            name: i,
                            props: s,
                        }),
                        dr(function () {
                            return a.value.length > 0 ? a.value.join(' ') : void 0
                        })
                    )
                })({
                    name: 'DialogDescription',
                    slot: dr(function () {
                        return { open: i.value }
                    }),
                }),
                p = it(null),
                v = {
                    titleId: p,
                    dialogState: l,
                    setTitleId: function (e) {
                        p.value !== e && (p.value = e)
                    },
                    close: function () {
                        n('close', !1)
                    },
                }
            return (
                Yt(Ml, v),
                ll('mousedown', function (e) {
                    var t = e.target
                    l.value === Al.Open &&
                        1 === o.value.size &&
                        (sl(o.value, t) ||
                            (v.close(),
                            Et(function () {
                                return null == t ? void 0 : t.focus()
                            })))
                }),
                Qt(function (e) {
                    if (l.value === Al.Open) {
                        var t = document.documentElement.style.overflow,
                            n = document.documentElement.style.paddingRight,
                            o = window.innerWidth - document.documentElement.clientWidth
                        ;(document.documentElement.style.overflow = 'hidden'),
                            (document.documentElement.style.paddingRight = o + 'px'),
                            e(function () {
                                ;(document.documentElement.style.overflow = t),
                                    (document.documentElement.style.paddingRight = n)
                            })
                    }
                }),
                Qt(function (e) {
                    if (l.value === Al.Open) {
                        var t = Cl(a)
                        if (t) {
                            var n = new IntersectionObserver(function (e) {
                                for (var t, n = Bi(e); !(t = n()).done; ) {
                                    var o = t.value
                                    0 === o.boundingClientRect.x &&
                                        0 === o.boundingClientRect.y &&
                                        0 === o.boundingClientRect.width &&
                                        0 === o.boundingClientRect.height &&
                                        v.close()
                                }
                            })
                            n.observe(t),
                                e(function () {
                                    return n.disconnect()
                                })
                        }
                    }
                }),
                {
                    id: c,
                    el: a,
                    dialogRef: a,
                    containers: o,
                    dialogState: l,
                    titleId: p,
                    describedby: f,
                    visible: s,
                    open: i,
                    handleClick: function (e) {
                        e.stopPropagation()
                    },
                    handleKeyDown: function (e) {
                        e.key === Ui.Escape &&
                            l.value === Al.Open &&
                            (o.value.size > 1 || (e.preventDefault(), e.stopPropagation(), v.close()))
                    },
                }
            )
        },
    }),
    Ul = pn({
        name: 'DialogOverlay',
        props: { as: { type: [Object, String], default: 'div' } },
        render: function () {
            var e = Rl('DialogOverlay'),
                t = { ref: 'el', id: this.id, 'aria-hidden': !0, onClick: this.handleClick }
            return zi({
                props: Mi({}, this.$props, t),
                slot: { open: e.dialogState.value === Al.Open },
                attrs: this.$attrs,
                slots: this.$slots,
                name: 'DialogOverlay',
            })
        },
        setup: function () {
            var e = Rl('DialogOverlay')
            return {
                id: 'headlessui-dialog-overlay-' + Gi(),
                handleClick: function (t) {
                    t.preventDefault(), t.stopPropagation(), e.close()
                },
            }
        },
    }),
    Hl = pn({
        name: 'DialogTitle',
        props: { as: { type: [Object, String], default: 'h2' } },
        render: function () {
            var e = Rl('DialogTitle'),
                t = { id: this.id }
            return zi({
                props: Mi({}, this.$props, t),
                slot: { open: e.dialogState.value === Al.Open },
                attrs: this.$attrs,
                slots: this.$slots,
                name: 'DialogTitle',
            })
        },
        setup: function () {
            var e = Rl('DialogTitle'),
                t = 'headlessui-dialog-title-' + Gi()
            return (
                Sn(function () {
                    e.setTitleId(t),
                        En(function () {
                            return e.setTitleId(null)
                        })
                }),
                { id: t }
            )
        },
    }),
    zl = kl
function Kl(e, t) {
    var n = t.resolveItems()
    if (n.length <= 0) return null
    var o = t.resolveActiveIndex(),
        r = null != o ? o : -1,
        i = (function () {
            switch (e.focus) {
                case $l.First:
                    return n.findIndex(function (e) {
                        return !t.resolveDisabled(e)
                    })
                case $l.Previous:
                    var o = n
                        .slice()
                        .reverse()
                        .findIndex(function (e, n, o) {
                            return !(-1 !== r && o.length - n - 1 >= r) && !t.resolveDisabled(e)
                        })
                    return -1 === o ? o : n.length - 1 - o
                case $l.Next:
                    return n.findIndex(function (e, n) {
                        return !(n <= r) && !t.resolveDisabled(e)
                    })
                case $l.Last:
                    var i = n
                        .slice()
                        .reverse()
                        .findIndex(function (e) {
                            return !t.resolveDisabled(e)
                        })
                    return -1 === i ? i : n.length - 1 - i
                case $l.Specific:
                    return n.findIndex(function (n) {
                        return t.resolveId(n) === e.id
                    })
                case $l.Nothing:
                    return null
                default:
                    !(function (e) {
                        throw new Error('Unexpected object: ' + e)
                    })(e)
            }
        })()
    return -1 === i ? o : i
}
;((Bl = Pl || (Pl = {}))[(Bl.Open = 0)] = 'Open'),
    (Bl[(Bl.Closed = 1)] = 'Closed'),
    (function (e) {
        ;(e[(e.First = 0)] = 'First'),
            (e[(e.Previous = 1)] = 'Previous'),
            (e[(e.Next = 2)] = 'Next'),
            (e[(e.Last = 3)] = 'Last'),
            (e[(e.Specific = 4)] = 'Specific'),
            (e[(e.Nothing = 5)] = 'Nothing')
    })($l || ($l = {})),
    ((Il = Dl || (Dl = {}))[(Il.Open = 0)] = 'Open'),
    (Il[(Il.Closed = 1)] = 'Closed')
var Wl = Symbol('ListboxContext')
function ql(e) {
    var t = Jt(Wl, null)
    if (null === t) {
        var n = new Error('<' + e + ' /> is missing a parent <Listbox /> component.')
        throw (Error.captureStackTrace && Error.captureStackTrace(n, ql), n)
    }
    return t
}
var Gl,
    Yl,
    Jl,
    Ql,
    Xl,
    Zl,
    es = pn({
        name: 'Listbox',
        emits: ['update:modelValue'],
        props: {
            as: { type: [Object, String], default: 'template' },
            disabled: { type: [Boolean], default: !1 },
            modelValue: { type: [Object, String, Number, Boolean] },
        },
        setup: function (e, t) {
            var n = t.slots,
                o = t.attrs,
                r = t.emit,
                i = it(Dl.Closed),
                l = it(null),
                s = it(null),
                a = it(null),
                u = it([]),
                c = it(''),
                d = it(null),
                f = dr(function () {
                    return e.modelValue
                }),
                p = {
                    listboxState: i,
                    value: f,
                    labelRef: l,
                    buttonRef: s,
                    optionsRef: a,
                    disabled: dr(function () {
                        return e.disabled
                    }),
                    options: u,
                    searchQuery: c,
                    activeOptionIndex: d,
                    closeListbox: function () {
                        e.disabled || (i.value !== Dl.Closed && ((i.value = Dl.Closed), (d.value = null)))
                    },
                    openListbox: function () {
                        e.disabled || (i.value !== Dl.Open && (i.value = Dl.Open))
                    },
                    goToOption: function (t, n) {
                        if (!e.disabled && i.value !== Dl.Closed) {
                            var o = Kl(t === $l.Specific ? { focus: $l.Specific, id: n } : { focus: t }, {
                                resolveItems: function () {
                                    return u.value
                                },
                                resolveActiveIndex: function () {
                                    return d.value
                                },
                                resolveId: function (e) {
                                    return e.id
                                },
                                resolveDisabled: function (e) {
                                    return e.dataRef.disabled
                                },
                            })
                            ;('' === c.value && d.value === o) || ((c.value = ''), (d.value = o))
                        }
                    },
                    search: function (t) {
                        if (!e.disabled && i.value !== Dl.Closed) {
                            c.value += t.toLowerCase()
                            var n = u.value.findIndex(function (e) {
                                return !e.dataRef.disabled && e.dataRef.textValue.startsWith(c.value)
                            })
                            ;-1 !== n && n !== d.value && (d.value = n)
                        }
                    },
                    clearSearch: function () {
                        e.disabled || (i.value !== Dl.Closed && '' !== c.value && (c.value = ''))
                    },
                    registerOption: function (e, t) {
                        u.value.push({ id: e, dataRef: t })
                    },
                    unregisterOption: function (e) {
                        var t = u.value.slice(),
                            n = null !== d.value ? t[d.value] : null,
                            o = t.findIndex(function (t) {
                                return t.id === e
                            })
                        ;-1 !== o && t.splice(o, 1),
                            (u.value = t),
                            (d.value = o === d.value || null === n ? null : t.indexOf(n))
                    },
                    select: function (t) {
                        e.disabled || r('update:modelValue', t)
                    },
                }
            return (
                ll('mousedown', function (e) {
                    var t,
                        n,
                        o,
                        r = e.target,
                        l = document.activeElement
                    i.value === Dl.Open &&
                        ((null == (t = Cl(s)) ? void 0 : t.contains(r)) ||
                            ((null == (n = Cl(a)) ? void 0 : n.contains(r)) || p.closeListbox(),
                            (l !== document.body && (null == l ? void 0 : l.contains(r))) ||
                                e.defaultPrevented ||
                                null == (o = Cl(s)) ||
                                o.focus({ preventScroll: !0 })))
                }),
                Yt(Wl, p),
                jl(
                    dr(function () {
                        var e
                        return $i(i.value, (((e = {})[Dl.Open] = Ol.Open), (e[Dl.Closed] = Ol.Closed), e))
                    })
                ),
                function () {
                    var t = { open: i.value === Dl.Open, disabled: e.disabled }
                    return zi({
                        props: Wi(e, ['modelValue', 'onUpdate:modelValue', 'disabled']),
                        slot: t,
                        slots: n,
                        attrs: o,
                        name: 'Listbox',
                    })
                }
            )
        },
    }),
    ts = pn({
        name: 'ListboxLabel',
        props: { as: { type: [Object, String], default: 'label' } },
        render: function () {
            var e = ql('ListboxLabel'),
                t = { open: e.listboxState.value === Dl.Open, disabled: e.disabled.value },
                n = { id: this.id, ref: 'el', onClick: this.handleClick }
            return zi({
                props: Mi({}, this.$props, n),
                slot: t,
                attrs: this.$attrs,
                slots: this.$slots,
                name: 'ListboxLabel',
            })
        },
        setup: function () {
            var e = ql('ListboxLabel')
            return {
                id: 'headlessui-listbox-label-' + Gi(),
                el: e.labelRef,
                handleClick: function () {
                    var t
                    null == (t = Cl(e.buttonRef)) || t.focus({ preventScroll: !0 })
                },
            }
        },
    }),
    ns = pn({
        name: 'ListboxButton',
        props: { as: { type: [Object, String], default: 'button' } },
        render: function () {
            var e,
                t,
                n = ql('ListboxButton'),
                o = { open: n.listboxState.value === Dl.Open, disabled: n.disabled.value },
                r = {
                    ref: 'el',
                    id: this.id,
                    type: 'button',
                    'aria-haspopup': !0,
                    'aria-controls': null == (e = Cl(n.optionsRef)) ? void 0 : e.id,
                    'aria-expanded': n.disabled.value ? void 0 : n.listboxState.value === Dl.Open,
                    'aria-labelledby': n.labelRef.value
                        ? [null == (t = Cl(n.labelRef)) ? void 0 : t.id, this.id].join(' ')
                        : void 0,
                    disabled: !0 === n.disabled.value || void 0,
                    onKeydown: this.handleKeyDown,
                    onKeyup: this.handleKeyUp,
                    onClick: this.handleClick,
                }
            return zi({
                props: Mi({}, this.$props, r),
                slot: o,
                attrs: this.$attrs,
                slots: this.$slots,
                name: 'ListboxButton',
            })
        },
        setup: function () {
            var e = ql('ListboxButton')
            return {
                id: 'headlessui-listbox-button-' + Gi(),
                el: e.buttonRef,
                handleKeyDown: function (t) {
                    switch (t.key) {
                        case Ui.Space:
                        case Ui.Enter:
                        case Ui.ArrowDown:
                            t.preventDefault(),
                                e.openListbox(),
                                Et(function () {
                                    var t
                                    null == (t = Cl(e.optionsRef)) || t.focus({ preventScroll: !0 }),
                                        e.value.value || e.goToOption($l.First)
                                })
                            break
                        case Ui.ArrowUp:
                            t.preventDefault(),
                                e.openListbox(),
                                Et(function () {
                                    var t
                                    null == (t = Cl(e.optionsRef)) || t.focus({ preventScroll: !0 }),
                                        e.value.value || e.goToOption($l.Last)
                                })
                    }
                },
                handleKeyUp: function (e) {
                    switch (e.key) {
                        case Ui.Space:
                            e.preventDefault()
                    }
                },
                handleClick: function (t) {
                    var n
                    e.disabled.value ||
                        (e.listboxState.value === Dl.Open
                            ? (e.closeListbox(),
                              Et(function () {
                                  var t
                                  return null == (t = Cl(e.buttonRef)) ? void 0 : t.focus({ preventScroll: !0 })
                              }))
                            : (t.preventDefault(),
                              e.openListbox(),
                              (n = function () {
                                  var t
                                  return null == (t = Cl(e.optionsRef)) ? void 0 : t.focus({ preventScroll: !0 })
                              }),
                              requestAnimationFrame(function () {
                                  return requestAnimationFrame(n)
                              })))
                },
            }
        },
    }),
    os = pn({
        name: 'ListboxOptions',
        props: {
            as: { type: [Object, String], default: 'ul' },
            static: { type: Boolean, default: !1 },
            unmount: { type: Boolean, default: !0 },
        },
        render: function () {
            var e,
                t,
                n,
                o,
                r = ql('ListboxOptions'),
                i = { open: r.listboxState.value === Dl.Open },
                l = {
                    'aria-activedescendant':
                        null === r.activeOptionIndex.value || null == (e = r.options.value[r.activeOptionIndex.value])
                            ? void 0
                            : e.id,
                    'aria-labelledby':
                        null != (t = null == (n = Cl(r.labelRef)) ? void 0 : n.id)
                            ? t
                            : null == (o = Cl(r.buttonRef))
                            ? void 0
                            : o.id,
                    id: this.id,
                    onKeydown: this.handleKeyDown,
                    role: 'listbox',
                    tabIndex: 0,
                    ref: 'el',
                }
            return zi({
                props: Mi({}, this.$props, l),
                slot: i,
                attrs: this.$attrs,
                slots: this.$slots,
                features: Di.RenderStrategy | Di.Static,
                visible: this.visible,
                name: 'ListboxOptions',
            })
        },
        setup: function () {
            var e = ql('ListboxOptions'),
                t = 'headlessui-listbox-options-' + Gi(),
                n = it(null)
            var o = Tl(),
                r = dr(function () {
                    return null !== o ? o.value === Ol.Open : e.listboxState.value === Dl.Open
                })
            return {
                id: t,
                el: e.optionsRef,
                handleKeyDown: function (t) {
                    switch ((n.value && clearTimeout(n.value), t.key)) {
                        case Ui.Space:
                            if ('' !== e.searchQuery.value)
                                return t.preventDefault(), t.stopPropagation(), e.search(t.key)
                        case Ui.Enter:
                            if ((t.preventDefault(), t.stopPropagation(), null !== e.activeOptionIndex.value)) {
                                var o = e.options.value[e.activeOptionIndex.value].dataRef
                                e.select(o.value)
                            }
                            e.closeListbox(),
                                Et(function () {
                                    var t
                                    return null == (t = Cl(e.buttonRef)) ? void 0 : t.focus({ preventScroll: !0 })
                                })
                            break
                        case Ui.ArrowDown:
                            return t.preventDefault(), t.stopPropagation(), e.goToOption($l.Next)
                        case Ui.ArrowUp:
                            return t.preventDefault(), t.stopPropagation(), e.goToOption($l.Previous)
                        case Ui.Home:
                        case Ui.PageUp:
                            return t.preventDefault(), t.stopPropagation(), e.goToOption($l.First)
                        case Ui.End:
                        case Ui.PageDown:
                            return t.preventDefault(), t.stopPropagation(), e.goToOption($l.Last)
                        case Ui.Escape:
                            t.preventDefault(),
                                t.stopPropagation(),
                                e.closeListbox(),
                                Et(function () {
                                    var t
                                    return null == (t = Cl(e.buttonRef)) ? void 0 : t.focus({ preventScroll: !0 })
                                })
                            break
                        case Ui.Tab:
                            t.preventDefault(), t.stopPropagation()
                            break
                        default:
                            1 === t.key.length &&
                                (e.search(t.key),
                                (n.value = setTimeout(function () {
                                    return e.clearSearch()
                                }, 350)))
                    }
                },
                visible: r,
            }
        },
    }),
    rs = pn({
        name: 'ListboxOption',
        props: {
            as: { type: [Object, String], default: 'li' },
            value: { type: [Object, String, Number, Boolean] },
            disabled: { type: Boolean, default: !1 },
        },
        setup: function (e, t) {
            var n = t.slots,
                o = t.attrs,
                r = ql('ListboxOption'),
                i = 'headlessui-listbox-option-' + Gi(),
                l = dr(function () {
                    return null !== r.activeOptionIndex.value && r.options.value[r.activeOptionIndex.value].id === i
                }),
                s = dr(function () {
                    return tt(r.value.value) === tt(e.value)
                }),
                a = it({ disabled: e.disabled, value: e.value, textValue: '' })
            function u(t) {
                if (e.disabled) return t.preventDefault()
                r.select(e.value),
                    r.closeListbox(),
                    Et(function () {
                        var e
                        return null == (e = Cl(r.buttonRef)) ? void 0 : e.focus({ preventScroll: !0 })
                    })
            }
            function c() {
                if (e.disabled) return r.goToOption($l.Nothing)
                r.goToOption($l.Specific, i)
            }
            function d() {
                e.disabled || l.value || r.goToOption($l.Specific, i)
            }
            function f() {
                e.disabled || (l.value && r.goToOption($l.Nothing))
            }
            return (
                Sn(function () {
                    var e,
                        t,
                        n =
                            null == (e = document.getElementById(i)) || null == (t = e.textContent)
                                ? void 0
                                : t.toLowerCase().trim()
                    void 0 !== n && (a.value.textValue = n)
                }),
                Sn(function () {
                    return r.registerOption(i, a)
                }),
                En(function () {
                    return r.unregisterOption(i)
                }),
                Sn(function () {
                    Zt(
                        [r.listboxState, s],
                        function () {
                            var e
                            r.listboxState.value === Dl.Open &&
                                s.value &&
                                (r.goToOption($l.Specific, i),
                                null == (e = document.getElementById(i)) || null == e.focus || e.focus())
                        },
                        { immediate: !0 }
                    )
                }),
                Qt(function () {
                    r.listboxState.value === Dl.Open &&
                        l.value &&
                        Et(function () {
                            var e
                            return null == (e = document.getElementById(i)) || null == e.scrollIntoView
                                ? void 0
                                : e.scrollIntoView({ block: 'nearest' })
                        })
                }),
                function () {
                    var t = e.disabled,
                        r = { active: l.value, selected: s.value, disabled: t },
                        a = {
                            id: i,
                            role: 'option',
                            tabIndex: !0 === t ? void 0 : -1,
                            'aria-disabled': !0 === t || void 0,
                            'aria-selected': !0 === s.value ? s.value : void 0,
                            disabled: void 0,
                            onClick: u,
                            onFocus: c,
                            onPointermove: d,
                            onMousemove: d,
                            onPointerleave: f,
                            onMouseleave: f,
                        }
                    return zi({ props: Mi({}, e, a), slot: r, attrs: o, slots: n, name: 'ListboxOption' })
                }
            )
        },
    })
;((Yl = Gl || (Gl = {}))[(Yl.Open = 0)] = 'Open'),
    (Yl[(Yl.Closed = 1)] = 'Closed'),
    ((Ql = Jl || (Jl = {}))[(Ql.Open = 0)] = 'Open'),
    (Ql[(Ql.Closed = 1)] = 'Closed'),
    ((Zl = Xl || (Xl = {}))[(Zl.Empty = 1)] = 'Empty'),
    (Zl[(Zl.Active = 2)] = 'Active')
var is,
    ls,
    ss = Symbol('GroupContext'),
    as = pn({
        name: 'Switch',
        emits: ['update:modelValue'],
        props: { as: { type: [Object, String], default: 'button' }, modelValue: { type: Boolean, default: !1 } },
        render: function () {
            var e = Jt(ss, null),
                t = { checked: this.$props.modelValue },
                n = {
                    id: this.id,
                    ref: null === e ? void 0 : e.switchRef,
                    role: 'switch',
                    tabIndex: 0,
                    'aria-checked': this.$props.modelValue,
                    'aria-labelledby': this.labelledby,
                    'aria-describedby': this.describedby,
                    onClick: this.handleClick,
                    onKeyup: this.handleKeyUp,
                    onKeypress: this.handleKeyPress,
                }
            return (
                'button' === this.$props.as && Object.assign(n, { type: 'button' }),
                zi({ props: Mi({}, this.$props, n), slot: t, attrs: this.$attrs, slots: this.$slots, name: 'Switch' })
            )
        },
        setup: function (e, t) {
            var n = t.emit,
                o = Jt(ss, null)
            function r() {
                n('update:modelValue', !e.modelValue)
            }
            return {
                id: 'headlessui-switch-' + Gi(),
                el: null == o ? void 0 : o.switchRef,
                labelledby: null == o ? void 0 : o.labelledby,
                describedby: null == o ? void 0 : o.describedby,
                handleClick: function (e) {
                    e.preventDefault(), r()
                },
                handleKeyUp: function (e) {
                    e.key !== Ui.Tab && e.preventDefault(), e.key === Ui.Space && r()
                },
                handleKeyPress: function (e) {
                    e.preventDefault()
                },
            }
        },
    })
function us() {
    var e = [],
        t = {
            requestAnimationFrame: (function (e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return (
                    (t.toString = function () {
                        return e.toString()
                    }),
                    t
                )
            })(function () {
                var e = requestAnimationFrame.apply(void 0, arguments)
                t.add(function () {
                    return cancelAnimationFrame(e)
                })
            }),
            nextFrame: function () {
                for (var e = arguments.length, n = new Array(e), o = 0; o < e; o++) n[o] = arguments[o]
                t.requestAnimationFrame(function () {
                    t.requestAnimationFrame.apply(t, n)
                })
            },
            setTimeout: (function (e) {
                function t() {
                    return e.apply(this, arguments)
                }
                return (
                    (t.toString = function () {
                        return e.toString()
                    }),
                    t
                )
            })(function () {
                var e = setTimeout.apply(void 0, arguments)
                t.add(function () {
                    return clearTimeout(e)
                })
            }),
            add: function (t) {
                e.push(t)
            },
            dispose: function () {
                for (var t, n = Bi(e.splice(0)); !(t = n()).done; ) {
                    ;(0, t.value)()
                }
            },
        }
    return t
}
function cs(e) {
    for (var t, n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r]
    e && o.length > 0 && (t = e.classList).add.apply(t, o)
}
function ds(e) {
    for (var t, n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++) o[r - 1] = arguments[r]
    e && o.length > 0 && (t = e.classList).remove.apply(t, o)
}
function fs(e, t, n, o, r, i) {
    var l,
        s,
        a = us(),
        u =
            void 0 !== i
                ? ((l = i),
                  (s = { called: !1 }),
                  function () {
                      if (!s.called) return (s.called = !0), l.apply(void 0, arguments)
                  })
                : function () {}
    return (
        ds.apply(void 0, [e].concat(r)),
        cs.apply(void 0, [e].concat(t, n)),
        a.nextFrame(function () {
            ds.apply(void 0, [e].concat(n)),
                cs.apply(void 0, [e].concat(o)),
                a.add(
                    (function (e, t) {
                        var n = us()
                        if (!e) return n.dispose
                        var o = getComputedStyle(e),
                            r = [o.transitionDuration, o.transitionDelay].map(function (e) {
                                var t = e
                                    .split(',')
                                    .filter(Boolean)
                                    .map(function (e) {
                                        return e.includes('ms') ? parseFloat(e) : 1e3 * parseFloat(e)
                                    })
                                    .sort(function (e, t) {
                                        return t - e
                                    })[0]
                                return void 0 === t ? 0 : t
                            }),
                            i = r[0],
                            l = r[1]
                        return (
                            0 !== i
                                ? n.setTimeout(function () {
                                      return t(is.Finished)
                                  }, i + l)
                                : t(is.Finished),
                            n.add(function () {
                                return t(is.Cancelled)
                            }),
                            n.dispose
                        )
                    })(e, function (n) {
                        return ds.apply(void 0, [e].concat(o, t)), cs.apply(void 0, [e].concat(r)), u(n)
                    })
                )
        }),
        a.add(function () {
            return ds.apply(void 0, [e].concat(t, n, o, r))
        }),
        a.add(function () {
            return u(is.Cancelled)
        }),
        a.dispose
    )
}
function ps(e) {
    return (
        void 0 === e && (e = ''),
        e.split(' ').filter(function (e) {
            return e.trim().length > 1
        })
    )
}
;((ls = is || (is = {})).Finished = 'finished'), (ls.Cancelled = 'cancelled')
var vs,
    hs,
    ms = Symbol('TransitionContext')
;((hs = vs || (vs = {})).Visible = 'visible'), (hs.Hidden = 'hidden')
var gs = Symbol('NestingContext')
function bs(e) {
    return 'children' in e
        ? bs(e.children)
        : e.value.filter(function (e) {
              return e.state === vs.Visible
          }).length > 0
}
function ys(e) {
    var t = it([]),
        n = it(!1)
    function o(o, r) {
        var i
        void 0 === r && (r = Vi.Hidden)
        var l = t.value.findIndex(function (e) {
            return e.id === o
        })
        ;-1 !== l &&
            ($i(
                r,
                (((i = {})[Vi.Unmount] = function () {
                    t.value.splice(l, 1)
                }),
                (i[Vi.Hidden] = function () {
                    t.value[l].state = vs.Hidden
                }),
                i)
            ),
            !bs(t) && n.value && (null == e || e()))
    }
    return (
        Sn(function () {
            return (n.value = !0)
        }),
        En(function () {
            return (n.value = !1)
        }),
        {
            children: t,
            register: function (e) {
                var n = t.value.find(function (t) {
                    return t.id === e
                })
                return (
                    n ? n.state !== vs.Visible && (n.state = vs.Visible) : t.value.push({ id: e, state: vs.Visible }),
                    function () {
                        return o(e, Vi.Unmount)
                    }
                )
            },
            unregister: o,
        }
    )
}
var ws = Di.RenderStrategy,
    xs = pn({
        props: {
            as: { type: [Object, String], default: 'div' },
            show: { type: [Boolean], default: null },
            unmount: { type: [Boolean], default: !0 },
            appear: { type: [Boolean], default: !1 },
            enter: { type: [String], default: '' },
            enterFrom: { type: [String], default: '' },
            enterTo: { type: [String], default: '' },
            entered: { type: [String], default: '' },
            leave: { type: [String], default: '' },
            leaveFrom: { type: [String], default: '' },
            leaveTo: { type: [String], default: '' },
        },
        emits: ['beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave'],
        render: function () {
            var e = this
            if (this.renderAsRoot)
                return fr(
                    _s,
                    Mi({}, this.$props, {
                        onBeforeEnter: function () {
                            return e.$emit('beforeEnter')
                        },
                        onAfterEnter: function () {
                            return e.$emit('afterEnter')
                        },
                        onBeforeLeave: function () {
                            return e.$emit('beforeLeave')
                        },
                        onAfterLeave: function () {
                            return e.$emit('afterLeave')
                        },
                    }),
                    this.$slots
                )
            return zi({
                props: Mi(
                    {},
                    Ri(this.$props, [
                        'appear',
                        'show',
                        'enter',
                        'enterFrom',
                        'enterTo',
                        'entered',
                        'leave',
                        'leaveFrom',
                        'leaveTo',
                    ]),
                    { ref: 'el' }
                ),
                slot: {},
                slots: this.$slots,
                attrs: this.$attrs,
                features: ws,
                visible: this.state === vs.Visible,
                name: 'TransitionChild',
            })
        },
        setup: function (e, t) {
            var n = t.emit
            if (null === Jt(ms, null) && null !== Tl()) return { renderAsRoot: !0 }
            var o = it(null),
                r = it(vs.Visible),
                i = dr(function () {
                    return e.unmount ? Vi.Unmount : Vi.Hidden
                }),
                l = (function () {
                    var e = Jt(ms, null)
                    if (null === e)
                        throw new Error('A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.')
                    return e
                })(),
                s = l.show,
                a = l.appear,
                u = (function () {
                    var e = Jt(gs, null)
                    if (null === e)
                        throw new Error('A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.')
                    return e
                })(),
                c = u.register,
                d = u.unregister,
                f = { value: !0 },
                p = Gi(),
                v = { value: !1 },
                h = ys(function () {
                    v.value || ((r.value = vs.Hidden), d(p), n('afterLeave'))
                })
            Sn(function () {
                var e = c(p)
                En(e)
            }),
                Qt(function () {
                    var e
                    i.value === Vi.Hidden &&
                        p &&
                        (s && r.value !== vs.Visible
                            ? (r.value = vs.Visible)
                            : $i(
                                  r.value,
                                  (((e = {})[vs.Hidden] = function () {
                                      return d(p)
                                  }),
                                  (e[vs.Visible] = function () {
                                      return c(p)
                                  }),
                                  e)
                              ))
                })
            var m = ps(e.enter),
                g = ps(e.enterFrom),
                b = ps(e.enterTo),
                y = ps(e.entered),
                w = ps(e.leave),
                x = ps(e.leaveFrom),
                _ = ps(e.leaveTo)
            return (
                Sn(function () {
                    Qt(function () {
                        if (r.value === vs.Visible) {
                            var e = Cl(o)
                            if (e instanceof Comment && '' === e.data)
                                throw new Error('Did you forget to passthrough the `ref` to the actual DOM node?')
                        }
                    })
                }),
                Sn(function () {
                    Zt(
                        [s, a],
                        function (e, t, i) {
                            !(function (e) {
                                var t = f.value && !a.value,
                                    i = Cl(o)
                                i &&
                                    i instanceof HTMLElement &&
                                    (t ||
                                        ((v.value = !0),
                                        s.value && n('beforeEnter'),
                                        s.value || n('beforeLeave'),
                                        e(
                                            s.value
                                                ? fs(i, m, g, b, y, function (e) {
                                                      ;(v.value = !1), e === is.Finished && n('afterEnter')
                                                  })
                                                : fs(i, w, x, _, y, function (e) {
                                                      ;(v.value = !1),
                                                          e === is.Finished &&
                                                              (bs(h) || ((r.value = vs.Hidden), d(p), n('afterLeave')))
                                                  })
                                        )))
                            })(i),
                                (f.value = !1)
                        },
                        { immediate: !0 }
                    )
                }),
                Yt(gs, h),
                jl(
                    dr(function () {
                        var e
                        return $i(r.value, (((e = {})[vs.Visible] = Ol.Open), (e[vs.Hidden] = Ol.Closed), e))
                    })
                ),
                { el: o, renderAsRoot: !1, state: r }
            )
        },
    }),
    _s = pn({
        inheritAttrs: !1,
        props: {
            as: { type: [Object, String], default: 'div' },
            show: { type: [Boolean], default: null },
            unmount: { type: [Boolean], default: !0 },
            appear: { type: [Boolean], default: !1 },
            enter: { type: [String], default: '' },
            enterFrom: { type: [String], default: '' },
            enterTo: { type: [String], default: '' },
            entered: { type: [String], default: '' },
            leave: { type: [String], default: '' },
            leaveFrom: { type: [String], default: '' },
            leaveTo: { type: [String], default: '' },
        },
        emits: ['beforeEnter', 'afterEnter', 'beforeLeave', 'afterLeave'],
        render: function () {
            var e = this,
                t = this.$props,
                n = t.unmount,
                o = Ri(t, ['show', 'appear', 'unmount']),
                r = { unmount: n }
            return zi({
                props: Mi({}, r, { as: 'template' }),
                slot: {},
                slots: Mi({}, this.$slots, {
                    default: function () {
                        return [
                            fr(
                                xs,
                                Mi(
                                    {
                                        onBeforeEnter: function () {
                                            return e.$emit('beforeEnter')
                                        },
                                        onAfterEnter: function () {
                                            return e.$emit('afterEnter')
                                        },
                                        onBeforeLeave: function () {
                                            return e.$emit('beforeLeave')
                                        },
                                        onAfterLeave: function () {
                                            return e.$emit('afterLeave')
                                        },
                                    },
                                    e.$attrs,
                                    r,
                                    o
                                ),
                                e.$slots.default
                            ),
                        ]
                    },
                }),
                attrs: {},
                features: ws,
                visible: this.state === vs.Visible,
                name: 'Transition',
            })
        },
        setup: function (e) {
            var t = Tl(),
                n = dr(function () {
                    var n
                    return null === e.show && null !== t
                        ? $i(t.value, (((n = {})[Ol.Open] = !0), (n[Ol.Closed] = !1), n))
                        : e.show
                })
            Qt(function () {
                if (![!0, !1].includes(n.value))
                    throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.')
            })
            var o = it(n.value ? vs.Visible : vs.Hidden),
                r = ys(function () {
                    o.value = vs.Hidden
                }),
                i = { value: !0 },
                l = {
                    show: n,
                    appear: dr(function () {
                        return e.appear || !i.value
                    }),
                }
            return (
                Sn(function () {
                    Qt(function () {
                        ;(i.value = !1), n.value ? (o.value = vs.Visible) : bs(r) || (o.value = vs.Hidden)
                    })
                }),
                Yt(gs, r),
                Yt(ms, l),
                { state: o, show: n }
            )
        },
    })
export {
    mi as $,
    wi as A,
    hi as B,
    li as C,
    Nl as D,
    si as E,
    ko as F,
    ai as G,
    ki as H,
    Jt as I,
    Sn as J,
    On as K,
    es as L,
    xo as M,
    xi as N,
    Ye as O,
    No as P,
    ei as Q,
    no as R,
    qr as S,
    jr as T,
    Gr as U,
    dr as V,
    Et as W,
    Yr as X,
    as as Y,
    di as Z,
    Ci as _,
    Ut as a,
    Fi as a0,
    ji as a1,
    Si as a2,
    yi as a3,
    _i as a4,
    Ai as a5,
    vi as a6,
    Li as a7,
    Oi as a8,
    Ei as a9,
    pi as aa,
    fi as ab,
    Ti as ac,
    bi as ad,
    Yt as ae,
    ti as af,
    ii as ag,
    Io as b,
    Mo as c,
    ts as d,
    ns as e,
    os as f,
    rs as g,
    ci as h,
    gi as i,
    it as j,
    Zt as k,
    yo as l,
    zt as m,
    Wo as n,
    Fo as o,
    Nt as p,
    Uo as q,
    ui as r,
    _s as s,
    c as t,
    xs as u,
    Ul as v,
    Ht as w,
    Hl as x,
    zl as y,
    qo as z,
}

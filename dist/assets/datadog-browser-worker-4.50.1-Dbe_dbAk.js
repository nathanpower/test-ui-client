"use strict";
!function () {
    "use strict";
    function t(t) { for (var e = t.reduce((function (t, e) { return t + e.length; }), 0), a = new Uint8Array(e), n = 0, r = 0, i = t; r < i.length; r++) {
        var s = i[r];
        a.set(s, n), n += s.length;
    } return a; }
    function e(t) { for (var e = t.length; --e >= 0;)
        t[e] = 0; }
    var a = 256, n = 286, r = 30, i = 15, s = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]), _ = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]), h = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]), l = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), o = new Array(576);
    e(o);
    var d = new Array(60);
    e(d);
    var u = new Array(512);
    e(u);
    var f = new Array(256);
    e(f);
    var c = new Array(29);
    e(c);
    var p, g, w, v = new Array(r);
    function b(t, e, a, n, r) { this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = n, this.max_length = r, this.has_stree = t && t.length; }
    function m(t, e) { this.dyn_tree = t, this.max_code = 0, this.stat_desc = e; }
    e(v);
    var y = function (t) { return t < 256 ? u[t] : u[256 + (t >>> 7)]; }, k = function (t, e) { t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255; }, z = function (t, e, a) { t.bi_valid > 16 - a ? (t.bi_buf |= e << t.bi_valid & 65535, k(t, t.bi_buf), t.bi_buf = e >> 16 - t.bi_valid, t.bi_valid += a - 16) : (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a); }, x = function (t, e, a) { z(t, a[2 * e], a[2 * e + 1]); }, A = function (t, e) { var a = 0; do {
        a |= 1 & t, t >>>= 1, a <<= 1;
    } while (--e > 0); return a >>> 1; }, E = function (t, e, a) { var n, r, s = new Array(16), _ = 0; for (n = 1; n <= i; n++)
        s[n] = _ = _ + a[n - 1] << 1; for (r = 0; r <= e; r++) {
        var h = t[2 * r + 1];
        0 !== h && (t[2 * r] = A(s[h]++, h));
    } }, Z = function (t) { var e; for (e = 0; e < n; e++)
        t.dyn_ltree[2 * e] = 0; for (e = 0; e < r; e++)
        t.dyn_dtree[2 * e] = 0; for (e = 0; e < 19; e++)
        t.bl_tree[2 * e] = 0; t.dyn_ltree[512] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0; }, U = function (t) { t.bi_valid > 8 ? k(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf = 0, t.bi_valid = 0; }, S = function (t, e, a, n) { var r = 2 * e, i = 2 * a; return t[r] < t[i] || t[r] === t[i] && n[e] <= n[a]; }, R = function (t, e, a) { for (var n = t.heap[a], r = a << 1; r <= t.heap_len && (r < t.heap_len && S(e, t.heap[r + 1], t.heap[r], t.depth) && r++, !S(e, n, t.heap[r], t.depth));)
        t.heap[a] = t.heap[r], a = r, r <<= 1; t.heap[a] = n; }, L = function (t, e, n) { var r, i, h, l, o = 0; if (0 !== t.last_lit)
        do {
            r = t.pending_buf[t.d_buf + 2 * o] << 8 | t.pending_buf[t.d_buf + 2 * o + 1], i = t.pending_buf[t.l_buf + o], o++, 0 === r ? x(t, i, e) : (h = f[i], x(t, h + a + 1, e), 0 !== (l = s[h]) && (i -= c[h], z(t, i, l)), r--, h = y(r), x(t, h, n), 0 !== (l = _[h]) && (r -= v[h], z(t, r, l)));
        } while (o < t.last_lit); x(t, 256, e); }, F = function (t, e) { var a, n, r, s = e.dyn_tree, _ = e.stat_desc.static_tree, h = e.stat_desc.has_stree, l = e.stat_desc.elems, o = -1; for (t.heap_len = 0, t.heap_max = 573, a = 0; a < l; a++)
        0 !== s[2 * a] ? (t.heap[++t.heap_len] = o = a, t.depth[a] = 0) : s[2 * a + 1] = 0; for (; t.heap_len < 2;)
        s[2 * (r = t.heap[++t.heap_len] = o < 2 ? ++o : 0)] = 1, t.depth[r] = 0, t.opt_len--, h && (t.static_len -= _[2 * r + 1]); for (e.max_code = o, a = t.heap_len >> 1; a >= 1; a--)
        R(t, s, a); r = l; do {
        a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], R(t, s, 1), n = t.heap[1], t.heap[--t.heap_max] = a, t.heap[--t.heap_max] = n, s[2 * r] = s[2 * a] + s[2 * n], t.depth[r] = (t.depth[a] >= t.depth[n] ? t.depth[a] : t.depth[n]) + 1, s[2 * a + 1] = s[2 * n + 1] = r, t.heap[1] = r++, R(t, s, 1);
    } while (t.heap_len >= 2); t.heap[--t.heap_max] = t.heap[1], function (t, e) { var a, n, r, s, _, h, l = e.dyn_tree, o = e.max_code, d = e.stat_desc.static_tree, u = e.stat_desc.has_stree, f = e.stat_desc.extra_bits, c = e.stat_desc.extra_base, p = e.stat_desc.max_length, g = 0; for (s = 0; s <= i; s++)
        t.bl_count[s] = 0; for (l[2 * t.heap[t.heap_max] + 1] = 0, a = t.heap_max + 1; a < 573; a++)
        (s = l[2 * l[2 * (n = t.heap[a]) + 1] + 1] + 1) > p && (s = p, g++), l[2 * n + 1] = s, n > o || (t.bl_count[s]++, _ = 0, n >= c && (_ = f[n - c]), h = l[2 * n], t.opt_len += h * (s + _), u && (t.static_len += h * (d[2 * n + 1] + _))); if (0 !== g) {
        do {
            for (s = p - 1; 0 === t.bl_count[s];)
                s--;
            t.bl_count[s]--, t.bl_count[s + 1] += 2, t.bl_count[p]--, g -= 2;
        } while (g > 0);
        for (s = p; 0 !== s; s--)
            for (n = t.bl_count[s]; 0 !== n;)
                (r = t.heap[--a]) > o || (l[2 * r + 1] !== s && (t.opt_len += (s - l[2 * r + 1]) * l[2 * r], l[2 * r + 1] = s), n--);
    } }(t, e), E(s, o, t.bl_count); }, T = function (t, e, a) { var n, r, i = -1, s = e[1], _ = 0, h = 7, l = 4; for (0 === s && (h = 138, l = 3), e[2 * (a + 1) + 1] = 65535, n = 0; n <= a; n++)
        r = s, s = e[2 * (n + 1) + 1], ++_ < h && r === s || (_ < l ? t.bl_tree[2 * r] += _ : 0 !== r ? (r !== i && t.bl_tree[2 * r]++, t.bl_tree[32]++) : _ <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, _ = 0, i = r, 0 === s ? (h = 138, l = 3) : r === s ? (h = 6, l = 3) : (h = 7, l = 4)); }, I = function (t, e, a) { var n, r, i = -1, s = e[1], _ = 0, h = 7, l = 4; for (0 === s && (h = 138, l = 3), n = 0; n <= a; n++)
        if (r = s, s = e[2 * (n + 1) + 1], !(++_ < h && r === s)) {
            if (_ < l)
                do {
                    x(t, r, t.bl_tree);
                } while (0 != --_);
            else
                0 !== r ? (r !== i && (x(t, r, t.bl_tree), _--), x(t, 16, t.bl_tree), z(t, _ - 3, 2)) : _ <= 10 ? (x(t, 17, t.bl_tree), z(t, _ - 3, 3)) : (x(t, 18, t.bl_tree), z(t, _ - 11, 7));
            _ = 0, i = r, 0 === s ? (h = 138, l = 3) : r === s ? (h = 6, l = 3) : (h = 7, l = 4);
        } }, N = !1, O = function (t, e, a, n) { z(t, 0 + (n ? 1 : 0), 3), function (t, e, a, n) { U(t), n && (k(t, a), k(t, ~a)), t.pending_buf.set(t.window.subarray(e, e + a), t.pending), t.pending += a; }(t, e, a, !0); }, D = function (t, e, n, r) { var i, s, _ = 0; t.level > 0 ? (2 === t.strm.data_type && (t.strm.data_type = function (t) { var e, n = 4093624447; for (e = 0; e <= 31; e++, n >>>= 1)
        if (1 & n && 0 !== t.dyn_ltree[2 * e])
            return 0; if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
        return 1; for (e = 32; e < a; e++)
        if (0 !== t.dyn_ltree[2 * e])
            return 1; return 0; }(t)), F(t, t.l_desc), F(t, t.d_desc), _ = function (t) { var e; for (T(t, t.dyn_ltree, t.l_desc.max_code), T(t, t.dyn_dtree, t.d_desc.max_code), F(t, t.bl_desc), e = 18; e >= 3 && 0 === t.bl_tree[2 * l[e] + 1]; e--)
        ; return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e; }(t), i = t.opt_len + 3 + 7 >>> 3, (s = t.static_len + 3 + 7 >>> 3) <= i && (i = s)) : i = s = n + 5, n + 4 <= i && -1 !== e ? O(t, e, n, r) : 4 === t.strategy || s === i ? (z(t, 2 + (r ? 1 : 0), 3), L(t, o, d)) : (z(t, 4 + (r ? 1 : 0), 3), function (t, e, a, n) { var r; for (z(t, e - 257, 5), z(t, a - 1, 5), z(t, n - 4, 4), r = 0; r < n; r++)
        z(t, t.bl_tree[2 * l[r] + 1], 3); I(t, t.dyn_ltree, e - 1), I(t, t.dyn_dtree, a - 1); }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, _ + 1), L(t, t.dyn_ltree, t.dyn_dtree)), Z(t), r && U(t); }, B = { _tr_init: function (t) { N || (!function () { var t, e, a, l, m, y = new Array(16); for (a = 0, l = 0; l < 28; l++)
            for (c[l] = a, t = 0; t < 1 << s[l]; t++)
                f[a++] = l; for (f[a - 1] = l, m = 0, l = 0; l < 16; l++)
            for (v[l] = m, t = 0; t < 1 << _[l]; t++)
                u[m++] = l; for (m >>= 7; l < r; l++)
            for (v[l] = m << 7, t = 0; t < 1 << _[l] - 7; t++)
                u[256 + m++] = l; for (e = 0; e <= i; e++)
            y[e] = 0; for (t = 0; t <= 143;)
            o[2 * t + 1] = 8, t++, y[8]++; for (; t <= 255;)
            o[2 * t + 1] = 9, t++, y[9]++; for (; t <= 279;)
            o[2 * t + 1] = 7, t++, y[7]++; for (; t <= 287;)
            o[2 * t + 1] = 8, t++, y[8]++; for (E(o, 287, y), t = 0; t < r; t++)
            d[2 * t + 1] = 5, d[2 * t] = A(t, 5); p = new b(o, s, 257, n, i), g = new b(d, _, 0, r, i), w = new b(new Array(0), h, 0, 19, 7); }(), N = !0), t.l_desc = new m(t.dyn_ltree, p), t.d_desc = new m(t.dyn_dtree, g), t.bl_desc = new m(t.bl_tree, w), t.bi_buf = 0, t.bi_valid = 0, Z(t); }, _tr_stored_block: O, _tr_flush_block: D, _tr_tally: function (t, e, n) { return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & n, t.last_lit++, 0 === e ? t.dyn_ltree[2 * n]++ : (t.matches++, e--, t.dyn_ltree[2 * (f[n] + a + 1)]++, t.dyn_dtree[2 * y(e)]++), t.last_lit === t.lit_bufsize - 1; }, _tr_align: function (t) { z(t, 2, 3), x(t, 256, o), function (t) { 16 === t.bi_valid ? (k(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8); }(t); } }, C = function (t, e, a, n) { for (var r = 65535 & t | 0, i = t >>> 16 & 65535 | 0, s = 0; 0 !== a;) {
        a -= s = a > 2e3 ? 2e3 : a;
        do {
            i = i + (r = r + e[n++] | 0) | 0;
        } while (--s);
        r %= 65521, i %= 65521;
    } return r | i << 16 | 0; }, H = new Uint32Array(function () { for (var t, e = [], a = 0; a < 256; a++) {
        t = a;
        for (var n = 0; n < 8; n++)
            t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
        e[a] = t;
    } return e; }()), M = function (t, e, a, n) { var r = H, i = n + a; t ^= -1; for (var s = n; s < i; s++)
        t = t >>> 8 ^ r[255 & (t ^ e[s])]; return -1 ^ t; }, Y = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" }, K = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_MEM_ERROR: -4, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 }, P = B._tr_init, j = B._tr_stored_block, G = B._tr_flush_block, X = B._tr_tally, W = B._tr_align, q = K.Z_NO_FLUSH, J = K.Z_PARTIAL_FLUSH, Q = K.Z_FULL_FLUSH, V = K.Z_FINISH, $ = K.Z_BLOCK, tt = K.Z_OK, et = K.Z_STREAM_END, at = K.Z_STREAM_ERROR, nt = K.Z_DATA_ERROR, rt = K.Z_BUF_ERROR, it = K.Z_DEFAULT_COMPRESSION, st = K.Z_FILTERED, _t = K.Z_HUFFMAN_ONLY, ht = K.Z_RLE, lt = K.Z_FIXED, ot = K.Z_DEFAULT_STRATEGY, dt = K.Z_UNKNOWN, ut = K.Z_DEFLATED, ft = 258, ct = 262, pt = 103, gt = 113, wt = 666, vt = function (t, e) { return t.msg = Y[e], e; }, bt = function (t) { return (t << 1) - (t > 4 ? 9 : 0); }, mt = function (t) { for (var e = t.length; --e >= 0;)
        t[e] = 0; }, yt = function (t, e, a) { return (e << t.hash_shift ^ a) & t.hash_mask; }, kt = function (t) { var e = t.state, a = e.pending; a > t.avail_out && (a = t.avail_out), 0 !== a && (t.output.set(e.pending_buf.subarray(e.pending_out, e.pending_out + a), t.next_out), t.next_out += a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 0 === e.pending && (e.pending_out = 0)); }, zt = function (t, e) { G(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start = t.strstart, kt(t.strm); }, xt = function (t, e) { t.pending_buf[t.pending++] = e; }, At = function (t, e) { t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e; }, Et = function (t, e) { var a, n, r = t.max_chain_length, i = t.strstart, s = t.prev_length, _ = t.nice_match, h = t.strstart > t.w_size - ct ? t.strstart - (t.w_size - ct) : 0, l = t.window, o = t.w_mask, d = t.prev, u = t.strstart + ft, f = l[i + s - 1], c = l[i + s]; t.prev_length >= t.good_match && (r >>= 2), _ > t.lookahead && (_ = t.lookahead); do {
        if (l[(a = e) + s] === c && l[a + s - 1] === f && l[a] === l[i] && l[++a] === l[i + 1]) {
            i += 2, a++;
            do { } while (l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && l[++i] === l[++a] && i < u);
            if (n = ft - (u - i), i = u - ft, n > s) {
                if (t.match_start = e, s = n, n >= _)
                    break;
                f = l[i + s - 1], c = l[i + s];
            }
        }
    } while ((e = d[e & o]) > h && 0 != --r); return s <= t.lookahead ? s : t.lookahead; }, Zt = function (t) { var e, a, n, r, i, s, _, h, l, o, d = t.w_size; do {
        if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= d + (d - ct)) {
            t.window.set(t.window.subarray(d, d + d), 0), t.match_start -= d, t.strstart -= d, t.block_start -= d, e = a = t.hash_size;
            do {
                n = t.head[--e], t.head[e] = n >= d ? n - d : 0;
            } while (--a);
            e = a = d;
            do {
                n = t.prev[--e], t.prev[e] = n >= d ? n - d : 0;
            } while (--a);
            r += d;
        }
        if (0 === t.strm.avail_in)
            break;
        if (s = t.strm, _ = t.window, h = t.strstart + t.lookahead, l = r, o = void 0, (o = s.avail_in) > l && (o = l), a = 0 === o ? 0 : (s.avail_in -= o, _.set(s.input.subarray(s.next_in, s.next_in + o), h), 1 === s.state.wrap ? s.adler = C(s.adler, _, o, h) : 2 === s.state.wrap && (s.adler = M(s.adler, _, o, h)), s.next_in += o, s.total_in += o, o), t.lookahead += a, t.lookahead + t.insert >= 3)
            for (i = t.strstart - t.insert, t.ins_h = t.window[i], t.ins_h = yt(t, t.ins_h, t.window[i + 1]); t.insert && (t.ins_h = yt(t, t.ins_h, t.window[i + 3 - 1]), t.prev[i & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead + t.insert < 3));)
                ;
    } while (t.lookahead < ct && 0 !== t.strm.avail_in); }, Ut = function (t, e) { for (var a, n;;) {
        if (t.lookahead < ct) {
            if (Zt(t), t.lookahead < ct && e === q)
                return 1;
            if (0 === t.lookahead)
                break;
        }
        if (a = 0, t.lookahead >= 3 && (t.ins_h = yt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), 0 !== a && t.strstart - a <= t.w_size - ct && (t.match_length = Et(t, a)), t.match_length >= 3)
            if (n = X(t, t.strstart - t.match_start, t.match_length - 3), t.lookahead -= t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= 3) {
                t.match_length--;
                do {
                    t.strstart++, t.ins_h = yt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart;
                } while (0 != --t.match_length);
                t.strstart++;
            }
            else
                t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h = yt(t, t.ins_h, t.window[t.strstart + 1]);
        else
            n = X(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
        if (n && (zt(t, !1), 0 === t.strm.avail_out))
            return 1;
    } return t.insert = t.strstart < 2 ? t.strstart : 2, e === V ? (zt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (zt(t, !1), 0 === t.strm.avail_out) ? 1 : 2; }, St = function (t, e) { for (var a, n, r;;) {
        if (t.lookahead < ct) {
            if (Zt(t), t.lookahead < ct && e === q)
                return 1;
            if (0 === t.lookahead)
                break;
        }
        if (a = 0, t.lookahead >= 3 && (t.ins_h = yt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length = 2, 0 !== a && t.prev_length < t.max_lazy_match && t.strstart - a <= t.w_size - ct && (t.match_length = Et(t, a), t.match_length <= 5 && (t.strategy === st || 3 === t.match_length && t.strstart - t.match_start > 4096) && (t.match_length = 2)), t.prev_length >= 3 && t.match_length <= t.prev_length) {
            r = t.strstart + t.lookahead - 3, n = X(t, t.strstart - 1 - t.prev_match, t.prev_length - 3), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
            do {
                ++t.strstart <= r && (t.ins_h = yt(t, t.ins_h, t.window[t.strstart + 3 - 1]), a = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = t.strstart);
            } while (0 != --t.prev_length);
            if (t.match_available = 0, t.match_length = 2, t.strstart++, n && (zt(t, !1), 0 === t.strm.avail_out))
                return 1;
        }
        else if (t.match_available) {
            if ((n = X(t, 0, t.window[t.strstart - 1])) && zt(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)
                return 1;
        }
        else
            t.match_available = 1, t.strstart++, t.lookahead--;
    } return t.match_available && (n = X(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert = t.strstart < 2 ? t.strstart : 2, e === V ? (zt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (zt(t, !1), 0 === t.strm.avail_out) ? 1 : 2; };
    function Rt(t, e, a, n, r) { this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = n, this.func = r; }
    var Lt = [new Rt(0, 0, 0, 0, (function (t, e) { var a = 65535; for (a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5);;) {
            if (t.lookahead <= 1) {
                if (Zt(t), 0 === t.lookahead && e === q)
                    return 1;
                if (0 === t.lookahead)
                    break;
            }
            t.strstart += t.lookahead, t.lookahead = 0;
            var n = t.block_start + a;
            if ((0 === t.strstart || t.strstart >= n) && (t.lookahead = t.strstart - n, t.strstart = n, zt(t, !1), 0 === t.strm.avail_out))
                return 1;
            if (t.strstart - t.block_start >= t.w_size - ct && (zt(t, !1), 0 === t.strm.avail_out))
                return 1;
        } return t.insert = 0, e === V ? (zt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (zt(t, !1), t.strm.avail_out), 1); })), new Rt(4, 4, 8, 4, Ut), new Rt(4, 5, 16, 8, Ut), new Rt(4, 6, 32, 32, Ut), new Rt(4, 4, 16, 16, St), new Rt(8, 16, 32, 32, St), new Rt(8, 16, 128, 128, St), new Rt(8, 32, 128, 256, St), new Rt(32, 128, 258, 1024, St), new Rt(32, 258, 258, 4096, St)];
    function Ft() { this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = ut, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(1146), this.dyn_dtree = new Uint16Array(122), this.bl_tree = new Uint16Array(78), mt(this.dyn_ltree), mt(this.dyn_dtree), mt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new Uint16Array(16), this.heap = new Uint16Array(573), mt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new Uint16Array(573), mt(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0; }
    var Tt = function (t) { if (!t || !t.state)
        return vt(t, at); t.total_in = t.total_out = 0, t.data_type = dt; var e = t.state; return e.pending = 0, e.pending_out = 0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? 42 : gt, t.adler = 2 === e.wrap ? 0 : 1, e.last_flush = q, P(e), tt; }, It = function (t) { var e, a = Tt(t); return a === tt && ((e = t.state).window_size = 2 * e.w_size, mt(e.head), e.max_lazy_match = Lt[e.level].max_lazy, e.good_match = Lt[e.level].good_length, e.nice_match = Lt[e.level].nice_length, e.max_chain_length = Lt[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0), a; }, Nt = function (t, e, a, n, r, i) { if (!t)
        return at; var s = 1; if (e === it && (e = 6), n < 0 ? (s = 0, n = -n) : n > 15 && (s = 2, n -= 16), r < 1 || r > 9 || a !== ut || n < 8 || n > 15 || e < 0 || e > 9 || i < 0 || i > lt)
        return vt(t, at); 8 === n && (n = 9); var _ = new Ft; return t.state = _, _.strm = t, _.wrap = s, _.gzhead = null, _.w_bits = n, _.w_size = 1 << _.w_bits, _.w_mask = _.w_size - 1, _.hash_bits = r + 7, _.hash_size = 1 << _.hash_bits, _.hash_mask = _.hash_size - 1, _.hash_shift = ~~((_.hash_bits + 3 - 1) / 3), _.window = new Uint8Array(2 * _.w_size), _.head = new Uint16Array(_.hash_size), _.prev = new Uint16Array(_.w_size), _.lit_bufsize = 1 << r + 6, _.pending_buf_size = 4 * _.lit_bufsize, _.pending_buf = new Uint8Array(_.pending_buf_size), _.d_buf = 1 * _.lit_bufsize, _.l_buf = 3 * _.lit_bufsize, _.level = e, _.strategy = i, _.method = a, It(t); }, Ot = { deflateInit: function (t, e) { return Nt(t, e, ut, 15, 8, ot); }, deflateInit2: Nt, deflateReset: It, deflateResetKeep: Tt, deflateSetHeader: function (t, e) { return t && t.state ? 2 !== t.state.wrap ? at : (t.state.gzhead = e, tt) : at; }, deflate: function (t, e) { var a, n; if (!t || !t.state || e > $ || e < 0)
            return t ? vt(t, at) : at; var r = t.state; if (!t.output || !t.input && 0 !== t.avail_in || r.status === wt && e !== V)
            return vt(t, 0 === t.avail_out ? rt : at); r.strm = t; var i = r.last_flush; if (r.last_flush = e, 42 === r.status)
            if (2 === r.wrap)
                t.adler = 0, xt(r, 31), xt(r, 139), xt(r, 8), r.gzhead ? (xt(r, (r.gzhead.text ? 1 : 0) + (r.gzhead.hcrc ? 2 : 0) + (r.gzhead.extra ? 4 : 0) + (r.gzhead.name ? 8 : 0) + (r.gzhead.comment ? 16 : 0)), xt(r, 255 & r.gzhead.time), xt(r, r.gzhead.time >> 8 & 255), xt(r, r.gzhead.time >> 16 & 255), xt(r, r.gzhead.time >> 24 & 255), xt(r, 9 === r.level ? 2 : r.strategy >= _t || r.level < 2 ? 4 : 0), xt(r, 255 & r.gzhead.os), r.gzhead.extra && r.gzhead.extra.length && (xt(r, 255 & r.gzhead.extra.length), xt(r, r.gzhead.extra.length >> 8 & 255)), r.gzhead.hcrc && (t.adler = M(t.adler, r.pending_buf, r.pending, 0)), r.gzindex = 0, r.status = 69) : (xt(r, 0), xt(r, 0), xt(r, 0), xt(r, 0), xt(r, 0), xt(r, 9 === r.level ? 2 : r.strategy >= _t || r.level < 2 ? 4 : 0), xt(r, 3), r.status = gt);
            else {
                var s = ut + (r.w_bits - 8 << 4) << 8;
                s |= (r.strategy >= _t || r.level < 2 ? 0 : r.level < 6 ? 1 : 6 === r.level ? 2 : 3) << 6, 0 !== r.strstart && (s |= 32), s += 31 - s % 31, r.status = gt, At(r, s), 0 !== r.strstart && (At(r, t.adler >>> 16), At(r, 65535 & t.adler)), t.adler = 1;
            } if (69 === r.status)
            if (r.gzhead.extra) {
                for (a = r.pending; r.gzindex < (65535 & r.gzhead.extra.length) && (r.pending !== r.pending_buf_size || (r.gzhead.hcrc && r.pending > a && (t.adler = M(t.adler, r.pending_buf, r.pending - a, a)), kt(t), a = r.pending, r.pending !== r.pending_buf_size));)
                    xt(r, 255 & r.gzhead.extra[r.gzindex]), r.gzindex++;
                r.gzhead.hcrc && r.pending > a && (t.adler = M(t.adler, r.pending_buf, r.pending - a, a)), r.gzindex === r.gzhead.extra.length && (r.gzindex = 0, r.status = 73);
            }
            else
                r.status = 73; if (73 === r.status)
            if (r.gzhead.name) {
                a = r.pending;
                do {
                    if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (t.adler = M(t.adler, r.pending_buf, r.pending - a, a)), kt(t), a = r.pending, r.pending === r.pending_buf_size)) {
                        n = 1;
                        break;
                    }
                    n = r.gzindex < r.gzhead.name.length ? 255 & r.gzhead.name.charCodeAt(r.gzindex++) : 0, xt(r, n);
                } while (0 !== n);
                r.gzhead.hcrc && r.pending > a && (t.adler = M(t.adler, r.pending_buf, r.pending - a, a)), 0 === n && (r.gzindex = 0, r.status = 91);
            }
            else
                r.status = 91; if (91 === r.status)
            if (r.gzhead.comment) {
                a = r.pending;
                do {
                    if (r.pending === r.pending_buf_size && (r.gzhead.hcrc && r.pending > a && (t.adler = M(t.adler, r.pending_buf, r.pending - a, a)), kt(t), a = r.pending, r.pending === r.pending_buf_size)) {
                        n = 1;
                        break;
                    }
                    n = r.gzindex < r.gzhead.comment.length ? 255 & r.gzhead.comment.charCodeAt(r.gzindex++) : 0, xt(r, n);
                } while (0 !== n);
                r.gzhead.hcrc && r.pending > a && (t.adler = M(t.adler, r.pending_buf, r.pending - a, a)), 0 === n && (r.status = pt);
            }
            else
                r.status = pt; if (r.status === pt && (r.gzhead.hcrc ? (r.pending + 2 > r.pending_buf_size && kt(t), r.pending + 2 <= r.pending_buf_size && (xt(r, 255 & t.adler), xt(r, t.adler >> 8 & 255), t.adler = 0, r.status = gt)) : r.status = gt), 0 !== r.pending) {
            if (kt(t), 0 === t.avail_out)
                return r.last_flush = -1, tt;
        }
        else if (0 === t.avail_in && bt(e) <= bt(i) && e !== V)
            return vt(t, rt); if (r.status === wt && 0 !== t.avail_in)
            return vt(t, rt); if (0 !== t.avail_in || 0 !== r.lookahead || e !== q && r.status !== wt) {
            var _ = r.strategy === _t ? function (t, e) { for (var a;;) {
                if (0 === t.lookahead && (Zt(t), 0 === t.lookahead)) {
                    if (e === q)
                        return 1;
                    break;
                }
                if (t.match_length = 0, a = X(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, a && (zt(t, !1), 0 === t.strm.avail_out))
                    return 1;
            } return t.insert = 0, e === V ? (zt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (zt(t, !1), 0 === t.strm.avail_out) ? 1 : 2; }(r, e) : r.strategy === ht ? function (t, e) { for (var a, n, r, i, s = t.window;;) {
                if (t.lookahead <= ft) {
                    if (Zt(t), t.lookahead <= ft && e === q)
                        return 1;
                    if (0 === t.lookahead)
                        break;
                }
                if (t.match_length = 0, t.lookahead >= 3 && t.strstart > 0 && (n = s[r = t.strstart - 1]) === s[++r] && n === s[++r] && n === s[++r]) {
                    i = t.strstart + ft;
                    do { } while (n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && r < i);
                    t.match_length = ft - (i - r), t.match_length > t.lookahead && (t.match_length = t.lookahead);
                }
                if (t.match_length >= 3 ? (a = X(t, 1, t.match_length - 3), t.lookahead -= t.match_length, t.strstart += t.match_length, t.match_length = 0) : (a = X(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), a && (zt(t, !1), 0 === t.strm.avail_out))
                    return 1;
            } return t.insert = 0, e === V ? (zt(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (zt(t, !1), 0 === t.strm.avail_out) ? 1 : 2; }(r, e) : Lt[r.level].func(r, e);
            if (3 !== _ && 4 !== _ || (r.status = wt), 1 === _ || 3 === _)
                return 0 === t.avail_out && (r.last_flush = -1), tt;
            if (2 === _ && (e === J ? W(r) : e !== $ && (j(r, 0, 0, !1), e === Q && (mt(r.head), 0 === r.lookahead && (r.strstart = 0, r.block_start = 0, r.insert = 0))), kt(t), 0 === t.avail_out))
                return r.last_flush = -1, tt;
        } return e !== V ? tt : r.wrap <= 0 ? et : (2 === r.wrap ? (xt(r, 255 & t.adler), xt(r, t.adler >> 8 & 255), xt(r, t.adler >> 16 & 255), xt(r, t.adler >> 24 & 255), xt(r, 255 & t.total_in), xt(r, t.total_in >> 8 & 255), xt(r, t.total_in >> 16 & 255), xt(r, t.total_in >> 24 & 255)) : (At(r, t.adler >>> 16), At(r, 65535 & t.adler)), kt(t), r.wrap > 0 && (r.wrap = -r.wrap), 0 !== r.pending ? tt : et); }, deflateEnd: function (t) { if (!t || !t.state)
            return at; var e = t.state.status; return 42 !== e && 69 !== e && 73 !== e && 91 !== e && e !== pt && e !== gt && e !== wt ? vt(t, at) : (t.state = null, e === gt ? vt(t, nt) : tt); }, deflateSetDictionary: function (t, e) { var a = e.length; if (!t || !t.state)
            return at; var n = t.state, r = n.wrap; if (2 === r || 1 === r && 42 !== n.status || n.lookahead)
            return at; if (1 === r && (t.adler = C(t.adler, e, a, 0)), n.wrap = 0, a >= n.w_size) {
            0 === r && (mt(n.head), n.strstart = 0, n.block_start = 0, n.insert = 0);
            var i = new Uint8Array(n.w_size);
            i.set(e.subarray(a - n.w_size, a), 0), e = i, a = n.w_size;
        } var s = t.avail_in, _ = t.next_in, h = t.input; for (t.avail_in = a, t.next_in = 0, t.input = e, Zt(n); n.lookahead >= 3;) {
            var l = n.strstart, o = n.lookahead - 2;
            do {
                n.ins_h = yt(n, n.ins_h, n.window[l + 3 - 1]), n.prev[l & n.w_mask] = n.head[n.ins_h], n.head[n.ins_h] = l, l++;
            } while (--o);
            n.strstart = l, n.lookahead = 2, Zt(n);
        } return n.strstart += n.lookahead, n.block_start = n.strstart, n.insert = n.lookahead, n.lookahead = 0, n.match_length = n.prev_length = 2, n.match_available = 0, t.next_in = _, t.input = h, t.avail_in = s, n.wrap = r, tt; }, deflateInfo: "pako deflate (from Nodeca project)" };
    for (var Dt = new Uint8Array(256), Bt = 0; Bt < 256; Bt++)
        Dt[Bt] = Bt >= 252 ? 6 : Bt >= 248 ? 5 : Bt >= 240 ? 4 : Bt >= 224 ? 3 : Bt >= 192 ? 2 : 1;
    Dt[254] = Dt[254] = 1;
    var Ct = function () { this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0; }, Ht = Object.prototype.toString, Mt = K.Z_NO_FLUSH, Yt = K.Z_SYNC_FLUSH, Kt = K.Z_FULL_FLUSH, Pt = K.Z_FINISH, jt = K.Z_OK, Gt = K.Z_STREAM_END, Xt = K.Z_DEFAULT_COMPRESSION, Wt = K.Z_DEFAULT_STRATEGY, qt = K.Z_DEFLATED;
    function Jt() { this.options = { level: Xt, method: qt, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: Wt }; var t = this.options; t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new Ct, this.strm.avail_out = 0; var e = Ot.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy); if (e !== jt)
        throw new Error(Y[e]); if (t.header && Ot.deflateSetHeader(this.strm, t.header), t.dictionary) {
        var a;
        if (a = "[object ArrayBuffer]" === Ht.call(t.dictionary) ? new Uint8Array(t.dictionary) : t.dictionary, (e = Ot.deflateSetDictionary(this.strm, a)) !== jt)
            throw new Error(Y[e]);
        this._dict_set = !0;
    } }
    function Qt(t, e, a) { try {
        t.postMessage({ type: "errored", error: e, streamId: a });
    }
    catch (n) {
        t.postMessage({ type: "errored", error: String(e), streamId: a });
    } }
    function Vt(t) { var e = t.strm.adler; return new Uint8Array([3, 0, e >>> 24 & 255, e >>> 16 & 255, e >>> 8 & 255, 255 & e]); }
    Jt.prototype.push = function (t, e) { var a, n, r = this.strm, i = this.options.chunkSize; if (this.ended)
        return !1; for (n = e === ~~e ? e : !0 === e ? Pt : Mt, "[object ArrayBuffer]" === Ht.call(t) ? r.input = new Uint8Array(t) : r.input = t, r.next_in = 0, r.avail_in = r.input.length;;)
        if (0 === r.avail_out && (r.output = new Uint8Array(i), r.next_out = 0, r.avail_out = i), (n === Yt || n === Kt) && r.avail_out <= 6)
            this.onData(r.output.subarray(0, r.next_out)), r.avail_out = 0;
        else {
            if ((a = Ot.deflate(r, n)) === Gt)
                return r.next_out > 0 && this.onData(r.output.subarray(0, r.next_out)), a = Ot.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === jt;
            if (0 !== r.avail_out) {
                if (n > 0 && r.next_out > 0)
                    this.onData(r.output.subarray(0, r.next_out)), r.avail_out = 0;
                else if (0 === r.avail_in)
                    break;
            }
            else
                this.onData(r.output);
        } return !0; }, Jt.prototype.onData = function (t) { this.chunks.push(t); }, Jt.prototype.onEnd = function (t) { t === jt && (this.result = function (t) { for (var e = 0, a = 0, n = t.length; a < n; a++)
        e += t[a].length; for (var r = new Uint8Array(e), i = 0, s = 0, _ = t.length; i < _; i++) {
        var h = t[i];
        r.set(h, s), s += h.length;
    } return r; }(this.chunks)), this.chunks = [], this.err = t, this.msg = this.strm.msg; }, function (e) { void 0 === e && (e = self); try {
        var a = new Map;
        e.addEventListener("message", (function (n) { try {
            var r = function (e, a) { switch (a.action) {
                case "init": return { type: "initialized", version: "4.50.1" };
                case "write":
                    var n = e.get(a.streamId);
                    n || (n = new Jt, e.set(a.streamId, n));
                    var r = n.chunks.length, i = function (t) { if ("function" == typeof TextEncoder && TextEncoder.prototype.encode)
                        return (new TextEncoder).encode(t); var e, a, n, r, i, s = t.length, _ = 0; for (r = 0; r < s; r++)
                        55296 == (64512 & (a = t.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), r++), _ += a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4; for (e = new Uint8Array(_), i = 0, r = 0; i < _; r++)
                        55296 == (64512 & (a = t.charCodeAt(r))) && r + 1 < s && 56320 == (64512 & (n = t.charCodeAt(r + 1))) && (a = 65536 + (a - 55296 << 10) + (n - 56320), r++), a < 128 ? e[i++] = a : a < 2048 ? (e[i++] = 192 | a >>> 6, e[i++] = 128 | 63 & a) : a < 65536 ? (e[i++] = 224 | a >>> 12, e[i++] = 128 | a >>> 6 & 63, e[i++] = 128 | 63 & a) : (e[i++] = 240 | a >>> 18, e[i++] = 128 | a >>> 12 & 63, e[i++] = 128 | a >>> 6 & 63, e[i++] = 128 | 63 & a); return e; }(a.data);
                    return n.push(i, K.Z_SYNC_FLUSH), { type: "wrote", id: a.id, streamId: a.streamId, result: t(n.chunks.slice(r)), trailer: Vt(n), additionalBytesCount: i.length };
                case "reset": e.delete(a.streamId);
            } }(a, n.data);
            r && e.postMessage(r);
        }
        catch (t) {
            Qt(e, t, n.data && "streamId" in n.data ? n.data.streamId : void 0);
        } }));
    }
    catch (t) {
        Qt(e, t);
    } }();
}();

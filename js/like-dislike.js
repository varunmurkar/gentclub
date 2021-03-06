/**
 * like-dislike.min.js v1.0.0
 *
 * jQuery rating plugin, https://github.com/uagrace/like-dislike
 *
 * Copyright 2016 Maxim Tkachuk <mxtkachuk@gmail.com>
 *
 * Licensed under the MIT license
 */
! function(t) {
    function s(s, i) {
        this.element = s, this.opts = t.extend({}, n, i), this.init()
    }
    var i = "like",
        e = "dislike",
        n = {
            click: null,
            beforeClick: null,
            initialValue: 0,
            reverseMode: !0,
            readOnly: !1,
            likeBtnClass: "like",
            dislikeBtnClass: "dislike",
            activeClass: "active",
            disabledClass: "disabled"
        };
    s.prototype = {
        init: function() {
            if (this.btns = t(this.element).find("." + this.opts.likeBtnClass + ", ." + this.opts.dislikeBtnClass), this.readOnly(this.opts.readOnly), 0 !== this.opts.initialValue) {
                var s = 1 === this.opts.initialValue ? i : e;
                this.btnDown(s)
            }
            return this
        },
        readOnly: function(t) {
            var s = this.btns;
            if (t) this.disable(s);
            else {
                if (!this.opts.reverseMode) {
                    var i = s.not("." + this.opts.activeClass);
                    i.length && (s = i)
                }
                this.enable(s)
            }
        },
        getBtn: function(s) {
            return s === i ? t(this.element).find("." + this.opts.likeBtnClass) : s === e ? t(this.element).find("." + this.opts.dislikeBtnClass) : void t.error("Wrong btnType: " + s)
        },
        btnDown: function(t) {
            var s = this.getBtn(t);
            s.addClass(this.opts.activeClass), this.opts.reverseMode || this.disable(s)
        },
        btnUp: function(t) {
            var s = this.getBtn(t);
            s.removeClass(this.opts.activeClass), this.opts.reverseMode || this.enable(s)
        },
        enable: function(s) {
            var n = this,
                l = n.opts;
            s.removeClass(l.disabledClass), l.beforeClick && s.on("beforeClick", function(t) {
                return l.beforeClick.call(n, t)
            }), s.on("click", function(s) {
                var a = t(this);
                if (l.beforeClick && !a.triggerHandler("beforeClick")) return !1;
                var o = a.hasClass(l.likeBtnClass) ? i : e,
                    r = n.btns.hasClass(l.activeClass),
                    h = a.hasClass(l.activeClass),
                    d = 0,
                    b = 0,
                    c = 0;
                l.reverseMode ? o === i ? h ? (n.btnUp(i), b = -1) : (n.btnUp(e), n.btnDown(i), c = r ? -1 : c, b = 1, d = 1) : h ? (n.btnUp(e), c = -1) : (n.btnUp(i), n.btnDown(e), b = r ? -1 : b, c = 1, d = -1) : o === i ? r ? (n.btnUp(e), n.btnDown(i), c = h ? c : -1, b = 1, d = h ? d : 1) : (n.btnDown(i), b = 1, d = 1) : r ? (n.btnUp(i), n.btnDown(e), b = h ? b : -1, c = 1, d = h ? d : -1) : (n.btnDown(e), c = 1, d = -1), l.click.call(n, d, b, c, s)
            })
        },
        disable: function(t) {
            t.addClass(this.opts.disabledClass), t.off()
        }
    }, t.fn.likeDislike = function(i) {
        return this.each(function() {
            t.data(this, "plugin_LikeDislike") || t.data(this, "plugin_LikeDislike", new s(this, i))
        })
    }
}(jQuery);
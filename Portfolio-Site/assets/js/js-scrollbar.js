/*** JQUERY SCROLLBAR FILE ***/
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], b)
    : b(a.jQuery);
})(this, function (a) {
  "use strict";
  function h(b) {
    if (c.webkit && !b) return { height: 0, width: 0 };
    if (!c.data.outer) {
      var d = {
        border: "none",
        "box-sizing": "content-box",
        height: "200px",
        margin: "0",
        padding: "0",
        width: "200px",
      };
      (c.data.inner = a("<div>").css(a.extend({}, d))),
        (c.data.outer = a("<div>")
          .css(
            a.extend(
              {
                left: "-1000px",
                overflow: "scroll",
                position: "absolute",
                top: "-1000px",
              },
              d
            )
          )
          .append(c.data.inner)
          .appendTo("body"));
    }
    return (
      c.data.outer.scrollLeft(1e3).scrollTop(1e3),
      {
        height: Math.ceil(
          c.data.outer.offset().top - c.data.inner.offset().top || 0
        ),
        width: Math.ceil(
          c.data.outer.offset().left - c.data.inner.offset().left || 0
        ),
      }
    );
  }
  function i() {
    var a = h(!0);
    return !(a.height || a.width);
  }
  function j(a) {
    var b = a.originalEvent;
    return (!b.axis || b.axis !== b.HORIZONTAL_AXIS) && !b.wheelDeltaX;
  }
  var b = !1,
    c = {
      data: { index: 0, name: "scrollbar" },
      macosx: /mac/i.test(navigator.platform),
      mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(
        navigator.userAgent
      ),
      overlay: null,
      scroll: null,
      scrolls: [],
      webkit:
        /webkit/i.test(navigator.userAgent) &&
        !/edge\/\d+/i.test(navigator.userAgent),
    };
  (c.scrolls.add = function (a) {
    this.remove(a).push(a);
  }),
    (c.scrolls.remove = function (b) {
      for (; a.inArray(b, this) >= 0; ) this.splice(a.inArray(b, this), 1);
      return this;
    });
  var d = {
      autoScrollSize: !0,
      autoUpdate: !0,
      debug: !1,
      disableBodyScroll: !1,
      duration: 200,
      ignoreMobile: !1,
      ignoreOverlay: !1,
      scrollStep: 30,
      showArrows: !1,
      stepScrolling: !0,
      scrollx: null,
      scrolly: null,
      onDestroy: null,
      onInit: null,
      onScroll: null,
      onUpdate: null,
    },
    e = function (b) {
      c.scroll ||
        ((c.overlay = i()),
        (c.scroll = h()),
        g(),
        a(window).resize(function () {
          var a = !1;
          if (c.scroll && (c.scroll.height || c.scroll.width)) {
            var b = h();
            (b.height === c.scroll.height && b.width === c.scroll.width) ||
              ((c.scroll = b), (a = !0));
          }
          g(a);
        })),
        (this.container = b),
        (this.namespace = ".scrollbar_" + c.data.index++),
        (this.options = a.extend({}, d, window.jQueryScrollbarOptions || {})),
        (this.scrollTo = null),
        (this.scrollx = {}),
        (this.scrolly = {}),
        b.data(c.data.name, this),
        c.scrolls.add(this);
    };
  e.prototype = {
    destroy: function () {
      if (this.wrapper) {
        this.container.removeData(c.data.name), c.scrolls.remove(this);
        var b = this.container.scrollLeft(),
          d = this.container.scrollTop();
        this.container
          .insertBefore(this.wrapper)
          .css({ height: "", margin: "", "max-height": "" })
          .removeClass(
            "scroll-content scroll-scrollx_visible scroll-scrolly_visible"
          )
          .off(this.namespace)
          .scrollLeft(b)
          .scrollTop(d),
          this.scrollx.scroll
            .removeClass("scroll-scrollx_visible")
            .find("div")
            .andSelf()
            .off(this.namespace),
          this.scrolly.scroll
            .removeClass("scroll-scrolly_visible")
            .find("div")
            .andSelf()
            .off(this.namespace),
          this.wrapper.remove(),
          a(document).add("body").off(this.namespace),
          a.isFunction(this.options.onDestroy) &&
            this.options.onDestroy.apply(this, [this.container]);
      }
    },
    init: function (b) {
      var d = this,
        e = this.container,
        f = this.containerWrapper || e,
        g = this.namespace,
        h = a.extend(this.options, b || {}),
        i = { x: this.scrollx, y: this.scrolly },
        k = this.wrapper,
        l = { scrollLeft: e.scrollLeft(), scrollTop: e.scrollTop() };
      if (
        (c.mobile && h.ignoreMobile) ||
        (c.overlay && h.ignoreOverlay) ||
        (c.macosx && !c.webkit)
      )
        return !1;
      if (k)
        f.css({
          height: "auto",
          "margin-bottom": c.scroll.height * -1 + "px",
          "margin-right": c.scroll.width * -1 + "px",
          "max-height": "",
        });
      else {
        if (
          ((this.wrapper = k =
            a("<div>")
              .addClass("scroll-wrapper")
              .addClass(e.attr("class"))
              .css(
                "position",
                "absolute" == e.css("position") ? "absolute" : "relative"
              )
              .insertBefore(e)
              .append(e)),
          e.is("textarea") &&
            ((this.containerWrapper = f = a("<div>").insertBefore(e).append(e)),
            k.addClass("scroll-textarea")),
          f
            .addClass("scroll-content")
            .css({
              height: "auto",
              "margin-bottom": c.scroll.height * -1 + "px",
              "margin-right": c.scroll.width * -1 + "px",
              "max-height": "",
            }),
          e.on("scroll" + g, function (b) {
            a.isFunction(h.onScroll) &&
              h.onScroll.call(
                d,
                {
                  maxScroll: i.y.maxScrollOffset,
                  scroll: e.scrollTop(),
                  size: i.y.size,
                  visible: i.y.visible,
                },
                {
                  maxScroll: i.x.maxScrollOffset,
                  scroll: e.scrollLeft(),
                  size: i.x.size,
                  visible: i.x.visible,
                }
              ),
              i.x.isVisible &&
                i.x.scroll.bar.css("left", e.scrollLeft() * i.x.kx + "px"),
              i.y.isVisible &&
                i.y.scroll.bar.css("top", e.scrollTop() * i.y.kx + "px");
          }),
          k.on("scroll" + g, function () {}),
          h.disableBodyScroll)
        ) {
          var m = function (a) {
            j(a)
              ? i.y.isVisible && i.y.mousewheel(a)
              : i.x.isVisible && i.x.mousewheel(a);
          };
          k.on("MozMousePixelScroll" + g, m),
            k.on("mousewheel" + g, m),
            c.mobile &&
              k.on("touchstart" + g, function (b) {
                var c =
                    (b.originalEvent.touches && b.originalEvent.touches[0]) ||
                    b,
                  d = { pageX: c.pageX, pageY: c.pageY },
                  f = { left: e.scrollLeft(), top: e.scrollTop() };
                a(document).on("touchmove" + g, function (a) {
                  var b =
                    (a.originalEvent.targetTouches &&
                      a.originalEvent.targetTouches[0]) ||
                    a;
                  e.scrollLeft(f.left + d.pageX - b.pageX),
                    e.scrollTop(f.top + d.pageY - b.pageY),
                    a.preventDefault();
                }),
                  a(document).on("touchend" + g, function () {
                    a(document).off(g);
                  });
              });
        }
        a.isFunction(h.onInit) && h.onInit.apply(this, [e]);
      }
      a.each(i, function (b, c) {
        var f = null,
          k = 1,
          l = "x" === b ? "scrollLeft" : "scrollTop",
          m = h.scrollStep,
          n = function () {
            var a = e[l]();
            e[l](a + m),
              1 == k && a + m >= o && (a = e[l]()),
              k == -1 && a + m <= o && (a = e[l]()),
              e[l]() == a && f && f();
          },
          o = 0;
        c.scroll ||
          ((c.scroll = d._getScroll(h["scroll" + b]).addClass("scroll-" + b)),
          h.showArrows && c.scroll.addClass("scroll-element_arrows_visible"),
          (c.mousewheel = function (a) {
            if (!c.isVisible || ("x" === b && j(a))) return !0;
            if ("y" === b && !j(a)) return i.x.mousewheel(a), !0;
            var f = a.originalEvent.wheelDelta * -1 || a.originalEvent.detail,
              g = c.size - c.visible - c.offset;
            return (
              ((f > 0 && o < g) || (f < 0 && o > 0)) &&
                ((o += f),
                o < 0 && (o = 0),
                o > g && (o = g),
                (d.scrollTo = d.scrollTo || {}),
                (d.scrollTo[l] = o),
                setTimeout(function () {
                  d.scrollTo &&
                    (e.stop().animate(d.scrollTo, 240, "linear", function () {
                      o = e[l]();
                    }),
                    (d.scrollTo = null));
                }, 1)),
              a.preventDefault(),
              !1
            );
          }),
          c.scroll
            .on("MozMousePixelScroll" + g, c.mousewheel)
            .on("mousewheel" + g, c.mousewheel)
            .on("mouseenter" + g, function () {
              o = e[l]();
            }),
          c.scroll
            .find(".scroll-arrow, .scroll-element_track")
            .on("mousedown" + g, function (g) {
              if (1 != g.which) return !0;
              k = 1;
              var i = {
                  eventOffset: g["x" === b ? "pageX" : "pageY"],
                  maxScrollValue: c.size - c.visible - c.offset,
                  scrollbarOffset:
                    c.scroll.bar.offset()["x" === b ? "left" : "top"],
                  scrollbarSize:
                    c.scroll.bar["x" === b ? "outerWidth" : "outerHeight"](),
                },
                j = 0,
                p = 0;
              return (
                a(this).hasClass("scroll-arrow")
                  ? ((k = a(this).hasClass("scroll-arrow_more") ? 1 : -1),
                    (m = h.scrollStep * k),
                    (o = k > 0 ? i.maxScrollValue : 0))
                  : ((k =
                      i.eventOffset > i.scrollbarOffset + i.scrollbarSize
                        ? 1
                        : i.eventOffset < i.scrollbarOffset
                        ? -1
                        : 0),
                    (m = Math.round(0.75 * c.visible) * k),
                    (o =
                      i.eventOffset -
                      i.scrollbarOffset -
                      (h.stepScrolling
                        ? 1 == k
                          ? i.scrollbarSize
                          : 0
                        : Math.round(i.scrollbarSize / 2))),
                    (o = e[l]() + o / c.kx)),
                (d.scrollTo = d.scrollTo || {}),
                (d.scrollTo[l] = h.stepScrolling ? e[l]() + m : o),
                h.stepScrolling &&
                  ((f = function () {
                    (o = e[l]()),
                      clearInterval(p),
                      clearTimeout(j),
                      (j = 0),
                      (p = 0);
                  }),
                  (j = setTimeout(function () {
                    p = setInterval(n, 40);
                  }, h.duration + 100))),
                setTimeout(function () {
                  d.scrollTo &&
                    (e.animate(d.scrollTo, h.duration), (d.scrollTo = null));
                }, 1),
                d._handleMouseDown(f, g)
              );
            }),
          c.scroll.bar.on("mousedown" + g, function (f) {
            if (1 != f.which) return !0;
            var h = f["x" === b ? "pageX" : "pageY"],
              i = e[l]();
            return (
              c.scroll.addClass("scroll-draggable"),
              a(document).on("mousemove" + g, function (a) {
                var d = parseInt(
                  (a["x" === b ? "pageX" : "pageY"] - h) / c.kx,
                  10
                );
                e[l](i + d);
              }),
              d._handleMouseDown(function () {
                c.scroll.removeClass("scroll-draggable"), (o = e[l]());
              }, f)
            );
          }));
      }),
        a.each(i, function (a, b) {
          var c = "scroll-scroll" + a + "_visible",
            d = "x" == a ? i.y : i.x;
          b.scroll.removeClass(c), d.scroll.removeClass(c), f.removeClass(c);
        }),
        a.each(i, function (b, c) {
          a.extend(
            c,
            "x" == b
              ? {
                  offset: parseInt(e.css("left"), 10) || 0,
                  size: e.prop("scrollWidth"),
                  visible: k.width(),
                }
              : {
                  offset: parseInt(e.css("top"), 10) || 0,
                  size: e.prop("scrollHeight"),
                  visible: k.height(),
                }
          );
        }),
        this._updateScroll("x", this.scrollx),
        this._updateScroll("y", this.scrolly),
        a.isFunction(h.onUpdate) && h.onUpdate.apply(this, [e]),
        a.each(i, function (a, b) {
          var c = "x" === a ? "left" : "top",
            d = "x" === a ? "outerWidth" : "outerHeight",
            f = "x" === a ? "width" : "height",
            g = parseInt(e.css(c), 10) || 0,
            i = b.size,
            j = b.visible + g,
            k = b.scroll.size[d]() + (parseInt(b.scroll.size.css(c), 10) || 0);
          h.autoScrollSize &&
            ((b.scrollbarSize = parseInt((k * j) / i, 10)),
            b.scroll.bar.css(f, b.scrollbarSize + "px")),
            (b.scrollbarSize = b.scroll.bar[d]()),
            (b.kx = (k - b.scrollbarSize) / (i - j) || 1),
            (b.maxScrollOffset = i - j);
        }),
        e.scrollLeft(l.scrollLeft).scrollTop(l.scrollTop).trigger("scroll");
    },
    _getScroll: function (b) {
      var c = {
        advanced: [
          '<div class="scroll-element">',
          '<div class="scroll-element_corner"></div>',
          '<div class="scroll-arrow scroll-arrow_less"></div>',
          '<div class="scroll-arrow scroll-arrow_more"></div>',
          '<div class="scroll-element_outer">',
          '<div class="scroll-element_size"></div>',
          '<div class="scroll-element_inner-wrapper">',
          '<div class="scroll-element_inner scroll-element_track">',
          '<div class="scroll-element_inner-bottom"></div>',
          "</div>",
          "</div>",
          '<div class="scroll-bar">',
          '<div class="scroll-bar_body">',
          '<div class="scroll-bar_body-inner"></div>',
          "</div>",
          '<div class="scroll-bar_bottom"></div>',
          '<div class="scroll-bar_center"></div>',
          "</div>",
          "</div>",
          "</div>",
        ].join(""),
        simple: [
          '<div class="scroll-element">',
          '<div class="scroll-element_outer">',
          '<div class="scroll-element_size"></div>',
          '<div class="scroll-element_track"></div>',
          '<div class="scroll-bar"></div>',
          "</div>",
          "</div>",
        ].join(""),
      };
      return (
        c[b] && (b = c[b]),
        b || (b = c.simple),
        (b = "string" == typeof b ? a(b).appendTo(this.wrapper) : a(b)),
        a.extend(b, {
          bar: b.find(".scroll-bar"),
          size: b.find(".scroll-element_size"),
          track: b.find(".scroll-element_track"),
        }),
        b
      );
    },
    _handleMouseDown: function (b, c) {
      var d = this.namespace;
      return (
        a(document).on("blur" + d, function () {
          a(document).add("body").off(d), b && b();
        }),
        a(document).on("dragstart" + d, function (a) {
          return a.preventDefault(), !1;
        }),
        a(document).on("mouseup" + d, function () {
          a(document).add("body").off(d), b && b();
        }),
        a("body").on("selectstart" + d, function (a) {
          return a.preventDefault(), !1;
        }),
        c && c.preventDefault(),
        !1
      );
    },
    _updateScroll: function (b, d) {
      var e = this.container,
        f = this.containerWrapper || e,
        g = "scroll-scroll" + b + "_visible",
        h = "x" === b ? this.scrolly : this.scrollx,
        i = parseInt(this.container.css("x" === b ? "left" : "top"), 10) || 0,
        j = this.wrapper,
        k = d.size,
        l = d.visible + i;
      (d.isVisible = k - l > 1),
        d.isVisible
          ? (d.scroll.addClass(g), h.scroll.addClass(g), f.addClass(g))
          : (d.scroll.removeClass(g),
            h.scroll.removeClass(g),
            f.removeClass(g)),
        "y" === b &&
          (e.is("textarea") || k < l
            ? f.css({
                height: l + c.scroll.height + "px",
                "max-height": "none",
              })
            : f.css({ "max-height": l + c.scroll.height + "px" })),
        (d.size == e.prop("scrollWidth") &&
          h.size == e.prop("scrollHeight") &&
          d.visible == j.width() &&
          h.visible == j.height() &&
          d.offset == (parseInt(e.css("left"), 10) || 0) &&
          h.offset == (parseInt(e.css("top"), 10) || 0)) ||
          (a.extend(this.scrollx, {
            offset: parseInt(e.css("left"), 10) || 0,
            size: e.prop("scrollWidth"),
            visible: j.width(),
          }),
          a.extend(this.scrolly, {
            offset: parseInt(e.css("top"), 10) || 0,
            size: this.container.prop("scrollHeight"),
            visible: j.height(),
          }),
          this._updateScroll("x" === b ? "y" : "x", h));
    },
  };
  var f = e;
  (a.fn.scrollbar = function (b, d) {
    return (
      "string" != typeof b && ((d = b), (b = "init")),
      "undefined" == typeof d && (d = []),
      a.isArray(d) || (d = [d]),
      this.not("body, .scroll-wrapper").each(function () {
        var e = a(this),
          g = e.data(c.data.name);
        (g || "init" === b) && (g || (g = new f(e)), g[b] && g[b].apply(g, d));
      }),
      this
    );
  }),
    (a.fn.scrollbar.options = d);
  var g = (function () {
    var a = 0,
      d = 0;
    return function (e) {
      var f, h, i, j, k, l, m;
      for (f = 0; f < c.scrolls.length; f++)
        (j = c.scrolls[f]),
          (h = j.container),
          (i = j.options),
          (k = j.wrapper),
          (l = j.scrollx),
          (m = j.scrolly),
          (e ||
            (i.autoUpdate &&
              k &&
              k.is(":visible") &&
              (h.prop("scrollWidth") != l.size ||
                h.prop("scrollHeight") != m.size ||
                k.width() != l.visible ||
                k.height() != m.visible))) &&
            (j.init(),
            i.debug &&
              (window.console &&
                console.log(
                  {
                    scrollHeight: h.prop("scrollHeight") + ":" + j.scrolly.size,
                    scrollWidth: h.prop("scrollWidth") + ":" + j.scrollx.size,
                    visibleHeight: k.height() + ":" + j.scrolly.visible,
                    visibleWidth: k.width() + ":" + j.scrollx.visible,
                  },
                  !0
                ),
              d++));
      b && d > 10
        ? (window.console && console.log("Scroll updates exceed 10"),
          (g = function () {}))
        : (clearTimeout(a), (a = setTimeout(g, 300)));
    };
  })();
  window.angular &&
    !(function (a) {
      a.module("jQueryScrollbar", [])
        .provider("jQueryScrollbar", function () {
          var b = d;
          return {
            setOptions: function (c) {
              a.extend(b, c);
            },
            $get: function () {
              return { options: a.copy(b) };
            },
          };
        })
        .directive("jqueryScrollbar", [
          "jQueryScrollbar",
          "$parse",
          function (a, b) {
            return {
              restrict: "AC",
              link: function (c, d, e) {
                var f = b(e.jqueryScrollbar),
                  g = f(c);
                d.scrollbar(g || a.options).on("$destroy", function () {
                  d.scrollbar("destroy");
                });
              },
            };
          },
        ]);
    })(window.angular);
});
/*** JQUERY SCROLLBAR FILE ***/

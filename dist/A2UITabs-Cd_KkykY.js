import { defineComponent as k, ref as p, openBlock as o, createElementBlock as c, createElementVNode as l, normalizeStyle as C, unref as t, normalizeClass as i, Fragment as T, renderList as _, toDisplayString as g, createBlock as x, createCommentVNode as B } from "vue";
import { u as S, _ as z } from "./public-api-Bj1pqyiv.js";
const E = { style: { display: "block" } }, N = ["onClick"], V = {
  class: "a2ui-tabs-content",
  style: { flex: "1", "min-height": "0" }
}, F = /* @__PURE__ */ k({
  __name: "A2UITabs",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    tabItems: {}
  },
  setup(e) {
    const { theme: n, resolvePrimitive: h } = S(), s = p(0);
    function y(r) {
      s.value = r;
    }
    return (r, $) => {
      var m, u, d, f;
      return o(), c("a2ui-tabs", E, [
        l("div", {
          class: i((m = t(n).components.Tabs) == null ? void 0 : m.container),
          style: C((u = t(n).additionalStyles) == null ? void 0 : u.Tabs)
        }, [
          l("div", {
            class: i((f = (d = t(n).components.Tabs) == null ? void 0 : d.controls) == null ? void 0 : f.all)
          }, [
            (o(!0), c(T, null, _(e.tabItems, (I, a) => {
              var b, v;
              return o(), c("button", {
                key: a,
                class: i(s.value === a ? (v = (b = t(n).components.Tabs) == null ? void 0 : b.controls) == null ? void 0 : v.selected : {}),
                onClick: (w) => y(a)
              }, g(t(h)(I.title, e.component, e.surfaceId)), 11, N);
            }), 128))
          ], 2),
          l("div", V, [
            e.tabItems[s.value] ? (o(), x(z, {
              key: 0,
              "surface-id": e.surfaceId,
              component: e.tabItems[s.value].child
            }, null, 8, ["surface-id", "component"])) : B("", !0)
          ])
        ], 6)
      ]);
    };
  }
});
export {
  F as default
};

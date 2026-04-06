import { defineComponent as s, openBlock as n, createElementBlock as a, createElementVNode as m, normalizeStyle as u, unref as o, normalizeClass as f, createBlock as d, createCommentVNode as l, Fragment as h, renderList as y } from "vue";
import { u as k, _ as i } from "./public-api-Bj1pqyiv.js";
const C = { style: { display: "block" } }, x = /* @__PURE__ */ s({
  __name: "A2UICard",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    child: {},
    children: {}
  },
  setup(e) {
    const { theme: t } = k();
    return (p, I) => {
      var c;
      return n(), a("a2ui-card", C, [
        m("div", {
          class: f(o(t).components.Card),
          style: u((c = o(t).additionalStyles) == null ? void 0 : c.Card)
        }, [
          e.child ? (n(), d(i, {
            key: 0,
            "surface-id": e.surfaceId,
            component: e.child
          }, null, 8, ["surface-id", "component"])) : l("", !0),
          e.children ? (n(!0), a(h, { key: 1 }, y(e.children, (r) => (n(), d(i, {
            key: r.id,
            "surface-id": e.surfaceId,
            component: r
          }, null, 8, ["surface-id", "component"]))), 128)) : l("", !0)
        ], 6)
      ]);
    };
  }
});
export {
  x as default
};

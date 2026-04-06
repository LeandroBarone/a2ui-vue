import { defineComponent as u, computed as c, openBlock as t, createElementBlock as n, createElementVNode as p, normalizeStyle as _, unref as d, normalizeClass as f, Fragment as l, renderList as v, createVNode as y, createCommentVNode as g } from "vue";
import { u as h, _ as k, a as C } from "./public-api-Bj1pqyiv.js";
const I = ["direction"], L = ["data-direction"], x = {
  key: 0,
  class: "a2ui-list-item"
}, N = /* @__PURE__ */ u({
  __name: "A2UIList",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    alignment: {},
    direction: {},
    children: {}
  },
  setup(s) {
    const o = s, { theme: i } = h(), r = c(() => o.direction ?? "vertical"), m = c(() => o.children ?? o.component.properties.children ?? []);
    return (V, b) => {
      var a;
      return t(), n("a2ui-list", {
        direction: r.value,
        style: { display: "block", flex: "var(--weight)", minHeight: 0 }
      }, [
        p("section", {
          class: f([d(i).components.List, "a2ui-list-section"]),
          style: _((a = d(i).additionalStyles) == null ? void 0 : a.List),
          "data-direction": r.value
        }, [
          (t(!0), n(l, null, v(m.value, (e) => (t(), n(l, {
            key: (e == null ? void 0 : e.id) ?? e
          }, [
            e ? (t(), n("div", x, [
              y(k, {
                "surface-id": s.surfaceId,
                component: e
              }, null, 8, ["surface-id", "component"])
            ])) : g("", !0)
          ], 64))), 128))
        ], 14, L)
      ], 8, I);
    };
  }
}), A = /* @__PURE__ */ C(N, [["__scopeId", "data-v-91347b69"]]);
export {
  A as default
};

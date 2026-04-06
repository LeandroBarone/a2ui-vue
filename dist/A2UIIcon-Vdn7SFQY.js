import { defineComponent as l, computed as m, openBlock as p, createElementBlock as u, createElementVNode as s, normalizeStyle as d, unref as a, normalizeClass as f, toDisplayString as _, createCommentVNode as v } from "vue";
import { u as h } from "./public-api-Bj1pqyiv.js";
const y = {
  key: 0,
  "aria-hidden": "true",
  tabindex: "-1",
  style: { display: "block", flex: "var(--weight)", minHeight: 0, overflow: "auto" }
}, I = { class: "g-icon" }, w = /* @__PURE__ */ l({
  __name: "A2UIIcon",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    name: {}
  },
  setup(r) {
    const e = r, { processor: c, theme: o, resolvePrimitive: i } = h(), t = m(() => (c.version.value, i(e.name, e.component, e.surfaceId)));
    return (g, k) => {
      var n;
      return t.value ? (p(), u("a2ui-icon", y, [
        s("section", {
          class: f(a(o).components.Icon),
          style: d((n = a(o).additionalStyles) == null ? void 0 : n.Icon)
        }, [
          s("span", I, _(t.value), 1)
        ], 6)
      ])) : v("", !0);
    };
  }
});
export {
  w as default
};

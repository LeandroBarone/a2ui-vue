import { defineComponent as n, openBlock as r, createElementBlock as i, createElementVNode as s, normalizeStyle as c, unref as t, normalizeClass as a } from "vue";
import { u as l } from "./public-api-BNRYkT80.js";
const m = { style: { display: "block", minHeight: 0, overflow: "auto" } }, h = /* @__PURE__ */ n({
  __name: "A2UIDivider",
  props: {
    surfaceId: {},
    component: {},
    weight: {}
  },
  setup(d) {
    const { theme: e } = l();
    return (p, u) => {
      var o;
      return r(), i("a2ui-divider", m, [
        s("hr", {
          class: a(t(e).components.Divider),
          style: c([(o = t(e).additionalStyles) == null ? void 0 : o.Divider, { height: "1px", background: "#ccc", border: "none" }])
        }, null, 6)
      ]);
    };
  }
});
export {
  h as default
};

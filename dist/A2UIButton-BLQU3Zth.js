import { defineComponent as r, openBlock as a, createElementBlock as s, createElementVNode as m, normalizeStyle as d, unref as c, normalizeClass as u, createBlock as f, createCommentVNode as p } from "vue";
import { u as h, _ as y } from "./public-api-Bj1pqyiv.js";
const k = { style: { display: "block", flex: "var(--weight)", minHeight: 0 } }, B = ["data-primary"], g = /* @__PURE__ */ r({
  __name: "A2UIButton",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    action: {},
    child: {},
    primary: { type: [Boolean, null] }
  },
  setup(e) {
    const t = e, { theme: n, sendAction: i } = h();
    function l() {
      t.action && i(t.action, t.component, t.surfaceId);
    }
    return (C, _) => {
      var o;
      return a(), s("a2ui-button", k, [
        m("button", {
          class: u(c(n).components.Button),
          style: d((o = c(n).additionalStyles) == null ? void 0 : o.Button),
          "data-primary": e.primary ? "" : void 0,
          onClick: l
        }, [
          e.child ? (a(), f(y, {
            key: 0,
            "surface-id": e.surfaceId,
            component: e.child
          }, null, 8, ["surface-id", "component"])) : p("", !0)
        ], 14, B)
      ]);
    };
  }
});
export {
  g as default
};

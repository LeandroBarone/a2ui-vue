import { defineComponent as s, openBlock as c, createElementBlock as r, createElementVNode as m, normalizeStyle as u, unref as a, normalizeClass as d, createBlock as f, createCommentVNode as p } from "vue";
import { u as h, _ as y } from "./public-api-BNRYkT80.js";
const k = { style: { display: "block", flex: "var(--weight)", minHeight: 0 } }, b = /* @__PURE__ */ s({
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
    return (B, C) => {
      var o;
      return c(), r("a2ui-button", k, [
        m("button", {
          class: d(a(n).components.Button),
          style: u((o = a(n).additionalStyles) == null ? void 0 : o.Button),
          onClick: l
        }, [
          e.child ? (c(), f(y, {
            key: 0,
            "surface-id": e.surfaceId,
            component: e.child
          }, null, 8, ["surface-id", "component"])) : p("", !0)
        ], 6)
      ]);
    };
  }
});
export {
  b as default
};

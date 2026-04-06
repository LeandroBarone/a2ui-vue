import { defineComponent as a, computed as d, openBlock as m, createElementBlock as u, createElementVNode as s, normalizeStyle as p, unref as n, normalizeClass as v, createCommentVNode as f } from "vue";
import { u as _ } from "./public-api-Bj1pqyiv.js";
const h = {
  key: 0,
  style: { display: "block", flex: "var(--weight)", minHeight: 0, overflow: "auto" }
}, y = ["src"], g = /* @__PURE__ */ a({
  __name: "A2UIVideo",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    url: {}
  },
  setup(l) {
    const e = l, { processor: i, theme: o, resolvePrimitive: c } = _(), t = d(() => (i.version.value, c(e.url, e.component, e.surfaceId)));
    return (b, k) => {
      var r;
      return t.value ? (m(), u("a2ui-video", h, [
        s("section", {
          class: v(n(o).components.Video),
          style: p((r = n(o).additionalStyles) == null ? void 0 : r.Video)
        }, [
          s("video", {
            controls: "",
            src: t.value,
            style: { display: "block", width: "100%", "box-sizing": "border-box" }
          }, null, 8, y)
        ], 6)
      ])) : f("", !0);
    };
  }
});
export {
  g as default
};

import { defineComponent as p, computed as o, openBlock as d, createElementBlock as g, createElementVNode as i, normalizeStyle as f, unref as v, normalizeClass as h, createCommentVNode as _ } from "vue";
import * as y from "@a2ui/web_core/styles/index";
import { u as x } from "./public-api-Bj1pqyiv.js";
const I = {
  key: 0,
  style: { display: "block", flex: "var(--weight)", minHeight: 0, overflow: "auto" }
}, b = ["src", "alt"], H = /* @__PURE__ */ p({
  __name: "A2UIImage",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    url: {},
    usageHint: {},
    fit: {},
    altText: {}
  },
  setup(c) {
    const e = c, { processor: s, theme: r, resolvePrimitive: n } = x(), a = o(() => (s.version.value, n(e.url, e.component, e.surfaceId))), m = o(() => (s.version.value, n(e.altText, e.component, e.surfaceId) ?? "")), u = o(() => {
      const t = r.components.Image;
      return t ? y.merge(
        t.all ?? {},
        e.usageHint ? t[e.usageHint] ?? {} : {}
      ) : {};
    });
    return (t, k) => {
      var l;
      return a.value ? (d(), g("a2ui-image", I, [
        i("section", {
          class: h(u.value),
          style: f((l = v(r).additionalStyles) == null ? void 0 : l.Image)
        }, [
          i("img", {
            src: a.value,
            alt: m.value,
            style: { display: "block", width: "100%", height: "100%", "box-sizing": "border-box" }
          }, null, 8, b)
        ], 6)
      ])) : _("", !0);
    };
  }
});
export {
  H as default
};

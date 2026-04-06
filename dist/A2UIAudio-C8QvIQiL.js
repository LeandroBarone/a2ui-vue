import { defineComponent as c, computed as i, openBlock as u, createElementBlock as a, createElementVNode as d, normalizeStyle as m, unref as p } from "vue";
import { u as _ } from "./public-api-Bj1pqyiv.js";
const f = { style: { display: "flex" } }, v = ["src"], I = /* @__PURE__ */ c({
  __name: "A2UIAudio",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    url: {}
  },
  setup(t) {
    const e = t, { processor: r, theme: n, resolvePrimitive: s } = _(), l = i(() => (r.version.value, s(e.url, e.component, e.surfaceId)));
    return (h, y) => {
      var o;
      return u(), a("a2ui-audio", f, [
        d("audio", {
          controls: "",
          src: l.value ?? void 0,
          style: m([(o = p(n).additionalStyles) == null ? void 0 : o.AudioPlayer, { width: "100%" }])
        }, null, 12, v)
      ]);
    };
  }
});
export {
  I as default
};

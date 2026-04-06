import { defineComponent as V, computed as f, openBlock as h, createElementBlock as y, createElementVNode as I, normalizeStyle as k, unref as t, normalizeClass as r, toDisplayString as N, createCommentVNode as C } from "vue";
import { u as P } from "./public-api-Bj1pqyiv.js";
const U = { style: { display: "block" } }, z = ["id"], A = ["id", "aria-labelledby", "min", "max", "value"], M = /* @__PURE__ */ V({
  __name: "A2UISlider",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    label: {},
    value: {},
    minValue: {},
    maxValue: {}
  },
  setup(o) {
    const e = o, { processor: l, theme: n, resolvePrimitive: i, sendAction: x, getUniqueId: u } = P(), S = u("a2ui-slider-input"), c = u("a2ui-slider-label"), d = f(() => (l.version.value, i(e.label, e.component, e.surfaceId))), _ = f(() => (l.version.value, i(e.value, e.component, e.surfaceId)));
    function g(m) {
      const s = Number(m.target.value), a = e.value;
      a && typeof a == "object" && "path" in a && a.path ? l.processMessages([{
        dataModelUpdate: {
          surfaceId: e.surfaceId,
          path: l.resolvePath(a.path, e.component.dataContextPath),
          contents: [{ key: ".", valueNumber: s }]
        }
      }]) : x(
        { name: "change", context: [{ key: "value", value: { literalNumber: s } }] },
        e.component,
        e.surfaceId
      );
    }
    return (m, s) => {
      var a, p, v, b;
      return h(), y("a2ui-slider", U, [
        I("div", {
          class: r((a = t(n).components.Slider) == null ? void 0 : a.container),
          style: k((p = t(n).additionalStyles) == null ? void 0 : p.Slider)
        }, [
          d.value ? (h(), y("label", {
            key: 0,
            class: r((v = t(n).components.Slider) == null ? void 0 : v.label),
            id: t(c)
          }, N(d.value), 11, z)) : C("", !0),
          I("input", {
            type: "range",
            class: r((b = t(n).components.Slider) == null ? void 0 : b.element),
            id: t(S),
            "aria-labelledby": t(c),
            min: o.minValue ?? 0,
            max: o.maxValue ?? 100,
            value: _.value ?? 0,
            onInput: g
          }, null, 42, A)
        ], 6)
      ]);
    };
  }
});
export {
  M as default
};

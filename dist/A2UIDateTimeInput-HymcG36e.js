import { defineComponent as D, computed as i, openBlock as T, createElementBlock as k, createElementVNode as u, normalizeStyle as C, unref as a, normalizeClass as c, toDisplayString as S } from "vue";
import { u as x } from "./public-api-Bj1pqyiv.js";
const B = { style: { display: "block" } }, P = ["for"], U = ["type", "id", "value"], E = /* @__PURE__ */ D({
  __name: "A2UIDateTimeInput",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    label: {},
    value: {},
    enableDate: { type: Boolean },
    enableTime: { type: Boolean }
  },
  setup(f) {
    const e = f, { processor: o, theme: l, resolvePrimitive: r, sendAction: h, getUniqueId: y } = x(), p = y("a2ui-datetime-input"), I = i(() => {
      const s = e.enableDate ?? !0, n = e.enableTime ?? !1;
      return s && n ? "datetime-local" : n ? "time" : "date";
    }), _ = i(() => (o.version.value, r(e.label, e.component, e.surfaceId))), b = i(() => (o.version.value, r(e.value, e.component, e.surfaceId)));
    function g(s) {
      const n = s.target.value, t = e.value;
      t && typeof t == "object" && "path" in t && t.path ? o.processMessages([{
        dataModelUpdate: {
          surfaceId: e.surfaceId,
          path: o.resolvePath(t.path, e.component.dataContextPath),
          contents: [{ key: ".", valueString: n }]
        }
      }]) : h(
        { name: "change", context: [{ key: "value", value: { literalString: n } }] },
        e.component,
        e.surfaceId
      );
    }
    return (s, n) => {
      var t, m, d, v;
      return T(), k("a2ui-datetime-input", B, [
        u("div", {
          class: c((t = a(l).components.DateTimeInput) == null ? void 0 : t.container),
          style: C((m = a(l).additionalStyles) == null ? void 0 : m.DateTimeInput)
        }, [
          u("label", {
            class: c((d = a(l).components.DateTimeInput) == null ? void 0 : d.label),
            for: a(p)
          }, S(_.value), 11, P),
          u("input", {
            type: I.value,
            class: c((v = a(l).components.DateTimeInput) == null ? void 0 : v.element),
            id: a(p),
            value: b.value ?? "",
            onChange: g
          }, null, 42, U)
        ], 6)
      ]);
    };
  }
});
export {
  E as default
};

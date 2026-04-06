import { defineComponent as T, computed as l, openBlock as g, createElementBlock as F, createElementVNode as r, normalizeStyle as k, unref as n, normalizeClass as c, toDisplayString as S } from "vue";
import { u as C } from "./public-api-BNRYkT80.js";
const P = { style: { display: "block" } }, U = ["for"], w = ["type", "id", "value"], B = /* @__PURE__ */ T({
  __name: "A2UITextField",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    label: {},
    text: {},
    textFieldType: {}
  },
  setup(v) {
    const e = v, { processor: o, theme: a, resolvePrimitive: i, sendAction: x, getUniqueId: h } = C(), u = h("a2ui-text-field"), y = l(() => (o.version.value, i(e.label, e.component, e.surfaceId))), _ = l(() => (o.version.value, i(e.text, e.component, e.surfaceId))), I = l(() => {
      switch (e.textFieldType) {
        case "number":
          return "number";
        case "date":
          return "date";
        default:
          return "text";
      }
    });
    function b(d) {
      const s = d.target.value, t = e.text;
      t && typeof t == "object" && "path" in t && t.path ? o.processMessages([{
        dataModelUpdate: {
          surfaceId: e.surfaceId,
          path: o.resolvePath(t.path, e.component.dataContextPath),
          contents: [{ key: ".", valueString: s }]
        }
      }]) : x(
        { name: "input", context: [{ key: "value", value: { literalString: s } }] },
        e.component,
        e.surfaceId
      );
    }
    return (d, s) => {
      var t, p, m, f;
      return g(), F("a2ui-text-field", P, [
        r("div", {
          class: c((t = n(a).components.TextField) == null ? void 0 : t.container),
          style: k((p = n(a).additionalStyles) == null ? void 0 : p.TextField)
        }, [
          r("label", {
            class: c((m = n(a).components.TextField) == null ? void 0 : m.label),
            for: n(u)
          }, S(y.value), 11, U),
          r("input", {
            type: I.value,
            class: c((f = n(a).components.TextField) == null ? void 0 : f.element),
            id: n(u),
            value: _.value ?? "",
            onInput: b
          }, null, 42, w)
        ], 6)
      ]);
    };
  }
});
export {
  B as default
};

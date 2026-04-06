import { defineComponent as C, computed as k, openBlock as I, createElementBlock as g, createElementVNode as s, normalizeStyle as y, unref as t, normalizeClass as l, createTextVNode as B, toDisplayString as U } from "vue";
import { u as A, a as N } from "./public-api-Bj1pqyiv.js";
const P = { style: { display: "block" } }, S = ["for"], z = ["id", "checked"], E = /* @__PURE__ */ C({
  __name: "A2UICheckBox",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    label: {},
    checked: {}
  },
  setup(m) {
    const e = m, { processor: c, theme: n, resolvePrimitive: r, sendAction: f, getUniqueId: x } = A(), d = x("a2ui-checkbox"), _ = k(() => (c.version.value, r(e.checked, e.component, e.surfaceId) ?? !1)), v = k(() => (c.version.value, r(e.label, e.component, e.surfaceId)));
    function b(i) {
      const a = i.target.checked, o = e.checked;
      o && typeof o == "object" && "path" in o && o.path ? c.processMessages([{
        dataModelUpdate: {
          surfaceId: e.surfaceId,
          path: c.resolvePath(o.path, e.component.dataContextPath),
          contents: [{ key: ".", valueBoolean: a }]
        }
      }]) : f(
        { name: "toggle", context: [{ key: "checked", value: { literalBoolean: a } }] },
        e.component,
        e.surfaceId
      );
    }
    return (i, a) => {
      var o, p, h, u;
      return I(), g("a2ui-checkbox", P, [
        s("div", {
          class: l([(o = t(n).components.CheckBox) == null ? void 0 : o.container, "a2ui-checkbox-root"]),
          style: y((p = t(n).additionalStyles) == null ? void 0 : p.CheckBox)
        }, [
          s("label", {
            class: l((h = t(n).components.CheckBox) == null ? void 0 : h.label),
            for: t(d)
          }, [
            s("input", {
              type: "checkbox",
              class: l((u = t(n).components.CheckBox) == null ? void 0 : u.element),
              id: t(d),
              checked: _.value,
              onChange: b
            }, null, 42, z),
            B(" " + U(v.value), 1)
          ], 10, S)
        ], 6)
      ]);
    };
  }
}), V = /* @__PURE__ */ N(E, [["__scopeId", "data-v-92166b08"]]);
export {
  V as default
};

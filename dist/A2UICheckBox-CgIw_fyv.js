import { defineComponent as k, computed as s, openBlock as f, createElementBlock as g, createElementVNode as l, unref as v, createTextVNode as x, toDisplayString as I } from "vue";
import { u as _ } from "./public-api-BNRYkT80.js";
const b = { style: { display: "flex", alignItems: "center", gap: "0.5rem" } }, y = ["id", "checked"], N = /* @__PURE__ */ k({
  __name: "A2UICheckBox",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    label: {},
    checked: {}
  },
  setup(r) {
    const e = r, { processor: o, resolvePrimitive: n, sendAction: d, getUniqueId: p } = _(), u = p("a2ui-checkbox"), i = s(() => (o.version.value, n(e.checked, e.component, e.surfaceId) ?? !1)), h = s(() => (o.version.value, n(e.label, e.component, e.surfaceId)));
    function m(a) {
      const c = a.target.checked, t = e.checked;
      t && typeof t == "object" && "path" in t && t.path ? o.processMessages([{
        dataModelUpdate: {
          surfaceId: e.surfaceId,
          path: o.resolvePath(t.path, e.component.dataContextPath),
          contents: [{ key: ".", valueBoolean: c }]
        }
      }]) : d(
        { name: "toggle", context: [{ key: "checked", value: { literalBoolean: c } }] },
        e.component,
        e.surfaceId
      );
    }
    return (a, c) => (f(), g("a2ui-checkbox", b, [
      l("label", null, [
        l("input", {
          type: "checkbox",
          id: v(u),
          checked: i.value,
          onChange: m
        }, null, 40, y),
        x(" " + I(h.value), 1)
      ])
    ]));
  }
});
export {
  N as default
};

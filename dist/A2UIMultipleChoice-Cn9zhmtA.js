import { defineComponent as A, computed as r, openBlock as i, createElementBlock as u, createElementVNode as p, normalizeStyle as x, unref as l, normalizeClass as d, toDisplayString as _, Fragment as N, renderList as P } from "vue";
import { u as U } from "./public-api-Bj1pqyiv.js";
const j = { style: { display: "block" } }, z = ["for"], B = ["id", "value"], E = ["value"], q = /* @__PURE__ */ A({
  __name: "A2UIMultipleChoice",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    label: {},
    options: {},
    selections: {}
  },
  setup(b) {
    const e = b, { processor: n, theme: s, resolvePrimitive: m, sendAction: g, getUniqueId: C } = U(), v = C("a2ui-multiple-choice"), I = r(() => (n.version.value, m(e.label, e.component, e.surfaceId))), M = r(() => (n.version.value, e.options.map((t) => ({
      label: m(t.label, e.component, e.surfaceId),
      value: t.value
    })))), S = r(() => {
      const t = e.selections;
      return t && typeof t == "object" && "literalArray" in t ? t.literalArray : [];
    });
    function k(t) {
      const a = t.target.value, o = e.selections;
      o && typeof o == "object" && "path" in o && o.path ? n.processMessages([{
        dataModelUpdate: {
          surfaceId: e.surfaceId,
          path: n.resolvePath(o.path, e.component.dataContextPath),
          contents: [{ key: ".", valueString: JSON.stringify({ literalArray: [a] }) }]
        }
      }]) : g(
        { name: "change", context: [{ key: "value", value: { literalString: a } }] },
        e.component,
        e.surfaceId
      );
    }
    return (t, a) => {
      var o, h, f, y;
      return i(), u("a2ui-multiple-choice", j, [
        p("div", {
          class: d((o = l(s).components.MultipleChoice) == null ? void 0 : o.container),
          style: x((h = l(s).additionalStyles) == null ? void 0 : h.MultipleChoice)
        }, [
          p("label", {
            class: d((f = l(s).components.MultipleChoice) == null ? void 0 : f.label),
            for: l(v)
          }, _(I.value), 11, z),
          p("select", {
            class: d((y = l(s).components.MultipleChoice) == null ? void 0 : y.element),
            id: l(v),
            value: S.value[0] || "",
            onChange: k
          }, [
            (i(!0), u(N, null, P(M.value, (c) => (i(), u("option", {
              key: c.value,
              value: c.value
            }, _(c.label), 9, E))), 128))
          ], 42, B)
        ], 6)
      ]);
    };
  }
});
export {
  q as default
};

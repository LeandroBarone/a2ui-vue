import { defineComponent as p, computed as n, openBlock as o, createElementBlock as r, createElementVNode as f, normalizeStyle as _, unref as g, normalizeClass as v, Fragment as l, renderList as w, createBlock as y, createCommentVNode as b } from "vue";
import { u as k, _ as x, a as C } from "./public-api-Bj1pqyiv.js";
const I = ["alignment", "distribution"], R = /* @__PURE__ */ p({
  __name: "A2UIRow",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    alignment: {},
    distribution: {},
    children: {}
  },
  setup(s) {
    const t = s, { theme: a } = k(), i = n(() => t.alignment ?? "stretch"), c = n(() => t.distribution ?? "start"), m = n(() => t.children ?? t.component.properties.children ?? []), d = n(() => ({
      ...a.components.Row,
      [`align-${i.value}`]: !0,
      [`distribute-${c.value}`]: !0
    }));
    return (h, B) => {
      var u;
      return o(), r("a2ui-row", {
        alignment: i.value,
        distribution: c.value,
        style: { display: "flex", flex: "var(--weight)" }
      }, [
        f("section", {
          class: v([d.value, "a2ui-row-section"]),
          style: _((u = g(a).additionalStyles) == null ? void 0 : u.Row)
        }, [
          (o(!0), r(l, null, w(m.value, (e) => (o(), r(l, {
            key: (e == null ? void 0 : e.id) ?? e
          }, [
            e ? (o(), y(x, {
              key: 0,
              "surface-id": s.surfaceId,
              component: e
            }, null, 8, ["surface-id", "component"])) : b("", !0)
          ], 64))), 128))
        ], 6)
      ], 8, I);
    };
  }
}), A = /* @__PURE__ */ C(R, [["__scopeId", "data-v-5af613d9"]]);
export {
  A as default
};

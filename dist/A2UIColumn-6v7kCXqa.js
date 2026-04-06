import { defineComponent as p, computed as n, openBlock as o, createElementBlock as s, createElementVNode as f, normalizeStyle as _, unref as b, normalizeClass as g, Fragment as c, renderList as v, createBlock as C, createCommentVNode as y } from "vue";
import { u as k, _ as x, a as I } from "./public-api-BNRYkT80.js";
const h = ["alignment", "distribution"], B = /* @__PURE__ */ p({
  __name: "A2UIColumn",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    alignment: {},
    distribution: {},
    children: {}
  },
  setup(r) {
    const t = r, { theme: a } = k(), i = n(() => t.alignment ?? "stretch"), u = n(() => t.distribution ?? "start"), m = n(() => t.children ?? t.component.properties.children ?? []), d = n(() => ({
      ...a.components.Column,
      [`align-${i.value}`]: !0,
      [`distribute-${u.value}`]: !0
    }));
    return ($, w) => {
      var l;
      return o(), s("a2ui-column", {
        alignment: i.value,
        distribution: u.value,
        style: { display: "flex", flex: "var(--weight)" }
      }, [
        f("section", {
          class: g([d.value, "a2ui-column-section"]),
          style: _((l = b(a).additionalStyles) == null ? void 0 : l.Column)
        }, [
          (o(!0), s(c, null, v(m.value, (e) => (o(), s(c, {
            key: (e == null ? void 0 : e.id) ?? e
          }, [
            e ? (o(), C(x, {
              key: 0,
              "surface-id": r.surfaceId,
              component: e
            }, null, 8, ["surface-id", "component"])) : y("", !0)
          ], 64))), 128))
        ], 6)
      ], 8, h);
    };
  }
}), E = /* @__PURE__ */ I(B, [["__scopeId", "data-v-bb6c80b1"]]);
export {
  E as default
};

import { defineComponent as k, ref as y, openBlock as n, createElementBlock as s, createElementVNode as r, createBlock as d, createCommentVNode as t, normalizeClass as u, unref as m, withModifiers as h } from "vue";
import { u as v, _ as f } from "./public-api-BNRYkT80.js";
const M = { style: { display: "inline-block" } }, b = /* @__PURE__ */ k({
  __name: "A2UIModal",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    entryPointChild: {},
    contentChild: {}
  },
  setup(e) {
    const { theme: l } = v(), o = y(!1);
    function p() {
      o.value = !0;
    }
    function C() {
      o.value = !1;
    }
    return (I, c) => {
      var i, a;
      return n(), s("a2ui-modal", M, [
        r("div", {
          class: "a2ui-modal-entry-point",
          style: { cursor: "pointer" },
          onClick: p
        }, [
          e.entryPointChild ? (n(), d(f, {
            key: 0,
            "surface-id": e.surfaceId,
            component: e.entryPointChild
          }, null, 8, ["surface-id", "component"])) : t("", !0)
        ]),
        o.value ? (n(), s("div", {
          key: 0,
          class: u((i = m(l).components.Modal) == null ? void 0 : i.backdrop),
          onClick: C
        }, [
          r("div", {
            class: u((a = m(l).components.Modal) == null ? void 0 : a.element),
            onClick: c[0] || (c[0] = h(() => {
            }, ["stop"]))
          }, [
            e.contentChild ? (n(), d(f, {
              key: 0,
              "surface-id": e.surfaceId,
              component: e.contentChild
            }, null, 8, ["surface-id", "component"])) : t("", !0)
          ], 2)
        ], 2)) : t("", !0)
      ]);
    };
  }
});
export {
  b as default
};

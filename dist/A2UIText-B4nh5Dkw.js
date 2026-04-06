import { defineComponent as f, ref as h, watchEffect as y, toRaw as k, computed as s, openBlock as v, createElementBlock as b, normalizeStyle as x, createElementVNode as g, normalizeClass as w } from "vue";
import * as o from "@a2ui/web_core/styles/index";
import { u as H, b as _ } from "./public-api-Bj1pqyiv.js";
const S = ["innerHTML"], A = /* @__PURE__ */ f({
  __name: "A2UIText",
  props: {
    surfaceId: {},
    component: {},
    weight: {},
    text: {},
    usageHint: {}
  },
  setup(c) {
    const t = c, { processor: i, theme: r, resolvePrimitive: l } = H(), u = _(), n = h("");
    y(async () => {
      i.version.value;
      let e = l(t.text, t.component, t.surfaceId);
      if (e == null) {
        n.value = "";
        return;
      }
      switch (t.usageHint) {
        case "h1":
          e = `# ${e}`;
          break;
        case "h2":
          e = `## ${e}`;
          break;
        case "h3":
          e = `### ${e}`;
          break;
        case "h4":
          e = `#### ${e}`;
          break;
        case "h5":
          e = `##### ${e}`;
          break;
        case "caption":
          e = `*${e}*`;
          break;
        default:
          e = String(e);
          break;
      }
      const a = JSON.parse(JSON.stringify(k(r.markdown)));
      n.value = await u(e, {
        tagClassMap: o.appendToAll(a, ["ol", "ul", "li"], {})
      });
    });
    const d = s(() => {
      const e = r.components.Text;
      return e ? o.merge(
        e.all ?? {},
        t.usageHint ? e[t.usageHint] ?? {} : {}
      ) : {};
    }), p = s(() => {
      var a;
      const e = (a = r.additionalStyles) == null ? void 0 : a.Text;
      if (e && typeof e == "object" && !Array.isArray(e))
        return ["h1", "h2", "h3", "h4", "h5", "caption", "body"].every((m) => m in e) ? e[t.usageHint ?? "body"] || {} : e;
    });
    return (e, a) => (v(), b("a2ui-text", {
      style: x([{ display: "block", flex: "var(--weight)" }, p.value])
    }, [
      g("section", {
        class: w(d.value),
        innerHTML: n.value
      }, null, 10, S)
    ], 4));
  }
});
export {
  A as default
};

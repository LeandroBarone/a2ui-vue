import { structuralStyles as M } from "@a2ui/web_core/styles/index";
import { reactive as B, inject as v, ref as R, defineComponent as x, computed as g, openBlock as y, createBlock as C, resolveDynamicComponent as F, mergeProps as E, createCommentVNode as S, defineAsyncComponent as j, createElementBlock as L } from "vue";
import * as O from "@a2ui/web_core/v0_8";
const A = {
  AudioPlayer: () => import("./A2UIAudio-ClrgMz7l.js"),
  Button: () => import("./A2UIButton-BYnGQRyJ.js"),
  Card: () => import("./A2UICard-BsvT-zKw.js"),
  CheckBox: () => import("./A2UICheckBox-CgIw_fyv.js"),
  Column: () => import("./A2UIColumn-6v7kCXqa.js"),
  DateTimeInput: () => import("./A2UIDateTimeInput-Bjz6z6NA.js"),
  Divider: () => import("./A2UIDivider-Cqm0EMkJ.js"),
  Icon: () => import("./A2UIIcon-DdxoWBVi.js"),
  Image: () => import("./A2UIImage-BF6qsoSX.js"),
  List: () => import("./A2UIList-CLpY98n5.js"),
  Modal: () => import("./A2UIModal-3JNRElvh.js"),
  MultipleChoice: () => import("./A2UIMultipleChoice-C7VGIMqW.js"),
  Row: () => import("./A2UIRow-YUHxJsy6.js"),
  Slider: () => import("./A2UISlider-DYzU_0fa.js"),
  Tabs: () => import("./A2UITabs-rg8GzrWp.js"),
  Text: () => import("./A2UIText-DaTL6B3r.js"),
  TextField: () => import("./A2UITextField-CDu7k5uD.js"),
  Video: () => import("./A2UIVideo-r6xReOK1.js")
};
function Q(e) {
  for (const [r, u] of Object.entries(A))
    e[r] = u;
}
const K = {
  components: {
    AudioPlayer: { "a2ui-audio-player": !0 },
    Button: { "a2ui-button": !0 },
    Card: { "a2ui-card": !0 },
    CheckBox: {
      container: { "a2ui-checkbox": !0 },
      element: { "a2ui-checkbox-element": !0 },
      label: { "a2ui-checkbox-label": !0 }
    },
    Column: { "a2ui-column": !0 },
    DateTimeInput: {
      container: { "a2ui-date-time-input": !0 },
      label: { "a2ui-date-time-input-label": !0 },
      element: { "a2ui-date-time-input-element": !0 }
    },
    Divider: { "a2ui-divider": !0 },
    Icon: { "a2ui-icon": !0 },
    Image: {
      all: { "a2ui-image": !0 },
      icon: { "a2ui-image-icon": !0 },
      avatar: { "a2ui-image-avatar": !0 },
      smallFeature: { "a2ui-image-small-feature": !0 },
      mediumFeature: { "a2ui-image-medium-feature": !0 },
      largeFeature: { "a2ui-image-large-feature": !0 },
      header: { "a2ui-image-header": !0 }
    },
    List: { "a2ui-list": !0 },
    Modal: {
      backdrop: { "a2ui-modal-backdrop": !0 },
      element: { "a2ui-modal-element": !0 }
    },
    MultipleChoice: {
      container: { "a2ui-multiple-choice": !0 },
      label: { "a2ui-multiple-choice-label": !0 },
      element: { "a2ui-multiple-choice-element": !0 }
    },
    Row: { "a2ui-row": !0 },
    Slider: {
      container: { "a2ui-slider": !0 },
      label: { "a2ui-slider-label": !0 },
      element: { "a2ui-slider-element": !0 }
    },
    Tabs: {
      container: { "a2ui-tabs": !0 },
      element: { "a2ui-tabs-element": !0 },
      controls: {
        all: { "a2ui-tab": !0 },
        selected: { "a2ui-tab-selected": !0 }
      }
    },
    Text: {
      all: { "a2ui-text": !0 },
      h1: { "a2ui-text-h1": !0 },
      h2: { "a2ui-text-h2": !0 },
      h3: { "a2ui-text-h3": !0 },
      h4: { "a2ui-text-h4": !0 },
      h5: { "a2ui-text-h5": !0 },
      caption: { "a2ui-text-caption": !0 },
      body: { "a2ui-text-body": !0 }
    },
    TextField: {
      container: { "a2ui-text-field": !0 },
      label: { "a2ui-text-field-label": !0 },
      element: { "a2ui-text-field-element": !0 }
    },
    Video: { "a2ui-video": !0 }
  },
  elements: {
    a: {},
    audio: {},
    body: {},
    button: {},
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    iframe: {},
    input: {},
    p: {},
    pre: {},
    textarea: {},
    video: {}
  },
  markdown: {
    p: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    ul: [],
    ol: [],
    li: [],
    a: [],
    strong: [],
    em: []
  }
}, _ = Symbol("A2UICatalog"), b = Symbol("A2UITheme"), k = Symbol("A2UIProcessor"), U = Symbol("A2UIMarkdownRenderer");
function N(e) {
  const r = B({
    components: (e == null ? void 0 : e.components) ?? {},
    elements: (e == null ? void 0 : e.elements) ?? {},
    markdown: (e == null ? void 0 : e.markdown) ?? {
      p: [],
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      ul: [],
      ol: [],
      li: [],
      a: [],
      strong: [],
      em: []
    },
    additionalStyles: e == null ? void 0 : e.additionalStyles,
    update(u) {
      r.components = u.components, r.elements = u.elements, r.markdown = u.markdown, r.additionalStyles = u.additionalStyles;
    }
  });
  return r;
}
function X() {
  const e = v(b);
  if (!e)
    throw new Error("[A2UI] ThemeState not provided. Did you install the A2UI plugin?");
  return e;
}
function $() {
  const e = new O.A2uiMessageProcessor(), r = R(0), u = [];
  function i() {
    r.value++;
  }
  function s(o) {
    e.processMessages(o), i();
  }
  function t(o) {
    return new Promise((d, f) => {
      const h = { message: o, resolve: d, reject: f };
      for (const D of u)
        D(h);
    });
  }
  function c(o, d, f) {
    return e.getData(
      o,
      d,
      f ?? void 0
    );
  }
  function m(o, d, f, h) {
    e.setData(o, d, f, h), i();
  }
  function p(o, d) {
    return e.resolvePath(o, d);
  }
  function a() {
    const o = e.getSurfaces(), d = /* @__PURE__ */ new Map();
    for (const [f, h] of o.entries())
      h.rootComponentId != null && d.set(f, h);
    return d;
  }
  function n() {
    e.clearSurfaces(), i();
  }
  function l(o) {
    u.push(o);
  }
  return {
    version: r,
    processMessages: s,
    dispatch: t,
    getData: c,
    setData: m,
    resolvePath: p,
    getSurfaces: a,
    clearSurfaces: n,
    onEvent: l
  };
}
function P() {
  const e = v(k);
  if (!e)
    throw new Error("[A2UI] ProcessorState not provided. Did you install the A2UI plugin?");
  return e;
}
let w = !1;
const T = async (e, r) => {
  try {
    return await (await Function('return import("@a2ui/markdown-it")')()).renderMarkdown(e, r);
  } catch {
    return w || (console.warn("[A2UI] Failed to load optional `@a2ui/markdown-it` renderer. Using fallback."), w = !0), e;
  }
};
function Y() {
  return v(U, T);
}
let I = !1;
function Z(e = {}) {
  return {
    install(r) {
      const u = e.catalog ?? A, i = N(e.theme ?? K), s = $(), t = e.markdownRenderer ?? T;
      if (r.provide(_, u), r.provide(b, i), r.provide(k, s), r.provide(U, t), typeof document < "u" && !I) {
        const c = document.createElement("style");
        c.setAttribute("data-a2ui", "structural"), c.textContent = M, document.head.appendChild(c), I = !0;
      }
    }
  };
}
let V = 0;
function ee() {
  const e = v(k), r = v(b);
  function u(t, c, m) {
    return !t || typeof t != "object" ? null : "literal" in t && t.literal != null ? t.literal : t.path ? e.getData(c, t.path, m) : "literalString" in t ? t.literalString : "literalNumber" in t ? t.literalNumber : "literalBoolean" in t ? t.literalBoolean : null;
  }
  function i(t, c, m) {
    const p = {};
    if (t.context) {
      for (const n of t.context)
        if (n.value.literalBoolean !== void 0)
          p[n.key] = n.value.literalBoolean;
        else if (n.value.literalNumber !== void 0)
          p[n.key] = n.value.literalNumber;
        else if (n.value.literalString !== void 0)
          p[n.key] = n.value.literalString;
        else if (n.value.path) {
          const l = e.resolvePath(n.value.path, c.dataContextPath), o = e.getData(c, l, m);
          p[n.key] = o;
        }
    }
    const a = {
      userAction: {
        name: t.name,
        sourceComponentId: c.id,
        surfaceId: m ?? "",
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        context: p
      }
    };
    return e.dispatch(a);
  }
  function s(t) {
    return `${t}-${V++}`;
  }
  return {
    processor: e,
    theme: r,
    resolvePrimitive: u,
    sendAction: i,
    getUniqueId: s
  };
}
const q = /* @__PURE__ */ x({
  __name: "A2UIRenderer",
  props: {
    surfaceId: {},
    component: {}
  },
  setup(e) {
    const r = e, u = v(_), i = P(), s = g(() => {
      i.version.value;
      let a = r.component;
      if (!a.type && a.component) {
        const n = a.component, l = Object.keys(n)[0];
        l && (a = { ...a, type: l, properties: n[l] });
      }
      return a;
    }), t = /* @__PURE__ */ new Map();
    function c(a, n) {
      if (t.has(n))
        return t.get(n);
      let l;
      if (typeof a == "function") {
        const o = a();
        o && typeof o == "object" && "then" in o ? l = j(() => o) : o && typeof o == "object" && ("setup" in o || "render" in o || "__name" in o) ? l = o : l = a;
      } else
        l = a;
      return t.set(n, l), l;
    }
    const m = g(() => {
      const a = s.value, n = u[a.type];
      return n ? c(n, a.type) : (console.warn(`[A2UI] Unknown component type: ${a.type}`), null);
    }), p = g(() => {
      i.version.value;
      const a = s.value;
      return {
        surfaceId: r.surfaceId,
        component: a,
        weight: a.weight ?? 0,
        ...a.properties
      };
    });
    return (a, n) => m.value ? (y(), C(F(m.value), E({ key: 0 }, p.value, {
      key: s.value.id + ":" + s.value.type
    }), null, 16)) : S("", !0);
  }
}), G = { class: "a2ui-surface" }, H = /* @__PURE__ */ x({
  __name: "A2UISurface",
  props: {
    surfaceId: {},
    surface: {}
  },
  setup(e) {
    const r = e, u = P(), i = g(() => (u.version.value, r.surface ?? u.getSurfaces().get(r.surfaceId) ?? null)), s = g(() => {
      var t;
      return u.version.value, ((t = i.value) == null ? void 0 : t.componentTree) ?? null;
    });
    return (t, c) => (y(), L("div", G, [
      s.value ? (y(), C(q, {
        key: 0,
        "surface-id": e.surfaceId,
        component: s.value
      }, null, 8, ["surface-id", "component"])) : S("", !0)
    ]));
  }
}), W = (e, r) => {
  const u = e.__vccOpts || e;
  for (const [i, s] of r)
    u[i] = s;
  return u;
}, te = /* @__PURE__ */ W(H, [["__scopeId", "data-v-b45a7b93"]]);
export {
  te as A,
  _ as C,
  A as D,
  U as M,
  k as P,
  b as T,
  q as _,
  W as a,
  Y as b,
  Z as c,
  $ as d,
  N as e,
  K as f,
  T as g,
  P as h,
  X as i,
  Q as r,
  ee as u
};

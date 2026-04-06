# A2UI Vue 3 renderer

Vue 3 implementation of the **[A2UI](https://a2ui.org/)** (Agent-to-User Interface) **v0.8** web renderer. A2UI is a declarative, JSON-based protocol for streaming UI from agents; this package maps the standard catalog (Row, Column, Text, Button, etc.) to Vue components and wires them to [`@a2ui/web_core`](https://www.npmjs.com/package/@a2ui/web_core) for message processing, data binding, and structural styles.

This project is licensed under the **Apache License 2.0**.

## Status

Aligned with **A2UI v0.8** (public preview). The specification and renderers continue to evolve; see the [main A2UI repository](https://github.com/google/A2UI) and [protocol documentation](https://github.com/google/A2UI/blob/main/specification/v0_8/docs/a2ui_protocol.md).

## Requirements

- **Vue** `^3.5.0`
- **`@a2ui/web_core`** `^0.9.0`

Optional: **`@a2ui/markdown-it`** for richer Markdown in `Text` components (otherwise plain text / simple fallback).

## Installation

```bash
npm install LeandroBarone/a2ui-vue.git
```
Or

```bash
bun add LeandroBarone/a2ui-vue.git
```

## Quick start

```ts
import { createApp } from 'vue';
import {
  createA2UI,
  A2UISurface,
  useProcessor,
} from 'a2ui-vue';

const app = createApp({
  setup() {
    const processor = useProcessor();
    processor.processMessages([
      /* surfaceUpdate, dataModelUpdate, beginRendering, … */
    ]);
    return { processor };
  },
  template: '<A2UISurface surface-id="main" />',
});

app.component('A2UISurface', A2UISurface);
app.use(createA2UI({
  theme: {
    components: { /* class maps per component, see Angular v0_8 demo for shape */ },
    elements: {},
    markdown: { p: [], h1: [], /* … */ },
  },
}));

app.mount('#app');
```

Register **`createA2UI`** before components that call **`useProcessor`** / **`useTheme`**. Feed the stream with **`processor.processMessages(...)`** using the same **`surfaceId`** as **`A2UISurface`**. Handle outbound **`userAction`** events via **`processor.onEvent`** (resolve the promise your app uses to send events to your backend).

## Demo

From this package root (after `npm install`):

```bash
npm run demo
```

Opens the Vite explorer (default port **5174**) with sample surfaces.

## Development

Running **`npm install`** installs **`@a2ui/web_core`** and **`vue`** as **devDependencies**, so **`npm test`**, **`npm run build`**, and **`npm run demo`** resolve the same packages that consumers provide as **peer dependencies**.

```bash
npm install
npm test
npm run build
```

The `dist/` directory is committed to the repository. Run **`npm run build`** and commit the result before pushing changes intended for consumers.

## Related

- [A2UI main README / ecosystem](https://github.com/google/A2UI/blob/main/README.md)
- [A2UI v0.8 protocol](https://github.com/google/A2UI/blob/main/specification/v0_8/docs/a2ui_protocol.md)

## License

Apache License 2.0. See the [LICENSE](LICENSE) file in this package.

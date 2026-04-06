export { createA2UI } from './plugin';
export type { A2UIPluginOptions } from './plugin';
export { defaultA2UITheme } from './defaultTheme';

export { DEFAULT_CATALOG, registerStandardComponents } from './catalog';
export type { Catalog, CatalogEntry } from './catalog';

export { createProcessor, useProcessor } from './data/useProcessor';
export type { ProcessorState, A2UIClientEvent } from './data/useProcessor';
export { defaultMarkdownRenderer, useMarkdownRenderer } from './data/markdown';
export type { MarkdownRendererFn } from './data/markdown';

export { createTheme, useTheme } from './rendering/useTheme';
export type { ThemeState } from './rendering/useTheme';
export { useComponent } from './rendering/useComponent';

export { CatalogKey, ThemeKey, ProcessorKey, MarkdownRendererKey } from './injection-keys';

export type { Types } from './types';

export { default as A2UISurface } from './components/A2UISurface.vue';
export { default as A2UIRenderer } from './rendering/A2UIRenderer.vue';

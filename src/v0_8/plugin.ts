import type { Plugin } from 'vue';
import { structuralStyles } from '@a2ui/web_core/styles/index';
import type { Catalog } from './catalog';
import { DEFAULT_CATALOG } from './catalog';
import { defaultA2UITheme } from './defaultTheme';
import { CatalogKey, ThemeKey, ProcessorKey, MarkdownRendererKey } from './injection-keys';
import { createTheme } from './rendering/useTheme';
import { createProcessor } from './data/useProcessor';
import { defaultMarkdownRenderer } from './data/markdown';
import type { MarkdownRendererFn } from './data/markdown';
import type { Types } from './types';

let stylesInserted = false;

export interface A2UIPluginOptions {
  catalog?: Catalog;
  theme?: Types.Theme;
  markdownRenderer?: MarkdownRendererFn;
}

export function createA2UI(options: A2UIPluginOptions = {}): Plugin {
  return {
    install(app) {
      const catalog = options.catalog ?? DEFAULT_CATALOG;
      const theme = createTheme(options.theme ?? defaultA2UITheme);
      const processor = createProcessor();
      const markdownRenderer = options.markdownRenderer ?? defaultMarkdownRenderer;

      app.provide(CatalogKey, catalog);
      app.provide(ThemeKey, theme);
      app.provide(ProcessorKey, processor);
      app.provide(MarkdownRendererKey, markdownRenderer);

      if (typeof document !== 'undefined' && !stylesInserted) {
        const styleElement = document.createElement('style');
        styleElement.setAttribute('data-a2ui', 'structural');
        styleElement.textContent = structuralStyles;
        document.head.appendChild(styleElement);
        stylesInserted = true;
      }
    },
  };
}

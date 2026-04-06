import type { InjectionKey } from 'vue';
import type { Catalog } from './catalog';
import type { ThemeState } from './rendering/useTheme';
import type { ProcessorState } from './data/useProcessor';
import type { MarkdownRendererFn } from './data/markdown';
export declare const CatalogKey: InjectionKey<Catalog>;
export declare const ThemeKey: InjectionKey<ThemeState>;
export declare const ProcessorKey: InjectionKey<ProcessorState>;
export declare const MarkdownRendererKey: InjectionKey<MarkdownRendererFn>;

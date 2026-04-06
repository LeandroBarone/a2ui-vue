import type { InjectionKey } from 'vue';
import type { Catalog } from './catalog';
import type { ThemeState } from './rendering/useTheme';
import type { ProcessorState } from './data/useProcessor';
import type { MarkdownRendererFn } from './data/markdown';

export const CatalogKey: InjectionKey<Catalog> = Symbol('A2UICatalog');
export const ThemeKey: InjectionKey<ThemeState> = Symbol('A2UITheme');
export const ProcessorKey: InjectionKey<ProcessorState> = Symbol('A2UIProcessor');
export const MarkdownRendererKey: InjectionKey<MarkdownRendererFn> = Symbol('A2UIMarkdownRenderer');

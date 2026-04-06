import type { Plugin } from 'vue';
import type { Catalog } from './catalog';
import type { MarkdownRendererFn } from './data/markdown';
import type { Types } from './types';
export interface A2UIPluginOptions {
    catalog?: Catalog;
    theme?: Types.Theme;
    markdownRenderer?: MarkdownRendererFn;
}
export declare function createA2UI(options?: A2UIPluginOptions): Plugin;

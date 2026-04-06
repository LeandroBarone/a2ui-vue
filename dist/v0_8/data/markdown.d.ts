import type { Types } from '../types';
export type MarkdownRendererFn = (markdown: string, options?: Types.MarkdownRendererOptions) => Promise<string>;
export declare const defaultMarkdownRenderer: MarkdownRendererFn;
export declare function useMarkdownRenderer(): MarkdownRendererFn;

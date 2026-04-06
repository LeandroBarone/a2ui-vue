import { inject } from 'vue';
import type { Types } from '../types';
import { MarkdownRendererKey } from '../injection-keys';

export type MarkdownRendererFn = (markdown: string, options?: Types.MarkdownRendererOptions) => Promise<string>;

let warningLogged = false;

export const defaultMarkdownRenderer: MarkdownRendererFn = async (
  markdown: string,
  options?: Types.MarkdownRendererOptions,
): Promise<string> => {
  try {
    const mod = await (Function('return import("@a2ui/markdown-it")')() as Promise<any>);
    return await mod.renderMarkdown(markdown, options);
  } catch {
    if (!warningLogged) {
      console.warn('[A2UI] Failed to load optional `@a2ui/markdown-it` renderer. Using fallback.');
      warningLogged = true;
    }
    return markdown;
  }
};

export function useMarkdownRenderer(): MarkdownRendererFn {
  return inject(MarkdownRendererKey, defaultMarkdownRenderer);
}

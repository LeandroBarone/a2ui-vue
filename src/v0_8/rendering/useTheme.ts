import { reactive, inject } from 'vue';
import type { Types } from '../types';
import { ThemeKey } from '../injection-keys';

export interface ThemeState {
  components: Types.Theme['components'];
  elements: Types.Theme['elements'];
  markdown: Types.Theme['markdown'];
  additionalStyles?: Types.Theme['additionalStyles'];
  update: (theme: Types.Theme) => void;
}

export function createTheme(initial?: Types.Theme): ThemeState {
  const state = reactive<ThemeState>({
    components: (initial?.components ?? {}) as Types.Theme['components'],
    elements: (initial?.elements ?? {}) as Types.Theme['elements'],
    markdown: initial?.markdown ?? {
      p: [], h1: [], h2: [], h3: [], h4: [], h5: [],
      ul: [], ol: [], li: [], a: [], strong: [], em: [],
    },
    additionalStyles: initial?.additionalStyles,
    update(theme: Types.Theme) {
      state.components = theme.components;
      state.elements = theme.elements;
      state.markdown = theme.markdown;
      state.additionalStyles = theme.additionalStyles;
    },
  });
  return state;
}

export function useTheme(): ThemeState {
  const theme = inject(ThemeKey);
  if (!theme) {
    throw new Error('[A2UI] ThemeState not provided. Did you install the A2UI plugin?');
  }
  return theme;
}

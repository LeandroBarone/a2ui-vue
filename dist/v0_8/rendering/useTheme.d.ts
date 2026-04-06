import type { Types } from '../types';
export interface ThemeState {
    components: Types.Theme['components'];
    elements: Types.Theme['elements'];
    markdown: Types.Theme['markdown'];
    additionalStyles?: Types.Theme['additionalStyles'];
    update: (theme: Types.Theme) => void;
}
export declare function createTheme(initial?: Types.Theme): ThemeState;
export declare function useTheme(): ThemeState;

import type { Types } from '../types';
import type { ProcessorState } from '../data/useProcessor';
import type { ThemeState } from './useTheme';
export declare function useComponent(): {
    processor: ProcessorState;
    theme: ThemeState;
    resolvePrimitive: {
        (value: Types.StringValue | null, component: Types.AnyComponentNode, surfaceId?: string | null): string | null;
        (value: Types.BooleanValue | null, component: Types.AnyComponentNode, surfaceId?: string | null): boolean | null;
        (value: Types.NumberValue | null, component: Types.AnyComponentNode, surfaceId?: string | null): number | null;
    };
    sendAction: (action: Types.Action, component: Types.AnyComponentNode, surfaceId?: string | null) => Promise<Types.ServerToClientMessage[]>;
    getUniqueId: (prefix: string) => string;
};

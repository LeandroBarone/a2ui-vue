import { ref } from 'vue';
import * as WebCore from '@a2ui/web_core/v0_8';
import type { Types } from '../types';
export interface A2UIClientEvent {
    message: Types.A2UIClientEventMessage;
    resolve: (msgs: Types.ServerToClientMessage[]) => void;
    reject: (err: unknown) => void;
}
export interface ProcessorState {
    version: ReturnType<typeof ref<number>>;
    processMessages: (messages: Types.ServerToClientMessage[]) => void;
    dispatch: (message: Types.A2UIClientEventMessage) => Promise<Types.ServerToClientMessage[]>;
    getData: (node: Types.AnyComponentNode, path: string, surfaceId?: string | null) => unknown;
    setData: (node: Types.AnyComponentNode | null, path: string, value: any, surfaceId: string) => void;
    resolvePath: (path: string, dataContextPath?: string) => string;
    getSurfaces: () => ReadonlyMap<string, WebCore.Surface>;
    clearSurfaces: () => void;
    onEvent: (handler: (event: A2UIClientEvent) => void) => void;
}
export declare function createProcessor(): ProcessorState;
export declare function useProcessor(): ProcessorState;

import { ref, inject } from 'vue';
import * as WebCore from '@a2ui/web_core/v0_8';
import type { Types } from '../types';
import { ProcessorKey } from '../injection-keys';

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

export function createProcessor(): ProcessorState {
  const baseProcessor = new WebCore.A2uiMessageProcessor();
  const version = ref(0);
  const eventHandlers: Array<(event: A2UIClientEvent) => void> = [];

  function notify() {
    version.value++;
  }

  function processMessages(messages: Types.ServerToClientMessage[]) {
    baseProcessor.processMessages(messages as WebCore.ServerToClientMessage[]);
    notify();
  }

  function dispatch(message: Types.A2UIClientEventMessage): Promise<Types.ServerToClientMessage[]> {
    return new Promise((resolve, reject) => {
      const event: A2UIClientEvent = { message, resolve, reject };
      for (const handler of eventHandlers) {
        handler(event);
      }
    });
  }

  function getData(node: Types.AnyComponentNode, path: string, surfaceId?: string | null): unknown {
    return baseProcessor.getData(
      node as WebCore.AnyComponentNode,
      path,
      surfaceId ?? undefined,
    );
  }

  function setData(node: Types.AnyComponentNode | null, path: string, value: any, surfaceId: string) {
    baseProcessor.setData(node as WebCore.AnyComponentNode | null, path, value, surfaceId);
    notify();
  }

  function resolvePath(path: string, dataContextPath?: string): string {
    return baseProcessor.resolvePath(path, dataContextPath);
  }

  function getSurfaces(): ReadonlyMap<string, WebCore.Surface> {
    const allSurfaces = baseProcessor.getSurfaces();
    const readySurfaces = new Map<string, WebCore.Surface>();
    for (const [id, surface] of allSurfaces.entries()) {
      if (surface.rootComponentId != null) {
        readySurfaces.set(id, surface);
      }
    }
    return readySurfaces;
  }

  function clearSurfaces() {
    baseProcessor.clearSurfaces();
    notify();
  }

  function onEvent(handler: (event: A2UIClientEvent) => void) {
    eventHandlers.push(handler);
  }

  return {
    version,
    processMessages,
    dispatch,
    getData,
    setData,
    resolvePath,
    getSurfaces,
    clearSurfaces,
    onEvent,
  };
}

export function useProcessor(): ProcessorState {
  const processor = inject(ProcessorKey);
  if (!processor) {
    throw new Error('[A2UI] ProcessorState not provided. Did you install the A2UI plugin?');
  }
  return processor;
}

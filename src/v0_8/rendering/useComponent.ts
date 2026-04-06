import { inject } from 'vue';
import type { Types } from '../types';
import { ProcessorKey } from '../injection-keys';
import { ThemeKey } from '../injection-keys';
import type { ProcessorState } from '../data/useProcessor';
import type { ThemeState } from './useTheme';

let idCounter = 0;

export function useComponent() {
  const processor = inject(ProcessorKey) as ProcessorState;
  const theme = inject(ThemeKey) as ThemeState;

  function resolvePrimitive(value: Types.StringValue | null, component: Types.AnyComponentNode, surfaceId?: string | null): string | null;
  function resolvePrimitive(value: Types.BooleanValue | null, component: Types.AnyComponentNode, surfaceId?: string | null): boolean | null;
  function resolvePrimitive(value: Types.NumberValue | null, component: Types.AnyComponentNode, surfaceId?: string | null): number | null;
  function resolvePrimitive(
    value: Types.StringValue | Types.BooleanValue | Types.NumberValue | null,
    component: Types.AnyComponentNode,
    surfaceId?: string | null,
  ): string | boolean | number | null {
    if (!value || typeof value !== 'object') {
      return null;
    } else if ('literal' in value && (value as any).literal != null) {
      return (value as any).literal;
    } else if ((value as any).path) {
      return processor.getData(component, (value as any).path, surfaceId) as any;
    } else if ('literalString' in value) {
      return (value as any).literalString;
    } else if ('literalNumber' in value) {
      return (value as any).literalNumber;
    } else if ('literalBoolean' in value) {
      return (value as any).literalBoolean;
    }
    return null;
  }

  function sendAction(action: Types.Action, component: Types.AnyComponentNode, surfaceId?: string | null): Promise<Types.ServerToClientMessage[]> {
    const context: Record<string, unknown> = {};

    if (action.context) {
      for (const item of action.context) {
        if (item.value.literalBoolean !== undefined) {
          context[item.key] = item.value.literalBoolean;
        } else if (item.value.literalNumber !== undefined) {
          context[item.key] = item.value.literalNumber;
        } else if (item.value.literalString !== undefined) {
          context[item.key] = item.value.literalString;
        } else if (item.value.path) {
          const path = processor.resolvePath(item.value.path, component.dataContextPath);
          const val = processor.getData(component, path, surfaceId);
          context[item.key] = val;
        }
      }
    }

    const message: Types.A2UIClientEventMessage = {
      userAction: {
        name: action.name,
        sourceComponentId: component.id,
        surfaceId: surfaceId ?? '',
        timestamp: new Date().toISOString(),
        context,
      },
    };

    return processor.dispatch(message);
  }

  function getUniqueId(prefix: string): string {
    return `${prefix}-${idCounter++}`;
  }

  return {
    processor,
    theme,
    resolvePrimitive,
    sendAction,
    getUniqueId,
  };
}

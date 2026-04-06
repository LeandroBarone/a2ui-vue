<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  label?: Types.StringValue | null;
  value: Types.StringValue | null;
  enableDate?: boolean;
  enableTime?: boolean;
}>();

const { processor, theme, resolvePrimitive, sendAction, getUniqueId } = useComponent();

const inputId = getUniqueId('a2ui-datetime-input');

const inputType = computed(() => {
  const d = props.enableDate ?? true;
  const t = props.enableTime ?? false;
  if (d && t) return 'datetime-local';
  if (t) return 'time';
  return 'date';
});

const resolvedLabel = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.label as any, props.component, props.surfaceId) as string | null;
});

const resolvedValue = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.value as any, props.component, props.surfaceId) as string | null;
});

function onChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const valueNode = props.value;
  if (valueNode && typeof valueNode === 'object' && 'path' in valueNode && (valueNode as any).path) {
    processor.processMessages([{
      dataModelUpdate: {
        surfaceId: props.surfaceId,
        path: processor.resolvePath((valueNode as any).path, props.component.dataContextPath),
        contents: [{ key: '.', valueString: value }],
      },
    }]);
  } else {
    sendAction(
      { name: 'change', context: [{ key: 'value', value: { literalString: value } }] },
      props.component,
      props.surfaceId,
    );
  }
}
</script>

<template>
  <a2ui-datetime-input :style="{ display: 'block' }">
    <div :class="(theme.components as any).DateTimeInput?.container" :style="(theme.additionalStyles as any)?.DateTimeInput">
      <label :class="(theme.components as any).DateTimeInput?.label" :for="inputId">
        {{ resolvedLabel }}
      </label>
      <input
        :type="inputType"
        :class="(theme.components as any).DateTimeInput?.element"
        :id="inputId"
        :value="resolvedValue ?? ''"
        @change="onChange"
      />
    </div>
  </a2ui-datetime-input>
</template>

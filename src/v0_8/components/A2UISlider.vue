<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  label?: Types.StringValue | null;
  value: Types.NumberValue | null;
  minValue?: number;
  maxValue?: number;
}>();

const { processor, theme, resolvePrimitive, sendAction, getUniqueId } = useComponent();

const inputId = getUniqueId('a2ui-slider-input');
const labelId = getUniqueId('a2ui-slider-label');

const resolvedLabel = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.label as any, props.component, props.surfaceId) as string | null;
});

const resolvedValue = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.value as any, props.component, props.surfaceId) as number | null;
});

function onInput(event: Event) {
  const value = Number((event.target as HTMLInputElement).value);
  const valueNode = props.value;
  if (valueNode && typeof valueNode === 'object' && 'path' in valueNode && (valueNode as any).path) {
    processor.processMessages([{
      dataModelUpdate: {
        surfaceId: props.surfaceId,
        path: processor.resolvePath((valueNode as any).path, props.component.dataContextPath),
        contents: [{ key: '.', valueNumber: value }],
      },
    }]);
  } else {
    sendAction(
      { name: 'change', context: [{ key: 'value', value: { literalNumber: value } }] },
      props.component,
      props.surfaceId,
    );
  }
}
</script>

<template>
  <a2ui-slider :style="{ display: 'block' }">
    <div :class="(theme.components as any).Slider?.container" :style="(theme.additionalStyles as any)?.Slider">
      <label
        v-if="resolvedLabel"
        :class="(theme.components as any).Slider?.label"
        :id="labelId"
      >
        {{ resolvedLabel }}
      </label>
      <input
        type="range"
        :class="(theme.components as any).Slider?.element"
        :id="inputId"
        :aria-labelledby="labelId"
        :min="minValue ?? 0"
        :max="maxValue ?? 100"
        :value="resolvedValue ?? 0"
        @input="onInput"
      />
    </div>
  </a2ui-slider>
</template>

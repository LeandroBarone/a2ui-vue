<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  label?: Types.StringValue | null;
  options: { label: Types.StringValue; value: string }[];
  selections: Types.AnyComponentNode | null;
}>();

const { processor, theme, resolvePrimitive, sendAction, getUniqueId } = useComponent();

const selectId = getUniqueId('a2ui-multiple-choice');

const resolvedLabel = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.label as any, props.component, props.surfaceId) as string | null;
});

const resolvedOptions = computed(() => {
  processor.version.value;
  return props.options.map((opt) => ({
    label: resolvePrimitive(opt.label as any, props.component, props.surfaceId) as string | null,
    value: opt.value,
  }));
});

const resolvedSelections = computed(() => {
  const s = props.selections;
  if (s && typeof s === 'object' && 'literalArray' in s) {
    return (s as any).literalArray as string[];
  }
  return [];
});

function onChange(event: Event) {
  const value = (event.target as HTMLSelectElement).value;
  const selectionsNode = props.selections;
  if (selectionsNode && typeof selectionsNode === 'object' && 'path' in selectionsNode && (selectionsNode as any).path) {
    processor.processMessages([{
      dataModelUpdate: {
        surfaceId: props.surfaceId,
        path: processor.resolvePath((selectionsNode as any).path, props.component.dataContextPath),
        contents: [{ key: '.', valueString: JSON.stringify({ literalArray: [value] }) }],
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
  <a2ui-multiple-choice :style="{ display: 'block' }">
    <div
      :class="(theme.components as any).MultipleChoice?.container"
      :style="(theme.additionalStyles as any)?.MultipleChoice"
    >
      <label :class="(theme.components as any).MultipleChoice?.label" :for="selectId">
        {{ resolvedLabel }}
      </label>
      <select
        :class="(theme.components as any).MultipleChoice?.element"
        :id="selectId"
        :value="resolvedSelections[0] || ''"
        @change="onChange"
      >
        <option v-for="option in resolvedOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </a2ui-multiple-choice>
</template>

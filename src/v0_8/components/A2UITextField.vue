<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  label: Types.StringValue | null;
  text?: Types.StringValue | null;
  textFieldType?: Types.ResolvedTextField['textFieldType'];
}>();

const { processor, theme, resolvePrimitive, sendAction, getUniqueId } = useComponent();

const inputId = getUniqueId('a2ui-text-field');

const resolvedLabel = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.label as any, props.component, props.surfaceId) as string | null;
});

const resolvedText = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.text as any, props.component, props.surfaceId) as string | null;
});

const htmlInputType = computed(() => {
  switch (props.textFieldType) {
    case 'number': return 'number';
    case 'date': return 'date';
    default: return 'text';
  }
});

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const textNode = props.text;
  if (textNode && typeof textNode === 'object' && 'path' in textNode && (textNode as any).path) {
    processor.processMessages([{
      dataModelUpdate: {
        surfaceId: props.surfaceId,
        path: processor.resolvePath((textNode as any).path, props.component.dataContextPath),
        contents: [{ key: '.', valueString: value }],
      },
    }]);
  } else {
    sendAction(
      { name: 'input', context: [{ key: 'value', value: { literalString: value } }] },
      props.component,
      props.surfaceId,
    );
  }
}
</script>

<template>
  <a2ui-text-field :style="{ display: 'block' }">
    <div :class="(theme.components as any).TextField?.container" :style="(theme.additionalStyles as any)?.TextField">
      <label :class="(theme.components as any).TextField?.label" :for="inputId">
        {{ resolvedLabel }}
      </label>
      <input
        :type="htmlInputType"
        :class="(theme.components as any).TextField?.element"
        :id="inputId"
        :value="resolvedText ?? ''"
        @input="onInput"
      />
    </div>
  </a2ui-text-field>
</template>

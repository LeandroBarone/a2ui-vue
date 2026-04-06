<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  label: Types.StringValue | null;
  checked: Types.BooleanValue | null;
}>();

const { processor, resolvePrimitive, sendAction, getUniqueId } = useComponent();

const inputId = getUniqueId('a2ui-checkbox');

const inputChecked = computed(() => {
  processor.version.value;
  return (resolvePrimitive(props.checked as any, props.component, props.surfaceId) as boolean | null) ?? false;
});

const resolvedLabel = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.label as any, props.component, props.surfaceId) as string | null;
});

function onToggle(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  const checkedNode = props.checked;
  if (checkedNode && typeof checkedNode === 'object' && 'path' in checkedNode && (checkedNode as any).path) {
    processor.processMessages([{
      dataModelUpdate: {
        surfaceId: props.surfaceId,
        path: processor.resolvePath((checkedNode as any).path, props.component.dataContextPath),
        contents: [{ key: '.', valueBoolean: checked }],
      },
    }]);
  } else {
    sendAction(
      { name: 'toggle', context: [{ key: 'checked', value: { literalBoolean: checked } }] },
      props.component,
      props.surfaceId,
    );
  }
}
</script>

<template>
  <a2ui-checkbox :style="{ display: 'flex', alignItems: 'center', gap: '0.5rem' }">
    <label>
      <input
        type="checkbox"
        :id="inputId"
        :checked="inputChecked"
        @change="onToggle"
      />
      {{ resolvedLabel }}
    </label>
  </a2ui-checkbox>
</template>

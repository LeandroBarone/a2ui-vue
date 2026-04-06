<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  url: Types.StringValue | null;
}>();

const { processor, theme, resolvePrimitive } = useComponent();

const resolvedUrl = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.url as any, props.component, props.surfaceId) as string | null;
});
</script>

<template>
  <a2ui-audio :style="{ display: 'flex' }">
    <audio
      controls
      :src="resolvedUrl ?? undefined"
      :style="[(theme.additionalStyles as any)?.AudioPlayer, { width: '100%' }]"
    ></audio>
  </a2ui-audio>
</template>

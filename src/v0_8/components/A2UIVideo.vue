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
  <a2ui-video
    v-if="resolvedUrl"
    :style="{ display: 'block', flex: 'var(--weight)', minHeight: 0, overflow: 'auto' }"
  >
    <section :class="(theme.components as any).Video" :style="(theme.additionalStyles as any)?.Video">
      <video controls :src="resolvedUrl" style="display: block; width: 100%; box-sizing: border-box;"></video>
    </section>
  </a2ui-video>
</template>

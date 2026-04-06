<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useProcessor } from '../data/useProcessor';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  surface?: Types.Surface | null;
}>();

const processor = useProcessor();

const currentSurface = computed(() => {
  processor.version.value;
  return props.surface ?? processor.getSurfaces().get(props.surfaceId) ?? null;
});

const rootComponent = computed(() => {
  processor.version.value;
  return currentSurface.value?.componentTree ?? null;
});
</script>

<template>
  <div class="a2ui-surface">
    <A2UIRenderer
      v-if="rootComponent"
      :surface-id="surfaceId"
      :component="rootComponent"
    />
  </div>
</template>

<style scoped>
.a2ui-surface {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

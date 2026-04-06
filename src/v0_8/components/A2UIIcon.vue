<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  name?: Types.StringValue | null;
}>();

const { processor, theme, resolvePrimitive } = useComponent();

const resolvedName = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.name as any, props.component, props.surfaceId) as string | null;
});
</script>

<template>
  <a2ui-icon
    v-if="resolvedName"
    aria-hidden="true"
    tabindex="-1"
    :style="{ display: 'block', flex: 'var(--weight)', minHeight: 0, overflow: 'auto' }"
  >
    <section :class="(theme.components as any).Icon" :style="(theme.additionalStyles as any)?.Icon">
      <span class="g-icon">{{ resolvedName }}</span>
    </section>
  </a2ui-icon>
</template>

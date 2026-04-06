<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  alignment?: Types.ResolvedList['alignment'];
  direction?: Types.ResolvedList['direction'];
  children?: Types.AnyComponentNode[] | null;
}>();

const { theme } = useComponent();

const direction = computed(() => props.direction ?? 'vertical');

const resolvedChildren = computed(() => {
  return props.children ?? (props.component.properties as any).children ?? [];
});
</script>

<template>
  <a2ui-list
    :direction="direction"
    :style="{ display: 'block', flex: 'var(--weight)', minHeight: 0 }"
  >
    <section
      :class="(theme.components as any).List"
      :style="(theme.additionalStyles as any)?.List"
      class="a2ui-list-section"
      :data-direction="direction"
    >
      <template v-for="child in resolvedChildren" :key="child?.id ?? child">
        <div v-if="child" class="a2ui-list-item">
          <A2UIRenderer :surface-id="surfaceId" :component="child" />
        </div>
      </template>
    </section>
  </a2ui-list>
</template>

<style scoped>
.a2ui-list-section[data-direction='vertical'] {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
}
.a2ui-list-section[data-direction='horizontal'] {
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
}
.a2ui-list-item {
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
}
</style>

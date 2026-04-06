<script setup lang="ts">
import { computed } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  alignment?: Types.ResolvedRow['alignment'];
  distribution?: Types.ResolvedRow['distribution'];
  children?: Types.AnyComponentNode[] | null;
}>();

const { theme } = useComponent();

const alignment = computed(() => props.alignment ?? 'stretch');
const distribution = computed(() => props.distribution ?? 'start');

const resolvedChildren = computed(() => {
  return props.children ?? (props.component.properties as any).children ?? [];
});

const classes = computed(() => ({
  ...(theme.components as any).Row,
  [`align-${alignment.value}`]: true,
  [`distribute-${distribution.value}`]: true,
}));
</script>

<template>
  <a2ui-row
    :alignment="alignment"
    :distribution="distribution"
    :style="{ display: 'flex', flex: 'var(--weight)' }"
  >
    <section :class="classes" :style="(theme.additionalStyles as any)?.Row" class="a2ui-row-section">
      <template v-for="child in resolvedChildren" :key="child?.id ?? child">
        <A2UIRenderer
          v-if="child"
          :surface-id="surfaceId"
          :component="child"
        />
      </template>
    </section>
  </a2ui-row>
</template>

<style scoped>
.a2ui-row-section {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  width: 100%;
  min-height: 100%;
  box-sizing: border-box;
}
.align-start { align-items: start; }
.align-center { align-items: center; }
.align-end { align-items: end; }
.align-stretch { align-items: stretch; }
.distribute-start { justify-content: start; }
.distribute-center { justify-content: center; }
.distribute-end { justify-content: end; }
.distribute-spaceBetween { justify-content: space-between; }
.distribute-spaceAround { justify-content: space-around; }
.distribute-spaceEvenly { justify-content: space-evenly; }
</style>

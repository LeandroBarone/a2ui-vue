<script setup lang="ts">
import { computed } from 'vue';
import * as Styles from '@a2ui/web_core/styles/index';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  url?: Types.StringValue | null;
  usageHint?: Types.ResolvedImage['usageHint'] | null;
  fit?: Types.ResolvedImage['fit'] | null;
  altText?: Types.StringValue | null;
}>();

const { processor, theme, resolvePrimitive } = useComponent();

const resolvedUrl = computed(() => {
  processor.version.value;
  return resolvePrimitive(props.url as any, props.component, props.surfaceId) as string | null;
});

const resolvedAltText = computed(() => {
  processor.version.value;
  return (resolvePrimitive(props.altText as any, props.component, props.surfaceId) as string | null) ?? '';
});

const classes = computed(() => {
  const imageTheme = (theme.components as any).Image;
  if (!imageTheme) return {};
  return Styles.merge(
    imageTheme.all ?? {},
    props.usageHint ? (imageTheme[props.usageHint] ?? {}) : {},
  );
});
</script>

<template>
  <a2ui-image v-if="resolvedUrl" :style="{ display: 'block', flex: 'var(--weight)', minHeight: 0, overflow: 'auto' }">
    <section :class="classes" :style="(theme.additionalStyles as any)?.Image">
      <img :src="resolvedUrl" :alt="resolvedAltText" style="display: block; width: 100%; height: 100%; box-sizing: border-box;" />
    </section>
  </a2ui-image>
</template>

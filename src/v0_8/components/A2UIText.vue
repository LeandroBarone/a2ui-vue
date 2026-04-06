<script setup lang="ts">
import { computed, ref, watchEffect, toRaw } from 'vue';
import * as Styles from '@a2ui/web_core/styles/index';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import { useMarkdownRenderer } from '../data/markdown';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  text: Types.StringValue | null;
  usageHint?: Types.ResolvedText['usageHint'] | null;
}>();

const { processor, theme, resolvePrimitive } = useComponent();
const markdownRenderer = useMarkdownRenderer();

const renderedHtml = ref('');

watchEffect(async () => {
  processor.version.value;
  let value = resolvePrimitive(props.text as any, props.component, props.surfaceId) as string | null;

  if (value == null) {
    renderedHtml.value = '';
    return;
  }

  switch (props.usageHint) {
    case 'h1': value = `# ${value}`; break;
    case 'h2': value = `## ${value}`; break;
    case 'h3': value = `### ${value}`; break;
    case 'h4': value = `#### ${value}`; break;
    case 'h5': value = `##### ${value}`; break;
    case 'caption': value = `*${value}*`; break;
    default: value = String(value); break;
  }

  const rawMarkdown = JSON.parse(JSON.stringify(toRaw(theme.markdown)));
  renderedHtml.value = await markdownRenderer(value, {
    tagClassMap: Styles.appendToAll(rawMarkdown, ['ol', 'ul', 'li'], {}),
  });
});

const classes = computed(() => {
  const textTheme = (theme.components as any).Text;
  if (!textTheme) return {};
  return Styles.merge(
    textTheme.all ?? {},
    props.usageHint ? (textTheme[props.usageHint] ?? {}) : {},
  );
});

const additionalStyles = computed(() => {
  const styles = (theme.additionalStyles as any)?.Text;
  if (!styles) return undefined;
  if (typeof styles === 'object' && !Array.isArray(styles)) {
    const expected = ['h1', 'h2', 'h3', 'h4', 'h5', 'caption', 'body'];
    if (expected.every((v) => v in styles)) {
      return styles[props.usageHint ?? 'body'] || {};
    }
    return styles;
  }
  return undefined;
});
</script>

<template>
  <a2ui-text :style="[{ display: 'block', flex: 'var(--weight)' }, additionalStyles]">
    <section :class="classes" v-html="renderedHtml"></section>
  </a2ui-text>
</template>

<style>
a2ui-text h1,
a2ui-text h2,
a2ui-text h3,
a2ui-text h4,
a2ui-text h5 {
  line-height: inherit;
  font: inherit;
}
</style>

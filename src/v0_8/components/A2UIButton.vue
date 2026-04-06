<script setup lang="ts">
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  action?: Types.Action | null;
  child?: Types.AnyComponentNode | null;
  primary?: boolean | null;
}>();

const { theme, sendAction } = useComponent();

function handleClick() {
  if (props.action) {
    sendAction(props.action, props.component, props.surfaceId);
  }
}
</script>

<template>
  <a2ui-button :style="{ display: 'block', flex: 'var(--weight)', minHeight: 0 }">
    <button
      :class="(theme.components as any).Button"
      :style="(theme.additionalStyles as any)?.Button"
      @click="handleClick"
    >
      <A2UIRenderer
        v-if="child"
        :surface-id="surfaceId"
        :component="child"
      />
    </button>
  </a2ui-button>
</template>

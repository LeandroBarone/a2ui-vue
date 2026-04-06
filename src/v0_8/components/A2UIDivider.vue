<script setup lang="ts">
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';

defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
}>();

const { theme } = useComponent();
</script>

<template>
  <a2ui-divider :style="{ display: 'block', minHeight: 0, overflow: 'auto' }">
    <hr
      :class="(theme.components as any).Divider"
      :style="[(theme.additionalStyles as any)?.Divider, { height: '1px', background: '#ccc', border: 'none' }]"
    />
  </a2ui-divider>
</template>

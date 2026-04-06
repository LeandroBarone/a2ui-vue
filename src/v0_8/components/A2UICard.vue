<script setup lang="ts">
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  child?: Types.AnyComponentNode | null;
  children?: Types.AnyComponentNode[];
}>();

const { theme } = useComponent();
</script>

<template>
  <a2ui-card :style="{ display: 'block' }">
    <div :class="(theme.components as any).Card" :style="(theme.additionalStyles as any)?.Card">
      <A2UIRenderer
        v-if="child"
        :surface-id="surfaceId"
        :component="child"
      />
      <template v-if="children">
        <A2UIRenderer
          v-for="comp in children"
          :key="comp.id"
          :surface-id="surfaceId"
          :component="comp"
        />
      </template>
    </div>
  </a2ui-card>
</template>

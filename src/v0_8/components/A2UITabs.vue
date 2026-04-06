<script setup lang="ts">
import { ref } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  tabItems: Types.ResolvedTabs['tabItems'];
}>();

const { theme, resolvePrimitive } = useComponent();

const selectedIndex = ref(0);

function selectTab(index: number) {
  selectedIndex.value = index;
}
</script>

<template>
  <a2ui-tabs :style="{ display: 'block' }">
    <div :class="(theme.components as any).Tabs?.container" :style="(theme.additionalStyles as any)?.Tabs">
      <div :class="(theme.components as any).Tabs?.controls?.all">
        <button
          v-for="(item, i) in tabItems"
          :key="i"
          :class="selectedIndex === i ? (theme.components as any).Tabs?.controls?.selected : {}"
          @click="selectTab(i)"
        >
          {{ resolvePrimitive(item.title as any, component, surfaceId) }}
        </button>
      </div>
      <div class="a2ui-tabs-content" style="flex: 1; min-height: 0;">
        <A2UIRenderer
          v-if="tabItems[selectedIndex]"
          :surface-id="surfaceId"
          :component="(tabItems[selectedIndex] as any).child"
        />
      </div>
    </div>
  </a2ui-tabs>
</template>

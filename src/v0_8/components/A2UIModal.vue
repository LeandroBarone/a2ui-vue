<script setup lang="ts">
import { ref } from 'vue';
import type { Types } from '../types';
import { useComponent } from '../rendering/useComponent';
import A2UIRenderer from '../rendering/A2UIRenderer.vue';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
  weight?: string | number;
  entryPointChild: Types.AnyComponentNode;
  contentChild: Types.AnyComponentNode;
}>();

const { theme } = useComponent();

const isOpen = ref(false);

function openModal() {
  isOpen.value = true;
}

function closeModal() {
  isOpen.value = false;
}
</script>

<template>
  <a2ui-modal :style="{ display: 'inline-block' }">
    <div class="a2ui-modal-entry-point" style="cursor: pointer;" @click="openModal">
      <A2UIRenderer
        v-if="entryPointChild"
        :surface-id="surfaceId"
        :component="entryPointChild"
      />
    </div>

    <div
      v-if="isOpen"
      :class="(theme.components as any).Modal?.backdrop"
      @click="closeModal"
    >
      <div
        :class="(theme.components as any).Modal?.element"
        @click.stop
      >
        <A2UIRenderer
          v-if="contentChild"
          :surface-id="surfaceId"
          :component="contentChild"
        />
      </div>
    </div>
  </a2ui-modal>
</template>

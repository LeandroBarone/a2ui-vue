<script setup lang="ts">
import { computed, inject, defineAsyncComponent, type Component as VueComponent } from 'vue';
import type { Types } from '../types';
import type { Catalog, CatalogEntry } from '../catalog';
import { CatalogKey } from '../injection-keys';
import { useProcessor } from '../data/useProcessor';

const props = defineProps<{
  surfaceId: string;
  component: Types.AnyComponentNode;
}>();

const catalog = inject(CatalogKey) as Catalog;
const processor = useProcessor();

const resolvedNode = computed<Types.AnyComponentNode>(() => {
  processor.version.value;
  let node = props.component;
  if (!node.type && (node as any).component) {
    const wrapped = (node as any).component;
    const type = Object.keys(wrapped)[0];
    if (type) {
      node = { ...node, type: type as any, properties: wrapped[type] };
    }
  }
  return node;
});

const resolvedComponentCache = new Map<string, VueComponent>();

function resolveComponent(entry: CatalogEntry, typeName: string): VueComponent {
  if (resolvedComponentCache.has(typeName)) {
    return resolvedComponentCache.get(typeName)!;
  }

  let resolved: VueComponent;

  if (typeof entry === 'function') {
    const result = (entry as Function)();
    if (result && typeof result === 'object' && 'then' in result) {
      resolved = defineAsyncComponent(() => result as Promise<{ default: VueComponent }>);
    } else if (result && typeof result === 'object' && ('setup' in result || 'render' in result || '__name' in result)) {
      resolved = result as VueComponent;
    } else {
      resolved = entry as VueComponent;
    }
  } else {
    resolved = entry as VueComponent;
  }

  resolvedComponentCache.set(typeName, resolved);
  return resolved;
}

const resolvedComponent = computed<VueComponent | null>(() => {
  const node = resolvedNode.value;
  const entry = catalog[node.type];
  if (!entry) {
    console.warn(`[A2UI] Unknown component type: ${node.type}`);
    return null;
  }
  return resolveComponent(entry, node.type);
});

const componentProps = computed(() => {
  processor.version.value;
  const node = resolvedNode.value;
  return {
    surfaceId: props.surfaceId,
    component: node,
    weight: (node as any).weight ?? 0,
    ...(node.properties as Record<string, unknown>),
  };
});
</script>

<template>
  <component
    v-if="resolvedComponent"
    :is="resolvedComponent"
    v-bind="componentProps"
    :key="resolvedNode.id + ':' + resolvedNode.type"
  />
</template>

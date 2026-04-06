<script setup lang="ts">
import { ref, watch } from 'vue';
import { A2UISurface, useProcessor, type Types } from '../../src/v0_8/public-api';
import restaurantCard from '../../src/v0_8/test_data/mocks/restaurant-card.json';
import contactCard from '../../src/v0_8/test_data/mocks/contact-card.json';

const processor = useProcessor();

interface Example {
  name: string;
  surfaceId: string;
  messages: Types.ServerToClientMessage[];
}

const kitchenSinkMessages: Types.ServerToClientMessage[] = [
  {
    surfaceUpdate: {
      surfaceId: 'kitchen-sink',
      components: [
        { id: 'root', component: { Column: { children: { explicitList: ['heading', 'divider1', 'text-section', 'divider2', 'media-row', 'divider3', 'inputs-col', 'divider4', 'actions-row'] } } } },
        { id: 'heading', component: { Text: { text: { literalString: 'A2UI Kitchen Sink' }, usageHint: 'h1' } } },
        { id: 'divider1', component: { Divider: {} } },
        { id: 'text-section', component: { Column: { children: { explicitList: ['h2-text', 'h3-text', 'body-text', 'caption-text'] } } } },
        { id: 'h2-text', component: { Text: { text: { literalString: 'Heading 2 (h2)' }, usageHint: 'h2' } } },
        { id: 'h3-text', component: { Text: { text: { literalString: 'Heading 3 (h3)' }, usageHint: 'h3' } } },
        { id: 'body-text', component: { Text: { text: { path: '/description' }, usageHint: 'body' } } },
        { id: 'caption-text', component: { Text: { text: { literalString: 'This is a caption' }, usageHint: 'caption' } } },
        { id: 'divider2', component: { Divider: {} } },
        { id: 'media-row', component: { Row: { children: { explicitList: ['sample-image', 'icon-col'] }, alignment: 'center' } } },
        { id: 'sample-image', component: { Image: { url: { literalString: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=150&fit=crop' }, usageHint: 'smallFeature' } } },
        { id: 'icon-col', component: { Column: { children: { explicitList: ['icon-star', 'icon-fav', 'icon-search'] } } } },
        { id: 'icon-star', component: { Icon: { name: { literalString: 'star' } } } },
        { id: 'icon-fav', component: { Icon: { name: { literalString: 'favorite' } } } },
        { id: 'icon-search', component: { Icon: { name: { literalString: 'search' } } } },
        { id: 'divider3', component: { Divider: {} } },
        { id: 'inputs-col', component: { Column: { children: { explicitList: ['text-field', 'checkbox', 'slider', 'datetime'] } } } },
        { id: 'text-field', component: { TextField: { label: { literalString: 'Your Name' }, text: { path: '/userName' } } } },
        { id: 'checkbox', component: { CheckBox: { label: { literalString: 'I agree to the terms' }, value: { path: '/agreed' } } } },
        { id: 'slider', component: { Slider: { label: { literalString: 'Volume' }, value: { path: '/volume' }, minValue: 0, maxValue: 100 } } },
        { id: 'datetime', component: { DateTimeInput: { value: { path: '/date' }, enableDate: true, enableTime: false } } },
        { id: 'divider4', component: { Divider: {} } },
        { id: 'actions-row', component: { Row: { children: { explicitList: ['btn-primary', 'btn-secondary'] } } } },
        { id: 'btn-primary-text', component: { Text: { text: { literalString: 'Submit' } } } },
        { id: 'btn-primary', component: { Button: { child: 'btn-primary-text', action: { name: 'submit', context: [{ key: 'name', value: { path: '/userName' } }] }, primary: true } } },
        { id: 'btn-secondary-text', component: { Text: { text: { literalString: 'Cancel' } } } },
        { id: 'btn-secondary', component: { Button: { child: 'btn-secondary-text', action: { name: 'cancel', context: [] } } } },
      ],
    },
  } as any,
  {
    dataModelUpdate: {
      surfaceId: 'kitchen-sink',
      contents: [
        { key: 'description', valueString: 'This is a demo of all standard A2UI v0.8 components rendered with **Vue 3**.' },
        { key: 'userName', valueString: '' },
        { key: 'agreed', valueBoolean: false },
        { key: 'volume', valueNumber: 50 },
        { key: 'date', valueString: '2026-04-05' },
      ],
    },
  } as any,
  { beginRendering: { surfaceId: 'kitchen-sink', root: 'root' } } as any,
];

const examples: Example[] = [
  { name: 'Restaurant Card', surfaceId: 'gallery-restaurant-card', messages: restaurantCard as any },
  { name: 'Contact Card', surfaceId: 'gallery-contact-card', messages: contactCard as any },
  { name: 'Kitchen Sink', surfaceId: 'kitchen-sink', messages: kitchenSinkMessages },
];

const selectedExample = ref<Example>(examples[0]);
const actionLog = ref<{ timestamp: string; name: string; context: Record<string, unknown> }[]>([]);

function loadExample(example: Example) {
  processor.clearSurfaces();
  selectedExample.value = example;
  processor.processMessages(example.messages);
}

processor.onEvent((event) => {
  const action = event.message.userAction;
  if (action) {
    actionLog.value.push({
      timestamp: new Date().toLocaleTimeString(),
      name: action.name,
      context: action.context ?? {},
    });
  }
  event.resolve([]);
});

const dataModelJson = ref('{}');

watch(
  () => processor.version.value,
  () => {
    const surfaces = processor.getSurfaces();
    const surface = surfaces.get(selectedExample.value.surfaceId);
    if (surface?.dataModel) {
      try {
        const obj: Record<string, unknown> = {};
        if (surface.dataModel instanceof Map) {
          for (const [k, v] of surface.dataModel.entries()) {
            obj[k as string] = v;
          }
        }
        dataModelJson.value = JSON.stringify(obj, null, 2);
      } catch {
        dataModelJson.value = '(unable to serialize)';
      }
    }
  },
  { immediate: true },
);

loadExample(examples[0]);
</script>

<template>
  <div class="app-layout">
    <aside class="sidebar">
      <h2>A2UI Vue Explorer</h2>
      <p class="version-badge">v0.8</p>
      <nav>
        <button
          v-for="example in examples"
          :key="example.surfaceId"
          :class="{ active: selectedExample.surfaceId === example.surfaceId }"
          @click="loadExample(example)"
        >
          {{ example.name }}
        </button>
      </nav>
    </aside>

    <main class="canvas">
      <div class="canvas-header">
        <h3>{{ selectedExample.name }}</h3>
        <span class="surface-id">Surface: {{ selectedExample.surfaceId }}</span>
      </div>
      <div class="canvas-body">
        <A2UISurface :surface-id="selectedExample.surfaceId" :key="selectedExample.surfaceId" />
      </div>
    </main>

    <aside class="inspector">
      <div class="inspector-section">
        <h4>Data Model</h4>
        <pre class="data-model">{{ dataModelJson }}</pre>
      </div>
      <div class="inspector-section">
        <h4>Action Log</h4>
        <div class="action-log">
          <div v-if="actionLog.length === 0" class="empty-log">No actions dispatched yet</div>
          <div v-for="(entry, i) in actionLog" :key="i" class="log-entry">
            <span class="log-time">{{ entry.timestamp }}</span>
            <span class="log-name">{{ entry.name }}</span>
            <pre class="log-context">{{ JSON.stringify(entry.context, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </aside>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #0f1117;
  color: #e1e4e8;
}

.app-layout {
  display: grid;
  grid-template-columns: 220px 1fr 300px;
  height: 100vh;
}

.sidebar {
  background: #161b22;
  border-right: 1px solid #30363d;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar h2 {
  font-size: 1rem;
  font-weight: 600;
  color: #f0f6fc;
}

.version-badge {
  display: inline-block;
  font-size: 0.7rem;
  background: #238636;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  width: fit-content;
}

.sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar nav button {
  background: transparent;
  border: 1px solid transparent;
  color: #c9d1d9;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-size: 0.85rem;
  transition: all 0.15s;
}

.sidebar nav button:hover {
  background: #21262d;
}

.sidebar nav button.active {
  background: #1f6feb;
  color: white;
  border-color: #1f6feb;
}

.canvas {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.canvas-header {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid #30363d;
  background: #161b22;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.canvas-header h3 { font-size: 0.9rem; color: #f0f6fc; }

.surface-id {
  font-size: 0.75rem;
  color: #8b949e;
  background: #21262d;
  padding: 2px 8px;
  border-radius: 4px;
}

.canvas-body {
  flex: 1;
  overflow: auto;
  padding: 2rem;
  background: #1c2028;
}

.inspector {
  background: #161b22;
  border-left: 1px solid #30363d;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.inspector-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-bottom: 1px solid #30363d;
}

.inspector-section h4 {
  padding: 0.75rem 1rem;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #8b949e;
  border-bottom: 1px solid #30363d;
  flex-shrink: 0;
}

.data-model {
  flex: 1;
  overflow: auto;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-family: 'Cascadia Code', 'Fira Code', monospace;
  color: #79c0ff;
  white-space: pre-wrap;
}

.action-log {
  flex: 1;
  overflow: auto;
  padding: 0.5rem;
}

.empty-log {
  color: #484f58;
  font-size: 0.8rem;
  text-align: center;
  padding: 2rem 0;
}

.log-entry {
  padding: 0.5rem;
  border-bottom: 1px solid #21262d;
  font-size: 0.78rem;
}

.log-time { color: #8b949e; margin-right: 0.5rem; }
.log-name { color: #d2a8ff; font-weight: 600; }

.log-context {
  margin-top: 4px;
  font-size: 0.7rem;
  color: #79c0ff;
  font-family: monospace;
}

.g-icon {
  font-family: 'Material Symbols Outlined';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
}

.a2ui-card {
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1rem;
  overflow: hidden;
}

.a2ui-text { color: #e1e4e8; }
.a2ui-text-h1 { font-size: 1.75rem; font-weight: 700; }
.a2ui-text-h2 { font-size: 1.35rem; font-weight: 600; }
.a2ui-text-h3 { font-size: 1.1rem; font-weight: 600; }
.a2ui-text-h4 { font-size: 0.95rem; font-weight: 600; }
.a2ui-text-h5 { font-size: 0.85rem; font-weight: 600; }
.a2ui-text-caption { font-size: 0.8rem; color: #8b949e; }

.a2ui-image img { border-radius: 8px; }
.a2ui-image-avatar img { border-radius: 50%; width: 80px; height: 80px; object-fit: cover; }

.a2ui-divider { margin: 0.5rem 0; }
.a2ui-icon { color: #d29922; }

.a2ui-button {
  background: #238636;
  color: white;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.15s;
}

.a2ui-button:hover { background: #2ea043; }

.a2ui-row { gap: 0.5rem; }
.a2ui-column { gap: 0.5rem; }
.a2ui-tab-selected { background: #1f6feb; color: white; }

input, select {
  background: #0d1117;
  border: 1px solid #30363d;
  color: #e1e4e8;
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  font-size: 0.85rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #1f6feb;
  box-shadow: 0 0 0 3px rgba(31, 111, 235, 0.3);
}

label { font-size: 0.85rem; color: #c9d1d9; }

.a2ui-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.a2ui-modal-element {
  background: #21262d;
  border: 1px solid #30363d;
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 500px;
  width: 90%;
}
</style>


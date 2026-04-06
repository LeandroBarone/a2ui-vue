import type { Component, DefineComponent } from 'vue';

export type CatalogEntry = Component | DefineComponent | (() => Promise<{ default: Component }>);

export interface Catalog {
  [key: string]: CatalogEntry;
}

export const DEFAULT_CATALOG: Catalog = {
  AudioPlayer: () => import('../components/A2UIAudio.vue'),
  Button: () => import('../components/A2UIButton.vue'),
  Card: () => import('../components/A2UICard.vue'),
  CheckBox: () => import('../components/A2UICheckBox.vue'),
  Column: () => import('../components/A2UIColumn.vue'),
  DateTimeInput: () => import('../components/A2UIDateTimeInput.vue'),
  Divider: () => import('../components/A2UIDivider.vue'),
  Icon: () => import('../components/A2UIIcon.vue'),
  Image: () => import('../components/A2UIImage.vue'),
  List: () => import('../components/A2UIList.vue'),
  Modal: () => import('../components/A2UIModal.vue'),
  MultipleChoice: () => import('../components/A2UIMultipleChoice.vue'),
  Row: () => import('../components/A2UIRow.vue'),
  Slider: () => import('../components/A2UISlider.vue'),
  Tabs: () => import('../components/A2UITabs.vue'),
  Text: () => import('../components/A2UIText.vue'),
  TextField: () => import('../components/A2UITextField.vue'),
  Video: () => import('../components/A2UIVideo.vue'),
};

export function registerStandardComponents(catalog: Catalog) {
  for (const [key, value] of Object.entries(DEFAULT_CATALOG)) {
    catalog[key] = value;
  }
}

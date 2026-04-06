import { mount, type VueWrapper } from '@vue/test-utils';
import { CatalogKey, ThemeKey, ProcessorKey, MarkdownRendererKey } from './injection-keys';
import type { Catalog } from './catalog';
import { createTheme, type ThemeState } from './rendering/useTheme';
import { createProcessor, type ProcessorState } from './data/useProcessor';
import type { MarkdownRendererFn } from './data/markdown';
import type { Types } from './types';
import type { Component } from 'vue';
import { defaultA2UITheme } from './defaultTheme';

import A2UIText from './components/A2UIText.vue';
import A2UIImage from './components/A2UIImage.vue';
import A2UIIcon from './components/A2UIIcon.vue';
import A2UIVideo from './components/A2UIVideo.vue';
import A2UIAudio from './components/A2UIAudio.vue';
import A2UIDivider from './components/A2UIDivider.vue';
import A2UIRow from './components/A2UIRow.vue';
import A2UIColumn from './components/A2UIColumn.vue';
import A2UIList from './components/A2UIList.vue';
import A2UICard from './components/A2UICard.vue';
import A2UITabs from './components/A2UITabs.vue';
import A2UIModal from './components/A2UIModal.vue';
import A2UIButton from './components/A2UIButton.vue';
import A2UICheckBox from './components/A2UICheckBox.vue';
import A2UITextField from './components/A2UITextField.vue';
import A2UIDateTimeInput from './components/A2UIDateTimeInput.vue';
import A2UIMultipleChoice from './components/A2UIMultipleChoice.vue';
import A2UISlider from './components/A2UISlider.vue';

export const SYNC_CATALOG: Catalog = {
  AudioPlayer: A2UIAudio as Component,
  Button: A2UIButton as Component,
  Card: A2UICard as Component,
  CheckBox: A2UICheckBox as Component,
  Column: A2UIColumn as Component,
  DateTimeInput: A2UIDateTimeInput as Component,
  Divider: A2UIDivider as Component,
  Icon: A2UIIcon as Component,
  Image: A2UIImage as Component,
  List: A2UIList as Component,
  Modal: A2UIModal as Component,
  MultipleChoice: A2UIMultipleChoice as Component,
  Row: A2UIRow as Component,
  Slider: A2UISlider as Component,
  Tabs: A2UITabs as Component,
  Text: A2UIText as Component,
  TextField: A2UITextField as Component,
  Video: A2UIVideo as Component,
};

export const plainMarkdownRenderer: MarkdownRendererFn = async (md: string) => md;

export interface TestContext {
  processor: ProcessorState;
  theme: ThemeState;
}

export function mountWithA2UI<T extends Component>(
  component: T,
  options?: {
    props?: Record<string, any>;
    catalog?: Catalog;
    theme?: Types.Theme;
  },
): { wrapper: VueWrapper; ctx: TestContext } {
  const processor = createProcessor();
  const theme = createTheme(options?.theme ?? defaultA2UITheme);
  const catalog = options?.catalog ?? SYNC_CATALOG;

  const wrapper = mount(component as any, {
    props: options?.props,
    global: {
      provide: {
        [CatalogKey as symbol]: catalog,
        [ThemeKey as symbol]: theme,
        [ProcessorKey as symbol]: processor,
        [MarkdownRendererKey as symbol]: plainMarkdownRenderer,
      },
      config: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('a2ui-'),
        },
      },
    },
  });

  return { wrapper, ctx: { processor, theme } };
}

export function resolveComponentTree(messages: any[], rootId: string): any {
  const surfaceUpdate = messages.find((m: any) => m.surfaceUpdate)?.surfaceUpdate;
  if (!surfaceUpdate) return null;

  const componentMap = new Map(surfaceUpdate.components.map((c: any) => [c.id, c]));

  function resolve(idOrNode: any): any {
    if (typeof idOrNode === 'string') {
      const node = componentMap.get(idOrNode);
      return node ? resolve(node) : null;
    }

    if (idOrNode && typeof idOrNode === 'object') {
      if (idOrNode.type && idOrNode.properties) return idOrNode;

      if (idOrNode.component) {
        const type = Object.keys(idOrNode.component)[0];
        const properties = { ...idOrNode.component[type] };

        if (properties.child) {
          properties.child = resolve(properties.child);
        }
        if (properties.children) {
          if (Array.isArray(properties.children)) {
            properties.children = properties.children.map((c: any) => resolve(c));
          } else if (properties.children.explicitList) {
            properties.children = properties.children.explicitList.map((id: string) => resolve(id));
          }
        }

        return { id: idOrNode.id, type, properties };
      }
    }
    return idOrNode;
  }

  return resolve(rootId);
}

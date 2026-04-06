import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mountWithA2UI } from './test-utils';
import A2UISurface from './components/A2UISurface.vue';
import A2UIRenderer from './rendering/A2UIRenderer.vue';
import restaurantCardMock from './test_data/mocks/restaurant-card.json';
import contactCardMock from './test_data/mocks/contact-card.json';

describe('v0.8 Vue Renderer Integration', () => {

  it('should render a Text component with literal string via Renderer', async () => {
    const node = {
      id: 'text-1',
      type: 'Text',
      properties: { text: { literalString: 'Hello from Vue' } },
      dataContextPath: '/',
    };

    const { wrapper } = mountWithA2UI(A2UIRenderer, {
      props: { surfaceId: 'test', component: node },
    });

    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Hello from Vue');
  });

  it('should handle the v0.8 component wrapper format (unwrapping)', async () => {
    const node = {
      id: 'wrapper-test',
      component: {
        Text: {
          text: { literalString: 'Wrapped Text' },
        },
      },
    };

    const { wrapper } = mountWithA2UI(A2UIRenderer, {
      props: { surfaceId: 'test', component: node as any },
    });

    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Wrapped Text');
  });

  it('should render a Card with nested Column and Text', async () => {
    const tree = {
      id: 'root',
      type: 'Card',
      properties: {
        child: {
          id: 'col1',
          type: 'Column',
          properties: {
            children: [
              {
                id: 'name',
                type: 'Text',
                properties: { text: { literalString: 'Test Name' }, usageHint: 'h2' },
                dataContextPath: '/',
              },
            ],
          },
          dataContextPath: '/',
        },
      },
      dataContextPath: '/',
    };

    const { wrapper } = mountWithA2UI(A2UIRenderer, {
      props: { surfaceId: 'test', component: tree as any },
    });

    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Test Name');
  });

  it('should render Surface from processed messages', async () => {
    const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
      props: { surfaceId: 'test-surface' },
    });

    ctx.processor.processMessages([
      {
        surfaceUpdate: {
          surfaceId: 'test-surface',
          components: [
            { id: 'root', component: { Text: { text: { literalString: 'Surface Text' } } } },
          ],
        },
      },
      { beginRendering: { surfaceId: 'test-surface', root: 'root' } },
    ]);

    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Surface Text');
  });

  it('should render data-bound text from the data model', async () => {
    const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
      props: { surfaceId: 'data-surface' },
    });

    ctx.processor.processMessages([
      {
        surfaceUpdate: {
          surfaceId: 'data-surface',
          components: [
            { id: 'root', component: { Text: { text: { path: '/greeting' } } } },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'data-surface',
          contents: [{ key: 'greeting', valueString: 'Hello, Data!' }],
        },
      },
      { beginRendering: { surfaceId: 'data-surface', root: 'root' } },
    ]);

    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Hello, Data!');
  });

  describe('Regression Mocks', () => {
    it('should render the Restaurant Card mock correctly', async () => {
      const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
        props: { surfaceId: 'gallery-restaurant-card' },
      });

      ctx.processor.processMessages(restaurantCardMock as any);

      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();

      expect(wrapper.find('a2ui-card').exists()).toBe(true);

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toContain('unsplash.com');

      expect(wrapper.text()).toContain('The Italian Kitchen');
    });

    it('should render the Contact Card mock correctly', async () => {
      const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
        props: { surfaceId: 'gallery-contact-card' },
      });

      ctx.processor.processMessages(contactCardMock as any);

      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();

      expect(wrapper.find('a2ui-card').exists()).toBe(true);
      expect(wrapper.text()).toContain('David Park');

      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toContain('unsplash.com');

      expect(wrapper.find('a2ui-divider').exists()).toBe(true);
    });

    it('should render buttons in the Contact Card', async () => {
      const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
        props: { surfaceId: 'gallery-contact-card' },
      });

      ctx.processor.processMessages(contactCardMock as any);

      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();

      const buttons = wrapper.findAll('button');
      expect(buttons.length).toBeGreaterThanOrEqual(2);
    });

    it('should render icons in the Contact Card', async () => {
      const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
        props: { surfaceId: 'gallery-contact-card' },
      });

      ctx.processor.processMessages(contactCardMock as any);

      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();
      await nextTick();

      const icons = wrapper.findAll('.g-icon');
      expect(icons.length).toBeGreaterThanOrEqual(3);
    });
  });

  it('should update UI when data model changes', async () => {
    const { wrapper, ctx } = mountWithA2UI(A2UISurface, {
      props: { surfaceId: 'live-surface' },
    });

    ctx.processor.processMessages([
      {
        surfaceUpdate: {
          surfaceId: 'live-surface',
          components: [
            { id: 'root', component: { Text: { text: { path: '/counter' } } } },
          ],
        },
      },
      {
        dataModelUpdate: {
          surfaceId: 'live-surface',
          contents: [{ key: 'counter', valueString: 'Count: 0' }],
        },
      },
      { beginRendering: { surfaceId: 'live-surface', root: 'root' } },
    ]);

    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Count: 0');

    ctx.processor.processMessages([
      {
        dataModelUpdate: {
          surfaceId: 'live-surface',
          contents: [{ key: 'counter', valueString: 'Count: 1' }],
        },
      },
    ]);

    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Count: 1');
  });
});

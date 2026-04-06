import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mountWithA2UI } from './test-utils';

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

const baseComponent = (id = 'test', type = 'Text') => ({
  id,
  type,
  properties: {},
  dataContextPath: '/',
});

describe('A2UIText', () => {
  it('should render literal text', async () => {
    const { wrapper } = mountWithA2UI(A2UIText, {
      props: {
        surfaceId: 'test',
        component: baseComponent('t1', 'Text'),
        text: { literalString: 'Hello World' },
      },
    });
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Hello World');
  });

  it('should apply usageHint classes', async () => {
    const { wrapper } = mountWithA2UI(A2UIText, {
      props: {
        surfaceId: 'test',
        component: baseComponent('t2', 'Text'),
        text: { literalString: 'Heading' },
        usageHint: 'h2',
      },
    });
    await nextTick();
    await nextTick();
    const section = wrapper.find('section');
    expect(section.classes()).toContain('a2ui-text-h2');
  });

  it('should resolve data-bound text', async () => {
    const { wrapper, ctx } = mountWithA2UI(A2UIText, {
      props: {
        surfaceId: 'test-surface',
        component: baseComponent('t3', 'Text'),
        text: { path: '/name' },
      },
    });

    ctx.processor.processMessages([
      {
        dataModelUpdate: {
          surfaceId: 'test-surface',
          contents: [{ key: 'name', valueString: 'Resolved Name' }],
        },
      },
      { beginRendering: { surfaceId: 'test-surface', root: 'root' } },
    ]);

    await nextTick();
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Resolved Name');
  });
});

describe('A2UIImage', () => {
  it('should render an image with literal URL', async () => {
    const { wrapper } = mountWithA2UI(A2UIImage, {
      props: {
        surfaceId: 'test',
        component: baseComponent('img1', 'Image'),
        url: { literalString: 'https://example.com/img.jpg' },
      },
    });
    await nextTick();
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('https://example.com/img.jpg');
  });

  it('should apply usageHint classes', async () => {
    const { wrapper } = mountWithA2UI(A2UIImage, {
      props: {
        surfaceId: 'test',
        component: baseComponent('img2', 'Image'),
        url: { literalString: 'https://example.com/img.jpg' },
        usageHint: 'avatar',
      },
    });
    await nextTick();
    const section = wrapper.find('section');
    expect(section.classes()).toContain('a2ui-image-avatar');
  });
});

describe('A2UIIcon', () => {
  it('should render an icon with literal name', async () => {
    const { wrapper } = mountWithA2UI(A2UIIcon, {
      props: {
        surfaceId: 'test',
        component: baseComponent('icon1', 'Icon'),
        name: { literalString: 'star' },
      },
    });
    await nextTick();
    const span = wrapper.find('.g-icon');
    expect(span.exists()).toBe(true);
    expect(span.text()).toBe('star');
  });

  it('should not render when name is null', async () => {
    const { wrapper } = mountWithA2UI(A2UIIcon, {
      props: {
        surfaceId: 'test',
        component: baseComponent('icon2', 'Icon'),
        name: null,
      },
    });
    await nextTick();
    expect(wrapper.find('.g-icon').exists()).toBe(false);
  });
});

describe('A2UIVideo', () => {
  it('should render a video element with URL', async () => {
    const { wrapper } = mountWithA2UI(A2UIVideo, {
      props: {
        surfaceId: 'test',
        component: baseComponent('v1', 'Video'),
        url: { literalString: 'https://example.com/video.mp4' },
      },
    });
    await nextTick();
    const video = wrapper.find('video');
    expect(video.exists()).toBe(true);
    expect(video.attributes('src')).toBe('https://example.com/video.mp4');
  });
});

describe('A2UIAudio', () => {
  it('should render an audio element with URL', async () => {
    const { wrapper } = mountWithA2UI(A2UIAudio, {
      props: {
        surfaceId: 'test',
        component: baseComponent('a1', 'AudioPlayer'),
        url: { literalString: 'https://example.com/audio.mp3' },
      },
    });
    await nextTick();
    const audio = wrapper.find('audio');
    expect(audio.exists()).toBe(true);
    expect(audio.attributes('src')).toBe('https://example.com/audio.mp3');
  });
});

describe('A2UIDivider', () => {
  it('should render an hr element', async () => {
    const { wrapper } = mountWithA2UI(A2UIDivider, {
      props: {
        surfaceId: 'test',
        component: baseComponent('d1', 'Divider'),
      },
    });
    await nextTick();
    expect(wrapper.find('hr').exists()).toBe(true);
  });
});

describe('A2UIRow', () => {
  it('should render children in a flex row', async () => {
    const children = [
      { id: 'c1', type: 'Text', properties: { text: { literalString: 'A' } }, dataContextPath: '/' },
      { id: 'c2', type: 'Text', properties: { text: { literalString: 'B' } }, dataContextPath: '/' },
    ];
    const { wrapper } = mountWithA2UI(A2UIRow, {
      props: {
        surfaceId: 'test',
        component: baseComponent('r1', 'Row'),
        children,
        alignment: 'center',
        distribution: 'spaceBetween',
      },
    });
    await nextTick();
    const section = wrapper.find('.a2ui-row-section');
    expect(section.exists()).toBe(true);
    expect(section.classes()).toContain('align-center');
    expect(section.classes()).toContain('distribute-spaceBetween');
  });
});

describe('A2UIColumn', () => {
  it('should render children in a flex column', async () => {
    const children = [
      { id: 'c1', type: 'Text', properties: { text: { literalString: 'A' } }, dataContextPath: '/' },
    ];
    const { wrapper } = mountWithA2UI(A2UIColumn, {
      props: {
        surfaceId: 'test',
        component: baseComponent('col1', 'Column'),
        children,
      },
    });
    await nextTick();
    const section = wrapper.find('.a2ui-column-section');
    expect(section.exists()).toBe(true);
    expect(section.classes()).toContain('align-stretch');
    expect(section.classes()).toContain('distribute-start');
  });
});

describe('A2UIList', () => {
  it('should render children as list items', async () => {
    const children = [
      { id: 'l1', type: 'Text', properties: { text: { literalString: 'Item 1' } }, dataContextPath: '/' },
      { id: 'l2', type: 'Text', properties: { text: { literalString: 'Item 2' } }, dataContextPath: '/' },
    ];
    const { wrapper } = mountWithA2UI(A2UIList, {
      props: {
        surfaceId: 'test',
        component: baseComponent('list1', 'List'),
        children,
        direction: 'vertical',
      },
    });
    await nextTick();
    const items = wrapper.findAll('.a2ui-list-item');
    expect(items.length).toBe(2);
  });
});

describe('A2UICard', () => {
  it('should render a child component inside a card', async () => {
    const child = { id: 'inner', type: 'Text', properties: { text: { literalString: 'Card Content' } }, dataContextPath: '/' };
    const { wrapper } = mountWithA2UI(A2UICard, {
      props: {
        surfaceId: 'test',
        component: baseComponent('card1', 'Card'),
        child,
      },
    });
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Card Content');
  });
});

describe('A2UITabs', () => {
  it('should render tab buttons and selected content', async () => {
    const tabItems = [
      {
        title: { literalString: 'Tab 1' },
        child: { id: 'tab-c1', type: 'Text', properties: { text: { literalString: 'Content 1' } }, dataContextPath: '/' },
      },
      {
        title: { literalString: 'Tab 2' },
        child: { id: 'tab-c2', type: 'Text', properties: { text: { literalString: 'Content 2' } }, dataContextPath: '/' },
      },
    ];
    const { wrapper } = mountWithA2UI(A2UITabs, {
      props: {
        surfaceId: 'test',
        component: baseComponent('tabs1', 'Tabs'),
        tabItems,
      },
    });
    await nextTick();
    const buttons = wrapper.findAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].text()).toBe('Tab 1');
  });

  it('should switch tabs on click', async () => {
    const tabItems = [
      {
        title: { literalString: 'Tab 1' },
        child: { id: 'tc1', type: 'Text', properties: { text: { literalString: 'Content 1' } }, dataContextPath: '/' },
      },
      {
        title: { literalString: 'Tab 2' },
        child: { id: 'tc2', type: 'Text', properties: { text: { literalString: 'Content 2' } }, dataContextPath: '/' },
      },
    ];
    const { wrapper } = mountWithA2UI(A2UITabs, {
      props: {
        surfaceId: 'test',
        component: baseComponent('tabs2', 'Tabs'),
        tabItems,
      },
    });
    await nextTick();
    await nextTick();

    expect(wrapper.text()).toContain('Content 1');
    await wrapper.findAll('button')[1].trigger('click');
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Content 2');
  });
});

describe('A2UIModal', () => {
  it('should open and close modal', async () => {
    const entryPointChild = { id: 'ep', type: 'Text', properties: { text: { literalString: 'Open' } }, dataContextPath: '/' };
    const contentChild = { id: 'mc', type: 'Text', properties: { text: { literalString: 'Modal Content' } }, dataContextPath: '/' };
    const { wrapper } = mountWithA2UI(A2UIModal, {
      props: {
        surfaceId: 'test',
        component: baseComponent('modal1', 'Modal'),
        entryPointChild,
        contentChild,
      },
    });
    await nextTick();

    expect(wrapper.text()).toContain('Open');
    expect(wrapper.text()).not.toContain('Modal Content');

    await wrapper.find('.a2ui-modal-entry-point').trigger('click');
    await nextTick();
    await nextTick();
    expect(wrapper.text()).toContain('Modal Content');
  });
});

describe('A2UIButton', () => {
  it('should render a button with child content', async () => {
    const child = { id: 'btn-text', type: 'Text', properties: { text: { literalString: 'Click Me' } }, dataContextPath: '/' };
    const { wrapper } = mountWithA2UI(A2UIButton, {
      props: {
        surfaceId: 'test',
        component: baseComponent('btn1', 'Button'),
        action: { name: 'test_action', context: [] },
        child,
      },
    });
    await nextTick();
    await nextTick();
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(wrapper.text()).toContain('Click Me');
  });

  it('should dispatch action on click', async () => {
    const child = { id: 'btn-text2', type: 'Text', properties: { text: { literalString: 'Go' } }, dataContextPath: '/' };
    const { wrapper, ctx } = mountWithA2UI(A2UIButton, {
      props: {
        surfaceId: 'test-surface',
        component: baseComponent('btn2', 'Button'),
        action: { name: 'submit', context: [] },
        child,
      },
    });

    let dispatched = false;
    ctx.processor.onEvent((event) => {
      dispatched = true;
      expect(event.message.userAction?.name).toBe('submit');
      event.resolve([]);
    });

    await nextTick();
    await wrapper.find('button').trigger('click');
    await nextTick();
    expect(dispatched).toBe(true);
  });
});

describe('A2UICheckBox', () => {
  it('should render with label and checked state', async () => {
    const { wrapper } = mountWithA2UI(A2UICheckBox, {
      props: {
        surfaceId: 'test',
        component: baseComponent('cb1', 'CheckBox'),
        label: { literalString: 'Accept Terms' },
        checked: { literalBoolean: true },
      },
    });
    await nextTick();
    expect(wrapper.text()).toContain('Accept Terms');
    const input = wrapper.find('input[type="checkbox"]');
    expect(input.exists()).toBe(true);
    expect((input.element as HTMLInputElement).checked).toBe(true);
  });

  it('should dispatch toggle action when no path', async () => {
    const { wrapper, ctx } = mountWithA2UI(A2UICheckBox, {
      props: {
        surfaceId: 'test',
        component: baseComponent('cb2', 'CheckBox'),
        label: { literalString: 'Toggle' },
        checked: { literalBoolean: false },
      },
    });

    let dispatched = false;
    ctx.processor.onEvent((event) => {
      dispatched = true;
      expect(event.message.userAction?.name).toBe('toggle');
      event.resolve([]);
    });

    await nextTick();
    const input = wrapper.find('input[type="checkbox"]');
    await input.setValue(true);
    expect(dispatched).toBe(true);
  });
});

describe('A2UITextField', () => {
  it('should render with label and value', async () => {
    const { wrapper } = mountWithA2UI(A2UITextField, {
      props: {
        surfaceId: 'test',
        component: baseComponent('tf1', 'TextField'),
        label: { literalString: 'Name' },
        text: { literalString: 'John' },
      },
    });
    await nextTick();
    expect(wrapper.text()).toContain('Name');
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('John');
  });

  it('should use correct input type for number', async () => {
    const { wrapper } = mountWithA2UI(A2UITextField, {
      props: {
        surfaceId: 'test',
        component: baseComponent('tf2', 'TextField'),
        label: { literalString: 'Age' },
        textFieldType: 'number',
      },
    });
    await nextTick();
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('number');
  });
});

describe('A2UIDateTimeInput', () => {
  it('should render a date input by default', async () => {
    const { wrapper } = mountWithA2UI(A2UIDateTimeInput, {
      props: {
        surfaceId: 'test',
        component: baseComponent('dt1', 'DateTimeInput'),
        value: { literalString: '2025-01-01' },
      },
    });
    await nextTick();
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('date');
  });

  it('should render datetime-local when both flags are true', async () => {
    const { wrapper } = mountWithA2UI(A2UIDateTimeInput, {
      props: {
        surfaceId: 'test',
        component: baseComponent('dt2', 'DateTimeInput'),
        value: { literalString: '2025-01-01T10:00' },
        enableDate: true,
        enableTime: true,
      },
    });
    await nextTick();
    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('datetime-local');
  });
});

describe('A2UIMultipleChoice', () => {
  it('should render options', async () => {
    const { wrapper } = mountWithA2UI(A2UIMultipleChoice, {
      props: {
        surfaceId: 'test',
        component: baseComponent('mc1', 'MultipleChoice'),
        options: [
          { label: { literalString: 'Option A' }, value: 'a' },
          { label: { literalString: 'Option B' }, value: 'b' },
        ],
        selections: { literalArray: ['a'] },
      },
    });
    await nextTick();
    const options = wrapper.findAll('option');
    expect(options.length).toBe(2);
    expect(options[0].text()).toBe('Option A');
    expect(options[1].text()).toBe('Option B');
  });
});

describe('A2UISlider', () => {
  it('should render with value and range', async () => {
    const { wrapper } = mountWithA2UI(A2UISlider, {
      props: {
        surfaceId: 'test',
        component: baseComponent('sl1', 'Slider'),
        label: { literalString: 'Volume' },
        value: { literalNumber: 50 },
        minValue: 0,
        maxValue: 100,
      },
    });
    await nextTick();
    expect(wrapper.text()).toContain('Volume');
    const input = wrapper.find('input[type="range"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('min')).toBe('0');
    expect(input.attributes('max')).toBe('100');
  });
});


import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) => tag.startsWith('a2ui-'),
        },
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});

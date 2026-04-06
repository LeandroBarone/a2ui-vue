import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
  build: {
    lib: {
      entry: resolve(__dirname, 'src/v0_8/public-api.ts'),
      name: 'A2UIVue',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'vue',
        /^@a2ui\/web_core(\/.*)?$/,
      ],
    },
  },
});

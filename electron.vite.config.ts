import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, swcPlugin } from 'electron-vite';

export default defineConfig({
  main: {
    build: {
      minify: 'esbuild',
    },
    plugins: [swcPlugin()],
  },
  preload: { build: { minify: 'esbuild' } },
  renderer: {
    build: {
      rollupOptions: {
        input: resolve(__dirname, 'src/renderer/index.html'),
      },
      minify: 'esbuild',
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
  },
});

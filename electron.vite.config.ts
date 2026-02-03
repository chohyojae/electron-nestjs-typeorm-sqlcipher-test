import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, swcPlugin } from 'electron-vite';

const TYPEORM_DRIVERS = [
  '@google-cloud/spanner',
  'better-sqlite3',
  'mysql',
  'mysql2',
  'oracledb',
  'pg',
  'pg-native',
  'pg-query-stream',
  'redis',
  'sqlite3',
  'tedious',
  'mongodb',
  'mssql',
  'sql.js',
  'hdb-pool',
  '@sap/hana-client',
  '@sap/hana-client/extension/Stream',
  'typeorm-aurora-data-api-driver',
  'ioredis',
] as const;

export default defineConfig({
  main: {
    build: {
      externalizeDeps: {
        include: [...TYPEORM_DRIVERS],
      },
      bytecode: false,
    },
    plugins: [swcPlugin()],
  },
  preload: { build: { bytecode: true } },
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

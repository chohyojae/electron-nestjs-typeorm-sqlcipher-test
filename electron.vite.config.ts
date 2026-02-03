import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, swcPlugin } from 'electron-vite';

export default defineConfig({
  main: {
    build: {
      externalizeDeps: true,
      bytecode: true,
      rollupOptions: {
        external: [
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
        ],
      },
    },
    plugins: [swcPlugin()],
  },
  preload: { build: { bytecode: true } },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
  },
});

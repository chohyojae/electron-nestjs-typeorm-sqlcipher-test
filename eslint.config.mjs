import eslint from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const isCI = process.env.CI === 'true';

export default defineConfig(
  /* Globally Ignored files */
  globalIgnores([
    /* Dependencies */
    'node_modules/',

    /* Build output */
    'out/',

    /* Test coverage */
    'coverage/',

    /* Config files */
    '.github/',
    '.idea/',
    '.sggit/',
    '.vscode/',
    '*.config.*',
    'jest.setup*.*',
    'jsdoc.conf',

    /* Documents */
    'docs/',

    /* lock files */
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',

    /* Bundled or pre-transpiled js files */
    '**/*.bundle.js',
    '**/*.min.js',
    '**/worker.js',
  ]),

  /* Global base settings */
  eslint.configs.recommended,
  prettierPluginRecommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: true,
      },
    },
  },

  /* Typescript-specific settings */
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      /* ── Prettier / 줄바꿈 ───────────────────────── */
      /*
       * linebreak-style: error -> 주석처리(off)
       * 사유: prettier/prettier 룰과 겹침
       */
      // 'linebreak-style': ['error', 'windows'],
      'prettier/prettier': 'error',

      /* ── Import / Export ─────────────────────────── */
      'import/extensions': [
        'error',
        'ignorePackages',
        { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' },
      ],
      'import/no-unresolved': [
        'error',
        { commonjs: true, caseSensitive: true },
      ],
      /* import/no-extraneous-dependencies: error -> 주석처리(off)
       * 사유: Vite 적용 시 renderer 및 main의 코드가 단일 js로 번들링되므로 devDependencies에 있어도 무방함
       * 단, bcrypt 등의 네이티브 컴파일이 필요한 라이브러리들은 반드시 dependencies에 존재하도록 할 것
       */
      // 'import/no-extraneous-dependencies': [
      //   'error',
      //   {
      //     devDependencies: [
      //       'src/renderer/**/*',
      //       'src/**/*.test.*',
      //       'src/**/tests/**/*',
      //       'scripts/**/*',
      //       'webpack.config.js',
      //       'vite.config.ts',
      //     ],
      //   },
      // ],
      /*
       * import/order: error -> 주석처리 (off)
       * 사유: prettier/prettier 룰을 통해 관리됨
       */
      // 'import/order': [
      //   'error',
      //   {
      //     groups: [
      //       'builtin',
      //       'external',
      //       'internal',
      //       'parent',
      //       'sibling',
      //       'index',
      //     ],
      //     'newlines-between': 'always',
      //     alphabetize: { order: 'asc', caseInsensitive: true },
      //   },
      // ],
      'import/no-duplicates': 'error',
      // 'import/newline-after-import': 'error', -> prettier/prettier 룰을 통해 관리됨
      'import/no-cycle': ['error', { maxDepth: 1 }],
      'import/prefer-default-export': 'error', // index.ts / utils 묶음은 아래 overrides에서 예외

      /* ── 콘솔/로깅 ───────────────────────────────── */
      // 'no-console': isCI ? 'error' : 'warn', -> no-restricted-properties 룰을 통해 관리되므로 중복.
      'no-restricted-properties': [
        isCI ? 'error' : 'warn',
        {
          object: 'console',
          property: 'log',
          message: 'Use logger.info instead',
        },
        {
          object: 'console',
          property: 'info',
          message: 'Use logger.info instead',
        },
        {
          object: 'console',
          property: 'warn',
          message: 'Use logger.warn instead',
        },
        {
          object: 'console',
          property: 'error',
          message: 'Use logger.error instead',
        },
        {
          object: 'console',
          property: 'debug',
          message: 'Use logger.debug instead',
        },
      ],

      /* ── 코어 JS 품질/일관성 ─────────────────────── */
      'default-param-last': 'off',
      'no-promise-executor-return': 'error',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'arrow-body-style': ['error', 'as-needed'],
      'no-else-return': ['error', { allowElseIf: false }],
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-param-reassign': ['error', { props: false }],
      'no-return-await': 'error',
      // 'no-unsafe-optional-chaining': 'error', // 기본값으로 error 설정됨*
      // 'no-useless-catch': 'error', // 기본값으로 error 설정됨
      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
      'object-shorthand': ['error', 'always'],
      // 'no-var': 'error', // 기본값으로 error 설정됨
      // 'prefer-const': ['error', { destructuring: 'all' }], // 기본값으로 error 설정됨*
      // 'no-control-regex': 'error', // 기본값으로 error 설정됨
      'func-names': ['error', 'as-needed'],

      /* ── TypeScript 교체/보완 규칙 ──────────────── */
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-explicit-any': 'warn', // TODO: 추후 error 처리 필요(기본값: error)
      /*
       * @typescript-eslint/no-var-requires: error -> 주석처리 (off)
       * 사유: deprecated (recommended 옵션으로 기본으로 on 된 항목인
       * @typescript-eslint/no-require-imports 으로 룰 변경됨)
       */
      // '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/ban-ts-comment': [
        'warn',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 리뷰/가이드로 관리
      /*
       * @typescript-eslint/consistent-type-definitions: error (recommended 기본값) -> off
       * type과 interface 중 하나만 골라서 사용하도록 강제하는 룰
       */
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ['src/renderer/**/*'],
    extends: [
      jsxA11yPlugin.flatConfigs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
      {
        settings: {
          react: {
            version: 'detect',
          },
        },
      },
      reactHooksPlugin.configs.flat.recommended,
      reactRefreshPlugin.configs.vite,
    ],
    rules: {
      /* ── React ───────────────────────────────────── */
      // 'react/react-in-jsx-scope': 'off', // React 17+ // 기본값으로 off 설정됨
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      // 'react/no-children-prop': 'error', // 기본값으로 error 설정됨
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/require-default-props': 'off', // TS로 대체
      'react/jsx-pascal-case': ['error', { allowAllCaps: true, ignore: [] }],
      'react/no-array-index-key': 'error',
      'react/jsx-props-no-spreading': [
        'warn',
        { html: 'enforce', custom: 'enforce', explicitSpread: 'ignore' },
      ],
      'react/prop-types': 'off',
      'react/destructuring-assignment': [
        'error',
        'always',
        { ignoreClassFields: true },
      ],

      /* ── A11y ───────────────────────────────────── */
      'jsx-a11y/no-noninteractive-element-interactions': 'error',
      'jsx-a11y/control-has-associated-label': 'error',
      'jsx-a11y/click-events-have-key-events': isCI ? 'error' : 'warn',
      'jsx-a11y/mouse-events-have-key-events': isCI ? 'error' : 'warn',

      /* ── React Hooks ─────────────────────────────── */
      // 'react-hooks/rules-of-hooks': 'error', // 기본값으로 error 설정됨
      // 'react-hooks/exhaustive-deps': 'warn', // 기본값으로 warn 설정됨
    },
  },
  // index / 유틸 묶음은 named export 허용
  {
    files: ['src/**/index.*', 'src/**/utils/**/*', '**/*.util.*'],
    rules: { 'import/prefer-default-export': 'off' },
  },
  // 고난도 시각화/캔버스/외부래퍼는 a11y 일부 예외
  {
    files: [
      'src/**/charts/**/*',
      'src/**/canvas/**/*',
      'src/**/third-party/**/*',
    ],
    rules: { 'jsx-a11y/mouse-events-have-key-events': 'off' },
  },
  /*
     아래 코드들은 any가 다량 사용되고 있으며 각 사유에 의해 no-explicit-any를 warn 처리
     - database: 외주사를 통해 개발된 코드
     - *.test.ts: 테스트용 코드
     TODO: 추후 리팩토링을 통해 any 사용을 줄여나가야 함
   */
  {
    files: ['src/modules/database/**/*.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    rules: { '@typescript-eslint/no-explicit-any': 'warn' },
  },
  {
    files: ['src/main/**/*.{ts}'],
    rules: { '@typescript-eslint/consistent-type-imports': 'off' },
  },
);

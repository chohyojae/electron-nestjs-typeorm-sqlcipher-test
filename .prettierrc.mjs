export default {
  singleQuote: true,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 80,
  arrowParens: 'avoid',
  /*
   * endOfLine: 'crlf' -> 'auto'
   * 사유: Git은 로컬 파일의 개행문자와 무관하게 항상 LF방식으로 변환되어 commit & push 되고,
   * checkout 과정에서 git client 설정에 따라 CR+LF 방식으로 변환하는 과정을 거침.
   * 현재는 Unix-like OS에서의 기본 설정으로 checkout 시 Lint 에러가 발생하여
   * OS 설정에 맞추어 진행하도록 'auto' 설정함
   */
  endOfLine: 'auto',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^src/(.*)$',
    '^../(.*)$',
    '^[./]',
    './index',
  ],
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    'decorators-legacy',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
};

import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig, globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    '**/public/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/*.min.js',
    '**/.output/**',
    '**/.wxt/**'
  ]),
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,vue}'],
    ignores: [],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.webextensions
      }
    },
    rules: {
      'no-undef': 'off',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      indent: ['error', 2, { SwitchCase: 1 }],
      semi: ['error', 'always'],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true, // 允许字符串内使用双引号来避免转义
          allowTemplateLiterals: true // 允许使用模板字符串
        }
      ],
      'comma-spacing': ['error', { before: false, after: true }],
      'space-infix-ops': ['error', { int32Hint: false }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          ignoreTypeParameters: true
        }
      ]
    }
  },
  ...pluginVue.configs['flat/essential'].map(config => ({
    ...config,
    files: ['**/*.vue']
  })),
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.json'],
    ignores: ['**/.vscode/**', '**/tsconfig.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },
  {
    files: ['**/*.jsonc', '**/*.json'],
    plugins: { json },
    language: 'json/jsonc',
    extends: ['json/recommended']
  },
  {
    files: ['**/*.json5'],
    plugins: { json },
    language: 'json/json5',
    extends: ['json/recommended']
  }
]);

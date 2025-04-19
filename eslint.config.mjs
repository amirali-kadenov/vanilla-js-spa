import js from '@eslint/js'
import json from '@eslint/json'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier/flat'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  {
    files: ['src/**/*.js', 'src/**/*.mjs'],
    plugins: { js },
    extends: ['js/recommended'],
    rules: {
      'import/order': [
        'error',
        {
          groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
            },
            {
              pattern: '@',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['internal'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['src/**/*.js', 'src/**/*.mjs'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['src/**/*.js', 'src/**/*.mjs'],
    ...importPlugin.flatConfigs.errors,
    rules: {
      'import/no-unresolved': 'off',
    },
  },
  {
    files: ['**/*.json'],
    language: 'json/json',
    plugins: {
      json,
    },
  },
  prettierConfig,
  prettierPluginRecommended,
])

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
      'import/order': [
        'error',
        {
          groups: ['external', 'builtin', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'external',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
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

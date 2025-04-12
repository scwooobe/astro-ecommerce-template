// eslint.config.js
import js from '@eslint/js';
import eslintPluginAstro from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import gitignore from 'eslint-config-flat-gitignore';

export default [
  gitignore(),

  js.configs.recommended,

  ...eslintPluginAstro.configs.recommended,

  eslintPluginPrettier,

  // JS/TS files
  {
    files: ['**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },

  // Prettier disables conflicting rules
  prettierConfig,
];

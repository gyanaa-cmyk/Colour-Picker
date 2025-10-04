import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import prettier from 'eslint-config-prettier' // Import prettier config
import react from 'eslint-plugin-react' // Import react plugin

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // Use spread for recommended configs
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettier, // Add prettier to extends
      react.configs.recommended, // Add React recommended rules
      react.configs['jsx-runtime'], // Add React JSX runtime rules
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
  },
])

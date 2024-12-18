import { FlatCompat } from '@eslint/eslintrc'
import eslint from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwind from 'eslint-plugin-tailwindcss'
import neostandard, { resolveIgnoresFromGitignore } from 'neostandard'
import { dirname } from 'path'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  eslint.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tseslint.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  ...neostandard({
    ignores: resolveIgnoresFromGitignore(),
  }),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@stylistic/space-before-function-paren': ['error',
        {
          anonymous: 'always',
          asyncArrow: 'always',
          named: 'never',
        },
      ],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/jsx-closing-bracket-location': 'error',
      '@stylistic/jsx-closing-tag-location': 'error',
      '@stylistic/jsx-first-prop-new-line': ['error', 'multiprop'],
      '@stylistic/jsx-function-call-newline': ['error', 'always'],
      '@stylistic/jsx-max-props-per-line': ['error', { maximum: 1 }],
      'simple-import-sort/imports': 'error',
    },
  },
]

export default eslintConfig

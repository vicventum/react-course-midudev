module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'standard',
    './node_modules/standard/eslintrc.json',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // 'plugin:prettier/recommended',
    // 'eslint-config-standard',
    'eslint-config-prettier',
    // 'prettier'
    // 'prettier/standard',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    // "prettier/prettier': 'off',
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'warn',
    'spaced-comment': 'off',
    'react/prop-types': 'off',
    'no-useless-escape': 'off',
    'prefer-regex-literals': 'off',
    // 'at-rule-no-unknown': [
    //   true,
    //   {
    //     ignoreAtRules: ['extends', 'tailwind'],
    //   },
    // ],
  },
}

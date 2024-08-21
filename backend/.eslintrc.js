module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'eslint:recommended', // Base ESLint recommendations
    'plugin:@typescript-eslint/recommended', // TypeScript-specific rules
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier', // Ensures compatibility with Prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    // TypeScript specific rule configurations
    // Import sorting rule
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    // Ensuring Prettier rules are enforced as ESLint errors
    'prettier/prettier': ['error'],
  },
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'babel-eslint',
  extends: ['plugin:react/recommended', 'plugin:prettier/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx'] }],
  },
};

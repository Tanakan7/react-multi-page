module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2020
  },
  env: {
    'browser': true,
    'es2020': true
  },
  extends: [
    'plugin:prettier/recommended',
    'airbnb'
  ],
  plugins: [
    'no-unsafe-regex'
  ],
  rules: {
    'space-before-function-paren': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'indent': 'off',
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-magic-numbers': 'off',
    'no-mixed-operators': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-unsafe-regex/no-unsafe-regex': 'error',
    'no-unused-expressions' : ['error', { 'allowTernary': true }],
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx']  }],
    'react/destructuring-assignment': 'off',
    'import/no-default-export': 'off',
    'import/prefer-default-export': 'off'
  },
  globals: {
    'STATIC_PATH': false,
    'MODE': false,
    'SEARCH_API_URL': false,
    'SEARCH_API_KEY': false,
    'TRACKING_CODE': false
  }
}

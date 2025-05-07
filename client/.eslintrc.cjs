module.exports = {
    root: true,
    env: {
      browser: true,
      es2020: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: [
      'react',
      'react-refresh'
    ],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // manually define PropTypes:
      //'react/prop-types': 'off', 
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };
  
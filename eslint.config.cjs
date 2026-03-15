const js = require('@eslint/js');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const prettier = require('eslint-config-prettier');

module.exports = [
    { ignores: ['node_modules', 'build', 'public/build', 'vendor', '*.config.js', '*.config.cjs'] },
    js.configs.recommended,
    {
        files: ['resources/js/**/*.js', 'resources/js/**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: {
                window: 'readonly',
                document: 'readonly',
                fetch: 'readonly',
                FormData: 'readonly',
                URL: 'readonly',
                URLSearchParams: 'readonly',
                import: 'readonly',
                importMeta: 'readonly',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        settings: { react: { version: '18' } },
        rules: {
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react/prop-types': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true, allowExportNames: ['useAuth'] }],
        },
    },
    prettier,
];

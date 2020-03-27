module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base', 'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier": "error", //prettier identifica e retorna erro no eslint 
    "class-methods-use-this": "off", //permite classes não usar o this
    "no-param-reassign": "off", //permite receber e alterar parametros
    "camelcase": "off", //permite utilizar _ no nome de variáveis
    "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
  },
};

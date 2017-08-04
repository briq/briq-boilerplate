module.exports = {
  extends: 'airbnb-base',
  env: {
    node: true
  },
  rules: {
    'comma-dangle': ['warn', 'never'],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '(next|res)' }],
    'arrow-body-style': 'off'
  }
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    quotes: ["error", 'double'],
    'import/extensions': [1, 'ignorePackages'],
  },
  plugins: [
    'chai-friendly',
  ],
};

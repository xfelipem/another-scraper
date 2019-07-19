// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-transform-object-rest-spread'
  ].map(require.resolve)
};
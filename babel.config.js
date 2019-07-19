// babel.config.js
module.exports = {
  plugins: [
    'babel-plugin-transform-object-rest-spread'
  ].map(require.resolve)
};
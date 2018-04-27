const merge = require('webpack-merge')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const webpackBaseConfig = require('./webpack.base.config')

module.exports = merge(webpackBaseConfig, {
  mode: 'production',

  optimization: {
    splitChunks: {
    },
  },

  plugins: [
    new WebpackCleanupPlugin(),
  ],
})

const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',

  devServer: {
    port: 3000,
    stats: webpackBaseConfig.stats,
  },

  plugins: [
  ],
})

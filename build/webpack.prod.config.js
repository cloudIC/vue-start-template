const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpackBaseConfig = require('./webpack.base.config')
const { getCssConfig, resolveRootPath } = require('./common')

module.exports = merge(webpackBaseConfig, getCssConfig(true), {
  mode: 'production',

  output: {
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolveRootPath(),
      beforeEmit: true,
    }),
  ],
})

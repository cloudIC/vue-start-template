const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config')
const { getCssConfig, getModuleList } = require('./common')

module.exports = merge(webpackBaseConfig, getCssConfig(false), {
  mode: 'development',

  devtool: '#eval-source-map',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].js'
  },

  devServer: {
    port: 3000,
    stats: webpackBaseConfig.stats,
    hot: true,
    inline: true,
    historyApiFallback: {
      rewrites: getModuleList().map(moduleName => ({ from: new RegExp(`^/${moduleName}`), to: `/${moduleName}/index.html` }))
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})

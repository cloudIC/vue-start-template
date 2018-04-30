const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolveRootPath, getModuleList } = require('./common')

const entry = {
  vendor: ['vue', resolveRootPath('src/common.js')],
}
const htmlPlugins = []
const moduleList = getModuleList()

moduleList.forEach(folder => {
  const chunkName = `${folder}/${folder}`
  entry[chunkName] = resolveRootPath(`src/${folder}/main.js`)

  htmlPlugins.push(new HtmlWebpackPlugin({
    template: resolveRootPath('src/index.html'),
    filename: `${folder}/index.html`,
    chunks: ['runtime', 'vendor', chunkName],
  }))
})

module.exports = {
  entry,

  output: {
    path: resolveRootPath('dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        use: [{
          loader: 'eslint-loader',
          options: {
            formatter: require('eslint-friendly-formatter'),
            emitWarning: true,
          }
        }],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      name: 'vendor',
    },
  },

  resolve: {
    extensions: ['.js', '.vue', '.jsx'],
    alias: {
      '@': resolveRootPath('src'),
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    ...htmlPlugins,
  ],

  stats: {
    modules: false,
    colors: true,
    assets: true,
    cached: false,
    cachedAssets: false,
    children: false,
  },
}

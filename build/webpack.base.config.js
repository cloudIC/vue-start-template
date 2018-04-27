const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { resolveRootPath } = require('./common')

module.exports = {
  entry: [
    'babel-polyfill',
    resolveRootPath('src/main.js'),
  ],

  output: {
    path: resolveRootPath('dist'),
    filename: '[name].[chunkhash:7].js',
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
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
          'postcss-loader',
        ],
      }
    ],
  },

  resolve: {
    extensions: ['.js', '.vue', '.jsx'],
    alias: {
      '@': resolveRootPath('src'),
    },
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: resolveRootPath('public/index.html'),
      filename: 'index.html',
    }),
  ],

  stats: {
    modules: false,
    colors: true,
    assets: true,
    children: false,
  },
}

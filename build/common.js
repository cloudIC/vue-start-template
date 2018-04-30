const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ROOT_PATH = path.resolve(__dirname, '../')

const resolveRootPath = (...args) => path.resolve(ROOT_PATH, ...args)

const getModuleList = () => {
  const moduleList = []
  if (!moduleList.length) {
    moduleList.push(...fs.readdirSync(resolveRootPath('src')).filter(file => !path.extname(file)))
  }
  return moduleList
}

const getCssConfig = isProd => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        oneOf: [
          // this matches <style module>
          {
            resourceQuery: /module/,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[base64:8]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: !isProd,
                },
              },
            ]
          },
          // this matches plain <style> or <style scoped>
          {
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: !isProd,
                },
              },
            ]
          }
        ],
      }
    ],
  },

  plugins: [
    ...isProd ? [new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    })] : []
  ],
})

module.exports = {
  ROOT_PATH,
  resolveRootPath,
  getModuleList,
  getCssConfig,
}

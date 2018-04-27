const path = require('path')

const ROOT_PATH = path.resolve(__dirname, '../')

const resolveRootPath = (...args) => path.resolve(ROOT_PATH, ...args)

module.exports = {
  ROOT_PATH,
  resolveRootPath,
}

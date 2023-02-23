const TerserWebpackPlugin = require('terser-webpack-plugin')
module.exports = {
  entry: {
    'axios-wx-request': './src/lib/core/index.js',
    'axios-wx-request-min': './src/lib/core/index.js',
  },
  output: {
    clean: true,
    library: {
      name: 'axios-wx-request',
      type: 'umd'
    },
    globalObject: 'wx'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserWebpackPlugin({ test: /min\.js$/ })]
  }
}
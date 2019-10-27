const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

require('@babel/register')

const { production, browsers } = require('./build/consts')
const context = path.resolve(__dirname, './src/browsers')

const config = {
  mode: process.env.NODE_ENV || 'development',
  context,
  entry () {
    let entries = {}

    browsers.forEach(browser => {
      let assetsPath = `${browser}/assets/js`
      let files = fs.readdirSync(`${context}/${assetsPath}`)

      files.forEach(file => {
        file = `${assetsPath}/${file}`
        entries[file] = `${context}/${file}`
      })
    })

    return entries
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '**/*',
        to: './',
        ignore: [
          {
            dot: true,
            glob: '**/private/**/*',
          },
        ],
      },
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  resolve: {
    alias: {
      common: path.resolve(__dirname, './src/common'),
    },
    extensions: ['*', '.js', '.json'],
  },
  devtool: production
    ? 'cheap-module-source-map'
    : 'inline-cheap-module-source-map',
  optimization: {
    minimize: production,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors.js',
          chunks: 'all',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  watch: !production,
}

module.exports = config


import * as fs from 'fs'
import * as path from 'path'
import * as webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { browsers, production } from './build/consts'

const context = path.resolve(__dirname, './src/browsers')

export const config: webpack.Configuration = {
  mode: production ? 'production' : 'development',
  context,
  entry () {
    const entries: Record<string, any> = {}

    browsers.forEach(browser => {
      let assetsPath = `${browser}/assets/js`
      let files = fs.readdirSync(`${context}/${assetsPath}`)

      files.forEach(file => {
        const name = file.replace('.ts', '')
        entries[`${assetsPath}/${name}.js`] = `${context}/${assetsPath}/${name}`
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
        test: /\.tsx?$/,
        loader: 'ts-loader',
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
          { glob: '**/*/*.ts', dot: true },
          { glob: '**/private/**/*', dot: true }
        ],
      },
    ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [
      new TsconfigPathsPlugin()
    ]
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

export default config


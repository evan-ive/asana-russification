import webpack from 'webpack'
import webpackConfig from '../webpack.config'

import { production } from './consts'

export default (cb) => {
  let compiler = webpack(webpackConfig)

  let args = [(err, stats) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(stats.toString({
      chunks: false,
      colors: true,
    }))

    if (!err && !stats.hasErrors()) cb()
  }]

  if (!production) {
    args.unshift(webpackConfig.watchOptions || {})
  }

  compiler[production ? 'run' : 'watch'].apply(compiler, args)
}

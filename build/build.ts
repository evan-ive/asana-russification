import webpack, { Compiler } from 'webpack'
import { config as webpackConfig } from '../webpack.config'
import { production } from './consts'

export function build (callback: Function) {
  const compiler = webpack(webpackConfig)
  const handler: Compiler.Handler = (err, stats) => {
    if (err) return console.error(err)

    console.log(stats.toString({
      chunks: false,
      colors: true,
    }))

    if (!err && !stats.hasErrors()) callback()
  }

  if (production) {
    compiler.run(handler)
  } else {
    compiler.watch(webpackConfig.watchOptions!, handler)
  }
}

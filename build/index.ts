import * as fs from 'fs'
import * as fse from 'fs-extra'
import * as path from 'path'
import { build } from './build'
import { browsers } from './consts'

build(() => {
  ['vendors.js'].forEach(fileName => {
    const filePath = path.posix.join('./dist/', fileName)
    if (!fs.existsSync(filePath)) return

    browsers.forEach(browser => {
      fse.copySync(filePath, `./dist/${browser}/assets/js/${fileName}`)
    })

    fse.removeSync(filePath)
  })
})

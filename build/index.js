const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')

import build from './build'
import { browsers } from './consts'

build(() => {

  ['vendors.js', 'vendors.js.map'].forEach(fileName => {

    let filePath = path.posix.join('./dist/', fileName)

    if (fs.existsSync(filePath)) {

      browsers.forEach(browser => {
        fse.copySync(filePath, `./dist/${browser}/assets/js/${fileName}`)
      })

      fse.removeSync(filePath)

    }

  })

})

import * as fs from 'fs'
import { config as configEnv } from 'dotenv'

configEnv()

const {
  NODE_ENV = 'development'
} = process.env

export const production = NODE_ENV === 'production'
export const browsers = fs.readdirSync('./src/browsers')

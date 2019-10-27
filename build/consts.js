import { config as configEnv } from 'dotenv'
import fs from 'fs'

configEnv()

const { NODE_ENV = 'development' } = process.env

export const production = NODE_ENV === 'production'
export const browsers = fs.readdirSync('./src/browsers')

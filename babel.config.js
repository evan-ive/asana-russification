const presets = [
  ['@babel/env']
]

const plugins = [
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-syntax-dynamic-import'
]

module.exports = { presets, plugins }

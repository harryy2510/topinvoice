const path = require('path')
const CracoEsbuildPlugin = require('craco-esbuild')

require('dotenv').config({ path: path.resolve('..', '..', '.env') })

const webpack = require('webpack')

module.exports = {
  plugins: [{ plugin: CracoEsbuildPlugin }],
  webpack: {
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react'
      })
    ]
  },
  eslint: {
    enable: false
  },
  babel: {
    plugins: [
      [
        'babel-plugin-direct-import',
        {
          modules: ['@mui/system', '@mui/material', '@mui/lab', '@mui/icons-material', 'lodash', 'lodash-es']
        }
      ]
    ]
  }
}

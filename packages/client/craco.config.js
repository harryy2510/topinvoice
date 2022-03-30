const path = require('path')
require('dotenv').config({ path: path.resolve('..', '..', '.env') })

const webpack = require('webpack')

module.exports = {
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

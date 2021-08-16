'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_BASEURL: '"http://106.15.38.61:8088/"'
  API_BASEURL: '"http://192.168.31.247/"'
})

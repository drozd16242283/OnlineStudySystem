require('babel-core/register')
require('babel-polyfill')

require('dotenv').config()

var app = require('./app/server/server')

module.exports = app

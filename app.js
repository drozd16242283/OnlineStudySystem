require('babel-core/register')
require('babel-polyfill')

var app = require('./app/server/server')

module.exports = app

const express = require('express')
const routes = require('./routes')

module.exports = () => {
  const app = express()
  global.port = process.env.PORT || 3003

  app.use('/', routes)

  app.listen(global.port)
  console.log('Started on port', global.port)
}

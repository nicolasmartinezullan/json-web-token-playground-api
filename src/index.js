require('dotenv').config()

const { generateKeys } = require('./keys')
const launchApp = require('./launchApp')

generateKeys()
launchApp()

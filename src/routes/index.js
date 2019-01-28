const express = require('express')
const jwks = require('./jwks')
const token = require('./token')
const tokens = require('./tokens')
const verify = require('./verify')
const keys = require('./keys')

const router = express()

router.get(['/.well-known/jwks.json', '/.well-known/jwks'], jwks)
router.get('/token', token)
router.get('/tokens', tokens)
router.get('/verify/:token', verify)
router.get('/keys', keys)

module.exports = router

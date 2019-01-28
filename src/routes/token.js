const jwt = require('jsonwebtoken')
const { tokens, certs, kid } = require('../keys')

module.exports = (req, res) => {
  const token = jwt.sign(
    {
      locale: 'en-GB',
      scope: 'read:invoice',
    },
    certs.private,
    {
      keyid: kid,
      expiresIn: '5m',
      issuer: 'https://api.example.com/oauth2/',
      audience: '9842f03e6afd4ccf8baacb381716f9a',
      subject: '036fefcb-4209-4cb2-a0a4-17c14f76064d',
      algorithm: 'RS256',
    }
  )
  tokens.push(token)
  res.json({
    token,
  })
}

const jwt = require('jsonwebtoken')
const { tokens, getKey } = require('../keys')

module.exports = async (req, res) => {
  const token = req.params.token
  const result = await new Promise(resolve =>
    jwt.verify(token, getKey, (err, decoded) => resolve(err || decoded))
  )
  res.json(result)
}

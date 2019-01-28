const { certs } = require('../keys')

module.exports = (req, res) => {
  const keys = {}
  Object.keys(certs).forEach(key => (keys[key] = certs[key].toString('utf8')))
  res.json(keys)
}

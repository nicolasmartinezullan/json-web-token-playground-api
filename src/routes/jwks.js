const { currentJwk } = require('../keys')

module.exports = (req, res) => {
  res.json({ keys: currentJwk() })
}

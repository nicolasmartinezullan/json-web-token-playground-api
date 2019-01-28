const { tokens } = require('../keys')

module.exports = (req, res) => {
  res.json({ count: tokens.length, items: tokens })
}

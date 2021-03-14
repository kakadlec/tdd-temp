const moment = require('moment')

module.exports = async (req, res, next) => {
  const now = moment().format()
  const token = req.headers.authorization

  console.log(now, token)

  next()
}

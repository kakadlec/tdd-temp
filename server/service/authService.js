const moment = require('moment')
const authData = require('../data/authData')

module.exports = async (req, res, next) => {
  const now = moment().utc()
  const exp = moment(now).add(3, 'hours')
  const data = {
    now: now.format(),
    exp: exp.format(),
    token: req.headers.authorization,
    ip: req.ip
  }

  if (!data.token) { return res.sendStatus(401) }

  const tokenData = await authData.checkToken(data)

  if (tokenData) {
    const expirationDate = moment(tokenData.expirationDate)
    const diff = expirationDate.diff(now, 'minutes')

    if (diff <= 20) {
      console.log('update')
      await authData.updateToken(data)
    }
    next()
  } else {
    return res.sendStatus(401)
  }
}

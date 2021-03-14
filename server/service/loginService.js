const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const usersService = require('./usersService')
const loginData = require('../data/loginData')

exports.login = async (data) => {
  const user = await usersService.getByUsername(data.username)

  if (!user || user.password !== data.password) { throw new Error('Invalid credentials') }

  const createDate = moment.utc().format()
  const expirateDate = moment.utc(createDate).add(3, 'hours').format()

  console.log(createDate)
  console.log(expirateDate)

  const tokenData = {
    userId: user.id,
    token: 'user ' + uuidv4(),
    tokenType: 'USER',
    creationDate: createDate,
    lastAccessDate: createDate,
    expirationDate: expirateDate
  }

  await loginData.save(tokenData)

  return tokenData.token
}

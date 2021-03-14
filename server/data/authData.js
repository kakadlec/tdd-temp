const database = require('../infra/database')

exports.checkToken = async (data) => {
  try {
    const tokenData = await database('userToken')
      .select('id', 'userId', 'expirationDate')
      .where('token', '=', data.token)
      .andWhere('expirationDate', '>=', data.now)
      .first()

    return tokenData
  } catch (error) {
    throw new Error(error)
  }
}

exports.updateToken = async (data) => {
  try {
    await database('userToken')
      .update({ expirationDate: data.exp })
      .where('token', '=', data.token)

    return
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

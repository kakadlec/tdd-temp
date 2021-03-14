const database = require('../infra/database')

exports.save = async (data) => {
  try {
    await database('userToken')
      .insert(data)

    return
  } catch (error) {
    throw new Error(error)
  }
}

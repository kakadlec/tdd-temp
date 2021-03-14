const database = require('../infra/database')

exports.save = async (data) => {
  try {
    console.log(data)
    await database('userToken')
      .insert(data)

    return
  } catch (error) {
    throw new Error(error)
  }
}

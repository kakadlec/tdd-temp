const database = require('../infra/database')

exports.get = async () => {
  try {
    return await database('userApp').select()
  } catch (error) {
    throw new Error(error)
  }
}

exports.getById = async (id) => {
  try {
    return await database('userApp').select().where({ id: id }).first()
  } catch (error) {
    throw new Error(error)
  }
}

exports.getByUsername = async (username) => {
  try {
    return await database('userApp').select().where({ username }).first()
  } catch (error) {
    throw new Error(error)
  }
}

exports.save = async (data) => {
  try {
    const id = await database('userApp')
      .returning('id')
      .insert(data)

    return { id: id[0] }
  } catch (error) {
    throw new Error(error)
  }
}

exports.update = async (id, data) => {
  try {
    return await database('userApp').update(data).where({ id: id })
  } catch (error) {
    throw new Error(error)
  }
}

exports.delete = async (id) => {
  try {
    return await database('userApp').delete().where({ id: id })
  } catch (error) {
    throw new Error(error)
  }
}

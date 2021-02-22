const usersData = require('../data/usersData')

exports.get = async () => {
  const data = await usersData.get()
  return data
}

exports.getById = async (id) => {
  return await usersData.getById(id)
}

exports.save = async (data) => {
  return await usersData.save(data)
}

exports.update = async (id, data) => {
  return await usersData.update(id, data)
}

exports.delete = async (id) => {
  return await usersData.delete(id)
}

const usersData = require('../data/usersData')

exports.get = async () => {
  return await usersData.get()
}

exports.getById = async (id) => {
  return await usersData.getById(id)
}

exports.getByUsername = async (username) => {
  return await usersData.getByUsername(username)
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

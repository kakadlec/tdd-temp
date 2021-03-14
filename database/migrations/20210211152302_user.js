const moment = require('moment')
const { onUpdate } = require('../triggers')

exports.up = function (knex) {
  return knex.schema.createTable('user_app', table => {
    table.increments('id')
    table.string('username').unique()
    table.string('password')
    table.string('first_name')
    table.string('last_name')
    table.string('email')
    table.string('phone_number')
    table.timestamp('created_at').defaultTo(moment.utc().format())
    table.timestamp('updated_at').defaultTo(moment.utc().format())
  }).then(() => {
    return knex.raw(onUpdate('user_app', 'id'))
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('user_app')
}

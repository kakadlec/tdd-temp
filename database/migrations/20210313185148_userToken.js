const moment = require('moment')
const { onUpdate } = require('../triggers')

exports.up = function (knex) {
  return knex.schema.createTable('user_token', table => {
    table.increments('id')
    table.integer('user_id').unsigned().references('id').inTable('user_app').onUpdate('CASCADE').onDelete('CASCADE')
    table.string('ip').notNullable()
    table.string('token').notNullable()
    table.string('token_type').notNullable()
    table.datetime('creation_date').notNullable()
    table.datetime('last_access_date').notNullable()
    table.datetime('expiration_date').notNullable()
    table.timestamp('created_at').defaultTo(moment.utc().format())
    table.timestamp('updated_at').defaultTo(moment.utc().format())

    table.unique('token')
    table.index('user_id')
    table.index('last_access_date')
  }).then(function () {
    return knex.raw(onUpdate('user_token', 'id'))
  })
}

exports.down = function (knex) {
  knex.schema.alterTable('user_token', table => {
    table.dropForeign('user_id')
  })
  return knex.schema.dropTable('user_token')
}

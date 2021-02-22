const knex = require('knex')
const knexStringCase = require('knex-stringcase')

const config = require('../../knexfile')

const options = knexStringCase(config)

const db = knex(options)

module.exports = db

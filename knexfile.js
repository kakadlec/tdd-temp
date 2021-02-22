const path = require('path')

module.exports = {
  client: 'mssql',
  connection: {
    server: process.env.DBSERVER,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
    encrypt: true,
    options: {
      enableArithAbort: true
    }
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: path.join(__dirname, './database/migrations')
  },
  seeds: {
    directory: path.join(__dirname, './database/seeds')
  }
}

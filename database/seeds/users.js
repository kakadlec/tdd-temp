
exports.seed = function (knex) {
  return knex('user_app').del()
    .then(function () {
      return knex('user_app').insert([
        { username: 'admin@admin.com.br', password: '123456' }
      ])
    })
}

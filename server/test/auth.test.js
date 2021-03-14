/* eslint-env jest */
const crypto = require('crypto')
const request = require('supertest')
const app = require('../infra/app')
const database = require('../infra/database')
const usersService = require('../service/usersService')
const loginService = require('../service/loginService')

const generate = () => {
  return crypto.randomBytes(10).toString('hex')
}

describe('Auth endpoint', () => {
  beforeAll(async () => {
    await database.migrate.up('20210211152302_user.js')
    await database.migrate.up('20210313185148_userToken.js')
  })

  afterAll(async () => {
    await database.migrate.down('20210313185148_userToken.js')
    await database.migrate.down('20210211152302_user.js')
    await database.destroy()
  })

  afterEach(async () => {
    await database('userApp').del()
  })

  test('should return unauthorized if a valid token was not send', async () => {
    const data = { username: generate(), password: generate() }
    await usersService.save(data)
    await loginService.login(data)

    const response = await request(app).get('/users').set('Authorization', 'fakeToken')

    expect(response.statusCode).toBe(401)
  })

  test.only('should proceed if a valid token was send', async () => {
    const data = { username: generate(), password: generate() }
    await usersService.save(data)
    const token = await loginService.login(data)

    const response = await request(app).get('/users').set('Authorization', token)

    expect(response.statusCode).toBe(200)
  })
})

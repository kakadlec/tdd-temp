/* eslint-env jest */
const request = require('supertest')
const app = require('../infra/app')
const database = require('../infra/database')
const usersService = require('../service/usersService')
const { v4: uuid } = require('uuid')

jest.mock('uuid')

describe('Login endpoint', () => {
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

  test('should return a token if valid credentials are provided', async () => {
    uuid.mockImplementation(() => 'token')
    const data = { username: 'any_mail@mail.com.br', password: 'any_password' }
    await usersService.save(data)

    const response = await request(app).post('/login').send(data)

    expect(response.statusCode).toBe(200)
    expect(response.body.token).toBe('user token')
  })

  test('should return 401 if invalid username is provided', async () => {
    const data = { username: 'any_mail@mail.com.br', password: 'any_password' }
    const invalidData = { username: 'invalid_mail@mail.com.br', password: 'any_password' }
    await usersService.save(data)

    const response = await request(app).post('/login').send(invalidData)

    expect(response.statusCode).toBe(401)
  })

  test('should return 401 if invalid password is provided', async () => {
    const data = { username: 'any_mail@mail.com.br', password: 'any_password' }
    const invalidData = { username: 'any_mail@mail.com.br', password: 'invalid_password' }
    await usersService.save(data)

    const response = await request(app).post('/login').send(invalidData)

    expect(response.statusCode).toBe(401)
  })
})

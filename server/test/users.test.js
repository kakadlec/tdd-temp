/* eslint-env jest */
const crypto = require('crypto')
const request = require('supertest')
const app = require('../infra/app')
const database = require('../infra/database')
const usersService = require('../service/usersService')

const generate = () => {
  return crypto.randomBytes(10).toString('hex')
}

describe('Users endpoint', () => {
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

  test('should get users', async () => {
    await usersService.save({ username: generate(), password: generate() })
    await usersService.save({ username: generate(), password: generate() })
    await usersService.save({ username: generate(), password: generate() })

    const response = await request(app).get('/users')

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveLength(3)
  })

  test('should get a user by id', async () => {
    const { id } = await usersService.save({ username: generate(), password: generate() })

    const response = await request(app).get(`/users/${id}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.id).toBe(id)
  })

  test('should get a user by username', async () => {
    const data = { username: generate(), password: generate() }
    const { id } = await usersService.save(data)

    const user = await usersService.getByUsername(data.username)
    expect(user.id).toBe(id)
  })

  test('should save a user', async () => {
    const data = { username: generate(), password: generate() }

    const response = await request(app).post('/user').send(data)
    const id = response.body.id
    const user = await usersService.getById(id)

    expect(response.statusCode).toBe(200)
    expect(user.id).toBe(id)
    expect(user.username).toBe(data.username)
    expect(user.password).toBe(data.password)
  })

  test('should update a user', async () => {
    const data1 = { username: generate(), password: generate() }
    const data2 = { username: generate(), password: generate() }
    const { id } = await usersService.save(data1)

    const response = await request(app).put(`/users/${id}`).send(data2)
    const newUser = await usersService.getById(id)

    expect(response.statusCode).toBe(200)
    expect(newUser.id).toBe(id)
    expect(newUser.username).toBe(data2.username)
    expect(newUser.password).toBe(data2.password)
  })

  test('should delete a user', async () => {
    const { id } = await usersService.save({ username: generate(), password: generate() })
    await usersService.save({ username: generate(), password: generate() })

    const response = await request(app).delete(`/users/${id}`)

    const users = await request(app).get('/users')

    expect(response.statusCode).toBe(200)
    expect(users.body).toHaveLength(1)
  })

  // test('should return error if get users fail for any reason', async () => {
  // const selectMock = jest.spyOn(database, 'select')

  // selectMock.mockReturnValue(new Error('Internal Server Error'))

  // // const response = await request(app).get('/users')

  // // expect(response.statusCode).toBe(200)
  // // expect(response.body).toEqual({ error: 'Internal Server Error' })

  // const teste = await database('userApp').select()
  // console.log(teste)
  // expect(teste).toEqual('Internal Server Error')

  // selectMock.mockRestore()
  // })
})

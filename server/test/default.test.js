/* eslint-env jest */
const request = require('supertest')
const app = require('../infra/app')

describe('Default route', () => {
  test('should return 404 on invalid route', async () => {
    const response = await request(app).get('/invalid_route')

    expect(response.statusCode).toBe(404)
  })
})

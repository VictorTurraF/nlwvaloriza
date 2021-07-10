import request from 'supertest'
import { app } from '../../App'
import { Database } from '../../database/Database'

describe('Authentication Controller', () => {
  beforeAll(async () => {
    await Database.setUpConnection()
  })

  it('should creates an user', async () => {
    const requestBody = {
      name: 'Amanda Turra',
      email: 'amanda.turra@gmail.com',
      password: 'niw123',
      admin: false
    }

    const response = await request(app)
      .post('/users')
      .send(requestBody)

    expect(response.status).toBe(201)
  })
})

import request from 'supertest'
import { App } from '../../App'

describe('Authentication Controller', () => {
  const app = new App().express

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

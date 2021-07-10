import { app } from '../../App'
import request from 'supertest'

describe('Compliments Controller', () => {
  it('should not be able to access if not authenticated', async () => {
    const response = await request(app)
      .post('/compliments')
      .send({
        tag_id: '42304720-06a1-49d7-bd6f-91ab544b477e',
        user_receiver: '03b4b3d1-af3e-482e-bca4-163c66b52343',
        message: 'Você é sensacional!'
      })

    expect(response.status).toBe(401)
  })
})

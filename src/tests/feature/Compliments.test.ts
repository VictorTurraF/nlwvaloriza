import { app } from '../../App'
import request from 'supertest'
import { make } from 'typeorm-factory-tools'
import { User } from '../../entities/User'
import { AuthenticateUserUseCase } from '../../use_cases/AuthenticateUserUseCase'
import { Tag } from '../../entities/Tag'
import '../../factories/UserFactory'
import '../../factories/TagFactory'
import { hash } from 'bcryptjs'

describe('Compliments Controller', () => {
  const authUseCase = new AuthenticateUserUseCase()

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

  it('should send a compliment', async () => {
    const password = 'password'
    const encriptedPassword = hash(password, 8)

    const complimentSender = await make(User, {
      password: encriptedPassword
    })
    const complimentReceiver = await make(User)
    const tag = await make(Tag)

    const token = await authUseCase.authenticateUser({
      email: complimentSender.email,
      password: password
    })

    const response = await request(app)
      .post('/compliments')
      .set('Authorization', `Bearer ${token}`)
      .send({
        tag_id: tag.id,
        user_receiver: complimentReceiver.id,
        message: "You're awesome! Good job!"
      })

    expect(response.status).toBe(201)
    expect(response.body).toBeInstanceOf(Object)
  })
})

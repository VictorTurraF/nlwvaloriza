import request from 'supertest'
import { App } from '../../App'
import { make, makeMany } from 'typeorm-factory-tools'
import { Compliment } from '../../entities/Compliment'
import { User } from '../../entities/User'
import { hash } from 'bcryptjs'
import { AuthenticateUserUseCase } from '../../use_cases/AuthenticateUserUseCase'
import '../../factories/ComplimentFactory'
import '../../factories/UserFactory'

describe('Users Compliments controllers', () => {
  const app = new App().express
  const authUseCase = new AuthenticateUserUseCase()
  const password = 'password'
  const encriptedPassword = hash(password, 8)
  let token: string
  let userReceiver: User

  beforeAll(async () => {
    userReceiver = await make(User, {
      password: encriptedPassword
    })

    token = await authUseCase.authenticateUser({
      email: userReceiver.email,
      password: password
    })

    // Creates 3 compliments with this receiver user id
    await makeMany(Compliment, 3, {
      user_receiver: userReceiver.id
    })
  })

  it('should list all received compliments of given user', async () => {
    const response = await request(app)
      .get('/users/compliments/receive')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
    expect(response.body[0]).not.toHaveProperty('userSender')
  })

  it('should includes related user information by query string', async () => {
    const response = await request(app)
      .get('/users/compliments/receive?includes=sender')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('userSender')
    expect(response.body[0].userSender).toBeInstanceOf(Object)
  })
})

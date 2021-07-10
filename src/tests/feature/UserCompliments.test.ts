import { app } from '../../App'
import request from 'supertest'
import { make, makeMany } from 'typeorm-factory-tools'
import { Compliment } from '../../entities/Compliment'
import { User } from '../../entities/User'
import { hash } from 'bcryptjs'
import { AuthenticateUserUseCase } from '../../use_cases/AuthenticateUserUseCase'
import '../../factories/ComplimentFactory'
import '../../factories/UserFactory'

describe('Users Compliments controllers', () => {
  const authUseCase = new AuthenticateUserUseCase()

  it('should list all received compliments of given user', async () => {
    const password = 'password'
    const encriptedPassword = hash(password, 8)

    const userReceiver = await make(User, {
      password: encriptedPassword
    })

    const token = await authUseCase.authenticateUser({
      email: userReceiver.email,
      password: password
    })

    // Creates 3 compliments with this receiver user id
    await makeMany(Compliment, 3, {
      user_receiver: userReceiver.id
    })

    const response = await request(app)
      .get('/users/compliments/receive')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
  })
})

import { make, setConnection, disconnect } from 'typeorm-factory-tools'
import { Database } from '../../database/Database'
import { User } from '../../entities/User'
import '../../factories/UserFactory'

describe('User Factory', () => {
  beforeAll(async () => {
    setConnection(await Database.setUpConnection())
  })

  afterAll(async () => {
    await disconnect()
  })

  it('should creates an user', async () => {
    const user = await make<User>(User)

    expect(user).toHaveProperty('id')
    expect(user).toHaveProperty('name')
    expect(user).toHaveProperty('email')
    expect(user).toHaveProperty('password')
    expect(user).toHaveProperty('admin')
  })
})

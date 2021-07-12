import { make } from 'typeorm-factory-tools'
import { Compliment } from '../../entities/Compliment'
import '../../factories/ComplimentFactory'

describe('Compliment Factory', () => {
  it('should creates a Compliment', async () => {
    const tag = await make(Compliment)

    expect(tag).toHaveProperty('id')
    expect(tag).toHaveProperty('tag_id')
    expect(tag).toHaveProperty('user_sender')
    expect(tag).toHaveProperty('user_receiver')
    expect(tag).toHaveProperty('message')
  })
})

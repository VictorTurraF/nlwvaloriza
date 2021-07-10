import { make } from 'typeorm-factory-tools'
import { Tag } from '../../entities/Tag'
import '../../factories/TagFactory'

describe('Tag Factory', () => {
  it('should creates a Tag', async () => {
    const tag = await make<Tag>(Tag)

    expect(tag).toHaveProperty('name')
  })
})

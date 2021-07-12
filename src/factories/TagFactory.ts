import { define } from 'typeorm-factory-tools'
import { Tag } from '../entities/Tag'
import * as faker from 'faker'

define(Tag, {
  name: () => faker.lorem.word()
})

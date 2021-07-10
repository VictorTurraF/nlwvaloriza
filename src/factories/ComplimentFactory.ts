import { define, make } from 'typeorm-factory-tools'
import { Compliment } from '../entities/Compliment'
import * as faker from 'faker'
import { Tag } from '../entities/Tag'
import { User } from '../entities/User'
import './TagFactory'
import './UserFactory'

define(Compliment, {
  tag_id: async () => (await make(Tag)).id,
  user_receiver: async () => (await make(User)).id,
  user_sender: async () => (await make(User)).id,
  message: async () => faker.lorem.sentence(2)
})

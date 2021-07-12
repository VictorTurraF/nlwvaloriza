import { define } from 'typeorm-factory-tools'
import { User } from '../entities/User'
import * as faker from 'faker'

define(User, {
  name: () => faker.name.findName(),
  email: () => faker.internet.email(),
  password: () => faker.internet.password(),
  admin: () => faker.datatype.boolean()
})

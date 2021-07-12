import { setConnection, disconnect } from 'typeorm-factory-tools'
import { Database } from '../database/Database'

beforeAll(async () => {
  return setConnection(await Database.setUpConnection())
})

afterAll(() => {
  return disconnect()
})

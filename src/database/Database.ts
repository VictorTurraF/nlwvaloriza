import { createConnection, getConnectionOptions } from 'typeorm'

export class Database {
  private static environment = process.env.NODE_ENV

  public static async setUpConnection () {
    const connectionOptions = await getConnectionOptions(this.environment || 'development')
    return createConnection({ ...connectionOptions, name: 'default' })
  }
}

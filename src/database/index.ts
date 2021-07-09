import { createConnection } from 'typeorm'

createConnection(process.env.NODE_ENV || 'development')

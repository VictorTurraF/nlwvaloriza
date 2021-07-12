import 'reflect-metadata'
import 'express-async-errors'
import { App } from './App'
import { Database } from './database/Database'

Database
  .setUpConnection()
  .then(connection => {
    return new App().express
  })
  .then(app => {
    return app.listen(
      process.env.APP_PORT || 3000,
      function () {
        console.log(`Server is running on port ${process.env.APP_PORT}!`)
      }
    )
  })

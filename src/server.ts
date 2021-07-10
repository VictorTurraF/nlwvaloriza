import 'reflect-metadata'
import './database'
import 'express-async-errors'
import { app } from './App'

app.listen(
  process.env.APP_PORT || 3000,
  function () {
    console.log(`Server is running on port ${process.env.APP_PORT}!`)
  }
)

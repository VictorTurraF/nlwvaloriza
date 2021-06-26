import "reflect-metadata"
import "./database"
import "express-async-errors"
import { router } from './routes'
import express, { ErrorRequestHandler } from 'express'

const app = express();

app.use(express.json())
app.use(router)

const errorRequestHandler: ErrorRequestHandler = (error, request, response, next) => {
  if(error instanceof Error) {
    return response.status(400).send({
      error: error.message
    })
  }

  return response.status(500).send({
    status: "error",
    message: "Internal Server Error"
  })
}

app.use(errorRequestHandler)

app.listen(3000, () => { console.log("Server is running!") })
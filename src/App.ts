import express, { Express, NextFunction, Request, Response } from 'express'
import { router } from './routes'

export class App {
  public express: Express;

  public constructor () {
    this.express = express()

    this.setUpMiddlewares()
    this.setUpRoutes()
  }

  private setUpMiddlewares () {
    this.express.use(express.json())
    this.express.use(this.handleExceptions)
  }

  private setUpRoutes () {
    this.express.use(router)
  }

  private handleExceptions (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (error instanceof Error) {
      return response.status(400).send({
        error: error.message
      })
    }

    return response.status(500).send({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

export const app = new App().express

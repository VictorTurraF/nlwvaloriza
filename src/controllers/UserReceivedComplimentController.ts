import { Request, Response } from 'express'
import { ListUserReceivedComplimentsUseCase } from '../use_cases/ListUserReceivedComplimentsUseCase'

export class UserReceivedComplimentController {
  private useCase: ListUserReceivedComplimentsUseCase

  public constructor () {
    // console.log('Instantiating errored controller')
    this.useCase = new ListUserReceivedComplimentsUseCase()
  }

  private shouldIncludesSender (includesQuery: string) {
    return includesQuery && includesQuery === 'sender'
  }

  index = async (request: Request, response: Response) => {
    const { user_id } = request
    const { includes } = request.query

    const compliments = await this.useCase.listAllReceivedCompliments({
      userId: user_id,
      shouldIncludesUserSender: this.shouldIncludesSender(includes as string)
    })

    return response.json(compliments)
  }
}

export const userReceivedComplimentController = new UserReceivedComplimentController()

import { RequestHandler } from 'express'
import { CreateComplimentUseCase } from '../use_cases/CreateComplimentUseCase'

export class ComplimentController {
  store: RequestHandler = async (request, response) => {
    const { tag_id, user_receiver, message } = request.body
    const { user_id: user_sender } = request

    const useCase = new CreateComplimentUseCase()

    const compliment = await useCase.createCompliment({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    return response.json(compliment)
  }
}

export const complimentController = new ComplimentController()

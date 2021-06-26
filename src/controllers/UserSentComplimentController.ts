import { RequestHandler } from "express";
import { ListUserSentComplimentsUseCase } from "../use_cases/ListUserSentComplimentsUseCase";

export class UserSentComplimentController {
  index: RequestHandler = async (request, response) => {
    const { user_id } = request

    console.log('user sender', user_id)

    const useCase = new ListUserSentComplimentsUseCase()

    const compliments = await useCase.listAllUserSentCompliments(user_id)

    console.log(compliments)

    return response.json(compliments)
  }
}

export const userSentComplimentController = new UserSentComplimentController()
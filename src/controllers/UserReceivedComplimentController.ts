import { RequestHandler } from "express";
import { ListUserReceivedComplimentsUseCase } from "../use_cases/ListUserReceivedComplimentsUseCase";

export class UserReceivedComplimentController {
  index: RequestHandler = async (request, response) => {
    const { user_id } = request

    const useCase = new ListUserReceivedComplimentsUseCase()

    const compliments = await useCase.listAllReceivedCompliments(user_id)

    return response.json(compliments)
  }
}

export const userReceivedComplimentController = new UserReceivedComplimentController()
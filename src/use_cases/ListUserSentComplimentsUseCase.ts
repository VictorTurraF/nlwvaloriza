import { getCustomRepository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

export class ListUserSentComplimentsUseCase {
  async listAllUserSentCompliments(user_sender: string): Promise<Compliment[]> {
    const complimentRepository = getCustomRepository(ComplimentRepository)

    const compliments = await complimentRepository.find({
      where: {
        user_sender
      }
    })

    return compliments
  }
}
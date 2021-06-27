import { getCustomRepository } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

export class ListUserReceivedComplimentsUseCase {
  async listAllReceivedCompliments (user_receiver: string): Promise<Compliment[]> {
    const complimentRepository = getCustomRepository(ComplimentRepository)

    const compliements = await complimentRepository.find({
      where: {
        user_receiver
      },
      relations: ['userSender']
    })

    return compliements
  }
}

import { Compliment } from '../entities/Compliment'
import { ComplimentsQueryBuider } from '../query_builders/ComplimentsQueryBuilder'
import { ComplimentRepository } from '../repositories/ComplimentRepository'

interface Options {
  userId: string,
  shouldIncludesUserSender: boolean,
}

export class ListUserReceivedComplimentsUseCase {
  async listAllReceivedCompliments ({ userId, shouldIncludesUserSender }: Options): Promise<Compliment[]> {
    const queryBuilder = new ComplimentsQueryBuider(ComplimentRepository)

    queryBuilder.whereUserIsTheReceiver(userId)

    if (shouldIncludesUserSender) {
      queryBuilder.includeSenderRelationship()
    }

    const compliments = await queryBuilder.getQuery().getMany()

    return compliments
  }
}

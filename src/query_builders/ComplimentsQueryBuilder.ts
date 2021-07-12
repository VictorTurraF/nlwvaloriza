import { getCustomRepository, ObjectType, QueryBuilder, SelectQueryBuilder } from 'typeorm'
import { Compliment } from '../entities/Compliment'
import { ComplimentRepository } from '../repositories/ComplimentRepository'
import { ComplimentsQueryBuiderContract } from './contracts/ComplimentsQueryBuilder'

/**
 * TypeOrm Query builder implementation
 */
export class ComplimentsQueryBuider implements ComplimentsQueryBuiderContract<QueryBuilder<Compliment>> {
  private query: SelectQueryBuilder<Compliment>;
  private repository: ComplimentRepository;

  public constructor (repository: ObjectType<ComplimentRepository>) {
    this.repository = getCustomRepository(repository)
    this.query = this.createCustomQueryBuilder(this.repository)
  }

  public includeSenderRelationship () {
    return this.query.leftJoinAndSelect('compliment.userSender', 'userSender')
  }

  public includeReceiverRelationship () {
    return this.query.leftJoinAndSelect('compliment.userReceiver', 'userReceiver')
  }

  public whereUserIsTheSender (userId: String) {
    return this.query.where({ user_sender: userId })
  }

  public whereUserIsTheReceiver (userId: String) {
    return this.query.where({ user_receiver: userId })
  }

  public createCustomQueryBuilder (repository: ComplimentRepository): SelectQueryBuilder<Compliment> {
    return repository.createQueryBuilder('compliment')
  }

  public getQuery () {
    return this.query
  }
}

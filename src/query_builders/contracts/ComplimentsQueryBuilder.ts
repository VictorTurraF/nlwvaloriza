import { ComplimentRepository } from '../../repositories/ComplimentRepository'

export interface ComplimentsQueryBuiderContract<QB> {
  /**
   * Creates an query builder given the repository
   *
   * @param repository
   */
  createCustomQueryBuilder(repository: ComplimentRepository): QB;
  /** Includes related user sender data */
  includeSenderRelationship(): QB;
  /** Includes related user receiver data */
  includeReceiverRelationship(): QB;
}

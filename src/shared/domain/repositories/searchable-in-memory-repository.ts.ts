import { Entity } from '../entities/entity'
import { InMemoryRepository } from './in-memory.repository'
import { SearchableRepositoryInterface } from './searchable-repository-contracts.ts'

export abstract class SearchableInMemoryRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {}
}

import { ConflictError } from '@/shared/domain/errors/conflict-error'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { SearchableInMemoryRepository } from '@/shared/domain/repositories/searchable-in-memory-repository'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserRepositoryInterface } from '@/users/domain/repositories/user.repository.interface'

export class InMemoryUserRepository
  extends SearchableInMemoryRepository<UserEntity>
  implements UserRepositoryInterface
{
  protected applyFilter(
    items: UserEntity[],
    filter: string,
  ): Promise<UserEntity[]> {
    throw new Error('Method not implemented.')
  }
  async findByEmail(email: string): Promise<UserEntity> {
    const entity = this.items.find(item => item.email === email)
    if (!entity) {
      throw new NotFoundError('Entity not found')
    }
    return entity
  }
  async emailExists(email: string): Promise<void> {
    const entity = this.items.find(item => item.email === email)
    if (entity) {
      throw new ConflictError('Email already in use')
    }
  }
}

import { UserEntity } from '../entities/user.entity'
import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository-contracts.ts'

export interface UserRepositoryInterface
  extends SearchableRepositoryInterface<UserEntity, any, any> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}

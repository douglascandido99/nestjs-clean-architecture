import { UserRepository } from '@/users/domain/repositories/user.repository.interface'
import { UserOutput } from '../dtos/user-output.dto'

export namespace GetUserUseCase {
  export type Input = {
    id: string
  }

  export type Output = UserOutput

  export class UseCase {
    constructor(private userRepository: UserRepository.RepositoryInterface) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      return entity.toJSON()
    }
  }
}

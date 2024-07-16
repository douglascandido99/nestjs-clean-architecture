import { UserRepository } from '@/users/domain/repositories/user.repository.interface'
import { UserOutput } from '../dtos/user-output.dto'
import { UseCase as DefaultUseCase } from '@/shared/application/use-cases/use-case'

export namespace GetUserUseCase {
  export type Input = {
    id: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.RepositoryInterface) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      return entity.toJSON()
    }
  }
}

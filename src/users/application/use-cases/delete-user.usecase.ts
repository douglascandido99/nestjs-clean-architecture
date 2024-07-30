import { UserRepository } from '@/users/domain/repositories/user.repository.interface'
import { UseCase as DefaultUseCase } from '@/shared/application/use-cases/use-case'

export namespace DeleteUserUseCase {
  export type Input = {
    id: string
  }

  export type Output = void

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private userRepository: UserRepository.RepositoryInterface) {}

    async execute(input: Input): Promise<Output> {
      await this.userRepository.delete(input.id)
    }
  }
}

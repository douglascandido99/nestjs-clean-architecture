import { UserRepository } from '@/users/domain/repositories/user.repository.interface'
import { BadRequestError } from '../errors/bad-request-error'
import { UserEntity } from '@/users/domain/entities/user.entity'
import { HashProvider } from '@/shared/application/providers/hash-provider'
import { UserOutput } from '../dtos/user-output.dto'
import { UseCase as DefaultUseCase } from '@/shared/application/use-cases/use-case'

export namespace SignupUseCase {
  export type Input = {
    name: string
    email: string
    password: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.RepositoryInterface,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, name, password } = input

      if (!email || !name || !password) {
        throw new BadRequestError('Input data not provided')
      }

      await this.userRepository.emailExists(email)

      const passwordHash = await this.hashProvider.generateHash(password)

      const entity = new UserEntity(
        Object.assign(input, { password: passwordHash }),
      )

      await this.userRepository.insert(entity)

      return entity.toJSON()
    }
  }
}

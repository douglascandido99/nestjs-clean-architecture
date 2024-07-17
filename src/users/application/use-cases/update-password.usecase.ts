import { UserRepository } from '@/users/domain/repositories/user.repository.interface'
import { UserOutput, UserOutputMapper } from '../dtos/user-output.dto'
import { UseCase as DefaultUseCase } from '@/shared/application/use-cases/use-case'
import { InvalidPasswordError } from '@/shared/application/errors/invalid-password-error'
import { HashProvider } from '@/shared/application/providers/hash-provider'

export namespace UpdatePasswordUseCase {
  export type Input = {
    id: string
    password: string
    oldPassword: string
  }

  export type Output = UserOutput

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.RepositoryInterface,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.userRepository.findById(input.id)
      if (!input.password || !input.oldPassword) {
        throw new InvalidPasswordError(
          'Old password and new password is required',
        )
      }

      const checkOldPassword = await this.hashProvider.compareHash(
        input.oldPassword,
        entity.password,
      )
      if (!checkOldPassword)
        throw new InvalidPasswordError('Old password does not match')

      const passwordHash = await this.hashProvider.generateHash(input.password)
      entity.updatePassword(passwordHash)
      await this.userRepository.update(entity)
      return UserOutputMapper.toOutput(entity)
    }
  }
}

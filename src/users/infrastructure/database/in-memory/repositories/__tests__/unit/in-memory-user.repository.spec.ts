import { UserEntity } from '@/users/domain/entities/user.entity'
import { InMemoryUserRepository } from '../../in-memory-user.repository'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { NotFoundError } from '@/shared/domain/errors/not-found-error'
import { ConflictError } from '@/shared/domain/errors/conflict-error'

describe('InMemoryUserRepository unit tests', () => {
  let sut: InMemoryUserRepository

  beforeEach(() => {
    sut = new InMemoryUserRepository()
  })

  it('Should throw an error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new NotFoundError('Entity not found using email a@a.com'),
    )
  })

  it('Should find an entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    const result = await sut.findByEmail(entity.email)
    expect(entity.toJSON()).toStrictEqual(result.toJSON())
  })

  it('Should throw an error when not found - emailExists method', async () => {
    const entity = new UserEntity(UserDataBuilder({}))
    await sut.insert(entity)
    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email already in use'),
    )
  })

  it('Should find an entity by email - emailExists method', async () => {
    expect.assertions(0)
    await sut.emailExists('a@a.com')
  })
})

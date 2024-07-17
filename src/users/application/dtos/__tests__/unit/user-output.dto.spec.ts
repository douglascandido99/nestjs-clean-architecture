import { UserEntity } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'
import { UserOutputMapper } from '../../user-output.dto'

describe('UserOutputMapper unit tests', () => {
  it('Should return a user in output', () => {
    const entity = new UserEntity(UserDataBuilder({}))
    const spyToJSON = jest.spyOn(entity, 'toJSON')
    const sut = UserOutputMapper.toOutput(entity)

    expect(spyToJSON).toHaveBeenCalled()
    expect(sut).toStrictEqual(entity.toJSON())
  })
})

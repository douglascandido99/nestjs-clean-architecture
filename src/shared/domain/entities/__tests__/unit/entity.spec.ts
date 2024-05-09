import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }
    const id = 'dd66ba60-9fe1-472d-a7bd-5386a851264e'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toBe(id)
  })

  it('Should convert entity to a Javascript object', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    }
    const id = 'dd66ba60-9fe1-472d-a7bd-5386a851264e'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})

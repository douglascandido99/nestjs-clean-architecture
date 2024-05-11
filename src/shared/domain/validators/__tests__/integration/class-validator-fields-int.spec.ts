import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorFields integration tests', () => {
  it('Should validate without errors', () => {
    const validator = new StubClassValidatorFields()

    expect(validator.validate({ name: 'value', price: 10 })).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(
      new StubRules({ name: 'value', price: 10 }),
    )
  })
})

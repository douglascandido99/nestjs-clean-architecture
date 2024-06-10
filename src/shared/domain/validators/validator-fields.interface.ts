export type ErrorFields = {
  [field: string]: string[]
}

export interface ValidatorFieldsInterface<ValidatedProps> {
  errors: ErrorFields
  validatedData: ValidatedProps
  validate(data: any): boolean
}

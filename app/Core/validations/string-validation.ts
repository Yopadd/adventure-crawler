import ValidationError from '../errors/validation.error'

interface StringValidationOptions {
  maxLength: number
}

export abstract class StringValidation {
  protected value: string

  protected constructor(value: string, private readonly options: StringValidationOptions) {
    if (!this.isValid(value)) {
      throw new ValidationError(`"${value}" must be lower than ${this.options.maxLength}`)
    }
    this.value = value
  }

  protected isValid(value: string): boolean {
    return value.length < this.options.maxLength
  }

  public get(): string {
    return this.value
  }
}

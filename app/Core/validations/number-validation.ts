import ValidationError from '../errors/validation.error'

interface NumberValidationOptions {
  min: number
  max: number
}

export abstract class NumberValidation {
  protected value: number

  protected constructor(
    value: number,
    private readonly options: NumberValidationOptions = {
      min: -Infinity,
      max: Infinity,
    }
  ) {
    if (!this.isValid(value)) {
      throw new ValidationError(
        `${value} must be lower than ${this.options.max} and upper than ${this.options.min}`
      )
    }
    this.value = value
  }

  protected isValid(value: number) {
    return value >= this.options.min && value <= this.options.max
  }

  public get(): number {
    return this.value
  }
}

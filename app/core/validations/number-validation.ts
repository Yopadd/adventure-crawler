import ValidationError from '#app/core/errors/validation.error'

interface NumberValidationOptions {
  min?: number
  max?: number
  safe?: boolean
}

export abstract class NumberValidation {
  protected value: number
  private readonly options: Required<NumberValidationOptions> = {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
    safe: false,
  }

  protected constructor(
    value: number,
    options: NumberValidationOptions = {
      min: Number.NEGATIVE_INFINITY,
      max: Number.POSITIVE_INFINITY,
    }
  ) {
    if (options.min !== undefined) {
      this.options.min = options.min
    }
    if (options.max !== undefined) {
      this.options.max = options.max
    }
    if (options.safe) {
      this.options.safe = true
      value = this.applySafe(value)
    }

    if (!this.isValid(value)) {
      throw new ValidationError(
        `${value} must be lower than ${this.options.max} and upper than ${this.options.min}`
      )
    }
    this.value = value
  }

  protected isValid(value: number): boolean {
    return value >= this.options.min && value <= this.options.max
  }

  public get(): number {
    return this.value
  }

  public add(value: NumberValidation) {
    let newValue = value.get() + this.value
    if (this.options.safe) {
      newValue = this.applySafe(newValue)
    }
    this.value = newValue
    return this
  }

  private applySafe(value: number): number {
    if (value < this.options.min) value = this.options.min
    if (value > this.options.max) value = this.options.max
    return value
  }
}

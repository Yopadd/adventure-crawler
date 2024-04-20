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
    if (options.max) {
      this.options.max = options.max
    }
    if (options.min) {
      this.options.min = options.min
    }
    if (options.safe) {
      this.options.safe = true
      if (value < this.options.min) value = this.options.min
      if (value > this.options.max) value = this.options.max
    }

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

import ValidationError from '#app/core/errors/validation.error'

interface StringValidationOptions {
  maxLength: number
  spaces?: boolean
}

export abstract class StringValidation {
  protected value: string

  protected constructor(
    value: string,
    private readonly options: StringValidationOptions = {
      maxLength: Number.POSITIVE_INFINITY,
      spaces: true,
    }
  ) {
    const [isValid, errors] = this.validator(value)
    if (!isValid) {
      throw new ValidationError(errors.join(', '))
    }
    this.value = value
  }

  protected validator(value: string): [boolean, string[]] {
    const acc: [boolean, string[]] = [true, []]
    return [this.maxLengthValidator(value), this.spacesValidator(value)].reduce(
      (acc, [isValid, error]) => {
        acc[0] = isValid
        acc[1] = error ? [error, ...acc[1]] : acc[1]
        return acc
      },
      acc
    )
  }

  public get(): string {
    return this.value
  }

  public equal<T extends StringValidation>(str: T): boolean {
    return str.value === this.value
  }

  private maxLengthValidator(value: string): [boolean, string | undefined] {
    const isValid = value.length < this.options.maxLength
    return [
      isValid,
      isValid ? undefined : `"${value}" must be lower than ${this.options.maxLength}`,
    ]
  }

  private spacesValidator(value: string): [boolean, string | undefined] {
    const allowSpaces = this.options.spaces ?? true
    const isValid = allowSpaces ? true : !value.includes(' ')
    return [isValid, isValid ? undefined : `"${value}" doesn't contain spaces`]
  }
}

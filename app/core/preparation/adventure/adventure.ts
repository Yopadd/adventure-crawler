import { NumberValidation } from '#app/core/validations/number-validation'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Adventure {
  public readonly name: AdventureName

  constructor(name: string) {
    this.name = new AdventureName(name)
  }
}

export class AdventureName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface AdventurePaginationInput {
  page: AdventurePageNumber
  limit: AdventurePageLimit
}

export class AdventurePageLimit extends NumberValidation {
  constructor(limit: number) {
    super(limit, {
      max: 1000,
      min: 1,
    })
  }
}

export class AdventurePageNumber extends NumberValidation {
  constructor(page: number) {
    super(page, {
      max: Number.POSITIVE_INFINITY,
      min: 1,
    })
  }
}

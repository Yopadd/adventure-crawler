import { NumberValidation } from '#app/core/validations/number-validation'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Adventure {
  constructor(public readonly name: AdventureName) {}
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
      max: 100,
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

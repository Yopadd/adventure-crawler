import { NumberValidation } from '#app/core/validations/number-validation'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Item {
  constructor(public readonly name: ItemName) {}
}

export class ItemName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface ItemPaginationInput {
  page: ItemPageNumber
  limit: ItemPageLimit
}

export class ItemPageLimit extends NumberValidation {
  constructor(limit: number) {
    super(limit, {
      max: 100,
      min: 1,
    })
  }
}

export class ItemPageNumber extends NumberValidation {
  constructor(page: number) {
    super(page, {
      max: Number.POSITIVE_INFINITY,
      min: 1,
    })
  }
}

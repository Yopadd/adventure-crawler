import { NumberValidation } from '#app/core/validations/number-validation'
import { StringValidation } from '#app/core/validations/string-validation'

export default class Dungeon {
  constructor(public readonly name: DungeonName) {}
}

export class DungeonName extends StringValidation {
  constructor(name: string) {
    super(name)
  }
}

export interface DungeonPaginationInput {
  page: DungeonPageNumber
  limit: DungeonPageLimit
}

export class DungeonPageLimit extends NumberValidation {
  constructor(limit: number) {
    super(limit, {
      max: 100,
      min: 1,
    })
  }
}

export class DungeonPageNumber extends NumberValidation {
  constructor(page: number) {
    super(page, {
      max: Number.POSITIVE_INFINITY,
      min: 1,
    })
  }
}

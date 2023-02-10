import { NumberValidation } from '../validations/number-validation'

export default class GetPageInput {
  public limit: PageLimit
  public page: PageNumber

  constructor({ limit, page }: { limit: number; page: number }) {
    try {
      this.limit = new PageLimit(limit)
    } catch {
      this.limit = new PageLimit(100)
    }

    try {
      this.page = new PageNumber(page)
    } catch {
      this.page = new PageNumber(0)
    }
  }

  public getPage<T>(iterator: Iterable<T>): T[] {
    const items: T[] = []
    const start = this.limit.get() * this.page.get() - this.limit.get()
    let index = 0
    for (const item of iterator) {
      if (index < start) {
        index++
        continue
      }
      if (this.limit.get() === items.length) {
        break
      }
      items.push(item)
      index++
    }
    return items
  }
}

export class PageLimit extends NumberValidation {
  public static readonly min = 0
  public static readonly max = 100
  constructor(limit: number) {
    super(limit, { min: PageLimit.min, max: PageLimit.max })
  }
}

export class PageNumber extends NumberValidation {
  public static readonly min = 0
  public static readonly max = 9_000_000
  constructor(page: number) {
    super(page, { min: PageNumber.min, max: PageNumber.max })
  }
}

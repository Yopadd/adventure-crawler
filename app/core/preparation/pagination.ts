import { NumberValidation } from '#app/core/validations/number-validation'

export default class Pagination<T> {
  public readonly total: PaginationTotal
  public readonly next: string | null
  public readonly previous: string | null

  constructor(
    private readonly items: T[],
    metadata: { total: number; next: string | null; previous: string | null }
  ) {
    this.total = new PaginationTotal(metadata.total)
    this.next = metadata.next
    this.previous = metadata.previous
  }

  all(): readonly T[] {
    return this.items
  }
}

export class PaginationTotal extends NumberValidation {
  constructor(value: number) {
    super(value, { min: 0, safe: true })
  }
}

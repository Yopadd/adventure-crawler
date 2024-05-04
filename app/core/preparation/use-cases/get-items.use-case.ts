import Pagination from '#app/core/preparation/pagination'
import Item, { ItemPageLimit, ItemPageNumber, ItemPaginationInput } from '../item/item.js'

export interface GetItemsUseCaseInput {
  limit: number
  page: number
}

export interface ItemRepository {
  getAll(input: ItemPaginationInput): Promise<Pagination<Item>>
}

export default class GetItemsUseCase {
  constructor(private itemRepository: ItemRepository) {}

  public async apply(input: GetItemsUseCaseInput): Promise<Pagination<Item>> {
    const limit = new ItemPageLimit(input.limit)
    const page = new ItemPageNumber(input.page)
    return this.itemRepository.getAll({ page, limit })
  }
}

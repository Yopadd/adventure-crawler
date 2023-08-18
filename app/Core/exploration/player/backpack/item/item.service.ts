import NotFoundError from '../../../../errors/not-found.error'
import GetPageInput from '../../../../pages/get-page-input'
import { AddItemsUseCaseItemService } from '../../../../use-cases/add-items.use-case'
import { GetItemsUseCaseItemService } from '../../../../use-cases/get-items.use-case'
import { InitiateItemsUseCaseItemService } from '../../../../use-cases/initiate-items.use-case'
import Item, { ItemName } from './item'

export interface ItemServiceItemRepository {
  save(item: Item): Promise<Item>
  findByName(name: string): Promise<Item | undefined>
  findAll(input: GetPageInput): Promise<Item[]>
}

export class ItemService
  implements
    InitiateItemsUseCaseItemService,
    AddItemsUseCaseItemService,
    GetItemsUseCaseItemService
{
  constructor(private readonly itemRepository: ItemServiceItemRepository) {}

  public async getByName(name: ItemName): Promise<Item> {
    const item = await this.itemRepository.findByName(name.get())
    if (!item) {
      throw new NotFoundError(`Item "${name}"`)
    }
    return item
  }

  public create(name: string, description: string, tags: string[]): Promise<Item> {
    return this.itemRepository.save(new Item(name, description, tags))
  }

  public getAll(input: GetPageInput): Promise<Item[]> {
    return this.itemRepository.findAll(input)
  }
}

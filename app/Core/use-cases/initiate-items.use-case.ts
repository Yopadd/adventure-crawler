import { UseCase } from '../application'
import Item, { ItemName } from '../item/item'

export interface InitiateItemsUseCaseItemService {
  create(name: ItemName, description: string): Promise<Item>
}

export default class InitiateItemsUseCase implements UseCase {
  constructor(private readonly itemService: InitiateItemsUseCaseItemService) {}

  public async apply(): Promise<void> {
    await this.itemService.create(ItemName.COAT, 'Keep warm')
    await this.itemService.create(ItemName.POTION_FIRE_RESISTANCE, 'Protect to fire')
  }
}

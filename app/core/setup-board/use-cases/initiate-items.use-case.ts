import Item from '#app/core/exploration/player/backpack/item/item'

export interface InitiateItemsUseCaseItemService {
  create(name: string, description: string, tags: string[]): Promise<Item>
}

export default class InitiateItemsUseCase {
  constructor(private readonly itemService: InitiateItemsUseCaseItemService) {}

  public async apply(): Promise<void> {
    await this.itemService.create('Coat', 'Keep warm', ['armor', 'cold resistance'])
    await this.itemService.create('Fire resistance potion', 'Protect to fire', [
      'potion',
      'fire resistance',
    ])
  }
}

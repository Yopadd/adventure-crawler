import { UseCase } from '../../application'
import Item from 'App/Core/exploration/player/backpack/item/item'
import GetPageInput from '../../pages/get-page-input'

export interface GetItemsUseCaseInput {
  limit: number
  page: number
}

export interface GetItemsUseCaseItemService {
  getAll(input: GetPageInput): Promise<Item[]>
}

export default class GetItemsUseCase implements UseCase<GetItemsUseCaseInput, Promise<Item[]>> {
  constructor(private itemService: GetItemsUseCaseItemService) {}

  public async apply(input: GetItemsUseCaseInput): Promise<Item[]> {
    return this.itemService.getAll(new GetPageInput(input))
  }
}

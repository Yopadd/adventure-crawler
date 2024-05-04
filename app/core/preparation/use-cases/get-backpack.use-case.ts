import Backpack from '#app/core/preparation/backpack/backpack'

export interface GetBackpackInput {
  playerName: string
}

export interface BackpackRepository {
  get(playerName: string): Promise<Backpack>
}

export default class GetBackUseCase {
  constructor(private readonly backPackRepository: BackpackRepository) {}

  apply(input: GetBackpackInput): Promise<Backpack> {
    return this.backPackRepository.get(input.playerName)
  }
}

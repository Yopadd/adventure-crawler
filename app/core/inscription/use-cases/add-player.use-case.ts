import MaxPlayerErrors from '#app/core/inscription/errors/max-players-errors'
import env from '#start/env'
import PlayerSheet, { PlayerName, PlayerPassword } from '../player-sheet/player-sheet.js'

interface AddPlayerUseCaseInput {
  name: string
  password: string
}

export interface PlayerSheetRepository {
  create(playerSheet: PlayerSheet): Promise<void>
  count(): Promise<number>
}

export default class AddPlayerUseCase {
  constructor(private readonly playerSheetRepository: PlayerSheetRepository) {}

  public async apply(input: AddPlayerUseCaseInput) {
    const playerCount = await this.playerSheetRepository.count()
    if (playerCount >= env.get('MAX_PLAYERS')) {
      throw new MaxPlayerErrors()
    }
    const playerSheet = new PlayerSheet(
      new PlayerName(input.name),
      new PlayerPassword(input.password)
    )

    await this.playerSheetRepository.create(playerSheet)
  }
}

import PlayerSheet, { PlayerName, PlayerPassword } from '../player-sheet/player-sheet'

interface AddPlayerUseCaseInput {
  name: string
  password: string
}

export interface PlayerSheetRepository {
  create(playerSheet: PlayerSheet): void
}

export class AddPlayerUseCase {
  constructor(private readonly playerSheetRepository: PlayerSheetRepository) {}

  public async apply(input: AddPlayerUseCaseInput) {
    const playerSheet = new PlayerSheet(
      new PlayerName(input.name),
      new PlayerPassword(input.password)
    )

    return this.playerSheetRepository.create(playerSheet)
  }
}

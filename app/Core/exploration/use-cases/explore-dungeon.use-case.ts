import NotFoundError from 'App/Core/errors/not-found.error'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Player, { PlayerName } from 'App/Core/exploration/player/player'

export interface ExploreDungeonUseCaseInput {
  dungeonName: string
  playerName: string
}

export type ExploreDungeonUseCaseOutput = {
  score: number
  note: string
}

export interface DungeonRepository {
  getByName(id: string): Promise<Dungeon>
}

export interface PlayerRepository {
  getByName(id: string): Promise<Player | undefined>
}

export default class ExploreDungeonUseCase {
  constructor(
    private readonly dungeonRepository: DungeonRepository,
    private readonly playerRepository: PlayerRepository
  ) {}

  public async apply(input: ExploreDungeonUseCaseInput): Promise<ExploreDungeonUseCaseOutput> {
    const player = await this.playerRepository.getByName(input.playerName)

    if (!player) {
      throw new NotFoundError(`player ${input.playerName} not found`)
    }

    const dungeon = await this.dungeonRepository.getByName(input.dungeonName)
    const report = player.explore(dungeon)
    await player.write(report)

    return {
      score: report.score.get(),
      note: report.comment.get(),
    }
  }

  public static ExploreDungeonUseCaseInputValidator = {
    playerName: PlayerName.rules,
  }
}

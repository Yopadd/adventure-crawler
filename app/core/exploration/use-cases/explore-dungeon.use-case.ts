import Dungeon from '#app/core/exploration/dungeon/dungeon'
import Player from '#app/core/exploration/player/player'
import Logbook from '#app/core/exploration/player/logbook/logbook'

export interface ExploreDungeonUseCaseInput {
  dungeonName: string
  playerName: string
}

export type ExploreDungeonUseCaseOutput = {
  score: number
  note: string
}

export interface DungeonRepository {
  getByName(name: string): Promise<Dungeon>
}

export interface PlayerRepository {
  getByName(name: string): Promise<Player>
}

export interface LogbookRepository {
  save(playerName: string, logbook: Logbook): Promise<void>
}

export default class ExploreDungeonUseCase {
  constructor(
    private readonly dungeonRepository: DungeonRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly logbookRepository: LogbookRepository
  ) {}

  public async apply(input: ExploreDungeonUseCaseInput): Promise<ExploreDungeonUseCaseOutput> {
    const player = await this.playerRepository.getByName(input.playerName)
    const dungeon = await this.dungeonRepository.getByName(input.dungeonName)
    const report = player.explore(dungeon)
    player.write(report)
    await this.logbookRepository.save(input.playerName, player.logbook)

    return {
      score: report.score.get(),
      note: report.comment.get(),
    }
  }
}

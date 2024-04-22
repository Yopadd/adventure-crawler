import Dungeon from '#app/core/exploration/dungeon/dungeon'
import Player from '#app/core/exploration/player/player'
import Report from '#app/core/exploration/player/report/report'
import { UnitOfWork } from '#app/core/unit-of-work/unit-of-work'

export interface ExploreDungeonUseCaseInput {
  dungeonName: string
  playerName: string
}

export type ExploreDungeonUseCaseOutput = {
  score: number
  report: string
}

export interface DungeonRepository {
  getByName(name: string, unitOfWork: unknown): Promise<Dungeon>
}

export interface PlayerRepository {
  getByName(name: string, unitOfWork: unknown): Promise<Player>
  save(player: Player, unitOfWork: unknown): Promise<void>
}

export interface ReportRepository {
  save(report: Report, unitOfWork: unknown): Promise<void>
}

export default class ExploreDungeonUseCase {
  constructor(
    private readonly dungeonRepository: DungeonRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly reportRepository: ReportRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  public async apply(input: ExploreDungeonUseCaseInput): Promise<ExploreDungeonUseCaseOutput> {
    return this.unitOfWork.begin(async (unitOfWork) => {
      const player = await this.playerRepository.getByName(input.playerName, unitOfWork)
      const dungeon = await this.dungeonRepository.getByName(input.dungeonName, unitOfWork)
      const report = player.explore(dungeon)
      await this.reportRepository.save(report, unitOfWork)
      await this.playerRepository.save(player, unitOfWork)

      return {
        score: report.score.get(),
        report: report.comment.get(),
      }
    })
  }
}

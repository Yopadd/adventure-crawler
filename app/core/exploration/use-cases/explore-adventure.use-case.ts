import Adventure from '#app/core/exploration/adventure/adventure'
import Player from '#app/core/exploration/player/player'
import Report from '#app/core/exploration/player/report/report'
import { UnitOfWork } from '#app/core/unit-of-work/unit-of-work'

export interface ExploreAdventureUseCaseInput {
  adventureName: string
  playerName: string
}

export type ExploreAdventureUseCaseOutput = {
  score: number
  report: string
}

export interface AdventureRepository {
  getByName(name: string, unitOfWork: unknown): Promise<Adventure>
}

export interface PlayerRepository {
  getByName(name: string, unitOfWork: unknown): Promise<Player>
  save(player: Player, unitOfWork: unknown): Promise<void>
}

export interface ReportRepository {
  save(report: Report, unitOfWork: unknown): Promise<void>
}

export default class ExploreAdventureUseCase {
  constructor(
    private readonly adventureRepository: AdventureRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly reportRepository: ReportRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  public async apply(input: ExploreAdventureUseCaseInput): Promise<ExploreAdventureUseCaseOutput> {
    return this.unitOfWork.begin(async (unitOfWork) => {
      const player = await this.playerRepository.getByName(input.playerName, unitOfWork)
      const adventure = await this.adventureRepository.getByName(input.adventureName, unitOfWork)
      const report = player.explore(adventure)
      await this.reportRepository.save(report, unitOfWork)
      await this.playerRepository.save(player, unitOfWork)

      return {
        score: report.score.get(),
        report: report.comment.get(),
      }
    })
  }
}

import Adventure from '#app/core/exploration/adventure/adventure'
import Player from '#app/core/exploration/player/player'
import Report from '#app/core/exploration/player/report/report'
import { UnitOfWork } from '#app/core/unit-of-work/unit-of-work'

export interface VisitAdventureUseCaseInput {
  adventureName: string
  playerName: string
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

export default class VisitAdventureUseCase {
  constructor(
    private readonly adventureRepository: AdventureRepository,
    private readonly playerRepository: PlayerRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  public async apply(input: VisitAdventureUseCaseInput) {
    return this.unitOfWork.begin(async (unitOfWork) => {
      const player = await this.playerRepository.getByName(input.playerName, unitOfWork)
      const adventure = await this.adventureRepository.getByName(input.adventureName, unitOfWork)
      player.visit(adventure)
      await this.playerRepository.save(player, unitOfWork)
    })
  }
}

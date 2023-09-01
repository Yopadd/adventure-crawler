import { UseCase } from '../../application'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import Report from 'App/Core/exploration/player/logbook/report/report'
import Player from 'App/Core/exploration/player/player'

export interface ExploreDungeonUseCaseInput {
  dungeonId: string
  playerName: string
}

export interface ExploreDungeonUseCaseDungeonService {
  get(id: string): Promise<Dungeon>
}

export interface ExploreDungeonUseCasePlayerService {
  getByName(id: string): Promise<Player>
  explore(player: Player, dungeon: Dungeon): Promise<Report>
}

export default class ExploreDungeonUseCase
  implements UseCase<ExploreDungeonUseCaseInput, Promise<Report>>
{
  constructor(
    private readonly dungeonService: ExploreDungeonUseCaseDungeonService,
    private readonly playerService: ExploreDungeonUseCasePlayerService
  ) {}

  public async apply(input: ExploreDungeonUseCaseInput): Promise<Report> {
    const player = await this.playerService.getByName(input.playerName)
    const dungeon = await this.dungeonService.get(input.dungeonId)
    return this.playerService.explore(player, dungeon)
  }
}

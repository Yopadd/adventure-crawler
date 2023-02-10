import { UseCase } from '../application'
import Dungeon from '../dungeon/dungeon'
import ExploreDungeonResult from '../explore-dungeon-result/explore-dungeon-result'
import Player from '../player/player'

export interface ExploreDungeonUseCaseInput {
  dungeonId: string
  playerName: string
}

export interface ExploreDungeonUseCaseDungeonService {
  get(id: string): Promise<Dungeon>
  explore(player: Player, dungeon: Dungeon): Promise<ExploreDungeonResult>
}

export interface ExploreDungeonUseCasePlayerService {
  getByName(id: string): Promise<Player>
}

export default class ExploreDungeonUseCase
  implements UseCase<ExploreDungeonUseCaseInput, Promise<ExploreDungeonResult>>
{
  constructor(
    private readonly dungeonService: ExploreDungeonUseCaseDungeonService,
    private readonly playerService: ExploreDungeonUseCasePlayerService
  ) {}

  public async apply(input: ExploreDungeonUseCaseInput): Promise<ExploreDungeonResult> {
    const player = await this.playerService.getByName(input.playerName)
    const dungeon = await this.dungeonService.get(input.dungeonId)
    return this.dungeonService.explore(player, dungeon)
  }
}

import NotFoundError from '../errors/not-found.error'
import ExploreDungeonResult from '../explore-dungeon-result/explore-dungeon-result'
import Inventory from '../inventory/inventory'
import GetPageInput from '../pages/get-page-input'
import { AddItemsUseCasePlayerService } from '../use-cases/add-items.use-case'
import { AddPlayerUseCasePlayerService } from '../use-cases/add-player.use-case'
import { GetPlayerUseCasePlayerService } from '../use-cases/get-player.use-case'
import { GetTableScoreUseCasePlayerService } from '../use-cases/get-table-score'
import Player, { PlayerScore } from './player'
import PlayerAlreadyExistError from './player-already-exist.error'

export interface PlayerServicePlayerRepository {
  findByName(name: string): Promise<Player | undefined>
  findAll(input: GetPageInput): Promise<Player[]>
  countAll(): Promise<number>
  save(player: Player, password: string): Promise<Player>
}

export interface InventoryServiceInventoryRepository {
  save(player: Player): Promise<Inventory>
}

export interface PlayerServiceExploreDungeonResultRepository {
  findByPlayerName(name: string): Promise<ExploreDungeonResult[]>
}

export default class PlayerService
  implements
    AddPlayerUseCasePlayerService,
    GetPlayerUseCasePlayerService,
    GetTableScoreUseCasePlayerService,
    AddItemsUseCasePlayerService
{
  constructor(
    private readonly playerRepository: PlayerServicePlayerRepository,
    private readonly inventoryRepository: InventoryServiceInventoryRepository,
    private readonly exploreResultRepository: PlayerServiceExploreDungeonResultRepository
  ) {}

  public async getByName(name: string): Promise<Player> {
    const player = await this.playerRepository.findByName(name)
    if (!player) {
      throw new NotFoundError(`Player "${name}"`)
    }
    player.score = await this.getScore(name)
    return player
  }

  public getAll(input: GetPageInput): Promise<Player[]> {
    return this.playerRepository.findAll(input)
  }

  private async getScore(name: string): Promise<PlayerScore> {
    const results = await this.exploreResultRepository.findByPlayerName(name)
    return new PlayerScore(results.reduce((acc, r) => r.score.get() + acc, 0))
  }

  public countAll(): Promise<number> {
    return this.playerRepository.countAll()
  }

  public async create(name: string, password: string): Promise<Player> {
    let player = await this.playerRepository.findByName(name)
    if (player) {
      throw new PlayerAlreadyExistError(player)
    }
    player = new Player(name, 0, new Inventory())
    await this.playerRepository.save(player, password)
    await this.inventoryRepository.save(player)
    return player
  }
}

import NotFoundError from '../../errors/not-found.error'
import Report, { Note } from 'App/Core/exploration/player/logbook/report/report'
import Backpack from 'App/Core/exploration/player/backpack/backpack'
import GetPageInput from '../../pages/get-page-input'
import { AddItemsUseCasePlayerService } from '../../preparation/use-cases/add-items.use-case'
import { AddPlayerUseCasePlayerService } from '../../use-cases/add-player.use-case'
import { GetPlayerUseCasePlayerService } from '../../use-cases/get-player.use-case'
import { GetScoreBoardUseCasePlayerService } from '../../use-cases/get-table-score'
import Player, { PlayerName, PlayerScore } from './player'
import PlayerAlreadyExistError from './player-already-exist.error'
import Dungeon from 'App/Core/exploration/dungeon/dungeon'
import { ExploreDungeonUseCasePlayerService } from 'App/Core/exploration/use-cases/explore-dungeon.use-case'
import Logbook from 'App/Core/exploration/player/logbook/logbook'

export interface PlayerServicePlayerRepository {
  findByName(name: string): Promise<Player | undefined>
  findAll(input: GetPageInput): Promise<Player[]>
  countAll(): Promise<number>
  save(player: Player, password: string): Promise<Player>
}

export interface InventoryServiceInventoryRepository {
  save(player: Player): Promise<Backpack>
}

export interface PlayerServiceReportRepository {
  findByPlayerName(name: string): Promise<Report[]>
  save(explorationResult: Report): Promise<Report>
}

export default class PlayerService
  implements
    AddPlayerUseCasePlayerService,
    GetPlayerUseCasePlayerService,
    GetScoreBoardUseCasePlayerService,
    AddItemsUseCasePlayerService,
    ExploreDungeonUseCasePlayerService
{
  constructor(
    private readonly playerRepository: PlayerServicePlayerRepository,
    private readonly inventoryRepository: InventoryServiceInventoryRepository,
    private readonly reportRepository: PlayerServiceReportRepository
  ) {}

  public async getByName(name: string): Promise<Player> {
    const player = await this.playerRepository.findByName(name)
    if (!player) {
      throw new NotFoundError(`Player "${name}"`)
    }
    return player
  }

  public getAll(input: GetPageInput): Promise<Player[]> {
    return this.playerRepository.findAll(input)
  }

  public async create(name: string, password: string): Promise<Player> {
    let player = await this.playerRepository.findByName(name)
    if (player) {
      throw new PlayerAlreadyExistError(player)
    }
    player = new Player(new PlayerName(name), new Backpack(), new Logbook())
    await this.playerRepository.save(player, password)
    await this.inventoryRepository.save(player)
    return player
  }

  public explore(player: Player, dungeon: Dungeon): Promise<Report> {
    if (!dungeon.events.length) {
      const report = new Report(dungeon, PlayerScore.Zero, new Note(''))
      return this.reportRepository.save(report)
    }

    const score = dungeon.events.reduce(
      (acc, event) => event.resolve(player).add(acc),
      PlayerScore.Zero
    )
    const note = new Note(dungeon.events.map((event) => event.description).join(', '))
    const report = new Report(dungeon, score, note)
    return this.reportRepository.save(report)
  }
}

import DungeonRepository from 'App/Core/exploration/dungeon/dungeon.repository'
import DungeonService from 'App/Core/exploration/dungeon/dungeon.service'
import BackpackRepository from 'App/Core/exploration/player/backpack/backpack.repository'
import BackpackService from 'App/Core/exploration/player/backpack/backpack.service'
import ItemRepository from 'App/Core/exploration/player/backpack/item/item.repository'
import { ItemService } from 'App/Core/exploration/player/backpack/item/item.service'
import ReportRepository from 'App/Core/exploration/player/logbook/report/report.repository'
import PlayerRepository from 'App/Core/exploration/player/player.repository'
import PlayerService from 'App/Core/exploration/player/player.service'
import ScoreBoardService from 'App/Core/scoring/score-board/score-board.service'
import ExploreDungeonUseCase from './exploration/use-cases/explore-dungeon.use-case'
import { AddItemsUseCase } from './preparation/use-cases/add-items.use-case'
import GetDungeonsUseCase from './preparation/use-cases/get-dungeons.use-case'
import GetItemsUseCase from './preparation/use-cases/get-items.use-case'
import { AddPlayerUseCase } from './use-cases/add-player.use-case'
import { GetPlayerUseCase } from './use-cases/get-player.use-case'
import GetScoreBoardUseCase from './use-cases/get-table-score'
import InitiateDungeonsUseCase from './use-cases/initiate-dungeons.use-case'
import InitiateItemsUseCase from './use-cases/initiate-items.use-case'

export interface ApplicationOptions {
  countOfDungeon: number
}

export interface ApplicationInstaller {
  initiateDungeons: InitiateDungeonsUseCase
  initiateItems: InitiateItemsUseCase
}

export interface Application {
  addPlayer: AddPlayerUseCase
  addItems: AddItemsUseCase
  getItems: GetItemsUseCase
  getPlayer: GetPlayerUseCase
  getDungeons: GetDungeonsUseCase
  getScoreBoard: GetScoreBoardUseCase
  exploreDungeon: ExploreDungeonUseCase
}

const repositories = {
  dungeonRepository: new DungeonRepository(),
  playerRepository: new PlayerRepository(),
  backpackRepository: new BackpackRepository(),
  itemRepository: new ItemRepository(),
  exploreDungeonResult: new ReportRepository(),
}

const services = {
  dungeonService: new DungeonService(repositories.dungeonRepository),
  playerService: new PlayerService(
    repositories.playerRepository,
    repositories.backpackRepository,
    repositories.exploreDungeonResult
  ),
  backpackService: new BackpackService(repositories.backpackRepository),
  itemService: new ItemService(repositories.itemRepository),
  scoreBoardService: new ScoreBoardService(),
}

const installer: ApplicationInstaller = {
  initiateDungeons: new InitiateDungeonsUseCase(services.dungeonService),
  initiateItems: new InitiateItemsUseCase(services.itemService),
}

export const app: Application = {
  addPlayer: new AddPlayerUseCase(services.playerService),
  addItems: new AddItemsUseCase(
    services.playerService,
    services.itemService,
    services.backpackService
  ),
  getItems: new GetItemsUseCase(services.itemService),
  getPlayer: new GetPlayerUseCase(services.playerService),
  getDungeons: new GetDungeonsUseCase(services.dungeonService),
  getScoreBoard: new GetScoreBoardUseCase(services.playerService, services.scoreBoardService),
  exploreDungeon: new ExploreDungeonUseCase(services.dungeonService, services.playerService),
}

export async function install(options: ApplicationOptions): Promise<Application> {
  await installer.initiateDungeons.apply(options)
  await installer.initiateItems.apply()

  return app
}

export async function uninstall() {
  repositories.dungeonRepository.flush()
  repositories.exploreDungeonResult.flush()
  return Promise.all([repositories.itemRepository.flush(), repositories.playerRepository.flush()])
}

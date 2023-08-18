import DungeonRepository from 'App/Core/exploration/dungeon/dungeon.repository'
import DungeonService from 'App/Core/exploration/dungeon/dungeon.service'
import ReportRepository from 'App/Core/exploration/player/logbook/report/report.repository'
import BackpackRepository from 'App/Core/exploration/player/backpack/backpack.repository'
import BackpackService from 'App/Core/exploration/player/backpack/backpack.service'
import ItemRepository from 'App/Core/exploration/player/backpack/item/item.repository'
import { ItemService } from 'App/Core/exploration/player/backpack/item/item.service'
import PlayerRepository from 'App/Core/exploration/player/player.repository'
import PlayerService from 'App/Core/exploration/player/player.service'
import ScoreBoardService from 'App/Core/scoring/score-board/score-board.service'
import { AddItemsUseCase } from './use-cases/add-items.use-case'
import { AddPlayerUseCase } from './use-cases/add-player.use-case'
import ExploreDungeonUseCase from './use-cases/explore-dungeon.use-case'
import GetDungeonsUseCase from './use-cases/get-dungeons.use-case'
import GetItemsUseCase from './use-cases/get-items.use-case'
import { GetPlayerUseCase } from './use-cases/get-player.use-case'
import GetScoreBoardUseCase from './use-cases/get-table-score'
import InitiateDungeonsUseCase from './use-cases/initiate-dungeons.use-case'
import InitiateItemsUseCase from './use-cases/initiate-items.use-case'

export interface UseCase<Input = undefined, Output = Promise<void>> {
  apply(input: Input): Output
}

export interface ApplicationOptions {
  countOfDungeon: number
}

export interface ApplicationInit {
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
  uninstall: () => void
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

const init: ApplicationInit = {
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
  async uninstall() {
    repositories.dungeonRepository.flush()
    repositories.exploreDungeonResult.flush()
    return Promise.all([repositories.itemRepository.flush(), repositories.playerRepository.flush()])
  },
}
export async function install(options: ApplicationOptions): Promise<Application> {
  await init.initiateDungeons.apply(options)
  await init.initiateItems.apply()

  return app
}

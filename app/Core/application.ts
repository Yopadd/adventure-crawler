import DungeonRepository from 'App/Core/exploration/dungeon/dungeon.repository'
import BackpackRepository from 'App/Core/exploration/player/backpack/backpack.repository'
import ItemRepository from 'App/Core/exploration/player/backpack/item/item.repository'
import LogbookRepositoryDatabase from 'App/Core/exploration/player/logbook/logbook.repository'
import PlayerRepository from 'App/Core/exploration/player/player.repository'
import DungeonModel from 'App/Models/Dungeon.model'
import ItemModel from 'App/Models/Item.model'
import PlayerModel from 'App/Models/Player.model'
import ReportModel from 'App/Models/Report.model'
import ExploreDungeonUseCase from './exploration/use-cases/explore-dungeon.use-case'
import PlayerSheetRepositoryDatabase from './inscription/player-sheet/player-sheet.repository'
import { AddPlayerUseCase } from './inscription/use-cases/add-player.use-case'
import GetItemsUseCase from './preparation/use-cases/get-items.use-case'
import DungeonRepositoryDatabase from './setup-board/dungeon/dungeon.repository'
import InitiateDungeonsUseCase from './setup-board/use-cases/initiate-dungeons.use-case'

export interface ApplicationOptions {
  dungeonCount: number
}

export interface ApplicationInstaller {
  initiateDungeons: InitiateDungeonsUseCase
  // initiateItems: InitiateItemsUseCase
}

export interface Application {
  addPlayer: AddPlayerUseCase
  // addItems: AddItemsUseCase
  getItems: GetItemsUseCase
  // getPlayer: GetPlayerUseCase
  // getDungeons: GetDungeonsUseCase
  // getScoreBoard: GetScoreBoardUseCase
  exploreDungeon: ExploreDungeonUseCase
}

const repositories = {
  dungeonRepository: new DungeonRepository(),
  playerRepository: new PlayerRepository(),
  backpackRepository: new BackpackRepository(),
  itemRepository: new ItemRepository(),
  reportRepository: new LogbookRepositoryDatabase(),
  playerSheetRepository: new PlayerSheetRepositoryDatabase(),
}

const installer: ApplicationInstaller = {
  initiateDungeons: new InitiateDungeonsUseCase(new DungeonRepositoryDatabase()),
  // initiateItems: new InitiateItemsUseCase(services.itemService),
}

export const app: Application = {
  addPlayer: new AddPlayerUseCase(repositories.playerSheetRepository),
  getItems: new GetItemsUseCase(),
  exploreDungeon: new ExploreDungeonUseCase(
    repositories.dungeonRepository,
    repositories.playerRepository
  ),
}

export async function install(options: ApplicationOptions): Promise<Application> {
  await installer.initiateDungeons.apply(options)
  // await installer.initiateItems.apply()

  return app
}

export async function uninstall() {
  DungeonModel.truncate(true)
  ReportModel.truncate(true)
  PlayerModel.truncate(true)
  ItemModel.truncate(true)
}

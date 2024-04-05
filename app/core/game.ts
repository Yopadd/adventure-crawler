import PlayerRepository from '#app/core/exploration/player/player.repository'
import DungeonModel from '#models/dungeon.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'
import ReportModel from '#models/report.model'
import { default as ExplorationDungeonRepositoryDatabase } from '#app/core/exploration/dungeon/dungeon.repository'
import ExploreDungeonUseCase from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import PlayerSheetRepositoryDatabase from '#app/core/inscription/player-sheet/player-sheet.repository'
import AddPlayerUseCase from '#app/core/inscription/use-cases/add-player.use-case'
import ItemRepositoryDatabase from '#app/core/preparation/item/item.repository'
import GetItemsUseCase from '#app/core/preparation/use-cases/get-items.use-case'
import { default as SetupBoardDungeonRepositoryDatabase } from '#app/core/setup-board/dungeon/dungeon.repository'
import InitiateDungeonsUseCase from '#app/core/setup-board/use-cases/initiate-dungeons.use-case'
import LogbookRepositoryDatabase from '#app/core/exploration/player/logbook/logbook.repository'

export interface ApplicationOptions {
  dungeonCount: number
}

export interface ApplicationInstaller {
  initiateDungeons: InitiateDungeonsUseCase
  // initiateItems: InitiateItemsUseCase
}

export interface Game {
  addPlayer: AddPlayerUseCase
  // addItems: AddItemsUseCase
  getItems: GetItemsUseCase
  // getPlayer: GetPlayerUseCase
  // getDungeons: GetDungeonsUseCase
  // getScoreBoard: GetScoreBoardUseCase
  exploreDungeon: ExploreDungeonUseCase
}

const repositories = {
  setupBoard: {
    dungeonRepository: new SetupBoardDungeonRepositoryDatabase(),
  },
  exploration: {
    dungeonRepository: new ExplorationDungeonRepositoryDatabase(),
    logbookRepository: new LogbookRepositoryDatabase(),
    playerRepository: new PlayerRepository(),
  },
  itemRepository: new ItemRepositoryDatabase(),
  playerSheetRepository: new PlayerSheetRepositoryDatabase(),
}

const installer: ApplicationInstaller = {
  initiateDungeons: new InitiateDungeonsUseCase(repositories.setupBoard.dungeonRepository),
  // initiateItems: new InitiateItemsUseCase(services.itemService),
}

export const app: Game = {
  addPlayer: new AddPlayerUseCase(repositories.playerSheetRepository),
  getItems: new GetItemsUseCase(repositories.itemRepository),
  exploreDungeon: new ExploreDungeonUseCase(
    repositories.exploration.dungeonRepository,
    repositories.exploration.playerRepository,
    repositories.exploration.logbookRepository
  ),
}

export async function install(options: ApplicationOptions): Promise<Game> {
  await installer.initiateDungeons.apply(options)
  // await installer.initiateItems.apply()

  return app
}

export function uninstall() {
  return Promise.all([
    DungeonModel.truncate(true),
    ReportModel.truncate(true),
    PlayerModel.truncate(true),
    ItemModel.truncate(true),
  ])
}

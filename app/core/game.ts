import { default as ExplorationDungeonRepositoryDatabase } from '#app/core/exploration/dungeon/dungeon.repository'
import { default as ExplorationPlayerRepository } from '#app/core/exploration/player/player.repository'
import ReportRepositoryDatabase from '#app/core/exploration/player/report/report.repository'
import ExploreDungeonUseCase from '#app/core/exploration/use-cases/explore-dungeon.use-case'
import PlayerSheetRepositoryDatabase from '#app/core/inscription/player-sheet/player-sheet.repository'
import AddPlayerUseCase from '#app/core/inscription/use-cases/add-player.use-case'
import { default as InstallDungeonRepositoryDatabase } from '#app/core/install/dungeon/dungeon.repository'
import { default as InstallItemRepositoryDatabase } from '#app/core/install/item/item.repository'
import InitiateDungeonsUseCase from '#app/core/install/use-cases/initiate-dungeons.use-case'
import InitiateItemsUseCase from '#app/core/install/use-cases/initiate-items.use-case'
import { BackPackRepositoryDatabase } from '#app/core/preparation/backpack/backpack.repository'
import { default as PreparationDungeonRepositoryDatabase } from '#app/core/preparation/dungeon/dungeon.repository'
import { default as PreparationItemRepositoryDatabase } from '#app/core/preparation/item/item.repository'
import AddItemsUseCase from '#app/core/preparation/use-cases/add-items.use-case'
import GetBackUseCase from '#app/core/preparation/use-cases/get-backpack.use-case'
import GetDungeonsUseCase from '#app/core/preparation/use-cases/get-dungeons.use-case'
import GetItemsUseCase from '#app/core/preparation/use-cases/get-items.use-case'
import { default as ScoreBoardPlayerRepositoryDatabase } from '#app/core/score-board/player/player.repository'
import GetScoreboardUseCase from '#app/core/score-board/use-case/get-score-board'
import DungeonModel from '#models/dungeon.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'
import ReportModel from '#models/report.model'

const repositories = {
  install: {
    dungeonRepository: new InstallDungeonRepositoryDatabase(),
    itemRepository: new InstallItemRepositoryDatabase(),
  },
  exploration: {
    dungeonRepository: new ExplorationDungeonRepositoryDatabase(),
    reportRepository: new ReportRepositoryDatabase(),
    playerRepository: new ExplorationPlayerRepository(),
  },
  preparation: {
    dungeonRepository: new PreparationDungeonRepositoryDatabase(),
    backpackRepository: new BackPackRepositoryDatabase(),
    itemRepository: new PreparationItemRepositoryDatabase(),
  },
  inscription: {
    playerSheetRepository: new PlayerSheetRepositoryDatabase(),
  },
  scoreBoard: {
    playerRepository: new ScoreBoardPlayerRepositoryDatabase(),
  },
}

export interface ApplicationOptions {}

export interface GameInstaller {
  initiateDungeons: InitiateDungeonsUseCase
  initiateItems: InitiateItemsUseCase
}

export interface Game {
  install: (options?: ApplicationOptions) => Promise<void>
  uninstall: () => Promise<void>
  addPlayer: AddPlayerUseCase
  addItems: AddItemsUseCase
  getItems: GetItemsUseCase
  getBackpack: GetBackUseCase
  getDungeons: GetDungeonsUseCase
  getScoreBoard: GetScoreboardUseCase
  exploreDungeon: ExploreDungeonUseCase
}

const installer: GameInstaller = {
  initiateDungeons: new InitiateDungeonsUseCase(repositories.install.dungeonRepository),
  initiateItems: new InitiateItemsUseCase(repositories.install.itemRepository),
}

async function install(_: ApplicationOptions = {}): Promise<void> {
  await installer.initiateDungeons.apply()
  await installer.initiateItems.apply()
}

async function uninstall(): Promise<void> {
  await Promise.all([
    DungeonModel.truncate(true),
    ReportModel.truncate(true),
    PlayerModel.truncate(true),
    ItemModel.truncate(true),
  ])
}

export const game: Game = {
  install,
  uninstall,
  addPlayer: new AddPlayerUseCase(repositories.inscription.playerSheetRepository),
  exploreDungeon: new ExploreDungeonUseCase(
    repositories.exploration.dungeonRepository,
    repositories.exploration.playerRepository,
    repositories.exploration.reportRepository
  ),
  getScoreBoard: new GetScoreboardUseCase(repositories.scoreBoard.playerRepository),
  addItems: new AddItemsUseCase(
    repositories.preparation.itemRepository,
    repositories.preparation.backpackRepository
  ),
  getItems: new GetItemsUseCase(repositories.preparation.itemRepository),
  getDungeons: new GetDungeonsUseCase(repositories.preparation.dungeonRepository),
  getBackpack: new GetBackUseCase(repositories.preparation.backpackRepository),
}

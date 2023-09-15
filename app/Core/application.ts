import DungeonRepository from 'App/Core/exploration/dungeon/dungeon.repository'
import BackpackRepository from 'App/Core/exploration/player/backpack/backpack.repository'
import ItemRepository from 'App/Core/exploration/player/backpack/item/item.repository'
import LogbookRepositoryDatabase from 'App/Core/exploration/player/logbook/logbook.repository'
import PlayerRepository from 'App/Core/exploration/player/player.repository'
import ExploreDungeonUseCase from './exploration/use-cases/explore-dungeon.use-case'
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
  // addPlayer: AddPlayerUseCase
  // addItems: AddItemsUseCase
  // getItems: GetItemsUseCase
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
}

const installer: ApplicationInstaller = {
  initiateDungeons: new InitiateDungeonsUseCase(new DungeonRepositoryDatabase()),
  // initiateItems: new InitiateItemsUseCase(services.itemService),
}

export const app: Application = {
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
  repositories.dungeonRepository.flush()
  repositories.reportRepository.flush()
  return Promise.all([repositories.itemRepository.flush(), repositories.playerRepository.flush()])
}

import DungeonRepository from './dungeon/dungeon.repository'
import DungeonService from './dungeon/dungeon.service'
import ExploreDungeonResultRepository from './explore-dungeon-result/explore-dungeon-result.repository'
import InventoryRepository from './inventory/inventory.repository'
import InventoryService from './inventory/inventory.service'
import ItemRepository from './item/item.repository'
import { ItemService } from './item/item.service'
import PlayerRepository from './player/player.repository'
import PlayerService from './player/player.service'
import TableScoreService from './table-score/table-score.service'
import { AddItemsUseCase } from './use-cases/add-items.use-case'
import { AddPlayerUseCase } from './use-cases/add-player.use-case'
import ExploreDungeonUseCase from './use-cases/explore-dungeon.use-case'
import GetDungeonsUseCase from './use-cases/get-dungeons.use-case'
import GetItemsUseCase from './use-cases/get-items.use-case'
import { GetPlayerUseCase } from './use-cases/get-player.use-case'
import GetTableScoreUseCase from './use-cases/get-table-score'
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
  getTableScore: GetTableScoreUseCase
  exploreDungeon: ExploreDungeonUseCase
  flush: () => void
}

const repositories = {
  dungeonRepository: new DungeonRepository(),
  playerRepository: new PlayerRepository(),
  inventoryRepository: new InventoryRepository(),
  itemRepository: new ItemRepository(),
  exploreDungeonResult: new ExploreDungeonResultRepository(),
}

const services = {
  dungeonService: new DungeonService(
    repositories.dungeonRepository,
    repositories.exploreDungeonResult
  ),
  playerService: new PlayerService(
    repositories.playerRepository,
    repositories.inventoryRepository,
    repositories.exploreDungeonResult
  ),
  inventoryService: new InventoryService(repositories.inventoryRepository),
  itemService: new ItemService(repositories.itemRepository),
  tableScoreService: new TableScoreService(),
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
    services.inventoryService
  ),
  getItems: new GetItemsUseCase(services.itemService),
  getPlayer: new GetPlayerUseCase(services.playerService),
  getDungeons: new GetDungeonsUseCase(services.dungeonService),
  getTableScore: new GetTableScoreUseCase(services.playerService, services.tableScoreService),
  exploreDungeon: new ExploreDungeonUseCase(services.dungeonService, services.playerService),
  flush() {
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

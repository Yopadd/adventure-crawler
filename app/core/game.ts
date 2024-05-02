import { default as ExplorationAdventureRepositoryDatabase } from '#app/core/exploration/adventure/adventure.repository'
import { default as ExplorationPlayerRepository } from '#app/core/exploration/player/player.repository'
import ReportRepositoryDatabase from '#app/core/exploration/player/report/report.repository'
import ExploreAdventureUseCase from '#app/core/exploration/use-cases/explore-adventure.use-case'
import PlayerSheetRepositoryDatabase from '#app/core/inscription/player-sheet/player-sheet.repository'
import AddPlayerUseCase from '#app/core/inscription/use-cases/add-player.use-case'
import { default as InstallAventureRepositoryDatabase } from '#app/core/install/adventure/adventure.repository'
import { default as InstallItemRepositoryDatabase } from '#app/core/install/item/item.repository'
import InstallAdventuresUseCase from '#app/core/install/use-cases/install-adventures.use-case'
import InstallItemsUseCase from '#app/core/install/use-cases/install-items.use-case'
import { default as PreparationAdventureRepositoryDatabase } from '#app/core/preparation/adventure/adventure.repository'
import { BackPackRepositoryDatabase } from '#app/core/preparation/backpack/backpack.repository'
import { default as PreparationItemRepositoryDatabase } from '#app/core/preparation/item/item.repository'
import AddItemsUseCase from '#app/core/preparation/use-cases/add-items.use-case'
import GetAdventuresUseCase from '#app/core/preparation/use-cases/get-adventures.use-case'
import GetBackUseCase from '#app/core/preparation/use-cases/get-backpack.use-case'
import GetItemsUseCase from '#app/core/preparation/use-cases/get-items.use-case'
import { default as ScoreBoardPlayerRepositoryDatabase } from '#app/core/score-board/player/player.repository'
import GetScoreboardUseCase from '#app/core/score-board/use-case/get-score-board'
import { UnitOfWorkLucid } from '#app/core/unit-of-work/unit-of-work'
import AdventureModel from '#models/adventure.model'
import BackpackModel from '#models/backpack.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'
import ReportModel from '#models/report.model'

export const repositories = {
  install: {
    adventureRepository: new InstallAventureRepositoryDatabase(),
    itemRepository: new InstallItemRepositoryDatabase(),
  },
  exploration: {
    adventureRepository: new ExplorationAdventureRepositoryDatabase(),
    reportRepository: new ReportRepositoryDatabase(),
    playerRepository: new ExplorationPlayerRepository(),
  },
  preparation: {
    adventureRepository: new PreparationAdventureRepositoryDatabase(),
    backpackRepository: new BackPackRepositoryDatabase(),
    itemRepository: new PreparationItemRepositoryDatabase(),
  },
  inscription: {
    playerSheetRepository: new PlayerSheetRepositoryDatabase(),
  },
  scoreBoard: {
    playerRepository: new ScoreBoardPlayerRepositoryDatabase(),
  },
  unitOfWork: new UnitOfWorkLucid(),
}

export interface ApplicationOptions {}

class Game {
  constructor() {}

  async install(_: ApplicationOptions = {}): Promise<void> {
    await new InstallAdventuresUseCase(repositories.install.adventureRepository).apply()
    await new InstallItemsUseCase(repositories.install.itemRepository).apply()
  }

  async uninstall(): Promise<void> {
    await Promise.all([
      AdventureModel.truncate(true),
      ReportModel.truncate(true),
      PlayerModel.truncate(true),
      ItemModel.truncate(true),
      BackpackModel.truncate(true),
    ])
  }

  addPlayer(input: Parameters<AddPlayerUseCase['apply']>[0]) {
    return new AddPlayerUseCase(repositories.inscription.playerSheetRepository).apply(input)
  }

  exploreAdventure(input: Parameters<ExploreAdventureUseCase['apply']>[0]) {
    return new ExploreAdventureUseCase(
      repositories.exploration.adventureRepository,
      repositories.exploration.playerRepository,
      repositories.exploration.reportRepository,
      repositories.unitOfWork
    ).apply(input)
  }

  getScoreBoard(input: Parameters<GetScoreboardUseCase['apply']>[0]) {
    return new GetScoreboardUseCase(repositories.scoreBoard.playerRepository).apply(input)
  }

  addItems(input: Parameters<AddItemsUseCase['apply']>[0]) {
    return new AddItemsUseCase(
      repositories.preparation.itemRepository,
      repositories.preparation.backpackRepository,
      repositories.unitOfWork
    ).apply(input)
  }

  getItems(input: Parameters<GetItemsUseCase['apply']>[0]) {
    return new GetItemsUseCase(repositories.preparation.itemRepository).apply(input)
  }

  getAdventures(input: Parameters<GetAdventuresUseCase['apply']>[0]) {
    return new GetAdventuresUseCase(repositories.preparation.adventureRepository).apply(input)
  }

  getBackpack(input: Parameters<GetBackUseCase['apply']>[0]) {
    return new GetBackUseCase(repositories.preparation.backpackRepository).apply(input)
  }
}

export const game = new Game()

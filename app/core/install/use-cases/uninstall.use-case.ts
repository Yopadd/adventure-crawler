import AdventureModel from '#models/adventure.model'
import BackpackModel from '#models/backpack.model'
import InstallerModel from '#models/installer.model'
import ItemModel from '#models/item.model'
import PlayerModel from '#models/player.model'
import ReportModel from '#models/report.model'

export default class UninstallUseCase {
  apply() {
    Promise.all([
      InstallerModel.truncate(true),
      AdventureModel.truncate(true),
      ReportModel.truncate(true),
      PlayerModel.truncate(true),
      ItemModel.truncate(true),
      BackpackModel.truncate(true),
    ])
  }
}

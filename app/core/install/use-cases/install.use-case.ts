import Adventure from '#app/core/install/adventure/adventure'
import { Adventures } from '#app/core/install/adventure/adventures'
import InstallerStatus from '#app/core/install/installer-status/installer-status'
import Item from '#app/core/install/item/item'
import { Items } from '#app/core/install/item/items'
import { UnitOfWork } from '#app/core/unit-of-work/unit-of-work'

export interface InstallerStatusRepository {
  getStatus(unitOfWork: unknown): Promise<boolean>
  update(installerStatus: InstallerStatus, unitOfWork: unknown): Promise<void>
}

export interface AdventureRepository {
  createMany(adventures: Adventure[], unitOfWork: unknown): Promise<void>
  countAll(): Promise<number>
}

export interface ItemRepository {
  createMany(items: Item[], unitOfWork: unknown): Promise<void>
}

export default class InstallUseCase {
  constructor(
    private readonly adventureRepository: AdventureRepository,
    private readonly itemRepository: ItemRepository,
    private readonly installerStatusRepository: InstallerStatusRepository,
    private readonly unitOfWork: UnitOfWork
  ) {}

  async apply(): Promise<void> {
    return this.unitOfWork.begin(async (unitOfWork) => {
      const isAlreadyInstalled = await this.installerStatusRepository.getStatus(unitOfWork)
      if (isAlreadyInstalled) {
        return
      }

      await this.adventureRepository.createMany(Adventures, unitOfWork)

      await this.itemRepository.createMany(Object.values(Items), unitOfWork)

      await this.installerStatusRepository.update(new InstallerStatus(true), unitOfWork)
    })
  }
}

import InstallerStatus from '#app/core/install/installer-status/installer-status'
import { InstallerStatusRepository } from '#app/core/install/use-cases/install.use-case'
import InstallerModel from '#models/installer.model'
import { TransactionClientContract } from '@adonisjs/lucid/types/database'

export default class InstallerStatusRepositoryDatabase implements InstallerStatusRepository {
  public async getStatus(transaction: TransactionClientContract): Promise<boolean> {
    const model = await InstallerModel.query({ client: transaction }).first()
    return model ? model.installed : false
  }

  public async update(
    installerStatus: InstallerStatus,
    transaction: TransactionClientContract
  ): Promise<void> {
    const model = await InstallerModel.firstOrNew({ installed: false }, undefined, {
      client: transaction,
    })
    model.installed = installerStatus.status
    await model.save()
  }
}

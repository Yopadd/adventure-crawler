import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class InstallerModel extends BaseModel {
  public static table = 'installer'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare installed: boolean
}

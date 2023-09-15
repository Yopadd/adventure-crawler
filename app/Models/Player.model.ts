import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import BackpackModel from 'App/Models/Backpack.model'
import { DateTime } from 'luxon'
import LogbookModel from './Logbook.model'

export default class PlayerModel extends BaseModel {
  public static table = 'players'

  @column({ isPrimary: true })
  public name: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => BackpackModel)
  public backpack: HasOne<typeof BackpackModel>

  @hasOne(() => LogbookModel)
  public logbook: HasOne<typeof LogbookModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: PlayerModel) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}

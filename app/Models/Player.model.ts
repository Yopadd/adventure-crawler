import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'

export default class PlayerModel extends BaseModel {
  public static table = 'players'

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column({ serializeAs: null })
  public password: string = 'pass'

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

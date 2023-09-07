import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, HasOne, beforeSave, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Player from 'App/Core/exploration/player/player'
import InventoryModel from 'App/Models/Inventory.model'
import { DateTime } from 'luxon'

export default class PlayerModel extends BaseModel {
  public static table = 'players'

  @column({ isPrimary: true })
  public name: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => InventoryModel)
  public inventory: HasOne<typeof InventoryModel>

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

  public toPlayer(): Player {
    return new Player(this.name, this.inventory.toInventory())
  }
}

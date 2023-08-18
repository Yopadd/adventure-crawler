import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Item from 'App/Core/exploration/player/backpack/item/item'

export default class ItemModel extends BaseModel {
  public static table = 'items'

  @column({ isPrimary: true })
  public id: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public tags: string

  public toItem(): Item {
    return new Item(this.id, this.description, this.tags.split(';'))
  }
}

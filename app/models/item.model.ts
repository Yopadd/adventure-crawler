import { BaseModel, column } from '@adonisjs/lucid/orm'
import Item from '#app/core/exploration/player/backpack/item/item'
import { DateTime } from 'luxon'

export default class ItemModel extends BaseModel {
  public static table = 'items'

  @column({ isPrimary: true })
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public tags: string

  public toItem(): Item {
    return new Item(this.name, this.description, this.tags.split(';'))
  }
}

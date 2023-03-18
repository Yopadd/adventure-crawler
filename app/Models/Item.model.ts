import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import Item, { mapToItemName } from 'App/Core/item/item'

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

  public toItem(): Item {
    const name = mapToItemName(this.id)
    return new Item(name!, this.description)
  }
}

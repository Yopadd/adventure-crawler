import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ItemModel from 'App/Models/Item.model'
import { DateTime } from 'luxon'

export default class BackpackModel extends BaseModel {
  public static table = 'backpacks'

  @column({ columnName: 'player_name', isPrimary: true })
  public playerName: string

  @manyToMany(() => ItemModel, {
    pivotTable: 'backpacks_items',
    pivotForeignKey: 'player_name',
    pivotRelatedForeignKey: 'item_id',
  })
  public items: ManyToMany<typeof ItemModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ItemModel from 'App/Models/Item.model'
import Backpack from 'App/Core/exploration/player/backpack/backpack'

export default class InventoryModel extends BaseModel {
  public static table = 'inventories'

  @column({ isPrimary: true })
  public id: string

  @column({ columnName: 'player_id' })
  public playerModelId: string

  @manyToMany(() => ItemModel, {
    pivotTable: 'inventories_items',
    pivotForeignKey: 'inventory_id',
    pivotRelatedForeignKey: 'item_id',
  })
  public items: ManyToMany<typeof ItemModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public toInventory(): Backpack {
    return new Backpack(
      this.id,
      this.items.map((item) => item.toItem())
    )
  }
}

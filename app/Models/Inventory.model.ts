import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import ItemModel from 'App/Models/Item.model'
import Inventory from 'App/Core/inventory/inventory'

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

  public toInventory(): Inventory {
    return new Inventory(
      this.id,
      this.items.map((item) => item.toItem())
    )
  }
}

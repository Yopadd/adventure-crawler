import ItemModel from '#models/item.model'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class BackpackModel extends BaseModel {
  public static table = 'backpacks'
  static selfAssignPrimaryKey = true

  @column({ columnName: 'player_name', isPrimary: true })
  public playerName: string

  @manyToMany(() => ItemModel, {
    pivotTable: 'backpacks_items',
    localKey: 'playerName',
    pivotForeignKey: 'player_name',
    relatedKey: 'name',
    pivotRelatedForeignKey: 'item_name',
  })
  public items: ManyToMany<typeof ItemModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

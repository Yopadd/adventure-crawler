import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class ItemModel extends BaseModel {
  public static table = 'items'
  static selfAssignPrimaryKey = true

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

  @column()
  public hidden: boolean
}

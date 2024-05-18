import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class ItemModel extends BaseModel {
  public static table = 'items'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare tags: string

  @column()
  declare hidden: boolean
}

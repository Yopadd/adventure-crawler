import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class DungeonModel extends BaseModel {
  public static table = 'dungeons'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public name: string

  @column()
  public events: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
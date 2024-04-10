import DungeonModel from '#models/dungeon.model'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ReportModel extends BaseModel {
  public static table = 'reports'
  static selfAssignPrimaryKey = true

  @column({ columnName: 'id', isPrimary: true })
  public id: string

  @belongsTo(() => DungeonModel, {
    foreignKey: 'name',
  })
  public dungeon: BelongsTo<typeof DungeonModel>

  @column()
  public comment: string

  @column()
  public score: number

  @column()
  public exploredAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

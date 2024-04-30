import ReportModel from '#models/report.model'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class AdventureModel extends BaseModel {
  public static table = 'adventures'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public name: string

  @column()
  public events: string

  @hasMany(() => ReportModel, {
    foreignKey: 'playerName',
  })
  public reports: HasMany<typeof ReportModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

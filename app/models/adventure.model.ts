import ReportModel from '#models/report.model'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class AdventureModel extends BaseModel {
  public static table = 'adventures'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare name: string

  @column()
  declare events: string

  @hasMany(() => ReportModel, {
    foreignKey: 'playerName',
  })
  declare reports: HasMany<typeof ReportModel>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

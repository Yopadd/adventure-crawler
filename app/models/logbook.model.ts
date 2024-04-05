import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import ReportModel from '#models/report.model'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class LogbookModel extends BaseModel {
  public static table = 'logbooks'

  @column({ columnName: 'player_name', isPrimary: true })
  public playerName: string

  @manyToMany(() => ReportModel, {
    pivotTable: 'logbooks_reports',
    pivotForeignKey: 'player_name',
    pivotRelatedForeignKey: 'id',
  })
  public reports: ManyToMany<typeof ReportModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

import ReportModel from '#models/report.model'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class LogbookModel extends BaseModel {
  public static table = 'logbooks'
  static selfAssignPrimaryKey = true

  @column({ columnName: 'player_name', isPrimary: true })
  public playerName: string

  @manyToMany(() => ReportModel, {
    pivotTable: 'logbooks_reports',
    localKey: 'playerName',
    pivotForeignKey: 'player_name',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'report_id',
  })
  public reports: ManyToMany<typeof ReportModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

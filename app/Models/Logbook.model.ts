import { BaseModel, ManyToMany, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import ReportModel from './Report.model'

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

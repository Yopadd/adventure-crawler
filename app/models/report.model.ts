import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class ReportModel extends BaseModel {
  public static table = 'reports'

  @column({ columnName: 'id', isPrimary: true })
  public id: string

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

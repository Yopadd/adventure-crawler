import AdventureModel from '#models/adventure.model'
import PlayerModel from '#models/player.model'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { randomUUID } from 'node:crypto'

export default class ReportModel extends BaseModel {
  public static table = 'reports'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare adventureName: string

  @belongsTo(() => AdventureModel, {
    foreignKey: 'adventureName',
  })
  declare adventure: BelongsTo<typeof AdventureModel>

  @column()
  declare playerName: string

  @belongsTo(() => PlayerModel, {
    foreignKey: 'playerName',
  })
  declare player: BelongsTo<typeof PlayerModel>

  @column()
  declare comment: string

  @column()
  declare score: number

  @column()
  declare exploredAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  static async assignId(model: ReportModel) {
    model.id = randomUUID()
  }
}

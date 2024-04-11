import DungeonModel from '#models/dungeon.model'
import PlayerModel from '#models/player.model'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class ReportModel extends BaseModel {
  public static table = 'reports'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public dungeonName: string

  @belongsTo(() => DungeonModel, {
    foreignKey: 'dungeonName',
  })
  public dungeon: BelongsTo<typeof DungeonModel>

  @column({ isPrimary: true })
  public playerName: string

  @belongsTo(() => PlayerModel, {
    foreignKey: 'playerName',
  })
  public player: BelongsTo<typeof PlayerModel>

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

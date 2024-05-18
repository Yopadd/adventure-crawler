import BackpackModel from '#models/backpack.model'
import ReportModel from '#models/report.model'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['name'],
  passwordColumnName: 'password',
})

export default class PlayerModel extends compose(BaseModel, AuthFinder) {
  public static table = 'players'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  declare name: string

  @column({ serializeAs: null })
  declare password: string

  @hasOne(() => BackpackModel, {
    foreignKey: 'playerName',
  })
  declare backpack: HasOne<typeof BackpackModel>

  @hasMany(() => ReportModel, {
    foreignKey: 'playerName',
  })
  declare reports: HasMany<typeof ReportModel>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

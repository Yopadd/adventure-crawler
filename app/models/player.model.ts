import BackpackModel from '#models/backpack.model'
import LogbookModel from '#models/logbook.model'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['name'],
  passwordColumnName: 'password',
})

export default class PlayerModel extends compose(BaseModel, AuthFinder) {
  public static table = 'players'
  static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public name: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => BackpackModel, {
    foreignKey: 'playerName',
  })
  public backpack: HasOne<typeof BackpackModel>

  @hasOne(() => LogbookModel, {
    foreignKey: 'playerName',
  })
  public logbook: HasOne<typeof LogbookModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

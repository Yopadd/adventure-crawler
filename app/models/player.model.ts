import hash from '@adonisjs/core/services/hash'
import { BaseModel, beforeSave, column, hasOne } from '@adonisjs/lucid/orm'
import BackpackModel from '#models/backpack.model'
import { DateTime } from 'luxon'
import LogbookModel from '#models/logbook.model'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['name'],
  passwordColumnName: 'password',
})

export default class PlayerModel extends compose(BaseModel, AuthFinder) {
  public static table = 'players'

  @column({ isPrimary: true })
  public name: string

  @column({ serializeAs: null })
  public password: string

  @hasOne(() => BackpackModel)
  public backpack: HasOne<typeof BackpackModel>

  @hasOne(() => LogbookModel)
  public logbook: HasOne<typeof LogbookModel>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: PlayerModel) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}

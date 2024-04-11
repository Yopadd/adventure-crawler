import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('player_name').references('players.name')
      table.string('dungeon_name').references('dungeons.name')
      table.unique(['player_name', 'dungeon_name'])
      table.text('comment')
      table.integer('score')
      table.timestamp('explored_at')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

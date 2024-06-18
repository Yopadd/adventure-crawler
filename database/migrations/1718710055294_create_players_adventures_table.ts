import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'players_adventures'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('player_name').references('players.name').onDelete('CASCADE')
      table.string('adventure_name').references('adventures.name').onDelete('CASCADE')
      table.unique(['player_name', 'adventure_name'])
      table.timestamp('visited_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

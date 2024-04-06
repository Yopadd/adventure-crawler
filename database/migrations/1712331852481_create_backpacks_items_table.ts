import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'backpacks_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('player_name').references('backpacks.player_name').onDelete('CASCADE')
      table.string('item_name').references('items.name').onDelete('CASCADE')
      table.unique(['player_name', 'item_name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

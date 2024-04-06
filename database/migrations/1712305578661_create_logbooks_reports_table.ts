import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logbooks_reports'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('player_name').references('logbooks.player_name').onDelete('CASCADE')
      table.string('report_id').references('reports.id').onDelete('CASCADE')
      table.unique(['player_name', 'report_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

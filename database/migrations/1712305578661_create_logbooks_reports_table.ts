import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'logbooks_reports'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('logbook_id').references('logbooks.id').onDelete('CASCADE')
      table.string('report_id').references('reports.id').onDelete('CASCADE')
      table.unique(['logbook_id', 'report_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

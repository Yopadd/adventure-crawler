import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.text('description')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })

    this.schema.createTable('inventories_items', (table) => {
      table.string('inventory_id').references('inventories.id')
      table.string('item_id').references('items.id')
      table.primary(['inventory_id', 'item_id'])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

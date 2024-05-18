import { BaseCommand, args } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class MakeEventAdventure extends BaseCommand {
  static commandName = 'make:event-adventure'
  static description = 'Create a new event for adventure'

  static options: CommandOptions = {}

  @args.string({
    description: 'The name of the event',
  })
  declare name: string

  async run() {
    const codemods = await this.createCodemods()
    await codemods.makeUsingStub('./app/core/exploration/adventure/events/', '_event.stub', {
      name: this.name,
    })
  }
}

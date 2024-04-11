import ValidationError from '#app/core/errors/validation.error'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { EventName } from '#app/core/install/event/event'
import { DungeonEvent, DungeonEventDescription } from '../dungeon.js'

export default class CrossingLavaRiver implements DungeonEvent<Player> {
  public readonly description: DungeonEventDescription
  public readonly name: EventName = 'Crossing Lava River'

  constructor() {
    try {
      this.description = new DungeonEventDescription(
        'Devant moi une rivière de lave, impossible de continuer sans traverser'
      )
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate "${this.name}" description has failed`, err)
      }
      throw err
    }
  }

  public resolve(player: Player): Note {
    let note = new Note(this.description.get())
    if (player.hasTag('fire resistance')) {
      note = note.add(new Note("Heureusement, j'ai de quoi me protéger", 1))
    }
    if (player.hasTag('hydration')) {
      note = note.add(new Note("Un peu d'eau fraîche avec cette chaleur, un plaisir", 1))
    }
    return note
  }
}

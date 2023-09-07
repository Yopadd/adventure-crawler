import ValidationError from '../../../errors/validation.error'
import { DungeonEvent, DungeonEventDescription, DungeonEventName } from '../dungeon'
import Player, { PlayerScore } from 'App/Core/exploration/player/player'
import Note, { Comment } from 'App/Core/exploration/player/logbook/report/note/note'

export default class CrossingLavaRiver implements DungeonEvent {
  public readonly description: DungeonEventDescription
  public readonly name = DungeonEventName.LAVA

  constructor() {
    try {
      this.description = new DungeonEventDescription('The temperature is unbearable')
    } catch (err) {
      if (err instanceof ValidationError) {
        throw new ValidationError(`instantiate "${this.name}" description has failed`, err)
      }
      throw err
    }
  }

  public resolve(player: Player): Note {
    if (player.backpack.hasTag('Fire Resistance')) {
      return new Note(new Comment(this.description.get()), new PlayerScore(1))
    }
    return new Note(new Comment(this.description.get()), PlayerScore.Zero)
  }
}

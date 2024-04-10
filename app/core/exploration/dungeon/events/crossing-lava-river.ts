import ValidationError from '#app/core/errors/validation.error'
import Player, { PlayerScore } from '#app/core/exploration/player/player'
import Note, { Comment } from '#app/core/exploration/player/report/note/note'
import { DungeonEvent, DungeonEventDescription, DungeonEventName } from '../dungeon.js'

export default class CrossingLavaRiver implements DungeonEvent<Player> {
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
    if (player.hasTag('Fire Resistance')) {
      return new Note(new Comment(this.description.get()), new PlayerScore(1))
    }
    return new Note(new Comment(this.description.get()), PlayerScore.Zero)
  }
}

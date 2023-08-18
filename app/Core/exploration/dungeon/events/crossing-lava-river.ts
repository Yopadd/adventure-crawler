import ValidationError from '../../../errors/validation.error'
import { DungeonEvent, DungeonEventDescription, DungeonEventName } from '../dungeon'
import Player, { PlayerScore } from 'App/Core/exploration/player/player'

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

  public resolve(player: Player): PlayerScore {
    if (player.backpack.hasTag('Fire Resistance')) {
      return new PlayerScore(1)
    }
    return PlayerScore.Zero
  }
}

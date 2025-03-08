import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'
import { Resolution } from '#app/core/exploration/adventure/adventure'

export default class MountainHiking extends EventBase<Player> {
  constructor() {
    super('Mountain Hiking', 'Une longue journée en montagne')
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    const score =
      player.countTag('hydration') +
      Number(player.hasTag('cold resistance')) +
      Number(player.hasTag('food'))
    if (score === 0) {
      note.add(
        new Note(
          'La journée a été beaucoup trop difficile, je dois rentrer me reposer. Impossible de continuer dans ces conditions'
        )
      )
      return Resolution.EndOfAdventure
    }
    note.add(new Note("C'était une longue journée de marche", score))
    return Resolution.Continue
  }
}

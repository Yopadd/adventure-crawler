import { Resolution } from '#app/core/exploration/adventure/adventure'
import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Cliff extends EventBase<Player> {
  constructor() {
    super('Cliff', 'Une falaise se dressait devant moi')
  }

  public resolve(player: Player, note: Note) {
    super.resolve(player, note)
    if (player.countTag('climbing') > 1) {
      note.add(
        new Note(
          "Ce n'était pas un souci, l’ascension a été facile",
          player.countTag('climbing') + 1
        )
      )
    } else if (player.countTag('climbing') === 1) {
      note.add(new Note("Je devrais pouvoir m'en sortir, mais l'ascension ne serait pas facile", 1))
    } else {
      note.add(new Note('Je ferais mieux de trouver un nouveau passage'))
    }
    return Resolution.Continue
  }
}

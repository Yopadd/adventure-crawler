import EventBase from '#app/core/exploration/adventure/event-base'
import Player from '#app/core/exploration/player/player'
import Note from '#app/core/exploration/player/report/note/note'

export default class Cliff extends EventBase<Player> {
  constructor() {
    super('Cliff', 'Une falaise se dresse devant moi')
  }

  public resolve(player: Player, note: Note): boolean {
    super.resolve(player, note)
    if (player.countTag('climbing') > 1) {
      note.add(
        new Note(
          "C'est pas un soucis, l’ascension devrait-être facile",
          player.countTag('climbing') + 1
        )
      )
    } else if (player.countTag('climbing') === 1) {
      note.add(new Note("Je devrai pouvoir m'en sortir, mais l'ascension ne sera pas facile", 1))
    } else {
      note.add(new Note('Je ferais mieux de trouver un nouveau passage'))
    }
    return false
  }
}
